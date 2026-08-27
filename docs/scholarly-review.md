# Scholarly review queue

Everything in this app that a qualified person still needs to clear, and what
exactly they need to clear about it.

This is not "the model wrote it, please check". Every Qur'an reference and every
narration in the app has been opened, read, and matched against the sentence it
sits under — 52 Qur'an references and now **97 distinct narrations**, listed in
full by `npm run content:audit`. Three citations did not say what they were
being used to say and were corrected; ten factual errors have now been fixed.
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

**Third pass — the open questions, 20 August 2026.** The seven items the second
pass could not settle were worked through: hand placement, the rest of the
prayer method, the wudu nullifiers, ghusl, the shahada, what breaks the prayer,
periods, the Ramadan exemptions, zakat, travel and the prayer-time regions.
Six narrations were added, each opened on its collection page. Nine scholarly
works and fatwas were added, because most of what was missing was not a
narration but an **attribution** — the app was stating what schools hold and
citing nothing for it, which is the same class of unsupported claim the whole
of this document exists to stop.

Four things this pass found and fixed that were **wrong**, not merely thin:

1. **The app's own account of its hand placement was wrong.** §1.5a said the
   chest rested on a single mursal report and was therefore contemporary rather
   than classical. It missed that Wa`il ibn Hujr's report naming the chest is
   musnad, that Ibn `Uthaymin — writing inside the school whose well-known
   position is *below* the navel — calls it the best report on the question,
   and that the narration usually quoted for below the navel is graded weak by
   an-Nawawi and Ibn Hajar. The taught position has not changed. Its stated
   basis has, because the stated basis was inaccurate.
2. **The periods page called two agreed questions open.** It said scholars
   differ on reciting Qur'an, touching a muṣḥaf and sitting in a prayer hall.
   Only the first is genuinely open; the four schools agree on the other two.
   Calling an agreement a disagreement is the more dangerous direction of the
   two, because it invites someone to act on latitude that is not there.
3. **The Ramadan lesson gave one school's answer as the ruling** on pregnancy
   and breastfeeding, and never mentioned fidyah — so it had no answer at all
   for a permanent condition, where "make the days up later" is not one.
4. **Two prayer-time regions claimed places they should not.** Amman and
   Jerusalem were being served Umm al-Qura, whose Isha is a fixed ninety
   minutes after Maghrib rather than an angle; Baghdad was being served Tehran,
   which does not treat Maghrib as sunset. Both are now unclaimed and fall
   through to the Muslim World League default.

One item the pass **declined to change**: the hands stay on the chest. The
reasoning is in §1.5a, and it is short — every one of the three positions rests
on contested or indirect evidence, all three are valid, and swapping one
contested position for another would churn the app's most-followed instruction
for nothing a reader would gain.

**Fourth pass — the attributions, 20 August 2026.** The vague attributions and
the actionable Priority 2 items. Nothing in the worship path moved. What moved
was the app's habit of counting scholars it had not counted: every remaining
`the majority` / `a minority` pair that was not itself a list of named schools
is gone, replaced either by the schools, from a source stating each school's
position, or by nothing at all where the disagreement is not between schools.

Two things this pass found that were **wrong**, not merely thin:

1. **The intention note put an agreed point on one side of a disagreement.**
   It gave "the intention is in the heart and does not need to be spoken" as
   the majority view, against a minority who voice it. The imams agree the
   intention's place is the heart — Ibn Taymiyyah says no one has reported a
   difference on it. The open question is only whether *voicing* it is
   recommended, and on that the app's labels were also the wrong way round:
   scholars among the followers of Abu Hanifah, ash-Shafi`i **and** Ahmad held
   it recommended. This is the same error the third pass fixed on the periods
   page, in the other direction.
2. **A sentence in `learn/sunnah.ts` cited a narration for four examples it
   does not contain.** Bukhari 6018 is the neighbour, the guest, and the good
   word or silence. The sentence listed greeting first, the right hand, words
   before sleeping and smiling. The sentence was rewritten to the narrations,
   rather than narrations found to fit the sentence.

One item the pass **declined to settle**: whether `ahl` in Tirmidhi 3895 should
read "family" or "wives". §2.9 carries what was found and why it is still a
question for someone else.

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

## ✅ Cleared — 26 August 2026

**A qualified reviewer has been through this and confirmed the content is
correct from the sources.** Reported by Iyad on 26 August 2026. Priority 1 is
no longer a release gate.

This entry is written from Iyad's report, not from a document the reviewer
signed, and it says so on purpose — the rest of this file is careful to
separate what was read from what was inferred, and a clearance is the last
place to start blurring that. If a marked-up copy or a written note exists,
it belongs alongside this line.

The one thing the reviewer left open was general rather than specific: **make
sure the duʿas and verses are put in the right places.** Not a defect report —
advice about how the work should be done. It is answered the way this repo
answers everything of that shape, with a check rather than a promise:
`npm run audio:brief` now generates the recording brief from the manifest, so
the text a reciter reads cannot drift from the text the app shows. The first
run of it found four such drifts, listed in the commit.

**What this leaves.** The only remaining gate on a public release is the audio:
twelve clips wired to live prayer steps with no file behind them, listed in
`docs/audio-recording-brief.md` and now safe to record from. The items below
are kept rather than deleted, because what was asked and how it was answered
is worth more than a shorter document.

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
- **THIRD PASS — "SAY IT AND MEAN IT" WAS RE-EXAMINED AND KEPT, WITH TWO
  SOURCES ADDED.** The question put to this pass was whether the sentence needs
  qualifying for belief, sincerity, understanding or intention. It does, and it
  already did — spread across the screen rather than gathered into a list of
  conditions. What was missing was evidence for each piece:
  - **Understanding** is the `understand` step, unchanged.
  - **Sincerity** is that step's note — "saying the words to please someone
    else, or to marry, does not make a person Muslim" — which now cites **Sahih
    al-Bukhari 1** (Book 1, Hadith 1, opened and read). It is an unusually
    close fit rather than a general appeal to intention: the narration's own
    example is a man who emigrated "for a woman to marry", and it says his
    emigration was for what he emigrated for.
  - **Conviction** is "and mean it", which now cites **IslamWeb fatwa 11140**,
    whose wording is that what suffices is the testimony plus "firm conviction,
    free from any doubt, in what he declares".
- **What was deliberately not done** The seven or nine "conditions of the
  shahada" are a real and widely taught framework, and putting them on this
  screen as a list would be a worse answer than the true one — a person about
  to become Muslim would read a checklist as a test they might already have
  failed. The conditions are carried; they are not enumerated.
- **Reviewer** Three sources now say the same thing about witnesses, which is
  as much as an app can do with a negative. Both halves still want confirming,
  and the split itself is worth a judgement: is separating religious validity
  from administrative proof the right thing to put in front of someone in their
  first ten minutes, or does mentioning paperwork at all plant a doubt? And is
  carrying the conditions implicitly, as above, the right call?

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
- **THIRD PASS — THE HANAFI POSITION IS IN, THE MALIKI ONE IS STILL OUT.**
  **IslamWeb fatwa 11140** states it directly: "The predominant opinion is that
  it is merely recommended. This is the opinion of the Hanafi and Shaafi`i
  scholars and has also been reported on the authority of Ahmad by a group of
  Hanbali scholars. In addition, it is the opinion chosen by Al-Mardaawi
  Al-Hanbali." Two things follow. The Hanafi row can now be stated with a
  source behind it. And the recommended view is not simply the non-Hanbali one
  — al-Mardawi, whose `Al-Insaf` exists precisely to say where the Hanbali
  school settles, chose it, which makes the app's flat "Hanbali: obligatory"
  row true of the well-known position but not of the whole school. The row now
  says "the well-known position of the school".
  The **Maliki** position was still not found stated in a source that names the
  school, so it is still out rather than asserted.
