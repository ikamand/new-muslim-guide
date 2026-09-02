import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AwqatArch } from '@/components/awqat-arch';
import { CompassRose, Glyph, JadwalMark } from '@/components/illustrations';
import { DoubleRule } from '@/components/jadwal';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import {
  formatCountdown,
  formatTime,
  windowEnd,
  type DayTimes,
  type NextPrayer,
  type PrayerTime,
} from '@/lib/prayer-times';
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
      <ThemedText type="cardTitle">
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
  passed,
  jumuah,
}: {
  prayer: PrayerTime;
  isNext: boolean;
  /** The prayer's time has gone by. Muted — never ticked: weight says "the
      time passed", a checkmark would claim "you prayed it". */
  passed: boolean;
  /** True for Dhuhr on a Friday. */
  jumuah?: boolean;
}) {
  const theme = useTheme();

  return (
    /*
      The next prayer gets the quiet selected ground — the colour this app
      already uses for "the thing you are on" — where it used to be gold text
      alone, which under-marked the one cell the eye is looking for. The
      day-glyph above each label is the arch's information written out: the
      row and the arch wear the same five signs (Iyad's steals from the two
      Today concepts, 1 Sep 2026).
    */
    <View
      style={[
        styles.cell,
        isNext && { backgroundColor: theme.backgroundSelected },
        passed && !isNext && styles.cellPassed,
      ]}>
      <Glyph
        name={prayer.id}
        size={16}
        color={isNext ? theme.gold : theme.textSecondary}
      />
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
      {/*
        The `small` rung, not smallBold — "12:54 PM" in bold wrapped its
        meridiem onto a second line in a fifth of a phone, and the tinted
        cell now carries the emphasis the bold used to. One line, always.
      */}
      <ThemedText
        type="small"
        themeColor={isNext ? 'gold' : 'text'}
        style={styles.cellTime}
        numberOfLines={1}>
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

/**
 * The windows sheet — what tapping the niche opens.
 *
 * Five spans, not five moments. A convert doesn't know prayers HAVE windows:
 * that Fajr expires at sunrise, that Dhuhr lasts until ʿAsr enters. Boards
 * and apps print start times only; the ends are what born Muslims absorb and
 * nobody writes down. This sheet is that gap, written down.
 *
 * ⚠️ REVIEW REQUIRED — the window ends are rulings, not astronomy. Fajr→
 * sunrise and Dhuhr→ʿAsr are settled; ʿAsr→Maghrib is the permissible span
 * taught as one clear way (the preferred-time detail is left to a lesson);
 * ʿIshāʾ→the middle of the night states the preferred end, and the middle of
 * the night is computed in the fiqh sense (halfway from sunset to Fajr), not
 * 00:00. The wording lives in `ui.ts` beside `times.endsAtSunrise`, which
 * set the precedent. None of it ships a public release unreviewed.
 *
 * The ends themselves come from `windowEnd` in `lib/prayer-times.ts`, which
 * also gates Today's pray button — one mapping, so the span the sheet prints
 * and the span the button obeys cannot drift apart.
 */
function WindowsSheet({
  visible,
  onClose,
  today,
  next,
}: {
  visible: boolean;
  onClose: () => void;
  today: DayTimes;
  next: NextPrayer;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  const windows: { prayer: PrayerTime; ends: Date }[] = today.prayers.map((prayer) => ({
    prayer,
    ends: windowEnd(today, prayer.id),
  }));

  const now = new Date(next.time.getTime() - next.msUntil);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* The backdrop is the close control; the sheet itself swallows taps. */}
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.scrim }]}
        onPress={onClose}
        accessibilityLabel={t('windows.close')}>
        <Pressable style={[styles.sheet, { backgroundColor: theme.background }]} onPress={() => {}}>
          <DoubleRule />
          <View style={styles.sheetBody}>
            <ThemedText type="sectionTitle" style={styles.sheetTitle}>
              {t('windows.title')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('windows.intro')}
            </ThemedText>

            <View style={styles.sheetRows}>
              {windows.map(({ prayer, ends }) => {
                const open = now >= prayer.time && now < ends;
                const passed = now >= ends;
                return (
                  <View
                    key={prayer.id}
                    style={[styles.windowRow, { borderBottomColor: theme.goldSoft }]}>
                    <ThemedText
                      type={open ? 'smallBold' : 'small'}
                      themeColor={open ? 'gold' : passed ? 'textSecondary' : 'text'}
                      style={styles.windowName}>
                      {prayer.label}
                    </ThemedText>
                    <View style={styles.windowSpan}>
                      <ThemedText
                        type={open ? 'smallBold' : 'small'}
                        themeColor={open ? 'gold' : passed ? 'textSecondary' : 'text'}
                        style={styles.tabular}>
                        {formatTime(prayer.time)} – {formatTime(ends)}
                      </ThemedText>
                      <ThemedText type="caption" themeColor="textSecondary">
                        {t(`windows.${prayer.id}`)}
                        {open ? ` · ${formatCountdown(ends.getTime() - now.getTime())}` : ''}
                      </ThemedText>
                    </View>
                  </View>
                );
              })}
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              {t('windows.note')}
            </ThemedText>
          </View>
          <DoubleRule />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function PrayerTimesCard({ action }: PrayerTimesCardProps) {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { status, coords } = useLocation();
  const { today, next, timezoneSuspect } = usePrayerTimes();
  const [windowsOpen, setWindowsOpen] = useState(false);
  const { awqatMosque } = useSettings();
  // 5 is Friday in every locale — `getDay` is not localised, which is what
  // makes it safe to compare against a number here.
  const isFriday = new Date().getDay() === 5;
  // The month's own name rides in the calendar mark's accessibility label,
  // so a screen reader still hears where the tap lands.
  const monthWord = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date());

  if (status === 'denied' || status === 'unavailable') {
    return <NeedsLocation status={status} />;
  }

  if (!coords || !today || !next) {
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
      {/*
        The niche — the Awqat arch, with the day drawn on its outline (see
        `awqat-arch.tsx` for why the arch and the old DayArc are one thing
        now). The next prayer sits inside it, the time in gold: one
        illuminated fact per card. The whole niche is one tap target, and it
        opens the windows sheet — the marks are an instrument, and an
        instrument you can't query is decoration. Five 3-pixel dots could
        never each be a target for a thumb mid-motion; the arch can.
      */}
      <Pressable
        onPress={() => setWindowsOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={t('windows.open')}
        style={({ pressed }) => [styles.niche, { opacity: pressed ? 0.75 : 1 }]}>
        <AwqatArch
          times={today}
          nextId={next.isTomorrow ? null : next.id}
          now={new Date(next.time.getTime() - next.msUntil)}
        />
        <View style={styles.nicheIn}>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.nextLabel}>
            {next.isTomorrow ? t('times.nextTomorrow') : t('times.next')}
          </ThemedText>
          {/*
            Full-width box, centred text — not for layout, for the font race:
            "Asr" rendered as "As" on Iyad's phone and healed on restart,
            which is the signature of text measured before Literata loaded
            and clipped when the wider face swapped in. A box wider than any
            word leaves the race nothing to eat, whichever way it lands.
          */}
          <ThemedText type="subtitle" style={styles.nextName}>
            {next.label}
          </ThemedText>
          <ThemedText type="cardTitle" themeColor="gold" style={styles.nextTime}>
            {formatTime(next.time)}
          </ThemedText>
          {/*
            Sunrise closes Fajr's window, so it is worth a line while Fajr is
            next and is noise for the other twenty hours of the day. Its OWN
            line: joined to the countdown with a separator it ran nearly the
            niche's full width and crowded the arch's legs (Iyad, 2 Sep).
          */}
          <ThemedText type="small" themeColor="textSecondary">
            {formatCountdown(next.msUntil)}
          </ThemedText>
          {next.id === 'fajr' && (
            <ThemedText type="small" themeColor="textSecondary">
              {`${t('times.endsAtSunrise')} ${formatTime(today.sunrise)}`}
            </ThemedText>
          )}
        </View>
      </Pressable>

      {/*
        The spandrels. The corners around an arch are where an illuminated
        page puts its small ornaments, and these two are ornaments that go
        somewhere: the jadwal mark to the month's timetable, the compass
        rose to the qibla. They replaced a quiet text row at the card's foot
        ("August › / Qibla ›") — one row shorter, and the links now sit in
        space the arch was already leaving empty. Drawn AFTER the niche so
        they stack above it: siblings, never children, because a link inside
        the windows-sheet button is a button inside a button.
      */}
      <PressableLink
        href="/awqat"
        accessibilityLabel={`${t('awqat.title')} · ${monthWord}`}
        style={[styles.spandrel, styles.spandrelLeft]}
        pressedStyle={{ opacity: 0.5 }}>
        <JadwalMark color={theme.gold} />
      </PressableLink>
      <PressableLink
        href="/qibla"
        accessibilityLabel={t('qibla.title')}
        style={[styles.spandrel, styles.spandrelRight]}
        pressedStyle={{ opacity: 0.5 }}>
        <CompassRose color={theme.gold} />
      </PressableLink>

      {/*
        The times row and its divider as ONE zero-gap group: the divider is
        the arch's baseline, and the row's box now touches it — the flush-join
        rule — instead of pulling itself up with a negative margin across a
        container gap, which was the last of the compensation fossils here.
        The row's own paddingTop keeps the printed times exactly where they
        were.
      */}
      <View>
      {/* The times row is the arch's baseline — the legs land on this rule. */}
      <View style={[styles.divider, { backgroundColor: theme.goldSoft }]} />

      {/*
        The whole row opens Every prayer — the rakʿah counts, the rawatib,
        aloud or silent, and the prayers beyond the five. Iyad's call, 31 Aug:
        this deep link REPLACED two proposed lines on the card itself (rawatib
        under the next prayer, witr after ʿIshaʾ), so the card's face changes
        by nothing and the information is one tap away where a prayer-minded
        person already looks. The cells stay visually quiet on purpose — the
        row is the target, not any one time.
      */}
      <PressableLink
        href="/pray"
        accessibilityLabel={t('learn.everyPrayer.title')}
        style={styles.row}
        pressedStyle={{ opacity: 0.6 }}>
        {today.prayers.map((prayer) => (
          <TimeCell
            key={prayer.id}
            prayer={prayer}
            isNext={prayer.id === next.id && !next.isTomorrow}
            passed={prayer.time.getTime() < next.time.getTime() - next.msUntil}
            jumuah={isFriday && prayer.id === 'dhuhr'}
          />
        ))}
      </PressableLink>
      </View>

      {/*
        One caption, only when a mosque match is active: the numbers above
        simply ARE the mosque's numbers now, and the malachite dot is the
        only colour that state gets — matched means confirmed right, and
        that is what malachite means.
      */}
      {awqatMosque && (
        <View style={styles.matched}>
          <ThemedText type="caption" themeColor="malachite">
            ●
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            {t('mosque.active')}
          </ThemedText>
        </View>
      )}

      {action}

      {isFriday && <JumuahNote />}

      {timezoneSuspect && (
        <View style={[styles.warning, { borderLeftColor: theme.vermilion }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('times.clockSuspect')}
          </ThemedText>
        </View>
      )}

      <WindowsSheet
        visible={windowsOpen}
        onClose={() => setWindowsOpen(false)}
        today={today}
        next={next}
      />
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
    /*
      Slim vertical padding: the arch's crown already carries ~9px of drawn
      air at the niche's top, and the quiet line closes the bottom — a full
      24 on both ends stacked onto the screen gap and pressed as dead space.
    */
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
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
  /*
    Tall enough that the arch reads as architecture and the four lines inside
    it sit with air; the legs run to the container's bottom edge, where the
    divider — the horizon's baseline — meets them.
  */
  niche: {
    height: 190,
    justifyContent: 'center',
  },
  nicheIn: {
    alignItems: 'center',
    gap: Spacing.half,
    /*
      Five (32) rather than three: with the box centred in the 190 niche,
      top padding is what seats the text stack lower in the arch — at 16 the
      first caption hung just under the crown ornament and the whole stack
      read as floating high (Iyad, 2 Sep).
    */
    paddingTop: Spacing.five,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
  nextLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nextName: {
    width: '100%',
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  nextTime: {
    fontVariant: ['tabular-nums'],
  },
  matched: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
  },
  /*
    44pt targets in the arch's empty corners, the drawn mark centred. Above
    the niche in stacking order (they render after it), so the corner taps
    are theirs and everything else on the niche still opens the windows
    sheet.
  */
  spandrel: {
    position: 'absolute',
    top: Spacing.one,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  spandrelLeft: {
    left: Spacing.one,
  },
  spandrelRight: {
    right: Spacing.one,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  sheetBody: {
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  sheetTitle: {
    textAlign: 'center',
  },
  sheetRows: {
    marginTop: Spacing.two,
  },
  windowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  windowName: {
    minWidth: 72,
  },
  windowSpan: {
    alignItems: 'flex-end',
    gap: 2,
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.one,
    /* The box touches the divider; this is the air the negative margin faked. */
    paddingTop: Spacing.two,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.two,
    borderRadius: Radius.small,
  },
  /* The whole cell steps back together — glyph, label and time as one. */
  cellPassed: {
    opacity: 0.55,
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
});
