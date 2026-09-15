import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  GlobalStyles,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import { toast } from "sonner";
import { formatPrice, getCart, saveCheckoutDraft } from "@/lib/cart";
import { commerceStyles } from "@/pages/Cart";
import { auth } from "@/firebase";

const steps = ["Student details", "Billing", "Review", "Payment"];
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
  const [payment, setPayment] = useState("upi");
  const [items, setItems] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const update = (event) =>
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));

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
      setItems(getCart());
      setCheckingAuth(false);
    });
  }, []);

  const next = async () => {
    if (step === 0 && (!form.fullName || !form.email || !form.phone)) {
      toast.error("Please complete your student details.");
      return;
    }
    if (
      step === 1 &&
      (!form.address || !form.city || !form.state || !form.pincode)
    ) {
      toast.error("Please complete your billing address.");
      return;
    }
    try {
      await saveCheckoutDraft({
        customer: form,
        items,
        paymentMethod: payment,
        total,
        checkoutStep: Math.min(step + 1, 3),
      });
    } catch {
      toast.warning("Saved on this device; Firebase sync needs permission.");
    }
    setStep((value) => Math.min(value + 1, 3));
  };

  if (checkingAuth) return <Box className="commerce-page" />;

  return (
    <Box className="commerce-page checkout-page">
      <GlobalStyles styles={{ ...commerceStyles, ...checkoutStyles }} />
      <Box className="commerce-glow commerce-glow-one" />
      <Box className="commerce-shell checkout-shell">
        <Stack direction="row" className="commerce-topbar">
          <Button
            href={step ? undefined : "/cart"}
            onClick={step ? () => setStep((value) => value - 1) : undefined}
            startIcon={<ArrowBackRoundedIcon />}
          >
            {step ? "Previous step" : "Back to cart"}
          </Button>
          <Typography className="checkout-secure">
            <LockRoundedIcon /> Enrollment checkout
          </Typography>
        </Stack>

        <Box className="checkout-progress">
          {steps.map((label, index) => (
            <Box className={index <= step ? "is-active" : ""} key={label}>
              <span>{index < step ? <CheckRoundedIcon /> : index + 1}</span>
              <Typography>{label}</Typography>
            </Box>
          ))}
        </Box>

        <Box className="checkout-layout">
          <Box className="checkout-panel">
            {step === 0 && (
              <FormStep
                title="Tell us about the learner"
                copy="These details are used for enrollment and course communication."
              >
                <TextField
                  label="Full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={update}
                  fullWidth
                />
                <TextField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  fullWidth
                />
                <TextField
                  label="Phone number"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  fullWidth
                />
              </FormStep>
            )}

            {step === 1 && (
              <FormStep
                title="Billing information"
                copy="Add the address that should appear on your enrollment invoice."
              >
                <TextField
                  label="Street address"
                  name="address"
                  value={form.address}
                  onChange={update}
                  fullWidth
                  className="field-wide"
                />
                <TextField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={update}
                  fullWidth
                />
                <TextField
                  select
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={update}
                  fullWidth
                >
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                  <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  label="PIN code"
                  name="pincode"
                  value={form.pincode}
                  onChange={update}
                  fullWidth
                />
              </FormStep>
            )}

            {step === 2 && (
              <FormStep
                title="Review your enrollment"
                copy="Confirm the learner, billing, and course information before payment."
              >
                <ReviewRow label="Learner" value={form.fullName} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow
                  label="Billing"
                  value={`${form.address}, ${form.city}, ${form.state} ${form.pincode}`}
                />
                {items.map((item) => (
                  <ReviewRow
                    key={item.id}
                    label="Course"
                    value={`${item.name} — ${formatPrice(item.price)}`}
                  />
                ))}
              </FormStep>
            )}

            {step === 3 && (
              <FormStep
                title="Choose payment method"
                copy="Select how you want to complete the secure payment."
              >
                <Box className="payment-grid">
                  <PaymentChoice
                    active={payment === "upi"}
                    icon={PhoneAndroidRoundedIcon}
                    label="UPI"
                    copy="Google Pay, PhonePe, BHIM"
                    onClick={() => setPayment("upi")}
                  />
                  <PaymentChoice
                    active={payment === "card"}
                    icon={CreditCardRoundedIcon}
                    label="Card"
                    copy="Credit or debit card"
                    onClick={() => setPayment("card")}
                  />
                  <PaymentChoice
                    active={payment === "netbanking"}
                    icon={PaymentsRoundedIcon}
                    label="Net banking"
                    copy="Pay through your bank"
                    onClick={() => setPayment("netbanking")}
                  />
                </Box>
                <Box className="gateway-note">
                  <LockRoundedIcon />
                  <div>
                    <strong>Payment gateway connection required</strong>
                    <Typography>
                      Your order is ready. Connect Razorpay or Stripe before
                      enabling the final Pay button.
                    </Typography>
                  </div>
                </Box>
              </FormStep>
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
              <Button className="commerce-primary checkout-next" disabled>
                Pay {formatPrice(total)}
              </Button>
            )}
          </Box>

          <Box className="checkout-summary">
            <Typography component="h2">Enrollment summary</Typography>
            {items.map((item) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                key={item.id}
              >
                <span>{item.name}</span>
                <strong>{formatPrice(item.price)}</strong>
              </Stack>
            ))}
            <Box className="checkout-total">
              <span>Total due</span>
              <strong>{formatPrice(total)}</strong>
            </Box>
            <Typography>
              <LockRoundedIcon /> Draft securely saved as you continue
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function FormStep({ title, copy, children }) {
  return (
    <>
      <Box className="checkout-title">
        <Typography component="h1">{title}</Typography>
        <Typography>{copy}</Typography>
      </Box>
      <Box className="checkout-fields">{children}</Box>
    </>
  );
}
function ReviewRow({ label, value }) {
  return (
    <Box className="review-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </Box>
  );
}
function PaymentChoice({ active, icon: Icon, label, copy, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      className={`payment-choice ${active ? "is-selected" : ""}`}
    >
      <Icon />
      <div>
        <strong>{label}</strong>
        <span>{copy}</span>
      </div>
      {active && <CheckRoundedIcon className="payment-check" />}
    </Box>
  );
}

