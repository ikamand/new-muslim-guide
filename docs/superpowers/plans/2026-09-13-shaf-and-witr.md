# Shafʿ and Witr, and the order of the night — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the Witr page and guide to **Shafʿ and Witr**. Teach the one
fact the app never states, the order of the night (ʿIsha → its sunnah → night
prayer in pairs → shafʿ and witr last), in a form a three-week convert can hold.
Correct the three smaller findings from the second research pass.

**Architecture:** Content-only, except one builder change. The Witr reference
keeps its id `witr`, so no progress key migrates, and Today, the curriculum and
the Pray tab pick up the new title on their own. `buildPrayer` gains
`unitNames` so the generated guide can call its two units shafʿ and witr. The
order is one `bullets` section on the Qiyam prayer / Tahajjud page, replacing
its "Where does witr go?" section, so nothing is said twice.

**Tech Stack:** Expo SDK 57 / React Native, typed content in `src/content/`,
the app's `scripts/*-check.mjs` pattern, OTA delivery.

**Spec:** `docs/night-prayers-accuracy.md`, **Part 2** (the tested
hypothesis, the shafʿ findings, the six-line model). Part 1 carries the
sources for everything already on the pages.

## Global Constraints

- **Never print a reference that has not been opened.** Every citation this
  plan adds is marked ✓ in Part 2 of the spec. If an implementer wants one
  that is not, they stop and ask; they do not add it.
- **Never type Arabic.** No task adds an Arabic string. Surahs are cited by
  number and printed from `juz30.ts`; the qunut is linked in the dua book,
  never copied.
- **One red note per page.** `style:check` warns at two `differs` notes on a
  page. The Hanafi sentence is the red note on Shafʿ and Witr; nothing else on
  that page is `differs`.
- **Spelling in reader text:** `shafʿ` (U+02BF ʿ), lower case in prose and
  capitalised at the start of a title, as "Shafʿ and Witr". `Isha` in
  `src/content/learn/*.ts`, as those files already write it; `ʿIsha` in
  `src/content/prayers.ts` and `src/i18n/ui.ts`, as those files already write
  it. No em-dash hinges in reader text (`style:check`).
- **Model-written content carries ⚠️ REVIEW REQUIRED** in its source file's
  header, and every changed claim is added to `docs/curriculum-review-pile.md`
  under "The night prayers".
- **Ids do not change.** `reference:witr`, `guide:witr` and
  `reference:qiyam-al-layl` stay. `docs/progress-keys.txt` must not lose a key.
- **Check it on the screen.** 360pt wide, dark first, with the web preview
  (`node .claude/dev-web.mjs`, port 8081). Playwright's `page.clock.setFixedTime`
  and geolocation `37.7749, -122.4194` for Today.
- **Commit per task,** specific files only, never `git add -A`. Push to
  `origin main`. Ends with `npm run update:preview` (OTA); no native change.
- **Pre-existing failures, not this plan's:** `search:check` fails on "dua
  before sleeping" and "my mum is upset", and `nav:check` fails on a
  hardcoded string. Both failed at commit `250af2e`, before any night-prayer
  work. A task passes if it adds no new failure.

## Defaults this plan takes (Iyad can overrule any before Task 1)

1. **The guide keeps Al-Ikhlas as the surah it prints in every rakʿah**, with
   the note naming Al-Aʿla, Al-Kafirun and Al-Ikhlas as the sunnah. Printing
   Al-Aʿla (19 ayat) in the first step is accurate but asks a beginner for a
   surah they probably do not know, and the prayer is complete either way. The
   page states the sunnah.
2. **The "add a rakʿah after the imam's witr" option stays on the Taraweeh
   page as a plain note**, not a red one. Part 1 recommended dropping it; Part
   2 found the reason to keep it: people will see others stand up after the
   imam's salam.
3. **Today's kicker for the witr card stays "After ʿIsha".** It is a fact about
   the clock, and the page explains when it is better to wait.

---

### Task 1: The guide becomes Shafʿ and Witr

