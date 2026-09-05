import { StyleSheet, Text, View, type ColorValue } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, Path, Rect } from 'react-native-svg';


/**
 * Marks, architecture, geometry. Nothing here is a body.
 *
 * ## The figure that was here, three times, and why it is gone
 *
 * This file first said "never a body": Islamic visual tradition avoids
 * depicting living beings, and a posture can be carried by the ground line
 * and the body's axis. Iyad reversed that, shown the ordinary simplified
 * figures every printed prayer guide uses, and `PostureFigure` was built.
 * What shipped against it was a set of flat-shaded cartoon PNGs in the
 * reference's style, and on 29 Aug 2026 he removed them with a rule: a
 * posture drawing is either large, clear and accurate in the app's own line,
 * or absent until one is. `PostureDiagram` — nine line-art figures in a
 * mihrab — was the drawn answer to that rule.
 *
 * On 4 Sep 2026 he judged it by the same rule and removed it too: "super
 * basic, and they don't show the user in any way how to pray." Which was
 * true. A front-on silhouette cannot show right hand over left forearm, or
 * where the gaze falls, and the two postures a picture teaches better than
 * words — rukūʿ and sujūd — need the shape from the side. What the block
 * did carry was the screen: it pushed the recitation below the fold on the
 * one screen whose job is the words. The step's kicker still names the
 * position, for the eye and for a screen reader.
 *
 * If posture pictures ever return they are content — photographs or
 * commissioned drawings from the side, reviewed as a ruling is reviewed —
 * and the shape of the old pipeline is in git history (`prayer-images.ts`:
 * one `require` per posture, the picture winning over any drawing). Not
 * something to draw here.
 *
 * ## The style
 *
 * 1.5px stroked line art on the app's grounds with one accent; glyphs, the
 * mihrab, the girih band and the sun arc are marks and architecture.
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
export function GirihBand({
  color,
  height = 76,
  /**
   * Fill the stars instead of outlining them.
   *
   * The same band, finished rather than a second pattern — a done state that
   * changed the geometry would read as a different thing having happened. Low
   * opacity, because this sits behind a title and has to stay behind it.
   */
  filled = false,
}: {
  color: string;
  height?: number;
  filled?: boolean;
}) {
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
              strokeOpacity={filled ? 0.55 : 0.42}
              strokeWidth={1}
              strokeLinejoin="round"
              fill={filled ? color : 'none'}
              fillOpacity={filled ? 0.22 : 0}
            />
            <Line x1={cx - 22} y1={cy} x2={cx - 18} y2={cy} stroke={color} strokeOpacity={0.24} strokeWidth={1} />
            <Line x1={cx + 18} y1={cy} x2={cx + 22} y2={cy} stroke={color} strokeOpacity={0.24} strokeWidth={1} />
          </G>
        ))}
      </G>
    </Svg>
  );
}


/**
 * A qalam — the reed pen, resting where the ink stops.
 *
 * Drawn for the Learn tab's written page: the next lesson is a half-written
 * line, and the pen sits at the boundary between its ink and the blank rule.
 * An object of practice, like the rehl and the misbaha on the tab bar — not
 * a figure. Two shaft edges, a rounded top, a cut nib; house stroke weight.
 */
export function QalamMark({ color, size = 26 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path d="M27 3 L13 21 L10.4 24.6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M29.5 5.5 L16 22.5 L13.6 26" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M27 3 Q28.8 3.4 29.5 5.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10.4 24.6 L13.6 26 L9 29.5 Z" fill={color} />
    </Svg>
  );
}

/**
 * An illuminated headpiece for an ʿunwān — a medallion with tendrils.
 *
 * The answer to "the tab headers feel bare" that a manuscript would give:
 * warmth from geometry and gold, never a raster (a baked-light image is
 * wrong in dark mode, and this app is used before dawn). One medallion —
 * the eight-point star in a double ring — with hairline tendrils reaching
 * toward the margins, exactly the anatomy of a printed sarlawḥ panel.
 * Iyad approved the direction 2 Sep; if it earns its place, other tabs can
 * take their own medallions.
 */
