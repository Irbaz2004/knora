import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  GlobalStyles,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import CursorEffect from "@/components/CursorEffect";
import eventImage from "@/assets/authright.png";

const FONT_DISPLAY = "'Archivo', 'Helvetica Neue', sans-serif";
const FONT_BODY = "'Inter', 'Helvetica Neue', sans-serif";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});
const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
});
const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const eventTemplates = [
  {
    day: 4,
    title: "AI Foundation Orientation",
    category: "Orientation",
    time: "10:30 AM",
    mode: "Live campus session",
    tone: "blue",
  },
  {
    day: 9,
    title: "Prompt Engineering Lab",
    category: "Workshop",
    time: "02:00 PM",
    mode: "Hands-on classroom",
    tone: "cyan",
  },
  {
    day: 16,
    title: "Student Project Showcase",
    category: "Showcase",
    time: "04:30 PM",
    mode: "Demo review",
    tone: "green",
  },
  {
    day: 24,
    title: "Career Q&A With Mentors",
    category: "Community",
    time: "06:00 PM",
    mode: "Open forum",
    tone: "violet",
  },
];

const newsItems = [
  {
    tag: "Announcement",
    title: "New AI foundation batch opens with mentor-led labs.",
    copy: "The upcoming batch adds weekly build reviews and a stronger project submission flow.",
    icon: CampaignRoundedIcon,
  },
  {
    tag: "Academy update",
    title: "Student demos now happen twice every month.",
    copy: "Learners get more chances to present, revise, and improve portfolio-ready work.",
    icon: PlayCircleRoundedIcon,
  },
  {
    tag: "Community",
    title: "Weekend doubt-clearing circle added for active learners.",
    copy: "Small-group discussions keep practice momentum high between regular classes.",
    icon: GroupsRoundedIcon,
  },
];

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date) {
  return DATE_FORMATTER.format(date);
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getCalendarDays(monthDate) {
  const monthStart = startOfMonth(monthDate);
  const gridStart = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - monthStart.getDay(),
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );

    return {
      date,
      key: date.toISOString(),
      muted: date.getMonth() !== monthStart.getMonth(),
      today: sameDay(date, new Date()),
    };
  });
}

function getEventsForMonth(monthDate) {
  const daysInMonth = getDaysInMonth(monthDate);

  return eventTemplates.map((event) => ({
    ...event,
    date: new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      Math.min(event.day, daysInMonth),
    ),
  }));
}

function CalendarPanel({
  calendarDays,
  events,
  month,
  onNextMonth,
  onPreviousMonth,
  onToday,
}) {
  const nextEvent =
    events.find((event) => event.date >= startOfDay(new Date())) ?? events[0];
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--calendar-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--calendar-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <Box className="en-calendar-panel" onPointerMove={handlePointerMove}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography className="en-kicker">Live calendar</Typography>
          <Typography component="h2" className="en-calendar-title">
            {MONTH_FORMATTER.format(month)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconButton
            aria-label="Previous month"
            className="en-icon-button"
            onClick={onPreviousMonth}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
          <Button className="en-today-button" onClick={onToday}>
            Today
          </Button>
          <IconButton
            aria-label="Next month"
            className="en-icon-button"
            onClick={onNextMonth}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box className="en-weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </Box>

      <Box className="en-calendar-grid" aria-label="Academy events calendar">
        {calendarDays.map((day) => {
          const dayEvents = events.filter((event) =>
            sameDay(event.date, day.date),
          );

          return (
            <Box
              key={day.key}
              className={`en-calendar-cell${day.muted ? " en-calendar-muted" : ""}${
                day.today ? " en-calendar-today" : ""
              }`}
            >
              <span className="en-day-number">{day.date.getDate()}</span>
              {dayEvents.slice(0, 2).map((event) => (
                <span
                  key={event.title}
                  className={`en-event-pill en-event-${event.tone}`}
                >
                  {event.category}
                </span>
              ))}
            </Box>
          );
        })}
      </Box>

      <Stack className="en-next-row" spacing={1.5}>
        <Typography className="en-kicker">Next on schedule</Typography>
        <Typography component="h3">{nextEvent.title}</Typography>
        <Typography>
          {FULL_DATE_FORMATTER.format(nextEvent.date)} at {nextEvent.time} -{" "}
          {nextEvent.mode}
        </Typography>
      </Stack>
    </Box>
  );
}

