import { useState } from 'react';
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
      style={[styles.card, { borderColor: theme.goldSoft }]}>
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

function TimeCell({
  prayer,
  isNext,
  jumuah,
}: {
  prayer: PrayerTime;
  isNext: boolean;
  /** True for Dhuhr on a Friday. */
  jumuah?: boolean;
}) {
  const theme = useTheme();

  return (
    /*
      The next prayer is marked in gold, not by a filled pill.

      A pill is a second container inside a screen that just removed all of
      them, and it made the live cell look pressable when it is not. Gold is
      how this page marks the thing you are on.
    */
    <View style={styles.cell}>
      <View style={styles.cellLabel}>
        {/*
          A dot, not a warning glyph. An alert on a prayer time reads as "you
          are late" or "you have done something wrong", and pressure is the
          wrong register for somebody three weeks in. This is information.
        */}
        {jumuah && <View style={[styles.jumuahDot, { backgroundColor: theme.accent }]} />}
        <ThemedText type="small" themeColor={isNext ? 'gold' : 'textSecondary'}>
          {prayer.label}
        </ThemedText>
      </View>
      <ThemedText type="smallBold" themeColor={isNext ? 'gold' : 'text'} style={styles.cellTime}>
        {formatTime(prayer.time)}
      </ThemedText>
    </View>
  );
}

/**
 * What the dot on Dhuhr means, on a Friday.
 *
 * Deliberately NOT a relabelling of Dhuhr to "Jumuah". Jumuah replaces Dhuhr
 * only for somebody who actually prays it in congregation, and the app cannot
 * know that: a man who cannot reach a mosque prays Dhuhr, and so does a woman
 * who does not attend. Swapping the label would tell both of them they are
 * praying something they are not.
 *
 * So the card states the condition instead of guessing at the person. It is
 * inferred from the day rather than asked, which is the app's preference, and
 * it is right for all three readers.
 */
function JumuahNote() {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => setOpen((was) => !was)}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      style={[styles.jumuah, { borderLeftColor: theme.accent }]}>
      <ThemedText type="smallBold" themeColor="accent">
        {t('times.jumuah')}
      </ThemedText>
      {open && (
        <ThemedText type="small" themeColor="textSecondary">
          {t('times.jumuah.detail')}
        </ThemedText>
      )}
    </Pressable>
  );
}

export function PrayerTimesCard({ action }: PrayerTimesCardProps) {
  const theme = useTheme();
  const { t } = useLocale();
  const { status, coords } = useLocation();
  const { today, next, profile, timezoneSuspect } = usePrayerTimes();
  // 5 is Friday in every locale — `getDay` is not localised, which is what
  // makes it safe to compare against a number here.
  const isFriday = new Date().getDay() === 5;

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
        {/*
          Gold, and drawn rather than hinted.

          It was `accent` at 0.16 — a watermark you had to look for. Under the
          jadwal grammar this arch IS the card's frame, and it is illumination,
          which is gold's one job. 0.5 is as far as it goes: it orients, and a
          niche that competes with the time inside it has stopped orienting.
        */}
        <MihrabArch color={theme.gold} width={200} opacity={0.5} />
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

      <View style={[styles.divider, { backgroundColor: theme.goldSoft }]} />

      {/* Where each prayer actually falls on the sun's path. */}
      <DayArc
        today={today}
        color={theme.accent}
        mutedColor={theme.backgroundElement}
        highlight={next.isTomorrow ? null : next.id}
      />

      <View style={styles.row}>
        {today.prayers.map((prayer) => (
          <TimeCell
            key={prayer.id}
            prayer={prayer}
            isNext={prayer.id === next.id && !next.isTomorrow}
            jumuah={isFriday && prayer.id === 'dhuhr'}
          />
        ))}
      </View>

      {isFriday && <JumuahNote />}

      {timezoneSuspect && (
        <View style={[styles.warning, { borderLeftColor: theme.vermilion }]}>
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
          style={[styles.qibla, { borderColor: theme.goldSoft }]}
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
  /*
    A panel, not a card. The mihrab below is the frame now — a niche drawn in
    gold reads as the edge of this block, so a border round it would be two
    edges saying the same thing.
  */
  card: {
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    /*
      A bottom rule only.

      Every block on Today drawing both meant every join between two blocks
      showed two hairlines a gap apart, which reads as a mistake. One rule
      per join: a block closes itself and the next one opens against it.
    */
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  cellLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jumuahDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  jumuah: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
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