- **One sentence from the same fatwa is now doing work in two files**, because
  it is the cleanest statement of it anywhere consulted: "It is sufficient for
  he who embraces Islam to declare the Two Testimonies of Faith and to have
  firm conviction, free from any doubt, in what he declares. Performing Ghusl
  and praying two Rak`ahs after this verbal declaration of faith are not
  conditions for the validity of his conversion to Islam." It is cited on the
  ghusl note and on the shahada step — see 1.1.
- **Reviewer** Are the three attributions correct as stated? And is the Maliki
  position what the sources say — one summary consulted places Malik with the
  obligatory view, which is why it is not in the app.

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
- **THIRD PASS — THE TABLE NOW CARRIES ITS SOURCE, AND ONE THING WAS ADDED.**
  - **The eight cells were checked against a work that states them**, the
    Dorar Encyclopedia of Fiqh section on the nullifiers, which is now cited on
    the note. Every cell held. The Hanafi row is confirmed there directly
    ("touching a woman does not nullify ablution, even if it is with arousal —
    this is the position of the Hanafis"), and the same page adds that a
    narration from Ahmad agrees with it. Previously the table was
    cross-checked but cited nothing, which is the exact shape of claim this
    document exists to stop.
  - **Losing consciousness was missing and is now in.** Fainting, an
    anaesthetic, intoxication — all four schools agree these end wudu, and the
    `agreed` note named only sleep. It is one clause rather than a new list
    item because it is the same idea as sleep: you stopped being aware.
  - **Two more deliberate omissions recorded**, alongside camel meat, so the
    absence is a decision and not a gap: vomiting and bleeding from anywhere
    other than the two passages (the Hanafi school counts a mouthful of vomit
    and flowing blood; the Maliki, Shafi`i and — on one position — Hanbali
    schools do not), and apostasy. The vomiting-and-bleeding one is the closest
    call of the three, because a nosebleed is something a reader will actually
    meet; it was left out to keep the contested list at two items.
- **Reviewer** Are the eight cells of that table right? Is the `A'isha
  narration safe to cite there — Abu Dawud himself notes the chain is broken
  (Ibrahim at-Taymi did not hear from her) while Al-Albani grades it sahih, and
  the app shows the grading without the caveat. And were camel meat and the
  bleeding/vomiting difference right to leave out?

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
- **THIRD PASS — THE METHOD IS NOW NAMED, AND ONE MOVEMENT WAS ADDED.**
  - **It was never named, and that is most of why it looked like a composite.**
    Taking each movement from the narration that describes it *is* a method: it
    is the one set out in Al-Albani's `Sifat Salat an-Nabi ﷺ` and taught by Ibn
    Baz and Ibn `Uthaymin. In form it is closest to the **Hanbali** school —
    shoulders at the takbir, hands raised again at the bow and on rising, the
    left foot slid across only in a prayer with two sittings — and it parts
    from that school on where the folded hands rest. The file header now says
    this in as many words.
  - **The fourth raising of the hands was added.** The app followed three of
    Ibn `Umar's four raisings and dropped the one on standing up from the first
    sitting, which was arbitrary rather than a position: **Sahih al-Bukhari
    739** (Book 10, Hadith 133, opened and read) carries it, Ibn `Umar traces
    it to the Prophet ﷺ, and Bukhari gives it its own chapter — "To raise one's
    hands after finishing the second Rak`a". It applies to the third rakʿah of
    Dhuhr, `Asr, Maghrib and `Isha and to nothing else, because that is the
    only rakʿah anyone stands up for out of a sitting.
  - **The final-sitting note now names which school the app follows.** It
    stated the Shafi`i and Hanbali positions correctly and then quietly took
    the Hanbali one for Fajr without saying so. The difference is exactly Fajr:
    the Shafi`i school slides the foot across in the final sitting of any
    prayer, the Hanbali school only where there are two sittings.
  - **The raising note gained the Maliki and Shafi`i positions** in place of a
    single "the majority" row, and Bukhari 739 as a source.
  - **One cross-file contradiction closed.** The prayer's `intention` step said
    "You do not say it out loud" while `learn/before-prayer.ts` carried a
    `differs` note saying scholars disagree about whether saying it aloud is
    recommended. The step now says "you do not need to", which is true on both
    views.
  - **Everything else was read end to end and left alone** — the opening
    takbir, the folding, Al-Fatiha and the added surah, the bow, the rising,
    both prostrations, the sitting between them, both tashahhuds, the index
    finger, the salawat, the taslim, stillness, and the rakʿah counts and
    aloud/silent pattern of all five prayers. No contradiction or unsupported
    claim was found in any of them.
- **⚠️ THE HAND PLACEMENT — see 1.5a below, now answered.**
- **Reviewer** Is anchoring the method to Abu Humayd's narration the right
  editorial choice for an app with no madhhab, and is naming it as above an
  accurate description of what results? Is the resulting prayer one a named
  school would recognise?

### 1.5a The hands on the chest

**CHANGED — SCHOLAR REVIEW STILL REQUIRED.** The decision this item asked for
has been taken: the chest stays. What changed is the app's account of why,
which was wrong.

- **File** `src/content/prayers.ts`, step `opening`, `handPlacementNote`
- **What the app teaches** Unchanged: "Rest your right hand over your left
  forearm, on your chest."
- **What this item said was wrong with that** That the chest rested on Sunan
  Abi Dawud 759 alone — Tawus, a Successor, so *mursal* — and that no classical
  school places a man's hands there, making the app's default contemporary
  rather than classical.
- **What was missed, and it changes the picture**
  - The chest is not carried by the mursal report alone. **Wa'il ibn Hujr**'s
    report naming the chest is *musnad* — a companion in the chain. Ibn
    `Uthaymin calls it "the best report concerning this issue, even though
    there is some debate concerning it".
  - **Ibn `Uthaymin holds the chest to be the most correct view** — and he is
    writing inside the Hanbali school, whose well-known position he states
    plainly in the same passage as "placing the hands beneath the navel". A
    scholar preferring the position against his own school's is a stronger
    attribution than a contemporary consensus claim, and the app had neither.
  - **The competing narration is weak.** The report from `Ali, "it is sunnah to
    place the right hand over the left beneath the navel", is graded
    **inauthentic by an-Nawawi and Ibn Hajar** (Ibn `Uthaymin, same passage),
    and as-Sindi records the scholars as agreed on that.
  - So **no position here rests on an agreed, authentic, explicit narration**.
    That is why the schools differ, and it is the single most useful sentence
    for a reader, which the note now carries.
- **What remains true from the original objection** None of the four schools'
  well-known positions puts a man's hands on the chest itself — *Badhl
  al-Majhud* says the three positions are below the navel, above the navel and
  below the chest, or at the sides. The note still says so.
- **Why not change it anyway** All three positions are valid and nobody holds
  the prayer fails over it, so the reader gains nothing from a move. Moving to
  below the navel would make the whole method cleanly Hanbali, which was the
  strongest argument for changing — but it would rest the default on the
  narration graded weak rather than the one graded sound, and it would rewrite
  the app's most-followed instruction and drop its translations, to swap one
  contested position for another.
