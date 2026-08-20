import { hadith, quran } from './sources';
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
    transliteration: 'Ihdinā-ṣ-ṣirāṭa-l-mustaqīm',
    translation: 'Guide us along the straight path.',
    audioId: 'fatiha-6',
  },
  {
    arabic:
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      'Ṣirāṭa-lladhīna anʿamta ʿalayhim ghayri-l-maghḍūbi ʿalayhim wa lā-ḍ-ḍāllīn',
    translation:
      'The path of those You have blessed — not of those who have earned Your anger, nor of those who have gone astray.',
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
      'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
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
    // The wording is the Qur'an's own, in the verse that gives the instruction.
    sources: [quran(16, 98, { surahName: 'An-Nahl' })],
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
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Samiʿa-llāhu liman ḥamidah — Rabbanā wa laka-l-ḥamd',
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
      'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
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

  shahada: {
    title: 'The testimony of faith',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    transliteration: 'Lā ilāha illā-llāh, Muḥammadun rasūlu-llāh',
    translation: 'There is no god but Allah, and Muhammad is the Messenger of Allah.',
    audioId: 'shahada',
  },

  shahadaAfterWudu: {
    title: 'After wudu',
    arabic:
      'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
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
    transliteration: 'Bismillāh',
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

  duaSleep: {
    title: 'Going to sleep',
    arabic:
      'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration:
      'Bismika Allāhumma amūtu wa aḥyā',
    translation:
      'In Your name, O Allah, I die and I live.',
    sources: [
      hadith('bukhari', '6324', {
        book: 80,
        bookName: 'Invocations',
        inBookReference: 'Book 80, Hadith 21',
      }),
    ],
    audioId: 'dua-sleep',
  },

  duaWake: {
    title: 'Waking up',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration:
      'Al-ḥamdu li-llāhi-lladhī aḥyānā baʿda mā amātanā wa ilayhi-n-nushūr',
    translation:
      'All praise is for Allah, who gave us life after taking it, and to Him is the return.',
    sources: [
      hadith('bukhari', '6324', {
        book: 80,
        bookName: 'Invocations',
        inBookReference: 'Book 80, Hadith 21',
      }),
    ],
    audioId: 'dua-wake',
  },

  duaLeaveHome: {
    title: 'Leaving the house',
    arabic:
      'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
    transliteration:
      'Bismi-llāh, tawakkaltu ʿala-llāh, lā ḥawla wa lā quwwata illā bi-llāh',
    translation:
      'In the name of Allah. I place my trust in Allah. There is no power and no strength except with Allah.',
    sources: [
      hadith('abu-dawud', '5095', {
        book: 43,
        bookName: 'General Behavior (Kitab Al-Adab)',
        inBookReference: 'Book 43, Hadith 323',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
    ],
    audioId: 'dua-leave-home',
  },

  duaEnterToilet: {
    title: 'Going into the bathroom',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration:
      'Allāhumma innī aʿūdhu bika mina-l-khubthi wa-l-khabāʾith',
    translation:
      'O Allah, I seek refuge with You from all that is foul and from all evil.',
    sources: [
      hadith('bukhari', '142', {
        book: 4,
        bookName: "Ablutions (Wudu')",
        inBookReference: 'Book 4, Hadith 8',
      }),
    ],
    audioId: 'dua-enter-toilet',
  },

  duaLeaveToilet: {
    title: 'Coming out of the bathroom',
    arabic:
      'غُفْرَانَكَ',
    transliteration:
      'Ghufrānak',
    translation:
      'I ask Your forgiveness.',
    sources: [
      hadith('abu-dawud', '30', {
        book: 1,
        bookName: 'Purification (Kitab Al-Taharah)',
        inBookReference: 'Book 1, Hadith 30',
        grading: 'sahih',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
    ],
    audioId: 'dua-leave-toilet',
  },

  duaAfterEating: {
    title: 'After eating',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration:
      'Al-ḥamdu li-llāhi-lladhī aṭʿamanā wa saqānā wa jaʿalanā muslimīn',
    translation:
      'All praise is for Allah, who fed us and gave us drink, and made us Muslims.',
    /**
     * Carried by three of the six books through two different chains, and
     * graded weak in every one of them. Recorded as it is rather than trimmed
     * to the single citation that looked least awkward: a reviewer should see
     * that the weakness is not one grader's opinion of one chain.
     *
     * `role: 'practice'` because this is the wording of a recommended duʿa,
     * not an obligation, a prohibition or a point of creed. See `EvidenceRole`.
     */
    sources: [
      hadith('abu-dawud', '3850', {
        book: 28,
        bookName: "Foods (Kitab Al-At'imah)",
        inBookReference: 'Book 28, Hadith 115',
        grading: 'daif',
        gradedBy: 'Al-Albani',
        role: 'practice',
      }),
      hadith('tirmidhi', '3457', {
        book: 48,
        bookName: 'Chapters on Supplication',
        inBookReference: 'Book 48, Hadith 88',
        grading: 'daif',
        gradedBy: 'Darussalam',
        role: 'practice',
      }),
      hadith('ibn-majah', '3283', {
        book: 29,
        bookName: 'Chapters on Food',
        inBookReference: 'Book 29, Hadith 33',
        grading: 'daif',
        gradedBy: 'Darussalam',
        role: 'practice',
      }),
    ],
    audioId: 'dua-after-eating',
  },

  /**
   * The other after-meal duʿa, and the one with the stronger grading.
   *
   * A different text from `duaAfterEating` rather than another chain for it —
   * Tirmidhi and Ibn Majah both carry this one as hasan. Kept alongside rather
   * than instead: both are taught, and dropping the widely-said one because a
   * better-graded one exists would be a decision this app has no business
   * making for a reader.
   *
   * Arabic taken from the Tirmidhi and Ibn Majah pages, which print it
   * identically. No `audioId` — nothing has been recorded for it, and an id
   * pointing at a file that does not exist would fail the whole bundle.
   */
  duaAfterEatingProvision: {
    title: 'After eating',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration:
      'Al-ḥamdu li-llāhi-lladhī aṭʿamanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
    translation:
      'All praise is for Allah, who fed me this and provided it for me, with no strength or power of my own.',
    sources: [
      hadith('tirmidhi', '3458', {
        book: 48,
        bookName: 'Chapters on Supplication',
        inBookReference: 'Book 48, Hadith 89',
        grading: 'hasan',
        gradedBy: 'Darussalam',
        role: 'practice',
      }),
      hadith('ibn-majah', '3285', {
        book: 29,
        bookName: 'Chapters on Food',
        inBookReference: 'Book 29, Hadith 35',
        grading: 'hasan',
        gradedBy: 'Darussalam',
        role: 'practice',
      }),
    ],
  },

  duaTravel: {
    title: 'Setting off on a journey',
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الأَهْلِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ',
    transliteration:
      'Subḥāna-lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn. Allāhumma innā nasʾaluka fī safarinā hādha-l-birra wa-t-taqwā, wa mina-l-ʿamali mā tarḍā. Allāhumma hawwin ʿalaynā safaranā hādhā wa-ṭwi ʿannā buʿdah. Allāhumma anta-ṣ-ṣāḥibu fi-s-safar, wa-l-khalīfatu fi-l-ahl. Allāhumma innī aʿūdhu bika min waʿthāʾi-s-safar, wa kaʾābati-l-manẓar, wa sūʾi-l-munqalabi fi-l-māl wa-l-ahl',
    translation:
      'Glory to Him who has made this subject to us, when we could never have managed it ourselves, and to our Lord we are returning. O Allah, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and fold up its distance. O Allah, You are the companion on the journey and the guardian of the family. O Allah, I seek refuge with You from the hardship of travel, from a sight that grieves, and from an ill turn in property and family.',
    sources: [
      hadith('muslim', '1342', {
        book: 15,
        bookName: 'The Book of Pilgrimage',
        // Book 15, Hadith 479 on the page. An earlier pass corrected the
        // hadith number here (it had cited the deprecated USC-MSA 3153) and
        // carried the wrong in-book number across with it.
        inBookReference: 'Book 15, Hadith 479',
      }),
    ],
    audioId: 'dua-travel',
  },
} satisfies Record<string, Recitation>;
