# Night prayers: an accuracy audit

**13 September 2026.** Iyad asked for everything the app says about taraweeh,
qiyam al-layl, tahajjud and witr to be researched and compared with the app,
including how they relate to each other, when each starts and ends, and what
is prayed. Nothing in the app has been changed yet. This document is the
report, written so a reviewer can re-open every source rather than trust it.

## How it was checked

1. An inventory of every user-visible claim, generated guides and Today
   schedule included, read from the files.
2. Three research passes (taraweeh; witr; qiyam, tahajjud and the divisions of
   the night). Hadith were read in the local corpus (`.cache/hadith`, printed
   Muslim numbers resolved the way `scripts/generate-evidence.mjs` does);
   positions of the schools from islamqa, islamweb, Dar al-Iftaa, and the
   tafsir on quran.ksu.edu.sa. dorar.net, shamela and the Kuwaiti Mawsuʿah
   itself refused automated requests.
3. Every finding that would change the app was then re-opened by hand.

Each source below is marked:

- **✓** opened and read for this document (corpus text, or a web page fetched
  and quoted);
- **◐** reported by a research pass and not re-opened: open it before it is
  printed anywhere;
- **✗** reported by a research pass and wrong when re-opened.

One of those failed. A pass reported `binbaz.org.sa/fatwas/4930` as Ibn Baz on
reciting aloud at night; the page is a fatwa on selling the wool of dead
animals. The point it was cited for is supported elsewhere (§7), but it is why
nothing below is marked ✓ unless it was opened by hand.

**Status of the fixes.** Iyad, 13 Sep: *"everything you mentioned should be
done"*, with the merged page named "Qiyam prayer / Tahajjud", and witr taught
as prayable before qiyam or tahajjud (if unsure of waking) or after them. His
screenshot of IslamWeb fatwa 2165 backs keeping witr first on Today: whoever
prayed witr early and then wakes prays tahajjud and does not repeat witr, "the
well-known correct view, the view of the majority". The optional qunut step is
held: it needs a transliteration from a source and a recording, which adds to
the audio gate.

- §1 ʿIsha until Fajr: **done.** `windowEnd('isha')` is the next Fajr;
  Today and the day page name the middle of the night as the preferred end
  first, then "Its preferred time has passed"; the ʿIsha page has the section;
  `night:check` asserts the window.
- §2, §5a, §5c, §6 and §7, witr and the night guides: **done.**
  - The page teaches three, two then one, and the guide generates it (`units`
    on the spec). It cites Ibn ʿUmar's practice (Bukhari 991) and the
    majority on separating them (✓ IslamWeb 415267).
  - One on its own "still counts, but most scholars dislike it" (✓ IslamWeb
    92752).
  - A schools note says how Hanafi mosques pray it (✓ SeekersGuidance,
    Faraz Rabbani: "3 Rakas of Witr are wajib after Isha", qunut before
    bowing), and that praying with them is fine (✓ IslamQA 66613).
  - Bukhari 998 replaces Muslim 752 as the hero.
  - "When" follows Muslim 755 and Bukhari 1178; "What if I prayed it and then
    wake up?" follows Abu Dawud 1439 and IslamWeb 2165, the majority view.
    The other view in that fatwa, opening the later prayer with one rakʿah to
    make the earlier witr even, is recorded here and not on the page: a
    beginner rarely meets it, and a second red note on one page is what
    `style:check` warns against. "What if I sleep through it?" is answered
    with Abu Dawud 1431 and Tirmidhi 465.
