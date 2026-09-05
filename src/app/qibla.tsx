import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Glyph } from '@/components/illustrations';
import { LocationAsk } from '@/components/location-ask';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { isUnverified, useLocation } from '@/hooks/use-location';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { settleHeading, shortestTurn } from '@/lib/compass';
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
 *
 * ## Why the needle is not React state
 *
 * It was, and every compass reading — twenty a second — re-rendered the
 * whole screen and drew the sensor's noise straight onto the needle, which
 * twitched while the phone lay still (Iyad, 5 Sep 2026: "it does jitter and
 * swing"). Now each reading is settled by `settleHeading` and written to a
 * shared value that only the needle's transform reads, so the screen renders
 * when something a reader can see changes: the first reading arriving, or the
 * calibration level crossing the line.
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
  const { coords, fixedAt, request } = location;
  /*
    Captured once on mount rather than read during render, exactly as
    `use-competence` does: two renders of the same component must not disagree,
    and nothing here needs to notice a day ticking over.
  */
  const [now] = useState(() => Date.now());
  const [hasHeading, setHasHeading] = useState(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  /*
    The needle's rotation, in degrees clockwise from up. Bearing minus the
    settled heading — kept off React state on purpose; see the header.

    Unwrapped: it counts on past 360 rather than snapping back to 0, because
    the value is animated between readings, and an animation from 359 to 1
    would take the long way round the dial.
  */
  const rotation = useSharedValue(0);
  const bearing = coords ? qiblaBearing(coords) : 0;

  useEffect(() => {
    if (!coords) return;

    let subscription: Location.LocationSubscription | undefined;
    let active = true;
    let settled: number | null = null;
    let shown = rotation.value;
    let lastAt = 0;

    Location.watchHeadingAsync((reading) => {
      if (!active) return;
      // `trueHeading` is -1 without location permission; magnetic north is the
      // only thing left then, and it can be over ten degrees out.
      const raw = reading.trueHeading >= 0 ? reading.trueHeading : reading.magHeading;
      // The reading carries no timestamp, so arrival time stands in for it.
      const at = Date.now();
      const gap = lastAt ? at - lastAt : 0;
      settled = settleHeading(settled, raw, gap);
      lastAt = at;
      shown += shortestTurn(shown, bearing - settled);
      /*
        Glide to the new position over the interval the sensor is actually
        reporting at, so a phone that delivers five readings a second draws
        a turn as motion rather than as five jumps. Capped so a stall in the
        sensor does not become a slow-motion needle when it wakes.
      */
      rotation.value = withTiming(shown, {
        duration: Math.min(Math.max(gap, 40), 200),
        easing: Easing.linear,
      });
      setHasHeading(true);
      setAccuracy(reading.accuracy);
    })
      .then((sub) => {
        if (active) subscription = sub;
        else sub.remove();
      })
      .catch(() => {
        if (active) setHasHeading(false);
      });

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [coords, bearing, rotation]);

  /*
    No compass: the arrow shows the bearing itself, as the note under the
    dial has always claimed. Left at zero it pointed north whatever the
    number above said — caught on the web build, which never has a compass.
  */
  useEffect(() => {
    if (coords && !hasHeading) rotation.value = bearing;
  }, [coords, hasHeading, bearing, rotation]);

  const needleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const kaabaStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotation.value}deg` }],
  }));

  if (!coords) {
    /*
      The one screen in the app that is nothing but the location, so the ask
      lives here — it used to send people to a different tab to grant it,
      which is a button's job. Since 5 Sep 2026 it is the same ask as every
      other screen that needs a location; this one used to have an icon tile
      and centred prose of its own.
    */
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('qibla.title') }} />
        <LocationAsk title={t('qibla.needTitle')} why={t('qibla.needLocation')} />
      </ScrollView>
    );
  }

  const unreliable = hasHeading && accuracy < TRUSTWORTHY_ACCURACY;
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
          style={[styles.unverified, { borderLeftColor: theme.vermilion }]}>
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

      {/*
        The dial keeps its fill. It is an instrument face, not a card — the
        needle needs a ground to turn against — so the no-boxes rule does not
        apply. Its edge joins the gold family with every other drawn line.
      */}
      <View
        style={[
          styles.dial,
          { backgroundColor: theme.backgroundElement, borderColor: theme.goldSoft },
        ]}>
        <Animated.View style={[styles.needle, needleStyle]}>
          <View style={[styles.needleStem, { backgroundColor: theme.border }]} />
          <View style={[styles.needleHead, { borderBottomColor: theme.accent }]} />
          {/*
            The Kaʿbah rides the arrow's tip, counter-rotated so the house
            stays upright while the arrow swings — the arrow does not point
            somewhere abstract, it points at a building.
          */}
          <Animated.View style={[styles.needleKaaba, kaabaStyle]}>
            <Glyph name="kaaba" color={theme.accent} size={22} />
          </Animated.View>
        </Animated.View>
        <View style={[styles.hub, { backgroundColor: theme.accent }]} />
      </View>

      {!hasHeading && (
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
  hub: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  note: {
    alignSelf: 'stretch',
  },
  /* A caution in the margin — vermilion rule, no box. Rubric, not accent. */
  unverified: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingLeft: Spacing.three,
    borderLeftWidth: 2,
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
