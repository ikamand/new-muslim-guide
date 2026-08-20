# Scholarly review queue

Everything in this app that a qualified person still needs to clear, and what
exactly they need to clear about it.

This is not "the model wrote it, please check". Every Qur'an reference and every
narration in the app has been opened, read, and matched against the sentence it
sits under — 52 Qur'an references and now **90 distinct narrations**, listed in
full by `npm run content:audit`. Three citations did not say what they were
being used to say and were corrected; four factual errors have now been fixed.
What is left is what a script cannot settle: whether a ruling is right, whether
a wording is the one a text should have, and whether an attribution to a school
is true.

**Second pass — core worship, 20 August 2026.** The prayer, wudu, ghusl, the
shahada and what breaks the prayer were taken back to the sources. Twenty-four
narrations were added, each opened on its collection page before it was written
down. Two more factual errors were found and corrected — the app told people to
repeat a prayer after speaking by mistake when Sahih Muslim 537a shows the
Prophet ﷺ did not send that man back, and it told them a full wash was due
after madhi when Sahih al-Bukhari 132 says wudu. Items 1.1 through 1.5, 1.8,
2.6 and 2.7 below carry what changed; one item (2.7) is **resolved**, one new
one (1.5a) was **opened**, and none was struck without an answer.

**How far the checking went — first pass.** Every Qur'an reference was fetched
and read.
Every narration was fetched, and for each one three fields were compared against
the collection page: the in-book reference, the grading, and who gave the
grading. Sixty-five of sixty-six matched; the one that did not (Sahih Muslim
1342, off by four hundred in its in-book number) was corrected. The Arabic of
every duʿa and every prayer recitation was compared letter for letter against
the page it cites, with the vowel marks stripped, and all twenty-three matched.
None of that tells you the content is *right* — only that it is what it says it
is, and that nothing here was invented.

Two jobs, and they are different people's:

- **Text review.** Arabic spelling, vowel marks, grammar, transliteration.
  Iyad reads and writes Arabic and can clear this.
- **Substance review.** Whether a ruling is correct, whether a narration
  supports the use made of it, whether a school really holds what it is said to
  hold. This needs a qualified person and nothing below is cleared without one.

Each item names the file, the exact claim, what backs it today, and the question
a reviewer is being asked. Where the answer is "yes, that is right", the item can
be struck and the ⚠️ in the source file removed with it.

---

## PRIORITY 1 — must review before any public religious release

Wrong answers here change how someone worships.

### 1.1 The shahada without witnesses

**RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/shahada.ts`, step `say`
- **Was** One sentence running two questions together: "No witnesses are needed
  for this to count, and no imam has to be present. Many people do say it in
  front of others, and a mosque can give you a certificate…" — with nothing
  behind any of it.
- **Now** The two questions are separated on the screen. The step says "You are
  Muslim from the moment you say it and mean it. Nobody has to be there, and no
  imam has to be present." A separate `agreed` note handles documentation:
  getting it written down is worth doing "not because your Islam needs one, but
  because other people's paperwork sometimes does."
- **Source** It is still a negative, so the citation is to scholars answering
  the exact question rather than to a text. Two, deliberately from different
  traditions so it is not one school twice:
  - Islam Question & Answer, fatwa 49715 — "In order for a person to become
    Muslim, it is not essential for him to declare his Islam before anyone.
    Islam is a matter that is between a person and his Lord." On certificates:
    "there is nothing wrong with that, but it should be done without making
    that a condition of his Islam being valid."
  - SeekersGuidance, Shaykh Abdullah Anik Misra — "If one declares the
    testimony of faith in any way or form, even alone, that is enough for them
    to be considered a Muslim", with the historical note that witnesses were
    asked for in Muslim courts because inheritance and marriage law followed a
    person's religion.
- **Reviewer** Both halves still want confirming, and the split itself is worth
  a judgement: is separating religious validity from administrative proof the
  right thing to put in front of someone in their first ten minutes, or does
  mentioning paperwork at all plant a doubt?

### 1.2 What makes ghusl obligatory

**ONE ERROR CORRECTED. RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/ghusl.ts`, step `when`
- **Was** "Ghusl is required after sex or any release of sexual fluid, and
  after a period or post-natal bleeding ends."
