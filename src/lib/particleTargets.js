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

/** Wide orbital particle ribbon inspired by a techno-particle sample background. */
export function scatterCloud(count, width, height, depth, seed = 9021) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const bucket = i % 14;

    if (bucket < 8) {
      const ring = bucket % 5;
      const t = rnd();
      const angle =
        t * Math.PI * 2 + ring * 0.62 + Math.sin(t * Math.PI * 2.5) * 0.18;
      const rx = width * (0.17 + ring * 0.035);
      const ry = height * (0.055 + ring * 0.014);
      const swirl = Math.sin(angle * 2.1 + ring) * height * 0.018;
      out[i3] = Math.cos(angle) * rx + Math.sin(angle * 0.58) * width * 0.03;
      out[i3 + 1] =
        height * 0.13 + Math.sin(angle) * ry + swirl + (rnd() - 0.5) * 0.055;
      out[i3 + 2] = Math.cos(angle + ring) * depth * 0.22;
    } else if (bucket < 10) {
      const side = bucket === 8 ? -1 : 1;
      const t = rnd();
      const x = side * width * (0.24 + t * 0.23);
      const wave =
        Math.sin(t * Math.PI * 2.3 + side * 0.85) * height * 0.05 +
        Math.sin(t * Math.PI * 5.2) * height * 0.014;
      out[i3] = x;
      out[i3 + 1] =
        height * 0.08 + wave + side * Math.sin(t * Math.PI) * height * 0.02;
      out[i3 + 2] = (rnd() - 0.5) * depth * 0.34;
    } else if (bucket < 12) {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.pow(rnd(), 0.42) * Math.min(width, height) * 0.085;
      out[i3] = Math.cos(angle) * radius * 0.9;
      out[i3 + 1] = height * 0.02 + Math.sin(angle) * radius * 0.95;
      out[i3 + 2] = (rnd() - 0.5) * depth * 0.2;
    } else {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.pow(rnd(), 0.58) * Math.min(width, height) * 0.44;
      out[i3] = Math.cos(angle) * radius * 1.34;
      out[i3 + 1] = height * 0.08 + Math.sin(angle) * radius * 0.44;
      out[i3 + 2] = (rnd() - 0.5) * depth * 0.5;
    }
  }
  return out;
}

