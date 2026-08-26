import { useEffect, useRef } from "react";
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
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";

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

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_scale;
  uniform float u_detail;
  uniform float u_glow;
  uniform float u_coreSize;
  uniform float u_swirl;
  uniform float u_fold;
  uniform float u_blackPoint;
  uniform float u_brightness;
  uniform float u_grain;
  uniform float u_grainIntensity;
  uniform float u_mouseStrength;
  uniform float u_opacity;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p = rotate2d(0.62 + u_fold) * p * (1.8 + u_detail * 0.08);
      amplitude *= 0.52;
    }
    return value;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    vec2 mouse = (u_mouse - 0.5) * aspect;
    float distToMouse = length(p - mouse);
    float mousePull = exp(-distToMouse * 4.0) * u_mouseStrength;

    float angle = atan(p.y, p.x);
    float radius = length(p);
    p += vec2(cos(angle * 2.0 + u_time), sin(angle * 2.0 - u_time)) * radius * 0.16 * u_swirl;
    p += normalize(mouse - p + 0.0001) * mousePull * 0.16;

    float flowA = fbm(p * u_scale + vec2(u_time * 0.28, -u_time * 0.18));
    float flowB = fbm((p + flowA) * (u_scale * 0.66) - vec2(u_time * 0.16, u_time * 0.24));
    float molten = smoothstep(u_blackPoint, 1.0, flowA * 0.56 + flowB * 0.7);
    float core = smoothstep(u_coreSize, 0.88, molten);
    float shine = pow(max(0.0, molten), 2.4) * u_glow;

    vec3 color = mix(u_color1, u_color2, smoothstep(0.15, 0.9, molten));
    color = mix(color, u_color3, smoothstep(0.7, 1.0, core) * 0.55);
    color += shine * u_color2 * 0.3;
    color *= u_brightness;

    if (u_grain > 0.5) {
      color += (hash(uv * u_resolution + u_time) - 0.5) * u_grainIntensity;
    }

    float vignette = smoothstep(0.95, 0.2, radius);
    gl_FragColor = vec4(color * vignette, u_opacity);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function MoltenMetal({
  color1 = "#2f80ed",
  color2 = "#8fc7ff",
  color3 = "#FFFFFF",
  speed = 0.35,
  scale = 4,
  detail = 3,
  glow = 1.6,
  coreSize = 0.1,
  swirl = 1,
  fold = -0.2,
  blackPoint = 0.05,
  brightness = 1.3,
  colorMode = "molten",
  grain = false,
  grainIntensity = 0.05,
  mouseInteraction = false,
  mouseStrength = 0.3,
  opacity = 1,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true });
    if (!gl) return undefined;

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      time: gl.getUniformLocation(program, "u_time"),
      color1: gl.getUniformLocation(program, "u_color1"),
      color2: gl.getUniformLocation(program, "u_color2"),
      color3: gl.getUniformLocation(program, "u_color3"),
      scale: gl.getUniformLocation(program, "u_scale"),
      detail: gl.getUniformLocation(program, "u_detail"),
      glow: gl.getUniformLocation(program, "u_glow"),
      coreSize: gl.getUniformLocation(program, "u_coreSize"),
      swirl: gl.getUniformLocation(program, "u_swirl"),
      fold: gl.getUniformLocation(program, "u_fold"),
      blackPoint: gl.getUniformLocation(program, "u_blackPoint"),
      brightness: gl.getUniformLocation(program, "u_brightness"),
      grain: gl.getUniformLocation(program, "u_grain"),
      grainIntensity: gl.getUniformLocation(program, "u_grainIntensity"),
      mouseStrength: gl.getUniformLocation(program, "u_mouseStrength"),
      opacity: gl.getUniformLocation(program, "u_opacity"),
    };
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const rgb3 = hexToRgb(color3);
    let frameId = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (time) => {
      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uniforms.time, time * 0.001 * speed);
      gl.uniform3fv(uniforms.color1, colorMode === "molten" ? rgb1 : rgb2);
      gl.uniform3fv(uniforms.color2, rgb2);
      gl.uniform3fv(uniforms.color3, rgb3);
      gl.uniform1f(uniforms.scale, scale);
      gl.uniform1f(uniforms.detail, detail);
      gl.uniform1f(uniforms.glow, glow);
      gl.uniform1f(uniforms.coreSize, coreSize);
      gl.uniform1f(uniforms.swirl, swirl);
      gl.uniform1f(uniforms.fold, fold);
      gl.uniform1f(uniforms.blackPoint, blackPoint);
      gl.uniform1f(uniforms.brightness, brightness);
      gl.uniform1f(uniforms.grain, grain ? 1 : 0);
      gl.uniform1f(uniforms.grainIntensity, grainIntensity);
      gl.uniform1f(
        uniforms.mouseStrength,
        mouseInteraction ? mouseStrength : 0,
      );
      gl.uniform1f(uniforms.opacity, opacity);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [
    blackPoint,
    brightness,
    color1,
    color2,
    color3,
    colorMode,
    coreSize,
    detail,
    fold,
    glow,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
    scale,
    speed,
    swirl,
  ]);

  const handlePointerMove = (event) => {
    if (!mouseInteraction || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: 1 - (event.clientY - rect.top) / rect.height,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(143,199,255,0.34), rgba(47,128,237,0.22) 42%, transparent 76%)",
        display: "block",
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
      }}
    />
  );
}

