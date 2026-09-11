import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  AccessTimeOutlined,
  Add,
  AlternateEmailOutlined,
  CallOutlined,
  ChatBubbleOutlineOutlined,
  DescriptionOutlined,
  EventBusyOutlined,
  OndemandVideoOutlined,
  PlaceOutlined,
  ReceiptLongOutlined,
  SupportAgentOutlined,
  SwapHorizOutlined,
} from "@mui/icons-material";
import DottedMap from "dotted-map";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorEffect from "@/components/CursorEffect";

gsap.registerPlugin(ScrollTrigger);

const CHENNAI_OFFICE = {
  city: "Chennai, Tamil Nadu",
  lat: 13.0827,
  lng: 80.2707,
  address1: "KNORA Edu Academy",
  address2: "Chennai, Tamil Nadu, India",
};

const contactCards = [
  {
    Icon: ChatBubbleOutlineOutlined,
    title: "Admission counselling",
    desc: "Speak with our student guidance team.",
    action: "admissions@knoraedu.com",
    href: "mailto:admissions@knoraedu.com",
    filled: true,
  },
  {
    Icon: SupportAgentOutlined,
    title: "Course support",
    desc: "Get help choosing the right learning path.",
    action: "support@knoraedu.com",
    href: "mailto:support@knoraedu.com",
  },
  {
    Icon: PlaceOutlined,
    title: "Visit us",
    desc: "Marked only in Chennai, Tamil Nadu.",
    action: "View Chennai Map",
    href: "https://www.google.com/maps/search/?api=1&query=Chennai%2C%20Tamil%20Nadu%2C%20India",
  },
  {
    Icon: CallOutlined,
    title: "Call us",
    desc: "Mon-Sat from 9am to 6pm.",
    action: "+91 98765 43210",
    href: "tel:+919876543210",
  },
];

const faqLeft = [
  {
    Icon: AccessTimeOutlined,
    q: "How quickly can I get counselling?",
    a: "Our team usually responds on the same working day and helps you choose the best course, batch, and learning mode.",
  },
  {
    Icon: EventBusyOutlined,
    q: "Can I change my batch later?",
    a: "Yes. If a schedule does not fit, our support team can guide you through available batch options.",
  },
  {
    Icon: ReceiptLongOutlined,
    q: "Do you explain fees during counselling?",
    a: "Yes. Counselling includes course scope, fees, batch timing, project expectations, and next steps.",
  },
  {
    Icon: SupportAgentOutlined,
    q: "How does support work?",
    a: "Students get class updates, learning support, and mentor guidance through the full course journey.",
  },
];

const faqRight = [
  {
    Icon: SwapHorizOutlined,
    q: "Can I switch from online to offline?",
    a: "Mode changes depend on batch availability. The team will help you pick the most practical option.",
  },
  {
    Icon: DescriptionOutlined,
    q: "What should I bring for counselling?",
    a: "Bring your current learning level, career goal, and preferred schedule. We will help turn that into a roadmap.",
  },
  {
    Icon: AlternateEmailOutlined,
    q: "Can I contact by email?",
    a: "Yes. You can email admissions or support, and the team will reply with course guidance.",
  },
  {
    Icon: OndemandVideoOutlined,
    q: "Do you provide class recordings?",
    a: "Recording availability depends on the selected course and batch. Ask during counselling for exact details.",
  },
];

function Reveal({ children, delay = 0, y = 34, sx, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <Box ref={ref} sx={sx} {...props}>
      {children}
    </Box>
  );
}