**Files:**
- Modify: `src/content/prayers.ts:160-187` (the `PrayerSpec` fields added for units)
- Modify: `src/content/prayers.ts:468-492` (the intention step), `:694-703` (the last taslim's note)
- Modify: `src/content/prayers.ts:824-840` (the witr spec)
- Test: `scripts/night-check.mjs` (a new section at the end, before the failure summary)

**Interfaces:**
- Consumes: `buildPrayer`, `rakahSteps(rakah, spec, unit)`, `PRAYERS` (exported from `src/content/prayers.ts`).
- Produces: `PrayerSpec.unitNames?: readonly string[]`. The generated `witr` guide has title `Shafʿ and Witr`, 38 steps, step ids unchanged (`r1-…` to `r3-…`).

- [ ] **Step 1: Write the failing check.** Append this block to `scripts/night-check.mjs` immediately before `if (failures > 0) {`, and add `PRAYERS` to the imports at the top: `import { PRAYERS } from '../src/content/prayers.ts';`

```js
/*
  The witr guide is two units named for what they are: shafʿ, two rakʿahs
  with a salam, then witr, one rakʿah (Iyad, 13 Sep 2026;
  docs/night-prayers-accuracy.md Part 2). It used to call all three "witr".
*/
{
  const guide = PRAYERS.find((g) => g.id === 'witr');
  const step = (id) => guide.steps.find((s) => s.id === id);
  const expect = (ok, message) => { if (!ok) fail(`witr guide: ${message}`); };
  expect(guide.title === 'Shafʿ and Witr', `title is "${guide.title}"`);
  expect(guide.steps.length === 38, `${guide.steps.length} steps, expected 38`);
  expect(step('r1-intention')?.instruction.includes('praying shafʿ'), 'the first intention does not name shafʿ');
  expect(step('r2-taslim-left')?.note === 'That is shafʿ. Now stand for witr.', `the shafʿ closing note is "${step('r2-taslim-left')?.note}"`);
  expect(step('r3-intention')?.title === 'Stand for witr', `the third rakʿah is titled "${step('r3-intention')?.title}"`);
  expect(step('r3-taslim-left')?.note === 'That is shafʿ and witr complete.', `the last note is "${step('r3-taslim-left')?.note}"`);
  console.log('  witr guide: shafʿ, then witr, 38 steps');
}
```

- [ ] **Step 2: Run it to see it fail.**
  Run: `npm run night:check`
  Expected: FAIL with `witr guide: title is "Witr"` and the four step messages.

- [ ] **Step 3: Add `unitNames` to `PrayerSpec`.** Directly after the `unitSources` field (`src/content/prayers.ts:172`):

```ts
  /**
   * What each unit is called, where the units have names of their own. Witr
   * is `['shafʿ', 'witr']`: the two rakʿahs are shafʿ, the one is witr
   * (IslamWeb 18778, 416554). Lower case, because they sit inside sentences.
   */
  unitNames?: readonly string[];
```

- [ ] **Step 4: Name the units in the intention step.** Replace the `title` and `instruction` of the `intention` step (`src/content/prayers.ts:474-484`) with:

```ts
      title:
        unit.index > 0
          ? spec.unitNames
            ? `Stand for ${spec.unitNames[unit.index]}`
            : 'Stand for the last rakʿah'
          : 'Face the qibla and intend',
      posture: 'standing',
      instruction:
        unit.index > 0
          ? spec.unitNames
            ? `Stand up again, facing the qibla, and intend in your heart one rakʿah of ${spec.unitNames[unit.index]}. It is a prayer of its own, so it opens with the takbir.`
            : `Stand up again, facing the qibla, and intend in your heart the one rakʿah that closes ${spec.spokenName ?? spec.title}. It is a prayer of its own, so it opens with the takbir.`
          : unit.count > 1 && spec.unitNames
            ? `Stand facing the qibla, feet roughly shoulder-width apart, and intend in your heart that you are praying ${spec.unitNames[0]}, the ${COUNT_WORDS[spec.rakahs] ?? spec.rakahs} rakʿahs before ${spec.unitNames[1]}.`
            : unit.count > 1
              ? `Stand facing the qibla, feet roughly shoulder-width apart, and intend in your heart that you are praying ${spec.spokenName ?? spec.title}, beginning with ${COUNT_WORDS[spec.rakahs] ?? spec.rakahs} rakʿahs.`
              : `Stand facing the qibla, feet roughly shoulder-width apart, and intend in your heart that you are praying ${spec.spokenName ?? spec.title}.`,
```

- [ ] **Step 5: Name the units in the closing note.** Replace the `note` of the `taslim-left` step (`src/content/prayers.ts:696-700`) with:

```ts
        note: !isLastUnit
          ? spec.unitNames
            ? `That is ${spec.unitNames[unit.index]}. Now stand for ${spec.unitNames[unit.index + 1]}.`
            : `Those are the first ${COUNT_WORDS[spec.rakahs] ?? spec.rakahs} rakʿahs. Now stand for the last one.`
          : spec.closingDua
            ? undefined
            : `That is ${spec.spokenName ?? spec.title} complete.`,
```

- [ ] **Step 6: Update the witr spec.** In `src/content/prayers.ts:824-840` set:

```ts
    id: 'witr',
    title: 'Shafʿ and Witr',
    listTitle: 'Shafʿ and Witr',
    spokenName: 'shafʿ and witr',
    unitNames: ['shafʿ', 'witr'],
    when: 'After ʿIsha until Fajr, to close the night',
```

  Leave `rakahs: 3`, `units: [2, 1]`, `unitSources`, `aloudRakahs`, `night`, `kind`, `referenceId`, `surahNote` and `surahSources` as they are. Add one line to the comment above the spec: `Named shafʿ and witr since 13 Sep 2026 (Iyad; IslamWeb 18778): the two rakʿahs are shafʿ and the one is witr.`

- [ ] **Step 7: Run the checks.**
  Run: `npx tsc --noEmit && npm run night:check`
  Expected: `tsc` clean; `night:check` prints `witr guide: shafʿ, then witr, 38 steps` and the final `✓`.

- [ ] **Step 8: Confirm no other guide changed.** Write `git show HEAD:src/content/prayers.ts` to `src/content/prayers.head-compare.ts`, import both with `node --import ./scripts/ts-resolve.mjs`, and assert `JSON.stringify` equality for `fajr, dhuhr, asr, maghrib, isha, qiyam, istikhara, tawba`. Delete `prayers.head-compare.ts` afterwards and confirm `git status` does not list it.
  Expected: all eight `identical`.

- [ ] **Step 9: Look at it.** Web preview, 360pt dark, `/guide/witr`. Screenshot step 1 (intention names shafʿ), step 23 ("That is shafʿ. Now stand for witr."), step 24 ("Stand for witr") and step 38 ("That is shafʿ and witr complete."). The rakʿah arches read 1, 2, then 3 of 3.

- [ ] **Step 10: Commit.**

```bash
git add src/content/prayers.ts scripts/night-check.mjs
git commit -m "Witr guide becomes Shafʿ and Witr: two named units"
```

---

### Task 2: The page becomes Shafʿ and Witr

**Files:**
- Modify: `src/content/learn/voluntary-prayers.ts:293-455` (the header comment and `WITR`)
- Modify: `src/content/evidence.ts`, `docs/evidence-report.md` (generated by `npm run evidence`)
- Modify: `docs/i18n-manifest.csv`, `docs/i18n-manifest.md` (generated by `npm run i18n:manifest`)

**Interfaces:**
- Consumes: `hadith`, `scholarly`, `note`, `ref` (already imported in the file).
- Produces: `WITR` with `id: 'witr'`, `title: 'Shafʿ and Witr'`. Today's witr card, the Pray tab row and the curriculum lesson read this title.

- [ ] **Step 1: Replace the header comment above `export const WITR`** with:

```ts
/**
 * Shafʿ and Witr.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over opened sources.
 *
 * Named "Witr" until 13 Sep 2026. Iyad renamed it after the second research
 * pass (docs/night-prayers-accuracy.md Part 2). Shafʿ is the even rakʿahs
 * prayed straight before witr (IslamWeb 18778), the two together close the
 * night prayer (IslamWeb 416554), and the app had called all three "witr"
 * without once saying the word shafʿ.
 *
 * What the page teaches, in order: what they are; that shafʿ is not the
 * sunnah of Isha; when (last if you will wake, before sleep if you might
 * not); how (two, salam, one), with the Hanafi way as the page's one red
 * note; what to recite; the qunut, as something a beginner does not need
 * yet; praying witr and then waking; sleeping through it.
 *
 * What a reviewer owns: the Hanafi sentence; "most scholars dislike" one
 * rakʿah on its own; and whether the qunut section says enough about the
 * schools without naming them.
 *
 * The qunut is not a step in the guide. Its dua is in the dua book (Hisn
 * al-Muslim, occasion 1269331); a step needs a transliteration from a source
 * and a recording.
 */
```

- [ ] **Step 2: Replace the `WITR` object** with:

```ts
export const WITR: Reference = {
  id: 'witr',
  surface: 'learn',
  title: 'Shafʿ and Witr',
  subtitle: 'The even and the odd that close your night prayer',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'witr'), ref('reference', 'qiyam-al-layl'), ref('hisn', '1269331')],
  },
  quickFacts: [
    { label: 'When', value: 'After Isha and its sunnah, until Fajr' },
    { label: 'How many', value: 'Two rakʿahs of shafʿ, then one of witr' },
    {
      label: 'Do I have to?',
      value: 'For most scholars no. The Hanafi school says yes',
      emphasis: true,
    },
    { label: 'How', value: 'Pray two, then one', href: '/guide/witr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What are shafʿ and witr?',
      promote: 'hero',
      body:
        'Shafʿ means even and witr means odd. Together they close your night prayer: two rakʿahs with a salam, then one rakʿah on its own. The Prophet ﷺ said to make witr the last prayer of your night.',
      sources: [
        hadith('bukhari', '998', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Shafʿ and witr are part of qiyam al-layl',
          author: 'IslamWeb, fatwa 416554',
          url: 'https://www.islamweb.net/ar/fatwa/416554/',
        }),
      ],
    },
    {
      id: 'not-isha-sunnah',
      heading: 'Is shafʿ the sunnah after Isha?',
      body:
        'No. Isha has two sunnah rakʿahs of its own, prayed straight after it. Shafʿ is separate: the even rakʿahs you pray just before witr.',
      sources: [
        hadith('bukhari', '1180', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'The sunnah of Isha is not the two rakʿahs of shafʿ',
          author: 'IslamWeb, fatwa 18778',
          url: 'https://www.islamweb.net/ar/fatwa/18778/',
        }),
      ],
    },
    {
      id: 'when',
      heading: 'When do I pray them?',
      promote: 'quote',
      body:
        'Any time after Isha until Fajr, and always as the last prayer of your night. If you will pray qiyam or tahajjud, pray shafʿ and witr after it. If you are not sure you will wake, pray them before you sleep. Both ways are sound.',
      sources: [
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1434', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Witr may be prayed early in the night, and delaying it is better',
          author: 'IslamWeb, fatwa 2165',
          url: 'https://www.islamweb.net/ar/fatwa/2165/',
        }),
      ],
    },
    {
      id: 'how',
      heading: 'How do I pray them?',
      body:
        'Pray two rakʿahs and end with the salam. That is shafʿ. Then stand and pray one rakʿah and end with the salam. That is witr. The Prophet ﷺ also allowed witr of five, three or one rakʿahs.',
      sources: [
        hadith('abu-dawud', '1422', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '991', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Separating witr from shafʿ with a salam',
          author: 'IslamWeb, fatwa 58212',
          school: 'the majority',
          url: 'https://www.islamweb.net/ar/fatwa/58212/',
        }),
        scholarly({
          work: 'Performing only one rakʿah in witr prayer',
          author: 'IslamWeb, fatwa 92752',
          school: 'the majority',
          url: 'https://islamweb.net/en/fatwa/92752/',
        }),
      ],
      note: 'One rakʿah of witr on its own, with nothing before it, still counts, but most scholars dislike it.',
      notes: [
        note(
          'differs',
          'At many mosques, especially Hanafi ones, witr is three rakʿahs together: a sitting after the second without the salam, then a third with the qunut before bowing. Pray it with them.',
          {
            sources: [
              scholarly({
                work: 'Details regarding witr, confirmed sunna, and non-confirmed sunna prayers',
                author: 'Faraz Rabbani, SeekersGuidance',
                school: 'Hanafi',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/details-regarding-witr-confirmed-sunna-and-non-confirmed-sunna-prayers/',
              }),
              scholarly({
                work: 'Should he pray behind those who pray witr with three rakʿahs and two tashahhuds?',
                author: 'Islam Question & Answer, fatwa 66613',
                url: 'https://islamqa.info/en/answers/66613',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position:
                  'Witr is required: three rakʿahs after Isha with one salam, sitting for the tashahhud after the second, and the qunut in the third before bowing.',
              },
            ],
          },
        ),
      ],
    },
    {
      id: 'recite',
      heading: 'What do I recite?',
      body:
        'Al-Fatihah in every rakʿah, then a short surah. The Prophet ﷺ recited Al-Aʿla in the first rakʿah, Al-Kafirun in the second and Al-Ikhlas in the last. They are recommended, not required, so recite what you know.',
      note: 'Some also add Al-Falaq and An-Nas after Al-Ikhlas in the last rakʿah.',
      sources: [
        hadith('nasai', '1699', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'What is the best way to pray witr?',
          author: 'Irshaad Sedick, SeekersGuidance',
          school: 'Shafi`i',
          url: 'https://seekersguidance.org/answers/prayer-shafii-fiqh/what-is-the-best-way-to-pray-witr/',
        }),
      ],
    },
    {
      id: 'qunut',
      heading: 'What is the qunut?',
      body:
        'A dua some people make in the last rakʿah of witr. You do not need to learn it to pray witr. Mosques differ on when they say it, some every night and some only in the second half of Ramadan, and on whether it comes before or after bowing.',
      sources: [
        hadith('abu-dawud', '1425', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Qunut in witr and in Fajr',
          author: 'Dar al-Iftaa al-Misriyyah, fatwa 15984',
          url: 'https://www.dar-alifta.org/ar/fatwa/details/15984',
        }),
      ],
    },
    {
      id: 'after',
      heading: 'What if I prayed witr and then wake up?',
      body:
        'Pray as much as you like, two rakʿahs at a time, and do not pray witr again. A night has only one witr.',
      sources: [
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Witr may be prayed early in the night, and delaying it is better',
          author: 'IslamWeb, fatwa 2165',
          school: 'the majority',
          url: 'https://www.islamweb.net/ar/fatwa/2165/',
        }),
      ],
    },
    {
      id: 'missed',
      heading: 'What if I sleep through it?',
      body: 'Pray it when you wake up, or whenever you remember.',
      sources: [
        hadith('abu-dawud', '1431', { grading: 'sahih', role: 'practice' }),
        hadith('tirmidhi', '465', { grading: 'sahih', role: 'practice' }),
      ],
    },
  ],
};
```

- [ ] **Step 3: Confirm the new relatedContent ref resolves.** `ref('hisn', '1269331')` follows the precedent in `src/content/learn/daily-prayers.ts` (`ISHA_PAGE.meta.relatedContent` has `ref('hisn', '1269267')`). `npm run content:audit` in Step 4 reports it if it dangles; if it does, remove that one entry rather than inventing one.

- [ ] **Step 4: Regenerate and check.**
  Run: `npx tsc --noEmit && npm run evidence && npm run i18n:manifest && npm run content:audit && npm run style:check`
  Expected: `tsc` clean. The evidence report adds `bukhari:1180`, `abu-dawud:1434` and `abu-dawud:1425`, and drops nothing still cited: compare the key sets against `git show HEAD:src/content/evidence.ts`. `content:audit` exits 0 and `docs/progress-keys.txt` loses no key. `style:check` gains no warning for `witr` (one `differs` note).

- [ ] **Step 5: Read the rendered translations of the three new narrations** in `src/content/evidence.ts`. Bukhari 1180 names "two Rakat after 'Isha' prayer in his house". Abu Dawud 1434 has Abu Bakr "with care" and ʿUmar "with strength". Abu Dawud 1425 is the dua "O Allah, guide me among those Thou hast guided". If any renders a different narration, stop.

- [ ] **Step 6: Look at it.** 360pt dark, `/reference/witr`. Screenshot the top (title "Shafʿ and Witr", the four quick facts), "Is shafʿ the sunnah after Isha?", "How do I pray them?" with the one red note, and "What is the qunut?". `/pray`: the row reads "Shafʿ and Witr / After ʿIsha until Fajr, to close the night".

- [ ] **Step 7: Commit.**

```bash
git add src/content/learn/voluntary-prayers.ts src/content/evidence.ts docs/evidence-report.md docs/i18n-manifest.csv docs/i18n-manifest.md docs/progress-keys.txt
git commit -m "Witr page becomes Shafʿ and Witr: order, recitation, qunut"
```

---

### Task 3: The order of the night, on the night-prayer page

**Files:**
- Modify: `src/content/learn/voluntary-prayers.ts:137-291` (`QIYAM_AL_LAYL` and its header comment)
- Modify: generated evidence and manifests, as in Task 2

**Interfaces:**
- Consumes: `QIYAM_AL_LAYL` sections `what`, `tahajjud`, `why`, `best`, `how-little`, `witr`, `ramadan`.
- Produces: a section `order` in place of `witr`. No section id elsewhere depends on `witr` (`grep -rn "qiyam-al-layl:witr\|section:qiyam" src scripts` returns nothing).

- [ ] **Step 1: Fix the overstated attribution.**
  - In the `tahajjud` section's IslamQA 143240 source, delete the line `school: 'the majority',`.
  - In the header comment, replace `while most\n * jurists use it for night prayer at any time` with `while many\n * jurists use it for night prayer at any time`.

  Reason: the Mawsuʿah says «كثير», "many" (Part 2, finding 6).

- [ ] **Step 2: Replace the `witr` section** (heading "Where does witr go?") with this `order` section:

```ts
    {
      id: 'order',
      heading: 'What comes first?',
      body: 'One night prayer, with a fixed ending.',
      bullets: [
        '**After Isha**, its two sunnah rakʿahs.',
        '**Then your night prayer**, two rakʿahs at a time, as much as you like. After sleeping it is tahajjud, and in Ramadan it is taraweeh.',
        '**Last, shafʿ and witr**: two rakʿahs, then one, before Fajr.',
        '**Not sure you will wake?** Pray shafʿ and witr before you sleep. If you then wake, pray in twos and do not pray witr again.',
      ],
      sources: [
        hadith('bukhari', '1180', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '990', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '998', { grading: 'sahih', role: 'practice' }),
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Shafʿ and witr are part of qiyam al-layl',
          author: 'IslamWeb, fatwa 416554',
          url: 'https://www.islamweb.net/ar/fatwa/416554/',
        }),
      ],
    },