const stackCards = [
  {
    eyebrow: "01 / Vision",
    title: "Future Ready Learning",
    color:
      "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--electric) 74%, var(--glow)))",
    shadow: "color-mix(in oklab, var(--electric) 42%, transparent)",
    icon: AutoAwesomeRoundedIcon,
    visual: "lines",
    copy: "To make advanced AI and technology education accessible, practical, and confidence-building for every learner.",
    points: [
      "Accessible AI education for beginners",
      "Project-first learning with real outcomes",
      "Skills that stay useful beyond trends",
    ],
  },
  {
    eyebrow: "02 / Mission",
    title: "Build Real Capability",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--electric) 86%, white), color-mix(in oklab, var(--navy) 54%, var(--primary)))",
    shadow: "color-mix(in oklab, var(--primary) 46%, transparent)",
    icon: TrackChangesRoundedIcon,
    visual: "play",
    copy: "Our mission is to guide students from curiosity to career-ready practice through mentorship, labs, and portfolio projects.",
    points: [
      "Live mentor-led classes",
      "Hands-on assignments after every module",
      "Personal feedback and doubt clearing",
    ],
  },
  {
    eyebrow: "03 / Learning",
    title: "Practice Over Theory",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--glow) 72%, var(--electric)), color-mix(in oklab, var(--primary) 82%, var(--navy)))",
    shadow: "color-mix(in oklab, var(--glow) 36%, transparent)",
    icon: MenuBookRoundedIcon,
    visual: "book",
    copy: "Each topic moves from concept to guided demo to independent build, so students learn by doing instead of memorizing.",
    points: [
      "Short explanations with strong examples",
      "Code labs, notebooks, and mini builds",
      "Revision-friendly resources and recordings",
    ],
  },
  {
    eyebrow: "04 / Community",
    title: "Grow With Mentors",
    color:
      "linear-gradient(135deg, color-mix(in oklab, var(--electric) 68%, white), color-mix(in oklab, var(--navy) 70%, var(--electric)))",
    shadow: "color-mix(in oklab, var(--electric) 34%, transparent)",
    icon: GroupsRoundedIcon,
    visual: "people",
    copy: "We want students to feel supported, visible, and ready to ask better questions as they move through the program.",
    points: [
      "Small batches for better attention",
      "Peer learning and weekly checkpoints",
      "Career guidance with portfolio reviews",
    ],
  },
];

const principles = [
  {
    icon: SchoolRoundedIcon,
    title: "Clarity First",
    copy: "Complex ideas are taught with simple language, visual examples, and repeated practice.",
  },
  {
    icon: TrackChangesRoundedIcon,
    title: "Outcome Focused",
    copy: "Every course points toward a visible student outcome: a skill, project, demo, or portfolio piece.",
  },
  {
    icon: GroupsRoundedIcon,
    title: "Mentor Supported",
    copy: "Learners get structure, feedback, and encouragement while they build technical confidence.",
  },
];

function CardVisual({ type }) {
  if (type === "play") {
    return (
      <Box className="vm-card-visual">
        <PlayArrowRoundedIcon sx={{ color: "#fff", fontSize: 112 }} />
      </Box>
    );
  }

  if (type === "people") {
    return (
      <Box className="vm-card-visual">
        <GroupsRoundedIcon sx={{ color: "#fff", fontSize: 104 }} />
      </Box>
    );
  }

  if (type === "book") {
    return (
      <Box className="vm-card-visual">
        <MenuBookRoundedIcon sx={{ color: "#fff", fontSize: 104 }} />
      </Box>
    );
  }

  return (
    <Box className="vm-card-visual">
      <Box className="vm-line vm-line-short" />
      <Box className="vm-line vm-line-mid" />
      <Box className="vm-line vm-line-long" />
    </Box>
  );
}