/** Director-section formation: CNN pipeline with strong layer silhouettes. */
export function directorMessageFormation(
  count,
  width,
  height,
  depth,
  center = [0, 0, 0],
  seed = 3030,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;
  const unit = Math.min(w, h);
  const inputX = -w * 0.3;
  const convX = -w * 0.11;
  const poolX = w * 0.06;
  const flattenX = w * 0.18;
  const denseX = w * 0.27;
  const outputX = w * 0.36;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z;
  };

  const putLine = (i, x1, y1, x2, y2, t, jitter = 0.0025) => {
    put(
      i,
      x1 + (x2 - x1) * t + (rnd() - 0.5) * w * jitter,
      y1 + (y2 - y1) * t + (rnd() - 0.5) * h * jitter,
      (rnd() - 0.5) * depth * 0.08,
    );
  };

  const putRect = (i, cx, cy, rectW, rectH, z = 0, fill = false) => {
    if (fill && rnd() > 0.44) {
      put(
        i,
        cx + (rnd() - 0.5) * rectW * 0.68,
        cy + (rnd() - 0.5) * rectH * 0.68,
        z + (rnd() - 0.5) * depth * 0.025,
      );
      return;
    }

    const side = Math.floor(rnd() * 4);
    const t = rnd();
    const left = cx - rectW / 2;
    const right = cx + rectW / 2;
    const top = cy + rectH / 2;
    const bottom = cy - rectH / 2;

    if (side === 0) putLine(i, left, top, right, top, t, 0.002);
    else if (side === 1) putLine(i, right, top, right, bottom, t, 0.002);
    else if (side === 2) putLine(i, right, bottom, left, bottom, t, 0.002);
    else putLine(i, left, bottom, left, top, t, 0.002);

    out[i * 3 + 2] += z;
  };

  const putGridPoint = (i, cx, cy, grid, size) => {
    const cell = i % (grid * grid);
    const col = cell % grid;
    const row = Math.floor(cell / grid);
    const step = size / (grid - 1);
    const snap = rnd() > 0.22;
    const x =
      cx - size / 2 + col * step + (snap ? 0 : (rnd() - 0.5) * step * 0.52);
    const y =
      cy + size / 2 - row * step + (snap ? 0 : (rnd() - 0.5) * step * 0.52);
    put(i, x, y, (rnd() - 0.5) * depth * 0.05);
  };

  const putCircle = (i, cx, cy, radius, z = 0) => {
    const angle = rnd() * Math.PI * 2;
    const ringRadius = radius * (0.78 + rnd() * 0.28);
    put(
      i,
      cx + Math.cos(angle) * ringRadius,
      cy + Math.sin(angle) * ringRadius,
      z + Math.cos(angle) * depth * 0.025,
    );
  };

  const putBezier = (i, x0, y0, x1, y1, x2, y2, t) => {
    const mt = 1 - t;
    put(
      i,
      mt * mt * x0 + 2 * mt * t * x1 + t * t * x2,
      mt * mt * y0 + 2 * mt * t * y1 + t * t * y2,
      (rnd() - 0.5) * depth * 0.1,
    );
  };

  for (let i = 0; i < count; i++) {
    const group = i / count;

    if (group < 0.18) {
      putGridPoint(i, inputX, 0, 13, unit * 0.46);
    } else if (group < 0.42) {
      const local = i - Math.floor(count * 0.18);
      const map = local % 5;
      const offsetX = map * w * 0.014;
      const offsetY = map * h * 0.025;
      putRect(
        i,
        convX + offsetX,
        h * 0.12 - offsetY,
        unit * 0.38,
        unit * 0.28,
        -map * depth * 0.035,
        true,
      );
    } else if (group < 0.57) {
      const local = i - Math.floor(count * 0.42);
      const map = local % 4;
      const offsetX = map * w * 0.014;
      const offsetY = map * h * 0.028;
      putRect(
        i,
        poolX + offsetX,
        -h * 0.02 - offsetY,
        unit * 0.24,
        unit * 0.18,
        -map * depth * 0.04,
        true,
      );
    } else if (group < 0.7) {
      const band = i % 7;
      const t = rnd();
      const pairs = [
        [inputX + unit * 0.24, 0, convX - unit * 0.2, h * 0.11],
        [convX + unit * 0.21, h * 0.08, poolX - unit * 0.13, -h * 0.02],
        [poolX + unit * 0.13, -h * 0.06, flattenX - unit * 0.04, 0],
      ];
      const pair = pairs[i % pairs.length];
      putBezier(
        i,
        pair[0],
        pair[1] + (band - 3) * h * 0.025,
        (pair[0] + pair[2]) / 2,
        (pair[1] + pair[3]) / 2 + (band - 3) * h * 0.04,
        pair[2],
        pair[3] + (band - 3) * h * 0.018,
        t,
      );
    } else if (group < 0.8) {
      const lane = i % 20;
      const y = (0.5 - lane / 19) * h * 0.56;
      put(
        i,
        flattenX + (rnd() - 0.5) * w * 0.008,
        y + (rnd() - 0.5) * h * 0.006,
        (rnd() - 0.5) * depth * 0.08,
      );
    } else if (group < 0.94) {
      const local = i - Math.floor(count * 0.8);
      const layer = local % 3;
      const nodeCounts = [6, 5, 3];
      const nodeCount = nodeCounts[layer];
      const node = Math.floor(rnd() * nodeCount);
      const x = denseX + layer * w * 0.055;
      const y = (0.5 - node / (nodeCount - 1)) * h * (0.45 - layer * 0.07);

      if (rnd() > 0.34 || layer === 2) {
        putCircle(i, x, y, unit * 0.03, layer * depth * 0.015);
      } else {
        const nextCount = nodeCounts[Math.min(layer + 1, 2)];
        const nextNode = Math.floor(rnd() * nextCount);
        const nextX = denseX + (layer + 1) * w * 0.055;
        const nextY =
          (0.5 - nextNode / (nextCount - 1)) * h * (0.45 - (layer + 1) * 0.07);
        putLine(i, x, y, nextX, nextY, rnd(), 0.003);
      }
    } else if (group < 0.995) {
      const bar = i % 4;
      const t = rnd();
      const y = h * (0.18 - bar * 0.1);
      const barW = unit * (0.1 + bar * 0.035);
      putLine(i, outputX, y, outputX + barW, y, t, 0.003);
    } else {
      put(
        i,
        (rnd() - 0.5) * w * 0.98,
        (rnd() - 0.5) * h * 0.72,
        (rnd() - 0.5) * depth * 0.42,
      );
    }
  }

  return out;
}

const ANN_LAYER_COUNTS = [5, 6, 6, 4];

