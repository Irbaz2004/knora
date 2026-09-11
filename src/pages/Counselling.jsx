import { useEffect, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorEffect from "@/components/CursorEffect";
import courseImage from "@/assets/courseimg.webp";
import facultyAisha from "@/assets/faculty-aisha.avif";
import facultyRahul from "@/assets/faculty-rahul.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: PsychologyRoundedIcon,
    title: "Start with you.",
    copy: "Talk through your skills, interests, and ambitions. We take the time to understand where you are and where you want to go.",
    detail: "Your goals, understood",
  },
  {
    icon: RouteRoundedIcon,
    title: "Find your direction.",
    copy: "Explore AI, Python, analytics, and GenAI tracks. Together, we identify the skills and projects that fit your next step.",
    detail: "Your learning path, mapped",
  },
  {
    icon: SupportAgentRoundedIcon,
    title: "Move forward clearly.",
    copy: "Choose a learning mode and batch that work for you, with mentor guidance on projects, admissions, and what comes next.",
    detail: "Your next steps, simplified",
  },
];
const highlights = [
  "One-to-one course guidance",
  "Career path discussion",
  "Skill gap review",
  "Batch and mode planning",
];
const eyebrow = {
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--primary)",
};
const heading = {
  fontFamily: "var(--font-display)",
  fontWeight: 650,
  letterSpacing: "-0.045em",
  lineHeight: 1.1,
};
const button = {
  borderRadius: "8px",
  px: 3,
  py: 1.6,
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "none",
  "&:focus-visible": { outline: "2px solid var(--primary)", outlineOffset: 4 },
};
const primaryButton = {
  ...button,
  bgcolor: "var(--primary)",
  color: "var(--primary-foreground)",
  "&:hover": {
    bgcolor: "color-mix(in oklab, var(--primary) 88%, black)",
    boxShadow: "none",
  },
};

