// AuthLayout.jsx
import { Box, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import logo from "@/assets/knora-logo-transparent.png";
import authRight from "@/assets/authright.png";

const features = [
  { Icon: VerifiedOutlinedIcon, title: "Role-Based Access", copy: "Secure dashboards for every role" },
  { Icon: GroupOutlinedIcon, title: "Smart & Efficient", copy: "Automated academic workflows" },
  { Icon: BarChartOutlinedIcon, title: "Real-Time Insights", copy: "Data-driven decision making" },
  { Icon: SchoolOutlinedIcon, title: "Built for Education", copy: "Designed for academic excellence" },
];

// Shared sx styles — imported by Login.jsx, SignUp.jsx, ForgotPassword.jsx
// so every auth page keeps identical field sizes, spacing, and colors.
export const authStyles = {
  copy: {
    mb: 4,
  },
  copyCompact: {
    mb: 3,
  },
  heading: {
    fontSize: { xs: 28, md: 36 },
    fontWeight: 800,
    color: "#10182b",
    mb: 1,
    lineHeight: 1.2,
    "& span": {
      color: "#1e5feb",
    },
  },
  subtext: {
    fontSize: 15,
    color: "#6b7280",
    m: 0,
  },
  backLink: {
    alignSelf: "flex-start",
    color: "#1e5feb",
    fontWeight: 600,
    textTransform: "none",
    p: 0,
    mb: 2,
    minWidth: 0,
    "&:hover": { background: "transparent", textDecoration: "underline" },
  },
  form: {
    gap: 2.25,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: "#ffffff",
      height: "56px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e2e5ea",
    },
    "& input": {
      fontSize: 15,
    },
    "& .MuiInputAdornment-root svg": {
      color: "#98a2b3",
    },
  },
  formRow: {
    display: "flex",
    justifyContent: "flex-end",
    mt: -1,
  },
  link: {
    color: "#1e5feb",
    fontSize: 13,
    textTransform: "none",
    p: 0,
    minWidth: 0,
    "&:hover": { background: "transparent", textDecoration: "underline" },
  },
  primaryButton: {
    background: "#1e5feb",
    height: "52px",
    borderRadius: "10px",
    fontSize: 16,
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 10px 24px rgba(30, 95, 235, 0.25)",
    "&:hover": { background: "#174ecb" },
    "&:disabled": { background: "#a9c1f3", color: "#fff" },
  },
  divider: {
    my: 3,
    color: "#9aa2b1",
    fontSize: 12,
    letterSpacing: "0.5px",
    "&::before, &::after": { borderColor: "#e5e8ef" },
  },
  socialRow: {
    gap: 2,
    justifyContent: "center",
  },
  socialButton: {
    width: 52,
    height: 52,
    border: "1px solid #e5e8ef",
    borderRadius: "12px",
    color: "#344054",
    "&:hover": { background: "#f4f6fb" },
  },
  note: {
    mt: 3,
    display: "flex",
    gap: 1.5,
    alignItems: "flex-start",
    background: "#eef3ff",
    borderRadius: "12px",
    p: 2,
  },
  noteIcon: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#d9e6ff",
    color: "#1e5feb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  noteText: {
    m: 0,
    fontSize: 13,
    color: "#3a4356",
    lineHeight: 1.5,
  },
  switch: {
    mt: 3.5,
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.25,
    flexWrap: "wrap",
    "& .MuiButton-root": {
      color: "#1e5feb",
      textTransform: "none",
      fontWeight: 600,
      p: "0 4px",
      minWidth: 0,
      "&:hover": { background: "transparent", textDecoration: "underline" },
    },
  },
};

export default function AuthLayout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: "1920px",
          minHeight: { xs: "auto", md: "100vh" },
        }}
      >
        {/* ---------------- LEFT: FORM SIDE ---------------- */}
        <Box
          component="section"
          sx={{
            flex: { md: "1 1 46%" },
            maxWidth: { md: "640px" },
            order: { xs: 2, md: 1 },
            display: "flex",
            flexDirection: "column",
            p: { xs: "32px 24px 24px", md: "40px 64px" },
            position: "relative",
            background: "#ffffff",
          }}
        >
          <Box
            component="a"
            href="/"
            sx={{ display: "flex", alignItems: "center", mb: 4, textDecoration: "none" }}
          >
            <Box component="img" src={logo} alt="Knora Edu Academy" sx={{ height: 44, width: "auto", display: "block" }} />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              maxWidth: 460,
              mx: "auto",
            }}
          >
            {children}
          </Box>

          <Box
            component="footer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              pt: 3.5,
              pb: 1,
              mt: "auto",
              borderTop: "1px solid #eef0f4",
              flexWrap: "wrap",
            }}
          >
            {features.map(({ Icon, title, copy }) => (
              <Box key={title} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "#eef3ff",
                    color: "#1e5feb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#10182b" }}>{title}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#8b93a3" }}>{copy}</Typography>
                </Box>
              </Box>
            ))}

            <Box sx={{ ml: "auto", textAlign: "right" }}>
              <Typography sx={{ fontSize: 12, color: "#8b93a3" }}>
                © 2025 <Box component="span" sx={{ color: "#1e5feb", fontWeight: 600 }}>Knora Edu Academy.</Box>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#8b93a3" }}>All rights reserved.</Typography>
            </Box>
          </Box>
        </Box>

        {/* ---------------- RIGHT: SHOWCASE IMAGE ---------------- */}
        <Box
          component="section"
          sx={{
            flex: { md: "1 1 54%" },
            order: { xs: 1, md: 2 },
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: 340, md: "auto" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: 16, md: 32 },
              right: { xs: 16, md: 32 },
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              background: "rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "14px",
              p: { xs: "8px 12px", md: "12px 18px" },
              color: "#ffffff",
            }}
          >
            <ShieldOutlinedIcon sx={{ flexShrink: 0 }} />
            <Typography
              component="span"
              sx={{
                fontSize: 12,
                lineHeight: 1.6,
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                "& b, & strong": { fontWeight: 600 },
              }}
            >
              <strong>Secure</strong>
              <b>•</b>
              <b>Smart</b>
              <b>•</b>
              <b>Seamless</b>
              <Box component="span" sx={{ width: "100%", opacity: 0.85, fontWeight: 400 }}>
                Academic Management Simplified
              </Box>
            </Typography>
          </Box>

          <Box
            component="img"
            src={authRight}
            alt="Knora academic management dashboard"
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>
      </Box>
    </Box>
  );
}