- **The error** "Any release of sexual fluid" swept together two things the
  books keep carefully apart. Madhi — the thin clear fluid of arousal —
  requires wudu and washing the part, not a full wash: `Ali was too shy to ask
  and sent al-Miqdad, and the answer was "it requires wudu" (**Sahih al-Bukhari
  132**, Book 3 Hadith 74, opened and read). As written the app would have sent
  people for a wash they did not owe, on a subject they are least likely to ask
  a human about.
- **Now** "Ghusl is required after sex — whether or not anything was released —
  and after any release of semen, including in your sleep. It is required when
  a period ends, and when bleeding after childbirth ends." An `agreed` note
  beside it names madhi explicitly and says what to do instead.
- **Sources, each opened and matched**
  - Qur'an 5:6 (janabah), Qur'an 2:222 (menstruation) — unchanged.
  - **Sahih al-Bukhari 291** (Book 5, Hadith 43) and **Sahih Muslim 348a**
    (Book 3, Hadith 105) — intercourse obliges the wash with or without
    emission. Muslim files 348a under a chapter recording that the earlier
    ruling, "the water is from the water", was **abrogated**; the app therefore
    does *not* cite Muslim 343a, which carries the abrogated wording.
  - **Sahih al-Bukhari 282** (Book 5, Hadith 34) — Umm Sulaim's question:
    a wet dream obliges the wash "if she notices a discharge".
  - **Sahih al-Bukhari 132** (Book 3, Hadith 74) — madhi requires only wudu.
  - **Sunan Abi Dawud 311** (Book 1, Hadith 311, graded hasan sahih by
    Al-Albani; recorded in the data as `hasan`, the lower of the two) — Umm
    Salama: women refrained from prayer for forty days after childbirth.
- **The gap that remains, and it is a real one** Abu Dawud 311 establishes
  nifas as a state that stops the prayer. That a ghusl is what *ends* it is
  drawn by the books from its parallel with menstruation, not from a text
  naming it. The app states it flatly.
- **Reviewer** Is the corrected list right and complete for a beginner? Is the
  nifas sentence safe resting on an analogy the app does not show the reader?

### 1.3 Ghusl on becoming Muslim — obligatory or recommended

**A SECOND, STRONGER SOURCE ADDED. SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/ghusl.ts`, `differs` note on step `when`;
  `src/content/shahada.ts`, step `after`
- **Claim** Unchanged. The app teaches "do it", and holds the difference in a
  note: Hanbali — obligatory; Shafi`i — recommended unless a ghusl was already
  due.
- **What changed** The note rested on Sunan Abi Dawud 355 alone. It now also
  carries **Sahih al-Bukhari 462** (Book 8, Hadith 110), which Bukhari files
  under a chapter headed *"To take a bath on embracing Islam"*: Thumamah ibn
  Uthal was released, went to a grove of date-palms, washed, came back into the
  mosque and said the shahada. That moves the practice out of the Sunan and
  into the Sahih, which matters for how much weight the recommendation carries.
- **Reviewer** Unchanged question: are the two attributions correct as stated?
  Sources consulted also place Malik with the obligatory view and Abu Hanifa
  with the recommended one; those were left out rather than asserted. Should
  they be in?

### 1.4 The wudu nullifiers

**REBUILT. RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/wudu.ts`, step `intention`
- **Was** One flat sentence: "Wudu lasts until it is broken — by using the
  toilet, passing wind, or deep sleep." Bukhari 135 sat under it and covers
  the first two only. The same three-item list also appeared, worded
  differently, in `learn/before-prayer.ts`.
- **Now** Three pieces instead of one:
  1. The plain note says only what it can: "One wudu covers as many prayers as
     you like. It lasts until something breaks it" — sourced to **Sahih
     al-Bukhari 214** (Book 4, Hadith 80), Anas: "one wudu sufficed us as long
     as we did not break it."
  2. An `agreed` note carries the settled core — anything leaving the front or
     back passage, and sleep deep enough that you would not have noticed —
     with **Qur'an 5:6**, **Bukhari 135**, and **Sunan Abi Dawud 203** (Book 1,
     Hadith 203, hasan — Al-Albani), which is the sleep narration the old list
     was missing.
  3. A `differs` note carries the two a beginner actually meets, with all four
     schools named and stated as their holders state them.
