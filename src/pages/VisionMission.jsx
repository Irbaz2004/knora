import React, { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ArrowForward,
  AutoGraphOutlined,
  BarChartOutlined,
  CodeOutlined,
  EmojiObjectsOutlined,
  GpsFixedOutlined,
  GroupsOutlined,
  MenuBookOutlined,
  NorthEastOutlined,
  RocketLaunchOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorEffect from "@/components/CursorEffect";
import courseImage from "@/assets/courseimg.webp";
import facultyAisha from "@/assets/faculty-aisha.avif";
import facultyRahul from "@/assets/faculty-rahul.jpg";

gsap.registerPlugin(ScrollTrigger);

const visionMetrics = [
  ["800+", "Active learners"],
  ["12", "Learning tracks"],
  ["260+", "Guided projects"],
];

const journeySteps = [
  {
    icon: MenuBookOutlined,
    title: "Learn",
    copy: "Clear concepts and structured sessions for practical understanding.",
  },
  {
    icon: CodeOutlined,
    title: "Practice",
    copy: "Hands-on labs, assignments, and mentor-led project reviews.",
  },
  {
    icon: RocketLaunchOutlined,
    title: "Build",
    copy: "Portfolio-ready work that proves confidence and capability.",
  },
  {
    icon: AutoGraphOutlined,
    title: "Grow",
    copy: "Career guidance, communication practice, and interview readiness.",
  },
];

const principles = [
  {
    icon: GpsFixedOutlined,
    title: "Purpose First",
    copy: "Every course path is built around outcomes students can actually use.",
  },
  {
    icon: GroupsOutlined,
    title: "Mentor Close",
    copy: "Learners get guidance, feedback, and support instead of passive content.",
  },
  {
    icon: BarChartOutlined,
    title: "Progress Visible",
    copy: "Milestones, projects, and reviews make growth easy to track.",
  },
  {
    icon: SchoolOutlined,
    title: "Future Ready",
    copy: "The focus stays on skills that remain relevant in a changing tech world.",
  },
];

const particles = [
  [8, 12, 4, 0.28],
  [16, 46, 7, 0.18],
  [24, 78, 3, 0.32],
  [31, 22, 5, 0.2],
  [39, 61, 4, 0.28],
  [47, 34, 8, 0.16],
  [55, 86, 5, 0.22],
  [63, 16, 3, 0.34],
  [72, 48, 6, 0.19],
  [84, 28, 4, 0.3],
  [92, 72, 7, 0.17],
  [11, 88, 5, 0.2],
  [19, 24, 3, 0.36],
  [28, 55, 6, 0.18],
  [36, 91, 4, 0.27],
  [44, 10, 5, 0.2],
  [52, 69, 3, 0.34],
  [60, 42, 7, 0.17],
  [68, 96, 4, 0.26],
  [77, 8, 5, 0.22],
  [86, 58, 3, 0.34],
  [95, 39, 6, 0.18],
  [5, 67, 3, 0.3],
  [33, 43, 4, 0.24],
  [58, 5, 3, 0.28],
  [81, 83, 5, 0.2],
];

const trackParticles = [
  [0, 4, 0.4],
  [12, 7, 0.72],
  [24, 3, 0.52],
  [36, 6, 0.64],
  [48, 4, 0.46],
  [60, 8, 0.78],
  [72, 3, 0.5],
  [84, 5, 0.66],
  [96, 4, 0.42],
  [108, 7, 0.74],
  [120, 3, 0.48],
  [132, 5, 0.62],
];

function useVisionMissionGsap(pageRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;

      if (reduceMotion || isMobile) {
        gsap.set(".vm-slide, .vm-reveal, .vm-track-particle", {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        return;
      }

      ScrollTrigger.config({ ignoreMobileResize: true });
      gsap.set(".vm-slide, .vm-reveal", {
        willChange: "opacity, transform, filter",
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".vm-badge", {
          autoAlpha: 0,
          y: 16,
          duration: 0.5,
        })
        .from(
          ".vm-slide",
          {
            autoAlpha: 0,
            x: (index) => (index % 2 === 0 ? -96 : 96),
            y: 12,
            filter: "blur(8px)",
            stagger: 0.11,
            duration: 0.9,
          },
          "-=0.22",
        )
        .from(
          ".vm-hero-copy, .vm-hero-action",
          {
            autoAlpha: 0,
            x: -34,
            y: 10,
            filter: "blur(6px)",
            stagger: 0.08,
            duration: 0.58,
          },
          "-=0.5",
        )
        .from(
          ".vm-hero-visual",
          {
            autoAlpha: 0,
            x: 64,
            y: 18,
            filter: "blur(8px)",
            duration: 0.82,
          },
          "-=0.5",
        );

      gsap.utils.toArray(".vm-section").forEach((section) => {
        const items = section.querySelectorAll(".vm-reveal");

        if (!items.length) {
          return;
        }

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              end: "bottom 18%",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            items,
            {
              autoAlpha: 0,
              x: (index) => (index % 2 === 0 ? -92 : 92),
              y: 18,
              filter: "blur(8px)",
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.06,
              duration: 0.42,
            },
          )
          .to(
            items,
            {
              autoAlpha: 0,
              x: (index) => (index % 2 === 0 ? 82 : -82),
              y: -12,
              filter: "blur(6px)",
              stagger: 0.035,
              duration: 0.3,
              ease: "power2.in",
            },
            0.74,
          );
      });

      gsap.utils.toArray(".vm-particle").forEach((particle, index) => {
        gsap.to(particle, {
          x: index % 2 === 0 ? 10 : -8,
          y: index % 3 === 0 ? -18 : 14,
          scale: index % 4 === 0 ? 1.35 : 0.84,
          opacity: index % 5 === 0 ? 0.5 : 0.26,
          duration: 2.8 + (index % 6) * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.fromTo(
        ".vm-track-particle",
        {
          x: 0,
          autoAlpha: 0,
          scale: 0.55,
        },
        {
          x: "108vw",
          autoAlpha: 1,
          scale: 1.15,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".vm-rhythm-section",
            start: "top 82%",
            end: "bottom 18%",
            scrub: 0.7,
          },
        },
      );

      gsap.to(".vm-track-particle", {
        y: (index) => (index % 2 === 0 ? -8 : 8),
        duration: 1.6,
        stagger: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [pageRef]);
}

function Eyebrow({ children }) {
  return (
    <Typography
      className="vm-badge"
      sx={{
        color: "var(--primary)",
        fontSize: "0.72rem",
        fontWeight: 800,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
}

function ParticleField() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 18%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 26%), radial-gradient(circle at 82% 42%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 30%), radial-gradient(circle at 44% 88%, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 34%)",
      }}
    >
      {particles.map(([left, top, size, opacity], index) => (
        <Box
          key={`${left}-${top}-${index}`}
          className="vm-particle"
          sx={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            borderRadius: "999px",
            bgcolor: "var(--primary)",
            opacity,
            boxShadow:
              "0 0 18px color-mix(in oklab, var(--primary) 58%, transparent)",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          left: "14%",
          top: "38%",
          width: { xs: 170, md: 260 },
          height: { xs: 170, md: 260 },
          borderRadius: "999px",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 68%)",
          filter: "blur(4px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: "8%",
          bottom: "16%",
          width: { xs: 190, md: 320 },
          height: { xs: 190, md: 320 },
          borderRadius: "999px",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)",
          filter: "blur(5px)",
        }}
      />
    </Box>
  );
}

function MetricStrip() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        borderTop: "1px solid var(--border)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {visionMetrics.map(([value, label]) => (
        <Box
          key={label}
          sx={{
            minHeight: 96,
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            bgcolor: "color-mix(in oklab, var(--card) 72%, transparent)",
            p: { xs: 1.6, md: 2 },
          }}
        >
          <Typography
            className="font-display"
            sx={{
              color: "var(--foreground)",
              fontFamily: "var(--font-display)",
              fontSize: { xs: "1.9rem", md: "2.35rem" },
              fontWeight: 800,
              lineHeight: 0.92,
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "var(--muted-foreground)",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function HeroVisual() {
  return (
    <Box
      className="vm-hero-visual"
      sx={{
        position: "relative",
        minHeight: { xs: 420, md: 560 },
        borderRadius: "8px",
        overflow: "hidden",
        border:
          "1px solid color-mix(in oklab, var(--primary) 18%, var(--border))",
        bgcolor: "var(--card)",
      }}
    >
      <Box
        component="img"
        src={courseImage}
        alt="Knora practical learning session"
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "inherit",
          display: "block",
          objectFit: "cover",
          filter: "grayscale(1) contrast(1.08)",
          opacity: 0.9,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 20%, color-mix(in oklab, var(--background) 92%, transparent)), linear-gradient(90deg, color-mix(in oklab, var(--primary) 20%, transparent), transparent 52%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: { xs: 18, md: 24 },
          right: { xs: 18, md: 24 },
          bottom: { xs: 18, md: 24 },
          display: "grid",
          gap: 1.4,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            width: "fit-content",
            alignItems: "center",
            gap: 1,
            border:
              "1px solid color-mix(in oklab, var(--primary) 30%, var(--border))",
            borderRadius: "8px",
            bgcolor: "color-mix(in oklab, var(--card) 84%, transparent)",
            px: 1.3,
            py: 0.85,
            backdropFilter: "blur(18px)",
          }}
        >
          <EmojiObjectsOutlined
            sx={{ color: "var(--primary)", fontSize: 18 }}
          />
          <Typography
            sx={{
              color: "var(--foreground)",
              fontSize: "0.76rem",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Practical knowledge. Real outcomes.
          </Typography>
        </Box>
        <MetricStrip />
      </Box>
    </Box>
  );
}

function PurposeBlock({ number, label, title, copy, image, reverse = false }) {
  return (
    <Box
      className="vm-section"
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
        gap: { xs: 3, lg: 4 },
        alignItems: "stretch",
        px: { xs: 2, sm: 4, lg: 7 },
        py: { xs: 5, md: 7 },
      }}
    >
      <Box
        className="vm-reveal"
        sx={{
          gridColumn: { lg: reverse ? "8 / span 5" : "1 / span 5" },
          gridRow: { lg: 1 },
          display: "flex",
          minHeight: { xs: 320, md: 440 },
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          bgcolor: "color-mix(in oklab, var(--card) 78%, transparent)",
          p: { xs: 2.4, md: 3.6 },
        }}
      >
        <Box>
          <Typography
            className="font-display"
            sx={{
              color: "var(--primary)",
              fontFamily: "var(--font-display)",
              fontSize: "0.86rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {number} / {label}
          </Typography>
          <Typography
            className="font-display"
            sx={{
              mt: 4,
              color: "var(--foreground)",
              fontFamily: "var(--font-display)",
              fontSize: { xs: "2.25rem", md: "3.45rem" },
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: 4,
            maxWidth: 460,
            color: "var(--muted-foreground)",
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.7,
          }}
        >
          {copy}
        </Typography>
      </Box>

      <Box
        className="vm-reveal"
        sx={{
          gridColumn: { lg: reverse ? "1 / span 7" : "6 / span 7" },
          gridRow: { lg: 1 },
          position: "relative",
          minHeight: { xs: 320, md: 440 },
          overflow: "hidden",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          bgcolor: "var(--card)",
        }}
      >
        <Box
          component="img"
          src={image}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.08)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent, color-mix(in oklab, var(--background) 78%, transparent)), radial-gradient(circle at 22% 24%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 34%), radial-gradient(circle at 82% 76%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 38%)",
            opacity: 0.72,
          }}
        />
      </Box>
    </Box>
  );
}

function setNeonPosition(event) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--vm-neon-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--vm-neon-y",
    `${event.clientY - bounds.top}px`,
  );
}

function JourneyCard({ step, index }) {
  const Icon = step.icon;

  return (
    <Box
      className="vm-reveal vm-neon-card"
      onMouseMove={setNeonPosition}
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: 260,
        border:
          "1px solid color-mix(in oklab, var(--primary) 16%, var(--border))",
        borderRadius: "8px",
        bgcolor: "color-mix(in oklab, var(--card) 76%, transparent)",
        p: { xs: 2.3, md: 2.7 },
        transform: "translateZ(0)",
        transition:
          "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, background 0.28s ease",
        "&::before": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(220px circle at var(--vm-neon-x, 50%) var(--vm-neon-y, 50%), color-mix(in oklab, var(--primary) 28%, transparent), transparent 62%)",
          opacity: 0,
          transition: "opacity 0.24s ease",
        },
        "&::after": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, transparent), transparent 42%, color-mix(in oklab, var(--primary) 12%, transparent))",
          opacity: 0,
          transition: "opacity 0.28s ease",
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
        "&:hover": {
          transform: "translateY(-6px) scale(1.025)",
          borderColor: "color-mix(in oklab, var(--primary) 62%, var(--border))",
          bgcolor: "color-mix(in oklab, var(--card) 88%, transparent)",
        },
        "&:hover::before, &:hover::after": {
          opacity: 1,
        },
        "&:hover .vm-card-icon": {
          transform: "scale(1.12)",
          bgcolor: "color-mix(in oklab, var(--primary) 22%, var(--card))",
        },
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 16,
          right: 18,
          color: "color-mix(in oklab, var(--foreground) 28%, transparent)",
          fontSize: "0.78rem",
          fontWeight: 800,
        }}
      >
        0{index + 1}
      </Typography>
      <Box
        className="vm-card-icon"
        sx={{
          display: "grid",
          width: 48,
          height: 48,
          placeItems: "center",
          borderRadius: "8px",
          bgcolor: "color-mix(in oklab, var(--primary) 13%, var(--card))",
          color: "var(--primary)",
          transition:
            "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), background 0.28s ease",
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Typography
        className="font-display"
        sx={{
          mt: 5,
          color: "var(--foreground)",
          fontFamily: "var(--font-display)",
          fontSize: "1.55rem",
          fontWeight: 800,
        }}
      >
        {step.title}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          color: "var(--muted-foreground)",
          fontSize: "0.92rem",
          lineHeight: 1.6,
        }}
      >
        {step.copy}
      </Typography>
    </Box>
  );
}

