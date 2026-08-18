import type { Recitation } from './types';

/**
 * The words said in prayer, in one place so a correction lands everywhere.
 *
 * These are the widely agreed wordings. Where schools of thought differ the
 * step that uses them carries a `note` saying so — the app teaches one clear
 * way to pray rather than every variation, because a first-timer needs a
 * path, not a comparison table.
 */
export const Recitations = {
  takbir: {
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu akbar',
    translation: 'Allah is the greatest.',
  },

  opening: {
    arabic:
      'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration:
      'Subḥānaka-llāhumma wa biḥamdika, wa tabāraka-smuka, wa taʿālā jadduka, wa lā ilāha ghayruk',
    translation:
      'Glory be to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is no god but You.',
  },

  taawwudh: {
    arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'Aʿūdhu bi-llāhi mina-sh-shayṭāni-r-rajīm',
    translation: 'I seek refuge in Allah from Satan, the rejected.',
  },

  fatiha: {
    arabic: [
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      'الرَّحْمَٰنِ الرَّحِيمِ',
      'مَالِكِ يَوْمِ الدِّينِ',
      'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    ].join('\n'),
    transliteration: [
      'Bismi-llāhi-r-raḥmāni-r-raḥīm',
      'Al-ḥamdu li-llāhi rabbi-l-ʿālamīn',
      'Ar-raḥmāni-r-raḥīm',
      'Māliki yawmi-d-dīn',
      'Iyyāka naʿbudu wa iyyāka nastaʿīn',
      'Ihdinā-ṣ-ṣirāṭa-l-mustaqīm',
      'Ṣirāṭa-lladhīna anʿamta ʿalayhim ghayri-l-maghḍūbi ʿalayhim wa lā-ḍ-ḍāllīn',
    ].join('\n'),
    translation:
      'In the name of Allah, the Most Merciful, the Most Compassionate. All praise is for Allah, Lord of all worlds — the Most Merciful, the Most Compassionate, Master of the Day of Judgement. You alone we worship, and You alone we ask for help. Guide us along the straight path, the path of those You have blessed — not of those who have earned Your anger, nor of those who have gone astray.',
    times: 'In every rakʿah, without exception',
  },

  rukuTasbih: {
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subḥāna rabbiya-l-ʿaẓīm',
    translation: 'Glory be to my Lord, the Most Great.',
    times: 'Three times',
  },

  rising: {
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Samiʿa-llāhu liman ḥamidah — Rabbanā wa laka-l-ḥamd',
    translation:
      'Allah hears the one who praises Him. Our Lord, to You belongs all praise.',
  },

  sujudTasbih: {
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subḥāna rabbiya-l-aʿlā',
    translation: 'Glory be to my Lord, the Most High.',
    times: 'Three times',
  },

  betweenProstrations: {
    arabic: 'رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbi-ghfir lī',
    translation: 'My Lord, forgive me.',
  },

  tashahhud: {
    arabic:
      'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration:
      'At-taḥiyyātu li-llāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt. As-salāmu ʿalayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh. As-salāmu ʿalaynā wa ʿalā ʿibādi-llāhi-ṣ-ṣāliḥīn. Ash-hadu an lā ilāha illa-llāh, wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh.',
    translation:
      'All greetings, prayers and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His messenger.',
  },

  salawat: {
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration:
      'Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd.',
    translation:
      'O Allah, send prayers upon Muhammad and the family of Muhammad, as You sent prayers upon Abraham and the family of Abraham. You are indeed Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Abraham and the family of Abraham. You are indeed Praiseworthy, Glorious.',
  },

  taslim: {
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'As-salāmu ʿalaykum wa raḥmatu-llāh',
    translation: 'Peace be upon you, and the mercy of Allah.',
    times: 'Once to the right, then once to the left',
  },

  shahadaAfterWudu: {
    arabic:
      'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration:
      'Ash-hadu an lā ilāha illa-llāhu waḥdahu lā sharīka lah, wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh',
    translation:
      'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and His messenger.',
  },

  bismillah: {
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh',
    translation: 'In the name of Allah.',
  },
} satisfies Record<string, Recitation>;
