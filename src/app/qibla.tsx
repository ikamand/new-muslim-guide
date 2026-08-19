import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocation } from '@/hooks/use-location';
import { useTheme } from '@/hooks/use-theme';
import { qiblaBearing } from '@/lib/prayer-times';

/**
 * Which way to face.
 *
 * The bearing is exact arithmetic from coordinates. The *needle* is only as
 * good as a phone magnetometer, which is a different claim — so the screen
 * shows the bearing as a number too. A number and a landmark beat a wobbling
 * arrow, and unlike the arrow the number is still right when the compass is
 * confused by a laptop or a car.
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

export default function QiblaScreen() {
  const theme = useTheme();
  const { coords, status } = useLocation();
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
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: 'Qibla' }} />
        <ThemedText type="default" themeColor="textSecondary">
          {status === 'denied'
            ? 'The qibla is worked out from where you are, so it needs your location. You can turn that on from the prayer times on the home screen.'
            : 'Finding your location…'}
        </ThemedText>
      </ScrollView>
    );
  }

  const bearing = qiblaBearing(coords);
  const rotation = heading === null ? 0 : bearing - heading;
  const unreliable = heading !== null && accuracy < TRUSTWORTHY_ACCURACY;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Qibla' }} />

      <View style={styles.headline}>
        <ThemedText type="subtitle">
          {Math.round(bearing)}° from north
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          The Kaʿbah is {compassPoint(bearing)} of you. If the arrow is jumping about, face
          that way using anything you trust — a map, the sun, a neighbour.
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
        </View>
        <View style={[styles.hub, { backgroundColor: theme.accent }]} />
      </View>

      {heading === null && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
          This phone isn’t reporting a compass heading, so the arrow is pointing at the raw
          bearing rather than at the Kaʿbah. Use the number above.
        </ThemedText>
      )}

      {unreliable && (
        <View style={[styles.warning, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            The compass isn’t confident right now. Move away from anything metal or electrical
            and turn the phone in a figure of eight to settle it.
          </ThemedText>
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
  hub: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  note: {
    alignSelf: 'stretch',
  },
  warning: {
    alignSelf: 'stretch',
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
  },
});
