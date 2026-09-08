import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorEffect from "@/components/CursorEffect";
import courseImage from "@/assets/courseimg.webp";
import facultyAisha from "@/assets/faculty-aisha.avif";
import facultyRahul from "@/assets/faculty-rahul.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "01", label: "Years Experience", value: "07" },
  { number: "02", label: "Active Learners", value: "800+" },
  { number: "03", label: "Learning Tracks", value: "12" },
  { number: "04", label: "Guided Projects", value: "260+" },
];

const partners = [
  "Python",
  "TensorFlow",
  "OpenAI",
  "React",
  "Firebase",
  "Google Meet",
  "Zoom",
  "Power BI",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Figma",
  "Tableau",
  "VS Code",
  "Canva",
];

const awards = [
  ["98", "Student-first learning experience"],
  ["78", "Project-based curriculum design"],
  ["37", "Mentor-led technical workshops"],
  ["29", "AI and data portfolio reviews"],
  ["18", "Career readiness learning sessions"],
];

function useAboutGsap(pageRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const revealItems = gsap.utils.toArray(".fold-reveal");

      if (reduceMotion || isMobile) {
        gsap.set(revealItems, {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath",
        });
        return;
      }

      ScrollTrigger.config({ ignoreMobileResize: true });
      gsap.set(revealItems, {
        transformPerspective: 1000,
        transformOrigin: "50% 100%",
        willChange: "opacity, transform, filter, clip-path",
      });

      gsap.utils.toArray(".about-scroll-section").forEach((section, index) => {
        const items = section.querySelectorAll(".fold-reveal");

        if (!items.length) {
          return;
        }

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: index === 0 ? "top 98%" : "top 84%",
              end: "bottom 18%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            items,
            {
              autoAlpha: 0,
              y: 64,
              rotateX: -78,
              scaleY: 0.9,
              filter: "blur(8px)",
              clipPath: "inset(0% 0% 100% 0%)",
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              scaleY: 1,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0%)",
              stagger: 0.055,
              duration: 0.42,
            },
          )
          .to(
            items,
            {
              autoAlpha: 0,
              y: -38,
              rotateX: 46,
              scaleY: 0.92,
              filter: "blur(6px)",
              clipPath: "inset(100% 0% 0% 0%)",
              stagger: 0.035,
              duration: 0.3,
              ease: "power2.in",
            },
            0.74,
          );
      });

      ScrollTrigger.refresh();

      gsap.to(".wave-lines", {
        xPercent: -8,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [pageRef]);
}

function StoryImage({ src, alt }) {
  return (
    <Box
      className="story-image fold-reveal"
      sx={{
        minHeight: { xs: 140, md: 150 },
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        background: "var(--card)",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(1) contrast(1.08)",
          opacity: 0.9,
        }}
      />
    </Box>
  );
}

function StatCard({ stat, featured = false, sx }) {
  return (
    <Box
      className="stat-card fold-reveal"
      sx={{
        position: "relative",
        display: "flex",
        minHeight: { xs: 160, md: "100%" },
        flexDirection: "column",
        justifyContent: "flex-end",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        background: featured
          ? "color-mix(in oklab, var(--primary) 12%, var(--card))"
          : "color-mix(in oklab, var(--card) 64%, transparent)",
        p: { xs: 2.2, md: 2.6 },
        ...sx,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 12,
          right: 14,
          color: "color-mix(in oklab, var(--foreground) 36%, transparent)",
          fontSize: "0.72rem",
          fontWeight: 600,
        }}
      >
        {stat.number}
      </Typography>
      <Typography
        sx={{
          color: "var(--muted-foreground)",
          fontSize: "0.72rem",
          lineHeight: 1,
        }}
      >
        {stat.label}
      </Typography>
      <Typography
        className="font-display"
        sx={{
          mt: 0.7,
          color: featured ? "var(--primary)" : "var(--foreground)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "3.5rem", md: "4.45rem" },
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: 0.82,
        }}
      >
        {stat.value}
      </Typography>
    </Box>
  );
}

