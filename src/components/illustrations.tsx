import type { Posture } from '@/content/types';

import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';

import type { DayTimes, PrayerId } from '@/lib/prayer-times';

/**
 * Non-figurative marks: architecture, geometry and diagram, never a body.
 *
 * Islamic visual tradition avoids depicting living beings, and most prayer
 * apps draw a silhouette bowing anyway. Nothing here does. Where a posture has
 * to be shown it is the ground line plus the body's axis, which carries the
 * same information without making that call on a user's behalf.
 *
 * `PostureFigure` below is that rule applied, not an exception to it: a spine
 * and the angle it holds, with the head end marked as a point. The angle is
 * the whole information — upright, right-angled, down — so a silhouette would
 * add a depiction and no meaning.
 *
 * ⚠️ REVIEW REQUIRED — whether to draw figures at all is a judgment about
 * substance, not layout. The decision here is deliberate but unreviewed.
 */

/** Every glyph is drawn on this grid, so they hold together at any size. */
const GRID = 24;

/**
 * A mihrab — the niche in a mosque wall that marks the qibla.
 *
 * It frames the next prayer because it means the direction you face, which is
 * the one thing the card is about. Drawn faint: it orients, it doesn't shout.
 */
export function MihrabArch({
  color,
  width = 200,
  opacity = 0.16,
}: {
  color: string;
  width?: number;
  opacity?: number;
}) {
  const height = (width / 200) * 190;

  return (
    <Svg width={width} height={height} viewBox="0 0 200 190" fill="none">
      <Path
        d="M14 190 L14 84 Q14 26 100 8 Q186 26 186 84 L186 190"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M32 190 L32 88 Q32 40 100 26 Q168 40 168 88 L168 190"
        stroke={color}
        strokeOpacity={opacity * 0.62}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M100 40 L106 52 L118 58 L106 64 L100 76 L94 64 L82 58 L94 52 Z"
        stroke={color}
        strokeOpacity={opacity * 1.25}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** One eight-point khatim, as a path. Two overlapped squares, drawn as points. */
function khatim(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];

  for (let i = 0; i < 16; i += 1) {
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)} ${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }

  return `M ${points.join(' L ')} Z`;
}

/**
 * A girih band — tessellating eight-point stars.
 *
 * Used once, on the card that leads the Learn tab, because someone who has not
 * said the shahada yet should not have to pick that card out of six identical
 * rows.
 */