export function HeadpieceMark({
  color,
  trackColor,
  width = 220,
}: {
  color: ColorValue;
  trackColor: ColorValue;
  width?: number;
}) {
  const height = (width * 44) / 220;
  return (
    <Svg width={width} height={height} viewBox="0 0 220 44" fill="none">
      <Path d="M8 22 H84" stroke={trackColor} strokeWidth={1} />
      <Path d="M136 22 H212" stroke={trackColor} strokeWidth={1} />
      <Path d="M84 22 q6 -8 12 0" stroke={color} strokeWidth={1} />
      <Path d="M124 22 q6 -8 12 0" stroke={color} strokeWidth={1} />
      <Circle cx={110} cy={22} r={15} stroke={color} strokeWidth={1} />
      <Circle cx={110} cy={22} r={10.5} stroke={trackColor} strokeWidth={0.8} />
      <Rect x={103} y={15} width={14} height={14} stroke={color} strokeWidth={1} />
      <Rect x={103} y={15} width={14} height={14} stroke={color} strokeWidth={1} transform="rotate(45 110 22)" />
      <Circle cx={110} cy={22} r={2.2} fill={color} />
      <Circle cx={88} cy={22} r={1.6} fill={color} />
      <Circle cx={132} cy={22} r={1.6} fill={color} />
      <Circle cx={8} cy={22} r={1.6} fill={trackColor} />
      <Circle cx={212} cy={22} r={1.6} fill={trackColor} />
    </Svg>
  );
}

/**
 * The eight-point girih star as one drawn unit — two squares, one rotated.
 *
 * The Qur'an tab's counting band is 38 of these, one per surah, filled as
 * each is learned: the band that used to decorate the progress panel IS the
 * progress now. Also the frame ornament on the surah screen — the corner
 * pieces that arrive as a page starts being held from memory.
 */
export function GirihStar({
  size = 15,
  filled,
  color,
  trackColor,
}: {
  size?: number;
  filled: boolean;
  color: ColorValue;
  trackColor: ColorValue;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Rect
        x={6}
        y={6}
        width={20}
        height={20}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.85 : 1}
        stroke={filled ? undefined : trackColor}
        strokeWidth={filled ? 0 : 1.4}
      />
      <Rect
        x={6}
        y={6}
        width={20}
        height={20}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.85 : 1}
        stroke={filled ? undefined : trackColor}
        strokeWidth={filled ? 0 : 1.4}
        transform="rotate(45 16 16)"
      />
    </Svg>
  );
}

/** The StagePath's arch, shared with `BookArch` so the two can never drift. */
const BOOK_ARCH_PATH = 'M2 24 L2 10 Q2 3 10 1 Q18 3 18 10 L18 24 Z';

/**
 * One unit of the whole-book arcade on the Learn tab.
 *
 * The fill is ink rising in the doorway: a unit dipped into early — the
 * janāzah-on-Tuesday case — fills to its fraction, so out-of-order reading
 * is visible at book scale without a number. Full is a written unit, an
 * outline is an unopened one, and the gold drop marks where the pen is.
 *
 * `clipId` must be unique per instance on the screen: SVG clip paths live in
 * a global id namespace, and two arches sharing one would share a fraction.
 */
