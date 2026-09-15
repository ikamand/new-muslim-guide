import type { DayTimes, PrayerId } from '@/lib/prayer-times';

/**
 * The arch the niche widget is drawn in, and where each prayer sits on it.
 *
 * The Today card's mihrab (`components/awqat-arch.tsx`), drawn square so a
 * small widget can hold it: the same curve, longer legs. Each prayer's mark
 * goes where the card puts it, by the card's rule: Fajr and ʿIsha on the legs
 * below the horizon, Maghrib at the right spring point, Dhuhr and ʿAsr on the
 * curve at the fraction of daylight elapsed, corrected for arc length so the
 * crown does not bunch up. This is the geometry the proposal page drew and
 * Iyad looked at on 15 Sep 2026.
 *
 * Changing a number here moves the widgets on both phones over the air: the
 * geometry travels in the schedule, not in native code.
 */

type Point = { x: number; y: number };
type Cubic = { p0: Point; p1: Point; p2: Point; p3: Point };

const LEG_LEFT = 30;
const LEG_RIGHT = 250;
const SPRING_Y = 96;
const BASE_Y = 262;
const CROWN = { x: 140, y: 18 } as const;
/** Where Fajr and ʿIsha sit on the legs: beside the prayer's name, where the text is narrow. */
const NIGHT_Y = 160;

const LEFT: Cubic = { p0: { x: LEG_LEFT, y: SPRING_Y }, p1: { x: LEG_LEFT, y: 50 }, p2: { x: 86, y: 24 }, p3: CROWN };
const RIGHT: Cubic = { p0: CROWN, p1: { x: 194, y: 24 }, p2: { x: LEG_RIGHT, y: 50 }, p3: { x: LEG_RIGHT, y: SPRING_Y } };

export const WIDGET_ARCH = {
  /** x, y, width, height. Headroom above the crown so the ring around Dhuhr is not clipped. */
  viewBox: [-4, -8, 288, 288] as [number, number, number, number],
  outer:
    `M${LEG_LEFT} ${BASE_Y} L${LEG_LEFT} ${SPRING_Y} ` +
    `C${LEFT.p1.x} ${LEFT.p1.y} ${LEFT.p2.x} ${LEFT.p2.y} ${CROWN.x} ${CROWN.y} ` +
    `C${RIGHT.p1.x} ${RIGHT.p1.y} ${RIGHT.p2.x} ${RIGHT.p2.y} ${LEG_RIGHT} ${SPRING_Y} L${LEG_RIGHT} ${BASE_Y}`,
  inner: 'M42 262 L42 100 C42 62 92 40 140 32 C188 40 238 62 238 100 L238 262',
  /** Stroke widths and mark sizes, in viewBox units. */
  stroke: 2.6,
  innerStroke: 1.8,
  disc: 15,
  ring: 19,
  ringStroke: 2.2,
  markSize: 26,
  markStroke: 2.4,
} as const;

function cubicAt(c: Cubic, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * u * c.p0.x + 3 * u * u * t * c.p1.x + 3 * u * t * t * c.p2.x + t * t * t * c.p3.x,
    y: u * u * u * c.p0.y + 3 * u * u * t * c.p1.y + 3 * u * t * t * c.p2.y + t * t * t * c.p3.y,
  };
}

const SAMPLES = 96;
const CURVE: Point[] = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const t = i / SAMPLES;
  return t <= 0.5 ? cubicAt(LEFT, t * 2) : cubicAt(RIGHT, t * 2 - 1);
});
const LENGTHS: number[] = CURVE.reduce<number[]>((acc, point, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + Math.hypot(point.x - CURVE[i - 1].x, point.y - CURVE[i - 1].y));
  return acc;
}, []);

/** A point a fraction of the way along the curve, by distance. */
function curveAt(fraction: number): Point {
  const target = Math.min(1, Math.max(0, fraction)) * LENGTHS[SAMPLES];
  let i = 1;
  while (i < SAMPLES && LENGTHS[i] < target) i += 1;
  const span = LENGTHS[i] - LENGTHS[i - 1];
  const t = span === 0 ? 0 : (target - LENGTHS[i - 1]) / span;
  return {
    x: CURVE[i - 1].x + (CURVE[i].x - CURVE[i - 1].x) * t,
    y: CURVE[i - 1].y + (CURVE[i].y - CURVE[i - 1].y) * t,
  };
}

function daylightFraction(day: DayTimes, time: Date): number {
  const maghrib = day.prayers.find((prayer) => prayer.id === 'maghrib')!.time;
  const span = maghrib.getTime() - day.sunrise.getTime();
  if (span <= 0) return 0;
  return (time.getTime() - day.sunrise.getTime()) / span;
}

const tenth = (value: number) => Math.round(value * 10) / 10;

/** Each mark's centre, in the arch's viewBox, for one day's times. */
export function markPoints(day: DayTimes): Record<PrayerId, [number, number]> {
  const at = (id: PrayerId) => day.prayers.find((prayer) => prayer.id === id)!.time;
  const onCurve = (id: PrayerId): [number, number] => {
    const point = curveAt(daylightFraction(day, at(id)));
    return [tenth(point.x), tenth(point.y)];
  };
  return {
    fajr: [LEG_LEFT, NIGHT_Y],
    dhuhr: onCurve('dhuhr'),
    asr: onCurve('asr'),
    maghrib: [LEG_RIGHT, SPRING_Y],
    isha: [LEG_RIGHT, NIGHT_Y],
  };
}
