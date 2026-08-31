import { getPostureImage, PORTRAIT_POSTURES } from '@/content/prayer-images';
import type { Posture } from '@/content/types';

import { Image, StyleSheet, Text, View, type ColorValue } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path } from 'react-native-svg';


/**
 * Marks, architecture, geometry — and, for the prayer, a figure.
 *
 * ## The rule this file used to state, and why it changed
 *
 * This said "never a body". The reasoning was that Islamic visual tradition
 * avoids depicting living beings, that most prayer apps draw a silhouette
 * bowing anyway, and that a posture could be carried by the ground line plus
 * the body's axis without making that call on a user's behalf. It was written
 * as deliberate but explicitly unreviewed, and `PostureFigure` was built to it.
 *
 * **Iyad has now decided the other way**, shown a reference of the ordinary
 * simplified figures every printed prayer guide uses. So the postures are
 * figures. The reversal is recorded rather than quietly applied, because the
 * original was a substance decision and a later reader deserves to know it was
 * made twice, by the person whose call it is.
 *
 * **And a third decision, 29 Aug 2026.** What actually shipped against the
 * paragraph above was a set of flat-shaded cartoon PNGs — the *reference's*
 * style, which the section below says would look imported, and it did. Iyad
 * removed them: a posture drawing is either large, clear and accurate in the
 * app's own line, or absent until one is. `PostureDiagram` is the drawn
 * answer, and the PNG pipeline in `content/prayer-images.ts` stays empty,
 * waiting for a commissioned set if one is ever wanted.
 *
 * What did not change: everything else here stays non-figurative. Glyphs,
 * the mihrab, the girih band and the sun arc are marks and architecture, and
 * a body would be wrong in all of them.
 *
 * ## The style is the app's, not the reference's
 *
 * The reference was flat filled cartoon on blue. This app is 1.5px stroked
 * line art on near-black with one accent, and a filled cartoon figure dropped
 * into it would look imported. So the figures are drawn in the same stroke as
 * everything else — line art that happens to be a person, rather than a
 * different kind of picture.
 *
 * No facial features. Partly style: at 44px a face is three dots and they read
 * as noise. Partly caution: a head shape with a kufi is unambiguous about the
 * posture, which is all these have to do.
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
  height,
}: {
  posture: Posture;
  color: string;
  /** The drawn fallback's box. Ignored where a real illustration exists. */
  size?: number;
  /** How tall the illustration may be. Width follows from its own shape. */
  height?: number;
}) {
  /*
    A drawn illustration wins wherever one exists.

    Per posture rather than all-or-nothing, so the set can land one file at a
    time and every step still shows something. `getPostureImage` returns
    nothing for a posture nobody has drawn yet, and the figures below carry it.
  */
  const drawn = getPostureImage(posture);
  if (drawn) {
    /*
      The frame takes the picture's own shape rather than a fixed box.

      The postures are not all the same way round — a person standing is
      portrait and a person prostrating is landscape — so `aspectRatio` does
      the work. Fixing the height for both, which the first version did, left
      seventy pixels of empty box under every landscape one: `contain` shrank
      the image to fit the width and the container kept its height anyway.

      A portrait picture is bounded by height, because at full width it would
      be five hundred points tall and push the citations off the screen. A
      landscape one is bounded by width, because it never gets that tall.
    */
    const box = height ?? size;
    const portrait = PORTRAIT_POSTURES.includes(posture);

    return (
      <Image
        source={drawn}
        style={
          portrait
            ? { height: box, aspectRatio: 2 / 3 }
            : { width: '100%', aspectRatio: 3 / 2, maxHeight: box }
        }
        resizeMode="contain"
        accessible={false}
      />
    );
  }

  /**
   * Filled, not stroked — and that is a deliberate break from the rest of this
   * file.
   *
   * Everything else here is 1.5px line art, and two earlier drafts of these
   * figures were too. Both failed the same way: an outlined robe reads as a
   * pair of legs, so qiyam looked like a stick figure rather than a person
   * standing. A filled silhouette reads as a body instantly at 44px, which is
   * the size these are actually used at.
   *
   * The arms are the exception and stay stroked, because they have to be
   * legible *against* the body — the first draft drew them inside the
   * silhouette and lost the entire difference between qiyam and iʿtidal, which
   * is only ever about where the hands are.
   */
  const solid = { fill: color, stroke: 'none' };
  const arm = {
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  /** Head and the kufi over it, as one filled shape. */
  const head = (cx: number, cy: number) => (
    <G {...solid}>
      <Circle cx={cx} cy={cy} r={3.8} />
      <Path d={`M${cx - 4.2} ${cy - 1.6}a4.2 4.2 0 0 1 8.4 0z`} />
    </G>
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path d="M4 43h40" stroke={color} strokeOpacity={0.3} strokeWidth={1.8} strokeLinecap="round" />

      {/* All facing right, so the positions read as one sequence. */}

      {posture === 'standing' && (
        <G>
          {head(24, 9)}
          <Path d="M20 14h8l4 29H16z" {...solid} />
          {/* Hands folded across the front, clear of the silhouette. */}
          <Path d="M17.5 19 L20.5 25 H27.5 L30.5 19" {...arm} />
        </G>
      )}

      {posture === 'takbir' && (
        <G>
          {head(24, 9)}
          <Path d="M20 14h8l4 29H16z" {...solid} />
          <Path d="M18 21 L15 12 L19 8.5" {...arm} />
          <Path d="M30 21 L33 12 L29 8.5" {...arm} />
        </G>
      )}

      {posture === 'rising' && (
        <G>
          {head(24, 9)}
          <Path d="M20 14h8l4 29H16z" {...solid} />
          {/* Arms down at the sides. The whole difference from qiyam. */}
          <Path d="M19 16 L15.5 31" {...arm} />
          <Path d="M29 16 L32.5 31" {...arm} />
        </G>
      )}

      {posture === 'bowing' && (
        <G>
          {head(10, 17)}
          {/* Back level from the hips, legs straight down. */}
          <Path d="M13 13.5h16l4 29h-8l-2.5-22H13z" {...solid} />
          {/* Hands reaching to the knees. */}
          <Path d="M18 22 L16 33" {...arm} />
        </G>
      )}

      {/*
        ⚠️ THE WEAKEST OF THE EIGHT, and knowingly so.

        Sujud from the side is a hard silhouette: the head is on the floor, the
        back rises to the hips, the knees come down again, and at 44px in one
        flat colour that reads as a mound with a ball beside it more often than
        as a person. Five attempts got it from bad to acceptable and no
        further.

        The others on this sheet are good — qiyam, takbir, iʿtidal and rukuʿ
        read instantly. This one is the case for a real illustrator, and it is
        the most important frame in the prayer, so it is worth commissioning
        rather than iterating on.
      */}
      {posture === 'prostrating' && (
        <G>
          {head(10, 39)}
          {/*
            Forehead on the floor at the left, back sloping UP to raised hips,
            then down to the knees. The high point is the hips, which is what
            makes this sujud rather than a shape lying down — the first fill of
            this read as a hill because the slope ran the wrong way.
          */}
          <Path d="M13 43 Q13 37 18 35 Q25 32 27.5 36 L30.5 43 Z" {...solid} />
          {/* The knee, which is what stops the shape reading as a wedge. */}
          <Path d="M27.5 37 L30.5 43" {...arm} strokeWidth={2} />
        </G>
      )}

      {posture === 'sitting' && (
        <G>
          {head(20, 12)}
          {/*
            Upright torso, then the shins folded forward along the floor — an
            L, not a torso perched on a block. Sitting back on the heels means
            there is no gap under the hips, so the two run together.
          */}
          <Path d="M16 17 L24 17 L25.5 32 L33 32 L33 43 L15 43 Z" {...solid} />
          <Path d="M25 21 L29 30" {...arm} />
        </G>
      )}

      {posture === 'tashahhud' && (
        <G>
          {head(20, 12)}
          <Path d="M16 17 L24 17 L25.5 32 L33 32 L33 43 L15 43 Z" {...solid} />
          {/*
            The raised finger — the most asked-about detail in the prayer, and
            the entire reason this posture is separate from `sitting`.
          */}
          <Path d="M25 21 L29 29" {...arm} />
          <Path d="M29 29 L30.5 21.5" {...arm} strokeWidth={1.8} />
        </G>
      )}

      {/*
        The two turns that end the prayer.

        A front view was tried and abandoned: a seated figure seen head-on
        needs different geometry from the seven profiles here, and what came
        out read as a lampshade. So these reuse the seated body that already
        works and put the turn beside the head as an arrow.

        That is a diagram rather than a picture, and it is honest about being
        one — a drawn illustration will replace it the moment
        `assets/images/prayer/taslim-right.png` lands, and this exists so the
        step is not empty until then.
      */}
      {posture === 'taslim-right' && (
        <G>
          {head(20, 12)}
          <Path d="M16 17 L24 17 L25.5 32 L33 32 L33 43 L15 43 Z" {...solid} />
          {/* Forward, the way the body already faces. */}
          <Path d="M27 11 h7" {...arm} strokeWidth={1.6} />
          <Path d="M31.5 8 L34.5 11 L31.5 14" {...arm} strokeWidth={1.6} />
        </G>
      )}

      {posture === 'taslim-left' && (
        <G>
          {head(20, 12)}
          <Path d="M16 17 L24 17 L25.5 32 L33 32 L33 43 L15 43 Z" {...solid} />
          {/* Back over the shoulder, the other way. */}
          <Path d="M6 11 h7" {...arm} strokeWidth={1.6} />
          <Path d="M8.5 8 L5.5 11 L8.5 14" {...arm} strokeWidth={1.6} />
        </G>
      )}

      {posture === 'washing' && (
        <G>
          {/* Not a body: a tap, and water falling into cupped hands. */}
          <Path
            d="M13 9v6h12"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path d="M25 15v4" stroke={color} strokeWidth={2.2} strokeLinecap="round" fill="none" />
          <Path d="M25 21.5v2" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeOpacity={0.5} fill="none" />
          <Path d="M13 29q11 13 22 0z" {...solid} />
        </G>
      )}
    </Svg>
  );
}


/**
 * The prayer posture, drawn large enough to copy.
 *
 * This is the teaching illustration for the guide's steps — the whole figure,
 * in the app's own stroke, inside a faint mihrab arch so the frame says where
 * the body is: in prayer. Body shapes are filled with the card's own colour so
 * a nearer limb occludes what is behind it, which is what keeps line art
 * legible at this size.
 *
 * The views are mixed on purpose, the way printed prayer guides mix them:
 * front where the hands are the information (qiyam's fold, takbir, the salam's
 * turned head), profile where the silhouette is the ruling (the flat back of
 * rukūʿ, sujūd's seven points, the sitting). One stage, one ground line, one
 * scale, so the sequence still reads as one person moving.
 *
 * What each drawing asserts, because a drawing teaches a ruling:
 * qiyam — hands folded on the lower chest, right over left. takbir — palms
 * raised beside the head. rukūʿ — back flat, head level with it, hands
 * gripping the knees, legs straight. sujūd — forehead and nose to the ground,
 * palms flat beside the head, elbows raised, knees down, toes tucked. julūs —
 * sitting back on the heel, hands on the thighs. tashahhud — the right index
 * finger extended. taslim — the head turned over the shoulder.
 *
 * ⚠️ Drawn by a model and cleared by nobody. Every assertion above needs the
 * same qualified review as a sentence about how to pray — tracked in
 * `docs/scholarly-review.md`.
 *
 * `washing` has no diagram on purpose: a tap glyph repeated on all ten wudu
 * steps taught nothing, and a wrong drawing of a specific step would be worse
 * than the text alone. Wudu illustration is its own future piece of work.
 */
export function PostureDiagram({
  posture,
  color,
  surface,
}: {
  posture: Posture;
  color: string;
  /** The card colour behind the drawing — body shapes fill with it. */
  surface: string;
}) {
  if (posture === 'washing') return null;

  /** A front-view head: circle and kufi dome, no face. */
  const headFront = (cx: number, cy: number) => (
    <G>
      <Circle cx={cx} cy={cy} r={10} fill={surface} />
      <Path d={`M${cx - 8.6} ${cy - 4.4} a8.6 8 0 0 1 17.2 0 z`} fill={surface} />
    </G>
  );

  /** A profile head: circle, kufi, and the least nose that reads a direction. */
  const headProfile = (cx: number, cy: number, flip = false) => {
    const s = flip ? -1 : 1;
    return (
      <G>
        <Circle cx={cx} cy={cy} r={9.5} fill={surface} />
        <Path
          d={`M${cx - s * 8.2} ${cy - 4.2} a8.2 7.6 0 0 ${flip ? 0 : 1} ${s * 16.4} 0 z`}
          fill={surface}
        />
        <Path d={`M${cx + s * 9} ${cy + 1} q${s * 3.4} 1.2 ${s * 2} 4.6`} />
      </G>
    );
  };

  /** The standing robe shared by qiyam, takbir and iʿtidal. */
  const robeStanding = (
    <G>
      <Path d="M120 178 v6 q0 4 3.5 4 h3 q3 0 3 -3 v-7 z" fill={surface} strokeWidth={1.8} />
      <Path d="M130.5 178 v7 q0 3 3 3 h3 q3.5 0 3.5 -4 v-6 z" fill={surface} strokeWidth={1.8} />
      <Path
        d="M119 88 Q113 90 112 96 L104 168 Q103.5 174 109 175.5 Q118 178 130 178 Q142 178 151 175.5 Q156.5 174 156 168 L148 96 Q147 90 141 88 Q130 85.5 119 88 Z"
        fill={surface}
      />
    </G>
  );

  /** The seated profile shared by julūs and tashahhud. */
  const seatedBody = (
    <G>
      <Path d="M118 186 L113 186 Q108 180 112 172 L117 166 L121 172 Z" fill={surface} strokeWidth={1.8} />
      <Path
        d="M125 99 Q117 102 117 112 L116 144 Q115 152 122 155 L138 158 Q145 157 144 148 L143 110 Q142 101 133 99 Q129 97.5 125 99 Z"
        fill={surface}
      />
      <Path
        d="M117 150 Q133 152 145 162 L152 170 Q157 177 152 182 Q148 186 140 186 L117 186 Q112 178 117 150 Z"
        fill={surface}
      />
      {headProfile(133, 88)}
    </G>
  );

  /** The salam, seated front-on, the head turned over one shoulder. */
  const taslim = (left: boolean) => {
    const s = left ? -1 : 1;
    return (
      <G>
        <Path d="M102 188 Q98 170 112 162 L148 162 Q162 170 158 188 Z" fill={surface} />
        <Path
          d="M118 107 Q112 109 111 115 L106 154 Q105 160 111 161 Q130 165 149 161 Q155 160 154 154 L149 115 Q148 109 142 107 Q130 104.5 118 107 Z"
          fill={surface}
        />
        {headProfile(130 + s * 3, 94, left)}
        <Path
          d={`M${130 + s * 16} 76 Q${130 + s * 28} 82 ${130 + s * 30} 94`}
          strokeDasharray="1.5 5"
          strokeWidth={1.8}
          strokeOpacity={0.7}
        />
        <Path
          d={`M${130 + s * 26.5} 88 L${130 + s * 30} 94 L${130 + s * 24} 95.5`}
          strokeWidth={1.8}
          strokeOpacity={0.7}
        />
        <Path d="M115 112 L110 132 L116 148" />
        <Path d="M145 112 L150 132 L144 148" />
        <Ellipse cx={118} cy={152} rx={3.6} ry={2.8} fill={surface} />
        <Ellipse cx={142} cy={152} rx={3.6} ry={2.8} fill={surface} />
      </G>
    );
  };

  return (
    <View style={{ width: '100%', aspectRatio: 260 / 210 }}>
      <Svg width="100%" height="100%" viewBox="0 0 260 210" fill="none">
        {/* The niche: prayer's own architecture, kept faint behind the body. */}
        <Path
          d="M66 188 L66 110 Q66 56 130 42 Q194 56 194 110 L194 188"
          stroke={color}
          strokeOpacity={0.16}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M80 188 L80 112 Q80 70 130 58 Q180 70 180 112 L180 188"
          stroke={color}
          strokeOpacity={0.1}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path d="M28 188 H232" stroke={color} strokeOpacity={0.35} strokeWidth={1.8} strokeLinecap="round" />

        <G stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {posture === 'standing' && (
            <G>
              {headFront(130, 74)}
              {robeStanding}
              <Path d="M115 97 L110 126 L127 134" />
              <Path d="M145 97 L150 126 L134 134" />
              <Ellipse cx={130} cy={134} rx={4.6} ry={3.4} fill={surface} />
            </G>
          )}

          {posture === 'takbir' && (
            <G>
              {headFront(130, 74)}
              {robeStanding}
              <Path d="M115 98 L108 114 L110.5 94" />
              <Path d="M145 98 L152 114 L149.5 94" />
              <Ellipse cx={111} cy={87} rx={4.2} ry={5.8} fill={surface} />
              <Ellipse cx={149} cy={87} rx={4.2} ry={5.8} fill={surface} />
            </G>
          )}

          {posture === 'rising' && (
            <G>
              {headFront(130, 74)}
              {robeStanding}
              <Path d="M113 97 L107 138" />
              <Path d="M147 97 L153 138" />
              <Circle cx={106.5} cy={142} r={3.2} fill={surface} />
              <Circle cx={153.5} cy={142} r={3.2} fill={surface} />
            </G>
          )}

          {posture === 'bowing' && (
            <G>
              <Path d="M112 188 v-6 q0 -4 4 -4 h22 q6 0 6 5 v5 z" fill={surface} strokeWidth={1.8} />
              <Path d="M116 178 L116 126 L138 133 L140 178 Z" fill={surface} />
              <Path
                d="M116 128 Q112 120 120 116 L156 110 Q164 109 166 116 Q168 124 160 127 L124 136 Q116 137 116 128 Z"
                fill={surface}
              />
              {headProfile(174, 117)}
              <Path d="M156 122 L149 134 L142 142" />
              <Circle cx={140.5} cy={144} r={3.4} fill={surface} />
            </G>
          )}

          {posture === 'prostrating' && (
            <G>
              <Path
                d="M104 188 L103 181 Q103 176 108 174 L113 172 L115 179 L113 188 Z"
                fill={surface}
                strokeWidth={1.8}
              />
              <Path d="M112 188 v-7 q0 -3 3 -3 h26 q6 0 7 5 l1 5 z" fill={surface} strokeWidth={1.8} />
              <Path
                d="M136 180 L133 146 Q132 136 139 132 Q146 129 151 135 L178 160 Q184 166 182 172 L174 181 Q170 185 162 185 L148 185 Q140 185 138 178 Z"
                fill={surface}
              />
              {headProfile(192, 176)}
              <Path d="M170 162 L163 176 L176 183" />
              <Path d="M177 188 q-1 -5 3 -5 h14 q3 0 3 2.5 q0 2.5 -3 2.5 z" fill={surface} strokeWidth={1.8} />
            </G>
          )}

          {posture === 'sitting' && (
            <G>
              {seatedBody}
              <Path d="M134 110 L132 132 L142 148" />
              <Ellipse cx={144.5} cy={150} rx={3.6} ry={2.8} fill={surface} />
            </G>
          )}

          {posture === 'tashahhud' && (
            <G>
              {seatedBody}
              {/* Hand held just off the thigh so the raised finger reads
                  against clear ground — on the lap line it vanished. */}
              <Path d="M134 110 L131 130 L143 141" />
              <Path d="M143 141 L157 135" />
            </G>
          )}

          {posture === 'taslim-right' && taslim(false)}
          {posture === 'taslim-left' && taslim(true)}
        </G>
      </Svg>
    </View>
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
    </Svg>
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
*/

/** Today: a mihrab niche with the gold moment inside — the Awqat card as a mark. */
export function NicheMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2.75 20.25 H21.25" />
        <Path d="M5.5 20.25 V11.5 C5.5 6.6 8.2 4.4 12 4.4 C15.8 4.4 18.5 6.6 18.5 11.5 V20.25" />
      </G>
      <Circle cx={12} cy={9.6} r={1.7} fill={color} />
    </Svg>
  );
}

/** Learn: three arches on one baseline, the one you are inside marked — the StagePath as a door. */
export function ArcadeMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2.5 19.75 H21.5" />
        <Path d="M3.1 19.75 V13.9 Q3.1 10.4 5.4 10.4 Q7.7 10.4 7.7 13.9 V19.75" />
        <Path d="M9.7 19.75 V12.4 Q9.7 8.2 12 8.2 Q14.3 8.2 14.3 12.4 V19.75" />
        <Path d="M16.3 19.75 V13.9 Q16.3 10.4 18.6 10.4 Q20.9 10.4 20.9 13.9 V19.75" />
      </G>
      <Circle cx={12} cy={13.6} r={1.3} fill={color} />
    </Svg>
  );
}

