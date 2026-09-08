import React, { useRef, useEffect, useCallback } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {
  FormatQuote,
  Star,
  StarBorder,
  Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import CursorEffect from "@/components/CursorEffect";

gsap.registerPlugin(Draggable, InertiaPlugin);

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const ACCENT = "var(--electric)";
const TEXT = "var(--foreground)";
const TEXT_MUTED = "var(--muted-foreground)";
const BORDER_SOFT = "var(--glass-border)";
const CARD_BG = "var(--glass-bg)";
const BG = "var(--background)";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    rating: 5,
    text: "The hands-on projects made all the difference. I went from tutorials to a real portfolio in weeks.",
  },
  {
    name: "Sara Khan",
    role: "UI/UX Designer",
    rating: 5,
    text: "Mentors actually cared about my progress. Flexible pacing let me learn around my day job.",
  },
  {
    name: "Rohan Iyer",
    role: "Data Analyst",
    rating: 4,
    text: "Practical, industry-relevant content. I could apply what I learned the very next day at work.",
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    rating: 5,
    text: "Best investment in myself this year. The community alone was worth signing up for.",
  },
  {
    name: "Wei Zhang",
    role: "Backend Engineer",
    rating: 5,
    text: "Clear explanations, real projects, and support whenever I got stuck. Couldn't ask for more.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Lead",
    rating: 4,
    text: "I loved how self-paced everything was. Finally finished a course without burning out.",
  },
  {
    name: "Diego Alvarez",
    role: "Full Stack Developer",
    rating: 5,
    text: "Landed my first dev job two months after finishing the program. Highly recommend.",
  },
  {
    name: "Noor Fatima",
    role: "Student",
    rating: 5,
    text: "As someone new to tech, this made complex topics feel approachable and even fun.",
  },
  {
    name: "James Carter",
    role: "DevOps Engineer",
    rating: 4,
    text: "Solid curriculum with real deployment scenarios, not just toy examples.",
  },
  {
    name: "Ananya Rao",
    role: "Graphic Designer",
    rating: 5,
    text: "The certificate actually meant something to employers. Great value for the price.",
  },
];

