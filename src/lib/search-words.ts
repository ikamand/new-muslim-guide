/**
 * The two things standing between what somebody types and what the app calls it.
 *
 * Measured, not guessed. Twenty-five questions a new Muslim would plausibly
 * type were run against the index: nine returned anything at all, and four of
 * those nine were wrong — "how do i decide" came back with "How far counts as
 * travelling?", and "how do i become muslim" with "What if my job touches
 * something forbidden?". Two separate faults, and they need opposite fixes.
 */

/**
 * Words that carry no subject, dropped before matching.
 *
 * This is the precision half. Question words are the most common words in a
 * typed question and the least informative, so "how do i decide" was scoring
 * every section whose heading begins "How" — the app looked like it was
 * answering when it was pattern-matching on grammar.
 *
 * Dropped only when something is left. "How" on its own stays a query, because
 * refusing to search is worse than searching badly.
 */
export const STOPWORDS: ReadonlySet<string> = new Set([
  'the', 'and', 'for', 'are', 'was', 'were', 'that', 'this', 'with', 'from',
  'have', 'has', 'had', 'you', 'your', 'they', 'them', 'its',
  'how', 'what', 'when', 'where', 'why', 'who', 'which',
  'can', 'could', 'should', 'would', 'will', 'shall', 'must',
  'does', 'did', 'done', 'doing', 'not', 'dont', 'cant', 'cannot',
  'any', 'some', 'all', 'about', 'into', 'onto', 'than', 'then',
  'there', 'here', 'been', 'being', 'get', 'got', 'make', 'made',
  /*
    Added in Phase 8. People say "someone" and "something" constantly in a
    typed question — and the duʿa book is full of titles like "Supplication for
    SOMEONE wearing a new garment", so "what do I say when someone dies" came
    back with the garment duʿa on a title hit. They carry no subject, which is
    exactly what this list is for.
  */
  'someone', 'something', 'anyone', 'anything', 'else', 'just',
]);

/**
 * Words that mean the same thing to a reader and different things to a filter.
 *
 * This is the recall half, and it is the born-Muslim assumption showing up in
 * the app's own index. The app writes "passing wind" and a person types
 * "farted". It writes "house" and they type "home". It writes "istikhara" and
 * they type "how do I decide". Every one of those is a real question the app
 * answers well and could not be asked.
 *
 * Hand-written rather than generated, and kept small on purpose. A model could
 * produce a thousand of these; a thousand unreviewed synonyms is a thousand
 * ways to return a confidently wrong answer, and the failures above were all
 * caused by matching too loosely rather than too tightly. These are groups
 * where every member genuinely means the same thing in this app's context.
 *
 * ⚠️ Search keys, not religious content. Getting one wrong sends somebody to
 * the wrong page, which is a bug; it never puts a wrong word on a screen.
 */