```

- [ ] **Step 3: Add to the header comment** one paragraph:

```ts
 * 13 Sep 2026: "Where does witr go?" became "What comes first?", the order of
 * the night in four lines (docs/night-prayers-accuracy.md Part 2). Iyad's
 * understanding was shafʿ and witr first, then qiyam, then tahajjud. The
 * sources put shafʿ and witr LAST, as the end of the one night prayer, with
 * early witr for someone who might not wake.
```

- [ ] **Step 4: Regenerate and check.**
  Run: `npx tsc --noEmit && npm run evidence && npm run i18n:manifest && npm run content:audit && npm run style:check && npm run search:check`
  Expected: all as Task 2, and `style:check` raises no "same citation cited under both" warning for `qiyam-al-layl`. If Muslim 755 or Bukhari 990 is now cited twice on the page, remove the later duplicate. `search:check` still finds `tahajjud` and `qiyam`.

- [ ] **Step 5: Look at it.** 360pt dark, `/reference/qiyam-al-layl`, "What comes first?". The four bullets render with their bold lead-ins, and no bullet wraps into a wall.

- [ ] **Step 6: Commit.**

```bash
git add src/content/learn/voluntary-prayers.ts src/content/evidence.ts docs/evidence-report.md docs/i18n-manifest.csv docs/i18n-manifest.md
git commit -m "Night-prayer page states the order: shafʿ and witr last"
```

---

### Task 4: Taraweeh — women, finishing the Qur'an, the imam's witr

**Files:**
- Modify: `src/content/learn/taraweeh.ts:110-176` (sections `how-many`, `witr`, `together`)

**Interfaces:**
- Consumes: the existing `TARAWEEH` sections.
- Produces: no new ids.

- [ ] **Step 1: Add a note to `how-many`**:

```ts
      note: 'Many mosques recite the whole Qur’an over the month. That is recommended, not required, and a calm prayer is better than a rushed one.',
