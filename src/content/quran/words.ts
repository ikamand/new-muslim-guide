/**
 * GENERATED — do not edit by hand. `npm run quran:words`.
 *
 * Word by word: every ayah the app opens as a row of words — Al-Fatihah and
 * the verses the Qur'an duas cite. Each word carries its own Uthmani text,
 * English gloss and transliteration from one token of api.quran.com's word
 * stream, so the three cannot be shown against the wrong word. 764
 * ayahs, 4825 words, read from the `.cache/quran/words/` mirror.
 *
 * The gloss and the transliteration are the Quranic Arabic Corpus's (Kais
 * Dukes, corpus.quran.com). The API lists no author for either, but both match
 * the corpus word for word on every ayah sampled across the mushaf on 11 Sep
 * 2026 — 70 ayahs for the gloss, 38 for the transliteration. `providers.ts`,
 * `quranfoundation`, records the sample.
 */

/** Where the words came from. A licence obligation. */
export const WORDS_SOURCE = {
  name: 'Quranic Arabic Corpus (Kais Dukes), served by Quran.com',
  where: 'corpus.quran.com, via api.quran.com',
  fetched: "2026-09-12",
} as const;

export type AyahWord = {
  /** The word, Uthmani — the script the dua cards set. */
  ar: string;
  /** The same word, Imlaei — the script the surah screen sets. */
  im: string;
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
      "im": "بِسْمِ",
      "en": "In (the) name",
      "tr": "bis'mi"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ٱلرَّحْمَـٰنِ",
      "im": "الرَّحْمَٰنِ",
      "en": "the Most Gracious",
      "tr": "l-raḥmāni"
    },
    {
      "ar": "ٱلرَّحِيمِ",
      "im": "الرَّحِيمِ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmi"
    }
  ],
  "1:2": [
    {
      "ar": "ٱلْحَمْدُ",
      "im": "الْحَمْدُ",
      "en": "All praises and thanks",
      "tr": "al-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "(be) to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "the Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "of the universe",
      "tr": "l-ʿālamīna"
    }
  ],
  "1:3": [
    {
      "ar": "ٱلرَّحْمَـٰنِ",
      "im": "الرَّحْمَٰنِ",
      "en": "The Most Gracious",
      "tr": "al-raḥmāni"
    },
    {
      "ar": "ٱلرَّحِيمِ",
      "im": "الرَّحِيمِ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmi"
    }
  ],
  "1:4": [
    {
      "ar": "مَـٰلِكِ",
      "im": "مَالِكِ",
      "en": "(The) Master",
      "tr": "māliki"
    },
    {
      "ar": "يَوْمِ",
      "im": "يَوْمِ",
      "en": "(of the) Day",
      "tr": "yawmi"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of the) Judgment",
      "tr": "l-dīni"
    }
  ],
  "1:5": [
    {
      "ar": "إِيَّاكَ",
      "im": "إِيَّاكَ",
      "en": "You Alone",
      "tr": "iyyāka"
    },
    {
      "ar": "نَعْبُدُ",
      "im": "نَعْبُدُ",
      "en": "we worship",
      "tr": "naʿbudu"
    },
    {
      "ar": "وَإِيَّاكَ",
      "im": "وَإِيَّاكَ",
      "en": "and You Alone",
      "tr": "wa-iyyāka"
    },
    {
      "ar": "نَسْتَعِينُ",
      "im": "نَسْتَعِينُ",
      "en": "we ask for help",
      "tr": "nastaʿīnu"
    }
  ],
  "1:6": [
    {
      "ar": "ٱهْدِنَا",
      "im": "اهْدِنَا",
      "en": "Guide us",
      "tr": "ih'dinā"
    },
    {
      "ar": "ٱلصِّرَٰطَ",
      "im": "الصِّرَاطَ",
      "en": "(to) the path",
      "tr": "l-ṣirāṭa"
    },
    {
      "ar": "ٱلْمُسْتَقِيمَ",
      "im": "الْمُسْتَقِيمَ",
      "en": "the straight",
      "tr": "l-mus'taqīma"
    }
  ],
  "1:7": [
    {
      "ar": "صِرَٰطَ",
      "im": "صِرَاطَ",
      "en": "(The) path",
      "tr": "ṣirāṭa"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "(of) those",
      "tr": "alladhīna"
    },
    {
      "ar": "أَنْعَمْتَ",
      "im": "أَنْعَمْتَ",
      "en": "You have bestowed (Your) Favors",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "on them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "غَيْرِ",
      "im": "غَيْرِ",
      "en": "not (of)",
      "tr": "ghayri"
    },
    {
      "ar": "ٱلْمَغْضُوبِ",
      "im": "الْمَغْضُوبِ",
      "en": "those who earned (Your) wrath",
      "tr": "l-maghḍūbi"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "on themselves",
      "tr": "ʿalayhim"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "ٱلضَّآلِّينَ",
      "im": "الضَّالِّينَ",
      "en": "(of) those who go astray",
      "tr": "l-ḍālīna"
    }
  ],
  "2:32": [
    {
      "ar": "قَالُوا۟",
      "im": "قَالُوا",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "im": "سُبْحَانَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "No",
      "tr": "lā"
    },
    {
      "ar": "عِلْمَ",
      "im": "عِلْمَ",
      "en": "knowledge",
      "tr": "ʿil'ma"
    },
    {
      "ar": "لَنَآ",
      "im": "لَنَا",
      "en": "(is) for us",
      "tr": "lanā"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "عَلَّمْتَنَآ ۖ",
      "im": "عَلَّمْتَنَا ۖ",
      "en": "You have taught us",
      "tr": "ʿallamtanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "im": "الْعَلِيمُ",
      "en": "(are) the All-Knowing",
      "tr": "l-ʿalīmu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "2:102": [
    {
      "ar": "وَٱتَّبَعُوا۟",
      "im": "وَاتَّبَعُوا",
      "en": "And they followed",
      "tr": "wa-ittabaʿū"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَتْلُوا۟",
      "im": "تَتْلُو",
      "en": "recite(d)",
      "tr": "tatlū"
    },
    {
      "ar": "ٱلشَّيَـٰطِينُ",
      "im": "الشَّيَاطِينُ",
      "en": "the devils",
      "tr": "l-shayāṭīnu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "مُلْكِ",
      "im": "مُلْكِ",
      "en": "(the) kingdom",
      "tr": "mul'ki"
    },
    {
      "ar": "سُلَيْمَـٰنَ ۖ",
      "im": "سُلَيْمَانَ ۖ",
      "en": "(of) Sulaiman",
      "tr": "sulaymāna"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "كَفَرَ",
      "im": "كَفَرَ",
      "en": "disbelieved",
      "tr": "kafara"
    },
    {
      "ar": "سُلَيْمَـٰنُ",
      "im": "سُلَيْمَانُ",
      "en": "Sulaiman",
      "tr": "sulaymānu"
    },
    {
      "ar": "وَلَـٰكِنَّ",
      "im": "وَلَٰكِنَّ",
      "en": "[and] but",
      "tr": "walākinna"
    },
    {
      "ar": "ٱلشَّيَـٰطِينَ",
      "im": "الشَّيَاطِينَ",
      "en": "the devils",
      "tr": "l-shayāṭīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieved",
      "tr": "kafarū"
    },
    {
      "ar": "يُعَلِّمُونَ",
      "im": "يُعَلِّمُونَ",
      "en": "they teach",
      "tr": "yuʿallimūna"
    },
    {
      "ar": "ٱلنَّاسَ",
      "im": "النَّاسَ",
      "en": "the people",
      "tr": "l-nāsa"
    },
    {
      "ar": "ٱلسِّحْرَ",
      "im": "السِّحْرَ",
      "en": "[the] magic",
      "tr": "l-siḥ'ra"
    },
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "أُنزِلَ",
      "im": "أُنزِلَ",
      "en": "was sent down",
      "tr": "unzila"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْمَلَكَيْنِ",
      "im": "الْمَلَكَيْنِ",
      "en": "the two angels",
      "tr": "l-malakayni"
    },
    {
      "ar": "بِبَابِلَ",
      "im": "بِبَابِلَ",
      "en": "in Babylon",
      "tr": "bibābila"
    },
    {
      "ar": "هَـٰرُوتَ",
      "im": "هَارُوتَ",
      "en": "Harut",
      "tr": "hārūta"
    },
    {
      "ar": "وَمَـٰرُوتَ ۚ",
      "im": "وَمَارُوتَ ۚ",
      "en": "and Marut",
      "tr": "wamārūta"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يُعَلِّمَانِ",
      "im": "يُعَلِّمَانِ",
      "en": "they both teach",
      "tr": "yuʿallimāni"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَحَدٍ",
      "im": "أَحَدٍ",
      "en": "one",
      "tr": "aḥadin"
    },
    {
      "ar": "حَتَّىٰ",
      "im": "حَتَّىٰ",
      "en": "unless",
      "tr": "ḥattā"
    },
    {
      "ar": "يَقُولَآ",
      "im": "يَقُولَا",
      "en": "they [both] say",
      "tr": "yaqūlā"
    },
    {
      "ar": "إِنَّمَا",
      "im": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "نَحْنُ",
      "im": "نَحْنُ",
      "en": "we",
      "tr": "naḥnu"
    },
    {
      "ar": "فِتْنَةٌۭ",
      "im": "فِتْنَةٌ",
      "en": "(are) a trial",
      "tr": "fit'natun"
    },
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "so (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَكْفُرْ ۖ",
      "im": "تَكْفُرْ ۖ",
      "en": "disbelieve",
      "tr": "takfur"
    },
    {
      "ar": "فَيَتَعَلَّمُونَ",
      "im": "فَيَتَعَلَّمُونَ",
      "en": "But they learn",
      "tr": "fayataʿallamūna"
    },
    {
      "ar": "مِنْهُمَا",
      "im": "مِنْهُمَا",
      "en": "from those two",
      "tr": "min'humā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يُفَرِّقُونَ",
      "im": "يُفَرِّقُونَ",
      "en": "[they] causes separation",
      "tr": "yufarriqūna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "بَيْنَ",
      "im": "بَيْنَ",
      "en": "between",
      "tr": "bayna"
    },
    {
      "ar": "ٱلْمَرْءِ",
      "im": "الْمَرْءِ",
      "en": "the man",
      "tr": "l-mari"
    },
    {
      "ar": "وَزَوْجِهِۦ ۚ",
      "im": "وَزَوْجِهِ ۚ",
      "en": "and his spouse",
      "tr": "wazawjihi"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُم",
      "im": "هُم",
      "en": "they (could)",
      "tr": "hum"
    },
    {
      "ar": "بِضَآرِّينَ",
      "im": "بِضَارِّينَ",
      "en": "at all [be those who] harm",
      "tr": "biḍārrīna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَحَدٍ",
      "im": "أَحَدٍ",
      "en": "one",
      "tr": "aḥadin"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِإِذْنِ",
      "im": "بِإِذْنِ",
      "en": "by permission",
      "tr": "bi-idh'ni"
    },
    {
      "ar": "ٱللَّهِ ۚ",
      "im": "اللَّهِ ۚ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَيَتَعَلَّمُونَ",
      "im": "وَيَتَعَلَّمُونَ",
      "en": "And they learn",
      "tr": "wayataʿallamūna"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَضُرُّهُمْ",
      "im": "يَضُرُّهُمْ",
      "en": "harms them",
      "tr": "yaḍurruhum"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يَنفَعُهُمْ ۚ",
      "im": "يَنفَعُهُمْ ۚ",
      "en": "profits them",
      "tr": "yanfaʿuhum"
    },
    {
      "ar": "وَلَقَدْ",
      "im": "وَلَقَدْ",
      "en": "And indeed",
      "tr": "walaqad"
    },
    {
      "ar": "عَلِمُوا۟",
      "im": "عَلِمُوا",
      "en": "they knew",
      "tr": "ʿalimū"
    },
    {
      "ar": "لَمَنِ",
      "im": "لَمَنِ",
      "en": "that whoever",
      "tr": "lamani"
    },
    {
      "ar": "ٱشْتَرَىٰهُ",
      "im": "اشْتَرَاهُ",
      "en": "buys it",
      "tr": "ish'tarāhu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "for him",
      "tr": "lahu"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "im": "الْآخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "خَلَـٰقٍۢ ۚ",
      "im": "خَلَاقٍ ۚ",
      "en": "share",
      "tr": "khalāqin"
    },
    {
      "ar": "وَلَبِئْسَ",
      "im": "وَلَبِئْسَ",
      "en": "And surely evil",
      "tr": "walabi'sa"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "(is) what",
      "tr": "mā"
    },
    {
      "ar": "شَرَوْا۟",
      "im": "شَرَوْا",
      "en": "they sold",
      "tr": "sharaw"
    },
    {
      "ar": "بِهِۦٓ",
      "im": "بِهِ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "أَنفُسَهُمْ ۚ",
      "im": "أَنفُسَهُمْ ۚ",
      "en": "themselves",
      "tr": "anfusahum"
    },
    {
      "ar": "لَوْ",
      "im": "لَوْ",
      "en": "if",
      "tr": "law"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "they were",
      "tr": "kānū"
    },
    {
      "ar": "يَعْلَمُونَ",
      "im": "يَعْلَمُونَ",
      "en": "(to) know",
      "tr": "yaʿlamūna"
    }
  ],
  "2:126": [
    {
      "ar": "وَإِذْ",
      "im": "وَإِذْ",
      "en": "And when",
      "tr": "wa-idh"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "إِبْرَٰهِـۧمُ",
      "im": "إِبْرَاهِيمُ",
      "en": "Ibrahim",
      "tr": "ib'rāhīmu"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَلْ",
      "im": "اجْعَلْ",
      "en": "make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "بَلَدًا",
      "im": "بَلَدًا",
      "en": "a city",
      "tr": "baladan"
    },
    {
      "ar": "ءَامِنًۭا",
      "im": "آمِنًا",
      "en": "secure",
      "tr": "āminan"
    },
    {
      "ar": "وَٱرْزُقْ",
      "im": "وَارْزُقْ",
      "en": "and provide",
      "tr": "wa-ur'zuq"
    },
    {
      "ar": "أَهْلَهُۥ",
      "im": "أَهْلَهُ",
      "en": "its people",
      "tr": "ahlahu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلثَّمَرَٰتِ",
      "im": "الثَّمَرَاتِ",
      "en": "fruits",
      "tr": "l-thamarāti"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(to) whoever",
      "tr": "man"
    },
    {
      "ar": "ءَامَنَ",
      "im": "آمَنَ",
      "en": "believed",
      "tr": "āmana"
    },
    {
      "ar": "مِنْهُم",
      "im": "مِنْهُم",
      "en": "from them",
      "tr": "min'hum"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَٱلْيَوْمِ",
      "im": "وَالْيَوْمِ",
      "en": "and the Day",
      "tr": "wal-yawmi"
    },
    {
      "ar": "ٱلْـَٔاخِرِ ۖ",
      "im": "الْآخِرِ ۖ",
      "en": "the Last",
      "tr": "l-ākhiri"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "كَفَرَ",
      "im": "كَفَرَ",
      "en": "disbelieved",
      "tr": "kafara"
    },
    {
      "ar": "فَأُمَتِّعُهُۥ",
      "im": "فَأُمَتِّعُهُ",
      "en": "[then] I will grant him enjoyment",
      "tr": "fa-umattiʿuhu"
    },
    {
      "ar": "قَلِيلًۭا",
      "im": "قَلِيلًا",
      "en": "a little",
      "tr": "qalīlan"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "أَضْطَرُّهُۥٓ",
      "im": "أَضْطَرُّهُ",
      "en": "I will force him",
      "tr": "aḍṭarruhu"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "عَذَابِ",
      "im": "عَذَابِ",
      "en": "(the) punishment",
      "tr": "ʿadhābi"
    },
    {
      "ar": "ٱلنَّارِ ۖ",
      "im": "النَّارِ ۖ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    },
    {
      "ar": "وَبِئْسَ",
      "im": "وَبِئْسَ",
      "en": "and evil",
      "tr": "wabi'sa"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "im": "الْمَصِيرُ",
      "en": "(is) the destination",
      "tr": "l-maṣīru"
    }
  ],
  "2:127": [
    {
      "ar": "وَإِذْ",
      "im": "وَإِذْ",
      "en": "And when",
      "tr": "wa-idh"
    },
    {
      "ar": "يَرْفَعُ",
      "im": "يَرْفَعُ",
      "en": "(was) raising",
      "tr": "yarfaʿu"
    },
    {
      "ar": "إِبْرَٰهِـۧمُ",
      "im": "إِبْرَاهِيمُ",
      "en": "Ibrahim",
      "tr": "ib'rāhīmu"
    },
    {
      "ar": "ٱلْقَوَاعِدَ",
      "im": "الْقَوَاعِدَ",
      "en": "the foundations",
      "tr": "l-qawāʿida"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْبَيْتِ",
      "im": "الْبَيْتِ",
      "en": "the House",
      "tr": "l-bayti"
    },
    {
      "ar": "وَإِسْمَـٰعِيلُ",
      "im": "وَإِسْمَاعِيلُ",
      "en": "and Ishmael",
      "tr": "wa-is'māʿīlu"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "(saying), \"Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "تَقَبَّلْ",
      "im": "تَقَبَّلْ",
      "en": "Accept",
      "tr": "taqabbal"
    },
    {
      "ar": "مِنَّآ ۖ",
      "im": "مِنَّا ۖ",
      "en": "from us",
      "tr": "minnā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "[You] (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلسَّمِيعُ",
      "im": "السَّمِيعُ",
      "en": "the All-Hearing",
      "tr": "l-samīʿu"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "im": "الْعَلِيمُ",
      "en": "the All-Knowing",
      "tr": "l-ʿalīmu"
    }
  ],
  "2:128": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَٱجْعَلْنَا",
      "im": "وَاجْعَلْنَا",
      "en": "[and] Make us",
      "tr": "wa-ij'ʿalnā"
    },
    {
      "ar": "مُسْلِمَيْنِ",
      "im": "مُسْلِمَيْنِ",
      "en": "both submissive",
      "tr": "mus'limayni"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِنَآ",
      "im": "ذُرِّيَّتِنَا",
      "en": "our offspring",
      "tr": "dhurriyyatinā"
    },
    {
      "ar": "أُمَّةًۭ",
      "im": "أُمَّةً",
      "en": "a community",
      "tr": "ummatan"
    },
    {
      "ar": "مُّسْلِمَةًۭ",
      "im": "مُّسْلِمَةً",
      "en": "submissive",
      "tr": "mus'limatan"
    },
    {
      "ar": "لَّكَ",
      "im": "لَّكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "وَأَرِنَا",
      "im": "وَأَرِنَا",
      "en": "And show us",
      "tr": "wa-arinā"
    },
    {
      "ar": "مَنَاسِكَنَا",
      "im": "مَنَاسِكَنَا",
      "en": "our ways of worship",
      "tr": "manāsikanā"
    },
    {
      "ar": "وَتُبْ",
      "im": "وَتُبْ",
      "en": "and turn",
      "tr": "watub"
    },
    {
      "ar": "عَلَيْنَآ ۖ",
      "im": "عَلَيْنَا ۖ",
      "en": "to us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "[You] (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلتَّوَّابُ",
      "im": "التَّوَّابُ",
      "en": "the Oft-returning",
      "tr": "l-tawābu"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "im": "الرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
    }
  ],
  "2:129": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَٱبْعَثْ",
      "im": "وَابْعَثْ",
      "en": "[And] raise up",
      "tr": "wa-ib'ʿath"
    },
    {
      "ar": "فِيهِمْ",
      "im": "فِيهِمْ",
      "en": "in them",
      "tr": "fīhim"
    },
    {
      "ar": "رَسُولًۭا",
      "im": "رَسُولًا",
      "en": "a Messenger",
      "tr": "rasūlan"
    },
    {
      "ar": "مِّنْهُمْ",
      "im": "مِّنْهُمْ",
      "en": "from them",
      "tr": "min'hum"
    },
    {
      "ar": "يَتْلُوا۟",
      "im": "يَتْلُو",
      "en": "(who) will recite",
      "tr": "yatlū"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "to them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "ءَايَـٰتِكَ",
      "im": "آيَاتِكَ",
      "en": "Your Verses",
      "tr": "āyātika"
    },
    {
      "ar": "وَيُعَلِّمُهُمُ",
      "im": "وَيُعَلِّمُهُمُ",
      "en": "and will teach them",
      "tr": "wayuʿallimuhumu"
    },
    {
      "ar": "ٱلْكِتَـٰبَ",
      "im": "الْكِتَابَ",
      "en": "the Book",
      "tr": "l-kitāba"
    },
    {
      "ar": "وَٱلْحِكْمَةَ",
      "im": "وَالْحِكْمَةَ",
      "en": "and the wisdom",
      "tr": "wal-ḥik'mata"
    },
    {
      "ar": "وَيُزَكِّيهِمْ ۚ",
      "im": "وَيُزَكِّيهِمْ ۚ",
      "en": "and purify them",
      "tr": "wayuzakkīhim"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "im": "الْعَزِيزُ",
      "en": "the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "2:155": [
    {
      "ar": "وَلَنَبْلُوَنَّكُم",
      "im": "وَلَنَبْلُوَنَّكُم",
      "en": "And surely We will test you",
      "tr": "walanabluwannakum"
    },
    {
      "ar": "بِشَىْءٍۢ",
      "im": "بِشَيْءٍ",
      "en": "with something",
      "tr": "bishayin"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَوْفِ",
      "im": "الْخَوْفِ",
      "en": "[the] fear",
      "tr": "l-khawfi"
    },
    {
      "ar": "وَٱلْجُوعِ",
      "im": "وَالْجُوعِ",
      "en": "and [the] hunger",
      "tr": "wal-jūʿi"
    },
    {
      "ar": "وَنَقْصٍۢ",
      "im": "وَنَقْصٍ",
      "en": "and loss",
      "tr": "wanaqṣin"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَمْوَٰلِ",
      "im": "الْأَمْوَالِ",
      "en": "[the] wealth",
      "tr": "l-amwāli"
    },
    {
      "ar": "وَٱلْأَنفُسِ",
      "im": "وَالْأَنفُسِ",
      "en": "and [the] lives",
      "tr": "wal-anfusi"
    },
    {
      "ar": "وَٱلثَّمَرَٰتِ ۗ",
      "im": "وَالثَّمَرَاتِ ۗ",
      "en": "and [the] fruits",
      "tr": "wal-thamarāti"
    },
    {
      "ar": "وَبَشِّرِ",
      "im": "وَبَشِّرِ",
      "en": "but give good news",
      "tr": "wabashiri"
    },
    {
      "ar": "ٱلصَّـٰبِرِينَ",
      "im": "الصَّابِرِينَ",
      "en": "(to) the patient ones",
      "tr": "l-ṣābirīna"
    }
  ],
  "2:156": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "إِذَآ",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "أَصَـٰبَتْهُم",
      "im": "أَصَابَتْهُم",
      "en": "strikes them",
      "tr": "aṣābathum"
    },
    {
      "ar": "مُّصِيبَةٌۭ",
      "im": "مُّصِيبَةٌ",
      "en": "a misfortune",
      "tr": "muṣībatun"
    },
    {
      "ar": "قَالُوٓا۟",
      "im": "قَالُوا",
      "en": "they say",
      "tr": "qālū"
    },
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "belong to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "وَإِنَّآ",
      "im": "وَإِنَّا",
      "en": "and indeed we",
      "tr": "wa-innā"
    },
    {
      "ar": "إِلَيْهِ",
      "im": "إِلَيْهِ",
      "en": "towards Him",
      "tr": "ilayhi"
    },
    {
      "ar": "رَٰجِعُونَ",
      "im": "رَاجِعُونَ",
      "en": "will return",
      "tr": "rājiʿūna"
    }
  ],
  "2:201": [
    {
      "ar": "وَمِنْهُم",
      "im": "وَمِنْهُم",
      "en": "And from those",
      "tr": "wamin'hum"
    },
    {
      "ar": "مَّن",
      "im": "مَّن",
      "en": "who",
      "tr": "man"
    },
    {
      "ar": "يَقُولُ",
      "im": "يَقُولُ",
      "en": "say",
      "tr": "yaqūlu"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَاتِنَا",
      "im": "آتِنَا",
      "en": "Grant us",
      "tr": "ātinā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "im": "الدُّنْيَا",
      "en": "the world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "حَسَنَةًۭ",
      "im": "حَسَنَةً",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَفِى",
      "im": "وَفِي",
      "en": "and in",
      "tr": "wafī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "im": "الْآخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "حَسَنَةًۭ",
      "im": "حَسَنَةً",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَقِنَا",
      "im": "وَقِنَا",
      "en": "and save us",
      "tr": "waqinā"
    },
    {
      "ar": "عَذَابَ",
      "im": "عَذَابَ",
      "en": "(from the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "im": "النَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "2:250": [
    {
      "ar": "وَلَمَّا",
      "im": "وَلَمَّا",
      "en": "And when",
      "tr": "walammā"
    },
    {
      "ar": "بَرَزُوا۟",
      "im": "بَرَزُوا",
      "en": "they went forth",
      "tr": "barazū"
    },
    {
      "ar": "لِجَالُوتَ",
      "im": "لِجَالُوتَ",
      "en": "to (face) Jalut",
      "tr": "lijālūta"
    },
    {
      "ar": "وَجُنُودِهِۦ",
      "im": "وَجُنُودِهِ",
      "en": "and his troops",
      "tr": "wajunūdihi"
    },
    {
      "ar": "قَالُوا۟",
      "im": "قَالُوا",
      "en": "they said",
      "tr": "qālū"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَفْرِغْ",
      "im": "أَفْرِغْ",
      "en": "Pour",
      "tr": "afrigh"
    },
    {
      "ar": "عَلَيْنَا",
      "im": "عَلَيْنَا",
      "en": "on us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "صَبْرًۭا",
      "im": "صَبْرًا",
      "en": "patience",
      "tr": "ṣabran"
    },
    {
      "ar": "وَثَبِّتْ",
      "im": "وَثَبِّتْ",
      "en": "and make firm",
      "tr": "wathabbit"
    },
    {
      "ar": "أَقْدَامَنَا",
      "im": "أَقْدَامَنَا",
      "en": "our feet",
      "tr": "aqdāmanā"
    },
    {
      "ar": "وَٱنصُرْنَا",
      "im": "وَانصُرْنَا",
      "en": "and help us",
      "tr": "wa-unṣur'nā"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "im": "الْكَافِرِينَ",
      "en": "(who are) disbelieving",
      "tr": "l-kāfirīna"
    }
  ],
  "2:255": [
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "al-lahu"
    },
    {
      "ar": "لَآ",
      "im": "لَا",
      "en": "(there is) no",
      "tr": "lā"
    },
    {
      "ar": "إِلَـٰهَ",
      "im": "إِلَٰهَ",
      "en": "God",
      "tr": "ilāha"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "Him",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْحَىُّ",
      "im": "الْحَيُّ",
      "en": "the Ever-Living",
      "tr": "l-ḥayu"
    },
    {
      "ar": "ٱلْقَيُّومُ ۚ",
      "im": "الْقَيُّومُ ۚ",
      "en": "the Sustainer of all that exists",
      "tr": "l-qayūmu"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "تَأْخُذُهُۥ",
      "im": "تَأْخُذُهُ",
      "en": "overtakes Him",
      "tr": "takhudhuhu"
    },
    {
      "ar": "سِنَةٌۭ",
      "im": "سِنَةٌ",
      "en": "slumber",
      "tr": "sinatun"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "[and] not",
      "tr": "walā"
    },
    {
      "ar": "نَوْمٌۭ ۚ",
      "im": "نَوْمٌ ۚ",
      "en": "sleep",
      "tr": "nawmun"
    },
    {
      "ar": "لَّهُۥ",
      "im": "لَّهُ",
      "en": "To Him (belongs)",
      "tr": "lahu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what(ever)",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what(ever)",
      "tr": "wamā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْأَرْضِ ۗ",
      "im": "الْأَرْضِ ۗ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "Who",
      "tr": "man"
    },
    {
      "ar": "ذَا",
      "im": "ذَا",
      "en": "(is) the one",
      "tr": "dhā"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "who",
      "tr": "alladhī"
    },
    {
      "ar": "يَشْفَعُ",
      "im": "يَشْفَعُ",
      "en": "can intercede",
      "tr": "yashfaʿu"
    },
    {
      "ar": "عِندَهُۥٓ",
      "im": "عِندَهُ",
      "en": "with Him",
      "tr": "ʿindahu"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِإِذْنِهِۦ ۚ",
      "im": "بِإِذْنِهِ ۚ",
      "en": "by His permission",
      "tr": "bi-idh'nihi"
    },
    {
      "ar": "يَعْلَمُ",
      "im": "يَعْلَمُ",
      "en": "He knows",
      "tr": "yaʿlamu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "بَيْنَ",
      "im": "بَيْنَ",
      "en": "(is)",
      "tr": "bayna"
    },
    {
      "ar": "أَيْدِيهِمْ",
      "im": "أَيْدِيهِمْ",
      "en": "before them",
      "tr": "aydīhim"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "خَلْفَهُمْ ۖ",
      "im": "خَلْفَهُمْ ۖ",
      "en": "(is) behind them",
      "tr": "khalfahum"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يُحِيطُونَ",
      "im": "يُحِيطُونَ",
      "en": "they encompass",
      "tr": "yuḥīṭūna"
    },
    {
      "ar": "بِشَىْءٍۢ",
      "im": "بِشَيْءٍ",
      "en": "anything",
      "tr": "bishayin"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِلْمِهِۦٓ",
      "im": "عِلْمِهِ",
      "en": "His Knowledge",
      "tr": "ʿil'mihi"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِمَا",
      "im": "بِمَا",
      "en": "[of] what",
      "tr": "bimā"
    },
    {
      "ar": "شَآءَ ۚ",
      "im": "شَاءَ ۚ",
      "en": "He willed",
      "tr": "shāa"
    },
    {
      "ar": "وَسِعَ",
      "im": "وَسِعَ",
      "en": "Extends",
      "tr": "wasiʿa"
    },
    {
      "ar": "كُرْسِيُّهُ",
      "im": "كُرْسِيُّهُ",
      "en": "His Seat",
      "tr": "kur'siyyuhu"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "(to) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضَ ۖ",
      "im": "وَالْأَرْضَ ۖ",
      "en": "and the earth",
      "tr": "wal-arḍa"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يَـُٔودُهُۥ",
      "im": "يَئُودُهُ",
      "en": "tires Him",
      "tr": "yaūduhu"
    },
    {
      "ar": "حِفْظُهُمَا ۚ",
      "im": "حِفْظُهُمَا ۚ",
      "en": "(the) guarding of both of them",
      "tr": "ḥif'ẓuhumā"
    },
    {
      "ar": "وَهُوَ",
      "im": "وَهُوَ",
      "en": "And He",
      "tr": "wahuwa"
    },
    {
      "ar": "ٱلْعَلِىُّ",
      "im": "الْعَلِيُّ",
      "en": "(is) the Most High",
      "tr": "l-ʿaliyu"
    },
    {
      "ar": "ٱلْعَظِيمُ",
      "im": "الْعَظِيمُ",
      "en": "the Most Great",
      "tr": "l-ʿaẓīmu"
    }
  ],
  "2:285": [
    {
      "ar": "ءَامَنَ",
      "im": "آمَنَ",
      "en": "Believed",
      "tr": "āmana"
    },
    {
      "ar": "ٱلرَّسُولُ",
      "im": "الرَّسُولُ",
      "en": "the Messenger",
      "tr": "l-rasūlu"
    },
    {
      "ar": "بِمَآ",
      "im": "بِمَا",
      "en": "in what",
      "tr": "bimā"
    },
    {
      "ar": "أُنزِلَ",
      "im": "أُنزِلَ",
      "en": "was revealed",
      "tr": "unzila"
    },
    {
      "ar": "إِلَيْهِ",
      "im": "إِلَيْهِ",
      "en": "to him",
      "tr": "ilayhi"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّهِۦ",
      "im": "رَّبِّهِ",
      "en": "his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "وَٱلْمُؤْمِنُونَ ۚ",
      "im": "وَالْمُؤْمِنُونَ ۚ",
      "en": "and the believers",
      "tr": "wal-mu'minūna"
    },
    {
      "ar": "كُلٌّ",
      "im": "كُلٌّ",
      "en": "All",
      "tr": "kullun"
    },
    {
      "ar": "ءَامَنَ",
      "im": "آمَنَ",
      "en": "believed",
      "tr": "āmana"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَمَلَـٰٓئِكَتِهِۦ",
      "im": "وَمَلَائِكَتِهِ",
      "en": "and His Angels",
      "tr": "wamalāikatihi"
    },
    {
      "ar": "وَكُتُبِهِۦ",
      "im": "وَكُتُبِهِ",
      "en": "and His Books",
      "tr": "wakutubihi"
    },
    {
      "ar": "وَرُسُلِهِۦ",
      "im": "وَرُسُلِهِ",
      "en": "and His Messengers",
      "tr": "warusulihi"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "نُفَرِّقُ",
      "im": "نُفَرِّقُ",
      "en": "we make distinction",
      "tr": "nufarriqu"
    },
    {
      "ar": "بَيْنَ",
      "im": "بَيْنَ",
      "en": "between",
      "tr": "bayna"
    },
    {
      "ar": "أَحَدٍۢ",
      "im": "أَحَدٍ",
      "en": "any",
      "tr": "aḥadin"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "رُّسُلِهِۦ ۚ",
      "im": "رُّسُلِهِ ۚ",
      "en": "His messengers",
      "tr": "rusulihi"
    },
    {
      "ar": "وَقَالُوا۟",
      "im": "وَقَالُوا",
      "en": "And they said",
      "tr": "waqālū"
    },
    {
      "ar": "سَمِعْنَا",
      "im": "سَمِعْنَا",
      "en": "We heard",
      "tr": "samiʿ'nā"
    },
    {
      "ar": "وَأَطَعْنَا ۖ",
      "im": "وَأَطَعْنَا ۖ",
      "en": "and we obeyed",
      "tr": "wa-aṭaʿnā"
    },
    {
      "ar": "غُفْرَانَكَ",
      "im": "غُفْرَانَكَ",
      "en": "(Grant) us Your forgiveness",
      "tr": "ghuf'rānaka"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "im": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "im": "الْمَصِيرُ",
      "en": "(is) the return",
      "tr": "l-maṣīru"
    }
  ],
  "2:286": [
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Does) not",
      "tr": "lā"
    },
    {
      "ar": "يُكَلِّفُ",
      "im": "يُكَلِّفُ",
      "en": "burden",
      "tr": "yukallifu"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "نَفْسًا",
      "im": "نَفْسًا",
      "en": "any soul",
      "tr": "nafsan"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "وُسْعَهَا ۚ",
      "im": "وُسْعَهَا ۚ",
      "en": "its capacity",
      "tr": "wus'ʿahā"
    },
    {
      "ar": "لَهَا",
      "im": "لَهَا",
      "en": "for it",
      "tr": "lahā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "كَسَبَتْ",
      "im": "كَسَبَتْ",
      "en": "it earned",
      "tr": "kasabat"
    },
    {
      "ar": "وَعَلَيْهَا",
      "im": "وَعَلَيْهَا",
      "en": "and against it",
      "tr": "waʿalayhā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱكْتَسَبَتْ ۗ",
      "im": "اكْتَسَبَتْ ۗ",
      "en": "it earned",
      "tr": "ik'tasabat"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تُؤَاخِذْنَآ",
      "im": "تُؤَاخِذْنَا",
      "en": "take us to task",
      "tr": "tuākhidh'nā"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "نَّسِينَآ",
      "im": "نَّسِينَا",
      "en": "we forget",
      "tr": "nasīnā"
    },
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "or",
      "tr": "aw"
    },
    {
      "ar": "أَخْطَأْنَا ۚ",
      "im": "أَخْطَأْنَا ۚ",
      "en": "we err",
      "tr": "akhṭanā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَحْمِلْ",
      "im": "تَحْمِلْ",
      "en": "lay",
      "tr": "taḥmil"
    },
    {
      "ar": "عَلَيْنَآ",
      "im": "عَلَيْنَا",
      "en": "upon us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "إِصْرًۭا",
      "im": "إِصْرًا",
      "en": "a burden",
      "tr": "iṣ'ran"
    },
    {
      "ar": "كَمَا",
      "im": "كَمَا",
      "en": "like that",
      "tr": "kamā"
    },
    {
      "ar": "حَمَلْتَهُۥ",
      "im": "حَمَلْتَهُ",
      "en": "(which) You laid [it]",
      "tr": "ḥamaltahu"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "(were) from",
      "tr": "min"
    },
    {
      "ar": "قَبْلِنَا ۚ",
      "im": "قَبْلِنَا ۚ",
      "en": "before us",
      "tr": "qablinā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "[And] (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُحَمِّلْنَا",
      "im": "تُحَمِّلْنَا",
      "en": "lay on us",
      "tr": "tuḥammil'nā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "طَاقَةَ",
      "im": "طَاقَةَ",
      "en": "(the) strength",
      "tr": "ṭāqata"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "we have",
      "tr": "lanā"
    },
    {
      "ar": "بِهِۦ ۖ",
      "im": "بِهِ ۖ",
      "en": "[of it] (to bear)",
      "tr": "bihi"
    },
    {
      "ar": "وَٱعْفُ",
      "im": "وَاعْفُ",
      "en": "And pardon",
      "tr": "wa-uʿ'fu"
    },
    {
      "ar": "عَنَّا",
      "im": "عَنَّا",
      "en": "[from] us",
      "tr": "ʿannā"
    },
    {
      "ar": "وَٱغْفِرْ",
      "im": "وَاغْفِرْ",
      "en": "and forgive",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "[for] us",
      "tr": "lanā"
    },
    {
      "ar": "وَٱرْحَمْنَآ ۚ",
      "im": "وَارْحَمْنَا ۚ",
      "en": "and have mercy on us",
      "tr": "wa-ir'ḥamnā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You (are)",
      "tr": "anta"
    },
    {
      "ar": "مَوْلَىٰنَا",
      "im": "مَوْلَانَا",
      "en": "our Protector",
      "tr": "mawlānā"
    },
    {
      "ar": "فَٱنصُرْنَا",
      "im": "فَانصُرْنَا",
      "en": "so help us",
      "tr": "fa-unṣur'nā"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "im": "الْكَافِرِينَ",
      "en": "[the] disbelievers",
      "tr": "l-kāfirīna"
    }
  ],
  "3:8": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تُزِغْ",
      "im": "تُزِغْ",
      "en": "deviate",
      "tr": "tuzigh"
    },
    {
      "ar": "قُلُوبَنَا",
      "im": "قُلُوبَنَا",
      "en": "our hearts",
      "tr": "qulūbanā"
    },
    {
      "ar": "بَعْدَ",
      "im": "بَعْدَ",
      "en": "after",
      "tr": "baʿda"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "[when]",
      "tr": "idh"
    },
    {
      "ar": "هَدَيْتَنَا",
      "im": "هَدَيْتَنَا",
      "en": "You (have) guided us",
      "tr": "hadaytanā"
    },
    {
      "ar": "وَهَبْ",
      "im": "وَهَبْ",
      "en": "and grant",
      "tr": "wahab"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "(for) us",
      "tr": "lanā"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "im": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "رَحْمَةً ۚ",
      "im": "رَحْمَةً ۚ",
      "en": "mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْوَهَّابُ",
      "im": "الْوَهَّابُ",
      "en": "(are) the Bestower",
      "tr": "l-wahābu"
    }
  ],
  "3:9": [
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "جَامِعُ",
      "im": "جَامِعُ",
      "en": "will gather",
      "tr": "jāmiʿu"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "[the] mankind",
      "tr": "l-nāsi"
    },
    {
      "ar": "لِيَوْمٍۢ",
      "im": "لِيَوْمٍ",
      "en": "on a Day",
      "tr": "liyawmin"
    },
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "(there is) no",
      "tr": "lā"
    },
    {
      "ar": "رَيْبَ",
      "im": "رَيْبَ",
      "en": "doubt",
      "tr": "rayba"
    },
    {
      "ar": "فِيهِ ۚ",
      "im": "فِيهِ ۚ",
      "en": "in it",
      "tr": "fīhi"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(does) not",
      "tr": "lā"
    },
    {
      "ar": "يُخْلِفُ",
      "im": "يُخْلِفُ",
      "en": "break",
      "tr": "yukh'lifu"
    },
    {
      "ar": "ٱلْمِيعَادَ",
      "im": "الْمِيعَادَ",
      "en": "the Promise",
      "tr": "l-mīʿāda"
    }
  ],
  "3:16": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّنَآ",
      "im": "إِنَّنَا",
      "en": "Indeed, we",
      "tr": "innanā"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "(have) believed",
      "tr": "āmannā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "im": "فَاغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "ذُنُوبَنَا",
      "im": "ذُنُوبَنَا",
      "en": "our sins",
      "tr": "dhunūbanā"
    },
    {
      "ar": "وَقِنَا",
      "im": "وَقِنَا",
      "en": "and save us",
      "tr": "waqinā"
    },
    {
      "ar": "عَذَابَ",
      "im": "عَذَابَ",
      "en": "(from) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "im": "النَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "3:26": [
    {
      "ar": "قُلِ",
      "im": "قُلِ",
      "en": "Say",
      "tr": "quli"
    },
    {
      "ar": "ٱللَّهُمَّ",
      "im": "اللَّهُمَّ",
      "en": "O Allah",
      "tr": "l-lahuma"
    },
    {
      "ar": "مَـٰلِكَ",
      "im": "مَالِكَ",
      "en": "Owner",
      "tr": "mālika"
    },
    {
      "ar": "ٱلْمُلْكِ",
      "im": "الْمُلْكِ",
      "en": "(of) the Dominion",
      "tr": "l-mul'ki"
    },
    {
      "ar": "تُؤْتِى",
      "im": "تُؤْتِي",
      "en": "You give",
      "tr": "tu'tī"
    },
    {
      "ar": "ٱلْمُلْكَ",
      "im": "الْمُلْكَ",
      "en": "the dominion",
      "tr": "l-mul'ka"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(to) whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "im": "تَشَاءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتَنزِعُ",
      "im": "وَتَنزِعُ",
      "en": "and You take away",
      "tr": "watanziʿu"
    },
    {
      "ar": "ٱلْمُلْكَ",
      "im": "الْمُلْكَ",
      "en": "the dominion",
      "tr": "l-mul'ka"
    },
    {
      "ar": "مِمَّن",
      "im": "مِمَّن",
      "en": "from whom",
      "tr": "mimman"
    },
    {
      "ar": "تَشَآءُ",
      "im": "تَشَاءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتُعِزُّ",
      "im": "وَتُعِزُّ",
      "en": "and You honor",
      "tr": "watuʿizzu"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "im": "تَشَاءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتُذِلُّ",
      "im": "وَتُذِلُّ",
      "en": "and You humiliate",
      "tr": "watudhillu"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ ۖ",
      "im": "تَشَاءُ ۖ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "بِيَدِكَ",
      "im": "بِيَدِكَ",
      "en": "In Your hand",
      "tr": "biyadika"
    },
    {
      "ar": "ٱلْخَيْرُ ۖ",
      "im": "الْخَيْرُ ۖ",
      "en": "(is all) the good",
      "tr": "l-khayru"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "(are) on",
      "tr": "ʿalā"
    },
    {
      "ar": "كُلِّ",
      "im": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدِيرٌۭ",
      "im": "قَدِيرٌ",
      "en": "All-Powerful",
      "tr": "qadīrun"
    }
  ],
  "3:27": [
    {
      "ar": "تُولِجُ",
      "im": "تُولِجُ",
      "en": "You cause to enter",
      "tr": "tūliju"
    },
    {
      "ar": "ٱلَّيْلَ",
      "im": "اللَّيْلَ",
      "en": "the night",
      "tr": "al-layla"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلنَّهَارِ",
      "im": "النَّهَارِ",
      "en": "the day",
      "tr": "l-nahāri"
    },
    {
      "ar": "وَتُولِجُ",
      "im": "وَتُولِجُ",
      "en": "and You cause to enter",
      "tr": "watūliju"
    },
    {
      "ar": "ٱلنَّهَارَ",
      "im": "النَّهَارَ",
      "en": "the day",
      "tr": "l-nahāra"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلَّيْلِ ۖ",
      "im": "اللَّيْلِ ۖ",
      "en": "the night",
      "tr": "al-layli"
    },
    {
      "ar": "وَتُخْرِجُ",
      "im": "وَتُخْرِجُ",
      "en": "and You bring forth",
      "tr": "watukh'riju"
    },
    {
      "ar": "ٱلْحَىَّ",
      "im": "الْحَيَّ",
      "en": "the living",
      "tr": "l-ḥaya"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمَيِّتِ",
      "im": "الْمَيِّتِ",
      "en": "the dead",
      "tr": "l-mayiti"
    },
    {
      "ar": "وَتُخْرِجُ",
      "im": "وَتُخْرِجُ",
      "en": "and You bring forth",
      "tr": "watukh'riju"
    },
    {
      "ar": "ٱلْمَيِّتَ",
      "im": "الْمَيِّتَ",
      "en": "the dead",
      "tr": "l-mayita"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَىِّ ۖ",
      "im": "الْحَيِّ ۖ",
      "en": "the living",
      "tr": "l-ḥayi"
    },
    {
      "ar": "وَتَرْزُقُ",
      "im": "وَتَرْزُقُ",
      "en": "and You give provision",
      "tr": "watarzuqu"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(to) whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "im": "تَشَاءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "بِغَيْرِ",
      "im": "بِغَيْرِ",
      "en": "without",
      "tr": "bighayri"
    },
    {
      "ar": "حِسَابٍۢ",
      "im": "حِسَابٍ",
      "en": "measure",
      "tr": "ḥisābin"
    }
  ],
  "3:35": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَتِ",
      "im": "قَالَتِ",
      "en": "[she] said",
      "tr": "qālati"
    },
    {
      "ar": "ٱمْرَأَتُ",
      "im": "امْرَأَتُ",
      "en": "(the) wife",
      "tr": "im'ra-atu"
    },
    {
      "ar": "عِمْرَٰنَ",
      "im": "عِمْرَانَ",
      "en": "(of) Imran",
      "tr": "ʿim'rāna"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "نَذَرْتُ",
      "im": "نَذَرْتُ",
      "en": "[I] vowed",
      "tr": "nadhartu"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "to You",
      "tr": "laka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "بَطْنِى",
      "im": "بَطْنِي",
      "en": "my womb",
      "tr": "baṭnī"
    },
    {
      "ar": "مُحَرَّرًۭا",
      "im": "مُحَرَّرًا",
      "en": "dedicated",
      "tr": "muḥarraran"
    },
    {
      "ar": "فَتَقَبَّلْ",
      "im": "فَتَقَبَّلْ",
      "en": "so accept",
      "tr": "fataqabbal"
    },
    {
      "ar": "مِنِّىٓ ۖ",
      "im": "مِنِّي ۖ",
      "en": "from me",
      "tr": "minnī"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلسَّمِيعُ",
      "im": "السَّمِيعُ",
      "en": "(are) the All-Hearing",
      "tr": "l-samīʿu"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "im": "الْعَلِيمُ",
      "en": "the All-Knowing",
      "tr": "l-ʿalīmu"
    }
  ],
  "3:38": [
    {
      "ar": "هُنَالِكَ",
      "im": "هُنَالِكَ",
      "en": "There only",
      "tr": "hunālika"
    },
    {
      "ar": "دَعَا",
      "im": "دَعَا",
      "en": "invoked",
      "tr": "daʿā"
    },
    {
      "ar": "زَكَرِيَّا",
      "im": "زَكَرِيَّا",
      "en": "Zakariya",
      "tr": "zakariyyā"
    },
    {
      "ar": "رَبَّهُۥ ۖ",
      "im": "رَبَّهُ ۖ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "im": "هَبْ",
      "en": "grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "im": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "ذُرِّيَّةًۭ",
      "im": "ذُرِّيَّةً",
      "en": "offspring",
      "tr": "dhurriyyatan"
    },
    {
      "ar": "طَيِّبَةً ۖ",
      "im": "طَيِّبَةً ۖ",
      "en": "pure",
      "tr": "ṭayyibatan"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "سَمِيعُ",
      "im": "سَمِيعُ",
      "en": "(are) All-Hearer",
      "tr": "samīʿu"
    },
    {
      "ar": "ٱلدُّعَآءِ",
      "im": "الدُّعَاءِ",
      "en": "(of) the prayer",
      "tr": "l-duʿāi"
    }
  ],
  "3:52": [
    {
      "ar": "۞ فَلَمَّآ",
      "im": "۞ فَلَمَّا",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَحَسَّ",
      "im": "أَحَسَّ",
      "en": "perceived",
      "tr": "aḥassa"
    },
    {
      "ar": "عِيسَىٰ",
      "im": "عِيسَىٰ",
      "en": "Isa",
      "tr": "ʿīsā"
    },
    {
      "ar": "مِنْهُمُ",
      "im": "مِنْهُمُ",
      "en": "from them",
      "tr": "min'humu"
    },
    {
      "ar": "ٱلْكُفْرَ",
      "im": "الْكُفْرَ",
      "en": "[the] disbelief",
      "tr": "l-kuf'ra"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "Who",
      "tr": "man"
    },
    {
      "ar": "أَنصَارِىٓ",
      "im": "أَنصَارِي",
      "en": "(will be) my helpers",
      "tr": "anṣārī"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱللَّهِ ۖ",
      "im": "اللَّهِ ۖ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "ٱلْحَوَارِيُّونَ",
      "im": "الْحَوَارِيُّونَ",
      "en": "the disciples",
      "tr": "l-ḥawāriyūna"
    },
    {
      "ar": "نَحْنُ",
      "im": "نَحْنُ",
      "en": "We",
      "tr": "naḥnu"
    },
    {
      "ar": "أَنصَارُ",
      "im": "أَنصَارُ",
      "en": "(will be the) helpers",
      "tr": "anṣāru"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "we believe[d]",
      "tr": "āmannā"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَٱشْهَدْ",
      "im": "وَاشْهَدْ",
      "en": "and bear witness",
      "tr": "wa-ish'had"
    },
    {
      "ar": "بِأَنَّا",
      "im": "بِأَنَّا",
      "en": "that we",
      "tr": "bi-annā"
    },
    {
      "ar": "مُسْلِمُونَ",
      "im": "مُسْلِمُونَ",
      "en": "(are) Muslims",
      "tr": "mus'limūna"
    }
  ],
  "3:53": [
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "we believe[d]",
      "tr": "āmannā"
    },
    {
      "ar": "بِمَآ",
      "im": "بِمَا",
      "en": "in what",
      "tr": "bimā"
    },
    {
      "ar": "أَنزَلْتَ",
      "im": "أَنزَلْتَ",
      "en": "You revealed",
      "tr": "anzalta"
    },
    {
      "ar": "وَٱتَّبَعْنَا",
      "im": "وَاتَّبَعْنَا",
      "en": "and we follow[ed]",
      "tr": "wa-ittabaʿnā"
    },
    {
      "ar": "ٱلرَّسُولَ",
      "im": "الرَّسُولَ",
      "en": "the Messenger",
      "tr": "l-rasūla"
    },
    {
      "ar": "فَٱكْتُبْنَا",
      "im": "فَاكْتُبْنَا",
      "en": "then write us",
      "tr": "fa-uk'tub'nā"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "among",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلشَّـٰهِدِينَ",
      "im": "الشَّاهِدِينَ",
      "en": "the witnesses",
      "tr": "l-shāhidīna"
    }
  ],
  "3:191": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَذْكُرُونَ",
      "im": "يَذْكُرُونَ",
      "en": "remember",
      "tr": "yadhkurūna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "قِيَـٰمًۭا",
      "im": "قِيَامًا",
      "en": "standing",
      "tr": "qiyāman"
    },
    {
      "ar": "وَقُعُودًۭا",
      "im": "وَقُعُودًا",
      "en": "and sitting",
      "tr": "waquʿūdan"
    },
    {
      "ar": "وَعَلَىٰ",
      "im": "وَعَلَىٰ",
      "en": "and on",
      "tr": "waʿalā"
    },
    {
      "ar": "جُنُوبِهِمْ",
      "im": "جُنُوبِهِمْ",
      "en": "their sides",
      "tr": "junūbihim"
    },
    {
      "ar": "وَيَتَفَكَّرُونَ",
      "im": "وَيَتَفَكَّرُونَ",
      "en": "and they reflect",
      "tr": "wayatafakkarūna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "on",
      "tr": "fī"
    },
    {
      "ar": "خَلْقِ",
      "im": "خَلْقِ",
      "en": "(the) creation",
      "tr": "khalqi"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ",
      "im": "وَالْأَرْضِ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "خَلَقْتَ",
      "im": "خَلَقْتَ",
      "en": "You have created",
      "tr": "khalaqta"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "بَـٰطِلًۭا",
      "im": "بَاطِلًا",
      "en": "(in) vain",
      "tr": "bāṭilan"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "im": "سُبْحَانَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "فَقِنَا",
      "im": "فَقِنَا",
      "en": "so save us",
      "tr": "faqinā"
    },
    {
      "ar": "عَذَابَ",
      "im": "عَذَابَ",
      "en": "(from the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلنَّارِ",
      "im": "النَّارِ",
      "en": "(of) the Fire",
      "tr": "l-nāri"
    }
  ],
  "3:192": [
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "indeed [You]",
      "tr": "innaka"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تُدْخِلِ",
      "im": "تُدْخِلِ",
      "en": "You admit",
      "tr": "tud'khili"
    },
    {
      "ar": "ٱلنَّارَ",
      "im": "النَّارَ",
      "en": "(to) the Fire",
      "tr": "l-nāra"
    },
    {
      "ar": "فَقَدْ",
      "im": "فَقَدْ",
      "en": "then surely",
      "tr": "faqad"
    },
    {
      "ar": "أَخْزَيْتَهُۥ ۖ",
      "im": "أَخْزَيْتَهُ ۖ",
      "en": "You (have) disgraced him",
      "tr": "akhzaytahu"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "لِلظَّـٰلِمِينَ",
      "im": "لِلظَّالِمِينَ",
      "en": "for the wrongdoers",
      "tr": "lilẓẓālimīna"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "(are) any",
      "tr": "min"
    },
    {
      "ar": "أَنصَارٍۢ",
      "im": "أَنصَارٍ",
      "en": "helpers",
      "tr": "anṣārin"
    }
  ],
  "3:193": [
    {
      "ar": "رَّبَّنَآ",
      "im": "رَّبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّنَا",
      "im": "إِنَّنَا",
      "en": "indeed we",
      "tr": "innanā"
    },
    {
      "ar": "سَمِعْنَا",
      "im": "سَمِعْنَا",
      "en": "[we] heard",
      "tr": "samiʿ'nā"
    },
    {
      "ar": "مُنَادِيًۭا",
      "im": "مُنَادِيًا",
      "en": "a caller",
      "tr": "munādiyan"
    },
    {
      "ar": "يُنَادِى",
      "im": "يُنَادِي",
      "en": "calling",
      "tr": "yunādī"
    },
    {
      "ar": "لِلْإِيمَـٰنِ",
      "im": "لِلْإِيمَانِ",
      "en": "to the faith",
      "tr": "lil'īmāni"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "ءَامِنُوا۟",
      "im": "آمِنُوا",
      "en": "Believe",
      "tr": "āminū"
    },
    {
      "ar": "بِرَبِّكُمْ",
      "im": "بِرَبِّكُمْ",
      "en": "in your Lord",
      "tr": "birabbikum"
    },
    {
      "ar": "فَـَٔامَنَّا ۚ",
      "im": "فَآمَنَّا ۚ",
      "en": "so we have believed",
      "tr": "faāmannā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "im": "فَاغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "ذُنُوبَنَا",
      "im": "ذُنُوبَنَا",
      "en": "our sins",
      "tr": "dhunūbanā"
    },
    {
      "ar": "وَكَفِّرْ",
      "im": "وَكَفِّرْ",
      "en": "and remove",
      "tr": "wakaffir"
    },
    {
      "ar": "عَنَّا",
      "im": "عَنَّا",
      "en": "from us",
      "tr": "ʿannā"
    },
    {
      "ar": "سَيِّـَٔاتِنَا",
      "im": "سَيِّئَاتِنَا",
      "en": "our evil deeds",
      "tr": "sayyiātinā"
    },
    {
      "ar": "وَتَوَفَّنَا",
      "im": "وَتَوَفَّنَا",
      "en": "and cause us to die",
      "tr": "watawaffanā"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْأَبْرَارِ",
      "im": "الْأَبْرَارِ",
      "en": "the righteous",
      "tr": "l-abrāri"
    }
  ],
  "3:194": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَءَاتِنَا",
      "im": "وَآتِنَا",
      "en": "grant us",
      "tr": "waātinā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "وَعَدتَّنَا",
      "im": "وَعَدتَّنَا",
      "en": "You promised us",
      "tr": "waʿadttanā"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "through",
      "tr": "ʿalā"
    },
    {
      "ar": "رُسُلِكَ",
      "im": "رُسُلِكَ",
      "en": "Your Messengers",
      "tr": "rusulika"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُخْزِنَا",
      "im": "تُخْزِنَا",
      "en": "disgrace us",
      "tr": "tukh'zinā"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلْقِيَـٰمَةِ ۗ",
      "im": "الْقِيَامَةِ ۗ",
      "en": "(of) [the] Resurrection",
      "tr": "l-qiyāmati"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "تُخْلِفُ",
      "im": "تُخْلِفُ",
      "en": "break",
      "tr": "tukh'lifu"
    },
    {
      "ar": "ٱلْمِيعَادَ",
      "im": "الْمِيعَادَ",
      "en": "the promise",
      "tr": "l-mīʿāda"
    }
  ],
  "5:25": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "لَآ",
      "im": "لَا",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "أَمْلِكُ",
      "im": "أَمْلِكُ",
      "en": "(have) power",
      "tr": "amliku"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "نَفْسِى",
      "im": "نَفْسِي",
      "en": "(over) myself",
      "tr": "nafsī"
    },
    {
      "ar": "وَأَخِى ۖ",
      "im": "وَأَخِي ۖ",
      "en": "and my brother",
      "tr": "wa-akhī"
    },
    {
      "ar": "فَٱفْرُقْ",
      "im": "فَافْرُقْ",
      "en": "so (make a) separation",
      "tr": "fa-uf'ruq"
    },
    {
      "ar": "بَيْنَنَا",
      "im": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَ",
      "im": "وَبَيْنَ",
      "en": "and between",
      "tr": "wabayna"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْفَـٰسِقِينَ",
      "im": "الْفَاسِقِينَ",
      "en": "(the) defiantly disobedient",
      "tr": "l-fāsiqīna"
    }
  ],
  "5:83": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "سَمِعُوا۟",
      "im": "سَمِعُوا",
      "en": "they listen",
      "tr": "samiʿū"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "(to) what",
      "tr": "mā"
    },
    {
      "ar": "أُنزِلَ",
      "im": "أُنزِلَ",
      "en": "has been revealed",
      "tr": "unzila"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلرَّسُولِ",
      "im": "الرَّسُولِ",
      "en": "the Messenger",
      "tr": "l-rasūli"
    },
    {
      "ar": "تَرَىٰٓ",
      "im": "تَرَىٰ",
      "en": "you see",
      "tr": "tarā"
    },
    {
      "ar": "أَعْيُنَهُمْ",
      "im": "أَعْيُنَهُمْ",
      "en": "their eyes",
      "tr": "aʿyunahum"
    },
    {
      "ar": "تَفِيضُ",
      "im": "تَفِيضُ",
      "en": "overflowing",
      "tr": "tafīḍu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلدَّمْعِ",
      "im": "الدَّمْعِ",
      "en": "the tears",
      "tr": "l-damʿi"
    },
    {
      "ar": "مِمَّا",
      "im": "مِمَّا",
      "en": "for what",
      "tr": "mimmā"
    },
    {
      "ar": "عَرَفُوا۟",
      "im": "عَرَفُوا",
      "en": "they recognized",
      "tr": "ʿarafū"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَقِّ ۖ",
      "im": "الْحَقِّ ۖ",
      "en": "the truth",
      "tr": "l-ḥaqi"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "They say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "we have believed",
      "tr": "āmannā"
    },
    {
      "ar": "فَٱكْتُبْنَا",
      "im": "فَاكْتُبْنَا",
      "en": "so write us",
      "tr": "fa-uk'tub'nā"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلشَّـٰهِدِينَ",
      "im": "الشَّاهِدِينَ",
      "en": "the witnesses",
      "tr": "l-shāhidīna"
    }
  ],
  "5:84": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us (that)",
      "tr": "lanā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "نُؤْمِنُ",
      "im": "نُؤْمِنُ",
      "en": "we believe",
      "tr": "nu'minu"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "جَآءَنَا",
      "im": "جَاءَنَا",
      "en": "came (to) us",
      "tr": "jāanā"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْحَقِّ",
      "im": "الْحَقِّ",
      "en": "the truth",
      "tr": "l-ḥaqi"
    },
    {
      "ar": "وَنَطْمَعُ",
      "im": "وَنَطْمَعُ",
      "en": "And we hope",
      "tr": "wanaṭmaʿu"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يُدْخِلَنَا",
      "im": "يُدْخِلَنَا",
      "en": "will admit us",
      "tr": "yud'khilanā"
    },
    {
      "ar": "رَبُّنَا",
      "im": "رَبُّنَا",
      "en": "our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "im": "الصَّالِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "5:114": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "عِيسَى",
      "im": "عِيسَى",
      "en": "Isa",
      "tr": "ʿīsā"
    },
    {
      "ar": "ٱبْنُ",
      "im": "ابْنُ",
      "en": "son",
      "tr": "ub'nu"
    },
    {
      "ar": "مَرْيَمَ",
      "im": "مَرْيَمَ",
      "en": "(of) Maryam",
      "tr": "maryama"
    },
    {
      "ar": "ٱللَّهُمَّ",
      "im": "اللَّهُمَّ",
      "en": "O Allah",
      "tr": "l-lahuma"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَنزِلْ",
      "im": "أَنزِلْ",
      "en": "send down",
      "tr": "anzil"
    },
    {
      "ar": "عَلَيْنَا",
      "im": "عَلَيْنَا",
      "en": "to us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "مَآئِدَةًۭ",
      "im": "مَائِدَةً",
      "en": "a table spread",
      "tr": "māidatan"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلسَّمَآءِ",
      "im": "السَّمَاءِ",
      "en": "the heaven",
      "tr": "l-samāi"
    },
    {
      "ar": "تَكُونُ",
      "im": "تَكُونُ",
      "en": "to be",
      "tr": "takūnu"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "عِيدًۭا",
      "im": "عِيدًا",
      "en": "a festival",
      "tr": "ʿīdan"
    },
    {
      "ar": "لِّأَوَّلِنَا",
      "im": "لِّأَوَّلِنَا",
      "en": "for first of us",
      "tr": "li-awwalinā"
    },
    {
      "ar": "وَءَاخِرِنَا",
      "im": "وَآخِرِنَا",
      "en": "and last of us",
      "tr": "waākhirinā"
    },
    {
      "ar": "وَءَايَةًۭ",
      "im": "وَآيَةً",
      "en": "and a sign",
      "tr": "waāyatan"
    },
    {
      "ar": "مِّنكَ ۖ",
      "im": "مِّنكَ ۖ",
      "en": "from You",
      "tr": "minka"
    },
    {
      "ar": "وَٱرْزُقْنَا",
      "im": "وَارْزُقْنَا",
      "en": "And provide us",
      "tr": "wa-ur'zuq'nā"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are) best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلرَّٰزِقِينَ",
      "im": "الرَّازِقِينَ",
      "en": "(of) the providers",
      "tr": "l-rāziqīna"
    }
  ],
  "5:118": [
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "If",
      "tr": "in"
    },
    {
      "ar": "تُعَذِّبْهُمْ",
      "im": "تُعَذِّبْهُمْ",
      "en": "You punish them",
      "tr": "tuʿadhib'hum"
    },
    {
      "ar": "فَإِنَّهُمْ",
      "im": "فَإِنَّهُمْ",
      "en": "then indeed they",
      "tr": "fa-innahum"
    },
    {
      "ar": "عِبَادُكَ ۖ",
      "im": "عِبَادُكَ ۖ",
      "en": "(are) Your slaves",
      "tr": "ʿibāduka"
    },
    {
      "ar": "وَإِن",
      "im": "وَإِن",
      "en": "and if",
      "tr": "wa-in"
    },
    {
      "ar": "تَغْفِرْ",
      "im": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "[for] them",
      "tr": "lahum"
    },
    {
      "ar": "فَإِنَّكَ",
      "im": "فَإِنَّكَ",
      "en": "then indeed You",
      "tr": "fa-innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "im": "الْعَزِيزُ",
      "en": "(are) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "6:79": [
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "وَجَّهْتُ",
      "im": "وَجَّهْتُ",
      "en": "[I] have turned",
      "tr": "wajjahtu"
    },
    {
      "ar": "وَجْهِىَ",
      "im": "وَجْهِيَ",
      "en": "my face",
      "tr": "wajhiya"
    },
    {
      "ar": "لِلَّذِى",
      "im": "لِلَّذِي",
      "en": "to the One Who",
      "tr": "lilladhī"
    },
    {
      "ar": "فَطَرَ",
      "im": "فَطَرَ",
      "en": "created",
      "tr": "faṭara"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضَ",
      "im": "وَالْأَرْضَ",
      "en": "and the earth",
      "tr": "wal-arḍa"
    },
    {
      "ar": "حَنِيفًۭا ۖ",
      "im": "حَنِيفًا ۖ",
      "en": "(as) a true monotheist",
      "tr": "ḥanīfan"
    },
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "أَنَا۠",
      "im": "أَنَا",
      "en": "I (am)",
      "tr": "anā"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُشْرِكِينَ",
      "im": "الْمُشْرِكِينَ",
      "en": "the polytheists",
      "tr": "l-mush'rikīna"
    }
  ],
  "6:86": [
    {
      "ar": "وَإِسْمَـٰعِيلَ",
      "im": "وَإِسْمَاعِيلَ",
      "en": "And Ishmael",
      "tr": "wa-is'māʿīla"
    },
    {
      "ar": "وَٱلْيَسَعَ",
      "im": "وَالْيَسَعَ",
      "en": "and Elisha",
      "tr": "wal-yasaʿa"
    },
    {
      "ar": "وَيُونُسَ",
      "im": "وَيُونُسَ",
      "en": "and Yunus",
      "tr": "wayūnusa"
    },
    {
      "ar": "وَلُوطًۭا ۚ",
      "im": "وَلُوطًا ۚ",
      "en": "and Lut",
      "tr": "walūṭan"
    },
    {
      "ar": "وَكُلًّۭا",
      "im": "وَكُلًّا",
      "en": "and all",
      "tr": "wakullan"
    },
    {
      "ar": "فَضَّلْنَا",
      "im": "فَضَّلْنَا",
      "en": "We preferred",
      "tr": "faḍḍalnā"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "6:162": [
    {
      "ar": "قُلْ",
      "im": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "صَلَاتِى",
      "im": "صَلَاتِي",
      "en": "my prayer",
      "tr": "ṣalātī"
    },
    {
      "ar": "وَنُسُكِى",
      "im": "وَنُسُكِي",
      "en": "and my rites of sacrifice",
      "tr": "wanusukī"
    },
    {
      "ar": "وَمَحْيَاىَ",
      "im": "وَمَحْيَايَ",
      "en": "and my living",
      "tr": "wamaḥyāya"
    },
    {
      "ar": "وَمَمَاتِى",
      "im": "وَمَمَاتِي",
      "en": "and my dying",
      "tr": "wamamātī"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "(are) for Allah",
      "tr": "lillahi"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "7:23": [
    {
      "ar": "قَالَا",
      "im": "قَالَا",
      "en": "Both of them said",
      "tr": "qālā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ظَلَمْنَآ",
      "im": "ظَلَمْنَا",
      "en": "we have wronged",
      "tr": "ẓalamnā"
    },
    {
      "ar": "أَنفُسَنَا",
      "im": "أَنفُسَنَا",
      "en": "ourselves",
      "tr": "anfusanā"
    },
    {
      "ar": "وَإِن",
      "im": "وَإِن",
      "en": "and if",
      "tr": "wa-in"
    },
    {
      "ar": "لَّمْ",
      "im": "لَّمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "تَغْفِرْ",
      "im": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "[for] us",
      "tr": "lanā"
    },
    {
      "ar": "وَتَرْحَمْنَا",
      "im": "وَتَرْحَمْنَا",
      "en": "and have mercy (on) us",
      "tr": "watarḥamnā"
    },
    {
      "ar": "لَنَكُونَنَّ",
      "im": "لَنَكُونَنَّ",
      "en": "surely, we will be",
      "tr": "lanakūnanna"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَـٰسِرِينَ",
      "im": "الْخَاسِرِينَ",
      "en": "the losers",
      "tr": "l-khāsirīna"
    }
  ],
  "7:43": [
    {
      "ar": "وَنَزَعْنَا",
      "im": "وَنَزَعْنَا",
      "en": "And We will remove",
      "tr": "wanazaʿnā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "whatever",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "صُدُورِهِم",
      "im": "صُدُورِهِم",
      "en": "their breasts",
      "tr": "ṣudūrihim"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "غِلٍّۢ",
      "im": "غِلٍّ",
      "en": "malice",
      "tr": "ghillin"
    },
    {
      "ar": "تَجْرِى",
      "im": "تَجْرِي",
      "en": "Flows",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهِمُ",
      "im": "تَحْتِهِمُ",
      "en": "underneath them",
      "tr": "taḥtihimu"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ ۖ",
      "im": "الْأَنْهَارُ ۖ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "وَقَالُوا۟",
      "im": "وَقَالُوا",
      "en": "And they will say",
      "tr": "waqālū"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "im": "الْحَمْدُ",
      "en": "All the praise",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "(is) for Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "هَدَىٰنَا",
      "im": "هَدَانَا",
      "en": "guided us",
      "tr": "hadānā"
    },
    {
      "ar": "لِهَـٰذَا",
      "im": "لِهَٰذَا",
      "en": "to this",
      "tr": "lihādhā"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "كُنَّا",
      "im": "كُنَّا",
      "en": "we were",
      "tr": "kunnā"
    },
    {
      "ar": "لِنَهْتَدِىَ",
      "im": "لِنَهْتَدِيَ",
      "en": "to receive guidance",
      "tr": "linahtadiya"
    },
    {
      "ar": "لَوْلَآ",
      "im": "لَوْلَا",
      "en": "if not",
      "tr": "lawlā"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "هَدَىٰنَا",
      "im": "هَدَانَا",
      "en": "(had) guided us",
      "tr": "hadānā"
    },
    {
      "ar": "ٱللَّهُ ۖ",
      "im": "اللَّهُ ۖ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "لَقَدْ",
      "im": "لَقَدْ",
      "en": "Certainly",
      "tr": "laqad"
    },
    {
      "ar": "جَآءَتْ",
      "im": "جَاءَتْ",
      "en": "came",
      "tr": "jāat"
    },
    {
      "ar": "رُسُلُ",
      "im": "رُسُلُ",
      "en": "Messengers",
      "tr": "rusulu"
    },
    {
      "ar": "رَبِّنَا",
      "im": "رَبِّنَا",
      "en": "(of) our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "بِٱلْحَقِّ ۖ",
      "im": "بِالْحَقِّ ۖ",
      "en": "with the truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَنُودُوٓا۟",
      "im": "وَنُودُوا",
      "en": "And they will be addressed",
      "tr": "wanūdū"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "تِلْكُمُ",
      "im": "تِلْكُمُ",
      "en": "This",
      "tr": "til'kumu"
    },
    {
      "ar": "ٱلْجَنَّةُ",
      "im": "الْجَنَّةُ",
      "en": "(is) Paradise",
      "tr": "l-janatu"
    },
    {
      "ar": "أُورِثْتُمُوهَا",
      "im": "أُورِثْتُمُوهَا",
      "en": "you have been made to inherit it",
      "tr": "ūrith'tumūhā"
    },
    {
      "ar": "بِمَا",
      "im": "بِمَا",
      "en": "for what",
      "tr": "bimā"
    },
    {
      "ar": "كُنتُمْ",
      "im": "كُنتُمْ",
      "en": "you used to",
      "tr": "kuntum"
    },
    {
      "ar": "تَعْمَلُونَ",
      "im": "تَعْمَلُونَ",
      "en": "do",
      "tr": "taʿmalūna"
    }
  ],
  "7:89": [
    {
      "ar": "قَدِ",
      "im": "قَدِ",
      "en": "Verily",
      "tr": "qadi"
    },
    {
      "ar": "ٱفْتَرَيْنَا",
      "im": "افْتَرَيْنَا",
      "en": "we would have fabricated",
      "tr": "if'taraynā"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "كَذِبًا",
      "im": "كَذِبًا",
      "en": "a lie",
      "tr": "kadhiban"
    },
    {
      "ar": "إِنْ",
      "im": "إِنْ",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "عُدْنَا",
      "im": "عُدْنَا",
      "en": "we returned",
      "tr": "ʿud'nā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "مِلَّتِكُم",
      "im": "مِلَّتِكُم",
      "en": "your religion",
      "tr": "millatikum"
    },
    {
      "ar": "بَعْدَ",
      "im": "بَعْدَ",
      "en": "after",
      "tr": "baʿda"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "[when]",
      "tr": "idh"
    },
    {
      "ar": "نَجَّىٰنَا",
      "im": "نَجَّانَا",
      "en": "saved us",
      "tr": "najjānā"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "مِنْهَا ۚ",
      "im": "مِنْهَا ۚ",
      "en": "from it",
      "tr": "min'hā"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يَكُونُ",
      "im": "يَكُونُ",
      "en": "it is",
      "tr": "yakūnu"
    },
    {
      "ar": "لَنَآ",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "نَّعُودَ",
      "im": "نَّعُودَ",
      "en": "we return",
      "tr": "naʿūda"
    },
    {
      "ar": "فِيهَآ",
      "im": "فِيهَا",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يَشَآءَ",
      "im": "يَشَاءَ",
      "en": "wills",
      "tr": "yashāa"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "رَبُّنَا ۚ",
      "im": "رَبُّنَا ۚ",
      "en": "our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "وَسِعَ",
      "im": "وَسِعَ",
      "en": "Encompasses",
      "tr": "wasiʿa"
    },
    {
      "ar": "رَبُّنَا",
      "im": "رَبُّنَا",
      "en": "(by) Our Lord",
      "tr": "rabbunā"
    },
    {
      "ar": "كُلَّ",
      "im": "كُلَّ",
      "en": "every",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "عِلْمًا ۚ",
      "im": "عِلْمًا ۚ",
      "en": "(in) knowledge",
      "tr": "ʿil'man"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "Upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوَكَّلْنَا ۚ",
      "im": "تَوَكَّلْنَا ۚ",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱفْتَحْ",
      "im": "افْتَحْ",
      "en": "Decide",
      "tr": "if'taḥ"
    },
    {
      "ar": "بَيْنَنَا",
      "im": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَ",
      "im": "وَبَيْنَ",
      "en": "and between",
      "tr": "wabayna"
    },
    {
      "ar": "قَوْمِنَا",
      "im": "قَوْمِنَا",
      "en": "our people",
      "tr": "qawminā"
    },
    {
      "ar": "بِٱلْحَقِّ",
      "im": "بِالْحَقِّ",
      "en": "in truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are the) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْفَـٰتِحِينَ",
      "im": "الْفَاتِحِينَ",
      "en": "(of) those who Decide",
      "tr": "l-fātiḥīna"
    }
  ],
  "7:117": [
    {
      "ar": "۞ وَأَوْحَيْنَآ",
      "im": "۞ وَأَوْحَيْنَا",
      "en": "And We inspired",
      "tr": "wa-awḥaynā"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "مُوسَىٰٓ",
      "im": "مُوسَىٰ",
      "en": "Musa",
      "tr": "mūsā"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَلْقِ",
      "im": "أَلْقِ",
      "en": "Throw",
      "tr": "alqi"
    },
    {
      "ar": "عَصَاكَ ۖ",
      "im": "عَصَاكَ ۖ",
      "en": "your staff",
      "tr": "ʿaṣāka"
    },
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "and suddenly",
      "tr": "fa-idhā"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it",
      "tr": "hiya"
    },
    {
      "ar": "تَلْقَفُ",
      "im": "تَلْقَفُ",
      "en": "swallow(ed)",
      "tr": "talqafu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَأْفِكُونَ",
      "im": "يَأْفِكُونَ",
      "en": "they (were) falsifying",
      "tr": "yafikūna"
    }
  ],
  "7:118": [
    {
      "ar": "فَوَقَعَ",
      "im": "فَوَقَعَ",
      "en": "So was established",
      "tr": "fawaqaʿa"
    },
    {
      "ar": "ٱلْحَقُّ",
      "im": "الْحَقُّ",
      "en": "the truth",
      "tr": "l-ḥaqu"
    },
    {
      "ar": "وَبَطَلَ",
      "im": "وَبَطَلَ",
      "en": "and became futile",
      "tr": "wabaṭala"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "they used to",
      "tr": "kānū"
    },
    {
      "ar": "يَعْمَلُونَ",
      "im": "يَعْمَلُونَ",
      "en": "do",
      "tr": "yaʿmalūna"
    }
  ],
  "7:119": [
    {
      "ar": "فَغُلِبُوا۟",
      "im": "فَغُلِبُوا",
      "en": "So they were defeated",
      "tr": "faghulibū"
    },
    {
      "ar": "هُنَالِكَ",
      "im": "هُنَالِكَ",
      "en": "there",
      "tr": "hunālika"
    },
    {
      "ar": "وَٱنقَلَبُوا۟",
      "im": "وَانقَلَبُوا",
      "en": "and returned",
      "tr": "wa-inqalabū"
    },
    {
      "ar": "صَـٰغِرِينَ",
      "im": "صَاغِرِينَ",
      "en": "humiliated",
      "tr": "ṣāghirīna"
    }
  ],
  "7:120": [
    {
      "ar": "وَأُلْقِىَ",
      "im": "وَأُلْقِيَ",
      "en": "And fell down",
      "tr": "wa-ul'qiya"
    },
    {
      "ar": "ٱلسَّحَرَةُ",
      "im": "السَّحَرَةُ",
      "en": "the magicians",
      "tr": "l-saḥaratu"
    },
    {
      "ar": "سَـٰجِدِينَ",
      "im": "سَاجِدِينَ",
      "en": "prostrate",
      "tr": "sājidīna"
    }
  ],
  "7:121": [
    {
      "ar": "قَالُوٓا۟",
      "im": "قَالُوا",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "We believe",
      "tr": "āmannā"
    },
    {
      "ar": "بِرَبِّ",
      "im": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "7:122": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "Lord",
      "tr": "rabbi"
    },
    {
      "ar": "مُوسَىٰ",
      "im": "مُوسَىٰ",
      "en": "(of) Musa",
      "tr": "mūsā"
    },
    {
      "ar": "وَهَـٰرُونَ",
      "im": "وَهَارُونَ",
      "en": "and Harun",
      "tr": "wahārūna"
    }
  ],
  "7:126": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَنقِمُ",
      "im": "تَنقِمُ",
      "en": "you take revenge",
      "tr": "tanqimu"
    },
    {
      "ar": "مِنَّآ",
      "im": "مِنَّا",
      "en": "from us",
      "tr": "minnā"
    },
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "ءَامَنَّا",
      "im": "آمَنَّا",
      "en": "we believed",
      "tr": "āmannā"
    },
    {
      "ar": "بِـَٔايَـٰتِ",
      "im": "بِآيَاتِ",
      "en": "in (the) Signs",
      "tr": "biāyāti"
    },
    {
      "ar": "رَبِّنَا",
      "im": "رَبِّنَا",
      "en": "(of) our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "لَمَّا",
      "im": "لَمَّا",
      "en": "when",
      "tr": "lammā"
    },
    {
      "ar": "جَآءَتْنَا ۚ",
      "im": "جَاءَتْنَا ۚ",
      "en": "they came to us",
      "tr": "jāatnā"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَفْرِغْ",
      "im": "أَفْرِغْ",
      "en": "Pour",
      "tr": "afrigh"
    },
    {
      "ar": "عَلَيْنَا",
      "im": "عَلَيْنَا",
      "en": "upon us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "صَبْرًۭا",
      "im": "صَبْرًا",
      "en": "patience",
      "tr": "ṣabran"
    },
    {
      "ar": "وَتَوَفَّنَا",
      "im": "وَتَوَفَّنَا",
      "en": "and cause us to die",
      "tr": "watawaffanā"
    },
    {
      "ar": "مُسْلِمِينَ",
      "im": "مُسْلِمِينَ",
      "en": "(as) Muslims",
      "tr": "mus'limīna"
    }
  ],
  "7:151": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "im": "اغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِأَخِى",
      "im": "وَلِأَخِي",
      "en": "and my brother",
      "tr": "wali-akhī"
    },
    {
      "ar": "وَأَدْخِلْنَا",
      "im": "وَأَدْخِلْنَا",
      "en": "and admit us",
      "tr": "wa-adkhil'nā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "into",
      "tr": "fī"
    },
    {
      "ar": "رَحْمَتِكَ ۖ",
      "im": "رَحْمَتِكَ ۖ",
      "en": "Your Mercy",
      "tr": "raḥmatika"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "for You",
      "tr": "wa-anta"
    },
    {
      "ar": "أَرْحَمُ",
      "im": "أَرْحَمُ",
      "en": "(are) the Most Merciful",
      "tr": "arḥamu"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "im": "الرَّاحِمِينَ",
      "en": "(of) the merciful",
      "tr": "l-rāḥimīna"
    }
  ],
  "7:155": [
    {
      "ar": "وَٱخْتَارَ",
      "im": "وَاخْتَارَ",
      "en": "And chose",
      "tr": "wa-ikh'tāra"
    },
    {
      "ar": "مُوسَىٰ",
      "im": "مُوسَىٰ",
      "en": "Musa",
      "tr": "mūsā"
    },
    {
      "ar": "قَوْمَهُۥ",
      "im": "قَوْمَهُ",
      "en": "(from) his people",
      "tr": "qawmahu"
    },
    {
      "ar": "سَبْعِينَ",
      "im": "سَبْعِينَ",
      "en": "seventy",
      "tr": "sabʿīna"
    },
    {
      "ar": "رَجُلًۭا",
      "im": "رَجُلًا",
      "en": "men",
      "tr": "rajulan"
    },
    {
      "ar": "لِّمِيقَـٰتِنَا ۖ",
      "im": "لِّمِيقَاتِنَا ۖ",
      "en": "for Our appointment",
      "tr": "limīqātinā"
    },
    {
      "ar": "فَلَمَّآ",
      "im": "فَلَمَّا",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَخَذَتْهُمُ",
      "im": "أَخَذَتْهُمُ",
      "en": "seized them",
      "tr": "akhadhathumu"
    },
    {
      "ar": "ٱلرَّجْفَةُ",
      "im": "الرَّجْفَةُ",
      "en": "the earthquake",
      "tr": "l-rajfatu"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "لَوْ",
      "im": "لَوْ",
      "en": "If",
      "tr": "law"
    },
    {
      "ar": "شِئْتَ",
      "im": "شِئْتَ",
      "en": "you (had) willed",
      "tr": "shi'ta"
    },
    {
      "ar": "أَهْلَكْتَهُم",
      "im": "أَهْلَكْتَهُم",
      "en": "You (could) have destroyed them",
      "tr": "ahlaktahum"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "im": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "وَإِيَّـٰىَ ۖ",
      "im": "وَإِيَّايَ ۖ",
      "en": "and me",
      "tr": "wa-iyyāya"
    },
    {
      "ar": "أَتُهْلِكُنَا",
      "im": "أَتُهْلِكُنَا",
      "en": "Would You destroy us",
      "tr": "atuh'likunā"
    },
    {
      "ar": "بِمَا",
      "im": "بِمَا",
      "en": "for what",
      "tr": "bimā"
    },
    {
      "ar": "فَعَلَ",
      "im": "فَعَلَ",
      "en": "did",
      "tr": "faʿala"
    },
    {
      "ar": "ٱلسُّفَهَآءُ",
      "im": "السُّفَهَاءُ",
      "en": "the foolish",
      "tr": "l-sufahāu"
    },
    {
      "ar": "مِنَّآ ۖ",
      "im": "مِنَّا ۖ",
      "en": "among us",
      "tr": "minnā"
    },
    {
      "ar": "إِنْ",
      "im": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it (was)",
      "tr": "hiya"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "فِتْنَتُكَ",
      "im": "فِتْنَتُكَ",
      "en": "Your trial",
      "tr": "fit'natuka"
    },
    {
      "ar": "تُضِلُّ",
      "im": "تُضِلُّ",
      "en": "You let go astray",
      "tr": "tuḍillu"
    },
    {
      "ar": "بِهَا",
      "im": "بِهَا",
      "en": "by it",
      "tr": "bihā"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ",
      "im": "تَشَاءُ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "وَتَهْدِى",
      "im": "وَتَهْدِي",
      "en": "and You guide",
      "tr": "watahdī"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "تَشَآءُ ۖ",
      "im": "تَشَاءُ ۖ",
      "en": "You will",
      "tr": "tashāu"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "وَلِيُّنَا",
      "im": "وَلِيُّنَا",
      "en": "(are) our Protector",
      "tr": "waliyyunā"
    },
    {
      "ar": "فَٱغْفِرْ",
      "im": "فَاغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "وَٱرْحَمْنَا ۖ",
      "im": "وَارْحَمْنَا ۖ",
      "en": "and have mercy upon us",
      "tr": "wa-ir'ḥamnā"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْغَـٰفِرِينَ",
      "im": "الْغَافِرِينَ",
      "en": "(of) Forgivers",
      "tr": "l-ghāfirīna"
    }
  ],
  "7:156": [
    {
      "ar": "۞ وَٱكْتُبْ",
      "im": "۞ وَاكْتُبْ",
      "en": "And ordain",
      "tr": "wa-uk'tub"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "هَـٰذِهِ",
      "im": "هَٰذِهِ",
      "en": "this",
      "tr": "hādhihi"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "im": "الدُّنْيَا",
      "en": "[the] world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "حَسَنَةًۭ",
      "im": "حَسَنَةً",
      "en": "good",
      "tr": "ḥasanatan"
    },
    {
      "ar": "وَفِى",
      "im": "وَفِي",
      "en": "and in",
      "tr": "wafī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "im": "الْآخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "هُدْنَآ",
      "im": "هُدْنَا",
      "en": "we have turned",
      "tr": "hud'nā"
    },
    {
      "ar": "إِلَيْكَ ۚ",
      "im": "إِلَيْكَ ۚ",
      "en": "to You",
      "tr": "ilayka"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "عَذَابِىٓ",
      "im": "عَذَابِي",
      "en": "My punishment",
      "tr": "ʿadhābī"
    },
    {
      "ar": "أُصِيبُ",
      "im": "أُصِيبُ",
      "en": "I afflict",
      "tr": "uṣību"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "whom",
      "tr": "man"
    },
    {
      "ar": "أَشَآءُ ۖ",
      "im": "أَشَاءُ ۖ",
      "en": "I will",
      "tr": "ashāu"
    },
    {
      "ar": "وَرَحْمَتِى",
      "im": "وَرَحْمَتِي",
      "en": "but My Mercy",
      "tr": "waraḥmatī"
    },
    {
      "ar": "وَسِعَتْ",
      "im": "وَسِعَتْ",
      "en": "encompasses",
      "tr": "wasiʿat"
    },
    {
      "ar": "كُلَّ",
      "im": "كُلَّ",
      "en": "every",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍۢ ۚ",
      "im": "شَيْءٍ ۚ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "فَسَأَكْتُبُهَا",
      "im": "فَسَأَكْتُبُهَا",
      "en": "So I will ordain it",
      "tr": "fasa-aktubuhā"
    },
    {
      "ar": "لِلَّذِينَ",
      "im": "لِلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "يَتَّقُونَ",
      "im": "يَتَّقُونَ",
      "en": "(are) righteous",
      "tr": "yattaqūna"
    },
    {
      "ar": "وَيُؤْتُونَ",
      "im": "وَيُؤْتُونَ",
      "en": "and give",
      "tr": "wayu'tūna"
    },
    {
      "ar": "ٱلزَّكَوٰةَ",
      "im": "الزَّكَاةَ",
      "en": "zakah",
      "tr": "l-zakata"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "and those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "هُم",
      "im": "هُم",
      "en": "[they]",
      "tr": "hum"
    },
    {
      "ar": "بِـَٔايَـٰتِنَا",
      "im": "بِآيَاتِنَا",
      "en": "in Our Verses",
      "tr": "biāyātinā"
    },
    {
      "ar": "يُؤْمِنُونَ",
      "im": "يُؤْمِنُونَ",
      "en": "they believe",
      "tr": "yu'minūna"
    }
  ],
  "10:57": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "im": "يَا أَيُّهَا",
      "en": "O mankind",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلنَّاسُ",
      "im": "النَّاسُ",
      "en": "O mankind",
      "tr": "l-nāsu"
    },
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "Verily",
      "tr": "qad"
    },
    {
      "ar": "جَآءَتْكُم",
      "im": "جَاءَتْكُم",
      "en": "has come to you",
      "tr": "jāatkum"
    },
    {
      "ar": "مَّوْعِظَةٌۭ",
      "im": "مَّوْعِظَةٌ",
      "en": "an instruction",
      "tr": "mawʿiẓatun"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّكُمْ",
      "im": "رَّبِّكُمْ",
      "en": "your Lord",
      "tr": "rabbikum"
    },
    {
      "ar": "وَشِفَآءٌۭ",
      "im": "وَشِفَاءٌ",
      "en": "and a healing",
      "tr": "washifāon"
    },
    {
      "ar": "لِّمَا",
      "im": "لِّمَا",
      "en": "for what",
      "tr": "limā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلصُّدُورِ",
      "im": "الصُّدُورِ",
      "en": "your breasts",
      "tr": "l-ṣudūri"
    },
    {
      "ar": "وَهُدًۭى",
      "im": "وَهُدًى",
      "en": "and guidance",
      "tr": "wahudan"
    },
    {
      "ar": "وَرَحْمَةٌۭ",
      "im": "وَرَحْمَةٌ",
      "en": "and mercy",
      "tr": "waraḥmatun"
    },
    {
      "ar": "لِّلْمُؤْمِنِينَ",
      "im": "لِّلْمُؤْمِنِينَ",
      "en": "for the believers",
      "tr": "lil'mu'minīna"
    }
  ],
  "10:81": [
    {
      "ar": "فَلَمَّآ",
      "im": "فَلَمَّا",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَلْقَوْا۟",
      "im": "أَلْقَوْا",
      "en": "they (had) thrown",
      "tr": "alqaw"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "Musa said",
      "tr": "qāla"
    },
    {
      "ar": "مُوسَىٰ",
      "im": "مُوسَىٰ",
      "en": "Musa said",
      "tr": "mūsā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "What",
      "tr": "mā"
    },
    {
      "ar": "جِئْتُم",
      "im": "جِئْتُم",
      "en": "you have brought",
      "tr": "ji'tum"
    },
    {
      "ar": "بِهِ",
      "im": "بِهِ",
      "en": "[it]",
      "tr": "bihi"
    },
    {
      "ar": "ٱلسِّحْرُ ۖ",
      "im": "السِّحْرُ ۖ",
      "en": "(is) the magic",
      "tr": "l-siḥ'ru"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "سَيُبْطِلُهُۥٓ ۖ",
      "im": "سَيُبْطِلُهُ ۖ",
      "en": "will nullify it",
      "tr": "sayub'ṭiluhu"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(does) not",
      "tr": "lā"
    },
    {
      "ar": "يُصْلِحُ",
      "im": "يُصْلِحُ",
      "en": "amend",
      "tr": "yuṣ'liḥu"
    },
    {
      "ar": "عَمَلَ",
      "im": "عَمَلَ",
      "en": "the work",
      "tr": "ʿamala"
    },
    {
      "ar": "ٱلْمُفْسِدِينَ",
      "im": "الْمُفْسِدِينَ",
      "en": "(of) the corrupters",
      "tr": "l-muf'sidīna"
    }
  ],
  "10:82": [
    {
      "ar": "وَيُحِقُّ",
      "im": "وَيُحِقُّ",
      "en": "And Allah will establish",
      "tr": "wayuḥiqqu"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "And Allah will establish",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلْحَقَّ",
      "im": "الْحَقَّ",
      "en": "the truth",
      "tr": "l-ḥaqa"
    },
    {
      "ar": "بِكَلِمَـٰتِهِۦ",
      "im": "بِكَلِمَاتِهِ",
      "en": "by His words",
      "tr": "bikalimātihi"
    },
    {
      "ar": "وَلَوْ",
      "im": "وَلَوْ",
      "en": "even if",
      "tr": "walaw"
    },
    {
      "ar": "كَرِهَ",
      "im": "كَرِهَ",
      "en": "dislike it",
      "tr": "kariha"
    },
    {
      "ar": "ٱلْمُجْرِمُونَ",
      "im": "الْمُجْرِمُونَ",
      "en": "the criminals",
      "tr": "l-muj'rimūna"
    }
  ],
  "10:85": [
    {
      "ar": "فَقَالُوا۟",
      "im": "فَقَالُوا",
      "en": "Then they said",
      "tr": "faqālū"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "Upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوَكَّلْنَا",
      "im": "تَوَكَّلْنَا",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَجْعَلْنَا",
      "im": "تَجْعَلْنَا",
      "en": "make us",
      "tr": "tajʿalnā"
    },
    {
      "ar": "فِتْنَةًۭ",
      "im": "فِتْنَةً",
      "en": "a trial",
      "tr": "fit'natan"
    },
    {
      "ar": "لِّلْقَوْمِ",
      "im": "لِّلْقَوْمِ",
      "en": "for the people",
      "tr": "lil'qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "10:86": [
    {
      "ar": "وَنَجِّنَا",
      "im": "وَنَجِّنَا",
      "en": "And save us",
      "tr": "wanajjinā"
    },
    {
      "ar": "بِرَحْمَتِكَ",
      "im": "بِرَحْمَتِكَ",
      "en": "by Your Mercy",
      "tr": "biraḥmatika"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "im": "الْكَافِرِينَ",
      "en": "the disbelievers",
      "tr": "l-kāfirīna"
    }
  ],
  "11:41": [
    {
      "ar": "۞ وَقَالَ",
      "im": "۞ وَقَالَ",
      "en": "And he said",
      "tr": "waqāla"
    },
    {
      "ar": "ٱرْكَبُوا۟",
      "im": "ارْكَبُوا",
      "en": "Embark",
      "tr": "ir'kabū"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "بِسْمِ",
      "im": "بِسْمِ",
      "en": "in the name",
      "tr": "bis'mi"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مَجْر۪ىٰهَا",
      "im": "مَجْرَاهَا",
      "en": "(is) its course",
      "tr": "majrahā"
    },
    {
      "ar": "وَمُرْسَىٰهَآ ۚ",
      "im": "وَمُرْسَاهَا ۚ",
      "en": "and its anchorage",
      "tr": "wamur'sāhā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لَغَفُورٌۭ",
      "im": "لَغَفُورٌ",
      "en": "(is) certainly Oft-Forgiving",
      "tr": "laghafūrun"
    },
    {
      "ar": "رَّحِيمٌۭ",
      "im": "رَّحِيمٌ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
    }
  ],
  "11:47": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "O my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّىٓ",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "أَعُوذُ",
      "im": "أَعُوذُ",
      "en": "seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "im": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَسْـَٔلَكَ",
      "im": "أَسْأَلَكَ",
      "en": "I (should) ask You",
      "tr": "asalaka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَيْسَ",
      "im": "لَيْسَ",
      "en": "not",
      "tr": "laysa"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "I have",
      "tr": "lī"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "of it",
      "tr": "bihi"
    },
    {
      "ar": "عِلْمٌۭ ۖ",
      "im": "عِلْمٌ ۖ",
      "en": "knowledge",
      "tr": "ʿil'mun"
    },
    {
      "ar": "وَإِلَّا",
      "im": "وَإِلَّا",
      "en": "And unless",
      "tr": "wa-illā"
    },
    {
      "ar": "تَغْفِرْ",
      "im": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَتَرْحَمْنِىٓ",
      "im": "وَتَرْحَمْنِي",
      "en": "and You have mercy on me",
      "tr": "watarḥamnī"
    },
    {
      "ar": "أَكُن",
      "im": "أَكُن",
      "en": "I will be",
      "tr": "akun"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَـٰسِرِينَ",
      "im": "الْخَاسِرِينَ",
      "en": "the losers",
      "tr": "l-khāsirīna"
    }
  ],
  "11:52": [
    {
      "ar": "وَيَـٰقَوْمِ",
      "im": "وَيَا قَوْمِ",
      "en": "And O my people",
      "tr": "wayāqawmi"
    },
    {
      "ar": "ٱسْتَغْفِرُوا۟",
      "im": "اسْتَغْفِرُوا",
      "en": "Ask forgiveness",
      "tr": "is'taghfirū"
    },
    {
      "ar": "رَبَّكُمْ",
      "im": "رَبَّكُمْ",
      "en": "(of) your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تُوبُوٓا۟",
      "im": "تُوبُوا",
      "en": "turn in repentance",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَيْهِ",
      "im": "إِلَيْهِ",
      "en": "to Him",
      "tr": "ilayhi"
    },
    {
      "ar": "يُرْسِلِ",
      "im": "يُرْسِلِ",
      "en": "He will send",
      "tr": "yur'sili"
    },
    {
      "ar": "ٱلسَّمَآءَ",
      "im": "السَّمَاءَ",
      "en": "(from) the sky (rain)",
      "tr": "l-samāa"
    },
    {
      "ar": "عَلَيْكُم",
      "im": "عَلَيْكُم",
      "en": "upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "مِّدْرَارًۭا",
      "im": "مِّدْرَارًا",
      "en": "(in) abundance",
      "tr": "mid'rāran"
    },
    {
      "ar": "وَيَزِدْكُمْ",
      "im": "وَيَزِدْكُمْ",
      "en": "and increase you",
      "tr": "wayazid'kum"
    },
    {
      "ar": "قُوَّةً",
      "im": "قُوَّةً",
      "en": "(in) strength",
      "tr": "quwwatan"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "(added) to",
      "tr": "ilā"
    },
    {
      "ar": "قُوَّتِكُمْ",
      "im": "قُوَّتِكُمْ",
      "en": "your strength",
      "tr": "quwwatikum"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَتَوَلَّوْا۟",
      "im": "تَتَوَلَّوْا",
      "en": "turn away",
      "tr": "tatawallaw"
    },
    {
      "ar": "مُجْرِمِينَ",
      "im": "مُجْرِمِينَ",
      "en": "(as) criminals",
      "tr": "muj'rimīna"
    }
  ],
  "11:56": [
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "تَوَكَّلْتُ",
      "im": "تَوَكَّلْتُ",
      "en": "[I] put my trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "وَرَبِّكُم ۚ",
      "im": "وَرَبِّكُم ۚ",
      "en": "and your Lord",
      "tr": "warabbikum"
    },
    {
      "ar": "مَّا",
      "im": "مَّا",
      "en": "(There is) not",
      "tr": "mā"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of a moving creature",
      "tr": "min"
    },
    {
      "ar": "دَآبَّةٍ",
      "im": "دَابَّةٍ",
      "en": "of a moving creature",
      "tr": "dābbatin"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ءَاخِذٌۢ",
      "im": "آخِذٌ",
      "en": "has grasp",
      "tr": "ākhidhun"
    },
    {
      "ar": "بِنَاصِيَتِهَآ ۚ",
      "im": "بِنَاصِيَتِهَا ۚ",
      "en": "of its forelock",
      "tr": "bināṣiyatihā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "(is) on",
      "tr": "ʿalā"
    },
    {
      "ar": "صِرَٰطٍۢ",
      "im": "صِرَاطٍ",
      "en": "a path",
      "tr": "ṣirāṭin"
    },
    {
      "ar": "مُّسْتَقِيمٍۢ",
      "im": "مُّسْتَقِيمٍ",
      "en": "straight",
      "tr": "mus'taqīmin"
    }
  ],
  "11:61": [
    {
      "ar": "۞ وَإِلَىٰ",
      "im": "۞ وَإِلَىٰ",
      "en": "And to",
      "tr": "wa-ilā"
    },
    {
      "ar": "ثَمُودَ",
      "im": "ثَمُودَ",
      "en": "Thamud",
      "tr": "thamūda"
    },
    {
      "ar": "أَخَاهُمْ",
      "im": "أَخَاهُمْ",
      "en": "(We sent) their brother",
      "tr": "akhāhum"
    },
    {
      "ar": "صَـٰلِحًۭا ۚ",
      "im": "صَالِحًا ۚ",
      "en": "Salih",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "يَـٰقَوْمِ",
      "im": "يَا قَوْمِ",
      "en": "O my people",
      "tr": "yāqawmi"
    },
    {
      "ar": "ٱعْبُدُوا۟",
      "im": "اعْبُدُوا",
      "en": "Worship",
      "tr": "uʿ'budū"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "لَكُم",
      "im": "لَكُم",
      "en": "you have",
      "tr": "lakum"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "إِلَـٰهٍ",
      "im": "إِلَٰهٍ",
      "en": "god",
      "tr": "ilāhin"
    },
    {
      "ar": "غَيْرُهُۥ ۖ",
      "im": "غَيْرُهُ ۖ",
      "en": "other than Him",
      "tr": "ghayruhu"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "أَنشَأَكُم",
      "im": "أَنشَأَكُم",
      "en": "produced you",
      "tr": "ansha-akum"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "im": "الْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "وَٱسْتَعْمَرَكُمْ",
      "im": "وَاسْتَعْمَرَكُمْ",
      "en": "and settled you",
      "tr": "wa-is'taʿmarakum"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "فَٱسْتَغْفِرُوهُ",
      "im": "فَاسْتَغْفِرُوهُ",
      "en": "So ask forgiveness of Him",
      "tr": "fa-is'taghfirūhu"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تُوبُوٓا۟",
      "im": "تُوبُوا",
      "en": "turn in repentance",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَيْهِ ۚ",
      "im": "إِلَيْهِ ۚ",
      "en": "to Him",
      "tr": "ilayhi"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "قَرِيبٌۭ",
      "im": "قَرِيبٌ",
      "en": "(is) near",
      "tr": "qarībun"
    },
    {
      "ar": "مُّجِيبٌۭ",
      "im": "مُّجِيبٌ",
      "en": "All-Responsive",
      "tr": "mujībun"
    }
  ],
  "11:71": [
    {
      "ar": "وَٱمْرَأَتُهُۥ",
      "im": "وَامْرَأَتُهُ",
      "en": "And his wife",
      "tr": "wa-im'ra-atuhu"
    },
    {
      "ar": "قَآئِمَةٌۭ",
      "im": "قَائِمَةٌ",
      "en": "(was) standing",
      "tr": "qāimatun"
    },
    {
      "ar": "فَضَحِكَتْ",
      "im": "فَضَحِكَتْ",
      "en": "and she laughed",
      "tr": "faḍaḥikat"
    },
    {
      "ar": "فَبَشَّرْنَـٰهَا",
      "im": "فَبَشَّرْنَاهَا",
      "en": "Then We gave her glad tidings",
      "tr": "fabasharnāhā"
    },
    {
      "ar": "بِإِسْحَـٰقَ",
      "im": "بِإِسْحَاقَ",
      "en": "of Isaac",
      "tr": "bi-is'ḥāqa"
    },
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "and after",
      "tr": "wamin"
    },
    {
      "ar": "وَرَآءِ",
      "im": "وَرَاءِ",
      "en": "and after",
      "tr": "warāi"
    },
    {
      "ar": "إِسْحَـٰقَ",
      "im": "إِسْحَاقَ",
      "en": "Isaac",
      "tr": "is'ḥāqa"
    },
    {
      "ar": "يَعْقُوبَ",
      "im": "يَعْقُوبَ",
      "en": "(of) Yaqub",
      "tr": "yaʿqūba"
    }
  ],
  "11:72": [
    {
      "ar": "قَالَتْ",
      "im": "قَالَتْ",
      "en": "She said",
      "tr": "qālat"
    },
    {
      "ar": "يَـٰوَيْلَتَىٰٓ",
      "im": "يَا وَيْلَتَىٰ",
      "en": "Woe to me",
      "tr": "yāwaylatā"
    },
    {
      "ar": "ءَأَلِدُ",
      "im": "أَأَلِدُ",
      "en": "Shall I bear a child",
      "tr": "a-alidu"
    },
    {
      "ar": "وَأَنَا۠",
      "im": "وَأَنَا",
      "en": "while I am",
      "tr": "wa-anā"
    },
    {
      "ar": "عَجُوزٌۭ",
      "im": "عَجُوزٌ",
      "en": "an old woman",
      "tr": "ʿajūzun"
    },
    {
      "ar": "وَهَـٰذَا",
      "im": "وَهَٰذَا",
      "en": "and this",
      "tr": "wahādhā"
    },
    {
      "ar": "بَعْلِى",
      "im": "بَعْلِي",
      "en": "my husband",
      "tr": "baʿlī"
    },
    {
      "ar": "شَيْخًا ۖ",
      "im": "شَيْخًا ۖ",
      "en": "(is) an old man",
      "tr": "shaykhan"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "لَشَىْءٌ",
      "im": "لَشَيْءٌ",
      "en": "(is) surely a thing",
      "tr": "lashayon"
    },
    {
      "ar": "عَجِيبٌۭ",
      "im": "عَجِيبٌ",
      "en": "amazing",
      "tr": "ʿajībun"
    }
  ],
  "11:73": [
    {
      "ar": "قَالُوٓا۟",
      "im": "قَالُوا",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "أَتَعْجَبِينَ",
      "im": "أَتَعْجَبِينَ",
      "en": "Are you amazed",
      "tr": "ataʿjabīna"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "at",
      "tr": "min"
    },
    {
      "ar": "أَمْرِ",
      "im": "أَمْرِ",
      "en": "(the) decree of Allah",
      "tr": "amri"
    },
    {
      "ar": "ٱللَّهِ ۖ",
      "im": "اللَّهِ ۖ",
      "en": "(the) decree of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "رَحْمَتُ",
      "im": "رَحْمَتُ",
      "en": "The Mercy of Allah",
      "tr": "raḥmatu"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "The Mercy of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَبَرَكَـٰتُهُۥ",
      "im": "وَبَرَكَاتُهُ",
      "en": "and His blessings",
      "tr": "wabarakātuhu"
    },
    {
      "ar": "عَلَيْكُمْ",
      "im": "عَلَيْكُمْ",
      "en": "(be) upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "أَهْلَ",
      "im": "أَهْلَ",
      "en": "people",
      "tr": "ahla"
    },
    {
      "ar": "ٱلْبَيْتِ ۚ",
      "im": "الْبَيْتِ ۚ",
      "en": "(of) the house",
      "tr": "l-bayti"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "حَمِيدٌۭ",
      "im": "حَمِيدٌ",
      "en": "(is) All-Praiseworthy",
      "tr": "ḥamīdun"
    },
    {
      "ar": "مَّجِيدٌۭ",
      "im": "مَّجِيدٌ",
      "en": "All-Glorious",
      "tr": "majīdun"
    }
  ],
  "11:88": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "يَـٰقَوْمِ",
      "im": "يَا قَوْمِ",
      "en": "O my people",
      "tr": "yāqawmi"
    },
    {
      "ar": "أَرَءَيْتُمْ",
      "im": "أَرَأَيْتُمْ",
      "en": "Do you see",
      "tr": "ara-aytum"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كُنتُ",
      "im": "كُنتُ",
      "en": "I am",
      "tr": "kuntu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "بَيِّنَةٍۢ",
      "im": "بَيِّنَةٍ",
      "en": "a clear evidence",
      "tr": "bayyinatin"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّى",
      "im": "رَّبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "وَرَزَقَنِى",
      "im": "وَرَزَقَنِي",
      "en": "and He has provided me",
      "tr": "warazaqanī"
    },
    {
      "ar": "مِنْهُ",
      "im": "مِنْهُ",
      "en": "from Himself",
      "tr": "min'hu"
    },
    {
      "ar": "رِزْقًا",
      "im": "رِزْقًا",
      "en": "a good provision",
      "tr": "riz'qan"
    },
    {
      "ar": "حَسَنًۭا ۚ",
      "im": "حَسَنًا ۚ",
      "en": "a good provision",
      "tr": "ḥasanan"
    },
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أُرِيدُ",
      "im": "أُرِيدُ",
      "en": "I intend",
      "tr": "urīdu"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أُخَالِفَكُمْ",
      "im": "أُخَالِفَكُمْ",
      "en": "I differ from you",
      "tr": "ukhālifakum"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "in",
      "tr": "ilā"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "أَنْهَىٰكُمْ",
      "im": "أَنْهَاكُمْ",
      "en": "I forbid you",
      "tr": "anhākum"
    },
    {
      "ar": "عَنْهُ ۚ",
      "im": "عَنْهُ ۚ",
      "en": "from it",
      "tr": "ʿanhu"
    },
    {
      "ar": "إِنْ",
      "im": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "أُرِيدُ",
      "im": "أُرِيدُ",
      "en": "I intend",
      "tr": "urīdu"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "ٱلْإِصْلَـٰحَ",
      "im": "الْإِصْلَاحَ",
      "en": "the reform",
      "tr": "l-iṣ'lāḥa"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "as much as I am able",
      "tr": "mā"
    },
    {
      "ar": "ٱسْتَطَعْتُ ۚ",
      "im": "اسْتَطَعْتُ ۚ",
      "en": "as much as I am able",
      "tr": "is'taṭaʿtu"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَوْفِيقِىٓ",
      "im": "تَوْفِيقِي",
      "en": "(is) my success",
      "tr": "tawfīqī"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِٱللَّهِ ۚ",
      "im": "بِاللَّهِ ۚ",
      "en": "with Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "Upon Him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "تَوَكَّلْتُ",
      "im": "تَوَكَّلْتُ",
      "en": "I trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "وَإِلَيْهِ",
      "im": "وَإِلَيْهِ",
      "en": "and to Him",
      "tr": "wa-ilayhi"
    },
    {
      "ar": "أُنِيبُ",
      "im": "أُنِيبُ",
      "en": "I turn",
      "tr": "unību"
    }
  ],
  "12:18": [
    {
      "ar": "وَجَآءُو",
      "im": "وَجَاءُوا",
      "en": "And they brought",
      "tr": "wajāū"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "قَمِيصِهِۦ",
      "im": "قَمِيصِهِ",
      "en": "his shirt",
      "tr": "qamīṣihi"
    },
    {
      "ar": "بِدَمٍۢ",
      "im": "بِدَمٍ",
      "en": "with false blood",
      "tr": "bidamin"
    },
    {
      "ar": "كَذِبٍۢ ۚ",
      "im": "كَذِبٍ ۚ",
      "en": "with false blood",
      "tr": "kadhibin"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "بَلْ",
      "im": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "سَوَّلَتْ",
      "im": "سَوَّلَتْ",
      "en": "has enticed you",
      "tr": "sawwalat"
    },
    {
      "ar": "لَكُمْ",
      "im": "لَكُمْ",
      "en": "has enticed you",
      "tr": "lakum"
    },
    {
      "ar": "أَنفُسُكُمْ",
      "im": "أَنفُسُكُمْ",
      "en": "your souls",
      "tr": "anfusukum"
    },
    {
      "ar": "أَمْرًۭا ۖ",
      "im": "أَمْرًا ۖ",
      "en": "(to) a matter",
      "tr": "amran"
    },
    {
      "ar": "فَصَبْرٌۭ",
      "im": "فَصَبْرٌ",
      "en": "so patience",
      "tr": "faṣabrun"
    },
    {
      "ar": "جَمِيلٌۭ ۖ",
      "im": "جَمِيلٌ ۖ",
      "en": "(is) beautiful",
      "tr": "jamīlun"
    },
    {
      "ar": "وَٱللَّهُ",
      "im": "وَاللَّهُ",
      "en": "And Allah",
      "tr": "wal-lahu"
    },
    {
      "ar": "ٱلْمُسْتَعَانُ",
      "im": "الْمُسْتَعَانُ",
      "en": "(is) the One sought for help",
      "tr": "l-mus'taʿānu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَصِفُونَ",
      "im": "تَصِفُونَ",
      "en": "you describe",
      "tr": "taṣifūna"
    }
  ],
  "12:67": [
    {
      "ar": "وَقَالَ",
      "im": "وَقَالَ",
      "en": "And he said",
      "tr": "waqāla"
    },
    {
      "ar": "يَـٰبَنِىَّ",
      "im": "يَا بَنِيَّ",
      "en": "O my sons",
      "tr": "yābaniyya"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَدْخُلُوا۟",
      "im": "تَدْخُلُوا",
      "en": "enter",
      "tr": "tadkhulū"
    },
    {
      "ar": "مِنۢ",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَابٍۢ",
      "im": "بَابٍ",
      "en": "one gate",
      "tr": "bābin"
    },
    {
      "ar": "وَٰحِدٍۢ",
      "im": "وَاحِدٍ",
      "en": "one gate",
      "tr": "wāḥidin"
    },
    {
      "ar": "وَٱدْخُلُوا۟",
      "im": "وَادْخُلُوا",
      "en": "but enter",
      "tr": "wa-ud'khulū"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَبْوَٰبٍۢ",
      "im": "أَبْوَابٍ",
      "en": "gates",
      "tr": "abwābin"
    },
    {
      "ar": "مُّتَفَرِّقَةٍۢ ۖ",
      "im": "مُّتَفَرِّقَةٍ ۖ",
      "en": "different",
      "tr": "mutafarriqatin"
    },
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أُغْنِى",
      "im": "أُغْنِي",
      "en": "I can avail",
      "tr": "ugh'nī"
    },
    {
      "ar": "عَنكُم",
      "im": "عَنكُم",
      "en": "you",
      "tr": "ʿankum"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "against",
      "tr": "mina"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "شَىْءٍ ۖ",
      "im": "شَيْءٍ ۖ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "إِنِ",
      "im": "إِنِ",
      "en": "Not",
      "tr": "ini"
    },
    {
      "ar": "ٱلْحُكْمُ",
      "im": "الْحُكْمُ",
      "en": "(is) the decision",
      "tr": "l-ḥuk'mu"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "لِلَّهِ ۖ",
      "im": "لِلَّهِ ۖ",
      "en": "with Allah",
      "tr": "lillahi"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "upon Him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "تَوَكَّلْتُ ۖ",
      "im": "تَوَكَّلْتُ ۖ",
      "en": "I put my trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "وَعَلَيْهِ",
      "im": "وَعَلَيْهِ",
      "en": "and upon Him",
      "tr": "waʿalayhi"
    },
    {
      "ar": "فَلْيَتَوَكَّلِ",
      "im": "فَلْيَتَوَكَّلِ",
      "en": "let put (their) trust",
      "tr": "falyatawakkali"
    },
    {
      "ar": "ٱلْمُتَوَكِّلُونَ",
      "im": "الْمُتَوَكِّلُونَ",
      "en": "the ones who put trust",
      "tr": "l-mutawakilūna"
    }
  ],
  "12:83": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "بَلْ",
      "im": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "سَوَّلَتْ",
      "im": "سَوَّلَتْ",
      "en": "have enticed",
      "tr": "sawwalat"
    },
    {
      "ar": "لَكُمْ",
      "im": "لَكُمْ",
      "en": "you",
      "tr": "lakum"
    },
    {
      "ar": "أَنفُسُكُمْ",
      "im": "أَنفُسُكُمْ",
      "en": "your souls",
      "tr": "anfusukum"
    },
    {
      "ar": "أَمْرًۭا ۖ",
      "im": "أَمْرًا ۖ",
      "en": "something",
      "tr": "amran"
    },
    {
      "ar": "فَصَبْرٌۭ",
      "im": "فَصَبْرٌ",
      "en": "so patience",
      "tr": "faṣabrun"
    },
    {
      "ar": "جَمِيلٌ ۖ",
      "im": "جَمِيلٌ ۖ",
      "en": "(is) beautiful",
      "tr": "jamīlun"
    },
    {
      "ar": "عَسَى",
      "im": "عَسَى",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "will bring them to me",
      "tr": "an"
    },
    {
      "ar": "يَأْتِيَنِى",
      "im": "يَأْتِيَنِي",
      "en": "will bring them to me",
      "tr": "yatiyanī"
    },
    {
      "ar": "بِهِمْ",
      "im": "بِهِمْ",
      "en": "will bring them to me",
      "tr": "bihim"
    },
    {
      "ar": "جَمِيعًا ۚ",
      "im": "جَمِيعًا ۚ",
      "en": "all",
      "tr": "jamīʿan"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "im": "الْعَلِيمُ",
      "en": "(is) the All-Knower",
      "tr": "l-ʿalīmu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "12:86": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "إِنَّمَآ",
      "im": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "أَشْكُوا۟",
      "im": "أَشْكُو",
      "en": "I complain",
      "tr": "ashkū"
    },
    {
      "ar": "بَثِّى",
      "im": "بَثِّي",
      "en": "(of) my suffering",
      "tr": "bathī"
    },
    {
      "ar": "وَحُزْنِىٓ",
      "im": "وَحُزْنِي",
      "en": "and my grief",
      "tr": "waḥuz'nī"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَأَعْلَمُ",
      "im": "وَأَعْلَمُ",
      "en": "and I know",
      "tr": "wa-aʿlamu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "تَعْلَمُونَ",
      "im": "تَعْلَمُونَ",
      "en": "you know",
      "tr": "taʿlamūna"
    }
  ],
  "12:101": [
    {
      "ar": "۞ رَبِّ",
      "im": "۞ رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "indeed",
      "tr": "qad"
    },
    {
      "ar": "ءَاتَيْتَنِى",
      "im": "آتَيْتَنِي",
      "en": "you have given me",
      "tr": "ātaytanī"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُلْكِ",
      "im": "الْمُلْكِ",
      "en": "the sovereignty",
      "tr": "l-mul'ki"
    },
    {
      "ar": "وَعَلَّمْتَنِى",
      "im": "وَعَلَّمْتَنِي",
      "en": "and taught me",
      "tr": "waʿallamtanī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "تَأْوِيلِ",
      "im": "تَأْوِيلِ",
      "en": "the interpretation",
      "tr": "tawīli"
    },
    {
      "ar": "ٱلْأَحَادِيثِ ۚ",
      "im": "الْأَحَادِيثِ ۚ",
      "en": "of the events",
      "tr": "l-aḥādīthi"
    },
    {
      "ar": "فَاطِرَ",
      "im": "فَاطِرَ",
      "en": "Creator",
      "tr": "fāṭira"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ",
      "im": "وَالْأَرْضِ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "وَلِىِّۦ",
      "im": "وَلِيِّي",
      "en": "(are) my Protector",
      "tr": "waliyyī"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "im": "الدُّنْيَا",
      "en": "the world",
      "tr": "l-dun'yā"
    },
    {
      "ar": "وَٱلْـَٔاخِرَةِ ۖ",
      "im": "وَالْآخِرَةِ ۖ",
      "en": "and the Hereafter",
      "tr": "wal-ākhirati"
    },
    {
      "ar": "تَوَفَّنِى",
      "im": "تَوَفَّنِي",
      "en": "Cause me to die",
      "tr": "tawaffanī"
    },
    {
      "ar": "مُسْلِمًۭا",
      "im": "مُسْلِمًا",
      "en": "(as) a Muslim",
      "tr": "mus'liman"
    },
    {
      "ar": "وَأَلْحِقْنِى",
      "im": "وَأَلْحِقْنِي",
      "en": "and join me",
      "tr": "wa-alḥiq'nī"
    },
    {
      "ar": "بِٱلصَّـٰلِحِينَ",
      "im": "بِالصَّالِحِينَ",
      "en": "with the righteous",
      "tr": "bil-ṣāliḥīna"
    }
  ],
  "14:35": [
    {
      "ar": "وَإِذْ",
      "im": "وَإِذْ",
      "en": "And when",
      "tr": "wa-idh"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "إِبْرَٰهِيمُ",
      "im": "إِبْرَاهِيمُ",
      "en": "Ibrahim",
      "tr": "ib'rāhīmu"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَلْ",
      "im": "اجْعَلْ",
      "en": "Make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "ٱلْبَلَدَ",
      "im": "الْبَلَدَ",
      "en": "city",
      "tr": "l-balada"
    },
    {
      "ar": "ءَامِنًۭا",
      "im": "آمِنًا",
      "en": "safe",
      "tr": "āminan"
    },
    {
      "ar": "وَٱجْنُبْنِى",
      "im": "وَاجْنُبْنِي",
      "en": "and keep me away",
      "tr": "wa-uj'nub'nī"
    },
    {
      "ar": "وَبَنِىَّ",
      "im": "وَبَنِيَّ",
      "en": "and my sons",
      "tr": "wabaniyya"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "نَّعْبُدَ",
      "im": "نَّعْبُدَ",
      "en": "we worship",
      "tr": "naʿbuda"
    },
    {
      "ar": "ٱلْأَصْنَامَ",
      "im": "الْأَصْنَامَ",
      "en": "the idols",
      "tr": "l-aṣnāma"
    }
  ],
  "14:36": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنَّهُنَّ",
      "im": "إِنَّهُنَّ",
      "en": "Indeed, they",
      "tr": "innahunna"
    },
    {
      "ar": "أَضْلَلْنَ",
      "im": "أَضْلَلْنَ",
      "en": "have led astray",
      "tr": "aḍlalna"
    },
    {
      "ar": "كَثِيرًۭا",
      "im": "كَثِيرًا",
      "en": "many",
      "tr": "kathīran"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلنَّاسِ ۖ",
      "im": "النَّاسِ ۖ",
      "en": "the mankind",
      "tr": "l-nāsi"
    },
    {
      "ar": "فَمَن",
      "im": "فَمَن",
      "en": "So whoever",
      "tr": "faman"
    },
    {
      "ar": "تَبِعَنِى",
      "im": "تَبِعَنِي",
      "en": "follows me",
      "tr": "tabiʿanī"
    },
    {
      "ar": "فَإِنَّهُۥ",
      "im": "فَإِنَّهُ",
      "en": "then indeed, he",
      "tr": "fa-innahu"
    },
    {
      "ar": "مِنِّى ۖ",
      "im": "مِنِّي ۖ",
      "en": "(is) of me",
      "tr": "minnī"
    },
    {
      "ar": "وَمَنْ",
      "im": "وَمَنْ",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "عَصَانِى",
      "im": "عَصَانِي",
      "en": "disobeys me",
      "tr": "ʿaṣānī"
    },
    {
      "ar": "فَإِنَّكَ",
      "im": "فَإِنَّكَ",
      "en": "then indeed, You",
      "tr": "fa-innaka"
    },
    {
      "ar": "غَفُورٌۭ",
      "im": "غَفُورٌ",
      "en": "(are) Oft-Forgiving",
      "tr": "ghafūrun"
    },
    {
      "ar": "رَّحِيمٌۭ",
      "im": "رَّحِيمٌ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
    }
  ],
  "14:37": [
    {
      "ar": "رَّبَّنَآ",
      "im": "رَّبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنِّىٓ",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "أَسْكَنتُ",
      "im": "أَسْكَنتُ",
      "en": "[I] have settled",
      "tr": "askantu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "(some) of",
      "tr": "min"
    },
    {
      "ar": "ذُرِّيَّتِى",
      "im": "ذُرِّيَّتِي",
      "en": "my offsprings",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "بِوَادٍ",
      "im": "بِوَادٍ",
      "en": "in a valley",
      "tr": "biwādin"
    },
    {
      "ar": "غَيْرِ",
      "im": "غَيْرِ",
      "en": "not",
      "tr": "ghayri"
    },
    {
      "ar": "ذِى",
      "im": "ذِي",
      "en": "with",
      "tr": "dhī"
    },
    {
      "ar": "زَرْعٍ",
      "im": "زَرْعٍ",
      "en": "cultivation",
      "tr": "zarʿin"
    },
    {
      "ar": "عِندَ",
      "im": "عِندَ",
      "en": "near",
      "tr": "ʿinda"
    },
    {
      "ar": "بَيْتِكَ",
      "im": "بَيْتِكَ",
      "en": "Your Sacred House",
      "tr": "baytika"
    },
    {
      "ar": "ٱلْمُحَرَّمِ",
      "im": "الْمُحَرَّمِ",
      "en": "Your Sacred House",
      "tr": "l-muḥarami"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لِيُقِيمُوا۟",
      "im": "لِيُقِيمُوا",
      "en": "That they may establish",
      "tr": "liyuqīmū"
    },
    {
      "ar": "ٱلصَّلَوٰةَ",
      "im": "الصَّلَاةَ",
      "en": "the prayers",
      "tr": "l-ṣalata"
    },
    {
      "ar": "فَٱجْعَلْ",
      "im": "فَاجْعَلْ",
      "en": "So make",
      "tr": "fa-ij'ʿal"
    },
    {
      "ar": "أَفْـِٔدَةًۭ",
      "im": "أَفْئِدَةً",
      "en": "hearts",
      "tr": "afidatan"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "the men",
      "tr": "l-nāsi"
    },
    {
      "ar": "تَهْوِىٓ",
      "im": "تَهْوِي",
      "en": "incline",
      "tr": "tahwī"
    },
    {
      "ar": "إِلَيْهِمْ",
      "im": "إِلَيْهِمْ",
      "en": "towards them",
      "tr": "ilayhim"
    },
    {
      "ar": "وَٱرْزُقْهُم",
      "im": "وَارْزُقْهُم",
      "en": "and provide them",
      "tr": "wa-ur'zuq'hum"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "with",
      "tr": "mina"
    },
    {
      "ar": "ٱلثَّمَرَٰتِ",
      "im": "الثَّمَرَاتِ",
      "en": "the fruits",
      "tr": "l-thamarāti"
    },
    {
      "ar": "لَعَلَّهُمْ",
      "im": "لَعَلَّهُمْ",
      "en": "so that they may",
      "tr": "laʿallahum"
    },
    {
      "ar": "يَشْكُرُونَ",
      "im": "يَشْكُرُونَ",
      "en": "be grateful",
      "tr": "yashkurūna"
    }
  ],
  "14:38": [
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "تَعْلَمُ",
      "im": "تَعْلَمُ",
      "en": "You know",
      "tr": "taʿlamu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "نُخْفِى",
      "im": "نُخْفِي",
      "en": "we conceal",
      "tr": "nukh'fī"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "نُعْلِنُ ۗ",
      "im": "نُعْلِنُ ۗ",
      "en": "we proclaim",
      "tr": "nuʿ'linu"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يَخْفَىٰ",
      "im": "يَخْفَىٰ",
      "en": "(is) hidden",
      "tr": "yakhfā"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "from",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "im": "الْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلسَّمَآءِ",
      "im": "السَّمَاءِ",
      "en": "the heaven",
      "tr": "l-samāi"
    }
  ],
  "14:40": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَلْنِى",
      "im": "اجْعَلْنِي",
      "en": "Make me",
      "tr": "ij'ʿalnī"
    },
    {
      "ar": "مُقِيمَ",
      "im": "مُقِيمَ",
      "en": "an establisher",
      "tr": "muqīma"
    },
    {
      "ar": "ٱلصَّلَوٰةِ",
      "im": "الصَّلَاةِ",
      "en": "(of) the prayer",
      "tr": "l-ṣalati"
    },
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "and from",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِى ۚ",
      "im": "ذُرِّيَّتِي ۚ",
      "en": "my offsprings",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَتَقَبَّلْ",
      "im": "وَتَقَبَّلْ",
      "en": "and accept",
      "tr": "wataqabbal"
    },
    {
      "ar": "دُعَآءِ",
      "im": "دُعَاءِ",
      "en": "my prayer",
      "tr": "duʿāi"
    }
  ],
  "14:41": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱغْفِرْ",
      "im": "اغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِوَٰلِدَىَّ",
      "im": "وَلِوَالِدَيَّ",
      "en": "and my parents",
      "tr": "waliwālidayya"
    },
    {
      "ar": "وَلِلْمُؤْمِنِينَ",
      "im": "وَلِلْمُؤْمِنِينَ",
      "en": "and the believers",
      "tr": "walil'mu'minīna"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on) the Day",
      "tr": "yawma"
    },
    {
      "ar": "يَقُومُ",
      "im": "يَقُومُ",
      "en": "will (be) established",
      "tr": "yaqūmu"
    },
    {
      "ar": "ٱلْحِسَابُ",
      "im": "الْحِسَابُ",
      "en": "the account",
      "tr": "l-ḥisābu"
    }
  ],
  "17:24": [
    {
      "ar": "وَٱخْفِضْ",
      "im": "وَاخْفِضْ",
      "en": "And lower",
      "tr": "wa-ikh'fiḍ"
    },
    {
      "ar": "لَهُمَا",
      "im": "لَهُمَا",
      "en": "to them",
      "tr": "lahumā"
    },
    {
      "ar": "جَنَاحَ",
      "im": "جَنَاحَ",
      "en": "(the) wing",
      "tr": "janāḥa"
    },
    {
      "ar": "ٱلذُّلِّ",
      "im": "الذُّلِّ",
      "en": "(of) humility",
      "tr": "l-dhuli"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "(out) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلرَّحْمَةِ",
      "im": "الرَّحْمَةِ",
      "en": "[the] mercy",
      "tr": "l-raḥmati"
    },
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱرْحَمْهُمَا",
      "im": "ارْحَمْهُمَا",
      "en": "Have mercy on both of them",
      "tr": "ir'ḥamhumā"
    },
    {
      "ar": "كَمَا",
      "im": "كَمَا",
      "en": "as",
      "tr": "kamā"
    },
    {
      "ar": "رَبَّيَانِى",
      "im": "رَبَّيَانِي",
      "en": "they brought me up",
      "tr": "rabbayānī"
    },
    {
      "ar": "صَغِيرًۭا",
      "im": "صَغِيرًا",
      "en": "(when I was) small",
      "tr": "ṣaghīran"
    }
  ],
  "17:80": [
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَدْخِلْنِى",
      "im": "أَدْخِلْنِي",
      "en": "Cause me to enter",
      "tr": "adkhil'nī"
    },
    {
      "ar": "مُدْخَلَ",
      "im": "مُدْخَلَ",
      "en": "an entrance",
      "tr": "mud'khala"
    },
    {
      "ar": "صِدْقٍۢ",
      "im": "صِدْقٍ",
      "en": "sound",
      "tr": "ṣid'qin"
    },
    {
      "ar": "وَأَخْرِجْنِى",
      "im": "وَأَخْرِجْنِي",
      "en": "and cause me to exit",
      "tr": "wa-akhrij'nī"
    },
    {
      "ar": "مُخْرَجَ",
      "im": "مُخْرَجَ",
      "en": "an exit",
      "tr": "mukh'raja"
    },
    {
      "ar": "صِدْقٍۢ",
      "im": "صِدْقٍ",
      "en": "sound",
      "tr": "ṣid'qin"
    },
    {
      "ar": "وَٱجْعَل",
      "im": "وَاجْعَل",
      "en": "and make",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "im": "لِّي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "im": "لَّدُنكَ",
      "en": "near You",
      "tr": "ladunka"
    },
    {
      "ar": "سُلْطَـٰنًۭا",
      "im": "سُلْطَانًا",
      "en": "an authority",
      "tr": "sul'ṭānan"
    },
    {
      "ar": "نَّصِيرًۭا",
      "im": "نَّصِيرًا",
      "en": "helping",
      "tr": "naṣīran"
    }
  ],
  "17:82": [
    {
      "ar": "وَنُنَزِّلُ",
      "im": "وَنُنَزِّلُ",
      "en": "And We reveal",
      "tr": "wanunazzilu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقُرْءَانِ",
      "im": "الْقُرْآنِ",
      "en": "the Quran",
      "tr": "l-qur'āni"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "that",
      "tr": "mā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "it",
      "tr": "huwa"
    },
    {
      "ar": "شِفَآءٌۭ",
      "im": "شِفَاءٌ",
      "en": "(is) a healing",
      "tr": "shifāon"
    },
    {
      "ar": "وَرَحْمَةٌۭ",
      "im": "وَرَحْمَةٌ",
      "en": "and a mercy",
      "tr": "waraḥmatun"
    },
    {
      "ar": "لِّلْمُؤْمِنِينَ ۙ",
      "im": "لِّلْمُؤْمِنِينَ ۙ",
      "en": "for the believers",
      "tr": "lil'mu'minīna"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "but not",
      "tr": "walā"
    },
    {
      "ar": "يَزِيدُ",
      "im": "يَزِيدُ",
      "en": "it increases",
      "tr": "yazīdu"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "خَسَارًۭا",
      "im": "خَسَارًا",
      "en": "(in) loss",
      "tr": "khasāran"
    }
  ],
  "18:10": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "أَوَى",
      "im": "أَوَى",
      "en": "retreated",
      "tr": "awā"
    },
    {
      "ar": "ٱلْفِتْيَةُ",
      "im": "الْفِتْيَةُ",
      "en": "the youths",
      "tr": "l-fit'yatu"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلْكَهْفِ",
      "im": "الْكَهْفِ",
      "en": "the cave",
      "tr": "l-kahfi"
    },
    {
      "ar": "فَقَالُوا۟",
      "im": "فَقَالُوا",
      "en": "and they said",
      "tr": "faqālū"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ءَاتِنَا",
      "im": "آتِنَا",
      "en": "Grant us",
      "tr": "ātinā"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "im": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "رَحْمَةًۭ",
      "im": "رَحْمَةً",
      "en": "Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "وَهَيِّئْ",
      "im": "وَهَيِّئْ",
      "en": "and facilitate",
      "tr": "wahayyi"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "[from]",
      "tr": "min"
    },
    {
      "ar": "أَمْرِنَا",
      "im": "أَمْرِنَا",
      "en": "our affair",
      "tr": "amrinā"
    },
    {
      "ar": "رَشَدًۭا",
      "im": "رَشَدًا",
      "en": "(in the) right way",
      "tr": "rashadan"
    }
  ],
  "18:24": [
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "If",
      "tr": "an"
    },
    {
      "ar": "يَشَآءَ",
      "im": "يَشَاءَ",
      "en": "Allah wills",
      "tr": "yashāa"
    },
    {
      "ar": "ٱللَّهُ ۚ",
      "im": "اللَّهُ ۚ",
      "en": "Allah wills",
      "tr": "l-lahu"
    },
    {
      "ar": "وَٱذْكُر",
      "im": "وَاذْكُر",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "رَّبَّكَ",
      "im": "رَّبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "نَسِيتَ",
      "im": "نَسِيتَ",
      "en": "you forget",
      "tr": "nasīta"
    },
    {
      "ar": "وَقُلْ",
      "im": "وَقُلْ",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "عَسَىٰٓ",
      "im": "عَسَىٰ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَهْدِيَنِ",
      "im": "يَهْدِيَنِ",
      "en": "will guide me",
      "tr": "yahdiyani"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لِأَقْرَبَ",
      "im": "لِأَقْرَبَ",
      "en": "to a nearer (way)",
      "tr": "li-aqraba"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "than",
      "tr": "min"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "رَشَدًۭا",
      "im": "رَشَدًا",
      "en": "right way",
      "tr": "rashadan"
    }
  ],
  "19:4": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, [I]",
      "tr": "innī"
    },
    {
      "ar": "وَهَنَ",
      "im": "وَهَنَ",
      "en": "(have) weakened",
      "tr": "wahana"
    },
    {
      "ar": "ٱلْعَظْمُ",
      "im": "الْعَظْمُ",
      "en": "my bones",
      "tr": "l-ʿaẓmu"
    },
    {
      "ar": "مِنِّى",
      "im": "مِنِّي",
      "en": "my bones",
      "tr": "minnī"
    },
    {
      "ar": "وَٱشْتَعَلَ",
      "im": "وَاشْتَعَلَ",
      "en": "and flared",
      "tr": "wa-ish'taʿala"
    },
    {
      "ar": "ٱلرَّأْسُ",
      "im": "الرَّأْسُ",
      "en": "(my) head",
      "tr": "l-rasu"
    },
    {
      "ar": "شَيْبًۭا",
      "im": "شَيْبًا",
      "en": "(with) white",
      "tr": "shayban"
    },
    {
      "ar": "وَلَمْ",
      "im": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "أَكُنۢ",
      "im": "أَكُن",
      "en": "I have been",
      "tr": "akun"
    },
    {
      "ar": "بِدُعَآئِكَ",
      "im": "بِدُعَائِكَ",
      "en": "in (my) supplication (to) You",
      "tr": "biduʿāika"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "my Lord",
      "tr": "rabbi"
    },
    {
      "ar": "شَقِيًّۭا",
      "im": "شَقِيًّا",
      "en": "unblessed",
      "tr": "shaqiyyan"
    }
  ],
  "19:5": [
    {
      "ar": "وَإِنِّى",
      "im": "وَإِنِّي",
      "en": "And indeed, I",
      "tr": "wa-innī"
    },
    {
      "ar": "خِفْتُ",
      "im": "خِفْتُ",
      "en": "[I] fear",
      "tr": "khif'tu"
    },
    {
      "ar": "ٱلْمَوَٰلِىَ",
      "im": "الْمَوَالِيَ",
      "en": "the successors",
      "tr": "l-mawāliya"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "after me",
      "tr": "min"
    },
    {
      "ar": "وَرَآءِى",
      "im": "وَرَائِي",
      "en": "after me",
      "tr": "warāī"
    },
    {
      "ar": "وَكَانَتِ",
      "im": "وَكَانَتِ",
      "en": "and is",
      "tr": "wakānati"
    },
    {
      "ar": "ٱمْرَأَتِى",
      "im": "امْرَأَتِي",
      "en": "my wife",
      "tr": "im'ra-atī"
    },
    {
      "ar": "عَاقِرًۭا",
      "im": "عَاقِرًا",
      "en": "barren",
      "tr": "ʿāqiran"
    },
    {
      "ar": "فَهَبْ",
      "im": "فَهَبْ",
      "en": "So give",
      "tr": "fahab"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "[to] me",
      "tr": "lī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنكَ",
      "im": "لَّدُنكَ",
      "en": "Yourself",
      "tr": "ladunka"
    },
    {
      "ar": "وَلِيًّۭا",
      "im": "وَلِيًّا",
      "en": "an heir",
      "tr": "waliyyan"
    }
  ],
  "19:7": [
    {
      "ar": "يَـٰزَكَرِيَّآ",
      "im": "يَا زَكَرِيَّا",
      "en": "O Zakariya",
      "tr": "yāzakariyyā"
    },
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "نُبَشِّرُكَ",
      "im": "نُبَشِّرُكَ",
      "en": "[We] give you glad tidings",
      "tr": "nubashiruka"
    },
    {
      "ar": "بِغُلَـٰمٍ",
      "im": "بِغُلَامٍ",
      "en": "of a boy",
      "tr": "bighulāmin"
    },
    {
      "ar": "ٱسْمُهُۥ",
      "im": "اسْمُهُ",
      "en": "his name",
      "tr": "us'muhu"
    },
    {
      "ar": "يَحْيَىٰ",
      "im": "يَحْيَىٰ",
      "en": "(will be) Yahya",
      "tr": "yaḥyā"
    },
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "نَجْعَل",
      "im": "نَجْعَل",
      "en": "We (have) assigned",
      "tr": "najʿal"
    },
    {
      "ar": "لَّهُۥ",
      "im": "لَّهُ",
      "en": "[for] it",
      "tr": "lahu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "im": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "سَمِيًّۭا",
      "im": "سَمِيًّا",
      "en": "(this) name",
      "tr": "samiyyan"
    }
  ],
  "19:8": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَنَّىٰ",
      "im": "أَنَّىٰ",
      "en": "How",
      "tr": "annā"
    },
    {
      "ar": "يَكُونُ",
      "im": "يَكُونُ",
      "en": "can",
      "tr": "yakūnu"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "I have",
      "tr": "lī"
    },
    {
      "ar": "غُلَـٰمٌۭ",
      "im": "غُلَامٌ",
      "en": "a boy",
      "tr": "ghulāmun"
    },
    {
      "ar": "وَكَانَتِ",
      "im": "وَكَانَتِ",
      "en": "while is",
      "tr": "wakānati"
    },
    {
      "ar": "ٱمْرَأَتِى",
      "im": "امْرَأَتِي",
      "en": "my wife",
      "tr": "im'ra-atī"
    },
    {
      "ar": "عَاقِرًۭا",
      "im": "عَاقِرًا",
      "en": "barren",
      "tr": "ʿāqiran"
    },
    {
      "ar": "وَقَدْ",
      "im": "وَقَدْ",
      "en": "and indeed",
      "tr": "waqad"
    },
    {
      "ar": "بَلَغْتُ",
      "im": "بَلَغْتُ",
      "en": "I have reached",
      "tr": "balaghtu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْكِبَرِ",
      "im": "الْكِبَرِ",
      "en": "the old age",
      "tr": "l-kibari"
    },
    {
      "ar": "عِتِيًّۭا",
      "im": "عِتِيًّا",
      "en": "extreme",
      "tr": "ʿitiyyan"
    }
  ],
  "19:9": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "كَذَٰلِكَ",
      "im": "كَذَٰلِكَ",
      "en": "Thus",
      "tr": "kadhālika"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "'It",
      "tr": "huwa"
    },
    {
      "ar": "عَلَىَّ",
      "im": "عَلَيَّ",
      "en": "(is) easy for Me",
      "tr": "ʿalayya"
    },
    {
      "ar": "هَيِّنٌۭ",
      "im": "هَيِّنٌ",
      "en": "(is) easy for Me",
      "tr": "hayyinun"
    },
    {
      "ar": "وَقَدْ",
      "im": "وَقَدْ",
      "en": "and certainly",
      "tr": "waqad"
    },
    {
      "ar": "خَلَقْتُكَ",
      "im": "خَلَقْتُكَ",
      "en": "I (have) created you",
      "tr": "khalaqtuka"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "im": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "وَلَمْ",
      "im": "وَلَمْ",
      "en": "while not",
      "tr": "walam"
    },
    {
      "ar": "تَكُ",
      "im": "تَكُ",
      "en": "you were",
      "tr": "taku"
    },
    {
      "ar": "شَيْـًۭٔا",
      "im": "شَيْئًا",
      "en": "anything.'",
      "tr": "shayan"
    }
  ],
  "19:10": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱجْعَل",
      "im": "اجْعَل",
      "en": "Make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "لِّىٓ",
      "im": "لِّي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "ءَايَةًۭ ۚ",
      "im": "آيَةً ۚ",
      "en": "a sign",
      "tr": "āyatan"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "ءَايَتُكَ",
      "im": "آيَتُكَ",
      "en": "Your sign",
      "tr": "āyatuka"
    },
    {
      "ar": "أَلَّا",
      "im": "أَلَّا",
      "en": "(is) that not",
      "tr": "allā"
    },
    {
      "ar": "تُكَلِّمَ",
      "im": "تُكَلِّمَ",
      "en": "you will speak",
      "tr": "tukallima"
    },
    {
      "ar": "ٱلنَّاسَ",
      "im": "النَّاسَ",
      "en": "(to) the people",
      "tr": "l-nāsa"
    },
    {
      "ar": "ثَلَـٰثَ",
      "im": "ثَلَاثَ",
      "en": "(for) three",
      "tr": "thalātha"
    },
    {
      "ar": "لَيَالٍۢ",
      "im": "لَيَالٍ",
      "en": "nights",
      "tr": "layālin"
    },
    {
      "ar": "سَوِيًّۭا",
      "im": "سَوِيًّا",
      "en": "sound",
      "tr": "sawiyyan"
    }
  ],
  "19:11": [
    {
      "ar": "فَخَرَجَ",
      "im": "فَخَرَجَ",
      "en": "Then he came out",
      "tr": "fakharaja"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "قَوْمِهِۦ",
      "im": "قَوْمِهِ",
      "en": "his people",
      "tr": "qawmihi"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمِحْرَابِ",
      "im": "الْمِحْرَابِ",
      "en": "the prayer chamber",
      "tr": "l-miḥ'rābi"
    },
    {
      "ar": "فَأَوْحَىٰٓ",
      "im": "فَأَوْحَىٰ",
      "en": "and he signaled",
      "tr": "fa-awḥā"
    },
    {
      "ar": "إِلَيْهِمْ",
      "im": "إِلَيْهِمْ",
      "en": "to them",
      "tr": "ilayhim"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "to",
      "tr": "an"
    },
    {
      "ar": "سَبِّحُوا۟",
      "im": "سَبِّحُوا",
      "en": "glorify (Allah)",
      "tr": "sabbiḥū"
    },
    {
      "ar": "بُكْرَةًۭ",
      "im": "بُكْرَةً",
      "en": "(in) the morning",
      "tr": "buk'ratan"
    },
    {
      "ar": "وَعَشِيًّۭا",
      "im": "وَعَشِيًّا",
      "en": "and (in) the evening",
      "tr": "waʿashiyyan"
    }
  ],
  "19:12": [
    {
      "ar": "يَـٰيَحْيَىٰ",
      "im": "يَا يَحْيَىٰ",
      "en": "O Yahya",
      "tr": "yāyaḥyā"
    },
    {
      "ar": "خُذِ",
      "im": "خُذِ",
      "en": "Hold",
      "tr": "khudhi"
    },
    {
      "ar": "ٱلْكِتَـٰبَ",
      "im": "الْكِتَابَ",
      "en": "the Scripture",
      "tr": "l-kitāba"
    },
    {
      "ar": "بِقُوَّةٍۢ ۖ",
      "im": "بِقُوَّةٍ ۖ",
      "en": "with strength",
      "tr": "biquwwatin"
    },
    {
      "ar": "وَءَاتَيْنَـٰهُ",
      "im": "وَآتَيْنَاهُ",
      "en": "And We gave him",
      "tr": "waātaynāhu"
    },
    {
      "ar": "ٱلْحُكْمَ",
      "im": "الْحُكْمَ",
      "en": "[the] wisdom",
      "tr": "l-ḥuk'ma"
    },
    {
      "ar": "صَبِيًّۭا",
      "im": "صَبِيًّا",
      "en": "(when he was) a child",
      "tr": "ṣabiyyan"
    }
  ],
  "19:13": [
    {
      "ar": "وَحَنَانًۭا",
      "im": "وَحَنَانًا",
      "en": "And affection",
      "tr": "waḥanānan"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنَّا",
      "im": "لَّدُنَّا",
      "en": "Us",
      "tr": "ladunnā"
    },
    {
      "ar": "وَزَكَوٰةًۭ ۖ",
      "im": "وَزَكَاةً ۖ",
      "en": "and purity",
      "tr": "wazakatan"
    },
    {
      "ar": "وَكَانَ",
      "im": "وَكَانَ",
      "en": "and he was",
      "tr": "wakāna"
    },
    {
      "ar": "تَقِيًّۭا",
      "im": "تَقِيًّا",
      "en": "righteous",
      "tr": "taqiyyan"
    }
  ],
  "19:14": [
    {
      "ar": "وَبَرًّۢا",
      "im": "وَبَرًّا",
      "en": "And dutiful",
      "tr": "wabarran"
    },
    {
      "ar": "بِوَٰلِدَيْهِ",
      "im": "بِوَالِدَيْهِ",
      "en": "to his parents",
      "tr": "biwālidayhi"
    },
    {
      "ar": "وَلَمْ",
      "im": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "يَكُن",
      "im": "يَكُن",
      "en": "he was",
      "tr": "yakun"
    },
    {
      "ar": "جَبَّارًا",
      "im": "جَبَّارًا",
      "en": "a tyrant",
      "tr": "jabbāran"
    },
    {
      "ar": "عَصِيًّۭا",
      "im": "عَصِيًّا",
      "en": "disobedient",
      "tr": "ʿaṣiyyan"
    }
  ],
  "19:15": [
    {
      "ar": "وَسَلَـٰمٌ",
      "im": "وَسَلَامٌ",
      "en": "And peace be",
      "tr": "wasalāmun"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "upon him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(the) day",
      "tr": "yawma"
    },
    {
      "ar": "وُلِدَ",
      "im": "وُلِدَ",
      "en": "he was born",
      "tr": "wulida"
    },
    {
      "ar": "وَيَوْمَ",
      "im": "وَيَوْمَ",
      "en": "and (the) day",
      "tr": "wayawma"
    },
    {
      "ar": "يَمُوتُ",
      "im": "يَمُوتُ",
      "en": "he dies",
      "tr": "yamūtu"
    },
    {
      "ar": "وَيَوْمَ",
      "im": "وَيَوْمَ",
      "en": "and (the) day",
      "tr": "wayawma"
    },
    {
      "ar": "يُبْعَثُ",
      "im": "يُبْعَثُ",
      "en": "he will be raised",
      "tr": "yub'ʿathu"
    },
    {
      "ar": "حَيًّۭا",
      "im": "حَيًّا",
      "en": "alive",
      "tr": "ḥayyan"
    }
  ],
  "19:56": [
    {
      "ar": "وَٱذْكُرْ",
      "im": "وَاذْكُرْ",
      "en": "And mention",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "im": "الْكِتَابِ",
      "en": "the Book",
      "tr": "l-kitābi"
    },
    {
      "ar": "إِدْرِيسَ ۚ",
      "im": "إِدْرِيسَ ۚ",
      "en": "Idris",
      "tr": "id'rīsa"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "was",
      "tr": "kāna"
    },
    {
      "ar": "صِدِّيقًۭا",
      "im": "صِدِّيقًا",
      "en": "truthful",
      "tr": "ṣiddīqan"
    },
    {
      "ar": "نَّبِيًّۭا",
      "im": "نَّبِيًّا",
      "en": "a Prophet",
      "tr": "nabiyyan"
    }
  ],
  "19:57": [
    {
      "ar": "وَرَفَعْنَـٰهُ",
      "im": "وَرَفَعْنَاهُ",
      "en": "And We raised him",
      "tr": "warafaʿnāhu"
    },
    {
      "ar": "مَكَانًا",
      "im": "مَكَانًا",
      "en": "(to) a position",
      "tr": "makānan"
    },
    {
      "ar": "عَلِيًّا",
      "im": "عَلِيًّا",
      "en": "high",
      "tr": "ʿaliyyan"
    }
  ],
  "20:25": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱشْرَحْ",
      "im": "اشْرَحْ",
      "en": "Expand",
      "tr": "ish'raḥ"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "صَدْرِى",
      "im": "صَدْرِي",
      "en": "my breast",
      "tr": "ṣadrī"
    }
  ],
  "20:26": [
    {
      "ar": "وَيَسِّرْ",
      "im": "وَيَسِّرْ",
      "en": "And ease",
      "tr": "wayassir"
    },
    {
      "ar": "لِىٓ",
      "im": "لِي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "أَمْرِى",
      "im": "أَمْرِي",
      "en": "my task",
      "tr": "amrī"
    }
  ],
  "20:27": [
    {
      "ar": "وَٱحْلُلْ",
      "im": "وَاحْلُلْ",
      "en": "And untie",
      "tr": "wa-uḥ'lul"
    },
    {
      "ar": "عُقْدَةًۭ",
      "im": "عُقْدَةً",
      "en": "(the) knot",
      "tr": "ʿuq'datan"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لِّسَانِى",
      "im": "لِّسَانِي",
      "en": "my tongue",
      "tr": "lisānī"
    }
  ],
  "20:28": [
    {
      "ar": "يَفْقَهُوا۟",
      "im": "يَفْقَهُوا",
      "en": "That they may understand",
      "tr": "yafqahū"
    },
    {
      "ar": "قَوْلِى",
      "im": "قَوْلِي",
      "en": "my speech",
      "tr": "qawlī"
    }
  ],
  "20:29": [
    {
      "ar": "وَٱجْعَل",
      "im": "وَاجْعَل",
      "en": "And appoint",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "im": "لِّي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "وَزِيرًۭا",
      "im": "وَزِيرًا",
      "en": "a minister",
      "tr": "wazīran"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَهْلِى",
      "im": "أَهْلِي",
      "en": "my family",
      "tr": "ahlī"
    }
  ],
  "20:30": [
    {
      "ar": "هَـٰرُونَ",
      "im": "هَارُونَ",
      "en": "Harun",
      "tr": "hārūna"
    },
    {
      "ar": "أَخِى",
      "im": "أَخِي",
      "en": "my brother",
      "tr": "akhī"
    }
  ],
  "20:31": [
    {
      "ar": "ٱشْدُدْ",
      "im": "اشْدُدْ",
      "en": "Reinforce",
      "tr": "ush'dud"
    },
    {
      "ar": "بِهِۦٓ",
      "im": "بِهِ",
      "en": "through him",
      "tr": "bihi"
    },
    {
      "ar": "أَزْرِى",
      "im": "أَزْرِي",
      "en": "my strength",
      "tr": "azrī"
    }
  ],
  "20:32": [
    {
      "ar": "وَأَشْرِكْهُ",
      "im": "وَأَشْرِكْهُ",
      "en": "And make him share",
      "tr": "wa-ashrik'hu"
    },
    {
      "ar": "فِىٓ",
      "im": "فِي",
      "en": "[in]",
      "tr": "fī"
    },
    {
      "ar": "أَمْرِى",
      "im": "أَمْرِي",
      "en": "my task",
      "tr": "amrī"
    }
  ],
  "20:69": [
    {
      "ar": "وَأَلْقِ",
      "im": "وَأَلْقِ",
      "en": "And throw",
      "tr": "wa-alqi"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "يَمِينِكَ",
      "im": "يَمِينِكَ",
      "en": "your right hand",
      "tr": "yamīnika"
    },
    {
      "ar": "تَلْقَفْ",
      "im": "تَلْقَفْ",
      "en": "it will swallow up",
      "tr": "talqaf"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "صَنَعُوٓا۟ ۖ",
      "im": "صَنَعُوا ۖ",
      "en": "they have made",
      "tr": "ṣanaʿū"
    },
    {
      "ar": "إِنَّمَا",
      "im": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "صَنَعُوا۟",
      "im": "صَنَعُوا",
      "en": "they (have) made",
      "tr": "ṣanaʿū"
    },
    {
      "ar": "كَيْدُ",
      "im": "كَيْدُ",
      "en": "a trick",
      "tr": "kaydu"
    },
    {
      "ar": "سَـٰحِرٍۢ ۖ",
      "im": "سَاحِرٍ ۖ",
      "en": "(of) a magician",
      "tr": "sāḥirin"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يُفْلِحُ",
      "im": "يُفْلِحُ",
      "en": "will be successful",
      "tr": "yuf'liḥu"
    },
    {
      "ar": "ٱلسَّاحِرُ",
      "im": "السَّاحِرُ",
      "en": "the magician",
      "tr": "l-sāḥiru"
    },
    {
      "ar": "حَيْثُ",
      "im": "حَيْثُ",
      "en": "wherever",
      "tr": "ḥaythu"
    },
    {
      "ar": "أَتَىٰ",
      "im": "أَتَىٰ",
      "en": "he comes",
      "tr": "atā"
    }
  ],
  "20:114": [
    {
      "ar": "فَتَعَـٰلَى",
      "im": "فَتَعَالَى",
      "en": "So high (above all)",
      "tr": "fataʿālā"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "(is) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلْمَلِكُ",
      "im": "الْمَلِكُ",
      "en": "the King",
      "tr": "l-maliku"
    },
    {
      "ar": "ٱلْحَقُّ ۗ",
      "im": "الْحَقُّ ۗ",
      "en": "the True",
      "tr": "l-ḥaqu"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَعْجَلْ",
      "im": "تَعْجَلْ",
      "en": "hasten",
      "tr": "taʿjal"
    },
    {
      "ar": "بِٱلْقُرْءَانِ",
      "im": "بِالْقُرْآنِ",
      "en": "with the Quran",
      "tr": "bil-qur'āni"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلِ",
      "im": "قَبْلِ",
      "en": "before",
      "tr": "qabli"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يُقْضَىٰٓ",
      "im": "يُقْضَىٰ",
      "en": "is completed",
      "tr": "yuq'ḍā"
    },
    {
      "ar": "إِلَيْكَ",
      "im": "إِلَيْكَ",
      "en": "to you",
      "tr": "ilayka"
    },
    {
      "ar": "وَحْيُهُۥ ۖ",
      "im": "وَحْيُهُ ۖ",
      "en": "its revelation",
      "tr": "waḥyuhu"
    },
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "زِدْنِى",
      "im": "زِدْنِي",
      "en": "Increase me",
      "tr": "zid'nī"
    },
    {
      "ar": "عِلْمًۭا",
      "im": "عِلْمًا",
      "en": "(in) knowledge",
      "tr": "ʿil'man"
    }
  ],
  "21:83": [
    {
      "ar": "۞ وَأَيُّوبَ",
      "im": "۞ وَأَيُّوبَ",
      "en": "And Ayub",
      "tr": "wa-ayyūba"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰ",
      "im": "نَادَىٰ",
      "en": "he called",
      "tr": "nādā"
    },
    {
      "ar": "رَبَّهُۥٓ",
      "im": "رَبَّهُ",
      "en": "(to) his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "im": "أَنِّي",
      "en": "Indeed, [I]",
      "tr": "annī"
    },
    {
      "ar": "مَسَّنِىَ",
      "im": "مَسَّنِيَ",
      "en": "has touched me",
      "tr": "massaniya"
    },
    {
      "ar": "ٱلضُّرُّ",
      "im": "الضُّرُّ",
      "en": "the adversity",
      "tr": "l-ḍuru"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "أَرْحَمُ",
      "im": "أَرْحَمُ",
      "en": "(are) Most Merciful",
      "tr": "arḥamu"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "im": "الرَّاحِمِينَ",
      "en": "(of) the Merciful",
      "tr": "l-rāḥimīna"
    }
  ],
  "21:84": [
    {
      "ar": "فَٱسْتَجَبْنَا",
      "im": "فَاسْتَجَبْنَا",
      "en": "So We responded",
      "tr": "fa-is'tajabnā"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "to him",
      "tr": "lahu"
    },
    {
      "ar": "فَكَشَفْنَا",
      "im": "فَكَشَفْنَا",
      "en": "and We removed",
      "tr": "fakashafnā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "(was) on him",
      "tr": "bihi"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "ضُرٍّۢ ۖ",
      "im": "ضُرٍّ ۖ",
      "en": "(the) adversity",
      "tr": "ḍurrin"
    },
    {
      "ar": "وَءَاتَيْنَـٰهُ",
      "im": "وَآتَيْنَاهُ",
      "en": "And We gave him",
      "tr": "waātaynāhu"
    },
    {
      "ar": "أَهْلَهُۥ",
      "im": "أَهْلَهُ",
      "en": "his family",
      "tr": "ahlahu"
    },
    {
      "ar": "وَمِثْلَهُم",
      "im": "وَمِثْلَهُم",
      "en": "and (the) like thereof",
      "tr": "wamith'lahum"
    },
    {
      "ar": "مَّعَهُمْ",
      "im": "مَّعَهُمْ",
      "en": "with them",
      "tr": "maʿahum"
    },
    {
      "ar": "رَحْمَةًۭ",
      "im": "رَحْمَةً",
      "en": "(as) Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "from Ourselves",
      "tr": "min"
    },
    {
      "ar": "عِندِنَا",
      "im": "عِندِنَا",
      "en": "from Ourselves",
      "tr": "ʿindinā"
    },
    {
      "ar": "وَذِكْرَىٰ",
      "im": "وَذِكْرَىٰ",
      "en": "and a reminder",
      "tr": "wadhik'rā"
    },
    {
      "ar": "لِلْعَـٰبِدِينَ",
      "im": "لِلْعَابِدِينَ",
      "en": "for the worshippers",
      "tr": "lil'ʿābidīna"
    }
  ],
  "21:85": [
    {
      "ar": "وَإِسْمَـٰعِيلَ",
      "im": "وَإِسْمَاعِيلَ",
      "en": "And Ishmael",
      "tr": "wa-is'māʿīla"
    },
    {
      "ar": "وَإِدْرِيسَ",
      "im": "وَإِدْرِيسَ",
      "en": "and Idris",
      "tr": "wa-id'rīsa"
    },
    {
      "ar": "وَذَا",
      "im": "وَذَا",
      "en": "and Dhul-Kifl",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلْكِفْلِ ۖ",
      "im": "الْكِفْلِ ۖ",
      "en": "and Dhul-Kifl",
      "tr": "l-kif'li"
    },
    {
      "ar": "كُلٌّۭ",
      "im": "كُلٌّ",
      "en": "all",
      "tr": "kullun"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "(were) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰبِرِينَ",
      "im": "الصَّابِرِينَ",
      "en": "the patient ones",
      "tr": "l-ṣābirīna"
    }
  ],
  "21:86": [
    {
      "ar": "وَأَدْخَلْنَـٰهُمْ",
      "im": "وَأَدْخَلْنَاهُمْ",
      "en": "And We admitted them",
      "tr": "wa-adkhalnāhum"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "رَحْمَتِنَآ ۖ",
      "im": "رَحْمَتِنَا ۖ",
      "en": "Our Mercy",
      "tr": "raḥmatinā"
    },
    {
      "ar": "إِنَّهُم",
      "im": "إِنَّهُم",
      "en": "Indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "(were) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "im": "الصَّالِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "21:87": [
    {
      "ar": "وَذَا",
      "im": "وَذَا",
      "en": "And Dhun-Nun",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلنُّونِ",
      "im": "النُّونِ",
      "en": "And Dhun-Nun",
      "tr": "l-nūni"
    },
    {
      "ar": "إِذ",
      "im": "إِذ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "ذَّهَبَ",
      "im": "ذَّهَبَ",
      "en": "he went",
      "tr": "dhahaba"
    },
    {
      "ar": "مُغَـٰضِبًۭا",
      "im": "مُغَاضِبًا",
      "en": "(while) angry",
      "tr": "mughāḍiban"
    },
    {
      "ar": "فَظَنَّ",
      "im": "فَظَنَّ",
      "en": "and thought",
      "tr": "faẓanna"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّن",
      "im": "لَّن",
      "en": "never",
      "tr": "lan"
    },
    {
      "ar": "نَّقْدِرَ",
      "im": "نَّقْدِرَ",
      "en": "We would decree",
      "tr": "naqdira"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "upon him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "فَنَادَىٰ",
      "im": "فَنَادَىٰ",
      "en": "Then he called",
      "tr": "fanādā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلظُّلُمَـٰتِ",
      "im": "الظُّلُمَاتِ",
      "en": "the darkness(es)",
      "tr": "l-ẓulumāti"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّآ",
      "im": "لَّا",
      "en": "(There is) no",
      "tr": "lā"
    },
    {
      "ar": "إِلَـٰهَ",
      "im": "إِلَٰهَ",
      "en": "god",
      "tr": "ilāha"
    },
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "سُبْحَـٰنَكَ",
      "im": "سُبْحَانَكَ",
      "en": "Glory be to You",
      "tr": "sub'ḥānaka"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, [I]",
      "tr": "innī"
    },
    {
      "ar": "كُنتُ",
      "im": "كُنتُ",
      "en": "I am",
      "tr": "kuntu"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "21:89": [
    {
      "ar": "وَزَكَرِيَّآ",
      "im": "وَزَكَرِيَّا",
      "en": "And Zakariya",
      "tr": "wazakariyyā"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰ",
      "im": "نَادَىٰ",
      "en": "he called",
      "tr": "nādā"
    },
    {
      "ar": "رَبَّهُۥ",
      "im": "رَبَّهُ",
      "en": "(to) his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَذَرْنِى",
      "im": "تَذَرْنِي",
      "en": "leave me",
      "tr": "tadharnī"
    },
    {
      "ar": "فَرْدًۭا",
      "im": "فَرْدًا",
      "en": "alone",
      "tr": "fardan"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "while You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are) [the] Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْوَٰرِثِينَ",
      "im": "الْوَارِثِينَ",
      "en": "(of) the inheritors",
      "tr": "l-wārithīna"
    }
  ],
  "21:112": [
    {
      "ar": "قَـٰلَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱحْكُم",
      "im": "احْكُم",
      "en": "judge",
      "tr": "uḥ'kum"
    },
    {
      "ar": "بِٱلْحَقِّ ۗ",
      "im": "بِالْحَقِّ ۗ",
      "en": "in truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَرَبُّنَا",
      "im": "وَرَبُّنَا",
      "en": "And our Lord",
      "tr": "warabbunā"
    },
    {
      "ar": "ٱلرَّحْمَـٰنُ",
      "im": "الرَّحْمَٰنُ",
      "en": "(is) the Most Gracious",
      "tr": "l-raḥmānu"
    },
    {
      "ar": "ٱلْمُسْتَعَانُ",
      "im": "الْمُسْتَعَانُ",
      "en": "the One Whose help is sought",
      "tr": "l-mus'taʿānu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَصِفُونَ",
      "im": "تَصِفُونَ",
      "en": "you attribute",
      "tr": "taṣifūna"
    }
  ],
  "23:28": [
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "And when",
      "tr": "fa-idhā"
    },
    {
      "ar": "ٱسْتَوَيْتَ",
      "im": "اسْتَوَيْتَ",
      "en": "you (have) boarded",
      "tr": "is'tawayta"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "مَّعَكَ",
      "im": "مَّعَكَ",
      "en": "(is) with you",
      "tr": "maʿaka"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "[on]",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْفُلْكِ",
      "im": "الْفُلْكِ",
      "en": "the ship",
      "tr": "l-ful'ki"
    },
    {
      "ar": "فَقُلِ",
      "im": "فَقُلِ",
      "en": "then say",
      "tr": "faquli"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "im": "الْحَمْدُ",
      "en": "Praise",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "(be) to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "Who",
      "tr": "alladhī"
    },
    {
      "ar": "نَجَّىٰنَا",
      "im": "نَجَّانَا",
      "en": "(has) saved us",
      "tr": "najjānā"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "23:29": [
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَنزِلْنِى",
      "im": "أَنزِلْنِي",
      "en": "cause me to land",
      "tr": "anzil'nī"
    },
    {
      "ar": "مُنزَلًۭا",
      "im": "مُنزَلًا",
      "en": "(at) a landing place",
      "tr": "munzalan"
    },
    {
      "ar": "مُّبَارَكًۭا",
      "im": "مُّبَارَكًا",
      "en": "blessed",
      "tr": "mubārakan"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are) the Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْمُنزِلِينَ",
      "im": "الْمُنزِلِينَ",
      "en": "(of) those who cause to land.'",
      "tr": "l-munzilīna"
    }
  ],
  "23:93": [
    {
      "ar": "قُل",
      "im": "قُل",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِمَّا",
      "im": "إِمَّا",
      "en": "If",
      "tr": "immā"
    },
    {
      "ar": "تُرِيَنِّى",
      "im": "تُرِيَنِّي",
      "en": "You should show me",
      "tr": "turiyannī"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يُوعَدُونَ",
      "im": "يُوعَدُونَ",
      "en": "they are promised",
      "tr": "yūʿadūna"
    }
  ],
  "23:94": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "then (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَجْعَلْنِى",
      "im": "تَجْعَلْنِي",
      "en": "place me",
      "tr": "tajʿalnī"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "23:97": [
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَعُوذُ",
      "im": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "im": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "هَمَزَٰتِ",
      "im": "هَمَزَاتِ",
      "en": "(the) suggestions",
      "tr": "hamazāti"
    },
    {
      "ar": "ٱلشَّيَـٰطِينِ",
      "im": "الشَّيَاطِينِ",
      "en": "(of) the evil ones",
      "tr": "l-shayāṭīni"
    }
  ],
  "23:98": [
    {
      "ar": "وَأَعُوذُ",
      "im": "وَأَعُوذُ",
      "en": "And I seek refuge",
      "tr": "wa-aʿūdhu"
    },
    {
      "ar": "بِكَ",
      "im": "بِكَ",
      "en": "in You",
      "tr": "bika"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "Lest",
      "tr": "an"
    },
    {
      "ar": "يَحْضُرُونِ",
      "im": "يَحْضُرُونِ",
      "en": "they be present with me",
      "tr": "yaḥḍurūni"
    }
  ],
  "23:118": [
    {
      "ar": "وَقُل",
      "im": "وَقُل",
      "en": "And say",
      "tr": "waqul"
    },
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "im": "اغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "وَٱرْحَمْ",
      "im": "وَارْحَمْ",
      "en": "and have mercy",
      "tr": "wa-ir'ḥam"
    },
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "and You",
      "tr": "wa-anta"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are the) Best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلرَّٰحِمِينَ",
      "im": "الرَّاحِمِينَ",
      "en": "(of) those who show mercy",
      "tr": "l-rāḥimīna"
    }
  ],
  "25:65": [
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱصْرِفْ",
      "im": "اصْرِفْ",
      "en": "Avert",
      "tr": "iṣ'rif"
    },
    {
      "ar": "عَنَّا",
      "im": "عَنَّا",
      "en": "from us",
      "tr": "ʿannā"
    },
    {
      "ar": "عَذَابَ",
      "im": "عَذَابَ",
      "en": "the punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "جَهَنَّمَ ۖ",
      "im": "جَهَنَّمَ ۖ",
      "en": "(of) Hell",
      "tr": "jahannama"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "عَذَابَهَا",
      "im": "عَذَابَهَا",
      "en": "its punishment",
      "tr": "ʿadhābahā"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "غَرَامًا",
      "im": "غَرَامًا",
      "en": "inseparable",
      "tr": "gharāman"
    }
  ],
  "25:66": [
    {
      "ar": "إِنَّهَا",
      "im": "إِنَّهَا",
      "en": "Indeed, it",
      "tr": "innahā"
    },
    {
      "ar": "سَآءَتْ",
      "im": "سَاءَتْ",
      "en": "(is) an evil",
      "tr": "sāat"
    },
    {
      "ar": "مُسْتَقَرًّۭا",
      "im": "مُسْتَقَرًّا",
      "en": "abode",
      "tr": "mus'taqarran"
    },
    {
      "ar": "وَمُقَامًۭا",
      "im": "وَمُقَامًا",
      "en": "and resting place",
      "tr": "wamuqāman"
    }
  ],
  "25:74": [
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "هَبْ",
      "im": "هَبْ",
      "en": "Grant",
      "tr": "hab"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَزْوَٰجِنَا",
      "im": "أَزْوَاجِنَا",
      "en": "our spouses",
      "tr": "azwājinā"
    },
    {
      "ar": "وَذُرِّيَّـٰتِنَا",
      "im": "وَذُرِّيَّاتِنَا",
      "en": "and our offspring",
      "tr": "wadhurriyyātinā"
    },
    {
      "ar": "قُرَّةَ",
      "im": "قُرَّةَ",
      "en": "comfort",
      "tr": "qurrata"
    },
    {
      "ar": "أَعْيُنٍۢ",
      "im": "أَعْيُنٍ",
      "en": "(to) our eyes",
      "tr": "aʿyunin"
    },
    {
      "ar": "وَٱجْعَلْنَا",
      "im": "وَاجْعَلْنَا",
      "en": "and make us",
      "tr": "wa-ij'ʿalnā"
    },
    {
      "ar": "لِلْمُتَّقِينَ",
      "im": "لِلْمُتَّقِينَ",
      "en": "for the righteous",
      "tr": "lil'muttaqīna"
    },
    {
      "ar": "إِمَامًا",
      "im": "إِمَامًا",
      "en": "a leader",
      "tr": "imāman"
    }
  ],
  "26:78": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "خَلَقَنِى",
      "im": "خَلَقَنِي",
      "en": "created me",
      "tr": "khalaqanī"
    },
    {
      "ar": "فَهُوَ",
      "im": "فَهُوَ",
      "en": "and He",
      "tr": "fahuwa"
    },
    {
      "ar": "يَهْدِينِ",
      "im": "يَهْدِينِ",
      "en": "guides me",
      "tr": "yahdīni"
    }
  ],
  "26:79": [
    {
      "ar": "وَٱلَّذِى",
      "im": "وَالَّذِي",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "[He]",
      "tr": "huwa"
    },
    {
      "ar": "يُطْعِمُنِى",
      "im": "يُطْعِمُنِي",
      "en": "gives me food",
      "tr": "yuṭ'ʿimunī"
    },
    {
      "ar": "وَيَسْقِينِ",
      "im": "وَيَسْقِينِ",
      "en": "and gives me drink",
      "tr": "wayasqīni"
    }
  ],
  "26:80": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "مَرِضْتُ",
      "im": "مَرِضْتُ",
      "en": "I am ill",
      "tr": "mariḍ'tu"
    },
    {
      "ar": "فَهُوَ",
      "im": "فَهُوَ",
      "en": "then He",
      "tr": "fahuwa"
    },
    {
      "ar": "يَشْفِينِ",
      "im": "يَشْفِينِ",
      "en": "cures me",
      "tr": "yashfīni"
    }
  ],
  "26:81": [
    {
      "ar": "وَٱلَّذِى",
      "im": "وَالَّذِي",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "يُمِيتُنِى",
      "im": "يُمِيتُنِي",
      "en": "will cause me to die",
      "tr": "yumītunī"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "يُحْيِينِ",
      "im": "يُحْيِينِ",
      "en": "he will give me life",
      "tr": "yuḥ'yīni"
    }
  ],
  "26:82": [
    {
      "ar": "وَٱلَّذِىٓ",
      "im": "وَالَّذِي",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "أَطْمَعُ",
      "im": "أَطْمَعُ",
      "en": "I hope",
      "tr": "aṭmaʿu"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يَغْفِرَ",
      "im": "يَغْفِرَ",
      "en": "He will forgive",
      "tr": "yaghfira"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "خَطِيٓـَٔتِى",
      "im": "خَطِيئَتِي",
      "en": "my faults",
      "tr": "khaṭīatī"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "26:83": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "im": "هَبْ",
      "en": "Grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "حُكْمًۭا",
      "im": "حُكْمًا",
      "en": "wisdom",
      "tr": "ḥuk'man"
    },
    {
      "ar": "وَأَلْحِقْنِى",
      "im": "وَأَلْحِقْنِي",
      "en": "and join me",
      "tr": "wa-alḥiq'nī"
    },
    {
      "ar": "بِٱلصَّـٰلِحِينَ",
      "im": "بِالصَّالِحِينَ",
      "en": "with the righteous",
      "tr": "bil-ṣāliḥīna"
    }
  ],
  "26:84": [
    {
      "ar": "وَٱجْعَل",
      "im": "وَاجْعَل",
      "en": "And grant",
      "tr": "wa-ij'ʿal"
    },
    {
      "ar": "لِّى",
      "im": "لِّي",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "لِسَانَ",
      "im": "لِسَانَ",
      "en": "a mention",
      "tr": "lisāna"
    },
    {
      "ar": "صِدْقٍۢ",
      "im": "صِدْقٍ",
      "en": "(of) honor",
      "tr": "ṣid'qin"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرِينَ",
      "im": "الْآخِرِينَ",
      "en": "the later (generations)",
      "tr": "l-ākhirīna"
    }
  ],
  "26:85": [
    {
      "ar": "وَٱجْعَلْنِى",
      "im": "وَاجْعَلْنِي",
      "en": "And make me",
      "tr": "wa-ij'ʿalnī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "وَرَثَةِ",
      "im": "وَرَثَةِ",
      "en": "(the) inheritors",
      "tr": "warathati"
    },
    {
      "ar": "جَنَّةِ",
      "im": "جَنَّةِ",
      "en": "(of) Garden(s)",
      "tr": "jannati"
    },
    {
      "ar": "ٱلنَّعِيمِ",
      "im": "النَّعِيمِ",
      "en": "(of) Delight",
      "tr": "l-naʿīmi"
    }
  ],
  "26:87": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُخْزِنِى",
      "im": "تُخْزِنِي",
      "en": "disgrace me",
      "tr": "tukh'zinī"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "يُبْعَثُونَ",
      "im": "يُبْعَثُونَ",
      "en": "they are resurrected",
      "tr": "yub'ʿathūna"
    }
  ],
  "26:88": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَنفَعُ",
      "im": "يَنفَعُ",
      "en": "will benefit",
      "tr": "yanfaʿu"
    },
    {
      "ar": "مَالٌۭ",
      "im": "مَالٌ",
      "en": "wealth",
      "tr": "mālun"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "بَنُونَ",
      "im": "بَنُونَ",
      "en": "sons",
      "tr": "banūna"
    }
  ],
  "26:89": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(he) who",
      "tr": "man"
    },
    {
      "ar": "أَتَى",
      "im": "أَتَى",
      "en": "comes",
      "tr": "atā"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "(to) Allah",
      "tr": "l-laha"
    },
    {
      "ar": "بِقَلْبٍۢ",
      "im": "بِقَلْبٍ",
      "en": "with a heart",
      "tr": "biqalbin"
    },
    {
      "ar": "سَلِيمٍۢ",
      "im": "سَلِيمٍ",
      "en": "sound",
      "tr": "salīmin"
    }
  ],
  "26:142": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "to them",
      "tr": "lahum"
    },
    {
      "ar": "أَخُوهُمْ",
      "im": "أَخُوهُمْ",
      "en": "their brother",
      "tr": "akhūhum"
    },
    {
      "ar": "صَـٰلِحٌ",
      "im": "صَالِحٌ",
      "en": "Salih",
      "tr": "ṣāliḥun"
    },
    {
      "ar": "أَلَا",
      "im": "أَلَا",
      "en": "Will not",
      "tr": "alā"
    },
    {
      "ar": "تَتَّقُونَ",
      "im": "تَتَّقُونَ",
      "en": "you fear (Allah)",
      "tr": "tattaqūna"
    }
  ],
  "26:143": [
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I am",
      "tr": "innī"
    },
    {
      "ar": "لَكُمْ",
      "im": "لَكُمْ",
      "en": "to you",
      "tr": "lakum"
    },
    {
      "ar": "رَسُولٌ",
      "im": "رَسُولٌ",
      "en": "a Messenger",
      "tr": "rasūlun"
    },
    {
      "ar": "أَمِينٌۭ",
      "im": "أَمِينٌ",
      "en": "trustworthy",
      "tr": "amīnun"
    }
  ],
  "26:144": [
    {
      "ar": "فَٱتَّقُوا۟",
      "im": "فَاتَّقُوا",
      "en": "So fear",
      "tr": "fa-ittaqū"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "وَأَطِيعُونِ",
      "im": "وَأَطِيعُونِ",
      "en": "and obey me",
      "tr": "wa-aṭīʿūni"
    }
  ],
  "26:145": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أَسْـَٔلُكُمْ",
      "im": "أَسْأَلُكُمْ",
      "en": "I ask you",
      "tr": "asalukum"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "for it",
      "tr": "ʿalayhi"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَجْرٍ ۖ",
      "im": "أَجْرٍ ۖ",
      "en": "payment",
      "tr": "ajrin"
    },
    {
      "ar": "إِنْ",
      "im": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "أَجْرِىَ",
      "im": "أَجْرِيَ",
      "en": "(is) my payment",
      "tr": "ajriya"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "from",
      "tr": "ʿalā"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "(the) Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "26:146": [
    {
      "ar": "أَتُتْرَكُونَ",
      "im": "أَتُتْرَكُونَ",
      "en": "Will you be left",
      "tr": "atut'rakūna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "هَـٰهُنَآ",
      "im": "هَاهُنَا",
      "en": "(is) here",
      "tr": "hāhunā"
    },
    {
      "ar": "ءَامِنِينَ",
      "im": "آمِنِينَ",
      "en": "secure",
      "tr": "āminīna"
    }
  ],
  "26:147": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "im": "جَنَّاتٍ",
      "en": "gardens",
      "tr": "jannātin"
    },
    {
      "ar": "وَعُيُونٍۢ",
      "im": "وَعُيُونٍ",
      "en": "and springs",
      "tr": "waʿuyūnin"
    }
  ],
  "26:148": [
    {
      "ar": "وَزُرُوعٍۢ",
      "im": "وَزُرُوعٍ",
      "en": "And cornfields",
      "tr": "wazurūʿin"
    },
    {
      "ar": "وَنَخْلٍۢ",
      "im": "وَنَخْلٍ",
      "en": "and date-palms",
      "tr": "wanakhlin"
    },
    {
      "ar": "طَلْعُهَا",
      "im": "طَلْعُهَا",
      "en": "its spadix",
      "tr": "ṭalʿuhā"
    },
    {
      "ar": "هَضِيمٌۭ",
      "im": "هَضِيمٌ",
      "en": "soft",
      "tr": "haḍīmun"
    }
  ],
  "26:149": [
    {
      "ar": "وَتَنْحِتُونَ",
      "im": "وَتَنْحِتُونَ",
      "en": "And you carve",
      "tr": "watanḥitūna"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْجِبَالِ",
      "im": "الْجِبَالِ",
      "en": "the mountains",
      "tr": "l-jibāli"
    },
    {
      "ar": "بُيُوتًۭا",
      "im": "بُيُوتًا",
      "en": "houses",
      "tr": "buyūtan"
    },
    {
      "ar": "فَـٰرِهِينَ",
      "im": "فَارِهِينَ",
      "en": "skillfully",
      "tr": "fārihīna"
    }
  ],
  "26:150": [
    {
      "ar": "فَٱتَّقُوا۟",
      "im": "فَاتَّقُوا",
      "en": "So fear",
      "tr": "fa-ittaqū"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "وَأَطِيعُونِ",
      "im": "وَأَطِيعُونِ",
      "en": "and obey me",
      "tr": "wa-aṭīʿūni"
    }
  ],
  "26:151": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُطِيعُوٓا۟",
      "im": "تُطِيعُوا",
      "en": "obey",
      "tr": "tuṭīʿū"
    },
    {
      "ar": "أَمْرَ",
      "im": "أَمْرَ",
      "en": "(the) command",
      "tr": "amra"
    },
    {
      "ar": "ٱلْمُسْرِفِينَ",
      "im": "الْمُسْرِفِينَ",
      "en": "(of) the transgressors",
      "tr": "l-mus'rifīna"
    }
  ],
  "26:152": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يُفْسِدُونَ",
      "im": "يُفْسِدُونَ",
      "en": "spread corruption",
      "tr": "yuf'sidūna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "im": "الْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "يُصْلِحُونَ",
      "im": "يُصْلِحُونَ",
      "en": "reform",
      "tr": "yuṣ'liḥūna"
    }
  ],
  "26:153": [
    {
      "ar": "قَالُوٓا۟",
      "im": "قَالُوا",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "إِنَّمَآ",
      "im": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "(are) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُسَحَّرِينَ",
      "im": "الْمُسَحَّرِينَ",
      "en": "those bewitched",
      "tr": "l-musaḥarīna"
    }
  ],
  "26:154": [
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "Not",
      "tr": "mā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "(are) except",
      "tr": "illā"
    },
    {
      "ar": "بَشَرٌۭ",
      "im": "بَشَرٌ",
      "en": "a man",
      "tr": "basharun"
    },
    {
      "ar": "مِّثْلُنَا",
      "im": "مِّثْلُنَا",
      "en": "like us",
      "tr": "mith'lunā"
    },
    {
      "ar": "فَأْتِ",
      "im": "فَأْتِ",
      "en": "so bring",
      "tr": "fati"
    },
    {
      "ar": "بِـَٔايَةٍ",
      "im": "بِآيَةٍ",
      "en": "a sign",
      "tr": "biāyatin"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كُنتَ",
      "im": "كُنتَ",
      "en": "you",
      "tr": "kunta"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "(are) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰدِقِينَ",
      "im": "الصَّادِقِينَ",
      "en": "the truthful",
      "tr": "l-ṣādiqīna"
    }
  ],
  "26:155": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "هَـٰذِهِۦ",
      "im": "هَٰذِهِ",
      "en": "This",
      "tr": "hādhihi"
    },
    {
      "ar": "نَاقَةٌۭ",
      "im": "نَاقَةٌ",
      "en": "(is) a she-camel",
      "tr": "nāqatun"
    },
    {
      "ar": "لَّهَا",
      "im": "لَّهَا",
      "en": "For her",
      "tr": "lahā"
    },
    {
      "ar": "شِرْبٌۭ",
      "im": "شِرْبٌ",
      "en": "(is a share of) drink",
      "tr": "shir'bun"
    },
    {
      "ar": "وَلَكُمْ",
      "im": "وَلَكُمْ",
      "en": "and for you",
      "tr": "walakum"
    },
    {
      "ar": "شِرْبُ",
      "im": "شِرْبُ",
      "en": "(is a share of) drink",
      "tr": "shir'bu"
    },
    {
      "ar": "يَوْمٍۢ",
      "im": "يَوْمٍ",
      "en": "(on) a day",
      "tr": "yawmin"
    },
    {
      "ar": "مَّعْلُومٍۢ",
      "im": "مَّعْلُومٍ",
      "en": "known",
      "tr": "maʿlūmin"
    }
  ],
  "26:156": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَمَسُّوهَا",
      "im": "تَمَسُّوهَا",
      "en": "touch her",
      "tr": "tamassūhā"
    },
    {
      "ar": "بِسُوٓءٍۢ",
      "im": "بِسُوءٍ",
      "en": "with harm",
      "tr": "bisūin"
    },
    {
      "ar": "فَيَأْخُذَكُمْ",
      "im": "فَيَأْخُذَكُمْ",
      "en": "lest seize you",
      "tr": "fayakhudhakum"
    },
    {
      "ar": "عَذَابُ",
      "im": "عَذَابُ",
      "en": "(the) punishment",
      "tr": "ʿadhābu"
    },
    {
      "ar": "يَوْمٍ",
      "im": "يَوْمٍ",
      "en": "(of) a Day",
      "tr": "yawmin"
    },
    {
      "ar": "عَظِيمٍۢ",
      "im": "عَظِيمٍ",
      "en": "Great",
      "tr": "ʿaẓīmin"
    }
  ],
  "26:157": [
    {
      "ar": "فَعَقَرُوهَا",
      "im": "فَعَقَرُوهَا",
      "en": "But they hamstrung her",
      "tr": "faʿaqarūhā"
    },
    {
      "ar": "فَأَصْبَحُوا۟",
      "im": "فَأَصْبَحُوا",
      "en": "then they became",
      "tr": "fa-aṣbaḥū"
    },
    {
      "ar": "نَـٰدِمِينَ",
      "im": "نَادِمِينَ",
      "en": "regretful",
      "tr": "nādimīna"
    }
  ],
  "26:158": [
    {
      "ar": "فَأَخَذَهُمُ",
      "im": "فَأَخَذَهُمُ",
      "en": "So seized them",
      "tr": "fa-akhadhahumu"
    },
    {
      "ar": "ٱلْعَذَابُ ۗ",
      "im": "الْعَذَابُ ۗ",
      "en": "the punishment",
      "tr": "l-ʿadhābu"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "لَـَٔايَةًۭ ۖ",
      "im": "لَآيَةً ۖ",
      "en": "surely is a sign",
      "tr": "laāyatan"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "but not",
      "tr": "wamā"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "are",
      "tr": "kāna"
    },
    {
      "ar": "أَكْثَرُهُم",
      "im": "أَكْثَرُهُم",
      "en": "most of them",
      "tr": "aktharuhum"
    },
    {
      "ar": "مُّؤْمِنِينَ",
      "im": "مُّؤْمِنِينَ",
      "en": "believers",
      "tr": "mu'minīna"
    }
  ],
  "26:159": [
    {
      "ar": "وَإِنَّ",
      "im": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "رَبَّكَ",
      "im": "رَبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "لَهُوَ",
      "im": "لَهُوَ",
      "en": "surely He",
      "tr": "lahuwa"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "im": "الْعَزِيزُ",
      "en": "(is) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "im": "الرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
    }
  ],
  "26:169": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "نَجِّنِى",
      "im": "نَجِّنِي",
      "en": "Save me",
      "tr": "najjinī"
    },
    {
      "ar": "وَأَهْلِى",
      "im": "وَأَهْلِي",
      "en": "and my family",
      "tr": "wa-ahlī"
    },
    {
      "ar": "مِمَّا",
      "im": "مِمَّا",
      "en": "from what",
      "tr": "mimmā"
    },
    {
      "ar": "يَعْمَلُونَ",
      "im": "يَعْمَلُونَ",
      "en": "they do",
      "tr": "yaʿmalūna"
    }
  ],
  "27:15": [
    {
      "ar": "وَلَقَدْ",
      "im": "وَلَقَدْ",
      "en": "And verily",
      "tr": "walaqad"
    },
    {
      "ar": "ءَاتَيْنَا",
      "im": "آتَيْنَا",
      "en": "We gave",
      "tr": "ātaynā"
    },
    {
      "ar": "دَاوُۥدَ",
      "im": "دَاوُودَ",
      "en": "Dawood",
      "tr": "dāwūda"
    },
    {
      "ar": "وَسُلَيْمَـٰنَ",
      "im": "وَسُلَيْمَانَ",
      "en": "and Sulaiman",
      "tr": "wasulaymāna"
    },
    {
      "ar": "عِلْمًۭا ۖ",
      "im": "عِلْمًا ۖ",
      "en": "knowledge",
      "tr": "ʿil'man"
    },
    {
      "ar": "وَقَالَا",
      "im": "وَقَالَا",
      "en": "and they said",
      "tr": "waqālā"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "im": "الْحَمْدُ",
      "en": "Praise be",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "im": "لِلَّهِ",
      "en": "to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "فَضَّلَنَا",
      "im": "فَضَّلَنَا",
      "en": "has favored us",
      "tr": "faḍḍalanā"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "كَثِيرٍۢ",
      "im": "كَثِيرٍ",
      "en": "many",
      "tr": "kathīrin"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِبَادِهِ",
      "im": "عِبَادِهِ",
      "en": "His servants",
      "tr": "ʿibādihi"
    },
    {
      "ar": "ٱلْمُؤْمِنِينَ",
      "im": "الْمُؤْمِنِينَ",
      "en": "the believers",
      "tr": "l-mu'minīna"
    }
  ],
  "27:19": [
    {
      "ar": "فَتَبَسَّمَ",
      "im": "فَتَبَسَّمَ",
      "en": "So he smiled",
      "tr": "fatabassama"
    },
    {
      "ar": "ضَاحِكًۭا",
      "im": "ضَاحِكًا",
      "en": "laughing",
      "tr": "ḍāḥikan"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "at",
      "tr": "min"
    },
    {
      "ar": "قَوْلِهَا",
      "im": "قَوْلِهَا",
      "en": "her speech",
      "tr": "qawlihā"
    },
    {
      "ar": "وَقَالَ",
      "im": "وَقَالَ",
      "en": "and said",
      "tr": "waqāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَوْزِعْنِىٓ",
      "im": "أَوْزِعْنِي",
      "en": "Grant me (the) power",
      "tr": "awziʿ'nī"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَشْكُرَ",
      "im": "أَشْكُرَ",
      "en": "I may thank You",
      "tr": "ashkura"
    },
    {
      "ar": "نِعْمَتَكَ",
      "im": "نِعْمَتَكَ",
      "en": "(for) Your Favor",
      "tr": "niʿ'mataka"
    },
    {
      "ar": "ٱلَّتِىٓ",
      "im": "الَّتِي",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "أَنْعَمْتَ",
      "im": "أَنْعَمْتَ",
      "en": "You have bestowed",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "im": "عَلَيَّ",
      "en": "on me",
      "tr": "ʿalayya"
    },
    {
      "ar": "وَعَلَىٰ",
      "im": "وَعَلَىٰ",
      "en": "and on",
      "tr": "waʿalā"
    },
    {
      "ar": "وَٰلِدَىَّ",
      "im": "وَالِدَيَّ",
      "en": "my parents",
      "tr": "wālidayya"
    },
    {
      "ar": "وَأَنْ",
      "im": "وَأَنْ",
      "en": "and that",
      "tr": "wa-an"
    },
    {
      "ar": "أَعْمَلَ",
      "im": "أَعْمَلَ",
      "en": "I may do",
      "tr": "aʿmala"
    },
    {
      "ar": "صَـٰلِحًۭا",
      "im": "صَالِحًا",
      "en": "righteous (deeds)",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "تَرْضَىٰهُ",
      "im": "تَرْضَاهُ",
      "en": "that will please You",
      "tr": "tarḍāhu"
    },
    {
      "ar": "وَأَدْخِلْنِى",
      "im": "وَأَدْخِلْنِي",
      "en": "And admit me",
      "tr": "wa-adkhil'nī"
    },
    {
      "ar": "بِرَحْمَتِكَ",
      "im": "بِرَحْمَتِكَ",
      "en": "by Your Mercy",
      "tr": "biraḥmatika"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "عِبَادِكَ",
      "im": "عِبَادِكَ",
      "en": "Your slaves",
      "tr": "ʿibādika"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "im": "الصَّالِحِينَ",
      "en": "righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "27:40": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "one who",
      "tr": "alladhī"
    },
    {
      "ar": "عِندَهُۥ",
      "im": "عِندَهُ",
      "en": "with him",
      "tr": "ʿindahu"
    },
    {
      "ar": "عِلْمٌۭ",
      "im": "عِلْمٌ",
      "en": "(was) knowledge",
      "tr": "ʿil'mun"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "im": "الْكِتَابِ",
      "en": "the Scripture",
      "tr": "l-kitābi"
    },
    {
      "ar": "أَنَا۠",
      "im": "أَنَا",
      "en": "I",
      "tr": "anā"
    },
    {
      "ar": "ءَاتِيكَ",
      "im": "آتِيكَ",
      "en": "will bring it to you",
      "tr": "ātīka"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "will bring it to you",
      "tr": "bihi"
    },
    {
      "ar": "قَبْلَ",
      "im": "قَبْلَ",
      "en": "before",
      "tr": "qabla"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَرْتَدَّ",
      "im": "يَرْتَدَّ",
      "en": "returns",
      "tr": "yartadda"
    },
    {
      "ar": "إِلَيْكَ",
      "im": "إِلَيْكَ",
      "en": "to you",
      "tr": "ilayka"
    },
    {
      "ar": "طَرْفُكَ ۚ",
      "im": "طَرْفُكَ ۚ",
      "en": "your glance",
      "tr": "ṭarfuka"
    },
    {
      "ar": "فَلَمَّا",
      "im": "فَلَمَّا",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "رَءَاهُ",
      "im": "رَآهُ",
      "en": "he saw it",
      "tr": "raāhu"
    },
    {
      "ar": "مُسْتَقِرًّا",
      "im": "مُسْتَقِرًّا",
      "en": "placed",
      "tr": "mus'taqirran"
    },
    {
      "ar": "عِندَهُۥ",
      "im": "عِندَهُ",
      "en": "before him",
      "tr": "ʿindahu"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "This",
      "tr": "hādhā"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "(is) from",
      "tr": "min"
    },
    {
      "ar": "فَضْلِ",
      "im": "فَضْلِ",
      "en": "(the) Favor",
      "tr": "faḍli"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "(of) my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لِيَبْلُوَنِىٓ",
      "im": "لِيَبْلُوَنِي",
      "en": "to test me",
      "tr": "liyabluwanī"
    },
    {
      "ar": "ءَأَشْكُرُ",
      "im": "أَأَشْكُرُ",
      "en": "whether I am grateful",
      "tr": "a-ashkuru"
    },
    {
      "ar": "أَمْ",
      "im": "أَمْ",
      "en": "or",
      "tr": "am"
    },
    {
      "ar": "أَكْفُرُ ۖ",
      "im": "أَكْفُرُ ۖ",
      "en": "I am ungrateful",
      "tr": "akfuru"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "شَكَرَ",
      "im": "شَكَرَ",
      "en": "(is) grateful",
      "tr": "shakara"
    },
    {
      "ar": "فَإِنَّمَا",
      "im": "فَإِنَّمَا",
      "en": "then only",
      "tr": "fa-innamā"
    },
    {
      "ar": "يَشْكُرُ",
      "im": "يَشْكُرُ",
      "en": "he is grateful",
      "tr": "yashkuru"
    },
    {
      "ar": "لِنَفْسِهِۦ ۖ",
      "im": "لِنَفْسِهِ ۖ",
      "en": "for his own soul",
      "tr": "linafsihi"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "كَفَرَ",
      "im": "كَفَرَ",
      "en": "(is) ungrateful",
      "tr": "kafara"
    },
    {
      "ar": "فَإِنَّ",
      "im": "فَإِنَّ",
      "en": "then indeed",
      "tr": "fa-inna"
    },
    {
      "ar": "رَبِّى",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "غَنِىٌّۭ",
      "im": "غَنِيٌّ",
      "en": "(is) Self-sufficient",
      "tr": "ghaniyyun"
    },
    {
      "ar": "كَرِيمٌۭ",
      "im": "كَرِيمٌ",
      "en": "Noble",
      "tr": "karīmun"
    }
  ],
  "28:16": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "ظَلَمْتُ",
      "im": "ظَلَمْتُ",
      "en": "[I] have wronged",
      "tr": "ẓalamtu"
    },
    {
      "ar": "نَفْسِى",
      "im": "نَفْسِي",
      "en": "my soul",
      "tr": "nafsī"
    },
    {
      "ar": "فَٱغْفِرْ",
      "im": "فَاغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "[for] me",
      "tr": "lī"
    },
    {
      "ar": "فَغَفَرَ",
      "im": "فَغَفَرَ",
      "en": "Then He forgave",
      "tr": "faghafara"
    },
    {
      "ar": "لَهُۥٓ ۚ",
      "im": "لَهُ ۚ",
      "en": "[for] him",
      "tr": "lahu"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed He",
      "tr": "innahu"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He (is)",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْغَفُورُ",
      "im": "الْغَفُورُ",
      "en": "the Oft-Forgiving",
      "tr": "l-ghafūru"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "im": "الرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
    }
  ],
  "28:17": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "بِمَآ",
      "im": "بِمَا",
      "en": "Because",
      "tr": "bimā"
    },
    {
      "ar": "أَنْعَمْتَ",
      "im": "أَنْعَمْتَ",
      "en": "You have favored",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "im": "عَلَيَّ",
      "en": "[on] me",
      "tr": "ʿalayya"
    },
    {
      "ar": "فَلَنْ",
      "im": "فَلَنْ",
      "en": "so not",
      "tr": "falan"
    },
    {
      "ar": "أَكُونَ",
      "im": "أَكُونَ",
      "en": "I will be",
      "tr": "akūna"
    },
    {
      "ar": "ظَهِيرًۭا",
      "im": "ظَهِيرًا",
      "en": "a supporter",
      "tr": "ẓahīran"
    },
    {
      "ar": "لِّلْمُجْرِمِينَ",
      "im": "لِّلْمُجْرِمِينَ",
      "en": "(of) the criminals",
      "tr": "lil'muj'rimīna"
    }
  ],
  "28:21": [
    {
      "ar": "فَخَرَجَ",
      "im": "فَخَرَجَ",
      "en": "So he left",
      "tr": "fakharaja"
    },
    {
      "ar": "مِنْهَا",
      "im": "مِنْهَا",
      "en": "from it",
      "tr": "min'hā"
    },
    {
      "ar": "خَآئِفًۭا",
      "im": "خَائِفًا",
      "en": "fearing",
      "tr": "khāifan"
    },
    {
      "ar": "يَتَرَقَّبُ ۖ",
      "im": "يَتَرَقَّبُ ۖ",
      "en": "(and) vigilant",
      "tr": "yataraqqabu"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "نَجِّنِى",
      "im": "نَجِّنِي",
      "en": "Save me",
      "tr": "najjinī"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "28:22": [
    {
      "ar": "وَلَمَّا",
      "im": "وَلَمَّا",
      "en": "And when",
      "tr": "walammā"
    },
    {
      "ar": "تَوَجَّهَ",
      "im": "تَوَجَّهَ",
      "en": "he turned his face",
      "tr": "tawajjaha"
    },
    {
      "ar": "تِلْقَآءَ",
      "im": "تِلْقَاءَ",
      "en": "towards",
      "tr": "til'qāa"
    },
    {
      "ar": "مَدْيَنَ",
      "im": "مَدْيَنَ",
      "en": "Madyan",
      "tr": "madyana"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "عَسَىٰ",
      "im": "عَسَىٰ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "رَبِّىٓ",
      "im": "رَبِّي",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَهْدِيَنِى",
      "im": "يَهْدِيَنِي",
      "en": "will guide me",
      "tr": "yahdiyanī"
    },
    {
      "ar": "سَوَآءَ",
      "im": "سَوَاءَ",
      "en": "(to the) sound",
      "tr": "sawāa"
    },
    {
      "ar": "ٱلسَّبِيلِ",
      "im": "السَّبِيلِ",
      "en": "way",
      "tr": "l-sabīli"
    }
  ],
  "28:24": [
    {
      "ar": "فَسَقَىٰ",
      "im": "فَسَقَىٰ",
      "en": "So he watered",
      "tr": "fasaqā"
    },
    {
      "ar": "لَهُمَا",
      "im": "لَهُمَا",
      "en": "for them",
      "tr": "lahumā"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "تَوَلَّىٰٓ",
      "im": "تَوَلَّىٰ",
      "en": "he turned back",
      "tr": "tawallā"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱلظِّلِّ",
      "im": "الظِّلِّ",
      "en": "the shade",
      "tr": "l-ẓili"
    },
    {
      "ar": "فَقَالَ",
      "im": "فَقَالَ",
      "en": "and said",
      "tr": "faqāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "Indeed, I am",
      "tr": "innī"
    },
    {
      "ar": "لِمَآ",
      "im": "لِمَا",
      "en": "of whatever",
      "tr": "limā"
    },
    {
      "ar": "أَنزَلْتَ",
      "im": "أَنزَلْتَ",
      "en": "You send",
      "tr": "anzalta"
    },
    {
      "ar": "إِلَىَّ",
      "im": "إِلَيَّ",
      "en": "to me",
      "tr": "ilayya"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "خَيْرٍۢ",
      "im": "خَيْرٍ",
      "en": "good",
      "tr": "khayrin"
    },
    {
      "ar": "فَقِيرٌۭ",
      "im": "فَقِيرٌ",
      "en": "(in) need",
      "tr": "faqīrun"
    }
  ],
  "29:30": [
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱنصُرْنِى",
      "im": "انصُرْنِي",
      "en": "Help me",
      "tr": "unṣur'nī"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "against",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلْمُفْسِدِينَ",
      "im": "الْمُفْسِدِينَ",
      "en": "the corrupters",
      "tr": "l-muf'sidīna"
    }
  ],
  "37:100": [
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "هَبْ",
      "im": "هَبْ",
      "en": "grant",
      "tr": "hab"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "im": "الصَّالِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "37:112": [
    {
      "ar": "وَبَشَّرْنَـٰهُ",
      "im": "وَبَشَّرْنَاهُ",
      "en": "And We gave him glad tidings",
      "tr": "wabasharnāhu"
    },
    {
      "ar": "بِإِسْحَـٰقَ",
      "im": "بِإِسْحَاقَ",
      "en": "of Isaac",
      "tr": "bi-is'ḥāqa"
    },
    {
      "ar": "نَبِيًّۭا",
      "im": "نَبِيًّا",
      "en": "a Prophet",
      "tr": "nabiyyan"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "im": "الصَّالِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "37:113": [
    {
      "ar": "وَبَـٰرَكْنَا",
      "im": "وَبَارَكْنَا",
      "en": "And We blessed",
      "tr": "wabāraknā"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "وَعَلَىٰٓ",
      "im": "وَعَلَىٰ",
      "en": "and [on]",
      "tr": "waʿalā"
    },
    {
      "ar": "إِسْحَـٰقَ ۚ",
      "im": "إِسْحَاقَ ۚ",
      "en": "Isaac",
      "tr": "is'ḥāqa"
    },
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "And of",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِهِمَا",
      "im": "ذُرِّيَّتِهِمَا",
      "en": "their offspring",
      "tr": "dhurriyyatihimā"
    },
    {
      "ar": "مُحْسِنٌۭ",
      "im": "مُحْسِنٌ",
      "en": "(are) good-doers",
      "tr": "muḥ'sinun"
    },
    {
      "ar": "وَظَالِمٌۭ",
      "im": "وَظَالِمٌ",
      "en": "and unjust",
      "tr": "waẓālimun"
    },
    {
      "ar": "لِّنَفْسِهِۦ",
      "im": "لِّنَفْسِهِ",
      "en": "to himself",
      "tr": "linafsihi"
    },
    {
      "ar": "مُبِينٌۭ",
      "im": "مُبِينٌ",
      "en": "clear",
      "tr": "mubīnun"
    }
  ],
  "37:123": [
    {
      "ar": "وَإِنَّ",
      "im": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "إِلْيَاسَ",
      "im": "إِلْيَاسَ",
      "en": "Elijah",
      "tr": "il'yāsa"
    },
    {
      "ar": "لَمِنَ",
      "im": "لَمِنَ",
      "en": "(was) surely of",
      "tr": "lamina"
    },
    {
      "ar": "ٱلْمُرْسَلِينَ",
      "im": "الْمُرْسَلِينَ",
      "en": "the Messengers",
      "tr": "l-mur'salīna"
    }
  ],
  "37:124": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "لِقَوْمِهِۦٓ",
      "im": "لِقَوْمِهِ",
      "en": "to his people",
      "tr": "liqawmihi"
    },
    {
      "ar": "أَلَا",
      "im": "أَلَا",
      "en": "Will not",
      "tr": "alā"
    },
    {
      "ar": "تَتَّقُونَ",
      "im": "تَتَّقُونَ",
      "en": "you fear",
      "tr": "tattaqūna"
    }
  ],
  "37:125": [
    {
      "ar": "أَتَدْعُونَ",
      "im": "أَتَدْعُونَ",
      "en": "Do you call",
      "tr": "atadʿūna"
    },
    {
      "ar": "بَعْلًۭا",
      "im": "بَعْلًا",
      "en": "Baal",
      "tr": "baʿlan"
    },
    {
      "ar": "وَتَذَرُونَ",
      "im": "وَتَذَرُونَ",
      "en": "and you forsake",
      "tr": "watadharūna"
    },
    {
      "ar": "أَحْسَنَ",
      "im": "أَحْسَنَ",
      "en": "(the) Best",
      "tr": "aḥsana"
    },
    {
      "ar": "ٱلْخَـٰلِقِينَ",
      "im": "الْخَالِقِينَ",
      "en": "(of) Creators",
      "tr": "l-khāliqīna"
    }
  ],
  "37:126": [
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "al-laha"
    },
    {
      "ar": "رَبَّكُمْ",
      "im": "رَبَّكُمْ",
      "en": "your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "وَرَبَّ",
      "im": "وَرَبَّ",
      "en": "and (the) Lord",
      "tr": "warabba"
    },
    {
      "ar": "ءَابَآئِكُمُ",
      "im": "آبَائِكُمُ",
      "en": "(of) your forefathers",
      "tr": "ābāikumu"
    },
    {
      "ar": "ٱلْأَوَّلِينَ",
      "im": "الْأَوَّلِينَ",
      "en": "(of) your forefathers",
      "tr": "l-awalīna"
    }
  ],
  "37:127": [
    {
      "ar": "فَكَذَّبُوهُ",
      "im": "فَكَذَّبُوهُ",
      "en": "But they denied him",
      "tr": "fakadhabūhu"
    },
    {
      "ar": "فَإِنَّهُمْ",
      "im": "فَإِنَّهُمْ",
      "en": "so indeed, they",
      "tr": "fa-innahum"
    },
    {
      "ar": "لَمُحْضَرُونَ",
      "im": "لَمُحْضَرُونَ",
      "en": "(will) surely be brought",
      "tr": "lamuḥ'ḍarūna"
    }
  ],
  "37:128": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "عِبَادَ",
      "im": "عِبَادَ",
      "en": "(the) slaves",
      "tr": "ʿibāda"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ٱلْمُخْلَصِينَ",
      "im": "الْمُخْلَصِينَ",
      "en": "the chosen ones",
      "tr": "l-mukh'laṣīna"
    }
  ],
  "37:129": [
    {
      "ar": "وَتَرَكْنَا",
      "im": "وَتَرَكْنَا",
      "en": "And We left",
      "tr": "wataraknā"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "for him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرِينَ",
      "im": "الْآخِرِينَ",
      "en": "the later generations",
      "tr": "l-ākhirīna"
    }
  ],
  "37:130": [
    {
      "ar": "سَلَـٰمٌ",
      "im": "سَلَامٌ",
      "en": "Peace be",
      "tr": "salāmun"
    },
    {
      "ar": "عَلَىٰٓ",
      "im": "عَلَىٰ",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "إِلْ يَاسِينَ",
      "im": "إِلْ يَاسِينَ",
      "en": "Elijah",
      "tr": "il yāsīna"
    }
  ],
  "37:131": [
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "كَذَٰلِكَ",
      "im": "كَذَٰلِكَ",
      "en": "thus",
      "tr": "kadhālika"
    },
    {
      "ar": "نَجْزِى",
      "im": "نَجْزِي",
      "en": "reward",
      "tr": "najzī"
    },
    {
      "ar": "ٱلْمُحْسِنِينَ",
      "im": "الْمُحْسِنِينَ",
      "en": "the good-doers",
      "tr": "l-muḥ'sinīna"
    }
  ],
  "37:132": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he (was)",
      "tr": "innahu"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِبَادِنَا",
      "im": "عِبَادِنَا",
      "en": "Our slaves",
      "tr": "ʿibādinā"
    },
    {
      "ar": "ٱلْمُؤْمِنِينَ",
      "im": "الْمُؤْمِنِينَ",
      "en": "believing",
      "tr": "l-mu'minīna"
    }
  ],
  "38:41": [
    {
      "ar": "وَٱذْكُرْ",
      "im": "وَاذْكُرْ",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "عَبْدَنَآ",
      "im": "عَبْدَنَا",
      "en": "Our slave",
      "tr": "ʿabdanā"
    },
    {
      "ar": "أَيُّوبَ",
      "im": "أَيُّوبَ",
      "en": "Ayyub",
      "tr": "ayyūba"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰ",
      "im": "نَادَىٰ",
      "en": "he called",
      "tr": "nādā"
    },
    {
      "ar": "رَبَّهُۥٓ",
      "im": "رَبَّهُ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "im": "أَنِّي",
      "en": "That [I]",
      "tr": "annī"
    },
    {
      "ar": "مَسَّنِىَ",
      "im": "مَسَّنِيَ",
      "en": "(has) touched me",
      "tr": "massaniya"
    },
    {
      "ar": "ٱلشَّيْطَـٰنُ",
      "im": "الشَّيْطَانُ",
      "en": "Shaitaan",
      "tr": "l-shayṭānu"
    },
    {
      "ar": "بِنُصْبٍۢ",
      "im": "بِنُصْبٍ",
      "en": "with distress",
      "tr": "binuṣ'bin"
    },
    {
      "ar": "وَعَذَابٍ",
      "im": "وَعَذَابٍ",
      "en": "and suffering",
      "tr": "waʿadhābin"
    }
  ],
  "38:42": [
    {
      "ar": "ٱرْكُضْ",
      "im": "ارْكُضْ",
      "en": "Strike",
      "tr": "ur'kuḍ"
    },
    {
      "ar": "بِرِجْلِكَ ۖ",
      "im": "بِرِجْلِكَ ۖ",
      "en": "with your foot",
      "tr": "birij'lika"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "This",
      "tr": "hādhā"
    },
    {
      "ar": "مُغْتَسَلٌۢ",
      "im": "مُغْتَسَلٌ",
      "en": "(is a spring of) water to bathe",
      "tr": "mugh'tasalun"
    },
    {
      "ar": "بَارِدٌۭ",
      "im": "بَارِدٌ",
      "en": "cool",
      "tr": "bāridun"
    },
    {
      "ar": "وَشَرَابٌۭ",
      "im": "وَشَرَابٌ",
      "en": "and a drink",
      "tr": "washarābun"
    }
  ],
  "38:43": [
    {
      "ar": "وَوَهَبْنَا",
      "im": "وَوَهَبْنَا",
      "en": "And We granted",
      "tr": "wawahabnā"
    },
    {
      "ar": "لَهُۥٓ",
      "im": "لَهُ",
      "en": "[to] him",
      "tr": "lahu"
    },
    {
      "ar": "أَهْلَهُۥ",
      "im": "أَهْلَهُ",
      "en": "his family",
      "tr": "ahlahu"
    },
    {
      "ar": "وَمِثْلَهُم",
      "im": "وَمِثْلَهُم",
      "en": "and a like of them",
      "tr": "wamith'lahum"
    },
    {
      "ar": "مَّعَهُمْ",
      "im": "مَّعَهُمْ",
      "en": "with them",
      "tr": "maʿahum"
    },
    {
      "ar": "رَحْمَةًۭ",
      "im": "رَحْمَةً",
      "en": "a Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "مِّنَّا",
      "im": "مِّنَّا",
      "en": "from Us",
      "tr": "minnā"
    },
    {
      "ar": "وَذِكْرَىٰ",
      "im": "وَذِكْرَىٰ",
      "en": "and a Reminder",
      "tr": "wadhik'rā"
    },
    {
      "ar": "لِأُو۟لِى",
      "im": "لِأُولِي",
      "en": "for those of understanding",
      "tr": "li-ulī"
    },
    {
      "ar": "ٱلْأَلْبَـٰبِ",
      "im": "الْأَلْبَابِ",
      "en": "for those of understanding",
      "tr": "l-albābi"
    }
  ],
  "38:44": [
    {
      "ar": "وَخُذْ",
      "im": "وَخُذْ",
      "en": "And take",
      "tr": "wakhudh"
    },
    {
      "ar": "بِيَدِكَ",
      "im": "بِيَدِكَ",
      "en": "in your hand",
      "tr": "biyadika"
    },
    {
      "ar": "ضِغْثًۭا",
      "im": "ضِغْثًا",
      "en": "a bunch",
      "tr": "ḍigh'than"
    },
    {
      "ar": "فَٱضْرِب",
      "im": "فَاضْرِب",
      "en": "and strike",
      "tr": "fa-iḍ'rib"
    },
    {
      "ar": "بِّهِۦ",
      "im": "بِّهِ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَحْنَثْ ۗ",
      "im": "تَحْنَثْ ۗ",
      "en": "break (your) oath",
      "tr": "taḥnath"
    },
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "وَجَدْنَـٰهُ",
      "im": "وَجَدْنَاهُ",
      "en": "[We] found him",
      "tr": "wajadnāhu"
    },
    {
      "ar": "صَابِرًۭا ۚ",
      "im": "صَابِرًا ۚ",
      "en": "patient",
      "tr": "ṣābiran"
    },
    {
      "ar": "نِّعْمَ",
      "im": "نِّعْمَ",
      "en": "an excellent",
      "tr": "niʿ'ma"
    },
    {
      "ar": "ٱلْعَبْدُ ۖ",
      "im": "الْعَبْدُ ۖ",
      "en": "slave",
      "tr": "l-ʿabdu"
    },
    {
      "ar": "إِنَّهُۥٓ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "أَوَّابٌۭ",
      "im": "أَوَّابٌ",
      "en": "repeatedly turned",
      "tr": "awwābun"
    }
  ],
  "38:48": [
    {
      "ar": "وَٱذْكُرْ",
      "im": "وَاذْكُرْ",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "إِسْمَـٰعِيلَ",
      "im": "إِسْمَاعِيلَ",
      "en": "Ishmael",
      "tr": "is'māʿīla"
    },
    {
      "ar": "وَٱلْيَسَعَ",
      "im": "وَالْيَسَعَ",
      "en": "and Elisha",
      "tr": "wal-yasaʿa"
    },
    {
      "ar": "وَذَا",
      "im": "وَذَا",
      "en": "and Dhul-kifl",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلْكِفْلِ ۖ",
      "im": "الْكِفْلِ ۖ",
      "en": "and Dhul-kifl",
      "tr": "l-kif'li"
    },
    {
      "ar": "وَكُلٌّۭ",
      "im": "وَكُلٌّ",
      "en": "and all",
      "tr": "wakullun"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "(are) from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَخْيَارِ",
      "im": "الْأَخْيَارِ",
      "en": "the best",
      "tr": "l-akhyāri"
    }
  ],
  "40:7": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يَحْمِلُونَ",
      "im": "يَحْمِلُونَ",
      "en": "bear",
      "tr": "yaḥmilūna"
    },
    {
      "ar": "ٱلْعَرْشَ",
      "im": "الْعَرْشَ",
      "en": "the Throne",
      "tr": "l-ʿarsha"
    },
    {
      "ar": "وَمَنْ",
      "im": "وَمَنْ",
      "en": "and who",
      "tr": "waman"
    },
    {
      "ar": "حَوْلَهُۥ",
      "im": "حَوْلَهُ",
      "en": "(are) around it",
      "tr": "ḥawlahu"
    },
    {
      "ar": "يُسَبِّحُونَ",
      "im": "يُسَبِّحُونَ",
      "en": "glorify",
      "tr": "yusabbiḥūna"
    },
    {
      "ar": "بِحَمْدِ",
      "im": "بِحَمْدِ",
      "en": "(the) praises",
      "tr": "biḥamdi"
    },
    {
      "ar": "رَبِّهِمْ",
      "im": "رَبِّهِمْ",
      "en": "(of) their Lord",
      "tr": "rabbihim"
    },
    {
      "ar": "وَيُؤْمِنُونَ",
      "im": "وَيُؤْمِنُونَ",
      "en": "and believe",
      "tr": "wayu'minūna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "in Him",
      "tr": "bihi"
    },
    {
      "ar": "وَيَسْتَغْفِرُونَ",
      "im": "وَيَسْتَغْفِرُونَ",
      "en": "and ask forgiveness",
      "tr": "wayastaghfirūna"
    },
    {
      "ar": "لِلَّذِينَ",
      "im": "لِلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَسِعْتَ",
      "im": "وَسِعْتَ",
      "en": "You encompass",
      "tr": "wasiʿ'ta"
    },
    {
      "ar": "كُلَّ",
      "im": "كُلَّ",
      "en": "all",
      "tr": "kulla"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "things",
      "tr": "shayin"
    },
    {
      "ar": "رَّحْمَةًۭ",
      "im": "رَّحْمَةً",
      "en": "(by Your) Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "وَعِلْمًۭا",
      "im": "وَعِلْمًا",
      "en": "and knowledge",
      "tr": "waʿil'man"
    },
    {
      "ar": "فَٱغْفِرْ",
      "im": "فَاغْفِرْ",
      "en": "so forgive",
      "tr": "fa-igh'fir"
    },
    {
      "ar": "لِلَّذِينَ",
      "im": "لِلَّذِينَ",
      "en": "those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "تَابُوا۟",
      "im": "تَابُوا",
      "en": "repent",
      "tr": "tābū"
    },
    {
      "ar": "وَٱتَّبَعُوا۟",
      "im": "وَاتَّبَعُوا",
      "en": "and follow",
      "tr": "wa-ittabaʿū"
    },
    {
      "ar": "سَبِيلَكَ",
      "im": "سَبِيلَكَ",
      "en": "Your Way",
      "tr": "sabīlaka"
    },
    {
      "ar": "وَقِهِمْ",
      "im": "وَقِهِمْ",
      "en": "and save them (from)",
      "tr": "waqihim"
    },
    {
      "ar": "عَذَابَ",
      "im": "عَذَابَ",
      "en": "(the) punishment",
      "tr": "ʿadhāba"
    },
    {
      "ar": "ٱلْجَحِيمِ",
      "im": "الْجَحِيمِ",
      "en": "(of) the Hellfire",
      "tr": "l-jaḥīmi"
    }
  ],
  "40:8": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَأَدْخِلْهُمْ",
      "im": "وَأَدْخِلْهُمْ",
      "en": "And admit them",
      "tr": "wa-adkhil'hum"
    },
    {
      "ar": "جَنَّـٰتِ",
      "im": "جَنَّاتِ",
      "en": "(to) Gardens",
      "tr": "jannāti"
    },
    {
      "ar": "عَدْنٍ",
      "im": "عَدْنٍ",
      "en": "(of) Eden",
      "tr": "ʿadnin"
    },
    {
      "ar": "ٱلَّتِى",
      "im": "الَّتِي",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "وَعَدتَّهُمْ",
      "im": "وَعَدتَّهُمْ",
      "en": "You have promised them",
      "tr": "waʿadttahum"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "صَلَحَ",
      "im": "صَلَحَ",
      "en": "(was) righteous",
      "tr": "ṣalaḥa"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "among",
      "tr": "min"
    },
    {
      "ar": "ءَابَآئِهِمْ",
      "im": "آبَائِهِمْ",
      "en": "their fathers",
      "tr": "ābāihim"
    },
    {
      "ar": "وَأَزْوَٰجِهِمْ",
      "im": "وَأَزْوَاجِهِمْ",
      "en": "and their spouses",
      "tr": "wa-azwājihim"
    },
    {
      "ar": "وَذُرِّيَّـٰتِهِمْ ۚ",
      "im": "وَذُرِّيَّاتِهِمْ ۚ",
      "en": "and their offspring",
      "tr": "wadhurriyyātihim"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "You",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "im": "الْعَزِيزُ",
      "en": "(are) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "40:9": [
    {
      "ar": "وَقِهِمُ",
      "im": "وَقِهِمُ",
      "en": "And protect them",
      "tr": "waqihimu"
    },
    {
      "ar": "ٱلسَّيِّـَٔاتِ ۚ",
      "im": "السَّيِّئَاتِ ۚ",
      "en": "(from) the evils",
      "tr": "l-sayiāti"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "تَقِ",
      "im": "تَقِ",
      "en": "you protect",
      "tr": "taqi"
    },
    {
      "ar": "ٱلسَّيِّـَٔاتِ",
      "im": "السَّيِّئَاتِ",
      "en": "(from) the evils",
      "tr": "l-sayiāti"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "فَقَدْ",
      "im": "فَقَدْ",
      "en": "then verily",
      "tr": "faqad"
    },
    {
      "ar": "رَحِمْتَهُۥ ۚ",
      "im": "رَحِمْتَهُ ۚ",
      "en": "You have bestowed mercy on him",
      "tr": "raḥim'tahu"
    },
    {
      "ar": "وَذَٰلِكَ",
      "im": "وَذَٰلِكَ",
      "en": "And that",
      "tr": "wadhālika"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "[it]",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْفَوْزُ",
      "im": "الْفَوْزُ",
      "en": "(is) the success",
      "tr": "l-fawzu"
    },
    {
      "ar": "ٱلْعَظِيمُ",
      "im": "الْعَظِيمُ",
      "en": "the great",
      "tr": "l-ʿaẓīmu"
    }
  ],
  "43:13": [
    {
      "ar": "لِتَسْتَوُۥا۟",
      "im": "لِتَسْتَوُوا",
      "en": "That you may sit firmly",
      "tr": "litastawū"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ظُهُورِهِۦ",
      "im": "ظُهُورِهِ",
      "en": "their backs",
      "tr": "ẓuhūrihi"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تَذْكُرُوا۟",
      "im": "تَذْكُرُوا",
      "en": "remember",
      "tr": "tadhkurū"
    },
    {
      "ar": "نِعْمَةَ",
      "im": "نِعْمَةَ",
      "en": "(the) favor",
      "tr": "niʿ'mata"
    },
    {
      "ar": "رَبِّكُمْ",
      "im": "رَبِّكُمْ",
      "en": "(of) your Lord",
      "tr": "rabbikum"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "ٱسْتَوَيْتُمْ",
      "im": "اسْتَوَيْتُمْ",
      "en": "you sit firmly",
      "tr": "is'tawaytum"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "on them",
      "tr": "ʿalayhi"
    },
    {
      "ar": "وَتَقُولُوا۟",
      "im": "وَتَقُولُوا",
      "en": "and say",
      "tr": "wataqūlū"
    },
    {
      "ar": "سُبْحَـٰنَ",
      "im": "سُبْحَانَ",
      "en": "Glory be (to)",
      "tr": "sub'ḥāna"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "سَخَّرَ",
      "im": "سَخَّرَ",
      "en": "(has) subjected",
      "tr": "sakhara"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "كُنَّا",
      "im": "كُنَّا",
      "en": "we were",
      "tr": "kunnā"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "of it",
      "tr": "lahu"
    },
    {
      "ar": "مُقْرِنِينَ",
      "im": "مُقْرِنِينَ",
      "en": "capable",
      "tr": "muq'rinīna"
    }
  ],
  "43:14": [
    {
      "ar": "وَإِنَّآ",
      "im": "وَإِنَّا",
      "en": "And indeed, we",
      "tr": "wa-innā"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّنَا",
      "im": "رَبِّنَا",
      "en": "our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "لَمُنقَلِبُونَ",
      "im": "لَمُنقَلِبُونَ",
      "en": "will surely return",
      "tr": "lamunqalibūna"
    }
  ],
  "46:15": [
    {
      "ar": "وَوَصَّيْنَا",
      "im": "وَوَصَّيْنَا",
      "en": "And We have enjoined",
      "tr": "wawaṣṣaynā"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "(on) man",
      "tr": "l-insāna"
    },
    {
      "ar": "بِوَٰلِدَيْهِ",
      "im": "بِوَالِدَيْهِ",
      "en": "to his parents",
      "tr": "biwālidayhi"
    },
    {
      "ar": "إِحْسَـٰنًا ۖ",
      "im": "إِحْسَانًا ۖ",
      "en": "kindness",
      "tr": "iḥ'sānan"
    },
    {
      "ar": "حَمَلَتْهُ",
      "im": "حَمَلَتْهُ",
      "en": "Carried him",
      "tr": "ḥamalathu"
    },
    {
      "ar": "أُمُّهُۥ",
      "im": "أُمُّهُ",
      "en": "his mother",
      "tr": "ummuhu"
    },
    {
      "ar": "كُرْهًۭا",
      "im": "كُرْهًا",
      "en": "(with) hardship",
      "tr": "kur'han"
    },
    {
      "ar": "وَوَضَعَتْهُ",
      "im": "وَوَضَعَتْهُ",
      "en": "and gave birth to him",
      "tr": "wawaḍaʿathu"
    },
    {
      "ar": "كُرْهًۭا ۖ",
      "im": "كُرْهًا ۖ",
      "en": "(with) hardship",
      "tr": "kur'han"
    },
    {
      "ar": "وَحَمْلُهُۥ",
      "im": "وَحَمْلُهُ",
      "en": "And (the) bearing of him",
      "tr": "waḥamluhu"
    },
    {
      "ar": "وَفِصَـٰلُهُۥ",
      "im": "وَفِصَالُهُ",
      "en": "and (the) weaning of him",
      "tr": "wafiṣāluhu"
    },
    {
      "ar": "ثَلَـٰثُونَ",
      "im": "ثَلَاثُونَ",
      "en": "(is) thirty",
      "tr": "thalāthūna"
    },
    {
      "ar": "شَهْرًا ۚ",
      "im": "شَهْرًا ۚ",
      "en": "month(s)",
      "tr": "shahran"
    },
    {
      "ar": "حَتَّىٰٓ",
      "im": "حَتَّىٰ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "بَلَغَ",
      "im": "بَلَغَ",
      "en": "he reaches",
      "tr": "balagha"
    },
    {
      "ar": "أَشُدَّهُۥ",
      "im": "أَشُدَّهُ",
      "en": "his maturity",
      "tr": "ashuddahu"
    },
    {
      "ar": "وَبَلَغَ",
      "im": "وَبَلَغَ",
      "en": "and reaches",
      "tr": "wabalagha"
    },
    {
      "ar": "أَرْبَعِينَ",
      "im": "أَرْبَعِينَ",
      "en": "forty",
      "tr": "arbaʿīna"
    },
    {
      "ar": "سَنَةًۭ",
      "im": "سَنَةً",
      "en": "year(s)",
      "tr": "sanatan"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he says",
      "tr": "qāla"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "أَوْزِعْنِىٓ",
      "im": "أَوْزِعْنِي",
      "en": "grant me (the) power",
      "tr": "awziʿ'nī"
    },
    {
      "ar": "أَنْ",
      "im": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَشْكُرَ",
      "im": "أَشْكُرَ",
      "en": "I may be grateful",
      "tr": "ashkura"
    },
    {
      "ar": "نِعْمَتَكَ",
      "im": "نِعْمَتَكَ",
      "en": "(for) Your favor",
      "tr": "niʿ'mataka"
    },
    {
      "ar": "ٱلَّتِىٓ",
      "im": "الَّتِي",
      "en": "which",
      "tr": "allatī"
    },
    {
      "ar": "أَنْعَمْتَ",
      "im": "أَنْعَمْتَ",
      "en": "You have bestowed",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "im": "عَلَيَّ",
      "en": "upon me",
      "tr": "ʿalayya"
    },
    {
      "ar": "وَعَلَىٰ",
      "im": "وَعَلَىٰ",
      "en": "and upon",
      "tr": "waʿalā"
    },
    {
      "ar": "وَٰلِدَىَّ",
      "im": "وَالِدَيَّ",
      "en": "my parents",
      "tr": "wālidayya"
    },
    {
      "ar": "وَأَنْ",
      "im": "وَأَنْ",
      "en": "and that",
      "tr": "wa-an"
    },
    {
      "ar": "أَعْمَلَ",
      "im": "أَعْمَلَ",
      "en": "I do",
      "tr": "aʿmala"
    },
    {
      "ar": "صَـٰلِحًۭا",
      "im": "صَالِحًا",
      "en": "righteous (deeds)",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "تَرْضَىٰهُ",
      "im": "تَرْضَاهُ",
      "en": "which please You",
      "tr": "tarḍāhu"
    },
    {
      "ar": "وَأَصْلِحْ",
      "im": "وَأَصْلِحْ",
      "en": "and make righteous",
      "tr": "wa-aṣliḥ"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ذُرِّيَّتِىٓ ۖ",
      "im": "ذُرِّيَّتِي ۖ",
      "en": "my offspring",
      "tr": "dhurriyyatī"
    },
    {
      "ar": "إِنِّى",
      "im": "إِنِّي",
      "en": "indeed",
      "tr": "innī"
    },
    {
      "ar": "تُبْتُ",
      "im": "تُبْتُ",
      "en": "I turn",
      "tr": "tub'tu"
    },
    {
      "ar": "إِلَيْكَ",
      "im": "إِلَيْكَ",
      "en": "to You",
      "tr": "ilayka"
    },
    {
      "ar": "وَإِنِّى",
      "im": "وَإِنِّي",
      "en": "and indeed, I am",
      "tr": "wa-innī"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُسْلِمِينَ",
      "im": "الْمُسْلِمِينَ",
      "en": "those who submit",
      "tr": "l-mus'limīna"
    }
  ],
  "54:10": [
    {
      "ar": "فَدَعَا",
      "im": "فَدَعَا",
      "en": "So he called",
      "tr": "fadaʿā"
    },
    {
      "ar": "رَبَّهُۥٓ",
      "im": "رَبَّهُ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "im": "أَنِّي",
      "en": "I am",
      "tr": "annī"
    },
    {
      "ar": "مَغْلُوبٌۭ",
      "im": "مَغْلُوبٌ",
      "en": "one overpowered",
      "tr": "maghlūbun"
    },
    {
      "ar": "فَٱنتَصِرْ",
      "im": "فَانتَصِرْ",
      "en": "so help",
      "tr": "fa-intaṣir"
    }
  ],
  "59:10": [
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "And those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "جَآءُو",
      "im": "جَاءُوا",
      "en": "came",
      "tr": "jāū"
    },
    {
      "ar": "مِنۢ",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَعْدِهِمْ",
      "im": "بَعْدِهِمْ",
      "en": "after them",
      "tr": "baʿdihim"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "they say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "ٱغْفِرْ",
      "im": "اغْفِرْ",
      "en": "forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "وَلِإِخْوَٰنِنَا",
      "im": "وَلِإِخْوَانِنَا",
      "en": "and our brothers",
      "tr": "wali-ikh'wāninā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "who",
      "tr": "alladhīna"
    },
    {
      "ar": "سَبَقُونَا",
      "im": "سَبَقُونَا",
      "en": "preceded us",
      "tr": "sabaqūnā"
    },
    {
      "ar": "بِٱلْإِيمَـٰنِ",
      "im": "بِالْإِيمَانِ",
      "en": "in faith",
      "tr": "bil-īmāni"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَجْعَلْ",
      "im": "تَجْعَلْ",
      "en": "put",
      "tr": "tajʿal"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "قُلُوبِنَا",
      "im": "قُلُوبِنَا",
      "en": "our hearts",
      "tr": "qulūbinā"
    },
    {
      "ar": "غِلًّۭا",
      "im": "غِلًّا",
      "en": "any rancor",
      "tr": "ghillan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "im": "لِّلَّذِينَ",
      "en": "towards those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "indeed You",
      "tr": "innaka"
    },
    {
      "ar": "رَءُوفٌۭ",
      "im": "رَءُوفٌ",
      "en": "(are) Full of Kindness",
      "tr": "raūfun"
    },
    {
      "ar": "رَّحِيمٌ",
      "im": "رَّحِيمٌ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
    }
  ],
  "60:4": [
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "Indeed",
      "tr": "qad"
    },
    {
      "ar": "كَانَتْ",
      "im": "كَانَتْ",
      "en": "(there) is",
      "tr": "kānat"
    },
    {
      "ar": "لَكُمْ",
      "im": "لَكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "أُسْوَةٌ",
      "im": "أُسْوَةٌ",
      "en": "an example",
      "tr": "us'watun"
    },
    {
      "ar": "حَسَنَةٌۭ",
      "im": "حَسَنَةٌ",
      "en": "good",
      "tr": "ḥasanatun"
    },
    {
      "ar": "فِىٓ",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "إِبْرَٰهِيمَ",
      "im": "إِبْرَاهِيمَ",
      "en": "Ibrahim",
      "tr": "ib'rāhīma"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "and those",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "مَعَهُۥٓ",
      "im": "مَعَهُ",
      "en": "with him",
      "tr": "maʿahu"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "قَالُوا۟",
      "im": "قَالُوا",
      "en": "they said",
      "tr": "qālū"
    },
    {
      "ar": "لِقَوْمِهِمْ",
      "im": "لِقَوْمِهِمْ",
      "en": "to their people",
      "tr": "liqawmihim"
    },
    {
      "ar": "إِنَّا",
      "im": "إِنَّا",
      "en": "Indeed, we",
      "tr": "innā"
    },
    {
      "ar": "بُرَءَٰٓؤُا۟",
      "im": "بُرَآءُ",
      "en": "(are) disassociated",
      "tr": "buraāu"
    },
    {
      "ar": "مِنكُمْ",
      "im": "مِنكُمْ",
      "en": "from you",
      "tr": "minkum"
    },
    {
      "ar": "وَمِمَّا",
      "im": "وَمِمَّا",
      "en": "and from what",
      "tr": "wamimmā"
    },
    {
      "ar": "تَعْبُدُونَ",
      "im": "تَعْبُدُونَ",
      "en": "you worship",
      "tr": "taʿbudūna"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "دُونِ",
      "im": "دُونِ",
      "en": "besides",
      "tr": "dūni"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "كَفَرْنَا",
      "im": "كَفَرْنَا",
      "en": "We have denied",
      "tr": "kafarnā"
    },
    {
      "ar": "بِكُمْ",
      "im": "بِكُمْ",
      "en": "you",
      "tr": "bikum"
    },
    {
      "ar": "وَبَدَا",
      "im": "وَبَدَا",
      "en": "and has appeared",
      "tr": "wabadā"
    },
    {
      "ar": "بَيْنَنَا",
      "im": "بَيْنَنَا",
      "en": "between us",
      "tr": "baynanā"
    },
    {
      "ar": "وَبَيْنَكُمُ",
      "im": "وَبَيْنَكُمُ",
      "en": "and between you",
      "tr": "wabaynakumu"
    },
    {
      "ar": "ٱلْعَدَٰوَةُ",
      "im": "الْعَدَاوَةُ",
      "en": "enmity",
      "tr": "l-ʿadāwatu"
    },
    {
      "ar": "وَٱلْبَغْضَآءُ",
      "im": "وَالْبَغْضَاءُ",
      "en": "and hatred",
      "tr": "wal-baghḍāu"
    },
    {
      "ar": "أَبَدًا",
      "im": "أَبَدًا",
      "en": "forever",
      "tr": "abadan"
    },
    {
      "ar": "حَتَّىٰ",
      "im": "حَتَّىٰ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "تُؤْمِنُوا۟",
      "im": "تُؤْمِنُوا",
      "en": "you believe",
      "tr": "tu'minū"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَحْدَهُۥٓ",
      "im": "وَحْدَهُ",
      "en": "Alone",
      "tr": "waḥdahu"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "قَوْلَ",
      "im": "قَوْلَ",
      "en": "(the) saying",
      "tr": "qawla"
    },
    {
      "ar": "إِبْرَٰهِيمَ",
      "im": "إِبْرَاهِيمَ",
      "en": "(of) Ibrahim",
      "tr": "ib'rāhīma"
    },
    {
      "ar": "لِأَبِيهِ",
      "im": "لِأَبِيهِ",
      "en": "to his father",
      "tr": "li-abīhi"
    },
    {
      "ar": "لَأَسْتَغْفِرَنَّ",
      "im": "لَأَسْتَغْفِرَنَّ",
      "en": "Surely I ask forgiveness",
      "tr": "la-astaghfiranna"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "but not",
      "tr": "wamā"
    },
    {
      "ar": "أَمْلِكُ",
      "im": "أَمْلِكُ",
      "en": "I have power",
      "tr": "amliku"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "شَىْءٍۢ ۖ",
      "im": "شَيْءٍ ۖ",
      "en": "anything",
      "tr": "shayin"
    },
    {
      "ar": "رَّبَّنَا",
      "im": "رَّبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "عَلَيْكَ",
      "im": "عَلَيْكَ",
      "en": "upon You",
      "tr": "ʿalayka"
    },
    {
      "ar": "تَوَكَّلْنَا",
      "im": "تَوَكَّلْنَا",
      "en": "we put our trust",
      "tr": "tawakkalnā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "im": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "أَنَبْنَا",
      "im": "أَنَبْنَا",
      "en": "we turn",
      "tr": "anabnā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "im": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "im": "الْمَصِيرُ",
      "en": "(is) the final return",
      "tr": "l-maṣīru"
    }
  ],
  "60:5": [
    {
      "ar": "رَبَّنَا",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(do) not",
      "tr": "lā"
    },
    {
      "ar": "تَجْعَلْنَا",
      "im": "تَجْعَلْنَا",
      "en": "make us",
      "tr": "tajʿalnā"
    },
    {
      "ar": "فِتْنَةًۭ",
      "im": "فِتْنَةً",
      "en": "a trial",
      "tr": "fit'natan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "im": "لِّلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "وَٱغْفِرْ",
      "im": "وَاغْفِرْ",
      "en": "and forgive",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "us",
      "tr": "lanā"
    },
    {
      "ar": "رَبَّنَآ ۖ",
      "im": "رَبَّنَا ۖ",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "[You]",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "im": "الْعَزِيزُ",
      "en": "(are) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "im": "الْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "65:3": [
    {
      "ar": "وَيَرْزُقْهُ",
      "im": "وَيَرْزُقْهُ",
      "en": "And He will provide for him",
      "tr": "wayarzuq'hu"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "حَيْثُ",
      "im": "حَيْثُ",
      "en": "where",
      "tr": "ḥaythu"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَحْتَسِبُ ۚ",
      "im": "يَحْتَسِبُ ۚ",
      "en": "he thinks",
      "tr": "yaḥtasibu"
    },
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "يَتَوَكَّلْ",
      "im": "يَتَوَكَّلْ",
      "en": "puts his trust",
      "tr": "yatawakkal"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "فَهُوَ",
      "im": "فَهُوَ",
      "en": "then He",
      "tr": "fahuwa"
    },
    {
      "ar": "حَسْبُهُۥٓ ۚ",
      "im": "حَسْبُهُ ۚ",
      "en": "(is) sufficient for him",
      "tr": "ḥasbuhu"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "بَـٰلِغُ",
      "im": "بَالِغُ",
      "en": "(will) accomplish",
      "tr": "bālighu"
    },
    {
      "ar": "أَمْرِهِۦ ۚ",
      "im": "أَمْرِهِ ۚ",
      "en": "His purpose",
      "tr": "amrihi"
    },
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "Indeed",
      "tr": "qad"
    },
    {
      "ar": "جَعَلَ",
      "im": "جَعَلَ",
      "en": "has set",
      "tr": "jaʿala"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "لِكُلِّ",
      "im": "لِكُلِّ",
      "en": "for every",
      "tr": "likulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدْرًۭا",
      "im": "قَدْرًا",
      "en": "a measure",
      "tr": "qadran"
    }
  ],
  "66:8": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "im": "يَا أَيُّهَا",
      "en": "O",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "(you) who believe",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "تُوبُوٓا۟",
      "im": "تُوبُوا",
      "en": "Turn",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "تَوْبَةًۭ",
      "im": "تَوْبَةً",
      "en": "(in) repentance",
      "tr": "tawbatan"
    },
    {
      "ar": "نَّصُوحًا",
      "im": "نَّصُوحًا",
      "en": "sincere",
      "tr": "naṣūḥan"
    },
    {
      "ar": "عَسَىٰ",
      "im": "عَسَىٰ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "رَبُّكُمْ",
      "im": "رَبُّكُمْ",
      "en": "your Lord",
      "tr": "rabbukum"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "will",
      "tr": "an"
    },
    {
      "ar": "يُكَفِّرَ",
      "im": "يُكَفِّرَ",
      "en": "remove",
      "tr": "yukaffira"
    },
    {
      "ar": "عَنكُمْ",
      "im": "عَنكُمْ",
      "en": "from you",
      "tr": "ʿankum"
    },
    {
      "ar": "سَيِّـَٔاتِكُمْ",
      "im": "سَيِّئَاتِكُمْ",
      "en": "your evil deeds",
      "tr": "sayyiātikum"
    },
    {
      "ar": "وَيُدْخِلَكُمْ",
      "im": "وَيُدْخِلَكُمْ",
      "en": "and admit you",
      "tr": "wayud'khilakum"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "im": "جَنَّاتٍ",
      "en": "(into) Gardens",
      "tr": "jannātin"
    },
    {
      "ar": "تَجْرِى",
      "im": "تَجْرِي",
      "en": "flow",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهَا",
      "im": "تَحْتِهَا",
      "en": "underneath it",
      "tr": "taḥtihā"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ",
      "im": "الْأَنْهَارُ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يُخْزِى",
      "im": "يُخْزِي",
      "en": "will be disgraced",
      "tr": "yukh'zī"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "(by) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلنَّبِىَّ",
      "im": "النَّبِيَّ",
      "en": "the Prophet",
      "tr": "l-nabiya"
    },
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "and those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "مَعَهُۥ ۖ",
      "im": "مَعَهُ ۖ",
      "en": "with him",
      "tr": "maʿahu"
    },
    {
      "ar": "نُورُهُمْ",
      "im": "نُورُهُمْ",
      "en": "Their light",
      "tr": "nūruhum"
    },
    {
      "ar": "يَسْعَىٰ",
      "im": "يَسْعَىٰ",
      "en": "will run",
      "tr": "yasʿā"
    },
    {
      "ar": "بَيْنَ",
      "im": "بَيْنَ",
      "en": "before",
      "tr": "bayna"
    },
    {
      "ar": "أَيْدِيهِمْ",
      "im": "أَيْدِيهِمْ",
      "en": "their hands",
      "tr": "aydīhim"
    },
    {
      "ar": "وَبِأَيْمَـٰنِهِمْ",
      "im": "وَبِأَيْمَانِهِمْ",
      "en": "and on their right",
      "tr": "wabi-aymānihim"
    },
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "they will say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "رَبَّنَآ",
      "im": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "أَتْمِمْ",
      "im": "أَتْمِمْ",
      "en": "Perfect",
      "tr": "atmim"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for us",
      "tr": "lanā"
    },
    {
      "ar": "نُورَنَا",
      "im": "نُورَنَا",
      "en": "our light",
      "tr": "nūranā"
    },
    {
      "ar": "وَٱغْفِرْ",
      "im": "وَاغْفِرْ",
      "en": "and grant forgiveness",
      "tr": "wa-igh'fir"
    },
    {
      "ar": "لَنَآ ۖ",
      "im": "لَنَا ۖ",
      "en": "to us",
      "tr": "lanā"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, You",
      "tr": "innaka"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "(are) over",
      "tr": "ʿalā"
    },
    {
      "ar": "كُلِّ",
      "im": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدِيرٌۭ",
      "im": "قَدِيرٌ",
      "en": "All-Powerful",
      "tr": "qadīrun"
    }
  ],
  "66:11": [
    {
      "ar": "وَضَرَبَ",
      "im": "وَضَرَبَ",
      "en": "And presents",
      "tr": "waḍaraba"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "مَثَلًۭا",
      "im": "مَثَلًا",
      "en": "an example",
      "tr": "mathalan"
    },
    {
      "ar": "لِّلَّذِينَ",
      "im": "لِّلَّذِينَ",
      "en": "for those who",
      "tr": "lilladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "ٱمْرَأَتَ",
      "im": "امْرَأَتَ",
      "en": "(the) wife",
      "tr": "im'ra-ata"
    },
    {
      "ar": "فِرْعَوْنَ",
      "im": "فِرْعَوْنَ",
      "en": "(of) Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "when",
      "tr": "idh"
    },
    {
      "ar": "قَالَتْ",
      "im": "قَالَتْ",
      "en": "she said",
      "tr": "qālat"
    },
    {
      "ar": "رَبِّ",
      "im": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱبْنِ",
      "im": "ابْنِ",
      "en": "Build",
      "tr": "ib'ni"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "عِندَكَ",
      "im": "عِندَكَ",
      "en": "near You",
      "tr": "ʿindaka"
    },
    {
      "ar": "بَيْتًۭا",
      "im": "بَيْتًا",
      "en": "a house",
      "tr": "baytan"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْجَنَّةِ",
      "im": "الْجَنَّةِ",
      "en": "Paradise",
      "tr": "l-janati"
    },
    {
      "ar": "وَنَجِّنِى",
      "im": "وَنَجِّنِي",
      "en": "and save me",
      "tr": "wanajjinī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "فِرْعَوْنَ",
      "im": "فِرْعَوْنَ",
      "en": "Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "وَعَمَلِهِۦ",
      "im": "وَعَمَلِهِ",
      "en": "and his deeds",
      "tr": "waʿamalihi"
    },
    {
      "ar": "وَنَجِّنِى",
      "im": "وَنَجِّنِي",
      "en": "and save me",
      "tr": "wanajjinī"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقَوْمِ",
      "im": "الْقَوْمِ",
      "en": "the people",
      "tr": "l-qawmi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    }
  ],
  "68:51": [
    {
      "ar": "وَإِن",
      "im": "وَإِن",
      "en": "And indeed",
      "tr": "wa-in"
    },
    {
      "ar": "يَكَادُ",
      "im": "يَكَادُ",
      "en": "would almost",
      "tr": "yakādu"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "لَيُزْلِقُونَكَ",
      "im": "لَيُزْلِقُونَكَ",
      "en": "surely make you slip",
      "tr": "layuz'liqūnaka"
    },
    {
      "ar": "بِأَبْصَـٰرِهِمْ",
      "im": "بِأَبْصَارِهِمْ",
      "en": "with their look",
      "tr": "bi-abṣārihim"
    },
    {
      "ar": "لَمَّا",
      "im": "لَمَّا",
      "en": "when",
      "tr": "lammā"
    },
    {
      "ar": "سَمِعُوا۟",
      "im": "سَمِعُوا",
      "en": "they hear",
      "tr": "samiʿū"
    },
    {
      "ar": "ٱلذِّكْرَ",
      "im": "الذِّكْرَ",
      "en": "the Message",
      "tr": "l-dhik'ra"
    },
    {
      "ar": "وَيَقُولُونَ",
      "im": "وَيَقُولُونَ",
      "en": "and they say",
      "tr": "wayaqūlūna"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "لَمَجْنُونٌۭ",
      "im": "لَمَجْنُونٌ",
      "en": "(is) surely mad",
      "tr": "lamajnūnun"
    }
  ],
  "68:52": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "it (is)",
      "tr": "huwa"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "ذِكْرٌۭ",
      "im": "ذِكْرٌ",
      "en": "a Reminder",
      "tr": "dhik'run"
    },
    {
      "ar": "لِّلْعَـٰلَمِينَ",
      "im": "لِّلْعَالَمِينَ",
      "en": "to the worlds",
      "tr": "lil'ʿālamīna"
    }
  ],
  "71:10": [
    {
      "ar": "فَقُلْتُ",
      "im": "فَقُلْتُ",
      "en": "Then I said",
      "tr": "faqul'tu"
    },
    {
      "ar": "ٱسْتَغْفِرُوا۟",
      "im": "اسْتَغْفِرُوا",
      "en": "Ask forgiveness",
      "tr": "is'taghfirū"
    },
    {
      "ar": "رَبَّكُمْ",
      "im": "رَبَّكُمْ",
      "en": "(from) your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "غَفَّارًۭا",
      "im": "غَفَّارًا",
      "en": "Oft-Forgiving",
      "tr": "ghaffāran"
    }
  ],
  "71:11": [
    {
      "ar": "يُرْسِلِ",
      "im": "يُرْسِلِ",
      "en": "He will send down",
      "tr": "yur'sili"
    },
    {
      "ar": "ٱلسَّمَآءَ",
      "im": "السَّمَاءَ",
      "en": "(rain from) the sky",
      "tr": "l-samāa"
    },
    {
      "ar": "عَلَيْكُم",
      "im": "عَلَيْكُم",
      "en": "upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "مِّدْرَارًۭا",
      "im": "مِّدْرَارًا",
      "en": "(in) abundance",
      "tr": "mid'rāran"
    }
  ],
  "71:12": [
    {
      "ar": "وَيُمْدِدْكُم",
      "im": "وَيُمْدِدْكُم",
      "en": "And provide you",
      "tr": "wayum'did'kum"
    },
    {
      "ar": "بِأَمْوَٰلٍۢ",
      "im": "بِأَمْوَالٍ",
      "en": "with wealth",
      "tr": "bi-amwālin"
    },
    {
      "ar": "وَبَنِينَ",
      "im": "وَبَنِينَ",
      "en": "and children",
      "tr": "wabanīna"
    },
    {
      "ar": "وَيَجْعَل",
      "im": "وَيَجْعَل",
      "en": "and make",
      "tr": "wayajʿal"
    },
    {
      "ar": "لَّكُمْ",
      "im": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "im": "جَنَّاتٍ",
      "en": "gardens",
      "tr": "jannātin"
    },
    {
      "ar": "وَيَجْعَل",
      "im": "وَيَجْعَل",
      "en": "and make",
      "tr": "wayajʿal"
    },
    {
      "ar": "لَّكُمْ",
      "im": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "أَنْهَـٰرًۭا",
      "im": "أَنْهَارًا",
      "en": "rivers",
      "tr": "anhāran"
    }
  ],
  "71:28": [
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱغْفِرْ",
      "im": "اغْفِرْ",
      "en": "Forgive",
      "tr": "igh'fir"
    },
    {
      "ar": "لِى",
      "im": "لِي",
      "en": "me",
      "tr": "lī"
    },
    {
      "ar": "وَلِوَٰلِدَىَّ",
      "im": "وَلِوَالِدَيَّ",
      "en": "and my parents",
      "tr": "waliwālidayya"
    },
    {
      "ar": "وَلِمَن",
      "im": "وَلِمَن",
      "en": "and whoever",
      "tr": "waliman"
    },
    {
      "ar": "دَخَلَ",
      "im": "دَخَلَ",
      "en": "enters",
      "tr": "dakhala"
    },
    {
      "ar": "بَيْتِىَ",
      "im": "بَيْتِيَ",
      "en": "my house",
      "tr": "baytiya"
    },
    {
      "ar": "مُؤْمِنًۭا",
      "im": "مُؤْمِنًا",
      "en": "a believer",
      "tr": "mu'minan"
    },
    {
      "ar": "وَلِلْمُؤْمِنِينَ",
      "im": "وَلِلْمُؤْمِنِينَ",
      "en": "and the believing men",
      "tr": "walil'mu'minīna"
    },
    {
      "ar": "وَٱلْمُؤْمِنَـٰتِ",
      "im": "وَالْمُؤْمِنَاتِ",
      "en": "and the believing women",
      "tr": "wal-mu'mināti"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَزِدِ",
      "im": "تَزِدِ",
      "en": "increase",
      "tr": "tazidi"
    },
    {
      "ar": "ٱلظَّـٰلِمِينَ",
      "im": "الظَّالِمِينَ",
      "en": "the wrongdoers",
      "tr": "l-ẓālimīna"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "تَبَارًۢا",
      "im": "تَبَارًا",
      "en": "(in) destruction",
      "tr": "tabāran"
    }
  ],
  "78:1": [
    {
      "ar": "عَمَّ",
      "im": "عَمَّ",
      "en": "About what",
      "tr": "ʿamma"
    },
    {
      "ar": "يَتَسَآءَلُونَ",
      "im": "يَتَسَاءَلُونَ",
      "en": "are they asking one another",
      "tr": "yatasāalūna"
    }
  ],
  "78:2": [
    {
      "ar": "عَنِ",
      "im": "عَنِ",
      "en": "About",
      "tr": "ʿani"
    },
    {
      "ar": "ٱلنَّبَإِ",
      "im": "النَّبَإِ",
      "en": "the News",
      "tr": "l-naba-i"
    },
    {
      "ar": "ٱلْعَظِيمِ",
      "im": "الْعَظِيمِ",
      "en": "the Great",
      "tr": "l-ʿaẓīmi"
    }
  ],
  "78:3": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "(About) which",
      "tr": "alladhī"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "فِيهِ",
      "im": "فِيهِ",
      "en": "(are) concerning it",
      "tr": "fīhi"
    },
    {
      "ar": "مُخْتَلِفُونَ",
      "im": "مُخْتَلِفُونَ",
      "en": "(in) disagreement",
      "tr": "mukh'talifūna"
    }
  ],
  "78:4": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "سَيَعْلَمُونَ",
      "im": "سَيَعْلَمُونَ",
      "en": "(soon) they will know",
      "tr": "sayaʿlamūna"
    }
  ],
  "78:5": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "سَيَعْلَمُونَ",
      "im": "سَيَعْلَمُونَ",
      "en": "(soon) they will know",
      "tr": "sayaʿlamūna"
    }
  ],
  "78:6": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Have not",
      "tr": "alam"
    },
    {
      "ar": "نَجْعَلِ",
      "im": "نَجْعَلِ",
      "en": "We made",
      "tr": "najʿali"
    },
    {
      "ar": "ٱلْأَرْضَ",
      "im": "الْأَرْضَ",
      "en": "the earth",
      "tr": "l-arḍa"
    },
    {
      "ar": "مِهَـٰدًۭا",
      "im": "مِهَادًا",
      "en": "a resting place",
      "tr": "mihādan"
    }
  ],
  "78:7": [
    {
      "ar": "وَٱلْجِبَالَ",
      "im": "وَالْجِبَالَ",
      "en": "And the mountains",
      "tr": "wal-jibāla"
    },
    {
      "ar": "أَوْتَادًۭا",
      "im": "أَوْتَادًا",
      "en": "(as) pegs",
      "tr": "awtādan"
    }
  ],
  "78:8": [
    {
      "ar": "وَخَلَقْنَـٰكُمْ",
      "im": "وَخَلَقْنَاكُمْ",
      "en": "And We created you",
      "tr": "wakhalaqnākum"
    },
    {
      "ar": "أَزْوَٰجًۭا",
      "im": "أَزْوَاجًا",
      "en": "(in) pairs",
      "tr": "azwājan"
    }
  ],
  "78:9": [
    {
      "ar": "وَجَعَلْنَا",
      "im": "وَجَعَلْنَا",
      "en": "And We made",
      "tr": "wajaʿalnā"
    },
    {
      "ar": "نَوْمَكُمْ",
      "im": "نَوْمَكُمْ",
      "en": "your sleep",
      "tr": "nawmakum"
    },
    {
      "ar": "سُبَاتًۭا",
      "im": "سُبَاتًا",
      "en": "(for) rest",
      "tr": "subātan"
    }
  ],
  "78:10": [
    {
      "ar": "وَجَعَلْنَا",
      "im": "وَجَعَلْنَا",
      "en": "And We made",
      "tr": "wajaʿalnā"
    },
    {
      "ar": "ٱلَّيْلَ",
      "im": "اللَّيْلَ",
      "en": "the night",
      "tr": "al-layla"
    },
    {
      "ar": "لِبَاسًۭا",
      "im": "لِبَاسًا",
      "en": "(as) covering",
      "tr": "libāsan"
    }
  ],
  "78:11": [
    {
      "ar": "وَجَعَلْنَا",
      "im": "وَجَعَلْنَا",
      "en": "And We made",
      "tr": "wajaʿalnā"
    },
    {
      "ar": "ٱلنَّهَارَ",
      "im": "النَّهَارَ",
      "en": "the day",
      "tr": "l-nahāra"
    },
    {
      "ar": "مَعَاشًۭا",
      "im": "مَعَاشًا",
      "en": "(for) livelihood",
      "tr": "maʿāshan"
    }
  ],
  "78:12": [
    {
      "ar": "وَبَنَيْنَا",
      "im": "وَبَنَيْنَا",
      "en": "And We constructed",
      "tr": "wabanaynā"
    },
    {
      "ar": "فَوْقَكُمْ",
      "im": "فَوْقَكُمْ",
      "en": "over you",
      "tr": "fawqakum"
    },
    {
      "ar": "سَبْعًۭا",
      "im": "سَبْعًا",
      "en": "seven",
      "tr": "sabʿan"
    },
    {
      "ar": "شِدَادًۭا",
      "im": "شِدَادًا",
      "en": "strong",
      "tr": "shidādan"
    }
  ],
  "78:13": [
    {
      "ar": "وَجَعَلْنَا",
      "im": "وَجَعَلْنَا",
      "en": "And We placed",
      "tr": "wajaʿalnā"
    },
    {
      "ar": "سِرَاجًۭا",
      "im": "سِرَاجًا",
      "en": "a lamp",
      "tr": "sirājan"
    },
    {
      "ar": "وَهَّاجًۭا",
      "im": "وَهَّاجًا",
      "en": "burning",
      "tr": "wahhājan"
    }
  ],
  "78:14": [
    {
      "ar": "وَأَنزَلْنَا",
      "im": "وَأَنزَلْنَا",
      "en": "And We sent down",
      "tr": "wa-anzalnā"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُعْصِرَٰتِ",
      "im": "الْمُعْصِرَاتِ",
      "en": "the rain clouds",
      "tr": "l-muʿ'ṣirāti"
    },
    {
      "ar": "مَآءًۭ",
      "im": "مَاءً",
      "en": "water",
      "tr": "māan"
    },
    {
      "ar": "ثَجَّاجًۭا",
      "im": "ثَجَّاجًا",
      "en": "pouring abundantly",
      "tr": "thajjājan"
    }
  ],
  "78:15": [
    {
      "ar": "لِّنُخْرِجَ",
      "im": "لِّنُخْرِجَ",
      "en": "That We may bring forth",
      "tr": "linukh'rija"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "thereby",
      "tr": "bihi"
    },
    {
      "ar": "حَبًّۭا",
      "im": "حَبًّا",
      "en": "grain",
      "tr": "ḥabban"
    },
    {
      "ar": "وَنَبَاتًۭا",
      "im": "وَنَبَاتًا",
      "en": "and vegetation",
      "tr": "wanabātan"
    }
  ],
  "78:16": [
    {
      "ar": "وَجَنَّـٰتٍ",
      "im": "وَجَنَّاتٍ",
      "en": "And gardens",
      "tr": "wajannātin"
    },
    {
      "ar": "أَلْفَافًا",
      "im": "أَلْفَافًا",
      "en": "(of) thick foliage",
      "tr": "alfāfan"
    }
  ],
  "78:17": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلْفَصْلِ",
      "im": "الْفَصْلِ",
      "en": "(of) the Judgment",
      "tr": "l-faṣli"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "مِيقَـٰتًۭا",
      "im": "مِيقَاتًا",
      "en": "an appointed time",
      "tr": "mīqātan"
    }
  ],
  "78:18": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يُنفَخُ",
      "im": "يُنفَخُ",
      "en": "(in which) shall be blown",
      "tr": "yunfakhu"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلصُّورِ",
      "im": "الصُّورِ",
      "en": "the trumpet",
      "tr": "l-ṣūri"
    },
    {
      "ar": "فَتَأْتُونَ",
      "im": "فَتَأْتُونَ",
      "en": "and you will come forth",
      "tr": "fatatūna"
    },
    {
      "ar": "أَفْوَاجًۭا",
      "im": "أَفْوَاجًا",
      "en": "(in) crowds",
      "tr": "afwājan"
    }
  ],
  "78:19": [
    {
      "ar": "وَفُتِحَتِ",
      "im": "وَفُتِحَتِ",
      "en": "And is opened",
      "tr": "wafutiḥati"
    },
    {
      "ar": "ٱلسَّمَآءُ",
      "im": "السَّمَاءُ",
      "en": "the heaven",
      "tr": "l-samāu"
    },
    {
      "ar": "فَكَانَتْ",
      "im": "فَكَانَتْ",
      "en": "and becomes",
      "tr": "fakānat"
    },
    {
      "ar": "أَبْوَٰبًۭا",
      "im": "أَبْوَابًا",
      "en": "gateways",
      "tr": "abwāban"
    }
  ],
  "78:20": [
    {
      "ar": "وَسُيِّرَتِ",
      "im": "وَسُيِّرَتِ",
      "en": "And are moved",
      "tr": "wasuyyirati"
    },
    {
      "ar": "ٱلْجِبَالُ",
      "im": "الْجِبَالُ",
      "en": "the mountains",
      "tr": "l-jibālu"
    },
    {
      "ar": "فَكَانَتْ",
      "im": "فَكَانَتْ",
      "en": "and become",
      "tr": "fakānat"
    },
    {
      "ar": "سَرَابًا",
      "im": "سَرَابًا",
      "en": "a mirage",
      "tr": "sarāban"
    }
  ],
  "78:21": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "جَهَنَّمَ",
      "im": "جَهَنَّمَ",
      "en": "Hell",
      "tr": "jahannama"
    },
    {
      "ar": "كَانَتْ",
      "im": "كَانَتْ",
      "en": "is",
      "tr": "kānat"
    },
    {
      "ar": "مِرْصَادًۭا",
      "im": "مِرْصَادًا",
      "en": "lying in wait",
      "tr": "mir'ṣādan"
    }
  ],
  "78:22": [
    {
      "ar": "لِّلطَّـٰغِينَ",
      "im": "لِّلطَّاغِينَ",
      "en": "For the transgressors",
      "tr": "lilṭṭāghīna"
    },
    {
      "ar": "مَـَٔابًۭا",
      "im": "مَآبًا",
      "en": "a place of return",
      "tr": "maāban"
    }
  ],
  "78:23": [
    {
      "ar": "لَّـٰبِثِينَ",
      "im": "لَّابِثِينَ",
      "en": "(They will) be remaining",
      "tr": "lābithīna"
    },
    {
      "ar": "فِيهَآ",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "أَحْقَابًۭا",
      "im": "أَحْقَابًا",
      "en": "(for) ages",
      "tr": "aḥqāban"
    }
  ],
  "78:24": [
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "يَذُوقُونَ",
      "im": "يَذُوقُونَ",
      "en": "they will taste",
      "tr": "yadhūqūna"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "بَرْدًۭا",
      "im": "بَرْدًا",
      "en": "coolness",
      "tr": "bardan"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "شَرَابًا",
      "im": "شَرَابًا",
      "en": "any drink",
      "tr": "sharāban"
    }
  ],
  "78:25": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "حَمِيمًۭا",
      "im": "حَمِيمًا",
      "en": "scalding water",
      "tr": "ḥamīman"
    },
    {
      "ar": "وَغَسَّاقًۭا",
      "im": "وَغَسَّاقًا",
      "en": "and purulence",
      "tr": "waghassāqan"
    }
  ],
  "78:26": [
    {
      "ar": "جَزَآءًۭ",
      "im": "جَزَاءً",
      "en": "A recompense",
      "tr": "jazāan"
    },
    {
      "ar": "وِفَاقًا",
      "im": "وِفَاقًا",
      "en": "appropriate",
      "tr": "wifāqan"
    }
  ],
  "78:27": [
    {
      "ar": "إِنَّهُمْ",
      "im": "إِنَّهُمْ",
      "en": "Indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "were",
      "tr": "kānū"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَرْجُونَ",
      "im": "يَرْجُونَ",
      "en": "expecting",
      "tr": "yarjūna"
    },
    {
      "ar": "حِسَابًۭا",
      "im": "حِسَابًا",
      "en": "an account",
      "tr": "ḥisāban"
    }
  ],
  "78:28": [
    {
      "ar": "وَكَذَّبُوا۟",
      "im": "وَكَذَّبُوا",
      "en": "And they denied",
      "tr": "wakadhabū"
    },
    {
      "ar": "بِـَٔايَـٰتِنَا",
      "im": "بِآيَاتِنَا",
      "en": "Our Signs",
      "tr": "biāyātinā"
    },
    {
      "ar": "كِذَّابًۭا",
      "im": "كِذَّابًا",
      "en": "(with) denial",
      "tr": "kidhāban"
    }
  ],
  "78:29": [
    {
      "ar": "وَكُلَّ",
      "im": "وَكُلَّ",
      "en": "And every",
      "tr": "wakulla"
    },
    {
      "ar": "شَىْءٍ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "أَحْصَيْنَـٰهُ",
      "im": "أَحْصَيْنَاهُ",
      "en": "We have enumerated it",
      "tr": "aḥṣaynāhu"
    },
    {
      "ar": "كِتَـٰبًۭا",
      "im": "كِتَابًا",
      "en": "(in) a Book",
      "tr": "kitāban"
    }
  ],
  "78:30": [
    {
      "ar": "فَذُوقُوا۟",
      "im": "فَذُوقُوا",
      "en": "So taste",
      "tr": "fadhūqū"
    },
    {
      "ar": "فَلَن",
      "im": "فَلَن",
      "en": "and never",
      "tr": "falan"
    },
    {
      "ar": "نَّزِيدَكُمْ",
      "im": "نَّزِيدَكُمْ",
      "en": "We will increase you",
      "tr": "nazīdakum"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "عَذَابًا",
      "im": "عَذَابًا",
      "en": "(in) punishment",
      "tr": "ʿadhāban"
    }
  ],
  "78:31": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "لِلْمُتَّقِينَ",
      "im": "لِلْمُتَّقِينَ",
      "en": "for the righteous",
      "tr": "lil'muttaqīna"
    },
    {
      "ar": "مَفَازًا",
      "im": "مَفَازًا",
      "en": "(is) success",
      "tr": "mafāzan"
    }
  ],
  "78:32": [
    {
      "ar": "حَدَآئِقَ",
      "im": "حَدَائِقَ",
      "en": "Gardens",
      "tr": "ḥadāiqa"
    },
    {
      "ar": "وَأَعْنَـٰبًۭا",
      "im": "وَأَعْنَابًا",
      "en": "and grapevines",
      "tr": "wa-aʿnāban"
    }
  ],
  "78:33": [
    {
      "ar": "وَكَوَاعِبَ",
      "im": "وَكَوَاعِبَ",
      "en": "And splendid companions",
      "tr": "wakawāʿiba"
    },
    {
      "ar": "أَتْرَابًۭا",
      "im": "أَتْرَابًا",
      "en": "well-matched",
      "tr": "atrāban"
    }
  ],
  "78:34": [
    {
      "ar": "وَكَأْسًۭا",
      "im": "وَكَأْسًا",
      "en": "And a cup",
      "tr": "wakasan"
    },
    {
      "ar": "دِهَاقًۭا",
      "im": "دِهَاقًا",
      "en": "full",
      "tr": "dihāqan"
    }
  ],
  "78:35": [
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "يَسْمَعُونَ",
      "im": "يَسْمَعُونَ",
      "en": "they will hear",
      "tr": "yasmaʿūna"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "لَغْوًۭا",
      "im": "لَغْوًا",
      "en": "any vain talk",
      "tr": "laghwan"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "كِذَّٰبًۭا",
      "im": "كِذَّابًا",
      "en": "any falsehood",
      "tr": "kidhāban"
    }
  ],
  "78:36": [
    {
      "ar": "جَزَآءًۭ",
      "im": "جَزَاءً",
      "en": "(As) a reward",
      "tr": "jazāan"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّكَ",
      "im": "رَّبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "عَطَآءً",
      "im": "عَطَاءً",
      "en": "a gift",
      "tr": "ʿaṭāan"
    },
    {
      "ar": "حِسَابًۭا",
      "im": "حِسَابًا",
      "en": "(according to) account",
      "tr": "ḥisāban"
    }
  ],
  "78:37": [
    {
      "ar": "رَّبِّ",
      "im": "رَّبِّ",
      "en": "Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ",
      "im": "وَالْأَرْضِ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and whatever",
      "tr": "wamā"
    },
    {
      "ar": "بَيْنَهُمَا",
      "im": "بَيْنَهُمَا",
      "en": "(is) between both of them",
      "tr": "baynahumā"
    },
    {
      "ar": "ٱلرَّحْمَـٰنِ ۖ",
      "im": "الرَّحْمَٰنِ ۖ",
      "en": "the Most Gracious",
      "tr": "l-raḥmāni"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَمْلِكُونَ",
      "im": "يَمْلِكُونَ",
      "en": "they have power",
      "tr": "yamlikūna"
    },
    {
      "ar": "مِنْهُ",
      "im": "مِنْهُ",
      "en": "from Him",
      "tr": "min'hu"
    },
    {
      "ar": "خِطَابًۭا",
      "im": "خِطَابًا",
      "en": "(to) address",
      "tr": "khiṭāban"
    }
  ],
  "78:38": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَقُومُ",
      "im": "يَقُومُ",
      "en": "will stand",
      "tr": "yaqūmu"
    },
    {
      "ar": "ٱلرُّوحُ",
      "im": "الرُّوحُ",
      "en": "the Spirit",
      "tr": "l-rūḥu"
    },
    {
      "ar": "وَٱلْمَلَـٰٓئِكَةُ",
      "im": "وَالْمَلَائِكَةُ",
      "en": "and the Angels",
      "tr": "wal-malāikatu"
    },
    {
      "ar": "صَفًّۭا ۖ",
      "im": "صَفًّا ۖ",
      "en": "(in) rows",
      "tr": "ṣaffan"
    },
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَتَكَلَّمُونَ",
      "im": "يَتَكَلَّمُونَ",
      "en": "they will speak",
      "tr": "yatakallamūna"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(one) who",
      "tr": "man"
    },
    {
      "ar": "أَذِنَ",
      "im": "أَذِنَ",
      "en": "permits",
      "tr": "adhina"
    },
    {
      "ar": "لَهُ",
      "im": "لَهُ",
      "en": "[for] him",
      "tr": "lahu"
    },
    {
      "ar": "ٱلرَّحْمَـٰنُ",
      "im": "الرَّحْمَٰنُ",
      "en": "the Most Gracious",
      "tr": "l-raḥmānu"
    },
    {
      "ar": "وَقَالَ",
      "im": "وَقَالَ",
      "en": "and he (will) say",
      "tr": "waqāla"
    },
    {
      "ar": "صَوَابًۭا",
      "im": "صَوَابًا",
      "en": "(what is) correct",
      "tr": "ṣawāban"
    }
  ],
  "78:39": [
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "That",
      "tr": "dhālika"
    },
    {
      "ar": "ٱلْيَوْمُ",
      "im": "الْيَوْمُ",
      "en": "(is) the Day",
      "tr": "l-yawmu"
    },
    {
      "ar": "ٱلْحَقُّ ۖ",
      "im": "الْحَقُّ ۖ",
      "en": "the True",
      "tr": "l-ḥaqu"
    },
    {
      "ar": "فَمَن",
      "im": "فَمَن",
      "en": "So whoever",
      "tr": "faman"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "wills",
      "tr": "shāa"
    },
    {
      "ar": "ٱتَّخَذَ",
      "im": "اتَّخَذَ",
      "en": "let him take",
      "tr": "ittakhadha"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "towards",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّهِۦ",
      "im": "رَبِّهِ",
      "en": "his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "مَـَٔابًا",
      "im": "مَآبًا",
      "en": "a return",
      "tr": "maāban"
    }
  ],
  "78:40": [
    {
      "ar": "إِنَّآ",
      "im": "إِنَّا",
      "en": "Indeed We",
      "tr": "innā"
    },
    {
      "ar": "أَنذَرْنَـٰكُمْ",
      "im": "أَنذَرْنَاكُمْ",
      "en": "[We] have warned you",
      "tr": "andharnākum"
    },
    {
      "ar": "عَذَابًۭا",
      "im": "عَذَابًا",
      "en": "(of) a punishment",
      "tr": "ʿadhāban"
    },
    {
      "ar": "قَرِيبًۭا",
      "im": "قَرِيبًا",
      "en": "near",
      "tr": "qarīban"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(the) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَنظُرُ",
      "im": "يَنظُرُ",
      "en": "will see",
      "tr": "yanẓuru"
    },
    {
      "ar": "ٱلْمَرْءُ",
      "im": "الْمَرْءُ",
      "en": "the man",
      "tr": "l-maru"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "قَدَّمَتْ",
      "im": "قَدَّمَتْ",
      "en": "have sent forth",
      "tr": "qaddamat"
    },
    {
      "ar": "يَدَاهُ",
      "im": "يَدَاهُ",
      "en": "his hands",
      "tr": "yadāhu"
    },
    {
      "ar": "وَيَقُولُ",
      "im": "وَيَقُولُ",
      "en": "and will say",
      "tr": "wayaqūlu"
    },
    {
      "ar": "ٱلْكَافِرُ",
      "im": "الْكَافِرُ",
      "en": "the disbeliever",
      "tr": "l-kāfiru"
    },
    {
      "ar": "يَـٰلَيْتَنِى",
      "im": "يَا لَيْتَنِي",
      "en": "O I wish",
      "tr": "yālaytanī"
    },
    {
      "ar": "كُنتُ",
      "im": "كُنتُ",
      "en": "I were",
      "tr": "kuntu"
    },
    {
      "ar": "تُرَٰبًۢا",
      "im": "تُرَابًا",
      "en": "dust",
      "tr": "turāban"
    }
  ],
  "79:1": [
    {
      "ar": "وَٱلنَّـٰزِعَـٰتِ",
      "im": "وَالنَّازِعَاتِ",
      "en": "By those who extract",
      "tr": "wal-nāziʿāti"
    },
    {
      "ar": "غَرْقًۭا",
      "im": "غَرْقًا",
      "en": "violently",
      "tr": "gharqan"
    }
  ],
  "79:2": [
    {
      "ar": "وَٱلنَّـٰشِطَـٰتِ",
      "im": "وَالنَّاشِطَاتِ",
      "en": "And those who draw out",
      "tr": "wal-nāshiṭāti"
    },
    {
      "ar": "نَشْطًۭا",
      "im": "نَشْطًا",
      "en": "gently",
      "tr": "nashṭan"
    }
  ],
  "79:3": [
    {
      "ar": "وَٱلسَّـٰبِحَـٰتِ",
      "im": "وَالسَّابِحَاتِ",
      "en": "And those who glide",
      "tr": "wal-sābiḥāti"
    },
    {
      "ar": "سَبْحًۭا",
      "im": "سَبْحًا",
      "en": "swimming",
      "tr": "sabḥan"
    }
  ],
  "79:4": [
    {
      "ar": "فَٱلسَّـٰبِقَـٰتِ",
      "im": "فَالسَّابِقَاتِ",
      "en": "And those who race each other",
      "tr": "fal-sābiqāti"
    },
    {
      "ar": "سَبْقًۭا",
      "im": "سَبْقًا",
      "en": "(in) a race",
      "tr": "sabqan"
    }
  ],
  "79:5": [
    {
      "ar": "فَٱلْمُدَبِّرَٰتِ",
      "im": "فَالْمُدَبِّرَاتِ",
      "en": "And those who arrange",
      "tr": "fal-mudabirāti"
    },
    {
      "ar": "أَمْرًۭا",
      "im": "أَمْرًا",
      "en": "(the) matter",
      "tr": "amran"
    }
  ],
  "79:6": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "تَرْجُفُ",
      "im": "تَرْجُفُ",
      "en": "will quake",
      "tr": "tarjufu"
    },
    {
      "ar": "ٱلرَّاجِفَةُ",
      "im": "الرَّاجِفَةُ",
      "en": "the quaking one",
      "tr": "l-rājifatu"
    }
  ],
  "79:7": [
    {
      "ar": "تَتْبَعُهَا",
      "im": "تَتْبَعُهَا",
      "en": "Follows it",
      "tr": "tatbaʿuhā"
    },
    {
      "ar": "ٱلرَّادِفَةُ",
      "im": "الرَّادِفَةُ",
      "en": "the subsequent",
      "tr": "l-rādifatu"
    }
  ],
  "79:8": [
    {
      "ar": "قُلُوبٌۭ",
      "im": "قُلُوبٌ",
      "en": "Hearts",
      "tr": "qulūbun"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "وَاجِفَةٌ",
      "im": "وَاجِفَةٌ",
      "en": "will palpitate",
      "tr": "wājifatun"
    }
  ],
  "79:9": [
    {
      "ar": "أَبْصَـٰرُهَا",
      "im": "أَبْصَارُهَا",
      "en": "Their eyes",
      "tr": "abṣāruhā"
    },
    {
      "ar": "خَـٰشِعَةٌۭ",
      "im": "خَاشِعَةٌ",
      "en": "humbled",
      "tr": "khāshiʿatun"
    }
  ],
  "79:10": [
    {
      "ar": "يَقُولُونَ",
      "im": "يَقُولُونَ",
      "en": "They say",
      "tr": "yaqūlūna"
    },
    {
      "ar": "أَءِنَّا",
      "im": "أَإِنَّا",
      "en": "Will we",
      "tr": "a-innā"
    },
    {
      "ar": "لَمَرْدُودُونَ",
      "im": "لَمَرْدُودُونَ",
      "en": "indeed be returned",
      "tr": "lamardūdūna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "to",
      "tr": "fī"
    },
    {
      "ar": "ٱلْحَافِرَةِ",
      "im": "الْحَافِرَةِ",
      "en": "the former state",
      "tr": "l-ḥāfirati"
    }
  ],
  "79:11": [
    {
      "ar": "أَءِذَا",
      "im": "أَإِذَا",
      "en": "What! When",
      "tr": "a-idhā"
    },
    {
      "ar": "كُنَّا",
      "im": "كُنَّا",
      "en": "we are",
      "tr": "kunnā"
    },
    {
      "ar": "عِظَـٰمًۭا",
      "im": "عِظَامًا",
      "en": "bones",
      "tr": "ʿiẓāman"
    },
    {
      "ar": "نَّخِرَةًۭ",
      "im": "نَّخِرَةً",
      "en": "decayed",
      "tr": "nakhiratan"
    }
  ],
  "79:12": [
    {
      "ar": "قَالُوا۟",
      "im": "قَالُوا",
      "en": "They say",
      "tr": "qālū"
    },
    {
      "ar": "تِلْكَ",
      "im": "تِلْكَ",
      "en": "This",
      "tr": "til'ka"
    },
    {
      "ar": "إِذًۭا",
      "im": "إِذًا",
      "en": "then",
      "tr": "idhan"
    },
    {
      "ar": "كَرَّةٌ",
      "im": "كَرَّةٌ",
      "en": "(would be) a return",
      "tr": "karratun"
    },
    {
      "ar": "خَاسِرَةٌۭ",
      "im": "خَاسِرَةٌ",
      "en": "losing",
      "tr": "khāsiratun"
    }
  ],
  "79:13": [
    {
      "ar": "فَإِنَّمَا",
      "im": "فَإِنَّمَا",
      "en": "Then only",
      "tr": "fa-innamā"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it",
      "tr": "hiya"
    },
    {
      "ar": "زَجْرَةٌۭ",
      "im": "زَجْرَةٌ",
      "en": "(will be) a shout",
      "tr": "zajratun"
    },
    {
      "ar": "وَٰحِدَةٌۭ",
      "im": "وَاحِدَةٌ",
      "en": "single",
      "tr": "wāḥidatun"
    }
  ],
  "79:14": [
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "And behold",
      "tr": "fa-idhā"
    },
    {
      "ar": "هُم",
      "im": "هُم",
      "en": "They",
      "tr": "hum"
    },
    {
      "ar": "بِٱلسَّاهِرَةِ",
      "im": "بِالسَّاهِرَةِ",
      "en": "(will be) awakened",
      "tr": "bil-sāhirati"
    }
  ],
  "79:15": [
    {
      "ar": "هَلْ",
      "im": "هَلْ",
      "en": "Has",
      "tr": "hal"
    },
    {
      "ar": "أَتَىٰكَ",
      "im": "أَتَاكَ",
      "en": "(there) come to you",
      "tr": "atāka"
    },
    {
      "ar": "حَدِيثُ",
      "im": "حَدِيثُ",
      "en": "(the) story",
      "tr": "ḥadīthu"
    },
    {
      "ar": "مُوسَىٰٓ",
      "im": "مُوسَىٰ",
      "en": "(of) Musa",
      "tr": "mūsā"
    }
  ],
  "79:16": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "نَادَىٰهُ",
      "im": "نَادَاهُ",
      "en": "called him",
      "tr": "nādāhu"
    },
    {
      "ar": "رَبُّهُۥ",
      "im": "رَبُّهُ",
      "en": "his Lord",
      "tr": "rabbuhu"
    },
    {
      "ar": "بِٱلْوَادِ",
      "im": "بِالْوَادِ",
      "en": "in the valley",
      "tr": "bil-wādi"
    },
    {
      "ar": "ٱلْمُقَدَّسِ",
      "im": "الْمُقَدَّسِ",
      "en": "the sacred",
      "tr": "l-muqadasi"
    },
    {
      "ar": "طُوًى",
      "im": "طُوًى",
      "en": "(of) Tuwa",
      "tr": "ṭuwan"
    }
  ],
  "79:17": [
    {
      "ar": "ٱذْهَبْ",
      "im": "اذْهَبْ",
      "en": "Go",
      "tr": "idh'hab"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "فِرْعَوْنَ",
      "im": "فِرْعَوْنَ",
      "en": "Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "طَغَىٰ",
      "im": "طَغَىٰ",
      "en": "(has) transgressed",
      "tr": "ṭaghā"
    }
  ],
  "79:18": [
    {
      "ar": "فَقُلْ",
      "im": "فَقُلْ",
      "en": "And say",
      "tr": "faqul"
    },
    {
      "ar": "هَل",
      "im": "هَل",
      "en": "Would",
      "tr": "hal"
    },
    {
      "ar": "لَّكَ",
      "im": "لَّكَ",
      "en": "[for] you",
      "tr": "laka"
    },
    {
      "ar": "إِلَىٰٓ",
      "im": "إِلَىٰ",
      "en": "[to]",
      "tr": "ilā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "تَزَكَّىٰ",
      "im": "تَزَكَّىٰ",
      "en": "purify yourself",
      "tr": "tazakkā"
    }
  ],
  "79:19": [
    {
      "ar": "وَأَهْدِيَكَ",
      "im": "وَأَهْدِيَكَ",
      "en": "And I will guide you",
      "tr": "wa-ahdiyaka"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "فَتَخْشَىٰ",
      "im": "فَتَخْشَىٰ",
      "en": "so you would fear",
      "tr": "fatakhshā"
    }
  ],
  "79:20": [
    {
      "ar": "فَأَرَىٰهُ",
      "im": "فَأَرَاهُ",
      "en": "Then he showed him",
      "tr": "fa-arāhu"
    },
    {
      "ar": "ٱلْـَٔايَةَ",
      "im": "الْآيَةَ",
      "en": "the sign",
      "tr": "l-āyata"
    },
    {
      "ar": "ٱلْكُبْرَىٰ",
      "im": "الْكُبْرَىٰ",
      "en": "the great",
      "tr": "l-kub'rā"
    }
  ],
  "79:21": [
    {
      "ar": "فَكَذَّبَ",
      "im": "فَكَذَّبَ",
      "en": "But he denied",
      "tr": "fakadhaba"
    },
    {
      "ar": "وَعَصَىٰ",
      "im": "وَعَصَىٰ",
      "en": "and disobeyed",
      "tr": "waʿaṣā"
    }
  ],
  "79:22": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "أَدْبَرَ",
      "im": "أَدْبَرَ",
      "en": "he turned his back",
      "tr": "adbara"
    },
    {
      "ar": "يَسْعَىٰ",
      "im": "يَسْعَىٰ",
      "en": "striving",
      "tr": "yasʿā"
    }
  ],
  "79:23": [
    {
      "ar": "فَحَشَرَ",
      "im": "فَحَشَرَ",
      "en": "And he gathered",
      "tr": "faḥashara"
    },
    {
      "ar": "فَنَادَىٰ",
      "im": "فَنَادَىٰ",
      "en": "and called out",
      "tr": "fanādā"
    }
  ],
  "79:24": [
    {
      "ar": "فَقَالَ",
      "im": "فَقَالَ",
      "en": "Then he said",
      "tr": "faqāla"
    },
    {
      "ar": "أَنَا۠",
      "im": "أَنَا",
      "en": "I am",
      "tr": "anā"
    },
    {
      "ar": "رَبُّكُمُ",
      "im": "رَبُّكُمُ",
      "en": "your Lord",
      "tr": "rabbukumu"
    },
    {
      "ar": "ٱلْأَعْلَىٰ",
      "im": "الْأَعْلَىٰ",
      "en": "the Most High",
      "tr": "l-aʿlā"
    }
  ],
  "79:25": [
    {
      "ar": "فَأَخَذَهُ",
      "im": "فَأَخَذَهُ",
      "en": "So seized him",
      "tr": "fa-akhadhahu"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "نَكَالَ",
      "im": "نَكَالَ",
      "en": "(with) an exemplary punishment",
      "tr": "nakāla"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "im": "الْآخِرَةِ",
      "en": "(for) the last",
      "tr": "l-ākhirati"
    },
    {
      "ar": "وَٱلْأُولَىٰٓ",
      "im": "وَالْأُولَىٰ",
      "en": "and the first",
      "tr": "wal-ūlā"
    }
  ],
  "79:26": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "لَعِبْرَةًۭ",
      "im": "لَعِبْرَةً",
      "en": "surely (is) a lesson",
      "tr": "laʿib'ratan"
    },
    {
      "ar": "لِّمَن",
      "im": "لِّمَن",
      "en": "for whoever",
      "tr": "liman"
    },
    {
      "ar": "يَخْشَىٰٓ",
      "im": "يَخْشَىٰ",
      "en": "fears",
      "tr": "yakhshā"
    }
  ],
  "79:27": [
    {
      "ar": "ءَأَنتُمْ",
      "im": "أَأَنتُمْ",
      "en": "Are you",
      "tr": "a-antum"
    },
    {
      "ar": "أَشَدُّ",
      "im": "أَشَدُّ",
      "en": "a more difficult",
      "tr": "ashaddu"
    },
    {
      "ar": "خَلْقًا",
      "im": "خَلْقًا",
      "en": "creation",
      "tr": "khalqan"
    },
    {
      "ar": "أَمِ",
      "im": "أَمِ",
      "en": "or",
      "tr": "ami"
    },
    {
      "ar": "ٱلسَّمَآءُ ۚ",
      "im": "السَّمَاءُ ۚ",
      "en": "the heaven",
      "tr": "l-samāu"
    },
    {
      "ar": "بَنَىٰهَا",
      "im": "بَنَاهَا",
      "en": "He constructed it",
      "tr": "banāhā"
    }
  ],
  "79:28": [
    {
      "ar": "رَفَعَ",
      "im": "رَفَعَ",
      "en": "He raised",
      "tr": "rafaʿa"
    },
    {
      "ar": "سَمْكَهَا",
      "im": "سَمْكَهَا",
      "en": "its ceiling",
      "tr": "samkahā"
    },
    {
      "ar": "فَسَوَّىٰهَا",
      "im": "فَسَوَّاهَا",
      "en": "and proportioned it",
      "tr": "fasawwāhā"
    }
  ],
  "79:29": [
    {
      "ar": "وَأَغْطَشَ",
      "im": "وَأَغْطَشَ",
      "en": "And He darkened",
      "tr": "wa-aghṭasha"
    },
    {
      "ar": "لَيْلَهَا",
      "im": "لَيْلَهَا",
      "en": "its night",
      "tr": "laylahā"
    },
    {
      "ar": "وَأَخْرَجَ",
      "im": "وَأَخْرَجَ",
      "en": "and brought out",
      "tr": "wa-akhraja"
    },
    {
      "ar": "ضُحَىٰهَا",
      "im": "ضُحَاهَا",
      "en": "its brightness",
      "tr": "ḍuḥāhā"
    }
  ],
  "79:30": [
    {
      "ar": "وَٱلْأَرْضَ",
      "im": "وَالْأَرْضَ",
      "en": "And the earth",
      "tr": "wal-arḍa"
    },
    {
      "ar": "بَعْدَ",
      "im": "بَعْدَ",
      "en": "after",
      "tr": "baʿda"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "دَحَىٰهَآ",
      "im": "دَحَاهَا",
      "en": "He spread it",
      "tr": "daḥāhā"
    }
  ],
  "79:31": [
    {
      "ar": "أَخْرَجَ",
      "im": "أَخْرَجَ",
      "en": "He brought forth",
      "tr": "akhraja"
    },
    {
      "ar": "مِنْهَا",
      "im": "مِنْهَا",
      "en": "from it",
      "tr": "min'hā"
    },
    {
      "ar": "مَآءَهَا",
      "im": "مَاءَهَا",
      "en": "its water",
      "tr": "māahā"
    },
    {
      "ar": "وَمَرْعَىٰهَا",
      "im": "وَمَرْعَاهَا",
      "en": "and its pasture",
      "tr": "wamarʿāhā"
    }
  ],
  "79:32": [
    {
      "ar": "وَٱلْجِبَالَ",
      "im": "وَالْجِبَالَ",
      "en": "And the mountains",
      "tr": "wal-jibāla"
    },
    {
      "ar": "أَرْسَىٰهَا",
      "im": "أَرْسَاهَا",
      "en": "He made them firm",
      "tr": "arsāhā"
    }
  ],
  "79:33": [
    {
      "ar": "مَتَـٰعًۭا",
      "im": "مَتَاعًا",
      "en": "(As) a provision",
      "tr": "matāʿan"
    },
    {
      "ar": "لَّكُمْ",
      "im": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "وَلِأَنْعَـٰمِكُمْ",
      "im": "وَلِأَنْعَامِكُمْ",
      "en": "and for your cattle",
      "tr": "wali-anʿāmikum"
    }
  ],
  "79:34": [
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "But when",
      "tr": "fa-idhā"
    },
    {
      "ar": "جَآءَتِ",
      "im": "جَاءَتِ",
      "en": "comes",
      "tr": "jāati"
    },
    {
      "ar": "ٱلطَّآمَّةُ",
      "im": "الطَّامَّةُ",
      "en": "the Overwhelming Calamity",
      "tr": "l-ṭāmatu"
    },
    {
      "ar": "ٱلْكُبْرَىٰ",
      "im": "الْكُبْرَىٰ",
      "en": "the great",
      "tr": "l-kub'rā"
    }
  ],
  "79:35": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَتَذَكَّرُ",
      "im": "يَتَذَكَّرُ",
      "en": "will remember",
      "tr": "yatadhakkaru"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "سَعَىٰ",
      "im": "سَعَىٰ",
      "en": "he strove (for)",
      "tr": "saʿā"
    }
  ],
  "79:36": [
    {
      "ar": "وَبُرِّزَتِ",
      "im": "وَبُرِّزَتِ",
      "en": "And will be made manifest",
      "tr": "waburrizati"
    },
    {
      "ar": "ٱلْجَحِيمُ",
      "im": "الْجَحِيمُ",
      "en": "the Hellfire",
      "tr": "l-jaḥīmu"
    },
    {
      "ar": "لِمَن",
      "im": "لِمَن",
      "en": "to (him) who",
      "tr": "liman"
    },
    {
      "ar": "يَرَىٰ",
      "im": "يَرَىٰ",
      "en": "sees",
      "tr": "yarā"
    }
  ],
  "79:37": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "Then as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "طَغَىٰ",
      "im": "طَغَىٰ",
      "en": "transgressed",
      "tr": "ṭaghā"
    }
  ],
  "79:38": [
    {
      "ar": "وَءَاثَرَ",
      "im": "وَآثَرَ",
      "en": "And preferred",
      "tr": "waāthara"
    },
    {
      "ar": "ٱلْحَيَوٰةَ",
      "im": "الْحَيَاةَ",
      "en": "the life",
      "tr": "l-ḥayata"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "im": "الدُّنْيَا",
      "en": "(of) the world",
      "tr": "l-dun'yā"
    }
  ],
  "79:39": [
    {
      "ar": "فَإِنَّ",
      "im": "فَإِنَّ",
      "en": "Then indeed",
      "tr": "fa-inna"
    },
    {
      "ar": "ٱلْجَحِيمَ",
      "im": "الْجَحِيمَ",
      "en": "the Hellfire",
      "tr": "l-jaḥīma"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it",
      "tr": "hiya"
    },
    {
      "ar": "ٱلْمَأْوَىٰ",
      "im": "الْمَأْوَىٰ",
      "en": "(is) the refuge",
      "tr": "l-mawā"
    }
  ],
  "79:40": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "خَافَ",
      "im": "خَافَ",
      "en": "feared",
      "tr": "khāfa"
    },
    {
      "ar": "مَقَامَ",
      "im": "مَقَامَ",
      "en": "standing",
      "tr": "maqāma"
    },
    {
      "ar": "رَبِّهِۦ",
      "im": "رَبِّهِ",
      "en": "(before) his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "وَنَهَى",
      "im": "وَنَهَى",
      "en": "and restrained",
      "tr": "wanahā"
    },
    {
      "ar": "ٱلنَّفْسَ",
      "im": "النَّفْسَ",
      "en": "his soul",
      "tr": "l-nafsa"
    },
    {
      "ar": "عَنِ",
      "im": "عَنِ",
      "en": "from",
      "tr": "ʿani"
    },
    {
      "ar": "ٱلْهَوَىٰ",
      "im": "الْهَوَىٰ",
      "en": "the vain desires",
      "tr": "l-hawā"
    }
  ],
  "79:41": [
    {
      "ar": "فَإِنَّ",
      "im": "فَإِنَّ",
      "en": "Then indeed",
      "tr": "fa-inna"
    },
    {
      "ar": "ٱلْجَنَّةَ",
      "im": "الْجَنَّةَ",
      "en": "Paradise",
      "tr": "l-janata"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it (is)",
      "tr": "hiya"
    },
    {
      "ar": "ٱلْمَأْوَىٰ",
      "im": "الْمَأْوَىٰ",
      "en": "the refuge",
      "tr": "l-mawā"
    }
  ],
  "79:42": [
    {
      "ar": "يَسْـَٔلُونَكَ",
      "im": "يَسْأَلُونَكَ",
      "en": "They ask you",
      "tr": "yasalūnaka"
    },
    {
      "ar": "عَنِ",
      "im": "عَنِ",
      "en": "about",
      "tr": "ʿani"
    },
    {
      "ar": "ٱلسَّاعَةِ",
      "im": "السَّاعَةِ",
      "en": "the Hour",
      "tr": "l-sāʿati"
    },
    {
      "ar": "أَيَّانَ",
      "im": "أَيَّانَ",
      "en": "when",
      "tr": "ayyāna"
    },
    {
      "ar": "مُرْسَىٰهَا",
      "im": "مُرْسَاهَا",
      "en": "(is) its arrival",
      "tr": "mur'sāhā"
    }
  ],
  "79:43": [
    {
      "ar": "فِيمَ",
      "im": "فِيمَ",
      "en": "In what",
      "tr": "fīma"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "(are) you",
      "tr": "anta"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "[of]",
      "tr": "min"
    },
    {
      "ar": "ذِكْرَىٰهَآ",
      "im": "ذِكْرَاهَا",
      "en": "(to) mention it",
      "tr": "dhik'rāhā"
    }
  ],
  "79:44": [
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "To",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "مُنتَهَىٰهَآ",
      "im": "مُنتَهَاهَا",
      "en": "(is) its finality",
      "tr": "muntahāhā"
    }
  ],
  "79:45": [
    {
      "ar": "إِنَّمَآ",
      "im": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "مُنذِرُ",
      "im": "مُنذِرُ",
      "en": "(are) a warner",
      "tr": "mundhiru"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(for him) who",
      "tr": "man"
    },
    {
      "ar": "يَخْشَىٰهَا",
      "im": "يَخْشَاهَا",
      "en": "fears it",
      "tr": "yakhshāhā"
    }
  ],
  "79:46": [
    {
      "ar": "كَأَنَّهُمْ",
      "im": "كَأَنَّهُمْ",
      "en": "As though they",
      "tr": "ka-annahum"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(the) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَرَوْنَهَا",
      "im": "يَرَوْنَهَا",
      "en": "they see it",
      "tr": "yarawnahā"
    },
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يَلْبَثُوٓا۟",
      "im": "يَلْبَثُوا",
      "en": "they had remained",
      "tr": "yalbathū"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "عَشِيَّةً",
      "im": "عَشِيَّةً",
      "en": "an evening",
      "tr": "ʿashiyyatan"
    },
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "or",
      "tr": "aw"
    },
    {
      "ar": "ضُحَىٰهَا",
      "im": "ضُحَاهَا",
      "en": "a morning thereof",
      "tr": "ḍuḥāhā"
    }
  ],
  "80:1": [
    {
      "ar": "عَبَسَ",
      "im": "عَبَسَ",
      "en": "He frowned",
      "tr": "ʿabasa"
    },
    {
      "ar": "وَتَوَلَّىٰٓ",
      "im": "وَتَوَلَّىٰ",
      "en": "and turned away",
      "tr": "watawallā"
    }
  ],
  "80:2": [
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "Because",
      "tr": "an"
    },
    {
      "ar": "جَآءَهُ",
      "im": "جَاءَهُ",
      "en": "came to him",
      "tr": "jāahu"
    },
    {
      "ar": "ٱلْأَعْمَىٰ",
      "im": "الْأَعْمَىٰ",
      "en": "the blind man",
      "tr": "l-aʿmā"
    }
  ],
  "80:3": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "But what",
      "tr": "wamā"
    },
    {
      "ar": "يُدْرِيكَ",
      "im": "يُدْرِيكَ",
      "en": "would make you know",
      "tr": "yud'rīka"
    },
    {
      "ar": "لَعَلَّهُۥ",
      "im": "لَعَلَّهُ",
      "en": "that he might",
      "tr": "laʿallahu"
    },
    {
      "ar": "يَزَّكَّىٰٓ",
      "im": "يَزَّكَّىٰ",
      "en": "purify himself",
      "tr": "yazzakkā"
    }
  ],
  "80:4": [
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "Or",
      "tr": "aw"
    },
    {
      "ar": "يَذَّكَّرُ",
      "im": "يَذَّكَّرُ",
      "en": "be reminded",
      "tr": "yadhakkaru"
    },
    {
      "ar": "فَتَنفَعَهُ",
      "im": "فَتَنفَعَهُ",
      "en": "so would benefit him",
      "tr": "fatanfaʿahu"
    },
    {
      "ar": "ٱلذِّكْرَىٰٓ",
      "im": "الذِّكْرَىٰ",
      "en": "the reminder",
      "tr": "l-dhik'rā"
    }
  ],
  "80:5": [
    {
      "ar": "أَمَّا",
      "im": "أَمَّا",
      "en": "As for",
      "tr": "ammā"
    },
    {
      "ar": "مَنِ",
      "im": "مَنِ",
      "en": "(him) who",
      "tr": "mani"
    },
    {
      "ar": "ٱسْتَغْنَىٰ",
      "im": "اسْتَغْنَىٰ",
      "en": "considers himself free from need",
      "tr": "is'taghnā"
    }
  ],
  "80:6": [
    {
      "ar": "فَأَنتَ",
      "im": "فَأَنتَ",
      "en": "So you",
      "tr": "fa-anta"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "to him",
      "tr": "lahu"
    },
    {
      "ar": "تَصَدَّىٰ",
      "im": "تَصَدَّىٰ",
      "en": "give attention",
      "tr": "taṣaddā"
    }
  ],
  "80:7": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "عَلَيْكَ",
      "im": "عَلَيْكَ",
      "en": "upon you",
      "tr": "ʿalayka"
    },
    {
      "ar": "أَلَّا",
      "im": "أَلَّا",
      "en": "that not",
      "tr": "allā"
    },
    {
      "ar": "يَزَّكَّىٰ",
      "im": "يَزَّكَّىٰ",
      "en": "he purifies himself",
      "tr": "yazzakkā"
    }
  ],
  "80:8": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(he) who",
      "tr": "man"
    },
    {
      "ar": "جَآءَكَ",
      "im": "جَاءَكَ",
      "en": "came to you",
      "tr": "jāaka"
    },
    {
      "ar": "يَسْعَىٰ",
      "im": "يَسْعَىٰ",
      "en": "striving",
      "tr": "yasʿā"
    }
  ],
  "80:9": [
    {
      "ar": "وَهُوَ",
      "im": "وَهُوَ",
      "en": "While he",
      "tr": "wahuwa"
    },
    {
      "ar": "يَخْشَىٰ",
      "im": "يَخْشَىٰ",
      "en": "fears",
      "tr": "yakhshā"
    }
  ],
  "80:10": [
    {
      "ar": "فَأَنتَ",
      "im": "فَأَنتَ",
      "en": "But you",
      "tr": "fa-anta"
    },
    {
      "ar": "عَنْهُ",
      "im": "عَنْهُ",
      "en": "from him",
      "tr": "ʿanhu"
    },
    {
      "ar": "تَلَهَّىٰ",
      "im": "تَلَهَّىٰ",
      "en": "(are) distracted",
      "tr": "talahhā"
    }
  ],
  "80:11": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِنَّهَا",
      "im": "إِنَّهَا",
      "en": "Indeed, it",
      "tr": "innahā"
    },
    {
      "ar": "تَذْكِرَةٌۭ",
      "im": "تَذْكِرَةٌ",
      "en": "(is) a reminder",
      "tr": "tadhkiratun"
    }
  ],
  "80:12": [
    {
      "ar": "فَمَن",
      "im": "فَمَن",
      "en": "So whosoever",
      "tr": "faman"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "wills",
      "tr": "shāa"
    },
    {
      "ar": "ذَكَرَهُۥ",
      "im": "ذَكَرَهُ",
      "en": "may remember it",
      "tr": "dhakarahu"
    }
  ],
  "80:13": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "صُحُفٍۢ",
      "im": "صُحُفٍ",
      "en": "sheets",
      "tr": "ṣuḥufin"
    },
    {
      "ar": "مُّكَرَّمَةٍۢ",
      "im": "مُّكَرَّمَةٍ",
      "en": "honored",
      "tr": "mukarramatin"
    }
  ],
  "80:14": [
    {
      "ar": "مَّرْفُوعَةٍۢ",
      "im": "مَّرْفُوعَةٍ",
      "en": "Exalted",
      "tr": "marfūʿatin"
    },
    {
      "ar": "مُّطَهَّرَةٍۭ",
      "im": "مُّطَهَّرَةٍ",
      "en": "purified",
      "tr": "muṭahharatin"
    }
  ],
  "80:15": [
    {
      "ar": "بِأَيْدِى",
      "im": "بِأَيْدِي",
      "en": "In (the) hands",
      "tr": "bi-aydī"
    },
    {
      "ar": "سَفَرَةٍۢ",
      "im": "سَفَرَةٍ",
      "en": "(of) scribes",
      "tr": "safaratin"
    }
  ],
  "80:16": [
    {
      "ar": "كِرَامٍۭ",
      "im": "كِرَامٍ",
      "en": "Noble",
      "tr": "kirāmin"
    },
    {
      "ar": "بَرَرَةٍۢ",
      "im": "بَرَرَةٍ",
      "en": "dutiful",
      "tr": "bararatin"
    }
  ],
  "80:17": [
    {
      "ar": "قُتِلَ",
      "im": "قُتِلَ",
      "en": "Is destroyed",
      "tr": "qutila"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "[the] man",
      "tr": "l-insānu"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "how",
      "tr": "mā"
    },
    {
      "ar": "أَكْفَرَهُۥ",
      "im": "أَكْفَرَهُ",
      "en": "ungrateful is he",
      "tr": "akfarahu"
    }
  ],
  "80:18": [
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "أَىِّ",
      "im": "أَيِّ",
      "en": "what",
      "tr": "ayyi"
    },
    {
      "ar": "شَىْءٍ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "خَلَقَهُۥ",
      "im": "خَلَقَهُ",
      "en": "He created him",
      "tr": "khalaqahu"
    }
  ],
  "80:19": [
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "نُّطْفَةٍ",
      "im": "نُّطْفَةٍ",
      "en": "a semen-drop",
      "tr": "nuṭ'fatin"
    },
    {
      "ar": "خَلَقَهُۥ",
      "im": "خَلَقَهُ",
      "en": "He created him",
      "tr": "khalaqahu"
    },
    {
      "ar": "فَقَدَّرَهُۥ",
      "im": "فَقَدَّرَهُ",
      "en": "then He proportioned him",
      "tr": "faqaddarahu"
    }
  ],
  "80:20": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "ٱلسَّبِيلَ",
      "im": "السَّبِيلَ",
      "en": "the way",
      "tr": "l-sabīla"
    },
    {
      "ar": "يَسَّرَهُۥ",
      "im": "يَسَّرَهُ",
      "en": "He made easy for him",
      "tr": "yassarahu"
    }
  ],
  "80:21": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "أَمَاتَهُۥ",
      "im": "أَمَاتَهُ",
      "en": "He causes him to die",
      "tr": "amātahu"
    },
    {
      "ar": "فَأَقْبَرَهُۥ",
      "im": "فَأَقْبَرَهُ",
      "en": "and provides a grave for him",
      "tr": "fa-aqbarahu"
    }
  ],
  "80:22": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "He wills",
      "tr": "shāa"
    },
    {
      "ar": "أَنشَرَهُۥ",
      "im": "أَنشَرَهُ",
      "en": "He will resurrect him",
      "tr": "ansharahu"
    }
  ],
  "80:23": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "لَمَّا",
      "im": "لَمَّا",
      "en": "Not",
      "tr": "lammā"
    },
    {
      "ar": "يَقْضِ",
      "im": "يَقْضِ",
      "en": "he has accomplished",
      "tr": "yaqḍi"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "أَمَرَهُۥ",
      "im": "أَمَرَهُ",
      "en": "He commanded him",
      "tr": "amarahu"
    }
  ],
  "80:24": [
    {
      "ar": "فَلْيَنظُرِ",
      "im": "فَلْيَنظُرِ",
      "en": "Then let look",
      "tr": "falyanẓuri"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "the man",
      "tr": "l-insānu"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "at",
      "tr": "ilā"
    },
    {
      "ar": "طَعَامِهِۦٓ",
      "im": "طَعَامِهِ",
      "en": "his food",
      "tr": "ṭaʿāmihi"
    }
  ],
  "80:25": [
    {
      "ar": "اَنَّا",
      "im": "أَنَّا",
      "en": "That [We]",
      "tr": "annā"
    },
    {
      "ar": "صَبَبْنَا",
      "im": "صَبَبْنَا",
      "en": "[We] poured",
      "tr": "ṣababnā"
    },
    {
      "ar": "ٱلْمَآءَ",
      "im": "الْمَاءَ",
      "en": "the water",
      "tr": "l-māa"
    },
    {
      "ar": "صَبًّۭا",
      "im": "صَبًّا",
      "en": "(in) abundance",
      "tr": "ṣabban"
    }
  ],
  "80:26": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "شَقَقْنَا",
      "im": "شَقَقْنَا",
      "en": "We cleaved",
      "tr": "shaqaqnā"
    },
    {
      "ar": "ٱلْأَرْضَ",
      "im": "الْأَرْضَ",
      "en": "the earth",
      "tr": "l-arḍa"
    },
    {
      "ar": "شَقًّۭا",
      "im": "شَقًّا",
      "en": "splitting",
      "tr": "shaqqan"
    }
  ],
  "80:27": [
    {
      "ar": "فَأَنۢبَتْنَا",
      "im": "فَأَنبَتْنَا",
      "en": "Then We caused to grow",
      "tr": "fa-anbatnā"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "حَبًّۭا",
      "im": "حَبًّا",
      "en": "grain",
      "tr": "ḥabban"
    }
  ],
  "80:28": [
    {
      "ar": "وَعِنَبًۭا",
      "im": "وَعِنَبًا",
      "en": "And grapes",
      "tr": "waʿinaban"
    },
    {
      "ar": "وَقَضْبًۭا",
      "im": "وَقَضْبًا",
      "en": "and green fodder",
      "tr": "waqaḍban"
    }
  ],
  "80:29": [
    {
      "ar": "وَزَيْتُونًۭا",
      "im": "وَزَيْتُونًا",
      "en": "And olive",
      "tr": "wazaytūnan"
    },
    {
      "ar": "وَنَخْلًۭا",
      "im": "وَنَخْلًا",
      "en": "and date-palms",
      "tr": "wanakhlan"
    }
  ],
  "80:30": [
    {
      "ar": "وَحَدَآئِقَ",
      "im": "وَحَدَائِقَ",
      "en": "And gardens",
      "tr": "waḥadāiqa"
    },
    {
      "ar": "غُلْبًۭا",
      "im": "غُلْبًا",
      "en": "(of) thick foliage",
      "tr": "ghul'ban"
    }
  ],
  "80:31": [
    {
      "ar": "وَفَـٰكِهَةًۭ",
      "im": "وَفَاكِهَةً",
      "en": "And fruits",
      "tr": "wafākihatan"
    },
    {
      "ar": "وَأَبًّۭا",
      "im": "وَأَبًّا",
      "en": "and grass",
      "tr": "wa-abban"
    }
  ],
  "80:32": [
    {
      "ar": "مَّتَـٰعًۭا",
      "im": "مَّتَاعًا",
      "en": "(As) a provision",
      "tr": "matāʿan"
    },
    {
      "ar": "لَّكُمْ",
      "im": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "وَلِأَنْعَـٰمِكُمْ",
      "im": "وَلِأَنْعَامِكُمْ",
      "en": "and for your cattle",
      "tr": "wali-anʿāmikum"
    }
  ],
  "80:33": [
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "But when",
      "tr": "fa-idhā"
    },
    {
      "ar": "جَآءَتِ",
      "im": "جَاءَتِ",
      "en": "comes",
      "tr": "jāati"
    },
    {
      "ar": "ٱلصَّآخَّةُ",
      "im": "الصَّاخَّةُ",
      "en": "the Deafening Blast",
      "tr": "l-ṣākhatu"
    }
  ],
  "80:34": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَفِرُّ",
      "im": "يَفِرُّ",
      "en": "will flee",
      "tr": "yafirru"
    },
    {
      "ar": "ٱلْمَرْءُ",
      "im": "الْمَرْءُ",
      "en": "a man",
      "tr": "l-maru"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَخِيهِ",
      "im": "أَخِيهِ",
      "en": "his brother",
      "tr": "akhīhi"
    }
  ],
  "80:35": [
    {
      "ar": "وَأُمِّهِۦ",
      "im": "وَأُمِّهِ",
      "en": "And his mother",
      "tr": "wa-ummihi"
    },
    {
      "ar": "وَأَبِيهِ",
      "im": "وَأَبِيهِ",
      "en": "and his father",
      "tr": "wa-abīhi"
    }
  ],
  "80:36": [
    {
      "ar": "وَصَـٰحِبَتِهِۦ",
      "im": "وَصَاحِبَتِهِ",
      "en": "And his wife",
      "tr": "waṣāḥibatihi"
    },
    {
      "ar": "وَبَنِيهِ",
      "im": "وَبَنِيهِ",
      "en": "and his children",
      "tr": "wabanīhi"
    }
  ],
  "80:37": [
    {
      "ar": "لِكُلِّ",
      "im": "لِكُلِّ",
      "en": "For every",
      "tr": "likulli"
    },
    {
      "ar": "ٱمْرِئٍۢ",
      "im": "امْرِئٍ",
      "en": "man",
      "tr": "im'ri-in"
    },
    {
      "ar": "مِّنْهُمْ",
      "im": "مِّنْهُمْ",
      "en": "among them",
      "tr": "min'hum"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "شَأْنٌۭ",
      "im": "شَأْنٌ",
      "en": "(will be) a matter",
      "tr": "shanun"
    },
    {
      "ar": "يُغْنِيهِ",
      "im": "يُغْنِيهِ",
      "en": "occupying him",
      "tr": "yugh'nīhi"
    }
  ],
  "80:38": [
    {
      "ar": "وُجُوهٌۭ",
      "im": "وُجُوهٌ",
      "en": "Faces",
      "tr": "wujūhun"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "مُّسْفِرَةٌۭ",
      "im": "مُّسْفِرَةٌ",
      "en": "(will be) bright",
      "tr": "mus'firatun"
    }
  ],
  "80:39": [
    {
      "ar": "ضَاحِكَةٌۭ",
      "im": "ضَاحِكَةٌ",
      "en": "Laughing",
      "tr": "ḍāḥikatun"
    },
    {
      "ar": "مُّسْتَبْشِرَةٌۭ",
      "im": "مُّسْتَبْشِرَةٌ",
      "en": "rejoicing at good news",
      "tr": "mus'tabshiratun"
    }
  ],
  "80:40": [
    {
      "ar": "وَوُجُوهٌۭ",
      "im": "وَوُجُوهٌ",
      "en": "And faces",
      "tr": "wawujūhun"
    },
    {
      "ar": "يَوْمَئِذٍ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "عَلَيْهَا",
      "im": "عَلَيْهَا",
      "en": "upon them",
      "tr": "ʿalayhā"
    },
    {
      "ar": "غَبَرَةٌۭ",
      "im": "غَبَرَةٌ",
      "en": "(will be) dust",
      "tr": "ghabaratun"
    }
  ],
  "80:41": [
    {
      "ar": "تَرْهَقُهَا",
      "im": "تَرْهَقُهَا",
      "en": "Will cover them",
      "tr": "tarhaquhā"
    },
    {
      "ar": "قَتَرَةٌ",
      "im": "قَتَرَةٌ",
      "en": "darkness",
      "tr": "qataratun"
    }
  ],
  "80:42": [
    {
      "ar": "أُو۟لَـٰٓئِكَ",
      "im": "أُولَٰئِكَ",
      "en": "Those",
      "tr": "ulāika"
    },
    {
      "ar": "هُمُ",
      "im": "هُمُ",
      "en": "[they]",
      "tr": "humu"
    },
    {
      "ar": "ٱلْكَفَرَةُ",
      "im": "الْكَفَرَةُ",
      "en": "(are) the disbelievers",
      "tr": "l-kafaratu"
    },
    {
      "ar": "ٱلْفَجَرَةُ",
      "im": "الْفَجَرَةُ",
      "en": "the wicked ones",
      "tr": "l-fajaratu"
    }
  ],
  "81:1": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "ٱلشَّمْسُ",
      "im": "الشَّمْسُ",
      "en": "the sun",
      "tr": "l-shamsu"
    },
    {
      "ar": "كُوِّرَتْ",
      "im": "كُوِّرَتْ",
      "en": "is wrapped up",
      "tr": "kuwwirat"
    }
  ],
  "81:2": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلنُّجُومُ",
      "im": "النُّجُومُ",
      "en": "the stars",
      "tr": "l-nujūmu"
    },
    {
      "ar": "ٱنكَدَرَتْ",
      "im": "انكَدَرَتْ",
      "en": "fall, losing their luster",
      "tr": "inkadarat"
    }
  ],
  "81:3": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْجِبَالُ",
      "im": "الْجِبَالُ",
      "en": "the mountains",
      "tr": "l-jibālu"
    },
    {
      "ar": "سُيِّرَتْ",
      "im": "سُيِّرَتْ",
      "en": "are moved away",
      "tr": "suyyirat"
    }
  ],
  "81:4": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْعِشَارُ",
      "im": "الْعِشَارُ",
      "en": "the full-term she-camels",
      "tr": "l-ʿishāru"
    },
    {
      "ar": "عُطِّلَتْ",
      "im": "عُطِّلَتْ",
      "en": "(are) left untended",
      "tr": "ʿuṭṭilat"
    }
  ],
  "81:5": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْوُحُوشُ",
      "im": "الْوُحُوشُ",
      "en": "the wild beasts",
      "tr": "l-wuḥūshu"
    },
    {
      "ar": "حُشِرَتْ",
      "im": "حُشِرَتْ",
      "en": "are gathered",
      "tr": "ḥushirat"
    }
  ],
  "81:6": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْبِحَارُ",
      "im": "الْبِحَارُ",
      "en": "the seas",
      "tr": "l-biḥāru"
    },
    {
      "ar": "سُجِّرَتْ",
      "im": "سُجِّرَتْ",
      "en": "are made to overflow",
      "tr": "sujjirat"
    }
  ],
  "81:7": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلنُّفُوسُ",
      "im": "النُّفُوسُ",
      "en": "the souls",
      "tr": "l-nufūsu"
    },
    {
      "ar": "زُوِّجَتْ",
      "im": "زُوِّجَتْ",
      "en": "are paired",
      "tr": "zuwwijat"
    }
  ],
  "81:8": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْمَوْءُۥدَةُ",
      "im": "الْمَوْءُودَةُ",
      "en": "the female infant buried alive",
      "tr": "l-mawūdatu"
    },
    {
      "ar": "سُئِلَتْ",
      "im": "سُئِلَتْ",
      "en": "is asked",
      "tr": "su-ilat"
    }
  ],
  "81:9": [
    {
      "ar": "بِأَىِّ",
      "im": "بِأَيِّ",
      "en": "For what",
      "tr": "bi-ayyi"
    },
    {
      "ar": "ذَنۢبٍۢ",
      "im": "ذَنبٍ",
      "en": "sin",
      "tr": "dhanbin"
    },
    {
      "ar": "قُتِلَتْ",
      "im": "قُتِلَتْ",
      "en": "she was killed",
      "tr": "qutilat"
    }
  ],
  "81:10": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلصُّحُفُ",
      "im": "الصُّحُفُ",
      "en": "the pages",
      "tr": "l-ṣuḥufu"
    },
    {
      "ar": "نُشِرَتْ",
      "im": "نُشِرَتْ",
      "en": "are laid open",
      "tr": "nushirat"
    }
  ],
  "81:11": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلسَّمَآءُ",
      "im": "السَّمَاءُ",
      "en": "the sky",
      "tr": "l-samāu"
    },
    {
      "ar": "كُشِطَتْ",
      "im": "كُشِطَتْ",
      "en": "is stripped away",
      "tr": "kushiṭat"
    }
  ],
  "81:12": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْجَحِيمُ",
      "im": "الْجَحِيمُ",
      "en": "the Hellfire",
      "tr": "l-jaḥīmu"
    },
    {
      "ar": "سُعِّرَتْ",
      "im": "سُعِّرَتْ",
      "en": "is set ablaze",
      "tr": "suʿʿirat"
    }
  ],
  "81:13": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْجَنَّةُ",
      "im": "الْجَنَّةُ",
      "en": "Paradise",
      "tr": "l-janatu"
    },
    {
      "ar": "أُزْلِفَتْ",
      "im": "أُزْلِفَتْ",
      "en": "is brought near",
      "tr": "uz'lifat"
    }
  ],
  "81:14": [
    {
      "ar": "عَلِمَتْ",
      "im": "عَلِمَتْ",
      "en": "Will know",
      "tr": "ʿalimat"
    },
    {
      "ar": "نَفْسٌۭ",
      "im": "نَفْسٌ",
      "en": "a soul",
      "tr": "nafsun"
    },
    {
      "ar": "مَّآ",
      "im": "مَّا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "أَحْضَرَتْ",
      "im": "أَحْضَرَتْ",
      "en": "it has brought",
      "tr": "aḥḍarat"
    }
  ],
  "81:15": [
    {
      "ar": "فَلَآ",
      "im": "فَلَا",
      "en": "But nay",
      "tr": "falā"
    },
    {
      "ar": "أُقْسِمُ",
      "im": "أُقْسِمُ",
      "en": "I swear",
      "tr": "uq'simu"
    },
    {
      "ar": "بِٱلْخُنَّسِ",
      "im": "بِالْخُنَّسِ",
      "en": "by the retreating planets",
      "tr": "bil-khunasi"
    }
  ],
  "81:16": [
    {
      "ar": "ٱلْجَوَارِ",
      "im": "الْجَوَارِ",
      "en": "Those that run",
      "tr": "al-jawāri"
    },
    {
      "ar": "ٱلْكُنَّسِ",
      "im": "الْكُنَّسِ",
      "en": "(and) disappear",
      "tr": "l-kunasi"
    }
  ],
  "81:17": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "And the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "عَسْعَسَ",
      "im": "عَسْعَسَ",
      "en": "it departs",
      "tr": "ʿasʿasa"
    }
  ],
  "81:18": [
    {
      "ar": "وَٱلصُّبْحِ",
      "im": "وَالصُّبْحِ",
      "en": "And the dawn",
      "tr": "wal-ṣub'ḥi"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "تَنَفَّسَ",
      "im": "تَنَفَّسَ",
      "en": "it breathes",
      "tr": "tanaffasa"
    }
  ],
  "81:19": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, it",
      "tr": "innahu"
    },
    {
      "ar": "لَقَوْلُ",
      "im": "لَقَوْلُ",
      "en": "(is) surely a word",
      "tr": "laqawlu"
    },
    {
      "ar": "رَسُولٍۢ",
      "im": "رَسُولٍ",
      "en": "(of) a Messenger",
      "tr": "rasūlin"
    },
    {
      "ar": "كَرِيمٍۢ",
      "im": "كَرِيمٍ",
      "en": "noble",
      "tr": "karīmin"
    }
  ],
  "81:20": [
    {
      "ar": "ذِى",
      "im": "ذِي",
      "en": "Possessor of",
      "tr": "dhī"
    },
    {
      "ar": "قُوَّةٍ",
      "im": "قُوَّةٍ",
      "en": "power",
      "tr": "quwwatin"
    },
    {
      "ar": "عِندَ",
      "im": "عِندَ",
      "en": "with",
      "tr": "ʿinda"
    },
    {
      "ar": "ذِى",
      "im": "ذِي",
      "en": "(the) Owner of",
      "tr": "dhī"
    },
    {
      "ar": "ٱلْعَرْشِ",
      "im": "الْعَرْشِ",
      "en": "the Throne",
      "tr": "l-ʿarshi"
    },
    {
      "ar": "مَكِينٍۢ",
      "im": "مَكِينٍ",
      "en": "secure",
      "tr": "makīnin"
    }
  ],
  "81:21": [
    {
      "ar": "مُّطَاعٍۢ",
      "im": "مُّطَاعٍ",
      "en": "One to be obeyed",
      "tr": "muṭāʿin"
    },
    {
      "ar": "ثَمَّ",
      "im": "ثَمَّ",
      "en": "and",
      "tr": "thamma"
    },
    {
      "ar": "أَمِينٍۢ",
      "im": "أَمِينٍ",
      "en": "trustworthy",
      "tr": "amīnin"
    }
  ],
  "81:22": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "صَاحِبُكُم",
      "im": "صَاحِبُكُم",
      "en": "(is) your companion",
      "tr": "ṣāḥibukum"
    },
    {
      "ar": "بِمَجْنُونٍۢ",
      "im": "بِمَجْنُونٍ",
      "en": "mad",
      "tr": "bimajnūnin"
    }
  ],
  "81:23": [
    {
      "ar": "وَلَقَدْ",
      "im": "وَلَقَدْ",
      "en": "And certainly",
      "tr": "walaqad"
    },
    {
      "ar": "رَءَاهُ",
      "im": "رَآهُ",
      "en": "he saw him",
      "tr": "raāhu"
    },
    {
      "ar": "بِٱلْأُفُقِ",
      "im": "بِالْأُفُقِ",
      "en": "in the horizon",
      "tr": "bil-ufuqi"
    },
    {
      "ar": "ٱلْمُبِينِ",
      "im": "الْمُبِينِ",
      "en": "the clear",
      "tr": "l-mubīni"
    }
  ],
  "81:24": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "he (is)",
      "tr": "huwa"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْغَيْبِ",
      "im": "الْغَيْبِ",
      "en": "the unseen",
      "tr": "l-ghaybi"
    },
    {
      "ar": "بِضَنِينٍۢ",
      "im": "بِضَنِينٍ",
      "en": "a withholder",
      "tr": "biḍanīnin"
    }
  ],
  "81:25": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "it",
      "tr": "huwa"
    },
    {
      "ar": "بِقَوْلِ",
      "im": "بِقَوْلِ",
      "en": "(is the) word",
      "tr": "biqawli"
    },
    {
      "ar": "شَيْطَـٰنٍۢ",
      "im": "شَيْطَانٍ",
      "en": "(of) Shaitaan",
      "tr": "shayṭānin"
    },
    {
      "ar": "رَّجِيمٍۢ",
      "im": "رَّجِيمٍ",
      "en": "accursed",
      "tr": "rajīmin"
    }
  ],
  "81:26": [
    {
      "ar": "فَأَيْنَ",
      "im": "فَأَيْنَ",
      "en": "So where",
      "tr": "fa-ayna"
    },
    {
      "ar": "تَذْهَبُونَ",
      "im": "تَذْهَبُونَ",
      "en": "are you going",
      "tr": "tadhhabūna"
    }
  ],
  "81:27": [
    {
      "ar": "إِنْ",
      "im": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "it",
      "tr": "huwa"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "(is) except",
      "tr": "illā"
    },
    {
      "ar": "ذِكْرٌۭ",
      "im": "ذِكْرٌ",
      "en": "a reminder",
      "tr": "dhik'run"
    },
    {
      "ar": "لِّلْعَـٰلَمِينَ",
      "im": "لِّلْعَالَمِينَ",
      "en": "to the worlds",
      "tr": "lil'ʿālamīna"
    }
  ],
  "81:28": [
    {
      "ar": "لِمَن",
      "im": "لِمَن",
      "en": "For whoever",
      "tr": "liman"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "wills",
      "tr": "shāa"
    },
    {
      "ar": "مِنكُمْ",
      "im": "مِنكُمْ",
      "en": "among you",
      "tr": "minkum"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "to",
      "tr": "an"
    },
    {
      "ar": "يَسْتَقِيمَ",
      "im": "يَسْتَقِيمَ",
      "en": "take a straight way",
      "tr": "yastaqīma"
    }
  ],
  "81:29": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَشَآءُونَ",
      "im": "تَشَاءُونَ",
      "en": "you will",
      "tr": "tashāūna"
    },
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يَشَآءَ",
      "im": "يَشَاءَ",
      "en": "wills",
      "tr": "yashāa"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "رَبُّ",
      "im": "رَبُّ",
      "en": "Lord",
      "tr": "rabbu"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "82:1": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "ٱلسَّمَآءُ",
      "im": "السَّمَاءُ",
      "en": "the sky",
      "tr": "l-samāu"
    },
    {
      "ar": "ٱنفَطَرَتْ",
      "im": "انفَطَرَتْ",
      "en": "(is) cleft asunder",
      "tr": "infaṭarat"
    }
  ],
  "82:2": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْكَوَاكِبُ",
      "im": "الْكَوَاكِبُ",
      "en": "the stars",
      "tr": "l-kawākibu"
    },
    {
      "ar": "ٱنتَثَرَتْ",
      "im": "انتَثَرَتْ",
      "en": "scatter",
      "tr": "intatharat"
    }
  ],
  "82:3": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْبِحَارُ",
      "im": "الْبِحَارُ",
      "en": "the seas",
      "tr": "l-biḥāru"
    },
    {
      "ar": "فُجِّرَتْ",
      "im": "فُجِّرَتْ",
      "en": "are made to gush forth",
      "tr": "fujjirat"
    }
  ],
  "82:4": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْقُبُورُ",
      "im": "الْقُبُورُ",
      "en": "the graves",
      "tr": "l-qubūru"
    },
    {
      "ar": "بُعْثِرَتْ",
      "im": "بُعْثِرَتْ",
      "en": "are overturned",
      "tr": "buʿ'thirat"
    }
  ],
  "82:5": [
    {
      "ar": "عَلِمَتْ",
      "im": "عَلِمَتْ",
      "en": "Will know",
      "tr": "ʿalimat"
    },
    {
      "ar": "نَفْسٌۭ",
      "im": "نَفْسٌ",
      "en": "a soul",
      "tr": "nafsun"
    },
    {
      "ar": "مَّا",
      "im": "مَّا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "قَدَّمَتْ",
      "im": "قَدَّمَتْ",
      "en": "it has sent forth",
      "tr": "qaddamat"
    },
    {
      "ar": "وَأَخَّرَتْ",
      "im": "وَأَخَّرَتْ",
      "en": "and left behind",
      "tr": "wa-akharat"
    }
  ],
  "82:6": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "im": "يَا أَيُّهَا",
      "en": "O",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "What",
      "tr": "mā"
    },
    {
      "ar": "غَرَّكَ",
      "im": "غَرَّكَ",
      "en": "has deceived you",
      "tr": "gharraka"
    },
    {
      "ar": "بِرَبِّكَ",
      "im": "بِرَبِّكَ",
      "en": "concerning your Lord",
      "tr": "birabbika"
    },
    {
      "ar": "ٱلْكَرِيمِ",
      "im": "الْكَرِيمِ",
      "en": "the Most Noble",
      "tr": "l-karīmi"
    }
  ],
  "82:7": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "Who",
      "tr": "alladhī"
    },
    {
      "ar": "خَلَقَكَ",
      "im": "خَلَقَكَ",
      "en": "created you",
      "tr": "khalaqaka"
    },
    {
      "ar": "فَسَوَّىٰكَ",
      "im": "فَسَوَّاكَ",
      "en": "then fashioned you",
      "tr": "fasawwāka"
    },
    {
      "ar": "فَعَدَلَكَ",
      "im": "فَعَدَلَكَ",
      "en": "then balanced you",
      "tr": "faʿadalaka"
    }
  ],
  "82:8": [
    {
      "ar": "فِىٓ",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "أَىِّ",
      "im": "أَيِّ",
      "en": "whatever",
      "tr": "ayyi"
    },
    {
      "ar": "صُورَةٍۢ",
      "im": "صُورَةٍ",
      "en": "form",
      "tr": "ṣūratin"
    },
    {
      "ar": "مَّا",
      "im": "مَّا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "He willed",
      "tr": "shāa"
    },
    {
      "ar": "رَكَّبَكَ",
      "im": "رَكَّبَكَ",
      "en": "He assembled you",
      "tr": "rakkabaka"
    }
  ],
  "82:9": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "بَلْ",
      "im": "بَلْ",
      "en": "But",
      "tr": "bal"
    },
    {
      "ar": "تُكَذِّبُونَ",
      "im": "تُكَذِّبُونَ",
      "en": "you deny",
      "tr": "tukadhibūna"
    },
    {
      "ar": "بِٱلدِّينِ",
      "im": "بِالدِّينِ",
      "en": "the Judgment",
      "tr": "bil-dīni"
    }
  ],
  "82:10": [
    {
      "ar": "وَإِنَّ",
      "im": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "عَلَيْكُمْ",
      "im": "عَلَيْكُمْ",
      "en": "over you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "لَحَـٰفِظِينَ",
      "im": "لَحَافِظِينَ",
      "en": "(are) surely guardians",
      "tr": "laḥāfiẓīna"
    }
  ],
  "82:11": [
    {
      "ar": "كِرَامًۭا",
      "im": "كِرَامًا",
      "en": "Noble",
      "tr": "kirāman"
    },
    {
      "ar": "كَـٰتِبِينَ",
      "im": "كَاتِبِينَ",
      "en": "recording",
      "tr": "kātibīna"
    }
  ],
  "82:12": [
    {
      "ar": "يَعْلَمُونَ",
      "im": "يَعْلَمُونَ",
      "en": "They know",
      "tr": "yaʿlamūna"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "whatever",
      "tr": "mā"
    },
    {
      "ar": "تَفْعَلُونَ",
      "im": "تَفْعَلُونَ",
      "en": "you do",
      "tr": "tafʿalūna"
    }
  ],
  "82:13": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلْأَبْرَارَ",
      "im": "الْأَبْرَارَ",
      "en": "the righteous",
      "tr": "l-abrāra"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(will be) surely in",
      "tr": "lafī"
    },
    {
      "ar": "نَعِيمٍۢ",
      "im": "نَعِيمٍ",
      "en": "bliss",
      "tr": "naʿīmin"
    }
  ],
  "82:14": [
    {
      "ar": "وَإِنَّ",
      "im": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "ٱلْفُجَّارَ",
      "im": "الْفُجَّارَ",
      "en": "the wicked",
      "tr": "l-fujāra"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(will be) surely in",
      "tr": "lafī"
    },
    {
      "ar": "جَحِيمٍۢ",
      "im": "جَحِيمٍ",
      "en": "Hellfire",
      "tr": "jaḥīmin"
    }
  ],
  "82:15": [
    {
      "ar": "يَصْلَوْنَهَا",
      "im": "يَصْلَوْنَهَا",
      "en": "They will burn (in) it",
      "tr": "yaṣlawnahā"
    },
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(on the) Day",
      "tr": "yawma"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "82:16": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "عَنْهَا",
      "im": "عَنْهَا",
      "en": "from it",
      "tr": "ʿanhā"
    },
    {
      "ar": "بِغَآئِبِينَ",
      "im": "بِغَائِبِينَ",
      "en": "(will be) absent",
      "tr": "bighāibīna"
    }
  ],
  "82:17": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَوْمُ",
      "im": "يَوْمُ",
      "en": "(is the) Day",
      "tr": "yawmu"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "82:18": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَوْمُ",
      "im": "يَوْمُ",
      "en": "(is the) Day",
      "tr": "yawmu"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "82:19": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "تَمْلِكُ",
      "im": "تَمْلِكُ",
      "en": "will have power",
      "tr": "tamliku"
    },
    {
      "ar": "نَفْسٌۭ",
      "im": "نَفْسٌ",
      "en": "a soul",
      "tr": "nafsun"
    },
    {
      "ar": "لِّنَفْسٍۢ",
      "im": "لِّنَفْسٍ",
      "en": "for a soul",
      "tr": "linafsin"
    },
    {
      "ar": "شَيْـًۭٔا ۖ",
      "im": "شَيْئًا ۖ",
      "en": "anything",
      "tr": "shayan"
    },
    {
      "ar": "وَٱلْأَمْرُ",
      "im": "وَالْأَمْرُ",
      "en": "and the Command",
      "tr": "wal-amru"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "لِّلَّهِ",
      "im": "لِّلَّهِ",
      "en": "(will be) with Allah",
      "tr": "lillahi"
    }
  ],
  "83:1": [
    {
      "ar": "وَيْلٌۭ",
      "im": "وَيْلٌ",
      "en": "Woe",
      "tr": "waylun"
    },
    {
      "ar": "لِّلْمُطَفِّفِينَ",
      "im": "لِّلْمُطَفِّفِينَ",
      "en": "to those who give less",
      "tr": "lil'muṭaffifīna"
    }
  ],
  "83:2": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "ٱكْتَالُوا۟",
      "im": "اكْتَالُوا",
      "en": "they take a measure",
      "tr": "ik'tālū"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "from",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "the people",
      "tr": "l-nāsi"
    },
    {
      "ar": "يَسْتَوْفُونَ",
      "im": "يَسْتَوْفُونَ",
      "en": "they take in full",
      "tr": "yastawfūna"
    }
  ],
  "83:3": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "But when",
      "tr": "wa-idhā"
    },
    {
      "ar": "كَالُوهُمْ",
      "im": "كَالُوهُمْ",
      "en": "they give by measure (to) them",
      "tr": "kālūhum"
    },
    {
      "ar": "أَو",
      "im": "أَو",
      "en": "or",
      "tr": "aw"
    },
    {
      "ar": "وَّزَنُوهُمْ",
      "im": "وَّزَنُوهُمْ",
      "en": "they weigh (for) them",
      "tr": "wazanūhum"
    },
    {
      "ar": "يُخْسِرُونَ",
      "im": "يُخْسِرُونَ",
      "en": "they give less",
      "tr": "yukh'sirūna"
    }
  ],
  "83:4": [
    {
      "ar": "أَلَا",
      "im": "أَلَا",
      "en": "Do not",
      "tr": "alā"
    },
    {
      "ar": "يَظُنُّ",
      "im": "يَظُنُّ",
      "en": "think",
      "tr": "yaẓunnu"
    },
    {
      "ar": "أُو۟لَـٰٓئِكَ",
      "im": "أُولَٰئِكَ",
      "en": "those",
      "tr": "ulāika"
    },
    {
      "ar": "أَنَّهُم",
      "im": "أَنَّهُم",
      "en": "that they",
      "tr": "annahum"
    },
    {
      "ar": "مَّبْعُوثُونَ",
      "im": "مَّبْعُوثُونَ",
      "en": "(will be) resurrected",
      "tr": "mabʿūthūna"
    }
  ],
  "83:5": [
    {
      "ar": "لِيَوْمٍ",
      "im": "لِيَوْمٍ",
      "en": "For a Day",
      "tr": "liyawmin"
    },
    {
      "ar": "عَظِيمٍۢ",
      "im": "عَظِيمٍ",
      "en": "Great",
      "tr": "ʿaẓīmin"
    }
  ],
  "83:6": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَقُومُ",
      "im": "يَقُومُ",
      "en": "will stand",
      "tr": "yaqūmu"
    },
    {
      "ar": "ٱلنَّاسُ",
      "im": "النَّاسُ",
      "en": "mankind",
      "tr": "l-nāsu"
    },
    {
      "ar": "لِرَبِّ",
      "im": "لِرَبِّ",
      "en": "before (the) Lord",
      "tr": "lirabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "im": "الْعَالَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "83:7": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "كِتَـٰبَ",
      "im": "كِتَابَ",
      "en": "(the) record",
      "tr": "kitāba"
    },
    {
      "ar": "ٱلْفُجَّارِ",
      "im": "الْفُجَّارِ",
      "en": "(of) the wicked",
      "tr": "l-fujāri"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(is) surely in",
      "tr": "lafī"
    },
    {
      "ar": "سِجِّينٍۢ",
      "im": "سِجِّينٍ",
      "en": "Sijjin",
      "tr": "sijjīnin"
    }
  ],
  "83:8": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "سِجِّينٌۭ",
      "im": "سِجِّينٌ",
      "en": "(is) Sijjin",
      "tr": "sijjīnun"
    }
  ],
  "83:9": [
    {
      "ar": "كِتَـٰبٌۭ",
      "im": "كِتَابٌ",
      "en": "A book",
      "tr": "kitābun"
    },
    {
      "ar": "مَّرْقُومٌۭ",
      "im": "مَّرْقُومٌ",
      "en": "written",
      "tr": "marqūmun"
    }
  ],
  "83:10": [
    {
      "ar": "وَيْلٌۭ",
      "im": "وَيْلٌ",
      "en": "Woe",
      "tr": "waylun"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "لِّلْمُكَذِّبِينَ",
      "im": "لِّلْمُكَذِّبِينَ",
      "en": "to the deniers",
      "tr": "lil'mukadhibīna"
    }
  ],
  "83:11": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يُكَذِّبُونَ",
      "im": "يُكَذِّبُونَ",
      "en": "deny",
      "tr": "yukadhibūna"
    },
    {
      "ar": "بِيَوْمِ",
      "im": "بِيَوْمِ",
      "en": "(the) Day",
      "tr": "biyawmi"
    },
    {
      "ar": "ٱلدِّينِ",
      "im": "الدِّينِ",
      "en": "(of) the Judgment",
      "tr": "l-dīni"
    }
  ],
  "83:12": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يُكَذِّبُ",
      "im": "يُكَذِّبُ",
      "en": "can deny",
      "tr": "yukadhibu"
    },
    {
      "ar": "بِهِۦٓ",
      "im": "بِهِ",
      "en": "[of] it",
      "tr": "bihi"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "كُلُّ",
      "im": "كُلُّ",
      "en": "every",
      "tr": "kullu"
    },
    {
      "ar": "مُعْتَدٍ",
      "im": "مُعْتَدٍ",
      "en": "transgressor",
      "tr": "muʿ'tadin"
    },
    {
      "ar": "أَثِيمٍ",
      "im": "أَثِيمٍ",
      "en": "sinful",
      "tr": "athīmin"
    }
  ],
  "83:13": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "تُتْلَىٰ",
      "im": "تُتْلَىٰ",
      "en": "are recited",
      "tr": "tut'lā"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "to him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "ءَايَـٰتُنَا",
      "im": "آيَاتُنَا",
      "en": "Our Verses",
      "tr": "āyātunā"
    },
    {
      "ar": "قَالَ",
      "im": "قَالَ",
      "en": "he says",
      "tr": "qāla"
    },
    {
      "ar": "أَسَـٰطِيرُ",
      "im": "أَسَاطِيرُ",
      "en": "Stories",
      "tr": "asāṭīru"
    },
    {
      "ar": "ٱلْأَوَّلِينَ",
      "im": "الْأَوَّلِينَ",
      "en": "(of) the former (people)",
      "tr": "l-awalīna"
    }
  ],
  "83:14": [
    {
      "ar": "كَلَّا ۖ",
      "im": "كَلَّا ۖ",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "بَلْ ۜ",
      "im": "بَلْ ۜ",
      "en": "But",
      "tr": "bal"
    },
    {
      "ar": "رَانَ",
      "im": "رَانَ",
      "en": "(the) stain has covered",
      "tr": "rāna"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "[over]",
      "tr": "ʿalā"
    },
    {
      "ar": "قُلُوبِهِم",
      "im": "قُلُوبِهِم",
      "en": "their hearts",
      "tr": "qulūbihim"
    },
    {
      "ar": "مَّا",
      "im": "مَّا",
      "en": "(for) what",
      "tr": "mā"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "they used to",
      "tr": "kānū"
    },
    {
      "ar": "يَكْسِبُونَ",
      "im": "يَكْسِبُونَ",
      "en": "earn",
      "tr": "yaksibūna"
    }
  ],
  "83:15": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِنَّهُمْ",
      "im": "إِنَّهُمْ",
      "en": "Indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "عَن",
      "im": "عَن",
      "en": "from",
      "tr": "ʿan"
    },
    {
      "ar": "رَّبِّهِمْ",
      "im": "رَّبِّهِمْ",
      "en": "their Lord",
      "tr": "rabbihim"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "لَّمَحْجُوبُونَ",
      "im": "لَّمَحْجُوبُونَ",
      "en": "surely will be partitioned",
      "tr": "lamaḥjūbūna"
    }
  ],
  "83:16": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "إِنَّهُمْ",
      "im": "إِنَّهُمْ",
      "en": "indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "لَصَالُوا۟",
      "im": "لَصَالُو",
      "en": "(surely) will burn",
      "tr": "laṣālū"
    },
    {
      "ar": "ٱلْجَحِيمِ",
      "im": "الْجَحِيمِ",
      "en": "(in) the Hellfire",
      "tr": "l-jaḥīmi"
    }
  ],
  "83:17": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "يُقَالُ",
      "im": "يُقَالُ",
      "en": "it will be said",
      "tr": "yuqālu"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "This",
      "tr": "hādhā"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "(is) what",
      "tr": "alladhī"
    },
    {
      "ar": "كُنتُم",
      "im": "كُنتُم",
      "en": "you used to",
      "tr": "kuntum"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "[of it]",
      "tr": "bihi"
    },
    {
      "ar": "تُكَذِّبُونَ",
      "im": "تُكَذِّبُونَ",
      "en": "deny",
      "tr": "tukadhibūna"
    }
  ],
  "83:18": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "كِتَـٰبَ",
      "im": "كِتَابَ",
      "en": "(the) record",
      "tr": "kitāba"
    },
    {
      "ar": "ٱلْأَبْرَارِ",
      "im": "الْأَبْرَارِ",
      "en": "(of) the righteous",
      "tr": "l-abrāri"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(will be) surely in",
      "tr": "lafī"
    },
    {
      "ar": "عِلِّيِّينَ",
      "im": "عِلِّيِّينَ",
      "en": "Illiyin",
      "tr": "ʿilliyyīna"
    }
  ],
  "83:19": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "عِلِّيُّونَ",
      "im": "عِلِّيُّونَ",
      "en": "(is) Illiyun",
      "tr": "ʿilliyyūna"
    }
  ],
  "83:20": [
    {
      "ar": "كِتَـٰبٌۭ",
      "im": "كِتَابٌ",
      "en": "A book",
      "tr": "kitābun"
    },
    {
      "ar": "مَّرْقُومٌۭ",
      "im": "مَّرْقُومٌ",
      "en": "written",
      "tr": "marqūmun"
    }
  ],
  "83:21": [
    {
      "ar": "يَشْهَدُهُ",
      "im": "يَشْهَدُهُ",
      "en": "Witness it",
      "tr": "yashhaduhu"
    },
    {
      "ar": "ٱلْمُقَرَّبُونَ",
      "im": "الْمُقَرَّبُونَ",
      "en": "those brought near",
      "tr": "l-muqarabūna"
    }
  ],
  "83:22": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلْأَبْرَارَ",
      "im": "الْأَبْرَارَ",
      "en": "the righteous",
      "tr": "l-abrāra"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(will be) surely in",
      "tr": "lafī"
    },
    {
      "ar": "نَعِيمٍ",
      "im": "نَعِيمٍ",
      "en": "bliss",
      "tr": "naʿīmin"
    }
  ],
  "83:23": [
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "On",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْأَرَآئِكِ",
      "im": "الْأَرَائِكِ",
      "en": "thrones",
      "tr": "l-arāiki"
    },
    {
      "ar": "يَنظُرُونَ",
      "im": "يَنظُرُونَ",
      "en": "observing",
      "tr": "yanẓurūna"
    }
  ],
  "83:24": [
    {
      "ar": "تَعْرِفُ",
      "im": "تَعْرِفُ",
      "en": "You will recognize",
      "tr": "taʿrifu"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "وُجُوهِهِمْ",
      "im": "وُجُوهِهِمْ",
      "en": "their faces",
      "tr": "wujūhihim"
    },
    {
      "ar": "نَضْرَةَ",
      "im": "نَضْرَةَ",
      "en": "(the) radiance",
      "tr": "naḍrata"
    },
    {
      "ar": "ٱلنَّعِيمِ",
      "im": "النَّعِيمِ",
      "en": "(of) bliss",
      "tr": "l-naʿīmi"
    }
  ],
  "83:25": [
    {
      "ar": "يُسْقَوْنَ",
      "im": "يُسْقَوْنَ",
      "en": "They will be given to drink",
      "tr": "yus'qawna"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "رَّحِيقٍۢ",
      "im": "رَّحِيقٍ",
      "en": "a pure wine",
      "tr": "raḥīqin"
    },
    {
      "ar": "مَّخْتُومٍ",
      "im": "مَّخْتُومٍ",
      "en": "sealed",
      "tr": "makhtūmin"
    }
  ],
  "83:26": [
    {
      "ar": "خِتَـٰمُهُۥ",
      "im": "خِتَامُهُ",
      "en": "Its seal",
      "tr": "khitāmuhu"
    },
    {
      "ar": "مِسْكٌۭ ۚ",
      "im": "مِسْكٌ ۚ",
      "en": "(will be of) musk",
      "tr": "mis'kun"
    },
    {
      "ar": "وَفِى",
      "im": "وَفِي",
      "en": "And for",
      "tr": "wafī"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "فَلْيَتَنَافَسِ",
      "im": "فَلْيَتَنَافَسِ",
      "en": "let aspire",
      "tr": "falyatanāfasi"
    },
    {
      "ar": "ٱلْمُتَنَـٰفِسُونَ",
      "im": "الْمُتَنَافِسُونَ",
      "en": "the aspirers",
      "tr": "l-mutanāfisūna"
    }
  ],
  "83:27": [
    {
      "ar": "وَمِزَاجُهُۥ",
      "im": "وَمِزَاجُهُ",
      "en": "And its mixture",
      "tr": "wamizājuhu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "(is) of",
      "tr": "min"
    },
    {
      "ar": "تَسْنِيمٍ",
      "im": "تَسْنِيمٍ",
      "en": "Tasneem",
      "tr": "tasnīmin"
    }
  ],
  "83:28": [
    {
      "ar": "عَيْنًۭا",
      "im": "عَيْنًا",
      "en": "A spring",
      "tr": "ʿaynan"
    },
    {
      "ar": "يَشْرَبُ",
      "im": "يَشْرَبُ",
      "en": "will drink",
      "tr": "yashrabu"
    },
    {
      "ar": "بِهَا",
      "im": "بِهَا",
      "en": "from it",
      "tr": "bihā"
    },
    {
      "ar": "ٱلْمُقَرَّبُونَ",
      "im": "الْمُقَرَّبُونَ",
      "en": "those brought near",
      "tr": "l-muqarabūna"
    }
  ],
  "83:29": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "أَجْرَمُوا۟",
      "im": "أَجْرَمُوا",
      "en": "committed crimes",
      "tr": "ajramū"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "used to",
      "tr": "kānū"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "at",
      "tr": "mina"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "يَضْحَكُونَ",
      "im": "يَضْحَكُونَ",
      "en": "laugh",
      "tr": "yaḍḥakūna"
    }
  ],
  "83:30": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "مَرُّوا۟",
      "im": "مَرُّوا",
      "en": "they passed",
      "tr": "marrū"
    },
    {
      "ar": "بِهِمْ",
      "im": "بِهِمْ",
      "en": "by them",
      "tr": "bihim"
    },
    {
      "ar": "يَتَغَامَزُونَ",
      "im": "يَتَغَامَزُونَ",
      "en": "they winked at one another",
      "tr": "yataghāmazūna"
    }
  ],
  "83:31": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱنقَلَبُوٓا۟",
      "im": "انقَلَبُوا",
      "en": "they returned",
      "tr": "inqalabū"
    },
    {
      "ar": "إِلَىٰٓ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "أَهْلِهِمُ",
      "im": "أَهْلِهِمُ",
      "en": "their people",
      "tr": "ahlihimu"
    },
    {
      "ar": "ٱنقَلَبُوا۟",
      "im": "انقَلَبُوا",
      "en": "they would return",
      "tr": "inqalabū"
    },
    {
      "ar": "فَكِهِينَ",
      "im": "فَكِهِينَ",
      "en": "jesting",
      "tr": "fakihīna"
    }
  ],
  "83:32": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "رَأَوْهُمْ",
      "im": "رَأَوْهُمْ",
      "en": "they saw them",
      "tr": "ra-awhum"
    },
    {
      "ar": "قَالُوٓا۟",
      "im": "قَالُوا",
      "en": "they said",
      "tr": "qālū"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "هَـٰٓؤُلَآءِ",
      "im": "هَٰؤُلَاءِ",
      "en": "these",
      "tr": "hāulāi"
    },
    {
      "ar": "لَضَآلُّونَ",
      "im": "لَضَالُّونَ",
      "en": "surely have gone astray",
      "tr": "laḍāllūna"
    }
  ],
  "83:33": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "But not",
      "tr": "wamā"
    },
    {
      "ar": "أُرْسِلُوا۟",
      "im": "أُرْسِلُوا",
      "en": "they had been sent",
      "tr": "ur'silū"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "over them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "حَـٰفِظِينَ",
      "im": "حَافِظِينَ",
      "en": "(as) guardians",
      "tr": "ḥāfiẓīna"
    }
  ],
  "83:34": [
    {
      "ar": "فَٱلْيَوْمَ",
      "im": "فَالْيَوْمَ",
      "en": "So today",
      "tr": "fal-yawma"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believed",
      "tr": "āmanū"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "at",
      "tr": "mina"
    },
    {
      "ar": "ٱلْكُفَّارِ",
      "im": "الْكُفَّارِ",
      "en": "the disbelievers",
      "tr": "l-kufāri"
    },
    {
      "ar": "يَضْحَكُونَ",
      "im": "يَضْحَكُونَ",
      "en": "they will laugh",
      "tr": "yaḍḥakūna"
    }
  ],
  "83:35": [
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "On",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْأَرَآئِكِ",
      "im": "الْأَرَائِكِ",
      "en": "the thrones",
      "tr": "l-arāiki"
    },
    {
      "ar": "يَنظُرُونَ",
      "im": "يَنظُرُونَ",
      "en": "observing",
      "tr": "yanẓurūna"
    }
  ],
  "83:36": [
    {
      "ar": "هَلْ",
      "im": "هَلْ",
      "en": "Have (not)",
      "tr": "hal"
    },
    {
      "ar": "ثُوِّبَ",
      "im": "ثُوِّبَ",
      "en": "been rewarded",
      "tr": "thuwwiba"
    },
    {
      "ar": "ٱلْكُفَّارُ",
      "im": "الْكُفَّارُ",
      "en": "the disbelievers",
      "tr": "l-kufāru"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "(for) what",
      "tr": "mā"
    },
    {
      "ar": "كَانُوا۟",
      "im": "كَانُوا",
      "en": "they used to",
      "tr": "kānū"
    },
    {
      "ar": "يَفْعَلُونَ",
      "im": "يَفْعَلُونَ",
      "en": "do",
      "tr": "yafʿalūna"
    }
  ],
  "84:1": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "ٱلسَّمَآءُ",
      "im": "السَّمَاءُ",
      "en": "the sky",
      "tr": "l-samāu"
    },
    {
      "ar": "ٱنشَقَّتْ",
      "im": "انشَقَّتْ",
      "en": "is split asunder",
      "tr": "inshaqqat"
    }
  ],
  "84:2": [
    {
      "ar": "وَأَذِنَتْ",
      "im": "وَأَذِنَتْ",
      "en": "And has listened",
      "tr": "wa-adhinat"
    },
    {
      "ar": "لِرَبِّهَا",
      "im": "لِرَبِّهَا",
      "en": "to its Lord",
      "tr": "lirabbihā"
    },
    {
      "ar": "وَحُقَّتْ",
      "im": "وَحُقَّتْ",
      "en": "and was obligated",
      "tr": "waḥuqqat"
    }
  ],
  "84:3": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "ٱلْأَرْضُ",
      "im": "الْأَرْضُ",
      "en": "the earth",
      "tr": "l-arḍu"
    },
    {
      "ar": "مُدَّتْ",
      "im": "مُدَّتْ",
      "en": "is spread",
      "tr": "muddat"
    }
  ],
  "84:4": [
    {
      "ar": "وَأَلْقَتْ",
      "im": "وَأَلْقَتْ",
      "en": "And has cast out",
      "tr": "wa-alqat"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "(is) in it",
      "tr": "fīhā"
    },
    {
      "ar": "وَتَخَلَّتْ",
      "im": "وَتَخَلَّتْ",
      "en": "and becomes empty",
      "tr": "watakhallat"
    }
  ],
  "84:5": [
    {
      "ar": "وَأَذِنَتْ",
      "im": "وَأَذِنَتْ",
      "en": "And has listened",
      "tr": "wa-adhinat"
    },
    {
      "ar": "لِرَبِّهَا",
      "im": "لِرَبِّهَا",
      "en": "to its Lord",
      "tr": "lirabbihā"
    },
    {
      "ar": "وَحُقَّتْ",
      "im": "وَحُقَّتْ",
      "en": "and was obligated",
      "tr": "waḥuqqat"
    }
  ],
  "84:6": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "im": "يَا أَيُّهَا",
      "en": "O",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "mankind",
      "tr": "l-insānu"
    },
    {
      "ar": "إِنَّكَ",
      "im": "إِنَّكَ",
      "en": "Indeed, you",
      "tr": "innaka"
    },
    {
      "ar": "كَادِحٌ",
      "im": "كَادِحٌ",
      "en": "(are) laboring",
      "tr": "kādiḥun"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "كَدْحًۭا",
      "im": "كَدْحًا",
      "en": "(with) exertion",
      "tr": "kadḥan"
    },
    {
      "ar": "فَمُلَـٰقِيهِ",
      "im": "فَمُلَاقِيهِ",
      "en": "and you (will) meet Him",
      "tr": "famulāqīhi"
    }
  ],
  "84:7": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "Then as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "أُوتِىَ",
      "im": "أُوتِيَ",
      "en": "is given",
      "tr": "ūtiya"
    },
    {
      "ar": "كِتَـٰبَهُۥ",
      "im": "كِتَابَهُ",
      "en": "his record",
      "tr": "kitābahu"
    },
    {
      "ar": "بِيَمِينِهِۦ",
      "im": "بِيَمِينِهِ",
      "en": "in his right (hand)",
      "tr": "biyamīnihi"
    }
  ],
  "84:8": [
    {
      "ar": "فَسَوْفَ",
      "im": "فَسَوْفَ",
      "en": "Then soon",
      "tr": "fasawfa"
    },
    {
      "ar": "يُحَاسَبُ",
      "im": "يُحَاسَبُ",
      "en": "his account will be taken",
      "tr": "yuḥāsabu"
    },
    {
      "ar": "حِسَابًۭا",
      "im": "حِسَابًا",
      "en": "an account",
      "tr": "ḥisāban"
    },
    {
      "ar": "يَسِيرًۭا",
      "im": "يَسِيرًا",
      "en": "easy",
      "tr": "yasīran"
    }
  ],
  "84:9": [
    {
      "ar": "وَيَنقَلِبُ",
      "im": "وَيَنقَلِبُ",
      "en": "And he will return",
      "tr": "wayanqalibu"
    },
    {
      "ar": "إِلَىٰٓ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "أَهْلِهِۦ",
      "im": "أَهْلِهِ",
      "en": "his people",
      "tr": "ahlihi"
    },
    {
      "ar": "مَسْرُورًۭا",
      "im": "مَسْرُورًا",
      "en": "happily",
      "tr": "masrūran"
    }
  ],
  "84:10": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "أُوتِىَ",
      "im": "أُوتِيَ",
      "en": "is given",
      "tr": "ūtiya"
    },
    {
      "ar": "كِتَـٰبَهُۥ",
      "im": "كِتَابَهُ",
      "en": "his record",
      "tr": "kitābahu"
    },
    {
      "ar": "وَرَآءَ",
      "im": "وَرَاءَ",
      "en": "behind",
      "tr": "warāa"
    },
    {
      "ar": "ظَهْرِهِۦ",
      "im": "ظَهْرِهِ",
      "en": "his back",
      "tr": "ẓahrihi"
    }
  ],
  "84:11": [
    {
      "ar": "فَسَوْفَ",
      "im": "فَسَوْفَ",
      "en": "Then soon",
      "tr": "fasawfa"
    },
    {
      "ar": "يَدْعُوا۟",
      "im": "يَدْعُو",
      "en": "he will call",
      "tr": "yadʿū"
    },
    {
      "ar": "ثُبُورًۭا",
      "im": "ثُبُورًا",
      "en": "(for) destruction",
      "tr": "thubūran"
    }
  ],
  "84:12": [
    {
      "ar": "وَيَصْلَىٰ",
      "im": "وَيَصْلَىٰ",
      "en": "And he will burn",
      "tr": "wayaṣlā"
    },
    {
      "ar": "سَعِيرًا",
      "im": "سَعِيرًا",
      "en": "(in) a Blaze",
      "tr": "saʿīran"
    }
  ],
  "84:13": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "had been",
      "tr": "kāna"
    },
    {
      "ar": "فِىٓ",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "أَهْلِهِۦ",
      "im": "أَهْلِهِ",
      "en": "his people",
      "tr": "ahlihi"
    },
    {
      "ar": "مَسْرُورًا",
      "im": "مَسْرُورًا",
      "en": "happy",
      "tr": "masrūran"
    }
  ],
  "84:14": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "ظَنَّ",
      "im": "ظَنَّ",
      "en": "(had) thought",
      "tr": "ẓanna"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّن",
      "im": "لَّن",
      "en": "never",
      "tr": "lan"
    },
    {
      "ar": "يَحُورَ",
      "im": "يَحُورَ",
      "en": "he would return",
      "tr": "yaḥūra"
    }
  ],
  "84:15": [
    {
      "ar": "بَلَىٰٓ",
      "im": "بَلَىٰ",
      "en": "Yes",
      "tr": "balā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبَّهُۥ",
      "im": "رَبَّهُ",
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "was",
      "tr": "kāna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "of him",
      "tr": "bihi"
    },
    {
      "ar": "بَصِيرًۭا",
      "im": "بَصِيرًا",
      "en": "All-Seer",
      "tr": "baṣīran"
    }
  ],
  "84:16": [
    {
      "ar": "فَلَآ",
      "im": "فَلَا",
      "en": "But nay",
      "tr": "falā"
    },
    {
      "ar": "أُقْسِمُ",
      "im": "أُقْسِمُ",
      "en": "I swear",
      "tr": "uq'simu"
    },
    {
      "ar": "بِٱلشَّفَقِ",
      "im": "بِالشَّفَقِ",
      "en": "by the twilight glow",
      "tr": "bil-shafaqi"
    }
  ],
  "84:17": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "And the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "وَسَقَ",
      "im": "وَسَقَ",
      "en": "it envelops",
      "tr": "wasaqa"
    }
  ],
  "84:18": [
    {
      "ar": "وَٱلْقَمَرِ",
      "im": "وَالْقَمَرِ",
      "en": "And the moon",
      "tr": "wal-qamari"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "ٱتَّسَقَ",
      "im": "اتَّسَقَ",
      "en": "it becomes full",
      "tr": "ittasaqa"
    }
  ],
  "84:19": [
    {
      "ar": "لَتَرْكَبُنَّ",
      "im": "لَتَرْكَبُنَّ",
      "en": "You will surely embark",
      "tr": "latarkabunna"
    },
    {
      "ar": "طَبَقًا",
      "im": "طَبَقًا",
      "en": "(to) stage",
      "tr": "ṭabaqan"
    },
    {
      "ar": "عَن",
      "im": "عَن",
      "en": "from",
      "tr": "ʿan"
    },
    {
      "ar": "طَبَقٍۢ",
      "im": "طَبَقٍ",
      "en": "stage",
      "tr": "ṭabaqin"
    }
  ],
  "84:20": [
    {
      "ar": "فَمَا",
      "im": "فَمَا",
      "en": "So what",
      "tr": "famā"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "(is) for them",
      "tr": "lahum"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يُؤْمِنُونَ",
      "im": "يُؤْمِنُونَ",
      "en": "they believe",
      "tr": "yu'minūna"
    }
  ],
  "84:21": [
    {
      "ar": "وَإِذَا",
      "im": "وَإِذَا",
      "en": "And when",
      "tr": "wa-idhā"
    },
    {
      "ar": "قُرِئَ",
      "im": "قُرِئَ",
      "en": "is recited",
      "tr": "quri-a"
    },
    {
      "ar": "عَلَيْهِمُ",
      "im": "عَلَيْهِمُ",
      "en": "to them",
      "tr": "ʿalayhimu"
    },
    {
      "ar": "ٱلْقُرْءَانُ",
      "im": "الْقُرْآنُ",
      "en": "the Quran",
      "tr": "l-qur'ānu"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَسْجُدُونَ ۩",
      "im": "يَسْجُدُونَ ۩",
      "en": "they prostrate",
      "tr": "yasjudūna"
    }
  ],
  "84:22": [
    {
      "ar": "بَلِ",
      "im": "بَلِ",
      "en": "Nay",
      "tr": "bali"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieved",
      "tr": "kafarū"
    },
    {
      "ar": "يُكَذِّبُونَ",
      "im": "يُكَذِّبُونَ",
      "en": "deny",
      "tr": "yukadhibūna"
    }
  ],
  "84:23": [
    {
      "ar": "وَٱللَّهُ",
      "im": "وَاللَّهُ",
      "en": "And Allah",
      "tr": "wal-lahu"
    },
    {
      "ar": "أَعْلَمُ",
      "im": "أَعْلَمُ",
      "en": "(is) most knowing",
      "tr": "aʿlamu"
    },
    {
      "ar": "بِمَا",
      "im": "بِمَا",
      "en": "of what",
      "tr": "bimā"
    },
    {
      "ar": "يُوعُونَ",
      "im": "يُوعُونَ",
      "en": "they keep within themselves",
      "tr": "yūʿūna"
    }
  ],
  "84:24": [
    {
      "ar": "فَبَشِّرْهُم",
      "im": "فَبَشِّرْهُم",
      "en": "so give them tidings",
      "tr": "fabashir'hum"
    },
    {
      "ar": "بِعَذَابٍ",
      "im": "بِعَذَابٍ",
      "en": "of a punishment",
      "tr": "biʿadhābin"
    },
    {
      "ar": "أَلِيمٍ",
      "im": "أَلِيمٍ",
      "en": "painful",
      "tr": "alīmin"
    }
  ],
  "84:25": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَعَمِلُوا۟",
      "im": "وَعَمِلُوا",
      "en": "and do",
      "tr": "waʿamilū"
    },
    {
      "ar": "ٱلصَّـٰلِحَـٰتِ",
      "im": "الصَّالِحَاتِ",
      "en": "righteous deeds",
      "tr": "l-ṣāliḥāti"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "For them",
      "tr": "lahum"
    },
    {
      "ar": "أَجْرٌ",
      "im": "أَجْرٌ",
      "en": "(is) a reward",
      "tr": "ajrun"
    },
    {
      "ar": "غَيْرُ",
      "im": "غَيْرُ",
      "en": "never",
      "tr": "ghayru"
    },
    {
      "ar": "مَمْنُونٍۭ",
      "im": "مَمْنُونٍ",
      "en": "ending",
      "tr": "mamnūnin"
    }
  ],
  "85:1": [
    {
      "ar": "وَٱلسَّمَآءِ",
      "im": "وَالسَّمَاءِ",
      "en": "By the sky",
      "tr": "wal-samāi"
    },
    {
      "ar": "ذَاتِ",
      "im": "ذَاتِ",
      "en": "containing",
      "tr": "dhāti"
    },
    {
      "ar": "ٱلْبُرُوجِ",
      "im": "الْبُرُوجِ",
      "en": "the constellations",
      "tr": "l-burūji"
    }
  ],
  "85:2": [
    {
      "ar": "وَٱلْيَوْمِ",
      "im": "وَالْيَوْمِ",
      "en": "And the Day",
      "tr": "wal-yawmi"
    },
    {
      "ar": "ٱلْمَوْعُودِ",
      "im": "الْمَوْعُودِ",
      "en": "Promised",
      "tr": "l-mawʿūdi"
    }
  ],
  "85:3": [
    {
      "ar": "وَشَاهِدٍۢ",
      "im": "وَشَاهِدٍ",
      "en": "And (the) witness",
      "tr": "washāhidin"
    },
    {
      "ar": "وَمَشْهُودٍۢ",
      "im": "وَمَشْهُودٍ",
      "en": "and what is witnessed",
      "tr": "wamashhūdin"
    }
  ],
  "85:4": [
    {
      "ar": "قُتِلَ",
      "im": "قُتِلَ",
      "en": "Destroyed were",
      "tr": "qutila"
    },
    {
      "ar": "أَصْحَـٰبُ",
      "im": "أَصْحَابُ",
      "en": "(the) companions",
      "tr": "aṣḥābu"
    },
    {
      "ar": "ٱلْأُخْدُودِ",
      "im": "الْأُخْدُودِ",
      "en": "(of) the pit",
      "tr": "l-ukh'dūdi"
    }
  ],
  "85:5": [
    {
      "ar": "ٱلنَّارِ",
      "im": "النَّارِ",
      "en": "(Of) the fire",
      "tr": "al-nāri"
    },
    {
      "ar": "ذَاتِ",
      "im": "ذَاتِ",
      "en": "full",
      "tr": "dhāti"
    },
    {
      "ar": "ٱلْوَقُودِ",
      "im": "الْوَقُودِ",
      "en": "(of) the fuel",
      "tr": "l-waqūdi"
    }
  ],
  "85:6": [
    {
      "ar": "إِذْ",
      "im": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "عَلَيْهَا",
      "im": "عَلَيْهَا",
      "en": "by it",
      "tr": "ʿalayhā"
    },
    {
      "ar": "قُعُودٌۭ",
      "im": "قُعُودٌ",
      "en": "(were) sitting",
      "tr": "quʿūdun"
    }
  ],
  "85:7": [
    {
      "ar": "وَهُمْ",
      "im": "وَهُمْ",
      "en": "And they",
      "tr": "wahum"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَفْعَلُونَ",
      "im": "يَفْعَلُونَ",
      "en": "they were doing",
      "tr": "yafʿalūna"
    },
    {
      "ar": "بِٱلْمُؤْمِنِينَ",
      "im": "بِالْمُؤْمِنِينَ",
      "en": "to the believers",
      "tr": "bil-mu'minīna"
    },
    {
      "ar": "شُهُودٌۭ",
      "im": "شُهُودٌ",
      "en": "witnesses",
      "tr": "shuhūdun"
    }
  ],
  "85:8": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "نَقَمُوا۟",
      "im": "نَقَمُوا",
      "en": "they resented",
      "tr": "naqamū"
    },
    {
      "ar": "مِنْهُمْ",
      "im": "مِنْهُمْ",
      "en": "[of] them",
      "tr": "min'hum"
    },
    {
      "ar": "إِلَّآ",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "يُؤْمِنُوا۟",
      "im": "يُؤْمِنُوا",
      "en": "they believed",
      "tr": "yu'minū"
    },
    {
      "ar": "بِٱللَّهِ",
      "im": "بِاللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "ٱلْعَزِيزِ",
      "im": "الْعَزِيزِ",
      "en": "the All-Mighty",
      "tr": "l-ʿazīzi"
    },
    {
      "ar": "ٱلْحَمِيدِ",
      "im": "الْحَمِيدِ",
      "en": "the Praiseworthy",
      "tr": "l-ḥamīdi"
    }
  ],
  "85:9": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "for Him",
      "tr": "lahu"
    },
    {
      "ar": "مُلْكُ",
      "im": "مُلْكُ",
      "en": "(is) the dominion",
      "tr": "mul'ku"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "im": "السَّمَاوَاتِ",
      "en": "(of) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضِ ۚ",
      "im": "وَالْأَرْضِ ۚ",
      "en": "and the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "وَٱللَّهُ",
      "im": "وَاللَّهُ",
      "en": "and Allah",
      "tr": "wal-lahu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "كُلِّ",
      "im": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "im": "شَيْءٍ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "شَهِيدٌ",
      "im": "شَهِيدٌ",
      "en": "(is) a Witness",
      "tr": "shahīdun"
    }
  ],
  "85:10": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "فَتَنُوا۟",
      "im": "فَتَنُوا",
      "en": "persecuted",
      "tr": "fatanū"
    },
    {
      "ar": "ٱلْمُؤْمِنِينَ",
      "im": "الْمُؤْمِنِينَ",
      "en": "the believing men",
      "tr": "l-mu'minīna"
    },
    {
      "ar": "وَٱلْمُؤْمِنَـٰتِ",
      "im": "وَالْمُؤْمِنَاتِ",
      "en": "and the believing women",
      "tr": "wal-mu'mināti"
    },
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يَتُوبُوا۟",
      "im": "يَتُوبُوا",
      "en": "they repented",
      "tr": "yatūbū"
    },
    {
      "ar": "فَلَهُمْ",
      "im": "فَلَهُمْ",
      "en": "then for them",
      "tr": "falahum"
    },
    {
      "ar": "عَذَابُ",
      "im": "عَذَابُ",
      "en": "(is the) punishment",
      "tr": "ʿadhābu"
    },
    {
      "ar": "جَهَنَّمَ",
      "im": "جَهَنَّمَ",
      "en": "(of) Hell",
      "tr": "jahannama"
    },
    {
      "ar": "وَلَهُمْ",
      "im": "وَلَهُمْ",
      "en": "and for them",
      "tr": "walahum"
    },
    {
      "ar": "عَذَابُ",
      "im": "عَذَابُ",
      "en": "(is the) punishment",
      "tr": "ʿadhābu"
    },
    {
      "ar": "ٱلْحَرِيقِ",
      "im": "الْحَرِيقِ",
      "en": "(of) the Burning Fire",
      "tr": "l-ḥarīqi"
    }
  ],
  "85:11": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَعَمِلُوا۟",
      "im": "وَعَمِلُوا",
      "en": "and do",
      "tr": "waʿamilū"
    },
    {
      "ar": "ٱلصَّـٰلِحَـٰتِ",
      "im": "الصَّالِحَاتِ",
      "en": "the righteous deeds",
      "tr": "l-ṣāliḥāti"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "for them",
      "tr": "lahum"
    },
    {
      "ar": "جَنَّـٰتٌۭ",
      "im": "جَنَّاتٌ",
      "en": "(will be) Gardens",
      "tr": "jannātun"
    },
    {
      "ar": "تَجْرِى",
      "im": "تَجْرِي",
      "en": "flow",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهَا",
      "im": "تَحْتِهَا",
      "en": "underneath it",
      "tr": "taḥtihā"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ ۚ",
      "im": "الْأَنْهَارُ ۚ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "That",
      "tr": "dhālika"
    },
    {
      "ar": "ٱلْفَوْزُ",
      "im": "الْفَوْزُ",
      "en": "(is) the success",
      "tr": "l-fawzu"
    },
    {
      "ar": "ٱلْكَبِيرُ",
      "im": "الْكَبِيرُ",
      "en": "the great",
      "tr": "l-kabīru"
    }
  ],
  "85:12": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "بَطْشَ",
      "im": "بَطْشَ",
      "en": "(the) Grip",
      "tr": "baṭsha"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "(of) your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "لَشَدِيدٌ",
      "im": "لَشَدِيدٌ",
      "en": "(is) surely strong",
      "tr": "lashadīdun"
    }
  ],
  "85:13": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed He",
      "tr": "innahu"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "يُبْدِئُ",
      "im": "يُبْدِئُ",
      "en": "originates",
      "tr": "yub'di-u"
    },
    {
      "ar": "وَيُعِيدُ",
      "im": "وَيُعِيدُ",
      "en": "and repeats",
      "tr": "wayuʿīdu"
    }
  ],
  "85:14": [
    {
      "ar": "وَهُوَ",
      "im": "وَهُوَ",
      "en": "And He",
      "tr": "wahuwa"
    },
    {
      "ar": "ٱلْغَفُورُ",
      "im": "الْغَفُورُ",
      "en": "(is) the Oft-Forgiving",
      "tr": "l-ghafūru"
    },
    {
      "ar": "ٱلْوَدُودُ",
      "im": "الْوَدُودُ",
      "en": "the Most Loving",
      "tr": "l-wadūdu"
    }
  ],
  "85:15": [
    {
      "ar": "ذُو",
      "im": "ذُو",
      "en": "Owner (of)",
      "tr": "dhū"
    },
    {
      "ar": "ٱلْعَرْشِ",
      "im": "الْعَرْشِ",
      "en": "the Throne",
      "tr": "l-ʿarshi"
    },
    {
      "ar": "ٱلْمَجِيدُ",
      "im": "الْمَجِيدُ",
      "en": "the Glorious",
      "tr": "l-majīdu"
    }
  ],
  "85:16": [
    {
      "ar": "فَعَّالٌۭ",
      "im": "فَعَّالٌ",
      "en": "Doer",
      "tr": "faʿʿālun"
    },
    {
      "ar": "لِّمَا",
      "im": "لِّمَا",
      "en": "of what",
      "tr": "limā"
    },
    {
      "ar": "يُرِيدُ",
      "im": "يُرِيدُ",
      "en": "He intends",
      "tr": "yurīdu"
    }
  ],
  "85:17": [
    {
      "ar": "هَلْ",
      "im": "هَلْ",
      "en": "Has",
      "tr": "hal"
    },
    {
      "ar": "أَتَىٰكَ",
      "im": "أَتَاكَ",
      "en": "come to you",
      "tr": "atāka"
    },
    {
      "ar": "حَدِيثُ",
      "im": "حَدِيثُ",
      "en": "(the) story",
      "tr": "ḥadīthu"
    },
    {
      "ar": "ٱلْجُنُودِ",
      "im": "الْجُنُودِ",
      "en": "(of) the hosts",
      "tr": "l-junūdi"
    }
  ],
  "85:18": [
    {
      "ar": "فِرْعَوْنَ",
      "im": "فِرْعَوْنَ",
      "en": "Firaun",
      "tr": "fir'ʿawna"
    },
    {
      "ar": "وَثَمُودَ",
      "im": "وَثَمُودَ",
      "en": "and Thamud",
      "tr": "wathamūda"
    }
  ],
  "85:19": [
    {
      "ar": "بَلِ",
      "im": "بَلِ",
      "en": "Nay",
      "tr": "bali"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(are) in",
      "tr": "fī"
    },
    {
      "ar": "تَكْذِيبٍۢ",
      "im": "تَكْذِيبٍ",
      "en": "denial",
      "tr": "takdhībin"
    }
  ],
  "85:20": [
    {
      "ar": "وَٱللَّهُ",
      "im": "وَاللَّهُ",
      "en": "But Allah",
      "tr": "wal-lahu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "وَرَآئِهِم",
      "im": "وَرَائِهِم",
      "en": "behind them",
      "tr": "warāihim"
    },
    {
      "ar": "مُّحِيطٌۢ",
      "im": "مُّحِيطٌ",
      "en": "encompasses",
      "tr": "muḥīṭun"
    }
  ],
  "85:21": [
    {
      "ar": "بَلْ",
      "im": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "It",
      "tr": "huwa"
    },
    {
      "ar": "قُرْءَانٌۭ",
      "im": "قُرْآنٌ",
      "en": "(is) a Quran",
      "tr": "qur'ānun"
    },
    {
      "ar": "مَّجِيدٌۭ",
      "im": "مَّجِيدٌ",
      "en": "Glorious",
      "tr": "majīdun"
    }
  ],
  "85:22": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "لَوْحٍۢ",
      "im": "لَوْحٍ",
      "en": "a Tablet",
      "tr": "lawḥin"
    },
    {
      "ar": "مَّحْفُوظٍۭ",
      "im": "مَّحْفُوظٍ",
      "en": "Guarded",
      "tr": "maḥfūẓin"
    }
  ],
  "86:1": [
    {
      "ar": "وَٱلسَّمَآءِ",
      "im": "وَالسَّمَاءِ",
      "en": "By the sky",
      "tr": "wal-samāi"
    },
    {
      "ar": "وَٱلطَّارِقِ",
      "im": "وَالطَّارِقِ",
      "en": "and the night comer",
      "tr": "wal-ṭāriqi"
    }
  ],
  "86:2": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱلطَّارِقُ",
      "im": "الطَّارِقُ",
      "en": "the night comer (is)",
      "tr": "l-ṭāriqu"
    }
  ],
  "86:3": [
    {
      "ar": "ٱلنَّجْمُ",
      "im": "النَّجْمُ",
      "en": "(It is) the star",
      "tr": "al-najmu"
    },
    {
      "ar": "ٱلثَّاقِبُ",
      "im": "الثَّاقِبُ",
      "en": "the piercing",
      "tr": "l-thāqibu"
    }
  ],
  "86:4": [
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "كُلُّ",
      "im": "كُلُّ",
      "en": "(is) every",
      "tr": "kullu"
    },
    {
      "ar": "نَفْسٍۢ",
      "im": "نَفْسٍ",
      "en": "soul",
      "tr": "nafsin"
    },
    {
      "ar": "لَّمَّا",
      "im": "لَّمَّا",
      "en": "but",
      "tr": "lammā"
    },
    {
      "ar": "عَلَيْهَا",
      "im": "عَلَيْهَا",
      "en": "over it",
      "tr": "ʿalayhā"
    },
    {
      "ar": "حَافِظٌۭ",
      "im": "حَافِظٌ",
      "en": "(is) a protector",
      "tr": "ḥāfiẓun"
    }
  ],
  "86:5": [
    {
      "ar": "فَلْيَنظُرِ",
      "im": "فَلْيَنظُرِ",
      "en": "So let see",
      "tr": "falyanẓuri"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "مِمَّ",
      "im": "مِمَّ",
      "en": "from what",
      "tr": "mimma"
    },
    {
      "ar": "خُلِقَ",
      "im": "خُلِقَ",
      "en": "he is created",
      "tr": "khuliqa"
    }
  ],
  "86:6": [
    {
      "ar": "خُلِقَ",
      "im": "خُلِقَ",
      "en": "He is created",
      "tr": "khuliqa"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "مَّآءٍۢ",
      "im": "مَّاءٍ",
      "en": "a water",
      "tr": "māin"
    },
    {
      "ar": "دَافِقٍۢ",
      "im": "دَافِقٍ",
      "en": "ejected",
      "tr": "dāfiqin"
    }
  ],
  "86:7": [
    {
      "ar": "يَخْرُجُ",
      "im": "يَخْرُجُ",
      "en": "Coming forth",
      "tr": "yakhruju"
    },
    {
      "ar": "مِنۢ",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَيْنِ",
      "im": "بَيْنِ",
      "en": "between",
      "tr": "bayni"
    },
    {
      "ar": "ٱلصُّلْبِ",
      "im": "الصُّلْبِ",
      "en": "the backbone",
      "tr": "l-ṣul'bi"
    },
    {
      "ar": "وَٱلتَّرَآئِبِ",
      "im": "وَالتَّرَائِبِ",
      "en": "and the ribs",
      "tr": "wal-tarāibi"
    }
  ],
  "86:8": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "رَجْعِهِۦ",
      "im": "رَجْعِهِ",
      "en": "return him",
      "tr": "rajʿihi"
    },
    {
      "ar": "لَقَادِرٌۭ",
      "im": "لَقَادِرٌ",
      "en": "(is) Able",
      "tr": "laqādirun"
    }
  ],
  "86:9": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "تُبْلَى",
      "im": "تُبْلَى",
      "en": "will be tested",
      "tr": "tub'lā"
    },
    {
      "ar": "ٱلسَّرَآئِرُ",
      "im": "السَّرَائِرُ",
      "en": "the secrets",
      "tr": "l-sarāiru"
    }
  ],
  "86:10": [
    {
      "ar": "فَمَا",
      "im": "فَمَا",
      "en": "Then not",
      "tr": "famā"
    },
    {
      "ar": "لَهُۥ",
      "im": "لَهُ",
      "en": "(is) for him",
      "tr": "lahu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "قُوَّةٍۢ",
      "im": "قُوَّةٍ",
      "en": "power",
      "tr": "quwwatin"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "نَاصِرٍۢ",
      "im": "نَاصِرٍ",
      "en": "any helper",
      "tr": "nāṣirin"
    }
  ],
  "86:11": [
    {
      "ar": "وَٱلسَّمَآءِ",
      "im": "وَالسَّمَاءِ",
      "en": "By the sky",
      "tr": "wal-samāi"
    },
    {
      "ar": "ذَاتِ",
      "im": "ذَاتِ",
      "en": "which",
      "tr": "dhāti"
    },
    {
      "ar": "ٱلرَّجْعِ",
      "im": "الرَّجْعِ",
      "en": "returns",
      "tr": "l-rajʿi"
    }
  ],
  "86:12": [
    {
      "ar": "وَٱلْأَرْضِ",
      "im": "وَالْأَرْضِ",
      "en": "And the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "ذَاتِ",
      "im": "ذَاتِ",
      "en": "which",
      "tr": "dhāti"
    },
    {
      "ar": "ٱلصَّدْعِ",
      "im": "الصَّدْعِ",
      "en": "cracks open",
      "tr": "l-ṣadʿi"
    }
  ],
  "86:13": [
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, it",
      "tr": "innahu"
    },
    {
      "ar": "لَقَوْلٌۭ",
      "im": "لَقَوْلٌ",
      "en": "(is) surely a Word",
      "tr": "laqawlun"
    },
    {
      "ar": "فَصْلٌۭ",
      "im": "فَصْلٌ",
      "en": "decisive",
      "tr": "faṣlun"
    }
  ],
  "86:14": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "it",
      "tr": "huwa"
    },
    {
      "ar": "بِٱلْهَزْلِ",
      "im": "بِالْهَزْلِ",
      "en": "(is) for amusement",
      "tr": "bil-hazli"
    }
  ],
  "86:15": [
    {
      "ar": "إِنَّهُمْ",
      "im": "إِنَّهُمْ",
      "en": "Indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "يَكِيدُونَ",
      "im": "يَكِيدُونَ",
      "en": "are plotting",
      "tr": "yakīdūna"
    },
    {
      "ar": "كَيْدًۭا",
      "im": "كَيْدًا",
      "en": "a plot",
      "tr": "kaydan"
    }
  ],
  "86:16": [
    {
      "ar": "وَأَكِيدُ",
      "im": "وَأَكِيدُ",
      "en": "But I am planning",
      "tr": "wa-akīdu"
    },
    {
      "ar": "كَيْدًۭا",
      "im": "كَيْدًا",
      "en": "a plan",
      "tr": "kaydan"
    }
  ],
  "86:17": [
    {
      "ar": "فَمَهِّلِ",
      "im": "فَمَهِّلِ",
      "en": "So give respite",
      "tr": "famahhili"
    },
    {
      "ar": "ٱلْكَـٰفِرِينَ",
      "im": "الْكَافِرِينَ",
      "en": "(to) the disbelievers",
      "tr": "l-kāfirīna"
    },
    {
      "ar": "أَمْهِلْهُمْ",
      "im": "أَمْهِلْهُمْ",
      "en": "Give respite to them",
      "tr": "amhil'hum"
    },
    {
      "ar": "رُوَيْدًۢا",
      "im": "رُوَيْدًا",
      "en": "little",
      "tr": "ruwaydan"
    }
  ],
  "87:1": [
    {
      "ar": "سَبِّحِ",
      "im": "سَبِّحِ",
      "en": "Glorify",
      "tr": "sabbiḥi"
    },
    {
      "ar": "ٱسْمَ",
      "im": "اسْمَ",
      "en": "(the) name",
      "tr": "is'ma"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "(of) your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "ٱلْأَعْلَى",
      "im": "الْأَعْلَى",
      "en": "the Most High",
      "tr": "l-aʿlā"
    }
  ],
  "87:2": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "خَلَقَ",
      "im": "خَلَقَ",
      "en": "created",
      "tr": "khalaqa"
    },
    {
      "ar": "فَسَوَّىٰ",
      "im": "فَسَوَّىٰ",
      "en": "then proportioned",
      "tr": "fasawwā"
    }
  ],
  "87:3": [
    {
      "ar": "وَٱلَّذِى",
      "im": "وَالَّذِي",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "قَدَّرَ",
      "im": "قَدَّرَ",
      "en": "measured",
      "tr": "qaddara"
    },
    {
      "ar": "فَهَدَىٰ",
      "im": "فَهَدَىٰ",
      "en": "then guided",
      "tr": "fahadā"
    }
  ],
  "87:4": [
    {
      "ar": "وَٱلَّذِىٓ",
      "im": "وَالَّذِي",
      "en": "And the One Who",
      "tr": "wa-alladhī"
    },
    {
      "ar": "أَخْرَجَ",
      "im": "أَخْرَجَ",
      "en": "brings forth",
      "tr": "akhraja"
    },
    {
      "ar": "ٱلْمَرْعَىٰ",
      "im": "الْمَرْعَىٰ",
      "en": "the pasture",
      "tr": "l-marʿā"
    }
  ],
  "87:5": [
    {
      "ar": "فَجَعَلَهُۥ",
      "im": "فَجَعَلَهُ",
      "en": "And then makes it",
      "tr": "fajaʿalahu"
    },
    {
      "ar": "غُثَآءً",
      "im": "غُثَاءً",
      "en": "stubble",
      "tr": "ghuthāan"
    },
    {
      "ar": "أَحْوَىٰ",
      "im": "أَحْوَىٰ",
      "en": "dark",
      "tr": "aḥwā"
    }
  ],
  "87:6": [
    {
      "ar": "سَنُقْرِئُكَ",
      "im": "سَنُقْرِئُكَ",
      "en": "We will make you recite",
      "tr": "sanuq'ri-uka"
    },
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "so not",
      "tr": "falā"
    },
    {
      "ar": "تَنسَىٰٓ",
      "im": "تَنسَىٰ",
      "en": "you will forget",
      "tr": "tansā"
    }
  ],
  "87:7": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "شَآءَ",
      "im": "شَاءَ",
      "en": "wills",
      "tr": "shāa"
    },
    {
      "ar": "ٱللَّهُ ۚ",
      "im": "اللَّهُ ۚ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "يَعْلَمُ",
      "im": "يَعْلَمُ",
      "en": "knows",
      "tr": "yaʿlamu"
    },
    {
      "ar": "ٱلْجَهْرَ",
      "im": "الْجَهْرَ",
      "en": "the manifest",
      "tr": "l-jahra"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "يَخْفَىٰ",
      "im": "يَخْفَىٰ",
      "en": "is hidden",
      "tr": "yakhfā"
    }
  ],
  "87:8": [
    {
      "ar": "وَنُيَسِّرُكَ",
      "im": "وَنُيَسِّرُكَ",
      "en": "And We will ease you",
      "tr": "wanuyassiruka"
    },
    {
      "ar": "لِلْيُسْرَىٰ",
      "im": "لِلْيُسْرَىٰ",
      "en": "to the ease",
      "tr": "lil'yus'rā"
    }
  ],
  "87:9": [
    {
      "ar": "فَذَكِّرْ",
      "im": "فَذَكِّرْ",
      "en": "So remind",
      "tr": "fadhakkir"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "نَّفَعَتِ",
      "im": "نَّفَعَتِ",
      "en": "benefits",
      "tr": "nafaʿati"
    },
    {
      "ar": "ٱلذِّكْرَىٰ",
      "im": "الذِّكْرَىٰ",
      "en": "the reminder",
      "tr": "l-dhik'rā"
    }
  ],
  "87:10": [
    {
      "ar": "سَيَذَّكَّرُ",
      "im": "سَيَذَّكَّرُ",
      "en": "He will pay heed",
      "tr": "sayadhakkaru"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(one) who",
      "tr": "man"
    },
    {
      "ar": "يَخْشَىٰ",
      "im": "يَخْشَىٰ",
      "en": "fears (Allah)",
      "tr": "yakhshā"
    }
  ],
  "87:11": [
    {
      "ar": "وَيَتَجَنَّبُهَا",
      "im": "وَيَتَجَنَّبُهَا",
      "en": "And will avoid it",
      "tr": "wayatajannabuhā"
    },
    {
      "ar": "ٱلْأَشْقَى",
      "im": "الْأَشْقَى",
      "en": "the wretched one",
      "tr": "l-ashqā"
    }
  ],
  "87:12": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "يَصْلَى",
      "im": "يَصْلَى",
      "en": "will burn",
      "tr": "yaṣlā"
    },
    {
      "ar": "ٱلنَّارَ",
      "im": "النَّارَ",
      "en": "(in) the Fire",
      "tr": "l-nāra"
    },
    {
      "ar": "ٱلْكُبْرَىٰ",
      "im": "الْكُبْرَىٰ",
      "en": "[the] great",
      "tr": "l-kub'rā"
    }
  ],
  "87:13": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَمُوتُ",
      "im": "يَمُوتُ",
      "en": "he will die",
      "tr": "yamūtu"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يَحْيَىٰ",
      "im": "يَحْيَىٰ",
      "en": "will live",
      "tr": "yaḥyā"
    }
  ],
  "87:14": [
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "Certainly",
      "tr": "qad"
    },
    {
      "ar": "أَفْلَحَ",
      "im": "أَفْلَحَ",
      "en": "has succeeded",
      "tr": "aflaḥa"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(one) who",
      "tr": "man"
    },
    {
      "ar": "تَزَكَّىٰ",
      "im": "تَزَكَّىٰ",
      "en": "purifies (himself)",
      "tr": "tazakkā"
    }
  ],
  "87:15": [
    {
      "ar": "وَذَكَرَ",
      "im": "وَذَكَرَ",
      "en": "And remembers",
      "tr": "wadhakara"
    },
    {
      "ar": "ٱسْمَ",
      "im": "اسْمَ",
      "en": "(the) name",
      "tr": "is'ma"
    },
    {
      "ar": "رَبِّهِۦ",
      "im": "رَبِّهِ",
      "en": "(of) his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "فَصَلَّىٰ",
      "im": "فَصَلَّىٰ",
      "en": "and prays",
      "tr": "faṣallā"
    }
  ],
  "87:16": [
    {
      "ar": "بَلْ",
      "im": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "تُؤْثِرُونَ",
      "im": "تُؤْثِرُونَ",
      "en": "You prefer",
      "tr": "tu'thirūna"
    },
    {
      "ar": "ٱلْحَيَوٰةَ",
      "im": "الْحَيَاةَ",
      "en": "the life",
      "tr": "l-ḥayata"
    },
    {
      "ar": "ٱلدُّنْيَا",
      "im": "الدُّنْيَا",
      "en": "(of) the world",
      "tr": "l-dun'yā"
    }
  ],
  "87:17": [
    {
      "ar": "وَٱلْـَٔاخِرَةُ",
      "im": "وَالْآخِرَةُ",
      "en": "While the Hereafter",
      "tr": "wal-ākhiratu"
    },
    {
      "ar": "خَيْرٌۭ",
      "im": "خَيْرٌ",
      "en": "(is) better",
      "tr": "khayrun"
    },
    {
      "ar": "وَأَبْقَىٰٓ",
      "im": "وَأَبْقَىٰ",
      "en": "and everlasting",
      "tr": "wa-abqā"
    }
  ],
  "87:18": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "surely (is) in",
      "tr": "lafī"
    },
    {
      "ar": "ٱلصُّحُفِ",
      "im": "الصُّحُفِ",
      "en": "the Scriptures",
      "tr": "l-ṣuḥufi"
    },
    {
      "ar": "ٱلْأُولَىٰ",
      "im": "الْأُولَىٰ",
      "en": "[the] former",
      "tr": "l-ūlā"
    }
  ],
  "87:19": [
    {
      "ar": "صُحُفِ",
      "im": "صُحُفِ",
      "en": "(The) Scriptures",
      "tr": "ṣuḥufi"
    },
    {
      "ar": "إِبْرَٰهِيمَ",
      "im": "إِبْرَاهِيمَ",
      "en": "(of) Ibrahim",
      "tr": "ib'rāhīma"
    },
    {
      "ar": "وَمُوسَىٰ",
      "im": "وَمُوسَىٰ",
      "en": "and Musa",
      "tr": "wamūsā"
    }
  ],
  "88:1": [
    {
      "ar": "هَلْ",
      "im": "هَلْ",
      "en": "Has",
      "tr": "hal"
    },
    {
      "ar": "أَتَىٰكَ",
      "im": "أَتَاكَ",
      "en": "(there) come to you",
      "tr": "atāka"
    },
    {
      "ar": "حَدِيثُ",
      "im": "حَدِيثُ",
      "en": "(the) news",
      "tr": "ḥadīthu"
    },
    {
      "ar": "ٱلْغَـٰشِيَةِ",
      "im": "الْغَاشِيَةِ",
      "en": "(of) the Overwhelming",
      "tr": "l-ghāshiyati"
    }
  ],
  "88:2": [
    {
      "ar": "وُجُوهٌۭ",
      "im": "وُجُوهٌ",
      "en": "Faces",
      "tr": "wujūhun"
    },
    {
      "ar": "يَوْمَئِذٍ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "خَـٰشِعَةٌ",
      "im": "خَاشِعَةٌ",
      "en": "(will be) humbled",
      "tr": "khāshiʿatun"
    }
  ],
  "88:3": [
    {
      "ar": "عَامِلَةٌۭ",
      "im": "عَامِلَةٌ",
      "en": "Laboring",
      "tr": "ʿāmilatun"
    },
    {
      "ar": "نَّاصِبَةٌۭ",
      "im": "نَّاصِبَةٌ",
      "en": "exhausted",
      "tr": "nāṣibatun"
    }
  ],
  "88:4": [
    {
      "ar": "تَصْلَىٰ",
      "im": "تَصْلَىٰ",
      "en": "They will burn",
      "tr": "taṣlā"
    },
    {
      "ar": "نَارًا",
      "im": "نَارًا",
      "en": "(in) a Fire",
      "tr": "nāran"
    },
    {
      "ar": "حَامِيَةًۭ",
      "im": "حَامِيَةً",
      "en": "intensely hot",
      "tr": "ḥāmiyatan"
    }
  ],
  "88:5": [
    {
      "ar": "تُسْقَىٰ",
      "im": "تُسْقَىٰ",
      "en": "They will be given to drink",
      "tr": "tus'qā"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "عَيْنٍ",
      "im": "عَيْنٍ",
      "en": "a spring",
      "tr": "ʿaynin"
    },
    {
      "ar": "ءَانِيَةٍۢ",
      "im": "آنِيَةٍ",
      "en": "boiling",
      "tr": "āniyatin"
    }
  ],
  "88:6": [
    {
      "ar": "لَّيْسَ",
      "im": "لَّيْسَ",
      "en": "Not is",
      "tr": "laysa"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "for them",
      "tr": "lahum"
    },
    {
      "ar": "طَعَامٌ",
      "im": "طَعَامٌ",
      "en": "food",
      "tr": "ṭaʿāmun"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "ضَرِيعٍۢ",
      "im": "ضَرِيعٍ",
      "en": "a bitter thorny plant",
      "tr": "ḍarīʿin"
    }
  ],
  "88:7": [
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "يُسْمِنُ",
      "im": "يُسْمِنُ",
      "en": "it nourishes",
      "tr": "yus'minu"
    },
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يُغْنِى",
      "im": "يُغْنِي",
      "en": "it avails",
      "tr": "yugh'nī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "جُوعٍۢ",
      "im": "جُوعٍ",
      "en": "hunger",
      "tr": "jūʿin"
    }
  ],
  "88:8": [
    {
      "ar": "وُجُوهٌۭ",
      "im": "وُجُوهٌ",
      "en": "Faces",
      "tr": "wujūhun"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "نَّاعِمَةٌۭ",
      "im": "نَّاعِمَةٌ",
      "en": "(will be) joyful",
      "tr": "nāʿimatun"
    }
  ],
  "88:9": [
    {
      "ar": "لِّسَعْيِهَا",
      "im": "لِّسَعْيِهَا",
      "en": "With their effort",
      "tr": "lisaʿyihā"
    },
    {
      "ar": "رَاضِيَةٌۭ",
      "im": "رَاضِيَةٌ",
      "en": "satisfied",
      "tr": "rāḍiyatun"
    }
  ],
  "88:10": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "جَنَّةٍ",
      "im": "جَنَّةٍ",
      "en": "a garden",
      "tr": "jannatin"
    },
    {
      "ar": "عَالِيَةٍۢ",
      "im": "عَالِيَةٍ",
      "en": "elevated",
      "tr": "ʿāliyatin"
    }
  ],
  "88:11": [
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "تَسْمَعُ",
      "im": "تَسْمَعُ",
      "en": "they will hear",
      "tr": "tasmaʿu"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "لَـٰغِيَةًۭ",
      "im": "لَاغِيَةً",
      "en": "vain talk",
      "tr": "lāghiyatan"
    }
  ],
  "88:12": [
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "Therein",
      "tr": "fīhā"
    },
    {
      "ar": "عَيْنٌۭ",
      "im": "عَيْنٌ",
      "en": "(will be) a spring",
      "tr": "ʿaynun"
    },
    {
      "ar": "جَارِيَةٌۭ",
      "im": "جَارِيَةٌ",
      "en": "flowing",
      "tr": "jāriyatun"
    }
  ],
  "88:13": [
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "Therein",
      "tr": "fīhā"
    },
    {
      "ar": "سُرُرٌۭ",
      "im": "سُرُرٌ",
      "en": "(will be) thrones",
      "tr": "sururun"
    },
    {
      "ar": "مَّرْفُوعَةٌۭ",
      "im": "مَّرْفُوعَةٌ",
      "en": "raised high",
      "tr": "marfūʿatun"
    }
  ],
  "88:14": [
    {
      "ar": "وَأَكْوَابٌۭ",
      "im": "وَأَكْوَابٌ",
      "en": "And cups",
      "tr": "wa-akwābun"
    },
    {
      "ar": "مَّوْضُوعَةٌۭ",
      "im": "مَّوْضُوعَةٌ",
      "en": "put in place",
      "tr": "mawḍūʿatun"
    }
  ],
  "88:15": [
    {
      "ar": "وَنَمَارِقُ",
      "im": "وَنَمَارِقُ",
      "en": "And cushions",
      "tr": "wanamāriqu"
    },
    {
      "ar": "مَصْفُوفَةٌۭ",
      "im": "مَصْفُوفَةٌ",
      "en": "lined up",
      "tr": "maṣfūfatun"
    }
  ],
  "88:16": [
    {
      "ar": "وَزَرَابِىُّ",
      "im": "وَزَرَابِيُّ",
      "en": "And carpets",
      "tr": "wazarābiyyu"
    },
    {
      "ar": "مَبْثُوثَةٌ",
      "im": "مَبْثُوثَةٌ",
      "en": "spread out",
      "tr": "mabthūthatun"
    }
  ],
  "88:17": [
    {
      "ar": "أَفَلَا",
      "im": "أَفَلَا",
      "en": "Then do not",
      "tr": "afalā"
    },
    {
      "ar": "يَنظُرُونَ",
      "im": "يَنظُرُونَ",
      "en": "they look",
      "tr": "yanẓurūna"
    },
    {
      "ar": "إِلَى",
      "im": "إِلَى",
      "en": "towards",
      "tr": "ilā"
    },
    {
      "ar": "ٱلْإِبِلِ",
      "im": "الْإِبِلِ",
      "en": "the camels",
      "tr": "l-ibili"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "خُلِقَتْ",
      "im": "خُلِقَتْ",
      "en": "they are created",
      "tr": "khuliqat"
    }
  ],
  "88:18": [
    {
      "ar": "وَإِلَى",
      "im": "وَإِلَى",
      "en": "And towards",
      "tr": "wa-ilā"
    },
    {
      "ar": "ٱلسَّمَآءِ",
      "im": "السَّمَاءِ",
      "en": "the sky",
      "tr": "l-samāi"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "رُفِعَتْ",
      "im": "رُفِعَتْ",
      "en": "it is raised",
      "tr": "rufiʿat"
    }
  ],
  "88:19": [
    {
      "ar": "وَإِلَى",
      "im": "وَإِلَى",
      "en": "And towards",
      "tr": "wa-ilā"
    },
    {
      "ar": "ٱلْجِبَالِ",
      "im": "الْجِبَالِ",
      "en": "the mountains",
      "tr": "l-jibāli"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "نُصِبَتْ",
      "im": "نُصِبَتْ",
      "en": "they are fixed",
      "tr": "nuṣibat"
    }
  ],
  "88:20": [
    {
      "ar": "وَإِلَى",
      "im": "وَإِلَى",
      "en": "And towards",
      "tr": "wa-ilā"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "im": "الْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "سُطِحَتْ",
      "im": "سُطِحَتْ",
      "en": "it is spread out",
      "tr": "suṭiḥat"
    }
  ],
  "88:21": [
    {
      "ar": "فَذَكِّرْ",
      "im": "فَذَكِّرْ",
      "en": "So remind",
      "tr": "fadhakkir"
    },
    {
      "ar": "إِنَّمَآ",
      "im": "إِنَّمَا",
      "en": "only",
      "tr": "innamā"
    },
    {
      "ar": "أَنتَ",
      "im": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "مُذَكِّرٌۭ",
      "im": "مُذَكِّرٌ",
      "en": "(are) a reminder",
      "tr": "mudhakkirun"
    }
  ],
  "88:22": [
    {
      "ar": "لَّسْتَ",
      "im": "لَّسْتَ",
      "en": "You are not",
      "tr": "lasta"
    },
    {
      "ar": "عَلَيْهِم",
      "im": "عَلَيْهِم",
      "en": "over them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "بِمُصَيْطِرٍ",
      "im": "بِمُصَيْطِرٍ",
      "en": "a controller",
      "tr": "bimuṣayṭirin"
    }
  ],
  "88:23": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "But",
      "tr": "illā"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "whoever",
      "tr": "man"
    },
    {
      "ar": "تَوَلَّىٰ",
      "im": "تَوَلَّىٰ",
      "en": "turns away",
      "tr": "tawallā"
    },
    {
      "ar": "وَكَفَرَ",
      "im": "وَكَفَرَ",
      "en": "and disbelieves",
      "tr": "wakafara"
    }
  ],
  "88:24": [
    {
      "ar": "فَيُعَذِّبُهُ",
      "im": "فَيُعَذِّبُهُ",
      "en": "Then will punish him",
      "tr": "fayuʿadhibuhu"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلْعَذَابَ",
      "im": "الْعَذَابَ",
      "en": "(with) the punishment",
      "tr": "l-ʿadhāba"
    },
    {
      "ar": "ٱلْأَكْبَرَ",
      "im": "الْأَكْبَرَ",
      "en": "greatest",
      "tr": "l-akbara"
    }
  ],
  "88:25": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "إِلَيْنَآ",
      "im": "إِلَيْنَا",
      "en": "to Us",
      "tr": "ilaynā"
    },
    {
      "ar": "إِيَابَهُمْ",
      "im": "إِيَابَهُمْ",
      "en": "(will be) their return",
      "tr": "iyābahum"
    }
  ],
  "88:26": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "indeed",
      "tr": "inna"
    },
    {
      "ar": "عَلَيْنَا",
      "im": "عَلَيْنَا",
      "en": "upon Us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "حِسَابَهُم",
      "im": "حِسَابَهُم",
      "en": "(is) their account",
      "tr": "ḥisābahum"
    }
  ],
  "89:1": [
    {
      "ar": "وَٱلْفَجْرِ",
      "im": "وَالْفَجْرِ",
      "en": "By the dawn",
      "tr": "wal-fajri"
    }
  ],
  "89:2": [
    {
      "ar": "وَلَيَالٍ",
      "im": "وَلَيَالٍ",
      "en": "And the nights",
      "tr": "walayālin"
    },
    {
      "ar": "عَشْرٍۢ",
      "im": "عَشْرٍ",
      "en": "ten",
      "tr": "ʿashrin"
    }
  ],
  "89:3": [
    {
      "ar": "وَٱلشَّفْعِ",
      "im": "وَالشَّفْعِ",
      "en": "And the even",
      "tr": "wal-shafʿi"
    },
    {
      "ar": "وَٱلْوَتْرِ",
      "im": "وَالْوَتْرِ",
      "en": "and the odd",
      "tr": "wal-watri"
    }
  ],
  "89:4": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "And the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "يَسْرِ",
      "im": "يَسْرِ",
      "en": "it passes",
      "tr": "yasri"
    }
  ],
  "89:5": [
    {
      "ar": "هَلْ",
      "im": "هَلْ",
      "en": "Is",
      "tr": "hal"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "قَسَمٌۭ",
      "im": "قَسَمٌ",
      "en": "(not) an oath",
      "tr": "qasamun"
    },
    {
      "ar": "لِّذِى",
      "im": "لِّذِي",
      "en": "for those",
      "tr": "lidhī"
    },
    {
      "ar": "حِجْرٍ",
      "im": "حِجْرٍ",
      "en": "who understand",
      "tr": "ḥij'rin"
    }
  ],
  "89:6": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Did not",
      "tr": "alam"
    },
    {
      "ar": "تَرَ",
      "im": "تَرَ",
      "en": "you see",
      "tr": "tara"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "فَعَلَ",
      "im": "فَعَلَ",
      "en": "dealt",
      "tr": "faʿala"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "بِعَادٍ",
      "im": "بِعَادٍ",
      "en": "with Aad",
      "tr": "biʿādin"
    }
  ],
  "89:7": [
    {
      "ar": "إِرَمَ",
      "im": "إِرَمَ",
      "en": "Iram",
      "tr": "irama"
    },
    {
      "ar": "ذَاتِ",
      "im": "ذَاتِ",
      "en": "possessors (of)",
      "tr": "dhāti"
    },
    {
      "ar": "ٱلْعِمَادِ",
      "im": "الْعِمَادِ",
      "en": "lofty pillars",
      "tr": "l-ʿimādi"
    }
  ],
  "89:8": [
    {
      "ar": "ٱلَّتِى",
      "im": "الَّتِي",
      "en": "Which",
      "tr": "allatī"
    },
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يُخْلَقْ",
      "im": "يُخْلَقْ",
      "en": "had been created",
      "tr": "yukh'laq"
    },
    {
      "ar": "مِثْلُهَا",
      "im": "مِثْلُهَا",
      "en": "like them",
      "tr": "mith'luhā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْبِلَـٰدِ",
      "im": "الْبِلَادِ",
      "en": "the cities",
      "tr": "l-bilādi"
    }
  ],
  "89:9": [
    {
      "ar": "وَثَمُودَ",
      "im": "وَثَمُودَ",
      "en": "And Thamud",
      "tr": "wathamūda"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "who",
      "tr": "alladhīna"
    },
    {
      "ar": "جَابُوا۟",
      "im": "جَابُوا",
      "en": "carved out",
      "tr": "jābū"
    },
    {
      "ar": "ٱلصَّخْرَ",
      "im": "الصَّخْرَ",
      "en": "the rocks",
      "tr": "l-ṣakhra"
    },
    {
      "ar": "بِٱلْوَادِ",
      "im": "بِالْوَادِ",
      "en": "in the valley",
      "tr": "bil-wādi"
    }
  ],
  "89:10": [
    {
      "ar": "وَفِرْعَوْنَ",
      "im": "وَفِرْعَوْنَ",
      "en": "And Firaun",
      "tr": "wafir'ʿawna"
    },
    {
      "ar": "ذِى",
      "im": "ذِي",
      "en": "owner of",
      "tr": "dhī"
    },
    {
      "ar": "ٱلْأَوْتَادِ",
      "im": "الْأَوْتَادِ",
      "en": "stakes",
      "tr": "l-awtādi"
    }
  ],
  "89:11": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Who",
      "tr": "alladhīna"
    },
    {
      "ar": "طَغَوْا۟",
      "im": "طَغَوْا",
      "en": "transgressed",
      "tr": "ṭaghaw"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْبِلَـٰدِ",
      "im": "الْبِلَادِ",
      "en": "the lands",
      "tr": "l-bilādi"
    }
  ],
  "89:12": [
    {
      "ar": "فَأَكْثَرُوا۟",
      "im": "فَأَكْثَرُوا",
      "en": "And (made) much",
      "tr": "fa-aktharū"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "ٱلْفَسَادَ",
      "im": "الْفَسَادَ",
      "en": "corruption",
      "tr": "l-fasāda"
    }
  ],
  "89:13": [
    {
      "ar": "فَصَبَّ",
      "im": "فَصَبَّ",
      "en": "So poured",
      "tr": "faṣabba"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "on them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "سَوْطَ",
      "im": "سَوْطَ",
      "en": "scourge",
      "tr": "sawṭa"
    },
    {
      "ar": "عَذَابٍ",
      "im": "عَذَابٍ",
      "en": "(of) punishment",
      "tr": "ʿadhābin"
    }
  ],
  "89:14": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبَّكَ",
      "im": "رَبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "لَبِٱلْمِرْصَادِ",
      "im": "لَبِالْمِرْصَادِ",
      "en": "(is) surely Ever Watchful",
      "tr": "labil-mir'ṣādi"
    }
  ],
  "89:15": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "And as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "does",
      "tr": "mā"
    },
    {
      "ar": "ٱبْتَلَىٰهُ",
      "im": "ابْتَلَاهُ",
      "en": "try him",
      "tr": "ib'talāhu"
    },
    {
      "ar": "رَبُّهُۥ",
      "im": "رَبُّهُ",
      "en": "his Lord",
      "tr": "rabbuhu"
    },
    {
      "ar": "فَأَكْرَمَهُۥ",
      "im": "فَأَكْرَمَهُ",
      "en": "and is generous to him",
      "tr": "fa-akramahu"
    },
    {
      "ar": "وَنَعَّمَهُۥ",
      "im": "وَنَعَّمَهُ",
      "en": "and favors him",
      "tr": "wanaʿʿamahu"
    },
    {
      "ar": "فَيَقُولُ",
      "im": "فَيَقُولُ",
      "en": "he says",
      "tr": "fayaqūlu"
    },
    {
      "ar": "رَبِّىٓ",
      "im": "رَبِّي",
      "en": "My Lord",
      "tr": "rabbī"
    },
    {
      "ar": "أَكْرَمَنِ",
      "im": "أَكْرَمَنِ",
      "en": "has honored me",
      "tr": "akramani"
    }
  ],
  "89:16": [
    {
      "ar": "وَأَمَّآ",
      "im": "وَأَمَّا",
      "en": "But",
      "tr": "wa-ammā"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "does",
      "tr": "mā"
    },
    {
      "ar": "ٱبْتَلَىٰهُ",
      "im": "ابْتَلَاهُ",
      "en": "He try him",
      "tr": "ib'talāhu"
    },
    {
      "ar": "فَقَدَرَ",
      "im": "فَقَدَرَ",
      "en": "and restricts",
      "tr": "faqadara"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "for him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "رِزْقَهُۥ",
      "im": "رِزْقَهُ",
      "en": "his provision",
      "tr": "riz'qahu"
    },
    {
      "ar": "فَيَقُولُ",
      "im": "فَيَقُولُ",
      "en": "then he says",
      "tr": "fayaqūlu"
    },
    {
      "ar": "رَبِّىٓ",
      "im": "رَبِّي",
      "en": "My Lord",
      "tr": "rabbī"
    },
    {
      "ar": "أَهَـٰنَنِ",
      "im": "أَهَانَنِ",
      "en": "(has) humiliated me",
      "tr": "ahānani"
    }
  ],
  "89:17": [
    {
      "ar": "كَلَّا ۖ",
      "im": "كَلَّا ۖ",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "بَل",
      "im": "بَل",
      "en": "But",
      "tr": "bal"
    },
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "تُكْرِمُونَ",
      "im": "تُكْرِمُونَ",
      "en": "you honor",
      "tr": "tuk'rimūna"
    },
    {
      "ar": "ٱلْيَتِيمَ",
      "im": "الْيَتِيمَ",
      "en": "the orphan",
      "tr": "l-yatīma"
    }
  ],
  "89:18": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "تَحَـٰٓضُّونَ",
      "im": "تَحَاضُّونَ",
      "en": "you feel the urge",
      "tr": "taḥāḍḍūna"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "طَعَامِ",
      "im": "طَعَامِ",
      "en": "feed",
      "tr": "ṭaʿāmi"
    },
    {
      "ar": "ٱلْمِسْكِينِ",
      "im": "الْمِسْكِينِ",
      "en": "the poor",
      "tr": "l-mis'kīni"
    }
  ],
  "89:19": [
    {
      "ar": "وَتَأْكُلُونَ",
      "im": "وَتَأْكُلُونَ",
      "en": "And you consume",
      "tr": "watakulūna"
    },
    {
      "ar": "ٱلتُّرَاثَ",
      "im": "التُّرَاثَ",
      "en": "the inheritance",
      "tr": "l-turātha"
    },
    {
      "ar": "أَكْلًۭا",
      "im": "أَكْلًا",
      "en": "devouring",
      "tr": "aklan"
    },
    {
      "ar": "لَّمًّۭا",
      "im": "لَّمًّا",
      "en": "altogether",
      "tr": "lamman"
    }
  ],
  "89:20": [
    {
      "ar": "وَتُحِبُّونَ",
      "im": "وَتُحِبُّونَ",
      "en": "And you love",
      "tr": "watuḥibbūna"
    },
    {
      "ar": "ٱلْمَالَ",
      "im": "الْمَالَ",
      "en": "wealth",
      "tr": "l-māla"
    },
    {
      "ar": "حُبًّۭا",
      "im": "حُبًّا",
      "en": "(with) love",
      "tr": "ḥubban"
    },
    {
      "ar": "جَمًّۭا",
      "im": "جَمًّا",
      "en": "immense",
      "tr": "jamman"
    }
  ],
  "89:21": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "دُكَّتِ",
      "im": "دُكَّتِ",
      "en": "is leveled",
      "tr": "dukkati"
    },
    {
      "ar": "ٱلْأَرْضُ",
      "im": "الْأَرْضُ",
      "en": "the earth",
      "tr": "l-arḍu"
    },
    {
      "ar": "دَكًّۭا",
      "im": "دَكًّا",
      "en": "pounded",
      "tr": "dakkan"
    },
    {
      "ar": "دَكًّۭا",
      "im": "دَكًّا",
      "en": "(and) crushed",
      "tr": "dakkan"
    }
  ],
  "89:22": [
    {
      "ar": "وَجَآءَ",
      "im": "وَجَاءَ",
      "en": "And comes",
      "tr": "wajāa"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "وَٱلْمَلَكُ",
      "im": "وَالْمَلَكُ",
      "en": "and the Angels",
      "tr": "wal-malaku"
    },
    {
      "ar": "صَفًّۭا",
      "im": "صَفًّا",
      "en": "rank",
      "tr": "ṣaffan"
    },
    {
      "ar": "صَفًّۭا",
      "im": "صَفًّا",
      "en": "(upon) rank",
      "tr": "ṣaffan"
    }
  ],
  "89:23": [
    {
      "ar": "وَجِا۟ىٓءَ",
      "im": "وَجِيءَ",
      "en": "And is brought",
      "tr": "wajīa"
    },
    {
      "ar": "يَوْمَئِذٍۭ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "بِجَهَنَّمَ ۚ",
      "im": "بِجَهَنَّمَ ۚ",
      "en": "Hell",
      "tr": "bijahannama"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "That Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "يَتَذَكَّرُ",
      "im": "يَتَذَكَّرُ",
      "en": "will remember",
      "tr": "yatadhakkaru"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "وَأَنَّىٰ",
      "im": "وَأَنَّىٰ",
      "en": "but how",
      "tr": "wa-annā"
    },
    {
      "ar": "لَهُ",
      "im": "لَهُ",
      "en": "(will be) for him",
      "tr": "lahu"
    },
    {
      "ar": "ٱلذِّكْرَىٰ",
      "im": "الذِّكْرَىٰ",
      "en": "the remembrance",
      "tr": "l-dhik'rā"
    }
  ],
  "89:24": [
    {
      "ar": "يَقُولُ",
      "im": "يَقُولُ",
      "en": "He will say",
      "tr": "yaqūlu"
    },
    {
      "ar": "يَـٰلَيْتَنِى",
      "im": "يَا لَيْتَنِي",
      "en": "O I wish",
      "tr": "yālaytanī"
    },
    {
      "ar": "قَدَّمْتُ",
      "im": "قَدَّمْتُ",
      "en": "I had sent forth",
      "tr": "qaddamtu"
    },
    {
      "ar": "لِحَيَاتِى",
      "im": "لِحَيَاتِي",
      "en": "for my life",
      "tr": "liḥayātī"
    }
  ],
  "89:25": [
    {
      "ar": "فَيَوْمَئِذٍۢ",
      "im": "فَيَوْمَئِذٍ",
      "en": "So that Day",
      "tr": "fayawma-idhin"
    },
    {
      "ar": "لَّا",
      "im": "لَّا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يُعَذِّبُ",
      "im": "يُعَذِّبُ",
      "en": "will punish",
      "tr": "yuʿadhibu"
    },
    {
      "ar": "عَذَابَهُۥٓ",
      "im": "عَذَابَهُ",
      "en": "(as) His punishment",
      "tr": "ʿadhābahu"
    },
    {
      "ar": "أَحَدٌۭ",
      "im": "أَحَدٌ",
      "en": "anyone",
      "tr": "aḥadun"
    }
  ],
  "89:26": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يُوثِقُ",
      "im": "يُوثِقُ",
      "en": "will bind",
      "tr": "yūthiqu"
    },
    {
      "ar": "وَثَاقَهُۥٓ",
      "im": "وَثَاقَهُ",
      "en": "(as) His binding",
      "tr": "wathāqahu"
    },
    {
      "ar": "أَحَدٌۭ",
      "im": "أَحَدٌ",
      "en": "anyone",
      "tr": "aḥadun"
    }
  ],
  "89:27": [
    {
      "ar": "يَـٰٓأَيَّتُهَا",
      "im": "يَا أَيَّتُهَا",
      "en": "O",
      "tr": "yāayyatuhā"
    },
    {
      "ar": "ٱلنَّفْسُ",
      "im": "النَّفْسُ",
      "en": "soul",
      "tr": "l-nafsu"
    },
    {
      "ar": "ٱلْمُطْمَئِنَّةُ",
      "im": "الْمُطْمَئِنَّةُ",
      "en": "who is satisfied",
      "tr": "l-muṭ'ma-inatu"
    }
  ],
  "89:28": [
    {
      "ar": "ٱرْجِعِىٓ",
      "im": "ارْجِعِي",
      "en": "Return",
      "tr": "ir'jiʿī"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّكِ",
      "im": "رَبِّكِ",
      "en": "your Lord",
      "tr": "rabbiki"
    },
    {
      "ar": "رَاضِيَةًۭ",
      "im": "رَاضِيَةً",
      "en": "well pleased",
      "tr": "rāḍiyatan"
    },
    {
      "ar": "مَّرْضِيَّةًۭ",
      "im": "مَّرْضِيَّةً",
      "en": "and pleasing",
      "tr": "marḍiyyatan"
    }
  ],
  "89:29": [
    {
      "ar": "فَٱدْخُلِى",
      "im": "فَادْخُلِي",
      "en": "So enter",
      "tr": "fa-ud'khulī"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "عِبَـٰدِى",
      "im": "عِبَادِي",
      "en": "My slaves",
      "tr": "ʿibādī"
    }
  ],
  "89:30": [
    {
      "ar": "وَٱدْخُلِى",
      "im": "وَادْخُلِي",
      "en": "And enter",
      "tr": "wa-ud'khulī"
    },
    {
      "ar": "جَنَّتِى",
      "im": "جَنَّتِي",
      "en": "My Paradise",
      "tr": "jannatī"
    }
  ],
  "90:1": [
    {
      "ar": "لَآ",
      "im": "لَا",
      "en": "Nay",
      "tr": "lā"
    },
    {
      "ar": "أُقْسِمُ",
      "im": "أُقْسِمُ",
      "en": "I swear",
      "tr": "uq'simu"
    },
    {
      "ar": "بِهَـٰذَا",
      "im": "بِهَٰذَا",
      "en": "by this",
      "tr": "bihādhā"
    },
    {
      "ar": "ٱلْبَلَدِ",
      "im": "الْبَلَدِ",
      "en": "city",
      "tr": "l-baladi"
    }
  ],
  "90:2": [
    {
      "ar": "وَأَنتَ",
      "im": "وَأَنتَ",
      "en": "And you",
      "tr": "wa-anta"
    },
    {
      "ar": "حِلٌّۢ",
      "im": "حِلٌّ",
      "en": "(are) free (to dwell)",
      "tr": "ḥillun"
    },
    {
      "ar": "بِهَـٰذَا",
      "im": "بِهَٰذَا",
      "en": "in this",
      "tr": "bihādhā"
    },
    {
      "ar": "ٱلْبَلَدِ",
      "im": "الْبَلَدِ",
      "en": "city",
      "tr": "l-baladi"
    }
  ],
  "90:3": [
    {
      "ar": "وَوَالِدٍۢ",
      "im": "وَوَالِدٍ",
      "en": "And the begetter",
      "tr": "wawālidin"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "وَلَدَ",
      "im": "وَلَدَ",
      "en": "he begot",
      "tr": "walada"
    }
  ],
  "90:4": [
    {
      "ar": "لَقَدْ",
      "im": "لَقَدْ",
      "en": "Certainly",
      "tr": "laqad"
    },
    {
      "ar": "خَلَقْنَا",
      "im": "خَلَقْنَا",
      "en": "We have created",
      "tr": "khalaqnā"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "man",
      "tr": "l-insāna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(to be) in",
      "tr": "fī"
    },
    {
      "ar": "كَبَدٍ",
      "im": "كَبَدٍ",
      "en": "hardship",
      "tr": "kabadin"
    }
  ],
  "90:5": [
    {
      "ar": "أَيَحْسَبُ",
      "im": "أَيَحْسَبُ",
      "en": "Does he think",
      "tr": "ayaḥsabu"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّن",
      "im": "لَّن",
      "en": "not",
      "tr": "lan"
    },
    {
      "ar": "يَقْدِرَ",
      "im": "يَقْدِرَ",
      "en": "has power",
      "tr": "yaqdira"
    },
    {
      "ar": "عَلَيْهِ",
      "im": "عَلَيْهِ",
      "en": "over him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "أَحَدٌۭ",
      "im": "أَحَدٌ",
      "en": "anyone",
      "tr": "aḥadun"
    }
  ],
  "90:6": [
    {
      "ar": "يَقُولُ",
      "im": "يَقُولُ",
      "en": "He will say",
      "tr": "yaqūlu"
    },
    {
      "ar": "أَهْلَكْتُ",
      "im": "أَهْلَكْتُ",
      "en": "I have squandered",
      "tr": "ahlaktu"
    },
    {
      "ar": "مَالًۭا",
      "im": "مَالًا",
      "en": "wealth",
      "tr": "mālan"
    },
    {
      "ar": "لُّبَدًا",
      "im": "لُّبَدًا",
      "en": "abundant",
      "tr": "lubadan"
    }
  ],
  "90:7": [
    {
      "ar": "أَيَحْسَبُ",
      "im": "أَيَحْسَبُ",
      "en": "Does he think",
      "tr": "ayaḥsabu"
    },
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "لَّمْ",
      "im": "لَّمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يَرَهُۥٓ",
      "im": "يَرَهُ",
      "en": "sees him",
      "tr": "yarahu"
    },
    {
      "ar": "أَحَدٌ",
      "im": "أَحَدٌ",
      "en": "anyone",
      "tr": "aḥadun"
    }
  ],
  "90:8": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Have not",
      "tr": "alam"
    },
    {
      "ar": "نَجْعَل",
      "im": "نَجْعَل",
      "en": "We made",
      "tr": "najʿal"
    },
    {
      "ar": "لَّهُۥ",
      "im": "لَّهُ",
      "en": "for him",
      "tr": "lahu"
    },
    {
      "ar": "عَيْنَيْنِ",
      "im": "عَيْنَيْنِ",
      "en": "two eyes",
      "tr": "ʿaynayni"
    }
  ],
  "90:9": [
    {
      "ar": "وَلِسَانًۭا",
      "im": "وَلِسَانًا",
      "en": "And a tongue",
      "tr": "walisānan"
    },
    {
      "ar": "وَشَفَتَيْنِ",
      "im": "وَشَفَتَيْنِ",
      "en": "and two lips",
      "tr": "washafatayni"
    }
  ],
  "90:10": [
    {
      "ar": "وَهَدَيْنَـٰهُ",
      "im": "وَهَدَيْنَاهُ",
      "en": "And shown him",
      "tr": "wahadaynāhu"
    },
    {
      "ar": "ٱلنَّجْدَيْنِ",
      "im": "النَّجْدَيْنِ",
      "en": "the two ways",
      "tr": "l-najdayni"
    }
  ],
  "90:11": [
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "But not",
      "tr": "falā"
    },
    {
      "ar": "ٱقْتَحَمَ",
      "im": "اقْتَحَمَ",
      "en": "he has attempted",
      "tr": "iq'taḥama"
    },
    {
      "ar": "ٱلْعَقَبَةَ",
      "im": "الْعَقَبَةَ",
      "en": "the steep path",
      "tr": "l-ʿaqabata"
    }
  ],
  "90:12": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱلْعَقَبَةُ",
      "im": "الْعَقَبَةُ",
      "en": "the steep path (is)",
      "tr": "l-ʿaqabatu"
    }
  ],
  "90:13": [
    {
      "ar": "فَكُّ",
      "im": "فَكُّ",
      "en": "(It is) freeing",
      "tr": "fakku"
    },
    {
      "ar": "رَقَبَةٍ",
      "im": "رَقَبَةٍ",
      "en": "a neck",
      "tr": "raqabatin"
    }
  ],
  "90:14": [
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "Or",
      "tr": "aw"
    },
    {
      "ar": "إِطْعَـٰمٌۭ",
      "im": "إِطْعَامٌ",
      "en": "feeding",
      "tr": "iṭ'ʿāmun"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "يَوْمٍۢ",
      "im": "يَوْمٍ",
      "en": "a day",
      "tr": "yawmin"
    },
    {
      "ar": "ذِى",
      "im": "ذِي",
      "en": "of",
      "tr": "dhī"
    },
    {
      "ar": "مَسْغَبَةٍۢ",
      "im": "مَسْغَبَةٍ",
      "en": "severe hunger",
      "tr": "masghabatin"
    }
  ],
  "90:15": [
    {
      "ar": "يَتِيمًۭا",
      "im": "يَتِيمًا",
      "en": "An orphan",
      "tr": "yatīman"
    },
    {
      "ar": "ذَا",
      "im": "ذَا",
      "en": "of",
      "tr": "dhā"
    },
    {
      "ar": "مَقْرَبَةٍ",
      "im": "مَقْرَبَةٍ",
      "en": "near relationship",
      "tr": "maqrabatin"
    }
  ],
  "90:16": [
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "Or",
      "tr": "aw"
    },
    {
      "ar": "مِسْكِينًۭا",
      "im": "مِسْكِينًا",
      "en": "a needy person",
      "tr": "mis'kīnan"
    },
    {
      "ar": "ذَا",
      "im": "ذَا",
      "en": "in",
      "tr": "dhā"
    },
    {
      "ar": "مَتْرَبَةٍۢ",
      "im": "مَتْرَبَةٍ",
      "en": "misery",
      "tr": "matrabatin"
    }
  ],
  "90:17": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "he is",
      "tr": "kāna"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَتَوَاصَوْا۟",
      "im": "وَتَوَاصَوْا",
      "en": "and enjoin (each other)",
      "tr": "watawāṣaw"
    },
    {
      "ar": "بِٱلصَّبْرِ",
      "im": "بِالصَّبْرِ",
      "en": "to patience",
      "tr": "bil-ṣabri"
    },
    {
      "ar": "وَتَوَاصَوْا۟",
      "im": "وَتَوَاصَوْا",
      "en": "and enjoin (each other)",
      "tr": "watawāṣaw"
    },
    {
      "ar": "بِٱلْمَرْحَمَةِ",
      "im": "بِالْمَرْحَمَةِ",
      "en": "to compassion",
      "tr": "bil-marḥamati"
    }
  ],
  "90:18": [
    {
      "ar": "أُو۟لَـٰٓئِكَ",
      "im": "أُولَٰئِكَ",
      "en": "Those",
      "tr": "ulāika"
    },
    {
      "ar": "أَصْحَـٰبُ",
      "im": "أَصْحَابُ",
      "en": "(are the) companions",
      "tr": "aṣḥābu"
    },
    {
      "ar": "ٱلْمَيْمَنَةِ",
      "im": "الْمَيْمَنَةِ",
      "en": "(of) the right (hand)",
      "tr": "l-maymanati"
    }
  ],
  "90:19": [
    {
      "ar": "وَٱلَّذِينَ",
      "im": "وَالَّذِينَ",
      "en": "But those who",
      "tr": "wa-alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "بِـَٔايَـٰتِنَا",
      "im": "بِآيَاتِنَا",
      "en": "in Our Verses",
      "tr": "biāyātinā"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "أَصْحَـٰبُ",
      "im": "أَصْحَابُ",
      "en": "(are the) companions",
      "tr": "aṣḥābu"
    },
    {
      "ar": "ٱلْمَشْـَٔمَةِ",
      "im": "الْمَشْأَمَةِ",
      "en": "(of) the left (hand)",
      "tr": "l-mashamati"
    }
  ],
  "90:20": [
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "Over them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "نَارٌۭ",
      "im": "نَارٌ",
      "en": "(will be the) Fire",
      "tr": "nārun"
    },
    {
      "ar": "مُّؤْصَدَةٌۢ",
      "im": "مُّؤْصَدَةٌ",
      "en": "closed in",
      "tr": "mu'ṣadatun"
    }
  ],
  "91:1": [
    {
      "ar": "وَٱلشَّمْسِ",
      "im": "وَالشَّمْسِ",
      "en": "By the sun",
      "tr": "wal-shamsi"
    },
    {
      "ar": "وَضُحَىٰهَا",
      "im": "وَضُحَاهَا",
      "en": "and its brightness",
      "tr": "waḍuḥāhā"
    }
  ],
  "91:2": [
    {
      "ar": "وَٱلْقَمَرِ",
      "im": "وَالْقَمَرِ",
      "en": "And the moon",
      "tr": "wal-qamari"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "تَلَىٰهَا",
      "im": "تَلَاهَا",
      "en": "it follows it",
      "tr": "talāhā"
    }
  ],
  "91:3": [
    {
      "ar": "وَٱلنَّهَارِ",
      "im": "وَالنَّهَارِ",
      "en": "And the day",
      "tr": "wal-nahāri"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "جَلَّىٰهَا",
      "im": "جَلَّاهَا",
      "en": "it displays it",
      "tr": "jallāhā"
    }
  ],
  "91:4": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "And the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "يَغْشَىٰهَا",
      "im": "يَغْشَاهَا",
      "en": "it covers it",
      "tr": "yaghshāhā"
    }
  ],
  "91:5": [
    {
      "ar": "وَٱلسَّمَآءِ",
      "im": "وَالسَّمَاءِ",
      "en": "And the heaven",
      "tr": "wal-samāi"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and (He) Who",
      "tr": "wamā"
    },
    {
      "ar": "بَنَىٰهَا",
      "im": "بَنَاهَا",
      "en": "constructed it",
      "tr": "banāhā"
    }
  ],
  "91:6": [
    {
      "ar": "وَٱلْأَرْضِ",
      "im": "وَالْأَرْضِ",
      "en": "And the earth",
      "tr": "wal-arḍi"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and by (He) Who",
      "tr": "wamā"
    },
    {
      "ar": "طَحَىٰهَا",
      "im": "طَحَاهَا",
      "en": "spread it",
      "tr": "ṭaḥāhā"
    }
  ],
  "91:7": [
    {
      "ar": "وَنَفْسٍۢ",
      "im": "وَنَفْسٍ",
      "en": "And (the) soul",
      "tr": "wanafsin"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and (He) Who",
      "tr": "wamā"
    },
    {
      "ar": "سَوَّىٰهَا",
      "im": "سَوَّاهَا",
      "en": "proportioned it",
      "tr": "sawwāhā"
    }
  ],
  "91:8": [
    {
      "ar": "فَأَلْهَمَهَا",
      "im": "فَأَلْهَمَهَا",
      "en": "And He inspired it",
      "tr": "fa-alhamahā"
    },
    {
      "ar": "فُجُورَهَا",
      "im": "فُجُورَهَا",
      "en": "(to distinguish) its wickedness",
      "tr": "fujūrahā"
    },
    {
      "ar": "وَتَقْوَىٰهَا",
      "im": "وَتَقْوَاهَا",
      "en": "and its righteousness",
      "tr": "wataqwāhā"
    }
  ],
  "91:9": [
    {
      "ar": "قَدْ",
      "im": "قَدْ",
      "en": "Indeed",
      "tr": "qad"
    },
    {
      "ar": "أَفْلَحَ",
      "im": "أَفْلَحَ",
      "en": "he succeeds",
      "tr": "aflaḥa"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "who",
      "tr": "man"
    },
    {
      "ar": "زَكَّىٰهَا",
      "im": "زَكَّاهَا",
      "en": "purifies it",
      "tr": "zakkāhā"
    }
  ],
  "91:10": [
    {
      "ar": "وَقَدْ",
      "im": "وَقَدْ",
      "en": "And indeed",
      "tr": "waqad"
    },
    {
      "ar": "خَابَ",
      "im": "خَابَ",
      "en": "he fails",
      "tr": "khāba"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "who",
      "tr": "man"
    },
    {
      "ar": "دَسَّىٰهَا",
      "im": "دَسَّاهَا",
      "en": "buries it",
      "tr": "dassāhā"
    }
  ],
  "91:11": [
    {
      "ar": "كَذَّبَتْ",
      "im": "كَذَّبَتْ",
      "en": "Denied",
      "tr": "kadhabat"
    },
    {
      "ar": "ثَمُودُ",
      "im": "ثَمُودُ",
      "en": "Thamud",
      "tr": "thamūdu"
    },
    {
      "ar": "بِطَغْوَىٰهَآ",
      "im": "بِطَغْوَاهَا",
      "en": "by their transgression",
      "tr": "biṭaghwāhā"
    }
  ],
  "91:12": [
    {
      "ar": "إِذِ",
      "im": "إِذِ",
      "en": "When",
      "tr": "idhi"
    },
    {
      "ar": "ٱنۢبَعَثَ",
      "im": "انبَعَثَ",
      "en": "(was) sent forth",
      "tr": "inbaʿatha"
    },
    {
      "ar": "أَشْقَىٰهَا",
      "im": "أَشْقَاهَا",
      "en": "(the) most wicked of them",
      "tr": "ashqāhā"
    }
  ],
  "91:13": [
    {
      "ar": "فَقَالَ",
      "im": "فَقَالَ",
      "en": "But said",
      "tr": "faqāla"
    },
    {
      "ar": "لَهُمْ",
      "im": "لَهُمْ",
      "en": "to them",
      "tr": "lahum"
    },
    {
      "ar": "رَسُولُ",
      "im": "رَسُولُ",
      "en": "(the) Messenger",
      "tr": "rasūlu"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "نَاقَةَ",
      "im": "نَاقَةَ",
      "en": "(It is the) she-camel",
      "tr": "nāqata"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَسُقْيَـٰهَا",
      "im": "وَسُقْيَاهَا",
      "en": "and her drink",
      "tr": "wasuq'yāhā"
    }
  ],
  "91:14": [
    {
      "ar": "فَكَذَّبُوهُ",
      "im": "فَكَذَّبُوهُ",
      "en": "But they denied him",
      "tr": "fakadhabūhu"
    },
    {
      "ar": "فَعَقَرُوهَا",
      "im": "فَعَقَرُوهَا",
      "en": "and they hamstrung her",
      "tr": "faʿaqarūhā"
    },
    {
      "ar": "فَدَمْدَمَ",
      "im": "فَدَمْدَمَ",
      "en": "So destroyed",
      "tr": "fadamdama"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "رَبُّهُم",
      "im": "رَبُّهُم",
      "en": "their Lord",
      "tr": "rabbuhum"
    },
    {
      "ar": "بِذَنۢبِهِمْ",
      "im": "بِذَنبِهِمْ",
      "en": "for their sin",
      "tr": "bidhanbihim"
    },
    {
      "ar": "فَسَوَّىٰهَا",
      "im": "فَسَوَّاهَا",
      "en": "and leveled them",
      "tr": "fasawwāhā"
    }
  ],
  "91:15": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يَخَافُ",
      "im": "يَخَافُ",
      "en": "He fears",
      "tr": "yakhāfu"
    },
    {
      "ar": "عُقْبَـٰهَا",
      "im": "عُقْبَاهَا",
      "en": "its consequences",
      "tr": "ʿuq'bāhā"
    }
  ],
  "92:1": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "By the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "يَغْشَىٰ",
      "im": "يَغْشَىٰ",
      "en": "it covers",
      "tr": "yaghshā"
    }
  ],
  "92:2": [
    {
      "ar": "وَٱلنَّهَارِ",
      "im": "وَالنَّهَارِ",
      "en": "And the day",
      "tr": "wal-nahāri"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "تَجَلَّىٰ",
      "im": "تَجَلَّىٰ",
      "en": "it shines in brightness",
      "tr": "tajallā"
    }
  ],
  "92:3": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And He Who",
      "tr": "wamā"
    },
    {
      "ar": "خَلَقَ",
      "im": "خَلَقَ",
      "en": "created",
      "tr": "khalaqa"
    },
    {
      "ar": "ٱلذَّكَرَ",
      "im": "الذَّكَرَ",
      "en": "the male",
      "tr": "l-dhakara"
    },
    {
      "ar": "وَٱلْأُنثَىٰٓ",
      "im": "وَالْأُنثَىٰ",
      "en": "and the female",
      "tr": "wal-unthā"
    }
  ],
  "92:4": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "سَعْيَكُمْ",
      "im": "سَعْيَكُمْ",
      "en": "your efforts",
      "tr": "saʿyakum"
    },
    {
      "ar": "لَشَتَّىٰ",
      "im": "لَشَتَّىٰ",
      "en": "(are) surely diverse",
      "tr": "lashattā"
    }
  ],
  "92:5": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "Then as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "أَعْطَىٰ",
      "im": "أَعْطَىٰ",
      "en": "gives",
      "tr": "aʿṭā"
    },
    {
      "ar": "وَٱتَّقَىٰ",
      "im": "وَاتَّقَىٰ",
      "en": "and fears",
      "tr": "wa-ittaqā"
    }
  ],
  "92:6": [
    {
      "ar": "وَصَدَّقَ",
      "im": "وَصَدَّقَ",
      "en": "And believes",
      "tr": "waṣaddaqa"
    },
    {
      "ar": "بِٱلْحُسْنَىٰ",
      "im": "بِالْحُسْنَىٰ",
      "en": "in the best",
      "tr": "bil-ḥus'nā"
    }
  ],
  "92:7": [
    {
      "ar": "فَسَنُيَسِّرُهُۥ",
      "im": "فَسَنُيَسِّرُهُ",
      "en": "Then We will ease him",
      "tr": "fasanuyassiruhu"
    },
    {
      "ar": "لِلْيُسْرَىٰ",
      "im": "لِلْيُسْرَىٰ",
      "en": "towards [the] ease",
      "tr": "lil'yus'rā"
    }
  ],
  "92:8": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "مَنۢ",
      "im": "مَن",
      "en": "(him) who",
      "tr": "man"
    },
    {
      "ar": "بَخِلَ",
      "im": "بَخِلَ",
      "en": "withholds",
      "tr": "bakhila"
    },
    {
      "ar": "وَٱسْتَغْنَىٰ",
      "im": "وَاسْتَغْنَىٰ",
      "en": "and considers himself free from need",
      "tr": "wa-is'taghnā"
    }
  ],
  "92:9": [
    {
      "ar": "وَكَذَّبَ",
      "im": "وَكَذَّبَ",
      "en": "And denies",
      "tr": "wakadhaba"
    },
    {
      "ar": "بِٱلْحُسْنَىٰ",
      "im": "بِالْحُسْنَىٰ",
      "en": "the best",
      "tr": "bil-ḥus'nā"
    }
  ],
  "92:10": [
    {
      "ar": "فَسَنُيَسِّرُهُۥ",
      "im": "فَسَنُيَسِّرُهُ",
      "en": "Then We will ease him",
      "tr": "fasanuyassiruhu"
    },
    {
      "ar": "لِلْعُسْرَىٰ",
      "im": "لِلْعُسْرَىٰ",
      "en": "towards [the] difficulty",
      "tr": "lil'ʿus'rā"
    }
  ],
  "92:11": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يُغْنِى",
      "im": "يُغْنِي",
      "en": "will avail",
      "tr": "yugh'nī"
    },
    {
      "ar": "عَنْهُ",
      "im": "عَنْهُ",
      "en": "him",
      "tr": "ʿanhu"
    },
    {
      "ar": "مَالُهُۥٓ",
      "im": "مَالُهُ",
      "en": "his wealth",
      "tr": "māluhu"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "تَرَدَّىٰٓ",
      "im": "تَرَدَّىٰ",
      "en": "he falls",
      "tr": "taraddā"
    }
  ],
  "92:12": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "عَلَيْنَا",
      "im": "عَلَيْنَا",
      "en": "upon Us",
      "tr": "ʿalaynā"
    },
    {
      "ar": "لَلْهُدَىٰ",
      "im": "لَلْهُدَىٰ",
      "en": "(is) the guidance",
      "tr": "lalhudā"
    }
  ],
  "92:13": [
    {
      "ar": "وَإِنَّ",
      "im": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "لَنَا",
      "im": "لَنَا",
      "en": "for Us",
      "tr": "lanā"
    },
    {
      "ar": "لَلْـَٔاخِرَةَ",
      "im": "لَلْآخِرَةَ",
      "en": "(is) the Hereafter",
      "tr": "lalākhirata"
    },
    {
      "ar": "وَٱلْأُولَىٰ",
      "im": "وَالْأُولَىٰ",
      "en": "and the first (life)",
      "tr": "wal-ūlā"
    }
  ],
  "92:14": [
    {
      "ar": "فَأَنذَرْتُكُمْ",
      "im": "فَأَنذَرْتُكُمْ",
      "en": "So I warn you",
      "tr": "fa-andhartukum"
    },
    {
      "ar": "نَارًۭا",
      "im": "نَارًا",
      "en": "(of) a Fire",
      "tr": "nāran"
    },
    {
      "ar": "تَلَظَّىٰ",
      "im": "تَلَظَّىٰ",
      "en": "blazing",
      "tr": "talaẓẓā"
    }
  ],
  "92:15": [
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "يَصْلَىٰهَآ",
      "im": "يَصْلَاهَا",
      "en": "will burn (in) it",
      "tr": "yaṣlāhā"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "ٱلْأَشْقَى",
      "im": "الْأَشْقَى",
      "en": "the most wretched",
      "tr": "l-ashqā"
    }
  ],
  "92:16": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "كَذَّبَ",
      "im": "كَذَّبَ",
      "en": "denied",
      "tr": "kadhaba"
    },
    {
      "ar": "وَتَوَلَّىٰ",
      "im": "وَتَوَلَّىٰ",
      "en": "and turned away",
      "tr": "watawallā"
    }
  ],
  "92:17": [
    {
      "ar": "وَسَيُجَنَّبُهَا",
      "im": "وَسَيُجَنَّبُهَا",
      "en": "But will be removed from it",
      "tr": "wasayujannabuhā"
    },
    {
      "ar": "ٱلْأَتْقَى",
      "im": "الْأَتْقَى",
      "en": "the righteous",
      "tr": "l-atqā"
    }
  ],
  "92:18": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "يُؤْتِى",
      "im": "يُؤْتِي",
      "en": "gives",
      "tr": "yu'tī"
    },
    {
      "ar": "مَالَهُۥ",
      "im": "مَالَهُ",
      "en": "his wealth",
      "tr": "mālahu"
    },
    {
      "ar": "يَتَزَكَّىٰ",
      "im": "يَتَزَكَّىٰ",
      "en": "(to) purify himself",
      "tr": "yatazakkā"
    }
  ],
  "92:19": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "لِأَحَدٍ",
      "im": "لِأَحَدٍ",
      "en": "for anyone",
      "tr": "li-aḥadin"
    },
    {
      "ar": "عِندَهُۥ",
      "im": "عِندَهُ",
      "en": "with him",
      "tr": "ʿindahu"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "نِّعْمَةٍۢ",
      "im": "نِّعْمَةٍ",
      "en": "favor",
      "tr": "niʿ'matin"
    },
    {
      "ar": "تُجْزَىٰٓ",
      "im": "تُجْزَىٰ",
      "en": "to be recompensed",
      "tr": "tuj'zā"
    }
  ],
  "92:20": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "ٱبْتِغَآءَ",
      "im": "ابْتِغَاءَ",
      "en": "seeking",
      "tr": "ib'tighāa"
    },
    {
      "ar": "وَجْهِ",
      "im": "وَجْهِ",
      "en": "(the) Countenance",
      "tr": "wajhi"
    },
    {
      "ar": "رَبِّهِ",
      "im": "رَبِّهِ",
      "en": "(of) his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "ٱلْأَعْلَىٰ",
      "im": "الْأَعْلَىٰ",
      "en": "the Most High",
      "tr": "l-aʿlā"
    }
  ],
  "92:21": [
    {
      "ar": "وَلَسَوْفَ",
      "im": "وَلَسَوْفَ",
      "en": "And soon, surely",
      "tr": "walasawfa"
    },
    {
      "ar": "يَرْضَىٰ",
      "im": "يَرْضَىٰ",
      "en": "he will be pleased",
      "tr": "yarḍā"
    }
  ],
  "93:1": [
    {
      "ar": "وَٱلضُّحَىٰ",
      "im": "وَالضُّحَىٰ",
      "en": "By the morning brightness",
      "tr": "wal-ḍuḥā"
    }
  ],
  "93:2": [
    {
      "ar": "وَٱلَّيْلِ",
      "im": "وَاللَّيْلِ",
      "en": "And the night",
      "tr": "wa-al-layli"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "سَجَىٰ",
      "im": "سَجَىٰ",
      "en": "it covers with darkness",
      "tr": "sajā"
    }
  ],
  "93:3": [
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "Not",
      "tr": "mā"
    },
    {
      "ar": "وَدَّعَكَ",
      "im": "وَدَّعَكَ",
      "en": "has forsaken you",
      "tr": "waddaʿaka"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "قَلَىٰ",
      "im": "قَلَىٰ",
      "en": "He is displeased",
      "tr": "qalā"
    }
  ],
  "93:4": [
    {
      "ar": "وَلَلْـَٔاخِرَةُ",
      "im": "وَلَلْآخِرَةُ",
      "en": "And surely the Hereafter",
      "tr": "walalākhiratu"
    },
    {
      "ar": "خَيْرٌۭ",
      "im": "خَيْرٌ",
      "en": "(is) better",
      "tr": "khayrun"
    },
    {
      "ar": "لَّكَ",
      "im": "لَّكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "than",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأُولَىٰ",
      "im": "الْأُولَىٰ",
      "en": "the first",
      "tr": "l-ūlā"
    }
  ],
  "93:5": [
    {
      "ar": "وَلَسَوْفَ",
      "im": "وَلَسَوْفَ",
      "en": "And soon",
      "tr": "walasawfa"
    },
    {
      "ar": "يُعْطِيكَ",
      "im": "يُعْطِيكَ",
      "en": "will give you",
      "tr": "yuʿ'ṭīka"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "فَتَرْضَىٰٓ",
      "im": "فَتَرْضَىٰ",
      "en": "then you will be satisfied",
      "tr": "fatarḍā"
    }
  ],
  "93:6": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Did not",
      "tr": "alam"
    },
    {
      "ar": "يَجِدْكَ",
      "im": "يَجِدْكَ",
      "en": "He find you",
      "tr": "yajid'ka"
    },
    {
      "ar": "يَتِيمًۭا",
      "im": "يَتِيمًا",
      "en": "an orphan",
      "tr": "yatīman"
    },
    {
      "ar": "فَـَٔاوَىٰ",
      "im": "فَآوَىٰ",
      "en": "and give shelter",
      "tr": "faāwā"
    }
  ],
  "93:7": [
    {
      "ar": "وَوَجَدَكَ",
      "im": "وَوَجَدَكَ",
      "en": "And He found you",
      "tr": "wawajadaka"
    },
    {
      "ar": "ضَآلًّۭا",
      "im": "ضَالًّا",
      "en": "lost",
      "tr": "ḍāllan"
    },
    {
      "ar": "فَهَدَىٰ",
      "im": "فَهَدَىٰ",
      "en": "so He guided",
      "tr": "fahadā"
    }
  ],
  "93:8": [
    {
      "ar": "وَوَجَدَكَ",
      "im": "وَوَجَدَكَ",
      "en": "And He found you",
      "tr": "wawajadaka"
    },
    {
      "ar": "عَآئِلًۭا",
      "im": "عَائِلًا",
      "en": "in need",
      "tr": "ʿāilan"
    },
    {
      "ar": "فَأَغْنَىٰ",
      "im": "فَأَغْنَىٰ",
      "en": "so He made self-sufficient",
      "tr": "fa-aghnā"
    }
  ],
  "93:9": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "So as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "ٱلْيَتِيمَ",
      "im": "الْيَتِيمَ",
      "en": "the orphan",
      "tr": "l-yatīma"
    },
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "then (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَقْهَرْ",
      "im": "تَقْهَرْ",
      "en": "oppress",
      "tr": "taqhar"
    }
  ],
  "93:10": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "And as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "ٱلسَّآئِلَ",
      "im": "السَّائِلَ",
      "en": "one who asks",
      "tr": "l-sāila"
    },
    {
      "ar": "فَلَا",
      "im": "فَلَا",
      "en": "then (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَنْهَرْ",
      "im": "تَنْهَرْ",
      "en": "repel",
      "tr": "tanhar"
    }
  ],
  "93:11": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "بِنِعْمَةِ",
      "im": "بِنِعْمَةِ",
      "en": "(the) Favor",
      "tr": "biniʿ'mati"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "(of) your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "فَحَدِّثْ",
      "im": "فَحَدِّثْ",
      "en": "narrate",
      "tr": "faḥaddith"
    }
  ],
  "94:1": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Have not",
      "tr": "alam"
    },
    {
      "ar": "نَشْرَحْ",
      "im": "نَشْرَحْ",
      "en": "We expanded",
      "tr": "nashraḥ"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "صَدْرَكَ",
      "im": "صَدْرَكَ",
      "en": "your breast",
      "tr": "ṣadraka"
    }
  ],
  "94:2": [
    {
      "ar": "وَوَضَعْنَا",
      "im": "وَوَضَعْنَا",
      "en": "And We removed",
      "tr": "wawaḍaʿnā"
    },
    {
      "ar": "عَنكَ",
      "im": "عَنكَ",
      "en": "from you",
      "tr": "ʿanka"
    },
    {
      "ar": "وِزْرَكَ",
      "im": "وِزْرَكَ",
      "en": "your burden",
      "tr": "wiz'raka"
    }
  ],
  "94:3": [
    {
      "ar": "ٱلَّذِىٓ",
      "im": "الَّذِي",
      "en": "Which",
      "tr": "alladhī"
    },
    {
      "ar": "أَنقَضَ",
      "im": "أَنقَضَ",
      "en": "weighed upon",
      "tr": "anqaḍa"
    },
    {
      "ar": "ظَهْرَكَ",
      "im": "ظَهْرَكَ",
      "en": "your back",
      "tr": "ẓahraka"
    }
  ],
  "94:4": [
    {
      "ar": "وَرَفَعْنَا",
      "im": "وَرَفَعْنَا",
      "en": "And We raised high",
      "tr": "warafaʿnā"
    },
    {
      "ar": "لَكَ",
      "im": "لَكَ",
      "en": "for you",
      "tr": "laka"
    },
    {
      "ar": "ذِكْرَكَ",
      "im": "ذِكْرَكَ",
      "en": "your reputation",
      "tr": "dhik'raka"
    }
  ],
  "94:5": [
    {
      "ar": "فَإِنَّ",
      "im": "فَإِنَّ",
      "en": "So indeed",
      "tr": "fa-inna"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْعُسْرِ",
      "im": "الْعُسْرِ",
      "en": "the hardship",
      "tr": "l-ʿus'ri"
    },
    {
      "ar": "يُسْرًا",
      "im": "يُسْرًا",
      "en": "(is) ease",
      "tr": "yus'ran"
    }
  ],
  "94:6": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "مَعَ",
      "im": "مَعَ",
      "en": "with",
      "tr": "maʿa"
    },
    {
      "ar": "ٱلْعُسْرِ",
      "im": "الْعُسْرِ",
      "en": "the hardship",
      "tr": "l-ʿus'ri"
    },
    {
      "ar": "يُسْرًۭا",
      "im": "يُسْرًا",
      "en": "(is) ease",
      "tr": "yus'ran"
    }
  ],
  "94:7": [
    {
      "ar": "فَإِذَا",
      "im": "فَإِذَا",
      "en": "So when",
      "tr": "fa-idhā"
    },
    {
      "ar": "فَرَغْتَ",
      "im": "فَرَغْتَ",
      "en": "you have finished",
      "tr": "faraghta"
    },
    {
      "ar": "فَٱنصَبْ",
      "im": "فَانصَبْ",
      "en": "then labor hard",
      "tr": "fa-inṣab"
    }
  ],
  "94:8": [
    {
      "ar": "وَإِلَىٰ",
      "im": "وَإِلَىٰ",
      "en": "And to",
      "tr": "wa-ilā"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "فَٱرْغَب",
      "im": "فَارْغَب",
      "en": "turn your attention",
      "tr": "fa-ir'ghab"
    }
  ],
  "95:1": [
    {
      "ar": "وَٱلتِّينِ",
      "im": "وَالتِّينِ",
      "en": "By the fig",
      "tr": "wal-tīni"
    },
    {
      "ar": "وَٱلزَّيْتُونِ",
      "im": "وَالزَّيْتُونِ",
      "en": "and the olive",
      "tr": "wal-zaytūni"
    }
  ],
  "95:2": [
    {
      "ar": "وَطُورِ",
      "im": "وَطُورِ",
      "en": "And (the) Mount",
      "tr": "waṭūri"
    },
    {
      "ar": "سِينِينَ",
      "im": "سِينِينَ",
      "en": "Sinai",
      "tr": "sīnīna"
    }
  ],
  "95:3": [
    {
      "ar": "وَهَـٰذَا",
      "im": "وَهَٰذَا",
      "en": "And this",
      "tr": "wahādhā"
    },
    {
      "ar": "ٱلْبَلَدِ",
      "im": "الْبَلَدِ",
      "en": "[the] city",
      "tr": "l-baladi"
    },
    {
      "ar": "ٱلْأَمِينِ",
      "im": "الْأَمِينِ",
      "en": "[the] secure",
      "tr": "l-amīni"
    }
  ],
  "95:4": [
    {
      "ar": "لَقَدْ",
      "im": "لَقَدْ",
      "en": "Indeed",
      "tr": "laqad"
    },
    {
      "ar": "خَلَقْنَا",
      "im": "خَلَقْنَا",
      "en": "We created",
      "tr": "khalaqnā"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "man",
      "tr": "l-insāna"
    },
    {
      "ar": "فِىٓ",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "أَحْسَنِ",
      "im": "أَحْسَنِ",
      "en": "(the) best",
      "tr": "aḥsani"
    },
    {
      "ar": "تَقْوِيمٍۢ",
      "im": "تَقْوِيمٍ",
      "en": "mould",
      "tr": "taqwīmin"
    }
  ],
  "95:5": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "رَدَدْنَـٰهُ",
      "im": "رَدَدْنَاهُ",
      "en": "We returned him",
      "tr": "radadnāhu"
    },
    {
      "ar": "أَسْفَلَ",
      "im": "أَسْفَلَ",
      "en": "(to the) lowest",
      "tr": "asfala"
    },
    {
      "ar": "سَـٰفِلِينَ",
      "im": "سَافِلِينَ",
      "en": "(of the) low",
      "tr": "sāfilīna"
    }
  ],
  "95:6": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَعَمِلُوا۟",
      "im": "وَعَمِلُوا",
      "en": "and do",
      "tr": "waʿamilū"
    },
    {
      "ar": "ٱلصَّـٰلِحَـٰتِ",
      "im": "الصَّالِحَاتِ",
      "en": "righteous deeds",
      "tr": "l-ṣāliḥāti"
    },
    {
      "ar": "فَلَهُمْ",
      "im": "فَلَهُمْ",
      "en": "then for them",
      "tr": "falahum"
    },
    {
      "ar": "أَجْرٌ",
      "im": "أَجْرٌ",
      "en": "(is a) reward",
      "tr": "ajrun"
    },
    {
      "ar": "غَيْرُ",
      "im": "غَيْرُ",
      "en": "never",
      "tr": "ghayru"
    },
    {
      "ar": "مَمْنُونٍۢ",
      "im": "مَمْنُونٍ",
      "en": "ending",
      "tr": "mamnūnin"
    }
  ],
  "95:7": [
    {
      "ar": "فَمَا",
      "im": "فَمَا",
      "en": "Then what",
      "tr": "famā"
    },
    {
      "ar": "يُكَذِّبُكَ",
      "im": "يُكَذِّبُكَ",
      "en": "causes you to deny",
      "tr": "yukadhibuka"
    },
    {
      "ar": "بَعْدُ",
      "im": "بَعْدُ",
      "en": "after (this)",
      "tr": "baʿdu"
    },
    {
      "ar": "بِٱلدِّينِ",
      "im": "بِالدِّينِ",
      "en": "the judgment",
      "tr": "bil-dīni"
    }
  ],
  "95:8": [
    {
      "ar": "أَلَيْسَ",
      "im": "أَلَيْسَ",
      "en": "Is not",
      "tr": "alaysa"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "بِأَحْكَمِ",
      "im": "بِأَحْكَمِ",
      "en": "(the) Most Just",
      "tr": "bi-aḥkami"
    },
    {
      "ar": "ٱلْحَـٰكِمِينَ",
      "im": "الْحَاكِمِينَ",
      "en": "(of) the Judges",
      "tr": "l-ḥākimīna"
    }
  ],
  "96:1": [
    {
      "ar": "ٱقْرَأْ",
      "im": "اقْرَأْ",
      "en": "Read",
      "tr": "iq'ra"
    },
    {
      "ar": "بِٱسْمِ",
      "im": "بِاسْمِ",
      "en": "in (the) name",
      "tr": "bi-is'mi"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "(of) your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "خَلَقَ",
      "im": "خَلَقَ",
      "en": "created",
      "tr": "khalaqa"
    }
  ],
  "96:2": [
    {
      "ar": "خَلَقَ",
      "im": "خَلَقَ",
      "en": "He created",
      "tr": "khalaqa"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "man",
      "tr": "l-insāna"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "عَلَقٍ",
      "im": "عَلَقٍ",
      "en": "a clinging substance",
      "tr": "ʿalaqin"
    }
  ],
  "96:3": [
    {
      "ar": "ٱقْرَأْ",
      "im": "اقْرَأْ",
      "en": "Read",
      "tr": "iq'ra"
    },
    {
      "ar": "وَرَبُّكَ",
      "im": "وَرَبُّكَ",
      "en": "and your Lord",
      "tr": "warabbuka"
    },
    {
      "ar": "ٱلْأَكْرَمُ",
      "im": "الْأَكْرَمُ",
      "en": "(is) the Most Generous",
      "tr": "l-akramu"
    }
  ],
  "96:4": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "عَلَّمَ",
      "im": "عَلَّمَ",
      "en": "taught",
      "tr": "ʿallama"
    },
    {
      "ar": "بِٱلْقَلَمِ",
      "im": "بِالْقَلَمِ",
      "en": "by the pen",
      "tr": "bil-qalami"
    }
  ],
  "96:5": [
    {
      "ar": "عَلَّمَ",
      "im": "عَلَّمَ",
      "en": "Taught",
      "tr": "ʿallama"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "man",
      "tr": "l-insāna"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يَعْلَمْ",
      "im": "يَعْلَمْ",
      "en": "he knew",
      "tr": "yaʿlam"
    }
  ],
  "96:6": [
    {
      "ar": "كَلَّآ",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "man",
      "tr": "l-insāna"
    },
    {
      "ar": "لَيَطْغَىٰٓ",
      "im": "لَيَطْغَىٰ",
      "en": "surely transgresses",
      "tr": "layaṭghā"
    }
  ],
  "96:7": [
    {
      "ar": "أَن",
      "im": "أَن",
      "en": "That",
      "tr": "an"
    },
    {
      "ar": "رَّءَاهُ",
      "im": "رَّآهُ",
      "en": "he sees himself",
      "tr": "raāhu"
    },
    {
      "ar": "ٱسْتَغْنَىٰٓ",
      "im": "اسْتَغْنَىٰ",
      "en": "self-sufficient",
      "tr": "is'taghnā"
    }
  ],
  "96:8": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "إِلَىٰ",
      "im": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "ٱلرُّجْعَىٰٓ",
      "im": "الرُّجْعَىٰ",
      "en": "(is) the return",
      "tr": "l-ruj'ʿā"
    }
  ],
  "96:9": [
    {
      "ar": "أَرَءَيْتَ",
      "im": "أَرَأَيْتَ",
      "en": "Have you seen",
      "tr": "ara-ayta"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the one who",
      "tr": "alladhī"
    },
    {
      "ar": "يَنْهَىٰ",
      "im": "يَنْهَىٰ",
      "en": "forbids",
      "tr": "yanhā"
    }
  ],
  "96:10": [
    {
      "ar": "عَبْدًا",
      "im": "عَبْدًا",
      "en": "A slave",
      "tr": "ʿabdan"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "صَلَّىٰٓ",
      "im": "صَلَّىٰ",
      "en": "he prays",
      "tr": "ṣallā"
    }
  ],
  "96:11": [
    {
      "ar": "أَرَءَيْتَ",
      "im": "أَرَأَيْتَ",
      "en": "Have you seen",
      "tr": "ara-ayta"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "he is",
      "tr": "kāna"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْهُدَىٰٓ",
      "im": "الْهُدَىٰ",
      "en": "[the] guidance",
      "tr": "l-hudā"
    }
  ],
  "96:12": [
    {
      "ar": "أَوْ",
      "im": "أَوْ",
      "en": "Or",
      "tr": "aw"
    },
    {
      "ar": "أَمَرَ",
      "im": "أَمَرَ",
      "en": "he enjoins",
      "tr": "amara"
    },
    {
      "ar": "بِٱلتَّقْوَىٰٓ",
      "im": "بِالتَّقْوَىٰ",
      "en": "[of the] righteousness",
      "tr": "bil-taqwā"
    }
  ],
  "96:13": [
    {
      "ar": "أَرَءَيْتَ",
      "im": "أَرَأَيْتَ",
      "en": "Have you seen",
      "tr": "ara-ayta"
    },
    {
      "ar": "إِن",
      "im": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كَذَّبَ",
      "im": "كَذَّبَ",
      "en": "he denies",
      "tr": "kadhaba"
    },
    {
      "ar": "وَتَوَلَّىٰٓ",
      "im": "وَتَوَلَّىٰ",
      "en": "and turns away",
      "tr": "watawallā"
    }
  ],
  "96:14": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Does not",
      "tr": "alam"
    },
    {
      "ar": "يَعْلَم",
      "im": "يَعْلَم",
      "en": "he know",
      "tr": "yaʿlam"
    },
    {
      "ar": "بِأَنَّ",
      "im": "بِأَنَّ",
      "en": "that",
      "tr": "bi-anna"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "يَرَىٰ",
      "im": "يَرَىٰ",
      "en": "sees",
      "tr": "yarā"
    }
  ],
  "96:15": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "لَئِن",
      "im": "لَئِن",
      "en": "If",
      "tr": "la-in"
    },
    {
      "ar": "لَّمْ",
      "im": "لَّمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "يَنتَهِ",
      "im": "يَنتَهِ",
      "en": "he desists",
      "tr": "yantahi"
    },
    {
      "ar": "لَنَسْفَعًۢا",
      "im": "لَنَسْفَعًا",
      "en": "surely We will drag him",
      "tr": "lanasfaʿan"
    },
    {
      "ar": "بِٱلنَّاصِيَةِ",
      "im": "بِالنَّاصِيَةِ",
      "en": "by the forelock",
      "tr": "bil-nāṣiyati"
    }
  ],
  "96:16": [
    {
      "ar": "نَاصِيَةٍۢ",
      "im": "نَاصِيَةٍ",
      "en": "A forelock",
      "tr": "nāṣiyatin"
    },
    {
      "ar": "كَـٰذِبَةٍ",
      "im": "كَاذِبَةٍ",
      "en": "lying",
      "tr": "kādhibatin"
    },
    {
      "ar": "خَاطِئَةٍۢ",
      "im": "خَاطِئَةٍ",
      "en": "sinful",
      "tr": "khāṭi-atin"
    }
  ],
  "96:17": [
    {
      "ar": "فَلْيَدْعُ",
      "im": "فَلْيَدْعُ",
      "en": "Then let him call",
      "tr": "falyadʿu"
    },
    {
      "ar": "نَادِيَهُۥ",
      "im": "نَادِيَهُ",
      "en": "his associates",
      "tr": "nādiyahu"
    }
  ],
  "96:18": [
    {
      "ar": "سَنَدْعُ",
      "im": "سَنَدْعُ",
      "en": "We will call",
      "tr": "sanadʿu"
    },
    {
      "ar": "ٱلزَّبَانِيَةَ",
      "im": "الزَّبَانِيَةَ",
      "en": "the Angels of Hell",
      "tr": "l-zabāniyata"
    }
  ],
  "96:19": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "لَا",
      "im": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تُطِعْهُ",
      "im": "تُطِعْهُ",
      "en": "obey him",
      "tr": "tuṭiʿ'hu"
    },
    {
      "ar": "وَٱسْجُدْ",
      "im": "وَاسْجُدْ",
      "en": "But prostrate",
      "tr": "wa-us'jud"
    },
    {
      "ar": "وَٱقْتَرِب ۩",
      "im": "وَاقْتَرِب ۩",
      "en": "and draw near (to Allah)",
      "tr": "wa-iq'tarib"
    }
  ],
  "97:1": [
    {
      "ar": "إِنَّآ",
      "im": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "أَنزَلْنَـٰهُ",
      "im": "أَنزَلْنَاهُ",
      "en": "revealed it",
      "tr": "anzalnāhu"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "لَيْلَةِ",
      "im": "لَيْلَةِ",
      "en": "(the) Night",
      "tr": "laylati"
    },
    {
      "ar": "ٱلْقَدْرِ",
      "im": "الْقَدْرِ",
      "en": "(of) Power",
      "tr": "l-qadri"
    }
  ],
  "97:2": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "can make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "لَيْلَةُ",
      "im": "لَيْلَةُ",
      "en": "(the) Night",
      "tr": "laylatu"
    },
    {
      "ar": "ٱلْقَدْرِ",
      "im": "الْقَدْرِ",
      "en": "(of) Power (is)",
      "tr": "l-qadri"
    }
  ],
  "97:3": [
    {
      "ar": "لَيْلَةُ",
      "im": "لَيْلَةُ",
      "en": "(The) Night",
      "tr": "laylatu"
    },
    {
      "ar": "ٱلْقَدْرِ",
      "im": "الْقَدْرِ",
      "en": "(of) Power",
      "tr": "l-qadri"
    },
    {
      "ar": "خَيْرٌۭ",
      "im": "خَيْرٌ",
      "en": "(is) better",
      "tr": "khayrun"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "than",
      "tr": "min"
    },
    {
      "ar": "أَلْفِ",
      "im": "أَلْفِ",
      "en": "a thousand",
      "tr": "alfi"
    },
    {
      "ar": "شَهْرٍۢ",
      "im": "شَهْرٍ",
      "en": "month(s)",
      "tr": "shahrin"
    }
  ],
  "97:4": [
    {
      "ar": "تَنَزَّلُ",
      "im": "تَنَزَّلُ",
      "en": "Descend",
      "tr": "tanazzalu"
    },
    {
      "ar": "ٱلْمَلَـٰٓئِكَةُ",
      "im": "الْمَلَائِكَةُ",
      "en": "the Angels",
      "tr": "l-malāikatu"
    },
    {
      "ar": "وَٱلرُّوحُ",
      "im": "وَالرُّوحُ",
      "en": "and the Spirit",
      "tr": "wal-rūḥu"
    },
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "بِإِذْنِ",
      "im": "بِإِذْنِ",
      "en": "by (the) permission",
      "tr": "bi-idh'ni"
    },
    {
      "ar": "رَبِّهِم",
      "im": "رَبِّهِم",
      "en": "(of) their Lord",
      "tr": "rabbihim"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "for",
      "tr": "min"
    },
    {
      "ar": "كُلِّ",
      "im": "كُلِّ",
      "en": "every",
      "tr": "kulli"
    },
    {
      "ar": "أَمْرٍۢ",
      "im": "أَمْرٍ",
      "en": "affair",
      "tr": "amrin"
    }
  ],
  "97:5": [
    {
      "ar": "سَلَـٰمٌ",
      "im": "سَلَامٌ",
      "en": "Peace",
      "tr": "salāmun"
    },
    {
      "ar": "هِىَ",
      "im": "هِيَ",
      "en": "it (is)",
      "tr": "hiya"
    },
    {
      "ar": "حَتَّىٰ",
      "im": "حَتَّىٰ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "مَطْلَعِ",
      "im": "مَطْلَعِ",
      "en": "(the) emergence",
      "tr": "maṭlaʿi"
    },
    {
      "ar": "ٱلْفَجْرِ",
      "im": "الْفَجْرِ",
      "en": "(of) the dawn",
      "tr": "l-fajri"
    }
  ],
  "98:1": [
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "Not",
      "tr": "lam"
    },
    {
      "ar": "يَكُنِ",
      "im": "يَكُنِ",
      "en": "were",
      "tr": "yakuni"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieved",
      "tr": "kafarū"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَهْلِ",
      "im": "أَهْلِ",
      "en": "(the) People",
      "tr": "ahli"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "im": "الْكِتَابِ",
      "en": "of the Book",
      "tr": "l-kitābi"
    },
    {
      "ar": "وَٱلْمُشْرِكِينَ",
      "im": "وَالْمُشْرِكِينَ",
      "en": "and the polytheists",
      "tr": "wal-mush'rikīna"
    },
    {
      "ar": "مُنفَكِّينَ",
      "im": "مُنفَكِّينَ",
      "en": "to be abandoned",
      "tr": "munfakkīna"
    },
    {
      "ar": "حَتَّىٰ",
      "im": "حَتَّىٰ",
      "en": "until",
      "tr": "ḥattā"
    },
    {
      "ar": "تَأْتِيَهُمُ",
      "im": "تَأْتِيَهُمُ",
      "en": "(there) comes to them",
      "tr": "tatiyahumu"
    },
    {
      "ar": "ٱلْبَيِّنَةُ",
      "im": "الْبَيِّنَةُ",
      "en": "the clear evidence",
      "tr": "l-bayinatu"
    }
  ],
  "98:2": [
    {
      "ar": "رَسُولٌۭ",
      "im": "رَسُولٌ",
      "en": "A Messenger",
      "tr": "rasūlun"
    },
    {
      "ar": "مِّنَ",
      "im": "مِّنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "يَتْلُوا۟",
      "im": "يَتْلُو",
      "en": "reciting",
      "tr": "yatlū"
    },
    {
      "ar": "صُحُفًۭا",
      "im": "صُحُفًا",
      "en": "pages",
      "tr": "ṣuḥufan"
    },
    {
      "ar": "مُّطَهَّرَةًۭ",
      "im": "مُّطَهَّرَةً",
      "en": "purified",
      "tr": "muṭahharatan"
    }
  ],
  "98:3": [
    {
      "ar": "فِيهَا",
      "im": "فِيهَا",
      "en": "Wherein",
      "tr": "fīhā"
    },
    {
      "ar": "كُتُبٌۭ",
      "im": "كُتُبٌ",
      "en": "(are) writings",
      "tr": "kutubun"
    },
    {
      "ar": "قَيِّمَةٌۭ",
      "im": "قَيِّمَةٌ",
      "en": "correct",
      "tr": "qayyimatun"
    }
  ],
  "98:4": [
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَفَرَّقَ",
      "im": "تَفَرَّقَ",
      "en": "became divided",
      "tr": "tafarraqa"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "أُوتُوا۟",
      "im": "أُوتُوا",
      "en": "were given",
      "tr": "ūtū"
    },
    {
      "ar": "ٱلْكِتَـٰبَ",
      "im": "الْكِتَابَ",
      "en": "the Book",
      "tr": "l-kitāba"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "until",
      "tr": "illā"
    },
    {
      "ar": "مِنۢ",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَعْدِ",
      "im": "بَعْدِ",
      "en": "after",
      "tr": "baʿdi"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "جَآءَتْهُمُ",
      "im": "جَاءَتْهُمُ",
      "en": "came (to) them",
      "tr": "jāathumu"
    },
    {
      "ar": "ٱلْبَيِّنَةُ",
      "im": "الْبَيِّنَةُ",
      "en": "(of) the clear evidence",
      "tr": "l-bayinatu"
    }
  ],
  "98:5": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أُمِرُوٓا۟",
      "im": "أُمِرُوا",
      "en": "they were commanded",
      "tr": "umirū"
    },
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "لِيَعْبُدُوا۟",
      "im": "لِيَعْبُدُوا",
      "en": "to worship",
      "tr": "liyaʿbudū"
    },
    {
      "ar": "ٱللَّهَ",
      "im": "اللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "مُخْلِصِينَ",
      "im": "مُخْلِصِينَ",
      "en": "(being) sincere",
      "tr": "mukh'liṣīna"
    },
    {
      "ar": "لَهُ",
      "im": "لَهُ",
      "en": "to Him",
      "tr": "lahu"
    },
    {
      "ar": "ٱلدِّينَ",
      "im": "الدِّينَ",
      "en": "(in) the religion",
      "tr": "l-dīna"
    },
    {
      "ar": "حُنَفَآءَ",
      "im": "حُنَفَاءَ",
      "en": "upright",
      "tr": "ḥunafāa"
    },
    {
      "ar": "وَيُقِيمُوا۟",
      "im": "وَيُقِيمُوا",
      "en": "and to establish",
      "tr": "wayuqīmū"
    },
    {
      "ar": "ٱلصَّلَوٰةَ",
      "im": "الصَّلَاةَ",
      "en": "the prayer",
      "tr": "l-ṣalata"
    },
    {
      "ar": "وَيُؤْتُوا۟",
      "im": "وَيُؤْتُوا",
      "en": "and to give",
      "tr": "wayu'tū"
    },
    {
      "ar": "ٱلزَّكَوٰةَ ۚ",
      "im": "الزَّكَاةَ ۚ",
      "en": "the zakah",
      "tr": "l-zakata"
    },
    {
      "ar": "وَذَٰلِكَ",
      "im": "وَذَٰلِكَ",
      "en": "And that",
      "tr": "wadhālika"
    },
    {
      "ar": "دِينُ",
      "im": "دِينُ",
      "en": "(is the) religion",
      "tr": "dīnu"
    },
    {
      "ar": "ٱلْقَيِّمَةِ",
      "im": "الْقَيِّمَةِ",
      "en": "the correct",
      "tr": "l-qayimati"
    }
  ],
  "98:6": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "im": "كَفَرُوا",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "مِنْ",
      "im": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَهْلِ",
      "im": "أَهْلِ",
      "en": "(the) People",
      "tr": "ahli"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "im": "الْكِتَابِ",
      "en": "(of) the Book",
      "tr": "l-kitābi"
    },
    {
      "ar": "وَٱلْمُشْرِكِينَ",
      "im": "وَالْمُشْرِكِينَ",
      "en": "and the polytheists",
      "tr": "wal-mush'rikīna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(will be) in",
      "tr": "fī"
    },
    {
      "ar": "نَارِ",
      "im": "نَارِ",
      "en": "(the) Fire",
      "tr": "nāri"
    },
    {
      "ar": "جَهَنَّمَ",
      "im": "جَهَنَّمَ",
      "en": "(of) Hell",
      "tr": "jahannama"
    },
    {
      "ar": "خَـٰلِدِينَ",
      "im": "خَالِدِينَ",
      "en": "abiding eternally",
      "tr": "khālidīna"
    },
    {
      "ar": "فِيهَآ ۚ",
      "im": "فِيهَا ۚ",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "أُو۟لَـٰٓئِكَ",
      "im": "أُولَٰئِكَ",
      "en": "Those",
      "tr": "ulāika"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "شَرُّ",
      "im": "شَرُّ",
      "en": "(are the) worst",
      "tr": "sharru"
    },
    {
      "ar": "ٱلْبَرِيَّةِ",
      "im": "الْبَرِيَّةِ",
      "en": "(of) the creatures",
      "tr": "l-bariyati"
    }
  ],
  "98:7": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَعَمِلُوا۟",
      "im": "وَعَمِلُوا",
      "en": "and do",
      "tr": "waʿamilū"
    },
    {
      "ar": "ٱلصَّـٰلِحَـٰتِ",
      "im": "الصَّالِحَاتِ",
      "en": "righteous deeds",
      "tr": "l-ṣāliḥāti"
    },
    {
      "ar": "أُو۟لَـٰٓئِكَ",
      "im": "أُولَٰئِكَ",
      "en": "those",
      "tr": "ulāika"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "they",
      "tr": "hum"
    },
    {
      "ar": "خَيْرُ",
      "im": "خَيْرُ",
      "en": "(are the) best",
      "tr": "khayru"
    },
    {
      "ar": "ٱلْبَرِيَّةِ",
      "im": "الْبَرِيَّةِ",
      "en": "(of) the creatures",
      "tr": "l-bariyati"
    }
  ],
  "98:8": [
    {
      "ar": "جَزَآؤُهُمْ",
      "im": "جَزَاؤُهُمْ",
      "en": "Their reward",
      "tr": "jazāuhum"
    },
    {
      "ar": "عِندَ",
      "im": "عِندَ",
      "en": "(is) with",
      "tr": "ʿinda"
    },
    {
      "ar": "رَبِّهِمْ",
      "im": "رَبِّهِمْ",
      "en": "their Lord",
      "tr": "rabbihim"
    },
    {
      "ar": "جَنَّـٰتُ",
      "im": "جَنَّاتُ",
      "en": "Gardens",
      "tr": "jannātu"
    },
    {
      "ar": "عَدْنٍۢ",
      "im": "عَدْنٍ",
      "en": "(of) Eternity",
      "tr": "ʿadnin"
    },
    {
      "ar": "تَجْرِى",
      "im": "تَجْرِي",
      "en": "flow",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهَا",
      "im": "تَحْتِهَا",
      "en": "underneath them",
      "tr": "taḥtihā"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ",
      "im": "الْأَنْهَارُ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "خَـٰلِدِينَ",
      "im": "خَالِدِينَ",
      "en": "will abide",
      "tr": "khālidīna"
    },
    {
      "ar": "فِيهَآ",
      "im": "فِيهَا",
      "en": "therein",
      "tr": "fīhā"
    },
    {
      "ar": "أَبَدًۭا ۖ",
      "im": "أَبَدًا ۖ",
      "en": "forever",
      "tr": "abadan"
    },
    {
      "ar": "رَّضِىَ",
      "im": "رَّضِيَ",
      "en": "(will be) pleased",
      "tr": "raḍiya"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "عَنْهُمْ",
      "im": "عَنْهُمْ",
      "en": "with them",
      "tr": "ʿanhum"
    },
    {
      "ar": "وَرَضُوا۟",
      "im": "وَرَضُوا",
      "en": "and they (will be) pleased",
      "tr": "waraḍū"
    },
    {
      "ar": "عَنْهُ ۚ",
      "im": "عَنْهُ ۚ",
      "en": "with Him",
      "tr": "ʿanhu"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "That",
      "tr": "dhālika"
    },
    {
      "ar": "لِمَنْ",
      "im": "لِمَنْ",
      "en": "(is) for whoever",
      "tr": "liman"
    },
    {
      "ar": "خَشِىَ",
      "im": "خَشِيَ",
      "en": "feared",
      "tr": "khashiya"
    },
    {
      "ar": "رَبَّهُۥ",
      "im": "رَبَّهُ",
      "en": "his Lord",
      "tr": "rabbahu"
    }
  ],
  "99:1": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "زُلْزِلَتِ",
      "im": "زُلْزِلَتِ",
      "en": "is shaken",
      "tr": "zul'zilati"
    },
    {
      "ar": "ٱلْأَرْضُ",
      "im": "الْأَرْضُ",
      "en": "the earth",
      "tr": "l-arḍu"
    },
    {
      "ar": "زِلْزَالَهَا",
      "im": "زِلْزَالَهَا",
      "en": "(with) its earthquake",
      "tr": "zil'zālahā"
    }
  ],
  "99:2": [
    {
      "ar": "وَأَخْرَجَتِ",
      "im": "وَأَخْرَجَتِ",
      "en": "And brings forth",
      "tr": "wa-akhrajati"
    },
    {
      "ar": "ٱلْأَرْضُ",
      "im": "الْأَرْضُ",
      "en": "the earth",
      "tr": "l-arḍu"
    },
    {
      "ar": "أَثْقَالَهَا",
      "im": "أَثْقَالَهَا",
      "en": "its burdens",
      "tr": "athqālahā"
    }
  ],
  "99:3": [
    {
      "ar": "وَقَالَ",
      "im": "وَقَالَ",
      "en": "And says",
      "tr": "waqāla"
    },
    {
      "ar": "ٱلْإِنسَـٰنُ",
      "im": "الْإِنسَانُ",
      "en": "man",
      "tr": "l-insānu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "What",
      "tr": "mā"
    },
    {
      "ar": "لَهَا",
      "im": "لَهَا",
      "en": "(is) with it",
      "tr": "lahā"
    }
  ],
  "99:4": [
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "That Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "تُحَدِّثُ",
      "im": "تُحَدِّثُ",
      "en": "it will report",
      "tr": "tuḥaddithu"
    },
    {
      "ar": "أَخْبَارَهَا",
      "im": "أَخْبَارَهَا",
      "en": "its news",
      "tr": "akhbārahā"
    }
  ],
  "99:5": [
    {
      "ar": "بِأَنَّ",
      "im": "بِأَنَّ",
      "en": "Because",
      "tr": "bi-anna"
    },
    {
      "ar": "رَبَّكَ",
      "im": "رَبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "أَوْحَىٰ",
      "im": "أَوْحَىٰ",
      "en": "inspired",
      "tr": "awḥā"
    },
    {
      "ar": "لَهَا",
      "im": "لَهَا",
      "en": "[to] it",
      "tr": "lahā"
    }
  ],
  "99:6": [
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "That Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "يَصْدُرُ",
      "im": "يَصْدُرُ",
      "en": "will proceed",
      "tr": "yaṣduru"
    },
    {
      "ar": "ٱلنَّاسُ",
      "im": "النَّاسُ",
      "en": "the mankind",
      "tr": "l-nāsu"
    },
    {
      "ar": "أَشْتَاتًۭا",
      "im": "أَشْتَاتًا",
      "en": "(in) scattered groups",
      "tr": "ashtātan"
    },
    {
      "ar": "لِّيُرَوْا۟",
      "im": "لِّيُرَوْا",
      "en": "to be shown",
      "tr": "liyuraw"
    },
    {
      "ar": "أَعْمَـٰلَهُمْ",
      "im": "أَعْمَالَهُمْ",
      "en": "their deeds",
      "tr": "aʿmālahum"
    }
  ],
  "99:7": [
    {
      "ar": "فَمَن",
      "im": "فَمَن",
      "en": "So whoever",
      "tr": "faman"
    },
    {
      "ar": "يَعْمَلْ",
      "im": "يَعْمَلْ",
      "en": "does",
      "tr": "yaʿmal"
    },
    {
      "ar": "مِثْقَالَ",
      "im": "مِثْقَالَ",
      "en": "(equal to the) weight",
      "tr": "mith'qāla"
    },
    {
      "ar": "ذَرَّةٍ",
      "im": "ذَرَّةٍ",
      "en": "(of) an atom",
      "tr": "dharratin"
    },
    {
      "ar": "خَيْرًۭا",
      "im": "خَيْرًا",
      "en": "good",
      "tr": "khayran"
    },
    {
      "ar": "يَرَهُۥ",
      "im": "يَرَهُ",
      "en": "will see it",
      "tr": "yarahu"
    }
  ],
  "99:8": [
    {
      "ar": "وَمَن",
      "im": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "يَعْمَلْ",
      "im": "يَعْمَلْ",
      "en": "does",
      "tr": "yaʿmal"
    },
    {
      "ar": "مِثْقَالَ",
      "im": "مِثْقَالَ",
      "en": "(equal to the) weight",
      "tr": "mith'qāla"
    },
    {
      "ar": "ذَرَّةٍۢ",
      "im": "ذَرَّةٍ",
      "en": "(of) an atom",
      "tr": "dharratin"
    },
    {
      "ar": "شَرًّۭا",
      "im": "شَرًّا",
      "en": "evil",
      "tr": "sharran"
    },
    {
      "ar": "يَرَهُۥ",
      "im": "يَرَهُ",
      "en": "will see it",
      "tr": "yarahu"
    }
  ],
  "100:1": [
    {
      "ar": "وَٱلْعَـٰدِيَـٰتِ",
      "im": "وَالْعَادِيَاتِ",
      "en": "By the racers",
      "tr": "wal-ʿādiyāti"
    },
    {
      "ar": "ضَبْحًۭا",
      "im": "ضَبْحًا",
      "en": "panting",
      "tr": "ḍabḥan"
    }
  ],
  "100:2": [
    {
      "ar": "فَٱلْمُورِيَـٰتِ",
      "im": "فَالْمُورِيَاتِ",
      "en": "And the producers of sparks",
      "tr": "fal-mūriyāti"
    },
    {
      "ar": "قَدْحًۭا",
      "im": "قَدْحًا",
      "en": "striking",
      "tr": "qadḥan"
    }
  ],
  "100:3": [
    {
      "ar": "فَٱلْمُغِيرَٰتِ",
      "im": "فَالْمُغِيرَاتِ",
      "en": "And the chargers",
      "tr": "fal-mughīrāti"
    },
    {
      "ar": "صُبْحًۭا",
      "im": "صُبْحًا",
      "en": "(at) dawn",
      "tr": "ṣub'ḥan"
    }
  ],
  "100:4": [
    {
      "ar": "فَأَثَرْنَ",
      "im": "فَأَثَرْنَ",
      "en": "Then raise",
      "tr": "fa-atharna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "thereby",
      "tr": "bihi"
    },
    {
      "ar": "نَقْعًۭا",
      "im": "نَقْعًا",
      "en": "dust",
      "tr": "naqʿan"
    }
  ],
  "100:5": [
    {
      "ar": "فَوَسَطْنَ",
      "im": "فَوَسَطْنَ",
      "en": "Then penetrate (in the) center",
      "tr": "fawasaṭna"
    },
    {
      "ar": "بِهِۦ",
      "im": "بِهِ",
      "en": "thereby",
      "tr": "bihi"
    },
    {
      "ar": "جَمْعًا",
      "im": "جَمْعًا",
      "en": "collectively",
      "tr": "jamʿan"
    }
  ],
  "100:6": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "mankind",
      "tr": "l-insāna"
    },
    {
      "ar": "لِرَبِّهِۦ",
      "im": "لِرَبِّهِ",
      "en": "to his Lord",
      "tr": "lirabbihi"
    },
    {
      "ar": "لَكَنُودٌۭ",
      "im": "لَكَنُودٌ",
      "en": "(is) surely ungrateful",
      "tr": "lakanūdun"
    }
  ],
  "100:7": [
    {
      "ar": "وَإِنَّهُۥ",
      "im": "وَإِنَّهُ",
      "en": "And indeed, he",
      "tr": "wa-innahu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "ذَٰلِكَ",
      "im": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "لَشَهِيدٌۭ",
      "im": "لَشَهِيدٌ",
      "en": "surely (is) a witness",
      "tr": "lashahīdun"
    }
  ],
  "100:8": [
    {
      "ar": "وَإِنَّهُۥ",
      "im": "وَإِنَّهُ",
      "en": "And indeed he",
      "tr": "wa-innahu"
    },
    {
      "ar": "لِحُبِّ",
      "im": "لِحُبِّ",
      "en": "in (the) love",
      "tr": "liḥubbi"
    },
    {
      "ar": "ٱلْخَيْرِ",
      "im": "الْخَيْرِ",
      "en": "(of) wealth",
      "tr": "l-khayri"
    },
    {
      "ar": "لَشَدِيدٌ",
      "im": "لَشَدِيدٌ",
      "en": "(is) surely intense",
      "tr": "lashadīdun"
    }
  ],
  "100:9": [
    {
      "ar": "۞ أَفَلَا",
      "im": "۞ أَفَلَا",
      "en": "But does not",
      "tr": "afalā"
    },
    {
      "ar": "يَعْلَمُ",
      "im": "يَعْلَمُ",
      "en": "he know",
      "tr": "yaʿlamu"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "بُعْثِرَ",
      "im": "بُعْثِرَ",
      "en": "will be scattered",
      "tr": "buʿ'thira"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْقُبُورِ",
      "im": "الْقُبُورِ",
      "en": "the graves",
      "tr": "l-qubūri"
    }
  ],
  "100:10": [
    {
      "ar": "وَحُصِّلَ",
      "im": "وَحُصِّلَ",
      "en": "And is made apparent",
      "tr": "waḥuṣṣila"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلصُّدُورِ",
      "im": "الصُّدُورِ",
      "en": "the breasts",
      "tr": "l-ṣudūri"
    }
  ],
  "100:11": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "رَبَّهُم",
      "im": "رَبَّهُم",
      "en": "their Lord",
      "tr": "rabbahum"
    },
    {
      "ar": "بِهِمْ",
      "im": "بِهِمْ",
      "en": "about them",
      "tr": "bihim"
    },
    {
      "ar": "يَوْمَئِذٍۢ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "لَّخَبِيرٌۢ",
      "im": "لَّخَبِيرٌ",
      "en": "(is) surely All-Aware",
      "tr": "lakhabīrun"
    }
  ],
  "101:1": [
    {
      "ar": "ٱلْقَارِعَةُ",
      "im": "الْقَارِعَةُ",
      "en": "The Striking Calamity",
      "tr": "al-qāriʿatu"
    }
  ],
  "101:2": [
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "What",
      "tr": "mā"
    },
    {
      "ar": "ٱلْقَارِعَةُ",
      "im": "الْقَارِعَةُ",
      "en": "(is) the Striking Calamity",
      "tr": "l-qāriʿatu"
    }
  ],
  "101:3": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "will make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱلْقَارِعَةُ",
      "im": "الْقَارِعَةُ",
      "en": "(is) the Striking Calamity",
      "tr": "l-qāriʿatu"
    }
  ],
  "101:4": [
    {
      "ar": "يَوْمَ",
      "im": "يَوْمَ",
      "en": "(The) Day",
      "tr": "yawma"
    },
    {
      "ar": "يَكُونُ",
      "im": "يَكُونُ",
      "en": "will be",
      "tr": "yakūnu"
    },
    {
      "ar": "ٱلنَّاسُ",
      "im": "النَّاسُ",
      "en": "the mankind",
      "tr": "l-nāsu"
    },
    {
      "ar": "كَٱلْفَرَاشِ",
      "im": "كَالْفَرَاشِ",
      "en": "like moths",
      "tr": "kal-farāshi"
    },
    {
      "ar": "ٱلْمَبْثُوثِ",
      "im": "الْمَبْثُوثِ",
      "en": "scattered",
      "tr": "l-mabthūthi"
    }
  ],
  "101:5": [
    {
      "ar": "وَتَكُونُ",
      "im": "وَتَكُونُ",
      "en": "And will be",
      "tr": "watakūnu"
    },
    {
      "ar": "ٱلْجِبَالُ",
      "im": "الْجِبَالُ",
      "en": "the mountains",
      "tr": "l-jibālu"
    },
    {
      "ar": "كَٱلْعِهْنِ",
      "im": "كَالْعِهْنِ",
      "en": "like wool",
      "tr": "kal-ʿih'ni"
    },
    {
      "ar": "ٱلْمَنفُوشِ",
      "im": "الْمَنفُوشِ",
      "en": "fluffed up",
      "tr": "l-manfūshi"
    }
  ],
  "101:6": [
    {
      "ar": "فَأَمَّا",
      "im": "فَأَمَّا",
      "en": "Then as for",
      "tr": "fa-ammā"
    },
    {
      "ar": "مَن",
      "im": "مَن",
      "en": "(him) whose",
      "tr": "man"
    },
    {
      "ar": "ثَقُلَتْ",
      "im": "ثَقُلَتْ",
      "en": "(are) heavy",
      "tr": "thaqulat"
    },
    {
      "ar": "مَوَٰزِينُهُۥ",
      "im": "مَوَازِينُهُ",
      "en": "his scales",
      "tr": "mawāzīnuhu"
    }
  ],
  "101:7": [
    {
      "ar": "فَهُوَ",
      "im": "فَهُوَ",
      "en": "Then he",
      "tr": "fahuwa"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "(will be) in",
      "tr": "fī"
    },
    {
      "ar": "عِيشَةٍۢ",
      "im": "عِيشَةٍ",
      "en": "a life",
      "tr": "ʿīshatin"
    },
    {
      "ar": "رَّاضِيَةٍۢ",
      "im": "رَّاضِيَةٍ",
      "en": "pleasant",
      "tr": "rāḍiyatin"
    }
  ],
  "101:8": [
    {
      "ar": "وَأَمَّا",
      "im": "وَأَمَّا",
      "en": "But as for",
      "tr": "wa-ammā"
    },
    {
      "ar": "مَنْ",
      "im": "مَنْ",
      "en": "(him) whose",
      "tr": "man"
    },
    {
      "ar": "خَفَّتْ",
      "im": "خَفَّتْ",
      "en": "(are) light",
      "tr": "khaffat"
    },
    {
      "ar": "مَوَٰزِينُهُۥ",
      "im": "مَوَازِينُهُ",
      "en": "his scales",
      "tr": "mawāzīnuhu"
    }
  ],
  "101:9": [
    {
      "ar": "فَأُمُّهُۥ",
      "im": "فَأُمُّهُ",
      "en": "His abode",
      "tr": "fa-ummuhu"
    },
    {
      "ar": "هَاوِيَةٌۭ",
      "im": "هَاوِيَةٌ",
      "en": "(will be the) Pit",
      "tr": "hāwiyatun"
    }
  ],
  "101:10": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "will make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "هِيَهْ",
      "im": "هِيَهْ",
      "en": "it is",
      "tr": "hiyah"
    }
  ],
  "101:11": [
    {
      "ar": "نَارٌ",
      "im": "نَارٌ",
      "en": "A Fire",
      "tr": "nārun"
    },
    {
      "ar": "حَامِيَةٌۢ",
      "im": "حَامِيَةٌ",
      "en": "intensely hot",
      "tr": "ḥāmiyatun"
    }
  ],
  "102:1": [
    {
      "ar": "أَلْهَىٰكُمُ",
      "im": "أَلْهَاكُمُ",
      "en": "Diverts you",
      "tr": "alhākumu"
    },
    {
      "ar": "ٱلتَّكَاثُرُ",
      "im": "التَّكَاثُرُ",
      "en": "the competition to increase",
      "tr": "l-takāthuru"
    }
  ],
  "102:2": [
    {
      "ar": "حَتَّىٰ",
      "im": "حَتَّىٰ",
      "en": "Until",
      "tr": "ḥattā"
    },
    {
      "ar": "زُرْتُمُ",
      "im": "زُرْتُمُ",
      "en": "you visit",
      "tr": "zur'tumu"
    },
    {
      "ar": "ٱلْمَقَابِرَ",
      "im": "الْمَقَابِرَ",
      "en": "the graves",
      "tr": "l-maqābira"
    }
  ],
  "102:3": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "سَوْفَ",
      "im": "سَوْفَ",
      "en": "Soon",
      "tr": "sawfa"
    },
    {
      "ar": "تَعْلَمُونَ",
      "im": "تَعْلَمُونَ",
      "en": "you will know",
      "tr": "taʿlamūna"
    }
  ],
  "102:4": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "nay",
      "tr": "kallā"
    },
    {
      "ar": "سَوْفَ",
      "im": "سَوْفَ",
      "en": "Soon",
      "tr": "sawfa"
    },
    {
      "ar": "تَعْلَمُونَ",
      "im": "تَعْلَمُونَ",
      "en": "you will know",
      "tr": "taʿlamūna"
    }
  ],
  "102:5": [
    {
      "ar": "كَلَّا",
      "im": "كَلَّا",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "لَوْ",
      "im": "لَوْ",
      "en": "If",
      "tr": "law"
    },
    {
      "ar": "تَعْلَمُونَ",
      "im": "تَعْلَمُونَ",
      "en": "you know",
      "tr": "taʿlamūna"
    },
    {
      "ar": "عِلْمَ",
      "im": "عِلْمَ",
      "en": "(with) a knowledge",
      "tr": "ʿil'ma"
    },
    {
      "ar": "ٱلْيَقِينِ",
      "im": "الْيَقِينِ",
      "en": "(of) certainty",
      "tr": "l-yaqīni"
    }
  ],
  "102:6": [
    {
      "ar": "لَتَرَوُنَّ",
      "im": "لَتَرَوُنَّ",
      "en": "Surely you will see",
      "tr": "latarawunna"
    },
    {
      "ar": "ٱلْجَحِيمَ",
      "im": "الْجَحِيمَ",
      "en": "the Hellfire",
      "tr": "l-jaḥīma"
    }
  ],
  "102:7": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "لَتَرَوُنَّهَا",
      "im": "لَتَرَوُنَّهَا",
      "en": "surely you will see it",
      "tr": "latarawunnahā"
    },
    {
      "ar": "عَيْنَ",
      "im": "عَيْنَ",
      "en": "(with the) eye",
      "tr": "ʿayna"
    },
    {
      "ar": "ٱلْيَقِينِ",
      "im": "الْيَقِينِ",
      "en": "(of) certainty",
      "tr": "l-yaqīni"
    }
  ],
  "102:8": [
    {
      "ar": "ثُمَّ",
      "im": "ثُمَّ",
      "en": "Then",
      "tr": "thumma"
    },
    {
      "ar": "لَتُسْـَٔلُنَّ",
      "im": "لَتُسْأَلُنَّ",
      "en": "surely you will be asked",
      "tr": "latus'alunna"
    },
    {
      "ar": "يَوْمَئِذٍ",
      "im": "يَوْمَئِذٍ",
      "en": "that Day",
      "tr": "yawma-idhin"
    },
    {
      "ar": "عَنِ",
      "im": "عَنِ",
      "en": "about",
      "tr": "ʿani"
    },
    {
      "ar": "ٱلنَّعِيمِ",
      "im": "النَّعِيمِ",
      "en": "the pleasures",
      "tr": "l-naʿīmi"
    }
  ],
  "103:1": [
    {
      "ar": "وَٱلْعَصْرِ",
      "im": "وَالْعَصْرِ",
      "en": "By the time",
      "tr": "wal-ʿaṣri"
    }
  ],
  "103:2": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "ٱلْإِنسَـٰنَ",
      "im": "الْإِنسَانَ",
      "en": "mankind",
      "tr": "l-insāna"
    },
    {
      "ar": "لَفِى",
      "im": "لَفِي",
      "en": "(is) surely, in",
      "tr": "lafī"
    },
    {
      "ar": "خُسْرٍ",
      "im": "خُسْرٍ",
      "en": "loss",
      "tr": "khus'rin"
    }
  ],
  "103:3": [
    {
      "ar": "إِلَّا",
      "im": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "ءَامَنُوا۟",
      "im": "آمَنُوا",
      "en": "believe",
      "tr": "āmanū"
    },
    {
      "ar": "وَعَمِلُوا۟",
      "im": "وَعَمِلُوا",
      "en": "and do",
      "tr": "waʿamilū"
    },
    {
      "ar": "ٱلصَّـٰلِحَـٰتِ",
      "im": "الصَّالِحَاتِ",
      "en": "righteous deeds",
      "tr": "l-ṣāliḥāti"
    },
    {
      "ar": "وَتَوَاصَوْا۟",
      "im": "وَتَوَاصَوْا",
      "en": "and enjoin (each other)",
      "tr": "watawāṣaw"
    },
    {
      "ar": "بِٱلْحَقِّ",
      "im": "بِالْحَقِّ",
      "en": "to the truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَتَوَاصَوْا۟",
      "im": "وَتَوَاصَوْا",
      "en": "and enjoin (each other)",
      "tr": "watawāṣaw"
    },
    {
      "ar": "بِٱلصَّبْرِ",
      "im": "بِالصَّبْرِ",
      "en": "to [the] patience",
      "tr": "bil-ṣabri"
    }
  ],
  "104:1": [
    {
      "ar": "وَيْلٌۭ",
      "im": "وَيْلٌ",
      "en": "Woe",
      "tr": "waylun"
    },
    {
      "ar": "لِّكُلِّ",
      "im": "لِّكُلِّ",
      "en": "to every",
      "tr": "likulli"
    },
    {
      "ar": "هُمَزَةٍۢ",
      "im": "هُمَزَةٍ",
      "en": "slanderer",
      "tr": "humazatin"
    },
    {
      "ar": "لُّمَزَةٍ",
      "im": "لُّمَزَةٍ",
      "en": "backbiter",
      "tr": "lumazatin"
    }
  ],
  "104:2": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "جَمَعَ",
      "im": "جَمَعَ",
      "en": "collects",
      "tr": "jamaʿa"
    },
    {
      "ar": "مَالًۭا",
      "im": "مَالًا",
      "en": "wealth",
      "tr": "mālan"
    },
    {
      "ar": "وَعَدَّدَهُۥ",
      "im": "وَعَدَّدَهُ",
      "en": "and counts it",
      "tr": "waʿaddadahu"
    }
  ],
  "104:3": [
    {
      "ar": "يَحْسَبُ",
      "im": "يَحْسَبُ",
      "en": "Thinking",
      "tr": "yaḥsabu"
    },
    {
      "ar": "أَنَّ",
      "im": "أَنَّ",
      "en": "that",
      "tr": "anna"
    },
    {
      "ar": "مَالَهُۥٓ",
      "im": "مَالَهُ",
      "en": "his wealth",
      "tr": "mālahu"
    },
    {
      "ar": "أَخْلَدَهُۥ",
      "im": "أَخْلَدَهُ",
      "en": "will make him immortal",
      "tr": "akhladahu"
    }
  ],
  "104:4": [
    {
      "ar": "كَلَّا ۖ",
      "im": "كَلَّا ۖ",
      "en": "Nay",
      "tr": "kallā"
    },
    {
      "ar": "لَيُنۢبَذَنَّ",
      "im": "لَيُنبَذَنَّ",
      "en": "Surely he will be thrown",
      "tr": "layunbadhanna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْحُطَمَةِ",
      "im": "الْحُطَمَةِ",
      "en": "the Crusher",
      "tr": "l-ḥuṭamati"
    }
  ],
  "104:5": [
    {
      "ar": "وَمَآ",
      "im": "وَمَا",
      "en": "And what",
      "tr": "wamā"
    },
    {
      "ar": "أَدْرَىٰكَ",
      "im": "أَدْرَاكَ",
      "en": "will make you know",
      "tr": "adrāka"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "ٱلْحُطَمَةُ",
      "im": "الْحُطَمَةُ",
      "en": "the Crusher (is)",
      "tr": "l-ḥuṭamatu"
    }
  ],
  "104:6": [
    {
      "ar": "نَارُ",
      "im": "نَارُ",
      "en": "A Fire",
      "tr": "nāru"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ٱلْمُوقَدَةُ",
      "im": "الْمُوقَدَةُ",
      "en": "kindled",
      "tr": "l-mūqadatu"
    }
  ],
  "104:7": [
    {
      "ar": "ٱلَّتِى",
      "im": "الَّتِي",
      "en": "Which",
      "tr": "allatī"
    },
    {
      "ar": "تَطَّلِعُ",
      "im": "تَطَّلِعُ",
      "en": "mounts up",
      "tr": "taṭṭaliʿu"
    },
    {
      "ar": "عَلَى",
      "im": "عَلَى",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْأَفْـِٔدَةِ",
      "im": "الْأَفْئِدَةِ",
      "en": "the hearts",
      "tr": "l-afidati"
    }
  ],
  "104:8": [
    {
      "ar": "إِنَّهَا",
      "im": "إِنَّهَا",
      "en": "Indeed, it",
      "tr": "innahā"
    },
    {
      "ar": "عَلَيْهِم",
      "im": "عَلَيْهِم",
      "en": "(will be) upon them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "مُّؤْصَدَةٌۭ",
      "im": "مُّؤْصَدَةٌ",
      "en": "closed over",
      "tr": "mu'ṣadatun"
    }
  ],
  "104:9": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "عَمَدٍۢ",
      "im": "عَمَدٍ",
      "en": "columns",
      "tr": "ʿamadin"
    },
    {
      "ar": "مُّمَدَّدَةٍۭ",
      "im": "مُّمَدَّدَةٍ",
      "en": "extended",
      "tr": "mumaddadatin"
    }
  ],
  "105:1": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Have not",
      "tr": "alam"
    },
    {
      "ar": "تَرَ",
      "im": "تَرَ",
      "en": "you seen",
      "tr": "tara"
    },
    {
      "ar": "كَيْفَ",
      "im": "كَيْفَ",
      "en": "how",
      "tr": "kayfa"
    },
    {
      "ar": "فَعَلَ",
      "im": "فَعَلَ",
      "en": "dealt",
      "tr": "faʿala"
    },
    {
      "ar": "رَبُّكَ",
      "im": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "بِأَصْحَـٰبِ",
      "im": "بِأَصْحَابِ",
      "en": "with (the) Companions",
      "tr": "bi-aṣḥābi"
    },
    {
      "ar": "ٱلْفِيلِ",
      "im": "الْفِيلِ",
      "en": "(of the) Elephant",
      "tr": "l-fīli"
    }
  ],
  "105:2": [
    {
      "ar": "أَلَمْ",
      "im": "أَلَمْ",
      "en": "Did not",
      "tr": "alam"
    },
    {
      "ar": "يَجْعَلْ",
      "im": "يَجْعَلْ",
      "en": "He make",
      "tr": "yajʿal"
    },
    {
      "ar": "كَيْدَهُمْ",
      "im": "كَيْدَهُمْ",
      "en": "their plan",
      "tr": "kaydahum"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "go",
      "tr": "fī"
    },
    {
      "ar": "تَضْلِيلٍۢ",
      "im": "تَضْلِيلٍ",
      "en": "astray",
      "tr": "taḍlīlin"
    }
  ],
  "105:3": [
    {
      "ar": "وَأَرْسَلَ",
      "im": "وَأَرْسَلَ",
      "en": "And He sent",
      "tr": "wa-arsala"
    },
    {
      "ar": "عَلَيْهِمْ",
      "im": "عَلَيْهِمْ",
      "en": "against them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "طَيْرًا",
      "im": "طَيْرًا",
      "en": "birds",
      "tr": "ṭayran"
    },
    {
      "ar": "أَبَابِيلَ",
      "im": "أَبَابِيلَ",
      "en": "(in) flocks",
      "tr": "abābīla"
    }
  ],
  "105:4": [
    {
      "ar": "تَرْمِيهِم",
      "im": "تَرْمِيهِم",
      "en": "Striking them",
      "tr": "tarmīhim"
    },
    {
      "ar": "بِحِجَارَةٍۢ",
      "im": "بِحِجَارَةٍ",
      "en": "with stones",
      "tr": "biḥijāratin"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "سِجِّيلٍۢ",
      "im": "سِجِّيلٍ",
      "en": "baked clay",
      "tr": "sijjīlin"
    }
  ],
  "105:5": [
    {
      "ar": "فَجَعَلَهُمْ",
      "im": "فَجَعَلَهُمْ",
      "en": "Then He made them",
      "tr": "fajaʿalahum"
    },
    {
      "ar": "كَعَصْفٍۢ",
      "im": "كَعَصْفٍ",
      "en": "like straw",
      "tr": "kaʿaṣfin"
    },
    {
      "ar": "مَّأْكُولٍۭ",
      "im": "مَّأْكُولٍ",
      "en": "eaten up",
      "tr": "makūlin"
    }
  ],
  "106:1": [
    {
      "ar": "لِإِيلَـٰفِ",
      "im": "لِإِيلَافِ",
      "en": "For (the) familiarity",
      "tr": "liīlāfi"
    },
    {
      "ar": "قُرَيْشٍ",
      "im": "قُرَيْشٍ",
      "en": "(of the) Quraish",
      "tr": "qurayshin"
    }
  ],
  "106:2": [
    {
      "ar": "إِۦلَـٰفِهِمْ",
      "im": "إِيلَافِهِمْ",
      "en": "Their familiarity",
      "tr": "īlāfihim"
    },
    {
      "ar": "رِحْلَةَ",
      "im": "رِحْلَةَ",
      "en": "(with the) journey",
      "tr": "riḥ'lata"
    },
    {
      "ar": "ٱلشِّتَآءِ",
      "im": "الشِّتَاءِ",
      "en": "(of) winter",
      "tr": "l-shitāi"
    },
    {
      "ar": "وَٱلصَّيْفِ",
      "im": "وَالصَّيْفِ",
      "en": "and summer",
      "tr": "wal-ṣayfi"
    }
  ],
  "106:3": [
    {
      "ar": "فَلْيَعْبُدُوا۟",
      "im": "فَلْيَعْبُدُوا",
      "en": "So let them worship",
      "tr": "falyaʿbudū"
    },
    {
      "ar": "رَبَّ",
      "im": "رَبَّ",
      "en": "(the) Lord",
      "tr": "rabba"
    },
    {
      "ar": "هَـٰذَا",
      "im": "هَٰذَا",
      "en": "(of) this",
      "tr": "hādhā"
    },
    {
      "ar": "ٱلْبَيْتِ",
      "im": "الْبَيْتِ",
      "en": "House",
      "tr": "l-bayti"
    }
  ],
  "106:4": [
    {
      "ar": "ٱلَّذِىٓ",
      "im": "الَّذِي",
      "en": "The One Who",
      "tr": "alladhī"
    },
    {
      "ar": "أَطْعَمَهُم",
      "im": "أَطْعَمَهُم",
      "en": "feeds them",
      "tr": "aṭʿamahum"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "[from]",
      "tr": "min"
    },
    {
      "ar": "جُوعٍۢ",
      "im": "جُوعٍ",
      "en": "(against) hunger",
      "tr": "jūʿin"
    },
    {
      "ar": "وَءَامَنَهُم",
      "im": "وَآمَنَهُم",
      "en": "and gives them security",
      "tr": "waāmanahum"
    },
    {
      "ar": "مِّنْ",
      "im": "مِّنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "خَوْفٍۭ",
      "im": "خَوْفٍ",
      "en": "fear",
      "tr": "khawfin"
    }
  ],
  "107:1": [
    {
      "ar": "أَرَءَيْتَ",
      "im": "أَرَأَيْتَ",
      "en": "Have you seen",
      "tr": "ara-ayta"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "the one who",
      "tr": "alladhī"
    },
    {
      "ar": "يُكَذِّبُ",
      "im": "يُكَذِّبُ",
      "en": "denies",
      "tr": "yukadhibu"
    },
    {
      "ar": "بِٱلدِّينِ",
      "im": "بِالدِّينِ",
      "en": "the Judgment",
      "tr": "bil-dīni"
    }
  ],
  "107:2": [
    {
      "ar": "فَذَٰلِكَ",
      "im": "فَذَٰلِكَ",
      "en": "Then that",
      "tr": "fadhālika"
    },
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "(is) the one who",
      "tr": "alladhī"
    },
    {
      "ar": "يَدُعُّ",
      "im": "يَدُعُّ",
      "en": "repulses",
      "tr": "yaduʿʿu"
    },
    {
      "ar": "ٱلْيَتِيمَ",
      "im": "الْيَتِيمَ",
      "en": "the orphan",
      "tr": "l-yatīma"
    }
  ],
  "107:3": [
    {
      "ar": "وَلَا",
      "im": "وَلَا",
      "en": "And (does) not",
      "tr": "walā"
    },
    {
      "ar": "يَحُضُّ",
      "im": "يَحُضُّ",
      "en": "feel the urge",
      "tr": "yaḥuḍḍu"
    },
    {
      "ar": "عَلَىٰ",
      "im": "عَلَىٰ",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "طَعَامِ",
      "im": "طَعَامِ",
      "en": "feed",
      "tr": "ṭaʿāmi"
    },
    {
      "ar": "ٱلْمِسْكِينِ",
      "im": "الْمِسْكِينِ",
      "en": "the poor",
      "tr": "l-mis'kīni"
    }
  ],
  "107:4": [
    {
      "ar": "فَوَيْلٌۭ",
      "im": "فَوَيْلٌ",
      "en": "So woe",
      "tr": "fawaylun"
    },
    {
      "ar": "لِّلْمُصَلِّينَ",
      "im": "لِّلْمُصَلِّينَ",
      "en": "to those who pray",
      "tr": "lil'muṣallīna"
    }
  ],
  "107:5": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "[they]",
      "tr": "hum"
    },
    {
      "ar": "عَن",
      "im": "عَن",
      "en": "about",
      "tr": "ʿan"
    },
    {
      "ar": "صَلَاتِهِمْ",
      "im": "صَلَاتِهِمْ",
      "en": "their prayers",
      "tr": "ṣalātihim"
    },
    {
      "ar": "سَاهُونَ",
      "im": "سَاهُونَ",
      "en": "(are) neglectful",
      "tr": "sāhūna"
    }
  ],
  "107:6": [
    {
      "ar": "ٱلَّذِينَ",
      "im": "الَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "هُمْ",
      "im": "هُمْ",
      "en": "[they]",
      "tr": "hum"
    },
    {
      "ar": "يُرَآءُونَ",
      "im": "يُرَاءُونَ",
      "en": "make show",
      "tr": "yurāūna"
    }
  ],
  "107:7": [
    {
      "ar": "وَيَمْنَعُونَ",
      "im": "وَيَمْنَعُونَ",
      "en": "And they deny",
      "tr": "wayamnaʿūna"
    },
    {
      "ar": "ٱلْمَاعُونَ",
      "im": "الْمَاعُونَ",
      "en": "[the] small kindnesses",
      "tr": "l-māʿūna"
    }
  ],
  "108:1": [
    {
      "ar": "إِنَّآ",
      "im": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "أَعْطَيْنَـٰكَ",
      "im": "أَعْطَيْنَاكَ",
      "en": "We have given you",
      "tr": "aʿṭaynāka"
    },
    {
      "ar": "ٱلْكَوْثَرَ",
      "im": "الْكَوْثَرَ",
      "en": "Al-Kauthar",
      "tr": "l-kawthara"
    }
  ],
  "108:2": [
    {
      "ar": "فَصَلِّ",
      "im": "فَصَلِّ",
      "en": "So pray",
      "tr": "faṣalli"
    },
    {
      "ar": "لِرَبِّكَ",
      "im": "لِرَبِّكَ",
      "en": "to your Lord",
      "tr": "lirabbika"
    },
    {
      "ar": "وَٱنْحَرْ",
      "im": "وَانْحَرْ",
      "en": "and sacrifice",
      "tr": "wa-in'ḥar"
    }
  ],
  "108:3": [
    {
      "ar": "إِنَّ",
      "im": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "شَانِئَكَ",
      "im": "شَانِئَكَ",
      "en": "your enemy",
      "tr": "shāni-aka"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "he (is)",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْأَبْتَرُ",
      "im": "الْأَبْتَرُ",
      "en": "the one cut off",
      "tr": "l-abtaru"
    }
  ],
  "109:1": [
    {
      "ar": "قُلْ",
      "im": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "يَـٰٓأَيُّهَا",
      "im": "يَا أَيُّهَا",
      "en": "O",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلْكَـٰفِرُونَ",
      "im": "الْكَافِرُونَ",
      "en": "disbelievers",
      "tr": "l-kāfirūna"
    }
  ],
  "109:2": [
    {
      "ar": "لَآ",
      "im": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "أَعْبُدُ",
      "im": "أَعْبُدُ",
      "en": "I worship",
      "tr": "aʿbudu"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَعْبُدُونَ",
      "im": "تَعْبُدُونَ",
      "en": "you worship",
      "tr": "taʿbudūna"
    }
  ],
  "109:3": [
    {
      "ar": "وَلَآ",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "أَنتُمْ",
      "im": "أَنتُمْ",
      "en": "you",
      "tr": "antum"
    },
    {
      "ar": "عَـٰبِدُونَ",
      "im": "عَابِدُونَ",
      "en": "(are) worshippers",
      "tr": "ʿābidūna"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "(of) what",
      "tr": "mā"
    },
    {
      "ar": "أَعْبُدُ",
      "im": "أَعْبُدُ",
      "en": "I worship",
      "tr": "aʿbudu"
    }
  ],
  "109:4": [
    {
      "ar": "وَلَآ",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "أَنَا۠",
      "im": "أَنَا",
      "en": "I am",
      "tr": "anā"
    },
    {
      "ar": "عَابِدٌۭ",
      "im": "عَابِدٌ",
      "en": "a worshipper",
      "tr": "ʿābidun"
    },
    {
      "ar": "مَّا",
      "im": "مَّا",
      "en": "(of) what",
      "tr": "mā"
    },
    {
      "ar": "عَبَدتُّمْ",
      "im": "عَبَدتُّمْ",
      "en": "you worship",
      "tr": "ʿabadttum"
    }
  ],
  "109:5": [
    {
      "ar": "وَلَآ",
      "im": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "أَنتُمْ",
      "im": "أَنتُمْ",
      "en": "you",
      "tr": "antum"
    },
    {
      "ar": "عَـٰبِدُونَ",
      "im": "عَابِدُونَ",
      "en": "(are) worshippers",
      "tr": "ʿābidūna"
    },
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "(of) what",
      "tr": "mā"
    },
    {
      "ar": "أَعْبُدُ",
      "im": "أَعْبُدُ",
      "en": "I worship",
      "tr": "aʿbudu"
    }
  ],
  "109:6": [
    {
      "ar": "لَكُمْ",
      "im": "لَكُمْ",
      "en": "For you",
      "tr": "lakum"
    },
    {
      "ar": "دِينُكُمْ",
      "im": "دِينُكُمْ",
      "en": "(is) your religion",
      "tr": "dīnukum"
    },
    {
      "ar": "وَلِىَ",
      "im": "وَلِيَ",
      "en": "and for me",
      "tr": "waliya"
    },
    {
      "ar": "دِينِ",
      "im": "دِينِ",
      "en": "(is) my religion",
      "tr": "dīni"
    }
  ],
  "110:1": [
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "When",
      "tr": "idhā"
    },
    {
      "ar": "جَآءَ",
      "im": "جَاءَ",
      "en": "comes",
      "tr": "jāa"
    },
    {
      "ar": "نَصْرُ",
      "im": "نَصْرُ",
      "en": "(the) Help",
      "tr": "naṣru"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَٱلْفَتْحُ",
      "im": "وَالْفَتْحُ",
      "en": "and the Victory",
      "tr": "wal-fatḥu"
    }
  ],
  "110:2": [
    {
      "ar": "وَرَأَيْتَ",
      "im": "وَرَأَيْتَ",
      "en": "And you see",
      "tr": "wara-ayta"
    },
    {
      "ar": "ٱلنَّاسَ",
      "im": "النَّاسَ",
      "en": "the people",
      "tr": "l-nāsa"
    },
    {
      "ar": "يَدْخُلُونَ",
      "im": "يَدْخُلُونَ",
      "en": "entering",
      "tr": "yadkhulūna"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "into",
      "tr": "fī"
    },
    {
      "ar": "دِينِ",
      "im": "دِينِ",
      "en": "(the) religion",
      "tr": "dīni"
    },
    {
      "ar": "ٱللَّهِ",
      "im": "اللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "أَفْوَاجًۭا",
      "im": "أَفْوَاجًا",
      "en": "(in) multitudes",
      "tr": "afwājan"
    }
  ],
  "110:3": [
    {
      "ar": "فَسَبِّحْ",
      "im": "فَسَبِّحْ",
      "en": "Then glorify",
      "tr": "fasabbiḥ"
    },
    {
      "ar": "بِحَمْدِ",
      "im": "بِحَمْدِ",
      "en": "with (the) praises",
      "tr": "biḥamdi"
    },
    {
      "ar": "رَبِّكَ",
      "im": "رَبِّكَ",
      "en": "(of) your Lord",
      "tr": "rabbika"
    },
    {
      "ar": "وَٱسْتَغْفِرْهُ ۚ",
      "im": "وَاسْتَغْفِرْهُ ۚ",
      "en": "and ask His forgiveness",
      "tr": "wa-is'taghfir'hu"
    },
    {
      "ar": "إِنَّهُۥ",
      "im": "إِنَّهُ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "im": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "تَوَّابًۢا",
      "im": "تَوَّابًا",
      "en": "Oft-Returning",
      "tr": "tawwāban"
    }
  ],
  "111:1": [
    {
      "ar": "تَبَّتْ",
      "im": "تَبَّتْ",
      "en": "Perish",
      "tr": "tabbat"
    },
    {
      "ar": "يَدَآ",
      "im": "يَدَا",
      "en": "(the) hands",
      "tr": "yadā"
    },
    {
      "ar": "أَبِى",
      "im": "أَبِي",
      "en": "(of) Abu",
      "tr": "abī"
    },
    {
      "ar": "لَهَبٍۢ",
      "im": "لَهَبٍ",
      "en": "Lahab",
      "tr": "lahabin"
    },
    {
      "ar": "وَتَبَّ",
      "im": "وَتَبَّ",
      "en": "and perish he",
      "tr": "watabba"
    }
  ],
  "111:2": [
    {
      "ar": "مَآ",
      "im": "مَا",
      "en": "Not",
      "tr": "mā"
    },
    {
      "ar": "أَغْنَىٰ",
      "im": "أَغْنَىٰ",
      "en": "(will) avail",
      "tr": "aghnā"
    },
    {
      "ar": "عَنْهُ",
      "im": "عَنْهُ",
      "en": "him",
      "tr": "ʿanhu"
    },
    {
      "ar": "مَالُهُۥ",
      "im": "مَالُهُ",
      "en": "his wealth",
      "tr": "māluhu"
    },
    {
      "ar": "وَمَا",
      "im": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "كَسَبَ",
      "im": "كَسَبَ",
      "en": "he earned",
      "tr": "kasaba"
    }
  ],
  "111:3": [
    {
      "ar": "سَيَصْلَىٰ",
      "im": "سَيَصْلَىٰ",
      "en": "He will be burnt",
      "tr": "sayaṣlā"
    },
    {
      "ar": "نَارًۭا",
      "im": "نَارًا",
      "en": "(in) a Fire",
      "tr": "nāran"
    },
    {
      "ar": "ذَاتَ",
      "im": "ذَاتَ",
      "en": "of",
      "tr": "dhāta"
    },
    {
      "ar": "لَهَبٍۢ",
      "im": "لَهَبٍ",
      "en": "Blazing Flames",
      "tr": "lahabin"
    }
  ],
  "111:4": [
    {
      "ar": "وَٱمْرَأَتُهُۥ",
      "im": "وَامْرَأَتُهُ",
      "en": "And his wife",
      "tr": "wa-im'ra-atuhu"
    },
    {
      "ar": "حَمَّالَةَ",
      "im": "حَمَّالَةَ",
      "en": "(the) carrier",
      "tr": "ḥammālata"
    },
    {
      "ar": "ٱلْحَطَبِ",
      "im": "الْحَطَبِ",
      "en": "(of) firewood",
      "tr": "l-ḥaṭabi"
    }
  ],
  "111:5": [
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "جِيدِهَا",
      "im": "جِيدِهَا",
      "en": "her neck",
      "tr": "jīdihā"
    },
    {
      "ar": "حَبْلٌۭ",
      "im": "حَبْلٌ",
      "en": "(will be) a rope",
      "tr": "ḥablun"
    },
    {
      "ar": "مِّن",
      "im": "مِّن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "مَّسَدٍۭ",
      "im": "مَّسَدٍ",
      "en": "palm-fiber",
      "tr": "masadin"
    }
  ],
  "112:1": [
    {
      "ar": "قُلْ",
      "im": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "هُوَ",
      "im": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "(is) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "أَحَدٌ",
      "im": "أَحَدٌ",
      "en": "the One",
      "tr": "aḥadun"
    }
  ],
  "112:2": [
    {
      "ar": "ٱللَّهُ",
      "im": "اللَّهُ",
      "en": "Allah",
      "tr": "al-lahu"
    },
    {
      "ar": "ٱلصَّمَدُ",
      "im": "الصَّمَدُ",
      "en": "the Eternal, the Absolute",
      "tr": "l-ṣamadu"
    }
  ],
  "112:3": [
    {
      "ar": "لَمْ",
      "im": "لَمْ",
      "en": "Not",
      "tr": "lam"
    },
    {
      "ar": "يَلِدْ",
      "im": "يَلِدْ",
      "en": "He begets",
      "tr": "yalid"
    },
    {
      "ar": "وَلَمْ",
      "im": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "يُولَدْ",
      "im": "يُولَدْ",
      "en": "He is begotten",
      "tr": "yūlad"
    }
  ],
  "112:4": [
    {
      "ar": "وَلَمْ",
      "im": "وَلَمْ",
      "en": "And not",
      "tr": "walam"
    },
    {
      "ar": "يَكُن",
      "im": "يَكُن",
      "en": "is",
      "tr": "yakun"
    },
    {
      "ar": "لَّهُۥ",
      "im": "لَّهُ",
      "en": "for Him",
      "tr": "lahu"
    },
    {
      "ar": "كُفُوًا",
      "im": "كُفُوًا",
      "en": "equivalent",
      "tr": "kufuwan"
    },
    {
      "ar": "أَحَدٌۢ",
      "im": "أَحَدٌ",
      "en": "any [one]",
      "tr": "aḥadun"
    }
  ],
  "113:1": [
    {
      "ar": "قُلْ",
      "im": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "أَعُوذُ",
      "im": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِرَبِّ",
      "im": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلْفَلَقِ",
      "im": "الْفَلَقِ",
      "en": "(of) the dawn",
      "tr": "l-falaqi"
    }
  ],
  "113:2": [
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "شَرِّ",
      "im": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "مَا",
      "im": "مَا",
      "en": "(of) what",
      "tr": "mā"
    },
    {
      "ar": "خَلَقَ",
      "im": "خَلَقَ",
      "en": "He created",
      "tr": "khalaqa"
    }
  ],
  "113:3": [
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "im": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "غَاسِقٍ",
      "im": "غَاسِقٍ",
      "en": "(of) darkness",
      "tr": "ghāsiqin"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "وَقَبَ",
      "im": "وَقَبَ",
      "en": "it spreads",
      "tr": "waqaba"
    }
  ],
  "113:4": [
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "im": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "ٱلنَّفَّـٰثَـٰتِ",
      "im": "النَّفَّاثَاتِ",
      "en": "(of) the blowers",
      "tr": "l-nafāthāti"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْعُقَدِ",
      "im": "الْعُقَدِ",
      "en": "the knots",
      "tr": "l-ʿuqadi"
    }
  ],
  "113:5": [
    {
      "ar": "وَمِن",
      "im": "وَمِن",
      "en": "And from",
      "tr": "wamin"
    },
    {
      "ar": "شَرِّ",
      "im": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "حَاسِدٍ",
      "im": "حَاسِدٍ",
      "en": "(of) an envier",
      "tr": "ḥāsidin"
    },
    {
      "ar": "إِذَا",
      "im": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "حَسَدَ",
      "im": "حَسَدَ",
      "en": "he envies",
      "tr": "ḥasada"
    }
  ],
  "114:1": [
    {
      "ar": "قُلْ",
      "im": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "أَعُوذُ",
      "im": "أَعُوذُ",
      "en": "I seek refuge",
      "tr": "aʿūdhu"
    },
    {
      "ar": "بِرَبِّ",
      "im": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:2": [
    {
      "ar": "مَلِكِ",
      "im": "مَلِكِ",
      "en": "(The) King",
      "tr": "maliki"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:3": [
    {
      "ar": "إِلَـٰهِ",
      "im": "إِلَٰهِ",
      "en": "(The) God",
      "tr": "ilāhi"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:4": [
    {
      "ar": "مِن",
      "im": "مِن",
      "en": "From",
      "tr": "min"
    },
    {
      "ar": "شَرِّ",
      "im": "شَرِّ",
      "en": "(the) evil",
      "tr": "sharri"
    },
    {
      "ar": "ٱلْوَسْوَاسِ",
      "im": "الْوَسْوَاسِ",
      "en": "(of) the whisperer",
      "tr": "l-waswāsi"
    },
    {
      "ar": "ٱلْخَنَّاسِ",
      "im": "الْخَنَّاسِ",
      "en": "the one who withdraws",
      "tr": "l-khanāsi"
    }
  ],
  "114:5": [
    {
      "ar": "ٱلَّذِى",
      "im": "الَّذِي",
      "en": "The one who",
      "tr": "alladhī"
    },
    {
      "ar": "يُوَسْوِسُ",
      "im": "يُوَسْوِسُ",
      "en": "whispers",
      "tr": "yuwaswisu"
    },
    {
      "ar": "فِى",
      "im": "فِي",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "صُدُورِ",
      "im": "صُدُورِ",
      "en": "(the) breasts",
      "tr": "ṣudūri"
    },
    {
      "ar": "ٱلنَّاسِ",
      "im": "النَّاسِ",
      "en": "(of) mankind",
      "tr": "l-nāsi"
    }
  ],
  "114:6": [
    {
      "ar": "مِنَ",
      "im": "مِنَ",
      "en": "From",
      "tr": "mina"
    },
    {
      "ar": "ٱلْجِنَّةِ",
      "im": "الْجِنَّةِ",
      "en": "the jinn",
      "tr": "l-jinati"
    },
    {
      "ar": "وَٱلنَّاسِ",
      "im": "وَالنَّاسِ",
      "en": "and men",
      "tr": "wal-nāsi"
    }
  ]
};

/** The words of one ayah, or undefined where none were generated. */
export const ayahWords = (surah: number, ayah: number): readonly AyahWord[] | undefined =>
  AYAH_WORDS[`${surah}:${ayah}`];
