import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import gsap from "gsap";
import CursorEffect from "@/components/CursorEffect";

const IMAGE_COUNT = 40;
const galleryCategories = [
  "Learning Session",
  "Campus Moment",
  "Student Project",
  "Workshop",
  "Mentorship",
];
const galleryDescriptions = [
  "Hands-on practice from a focused Knora classroom session.",
  "A quiet look at the learning environment and student energy.",
  "Project-first work shaped through mentor feedback.",
  "Interactive academy activity with practical AI concepts.",
  "Guided support for students building real confidence.",
];
const galleryImages = Array.from({ length: IMAGE_COUNT }, (_, i) => ({
  index: i,
  src: `https://picsum.photos/seed/ruzix-gallery-${i}/900/1200`,
  alt: `Gallery piece ${i + 1}`,
  category: galleryCategories[i % galleryCategories.length],
  title: `Knora Moment ${String(i + 1).padStart(2, "0")}`,
  description: galleryDescriptions[i % galleryDescriptions.length],
}));

function buildColumns(images, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  images.forEach((img, i) => columns[i % columnCount].push(img));
  return columns;
}

const SPEEDS = [18, 22, 20, 24, 19];

function GalleryColumn({ images, index, onImageClick }) {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const entranceTween = useRef(null);
  const loopTween = useRef(null);

  const direction = index % 2 === 0 ? "up" : "down";
  const speed = SPEEDS[index % SPEEDS.length];
  const loopImages = useMemo(() => [...images, ...images], [images]);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return undefined;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const enterFromBottom = direction === "up";
    gsap.set(outer, {
      y: enterFromBottom ? "22vh" : "-22vh",
      opacity: 0,
    });
    gsap.set(track, { yPercent: direction === "down" ? -50 : 0 });

    entranceTween.current = gsap.to(outer, {
      y: 0,
      opacity: 1,
      duration: 1.3,
      delay: 0.14 * index,
      ease: "power3.out",
      onComplete: () => {
        if (prefersReduced) return;
        loopTween.current = gsap.to(track, {
          yPercent: direction === "down" ? 0 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        });
      },
    });

    return () => {
      entranceTween.current?.kill();
      loopTween.current?.kill();
      gsap.killTweensOf([outer, track]);
    };
  }, [direction, index, speed]);

  return (
    <Box
      ref={outerRef}
      sx={{
        position: "relative",
        height: "100%",
        minWidth: 0,
        flex: 1,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "1.4vh", md: "1.8vh" },
          willChange: "transform",
        }}
      >
        {loopImages.map((img, i) => (
          <Box
            key={`${img.index}-${i}`}
            onClick={() => onImageClick(img.index)}
            sx={{
              position: "relative",
              height: { xs: "24vh", sm: "28vh", md: "31vh" },
              flex: "0 0 auto",
              overflow: "hidden",
              border:
                "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "var(--card)",
              "&:hover img": { transform: "scale(1.07)" },
              "&:hover .gallery-overlay": {
                opacity: 1,
                transform: "translateY(0)",
              },
            }}
          >
            <Box
              component="img"
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                userSelect: "none",
              }}
            />
            <Box
              className="gallery-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                p: { xs: 1.5, md: 2 },
                background:
                  "linear-gradient(180deg, rgba(3,16,31,0.18), rgba(3,16,31,0.58))",
                backdropFilter: "blur(10px) saturate(135%)",
                opacity: 0,
                transform: "translateY(12px)",
                transition:
                  "opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  background: "rgba(255, 255, 255, 0.14)",
                  p: { xs: 1.2, md: 1.5 },
                  color: "#fff",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.76)",
                    fontSize: "0.66rem",
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {img.category}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.4,
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontSize: { xs: "1.1rem", md: "1.35rem" },
                    fontWeight: 900,
                    lineHeight: 1.05,
                  }}
                >
                  {img.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.7,
                    color: "rgba(255, 255, 255, 0.82)",
                    fontSize: "0.78rem",
                    fontWeight: 650,
                    lineHeight: 1.45,
                  }}
                >
                  {img.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function GalleryColumns({ columnCount, onImageClick }) {
  const columns = useMemo(
    () => buildColumns(galleryImages, columnCount),
    [columnCount],
  );

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: { xs: "1.4vh", md: "1.8vh" },
        px: { xs: "1.4vh", md: "2.2vh" },
        pt: { xs: "1.4vh", md: "2.2vh" },
      }}
    >
      {columns.map((colImages, i) => (
        <GalleryColumn
          key={i}
          index={i}
          images={colImages}
          onImageClick={onImageClick}
        />
      ))}
    </Box>
  );
}

