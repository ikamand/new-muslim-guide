/**
 * The canonical metadata every piece of educational content can carry.
 *
 * The app already has four good shapes — a `Guide` you follow mid-motion, a
 * `Reference` you look something up in, a `Pillar` you read once, a `Recitation`
 * you say. Those stay. What they lacked was anything *about* them: how hard it
 * is, how long it takes, whether a beginner needs it in week one, what it
 * relates to, and where its claims come from.
 *
 * So this is a metadata layer, not a replacement. `meta` is optional on every
 * shape, which is what makes it adoptable one file at a time instead of in a
 * single migration that has to be right first go.
 *
 * Resolution of `LocalisedText` lives in `src/i18n/localise.ts`, not here —
 * content must not import the i18n layer, or the dependency runs in a circle.
 */

import type { Attribution, Source } from './sources';

/**
 * What a piece of content is about.
 *
 * Deliberately a closed union. An open string gets 'salah', 'prayer' and
 * 'Prayer' in the same codebase, and then nothing can group by it.
 */
export type ContentCategory =
  | 'becoming-muslim'
  | 'purification'
  | 'salah'
  | 'quran'
  | 'belief'
  | 'daily-life'
  | 'community'
  | 'fasting'
  | 'charity'
  | 'pilgrimage'
  | 'character';

/**
 * How much prior knowledge it assumes — not how difficult the subject is.
 *
 * Zakat is conceptually harder than wudu, but a beginner still meets wudu
 * first and needs it more. That distinction is `beginnerPriority`, below.
 */
export type Difficulty = 'foundational' | 'building' | 'deeper';

/**
 * When someone realistically needs this.
 *
 * 1 — the first week. You cannot pray without it.
 * 2 — the first month. Comes up almost immediately.
 * 3 — the first year. Real, but it will keep.
 * 4 — when the question arrives. Situational.
 * 5 — background. Read out of interest, not need.
 *
 * A bounded scale rather than an open number, because an open number gets
 * assigned inconsistently the moment there is more than one author.
 */
export type BeginnerPriority = 1 | 2 | 3 | 4 | 5;

/**
 * When a piece of content belongs in someone's life — its shape in time.
 *
 * Content here had two possible states before this: a task you finish, or a
 * monument that sits on a shelf forever. Neither describes the morning adhkār,
 * which you say every day of your life and never complete, or the page about
 * losing count in prayer, which is worthless until the minute it is the only
 * thing that matters.
 *
 * ## This decides placement, not presentation
 *
 * That is the whole difference from `Requirement` in `journey.ts`, whose own
 * comment scopes it to how a step "is presented". Cadence answers a different
 * question — where does this belong, and for how long — and each value has a
 * placement rule attached rather than a style:
 *
 * `once`         Read it and it is yours. Appears in Learn; leaves Today
 *                permanently once met.
 * `until-fluent` Needed until it is not. Drives Today's primary action while
 *                it is needed, then collapses to a link. This is what turns
 *                "Pray now · Fajr · 23 steps" into something else for someone
 *                who has prayed a thousand Fajrs.
 * `daily`        Forever. Permanent on Today, and NEVER counted as journey
 *                progress — you do not finish the morning adhkār.
 * `yearly`       Returns with the calendar. Surfaced by `seasons.ts` and
 *                nowhere else.
 * `on-event`     Invisible until it happens. Off the shelf entirely, reachable
 *                from Ask and Help.
 * `keepsake`     Rarely, and never removed. One line, never a hero.
 *
 * ## Where the values are recorded
 *
 * Not here. `src/content/cadence.ts` holds the table, and the reason is in its
 * header: `ContentMeta` is present on 52 of the catalogue's 201 entries, so a
 * field here could never answer the question for the other 149.
 */
export type Cadence =
  | 'once'
  | 'until-fluent'
  | 'daily'
  | 'yearly'
  | 'on-event'
  | 'keepsake';