```

  Add to its `sources`:

```ts
        scholarly({
          work: 'Is it necessary to recite the entire Qur’an in taraweeh?',
          author: 'Islam Question & Answer, fatwa 66504',
          url: 'https://islamqa.info/en/answers/66504',
        }),
```

- [ ] **Step 2: Replace the `witr` section's body** with:

```ts
      body:
        'The imam closes taraweeh with witr, often with the qunut, a dua in its last rakʿah. Some mosques add the qunut only in the second half of the month. If you will pray again later that night, pray witr with the imam and do not repeat it later.',
      note: 'You will also see people stand up after the imam’s last salam and add one rakʿah. That makes their prayer even, so they can pray witr at the end of their own night, and it still counts as staying with the imam.',
```

  Add to its `sources`:

```ts
        scholarly({
          work: 'Can I pray witr before tahajjud?',
          author: 'Ibn Baz, in Islam Question & Answer, fatwa 65702',
          url: 'https://islamqa.info/en/answers/65702',
        }),
        scholarly({
          work: 'Qiyam al-layl after taraweeh',
          author: 'IslamWeb, fatwa 491695',
          url: 'https://www.islamweb.net/ar/fatwa/491695/',
        }),
```

- [ ] **Step 3: Replace the `together` section's last sentence.** The sentence "Praying it at the mosque is better, and praying it at home still counts." becomes:

```
For men the mosque is better. For women home is better in principle, and the mosque is good when it helps her pray. At home it is prayed the same way, two at a time, then witr.
```

  Add to its `sources`:

```ts
        scholarly({
          work: 'How should women pray taraweeh at home?',
          author: 'Islam Question & Answer, fatwa 222751',
          url: 'https://islamqa.info/en/answers/222751',
        }),