- **What the app now says instead** The `positions` list no longer attributes
  the chest to bare "contemporary scholarship, from the report of Tawus". It
  names Ibn `Uthaymin, Ibn Baz and Al-Albani. The `additionalExplanation`
  states the evidential position of all three views rather than only the app's
  own.
- **One name written and then struck** Ishaq ibn Rahawayh was going to be
  named as a classical scholar reported to have prayed with his hands on or
  just under the chest, which would have answered the "no classical holder"
  objection directly. One source consulted lists him instead among those who
  held *below the navel*. Two sources disagreeing about a man's position is
  not an attribution, so he is not in the app. A reviewer who can settle it
  would be adding the strongest single piece of support this position has.
- **Sources added** `Ash-Sharh al-Mumti`` 3/36–37 (Ibn `Uthaymin), `Al-Mughni`
  1/281 (Ibn Qudamah), `Badhl al-Majhud` (Khalil Ahmad as-Saharanpuri).
- **⚠️ Read in quotation, not in the printed editions.** The first two were
  read as quoted on Islam Question & Answer fatwa 59957, the third as quoted in
  the SeekersGuidance answer linked on the source. That is recorded here rather
  than hidden behind a citation that looks like a library visit, and it is the
  one thing about this item a reviewer should not take on trust.
- **Reviewer** Three questions. Is the reading of Ibn `Uthaymin's passage
  right? Is Ishaq ibn Rahawayh correctly reported as praying with his hands on
  or just below the chest — one source consulted lists him instead among those
  who held *below the navel*, and the app has not been able to resolve which,
  so a reviewer should either confirm him or strike him from the note. And is
  keeping the chest the right editorial call for an app with no madhhab?

### 1.6 Periods — the whole topic, and one section in particular

**CHANGED — SCHOLAR REVIEW STILL REQUIRED. One error corrected.**

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
- **THIRD PASS — THE GAP IS CLOSED, AND CLOSING IT FOUND AN ERROR.**
  - **The error.** Two of the three things `differences` called disagreements
    are not. Per the **Dorar Encyclopedia of Fiqh**, section on menstruation:
    touching the muṣḥaf is "haram for the menstruating woman… by agreement of
    the four schools of jurisprudence", and remaining in the mosque is "not
    permissible… by agreement of the four schools". Only reciting the Qur'an is
    genuinely open. Presenting an agreement as an open question is worse than
    the reverse here, because it invites someone to act on latitude that is not
    there — on the most sensitive page in the app.
  - **What it now says.** The body separates the one open question from the two
    settled ones and says which is which. A `differs` note carries the actual
    positions on reciting: permitted by the **Malikis**, al-Shafi`i's earlier
    position and a narration from Ahmad, and chosen by **Ibn Taymiyyah, Ibn
    al-Qayyim, Ibn `Uthaymin** and the Permanent Committee; the settled
    positions of the **Hanafi, Shafi`i and Hanbali** schools hold back. The
    note's explanation adds the two nuances that actually matter to a reader —
    that the muṣḥaf agreement is about *touching* and that a barrier is treated
    differently, and that the mosque agreement is about *remaining*, with the
    Shafi`i and Hanbali schools permitting passing through.
  - **`irregular` no longer stands alone.** It had no source at all. It now
    carries **Sahih al-Bukhari 228** (Book 4, Hadith 94, opened and read) —
    Fatima bint Abi Hubaysh asking "shall I give up my prayers?" and being told
    "no, because it is from a blood vessel and not the menses". The same
    narration supplied a practical detail the section was missing: "perform
    ablution for every prayer", so the wudu is renewed each prayer rather than
    lasting.
  - **`after-birth` gained Sunan Abi Dawud 311**, the narration already used
    for nifas in `ghusl.ts`, cited here where the claim is actually made.
  - **The tone was left alone deliberately.** Plain, no euphemism, explicit
    that this is a concession and not a punishment.
- **Reviewer** This is the most sensitive content in the app and the only place
  it tells someone to stop praying. Read it whole. Specifically: are the
  agreement claims right, is the reciting note's list of positions fair to both
  sides, and does the section now read as informative rather than restrictive
  to the person it is written for?

### 1.7 The Ramadan exemptions

**CHANGED — SCHOLAR REVIEW STILL REQUIRED. The gap named here was real.**

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
- **THIRD PASS — YES, IT MISLED, AND THERE WAS A SECOND HOLE BESIDE IT.**
  - **"Makes the days up later" is one school's answer stated as the ruling.**
    The four schools give three different answers, and the Maliki one splits
    pregnancy from breastfeeding. All four are now in a `differs` note:

    | | Pregnant | Breastfeeding |
    |---|---|---|
    | Hanafi | make the days up | make the days up |
    | Maliki | make the days up | make them up **and** feed a poor person a day |
    | Shafi`i | fear for herself: make up · fear for the child alone: make up **and** feed | same |
    | Hanbali | as Shafi`i | as Shafi`i |

    A fifth position, older than all four, is in the note's explanation: **Ibn
    `Abbas and Ibn `Umar** held that she feeds and does not make the days up.
    **Ibn Baz, Ibn `Uthaymin and the Permanent Committee** held make-up only.
  - **The second hole: the lesson had no word for fidyah anywhere in it.** It
    cited Qur'an 2:185, which names illness and travel and the make-up, and
    never 2:184, which is where feeding a poor person for each day comes from.
    So the lesson had **no answer at all** for a chronic or permanent
    condition, where "make the days up later" is not an answer — it is a debt
    that will never be paid. 2:184 is now cited and the route is described.
  - **Menstruation was quietly miscategorised** as something the exemption
    "also covers in practice". It is not a permission that may be taken; a
    woman does not fast and makes the days up. One clause, corrected.
  - **The permissive framing is kept, and is the right bias for a first
    Ramadan.** What changed is that it is now permissive with the differences
    shown, rather than permissive by flattening them.
  - **Sources** Qur'an 2:184 · Islam Question & Answer fatwa 49794, which
    states the three classical positions with their holders · Islam21c's
    summary, used only to corroborate the Maliki split, which fatwa 49794 does
    not give.
- **Reviewer** Are the four school rows right, and in particular is the Maliki
  split between pregnancy and breastfeeding correctly stated? Is the fidyah
  route described accurately enough for someone with a chronic condition to act
  on, or should it say less and send them to a person sooner?

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
- **THIRD PASS — AUDITED ITEM BY ITEM, ONE THING ADDED.** Each of the five was
  checked for whether it genuinely invalidates, whether it has an exception,
  whether the remedy is really to repeat, and whether it differs by school.
  Four came through unchanged. The fifth did not:
  - **Laughing aloud costs more in one school than the page said.** The page
    tells the reader to "put it right and pray it again from the beginning",
    which for laughing means standing up and praying again on their existing
    wudu. That is right for the **Maliki, Shafi`i and Hanbali** schools, which
    hold that laughing aloud ends the prayer but leaves wudu intact. The
    **Hanafi** school holds that it ends the wudu too, so someone following it
    washes first. One sentence, in the note that already handles laughing,
    sourced to the Dorar Encyclopedia of Fiqh.
- **Reviewer** Is the five-item list right and sufficient for a beginner? Is
  "put it right and pray it again from the beginning" the right remedy for all
  five? Is the Hanafi wudu point stated correctly? And is the app right to lean
  on two fatwa sites for the shape of a list, where no single narration gives
  one?

### 1.9 The zakat threshold and the lunar year

**RESEARCHED — SCHOLAR REVIEW STILL REQUIRED. The wording was confirmed and
kept; the missing citations are now there.**

- **File** `src/content/pillars.ts`, `zakat`
- **Claim** "It applies only above a threshold, and only to wealth you have held
  for a full lunar year." **Unchanged** — it was checked against the sources and
  is accurate.
- **Was** Sahih al-Bukhari 8 for the pillar. Nothing for the nisab or the hawl.
- **Now** Both halves carry a narration, each opened and read:
  - **Sahih al-Bukhari 1484** (Book 24, Hadith 84) — "there is no Zakat on less
    than five Awsuq, or on less than five camels, or on less than five Awaq of
    silver". Three kinds of wealth, three different thresholds, in one
    sentence. That is also the argument for the record printing no number: the
    threshold is not one figure.
  - **Sunan Abi Dawud 1573** (Book 9, Hadith 18, **sahih** — Al-Albani) —
    carries both halves: two hundred dirhams and twenty dinars as the
    thresholds for silver and gold, and "no zakat is payable on property till a
    year passes on it".
- **One narration deliberately not used** **Jami` at-Tirmidhi 631** is the
  better-known wording of the year rule — "whoever acquired wealth, there is no
  Zakat on it until the Hawl has passed" — and Darussalam grades it **Da'if**.
  A threshold is a ruling, so a weak narration cannot carry it, and
  `assessEvidence` would have failed the audit if it had been used. Recorded
  here because it is the citation anyone reaching for this would reach for
  first.
- **Reviewer** Confirm the two narrations support the sentence as written, and
  confirm that naming no figure is right. The argument for naming none is that
  the modern equivalent of a silver or gold measure moves with the market and
  an app cannot keep it current; the argument against is that a beginner who
  hears "a threshold" and cannot find out what it is may assume they owe
  nothing.

### 1.10 Prayer time calculation by region

**CHANGED — SCHOLAR REVIEW STILL REQUIRED. Two boxes claimed places they
should not have.**

- **File** `src/lib/prayer-times.ts`, `src/components/prayer-times-card.tsx`
- **Claim** A set of geographic boxes, each mapped to a calculation method.
- **What the audit checked** Every box was compared against the angles the
  `adhan` library actually uses for the method it maps to, read out of
  `node_modules/adhan/lib/cjs/CalculationMethod.js` rather than assumed.
- **Two wrong mappings, both fixed by unclaiming rather than remapping**
  - **The Levant sat inside the Saudi box**, so Amman and Jerusalem were served
    **Umm al-Qura** — whose Isha is not an angle at all but a fixed **ninety
    minutes after Maghrib**. That is a Saudi convention; nowhere in Jordan or
    Palestine prints it. A Levant box now sits ahead of Saudi Arabia and routes
    to the Muslim World League default (18°/17°). It costs the far north-west
    corner of Saudi Arabia, which is close to empty.
  - **Iraq sat inside the Iran box**, so Baghdad was served **Tehran** — Isha
    at 14°, and, more consequentially, a Maghrib that is *not sunset*: Tehran
    waits for the sun to reach 4.5° below the horizon. For a Sunni user that is
    the wrong Maghrib, and in Ramadan the wrong iftar by roughly a quarter of
    an hour. The Iran box now starts at 46°E, east of the Iraqi border, at the
    cost of a strip of north-western Iran.
- **One box left wrong on purpose, and flagged instead** The Karachi box runs
  from 5°N and applies the **Hanafi ʿAsr** to all of it. That is right for
  Pakistan, north India, Bangladesh and Afghanistan and wrong for **Kerala,
  Tamil Nadu, Sri Lanka and the Maldives**, which are largely Shafi`i — ʿAsr
  there runs about an hour later than their mosques print. Narrowing the box is
  a mapping decision this audit has no source for, so the comment now says what
  is true and this item carries it.
- **High latitudes: defensible.** `HighLatitudeRule.recommended` is the
  library's own recommendation and resolves to *seventh of the night* above 48°
  and *middle of the night* below it, with `PolarCircleResolution.AqrabBalad`
  above the polar circle. That is a standard configuration, not an invention.
- **The change that matters more than either box** The times card now carries a
  second line under the method name: *"If your mosque's timetable differs,
  follow the mosque."* The app was presenting computed times with no indication
  that a mosque timetable outranks them, which is a worship-correctness problem
  independent of whether any given box is right. `learn/before-prayer.ts` gains
  the same point as content, with the explanation of *why* they differ.
- **Reviewer** Are the remaining regional defaults the ones the mosques in
  those regions actually use? Is Muslim World League the right fallback for the
  Levant and Iraq, or is there a better-attested convention for either? And is
  the Karachi box's southern reach worth fixing?

---

## PRIORITY 2 — should review

Real questions, but a wrong answer here misinforms rather than invalidates.

### 2.1 The distance that counts as a journey

**CHANGED — SCHOLAR REVIEW STILL REQUIRED.**

- **File** `src/content/references.ts`, `TRAVELLING`, section `howfar`
- **Was** "scholars put the line at roughly eighty kilometres, and differ on it
  and on how long you may keep shortening once you arrive", with a `differs`
  note carrying no positions and no source.
- **The problem** Naming a single number made a scholarly conversion look like
  a reported figure, and the note that said otherwise was one line below it
  with nothing behind it.
- **Now** The body says there is no distance in the Qur'an or any narration,
  that scholars have therefore drawn the line themselves and draw it in
  different places, and gives a range — "somewhere around eighty to ninety
  kilometres" — rather than a figure. The `differs` note carries the positions:

  | | Where the line falls |
  |---|---|
  | Maliki, Shafi`i, Hanbali | four burud ≈ 88 km |
  | Hanafi | a journey of about three days, which the school gives as 48 miles ≈ 77 km |
  | Ibn Taymiyyah, Ibn al-Qayyim, Ibn `Uthaymin | no fixed distance — anything ordinarily called travelling |

  The explanation adds what a barid is, why conversions land on slightly
  different numbers, and the second difference the old sentence gestured at
  without answering: how long you keep shortening after arriving — four days
  (Maliki, Shafi`i), fifteen (Hanafi), or no limit while you have not settled.
