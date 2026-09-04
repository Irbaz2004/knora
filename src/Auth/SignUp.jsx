// SignUp.jsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "@/assets/knora-logo-transparent.png";
import authRight from "@/assets/authright.png";
import {
  appleProvider,
  facebookProvider,
  googleProvider,
  requireFirebaseAuth,
  saveUserProfile,
} from "@/firebase";

const socialProviders = [
  {
    label: "Google",
    Icon: GoogleIcon,
    provider: googleProvider,
    color: "#0b7bea",
  },
  {
    label: "Facebook",
    Icon: FacebookIcon,
    provider: facebookProvider,
    color: "#1877f2",
  },
  {
    label: "Apple",
    Icon: AppleIcon,
    provider: appleProvider,
    color: "#101828",
  },
];

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

const signUpStyles = {
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
    width: "min(100%, 34rem)",
    flexDirection: "column",
    justifyContent: "center",
    m: "5rem auto 0",
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
    mb: "0.45rem",
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
    fontSize: "clamp(2rem, 3vw, 3.35rem)",
    fontWeight: 900,
    lineHeight: 1.04,
    "& span": {
      color: "#0572ea",
    },
  },
  subtext: {
    m: "0.4rem 0 0",
    color: "#4f5e78",
    fontSize: "clamp(0.88rem, 0.95vw, 1rem)",
  },
  form: {
    width: "100%",
    gap: "0.78rem",
    mt: "0.75rem",
    "@media (max-height: 820px) and (min-width: 1025px)": {
      gap: "0.68rem",
      mt: "0.6rem",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      height: "3rem",
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
    "& .MuiInputAdornment-positionEnd": {
      ml: "0.45rem",
    },
    "& .MuiInputAdornment-root, & .MuiIconButton-root": {
      color: "#526783",
    },
    "& .MuiInputAdornment-root svg, & .MuiIconButton-root svg": {
      fontSize: "1.25rem",
    },
    "& .MuiInputBase-input": {
      p: "0.85rem 1rem 0.85rem 0.85rem",
      color: "#101828",
      cursor: "text !important",
      fontSize: "0.92rem",
      // fontWeight: 650,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#7f8daa",
      opacity: 1,
    },
  },
  primaryButton: {
    minHeight: "3rem",
    mt: "0.22rem",
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
  divider: {
    width: "100%",
    m: "0.95rem 0 0.22rem",
    color: "#8796b4",
    fontFamily: "var(--font-sans)",
    fontSize: "0.72rem",
    fontWeight: 900,
    lineHeight: 1,
    
    "&::before, &::after": {
      borderColor: "#d6e1ef",
    },
    "@media (max-height: 820px) and (min-width: 1025px)": {
      m: "0.5rem 0 0.18rem",
    },
  },
  socialRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.65rem",
    my: "0",
    mt: 2,
    lineHeight: 0,
  },
  socialButton: {
    display: "inline-flex",
    width: "2.85rem",
    minWidth: "2.85rem",
    maxWidth: "2.85rem",
    height: "2.85rem",
    minHeight: "2.85rem",
    maxHeight: "2.85rem",
    flex: "0 0 2.85rem",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    aspectRatio: "1 / 1",
    p: 0,
    border: "1px solid #ccd9ea",
    borderRadius: "50%",
    background: "#ffffff",
    cursor: "pointer !important",
    lineHeight: 1,
    "& svg": {
      display: "block",
      width: "1.18rem",
      height: "1.18rem",
      flex: "0 0 auto",
    },
    "&:hover": {
      borderColor: "#0572ea",
      background: "#f4f9ff",
      color: "#0572ea",
    },
    "&:disabled": {
      cursor: "wait",
      opacity: 0.68,
    },
    "@media (max-width: 720px)": {
      width: "2.7rem",
      minWidth: "2.7rem",
      maxWidth: "2.7rem",
      height: "2.7rem",
      minHeight: "2.7rem",
      maxHeight: "2.7rem",
      flexBasis: "2.7rem",
    },
  },
  switchText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    mt: "0.65rem",
    color: "#65738e",
    fontSize: "0.94rem",
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
      content: '"•"',
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
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Sign up was cancelled.",
    "auth/configuration-not-found":
      "Firebase is not configured yet. Add your Vite Firebase env values.",
  };

  return messages[error.code] ?? error.message;
}

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const completeSignUp = async (user, authProvider = "password") => {
    await saveUserProfile(user, {
      fullName: form.fullName,
      email: form.email,
      authProvider,
    });
    setStatus("Account created. Redirecting...");
    window.setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      const credential = await createUserWithEmailAndPassword(
        requireFirebaseAuth(),
        form.email,
        form.password,
      );

      await updateProfile(credential.user, {
        displayName: form.fullName,
      });
      await completeSignUp(credential.user);
    } catch (signUpError) {
      setError(getAuthMessage(signUpError));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (item) => {
    setLoading(true);
    setError("");
    setStatus("");

    try {
      const credential = await signInWithPopup(
        requireFirebaseAuth(),
        item.provider,
      );
      await saveUserProfile(credential.user, {
        fullName: credential.user.displayName,
        email: credential.user.email,
        authProvider: item.label.toLowerCase(),
      });
      setStatus("Account connected. Redirecting...");
      window.setTimeout(() => {
        window.location.href = "/";
      }, 700);
    } catch (socialError) {
      setError(getAuthMessage(socialError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="main" sx={signUpStyles.page}>
      <Box sx={signUpStyles.shell}>
        <Box component="section" sx={signUpStyles.formSide}>
          <Box
            component="a"
            href="/"
            aria-label="Knora Edu Academy"
            sx={signUpStyles.brand}
          >
            <Box
              component="img"
              src={logo}
              alt="Knora Edu Academy"
              sx={signUpStyles.brandImage}
            />
          </Box>

          <Box sx={signUpStyles.panel}>
            <Button
              href="/login"
              variant="text"
              startIcon={<KeyboardBackspaceIcon />}
              sx={signUpStyles.backLink}
            >
              Back to Login
            </Button>

            <Box sx={signUpStyles.copy}>
              <Typography component="h1" sx={signUpStyles.heading}>
                Create <Box component="span">Account</Box>
              </Typography>
              <Typography component="p" sx={signUpStyles.subtext}>
                Sign up with email or continue with your preferred account
              </Typography>
            </Box>

            <Stack
              component="form"
              sx={signUpStyles.form}
              onSubmit={handleEmailSignUp}
            >
              <TextField
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Full name"
                autoComplete="name"
                required
                fullWidth
                sx={signUpStyles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="Email address"
                type="email"
                autoComplete="email"
                required
                fullWidth
                sx={signUpStyles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                inputProps={{ minLength: 6 }}
                required
                fullWidth
                sx={signUpStyles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
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
                sx={signUpStyles.primaryButton}
                startIcon={<LockOutlinedIcon />}
              >
                {loading ? "Creating..." : "Sign Up with Email"}
              </Button>
            </Stack>

            <Divider sx={signUpStyles.divider}>OR SIGN UP WITH</Divider>

            <Stack direction="row" sx={signUpStyles.socialRow}>
              {socialProviders.map((item) => (
                <IconButton
                  key={item.label}
                  onClick={() => handleSocialSignUp(item)}
                  disabled={loading}
                  sx={{ ...signUpStyles.socialButton, color: item.color }}
                  aria-label={`Sign up with ${item.label}`}
                >
                  <item.Icon />
                </IconButton>
              ))}
            </Stack>

            <Typography component="p" sx={signUpStyles.switchText}>
              Already have an account?
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
          sx={signUpStyles.showcase}
        >
          <Box sx={signUpStyles.secureChip}>
            <ShieldOutlinedIcon />
            <Typography component="p" sx={signUpStyles.secureText}>
              <Box component="strong" sx={signUpStyles.secureWord}>
                Secure
              </Box>
              <Box component="b" sx={signUpStyles.secureDot}>
                Smart
              </Box>
              <Box component="b" sx={signUpStyles.secureDot}>
                Seamless
              </Box>
              <Box component="small" sx={signUpStyles.secureSmall}>
                Academic Management Simplified
              </Box>
            </Typography>
          </Box>
          <Box
            component="img"
            src={authRight}
            alt="Knora academic management dashboard"
            sx={signUpStyles.showcaseImage}
          />
        </Box>
      </Box>

      <Box component="footer" sx={signUpStyles.footer}>
        {features.map(({ Icon, title, copy }) => (
          <Box sx={signUpStyles.footerItem} key={title}>
            <Box component="span" sx={signUpStyles.footerIcon}>
              <Icon fontSize="small" />
            </Box>
            <Typography component="p" sx={signUpStyles.footerText}>
              <Box component="strong" sx={signUpStyles.footerTitle}>
                {title}
              </Box>
              <Box component="small" sx={signUpStyles.footerSmall}>
                {copy}
              </Box>
            </Typography>
          </Box>
        ))}

        <Typography component="p" sx={signUpStyles.copyright}>
          &copy; 2026{" "}
          <Box component="strong" sx={signUpStyles.footerTitle}>
            Knora Edu Academy.
          </Box>
          <Box component="small" sx={signUpStyles.footerSmall}>
            All rights reserved.
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