- §3, §4, §5b and §5d, qiyam al-layl and tahajjud: **done**, as one page and
  one guide, "Qiyam prayer / Tahajjud" (Iyad's name).
  - Qiyam al-layl is any voluntary prayer after ʿIsha until Fajr, before
    sleep or after it (✓ IslamWeb 138716, ✓ IslamQA 305489). It is called
    tahajjud when you sleep first, and many scholars use the word for any
    night prayer (✓ IslamQA 143240).
  - Best in the last third and after sleeping (Bukhari 1145, Muslim 755,
    IslamQA 305489). Why pray it: Muslim 1163, Qur'an 17:79 as the command
    to the Prophet ﷺ without the old argument from its wording, and
    IslamQA 50070 for its ruling. "How little counts" cites Bukhari 6465 in
    place of Muslim 783.
  - Witr at the end, or before sleep if unsure of waking. The Ramadan words
    come from IslamQA 109768.
  - The Pray tab has one row, the Today cards for the middle of the night and
    the last third open the same page under different kickers, and
    `reference:tahajjud` and `guide:tahajjud` migrate in `progress-keys.ts`.
    `search:check` asserts both names find it.
  - The night guides (witr, qiyam, tahajjud) say "quietly or aloud", citing
    Abu Dawud 1437; istikhara and tawba keep "quietly". The seven guides with
    no `units` or `night` were compared step for step against the previous
    build and are identical.

**Review status of these pages.** `docs/scholarly-review.md` has no entry on
witr, tahajjud, qiyam al-layl, taraweeh, qunut or when ʿIsha ends, and
`docs/curriculum-review-pile.md` does not list them. The only marker is the
⚠️ REVIEW REQUIRED comment at the top of `src/content/learn/voluntary-prayers.ts`.
They have not been through the 26 August review.

---

## Summary, ranked by what changes someone's worship

| # | Finding | Where | Verdict |
|---|---|---|---|
| 1 | ʿIsha is shown as ending at the middle of the night, and the pray button hides after it. Most scholars hold ʿIsha is valid until Fajr. | `lib/prayer-times.ts:417`, `ui.ts:459`, `learn/daily-prayers.ts:253` | Inaccurate for the majority |
| 2 | Witr: "one is enough" and "start with one" are not valid for Hanafis, who also hold witr obligatory and qunut obligatory. The page prints "The witr is a duty for every Muslim" under "Do I have to? No". | `voluntary-prayers.ts:327,330,348,351` | Needs a madhhab decision and a note |
| 3 | Qiyam al-layl is defined as prayer *before* sleeping. No source found says so; it is the general term for night prayer. | `voluntary-prayers.ts:241,252,259`, `prayers.ts:730` | Inaccurate |
| 4 | Tahajjud "only after sleep" is presented as the definition; the majority of jurists use the word for night prayer at any time. | `voluntary-prayers.ts:52,81` | Inaccurate as stated |
| 5 | Muslim 752 is printed with the English "at the end of the prayer"; the Arabic says "at the end of the night". It is the hero quote of the witr page. | `evidence.ts:2955` | Mistranslation on screen |
| 6 | Muslim 783 renders ʿAlqama's question to ʿAisha, not the saying the page paraphrases. | `voluntary-prayers.ts:71,73`, `evidence.ts:2923` | Wrong narration on screen |
| 7 | Bukhari 990 is cited under "Pray it before you go to bed"; it says nothing about that. | `voluntary-prayers.ts:357` | Wrong citation |
| 8 | Qur'an 17:79's "as something additional" is read as "it is not owed". The tafsir reads the word as about the Prophet ﷺ himself, and many say it was an obligation on him. | `voluntary-prayers.ts:63` | Inaccurate reasoning (conclusion true) |
| 9 | Today offers witr first on every night; the Sunnah is to leave witr to the end of the night for anyone who will wake. | `lib/night.ts` | Iyad's call, flagged once |
| 10 | "What if I sleep through it?" is never answered. | `voluntary-prayers.ts:354–358` | Incomplete |
| 11 | Taraweeh: nothing says it follows ʿIsha, how many rakʿahs, that witr closes it, or what to do about witr if you pray again later. | `voluntary-prayers.ts:266`, `learn/ramadan.ts:163` | Incomplete |
| 12 | The night guides tell the reader to recite quietly, on the reasoning that "a voluntary prayer in the day is silent". Night prayer may be recited either way. | `prayers.ts:713` | Valid instruction, wrong reason |
| 13 | Pray tab rows state a best time as if it were the window. | `prayers.ts:720,750` | Incomplete |
| 14 | Dua book, dhikr after witr: broken quote marks, the instruction inside the quoted words, and part of the dhikr is a narrator's addition. | `duas/hisn.ts:1616` | Text defect |

Accurate, and confirmed: see §10.

---

## 1. When ʿIsha ends

**What the app says.**
- The ʿIsha page quick fact: "From nightfall until the middle of the night" (`learn/daily-prayers.ts:253`).
- The Awqat day row: "Middle of the night · ʿIsha ends" (`ui.ts:459`).
- `windowEnd('isha')` returns the middle of the night (`lib/prayer-times.ts:417`). Today's prayer card marks ʿIsha closed then and hides the pray button.
- The windows sheet note sends someone whose window closed to "I missed a prayer".

**What the sources say.**
- ✓ Muslim 612.01: "When you pray ʿIsha, its time is until half of the night has passed." This is the evidence for the middle of the night as ʿIsha's *chosen* time.
- ✓ islamweb fatwa 228886: the time of ʿIsha "extends according to the majority of scholars until the break of dawn". After the middle (or the third) of the night it is a "time of necessity". The view that ʿIsha becomes a make-up prayer after midnight is called "a weak position contradicting the evidence".
- ◐ Ibn ʿUthaymin holds that it ends at the middle of the night (islamweb 136795).
- The code already knows this. `ui.ts:407–414` carries a review comment: "the preferred position; schools differ on the permissible end". No sentence on screen says it.

**Why it is first.** Someone who wakes at 1am having not prayed ʿIsha is told
the window has closed and is pointed at missed prayers. On the majority view
they should simply pray ʿIsha, now. That is a wrong answer about how someone
worships.

**Accurate statement:** ʿIsha's preferred time ends at the middle of the night;
it is still valid until Fajr, and should not be delayed past the middle without
reason. The app's choice of label and whether the pray button stays until Fajr
are Iyad's; the ruling is the reviewer's.

## 2. Witr and the schools

**What the app says.**
- Quick facts: "One, three or five. Any odd number, and one is enough" and "Do I have to? No, but it is how the night prayer is closed" (`voluntary-prayers.ts:327,330`).
- "one is a complete witr rather than a shortened version of something else", with the note "Start with one" (`:348,351`).
- The generated guide is one rakʿah with no qunut.

**What the sources say.**
- ◐ The Kuwaiti Mawsuʿah (read by the research pass from a mirror):
  - The majority hold witr is a confirmed sunnah; Abu Hanifah holds it wajib, not fard.
  - Shafiʿis and Hanbalis: one rakʿah is valid but stopping at one is "less than best".
  - Hanafis: one rakʿah is not valid.
  - Malikis: witr comes only after a pair.
- ✓ Dar al-Iftaa (Egypt), fatwa 15984, on qunut in witr:
  - Hanafi: obligatory, after the surah in the third rakʿah.
  - Shafiʿi: sunnah in witr in the second half of Ramadan.
  - Hanbali: sunnah in witr all year.
  - (Maliki not discussed on that page; ◐ the Mawsuʿah calls it disliked.)
- ✓ islamqa 66613: three rakʿahs with two tashahhuds like Maghrib (the Hanafi form) is called "at the very least makrooh" by that site. Still: "There is nothing wrong with praying behind them… because what they are doing is following a mujtahid imam."
- ✓ Abu Dawud 1422, printed on the page as the section's quote. Its English: "The witr is a duty for every Muslim." The Arabic word is *ḥaqq*, a right or duty. The Hanafis read it as obligation; the majority as strong emphasis. A beginner reads "duty" beside a fact that says "No".
- ✓ Nasaʾi 1699 (sahih): three rakʿahs reciting al-Aʿla, al-Kafirun, al-Ikhlas, "the Qunut before bowing", then "Subhanal-Malikil-Quddus" three times.

**Verdict.**
- "Any odd number, and one is enough" is the Shafiʿi and Hanbali position stated as the rule.
- A convert at a Hanafi mosque (much of South Asia, Turkey, and many mosques in the UK and US) will see three rakʿahs, sitting after the second, and qunut before rukuʿ all year. Following the app, they pray a witr their mosque holds invalid.
- CLAUDE.md's rule applies: teach one way, and put the difference a beginner will meet in the step's `note` in one plain sentence.
- **Iyad's decision first:** the madhhab choice is still open (memory, 18 Aug). Then the reviewer.

## 3. Qiyam al-layl is the general term

**What the app says.**
- "Qiyam al-Layl · When: Any part of the night, before you sleep" (`voluntary-prayers.ts:241`).
- "What is qiyam al-layl? Praying at night, before you have slept." (`:252`)
- "How is it different from tahajjud? Whether you slept… This is the whole difference." (`:259`)
- The Pray tab row: "Any part of the night, before you sleep" (`prayers.ts:730`).

**What the sources say.**
- ✓ islamqa 143240, citing al-Mawsuʿah al-Fiqhiyyah 2/232:
  - qiyam al-layl is "spending the night, or part of it, even if it is only one hour, in prayer, reading Quran, remembering Allah";
  - "qiyam al-layl is more general than tahajjud… it includes prayer before and after sleeping".
- ◐ islamweb 138716: every prayer a Muslim prays at night is qiyam al-layl. ◐ islamqa 305489: whether sleep preceded it or not.
- ◐ Ibn Baz (binbaz.org.sa/fatwas/4259): taraweeh may be called tahajjud or qiyam al-layl.
- No reputable source found defines qiyam al-layl as prayer before sleep.

**Also inaccurate:** "nobody is doing the lesser one" (`:259`).
- ✓ Muslim 755: prayer at the end of the night "is witnessed (by the angels) and that is preferable".
- ◐ islamweb 299089: it is better for qiyam to follow sleep.

The note "If you are unsure which you prayed, it does not affect whether it
counted" is accurate.

**Accurate statement:** qiyam al-layl is any voluntary prayer at night after
ʿIsha, before or after sleep. Tahajjud is night prayer too, and some scholars
reserve the word for prayer after waking. Either counts fully; late in the
night, and after sleep, is better.

## 4. Tahajjud

**What the app says.**
- "When: The last part of the night, after you have slept" (`voluntary-prayers.ts:52`).
- "Tahajjud is prayed after waking… If you have not slept, you are praying qiyam al-layl… and not what this word means." (`:81`), supported only by `general(...)`.
- The Pray tab row: "The last third of the night" (`prayers.ts:720`).

**What the sources say.**
- ✓ islamqa 143240: two views on tahajjud. "The first is that it means praying at any time of the night, which is the view of the majority of fuqaha. The second is that it is prayer after sleeping."
- ✓ Ibn Kathir on 17:79 reports "what occurs after sleep" from ʿAlqama, al-Aswad and Ibrahim al-Nakhaʿi. So the after-sleep reading is real and old, but it is one reading.
- ✗ Ibn Baz (binbaz.org.sa/fatwas/12314), reported by a research pass as saying tahajjud early, in the middle or at the end of the night is all good. Re-opened on 13 Sep: the page is about women leaving the home. The second failed URL.
- ✓ IslamQA 305489 in its place: the night prayer the texts encourage "is from after the ʿIsha prayer until dawn", whether or not sleep came before it, and after sleep is better, the last third best.
- ✓ Muslim 755: the end of the night is the *best* time. It is not the only time.

**Verdict.** The after-sleep sense is a legitimate view, stated as the only one.
The last third is a best time, printed on the Pray tab as if it were the window.

## 5. Citations that do not say what they sit under

**5a. Muslim 752, mistranslated on screen.**
- ✓ `evidence.ts:2955`, Darussalam via fawazahmed0: "Witr is a rak'ah at the end of the prayer".
- The Arabic in the same entry: *al-witru rakʿatun min ākhiri l-layl*, "a rakʿah from the end of the night".
- ✓ The corpus's variant 752.02 translates the same words "at the end of the night prayer".
- It is the hero quote of the witr page, printed without a tap.
- The body above it says "Because that is what the word means", and the narration says nothing about what the word means.

**5b. Muslim 783, the wrong narration.**
- ✓ `evidence.ts:2923` renders variant 783.01: ʿAlqama asking ʿAisha whether the Prophet ﷺ chose particular days, and her answer "His act was continuous".
- The page says (`:71`) "the pattern the Prophet ﷺ described as the deeds God loves most, the small ones kept up".
- That saying is ✓ Muslim 783.02 ("The acts most pleasing to Allah are those which are done continuously, even if they are small") and ✓ Bukhari 6465 ("What deeds are loved most by Allah?" "The most regular constant deeds even though they may be few").
- The citation resolved without error and shows the wrong text: the trap recorded for Muslim's numbering, one level down, at the variant.
- "People who pray it for decades mostly pray a little, often" has no source.

**5c. Bukhari 990, under "before bed".**
- ✓ Bukhari 990 is "The night prayer is offered as two Rak`at followed by two… and if anyone is afraid of the approaching dawn he should pray one Rak`ah."
- It does not support "Pray it before you go to bed. Leaving it to the end of the night is better, but only if you are actually going to be awake" (`:357`).
- The evidence for that sentence:
  - ✓ Muslim 755.01 (Jabir): "If anyone is afraid that he may not get up in the latter part of the night, he should observe Witr in the first part of it; and if anyone is eager to get up in the last part of it, he should observe Witr at the end of the night… and that is preferable";
  - ✓ Bukhari 1178 and Muslim 721.01: Abu Hurayrah was advised "to offer witr before sleeping".

**5d. Qur'an 17:79, the argument from one word.**
- The page (`:63`): "The Qur'an tells the Prophet ﷺ to keep part of the night for it as something additional, and that word matters: it is not owed."
- ✓ Ibn Kathir on 17:79 reports two readings of *nāfilatan laka*:
  - that the Prophet ﷺ is "singled out for its obligation upon you alone", from Ibn ʿAbbas, one of al-Shafiʿi's positions, and the view Ibn Jarir al-Tabari chose;
  - or that it was extra for him because his sins were forgiven (Mujahid).
- Either way the word is about him.
- That night prayer is not obligatory on the rest of the ummah is true, but it rests on other evidence (◐ e.g. the hadith of the five daily prayers), not on this word.

## 6. Witr: what the pages leave out

- **"What if I sleep through it?"** (`:354`) is answered with advice about praying before bed. The answer to the question asked:
  - ✓ Abu Dawud 1431 (sahih): "If anyone oversleeps and misses the witr, or forgets it, he should pray when he remembers"; ✓ Tirmidhi 465 (sahih), the same.
  - ✓ Muslim 746.05: when the Prophet ﷺ missed the night prayer "due to pain or any other reason, he observed twelve rak'ahs during the daytime".
  - ◐ Whether made up as an even number in the day (islamqa 65692), and whether it is required (Hanafi) or recommended (Shafiʿi, Hanbali), is for the reviewer.
- **"To close the night, after any night prayer"** (`prayers.ts:750`) implies witr needs a prayer before it. ◐ Only the Malikis require one.
- **Praying after witr** is allowed without repeating it:
  - ✓ Abu Dawud 1439, where Talq ibn ʿAli leads another congregation after his own witr;
  - ◐ Muslim 738.02, two rakʿahs sitting after witr.
  - The qiyam page's closing line (`:273`) is accurate on this.
- **The other option** the scholars give is missing. ✓ islamqa 232790: someone who prays witr with the imam and means to pray again later "may add a Rak`ah so that it will become even-numbered", then pray witr at the end of the night; or keep the first witr and not repeat it. The page gives only the second.

## 7. Recitation in the night guides

**What the app does.** The generated tahajjud, qiyam and witr guides recite
everything quietly. The code gives the reason (`prayers.ts:713`): "None is
recited aloud. A voluntary prayer in the day is silent, and these are prayed
alone."

**What the sources say.**
- ✓ Abu Dawud 1437 (sahih, all four graders) and ✓ Tirmidhi 449 (sahih): ʿAisha, asked how the Prophet ﷺ recited at night: "Sometimes he recited quietly and sometimes loudly."
- ✓ Abu Dawud 1329 (sahih): Abu Bakr and ʿUmar, each praying alone at night, told to raise and lower their voices a little.
- ✓ islamqa 67618, Ibn Baz: "The Sunnah in prayers at night is to recite out loud, whether the worshipper is praying on his own or has someone else with him… If he is praying on his own, then he has the choice… and what is prescribed is for him to do that which help him focus more", and to keep the voice low where it would disturb others.

**Verdict.** The instruction is valid; the reason is wrong on both counts. These
are night prayers, and praying alone does not make them silent. The same
`buildPrayer` path also generates istikhara and tawba, which may be prayed by
day, so a fix is a `spec` field, not a blanket change.

## 8. Taraweeh

**What the app says.**
- "Mosques fill up for taraweeh, a long optional night prayer" (`learn/ramadan.ts:163`).
- "In Ramadan, mosques announce 'qiyam' for the long night prayers in the last ten nights. Taraweeh is the same family of prayer. You are welcome at it, you can leave when you need to, and nobody is counting your rakʿahs." (`voluntary-prayers.ts:266`)
- Today shows "Taraweeh tonight" every night of Ramadan from ʿIsha to the last third.

**Confirmed.**
- ✓ islamqa 50547: taraweeh is prayed "after 'Isha on the first night of Ramadan, which is the night on which the new moon is sighted or the Muslims complete thirty days of Sha`ban", and "should not be offered if it is proven that the month has ended". Today's schedule matches: from the evening before the first fast, never on the night of Eid.
- ◐ Taraweeh is *qiyam Ramadan*: the virtue hadith "whoever stands in Ramadan" (Bukhari 37, 2009; Muslim 759). "Same family" is right.
- ◐ The late extra prayer in the last ten nights is common (islamqa 109768 calls both "qiyaam and taraweeh"), not universal, and the name varies.

**Missing, and what a newcomer meets on their first night.**
1. ◐ It begins after ʿIsha *and its sunnah*. Praying it before ʿIsha is not valid (Ibn Baz via islamqa 37829). Someone arriving late prays ʿIsha first.
2. ◐ Eight or twenty rakʿahs, in pairs, both sound (islamqa 9036; ʿAisha's eleven in Bukhari 1147). They will hear people argue which.
3. ◐ The imam leads witr at the end, often three rakʿahs with a long qunut aloud, to which people say āmīn. In Shafiʿi mosques the qunut may start only mid-month (✓ Dar al-Iftaa 15984).
4. ◐ Staying until the imam finishes counts as praying the whole night: Abu Dawud 1375, Tirmidhi 806, Nasaʾi 1605, Ibn Majah 1327, all graded sahih by al-Albani. "You can leave when you need to" is permissible (◐ islamqa 37829) but leaves out the one fact that changes behaviour.
5. ✓ If they mean to pray again later, see §6: add a rakʿah after the imam's witr, or keep it and do not repeat it.
6. ◐ Recited aloud in congregation (islamweb 54396).

**Timing, not a ruling.** ◐ Taraweeh's time runs until Fajr (al-Nawawi via
islamqa 37768), and ʿUmar preferred the later part (◐ Bukhari 2010). Today
handing over to "Tahajjud" at the last third is a screen decision. No text
should say taraweeh ends there, and none does.

## 9. Today's night schedule against the Sunnah

The schedule is:
- witr from ʿIsha to the middle of the night;
- qiyam from the middle to the last third;
- tahajjud from the last third to Fajr;
- in Ramadan, taraweeh from ʿIsha to the last third.

**The night from Maghrib to Fajr** is right. ◐ Ibn Baz via islamweb 376972;
Ibn ʿUthaymin via islamweb 136795 divides "the time between sunset and Fajr".

**Witr first.** ✓ Bukhari 998: "Make witr as your last prayer at night." ✓
Muslim 755: witr at the end of the night is preferable for whoever will get up,
and early for whoever fears he will not. Today offers witr first to everyone and
qiyam after it. With the qiyam page's line about not repeating witr, nothing on
screen is *wrong*. But the order teaches the fallback as the default.
Recorded once because the order was Iyad's instruction: he decides; a reviewer
would likely ask why.

**The windows are best times drawn as boundaries.**
- Qiyam al-layl does not stop at the last third.
- Tahajjud, on the after-sleep view, is marked by sleep, not by the clock.
- Witr stays valid until Fajr.

None of the kickers claims otherwise ("After ʿIsha", "Past the middle of the
night", "The last third of the night" are facts about the clock). The Pray tab
row "The last third of the night" is the one place a best time reads as a window.

## 10. Confirmed accurate

- **Night prayer is in pairs.** ✓ Bukhari 990, ✓ Muslim 749.
- **A night has one witr.** ✓ Abu Dawud 1439, graded sahih. The qiyam page's closing line matches the majority view.
- **Taraweeh nights.** From the sighting night, not the night of Eid (✓ islamqa 50547).
- **Tahajjud:** "Two rakʿahs. That is a whole tahajjud" and "Nobody is behind for not praying it". Not obligatory on the ummah, no minimum.
- **"Set an alarm twenty minutes before Fajr"** is practical advice that lands in the best time.
- **Jibril and the Qurʾan.** Jibril went through the Qur'an with the Prophet ﷺ every night of Ramadan (Bukhari 6, as printed).
- **Laylat al-Qadr** in the odd nights of the last ten (Bukhari 2017, as printed).
- **ʿIsha in congregation** "as if he prayed up to midnight" (Muslim 656a, as printed).
- **Witr's time:** "After Isha, any time until dawn". This is the majority view. ◐ The Malikis allow it until the Subh prayer for someone who overslept.

## 11. Dua book: dhikr after witr

`duas/hisn.ts:1608–1623`, occasion 1269338, from Hisn al-Muslim via IslamHouse,
renders verbatim.

- **Quote marks.** The English is `Glory be to the Sovereign, the Most Holy," three times, and he raises his voice and prolongs it in the third one, saying: "Lord of the angels and the Spirit.` It has no opening quote and a stray one after "Holy".
- **The instruction is inside the words.** The Arabic line carries "three times, and on the third he raises his voice" inside the text a reader recites from.
- **A narrator's addition.** The stored footnote says the bracketed part is an addition from al-Daraqutni, which is where "Lord of the angels and the Spirit" comes from. ✓ Nasaʾi 1699's own text ends at "Subhanal-Malikil-Quddus" three times.

IslamHouse publishes no terms, so correcting punctuation is possible. The
instruction and the addition are the reviewer's.

---

## What each person has to decide

**Iyad:**
1. The madhhab the witr page and guide teach, and whether they carry qunut (§2).
2. Whether ʿIsha's pray button stays until Fajr, and the Awqat label (§1).
3. Whether Today keeps witr before qiyam (§9).

**The reviewer:**
- the replacement wording for §1, §3, §4 and §5d;
- the right evidence for the consistency and before-bed sentences (§5b, §5c);
- how making up witr is taught (§6);
- the madhhab note once Iyad has chosen (§2);
- how much of §8 a new Muslim's first taraweeh needs.

**Fixable without a ruling, once agreed:**
- Muslim 752's translation (§5a): take HadeethEnc's English if it carries this narration, or quote 752.02's.
- The Muslim 783 citation (§5b): Bukhari 6465 says it plainly.
- The Bukhari 990 citation (§5c): Muslim 755 and Bukhari 1178.
- The recitation reason in the guides (§7).
- The quote marks in §11.
