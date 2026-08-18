// src/lib/particleTargets.js
/**
 * Deterministic particle target positions.
 * Every array is generated once (seeded PRNG, no Math.random) so that morphs are
 * perfectly reversible and never re-randomized inside the render loop.
 */

export function makeRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Fibonacci sphere distribution, with a thin shell jitter for a neural feel. */
export function fibonacciSphere(
  count,
  radius,
  center = [0, 0, 0],
  seed = 1337,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN * i;
    const shell = rnd();
    const rr = shell > 0.18 ? 0.94 + rnd() * 0.1 : 0.25 + rnd() * 0.6;
    out[i * 3] = center[0] + Math.cos(theta) * r * radius * rr;
    out[i * 3 + 1] = center[1] + y * radius * rr;
    out[i * 3 + 2] = center[2] + Math.sin(theta) * r * radius * rr;
  }
  return out;
}

/** A cleaner hero sphere with visible meridians so rotation reads as true 3D. */
export function neuralSphere(count, radius, center = [0, 0, 0], seed = 1337) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const yy = 1 - (i / Math.max(1, count - 1)) * 2;
    const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
    const theta = GOLDEN * i;
    // tighter shell than before — keeps the surface crisp instead of fuzzy
    const shell = 0.992 + rnd() * 0.012;
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
export function scatterCloud(count, width, height, depth, seed = 9021) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  for (let i = 0; i < count; i++) {
    const bx = Math.pow(rnd(), 1.55) * (rnd() > 0.5 ? 1 : -1);
    const by = Math.pow(rnd(), 1.35) * (rnd() > 0.5 ? 1 : -1);
    out[i * 3] = bx * width * 0.5;
    out[i * 3 + 1] = by * height * 0.5;
    out[i * 3 + 2] = (rnd() - 0.5) * depth;
  }
  return out;
}

/** Layered horizontal data waves flowing in from both sides. */
export function dataWaves(count, width, seed = 4242) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const bands = 7;
  for (let i = 0; i < count; i++) {
    const band = i % bands;
    const side = i % 2 === 0 ? -1 : 1;
    const t = rnd();
    const x = side * (0.12 + t * 0.88) * width * 0.5;
    const bandY = (band - (bands - 1) / 2) * 0.95;
    const phase = band * 0.6;
    const y =
      bandY + Math.sin(t * 6.2 + phase) * 0.62 + Math.sin(t * 13.1) * 0.14;
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.cos(t * 5.0 + phase) * 1.15 + (rnd() - 0.5) * 0.35;
  }
  return out;
}

/** Hybrid learning object: a particle laptop/video console with signal arcs. */
export function hybridLearningConsole(
  count,
  width,
  height,
  center = [0, 0, 0],
  seed = 5050,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;
  const screenW = w * 0.62;
  const screenH = h * 0.56;
  const top = h * 0.22;
  const bottom = top - screenH;
  const left = -screenW / 2;
  const right = screenW / 2;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z + (rnd() - 0.5) * 0.16;
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

    if (bucket < 3) {
      putRectEdge(i);
    } else if (bucket === 3) {
      putRectEdge(i, 0.22);
    } else if (bucket < 6) {
      const baseW = screenW * (bucket === 4 ? 1.15 : 0.92);
      const t = rnd();
      const x = -baseW / 2 + t * baseW;
      const y = bottom - 0.55 + Math.sin(t * Math.PI) * 0.14;
      put(i, x, y, (rnd() - 0.5) * 0.22);
    } else if (bucket === 6) {
      const edge = Math.floor(rnd() * 3);
      const triW = screenW * 0.14;
      const triH = screenH * 0.22;
      const t = rnd();
      if (edge === 0)
        put(
          i,
          -triW * 0.45 + t * triW * 0.9,
          bottom + screenH * 0.52 + triH * 0.5,
        );
      else if (edge === 1)
        put(
          i,
          -triW * 0.45 + t * triW * 0.9,
          bottom + screenH * 0.52 - triH * 0.5,
        );
      else put(i, triW * 0.5, bottom + screenH * 0.52 - triH * 0.5 + t * triH);
    } else if (bucket === 7) {
      const a = rnd() * Math.PI * 2;
      const radius = 0.36 + rnd() * 0.22;
      put(
        i,
        Math.cos(a) * radius,
        bottom + screenH * 0.52 + Math.sin(a) * radius,
        (rnd() - 0.5) * 0.16,
      );
    } else if (bucket < 10) {
      const lane = bucket - 8;
      const t = rnd();
      const x = left + screenW * 0.16 + t * screenW * 0.68;
      const y = bottom + screenH * (0.22 + lane * 0.18) + (rnd() - 0.5) * 0.05;
      put(i, x, y, (rnd() - 0.5) * 0.12);
    } else if (bucket === 10) {
      const arc = Math.floor(rnd() * 3);
      const a = Math.PI * (0.18 + rnd() * 0.64);
      const r = screenW * (0.32 + arc * 0.11);
      put(
        i,
        Math.cos(a) * r,
        top + 0.2 + Math.sin(a) * r * 0.34,
        (rnd() - 0.5) * 0.3,
      );
    } else {
      const side = rnd() > 0.5 ? 1 : -1;
      const a = rnd() * Math.PI * 2;
      const radius = 0.15 + rnd() * 0.24;
      const anchorX = side * screenW * (0.32 + rnd() * 0.18);
      const anchorY = bottom + screenH * (0.28 + rnd() * 0.5);
      put(
        i,
        anchorX + Math.cos(a) * radius,
        anchorY + Math.sin(a) * radius,
        (rnd() - 0.5) * 0.36,
      );
    }
  }

  return out;
}

