import { hadeethEnc, hadith, quran } from './sources';
import type { Recitation, RecitationVerse } from './types';

/**
 * The words said in prayer, in one place so a correction lands everywhere.
 *
 * These are the widely agreed wordings. Where schools of thought differ the
 * step that uses them carries a note saying so — the app teaches one clear
 * way to pray rather than every variation, because a first-timer needs a
 * path, not a comparison table.
 *
 * ⚠️ EVERY citation below was checked against sunnah.com by opening the page
 * and matching the Arabic. Five of the seven that were here before were wrong:
 *
 *   - the duʿa before sleeping cited Bukhari 6087, which is about smiling and
 *     the expiation for breaking a fast in Ramadan
 *   - the duʿa on waking cited Bukhari 6075, also Kitab al-Adab
 *     (both are in fact Bukhari 6324, which carries the two together in
 *     exactly this wording)
 *   - leaving the house cited Abu Dawud 5097; it is 5095
 *   - after eating cited Abu Dawud 3851; it is 3850
 *   - travel cited Muslim 3153, the deprecated USC-MSA number, not 1342
 *
 * ⚠️ `duaAfterEating` is graded DA'IF — by Al-Albani in Abu Dawud, and by
 * Darussalam in Tirmidhi 3457 and Ibn Majah 3283. Three collections, two
 * chains, the same verdict. It is kept, labelled, and cited as a `practice`
 * wording rather than a ruling, and `duaAfterEatingProvision` sits beside it
 * carrying the hasan-graded alternative. Neither is presented as the other.
 *
 * An earlier pass compared this against Tirmidhi 3458 and Ibn Majah 3285 and
 * called them "the same duʿa graded hasan". They are not — 3458 and 3285 are a
 * DIFFERENT text. 3457 and 3283 are the same text, and both are weak.
 *
 * ⚠️ The prayer recitations no longer carry nothing. Every one of them was
 * matched, letter for letter with the vowel marks stripped, against the page
 * it now cites — takbir and rising to Bukhari 795, tashahhud to Bukhari 831,
 * salawat to Bukhari 3370, the two tasbihs to Muslim 772, the opening
 * supplication to Abu Dawud 775, `rabbi-ghfir lī` to Abu Dawud 874, the taslim
 * to Abu Dawud 996, and the shahada after wudu to Muslim 234b. What is checked
 * is the wording and the number; the English translations beside them are still
 * the app's own and still want a qualified reader.
 *
 * Every citation in the app — not only in this file — was then cross-checked
 * mechanically against sunnah.com: in-book reference, grading, and grading
 * authority, sixty-six narrations. One was wrong, and it was in here: the
 * travel duʿa's in-book reference was Book 15, Hadith 75 and the page says 479.
 *
 * One of those nearly went the wrong way. The shahada after wudu matches
 * Muslim 234b exactly, but not 234a and not Abu Dawud 169 — each is one word
 * different — and stopping at the first two would have made the app "correct"
 * a text that was already right. A near miss is not a miss; keep reading.
 */
/**
 * Al-Fatiha, ayah by ayah.
 *
 * Held as verses rather than one block because memorising it means looping a
 * single ayah until it sticks. The whole-surah strings below are derived from
 * this, so there is still one place to correct.
 */
const FATIHA_VERSES: RecitationVerse[] = [
  {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismi-llāhi-r-raḥmāni-r-raḥīm',
    translation: 'In the name of Allah, the Most Merciful, the Most Compassionate.',
    audioId: 'fatiha-1',
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Al-ḥamdu li-llāhi rabbi-l-ʿālamīn',
    translation: 'All praise is for Allah, Lord of all worlds.',
    audioId: 'fatiha-2',
  },
  {
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Ar-raḥmāni-r-raḥīm',
    translation: 'The Most Merciful, the Most Compassionate.',
    audioId: 'fatiha-3',
  },
  {
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    transliteration: 'Māliki yawmi-d-dīn',
    translation: 'Master of the Day of Judgement.',
    audioId: 'fatiha-4',
  },
  {
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyāka naʿbudu wa iyyāka nastaʿīn',
    translation: 'You alone we worship, and You alone we ask for help.',
    audioId: 'fatiha-5',
  },
  {
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdina-ṣ-ṣirāṭa-l-mustaqīm',
    translation: 'Guide us along the straight path.',
    audioId: 'fatiha-6',
  },
  {
    arabic:
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      'Ṣirāṭa-lladhīna anʿamta ʿalayhim ghayri-l-maghḍūbi ʿalayhim wa la-ḍ-ḍāllīn',
    translation:
      'The path of those You have blessed, not of those who have earned Your anger, nor of those who have gone astray.',
    audioId: 'fatiha-7',
  },
];