function PrincipleRow({ item }) {
  const Icon = item.icon;

  return (
    <Box
      className="vm-reveal vm-neon-row"
      onMouseMove={setNeonPosition}
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: { xs: "3rem 1fr", md: "4rem 0.7fr 1fr" },
        alignItems: "center",
        gap: { xs: 1.6, md: 3 },
        borderTop: "1px solid var(--border)",
        borderRadius: "8px",
        mx: { xs: -1, md: -1.6 },
        px: { xs: 1, md: 1.6 },
        py: { xs: 2.3, md: 2.7 },
        transform: "translateZ(0)",
        transition:
          "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, background 0.28s ease",
        "&::before": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(260px circle at var(--vm-neon-x, 50%) var(--vm-neon-y, 50%), color-mix(in oklab, var(--primary) 26%, transparent), transparent 64%)",
          opacity: 0,
          transition: "opacity 0.22s ease",
        },
        "&::after": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--primary) 10%, transparent), transparent 54%)",
          opacity: 0,
          transition: "opacity 0.28s ease",
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
        "&:hover": {
          transform: "scale(1.018)",
          borderTopColor:
            "color-mix(in oklab, var(--primary) 58%, var(--border))",
          bgcolor: "color-mix(in oklab, var(--card) 54%, transparent)",
        },
        "&:hover::before, &:hover::after": {
          opacity: 1,
        },
        "&:hover .vm-row-icon": {
          transform: "scale(1.12)",
          bgcolor: "color-mix(in oklab, var(--primary) 22%, var(--card))",
        },
      }}
    >
      <Box
        className="vm-row-icon"
        sx={{
          display: "grid",
          width: 44,
          height: 44,
          placeItems: "center",
          borderRadius: "8px",
          bgcolor: "color-mix(in oklab, var(--primary) 12%, var(--card))",
          color: "var(--primary)",
          transition:
            "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), background 0.28s ease",
        }}
      >
        <Icon sx={{ fontSize: 21 }} />
      </Box>
      <Typography
        className="font-display"
        sx={{
          color: "var(--foreground)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.18rem", md: "1.55rem" },
          fontWeight: 800,
        }}
      >
        {item.title}
      </Typography>
      <Typography
        sx={{
          gridColumn: { xs: "2", md: "auto" },
          color: "var(--muted-foreground)",
          fontSize: "0.92rem",
          lineHeight: 1.6,
        }}
      >
        {item.copy}
      </Typography>
    </Box>
  );
}

