import {
  CalculationMethod,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PolarCircleResolution,
  PrayerTimes,
  Qibla,
  type CalculationParameters,
} from 'adhan';

/**
 * Prayer times, computed on this device and nowhere else.
 *
 * `adhan` is pure arithmetic over the sun's position — no network, no lookup
 * service. Everything here is a pure function of (coordinates, instant); the
 * hooks decide when to call it.
 *
 * Two things this file exists to get right:
 *
 * 1. **Which day it is.** `adhan` reads `getFullYear/getMonth/getDate` off the
 *    Date it is given, which are *local* components. Hand it a Date built from
 *    UTC parts and you get yesterday's or tomorrow's times near midnight. So
 *    every date that goes in is built from local calendar parts, explicitly.
 *
 * 2. **Daylight saving.** The Dates `adhan` returns are absolute instants, so
 *    formatting them through `Intl` in the device's zone applies whatever
 *    offset is in force *at that instant* — DST included, transitions included.
 *    The rule that keeps this true: never cache a formatted string, and never
 *    reach the next day by adding 86,400,000 ms. Recompute instead.
 */

export const PRAYER_IDS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export type PrayerId = (typeof PRAYER_IDS)[number];

export const PRAYER_LABEL: Record<PrayerId, string> = {
  fajr: 'Fajr',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha',
};

export type LatLon = { latitude: number; longitude: number };

/**
 * A regional convention, as one coherent unit.
 *
 * Method and madhab are bundled rather than offered as two settings, because
 * they are not independent in practice — somewhere that follows Karachi's
 * angles also computes ʿAsr the Hanafi way, and letting a user mix them
 * produces a timetable no mosque near them prints.
 */
export type MethodProfile = {
  id: string;
  /** Shown to the user once, on the times screen. Not a setting. */
  label: string;
  build: () => CalculationParameters;
};

type Box = { minLat: number; maxLat: number; minLon: number; maxLon: number };

function within({ latitude, longitude }: LatLon, box: Box): boolean {
  return (
    latitude >= box.minLat &&
    latitude <= box.maxLat &&
    longitude >= box.minLon &&
    longitude <= box.maxLon
  );
}

function withMadhab(params: CalculationParameters, madhab: (typeof Madhab)[keyof typeof Madhab]) {
  params.madhab = madhab;
  return params;
}

/**
 * ⚠️ REVIEW REQUIRED — these regional boxes and the method each maps to were
 * written by a model. They are deliberately coarse: a box only has to be right
 * about which convention the mosques in it print.
 */
const REGIONS: { box: Box; profile: MethodProfile }[] = [
  {
    // Saudi Arabia
    box: { minLat: 16, maxLat: 32.5, minLon: 34, maxLon: 56 },
    profile: { id: 'umm-al-qura', label: 'Umm al-Qura', build: CalculationMethod.UmmAlQura },
  },
  {
    // United Arab Emirates
    box: { minLat: 22, maxLat: 26.5, minLon: 51, maxLon: 56.5 },
    profile: { id: 'dubai', label: 'Dubai', build: CalculationMethod.Dubai },
  },
  {
    // Qatar
    box: { minLat: 24.4, maxLat: 26.2, minLon: 50.7, maxLon: 51.7 },
    profile: { id: 'qatar', label: 'Qatar', build: CalculationMethod.Qatar },
  },
  {
    // Kuwait
    box: { minLat: 28.5, maxLat: 30.1, minLon: 46.5, maxLon: 48.5 },
    profile: { id: 'kuwait', label: 'Kuwait', build: CalculationMethod.Kuwait },
  },
  {
    // Iran
    box: { minLat: 25, maxLat: 40, minLon: 44, maxLon: 63.5 },
    profile: { id: 'tehran', label: 'Tehran', build: CalculationMethod.Tehran },
  },
  {
    // Türkiye
    box: { minLat: 35.8, maxLat: 42.2, minLon: 25.5, maxLon: 45 },
    profile: { id: 'turkey', label: 'Diyanet', build: CalculationMethod.Turkey },
  },
  {
    // Egypt and the surrounding region
    box: { minLat: 21.5, maxLat: 33.5, minLon: 24, maxLon: 37 },
    profile: { id: 'egyptian', label: 'Egyptian General Authority', build: CalculationMethod.Egyptian },
  },
  {
    // Pakistan, India, Bangladesh, Afghanistan — Hanafi ʿAsr is near-universal
    // here, and the Karachi angles assume it.
    box: { minLat: 5, maxLat: 38, minLon: 60, maxLon: 93 },
    profile: {
      id: 'karachi',
      label: 'Karachi',
      build: () => withMadhab(CalculationMethod.Karachi(), Madhab.Hanafi),
    },
  },
  {
    // Singapore, Malaysia, Indonesia, Brunei
    box: { minLat: -11, maxLat: 8, minLon: 95, maxLon: 141 },
    profile: { id: 'singapore', label: 'Singapore (MUIS)', build: CalculationMethod.Singapore },
  },
  {
    // North America
    box: { minLat: 14, maxLat: 72, minLon: -170, maxLon: -52 },
    profile: { id: 'north-america', label: 'ISNA', build: CalculationMethod.NorthAmerica },
  },
];

/** Where most of the world lands, and a sane default anywhere unmapped. */
const DEFAULT_PROFILE: MethodProfile = {
  id: 'muslim-world-league',
  label: 'Muslim World League',
  build: CalculationMethod.MuslimWorldLeague,
};