export function BookArch({
  done,
  total,
  current = false,
  color,
  trackColor,
  dotColor,
  clipId,
  width = 15,
}: {
  done: number;
  total: number;
  current?: boolean;
  color: ColorValue;
  trackColor: ColorValue;
  dotColor: ColorValue;
  clipId: string;
  width?: number;
}) {
  const fraction = total > 0 ? Math.min(1, done / total) : 0;
  const height = (width * 24) / 20;

  if (fraction >= 1) {
    return (
      <Svg width={width} height={height} viewBox="0 0 20 24">
        <Path d={BOOK_ARCH_PATH} fill={color} />
      </Svg>
    );
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 20 24" fill="none">
      {fraction > 0 && (
        <>
          <Defs>
            <ClipPath id={clipId}>
              <Rect x={0} y={24 - 24 * fraction} width={20} height={24 * fraction} />
            </ClipPath>
          </Defs>
          <Path d={BOOK_ARCH_PATH} fill={color} clipPath={`url(#${clipId})`} />
        </>
      )}
      <Path
        d={BOOK_ARCH_PATH}
        stroke={current ? color : trackColor}
        strokeWidth={current ? 1.8 : 1.4}
      />
      {current && <Circle cx={10} cy={11} r={3.2} fill={dotColor} />}
    </Svg>
  );
}

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
 * Never a percentage, and never a count. Phase 6 retired the last of those:
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
  | 'prayer'
  | 'sunrise'
  | 'door'
  | 'travel'
  | 'night'
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
  | 'islamic-calendar'
  | 'names'
  | 'minimum-prayer'
  | 'adhan'
  | 'rulings'
  | 'your-name'
  | 'life-before'
  | 'zakat'
  // 29 Aug: the seventeen topics that still had no mark. A card without a
  // glyph beside twenty cards with one read as unfinished, which it was.
  | 'behind-an-imam'
  | 'quranic-duas'
  | 'why-people-differ'
  | 'marriage-shape'
  | 'a-partner-already'
  | 'jumuah'
  | 'janazah'
  | 'small-sunnahs'
  | 'teaching-someone'
  | 'if-you-stopped'
  | 'being-corrected'
  | 'anger'
  | 'showing-off'
  | 'arrogance'
  | 'envy'
  | 'voluntary-fasting'
  | 'eid'
  /*
    The five daily prayers as times of day, for the Every-prayer rows —
    Iyad's tiled mock translated into the house stroke (1 Sep 2026): a
    convert does not yet feel the shape of the day, and sunrise · noon ·
    low sun · sunset · crescent teach it faster than the words beside them.
  */
  | 'fajr'
  | 'dhuhr'
  | 'asr'
  | 'maghrib'
  | 'isha'
  // The house itself — the qibla screen's mark, riding the arrow's tip.
  | 'kaaba';

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

      {/* The moments of a day, for the duʿa screen's spine. */}
      {name === 'sunrise' && (
        <G {...stroke}>
          <Path d="M3 18h18" />
          <Path d="M7 18a5 5 0 0 1 10 0" />
          <Path d="M12 4v3" />
          <Path d="M5.6 7.6l2 2" />
          <Path d="M18.4 7.6l-2 2" />
        </G>
      )}

      {name === 'door' && (
        <G {...stroke}>
          <Path d="M13 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8" />
          <Path d="M10 12h10" />
          <Path d="M17 9l3 3-3 3" />
        </G>
      )}

      {name === 'travel' && (
        <G {...stroke}>
          <Path d="M3 20h18" />
          <Path d="M5 16l3-9 3 9" />
          <Path d="M13 16l3-6 3 6" />
          <Path d="M6.4 13h3.2" />
        </G>
      )}

      {name === 'night' && (
        <G {...stroke}>
          <Path d="M20 13.5A7.5 7.5 0 1 1 11.5 5a6 6 0 0 0 8.5 8.5z" />
          <Path d="M3 21h18" />
        </G>
      )}

      {/* The mihrab again, at glyph size — the prayers, on the Learn tab. */}
      {name === 'prayer' && (
        <G {...stroke}>
          <Path d="M5 21V10a7 7 0 0 1 14 0v11" />
          <Path d="M3 21h18" />
          <Path d="M12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14l-2.4 1.2.5-2.6L8.2 10.8l2.6-.4z" />
        </G>
      )}

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

      {/*
        The names. One centre, approached from every side.

        Deliberately a companion to `who-is-allah` rather than a variation on
        it: that mark is a whole circle with axes through it, and this is a
        small centre with rays coming in. Ninety-nine names and one named — a
        reader will not decode that, but it is why the mark is this shape
        rather than a decorative rosette, and it stays non-figurative like
        everything else on this tab.
      */}
      {/* The least you can do: one arch of the mihrab, not the full set. */}
      {name === 'minimum-prayer' && (
        <G {...stroke}>
          <Path d="M8 20v-8a4 4 0 0 1 8 0v8" />
          <Path d="M5 20h14" />
        </G>
      )}

      {/* The call: a source, and two arcs going out from it. */}
      {name === 'adhan' && (
        <G {...stroke}>
          <Path d="M9 20V4" />
          <Path d="M13 8a5 5 0 0 1 0 8" />
          <Path d="M16 5.5a9 9 0 0 1 0 13" />
        </G>
      )}

      {/* Five categories: five marks, the middle one longest, because most of
          ordinary life sits in the middle one. */}
      {name === 'rulings' && (
        <G {...stroke}>
          <Path d="M4 8h5" />
          <Path d="M4 12h16" />
          <Path d="M4 16h5" />
          <Path d="M15 8h5" />
          <Path d="M15 16h5" />
        </G>
      )}

      {/* A name: a tag, kept. */}
      {name === 'your-name' && (
        <G {...stroke}>
          <Path d="M4 10.5 11 4h9v9l-6.5 6.5a2 2 0 0 1-2.8 0L4 13.3a2 2 0 0 1 0-2.8Z" />
          <Circle cx={16} cy={8} r={1.2} />
        </G>
      )}

      {/* What came before: a line that stops, and an open one after it. */}
      {name === 'life-before' && (
        <G {...stroke}>
          <Path d="M4 16h6" />
          <Path d="M14 8h6" />
          <Path d="M10 16 14 8" />
        </G>
      )}

      {/* Zakat: a portion leaving a whole. A ring with one part set apart. */}
      {name === 'zakat' && (
        <G {...stroke}>
          <Circle cx={12} cy={12} r={7.5} />
          <Path d="M12 4.5v7.5l5.3 5.3" />
        </G>
      )}

      {name === 'names' && (
        <G {...stroke}>
          <Circle cx={12} cy={12} r={3.5} />
          <Path d="M12 6.5V3" />
          <Path d="M12 17.5V21" />
          <Path d="M6.5 12H3" />
          <Path d="M17.5 12H21" />
          <Path d="M8.1 8.1 5.6 5.6" />
          <Path d="M15.9 8.1 18.4 5.6" />
          <Path d="M8.1 15.9 5.6 18.4" />
          <Path d="M15.9 15.9 18.4 18.4" />
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

      {/* A row: two arches together, the taller one ahead of them. */}
      {name === 'behind-an-imam' && (
        <G {...stroke}>
          <Path d="M2.5 20.5h19" />
          <Path d="M3 20.5v-5.5q0-2.6 2.75-3.2q2.75.6 2.75 3.2v5.5" />
          <Path d="M9.5 20.5v-5.5q0-2.6 2.75-3.2q2.75.6 2.75 3.2v5.5" />
          <Path d="M16 20.5v-8q0-3.4 3-4.1q3 .7 3 4.1v8" strokeWidth={1.4} />
        </G>
      )}

      {/* The open book, and one word of it rising. */}
      {name === 'quranic-duas' && (
        <G {...stroke}>
          <Path d="M4 7h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z" />
          <Path d="M20 7h-5a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h5z" />
          <Circle cx={13} cy={3.4} r={1.4} />
        </G>
      )}

      {/* One stem, two branches, both tips at the same height. */}
      {name === 'why-people-differ' && (
        <G {...stroke}>
          <Path d="M12 21v-8" />
          <Path d="M12 13q0-4-4-5L5.8 7.4" />
          <Path d="M12 13q0-4 4-5l2.2-.6" />
          <Circle cx={4.6} cy={7} r={1.3} />
          <Circle cx={19.4} cy={7} r={1.3} />
        </G>
      )}

      {/* Two rings, interlocked. */}
      {name === 'marriage-shape' && (
        <G {...stroke}>
          <Circle cx={9.5} cy={12} r={5.5} />
          <Circle cx={14.5} cy={12} r={5.5} />
        </G>
      )}

      {/* The same two rings, one of them not yet settled. */}
      {name === 'a-partner-already' && (
        <G {...stroke}>
          <Circle cx={9.5} cy={12} r={5.5} />
          <Circle cx={14.5} cy={12} r={5.5} strokeDasharray="2.5 3" />
        </G>
      )}

      {/* The minbar: steps up to the place the khutbah is given from. */}
      {name === 'jumuah' && (
        <G {...stroke}>
          <Path d="M3 20h18" />
          <Path d="M6 20v-3h3v-3h3v-3h3v-4h4v13" />
        </G>
      )}

      {/* A grave marker, rounded, on level ground. */}
      {name === 'janazah' && (
        <G {...stroke}>
          <Path d="M4 20h16" />
          <Path d="M9 20V9q0-3.5 3-3.5T15 9v11" />
        </G>
      )}

      {/* Small things, kept up: three marks climbing one quiet path. */}
      {name === 'small-sunnahs' && (
        <G {...stroke}>
          <Path d="M4.5 19Q12 14 20 6.5" strokeOpacity={0.45} strokeDasharray="1.5 3" />
          <Circle cx={6.5} cy={17.6} r={1.4} />
          <Circle cx={12.2} cy={13.4} r={1.9} />
          <Circle cx={18} cy={8.3} r={2.4} />
        </G>
      )}

      {/* From one to another: what is passed on grows on the way. */}
      {name === 'teaching-someone' && (
        <G {...stroke}>
          <Circle cx={6} cy={15.5} r={1.8} />
          <Path d="M7.5 12.8Q12 7 16.2 10.4" />
          <Path d="M15.4 8.4L16.6 10.7L14.2 11.4" />
          <Circle cx={17.8} cy={15.5} r={2.6} />
        </G>
      )}

      {/* A road that stopped, and carries on from where it is. */}
      {name === 'if-you-stopped' && (
        <G {...stroke}>
          <Path d="M3.5 12h6" />
          <Path d="M13.5 12h4.5" />
          <Path d="M16.5 9.5L19.5 12L16.5 14.5" />
        </G>
      )}

      {/* A word received, and taken well. */}
      {name === 'being-corrected' && (
        <G {...stroke}>
          <Path d="M4 18V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8z" />
          <Path d="M9 11l2 2 4-4.5" />
        </G>
      )}

      {/* Heat rising — the thing the page teaches you to let pass. */}
      {name === 'anger' && (
        <G {...stroke}>
          <Path d="M8 19q-2.5-3 0-6t0-6" />
          <Path d="M13 19q-2.5-3 0-6t0-6" />
          <Path d="M18 19q-2.5-3 0-6t0-6" />
        </G>
      )}

      {/* A mirror on its stand. */}
      {name === 'showing-off' && (
        <G {...stroke}>
          <Circle cx={12} cy={10.5} r={6} />
          <Path d="M12 16.5V20" />
          <Path d="M9 20h6" />
          <Path d="M14.3 7.4q2 1.2 2.3 3.3" strokeOpacity={0.55} />
        </G>
      )}

      {/* Three alike; one holds itself above the line the others stand on. */}
      {name === 'arrogance' && (
        <G {...stroke}>
          <Path d="M4 17.5h16" />
          <Circle cx={8} cy={15.3} r={2} />
          <Circle cx={16} cy={15.3} r={2} />
          <Circle cx={12} cy={6.5} r={2.4} />
        </G>
      )}

      {/* Two portions; the eye kept on the brighter one. */}
      {name === 'envy' && (
        <G {...stroke}>
          <Circle cx={7} cy={15} r={3} />
          <Circle cx={16.5} cy={10} r={3} />
          <Path d="M16.5 4.5v-2" strokeWidth={1.3} />
          <Path d="M21 6.4l1.4-1.4" strokeWidth={1.3} />
          <Path d="M12 6.4L10.6 5" strokeWidth={1.3} />
          <Path d="M9.7 13.2l3.4-1.8" strokeDasharray="2 2.5" />
        </G>
      )}

      {/* An empty bowl, until sunset. */}
      {name === 'voluntary-fasting' && (
        <G {...stroke}>
          <Path d="M4.5 10.5h15" />
          <Path d="M4.5 10.5a7.5 7.5 0 0 0 15 0" />
          <Path d="M9.5 20h5" />
        </G>
      )}

      {/* The khatim, whole: the festival at the end of the completed month. */}
      {name === 'eid' && (
        <G {...stroke}>
          <Path d={khatim(12, 12, 8.5, 4.5)} />
        </G>
      )}

      {/* The Kaʿbah: the cube, the band of the kiswah, the raised door. */}
      {name === 'kaaba' && (
        <G {...stroke}>
          <Path d="M4.5 5.5h15v14h-15z" />
          <Path d="M4.5 9.25h15" />
          <Path d="M14 19.5v-4a1.8 1.8 0 0 1 3.6 0v4" strokeWidth={1.3} />
        </G>
      )}

      {isDayMark(name) && <G {...stroke}>{dayMarkPaths(name)}</G>}
    </Svg>
  );
}