export default function VisionMission() {
  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes vmFadeUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(28px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "@keyframes vmFloat": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-12px)" },
          },
          ".vm-page": {
            background:
              "radial-gradient(circle at 50% 10%, color-mix(in oklab, var(--electric) 12%, transparent), transparent 30%), linear-gradient(180deg, #ffffff 0%, var(--background) 48%, color-mix(in oklab, var(--primary) 5%, var(--background)) 100%)",
          },
          ".dark .vm-page": {
            background:
              "radial-gradient(circle at 50% 10%, color-mix(in oklab, var(--electric) 14%, transparent), transparent 30%), var(--background)",
          },
          ".vm-hero-copy": {
            animation: "vmFadeUp 700ms ease both",
          },
          ".vm-card": {
            animation: "vmFadeUp 700ms ease both",
          },
          ".vm-card-visual": {
            alignItems: "center",
            border: "8px solid rgba(255,255,255,0.96)",
            borderRadius: "22px",
            display: "flex",
            height: "clamp(140px, 18vw, 240px)",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            width: "min(42vw, 430px)",
          },
          ".vm-line": {
            background: "#fff",
            borderRadius: "999px",
            height: "10px",
            left: "50%",
            position: "absolute",
            transform: "translateX(-50%)",
          },
          ".vm-line-short": {
            top: "35%",
            width: "26%",
          },
          ".vm-line-mid": {
            top: "50%",
            width: "34%",
          },
          ".vm-line-long": {
            top: "65%",
            width: "44%",
          },
          ".vm-floating-chip": {
            animation: "vmFloat 4.5s ease-in-out infinite",
          },
          "@media (max-width: 899px)": {
            ".vm-card-visual": {
              borderWidth: "6px",
              width: "100%",
            },
          },
        }}
      />
      <CursorEffect />
      <Navbar />

      <Box
        component="main"
        className="vm-page"
        sx={{
          color: "var(--foreground)",
          minHeight: "100vh",
          overflow: "clip",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 10%, transparent) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            inset: 0,
            maskImage:
              "radial-gradient(circle at 50% 18%, black, transparent 68%)",
            opacity: 0.22,
            pointerEvents: "none",
            position: "fixed",
          }}
        />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: "none",
            pb: { xs: 10, md: 14 },
            px: { xs: 2, sm: 4, lg: 8 },
            position: "relative",
            pt: 0,
            width: "100%",
          }}
        >
          <Stack
            className="vm-hero-copy"
            spacing={3}
            sx={{
              alignItems: "center",
              height: "50vh",
              justifyContent: "center",
              mb: { xs: 7, md: 10 },
              minHeight: { xs: 470, md: 540 },
              ml: "calc(50% - 50vw)",
              mr: "calc(50% - 50vw)",
              overflow: "hidden",
              position: "relative",
              pt: { xs: 10, md: 12 },
              textAlign: "center",
              width: "100vw",
            }}
          >
            <MoltenMetal
              color1="#2f80ed"
              color2="#8fc7ff"
              color3="#FFFFFF"
              speed={0.35}
              scale={4}
              detail={3}
              glow={1.6}
              coreSize={0.1}
              swirl={1}
              fold={-0.2}
              blackPoint={0.05}
              brightness={1.3}
              colorMode="molten"
              grain
              grainIntensity={0.05}
              mouseInteraction
              mouseStrength={0.3}
              opacity={1}
            />
            <Box
              sx={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--background) 72%, transparent), color-mix(in oklab, var(--background) 36%, transparent) 66%, color-mix(in oklab, var(--background) 62%, transparent))",
                inset: 0,
                pointerEvents: "none",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Stack
              spacing={3}
              sx={{
                alignItems: "center",
                px: 2,
                position: "relative",
                zIndex: 2,
              }}
            >
              <Chip
                label="Vision & Mission"
                sx={{
                  bgcolor:
                    "color-mix(in oklab, var(--primary) 8%, var(--card))",
                  border:
                    "1px solid color-mix(in oklab, var(--primary) 18%, transparent)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  letterSpacing: 0,
                }}
              />
              <Typography
                component="h1"
                sx={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-display)",
                  fontSize: { xs: 52, sm: 76, md: 96 },
                  fontWeight: 800,
                  letterSpacing: 0,
                  lineHeight: 0.96,
                  maxWidth: 980,
                  textShadow:
                    "0 18px 56px color-mix(in oklab, var(--primary) 12%, transparent)",
                }}
              >
                Stack Completed!
              </Typography>
              <Typography
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: { xs: 18, md: 24 },
                  lineHeight: 1.55,
                  maxWidth: 780,
                  textShadow: "none",
                }}
              >
                Scroll down to reveal how Knora Academy turns vision into daily
                learning, guided practice, and student growth.
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              minHeight: {
                xs: `${stackCards.length * 92}vh`,
                md: `${stackCards.length * 96}vh`,
              },
              position: "relative",
            }}
          >
            {stackCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Box
                  key={card.title}
                  className="vm-card"
                  sx={{
                    background: card.color,
                    borderRadius: { xs: "28px", md: "40px" },
                    boxShadow: `0 40px 90px ${card.shadow}`,
                    color: "#fff",
                    display: "grid",
                    gap: { xs: 4, md: 6 },
                    gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                    minHeight: { xs: 520, md: 430 },
                    overflow: "hidden",
                    p: { xs: 3, sm: 5, md: 6 },
                    position: "sticky",
                    top: { xs: 104 + index * 12, md: 112 + index * 18 },
                    transform: {
                      xs: `scale(${1 - index * 0.012})`,
                      md: `scale(${1 - index * 0.018})`,
                    },
                    transformOrigin: "top center",
                    zIndex: 20 + index,
                  }}
                >
                  <Stack spacing={3} sx={{ justifyContent: "space-between" }}>
                    <Box>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", mb: 3 }}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            bgcolor: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.24)",
                            borderRadius: "18px",
                            display: "flex",
                            height: 48,
                            justifyContent: "center",
                            width: 48,
                          }}
                        >
                          <Icon sx={{ color: "#fff" }} />
                        </Box>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.76)",
                            fontSize: 13,
                            fontWeight: 800,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                          }}
                        >
                          {card.eyebrow}
                        </Typography>
                      </Stack>

                      <Typography
                        component="h2"
                        sx={{
                          fontFamily: "var(--font-display)",
                          fontSize: { xs: 40, sm: 52, md: 62 },
                          fontWeight: 800,
                          letterSpacing: 0,
                          lineHeight: 1,
                          maxWidth: 620,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.78)",
                          fontSize: { xs: 17, md: 21 },
                          lineHeight: 1.55,
                          maxWidth: 650,
                          mt: 3,
                        }}
                      >
                        {card.copy}
                      </Typography>
                    </Box>

                    <Stack spacing={1.4}>
                      {card.points.map((point) => (
                        <Box
                          key={point}
                          sx={{
                            alignItems: "center",
                            bgcolor: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: "16px",
                            display: "flex",
                            fontSize: { xs: 14, md: 16 },
                            fontWeight: 700,
                            gap: 1.5,
                            p: 1.6,
                          }}
                        >
                          <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
                          {point}
                        </Box>
                      ))}
                    </Stack>
                  </Stack>

                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: { xs: 170, md: "100%" },
                    }}
                  >
                    <CardVisual type={card.visual} />
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              mt: { xs: 10, md: 14 },
            }}
          >
            {principles.map((item, index) => {
              const Icon = item.icon;

              return (
                <Stack
                  key={item.title}
                  className={index === 1 ? "vm-floating-chip" : ""}
                  spacing={2}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.06)",
                    border:
                      "1px solid color-mix(in oklab, var(--primary) 16%, transparent)",
                    borderRadius: "24px",
                    color: "var(--foreground)",
                    p: 3,
                  }}
                >
                  <Icon sx={{ color: "var(--primary)", fontSize: 34 }} />
                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: 0,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--muted-foreground)",
                      fontSize: 16,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.copy}
                  </Typography>
                </Stack>
              );
            })}
          </Box>

          <Stack
            spacing={3}
            sx={{
              alignItems: "center",
              mt: { xs: 10, md: 14 },
              textAlign: "center",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: { xs: 36, md: 56 },
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              Learn. Build. Grow.
            </Typography>
            <Typography
              sx={{
                color: "var(--muted-foreground)",
                fontSize: { xs: 17, md: 20 },
                lineHeight: 1.55,
                maxWidth: 720,
              }}
            >
              Our vision and mission work together: give students practical
              technology skills, then help them turn those skills into visible
              confidence.
            </Typography>
            <Button
              href="/courses"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: "var(--primary)",
                borderRadius: "999px",
                color: "#fff",
                fontWeight: 800,
                px: 4,
                py: 1.5,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "color-mix(in oklab, var(--primary) 86%, white)",
                },
              }}
            >
              Explore Courses
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
