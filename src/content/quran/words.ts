/**
 * GENERATED — do not edit by hand. `npm run quran:words`.
 *
 * Word by word: every ayah the app opens as a row of words — Al-Fatihah and
 * the verses the Qur'an duas cite. Each word carries its own Uthmani text,
 * English gloss and transliteration from one token of api.quran.com's word
 * stream, so the three cannot be shown against the wrong word. 117
 * ayahs, 1482 words, read from the `.cache/quran/words/` mirror.
 *
 * ⚠️ The gloss's author is unstated by its publisher — see `providers.ts`,
 * `quranfoundation`. Credit it as "Quran.com" and no more.
 */

/** Where the words came from. A licence obligation. */
export const WORDS_SOURCE = {
  name: 'Quran.com (Quran Foundation)',
  where: 'api.quran.com',
  fetched: "2026-09-10",
} as const;

export type AyahWord = {
  /** The word, Uthmani. */
  ar: string;
  /** Its English gloss. */
  en: string;
  /** Its transliteration. */
  tr: string;
};

/** Keyed "surah:ayah". Absent means the app has no word view for that ayah. */
export const AYAH_WORDS: Readonly<Record<string, readonly AyahWord[]>> =
{
  "1:1": [
    {
      "ar": "بِسْمِ",
      "en": "In (the) name",
      "tr": "bis'mi"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ٱلرَّحْمَـٰنِ",
      "en": "the Most Gracious",
      "tr": "l-raḥmāni"
    },
    {
      "ar": "ٱلرَّحِيمِ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmi"
    }
  ],
  "1:2": [
    {
      "ar": "ٱلْحَمْدُ",
      "en": "All praises and thanks",
      "tr": "al-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "en": "(be) to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "رَبِّ",
      "en": "the Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "en": "of the universe",
      "tr": "l-ʿālamīna"
    }
  ],
  "1:3": [
    {
      "ar": "ٱلرَّحْمَـٰنِ",
      "en": "The Most Gracious",
      "tr": "al-raḥmāni"
    },
    {
      "ar": "ٱلرَّحِيمِ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmi"
    }
  ],
  "1:4": [
    {
      "ar": "مَـٰلِكِ",
      "en": "(The) Master",
      "tr": "māliki"
    },
    {
      "ar": "يَوْمِ",
      "en": "(of the) Day",
      "tr": "yawmi"
    },
    {
      "ar": "ٱلدِّينِ",
      "en": "(of the) Judgment",
      "tr": "l-dīni"
    }
  ],
  "1:5": [
    {
      "ar": "إِيَّاكَ",
      "en": "You Alone",
      "tr": "iyyāka"
    },
    {
      "ar": "نَعْبُدُ",
      "en": "we worship",
      "tr": "naʿbudu"
    },
    {
      "ar": "وَإِيَّاكَ",
      "en": "and You Alone",
      "tr": "wa-iyyāka"
    },
    {
      "ar": "نَسْتَعِينُ",
      "en": "we ask for help",
      "tr": "nastaʿīnu"
    }
  ],
  "1:6": [
    {
      "ar": "ٱهْدِنَا",
      "en": "Guide us",
      "tr": "ih'dinā"
    },
    {
      "ar": "ٱلصِّرَٰطَ",
      "en": "(to) the path",
      "tr": "l-ṣirāṭa"
    },
    {
      "ar": "ٱلْمُسْتَقِيمَ",
      "en": "the straight",
      "tr": "l-mus'taqīma"
    }
  ],
  "1:7": [
    {
      "ar": "صِرَٰطَ",
      "en": "(The) path",
      "tr": "ṣirāṭa"
    },
    {
      "ar": "ٱلَّذِينَ",
      "en": "(of) those",
      "tr": "alladhīna"
    },
    {
      "ar": "أَنْعَمْتَ",
      "en": "You have bestowed (Your) Favors",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَيْهِمْ",
      "en": "on them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "غَيْرِ",
      "en": "not (of)",
      "tr": "ghayri"
    },
    {
      "ar": "ٱلْمَغْضُوبِ",
      "en": "those who earned (Your) wrath",
      "tr": "l-maghḍūbi"
    },
    {
      "ar": "عَلَيْهِمْ",
      "en": "on themselves",
      "tr": "ʿalayhim"
    },
    {
      "ar": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "ٱلضَّآلِّينَ",
      "en": "(of) those who go astray",
      "tr": "l-ḍālīna"
    }
  ],
  "2:32": [
    {
      "ar": "قَالُوا۟",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "لَا",
      "en": "No",
      "tr": "lā"
    },
    {
      "ar": "عِلْمَ",
      "en": "knowledge",
      "tr": "ʿil'ma"
    },
    {
      "ar": "لَنَآ",
      "en": "(is) for us",
      "tr": "lanā"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "عَلَّمْتَنَآ ۖ",
      "en": "You have taught us",
      "tr": "ʿallamtanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "en": "(are) the All-Knowing",
      "tr": "l-ʿalīmu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "2:126": [
    {
      "ar": "وَإِذْ",
      "en": "And when",
      "tr": "wa-idh"
    },
    {
      "ar": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "إِبْرَٰهِـۧمُ",
      "en": "Ibrahim",
      "tr": "ib'rāhīmu"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَلْ",
      "en": "make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "بَلَدًا",
      "en": "a city",
      "tr": "baladan"
    },
    {
      "ar": "ءَامِنًۭا",
      "en": "secure",
      "tr": "āminan"
    },
    {
      "ar": "وَٱرْزُقْ",
      "en": "and provide",
      "tr": "wa-ur'zuq"
    },
    {
      "ar": "أَهْلَهُۥ",
      "en": "its people",
      "tr": "ahlahu"
    },
    {
      "ar": "مِنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلثَّمَرَٰتِ",
      "en": "fruits",
      "tr": "l-thamarāti"
    },
    {
      "ar": "مَنْ",
      "en": "(to) whoever",
      "tr": "man"
    },
    {
      "ar": "ءَامَنَ",
      "en": "believed",
      "tr": "āmana"
    },
    {
      "ar": "مِنْهُم",
      "en": "from them",
      "tr": "min'hum"
    },
    {
      "ar": "بِٱللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَٱلْيَوْمِ",
      "en": "and the Day",
      "tr": "wal-yawmi"
    },
    {
      "ar": "ٱلْـَٔاخِرِ ۖ",
      "en": "the Last",
      "tr": "l-ākhiri"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "كَفَرَ",
      "en": "disbelieved",
      "tr": "kafara"
    },
    {
      "ar": "فَأُمَتِّعُهُۥ",
      "en": "[then] I will grant him enjoyment",
      "tr": "fa-umattiʿuhu"
    },
    {
      "ar": "قَلِيلًۭا",
      "en": "a little",
      "tr": "qalīlan"
    },
    {
      "ar": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "أَضْطَرُّهُۥٓ",
      "en": "I will force him",
      "tr": "aḍṭarruhu"
    },
    {
      "ar": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "عَذَابِ",
      "en": "(the) punishment",
      "tr": "ʿadhābi"
    },
    {
      "ar": "ٱلنَّارِ ۖ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    },
    {
      "ar": "وَبِئْسَ",
      "en": "and evil",
      "tr": "wabi'sa"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "en": "(is) the destination",
      "tr": "l-maṣīru"
    }
  ],
  "2:127": [
    {
      "ar": "وَإِذْ",
      "en": "And when",
      "tr": "wa-idh"
    },
    {
      "ar": "يَرْفَعُ",
      "en": "(was) raising",
      "tr": "yarfaʿu"
    },
    {
      "ar": "إِبْرَٰهِـۧمُ",
      "en": "Ibrahim",
      "tr": "ib'rāhīmu"
    },
    {
      "ar": "ٱلْقَوَاعِدَ",
      "en": "the foundations",
      "tr": "l-qawāʿida"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْبَيْتِ",
      "en": "the House",
      "tr": "l-bayti"
    },
    {
      "ar": "وَإِسْمَـٰعِيلُ",
      "en": "and Ishmael",
      "tr": "wa-is'māʿīlu"
    },
    {
      "ar": "رَبَّنَا",
      "en": "(saying), \"Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "تَقَبَّلْ",
      "en": "Accept",
      "tr": "taqabbal"
    },
    {
      "ar": "مِنَّآ ۖ",
      "en": "from us",
      "tr": "minnā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "[You] (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلسَّمِيعُ",
      "en": "the All-Hearing",
      "tr": "l-samīʿu"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "en": "the All-Knowing",
      "tr": "l-ʿalīmu"
    }
  ],
  "2:128": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَٱجْعَلْنَا",
      "en": "[and] Make us",
      "tr": "wa-ij'ʿalnā"
    },
    {
      "ar": "مُسْلِمَيْنِ",
      "en": "both submissive",
      "tr": "mus'limayni"
    },
    {
      "ar": "لَكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِنَآ",
      "en": "our offspring",
      "tr": "dhurriyyatinā"
    },
    {
      "ar": "أُمَّةًۭ",
      "en": "a community",
      "tr": "ummatan"
    },
    {
      "ar": "مُّسْلِمَةًۭ",
      "en": "submissive",
      "tr": "mus'limatan"
    },
    {
      "ar": "لَّكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "وَأَرِنَا",
      "en": "And show us",
      "tr": "wa-arinā"
    },
    {
      "ar": "مَنَاسِكَنَا",
      "en": "our ways of worship",
      "tr": "manāsikanā"
    },
    {
      "ar": "وَتُبْ",
      "en": "and turn",
      "tr": "watub"
    },
    {
      "ar": "عَلَيْنَآ ۖ",
      "en": "to us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "[You] (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلتَّوَّابُ",
      "en": "the Oft-returning",
      "tr": "l-tawābu"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
    }
  ],
  "2:156": [
    {
      "ar": "ٱلَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "إِذَآ",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "أَصَـٰبَتْهُم",
      "en": "strikes them",
      "tr": "aṣābathum"
    },
    {
      "ar": "مُّصِيبَةٌۭ",
      "en": "a misfortune",
      "tr": "muṣībatun"
    },
    {
      "ar": "قَالُوٓا۟",
      "en": "they say",
      "tr": "qālū"
    },
    {
      "ar": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "لِلَّهِ",
      "en": "belong to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "وَإِنَّآ",
      "en": "and indeed we",
      "tr": "wa-innā"
    },
    {
      "ar": "إِلَيْهِ",
      "en": "towards Him",
      "tr": "ilayhi"
    },
    {
      "ar": "رَٰجِعُونَ",
      "en": "will return",
      "tr": "rājiʿūna"
    }
  ],
  "2:201": [
    {
      "ar": "وَمِنْهُم",
      "en": "And from those",
      "tr": "wamin'hum"
    },
    {
      "ar": "مَّن",
      "en": "who",
      "tr": "man"
    },
    {
      "ar": "يَقُولُ",
      "en": "say",
      "tr": "yaqūlu"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَاتِنَا",
      "en": "Grant us",
      "tr": "ātinā"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "en": "the world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "حَسَنَةًۭ",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَفِى",
      "en": "and in",
      "tr": "wafī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "حَسَنَةًۭ",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَقِنَا",
      "en": "and save us",
      "tr": "waqinā"
    },
    {
      "ar": "عَذَابَ",
      "en": "(from the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "2:250": [
    {
      "ar": "وَلَمَّا",
      "en": "And when",
      "tr": "walammā"
    },
    {
      "ar": "بَرَزُوا۟",
      "en": "they went forth",
      "tr": "barazū"
    },
    {
      "ar": "لِجَالُوتَ",
      "en": "to (face) Jalut",
      "tr": "lijālūta"
    },
    {
      "ar": "وَجُنُودِهِۦ",
      "en": "and his troops",
      "tr": "wajunūdihi"
    },
    {
      "ar": "قَالُوا۟",
      "en": "they said",
      "tr": "qālū"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَفْرِغْ",
      "en": "Pour",
      "tr": "afrigh"
    },
    {
      "ar": "عَلَيْنَا",
      "en": "on us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "صَبْرًۭا",
      "en": "patience",
      "tr": "ṣabran"
    },
    {
      "ar": "وَثَبِّتْ",
      "en": "and make firm",
      "tr": "wathabbit"
    },
    {
      "ar": "أَقْدَامَنَا",
      "en": "our feet",
      "tr": "aqdāmanā"
    },
    {
      "ar": "وَٱنصُرْنَا",
      "en": "and help us",
      "tr": "wa-unṣur'nā"
    },
    {
      "ar": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "en": "(who are) disbelieving",
      "tr": "l-kāfirīna"
    }
  ],
  "2:286": [
    {
      "ar": "لَا",
      "en": "(Does) not",
      "tr": "lā"
    },
    {
      "ar": "يُكَلِّفُ",
      "en": "burden",
      "tr": "yukallifu"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "نَفْسًا",
      "en": "any soul",
      "tr": "nafsan"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "وُسْعَهَا ۚ",
      "en": "its capacity",
      "tr": "wus'ʿahā"
    },
    {
      "ar": "لَهَا",
      "en": "for it",
      "tr": "lahā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "كَسَبَتْ",
      "en": "it earned",
      "tr": "kasabat"
    },
    {
      "ar": "وَعَلَيْهَا",
      "en": "and against it",
      "tr": "waʿalayhā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱكْتَسَبَتْ ۗ",
      "en": "it earned",
      "tr": "ik'tasabat"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تُؤَاخِذْنَآ",
      "en": "take us to task",
      "tr": "tuākhidh'nā"
    },
    {
      "ar": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "نَّسِينَآ",
      "en": "we forget",
      "tr": "nasīnā"
    },
    {
      "ar": "أَوْ",
      "en": "or",
      "tr": "aw"
    },
    {
      "ar": "أَخْطَأْنَا ۚ",
      "en": "we err",
      "tr": "akhṭanā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَحْمِلْ",
      "en": "lay",
      "tr": "taḥmil"
    },
    {
      "ar": "عَلَيْنَآ",
      "en": "upon us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "إِصْرًۭا",
      "en": "a burden",
      "tr": "iṣ'ran"
    },
    {
      "ar": "كَمَا",
      "en": "like that",
      "tr": "kamā"
    },
    {
      "ar": "حَمَلْتَهُۥ",
      "en": "(which) You laid [it]",
      "tr": "ḥamaltahu"
    },
    {
      "ar": "عَلَى",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "مِن",
      "en": "(were) from",
      "tr": "min"
    },
    {
      "ar": "قَبْلِنَا ۚ",
      "en": "before us",
      "tr": "qablinā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَلَا",
      "en": "[And] (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُحَمِّلْنَا",
      "en": "lay on us",
      "tr": "tuḥammil'nā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "طَاقَةَ",
      "en": "(the) strength",
      "tr": "ṭāqata"
    },
    {
      "ar": "لَنَا",
      "en": "we have",
      "tr": "lanā"
    },
    {
      "ar": "بِهِۦ ۖ",
      "en": "[of it] (to bear)",
      "tr": "bihi"
    },
    {
      "ar": "وَٱعْفُ",
      "en": "And pardon",
      "tr": "wa-uʿ'fu"
    },
    {
      "ar": "عَنَّا",
      "en": "[from] us",
      "tr": "ʿannā"
    },
    {
      "ar": "وَٱغْفِرْ",
      "en": "and forgive",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "[for] us",
      "tr": "lanā"
    },
    {
      "ar": "وَٱرْحَمْنَآ ۚ",
      "en": "and have mercy on us",
      "tr": "wa-ir'ḥamnā"
    },
    {
      "ar": "أَنتَ",
      "en": "You (are)",
      "tr": "anta"
    },
    {
      "ar": "مَوْلَىٰنَا",
      "en": "our Protector",
      "tr": "mawlānā"
    },
    {
      "ar": "فَٱنصُرْنَا",
      "en": "so help us",
      "tr": "fa-unṣur'nā"
    },
    {
      "ar": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "en": "[the] disbelievers",
      "tr": "l-kāfirīna"
    }
  ],
  "3:8": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تُزِغْ",
      "en": "deviate",
      "tr": "tuzigh"
    },
    {
      "ar": "قُلُوبَنَا",
      "en": "our hearts",
      "tr": "qulūbanā"
    },
    {
      "ar": "بَعْدَ",
      "en": "after",
      "tr": "baʿda"
    },
    {
      "ar": "إِذْ",
      "en": "[when]",
      "tr": "idh"
    },
    {
      "ar": "هَدَيْتَنَا",
      "en": "You (have) guided us",
      "tr": "hadaytanā"
    },
    {
      "ar": "وَهَبْ",
      "en": "and grant",
      "tr": "wahab"
    },
    {
      "ar": "لَنَا",
      "en": "(for) us",
      "tr": "lanā"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "رَحْمَةً ۚ",
      "en": "mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْوَهَّابُ",
      "en": "(are) the Bestower",
      "tr": "l-wahābu"
    }
  ],
  "3:9": [
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "جَامِعُ",
      "en": "will gather",
      "tr": "jāmiʿu"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "[the] mankind",
      "tr": "l-nāsi"
    },
    {
      "ar": "لِيَوْمٍۢ",
      "en": "on a Day",
      "tr": "liyawmin"
    },
    {
      "ar": "لَّا",
      "en": "(there is) no",
      "tr": "lā"
    },
    {
      "ar": "رَيْبَ",
      "en": "doubt",
      "tr": "rayba"
    },
    {
      "ar": "فِيهِ ۚ",
      "en": "in it",
      "tr": "fīhi"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "لَا",
      "en": "(does) not",
      "tr": "lā"
    },
    {
      "ar": "يُخْلِفُ",
      "en": "break",
      "tr": "yukh'lifu"
    },
    {
      "ar": "ٱلْمِيعَادَ",
      "en": "the Promise",
      "tr": "l-mīʿāda"
    }
  ],
  "3:16": [
    {
      "ar": "ٱلَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّنَآ",
      "en": "Indeed, we",
      "tr": "innanā"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "(have) believed",
      "tr": "āmannā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "ذُنُوبَنَا",
      "en": "our sins",
      "tr": "dhunūbanā"
    },
    {
      "ar": "وَقِنَا",
      "en": "and save us",
      "tr": "waqinā"
    },
    {
      "ar": "عَذَابَ",
      "en": "(from) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "3:26": [
    {
      "ar": "قُلِ",
      "en": "Say",
      "tr": "quli"
    },
    {
      "ar": "ٱللَّهُمَّ",
      "en": "O Allah",
      "tr": "l-lahuma"
    },
    {
      "ar": "مَـٰلِكَ",
      "en": "Owner",
      "tr": "mālika"
    },
    {
      "ar": "ٱلْمُلْكِ",
      "en": "(of) the Dominion",
      "tr": "l-mul'ki"
    },
    {
      "ar": "تُؤْتِى",
      "en": "You give",
      "tr": "tu'tī"
    },
    {
      "ar": "ٱلْمُلْكَ",
      "en": "the dominion",
      "tr": "l-mul'ka"
    },
    {
      "ar": "مَن",
      "en": "(to) whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتَنزِعُ",
      "en": "and You take away",
      "tr": "watanziʿu"
    },
    {
      "ar": "ٱلْمُلْكَ",
      "en": "the dominion",
      "tr": "l-mul'ka"
    },
    {
      "ar": "مِمَّن",
      "en": "from whom",
      "tr": "mimman"
    },
    {
      "ar": "تَشَآءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتُعِزُّ",
      "en": "and You honor",
      "tr": "watuʿizzu"
    },
    {
      "ar": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتُذِلُّ",
      "en": "and You humiliate",
      "tr": "watudhillu"
    },
    {
      "ar": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ ۖ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "بِيَدِكَ",
      "en": "In Your hand",
      "tr": "biyadika"
    },
    {
      "ar": "ٱلْخَيْرُ ۖ",
      "en": "(is all) the good",
      "tr": "l-khayru"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "عَلَىٰ",
      "en": "(are) on",
      "tr": "ʿalā"
    },
    {
      "ar": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدِيرٌۭ",
      "en": "All-Powerful",
      "tr": "qadīrun"
    }
  ],
  "3:27": [
    {
      "ar": "تُولِجُ",
      "en": "You cause to enter",
      "tr": "tūliju"
    },
    {
      "ar": "ٱلَّيْلَ",
      "en": "the night",
      "tr": "al-layla"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلنَّهَارِ",
      "en": "the day",
      "tr": "l-nahāri"
    },
    {
      "ar": "وَتُولِجُ",
      "en": "and You cause to enter",
      "tr": "watūliju"
    },
    {
      "ar": "ٱلنَّهَارَ",
      "en": "the day",
      "tr": "l-nahāra"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلَّيْلِ ۖ",
      "en": "the night",
      "tr": "al-layli"
    },
    {
      "ar": "وَتُخْرِجُ",
      "en": "and You bring forth",
      "tr": "watukh'riju"
    },
    {
      "ar": "ٱلْحَىَّ",
      "en": "the living",
      "tr": "l-ḥaya"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمَيِّتِ",
      "en": "the dead",
      "tr": "l-mayiti"
    },
    {
      "ar": "وَتُخْرِجُ",
      "en": "and You bring forth",
      "tr": "watukh'riju"
    },
    {
      "ar": "ٱلْمَيِّتَ",
      "en": "the dead",
      "tr": "l-mayita"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَىِّ ۖ",
      "en": "the living",
      "tr": "l-ḥayi"
    },
    {
      "ar": "وَتَرْزُقُ",
      "en": "and You give provision",
      "tr": "watarzuqu"
    },
    {
      "ar": "مَن",
      "en": "(to) whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "بِغَيْرِ",
      "en": "without",
      "tr": "bighayri"
    },
    {
      "ar": "حِسَابٍۢ",
      "en": "measure",
      "tr": "ḥisābin"
    }
  ],
  "3:35": [
    {
      "ar": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَتِ",
      "en": "[she] said",
      "tr": "qālati"
    },
    {
      "ar": "ٱمْرَأَتُ",
      "en": "(the) wife",
      "tr": "im'ra-atu"
    },
    {
      "ar": "عِمْرَٰنَ",
      "en": "(of) Imran",
      "tr": "ʿim'rāna"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "نَذَرْتُ",
      "en": "[I] vowed",
      "tr": "nadhartu"
    },
    {
      "ar": "لَكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "بَطْنِى",
      "en": "my womb",
      "tr": "baṭnī"
    },
    {
      "ar": "مُحَرَّرًۭا",
      "en": "dedicated",
      "tr": "muḥarraran"
    },
    {
      "ar": "فَتَقَبَّلْ",
      "en": "so accept",
      "tr": "fataqabbal"
    },
    {
      "ar": "مِنِّىٓ ۖ",
      "en": "from me",
      "tr": "minnī"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلسَّمِيعُ",
      "en": "(are) the All-Hearing",
      "tr": "l-samīʿu"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "en": "the All-Knowing",
      "tr": "l-ʿalīmu"
    }
  ],
  "3:38": [
    {
      "ar": "هُنَالِكَ",
      "en": "There only",
      "tr": "hunālika"
    },
    {
      "ar": "دَعَا",
      "en": "invoked",
      "tr": "daʿā"
    },
    {
      "ar": "زَكَرِيَّا",
      "en": "Zakariya",
      "tr": "zakariyyā"
    },
    {
      "ar": "رَبَّهُۥ ۖ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "en": "grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "ذُرِّيَّةًۭ",
      "en": "offspring",
      "tr": "dhurriyyatan"
    },
    {
      "ar": "طَيِّبَةً ۖ",
      "en": "pure",
      "tr": "ṭayyibatan"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "سَمِيعُ",
      "en": "(are) All-Hearer",
      "tr": "samīʿu"
    },
    {
      "ar": "ٱلدُّعَآءِ",
      "en": "(of) the prayer",
      "tr": "l-duʿāi"
    }
  ],
  "3:52": [
    {
      "ar": "۞ فَلَمَّآ",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَحَسَّ",
      "en": "perceived",
      "tr": "aḥassa"
    },
    {
      "ar": "عِيسَىٰ",
      "en": "Isa",
      "tr": "ʿīsā"
    },
    {
      "ar": "مِنْهُمُ",
      "en": "from them",
      "tr": "min'humu"
    },
    {
      "ar": "ٱلْكُفْرَ",
      "en": "[the] disbelief",
      "tr": "l-kuf'ra"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "مَنْ",
      "en": "Who",
      "tr": "man"
    },
    {
      "ar": "أَنصَارِىٓ",
      "en": "(will be) my helpers",
      "tr": "anṣārī"
    },
    {
      "ar": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱللَّهِ ۖ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "ٱلْحَوَارِيُّونَ",
      "en": "the disciples",
      "tr": "l-ḥawāriyūna"
    },
    {
      "ar": "نَحْنُ",
      "en": "We",
      "tr": "naḥnu"
    },
    {
      "ar": "أَنصَارُ",
      "en": "(will be the) helpers",
      "tr": "anṣāru"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "we believe[d]",
      "tr": "āmannā"
    },
    {
      "ar": "بِٱللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَٱشْهَدْ",
      "en": "and bear witness",
      "tr": "wa-ish'had"
    },
    {
      "ar": "بِأَنَّا",
      "en": "that we",
      "tr": "bi-annā"
    },
    {
      "ar": "مُسْلِمُونَ",
      "en": "(are) Muslims",
      "tr": "mus'limūna"
    }
  ],
  "3:53": [
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "we believe[d]",
      "tr": "āmannā"
    },
    {
      "ar": "بِمَآ",
      "en": "in what",
      "tr": "bimā"
    },
    {
      "ar": "أَنزَلْتَ",
      "en": "You revealed",
      "tr": "anzalta"
    },
    {
      "ar": "وَٱتَّبَعْنَا",
      "en": "and we follow[ed]",
      "tr": "wa-ittabaʿnā"
    },
    {
      "ar": "ٱلرَّسُولَ",
      "en": "the Messenger",
      "tr": "l-rasūla"
    },
    {
      "ar": "فَٱكْتُبْنَا",
      "en": "then write us",
      "tr": "fa-uk'tub'nā"
    },
    {
      "ar": "مَعَ",
      "en": "among",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلشَّـٰهِدِينَ",
      "en": "the witnesses",
      "tr": "l-shāhidīna"
    }
  ],
  "3:191": [
    {
      "ar": "ٱلَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَذْكُرُونَ",
      "en": "remember",
      "tr": "yadhkurūna"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "قِيَـٰمًۭا",
      "en": "standing",
      "tr": "qiyāman"
    },
    {
      "ar": "وَقُعُودًۭا",
      "en": "and sitting",
      "tr": "waquʿūdan"
    },
    {
      "ar": "وَعَلَىٰ",
      "en": "and on",
      "tr": "waʿalā"
    },
    {
      "ar": "جُنُوبِهِمْ",
      "en": "their sides",
      "tr": "junūbihim"
    },
    {
      "ar": "وَيَتَفَكَّرُونَ",
      "en": "and they reflect",
      "tr": "wayatafakkarūna"
    },
    {
      "ar": "فِى",
      "en": "on",
      "tr": "fī"
    },
    {
      "ar": "خَلْقِ",
      "en": "(the) creation",
      "tr": "khalqi"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "خَلَقْتَ",
      "en": "You have created",
      "tr": "khalaqta"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "بَـٰطِلًۭا",
      "en": "(in) vain",
      "tr": "bāṭilan"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "فَقِنَا",
      "en": "so save us",
      "tr": "faqinā"
    },
    {
      "ar": "عَذَابَ",
      "en": "(from the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "3:192": [
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "indeed [You]",
      "tr": "innaka"
    },
    {
      "ar": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تُدْخِلِ",
      "en": "You admit",
      "tr": "tud'khili"
    },
    {
      "ar": "ٱلنَّارَ",
      "en": "(to) the Fire",
      "tr": "l-nāra"
    },
    {
      "ar": "فَقَدْ",
      "en": "then surely",
      "tr": "faqad"
    },
    {
      "ar": "أَخْزَيْتَهُۥ ۖ",
      "en": "You (have) disgraced him",
      "tr": "akhzaytahu"
    },
    {
      "ar": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "لِلظَّـٰلِمِينَ",
      "en": "for the wrongdoers",
      "tr": "lilẓẓālimīna"
    },
    {
      "ar": "مِنْ",
      "en": "(are) any",
      "tr": "min"
    },
    {
      "ar": "أَنصَارٍۢ",
      "en": "helpers",
      "tr": "anṣārin"
    }
  ],
  "3:193": [
    {
      "ar": "رَّبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّنَا",
      "en": "indeed we",
      "tr": "innanā"
    },
    {
      "ar": "سَمِعْنَا",
      "en": "[we] heard",
      "tr": "samiʿ'nā"
    },
    {
      "ar": "مُنَادِيًۭا",
      "en": "a caller",
      "tr": "munādiyan"
    },
    {
      "ar": "يُنَادِى",
      "en": "calling",
      "tr": "yunādī"
    },
    {
      "ar": "لِلْإِيمَـٰنِ",
      "en": "to the faith",
      "tr": "lil'īmāni"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "ءَامِنُوا۟",
      "en": "Believe",
      "tr": "āminū"
    },
    {
      "ar": "بِرَبِّكُمْ",
      "en": "in your Lord",
      "tr": "birabbikum"
    },
    {
      "ar": "فَـَٔامَنَّا ۚ",
      "en": "so we have believed",
      "tr": "faāmannā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "ذُنُوبَنَا",
      "en": "our sins",
      "tr": "dhunūbanā"
    },
    {
      "ar": "وَكَفِّرْ",
      "en": "and remove",
      "tr": "wakaffir"
    },
    {
      "ar": "عَنَّا",
      "en": "from us",
      "tr": "ʿannā"
    },
    {
      "ar": "سَيِّـَٔاتِنَا",
      "en": "our evil deeds",
      "tr": "sayyiātinā"
    },
    {
      "ar": "وَتَوَفَّنَا",
      "en": "and cause us to die",
      "tr": "watawaffanā"
    },
    {
      "ar": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْأَبْرَارِ",
      "en": "the righteous",
      "tr": "l-abrāri"
    }
  ],
  "3:194": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَءَاتِنَا",
      "en": "grant us",
      "tr": "waātinā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "وَعَدتَّنَا",
      "en": "You promised us",
      "tr": "waʿadttanā"
    },
    {
      "ar": "عَلَىٰ",
      "en": "through",
      "tr": "ʿalā"
    },
    {
      "ar": "رُسُلِكَ",
      "en": "Your Messengers",
      "tr": "rusulika"
    },
    {
      "ar": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُخْزِنَا",
      "en": "disgrace us",
      "tr": "tukh'zinā"
    },
    {
      "ar": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلْقِيَـٰمَةِ ۗ",
      "en": "(of) [the] Resurrection",
      "tr": "l-qiyāmati"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "لَا",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "تُخْلِفُ",
      "en": "break",
      "tr": "tukh'lifu"
    },
    {
      "ar": "ٱلْمِيعَادَ",
      "en": "the promise",
      "tr": "l-mīʿāda"
    }
  ],
  "5:25": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "لَآ",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "أَمْلِكُ",
      "en": "(have) power",
      "tr": "amliku"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "نَفْسِى",
      "en": "(over) myself",
      "tr": "nafsī"
    },
    {
      "ar": "وَأَخِى ۖ",
      "en": "and my brother",
      "tr": "wa-akhī"
    },
    {
      "ar": "فَٱفْرُقْ",
      "en": "so (make a) separation",
      "tr": "fa-uf'ruq"
    },
    {
      "ar": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَ",
      "en": "and between",
      "tr": "wabayna"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْفَـٰسِقِينَ",
      "en": "(the) defiantly disobedient",
      "tr": "l-fāsiqīna"
    }
  ],
  "5:83": [
    {
      "ar": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "سَمِعُوا۟",
      "en": "they listen",
      "tr": "samiʿū"
    },
    {
      "ar": "مَآ",
      "en": "(to) what",
      "tr": "mā"
    },
    {
      "ar": "أُنزِلَ",
      "en": "has been revealed",
      "tr": "unzila"
    },
    {
      "ar": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلرَّسُولِ",
      "en": "the Messenger",
      "tr": "l-rasūli"
    },
    {
      "ar": "تَرَىٰٓ",
      "en": "you see",
      "tr": "tarā"
    },
    {
      "ar": "أَعْيُنَهُمْ",
      "en": "their eyes",
      "tr": "aʿyunahum"
    },
    {
      "ar": "تَفِيضُ",
      "en": "overflowing",
      "tr": "tafīḍu"
    },
    {
      "ar": "مِنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلدَّمْعِ",
      "en": "the tears",
      "tr": "l-damʿi"
    },
    {
      "ar": "مِمَّا",
      "en": "for what",
      "tr": "mimmā"
    },
    {
      "ar": "عَرَفُوا۟",
      "en": "they recognized",
      "tr": "ʿarafū"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَقِّ ۖ",
      "en": "the truth",
      "tr": "l-ḥaqi"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "They say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "we have believed",
      "tr": "āmannā"
    },
    {
      "ar": "فَٱكْتُبْنَا",
      "en": "so write us",
      "tr": "fa-uk'tub'nā"
    },
    {
      "ar": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلشَّـٰهِدِينَ",
      "en": "the witnesses",
      "tr": "l-shāhidīna"
    }
  ],
  "5:84": [
    {
      "ar": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "لَنَا",
      "en": "for us (that)",
      "tr": "lanā"
    },
    {
      "ar": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "نُؤْمِنُ",
      "en": "we believe",
      "tr": "nu'minu"
    },
    {
      "ar": "بِٱللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "جَآءَنَا",
      "en": "came (to) us",
      "tr": "jāanā"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَقِّ",
      "en": "the truth",
      "tr": "l-ḥaqi"
    },
    {
      "ar": "وَنَطْمَعُ",
      "en": "And we hope",
      "tr": "wanaṭmaʿu"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يُدْخِلَنَا",
      "en": "will admit us",
      "tr": "yud'khilanā"
    },
    {
      "ar": "رَبُّنَا",
      "en": "our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "5:114": [
    {
      "ar": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "عِيسَى",
      "en": "Isa",
      "tr": "ʿīsā"
    },
    {
      "ar": "ٱبْنُ",
      "en": "son",
      "tr": "ub'nu"
    },
    {
      "ar": "مَرْيَمَ",
      "en": "(of) Maryam",
      "tr": "maryama"
    },
    {
      "ar": "ٱللَّهُمَّ",
      "en": "O Allah",
      "tr": "l-lahuma"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَنزِلْ",
      "en": "send down",
      "tr": "anzil"
    },
    {
      "ar": "عَلَيْنَا",
      "en": "to us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "مَآئِدَةًۭ",
      "en": "a table spread",
      "tr": "māidatan"
    },
    {
      "ar": "مِّنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلسَّمَآءِ",
      "en": "the heaven",
      "tr": "l-samāi"
    },
    {
      "ar": "تَكُونُ",
      "en": "to be",
      "tr": "takūnu"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "عِيدًۭا",
      "en": "a festival",
      "tr": "ʿīdan"
    },
    {
      "ar": "لِّأَوَّلِنَا",
      "en": "for first of us",
      "tr": "li-awwalinā"
    },
    {
      "ar": "وَءَاخِرِنَا",
      "en": "and last of us",
      "tr": "waākhirinā"
    },
    {
      "ar": "وَءَايَةًۭ",
      "en": "and a sign",
      "tr": "waāyatan"
    },
    {
      "ar": "مِّنكَ ۖ",
      "en": "from You",
      "tr": "minka"
    },
    {
      "ar": "وَٱرْزُقْنَا",
      "en": "And provide us",
      "tr": "wa-ur'zuq'nā"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are) best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلرَّٰزِقِينَ",
      "en": "(of) the providers",
      "tr": "l-rāziqīna"
    }
  ],
  "7:23": [
    {
      "ar": "قَالَا",
      "en": "Both of them said",
      "tr": "qālā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ظَلَمْنَآ",
      "en": "we have wronged",
      "tr": "ẓalamnā"
    },
    {
      "ar": "أَنفُسَنَا",
      "en": "ourselves",
      "tr": "anfusanā"
    },
    {
      "ar": "وَإِن",
      "en": "and if",
      "tr": "wa-in"
    },
    {
      "ar": "لَّمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لَنَا",
      "en": "[for] us",
      "tr": "lanā"
    },
    {
      "ar": "وَتَرْحَمْنَا",
      "en": "and have mercy (on) us",
      "tr": "watarḥamnā"
    },
    {
      "ar": "لَنَكُونَنَّ",
      "en": "surely, we will be",
      "tr": "lanakūnanna"
    },
    {
      "ar": "مِنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَـٰسِرِينَ",
      "en": "the losers",
      "tr": "l-khāsirīna"
    }
  ],
  "7:89": [
    {
      "ar": "قَدِ",
      "en": "Verily",
      "tr": "qadi"
    },
    {
      "ar": "ٱفْتَرَيْنَا",
      "en": "we would have fabricated",
      "tr": "if'taraynā"
    },
    {
      "ar": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "كَذِبًا",
      "en": "a lie",
      "tr": "kadhiban"
    },
    {
      "ar": "إِنْ",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "عُدْنَا",
      "en": "we returned",
      "tr": "ʿud'nā"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "مِلَّتِكُم",
      "en": "your religion",
      "tr": "millatikum"
    },
    {
      "ar": "بَعْدَ",
      "en": "after",
      "tr": "baʿda"
    },
    {
      "ar": "إِذْ",
      "en": "[when]",
      "tr": "idh"
    },
    {
      "ar": "نَجَّىٰنَا",
      "en": "saved us",
      "tr": "najjānā"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "مِنْهَا ۚ",
      "en": "from it",
      "tr": "min'hā"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يَكُونُ",
      "en": "it is",
      "tr": "yakūnu"
    },
    {
      "ar": "لَنَآ",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "نَّعُودَ",
      "en": "we return",
      "tr": "naʿūda"
    },
    {
      "ar": "فِيهَآ",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "إِلَّآ",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يَشَآءَ",
      "en": "wills",
      "tr": "yashāa"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "رَبُّنَا ۚ",
      "en": "our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "وَسِعَ",
      "en": "Encompasses",
      "tr": "wasiʿa"
    },
    {
      "ar": "رَبُّنَا",
      "en": "(by) Our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "كُلَّ",
      "en": "every",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "عِلْمًا ۚ",
      "en": "(in) knowledge",
      "tr": "ʿil'man"
    },
    {
      "ar": "عَلَى",
      "en": "Upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوَكَّلْنَا ۚ",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱفْتَحْ",
      "en": "Decide",
      "tr": "if'taḥ"
    },
    {
      "ar": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَ",
      "en": "and between",
      "tr": "wabayna"
    },
    {
      "ar": "قَوْمِنَا",
      "en": "our people",
      "tr": "qawminā"
    },
    {
      "ar": "بِٱلْحَقِّ",
      "en": "in truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are the) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْفَـٰتِحِينَ",
      "en": "(of) those who Decide",
      "tr": "l-fātiḥīna"
    }
  ],
  "7:126": [
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَنقِمُ",
      "en": "you take revenge",
      "tr": "tanqimu"
    },
    {
      "ar": "مِنَّآ",
      "en": "from us",
      "tr": "minnā"
    },
    {
      "ar": "إِلَّآ",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "we believed",
      "tr": "āmannā"
    },
    {
      "ar": "بِـَٔايَـٰتِ",
      "en": "in (the) Signs",
      "tr": "biāyāti"
    },
    {
      "ar": "رَبِّنَا",
      "en": "(of) our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "لَمَّا",
      "en": "when",
      "tr": "lammā"
    },
    {
      "ar": "جَآءَتْنَا ۚ",
      "en": "they came to us",
      "tr": "jāatnā"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَفْرِغْ",
      "en": "Pour",
      "tr": "afrigh"
    },
    {
      "ar": "عَلَيْنَا",
      "en": "upon us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "صَبْرًۭا",
      "en": "patience",
      "tr": "ṣabran"
    },
    {
      "ar": "وَتَوَفَّنَا",
      "en": "and cause us to die",
      "tr": "watawaffanā"
    },
    {
      "ar": "مُسْلِمِينَ",
      "en": "(as) Muslims",
      "tr": "mus'limīna"
    }
  ],
  "7:151": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِأَخِى",
      "en": "and my brother",
      "tr": "wali-akhī"
    },
    {
      "ar": "وَأَدْخِلْنَا",
      "en": "and admit us",
      "tr": "wa-adkhil'nā"
    },
    {
      "ar": "فِى",
      "en": "into",
      "tr": "fī"
    },
    {
      "ar": "رَحْمَتِكَ ۖ",
      "en": "Your Mercy",
      "tr": "raḥmatika"
    },
    {
      "ar": "وَأَنتَ",
      "en": "for You",
      "tr": "wa-anta"
    },
    {
      "ar": "أَرْحَمُ",
      "en": "(are) the Most Merciful",
      "tr": "arḥamu"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "en": "(of) the merciful",
      "tr": "l-rāḥimīna"
    }
  ],
  "7:155": [
    {
      "ar": "وَٱخْتَارَ",
      "en": "And chose",
      "tr": "wa-ikh'tāra"
    },
    {
      "ar": "مُوسَىٰ",
      "en": "Musa",
      "tr": "mūsā"
    },
    {
      "ar": "قَوْمَهُۥ",
      "en": "(from) his people",
      "tr": "qawmahu"
    },
    {
      "ar": "سَبْعِينَ",
      "en": "seventy",
      "tr": "sabʿīna"
    },
    {
      "ar": "رَجُلًۭا",
      "en": "men",
      "tr": "rajulan"
    },
    {
      "ar": "لِّمِيقَـٰتِنَا ۖ",
      "en": "for Our appointment",
      "tr": "limīqātinā"
    },
    {
      "ar": "فَلَمَّآ",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَخَذَتْهُمُ",
      "en": "seized them",
      "tr": "akhadhathumu"
    },
    {
      "ar": "ٱلرَّجْفَةُ",
      "en": "the earthquake",
      "tr": "l-rajfatu"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "لَوْ",
      "en": "If",
      "tr": "law"
    },
    {
      "ar": "شِئْتَ",
      "en": "you (had) willed",
      "tr": "shi'ta"
    },
    {
      "ar": "أَهْلَكْتَهُم",
      "en": "You (could) have destroyed them",
      "tr": "ahlaktahum"
    },
    {
      "ar": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "وَإِيَّـٰىَ ۖ",
      "en": "and me",
      "tr": "wa-iyyāya"
    },
    {
      "ar": "أَتُهْلِكُنَا",
      "en": "Would You destroy us",
      "tr": "atuh'likunā"
    },
    {
      "ar": "بِمَا",
      "en": "for what",
      "tr": "bimā"
    },
    {
      "ar": "فَعَلَ",
      "en": "did",
      "tr": "faʿala"
    },
    {
      "ar": "ٱلسُّفَهَآءُ",
      "en": "the foolish",
      "tr": "l-sufahāu"
    },
    {
      "ar": "مِنَّآ ۖ",
      "en": "among us",
      "tr": "minnā"
    },
    {
      "ar": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "هِىَ",
      "en": "it (was)",
      "tr": "hiya"
    },
    {
      "ar": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "فِتْنَتُكَ",
      "en": "Your trial",
      "tr": "fit'natuka"
    },
    {
      "ar": "تُضِلُّ",
      "en": "You let go astray",
      "tr": "tuḍillu"
    },
    {
      "ar": "بِهَا",
      "en": "by it",
      "tr": "bihā"
    },
    {
      "ar": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتَهْدِى",
      "en": "and You guide",
      "tr": "watahdī"
    },
    {
      "ar": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ ۖ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "وَلِيُّنَا",
      "en": "(are) our Protector",
      "tr": "waliyyunā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "وَٱرْحَمْنَا ۖ",
      "en": "and have mercy upon us",
      "tr": "wa-ir'ḥamnā"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْغَـٰفِرِينَ",
      "en": "(of) Forgivers",
      "tr": "l-ghāfirīna"
    }
  ],
  "7:156": [
    {
      "ar": "۞ وَٱكْتُبْ",
      "en": "And ordain",
      "tr": "wa-uk'tub"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "هَـٰذِهِ",
      "en": "this",
      "tr": "hādhihi"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "en": "[the] world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "حَسَنَةًۭ",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَفِى",
      "en": "and in",
      "tr": "wafī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "هُدْنَآ",
      "en": "we have turned",
      "tr": "hud'nā"
    },
    {
      "ar": "إِلَيْكَ ۚ",
      "en": "to You",
      "tr": "ilayka"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "عَذَابِىٓ",
      "en": "My punishment",
      "tr": "ʿadhābī"
    },
    {
      "ar": "أُصِيبُ",
      "en": "I afflict",
      "tr": "uṣību"
    },
    {
      "ar": "بِهِۦ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "مَنْ",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "أَشَآءُ ۖ",
      "en": "I will",
      "tr": "ashāu"
    },
    {
      "ar": "وَرَحْمَتِى",
      "en": "but My Mercy",
      "tr": "waraḥmatī"
    },
    {
      "ar": "وَسِعَتْ",
      "en": "encompasses",
      "tr": "wasiʿat"
    },
    {
      "ar": "كُلَّ",
      "en": "every",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍۢ ۚ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "فَسَأَكْتُبُهَا",
      "en": "So I will ordain it",
      "tr": "fasa-aktubuhā"
    },
    {
      "ar": "لِلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "يَتَّقُونَ",
      "en": "(are) righteous",
      "tr": "yattaqūna"
    },
    {
      "ar": "وَيُؤْتُونَ",
      "en": "and give",
      "tr": "wayu'tūna"
    },
    {
      "ar": "ٱلزَّكَوٰةَ",
      "en": "zakah",
      "tr": "l-zakata"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "en": "and those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "هُم",
      "en": "[they]",
      "tr": "hum"
    },
    {
      "ar": "بِـَٔايَـٰتِنَا",
      "en": "in Our Verses",
      "tr": "biāyātinā"
    },
    {
      "ar": "يُؤْمِنُونَ",
      "en": "they believe",
      "tr": "yu'minūna"
    }
  ],
  "10:85": [
    {
      "ar": "فَقَالُوا۟",
      "en": "Then they said",
      "tr": "faqālū"
    },
    {
      "ar": "عَلَى",
      "en": "Upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوَكَّلْنَا",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَجْعَلْنَا",
      "en": "make us",
      "tr": "tajʿalnā"
    },
    {
      "ar": "فِتْنَةًۭ",
      "en": "a trial",
      "tr": "fit'natan"
    },
    {
      "ar": "لِّلْقَوْمِ",
      "en": "for the people",
      "tr": "lil'qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "10:86": [
    {
      "ar": "وَنَجِّنَا",
      "en": "And save us",
      "tr": "wanajjinā"
    },
    {
      "ar": "بِرَحْمَتِكَ",
      "en": "by Your Mercy",
      "tr": "biraḥmatika"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "en": "the disbelievers",
      "tr": "l-kāfirīna"
    }
  ],
  "11:41": [
    {
      "ar": "۞ وَقَالَ",
      "en": "And he said",
      "tr": "waqāla"
    },
    {
      "ar": "ٱرْكَبُوا۟",
      "en": "Embark",
      "tr": "ir'kabū"
    },
    {
      "ar": "فِيهَا",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "بِسْمِ",
      "en": "in the name",
      "tr": "bis'mi"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مَجْر۪ىٰهَا",
      "en": "(is) its course",
      "tr": "majrahā"
    },
    {
      "ar": "وَمُرْسَىٰهَآ ۚ",
      "en": "and its anchorage",
      "tr": "wamur'sāhā"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبِّى",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لَغَفُورٌۭ",
      "en": "(is) certainly Oft-Forgiving",
      "tr": "laghafūrun"
    },
    {
      "ar": "رَّحِيمٌۭ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
    }
  ],
  "11:47": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّىٓ",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "أَعُوذُ",
      "en": "seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَسْـَٔلَكَ",
      "en": "I (should) ask You",
      "tr": "asalaka"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَيْسَ",
      "en": "not",
      "tr": "laysa"
    },
    {
      "ar": "لِى",
      "en": "I have",
      "tr": "lī"
    },
    {
      "ar": "بِهِۦ",
      "en": "of it",
      "tr": "bihi"
    },
    {
      "ar": "عِلْمٌۭ ۖ",
      "en": "knowledge",
      "tr": "ʿil'mun"
    },
    {
      "ar": "وَإِلَّا",
      "en": "And unless",
      "tr": "wa-illā"
    },
    {
      "ar": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لِى",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَتَرْحَمْنِىٓ",
      "en": "and You have mercy on me",
      "tr": "watarḥamnī"
    },
    {
      "ar": "أَكُن",
      "en": "I will be",
      "tr": "akun"
    },
    {
      "ar": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَـٰسِرِينَ",
      "en": "the losers",
      "tr": "l-khāsirīna"
    }
  ],
  "12:101": [
    {
      "ar": "۞ رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "قَدْ",
      "en": "indeed",
      "tr": "qad"
    },
    {
      "ar": "ءَاتَيْتَنِى",
      "en": "you have given me",
      "tr": "ātaytanī"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُلْكِ",
      "en": "the sovereignty",
      "tr": "l-mul'ki"
    },
    {
      "ar": "وَعَلَّمْتَنِى",
      "en": "and taught me",
      "tr": "waʿallamtanī"
    },
    {
      "ar": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "تَأْوِيلِ",
      "en": "the interpretation",
      "tr": "tawīli"
    },
    {
      "ar": "ٱلْأَحَادِيثِ ۚ",
      "en": "of the events",
      "tr": "l-aḥādīthi"
    },
    {
      "ar": "فَاطِرَ",
      "en": "Creator",
      "tr": "fāṭira"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "وَلِىِّۦ",
      "en": "(are) my Protector",
      "tr": "waliyyī"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "en": "the world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "وَٱلْـَٔاخِرَةِ ۖ",
      "en": "and the Hereafter",
      "tr": "wal-ākhirati"
    },
    {
      "ar": "تَوَفَّنِى",
      "en": "Cause me to die",
      "tr": "tawaffanī"
    },
    {
      "ar": "مُسْلِمًۭا",
      "en": "(as) a Muslim",
      "tr": "mus'liman"
    },
    {
      "ar": "وَأَلْحِقْنِى",
      "en": "and join me",
      "tr": "wa-alḥiq'nī"
    },
    {
      "ar": "بِٱلصَّـٰلِحِينَ",
      "en": "with the righteous",
      "tr": "bil-ṣāliḥīna"
    }
  ],
  "14:37": [
    {
      "ar": "رَّبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنِّىٓ",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "أَسْكَنتُ",
      "en": "[I] have settled",
      "tr": "askantu"
    },
    {
      "ar": "مِن",
      "en": "(some) of",
      "tr": "min"
    },
    {
      "ar": "ذُرِّيَّتِى",
      "en": "my offsprings",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "بِوَادٍ",
      "en": "in a valley",
      "tr": "biwādin"
    },
    {
      "ar": "غَيْرِ",
      "en": "not",
      "tr": "ghayri"
    },
    {
      "ar": "ذِى",
      "en": "with",
      "tr": "dhī"
    },
    {
      "ar": "زَرْعٍ",
      "en": "cultivation",
      "tr": "zarʿin"
    },
    {
      "ar": "عِندَ",
      "en": "near",
      "tr": "ʿinda"
    },
    {
      "ar": "بَيْتِكَ",
      "en": "Your Sacred House",
      "tr": "baytika"
    },
    {
      "ar": "ٱلْمُحَرَّمِ",
      "en": "Your Sacred House",
      "tr": "l-muḥarami"
    },
    {
      "ar": "رَبَّنَا",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لِيُقِيمُوا۟",
      "en": "That they may establish",
      "tr": "liyuqīmū"
    },
    {
      "ar": "ٱلصَّلَوٰةَ",
      "en": "the prayers",
      "tr": "l-ṣalata"
    },
    {
      "ar": "فَٱجْعَلْ",
      "en": "So make",
      "tr": "fa-ij'ʿal"
    },
    {
      "ar": "أَفْـِٔدَةًۭ",
      "en": "hearts",
      "tr": "afidatan"
    },
    {
      "ar": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "the men",
      "tr": "l-nāsi"
    },
    {
      "ar": "تَهْوِىٓ",
      "en": "incline",
      "tr": "tahwī"
    },
    {
      "ar": "إِلَيْهِمْ",
      "en": "towards them",
      "tr": "ilayhim"
    },
    {
      "ar": "وَٱرْزُقْهُم",
      "en": "and provide them",
      "tr": "wa-ur'zuq'hum"
    },
    {
      "ar": "مِّنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلثَّمَرَٰتِ",
      "en": "the fruits",
      "tr": "l-thamarāti"
    },
    {
      "ar": "لَعَلَّهُمْ",
      "en": "so that they may",
      "tr": "laʿallahum"
    },
    {
      "ar": "يَشْكُرُونَ",
      "en": "be grateful",
      "tr": "yashkurūna"
    }
  ],
  "14:38": [
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "تَعْلَمُ",
      "en": "You know",
      "tr": "taʿlamu"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "نُخْفِى",
      "en": "we conceal",
      "tr": "nukh'fī"
    },
    {
      "ar": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "نُعْلِنُ ۗ",
      "en": "we proclaim",
      "tr": "nuʿ'linu"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يَخْفَىٰ",
      "en": "(is) hidden",
      "tr": "yakhfā"
    },
    {
      "ar": "عَلَى",
      "en": "from",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مِن",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "شَىْءٍۢ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلسَّمَآءِ",
      "en": "the heaven",
      "tr": "l-samāi"
    }
  ],
  "14:40": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَلْنِى",
      "en": "Make me",
      "tr": "ij'ʿalnī"
    },
    {
      "ar": "مُقِيمَ",
      "en": "an establisher",
      "tr": "muqīma"
    },
    {
      "ar": "ٱلصَّلَوٰةِ",
      "en": "(of) the prayer",
      "tr": "l-ṣalati"
    },
    {
      "ar": "وَمِن",
      "en": "and from",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِى ۚ",
      "en": "my offsprings",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَتَقَبَّلْ",
      "en": "and accept",
      "tr": "wataqabbal"
    },
    {
      "ar": "دُعَآءِ",
      "en": "my prayer",
      "tr": "duʿāi"
    }
  ],
  "14:41": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِوَٰلِدَىَّ",
      "en": "and my parents",
      "tr": "waliwālidayya"
    },
    {
      "ar": "وَلِلْمُؤْمِنِينَ",
      "en": "and the believers",
      "tr": "walil'mu'minīna"
    },
    {
      "ar": "يَوْمَ",
      "en": "(on) the Day",
      "tr": "yawma"
    },
    {
      "ar": "يَقُومُ",
      "en": "will (be) established",
      "tr": "yaqūmu"
    },
    {
      "ar": "ٱلْحِسَابُ",
      "en": "the account",
      "tr": "l-ḥisābu"
    }
  ],
  "17:24": [
    {
      "ar": "وَٱخْفِضْ",
      "en": "And lower",
      "tr": "wa-ikh'fiḍ"
    },
    {
      "ar": "لَهُمَا",
      "en": "to them",
      "tr": "lahumā"
    },
    {
      "ar": "جَنَاحَ",
      "en": "(the) wing",
      "tr": "janāḥa"
    },
    {
      "ar": "ٱلذُّلِّ",
      "en": "(of) humility",
      "tr": "l-dhuli"
    },
    {
      "ar": "مِنَ",
      "en": "(out) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلرَّحْمَةِ",
      "en": "[the] mercy",
      "tr": "l-raḥmati"
    },
    {
      "ar": "وَقُل",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱرْحَمْهُمَا",
      "en": "Have mercy on both of them",
      "tr": "ir'ḥamhumā"
    },
    {
      "ar": "كَمَا",
      "en": "as",
      "tr": "kamā"
    },
    {
      "ar": "رَبَّيَانِى",
      "en": "they brought me up",
      "tr": "rabbayānī"
    },
    {
      "ar": "صَغِيرًۭا",
      "en": "(when I was) small",
      "tr": "ṣaghīran"
    }
  ],
  "17:80": [
    {
      "ar": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَدْخِلْنِى",
      "en": "Cause me to enter",
      "tr": "adkhil'nī"
    },
    {
      "ar": "مُدْخَلَ",
      "en": "an entrance",
      "tr": "mud'khala"
    },
    {
      "ar": "صِدْقٍۢ",
      "en": "sound",
      "tr": "ṣid'qin"
    },
    {
      "ar": "وَأَخْرِجْنِى",
      "en": "and cause me to exit",
      "tr": "wa-akhrij'nī"
    },
    {
      "ar": "مُخْرَجَ",
      "en": "an exit",
      "tr": "mukh'raja"
    },
    {
      "ar": "صِدْقٍۢ",
      "en": "sound",
      "tr": "ṣid'qin"
    },
    {
      "ar": "وَٱجْعَل",
      "en": "and make",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "en": "near You",
      "tr": "ladunka"
    },
    {
      "ar": "سُلْطَـٰنًۭا",
      "en": "an authority",
      "tr": "sul'ṭānan"
    },
    {
      "ar": "نَّصِيرًۭا",
      "en": "helping",
      "tr": "naṣīran"
    }
  ],
  "18:10": [
    {
      "ar": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "أَوَى",
      "en": "retreated",
      "tr": "awā"
    },
    {
      "ar": "ٱلْفِتْيَةُ",
      "en": "the youths",
      "tr": "l-fit'yatu"
    },
    {
      "ar": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلْكَهْفِ",
      "en": "the cave",
      "tr": "l-kahfi"
    },
    {
      "ar": "فَقَالُوا۟",
      "en": "and they said",
      "tr": "faqālū"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَاتِنَا",
      "en": "Grant us",
      "tr": "ātinā"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "رَحْمَةًۭ",
      "en": "Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "وَهَيِّئْ",
      "en": "and facilitate",
      "tr": "wahayyi"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "مِنْ",
      "en": "[from]",
      "tr": "min"
    },
    {
      "ar": "أَمْرِنَا",
      "en": "our affair",
      "tr": "amrinā"
    },
    {
      "ar": "رَشَدًۭا",
      "en": "(in the) right way",
      "tr": "rashadan"
    }
  ],
  "19:4": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, [I]",
      "tr": "innī"
    },
    {
      "ar": "وَهَنَ",
      "en": "(have) weakened",
      "tr": "wahana"
    },
    {
      "ar": "ٱلْعَظْمُ",
      "en": "my bones",
      "tr": "l-ʿaẓmu"
    },
    {
      "ar": "مِنِّى",
      "en": "my bones",
      "tr": "minnī"
    },
    {
      "ar": "وَٱشْتَعَلَ",
      "en": "and flared",
      "tr": "wa-ish'taʿala"
    },
    {
      "ar": "ٱلرَّأْسُ",
      "en": "(my) head",
      "tr": "l-rasu"
    },
    {
      "ar": "شَيْبًۭا",
      "en": "(with) white",
      "tr": "shayban"
    },
    {
      "ar": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "أَكُنۢ",
      "en": "I have been",
      "tr": "akun"
    },
    {
      "ar": "بِدُعَآئِكَ",
      "en": "in (my) supplication (to) You",
      "tr": "biduʿāika"
    },
    {
      "ar": "رَبِّ",
      "en": "my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "شَقِيًّۭا",
      "en": "unblessed",
      "tr": "shaqiyyan"
    }
  ],
  "19:5": [
    {
      "ar": "وَإِنِّى",
      "en": "And indeed, I",
      "tr": "wa-innī"
    },
    {
      "ar": "خِفْتُ",
      "en": "[I] fear",
      "tr": "khif'tu"
    },
    {
      "ar": "ٱلْمَوَٰلِىَ",
      "en": "the successors",
      "tr": "l-mawāliya"
    },
    {
      "ar": "مِن",
      "en": "after me",
      "tr": "min"
    },
    {
      "ar": "وَرَآءِى",
      "en": "after me",
      "tr": "warāī"
    },
    {
      "ar": "وَكَانَتِ",
      "en": "and is",
      "tr": "wakānati"
    },
    {
      "ar": "ٱمْرَأَتِى",
      "en": "my wife",
      "tr": "im'ra-atī"
    },
    {
      "ar": "عَاقِرًۭا",
      "en": "barren",
      "tr": "ʿāqiran"
    },
    {
      "ar": "فَهَبْ",
      "en": "So give",
      "tr": "fahab"
    },
    {
      "ar": "لِى",
      "en": "[to] me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "وَلِيًّۭا",
      "en": "an heir",
      "tr": "waliyyan"
    }
  ],
  "20:25": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱشْرَحْ",
      "en": "Expand",
      "tr": "ish'raḥ"
    },
    {
      "ar": "لِى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "صَدْرِى",
      "en": "my breast",
      "tr": "ṣadrī"
    }
  ],
  "20:26": [
    {
      "ar": "وَيَسِّرْ",
      "en": "And ease",
      "tr": "wayassir"
    },
    {
      "ar": "لِىٓ",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "أَمْرِى",
      "en": "my task",
      "tr": "amrī"
    }
  ],
  "20:27": [
    {
      "ar": "وَٱحْلُلْ",
      "en": "And untie",
      "tr": "wa-uḥ'lul"
    },
    {
      "ar": "عُقْدَةًۭ",
      "en": "(the) knot",
      "tr": "ʿuq'datan"
    },
    {
      "ar": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لِّسَانِى",
      "en": "my tongue",
      "tr": "lisānī"
    }
  ],
  "20:28": [
    {
      "ar": "يَفْقَهُوا۟",
      "en": "That they may understand",
      "tr": "yafqahū"
    },
    {
      "ar": "قَوْلِى",
      "en": "my speech",
      "tr": "qawlī"
    }
  ],
  "20:29": [
    {
      "ar": "وَٱجْعَل",
      "en": "And appoint",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "وَزِيرًۭا",
      "en": "a minister",
      "tr": "wazīran"
    },
    {
      "ar": "مِّنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَهْلِى",
      "en": "my family",
      "tr": "ahlī"
    }
  ],
  "20:30": [
    {
      "ar": "هَـٰرُونَ",
      "en": "Harun",
      "tr": "hārūna"
    },
    {
      "ar": "أَخِى",
      "en": "my brother",
      "tr": "akhī"
    }
  ],
  "20:31": [
    {
      "ar": "ٱشْدُدْ",
      "en": "Reinforce",
      "tr": "ush'dud"
    },
    {
      "ar": "بِهِۦٓ",
      "en": "through him",
      "tr": "bihi"
    },
    {
      "ar": "أَزْرِى",
      "en": "my strength",
      "tr": "azrī"
    }
  ],
  "20:32": [
    {
      "ar": "وَأَشْرِكْهُ",
      "en": "And make him share",
      "tr": "wa-ashrik'hu"
    },
    {
      "ar": "فِىٓ",
      "en": "[in]",
      "tr": "fī"
    },
    {
      "ar": "أَمْرِى",
      "en": "my task",
      "tr": "amrī"
    }
  ],
  "20:114": [
    {
      "ar": "فَتَعَـٰلَى",
      "en": "So high (above all)",
      "tr": "fataʿālā"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "(is) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلْمَلِكُ",
      "en": "the King",
      "tr": "l-maliku"
    },
    {
      "ar": "ٱلْحَقُّ ۗ",
      "en": "the True",
      "tr": "l-ḥaqu"
    },
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَعْجَلْ",
      "en": "hasten",
      "tr": "taʿjal"
    },
    {
      "ar": "بِٱلْقُرْءَانِ",
      "en": "with the Quran",
      "tr": "bil-qur'āni"
    },
    {
      "ar": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلِ",
      "en": "before",
      "tr": "qabli"
    },
    {
      "ar": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يُقْضَىٰٓ",
      "en": "is completed",
      "tr": "yuq'ḍā"
    },
    {
      "ar": "إِلَيْكَ",
      "en": "to you",
      "tr": "ilayka"
    },
    {
      "ar": "وَحْيُهُۥ ۖ",
      "en": "its revelation",
      "tr": "waḥyuhu"
    },
    {
      "ar": "وَقُل",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "زِدْنِى",
      "en": "Increase me",
      "tr": "zid'nī"
    },
    {
      "ar": "عِلْمًۭا",
      "en": "(in) knowledge",
      "tr": "ʿil'man"
    }
  ],
  "21:83": [
    {
      "ar": "۞ وَأَيُّوبَ",
      "en": "And Ayub",
      "tr": "wa-ayyūba"
    },
    {
      "ar": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰ",
      "en": "he called",
      "tr": "nādā"
    },
    {
      "ar": "رَبَّهُۥٓ",
      "en": "(to) his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "en": "Indeed, [I]",
      "tr": "annī"
    },
    {
      "ar": "مَسَّنِىَ",
      "en": "has touched me",
      "tr": "massaniya"
    },
    {
      "ar": "ٱلضُّرُّ",
      "en": "the adversity",
      "tr": "l-ḍuru"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "أَرْحَمُ",
      "en": "(are) Most Merciful",
      "tr": "arḥamu"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "en": "(of) the Merciful",
      "tr": "l-rāḥimīna"
    }
  ],
  "21:87": [
    {
      "ar": "وَذَا",
      "en": "And Dhun-Nun",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلنُّونِ",
      "en": "And Dhun-Nun",
      "tr": "l-nūni"
    },
    {
      "ar": "إِذ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "ذَّهَبَ",
      "en": "he went",
      "tr": "dhahaba"
    },
    {
      "ar": "مُغَـٰضِبًۭا",
      "en": "(while) angry",
      "tr": "mughāḍiban"
    },
    {
      "ar": "فَظَنَّ",
      "en": "and thought",
      "tr": "faẓanna"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّن",
      "en": "never",
      "tr": "lan"
    },
    {
      "ar": "نَّقْدِرَ",
      "en": "We would decree",
      "tr": "naqdira"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "upon him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "فَنَادَىٰ",
      "en": "Then he called",
      "tr": "fanādā"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلظُّلُمَـٰتِ",
      "en": "the darkness(es)",
      "tr": "l-ẓulumāti"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّآ",
      "en": "(There is) no",
      "tr": "lā"
    },
    {
      "ar": "إِلَـٰهَ",
      "en": "god",
      "tr": "ilāha"
    },
    {
      "ar": "إِلَّآ",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, [I]",
      "tr": "innī"
    },
    {
      "ar": "كُنتُ",
      "en": "I am",
      "tr": "kuntu"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "21:89": [
    {
      "ar": "وَزَكَرِيَّآ",
      "en": "And Zakariya",
      "tr": "wazakariyyā"
    },
    {
      "ar": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰ",
      "en": "he called",
      "tr": "nādā"
    },
    {
      "ar": "رَبَّهُۥ",
      "en": "(to) his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَذَرْنِى",
      "en": "leave me",
      "tr": "tadharnī"
    },
    {
      "ar": "فَرْدًۭا",
      "en": "alone",
      "tr": "fardan"
    },
    {
      "ar": "وَأَنتَ",
      "en": "while You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are) [the] Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْوَٰرِثِينَ",
      "en": "(of) the inheritors",
      "tr": "l-wārithīna"
    }
  ],
  "21:112": [
    {
      "ar": "قَـٰلَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱحْكُم",
      "en": "judge",
      "tr": "uḥ'kum"
    },
    {
      "ar": "بِٱلْحَقِّ ۗ",
      "en": "in truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَرَبُّنَا",
      "en": "And our Lord",
      "tr": "warabbunā"
    },
    {
      "ar": "ٱلرَّحْمَـٰنُ",
      "en": "(is) the Most Gracious",
      "tr": "l-raḥmānu"
    },
    {
      "ar": "ٱلْمُسْتَعَانُ",
      "en": "the One Whose help is sought",
      "tr": "l-mus'taʿānu"
    },
    {
      "ar": "عَلَىٰ",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَصِفُونَ",
      "en": "you attribute",
      "tr": "taṣifūna"
    }
  ],
  "23:28": [
    {
      "ar": "فَإِذَا",
      "en": "And when",
      "tr": "fa-idhā"
    },
    {
      "ar": "ٱسْتَوَيْتَ",
      "en": "you (have) boarded",
      "tr": "is'tawayta"
    },
    {
      "ar": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "وَمَن",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "مَّعَكَ",
      "en": "(is) with you",
      "tr": "maʿaka"
    },
    {
      "ar": "عَلَى",
      "en": "[on]",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْفُلْكِ",
      "en": "the ship",
      "tr": "l-ful'ki"
    },
    {
      "ar": "فَقُلِ",
      "en": "then say",
      "tr": "faquli"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "en": "Praise",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "en": "(be) to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "Who",
      "tr": "alladhī"
    },
    {
      "ar": "نَجَّىٰنَا",
      "en": "(has) saved us",
      "tr": "najjānā"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "23:29": [
    {
      "ar": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَنزِلْنِى",
      "en": "cause me to land",
      "tr": "anzil'nī"
    },
    {
      "ar": "مُنزَلًۭا",
      "en": "(at) a landing place",
      "tr": "munzalan"
    },
    {
      "ar": "مُّبَارَكًۭا",
      "en": "blessed",
      "tr": "mubārakan"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are) the Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْمُنزِلِينَ",
      "en": "(of) those who cause to land.'",
      "tr": "l-munzilīna"
    }
  ],
  "23:93": [
    {
      "ar": "قُل",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِمَّا",
      "en": "If",
      "tr": "immā"
    },
    {
      "ar": "تُرِيَنِّى",
      "en": "You should show me",
      "tr": "turiyannī"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يُوعَدُونَ",
      "en": "they are promised",
      "tr": "yūʿadūna"
    }
  ],
  "23:94": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "فَلَا",
      "en": "then (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَجْعَلْنِى",
      "en": "place me",
      "tr": "tajʿalnī"
    },
    {
      "ar": "فِى",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "23:97": [
    {
      "ar": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "هَمَزَٰتِ",
      "en": "(the) suggestions",
      "tr": "hamazāti"
    },
    {
      "ar": "ٱلشَّيَـٰطِينِ",
      "en": "(of) the evil ones",
      "tr": "l-shayāṭīni"
    }
  ],
  "23:98": [
    {
      "ar": "وَأَعُوذُ",
      "en": "And I seek refuge",
      "tr": "wa-aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَن",
      "en": "Lest",
      "tr": "an"
    },
    {
      "ar": "يَحْضُرُونِ",
      "en": "they be present with me",
      "tr": "yaḥḍurūni"
    }
  ],
  "23:118": [
    {
      "ar": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "وَٱرْحَمْ",
      "en": "and have mercy",
      "tr": "wa-ir'ḥam"
    },
    {
      "ar": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "en": "(are the) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "en": "(of) those who show mercy",
      "tr": "l-rāḥimīna"
    }
  ],
  "25:65": [
    {
      "ar": "وَٱلَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱصْرِفْ",
      "en": "Avert",
      "tr": "iṣ'rif"
    },
    {
      "ar": "عَنَّا",
      "en": "from us",
      "tr": "ʿannā"
    },
    {
      "ar": "عَذَابَ",
      "en": "the punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "جَهَنَّمَ ۖ",
      "en": "(of) Hell",
      "tr": "jahannama"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "عَذَابَهَا",
      "en": "its punishment",
      "tr": "ʿadhābahā"
    },
    {
      "ar": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "غَرَامًا",
      "en": "inseparable",
      "tr": "gharāman"
    }
  ],
  "25:66": [
    {
      "ar": "إِنَّهَا",
      "en": "Indeed, it",
      "tr": "innahā"
    },
    {
      "ar": "سَآءَتْ",
      "en": "(is) an evil",
      "tr": "sāat"
    },
    {
      "ar": "مُسْتَقَرًّۭا",
      "en": "abode",
      "tr": "mus'taqarran"
    },
    {
      "ar": "وَمُقَامًۭا",
      "en": "and resting place",
      "tr": "wamuqāman"
    }
  ],
  "25:74": [
    {
      "ar": "وَٱلَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "هَبْ",
      "en": "Grant",
      "tr": "hab"
    },
    {
      "ar": "لَنَا",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَزْوَٰجِنَا",
      "en": "our spouses",
      "tr": "azwājinā"
    },
    {
      "ar": "وَذُرِّيَّـٰتِنَا",
      "en": "and our offspring",
      "tr": "wadhurriyyātinā"
    },
    {
      "ar": "قُرَّةَ",
      "en": "comfort",
      "tr": "qurrata"
    },
    {
      "ar": "أَعْيُنٍۢ",
      "en": "(to) our eyes",
      "tr": "aʿyunin"
    },
    {
      "ar": "وَٱجْعَلْنَا",
      "en": "and make us",
      "tr": "wa-ij'ʿalnā"
    },
    {
      "ar": "لِلْمُتَّقِينَ",
      "en": "for the righteous",
      "tr": "lil'muttaqīna"
    },
    {
      "ar": "إِمَامًا",
      "en": "a leader",
      "tr": "imāman"
    }
  ],
  "26:78": [
    {
      "ar": "ٱلَّذِى",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "خَلَقَنِى",
      "en": "created me",
      "tr": "khalaqanī"
    },
    {
      "ar": "فَهُوَ",
      "en": "and He",
      "tr": "fahuwa"
    },
    {
      "ar": "يَهْدِينِ",
      "en": "guides me",
      "tr": "yahdīni"
    }
  ],
  "26:79": [
    {
      "ar": "وَٱلَّذِى",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "هُوَ",
      "en": "[He]",
      "tr": "huwa"
    },
    {
      "ar": "يُطْعِمُنِى",
      "en": "gives me food",
      "tr": "yuṭ'ʿimunī"
    },
    {
      "ar": "وَيَسْقِينِ",
      "en": "and gives me drink",
      "tr": "wayasqīni"
    }
  ],
  "26:80": [
    {
      "ar": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "مَرِضْتُ",
      "en": "I am ill",
      "tr": "mariḍ'tu"
    },
    {
      "ar": "فَهُوَ",
      "en": "then He",
      "tr": "fahuwa"
    },
    {
      "ar": "يَشْفِينِ",
      "en": "cures me",
      "tr": "yashfīni"
    }
  ],
  "26:81": [
    {
      "ar": "وَٱلَّذِى",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "يُمِيتُنِى",
      "en": "will cause me to die",
      "tr": "yumītunī"
    },
    {
      "ar": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "يُحْيِينِ",
      "en": "he will give me life",
      "tr": "yuḥ'yīni"
    }
  ],
  "26:82": [
    {
      "ar": "وَٱلَّذِىٓ",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "أَطْمَعُ",
      "en": "I hope",
      "tr": "aṭmaʿu"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يَغْفِرَ",
      "en": "He will forgive",
      "tr": "yaghfira"
    },
    {
      "ar": "لِى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "خَطِيٓـَٔتِى",
      "en": "my faults",
      "tr": "khaṭīatī"
    },
    {
      "ar": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "26:83": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "en": "Grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "حُكْمًۭا",
      "en": "wisdom",
      "tr": "ḥuk'man"
    },
    {
      "ar": "وَأَلْحِقْنِى",
      "en": "and join me",
      "tr": "wa-alḥiq'nī"
    },
    {
      "ar": "بِٱلصَّـٰلِحِينَ",
      "en": "with the righteous",
      "tr": "bil-ṣāliḥīna"
    }
  ],
  "26:84": [
    {
      "ar": "وَٱجْعَل",
      "en": "And grant",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "لِسَانَ",
      "en": "a mention",
      "tr": "lisāna"
    },
    {
      "ar": "صِدْقٍۢ",
      "en": "(of) honor",
      "tr": "ṣid'qin"
    },
    {
      "ar": "فِى",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرِينَ",
      "en": "the later (generations)",
      "tr": "l-ākhirīna"
    }
  ],
  "26:85": [
    {
      "ar": "وَٱجْعَلْنِى",
      "en": "And make me",
      "tr": "wa-ij'ʿalnī"
    },
    {
      "ar": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "وَرَثَةِ",
      "en": "(the) inheritors",
      "tr": "warathati"
    },
    {
      "ar": "جَنَّةِ",
      "en": "(of) Garden(s)",
      "tr": "jannati"
    },
    {
      "ar": "ٱلنَّعِيمِ",
      "en": "(of) Delight",
      "tr": "l-naʿīmi"
    }
  ],
  "26:87": [
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُخْزِنِى",
      "en": "disgrace me",
      "tr": "tukh'zinī"
    },
    {
      "ar": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "يُبْعَثُونَ",
      "en": "they are resurrected",
      "tr": "yub'ʿathūna"
    }
  ],
  "26:88": [
    {
      "ar": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَنفَعُ",
      "en": "will benefit",
      "tr": "yanfaʿu"
    },
    {
      "ar": "مَالٌۭ",
      "en": "wealth",
      "tr": "mālun"
    },
    {
      "ar": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "بَنُونَ",
      "en": "sons",
      "tr": "banūna"
    }
  ],
  "26:89": [
    {
      "ar": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "مَنْ",
      "en": "(he) who",
      "tr": "man"
    },
    {
      "ar": "أَتَى",
      "en": "comes",
      "tr": "atā"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "(to) Allah",
      "tr": "l-laha"
    },
    {
      "ar": "بِقَلْبٍۢ",
      "en": "with a heart",
      "tr": "biqalbin"
    },
    {
      "ar": "سَلِيمٍۢ",
      "en": "sound",
      "tr": "salīmin"
    }
  ],
  "26:169": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "نَجِّنِى",
      "en": "Save me",
      "tr": "najjinī"
    },
    {
      "ar": "وَأَهْلِى",
      "en": "and my family",
      "tr": "wa-ahlī"
    },
    {
      "ar": "مِمَّا",
      "en": "from what",
      "tr": "mimmā"
    },
    {
      "ar": "يَعْمَلُونَ",
      "en": "they do",
      "tr": "yaʿmalūna"
    }
  ],
  "27:19": [
    {
      "ar": "فَتَبَسَّمَ",
      "en": "So he smiled",
      "tr": "fatabassama"
    },
    {
      "ar": "ضَاحِكًۭا",
      "en": "laughing",
      "tr": "ḍāḥikan"
    },
    {
      "ar": "مِّن",
      "en": "at",
      "tr": "min"
    },
    {
      "ar": "قَوْلِهَا",
      "en": "her speech",
      "tr": "qawlihā"
    },
    {
      "ar": "وَقَالَ",
      "en": "and said",
      "tr": "waqāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَوْزِعْنِىٓ",
      "en": "Grant me (the) power",
      "tr": "awziʿ'nī"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَشْكُرَ",
      "en": "I may thank You",
      "tr": "ashkura"
    },
    {
      "ar": "نِعْمَتَكَ",
      "en": "(for) Your Favor",
      "tr": "niʿ'mataka"
    },
    {
      "ar": "ٱلَّتِىٓ",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "أَنْعَمْتَ",
      "en": "You have bestowed",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "en": "on me",
      "tr": "ʿalayya"
    },
    {
      "ar": "وَعَلَىٰ",
      "en": "and on",
      "tr": "waʿalā"
    },
    {
      "ar": "وَٰلِدَىَّ",
      "en": "my parents",
      "tr": "wālidayya"
    },
    {
      "ar": "وَأَنْ",
      "en": "and that",
      "tr": "wa-an"
    },
    {
      "ar": "أَعْمَلَ",
      "en": "I may do",
      "tr": "aʿmala"
    },
    {
      "ar": "صَـٰلِحًۭا",
      "en": "righteous (deeds)",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "تَرْضَىٰهُ",
      "en": "that will please You",
      "tr": "tarḍāhu"
    },
    {
      "ar": "وَأَدْخِلْنِى",
      "en": "And admit me",
      "tr": "wa-adkhil'nī"
    },
    {
      "ar": "بِرَحْمَتِكَ",
      "en": "by Your Mercy",
      "tr": "biraḥmatika"
    },
    {
      "ar": "فِى",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "عِبَادِكَ",
      "en": "Your slaves",
      "tr": "ʿibādika"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "en": "righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "28:16": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "ظَلَمْتُ",
      "en": "[I] have wronged",
      "tr": "ẓalamtu"
    },
    {
      "ar": "نَفْسِى",
      "en": "my soul",
      "tr": "nafsī"
    },
    {
      "ar": "فَٱغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لِى",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "فَغَفَرَ",
      "en": "Then He forgave",
      "tr": "faghafara"
    },
    {
      "ar": "لَهُۥٓ ۚ",
      "en": "[for] him",
      "tr": "lahu"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed He",
      "tr": "innahu"
    },
    {
      "ar": "هُوَ",
      "en": "He (is)",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْغَفُورُ",
      "en": "the Oft-Forgiving",
      "tr": "l-ghafūru"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
    }
  ],
  "28:21": [
    {
      "ar": "فَخَرَجَ",
      "en": "So he left",
      "tr": "fakharaja"
    },
    {
      "ar": "مِنْهَا",
      "en": "from it",
      "tr": "min'hā"
    },
    {
      "ar": "خَآئِفًۭا",
      "en": "fearing",
      "tr": "khāifan"
    },
    {
      "ar": "يَتَرَقَّبُ ۖ",
      "en": "(and) vigilant",
      "tr": "yataraqqabu"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "نَجِّنِى",
      "en": "Save me",
      "tr": "najjinī"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "28:24": [
    {
      "ar": "فَسَقَىٰ",
      "en": "So he watered",
      "tr": "fasaqā"
    },
    {
      "ar": "لَهُمَا",
      "en": "for them",
      "tr": "lahumā"
    },
    {
      "ar": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "تَوَلَّىٰٓ",
      "en": "he turned back",
      "tr": "tawallā"
    },
    {
      "ar": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلظِّلِّ",
      "en": "the shade",
      "tr": "l-ẓili"
    },
    {
      "ar": "فَقَالَ",
      "en": "and said",
      "tr": "faqāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "en": "Indeed, I am",
      "tr": "innī"
    },
    {
      "ar": "لِمَآ",
      "en": "of whatever",
      "tr": "limā"
    },
    {
      "ar": "أَنزَلْتَ",
      "en": "You send",
      "tr": "anzalta"
    },
    {
      "ar": "إِلَىَّ",
      "en": "to me",
      "tr": "ilayya"
    },
    {
      "ar": "مِنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "خَيْرٍۢ",
      "en": "good",
      "tr": "khayrin"
    },
    {
      "ar": "فَقِيرٌۭ",
      "en": "(in) need",
      "tr": "faqīrun"
    }
  ],
  "29:30": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱنصُرْنِى",
      "en": "Help me",
      "tr": "unṣur'nī"
    },
    {
      "ar": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْمُفْسِدِينَ",
      "en": "the corrupters",
      "tr": "l-muf'sidīna"
    }
  ],
  "37:100": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "en": "grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "40:7": [
    {
      "ar": "ٱلَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَحْمِلُونَ",
      "en": "bear",
      "tr": "yaḥmilūna"
    },
    {
      "ar": "ٱلْعَرْشَ",
      "en": "the Throne",
      "tr": "l-ʿarsha"
    },
    {
      "ar": "وَمَنْ",
      "en": "and who",
      "tr": "waman"
    },
    {
      "ar": "حَوْلَهُۥ",
      "en": "(are) around it",
      "tr": "ḥawlahu"
    },
    {
      "ar": "يُسَبِّحُونَ",
      "en": "glorify",
      "tr": "yusabbiḥūna"
    },
    {
      "ar": "بِحَمْدِ",
      "en": "(the) praises",
      "tr": "biḥamdi"
    },
    {
      "ar": "رَبِّهِمْ",
      "en": "(of) their Lord",
      "tr": "rabbihim"
    },
    {
      "ar": "وَيُؤْمِنُونَ",
      "en": "and believe",
      "tr": "wayu'minūna"
    },
    {
      "ar": "بِهِۦ",
      "en": "in Him",
      "tr": "bihi"
    },
    {
      "ar": "وَيَسْتَغْفِرُونَ",
      "en": "and ask forgiveness",
      "tr": "wayastaghfirūna"
    },
    {
      "ar": "لِلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَسِعْتَ",
      "en": "You encompass",
      "tr": "wasiʿ'ta"
    },
    {
      "ar": "كُلَّ",
      "en": "all",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍۢ",
      "en": "things",
      "tr": "shayin"
    },
    {
      "ar": "رَّحْمَةًۭ",
      "en": "(by Your) Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "وَعِلْمًۭا",
      "en": "and knowledge",
      "tr": "waʿil'man"
    },
    {
      "ar": "فَٱغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لِلَّذِينَ",
      "en": "those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "تَابُوا۟",
      "en": "repent",
      "tr": "tābū"
    },
    {
      "ar": "وَٱتَّبَعُوا۟",
      "en": "and follow",
      "tr": "wa-ittabaʿū"
    },
    {
      "ar": "سَبِيلَكَ",
      "en": "Your Way",
      "tr": "sabīlaka"
    },
    {
      "ar": "وَقِهِمْ",
      "en": "and save them (from)",
      "tr": "waqihim"
    },
    {
      "ar": "عَذَابَ",
      "en": "(the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلْجَحِيمِ",
      "en": "(of) the Hellfire",
      "tr": "l-jaḥīmi"
    }
  ],
  "40:8": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَأَدْخِلْهُمْ",
      "en": "And admit them",
      "tr": "wa-adkhil'hum"
    },
    {
      "ar": "جَنَّـٰتِ",
      "en": "(to) Gardens",
      "tr": "jannāti"
    },
    {
      "ar": "عَدْنٍ",
      "en": "(of) Eden",
      "tr": "ʿadnin"
    },
    {
      "ar": "ٱلَّتِى",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "وَعَدتَّهُمْ",
      "en": "You have promised them",
      "tr": "waʿadttahum"
    },
    {
      "ar": "وَمَن",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "صَلَحَ",
      "en": "(was) righteous",
      "tr": "ṣalaḥa"
    },
    {
      "ar": "مِنْ",
      "en": "among",
      "tr": "min"
    },
    {
      "ar": "ءَابَآئِهِمْ",
      "en": "their fathers",
      "tr": "ābāihim"
    },
    {
      "ar": "وَأَزْوَٰجِهِمْ",
      "en": "and their spouses",
      "tr": "wa-azwājihim"
    },
    {
      "ar": "وَذُرِّيَّـٰتِهِمْ ۚ",
      "en": "and their offspring",
      "tr": "wadhurriyyātihim"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "en": "(are) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "40:9": [
    {
      "ar": "وَقِهِمُ",
      "en": "And protect them",
      "tr": "waqihimu"
    },
    {
      "ar": "ٱلسَّيِّـَٔاتِ ۚ",
      "en": "(from) the evils",
      "tr": "l-sayiāti"
    },
    {
      "ar": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "تَقِ",
      "en": "you protect",
      "tr": "taqi"
    },
    {
      "ar": "ٱلسَّيِّـَٔاتِ",
      "en": "(from) the evils",
      "tr": "l-sayiāti"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "فَقَدْ",
      "en": "then verily",
      "tr": "faqad"
    },
    {
      "ar": "رَحِمْتَهُۥ ۚ",
      "en": "You have bestowed mercy on him",
      "tr": "raḥim'tahu"
    },
    {
      "ar": "وَذَٰلِكَ",
      "en": "And that",
      "tr": "wadhālika"
    },
    {
      "ar": "هُوَ",
      "en": "[it]",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْفَوْزُ",
      "en": "(is) the success",
      "tr": "l-fawzu"
    },
    {
      "ar": "ٱلْعَظِيمُ",
      "en": "the great",
      "tr": "l-ʿaẓīmu"
    }
  ],
  "43:13": [
    {
      "ar": "لِتَسْتَوُۥا۟",
      "en": "That you may sit firmly",
      "tr": "litastawū"
    },
    {
      "ar": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ظُهُورِهِۦ",
      "en": "their backs",
      "tr": "ẓuhūrihi"
    },
    {
      "ar": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تَذْكُرُوا۟",
      "en": "remember",
      "tr": "tadhkurū"
    },
    {
      "ar": "نِعْمَةَ",
      "en": "(the) favor",
      "tr": "niʿ'mata"
    },
    {
      "ar": "رَبِّكُمْ",
      "en": "(of) your Lord",
      "tr": "rabbikum"
    },
    {
      "ar": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "ٱسْتَوَيْتُمْ",
      "en": "you sit firmly",
      "tr": "is'tawaytum"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "on them",
      "tr": "ʿalayhi"
    },
    {
      "ar": "وَتَقُولُوا۟",
      "en": "and say",
      "tr": "wataqūlū"
    },
    {
      "ar": "سُبْحَـٰنَ",
      "en": "Glory be (to)",
      "tr": "sub'ḥāna"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "سَخَّرَ",
      "en": "(has) subjected",
      "tr": "sakhara"
    },
    {
      "ar": "لَنَا",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "كُنَّا",
      "en": "we were",
      "tr": "kunnā"
    },
    {
      "ar": "لَهُۥ",
      "en": "of it",
      "tr": "lahu"
    },
    {
      "ar": "مُقْرِنِينَ",
      "en": "capable",
      "tr": "muq'rinīna"
    }
  ],
  "43:14": [
    {
      "ar": "وَإِنَّآ",
      "en": "And indeed, we",
      "tr": "wa-innā"
    },
    {
      "ar": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّنَا",
      "en": "our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "لَمُنقَلِبُونَ",
      "en": "will surely return",
      "tr": "lamunqalibūna"
    }
  ],
  "46:15": [
    {
      "ar": "وَوَصَّيْنَا",
      "en": "And We have enjoined",
      "tr": "wawaṣṣaynā"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "en": "(on) man",
      "tr": "l-insāna"
    },
    {
      "ar": "بِوَٰلِدَيْهِ",
      "en": "to his parents",
      "tr": "biwālidayhi"
    },
    {
      "ar": "إِحْسَـٰنًا ۖ",
      "en": "kindness",
      "tr": "iḥ'sānan"
    },
    {
      "ar": "حَمَلَتْهُ",
      "en": "Carried him",
      "tr": "ḥamalathu"
    },
    {
      "ar": "أُمُّهُۥ",
      "en": "his mother",
      "tr": "ummuhu"
    },
    {
      "ar": "كُرْهًۭا",
      "en": "(with) hardship",
      "tr": "kur'han"
    },
    {
      "ar": "وَوَضَعَتْهُ",
      "en": "and gave birth to him",
      "tr": "wawaḍaʿathu"
    },
    {
      "ar": "كُرْهًۭا ۖ",
      "en": "(with) hardship",
      "tr": "kur'han"
    },
    {
      "ar": "وَحَمْلُهُۥ",
      "en": "And (the) bearing of him",
      "tr": "waḥamluhu"
    },
    {
      "ar": "وَفِصَـٰلُهُۥ",
      "en": "and (the) weaning of him",
      "tr": "wafiṣāluhu"
    },
    {
      "ar": "ثَلَـٰثُونَ",
      "en": "(is) thirty",
      "tr": "thalāthūna"
    },
    {
      "ar": "شَهْرًا ۚ",
      "en": "month(s)",
      "tr": "shahran"
    },
    {
      "ar": "حَتَّىٰٓ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "بَلَغَ",
      "en": "he reaches",
      "tr": "balagha"
    },
    {
      "ar": "أَشُدَّهُۥ",
      "en": "his maturity",
      "tr": "ashuddahu"
    },
    {
      "ar": "وَبَلَغَ",
      "en": "and reaches",
      "tr": "wabalagha"
    },
    {
      "ar": "أَرْبَعِينَ",
      "en": "forty",
      "tr": "arbaʿīna"
    },
    {
      "ar": "سَنَةًۭ",
      "en": "year(s)",
      "tr": "sanatan"
    },
    {
      "ar": "قَالَ",
      "en": "he says",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَوْزِعْنِىٓ",
      "en": "grant me (the) power",
      "tr": "awziʿ'nī"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَشْكُرَ",
      "en": "I may be grateful",
      "tr": "ashkura"
    },
    {
      "ar": "نِعْمَتَكَ",
      "en": "(for) Your favor",
      "tr": "niʿ'mataka"
    },
    {
      "ar": "ٱلَّتِىٓ",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "أَنْعَمْتَ",
      "en": "You have bestowed",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "en": "upon me",
      "tr": "ʿalayya"
    },
    {
      "ar": "وَعَلَىٰ",
      "en": "and upon",
      "tr": "waʿalā"
    },
    {
      "ar": "وَٰلِدَىَّ",
      "en": "my parents",
      "tr": "wālidayya"
    },
    {
      "ar": "وَأَنْ",
      "en": "and that",
      "tr": "wa-an"
    },
    {
      "ar": "أَعْمَلَ",
      "en": "I do",
      "tr": "aʿmala"
    },
    {
      "ar": "صَـٰلِحًۭا",
      "en": "righteous (deeds)",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "تَرْضَىٰهُ",
      "en": "which please You",
      "tr": "tarḍāhu"
    },
    {
      "ar": "وَأَصْلِحْ",
      "en": "and make righteous",
      "tr": "wa-aṣliḥ"
    },
    {
      "ar": "لِى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "فِى",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ذُرِّيَّتِىٓ ۖ",
      "en": "my offspring",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "إِنِّى",
      "en": "indeed",
      "tr": "innī"
    },
    {
      "ar": "تُبْتُ",
      "en": "I turn",
      "tr": "tub'tu"
    },
    {
      "ar": "إِلَيْكَ",
      "en": "to You",
      "tr": "ilayka"
    },
    {
      "ar": "وَإِنِّى",
      "en": "and indeed, I am",
      "tr": "wa-innī"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُسْلِمِينَ",
      "en": "those who submit",
      "tr": "l-mus'limīna"
    }
  ],
  "54:10": [
    {
      "ar": "فَدَعَا",
      "en": "So he called",
      "tr": "fadaʿā"
    },
    {
      "ar": "رَبَّهُۥٓ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "en": "I am",
      "tr": "annī"
    },
    {
      "ar": "مَغْلُوبٌۭ",
      "en": "one overpowered",
      "tr": "maghlūbun"
    },
    {
      "ar": "فَٱنتَصِرْ",
      "en": "so help",
      "tr": "fa-intaṣir"
    }
  ],
  "59:10": [
    {
      "ar": "وَٱلَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "جَآءُو",
      "en": "came",
      "tr": "jāū"
    },
    {
      "ar": "مِنۢ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَعْدِهِمْ",
      "en": "after them",
      "tr": "baʿdihim"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "they say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱغْفِرْ",
      "en": "forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "وَلِإِخْوَٰنِنَا",
      "en": "and our brothers",
      "tr": "wali-ikh'wāninā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "en": "who",
      "tr": "alladhīna"
    },
    {
      "ar": "سَبَقُونَا",
      "en": "preceded us",
      "tr": "sabaqūnā"
    },
    {
      "ar": "بِٱلْإِيمَـٰنِ",
      "en": "in faith",
      "tr": "bil-īmāni"
    },
    {
      "ar": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَجْعَلْ",
      "en": "put",
      "tr": "tajʿal"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "قُلُوبِنَا",
      "en": "our hearts",
      "tr": "qulūbinā"
    },
    {
      "ar": "غِلًّۭا",
      "en": "any rancor",
      "tr": "ghillan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "en": "towards those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "indeed You",
      "tr": "innaka"
    },
    {
      "ar": "رَءُوفٌۭ",
      "en": "(are) Full of Kindness",
      "tr": "raūfun"
    },
    {
      "ar": "رَّحِيمٌ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
    }
  ],
  "60:4": [
    {
      "ar": "قَدْ",
      "en": "Indeed",
      "tr": "qad"
    },
    {
      "ar": "كَانَتْ",
      "en": "(there) is",
      "tr": "kānat"
    },
    {
      "ar": "لَكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "أُسْوَةٌ",
      "en": "an example",
      "tr": "us'watun"
    },
    {
      "ar": "حَسَنَةٌۭ",
      "en": "good",
      "tr": "ḥasanatun"
    },
    {
      "ar": "فِىٓ",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "إِبْرَٰهِيمَ",
      "en": "Ibrahim",
      "tr": "ib'rāhīma"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "en": "and those",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "مَعَهُۥٓ",
      "en": "with him",
      "tr": "maʿahu"
    },
    {
      "ar": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "قَالُوا۟",
      "en": "they said",
      "tr": "qālū"
    },
    {
      "ar": "لِقَوْمِهِمْ",
      "en": "to their people",
      "tr": "liqawmihim"
    },
    {
      "ar": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "بُرَءَٰٓؤُا۟",
      "en": "(are) disassociated",
      "tr": "buraāu"
    },
    {
      "ar": "مِنكُمْ",
      "en": "from you",
      "tr": "minkum"
    },
    {
      "ar": "وَمِمَّا",
      "en": "and from what",
      "tr": "wamimmā"
    },
    {
      "ar": "تَعْبُدُونَ",
      "en": "you worship",
      "tr": "taʿbudūna"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "دُونِ",
      "en": "besides",
      "tr": "dūni"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "كَفَرْنَا",
      "en": "We have denied",
      "tr": "kafarnā"
    },
    {
      "ar": "بِكُمْ",
      "en": "you",
      "tr": "bikum"
    },
    {
      "ar": "وَبَدَا",
      "en": "and has appeared",
      "tr": "wabadā"
    },
    {
      "ar": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَكُمُ",
      "en": "and between you",
      "tr": "wabaynakumu"
    },
    {
      "ar": "ٱلْعَدَٰوَةُ",
      "en": "enmity",
      "tr": "l-ʿadāwatu"
    },
    {
      "ar": "وَٱلْبَغْضَآءُ",
      "en": "and hatred",
      "tr": "wal-baghḍāu"
    },
    {
      "ar": "أَبَدًا",
      "en": "forever",
      "tr": "abadan"
    },
    {
      "ar": "حَتَّىٰ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "تُؤْمِنُوا۟",
      "en": "you believe",
      "tr": "tu'minū"
    },
    {
      "ar": "بِٱللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَحْدَهُۥٓ",
      "en": "Alone",
      "tr": "waḥdahu"
    },
    {
      "ar": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "قَوْلَ",
      "en": "(the) saying",
      "tr": "qawla"
    },
    {
      "ar": "إِبْرَٰهِيمَ",
      "en": "(of) Ibrahim",
      "tr": "ib'rāhīma"
    },
    {
      "ar": "لِأَبِيهِ",
      "en": "to his father",
      "tr": "li-abīhi"
    },
    {
      "ar": "لَأَسْتَغْفِرَنَّ",
      "en": "Surely I ask forgiveness",
      "tr": "la-astaghfiranna"
    },
    {
      "ar": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "وَمَآ",
      "en": "but not",
      "tr": "wamā"
    },
    {
      "ar": "أَمْلِكُ",
      "en": "I have power",
      "tr": "amliku"
    },
    {
      "ar": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "شَىْءٍۢ ۖ",
      "en": "anything",
      "tr": "shayin"
    },
    {
      "ar": "رَّبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "عَلَيْكَ",
      "en": "upon You",
      "tr": "ʿalayka"
    },
    {
      "ar": "تَوَكَّلْنَا",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "أَنَبْنَا",
      "en": "we turn",
      "tr": "anabnā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "en": "(is) the final return",
      "tr": "l-maṣīru"
    }
  ],
  "60:5": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "تَجْعَلْنَا",
      "en": "make us",
      "tr": "tajʿalnā"
    },
    {
      "ar": "فِتْنَةًۭ",
      "en": "a trial",
      "tr": "fit'natan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "وَٱغْفِرْ",
      "en": "and forgive",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "رَبَّنَآ ۖ",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "[You]",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "en": "(are) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "66:8": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "en": "O",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "en": "(you) who believe",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "تُوبُوٓا۟",
      "en": "Turn",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوْبَةًۭ",
      "en": "(in) repentance",
      "tr": "tawbatan"
    },
    {
      "ar": "نَّصُوحًا",
      "en": "sincere",
      "tr": "naṣūḥan"
    },
    {
      "ar": "عَسَىٰ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "رَبُّكُمْ",
      "en": "your Lord",
      "tr": "rabbukum"
    },
    {
      "ar": "أَن",
      "en": "will",
      "tr": "an"
    },
    {
      "ar": "يُكَفِّرَ",
      "en": "remove",
      "tr": "yukaffira"
    },
    {
      "ar": "عَنكُمْ",
      "en": "from you",
      "tr": "ʿankum"
    },
    {
      "ar": "سَيِّـَٔاتِكُمْ",
      "en": "your evil deeds",
      "tr": "sayyiātikum"
    },
    {
      "ar": "وَيُدْخِلَكُمْ",
      "en": "and admit you",
      "tr": "wayud'khilakum"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "en": "(into) Gardens",
      "tr": "jannātin"
    },
    {
      "ar": "تَجْرِى",
      "en": "flow",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهَا",
      "en": "underneath it",
      "tr": "taḥtihā"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يُخْزِى",
      "en": "will be disgraced",
      "tr": "yukh'zī"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "(by) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلنَّبِىَّ",
      "en": "the Prophet",
      "tr": "l-nabiya"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "en": "and those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "مَعَهُۥ ۖ",
      "en": "with him",
      "tr": "maʿahu"
    },
    {
      "ar": "نُورُهُمْ",
      "en": "Their light",
      "tr": "nūruhum"
    },
    {
      "ar": "يَسْعَىٰ",
      "en": "will run",
      "tr": "yasʿā"
    },
    {
      "ar": "بَيْنَ",
      "en": "before",
      "tr": "bayna"
    },
    {
      "ar": "أَيْدِيهِمْ",
      "en": "their hands",
      "tr": "aydīhim"
    },
    {
      "ar": "وَبِأَيْمَـٰنِهِمْ",
      "en": "and on their right",
      "tr": "wabi-aymānihim"
    },
    {
      "ar": "يَقُولُونَ",
      "en": "they will say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَتْمِمْ",
      "en": "Perfect",
      "tr": "atmim"
    },
    {
      "ar": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "نُورَنَا",
      "en": "our light",
      "tr": "nūranā"
    },
    {
      "ar": "وَٱغْفِرْ",
      "en": "and grant forgiveness",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَآ ۖ",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "عَلَىٰ",
      "en": "(are) over",
      "tr": "ʿalā"
    },
    {
      "ar": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدِيرٌۭ",
      "en": "All-Powerful",
      "tr": "qadīrun"
    }
  ],
  "66:11": [
    {
      "ar": "وَضَرَبَ",
      "en": "And presents",
      "tr": "waḍaraba"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "مَثَلًۭا",
      "en": "an example",
      "tr": "mathalan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "ٱمْرَأَتَ",
      "en": "(the) wife",
      "tr": "im'ra-ata"
    },
    {
      "ar": "فِرْعَوْنَ",
      "en": "(of) Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "قَالَتْ",
      "en": "she said",
      "tr": "qālat"
    },
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱبْنِ",
      "en": "Build",
      "tr": "ib'ni"
    },
    {
      "ar": "لِى",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "عِندَكَ",
      "en": "near You",
      "tr": "ʿindaka"
    },
    {
      "ar": "بَيْتًۭا",
      "en": "a house",
      "tr": "baytan"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْجَنَّةِ",
      "en": "Paradise",
      "tr": "l-janati"
    },
    {
      "ar": "وَنَجِّنِى",
      "en": "and save me",
      "tr": "wanajjinī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "فِرْعَوْنَ",
      "en": "Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "وَعَمَلِهِۦ",
      "en": "and his deeds",
      "tr": "waʿamalihi"
    },
    {
      "ar": "وَنَجِّنِى",
      "en": "and save me",
      "tr": "wanajjinī"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "71:28": [
    {
      "ar": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِوَٰلِدَىَّ",
      "en": "and my parents",
      "tr": "waliwālidayya"
    },
    {
      "ar": "وَلِمَن",
      "en": "and whoever",
      "tr": "waliman"
    },
    {
      "ar": "دَخَلَ",
      "en": "enters",
      "tr": "dakhala"
    },
    {
      "ar": "بَيْتِىَ",
      "en": "my house",
      "tr": "baytiya"
    },
    {
      "ar": "مُؤْمِنًۭا",
      "en": "a believer",
      "tr": "mu'minan"
    },
    {
      "ar": "وَلِلْمُؤْمِنِينَ",
      "en": "and the believing men",
      "tr": "walil'mu'minīna"
    },
    {
      "ar": "وَٱلْمُؤْمِنَـٰتِ",
      "en": "and the believing women",
      "tr": "wal-mu'mināti"
    },
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَزِدِ",
      "en": "increase",
      "tr": "tazidi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "تَبَارًۢا",
      "en": "(in) destruction",
      "tr": "tabāran"
    }
  ],
  "113:1": [
    {
      "ar": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلْفَلَقِ",
      "en": "(of) the dawn",
      "tr": "l-falaqi"
    }
  ],
  "113:2": [
    {
      "ar": "مِن",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "مَا",
      "en": "(of) what",
      "tr": "mā"
    },
    {
      "ar": "خَلَقَ",
      "en": "He created",
      "tr": "khalaqa"
    }
  ],
  "113:3": [
    {
      "ar": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "غَاسِقٍ",
      "en": "(of) darkness",
      "tr": "ghāsiqin"
    },
    {
      "ar": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "وَقَبَ",
      "en": "it spreads",
      "tr": "waqaba"
    }
  ],
  "113:4": [
    {
      "ar": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "ٱلنَّفَّـٰثَـٰتِ",
      "en": "(of) the blowers",
      "tr": "l-nafāthāti"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْعُقَدِ",
      "en": "the knots",
      "tr": "l-ʿuqadi"
    }
  ],
  "113:5": [
    {
      "ar": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "حَاسِدٍ",
      "en": "(of) an envier",
      "tr": "ḥāsidin"
    },
    {
      "ar": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "حَسَدَ",
      "en": "he envies",
      "tr": "ḥasada"
    }
  ],
  "114:1": [
    {
      "ar": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:2": [
    {
      "ar": "مَلِكِ",
      "en": "(The) King",
      "tr": "maliki"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:3": [
    {
      "ar": "إِلَـٰهِ",
      "en": "(The) God",
      "tr": "ilāhi"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:4": [
    {
      "ar": "مِن",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "ٱلْوَسْوَاسِ",
      "en": "(of) the whisperer",
      "tr": "l-waswāsi"
    },
    {
      "ar": "ٱلْخَنَّاسِ",
      "en": "the one who withdraws",
      "tr": "l-khanāsi"
    }
  ],
  "114:5": [
    {
      "ar": "ٱلَّذِى",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "يُوَسْوِسُ",
      "en": "whispers",
      "tr": "yuwaswisu"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "صُدُورِ",
      "en": "(the) breasts",
      "tr": "ṣudūri"
    },
    {
      "ar": "ٱلنَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:6": [
    {
      "ar": "مِنَ",
      "en": "From",
      "tr": "mina"
    },
    {
      "ar": "ٱلْجِنَّةِ",
      "en": "the jinn",
      "tr": "l-jinati"
    },
    {
      "ar": "وَٱلنَّاسِ",
      "en": "and men",
      "tr": "wal-nāsi"
    }
  ]
};

/** The words of one ayah, or undefined where none were generated. */
export const ayahWords = (surah: number, ayah: number): readonly AyahWord[] | undefined =>
  AYAH_WORDS[`${surah}:${ayah}`];