/** The five daily prayers as times of day. A subset of `GlyphName`. */
export type DayMarkName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

const DAY_MARKS: readonly DayMarkName[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

function isDayMark(name: GlyphName): name is DayMarkName {
  return (DAY_MARKS as readonly string[]).includes(name);
}

/**
 * The drawing itself, on the 24 grid, stroke inherited — ONE source for the
 * `Glyph` above and for `DayMarkAt` below, so the mark on the Awqat arch and
 * the mark on the Every-prayer row can never drift apart.
 */
function dayMarkPaths(name: DayMarkName) {
  switch (name) {
    /* Sunrise: the half sun on the horizon, rays up. */
    case 'fajr':
      return (
        <>
          <Path d="M3.5 16.5 H20.5" />
          <Path d="M7.8 16.5 A4.2 4.2 0 0 1 16.2 16.5" />
          <Path d="M12 7.9 v2 M6.6 9.7 l1.4 1.4 M17.4 9.7 l-1.4 1.4" />
        </>
      );
    /* Noon: the whole sun, high, no horizon. */
    case 'dhuhr':
      return (
        <>
          <Circle cx={12} cy={12} r={3.9} />
          <Path d="M12 4.4 v2.2 M12 17.4 v2.2 M4.4 12 h2.2 M17.4 12 h2.2 M6.6 6.6 l1.6 1.6 M15.8 15.8 l1.6 1.6 M17.4 6.6 l-1.6 1.6 M8.2 15.8 l-1.6 1.6" />
        </>
      );
    /* Late afternoon: the whole sun, low over the horizon. */
    case 'asr':
      return (
        <>
          <Circle cx={12} cy={12.5} r={3.6} />
          <Path d="M12 5.9 v1.8 M6.9 7.9 l1.3 1.3 M17.1 7.9 l-1.3 1.3" />
          <Path d="M3.5 19 H20.5" />
        </>
      );
    /* Sunset: the half sun going, dusk rules beneath — no rays left. */
    case 'maghrib':
      return (
        <>
          <Path d="M3.5 14 H20.5" />
          <Path d="M7.8 14 A4.2 4.2 0 0 1 16.2 14" />
          <Path d="M6.5 17.2 H17.5 M9 20.2 H15" />
        </>
      );
    /* Night: the hilal. */
    case 'isha':
      return <Path d="M13.6 4.4 A7.6 7.6 0 1 0 19.4 14.8 A6.2 6.2 0 0 1 13.6 4.4 Z" />;
  }
}

/**
 * A day mark for embedding INSIDE another Svg — the Awqat arch places these
 * at each prayer's true position on its outline. `cx`/`cy` are the centre in
 * the host's viewBox units; the stroke is set in glyph space so it scales to
 * roughly the arch outline's own weight.
 */
export function DayMarkAt({
  name,
  cx,
  cy,
  size = 15,
  color,
}: {
  name: DayMarkName;
  cx: number;
  cy: number;
  size?: number;
  color: ColorValue;
}) {
  const k = size / GRID;
  return (
    <G
      transform={`translate(${cx - size / 2}, ${cy - size / 2}) scale(${k})`}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none">
      {dayMarkPaths(name)}
    </G>
  );
}

/**
 * A compass rose, for the Awqat card's right spandrel — the qibla link.
 *
 * The corners around an arch are the spandrels, and in an illuminated page
 * they carry exactly this kind of small ornament, which is why the two card
 * links live there rather than on a row of their own. Drawn on the 24 grid
 * in the same stroke as the arch it sits beside. The needle leans rather
 * than pointing north: this mark means "find the direction", not "you are
 * facing it" — the qibla screen is where the real needle lives.
 */
export function CompassRose({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9.2} stroke={color} strokeWidth={1.3} />
      {/* Cardinal ticks, inside the ring — the Rosette's language. */}
      <G stroke={color} strokeOpacity={0.4} strokeWidth={1}>
        <Line x1={12} y1={2.8} x2={12} y2={5} />
        <Line x1={12} y1={19} x2={12} y2={21.2} />
        <Line x1={2.8} y1={12} x2={5} y2={12} />
        <Line x1={19} y1={12} x2={21.2} y2={12} />
      </G>
      {/*
        The needle, leaning 32° — rotated in the coordinates themselves, not
        with a `rotation` prop, which react-native-svg does not translate on
        web (it lands as an invalid DOM attribute and the needle with it).
      */}
      <Path d="M15.5 6.4 L13.61 13.01 L10.39 10.99 Z" fill={color} />
      <Path
        d="M8.5 17.6 L10.39 10.99 L13.61 13.01 Z"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.55}
      />
      <Circle cx={12} cy={12} r={1.1} fill={color} />
    </Svg>
  );
}