export default function Counselling() {
  const pageRef = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".counselling-hero-copy > *", {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
        });
        gsap.from(".counselling-visual", {
          autoAlpha: 0,
          y: 24,
          duration: 0.85,
          ease: "power3.out",
        });
        gsap.utils.toArray(".counselling-reveal").forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            y: 24,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
        });
      }, pageRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <>
      <CursorEffect />
      <Box
        ref={pageRef}
        component="main"
        sx={{
          minHeight: "100vh",
          pt: { xs: 13, md: 17 },
          pb: { xs: 6, md: 10 },
          bgcolor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          "&, & *, & *::before, & *::after": {
            boxShadow: "none !important",
            textShadow: "none !important",
          },
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2.5, sm: 4, lg: 6 } }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border)",
              pb: 2.5,
              mb: { xs: 5, md: 7 },
            }}
          >
            <Typography sx={eyebrow}>KNORA / Personal counselling</Typography>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                color: "var(--muted-foreground)",
                fontSize: "0.75rem",
              }}
            >
              A little guidance. A clearer future.
            </Typography>
          </Stack>

          <Box
            component="section"
            aria-labelledby="counselling-title"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "minmax(0, 1.1fr) minmax(0, 1fr)",
              },
              alignItems: "center",
              gap: { xs: 5, md: 6, lg: 9 },
              pb: { xs: 7, md: 10 },
            }}
          >
            <Stack className="counselling-hero-copy" spacing={3}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "var(--primary)",
                  }}
                />
                <Typography sx={eyebrow}>Guidance built around you</Typography>
              </Stack>
              <Typography
                id="counselling-title"
                component="h1"
                sx={{
                  ...heading,
                  fontSize: {
                    xs: "clamp(2.8rem, 10vw, 4rem)",
                    md: "clamp(3.4rem, 5.2vw, 4.8rem)",
                  },
                }}
              >
                Your ambition.
                <br />
                Your direction.
                <br />
                <Box component="span" sx={{ color: "var(--primary)" }}>
                  Your next chapter.
                </Box>
              </Typography>
              <Typography
                sx={{
                  maxWidth: 470,
                  color: "var(--muted-foreground)",
                  fontSize: { xs: "1rem", md: "1.06rem" },
                  lineHeight: 1.85,
                }}
              >
                Big decisions start with a good conversation. Connect with a
                KNORA mentor and find a learning path that fits your goals.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  href="/contact-us"
                  disableElevation
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={primaryButton}
                >
                  Book Counselling
                </Button>
                <Button
                  href="/courses"
                  sx={{
                    ...button,
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    "&:hover": { bgcolor: "var(--muted)" },
                  }}
                >
                  Explore Courses
                </Button>
              </Stack>
              <Typography
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.78rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckRoundedIcon
                  sx={{ fontSize: 17, color: "var(--primary)" }}
                />
                Personal guidance. A practical learning roadmap.
              </Typography>
            </Stack>

            <Box
              className="counselling-visual"
              sx={{
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                bgcolor: "var(--card)",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    ...eyebrow,
                    color: "var(--foreground)",
                    fontSize: "0.65rem",
                  }}
                >
                  Space to find your path
                </Typography>
                <Typography
                  sx={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}
                >
                  01 / GUIDANCE
                </Typography>
              </Box>
              <Box
                component="img"
                src={courseImage}
                alt="Learning at KNORA"
                sx={{
                  display: "block",
                  width: "100%",
                  height: { xs: 270, sm: 340, md: 330 },
                  objectFit: "cover",
                  borderBlock: "1px solid var(--border)",
                }}
              />
              <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack
                  direction="row"
                  sx={{ gap: 2, alignItems: "center", mb: 2.5 }}
                >
                  <Stack direction="row" spacing={0.75} sx={{ flexShrink: 0 }}>
                    {[facultyAisha, facultyRahul].map((src) => (
                      <Box
                        key={src}
                        component="img"
                        src={src}
                        alt="KNORA mentor"
                        sx={{
                          width: 42,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                        }}
                      />
                    ))}
                  </Stack>
                  <Box>
                    <Typography sx={{ fontWeight: 650, fontSize: "0.95rem" }}>
                      Real conversations.
                      <br />
                      Clearer possibilities.
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    borderTop: "1px solid var(--border)",
                    pt: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Your goals. Our mentor guidance.
                  </Typography>
                  <ArrowForwardRoundedIcon
                    sx={{ color: "var(--primary)", fontSize: 20 }}
                  />
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box
            component="section"
            aria-labelledby="guidance-title"
            className="counselling-reveal"
            sx={{
              borderBlock: "1px solid var(--border)",
              py: { xs: 4, md: 5 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={eyebrow}>Made personal</Typography>
              <Typography
                id="guidance-title"
                component="h2"
                sx={{
                  ...heading,
                  fontSize: { xs: "1.9rem", md: "2.3rem" },
                  mt: 1.5,
                }}
              >
                Clarity before
                <br />
                you commit.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 3 },
              }}
            >
              {highlights.map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={1.25}
                  sx={{ alignItems: "center" }}
                >
                  <CheckRoundedIcon
                    sx={{ fontSize: 19, color: "var(--primary)" }}
                  />
                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 500 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>

          <Box
            component="section"
            aria-labelledby="process-title"
            sx={{ py: { xs: 7, md: 10 } }}
          >
            <Box
              className="counselling-reveal"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { md: "flex-end" },
                gap: 2.5,
                mb: 4,
              }}
            >
              <Box>
                <Typography sx={eyebrow}>
                  The conversation, simplified
                </Typography>
                <Typography
                  id="process-title"
                  component="h2"
                  sx={{
                    ...heading,
                    fontSize: { xs: "2rem", md: "2.8rem" },
                    mt: 1.5,
                  }}
                >
                  A clear path starts here.
                </Typography>
              </Box>
              <Typography
                sx={{
                  maxWidth: 300,
                  color: "var(--muted-foreground)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                From your first question to your next step, we help you see the
                way forward.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
                bgcolor: "var(--card)",
              }}
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Box
                    key={step.title}
                    className="counselling-reveal"
                    sx={{
                      p: { xs: 3, lg: 3.5 },
                      display: "flex",
                      flexDirection: "column",
                      borderLeft: {
                        md: index ? "1px solid var(--border)" : "none",
                      },
                      borderTop: {
                        xs: index ? "1px solid var(--border)" : "none",
                        md: "none",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: "var(--primary)" }} />
                      <Typography
                        sx={{ ...eyebrow, color: "var(--muted-foreground)" }}
                      >
                        0{index + 1}
                      </Typography>
                    </Stack>
                    <Typography
                      component="h3"
                      sx={{
                        ...heading,
                        fontSize: "1.4rem",
                        letterSpacing: "-0.025em",
                        mb: 1.5,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--muted-foreground)",
                        fontSize: "0.88rem",
                        lineHeight: 1.85,
                        mb: 3,
                        flex: 1,
                      }}
                    >
                      {step.copy}
                    </Typography>
                    <Typography
                      sx={{
                        borderTop: "1px solid var(--border)",
                        pt: 2,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {step.detail}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            component="section"
            aria-labelledby="contact-title"
            className="counselling-reveal"
            sx={{
              bgcolor: "var(--secondary)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              p: { xs: 3, sm: 5, md: 6 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={eyebrow}>Your next chapter awaits</Typography>
              <Typography
                id="contact-title"
                component="h2"
                sx={{
                  ...heading,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  mt: 1.5,
                  mb: 2,
                }}
              >
                Let�s find your way forward.
              </Typography>
              <Typography
                sx={{
                  maxWidth: 520,
                  color: "var(--muted-foreground)",
                  fontSize: "0.94rem",
                  lineHeight: 1.8,
                }}
              >
                Bring your questions. Leave with direction. Talk to a KNORA
                mentor about your courses, projects, and next steps.
              </Typography>
            </Box>
            <Button
              href="/contact-us"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={primaryButton}
            >
              Talk to a Mentor
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