```

- [ ] **Step 4: Header comment.** Append: `13 Sep 2026: the mosque-is-better line was true for men only (IslamQA 38922 says "a man"; 222751 for women); finishing the Qur'an added as recommended, not required (66504); the add-a-rakʿah option moved to a plain note, because people will see it done (Ibn Baz, 65702).`

- [ ] **Step 5: Check.**
  Run: `npx tsc --noEmit && npm run i18n:manifest && npm run style:check`
  Expected: clean; `taraweeh` still has one `differs` note.

- [ ] **Step 6: Look at it.** 360pt dark, `/reference/taraweeh`: "How many rakʿahs?", "What happens at witr?", "Why is it prayed together?".

- [ ] **Step 7: Commit.**

```bash
git add src/content/learn/taraweeh.ts docs/i18n-manifest.csv docs/i18n-manifest.md
git commit -m "Taraweeh: women at home or mosque, finishing the Qur'an, the imam's witr"
```

---

### Task 5: Findability, Today, and the record

**Files:**
- Modify: `src/lib/search-words.ts` (a synonym group after the taraweeh group)
- Modify: `scripts/search-check.mjs` (two expectations after the `tarawih` line)
- Modify: `docs/curriculum-review-pile.md` ("The night prayers", the Witr subsection)
- Modify: `docs/night-prayers-accuracy.md` (Part 2 gains a "Built" list)
- Modify: `docs/ui-redesign-plan.md` (one line under "The audit, 13 Sep")

