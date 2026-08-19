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

export type GlyphName =
  | 'shahada'
  | 'mosque'
  | 'phrases'
  | 'duas'
  | 'practice'
  | 'iman'
  | 'pillars'
  | 'ghusl'
  | 'tayammum';

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
    </Svg>
  );
}
