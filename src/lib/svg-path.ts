import type { MarkPart } from '@/constants/day-marks';

/**
 * SVG path data, reduced to absolute moveto, lineto, cubic and close.
 *
 * The widgets draw the day marks and the arch natively (`docs/widgets.md`).
 * Neither Android's `Canvas` nor SwiftUI reads SVG path data, and the marks
 * use arcs, whose conversion is the one part of this that can go quietly wrong.
 * So it happens once, here, where `npm run widget:check` tests it, and each
 * phone reads only four commands, each one call on its own path type.
 */

export type PathOp =
  | readonly ['M', number, number]
  | readonly ['L', number, number]
  | readonly ['C', number, number, number, number, number, number]
  | readonly ['Z'];

const TOKEN = /[A-Za-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g;

function tokenize(d: string): (string | number)[] {
  const out: (string | number)[] = [];
  for (const match of d.matchAll(TOKEN)) {
    out.push(/^[A-Za-z]$/.test(match[0]) ? match[0] : Number(match[0]));
  }
  return out;
}

/** The commands the day marks and the arch use: M L H V C A Z, absolute or relative. Anything else throws. */
export function toCubicOps(d: string): PathOp[] {
  const list = tokenize(d);
  const ops: PathOp[] = [];
  let index = 0;
  let command = '';
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;

  const number = (): number => {
    const value = list[index];
    index += 1;
    if (typeof value !== 'number') throw new Error(`svg-path: expected a number in "${d}"`);
    return value;
  };

  while (index < list.length) {
    const token = list[index];
    if (typeof token === 'string') {
      command = token;
      index += 1;
    } else if (command === '' || command === 'Z' || command === 'z') {
      throw new Error(`svg-path: a number with no command in "${d}"`);
    }
    const relative = command === command.toLowerCase();
    const ox = relative ? x : 0;
    const oy = relative ? y : 0;

    switch (command.toUpperCase()) {
      case 'M':
        x = number() + ox;
        y = number() + oy;
        startX = x;
        startY = y;
        ops.push(['M', x, y]);
        // Pairs after a moveto are linetos.
        command = relative ? 'l' : 'L';
        break;
      case 'L':
        x = number() + ox;
        y = number() + oy;
        ops.push(['L', x, y]);
        break;
      case 'H':
        x = number() + ox;
        ops.push(['L', x, y]);
        break;
      case 'V':
        y = number() + oy;
        ops.push(['L', x, y]);
        break;
      case 'C': {
        const c1x = number() + ox;
        const c1y = number() + oy;
        const c2x = number() + ox;
        const c2y = number() + oy;
        x = number() + ox;
        y = number() + oy;
        ops.push(['C', c1x, c1y, c2x, c2y, x, y]);
        break;
      }
      case 'A': {
        const rx = number();
        const ry = number();
        const rotation = number();
        const large = number() !== 0;
        const sweep = number() !== 0;
        const ex = number() + ox;
        const ey = number() + oy;
        ops.push(...arcToCubics(x, y, rx, ry, rotation, large, sweep, ex, ey));
        x = ex;
        y = ey;
        break;
      }
      case 'Z':
        ops.push(['Z']);
        x = startX;
        y = startY;
        break;
      default:
        throw new Error(`svg-path: "${command}" is not supported in "${d}"`);
    }
  }
  return ops;
}

/**
 * An elliptical arc as cubics of at most a quarter turn each: the SVG
 * specification's endpoint-to-centre conversion (Implementation Notes, F.6.5),
 * then each segment approximated with control points at 4/3·tan(θ/4).
 */
export function arcToCubics(
  x1: number,
  y1: number,
  rxIn: number,
  ryIn: number,
  rotationDeg: number,
  large: boolean,
  sweep: boolean,
  x2: number,
  y2: number,
): PathOp[] {
  if (x1 === x2 && y1 === y2) return [];
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  if (rx === 0 || ry === 0) return [['L', x2, y2]];

  const phi = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy;
  const y1p = -sin * dx + cos * dy;

  // Radii too small to span the endpoints are scaled up, as the specification says.
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  const numerator = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const denominator = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  let coefficient = denominator === 0 ? 0 : Math.sqrt(Math.max(0, numerator / denominator));
  if (large === sweep) coefficient = -coefficient;
  const cxp = (coefficient * rx * y1p) / ry;
  const cyp = (-coefficient * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2;
  const cy = sin * cxp + cos * cyp + (y1 + y2) / 2;

  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const cosine = (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
    const value = Math.acos(Math.min(1, Math.max(-1, cosine)));
    return ux * vy - uy * vx < 0 ? -value : value;
  };
  const theta = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let delta = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  else if (sweep && delta < 0) delta += 2 * Math.PI;

  const segments = Math.max(1, Math.ceil(Math.abs(delta) / (Math.PI / 2) - 1e-9));
  const step = delta / segments;
  const k = (4 / 3) * Math.tan(step / 4);
  const place = (ux: number, uy: number): [number, number] => [
    cos * rx * ux - sin * ry * uy + cx,
    sin * rx * ux + cos * ry * uy + cy,
  ];

  const ops: PathOp[] = [];
  let t = theta;
  for (let segment = 0; segment < segments; segment += 1) {
    const t2 = t + step;
    const [c1x, c1y] = place(Math.cos(t) - k * Math.sin(t), Math.sin(t) + k * Math.cos(t));
    const [c2x, c2y] = place(Math.cos(t2) + k * Math.sin(t2), Math.sin(t2) - k * Math.cos(t2));
    const last = segment === segments - 1;
    const [ex, ey] = last ? [x2, y2] : place(Math.cos(t2), Math.sin(t2));
    ops.push(['C', c1x, c1y, c2x, c2y, ex, ey]);
    t = t2;
  }
  return ops;
}

/** A circle as a closed path of two half-turn arcs, each split into quarter-turn cubics. */
export function circleToCubics(cx: number, cy: number, r: number): PathOp[] {
  return [
    ['M', cx + r, cy],
    ...arcToCubics(cx + r, cy, r, r, 0, false, true, cx - r, cy),
    ...arcToCubics(cx - r, cy, r, r, 0, false, true, cx + r, cy),
    ['Z'],
  ];
}

const figure = (value: number) => String(Math.round(value * 1000) / 1000);

/** "M 1 2 C …", three decimals: finer than a pixel at any widget size. */
export function serializeOps(ops: readonly PathOp[]): string {
  return ops.map((op) => [op[0], ...(op.slice(1) as number[]).map(figure)].join(' ')).join(' ');
}

export function markPartsToPath(parts: readonly MarkPart[]): string {
  return serializeOps(parts.flatMap((part) => ('d' in part ? toCubicOps(part.d) : circleToCubics(part.cx, part.cy, part.r))));
}
