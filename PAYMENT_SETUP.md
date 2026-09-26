# Stripe + Firebase payment setup

The browser never receives a Stripe secret or decides the amount charged. It sends only course IDs to an authenticated, App Check-protected callable function. The function resolves prices from its own catalog, creates a Stripe Checkout Session, and a signature-verified Stripe webhook activates enrollments.

## 1. Firebase project

Use a Firebase project on the Blaze plan, then select it in this repository:

```sh
firebase login
firebase use --add
```

Create a reCAPTCHA Enterprise web key, register it under Firebase App Check, and add its public site key to the web app environment:

```dotenv
VITE_FIREBASE_APPCHECK_SITE_KEY=your_public_recaptcha_enterprise_site_key
VITE_FIREBASE_FUNCTIONS_REGION=asia-south1
```

For local testing only, set `VITE_FIREBASE_APPCHECK_DEBUG=true`, open the app once, and register the debug token printed by Firebase in the App Check console. Never use debug tokens in production.

Because the checkout callable uses replay protection, grant the **Firebase App Check Token Verifier** role to the second-generation function's default compute service account.

## 2. Stripe secrets

Create the Stripe webhook endpoint below in the Stripe Dashboard and subscribe it to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Endpoint:

```text
https://asia-south1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook
```

Store the Stripe keys in Google Secret Manager through Firebase. Do not put either value in `.env` or in frontend code.

```sh
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

## 3. Deploy

Install dependencies if needed, then deploy rules and functions:

```sh
cd functions
npm install
cd ..
firebase deploy --only firestore:rules,functions
```

During deployment, set `APP_BASE_URL` to the exact public origin of the web app, for example `https://www.example.com`.

Before accepting live payments, use Stripe test mode to verify a successful payment, cancellation, duplicate webhook delivery, and a delayed-payment success/failure event. Confirm that only the webhook creates documents under `users/{uid}/enrollments`.