function ChennaiDottedMap() {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const dm = new DottedMap({ height: 50, grid: "diagonal" });
    const point = dm.addPin({
      lat: CHENNAI_OFFICE.lat,
      lng: CHENNAI_OFFICE.lng,
      svgOptions: { color: "transparent", radius: 0.01 },
    });

    const svg = dm.getSVG({
      radius: 0.24,
      color: "currentColor",
      shape: "circle",
      backgroundColor: "transparent",
    });

    setMap({ svg, width: dm.width, height: dm.height, pin: point });
  }, []);

  useEffect(() => {
    if (!map || !mapRef.current) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dots = mapRef.current.querySelectorAll("circle");

    if (reduceMotion) {
      gsap.set(dots, { autoAlpha: 1, scale: 1 });
      return undefined;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 82%",
        toggleActions: "restart none none reverse",
      },
    });

    timeline
      .fromTo(
        dots,
        {
          autoAlpha: 0,
          scale: 0,
          x: () => gsap.utils.random(-34, 34),
          y: () => gsap.utils.random(-24, 24),
          transformOrigin: "50% 50%",
        },
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: { amount: 1.05, from: "center", grid: "auto" },
        },
      )
      .fromTo(
        ".contact-map-pin",
        { autoAlpha: 0, scale: 0.4, y: 12 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" },
        "-=0.15",
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [map]);

  if (!map) {
    return (
      <Box
        sx={{
          width: "100%",
          aspectRatio: "99 / 50",
          borderRadius: "8px",
          bgcolor: "color-mix(in oklab, var(--primary) 7%, var(--card))",
        }}
      />
    );
  }

  const left = `${(map.pin.x / map.width) * 100}%`;
  const top = `${(map.pin.y / map.height) * 100}%`;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "visible",
        border: 0,
        borderRadius: "8px",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--card) 86%, transparent), color-mix(in oklab, var(--background) 96%, transparent))",
        p: { xs: 1.5, sm: 2.4, md: 3 },
      }}
    >
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--primary) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 9%, transparent) 1px, transparent 1px)",
          backgroundSize: { xs: "34px 34px", md: "56px 56px" },
          opacity: 0.48,
        }}
      />

      <Box
        ref={mapRef}
        sx={{
          position: "relative",
          color: "color-mix(in oklab, var(--primary) 44%, var(--foreground))",
          opacity: 0.76,
          transition: "opacity 0.3s ease",
          "& svg": {
            display: "block",
            width: "100%",
            height: "auto",
            overflow: "visible",
          },
        }}
        dangerouslySetInnerHTML={{ __html: map.svg }}
      />

      <Box
        component="a"
        href="https://www.google.com/maps/search/?api=1&query=Knora%20Academy%20Chennai"
        target="_blank"
        rel="noreferrer"
        className="contact-map-pin"
        aria-label="Open Knora Academy Chennai in Google Maps"
        sx={{
          position: "absolute",
          left,
          top,
          zIndex: 4,
          display: "block",
          transform: "translate(-50%, -50%)",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "calc(100% + 0.8rem)",
            minWidth: { xs: 168, sm: 198 },
            transform: "translateX(-50%)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 24%, transparent)",
            borderRadius: "8px",
            bgcolor: "color-mix(in oklab, var(--card) 94%, transparent)",
            color: "var(--foreground)",
            p: { xs: 1.05, sm: 1.25 },
            textAlign: "center",
            backdropFilter: "blur(14px) saturate(145%)",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              top: "100%",
              width: 10,
              height: 10,
              borderRight:
                "1px solid color-mix(in oklab, var(--primary) 24%, transparent)",
              borderBottom:
                "1px solid color-mix(in oklab, var(--primary) 24%, transparent)",
              bgcolor: "color-mix(in oklab, var(--card) 94%, transparent)",
              transform: "translate(-50%, -50%) rotate(45deg)",
            },
          }}
        >
          <Typography sx={{ fontSize: "0.84rem", fontWeight: 900 }}>
            Knora Academy Chennai
          </Typography>
          <Typography
            sx={{
              mt: 0.25,
              color: "var(--muted-foreground)",
              fontSize: "0.72rem",
            }}
          >
            Click to open map
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            placeItems: "center",
            border: "2px solid var(--card)",
            borderRadius: "999px",
            bgcolor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <PlaceOutlined sx={{ fontSize: { xs: 21, sm: 25 } }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex: -1,
            width: 52,
            height: 52,
            m: "auto",
            borderRadius: "999px",
            bgcolor: "color-mix(in oklab, var(--primary) 34%, transparent)",
            animation: "contactPinPulse 1.9s ease-out infinite",
            transform: "translate(-50%, -50%)",
            "@keyframes contactPinPulse": {
              "0%": {
                opacity: 0.58,
                transform: "translate(-50%, -50%) scale(0.45)",
              },
              "100%": {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(1.65)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

function ContactCard({ Icon, title, desc, action, href, filled }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 218,
        height: "100%",
        flexDirection: "column",
        gap: 1.25,
        border: "1px solid var(--border)",
        borderRadius: "8px",
        bgcolor: "color-mix(in oklab, var(--card) 78%, transparent)",
        p: { xs: 2, md: 2.6 },
        transition: "transform 0.24s ease, border-color 0.24s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "color-mix(in oklab, var(--primary) 36%, transparent)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: 38,
          height: 38,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          bgcolor: "color-mix(in oklab, var(--primary) 8%, var(--card))",
          color: "var(--primary)",
        }}
      >
        <Icon sx={{ fontSize: 19 }} />
      </Box>
      <Box>
        <Typography
          sx={{
            mb: 0.35,
            color: "var(--foreground)",
            fontSize: "0.98rem",
            fontWeight: 900,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ color: "var(--muted-foreground)", fontSize: "0.86rem" }}
        >
          {desc}
        </Typography>
      </Box>
      <Box
        component="a"
        href={href}
        sx={{
          mt: "auto",
          border: filled
            ? "1px solid var(--primary)"
            : "1px solid var(--border)",
          borderRadius: "8px",
          bgcolor: filled ? "var(--primary)" : "var(--card)",
          color: filled ? "var(--primary-foreground)" : "var(--foreground)",
          fontSize: "0.82rem",
          fontWeight: 900,
          px: 1.5,
          py: 1,
          textAlign: "center",
          textDecoration: "none",
          transition: "background 0.2s ease, color 0.2s ease",
          "&:hover": {
            bgcolor: filled
              ? "color-mix(in oklab, var(--primary) 88%, black)"
              : "color-mix(in oklab, var(--primary) 8%, var(--card))",
            color: filled ? "var(--primary-foreground)" : "var(--primary)",
          },
        }}
      >
        {action}
      </Box>
    </Box>
  );
}

