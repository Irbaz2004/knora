import React, { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import CursorEffect from "@/components/CursorEffect";

const contactInfo = {
  academy: "Knora Edu Academy",
  email: "hello@knoraedu.ac.in",
  phone: "+91 98765 43210",
  location: "Chennai, Tamil Nadu",
  mapUrl: "https://maps.app.goo.gl/5468fWa9LqNDsWPP7?g_st=iw",
  // Approx coordinates used to place the marker on the particle globe
  lat: 13.0827,
  lon: 80.2707,
};

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    helper: "Admissions, course guidance, partnerships",
    href: `mailto:${contactInfo.email}`,
    action: "Send Email",
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phone,
    helper: "Speak with the counselling team",
    href: "tel:+919876543210",
    action: "Call Now",
  },
  {
    icon: MapPin,
    label: "Location",
    value: contactInfo.location,
    helper: "Campus details available during counselling",
    href: "#globe",
    action: "View Location",
  },
];

const supportDetails = [
  {
    icon: Clock3,
    title: "Office Response",
    value: "Within 24 hours",
  },
  {
    icon: ShieldCheck,
    title: "Student Support",
    value: "Private counselling",
  },
  {
    icon: Building2,
    title: "Learning Mode",
    value: "Online and campus",
  },
];

function ContactCard({ item }) {
  const Icon = item.icon;

  return (
    <Box
      className="contact-card"
      component="a"
      href={item.href}
      sx={{
        position: "relative",
        display: "grid",
        minHeight: 230,
        alignContent: "space-between",
        overflow: "hidden",
        borderRadius: "8px",
        border:
          "1px solid color-mix(in oklab, var(--primary) 14%, var(--border))",
        bgcolor: "color-mix(in oklab, var(--card) 88%, transparent)",
        color: "var(--foreground)",
        p: { xs: 2.6, md: 3 },
        textDecoration: "none",
        backdropFilter: "blur(20px)",
        transition:
          "border-color 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), background 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          borderColor: "color-mix(in oklab, var(--primary) 58%, var(--border))",
          bgcolor: "color-mix(in oklab, var(--card) 94%, transparent)",
          transform: "translateY(-6px)",
          boxShadow:
            "0 22px 44px -22px color-mix(in oklab, var(--primary) 45%, transparent)",
        },
        "&:hover .contact-card-icon": {
          transform: "scale(1.08) rotate(-4deg)",
          bgcolor: "color-mix(in oklab, var(--primary) 22%, transparent)",
        },
        "&:hover .contact-card-glow": {
          opacity: 1,
        },
      }}
    >
      <Box
        className="contact-card-glow"
        sx={{
          pointerEvents: "none",
          position: "absolute",
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
          opacity: 0,
          transition: "opacity 0.32s ease",
        }}
      />

      <Box sx={{ position: "relative" }}>
        <Box
          className="contact-card-icon"
          sx={{
            display: "grid",
            width: 50,
            height: 50,
            placeItems: "center",
            borderRadius: "8px",
            bgcolor: "color-mix(in oklab, var(--primary) 13%, transparent)",
            color: "var(--primary)",
            transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), background 0.32s ease",
          }}
        >
          <Icon size={21} />
        </Box>
        <Typography
          sx={{
            mt: 2.4,
            color: "var(--muted-foreground)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </Typography>
        <Typography
          sx={{
            mt: 0.75,
            overflowWrap: "anywhere",
            color: "var(--foreground)",
            fontSize: { xs: "1.12rem", md: "1.2rem" },
            fontWeight: 650,
            lineHeight: 1.25,
          }}
        >
          {item.value}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: "var(--muted-foreground)",
            fontSize: "0.9rem",
            lineHeight: 1.55,
          }}
        >
          {item.helper}
        </Typography>
      </Box>

      <Typography
        component="span"
        sx={{
          position: "relative",
          display: "inline-flex",
          width: "fit-content",
          alignItems: "center",
          gap: 0.8,
          mt: 3,
          color: "var(--primary)",
          fontSize: "0.86rem",
          fontWeight: 700,
        }}
      >
        {item.action}
        <ArrowUpRight size={16} />
      </Typography>
    </Box>
  );
}