- **One thing added that is agreed and practical** You start shortening once
  you have actually left the place you live, not when you decide to go. All
  four schools agree, and it now carries **Sahih al-Bukhari 1089** (Book 18,
  Hadith 10, opened and read) — Anas praying Dhuhr as four in Madinah and two
  at Dhul-Hulayfa, which Bukhari files under exactly that chapter heading.
- **Sources** Dorar Encyclopedia of Fiqh, "How Travellers Pray", for the
  majority and no-fixed-distance positions · SeekersGuidance's Hanafi answer
  for the Hanafi figures, read from a Hanafi source rather than a summary of
  one, which is the rule for a school attribution.
- **Reviewer** Is a range better than a number here, or is naming any figure
  worse than naming none? And are the three rows right?

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
- **THIRD PASS — TWO OF THESE ARE NOW ANSWERED, AND ONE MORE THAT WAS NOT ON
  THE LIST.** The fix in each case was to find a work that states the position,
  not to soften the label:
  - **Ghusl before Friday prayer** (2.6) weighed "the majority" against "a
    minority". The Dorar Encyclopedia of Fiqh states it flatly: the Friday
    ghusl is a sunnah "by agreement of the four schools of jurisprudence". So
    it is not a difference between two bodies of opinion at all — it is agreed
    among the four, with the obligatory reading held outside them. It has been
    reclassified from `differs` to `agreed` and says so.
  - **The travel distance** (2.1) had a `differs` note with no positions. It
    now names Maliki, Shafi`i, Hanbali, Hanafi and three contemporary scholars,
    each from a source.
  - **The prayer's raising note** used a single "the majority" row for
    everything that is not Hanafi. It now states the Maliki, Shafi`i and
    Hanbali positions separately, which are not the same as each other.
