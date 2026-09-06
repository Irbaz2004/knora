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
  Card as MuiCard,
  Chip as MuiChip,
  GlobalStyles,
  IconButton as MuiIconButton,
  Stack as MuiStack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers,
  MonitorPlay,
  Mouse,
  Sparkles,
  Target,
  Users,
  Wifi,
} from "lucide-react";
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

const SCENE_COUNT = 9;
const SCENE_SCROLL_HEIGHT = 80;
const SCENE_SLOT = 1.42;

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
    icon: PsychologyIcon,
    image: courseAiImage,
    name: "AI & Machine Learning Foundation",
    duration: "16 weeks",
    mode: "Hybrid",
    level: "Beginner",
    copy: "Python, data handling, ML models, evaluation, and mini projects.",
  },
  {
    icon: CodeIcon,
    image: coursePythonImage,
    name: "Python for Data & AI",
    duration: "12 weeks",
    mode: "Online / Offline",
    level: "Starter",
    copy: "Programming basics, notebooks, APIs, and practical automation.",
  },
  {
    icon: PsychologyIcon,
    image: courseGenAiImage,
    name: "Generative AI & LLMs",
    duration: "10 weeks",
    mode: "Live Online",
    level: "Intermediate",
    copy: "Prompting, agents, RAG basics, and responsible AI workflows.",
  },
  {
    icon: LaptopMacIcon,
    image: courseVisionImage,
    name: "Computer Vision Essentials",
    duration: "8 weeks",
    mode: "Weekend Hybrid",
    level: "Intermediate",
    copy: "Image processing, detection concepts, and guided model demos.",
  },
  {
    icon: DataObjectIcon,
    image: courseAiImage,
    name: "Data Analytics Portfolio Track",
    duration: "14 weeks",
    mode: "Hybrid",
    level: "Career",
    copy: "Dashboards, data cleaning, reporting, and presentation-ready insight.",
  },
  {
    icon: SchoolIcon,
    image: courseGenAiImage,
    name: "AI Project Mentorship",
    duration: "6 weeks",
    mode: "Mentor-Led",
    level: "Project",
    copy: "Build, review, and polish a practical AI project for your portfolio.",
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
    iso: "2026-09-24",
    time: "6:00 PM IST",
    type: "Orientation",
    title: "Founding Batch Orientation",
    copy: "Meet mentors, understand the roadmap, and see how classes begin.",
  },
  {
    date: "27 Sep 2026",
    iso: "2026-09-27",
    time: "11:00 AM IST",
    type: "Campus Visit",
    title: "Campus Open House",
    copy: "Visit classrooms, explore the lab setup, and speak with the team.",
  },
  {
    date: "01 Oct 2026",
    iso: "2026-10-01",
    time: "7:00 PM IST",
    type: "Demo Class",
    title: "Free AI Demo Class",
    copy: "Experience a live hybrid AI session before choosing your track.",
  },
];

const launchEventByDate = launchEvents.reduce((events, event) => {
  events[event.iso] = event;
  return events;
}, {});

const calendarMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const launchCalendarDays = Array.from({ length: 35 }, (_, index) => {
  const date = new Date(2026, 7, 31 + index);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateNumber = date.getDate();

  return {
    key: `${year}-${month}-${day}`,
    label:
      index === 0 || dateNumber === 1
        ? `${calendarMonths[date.getMonth()].toUpperCase()} ${dateNumber}`
        : String(dateNumber),
    isMuted: date.getMonth() !== 8,
  };
});

const hybridMetrics = [
  ["Live cohorts", "Zoom + Meet"],
  ["Campus support", "Offline labs"],
  ["Replay library", "Recordings"],
];

