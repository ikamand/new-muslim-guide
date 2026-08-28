import type { Href } from 'expo-router';

/*
  Imported from the modules themselves rather than the `@/content` barrel. The
  barrel reaches `audio.ts`, whose `require` calls only Metro can resolve — so
  going through it would make this module impossible to exercise outside a
  running app, and a search index nobody can test is one nobody can trust.
*/
import { CATALOG } from '@/content/catalog';
import { getCollection } from '@/content/collections';
import { getGuide } from '@/content/guides';
import { getReference } from '@/content/references';
import { HISN } from '@/content/duas/hisn';
import { localiseCatalogEntry, localiseGuide, localiseReference } from '@/i18n/localise';
import type { Locale } from '@/i18n/locales';
import { routeFor } from '@/lib/content-routes';
import { expand, STOPWORDS, transliterationKey } from '@/lib/search-words';

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
  fields: readonly { field: Field; text: string; raw: string; loose: string }[];
};

/** Case and accent folded, so "wudu" finds "wuḍūʾ" and "Salah" finds "salah". */
/** Every word of a string put through `transliterationKey`. */
function loosen(value: string): string {
  return fold(value)
    /*
      The ʿayn and hamza marks are dropped, not treated as word breaks. As
      separators they split "rakʿah" into "rak" and "ah", and "rakaah" then
      matched neither half — the mark is transliteration furniture, and the
      reader typing the word has almost certainly left it out.
    */
    .replace(/[\u02bf\u02be'’`ʻʼ]/g, '')
    .split(/[^a-z0-9]+/)
    .map(transliterationKey)
    .filter(Boolean)
    .join(' ');
}

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
function startsWord(text: string, term: string): boolean {
  let at = text.indexOf(term);
  while (at !== -1) {
    if (at === 0 || !/[a-z0-9]/.test(text[at - 1])) return true;
    at = text.indexOf(term, at + 1);
  }
  return false;
}

function scoreTerm(entry: Indexed, term: string, key: string): number {
  let best = 0;
  for (const { field, text } of entry.fields) {
    /*
      A term has to start a word. Bare substring matching was the single
      largest source of wrong answers: "ate" matched inside "prostrate" and
      put a step of the Fajr prayer at the top of "what do i say before
      eating", and "sin" matches inside "rising".

      Word START rather than whole word, so "pray" still finds "prayer" and
      "travel" finds "travelling" — a reader typing the stem of a word means
      the word, and demanding an exact match would lose far more than it saves.
    */
    let at = text.indexOf(term);
    while (at !== -1) {
      const before = at === 0 ? ' ' : text[at - 1];
      if (!/[a-z0-9]/.test(before)) {
        let points = WEIGHT[field];
        const after = text[at + term.length] ?? ' ';
        if (!/[a-z0-9]/.test(after)) points += 25;
        if (at === 0) points += 15;
        best = Math.max(best, points);
        break;
      }
      at = text.indexOf(term, at + 1);
    }
  }
  if (best > 0) return best;

  /*
    Nothing matched as typed. Try the transliteration key — "shahadah" against
    the app's "shahada" — at three quarters, so a page that spells the word the
    way this reader does always sits above one that does not.
  */
  if (!key) return 0;
  for (const { field, loose } of entry.fields) {
    if (startsWord(loose, key)) best = Math.max(best, Math.round(WEIGHT[field] * 0.75));
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
function scoreQuery(entry: Indexed, terms: readonly (readonly string[])[]): number {
  let total = 0;
  for (const variants of terms) {
    /*
      Any spelling of the word counts, and the best one scores. "Farted" and
      "wind" are the same question; the app happens to have written one of
      them. A synonym scores exactly as the word itself would, because a reader
      who used the everyday word is not asking a vaguer question than one who
      happened to know the app's.
    */
    let best = 0;
    for (const variant of variants) {
      best = Math.max(best, scoreTerm(entry, variant, transliterationKey(variant)));
    }
    if (best === 0) return 0;
    total += best;
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
        { field: 'title', text: fold(entry.title), raw: entry.title, loose: loosen(entry.title) },
        {
          field: 'description',
          text: fold(entry.shortDescription),
          raw: entry.shortDescription,
          loose: loosen(entry.shortDescription),
        },
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
            { field: 'title', text: fold(step.title), raw: step.title, loose: loosen(step.title) },
            {
              field: 'body',
              text: fold(`${step.instruction} ${step.note ?? ''} ${noted} ${said}`),
              raw: `${step.instruction} ${step.note ?? ''} ${noted}`,
              loose: loosen(`${step.instruction} ${step.note ?? ''} ${noted} ${said}`),
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
            { field: 'title', text: fold(section.heading), raw: section.heading, loose: loosen(section.heading) },
            {
              field: 'body',
              text: fold(`${section.body} ${bullets} ${noted}`),
              raw: `${section.body} ${bullets} ${noted}`,
              loose: loosen(`${section.body} ${bullets} ${noted}`),
            },
          ],
        });
      }
    }

    /*
      A collection's entries, so the set is findable by what is IN it.

      Indexed here rather than left to the collection's own title, because a
      collection whose 99 entries cannot be searched is a shelf with a label
      and no way in — someone looking for "Ar-Raḥmān" does not know it lives
      under "The names of Allah". The Arabic is searchable and never rendered
      on this Latin rung, the same rule the duʿa book follows below.

      No branch on WHICH collection: every one is indexed the same way, which
      is the claim `types.ts` makes about this kind.
    */
    if (entry.kind === 'collection') {
      const collection = getCollection(entry.id);
      if (!collection) continue;
      for (const item of collection.entries) {
        const body = `${item.translation} ${item.note ?? ''} ${item.transliteration ?? ''}`;
        index.push({
          key: `collection:${collection.id}:${item.id}`,
          title: item.title,
          snippet: firstSentence(item.translation),
          context: `${label('section')} ${collection.title}`,
          href: { pathname: '/collection/[id]', params: { id: collection.id } },
          fields: [
            { field: 'title', text: fold(item.title), raw: item.title, loose: loosen(item.title) },
            { field: 'body', text: fold(body), raw: body, loose: loosen(body) },
            { field: 'body', text: fold(item.arabic ?? ''), raw: '', loose: '' },
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
        { field: 'title', text: fold(occasion.english), raw: occasion.english, loose: loosen(occasion.english) },
        /* Arabic is searchable and never shown here — the description line is a
           Latin rung, and Amiri is the only face this app sets Arabic in. */
        { field: 'body', text: fold(occasion.arabic), raw: '', loose: '' },
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
function matchedSentence(
  entry: Indexed,
  terms: readonly (readonly string[])[],
): string | undefined {
  for (const { field, raw } of entry.fields) {
    if (field !== 'body' || !raw) continue;
    for (const sentence of raw.split(/(?<=[.!?])\s+/)) {
      const folded = fold(sentence);
      if (terms.every((variants) => variants.some((v) => folded.includes(v)))) {
        return firstSentence(sentence);
      }
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
  /*
    Typed words become groups of acceptable spellings, in three passes.

    Question words go first: they are the most common words in a typed question
    and the least informative, and leaving them in made "how do i decide" score
    every section whose heading starts with "How". Then anything under three
    characters. Then each survivor becomes itself plus its synonyms.

    Each filter is skipped if it would empty the query, because refusing to
    search is worse than searching badly.
  */
  const all = fold(query.trim()).split(/\s+/).filter(Boolean);
  if (all.length === 0) return [];

  const content = all.filter((term) => !STOPWORDS.has(term));
  const kept = content.length > 0 ? content : all;
  const long = kept.filter((term) => term.length >= 3);
  const terms = (long.length > 0 ? long : kept).map(expand);

  /*
    Every term has to appear — until that finds nothing at all, when the
    longest term tries on its own.

    "Fasting rules" returned nothing because "rules" appears nowhere, and a
    reader is not told which of their words the app failed on. Something
    relevant beats a blank screen; a blank screen reads as "Islam has no
    answer for this", which is the worst thing this app could say to somebody
    three weeks in.

    Longest first, but every term gets a turn. Taking only the longest assumed
    the longest word was the most meaningful, and "my mum is upset" then
    searched for "upset" — which is in no page — and gave up, while "mum"
    would have found the Family reference immediately.
  */
  const longestFirst = [...terms].sort((a, b) => b[0].length - a[0].length);
  const attempts = [terms, ...longestFirst.map((term) => [term])];
  let hits: SearchResult[] = [];
  for (const attempt of attempts) {
    hits = [];
    for (const entry of index) {
      const points = scoreQuery(entry, attempt);
      if (points > 0) {
        hits.push({
          ...entry,
          score: points,
          snippet: matchedSentence(entry, attempt) ?? entry.snippet,
        });
      }
    }
    if (hits.length > 0) break;
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
