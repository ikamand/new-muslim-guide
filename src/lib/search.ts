import type { Href } from 'expo-router';

/*
  Imported from the modules themselves rather than the `@/content` barrel. The
  barrel reaches `audio.ts`, whose `require` calls only Metro can resolve — so
  going through it would make this module impossible to exercise outside a
  running app, and a search index nobody can test is one nobody can trust.
*/
import { CATALOG } from '@/content/catalog';
import { getGuide } from '@/content/guides';
import { getReference } from '@/content/references';
import { HISN } from '@/content/duas/hisn';
import { localiseCatalogEntry, localiseGuide, localiseReference } from '@/i18n/localise';
import type { Locale } from '@/i18n/locales';
import { routeFor } from '@/lib/content-routes';

/**
 * Everything in the app, searchable, offline.
 *
 * ## Why this is not a filter over the catalogue
 *
 * The catalogue is 78 entries — the names of pages. The *answers* live one
 * level below that: 286 prayer and wudu steps, and 101 sections of the
 * reference pages. Someone typing "wind" wants the sentence in `wudu.ts`
 * saying that anything leaving you from the front or the back ends your wudu.
 * A search over page names can only ever hand them "Wudu — 10 steps" and let
 * them hunt, which is a signpost rather than an answer.
 *
 * So a step and a section are first-class results here, and they outrank the
 * page that contains them.
 *
 * ## Why not the four APIs
 *
 * Their output is already here. `evidence.ts` and `juz30.ts` were generated
 * from QuranEnc and the hadith corpus at build time; searching them at runtime
 * would add only the part the app has NOT reviewed — roughly 2,600 further
 * narrations, stripped of the ruling each belongs under. Authenticity is not
 * evidence for a particular question, and a raw narration handed to somebody
 * three weeks into Islam under a search box is the worst version of this app.
 * It would also end the offline promise for the one screen most likely to be
 * opened at 1am with no signal.
 *
 * ## What is not in here yet
 *
 * The 564 juz 30 ayahs and the 116 evidence texts. Deliberate: 564 ayahs
 * matching "Lord" would drown every other result, so they need grouping before
 * they need indexing.
 */

/** How the row describes itself, and how highly it ranks. */
type Field = 'title' | 'description' | 'body';

const WEIGHT: Record<Field, number> = {
  /* A thing named for what you typed is almost always what you meant. */
  title: 100,
  /* A one-line summary is written to be scanned, so a hit here is meaningful. */
  description: 60,
  /* Prose. A hit is real but incidental far more often. */
  body: 40,
};

export type SearchResult = {
  key: string;
  /** The matched thing's own name — a step title, a section heading. */
  title: string;
  /** The line underneath: the sentence that answers, where there is one. */
  snippet: string;
  /** "Guide", "Step in Wudu", "Duʿa" — what kind of thing this is. */
  context: string;
  href: Href;
  score: number;
};

type Indexed = Omit<SearchResult, 'score'> & {
  /**
   * `text` is folded and matched against; `raw` is the same content unfolded,
   * kept so a result can show the sentence that actually matched.
   *
   * Offsets cannot be shared between them — folding runs NFD and drops
   * combining marks, so the two strings have different lengths and a position
   * in one means nothing in the other. The snippet is found by re-searching
   * `raw` a sentence at a time instead, which is exact and costs nothing at
   * forty results.
   */
  fields: readonly { field: Field; text: string; raw: string }[];
};

/** Case and accent folded, so "wudu" finds "wuḍūʾ" and "Salah" finds "salah". */
export function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/**
 * Score one entry against one already-folded term, or 0 for no match.
 *
 * Deliberately simple and explainable rather than clever: the best field that
 * matched decides the band, and two bonuses separate rows inside it. A whole
 * word beats a fragment, because "wind" inside "windowsill" is not what anybody
 * meant — the tayammum step mentioning a dusty windowsill is a real hit for
 * "wind" and should never sit above the step about breaking wudu. A hit at the
 * start beats one in the middle, because titles lead with their subject.
 */
function scoreTerm(entry: Indexed, term: string): number {
  let best = 0;
  for (const { field, text } of entry.fields) {
    const at = text.indexOf(term);
    if (at === -1) continue;

    let points = WEIGHT[field];
    const before = at === 0 ? ' ' : text[at - 1];
    const after = text[at + term.length] ?? ' ';
    if (!/[a-z0-9]/.test(before) && !/[a-z0-9]/.test(after)) points += 25;
    if (at === 0) points += 15;

    best = Math.max(best, points);
  }
  return best;
}

/**
 * Every term has to appear somewhere, and the scores add up.
 *
 * Matching the whole query as one contiguous string is what a filter does, and
 * it fails the way people actually type: "what breaks wudu" is not a substring
 * of anything, so it returned nothing at all while the app held a step whose
 * note answers it outright. Requiring all terms and summing means a row
 * matching both "breaks" and "wudu" beats one matching only "wudu".
 *
 * Words under three characters are dropped unless that is the whole query, so
 * "is" and "a" in a typed question do not decide the ranking.
 */
function scoreQuery(entry: Indexed, terms: readonly string[]): number {
  let total = 0;
  for (const term of terms) {
    const points = scoreTerm(entry, term);
    if (points === 0) return 0;
    total += points;
  }
  return total;
}

/** One sentence of prose, for the line under a result. */
function firstSentence(body: string): string {
  const clean = body.replace(/\*\*/g, '').trim();
  const stop = clean.search(/[.!?]\s/);
  return stop === -1 || stop > 160 ? clean.slice(0, 160) : clean.slice(0, stop + 1);
}

/**
 * The whole index, built once per locale.
 *
 * Driven off `CATALOG` rather than importing every content file, so a new
 * guide or reference is searchable the moment it is in the catalogue and
 * nothing has to be remembered here.
 */
