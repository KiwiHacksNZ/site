// A loose hand-drawn line for link underlines. The shape comes from value
// noise sampled in a world space that scrolls, so raising `offset` over time
// pans the whole line left to right and keeps feeding in new shape.

function hash(n, seed) {
  let h = Math.imul(n ^ seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const smoothstep = (t) => t * t * (3 - 2 * t);

function noise(x, seed) {
  const i = Math.floor(x);
  const a = hash(i, seed);
  const b = hash(i + 1, seed);
  return a + (b - a) * smoothstep(x - i);
}

// Two octaves at unrelated frequencies. Gained up and clamped, because the raw
// sum rarely comes near its own limits and leaves the line looking flat.
function wobble(x, seed) {
  const sum =
    (noise(x, seed) - 0.5) * 1.3 + (noise(x * 2.37 + 11.7, seed + 1) - 0.5) * 0.7;

  return Math.max(-1, Math.min(1, sum * 2.1));
}

// Catmull-Rom through the points as cubic Béziers, so the line curves rather
// than hinging at every sample.
function smoothPath(points) {
  let d = `M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    if (p2.loop) {
      // Crossing the control points is what makes the curve self-intersect.
      const dx = p2.x - p1.x;
      d +=
        `C${(p1.x + dx * 2.7).toFixed(2)} ${(p1.y - p2.loop).toFixed(2)}` +
        ` ${(p1.x - dx * 1.7).toFixed(2)} ${(p2.y - p2.loop).toFixed(2)}` +
        ` ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
      continue;
    }

    d +=
      `C${(p1.x + (p2.x - p0.x) / 6).toFixed(2)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(2)}` +
      ` ${(p2.x - (p3.x - p1.x) / 6).toFixed(2)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(2)}` +
      ` ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}

export const SQUIGGLE_HEIGHT = 13;

export function squigglePath({
  width,
  height = SQUIGGLE_HEIGHT,
  offset = 0,
  seed = 1,
  amplitude = 2.9,
  wavelength = 26,
  // How much of the shape is a clean wave rather than noise. The noise is kept
  // on at a low weight so the wave still drifts instead of marching.
  sineWeight = 0.78,
  cell = 27,
  sampleStep = 9,
  loopDensity = 0.13,
  loopWidth = 5.5,
  loopHeight = [7, 9],
} = {}) {
  const baseline = height - 4.5;
  const span = Math.max(width, 24);
  const steps = Math.max(3, Math.round(span / sampleStep));
  const points = [];

  const yAt = (x) => {
    const travelled = x - offset;
    const w = travelled / cell;
    // A slow envelope so the wave breathes along its length instead of holding
    // one amplitude the whole way.
    const envelope = 0.72 + 0.28 * noise(w * 0.21 + 31.7, seed + 7);
    const wave = Math.sin((travelled / wavelength) * Math.PI * 2);
    const shape = wave * sineWeight + wobble(w, seed) * (1 - sineWeight);

    return baseline + shape * amplitude * envelope;
  };

  for (let i = 0; i <= steps; i += 1) {
    const x = (span * i) / steps;
    points.push({ x, y: yAt(x) });
  }

  // Loops live at fixed world positions, so they drift along with the pan
  // rather than sitting at a fixed spot on screen.
  const loops = [];
  const first = Math.floor(-offset / cell) - 1;
  const last = Math.ceil((span - offset) / cell) + 1;

  for (let c = first; c <= last; c += 1) {
    if (hash(c, seed + 101) > loopDensity) continue;

    const x = (c + hash(c, seed + 202)) * cell + offset;
    // Keep clear of both caps, so a loop is never half-drawn.
    if (x < 12 || x + loopWidth > span - 12) continue;

    loops.push({
      x,
      height: loopHeight[0] + hash(c, seed + 303) * (loopHeight[1] - loopHeight[0]),
    });
  }

  // Splice right to left so earlier insertions don't shift later indices.
  loops
    .sort((a, b) => b.x - a.x)
    .forEach((loop) => {
      const at = points.findIndex((point) => point.x > loop.x);
      if (at < 1) return;

      points.splice(
        at,
        0,
        { x: loop.x, y: yAt(loop.x) },
        { x: loop.x + loopWidth, y: yAt(loop.x + loopWidth), loop: loop.height },
      );
    });

  return smoothPath(points);
}
