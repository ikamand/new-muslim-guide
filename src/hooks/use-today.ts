import type { Href } from 'expo-router';
import { useEffect, useMemo } from 'react';

import { resolveRef } from '@/content';
import { FIRSTS } from '@/content/firsts';
import { arcFor } from '@/content/ramadan-arc';
import { seasonFor } from '@/content/seasons';
import { useHijriToday } from '@/hooks/use-hijri';
import { useJourney } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useReadingInProgress } from '@/hooks/use-reading';
import { useSettings } from '@/hooks/use-settings';
import { localiseCatalogEntry } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';
import { isAwayFromHome, nextPlaceState } from '@/lib/home-place';

/**
 * The one thing worth today, and never more than one.
 *
 * ## What changed, and why it needed to
 *
 * This returned a season and nothing else, on a good test — **does it have a
 * deadline?** A prayer time does. Ramadan does. "You might like this lesson"
 * does not. The test was right and it was applied to one candidate: the
 * calendar. Everything else with a deadline went unasked.
 *
 * Meanwhile Today carried a permanent journey card that failed that very test,
 * sitting above the prayer times every day of the year whether or not there
 * was anything to continue. So the screen showed the one thing with no
 * deadline and hid several things that had one.
 *
 * Now every candidate is asked the same question and exactly one wins. The
 * lesson is still here — it is simply last, which is what "no deadline" earns
 * it, and it is no longer permanent.
 *
 * ## Ranked by how soon it stops being true
 *
 * Travelling first, because it is the only one that is about where the reader
 * IS rather than what day it is, and it is wrong to bury. Then the calendar
 * window, then the weekday, then the part of the night — each of them true for
 * a shorter span than the one before. The lesson last, because it will keep.
 *
 * ## What is deliberately NOT a candidate
 *
 * **A voluntary fast.** `docs/build-order.md` lists it and `seasons.ts` had
 * already ruled it out for a good reason: the Hijri date comes from the Umm
 * al-Qura calculation, months actually begin by local moon sighting, and the
 * two differ often enough that a beginner would be told to fast on the wrong
 * day. Every window in `seasons.ts` is at least nine days long on purpose.
 * ʿĀshūrāʾ and the six of Shawwāl are single dates, so the app cannot name
 * them from this calculation, and a wrong one is worse than none.
 *
 * **Friday.** `docs/build-order.md` lists it as a recurring deadline nothing
 * surfaces, and that turned out to be wrong: `prayer-times-card.tsx` has a
 * `JumuahNote` that already says "It is Friday" and explains what the dot on
 * Ḏuhr means. A candidate here put the same three words on the same screen
 * twice, which is how it looked when rendered. The prayer card also owns it
 * better — it is attached to the prayer it concerns, and it deliberately does
 * not relabel Ḏuhr as Jumuʿah, because a man who cannot reach a mosque and a
 * woman who does not attend both pray Ḏuhr.
 * ⚠️ Worth revisiting when Phase 11 writes the Jumuʿah page. Pointing at
 * `reference:mosque` was the best available target and a poor one; pointing at
 * a real page about what happens in the first ten minutes would earn the slot.
 *
 * **Whether you have prayed witr yet.** The app does not know and must not
 * guess. `index.tsx:43` promises it never notices an absence. What it may say
 * is what the CLOCK is doing — that the last third of the night has begun —
 * which is a fact about the sky rather than about the reader.
 */

export type TodayItem = {
  key: string;
  /** Why this is here, said in a few words. Never a bare card. */
  reason: UIKey;
  title: string;
  description?: string;
  minutes?: number;
  href: Href;
};