- **FOURTH PASS — ALL FOUR ARE DONE, AND NONE BY SOFTENING A LABEL.** Either
  the schools could be named from a source that states each school's position,
  or the rows came out because the disagreement is not between schools.

  | File | Was | Now |
  |---|---|---|
  | `learn/clothing.ts` | `the majority` need not cover / `a minority` must | four rows, one per school |
  | `learn/before-prayer.ts` | `the majority` / `a minority` | `Hanafi` and `Maliki`, from Ibn Taymiyyah's account of the difference |
  | `learn/food.ts` | `contemporary scholarship` / `a minority` | no rows — the split is not between schools |
  | `learn/work.ts` | `the majority` / `contemporary scholarship` | no rows — the first was not a disagreement at all |

- **Covering the face — the count was backwards, or at any rate unprovable in
  the direction the app took it.** The app said the majority hold the face and
  hands need not be covered. The Dorar Encyclopedia of Fiqh says the opposite
  in as many words: covering the whole body including the face and hands in
  front of men a woman could marry is "the opinion of the majority of scholars:
  the Hanafi Madhab, the most predominant opinion of the Shafi'i Madhhab and
  the most correct opinion of the Hanbali Madhab", with some of the Malikis.
  Summaries written from inside the Hanafi and Maliki schools put it the other
  way. When two reference works disagree about which side *is* the majority,
  this app is not the place that settles it. The note now names the four
  schools and counts nobody:

  | | Position |
  |---|---|
  | Maliki | The face and hands are what ordinarily shows — covering them is not required in itself, but the school calls for it where there is real fear of harassment |
  | Hanafi | The face is not itself among the parts that must be covered, but the position recorded in the school from early on is that it is covered, because of the harm of not doing so |
  | Shafi`i | Two positions in the school; the more predominant is that the face is covered |
  | Hanbali | The position the school takes as most correct is that the face and hands are covered |

  **Sources** Dorar al-Saniyyah, Encyclopedia of Fiqh, "Parts of the Body We
  Are Obliged to Cover" (dorar.net/en/feqhia/499) for the Shafi`i and Hanbali
  rows and for the majority claim it makes · SeekersGuidance, "The Lawful
  Nature of Niqab (Face Veiling)" for the Maliki and Hanafi rows ·
  SeekersGuidance's Hanafi answer, "Is It Necessary for Women to Wear the
  Niqab in the Hanafi School?", read from inside the school, for the Hanafi
  row's two halves — the face is not `awrah, and covering it is still the
  school's recorded position.
- **The intention aloud — one row was not a position at all.** See the fourth
  pass note at the top of this file. `Al-Fatawa al-Kubra` 1/214–215, via Islam
  Question & Answer fatwa 13337, is now cited on the note, and it is the source
  for both rows: scholars among the followers of Abu Hanifah, ash-Shafi`i and
  Ahmad held voicing it recommended; scholars among the followers of Malik and
  Ahmad held it is not, "because that is an innovation". The note's own
  sentence — that nobody holds the prayer fails without it — was already right
  and is untouched.
- **Supermarket meat — the rows came out, because there is no split between
  schools to put in them.** All four schools hold that meat slaughtered by Jews
  and Christians is lawful, and all four hold that an animal killed by
  strangling, electrocution or anything other than cutting the throat was not
  lawfully slaughtered. What people actually disagree about is whether a modern
  slaughterhouse meets the second condition. That is a question about applying
  agreed rules, and both answers are held by contemporary scholars, so the note
  now states both in prose and attributes neither to a body of opinion it
  cannot count. **Sources** IslamWeb fatwa 82899, "Rulings on eating meat of
  the People of the Book according to the madhhabs" · Islam Question & Answer
  fatwa 103.
- **Distance from a prohibited job — the first row was the agreed case.** "Treat
  direct production or sale of a prohibited thing as impermissible" is not a
  majority position held against a minority; it is the clear case, and the
  section body already said so. It now carries **Jami` at-Tirmidhi 1295** (Book
  14, Hadith 97, hasan — Darussalam), the curse on ten involved in wine, the
  seller and the one who lives off its price among them. The rows are gone and
  the reasoning — how central the forbidden thing is, how much of the income
  depends on it, what leaving would cost — stays in the explanation, where it
  was already stated and where it does not pretend to be a count.
- **Reviewer** Confirm the four clothing rows, which are the substantial
  change here, and confirm that Tirmidhi 1295 is right for the clear case and
  is not being stretched to the delivery driver.

### 2.4 Zakat al-fitr in money or in food

- **File** `src/content/learn/ramadan.ts`, section `eid`
- **What changed** The section used to say "a small fixed amount of food **or
  its value**", which states the Hanafi position as if it were the ruling. It
  now says food, with a `differs` note carrying Hanafi (value permitted) against
  the majority (the staple food the narration names).
- **Source** Sahih al-Bukhari 1503 — one sa` of dates or barley, before the Eid
  prayer.
- **FOURTH PASS — THE ATTRIBUTION IS NAMED.** "The majority" now names who:
  "Malik, ash-Shafi`i and Ahmad hold that it is the staple food the narration
  names, given as food rather than as its value." IslamWeb's "Rulings of Zakat
  al-Fitr — I" states the two side by side — the classical Maliki, Shafi`i and
  Hanbali positions discuss the payment only in foodstuffs, and the Hanafi
  position permits the price — and it is now cited on the note. The row keeps
  the `the majority` label because the label is a summary of a list the row
  itself gives, which is how the travel and periods notes already work.
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

**CHANGED — SCHOLAR REVIEW STILL REQUIRED. It is not a `differs` note; the
four schools agree.**

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
- **THIRD PASS — THE LABELS WERE THE PROBLEM AND THEY ARE GONE.** The Dorar
  Encyclopedia of Fiqh states it directly: "It is sunnah to perform ghusl on
  Friday by agreement of the four schools of jurisprudence. It is also the
  position of the overwhelming majority of scholars." So this was never a
  majority-versus-minority split *within* the four schools — they agree, and
  the obligatory reading of Bukhari 877 is held outside them. The note is now
  `agreed` rather than `differs`, says the four schools agree, and keeps
  ash-Shafi`i's argument as Tirmidhi records it in the explanation. One
  practical point was added from the same source, also agreed by the four: it
  only counts as the Friday wash if it is done **before** the prayer.
- **Reviewer** Confirm the reading, and confirm that reclassifying this from a
  difference to an agreement is right — it is the one place in this pass where
  an item moved in that direction.

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

**RESOLVED — softened and sourced. Kept, because it is a real recommendation;
softened, because the app was stating it as though a narration said so.**

- **File** `src/content/duas.ts`, `enter-toilet`
- **Was** "Said before you step in, and step in with your left foot." One
  sentence, no source, in the imperative.
- **Now** The duʿa note is "Said before you step in." The foot is a separate
  `practical` note: "Scholars recommend stepping in with the left foot, and
  stepping out with the right", with its own explanation saying there is no
  narration about the bathroom itself.
- **Source** IslamWeb fatwa 289249 quotes the Maliki jurist **Khalil ibn
  Ishaq** — "It is recommended to enter with the left foot and leave with the
  right foot, unlike entering and leaving the mosque and house" — and then says
  in its own voice: "There is no specific evidence for this; rather, it is based
  on the general statement of `Aa'ishah", which is **Sahih al-Bukhari 168**,
  already in the app. Both are cited on the note, the narration with
  `role: 'practice'` because that is what it is doing here.
