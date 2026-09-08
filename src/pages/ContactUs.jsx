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
  mapQuery: "Knora Edu Academy Chennai Tamil Nadu",
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
    href: "#map",
    action: "View Map",
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
        display: "grid",
        minHeight: 230,
        alignContent: "space-between",
        borderRadius: "8px",
        border:
          "1px solid color-mix(in oklab, var(--primary) 14%, var(--border))",
        bgcolor: "color-mix(in oklab, var(--card) 88%, transparent)",
        color: "var(--foreground)",
        p: { xs: 2.6, md: 3 },
        textDecoration: "none",
        backdropFilter: "blur(20px)",
        transition:
          "border-color 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), background 0.28s ease",
        "&:hover": {
          borderColor: "color-mix(in oklab, var(--primary) 58%, var(--border))",
          bgcolor: "color-mix(in oklab, var(--card) 94%, transparent)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "grid",
            width: 50,
            height: 50,
            placeItems: "center",
            borderRadius: "8px",
            bgcolor: "color-mix(in oklab, var(--primary) 13%, transparent)",
            color: "var(--primary)",
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

export default function ContactUs() {
  const pageRef = useRef(null);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contactInfo.mapQuery,
  )}&output=embed`;

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
                href="#map"
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
                Open Map
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
          id="map"
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
                  Visit or connect online.
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

            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 420, md: 580 },
                overflow: "hidden",
                borderRadius: "8px",
                border:
                  "1px solid color-mix(in oklab, var(--primary) 22%, var(--border))",
                bgcolor: "var(--card)",
              }}
            >
              <Box
                component="iframe"
                title="Knora Edu Academy map"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 420, md: 580 },
                  border: 0,
                  filter: "saturate(0.94) contrast(1.02)",
                  ".dark &": {
                    filter:
                      "invert(0.9) hue-rotate(180deg) saturate(0.82) brightness(0.9)",
                  },
                }}
              />

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
                  Map Location
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
