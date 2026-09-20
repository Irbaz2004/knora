import { Box } from "@mui/material";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
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
  wordmarkParallax: {
    position: "absolute",
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: "clamp(0.65rem, 1.2vw, 1.4rem)",
    width: "clamp(34rem, 96vw, 112rem)",
    height: "clamp(5.15rem, 14.6vw, 17rem)",
    mx: "auto",
    pointerEvents: "none",
    "@media (max-width: 720px)": {
      bottom: "0.8rem",
      width: "clamp(24rem, 112vw, 42rem)",
      height: "clamp(3.65rem, 17vw, 6.4rem)",
    },
  },
  wordmark: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center 51.6%",
    opacity: 0.58,
    WebkitMaskImage:
      "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.72) 72%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.72) 72%, transparent 100%)",
    pointerEvents: "none",
    userSelect: "none",
    filter: "brightness(0) invert(1) saturate(0)",
  },
  cornerBlur: {
    position: "absolute",
    zIndex: 3,
    bottom: "-8rem",
    width: "clamp(17rem, 34vw, 42rem)",
    height: "clamp(13rem, 25vw, 30rem)",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.78)",
    filter: "blur(clamp(3.5rem, 6vw, 7rem))",
    pointerEvents: "none",
    "@media (max-width: 720px)": {
      bottom: "-5rem",
      width: "18rem",
      height: "14rem",
      filter: "blur(3.5rem)",
    },
  },
  cornerBlurLeft: {
    left: "clamp(-15rem, -11vw, -5rem)",
  },
  cornerBlurRight: {
    right: "clamp(-15rem, -11vw, -5rem)",
  },
};

export default function Footer() {
  const footerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const lettermarkOffset = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const lettermarkOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62],
    [0, 0.35, 1],
  );
  const lettermarkScale = useTransform(scrollYProgress, [0, 0.62], [0.94, 1]);
  const lettermarkOpacitySpring = useSpring(lettermarkOpacity, {
    stiffness: 105,
    damping: 25,
    mass: 0.35,
  });
  const lettermarkScaleSpring = useSpring(lettermarkScale, {
    stiffness: 105,
    damping: 25,
    mass: 0.35,
  });
  const lettermarkY = useSpring(lettermarkOffset, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box ref={footerRef} component="footer" sx={footerStyles.footer}>
      <Box sx={footerStyles.grid} aria-hidden="true" />

      <Box sx={footerStyles.inner}>
        <Box component="span" sx={footerStyles.corner} aria-hidden="true" />

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
        component={motion.div}
        sx={footerStyles.wordmarkParallax}
        style={{
          y: prefersReducedMotion ? 0 : lettermarkY,
          opacity: prefersReducedMotion ? 1 : lettermarkOpacitySpring,
          scale: prefersReducedMotion ? 1 : lettermarkScaleSpring,
        }}
        aria-hidden="true"
      >
        <Box
          component="img"
          src={knoraLettermark}
          alt=""
          sx={footerStyles.wordmark}
        />
      </Box>

      <Box
        sx={{ ...footerStyles.cornerBlur, ...footerStyles.cornerBlurLeft }}
        aria-hidden="true"
      />
      <Box
        sx={{ ...footerStyles.cornerBlur, ...footerStyles.cornerBlurRight }}
        aria-hidden="true"
      />
    </Box>
  );
}
