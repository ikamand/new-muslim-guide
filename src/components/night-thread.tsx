import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';

import { DayMarkAt } from '@/components/illustrations';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { NightThread as Thread, WitrPlace } from '@/lib/night';
import { formatTime } from '@/lib/prayer-times';

/** The drawing's height, the line's height inside it, and its inset from both ends. */
const HEIGHT = 56;
const LINE_Y = 34;
const INSET = 12;
/**
 * The room the "Last third" caption needs beside the start of the band before
 * the bell. The caption is about sixty points wide; seventy-six hid it behind
 * an ordinary night's 4:38 bell, where it still fits.
 */
const CAPTION_ROOM = 66;

/**
 * Tonight as a line, under the prayer card.
 *
 * ʿIshāʾ on the left, Fajr on the right, the last third as a soft gold band
 * (brighter once it has begun), and the part of the night already behind the
 * reader drawn in gold. On it: the moon at now, using the arch's own ʿIshāʾ
 * mark; the bell of the alarm that will ring, above the line, until it rings;
 * and witr's two-then-one where `tonightPlan` puts it, in the night-prayer
 * page's own marks: filled at the end of the night, as the page draws shafʿ
 * and witr last, and outlined before sleep, as it draws praying them earlier.
 * In the last third with no wake-up set there is no witr mark, because the
 * app cannot know whether it was prayed; the card asks instead.
 *
 * Approved as "The Night Thread", 13 Sep 2026. Every word is a `ThemedText`
 * rather than SVG text, because font resolution inside `react-native-svg` is
 * unreliable; the SVG carries only marks. One accessibility label reads the
 * whole drawing.
 *
 * ⚠️ Where witr sits is a ruling drawn on screen, and is on the review pile.
 */