function Lightbox({ index, onClose, onPrev, onNext }) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, onPrev, onNext]);

  const image = open ? galleryImages[index] : null;

  return (
    <>
      {open && (
        <Box
          key="backdrop"
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(3, 16, 31, 0.94)",
            animation: "galleryLightboxFade 0.3s ease-out",
          }}
        >
          <IconButton
            onClick={onClose}
            aria-label="Close preview"
            sx={{
              position: "absolute",
              top: { xs: 14, md: 28 },
              right: { xs: 14, md: 28 },
              color: "#fff",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            sx={{
              position: "absolute",
              left: { xs: 6, md: 24 },
              color: "#fff",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            <ChevronLeft sx={{ fontSize: { xs: 32, md: 44 } }} />
          </IconButton>

          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            sx={{
              position: "absolute",
              right: { xs: 6, md: 24 },
              color: "#fff",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            <ChevronRight sx={{ fontSize: { xs: 32, md: 44 } }} />
          </IconButton>

          <Box
            key={image?.src}
            onClick={(event) => event.stopPropagation()}
            sx={{
              position: "relative",
              maxWidth: "88vw",
              maxHeight: "86vh",
              animation:
                "galleryPreviewIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Box
              component="img"
              src={image?.src}
              alt={image?.alt}
              sx={{
                display: "block",
                width: "auto",
                height: "auto",
                maxWidth: "88vw",
                maxHeight: "86vh",
                borderRadius: "8px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                left: { xs: 10, sm: 16 },
                right: { xs: 10, sm: 16 },
                bottom: { xs: 10, sm: 16 },
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                background: "rgba(255, 255, 255, 0.14)",
                backdropFilter: "blur(14px) saturate(140%)",
                p: { xs: 1.4, sm: 2 },
                color: "#fff",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.74)",
                  fontSize: "0.68rem",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {image?.category}
              </Typography>
              <Typography
                className="font-display"
                sx={{
                  mt: 0.45,
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontSize: { xs: "1.25rem", sm: "1.65rem" },
                  fontWeight: 900,
                  lineHeight: 1.05,
                }}
              >
                {image?.title}
              </Typography>
              <Typography
                sx={{
                  mt: 0.7,
                  maxWidth: 560,
                  color: "rgba(255, 255, 255, 0.82)",
                  fontSize: "0.88rem",
                  fontWeight: 650,
                  lineHeight: 1.5,
                }}
              >
                {image?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default function Gallery() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const columnCount = isXl ? 5 : isLg ? 4 : isMd ? 3 : 2;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageClick = useCallback((i) => setSelectedIndex(i), []);
  const handleClose = useCallback(() => setSelectedIndex(null), []);
  const handlePrev = useCallback(
    () =>
      setSelectedIndex((prev) =>
        prev === null
          ? prev
          : (prev - 1 + galleryImages.length) % galleryImages.length,
      ),
    [],
  );
  const handleNext = useCallback(
    () =>
      setSelectedIndex((prev) =>
        prev === null ? prev : (prev + 1) % galleryImages.length,
      ),
    [],
  );

  return (
    <>
      <CursorEffect />
      <Box
        component="main"
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          bgcolor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 3, md: 4 },
          "@keyframes galleryLightboxFade": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          "@keyframes galleryPreviewIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(18px) scale(0.94)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          },
        }}
      >
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 18%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 32%), radial-gradient(circle at 82% 78%, color-mix(in oklab, var(--glow) 12%, transparent), transparent 36%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            height: {
              xs: "calc(100vh - 7.5rem)",
              md: "calc(100vh - 8.75rem)",
            },
            minHeight: { xs: 520, md: 620 },
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 76%, transparent), color-mix(in oklab, var(--background) 92%, transparent))",
          }}
        >
          <GalleryColumns
            columnCount={columnCount}
            onImageClick={handleImageClick}
          />
        </Box>

        <Lightbox
          index={selectedIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Box>
    </>
  );
}
