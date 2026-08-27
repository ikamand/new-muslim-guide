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

import type { DayTimes } from './prayer-times';
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
};

/**
 * The window `now` falls in, or `null` when none is open.
 *
 * `null` is a real answer, not a failure: mid-morning through to ʿAsr belongs
 * to no sitting, and roughly half the waking day is like that. The screen
 * shows what you are learning instead of inventing a session for the hour.
 *
 * Returns `null` with no times at all, which is what happens before location
 * is granted. The tab has to work in that state, so it must not be special.
 */
export function windowAt(today: DayTimes | null, now: Date): WindowState {
  if (!today) return { window: null };

  const at = (id: string) => today.prayers.find((prayer) => prayer.id === id)?.time;
  const fajr = at('fajr');
  const dhuhr = at('dhuhr');
  const asr = at('asr');
  const maghrib = at('maghrib');
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
  if (fajr && dhuhr && now >= fajr && now < dhuhr) {
    return { window: 'morning', since: fajr };
  }
  if (asr && isha && now >= asr && now < isha) {
    return { window: 'evening', since: asr };
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
  if (isha && now >= isha) {
    return { window: 'night', since: isha };
  }
  if (fajr && now < fajr) {
    return { window: 'night' };
  }

  return { window: null };
}
