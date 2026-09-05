/**
 * Which sitting of dhikr the clock is currently in.
 *
 * Pure, and takes `now` and the day's times as arguments rather than reading
 * either, so it can be checked at any instant of any day without a device —
 * `scripts/adhkar-window-check.mjs` walks a whole day through it.
 *
 * ## Why prayer times and not clock hours
 *
 * The app already had an hour table (`MOMENT_BY_HOUR` in `duas.ts`) and it was
 * the right idea with the wrong input. ʿAsr in Manchester is 15:00 in December
 * and 18:30 in June; sunrise moves by three hours across the year. An hour
 * table is only correct near the equator and near the equinox.
 *
 * ## ⚠️ The boundaries are religious content, not configuration
 *
 * Where the morning sitting ends, and whether the evening one runs from ʿAsr
 * or from Maghrib, are questions scholars answer differently. What is encoded
 * below is ONE position and it is not sourced yet. It is in
 * `docs/scholarly-review.md`; nothing here should be read as the app teaching
 * that these are the only defensible windows.
 */

import type { DayTimes, PrayerTime } from './prayer-times';
import type { AdhkarWindow } from '@/content/duas/sessions';

/**
 * How long after the taslīm the after-prayer adhkār still leads.
 *
 * Long enough to cover getting through them unhurried, short enough that the
 * tab is not still claiming you have just prayed an hour later.
 */
export const AFTER_PRAYER_GRACE_MS = 20 * 60 * 1000;

export type WindowState = {
  window: AdhkarWindow | null;
  /**
   * The prayer whose grace period is running, when `window` is
   * `after-prayer`. The screen names it — "you have just prayed ʿAsr" — and
   * that is only honest if it comes from the same computation.
   */
  justPrayed?: string;
  /** The boundary that opened the current window, for the screen to cite. */
  since?: Date;
  /**
   * The boundary that will CLOSE the window, where the day's times know it.
   *
   * This function always tested both ends of every span and threw the closing
   * one away, which left the screen able to say only "ʿAsr was 4:52" — the
   * half a reader cannot act on. How long is left is the half they can.
   *
   * It is the day's own `PrayerTime`, not a name and a time copied out of it,
   * so the label can never drift from the boundary that was actually tested.
   * The tab hardcoded a second table of prayer names for exactly this and
   * would have gone on saying "ʿAsr" the day the evening window moved to
   * Maghrib — a change this file's own header says is open.
   *
   * Absent in two cases, both honest rather than lazy: after a prayer, where
   * the boundary is a grace period and not a prayer at all, and at night after
   * ʿIshāʾ, where the window closes at TOMORROW's Fajr and `today` does not
   * have it.
   */
  until?: PrayerTime;
};

/**
 * Without prayer times, the clock is the only thing the app has. These spans
 * sit inside the unions below for anywhere people live, so the offer is never
 * outside a window a reader would recognise — it is just less precise about
 * the edges. Until 5 Sep 2026 no times meant no sitting, and Today showed a
 * different card with a different name for the same thing.
 */
function clockWindow(now: Date): WindowState {
  const hour = now.getHours();
  if (hour >= 5 && hour < 11) return { window: 'morning' };
  if (hour >= 16 && hour < 21) return { window: 'evening' };
  if (hour >= 21 || hour < 4) return { window: 'night' };
  return { window: null };
}

/**
 * The window `now` falls in, or `null` when none is open.
 *
 * `null` is a real answer, not a failure: mid-morning through to ʿAsr belongs
 * to no sitting, and roughly half the waking day is like that. The screen
 * shows what you are learning instead of inventing a session for the hour.
 *
 * With no times at all — before location is granted — falls back to the
 * clock, above. The tab has to work in that state, so it must not be special.
 */
export function windowAt(today: DayTimes | null, now: Date): WindowState {
  if (!today) return clockWindow(now);

  const at = (id: string) => today.prayers.find((prayer) => prayer.id === id);
  const fajr = at('fajr');
  const dhuhr = at('dhuhr');
  const asr = at('asr');
  const isha = at('isha');

  /*
    After the prayer wins outright. Someone still on the mat is not looking for
    the morning adhkār, even at seven in the morning — and this is the only
    window that is about an event rather than a span.
  */
  for (const prayer of today.prayers) {
    const since = now.getTime() - prayer.time.getTime();
    if (since >= 0 && since < AFTER_PRAYER_GRACE_MS) {
      return { window: 'after-prayer', justPrayed: prayer.label, since: prayer.time };
    }
  }

  /*
    Both windows are the UNION of the mainstream positions, not a choice
    between them.

    Morning is read as Fajr→sunrise by some and Fajr→midday by others; evening
    as ʿAsr→Maghrib or as Maghrib→ʿIshāʾ, since the Islamic day turns at
    sunset. This function decides what the tab OFFERS, not when it is
    permissible to say anything, so it does not have to adjudicate — it can
    cover every span either position calls by that name and claim nothing.

    The narrow reading was tried first and was a usability failure, not a
    scholarly one. Fajr to sunrise in Manchester in August is 85 minutes, so
    somebody waking at seven — most people — found no morning sitting at all,
    and anybody sitting down after sunset found no evening one. The costs are
    lopsided: too wide leaves an offer standing slightly outside somebody's
    preferred window, too narrow makes the thing vanish for a reader who does
    not yet know it exists.
  */
  if (fajr && dhuhr && now >= fajr.time && now < dhuhr.time) {
    return { window: 'morning', since: fajr.time, until: dhuhr };
  }
  if (asr && isha && now >= asr.time && now < isha.time) {
    return { window: 'evening', since: asr.time, until: isha };
  }
  /*
    Night is TWO tests, not one, and the second is the whole reason this
    function takes `now` instead of reading the clock.

    `computeDay` returns the times for the local day `now` falls in. At 00:30
    that is the NEW day, whose ʿIshāʾ is twenty hours in the future — so
    `now >= isha` is false and a single test quietly abandons exactly the
    person awake at one in the morning looking for the sleep adhkār. The hours
    before Fajr belong to the night that has not ended yet.
  */
  if (isha && now >= isha.time) {
    /*
      No `until`: this window closes at TOMORROW's Fajr, and `today` holds the
      Fajr that has already been and gone. Saying nothing beats naming a time
      sixteen hours in the past.
    */
    return { window: 'night', since: isha.time };
  }
  if (fajr && now < fajr.time) {
    return { window: 'night', until: fajr };
  }

  return { window: null };
}