export default function VissionMission() {
  const pageRef = useRef(null);
  useVisionMissionGsap(pageRef);

  return (
    <>
      <CursorEffect />
      <Box
        ref={pageRef}
        component="main"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          pt: { xs: 10, md: 12 },
        }}
      >
        <ParticleField />

        <Box
          component="section"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr minmax(25rem, 0.72fr)" },
            gap: { xs: 4, lg: 6 },
            alignItems: "end",
            minHeight: { md: "calc(100vh - 6rem)" },
            px: { xs: 2, sm: 4, lg: 7 },
            pb: { xs: 5, md: 7 },
          }}
        >
          <Box sx={{ maxWidth: 920 }}>
            <Eyebrow>Our Purpose</Eyebrow>
            <Typography
              className="font-display vm-slide"
              sx={{
                mt: 2.2,
                color: "var(--foreground)",
                fontFamily: "var(--font-display)",
                fontSize: {
                  xs: "4.25rem",
                  sm: "7.4rem",
                  lg: "clamp(8rem, 12vw, 15rem)",
                },
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 0.77,
                textTransform: "uppercase",
              }}
            >
              Vision
            </Typography>
            <Typography
              className="font-display vm-slide"
              sx={{
                color: "var(--primary)",
                fontFamily: "var(--font-display)",
                fontSize: {
                  xs: "4.25rem",
                  sm: "7.4rem",
                  lg: "clamp(8rem, 12vw, 15rem)",
                },
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 0.77,
                textTransform: "uppercase",
              }}
            >
              Mission
            </Typography>
            <Typography
              className="vm-hero-copy"
              sx={{
                mt: { xs: 2.5, md: 3 },
                maxWidth: 620,
                color: "var(--muted-foreground)",
                fontSize: { xs: "1rem", md: "1.12rem" },
                lineHeight: 1.75,
              }}
            >
              We empower learners with practical AI and technology skills,
              mentor-led practice, and project-first learning so every student
              can move from curiosity to career-ready confidence.
            </Typography>

            <Box
              className="vm-hero-action"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.2,
                mt: 3.2,
              }}
            >
              <Button
                href="/courses"
                endIcon={<ArrowForward />}
                sx={{
                  minHeight: 46,
                  borderRadius: "8px",
                  bgcolor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  px: 2.5,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "color-mix(in oklab, var(--primary) 86%, black)",
                  },
                }}
              >
                Explore Courses
              </Button>
              <Button
                href="/about-us"
                endIcon={<NorthEastOutlined />}
                sx={{
                  minHeight: 46,
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  px: 2.5,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    bgcolor:
                      "color-mix(in oklab, var(--primary) 8%, transparent)",
                  },
                }}
              >
                About Knora
              </Button>
            </Box>
          </Box>

          <HeroVisual />
        </Box>

        <PurposeBlock
          number="01"
          label="Our Vision"
          title="Learning that shapes what comes next."
          copy="Our vision is to become a trusted learning academy where students build strong technical foundations, practical portfolios, and the confidence to adapt as technology evolves."
          image={facultyAisha}
        />

        <PurposeBlock
          reverse
          number="02"
          label="Our Mission"
          title="Skills that turn effort into opportunity."
          copy="Our mission is to deliver clear teaching, guided practice, and real project experience so learners can develop in-demand skills and step into the future with clarity."
          image={facultyRahul}
        />

        <Box
          className="vm-section vm-rhythm-section"
          component="section"
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 4, lg: 7 },
            py: { xs: 5, md: 8 },
          }}
        >
          <Box
            className="vm-track-line"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: { xs: 138, md: 176 },
              display: { xs: "none", md: "block" },
              height: 88,
              overflow: "hidden",
              opacity: 0.82,
            }}
          >
            {trackParticles.map(([delay, size, opacity], index) => (
              <Box
                key={`${delay}-${index}`}
                className="vm-track-particle"
                sx={{
                  position: "absolute",
                  left: `-${delay}px`,
                  top: `${16 + (index % 5) * 12}px`,
                  width: size,
                  height: size,
                  borderRadius: "999px",
                  bgcolor: "var(--primary)",
                  opacity,
                  boxShadow:
                    "0 0 18px color-mix(in oklab, var(--primary) 70%, transparent)",
                }}
              />
            ))}
          </Box>
          <Box
            className="vm-reveal"
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              gap: 3,
              mb: { xs: 3, md: 5 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "var(--primary)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Learning Rhythm
              </Typography>
              <Typography
                className="font-display"
                sx={{
                  mt: 1.5,
                  color: "var(--foreground)",
                  fontFamily: "var(--font-display)",
                  fontSize: { xs: "2.25rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: 0.92,
                  textTransform: "uppercase",
                }}
              >
                How Growth Happens
              </Typography>
            </Box>
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                maxWidth: 380,
                color: "var(--muted-foreground)",
                fontSize: "0.96rem",
                lineHeight: 1.65,
              }}
            >
              A focused path that turns class time into practical progress and
              real portfolio outcomes.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: { xs: 1.4, md: 1.8 },
            }}
          >
            {journeySteps.map((step, index) => (
              <JourneyCard key={step.title} step={step} index={index} />
            ))}
          </Box>
        </Box>

        <Box
          className="vm-section"
          component="section"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1fr" },
            gap: { xs: 3, lg: 6 },
            px: { xs: 2, sm: 4, lg: 7 },
            pt: { xs: 5, md: 7 },
            pb: { xs: 7, md: 10 },
          }}
        >
          <Box className="vm-reveal">
            <Typography
              sx={{
                color: "var(--primary)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Core Principles
            </Typography>
            <Typography
              className="font-display"
              sx={{
                mt: 1.5,
                color: "var(--foreground)",
                fontFamily: "var(--font-display)",
                fontSize: { xs: "2.4rem", md: "5.4rem" },
                fontWeight: 800,
                lineHeight: 0.88,
                textTransform: "uppercase",
              }}
            >
              What We Believe
            </Typography>
          </Box>

          <Box>
            {principles.map((item) => (
              <PrincipleRow key={item.title} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