- **Reviewer** Confirm that a named Maliki recommendation resting openly on a
  general principle is the right standing to give this, rather than dropping it.

### 2.9 "The best of you is the best to his family"

- **File** `src/content/learn/family.ts`, section `marriage`
- **Source** Jami` at-Tirmidhi 3895 (sahih — Darussalam). The Arabic is
  `khayrukum khayrukum li-ahlihi`; Darussalam renders ahl as "wives", the app
  renders it "family".
- **FOURTH PASS — HALF OF THIS IS FIXED AND HALF IS STILL A QUESTION.** The app
  said "the best of people are those best to their families". The narration
  says *khayrukum* — the best **of you**, addressed to the listener — so the
  sentence now reads "the best of you is the best to his family". That half was
  a misquotation and is corrected.
- **The half left open, with one thing added to it.** Tirmidhi files this
  hadith under **باب فَضْلِ أَزْوَاجِ النَّبِيِّ — "The Virtue Of The Wives Of
  The Prophet"** — which is evidence for Darussalam's narrower reading that was
  not in front of the reviewer before. Against it: `ahl` is the broader word,
  and the app uses the line in a section about a household rather than about
  wives specifically. This is a translation judgement, so it stays here.
- **Reviewer** Which rendering should stand, given the chapter heading? The
  app's is more literal and broader; Darussalam's is narrower, is what the
  printed edition says, and is what Tirmidhi's own chapter title points at.

### 2.10 Bukhari 6018 is doing more work than it can

- **File** `src/content/learn/sunnah.ts`, section `everyday`
- **Claim** "Much of it is small and human: greeting people first, eating with
  the right hand, saying a few words before sleeping, smiling."
- **Source** Sahih al-Bukhari 6018 — the neighbour, the guest, and saying
  something good or staying silent. It carries the section's thesis and none of
  the four examples.
- **RESOLVED — the sentence was reworded to the narrations, not the other way
  round.** The body now reads: "not harming a neighbour, making a guest
  welcome, saying something good or staying quiet, eating with the right hand,
  a few words before sleeping". The first three are Bukhari 6018 itself, read
  on the page — it is filed under "Whosoever believes in Allah and the Last Day
  should not harm his neighbor". The last two keep the citations the app
  already carries for them: **Bukhari 5376** (Book 70, Hadith 4) for the right
  hand, in `duas.ts`, and **Bukhari 6324** (Book 80, Hadith 21) for the words
  before sleeping, in `recitations.ts`. All three are now on the section.
- **What came out** "Greeting people first" and "smiling". Both are taught in
  Islam and neither had a narration in this app, so they were removed rather
  than given one this audit had not opened. The section is one example shorter
  and every example in it is now cited.
- **Reviewer** Confirm the reworded sentence still says what the section is
  for — that much of the Sunnah is ordinary decency.

### 2.11 What a woman wears to a mosque

- **File** `src/content/references.ts`, `MOSQUE`, section `before`
- **Was** "Women cover the hair, arms and legs." A flat rule with nothing
  behind it, in a page about not being embarrassed.
- **RESOLVED — it points at the lesson that holds the subject instead.** The
  sentence is now "What a woman covers is no different here from anywhere else
  in front of men outside the family, and the clothing guide sets it out with
  the verses behind it", and `clothing` was added to the page's
  `relatedContent`. No ruling was restated, none was softened, and the subject
  now lives in one file — `learn/clothing.ts`, with Qur'an 24:31 and 33:59 and
  the `differs` note rewritten at §2.3.
- **Reviewer** Confirm that sending the reader to the lesson is right here,
  rather than repeating a short version of it.

### 2.12 Every English translation of an Arabic text

- **File** `src/content/recitations.ts`
- **Status** The Arabic is now verified against the collection page for all
  twenty-three texts. The English beside each one is the app's own and has been
  checked by nobody.
- **Reviewer** These are said in every prayer. Read them as translations, not as
  prose.

### 2.13 `الْخُبُثِ` — which reading, and which English goes with it

- **File** `src/content/recitations.ts`, `duaEnterToilet` (Bukhari 142)
- **Status** The Arabic in the app carries a ḍamma on the bāʾ — *al-khubuth*,
  the plural of *khabīth*, read by Ibn al-Athīr and al-Khaṭṭābī as the male
  devils paired with *al-khabāʾith*, the female ones. The other narrated
  reading is *al-khubth*, with a sukūn, meaning foulness or evil in the
  abstract. The transliteration said `khubthi` while the Arabic said
  *khubuth*; the fifth pass corrected the transliteration to the Arabic, which
  is the reading the app already had.
- **What is still open** The English beside it — "all that is foul and from all
  evil" — is a gloss of *al-khubth*, not of the reading the Arabic carries. One
  of the two has to move, and which one is not a language question.
- **Reviewer** Settle the reading first, then the English to match it. Nothing
  here was decided by this pass beyond making the transliteration honest to the
  Arabic already on the page.

---

## PRIORITY 3 — nice to review

### 3.1 Arabic names on the pillars and articles pages

`src/content/pillars.ts`, `src/content/iman.ts` — the Arabic names and
transliterations are model-written and unchecked. They are labels rather than
words anyone says in worship, which is why they sit here; the vowel marks in
particular want a printed source.

The fifth pass closed the mechanical half of that: the definite article was
missing its sukūn before a moon letter in eight of these labels — `الحَجّ` and
all six `الإِيمَانُ`, plus the article inside four of them — while every other
Arabic string in the app carries it. Those are now `الْحَجّ`, `الْإِيمَانُ`,
`بِالْمَلَائِكَة` and the rest. That is spelling, not sourcing; the entry stays open.

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

That pass has now run, and is recorded below. The prose/marked split was left
exactly as it is — it is the architecture, not an inconsistency.

### 3.4 Al-Fatiha, verse by verse

`src/content/recitations.ts` — the Arabic matches the standard-orthography text
of all seven ayat exactly. The English rendering of each is the app's own.

### 3.5 French and Spanish

`src/i18n/content/fr.ts`, `src/i18n/content/es.ts` — 250 of 645 strings each,
model-written, needing a native speaker. Qur'an, dhikr and the prayer
instructions are deliberately absent and fall back to English.

Seven entries have now been **deleted** rather than retranslated, each because
the English they were keyed to turned out to be wrong. Two in the first audit
(the fast ending "at nightfall", zakat al-fitr as "food or its value"); three in
the core-worship pass (speech in prayer by mistake meaning you repeat it, the
four-item list of what breaks the prayer, and the wudu paragraph in
`before-prayer`); two in the third pass, both in `learn/ramadan.ts` — the
exemptions paragraph that said everyone "makes the days up later", and the note
that sent the details of fidyah to a local scholar without ever saying what
fidyah was. All seven now fall back to the corrected English.

Nothing new was translated. The rule has not changed and is not a shortage of
effort: a wrong French rendering of a ruling about pregnancy and fasting is the
same class of mistake as a wrong Arabic text and harder to notice, so new
English content falls back to English until a native speaker takes it.

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

---

## What the third pass changed rather than queued

| Where | Was | Now |
|---|---|---|
| `references.ts` `PERIODS` | "scholars differ" on reciting Qur'an, touching a muṣḥaf **and** sitting in a prayer hall | only the first is open. The four schools agree on the other two, and saying otherwise invited someone to act on latitude that is not there |
| `references.ts` `PERIODS` | the `differences` section named a disagreement and gave no positions and no source | a `differs` note with the Maliki, Hanafi/Shafi`i/Hanbali and contemporary positions, from the Dorar Encyclopedia of Fiqh |
| `references.ts` `PERIODS` | istihada stated with no source at all | **Bukhari 228** — "it is from a blood vessel and not the menses" — which also supplied the missing detail that wudu is renewed for each prayer |
| `references.ts` `TRAVELLING` | "scholars put the line at roughly eighty kilometres" | there is no distance in any text; a range, and a `differs` note with four burud ≈ 88 km (Maliki, Shafi`i, Hanbali), 48 miles ≈ 77 km (Hanafi), and no fixed distance (Ibn Taymiyyah, Ibn al-Qayyim, Ibn `Uthaymin) |
| `references.ts` `TRAVELLING` | nothing on when shortening starts | you start once you have left the place you live — agreed by all four schools, with **Bukhari 1089** behind it |
| `learn/ramadan.ts` | pregnancy and breastfeeding covered by "makes the days up later" | a `differs` note with all four schools, which give three different answers, plus Ibn `Abbas's older fifth position |
| `learn/ramadan.ts` | no mention of fidyah anywhere in the lesson | **Qur'an 2:184** cited, and the feeding route described — the lesson had no answer for a permanent condition, where making days up later is a debt that will never be paid |
| `learn/ramadan.ts` | menstruation listed as something the exemption "also covers in practice" | stated as what it is: she does not fast, and the days are made up |
| `prayers.ts` | hands not raised on standing up from the first sitting | raised, per **Bukhari 739**, which Bukhari gives its own chapter. The app kept three of Ibn `Umar's four raisings and dropped one, which was arbitrary rather than a position |
| `prayers.ts` | the chest attributed to "contemporary scholarship… from the report of Tawus" | Ibn `Uthaymin, Ibn Baz and Al-Albani named, with `Ash-Sharh al-Mumti`` and `Al-Mughni` cited, and the honest summary that no position here rests on an agreed authentic narration |
| `prayers.ts` | the method unnamed, which is most of why it read as a composite | named: each movement from the narration that describes it, closest in form to the Hanbali school, parting from it on hand placement |
| `prayers.ts` | the final-sitting note stated both positions and then quietly took the Hanbali one for Fajr | says which one it follows and why |
| `prayers.ts` | "The intention is a thought… You do not say it out loud" | "you do not need to say it out loud" — `learn/before-prayer.ts` carries a `differs` note on saying it aloud, and two files stating the same thing one flatly and one with a difference is how the app comes to contradict itself |
| `wudu.ts` | the four-school table cross-checked but citing nothing | the Dorar Encyclopedia of Fiqh section on the nullifiers, which states each position as a school's |
| `wudu.ts` | only sleep named as loss of awareness | fainting and anything else that takes the senses away, which all four schools agree ends wudu |
| `ghusl.ts` | Friday wash a `differs` note weighing "the majority" against "a minority" | an `agreed` note: all four schools hold it a sunnah, and the obligatory reading sits outside them |
| `ghusl.ts` | conversion wash: Hanbali and Shafi`i positions only | the Hanafi position added, and the Hanbali row corrected to "the well-known position of the school" — al-Mardawi, whose job was to say where that school settles, chose the recommended view |
| `pillars.ts` | zakat's threshold and lunar year, both uncited | **Bukhari 1484** and **Abu Dawud 1573**. The wording was checked and kept — naming no figure is right, because the threshold differs by the kind of wealth |
| `learn/what-breaks-prayer.ts` | "pray it again from the beginning" for laughing, on your existing wudu | true for three schools; the Hanafi school holds laughing aloud ends the wudu too, so it now says so |
| `lib/prayer-times.ts` | the Levant inside the Saudi box → Umm al-Qura's fixed ninety-minute Isha | a Levant box ahead of it, routing to the Muslim World League default |
| `lib/prayer-times.ts` | Iraq inside the Iran box → Tehran, whose Maghrib is not sunset | the Iran box starts at 46°E, east of the border. In Ramadan this was the wrong iftar by about fifteen minutes |
| `prayer-times-card.tsx` | computed times shown with nothing saying a mosque timetable outranks them | a second line under the method: "If your mosque's timetable differs, follow the mosque" |
| `learn/before-prayer.ts` | "the Pray tab works the times out… so you do not have to calculate anything" | the same, plus a note on why a mosque's timetable differs and why you follow it |

Two Spanish and two French translations were **deleted** rather than
retranslated, for the reason set in the first pass: the English they were keyed
to had changed. Both were in `learn/ramadan.ts` — the exemptions paragraph, and
the note that sent the details of fidyah to a local scholar without ever saying
what fidyah was.

### What the third pass looked at and deliberately left alone

Recorded because "we checked and it was fine" is a result, and a reviewer's
time should not be spent re-deriving it.

- **The hands stay on the chest.** §1.5a.
- **The whole prayer method apart from the fourth raising.** Every step was read
  against its narration; nothing else was inaccurate, contradictory or
  unsupported.
- **The zakat wording.** Accurate and appropriately limited; it gained citations
  and not a rewrite.
- **The ghusl occasions.** The list corrected in the second pass held. Eid was
  resolved then and is untouched.
- **Vomiting, bleeding and camel meat as wudu nullifiers**, and apostasy. All
  real, all left out of the beginner-facing list on purpose, all recorded at
  §1.4 so the omission is a decision.
- **The Karachi prayer-time box's southern reach**, which applies the Hanafi
  ʿAsr to largely Shafi`i regions. Narrowing it is a mapping decision this pass
  had no source for; the comment now says so and §1.10 carries it.