/**
 * A jadwal — the monthly timetable, as a mark. The Awqat card's left
 * spandrel, opening the month screen. A ruled sheet with its two binding
 * ties and a header band: a table, not a Hijri crescent, because the tap
 * lands on the printed month.
 */
export function JadwalMark({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.6 7.4 a2.4 2.4 0 0 1 2.4 -2.4 h12 a2.4 2.4 0 0 1 2.4 2.4 v10.2 a2.4 2.4 0 0 1 -2.4 2.4 h-12 a2.4 2.4 0 0 1 -2.4 -2.4 Z"
        stroke={color}
        strokeWidth={1.3}
      />
      <G stroke={color} strokeWidth={1.3} strokeLinecap="round">
        <Line x1={8.2} y1={2.6} x2={8.2} y2={6.6} />
        <Line x1={15.8} y1={2.6} x2={15.8} y2={6.6} />
      </G>
      <Line x1={3.6} y1={9.8} x2={20.4} y2={9.8} stroke={color} strokeOpacity={0.5} strokeWidth={1} />
      <G fill={color} fillOpacity={0.55}>
        <Circle cx={8.2} cy={13} r={1.05} />
        <Circle cx={12} cy={13} r={1.05} />
        <Circle cx={15.8} cy={13} r={1.05} />
        <Circle cx={8.2} cy={16.6} r={1.05} />
        <Circle cx={12} cy={16.6} r={1.05} />
      </G>
    </Svg>
  );
}

