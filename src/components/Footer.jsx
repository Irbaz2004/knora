import { Box } from "@mui/material";
import { ArrowRight, ArrowUp, Mail } from "lucide-react";
import knoraLettermark from "@/assets/KNORALettermark.png";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact-us" },
  { label: "Admission", href: "/admission-process" },
];

const secondaryLinks = [
  { label: "About", href: "/about-us" },
  { label: "Courses", href: "/courses" },
  { label: "Faculty", href: "/faculty" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const footerStyles = {
  footer: {
    position: "relative",
    isolation: "isolate",
    minHeight: "clamp(38rem, 50vw, 58rem)",
    mt: "-1px",
    overflow: "clip",
    background: "transparent",
    color: "rgba(255, 255, 255, 0.92)",
    "&::after": {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      inset: 0,
      zIndex: 0,
      background:
        "radial-gradient(circle at 22% 24%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 34%), linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--background) 78%, transparent) 9%, color-mix(in oklab, var(--primary) 20%, var(--background)) 20%, #87aee7 31%, #638dd3 43%, #335baf 61%, #153468 81%, #03101f 100%)",
    },
    ".dark &::after": {
      background:
        "radial-gradient(circle at 22% 24%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 34%), linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--background) 82%, transparent) 9%, color-mix(in oklab, var(--primary) 18%, var(--background)) 24%, #4c6fc0 48%, #193b72 76%, #03101f 100%)",
    },
    "&::before": {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      inset: "0 0 auto",
      zIndex: 2,
      height: "clamp(16rem, 24vw, 28rem)",
      background:
        "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 88%, transparent) 18%, color-mix(in oklab, var(--background) 54%, transparent) 44%, color-mix(in oklab, var(--primary) 9%, transparent) 76%, transparent 100%)",
    },
    "@media (max-width: 720px)": {
      minHeight: "54rem",
    },
  },
  grid: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    zIndex: 1,
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0, transparent calc(33.33% - 1px), rgba(255, 255, 255, 0.11) calc(33.33% - 1px), rgba(255, 255, 255, 0.11) 33.33%), repeating-linear-gradient(180deg, transparent 0, transparent calc(25% - 1px), rgba(255, 255, 255, 0.12) calc(25% - 1px), rgba(255, 255, 255, 0.12) 25%)",
    maskImage: "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
    opacity: 0.58,
    "&::after": {
      content: '""',
      position: "absolute",
      inset: "10.25rem 1.75rem auto",
      height: "1px",
      backgroundImage:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.52) 0 4px, transparent 4px 10px)",
      backgroundSize: "10px 1px",
      opacity: 0.46,
      "@media (max-width: 720px)": {
        top: "8.25rem",
      },
    },
  },
  inner: {
    position: "relative",
    zIndex: 3,
    display: "grid",
    minHeight: "clamp(38rem, 50vw, 58rem)",
    gridTemplateColumns:
      "minmax(18rem, 1.15fr) minmax(18rem, 1.25fr) minmax(12rem, 0.82fr) minmax(8rem, 0.58fr)",
    gridTemplateRows: "auto 1fr auto",
    gap: "clamp(2.25rem, 4.4vw, 5.5rem)",
    p: "clamp(10.25rem, 12vw, 14rem) clamp(1.75rem, 3vw, 3.6rem) clamp(9.5rem, 14vw, 17rem)",
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gridTemplateRows: "auto auto auto auto",
      paddingBottom: "clamp(8rem, 18vw, 13rem)",
    },
    "@media (max-width: 720px)": {
      minHeight: "54rem",
      gridTemplateColumns: "1fr",
      gap: "2.25rem",
      p: "9.5rem 1.25rem 8.5rem",
    },
  },
  corner: {
    position: "absolute",
    left: "clamp(1.75rem, 3vw, 3.6rem)",
    top: "10.25rem",
    width: "0.38rem",
    height: "0.38rem",
    background: "rgba(255, 255, 255, 0.9)",
    "@media (max-width: 720px)": {
      top: "8.25rem",
    },
  },
  signup: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: "clamp(1.8rem, 4.4vw, 3.7rem)",
  },
  heading: {
    m: 0,
    color: "#ffffff",
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.35rem, 1.55vw, 1.72rem)",
    fontWeight: 800,
    letterSpacing: 0,
  },
  emailRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    borderBottom: "1px dashed rgba(255, 255, 255, 0.18)",
    pb: "0.9rem",
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
      gap: "0.95rem",
    },
  },
  emailIcon: {
    width: "1.1rem",
    height: "1.1rem",
    mr: "0.72rem",
    color: "rgba(255, 255, 255, 0.48)",
    "@media (max-width: 720px)": {
      display: "none",
    },
  },
  input: {
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: "#ffffff",
    font: "inherit",
    fontSize: "clamp(1rem, 1.15vw, 1.2rem)",
    fontWeight: 700,
    outline: "none",
    "&::placeholder": {
      color: "rgba(225, 236, 255, 0.48)",
      opacity: 1,
    },
  },
  submit: {
    display: "inline-flex",
    height: "2.15rem",
    alignItems: "center",
    gap: 0,
    border: 0,
    background: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.72rem",
    fontWeight: 900,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    p: 0,
    "@media (max-width: 720px)": {
      width: "fit-content",
    },
  },
  submitText: {
    display: "inline-flex",
    height: "100%",
    alignItems: "center",
    px: "1rem",
  },
  submitIcon: {
    width: "2.15rem",
    height: "100%",
    p: "0.55rem",
    background: "rgba(255, 255, 255, 0.08)",
  },
  label: {
    m: "0 0 1rem",
    color: "rgba(255, 255, 255, 0.84)",
    fontSize: "0.76rem",
    fontWeight: 900,
    letterSpacing: "0.075em",
    textTransform: "uppercase",
  },
  nav: {
    alignSelf: "start",
  },
  navColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(1.5rem, 6vw, 8rem)",
    "@media (max-width: 720px)": {
      gap: "2rem",
    },
  },
  list: {
    display: "grid",
    gap: "0.34rem",
    m: 0,
    p: 0,
    listStyle: "none",
  },
  link: {
    color: "#ffffff",
    fontSize: "clamp(1.05rem, 1.15vw, 1.24rem)",
    fontWeight: 800,
    lineHeight: 1.24,
    textDecoration: "none",
    "&:hover": {
      color: "#ffffff",
      textDecoration: "underline",
      textUnderlineOffset: "0.18em",
    },
  },
  topButton: {
    alignSelf: "start",
    justifySelf: "end",
    display: "grid",
    justifyItems: "center",
    border: 0,
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    p: 0,
    "@media (max-width: 1024px)": {
      justifySelf: "start",
    },
  },
  topIcon: {
    width: "2.15rem",
    height: "2.15rem",
    p: "0.5rem",
    background: "rgba(255, 255, 255, 0.13)",
  },
  listed: {
    alignSelf: "end",
    maxWidth: "26rem",
  },
  finePrint: {
    m: 0,
    color: "rgba(232, 241, 255, 0.72)",
    fontSize: "0.76rem",
    fontWeight: 900,
    letterSpacing: "0.055em",
    lineHeight: 1.55,
    textTransform: "uppercase",
  },
  legal: {
    alignSelf: "end",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.9rem",
  },
  legalLink: {
    color: "rgba(232, 241, 255, 0.78)",
    fontSize: "0.76rem",
    fontWeight: 900,
    letterSpacing: "0.055em",
    textTransform: "uppercase",
    "&:hover": {
      color: "#ffffff",
      textDecoration: "underline",
      textUnderlineOffset: "0.18em",
    },
  },
  copy: {
    alignSelf: "end",
    gridColumn: "3 / span 2",
    "@media (max-width: 1024px)": {
      gridColumn: "auto",
    },
  },
  wordmark: {
    position: "absolute",
    zIndex: 2,
    left: "50%",
    right: "auto",
    bottom: "clamp(0.65rem, 1.2vw, 1.4rem)",
    width: "clamp(34rem, 96vw, 112rem)",
    height: "clamp(5.15rem, 14.6vw, 17rem)",
    transform: "translateX(-50%)",
    display: "block",
    objectFit: "cover",
    objectPosition: "center 51.6%",
    opacity: 0.58,
    pointerEvents: "none",
    userSelect: "none",
    filter:
      "brightness(0) invert(1) saturate(0) drop-shadow(0 1.15rem 2.4rem rgba(1, 10, 25, 0.32))",
    "@media (max-width: 720px)": {
      bottom: "0.8rem",
      width: "clamp(24rem, 112vw, 42rem)",
      height: "clamp(3.65rem, 17vw, 6.4rem)",
    },
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    p: 0,
    m: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Box sx={footerStyles.grid} aria-hidden="true" />

      <Box sx={footerStyles.inner}>
        <Box component="span" sx={footerStyles.corner} aria-hidden="true" />

        <Box
          component="section"
          sx={footerStyles.signup}
          aria-label="Newsletter signup"
        >
          <Box component="h2" sx={footerStyles.heading}>
            Sign up to stay sharp:
          </Box>
          <Box component="form" onSubmit={(event) => event.preventDefault()}>
            <Box
              component="label"
              sx={footerStyles.srOnly}
              htmlFor="footer-email"
            >
              Email address
            </Box>
            <Box sx={footerStyles.emailRow}>
              <Box
                component={Mail}
                sx={footerStyles.emailIcon}
                aria-hidden="true"
              />
              <Box
                component="input"
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                sx={footerStyles.input}
              />
              <Box component="button" type="submit" sx={footerStyles.submit}>
                <Box component="span" sx={footerStyles.submitText}>
                  Sign Up
                </Box>
                <Box
                  component={ArrowRight}
                  sx={footerStyles.submitIcon}
                  aria-hidden="true"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          component="nav"
          sx={footerStyles.nav}
          aria-label="Footer navigation"
        >
          <Box component="p" sx={footerStyles.label}>
            Navigation
          </Box>
          <Box sx={footerStyles.navColumns}>
            {[primaryLinks, secondaryLinks].map((group, index) => (
              <Box component="ul" sx={footerStyles.list} key={index}>
                {group.map((link) => (
                  <Box component="li" key={link.label}>
                    <Box component="a" href={link.href} sx={footerStyles.link}>
                      {link.label}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="section"
          sx={footerStyles.nav}
          aria-label="Social links"
        >
          <Box component="p" sx={footerStyles.label}>
            Social
          </Box>
          <Box component="ul" sx={footerStyles.list}>
            {socialLinks.map((link) => (
              <Box component="li" key={link.label}>
                <Box component="a" href={link.href} sx={footerStyles.link}>
                  {link.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="button"
          type="button"
          sx={footerStyles.topButton}
          onClick={backToTop}
          aria-label="Back to top"
        >
          <Box component="span" sx={footerStyles.label}>
            Back to top
          </Box>
          <Box
            component={ArrowUp}
            sx={footerStyles.topIcon}
            aria-hidden="true"
          />
        </Box>

        <Box
          component="section"
          sx={footerStyles.listed}
          aria-label="Knora details"
        >
          <Box component="p" sx={footerStyles.finePrint}>
            Knora Edu Academy is built for practical AI learning, guided
            projects, and career-ready confidence.
          </Box>
        </Box>

        <Box sx={footerStyles.legal}>
          <Box component="a" href="/privacy-policy" sx={footerStyles.legalLink}>
            Privacy Policy
          </Box>
          <Box component="a" href="/terms-of-use" sx={footerStyles.legalLink}>
            Terms of Use
          </Box>
        </Box>

        <Box
          component="p"
          sx={{ ...footerStyles.finePrint, ...footerStyles.copy }}
        >
          &copy; 2026 Knora Edu Academy. All rights reserved
        </Box>
      </Box>

      <Box
        component="img"
        src={knoraLettermark}
        alt=""
        sx={footerStyles.wordmark}
        aria-hidden="true"
      />
    </Box>
  );
}