/** Cross-cutting labels for search and "related", closed for the same reason as category. */
export type ContentTag =
  | 'first-day'
  | 'arabic'
  | 'memorisation'
  | 'audio'
  | 'women'
  | 'travel'
  | 'mistakes'
  | 'mosque'
  | 'family'
  | 'health'
  | 'ramadan'
  | 'money'
  | 'etiquette'
  | 'vocabulary';

/**
 * Which set a piece of content belongs to.
 *
 * Ids are only unique within a kind — 'shahada' is a guide *and* a pillar
 * today — so anything pointing at content has to carry both.
 */
/**
 * `hisn` replaced `dua` on 27 Aug 2026. The nine duʿas the app owned were
 * deleted — every one of their occasions is in Hisn al-Muslim — so the entity
 * a reference points at is now the book's occasion, keyed by IslamHouse's own
 * row id. Referring to content by what it IS rather than by which screen used
 * to hold it is what stopped a screen deletion breaking the journey.
 */
/**
 * `collection` was added on 28 Aug 2026 as the seventh kind, and is the only
 * one that is a SHAPE rather than a subject: five separate bodies of content
 * are instances of it. See `Collection` in `types.ts` for why that is one kind
 * and not five screens.
 */
export type ContentKind =
  | 'guide'
  | 'reference'
  | 'pillar'
  | 'article'
  | 'hisn'
  | 'phrase'
  | 'collection';

export type ContentRef = {
  kind: ContentKind;
  id: string;
};

export const ref = (kind: ContentKind, id: string): ContentRef => ({ kind, id });

/**
 * How settled a statement is.
 *
 * This is the distinction the app most needs and least had. Everything used to
 * arrive as a `note`, whether it was a point nobody disputes, a place the
 * schools genuinely part company, or a piece of practical advice with no
 * textual claim behind it at all. Three different things, one field, no way to
 * tell them apart — so no way to render them differently either.
 *
 * `agreed`   — universally accepted. State it plainly.
 * `differs`  — schools of thought genuinely disagree. The app still teaches one
 *              way, because a first-timer needs a path rather than a comparison
 *              table; `positions` holds the rest for when someone asks.
 * `practical` — beginner advice. No ruling claimed. "Nobody minds if you get
 *              the movements wrong at first" is true and useful and is not fiqh.
 */
export type Consensus = 'agreed' | 'differs' | 'practical';

/**
 * One named position within a `differs` note. Held, not necessarily shown.
 *
 * `school` is a typed attribution rather than free text, so "Hanafi",
 * "hanafi" and "the Hanafis" cannot all appear. Never a strawman: a position
 * is stated as those who hold it would state it, or it is left out.
 */
export type ScholarlyPosition = {
  school: Attribution;
  position: string;
  sources?: readonly Source[];
};

/**
 * A note, and how much weight it carries.
 *
 * The four things a beginner-facing app has to hold at once, in one record:
 *
 *   `text`                  the straightforward beginner answer — always shown
 *   `positions`             the scholarly difference, with attribution
 *   `sources`               where any of it comes from
 *   `additionalExplanation` the depth, for whoever asks for it
 *
 * Only `text` is shown by default. Everything else sits behind "Learn more",
 * because a first-timer needs a path rather than a comparison table — and
 * because the alternative to holding the difference is flattening it, which
 * is worse.
 */
export type ContentNote = {
  kind: Consensus;
  /** The sentence a reader sees. English; translated like any other content. */
  text: string;
  sources?: readonly Source[];
  /**
   * Only meaningful on a `differs` note. Holding these is what stops the app
   * either flattening a real difference or dumping it on someone in their
   * third week.
   */
  positions?: readonly ScholarlyPosition[];
  /**
   * The fuller answer, revealed on request. Prose, in the same plain register
   * as everything else — depth is not licence to start writing like a manual.
   */
  additionalExplanation?: string;
};

/** Whether a note has anything to show beyond its one-line answer. */
export function hasMore(entry: ContentNote): boolean {
  return Boolean(
    entry.additionalExplanation || entry.positions?.length || entry.sources?.length,
  );
}

export const note = (
  kind: Consensus,
  text: string,
  extra?: Omit<ContentNote, 'kind' | 'text'>,
): ContentNote => ({ kind, text, ...extra });

