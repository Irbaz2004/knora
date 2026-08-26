import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  GlobalStyles,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";
import courseAiImage from "@/assets/course-ai.svg";
import courseGenAiImage from "@/assets/course-genai.svg";
import coursePythonImage from "@/assets/course-python.svg";
import courseVisionImage from "@/assets/course-vision.svg";

const courses = [
  {
    name: "AI Foundation",
    category: "Foundation",
    fullName: "AI & Machine Learning Foundation",
    tag: "Reliable",
    icon: PsychologyRoundedIcon,
    image: courseAiImage,
    duration: "16 Weeks",
    mode: "Hybrid",
    level: "Beginner",
    color:
      "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--glow) 88%, var(--electric)))",
    copy: "Python, data handling, ML models, evaluation, and guided mini projects.",
    highlights: ["Python basics", "ML workflows", "Model evaluation"],
    files: [
      {
        title: "AI Roadmap",
        copy: "Understand how data, models, training, and evaluation connect.",
        icon: MenuBookRoundedIcon,
      },
      {
        title: "Python Lab",
        copy: "Write clean beginner Python inside guided notebooks.",
        icon: CodeRoundedIcon,
      },
      {
        title: "Data Files",
        copy: "Load, clean, inspect, and prepare datasets for learning.",
        icon: DescriptionRoundedIcon,
      },
      {
        title: "Model Practice",
        copy: "Train simple models and compare prediction behavior.",
        icon: PsychologyRoundedIcon,
      },
      {
        title: "Mini Project",
        copy: "Build a small portfolio-ready machine learning demo.",
        icon: AssignmentTurnedInRoundedIcon,
      },
    ],
  },
  {
    name: "Python AI",
    category: "Programming",
    fullName: "Python for Data & AI",
    tag: "Smooth",
    icon: CodeRoundedIcon,
    image: coursePythonImage,
    duration: "12 Weeks",
    mode: "Online / Offline",
    level: "Starter",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--electric) 84%, var(--navy)), color-mix(in oklab, var(--glow) 68%, white))",
    copy: "Programming foundations, notebooks, APIs, automation, and coding confidence.",
    highlights: ["Core coding", "APIs", "Automation"],
    files: [
      {
        title: "Syntax Files",
        copy: "Variables, conditions, loops, functions, and clear code habits.",
        icon: CodeRoundedIcon,
      },
      {
        title: "Notebook Work",
        copy: "Practice Python in notebook-based lessons and exercises.",
        icon: DescriptionRoundedIcon,
      },
      {
        title: "API Basics",
        copy: "Call APIs, read responses, and work with structured data.",
        icon: DataObjectRoundedIcon,
      },
      {
        title: "Automation",
        copy: "Create scripts that save time in everyday workflows.",
        icon: RocketLaunchRoundedIcon,
      },
      {
        title: "Code Review",
        copy: "Refactor small programs and explain your solution clearly.",
        icon: AssignmentTurnedInRoundedIcon,
      },
    ],
  },
  {
    name: "GenAI",
    category: "Generative AI",
    fullName: "Generative AI & LLMs",
    tag: "Customizable",
    icon: SmartToyRoundedIcon,
    image: courseGenAiImage,
    duration: "10 Weeks",
    mode: "Live Online",
    level: "Intermediate",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--navy) 35%, var(--primary)), var(--electric))",
    copy: "Prompting, agents, RAG basics, responsible AI, and practical LLM workflows.",
    highlights: ["Prompting", "RAG basics", "AI agents"],
    files: [
      {
        title: "Prompt Files",
        copy: "Shape reliable prompts with structure, context, and constraints.",
        icon: SmartToyRoundedIcon,
      },
      {
        title: "LLM Basics",
        copy: "Learn tokens, context windows, model behavior, and limits.",
        icon: MenuBookRoundedIcon,
      },
      {
        title: "RAG Folder",
        copy: "Connect documents, retrieval, and grounded answers.",
        icon: FolderOpenRoundedIcon,
      },
      {
        title: "Agent Lab",
        copy: "Design simple tool-using AI workflows for real tasks.",
        icon: RocketLaunchRoundedIcon,
      },
      {
        title: "Responsible AI",
        copy: "Check outputs, reduce risk, and build safer AI habits.",
        icon: AssignmentTurnedInRoundedIcon,
      },
    ],
  },
  {
    name: "Vision",
    category: "Computer Vision",
    fullName: "Computer Vision Essentials",
    tag: "Visual",
    icon: VisibilityRoundedIcon,
    image: courseVisionImage,
    duration: "8 Weeks",
    mode: "Weekend Hybrid",
    level: "Intermediate",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--electric) 72%, var(--glow)), color-mix(in oklab, var(--primary) 78%, white))",
    copy: "Image processing, detection concepts, and guided model demos for visual AI.",
    highlights: ["Image processing", "Detection", "Model demos"],
    files: [
      {
        title: "Image Basics",
        copy: "Read pixels, channels, resizing, filters, and transforms.",
        icon: VisibilityRoundedIcon,
      },
      {
        title: "OpenCV Lab",
        copy: "Practice visual workflows with guided image-processing tasks.",
        icon: CodeRoundedIcon,
      },
      {
        title: "Detection",
        copy: "Understand boxes, labels, confidence, and model outputs.",
        icon: PsychologyRoundedIcon,
      },
      {
        title: "Vision Demo",
        copy: "Build a simple visual AI demo from start to finish.",
        icon: RocketLaunchRoundedIcon,
      },
      {
        title: "Portfolio File",
        copy: "Package your result with screenshots and explanation.",
        icon: AssignmentTurnedInRoundedIcon,
      },
    ],
  },
  {
    name: "Data Stack",
    category: "Analytics",
    fullName: "Data Analytics Portfolio Track",
    tag: "Practical",
    icon: DataObjectRoundedIcon,
    image: courseAiImage,
    duration: "14 Weeks",
    mode: "Hybrid",
    level: "Career",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--glow) 74%, var(--electric)), color-mix(in oklab, var(--navy) 54%, var(--primary)))",
    copy: "Dashboards, data cleaning, portfolio reporting, and presentation-ready insights.",
    highlights: ["Dashboards", "Cleaning", "Portfolio"],
    files: [
      {
        title: "Data Cleaning",
        copy: "Fix missing values, formats, duplicates, and messy columns.",
        icon: DataObjectRoundedIcon,
      },
      {
        title: "Analysis File",
        copy: "Explore trends, groups, summaries, and useful questions.",
        icon: DescriptionRoundedIcon,
      },
      {
        title: "Dashboard",
        copy: "Turn analysis into readable charts and decision views.",
        icon: VisibilityRoundedIcon,
      },
      {
        title: "Storytelling",
        copy: "Present insights with context, evidence, and next steps.",
        icon: MenuBookRoundedIcon,
      },
      {
        title: "Portfolio",
        copy: "Publish a complete analytics case study for review.",
        icon: AssignmentTurnedInRoundedIcon,
      },
    ],
  },
];