- **No audio was added, replaced or re-pointed.** §3.7 is unchanged and remains
  a listening task nobody has done.


---

## What the fourth pass changed rather than queued

| Where | Was | Now |
|---|---|---|
| `learn/before-prayer.ts` | "the majority" hold the intention is in the heart, against "a minority" who voice it | `Hanafi` and `Maliki` rows from Ibn Taymiyyah's account. The first row was not a position — the imams agree the intention's place is the heart; what differs is only whether voicing it is recommended, and on that the labels were also reversed |
| `learn/clothing.ts` | "the majority" hold the face need not be covered, "a minority" hold it must | four rows, one per school, from Dorar and two SeekersGuidance answers. Dorar states the opposite count in as many words, so the app names schools and counts nobody |
| `learn/food.ts` | `contemporary scholarship` against `a minority` on supermarket meat | no rows. All four schools agree the meat of the People of the Book is lawful and that strangling or electrocution is not slaughter; the disagreement is about whether a slaughterhouse meets the second condition, which is not a split between schools |
| `learn/work.ts` | "the majority" treat direct sale of a prohibited thing as impermissible | that is the agreed clear case, not a majority view. The rows came out and the body gained **Tirmidhi 1295** (hasan — Darussalam), the curse on ten involved in wine |
| `learn/ramadan.ts` | "the majority" hold zakat al-fitr is given as food | "Malik, ash-Shafi`i and Ahmad hold…", with IslamWeb's article stating the three against the Hanafi position |
| `learn/sunnah.ts` | four examples under Bukhari 6018, which names none of them | the three the narration does name, plus the right hand and the words before sleeping with the citations the app already held. Greeting first and smiling came out rather than being given a narration nobody had opened |
| `learn/family.ts` | "the best of people are those best to their families" | "the best of you is the best to his family". *Khayrukum* is addressed to the listener |
| `references.ts` `MOSQUE` | "Women cover the hair, arms and legs", flat and unsourced | points at `learn/clothing.ts`, which holds the subject with its verses and its `differs` note, and `clothing` added to `relatedContent` |
| `duas.ts` `enter-toilet` | "step in with your left foot", in the imperative, no source | a `practical` note saying scholars recommend it, with Khalil ibn Ishaq via IslamWeb 289249 and Bukhari 168 at `role: 'practice'`, and the explanation saying plainly that no narration is about the bathroom |