/*
  ── The four doors ─────────────────────────────────────────────────────────
  The tab bar's marks, chosen by Iyad from the "Four Doors" options sheet
  (31 Aug 2026) — the "objects of practice" set: four things from the
  physical world of worship, no two silhouettes alike. They replaced the
  last stock Ionicons in the app (moon, book, bookmarks, sun). All on the
  24 grid at the house stroke; the tab bar supplies colour and size, so
  active/inactive stays a tint change and nothing else about the bar moves.

  ⚠️ Being on the same grid is not the same as being the same size, and the
  first cut of these was not. Measured as ink rather than as viewBox, the
  four came out 15.9, 11.6, 16.3 and 19.3 units tall: the arcade was 40%
  shorter than the misbaha and read as a smaller icon in the bar (Iyad,
  3 Sep). They now share an optical block — ink from y≈3.5 to y≈20.25,
  about 16.5 tall — and the two architectural marks share a ground line at
  20.25. Redraw anything here and measure the ink, not the box.
*/

/** Today: a mihrab niche with the gold moment inside — the Awqat card as a mark. */
export function NicheMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2.75 20.25 H21.25" />
        <Path d="M5.5 20.25 V11.2 C5.5 6.1 8.2 3.9 12 3.9 C15.8 3.9 18.5 6.1 18.5 11.2 V20.25" />
      </G>
      <Circle cx={12} cy={9.3} r={1.7} fill={color} />
    </Svg>
  );
}

