// ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import logo from "@/assets/knora-logo-transparent.png";
import authRight from "@/assets/authright.png";
import { requireFirebaseAuth } from "@/firebase";

const features = [
  {
    Icon: VerifiedOutlinedIcon,
    title: "Role-Based Access",
    copy: "Secure dashboards for every role",
  },
  {
    Icon: GroupOutlinedIcon,
    title: "Smart & Efficient",
    copy: "Automated academic workflows",
  },
  {
    Icon: BarChartOutlinedIcon,
    title: "Real-Time Insights",
    copy: "Data-driven decision making",
  },
  {
    Icon: SchoolOutlinedIcon,
    title: "Built for Education",
    copy: "Designed for academic excellence",
  },
];

const forgotStyles = {
  page: {
    display: "flex",
    height: "100vh",
    minHeight: "100vh",
    overflow: "hidden",
    flexDirection: "column",
    background: "#ffffff",
    fontFamily: "var(--font-sans)",
    cursor: "auto !important",
    "& *": {
      cursor: "auto !important",
    },
    "@media (max-width: 1024px)": {
      height: "auto",
      overflowY: "auto",
    },
  },
  shell: {
    display: "grid",
    flex: "1 1 auto",
    minHeight: 0,
    gridTemplateColumns: "minmax(31rem, 45%) minmax(36rem, 55%)",
    background: "#ffffff",
    "@media (max-width: 1024px)": {
      minHeight: "100vh",
      gridTemplateColumns: "1fr",
    },
  },
  formSide: {
    position: "relative",
    display: "flex",
    minHeight: 0,
    flexDirection: "column",
    justifyContent: "center",
    p: "clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 5vw, 5rem)",
    background:
      "radial-gradient(circle at 8% 94%, rgba(5, 114, 234, 0.06), transparent 24%), #ffffff",
    "@media (max-width: 1024px)": {
      minHeight: "auto",
      p: "5.5rem clamp(1.25rem, 6vw, 4rem) 1.5rem",
    },
    "@media (max-width: 720px)": {
      p: "6.7rem 1.15rem 1.8rem",
    },
  },
  brand: {
    position: "absolute",
    left: "clamp(1.2rem, 2.2vw, 2.4rem)",
    top: "clamp(0.55rem, 1.2vw, 1rem)",
    display: "inline-flex",
    width: "auto",
    height: "clamp(3.7rem, 7vh, 4.8rem)",
    textDecoration: "none",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      height: "4rem",
    },
    "@media (max-width: 1024px)": {
      height: "4.85rem",
    },
    "@media (max-width: 720px)": {
      left: "1.15rem",
      top: "0.45rem",
      height: "3.65rem",
    },
  },
  brandImage: {
    display: "block",
    width: "auto",
    height: "100%",
    maxWidth: "min(16rem, 44vw)",
    objectFit: "contain",
  },
  panel: {
    display: "flex",
    width: "min(100%, 36rem)",
    flexDirection: "column",
    justifyContent: "center",
    m: "3rem auto 0",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      width: "min(100%, 34rem)",
      marginTop: "2.25rem",
    },
    "@media (max-width: 1024px)": {
      marginTop: 0,
    },
  },
  backLink: {
    alignSelf: "flex-start",
    minWidth: 0,
    mb: "0.95rem",
    p: 0,
    color: "#0572ea",
    cursor: "pointer !important",
    fontFamily: "var(--font-sans)",
    fontSize: "0.84rem",
    fontWeight: 900,
    textTransform: "none",
    "&:hover": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  copy: {
    width: "100%",
    m: 0,
    textAlign: "center",
  },
  heading: {
    m: 0,
    color: "#101828",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.15rem, 3.4vw, 3.7rem)",
    fontWeight: 900,
    lineHeight: 1.04,
    "& span": {
      color: "#0572ea",
    },
    "@media (max-height: 820px) and (min-width: 1025px)": {
      fontSize: "clamp(2rem, 3vw, 3.1rem)",
    },
    "@media (max-width: 720px)": {
      fontSize: "2.05rem",
    },
  },
  subtext: {
    m: "0.65rem 0 0",
    color: "#4f5e78",
    fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)",
    "@media (max-width: 720px)": {
      fontSize: "0.92rem",
    },
  },
  form: {
    width: "100%",
    gap: "0.95rem",
    mt: "clamp(1.4rem, 2.7vh, 2rem)",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      gap: "0.8rem",
      mt: "1.15rem",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      height: "3.375rem",
      borderRadius: "8px",
      background: "#ffffff",
      color: "#101828",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d7dfea",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0572ea",
    },
    "& .MuiInputAdornment-positionStart": {
      mr: "0.8rem",
    },
    "& .MuiInputAdornment-root": {
      color: "#526783",
    },
    "& .MuiInputAdornment-root svg": {
      fontSize: "1.25rem",
    },
    "& .MuiInputBase-input": {
      p: "0.85rem 1rem 0.85rem 0.85rem",
      color: "#101828",
      cursor: "text !important",
      fontSize: "0.92rem",
      fontWeight: 400,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#7f8daa",
      fontWeight: 400,
      opacity: 1,
    },
  },
  primaryButton: {
    minHeight: "3.375rem",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #075ee4, #0785f5)",
    color: "#ffffff",
    cursor: "pointer !important",
    fontFamily: "var(--font-sans)",
    fontSize: "0.98rem",
    fontWeight: 900,
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(135deg, #0758d8, #0572ea)",
    },
    "&:disabled": {
      cursor: "wait",
      opacity: 0.68,
      color: "#ffffff",
    },
  },
  switchText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    mt: "1rem",
    color: "#65738e",
    fontSize: "0.94rem",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      mt: "0.75rem",
    },
    "@media (max-width: 720px)": {
      flexWrap: "wrap",
    },
    "& .MuiButton-root": {
      minWidth: 0,
      p: 0,
      color: "#0572ea",
      cursor: "pointer !important",
      fontFamily: "var(--font-sans)",
      fontSize: "0.94rem",
      fontWeight: 900,
      textTransform: "none",
      "&:hover": {
        background: "transparent",
        textDecoration: "underline",
      },
    },
  },
  showcase: {
    position: "relative",
    minHeight: 0,
    overflow: "hidden",
    borderRadius: "9rem 0 0 9rem",
    background: "#0b4595",
    "@media (max-width: 1024px)": {
      minHeight: "38rem",
      borderRadius: 0,
    },
    "@media (max-width: 720px)": {
      minHeight: "25rem",
    },
  },
  secureChip: {
    position: "absolute",
    zIndex: 2,
    top: "clamp(1.2rem, 3vh, 2.25rem)",
    right: "clamp(1.3rem, 3vw, 3rem)",
    display: "flex",
    width: "min(24rem, 44%)",
    alignItems: "center",
    gap: "0.85rem",
    border: "1px solid rgba(255, 255, 255, 0.28)",
    borderRadius: "8px",
    background: "rgba(50, 89, 151, 0.78)",
    p: "0.8rem 1.05rem",
    color: "#ffffff",
    backdropFilter: "blur(12px)",
    "@media (max-width: 720px)": {
      left: "0.85rem",
      right: "0.85rem",
      width: "auto",
    },
    "& svg": {
      flex: "0 0 auto",
      fontSize: "1.5rem",
    },
  },
  secureText: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem 0.48rem",
    m: 0,
    fontSize: "clamp(0.88rem, 1vw, 1.08rem)",
    lineHeight: 1.18,
  },
  secureWord: {
    fontWeight: 400,
  },
  secureDot: {
    fontWeight: 400,
    "&::before": {
      content: '"\\2022"',
      mr: "0.48rem",
    },
  },
  secureSmall: {
    flexBasis: "100%",
    color: "rgba(255, 255, 255, 0.82)",
    fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)",
  },
  showcaseImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  },
  footer: {
    display: "grid",
    flex: "0 0 auto",
    minHeight: "5.85rem",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr)) auto",
    alignItems: "center",
    gap: "clamp(0.75rem, 1.7vw, 1.7rem)",
    borderTop: "1px solid #e8edf5",
    background: "#ffffff",
    p: "0.85rem clamp(1.5rem, 4vw, 5rem)",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      minHeight: "5.2rem",
      py: "0.65rem",
    },
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  footerItem: {
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: "0.7rem",
  },
  footerIcon: {
    display: "grid",
    width: "2.35rem",
    height: "2.35rem",
    flex: "0 0 auto",
    placeItems: "center",
    borderRadius: "999px",
    background: "#f0f6ff",
    color: "#0572ea",
  },
  footerText: {
    m: 0,
    color: "#61708b",
    fontSize: "0.78rem",
    lineHeight: 1.35,
  },
  footerTitle: {
    display: "block",
    color: "#0572ea",
    fontSize: "0.82rem",
    fontWeight: 900,
  },
  footerSmall: {
    display: "block",
  },
  copyright: {
    display: "block",
    width: "max-content",
    m: 0,
    color: "#61708b",
    fontSize: "0.78rem",
    lineHeight: 1.35,
    textAlign: "right",
    "@media (max-width: 1024px)": {
      width: "auto",
      textAlign: "left",
    },
  },
};

