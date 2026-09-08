# Curriculum update — the agreed changes

**Status:** locked 7 Sep 2026, fully built 8 Sep 2026. What remains is the one-sitting review of every new page, from the ranked list below. Iyad's proposal, audited against
every lesson it named, then agreed item by item. This document is the
record of what was decided and why; `docs/learn-redesign-plan.md` §3 is the
map it amends. When a decision here changes, change it here.

**The one rule that shaped it:** don't add content to hit a number. Of the
twenty-seven items proposed, ten were already built as described and are
untouched; four were merged into other pages; one is deferred. Twelve new
pages, one rename, two phrases, one new chapter.

**The review happens once, at the end.** Iyad reviews every new page in a
single sitting from a ranked bullet list written when the last phase lands.
The three ruling-heavy pages are written last so they wait unreviewed the
shortest time. Nothing here ships to the public track before that sitting.

---

## Already there — confirmed, no change

Each was read in full during the audit (7 Sep 2026).

| Proposed | Where it already is |
|---|---|
| Five Pillars, all five | `src/content/pillars.ts` — five records, each cited to Bukhari 8 |
| Six Articles, all six, one lesson | `src/content/iman.ts` — six records on one screen, Muslim 8a |
| Must, should, may reframed | `src/content/learn/rulings.ts` — opens "Is everything I read a rule?", first fact "Five, not two" |
| How prayer works, body and sequence | `src/content/learn/how-prayer-works.ts` — the rakʿah as bullets, the joints, the counts |
| Halal and haram beyond food | `src/content/learn/halal-and-haram.ts:34` — "not just food: how you earn money, how you speak about people, what you wear" |
| Why people differ, not divided | `src/content/learn/why-people-differ.ts` — four schools, all Sunni, "far less than the noise suggests" |
| When someone corrects you, reframed | `src/content/learn/being-corrected.ts` — "usually means two schools, not one liar"; "follow the one your mosque follows" |
| The lunar year as foundation | `src/content/learn/islamic-calendar.ts` — the lunar year is the hero section |
| Names of Allah as a door | `src/content/curriculum.ts` — a door in two units and a daily card, never a lesson |
| A Qur'an pathway | The Qur'an tab, deliberately not in Learn (`src/app/(tabs)/quran.tsx` header). Arabic letters stay out of scope (Iyad, 25 Aug). "Basic understanding" is the word-by-word item in `docs/learning-model.md`, blocked on a source. |

## What this plan removes from the proposal

- A separate Umrah page — one combined page instead.
- A separate "Building a daily routine" page — it and "Becoming consistent"
  were the same lesson twice.
- A separate "Day of Judgment" page — the arc from death to the Day is one
  story, and splitting it puts the grave alone on a page, which is the
  frightening version by construction.
- "Why does Islam have so many rules?" — deferred. Rulings, halal-and-haram
  and what-is-islam's "Is it meant to be this hard?" already answer it
  inward; only the outward, say-it-at-the-table version would be new.

## Decisions taken while locking

- **The chapter band widens to 2–7.** Four chapters go to seven lessons.
  Allowlisting four exceptions would turn the check in
  `scripts/content-audit.mjs:146` into a list of reasons to ignore it, so the
  band changes and `SMALL_UNITS` stays empty.
- **Building consistency lives in Book 2, not Book 3.** The person who needs
  it is in week three, dropping habits taken on too fast. It sits immediately
  before if-you-stopped: prevention, then cure. "Practices to take on" stays
  at two lessons, which is where it was before the proposal.
- **The after-death page teaches the questioning in the grave**, in one plain
  paragraph among six sections, because a convert hears of it from someone
  within the year and the calm version should arrive first. Iyad's call.
- **Sincerity opens "The interior life"**: the thing to aim at before the four
  things to avoid.
- **The creed chapter opens Book 3**, mirroring Book 1's creed-first order.
  It has no "Allah" lesson — who-is-allah is in Book 1 and the Names door is
  the deeper study.

---

## The pages

Every page: model-written English over citations opened in the corpus
(`.cache/hadith`, `.cache/quran`), a ⚠️ header saying so, a cadence entry, a
line in `src/content/learn/index.ts`, and an FR/ES gap until retranslated.
Muslim numbers found in the corpus are its sequential numbering and must be
mapped to the app's before they are printed — see the memory on Muslim's two
numberings and `src/content/learn/islamic-calendar.ts` for the pattern.

### Book 1 — Your first weeks

| Chapter | Lesson | Kind | Reuses | Review |
|---|---|---|---|---|
| Who you follow | **Where do Islamic rulings come from?** NEW · before rulings, after sunnah | Lesson | sunnah page for step two; points forward to why-people-differ for step three. Qur'an 4:59, 16:43 (verified); Bukhari 7352 (already cited) | low |
| How to pray | **What to say in prayer** NEW · after how-prayer-works | Lesson | one section per moment, each rendering its `says` recitation from `src/content/recitations.ts` through the card at `src/app/reference/[id].tsx:296`; Al-Fatihah linked, not rendered. Not one Arabic character copied | low — texts already reviewed; new claims are only where each is said |
| How to pray | **When you don't know everything yet** REVISED · rename of "The least you can do" | Lesson | `src/content/learn/minimum-prayer.ts`, id and substance unchanged, first heading retitled. Five references to update: `how-prayer-works.ts:95`, `if-you-stopped.ts:62`, `curriculum.ts:146`, `illustrations.tsx:833`, the review doc if it names the title | none |
| When it goes wrong | **I made a mistake and finished praying** NEW · last | Lesson **and** Situation: surface `pray`, in the help sheet's `mistakes` list beside lost-count and missed | Bukhari 757 and the sujud al-sahw citations already on lost-count. The answer branches: a pillar, a required act, a recommended act, and how long ago you noticed | **highest** — every branch is a ruling |
| Everyday words | **Allāhu akbar · Allāhu aʿlam** REVISED | phrase entries | akbar reuses the Arabic of `Recitations.takbir`; aʿlam is three new words on the phrases' existing P3 line | text check |