function NewsTile({ item, delay }) {
  const [ref, inView] = useInView();
  const Icon = item.icon;

  return (
    <Stack
      ref={ref}
      className="en-news-tile"
      spacing={2}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Box className="en-news-icon">
        <Icon />
      </Box>
      <Typography className="en-kicker">{item.tag}</Typography>
      <Typography component="h3">{item.title}</Typography>
      <Typography>{item.copy}</Typography>
    </Stack>
  );
}

export default function EventsNews() {
  const [viewedMonth, setViewedMonth] = useState(() =>
    startOfMonth(new Date()),
  );
  const calendarDays = useMemo(
    () => getCalendarDays(viewedMonth),
    [viewedMonth],
  );
  const events = useMemo(() => getEventsForMonth(viewedMonth), [viewedMonth]);

  const featuredPanels = useMemo(
    () =>
      events.map((event, index) => ({
        ...event,
        eyebrow: `${formatDate(event.date)} / ${event.category}`,
        title: event.title,
        copy:
          index === 0
            ? "A focused start for learners joining Knora programs, with batch flow, tools, and mentor support mapped clearly."
            : index === 1
              ? "A practical lab built around examples, exercises, and guided feedback so students leave with real practice."
              : index === 2
                ? "Students present their work, receive structured review, and learn how to explain their technical decisions."
                : "A conversational session for career doubts, next steps, interviews, and portfolio direction.",
        icon:
          index === 0
            ? EventAvailableRoundedIcon
            : index === 1
              ? AutoAwesomeRoundedIcon
              : index === 2
                ? NewspaperRoundedIcon
                : GroupsRoundedIcon,
      })),
    [events],
  );

  return (
    <>
      <GlobalStyles
        styles={{
          "@import":
            "url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap')",
          "@keyframes enFadeUp": {
            "0%": { opacity: 0, transform: "translateY(28px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes enSweep": {
            "0%": { transform: "translateX(-18%)" },
            "100%": { transform: "translateX(18%)" },
          },
          ".en-page": {
            background:
              "linear-gradient(180deg, #ffffff 0%, var(--background) 42%, color-mix(in oklab, var(--primary) 6%, var(--background)) 100%)",
            fontFamily: FONT_BODY,
          },
          ".dark .en-page": {
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 92%, #001b3d 8%) 0%, var(--background) 100%)",
          },
          ".en-grid-bg": {
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            inset: 0,
            maskImage: "linear-gradient(180deg, black, transparent 72%)",
            opacity: 0.55,
            pointerEvents: "none",
            position: "fixed",
          },
          ".en-hero": {
            animation: "enFadeUp 700ms ease both",
          },
          ".en-kicker.MuiTypography-root": {
            color: "var(--primary)",
            fontFamily: FONT_BODY,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          },
          ".en-calendar-panel": {
            "--calendar-x": "50%",
            "--calendar-y": "50%",
            background:
              "linear-gradient(180deg, color-mix(in oklab, white 88%, var(--primary) 4%), color-mix(in oklab, white 72%, var(--primary) 6%))",
            border: "1px solid color-mix(in oklab, var(--primary) 18%, white)",
            borderRadius: 8,
            color: "var(--foreground)",
            overflow: "hidden",
            padding: "clamp(1rem, 2.4vw, 2rem)",
            position: "relative",
          },
          ".en-calendar-panel::before": {
            animation: "enSweep 8s ease-in-out infinite alternate",
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 16%, transparent), transparent)",
            content: "''",
            height: "100%",
            left: "-35%",
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            width: "70%",
          },
          ".en-calendar-panel::after": {
            background:
              "radial-gradient(circle at var(--calendar-x) var(--calendar-y), color-mix(in oklab, var(--primary) 44%, transparent), color-mix(in oklab, var(--primary) 18%, transparent) 18%, transparent 36%)",
            content: "''",
            inset: 0,
            mixBlendMode: "screen",
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
            transition: "opacity 180ms ease",
            zIndex: 2,
          },
          ".en-calendar-panel:hover::after": {
            opacity: 0.95,
          },
          ".en-calendar-panel > *": {
            position: "relative",
            zIndex: 1,
          },
          ".dark .en-calendar-panel": {
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 94%, var(--primary) 6%), color-mix(in oklab, var(--background) 86%, var(--primary) 8%))",
            borderColor: "color-mix(in oklab, var(--primary) 26%, transparent)",
          },
          ".en-calendar-title.MuiTypography-root": {
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(1.75rem, 3vw, 3.25rem)",
            fontWeight: 850,
            letterSpacing: 0,
            lineHeight: 1,
            marginTop: "0.35rem",
          },
          ".en-icon-button.MuiIconButton-root": {
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--foreground)",
            height: 42,
            width: 42,
          },
          ".en-today-button.MuiButton-root": {
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--foreground)",
            fontFamily: FONT_BODY,
            fontWeight: 800,
            height: 42,
            paddingInline: "1rem",
            textTransform: "none",
          },
          ".en-weekdays": {
            display: "grid",
            gap: 6,
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            marginTop: "1.6rem",
          },
          ".en-weekdays span": {
            color: "var(--muted-foreground)",
            fontSize: 12,
            fontWeight: 800,
            textAlign: "center",
          },
          ".en-calendar-grid": {
            display: "grid",
            gap: 6,
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            marginTop: 6,
          },
          ".en-calendar-cell": {
            alignContent: "start",
            background: "color-mix(in oklab, white 78%, transparent)",
            border: "1px solid color-mix(in oklab, var(--primary) 12%, white)",
            borderRadius: 8,
            display: "grid",
            gap: 5,
            minHeight: "clamp(4.3rem, 7vw, 6.5rem)",
            overflow: "hidden",
            padding: "0.55rem",
            transition:
              "background 180ms ease, border-color 180ms ease, outline-color 180ms ease",
          },
          ".en-calendar-cell:hover": {
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 18%, white), color-mix(in oklab, white 82%, var(--primary) 8%))",
            borderColor: "var(--primary)",
            outline:
              "2px solid color-mix(in oklab, var(--primary) 22%, transparent)",
          },
          ".dark .en-calendar-cell": {
            background: "color-mix(in oklab, var(--card) 72%, transparent)",
            borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
          },
          ".dark .en-calendar-cell:hover": {
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 24%, var(--card)), color-mix(in oklab, var(--card) 80%, var(--primary) 10%))",
          },
          ".en-calendar-muted": {
            opacity: 0.36,
          },
          ".en-calendar-today": {
            borderColor: "var(--primary)",
            outline:
              "2px solid color-mix(in oklab, var(--primary) 18%, transparent)",
          },
          ".en-day-number": {
            color: "var(--foreground)",
            fontSize: 13,
            fontWeight: 850,
          },
          ".en-event-pill": {
            borderRadius: 6,
            color: "#fff",
            display: "block",
            fontSize: 10,
            fontWeight: 850,
            lineHeight: 1.1,
            overflow: "hidden",
            padding: "0.35rem 0.42rem",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          ".en-event-blue": { background: "#0572ea" },
          ".en-event-cyan": { background: "#0f93b8" },
          ".en-event-green": { background: "#188a63" },
          ".en-event-violet": { background: "#7161ef" },
          ".en-next-row": {
            borderLeft: "4px solid var(--primary)",
            marginTop: "1.35rem",
            paddingLeft: "1rem",
            position: "relative",
          },
          ".en-next-row h3": {
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(1.3rem, 2vw, 1.9rem)",
            fontWeight: 800,
            lineHeight: 1.08,
          },
          ".en-next-row p": {
            color: "var(--muted-foreground)",
            fontFamily: FONT_BODY,
            fontSize: 15,
          },
          ".en-panel": {
            borderRadius: 0,
            minHeight: "calc(100vh - 8rem)",
            overflow: "hidden",
            position: "sticky",
          },
          ".en-panel-primary": {
            "--en-panel-accent": "#ffffff",
            "--en-panel-border": "rgba(255,255,255,0.32)",
            "--en-panel-muted": "rgba(255,255,255,0.82)",
            "--en-panel-soft": "rgba(255,255,255,0.66)",
            "--en-panel-text": "#ffffff",
            background: "var(--primary)",
            color: "#fff",
          },
          ".en-panel-light": {
            "--en-panel-accent": "var(--primary)",
            "--en-panel-border":
              "color-mix(in oklab, var(--primary) 24%, var(--border))",
            "--en-panel-muted": "var(--muted-foreground)",
            "--en-panel-soft": "var(--primary)",
            "--en-panel-text": "var(--foreground)",
            background: "#ffffff",
            color: "var(--foreground)",
          },
          ".dark .en-panel-light": {
            "--en-panel-muted": "#4f5e78",
            "--en-panel-text": "#101828",
            background: "#ffffff",
            color: "#101828",
          },
          ".dark .en-panel-primary": {
            "--en-panel-accent": "var(--primary)",
            "--en-panel-border": "var(--border)",
            "--en-panel-muted": "var(--muted-foreground)",
            "--en-panel-soft": "var(--primary)",
            "--en-panel-text": "var(--foreground)",
            background: "var(--card)",
            color: "var(--foreground)",
          },
          ".en-panel-content": {
            minHeight: "calc(100vh - 8rem)",
            position: "relative",
            zIndex: 1,
          },
          ".en-panel-image": {
            display: "block",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
          },
          ".en-news-tile": {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "clamp(1.25rem, 2vw, 1.75rem)",
            transition:
              "opacity 520ms ease, transform 520ms cubic-bezier(.2,.8,.2,1)",
          },
          ".en-news-icon": {
            alignItems: "center",
            background: "color-mix(in oklab, var(--primary) 12%, var(--card))",
            borderRadius: 8,
            color: "var(--primary)",
            display: "flex",
            height: 52,
            justifyContent: "center",
            width: 52,
          },
          ".en-news-tile h3": {
            color: "var(--foreground)",
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
            fontWeight: 800,
            lineHeight: 1.08,
          },
          ".en-news-tile p": {
            color: "var(--muted-foreground)",
            fontFamily: FONT_BODY,
            fontSize: 15,
            lineHeight: 1.6,
          },
          "@media (max-width: 899px)": {
            ".en-calendar-cell": {
              minHeight: "3.7rem",
              padding: "0.35rem",
            },
            ".en-event-pill": {
              fontSize: 0,
              height: 7,
              padding: 0,
            },
            ".en-panel, .en-panel-content": {
              minHeight: "auto",
              position: "relative",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            ".en-hero, .en-calendar-panel::before": {
              animation: "none",
            },
            ".en-news-tile": {
              transition: "none",
            },
          },
        }}
      />
      <CursorEffect />

      <Box
        component="main"
        className="en-page"
        sx={{
          color: "var(--foreground)",
          minHeight: "100vh",
          overflow: "clip",
          position: "relative",
        }}
      >
        <Box className="en-grid-bg" />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: "none",
            px: { xs: 2, sm: 4, lg: 8 },
            py: 0,
            position: "relative",
            width: "100%",
            zIndex: 1,
          }}
        >
          <Box
            component="section"
            className="en-hero"
            sx={{
              alignItems: "center",
              display: "grid",
              gap: { xs: 5, lg: 8 },
              gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.1fr" },
              minHeight: "100vh",
              ml: "calc(50% - 50vw)",
              mr: "calc(50% - 50vw)",
              px: { xs: 2, sm: 4, lg: 8 },
              pt: { xs: 13, md: 15 },
              width: "100vw",
            }}
          >
            <Stack spacing={3} sx={{ maxWidth: 760 }}>
              <Chip
                icon={<CalendarMonthRoundedIcon />}
                label="Events & News"
                sx={{
                  alignSelf: "flex-start",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--primary)",
                  fontFamily: FONT_BODY,
                  fontWeight: 800,
                  letterSpacing: 0,
                }}
              />
              <Typography
                component="h1"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: 40, sm: 58, md: 76 },
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 0.92,
                }}
              >
                Academy updates in a full-screen calendar flow.
              </Typography>
              <Typography
                sx={{
                  color: "var(--muted-foreground)",
                  fontFamily: FONT_BODY,
                  fontSize: { xs: 15, md: 18 },
                  lineHeight: 1.55,
                  maxWidth: 680,
                }}
              >
                Follow workshops, batch announcements, student showcases, and
                mentor sessions with a calendar that updates by month.
              </Typography>
              <Button
                href="#event-stack"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: "8px",
                  bgcolor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontFamily: FONT_BODY,
                  fontWeight: 850,
                  px: 3,
                  py: 1.4,
                  textTransform: "none",
                  "&:hover": { bgcolor: "var(--primary)" },
                }}
              >
                View schedule
              </Button>
            </Stack>

            <CalendarPanel
              calendarDays={calendarDays}
              events={events}
              month={viewedMonth}
              onNextMonth={() => setViewedMonth((month) => addMonths(month, 1))}
              onPreviousMonth={() =>
                setViewedMonth((month) => addMonths(month, -1))
              }
              onToday={() => setViewedMonth(startOfMonth(new Date()))}
            />
          </Box>

          <Box
            id="event-stack"
            sx={{
              ml: "calc(50% - 50vw)",
              mr: "calc(50% - 50vw)",
              minHeight: {
                xs: "auto",
                md: `${featuredPanels.length * 104}vh`,
              },
              py: { xs: 8, md: 12 },
              position: "relative",
              width: "100vw",
            }}
          >
            {featuredPanels.map((panel, index) => {
              const Icon = panel.icon;
              const isPrimaryPanel = index % 2 === 0;

              return (
                <Box
                  key={`${panel.title}-${panel.date.toISOString()}`}
                  className={`en-panel ${
                    isPrimaryPanel ? "en-panel-primary" : "en-panel-light"
                  }`}
                  sx={{
                    mb: { xs: 3, md: 0 },
                    top: { xs: 0, md: 104 + index * 16 },
                    zIndex: 20 + index,
                  }}
                >
                  <Box
                    className="en-panel-content"
                    sx={{
                      alignItems: "center",
                      display: "grid",
                      gap: { xs: 4, md: 6 },
                      gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
                      p: 0,
                    }}
                  >
                    <Stack
                      spacing={3}
                      sx={{ p: { xs: 3, sm: 5, md: 7 }, minWidth: 0 }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            border: "1px solid var(--en-panel-border)",
                            borderRadius: "8px",
                            display: "flex",
                            height: 54,
                            justifyContent: "center",
                            width: 54,
                          }}
                        >
                          <Icon
                            sx={{
                              color: "var(--en-panel-accent)",
                              fontSize: 26,
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            color: "var(--en-panel-soft)",
                            fontFamily: FONT_BODY,
                            fontSize: 12,
                            fontWeight: 850,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {panel.eyebrow}
                        </Typography>
                      </Stack>
                      <Typography
                        component="h2"
                        sx={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: { xs: 34, sm: 46, md: 60 },
                          fontWeight: 900,
                          letterSpacing: 0,
                          lineHeight: 0.95,
                          maxWidth: 780,
                          color: "var(--en-panel-text)",
                        }}
                      >
                        {panel.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--en-panel-muted)",
                          fontFamily: FONT_BODY,
                          fontSize: { xs: 15, md: 18 },
                          lineHeight: 1.55,
                          maxWidth: 720,
                        }}
                      >
                        {panel.copy}
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--en-panel-soft)",
                          fontFamily: FONT_BODY,
                          fontSize: { xs: 14, md: 16 },
                          fontWeight: 850,
                          lineHeight: 1.4,
                        }}
                      >
                        {panel.time} - {panel.mode}
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        alignSelf: "stretch",
                        minHeight: { xs: 260, md: "calc(100vh - 8rem)" },
                        overflow: "hidden",
                        p: { xs: 2, md: 4 },
                      }}
                    >
                      <Box
                        component="img"
                        src={eventImage}
                        alt=""
                        aria-hidden="true"
                        className="en-panel-image"
                        sx={{ borderRadius: "8px" }}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box
            component="section"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              pb: { xs: 10, md: 14 },
              position: "relative",
              zIndex: 1,
            }}
          >
            {newsItems.map((item, index) => (
              <NewsTile key={item.title} item={item} delay={index * 110} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