function StatementCard({ sx }) {
  return (
    <Box
      className="statement-card fold-reveal"
      sx={{
        position: "relative",
        display: "flex",
        minHeight: { xs: 220, md: "100%" },
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        background: "color-mix(in oklab, var(--card) 62%, transparent)",
        p: { xs: 2.4, md: 4 },
        ...sx,
      }}
    >
      <Box
        className="wave-lines"
        sx={{
          pointerEvents: "none",
          position: "absolute",
          right: "-8%",
          bottom: "-22%",
          width: "72%",
          height: "70%",
          opacity: 0.26,
          background:
            "repeating-radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--primary) 48%, transparent) 0 1px, transparent 1px 10px)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black, transparent 66%)",
        }}
      />
      <Typography
        className="font-display"
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 740,
          color: "var(--foreground)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.9rem", md: "3rem" },
          fontWeight: 700,
          lineHeight: 1.05,
          textAlign: "center",
        }}
      >
        We bring together deep technical{" "}
        <Box component="span" sx={{ color: "var(--primary)" }}>
          expertise
        </Box>
        , clear{" "}
        <Box component="span" sx={{ color: "var(--primary)" }}>
          learning design
        </Box>{" "}
        and optimised{" "}
        <Box component="span" sx={{ color: "var(--primary)" }}>
          mentorship
        </Box>
        .
      </Typography>
    </Box>
  );
}