/** Launch events object: calendar board, date grid, clock ring, and marker. */
export function eventCalendarFormation(
  count,
  width,
  height,
  center = [0, 0, 0],
  seed = 9090,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;
  const left = -w / 2;
  const right = w / 2;
  const top = h / 2;
  const bottom = -h / 2;
  const headerY = top - h * 0.22;
  const jitter = Math.min(w, h) * 0.006;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x + (rnd() - 0.5) * jitter;
    out[i3 + 1] = center[1] + y + (rnd() - 0.5) * jitter;
    out[i3 + 2] = center[2] + z + (rnd() - 0.5) * 0.08;
  };

  const line = (i, x1, y1, x2, y2, t = rnd()) => {
    put(i, x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
  };

  const rect = (i, x, y, rw, rh, t = rnd()) => {
    const p = t * (rw * 2 + rh * 2);
    if (p < rw) line(i, x - rw / 2, y + rh / 2, x + rw / 2, y + rh / 2, p / rw);
    else if (p < rw + rh)
      line(i, x + rw / 2, y + rh / 2, x + rw / 2, y - rh / 2, (p - rw) / rh);
    else if (p < rw * 2 + rh)
      line(
        i,
        x + rw / 2,
        y - rh / 2,
        x - rw / 2,
        y - rh / 2,
        (p - rw - rh) / rw,
      );
    else
      line(
        i,
        x - rw / 2,
        y - rh / 2,
        x - rw / 2,
        y + rh / 2,
        (p - rw * 2 - rh) / rh,
      );
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

    if (n < 0.24) {
      rect(i, 0, 0, w, h);
    } else if (n < 0.34) {
      line(i, left, headerY, right, headerY);
    } else if (n < 0.44) {
      const side = Math.floor((n - 0.34) / 0.05) === 0 ? -1 : 1;
      const t = ((n - 0.34) % 0.05) / 0.05;
      circle(i, side * w * 0.28, top + h * 0.015, h * 0.055, t);
    } else if (n < 0.58) {
      const local = (n - 0.44) / 0.14;
      const cells = 9;
      const cell = Math.min(cells - 1, Math.floor(local * cells));
      const cellT = local * cells - cell;
      const col = cell % 3;
      const row = Math.floor(cell / 3);
      const cellW = w * 0.105;
      const cellH = h * 0.105;
      const gapX = w * 0.035;
      const gapY = h * 0.045;
      const gridW = cellW * 3 + gapX * 2;
      const x = -w * 0.19 - gridW / 2 + cellW / 2 + col * (cellW + gapX);
      const y = headerY - h * 0.19 - row * (cellH + gapY);
      rect(i, x, y, cellW, cellH, cellT);
    } else if (n < 0.78) {
      const local = (n - 0.58) / 0.2;
      const rows = 3;
      const row = Math.min(rows - 1, Math.floor(local * rows));
      const rowT = local * rows - row;
      const segment = Math.floor(rowT * 4);
      const t = rowT * 4 - segment;
      const rowW = w * 0.32;
      const rowH = h * 0.105;
      const x = w * 0.22;
      const y = headerY - h * 0.18 - row * h * 0.17;
      if (segment < 2) {
        rect(i, x, y, rowW, rowH, rowT * 2);
      } else {
        const lineY = y + (segment === 2 ? rowH * 0.13 : -rowH * 0.13);
        line(i, x - rowW * 0.28, lineY, x + rowW * 0.25, lineY, t);
      }
    } else if (n < 0.88) {
      const local = (n - 0.78) / 0.1;
      const row = Math.min(2, Math.floor(local * 3));
      const t = local * 3 - row;
      const x = w * 0.08;
      const y = headerY - h * 0.18 - row * h * 0.17;
      circle(i, x, y, h * 0.032, t);
    } else if (n < 0.96) {
      const t = (n - 0.88) / 0.08;
      arc(
        i,
        -w * 0.06,
        bottom - h * 0.03,
        w * 0.2,
        Math.PI * 0.16,
        Math.PI * 0.84,
        t,
        0.62,
      );
    } else {
      const t = (n - 0.96) / 0.04;
      circle(i, -w * 0.32, bottom + h * 0.18, h * 0.055, t);
    }
  }

  return out;
}

