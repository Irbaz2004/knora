import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box,
  Button as MuiButton,
  Chip as MuiChip,
  GlobalStyles,
  IconButton as MuiIconButton,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Cpu,
  FileCheck2,
  GraduationCap,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MonitorPlay,
  Mouse,
  Phone,
  PlayCircle,
  Rocket,
  Sparkles,
  Target,
  UserRound,
  Users,
  Wifi,
  Youtube,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import AiChip from "@/components/AiChip";
import CursorEffect from "@/components/CursorEffect";
import { journey } from "@/lib/journey";
import courseAiImage from "@/assets/course-ai.svg";
import coursePythonImage from "@/assets/course-python.svg";
import courseGenAiImage from "@/assets/course-genai.svg";
import courseVisionImage from "@/assets/course-vision.svg";
import facultyArjun from "@/assets/faculty-arjun.avif";
import facultyAisha from "@/assets/faculty-aisha.avif";
import facultyRahul from "@/assets/faculty-rahul.jpg";

const SCENE_COUNT = 13;

const heroCards = [
  {
    icon: Building2,
    title: "New Campus",
    copy: "Ready for the founding batch",
    className: "left-[12%] top-[18%] rotate-[-7deg]",
  },
  {
    icon: MonitorPlay,
    title: "Hybrid Learning",
    copy: "Live + recorded access",
    className: "right-[0%] top-[36%] rotate-[5deg]",
    progress: true,
  },
  {
    icon: Users,
    title: "Small Batches",
    copy: "Personal mentor attention",
    className: "left-[-5%] bottom-[25%] rotate-[7deg]",
  },
  {
    icon: CalendarDays,
    title: "Starts Sep 2026",
    copy: "Admissions now open",
    className: "right-[3%] bottom-[15%] rotate-[-6deg]",
  },
];

const visionPoints = [
  "Built for students who want practical AI skills from day one.",
  "Designed around live classes, guided practice, and real project work.",
  "Focused on confidence, clarity, and career-ready technical foundations.",
];

const whyJoinCards = [
  {
    icon: GraduationCap,
    title: "Experienced Faculty",
    copy: "Learn from mentors with strong academic and industry practice.",
  },
  {
    icon: Layers,
    title: "Relevant Curriculum",
    copy: "Modern AI, data, coding, and project workflows in one path.",
  },
  {
    icon: MonitorPlay,
    title: "Online + Offline",
    copy: "Live Zoom or Meet classes with recordings for revision.",
  },
  {
    icon: Target,
    title: "Personal Attention",
    copy: "Small founding batches make doubt clearing faster and sharper.",
  },
  {
    icon: Award,
    title: "Founding Benefits",
    copy: "Early-bird fee support, extra mentoring, and launch workshops.",
  },
  {
    icon: Sparkles,
    title: "Career Foundation",
    copy: "Portfolio-first projects and interview-focused practice.",
  },
];

const courseCards = [
  {
    image: courseAiImage,
    name: "AI & Machine Learning Foundation",
    duration: "16 weeks",
    mode: "Hybrid",
    copy: "Python, data handling, ML models, evaluation, and mini projects.",
  },
  {
    image: coursePythonImage,
    name: "Python for Data & AI",
    duration: "12 weeks",
    mode: "Online / Offline",
    copy: "Programming basics, notebooks, APIs, and practical automation.",
  },
  {
    image: courseGenAiImage,
    name: "Generative AI & LLMs",
    duration: "10 weeks",
    mode: "Live Online",
    copy: "Prompting, agents, RAG basics, and responsible AI workflows.",
  },
  {
    image: courseVisionImage,
    name: "Computer Vision Essentials",
    duration: "8 weeks",
    mode: "Weekend Hybrid",
    copy: "Image processing, detection concepts, and guided model demos.",
  },
];

const facultySpotlights = [
  {
    name: "Dr. Arjun Mehta",
    image: facultyArjun,
    role: "Professor & Head of Computer Science",
    designation: "Founder & Academic Director",
    tag: "Leadership",
    specialization: "Artificial Intelligence & Deep Learning",
    experience: "15+ Years",
    courses: "AI, ML, Deep Learning",
    email: "arjun.mehta@knoraedu.ac.in",
    phone: "+91 98765 43210",
    bio: "Ph.D. in Artificial Intelligence with 15+ years of teaching, research, and student mentoring experience.",
    quote:
      "Education is not just about knowledge, it is about inspiring minds and building a better future.",
  },
  {
    name: "Prof. Aisha Khan",
    image: facultyAisha,
    role: "AI & Machine Learning Mentor",
    designation: "Faculty Member",
    tag: "Faculty",
    specialization: "Machine Learning & Python",
    experience: "9+ Years",
    courses: "Python, ML Foundations",
    email: "aisha.khan@knoraedu.ac.in",
    phone: "+91 98765 43211",
    bio: "Specialist in Python, machine learning foundations, guided labs, and project-based AI learning.",
    quote:
      "Strong foundations and consistent practice turn complex technology into real confidence.",
  },
  {
    name: "Rahul Nair",
    image: facultyRahul,
    role: "Data Science & Analytics Trainer",
    designation: "Faculty Member",
    tag: "Faculty",
    specialization: "Data Science & Analytics",
    experience: "8+ Years",
    courses: "Data Analytics, Dashboards",
    email: "rahul.nair@knoraedu.ac.in",
    phone: "+91 98765 43212",
    bio: "Mentor for data handling, analytics workflows, dashboards, and portfolio-focused student projects.",
    quote:
      "Students learn best when concepts, tools, and real problems meet in the same classroom.",
  },
];