export const Recitations = {
  takbir: {
    title: 'The takbir',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu akbar',
    translation: 'Allah is the greatest.',
    // Abu Huraira's description of where the takbir falls in the prayer:
    // on bowing, on rising, on prostrating, and on standing after the two.
    sources: [
      hadith('bukhari', '795', {
        book: 10,
        bookName: 'Call to Prayers (Adhaan)',
        inBookReference: 'Book 10, Hadith 190',
      }),
    ],
    audioId: 'takbir',
  },

  opening: {
    title: 'The opening supplication',
    arabic:
      'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ',
    transliteration:
      'Subḥānaka-llāhumma wa biḥamdika, wa tabāraka-smuka, wa taʿālā jadduka, wa lā ilāha ghayruk',
    translation:
      'Glory be to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is no god but You.',
    sources: [
      hadith('abu-dawud', '775', {
        book: 2,
        bookName: 'Prayer (Kitab Al-Salat)',
        inBookReference: 'Book 2, Hadith 385',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
    ],
    audioId: 'opening',
  },

  taawwudh: {
    title: 'Seeking refuge',
    arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'Aʿūdhu bi-llāhi mina-sh-shayṭāni-r-rajīm',
    translation: 'I seek refuge in Allah from Satan, the rejected.',
    /*
      ⚠️ THIS COMMENT USED TO SAY THE WORDING IS THE QUR'AN'S OWN. It is not.

      16:98 reads `فَاسْتَعِذْ بِاللَّهِ` — "seek refuge in Allah", an
      imperative addressed to the reader. What a person actually says is
      `أَعُوذُ بِاللَّهِ`, "I seek refuge in Allah". The verse commands the act
      and does not supply the words, and the two are different verbs in
      different persons.

      Nothing in the repo could see that until `npm run content:verify`
      compared the app's text against the verse it cited. The citation stays,
      because the verse really is why this is said here; `wordingElsewhere`
      records what it does not establish.

      ⚠️ REVIEW REQUIRED — the wording still has no citation of its own, and
      the reason is worth writing down rather than rediscovering.

      Checked 26 Aug 2026: these exact words appear in **Sunan Abi Dawud
      4781**, graded sahih by al-Albani, Muhyi al-Din Abdul Hamid and Shuaib
      al-Arnaut, with Zubair Ali Zai noting Bukhari 2382 and Muslim 2610. So
      "it is in the collections" is no longer an assertion; it is verified.

      It is still not cited here, because that narration is about a man who
      was ANGRY — the Prophet ﷺ said he knew a word that would take away what
      the man was feeling. Right words, different ruling. Putting that number
      under the prayer's recite step would be the mistake the Sahih Muslim
      numbering bug made on eighteen citations: a reference that resolves, and
      renders, and is about something else.

      What is missing is a narration of these words IN THE PRAYER. A reviewer
      may know one; this repo has not found it.
    */
    sources: [quran(16, 98, { surahName: 'An-Nahl', wordingElsewhere: true })],
    audioId: 'taawwudh',
  },

  fatiha: {
    sources: [quran(1, [1, 7], { surahName: 'Al-Fatihah' })],
    title: 'Al-Fatiha',
    arabic: FATIHA_VERSES.map((verse) => verse.arabic).join('\n'),
    transliteration: FATIHA_VERSES.map((verse) => verse.transliteration).join('\n'),
    translation: FATIHA_VERSES.map((verse) => verse.translation).join(' '),
    times: 'In every rakʿah, without exception',
    verses: FATIHA_VERSES,
  },

  rukuTasbih: {
    title: 'In rukuʿ',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subḥāna rabbiya-l-ʿaẓīm',
    translation: 'Glory be to my Lord, the Most Great.',
    times: 'Three times',
    sources: [
      hadith('muslim', '772', {
        book: 6,
        bookName: 'The Book of Prayer - Travellers',
        inBookReference: 'Book 6, Hadith 242',
      }),
    ],
    audioId: 'ruku-tasbih',
  },

  rising: {
    title: 'Rising from rukuʿ',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Samiʿa-llāhu liman ḥamidah. Rabbanā wa laka-l-ḥamd',
    translation:
      'Allah hears the one who praises Him. Our Lord, to You belongs all praise.',
    // Both halves in one narration, in this wording — Abu Huraira reports the
    // reply as `Rabbanā wa laka-l-ḥamd`, which is the form used here.
    sources: [
      hadith('bukhari', '795', {
        book: 10,
        bookName: 'Call to Prayers (Adhaan)',
        inBookReference: 'Book 10, Hadith 190',
      }),
    ],
    audioId: 'rising',
  },

  sujudTasbih: {
    title: 'In sujud',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subḥāna rabbiya-l-aʿlā',
    translation: 'Glory be to my Lord, the Most High.',
    times: 'Three times',
    sources: [
      hadith('muslim', '772', {
        book: 6,
        bookName: 'The Book of Prayer - Travellers',
        inBookReference: 'Book 6, Hadith 242',
      }),
    ],
    audioId: 'sujud-tasbih',
  },

  betweenProstrations: {
    title: 'Between the prostrations',
    arabic: 'رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbi-ghfir lī',
    translation: 'My Lord, forgive me.',
    sources: [
      hadith('abu-dawud', '874', {
        book: 2,
        bookName: 'Prayer (Kitab Al-Salat)',
        inBookReference: 'Book 2, Hadith 484',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
    ],
    audioId: 'between-prostrations',
  },

  tashahhud: {
    title: 'The tashahhud',
    arabic:
      'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration:
      'At-taḥiyyātu li-llāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt. As-salāmu ʿalayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh. As-salāmu ʿalaynā wa ʿalā ʿibādi-llāhi-ṣ-ṣāliḥīn. Ash-hadu an lā ilāha illa-llāh, wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh.',
    translation:
      'All greetings, prayers and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His messenger.',
    // Ibn Mas`ud's wording, taught by the Prophet ﷺ as the words to say in
    // place of what the companions had been saying.
    sources: [
      hadith('bukhari', '831', {
        book: 10,
        bookName: 'Call to Prayers (Adhaan)',
        inBookReference: 'Book 10, Hadith 225',
      }),
    ],
    audioId: 'tashahhud',
  },

  salawat: {
    title: 'The salawat',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration:
      'Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd.',
    translation:
      'O Allah, send prayers upon Muhammad and the family of Muhammad, as You sent prayers upon Abraham and the family of Abraham. You are indeed Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Abraham and the family of Abraham. You are indeed Praiseworthy, Glorious.',
    // Ka`b ibn `Ujrah asked how to send blessings, and this is the answer.
    sources: [
      hadith('bukhari', '3370', {
        book: 60,
        bookName: 'Prophets',
        inBookReference: 'Book 60, Hadith 44',
      }),
    ],
    audioId: 'salawat',
  },

  taslim: {
    title: 'The taslim',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'As-salāmu ʿalaykum wa raḥmatu-llāh',
    translation: 'Peace be upon you, and the mercy of Allah.',
    times: 'Once to the right, then once to the left',
    sources: [
      hadith('abu-dawud', '996', {
        book: 2,
        bookName: 'Prayer (Kitab Al-Salat)',
        inBookReference: 'Book 2, Hadith 607',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
    ],
    audioId: 'taslim',
  },

  /*
    ⚠️ REVIEW REQUIRED — the wording carries no hadith number, deliberately.

    Checked 26 Aug 2026. **Sahih al-Bukhari 8** — the hadith the app already
    cites for the five pillars — carries `شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ
    مُحَمَّدًا رَسُولُ اللَّهِ`: the testimony THAT there is no god but Allah and
    THAT Muhammad is His Messenger. What a person actually says, and what this
    app prints, is the declaration itself without the `أَنْ` and `وَأَنَّ`.

    That is the same distance as the taʿawwudh above, where 16:98 commands
    seeking refuge in a different verb and a different person from the words
    anybody says. Near enough to be obviously the same testimony; not the same
    string. `npm run content:verify` compares on a consonantal skeleton and
    would report a mismatch, correctly.

    So it stays uncited rather than carrying a number that a reviewer would
    have to walk back. The formula is universal and nothing about it is in
    doubt; what is missing is a narration printing it in this exact form.
  */
  shahada: {
    title: 'The testimony of faith',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    transliteration: 'Lā ilāha illa-llāh, Muḥammadun rasūlu-llāh',
    translation: 'There is no god but Allah, and Muhammad is the Messenger of Allah.',
    audioId: 'shahada',
  },

  shahadaAfterWudu: {
    title: 'After wudu',
    arabic:
      'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration:
      'Ash-hadu an lā ilāha illa-llāhu waḥdahu lā sharīka lah, wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh',
    translation:
      'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and His messenger.',
    /**
     * Muslim carries this occasion in several wordings. 234b is the one that
     * matches the app's text word for word — with `waḥdahu lā sharīka lah` and
     * with `wa ash-hadu anna` rather than `wa anna`. 234a and Abu Dawud 169
     * are each a word off, and Tirmidhi 55, which has the same wording, is
     * graded weak. Checked before assuming the app had reconstructed it.
     */
    sources: [
      hadith('muslim', '234b', {
        book: 2,
        bookName: 'The Book of Purification',
        inBookReference: 'Book 2, Hadith 21',
      }),
    ],
    audioId: 'shahada-after-wudu',
  },

  bismillah: {
    title: 'Before wudu',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismi-llāh',
    translation: 'In the name of Allah.',
    /**
     * The same two words serve the meal in `duas.ts`; the citation for that
     * occasion sits on the duʿa, because a source belongs to the claim it
     * supports rather than to the words.
     */
    sources: [
      hadith('abu-dawud', '101', {
        book: 1,
        bookName: 'Purification (Kitab Al-Taharah)',
        inBookReference: 'Book 1, Hadith 101',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
      }),
    ],
    audioId: 'bismillah',
  },








  /**
   * The istikhara duʿa, said after the two rakʿahs.
   *
   * ⚠️ COPIED, NOT COMPOSED, and the seam is worth knowing about. Every
   * publisher of Sahih al-Bukhari 3293 prints the narrator's alternative
   * INSIDE the supplication — "…and the outcome of my affairs" OR "…my
   * immediate and future affairs" — because Jabir was unsure which the
   * Prophet ﷺ said. A text carrying both is a narration; a text carrying
   * neither is a splice. This prints `وَعَاقِبَةِ أَمْرِي` throughout, which is
   * the wording the narration gives first and the one the printed duʿa
   * collections carry.
   *
   * Iyad's decision, 22 Aug 2026: both mean the same thing, choose one.
   *
   * The Arabic, transliteration and English were extracted from the app's own
   * `evidence.ts` entry `bukhari:he3293` — HadeethEnc's text — rather than
   * retyped, so nothing here passed through a keyboard. The narrator's closing
   * "and he names his need" is not part of the supplication and lives as a
   * note on the section instead.
   *
   * ⚠️ REVIEW REQUIRED — a reviewer owns whether this is the wording the app
   * should teach, not whether it was copied correctly.
   */
  istikhara: {
    title: 'The istikhara duʿa',
    arabic:
      "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي، وَمَعَاشِي، وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي",
    transliteration:
      "Allāhumma inni astakhīruka bi‘ilmika, wa astaqdiruka biqudratika, wa as’aluka min fadlik al-‘azhīm, fa ’innaka taqdiru wa la aqdiru, wa ta‘lamu wa la a‘lamu, wa anta ‘allāmu al-ghuyūb. Allāhumma in kunta ta‘lamu anna hādha al-’amra khayrun li fi dīni wa ma‘āshi wa ‘āqibati amri, faqdurhu li wa yassirhu li, thumma bārik li fīh. Wa in kunta ta‘lamu anna hādha al-’amra sharrun li fi dīni wa ma‘āshi wa ‘āqibati amri, fasrifhu ‘anni, wasrifni ‘anhu, waqdur li al-khayra haythu kāna, thumma ardini.",
    translation:
      "O Allah, I consult You for Your knowledge, and I seek strength from You for Your power, and I ask You of Your great bounty. Indeed, You are capable and I am not, and You know and I do not, and You are the All-Knower of the unseen. O Allah, if You know that this matter is good for me in my religion, my livelihood, and the outcome of my affairs, then decree it for me, make it easy for me, and then bless it for me. And if You know this matter is evil concerning my religion, my livelihood or the outcome of my affairs, then turn it away from me, and turn me away from it, and decree for me what is good wherever it may be, and make me content",
    sources: [hadeethEnc('bukhari', '3293', { grading: 'sahih', role: 'practice' })],
  },

} satisfies Record<string, Recitation>;
