import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { DayMarkAt } from '@/components/illustrations';
import type { DayTimes, PrayerId } from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * The Awqat arch — the mihrab whose outline is the sun's path.
 *
 * The old card drew a mihrab AND a separate DayArc, which said "five prayers"
 * twice. This merges them, because the geometry was already telling the
 * truth: the curve is the sun above the horizon, the spring line where the
 * curve meets the straight legs IS the horizon — sunrise on the left, Maghrib
 * on the right — the crown is noon, and the legs are the dark before dawn and
 * after nightfall.
 *
 * Each prayer sits on the outline at its true moment: filled once its time
 * has passed, ringed while it is next, a hollow mark while it is still to
 * come. The sun is a gold dot travelling the same line, and it dips below the
 * spring point after Maghrib exactly as the real one does.
 *
 * ## Motion, and its limits
 *
 * Two animations, both governed by the reduce-motion setting:
 *
 * - The live mark breathes — the sun by day, the next prayer's ring by night
 *   — opacity easing over ~5s. It says "this is live", which is true and
 *   worth saying, because a static arch could be a picture. Nothing bounces.
 * - When the next prayer changes while the card is on screen, its mark blooms
 *   once and settles. Five times a day at most, orienting, never repeated.
 *
 * ## Where the numbers come from
 *
 * Positions are a pure function of (times, now). The curve is the authored
 * cubic pair below, evaluated by de Casteljau — position along it is the
 * fraction of daylight elapsed, so Dhuhr lands near the crown because noon
 * is near the middle of daylight, not because anyone pinned it there. The
 * legs interpolate linearly: Fajr→sunrise on the left, Maghrib→ʿIshāʾ on the
 * right. Before Fajr and after ʿIshāʾ the sun is not drawn — the filled
 * marks carry the night.
 */

/*
  The outline, in one place. `W`/`H` are the viewBox; the card renders it at
  full width so the aspect is preserved by the container, not by stretching.

  Spring points at (LEG_X, SPRING_Y) are the horizon. The curve is two cubics
  meeting at the crown; the legs run straight down to the baseline, which the
  times row sits directly beneath.
*/
const W = 280;
const H = 170;
const LEG_LEFT = 14;
const LEG_RIGHT = 266;
const SPRING_Y = 86;
const CROWN = { x: 140, y: 8 } as const;

/** Where Fajr and ʿIshāʾ sit on the legs. Below is night the card doesn't map. */
const NIGHT_ANCHOR_Y = 138;

const LEFT_CURVE = {
  p0: { x: LEG_LEFT, y: SPRING_Y },
  p1: { x: LEG_LEFT, y: 40 },
  p2: { x: 74, y: 13 },
  p3: CROWN,
} as const;
const RIGHT_CURVE = {
  p0: CROWN,
  p1: { x: 206, y: 13 },
  p2: { x: LEG_RIGHT, y: 40 },
  p3: { x: LEG_RIGHT, y: SPRING_Y },
} as const;

const OUTER_PATH =
  `M${LEG_LEFT} ${H} L${LEG_LEFT} ${SPRING_Y} ` +
  `C${LEFT_CURVE.p1.x} ${LEFT_CURVE.p1.y} ${LEFT_CURVE.p2.x} ${LEFT_CURVE.p2.y} ${CROWN.x} ${CROWN.y} ` +
  `C${RIGHT_CURVE.p1.x} ${RIGHT_CURVE.p1.y} ${RIGHT_CURVE.p2.x} ${RIGHT_CURVE.p2.y} ${LEG_RIGHT} ${SPRING_Y} ` +
  `L${LEG_RIGHT} ${H}`;
const INNER_PATH =
  `M27 ${H} L27 ${SPRING_Y + 2} C27 46 80 23 140 17 C200 23 253 46 253 ${SPRING_Y + 2} L253 ${H}`;

type Point = { x: number; y: number };

function cubicAt(c: { p0: Point; p1: Point; p2: Point; p3: Point }, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * u * c.p0.x + 3 * u * u * t * c.p1.x + 3 * u * t * t * c.p2.x + t * t * t * c.p3.x,
    y: u * u * u * c.p0.y + 3 * u * u * t * c.p1.y + 3 * u * t * t * c.p2.y + t * t * t * c.p3.y,
  };
}

