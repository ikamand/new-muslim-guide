import type { Recitation, RecitationVerse } from './types';

/**
 * The words said in prayer, in one place so a correction lands everywhere.
 *
 * These are the widely agreed wordings. Where schools of thought differ the
 * step that uses them carries a `note` saying so — the app teaches one clear
 * way to pray rather than every variation, because a first-timer needs a
 * path, not a comparison table.
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
} satisfies Record<string, Recitation>;