/** Course-card silhouette: rounded outline, icon orb, text rows, and button. */
export function courseCardFormation(
  count,
  width,
  height,
  center = [0, 0, 0],
  seed = 6161,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;
  const r = Math.min(w, h) * 0.13;
  const left = -w / 2;
  const right = w / 2;
  const top = h / 2;
  const bottom = -h / 2;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z + (rnd() - 0.5) * 0.08;
  };

  for (let i = 0; i < count; i++) {
    const bucket = i % 10;
    if (bucket < 3) {
      const t = rnd();
      const side = Math.floor(rnd() * 4);
      if (side === 0) put(i, left + r + t * (w - 2 * r), top);
      else if (side === 1) put(i, right, top - r - t * (h - 2 * r));
      else if (side === 2) put(i, right - r - t * (w - 2 * r), bottom);
      else put(i, left, bottom + r + t * (h - 2 * r));
    } else if (bucket < 5) {
      const a = rnd() * Math.PI * 2;
      const radius = 0.38 + rnd() * 0.34;
      put(i, Math.cos(a) * radius, top - 1.0 + Math.sin(a) * radius);
    } else if (bucket < 8) {
      const row = Math.floor(rnd() * 5);
      const lineWidths = [1.8, 1.42, 2.05, 1.72, 1.24];
      const y = top - 2.0 - row * 0.34;
      const x = -lineWidths[row] / 2 + rnd() * lineWidths[row];
      put(i, x, y, (rnd() - 0.5) * 0.12);
    } else if (bucket === 8) {
      const x = -w * 0.32 + rnd() * w * 0.64;
      const y = bottom + 0.56 + (rnd() - 0.5) * 0.12;
      put(i, x, y);
    } else {
      put(
        i,
        (rnd() - 0.5) * w * 0.82,
        (rnd() - 0.5) * h * 0.76,
        (rnd() - 0.5) * 0.42,
      );
    }
  }

  return out;
}

/** Curved streams from both sides converging around a central chip. */
export function chipConvergence(count, width, seed = 7777) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const chipR = 1.55;
  for (let i = 0; i < count; i++) {
    const mode = i % 5;
    if (mode === 0) {
      const a = (i / count) * Math.PI * 2 * 7;
      const r = chipR + rnd() * 0.5;
      out[i * 3] = Math.cos(a) * r;
      out[i * 3 + 1] = Math.sin(a) * r * 0.98;
      out[i * 3 + 2] = (rnd() - 0.5) * 0.5;
    } else {
      const side = i % 2 === 0 ? -1 : 1;
      const lane = (i % 8) - 3.5;
      const t = Math.pow(rnd(), 0.85);
      const x = side * (chipR + 0.35 + t * (width * 0.5 - chipR));
      const curve = Math.sin(t * Math.PI) * lane * 0.42;
      out[i * 3] = x;
      out[i * 3 + 1] = lane * 0.16 + curve + (rnd() - 0.5) * 0.18;
      out[i * 3 + 2] = Math.sin(t * Math.PI * 1.2) * 0.9 * (lane > 0 ? 1 : -1);
    }
  }
  return out;
}

export const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Interpolate real XYZ positions between two target arrays.
 * `delays` gives each particle a 0..1 stagger so groups move in waves.
 */
export function morphParticles(from, to, progress, out, delays, spread = 0.35) {
  const p = clamp01(progress);
  const n = out.length / 3;
  const span = 1 - spread;
  for (let i = 0; i < n; i++) {
    let local = p;
    if (delays) {
      const d = delays[i] * spread;
      local = clamp01((p - d) / span);
    }
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
export function radialDelays(positions, invert = false) {
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
export function buildNeighborEdges(
  positions,
  targetNodeCount = 420,
  maxNeighbors = 3,
  maxDist = 1.15,
) {
  const total = positions.length / 3;
  const step = Math.max(1, Math.floor(total / targetNodeCount));
  const nodeIdx = [];
  for (let i = 0; i < total; i += step) nodeIdx.push(i);

  const seen = new Set();
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
      const key = lo * 100000 + hi;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push(lo, hi);
    }
  }

  return new Uint32Array(edges);
}
