import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  GlobalStyles,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import courseAiImage from "@/assets/course-ai.svg";
import courseGenAiImage from "@/assets/course-genai.svg";
import courseImage from "@/assets/courseimg.webp";
import coursePythonImage from "@/assets/course-python.svg";
import courseVisionImage from "@/assets/course-vision.svg";
import { toast } from "sonner";
import { auth } from "@/firebase";
import { addToCart, formatPrice } from "@/lib/cart";

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
  {
    name: "AI Agents",
    category: "Automation",
    fullName: "AI Agents & Workflow Automation",
    tag: "Coming soon",
    icon: RocketLaunchRoundedIcon,
    image: courseGenAiImage,
    duration: "Coming Soon",
    mode: "Live Online",
    level: "Advanced",
    comingSoon: true,
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--navy) 52%, var(--primary)), color-mix(in oklab, var(--primary) 70%, white))",
    copy: "Tool-using agents, workflow design, automation patterns, and production-minded AI systems.",
    highlights: ["Agent design", "Tool calling", "Workflow automation"],
    files: [
      {
        title: "Agent Basics",
        copy: "Understand planning, tools, memory, and safe execution patterns.",
        icon: SmartToyRoundedIcon,
      },
      {
        title: "Tool Workflows",
        copy: "Connect APIs, data, and assistant actions into guided flows.",
        icon: DataObjectRoundedIcon,
      },
      {
        title: "Automation Lab",
        copy: "Build repeatable automations for real classroom and business tasks.",
        icon: RocketLaunchRoundedIcon,
      },
      {
        title: "Evaluation",
        copy: "Check reliability, failures, and output quality before release.",
        icon: AssignmentTurnedInRoundedIcon,
      },
      {
        title: "Deployment Prep",
        copy: "Package an agent workflow with clear controls and documentation.",
        icon: FolderOpenRoundedIcon,
      },
    ],
  },
];

const courseThumbnailImages = [courseImage];

const courseCommerce = {
  "AI Foundation": {
    hours: 48,
    price: 24999,
    originalPrice: 32999,
    rating: 4.9,
    reviews: 184,
  },
  "Python AI": {
    hours: 36,
    price: 18999,
    originalPrice: 24999,
    rating: 4.8,
    reviews: 136,
  },
  GenAI: {
    hours: 30,
    price: 21999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 112,
  },
  Vision: {
    hours: 24,
    price: 19999,
    originalPrice: 26999,
    rating: 4.7,
    reviews: 89,
  },
  "Data Stack": {
    hours: 42,
    price: 22999,
    originalPrice: 30999,
    rating: 4.8,
    reviews: 105,
  },
};

const courseAuthors = [
  "by Knora Faculty",
  "by Rahul Mehra",
  "by Aisha Khan",
  "by Arjun Patel",
];

const courseFeatures = [
  {
    title: "Live Classes",
    copy: "Interactive sessions with expert mentors",
    icon: VideocamRoundedIcon,
  },
  {
    title: "Projects",
    copy: "Build real-world projects and strengthen skills",
    icon: FolderRoundedIcon,
  },
  {
    title: "Recordings",
    copy: "Watch anytime, anywhere at your convenience",
    icon: VideocamRoundedIcon,
  },
];