function getAuthMessage(error) {
  if (!error?.code) return "Something went wrong. Please try again.";

  const messages = {
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-not-found": "No account was found with this email.",
    "auth/configuration-not-found":
      "Firebase is not configured yet. Add your Vite Firebase env values.",
  };

  return messages[error.code] ?? error.message;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      await sendPasswordResetEmail(requireFirebaseAuth(), email);
      setStatus("Password reset email sent. Check your inbox.");
    } catch (resetError) {
      setError(getAuthMessage(resetError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="main" sx={forgotStyles.page}>
      <Box sx={forgotStyles.shell}>
        <Box component="section" sx={forgotStyles.formSide}>
          <Box
            component="a"
            href="/"
            aria-label="Knora Edu Academy"
            sx={forgotStyles.brand}
          >
            <Box
              component="img"
              src={logo}
              alt="Knora Edu Academy"
              sx={forgotStyles.brandImage}
            />
          </Box>

          <Box sx={forgotStyles.panel}>
            <Button
              href="/login"
              variant="text"
              startIcon={<KeyboardBackspaceIcon />}
              sx={forgotStyles.backLink}
            >
              Back to Login
            </Button>

            <Box sx={forgotStyles.copy}>
              <Typography component="h1" sx={forgotStyles.heading}>
                Forgot <Box component="span">Password?</Box>
              </Typography>
              <Typography component="p" sx={forgotStyles.subtext}>
                Enter your registered email address and we will send a reset
                link.
              </Typography>
            </Box>

            <Stack
              component="form"
              sx={forgotStyles.form}
              onSubmit={handleReset}
            >
              <TextField
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                type="email"
                autoComplete="email"
                required
                fullWidth
                sx={forgotStyles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {error && <Alert severity="error">{error}</Alert>}
              {status && <Alert severity="success">{status}</Alert>}

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={forgotStyles.primaryButton}
                startIcon={<EmailOutlinedIcon />}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Stack>

            <Typography component="p" sx={forgotStyles.switchText}>
              Remember password?
              <Button
                href="/login"
                variant="text"
                endIcon={<ArrowForwardIcon />}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Box>

        <Box
          component="section"
          aria-label="Knora dashboard preview"
          sx={forgotStyles.showcase}
        >
          <Box sx={forgotStyles.secureChip}>
            <ShieldOutlinedIcon />
            <Typography component="p" sx={forgotStyles.secureText}>
              <Box component="strong" sx={forgotStyles.secureWord}>
                Secure
              </Box>
              <Box component="b" sx={forgotStyles.secureDot}>
                Smart
              </Box>
              <Box component="b" sx={forgotStyles.secureDot}>
                Seamless
              </Box>
              <Box component="small" sx={forgotStyles.secureSmall}>
                Academic Management Simplified
              </Box>
            </Typography>
          </Box>
          <Box
            component="img"
            src={authRight}
            alt="Knora academic management dashboard"
            sx={forgotStyles.showcaseImage}
          />
        </Box>
      </Box>

      <Box component="footer" sx={forgotStyles.footer}>
        {features.map(({ Icon, title, copy }) => (
          <Box sx={forgotStyles.footerItem} key={title}>
            <Box component="span" sx={forgotStyles.footerIcon}>
              <Icon fontSize="small" />
            </Box>
            <Typography component="p" sx={forgotStyles.footerText}>
              <Box component="strong" sx={forgotStyles.footerTitle}>
                {title}
              </Box>
              <Box component="small" sx={forgotStyles.footerSmall}>
                {copy}
              </Box>
            </Typography>
          </Box>
        ))}

        <Typography component="p" sx={forgotStyles.copyright}>
          &copy; 2026{" "}
          <Box component="strong" sx={forgotStyles.footerTitle}>
            Knora Edu Academy.
          </Box>
          <Box component="small" sx={forgotStyles.footerSmall}>
            All rights reserved.
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