export function buildAnnLayerEdges() {
  const edges = [];
  let fromStart = 0;

  for (let layer = 0; layer < ANN_LAYER_COUNTS.length - 1; layer++) {
    const fromCount = ANN_LAYER_COUNTS[layer];
    const toCount = ANN_LAYER_COUNTS[layer + 1];
    const toStart = fromStart + fromCount;

    for (let from = 0; from < fromCount; from++) {
      for (let to = 0; to < toCount; to++) {
        edges.push(fromStart + from, toStart + to);
      }
    }

    fromStart = toStart;
  }

  return new Uint32Array(edges);
}

function annLayers(width, height) {
  const layerGap = 0.78 / Math.max(1, ANN_LAYER_COUNTS.length - 1);

  return ANN_LAYER_COUNTS.map((nodeCount, layerIndex) => {
    const x = (-0.39 + layerIndex * layerGap) * width;
    const verticalSpan = 0.68;

    return {
      x,
      nodes: Array.from({ length: nodeCount }, (_, nodeIndex) => {
        const ratio = nodeCount === 1 ? 0.5 : nodeIndex / (nodeCount - 1);
        return (0.5 - ratio) * verticalSpan * height;
      }),
    };
  });
}

/** ANN-style network: clean input/hidden/output layers with feed-forward paths. */
export function annNetworkFormation(
  count,
  width,
  height,
  depth,
  center = [0, 0, 0],
  seed = 5151,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const layers = annLayers(width, height);
  const nodes = layers.flatMap((layer, layerIndex) =>
    layer.nodes.map((y, nodeIndex) => ({
      layerIndex,
      nodeIndex,
      x: layer.x,
      y,
    })),
  );
  const nodeCount = Math.min(nodes.length, count);
  const edgeIndices = buildAnnLayerEdges();
  const edgePairCount = edgeIndices.length / 2;
  const nodeRingBase = Math.min(width, height) * 0.022;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z;
  };

  for (let i = 0; i < nodeCount; i++) {
    const node = nodes[i];
    put(i, node.x, node.y, 0);
  }

  for (let i = nodeCount; i < count; i++) {
    const local = i - nodeCount;
    const bucket = local % 12;

    if (bucket < 5 || edgePairCount === 0) {
      const node = nodes[local % nodeCount];
      const ring = Math.floor(local / nodeCount) % 4;
      const angle = GOLDEN * local + ring * 0.42;
      const radius = nodeRingBase * (1.45 + ring * 0.32 + rnd() * 0.14);
      put(
        i,
        node.x + Math.cos(angle) * radius,
        node.y + Math.sin(angle) * radius * 0.92,
        Math.cos(angle) * depth * 0.045,
      );
    } else {
      const edgePair = Math.floor((local * 1.618) % edgePairCount);
      const fromNode = nodes[edgeIndices[edgePair * 2]];
      const toNode = nodes[edgeIndices[edgePair * 2 + 1]];
      const lane = Math.floor(local / edgePairCount) % 18;
      const t = (lane + 0.5 + rnd() * 0.12) / 18;
      const ease = t * t * (3 - 2 * t);
      const bow =
        Math.sin(t * Math.PI) * (bucket % 2 === 0 ? 1 : -1) * height * 0.004;

      put(
        i,
        fromNode.x + (toNode.x - fromNode.x) * ease,
        fromNode.y + (toNode.y - fromNode.y) * ease + bow,
        (rnd() - 0.5) * depth * 0.08,
      );
    }
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

/** Hybrid learning object: clean abstract ribbons and soft orbital clusters. */
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

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z + (rnd() - 0.5) * 0.28;
  };

  for (let i = 0; i < count; i++) {
    const bucket = i % 10;

    if (bucket < 5) {
      const lane = bucket - 2;
      const t = rnd();
      const x = (t - 0.5) * w * 0.84;
      const sweep = t * Math.PI * 2.4;
      const y =
        Math.sin(sweep + lane * 0.64) * h * 0.18 +
        Math.sin(sweep * 0.52 - lane) * h * 0.08 +
        lane * h * 0.045;
      const z = Math.cos(sweep + lane * 0.7) * 0.52;
      put(i, x, y, z);
    } else if (bucket < 8) {
      const cluster = bucket === 5 ? -1 : bucket === 6 ? 0 : 1;
      const t = rnd();
      const angle = t * Math.PI * 2;
      const radius = (0.28 + rnd() * 0.9) * Math.min(w, h) * 0.14;
      const anchorX = cluster * w * 0.18;
      const anchorY = Math.sin(cluster * 1.7) * h * 0.08;
      put(
        i,
        anchorX + Math.cos(angle) * radius,
        anchorY + Math.sin(angle) * radius * 0.68,
        Math.sin(angle * 1.3) * 0.45,
      );
    } else {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.sqrt(rnd()) * Math.min(w, h) * 0.36;
      const x = Math.cos(angle) * radius * 1.55;
      const y = Math.sin(angle) * radius * 0.54;
      put(i, x, y, (rnd() - 0.5) * 0.62);
    }
  }

  return out;
}