// A rotating "globe" built entirely from particles, drawn on canvas,
// with a glowing marker pinned at Knora Edu Academy's location.
function ParticleGlobe({ lat, lon }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const primaryRGBRef = useRef("59, 130, 246");

  useEffect(() => {
    // Resolve the theme's --primary color to an RGB triplet so we can
    // draw particles with per-depth alpha without re-parsing every frame.
    const probe = document.createElement("div");
    probe.style.color = "var(--primary)";
    probe.style.position = "absolute";
    probe.style.opacity = "0";
    probe.style.pointerEvents = "none";
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    const match = resolved.match(/[\d.]+/g);
    if (match && match.length >= 3) {
      primaryRGBRef.current = `${match[0]}, ${match[1]}, ${match[2]}`;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    let width = 0;
    let height = 0;

    // Fibonacci-sphere distribution gives an even "planet made of dots" look
    const POINT_COUNT = 760;
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
      });
    }

    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;
    const marker = {
      x: Math.cos(latRad) * Math.cos(lonRad),
      y: Math.sin(latRad),
      z: Math.cos(latRad) * Math.sin(lonRad),
    };

    let rotation = 0.4;

    function resize() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.37;
      const rgb = primaryRGBRef.current;

      rotation += 0.0018;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);

      // Faint outer rim to read as a sphere silhouette
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, 0.14)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const projected = points.map((p) => {
        const x = p.x * cosR - p.z * sinR;
        const z = p.x * sinR + p.z * cosR;
        return { x, y: p.y, z };
      });
      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const depth = (p.z + 1) / 2;
        const px = cx + p.x * radius;
        const py = cy + p.y * radius;
        const size = 0.5 + depth * 1.5;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.12 + depth * 0.58})`;
        ctx.fill();
      });

      // Marker for Knora Edu Academy
      const mx = marker.x * cosR - marker.z * sinR;
      const mz = marker.x * sinR + marker.z * cosR;
      if (mz > -0.2) {
        const px = cx + mx * radius;
        const py = cy + marker.y * radius;
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 420);

        ctx.beginPath();
        ctx.arc(px, py, 9 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.16 + pulse * 0.12})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 3.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `rgba(${rgb}, 0.9)`;
        ctx.stroke();
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [lat, lon]);

  return (
    <Box ref={containerRef} sx={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </Box>
  );
}

export default function ContactUs() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".fold-line", {
        transformPerspective: 900,
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".contact-badge", {
          opacity: 0,
          y: 12,
          duration: 0.45,
        })
        .from(
          ".fold-line",
          {
            opacity: 0,
            y: 34,
            rotateX: -72,
            stagger: 0.12,
            duration: 0.82,
          },
          "-=0.18",
        )
        .from(
          ".contact-copy",
          {
            opacity: 0,
            y: 18,
            duration: 0.58,
          },
          "-=0.48",
        )
        .from(
          ".contact-actions .MuiButton-root",
          {
            opacity: 0,
            y: 14,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.38",
        )
        .from(
          ".contact-card",
          {
            opacity: 0,
            y: 28,
            rotateX: -16,
            stagger: 0.09,
            duration: 0.62,
          },
          "-=0.24",
        )
        .from(
          ".contact-map-block",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.2",
        );

      gsap.to(".contact-badge-icon", {
        opacity: 0.48,
        scale: 0.82,
        repeat: -1,
        yoyo: true,
        duration: 1.25,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

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
          "@keyframes pageIn": {
            "0%": { opacity: 0, transform: "translateY(18px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes spinSlow": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      >
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent 36%), radial-gradient(circle at 82% 22%, color-mix(in oklab, var(--primary) 13%, transparent), transparent 34%)",
          }}
        />
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(180deg, black 0%, transparent 72%)",
            opacity: 0.5,
          }}
        />

        <Box
          component="section"
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1240,
            mx: "auto",
            px: { xs: 2.5, sm: 5, lg: 7 },
            pt: { xs: 15, md: 17 },
            pb: { xs: 7, md: 9 },
          }}
        >
          <Box
            component="span"
            className="hero-badge contact-badge"
            sx={{
              display: "inline-flex",
              width: "fit-content",
              alignItems: "center",
              gap: 1.1,
              borderRadius: "8px",
              border:
                "1px solid color-mix(in oklab, var(--primary) 28%, transparent)",
              bgcolor: "color-mix(in oklab, var(--card) 74%, transparent)",
              px: 1.8,
              py: 1,
              backdropFilter: "blur(14px)",
            }}
          >
            <Box
              component={Sparkles}
              className="contact-badge-icon"
              sx={{ width: 15, height: 15 }}
            />
            Contact Details
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr auto" },
              alignItems: "end",
              gap: { xs: 3, lg: 6 },
              mt: 3,
            }}
          >
            <Box>
              <Typography
                component="h1"
                className="font-display"
                sx={{
                  maxWidth: 780,
                  color: "var(--foreground)",
                  fontFamily: "var(--font-display)",
                  fontSize: { xs: "3.1rem", sm: "4.4rem", lg: "6rem" },
                  fontWeight: 700,
                  letterSpacing: 0,
                  lineHeight: 0.92,
                }}
              >
                <Box
                  component="span"
                  className="fold-line"
                  sx={{ display: "block" }}
                >
                  Reach Knora
                </Box>
                <Box
                  component="span"
                  className="fold-line"
                  sx={{ display: "block" }}
                >
                  Edu Academy.
                </Box>
              </Typography>
              <Typography
                className="contact-copy"
                sx={{
                  mt: 3,
                  maxWidth: 620,
                  color: "var(--muted-foreground)",
                  fontSize: { xs: "1rem", md: "1.12rem" },
                  lineHeight: 1.75,
                }}
              >
                Connect with our team for admissions, course counselling, campus
                visits, student support, and collaboration enquiries.
              </Typography>
            </Box>

            <Box
              className="contact-actions"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.2,
                justifyContent: { xs: "flex-start", lg: "flex-end" },
              }}
            >
              <Button
                component="a"
                href={`mailto:${contactInfo.email}`}
                startIcon={<Mail size={17} />}
                sx={{
                  minHeight: 46,
                  borderRadius: "8px",
                  bgcolor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  px: 2.4,
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "var(--primary)" },
                }}
              >
                Email Us
              </Button>
              <Button
                component="a"
                href="#globe"
                startIcon={<Navigation size={17} />}
                sx={{
                  minHeight: 46,
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  px: 2.4,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                View Location
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          component="section"
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1240,
            mx: "auto",
            px: { xs: 2.5, sm: 5, lg: 7 },
            pb: { xs: 7, md: 10 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 1.6,
            }}
          >
            {contactCards.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}
          </Box>
        </Box>

        <Box
          component="section"
          id="globe"
          className="contact-map-block"
          sx={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 96%, transparent), color-mix(in oklab, var(--card) 72%, transparent))",
            px: { xs: 2.5, sm: 5, lg: 7 },
            py: { xs: 7, md: 10 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              maxWidth: 1240,
              mx: "auto",
              gridTemplateColumns: { xs: "1fr", lg: "0.72fr 1.28fr" },
              gap: { xs: 3, lg: 4 },
              alignItems: "stretch",
            }}
          >
            <Box
              className="contact-map-copy"
              sx={{
                display: "grid",
                gap: 1.4,
                alignContent: "start",
              }}
            >
              <Box
                sx={{
                  borderRadius: "8px",
                  border:
                    "1px solid color-mix(in oklab, var(--primary) 14%, var(--border))",
                  bgcolor: "color-mix(in oklab, var(--card) 86%, transparent)",
                  p: { xs: 2.8, md: 3.4 },
                }}
              >
                <Typography
                  component="h2"
                  className="font-display"
                  sx={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: { xs: "2.1rem", md: "3rem" },
                    fontWeight: 700,
                    lineHeight: 0.98,
                  }}
                >
                  Find us on the map.
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    color: "var(--muted-foreground)",
                    fontSize: "0.98rem",
                    lineHeight: 1.72,
                  }}
                >
                  Knora supports students and partners across India. Use email
                  or phone for faster counselling and appointment scheduling.
                </Typography>
              </Box>

              {supportDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <Box
                    key={detail.title}
                    className="contact-map-detail"
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignItems: "center",
                      gap: 1.4,
                      borderRadius: "8px",
                      border:
                        "1px solid color-mix(in oklab, var(--primary) 12%, var(--border))",
                      bgcolor:
                        "color-mix(in oklab, var(--card) 80%, transparent)",
                      p: 2.2,
                      transition: "border-color 0.25s ease, transform 0.25s ease",
                      "&:hover": {
                        borderColor:
                          "color-mix(in oklab, var(--primary) 40%, var(--border))",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        width: 40,
                        height: 40,
                        placeItems: "center",
                        borderRadius: "8px",
                        bgcolor:
                          "color-mix(in oklab, var(--primary) 12%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      <Icon size={18} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--muted-foreground)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                        }}
                      >
                        {detail.title}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.2,
                          color: "var(--foreground)",
                          fontSize: "0.98rem",
                          fontWeight: 650,
                        }}
                      >
                        {detail.value}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Particle globe replaces the Google Maps embed */}
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 420, md: 580 },
                overflow: "hidden",
                borderRadius: "8px",
                border:
                  "1px solid color-mix(in oklab, var(--primary) 22%, var(--border))",
                background:
                  "radial-gradient(circle at 50% 42%, color-mix(in oklab, var(--primary) 10%, var(--card)), var(--card) 68%)",
              }}
            >
              {/* soft glow behind the globe */}
              <Box
                sx={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "62%",
                  height: "62%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 72%)",
                  filter: "blur(6px)",
                }}
              />

              {/* thin decorative orbit ring */}
              <Box
                sx={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "70%",
                  height: "70%",
                  transform: "translate(-50%, -50%)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 400 400"
                  sx={{
                    width: "100%",
                    height: "100%",
                    opacity: 0.32,
                    animation: "spinSlow 46s linear infinite",
                  }}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="188"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    strokeDasharray="2 12"
                  />
                </Box>
              </Box>

              <ParticleGlobe lat={contactInfo.lat} lon={contactInfo.lon} />

              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 14, md: 20 },
                  bottom: { xs: 14, md: 20 },
                  width: "min(24rem, calc(100% - 1.75rem))",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.26)",
                  background: "rgba(3, 16, 31, 0.78)",
                  color: "#fff",
                  p: { xs: 1.7, md: 2 },
                  backdropFilter: "blur(18px)",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Campus Location
                </Typography>
                <Typography
                  className="font-display"
                  sx={{
                    mt: 0.5,
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    lineHeight: 1.05,
                  }}
                >
                  {contactInfo.academy}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.7,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                  }}
                >
                  {contactInfo.location}
                </Typography>
                <Button
                  component="a"
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<ArrowUpRight size={15} />}
                  sx={{
                    mt: 1.4,
                    minHeight: 38,
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    color: "#061225",
                    px: 1.6,
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#e6f5ff",
                    },
                  }}
                >
                  Open in Maps
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}