### Book 2 — The life that follows

| Chapter | Lesson | Kind | Reuses | Review |
|---|---|---|---|---|
| People | **Intimacy, modesty and purification** NEW · after a-partner-already | Lesson | ghusl guide for when the wash is due (Bukhari 291, Muslim 348a, already there); marriage-shape and your-partner linked. Qur'an 2:187 (already cited), 2:222 (verified); Muslim on a spouse's privacy (corpus seq. 3542, map) | **high** |
| The year | **Hajj and Umrah** NEW · after eid | Lesson | the Hajj pillar gets `teaches` → this page, as the fasting pillar does for Ramadan (`src/content/types.ts:179`). Qur'an 3:97 (already cited), 2:196 (verified); Muslim, Umrah-to-Umrah (corpus seq. 3289, map) | medium — conditions of obligation |
| When it's hard | **Building consistency** NEW · before if-you-stopped | Lesson | links small-sunnahs (what to take on) and if-you-stopped (after a lapse), repeats neither. Bukhari 6464, 6461, 6462 (read in corpus); 1970 (read); 39 (already cited) | low |
| When it's hard | **What if my family doesn't accept my Islam?** NEW · after patience-and-gratitude, before who-can-i-talk-to | Lesson | starts where family's "Do I have to tell them?" and your-mother's "What if they ask me to do something wrong?" stop. Safety hands to who-can-i-talk-to and the crisis matcher. Qur'an 31:15 (already cited), 60:8 (verified); Bukhari 2620, Asmāʾ's mother (verified) | low |

### Book 3 — Going deeper

| Chapter | Lesson | Kind | Reuses | Review |
|---|---|---|---|---|
| **What you believe more deeply** (NEW chapter, first) | door: Names of Allah | Door | `collection:quranic-names` | — |
| ″ | **Angels** NEW | Lesson | opens from the article record; Muslim 8a | medium |
| ″ | **The prophets** NEW | Lesson | links who-is-muhammad and what-about-jesus for the two men it does not describe | medium |
| ″ | **The revealed books** NEW | Lesson | links what-is-the-quran; says nothing about the Qur'an's own shape | medium |
| ″ | **What happens after death** NEW · one page | Lesson | six sections: dying, the grave, the wait, the resurrection, the reckoning, the two destinations. The Day is the hero; the grave is one calm section | **high** — narrations with specific wording |
| ″ | **Qadr** NEW | Lesson | the article record's own note; Tirmidhi 2517 "tie it and rely" (verified, hasan per Shakir; read al-Albani's grade before use) | **high** |
| The interior life | **Sincerity** NEW · first | Lesson | Bukhari 1 (cited by the shahada guide), Qur'an 98:5 (verified); Muslim 2985 on showing-off linked as its counterpart | low |

Chapter sizes after: who-you-follow 7, how-to-pray 7, people 7, the-year 7,
when-its-hard 6, interior-life 5, what-you-believe 5 + door, practices 2.

---

## Build order — the pilot rule applies

1. ✅ **Phase 1**, built 7 Sep 2026 — the rename and its references (two of
   the five named were by id, not title, and needed no change); the two
   phrases. Both pages screenshotted in both themes.
2. ✅ **Phase 2 pilot**, built 8 Sep 2026 — What to say in prayer (eleven
   sections, ten recitation cards, no practice links until the prayer's own
   words are recorded) and the family page. Both screenshotted in both
   themes with their chapter screens; the band widened to 2–7 in the same
   commit. **Awaiting Iyad's eyes before the rest.**
3. ✅ **Phase 2–4, the low-risk pages**, built 8 Sep 2026 — Where rulings
   come from · Hajj and Umrah · Building consistency · Sincerity. Each
   screenshotted in both themes; the Hajj pillar now doors to its page; the
   Year and Interior-life chapter summaries name the new lessons.
4. ✅ **Phase 5**, built 8 Sep 2026 — the chapter "What you believe more
   deeply" opens Book 3 with Angels, The prophets and The revealed books,
   the Names door, and after-death and qadr declared in `COMMISSIONED` so
   the audit counts them as work. Screenshotted in both themes with the
   chapter and tier screens. Also fixed here: the two Phase 1 phrases had
   no cadence row and the audit had been failing on them since.
5. **Phase 6, held until last** — ✅ What happens after death and Qadr,
   built 8 Sep 2026, completing the creed chapter at five lessons. The
   after-death page's hero is its first section, because a hero renders at
   the top wherever it sits and the arc has to read in order. ✅ Intimacy
   and I made a mistake and finished praying, built the same day; the
   mistake page is surface `pray` and sits in the help sheet's mistakes
   list as well as the chapter. All twelve pages are built.
6. **Then the review pile**: one ranked bullet list of every new page and its
   sensitive claims, for one sitting.

Each phase ends `tsc --noEmit` clean with `content:audit`, `style:check`,
`i18n:manifest` and `content:verify` run, committed and pushed. All of it is
`src/`; it ships by `npm run update:preview`. No native change.

## Cost, plainly

Twelve model-written pages joining the review pile that gates release, three
of them rulings. A new chapter key and about a dozen new lesson titles that
drop FR and ES to English with a `TranslationGap` until retranslated. One
band widened in a check, with the reason above.