- **The four attributions, and where they came from**

  | | Touching one's private parts | Skin contact with the opposite sex |
  |---|---|---|
  | Hanafi | does not break | does not break |
  | Maliki | breaks: deliberate, palm, with desire | breaks where there is desire |
  | Shafi`i | breaks: palm, no barrier, intent irrelevant | breaks: non-mahram adult |
  | Hanbali | breaks | breaks where there is desire |

  Each was cross-checked against at least two independent sources before being
  written down. The Hanafi position on the private parts is also recorded by
  **Tirmidhi himself** in his commentary on hadith 85 — "this is the saying of
  the people of Kufa and Ibn al-Mubarak" — which is the cleanest attribution in
  the app, because the collector states it in the collection.
- **The evidence the split rests on, all opened and read**
  **Jami` at-Tirmidhi 82** (sahih — Darussalam), Busrah bint Safwan: "whoever
  touches his penis should not pray until he performs wudu"; **Jami`
  at-Tirmidhi 85** (sahih — Darussalam), Talq ibn `Ali: "is it anything other
  than a piece of him?"; **Qur'an 5:6**, "or you have touched women", where the
  argument is whether the word means intercourse or contact; **Sunan Abi Dawud
  178** (sahih — Al-Albani), `A'isha: the Prophet ﷺ kissed her and prayed
  without washing again.
- **Deliberately left out** Camel meat, which **Sahih Muslim 360a** establishes
  and which is the Hanbali position. It is real and it is authentic; it is also
  something the app's reader will almost never encounter, and every item added
  to this list costs attention that the two contested ones need more.
- **Reviewer** Are the eight cells of that table right? Is the `A'isha
  narration safe to cite there — Abu Dawud himself notes the chain is broken
  (Ibrahim at-Taymi did not hear from her) while Al-Albani grades it sahih, and
  the app shows the grading without the caveat. And was leaving camel meat out
  the right call?

### 1.5 The prayer method as a whole

**REBUILT AND ANCHORED. RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/prayers.ts`
- **The diagnosis** The audit was right that this was a composite. Read
  together, the app taught hands raised to the **ears** (the Hanafi position),
  folded on the **chest** (a contemporary position no classical school holds
  for men), and the final sitting taken the **Hanafi** way. Three details from
  three places — a prayer nobody prays.
- **The fix** The physical method is now anchored to a single narration:
  **Abu Humayd as-Sa`idi's description in Sahih al-Bukhari 828** (Book 10,
  Hadith 222), given in front of a group of the companions who agreed with it.
  One narration covers the height of the hands at the takbir, the bow, the
  straightening, the prostration, and both sittings — so following it produces
  one coherent prayer. Where it is silent, the step cites the narration that
  speaks to that detail.
- **What actually changed on screen**

  | Detail | Was | Now | Why |
  |---|---|---|---|
  | Hands at the takbir | ear level | **shoulder level** | Bukhari 828 and Bukhari 735 both say shoulders. Muslim 391b says ears and is in the `differs` note |
  | Hands at the bow and rising | not mentioned | **raised again** | Bukhari 735 states it plainly; the app had simply omitted it. Hanafi position in the note |
  | Folding the hands | inside the takbir step | **its own step** | one screen, one action — and the contested detail gets its own note rather than competing with the takbir |
  | Final sitting | "sit as you did between the prostrations" | **left foot slid across, sitting on the ground** — in prayers that have two sittings | Bukhari 828 describes exactly this contrast. Fajr, with one sitting, is unchanged |
  | The index finger | "Many people raise the right index finger" | **an instruction**, with where each hand rests | Sahih Muslim 579a. It read as folklore and it is a narrated sunnah |
  | Stillness | not mentioned | **an `agreed` note in the first rakʿah** | Bukhari 793 — the man sent back three times. The commonest fault in a beginner's prayer |

- **Every movement citation, opened and read on the collection page**
  Bukhari 735 (Book 10, H129) raising the hands · Bukhari 740 (H134) right hand
  on the left **forearm** · Bukhari 793 (H188) stillness · Bukhari 812 (H207)
  the seven bones · Bukhari 828 (H222) the whole description · Muslim 391b
  (Book 4, H28) the ears · Muslim 579a (Book 5, H145) the hands and the finger
  · Abu Dawud 759 (Book 2, H369, sahih — Al-Albani) the chest · Bukhari 350
  (Book 8, H2) the rakʿah count's origin, cited with `role: 'context'`.
- **What Bukhari 740 does and does not establish** It says the right hand goes
  over the left **forearm**. It names no place on the body. That is why the
  hand-placement note exists and why it lists five positions rather than
  asserting one.
- **⚠️ THE ONE THING THIS PASS COULD NOT SETTLE — see 1.5a below.**
- **Reviewer** Is anchoring the method to Abu Humayd's narration the right
  editorial choice for an app with no madhhab? Is the resulting prayer one a
  named school would recognise?

### 1.5a The hands on the chest

**REVIEW REQUIRED — this is the one open decision in the prayer.**

- **File** `src/content/prayers.ts`, step `opening`, `handPlacementNote`
- **What the app teaches** "Rest your right hand over your left forearm, on
  your chest."
- **What backs it** **Sunan Abi Dawud 759**, graded **sahih by Al-Albani**:
  Tawus said the Prophet ﷺ placed his right hand on his left and folded them on
  his chest in prayer. It is what a great many people are taught today.
- **The problem, stated plainly** Tawus is a Successor, so the report is
  *mursal* — the companion is missing from the chain. And no classical school
  places a man's hands on the chest: Hanafi and Hanbali say below the navel,
  Shafi`i below the chest and above the navel, and the best-known Maliki
  position is not to fold them at all in an obligatory prayer. The app is
  therefore teaching, as its default, a position that is contemporary rather
  than classical — while the `differs` note names all five, says so, and tells
  the reader to follow whoever taught them.