function CourseFolderStack({ activeCourse, onSelect, onSendBack, onOpen }) {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [drag, setDrag] = useState({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  });

  const startDrag = (event, index, isActive) => {
    onSelect(index);
    if (!isActive) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
    });
  };

  const moveDrag = (event) => {
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    setDrag((current) => ({
      ...current,
      x: event.clientX - current.startX,
      y: event.clientY - current.startY,
    }));
  };

  const stopDrag = (event) => {
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const moved = Math.hypot(drag.x, drag.y);
    setDrag({
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    });

    if (moved > 72) {
      onSendBack();
    } else if (moved < 12) {
      onOpen(activeCourse);
    }
  };

  return (
    <Box
      className="course-stack-stage"
      sx={{
        height: { xs: 350, sm: 400, md: "clamp(330px, 33vw, 410px)" },
        position: "relative",
        width: "100%",
      }}
    >
      {courses.map((course, index) => {
        const Icon = course.icon;
        const offset = (index - activeCourse + courses.length) % courses.length;
        const isActive = offset === 0;
        const isHovered = hoveredCourse === index && !drag.active;
        const hoverLift = isHovered ? -16 : 0;
        const baseTransform =
          offset === 0
            ? `translate3d(0, ${hoverLift}px, 0) rotate(0deg) scale(${
                isHovered ? 1.012 : 1
              })`
            : `translate3d(${offset * 30}px, ${
                offset * -8 + hoverLift
              }px, 0) rotate(${
                -4 + offset * 1.8
              }deg) scale(${1 - offset * 0.045 + (isHovered ? 0.008 : 0)})`;
        const dragTransform =
          isActive && drag.active
            ? `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${
                drag.x * 0.03
              }deg) scale(0.98)`
            : baseTransform;

        return (
          <Box
            key={course.name}
            component="button"
            type="button"
            aria-label={`Show ${course.fullName}`}
            onPointerDown={(event) => startDrag(event, index, isActive)}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onPointerEnter={() => setHoveredCourse(index)}
            onPointerLeave={() => setHoveredCourse(null)}
            className={`course-folder ${isActive ? "course-folder-active" : ""}`}
            sx={{
              "--folder-gradient": course.color,
              left: { xs: "2%", md: `${offset * 4.2}%` },
              opacity: offset > 3 ? 0 : 1,
              top: { xs: `${48 - offset * 14}px`, md: `${58 - offset * 24}px` },
              transform: dragTransform,
              zIndex: courses.length - offset,
            }}
          >
            <Box className="course-folder-tab">
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Icon sx={{ fontSize: 18 }} />
                <span>{course.category}</span>
              </Stack>
            </Box>
            <Box className="course-folder-body">
              <Box className="course-card-orbit" />
              <Box className="course-folder-icon-ring">
                <Box
                  component="img"
                  alt=""
                  aria-hidden="true"
                  className="course-folder-main-image"
                  src={course.image}
                />
              </Box>
              <Stack className="course-folder-copy" spacing={1.4}>
                <Typography
                  sx={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: {
                      xs: "clamp(34px, 12vw, 48px)",
                      md: "clamp(42px, 4.4vw, 56px)",
                    },
                    fontWeight: 800,
                    letterSpacing: 0,
                    lineHeight: 1,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--muted-foreground)",
                    fontSize: {
                      xs: "clamp(13px, 4vw, 15px)",
                      md: "clamp(14px, 1.15vw, 16px)",
                    },
                    fontWeight: 800,
                  }}
                >
                  {course.fullName}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--primary)",
                    fontSize: {
                      xs: "clamp(11px, 3.4vw, 13px)",
                      md: "clamp(12px, 1vw, 14px)",
                    },
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {course.tag}
                </Typography>
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function CourseInfiniteMenu({ course, onClose }) {
  const [rotation, setRotation] = useState(0);
  const [axis, setAxis] = useState({ x: 0, y: 0 });
  const [hasFocused, setHasFocused] = useState(false);
  const [drag, setDrag] = useState({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  });
  const files = course.files;
  const clampAxis = (value) => Math.max(-12, Math.min(12, value));
  const liveRotation = rotation + drag.x * 0.006 + drag.y * 0.002;
  const liveAxis = {
    x: clampAxis(axis.x + drag.x * 0.026),
    y: clampAxis(axis.y + drag.y * 0.026),
  };
  const step = (Math.PI * 2) / files.length;
  const activeFileIndex =
    ((Math.round(-liveRotation / step) % files.length) + files.length) %
    files.length;
  const activeFile = files[activeFileIndex];
  const ActiveIcon = activeFile.icon;

  const startDrag = (event) => {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
    });
  };

  const moveDrag = (event) => {
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    setDrag((current) => ({
      ...current,
      x: event.clientX - current.startX,
      y: event.clientY - current.startY,
    }));
  };

  const stopDrag = (event) => {
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const moved = Math.hypot(drag.x, drag.y);
    setRotation((current) => current + drag.x * 0.006 + drag.y * 0.002);
    setAxis((current) => ({
      x: clampAxis(current.x + drag.x * 0.026),
      y: clampAxis(current.y + drag.y * 0.026),
    }));
    setHasFocused(moved > 8);
    setDrag({
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    });
  };

  const scrollMenu = (event) => {
    event.preventDefault();
    const wheelX = event.deltaX || 0;
    const wheelY = event.deltaY || 0;

    setRotation((current) => current + wheelX * 0.004 + wheelY * 0.0028);
    setAxis((current) => ({
      x: clampAxis(current.x - wheelX * 0.018),
      y: clampAxis(current.y - wheelY * 0.018),
    }));
    setHasFocused(true);
  };

  return (
    <Box
      className={`course-menu-view ${drag.active ? "course-menu-zoomed" : ""} ${
        hasFocused ? "course-menu-focused" : ""
      }`}
      onWheel={scrollMenu}
    >
      <Button
        onClick={onClose}
        startIcon={<CloseRoundedIcon />}
        className="course-menu-close"
      >
        Folders
      </Button>

      <Stack className="course-menu-title" spacing={1.4}>
        <Chip
          label={course.category}
          sx={{
            bgcolor: "var(--primary)",
            border: "1px solid var(--primary)",
            color: "var(--primary-foreground)",
            fontWeight: 900,
            width: "fit-content",
          }}
        />
        <Typography
          sx={{
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: { xs: 38, sm: 54, md: 72 },
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 0.95,
          }}
        >
          {activeFile.title}
        </Typography>
      </Stack>

      <Typography className="course-menu-copy">{activeFile.copy}</Typography>

      <Box
        component="button"
        type="button"
        aria-label="Drag course file menu"
        className="course-menu-drag"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <ActiveIcon className="course-menu-center-icon" />
        <ArrowForwardRoundedIcon className="course-menu-arrow" />
      </Box>

      <Box className="course-menu-orbit" aria-hidden="true">
        {Array.from({ length: files.length * 2 }).map((_, orbitIndex) => {
          const file = files[orbitIndex % files.length];
          const Icon = file.icon;
          const angle = orbitIndex * step + liveRotation;
          const x = Math.cos(angle) * 42;
          const y = Math.sin(angle) * 30;
          const depth = (Math.sin(angle) + 1) / 2;
          const scale = 0.66 + depth * 0.42;

          return (
            <Box
              key={`${file.title}-${orbitIndex}`}
              className={`course-menu-node ${
                orbitIndex % files.length === activeFileIndex
                  ? "course-menu-node-active"
                  : ""
              }`}
              sx={{
                opacity: 0.24 + depth * 0.62,
                transform: `translate(calc(-50% + ${x + liveAxis.x}vw), calc(-50% + ${
                  y + liveAxis.y
                }vh)) rotate(${angle}rad) scale(${scale})`,
                zIndex: Math.round(depth * 10),
              }}
            >
              <Icon />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function Courses() {
  const [activeCourse, setActiveCourse] = useState(0);
  const [openedCourse, setOpenedCourse] = useState(null);
  const active = courses[activeCourse];
  const opened = openedCourse === null ? null : courses[openedCourse];

  const sendFrontFolderBack = () => {
    setActiveCourse((current) => (current + 1) % courses.length);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes courseSwapPop": {
            "0%": { filter: "blur(5px)", opacity: 0.72 },
            "100%": { filter: "blur(0)", opacity: 1 },
          },
          "@keyframes courseGlow": {
            "0%, 100%": { opacity: 0.42, transform: "scale(1)" },
            "50%": { opacity: 0.82, transform: "scale(1.06)" },
          },
          ".courses-page": {
            background: "var(--background)",
          },
          ".dark .courses-page": {
            background: "var(--background)",
          },
          ".course-stack-stage::before": {
            animation: "courseGlow 4.8s ease-in-out infinite",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--electric) 42%, transparent), transparent 68%)",
            content: '""',
            filter: "blur(38px)",
            inset: "12% 0 8% 14%",
            position: "absolute",
          },
          ".course-folder": {
            background: "transparent",
            border: 0,
            color: "inherit",
            cursor: "pointer",
            height: "clamp(260px, 29vw, 340px)",
            maxWidth: "clamp(390px, 38vw, 550px)",
            minHeight: "260px",
            outline: "none",
            padding: 0,
            position: "absolute",
            textAlign: "left",
            touchAction: "none",
            transition:
              "transform 920ms cubic-bezier(.16,1,.3,1), top 920ms cubic-bezier(.16,1,.3,1), left 920ms cubic-bezier(.16,1,.3,1), opacity 520ms ease",
            userSelect: "none",
            willChange: "transform, top, left, opacity",
            width: "min(86vw, clamp(390px, 38vw, 550px))",
          },
          ".course-folder:focus-visible .course-folder-body": {
            outline:
              "3px solid color-mix(in oklab, var(--electric) 52%, white)",
            outlineOffset: 3,
          },
          ".course-folder-active": {
            animation: "courseSwapPop 560ms ease both",
          },
          ".course-folder-tab": {
            alignItems: "center",
            background:
              "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 72%, white))",
            border: "1px solid color-mix(in oklab, var(--electric) 42%, white)",
            borderBottom: 0,
            borderRadius: "10px 10px 0 0",
            color: "var(--primary-foreground)",
            display: "flex",
            fontSize: "14px",
            fontWeight: 800,
            height: "42px",
            padding: "0 16px",
            position: "relative",
            width: "44%",
          },
          ".course-folder-tab::after": {
            borderBottom:
              "42px solid color-mix(in oklab, var(--primary) 72%, white)",
            borderRight: "34px solid transparent",
            content: '""',
            position: "absolute",
            right: "-34px",
            top: "-1px",
          },
          ".course-folder-body": {
            background:
              "linear-gradient(145deg, var(--card), color-mix(in oklab, var(--primary) 9%, var(--card)) 48%, var(--card))",
            border:
              "1px solid color-mix(in oklab, var(--electric) 24%, transparent)",
            borderRadius: "0 14px 14px 14px",
            boxShadow: "none",
            height: "calc(100% - 41px)",
            overflow: "hidden",
            position: "relative",
            transition:
              "box-shadow 520ms ease, border-color 520ms ease, filter 520ms ease",
          },
          ".course-folder:hover .course-folder-body": {
            borderColor: "color-mix(in oklab, var(--electric) 70%, white)",
            boxShadow: "none",
            filter: "brightness(1.05)",
          },
          ".course-folder-body::before": {
            background: "var(--folder-gradient)",
            content: '""',
            filter: "blur(44px)",
            height: "52%",
            opacity: 0.46,
            position: "absolute",
            right: "-8%",
            top: "26%",
            transform: "rotate(-12deg)",
            width: "62%",
          },
          ".course-folder-body::after": {
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 24%, transparent), transparent)",
            content: '""',
            height: "1px",
            left: 0,
            opacity: 0.7,
            position: "absolute",
            right: 0,
            top: "42%",
          },
          ".course-card-orbit": {
            border:
              "16px solid color-mix(in oklab, var(--electric) 24%, transparent)",
            borderRadius: "50%",
            filter: "blur(2px)",
            height: "clamp(160px, 14vw, 210px)",
            position: "absolute",
            right: "-58px",
            top: "clamp(80px, 10vw, 120px)",
            transform: "rotate(-18deg)",
            width: "clamp(300px, 27vw, 430px)",
          },
          ".course-folder-icon-ring": {
            alignItems: "center",
            background: "transparent",
            border: 0,
            borderRadius: "999px",
            boxShadow: "none",
            color: "var(--primary)",
            display: "flex",
            height: "clamp(112px, 12vw, 180px)",
            justifyContent: "center",
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(112px, 12vw, 180px)",
            zIndex: 2,
          },
          ".course-folder-icon-ring .course-folder-main-icon": {
            color: "var(--primary)",
            filter: "none",
            fontSize: "clamp(78px, 7.8vw, 122px) !important",
            height: "1em",
            width: "1em",
          },
          ".course-folder-main-image": {
            display: "block",
            height: "108%",
            objectFit: "contain",
            pointerEvents: "none",
            width: "108%",
          },
          ".course-folder-active .course-folder-main-icon": {
            color: "var(--primary-foreground)",
          },
          ".course-folder-copy": {
            bottom: "32px",
            left: "32px",
            position: "absolute",
            width: "min(58%, 340px)",
          },
          ".course-opened": {
            background:
              "radial-gradient(circle at 50% 46%, color-mix(in oklab, var(--electric) 14%, transparent), transparent 28%), radial-gradient(circle at 80% 12%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 24%), var(--background)",
          },
          ".course-menu-view": {
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 32%), linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--primary) 7%, var(--background)) 100%)",
            color: "var(--foreground)",
            minHeight: "100vh",
            overflow: "hidden",
            paddingTop: "clamp(118px, 13vh, 150px)",
            position: "relative",
            width: "100%",
          },
          ".course-menu-view::before": {
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            content: '""',
            inset: 0,
            opacity: 0.16,
            pointerEvents: "none",
            position: "absolute",
          },
          ".course-menu-close": {
            background: "transparent !important",
            border: "0 !important",
            borderRadius: "999px !important",
            color: "var(--foreground) !important",
            fontWeight: "800 !important",
            left: "clamp(20px, 4vw, 72px)",
            position: "absolute !important",
            textTransform: "none !important",
            top: "clamp(112px, 12vh, 146px)",
            zIndex: 20,
          },
          ".course-menu-title": {
            left: "clamp(28px, 7vw, 120px)",
            position: "absolute",
            top: "50%",
            transition:
              "opacity 240ms ease, filter 240ms ease, transform 240ms ease",
            transform: "translateY(-50%)",
            width: "min(34vw, 390px)",
            zIndex: 16,
          },
          ".course-menu-copy": {
            color: "var(--muted-foreground)",
            fontSize: "clamp(17px, 1.7vw, 24px)",
            fontWeight: 800,
            lineHeight: 1.35,
            position: "absolute",
            right: "clamp(28px, 9vw, 150px)",
            top: "50%",
            transition:
              "opacity 240ms ease, filter 240ms ease, transform 240ms ease",
            transform: "translateY(-50%)",
            width: "min(28vw, 330px)",
            zIndex: 16,
          },
          ".course-menu-drag": {
            alignItems: "center",
            background:
              "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.92), color-mix(in oklab, var(--glow) 72%, var(--electric)) 44%, color-mix(in oklab, var(--primary) 84%, var(--navy)))",
            border: "1px solid rgba(255,255,255,0.56)",
            borderRadius: "999px",
            boxShadow:
              "0 34px 95px rgba(0,0,0,0.6), inset 0 0 32px rgba(255,255,255,0.22)",
            color: "var(--primary-foreground)",
            cursor: "grab",
            display: "flex",
            height: "clamp(240px, 28vw, 390px)",
            justifyContent: "center",
            left: "50%",
            outline: "none",
            padding: 0,
            position: "absolute",
            top: "50%",
            touchAction: "none",
            transition:
              "transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms ease, opacity 260ms ease",
            transform: "translate(-50%, -50%)",
            userSelect: "none",
            width: "clamp(240px, 28vw, 390px)",
            zIndex: 8,
          },
          ".course-menu-drag:active": {
            cursor: "grabbing",
          },
          ".course-menu-zoomed .course-menu-title": {
            filter: "blur(0.8px)",
            opacity: 0.42,
            transform: "translateY(-50%) translateX(-18px)",
          },
          ".course-menu-zoomed .course-menu-copy": {
            filter: "blur(0.8px)",
            opacity: 0.44,
            transform: "translateY(-50%) translateX(18px)",
          },
          ".course-menu-zoomed .course-menu-drag": {
            boxShadow:
              "0 22px 70px rgba(0,0,0,0.45), inset 0 0 28px rgba(255,255,255,0.2)",
            transform: "translate(-50%, -50%) scale(0.68)",
          },
          ".course-menu-center-icon": {
            color: "var(--primary-foreground)",
            filter: "none",
            fontSize: "clamp(152px, 17vw, 250px) !important",
          },
          ".course-menu-arrow": {
            alignItems: "center",
            background: "var(--primary)",
            border: "4px solid var(--background)",
            borderRadius: "999px",
            bottom: "-18px",
            color: "#fff",
            fontSize: "58px !important",
            height: "64px",
            left: "50%",
            padding: "13px",
            position: "absolute",
            transform: "translateX(-50%) rotate(-42deg)",
            width: "64px",
          },
          ".course-menu-orbit": {
            inset: 0,
            pointerEvents: "none",
            position: "absolute",
            zIndex: 3,
          },
          ".course-menu-node": {
            alignItems: "center",
            background:
              "radial-gradient(circle at 36% 30%, rgba(255,255,255,0.94), rgba(211,230,255,0.86) 38%, color-mix(in oklab, var(--electric) 54%, var(--navy)))",
            border: "1px solid rgba(255,255,255,0.44)",
            borderRadius: "999px",
            boxShadow:
              "0 22px 70px rgba(0,0,0,0.42), inset 0 0 28px rgba(255,255,255,0.2)",
            color: "var(--primary)",
            display: "flex",
            height: "clamp(92px, 11vw, 160px)",
            justifyContent: "center",
            left: "50%",
            position: "absolute",
            top: "50%",
            transition:
              "filter 220ms ease, opacity 220ms ease, transform 280ms cubic-bezier(.2,.8,.2,1)",
            width: "clamp(92px, 11vw, 160px)",
          },
          ".course-menu-focused .course-menu-node": {
            filter: "blur(5px) grayscale(0.35)",
          },
          ".course-menu-focused .course-menu-node-active": {
            filter: "blur(0) grayscale(0)",
            opacity: "1 !important",
          },
          ".course-menu-node-active": {
            color: "var(--primary-foreground)",
          },
          ".course-menu-zoomed .course-menu-node": {
            filter: "blur(0) grayscale(0)",
            opacity: "0.78 !important",
          },
          ".course-menu-node svg": {
            fontSize: "clamp(64px, 7vw, 118px) !important",
          },
          "@media (max-width: 899px)": {
            ".course-folder-tab": {
              width: "58%",
            },
            ".course-card-orbit": {
              height: "210px",
              right: "-124px",
              width: "360px",
            },
            ".course-folder-icon-ring": {
              opacity: 0.82,
              right: "18px",
              height: "clamp(132px, 34vw, 170px)",
              width: "clamp(132px, 34vw, 170px)",
            },
            ".course-folder-icon-ring .course-folder-main-icon": {
              fontSize: "clamp(106px, 28vw, 138px) !important",
            },
            ".course-folder-copy": {
              left: "24px",
              width: "72%",
            },
            ".course-menu-title": {
              left: "24px",
              top: "24%",
              transform: "none",
              width: "calc(100% - 48px)",
            },
            ".course-menu-zoomed .course-menu-title": {
              transform: "translateY(-8px)",
            },
            ".course-menu-copy": {
              bottom: "34px",
              left: "24px",
              right: "auto",
              top: "auto",
              transform: "none",
              width: "calc(100% - 48px)",
            },
            ".course-menu-zoomed .course-menu-copy": {
              transform: "translateY(8px)",
            },
            ".course-menu-drag": {
              height: "clamp(190px, 54vw, 260px)",
              width: "clamp(190px, 54vw, 260px)",
            },
            ".course-menu-center-icon": {
              fontSize: "clamp(118px, 34vw, 168px) !important",
            },
            ".course-menu-node": {
              height: "clamp(70px, 22vw, 110px)",
              width: "clamp(70px, 22vw, 110px)",
            },
            ".course-menu-node svg": {
              fontSize: "clamp(48px, 16vw, 78px) !important",
            },
          },
        }}
      />
      <CursorEffect />
      <Navbar />

      <Box
        component="main"
        className={opened ? "courses-page course-opened" : "courses-page"}
        sx={{
          color: "var(--foreground)",
          minHeight: "100vh",
          overflow: "hidden",
          pt: opened ? 0 : { xs: 13, md: 15 },
        }}
      >
        {opened ? (
          <CourseInfiniteMenu
            course={opened}
            onClose={() => setOpenedCourse(null)}
          />
        ) : (
          <Container
            maxWidth={false}
            sx={{
              maxWidth: "none",
              pb: 0,
              px: 0,
              width: "100%",
              minHeight: { md: "calc(100vh - 120px)" },
            }}
          >
            <Box
              sx={{
                border:
                  "1px solid color-mix(in oklab, var(--electric) 20%, transparent)",
                borderTop: 0,
                borderLeft: 0,
                borderRadius: 0,
                borderRight: 0,
                display: "grid",
                gap: { xs: 5, md: 10 },
                gridTemplateColumns: { xs: "1fr", md: "0.82fr 1.18fr" },
                minHeight: { xs: "auto", md: "calc(100vh - 120px)" },
                overflow: "visible",
                px: { xs: 3, sm: 5, md: 8, lg: 11 },
                py: { xs: 4, md: 7 },
                position: "relative",
                bgcolor: "transparent",
                boxShadow: "none",
              }}
            >
              <Box
                sx={{
                  background: "transparent",
                  inset: 0,
                  opacity: 0,
                  pointerEvents: "none",
                  position: "absolute",
                }}
              />

              <Stack
                spacing={3}
                sx={{
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Courses"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    border:
                      "1px solid color-mix(in oklab, var(--electric) 22%, transparent)",
                    color: "var(--primary)",
                    fontWeight: 800,
                    width: "fit-content",
                  }}
                />
                <Typography
                  component="h1"
                  sx={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: { xs: 42, sm: 52, md: 60 },
                    fontWeight: 800,
                    letterSpacing: 0,
                    lineHeight: 1,
                    maxWidth: 520,
                  }}
                >
                  Course folders that swap into real skills
                </Typography>
                <Typography
                  sx={{
                    color: "var(--muted-foreground)",
                    fontSize: { xs: 16, md: 19 },
                    lineHeight: 1.6,
                    maxWidth: 520,
                  }}
                >
                  Explore AI, Python, GenAI, computer vision, and analytics
                  tracks with mentor-led practice and portfolio outcomes.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.4}
                  sx={{ pt: 1 }}
                >
                  <Button
                    href="/apply-online"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      bgcolor: "var(--primary)",
                      borderRadius: "999px",
                      color: "#fff",
                      fontWeight: 800,
                      px: 3,
                      py: 1.35,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor:
                          "color-mix(in oklab, var(--primary) 86%, white)",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button
                    onClick={sendFrontFolderBack}
                    sx={{
                      border:
                        "1px solid color-mix(in oklab, var(--electric) 22%, transparent)",
                      borderRadius: "999px",
                      color: "var(--foreground)",
                      fontWeight: 800,
                      px: 3,
                      py: 1.35,
                      textTransform: "none",
                    }}
                  >
                    Next Folder
                  </Button>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gap: 1.2,
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    maxWidth: 520,
                    pt: 2,
                  }}
                >
                  {["Live classes", "Projects", "Recordings"].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        bgcolor:
                          "color-mix(in oklab, var(--primary) 6%, var(--card))",
                        border:
                          "1px solid color-mix(in oklab, var(--electric) 14%, transparent)",
                        borderRadius: "16px",
                        color: "var(--muted-foreground)",
                        fontSize: { xs: 12, md: 14 },
                        fontWeight: 800,
                        px: 1.5,
                        py: 1.4,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Stack>

              <Stack
                spacing={2}
                sx={{
                  minWidth: 0,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <CourseFolderStack
                  activeCourse={activeCourse}
                  onSelect={setActiveCourse}
                  onSendBack={sendFrontFolderBack}
                  onOpen={setOpenedCourse}
                />

                <Box
                  sx={{
                    bgcolor: "var(--card)",
                    border:
                      "1px solid color-mix(in oklab, var(--electric) 16%, transparent)",
                    borderRadius: "20px",
                    p: { xs: 2, md: 2.4 },
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--foreground)",
                      fontFamily: "var(--font-display)",
                      fontSize: { xs: 24, md: 28 },
                      fontWeight: 800,
                      letterSpacing: 0,
                    }}
                  >
                    {active.fullName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: 15,
                      lineHeight: 1.55,
                      mt: 1,
                    }}
                  >
                    {active.copy}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}