/** Qur'an: a rehl — the folding stand holding an open mushaf. */
export function RehlMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M5.2 20.6 L18.8 9.2" />
        <Path d="M18.8 20.6 L5.2 9.2" />
        <Path d="M12 5.9 C10.4 4.3 8 4 5.9 4.6 L5.9 9 C8 8.4 10.4 8.7 12 10.3 C13.6 8.7 16 8.4 18.1 9 L18.1 4.6 C16 4 13.6 4.3 12 5.9 Z" />
        <Path d="M12 5.9 V10.3" strokeWidth={1} />
      </G>
    </Svg>
  );
}

/** Du'a: the misbaha — the loop of beads with its tassel. */
export function MisbahaMark({ color, size = 24 }: { color: ColorValue; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={12} cy={3.4} r={1.25} />
        <Circle cx={15.88} cy={4.66} r={1.25} />
        <Circle cx={18.28} cy={7.96} r={1.25} />
        <Circle cx={18.28} cy={12.04} r={1.25} />
        <Circle cx={15.88} cy={15.34} r={1.25} />
        <Circle cx={8.12} cy={15.34} r={1.25} />
        <Circle cx={5.72} cy={12.04} r={1.25} />
        <Circle cx={5.72} cy={7.96} r={1.25} />
        <Circle cx={8.12} cy={4.66} r={1.25} />
        <Path d="M12 16.6 V19" />
      </G>
      <Circle cx={12} cy={20.3} r={1.15} fill={color} />
    </Svg>
  );
}
