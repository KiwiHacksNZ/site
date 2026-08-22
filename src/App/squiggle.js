const rand = (min, max) => min + Math.random() * (max - min);

// Catmull-Rom through the points, converted to cubic Béziers, so the line
// wanders smoothly instead of visibly hinging at each point.
function smoothPath(points) {
  let d = `M${points[0].x} ${points[0].y.toFixed(2)}`;

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

// One tile of underline. Both ends sit on the baseline at a matching angle so
// the tile can repeat seamlessly at any link width.
export function randomSquiggle({
  height = 13,
  baseline = 8.5,
  amplitude = 2.1,
  step = [11, 19],
  loopChance = 0.055,
  maxLoops = 2,
  loopHeight = [7, 9.5],
  loopWidth = [4, 6.5],
  width = [200, 320],
} = {}) {
  const tileWidth = Math.round(rand(width[0], width[1]));
  const points = [{ x: 0, y: baseline }];

  let x = 0;
  let above = Math.random() < 0.5;
  let loops = 0;

  while (x < tileWidth - step[1]) {
    const gap = rand(step[0], step[1]);
    x = Math.min(x + gap, tileWidth - step[0]);

    // Never against the edge, where the tile seam would cut a loop in half.
    const canLoop =
      loops < maxLoops && x > tileWidth * 0.12 && x < tileWidth * 0.88;

    if (canLoop && Math.random() < loopChance) {
      loops += 1;
      x = x - gap + rand(loopWidth[0], loopWidth[1]);
      points.push({
        x: Number(x.toFixed(2)),
        y: baseline,
        loop: rand(loopHeight[0], loopHeight[1]),
      });
      above = Math.random() < 0.5;
      continue;
    }

    const offset = rand(amplitude * 0.45, amplitude);
    points.push({
      x: Number(x.toFixed(2)),
      y: Number((baseline + (above ? -offset : offset)).toFixed(2)),
    });
    above = !above;
  }

  points.push({ x: tileWidth, y: baseline });

  return { d: smoothPath(points), width: tileWidth, height };
}

export function squiggleUri({ d, width, height }, stroke, opacity = 1) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${opacity}"` +
    ` stroke-width="2.4" stroke-linecap="round"/></svg>`;

  // Fully encoded, so the url() needs no quotes and stays valid inside an
  // inline style attribute.
  return `url(data:image/svg+xml,${encodeURIComponent(svg)})`;
}