- **Reviewer, and this is the question** Should the default stay on the chest,
  or move to a named school's position? Whichever way it goes it is a product
  decision as much as a religious one, and it is Iyad's to take with an answer
  in hand rather than the model's to take quietly.

### 1.6 Periods — the whole topic, and one section in particular

**REVIEW REQUIRED — untouched by the core-worship pass.**

- **File** `src/content/references.ts`, `PERIODS`
- **Claim** Prayers missed are not made up; fasts are. Ghusl when it ends.
  Bleeding outside the normal pattern does not stop you praying.
- **Source** Sahih al-Bukhari 321 and Sahih Muslim 335a for the asymmetry —
  Muslim files it under a chapter heading that states it outright. Qur'an 2:222
  for the ending.
- **The gap** The section `differences` says scholars differ on reciting Qur'an,
  touching a muṣḥaf, and entering a prayer hall, and gives **no positions and no
  sources** — it names a disagreement without describing either side. The
  section `irregular` (istihada) sends the reader to a knowledgeable person,
  which is right, but states the rule first.
- **Reviewer** This is the most sensitive content in the app and the only place
  it tells someone to stop praying. Read it whole. Specifically: should
  `differences` carry the actual positions, and is the istihada sentence safe
  standing alone?

### 1.7 The Ramadan exemptions

**REVIEW REQUIRED — untouched by the core-worship pass.**

- **File** `src/content/learn/ramadan.ts`, section `exempt`
- **Claim** "The Qur'an exempts anyone ill or travelling, who makes the days up
  later. In practice this also covers pregnancy, breastfeeding, menstruation,
  and conditions where fasting would cause harm."
- **Source** Qur'an 2:185 — which names illness and travel and nothing else.
- **The gap** Pregnancy and breastfeeding are the live one: schools differ over
  whether the days are made up, fidyah is paid, or both, and the answer depends
  on whether the fear is for the mother or the child. The app says "makes the
  days up later" and then, in a note, that the details are worked out case by
  case. The section is deliberately permissive — a first Ramadan is more often
  damaged by someone fasting who should not have.
- **Reviewer** Is the permissive framing right, and does "makes the days up
  later" mislead for the pregnancy and breastfeeding cases?

### 1.8 What breaks the prayer

**ONE ERROR CORRECTED. RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/learn/what-breaks-prayer.ts`
- **The error, and it was in the section the page exists for** The `speaking`
  section said: "Doing it by mistake, before you knew, is not a sin. You simply
  repeat the prayer." It cited Sahih Muslim 537a — and 537a establishes the
  opposite by omission. Mu`awiya ibn al-Hakam said "Allah have mercy on you" to
  a man who sneezed mid-prayer, and the Prophet ﷺ taught him the rule
  afterwards without scolding him and **did not send him back to pray again**.
  That silence is the classical evidence that speech out of ignorance or
  forgetfulness does not invalidate. The app was citing the narration and
  stating the reverse of what it establishes.
- **The list was also wrong-shaped** Four items, none cited where they were
  listed, one of them — "turning away from the qibla" — stated flatly when
  Bukhari's own chapter heading on hadith 403 includes those who held that
  someone who prays the wrong way by mistake does **not** repeat. Laughing out
  loud, which is agreed to invalidate and which a beginner praying beside a
  friend will actually meet, was missing entirely.
