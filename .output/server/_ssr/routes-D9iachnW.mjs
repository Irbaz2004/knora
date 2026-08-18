import { i as __toESM } from "../_runtime.mjs";
import { a as BufferGeometry, c as LineBasicMaterial, i as BufferAttribute, l as MathUtils, n as useFrame, o as Color, r as useThree, s as DynamicDrawUsage, t as Canvas, u as ShaderMaterial } from "../_libs/@react-three/fiber+[...].mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { a as ChevronLeftRounded_default, i as ChevronRightRounded_default, k as require_jsx_runtime, n as FormatQuoteRounded_default, o as CalendarMonthRounded_default, r as EmailRounded_default, s as ArrowForwardRounded_default, t as SchoolRounded_default } from "../_libs/@mui/icons-material+[...].mjs";
import { A as Award, C as ClipboardCheck, D as CalendarDays, O as Building2, S as Cpu, T as CircleCheck, _ as Layers, b as FileCheckCorner, c as Sparkles, d as Mouse, f as MonitorPlay, g as Linkedin, h as Mail, i as Users, j as ArrowRight, k as BookOpen, l as Rocket, m as MapPin, o as Target, r as Wifi, t as Youtube, u as Phone, v as Instagram, w as CirclePlay, x as CreditCard, y as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as CursorEffect } from "./CursorEffect-CDHCR_fZ.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { a as IconButton, i as Typography, n as Box, o as GlobalStyles, r as Chip, t as Button } from "../_libs/@mui/material+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D9iachnW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Frame-loop shared state. Mutated imperatively - never triggers React renders. */
var journey = {
	/** master scroll progress 0..1 driven by one GSAP ScrollTrigger */
	progress: 0,
	/** normalized pointer, -1..1 */
	mouseX: 0,
	mouseY: 0,
	reducedMotion: false
};
/**
* Deterministic particle target positions.
* Every array is generated once (seeded PRNG, no Math.random) so that morphs are
* perfectly reversible and never re-randomized inside the render loop.
*/
function makeRandom(seed) {
	let a = seed >>> 0;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var GOLDEN = Math.PI * (3 - Math.sqrt(5));
/** A cleaner hero sphere with visible meridians so rotation reads as true 3D. */
function neuralSphere(count, radius, center = [
	0,
	0,
	0
], seed = 1337) {
	const out = new Float32Array(count * 3);
	const rnd = makeRandom(seed);
	for (let i = 0; i < count; i++) {
		const i3 = i * 3;
		const yy = 1 - i / Math.max(1, count - 1) * 2;
		const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
		const theta = GOLDEN * i;
		const shell = .992 + rnd() * .012;
		const x = Math.cos(theta) * rr * radius * shell;
		const y = yy * radius * shell;
		const z = Math.sin(theta) * rr * radius * shell;
		out[i3] = center[0] + x;
		out[i3 + 1] = center[1] + y;
		out[i3 + 2] = center[2] + z;
	}
	return out;
}
/** Wide, elegant scattered cloud filling the viewport with a bright dense core. */
function scatterCloud(count, width, height, depth, seed = 9021) {
	const out = new Float32Array(count * 3);
	const rnd = makeRandom(seed);
	for (let i = 0; i < count; i++) {
		const bx = Math.pow(rnd(), 1.55) * (rnd() > .5 ? 1 : -1);
		const by = Math.pow(rnd(), 1.35) * (rnd() > .5 ? 1 : -1);
		out[i * 3] = bx * width * .5;
		out[i * 3 + 1] = by * height * .5;
		out[i * 3 + 2] = (rnd() - .5) * depth;
	}
	return out;
}
/** Hybrid learning object: a particle laptop/video console with signal arcs. */
function hybridLearningConsole(count, width, height, center = [
	0,
	0,
	0
], seed = 5050) {
	const out = new Float32Array(count * 3);
	const rnd = makeRandom(seed);
	const w = width;
	const h = height;
	const screenW = w * .62;
	const screenH = h * .56;
	const top = h * .22;
	const bottom = top - screenH;
	const left = -screenW / 2;
	const right = screenW / 2;
	const put = (i, x, y, z = 0) => {
		const i3 = i * 3;
		out[i3] = center[0] + x;
		out[i3 + 1] = center[1] + y;
		out[i3 + 2] = center[2] + z + (rnd() - .5) * .16;
	};
	const putRectEdge = (i, inset = 0) => {
		const t = rnd();
		const side = Math.floor(rnd() * 4);
		const l = left + inset;
		const r = right - inset;
		const tp = top - inset;
		const bt = bottom + inset;
		if (side === 0) put(i, l + t * (r - l), tp);
		else if (side === 1) put(i, r, tp - t * (tp - bt));
		else if (side === 2) put(i, r - t * (r - l), bt);
		else put(i, l, bt + t * (tp - bt));
	};
	for (let i = 0; i < count; i++) {
		const bucket = i % 12;
		if (bucket < 3) putRectEdge(i);
		else if (bucket === 3) putRectEdge(i, .22);
		else if (bucket < 6) {
			const baseW = screenW * (bucket === 4 ? 1.15 : .92);
			const t = rnd();
			const x = -baseW / 2 + t * baseW;
			const y = bottom - .55 + Math.sin(t * Math.PI) * .14;
			put(i, x, y, (rnd() - .5) * .22);
		} else if (bucket === 6) {
			const edge = Math.floor(rnd() * 3);
			const triW = screenW * .14;
			const triH = screenH * .22;
			const t = rnd();
			if (edge === 0) put(i, -triW * .45 + t * triW * .9, bottom + screenH * .52 + triH * .5);
			else if (edge === 1) put(i, -triW * .45 + t * triW * .9, bottom + screenH * .52 - triH * .5);
			else put(i, triW * .5, bottom + screenH * .52 - triH * .5 + t * triH);
		} else if (bucket === 7) {
			const a = rnd() * Math.PI * 2;
			const radius = .36 + rnd() * .22;
			put(i, Math.cos(a) * radius, bottom + screenH * .52 + Math.sin(a) * radius, (rnd() - .5) * .16);
		} else if (bucket < 10) {
			const lane = bucket - 8;
			const t = rnd();
			const x = left + screenW * .16 + t * screenW * .68;
			const y = bottom + screenH * (.22 + lane * .18) + (rnd() - .5) * .05;
			put(i, x, y, (rnd() - .5) * .12);
		} else if (bucket === 10) {
			const arc = Math.floor(rnd() * 3);
			const a = Math.PI * (.18 + rnd() * .64);
			const r = screenW * (.32 + arc * .11);
			put(i, Math.cos(a) * r, top + .2 + Math.sin(a) * r * .34, (rnd() - .5) * .3);
		} else {
			const side = rnd() > .5 ? 1 : -1;
			const a = rnd() * Math.PI * 2;
			const radius = .15 + rnd() * .24;
			const anchorX = side * screenW * (.32 + rnd() * .18);
			const anchorY = bottom + screenH * (.28 + rnd() * .5);
			put(i, anchorX + Math.cos(a) * radius, anchorY + Math.sin(a) * radius, (rnd() - .5) * .36);
		}
	}
	return out;
}
/** Launch events object: calendar board, date grid, clock ring, and marker. */
function eventCalendarFormation(count, width, height, center = [
	0,
	0,
	0
], seed = 9090) {
	const out = new Float32Array(count * 3);
	const rnd = makeRandom(seed);
	const w = width;
	const h = height;
	const left = -w / 2;
	const right = w / 2;
	const top = h / 2;
	const bottom = -h / 2;
	const headerY = top - h * .22;
	const jitter = Math.min(w, h) * .006;
	const put = (i, x, y, z = 0) => {
		const i3 = i * 3;
		out[i3] = center[0] + x + (rnd() - .5) * jitter;
		out[i3 + 1] = center[1] + y + (rnd() - .5) * jitter;
		out[i3 + 2] = center[2] + z + (rnd() - .5) * .08;
	};
	const line = (i, x1, y1, x2, y2, t = rnd()) => {
		put(i, x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
	};
	const rect = (i, x, y, rw, rh, t = rnd()) => {
		const p = t * (rw * 2 + rh * 2);
		if (p < rw) line(i, x - rw / 2, y + rh / 2, x + rw / 2, y + rh / 2, p / rw);
		else if (p < rw + rh) line(i, x + rw / 2, y + rh / 2, x + rw / 2, y - rh / 2, (p - rw) / rh);
		else if (p < rw * 2 + rh) line(i, x + rw / 2, y - rh / 2, x - rw / 2, y - rh / 2, (p - rw - rh) / rw);
		else line(i, x - rw / 2, y - rh / 2, x - rw / 2, y + rh / 2, (p - rw * 2 - rh) / rh);
	};
	const circle = (i, x, y, r, t = rnd(), scaleY = 1) => {
		const a = t * Math.PI * 2;
		put(i, x + Math.cos(a) * r, y + Math.sin(a) * r * scaleY);
	};
	const arc = (i, x, y, r, start, end, t = rnd(), scaleY = 1) => {
		const a = start + (end - start) * t;
		put(i, x + Math.cos(a) * r, y + Math.sin(a) * r * scaleY);
	};
	for (let i = 0; i < count; i++) {
		const n = i / count;
		if (n < .24) rect(i, 0, 0, w, h);
		else if (n < .34) line(i, left, headerY, right, headerY);
		else if (n < .44) {
			const side = Math.floor((n - .34) / .05) === 0 ? -1 : 1;
			const t = (n - .34) % .05 / .05;
			circle(i, side * w * .28, top + h * .015, h * .055, t);
		} else if (n < .58) {
			const local = (n - .44) / .14;
			const cells = 9;
			const cell = Math.min(8, Math.floor(local * cells));
			const cellT = local * cells - cell;
			const col = cell % 3;
			const row = Math.floor(cell / 3);
			const cellW = w * .105;
			const cellH = h * .105;
			const gapX = w * .035;
			const gapY = h * .045;
			const gridW = cellW * 3 + gapX * 2;
			const x = -w * .19 - gridW / 2 + cellW / 2 + col * (cellW + gapX);
			const y = headerY - h * .19 - row * (cellH + gapY);
			rect(i, x, y, cellW, cellH, cellT);
		} else if (n < .78) {
			const local = (n - .58) / .2;
			const rows = 3;
			const row = Math.min(2, Math.floor(local * rows));
			const rowT = local * rows - row;
			const segment = Math.floor(rowT * 4);
			const t = rowT * 4 - segment;
			const rowW = w * .32;
			const rowH = h * .105;
			const x = w * .22;
			const y = headerY - h * .18 - row * h * .17;
			if (segment < 2) rect(i, x, y, rowW, rowH, rowT * 2);
			else {
				const lineY = y + (segment === 2 ? rowH * .13 : -rowH * .13);
				line(i, x - rowW * .28, lineY, x + rowW * .25, lineY, t);
			}
		} else if (n < .88) {
			const local = (n - .78) / .1;
			const row = Math.min(2, Math.floor(local * 3));
			const t = local * 3 - row;
			const x = w * .08;
			const y = headerY - h * .18 - row * h * .17;
			circle(i, x, y, h * .032, t);
		} else if (n < .96) {
			const t = (n - .88) / .08;
			arc(i, -w * .06, bottom - h * .03, w * .2, Math.PI * .16, Math.PI * .84, t, .62);
		} else {
			const t = (n - .96) / .04;
			circle(i, -w * .32, bottom + h * .18, h * .055, t);
		}
	}
	return out;
}
/** Curved streams from both sides converging around a central chip. */
function chipConvergence(count, width, seed = 7777) {
	const out = new Float32Array(count * 3);
	const rnd = makeRandom(seed);
	const chipR = 1.55;
	for (let i = 0; i < count; i++) if (i % 5 === 0) {
		const a = i / count * Math.PI * 2 * 7;
		const r = chipR + rnd() * .5;
		out[i * 3] = Math.cos(a) * r;
		out[i * 3 + 1] = Math.sin(a) * r * .98;
		out[i * 3 + 2] = (rnd() - .5) * .5;
	} else {
		const side = i % 2 === 0 ? -1 : 1;
		const lane = i % 8 - 3.5;
		const t = Math.pow(rnd(), .85);
		const x = side * (1.9 + t * (width * .5 - chipR));
		const curve = Math.sin(t * Math.PI) * lane * .42;
		out[i * 3] = x;
		out[i * 3 + 1] = lane * .16 + curve + (rnd() - .5) * .18;
		out[i * 3 + 2] = Math.sin(t * Math.PI * 1.2) * .9 * (lane > 0 ? 1 : -1);
	}
	return out;
}
var easeInOutCubic = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
var clamp01 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
/**
* Interpolate real XYZ positions between two target arrays.
* `delays` gives each particle a 0..1 stagger so groups move in waves.
*/
function morphParticles(from, to, progress, out, delays, spread = .35) {
	const p = clamp01(progress);
	const n = out.length / 3;
	const span = 1 - spread;
	for (let i = 0; i < n; i++) {
		let local = p;
		if (delays) local = clamp01((p - delays[i] * spread) / span);
		const e = easeInOutCubic(local);
		const i3 = i * 3;
		const fx = from[i3];
		const fy = from[i3 + 1];
		const fz = from[i3 + 2];
		out[i3] = fx + (to[i3] - fx) * e;
		out[i3 + 1] = fy + (to[i3 + 1] - fy) * e;
		out[i3 + 2] = fz + (to[i3 + 2] - fz) * e;
	}
}
/** Stagger keyed on distance from origin: outer particles lead. */
function radialDelays(positions, invert = false) {
	const n = positions.length / 3;
	const out = new Float32Array(n);
	let max = 0;
	for (let i = 0; i < n; i++) {
		const i3 = i * 3;
		const d = Math.hypot(positions[i3], positions[i3 + 1], positions[i3 + 2]);
		out[i] = d;
		if (d > max) max = d;
	}
	for (let i = 0; i < n; i++) {
		const norm = max > 0 ? out[i] / max : 0;
		out[i] = invert ? norm : 1 - norm;
	}
	return out;
}
/**
* Pick a subset of particle indices as "network nodes" and connect each to its
* nearest few neighbor nodes. Returns a flat index array for use with
* BufferGeometry.setIndex() on a lineSegments geometry that SHARES the same
* position buffer as the particle points — so the lines automatically follow
* whatever formation the particles are currently morphed into.
*/
function buildNeighborEdges(positions, targetNodeCount = 420, maxNeighbors = 3, maxDist = 1.15) {
	const total = positions.length / 3;
	const step = Math.max(1, Math.floor(total / targetNodeCount));
	const nodeIdx = [];
	for (let i = 0; i < total; i += step) nodeIdx.push(i);
	const seen = /* @__PURE__ */ new Set();
	const edges = [];
	for (let a = 0; a < nodeIdx.length; a++) {
		const iA = nodeIdx[a];
		const ia = iA * 3;
		const ax = positions[ia];
		const ay = positions[ia + 1];
		const az = positions[ia + 2];
		const dists = [];
		for (let b = 0; b < nodeIdx.length; b++) {
			if (a === b) continue;
			const iB = nodeIdx[b];
			const ib = iB * 3;
			const dx = positions[ib] - ax;
			const dy = positions[ib + 1] - ay;
			const dz = positions[ib + 2] - az;
			dists.push([dx * dx + dy * dy + dz * dz, iB]);
		}
		dists.sort((x, y) => x[0] - y[0]);
		for (let k = 0; k < maxNeighbors && k < dists.length; k++) {
			const [dSq, iB] = dists[k];
			if (Math.sqrt(dSq) > maxDist) continue;
			const lo = Math.min(iA, iB);
			const hi = Math.max(iA, iB);
			const key = lo * 1e5 + hi;
			if (seen.has(key)) continue;
			seen.add(key);
			edges.push(lo, hi);
		}
	}
	return new Uint32Array(edges);
}
function useParticleCount() {
	const [count, setCount] = (0, import_react.useState)(9e3);
	(0, import_react.useEffect)(() => {
		const w = window.innerWidth;
		setCount(w < 640 ? 3200 : w < 1024 ? 6e3 : 1e4);
	}, []);
	return count;
}
/** Tracks the live on-screen center (in px) of a DOM element, e.g. the
*  ".hero-visual" box that visually holds the AI orb. This is what lets the
*  WebGL sphere lock onto the real layout instead of a guessed offset. */
function useAnchorCenterPx(anchorRef) {
	const [center, setCenter] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const el = anchorRef?.current;
		if (!el) return;
		const measure = () => {
			const rect = el.getBoundingClientRect();
			if (rect.width === 0 && rect.height === 0) return;
			setCenter({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			});
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		window.addEventListener("resize", measure);
		const settleTimer = setTimeout(measure, 350);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measure);
			clearTimeout(settleTimer);
		};
	}, [anchorRef]);
	return center;
}
var vertexShader = `
  attribute float aSize;
  attribute float aShape;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
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
    gl_PointSize = aSize * uPixelRatio * tw * (22.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
var fragmentShader = `
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

    vec3 deep = vec3(0.055, 0.235, 0.55);
    vec3 electric = vec3(0.153, 0.462, 0.98);
    vec3 pale = vec3(0.62, 0.80, 1.0);
    vec3 col = mix(pale, electric, smoothstep(0.15, 0.9, vSeed));
    col = mix(col, deep, 0.18 * (1.0 - vGlow));
    col = mix(col, vec3(1.0), vGlow * 0.35);

    float alpha = mask * (0.55 + 0.4 * vGlow) * uGlobalAlpha;
    gl_FragColor = vec4(col, alpha);
  }