const checkoutStyles = {
  ".checkout-shell": { maxWidth: 1320 },
  ".checkout-secure": { alignItems: "center", display: "flex", gap: 1 },
  ".checkout-secure svg": { fontSize: 16 },
  ".checkout-progress": {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    margin: "clamp(55px,8vh,90px) 0 45px",
  },
  ".checkout-progress > div": {
    alignItems: "center",
    color: "#98a2b3",
    display: "flex",
    gap: 10,
    position: "relative",
  },
  ".checkout-progress > div:not(:last-child)::after": {
    background: "#dbe3ee",
    content: "''",
    height: 1,
    position: "absolute",
    right: 18,
    width: "calc(100% - 150px)",
  },
  ".checkout-progress span": {
    alignItems: "center",
    border: "1px solid #d0d8e4",
    borderRadius: "50%",
    display: "flex",
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  ".checkout-progress svg": { fontSize: 17 },
  ".checkout-progress .is-active": { color: "#101828" },
  ".checkout-progress .is-active span": {
    background: "#075ee4",
    borderColor: "#3386ff",
    color: "#fff",
  },
  ".checkout-progress p": { fontSize: 12, fontWeight: 700 },
  ".checkout-layout": {
    display: "grid",
    gap: 30,
    gridTemplateColumns: "minmax(0,1fr) 350px",
  },
  ".checkout-panel, .checkout-summary": {
    background: "rgba(255,255,255,.96)",
    border: "1px solid #e1e8f0",
    borderRadius: 26,
    boxShadow: "0 24px 70px rgba(31,55,94,.08)",
    padding: "clamp(24px,4vw,48px)",
  },
  ".checkout-title h1": {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px,4vw,56px)",
    fontWeight: 800,
    letterSpacing: "-.03em",
  },
  ".checkout-title > p": { color: "#8f9db2", marginTop: 8 },
  ".checkout-fields": {
    display: "grid",
    gap: 18,
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    marginTop: 34,
  },
  ".checkout-fields > .MuiTextField-root:first-child, .checkout-fields .field-wide":
    { gridColumn: "1/-1" },
  ".checkout-fields .MuiOutlinedInput-root": {
    background: "#f9fbfd",
    color: "#101828",
    borderRadius: 12,
  },
  ".checkout-fields .MuiInputLabel-root": { color: "#667085" },
  ".checkout-fields fieldset": {
    borderColor: "#d6deea !important",
  },
  ".checkout-next": { marginTop: "34px !important", maxWidth: 330 },
  ".checkout-next.Mui-disabled": {
    background: "#dbe3ee !important",
    color: "#7a8799 !important",
  },
  ".checkout-summary": { alignSelf: "start", padding: "28px !important" },
  ".checkout-summary h2": {
    fontFamily: "var(--font-display)",
    fontSize: 23,
    fontWeight: 800,
    marginBottom: 24,
  },
  ".checkout-summary > div": {
    color: "#667085",
    fontSize: 13,
    gap: 18,
    marginBottom: 16,
  },
  ".checkout-summary strong": { color: "#101828", textAlign: "right" },
  ".checkout-total": {
    borderTop: "1px solid #e3e9f1",
    display: "flex",
    fontSize: "17px !important",
    justifyContent: "space-between",
    paddingTop: 22,
  },
  ".checkout-total strong": { fontSize: 22 },
  ".checkout-summary > p": {
    alignItems: "center",
    color: "#667085",
    display: "flex",
    fontSize: 11,
    gap: 6,
    marginTop: 24,
  },
  ".checkout-summary > p svg": { fontSize: 13 },
  ".review-row": {
    borderBottom: "1px solid #e7ecf3",
    display: "grid",
    gap: 20,
    gridColumn: "1/-1",
    gridTemplateColumns: "120px 1fr",
    padding: "2px 0 16px",
  },
  ".review-row span": { color: "#667085", fontSize: 13 },
  ".review-row strong": { fontSize: 14 },
  ".payment-grid": { display: "grid", gap: 12, gridColumn: "1/-1" },
  ".payment-choice": {
    alignItems: "center",
    background: "#f9fbfd",
    border: "1px solid #dce3ed",
    borderRadius: 15,
    color: "#101828",
    cursor: "pointer",
    display: "grid",
    gap: 15,
    gridTemplateColumns: "42px 1fr auto",
    padding: 16,
    textAlign: "left",
  },
  ".payment-choice.is-selected": {
    background: "rgba(7,94,228,.13)",
    borderColor: "#2678ef",
  },
  ".payment-choice > svg:first-child": { color: "#5596ff", fontSize: 28 },
  ".payment-choice div": { display: "grid", gap: 3 },
  ".payment-choice span": { color: "#667085", fontSize: 12 },
  ".payment-check": { color: "#5da0ff" },
  ".gateway-note": {
    alignItems: "flex-start",
    background: "rgba(255,186,73,.07)",
    border: "1px solid rgba(255,186,73,.2)",
    borderRadius: 15,
    display: "flex",
    gap: 14,
    gridColumn: "1/-1",
    padding: 17,
  },
  ".gateway-note > svg": { color: "#ffbd57" },
  ".gateway-note p": { color: "#667085", fontSize: 12, marginTop: 4 },
  "@media(max-width:850px)": {
    ".checkout-layout": { gridTemplateColumns: "1fr" },
    ".checkout-progress p": { display: "none" },
    ".checkout-progress > div:not(:last-child)::after": {
      left: 42,
      right: "auto",
      width: "calc(100% - 50px)",
    },
  },
  "@media(max-width:560px)": {
    ".checkout-fields": { gridTemplateColumns: "1fr" },
    ".checkout-fields > *": { gridColumn: "1 !important" },
    ".review-row": { gridTemplateColumns: "1fr", gap: 6 },
  },
};
