import { Box, Button, GlobalStyles, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function PaymentSuccess() {
  return (
    <Box className="payment-success-page">
      <GlobalStyles
        styles={{
          ".payment-success-page": {
            alignItems: "center",
            background:
              "linear-gradient(155deg,#eef5ff 0%,#f8fafc 52%,#eef3f9 100%)",
            color: "#162033",
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
          },
          ".payment-success-card": {
            background: "#fff",
            border: "1px solid #dfe8f3",
            borderRadius: "24px",
            boxShadow: "0 26px 80px rgba(31,55,94,.12)",
            maxWidth: "620px",
            padding: "clamp(30px,6vw,58px)",
            textAlign: "center",
            width: "100%",
          },
          ".payment-success-icon": {
            alignItems: "center",
            background: "#e9f8ef",
            borderRadius: "50%",
            color: "#16864a",
            display: "flex",
            height: "74px",
            justifyContent: "center",
            margin: "0 auto 24px",
            width: "74px",
          },
          ".payment-success-icon svg": { fontSize: "42px" },
          ".payment-success-card h1": {
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px,6vw,52px)",
            fontWeight: 650,
            lineHeight: 1.05,
          },
          ".payment-success-card > p": {
            color: "#667085",
            lineHeight: 1.7,
            margin: "16px auto 28px",
            maxWidth: "470px",
          },
          ".payment-success-note": {
            alignItems: "center",
            background: "#f5f8fc",
            borderRadius: "12px",
            color: "#526174",
            display: "flex",
            fontSize: "12px",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "24px",
            padding: "12px",
          },
          ".payment-success-note svg": { fontSize: "16px" },
          ".payment-success-actions": { justifyContent: "center" },
          ".payment-success-actions .MuiButton-root": {
            borderRadius: "11px",
            fontWeight: 700,
            padding: "11px 18px",
            textTransform: "none",
          },
          ".payment-success-actions .MuiButton-contained": {
            background: "#075ee4",
          },
          "@media(max-width:520px)": {
            ".payment-success-actions": { flexDirection: "column !important" },
            ".payment-success-actions .MuiButton-root": { width: "100%" },
          },
        }}
      />
      <Box className="payment-success-card">
        <Box className="payment-success-icon">
          <CheckCircleRoundedIcon />
        </Box>
        <Typography component="h1">Payment received</Typography>
        <Typography>
          Stripe has returned you to Knora. Your enrollment will appear in My
          Learning as soon as the signed payment confirmation is processed.
        </Typography>
        <Box className="payment-success-note">
          <LockRoundedIcon /> Enrollment is confirmed by the server, not by this
          page.
        </Box>
        <Stack
          className="payment-success-actions"
          direction="row"
          spacing={1.2}
        >
          <Button
            href="/my-learning"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            Go to My Learning
          </Button>
          <Button href="/courses" variant="outlined">
            Browse courses
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