- **Now** Five items, each sourced, each with its exception: losing wudu,
  deliberate speech, eating or drinking, laughing out loud, and turning the
  body right away from the qibla or deciding to stop. Two new sections carry
  the exceptions — `qibla` (getting the direction wrong after doing your best
  does not break it, **Sahih al-Bukhari 403**, Book 8 Hadith 55, where a whole
  congregation turned around mid-Fajr) and `moving` (**Sahih al-Bukhari 516**,
  Book 8 Hadith 163, the Prophet ﷺ praying while carrying Umamah).
- **New sources** Bukhari 1200 (Book 21, Hadith 4) and Muslim 538a (Book 5,
  Hadith 41) for the abrogation of speech in prayer · Bukhari 403 · Bukhari 516
  · IslamWeb fatwa 298021 for laughing, which records Ibn al-Mundhir's
  consensus that laughing aloud invalidates and an-Nawawi's and Ibn Qudamah's
  reports that most held smiling does not · Islam Question & Answer fatwa 87749
  for the shape of the list, which states the exceptions the app now carries
  ("if one speaks by mistake or out of ignorance of the ruling, the prayer is
  not invalidated"; "merely smiling does not invalidate the prayer").
- **Reviewer** Is the five-item list right and sufficient for a beginner? Is
  "put it right and pray it again from the beginning" the right remedy for all
  five? And is the app right to lean on two fatwa sites for the shape of a
  list, where no single narration gives one?

### 1.9 The zakat threshold and the lunar year

**REVIEW REQUIRED — untouched by the core-worship pass.**

- **File** `src/content/pillars.ts`, `zakat`
- **Claim** "It applies only above a threshold, and only to wealth you have held
  for a full lunar year."
- **Source** Sahih al-Bukhari 8 for the pillar. Nothing for the nisab or the
  hawl — both are real, both come from narrations this audit did not open.
- **Reviewer** The record already sends the reader to someone local rather than
  to a number, which may be enough. Confirm, or say what the sentence should be.

### 1.10 Prayer time calculation by region

**REVIEW REQUIRED — untouched by the core-worship pass.**

- **File** `src/lib/prayer-times.ts`
- **Claim** A set of geographic boxes, each mapped to a calculation method.
- **Source** Flagged in the file as model-written. Not content, but it decides
  when the app tells someone to pray, which makes it a worship question.
- **Reviewer** Are the regional defaults the ones the mosques in those regions
  actually use, and is the Fajr/Isha angle right for high latitudes?

---

## PRIORITY 2 — should review

Real questions, but a wrong answer here misinforms rather than invalidates.

### 2.1 The distance that counts as a journey

- **File** `src/content/references.ts`, `TRAVELLING`, section `howfar`
- **Claim** "scholars put the line at roughly eighty kilometres, and differ on
  it and on how long you may keep shortening once you arrive"
- **Source** Deliberately none. No verse or narration gives a distance; the
  figure descends from the classical four burud, which the schools convert
  differently. A `differs` note now says so on the page.
- **Reviewer** Is eighty kilometres the right number to put in front of a
  beginner, or is naming any number worse than naming none?

### 2.2 Sujud al-sahw before or after the taslim

- **File** `src/content/references.ts`, `LOST_COUNT`, `differs` note
- **Source** Both orders are now cited, and both are in Bukhari: 1224 (Ibn
  Buhaina, before the taslim) and 1229 (Dhul-Yadain, after). Muslim 571a puts
  the doubt case before.
- **Reviewer** Confirm the note's "do it the way whoever taught you does it" is
  sound advice rather than a dodge.

### 2.3 The attributions in four `differs` notes

The app types an attribution rather than writing free text, so a position can be
`Hanafi`, `Maliki`, `Shafi`i`, `Hanbali`, `the majority`, `a minority`, or
`contemporary scholarship`. Four notes lean on the vaguer labels:

| File | Note | Labels used |
|---|---|---|
| `learn/food.ts` | supermarket meat | `contemporary scholarship`, `a minority` |
| `learn/clothing.ts` | covering the face | `the majority`, `a minority` |
| `learn/work.ts` | distance from a prohibited thing | `the majority`, `contemporary scholarship` |
| `learn/before-prayer.ts` | saying the intention aloud | `the majority`, `a minority` |

- **The problem** "A minority" is itself a claim about how many scholars hold a
  view, and nothing in the app establishes any of them. The labels were chosen
  to avoid naming a madhhab without a source, which was the right instinct, but
  they are not free of claim.
- **Reviewer** Replace with attributions that can be sourced, or drop the
  counting and say only that scholars differ.

### 2.4 Zakat al-fitr in money or in food

- **File** `src/content/learn/ramadan.ts`, section `eid`
- **What changed** The section used to say "a small fixed amount of food **or
  its value**", which states the Hanafi position as if it were the ruling. It
  now says food, with a `differs` note carrying Hanafi (value permitted) against
  the majority (the staple food the narration names).
- **Source** Sahih al-Bukhari 1503 — one sa` of dates or barley, before the Eid
  prayer.
- **Reviewer** Confirm the two attributions, and confirm the practical advice
  ("give it through whoever your mosque collects for, in the form they ask for").

### 2.5 Bismillah in wudu — sunnah or condition

- **File** `src/content/wudu.ts`, step `intention`
- **Source** Sunan Abi Dawud 101 (sahih — Al-Albani): "no wudu for one who does
  not mention the name of Allah over it".
- **Status** Not surfaced in the app, deliberately. The app tells everyone to
  say it, which satisfies every position, and telling a beginner that some hold
  wudu invalid without it would mostly make them doubt wudus already performed.
- **Reviewer** Agree, or say it should be a note.

### 2.6 Ghusl before Friday prayer

**RESEARCHED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/ghusl.ts`, step `when`, third `differs` note
- **Was** A flat "recommended — not required — before Friday prayer", resting
  only on Sahih al-Bukhari 877, whose wording is an imperative.
- **Now** A `differs` note that shows its working: "The narration that settles
  it says a wudu on Friday is fine and good, and a ghusl is better", carrying
  **Jami` at-Tirmidhi 497** (Book 4, Hadith 10, hasan — Darussalam), Samurah
  ibn Jundub. The two positions are stated as `the majority` (strongly
  recommended) against `a minority` (obligatory, reading Bukhari 877 as a
  command).
- **The find worth having** Tirmidhi records **ash-Shafi`i's own argument** on
  the page, which is a sourced attribution rather than an assertion about him:
  the command is `ʿalā-l-ikhtiyār lā ʿalā-l-wujūb` — a choice, not an
  obligation — because `Umar was addressing the congregation when `Uthman
  arrived having done only wudu, reproached him, and did not send him back to
  wash. The app's `additionalExplanation` now carries that story.
- **Reviewer** Confirm the reading, and confirm whether `the majority` /
  `a minority` are the right labels here or whether the four schools should be
  named — see 2.3, which is the same problem.

### 2.7 Ghusl for the two Eids rests on a weak narration

**RESOLVED — the recommendation now rests on the companions' practice.**

- **File** `src/content/ghusl.ts`, step `when`, fourth note
- **The question asked** Is a weak marfu` narration the right thing to lean on,
  or should the recommendation rest on the practice of the companions instead?
- **The answer** The second. **Muwatta Malik, The Two `Ids, Book 10 Hadith 2**
  (Arabic reference Book 10, Hadith 432): "Yahya related to me from Malik from
  Nafi that Abdullah ibn Umar used to do ghusl on the day of Fitr before going
  to the place of prayer." The app now leads with that, and the note says
  plainly that the marfu` narration "is graded weak by Darussalam, so it is not
  what the recommendation rests on and it is labelled here rather than quietly
  promoted."
- **Ibn Majah 1315 was kept**, still graded `daif`, still `role: 'practice'`,
  still printed by the audit with its grading. Deleting it would have hidden
  the actual state of the evidence, which is the thing this document exists to
  show.
- **One thing found next door** The hadith immediately after it, **Sunan Ibn
  Majah 1316**, is graded **Maudu` — fabricated — by Darussalam. The app does
  not use it and never has, and `assessEvidence` would block it for every role
  if anyone tried. Recorded here because it sits one line away from a citation
  the app does use.
- **Note for the reviewer, not a question** The Muwatta citation carries **no
  grading**, and the audit reports it under "from a collection that also
  carries weak narrations, ungraded". That is accurate rather than a gap:
  sunnah.com prints no grade on the Muwatta, and inventing one would break the
  rule this whole file rests on. Its chain — Malik from Nafi` from Ibn `Umar —
  is famous, but famous is not a grading.

### 2.8 "Step in with your left foot"

- **File** `src/content/duas.ts`, `enter-toilet` note
- **Source** None. It is the inverse of the general pattern in Sahih al-Bukhari
  168 (starting from the right in wearing shoes, combing, purification and all
  his affairs), not an explicit instruction.
- **Reviewer** Keep, soften, or drop.

### 2.9 "The best of you is the best to his family"

- **File** `src/content/learn/family.ts`, section `marriage`
- **Source** Jami` at-Tirmidhi 3895 (sahih — Darussalam). The Arabic is
  `khayrukum khayrukum li-ahlihi`; Darussalam renders ahl as "wives", the app
  renders it "families".
- **Reviewer** Which rendering should stand? The app's is more literal and
  broader; Darussalam's is narrower and is what the printed edition says.

### 2.10 Bukhari 6018 is doing more work than it can

- **File** `src/content/learn/sunnah.ts`, section `everyday`
- **Claim** "Much of it is small and human: greeting people first, eating with
  the right hand, saying a few words before sleeping, smiling."
- **Source** Sahih al-Bukhari 6018 — the neighbour, the guest, and saying
  something good or staying silent. It carries the section's thesis and none of
  the four examples.
- **Status** Two of the four are cited elsewhere in the app (Bukhari 5376 for
  the right hand, Bukhari 6324 for the words before sleeping). They were not
  copied here, because adding citations to a sentence they only half-fit is how
  a bibliography starts looking better than the content.
- **Reviewer** Reword the examples to what is cited, or accept the looser fit.

### 2.11 What a woman wears to a mosque

- **File** `src/content/references.ts`, `MOSQUE`, section `before`
- **Claim** "Women cover the hair, arms and legs."
- **Source** None here. `learn/clothing.ts` holds the subject properly, with
  Qur'an 24:31 and 33:59 and a `differs` note on the face and hands.
- **Reviewer** Is a flat sentence right in a page about not being embarrassed,
  given that the clothing lesson treats the same subject with more care?

### 2.12 Every English translation of an Arabic text

- **File** `src/content/recitations.ts`
- **Status** The Arabic is now verified against the collection page for all
  twenty-three texts. The English beside each one is the app's own and has been
  checked by nobody.
- **Reviewer** These are said in every prayer. Read them as translations, not as
  prose.

---

## PRIORITY 3 — nice to review

### 3.1 Arabic names on the pillars and articles pages

`src/content/pillars.ts`, `src/content/iman.ts` — the Arabic names and
transliterations are model-written and unchecked. They are labels rather than
words anyone says in worship, which is why they sit here; the vowel marks in
particular want a printed source.

### 3.2 The everyday phrases

`src/content/phrases.ts` — fourteen phrases, twelve of them ordinary speech with
no text to copy from. Spelling, vowel marks and the set replies want a native
speaker. Two are **not** ordinary speech and now carry references: what you say
on hearing of a death is Qur'an 2:156 word for word, and answering the salam is
instructed in 4:86.

### 3.3 Transliteration convention

The app uses academic transliteration with macrons and dots (`ṣalāh`, `wuḍūʾ`)
in recitations, and plain forms in prose (`Salah`, `wudu`). That split is
deliberate — the marked forms are a pronunciation crutch, the plain forms are
English words now. Worth one pass for consistency.

### 3.4 Al-Fatiha, verse by verse

`src/content/recitations.ts` — the Arabic matches the standard-orthography text
of all seven ayat exactly. The English rendering of each is the app's own.

### 3.5 French and Spanish

`src/i18n/content/fr.ts`, `src/i18n/content/es.ts` — 252 of 625 strings each,
model-written, needing a native speaker. Qur'an, dhikr and the prayer
instructions are deliberately absent and fall back to English.

Five entries have now been **deleted** rather than retranslated, each because
the English they were keyed to turned out to be wrong. Two in the first audit
(the fast ending "at nightfall", zakat al-fitr as "food or its value"); three in
the core-worship pass (speech in prayer by mistake meaning you repeat it, the
four-item list of what breaks the prayer, and the wudu paragraph in
`before-prayer`). All five now fall back to the corrected English.

### 3.6 Arabic UI

`src/i18n/ui.ts` — the Arabic, French and Spanish interface strings are
model-written. Getting "Repeat" wrong is a bug, not a religious error, which is
why this is here and not higher.

### 3.7 The seven audio clips

`src/content/audio.ts` — seven Al-Fatiha recordings, Mahmoud Khalil Al-Husary's
teaching recitation from everyayah.com, CC BY-NC. **Nobody has listened to
them.** Three things need an ear: that each file is the ayah its id claims, that
none is clipped, and that the tajwid is sound enough for a learner to copy. No
script can establish any of the three.

---

## What this audit changed rather than queued

Recorded here so a reviewer knows what has already moved.

| Where | Was | Now |
|---|---|---|
| `learn/ramadan.ts` | Bukhari **1899** cited for the Prophet's ﷺ generosity in Ramadan | Removed. 1899 is the gates of heaven opening and mentions neither generosity nor Jibril; Bukhari 6, already cited beside it, carries both |
| `learn/ramadan.ts` | the fast ends "at nightfall" | "at sunset" — an hour earlier, and consistent with the rest of the lesson and with the prayer times screen |
| `learn/ramadan.ts` | zakat al-fitr is "food **or its value**" | "food", with a `differs` note carrying the Hanafi and majority positions |
| `learn/islamic-calendar.ts` | Bukhari **3197** for "named them in his farewell sermon" | Bukhari **4406** — the same narration, in the chapter on the Farewell Pilgrimage |
| `learn/clothing.ts` | Bukhari **5828** for silk *and gold* forbidden to men | Sunan Abi Dawud **4057** (sahih — Al-Albani): silk in one hand, gold in the other, both forbidden to males. 5828 never mentions gold |
| `prayers.ts` | "Al-Ikhlas is **three** verses" | "four short verses". It has four, and `learn/who-is-allah.ts` already called it "four lines" while citing 112:1-4 |
| `tayammum.ts` | Bukhari 347 as "Book 7, Hadith 8" | "Book 7, Hadith 14" |
| `recitations.ts` | Muslim 1342 as "Book 15, Hadith 75" | "Book 15, Hadith 479" |
| `duas.ts` | forget the bismillah, "say it when you remember" | names the wording that is actually taught — `bismi-llāhi fī awwalihi wa ākhirih` — from Tirmidhi 1858 (sahih — Darussalam) |

And one thing that was checked and **left alone**: the shahada said after wudu
matches Sahih Muslim 234b word for word. It does not match Muslim 234a or Abu
Dawud 169, which are each one word different, and stopping at those would have
led to "correcting" a text that was already right.

---

## What the core-worship pass changed rather than queued

| Where | Was | Now |
|---|---|---|
| `learn/what-breaks-prayer.ts` | speech by mistake means "you simply repeat the prayer" | "He was not told to pray it again." Muslim 537a establishes the opposite of what the app said while citing it |
| `ghusl.ts` | ghusl required after "any release of sexual fluid" | mani yes, **madhi no** — Bukhari 132, `Ali's question through al-Miqdad. The old wording sent people for a wash they did not owe |
| `prayers.ts` | hands raised to **ear** level | **shoulder** level, from Bukhari 828 and 735. The ear-level narration, Muslim 391b, is in the `differs` note |
| `prayers.ts` | final sitting = "sit as you did between the prostrations" | in prayers with two sittings, the left foot slides across and you sit on the ground — which is what Bukhari 828, already the app's anchor, describes |
| `prayers.ts` | hands not raised at the bow or on rising | raised, per Bukhari 735. The app had simply omitted a movement three schools make |
| `prayers.ts` | "Many people raise the right index finger" | an instruction with Sahih Muslim 579a behind it. It read as folklore and it is a narrated sunnah |
| `prayers.ts` | no citation on any physical movement | nine narrations, each opened and read, listed at 1.5 |
| `ghusl.ts` | Eid wash rested on Ibn Majah 1315 (daif) alone | rests on Ibn `Umar's practice in the Muwatta; the weak narration is kept, labelled, and explicitly said not to be what it rests on |
| `ghusl.ts` | Friday wash "not required", flat | a `differs` note carrying Tirmidhi 497 and ash-Shafi`i's own argument as Tirmidhi records it |
| `wudu.ts` | three nullifiers, one of them uncited | an `agreed` core with Bukhari 135, Qur'an 5:6 and Abu Dawud 203, plus a `differs` note naming all four schools on the two contested ones |
| `wudu.ts` | no citation on any washing step | Bukhari 159, 164, 168, 185, 214, Abu Dawud 135, Tirmidhi 788 — the method is sourced step by step |
| `learn/before-prayer.ts` | its own three-item wudu nullifier list | points at the wudu guide instead. One list in two files is how two files come to disagree |
| `shahada.ts` | the witness sentence, unsourced | two independent scholarly answers, and religious validity split from administrative proof |
| `scripts/content-audit.mjs` | "Narrations — 333" (uses) | "Narrations — 90 distinct, 333 uses". The five generated prayers carry the same method citations, and a reviewer wants the number they have to check |

Three Spanish and three French translations were **deleted** rather than
retranslated, following the rule set in the first pass: the English they were
keyed to had changed, and a stale translation of a corrected sentence is worse
than the English fallback. They were the speech-by-mistake sentence, the
four-item list of what breaks the prayer, and the wudu paragraph in
`before-prayer`.