const avatarPalette = [
  "var(--electric)",
  "#4ba8f5",
  "#79b8f2",
  "#5dc7d3",
  "#8b9ff2",
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const rand = (min, max) => Math.random() * (max - min) + min;

/* ------------------------------------------------------------------ */
/*  Randomized scattered layout — a messy "shuffled pile" of positions */
/*  Every card is anchored at the container's dead center (left/top    */
/*  50%, set once and never touched again). All movement — the fall,  */
/*  the shuffle, and dragging — happens purely through GSAP's x/y      */
/*  transform, so nothing ever fights over which property owns the    */
/*  card's position.                                                    */
/* ------------------------------------------------------------------ */
function getCols(width) {
  if (width < 500) return 2;
  if (width < 800) return 3;
  return 5;
}

function generatePositions(containerEl) {
  const rect = containerEl.getBoundingClientRect();
  const w = rect.width || 1200;
  const h = rect.height || 640;
  const cols = getCols(w);
  const rows = Math.ceil(testimonials.length / cols);
  const cellW = w / cols;
  const cellH = h / rows;

  return testimonials.map((_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseX = cellW * col + cellW / 2 - w / 2;
    const baseY = cellH * row + cellH / 2 - h / 2;
    return {
      x: baseX + rand(-cellW * 0.24, cellW * 0.24),
      y: baseY + rand(-cellH * 0.2, cellH * 0.2),
      rotate: rand(-9, 9),
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Star rating row                                                     */
/* ------------------------------------------------------------------ */
function Stars({ rating }) {
  return (
    <Box sx={{ display: "flex", gap: 0.3, mb: 1.2 }}>
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <Star key={i} sx={{ fontSize: 15, color: ACCENT }} />
        ) : (
          <StarBorder
            key={i}
            sx={{
              fontSize: 15,
              color:
                "color-mix(in oklab, var(--muted-foreground) 45%, transparent)",
            }}
          />
        ),
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial card (plain absolutely-positioned div — GSAP owns it)  */
/* ------------------------------------------------------------------ */
const TestimonialCard = React.forwardRef(function TestimonialCard(
  { data, index },
  ref,
) {
  const color = avatarPalette[index % avatarPalette.length];

  return (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        bgcolor: CARD_BG,
        border: `1px solid ${BORDER_SOFT}`,
        borderRadius: "16px",
        p: 2.2,
        width: { xs: 172, sm: 212, md: 250 },
        backdropFilter: "blur(6px)",
        userSelect: "none",
        opacity: 0,
        transition: "box-shadow 0.25s ease",
        "&:hover": { boxShadow: "0 18px 40px rgba(0,0,0,0.35)" },
      }}
    >
      <FormatQuote
        sx={{ fontSize: 24, color: ACCENT, opacity: 0.7, mb: 0.4 }}
      />
      <Stars rating={data.rating} />
      <Typography
        sx={{
          fontSize: { xs: "0.72rem", md: "0.8rem" },
          color: TEXT_MUTED,
          lineHeight: 1.55,
          mb: 2,
          minHeight: { xs: 56, md: 74 },
        }}
      >
        &ldquo;{data.text}&rdquo;
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Avatar
          sx={{
            bgcolor: color,
            color: "var(--primary-foreground)",
            fontWeight: 700,
            fontSize: "0.75rem",
            width: 34,
            height: 34,
          }}
        >
          {initials(data.name)}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.2,
            }}
            noWrap
          >
            {data.name}
          </Typography>
          <Typography sx={{ fontSize: "0.68rem", color: TEXT_MUTED }} noWrap>
            {data.role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Testimonial() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const cardRefs = useRef([]);
  const draggables = useRef([]);
  const activeTween = useRef(null);

  const setCardRef = (el, i) => {
    cardRefs.current[i] = el;
  };

  const killDraggables = useCallback(() => {
    draggables.current.forEach((d) => d.kill());
    draggables.current = [];
  }, []);

  const initDraggables = useCallback(() => {
    killDraggables();
    const instances = Draggable.create(cardRefs.current, {
      type: "x,y",
      bounds: containerRef.current,
      edgeResistance: 0.6,
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() {
        gsap.to(this.target, {
          scale: 1.06,
          rotate: 0,
          zIndex: 30,
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          duration: 0.2,
          overwrite: "auto",
        });
      },
      onRelease() {
        gsap.to(this.target, {
          scale: 1,
          zIndex: "auto",
          boxShadow: "none",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });
    draggables.current = instances;
  }, [killDraggables]);

  /* Cards fall from above straight into a shuffled scatter layout. */
  const playDrop = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || !containerRef.current) return;

    killDraggables();
    activeTween.current?.kill();

    const positions = generatePositions(containerRef.current);

    cards.forEach((el, i) => {
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x: positions[i].x,
        y: positions[i].y - 700,
        opacity: 0,
        scale: 0.9,
        rotation: positions[i].rotate * 3,
        zIndex: "auto",
        boxShadow: "none",
      });
    });

    activeTween.current = gsap.to(cards, {
      y: (i) => positions[i].y,
      opacity: 1,
      scale: 1,
      rotation: (i) => positions[i].rotate,
      duration: 1.1,
      ease: "bounce.out",
      stagger: 0.09,
      onComplete: initDraggables,
    });
  }, [initDraggables, killDraggables]);

  /* Shuffle — already-landed cards fly to a freshly randomized scatter. */
  const shuffleCards = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || !containerRef.current) return;

    killDraggables();
    activeTween.current?.kill();

    const positions = generatePositions(containerRef.current);

    activeTween.current = gsap.to(cards, {
      x: (i) => positions[i].x,
      y: (i) => positions[i].y,
      rotation: (i) => positions[i].rotate,
      duration: 0.9,
      ease: "power3.inOut",
      stagger: 0.05,
      onComplete: initDraggables,
    });
  }, [initDraggables, killDraggables]);

  useEffect(() => {
    playDrop();

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.5,
        scale: 1.1,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      activeTween.current?.kill();
      killDraggables();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CursorEffect />
      <Box
        sx={{
          position: "relative",
          bgcolor: BG,
          color: TEXT,
          fontFamily: "var(--font-sans)",
          overflow: "hidden",
          mt: { xs: 7, md: 8 },
          px: { xs: 3, sm: 6, md: 9 },
          pt: { xs: 5, md: 6 },
          pb: { xs: 8, md: 11 },
        }}
      >
        <Box
          ref={glowRef}
          sx={{
            position: "absolute",
            top: -160,
            left: "50%",
            transform: "translateX(-50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--electric) 28%, transparent) 0%, transparent 70%)",
            filter: "blur(10px)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.2,
              mb: 2,
            }}
          >
            <Box sx={{ width: 22, height: 1.5, bgcolor: ACCENT }} />
            <Typography
              sx={{
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                fontWeight: 600,
                color: TEXT_MUTED,
              }}
            >
              TESTIMONIALS
            </Typography>
            <Box sx={{ width: 22, height: 1.5, bgcolor: ACCENT }} />
          </Box>

          <Typography
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              fontWeight: 800,
              mb: 1.5,
            }}
          >
            What Our{" "}
            <Box component="span" sx={{ color: ACCENT }}>
              Learners Say
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: TEXT_MUTED,
              maxWidth: 480,
              mx: "auto",
              mb: 3,
            }}
          >
            Real feedback from real people who built real skills. Drag any card
            around, or shuffle the whole pile.
          </Typography>

          <Box
            component="button"
            onClick={shuffleCards}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "transparent",
              border: `1px solid ${BORDER_SOFT}`,
              color: TEXT_MUTED,
              borderRadius: "999px",
              px: 2.2,
              py: 0.9,
              fontSize: "0.78rem",
              cursor: "pointer",
              transition: "border-color 0.25s ease, color 0.25s ease",
              "&:hover": { borderColor: ACCENT, color: ACCENT },
            }}
          >
            <ShuffleIcon sx={{ fontSize: 16 }} /> Shuffle Cards
          </Box>
        </Box>

        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            minHeight: { xs: 1150, sm: 900, md: 640 },
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              data={t}
              index={i}
              ref={(el) => setCardRef(el, i)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