**Interfaces:**
- Consumes: the titles from Tasks 1–2.
- Produces: nothing new for code.

- [ ] **Step 1: Write the failing search expectations.** After the `tarawih` line in `scripts/search-check.mjs`:

```js
  { query: 'shafa', wants: 'reference:witr', because: 'Shafʿ and Witr since 13 Sep 2026, typed without the ʿ' },
  { query: 'witr', wants: 'reference:witr', because: 'the obvious case must not regress' },
```

- [ ] **Step 2: Run it.** `npm run search:check`. Expected: the `shafa` line FAILS (the page title folds `shafʿ`, which may not match `shafa`); `witr` passes. If `shafa` already passes, skip Step 3.

- [ ] **Step 3: Add the synonym group** after the taraweeh group in `src/lib/search-words.ts`:

```ts
  /* Shafʿ, typed the ways people type it without the ʿ. */
  ['shafʿ', 'shaf', 'shafa', 'shafaa'],
```

  Run `npm run search:check` again. Expected: `shafa` and `witr` pass; only the two pre-existing failures remain.

- [ ] **Step 4: Look at Today.** 360pt dark, 13 Sep 2026 21:30, San Francisco. The card reads "After ʿIsha / Shafʿ and Witr / The even and the odd that close your night prayer".

- [ ] **Step 5: Update the review pile.** In `docs/curriculum-review-pile.md`, "The night prayers", rename the Witr subsection "Shafʿ and Witr" and add these bullets:
  - "Is shafʿ the sunnah after Isha?": no (IslamWeb 18778; Bukhari 1180).
  - "When": always last, before sleep if you might not wake (Muslim 755, Abu Dawud 1434, IslamWeb 2165).
  - "What do I recite?": Al-Aʿla, Al-Kafirun, Al-Ikhlas (Nasaʾi 1699), with Al-Falaq and An-Nas as a note (SeekersGuidance, Shafiʿi).
  - "What is the qunut?": a beginner does not need it; mosques differ on timing and on before or after bowing (Dar al-Iftaa 15984; Abu Dawud 1425).
  - The night-prayer page's "What comes first?" (four bullets, sources as Task 3).
  - Taraweeh: women at home or the mosque (IslamQA 222751); finishing the Qur'an (66504); the add-a-rakʿah note (Ibn Baz, 65702).

- [ ] **Step 6: Record what was built** in `docs/night-prayers-accuracy.md` Part 2, as a "Built" list naming each commit. Add one line to `docs/ui-redesign-plan.md` under "The audit, 13 Sep": `- **Witr became Shafʿ and Witr** (page and guide, id unchanged), and the night-prayer page states the order: shafʿ and witr last.`

- [ ] **Step 7: Full verification.**
  Run: `npx tsc --noEmit && npm run night:check && npm run content:audit && npm run style:check && npm run content:verify && npx expo export --platform web --output-dir "$SCRATCH/web-export"` (any scratch directory outside the repo)
  Expected: all clean; `expo export` renders 44 static routes; `search:check` shows only its two pre-existing failures.

- [ ] **Step 8: Commit and ship.**

```bash
git add src/lib/search-words.ts scripts/search-check.mjs docs/curriculum-review-pile.md docs/night-prayers-accuracy.md docs/ui-redesign-plan.md
git commit -m "Shafʿ findable in search; night prayers on the review pile"
git push origin main
npm run update:preview
```

---

### Task 6: The order of the night, drawn

Approved by Iyad, 13 Sep 2026: "show the order as a small drawn timeline of
the night instead of four bullets". The marks carry the counts, which is the
lesson: stacked pairs of dots for night prayer, **●● ●** in gold for shafʿ and
witr, the same mark in outline for praying them before sleep. The words stay
the section's own `bullets`, so the drawing adds no text of its own, a screen
reader reads exactly what the bullets say, and the i18n manifest is untouched.
Depends on Task 3 (the `order` section).

**Files:**
- Modify: `src/content/types.ts` (a `TimelineMark` type; a `timeline` field on `ReferenceSection`, directly after `bullets`)
- Create: `src/components/teaching/timeline.tsx`
- Modify: `src/app/reference/[id].tsx:288-292` (the bullets block in `Section`)
- Modify: `src/content/learn/voluntary-prayers.ts` (the `order` section gains `timeline`)
- Modify: `docs/curriculum-review-pile.md`, `docs/ui-redesign-plan.md`
- Test: `scripts/night-check.mjs` (a new block before `if (failures > 0) {`)

**Interfaces:**
- Consumes: `ReferenceSection.bullets`; `TeachingBulletText` from `src/components/teaching/index.tsx`; `ThemedText` type `default` (fontSize 16, lineHeight 26, so a mark centres at y = 13); theme tokens `accent`, `gold`, `goldSoft`, `background`.
- Produces: `export type TimelineMark = 'start' | 'pairs' | 'closing' | 'earlier'`; `ReferenceSection.timeline?: readonly TimelineMark[]`; `export function TeachingTimeline({ items, marks, last }: { items: readonly string[]; marks: readonly TimelineMark[]; last?: boolean })`.

- [ ] **Step 1: Write the failing check.** Before `if (failures > 0) {` in `scripts/night-check.mjs`:

