import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  GlobalStyles,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CursorEffect from "@/components/CursorEffect";
import courseImage from "@/assets/courseimg.webp";

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
    getLessons(course).find((item) => slugify(item.title) === lessonSlug) ??
    getLessons(course)[0];

  return { course, lesson };
}

export default function CourseDetails() {
  const detail = getCourseDetail();

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
  const CourseIcon = course.icon;
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

  return (
    <>
      <GlobalStyles
        styles={{
          ".course-detail-page": {
            background:
              "radial-gradient(circle at 72% 18%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 32%), var(--background)",
          },
          ".course-detail-card": {
            background: "color-mix(in oklab, var(--card) 88%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 12%, transparent)",
            borderRadius: "8px",
          },
          ".course-detail-icon": {
            alignItems: "center",
            background:
              "linear-gradient(145deg, var(--primary), color-mix(in oklab, var(--primary) 64%, var(--foreground)))",
            borderRadius: "8px",
            color: "var(--primary-foreground)",
            display: "flex",
            height: "4rem",
            justifyContent: "center",
            width: "4rem",
          },
          ".course-detail-icon svg": {
            fontSize: "2.3rem",
          },
          ".course-detail-image": {
            aspectRatio: "16 / 10",
            borderRadius: "8px",
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
        }}
      />
      <CursorEffect />
      <main className="course-detail-page min-h-screen px-4 py-32 text-foreground sm:px-8 lg:px-16">
        <Container maxWidth={false} sx={{ maxWidth: 1280 }}>
          <Button
            href={`/course/${slugify(course.name)}`}
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              color: "var(--foreground)",
              fontWeight: 600,
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
            <Stack spacing={3}>
              <Box className="course-detail-card" sx={{ p: { xs: 3, md: 5 } }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center", mb: 3 }}
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
                        fontWeight: 600,
                        width: "fit-content",
                      }}
                    />
                    <Typography
                      component="h1"
                      sx={{
                        fontFamily: "var(--font-display)",
                        fontSize: { xs: 38, md: 58 },
                        fontWeight: 700,
                        letterSpacing: 0,
                        lineHeight: 0.98,
                      }}
                    >
                      {lesson.title}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    color: "var(--muted-foreground)",
                    fontSize: { xs: 16, md: 19 },
                    fontWeight: 400,
                    lineHeight: 1.7,
                    maxWidth: 840,
                  }}
                >
                  {lesson.copy} This course details page gives you a clear path
                  through {course.fullName}, with practical labs, mentor-led
                  checkpoints, and a project outcome you can show in your
                  portfolio.
                </Typography>
              </Box>

              <DetailSection title="What you'll learn" items={learnItems} />
              <DetailSection title="This course includes" items={includes} />
              <DetailSection title="Requirements" items={requirements} />

              <Box className="course-detail-card" sx={{ p: { xs: 3, md: 4 } }}>
                <Typography component="h2" sx={sectionTitleSx}>
                  Description
                </Typography>
                <Typography sx={bodySx}>
                  Learn the core concepts, workflows, and practical habits
                  behind
                  {` ${course.fullName.toLowerCase()}`}. You will move from
                  guided foundations into hands-on tasks, then package your work
                  with the clarity expected in real interviews and project
                  reviews.
                </Typography>
              </Box>

              <Box className="course-detail-card" sx={{ p: { xs: 3, md: 4 } }}>
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
                  <Box
                    className="course-detail-icon"
                    sx={{
                      bottom: 14,
                      height: "3.25rem",
                      position: "absolute",
                      right: 14,
                      width: "3.25rem",
                      zIndex: 2,
                      "& svg": { fontSize: "1.9rem" },
                    }}
                  >
                    <CourseIcon />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 0,
                    lineHeight: 1.05,
                  }}
                >
                  {course.fullName}
                </Typography>
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
                        sx={{ color: "var(--muted-foreground)", fontSize: 14 }}
                      >
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider />
                <Button
                  fullWidth
                  startIcon={<ShoppingCartRoundedIcon />}
                  sx={{
                    bgcolor: "var(--primary)",
                    borderRadius: "8px",
                    color: "var(--primary-foreground)",
                    fontWeight: 700,
                    py: 1.4,
                    textTransform: "none",
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  fullWidth
                  endIcon={<ArrowForwardRoundedIcon />}
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
        </Container>
      </main>
    </>
  );
}

const sectionTitleSx = {
  fontFamily: "var(--font-display)",
  fontSize: { xs: 24, md: 32 },
  fontWeight: 700,
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