/**
 * Pick the convention from where the user is.
 *
 * This is the one decision in the feature that could have been a settings
 * screen. It isn't, because someone who has just become Muslim cannot possibly
 * choose between Umm al-Qura and ISNA, and being asked would tell them the app
 * doesn't know either.
 */
export function inferProfile(coords: LatLon): MethodProfile {
  return REGIONS.find((region) => within(coords, region.box))?.profile ?? DEFAULT_PROFILE;
}

function buildParams(coords: LatLon, profile: MethodProfile): CalculationParameters {
  const params = profile.build();
  const location = new Coordinates(coords.latitude, coords.longitude);
  // Above roughly 48° the sun never reaches the twilight angles on some dates,
  // and the plain calculation yields no Fajr or no Isha at all. These two
  // resolve that rather than rendering an empty row.
  params.highLatitudeRule = HighLatitudeRule.recommended(location);
  params.polarCircleResolution = PolarCircleResolution.AqrabBalad;
  return params;
}

/**
 * A Date at local midnight, `offsetDays` from the day `reference` falls in.
 *
 * Built from calendar parts rather than by adding 24 hours, because a day with
 * a DST transition in it is 23 or 25 hours long and millisecond arithmetic
 * lands on the wrong date twice a year.
 */
function localDay(reference: Date, offsetDays = 0): Date {
  return new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate() + offsetDays,
    0,
    0,
    0,
    0,
  );
}

export type PrayerTime = {
  id: PrayerId;
  label: string;
  /** An absolute instant. Format it, don't store the formatting. */
  time: Date;
};

export type DayTimes = {
  prayers: PrayerTime[];
  /** Marks the end of Fajr's window. Not a prayer. */
  sunrise: Date;
};

export function computeDay(coords: LatLon, reference: Date, profile: MethodProfile): DayTimes {
  const times = new PrayerTimes(
    new Coordinates(coords.latitude, coords.longitude),
    localDay(reference),
    buildParams(coords, profile),
  );

  return {
    prayers: PRAYER_IDS.map((id) => ({ id, label: PRAYER_LABEL[id], time: times[id] })),
    sunrise: times.sunrise,
  };
}

export type NextPrayer = PrayerTime & {
  /** True when the next one is tomorrow's Fajr rather than later today. */
  isTomorrow: boolean;
  msUntil: number;
};

function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * The next prayer due, rolling past midnight.
 *
 * `adhan`'s own `nextPrayer()` returns "none" once Isha has passed, which is
 * correct for a single day and useless on a home screen at 11pm — that is
 * exactly when someone wants to know when Fajr is.
 *
 * Days either side of today are searched rather than just tomorrow, because
 * the device clock and the coordinates can disagree about which day it is.
 * That isn't hypothetical: fly from London to Sydney and the phone holds the
 * old timezone until it re-syncs, during which "tomorrow's Fajr" at those
 * coordinates is an instant that has already passed. Scanning a window and
 * taking the first prayer strictly in the future is correct in both cases and
 * can never return a negative countdown.
 */
export function findNextPrayer(coords: LatLon, now: Date, profile: MethodProfile): NextPrayer {
  for (const offset of [-1, 0, 1, 2]) {
    const day = computeDay(coords, localDay(now, offset), profile);
    const upcoming = day.prayers.find((prayer) => prayer.time.getTime() > now.getTime());

    if (upcoming) {
      return {
        ...upcoming,
        isTomorrow: !isSameLocalDay(upcoming.time, now),
        msUntil: upcoming.time.getTime() - now.getTime(),
      };
    }
  }

  // Unreachable in practice — two days of prayers cannot all be in the past —
  // but the type needs an answer and a wrong time beats a crash on a mat.
  const fallback = computeDay(coords, localDay(now, 1), profile).prayers[0];
  return {
    ...fallback,
    isTomorrow: !isSameLocalDay(fallback.time, now),
    msUntil: Math.max(0, fallback.time.getTime() - now.getTime()),
  };
}

/** Degrees clockwise from true north towards the Kaʿbah. */
export function qiblaBearing(coords: LatLon): number {
  return Qibla(new Coordinates(coords.latitude, coords.longitude));
}

/**
 * Is the device's clock plausibly set for where the device is?
 *
 * Every time here is formatted in the device's timezone, which is right almost
 * always — phones set it from the network. It goes wrong for someone who has
 * travelled with automatic time off, and the failure is silent and total: a
 * correct instant shown as the wrong wall clock.
 *
 * Longitude gives a rough solar offset (15° per hour). A real timezone can sit
 * a couple of hours from solar time legitimately — China spans five and uses
 * one — so only a large gap is worth mentioning. The app says something rather
 * than overriding the clock, because guessing a timezone from coordinates
 * needs a dataset this app has no business shipping, and being quietly wrong
 * about prayer times is worse than asking.
 */
export function timezoneLooksWrong(coords: LatLon, now: Date): boolean {
  const deviceOffsetHours = -now.getTimezoneOffset() / 60;
  const solarOffsetHours = coords.longitude / 15;
  return Math.abs(deviceOffsetHours - solarOffsetHours) > 4;
}

export function formatTime(time: Date): string {
  return time.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/** "in 47 min" / "in 3 hr 12 min" — deliberately not a ticking second counter. */
export function formatCountdown(ms: number): string {
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `in ${minutes} min`;
  if (minutes === 0) return `in ${hours} hr`;
  return `in ${hours} hr ${minutes} min`;
}