/** Learn: three arches on one baseline, the one you are inside marked — the StagePath as a door. */
export function ArcadeMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2.75 20.25 H21.25" />
        <Path d="M2.75 20.25 V13.8 Q2.75 9.4 5 9.4 Q7.25 9.4 7.25 13.8 V20.25" />
        <Path d="M9 20.25 V11.4 Q9 4.6 12 4.6 Q15 4.6 15 11.4 V20.25" />
        <Path d="M16.75 20.25 V13.8 Q16.75 9.4 19 9.4 Q21.25 9.4 21.25 13.8 V20.25" />
      </G>
      <Circle cx={12} cy={14.2} r={1.3} fill={color} />
    </Svg>
  );
}

/** Qur'an: a rehl — the folding stand holding an open mushaf. */
export function RehlMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4.8 20.25 L19.2 8.9" />
        <Path d="M19.2 20.25 L4.8 8.9" />
        <Path d="M12 5.6 C10.2 3.9 7.6 3.6 5.4 4.2 L5.4 8.8 C7.6 8.2 10.2 8.5 12 10.2 C13.8 8.5 16.4 8.2 18.6 8.8 L18.6 4.2 C16.4 3.6 13.8 3.9 12 5.6 Z" />
        <Path d="M12 5.6 V10.2" strokeWidth={1} />
      </G>
    </Svg>
  );
}

