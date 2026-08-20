import { Pressable, StyleSheet, View } from 'react-native';

import { DayArc, MihrabArch } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
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
 * The card takes an `action` rather than building one, so it stays about times
 * and the screen stays about where tapping goes. It doesn't know what a rakʿah
 * is and shouldn't start now.
 */
export type PrayerTimesCardProps = { action?: React.ReactNode };

/**
 * Asking for location is the first thing this app ever asks of anyone, so the
 * reason and the limit are on the same screen as the button. "Never leaves
 * this device" is the whole positioning of the app, and this is the one moment
 * a user is actually wondering about it.
 */
function NeedsLocation({ status }: { status: 'denied' | 'unavailable' }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { request } = useLocation();

  return (
    <Shell>
      <ThemedText type="smallBold" style={styles.cardTitle}>
        {t('times.needLocation')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {status === 'denied' ? t('times.needLocation.why') : t('times.locationOff')}
      </ThemedText>
      {status === 'denied' && (
        <Pressable
          onPress={() => void request()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="smallBold" themeColor="textOnAccent">
            {t('times.useLocation')}
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

export function PrayerTimesCard({ action }: PrayerTimesCardProps) {
  const theme = useTheme();
  const { t } = useLocale();
  const { status, coords } = useLocation();
  const { today, next, profile, timezoneSuspect } = usePrayerTimes();

  if (status === 'denied' || status === 'unavailable') {
    return <NeedsLocation status={status} />;
  }

  if (!coords || !today || !next || !profile) {
    return (
      <Shell>
        <ThemedText type="small" themeColor="textSecondary">
          {t('times.working')}
        </ThemedText>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* The niche that marks the qibla, framing the prayer you face it for. */}
      <View style={styles.arch} pointerEvents="none">
        <MihrabArch color={theme.accent} width={200} opacity={0.16} />
      </View>

      <View style={styles.next}>
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.nextLabel}>
          {next.isTomorrow ? t('times.nextTomorrow') : t('times.next')}
        </ThemedText>
        <View style={styles.nextLine}>
          <ThemedText type="subtitle" style={styles.nextName}>
            {next.label}
          </ThemedText>
          <ThemedText type="subtitle" themeColor="accent" style={styles.nextName}>
            {formatTime(next.time)}
          </ThemedText>
        </View>
        {/*
          Sunrise closes Fajr's window, so it is worth a line while Fajr is what
          is next and is noise for the other twenty hours of the day.
        */}
        <ThemedText type="small" themeColor="textSecondary">
          {next.id === 'fajr'
            ? `${formatCountdown(next.msUntil)} · ${t('times.endsAtSunrise')} ${formatTime(today.sunrise)}`
            : formatCountdown(next.msUntil)}
        </ThemedText>
      </View>

      {action}

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Where each prayer actually falls on the sun's path. */}
      <DayArc
        today={today}
        color={theme.accent}
        mutedColor={theme.backgroundElement}
        highlight={next.isTomorrow ? null : next.id}
      />

      <View style={styles.row}>
        {today.prayers.map((prayer) => (
          <TimeCell key={prayer.id} prayer={prayer} isNext={prayer.id === next.id && !next.isTomorrow} />
        ))}
      </View>

      {timezoneSuspect && (
        <View style={[styles.warning, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('times.clockSuspect')}
          </ThemedText>
        </View>
      )}

      <View style={styles.footer}>
        {/*
          The method line names what these times are. The line under it names
          what they are not: an authority. These are astronomical times for a
          convention, and a mosque's printed timetable is a decision by people
          — it may round, it may hold Isha back, it may follow a different
          angle. Where the two disagree the mosque wins, and a beginner has no
          way to know that unless the app says so on the screen showing the
          times rather than in a lesson they may never open.
        */}
        <View style={styles.method}>
          <ThemedText type="small" themeColor="textSecondary">
            {profile.label} · {t('times.onThisPhone')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('times.followLocal')}
          </ThemedText>
        </View>
        <PressableLink
          href="/qibla"
          style={[styles.qibla, { borderColor: theme.border }]}
          pressedStyle={{ opacity: 0.6 }}>
          <ThemedText type="smallBold" themeColor="accent">
            {t('qibla.title')}
          </ThemedText>
        </PressableLink>
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
    position: 'relative',
    overflow: 'hidden',
  },
  arch: {
    position: 'absolute',
    top: Spacing.half,
    left: 0,
    right: 0,
    alignItems: 'center',
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
    alignItems: 'center',
    paddingTop: Spacing.four + Spacing.four,
  },
  nextLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nextLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
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
    marginTop: -Spacing.two,
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
    gap: 2,
  },
  qibla: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
