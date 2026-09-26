import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  GlobalStyles,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import { toast } from "sonner";
import {
  formatPrice,
  getCart,
  getCheckoutDraft,
  saveCheckoutDraft,
} from "@/lib/cart";
import { commerceStyles } from "@/Website/pages/Cart";
import { auth } from "@/firebase";
import { startStripeCheckout } from "@/lib/payments";
import knoraLogo from "@/assets/knora-logo-transparent.png";

const steps = ["Information", "Billing", "Review", "Payment"];
const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other",
];
const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [paying, setPaying] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const totals = useMemo(() => {
    const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const original = items.reduce(
      (sum, item) => sum + Number(item.originalPrice || item.price || 0),
      0,
    );
    return { total, original, savings: Math.max(original - total, 0) };
  }, [items]);

  useEffect(() => {
    if (!auth) {
      sessionStorage.setItem("knora-post-login-path", "/checkout");
      window.location.href = "/login";
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        sessionStorage.setItem("knora-post-login-path", "/checkout");
        window.location.href = "/login";
        return;
      }

      const draft = getCheckoutDraft();
      setItems(getCart());
      setForm({
        ...initialForm,
        fullName: user.displayName || "",
        email: user.email || "",
        ...(draft?.customer || {}),
      });

      const canceled = new URLSearchParams(window.location.search).has(
        "canceled",
      );
      if (canceled) {
        setStep(3);
        toast.info("Payment was canceled. Your order is still saved.");
      } else if (Number.isInteger(draft?.checkoutStep)) {
        setStep(Math.min(Math.max(draft.checkoutStep, 0), 3));
      }
      setCheckingAuth(false);
    });
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = (targetStep) => {
    const nextErrors = {};
    if (targetStep === 0) {
      if (form.fullName.trim().length < 2)
        nextErrors.fullName = "Enter the learner's full name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
        nextErrors.email = "Enter a valid email address.";
      const phoneDigits = form.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 15)
        nextErrors.phone = "Enter a valid phone number.";
    }
    if (targetStep === 1) {
      if (form.address.trim().length < 5)
        nextErrors.address = "Enter a complete street address.";
      if (form.city.trim().length < 2) nextErrors.city = "Enter your city.";
      if (!form.state) nextErrors.state = "Select your state.";
      if (!/^[1-9][0-9]{5}$/.test(form.pincode.trim()))
        nextErrors.pincode = "Enter a valid 6-digit PIN code.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveDraft = async (checkoutStep) => {
    try {
      await saveCheckoutDraft({
        customer: form,
        items,
        paymentMethod: "stripe",
        total: totals.total,
        checkoutStep,
      });
    } catch {
      toast.warning(
        "Saved on this device; cloud sync is currently unavailable.",
      );
    }
  };

  const next = async () => {
    if (!validate(step)) {
      toast.error(
        step === 0
          ? "Check your contact details."
          : "Check your billing address.",
      );
      return;
    }
    const nextStep = Math.min(step + 1, 3);
    await saveDraft(nextStep);
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (step === 0) {
      window.location.href = "/cart";
      return;
    }
    setStep((current) => current - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const payWithStripe = async () => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!termsAccepted) {
      toast.error("Please accept the enrollment and payment terms.");
      return;
    }

    setPaying(true);
    try {
      await saveDraft(3);
      await startStripeCheckout({ items, customer: form });
    } catch (error) {
      const message =
        error?.code === "functions/unauthenticated"
          ? "Please sign in again before paying."
          : error?.code === "functions/failed-precondition"
            ? "Secure payment verification is not configured yet."
            : error?.code === "functions/invalid-argument"
              ? "One of the selected courses is no longer available."
              : "Unable to open Stripe Checkout. Please try again.";
      toast.error(message);
      setPaying(false);
    }
  };

  if (checkingAuth) return <Box className="commerce-page" />;

  if (!items.length) {
    return (
      <Box className="commerce-page checkout-page">
        <GlobalStyles styles={{ ...commerceStyles, ...checkoutStyles }} />
        <CheckoutHeader step={0} />
        <Box className="commerce-shell checkout-empty-shell">
          <Box className="checkout-empty">
            <ReceiptLongRoundedIcon />
            <Typography component="h1">Nothing to check out yet</Typography>
            <Typography>
              Add a course to your cart and return here to complete enrollment.
            </Typography>
            <Button href="/courses" className="commerce-primary">
              Explore courses
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="commerce-page checkout-page">
      <GlobalStyles styles={{ ...commerceStyles, ...checkoutStyles }} />
      <Box className="commerce-glow commerce-glow-one" />
      <CheckoutHeader step={step} />

      <Box className="commerce-shell checkout-shell">
        <Button
          className="commerce-back"
          onClick={goBack}
          startIcon={<ArrowBackRoundedIcon />}
        >
          {step ? "Previous step" : "Back to cart"}
        </Button>

        <Box className="checkout-intro">
          <Box>
            <Typography className="checkout-kicker">
              Secure enrollment
            </Typography>
            <Typography component="h1">Complete your checkout</Typography>
            <Typography>
              A few details, one secure payment, and your learning journey can
              begin.
            </Typography>
          </Box>
          <Box className="checkout-help">
            <VerifiedUserRoundedIcon />
            <div>
              <strong>Need help?</strong>
              <span>Our enrollment team is here for you.</span>
            </div>
          </Box>
        </Box>

        <Box className="checkout-progress">
          {steps.map((label, index) => (
            <button
              className={`${index <= step ? "is-active" : ""} ${index === step ? "is-current" : ""}`}
              disabled={index > step}
              key={label}
              onClick={() => index < step && setStep(index)}
              type="button"
            >
              <span>{index < step ? <CheckRoundedIcon /> : index + 1}</span>
              <div>
                <small>Step {index + 1}</small>
                <strong>{label}</strong>
              </div>
            </button>
          ))}
        </Box>

        <Box className="checkout-layout">
          <Box className="checkout-panel">
            {step === 0 && (
              <FormStep
                icon={<PersonRoundedIcon />}
                title="Learner information"
                copy="We use these details for your enrollment confirmation and course updates."
              >
                <TextField
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  label="Full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={update}
                  fullWidth
                  className="field-wide"
                  autoComplete="name"
                />
                <TextField
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email || "Your confirmation will be sent here."
                  }
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  fullWidth
                  autoComplete="email"
                />
                <TextField
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone || "Include your country code if applicable."
                  }
                  label="Phone number"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  fullWidth
                  autoComplete="tel"
                />
                <InfoStrip
                  icon={<EmailRoundedIcon />}
                  title="Course communication"
                  copy="Receipts, access details, and important program updates will be sent to this learner."
                />
              </FormStep>
            )}

            {step === 1 && (
              <FormStep
                icon={<ReceiptLongRoundedIcon />}
                title="Billing address"
                copy="This address will appear on your payment receipt and enrollment invoice."
              >
                <TextField
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  label="Street address"
                  name="address"
                  value={form.address}
                  onChange={update}
                  fullWidth
                  className="field-wide"
                  autoComplete="street-address"
                />
                <TextField
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={update}
                  fullWidth
                  autoComplete="address-level2"
                />
                <TextField
                  select
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={update}
                  fullWidth
                  autoComplete="address-level1"
                >
                  {states.map((stateName) => (
                    <MenuItem key={stateName} value={stateName}>
                      {stateName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode}
                  label="PIN code"
                  name="pincode"
                  value={form.pincode}
                  onChange={update}
                  fullWidth
                  inputProps={{ inputMode: "numeric", maxLength: 6 }}
                  autoComplete="postal-code"
                />
                <InfoStrip
                  icon={<ShieldRoundedIcon />}
                  title="Your information stays private"
                  copy="Billing details are encrypted and used only to complete enrollment and issue your invoice."
                />
              </FormStep>
            )}

            {step === 2 && (
              <FormStep
                icon={<CheckRoundedIcon />}
                title="Review your enrollment"
                copy="Please confirm everything below before moving to secure payment."
              >
                <Box className="review-card field-wide">
                  <ReviewSection
                    icon={<PersonRoundedIcon />}
                    title="Learner details"
                    onEdit={() => setStep(0)}
                  >
                    <ReviewLine label="Name" value={form.fullName} />
                    <ReviewLine label="Email" value={form.email} />
                    <ReviewLine label="Phone" value={form.phone} />
                  </ReviewSection>
                  <ReviewSection
                    icon={<ReceiptLongRoundedIcon />}
                    title="Billing address"
                    onEdit={() => setStep(1)}
                  >
                    <Typography>
                      {form.address}
                      <br />
                      {form.city}, {form.state} {form.pincode}
                    </Typography>
                  </ReviewSection>
                </Box>
              </FormStep>
            )}

            {step === 3 && (
              <FormStep
                icon={<LockRoundedIcon />}
                title="Choose secure payment"
                copy="You will complete payment on Stripe's encrypted checkout page."
              >
                <Box className="stripe-payment-card field-wide">
                  <Box className="stripe-payment-icon">
                    <CreditCardRoundedIcon />
                  </Box>
                  <Box>
                    <strong>Stripe secure checkout</strong>
                    <Typography>
                      Card, UPI, net banking, or other locally available payment
                      methods.
                    </Typography>
                    <Stack direction="row" className="payment-types">
                      <span>
                        <CreditCardRoundedIcon /> Cards
                      </span>
                      <span>
                        <PhoneIphoneRoundedIcon /> UPI
                      </span>
                      <span>
                        <AccountBalanceRoundedIcon /> Net banking
                      </span>
                    </Stack>
                  </Box>
                  <CheckRoundedIcon className="payment-check" />
                </Box>
                <Box className="gateway-note field-wide">
                  <VerifiedUserRoundedIcon />
                  <div>
                    <strong>Payment-confirmed access</strong>
                    <Typography>
                      Course access is granted only after Stripe verifies
                      payment through a signed server webhook.
                    </Typography>
                  </div>
                </Box>
                <FormControlLabel
                  className="checkout-terms field-wide"
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(event) =>
                        setTermsAccepted(event.target.checked)
                      }
                    />
                  }
                  label="I agree to the enrollment terms and confirm that the learner and billing details are correct."
                />
              </FormStep>
            )}

            <Box className="checkout-actions">
              {step > 0 && (
                <Button onClick={goBack} startIcon={<ArrowBackRoundedIcon />}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  className="commerce-primary checkout-next"
                  onClick={next}
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Continue to {steps[step + 1]}
                </Button>
              ) : (
                <Button
                  className="commerce-primary checkout-next"
                  disabled={paying || !termsAccepted}
                  onClick={payWithStripe}
                  startIcon={
                    paying ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <LockRoundedIcon />
                    )
                  }
                >
                  {paying
                    ? "Opening Stripe..."
                    : `Pay ${formatPrice(totals.total)}`}
                </Button>
              )}
            </Box>
          </Box>

          <Box className="checkout-summary-wrap">
            <Box className="checkout-summary">
              <Box className="checkout-summary-title">
                <Typography component="h2">Order summary</Typography>
                <Button href="/cart" startIcon={<EditRoundedIcon />}>
                  Edit
                </Button>
              </Box>
              <Stack className="checkout-items">
                {items.map((item) => (
                  <Box className="checkout-item" key={item.id}>
                    <Box className="checkout-item-image">
                      <img src={item.image} alt="" />
                    </Box>
                    <Box>
                      <strong>{item.name}</strong>
                      <span>
                        {item.duration} · {item.mode}
                      </span>
                    </Box>
                    <strong>{formatPrice(item.price)}</strong>
                  </Box>
                ))}
              </Stack>
              <Stack className="checkout-price-lines">
                <Stack direction="row" justifyContent="space-between">
                  <span>Original price</span>
                  <strong>{formatPrice(totals.original)}</strong>
                </Stack>
                {totals.savings > 0 && (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    className="checkout-saving"
                  >
                    <span>Course discount</span>
                    <strong>-{formatPrice(totals.savings)}</strong>
                  </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                  <span>Taxes</span>
                  <strong>Included</strong>
                </Stack>
              </Stack>
              <Box className="checkout-total">
                <div>
                  <span>Total due</span>
                  <small>One-time payment</small>
                </div>
                <strong>{formatPrice(totals.total)}</strong>
              </Box>
              <Box className="checkout-secure-note">
                <LockRoundedIcon />
                <div>
                  <strong>Secure, encrypted checkout</strong>
                  <span>
                    Your card information is handled directly by Stripe.
                  </span>
                </div>
              </Box>
            </Box>
            <Box className="checkout-assurance">
              <ShieldRoundedIcon />
              <Typography>
                <strong>Protected enrollment</strong>
                Server-verified prices. Signed payment confirmation. No card
                data stored by Knora.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function CheckoutHeader({ step }) {
  return (
    <Box className="commerce-header checkout-header">
      <a href="/" className="commerce-brand" aria-label="Knora home">
        <img src={knoraLogo} alt="Knora" />
      </a>
      <Box className="commerce-steps">
        <span>Cart</span>
        <ArrowForwardRoundedIcon />
        <span className={step < 3 ? "is-current" : ""}>Details</span>
        <ArrowForwardRoundedIcon />
        <span className={step === 3 ? "is-current" : ""}>Payment</span>
      </Box>
      <Box className="commerce-secure-label">
        <LockRoundedIcon /> Secure checkout
      </Box>
    </Box>
  );
}

function FormStep({ icon, title, copy, children }) {
  return (
    <>
      <Box className="checkout-title">
        <Box className="checkout-title-icon">{icon}</Box>
        <Box>
          <Typography component="h2">{title}</Typography>
          <Typography>{copy}</Typography>
        </Box>
      </Box>
      <Box className="checkout-fields">{children}</Box>
    </>
  );
}

function InfoStrip({ icon, title, copy }) {
  return (
    <Box className="checkout-info-strip field-wide">
      {icon}
      <div>
        <strong>{title}</strong>
        <Typography>{copy}</Typography>
      </div>
    </Box>
  );
}

function ReviewSection({ icon, title, onEdit, children }) {
  return (
    <Box className="review-section">
      <Box className="review-section-heading">
        <span>{icon}</span>
        <strong>{title}</strong>
        <Button onClick={onEdit} startIcon={<EditRoundedIcon />}>
          Edit
        </Button>
      </Box>
      <Box className="review-section-body">{children}</Box>
    </Box>
  );
}

function ReviewLine({ label, value }) {
  return (
    <Box className="review-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </Box>
  );
}

const checkoutStyles = {
  ".checkout-page, .checkout-page *": { boxSizing: "border-box" },
  ".checkout-shell": { maxWidth: 1380 },
  ".checkout-intro": {
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "space-between",
    margin: "34px 0 30px",
  },
  ".checkout-kicker": {
    color: "#075ee4",
    fontSize: "12px !important",
    fontWeight: "800 !important",
    letterSpacing: ".1em !important",
    textTransform: "uppercase",
  },
  ".checkout-intro h1": {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(36px,4vw,58px)",
    fontWeight: 850,
    letterSpacing: "-.04em",
    lineHeight: 1,
    marginTop: 8,
  },
  ".checkout-intro > div:first-child > p:last-child": {
    color: "#667085",
    fontSize: 15,
    marginTop: 12,
  },
  ".checkout-help": {
    alignItems: "center",
    background: "rgba(255,255,255,.8)",
    border: "1px solid #dde6f1",
    borderRadius: 14,
    display: "flex",
    gap: 10,
    padding: "12px 16px",
  },
  ".checkout-help > svg": { color: "#1673ed" },
  ".checkout-help div": { display: "grid", gap: 2 },
  ".checkout-help strong": { fontSize: 12 },
  ".checkout-help span": { color: "#667085", fontSize: 11 },
  ".checkout-progress": {
    background: "rgba(255,255,255,.86)",
    border: "1px solid #dfe7f2",
    borderRadius: 18,
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    marginBottom: 24,
    overflow: "hidden",
    padding: 8,
  },
  ".checkout-progress button": {
    alignItems: "center",
    background: "transparent",
    border: 0,
    borderRadius: 12,
    color: "#98a2b3",
    display: "flex",
    gap: 11,
    minWidth: 0,
    padding: "11px 13px",
    position: "relative",
    textAlign: "left",
  },
  ".checkout-progress button:not(:last-child)::after": {
    background: "#e2e8f0",
    content: "''",
    height: 24,
    position: "absolute",
    right: 0,
    width: 1,
  },
  ".checkout-progress button.is-current": {
    background: "#eef5ff",
    color: "#075ee4",
  },
  ".checkout-progress button.is-active:not(:disabled)": { cursor: "pointer" },
  ".checkout-progress button > span": {
    alignItems: "center",
    background: "#f2f4f7",
    borderRadius: "50%",
    display: "flex",
    flex: "0 0 auto",
    fontSize: 12,
    fontWeight: 800,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  ".checkout-progress button.is-active > span": {
    background: "#075ee4",
    color: "#fff",
  },
  ".checkout-progress svg": { fontSize: 17 },
  ".checkout-progress button > div": { display: "grid", gap: 1 },
  ".checkout-progress small": {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: ".05em",
    textTransform: "uppercase",
  },
  ".checkout-progress strong": { color: "inherit", fontSize: 13 },
  ".checkout-layout": {
    alignItems: "start",
    display: "grid",
    gap: 28,
    gridTemplateColumns: "minmax(0,1fr) minmax(340px,410px)",
    minWidth: 0,
    width: "100%",
  },
  ".checkout-panel, .checkout-summary, .checkout-assurance, .checkout-empty": {
    background: "rgba(255,255,255,.96)",
    border: "1px solid #dfe7f2",
    borderRadius: 22,
    boxShadow: "0 18px 50px rgba(32,55,91,.07)",
  },
  ".checkout-panel": {
    minWidth: 0,
    overflow: "hidden",
    padding: "clamp(24px,3.5vw,42px)",
    width: "100%",
  },
  ".checkout-title": { alignItems: "flex-start", display: "flex", gap: 14 },
  ".checkout-title-icon": {
    alignItems: "center",
    background: "#eaf3ff",
    borderRadius: 12,
    color: "#075ee4",
    display: "flex",
    flex: "0 0 auto",
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  ".checkout-title-icon svg": { fontSize: 23 },
  ".checkout-title h2": {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 850,
  },
  ".checkout-title p": {
    color: "#667085",
    fontSize: 13,
    lineHeight: 1.55,
    marginTop: 4,
  },
  ".checkout-fields": {
    display: "grid",
    gap: 18,
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    marginTop: 30,
    minWidth: 0,
  },
  ".checkout-fields > *": { minWidth: 0 },
  ".checkout-fields .field-wide": { gridColumn: "1/-1" },
  ".checkout-fields .MuiOutlinedInput-root": {
    background: "#fbfcfe",
    borderRadius: 12,
  },
  ".checkout-fields .MuiOutlinedInput-root.Mui-focused": { background: "#fff" },
  ".checkout-fields .MuiInputLabel-root": { color: "#667085" },
  ".checkout-fields fieldset": { borderColor: "#d6deea" },
  ".checkout-fields .MuiFormHelperText-root": { fontSize: 11 },
  ".checkout-info-strip": {
    alignItems: "flex-start",
    background: "#f4f8ff",
    border: "1px solid #dbe8fb",
    borderRadius: 13,
    display: "flex",
    gap: 12,
    padding: 15,
  },
  ".checkout-info-strip > svg": { color: "#2778e9", fontSize: 21 },
  ".checkout-info-strip div": { display: "grid", gap: 3 },
  ".checkout-info-strip strong": { fontSize: 12 },
  ".checkout-info-strip p": { color: "#667085", fontSize: 11, lineHeight: 1.5 },
  ".checkout-actions": {
    alignItems: "center",
    borderTop: "1px solid #e8edf4",
    display: "flex",
    gap: 12,
    justifyContent: "flex-end",
    marginTop: 30,
    paddingTop: 24,
  },
  ".checkout-actions > .MuiButton-root:not(.commerce-primary)": {
    color: "#475467",
    fontWeight: 750,
    textTransform: "none",
  },
  ".checkout-next.MuiButton-root": { maxWidth: 290 },
  ".checkout-actions > .checkout-next:only-child": { width: "100%" },
  ".checkout-next.Mui-disabled": {
    background: "#dbe3ee !important",
    boxShadow: "none",
    color: "#7a8799 !important",
  },
  ".checkout-summary-wrap": {
    display: "grid",
    gap: 14,
    minWidth: 0,
    position: "sticky",
    top: 24,
    width: "100%",
  },
  ".checkout-summary": { padding: 25 },
  ".checkout-summary-title": {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  ".checkout-summary-title h2": {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 850,
  },
  ".checkout-summary-title .MuiButton-root": {
    fontSize: 11,
    fontWeight: 750,
    minWidth: 0,
    textTransform: "none",
  },
  ".checkout-items": { gap: "15px !important", marginTop: "22px !important" },
  ".checkout-item": {
    alignItems: "center",
    display: "grid",
    gap: 11,
    gridTemplateColumns: "58px minmax(0,1fr) auto",
  },
  ".checkout-item-image": {
    background: "#edf3fb",
    borderRadius: 10,
    height: 50,
    overflow: "hidden",
    width: 58,
  },
  ".checkout-item-image img": {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  ".checkout-item > div:nth-child(2)": { display: "grid", gap: 3, minWidth: 0 },
  ".checkout-item > div:nth-child(2) strong": {
    fontSize: 12,
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ".checkout-item span": { color: "#667085", fontSize: 10 },
  ".checkout-item > strong": { fontSize: 12 },
  ".checkout-price-lines": {
    borderBottom: "1px solid #e8edf4",
    borderTop: "1px solid #e8edf4",
    color: "#667085",
    fontSize: 12,
    gap: "11px !important",
    margin: "22px 0",
    padding: "18px 0",
  },
  ".checkout-price-lines strong": { color: "#344054" },
  ".checkout-price-lines .checkout-saving, .checkout-price-lines .checkout-saving strong":
    { color: "#07865f" },
  ".checkout-total": {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  ".checkout-total > div": { display: "grid", gap: 2 },
  ".checkout-total span": { fontSize: 16, fontWeight: 800 },
  ".checkout-total small": { color: "#98a2b3", fontSize: 10 },
  ".checkout-total > strong": { fontSize: 25 },
  ".checkout-secure-note": {
    alignItems: "flex-start",
    background: "#f5faf8",
    borderRadius: 12,
    display: "flex",
    gap: 9,
    marginTop: 20,
    padding: 13,
  },
  ".checkout-secure-note > svg": { color: "#0b9f6e", fontSize: 18 },
  ".checkout-secure-note div": { display: "grid", gap: 2 },
  ".checkout-secure-note strong": { fontSize: 11 },
  ".checkout-secure-note span": {
    color: "#667085",
    fontSize: 10,
    lineHeight: 1.4,
  },
  ".checkout-assurance": {
    alignItems: "flex-start",
    display: "flex",
    gap: 11,
    padding: 17,
  },
  ".checkout-assurance > svg": { color: "#2376eb", fontSize: 22 },
  ".checkout-assurance p": {
    color: "#667085",
    display: "grid",
    fontSize: 10,
    gap: 3,
    lineHeight: 1.5,
  },
  ".checkout-assurance strong": { color: "#344054", fontSize: 11 },
  ".review-card": {
    border: "1px solid #e0e7f0",
    borderRadius: 15,
    overflow: "hidden",
  },
  ".review-section": { padding: 20 },
  ".review-section + .review-section": { borderTop: "1px solid #e5eaf1" },
  ".review-section-heading": {
    alignItems: "center",
    display: "grid",
    gap: 9,
    gridTemplateColumns: "28px 1fr auto",
    marginBottom: 16,
  },
  ".review-section-heading > span": {
    alignItems: "center",
    background: "#edf4ff",
    borderRadius: 8,
    color: "#0b69e3",
    display: "flex",
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  ".review-section-heading svg": { fontSize: 16 },
  ".review-section-heading > strong": { fontSize: 14 },
  ".review-section-heading .MuiButton-root": {
    fontSize: 11,
    fontWeight: 750,
    minWidth: 0,
    textTransform: "none",
  },
  ".review-section-body": {
    color: "#475467",
    display: "grid",
    fontSize: 13,
    gap: 10,
    lineHeight: 1.7,
    paddingLeft: 37,
  },
  ".review-line": { display: "grid", gap: 12, gridTemplateColumns: "90px 1fr" },
  ".review-line span": { color: "#98a2b3" },
  ".review-line strong": { color: "#344054", fontWeight: 650 },
  ".stripe-payment-card": {
    alignItems: "center",
    background: "linear-gradient(135deg,#f1f7ff,#fff)",
    border: "2px solid #2478ef",
    borderRadius: 16,
    display: "grid",
    gap: 16,
    gridTemplateColumns: "50px minmax(0,1fr) auto",
    padding: 19,
  },
  ".stripe-payment-icon": {
    alignItems: "center",
    background: "linear-gradient(135deg,#126fed,#034ab8)",
    borderRadius: 13,
    color: "#fff",
    display: "flex",
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  ".stripe-payment-card > div:nth-child(2) > strong": { fontSize: 15 },
  ".stripe-payment-card p": {
    color: "#667085",
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 4,
  },
  ".payment-check": { color: "#087b59" },
  ".payment-types": {
    flexWrap: "wrap",
    gap: "7px !important",
    marginTop: "11px !important",
  },
  ".payment-types span": {
    alignItems: "center",
    background: "#fff",
    border: "1px solid #dce5f1",
    borderRadius: 7,
    color: "#475467",
    display: "inline-flex",
    fontSize: 9,
    fontWeight: 700,
    gap: 4,
    padding: "4px 7px",
  },
  ".payment-types svg": { color: "#327ee8", fontSize: 13 },
  ".gateway-note": {
    alignItems: "flex-start",
    background: "#f5faf8",
    border: "1px solid #d9eee6",
    borderRadius: 14,
    display: "flex",
    gap: 12,
    padding: 16,
  },
  ".gateway-note > svg": { color: "#0a9a6d" },
  ".gateway-note p": {
    color: "#667085",
    fontSize: 11,
    lineHeight: 1.55,
    marginTop: 4,
  },
  ".checkout-terms.MuiFormControlLabel-root": {
    alignItems: "flex-start",
    margin: 0,
  },
  ".checkout-terms .MuiCheckbox-root": { paddingLeft: 0, paddingTop: 0 },
  ".checkout-terms .MuiFormControlLabel-label": {
    color: "#596579",
    fontSize: 11,
    lineHeight: 1.55,
  },
  ".checkout-empty-shell": { display: "grid", placeItems: "center" },
  ".checkout-empty": {
    maxWidth: 620,
    padding: "65px 34px",
    textAlign: "center",
  },
  ".checkout-empty > svg": { color: "#2478ef", fontSize: 58 },
  ".checkout-empty h1": {
    fontFamily: "var(--font-display)",
    fontSize: 34,
    fontWeight: 850,
    marginTop: 16,
  },
  ".checkout-empty p": {
    color: "#667085",
    margin: "10px auto 26px",
    maxWidth: 430,
  },
  ".checkout-empty .commerce-primary": { maxWidth: 240 },
  "@media(max-width:980px)": {
    ".checkout-layout": {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      isolation: "isolate",
    },
    ".checkout-panel": {
      flex: "0 0 auto",
      order: 1,
      position: "relative",
      zIndex: 2,
    },
    ".checkout-summary-wrap": {
      flex: "0 0 auto",
      inset: "auto !important",
      maxWidth: "100%",
      order: 2,
      position: "relative !important",
      top: "auto !important",
      zIndex: 1,
    },
  },
  "@media(max-width:700px)": {
    ".checkout-shell": {
      maxWidth: "100%",
      overflow: "visible",
      padding: "18px 14px 44px !important",
      width: "100%",
    },
    ".checkout-header .commerce-brand img": { height: 38, width: 104 },
    ".checkout-header .commerce-secure-label": { fontSize: 0, gap: 0 },
    ".checkout-header .commerce-secure-label svg": { fontSize: 20 },
    ".checkout-intro": {
      alignItems: "flex-start",
      margin: "24px 0 20px",
      width: "100%",
    },
    ".checkout-intro h1": { fontSize: "clamp(31px,10vw,38px)" },
    ".checkout-intro > div:first-child > p:last-child": {
      fontSize: 13,
      lineHeight: 1.55,
      maxWidth: 520,
    },
    ".checkout-help": { display: "none" },
    ".checkout-progress": {
      borderRadius: 15,
      gap: 3,
      marginBottom: 16,
      padding: 5,
      width: "100%",
    },
    ".checkout-progress button": {
      justifyContent: "center",
      minHeight: 44,
      padding: "9px 5px",
    },
    ".checkout-progress button > span": { height: 30, width: 30 },
    ".checkout-progress button > div": { display: "none" },
    ".checkout-progress button:not(:last-child)::after": { height: 18 },
    ".checkout-layout": {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      overflow: "visible",
    },
    ".checkout-panel": {
      borderRadius: 17,
      boxShadow: "0 10px 28px rgba(32,55,91,.06)",
      minHeight: "max-content",
      order: 1,
      overflow: "visible",
      padding: "22px 16px",
      position: "relative",
    },
    ".checkout-title": { gap: 11 },
    ".checkout-title-icon": { height: 40, width: 40 },
    ".checkout-title-icon svg": { fontSize: 21 },
    ".checkout-fields": {
      gap: 15,
      gridTemplateColumns: "minmax(0,1fr)",
      marginTop: 24,
      width: "100%",
    },
    ".checkout-fields > *": { gridColumn: "1 !important" },
    ".checkout-fields .MuiFormControl-root": {
      maxWidth: "100%",
      width: "100%",
    },
    ".checkout-title h2": { fontSize: 22 },
    ".checkout-title p": { fontSize: 12, lineHeight: 1.5 },
    ".checkout-actions": {
      alignItems: "stretch",
      flexDirection: "column-reverse",
      gap: 10,
      marginTop: 24,
      paddingTop: 20,
    },
    ".checkout-actions > .MuiButton-root": {
      minHeight: 46,
      width: "100% !important",
    },
    ".checkout-next.MuiButton-root": {
      marginLeft: 0,
      maxWidth: "none",
      width: "100%",
    },
    ".checkout-actions > .checkout-next:only-child": { width: "100%" },
    ".checkout-summary": {
      borderRadius: 17,
      boxShadow: "0 10px 28px rgba(32,55,91,.06)",
      padding: 18,
      position: "relative",
      width: "100%",
    },
    ".checkout-summary-wrap": {
      clear: "both",
      display: "grid",
      order: 2,
      position: "relative !important",
      top: "auto !important",
      transform: "none !important",
      width: "100%",
    },
    ".checkout-item": {
      gap: 9,
      gridTemplateColumns: "52px minmax(0,1fr) auto",
    },
    ".checkout-item-image": { height: 46, width: 52 },
    ".checkout-item > div:nth-child(2) strong": {
      overflow: "visible",
      whiteSpace: "normal",
    },
    ".review-section": { padding: 16 },
    ".review-section-body": { paddingLeft: 0 },
    ".review-line": { gridTemplateColumns: "76px minmax(0,1fr)" },
    ".review-line strong": { overflowWrap: "anywhere" },
    ".stripe-payment-card": {
      alignItems: "start",
      gridTemplateColumns: "44px minmax(0,1fr) auto",
      padding: 15,
    },
    ".stripe-payment-icon": { height: 42, width: 42 },
    ".checkout-assurance": { borderRadius: 16, padding: 15 },
    ".checkout-empty": { borderRadius: 18, padding: "44px 20px" },
  },
  "@media(max-width:430px)": {
    ".checkout-shell": { padding: "15px 10px 38px !important" },
    ".checkout-header": { minHeight: 60, padding: "7px 12px" },
    ".checkout-header .commerce-brand img": { height: 35, width: 94 },
    ".checkout-intro": { margin: "20px 2px 18px" },
    ".checkout-kicker": { fontSize: "10px !important" },
    ".checkout-intro h1": { fontSize: "30px", lineHeight: 1.04 },
    ".checkout-intro > div:first-child > p:last-child": { fontSize: 12 },
    ".checkout-progress": { borderRadius: 13, gap: 2, padding: 4 },
    ".checkout-progress button": { minHeight: 40, padding: 6 },
    ".checkout-progress button > span": {
      fontSize: 11,
      height: 28,
      width: 28,
    },
    ".checkout-panel": { borderRadius: 15, padding: "19px 13px" },
    ".checkout-title": { alignItems: "center" },
    ".checkout-title-icon": { borderRadius: 10, height: 38, width: 38 },
    ".checkout-title h2": { fontSize: 20 },
    ".checkout-title p": { fontSize: 11 },
    ".checkout-fields": { gap: 13, marginTop: 20 },
    ".checkout-fields .MuiInputBase-root": { fontSize: 14 },
    ".checkout-info-strip": { gap: 9, padding: 12 },
    ".checkout-info-strip > svg": { fontSize: 19 },
    ".stripe-payment-card": {
      gap: 11,
      gridTemplateColumns: "40px minmax(0,1fr)",
      padding: 13,
    },
    ".stripe-payment-icon": { height: 38, width: 38 },
    ".stripe-payment-card > .payment-check": { display: "none" },
    ".payment-types": {
      display: "grid !important",
      gridTemplateColumns: "repeat(2,max-content)",
    },
    ".gateway-note": { gap: 9, padding: 13 },
    ".checkout-terms .MuiFormControlLabel-label": { fontSize: 10.5 },
    ".review-section": { padding: 13 },
    ".review-section-heading": {
      gridTemplateColumns: "26px minmax(0,1fr) auto",
    },
    ".review-section-heading > span": { height: 26, width: 26 },
    ".review-section-heading > strong": { fontSize: 13 },
    ".review-line": { gap: 4, gridTemplateColumns: "1fr" },
    ".review-line + .review-line": {
      borderTop: "1px solid #edf0f4",
      paddingTop: 8,
    },
    ".checkout-summary": { borderRadius: 15, padding: 15 },
    ".checkout-summary-title h2": { fontSize: 20 },
    ".checkout-item": {
      alignItems: "start",
      gridTemplateColumns: "48px minmax(0,1fr)",
    },
    ".checkout-item-image": { height: 44, width: 48 },
    ".checkout-item > strong": {
      gridColumn: "2",
      justifySelf: "start",
      marginTop: -2,
    },
    ".checkout-total > strong": { fontSize: 22 },
    ".checkout-assurance": { gap: 9, padding: 13 },
    ".checkout-empty h1": { fontSize: 28 },
  },
};
