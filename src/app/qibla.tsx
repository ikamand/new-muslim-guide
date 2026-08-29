import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Glyph } from '@/components/illustrations';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { isUnverified, useLocation } from '@/hooks/use-location';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { qiblaBearing } from '@/lib/prayer-times';

/**
 * Which way to face.
 *
 * The bearing is exact arithmetic from coordinates. The *needle* is only as
 * good as a phone magnetometer, which is a different claim — so the screen
 * shows the bearing as a number too. A number and a landmark beat a wobbling
 * arrow, and unlike the arrow the number is still right when the compass is
 * confused by a laptop or a car.
 *
 * ## Three things can be wrong, and the screen used to admit only two
 *
 * The compass can be uncalibrated, and it says so. The phone can report no
 * heading at all, and it says so. And **the coordinates can be from somewhere
 * else entirely**, which it did not say at all.
 *
 * `use-location` restores the last stored fix on launch so a cold start is not
 * a spinner. If permission has since been refused, that stored fix is all there
 * will ever be — and this screen only checked `coords`, so it drew a confident
 * arrow from a position that could be a week old and a country away. The prayer
 * times card refuses to draw in exactly that state; this one drew anyway. A
 * wrong prayer time is a missed minute. A wrong qibla is a prayer prayed facing
 * the wrong way, and the reader has no way to tell.
 *
 * `isUnverified` is the test, and it is deliberately narrower than `isStale` —
 * see the note on it in `use-location.tsx`.
 */

/** iOS reports 0–3; below 2 the reading can be tens of degrees out. */
const TRUSTWORTHY_ACCURACY = 2;

function compassPoint(degrees: number): string {
  const points = [
    'north', 'north-east', 'east', 'south-east',
    'south', 'south-west', 'west', 'north-west',
  ];
  return points[Math.round(degrees / 45) % 8];
}

/** "yesterday", "3 days ago" — never a clock time, which implies a precision we do not have. */
function whenFixed(fixedAt: number | null, now: number, t: (key: UIKey) => string): string {
  if (!fixedAt) return t('qibla.when.unknown');
  const days = Math.floor((now - fixedAt) / (24 * 60 * 60 * 1000));
  if (days <= 0) return t('qibla.when.today');
  if (days === 1) return t('qibla.when.yesterday');
  return t('qibla.when.days').replace('{n}', String(days));
}