Fifteen Spanish and fifteen French translations were **deleted** rather than
retranslated, for the reason set in the first pass: the English they were keyed
to had changed, and a stale translation of a corrected sentence is worse than
the English fallback. They were the two clothing rows and their explanation, the
two intention rows and their explanation, the two meat rows and their
explanation, the two work rows, their explanation and the job paragraph, the
`learn/sunnah.ts` sentence, and the marriage paragraph in `learn/family.ts`.
Nothing was machine-translated to replace them.

### What the fourth pass looked at and deliberately left alone

- **Every other `the majority` in the app.** They survive because in each case
  the row itself names the schools it is summarising — the periods note, the
  travel note, the hand-placement note, the zakat al-fitr note as corrected
  above. A label that summarises a list the reader can see is not the same
  claim as a label standing on its own.
- **`learn/islamic-calendar.ts`.** Its moon-sighting note still carries
  `the majority` against `contemporary scholarship` and cites nothing. It was
  not on §2.3's list of four and is not in Priority 2, so it stays as it is
  and is recorded here as the one attribution of this kind left in the app.
- **§2.1 travel, §2.2 sujud al-sahw, §2.5 bismillah in wudu, §2.6 Friday
  ghusl.** All four were changed in earlier passes and their remaining
  questions are judgement calls for a reviewer, not gaps a source can fill.
  Nothing was touched.
- **§2.12, the English of the recitations.** Untouched. It needs a reader, not
  a search.
- **No hadith grading was changed, no Arabic text was touched, and no audio was
  added, replaced or re-pointed.**
- **The taught path did not move anywhere.** No school's position was swapped
  for another's, and nothing a reader is told to do changed except the
  softening of the left foot at §2.8.

---

## What the fifth pass changed rather than queued

An Arabic, transliteration and recitation-presentation pass. No religious text
was replaced, no ruling moved, no recitation or duʿa was added, and nothing was
re-sourced. Everything below is spelling, vowel marks, or one romanisation
disagreeing with another inside the same file.

### Arabic

| Where | Was | Now |
|---|---|---|
| `recitations.ts` — opening supplication, tashahhud, shahada after wudu | `إِلَهَ`, a bare fatḥa where the transliteration says `ilāha` | `إِلَٰهَ`, the dagger alif the shahada entry already carried. As written it told a beginner to say a short *a* |
| `recitations.ts` — after-eating (provision) and travel, 4× | `هَذَا` against `hādhā` | `هَٰذَا`, same correction |
| `recitations.ts` — leaving the house | `لاَ` ×2 and `إِلاَّ`, with the fatḥa and the shadda sitting on the alif instead of the lām — a sunnah.com copy artefact | `لَا` and `إِلَّا`, as everywhere else. A shadda cannot sit on an alif of prolongation |
| `recitations.ts` — travel duʿa, 2× | `الأَهْلِ`, no sukūn on the lām, in a string that spells `الْمَنْظَرِ` and `الْمَالِ` with one | `الْأَهْلِ` |
| `recitations.ts` — rising from rukuʿ | a space before the Arabic comma | closed up |
| `pillars.ts`, `iman.ts` — 8 labels | `الحَجّ`, `الإِيمَانُ`, `بِالمَلَائِكَة`, `بِالكُتُب`, `بِاليَوْمِ`, `الآخِر`, `بِالقَدَر` | the sukūn added, per §3.1 |
| `recitations.ts` — 6 strings | shadda encoded before the vowel, so the bytes differed from the other 47 while rendering identically | NFC. All 53 Arabic strings in the app now normalise identically |

### Transliteration

| Where | Was | Now |
|---|---|---|
| `recitations.ts` — Fatiha 6, Fatiha 7, shahada | `Ihdinā-ṣ-ṣirāṭa`, `wa lā-ḍ-ḍāllīn`, `illā-llāh` | `Ihdina-`, `wa la-`, `illa-`. A final long vowel drops before hamzat al-waṣl, and the file already does this in `fi-s-safar`, `hādha-l-birra`, `ʿala-llāh`, `tabāraka-smuka` and — for the same three words — in the tashahhud and the shahada after wudu. These three were the only places it did not |
| `recitations.ts` — `bismillah` | `Bismillāh`, against `Bismi-llāh` for the identical two words when leaving the house | `Bismi-llāh` |
| `recitations.ts` — sleeping | `Bismika Allāhumma`, against `Subḥānaka-llāhumma` for the identical construction | `Bismika-llāhumma` |
| `recitations.ts` — entering the bathroom | `khubthi`, against Arabic vocalised `الْخُبُثِ` | `khubuthi`. The English still glosses the other reading — queued at §2.13 |
| `pillars.ts` | `Ash-shahāda`, against `Aṣ-ṣalāh`, `Az-zakāh` and `bi-l-malāʾikah` | `Ash-shahādah`. Same letter, four labels, one rendering |

### What the fifth pass looked at and deliberately left alone

- **Al-Fatiha.** Seven verses, in order, none duplicated, none missing, each
  wired to its own clip `fatiha-1`…`fatiha-7`. The Arabic matches the
  standard-orthography text and each transliteration matches its own Arabic.
  Only the two elisions above moved. No eighth copy exists anywhere in the app.
- **`phrases.ts`.** Read letter by letter and changed in nothing. The fourteen
  phrases are correctly vowelled and their transliterations match. §3.2 stays
  open for a native speaker, which is a different question.
- **`duas.ts`, `shahada.ts`.** Neither holds any Arabic. `duas.ts` composes from
  `recitations.ts` and `pillars.ts` re-exports `Recitations.shahada`, so the
  corrections above reached them without either file being touched. There is
  exactly one copy of every Arabic string in the app outside `i18n/ui.ts`.
- **The prose/marked transliteration split.** `wudu` in a sentence and `wuḍūʾ`
  in a pronunciation field stay as they are. That is §3.3's architecture.
- **Every hadith wording, grading and citation.** Untouched. Adding a vowel mark
  is not editing a text, and no consonant in the app changed.
- **The audio.** Nothing added, replaced, renamed or re-pointed. All 27 clips
  resolve; the 7 Al-Fatiha files are byte-identical to before this pass.
  **§3.7 is unchanged and still needs an ear** — no one has listened to them,
  and this pass could not.
- **French and Spanish.** Nothing went stale: the translation manifest keys on
  English, and no English string changed. `i18n:manifest --check` passes at 645
  strings with nothing deleted.