export function buildIndex(locale: Locale, label: (kind: string) => string): readonly Indexed[] {
  const index: Indexed[] = [];

  for (const raw of CATALOG) {
    const entry = localiseCatalogEntry(raw, locale);
    index.push({
      key: `${entry.kind}:${entry.id}`,
      title: entry.title,
      snippet: entry.shortDescription,
      context: label(entry.kind),
      href: routeFor(entry),
      fields: [
        { field: 'title', text: fold(entry.title), raw: entry.title },
        { field: 'description', text: fold(entry.shortDescription), raw: entry.shortDescription },
      ],
    });

    /*
      Steps. The guide is re-fetched rather than carried on the catalogue entry
      because the catalogue is a summary by design — it holds counts, not
      contents.
    */
    if (entry.kind === 'guide') {
      const source = getGuide(entry.id);
      if (!source) continue;
      const guide = localiseGuide(source, locale);
      for (const step of guide.steps) {
        const said = step.says ? `${step.says.transliteration} ${step.says.translation}` : '';
        /*
          The structured notes, not just the plain `note` string.

          This is where the answers to the questions people actually ask turned
          out to live. "What certainly breaks it: … using the toilet or passing
          wind" is a `notes` entry on the wudu step, so "passing wind" returned
          nothing at all until this line existed — the app knew the answer and
          could not be asked for it.
        */
        const noted = (step.notes ?? []).map((n) => `${n.text} ${n.additionalExplanation ?? ''}`).join(' ');
        index.push({
          key: `step:${guide.id}:${step.id}`,
          title: step.title,
          snippet: firstSentence(step.instruction),
          context: `${label('step')} ${guide.title}`,
          /* Opens AT the step, not at step one. Without this a result is
             still only a signpost. */
          href: { pathname: '/guide/[id]', params: { id: guide.id, step: step.id } },
          fields: [
            { field: 'title', text: fold(step.title), raw: step.title },
            {
              field: 'body',
              text: fold(`${step.instruction} ${step.note ?? ''} ${noted} ${said}`),
              raw: `${step.instruction} ${step.note ?? ''} ${noted}`,
            },
          ],
        });
      }
    }

    if (entry.kind === 'reference') {
      const source = getReference(entry.id);
      if (!source) continue;
      const reference = localiseReference(source, locale);
      for (const section of reference.sections) {
        const bullets = (section.bullets ?? []).join(' ');
        const noted = (section.notes ?? []).map((n) => `${n.text} ${n.additionalExplanation ?? ''}`).join(' ');
        index.push({
          key: `section:${reference.id}:${section.id}`,
          title: section.heading,
          snippet: firstSentence(section.body || bullets),
          context: `${label('section')} ${reference.title}`,
          /* No section anchor yet — the reference screen renders one scrolling
             article. The heading and sentence are on the result, so a reader
             knows what they are looking for when they land. */
          href: { pathname: '/reference/[id]', params: { id: reference.id } },
          fields: [
            { field: 'title', text: fold(section.heading), raw: section.heading },
            {
              field: 'body',
              text: fold(`${section.body} ${bullets} ${noted}`),
              raw: `${section.body} ${bullets} ${noted}`,
            },
          ],
        });
      }
    }
  }

  /*
    The duʿa book. 132 occasions the catalogue does not carry — it holds only
    the 9 duʿas woven into guides. The Arabic is indexed and never displayed on
    a Latin rung; Amiri is the only face this app sets Arabic in.
  */
  for (const occasion of HISN) {
    index.push({
      key: `hisn:${occasion.id}`,
      title: occasion.english,
      snippet: '',
      context: label('dua'),
      href: { pathname: '/dua-book/[id]', params: { id: String(occasion.id) } },
      fields: [
        { field: 'title', text: fold(occasion.english), raw: occasion.english },
        /* Arabic is searchable and never shown here — the description line is a
           Latin rung, and Amiri is the only face this app sets Arabic in. */
        { field: 'body', text: fold(occasion.arabic), raw: '' },
      ],
    });
  }

  return index;
}

/**
 * The sentence that actually matched, for the line under a result.
 *
 * Without this a search for "passing wind" returned the wudu step whose notes
 * answer it and showed "Intend in your heart that you are performing wudu" —
 * a correct hit wearing an unrelated sentence, which reads as a wrong result.
 */
function matchedSentence(entry: Indexed, terms: readonly string[]): string | undefined {
  for (const { field, raw } of entry.fields) {
    if (field !== 'body' || !raw) continue;
    for (const sentence of raw.split(/(?<=[.!?])\s+/)) {
      const folded = fold(sentence);
      if (terms.every((term) => folded.includes(term))) return firstSentence(sentence);
    }
  }
  return undefined;
}

/** Ranked results for a query. Empty for a query nothing matches. */
export function search(
  index: readonly Indexed[],
  query: string,
  limit = 40,
): readonly SearchResult[] {
  const all = fold(query.trim()).split(/\s+/).filter(Boolean);
  if (all.length === 0) return [];
  const meaningful = all.filter((term) => term.length >= 3);
  const terms = meaningful.length > 0 ? meaningful : all;

  const hits: SearchResult[] = [];
  for (const entry of index) {
    const points = scoreQuery(entry, terms);
    if (points > 0) {
      hits.push({ ...entry, score: points, snippet: matchedSentence(entry, terms) ?? entry.snippet });
    }
  }

  /*
    Score, then shorter title. A tie between "Wudu" and "What breaks your wudu"
    should lead with the shorter one: it is the more general answer, and the
    longer sits directly under it where it reads as a refinement.
  */
  return hits
    .sort((a, b) => b.score - a.score || a.title.length - b.title.length)
    .slice(0, limit);
}
