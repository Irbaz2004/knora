import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  GlobalStyles,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import courseImage from "@/assets/courseimg.webp";
import { toast } from "sonner";
import { addToCart, formatPrice } from "@/lib/cart";
import { auth } from "@/firebase";

const coursePrices = {
  "AI Foundation": 24999,
  "Python AI": 18999,
  GenAI: 21999,
  Vision: 19999,
  "Data Stack": 22999,
};

const courseOriginalPrices = {
  "AI Foundation": 32999,
  "Python AI": 24999,
  GenAI: 29999,
  Vision: 26999,
  "Data Stack": 30999,
};

const courseRatings = {
  "AI Foundation": [4.9, 184, 48],
  "Python AI": [4.8, 136, 36],
  GenAI: [4.9, 112, 30],
  Vision: [4.7, 89, 24],
  "Data Stack": [4.8, 105, 42],
};

const courseCatalog = [
  {
    name: "AI Foundation",
    category: "Foundation",
    fullName: "AI & Machine Learning Foundation",
    duration: "16 Weeks",
    mode: "Hybrid",
    level: "Beginner",
    copy: "Python, data handling, ML models, evaluation, and guided mini projects.",
    highlights: ["Python basics", "ML workflows", "Model evaluation"],
    icon: PsychologyRoundedIcon,
    files: [
      [
        "AI Roadmap",
        "Understand how data, models, training, and evaluation connect.",
        MenuBookRoundedIcon,
      ],
      [
        "Python Lab",
        "Write clean beginner Python inside guided notebooks.",
        CodeRoundedIcon,
      ],
      [
        "Data Files",
        "Load, clean, inspect, and prepare datasets for learning.",
        DescriptionRoundedIcon,
      ],
      [
        "Model Practice",
        "Train simple models and compare prediction behavior.",
        PsychologyRoundedIcon,
      ],
      [
        "Mini Project",
        "Build a small portfolio-ready machine learning demo.",
        AssignmentTurnedInRoundedIcon,
      ],
    ],
  },
  {
    name: "Python AI",
    category: "Programming",
    fullName: "Python for Data & AI",
    duration: "12 Weeks",
    mode: "Online / Offline",
    level: "Starter",
    copy: "Programming foundations, notebooks, APIs, automation, and coding confidence.",
    highlights: ["Core coding", "APIs", "Automation"],
    icon: CodeRoundedIcon,
    files: [
      [
        "Syntax Files",
        "Variables, conditions, loops, functions, and clear code habits.",
        CodeRoundedIcon,
      ],
      [
        "Notebook Work",
        "Practice Python in notebook-based lessons and exercises.",
        DescriptionRoundedIcon,
      ],
      [
        "API Basics",
        "Call APIs, read responses, and work with structured data.",
        DataObjectRoundedIcon,
      ],
      [
        "Automation",
        "Create scripts that save time in everyday workflows.",
        RocketLaunchRoundedIcon,
      ],
      [
        "Code Review",
        "Refactor small programs and explain your solution clearly.",
        AssignmentTurnedInRoundedIcon,
      ],
    ],
  },
  {
    name: "GenAI",
    category: "Generative AI",
    fullName: "Generative AI & LLMs",
    duration: "10 Weeks",
    mode: "Live Online",
    level: "Intermediate",
    copy: "Prompting, agents, RAG basics, responsible AI, and practical LLM workflows.",
    highlights: ["Prompting", "RAG basics", "AI agents"],
    icon: SmartToyRoundedIcon,
    files: [
      [
        "Prompt Files",
        "Shape reliable prompts with structure, context, and constraints.",
        SmartToyRoundedIcon,
      ],
      [
        "LLM Basics",
        "Learn tokens, context windows, model behavior, and limits.",
        MenuBookRoundedIcon,
      ],
      [
        "RAG Folder",
        "Connect documents, retrieval, and grounded answers.",
        FolderOpenRoundedIcon,
      ],
      [
        "Agent Lab",
        "Design simple tool-using AI workflows for real tasks.",
        RocketLaunchRoundedIcon,
      ],
      [
        "Responsible AI",
        "Check outputs, reduce risk, and build safer AI habits.",
        AssignmentTurnedInRoundedIcon,
      ],
    ],
  },
  {
    name: "Vision",
    category: "Computer Vision",
    fullName: "Computer Vision Essentials",
    duration: "8 Weeks",
    mode: "Weekend Hybrid",
    level: "Intermediate",
    copy: "Image processing, detection concepts, and guided model demos for visual AI.",
    highlights: ["Image processing", "Detection", "Model demos"],
    icon: VisibilityRoundedIcon,
    files: [
      [
        "Image Basics",
        "Read pixels, channels, resizing, filters, and transforms.",
        VisibilityRoundedIcon,
      ],
      [
        "OpenCV Lab",
        "Practice visual workflows with guided image-processing tasks.",
        CodeRoundedIcon,
      ],
      [
        "Detection",
        "Understand boxes, labels, confidence, and model outputs.",
        PsychologyRoundedIcon,
      ],
      [
        "Vision Demo",
        "Build a simple visual AI demo from start to finish.",
        RocketLaunchRoundedIcon,
      ],
      [
        "Portfolio File",
        "Package your result with screenshots and explanation.",
        AssignmentTurnedInRoundedIcon,
      ],
    ],
  },
  {
    name: "Data Stack",
    category: "Analytics",
    fullName: "Data Analytics Portfolio Track",
    duration: "14 Weeks",
    mode: "Hybrid",
    level: "Career",
    copy: "Dashboards, data cleaning, portfolio reporting, and presentation-ready insights.",
    highlights: ["Dashboards", "Cleaning", "Portfolio"],
    icon: DataObjectRoundedIcon,
    files: [
      [
        "Data Cleaning",
        "Fix missing values, formats, duplicates, and messy columns.",
        DataObjectRoundedIcon,
      ],
      [
        "Analysis File",
        "Explore trends, groups, summaries, and useful questions.",
        DescriptionRoundedIcon,
      ],
      [
        "Dashboard",
        "Turn analysis into readable charts and decision views.",
        VisibilityRoundedIcon,
      ],
      [
        "Storytelling",
        "Present insights with context, evidence, and next steps.",
        MenuBookRoundedIcon,
      ],
      [
        "Portfolio",
        "Publish a complete analytics case study for review.",
        AssignmentTurnedInRoundedIcon,
      ],
    ],
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getLessons(course) {
  return [
    ...course.files.map(([title, copy, icon], index) => ({
      title,
      copy,
      icon,
      duration: index % 2 === 0 ? "Early access" : course.duration,
    })),
    {
      title: `${course.name} Build Sprint`,
      copy: `Turn ${course.highlights[0].toLowerCase()} into a guided portfolio workflow.`,
      icon: RocketLaunchRoundedIcon,
      duration: course.duration,
    },
    {
      title: `${course.name} Project Review`,
      copy: "Review common mistakes, stronger decisions, and clean delivery habits.",
      icon: AssignmentTurnedInRoundedIcon,
      duration: "1 hour",
    },
    {
      title: `${course.name} Capstone Lab`,
      copy: `Build, explain, and package a final ${course.category.toLowerCase()} project.`,
      icon: VisibilityRoundedIcon,
      duration: "3.8 hours",
    },
  ];
}

function getCourseDetail() {
  const [, section, courseSlug, lessonSlug] =
    window.location.pathname.split("/");
  if (section !== "course" || !courseSlug || !lessonSlug) return null;

  const course = courseCatalog.find(
    (item) => slugify(item.name) === courseSlug,
  );
  if (!course) return null;

  const lesson =
    lessonSlug === "overview"
      ? {
          title: course.fullName,
          copy: course.copy,
          icon: course.icon,
          duration: course.duration,
          overview: true,
        }
      : (getLessons(course).find(
          (item) => slugify(item.title) === lessonSlug,
        ) ?? getLessons(course)[0]);

  return { course, lesson };
}

export default function CourseDetails() {
  const detail = getCourseDetail();
  const [adding, setAdding] = useState(false);

  if (!detail) {
    return (
      <main className="min-h-screen bg-background px-6 py-32 text-foreground">
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Course not found
          </Typography>
          <Button
            href="/courses"
            sx={{ mt: 3 }}
            startIcon={<ArrowBackRoundedIcon />}
          >
            Back to courses
          </Button>
        </Container>
      </main>
    );
  }

  const { course, lesson } = detail;
  const Icon = lesson.icon;
  const learnItems = [
    ...course.highlights,
    "Build portfolio-ready project work",
    "Explain decisions with practical confidence",
  ];
  const includes = [
    `${course.duration} structured learning`,
    course.mode,
    "Practice files and guided assignments",
    "Mentor review checkpoints",
    "Certificate-ready project output",
  ];
  const requirements = [
    "Basic computer knowledge",
    "Laptop with stable internet connection",
    "Curiosity to practice between classes",
  ];
  const syllabus = getLessons(course).slice(0, 6);
  const price = coursePrices[course.name] ?? 19999;
  const originalPrice = courseOriginalPrices[course.name] ?? price;
  const [rating, reviewCount, hours] = courseRatings[course.name] ?? [
    4.8, 90, 30,
  ];
  const cartItem = {
    id: slugify(course.name),
    name: course.fullName,
    category: course.category,
    duration: course.duration,
    mode: course.mode,
    level: course.level,
    image: courseImage,
    price,
    originalPrice,
    rating,
    hours,
  };
  const navigate = (path) =>
    window.dispatchEvent(
      new CustomEvent("knora:navigate", { detail: { path } }),
    );
  const handleAddToCart = async (goToCheckout = false) => {
    if (!auth?.currentUser) {
      sessionStorage.setItem("knora-post-login-path", window.location.pathname);
      toast.info("Please log in to add this course to your cart.");
      navigate("/login");
      return;
    }
    setAdding(true);
    try {
      await addToCart(cartItem);
      toast.success("Course added to your cart.");
    } catch {
      toast.info(
        "Course saved on this device. Firebase sync needs permission.",
      );
    } finally {
      setAdding(false);
    }
    navigate(goToCheckout ? "/checkout" : "/cart");
  };

  return (
    <>
      <GlobalStyles
        styles={{
          ".course-detail-page": {
            background:
              "radial-gradient(circle at 92% 6%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 28%), var(--background)",
            color: "var(--foreground)",
          },
          ".course-detail-card": {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            boxShadow:
              "0 14px 45px color-mix(in oklab, var(--foreground) 7%, transparent)",
          },
          ".course-detail-icon": {
            alignItems: "center",
            background: "var(--primary)",
            borderRadius: "12px",
            color: "var(--primary-foreground)",
            display: "flex",
            height: "3.25rem",
            justifyContent: "center",
            width: "3.25rem",
          },
          ".course-detail-icon svg": {
            fontSize: "1.8rem",
          },
          ".course-detail-image": {
            aspectRatio: "16 / 10",
            borderRadius: "14px",
            overflow: "hidden",
            position: "relative",
          },
          ".course-detail-image img": {
            display: "block",
            height: "100%",
            objectFit: "cover",
            width: "100%",
          },
          ".course-detail-image::after": {
            background:
              "linear-gradient(180deg, transparent, color-mix(in oklab, var(--background) 28%, transparent))",
            content: '""',
            inset: 0,
            pointerEvents: "none",
            position: "absolute",
          },
          ".course-mobile-detail": { display: "none" },
          "@media (max-width: 700px)": {
            ".knora-navbar, footer": { display: "none !important" },
            ".course-detail-page": {
              background: "var(--background)",
              padding: "0 !important",
            },
            ".course-detail-page > .MuiContainer-root": {
              maxWidth: "none !important",
              padding: "0 !important",
            },
            ".course-desktop-detail": { display: "none" },
            ".course-mobile-detail": {
              background: "var(--background)",
              color: "var(--foreground)",
              display: "block",
              minHeight: "100vh",
              paddingBottom: "108px",
            },
            ".mobile-course-topbar": {
              alignItems: "center",
              background: "color-mix(in oklab, var(--card) 94%, transparent)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--border)",
              display: "grid",
              gridTemplateColumns: "42px 1fr 42px",
              minHeight: "64px",
              padding: "8px 14px",
              position: "sticky",
              top: 0,
              zIndex: 20,
            },
            ".mobile-course-topbar .MuiIconButton-root": {
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              height: "36px",
              width: "36px",
            },
            ".mobile-course-topbar > p": {
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "center",
            },
            ".mobile-course-content": { padding: "14px 16px 24px" },
            ".mobile-course-hero": {
              aspectRatio: "1.48 / 1",
              borderRadius: "16px",
              boxShadow:
                "0 12px 32px color-mix(in oklab, var(--foreground) 12%, transparent)",
              marginTop: "10px",
              overflow: "hidden",
            },
            ".mobile-course-hero img": {
              height: "100%",
              objectFit: "cover",
              width: "100%",
            },
            ".mobile-course-title.MuiTypography-root": {
              color: "var(--foreground)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(23px, 7vw, 29px)",
              fontWeight: 650,
              letterSpacing: "-.025em",
              lineHeight: 1.16,
              marginTop: "20px",
            },
            ".mobile-course-mentor": {
              alignItems: "center",
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "42px minmax(0,1fr) auto",
              marginTop: "14px",
            },
            ".mobile-course-avatar": {
              alignItems: "center",
              background:
                "color-mix(in oklab, var(--primary) 12%, var(--card))",
              borderRadius: "50%",
              color: "var(--primary)",
              display: "flex",
              height: "40px",
              justifyContent: "center",
              width: "40px",
            },
            ".mobile-course-avatar svg": { fontSize: "22px" },
            ".mobile-course-mentor strong": {
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
            },
            ".mobile-course-mentor small": {
              alignItems: "center",
              color: "var(--muted-foreground)",
              display: "flex",
              fontSize: "11px",
              gap: "3px",
              marginTop: "2px",
            },
            ".mobile-course-mentor small svg": {
              color: "#f2a900",
              fontSize: "14px",
            },
            ".mobile-course-price": { textAlign: "right" },
            ".mobile-course-price strong": {
              color: "var(--primary)",
              display: "block",
              fontSize: "17px",
              fontWeight: 700,
            },
            ".mobile-course-price del": {
              color: "var(--muted-foreground)",
              fontSize: "10px",
            },
            ".mobile-course-meta": {
              color: "var(--muted-foreground)",
              fontSize: "11px",
              gap: "8px",
              marginTop: "14px",
            },
            ".mobile-course-meta span": {
              alignItems: "center",
              display: "inline-flex",
              gap: "4px",
            },
            ".mobile-course-meta svg": { fontSize: "14px" },
            ".mobile-course-description": { marginTop: "24px" },
            ".mobile-course-description h2, .mobile-course-lessons-title": {
              color: "var(--foreground)",
              fontSize: "15px",
              fontWeight: 650,
            },
            ".mobile-course-description p": {
              color: "var(--muted-foreground)",
              fontSize: "12px",
              lineHeight: 1.65,
              marginTop: "8px",
            },
            ".mobile-course-facts": {
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              marginTop: "20px",
            },
            ".mobile-course-fact": {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              minWidth: 0,
              padding: "10px 8px",
              textAlign: "center",
            },
            ".mobile-course-fact span": {
              color: "var(--muted-foreground)",
              display: "block",
              fontSize: "9px",
              letterSpacing: ".05em",
              textTransform: "uppercase",
            },
            ".mobile-course-fact strong": {
              color: "var(--foreground)",
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              marginTop: "3px",
              overflowWrap: "anywhere",
            },
            ".mobile-course-highlights": { marginTop: "24px" },
            ".mobile-course-highlights h2, .mobile-similar-heading h2": {
              color: "var(--foreground)",
              fontSize: "15px",
              fontWeight: 650,
            },
            ".mobile-course-highlight": {
              alignItems: "flex-start",
              color: "var(--muted-foreground)",
              display: "flex",
              fontSize: "12px",
              gap: "8px",
              lineHeight: 1.5,
              marginTop: "10px",
            },
            ".mobile-course-highlight svg": {
              color: "var(--primary)",
              flex: "0 0 auto",
              fontSize: "17px",
              marginTop: "2px",
            },
            ".mobile-course-tabs": {
              borderBottom: "1px solid var(--border)",
              display: "flex",
              gap: "26px",
              marginTop: "24px",
            },
            ".mobile-course-tabs span": {
              color: "var(--muted-foreground)",
              fontSize: "12px",
              padding: "0 2px 10px",
            },
            ".mobile-course-tabs .is-active": {
              borderBottom: "2px solid var(--primary)",
              color: "var(--foreground)",
              fontWeight: 650,
            },
            ".mobile-course-lessons": { marginTop: "12px" },
            ".mobile-course-lesson": {
              alignItems: "center",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "34px minmax(0,1fr) auto",
              padding: "11px 12px",
            },
            ".mobile-course-play": {
              alignItems: "center",
              background: "var(--primary)",
              borderRadius: "50%",
              color: "var(--primary-foreground)",
              display: "flex",
              height: "28px",
              justifyContent: "center",
              width: "28px",
            },
            ".mobile-course-play svg": { fontSize: "17px" },
            ".mobile-course-lesson strong": {
              color: "var(--foreground)",
              fontSize: "11px",
              fontWeight: 550,
            },
            ".mobile-course-lesson small": {
              color: "var(--muted-foreground)",
              fontSize: "10px",
            },
            ".mobile-similar-section": { marginTop: "30px" },
            ".mobile-similar-heading": {
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "space-between",
            },
            ".mobile-similar-heading span": {
              color: "var(--primary)",
              fontSize: "10px",
              fontWeight: 600,
            },
            ".mobile-similar-slider": {
              display: "flex",
              gap: "12px",
              margin: "12px -16px 0",
              overflowX: "auto",
              padding: "0 16px 8px",
              scrollPaddingLeft: "16px",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
            },
            ".mobile-similar-slider::-webkit-scrollbar": { display: "none" },
            ".mobile-similar-card": {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              color: "inherit",
              flex: "0 0 74%",
              maxWidth: "285px",
              overflow: "hidden",
              scrollSnapAlign: "start",
              textDecoration: "none",
            },
            ".mobile-similar-image": {
              aspectRatio: "16 / 9",
              overflow: "hidden",
            },
            ".mobile-similar-image img": {
              height: "100%",
              objectFit: "cover",
              transition: "transform .25s ease",
              width: "100%",
            },
            ".mobile-similar-card:active .mobile-similar-image img": {
              transform: "scale(1.025)",
            },
            ".mobile-similar-content": { padding: "11px 12px 13px" },
            ".mobile-similar-content > span": {
              color: "var(--primary)",
              display: "block",
              fontSize: "9px",
              fontWeight: 650,
              letterSpacing: ".04em",
              textTransform: "uppercase",
            },
            ".mobile-similar-content > strong": {
              color: "var(--foreground)",
              display: "-webkit-box",
              fontSize: "13px",
              fontWeight: 650,
              lineHeight: 1.35,
              marginTop: "4px",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            },
            ".mobile-similar-meta": {
              alignItems: "center",
              color: "var(--muted-foreground)",
              display: "flex",
              fontSize: "10px",
              gap: "4px",
              marginTop: "8px",
            },
            ".mobile-similar-meta svg": {
              color: "#f2a900",
              fontSize: "13px",
            },
            ".mobile-similar-content b": {
              color: "var(--foreground)",
              display: "block",
              fontSize: "13px",
              marginTop: "8px",
            },
            ".mobile-course-cta": {
              background: "color-mix(in oklab, var(--card) 94%, transparent)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid var(--border)",
              bottom: 0,
              left: 0,
              padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
              position: "fixed",
              right: 0,
              zIndex: 50,
            },
            ".mobile-course-cta .MuiButton-root": {
              background: "var(--primary)",
              borderRadius: "999px",
              boxShadow:
                "0 12px 28px color-mix(in oklab, var(--primary) 30%, transparent)",
              color: "var(--primary-foreground)",
              fontSize: "14px",
              fontWeight: 650,
              minHeight: "50px",
              textTransform: "none",
              width: "100%",
            },
            ".mobile-course-cta .MuiButton-root:hover": {
              background:
                "color-mix(in oklab, var(--primary) 90%, var(--foreground))",
            },
          },
        }}
      />

      <main className="course-detail-page min-h-screen px-4 py-28 sm:px-8 lg:px-16">
        <Container maxWidth={false} sx={{ maxWidth: 1280 }}>
          <MobileCourseDetails
            adding={adding}
            course={course}
            hours={hours}
            lesson={lesson}
            onEnroll={() => handleAddToCart(true)}
            originalPrice={originalPrice}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
            syllabus={syllabus}
          />
          <Box className="course-desktop-detail">
            <Button
              href={`/course/${slugify(course.name)}`}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                color: "var(--foreground)",
                fontWeight: 500,
                mb: 3,
                textTransform: "none",
              }}
            >
              Back to course list
            </Button>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, lg: 4 },
                gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" },
              }}
            >
              <Stack spacing={2.5}>
                <Box
                  className="course-detail-card"
                  sx={{ p: { xs: 3, md: 4 } }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center", mb: 2.5 }}
                  >
                    <Box className="course-detail-icon">
                      <Icon />
                    </Box>
                    <Stack spacing={0.8}>
                      <Chip
                        label={course.category}
                        sx={{
                          bgcolor:
                            "color-mix(in oklab, var(--primary) 10%, transparent)",
                          color: "var(--primary)",
                          fontWeight: 500,
                          width: "fit-content",
                        }}
                      />
                      <Typography
                        component="h1"
                        sx={{
                          fontFamily: "var(--font-display)",
                          fontSize: { xs: 30, md: 42 },
                          fontWeight: 600,
                          letterSpacing: 0,
                          lineHeight: 1.02,
                        }}
                      >
                        {lesson.title}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: { xs: 14, md: 16 },
                      fontWeight: 400,
                      lineHeight: 1.65,
                      maxWidth: 780,
                    }}
                  >
                    {lesson.copy} This course details page gives you a clear
                    path through {course.fullName}, with practical labs,
                    mentor-led checkpoints, and a project outcome you can show
                    in your portfolio.
                  </Typography>
                </Box>

                <DetailSection title="What you'll learn" items={learnItems} />
                <DetailSection title="This course includes" items={includes} />
                <DetailSection title="Requirements" items={requirements} />

                <Box
                  className="course-detail-card"
                  sx={{ p: { xs: 3, md: 4 } }}
                >
                  <Typography component="h2" sx={sectionTitleSx}>
                    Description
                  </Typography>
                  <Typography sx={bodySx}>
                    Learn the core concepts, workflows, and practical habits
                    behind
                    {` ${course.fullName.toLowerCase()}`}. You will move from
                    guided foundations into hands-on tasks, then package your
                    work with the clarity expected in real interviews and
                    project reviews.
                  </Typography>
                </Box>

                <Box
                  className="course-detail-card"
                  sx={{ p: { xs: 3, md: 4 } }}
                >
                  <Typography component="h2" sx={sectionTitleSx}>
                    Syllabus
                  </Typography>
                  <Stack spacing={1.4} sx={{ mt: 2 }}>
                    {syllabus.map((item, index) => {
                      const LessonIcon = item.icon;
                      return (
                        <Box
                          key={item.title}
                          sx={{
                            alignItems: "center",
                            border:
                              "1px solid color-mix(in oklab, var(--primary) 10%, transparent)",
                            borderRadius: "8px",
                            display: "grid",
                            gap: 1.5,
                            gridTemplateColumns: "44px minmax(0, 1fr) auto",
                            p: 1.5,
                          }}
                        >
                          <Box sx={smallIconSx}>
                            <LessonIcon />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              {String(index + 1).padStart(2, "0")}. {item.title}
                            </Typography>
                            <Typography sx={{ ...bodySx, fontSize: 13 }}>
                              {item.copy}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              color: "var(--muted-foreground)",
                              fontSize: 12,
                            }}
                          >
                            {item.duration}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Stack>

              <Box
                className="course-detail-card"
                sx={{ alignSelf: "start", p: 3, position: "sticky", top: 116 }}
              >
                <Stack spacing={2.4}>
                  <Box className="course-detail-image">
                    <Box
                      component="img"
                      src={courseImage}
                      alt={course.fullName}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "var(--foreground)",
                        fontFamily: "var(--font-display)",
                        fontSize: 23,
                        fontWeight: 600,
                        letterSpacing: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {course.fullName}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "center", mt: 1.2 }}
                    >
                      <Stack
                        direction="row"
                        spacing={0.45}
                        sx={{
                          alignItems: "center",
                          color: "var(--foreground)",
                        }}
                      >
                        <StarRoundedIcon
                          sx={{ color: "#f5ad18", fontSize: 18 }}
                        />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                          {rating} ({reviewCount} reviews)
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0.45}
                        sx={{
                          alignItems: "center",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        <AccessTimeRoundedIcon sx={{ fontSize: 17 }} />
                        <Typography sx={{ fontSize: 13 }}>
                          {hours} hours
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={1.2}
                    sx={{ alignItems: "baseline" }}
                  >
                    <Typography
                      sx={{
                        color: "var(--foreground)",
                        fontSize: 28,
                        fontWeight: 700,
                      }}
                    >
                      {formatPrice(price)}
                    </Typography>
                    <Typography
                      component="del"
                      sx={{ color: "var(--muted-foreground)", fontSize: 14 }}
                    >
                      {formatPrice(originalPrice)}
                    </Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {[
                      ["Duration", course.duration],
                      ["Mode", course.mode],
                      ["Level", course.level],
                    ].map(([label, value]) => (
                      <Box
                        key={label}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "var(--muted-foreground)",
                            fontSize: 14,
                          }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--foreground)",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Divider />
                  <Button
                    fullWidth
                    startIcon={<ShoppingCartRoundedIcon />}
                    disabled={adding}
                    onClick={() => handleAddToCart(false)}
                    sx={{
                      bgcolor: "var(--primary)",
                      borderRadius: "8px",
                      color: "var(--primary-foreground)",
                      fontWeight: 700,
                      py: 1.4,
                      textTransform: "none",
                    }}
                  >
                    {adding ? "Saving..." : "Add to cart"}
                  </Button>
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardRoundedIcon />}
                    disabled={adding}
                    onClick={() => handleAddToCart(true)}
                    sx={{
                      border:
                        "1px solid color-mix(in oklab, var(--primary) 24%, transparent)",
                      borderRadius: "8px",
                      color: "var(--foreground)",
                      fontWeight: 700,
                      py: 1.4,
                      textTransform: "none",
                    }}
                  >
                    Checkout
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
}

const sectionTitleSx = {
  color: "var(--foreground)",
  fontFamily: "var(--font-display)",
  fontSize: { xs: 24, md: 32 },
  fontWeight: 600,
  letterSpacing: 0,
};

const bodySx = {
  color: "var(--muted-foreground)",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.65,
};

const smallIconSx = {
  alignItems: "center",
  bgcolor: "color-mix(in oklab, var(--primary) 10%, transparent)",
  borderRadius: "8px",
  color: "var(--primary)",
  display: "flex",
  height: 44,
  justifyContent: "center",
  width: 44,
};

function DetailSection({ title, items }) {
  return (
    <Box className="course-detail-card" sx={{ p: { xs: 3, md: 4 } }}>
      <Typography component="h2" sx={sectionTitleSx}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 1.4,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          mt: 2,
        }}
      >
        {items.map((item) => (
          <Stack
            key={item}
            direction="row"
            spacing={1.2}
            sx={{ alignItems: "flex-start" }}
          >
            <CheckCircleRoundedIcon
              sx={{ color: "var(--primary)", fontSize: 20, mt: 0.2 }}
            />
            <Typography sx={bodySx}>{item}</Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}

function MobileCourseDetails({
  adding,
  course,
  hours,
  lesson,
  onEnroll,
  originalPrice,
  price,
  rating,
  reviewCount,
  syllabus,
}) {
  const CourseIcon = course.icon;

  return (
    <Box className="course-mobile-detail">
      <Box className="mobile-course-topbar">
        <IconButton
          href={`/course/${slugify(course.name)}`}
          aria-label="Back to course list"
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography>Course Details</Typography>
        <IconButton href="/cart" aria-label="Open cart">
          <ShoppingCartRoundedIcon />
        </IconButton>
      </Box>

      <Box className="mobile-course-content">
        <Box className="mobile-course-hero">
          <Box component="img" src={courseImage} alt={course.fullName} />
        </Box>

        <Typography component="h1" className="mobile-course-title">
          {lesson.title}
        </Typography>

        <Box className="mobile-course-mentor">
          <Box className="mobile-course-avatar">
            <CourseIcon />
          </Box>
          <Box>
            <strong>Knora Faculty</strong>
            <small>
              <StarRoundedIcon /> {rating} · {reviewCount} reviews
            </small>
          </Box>
          <Box className="mobile-course-price">
            <strong>{formatPrice(price)}</strong>
            <del>{formatPrice(originalPrice)}</del>
          </Box>
        </Box>

        <Stack className="mobile-course-meta" direction="row">
          <span>
            <AccessTimeRoundedIcon /> {hours} hours
          </span>
          <span>•</span>
          <span>
            <MenuBookRoundedIcon /> {syllabus.length} lessons
          </span>
        </Stack>

        <Box className="mobile-course-description">
          <Typography component="h2">Description</Typography>
          <Typography>
            {lesson.copy} Learn through guided practice, mentor checkpoints, and
            portfolio-ready work designed around {course.fullName}.
          </Typography>
        </Box>

        <Box className="mobile-course-facts">
          {[
            ["Duration", `${hours} hours`],
            ["Mode", course.mode],
            ["Level", course.level],
          ].map(([label, value]) => (
            <Box className="mobile-course-fact" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </Box>
          ))}
        </Box>

        <Box className="mobile-course-highlights">
          <Typography component="h2">What you&apos;ll learn</Typography>
          {course.highlights.slice(0, 4).map((highlight) => (
            <Box className="mobile-course-highlight" key={highlight}>
              <CheckCircleRoundedIcon />
              <span>{highlight}</span>
            </Box>
          ))}
        </Box>

        <Box className="mobile-course-tabs">
          <span className="is-active">Lessons</span>
          <span>Reviews</span>
        </Box>

        <Stack className="mobile-course-lessons" spacing={1.1}>
          {syllabus.map((item, index) => (
            <Box className="mobile-course-lesson" key={item.title}>
              <Box className="mobile-course-play">
                <PlayArrowRoundedIcon />
              </Box>
              <strong>{item.title}</strong>
              <small>
                {String(index + 3).padStart(2, "0")}:{index % 2 ? "15" : "30"}
              </small>
            </Box>
          ))}
        </Stack>

        <Box className="mobile-similar-section">
          <Box className="mobile-similar-heading">
            <Typography component="h2">Similar courses</Typography>
            <span>Swipe to explore</span>
          </Box>
          <Box className="mobile-similar-slider">
            {courseCatalog
              .filter((item) => item.name !== course.name)
              .slice(0, 4)
              .map((item) => {
                const similarRating = courseRatings[item.name]?.[0] ?? 4.8;
                const similarPrice = coursePrices[item.name] ?? 19999;

                return (
                  <Box
                    component="a"
                    className="mobile-similar-card"
                    href={`/course/${slugify(item.name)}/overview`}
                    key={item.name}
                  >
                    <Box className="mobile-similar-image">
                      <Box
                        component="img"
                        src={courseImage}
                        alt={item.fullName}
                      />
                    </Box>
                    <Box className="mobile-similar-content">
                      <span>{item.category}</span>
                      <strong>{item.fullName}</strong>
                      <Box className="mobile-similar-meta">
                        <StarRoundedIcon /> {similarRating} · {item.duration}
                      </Box>
                      <b>{formatPrice(similarPrice)}</b>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>

      <Box className="mobile-course-cta">
        <Button disabled={adding} onClick={onEnroll}>
          {adding ? "Preparing enrollment..." : "Enroll Now"}
        </Button>
      </Box>
    </Box>
  );
}
import { useState } from "react";