```js
/*
  The night drawn as a timeline (Iyad, 13 Sep 2026): one mark per bullet,
  marks from the known set, and the night-prayer page's order section drawn
  start → pairs → closing → earlier. A mark list that drifts from its bullets
  would draw the wrong count beside a sentence, which is a ruling on screen.
*/
{
  const Learn = await import('../src/content/learn/index.ts');
  const MARKS = new Set(['start', 'pairs', 'closing', 'earlier']);
  const pages = Object.values(Learn).filter((value) => value && Array.isArray(value.sections));
  for (const page of pages) {
    for (const section of page.sections) {
      if (!section.timeline) continue;
      const bullets = section.bullets ?? [];
      if (section.timeline.length !== bullets.length) {
        fail(`${page.id}.${section.id}: ${section.timeline.length} timeline marks for ${bullets.length} bullets`);
      }
      for (const mark of section.timeline) {
        if (!MARKS.has(mark)) fail(`${page.id}.${section.id}: unknown timeline mark "${mark}"`);
      }
    }
  }
  const order = Learn.QIYAM_AL_LAYL.sections.find((section) => section.id === 'order');
  if (order?.timeline?.join(',') !== 'start,pairs,closing,earlier') {
    fail(`qiyam-al-layl.order: timeline is ${order?.timeline?.join(',') ?? 'missing'}`);
  }
  console.log('  night order: drawn as start, pairs, closing, earlier');
}
```

- [ ] **Step 2: Run it to see it fail.**
  Run: `npm run night:check`
  Expected: FAIL with `qiyam-al-layl.order: timeline is missing`.

- [ ] **Step 3: Add the type.** In `src/content/types.ts`, above `export type ReferenceSection`:

```ts
/**
 * One mark on a drawn timeline, one per bullet (see `ReferenceSection.timeline`).
 *
 * The marks are counts, not decoration: `start` opens the line; `pairs` is
 * prayer two rakʿahs at a time; `closing` is shafʿ and witr, two then one;
 * `earlier` is that same closing prayed before sleep, drawn off the line.
 */
export type TimelineMark = 'start' | 'pairs' | 'closing' | 'earlier';
```

  And in `ReferenceSection`, directly after the `bullets` field:

```ts
  /**
   * Draw `bullets` as a timeline, one mark per bullet, in order. The words
   * stay the bullets', so nothing is written twice and a screen reader reads
   * the same sentences. Ignored unless there are exactly as many marks as
   * bullets, and `npm run night:check` fails if they differ.
   */
  timeline?: readonly TimelineMark[];
```

- [ ] **Step 4: Create `src/components/teaching/timeline.tsx`.** Import `Teaching` and `Spacing` from the same module `src/components/teaching/index.tsx` imports `Teaching` from (read its imports), and do not hardcode a colour: every colour comes from `useTheme()`.

```tsx
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Rect } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import type { TimelineMark } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';

import { TeachingBulletText } from './index';

/** The spine's width. Marks centre on the first line of `default` text, whose lineHeight is 26. */
const SPINE = 36;
const MARK_Y = 13;

/**
 * Bullets drawn as the night they describe.
 *
 * The marks are the rakʿahs: stacked pairs for night prayer, two then one in
 * gold for shafʿ and witr, and the same two-then-one in outline, below a
 * hairline and off the thread, for praying them before sleep. The thread is
 * the Awqat day page's: a hairline in goldSoft that meets each mark flush,
 * with the mark on a disc of the page's own ground.
 *
 * Iyad, 13 Sep 2026 (docs/night-prayers-accuracy.md Part 2). A drawing that
 * teaches a count is content, and is on the review pile.
 */
export function TeachingTimeline({
  items,
  marks,
  last,
}: {
  items: readonly string[];
  marks: readonly TimelineMark[];
  last?: boolean;
}) {
  const theme = useTheme();
  const lastOnThread = marks.map((mark) => mark !== 'earlier').lastIndexOf(true);

  return (
    <View>
      {items.map((text, index) => {
        const mark = marks[index];
        const onThread = mark !== 'earlier';
        const isLast = index === items.length - 1;
        return (
          <View
            key={text}
            style={[
              styles.row,
              isLast && last ? styles.endsSection : null,
              !onThread ? [styles.detached, { borderTopColor: theme.goldSoft }] : null,
            ]}>
            <View
              style={styles.spine}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants">
              {onThread && index > 0 && (
                <View style={[styles.thread, styles.threadTop, { backgroundColor: theme.goldSoft }]} />
              )}
              {onThread && index < lastOnThread && (
                <View style={[styles.thread, styles.threadBottom, { backgroundColor: theme.goldSoft }]} />
              )}
              <View style={styles.mark}>
                <Mark kind={mark} accent={theme.accent} gold={theme.gold} ground={theme.background} />
              </View>
            </View>
            <ThemedText type="default" style={styles.text}>
              <TeachingBulletText text={text} />
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

function Mark({
  kind,
  accent,
  gold,
  ground,
}: {
  kind: TimelineMark;
  accent: string;
  gold: string;
  ground: string;
}) {
  if (kind === 'start') {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Circle cx={10} cy={10} r={8} fill={ground} />
        <Circle cx={10} cy={10} r={5.25} fill="none" stroke={accent} strokeWidth={1.5} />
      </Svg>
    );
  }
  if (kind === 'pairs') {
    return (
      <Svg width={20} height={34} viewBox="0 0 20 34">
        <Rect x={3} y={4} width={14} height={28} rx={7} fill={ground} />
        {[0, 1, 2].map((row) => (
          <G key={row} opacity={1 - row * 0.3}>
            <Circle cx={7} cy={10 + row * 8} r={2} fill={accent} />
            <Circle cx={13} cy={10 + row * 8} r={2} fill={accent} />
          </G>
        ))}
      </Svg>
    );
  }
  const outline = kind === 'earlier';
  return (
    <Svg width={26} height={20} viewBox="0 0 26 20">
      <Rect x={0} y={3} width={26} height={14} rx={7} fill={ground} />
      {[4.5, 10.5, 20.5].map((cx) => (
        <Circle
          key={cx}
          cx={cx}
          cy={10}
          r={2.25}
          fill={outline ? ground : gold}
          stroke={gold}
          strokeWidth={outline ? 1.25 : 0}
        />
      ))}
    </Svg>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: Teaching.bullet.marginBottom,
  },
  endsSection: {
    paddingBottom: Teaching.page.sectionGap,
  },
  detached: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Teaching.bullet.marginBottom,
  },
  spine: {
    width: SPINE,
    position: 'relative',
  },
  thread: {
    position: 'absolute',
    left: SPINE / 2,
    width: StyleSheet.hairlineWidth,
  },
  threadTop: {
    top: 0,
    height: MARK_Y,
  },
  threadBottom: {
    top: MARK_Y,
    bottom: 0,
  },
  mark: {
    position: 'absolute',
    top: MARK_Y - 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
});
```

  Add the `Teaching` import line you found in Step 4's first sentence. If `theme.background` is not a token (check `src/constants/theme.ts`), use the token the reference screen paints its page with and name it in the report.

