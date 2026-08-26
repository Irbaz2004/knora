import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  GlobalStyles,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";
import facultyArjun from "@/assets/faculty-arjun.avif";
import facultyAisha from "@/assets/faculty-aisha.avif";
import facultyRahul from "@/assets/faculty-rahul.jpg";

const facultyMembers = [
  {
    name: "House",
    fullName: "Mira Shah",
    role: "Faculty Member",
    subject: "House",
    email: "house.faculty@academy.com",
    phone: "+91 98765 43214",
    education: "M.Mus Contemporary Production",
    experience: "5+ Years",
    image: facultyAisha,
    bio: "Focuses on groove construction, bassline movement, club arrangement, DJ-ready transitions, and clean mix preparation.",
  },
  {
    name: "Techno",
    fullName: "Tanya Mehra",
    role: "Faculty Member",
    subject: "Techno",
    email: "techno.faculty@academy.com",
    phone: "+91 98765 43211",
    education: "M.A. Electronic Music",
    experience: "6+ Years",
    image: facultyAisha,
    bio: "Guides learners through rhythm programming, electronic arrangement, sampling, live sets, and modern production workflows.",
  },
  {
    name: "Jazz",
    fullName: "Jaspreet Kaur",
    role: "Faculty Member",
    subject: "Jazz",
    email: "jazz.faculty@academy.com",
    phone: "+91 98765 43210",
    education: "M.Mus (Jazz Performance)",
    experience: "8+ Years",
    image: facultyArjun,
    bio: "Specializes in Jazz theory, improvisation, and performance. Passionate about blending classic jazz traditions with modern techniques.",
  },
  {
    name: "Lo-Fi",
    fullName: "Rohan Verma",
    role: "Faculty Member",
    subject: "Lo-Fi",
    email: "lofi.faculty@academy.com",
    phone: "+91 98765 43212",
    education: "Diploma in Music Production",
    experience: "7+ Years",
    image: facultyRahul,
    bio: "Teaches warm textures, beat design, harmonic loops, mixing basics, and calm study-focused sound design.",
  },
  {
    name: "Synthwave",
    fullName: "Aarav Menon",
    role: "Senior Mentor",
    subject: "Synthwave",
    email: "synthwave.faculty@academy.com",
    phone: "+91 98765 43213",
    education: "B.Mus Sound Design",
    experience: "9+ Years",
    image: facultyArjun,
    bio: "Builds strong foundations in analog-style synthesis, retro harmony, cinematic layering, and polished electronic performance.",
  },
];

const curvedNameSlots = {
  "-2": {
    top: "5%",
    x: { xs: -8, md: -44 },
    rotate: -11,
    scale: { xs: 0.7, md: 0.78 },
    blur: 7,
    opacity: 0.18,
    zIndex: 1,
  },
  "-1": {
    top: "27%",
    x: { xs: 2, md: -8 },
    rotate: -5,
    scale: { xs: 0.84, md: 0.92 },
    blur: 3,
    opacity: 0.5,
    zIndex: 2,
  },
  0: {
    top: "50%",
    x: { xs: 8, md: 18 },
    rotate: 0,
    scale: 1,
    blur: 0,
    opacity: 1,
    zIndex: 4,
  },
  1: {
    top: "72%",
    x: { xs: 2, md: -10 },
    rotate: 5,
    scale: { xs: 0.84, md: 0.9 },
    blur: 4,
    opacity: 0.42,
    zIndex: 2,
  },
  2: {
    top: "92%",
    x: { xs: -8, md: -50 },
    rotate: 10,
    scale: { xs: 0.7, md: 0.76 },
    blur: 8,
    opacity: 0.16,
    zIndex: 1,
  },
};

function getCurvedOffset(index, activeIndex) {
  let offset = index - activeIndex;
  const half = Math.floor(facultyMembers.length / 2);

  if (offset > half) offset -= facultyMembers.length;
  if (offset < -half) offset += facultyMembers.length;

  return offset;
}

function DetailRow({ icon, children }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        color: "var(--muted-foreground)",
        fontSize: { xs: 16, md: 18 },
        lineHeight: 1.4,
      }}
    >
      <Box
        component="span"
        sx={{
          alignItems: "center",
          color: "var(--primary)",
          display: "inline-flex",
          flex: "0 0 auto",
          justifyContent: "center",
          width: 30,
        }}
      >
        {icon}
      </Box>
      <Box component="span">{children}</Box>
    </Stack>
  );
}

