import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase";

export async function startStripeCheckout({ items, customer }) {
  if (!functions) {
    throw new Error("Firebase Functions is not configured.");
  }

  const createCheckoutSession = httpsCallable(
    functions,
    "createStripeCheckoutSession",
    { limitedUseAppCheckTokens: true },
  );
  const result = await createCheckoutSession({
    courseIds: items.map((item) => item.id),
    customer: {
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
    },
  });

  if (!result.data?.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  window.location.assign(result.data.url);
}