export default function QiblaScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const location = useLocation();
  const { coords, status, fixedAt, request } = location;
  /*
    Captured once on mount rather than read during render, exactly as
    `use-competence` does: two renders of the same component must not disagree,
    and nothing here needs to notice a day ticking over.
  */
  const [now] = useState(() => Date.now());
  const [heading, setHeading] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    if (!coords) return;

    let subscription: Location.LocationSubscription | undefined;
    let active = true;

    Location.watchHeadingAsync((reading) => {
      if (!active) return;
      // `trueHeading` is -1 without location permission; magnetic north is the
      // only thing left then, and it can be over ten degrees out.
      setHeading(reading.trueHeading >= 0 ? reading.trueHeading : reading.magHeading);
      setAccuracy(reading.accuracy);
    })
      .then((sub) => {
        if (active) subscription = sub;
        else sub.remove();
      })
      .catch(() => {
        if (active) setHeading(null);
      });

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [coords]);

  if (!coords) {
    /*
      The one screen in the app that is nothing but the location, so the ask
      lives here — it used to send people to a different tab to grant it,
      which is a button's job. While the answer is still coming, say so and
      offer nothing to press.
    */
    const waiting = status === 'locating' || status === 'ready';

    return (
      <ScrollView contentContainerStyle={[styles.content, styles.empty]}>
        <Stack.Screen options={{ title: t('qibla.title') }} />
        <View style={[styles.emptyMark, { backgroundColor: theme.accentMuted }]}>
          <Glyph name="kaaba" color={theme.accent} size={30} />
        </View>
        <ThemedText type="default" themeColor="textSecondary" style={styles.emptyBody}>
          {waiting ? t('qibla.locating') : t('qibla.needLocation')}
        </ThemedText>
        {!waiting && (
          <Pressable
            onPress={() => void request()}
            accessibilityRole="button"
            accessibilityLabel={t('times.useLocation')}
            style={({ pressed }) => [
              styles.grant,
              { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
            ]}>
            <ThemedText type="smallBold" themeColor="textOnAccent">
              {t('times.useLocation')}
            </ThemedText>
          </Pressable>
        )}
      </ScrollView>
    );
  }

  const bearing = qiblaBearing(coords);
  const rotation = heading === null ? 0 : bearing - heading;
  const unreliable = heading !== null && accuracy < TRUSTWORTHY_ACCURACY;
  const unverified = isUnverified(location);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('qibla.title') }} />

      {/*
        Above the dial, not below it.

        Somebody checking the qibla looks at the arrow and stops looking. A
        caveat under a 240px compass is a caveat nobody reads, and this one
        changes whether the arrow should be trusted at all.
      */}
      {unverified && (
        <View
          style={[
            styles.unverified,
            { backgroundColor: theme.backgroundElement, borderColor: theme.accent },
          ]}>
          <ThemedText type="smallBold">{t('qibla.unverified.title')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('qibla.unverified.body').replace('{when}', whenFixed(fixedAt, now, t))}
          </ThemedText>
          <Pressable
            onPress={() => void request()}
            accessibilityRole="button"
            accessibilityLabel={t('qibla.unverified.fix')}
            style={({ pressed }) => [
              styles.fix,
              { borderColor: theme.accent, backgroundColor: pressed ? theme.backgroundSelected : 'transparent' },
            ]}>
            <ThemedText type="small" themeColor="accent">
              {t('qibla.unverified.fix')}
            </ThemedText>
          </Pressable>
        </View>
      )}

      <View style={styles.headline}>
        <ThemedText type="subtitle">
          {t('qibla.bearing').replace('{deg}', String(Math.round(bearing)))}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('qibla.where').replace('{point}', t(`qibla.point.${compassPoint(bearing)}` as UIKey))}
        </ThemedText>
      </View>

      <View
        style={[
          styles.dial,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        ]}>
        <View style={[styles.needle, { transform: [{ rotate: `${rotation}deg` }] }]}>
          <View style={[styles.needleStem, { backgroundColor: theme.border }]} />
          <View style={[styles.needleHead, { borderBottomColor: theme.accent }]} />
          {/*
            The Kaʿbah rides the arrow's tip, counter-rotated so the house
            stays upright while the arrow swings — the arrow does not point
            somewhere abstract, it points at a building.
          */}
          <View style={[styles.needleKaaba, { transform: [{ rotate: `${-rotation}deg` }] }]}>
            <Glyph name="kaaba" color={theme.accent} size={22} />
          </View>
        </View>
        <View style={[styles.hub, { backgroundColor: theme.accent }]} />
      </View>

      {heading === null && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
          {t('qibla.noCompass')}
        </ThemedText>
      )}

      {unreliable && (
        <View style={[styles.warning, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">{t('qibla.unsure')}</ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headline: {
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  dial: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needle: {
    position: 'absolute',
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needleStem: {
    position: 'absolute',
    width: 2,
    height: 150,
  },
  needleHead: {
    position: 'absolute',
    top: 36,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  needleKaaba: {
    position: 'absolute',
    top: 8,
  },
  empty: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  emptyMark: {
    width: 56,
    height: 56,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBody: {
    textAlign: 'center',
    maxWidth: 300,
  },
  grant: {
    minHeight: 48,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hub: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  note: {
    alignSelf: 'stretch',
  },
  unverified: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderLeftWidth: 3,
  },
  fix: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  warning: {
    alignSelf: 'stretch',
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
  },
});