export function NightThread({
  thread,
  witr,
  bellAt,
}: {
  thread: Thread;
  witr?: WitrPlace;
  bellAt?: Date;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const [width, setWidth] = useState(0);

  const x0 = INSET;
  const x1 = Math.max(x0, width - INSET);
  const along = (fraction: number) => x0 + (x1 - x0) * Math.min(1, Math.max(0, fraction));
  const fractionOf = (date: Date) =>
    (date.getTime() - thread.isha.getTime()) / (thread.fajr.getTime() - thread.isha.getTime());

  const nowX = along(thread.now);
  const bandX = along(thread.lastThird);
  const inThird = thread.part === 'third';

  const bellFraction = bellAt ? fractionOf(bellAt) : undefined;
  const bellX = bellFraction !== undefined && thread.now < bellFraction ? along(bellFraction) : undefined;

  /*
    'next' sits just after the moon and, where there is room, before the band.
    The floor keeps it to the moon's right in the last minutes before the last
    third, where the band's edge would otherwise pull it behind the moon and
    draw witr as already passed.
  */
  const witrFraction =
    witr === undefined
      ? undefined
      : witr === 'early'
        ? 0.08
        : witr === 'next'
          ? Math.max(thread.now + 0.08, Math.min(thread.now + 0.1, thread.lastThird - 0.07))
          : 0.95;
  const witrX = witrFraction === undefined ? undefined : along(witrFraction);
  const witrLast = witr === 'end';

  const showCaption = bellX === undefined || bellX - 12 > bandX + CAPTION_ROOM;
  const showBandTime = thread.lastThird > 0.28 && thread.lastThird < 0.72;

  const label = [
    t('night.thread.label')
      .replace('{isha}', formatTime(thread.isha))
      .replace('{third}', formatTime(thread.lastThirdAt))
      .replace('{fajr}', formatTime(thread.fajr)),
    bellAt && bellX !== undefined ? t('night.thread.bell').replace('{time}', formatTime(bellAt)) : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View
      style={styles.wrap}
      onLayout={(event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width)}
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}>
      <View style={styles.drawing}>
        {width > 0 ? (
          <Svg width={width} height={HEIGHT}>
            <Rect
              x={bandX}
              y={LINE_Y - 7}
              width={Math.max(0, x1 - bandX)}
              height={14}
              rx={7}
              fill={theme.gold}
              opacity={inThird ? 0.3 : 0.15}
            />
            <Line x1={x0} y1={LINE_Y} x2={x1} y2={LINE_Y} stroke={theme.goldSoft} strokeWidth={1} />
            <Line x1={x0} y1={LINE_Y} x2={nowX} y2={LINE_Y} stroke={theme.gold} strokeWidth={1.5} />
            <Line x1={x0} y1={LINE_Y - 5} x2={x0} y2={LINE_Y + 5} stroke={theme.gold} strokeWidth={1.2} />
            <Line x1={x1} y1={LINE_Y - 5} x2={x1} y2={LINE_Y + 5} stroke={theme.goldSoft} strokeWidth={1.2} />

            {bellX !== undefined ? (
              <G>
                <Line x1={bellX} y1={LINE_Y - 11} x2={bellX} y2={LINE_Y - 3} stroke={theme.accent} strokeWidth={1} />
                <Circle cx={bellX} cy={LINE_Y - 21} r={10} fill={theme.background} stroke={theme.accent} strokeWidth={1.1} />
                <Path
                  d={bellPath(bellX, LINE_Y - 21)}
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth={1.1}
                  strokeLinejoin="round"
                />
              </G>
            ) : null}

            {witrX !== undefined ? (
              <G>
                <Rect x={witrX - 13} y={LINE_Y - 7} width={26} height={14} rx={7} fill={theme.background} />
                {[-8.5, -2.5, 7.5].map((dx) => (
                  <Circle
                    key={dx}
                    cx={witrX + dx}
                    cy={LINE_Y}
                    r={2.4}
                    fill={witrLast ? theme.gold : theme.background}
                    stroke={theme.gold}
                    strokeWidth={witrLast ? 0 : 1.25}
                  />
                ))}
              </G>
            ) : null}

            <Circle cx={nowX} cy={LINE_Y} r={11} fill={theme.background} stroke={theme.gold} strokeWidth={1.3} />
            <DayMarkAt name="isha" cx={nowX} cy={LINE_Y} size={13} color={theme.gold} />
          </Svg>
        ) : null}
        {width > 0 && showCaption ? (
          <ThemedText type="caption" themeColor="gold" style={[styles.caption, { left: bandX + 6 }]}>
            {t('night.thread.lastThird')}
          </ThemedText>
        ) : null}
      </View>

      <View style={styles.times}>
        <ThemedText type="caption" themeColor="textSecondary">
          {t('night.thread.isha').replace('{time}', formatTime(thread.isha))}
        </ThemedText>
        {width > 0 && showBandTime ? (
          <ThemedText
            type="caption"
            themeColor="textSecondary"
            style={[styles.bandTime, { left: bandX - BAND_TIME_WIDTH / 2 }]}>
            {formatTime(thread.lastThirdAt)}
          </ThemedText>
        ) : null}
        <ThemedText type="caption" themeColor="textSecondary">
          {t('night.thread.fajr').replace('{time}', formatTime(thread.fajr))}
        </ThemedText>
      </View>
    </View>
  );
}

const BAND_TIME_WIDTH = 80;

/** A small bell centred on (cx, cy): the body, its rim and the clapper. */
function bellPath(cx: number, cy: number): string {
  return (
    `M${cx - 4.2} ${cy + 3.5}h8.4l-1.1-1.5v-2.6a3.1 3.1 0 0 0-6.2 0v2.6l-1.1 1.5z` +
    `M${cx - 1.4} ${cy + 5.1}a1.4 1.4 0 0 0 2.8 0`
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  drawing: {
    height: HEIGHT,
  },
  caption: {
    position: 'absolute',
    top: 0,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bandTime: {
    position: 'absolute',
    top: 0,
    width: BAND_TIME_WIDTH,
    textAlign: 'center',
  },
});