/** Courses scene: deep-learning chip with layered neural paths and data arcs. */
export function deepLearningCourseFormation(
  count,
  width,
  height,
  depth,
  center = [0, 0, 0],
  seed = 4242,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;
  const chipW = Math.min(w * 0.24, 3.25);
  const chipH = Math.min(h * 0.38, 2.2);
  const layerCounts = [4, 6, 6, 4];
  const layerXs = [-0.38, -0.16, 0.16, 0.38].map((x) => x * w);
  const nodes = layerCounts.flatMap((nodeCount, layerIndex) => {
    const span = h * (layerIndex === 1 || layerIndex === 2 ? 0.52 : 0.42);
    return Array.from({ length: nodeCount }, (_, nodeIndex) => {
      const ratio = nodeCount === 1 ? 0.5 : nodeIndex / (nodeCount - 1);
      return {
        x: layerXs[layerIndex],
        y: (0.5 - ratio) * span,
        layerIndex,
      };
    });
  });

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z;
  };

  const pointOnChipEdge = (t) => {
    const side = Math.floor(t * 4);
    const local = t * 4 - side;
    if (side === 0) return [-chipW / 2 + local * chipW, chipH / 2];
    if (side === 1) return [chipW / 2, chipH / 2 - local * chipH];
    if (side === 2) return [chipW / 2 - local * chipW, -chipH / 2];
    return [-chipW / 2, -chipH / 2 + local * chipH];
  };

  for (let i = 0; i < count; i++) {
    const bucket = i % 24;

    if (bucket < 5) {
      const node = nodes[i % nodes.length];
      const ring = Math.floor(i / nodes.length) % 5;
      const angle = GOLDEN * i + ring * 0.32;
      const radius = Math.min(w, h) * (0.018 + ring * 0.006 + rnd() * 0.003);
      put(
        i,
        node.x + Math.cos(angle) * radius,
        node.y + Math.sin(angle) * radius,
        Math.cos(angle) * depth * 0.035,
      );
    } else if (bucket < 13) {
      const fromLayer = bucket % 3;
      const from = nodes.filter((node) => node.layerIndex === fromLayer);
      const to = nodes.filter((node) => node.layerIndex === fromLayer + 1);
      const a = from[Math.floor(rnd() * from.length)];
      const b = to[Math.floor(rnd() * to.length)];
      const t = rnd();
      const ease = t * t * (3 - 2 * t);
      const lift = Math.sin(t * Math.PI) * (rnd() - 0.5) * h * 0.018;
      put(
        i,
        a.x + (b.x - a.x) * ease,
        a.y + (b.y - a.y) * ease + lift,
        (rnd() - 0.5) * depth * 0.12,
      );
    } else if (bucket < 17) {
      const [edgeX, edgeY] = pointOnChipEdge(rnd());
      put(
        i,
        edgeX + (rnd() - 0.5) * w * 0.01,
        edgeY + (rnd() - 0.5) * h * 0.01,
        (rnd() - 0.5) * depth * 0.08,
      );
    } else if (bucket < 20) {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.min(chipW, chipH) * (0.18 + rnd() * 0.32);
      put(
        i,
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.sin(angle) * depth * 0.08,
      );
    } else if (bucket < 23) {
      const lane = bucket - 21;
      const t = rnd();
      const x = (t - 0.5) * w * 0.88;
      const wave =
        Math.sin(t * Math.PI * 2.2 + lane * 1.3) * h * 0.12 +
        Math.sin(t * Math.PI * 6.4) * h * 0.022;
      const y = (lane === -1 ? -1 : 1) * h * 0.31 + wave;
      put(i, x, y, Math.cos(t * Math.PI * 2) * depth * 0.14);
    } else {
      put(
        i,
        (rnd() - 0.5) * w * 0.96,
        (rnd() - 0.5) * h * 0.78,
        (rnd() - 0.5) * depth * 0.5,
      );
    }
  }

  return out;
}

