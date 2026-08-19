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
 * ⚠️ `duaAfterEating` is graded DA'IF by Al-Albani. The app's stated evidence
 * bar is authenticated hadith, so `npm run content:audit` fails on it by
 * design. Tirmidhi 3458 and Ibn Majah 3285 carry a different after-meal duʿa
 * graded hasan — swapping to it is a content decision for review, not one to
 * make here.
 *
 * The prayer recitations above still carry no reference. That is a gap the
 * same report shows, not a claim that none exists.
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
    audioId: 'opening',
  },

  taawwudh: {
    title: 'Seeking refuge',
    arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'Aʿūdhu bi-llāhi mina-sh-shayṭāni-r-rajīm',
    translation: 'I seek refuge in Allah from Satan, the rejected.',
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
    audioId: 'ruku-tasbih',
  },

  rising: {
    title: 'Rising from rukuʿ',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Samiʿa-llāhu liman ḥamidah — Rabbanā wa laka-l-ḥamd',
    translation:
      'Allah hears the one who praises Him. Our Lord, to You belongs all praise.',
    audioId: 'rising',
  },

  sujudTasbih: {
    title: 'In sujud',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subḥāna rabbiya-l-aʿlā',
    translation: 'Glory be to my Lord, the Most High.',
    times: 'Three times',
    audioId: 'sujud-tasbih',
  },

  betweenProstrations: {
    title: 'Between the prostrations',
    arabic: 'رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbi-ghfir lī',
    translation: 'My Lord, forgive me.',
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
    audioId: 'salawat',
  },

  taslim: {
    title: 'The taslim',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'As-salāmu ʿalaykum wa raḥmatu-llāh',
    translation: 'Peace be upon you, and the mercy of Allah.',
    times: 'Once to the right, then once to the left',
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
    audioId: 'shahada-after-wudu',
  },

  bismillah: {
    title: 'Before wudu',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh',
    translation: 'In the name of Allah.',
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
    sources: [
      hadith('abu-dawud', '3850', {
        book: 28,
        bookName: "Foods (Kitab Al-At'imah)",
        inBookReference: 'Book 28, Hadith 115',
        grading: 'daif',
        gradedBy: 'Al-Albani',
      }),
    ],
    audioId: 'dua-after-eating',
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
        inBookReference: 'Book 15, Hadith 75',
      }),
    ],
    audioId: 'dua-travel',
  },
} satisfies Record<string, Recitation>;