export function GirihBand({ color, height = 76 }: { color: string; height?: number }) {
  const tile = 44;
  /**
   * Drawn at a fixed size and cropped by the parent rather than measured and
   * scaled: `slice` keeps the scale at 1:1 and clips the overflow, so a star
   * is 44px on a phone and 44px on a tablet. Measuring first would also mean
   * an empty band on the first paint, which is what the web export caught.
   */
  const band = 800;
  const columns = Math.ceil(band / tile) + 1;
  const rows = Math.ceil(height / tile) + 1;
  const cells: { cx: number; cy: number }[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push({ cx: column * tile + (row % 2 ? 0 : tile / 2), cy: row * tile - tile / 4 });
    }
  }

  return (
    <Svg
      width="100%"
      height={height}
      viewBox={`0 0 ${band} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none">
      <G>
        {cells.map(({ cx, cy }, index) => (
          <G key={index}>
            <Path
              d={khatim(cx, cy, 18, 9)}
              stroke={color}
              strokeOpacity={0.42}
              strokeWidth={1}
              strokeLinejoin="round"
            />
            <Line x1={cx - 22} y1={cy} x2={cx - 18} y2={cy} stroke={color} strokeOpacity={0.24} strokeWidth={1} />
            <Line x1={cx + 18} y1={cy} x2={cx + 22} y2={cy} stroke={color} strokeOpacity={0.24} strokeWidth={1} />
          </G>
        ))}
      </G>
    </Svg>
  );
}

const ARC = {
  width: 294,
  height: 62,
  /** Where the ground is. Everything above is daylight. */
  horizon: 46,
  /** How high the sun climbs at its peak. */
  peak: 36,
  /** How far the pre-dawn and night tails fall below the horizon. */
  dip: 10,
  pad: 6,
} as const;

/**
 * The day, as a shape.
 *
 * A born Muslim already knows Asr is late afternoon. Someone three weeks in
 * has never structured a day around the sun, and five times in a row never
 * teaches it — so each prayer sits at its real position on the sun's path,
 * with the pre-dawn and night stretches dashed below the horizon.
 *
 * The span is Fajr to Isha, so every dot is at its true fraction of the day.
 * Maghrib is sunset by definition, which is what anchors the right-hand end
 * of the daylight arc.
 */
export function DayArc({
  today,
  color,
  mutedColor,
  highlight,
}: {
  today: DayTimes;
  color: string;
  mutedColor: string;
  /** The prayer to fill in. Null when the next one is tomorrow's. */
  highlight: PrayerId | null;
}) {
  const at = (id: PrayerId) => today.prayers.find((prayer) => prayer.id === id)?.time.getTime();

  const fajr = at('fajr');
  const maghrib = at('maghrib');
  const isha = at('isha');
  const sunrise = today.sunrise.getTime();

  // Polar latitudes can collapse or invert the day. No arc beats a wrong one.
  if (
    fajr === undefined ||
    maghrib === undefined ||
    isha === undefined ||
    !Number.isFinite(sunrise) ||
    isha <= fajr ||
    maghrib <= sunrise
  ) {
    return null;
  }

  const span = isha - fajr;
  const x = (time: number) => ARC.pad + ((time - fajr) / span) * (ARC.width - ARC.pad * 2);

  const sunriseX = x(sunrise);
  const sunsetX = x(maghrib);

  /**
   * The daylight arc is a quadratic Bézier whose control point sits at twice
   * the peak height, which puts its apex exactly at `peak` — and because the
   * control point is horizontally centred, x moves linearly along the curve.
   * That makes a dot's height a closed form rather than a curve solve.
   */
  const heightAt = (px: number) => {
    const u = (px - sunriseX) / (sunsetX - sunriseX);
    return ARC.horizon - 4 * ARC.peak * u * (1 - u);
  };

  const dots = today.prayers.map((prayer) => {
    const px = x(prayer.time.getTime());
    const daylight = px >= sunriseX && px <= sunsetX;

    return {
      id: prayer.id,
      x: px,
      y: daylight ? heightAt(px) : ARC.horizon + ARC.dip,
      isNext: prayer.id === highlight,
    };
  });

  return (
    <Svg width="100%" height={ARC.height} viewBox={`0 0 ${ARC.width} ${ARC.height}`} fill="none">
      <Line x1={0} y1={ARC.horizon} x2={ARC.width} y2={ARC.horizon} stroke={mutedColor} strokeWidth={1} />

      <Path
        d={`M ${sunriseX} ${ARC.horizon} Q ${(sunriseX + sunsetX) / 2} ${ARC.horizon - 2 * ARC.peak} ${sunsetX} ${ARC.horizon}`}
        stroke={color}
        strokeOpacity={0.3}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d={`M ${ARC.pad} ${ARC.horizon + ARC.dip} Q ${(ARC.pad + sunriseX) / 2} ${ARC.horizon + ARC.dip} ${sunriseX} ${ARC.horizon}`}
        stroke={color}
        strokeOpacity={0.3}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
      <Path
        d={`M ${sunsetX} ${ARC.horizon} Q ${(sunsetX + ARC.width - ARC.pad) / 2} ${ARC.horizon + ARC.dip} ${ARC.width - ARC.pad} ${ARC.horizon + ARC.dip}`}
        stroke={color}
        strokeOpacity={0.3}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="2 4"
      />

      {dots.map((dot) =>
        dot.isNext ? (
          <G key={dot.id}>
            <Circle cx={dot.x} cy={dot.y} r={7} fill={mutedColor} />
            <Circle cx={dot.x} cy={dot.y} r={4} fill={color} />
          </G>
        ) : (
          <Circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={3.5}
            fill={mutedColor}
            stroke={color}
            strokeOpacity={0.55}
            strokeWidth={1.5}
          />
        ),
      )}
    </Svg>
  );
}

/**
 * Where the body is, at each point of the prayer.
 *
 * `Posture` in `src/content/types.ts` has always said it "drives the posture
 * illustration", and there was no illustration — the guide screen printed the
 * name in a pill instead: "Standing", "Bowing", "Prostrating". A word is the
 * wrong medium. Someone one-handed on a mat, part-way through a movement,
 * needs to see the shape; reading a label costs them the glance that seeing it
 * would have been.
 *
 * **No figures.** This obeys the rule at the top of this file rather than
 * making an exception for itself: the drawing is the ground plus the body's
 * axis — a spine and the angle it holds. That is not a lesser version of a
 * silhouette. The angle *is* the entire information: qiyam is upright, rukuʿ
 * is the right angle, sujud is down. A head and limbs would add nothing except
 * a depiction this app has decided not to make.
 *
 * `standing` and `rising` are drawn apart on purpose — the fold of the hands
 * in qiyam against the open line of iʿtidal is the thing beginners most often
 * get wrong, and the one a text label cannot express at all.
 */
export function PostureFigure({
  posture,
  color,
  size = 48,
}: {
  posture: Posture;
  color: string;
  size?: number;
}) {
  const axis = {
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  /** Where the head end of the axis is, marked as a point rather than drawn. */
  const mark = { fill: color, stroke: 'none' };

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M6 42h36"
        stroke={color}
        strokeOpacity={0.3}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {posture === 'standing' && (
        <G>
          <Path d="M24 10v32" {...axis} />
          {/* The fold, at the height the hands are held. */}
          <Path d="M17 26h14" {...axis} strokeWidth={1.6} />
          <Circle cx={24} cy={10} r={2.6} {...mark} />
        </G>
      )}

      {posture === 'rising' && (
        <G>
          <Path d="M24 10v32" {...axis} />
          <Circle cx={24} cy={10} r={2.6} {...mark} />
        </G>
      )}

      {posture === 'bowing' && (
        <G>
          {/* Legs upright, back level — the right angle that defines rukuʿ. */}
          <Path d="M30 42V22" {...axis} />
          <Path d="M30 22H12" {...axis} />
          <Circle cx={12} cy={22} r={2.6} {...mark} />
        </G>
      )}

      {posture === 'prostrating' && (
        <G>
          <Path d="M32 42V32" {...axis} />
          <Path d="M32 32q-9 0-16 8" {...axis} />
          <Circle cx={15} cy={39.5} r={2.6} {...mark} />
        </G>
      )}

      {posture === 'sitting' && (
        <G>
          <Path d="M24 16v18" {...axis} />
          <Path d="M16 40h16" {...axis} />
          <Path d="M24 34l6 6" {...axis} strokeWidth={1.6} />
          <Circle cx={24} cy={16} r={2.6} {...mark} />
        </G>
      )}

      {posture === 'washing' && (
        <G>
          {/* Not a body at all: a tap, and water falling into cupped hands. */}
          <Path d="M12 8v6h13" {...axis} strokeWidth={1.8} />
          <Path d="M25 14v6" {...axis} strokeWidth={1.8} />
          <Path d="M15 30q10 11 20 0" {...axis} />
          <Path d="M15 30h20" {...axis} strokeWidth={1.6} />
        </G>
      )}
    </Svg>
  );
}

/**
 * How far into the prayer you are, in rakʿahs.
 *
 * The guide screen used to carry a three-pixel bar filling left to right — a
 * measure of scroll position, in an app that has a whole reference page about
 * losing count mid-prayer. A bar at 60% does not answer "which rakʿah am I
 * in", which is the only question anyone is asking.
 *
 * One arch per rakʿah, filled behind you, outlined ahead, the current one
 * carrying the star. It is the mihrab from the prayer times card at a smaller
 * size, so the same shape means the same thing in both places.
 */
export function RakahProgress({
  current,
  total,
  color,
  trackColor,
  size = 22,
}: {
  current: number;
  total: number;
  color: string;
  trackColor: string;
  size?: number;
}) {
  const height = (size / 20) * 24;

  return (
    <Svg width={size * total + 5 * (total - 1)} height={height} fill="none">
      {Array.from({ length: total }, (_, i) => {
        const rakah = i + 1;
        const done = rakah < current;
        const here = rakah === current;
        const x = i * (size + 5);

        return (
          <G key={rakah} x={x}>
            <Svg width={size} height={height} viewBox="0 0 20 24" fill="none">
              <Path
                d="M2 24 L2 10 Q2 3 10 1 Q18 3 18 10 L18 24 Z"
                fill={done ? color : 'none'}
                stroke={done ? 'none' : here ? color : trackColor}
                strokeWidth={1.6}
              />
              {here && (
                <Path
                  d="M10 7 L11.4 9.8 L14.4 10.2 L12.2 12.4 L12.7 15.4 L10 14 L7.3 15.4 L7.8 12.4 L5.6 10.2 L8.6 9.8 Z"
                  fill={color}
                />
              )}
            </Svg>
          </G>
        );
      })}
    </Svg>
  );
}

/**
 * One arch per stage of the beginner path.
 *
 * The Learn tab said "6 of 36" over a three-pixel bar. Thirty-six of what, and
 * how far is six — a beginner cannot answer either, and a fraction is a poor
 * thing to hand someone three weeks into a religion. Six arches answer it
 * without arithmetic: the ones behind you are filled, the one you are on
 * carries the star, the rest are outlines.
 *
 * The shape is the mihrab from the prayer times card, small. Reusing it is the
 * point — the same form means the same thing everywhere in the app, so a
 * reader learns the vocabulary once.
 *
 * `label` is drawn under each arch. Six words at 10px is small, and it is the
 * difference between a decoration and a map.
 */
export function StagePath({
  stages,
  currentIndex,
  color,
  trackColor,
  mutedColor,
}: {
  stages: readonly { id: string; label: string; done: boolean }[];
  currentIndex: number;
  color: string;
  trackColor: string;
  mutedColor: string;
}) {
  return (
    <View style={stagePathStyles.row}>
      {stages.map((stage, index) => {
        const here = index === currentIndex;

        return (
          <View key={stage.id} style={stagePathStyles.cell}>
            <Svg width={30} height={36} viewBox="0 0 20 24" fill="none">
              <Path
                d="M2 24 L2 10 Q2 3 10 1 Q18 3 18 10 L18 24 Z"
                fill={stage.done ? color : 'none'}
                stroke={stage.done ? 'none' : here ? color : trackColor}
                strokeWidth={1.6}
              />
              {stage.done && (
                <Path
                  d="M6.5 13.5 l2.5 2.5 5 -6"
                  stroke={mutedColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              )}
              {here && !stage.done && (
                <Path
                  d="M10 7 L11.4 9.8 L14.4 10.2 L12.2 12.4 L12.7 15.4 L10 14 L7.3 15.4 L7.8 12.4 L5.6 10.2 L8.6 9.8 Z"
                  fill={color}
                />
              )}
            </Svg>
            <Text
              numberOfLines={2}
              style={[
                stagePathStyles.label,
                { color: here ? color : trackColor, fontWeight: here ? '700' : '500' },
              ]}>
              {stage.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const stagePathStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
  },
});

/**
 * A ring showing how far through the path someone is, with the count inside.
 *
 * Small, and on the Today card only. The number belongs inside the ring rather
 * than beside it because a beginner reading "6" wants to know six of what, and
 * a ring that is one sixth full answers that without a second line of text.
 *
 * Never a percentage. `JourneyProgress` says why at length, and it holds here:
 * nobody three weeks into a religion needs to be told they are 17% of it.
 */
export function ProgressRing({
  done,
  total,
  color,
  trackColor,
  size = 44,
  children,
}: {
  done: number;
  total: number;
  color: string;
  trackColor: string;
  size?: number;
  children?: React.ReactNode;
}) {
  const stroke = 2.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = total > 0 ? Math.min(1, done / total) : 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={stroke} fill="none" />
        {fraction > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}
      </Svg>
      {children}
    </View>
  );
}

export type GlyphName =
  | 'shahada'
  | 'mosque'
  | 'phrases'
  | 'duas'
  | 'practice'
  | 'iman'
  | 'pillars'
  | 'ghusl'
  | 'tayammum'
  // One per Learn topic. Nineteen of the twenty had no mark at all, which is
  // why that tab read as a wall of identical text rows: `TOPIC_GLYPH` mapped
  // exactly one id — `mosque` — and every other card was bare.
  | 'wudu'
  | 'before-prayer'
  | 'al-fatihah'
  | 'what-breaks-prayer'
  | 'dua-and-dhikr'
  | 'what-is-islam'
  | 'who-is-allah'
  | 'who-is-muhammad'
  | 'what-is-the-quran'
  | 'sunnah'
  | 'food'
  | 'clothing'
  | 'halal-and-haram'
  | 'family'
  | 'work'
  | 'manners'
  | 'repentance'
  | 'patience-and-gratitude'
  | 'ramadan'
  | 'islamic-calendar';

/**
 * The card marks.
 *
 * Two of them count: the faith mark is six-sided for the six articles, and the
 * pillars mark has five columns. Somebody will notice, and it will be right.
 */
export function Glyph({ name, color, size = 22 }: { name: GlyphName; color: string; size?: number }) {
  const stroke = {
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${GRID} ${GRID}`} fill="none">
      {name === 'shahada' && (
        <G {...stroke}>
          <Path d="M12 3 L21 12 L12 21 L3 12 Z" />
          <Path d="M5.6 5.6 H18.4 V18.4 H5.6 Z" />
        </G>
      )}

      {name === 'mosque' && (
        <G {...stroke}>
          <Path d="M3 21h18" />
          <Path d="M6 21v-7a6 6 0 0 1 12 0v7" />
          <Path d="M12 8V5" />
          <Path d="M10.5 5h3" />
        </G>
      )}

      {name === 'phrases' && (
        <G {...stroke}>
          <Path d="M9.5 4.5A8 8 0 0 0 9.5 19.5" />
          <Path d="M14.5 4.5A8 8 0 0 1 14.5 19.5" />
        </G>
      )}

      {name === 'duas' && (
        <G {...stroke}>
          <Path d="M12 5 A5 5 0 0 1 19 12 A5 5 0 0 1 12 19 A5 5 0 0 1 5 12 A5 5 0 0 1 12 5 Z" />
          <Circle cx={12} cy={12} r={1.6} />
        </G>
      )}

      {name === 'practice' && (
        <G {...stroke}>
          <Path d="M6 9v6" />
          <Path d="M10.5 7.5a6 6 0 0 1 0 9" />
          <Path d="M14.5 5a10 10 0 0 1 0 14" />
          <Path d="M18.5 3a14 14 0 0 1 0 18" />
        </G>
      )}

      {name === 'iman' && (
        <G {...stroke} strokeWidth={1.4}>
          <Path d="M12 2.6 L20.1 7.3 L20.1 16.7 L12 21.4 L3.9 16.7 L3.9 7.3 Z" />
          <Path d="M12 7.4 L15.6 13.6 L8.4 13.6 Z" />
          <Path d="M12 16.6 L8.4 10.4 L15.6 10.4 Z" />
        </G>
      )}

      {name === 'pillars' && (
        <G {...stroke}>
          <Path d="M3 19h18" />
          <Path d="M3.5 6.5h17" />
          <G strokeWidth={1.3}>
            <Path d="M5.5 6.5V19" />
            <Path d="M9.25 6.5V19" />
            <Path d="M13 6.5V19" />
            <Path d="M16.75 6.5V19" />
            <Path d="M20.5 6.5V19" />
          </G>
        </G>
      )}

      {name === 'ghusl' && (
        <G {...stroke}>
          <Path d="M12 3c3.5 4.2 5.5 7 5.5 9.6A5.5 5.5 0 0 1 6.5 12.6C6.5 10 8.5 7.2 12 3z" />
        </G>
      )}

      {name === 'tayammum' && (
        <G {...stroke}>
          <Path d="M3 18h18" />
          <Path d="M6 18c1.5-3 3.5-4.5 6-4.5s4.5 1.5 6 4.5" />
          <Circle cx={12} cy={8} r={1} />
          <Circle cx={8} cy={10.5} r={1} />
          <Circle cx={16} cy={10.5} r={1} />
        </G>
      )}

      {/*
        The Learn topics. Same 24 grid, same 1.5 stroke, so a column of them
        reads as one set rather than as clip art — the difference between a
        marked list and a decorated one.

        Each is the plainest true thing about its subject: water for wudu, a
        book opened for the Qur'an, a crescent for Ramadan. None is a picture
        of a person, deliberately. A geometric vocabulary is the right register
        here, and figurative drawings of worship are a sensitivity this app
        need not take on.
      */}

      {name === 'wudu' && (
        <G {...stroke}>
          <Path d="M6 3v6a6 6 0 0 0 12 0V3" />
          <Path d="M12 15v6" />
          <Path d="M8 21h8" />
        </G>
      )}

      {name === 'before-prayer' && (
        <G {...stroke}>
          <Path d="M4 20h16" />
          <Path d="M6 20v-5a6 6 0 0 1 12 0v5" />
          <Path d="M12 4v3" />
          <Path d="M10.5 5.5h3" />
        </G>
      )}

      {name === 'al-fatihah' && (
        <G {...stroke}>
          <Path d="M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z" />
          <Path d="M20 5h-5a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h5z" />
          <Path d="M16.5 9.5h1.5" />
        </G>
      )}

      {name === 'what-breaks-prayer' && (
        <G {...stroke}>
          <Path d="M5 5l14 14" />
          <Path d="M12 3a9 9 0 1 0 9 9" />
          <Path d="M12 3a9 9 0 0 1 9 9" />
        </G>
      )}

      {name === 'dua-and-dhikr' && (
        <G {...stroke}>
          <Path d="M3 12h3l2-5 3 10 2.5-7 2 4h5.5" />
        </G>
      )}

      {name === 'what-is-islam' && (
        <G {...stroke}>
          <Path d="M12 3 L21 12 L12 21 L3 12 Z" />
          <Path d="M12 8 L16 12 L12 16 L8 12 Z" />
        </G>
      )}

      {name === 'who-is-allah' && (
        <G {...stroke}>
          <Circle cx={12} cy={12} r={8} />
          <Path d="M12 4v16" />
          <Path d="M4 12h16" />
        </G>
      )}

      {name === 'who-is-muhammad' && (
        <G {...stroke}>
          <Path d="M3 20h18" />
          <Path d="M6 20V11" />
          <Path d="M18 20V11" />
          <Path d="M12 3l7 6H5z" />
        </G>
      )}

      {name === 'what-is-the-quran' && (
        <G {...stroke}>
          <Path d="M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z" />
          <Path d="M20 5h-5a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h5z" />
        </G>
      )}

      {name === 'sunnah' && (
        <G {...stroke}>
          <Path d="M4 18c4-8 12-8 16 0" />
          <Path d="M12 6v4" />
          <Circle cx={12} cy={18} r={1.6} />
        </G>
      )}

      {name === 'food' && (
        <G {...stroke}>
          <Path d="M5 3v8a3 3 0 0 0 6 0V3" />
          <Path d="M8 11v10" />
          <Path d="M17 3c-1.5 3-1.5 6 0 8v10" />
        </G>
      )}

      {name === 'clothing' && (
        <G {...stroke}>
          <Path d="M8 3l4 3 4-3 4 3-2 4h-2v11H8V10H6L4 6z" />
        </G>
      )}

      {name === 'halal-and-haram' && (
        <G {...stroke}>
          <Path d="M12 3v18" />
          <Path d="M5 8l7-3 7 3" />
          <Path d="M3 16a3 3 0 0 0 6 0L6 9z" />
          <Path d="M15 16a3 3 0 0 0 6 0l-3-7z" />
        </G>
      )}

      {name === 'family' && (
        <G {...stroke}>
          <Circle cx={9} cy={8} r={3} />
          <Circle cx={17} cy={9} r={2.2} />
          <Path d="M3 20v-1a6 6 0 0 1 12 0v1" />
          <Path d="M17 14a4 4 0 0 1 4 4v2" />
        </G>
      )}

      {name === 'work' && (
        <G {...stroke}>
          <Path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <Path d="M3 13h18" />
        </G>
      )}

      {name === 'manners' && (
        <G {...stroke}>
          <Path d="M4 18V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8z" />
          <Path d="M9 10h6" />
          <Path d="M9 13h4" />
        </G>
      )}

      {name === 'repentance' && (
        <G {...stroke}>
          <Path d="M3 12a9 9 0 1 0 3-6.7" />
          <Path d="M3 4v5h5" />
        </G>
      )}

      {name === 'patience-and-gratitude' && (
        <G {...stroke}>
          <Path d="M12 21c-5-3-8-6.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 3.5-3 7-8 10z" />
        </G>
      )}

      {name === 'ramadan' && (
        <G {...stroke}>
          <Path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </G>
      )}

      {name === 'islamic-calendar' && (
        <G {...stroke}>
          <Path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M3 10h18" />
          <Path d="M8 3v4" />
          <Path d="M16 3v4" />
        </G>
      )}
    </Svg>
  );
}