/** Launch events object: clean launch burst with orbit arcs and flowing trails. */
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

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x + (rnd() - 0.5) * 0.025;
    out[i3 + 1] = center[1] + y + (rnd() - 0.5) * 0.025;
    out[i3 + 2] = center[2] + z + (rnd() - 0.5) * 0.16;
  };

  for (let i = 0; i < count; i++) {
    const bucket = i % 12;

    if (bucket < 4) {
      const arcIndex = bucket;
      const t = rnd();
      const start = -Math.PI * (0.08 + arcIndex * 0.1);
      const end = Math.PI * (1.08 + arcIndex * 0.08);
      const angle = start + (end - start) * t;
      const radius = Math.min(w, h) * (0.23 + arcIndex * 0.055);
      const x = Math.cos(angle) * radius * (1.4 + arcIndex * 0.04);
      const y =
        Math.sin(angle) * radius * (0.44 + arcIndex * 0.04) +
        Math.sin(t * Math.PI) * h * 0.05;
      put(i, x, y, Math.cos(angle * 1.2) * 0.46);
    } else if (bucket < 8) {
      const trail = bucket - 4;
      const t = rnd();
      const side = trail % 2 === 0 ? -1 : 1;
      const x = side * w * (0.08 + t * 0.36);
      const y =
        Math.sin(t * Math.PI * 1.35 + trail * 0.72) * h * 0.18 +
        (trail - 1.5) * h * 0.035;
      put(i, x, y, Math.sin(t * Math.PI) * side * 0.58);
    } else if (bucket < 11) {
      const cluster = bucket - 9;
      const angle = rnd() * Math.PI * 2;
      const radius = Math.sqrt(rnd()) * Math.min(w, h) * 0.115;
      const anchorX = cluster * w * 0.2;
      const anchorY = (cluster === 0 ? -1 : 1) * h * 0.13;
      put(
        i,
        anchorX + Math.cos(angle) * radius,
        anchorY + Math.sin(angle) * radius * 0.75,
        Math.cos(angle) * 0.34,
      );
    } else {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.pow(rnd(), 0.72) * Math.min(w, h) * 0.48;
      put(
        i,
        Math.cos(angle) * radius * 1.22,
        Math.sin(angle) * radius * 0.52,
        (rnd() - 0.5) * 0.62,
      );
    }
  }

  return out;
}

/** Full-screen campus splash: airy particle mist with a bright central burst. */
export function particleSplashFormation(
  count,
  width,
  height,
  depth,
  center = [0, 0, 0],
  seed = 6262,
) {
  const out = new Float32Array(count * 3);
  const rnd = makeRandom(seed);
  const w = width;
  const h = height;

  const put = (i, x, y, z = 0) => {
    const i3 = i * 3;
    out[i3] = center[0] + x;
    out[i3 + 1] = center[1] + y;
    out[i3 + 2] = center[2] + z;
  };

  for (let i = 0; i < count; i++) {
    const bucket = i % 16;

    if (bucket < 9) {
      const x = (rnd() - 0.5) * w;
      const y = (rnd() - 0.5) * h;
      put(i, x, y, (rnd() - 0.5) * depth);
    } else if (bucket < 13) {
      const ray = bucket - 9;
      const angle =
        -Math.PI * 0.86 + (ray / 3) * Math.PI * 1.72 + (rnd() - 0.5) * 0.34;
      const radius = Math.pow(rnd(), 0.34) * Math.min(w, h) * 0.72;
      const lift = Math.sin(radius * 1.4 + ray) * h * 0.024;
      put(
        i,
        Math.cos(angle) * radius * 1.85,
        Math.sin(angle) * radius * 0.8 + lift,
        Math.sin(angle + radius) * depth * 0.28,
      );
    } else if (bucket < 15) {
      const side = bucket === 13 ? -1 : 1;
      const t = rnd();
      const x = side * w * (0.12 + t * 0.44);
      const y =
        (rnd() - 0.5) * h * 0.96 + Math.sin(t * Math.PI * 3.2) * h * 0.05;
      put(i, x, y, (rnd() - 0.5) * depth * 0.62);
    } else {
      const angle = rnd() * Math.PI * 2;
      const radius = Math.pow(rnd(), 0.3) * Math.min(w, h) * 0.34;
      put(
        i,
        Math.cos(angle) * radius * 1.4,
        Math.sin(angle) * radius,
        (rnd() - 0.5) * depth * 0.34,
      );
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