/*
  The curve evaluated at a DAYLIGHT fraction, arc-length corrected.

  Corrected because cubic `t` is not distance: uncorrected, the sun visibly
  slows near the crown, which reads as a rendering bug rather than noon.
  Sampled once at module load — the geometry never changes.
*/
const SAMPLES = 96;
const CURVE_POINTS: Point[] = (() => {
  const pts: Point[] = [];
  for (let i = 0; i <= SAMPLES; i += 1) {
    const t = i / SAMPLES;
    pts.push(t <= 0.5 ? cubicAt(LEFT_CURVE, t * 2) : cubicAt(RIGHT_CURVE, t * 2 - 1));
  }
  return pts;
})();
const CURVE_LENGTHS: number[] = (() => {
  const acc = [0];
  for (let i = 1; i <= SAMPLES; i += 1) {
    const a = CURVE_POINTS[i - 1];
    const b = CURVE_POINTS[i];
    acc.push(acc[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
  }
  return acc;
})();

function curveAt(fraction: number): Point {
  const clamped = Math.min(1, Math.max(0, fraction));
  const target = clamped * CURVE_LENGTHS[SAMPLES];
  let i = 1;
  while (i < SAMPLES && CURVE_LENGTHS[i] < target) i += 1;
  const span = CURVE_LENGTHS[i] - CURVE_LENGTHS[i - 1];
  const t = span === 0 ? 0 : (target - CURVE_LENGTHS[i - 1]) / span;
  const a = CURVE_POINTS[i - 1];
  const b = CURVE_POINTS[i];
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function fraction(start: Date, end: Date, at: Date): number {
  const span = end.getTime() - start.getTime();
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (at.getTime() - start.getTime()) / span));
}

/** A prayer's mark position on the outline, from its actual moment. */
function markFor(id: PrayerId, times: DayTimes): Point {
  const at = (want: PrayerId) => times.prayers.find((p) => p.id === want)!.time;
  switch (id) {
    case 'fajr':
      return { x: LEG_LEFT, y: NIGHT_ANCHOR_Y };
    case 'isha':
      return { x: LEG_RIGHT, y: NIGHT_ANCHOR_Y };
    case 'maghrib':
      // Sunset is the right spring point by definition, not by placement.
      return { x: LEG_RIGHT, y: SPRING_Y };
    default:
      return curveAt(fraction(times.sunrise, at('maghrib'), at(id)));
  }
}

/*
  The travelled day, as distance along the authored path.

  The outline is drawn bottom-left → up the leg → over the curve → down the
  right leg, so "how far the day has come" is a single distance from the
  path's start: the overlay stroke below brightens exactly that much of the
  outline, and the arch visibly fills with gold as the day passes — full by
  ʿIshāʾ, faint again at dawn. Meaning carried by state, not by motion.
*/
const LEG_LEN = H - SPRING_Y;
const CURVE_LEN = CURVE_LENGTHS[SAMPLES];
const PATH_LEN = LEG_LEN * 2 + CURVE_LEN;
const FAJR_DIST = H - NIGHT_ANCHOR_Y;

function travelledAt(times: DayTimes, now: Date): number {
  const at = (want: PrayerId) => times.prayers.find((p) => p.id === want)!.time;
  if (now < at('fajr')) return 0;
  if (now < times.sunrise) {
    return FAJR_DIST + fraction(at('fajr'), times.sunrise, now) * (LEG_LEN - FAJR_DIST);
  }
  if (now < at('maghrib')) {
    return LEG_LEN + fraction(times.sunrise, at('maghrib'), now) * CURVE_LEN;
  }
  const down = fraction(at('maghrib'), at('isha'), now) * (NIGHT_ANCHOR_Y - SPRING_Y);
  return LEG_LEN + CURVE_LEN + down;
}

/** Where the sun is right now, or null when it is night and it isn't drawn. */
function sunAt(times: DayTimes, now: Date): Point | null {
  const at = (want: PrayerId) => times.prayers.find((p) => p.id === want)!.time;
  const fajr = at('fajr');
  const maghrib = at('maghrib');
  const isha = at('isha');

  if (now < fajr || now >= isha) return null;
  if (now < times.sunrise) {
    const t = fraction(fajr, times.sunrise, now);
    return { x: LEG_LEFT, y: NIGHT_ANCHOR_Y + (SPRING_Y - NIGHT_ANCHOR_Y) * t };
  }
  if (now < maghrib) return curveAt(fraction(times.sunrise, maghrib, now));
  const t = fraction(maghrib, isha, now);
  return { x: LEG_RIGHT, y: SPRING_Y + (NIGHT_ANCHOR_Y - SPRING_Y) * t };
}

export function AwqatArch({
  times,
  nextId,
  now,
}: {
  times: DayTimes;
  /** Which prayer's mark is ringed. Null when the next one is tomorrow. */
  nextId: PrayerId | null;
  now: Date;
}) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  const sun = useMemo(() => sunAt(times, now), [times, now]);
  const travelled = useMemo(() => travelledAt(times, now), [times, now]);
  const marks = useMemo(
    () =>
      times.prayers.map((prayer) => ({
        id: prayer.id,
        point: markFor(prayer.id, times),
        passed: now >= prayer.time,
      })),
    [times, now],
  );

  /*
    One breathing value drives whichever mark is live — the sun by day, the
    next prayer's ring by night. Cancelled on unmount and never started under
    reduce-motion, where everything renders at full opacity, still.
  */
  const breath = useSharedValue(1);
  useEffect(() => {
    if (reducedMotion) return;
    breath.value = withRepeat(
      withSequence(
        withTiming(0.55, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
    return () => cancelAnimation(breath);
  }, [breath, reducedMotion]);

  /*
    The bloom: when the next prayer changes while the card is mounted, its
    ring swells once and settles. `nextId` changing IS the moment a prayer
    time arrives (or midnight rolls Fajr over), so no clock-watching needed.
  */
  const bloom = useSharedValue(1);
  useEffect(() => {
    if (reducedMotion || nextId === null) return;
    bloom.value = 1.4;
    bloom.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
  }, [bloom, nextId, reducedMotion]);

  /*
    Opacity AND a whisper of size. Opacity alone read as invisible on a real
    panel (Iyad, on device) — the eye catches growth sooner than fade, so the
    dot swells half a point at the top of each breath. Still nothing bounces.
  */
  const sunProps = useAnimatedProps(() => ({
    opacity: breath.value,
    r: 3.7 + breath.value * 0.9,
  }));
  const ringProps = useAnimatedProps(() => ({
    // The ring breathes only when the sun is down — one live mark at a time.
    opacity: sun ? 1 : breath.value,
    r: 12 * bloom.value,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Six viewBox units of headroom: the crown mark's ring rises above
          the crown itself, and clipping it would behead the next prayer. */}
      <Svg width="100%" height="100%" viewBox={`0 -6 ${W} ${H + 6}`} fill="none">
        <Path d={OUTER_PATH} stroke={theme.gold} strokeWidth={1.2} strokeOpacity={0.4} />
        <Path d={INNER_PATH} stroke={theme.goldSoft} strokeWidth={0.7} />
        {/*
          The day so far, drawn over the outline at full strength. A dash the
          length of the travelled distance, offset to start where Fajr does —
          by ʿIshāʾ the whole arch is lit, and at dawn it is faint again.
        */}
        {travelled > 0 ? (
          <Path
            d={OUTER_PATH}
            stroke={theme.gold}
            strokeWidth={1.3}
            strokeDasharray={`${travelled} ${PATH_LEN * 2}`}
            strokeDashoffset={-FAJR_DIST}
          />
        ) : null}

        {/*
          The sun rides the line BENEATH the signs: drawn before the marks, so
          approaching a prayer it slips behind the paper disc rather than over
          it. The halo is what makes the travelling dot read as the sun and
          not as a sixth mark.
        */}
        {sun ? (
          <>
            <Circle cx={sun.x} cy={sun.y} r={8} fill={theme.gold} fillOpacity={0.18} />
            <AnimatedCircle
              animatedProps={sunProps}
              cx={sun.x}
              cy={sun.y}
              fill={theme.gold}
            />
          </>
        ) : null}

        {/*
          "On the line" — Iyad's pick, 1 Sep 2026: each prayer's mark is its
          day-glyph at its true moment, on a paper disc so the outline reads
          as passing beneath the sign. Passed prayers sink to the hairline
          gold — done, quiet; a checkmark would claim they were prayed, which
          this card cannot know. The next prayer's disc wears the ring (the
          same one that bloomed here when it was a bare circle).
        */}
        {marks.map(({ id, point, passed }) => (
          <G key={id}>
            <Circle cx={point.x} cy={point.y} r={10} fill={theme.background} />
            {id === nextId ? (
              <AnimatedCircle
                animatedProps={ringProps}
                cx={point.x}
                cy={point.y}
                stroke={theme.gold}
                strokeWidth={1.4}
              />
            ) : null}
            <DayMarkAt
              name={id}
              cx={point.x}
              cy={point.y}
              color={passed && id !== nextId ? theme.goldSoft : theme.gold}
            />
          </G>
        ))}
      </Svg>
    </View>
  );
}