function FaqItem({ Icon, q, a, open, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        gap: 1.6,
        py: 2.4,
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: 34,
          height: 34,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
          borderRadius: "999px",
          bgcolor: "color-mix(in oklab, var(--primary) 7%, var(--card))",
          color: "var(--primary)",
        }}
      >
        <Icon sx={{ fontSize: 16 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              fontWeight: 900,
            }}
          >
            {q}
          </Typography>
          <Add
            sx={{
              color: "var(--muted-foreground)",
              flexShrink: 0,
              fontSize: 18,
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          />
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            maxHeight: open ? 220 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <Typography
            sx={{
              mt: 1.2,
              pr: 1,
              color: "var(--muted-foreground)",
              fontSize: "0.86rem",
              lineHeight: 1.65,
            }}
          >
            {a}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function ContactUs() {
  const [openIndex, setOpenIndex] = useState("L0");
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero > *",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          ease: "power3.out",
          stagger: 0.08,
        },
      );
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
          minHeight: "100vh",
          pt: { xs: 12, md: 15 },
          bgcolor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 12%, color-mix(in oklab, var(--primary) 13%, transparent), transparent 28%), radial-gradient(circle at 90% 38%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 26%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1180,
            mx: "auto",
            px: { xs: 2, sm: 4, md: 6 },
            pb: { xs: 8, md: 12 },
          }}
        >
          <Box
            className="contact-hero"
            sx={{ mb: { xs: 5, md: 6 }, textAlign: "center" }}
          >
            <Typography
              className="font-display"
              component="h1"
              sx={{
                mx: "auto",
                maxWidth: 760,
                color: "var(--foreground)",
                fontFamily: "var(--font-display)",
                fontSize: {
                  xs: "clamp(2.4rem, 12vw, 3.9rem)",
                  md: "clamp(4rem, 6vw, 6.4rem)",
                },
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 0.92,
              }}
            >
              Get in touch from Chennai
            </Typography>
            <Typography
              sx={{
                mx: "auto",
                mt: 2,
                maxWidth: 560,
                color: "var(--muted-foreground)",
                fontSize: { xs: "0.96rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              Talk to our counselling team for courses, admission, learning
              paths, and project-based guidance.
            </Typography>
          </Box>

          <Reveal delay={0.05}>
            <ChennaiDottedMap />
          </Reveal>

          <Reveal delay={0.12} sx={{ mt: { xs: 6, md: 9 } }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: { xs: 1.4, md: 2 },
                mb: { xs: 8, md: 11 },
              }}
            >
              {contactCards.map((card) => (
                <ContactCard key={card.title} {...card} />
              ))}
            </Box>
          </Reveal>

          <Reveal sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Typography
              className="font-display"
              sx={{
                color: "var(--foreground)",
                fontFamily: "var(--font-display)",
                fontSize: { xs: "1.9rem", md: "2.7rem" },
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              Frequently asked questions
            </Typography>
          </Reveal>

          <Reveal delay={0.1}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                columnGap: { md: 6 },
                maxWidth: 960,
                mx: "auto",
              }}
            >
              <Box>
                {faqLeft.map((item, index) => (
                  <FaqItem
                    key={item.q}
                    {...item}
                    open={openIndex === `L${index}`}
                    onToggle={() =>
                      setOpenIndex((prev) =>
                        prev === `L${index}` ? null : `L${index}`,
                      )
                    }
                  />
                ))}
              </Box>
              <Box>
                {faqRight.map((item, index) => (
                  <FaqItem
                    key={item.q}
                    {...item}
                    open={openIndex === `R${index}`}
                    onToggle={() =>
                      setOpenIndex((prev) =>
                        prev === `R${index}` ? null : `R${index}`,
                      )
                    }
                  />
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </>
  );
}