const admissionSteps = [
  {
    icon: ClipboardCheck,
    title: "Enquire",
    copy: "Share your goal and course interest.",
  },
  {
    icon: FileCheck2,
    title: "Register",
    copy: "Complete the short admission form.",
  },
  {
    icon: CreditCard,
    title: "Pay Fee",
    copy: "Confirm your seat in the batch.",
  },
  {
    icon: PlayCircle,
    title: "Start Classes",
    copy: "Join orientation and begin learning.",
  },
];

const facilityTiles = [
  { icon: Building2, title: "New Campus", copy: "Fresh institute setup" },
  { icon: Users, title: "Classrooms", copy: "Small batch seating" },
  { icon: MonitorPlay, title: "Live Class Setup", copy: "Zoom and Meet ready" },
  { icon: Wifi, title: "Recording Access", copy: "Revision library" },
  { icon: BookOpen, title: "Study Support", copy: "Notes and practice" },
  { icon: Cpu, title: "Project Lab", copy: "Guided build sessions" },
];

const launchEvents = [
  {
    date: "24 Sep 2026",
    title: "Orientation Day",
    copy: "Meet mentors and understand the learning path.",
  },
  {
    date: "27 Sep 2026",
    title: "Open House",
    copy: "Visit the campus and speak with the team.",
  },
  {
    date: "01 Oct 2026",
    title: "Free Demo Class",
    copy: "Experience a live hybrid AI session.",
  },
];

const footerLinks = [
  ["About Us", "/about-us"],
  ["Courses", "/courses"],
  ["Faculty", "/faculty"],
  ["Apply Online", "/apply-online"],
  ["Contact", "/contact-us"],
];

const HERO_LETTERS = ["K", "N", "O", "R", "A"];

function Badge({ children }) {
  return (
    <span className="hero-badge flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-primary uppercase">
      <Sparkles className="size-3.5" />
      {children}
    </span>
  );
}

function renderLetterNodes(node, path = "letter") {
  if (node == null || typeof node === "boolean") return null;

  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(" ")
      .map((word, wordIndex) => (
        <Fragment key={`${path}-word-${wordIndex}`}>
          {wordIndex > 0 && <span aria-hidden="true"> </span>}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <span
                key={`${path}-${wordIndex}-${charIndex}`}
                aria-hidden="true"
                className="letter-fade-char inline-block will-change-[filter,opacity,transform]"
              >
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ));
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      renderLetterNodes(child, `${path}-${index}`),
    );
  }

  if (!isValidElement(node)) return node;

  if (node.type === Fragment) {
    return (
      <Fragment key={path}>
        {Children.map(node.props.children, (child, index) =>
          renderLetterNodes(child, `${path}-${index}`),
        )}
      </Fragment>
    );
  }

  if (node.type === "br") {
    return cloneElement(node, { key: path });
  }

  return cloneElement(
    node,
    { key: path },
    Children.map(node.props.children, (child, index) =>
      renderLetterNodes(child, `${path}-${index}`),
    ),
  );
}

function LetterFadeText({ text, className = "" }) {
  return (
    <span
      className={className}
      aria-label={typeof text === "string" ? text : undefined}
    >
      {renderLetterNodes(text)}
    </span>
  );
}

function FacultyPortrait({ person, className = "" }) {
  return (
    <img
      src={person.image}
      alt={person.name}
      className={`faculty-portrait ${className}`}
      loading="lazy"
    />
  );
}