const hybridHighlights = [
  {
    number: "01",
    title: "Attend from anywhere",
    copy: "Live online classes with mentor-led explanation and active doubt clearing.",
    variant: "orbit",
  },
  {
    number: "02",
    title: "Practice on campus",
    copy: "Offline classroom guidance for students who want face-to-face support.",
    variant: "sprout",
  },
  {
    number: "03",
    title: "Revise without pressure",
    copy: "Recorded sessions and practice tasks stay available for steady progress.",
    variant: "screen",
  },
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

function HybridIllustration({ variant }) {
  if (variant === "sprout") {
    return (
      <svg viewBox="0 0 220 160" aria-hidden="true">
        <path d="M110 142V64" />
        <path d="M88 142h44l22-14-44-26-44 26 22 14Z" />
        <path d="M110 68c-18-16-34-19-50-10 22 2 33 11 50 10Z" />
        <path d="M111 82c18-20 39-26 62-18-27 5-41 16-62 18Z" />
        <path d="M111 100c-17-13-32-14-46-5 18 0 30 7 46 5Z" />
        <path d="M112 46c13-16 30-22 50-17-23 6-35 15-50 17Z" />
      </svg>
    );
  }

  if (variant === "screen") {
    return (
      <svg viewBox="0 0 220 160" aria-hidden="true">
        <path d="M76 30 168 74v70L76 100V30Z" />
        <path d="M92 57 148 84v36L92 94V57Z" />
        <path d="M104 75 136 91" />
        <path d="M104 88 130 101" />
        <path d="M52 66l16 10-16 10-16-10 16-10Z" />
        <path d="M52 86v38" />
        <path d="M44 128c15 8 31 8 46 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M110 16 146 80l-36 24-36-24 36-64Z" />
      <path d="M110 16v88" />
      <path d="M74 80l36-18 36 18" />
      <path d="M56 92c0 28 24 48 54 48s54-20 54-48" />
      <path d="M38 102c0 38 32 58 72 58s72-20 72-58" />
      <path d="M110 104v22" />
    </svg>
  );
}

function CourseRoadmap({ viewportRef, trackRef }) {
  const stepWidth = 520;
  const viewWidth = courseCards.length * stepWidth;
  const points = courseCards.map((_, index) => ({
    x: stepWidth / 2 + index * stepWidth,
    y: index % 2 === 0 ? 230 : 300,
  }));
  const path = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;

      const previous = points[index - 1];
      const curve = stepWidth * 0.42;
      return `C ${previous.x + curve} ${previous.y}, ${point.x - curve} ${
        point.y
      }, ${point.x} ${point.y}`;
    })
    .join(" ");

  return (
    <Box className="motion-card course-roadmap-wrap">
      <Box className="course-roadmap-viewport" ref={viewportRef}>
        <Box
          className="course-roadmap-track"
          ref={trackRef}
          sx={{ "--course-count": courseCards.length }}
        >
          <svg
            className="course-roadmap-wave"
            viewBox={`0 0 ${viewWidth} 520`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="course-roadmap-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="48%" stopColor="var(--glow)" />
                <stop offset="100%" stopColor="var(--electric)" />
              </linearGradient>
            </defs>
            <path className="course-roadmap-wave-shadow" d={path} />
            <path className="course-roadmap-wave-path" d={path} />
          </svg>

          {courseCards.map((course, index) => {
            const Icon = course.icon;
            const isAbove = index % 2 === 0;

            return (
              <Box
                key={course.name}
                className={`course-roadmap-node ${
                  isAbove
                    ? "course-roadmap-node-above"
                    : "course-roadmap-node-below"
                }`}
              >
                <span className="course-roadmap-connector" aria-hidden="true" />
                <span className="course-roadmap-dot" aria-hidden="true" />
                <MuiCard className="course-roadmap-card">
                  <MuiStack spacing={2}>
                    <MuiStack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <span className="course-roadmap-icon">
                        <Icon fontSize="small" />
                      </span>
                      <MuiChip
                        label={`Course ${String(index + 1).padStart(2, "0")}`}
                        size="small"
                        className="course-roadmap-chip"
                      />
                    </MuiStack>

                    <Box>
                      <Typography
                        component="h3"
                        className="course-roadmap-title"
                      >
                        {course.name}
                      </Typography>
                      <Typography component="p" className="course-roadmap-copy">
                        {course.copy}
                      </Typography>
                    </Box>

                    <MuiStack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      <span className="course-roadmap-meta">
                        <AccessTimeIcon fontSize="inherit" />
                        {course.duration}
                      </span>
                      <span className="course-roadmap-meta">
                        <LaptopMacIcon fontSize="inherit" />
                        {course.mode}
                      </span>
                      <span className="course-roadmap-meta">
                        <SchoolIcon fontSize="inherit" />
                        {course.level}
                      </span>
                    </MuiStack>

                    <MuiButton
                      component="a"
                      href="/courses"
                      endIcon={<ArrowForwardIcon />}
                      className="course-roadmap-button"
                    >
                      More Details
                    </MuiButton>
                  </MuiStack>
                </MuiCard>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default function Home() {
  const wrapper = useRef(null);
  const sceneRefs = useRef([]);
  const heroVisualRef = useRef(null);
  const heroCoreRef = useRef(null);
  const courseRoadmapViewportRef = useRef(null);
  const courseRoadmapTrackRef = useRef(null);
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [heroLetterIndex, setHeroLetterIndex] = useState(0);
  const facultyScrollIndexRef = useRef(0);

  const setSceneRef = (index) => (el) => {
    sceneRefs.current[index] = el;
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
      const sceneSlot = SCENE_SLOT;
      const scenes = sceneRefs.current.slice(0, SCENE_COUNT).filter(Boolean);
      const roadmapTrack = courseRoadmapTrackRef.current;
      const roadmapViewport = courseRoadmapViewportRef.current;
      const getRoadmapDistance = () =>
        Math.max(
          0,
          (roadmapTrack?.scrollWidth ?? 0) -
            (roadmapViewport?.clientWidth ?? 0),
        );
      gsap.set(scenes, { pointerEvents: "none" });
      gsap.set(scenes.slice(1), { autoAlpha: 0, y: 56, zIndex: 0 });
      if (roadmapTrack) {
        gsap.set(roadmapTrack, { x: 0 });
      }
      gsap.set(scenes[0], {
        autoAlpha: 1,
        y: 0,
        zIndex: 2,
        pointerEvents: "auto",
      });
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
          scrub: journey.reducedMotion ? true : 0.58,
          invalidateOnRefresh: true,
          anticipatePin: 0.5,
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
            tl.set(scene, { zIndex: 3, pointerEvents: "auto" }, start - 0.02);
            tl.to(scene, { y: 0, autoAlpha: 1, duration: 0.58, ease }, start);
            hologramIn(`${selector} .holo-text`, start + 0.06);
            lettersIn(scene, start + 0.16);
            tl.from(
              scene.querySelectorAll(".motion-card"),
              { y: 22, autoAlpha: 0, stagger: 0.04, duration: 0.3, ease },
              start + 0.2,
            );
          }
          if (i < scenes.length - 1) {
            const exitAt =
              i === 5 ? start + 1.4 : i === 4 ? start + 1.34 : start + 0.9;
            const hideAt =
              i === 5 ? start + 1.54 : i === 4 ? start + 1.42 : start + 1.42;
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
            tl.set(scene, { zIndex: 0, pointerEvents: "none" }, hideAt + 0.24);
          }
        });

        if (roadmapTrack) {
          tl.to(
            roadmapTrack,
            {
              x: () => -getRoadmapDistance(),
              duration: 0.92,
              ease: "none",
            },
            4 * sceneSlot + 0.42,
          );
        }
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
          ".launch-calendar-section": {
            isolation: "isolate",
            background:
              "radial-gradient(circle at 50% 18%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 34%), linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--primary) 7%, var(--background)) 54%, var(--background) 100%)",
          },
          ".launch-calendar-section::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: -2,
            backgroundImage:
              "linear-gradient(90deg, color-mix(in oklab, var(--primary) 11%, transparent) 1px, transparent 1px), linear-gradient(180deg, color-mix(in oklab, var(--primary) 9%, transparent) 1px, transparent 1px)",
            backgroundSize: "12.5vw 100%, 100% 25%",
            opacity: 0.64,
          },
          ".launch-calendar-section::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: -1,
            background:
              "radial-gradient(ellipse at 50% 68%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 58%)",
            opacity: 0.78,
          },
          ".launch-calendar-grid-bg": {
            position: "absolute",
            inset: "9% 5% 5%",
            border:
              "1px solid color-mix(in oklab, var(--border) 64%, transparent)",
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--primary) 18%, transparent) 0.7px, transparent 0.7px)",
            backgroundSize: "3px 3px",
            opacity: 0.22,
            maskImage:
              "radial-gradient(ellipse at 50% 55%, black 0%, transparent 72%)",
          },
          ".launch-calendar-heading": {
            position: "relative",
            zIndex: 2,
            marginBottom: "1.35rem",
          },
          ".launch-calendar-heading .hero-badge": {
            marginInline: "auto",
            border:
              "1px solid color-mix(in oklab, var(--primary) 18%, var(--border))",
            background: "color-mix(in oklab, var(--card) 72%, transparent)",
            color: "var(--primary)",
          },
          ".launch-calendar-heading h2": {
            color: "var(--foreground)",
            fontSize: "clamp(2.45rem, 5vw, 4.7rem)",
            letterSpacing: 0,
          },
          ".launch-calendar-panel": {
            position: "relative",
            zIndex: 2,
            width: "min(1120px, calc(100vw - 2rem))",
            borderRadius: "10px",
            border:
              "1px solid color-mix(in oklab, var(--primary) 18%, var(--border))",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 92%, transparent), color-mix(in oklab, var(--card) 72%, transparent)), linear-gradient(135deg, color-mix(in oklab, var(--primary) 5%, var(--background)), var(--background))",
            padding: "clamp(0.8rem, 1.5vw, 1rem)",
            overflow: "hidden",
          },
          ".launch-calendar-panel::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--primary) 17%, transparent) 0.7px, transparent 0.7px), linear-gradient(180deg, color-mix(in oklab, var(--primary) 7%, transparent), transparent 28%)",
            backgroundSize: "3px 3px, 100% 100%",
            opacity: 0.28,
          },
          ".launch-calendar-toolbar": {
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
            alignItems: "center",
            gap: "0.75rem",
            borderBottom:
              "1px solid color-mix(in oklab, var(--border) 78%, transparent)",
            paddingBottom: "0.8rem",
          },
          ".launch-calendar-range.MuiTypography-root": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display) !important",
            fontSize: "clamp(1.05rem, 1.8vw, 1.45rem)",
            fontWeight: 700,
            lineHeight: 1.05,
          },
          ".launch-calendar-actions": {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            justifySelf: "center",
          },
          ".launch-calendar-actions button": {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.8rem",
            height: "1.8rem",
            borderRadius: "7px",
            border: "1px solid var(--border)",
            background: "color-mix(in oklab, var(--card) 82%, transparent)",
            color: "var(--foreground)",
          },
          ".launch-calendar-actions span": {
            display: "inline-flex",
            minHeight: "1.8rem",
            alignItems: "center",
            borderRadius: "7px",
            border: "1px solid var(--border)",
            paddingInline: "0.7rem",
            color: "var(--muted-foreground)",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          },
          ".launch-calendar-tags": {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "0.35rem",
            minWidth: 0,
          },
          ".launch-calendar-tags span": {
            display: "inline-flex",
            minHeight: "1.65rem",
            alignItems: "center",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "color-mix(in oklab, var(--card) 78%, transparent)",
            paddingInline: "0.55rem",
            color: "var(--muted-foreground)",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          },
          ".launch-calendar-tag-live::before, .launch-calendar-tag-workshop::before, .launch-calendar-tag-demo::before":
            {
              content: '""',
              width: "0.42rem",
              height: "0.42rem",
              borderRadius: "999px",
              marginRight: "0.38rem",
              background: "var(--primary)",
            },
          ".launch-calendar-tag-workshop::before": {
            background:
              "color-mix(in oklab, var(--primary) 66%, var(--foreground))",
          },
          ".launch-calendar-tag-demo::before": {
            background:
              "color-mix(in oklab, var(--primary) 42%, var(--foreground))",
          },
          ".launch-calendar-weekdays": {
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gap: "0.38rem",
            paddingBlock: "0.85rem 0.5rem",
          },
          ".launch-calendar-weekdays span": {
            color: "var(--muted-foreground)",
            fontSize: "0.64rem",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
          ".launch-calendar-cells": {
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gridTemplateRows: "repeat(5, minmax(0, 1fr))",
            gap: "0.38rem",
            minHeight: "clamp(19rem, 49vh, 30.5rem)",
          },
          ".launch-calendar-cell": {
            position: "relative",
            minWidth: 0,
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 78%, transparent), color-mix(in oklab, var(--background) 88%, transparent))",
            padding: "0.5rem",
          },
          ".launch-calendar-cell-muted": {
            opacity: 0.62,
          },
          ".launch-calendar-date": {
            display: "block",
            color: "var(--foreground)",
            fontSize: "0.66rem",
            fontWeight: 900,
            letterSpacing: "0.04em",
            lineHeight: 1,
            textTransform: "uppercase",
          },
          ".launch-calendar-event": {
            position: "absolute",
            left: "0.48rem",
            right: "0.48rem",
            bottom: "0.48rem",
            display: "grid",
            gap: "0.18rem",
            borderRadius: "7px",
            border:
              "1px solid color-mix(in oklab, var(--primary) 44%, var(--border))",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--primary) 16%, var(--card)), color-mix(in oklab, var(--primary) 7%, var(--background)))",
            padding: "0.48rem",
            color: "var(--foreground)",
            textDecoration: "none",
          },
          ".launch-calendar-event-workshop": {
            borderColor:
              "color-mix(in oklab, var(--primary) 32%, var(--border))",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--primary) 10%, var(--card)), color-mix(in oklab, var(--primary) 4%, var(--background)))",
          },
          ".launch-calendar-event-demo": {
            borderColor:
              "color-mix(in oklab, var(--primary) 56%, var(--border))",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--primary) 22%, var(--card)), color-mix(in oklab, var(--primary) 10%, var(--background)))",
          },
          ".launch-calendar-event strong": {
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            fontFamily: "var(--font-display)",
            fontSize: "0.78rem",
            lineHeight: 1.1,
          },
          ".launch-calendar-event span": {
            color: "var(--primary)",
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          },
          ".launch-calendar-event small": {
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            color: "var(--muted-foreground)",
            fontSize: "0.62rem",
            lineHeight: 1.25,
          },
          "@media (max-width: 900px)": {
            ".launch-calendar-section": {
              justifyContent: "flex-start",
              paddingTop: "5.75rem",
            },
            ".launch-calendar-heading": {
              marginBottom: "0.95rem",
            },
            ".launch-calendar-toolbar": {
              gridTemplateColumns: "1fr",
              justifyItems: "start",
            },
            ".launch-calendar-actions": {
              justifySelf: "start",
            },
            ".launch-calendar-tags": {
              justifyContent: "flex-start",
            },
            ".launch-calendar-cells": {
              minHeight: "clamp(20rem, 52vh, 26rem)",
            },
          },
          "@media (max-width: 640px)": {
            ".launch-calendar-section": {
              paddingInline: "0.75rem",
              paddingTop: "5.4rem",
            },
            ".launch-calendar-heading h2": {
              fontSize: "clamp(2rem, 9vw, 2.65rem)",
            },
            ".launch-calendar-panel": {
              width: "calc(100vw - 1rem)",
              padding: "0.62rem",
            },
            ".launch-calendar-tags span:first-of-type": {
              display: "none",
            },
            ".launch-calendar-weekdays": {
              gap: "0.22rem",
              paddingBlock: "0.6rem 0.35rem",
            },
            ".launch-calendar-weekdays span": {
              fontSize: "0.52rem",
            },
            ".launch-calendar-cells": {
              gap: "0.22rem",
              minHeight: "20rem",
            },
            ".launch-calendar-cell": {
              borderRadius: "6px",
              padding: "0.34rem",
            },
            ".launch-calendar-date": {
              fontSize: "0.56rem",
            },
            ".launch-calendar-event": {
              left: "0.25rem",
              right: "0.25rem",
              bottom: "0.25rem",
              gap: "0.12rem",
              padding: "0.3rem",
            },
            ".launch-calendar-event strong": {
              fontSize: "0.58rem",
              WebkitLineClamp: 2,
            },
            ".launch-calendar-event span": {
              fontSize: "0.48rem",
            },
            ".launch-calendar-event small": {
              display: "none",
            },
          },
        }}
      />
      <CursorEffect />
      <ParticleField heroAnchorRef={heroCoreRef} heroHoverRef={heroVisualRef} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="bloom absolute left-1/2 top-1/3 size-[70vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--electric) 10%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--electric) 10%, transparent) 1px, transparent 1px)",
            backgroundSize: "20vw 20vh",
            maskImage:
              "radial-gradient(circle at 50% 42%, black, transparent 74%)",
          }}
        />
      </div>

      <main
        ref={wrapper}
        className="relative w-full"
        style={{ height: `${SCENE_COUNT * SCENE_SCROLL_HEIGHT}vh` }}
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
            className="section-5 hologram-section absolute inset-0 mx-auto flex w-full max-w-none flex-col items-center justify-start overflow-hidden px-0 pt-28 sm:pt-30 lg:pt-32"
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
            <div className="relative mt-6 w-full sm:mt-8 lg:mt-10">
              <CourseRoadmap
                viewportRef={courseRoadmapViewportRef}
                trackRef={courseRoadmapTrackRef}
              />
              <MuiButton
                component="a"
                href="/courses"
                endIcon={<ArrowForwardRoundedIcon />}
                className="course-all-button glass relative z-20"
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
            className="section-7 hybrid-editorial-section hologram-section absolute inset-0 mx-auto flex w-full max-w-none items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-7"
          >
            <div className="hybrid-editorial-grid relative z-10">
              <div className="holo-text hybrid-copy-column">
                <span className="hybrid-kicker">
                  Online + Offline Learning Highlight
                </span>
                <h2 className="letter-fade-parent hybrid-title-large">
                  <LetterFadeText
                    text={
                      <>
                        Learn Live.
                        <br />
                        Practice Offline.
                        <br />
                        Revise Anytime.
                      </>
                    }
                  />
                </h2>
                <p>
                  Knora blends live online teaching, campus support, and
                  recorded revision into one focused learning rhythm for AI and
                  data students.
                </p>
              </div>

              <div className="hybrid-highlight-list">
                {hybridHighlights.map((item) => (
                  <div key={item.number} className="motion-card hybrid-row">
                    <div>
                      <span className="hybrid-row-number">+ {item.number}</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                    <HybridIllustration variant={item.variant} />
                  </div>
                ))}
              </div>

              <dl className="motion-card hybrid-metrics">
                {hybridMetrics.map(([value, label]) => (
                  <div key={value}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section
            id="campus"
            ref={setSceneRef(7)}
            className="section-8 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center"
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
            ref={setSceneRef(8)}
            className="section-9 launch-calendar-section hologram-section absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-10"
          >
            <div className="launch-calendar-grid-bg" aria-hidden="true" />
            <div className="holo-text launch-calendar-heading text-center">
              <Badge>Upcoming Events / Launch Highlights</Badge>
              <h2 className="letter-fade-parent mt-4 font-display text-4xl leading-[0.96] font-semibold text-white sm:text-5xl lg:text-6xl">
                <LetterFadeText
                  text={
                    <>
                      Upcoming Launch Events
                      <br />
                      Batch Highlights.
                    </>
                  }
                />
              </h2>
            </div>

            <div className="motion-card launch-calendar-panel">
              <div className="launch-calendar-toolbar">
                <Typography component="h3" className="launch-calendar-range">
                  Aug 31, 2026 - Oct 4, 2026
                </Typography>
                <div className="launch-calendar-actions">
                  <button type="button" aria-label="Previous week">
                    <ChevronLeftRoundedIcon fontSize="small" />
                  </button>
                  <span>Today</span>
                  <button type="button" aria-label="Next week">
                    <ChevronRightRoundedIcon fontSize="small" />
                  </button>
                </div>
                <div className="launch-calendar-tags">
                  <span>Launch window - IST</span>
                  <span className="launch-calendar-tag-live">Orientation</span>
                  <span className="launch-calendar-tag-workshop">
                    Campus Visit
                  </span>
                  <span className="launch-calendar-tag-demo">Demo Class</span>
                </div>
              </div>

              <div className="launch-calendar-weekdays" aria-hidden="true">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  ),
                )}
              </div>

              <div
                className="launch-calendar-cells"
                role="grid"
                aria-label="Launch event calendar"
              >
                {launchCalendarDays.map((day) => {
                  const event = launchEventByDate[day.key];

                  return (
                    <div
                      key={day.key}
                      className={`launch-calendar-cell ${
                        day.isMuted ? "launch-calendar-cell-muted" : ""
                      }`}
                      role="gridcell"
                    >
                      <span className="launch-calendar-date">{day.label}</span>
                      {event && (
                        <a
                          href="/courses"
                          className={`launch-calendar-event ${
                            event.type === "Campus Visit"
                              ? "launch-calendar-event-workshop"
                              : event.type === "Demo Class"
                                ? "launch-calendar-event-demo"
                                : "launch-calendar-event-live"
                          }`}
                        >
                          <strong>{event.title}</strong>
                          <span>{event.time}</span>
                          <small>{event.copy}</small>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
