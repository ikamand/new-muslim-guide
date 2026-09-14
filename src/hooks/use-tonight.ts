import { useLiveSession } from '@/components/adhkar-session-card';
import { sessionForWindow, type AdhkarSession } from '@/content/duas/sessions';
import { arcForNight } from '@/content/ramadan-arc';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { hijriOfNight } from '@/lib/hijri';
import { nightThread, type NightThread } from '@/lib/night';
import { computeNight } from '@/lib/prayer-times';
import { SUHOOR_LEAD_MINUTES } from '@/lib/reminders';

/** Which card the night shows. */
export type TonightState = 'before' | 'ramadan' | 'third';

/** Where witr's mark sits on tonight's line. */
export type WitrPlace = 'early' | 'next' | 'end';

export type Tonight = {
  thread: NightThread;
  state: TonightState;
  witr: WitrPlace;
  /** The wake-up the card's switch sets: an hour before Fajr, or suhoor's in Ramadan. */
  wakeAt: Date;
  /** Drawn on the line only while that switch is on. */
  bellAt?: Date;
  /** The sitting of sleep, for the card's adhkār row. */
  session: AdhkarSession | undefined;
};

/**
 * Tonight, for Today: the night thread and the card that follows the moon.
 *
 * The approved design is "The Night Thread" (Iyad, 13 Sep 2026). Null outside
 * ʿIshāʾ → Fajr, and during the twenty minutes after a prayer, when the
 * after-prayer adhkār keep Today's words slot as they always have.
 *
 * ## What it decides, and from what
 *
 * - **The state.** The last third from the moment it begins, measured from
 *   Maghrib (`nightThread`). Before that, a Ramadan night when the Ramadan
 *   arc's tarāwīḥ row covers the night's own Islamic date; otherwise "before
 *   you sleep".
 * - **Where witr goes.** With the imam early on a Ramadan night. At the end
 *   of the night in the last third, or whenever the wake-up is on, because
 *   the Sunnah puts witr last for someone who will wake (Muslim 755).
 *   Otherwise just after now: before sleep, for someone who might not wake.
 * - **The bell.** The switch's own alarm: the night wake-up, or on a Ramadan
 *   night the suhoor one, drawn only while it is on.
 *
 * It reads the clock and the reader's own switch. It never reads, stores or
 * guesses what anybody prayed.
 */
export function useTonight(): Tonight | null {
  const live = useLiveSession();
  const { coords } = useLocation();
  const { today, profile } = usePrayerTimes();
  const { nightWakeUp, suhoorWakeUp } = useSettings();

  // `today` is read so the prayer-times tick re-renders this at every boundary.
  if (!today || !coords || !profile) return null;
  if (live?.state.window === 'after-prayer') return null;

  const now = new Date();
  const night = computeNight(coords, now, profile);
  const thread = night ? nightThread(night.evening, night.morning, now) : null;
  if (!night || !thread) return null;

  const maghrib = night.evening.prayers.find((prayer) => prayer.id === 'maghrib')?.time;
  const date = maghrib ? hijriOfNight(maghrib) : null;
  const ramadanNight = Boolean(date && arcForNight(date, 'witr'));

  const state: TonightState = thread.part === 'third' ? 'third' : ramadanNight ? 'ramadan' : 'before';
  const wakeAt = ramadanNight
    ? new Date(thread.fajr.getTime() - SUHOOR_LEAD_MINUTES * 60_000)
    : thread.wakeAt;
  const waking = ramadanNight ? suhoorWakeUp : nightWakeUp;
  const witr: WitrPlace = state === 'ramadan' ? 'early' : state === 'third' || nightWakeUp ? 'end' : 'next';

  return {
    thread,
    state,
    witr,
    wakeAt,
    bellAt: waking ? wakeAt : undefined,
    session: sessionForWindow('night'),
  };
}
