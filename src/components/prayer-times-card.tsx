import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { formatCountdown, formatTime, type PrayerTime } from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';

function Shell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      {children}
    </View>
  );
}

/**
 * Asking for location is the first thing this app ever asks of anyone, so the
 * reason and the limit are on the same screen as the button. "Never leaves
 * this device" is the whole positioning of the app, and this is the one moment
 * a user is actually wondering about it.
 */
function NeedsLocation({ status }: { status: 'denied' | 'unavailable' }) {
  const theme = useTheme();
  const { request } = useLocation();

  return (
    <Shell>
      <ThemedText type="smallBold" style={styles.cardTitle}>
        Prayer times need to know where you are
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {status === 'denied'
          ? 'The times are worked out from the position of the sun where you are standing. Your location is used on this device and never sent anywhere — there is no server to send it to.'
          : 'Location services are turned off, so the times can’t be worked out. Turn them on in your phone’s settings and come back.'}
      </ThemedText>
      {status === 'denied' && (
        <Pressable
          onPress={() => void request()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="smallBold" themeColor="textOnAccent">
            Use my location
          </ThemedText>
        </Pressable>
      )}
    </Shell>
  );
}

function TimeCell({ prayer, isNext }: { prayer: PrayerTime; isNext: boolean }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cell,
        isNext && { backgroundColor: theme.accentMuted, borderRadius: Radius.small },
      ]}>
      <ThemedText type="small" themeColor={isNext ? 'accent' : 'textSecondary'}>
        {prayer.label}
      </ThemedText>
      <ThemedText type="smallBold" themeColor={isNext ? 'accent' : 'text'} style={styles.cellTime}>
        {formatTime(prayer.time)}
      </ThemedText>
    </View>
  );
}

export function PrayerTimesCard() {
  const theme = useTheme();
  const { status, coords } = useLocation();
  const { today, next, profile, timezoneSuspect } = usePrayerTimes();

  if (status === 'denied' || status === 'unavailable') {
    return <NeedsLocation status={status} />;
  }

  if (!coords || !today || !next || !profile) {
    return (
      <Shell>
        <ThemedText type="small" themeColor="textSecondary">
          Working out today’s times…
        </ThemedText>
      </Shell>
    );
  }

  return (
    <Shell>
      <View style={styles.next}>
        <ThemedText type="small" themeColor="textSecondary">
          {next.isTomorrow ? 'Next, tomorrow' : 'Next'}
        </ThemedText>
        <View style={styles.nextLine}>
          <ThemedText type="subtitle" style={styles.nextName}>
            {next.label}
          </ThemedText>
          <ThemedText type="subtitle" themeColor="accent" style={styles.nextName}>
            {formatTime(next.time)}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {formatCountdown(next.msUntil)} · Fajr ends at sunrise, {formatTime(today.sunrise)}
        </ThemedText>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.row}>
        {today.prayers.map((prayer) => (
          <TimeCell key={prayer.id} prayer={prayer} isNext={prayer.id === next.id && !next.isTomorrow} />
        ))}
      </View>

      {timezoneSuspect && (
        <View style={[styles.warning, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            Your phone’s clock is set a long way from where you seem to be. These times follow
            the clock, so check your date and time settings if they look wrong.
          </ThemedText>
        </View>
      )}

      <View style={styles.footer}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.method}>
          {profile.label} · worked out on this phone
        </ThemedText>
        <Link href="/qibla" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.qibla,
              { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="smallBold" themeColor="accent">
              Qibla
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </Shell>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
  next: {
    gap: Spacing.one,
  },
  nextLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  nextName: {
    fontSize: 28,
    lineHeight: 36,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.one,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: Spacing.two,
  },
  cellTime: {
    fontVariant: ['tabular-nums'],
  },
  warning: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  method: {
    flex: 1,
  },
  qibla: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