/**
 * A string in the languages the app speaks.
 *
 * Most content does NOT need this. The established mechanism is
 * `src/i18n/content/{es,fr,ar}.ts`, keyed by the English text, and it is the
 * better default: the five generated prayers repeat "Bow" seventeen times and
 * a keyed table translates it once. See `src/i18n/locales.ts` for the full
 * reasoning — it has not changed.
 *
 * This exists for the case that mechanism handles badly: a short Arabic term
 * whose gloss is one or two words. "Fear" and "awe" are both `taqwa`, and
 * which one a translator picks depends on the term, not on the English. Those
 * belong beside the term rather than in a sheet keyed by a word as generic as
 * "mindfulness".
 *
 * `en` is required because English is the source language, not the default.
 */
export type LocalisedText = {
  en: string;
  es?: string;
  fr?: string;
};

/**
 * Arabic that is part of the practice, rather than a translation of the app.
 *
 * The distinction matters and is easy to lose. A locale is the language someone
 * is *reading the app in*, served by the tables in `src/i18n/content/`. This is
 * different — it is the Arabic a reader of any language has to learn, because
 * the words themselves are the thing, and it is never translated into anything.
 *
 * Script and transliteration are never translated. A Latin-script crutch is
 * the same crutch in French as in English, and the Arabic is what is being
 * said rather than a rendering of it.
 *
 * ⚠️ NO REGISTRY YET, deliberately. This is the declared shape for a glossary
 * of the words a beginner hears — iqamah, niyyah, sunnah — and inventing
 * fourteen of them to stop the type looking lonely would be exactly the
 * placeholder content this app must not carry. `ContentKind` therefore has no
 * 'term' member: nothing can point at a record that does not exist.
 *
 * The app's Arabic learning content today is `Phrase` and `Recitation`, and
 * both already carry script, transliteration and an English meaning, with
 * Spanish and French coming through `src/i18n/content/`. Adding a glossary is
 * a content task with a reviewer attached, not a typing task.
 */
export type ArabicTerm = {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: LocalisedText;
  /** Where a beginner actually meets the word. */
  context?: LocalisedText;
  category: ContentCategory;
  tags?: readonly ContentTag[];
  sources?: readonly Source[];
};

/**
 * The metadata block. Optional everywhere, so existing content still compiles.
 *
 * `title` and `id` are not here: every shape already has them, and duplicating
 * them would create two places to be wrong.
 */
export type ContentMeta = {
  category: ContentCategory;
  difficulty: Difficulty;
  /** Honest reading or doing time, for one pass. Not a target. */
  estimatedMinutes: number;
  beginnerPriority: BeginnerPriority;
  tags?: readonly ContentTag[];
  relatedContent?: readonly ContentRef[];
  /**
   * Provenance for the content as a whole. A claim inside it that needs its
   * own reference carries one on its `ContentNote` instead.
   */
  sources?: readonly Source[];
  /**
   * Structured notes, alongside the plain `note?: string` the shapes already
   * carry. Both render; a bare string is treated as `practical`, which is what
   * almost all of the existing ones are.
   */
  notes?: readonly ContentNote[];
};

/** A bare `note` string, in the structured form, so consumers handle one type. */
export function asNote(text: string): ContentNote {
  return { kind: 'practical', text };
}

/**
 * Every note on a piece of content, plain and structured, in one list.
 *
 * Screens can migrate to this one at a time; nothing forces them to, because
 * the plain `note` field is untouched and still renders on its own.
 */
export function resolveNotes(
  plain: string | undefined,
  structured: readonly ContentNote[] | undefined,
): readonly ContentNote[] {
  return [...(plain ? [asNote(plain)] : []), ...(structured ?? [])];
}

/** Sorts a beginner path: what you need soonest, first. */
export function byBeginnerPriority<T extends { meta?: ContentMeta }>(a: T, b: T): number {
  return (a.meta?.beginnerPriority ?? 5) - (b.meta?.beginnerPriority ?? 5);
}