export function useToday(): TodayItem | undefined {
  const { locale, t } = useLocale();
  const hijri = useHijriToday();
  const { next } = useJourney();
  const { coords } = useLocation();
  const { today } = usePrayerTimes();
  const { home, awaySince, setMany } = useSettings();
  const { firsts } = useObservations();
  const reading = useReadingInProgress();

  /*
    Home follows a long stay, never the last fix. Written from an effect
    because it is a side effect of being somewhere, not something a render
    should compute — and `nextPlaceState` returns undefined on almost every
    call, so almost every render writes nothing.
  */
  useEffect(() => {
    const update = nextPlaceState({ home, awaySince }, coords, Date.now());
    if (update) setMany(update);
  }, [home, awaySince, coords, setMany]);

  return useMemo(() => {
    const now = new Date();

    /* 1. Away from home. About where the reader is, not what day it is. */
    if (isAwayFromHome(home, coords)) {
      const travelling = resolveRef({ kind: 'reference', id: 'travelling' });
      if (travelling) {
        const entry = localiseCatalogEntry(travelling, locale);
        return {
          key: 'reference:travelling',
          reason: 'today.away',
          title: entry.title,
          description: entry.shortDescription,
          minutes: entry.meta?.estimatedMinutes,
          href: routeFor(travelling),
        };
      }
    }

    /*
      2. The Ramadan arc — the season broken into moments.

      `ramadan-arc.ts` owns months 8 and 9: the fast in the first days,
      tarāwīḥ in the evenings, the zakat calculator mid-month (the standing
      month-9 zakat candidate moved there, reasoning and all), the last ten
      nights, then Eid across the month boundary. Asked before `seasonFor`,
      so the season's own Ramadan rows never fire; the season table keeps
      Dhul Hijjah and Muharram.
    */
    const arc = hijri ? arcFor(hijri, now.getHours()) : undefined;
    if (arc) {
      if (!arc.ref) {
        return {
          key: 'screen:zakat',
          reason: arc.reason,
          title: t('zakat.title'),
          description: t('today.zakat.why'),
          href: '/zakat',
        };
      }
      const found = resolveRef(arc.ref);
      if (found) {
        const entry = localiseCatalogEntry(found, locale);
        return {
          key: `arc:${arc.id}`,
          reason: arc.reason,
          title: entry.title,
          description: entry.shortDescription,
          minutes: entry.meta?.estimatedMinutes,
          href: routeFor(found),
        };
      }
    }

    /* 3. The calendar window — Dhul Hijjah, Muharram (Ramadan is the arc's). */
    const season = hijri ? seasonFor(hijri) : undefined;
    if (season) {
      const found = resolveRef(season.ref);
      if (found) {
        const entry = localiseCatalogEntry(found, locale);
        const key = `${entry.kind}:${entry.id}`;
        const reason = `season.${season.id}` as UIKey;
        return {
          key,
          reason,
          title: entry.title,
          description: entry.shortDescription,
          minutes: entry.meta?.estimatedMinutes,
          href: routeFor(found),
        };
      }
    }

    /*
      3. A first the app can tell the DAY of, but not the answer to.

      "It is Friday tomorrow. Was that your first Jumuʿah?" — asked on the
      Thursday, so the question arrives while the answer is still ahead rather
      than after the fact. Offered once and then never again, because
      `recordFirst` refuses to move a date and an unmarked first is not a
      failing to be chased.

      A WEEKDAY only, never a Hijri date. `content/firsts.ts` says why Ramadan
      and Eid are `quiet` instead: months begin by local moon sighting and the
      calculation differs often enough that asking on the wrong day is worse
      than not asking.
    */
    const offer = FIRSTS.find(
      (first) =>
        first.trigger === 'offered' &&
        first.askOnWeekday === now.getDay() &&
        !firsts[first.id],
    );
    if (offer) {
      return {
        key: `first:${offer.id}`,
        reason: 'today.firstAsk',
        title: t(`first.${offer.id}` as UIKey),
        description: t('firsts.ask'),
        href: '/firsts',
      };
    }

    /*
      4. The last third of the night has begun.

      Computed from the day's own boundaries rather than a clock hour: the
      span from ʿIshāʾ to Fajr, split in three. A fact about the sky, and the
      only thing the app can honestly say about the night — whether anybody has
      prayed witr yet is not its business.
    */
    const isha = today?.prayers.find((prayer) => prayer.id === 'isha')?.time;
    const fajr = today?.prayers.find((prayer) => prayer.id === 'fajr')?.time;
    if (isha && fajr) {
      /*
        The night that is happening NOW, which at 3am is last night's.

        `today.prayers` holds one day's boundaries, so tonight's ʿIshāʾ and
        this morning's Fajr — and a night spans the two. The first version
        built the span from those two directly and at 03:17 computed the night
        that has not started yet, so the window silently never opened in the
        small hours, which is the only time it exists. A DAY is not a night.

        Before Fajr, the night began with yesterday's ʿIshāʾ; after ʿIshāʾ, it
        ends at tomorrow's Fajr. Shifting the other boundary by a day is
        accurate to a minute or two, which is far inside the precision of "the
        last third".
      */
      const DAY_MS = 24 * 60 * 60 * 1000;
      const span =
        now < fajr
          ? { from: new Date(isha.getTime() - DAY_MS), to: fajr }
          : now >= isha
            ? { from: isha, to: new Date(fajr.getTime() + DAY_MS) }
            : undefined;

      if (span) {
        const lastThird = new Date(
          span.from.getTime() + ((span.to.getTime() - span.from.getTime()) * 2) / 3,
        );
        if (now >= lastThird && now < span.to) {
          const tahajjud = resolveRef({ kind: 'guide', id: 'tahajjud' });
          if (tahajjud) {
            const entry = localiseCatalogEntry(tahajjud, locale);
            return {
              key: 'guide:tahajjud',
              reason: 'today.lastThird',
              title: entry.title,
              description: entry.shortDescription,
              href: routeFor(tahajjud),
            };
          }
        }
      }
    }

    /*
      5. Something left half-read. Ahead of the journey's next lesson because
      a book somebody is midway through beats one they have not opened — and
      this is the slot that is allowed to notice what they were doing, so the
      library on Learn never has to move a card to say it.
    */
    if (reading) {
      return {
        key: reading.key,
        reason: 'today.reading',
        title: reading.entry.title,
        description: reading.entry.shortDescription,
        minutes: reading.entry.meta?.estimatedMinutes,
        href: routeFor(reading.entry),
      };
    }

    /*
      6. The lesson. Last, because it has no deadline — which is exactly why it
      should never have been a permanent card above the prayer times.
    */
    if (next) {
      return {
        key: next.key,
        reason: 'today.continue',
        title: next.labelKey ? next.entry.title : next.entry.title,
        description: next.entry.shortDescription,
        minutes: next.entry.meta?.estimatedMinutes,
        href: routeFor(next.entry),
      };
    }

    return undefined;
  }, [hijri, next, reading, locale, coords, home, today, firsts, t]);
}