const GROUPS: readonly (readonly string[])[] = [
  /*
    Added in Phase 8, and every one of these came from a query that returned
    the WRONG page rather than nothing — which is the failure the miss log
    cannot see. Each was found by asking the app the questions its own Help
    chips say people ask, and reading what came back.

      "what should i wear"    → What do halal and haram mean?
      "what do i say back"    → Saying Takbīr at the Black Stone
      "i just became muslim"  → Which months ask anything of me?
      "what do i say when someone dies" → Supplication for wearing a new garment

    The app has a good page for all four. It writes "clothing" and a person
    types "wear"; it writes "greeting" and they type "say back".
  */
  ['wear', 'clothing', 'clothes', 'dress', 'outfit', 'hijab'],
  ['greeting', 'salam', 'say back', 'greet', 'reply'],
  ['convert', 'revert', 'became muslim', 'new muslim', 'just became'],
  ['died', 'dies', 'death', 'janazah', 'funeral', 'passed away'],

  /* Wudu and what ends it. */
  ['fart', 'farted', 'farting', 'passing wind', 'flatulence', 'gas'],
  /* Not 'wash'. It is a common word in a guide full of washing, and expanding
     wudu into it put "Wash your feet" in Ghusl above the answer to "what
     breaks wudu". A synonym has to be specific or it costs more than it buys. */
  ['wudu', 'ablution'],
  ['toilet', 'bathroom', 'loo', 'restroom', 'pee', 'urinate', 'poo'],

  /* Ghusl. Someone will type the everyday word, never the term. */
  ['ghusl', 'shower', 'bath', 'bathe'],
  ['sex', 'intercourse', 'intimate', 'intimacy', 'janabah', 'wet', 'dream'],

  /* Periods. Named plainly because nobody types "menstruation". */
  ['period', 'periods', 'menstruation', 'menses', 'bleeding', 'monthly'],

  /* Prayer, and the states people are in when they ask. */
  ['salah', 'salat', 'prayer', 'pray', 'praying', 'prayers'],
  ['rakah', 'rakat', 'rakah', 'unit', 'units'],
  ['missed', 'miss', 'missing', 'late', 'overslept', 'slept', 'forgot'],
  ['count', 'counting', 'lost', 'confused', 'unsure', 'doubt'],
  ['sitting', 'sit', 'seated', 'chair', 'standing', 'stand'],
  ['shorten', 'shortened', 'shortening', 'combine', 'combining', 'qasr'],
  ['travel', 'travelling', 'traveling', 'journey', 'trip', 'driving', 'flight', 'plane'],

  /* Deciding — the whole reason istikhara exists, and never called that. */
  ['istikhara', 'decide', 'decision', 'choose', 'choice', 'guidance'],

  /* Fasting. */
  ['fast', 'fasting', 'sawm', 'ramadan', 'iftar', 'suhoor'],

  /* Everyday life. */
  ['home', 'house', 'apartment', 'flat'],
  ['eat', 'eating', 'food', 'meal', 'drink', 'drinking'],
  ['sleep', 'sleeping', 'bed', 'night', 'bedtime'],
  ['sneeze', 'sneezing', 'sneezed'],
  ['death', 'died', 'dies', 'dying', 'funeral', 'janazah', 'condolence'],
  ['clothing', 'clothes', 'dress', 'hijab', 'headscarf', 'scarf', 'cover', 'modest', 'awrah'],
  ['family', 'mother', 'mum', 'mom', 'father', 'dad', 'parents', 'relatives'],
  ['music', 'singing', 'instrument', 'instruments', 'song', 'songs'],
  ['work', 'job', 'workplace', 'office', 'colleague', 'colleagues'],
  ['halal', 'permitted', 'allowed', 'lawful'],
  ['haram', 'forbidden', 'prohibited', 'unlawful', 'sin'],

  /* Becoming Muslim, and the words for it. */
  ['shahada', 'convert', 'revert', 'become', 'becoming', 'testimony', 'declaration'],

  /* Qur'an and reading it. */
  ['quran', "qur'an", 'koran', 'recite', 'recitation', 'reading', 'read'],
  ['arabic', 'transliteration', 'pronounce', 'pronunciation'],

  /* What the duʿa book calls itself, and what people call it. */
  /* Not 'prayer'. That is the third time a common word was added to a group
     and made things worse — after 'wash' for wudu and 'fajr' for fasting. A
     synonym has to be specific or it costs more than it buys. */
  ['dua', 'duas', 'supplication', 'dhikr', 'invocation', 'remembrance'],
  ['say', 'said', 'saying', 'recite', 'words'],

  /* Belief. The page is called "The Six Articles of Faith"; nobody types that. */
  ['iman', 'faith', 'belief', 'creed', 'articles', 'aqeedah'],

  /* Charity. */
  ['zakat', 'charity', 'giving', 'sadaqah', 'donate'],
];

/**
 * term → every word that means the same, including itself.
 *
 * Keyed twice: once by the word as written, and once by its transliteration
 * key. Without the second, looking synonyms up was itself spelling-sensitive —
 * "dua" reached the duʿa book through "supplication" and "duaa" reached
 * nothing, which is the same one-letter cliff this file exists to remove.
 */
