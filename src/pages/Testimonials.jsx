import React, { useRef, useEffect, useCallback, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {
  FormatQuote,
  PlayCircleOutlined,
  Star,
  StarBorder,
  Shuffle as ShuffleIcon,
} from "@mui/icons-material";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

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

// Replace these IDs with your own YouTube testimonial videos when available.
const videoTestimonials = [
  { videoId: "M7lc1UVf-VE", name: "Aarav's learning journey", role: "Frontend Development graduate" },
  { videoId: "ScMzIvxBSi4", name: "Sara's career transition", role: "UI/UX Design graduate" },
  { videoId: "jNQXAC9IVRw", name: "Rohan's Knora experience", role: "Data Analytics graduate" },
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
  if (width < 500) return 1;
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

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
      <Typography sx={{ color: ACCENT, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.18em", mb: 1.2 }}>
        {eyebrow}
      </Typography>
      <Typography component="h2" sx={{ color: TEXT, fontFamily: "var(--font-display)", fontSize: { xs: "1.65rem", sm: "2.2rem" }, fontWeight: 800, mb: 1.2 }}>
        {title} <Box component="span" sx={{ color: ACCENT }}>{accent}</Box>
      </Typography>
      <Typography sx={{ color: TEXT_MUTED, fontSize: "0.88rem", maxWidth: 560, mx: "auto" }}>
        {description}
      </Typography>
    </Box>
  );
}

function MarqueeCard({ data, index }) {
  return (
    <Box sx={{ flex: "0 0 clamp(17rem, 28vw, 22rem)", minHeight: 218, bgcolor: CARD_BG, border: `1px solid ${BORDER_SOFT}`, borderRadius: "12px", p: 2.5, backdropFilter: "blur(8px)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.4 }}>
        <FormatQuote sx={{ color: ACCENT, fontSize: 27, opacity: 0.8 }} />
        <Stars rating={data.rating} />
      </Box>
      <Typography sx={{ color: TEXT_MUTED, fontSize: "0.83rem", lineHeight: 1.65, mb: 2.2 }}>
        &ldquo;{data.text}&rdquo;
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Avatar sx={{ width: 38, height: 38, bgcolor: avatarPalette[index % avatarPalette.length], fontSize: "0.75rem", fontWeight: 800 }}>
          {initials(data.name)}
        </Avatar>
        <Box>
          <Typography sx={{ color: TEXT, fontSize: "0.82rem", fontWeight: 750 }}>{data.name}</Typography>
          <Typography sx={{ color: TEXT_MUTED, fontSize: "0.7rem" }}>{data.role}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial card (plain absolutely-positioned div — GSAP owns it)  */
/* ------------------------------------------------------------------ */
const TestimonialCard = React.forwardRef(function TestimonialCard(
  { data, index, stacked = false },
  ref,
) {
  const color = avatarPalette[index % avatarPalette.length];

  return (
    <Box
      ref={ref}
      sx={{
        position: stacked ? "relative" : "absolute",
        left: stacked ? "auto" : "50%",
        top: stacked ? "auto" : "50%",
        bgcolor: CARD_BG,
        border: `1px solid ${BORDER_SOFT}`,
        borderRadius: "8px",
        p: { xs: 2, sm: 2.2 },
        width: stacked ? "100%" : { xs: 172, sm: 212, md: 250 },
        backdropFilter: "blur(6px)",
        userSelect: "none",
        opacity: stacked ? 1 : 0,
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
          minHeight: stacked ? "auto" : { xs: 56, md: 74 },
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
  const [isCompact, setIsCompact] = useState(() => window.innerWidth <= 640);

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
    if (isCompact || !cards.length || !containerRef.current) return;

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
  }, [initDraggables, isCompact, killDraggables]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const syncCompact = () => setIsCompact(media.matches);

    syncCompact();
    media.addEventListener("change", syncCompact);

    return () => media.removeEventListener("change", syncCompact);
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    if (isCompact) {
      activeTween.current?.kill();
      killDraggables();
      gsap.set(cards, {
        clearProps:
          "transform,opacity,scale,rotation,zIndex,boxShadow,x,y,xPercent,yPercent",
      });
      return undefined;
    }

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
  }, [isCompact, killDraggables, playDrop]);

  return (
    <>
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
            display: isCompact ? "grid" : "block",
            gridTemplateColumns: "1fr",
            gap: 1.5,
            minHeight: isCompact ? "auto" : { xs: 1150, sm: 900, md: 640 },
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              data={t}
              index={i}
              stacked={isCompact}
              ref={(el) => setCardRef(el, i)}
            />
          ))}
        </Box>

        <Box component="section" aria-label="More learner feedback" sx={{ mt: { xs: 9, md: 13 } }}>
          <SectionHeading eyebrow="MORE FROM OUR COMMUNITY" title="Feedback that keeps" accent="moving" description="A continuous stream of honest experiences from learners across our programs." />
          <Box sx={{ position: "relative", mx: { xs: -3, sm: -6, md: -9 }, overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", "&:hover .testimonial-marquee": { animationPlayState: "paused" } }}>
            <Box
              className="testimonial-marquee"
              sx={{
                display: "flex", width: "max-content", gap: 2, py: 2,
                animation: "testimonialMarquee 42s linear infinite",
                "@keyframes testimonialMarquee": { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-50% - 8px))" } },
                "@media (prefers-reduced-motion: reduce)": { animation: "none", flexWrap: "wrap", width: "auto", px: 3, "& > :nth-of-type(n+11)": { display: "none" } },
              }}
            >
              {[...testimonials, ...testimonials].map((item, index) => (
                <MarqueeCard key={`${item.name}-${index}`} data={item} index={index} />
              ))}
            </Box>
          </Box>
        </Box>

        <Box component="section" aria-label="Video testimonials" sx={{ mt: { xs: 9, md: 13 } }}>
          <SectionHeading eyebrow="WATCH THEIR STORIES" title="Hear it directly from" accent="our learners" description="Real stories, real progress, and the moments that made their learning journey worthwhile." />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2.5, maxWidth: 1200, mx: "auto" }}>
            {videoTestimonials.map((video) => (
              <Box component="article" key={video.videoId} sx={{ bgcolor: CARD_BG, border: `1px solid ${BORDER_SOFT}`, borderRadius: "12px", overflow: "hidden", transition: "transform .25s ease, border-color .25s ease", "&:hover": { transform: "translateY(-5px)", borderColor: ACCENT } }}>
                <Box sx={{ position: "relative", aspectRatio: "16 / 9", bgcolor: "#050b16" }}>
                  <Box component="iframe" src={`https://www.youtube-nocookie.com/embed/${video.videoId}`} title={video.name} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                </Box>
                <Box sx={{ p: 2.2, display: "flex", gap: 1.2, alignItems: "center" }}>
                  <PlayCircleOutlined sx={{ color: ACCENT, fontSize: 30, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: TEXT, fontWeight: 750, fontSize: "0.88rem" }}>{video.name}</Typography>
                    <Typography sx={{ color: TEXT_MUTED, fontSize: "0.7rem" }}>{video.role}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
