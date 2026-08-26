import { useEffect, useMemo, useRef, useState } from "react";
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
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";

const wavePositions = {
  top: 26,
  middle: 50,
  bottom: 74,
};

function valueForWave(value, index) {
  return Array.isArray(value) ? (value[index] ?? value[0]) : value;
}

function buildPath(
  baseY,
  lineIndex,
  count,
  distance,
  bendRadius,
  bendStrength,
  mouse,
) {
  const centered = lineIndex - (count - 1) / 2;
  const y = baseY + centered * distance;
  const influence = Math.max(0, 1 - Math.abs(mouse.y - y) / (bendRadius * 9));
  const bend = bendStrength * influence * 10;
  const mouseX = Math.min(86, Math.max(14, mouse.x));
  const leftControl = Math.max(8, mouseX - 18);
  const rightControl = Math.min(92, mouseX + 18);

  return [
    `M -6 ${y}`,
    `C ${leftControl} ${y + bend} ${leftControl} ${y - bend} ${mouseX} ${
      y + bend
    }`,
    `S ${rightControl} ${y - bend} 106 ${y}`,
  ].join(" ");
}

function FloatingLines({
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 8,
  lineDistance = 8,
  bendRadius = 8,
  bendStrength = -2,
  interactive = false,
  parallax = true,
  animationSpeed = 1,
  gradientStart = "#2f80ed",
  gradientMid = "#8fc7ff",
  gradientEnd = "#f8fbff",
}) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const waves = useMemo(
    () => enabledWaves.filter((wave) => wavePositions[wave] != null),
    [enabledWaves],
  );

  const handlePointerMove = (event) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--electric) 14%, transparent), transparent 58%)",
        height: "100%",
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
    >
      <style>
        {`
          @keyframes floating-lines-drift {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -180; }
          }

          @keyframes floating-lines-glow {
            0%, 100% { opacity: 0.34; }
            50% { opacity: 0.78; }
          }
        `}
      </style>
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{
          height: "100%",
          transform: parallax
            ? `translate3d(${(mouse.x - 50) * -0.08}px, ${
                (mouse.y - 50) * -0.08
              }px, 0)`
            : "none",
          transition: "transform 220ms ease-out",
          width: "100%",
        }}
      >
        <defs>
          <linearGradient
            id="floating-lines-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="52%" stopColor={gradientMid} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
          <filter id="floating-lines-blur">
            <feGaussianBlur stdDeviation="0.24" />
          </filter>
        </defs>

        {waves.map((wave, waveIndex) => {
          const count = valueForWave(lineCount, waveIndex);
          const distance = valueForWave(lineDistance, waveIndex);
          const baseY = wavePositions[wave];

          return Array.from({ length: count }).map((_, lineIndex) => {
            const path = buildPath(
              baseY,
              lineIndex,
              count,
              distance,
              bendRadius,
              bendStrength,
              mouse,
            );
            const opacity = 0.18 + lineIndex * (0.5 / Math.max(1, count));

            return (
              <path
                key={`${wave}-${lineIndex}`}
                d={path}
                fill="none"
                filter={
                  lineIndex % 3 === 0 ? "url(#floating-lines-blur)" : "none"
                }
                pathLength="180"
                stroke="url(#floating-lines-gradient)"
                strokeDasharray="36 144"
                strokeLinecap="round"
                strokeWidth={lineIndex % 2 === 0 ? 0.42 : 0.26}
                style={{
                  animation: `floating-lines-drift ${
                    9 / animationSpeed
                  }s linear infinite, floating-lines-glow ${
                    4.8 + lineIndex * 0.18
                  }s ease-in-out infinite`,
                  animationDelay: `${waveIndex * -0.8 + lineIndex * -0.12}s`,
                  opacity,
                }}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = parseInt(
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean,
    16,
  );

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const detailMap = {
  low: 4,
  medium: 6,
  high: 9,
};

function GradientWaves({
  horizonColor = "#2f80ed",
  waveColor = "#8fc7ff",
  crestColor = "#FFFFFF",
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = "medium",
  brightness = 1,
  opacity = 1,
  mouseInteraction = false,
  parallaxStrength = 0.5,
  grain = false,
  grainIntensity = 0.05,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;

    let frameId = 0;
    const bandCount = detailMap[detail] ?? detailMap.medium;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawGrain = (width, canvasHeight) => {
      if (!grain) return;

      const spacing = 3;
      const alpha = Math.min(0.18, grainIntensity * 1.8);
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let y = 0; y < canvasHeight; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          const value = Math.floor(Math.random() * 255);
          ctx.fillStyle = `rgba(${value}, ${value}, ${value}, ${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      ctx.restore();
    };

    const render = (time) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const viewHeight = rect.height;
      const t = time * 0.001 * speed;
      const mouseX = (mouseRef.current.x - 0.5) * parallaxStrength;
      const mouseY = (mouseRef.current.y - 0.5) * parallaxStrength;

      ctx.clearRect(0, 0, width, viewHeight);
      ctx.globalAlpha = opacity;

      const sky = ctx.createLinearGradient(0, 0, 0, viewHeight);
      sky.addColorStop(0, "rgba(15, 11, 22, 0.98)");
      sky.addColorStop(0.34, rgba(horizonColor, 0.34 * brightness));
      sky.addColorStop(1, "rgba(12, 8, 20, 0.98)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, viewHeight);

      const horizon = viewHeight * (0.43 + height * 0.006 + mouseY * 0.035);
      const glow = ctx.createRadialGradient(
        width * (0.5 + mouseX * 0.08),
        horizon + viewHeight * 0.08,
        0,
        width * 0.5,
        horizon + viewHeight * 0.08,
        width * 0.84,
      );
      glow.addColorStop(0, rgba(crestColor, 0.38 * brightness));
      glow.addColorStop(0.28, rgba(waveColor, 0.58 * brightness));
      glow.addColorStop(0.7, rgba(horizonColor, 0.46 * brightness));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, viewHeight);

      for (let i = 0; i < bandCount; i += 1) {
        const depth = i / Math.max(1, bandCount - 1);
        const y = horizon - viewHeight * 0.12 + depth * viewHeight * 0.3;
        const perspective = Math.pow(depth + 0.04, tilt);
        const waveHeight =
          (amplitude * 16 + swell * (1 - depth) * 0.52) * waveScale * zoom;
        const frequency = (0.9 + depth * 1.6) * waveRatio;
        const phase = t * (0.55 + depth * 0.75) + i * 0.7;
        const alpha = Math.max(0.34, 1 - depth * (fogDepth / 42));

        ctx.beginPath();
        ctx.moveTo(-20, y);

        for (let x = -20; x <= width + 20; x += 12) {
          const normalizedX = x / width;
          const turbulenceWave =
            Math.sin(normalizedX * turbulence * 0.28 + phase * 0.7) * 0.3;
          const wave =
            Math.sin(normalizedX * Math.PI * frequency + phase) +
            Math.sin(normalizedX * Math.PI * frequency * 2.2 - phase * 0.55) *
              0.22 +
            turbulenceWave;
          const lift = wave * waveHeight;
          ctx.lineTo(x, y + lift);
        }

        ctx.lineTo(width + 20, viewHeight + 20);
        ctx.lineTo(-20, viewHeight + 20);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, y - 90, width, viewHeight);
        gradient.addColorStop(0, rgba(horizonColor, alpha * 0.82));
        gradient.addColorStop(0.46, rgba(waveColor, alpha));
        gradient.addColorStop(1, rgba(crestColor, alpha * 0.28));

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 36 * (1 - depth * 0.34);
        ctx.shadowColor = rgba(waveColor, 0.32);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-20, y);
        for (let x = -20; x <= width + 20; x += 18) {
          const normalizedX = x / width;
          const crestWave =
            Math.sin(normalizedX * Math.PI * frequency + phase) +
            Math.sin(normalizedX * Math.PI * frequency * 2.2 - phase * 0.55) *
              0.22;
          ctx.lineTo(x, y + crestWave * waveHeight);
        }
        ctx.strokeStyle = rgba(crestColor, alpha * 0.18);
        ctx.lineWidth = 1.2 + perspective * 1.4;
        ctx.stroke();
      }

      const fog = ctx.createLinearGradient(0, 0, 0, viewHeight);
      fog.addColorStop(0, "rgba(13,10,18,0.22)");
      fog.addColorStop(0.48, "rgba(13,10,18,0.02)");
      fog.addColorStop(1, "rgba(10,7,15,0.36)");
      ctx.shadowBlur = 0;
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, width, viewHeight);

      drawGrain(Math.floor(width), Math.floor(viewHeight));
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [
    amplitude,
    brightness,
    crestColor,
    detail,
    fogDepth,
    grain,
    grainIntensity,
    height,
    horizonColor,
    opacity,
    parallaxStrength,
    speed,
    swell,
    tilt,
    turbulence,
    waveColor,
    waveRatio,
    waveScale,
    zoom,
  ]);

  const handlePointerMove = (event) => {
    if (!mouseInteraction) return;

    const rect = event.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      style={{
        display: "block",
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
      }}
    />
  );
}

const aboutStats = [
  { value: "Hybrid", label: "Online and campus learning" },
  { value: "AI First", label: "Modern practical curriculum" },
  { value: "Mentors", label: "Guided project support" },
];

const aboutCards = [
  {
    icon: SchoolRoundedIcon,
    title: "Practical Learning",
    copy: "Students learn concepts through guided labs, projects, and mentor-led review sessions.",
  },
  {
    icon: GroupsRoundedIcon,
    title: "Small Batches",
    copy: "Focused batches help every learner ask questions, get feedback, and stay visible.",
  },
  {
    icon: VerifiedRoundedIcon,
    title: "Career Confidence",
    copy: "The academy emphasizes portfolio work, presentation skills, and clear technical foundations.",
  },
];

export default function AboutUs() {
  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes aboutFadeUp": {
            "0%": { opacity: 0, transform: "translateY(24px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          ".about-page": {
            background:
              "linear-gradient(180deg, #ffffff 0%, color-mix(in oklab, var(--primary) 8%, var(--background)) 58%, var(--background) 100%)",
          },
          ".dark .about-page": {
            background:
              "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--primary) 10%, var(--background)) 54%, var(--background) 100%)",
          },
          ".about-hero-content": {
            animation: "aboutFadeUp 720ms ease both",
          },
        }}
      />
      <CursorEffect />
      <Navbar />

    </>
  );
}
