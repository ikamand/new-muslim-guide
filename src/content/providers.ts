/**
 * Where each body of content in this app came from, and on what terms.
 *
 * One row per dataset. Not per publisher and not per text — those already have
 * homes, and this is the axis neither of them covers.
 *
 * ## What was split, and what this joins
 *
 * The knowledge was in four places and nowhere:
 *
 *   `sources.ts`        a citation on one claim — Bukhari 6018
 *   `text-sources.ts`   a publisher's terms, keyed by the string
 *                       `evidence.ts` writes into `arabicFrom`
 *   `audio-sources.ts`  who recorded a clip, and under what licence
 *   four generators     which script fetches what, in their headers
 *
 * None of them answers "where did juz 30 come from, what verified it, and what
 * are we obliged to do about it" in one place. That question gets asked every
 * time a body of content is added, and until now it was answered by reading
 * four files and a script header. Five more collections are coming; answering
 * it five times is how a licence obligation gets dropped.
 *
 * ## This is the provenance rule, at the size of a dataset
 *
 * `EvidenceText` carries `arabicFrom` and `translationFrom` on each individual
 * text, because a credit detached from the thing it credits gets lost when the
 * thing moves. That rule is right and it does not scale up on its own: a
 * collection of 99 entries would repeat one publisher 99 times, and the terms
 * that publisher set would live in none of them. So the same rule applies one
 * level up — a body of content names its provider, and the provider row
 * carries the terms once.
 *
 * ## What a row must be able to answer
 *
 * `verification` is the field that earns this file. Every other column is
 * bookkeeping; that one records what was actually done to establish the text
 * is what the source prints, and it is the difference between provenance and a
 * label. Where nothing was verified it says so, because a row claiming a check
 * that never ran is worse than no row.
 *
 * ⚠️ Nothing here is shown to a user. `text-sources.ts` and `audio-sources.ts`
 * drive the credits page; this is for whoever is deciding whether a new source
 * may be used, and for the audit.
 */

/** Every dataset the app carries. Adding one adds a row here first. */
export type ProviderId =
  | 'app'
  | 'quranenc'
  | 'hadeethenc'
  | 'fawazahmed0'
  | 'hadithunlocked'
  | 'islamhouse'
  | 'fitrahive'
  | 'ninetynine'
  | 'aladhan'
  | 'tarteel';

export type Provider = {
  /** What to call it in a report. */
  name: string;
  /** Where it is published. Text — the app makes no outbound links. */
  where: string;
  /** What of the app's content came from here. */
  supplies: string;
  /**
   * The npm script that fetches it, where one does.
   *
   * Absent means the content was written rather than fetched. Every source
   * here is a BUILD-TIME tool: none is called at runtime, and if all of them
   * vanished tomorrow the app would not notice. That is deliberate and it is
   * why keeping several is affordable.
   */
  fetchedBy?: string;
  /**
   * What was actually done to establish the text is what the source prints.
   *
   * The load-bearing field. "Trusted" is a permitted answer and an honest one;
   * a verification that did not happen must not be described here as though it
   * did.
   */
  verification: string;
  /**
   * The terms they published, where they published any.
   *
   * Absent is the honest value rather than a gap to fill, exactly as in
   * `audio-sources.ts`: naming a licence nobody stated is printing a claim
   * that was never made.
   */
  licence?: string;
  /** What those terms oblige the app to keep doing. */
  obligation?: string;
};