function KnoraLogoHoverText() {
  return (
    <span
      className="knora-logo-word inline-flex items-baseline"
      aria-label="KNORA"
    >
      {["K", "N"].map((letter) => (
        <span
          key={letter}
          aria-hidden="true"
          className="letter-fade-char inline-block will-change-[filter,opacity,transform]"
        >
          {letter}
        </span>
      ))}
      <span
        aria-hidden="true"
        className="knora-logo-o letter-fade-char mx-[0.04em] inline-block will-change-[filter,opacity,transform]"
      />
      {["R", "A"].map((letter) => (
        <span
          key={letter}
          aria-hidden="true"
          className="letter-fade-char inline-block will-change-[filter,opacity,transform]"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

function SceneTitle({ eyebrow, title, copy, center = false }) {
  return (
    <Box className={`relative z-10 ${center ? "mx-auto text-center" : ""}`}>
      <div className="holo-text">
        <Badge>{eyebrow}</Badge>
      </div>
      <Typography
        component="h2"
        className="holo-text letter-fade-parent hologram-title mt-6 text-4xl leading-[1.02] font-semibold text-foreground sm:text-5xl lg:text-6xl"
        sx={{
          color: "var(--foreground)",
          fontFamily: "var(--font-display)",
          fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
          fontWeight: 700,
          letterSpacing: 0,
          lineHeight: 1.02,
        }}
      >
        <LetterFadeText text={title} />
      </Typography>
      {copy && (
        <Typography
          component="p"
          className={`holo-text mt-5 max-w-xl text-base leading-relaxed text-muted-foreground ${
            center ? "mx-auto" : ""
          }`}
        >
          {copy}
        </Typography>
      )}
    </Box>
  );
}

export default function Home() {
  const wrapper = useRef(null);
  const sceneRefs = useRef([]);
  const heroVisualRef = useRef(null);
  const heroCoreRef = useRef(null);
  const [activeCourse, setActiveCourse] = useState(0);
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [heroLetterIndex, setHeroLetterIndex] = useState(0);
  const facultyScrollIndexRef = useRef(0);

  const setSceneRef = (index) => (el) => {
    sceneRefs.current[index] = el;
  };
  const rotateCourse = (direction) => {
    setActiveCourse((current) => {
      return (current + direction + courseCards.length) % courseCards.length;
    });
  };
  const getCoursePosition = (index) => {
    return (index - activeCourse + courseCards.length) % courseCards.length;
  };
  const rotateFaculty = (direction) => {
    setActiveFaculty((current) => {
      const next =
        (current + direction + facultySpotlights.length) %
        facultySpotlights.length;
      facultyScrollIndexRef.current = next;
      return next;
    });
  };
  const faculty = facultySpotlights[activeFaculty];
  const director = facultySpotlights[0];
  const facultyPrev =
    facultySpotlights[
      (activeFaculty - 1 + facultySpotlights.length) % facultySpotlights.length
    ];
  const facultyNext =
    facultySpotlights[(activeFaculty + 1) % facultySpotlights.length];
  const heroLetter = HERO_LETTERS[heroLetterIndex];
  const rotateHeroLetter = () => {
    setHeroLetterIndex((current) => (current + 1) % HERO_LETTERS.length);
  };

  useEffect(() => {
    journey.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const proxy = { p: 0 };
      const sceneSlot = 1.55;
      const scenes = sceneRefs.current.slice(0, SCENE_COUNT).filter(Boolean);
      gsap.set(scenes.slice(1), { autoAlpha: 0, y: 64 });
      gsap.set(scenes[0], { autoAlpha: 1, y: 0 });
      gsap.from(".hero-pop", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.from(".section-1 .letter-fade-char", {
        y: 34,
        autoAlpha: 0,
        filter: "blur(12px)",
        duration: 0.72,
        stagger: { each: 0.018, from: "start" },
        ease: "power3.out",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom bottom",
          scrub: journey.reducedMotion ? true : 0.9,
        },
        defaults: { ease: "none" },
      });

      tl.to(proxy, {
        p: 1,
        duration: SCENE_COUNT * sceneSlot,
        onUpdate: () => {
          journey.progress = proxy.p;
          const timelineTime = proxy.p * SCENE_COUNT * sceneSlot;
          const facultySceneElapsed = timelineTime - 5 * sceneSlot;
          if (facultySceneElapsed >= -0.04 && facultySceneElapsed <= 1.44) {
            const nextFacultyIndex =
              facultySceneElapsed < 0.46
                ? 0
                : facultySceneElapsed < 0.86
                  ? 1
                  : facultySpotlights.length - 1;
            if (facultyScrollIndexRef.current !== nextFacultyIndex) {
              facultyScrollIndexRef.current = nextFacultyIndex;
              setActiveFaculty(nextFacultyIndex);
            }
          }
        },
      });

      if (journey.reducedMotion) {
        scenes.forEach((el, i) => {
          const start = i * sceneSlot;
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.3 }, start);
          if (i < scenes.length - 1) {
            tl.to(el, { autoAlpha: 0, duration: 0.3 }, start + 1.16);
          }
        });
      } else {
        const ease = "power2.inOut";
        const hologramIn = (selector, at) => {
          tl.fromTo(
            selector,
            {
              y: 0,
              autoAlpha: 0,
              scale: 0.9,
              filter: "blur(28px)",
              transformOrigin: "50% 50%",
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.44,
              stagger: 0.045,
              ease,
            },
            at,
          );
        };
        const lettersIn = (scene, at) => {
          const letters = scene.querySelectorAll(".letter-fade-char");
          if (!letters.length) return;
          tl.fromTo(
            letters,
            {
              y: 28,
              autoAlpha: 0,
              filter: "blur(12px)",
            },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.52,
              stagger: { each: 0.012, from: "start" },
              ease: "power3.out",
            },
            at,
          );
        };
        const lettersOut = (scene, at) => {
          const letters = scene.querySelectorAll(".letter-fade-char");
          if (!letters.length) return;
          tl.fromTo(
            letters,
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
            },
            {
              y: -22,
              autoAlpha: 0,
              filter: "blur(10px)",
              duration: 0.42,
              stagger: { each: 0.009, from: "end" },
              ease: "power2.inOut",
              immediateRender: false,
            },
            at,
          );
        };
        const sectionOut = (scene, at) => {
          const items = scene.querySelectorAll(
            ".hero-pop:not(.letter-fade-parent), .holo-text:not(.letter-fade-parent), .motion-card",
          );
          lettersOut(scene, at - 0.04);
          tl.fromTo(
            items,
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
            },
            {
              y: -18,
              autoAlpha: 0,
              scale: 1.04,
              filter: "blur(18px)",
              transformOrigin: "50% 50%",
              duration: 0.46,
              stagger: { amount: 0.28, from: "start" },
              ease,
              immediateRender: false,
            },
            at,
          );
        };
        const facultySectionOut = (scene, at) => {
          const liveElements = scene.querySelectorAll(
            ".faculty-holo-member, .faculty-stage-arrow, .faculty-stage-dots, .faculty-profile-card",
          );
          tl.to(
            liveElements,
            {
              y: -14,
              autoAlpha: 0,
              scale: 0.985,
              filter: "blur(6px)",
              transformOrigin: "50% 50%",
              duration: 0.48,
              stagger: { amount: 0.2, from: "end" },
              ease,
            },
            at,
          );
          tl.to(
            scene.querySelector(".faculty-showcase-shell"),
            {
              autoAlpha: 0,
              scale: 0.99,
              filter: "blur(4px)",
              duration: 0.34,
              ease,
            },
            at + 0.22,
          );
        };

        scenes.forEach((scene, i) => {
          const start = i * sceneSlot;
          const selector = `.section-${i + 1}`;
          if (i > 0) {
            tl.to(scene, { y: 0, autoAlpha: 1, duration: 0.5, ease }, start);
            hologramIn(`${selector} .holo-text`, start + 0.06);
            lettersIn(scene, start + 0.16);
            tl.from(
              scene.querySelectorAll(".motion-card"),
              { y: 22, autoAlpha: 0, stagger: 0.04, duration: 0.3, ease },
              start + 0.2,
            );
          }
          if (i < scenes.length - 1) {
            const exitAt = i === 5 ? start + 1.4 : start + 0.9;
            const hideAt = i === 5 ? start + 1.54 : start + 1.42;
            if (i === 5) {
              facultySectionOut(scene, exitAt);
            } else {
              sectionOut(scene, exitAt);
            }
            tl.to(
              scene,
              {
                y: i === 5 ? -42 : -70,
                autoAlpha: 0,
                duration: i === 5 ? 0.28 : 0.22,
                ease,
              },
              hideAt,
            );
          }
        });
      }
    }, wrapper);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          ".lift:hover": {
            boxShadow: "none !important",
          },
          ".knora-logo-word": {
            color: "var(--foreground)",
            transition: "color 240ms ease",
          },
          ".knora-logo-o": {
            position: "relative",
            width: "0.72em",
            height: "0.72em",
            border: "0.105em solid currentColor",
            borderRadius: "999px",
            transform: "translateY(0.025em)",
            transition:
              "border-color 240ms ease, transform 240ms ease, box-shadow 240ms ease",
          },
          ".knora-logo-o::before, .knora-logo-o::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            width: "0.22em",
            height: "0.17em",
            borderRadius: "0.08em",
            background: "var(--background)",
            transform: "translateX(-50%)",
            opacity: 0,
            transition: "opacity 200ms ease",
          },
          ".knora-logo-o::before": {
            top: "-0.14em",
          },
          ".knora-logo-o::after": {
            bottom: "-0.14em",
          },
          ".headline-kinetic:hover .knora-logo-o": {
            borderColor: "var(--primary)",
            transform: "translateY(0.025em) scale(1.04)",
            boxShadow:
              "0 0 0 0.035em color-mix(in oklab, var(--primary) 18%, transparent)",
          },
          ".headline-kinetic:hover .knora-logo-o::before, .headline-kinetic:hover .knora-logo-o::after":
            {
              opacity: 1,
            },
        }}
      />
      <CursorEffect />
      <Navbar />
      <ParticleField heroAnchorRef={heroCoreRef} heroHoverRef={heroVisualRef} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="bloom absolute left-1/2 top-1/3 size-[70vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--electric) 30%, transparent) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage:
              "radial-gradient(circle at 50% 45%, black, transparent 72%)",
          }}
        />
      </div>

      <main
        ref={wrapper}
        className="relative w-full"
        style={{ height: `${SCENE_COUNT * 82}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <section
            id="home"
            ref={setSceneRef(0)}
            className="section-1 absolute inset-0 grid w-full grid-cols-1 items-center gap-8 px-5 pt-24 sm:px-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-10 lg:px-12 xl:px-20 2xl:px-28"
          >
            <div className="relative z-10 max-w-[720px]">
              <Typography
                component="h1"
                className="headline-kinetic letter-fade-parent hero-pop text-5xl leading-[0.98] font-semibold text-foreground sm:text-6xl lg:text-7xl xl:text-[5.9rem]"
                sx={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-display)",
                  fontSize: {
                    xs: "clamp(2.35rem, 11.5vw, 3.05rem)",
                    sm: "3.35rem",
                    md: "3.8rem",
                    lg: "4rem",
                    xl: "5.25rem",
                  },
                  fontWeight: 700,
                  letterSpacing: 0,
                  lineHeight: { xs: 1, lg: 0.96 },
                }}
              >
                <KnoraLogoHoverText />
                <br />
                <span className="inline-block whitespace-nowrap">
                  <LetterFadeText text="Edu" />{" "}
                  <span className="hero-learn relative inline-block text-primary">
                    <LetterFadeText text="Academy" />
                  </span>
                </span>
              </Typography>
              <p className="hero-pop hero-copy-text mt-9 max-w-[36rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
                Admissions Open - Join Our Founding Batch. Learn in a new-age AI
                institute built for practical training, personal attention, and
                flexible online plus offline classes.
              </p>
              <div className="hero-pop mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/apply-online"
                  className="lift arrow-shift flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-soft sm:px-6 sm:py-3.5"
                >
                  Apply Now <ArrowRight className="arrow size-4" />
                </a>
                <a
                  href="#courses"
                  className="lift glass flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground sm:px-6 sm:py-3.5"
                >
                  <BookOpen className="size-4 text-primary" /> Explore Courses
                </a>
              </div>
              <dl className="hero-pop mt-8 grid max-w-[40rem] grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-4">
                {[
                  [Building2, "New", "Campus Setup"],
                  [MonitorPlay, "Live", "Hybrid Classes"],
                  [CalendarDays, "Sep 2026", "New Batch"],
                ].map(([Icon, n, l]) => (
                  <div
                    key={l}
                    className="hero-stat flex min-w-0 items-center gap-3 rounded-3xl bg-white/70 p-3 sm:gap-4 lg:pr-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:size-12">
                      <Icon className="size-5 sm:size-6" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {n}
                      </dt>
                      <dd className="text-[0.68rem] tracking-wide text-muted-foreground uppercase sm:text-xs">
                        {l}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pointer-events-none relative hidden h-full min-w-0 items-center justify-center lg:flex">
              <div
                ref={heroVisualRef}
                className="hero-visual absolute left-1/2 top-1/2 flex size-[41rem] -translate-x-1/2 -translate-y-[49%] items-center justify-center"
              >
                <div
                  ref={heroCoreRef}
                  className="hero-core relative flex size-[18rem] items-center justify-center rounded-full"
                >
                  <button
                    type="button"
                    className="hero-k-mark"
                    aria-label={`Knora animated letter ${heroLetter}`}
                    onPointerEnter={rotateHeroLetter}
                    onClick={rotateHeroLetter}
                  >
                    <span className="hero-letter-orbit hero-letter-orbit-third" />
                    <span
                      key={heroLetter}
                      className="hero-morph-letter"
                      data-letter={heroLetter}
                    >
                      {heroLetter}
                    </span>
                  </button>
                </div>
                <div className="hero-cap absolute">
                  <div className="cap-board" />
                  <div className="cap-button" />
                  <div className="cap-string" />
                </div>
                <div className="hero-base absolute flex items-center justify-center">
                  {[14, 18.5, 23].map((s, i) => (
                    <div
                      key={s}
                      className="hero-base-ring absolute rounded-full"
                      style={{
                        width: `${s}rem`,
                        height: `${s * 0.22}rem`,
                      }}
                    />
                  ))}
                </div>
                {heroCards.map((card) => (
                  <div
                    key={card.title}
                    className={`hero-float-card absolute w-52 rounded-3xl p-4 ${card.className}`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {card.copy}
                        </p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
                        <card.icon className="size-5" />
                      </span>
                    </div>
                    {card.progress && (
                      <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                        <div className="h-full w-4/5 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
              <Mouse className="size-5 animate-bounce text-primary" />
              <span className="text-[0.7rem] tracking-[0.22em] uppercase">
                Scroll to explore
              </span>
            </div>
          </section>

          <section
            id="welcome"
            ref={setSceneRef(1)}
            className="section-2 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
          >
            <div className="hidden lg:block" />
            <div className="relative z-10 grid gap-5 lg:ml-auto lg:max-w-[720px]">
              <SceneTitle
                eyebrow="Welcome / Vision Snapshot"
                title={
                  <>
                    Built For Ambitious
                    <br />
                    AI Learners
                  </>
                }
                copy="Knora Edu Academy exists to make advanced technology education clearer, more personal, and more useful for students preparing for tomorrow's careers."
              />
              <div className="grid gap-3">
                {visionPoints.map((point) => (
                  <div
                    key={point}
                    className="motion-card glass flex items-start gap-3 rounded-3xl p-5"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {point}
                    </p>
                  </div>
                ))}
                <a
                  href="/about-us"
                  className="holo-text arrow-shift mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Read More <ArrowRight className="arrow size-4" />
                </a>
              </div>
            </div>
          </section>

          <section
            id="director-message"
            ref={setSceneRef(2)}
            className="section-3 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
          >
            <div className="holo-text">
              <Badge>Founder / Director Message</Badge>
              <h2 className="letter-fade-parent mt-6 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                <LetterFadeText
                  text={
                    <>
                      Academic
                      <br />
                      Leadership
                    </>
                  }
                />
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                A personal commitment to strong foundations, guided practice,
                and the confidence every student needs to begin with clarity.
              </p>
            </div>

            <div className="motion-card director-message-card relative z-10 rounded-[2rem] p-6 lg:p-8">
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="director-portrait-ring">
                  <FacultyPortrait person={director} />
                </div>
                <div>
                  <MuiChip
                    label={director.tag}
                    size="small"
                    className="faculty-chip"
                  />
                  <h3 className="mt-4 font-display text-3xl font-semibold text-foreground">
                    {director.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {director.designation}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Knora Edu Academy
                  </p>
                </div>
              </div>

              <div className="faculty-quote-wide director-quote">
                <FormatQuoteRoundedIcon className="faculty-quote-icon" />
                <p>
                  Our commitment is simple: give every student strong
                  foundations, guided practice, and the confidence to build with
                  technology. As a new institute, we have the chance to know our
                  students closely and shape the first batch with real care.
                </p>
                <FormatQuoteRoundedIcon className="faculty-quote-icon faculty-quote-end" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "Strong foundations",
                  "Guided practice",
                  "Personal mentoring",
                ].map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-border/70 bg-background/45 px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="why-join"
            ref={setSceneRef(3)}
            className="section-4 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center"
          >
            <SceneTitle
              eyebrow="Why Join Us"
              title={
                <>
                  A New Institute
                  <br />
                  With A Personal Edge
                </>
              }
              copy="Modern AI learning infrastructure, small batches, and the attention only a focused new academy can give."
              center
            />
            <div className="mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 lg:grid-cols-3">
              {whyJoinCards.map((item) => (
                <div
                  key={item.title}
                  className="motion-card lift glass rounded-3xl p-4 text-left sm:p-5"
                >
                  <item.icon className="mb-4 size-6 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="courses"
            ref={setSceneRef(4)}
            className="section-5 hologram-section absolute inset-0 mx-auto flex max-w-7xl flex-col items-center justify-start px-6 pt-32 lg:px-10 lg:pt-36"
          >
            <SceneTitle
              eyebrow="Courses Offered"
              center
              title={
                <>
                  Choose Your
                  <br className="sm:hidden" />{" "}
                  <span className="text-primary">Learning Track</span>
                </>
              }
              copy="Focused AI and data courses with clear duration, mode, mentor support, and recordings for revision."
            />
            <div className="motion-card course-deck-wrap relative mt-16 w-full max-w-6xl">
              <div className="course-deck-stage relative mx-auto grid w-full gap-4 lg:block lg:h-[25rem]">
                <MuiIconButton
                  type="button"
                  aria-label="Previous course"
                  onClick={() => rotateCourse(1)}
                  className="course-nav-button course-nav-left glass"
                  sx={{ color: "var(--primary)" }}
                >
                  <ChevronLeftRoundedIcon fontSize="small" />
                </MuiIconButton>
                <MuiIconButton
                  type="button"
                  aria-label="Next course"
                  onClick={() => rotateCourse(-1)}
                  className="course-nav-button course-nav-right glass"
                  sx={{ color: "var(--primary)" }}
                >
                  <ChevronRightRoundedIcon fontSize="small" />
                </MuiIconButton>

                {courseCards.map((course, index) => {
                  const position = getCoursePosition(index);
                  return (
                    <div
                      key={course.name}
                      className={`course-track-card course-position-${position} relative flex min-h-[22rem] flex-col justify-end rounded-[2rem] p-5 text-left lg:absolute lg:min-h-[22rem] ${position === 0 ? "course-track-card-featured" : ""}`}
                    >
                      <div
                        className="course-particle-border"
                        aria-hidden="true"
                      >
                        <span className="course-particle-side course-particle-top" />
                        <span className="course-particle-side course-particle-right" />
                        <span className="course-particle-side course-particle-bottom" />
                        <span className="course-particle-side course-particle-left" />
                      </div>
                      <div className="course-card-orb absolute left-1/2 top-8 flex size-28 -translate-x-1/2 items-center justify-center rounded-full">
                        <img
                          src={course.image}
                          alt=""
                          aria-hidden="true"
                          className="course-card-image"
                          loading="lazy"
                        />
                      </div>
                      <MuiChip
                        label={course.mode}
                        size="small"
                        className="course-mode-chip"
                      />
                      <div className="relative z-10">
                        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
                          {course.name}
                        </h3>
                        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <CalendarMonthRoundedIcon className="course-duration-icon" />
                          {course.duration}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {course.copy}
                        </p>
                        <MuiButton
                          component="a"
                          href="/courses"
                          endIcon={<ArrowForwardRoundedIcon />}
                          className="course-more-button"
                        >
                          More Details
                        </MuiButton>
                      </div>
                    </div>
                  );
                })}
              </div>
              <MuiButton
                component="a"
                href="/courses"
                endIcon={<ArrowForwardRoundedIcon />}
                className="course-all-button glass"
              >
                View All Courses
              </MuiButton>
            </div>
          </section>

          <section
            id="faculty"
            ref={setSceneRef(5)}
            className="section-6 hologram-section absolute inset-0 mx-auto flex max-w-7xl items-center justify-center px-6 pt-24 lg:px-10"
          >
            <div className="motion-card faculty-showcase-shell faculty-meet-showcase relative z-10 grid w-full grid-cols-1 gap-8 rounded-[2.25rem] p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-7">
              <div className="faculty-hologram-stage relative min-h-[34rem]">
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                  <Badge>Faculty Members</Badge>
                </div>
                <MuiIconButton
                  aria-label="Previous faculty"
                  onClick={() => rotateFaculty(-1)}
                  className="faculty-stage-arrow faculty-stage-arrow-left"
                >
                  <ChevronLeftRoundedIcon />
                </MuiIconButton>
                <MuiIconButton
                  aria-label="Next faculty"
                  onClick={() => rotateFaculty(1)}
                  className="faculty-stage-arrow faculty-stage-arrow-right"
                >
                  <ChevronRightRoundedIcon />
                </MuiIconButton>

                <div className="faculty-holo-member faculty-holo-side faculty-holo-left">
                  <div className="faculty-mini-platform" />
                  <div className="faculty-small-ring">
                    <FacultyPortrait person={facultyPrev} />
                  </div>
                  <div className="faculty-name-plate">
                    <strong>{facultyPrev.name}</strong>
                    <span>{facultyPrev.role}</span>
                  </div>
                </div>

                <div className="faculty-holo-member faculty-holo-center">
                  <div className="faculty-platform" />
                  <div className="faculty-avatar-ring">
                    <div className="faculty-avatar-grid" />
                    <FacultyPortrait
                      person={faculty}
                      className="faculty-portrait-active"
                    />
                  </div>
                  <div className="faculty-name-plate faculty-name-plate-active">
                    <strong>{faculty.name}</strong>
                    <span>{faculty.role}</span>
                  </div>
                </div>

                <div className="faculty-holo-member faculty-holo-side faculty-holo-right">
                  <div className="faculty-mini-platform" />
                  <div className="faculty-small-ring">
                    <FacultyPortrait person={facultyNext} />
                  </div>
                  <div className="faculty-name-plate">
                    <strong>{facultyNext.name}</strong>
                    <span>{facultyNext.role}</span>
                  </div>
                </div>

                <div className="faculty-stage-dots">
                  {facultySpotlights.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-label={`Show ${item.name}`}
                      onClick={() => {
                        facultyScrollIndexRef.current = index;
                        setActiveFaculty(index);
                      }}
                      className={`faculty-dot ${
                        index === activeFaculty ? "faculty-dot-active" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                key={`meet-${faculty.name}`}
                className="faculty-profile-card relative rounded-[2rem] p-6 lg:p-8"
              >
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="faculty-icon-bubble">
                        <FacultyPortrait person={faculty} />
                      </span>
                      <div>
                        <h3 className="font-display text-3xl font-semibold text-foreground">
                          {faculty.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-primary">
                          {faculty.designation}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Knora Edu Academy
                        </p>
                      </div>
                    </div>
                    <MuiChip
                      label={faculty.tag}
                      size="small"
                      className="faculty-chip"
                    />
                  </div>
                  <div className="faculty-quote-wide">
                    <FormatQuoteRoundedIcon className="faculty-quote-icon" />
                    <p>{faculty.quote}</p>
                    <FormatQuoteRoundedIcon className="faculty-quote-icon faculty-quote-end" />
                  </div>
                  <div className="faculty-detail-list">
                    <div>
                      <SchoolRoundedIcon />
                      <span>Specialization</span>
                      <strong>{faculty.specialization}</strong>
                    </div>
                    <div>
                      <Award />
                      <span>Experience</span>
                      <strong>{faculty.experience}</strong>
                    </div>
                    <div>
                      <Users />
                      <span>Courses Teaching</span>
                      <strong>{faculty.courses}</strong>
                    </div>
                    <div>
                      <EmailRoundedIcon />
                      <span>Email</span>
                      <strong>{faculty.email}</strong>
                    </div>
                  </div>
                </div>
                <MuiButton
                  component="a"
                  href="/faculty"
                  endIcon={<ArrowForwardRoundedIcon />}
                  className="faculty-profile-button"
                >
                  More Details
                </MuiButton>
              </div>
            </div>
          </section>

          <section
            id="hybrid-learning"
            ref={setSceneRef(6)}
            className="section-7 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[1fr_1fr] lg:px-10"
          >
            <SceneTitle
              eyebrow="Online + Offline Learning Highlight"
              title={
                <>
                  Live Classes.
                  <br />
                  Recordings After.
                </>
              }
              copy="Join interactive classes via Zoom or Google Meet, learn offline on campus, and revisit recordings whenever you need revision."
            />
            <div className="motion-card glass relative z-10 rounded-3xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <MonitorPlay className="size-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Hybrid Learning Console
                </h3>
              </div>
              <div className="grid gap-3">
                {[
                  "Live interactive Zoom / Google Meet sessions",
                  "Offline classroom support for local students",
                  "Recorded video library for later viewing",
                  "Practice tasks and doubt-clearing support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/30 p-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="admissions"
            ref={setSceneRef(7)}
            className="section-8 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10"
          >
            <SceneTitle
              eyebrow="Admission Process"
              title={
                <>
                  Join In Four
                  <br />
                  Simple Steps
                </>
              }
              copy="Make joining feel easy, clear, and low-risk for students and parents."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {admissionSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="motion-card glass rounded-3xl p-5 text-left"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <step.icon className="size-5" />
                    </span>
                    <span className="font-display text-2xl font-semibold text-primary/35">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.copy}
                  </p>
                </div>
              ))}
              <a
                href="/apply-online"
                className="motion-card lift arrow-shift flex items-center justify-between rounded-3xl bg-primary p-5 text-sm font-semibold text-primary-foreground glow-soft"
              >
                Apply Now <Rocket className="arrow size-4" />
              </a>
            </div>
          </section>

          <section
            id="campus"
            ref={setSceneRef(8)}
            className="section-9 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center"
          >
            <SceneTitle
              eyebrow="Campus / Facility Preview"
              title={
                <>
                  Real Setup.
                  <br />
                  Ready To Learn.
                </>
              }
              copy="Use this section for campus, classroom, live-class, and recording-library photos as they become available."
              center
            />
            <div className="mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 lg:grid-cols-3">
              {facilityTiles.map((tile) => (
                <div
                  key={tile.title}
                  className="motion-card lift glass rounded-3xl p-5 text-left"
                >
                  <tile.icon className="mb-5 size-6 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {tile.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tile.copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="events"
            ref={setSceneRef(9)}
            className="section-10 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
          >
            <SceneTitle
              eyebrow="Upcoming Events / Launch Highlights"
              title={
                <>
                  Activity Around
                  <br />
                  The Launch
                </>
              }
              copy="Orientation, open house, and demo sessions create confidence and urgency for the founding batch."
            />
            <div className="grid gap-3">
              {launchEvents.map((event) => (
                <div
                  key={event.title}
                  className="motion-card glass flex items-start gap-4 rounded-3xl p-5"
                >
                  <CalendarDays className="mt-1 size-6 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                      {event.date}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {event.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="contact"
            ref={setSceneRef(10)}
            className="section-11 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10"
          >
            <SceneTitle
              eyebrow="Enquiry / Contact Form"
              title={
                <>
                  Capture Leads
                  <br />
                  From Home
                </>
              }
              copy="For a new launch, students should not have to hunt for Contact Us."
            />
            <form
              onSubmit={(event) => event.preventDefault()}
              className="motion-card glass relative z-10 grid gap-3 rounded-3xl p-5"
            >
              <h3 className="font-display text-xl font-semibold text-foreground">
                Enquiry Form
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  aria-label="Name"
                  className="rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="Name"
                  type="text"
                />
                <input
                  aria-label="Phone"
                  className="rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="Phone"
                  type="tel"
                />
                <input
                  aria-label="Email"
                  className="rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="Email"
                  type="email"
                />
                <select
                  aria-label="Course interested in"
                  className="rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Course Interested In
                  </option>
                  {courseCards.map((course) => (
                    <option key={course.name} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="lift arrow-shift mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-soft"
              >
                Submit Enquiry <ArrowRight className="arrow size-4" />
              </button>
            </form>
          </section>

          <section
            id="apply-now"
            ref={setSceneRef(11)}
            className="section-12 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center"
          >
            <SceneTitle
              eyebrow="Call-To-Action Banner"
              title={
                <>
                  Limited Seats For
                  <br />
                  Founding Batch
                </>
              }
              copy="Apply now and reserve your place in the September 2026 launch batch."
              center
            />
            <div className="motion-card glass mt-10 flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 rounded-3xl p-6 text-left">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  Admissions Open
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Start with extra mentoring and founding-batch benefits.
                </h3>
              </div>
              <a
                href="/apply-online"
                className="lift arrow-shift flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-soft"
              >
                Apply Now <ArrowRight className="arrow size-4" />
              </a>
            </div>
          </section>

          <section
            id="footer"
            ref={setSceneRef(12)}
            className="section-13 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
          >
            <SceneTitle
              eyebrow="Footer"
              title={
                <>
                  Knora Edu
                  <br />
                  Academy
                </>
              }
              copy="Quick links, address, phone, email, social links, and copyright in one final homepage section."
            />
            <footer className="motion-card glass relative z-10 rounded-3xl p-6">
              <div className="grid gap-6">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    Knora Edu Academy
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    New campus, hybrid classes, and practical AI courses.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    [Phone, "+91 98765 43210"],
                    [Mail, "admissions@knora.edu"],
                    [MapPin, "Knora Edu Academy"],
                  ].map(([Icon, label]) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/30 p-3 text-sm text-muted-foreground"
                    >
                      <Icon className="size-4 shrink-0 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  {footerLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#contact"
                      aria-label="social link"
                      className="icon-aura flex size-9 items-center justify-center rounded-full border border-border/80 text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
                <p className="border-t border-border/70 pt-4 text-xs text-muted-foreground">
                  Copyright 2026 Knora Edu Academy. All rights reserved.
                </p>
              </div>
            </footer>
          </section>
        </div>
      </main>
    </>
  );
}