`;
function ParticleSystem({ heroAnchorRef, heroHoverRef }) {
	const { viewport, size } = useThree();
	const pointsRef = (0, import_react.useRef)(null);
	const linesRef = (0, import_react.useRef)(null);
	const groupRef = (0, import_react.useRef)(null);
	const hoverRef = (0, import_react.useRef)(0);
	const pointerWorldRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const scratchRef = (0, import_react.useRef)(0);
	const scratchVectorRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const lastPointerRef = (0, import_react.useRef)(null);
	const progressRef = (0, import_react.useRef)(0);
	const count = useParticleCount();
	const vw = Math.max(10, viewport.width);
	const vh = Math.max(6, viewport.height);
	const isNarrow = size.width < 768;
	const sphereR = isNarrow ? 2.05 : Math.min(2.62, vw * .125);
	const anchorPx = useAnchorCenterPx(heroAnchorRef);
	const heroCenter = (0, import_react.useMemo)(() => {
		if (isNarrow) return [
			0,
			-.1,
			0
		];
		if (!anchorPx) return [
			vw * .22,
			-.1,
			0
		];
		const nx = (anchorPx.x - size.width / 2) / size.width;
		const ny = (anchorPx.y - size.height / 2) / size.height;
		return [
			nx * vw,
			-ny * vh - .45,
			0
		];
	}, [
		anchorPx,
		vw,
		vh,
		size.width,
		size.height,
		isNarrow
	]);
	(0, import_react.useEffect)(() => {
		const updateHover = (e) => {
			const el = heroHoverRef?.current || heroAnchorRef?.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const radius = Math.min(rect.width, rect.height) * .48;
			const inside = dx * dx + dy * dy < radius * radius;
			hoverRef.current = inside ? 1 : 0;
			if (inside) {
				pointerWorldRef.current = {
					x: heroCenter[0] + dx / radius * sphereR,
					y: heroCenter[1] - dy / radius * sphereR
				};
				const last = lastPointerRef.current;
				if (last) {
					const vx = e.clientX - last.x;
					const vy = e.clientY - last.y;
					const speed = Math.min(1, Math.hypot(vx, vy) / 42);
					scratchRef.current = Math.max(scratchRef.current, speed);
					scratchVectorRef.current = {
						x: vx / radius,
						y: -vy / radius
					};
				}
				lastPointerRef.current = {
					x: e.clientX,
					y: e.clientY
				};
			} else lastPointerRef.current = null;
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
	}, [
		heroAnchorRef,
		heroHoverRef,
		heroCenter,
		sphereR
	]);
	const courseCenter = (0, import_react.useMemo)(() => [
		isNarrow ? 0 : -vw * .3,
		isNarrow ? -.35 : -1.25,
		0
	], [isNarrow, vw]);
	const data = (0, import_react.useMemo)(() => {
		const rnd = makeRandom(2024);
		const spherePositions = neuralSphere(count, sphereR, heroCenter, 1337);
		const leftSpherePositions = neuralSphere(count, Math.min(2.78, vw * .16), [
			courseCenter[0],
			courseCenter[1] + .18,
			0
		], 2028);
		const spreadPositions = scatterCloud(count, vw * 1.02, vh * .94, 6.5, 9021);
		const wavePositions = hybridLearningConsole(count, Math.min(vw * .92, 12.5), Math.min(vh * .72, 6.2), [
			0,
			-.1,
			0
		], 4242);
		const chipPositions = chipConvergence(count, vw * .95, 7777);
		const eventPositions = eventCalendarFormation(count, Math.min(vw * .82, 10.8), Math.min(vh * .62, 5.4), [
			0,
			-.05,
			0
		], 9090);
		const sizes = new Float32Array(count);
		const shapes = new Float32Array(count);
		const seeds = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			seeds[i] = rnd();
			shapes[i] = rnd() > .94 ? 1 : 0;
			sizes[i] = (i % 9 === 0 ? 1.45 : shapes[i] === 1 ? 1.2 : .82) + rnd() * .62;
		}
		return {
			spherePositions,
			leftSpherePositions,
			spreadPositions,
			wavePositions,
			chipPositions,
			eventPositions,
			sizes,
			shapes,
			seeds,
			explodeDelays: radialDelays(leftSpherePositions, false),
			travelDelays: radialDelays(spherePositions, true),
			waveDelays: radialDelays(spreadPositions, false),
			chipDelays: radialDelays(wavePositions, true),
			eventDelays: radialDelays(chipPositions, false),
			live: new Float32Array(spherePositions),
			render: new Float32Array(spherePositions)
		};
	}, [
		count,
		vw,
		vh,
		sphereR,
		heroCenter,
		courseCenter
	]);
	const edgeIndices = (0, import_react.useMemo)(() => buildNeighborEdges(data.spherePositions, 420, 3, 1.15), [data]);
	const geometry = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(data.render, 3));
		g.setAttribute("aSize", new BufferAttribute(data.sizes, 1));
		g.setAttribute("aShape", new BufferAttribute(data.shapes, 1));
		g.setAttribute("aSeed", new BufferAttribute(data.seeds, 1));
		g.attributes.position.setUsage(DynamicDrawUsage);
		return g;
	}, [data]);
	const lineGeometry = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(data.render, 3));
		g.setIndex(new BufferAttribute(edgeIndices, 1));
		g.attributes.position.setUsage(DynamicDrawUsage);
		return g;
	}, [data, edgeIndices]);
	const material = (0, import_react.useMemo)(() => new ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uPixelRatio: { value: 1 },
			uGlobalAlpha: { value: 1 }
		},
		transparent: true,
		depthWrite: false,
		blending: 1
	}), []);
	const lineMaterial = (0, import_react.useMemo)(() => new LineBasicMaterial({
		color: new Color(7055615),
		transparent: true,
		opacity: .22,
		depthWrite: false,
		blending: 2
	}), []);
	(0, import_react.useEffect)(() => () => geometry.dispose(), [geometry]);
	(0, import_react.useEffect)(() => () => lineGeometry.dispose(), [lineGeometry]);
	(0, import_react.useEffect)(() => () => material.dispose(), [material]);
	(0, import_react.useEffect)(() => () => lineMaterial.dispose(), [lineMaterial]);
	useFrame((state, delta) => {
		const targetProgress = journey.reducedMotion ? Math.round(journey.progress * 4) / 4 : journey.progress;
		progressRef.current = journey.reducedMotion ? targetProgress : MathUtils.damp(progressRef.current, targetProgress, 9, delta);
		const p = progressRef.current;
		const t = state.clock.elapsedTime;
		material.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
		material.uniforms.uTime.value = t;
		const facultyQuiet = MathUtils.smoothstep(p, .145, .17) * (1 - MathUtils.smoothstep(p, .265, .3));
		material.uniforms.uGlobalAlpha.value = MathUtils.lerp(1, .42, facultyQuiet);
		const { spherePositions, leftSpherePositions, spreadPositions, wavePositions, chipPositions, eventPositions, live, render } = data;
		const travelStart = .068;
		const travelEnd = .145;
		const spreadStart = .17;
		const spreadEnd = .255;
		const waveStart = .34;
		const waveEnd = .48;
		const chipStart = .56;
		const chipEnd = .64;
		const eventStart = .64;
		const eventEnd = .69;
		const travelProgress = MathUtils.clamp((p - travelStart) / .07699999999999999, 0, 1);
		const spreadProgress = MathUtils.clamp((p - spreadStart) / .08499999999999999, 0, 1);
		const waveProgress = MathUtils.clamp((p - waveStart) / .13999999999999996, 0, 1);
		const chipProgress = MathUtils.clamp((p - chipStart) / .07999999999999996, 0, 1);
		const eventProgress = MathUtils.clamp((p - eventStart) / .04999999999999993, 0, 1);
		if (p < travelStart) live.set(spherePositions);
		else if (p < travelEnd) morphParticles(spherePositions, leftSpherePositions, travelProgress, live, data.travelDelays, .22);
		else if (p < spreadStart) live.set(leftSpherePositions);
		else if (p < spreadEnd) morphParticles(leftSpherePositions, spreadPositions, spreadProgress, live, data.explodeDelays, .3);
		else if (p < waveStart) live.set(spreadPositions);
		else if (p < waveEnd) morphParticles(spreadPositions, wavePositions, waveProgress, live, data.waveDelays, .34);
		else if (p < chipStart) live.set(wavePositions);
		else if (p < chipEnd) morphParticles(wavePositions, chipPositions, chipProgress, live, data.chipDelays, .32);
		else if (p < eventStart) live.set(chipPositions);
		else if (p < eventEnd) morphParticles(chipPositions, eventPositions, eventProgress, live, data.eventDelays, .3);
		else live.set(eventPositions);
		const movingSphereCenterX = MathUtils.lerp(heroCenter[0], courseCenter[0], travelProgress);
		const movingSphereCenterY = MathUtils.lerp(heroCenter[1], courseCenter[1], travelProgress);
		const breatheCenterX = p < spreadStart ? movingSphereCenterX : 0;
		const breatheCenterY = p < spreadStart ? movingSphereCenterY : 0;
		if (!pointsRef.current) return;
		const hoverState = pointsRef.current.userData.hover || 0;
		const hover = MathUtils.damp(hoverState, hoverRef.current, 8, delta);
		pointsRef.current.userData.hover = hover;
		scratchRef.current = MathUtils.damp(scratchRef.current, 0, 5.8, delta);
		const scratch = scratchRef.current;
		const scratchVector = scratchVectorRef.current;
		const pointerWorld = pointerWorldRef.current;
		const sphereLike = 1 - MathUtils.smoothstep(p, .035, travelStart);
		const breathe = journey.reducedMotion ? 1 : 1 + Math.sin(t * .75) * .02 + hover * .17 * sphereLike;
		for (let i = 0; i < count; i++) {
			const i3 = i * 3;
			let x = live[i3];
			let y = live[i3 + 1];
			let z = live[i3 + 2];
			const seed = data.seeds[i];
			const looseMotion = MathUtils.clamp((p - spreadEnd) / .30500000000000005, 0, 1);
			const chipMotion = MathUtils.clamp((p - chipStart) / .07999999999999996, 0, 1);
			if (p > spreadEnd && p < chipStart) {
				const flow = looseMotion * (1 - chipMotion);
				x += Math.sin(t * .35 + seed * 18) * .07 * flow;
				y += Math.sin(t * .55 + seed * 26) * .045 * flow;
				z += Math.cos(t * .42 + seed * 20) * .055 * flow;
			} else if (p >= chipStart) {
				const pulse = Math.sin(t * .95 + seed * 9) * .028 * chipProgress;
				x += pulse;
				y += Math.cos(t * .72 + seed * 12) * .022 * chipProgress;
			}
			x = breatheCenterX + (x - breatheCenterX) * breathe;
			y = breatheCenterY + (y - breatheCenterY) * breathe;
			if (!journey.reducedMotion && sphereLike > .001 && (hover > .01 || scratch > .01)) {
				const dx = x - pointerWorld.x;
				const dy = y - pointerWorld.y;
				const localDistance = dx * dx + dy * dy;
				const localPull = Math.exp(-localDistance * .95);
				const seedPush = .7 + seed * .75;
				const globalPush = hover * .045 * sphereLike;
				const scratchPush = scratch * localPull * sphereLike;
				const len = Math.max(.001, Math.hypot(dx, dy));
				x += (x - breatheCenterX) * globalPush;
				y += (y - breatheCenterY) * globalPush;
				x += (dx / len + scratchVector.x * 2.1) * scratchPush * seedPush;
				y += (dy / len + scratchVector.y * 2.1) * scratchPush * seedPush;
				z += Math.sin(seed * 44 + t * 1.6) * scratchPush * .9;
			}
			render[i3] = x;
			render[i3 + 1] = y;
			render[i3 + 2] = z;
		}
		geometry.attributes.position.needsUpdate = true;
		lineGeometry.attributes.position.needsUpdate = true;
		lineMaterial.opacity = p < travelEnd ? MathUtils.lerp(.18, .045, travelProgress) : 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: groupRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
			ref: pointsRef,
			geometry,
			material,
			frustumCulled: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			ref: linesRef,
			geometry: lineGeometry,
			material: lineMaterial,
			frustumCulled: false
		})]
	});
}
function ParticleField({ heroAnchorRef, heroHoverRef }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			camera: {
				position: [
					0,
					0,
					12
				],
				fov: 50
			},
			dpr: [1, 1.75],
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleSystem, {
				heroAnchorRef,
				heroHoverRef
			})
		})
	});
}
var course_ai_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20240%20240'%20role='img'%20aria-label='AI%20and%20machine%20learning%20course'%3e%3cdefs%3e%3cradialGradient%20id='aiGlow'%20cx='50%25'%20cy='42%25'%20r='58%25'%3e%3cstop%20offset='0'%20stop-color='%23ffffff'/%3e%3cstop%20offset='.48'%20stop-color='%23a9d1ff'/%3e%3cstop%20offset='1'%20stop-color='%232f80ed'/%3e%3c/radialGradient%3e%3clinearGradient%20id='aiLine'%20x1='36'%20x2='204'%20y1='60'%20y2='188'%3e%3cstop%20stop-color='%232f80ed'/%3e%3cstop%20offset='1'%20stop-color='%237ec8ff'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='240'%20height='240'%20rx='120'%20fill='%23eef7ff'/%3e%3ccircle%20cx='120'%20cy='120'%20r='86'%20fill='url(%23aiGlow)'%20opacity='.32'/%3e%3ccircle%20cx='120'%20cy='120'%20r='68'%20fill='%23ffffff'%20opacity='.74'/%3e%3cpath%20d='M94%2082c-17%204-27%2018-24%2035%202%2011%209%2018%2018%2021-2%2018%2012%2032%2030%2030%208%2012%2028%2010%2035-4%2016-2%2027-14%2026-30%2012-10%2013-28%201-40-2-17-19-28-36-23-13-13-36-8-50%2011Z'%20fill='none'%20stroke='url(%23aiLine)'%20stroke-width='9'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M120%2078v84M94%20115h52M100%20140h36M146%2098c-14%206-22%2018-22%2036'%20fill='none'%20stroke='%232f80ed'%20stroke-width='6'%20stroke-linecap='round'/%3e%3ccircle%20cx='78'%20cy='80'%20r='5'%20fill='%232f80ed'/%3e%3ccircle%20cx='170'%20cy='160'%20r='6'%20fill='%232f80ed'/%3e%3ccircle%20cx='185'%20cy='92'%20r='4'%20fill='%237ec8ff'/%3e%3c/svg%3e";
var course_python_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20240%20240'%20role='img'%20aria-label='Python%20for%20data%20and%20AI%20course'%3e%3cdefs%3e%3clinearGradient%20id='pyCard'%20x1='42'%20x2='198'%20y1='42'%20y2='198'%3e%3cstop%20stop-color='%23dff1ff'/%3e%3cstop%20offset='1'%20stop-color='%232f80ed'/%3e%3c/linearGradient%3e%3cradialGradient%20id='pyGlow'%20cx='50%25'%20cy='48%25'%20r='58%25'%3e%3cstop%20offset='0'%20stop-color='%23ffffff'/%3e%3cstop%20offset='.54'%20stop-color='%23c8e2ff'/%3e%3cstop%20offset='1'%20stop-color='%232f80ed'/%3e%3c/radialGradient%3e%3c/defs%3e%3crect%20width='240'%20height='240'%20rx='120'%20fill='%23eff8ff'/%3e%3ccircle%20cx='120'%20cy='120'%20r='88'%20fill='url(%23pyGlow)'%20opacity='.36'/%3e%3crect%20x='60'%20y='64'%20width='120'%20height='112'%20rx='26'%20fill='%23fff'%20opacity='.78'/%3e%3cpath%20d='M103%2087%2074%20119l29%2034'%20fill='none'%20stroke='url(%23pyCard)'%20stroke-width='13'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M137%2087%20166%20119l-29%2034'%20fill='none'%20stroke='url(%23pyCard)'%20stroke-width='13'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M128%2078%20111%20164'%20fill='none'%20stroke='%232f80ed'%20stroke-width='9'%20stroke-linecap='round'/%3e%3crect%20x='76'%20y='185'%20width='88'%20height='10'%20rx='5'%20fill='%232f80ed'%20opacity='.24'/%3e%3ccircle%20cx='76'%20cy='54'%20r='5'%20fill='%232f80ed'/%3e%3ccircle%20cx='179'%20cy='68'%20r='4'%20fill='%237ec8ff'/%3e%3c/svg%3e";
var course_genai_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20240%20240'%20role='img'%20aria-label='Generative%20AI%20and%20LLM%20course'%3e%3cdefs%3e%3cradialGradient%20id='genGlow'%20cx='50%25'%20cy='45%25'%20r='58%25'%3e%3cstop%20offset='0'%20stop-color='%23ffffff'/%3e%3cstop%20offset='.5'%20stop-color='%23b7d9ff'/%3e%3cstop%20offset='1'%20stop-color='%232f80ed'/%3e%3c/radialGradient%3e%3clinearGradient%20id='genLine'%20x1='72'%20x2='170'%20y1='165'%20y2='68'%3e%3cstop%20stop-color='%232f80ed'/%3e%3cstop%20offset='1'%20stop-color='%238bd4ff'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='240'%20height='240'%20rx='120'%20fill='%23eef7ff'/%3e%3ccircle%20cx='120'%20cy='120'%20r='86'%20fill='url(%23genGlow)'%20opacity='.36'/%3e%3cpath%20d='M78%20158%20143%2093l22%2022-65%2065-28%206%206-28Z'%20fill='none'%20stroke='url(%23genLine)'%20stroke-width='12'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M144%2093%20165%2072M160%2088l-11-11'%20stroke='%232f80ed'%20stroke-width='9'%20stroke-linecap='round'/%3e%3cpath%20d='M86%2078v22M75%2089h22M170%20140v20M160%20150h20M118%2057v15M111%2064h15'%20stroke='%232f80ed'%20stroke-width='7'%20stroke-linecap='round'/%3e%3ccircle%20cx='180'%20cy='87'%20r='5'%20fill='%237ec8ff'/%3e%3ccircle%20cx='68'%20cy='140'%20r='5'%20fill='%232f80ed'/%3e%3c/svg%3e";
var course_vision_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20240%20240'%20role='img'%20aria-label='Computer%20vision%20course'%3e%3cdefs%3e%3cradialGradient%20id='visionGlow'%20cx='50%25'%20cy='48%25'%20r='60%25'%3e%3cstop%20offset='0'%20stop-color='%23ffffff'/%3e%3cstop%20offset='.48'%20stop-color='%23badcff'/%3e%3cstop%20offset='1'%20stop-color='%232f80ed'/%3e%3c/radialGradient%3e%3clinearGradient%20id='visionLine'%20x1='54'%20x2='186'%20y1='120'%20y2='120'%3e%3cstop%20stop-color='%237ec8ff'/%3e%3cstop%20offset='.5'%20stop-color='%232f80ed'/%3e%3cstop%20offset='1'%20stop-color='%237ec8ff'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='240'%20height='240'%20rx='120'%20fill='%23eff8ff'/%3e%3ccircle%20cx='120'%20cy='120'%20r='88'%20fill='url(%23visionGlow)'%20opacity='.36'/%3e%3cpath%20d='M56%20120c17-30%2039-45%2064-45s47%2015%2064%2045c-17%2030-39%2045-64%2045s-47-15-64-45Z'%20fill='%23fff'%20opacity='.72'%20stroke='url(%23visionLine)'%20stroke-width='10'%20stroke-linejoin='round'/%3e%3ccircle%20cx='120'%20cy='120'%20r='29'%20fill='none'%20stroke='%232f80ed'%20stroke-width='9'/%3e%3ccircle%20cx='120'%20cy='120'%20r='10'%20fill='%232f80ed'/%3e%3cpath%20d='M77%2078%2063%2064M163%2078l14-14M77%20162l-14%2014M163%20162l14%2014'%20stroke='%237ec8ff'%20stroke-width='7'%20stroke-linecap='round'/%3e%3c/svg%3e";
var faculty_arjun_default = "/assets/faculty-arjun-FcXY-t9X.avif";
var faculty_aisha_default = "/assets/faculty-aisha-jQUNr_p8.avif";
var faculty_rahul_default = "/assets/faculty-rahul-D77PjF_K.jpg";
var SCENE_COUNT = 13;
var heroCards = [
	{
		icon: Building2,
		title: "New Campus",
		copy: "Ready for the founding batch",
		className: "left-[12%] top-[18%] rotate-[-7deg]"
	},
	{
		icon: MonitorPlay,
		title: "Hybrid Learning",
		copy: "Live + recorded access",
		className: "right-[0%] top-[36%] rotate-[5deg]",
		progress: true
	},
	{
		icon: Users,
		title: "Small Batches",
		copy: "Personal mentor attention",
		className: "left-[-5%] bottom-[25%] rotate-[7deg]"
	},
	{
		icon: CalendarDays,
		title: "Starts Sep 2026",
		copy: "Admissions now open",
		className: "right-[3%] bottom-[15%] rotate-[-6deg]"
	}
];
var visionPoints = [
	"Built for students who want practical AI skills from day one.",
	"Designed around live classes, guided practice, and real project work.",
	"Focused on confidence, clarity, and career-ready technical foundations."
];
var whyJoinCards = [
	{
		icon: GraduationCap,
		title: "Experienced Faculty",
		copy: "Learn from mentors with strong academic and industry practice."
	},
	{
		icon: Layers,
		title: "Relevant Curriculum",
		copy: "Modern AI, data, coding, and project workflows in one path."
	},
	{
		icon: MonitorPlay,
		title: "Online + Offline",
		copy: "Live Zoom or Meet classes with recordings for revision."
	},
	{
		icon: Target,
		title: "Personal Attention",
		copy: "Small founding batches make doubt clearing faster and sharper."
	},
	{
		icon: Award,
		title: "Founding Benefits",
		copy: "Early-bird fee support, extra mentoring, and launch workshops."
	},
	{
		icon: Sparkles,
		title: "Career Foundation",
		copy: "Portfolio-first projects and interview-focused practice."
	}
];
var courseCards = [
	{
		image: course_ai_default,
		name: "AI & Machine Learning Foundation",
		duration: "16 weeks",
		mode: "Hybrid",
		copy: "Python, data handling, ML models, evaluation, and mini projects."
	},
	{
		image: course_python_default,
		name: "Python for Data & AI",
		duration: "12 weeks",
		mode: "Online / Offline",
		copy: "Programming basics, notebooks, APIs, and practical automation."
	},
	{
		image: course_genai_default,
		name: "Generative AI & LLMs",
		duration: "10 weeks",
		mode: "Live Online",
		copy: "Prompting, agents, RAG basics, and responsible AI workflows."
	},
	{
		image: course_vision_default,
		name: "Computer Vision Essentials",
		duration: "8 weeks",
		mode: "Weekend Hybrid",
		copy: "Image processing, detection concepts, and guided model demos."
	}
];
var facultySpotlights = [
	{
		name: "Dr. Arjun Mehta",
		image: faculty_arjun_default,
		role: "Professor & Head of Computer Science",
		designation: "Founder & Academic Director",
		tag: "Leadership",
		specialization: "Artificial Intelligence & Deep Learning",
		experience: "15+ Years",
		courses: "AI, ML, Deep Learning",
		email: "arjun.mehta@knoraedu.ac.in",
		phone: "+91 98765 43210",
		bio: "Ph.D. in Artificial Intelligence with 15+ years of teaching, research, and student mentoring experience.",
		quote: "Education is not just about knowledge, it is about inspiring minds and building a better future."
	},
	{
		name: "Prof. Aisha Khan",
		image: faculty_aisha_default,
		role: "AI & Machine Learning Mentor",
		designation: "Faculty Member",
		tag: "Faculty",
		specialization: "Machine Learning & Python",
		experience: "9+ Years",
		courses: "Python, ML Foundations",
		email: "aisha.khan@knoraedu.ac.in",
		phone: "+91 98765 43211",
		bio: "Specialist in Python, machine learning foundations, guided labs, and project-based AI learning.",
		quote: "Strong foundations and consistent practice turn complex technology into real confidence."
	},
	{
		name: "Rahul Nair",
		image: faculty_rahul_default,
		role: "Data Science & Analytics Trainer",
		designation: "Faculty Member",
		tag: "Faculty",
		specialization: "Data Science & Analytics",
		experience: "8+ Years",
		courses: "Data Analytics, Dashboards",
		email: "rahul.nair@knoraedu.ac.in",
		phone: "+91 98765 43212",
		bio: "Mentor for data handling, analytics workflows, dashboards, and portfolio-focused student projects.",
		quote: "Students learn best when concepts, tools, and real problems meet in the same classroom."
	}
];
var admissionSteps = [
	{
		icon: ClipboardCheck,
		title: "Enquire",
		copy: "Share your goal and course interest."
	},
	{
		icon: FileCheckCorner,
		title: "Register",
		copy: "Complete the short admission form."
	},
	{
		icon: CreditCard,
		title: "Pay Fee",
		copy: "Confirm your seat in the batch."
	},
	{
		icon: CirclePlay,
		title: "Start Classes",
		copy: "Join orientation and begin learning."
	}
];
var facilityTiles = [
	{
		icon: Building2,
		title: "New Campus",
		copy: "Fresh institute setup"
	},
	{
		icon: Users,
		title: "Classrooms",
		copy: "Small batch seating"
	},
	{
		icon: MonitorPlay,
		title: "Live Class Setup",
		copy: "Zoom and Meet ready"
	},
	{
		icon: Wifi,
		title: "Recording Access",
		copy: "Revision library"
	},
	{
		icon: BookOpen,
		title: "Study Support",
		copy: "Notes and practice"
	},
	{
		icon: Cpu,
		title: "Project Lab",
		copy: "Guided build sessions"
	}
];
var launchEvents = [
	{
		date: "24 Sep 2026",
		title: "Orientation Day",
		copy: "Meet mentors and understand the learning path."
	},
	{
		date: "27 Sep 2026",
		title: "Open House",
		copy: "Visit the campus and speak with the team."
	},
	{
		date: "01 Oct 2026",
		title: "Free Demo Class",
		copy: "Experience a live hybrid AI session."
	}
];
var footerLinks = [
	["About Us", "/about-us"],
	["Courses", "/courses"],
	["Faculty", "/faculty"],
	["Apply Online", "/apply-online"],
	["Contact", "/contact-us"]
];
var HERO_LETTERS = [
	"K",
	"N",
	"O",
	"R",
	"A"
];
function Badge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "hero-badge flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-primary uppercase",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), children]
	});
}
function renderLetterNodes(node, path = "letter") {
	if (node == null || typeof node === "boolean") return null;
	if (typeof node === "string" || typeof node === "number") return String(node).split(" ").map((word, wordIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [wordIndex > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		children: " "
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block whitespace-nowrap",
		children: Array.from(word).map((char, charIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "letter-fade-char inline-block will-change-[filter,opacity,transform]",
			children: char
		}, `${path}-${wordIndex}-${charIndex}`))
	})] }, `${path}-word-${wordIndex}`));
	if (Array.isArray(node)) return node.map((child, index) => renderLetterNodes(child, `${path}-${index}`));
	if (!(0, import_react.isValidElement)(node)) return node;
	if (node.type === import_react.Fragment) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: import_react.Children.map(node.props.children, (child, index) => renderLetterNodes(child, `${path}-${index}`)) }, path);
	if (node.type === "br") return (0, import_react.cloneElement)(node, { key: path });
	return (0, import_react.cloneElement)(node, { key: path }, import_react.Children.map(node.props.children, (child, index) => renderLetterNodes(child, `${path}-${index}`)));
}
function LetterFadeText({ text, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		"aria-label": typeof text === "string" ? text : void 0,
		children: renderLetterNodes(text)
	});
}
function FacultyPortrait({ person, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: person.image,
		alt: person.name,
		className: `faculty-portrait ${className}`,
		loading: "lazy"
	});
}
function KnoraLogoHoverText() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "knora-logo-word inline-flex items-baseline",
		"aria-label": "KNORA",
		children: [
			["K", "N"].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "letter-fade-char inline-block will-change-[filter,opacity,transform]",
				children: letter
			}, letter)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "knora-logo-o letter-fade-char mx-[0.04em] inline-block will-change-[filter,opacity,transform]"
			}),
			["R", "A"].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "letter-fade-char inline-block will-change-[filter,opacity,transform]",
				children: letter
			}, letter))
		]
	});
}
function SceneTitle({ eyebrow, title, copy, center = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		className: `relative z-10 ${center ? "mx-auto text-center" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "holo-text",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: eyebrow })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				component: "h2",
				className: "holo-text letter-fade-parent hologram-title mt-6 text-4xl leading-[1.02] font-semibold text-foreground sm:text-5xl lg:text-6xl",
				sx: {
					color: "var(--foreground)",
					fontFamily: "var(--font-display)",
					fontSize: {
						xs: "2.25rem",
						sm: "3rem",
						lg: "3.75rem"
					},
					fontWeight: 700,
					letterSpacing: 0,
					lineHeight: 1.02
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterFadeText, { text: title })
			}),
			copy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				component: "p",
				className: `holo-text mt-5 max-w-xl text-base leading-relaxed text-muted-foreground ${center ? "mx-auto" : ""}`,
				children: copy
			})
		]
	});
}
function Home() {
	const wrapper = (0, import_react.useRef)(null);
	const sceneRefs = (0, import_react.useRef)([]);
	const heroVisualRef = (0, import_react.useRef)(null);
	const heroCoreRef = (0, import_react.useRef)(null);
	const [activeCourse, setActiveCourse] = (0, import_react.useState)(0);
	const [activeFaculty, setActiveFaculty] = (0, import_react.useState)(0);
	const [heroLetterIndex, setHeroLetterIndex] = (0, import_react.useState)(0);
	const facultyScrollIndexRef = (0, import_react.useRef)(0);
	const setSceneRef = (index) => (el) => {
		sceneRefs.current[index] = el;
	};
	const rotateCourse = (direction) => {
		setActiveCourse((current) => {
			return (current + direction + courseCards.length) % courseCards.length;
		});
	};
	const getCoursePosition = (index) => {
		return (index - activeCourse + courseCards.length) % courseCards.length;
	};
	const rotateFaculty = (direction) => {
		setActiveFaculty((current) => {
			const next = (current + direction + facultySpotlights.length) % facultySpotlights.length;
			facultyScrollIndexRef.current = next;
			return next;
		});
	};
	const faculty = facultySpotlights[activeFaculty];
	const director = facultySpotlights[0];
	const facultyPrev = facultySpotlights[(activeFaculty - 1 + facultySpotlights.length) % facultySpotlights.length];
	const facultyNext = facultySpotlights[(activeFaculty + 1) % facultySpotlights.length];
	const heroLetter = HERO_LETTERS[heroLetterIndex];
	const rotateHeroLetter = () => {
		setHeroLetterIndex((current) => (current + 1) % HERO_LETTERS.length);
	};
	(0, import_react.useEffect)(() => {
		journey.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		gsapWithCSS.registerPlugin(ScrollTrigger);
		const ctx = gsapWithCSS.context(() => {
			const proxy = { p: 0 };
			const sceneSlot = 1.55;
			const scenes = sceneRefs.current.slice(0, SCENE_COUNT).filter(Boolean);
			gsapWithCSS.set(scenes.slice(1), {
				autoAlpha: 0,
				y: 64
			});
			gsapWithCSS.set(scenes[0], {
				autoAlpha: 1,
				y: 0
			});
			gsapWithCSS.from(".hero-pop", {
				y: 28,
				autoAlpha: 0,
				duration: .9,
				stagger: .09,
				ease: "power3.out"
			});
			gsapWithCSS.from(".section-1 .letter-fade-char", {
				y: 34,
				autoAlpha: 0,
				filter: "blur(12px)",
				duration: .72,
				stagger: {
					each: .018,
					from: "start"
				},
				ease: "power3.out"
			});
			const tl = gsapWithCSS.timeline({
				scrollTrigger: {
					trigger: wrapper.current,
					start: "top top",
					end: "bottom bottom",
					scrub: journey.reducedMotion ? true : .9
				},
				defaults: { ease: "none" }
			});
			tl.to(proxy, {
				p: 1,
				duration: SCENE_COUNT * sceneSlot,
				onUpdate: () => {
					journey.progress = proxy.p;
					const facultySceneElapsed = proxy.p * SCENE_COUNT * sceneSlot - 5 * sceneSlot;
					if (facultySceneElapsed >= -.04 && facultySceneElapsed <= 1.44) {
						const nextFacultyIndex = facultySceneElapsed < .46 ? 0 : facultySceneElapsed < .86 ? 1 : facultySpotlights.length - 1;
						if (facultyScrollIndexRef.current !== nextFacultyIndex) {
							facultyScrollIndexRef.current = nextFacultyIndex;
							setActiveFaculty(nextFacultyIndex);
						}
					}
				}
			});
			if (journey.reducedMotion) scenes.forEach((el, i) => {
				const start = i * sceneSlot;
				tl.to(el, {
					autoAlpha: 1,
					y: 0,
					duration: .3
				}, start);
				if (i < scenes.length - 1) tl.to(el, {
					autoAlpha: 0,
					duration: .3
				}, start + 1.16);
			});
			else {
				const ease = "power2.inOut";
				const hologramIn = (selector, at) => {
					tl.fromTo(selector, {
						y: 0,
						autoAlpha: 0,
						scale: .9,
						filter: "blur(28px)",
						transformOrigin: "50% 50%"
					}, {
						y: 0,
						autoAlpha: 1,
						scale: 1,
						filter: "blur(0px)",
						duration: .44,
						stagger: .045,
						ease
					}, at);
				};
				const lettersIn = (scene, at) => {
					const letters = scene.querySelectorAll(".letter-fade-char");
					if (!letters.length) return;
					tl.fromTo(letters, {
						y: 28,
						autoAlpha: 0,
						filter: "blur(12px)"
					}, {
						y: 0,
						autoAlpha: 1,
						filter: "blur(0px)",
						duration: .52,
						stagger: {
							each: .012,
							from: "start"
						},
						ease: "power3.out"
					}, at);
				};
				const lettersOut = (scene, at) => {
					const letters = scene.querySelectorAll(".letter-fade-char");
					if (!letters.length) return;
					tl.fromTo(letters, {
						y: 0,
						autoAlpha: 1,
						filter: "blur(0px)"
					}, {
						y: -22,
						autoAlpha: 0,
						filter: "blur(10px)",
						duration: .42,
						stagger: {
							each: .009,
							from: "end"
						},
						ease: "power2.inOut",
						immediateRender: false
					}, at);
				};
				const sectionOut = (scene, at) => {
					const items = scene.querySelectorAll(".hero-pop:not(.letter-fade-parent), .holo-text:not(.letter-fade-parent), .motion-card");
					lettersOut(scene, at - .04);
					tl.fromTo(items, {
						y: 0,
						autoAlpha: 1,
						scale: 1,
						filter: "blur(0px)"
					}, {
						y: -18,
						autoAlpha: 0,
						scale: 1.04,
						filter: "blur(18px)",
						transformOrigin: "50% 50%",
						duration: .46,
						stagger: {
							amount: .28,
							from: "start"
						},
						ease,
						immediateRender: false
					}, at);
				};
				const facultySectionOut = (scene, at) => {
					const liveElements = scene.querySelectorAll(".faculty-holo-member, .faculty-stage-arrow, .faculty-stage-dots, .faculty-profile-card");
					tl.to(liveElements, {
						y: -14,
						autoAlpha: 0,
						scale: .985,
						filter: "blur(6px)",
						transformOrigin: "50% 50%",
						duration: .48,
						stagger: {
							amount: .2,
							from: "end"
						},
						ease
					}, at);
					tl.to(scene.querySelector(".faculty-showcase-shell"), {
						autoAlpha: 0,
						scale: .99,
						filter: "blur(4px)",
						duration: .34,
						ease
					}, at + .22);
				};
				scenes.forEach((scene, i) => {
					const start = i * sceneSlot;
					const selector = `.section-${i + 1}`;
					if (i > 0) {
						tl.to(scene, {
							y: 0,
							autoAlpha: 1,
							duration: .5,
							ease
						}, start);
						hologramIn(`${selector} .holo-text`, start + .06);
						lettersIn(scene, start + .16);
						tl.from(scene.querySelectorAll(".motion-card"), {
							y: 22,
							autoAlpha: 0,
							stagger: .04,
							duration: .3,
							ease
						}, start + .2);
					}
					if (i < scenes.length - 1) {
						const exitAt = i === 5 ? start + 1.4 : start + .9;
						const hideAt = i === 5 ? start + 1.54 : start + 1.42;
						if (i === 5) facultySectionOut(scene, exitAt);
						else sectionOut(scene, exitAt);
						tl.to(scene, {
							y: i === 5 ? -42 : -70,
							autoAlpha: 0,
							duration: i === 5 ? .28 : .22,
							ease
						}, hideAt);
					}
				});
			}
		}, wrapper);
		return () => {
			ctx.revert();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { styles: {
			".lift:hover": { boxShadow: "none !important" },
			".knora-logo-word": {
				color: "var(--foreground)",
				transition: "color 240ms ease"
			},
			".knora-logo-o": {
				position: "relative",
				width: "0.72em",
				height: "0.72em",
				border: "0.105em solid currentColor",
				borderRadius: "999px",
				transform: "translateY(0.025em)",
				transition: "border-color 240ms ease, transform 240ms ease, box-shadow 240ms ease"
			},
			".knora-logo-o::before, .knora-logo-o::after": {
				content: "\"\"",
				position: "absolute",
				left: "50%",
				width: "0.22em",
				height: "0.17em",
				borderRadius: "0.08em",
				background: "var(--background)",
				transform: "translateX(-50%)",
				opacity: 0,
				transition: "opacity 200ms ease"
			},
			".knora-logo-o::before": { top: "-0.14em" },
			".knora-logo-o::after": { bottom: "-0.14em" },
			".headline-kinetic:hover .knora-logo-o": {
				borderColor: "var(--primary)",
				transform: "translateY(0.025em) scale(1.04)",
				boxShadow: "0 0 0 0.035em color-mix(in oklab, var(--primary) 18%, transparent)"
			},
			".headline-kinetic:hover .knora-logo-o::before, .headline-kinetic:hover .knora-logo-o::after": { opacity: 1 }
		} }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CursorEffect, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {
			heroAnchorRef: heroCoreRef,
			heroHoverRef: heroVisualRef
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none fixed inset-0 -z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bloom absolute left-1/2 top-1/3 size-[70vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.35]",
					style: {
						backgroundImage: "radial-gradient(color-mix(in oklab, var(--electric) 30%, transparent) 1px, transparent 1px)",
						backgroundSize: "46px 46px",
						maskImage: "radial-gradient(circle at 50% 45%, black, transparent 72%)"
					}
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			ref: wrapper,
			className: "relative w-full",
			style: { height: `1066vh` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 h-screen w-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "home",
						ref: setSceneRef(0),
						className: "section-1 absolute inset-0 grid w-full grid-cols-1 items-center gap-8 px-5 pt-24 sm:px-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-10 lg:px-12 xl:px-20 2xl:px-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 max-w-[720px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
										component: "h1",
										className: "headline-kinetic letter-fade-parent hero-pop text-5xl leading-[0.98] font-semibold text-foreground sm:text-6xl lg:text-7xl xl:text-[5.9rem]",
										sx: {
											color: "var(--foreground)",
											fontFamily: "var(--font-display)",
											fontSize: {
												xs: "clamp(2.35rem, 11.5vw, 3.05rem)",
												sm: "3.35rem",
												md: "3.8rem",
												lg: "4rem",
												xl: "5.25rem"
											},
											fontWeight: 700,
											letterSpacing: 0,
											lineHeight: {
												xs: 1,
												lg: .96
											}
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnoraLogoHoverText, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-block whitespace-nowrap",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterFadeText, { text: "Edu" }),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hero-learn relative inline-block text-primary",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterFadeText, { text: "Academy" })
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "hero-pop hero-copy-text mt-9 max-w-[36rem] text-base leading-relaxed text-muted-foreground sm:text-lg",
										children: "Admissions Open - Join Our Founding Batch. Learn in a new-age AI institute built for practical training, personal attention, and flexible online plus offline classes."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-pop mt-7 flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/apply-online",
											className: "lift arrow-shift flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-soft sm:px-6 sm:py-3.5",
											children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#courses",
											className: "lift glass flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground sm:px-6 sm:py-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), " Explore Courses"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
										className: "hero-pop mt-8 grid max-w-[40rem] grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-4",
										children: [
											[
												Building2,
												"New",
												"Campus Setup"
											],
											[
												MonitorPlay,
												"Live",
												"Hybrid Classes"
											],
											[
												CalendarDays,
												"Sep 2026",
												"New Batch"
											]
										].map(([Icon, n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hero-stat flex min-w-0 items-center gap-3 rounded-3xl bg-white/70 p-3 sm:gap-4 lg:pr-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:size-12",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 sm:size-6" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "font-display text-xl font-semibold text-foreground sm:text-2xl",
													children: n
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-[0.68rem] tracking-wide text-muted-foreground uppercase sm:text-xs",
													children: l
												})]
											})]
										}, l))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none relative hidden h-full min-w-0 items-center justify-center lg:flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: heroVisualRef,
									className: "hero-visual absolute left-1/2 top-1/2 flex size-[41rem] -translate-x-1/2 -translate-y-[49%] items-center justify-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											ref: heroCoreRef,
											className: "hero-core relative flex size-[18rem] items-center justify-center rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "hero-k-mark",
												"aria-label": `Knora animated letter ${heroLetter}`,
												onPointerEnter: rotateHeroLetter,
												onClick: rotateHeroLetter,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-letter-orbit hero-letter-orbit-third" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hero-morph-letter",
													"data-letter": heroLetter,
													children: heroLetter
												}, heroLetter)]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hero-cap absolute",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cap-board" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cap-button" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cap-string" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "hero-base absolute flex items-center justify-center",
											children: [
												14,
												18.5,
												23
											].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "hero-base-ring absolute rounded-full",
												style: {
													width: `${s}rem`,
													height: `${s * .22}rem`
												}
											}, s))
										}),
										heroCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `hero-float-card absolute w-52 rounded-3xl p-4 ${card.className}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-3 flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-semibold text-foreground",
													children: card.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: card.copy
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "size-5" })
												})]
											}), card.progress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-2 overflow-hidden rounded-full bg-primary/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-4/5 rounded-full bg-primary" })
											})]
										}, card.title))
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mouse, { className: "size-5 animate-bounce text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.7rem] tracking-[0.22em] uppercase",
									children: "Scroll to explore"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "welcome",
						ref: setSceneRef(1),
						className: "section-2 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 grid gap-5 lg:ml-auto lg:max-w-[720px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
								eyebrow: "Welcome / Vision Snapshot",
								title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Built For Ambitious",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"AI Learners"
								] }),
								copy: "Knora Edu Academy exists to make advanced technology education clearer, more personal, and more useful for students preparing for tomorrow's careers."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3",
								children: [visionPoints.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "motion-card glass flex items-start gap-3 rounded-3xl p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: point
									})]
								}, point)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/about-us",
									className: "holo-text arrow-shift mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary",
									children: ["Read More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "director-message",
						ref: setSceneRef(2),
						className: "section-3 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "holo-text",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Founder / Director Message" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "letter-fade-parent mt-6 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterFadeText, { text: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Academic",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Leadership"
									] }) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground",
									children: "A personal commitment to strong foundations, guided practice, and the confidence every student needs to begin with clarity."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "motion-card director-message-card relative z-10 rounded-[2rem] p-6 lg:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 md:grid-cols-[auto_1fr] md:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "director-portrait-ring",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacultyPortrait, { person: director })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											label: director.tag,
											size: "small",
											className: "faculty-chip"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-3xl font-semibold text-foreground",
											children: director.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-semibold text-primary",
											children: director.designation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Knora Edu Academy"
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "faculty-quote-wide director-quote",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatQuoteRounded_default, { className: "faculty-quote-icon" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our commitment is simple: give every student strong foundations, guided practice, and the confidence to build with technology. As a new institute, we have the chance to know our students closely and shape the first batch with real care." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatQuoteRounded_default, { className: "faculty-quote-icon faculty-quote-end" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 grid gap-3 sm:grid-cols-3",
									children: [
										"Strong foundations",
										"Guided practice",
										"Personal mentoring"
									].map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-2xl border border-border/70 bg-background/45 px-4 py-3 text-sm font-semibold text-foreground",
										children: point
									}, point))
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "why-join",
						ref: setSceneRef(3),
						className: "section-4 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Why Join Us",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"A New Institute",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"With A Personal Edge"
							] }),
							copy: "Modern AI learning infrastructure, small batches, and the attention only a focused new academy can give.",
							center: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 lg:grid-cols-3",
							children: whyJoinCards.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "motion-card lift glass rounded-3xl p-4 text-left sm:p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "mb-4 size-6 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-foreground",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block",
										children: item.copy
									})
								]
							}, item.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "courses",
						ref: setSceneRef(4),
						className: "section-5 hologram-section absolute inset-0 mx-auto flex max-w-7xl flex-col items-center justify-start px-6 pt-32 lg:px-10 lg:pt-36",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Courses Offered",
							center: true,
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Choose Your",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "sm:hidden" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Learning Track"
								})
							] }),
							copy: "Focused AI and data courses with clear duration, mode, mentor support, and recordings for revision."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "motion-card course-deck-wrap relative mt-16 w-full max-w-6xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "course-deck-stage relative mx-auto grid w-full gap-4 lg:block lg:h-[25rem]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										type: "button",
										"aria-label": "Previous course",
										onClick: () => rotateCourse(1),
										className: "course-nav-button course-nav-left glass",
										sx: { color: "var(--primary)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftRounded_default, { fontSize: "small" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										type: "button",
										"aria-label": "Next course",
										onClick: () => rotateCourse(-1),
										className: "course-nav-button course-nav-right glass",
										sx: { color: "var(--primary)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightRounded_default, { fontSize: "small" })
									}),
									courseCards.map((course, index) => {
										const position = getCoursePosition(index);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `course-track-card course-position-${position} relative flex min-h-[22rem] flex-col justify-end rounded-[2rem] p-5 text-left lg:absolute lg:min-h-[22rem] ${position === 0 ? "course-track-card-featured" : ""}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "course-particle-border",
													"aria-hidden": "true",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "course-particle-side course-particle-top" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "course-particle-side course-particle-right" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "course-particle-side course-particle-bottom" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "course-particle-side course-particle-left" })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "course-card-orb absolute left-1/2 top-8 flex size-28 -translate-x-1/2 items-center justify-center rounded-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: course.image,
														alt: "",
														"aria-hidden": "true",
														className: "course-card-image",
														loading: "lazy"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
													label: course.mode,
													size: "small",
													className: "course-mode-chip"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-display text-xl font-semibold leading-tight text-foreground",
															children: course.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "mt-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarMonthRounded_default, { className: "course-duration-icon" }), course.duration]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-3 text-sm leading-relaxed text-muted-foreground",
															children: course.copy
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															component: "a",
															href: "/courses",
															endIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowForwardRounded_default, {}),
															className: "course-more-button",
															children: "More Details"
														})
													]
												})
											]
										}, course.name);
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								component: "a",
								href: "/courses",
								endIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowForwardRounded_default, {}),
								className: "course-all-button glass",
								children: "View All Courses"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "faculty",
						ref: setSceneRef(5),
						className: "section-6 hologram-section absolute inset-0 mx-auto flex max-w-7xl items-center justify-center px-6 pt-24 lg:px-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "motion-card faculty-showcase-shell faculty-meet-showcase relative z-10 grid w-full grid-cols-1 gap-8 rounded-[2.25rem] p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "faculty-hologram-stage relative min-h-[34rem]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute left-1/2 top-0 z-20 -translate-x-1/2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Faculty Members" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										"aria-label": "Previous faculty",
										onClick: () => rotateFaculty(-1),
										className: "faculty-stage-arrow faculty-stage-arrow-left",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftRounded_default, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										"aria-label": "Next faculty",
										onClick: () => rotateFaculty(1),
										className: "faculty-stage-arrow faculty-stage-arrow-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightRounded_default, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "faculty-holo-member faculty-holo-side faculty-holo-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "faculty-mini-platform" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "faculty-small-ring",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacultyPortrait, { person: facultyPrev })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "faculty-name-plate",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: facultyPrev.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: facultyPrev.role })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "faculty-holo-member faculty-holo-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "faculty-platform" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "faculty-avatar-ring",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "faculty-avatar-grid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacultyPortrait, {
													person: faculty,
													className: "faculty-portrait-active"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "faculty-name-plate faculty-name-plate-active",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: faculty.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: faculty.role })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "faculty-holo-member faculty-holo-side faculty-holo-right",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "faculty-mini-platform" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "faculty-small-ring",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacultyPortrait, { person: facultyNext })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "faculty-name-plate",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: facultyNext.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: facultyNext.role })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "faculty-stage-dots",
										children: facultySpotlights.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Show ${item.name}`,
											onClick: () => {
												facultyScrollIndexRef.current = index;
												setActiveFaculty(index);
											},
											className: `faculty-dot ${index === activeFaculty ? "faculty-dot-active" : ""}`
										}, item.name))
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "faculty-profile-card relative rounded-[2rem] p-6 lg:p-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-6 flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "faculty-icon-bubble",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacultyPortrait, { person: faculty })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-display text-3xl font-semibold text-foreground",
													children: faculty.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm font-semibold text-primary",
													children: faculty.designation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-muted-foreground",
													children: "Knora Edu Academy"
												})
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											label: faculty.tag,
											size: "small",
											className: "faculty-chip"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "faculty-quote-wide",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatQuoteRounded_default, { className: "faculty-quote-icon" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: faculty.quote }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatQuoteRounded_default, { className: "faculty-quote-icon faculty-quote-end" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "faculty-detail-list",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchoolRounded_default, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Specialization" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: faculty.specialization })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Experience" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: faculty.experience })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Courses Teaching" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: faculty.courses })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailRounded_default, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: faculty.email })
											] })
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									component: "a",
									href: "/faculty",
									endIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowForwardRounded_default, {}),
									className: "faculty-profile-button",
									children: "More Details"
								})]
							}, `meet-${faculty.name}`)]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "hybrid-learning",
						ref: setSceneRef(6),
						className: "section-7 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[1fr_1fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Online + Offline Learning Highlight",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Live Classes.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Recordings After."
							] }),
							copy: "Join interactive classes via Zoom or Google Meet, learn offline on campus, and revisit recordings whenever you need revision."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "motion-card glass relative z-10 rounded-3xl p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold text-foreground",
									children: "Hybrid Learning Console"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3",
								children: [
									"Live interactive Zoom / Google Meet sessions",
									"Offline classroom support for local students",
									"Recorded video library for later viewing",
									"Practice tasks and doubt-clearing support"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-2xl border border-border/70 bg-background/30 p-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-primary" }), item]
								}, item))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "admissions",
						ref: setSceneRef(7),
						className: "section-8 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Admission Process",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Join In Four",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Simple Steps"
							] }),
							copy: "Make joining feel easy, clear, and low-risk for students and parents."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [admissionSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "motion-card glass rounded-3xl p-5 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4 flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-2xl font-semibold text-primary/35",
											children: ["0", i + 1]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-foreground",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: step.copy
									})
								]
							}, step.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/apply-online",
								className: "motion-card lift arrow-shift flex items-center justify-between rounded-3xl bg-primary p-5 text-sm font-semibold text-primary-foreground glow-soft",
								children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "arrow size-4" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "campus",
						ref: setSceneRef(8),
						className: "section-9 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Campus / Facility Preview",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Real Setup.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Ready To Learn."
							] }),
							copy: "Use this section for campus, classroom, live-class, and recording-library photos as they become available.",
							center: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 lg:grid-cols-3",
							children: facilityTiles.map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "motion-card lift glass rounded-3xl p-5 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tile.icon, { className: "mb-5 size-6 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-semibold text-foreground",
										children: tile.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: tile.copy
									})
								]
							}, tile.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "events",
						ref: setSceneRef(9),
						className: "section-10 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Upcoming Events / Launch Highlights",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Activity Around",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"The Launch"
							] }),
							copy: "Orientation, open house, and demo sessions create confidence and urgency for the founding batch."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3",
							children: launchEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "motion-card glass flex items-start gap-4 rounded-3xl p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mt-1 size-6 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold tracking-[0.16em] text-primary uppercase",
										children: event.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-xl font-semibold text-foreground",
										children: event.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: event.copy
									})
								] })]
							}, event.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "contact",
						ref: setSceneRef(10),
						className: "section-11 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Enquiry / Contact Form",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Capture Leads",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"From Home"
							] }),
							copy: "For a new launch, students should not have to hunt for Contact Us."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (event) => event.preventDefault(),
							className: "motion-card glass relative z-10 grid gap-3 rounded-3xl p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold text-foreground",
									children: "Enquiry Form"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Name",
											className: "rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary",
											placeholder: "Name",
											type: "text"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Phone",
											className: "rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary",
											placeholder: "Phone",
											type: "tel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Email",
											className: "rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary",
											placeholder: "Email",
											type: "email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											"aria-label": "Course interested in",
											className: "rounded-2xl border border-border/80 bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary",
											defaultValue: "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Course Interested In"
											}), courseCards.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: course.name,
												children: course.name
											}, course.name))]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "lift arrow-shift mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-soft",
									children: ["Submit Enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "apply-now",
						ref: setSceneRef(11),
						className: "section-12 hologram-section absolute inset-0 flex flex-col items-center justify-center px-6 pt-24 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Call-To-Action Banner",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Limited Seats For",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Founding Batch"
							] }),
							copy: "Apply now and reserve your place in the September 2026 launch batch.",
							center: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "motion-card glass mt-10 flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 rounded-3xl p-6 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.18em] text-primary uppercase",
								children: "Admissions Open"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl font-semibold text-foreground",
								children: "Start with extra mentoring and founding-batch benefits."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/apply-online",
								className: "lift arrow-shift flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-soft",
								children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "footer",
						ref: setSceneRef(12),
						className: "section-13 hologram-section absolute inset-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneTitle, {
							eyebrow: "Footer",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Knora Edu",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Academy"
							] }),
							copy: "Quick links, address, phone, email, social links, and copyright in one final homepage section."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
							className: "motion-card glass relative z-10 rounded-3xl p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-semibold text-foreground",
										children: "Knora Edu Academy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "New campus, hybrid classes, and practical AI courses."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 sm:grid-cols-3",
										children: [
											[Phone, "+91 98765 43210"],
											[Mail, "admissions@knora.edu"],
											[MapPin, "Knora Edu Academy"]
										].map(([Icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 rounded-2xl border border-border/70 bg-background/30 p-3 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
										}, label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-3 text-sm",
										children: footerLinks.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href,
											className: "text-muted-foreground hover:text-primary",
											children: label
										}, label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2",
										children: [
											Instagram,
											Linkedin,
											Youtube
										].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#contact",
											"aria-label": "social link",
											className: "icon-aura flex size-9 items-center justify-center rounded-full border border-border/80 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "border-t border-border/70 pt-4 text-xs text-muted-foreground",
										children: "Copyright 2026 Knora Edu Academy. All rights reserved."
									})
								]
							})
						})]
					})
				]
			})
		})
	] });
}
var SplitComponent = Home;
//#endregion
export { SplitComponent as component };