function BrandGrid() {
  return (
    <Box
      className="brand-section about-scroll-section"
      component="section"
      sx={{
        px: { xs: 2, sm: 4, lg: 7 },
        py: { xs: 5, md: 7 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          borderTop: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {partners.map((partner, index) => {
          const isFeature = index === 7;
          return (
            <Box
              key={partner}
              className="brand-cell fold-reveal"
              sx={{
                minHeight: {
                  xs: isFeature ? 118 : 82,
                  md: isFeature ? 136 : 96,
                },
                display: "grid",
                placeItems: "center",
                gridColumn: {
                  xs: isFeature ? "span 2" : "auto",
                  lg: isFeature ? "span 2" : "auto",
                },
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                background: isFeature
                  ? "color-mix(in oklab, var(--primary) 12%, var(--card))"
                  : "color-mix(in oklab, var(--card) 56%, transparent)",
                color: isFeature
                  ? "var(--primary)"
                  : "color-mix(in oklab, var(--foreground) 78%, transparent)",
                px: 1.5,
                textAlign: "center",
              }}
            >
              {isFeature ? (
                <Typography
                  className="font-display"
                  sx={{
                    maxWidth: 360,
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: { xs: "1.55rem", md: "2rem" },
                    fontWeight: 800,
                    lineHeight: 0.96,
                    textTransform: "uppercase",
                  }}
                >
                  We&apos;ve worked with{" "}
                  <Box component="span" sx={{ color: "var(--primary)" }}>
                    amazing tools
                  </Box>
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: "0.74rem", md: "0.82rem" },
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {partner}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function AwardsSection() {
  return (
    <Box
      component="section"
      className="awards-section about-scroll-section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.9fr 1fr" },
        alignItems: "end",
        gap: { xs: 2, md: 5 },
        px: { xs: 2, sm: 4, lg: 7 },
        pt: { xs: 5, md: 7 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Typography
        className="font-display fold-reveal"
        sx={{
          color: "var(--primary)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "7.8rem", sm: "12rem", lg: "18rem" },
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: 0.72,
        }}
      >
        260+
      </Typography>

      <Box sx={{ pb: { md: 1.5 } }}>
        <Typography
          className="font-display fold-reveal"
          sx={{
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: { xs: "2.15rem", md: "4rem" },
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: "uppercase",
          }}
        >
          Outcomes for
          <br />
          digital learning
        </Typography>

        <Box sx={{ display: "grid", gap: 0.9, mt: 3 }}>
          {awards.map(([score, label]) => (
            <Box
              key={label}
              className="fold-reveal"
              sx={{
                display: "grid",
                gridTemplateColumns: "3.8rem 1fr",
                gap: 1.4,
                color: "var(--muted-foreground)",
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: "var(--foreground)",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                }}
              >
                {score}
              </Typography>
              <Typography component="span" sx={{ fontSize: "0.92rem" }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function About() {
  const pageRef = useRef(null);
  useAboutGsap(pageRef);

  return (
    <>
      <CursorEffect />
      <Box
        ref={pageRef}
        component="main"
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 8% 20%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 30%), radial-gradient(circle at 96% 78%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 28%), var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          pt: { xs: 10, md: 12 },
        }}
      >
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.45,
          }}
        />

        <Box
          component="img"
          src={facultyRahul}
          alt=""
          aria-hidden="true"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            left: { xs: "-32%", md: "-3%" },
            top: { xs: 250, md: 230 },
            width: { xs: 310, md: 520 },
            height: { xs: 520, md: 820 },
            objectFit: "cover",
            borderRadius: "8px",
            filter: "grayscale(1) contrast(1.08)",
            opacity: 0.13,
            zIndex: 0,
          }}
        />

        <Box
          component="section"
          className="about-scroll-section"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 1.42fr) minmax(22rem, 0.58fr)",
            },
            gap: { xs: 3, lg: 5 },
            minHeight: { xs: "auto", lg: 570 },
            px: { xs: 2, sm: 4, lg: 7 },
            pb: { xs: 5, lg: 4 },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              alignItems: "flex-start",
              mt: 5,
              minWidth: 0,
              overflow: "visible",
              textTransform: "uppercase",
              whiteSpace: { xs: "normal", sm: "nowrap" },
            }}
          >
            <Typography
              className="font-display fold-text fold-reveal"
              sx={{
                color: "var(--foreground)",
                fontFamily: "var(--font-display)",
                fontSize: {
                  xs: "clamp(3.65rem, 17vw, 5.4rem)",
                  sm: "9.4rem",
                  lg: "clamp(10rem, 14.6vw, 18rem)",
                },
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 0.74,
              }}
            >
              About
            </Typography>
            <Box
              sx={{
                display: "grid",
                ml: { xs: 0.6, md: 1.4 },
              }}
            >
              <Typography
                className="font-display fold-text fold-reveal"
                sx={{
                  color: "var(--primary)",
                  fontFamily: "var(--font-display)",
                  fontSize: {
                    xs: "clamp(3.65rem, 17vw, 5.4rem)",
                    sm: "9.4rem",
                    lg: "clamp(10rem, 14.6vw, 18rem)",
                  },
                  fontWeight: 800,
                  letterSpacing: 0,
                  lineHeight: 0.74,
                }}
              >
                US
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 0.82fr" },
              gap: 1.5,
              alignItems: "start",
              pt: { lg: 1.2 },
              mt: { xs: 0.5, lg: 25 },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 1.15,
                minWidth: 0,
                ml: { xs: 0, lg: -5 },
                mt: { xs: 0, lg: 10 },
              }}
            >
              <Typography
                className="story-copy fold-reveal"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: { xs: "0.9rem", lg: "0.96rem" },
                  lineHeight: 1.58,
                }}
              >
                Knora Edu Academy is built for practical AI and technology
                learning. We combine clear teaching, guided practice, and
                project-first mentoring so students can build confidence from
                day one.
              </Typography>
              <Typography
                className="story-copy fold-reveal"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: { xs: "0.9rem", lg: "0.96rem" },
                  lineHeight: 1.58,
                }}
              >
                Our focus is simple: useful skills, personal support, and
                learning paths that connect classroom effort with real outcomes.
              </Typography>
              <Box
                className="read-link fold-reveal"
                component="a"
                href="/courses"
                sx={{
                  display: "inline-flex",
                  minHeight: 42,
                  width: "min(100%, 13rem)",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.8,
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "border-color 0.24s ease, color 0.24s ease",
                  "&:hover": {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                  },
                }}
              >
                Read More <ArrowForward sx={{ fontSize: 15 }} />
              </Box>
            </Box>

            <Box sx={{ display: "grid", gap: 1.5 }}>
              <StoryImage src={facultyAisha} alt="Knora mentor session" />
              <StoryImage src={courseImage} alt="Knora learning campus" />
            </Box>
          </Box>
        </Box>

        <Box
          component="section"
          className="stats-section about-scroll-section"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gridAutoRows: { md: "118px" },
            gap: { xs: 1.3, md: 0 },
            px: { xs: 2, sm: 4, lg: 7 },
            py: { xs: 4, md: 7 },
            minHeight: { md: 700 },
          }}
        >
          <StatCard
            stat={stats[0]}
            sx={{
              gridColumn: { md: "1 / span 3" },
              gridRow: { md: "1 / span 2" },
            }}
          />
          <StatementCard
            sx={{
              gridColumn: { md: "4 / span 8" },
              gridRow: { md: "1 / span 2" },
            }}
          />
          <StatCard
            stat={stats[1]}
            featured
            sx={{
              gridColumn: { md: "2 / span 3" },
              gridRow: { md: "3 / span 2" },
            }}
          />
          <StatCard
            stat={stats[2]}
            sx={{
              gridColumn: { md: "5 / span 6" },
              gridRow: { md: "3 / span 2" },
            }}
          />
          <StatCard
            stat={stats[3]}
            sx={{
              gridColumn: { md: "8 / span 3" },
              gridRow: { md: "5 / span 2" },
            }}
          />
        </Box>

        <BrandGrid />
        <AwardsSection />

        <Box
          component="img"
          src={facultyAisha}
          alt=""
          aria-hidden="true"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            right: { xs: "-34%", md: "-5%" },
            bottom: { xs: 260, md: 120 },
            width: { xs: 280, md: 420 },
            height: { xs: 420, md: 640 },
            objectFit: "cover",
            borderRadius: "8px",
            filter: "grayscale(1) contrast(1.04)",
            opacity: 0.12,
            zIndex: 0,
          }}
        />
      </Box>
    </>
  );
}
