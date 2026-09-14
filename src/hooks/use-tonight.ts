import { useLiveSession } from '@/components/adhkar-session-card';
import { sessionForWindow, type AdhkarSession } from '@/content/duas/sessions';
import { arcForNight, type ArcRow } from '@/content/ramadan-arc';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { hijriOfNight } from '@/lib/hijri';
import { nightThread, tonightPlan, type NightThread, type TonightPlan } from '@/lib/night';
import { computeNight } from '@/lib/prayer-times';
import { resolveWake } from '@/lib/reminders';

export type Tonight = TonightPlan & {
  thread: NightThread;
  /** The Ramadan arc's row, on a night of Ramadan: the card's title and its Taraweeh link. */
  ramadan?: ArcRow;
  /** When the bell rings, while an alarm is set for this night. */
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
 * The decisions are `tonightPlan`'s, in `lib/night.ts`, so the check can walk
 * them. This hook only reads what they are decided from: the clock, the
 * Ramadan arc for the night's own Islamic date, and the reader's two switches
 * and the times they are set to.
 *
 * ⚠️ What the card and the line say follows from here, and is on the review pile.
 */
export function useTonight(): Tonight | null {
  const live = useLiveSession();
  const { coords } = useLocation();
  const { today, profile } = usePrayerTimes();
  const { nightWakeUp, suhoorWakeUp, nightWakeTime, suhoorTime } = useSettings();

  // `today` is read so the prayer-times tick re-renders this at every boundary.
  if (!today || !coords || !profile) return null;
  if (live?.state.window === 'after-prayer') return null;

  const now = new Date();
  const night = computeNight(coords, now, profile);
  const thread = night ? nightThread(night.evening, night.morning, now) : null;
  if (!night || !thread) return null;

  const maghrib = night.evening.prayers.find((prayer) => prayer.id === 'maghrib')?.time;
  const date = maghrib ? hijriOfNight(maghrib) : null;
  const ramadan = date ? arcForNight(date, 'witr') : undefined;

  const plan = tonightPlan({ part: thread.part, ramadanNight: Boolean(ramadan), suhoorWakeUp, nightWakeUp });
  // The same placement the planners ring by, so the bell sits where the alarm will.
  const wakeNight = { isha: thread.isha, fajr: thread.fajr, lastThird: thread.lastThirdAt };
  const bellAt =
    plan.bell === 'suhoor'
      ? resolveWake('suhoor', wakeNight, suhoorTime).fireAt
      : plan.bell === 'night'
        ? resolveWake('night', wakeNight, nightWakeTime).fireAt
        : undefined;

  return {
    ...plan,
    thread,
    ramadan,
    bellAt,
    session: sessionForWindow('night'),
  };
}