export default function Faculty() {
  const [activeIndex, setActiveIndex] = useState(2);
  const wheelLockRef = useRef(false);
  const activeFaculty = facultyMembers[activeIndex];

  const showFaculty = (index) => {
    setActiveIndex((index + facultyMembers.length) % facultyMembers.length);
  };

  const handleNameWheel = (event) => {
    if (wheelLockRef.current) return;

    wheelLockRef.current = true;
    showFaculty(activeIndex + (event.deltaY > 0 ? 1 : -1));

    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % facultyMembers.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes facultyFadeUp": {
            "0%": {
              filter: "blur(10px)",
              opacity: 0,
              transform: "translateY(24px)",
            },
            "100%": {
              filter: "blur(0)",
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "@keyframes facultyPortraitIn": {
            "0%": {
              filter: "blur(10px)",
              opacity: 0,
              transform: "scale(0.96)",
            },
            "100%": {
              filter: "blur(0)",
              opacity: 1,
              transform: "scale(1)",
            },
          },
          ".faculty-page": {
            background:
              "radial-gradient(circle at 36% 50%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 34%), linear-gradient(115deg, #ffffff 0%, var(--background) 52%, color-mix(in oklab, var(--primary) 5%, var(--background)) 100%)",
          },
          ".dark .faculty-page": {
            background:
              "radial-gradient(circle at 36% 50%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 34%), var(--background)",
          },
          ".faculty-curved-name": {
            textShadow:
              "0 14px 36px color-mix(in oklab, var(--primary) 10%, transparent)",
          },
          ".faculty-curved-name::after": {
            background: "linear-gradient(90deg, var(--primary), transparent)",
            bottom: "-0.08em",
            content: "''",
            height: "1px",
            left: 0,
            opacity: 0,
            position: "absolute",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "opacity 260ms ease, transform 260ms ease",
            width: "72%",
          },
          ".faculty-curved-name-active::after": {
            opacity: 1,
            transform: "scaleX(1)",
          },
          ".faculty-active-copy": {
            animation: "facultyFadeUp 520ms ease both",
          },
          ".faculty-active-portrait": {
            animation: "facultyPortraitIn 560ms ease both",
          },
        }}
      />
      <CursorEffect />
      <Navbar />

      <Box
        component="main"
        className="faculty-page"
        sx={{
          alignItems: "center",
          color: "var(--foreground)",
          display: "flex",
          minHeight: "100vh",
          overflow: "hidden",
          px: { xs: 2, sm: 3, lg: 5 },
          pb: { xs: 8, md: 6 },
          pt: { xs: 16, md: 16, lg: 15 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            inset: 0,
            maskImage:
              "radial-gradient(circle at 48% 42%, black, transparent 72%)",
            opacity: 0.22,
            pointerEvents: "none",
            position: "absolute",
          }}
        />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: "none",
            minHeight: { md: "calc(100vh - 11rem)" },
            position: "relative",
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--card)",
              border:
                "1px solid color-mix(in oklab, var(--primary) 16%, transparent)",
              borderRadius: { xs: "22px", md: "30px" },
              boxShadow:
                "0 32px 100px color-mix(in oklab, var(--navy) 12%, transparent)",
              display: "grid",
              gap: { xs: 5, md: 6, lg: 8 },
              gridTemplateColumns: {
                xs: "1fr",
                md: "0.82fr 0.82fr 1fr",
              },
              minHeight: { xs: "auto", md: "calc(100vh - 11rem)" },
              overflow: "hidden",
              p: { xs: 3, sm: 4, md: 4, lg: 5 },
              position: "relative",
            }}
          >
            <Box
              sx={{
                background:
                  "linear-gradient(90deg, color-mix(in oklab, var(--card) 96%, var(--primary) 4%), color-mix(in oklab, var(--card) 70%, transparent) 64%, transparent)",
                display: { xs: "none", md: "block" },
                inset: 0,
                pointerEvents: "none",
                position: "absolute",
                width: "43%",
                zIndex: 1,
              }}
            />

            <Stack
              spacing={{ xs: 3, md: 4 }}
              sx={{
                alignSelf: "center",
                height: { xs: "auto", md: "100%" },
                justifyContent: "center",
                minWidth: 0,
                overflow: "visible",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Chip
                label="Faculty Members"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor:
                    "color-mix(in oklab, var(--primary) 8%, var(--card))",
                  border:
                    "1px solid color-mix(in oklab, var(--primary) 16%, transparent)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  letterSpacing: 0,
                }}
              />

              <Box
                onWheel={handleNameWheel}
                sx={{
                  height: { xs: 230, sm: 270, md: "clamp(280px, 42vh, 360px)" },
                  maskImage:
                    "linear-gradient(transparent, black 14%, black 86%, transparent)",
                  overflow: "visible",
                  pl: { xs: 4, md: 6 },
                  position: "relative",
                  width: "100%",
                }}
              >
                {facultyMembers.map((member, index) => {
                  const offset = getCurvedOffset(index, activeIndex);
                  const slot = curvedNameSlots[offset];
                  const isActive = offset === 0;
                  const xXs = typeof slot.x === "number" ? slot.x : slot.x.xs;
                  const xMd = typeof slot.x === "number" ? slot.x : slot.x.md;
                  const scaleXs =
                    typeof slot.scale === "number" ? slot.scale : slot.scale.xs;
                  const scaleMd =
                    typeof slot.scale === "number" ? slot.scale : slot.scale.md;

                  return (
                    <Typography
                      key={member.name}
                      className={`faculty-curved-name ${
                        isActive ? "faculty-curved-name-active" : ""
                      }`}
                      component="button"
                      onClick={() => showFaculty(index)}
                      sx={{
                        appearance: "none",
                        background: "transparent",
                        border: 0,
                        color: isActive
                          ? "var(--foreground)"
                          : "var(--muted-foreground)",
                        cursor: "pointer",
                        filter: `blur(${slot.blur}px)`,
                        fontFamily: "var(--font-display)",
                        fontSize: {
                          xs: isActive
                            ? "clamp(32px, 8.5vw, 42px)"
                            : "clamp(26px, 7vw, 34px)",
                          sm: isActive
                            ? "clamp(40px, 6.6vw, 50px)"
                            : "clamp(32px, 5.4vw, 40px)",
                          md: isActive
                            ? "clamp(42px, 3.4vw, 54px)"
                            : "clamp(32px, 2.7vw, 42px)",
                        },
                        fontWeight: isActive ? 600 : 500,
                        left: { xs: 18, md: 28 },
                        letterSpacing: 0,
                        lineHeight: 1,
                        maxWidth: "min(calc(100% - 2rem), 28rem)",
                        overflow: "hidden",
                        opacity: slot.opacity,
                        p: 0,
                        position: "absolute",
                        textAlign: "left",
                        top: slot.top,
                        transform: {
                          xs: `translate3d(${xXs}px, -50%, 0) rotate(${slot.rotate}deg) scale(${scaleXs})`,
                          md: `translate3d(${xMd}px, -50%, 0) rotate(${slot.rotate}deg) scale(${scaleMd})`,
                        },
                        transformOrigin: "left center",
                        transition:
                          "top 620ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease, filter 620ms ease, opacity 420ms ease",
                        whiteSpace: "nowrap",
                        zIndex: slot.zIndex,
                      }}
                    >
                      {member.name}
                    </Typography>
                  );
                })}
              </Box>
            </Stack>

            <Box
              sx={{
                alignSelf: "center",
                justifySelf: "center",
                position: "relative",
                width: "min(100%, clamp(220px, 19vw, 300px))",
                zIndex: 3,
              }}
            >
              <Box
                key={activeFaculty.fullName}
                className="faculty-active-portrait"
                component="img"
                src={activeFaculty.image}
                alt={activeFaculty.fullName}
                sx={{
                  aspectRatio: "0.82",
                  border:
                    "1px solid color-mix(in oklab, var(--primary) 18%, transparent)",
                  borderRadius: { xs: "22px", md: "28px" },
                  boxShadow:
                    "0 28px 70px color-mix(in oklab, var(--navy) 18%, transparent)",
                  display: "block",
                  filter: "none",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                }}
              />
            </Box>

            <Stack
              key={activeFaculty.email}
              className="faculty-active-copy"
              spacing={{ xs: 3, md: 3.5 }}
              sx={{
                alignSelf: "center",
                maxWidth: 560,
                minWidth: 0,
                position: "relative",
                zIndex: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                    fontSize: {
                      xs: "clamp(34px, 9.5vw, 44px)",
                      sm: "clamp(42px, 6.2vw, 54px)",
                      md: "clamp(44px, 3.5vw, 58px)",
                    },
                    fontWeight: 700,
                    letterSpacing: 0,
                    lineHeight: 1,
                  }}
                >
                  {activeFaculty.subject}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--primary)",
                    fontSize: {
                      xs: "clamp(16px, 4.3vw, 20px)",
                      md: "clamp(18px, 1.4vw, 23px)",
                    },
                    fontWeight: 600,
                    mt: 2,
                  }}
                >
                  {activeFaculty.role}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: {
                    xs: "clamp(15px, 4vw, 18px)",
                    md: "clamp(16px, 1.25vw, 20px)",
                  },
                  lineHeight: 1.45,
                  maxWidth: 460,
                }}
              >
                {activeFaculty.bio}
              </Typography>

              <Stack spacing={2.1} sx={{ pt: 1 }}>
                <DetailRow icon={<EmailOutlinedIcon fontSize="inherit" />}>
                  {activeFaculty.email}
                </DetailRow>
                <DetailRow icon={<LocalPhoneOutlinedIcon fontSize="inherit" />}>
                  {activeFaculty.phone}
                </DetailRow>
                <DetailRow icon={<SchoolOutlinedIcon fontSize="inherit" />}>
                  {activeFaculty.education}
                </DetailRow>
                <DetailRow icon={<WorkOutlineRoundedIcon fontSize="inherit" />}>
                  {activeFaculty.experience}
                </DetailRow>
              </Stack>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {facultyMembers.map((member, index) => (
                  <Avatar
                    key={member.email}
                    src={member.image}
                    alt={member.fullName}
                    onClick={() => showFaculty(index)}
                    sx={{
                      border:
                        index === activeIndex
                          ? "2px solid var(--primary)"
                          : "2px solid color-mix(in oklab, var(--primary) 14%, transparent)",
                      cursor: "pointer",
                      filter: "none",
                      height: 42,
                      opacity: index === activeIndex ? 1 : 0.56,
                      transition: "opacity 200ms ease, border-color 200ms ease",
                      width: 42,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
