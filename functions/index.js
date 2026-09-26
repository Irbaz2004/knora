import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { defineSecret, defineString } from "firebase-functions/params";
import { HttpsError, onCall, onRequest } from "firebase-functions/v2/https";
import Stripe from "stripe";

initializeApp();

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const appBaseUrl = defineString("APP_BASE_URL", {
  default: "http://localhost:5173",
});

const region = "asia-south1";

// Prices are authoritative on the server. The browser only sends stable IDs.
const COURSE_CATALOG = Object.freeze({
  ai_foundation: {
    name: "AI & Machine Learning Foundation",
    amount: 2499900,
  },
  python_ai: { name: "Python for Data & AI", amount: 1899900 },
  genai: { name: "Generative AI & LLMs", amount: 2199900 },
  vision: { name: "Computer Vision Essentials", amount: 1999900 },
  data_stack: { name: "Data Analytics Portfolio Track", amount: 2299900 },
});

function getStripe() {
  return new Stripe(stripeSecretKey.value());
}

function normalizeCourseIds(value) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 5) {
    throw new HttpsError(
      "invalid-argument",
      "Choose between one and five valid courses.",
    );
  }

  const ids = [...new Set(value)];
  if (ids.some((id) => typeof id !== "string" || !COURSE_CATALOG[id])) {
    throw new HttpsError(
      "invalid-argument",
      "The cart contains an invalid course.",
    );
  }
  return ids;
}

export const createStripeCheckoutSession = onCall(
  {
    region,
    secrets: [stripeSecretKey],
    enforceAppCheck: true,
    consumeAppCheckToken: true,
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError(
        "unauthenticated",
        "Sign in before starting payment.",
      );
    }
    if (request.app?.alreadyConsumed) {
      throw new HttpsError(
        "permission-denied",
        "This payment request has already been used.",
      );
    }

    const courseIds = normalizeCourseIds(request.data?.courseIds);
    const customer = request.data?.customer ?? {};
    const db = getFirestore();
    const orderRef = db.collection("orders").doc();
    const total = courseIds.reduce(
      (sum, id) => sum + COURSE_CATALOG[id].amount,
      0,
    );

    await orderRef.set({
      userId: request.auth.uid,
      courseIds,
      currency: "inr",
      total,
      status: "pending",
      customer: {
        fullName: String(customer.fullName ?? "").slice(0, 120),
        phone: String(customer.phone ?? "").slice(0, 30),
        city: String(customer.city ?? "").slice(0, 100),
        state: String(customer.state ?? "").slice(0, 100),
        pincode: String(customer.pincode ?? "").slice(0, 20),
      },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    try {
      const baseUrl = appBaseUrl.value().replace(/\/$/, "");
      const session = await getStripe().checkout.sessions.create(
        {
          mode: "payment",
          client_reference_id: orderRef.id,
          customer_email: request.auth.token.email || undefined,
          billing_address_collection: "required",
          phone_number_collection: { enabled: true },
          allow_promotion_codes: true,
          line_items: courseIds.map((id) => ({
            quantity: 1,
            price_data: {
              currency: "inr",
              unit_amount: COURSE_CATALOG[id].amount,
              product_data: {
                name: COURSE_CATALOG[id].name,
                metadata: { courseId: id },
              },
            },
          })),
          metadata: {
            orderId: orderRef.id,
            firebaseUid: request.auth.uid,
          },
          payment_intent_data: {
            metadata: {
              orderId: orderRef.id,
              firebaseUid: request.auth.uid,
            },
          },
          success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/checkout?canceled=1`,
        },
        { idempotencyKey: `checkout_${orderRef.id}` },
      );

      await orderRef.update({
        stripeCheckoutSessionId: session.id,
        updatedAt: FieldValue.serverTimestamp(),
      });
      return { url: session.url };
    } catch (error) {
      logger.error("Unable to create Stripe Checkout Session", error);
      await orderRef.update({
        status: "failed_to_start",
        updatedAt: FieldValue.serverTimestamp(),
      });
      throw new HttpsError("internal", "Unable to start secure payment.");
    }
  },
);

async function markOrderPaid(session) {
  const orderId = session.metadata?.orderId || session.client_reference_id;
  const uid = session.metadata?.firebaseUid;
  if (!orderId || !uid) {
    logger.error("Stripe session is missing order metadata", {
      sessionId: session.id,
    });
    return;
  }

  const db = getFirestore();
  const orderRef = db.collection("orders").doc(orderId);
  await db.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderRef);
    if (!orderSnapshot.exists)
      throw new Error(`Order ${orderId} was not found`);
    const order = orderSnapshot.data();
    if (order.userId !== uid) throw new Error("Order user mismatch");
    if (order.status === "paid") return;

    transaction.update(orderRef, {
      status: "paid",
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent || null,
      paidAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    for (const courseId of order.courseIds) {
      const enrollmentRef = db
        .collection("users")
        .doc(uid)
        .collection("enrollments")
        .doc(courseId);
      transaction.set(
        enrollmentRef,
        {
          courseId,
          courseName: COURSE_CATALOG[courseId].name,
          orderId,
          status: "active",
          enrolledAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }
  });
}

export const stripeWebhook = onRequest(
  { region, secrets: [stripeSecretKey, stripeWebhookSecret], cors: false },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }

    let event;
    try {
      event = getStripe().webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"],
        stripeWebhookSecret.value(),
      );
    } catch (error) {
      logger.warn("Rejected Stripe webhook signature", {
        message: error.message,
      });
      response.status(400).send("Invalid signature");
      return;
    }

    try {
      const session = event.data.object;
      if (
        event.type === "checkout.session.completed" &&
        session.payment_status === "paid"
      ) {
        await markOrderPaid(session);
      } else if (event.type === "checkout.session.async_payment_succeeded") {
        await markOrderPaid(session);
      } else if (event.type === "checkout.session.async_payment_failed") {
        const orderId =
          session.metadata?.orderId || session.client_reference_id;
        if (orderId) {
          await getFirestore().collection("orders").doc(orderId).set(
            {
              status: "payment_failed",
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true },
          );
        }
      }
      response.status(200).json({ received: true });
    } catch (error) {
      logger.error("Stripe webhook processing failed", error);
      response.status(500).send("Webhook processing failed");
    }
  },
);
