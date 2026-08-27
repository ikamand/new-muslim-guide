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
  ['dua', 'duas', 'supplication', 'dhikr', 'invocation', 'remembrance'],
  ['say', 'said', 'saying', 'recite', 'words'],

  /* Charity. */
  ['zakat', 'charity', 'giving', 'sadaqah', 'donate'],
];

/** term → every word that means the same, including itself. */
const EXPANSIONS: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, string[]>();
  for (const group of GROUPS) {
    for (const word of group) {
      const existing = map.get(word) ?? [word];
      for (const other of group) if (!existing.includes(other)) existing.push(other);
      map.set(word, existing);
    }
  }
  return map;
})();

/** Every spelling of one typed word that should count as a match for it. */
export function expand(term: string): readonly string[] {
  return EXPANSIONS.get(term) ?? [term];
}
