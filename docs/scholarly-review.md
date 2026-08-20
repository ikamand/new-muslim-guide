# Scholarly review queue

Everything in this app that a qualified person still needs to clear, and what
exactly they need to clear about it.

This is not "the model wrote it, please check". Every Qur'an reference and every
narration in the app has now been opened, read, and matched against the sentence
it sits under — 52 Qur'an references and 66 narrations, listed in full by
`npm run content:audit`. Three citations did not say what they were being used
to say and were corrected; one factual error and one wording error were fixed.
What is left is what a script cannot settle: whether a ruling is right, whether
a wording is the one a text should have, and whether an attribution to a school
is true.

**How far the checking went.** Every Qur'an reference was fetched and read.
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

- **File** `src/content/shahada.ts`, step `say`
- **Claim** "No witnesses are needed for this to count, and no imam has to be
  present."
- **Source** None, and none is possible: it is a negative. Nothing in the texts
  makes witnesses a condition, and an app cannot cite an absence.
- **Why it matters** This is the most consequential sentence in the app. A
  person who believes they need a mosque and two witnesses may wait weeks, or
  never go. A person told wrongly that they need nothing may later find their
  conversion questioned for a marriage or a pilgrimage visa.
- **Reviewer** Confirm the sentence as stated, and confirm the second half —
  that a mosque certificate is worth getting for administrative reasons even
  though it is not a condition of validity.

### 1.2 What makes ghusl obligatory

- **File** `src/content/ghusl.ts`, step `when`
- **Claim** "Ghusl is required after sex or any release of sexual fluid, and
  after a period or post-natal bleeding ends. Until you have done it, wudu is
  not enough and prayer is not valid."
- **Source** Qur'an 5:6 (janabah), Qur'an 2:222 (menstruation).
- **The gap** Post-natal bleeding (nifas) is not named in either verse; it is
  established elsewhere. "Any release of sexual fluid" is a compression of a
  distinction the books draw carefully — between madhi and mani, and between
  intercourse with and without emission.
- **Reviewer** Is the list right and complete for a beginner, and is the
  compression safe or does it make someone wash when they need not, or worse,
  not wash when they must?

### 1.3 Ghusl on becoming Muslim — obligatory or recommended

- **File** `src/content/ghusl.ts`, `differs` note on step `when`;
  `src/content/shahada.ts`, step `after`
- **Claim** The app teaches "do it", and holds the difference in a note:
  Hanbali — obligatory; Shafi`i — recommended unless a ghusl was already due.
- **Source** Sunan Abi Dawud 355 (sahih — Al-Albani): Qays ibn `Asim came
  intending to accept Islam and was told to bathe.
- **Reviewer** Are those two attributions correct as stated? Sources consulted
  also place Malik with the obligatory view and Abu Hanifa with the recommended
  one; those were left out rather than asserted. Should they be in?

### 1.4 The wudu nullifiers

- **File** `src/content/wudu.ts`, step `intention` note
- **Claim** "Wudu lasts until it is broken — by using the toilet, passing wind,
  or deep sleep."
- **Source** Sahih al-Bukhari 135 covers hadath and Abu Huraira glosses it as
  passing wind. Deep sleep is not in it.
- **The gap** This is a three-item list where the books have a longer one, and
  where the schools differ on several entries — touching the private parts,
  touching the opposite sex, and what depth of sleep counts.
- **Reviewer** Is a three-item list the right teaching for a beginner, and are
  these the right three?

### 1.5 The prayer method as a whole

- **File** `src/content/prayers.ts`
- **Claim** Every physical instruction in the five prayers: hands raised to ear
  level, right hand over left **on the chest**, sitting on the left foot with
  the right upright, the index finger raised during the testimony.
- **Source** The **words** are now each cited — Bukhari 795, 831, 3370, Muslim
  772, Abu Dawud 775, 874, 996. The **movements** are not, and several of them
  are exactly where the schools part company (hand position above all).
- **Why it matters** This is the app's spine and the thing it exists for. A
  beginner following it should end up praying one school's prayer coherently,
  not a composite that belongs to nobody.
- **Reviewer** Is the method taught internally consistent, and is it one that a
  named school would recognise as its own?

### 1.6 Periods — the whole topic, and one section in particular

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

- **File** `src/content/learn/what-breaks-prayer.ts`, section `breaks`
- **Claim** "Losing your wudu. Speaking on purpose. Eating or drinking. Turning
  away from the qibla, or leaving the prayer entirely."
- **Source** Speaking has Sahih Muslim 537a further down the page. The other
  three are stated flat.
- **Reviewer** Is the four-item list correct and sufficient, and is "start the
  prayer again" the right remedy for all four?

### 1.9 The zakat threshold and the lunar year

- **File** `src/content/pillars.ts`, `zakat`
- **Claim** "It applies only above a threshold, and only to wealth you have held
  for a full lunar year."
- **Source** Sahih al-Bukhari 8 for the pillar. Nothing for the nisab or the
  hawl — both are real, both come from narrations this audit did not open.
- **Reviewer** The record already sends the reader to someone local rather than
  to a number, which may be enough. Confirm, or say what the sentence should be.

### 1.10 Prayer time calculation by region

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

- **File** `src/content/ghusl.ts`, step `when` note
- **Claim** "recommended — not required — before Friday prayer"
- **Source** Sahih al-Bukhari 877, whose wording is an imperative: "Anyone of
  you attending the Friday prayers should take a bath."
- **Reviewer** The four schools read it as strongly recommended and a minority
  has read it as obligatory. Confirm the app's flat "not required".

### 2.7 Ghusl for the two Eids rests on a weak narration

- **File** `src/content/ghusl.ts`, step `when`
- **Source** Sunan Ibn Majah 1315, graded **da'if** by Darussalam, cited with
  `role: 'practice'` so the audit reports it with its grading rather than
  blocking it.
- **Reviewer** Is a weak marfu` narration the right thing to lean on here, or
  should the recommendation rest on the practice of the companions instead?

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

`src/i18n/content/fr.ts`, `src/i18n/content/es.ts` — 255 of 573 strings each,
model-written, needing a native speaker. Qur'an, dhikr and the prayer
instructions are deliberately absent and fall back to English.

Two entries were **deleted** rather than retranslated during this audit: both
carried errors that had been corrected in English (the fast ending "at
nightfall", and zakat al-fitr as "food or its value"). They now fall back to the
corrected English.

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