function slugifyCourseName(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getCoursePath(course) {
  return `/course/${slugifyCourseName(course.name)}`;
}

function getCourseDetailsPath(course) {
  return `${getCoursePath(course)}/overview`;
}

function getCourseLessonPath(course, lesson) {
  return `${getCoursePath(course)}/${slugifyCourseName(lesson.title)}`;
}

function getSelectedCourseFromPath() {
  const [, section, rawSlug] = window.location.pathname.split("/");
  if (section !== "course" || !rawSlug) return null;

  const selectedSlug = decodeURIComponent(rawSlug).toLowerCase();
  return (
    courses.find((course) => slugifyCourseName(course.name) === selectedSlug) ??
    null
  );
}

function navigateToCourseFolder(course) {
  window.dispatchEvent(
    new CustomEvent("knora:navigate", {
      detail: { path: getCoursePath(course) },
    }),
  );
}

function navigateToCourseDetails(course, lesson) {
  window.dispatchEvent(
    new CustomEvent("knora:navigate", {
      detail: {
        path: lesson
          ? getCourseLessonPath(course, lesson)
          : getCourseDetailsPath(course),
      },
    }),
  );
}

function CourseCatalog({ folderCourse }) {
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("All courses");
  const [addingId, setAddingId] = useState(null);
  const commerce = courseCommerce[folderCourse.name];
  const folderCourses = useMemo(
    () =>
      getCourseLessons(folderCourse).map((lesson, index) => ({
        ...lesson,
        hours: 6 + index * 2,
        rating: Math.max(4.6, commerce.rating - (index % 3) * 0.1),
        reviews: Math.max(28, commerce.reviews - index * 17),
      })),
    [commerce.rating, commerce.reviews, folderCourse],
  );
  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return folderCourses.filter((course) => {
      const matchesAvailability =
        availability === "All courses" ||
        (availability === "Available now" && !course.locked) ||
        (availability === "Coming soon" && course.locked);
      const matchesQuery =
        !normalizedQuery ||
        [course.title, course.copy, course.author, course.badge]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesAvailability && matchesQuery;
    });
  }, [availability, folderCourses, query]);

  const addCourseToCart = async (event, lesson) => {
    event.stopPropagation();
    if (lesson.locked) return;
    if (!auth?.currentUser) {
      sessionStorage.setItem("knora-post-login-path", window.location.pathname);
      toast.info("Please log in to add this course to your cart.");
      window.dispatchEvent(
        new CustomEvent("knora:navigate", { detail: { path: "/login" } }),
      );
      return;
    }

    setAddingId(lesson.title);
    try {
      await addToCart({
        id: slugifyCourseName(folderCourse.name),
        name: folderCourse.fullName,
        category: folderCourse.category,
        duration: folderCourse.duration,
        hours: commerce.hours,
        mode: folderCourse.mode,
        level: folderCourse.level,
        image: courseImage,
        price: commerce.price,
        originalPrice: commerce.originalPrice,
        rating: commerce.rating,
      });
      toast.success(`${folderCourse.name} added to your cart.`);
    } catch {
      toast.warning(
        "Course added on this device; cloud cart sync is unavailable.",
      );
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Box className="catalog-section" id="course-catalog">
      <Box className="catalog-heading">
        <Box>
          <Button
            href="/courses"
            startIcon={<CloseRoundedIcon />}
            className="catalog-folder-back"
          >
            All folders
          </Button>
          <Typography component="h1">
            {folderCourse ? folderCourse.fullName : "Explore all courses"}
          </Typography>
          <Typography>
            Search and compare courses in this folder by format, learning time,
            rating, and price.
          </Typography>
        </Box>
        <Stack
          className="catalog-tools"
          direction={{ xs: "column", sm: "row" }}
        >
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses or skills"
            slotProps={{
              htmlInput: { "aria-label": "Search courses" },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            slotProps={{
              htmlInput: { "aria-label": "Filter courses by availability" },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <TuneRoundedIcon />
                  </InputAdornment>
                ),
              },
            }}
          >
            {["All courses", "Available now", "Coming soon"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Box>

      <Box className="catalog-list">
        {visibleCourses.map((course) => {
          return (
            <Box
              component="article"
              className={`catalog-card ${course.locked ? "catalog-card-locked" : ""}`}
              key={course.title}
              role={course.locked ? undefined : "link"}
              tabIndex={course.locked ? -1 : 0}
              onClick={() => {
                if (!course.locked)
                  navigateToCourseDetails(folderCourse, course);
              }}
              onKeyDown={(event) => {
                if (
                  !course.locked &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  navigateToCourseDetails(folderCourse, course);
                }
              }}
            >
              <Box className="catalog-card-media">
                <Box component="img" src={courseImage} alt="" />
                <Chip label={course.badge} />
              </Box>
              <Box className="catalog-card-content">
                <Typography className="catalog-card-category">
                  {folderCourse.category} · {course.lessons}
                </Typography>
                <Typography component="h3">{course.title}</Typography>
                <Typography className="catalog-card-description">
                  {course.copy}
                </Typography>
                <Stack className="catalog-card-meta" direction="row">
                  <span>
                    <AccessTimeRoundedIcon /> {course.hours} hours
                  </span>
                  <span>{folderCourse.mode}</span>
                  <span className="catalog-rating">
                    <StarRoundedIcon /> {course.rating.toFixed(1)}
                    <small>({course.reviews})</small>
                  </span>
                </Stack>
                <Stack className="catalog-card-footer" direction="row">
                  <Box className="catalog-price">
                    <strong>{formatPrice(commerce.price)}</strong>
                    <del>{formatPrice(commerce.originalPrice)}</del>
                  </Box>
                  <Button
                    onClick={(event) => addCourseToCart(event, course)}
                    disabled={course.locked || addingId === course.title}
                    startIcon={<ShoppingCartRoundedIcon />}
                  >
                    {course.locked
                      ? "Coming soon"
                      : addingId === course.title
                        ? "Adding..."
                        : "Add to cart"}
                  </Button>
                </Stack>
              </Box>
            </Box>
          );
        })}
        {!visibleCourses.length && (
          <Box className="catalog-empty">
            <SearchRoundedIcon />
            <Typography component="h3">No matching courses</Typography>
            <Typography>Try another keyword or category.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function getCourseLessons(course) {
  const baseLessons = course.files.map((file, index) => ({
    ...file,
    author: courseAuthors[index % courseAuthors.length],
    badge: index < 3 ? "New" : course.tag,
    duration: index % 2 === 0 ? "Early access" : course.duration,
    image: courseThumbnailImages[index % courseThumbnailImages.length],
    lessons: `${index + 4} lessons`,
  }));

  return [
    ...baseLessons,
    {
      title: `${course.name} Build Sprint`,
      copy: `Turn ${course.highlights[0].toLowerCase()} into a guided portfolio workflow.`,
      icon: RocketLaunchRoundedIcon,
      author: "by Knora Faculty",
      badge: "New",
      duration: course.duration,
      image: courseImage,
      lessons: "6 lessons",
    },
    {
      title: `${course.name} Project Review`,
      copy: `Review common mistakes, stronger decisions, and clean delivery habits.`,
      icon: AssignmentTurnedInRoundedIcon,
      author: "by Mentor Team",
      badge: course.level,
      duration: "1 hour",
      image: courseThumbnailImages[2],
      lessons: "5 lessons",
    },
    {
      title: `${course.name} Capstone Lab`,
      copy: `Build, explain, and package a final ${course.category.toLowerCase()} project.`,
      icon: VisibilityRoundedIcon,
      author: "by Knora Academy",
      badge: "New",
      duration: "3.8 hours",
      image: courseThumbnailImages[3],
      lessons: "8 lessons",
    },
  ]
    .slice(0, 6)
    .map((lesson, index) => {
      if (index < 4) return lesson;

      return {
        ...lesson,
        badge: "Coming soon",
        duration: "Coming soon",
        locked: true,
      };
    });
}

function CourseFolderStack({ activeCourse, onSelect, onSendBack, onOpen }) {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const isCompact =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 620px)").matches;
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
        height: { xs: 340, sm: 380, md: "clamp(330px, 31vw, 430px)" },
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
        const horizontalStep = isCompact ? 18 : 74;
        const verticalStep = isCompact ? -13 : -36;
        const depthStep = isCompact ? -18 : -34;
        const baseTransform =
          offset === 0
            ? `translate3d(-50%, ${hoverLift}px, 42px) rotateX(0deg) rotateY(0deg) scale(${
                isHovered ? 1.012 : 1
              })`
            : `translate3d(calc(-50% + ${offset * horizontalStep}px), ${
                offset * verticalStep + hoverLift
              }px, ${offset * depthStep}px) rotateX(${offset * 1.4}deg) rotateY(${
                -offset * (isCompact ? 2 : 5)
              }deg) scale(${1 - offset * (isCompact ? 0.025 : 0.045) + (isHovered ? 0.008 : 0)})`;
        const dragTransform =
          isActive && drag.active
            ? `translate3d(calc(-50% + ${drag.x}px), ${drag.y}px, 42px) rotateY(${
                drag.x * 0.035
              }deg) rotateZ(${drag.x * 0.018}deg) scale(0.98)`
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
              "--folder-delay": `${index * 0.48}s`,
              "--folder-gradient": course.color,
              left: "50%",
              opacity: offset > 3 ? 0 : 1,
              top: {
                xs: `${42 - offset * 8}px`,
                md: `${112 - offset * 12}px`,
              },
              transform: dragTransform,
              zIndex: courses.length - offset,
            }}
          >
            <Box className="course-folder-float">
              <Box className="course-folder-tab">
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                  <span>{course.category}</span>
                </Stack>
              </Box>
              <Box className="course-folder-body">
                <Box className="course-card-orbit" />
                {!isActive && (
                  <Box className="course-folder-side-tab">
                    <ArrowForwardRoundedIcon />
                  </Box>
                )}
                <Box className="course-folder-icon-ring">
                  <Icon className="course-folder-main-icon" />
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
                  <Typography className="course-folder-name">
                    {course.fullName}
                  </Typography>
                  <Box className="course-folder-rule" />
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
                  <Typography className="course-folder-description">
                    {course.copy}
                  </Typography>
                </Stack>
                <Box className="course-folder-open-icon">
                  {course.comingSoon ? (
                    <LockRoundedIcon />
                  ) : (
                    <ArrowForwardRoundedIcon />
                  )}
                </Box>
                {course.comingSoon && (
                  <Box className="course-folder-lock-badge">
                    <LockRoundedIcon />
                    <span>Coming soon</span>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function CourseLessonList({ course }) {
  const lessons = getCourseLessons(course);
  const moveCardGlow = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glow-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <Box className="course-list-view">
      <Stack
        className="course-list-header"
        direction={{ xs: "column", md: "row" }}
        spacing={2}
      >
        <Stack spacing={1}>
          <Chip
            label={course.category}
            className="course-list-chip"
            sx={{ width: "fit-content" }}
          />
          <Typography component="h1" className="course-list-title">
            {course.fullName}
          </Typography>
        </Stack>
        <Button
          href="/courses"
          startIcon={<CloseRoundedIcon />}
          className="course-list-back"
        >
          Folders
        </Button>
      </Stack>

      <Box className="course-list-grid">
        {lessons.map((lesson, index) => {
          const isLocked = lesson.locked;

          return (
            <Box
              key={`${course.name}-${lesson.title}`}
              href={isLocked ? undefined : getCourseLessonPath(course, lesson)}
              component={isLocked ? "div" : "a"}
              aria-disabled={isLocked ? "true" : undefined}
              className={`course-list-card ${
                isLocked ? "course-list-card-locked" : ""
              }`}
              onPointerMove={moveCardGlow}
              sx={{ "--card-index": String(index + 1).padStart(2, "0") }}
            >
              <Box className="course-list-card-top">
                <Stack className="course-list-number" spacing={0.4}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{lesson.badge}</b>
                </Stack>
              </Box>

              <Typography component="h2" className="course-list-card-title">
                {lesson.title}
              </Typography>
              <Typography className="course-list-card-copy">
                {lesson.copy}
              </Typography>

              <Stack className="course-list-meta" direction="row" spacing={1.1}>
                <span>
                  <MenuBookRoundedIcon />
                  {lesson.lessons}
                </span>
                <span>
                  <AccessTimeRoundedIcon />
                  {lesson.duration}
                </span>
                <span>
                  <i />
                  {lesson.author}
                </span>
              </Stack>

              <Box className="course-list-thumb">
                <Box component="img" src={lesson.image} alt="" />
              </Box>
              {isLocked && (
                <Box
                  className="course-list-lock-center"
                  aria-label="Coming soon"
                >
                  <LockRoundedIcon />
                  <span>Coming soon</span>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function Courses() {
  const [activeCourse, setActiveCourse] = useState(0);
  const opened = getSelectedCourseFromPath();

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
          "@keyframes courseFolderJump": {
            "0%, 100%": {
              transform: "translateY(0)",
            },
            "18%": {
              transform: "translateY(-18px)",
            },
            "36%": {
              transform: "translateY(0)",
            },
          },
          ".courses-page": {
            background:
              "radial-gradient(circle at 63% 40%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 34%), var(--background)",
          },
          ".dark .courses-page": {
            background:
              "radial-gradient(circle at 66% 38%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 34%), var(--background)",
          },
          ".courses-home-shell": {
            border: "0 !important",
            minHeight: "calc(100vh - 104px)",
          },
          ".courses-hero-title.MuiTypography-root": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 5vw, 82px)",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 0.98,
            maxWidth: "620px",
          },
          ".dark .courses-hero-title.MuiTypography-root": {
            color: "var(--foreground)",
          },
          ".courses-hero-title span": {
            color: "var(--primary)",
            display: "inline-block",
            position: "relative",
          },
          ".courses-hero-title span::after": {
            background: "var(--primary)",
            borderRadius: "999px",
            bottom: "-8px",
            content: '""',
            height: "5px",
            left: "4px",
            position: "absolute",
            transform: "rotate(-3deg)",
            width: "92%",
          },
          ".courses-hero-copy.MuiTypography-root": {
            color: "var(--muted-foreground)",
            fontSize: "clamp(16px, 1.25vw, 20px)",
            fontWeight: 650,
            lineHeight: 1.55,
            maxWidth: "560px",
          },
          ".dark .courses-hero-copy.MuiTypography-root": {
            color: "var(--muted-foreground)",
          },
          ".course-stack-stage::before": {
            animation: "courseGlow 4.8s ease-in-out infinite",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent), transparent 68%)",
            content: '""',
            filter: "blur(34px)",
            inset: "28% 0 -6% 0",
            position: "absolute",
          },
          ".course-stack-stage": {
            perspective: "1400px",
            transformStyle: "preserve-3d",
          },
          ".course-folder": {
            background: "transparent",
            border: 0,
            color: "inherit",
            cursor: "pointer",
            filter:
              "drop-shadow(0 30px 28px color-mix(in oklab, var(--primary) 12%, transparent)) drop-shadow(0 18px 38px rgba(0,0,0,0.16))",
            height: "clamp(230px, 22vw, 318px)",
            maxWidth: "clamp(410px, 41vw, 590px)",
            minHeight: "230px",
            outline: "none",
            padding: 0,
            position: "absolute",
            textAlign: "left",
            touchAction: "none",
            transition:
              "transform 920ms cubic-bezier(.16,1,.3,1), top 920ms cubic-bezier(.16,1,.3,1), left 920ms cubic-bezier(.16,1,.3,1), opacity 520ms ease",
            userSelect: "none",
            willChange: "transform, top, left, opacity",
            width: "min(88vw, clamp(410px, 41vw, 590px))",
          },
          ".dark .course-folder": {
            filter:
              "drop-shadow(0 28px 30px color-mix(in oklab, var(--primary) 18%, transparent)) drop-shadow(0 24px 44px rgba(0,0,0,0.44))",
          },
          ".course-folder::before": {
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--foreground) 10%, transparent), transparent)",
            borderRadius: "18px",
            bottom: "-12px",
            content: '""',
            height: "28px",
            left: "8%",
            opacity: 0.3,
            position: "absolute",
            right: "8%",
            transform: "rotateX(72deg)",
            transformOrigin: "top",
            zIndex: -1,
          },
          ".course-folder-float": {
            animation:
              "courseFolderJump 5.8s cubic-bezier(.2,.78,.18,1) infinite",
            animationDelay: "var(--folder-delay)",
            height: "100%",
            transform: "translateY(0)",
            willChange: "transform",
          },
          ".course-folder:focus-visible .course-folder-body": {
            outline:
              "3px solid color-mix(in oklab, var(--electric) 52%, white)",
            outlineOffset: 3,
          },
          ".course-folder-active": {
            animation: "courseSwapPop 560ms ease both",
          },
          ".course-folder-active .course-folder-body": {
            transform: "translateZ(22px)",
          },
          ".course-folder-tab": {
            alignItems: "center",
            background:
              "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 72%, white))",
            border:
              "1px solid color-mix(in oklab, var(--primary) 28%, transparent)",
            borderBottom: 0,
            borderRadius: "14px 14px 0 0",
            color: "var(--primary-foreground)",
            display: "flex",
            fontSize: "clamp(13px, 1vw, 16px)",
            fontWeight: 900,
            height: "clamp(44px, 3.8vw, 56px)",
            padding: "0 clamp(16px, 1.6vw, 24px)",
            position: "relative",
            width: "54%",
            zIndex: 5,
          },
          ".course-folder-tab::after": {
            borderBottom:
              "clamp(44px, 3.8vw, 56px) solid color-mix(in oklab, var(--primary) 72%, white)",
            borderRight: "36px solid transparent",
            content: '""',
            position: "absolute",
            right: "-36px",
            top: "-1px",
          },
          ".course-folder-body": {
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--card) 96%, white), color-mix(in oklab, var(--primary) 8%, var(--card)))",
            border:
              "1px solid color-mix(in oklab, var(--primary) 16%, transparent)",
            borderRadius: "0 18px 18px 18px",
            height: "calc(100% - clamp(43px, 3.8vw, 55px))",
            overflow: "hidden",
            position: "relative",
            transition:
              "transform 520ms ease, border-color 520ms ease, filter 520ms ease",
            transformStyle: "preserve-3d",
          },
          ".course-folder-body::before, .course-folder-body::after": {
            pointerEvents: "none",
          },
          ".dark .course-folder-body": {
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--card) 94%, white), color-mix(in oklab, var(--primary) 9%, var(--background)))",
            borderColor: "color-mix(in oklab, var(--primary) 22%, transparent)",
          },
          ".course-folder:hover .course-folder-body": {
            borderColor: "color-mix(in oklab, var(--primary) 42%, transparent)",
            boxShadow: "none",
            filter: "brightness(1.02)",
          },
          ".course-folder-body::before": {
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent), transparent 58%), linear-gradient(120deg, color-mix(in oklab, var(--card) 74%, transparent), transparent 45%)",
            content: '""',
            filter: "blur(30px)",
            height: "78%",
            opacity: 0.82,
            position: "absolute",
            right: "-2%",
            top: "18%",
            width: "48%",
          },
          ".course-folder-body::after": {
            background:
              "radial-gradient(circle at 70% 26%, color-mix(in oklab, var(--primary) 12%, transparent) 0 1px, transparent 1.2px), linear-gradient(160deg, rgba(255,255,255,0.18), transparent 34%, color-mix(in oklab, var(--primary) 8%, transparent) 100%)",
            backgroundSize: "7px 7px",
            content: '""',
            inset: 0,
            opacity: 0.42,
            position: "absolute",
          },
          ".course-folder-body-edge": {
            display: "none",
          },
          ".course-card-orbit": {
            border:
              "14px solid color-mix(in oklab, var(--primary) 8%, transparent)",
            borderRadius: "50%",
            filter:
              "drop-shadow(0 0 18px color-mix(in oklab, var(--primary) 18%, transparent))",
            height: "clamp(120px, 11vw, 170px)",
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(120px, 11vw, 170px)",
          },
          ".course-folder-icon-ring": {
            alignItems: "center",
            background:
              "linear-gradient(145deg, var(--card), color-mix(in oklab, var(--primary) 8%, var(--card)))",
            border:
              "10px solid color-mix(in oklab, var(--card) 70%, transparent)",
            borderRadius: "999px",
            filter:
              "drop-shadow(0 14px 16px color-mix(in oklab, var(--primary) 16%, transparent))",
            display: "flex",
            height: "clamp(94px, 10vw, 145px)",
            justifyContent: "center",
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(94px, 10vw, 145px)",
            zIndex: 2,
          },
          ".dark .course-folder-icon-ring": {
            background:
              "linear-gradient(145deg, var(--card), color-mix(in oklab, var(--primary) 10%, var(--card)))",
            borderColor:
              "color-mix(in oklab, var(--foreground) 8%, transparent)",
          },
          ".course-folder-icon-ring .course-folder-main-icon": {
            color: "var(--primary)",
            filter: "none",
            fontSize: "clamp(52px, 5.4vw, 82px) !important",
            height: "1em",
            width: "1em",
          },
          ".course-folder-active .course-folder-main-icon": {
            color: "var(--primary)",
          },
          ".course-folder-copy": {
            left: "clamp(24px, 3vw, 42px)",
            position: "absolute",
            top: "50%",
            transform: "translateY(-48%)",
            width: "min(50%, 320px)",
            zIndex: 3,
          },
          ".course-folder-name.MuiTypography-root": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14px, 1vw, 18px)",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.12,
          },
          ".dark .course-folder-name.MuiTypography-root": {
            color: "var(--foreground)",
          },
          ".course-folder-rule": {
            background: "var(--primary)",
            borderRadius: "999px",
            height: "5px",
            width: "54px",
          },
          ".course-folder-description.MuiTypography-root": {
            color: "var(--muted-foreground)",
            fontSize: "clamp(12px, 0.9vw, 14px)",
            fontWeight: 650,
            lineHeight: 1.45,
          },
          ".dark .course-folder-description.MuiTypography-root": {
            color: "var(--muted-foreground)",
          },
          ".course-folder-open-icon": {
            alignItems: "center",
            background: "color-mix(in oklab, var(--card) 86%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 12%, transparent)",
            borderRadius: "999px",
            bottom: "22px",
            color: "var(--primary)",
            display: "flex",
            height: "44px",
            justifyContent: "center",
            position: "absolute",
            right: "26px",
            width: "44px",
            zIndex: 4,
          },
          ".dark .course-folder-open-icon": {
            background: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.12)",
          },
          ".course-folder-open-icon svg": {
            fontSize: "24px",
          },
          ".course-folder-lock-badge": {
            alignItems: "center",
            background: "color-mix(in oklab, var(--primary) 12%, var(--card))",
            border:
              "1px solid color-mix(in oklab, var(--primary) 18%, transparent)",
            borderRadius: "999px",
            color: "var(--primary)",
            display: "inline-flex",
            fontSize: "11px",
            fontWeight: 900,
            gap: "6px",
            left: "26px",
            letterSpacing: "0.06em",
            padding: "7px 10px",
            position: "absolute",
            textTransform: "uppercase",
            top: "26px",
            zIndex: 4,
          },
          ".course-folder-lock-badge svg": {
            fontSize: "14px",
          },
          ".dark .course-folder-lock-badge": {
            background: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.14)",
          },
          ".course-folder-side-tab": {
            alignItems: "center",
            background: "var(--primary)",
            borderRadius: "8px 0 0 8px",
            color: "var(--primary-foreground)",
            display: "flex",
            height: "46px",
            justifyContent: "center",
            position: "absolute",
            right: "-1px",
            top: "48%",
            transform: "translateY(-50%)",
            width: "22px",
            zIndex: 4,
          },
          ".course-folder-side-tab svg": {
            fontSize: "18px",
          },
          ".course-feature-grid": {
            display: "grid",
            gap: "clamp(16px, 2vw, 28px)",
            gridColumn: "1 / -1",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            marginTop: "clamp(8px, 1.5vw, 22px)",
          },
          ".course-feature-card": {
            alignItems: "center",
            background: "color-mix(in oklab, var(--card) 86%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 9%, transparent)",
            borderRadius: "18px",
            display: "grid",
            gap: "22px",
            gridTemplateColumns: "86px minmax(0, 1fr) 52px",
            minHeight: "126px",
            padding: "22px",
          },
          ".dark .course-feature-card": {
            background: "color-mix(in oklab, var(--card) 90%, transparent)",
            borderColor: "color-mix(in oklab, var(--primary) 14%, transparent)",
          },
          ".course-feature-icon": {
            alignItems: "center",
            background:
              "linear-gradient(145deg, var(--card), color-mix(in oklab, var(--primary) 8%, var(--card)))",
            borderRadius: "18px",
            color: "var(--primary)",
            display: "flex",
            height: "76px",
            justifyContent: "center",
            width: "76px",
          },
          ".dark .course-feature-icon": {
            background: "rgba(255,255,255,0.08)",
          },
          ".course-feature-icon svg": {
            fontSize: "36px",
          },
          ".course-feature-title.MuiTypography-root": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 900,
            letterSpacing: 0,
          },
          ".dark .course-feature-title.MuiTypography-root": {
            color: "var(--foreground)",
          },
          ".course-feature-copy.MuiTypography-root": {
            color: "var(--muted-foreground)",
            fontSize: "15px",
            fontWeight: 650,
            lineHeight: 1.4,
          },
          ".dark .course-feature-copy.MuiTypography-root": {
            color: "var(--muted-foreground)",
          },
          ".course-feature-arrow": {
            alignItems: "center",
            background: "color-mix(in oklab, var(--card) 82%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 10%, transparent)",
            borderRadius: "999px",
            color: "var(--foreground)",
            display: "flex",
            height: "48px",
            justifyContent: "center",
            width: "48px",
          },
          ".dark .course-feature-arrow": {
            background: "rgba(255,255,255,0.08)",
            color: "var(--foreground)",
          },
          ".catalog-section": {
            margin: 0,
            maxWidth: "none",
            minHeight: "100vh",
            padding:
              "clamp(124px, 12vw, 154px) clamp(24px, 4vw, 72px) clamp(64px, 8vw, 112px)",
            width: "100%",
          },
          ".catalog-heading": {
            alignItems: "start",
            display: "grid",
            gap: "30px clamp(32px, 5vw, 90px)",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(460px, .85fr)",
            margin: "0 auto 38px",
            maxWidth: "1600px",
            width: "100%",
          },
          ".catalog-folder-back.MuiButton-root": {
            color: "var(--primary)",
            fontSize: "13px",
            fontWeight: 700,
            marginBottom: "14px",
            padding: 0,
            textTransform: "none",
          },
          ".catalog-heading h1": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(38px, 4.5vw, 68px)",
            fontWeight: 700,
            letterSpacing: "-.02em",
            lineHeight: 1.06,
            margin: "0 0 10px",
          },
          ".catalog-heading > div > p:last-child": {
            color: "var(--muted-foreground)",
            fontSize: "15px",
          },
          ".catalog-tools": {
            alignSelf: "end",
            display: "grid !important",
            gap: "12px",
            gridTemplateColumns: "minmax(0, 1fr) 210px",
            width: "100%",
          },
          ".catalog-tools .MuiOutlinedInput-root": {
            background: "var(--card)",
            borderRadius: "14px",
            color: "var(--foreground)",
            minHeight: "54px",
          },
          ".catalog-tools .MuiOutlinedInput-notchedOutline": {
            borderColor:
              "color-mix(in oklab, var(--foreground) 13%, transparent)",
          },
          ".catalog-tools .MuiSvgIcon-root": {
            color: "var(--muted-foreground)",
          },
          ".catalog-list": {
            display: "grid",
            gap: "clamp(18px, 2vw, 28px)",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            margin: "0 auto",
            maxWidth: "1600px",
            width: "100%",
          },
          ".catalog-card": {
            background: "var(--card)",
            border:
              "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)",
            borderRadius: "20px",
            boxShadow:
              "0 16px 46px color-mix(in oklab, var(--foreground) 7%, transparent)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            minHeight: "500px",
            overflow: "hidden",
            transition:
              "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
          },
          ".catalog-card:hover, .catalog-card:focus-visible": {
            borderColor: "color-mix(in oklab, var(--primary) 44%, transparent)",
            boxShadow:
              "0 22px 58px color-mix(in oklab, var(--primary) 14%, transparent)",
            outline: "none",
            transform: "translateY(-2px)",
          },
          ".catalog-card-locked": {
            cursor: "default",
          },
          ".catalog-card-locked:hover": {
            borderColor:
              "color-mix(in oklab, var(--foreground) 10%, transparent)",
            boxShadow:
              "0 16px 46px color-mix(in oklab, var(--foreground) 7%, transparent)",
            transform: "none",
          },
          ".catalog-card-locked .catalog-card-media img": {
            filter: "grayscale(.5)",
            opacity: 0.72,
          },
          ".catalog-card-media": {
            background: "color-mix(in oklab, var(--primary) 7%, var(--card))",
            aspectRatio: "16 / 10",
            minHeight: 0,
            overflow: "hidden",
            position: "relative",
          },
          ".catalog-card-media img": {
            display: "block",
            height: "100%",
            objectFit: "cover",
            width: "100%",
          },
          ".catalog-card-media .MuiChip-root": {
            background: "rgba(255,255,255,.92)",
            bottom: "14px",
            color: "#12305e",
            fontSize: "11px",
            fontWeight: 800,
            left: "14px",
            position: "absolute",
          },
          ".catalog-card-content": {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minWidth: 0,
            padding: "22px 24px 24px",
          },
          ".catalog-card-category.MuiTypography-root": {
            color: "var(--primary)",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: ".1em",
            textTransform: "uppercase",
          },
          ".catalog-card-content h3": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 1.7vw, 27px)",
            fontWeight: 650,
            lineHeight: 1.16,
            marginTop: "5px",
          },
          ".catalog-card-description.MuiTypography-root": {
            color: "var(--muted-foreground)",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.55,
            marginTop: "8px",
          },
          ".catalog-card-meta": {
            alignItems: "center",
            color: "var(--muted-foreground)",
            flexWrap: "wrap",
            fontSize: "12px",
            gap: "8px 18px",
            marginTop: "14px",
          },
          ".catalog-card-meta span": {
            alignItems: "center",
            display: "inline-flex",
            gap: "5px",
          },
          ".catalog-card-meta svg": { fontSize: "16px" },
          ".catalog-rating": { color: "var(--foreground)" },
          ".catalog-rating svg": { color: "#f4aa16" },
          ".catalog-rating small": { color: "var(--muted-foreground)" },
          ".catalog-card-footer": {
            alignItems: "end",
            gap: "16px",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "18px",
          },
          ".catalog-price": {
            alignItems: "baseline",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          },
          ".catalog-price strong": {
            color: "var(--foreground)",
            fontSize: "21px",
            fontWeight: 750,
          },
          ".catalog-price del": {
            color: "var(--muted-foreground)",
            fontSize: "13px",
          },
          ".catalog-card-footer .MuiButton-root": {
            background: "var(--primary)",
            borderRadius: "10px",
            color: "var(--primary-foreground)",
            fontSize: "13px",
            fontWeight: 750,
            minWidth: "138px",
            padding: "10px 16px",
            textTransform: "none",
          },
          ".catalog-card-footer .MuiButton-root:hover": {
            background: "color-mix(in oklab, var(--primary) 86%, black)",
          },
          ".catalog-card-footer .MuiButton-root.Mui-disabled": {
            background:
              "color-mix(in oklab, var(--muted-foreground) 18%, var(--card))",
            color: "var(--muted-foreground)",
          },
          ".catalog-empty": {
            background: "var(--card)",
            border:
              "1px dashed color-mix(in oklab, var(--foreground) 16%, transparent)",
            borderRadius: "18px",
            color: "var(--muted-foreground)",
            gridColumn: "1 / -1",
            padding: "56px 24px",
            textAlign: "center",
          },
          ".catalog-empty > svg": { color: "var(--primary)", fontSize: "38px" },
          ".catalog-empty h3": {
            color: "var(--foreground)",
            fontSize: "20px",
            marginTop: "10px",
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
          ".course-list-view": {
            background: "var(--background)",
            color: "var(--foreground)",
            minHeight: "100vh",
            overflow: "hidden",
            padding:
              "clamp(118px, 13vh, 150px) clamp(16px, 3.4vw, 48px) clamp(36px, 5vw, 72px)",
            position: "relative",
          },
          ".dark .course-list-view": {
            background: "var(--background)",
            color: "var(--foreground)",
          },
          ".course-list-view::before": {
            display: "none",
          },
          ".dark .course-list-view::before": {
            background:
              "radial-gradient(circle at 18% 14%, color-mix(in oklab, var(--foreground) 13%, transparent) 0 1px, transparent 1.2px), radial-gradient(circle at 72% 4%, color-mix(in oklab, var(--primary) 16%, transparent) 0 1px, transparent 1.3px)",
          },
          ".course-list-view::after": {
            display: "none",
          },
          ".dark .course-list-view::after": {
            background:
              "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--foreground) 6%, transparent), transparent 35%)",
          },
          ".course-list-header": {
            alignItems: "flex-start",
            justifyContent: "space-between",
            margin: "0 auto clamp(18px, 3vw, 32px)",
            maxWidth: "1280px",
            position: "relative",
            zIndex: 2,
          },
          ".course-list-chip.MuiChip-root": {
            background: "color-mix(in oklab, var(--card) 90%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 12%, transparent)",
            borderRadius: "999px",
            color: "var(--primary)",
            fontSize: "11px",
            fontWeight: 900,
            height: "28px",
            textTransform: "uppercase",
          },
          ".dark .course-list-chip.MuiChip-root": {
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "#c9d7ff",
          },
          ".course-list-title.MuiTypography-root": {
            color: "var(--foreground)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 54px)",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1,
            maxWidth: "760px",
          },
          ".dark .course-list-title.MuiTypography-root": {
            color: "#f5f5f5",
          },
          ".course-list-back.MuiButton-root": {
            alignSelf: "center",
            background: "color-mix(in oklab, var(--card) 90%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 12%, transparent)",
            borderRadius: "999px",
            color: "var(--foreground)",
            fontWeight: "900",
            padding: "9px 16px",
            textTransform: "none",
          },
          ".course-list-back.MuiButton-root:hover": {
            background: "rgba(255,255,255,1)",
          },
          ".dark .course-list-back.MuiButton-root": {
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "#f6f6f6",
          },
          ".dark .course-list-back.MuiButton-root:hover": {
            background: "rgba(255,255,255,0.1)",
          },
          ".course-list-grid": {
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            margin: "0 auto",
            maxWidth: "1280px",
            position: "relative",
            zIndex: 2,
          },
          ".course-list-card": {
            "--glow-x": "50%",
            "--glow-y": "24%",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 94%, transparent), color-mix(in oklab, var(--primary) 6%, var(--card)))",
            border:
              "1px solid color-mix(in oklab, var(--primary) 10%, transparent)",
            borderRadius: "8px",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            minHeight: "356px",
            overflow: "hidden",
            padding: "22px 18px 16px",
            position: "relative",
            textDecoration: "none",
            transition:
              "transform 220ms ease, border-color 220ms ease, filter 220ms ease, background 220ms ease",
          },
          ".dark .course-list-card": {
            background: "#fff",
            borderColor: "rgba(0,0,0,0.1)",
            color: "#000",
          },
          ".course-list-card::before": {
            display: "none",
          },
          ".dark .course-list-card::before": {
            background:
              "radial-gradient(230px circle at var(--glow-x) var(--glow-y), color-mix(in oklab, var(--primary) 34%, transparent), transparent 58%), radial-gradient(circle at 64% 0%, rgba(255,255,255,0.1) 0 1px, transparent 1px)",
          },
          ".course-list-card:hover::before": {
            opacity: 0.92,
          },
          ".dark .course-list-card:hover::before": {
            opacity: 0.86,
          },
          ".course-list-card::after": {
            color: "var(--primary)",
            content: '"*"',
            fontFamily: "var(--font-display)",
            fontSize: "34px",
            fontWeight: 400,
            lineHeight: 1,
            opacity: 0.9,
            position: "absolute",
            right: "18px",
            top: "calc(100% - 44px)",
          },
          ".course-list-card-top": {
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "flex-end",
            minHeight: "28px",
            position: "relative",
            zIndex: 2,
          },
          ".course-list-number": {
            alignItems: "flex-end",
            color: "rgba(0,0,0,0.42)",
            fontSize: "11px",
            fontWeight: 900,
            lineHeight: 1,
            textTransform: "uppercase",
          },
          ".dark .course-list-number": {
            color: "rgba(0,0,0,0.42)",
          },
          ".course-list-number b": {
            background: "color-mix(in oklab, var(--primary) 8%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 12%, transparent)",
            borderRadius: "999px",
            color: "var(--primary)",
            display: "block",
            fontSize: "9px",
            lineHeight: 1,
            padding: "3px 6px",
          },
          ".dark .course-list-number b": {
            background: "rgba(255,255,255,0.12)",
            borderColor: "rgba(255,255,255,0.16)",
            color: "#d9d9d9",
          },
          ".course-list-card-title.MuiTypography-root": {
            color: "#000",
            fontFamily: "var(--font-display)",
            fontSize: "19px",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1.12,
            marginTop: "18px",
            minHeight: "38px",
            position: "relative",
            zIndex: 2,
          },
          ".dark .course-list-card-title.MuiTypography-root": {
            color: "#000",
          },
          ".course-list-card-copy.MuiTypography-root": {
            color: "rgba(0,0,0,0.68)",
            fontSize: "14px",
            fontWeight: 750,
            lineHeight: 1.5,
            marginTop: "8px",
            minHeight: "54px",
            position: "relative",
            zIndex: 2,
          },
          ".dark .course-list-card-copy.MuiTypography-root": {
            color: "rgba(0,0,0,0.68)",
          },
          ".course-list-meta": {
            alignItems: "center",
            color: "rgba(0,0,0,0.58)",
            flexWrap: "wrap",
            fontSize: "10.5px",
            fontWeight: 800,
            marginTop: "16px",
            minHeight: "30px",
            position: "relative",
            zIndex: 2,
          },
          ".dark .course-list-meta": {
            color: "rgba(0,0,0,0.58)",
          },
          ".course-list-meta span": {
            alignItems: "center",
            display: "inline-flex",
            gap: "4px",
            minWidth: 0,
          },
          ".course-list-meta svg": {
            color: "rgba(0,0,0,0.58)",
            fontSize: "12px",
          },
          ".dark .course-list-meta svg": {
            color: "rgba(0,0,0,0.58)",
          },
          ".course-list-meta i": {
            background:
              "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 55%, var(--foreground)))",
            borderRadius: "999px",
            display: "inline-block",
            height: "12px",
            width: "12px",
          },
          ".course-list-thumb": {
            alignItems: "center",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent), color-mix(in oklab, var(--card) 82%, transparent))",
            border:
              "1px solid color-mix(in oklab, var(--primary) 8%, transparent)",
            borderRadius: "4px",
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "center",
            marginTop: "18px",
            minHeight: "118px",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
          },
          ".dark .course-list-thumb": {
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))",
            borderColor: "rgba(255,255,255,0.07)",
          },
          ".course-list-thumb img": {
            display: "block",
            height: "100%",
            inset: 0,
            objectFit: "cover",
            filter: "none",
            opacity: 1,
            position: "absolute",
            width: "100%",
          },
          ".course-list-thumb::after": {
            display: "none",
          },
          ".dark .course-list-thumb::after": {
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.54))",
          },
          ".course-list-thumb-icon": {
            color: "color-mix(in oklab, var(--primary) 72%, transparent)",
            fontSize: "58px !important",
            position: "relative",
            zIndex: 2,
          },
          ".dark .course-list-thumb-icon": {
            color: "rgba(255,255,255,0.72)",
          },
          ".course-list-card:hover": {
            borderColor: "color-mix(in oklab, var(--primary) 42%, transparent)",
            filter:
              "drop-shadow(0 0 22px color-mix(in oklab, var(--primary) 18%, transparent))",
            transform: "translateY(-3px)",
          },
          ".course-list-card-locked": {
            cursor: "default",
            filter: "none",
          },
          ".course-list-card-locked:hover": {
            borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
            filter: "none",
            transform: "none",
          },
          ".course-list-card-locked::after": {
            content: "none",
          },
          ".course-list-card-locked > *:not(.course-list-lock-center)": {
            filter: "blur(5px)",
            opacity: 0.42,
          },
          ".course-list-lock-center": {
            alignItems: "center",
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "50%",
            boxShadow: "0 16px 44px rgba(0,0,0,0.16)",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            fontSize: "9px",
            fontWeight: 900,
            gap: "5px",
            height: "88px",
            justifyContent: "center",
            left: "50%",
            letterSpacing: "0.08em",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textTransform: "uppercase",
            width: "88px",
            zIndex: 8,
          },
          ".course-list-lock-center svg": {
            fontSize: "30px",
          },
          ".course-list-card-locked .course-list-thumb img": {
            opacity: 0.34,
          },
          ".course-list-card-locked .course-list-thumb-icon": {
            color: "color-mix(in oklab, var(--primary) 46%, transparent)",
          },
          ".dark .course-list-lock-center": {
            background: "rgba(255,255,255,0.88)",
            borderColor: "rgba(0,0,0,0.1)",
            color: "#000",
          },
          "@media (max-width: 1180px)": {
            ".catalog-list": {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            ".course-list-grid": {
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            },
          },
          "@media (max-width: 899px)": {
            ".catalog-heading": {
              alignItems: "stretch",
              gridTemplateColumns: "1fr",
            },
            ".catalog-tools": {
              gridTemplateColumns: "minmax(0, 1fr) 220px",
            },
            ".course-list-grid": {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            ".course-list-back.MuiButton-root": {
              alignSelf: "flex-start",
            },
            ".course-feature-grid": {
              gridTemplateColumns: "1fr",
            },
            ".course-feature-card": {
              gridTemplateColumns: "76px minmax(0, 1fr) 48px",
            },
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
              top: "52%",
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
          "@media (max-width: 620px)": {
            ".courses-home-shell": {
              paddingLeft: "18px !important",
              paddingRight: "18px !important",
            },
            ".course-stack-stage": {
              height: "292px !important",
              margin: "0 auto",
              maxWidth: "360px",
            },
            ".course-folder": {
              height: "260px !important",
              minHeight: "260px !important",
              width: "min(86vw, 340px) !important",
            },
            ".course-folder-tab": { height: "42px", width: "62%" },
            ".course-folder-body": { height: "calc(100% - 41px)" },
            ".course-folder-copy": { left: "20px", width: "72%" },
            ".course-folder-copy > .MuiTypography-root:first-child": {
              fontSize: "30px !important",
            },
            ".course-folder-name.MuiTypography-root": { fontSize: "15px" },
            ".course-folder-description.MuiTypography-root": {
              display: "-webkit-box",
              fontSize: "12px",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            },
            ".catalog-section": { padding: "112px 16px 72px" },
            ".catalog-heading": { marginBottom: "24px" },
            ".catalog-heading h1": { fontSize: "clamp(34px, 10vw, 46px)" },
            ".catalog-tools": {
              gridTemplateColumns: "1fr",
              width: "100%",
            },
            ".catalog-list": { gridTemplateColumns: "1fr" },
            ".catalog-card": {
              borderRadius: "16px",
              flexDirection: "row",
              minHeight: "204px",
            },
            ".catalog-card-media": {
              aspectRatio: "auto",
              flex: "0 0 112px",
              minHeight: "204px",
              width: "112px",
            },
            ".catalog-card-media img": { objectPosition: "center" },
            ".catalog-card-media .MuiChip-root": {
              bottom: "10px",
              fontSize: "9px",
              left: "8px",
              maxWidth: "96px",
            },
            ".catalog-card-content": { padding: "16px 14px" },
            ".catalog-card-content h3": { fontSize: "18px" },
            ".catalog-card-description.MuiTypography-root": {
              display: "-webkit-box",
              fontSize: "12px",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            },
            ".catalog-card-meta": { fontSize: "10px", gap: "6px 10px" },
            ".catalog-card-meta > span:nth-of-type(2)": { display: "none" },
            ".catalog-card-footer": {
              alignItems: "stretch",
              flexDirection: "column !important",
              gap: "9px",
              paddingTop: "12px",
            },
            ".catalog-price strong": { fontSize: "17px" },
            ".catalog-price del": { fontSize: "11px" },
            ".catalog-card-footer .MuiButton-root": {
              fontSize: "11px",
              minWidth: 0,
              padding: "8px 10px",
              width: "100%",
            },
            ".course-list-view": {
              padding: "112px 14px 34px",
            },
            ".course-list-grid": {
              gridTemplateColumns: "1fr",
            },
            ".course-list-card": {
              minHeight: "330px",
            },
            ".courses-hero-title.MuiTypography-root": {
              fontSize: "42px",
            },
            ".course-feature-card": {
              gap: "14px",
              gridTemplateColumns: "64px minmax(0, 1fr) 42px",
              minHeight: "108px",
              padding: "16px",
            },
            ".course-feature-icon": {
              borderRadius: "16px",
              height: "60px",
              width: "60px",
            },
            ".course-feature-icon svg": {
              fontSize: "30px",
            },
            ".course-feature-title.MuiTypography-root": {
              fontSize: "17px",
            },
            ".course-feature-copy.MuiTypography-root": {
              fontSize: "13px",
            },
            ".course-folder-icon-ring": {
              opacity: 0.18,
            },
            ".course-folder-open-icon": {
              bottom: "20px",
              height: "44px",
              right: "22px",
              width: "44px",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            ".course-folder-float": {
              animation: "none",
            },
          },
        }}
      />

      <Box
        component="main"
        className={opened ? "courses-page course-opened" : "courses-page"}
        sx={{
          color: "var(--foreground)",
          minHeight: "100vh",
          overflow: opened ? "visible" : "hidden",
          pt: opened ? 0 : { xs: 13, md: 15 },
        }}
      >
        {opened ? (
          <CourseCatalog folderCourse={opened} />
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
              className="courses-home-shell"
              sx={{
                border:
                  "1px solid color-mix(in oklab, var(--electric) 20%, transparent)",
                borderTop: 0,
                borderLeft: 0,
                borderRadius: 0,
                borderRight: 0,
                display: "grid",
                gap: { xs: 5, md: 10 },
                gridTemplateColumns: { xs: "1fr", md: "0.72fr 1.28fr" },
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
                <Typography component="h1" className="courses-hero-title">
                  Course folders that swap into <span>real skills</span>
                </Typography>
                <Typography className="courses-hero-copy">
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
              </Stack>

              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                  position: "relative",
                  pt: { xs: 2, md: 5 },
                  zIndex: 2,
                }}
              >
                <CourseFolderStack
                  activeCourse={activeCourse}
                  onSelect={setActiveCourse}
                  onSendBack={sendFrontFolderBack}
                  onOpen={(index) => {
                    if (!courses[index].comingSoon)
                      navigateToCourseFolder(courses[index]);
                  }}
                />
              </Stack>

              <Box className="course-feature-grid">
                {courseFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <Box key={feature.title} className="course-feature-card">
                      <Box className="course-feature-icon">
                        <Icon />
                      </Box>
                      <Box>
                        <Typography className="course-feature-title">
                          {feature.title}
                        </Typography>
                        <Typography className="course-feature-copy">
                          {feature.copy}
                        </Typography>
                      </Box>
                      <Box className="course-feature-arrow">
                        <ArrowForwardRoundedIcon />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}
