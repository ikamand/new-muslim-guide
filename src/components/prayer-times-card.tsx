import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AwqatArch } from '@/components/awqat-arch';
import { CompassRose, Glyph } from '@/components/illustrations';
import { QuietRow } from '@/components/jadwal';
import { LocationAsk } from '@/components/location-ask';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import {
  formatCountdown,
  formatDuration,
  formatTime,
  windowEnd,
  type PrayerTime,
} from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';
import { placeShort } from '@/lib/places';

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
function NeedsLocation() {
  return (
    <Shell>
      <LocationAsk />
    </Shell>
  );
}

function TimeCell({
  prayer,
  lit,
  closed,
  jumuah,
}: {
  prayer: PrayerTime;
  /**
   * The prayer the arch names: the one whose window is open, or, between
   * windows, the next one. Tint and gold follow the headline, so the arch,
   * the row and the button can never name three different prayers.
   */
  lit: boolean;
  /**
   * The prayer's WINDOW has closed. Muted, never ticked: weight says "the
   * time passed", a checkmark would claim "you prayed it". Until 10 Sep 2026
   * this dimmed at the START time, which showed ʿAsr as over while its
   * window was open and the button said Pray ʿAsr (Iyad's audit).
   */
  closed: boolean;
  /** True for Dhuhr on a Friday. */
  jumuah?: boolean;
}) {
  const theme = useTheme();

  return (
    /*
      The lit prayer gets the quiet selected ground — the colour this app
      already uses for "the thing you are on" — where it used to be gold text
      alone, which under-marked the one cell the eye is looking for. The
      day-glyph above each label is the arch's information written out: the
      row and the arch wear the same five signs (Iyad's steals from the two
      Today concepts, 1 Sep 2026).
    */
    <View
      style={[
        styles.cell,
        lit && { backgroundColor: theme.backgroundSelected },
        closed && !lit && styles.cellPassed,
      ]}>
      <Glyph
        name={prayer.id}
        size={16}
        color={lit ? theme.gold : theme.textSecondary}
      />
      <View style={styles.cellLabel}>
        {/*
          A dot, not a warning glyph. An alert on a prayer time reads as "you
          are late" or "you have done something wrong", and pressure is the
          wrong register for somebody three weeks in. This is information.
        */}
        {jumuah && <View style={[styles.jumuahDot, { backgroundColor: theme.accent }]} />}
        <ThemedText type="small" themeColor={lit ? 'gold' : 'textSecondary'}>
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
        themeColor={lit ? 'gold' : 'text'}
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
 * The Awqat card.
 *
 * ## The arch tells the truth about now (10 Sep 2026)
 *
 * Until Iyad's audit the niche always named the NEXT start, so at five in
 * the afternoon it said "Next, Maghrib" while the button beneath said "Pray
 * ʿAsr": two prayers named, no sentence joining them. The one live fact for
 * somebody on a mat is the window that is open and when it closes, and
 * `findCurrentPrayer` already computed it to gate the button. Now the same
 * four lines are about NOW while a window is open — the prayer, when it
 * closes in gold, how long is left and what follows — and about NEXT only
 * between windows, when nothing can be prayed yet. The ring on the arch,
 * the tinted cell and the button all follow the same prayer.
 *
 * ## One tap, one page
 *
 * The niche used to open a modal of the five windows, and the times row
 * opened Every prayer, a lesson about rakʿahs that already lives on Learn.
 * Both taps now open the day page (`app/awqat-day.tsx`): the arch unrolled,
 * every prayer as a span, sunrise and the middle of the night as moments,
 * the sittings, tomorrow's Fajr, and the doors that used to be an icon, a
 * settings row and a lesson. The calendar spandrel went with them; the
 * compass stays, because qibla is a mid-motion need.
 */
export function PrayerTimesCard({ action }: PrayerTimesCardProps) {
  const theme = useTheme();
  const { t } = useLocale();
  const { status, coords, source, place } = useLocation();
  const { today, next, current, timezoneSuspect } = usePrayerTimes();
  const { awqatMosque } = useSettings();
  // 5 is Friday in every locale — `getDay` is not localised, which is what
  // makes it safe to compare against a number here.
  const isFriday = new Date().getDay() === 5;

  /*
    Refused or unavailable, and no city chosen: ask. A stored fix does not
    count here — times from wherever the phone last was could be for another
    country, so the card would rather ask than guess. A chosen city is the
    reader's own answer and is drawn.
  */
  if ((status === 'denied' || status === 'unavailable') && source !== 'place') {
    return <NeedsLocation />;
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

  /* The instant the hook computed against, so every state below agrees. */
  const now = new Date(next.time.getTime() - next.msUntil);
  /* The prayer the arch names, and the ring, the tint and the button with it. */
  const litId = current ? current.id : next.isTomorrow ? null : next.id;

  return (
    <Shell>
      {/*
        The niche — the Awqat arch, with the day drawn on its outline (see
        `awqat-arch.tsx` for why the arch and the old DayArc are one thing
        now). The prayer inside it is the open window, or the next start
        between windows; the time in gold: one illuminated fact per card. The
        whole niche is one tap target and opens the day page.
      */}
      <PressableLink
        href="/awqat-day"
        accessibilityLabel={t('awqat.day.open')}
        style={styles.niche}
        pressedStyle={{ opacity: 0.75 }}>
        <AwqatArch times={today} nextId={litId} now={now} />
        <View style={styles.nicheIn}>
          {current ? (
            <>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.nextLabel}>
                {t('times.now')}
              </ThemedText>
              {/*
                Full-width box, centred text — not for layout, for the font
                race: "Asr" rendered as "As" on Iyad's phone and healed on
                restart, the signature of text measured before Literata
                loaded. A box wider than any word leaves the race nothing to
                eat, whichever way it lands.
              */}
              <ThemedText type="subtitle" style={styles.nextName}>
                {current.label}
              </ThemedText>
              <ThemedText type="cardTitle" themeColor="gold" style={styles.nextTime}>
                {t('times.until').replace('{time}', formatTime(current.windowEnds))}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('times.leftThen')
                  .replace('{left}', formatDuration(current.windowEnds.getTime() - now.getTime()))
                  .replace('{next}', next.label)}
              </ThemedText>
            </>
          ) : (
            <>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.nextLabel}>
                {next.isTomorrow ? t('times.nextTomorrow') : t('times.next')}
              </ThemedText>
              <ThemedText type="subtitle" style={styles.nextName}>
                {next.label}
              </ThemedText>
              <ThemedText type="cardTitle" themeColor="gold" style={styles.nextTime}>
                {formatTime(next.time)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatCountdown(next.msUntil)}
              </ThemedText>
            </>
          )}
        </View>
      </PressableLink>

      {/*
        The spandrel. The corners around an arch are where an illuminated
        page puts its small ornaments, and this one is an ornament that goes
        somewhere: the compass rose to the qibla. Its twin, the jadwal mark
        to the month, retired on 10 Sep 2026 into a labelled row on the day
        page — the best timetable in the app was behind a 16px mark nobody
        could name. Drawn AFTER the niche so it stacks above it: a sibling,
        never a child, because a link inside the niche's link is a button
        inside a button.
      */}
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
        The whole row opens the day page, the same destination as the niche:
        one tap on the times gives the times in full. The cells stay visually
        quiet on purpose — the row is the target, not any one time.
      */}
      <PressableLink
        href="/awqat-day"
        accessibilityLabel={t('awqat.day.open')}
        style={styles.row}
        pressedStyle={{ opacity: 0.6 }}>
        {today.prayers.map((prayer) => (
          <TimeCell
            key={prayer.id}
            prayer={prayer}
            lit={prayer.id === litId}
            closed={windowEnd(today, prayer.id).getTime() <= now.getTime()}
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

      {/* Times for a chosen city say which city, and where to change it. */}
      {source === 'place' && place && (
        <QuietRow
          href="/choose-place"
          label={`${t('place.timesFor')} ${placeShort(place)}`}
          value={t('place.change')}
        />
      )}
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
    A 44pt target in the arch's empty corner, the drawn mark centred. Above
    the niche in stacking order (it renders after it), so the corner tap is
    its own and everything else on the niche still opens the day page.
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
  spandrelRight: {
    right: Spacing.one,
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