const EXPANSIONS: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, string[]>();
  const add = (at: string, group: readonly string[]) => {
    if (!at) return;
    const existing = map.get(at) ?? [];
    for (const other of group) if (!existing.includes(other)) existing.push(other);
    map.set(at, existing);
  };
  for (const group of GROUPS) {
    for (const word of group) {
      add(word, [word, ...group]);
      add(transliterationKey(word), [word, ...group]);
    }
  }
  return map;
})();

/** Every spelling of one typed word that should count as a match for it. */
export function expand(term: string): readonly string[] {
  return EXPANSIONS.get(term) ?? EXPANSIONS.get(transliterationKey(term)) ?? [term];
}

/**
 * The multi-word members of every group, longest first.
 *
 * `expand` works on one typed word, so a group member of two words could only
 * ever be matched inside the app's own TEXT — never in what somebody types.
 * That made half the aliases one-directional without saying so: the app knows
 * "say back" means the greeting and "became muslim" means a convert, and a
 * reader typing either got neither, because the query had already been split
 * on whitespace into "say", "back".
 *
 * Longest first so "became muslim" is tried before "muslim" alone.
 */
const PHRASES: readonly (readonly [string, string])[] = GROUPS.flatMap((group) =>
  group
    .filter((member) => member.includes(' '))
    .map((member) => [member, group[0]] as readonly [string, string]),
).sort((a, b) => b[0].length - a[0].length);

/**
 * A typed query with any known phrase collapsed to its group's first word.
 *
 * "i just became muslim" becomes "i just convert", which then tokenises to a
 * term the index can actually score. Deliberately a substitution rather than
 * an addition: leaving both in would let the individual words go on matching
 * whatever they were matching before, which is the noise this fixes.
 */
export function collapsePhrases(query: string): string {
  let out = query;
  for (const [phrase, head] of PHRASES) {
    if (out.includes(phrase)) out = out.split(phrase).join(head);
  }
  return out;
}

/**
 * One spelling for every way an Arabic word gets written in Latin letters.
 *
 * ## The bug
 *
 * "Shahada" found the guide. "Shahadah" found nothing — one letter, and the
 * app went blank. Same for salaah, duaa, wudhu, tayamum, rakaah and zakah:
 * seven of ten common terms broke on an alternate spelling, because matching
 * asks whether the typed word STARTS a word in the text, and "shahadah" does
 * not start "shahada".
 *
 * This is not an edge case. There is no single correct Latin spelling of an
 * Arabic word — the app had to pick one, and a reader who learnt a different
 * one is not making a mistake. Converts meet these words written every way at
 * once, in a mosque, in a book and on a forum, in the same week.
 *
 * ## What it does
 *
 * Collapses the differences that are spelling rather than meaning: doubled
 * letters, the h/t at the end of a tāʾ marbūṭa, and the digraphs used for
 * letters Latin has no sign for.
 *
 *     shahada · shahadah  → shahada        zakat · zakah   → zaka
 *     salah · salaah      → sala           wudu · wudhu    → wudu
 *     tayammum · tayamum  → tayamum        dua · duaa      → dua
 *
 * Applied to the app's text and to the query alike, so being over-eager can
 * only ever cause a false MATCH, never a miss. False matches are handled by
 * scoring: an exact hit always outranks one of these.
 */
export function transliterationKey(word: string): string {
  const key = word
    .replace(/[^a-z0-9]/g, '')
    /* Doubles first: "salaah" has to become "salah" before the trailing h goes. */
    .replace(/(.)\1+/g, '$1')
    /* Digraphs standing in for one Arabic letter. */
    .replace(/dh/g, 'd')
    .replace(/th/g, 't')
    .replace(/kh/g, 'k')
    .replace(/gh/g, 'g')
    /* Tāʾ marbūṭa, written -ah or -at depending on whose book you read. */
    .replace(/[ht]$/, '');
  /* Two letters is not a word, it is a collision waiting to happen. */
  return key.length >= 3 ? key : '';
}