- [ ] **Step 5: Render it.** In `Section` in `src/app/reference/[id].tsx`, replace the bullets block (currently `{bullets.map((text, index) => ( <TeachingBullet …> … ))}`) with:

```tsx
      {section.timeline && section.timeline.length === bullets.length ? (
        <TeachingTimeline items={bullets} marks={section.timeline} last={trailing === 'bullets'} />
      ) : (
        bullets.map((text, index) => (
          <TeachingBullet key={text} last={index === bullets.length - 1 && trailing === 'bullets'}>
            <TeachingBulletText text={text} />
          </TeachingBullet>
        ))
      )}
```

  and add `import { TeachingTimeline } from '@/components/teaching/timeline';` beside the other teaching imports.

- [ ] **Step 6: Mark the section.** In `QIYAM_AL_LAYL`'s `order` section (Task 3), directly after `bullets`:

```ts
      timeline: ['start', 'pairs', 'closing', 'earlier'],
```

- [ ] **Step 7: Run the checks.**
  Run: `npx tsc --noEmit && npm run night:check && npm run style:check && npm run nav:check`
  Expected: `tsc` clean; `night:check` prints `night order: drawn as start, pairs, closing, earlier` and the final `✓`; `style:check` unchanged; `nav:check` shows only its pre-existing finding.

- [ ] **Step 8: Look at it (controller).** 360pt, dark then light, `/reference/qiyam-al-layl`, "What comes first?". Check:
  - the thread meets each mark flush, with no gap between rows;
  - the marks centre on each bullet's first line;
  - the earlier row sits below its hairline, off the thread;
  - gold appears only on the closing marks;
  - nothing wraps into the spine.
  Adjust `MARK_Y`, the mark boxes or the row padding, never a local `fontSize`.

- [ ] **Step 9: Record it.**
  - Add to `docs/curriculum-review-pile.md`, "The night prayers": `- **The drawn order** on the night-prayer page: pairs of dots for night prayer, two-then-one for shafʿ and witr, the outline for praying them before sleep. A drawing that teaches a count is content (CLAUDE.md); check the marks say what the bullets say.`
  - Add to `docs/ui-redesign-plan.md` under "The audit, 13 Sep": `- **The order of the night is drawn**, not listed: a thread with marks that are the rakʿahs (TeachingTimeline). The bullets stay the words.`

- [ ] **Step 10: Commit.**

```bash
git add src/content/types.ts src/components/teaching/timeline.tsx 'src/app/reference/[id].tsx' src/content/learn/voluntary-prayers.ts scripts/night-check.mjs docs/curriculum-review-pile.md docs/ui-redesign-plan.md
git commit -m "Night-prayer page draws the order: marks that are the rakʿahs"
```

---

## Self-review

- **Spec coverage (Part 2):**
  - The rename: Tasks 1 and 2.
  - The order: Task 3.
  - Shafʿ as a term, and shafʿ not being the sunnah of ʿIsha: Task 2.
  - Early witr as sound: Task 2's "When".
  - Taraweeh women, finishing the Qur'an, and the add-a-rakʿah note: Task 4.
  - "Many", not "most": Task 3, Step 1.
  - Weak wordings (Nasaʾi 1746, Malik 250): not on any page; nothing to do.
  - The minimum of two light rakʿahs is ◐, so it is not printed. The page's existing "Two rakʿahs, on one night, is the thing itself" stands on IslamQA 50070 and Bukhari 6465.
- **Placeholder scan:** none. Every copy string and code block is final.
- **Type consistency:** `unitNames` is defined in Task 1, Step 3 and used in Steps 4–5. `spokenName` already exists (`src/content/prayers.ts:184`). The witr guide's step ids stay `r1-…` to `r3-…`.
- **Held, not in this plan:** the qunut guide step (a transliteration from a source and a recording).
- **Task 6 added 13 Sep 2026** on Iyad's approval of the drawn timeline. It consumes Task 3's `order` bullets, whose third line now ends "before Fajr" so the drawn line has an end without the drawing carrying words of its own.