/** Du'a: the misbaha — the loop of beads with its tassel. */
export function MisbahaMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 1.4 like the niche and the arcade: at 1.3 on the narrowest of the
          four marks the loop read lighter than the rest of the bar. */}
      <G stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={12} cy={4.7} r={1.25} />
        <Circle cx={15.7} cy={5.75} r={1.25} />
        <Circle cx={17.98} cy={8.57} r={1.25} />
        <Circle cx={17.98} cy={12.03} r={1.25} />
        <Circle cx={15.7} cy={14.84} r={1.25} />
        <Circle cx={8.3} cy={14.84} r={1.25} />
        <Circle cx={6.02} cy={12.03} r={1.25} />
        <Circle cx={6.02} cy={8.57} r={1.25} />
        <Circle cx={8.3} cy={5.75} r={1.25} />
        <Path d="M12 15.9 V18" />
      </G>
      <Circle cx={12} cy={19.05} r={1.05} fill={color} />
    </Svg>
  );
}

/*
  ── The counting card's marks ──────────────────────────────────────────────
  From the "Counting Card" artifact, Iyad's cut (2 Sep 2026): the sitting
  screen crowns each card with a KIND medallion — the khatim for a Qur'an
  verse (on the tinted card, which is Qur'an-only), a small fortress for a
  line from Hisn al-Muslim, the Fortress of the Muslim — and divides the
  Arabic from its meaning with an illuminated rosette. The colour and the
  crown tell the same truth twice.
*/

/** The khatim in a ring — a Qur'an verse's medallion. */
export function KhatimMark({ color, size = 30 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <G stroke={color}>
        <Circle cx={16} cy={16} r={14} strokeWidth={1.2} />
        <Circle cx={16} cy={16} r={11.2} strokeWidth={0.7} strokeOpacity={0.6} />
        <Path
          d="M16 6.5 L18.6 13.4 L25.5 16 L18.6 18.6 L16 25.5 L13.4 18.6 L6.5 16 L13.4 13.4 Z"
          strokeWidth={1.1}
        />
      </G>
      <Circle cx={16} cy={16} r={1.5} fill={color} />
    </Svg>
  );
}

/** The fortress in a ring — a Hisn al-Muslim line's medallion. */
export function HisnMark({ color, size = 30 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <G stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={16} cy={16} r={14} />
        <Path d="M9 22.5 V13 h2.6 v-2.6 h2.6 V13 h3.6 v-2.6 h2.6 V13 H23 v9.5" />
        <Path d="M14 22.5 v-3.4 a2 2 0 0 1 4 0 v3.4" />
        <Path d="M7.5 22.5 h17" />
      </G>
    </Svg>
  );
}

/**
 * The illuminated rosette — eight soft petals with a gold heart, the
 * manuscript ornament that divides a text from its meaning on the counting
 * card. Petals in the soft gold, outlined in the full; the centre carries a
 * dot of the page so the heart reads as a ring.
 */
export function IlluminatedRosette({
  petal,
  outline,
  heart,
  size = 26,
}: {
  petal: ColorValue;
  outline: ColorValue;
  heart: ColorValue;
  size?: number;
}) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {angles.map((angle) => (
        <G key={angle} transform={`rotate(${angle} 14 14)`}>
          <Ellipse cx={14} cy={6.4} rx={2.6} ry={4.6} fill={petal} stroke={outline} strokeWidth={0.9} />
        </G>
      ))}
      <Circle cx={14} cy={14} r={3.2} fill={heart} />
    </Svg>
  );
}
