/**
 * Today's date in the Islamic calendar, or nothing.
 *
 * ## Why this is allowed to return null
 *
 * The app has no Hijri arithmetic of its own and this file does not add any.
 * It asks the platform's ICU data for the Umm al-Qura calendar and checks that
 * it actually got it. Where a JavaScript engine ships without that calendar the
 * answer is `null`, and every caller treats `null` as "the app does not know
 * what the Islamic date is" — the header line disappears and no seasonal
 * content is surfaced. Guessing would be worse than saying nothing.
 *
 * ## What Umm al-Qura is, and is not
 *
 * It is a calculated calendar, and the start of a month is announced locally by
 * moon sighting. The two can differ by a day, which is exactly what
 * `reference:islamic-calendar` tells the reader. Two consequences are designed
 * around rather than hidden:
 *
 *  - Nothing in the app claims a single named day from this. No "Eid is today",
 *    no "tonight is Laylat al-Qadr". Only month-length windows, where a day
 *    either way changes nothing.
 *  - The date is shown on the home screen rather than used silently, so a
 *    reader whose community is a day ahead can see what the app thinks.
 *
 * The Islamic day also begins at sunset rather than midnight, so the date here
 * is a day behind between maghrib and midnight. Same reasoning: it does not
 * matter across a month-long window, and it would matter for a single day —
 * which is one more reason nothing here names one.
 */

export type HijriDate = {
  /** Year AH. */
  year: number;
  /** 1–12, Muharram first. */
  month: number;
  /** 1–30. */
  day: number;
};

/**
 * Requested in English deliberately: only the numbers are read, and asking for
 * numbers in a locale with its own digits (Arabic-Indic among them) would mean
 * parsing those back.
 */
const CALENDAR = 'islamic-umalqura';
const LOCALE = `en-US-u-ca-${CALENDAR}`;

/** Built once, and only once — constructing a formatter is not cheap. */
let formatter: Intl.DateTimeFormat | null | undefined;

function getFormatter(): Intl.DateTimeFormat | null {
  if (formatter !== undefined) return formatter;

  try {
    const candidate = new Intl.DateTimeFormat(LOCALE, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    // An engine that does not know the calendar quietly hands back Gregorian
    // rather than throwing, which would put the app a good fifty-eight years
    // out. This is the check that catches it.
    formatter = candidate.resolvedOptions().calendar === CALENDAR ? candidate : null;
  } catch {
    formatter = null;
  }

  return formatter;
}

/** Plausible for any date this app will ever be opened on: 1979 CE to 2174 CE. */
const FIRST_YEAR = 1400;
const LAST_YEAR = 1600;

export function hijriDate(date: Date): HijriDate | null {
  const format = getFormatter();
  if (!format) return null;

  try {
    const parts = format.formatToParts(date);
    const read = (type: Intl.DateTimeFormatPartTypes) =>
      Number.parseInt(parts.find((part) => part.type === type)?.value ?? '', 10);

    const year = read('year');
    const month = read('month');
    const day = read('day');

    const plausible =
      Number.isInteger(year) &&
      year >= FIRST_YEAR &&
      year <= LAST_YEAR &&
      Number.isInteger(month) &&
      month >= 1 &&
      month <= 12 &&
      Number.isInteger(day) &&
      day >= 1 &&
      day <= 30;

    return plausible ? { year, month, day } : null;
  } catch {
    return null;
  }
}
