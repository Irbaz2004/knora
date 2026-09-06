// src/components/ParticleField.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "@/lib/journey";
import {
  annNetworkFormation,
  buildAnnLayerEdges,
  buildNeighborEdges,
  chipConvergence,
  deepLearningCourseFormation,
  directorMessageFormation,
  eventCalendarFormation,
  makeRandom,
  morphParticles,
  neuralSphere,
  particleSplashFormation,
  radialDelays,
} from "@/lib/particleTargets";

function useParticleCount() {
  const [count, setCount] = useState(7000);
  useEffect(() => {
    const w = window.innerWidth;
    setCount(w < 360 ? 1800 : w < 640 ? 2600 : w < 1024 ? 4800 : 7600);
  }, []);
  return count;
}

/** Tracks the live on-screen center (in px) of a DOM element, e.g. the
 *  ".hero-visual" box that visually holds the AI orb. This is what lets the
 *  WebGL sphere lock onto the real layout instead of a guessed offset. */
function useAnchorCenterPx(anchorRef) {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const el = anchorRef?.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      setCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    // catch late layout shifts (webfonts, icon loading, etc.)
    const settleTimer = setTimeout(measure, 350);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(settleTimer);
    };
  }, [anchorRef]);

  return center;
}

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aShape;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointScale;
  varying float vShape;
  varying float vGlow;
  varying float vSeed;

  void main() {
    vShape = aShape;
    vSeed = aSeed;
    // Glow is keyed off each particle's own seed, NOT its distance from the
    // world origin — that's what made offset formations fade out before.
    vGlow = 0.55 + 0.45 * aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.85 + 0.15 * sin(uTime * 1.6 + aSeed * 28.0);
    gl_PointSize = aSize * uPixelRatio * uPointScale * tw * (22.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uGlobalAlpha;
  varying float vShape;
  varying float vGlow;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float mask;
    if (vShape > 0.5) {
      float d = max(abs(uv.x), abs(uv.y));
      mask = 1.0 - smoothstep(0.34, 0.46, d);
    } else {
      float d = length(uv);
      mask = 1.0 - smoothstep(0.12, 0.5, d);
    }
    if (mask <= 0.001) discard;

    vec3 deep = vec3(0.02, 0.19, 0.42);
    vec3 electric = vec3(0.02, 0.45, 0.92);
    vec3 pale = vec3(0.66, 0.82, 1.0);
    vec3 col = mix(pale, electric, smoothstep(0.15, 0.9, vSeed));
    col = mix(col, deep, 0.18 * (1.0 - vGlow));
    col = mix(col, vec3(1.0), vGlow * 0.35);

    float alpha = mask * (0.48 + 0.34 * vGlow) * uGlobalAlpha;
    gl_FragColor = vec4(col, alpha);
  }
`;

function ParticleSystem({ heroAnchorRef, heroHoverRef }) {
  const { viewport, size } = useThree();
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const annLinesRef = useRef(null);
  const campusLinesRef = useRef(null);
  const groupRef = useRef(null);
  const hoverRef = useRef(0);
  const pointerWorldRef = useRef({ x: 0, y: 0 });
  const scratchRef = useRef(0);
  const scratchVectorRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef(null);
  const progressRef = useRef(0);
  const count = useParticleCount();

  const vw = Math.max(10, viewport.width);
  const vh = Math.max(6, viewport.height);
  const isNarrow = size.width < 768;
  const sphereR = isNarrow ? 2.05 : Math.min(2.62, vw * 0.125);

  const anchorPx = useAnchorCenterPx(heroAnchorRef);

  // Convert the real screen-space center of the AI orb into world units.
  const heroCenter = useMemo(() => {
    if (isNarrow) return [0, -0.1, 0];
    if (!anchorPx) return [vw * 0.22, -0.1, 0]; // fallback until measured
    const nx = (anchorPx.x - size.width / 2) / size.width;
    const ny = (anchorPx.y - size.height / 2) / size.height;
    return [nx * vw, -ny * vh, 0];
  }, [anchorPx, vw, vh, size.width, size.height, isNarrow]);

  useEffect(() => {
    const updateHover = (e) => {
      const el = heroHoverRef?.current || heroAnchorRef?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const radius = Math.min(rect.width, rect.height) * 0.48;
      const inside = dx * dx + dy * dy < radius * radius;
      hoverRef.current = inside ? 1 : 0;
      if (inside) {
        pointerWorldRef.current = {
          x: heroCenter[0] + (dx / radius) * sphereR,
          y: heroCenter[1] - (dy / radius) * sphereR,
        };
        const last = lastPointerRef.current;
        if (last) {
          const vx = e.clientX - last.x;
          const vy = e.clientY - last.y;
          const speed = Math.min(1, Math.hypot(vx, vy) / 42);
          scratchRef.current = Math.max(scratchRef.current, speed);
          scratchVectorRef.current = {
            x: vx / radius,
            y: -vy / radius,
          };
        }
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      } else {
        lastPointerRef.current = null;
      }
    };

    const clearHover = () => {
      hoverRef.current = 0;
      lastPointerRef.current = null;
    };

    window.addEventListener("pointermove", updateHover, { passive: true });
    window.addEventListener("pointerleave", clearHover);

    return () => {
      window.removeEventListener("pointermove", updateHover);
      window.removeEventListener("pointerleave", clearHover);
    };
  }, [heroAnchorRef, heroHoverRef, heroCenter, sphereR]);

  const courseCenter = useMemo(
    () => [isNarrow ? 0 : -vw * 0.3, isNarrow ? -0.35 : -1.25, 0],
    [isNarrow, vw],
  );

  const data = useMemo(() => {
    const rnd = makeRandom(2024);

    const spherePositions = neuralSphere(count, sphereR, heroCenter, 1337);
    const leftSpherePositions = neuralSphere(
      count,
      Math.min(2.78, vw * 0.16),
      [courseCenter[0], courseCenter[1] + 0.18, 0],
      2028,
    );
    const spreadPositions = annNetworkFormation(
      count,
      Math.min(vw * 0.98, 13),
      Math.min(vh * 0.76, 6.2),
      5.4,
      [0, -0.02, 0],
      5151,
    );
    const directorPositions = directorMessageFormation(
      count,
      vw * 1.02,
      vh * 0.82,
      5.6,
      [0, 0.04, 0],
      3030,
    );
    const wavePositions = deepLearningCourseFormation(
      count,
      Math.min(vw * 0.98, 13.8),
      Math.min(vh * 0.72, 6.1),
      5.4,
      [0, -0.1, 0],
      4242,
    );
    const chipPositions = chipConvergence(count, vw * 0.95, 7777);
    const campusPositions = particleSplashFormation(
      count,
      vw * 1.5,
      vh * 1.28,
      7.2,
      [0, 0, 0],
      6262,
    );
    const eventPositions = eventCalendarFormation(
      count,
      Math.min(vw * 0.82, 10.8),
      Math.min(vh * 0.62, 5.4),
      [0, -0.05, 0],
      9090,
    );

    const sizes = new Float32Array(count);
    const shapes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i] = rnd();
      shapes[i] = rnd() > 0.94 ? 1 : 0;
      sizes[i] =
        (i % 9 === 0 ? 1.45 : shapes[i] === 1 ? 1.2 : 0.82) + rnd() * 0.62;
    }

    return {
      spherePositions,
      leftSpherePositions,
      directorPositions,
      spreadPositions,
      wavePositions,
      chipPositions,
      campusPositions,
      eventPositions,
      sizes,
      shapes,
      seeds,
      explodeDelays: radialDelays(leftSpherePositions, false),
      spreadDelays: radialDelays(directorPositions, false),
      travelDelays: radialDelays(spherePositions, true),
      waveDelays: radialDelays(spreadPositions, false),
      chipDelays: radialDelays(wavePositions, true),
      campusDelays: radialDelays(chipPositions, false),
      eventDelays: radialDelays(campusPositions, false),
      live: new Float32Array(spherePositions),
      render: new Float32Array(spherePositions),
    };
  }, [count, vw, vh, sphereR, heroCenter, courseCenter]);

  // Nodes + edges computed once per formation-set from the sphere topology,
  // then rendered as lines indexed into the SAME position buffer as the
  // points — so they morph in lockstep with the particles automatically.
  const edgeIndices = useMemo(
    () => buildNeighborEdges(data.spherePositions, 420, 3, 1.15),
    [data],
  );
  const annEdgeIndices = useMemo(() => buildAnnLayerEdges(), []);
  const campusEdgeIndices = useMemo(() => buildAnnLayerEdges(), []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.render, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    g.setAttribute("aShape", new THREE.BufferAttribute(data.shapes, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
    g.attributes.position.setUsage(THREE.DynamicDrawUsage);
    return g;
  }, [data]);

  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.render, 3));
    g.setIndex(new THREE.BufferAttribute(edgeIndices, 1));
    g.attributes.position.setUsage(THREE.DynamicDrawUsage);
    return g;
  }, [data, edgeIndices]);

  const annLineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.render, 3));
    g.setIndex(new THREE.BufferAttribute(annEdgeIndices, 1));
    g.attributes.position.setUsage(THREE.DynamicDrawUsage);
    return g;
  }, [data, annEdgeIndices]);

  const campusLineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.render, 3));
    g.setIndex(new THREE.BufferAttribute(campusEdgeIndices, 1));
    g.attributes.position.setUsage(THREE.DynamicDrawUsage);
    return g;
  }, [data, campusEdgeIndices]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uPointScale: { value: 1 },
          uGlobalAlpha: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0x6ba8ff),
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const annLineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0x0572ea),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const campusLineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0x0572ea),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);
  useEffect(() => () => annLineGeometry.dispose(), [annLineGeometry]);
  useEffect(() => () => campusLineGeometry.dispose(), [campusLineGeometry]);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => lineMaterial.dispose(), [lineMaterial]);
  useEffect(() => () => annLineMaterial.dispose(), [annLineMaterial]);
  useEffect(() => () => campusLineMaterial.dispose(), [campusLineMaterial]);

  useFrame((state, delta) => {
    const targetProgress = journey.reducedMotion
      ? Math.round(journey.progress * 4) / 4
      : journey.progress;
    progressRef.current = journey.reducedMotion
      ? targetProgress
      : THREE.MathUtils.damp(progressRef.current, targetProgress, 9, delta);
    const p = progressRef.current;
    const t = state.clock.elapsedTime;
    material.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    material.uniforms.uTime.value = t;
    const directorQuiet =
      THREE.MathUtils.smoothstep(p, 0.145, 0.18) *
      (1 - THREE.MathUtils.smoothstep(p, 0.3, 0.34));
    material.uniforms.uPointScale.value = THREE.MathUtils.lerp(
      1,
      1.42,
      directorQuiet,
    );
    material.uniforms.uGlobalAlpha.value = THREE.MathUtils.lerp(
      1,
      0.78,
      directorQuiet,
    );

    const {
      spherePositions,
      leftSpherePositions,
      directorPositions,
      spreadPositions,
      wavePositions,
      chipPositions,
      campusPositions,
      eventPositions,
      live,
      render,
    } = data;

    const travelStart = 0.068;
    const travelEnd = 0.145;
    const directorStart = 0.17;
    const directorEnd = 0.235;
    const spreadStart = 0.3;
    const spreadEnd = 0.34;
    const waveStart = 0.41;
    const waveEnd = 0.5;
    const chipStart = 0.56;
    const chipEnd = 0.64;
    const campusStart = 0.74;
    const campusEnd = 0.8;
    // Keep campus dedicated to a full-screen particle splash; events form on the next scene.
    const eventStart = 0.9;
    const eventEnd = 0.96;
    const travelProgress = THREE.MathUtils.clamp(
      (p - travelStart) / (travelEnd - travelStart),
      0,
      1,
    );
    const directorProgress = THREE.MathUtils.clamp(
      (p - directorStart) / (directorEnd - directorStart),
      0,
      1,
    );
    const spreadProgress = THREE.MathUtils.clamp(
      (p - spreadStart) / (spreadEnd - spreadStart),
      0,
      1,
    );
    const waveProgress = THREE.MathUtils.clamp(
      (p - waveStart) / (waveEnd - waveStart),
      0,
      1,
    );
    const chipProgress = THREE.MathUtils.clamp(
      (p - chipStart) / (chipEnd - chipStart),
      0,
      1,
    );
    const eventProgress = THREE.MathUtils.clamp(
      (p - eventStart) / (eventEnd - eventStart),
      0,
      1,
    );
    const campusProgress = THREE.MathUtils.clamp(
      (p - campusStart) / (campusEnd - campusStart),
      0,
      1,
    );

    if (p < travelStart) {
      live.set(spherePositions);
    } else if (p < travelEnd) {
      morphParticles(
        spherePositions,
        leftSpherePositions,
        travelProgress,
        live,
        data.travelDelays,
        0.22,
      );
    } else if (p < directorStart) {
      live.set(leftSpherePositions);
    } else if (p < directorEnd) {
      morphParticles(
        leftSpherePositions,
        directorPositions,
        directorProgress,
        live,
        data.explodeDelays,
        0.3,
      );
    } else if (p < spreadStart) {
      live.set(directorPositions);
    } else if (p < spreadEnd) {
      morphParticles(
        directorPositions,
        spreadPositions,
        spreadProgress,
        live,
        data.spreadDelays,
        0.28,
      );
    } else if (p < waveStart) {
      live.set(spreadPositions);
    } else if (p < waveEnd) {
      morphParticles(
        spreadPositions,
        wavePositions,
        waveProgress,
        live,
        data.waveDelays,
        0.34,
      );
    } else if (p < chipStart) {
      live.set(wavePositions);
    } else if (p < chipEnd) {
      morphParticles(
        wavePositions,
        chipPositions,
        chipProgress,
        live,
        data.chipDelays,
        0.32,
      );
    } else if (p < campusStart) {
      live.set(chipPositions);
    } else if (p < campusEnd) {
      morphParticles(
        chipPositions,
        campusPositions,
        campusProgress,
        live,
        data.campusDelays,
        0.3,
      );
    } else if (p < eventStart) {
      live.set(campusPositions);
    } else if (p < eventEnd) {
      morphParticles(
        campusPositions,
        eventPositions,
        eventProgress,
        live,
        data.eventDelays,
        0.3,
      );
    } else {
      live.set(eventPositions);
    }

    const movingSphereCenterX = THREE.MathUtils.lerp(
      heroCenter[0],
      courseCenter[0],
      travelProgress,
    );
    const movingSphereCenterY = THREE.MathUtils.lerp(
      heroCenter[1],
      courseCenter[1],
      travelProgress,
    );
    const breatheCenterX = p < spreadStart ? movingSphereCenterX : 0;
    const breatheCenterY = p < spreadStart ? movingSphereCenterY : 0;
    if (!pointsRef.current) return;
    const hoverState = pointsRef.current.userData.hover || 0;
    const hover = THREE.MathUtils.damp(hoverState, hoverRef.current, 8, delta);
    pointsRef.current.userData.hover = hover;
    scratchRef.current = THREE.MathUtils.damp(
      scratchRef.current,
      0,
      5.8,
      delta,
    );
    const scratch = scratchRef.current;
    const scratchVector = scratchVectorRef.current;
    const pointerWorld = pointerWorldRef.current;
    const sphereLike = 1 - THREE.MathUtils.smoothstep(p, 0.035, travelStart);
    const breathe = journey.reducedMotion
      ? 1
      : 1 + Math.sin(t * 0.75) * 0.02 + hover * 0.17 * sphereLike;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x = live[i3];
      let y = live[i3 + 1];
      let z = live[i3 + 2];
      const seed = data.seeds[i];
      const looseMotion = THREE.MathUtils.clamp(
        (p - spreadEnd) / (chipStart - spreadEnd),
        0,
        1,
      );
      const chipMotion = THREE.MathUtils.clamp(
        (p - chipStart) / (chipEnd - chipStart),
        0,
        1,
      );
      if (p > spreadEnd && p < chipStart) {
        const flow = looseMotion * (1 - chipMotion);
        x += Math.sin(t * 0.35 + seed * 18) * 0.07 * flow;
        y += Math.sin(t * 0.55 + seed * 26) * 0.045 * flow;
        z += Math.cos(t * 0.42 + seed * 20) * 0.055 * flow;
      } else if (p >= chipStart) {
        const pulse = Math.sin(t * 0.95 + seed * 9) * 0.028 * chipProgress;
        x += pulse;
        y += Math.cos(t * 0.72 + seed * 12) * 0.022 * chipProgress;
      }
      x = breatheCenterX + (x - breatheCenterX) * breathe;
      y = breatheCenterY + (y - breatheCenterY) * breathe;
      if (
        !journey.reducedMotion &&
        sphereLike > 0.001 &&
        (hover > 0.01 || scratch > 0.01)
      ) {
        const dx = x - pointerWorld.x;
        const dy = y - pointerWorld.y;
        const localDistance = dx * dx + dy * dy;
        const localPull = Math.exp(-localDistance * 0.95);
        const seedPush = 0.7 + seed * 0.75;
        const globalPush = hover * 0.045 * sphereLike;
        const scratchPush = scratch * localPull * sphereLike;
        const len = Math.max(0.001, Math.hypot(dx, dy));
        x += (x - breatheCenterX) * globalPush;
        y += (y - breatheCenterY) * globalPush;
        x += (dx / len + scratchVector.x * 2.1) * scratchPush * seedPush;
        y += (dy / len + scratchVector.y * 2.1) * scratchPush * seedPush;
        z += Math.sin(seed * 44 + t * 1.6) * scratchPush * 0.9;
      }
      render[i3] = x;
      render[i3 + 1] = y;
      render[i3 + 2] = z;
    }
    geometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.position.needsUpdate = true;
    annLineGeometry.attributes.position.needsUpdate = true;
    campusLineGeometry.attributes.position.needsUpdate = true;

    // Keep connection lines only while the particle structure is sphere-like.
    // The spread/wave states are dot-driven so they stay clean behind content.
    lineMaterial.opacity =
      p < travelEnd ? THREE.MathUtils.lerp(0.18, 0.045, travelProgress) : 0;
    annLineMaterial.opacity =
      THREE.MathUtils.smoothstep(p, 0.305, 0.34) *
      (1 - THREE.MathUtils.smoothstep(p, 0.385, 0.43)) *
      0.2;
    campusLineMaterial.opacity = 0;
  });

  return (
    <group ref={groupRef}>
      <points
        ref={pointsRef}
        geometry={geometry}
        material={material}
        frustumCulled={false}
      />
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        material={lineMaterial}
        frustumCulled={false}
      />
      <lineSegments
        ref={annLinesRef}
        geometry={annLineGeometry}
        material={annLineMaterial}
        frustumCulled={false}
      />
      <lineSegments
        ref={campusLinesRef}
        geometry={campusLineGeometry}
        material={campusLineMaterial}
        frustumCulled={false}
      />
    </group>
  );
}

export default function ParticleField({ heroAnchorRef, heroHoverRef }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.35]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ParticleSystem
          heroAnchorRef={heroAnchorRef}
          heroHoverRef={heroHoverRef}
        />
      </Canvas>
    </div>
  );
}