export const PROVIDERS: Readonly<Record<ProviderId, Provider>> = {
  app: {
    name: 'Written for this app',
    where: 'src/content/',
    supplies: 'Every teaching page, guide and note. English prose over cited texts.',
    verification:
      'None automatic, and none possible: prose is not checkable against a source. ' +
      'Every citation under it resolves — `content:verify` and `evidence` — and the ' +
      'prose itself is model-written and awaits a qualified reader. ' +
      '`docs/scholarly-review.md` is the pile.',
  },
  quranenc: {
    name: 'QuranEnc',
    where: 'quranenc.com/api/v1',
    supplies: 'Juz 30 — 564 ayahs — and every Qur’an text checked by `content:verify`.',
    fetchedBy: 'npm run quran:juz30',
    verification:
      'Every Arabic string in the app that carries a Qur’an citation is compared ' +
      'against it on a consonantal skeleton. The app writes Imlaei and QuranEnc ' +
      'serves Uthmani, so the superscript alef is promoted to a letter before ' +
      'diacritics are stripped — without that every verse false-positives.',
    obligation:
      'No terms published that could be found. Named on the same footing as the rest ' +
      'rather than on a licence that was never stated.',
  },
  hadeethenc: {
    name: 'HadeethEnc',
    where: 'hadeethenc.com/api/v1',
    supplies: '2,776 graded narrations. Preferred translation for the evidence texts.',
    fetchedBy: 'npm run evidence',
    verification:
      'Cross-checked against fawazahmed0 wherever both carry a narration — a shared ' +
      'run of ten consecutive words on a skeleton, not equality, because one prints ' +
      'the isnad and the other does not.',
    licence: 'No modification, addition or deletion, and the publisher named.',
    obligation: 'Its text ships verbatim, and the credits page names it.',
  },
  fawazahmed0: {
    name: 'fawazahmed0/hadith-api',
    where: 'github.com/fawazahmed0/hadith-api, via jsDelivr',
    supplies:
      'The Six Books with the collection’s own numbering — the thing nothing else has. ' +
      'Downloaded into a gitignored `.cache/`, never called at runtime.',
    fetchedBy: 'npm run hadith:corpus',
    verification:
      'A citation resolves by NUMBER, in the numbering the collection prints, and the ' +
      'text at it is compared against a second publisher. `verify:import` reports a ' +
      'number read in the wrong numbering as its own diagnosis — for Muslim the two ' +
      'numberings never agree in 7,563 records.',
    licence: 'Unlicense (public-domain dedication) on the compilation.',
    obligation:
      'The dedication does not reach the English translation inside it, which is ' +
      'Darussalam’s — see `text-sources.ts`. Prefer HadeethEnc’s translation; where ' +
      'this one is used it is flagged as Darussalam and carried as quotation.',
  },
  hadithunlocked: {
    name: 'Hadith Unlocked',
    where: 'hadithunlocked.com',
    supplies: 'One narration, where the primary corpus has an empty `text` field.',
    fetchedBy: 'npm run evidence (lazily, only on a hole)',
    verification:
      'Used only where fawazahmed0 is empty for a number that resolves — about 408 ' +
      'narrations across the six books. A number resolving to an empty string is ' +
      'worse than not resolving, because nothing about it looks like a failure.',
    obligation: 'No terms published — there is no licence, about or credits page.',
  },
  islamhouse: {
    name: 'IslamHouse',
    where: 'cnt.islamhouse.com/api/v1',
    supplies: 'Hisn al-Muslim — 132 occasions, 318 lines, with the publisher’s English.',
    fetchedBy: 'npm run hisn',
    verification:
      'Every character came over the wire and the strip is proved rather than trusted: ' +
      '`assertOnlyMarkersRemoved` deletes the permitted spans from the source itself ' +
      'and compares, so a dropped letter or ḥaraka fails the build. ' +
      '⚠️ Its Bukhari and Muslim are UNNUMBERED and their paragraph order is not ' +
      'their numbering — position looked like numbering until the two drifted, and by ' +
      'Bukhari 248 they had. Nothing here is resolved by position.',
    obligation:
      'Publishes no terms at all. Its English ships verbatim and is never ' +
      'machine-translated into the app’s other languages; fetch `transes=fr` from the ' +
      'same endpoint instead.',
  },
  ninetynine: {
    name: 'www.99NamesofAllah.name',
    where: 'www.99NamesofAllah.name — "Al-Asmāʾ al-Ḥusnā", 2026-05 v2 (PDF)',
    supplies:
      'Which ninety-nine names the app lists, their transliteration and their English meaning.',
    verification:
      'Its methodology is stated rather than assumed, which is why it is used at all: it ' +
      'holds that the enumerated list in Tirmidhi and Ibn Majah is an addition from later ' +
      'transmitters rather than the Prophet’s ﷺ own words, and derives its names from the ' +
      'Qur’an and authentic Sunnah following Ibn al-Qayyim, Al-Ghazali, Ibn Hazm, ' +
      'Al-Qurtubi and Abd al-Razzaq al-Badr. It also states plainly that Allah has more ' +
      'names than ninety-nine. ' +
      '⚠️ Its list is nonetheless the SAME ninety-nine, in the same order, that AlAdhan ' +
      'publishes from Tirmidhi — checked name by name. The difference is the justification ' +
      'and the quality of the English, not the membership. ' +
      '⚠️ Its Arabic column is not machine-readable: the PDF text layer reverses it, so ' +
      'the Arabic comes from AlAdhan and is matched by transliteration, never retyped.',
    obligation: 'No licence published. Supplied by Iyad on 28 Aug 2026 as the source to use.',
  },
  aladhan: {
    name: 'AlAdhan',
    where: 'api.aladhan.com/v1/asmaAlHusna',
    supplies: 'The vowelled Arabic for the ninety-nine names. Nothing else.',
    fetchedBy: 'npm run collection:names',
    verification:
      'Each name is matched to its row in the 99NamesofAllah list by a folded ' +
      'transliteration AND by position, and the run fails if any of the ninety-nine does ' +
      'not match both. The Arabic is then cross-checked against Tirmidhi 3507 in the local ' +
      'corpus — an independently edited text of the same list. ' +
      '⚠️ Its own English is NOT used and must not be: inconsistent capitalisation, two ' +
      'renderings crammed into one field, and a typo at #84 ("Soverign").',
    obligation: 'No licence published that could be found.',
  },
  tarteel: {
    name: 'Tarteel AI — whisper-base-ar-quran',
    where: 'huggingface.co/tarteel-ai/whisper-base-ar-quran',
    supplies:
      'The on-device speech model behind “Recite with me”. A model, not text: its ' +
      'output feeds the aligner in `lib/recite-align.ts` and is never rendered, so no ' +
      'model-written Arabic can reach a screen through it.',
    verification:
      'The Phase 0 spike (docs/recite-with-me.md) ran the app’s own bundled Husary ' +
      'clips through it and the aligner tracked 29/29 words — which also verified the ' +
      'GGML conversion the app downloads. Every download is checked against a pinned ' +
      'byte size, and the hosted copies were verified byte-for-byte against SHA256SUMS ' +
      'before the app was repointed at them. ' +
      '⚠️ The ONE runtime-fetched entry in this file: the model is downloaded once by ' +
      'the app, like reciter audio, because 148 MB cannot ship in the bundle.',
    licence: 'Apache-2.0, stated on the model card.',
    obligation:
      'Keep the attribution when the feature ships. Self-hosting is DONE (31 Aug ' +
      '2026): the app downloads from ikamand/recite-models, hosting Iyad controls, ' +
      'with the release URLs frozen by that repo’s README. The original weights and ' +
      'the converter are archived there too, so a fresh conversion needs no stranger.',
  },
  fitrahive: {
    name: 'fitrahive/dua-dhikr',
    where: 'github.com/fitrahive/dua-dhikr',
    supplies:
      'Nothing. A reference consulted by `verify:import`, never a content feed.',
    verification:
      'Not applicable — nothing from it enters the app. It is here because it prints ' +
      'Muslim’s within-chapter sub-numbering (`Muslim No. 2723 (75)`), which ' +
      'disambiguates a number read in the wrong numbering. ' +
      '⚠️ Thin: 97 records, 71 with any number, 5 with a sub-number.',
    licence: 'MIT.',
  },
};

/** A provider row, or undefined if nothing declares that id. */
export function providerFor(id: ProviderId): Provider | undefined {
  return PROVIDERS[id];
}
