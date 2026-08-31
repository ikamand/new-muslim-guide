import {
  CalculationMethod,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PolarCircleResolution,
  PrayerTimes,
  Qibla,
  SunnahTimes,
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
 * Every convention someone can choose by name, keyed by id.
 *
 * The regional boxes below point into this; the settings picker lists it.
 * One catalogue rather than two lists, so a method cannot exist as a choice
 * without existing as an inference target and vice versa. Moonsighting
 * Committee is the one entry no box maps to — it is chosen, not inferred,
 * because its followers are communities scattered across regions whose
 * mosques mostly print something else.
 */
export const METHODS: Record<string, MethodProfile> = {
  'muslim-world-league': {
    id: 'muslim-world-league',
    label: 'Muslim World League',
    build: CalculationMethod.MuslimWorldLeague,
  },
  'umm-al-qura': { id: 'umm-al-qura', label: 'Umm al-Qura', build: CalculationMethod.UmmAlQura },
  dubai: { id: 'dubai', label: 'Dubai', build: CalculationMethod.Dubai },
  qatar: { id: 'qatar', label: 'Qatar', build: CalculationMethod.Qatar },
  kuwait: { id: 'kuwait', label: 'Kuwait', build: CalculationMethod.Kuwait },
  tehran: { id: 'tehran', label: 'Tehran', build: CalculationMethod.Tehran },
  turkey: { id: 'turkey', label: 'Diyanet', build: CalculationMethod.Turkey },
  egyptian: {
    id: 'egyptian',
    label: 'Egyptian General Authority',
    build: CalculationMethod.Egyptian,
  },
  karachi: {
    id: 'karachi',
    label: 'Karachi',
    build: () => withMadhab(CalculationMethod.Karachi(), Madhab.Hanafi),
  },
  singapore: { id: 'singapore', label: 'Singapore (MUIS)', build: CalculationMethod.Singapore },
  'north-america': { id: 'north-america', label: 'ISNA', build: CalculationMethod.NorthAmerica },
  moonsighting: {
    id: 'moonsighting',
    label: 'Moonsighting Committee',
    build: CalculationMethod.MoonsightingCommittee,
  },
};

/**
 * ⚠️ REVIEW REQUIRED — these regional boxes and the method each maps to were
 * written by a model. They are deliberately coarse: a box only has to be right
 * about which convention the mosques in it print.
 *
 * ORDER IS SIGNIFICANT. `inferProfile` takes the first box that contains the
 * point, so a narrow region has to come before the wide one that overlaps it.
 *
 * TWO WRONG MAPPINGS WERE FOUND AND REMOVED rather than replaced, because the
 * honest fix for "this box claims somewhere it should not" is to stop claiming
 * it and let the point fall through to the Muslim World League default:
 *
 *   - The Levant sat inside the Saudi box, so Amman and Jerusalem were served
 *     Umm al-Qura — whose Isha is not an angle at all but a fixed ninety
 *     minutes after Maghrib. That is a Saudi convention and nowhere else
 *     prints it. A Levant box now sits ahead of Saudi Arabia and routes to the
 *     default. It costs the far north-west corner of Saudi Arabia, which is
 *     close to empty; it fixes several million people's Isha.
 *   - Iraq sat inside the Iran box, so Baghdad was served Tehran — which puts
 *     Isha at 14° and, more consequentially, does not treat Maghrib as sunset:
 *     it waits for the sun to reach 4.5° below the horizon. For a Sunni user
 *     that is the wrong Maghrib and, in Ramadan, the wrong iftar by a quarter
 *     of an hour. The Iran box now starts at 46°E, east of the Iraqi border.
 */
const REGIONS: { box: Box; profile: MethodProfile }[] = [
  {
    // Jordan, Palestine, Lebanon and southern Syria. No box of its own in the
    // sense the others have one — it exists to keep this region OUT of the
    // Saudi box below, and routes to the same default as anywhere unmapped.
    box: { minLat: 29, maxLat: 34.7, minLon: 34, maxLon: 39.5 },
    profile: METHODS['muslim-world-league'],
  },
  {
    // Saudi Arabia
    box: { minLat: 16, maxLat: 32.5, minLon: 34, maxLon: 56 },
    profile: METHODS['umm-al-qura'],
  },
  {
    // United Arab Emirates
    box: { minLat: 22, maxLat: 26.5, minLon: 51, maxLon: 56.5 },
    profile: METHODS.dubai,
  },
  {
    box: { minLat: 24.4, maxLat: 26.2, minLon: 50.7, maxLon: 51.7 },
    profile: METHODS.qatar,
  },
  {
    box: { minLat: 28.5, maxLat: 30.1, minLon: 46.5, maxLon: 48.5 },
    profile: METHODS.kuwait,
  },
  {
    box: { minLat: 25, maxLat: 40, minLon: 46, maxLon: 63.5 },
    profile: METHODS.tehran,
  },
  {
    box: { minLat: 35.8, maxLat: 42.2, minLon: 25.5, maxLon: 45 },
    profile: METHODS.turkey,
  },
  {
    box: { minLat: 21.5, maxLat: 33.5, minLon: 24, maxLon: 37 },
    profile: METHODS.egyptian,
  },
  {
    box: { minLat: 5, maxLat: 38, minLon: 60, maxLon: 93 },
    profile: METHODS.karachi,
  },
  {
    box: { minLat: -11, maxLat: 8, minLon: 95, maxLon: 141 },
    profile: METHODS.singapore,
  },
  {
    box: { minLat: 14, maxLat: 72, minLon: -170, maxLon: -52 },
    profile: METHODS['north-america'],
  },
];

/** Where most of the world lands, and a sane default anywhere unmapped. */
const DEFAULT_PROFILE: MethodProfile = METHODS['muslim-world-league'];

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

/** What the user chose about the times, or null to let the app decide. */
export type MethodChoice = {
  /** A key of `METHODS`, or null for the location-inferred convention. */
  methodId: string | null;
  /** Explicit ʿAsr school, or null for whatever the method bundles. */
  hanafiAsr: boolean | null;
};

/**
 * The ONE place a profile is decided. The card, the monthly jadwal and the
 * reminder scheduler all resolve through here, because a reminder firing at
 * the computed time while the screen shows another is the worst bug this
 * feature could have.
 *
 * The ʿAsr override wraps `build` rather than widening `computeDay`'s
 * signature: everything downstream keeps taking a `MethodProfile`, and a
 * profile that carries its own madhab (Karachi bundles Hanafi) is simply
 * overridden last.
 */
export function resolveProfile(coords: LatLon, choice?: MethodChoice): MethodProfile {
  const base = (choice?.methodId && METHODS[choice.methodId]) || inferProfile(coords);
  if (choice?.hanafiAsr === null || choice?.hanafiAsr === undefined) return base;
  return {
    ...base,
    build: () => withMadhab(base.build(), choice.hanafiAsr ? Madhab.Hanafi : Madhab.Shafi),
  };
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
  /**
   * Halfway between sunset and the next Fajr — the "middle of the night" in
   * the fiqh sense, not 00:00 on a clock. The windows sheet uses it as the
   * end of ʿIshāʾ's preferred time.
   */
  middleOfNight: Date;
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
    middleOfNight: new SunnahTimes(times).middleOfTheNight,
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

/**
 * When `id`'s window closes, within its own day's times.
 *
 * Fajr ends at sunrise; Dhuhr, ʿAsr and Maghrib each end when the next prayer
 * enters; ʿIshāʾ ends at the middle of the night in the fiqh sense. This is
 * the one statement of those ends — the windows sheet and Today's pray button
 * both read it, so what the sheet prints and when the button shows can never
 * disagree.
 *
 * ⚠️ The ends are rulings, not astronomy — see the review note on
 * `WindowsSheet` in `prayer-times-card.tsx`, which this mapping was lifted
 * from verbatim.
 */
export function windowEnd(day: DayTimes, id: PrayerId): Date {
  const at = (prayerId: PrayerId) => day.prayers.find((prayer) => prayer.id === prayerId)!.time;
  switch (id) {
    case 'fajr':
      return day.sunrise;
    case 'dhuhr':
      return at('asr');
    case 'asr':
      return at('maghrib');
    case 'maghrib':
      return at('isha');
    case 'isha':
      return day.middleOfNight;
  }
}

export type CurrentPrayer = PrayerTime & {
  /** When this prayer's window closes. */
  windowEnds: Date;
};

/**
 * The prayer whose window is open at `now`, or null between windows.
 *
 * Null is a real answer, not a failure: after sunrise nothing is due until
 * Dhuhr, and after the middle of the night nothing is due until Fajr. Today's
 * pray button hides in those spans, because "Pray Dhuhr" on screen at 11am is
 * an instruction to pray a prayer whose time has not entered — invalid, and
 * exactly the kind of thing a convert would follow literally.
 *
 * Yesterday is scanned as well as today because ʿIshāʾ's window crosses
 * midnight: at 00:30 the open window belongs to *yesterday's* ʿIshāʾ, whose
 * middle-of-night lands in the small hours of today. Two days are enough — a
 * window that contains `now` cannot have started earlier than yesterday's
 * ʿIshāʾ. If a desynced clock puts `now` outside both days, no window matches
 * and the button simply hides, which is the safe failure.
 */
export function findCurrentPrayer(
  coords: LatLon,
  now: Date,
  profile: MethodProfile,
): CurrentPrayer | null {
  for (const offset of [-1, 0]) {
    const day = computeDay(coords, localDay(now, offset), profile);
    for (const prayer of day.prayers) {
      const ends = windowEnd(day, prayer.id);
      if (now.getTime() >= prayer.time.getTime() && now.getTime() < ends.getTime()) {
        return { ...prayer, windowEnds: ends };
      }
    }
  }
  return null;
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
