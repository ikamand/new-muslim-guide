/**
 * GENERATED — do not edit by hand. `npm run quran:words`.
 *
 * Word by word: every ayah the app opens as a row of words — Al-Fatihah and
 * the verses the Qur'an duas cite. Each word carries its own Uthmani text,
 * English gloss and transliteration from one token of api.quran.com's word
 * stream, so the three cannot be shown against the wrong word. 215
 * ayahs, 2575 words, read from the `.cache/quran/words/` mirror.
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
  "2:102": [
    {
      "ar": "وَٱتَّبَعُوا۟",
      "en": "And they followed",
      "tr": "wa-ittabaʿū"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "تَتْلُوا۟",
      "en": "recite(d)",
      "tr": "tatlū"
    },
    {
      "ar": "ٱلشَّيَـٰطِينُ",
      "en": "the devils",
      "tr": "l-shayāṭīnu"
    },
    {
      "ar": "عَلَىٰ",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "مُلْكِ",
      "en": "(the) kingdom",
      "tr": "mul'ki"
    },
    {
      "ar": "سُلَيْمَـٰنَ ۖ",
      "en": "(of) Sulaiman",
      "tr": "sulaymāna"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "كَفَرَ",
      "en": "disbelieved",
      "tr": "kafara"
    },
    {
      "ar": "سُلَيْمَـٰنُ",
      "en": "Sulaiman",
      "tr": "sulaymānu"
    },
    {
      "ar": "وَلَـٰكِنَّ",
      "en": "[and] but",
      "tr": "walākinna"
    },
    {
      "ar": "ٱلشَّيَـٰطِينَ",
      "en": "the devils",
      "tr": "l-shayāṭīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "en": "disbelieved",
      "tr": "kafarū"
    },
    {
      "ar": "يُعَلِّمُونَ",
      "en": "they teach",
      "tr": "yuʿallimūna"
    },
    {
      "ar": "ٱلنَّاسَ",
      "en": "the people",
      "tr": "l-nāsa"
    },
    {
      "ar": "ٱلسِّحْرَ",
      "en": "[the] magic",
      "tr": "l-siḥ'ra"
    },
    {
      "ar": "وَمَآ",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "أُنزِلَ",
      "en": "was sent down",
      "tr": "unzila"
    },
    {
      "ar": "عَلَى",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْمَلَكَيْنِ",
      "en": "the two angels",
      "tr": "l-malakayni"
    },
    {
      "ar": "بِبَابِلَ",
      "en": "in Babylon",
      "tr": "bibābila"
    },
    {
      "ar": "هَـٰرُوتَ",
      "en": "Harut",
      "tr": "hārūta"
    },
    {
      "ar": "وَمَـٰرُوتَ ۚ",
      "en": "and Marut",
      "tr": "wamārūta"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "يُعَلِّمَانِ",
      "en": "they both teach",
      "tr": "yuʿallimāni"
    },
    {
      "ar": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَحَدٍ",
      "en": "one",
      "tr": "aḥadin"
    },
    {
      "ar": "حَتَّىٰ",
      "en": "unless",
      "tr": "ḥattā"
    },
    {
      "ar": "يَقُولَآ",
      "en": "they [both] say",
      "tr": "yaqūlā"
    },
    {
      "ar": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "نَحْنُ",
      "en": "we",
      "tr": "naḥnu"
    },
    {
      "ar": "فِتْنَةٌۭ",
      "en": "(are) a trial",
      "tr": "fit'natun"
    },
    {
      "ar": "فَلَا",
      "en": "so (do) not",
      "tr": "falā"
    },
    {
      "ar": "تَكْفُرْ ۖ",
      "en": "disbelieve",
      "tr": "takfur"
    },
    {
      "ar": "فَيَتَعَلَّمُونَ",
      "en": "But they learn",
      "tr": "fayataʿallamūna"
    },
    {
      "ar": "مِنْهُمَا",
      "en": "from those two",
      "tr": "min'humā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يُفَرِّقُونَ",
      "en": "[they] causes separation",
      "tr": "yufarriqūna"
    },
    {
      "ar": "بِهِۦ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "بَيْنَ",
      "en": "between",
      "tr": "bayna"
    },
    {
      "ar": "ٱلْمَرْءِ",
      "en": "the man",
      "tr": "l-mari"
    },
    {
      "ar": "وَزَوْجِهِۦ ۚ",
      "en": "and his spouse",
      "tr": "wazawjihi"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُم",
      "en": "they (could)",
      "tr": "hum"
    },
    {
      "ar": "بِضَآرِّينَ",
      "en": "at all [be those who] harm",
      "tr": "biḍārrīna"
    },
    {
      "ar": "بِهِۦ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَحَدٍ",
      "en": "one",
      "tr": "aḥadin"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِإِذْنِ",
      "en": "by permission",
      "tr": "bi-idh'ni"
    },
    {
      "ar": "ٱللَّهِ ۚ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَيَتَعَلَّمُونَ",
      "en": "And they learn",
      "tr": "wayataʿallamūna"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَضُرُّهُمْ",
      "en": "harms them",
      "tr": "yaḍurruhum"
    },
    {
      "ar": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يَنفَعُهُمْ ۚ",
      "en": "profits them",
      "tr": "yanfaʿuhum"
    },
    {
      "ar": "وَلَقَدْ",
      "en": "And indeed",
      "tr": "walaqad"
    },
    {
      "ar": "عَلِمُوا۟",
      "en": "they knew",
      "tr": "ʿalimū"
    },
    {
      "ar": "لَمَنِ",
      "en": "that whoever",
      "tr": "lamani"
    },
    {
      "ar": "ٱشْتَرَىٰهُ",
      "en": "buys it",
      "tr": "ish'tarāhu"
    },
    {
      "ar": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "لَهُۥ",
      "en": "for him",
      "tr": "lahu"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرَةِ",
      "en": "the Hereafter",
      "tr": "l-ākhirati"
    },
    {
      "ar": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "خَلَـٰقٍۢ ۚ",
      "en": "share",
      "tr": "khalāqin"
    },
    {
      "ar": "وَلَبِئْسَ",
      "en": "And surely evil",
      "tr": "walabi'sa"
    },
    {
      "ar": "مَا",
      "en": "(is) what",
      "tr": "mā"
    },
    {
      "ar": "شَرَوْا۟",
      "en": "they sold",
      "tr": "sharaw"
    },
    {
      "ar": "بِهِۦٓ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "أَنفُسَهُمْ ۚ",
      "en": "themselves",
      "tr": "anfusahum"
    },
    {
      "ar": "لَوْ",
      "en": "if",
      "tr": "law"
    },
    {
      "ar": "كَانُوا۟",
      "en": "they were",
      "tr": "kānū"
    },
    {
      "ar": "يَعْلَمُونَ",
      "en": "(to) know",
      "tr": "yaʿlamūna"
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
  "2:129": [
    {
      "ar": "رَبَّنَا",
      "en": "Our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَٱبْعَثْ",
      "en": "[And] raise up",
      "tr": "wa-ib'ʿath"
    },
    {
      "ar": "فِيهِمْ",
      "en": "in them",
      "tr": "fīhim"
    },
    {
      "ar": "رَسُولًۭا",
      "en": "a Messenger",
      "tr": "rasūlan"
    },
    {
      "ar": "مِّنْهُمْ",
      "en": "from them",
      "tr": "min'hum"
    },
    {
      "ar": "يَتْلُوا۟",
      "en": "(who) will recite",
      "tr": "yatlū"
    },
    {
      "ar": "عَلَيْهِمْ",
      "en": "to them",
      "tr": "ʿalayhim"
    },
    {
      "ar": "ءَايَـٰتِكَ",
      "en": "Your Verses",
      "tr": "āyātika"
    },
    {
      "ar": "وَيُعَلِّمُهُمُ",
      "en": "and will teach them",
      "tr": "wayuʿallimuhumu"
    },
    {
      "ar": "ٱلْكِتَـٰبَ",
      "en": "the Book",
      "tr": "l-kitāba"
    },
    {
      "ar": "وَٱلْحِكْمَةَ",
      "en": "and the wisdom",
      "tr": "wal-ḥik'mata"
    },
    {
      "ar": "وَيُزَكِّيهِمْ ۚ",
      "en": "and purify them",
      "tr": "wayuzakkīhim"
    },
    {
      "ar": "إِنَّكَ",
      "en": "Indeed You",
      "tr": "innaka"
    },
    {
      "ar": "أَنتَ",
      "en": "You (are)",
      "tr": "anta"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "en": "the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "en": "the All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "2:155": [
    {
      "ar": "وَلَنَبْلُوَنَّكُم",
      "en": "And surely We will test you",
      "tr": "walanabluwannakum"
    },
    {
      "ar": "بِشَىْءٍۢ",
      "en": "with something",
      "tr": "bishayin"
    },
    {
      "ar": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْخَوْفِ",
      "en": "[the] fear",
      "tr": "l-khawfi"
    },
    {
      "ar": "وَٱلْجُوعِ",
      "en": "and [the] hunger",
      "tr": "wal-jūʿi"
    },
    {
      "ar": "وَنَقْصٍۢ",
      "en": "and loss",
      "tr": "wanaqṣin"
    },
    {
      "ar": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَمْوَٰلِ",
      "en": "[the] wealth",
      "tr": "l-amwāli"
    },
    {
      "ar": "وَٱلْأَنفُسِ",
      "en": "and [the] lives",
      "tr": "wal-anfusi"
    },
    {
      "ar": "وَٱلثَّمَرَٰتِ ۗ",
      "en": "and [the] fruits",
      "tr": "wal-thamarāti"
    },
    {
      "ar": "وَبَشِّرِ",
      "en": "but give good news",
      "tr": "wabashiri"
    },
    {
      "ar": "ٱلصَّـٰبِرِينَ",
      "en": "(to) the patient ones",
      "tr": "l-ṣābirīna"
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
  "2:255": [
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "al-lahu"
    },
    {
      "ar": "لَآ",
      "en": "(there is) no",
      "tr": "lā"
    },
    {
      "ar": "إِلَـٰهَ",
      "en": "God",
      "tr": "ilāha"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "هُوَ",
      "en": "Him",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْحَىُّ",
      "en": "the Ever-Living",
      "tr": "l-ḥayu"
    },
    {
      "ar": "ٱلْقَيُّومُ ۚ",
      "en": "the Sustainer of all that exists",
      "tr": "l-qayūmu"
    },
    {
      "ar": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "تَأْخُذُهُۥ",
      "en": "overtakes Him",
      "tr": "takhudhuhu"
    },
    {
      "ar": "سِنَةٌۭ",
      "en": "slumber",
      "tr": "sinatun"
    },
    {
      "ar": "وَلَا",
      "en": "[and] not",
      "tr": "walā"
    },
    {
      "ar": "نَوْمٌۭ ۚ",
      "en": "sleep",
      "tr": "nawmun"
    },
    {
      "ar": "لَّهُۥ",
      "en": "To Him (belongs)",
      "tr": "lahu"
    },
    {
      "ar": "مَا",
      "en": "what(ever)",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "en": "the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَمَا",
      "en": "and what(ever)",
      "tr": "wamā"
    },
    {
      "ar": "فِى",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْأَرْضِ ۗ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "مَن",
      "en": "Who",
      "tr": "man"
    },
    {
      "ar": "ذَا",
      "en": "(is) the one",
      "tr": "dhā"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "who",
      "tr": "alladhī"
    },
    {
      "ar": "يَشْفَعُ",
      "en": "can intercede",
      "tr": "yashfaʿu"
    },
    {
      "ar": "عِندَهُۥٓ",
      "en": "with Him",
      "tr": "ʿindahu"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِإِذْنِهِۦ ۚ",
      "en": "by His permission",
      "tr": "bi-idh'nihi"
    },
    {
      "ar": "يَعْلَمُ",
      "en": "He knows",
      "tr": "yaʿlamu"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "بَيْنَ",
      "en": "(is)",
      "tr": "bayna"
    },
    {
      "ar": "أَيْدِيهِمْ",
      "en": "before them",
      "tr": "aydīhim"
    },
    {
      "ar": "وَمَا",
      "en": "and what",
      "tr": "wamā"
    },
    {
      "ar": "خَلْفَهُمْ ۖ",
      "en": "(is) behind them",
      "tr": "khalfahum"
    },
    {
      "ar": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يُحِيطُونَ",
      "en": "they encompass",
      "tr": "yuḥīṭūna"
    },
    {
      "ar": "بِشَىْءٍۢ",
      "en": "anything",
      "tr": "bishayin"
    },
    {
      "ar": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِلْمِهِۦٓ",
      "en": "His Knowledge",
      "tr": "ʿil'mihi"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِمَا",
      "en": "[of] what",
      "tr": "bimā"
    },
    {
      "ar": "شَآءَ ۚ",
      "en": "He willed",
      "tr": "shāa"
    },
    {
      "ar": "وَسِعَ",
      "en": "Extends",
      "tr": "wasiʿa"
    },
    {
      "ar": "كُرْسِيُّهُ",
      "en": "His Seat",
      "tr": "kur'siyyuhu"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "en": "(to) the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضَ ۖ",
      "en": "and the earth",
      "tr": "wal-arḍa"
    },
    {
      "ar": "وَلَا",
      "en": "And not",
      "tr": "walā"
    },
    {
      "ar": "يَـُٔودُهُۥ",
      "en": "tires Him",
      "tr": "yaūduhu"
    },
    {
      "ar": "حِفْظُهُمَا ۚ",
      "en": "(the) guarding of both of them",
      "tr": "ḥif'ẓuhumā"
    },
    {
      "ar": "وَهُوَ",
      "en": "And He",
      "tr": "wahuwa"
    },
    {
      "ar": "ٱلْعَلِىُّ",
      "en": "(is) the Most High",
      "tr": "l-ʿaliyu"
    },
    {
      "ar": "ٱلْعَظِيمُ",
      "en": "the Most Great",
      "tr": "l-ʿaẓīmu"
    }
  ],
  "2:285": [
    {
      "ar": "ءَامَنَ",
      "en": "Believed",
      "tr": "āmana"
    },
    {
      "ar": "ٱلرَّسُولُ",
      "en": "the Messenger",
      "tr": "l-rasūlu"
    },
    {
      "ar": "بِمَآ",
      "en": "in what",
      "tr": "bimā"
    },
    {
      "ar": "أُنزِلَ",
      "en": "was revealed",
      "tr": "unzila"
    },
    {
      "ar": "إِلَيْهِ",
      "en": "to him",
      "tr": "ilayhi"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّهِۦ",
      "en": "his Lord",
      "tr": "rabbihi"
    },
    {
      "ar": "وَٱلْمُؤْمِنُونَ ۚ",
      "en": "and the believers",
      "tr": "wal-mu'minūna"
    },
    {
      "ar": "كُلٌّ",
      "en": "All",
      "tr": "kullun"
    },
    {
      "ar": "ءَامَنَ",
      "en": "believed",
      "tr": "āmana"
    },
    {
      "ar": "بِٱللَّهِ",
      "en": "in Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "وَمَلَـٰٓئِكَتِهِۦ",
      "en": "and His Angels",
      "tr": "wamalāikatihi"
    },
    {
      "ar": "وَكُتُبِهِۦ",
      "en": "and His Books",
      "tr": "wakutubihi"
    },
    {
      "ar": "وَرُسُلِهِۦ",
      "en": "and His Messengers",
      "tr": "warusulihi"
    },
    {
      "ar": "لَا",
      "en": "Not",
      "tr": "lā"
    },
    {
      "ar": "نُفَرِّقُ",
      "en": "we make distinction",
      "tr": "nufarriqu"
    },
    {
      "ar": "بَيْنَ",
      "en": "between",
      "tr": "bayna"
    },
    {
      "ar": "أَحَدٍۢ",
      "en": "any",
      "tr": "aḥadin"
    },
    {
      "ar": "مِّن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "رُّسُلِهِۦ ۚ",
      "en": "His messengers",
      "tr": "rusulihi"
    },
    {
      "ar": "وَقَالُوا۟",
      "en": "And they said",
      "tr": "waqālū"
    },
    {
      "ar": "سَمِعْنَا",
      "en": "We heard",
      "tr": "samiʿ'nā"
    },
    {
      "ar": "وَأَطَعْنَا ۖ",
      "en": "and we obeyed",
      "tr": "wa-aṭaʿnā"
    },
    {
      "ar": "غُفْرَانَكَ",
      "en": "(Grant) us Your forgiveness",
      "tr": "ghuf'rānaka"
    },
    {
      "ar": "رَبَّنَا",
      "en": "our Lord",
      "tr": "rabbanā"
    },
    {
      "ar": "وَإِلَيْكَ",
      "en": "and to You",
      "tr": "wa-ilayka"
    },
    {
      "ar": "ٱلْمَصِيرُ",
      "en": "(is) the return",
      "tr": "l-maṣīru"
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
  "5:118": [
    {
      "ar": "إِن",
      "en": "If",
      "tr": "in"
    },
    {
      "ar": "تُعَذِّبْهُمْ",
      "en": "You punish them",
      "tr": "tuʿadhib'hum"
    },
    {
      "ar": "فَإِنَّهُمْ",
      "en": "then indeed they",
      "tr": "fa-innahum"
    },
    {
      "ar": "عِبَادُكَ ۖ",
      "en": "(are) Your slaves",
      "tr": "ʿibāduka"
    },
    {
      "ar": "وَإِن",
      "en": "and if",
      "tr": "wa-in"
    },
    {
      "ar": "تَغْفِرْ",
      "en": "You forgive",
      "tr": "taghfir"
    },
    {
      "ar": "لَهُمْ",
      "en": "[for] them",
      "tr": "lahum"
    },
    {
      "ar": "فَإِنَّكَ",
      "en": "then indeed You",
      "tr": "fa-innaka"
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
  "6:79": [
    {
      "ar": "إِنِّى",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "وَجَّهْتُ",
      "en": "[I] have turned",
      "tr": "wajjahtu"
    },
    {
      "ar": "وَجْهِىَ",
      "en": "my face",
      "tr": "wajhiya"
    },
    {
      "ar": "لِلَّذِى",
      "en": "to the One Who",
      "tr": "lilladhī"
    },
    {
      "ar": "فَطَرَ",
      "en": "created",
      "tr": "faṭara"
    },
    {
      "ar": "ٱلسَّمَـٰوَٰتِ",
      "en": "the heavens",
      "tr": "l-samāwāti"
    },
    {
      "ar": "وَٱلْأَرْضَ",
      "en": "and the earth",
      "tr": "wal-arḍa"
    },
    {
      "ar": "حَنِيفًۭا ۖ",
      "en": "(as) a true monotheist",
      "tr": "ḥanīfan"
    },
    {
      "ar": "وَمَآ",
      "en": "and not",
      "tr": "wamā"
    },
    {
      "ar": "أَنَا۠",
      "en": "I (am)",
      "tr": "anā"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُشْرِكِينَ",
      "en": "the polytheists",
      "tr": "l-mush'rikīna"
    }
  ],
  "6:86": [
    {
      "ar": "وَإِسْمَـٰعِيلَ",
      "en": "And Ishmael",
      "tr": "wa-is'māʿīla"
    },
    {
      "ar": "وَٱلْيَسَعَ",
      "en": "and Elisha",
      "tr": "wal-yasaʿa"
    },
    {
      "ar": "وَيُونُسَ",
      "en": "and Yunus",
      "tr": "wayūnusa"
    },
    {
      "ar": "وَلُوطًۭا ۚ",
      "en": "and Lut",
      "tr": "walūṭan"
    },
    {
      "ar": "وَكُلًّۭا",
      "en": "and all",
      "tr": "wakullan"
    },
    {
      "ar": "فَضَّلْنَا",
      "en": "We preferred",
      "tr": "faḍḍalnā"
    },
    {
      "ar": "عَلَى",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "en": "the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "6:162": [
    {
      "ar": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "صَلَاتِى",
      "en": "my prayer",
      "tr": "ṣalātī"
    },
    {
      "ar": "وَنُسُكِى",
      "en": "and my rites of sacrifice",
      "tr": "wanusukī"
    },
    {
      "ar": "وَمَحْيَاىَ",
      "en": "and my living",
      "tr": "wamaḥyāya"
    },
    {
      "ar": "وَمَمَاتِى",
      "en": "and my dying",
      "tr": "wamamātī"
    },
    {
      "ar": "لِلَّهِ",
      "en": "(are) for Allah",
      "tr": "lillahi"
    },
    {
      "ar": "رَبِّ",
      "en": "Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
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
  "7:43": [
    {
      "ar": "وَنَزَعْنَا",
      "en": "And We will remove",
      "tr": "wanazaʿnā"
    },
    {
      "ar": "مَا",
      "en": "whatever",
      "tr": "mā"
    },
    {
      "ar": "فِى",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "صُدُورِهِم",
      "en": "their breasts",
      "tr": "ṣudūrihim"
    },
    {
      "ar": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "غِلٍّۢ",
      "en": "malice",
      "tr": "ghillin"
    },
    {
      "ar": "تَجْرِى",
      "en": "Flows",
      "tr": "tajrī"
    },
    {
      "ar": "مِن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "تَحْتِهِمُ",
      "en": "underneath them",
      "tr": "taḥtihimu"
    },
    {
      "ar": "ٱلْأَنْهَـٰرُ ۖ",
      "en": "the rivers",
      "tr": "l-anhāru"
    },
    {
      "ar": "وَقَالُوا۟",
      "en": "And they will say",
      "tr": "waqālū"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "en": "All the praise",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "en": "(is) for Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "هَدَىٰنَا",
      "en": "guided us",
      "tr": "hadānā"
    },
    {
      "ar": "لِهَـٰذَا",
      "en": "to this",
      "tr": "lihādhā"
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
      "ar": "لِنَهْتَدِىَ",
      "en": "to receive guidance",
      "tr": "linahtadiya"
    },
    {
      "ar": "لَوْلَآ",
      "en": "if not",
      "tr": "lawlā"
    },
    {
      "ar": "أَنْ",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "هَدَىٰنَا",
      "en": "(had) guided us",
      "tr": "hadānā"
    },
    {
      "ar": "ٱللَّهُ ۖ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "لَقَدْ",
      "en": "Certainly",
      "tr": "laqad"
    },
    {
      "ar": "جَآءَتْ",
      "en": "came",
      "tr": "jāat"
    },
    {
      "ar": "رُسُلُ",
      "en": "Messengers",
      "tr": "rusulu"
    },
    {
      "ar": "رَبِّنَا",
      "en": "(of) our Lord",
      "tr": "rabbinā"
    },
    {
      "ar": "بِٱلْحَقِّ ۖ",
      "en": "with the truth",
      "tr": "bil-ḥaqi"
    },
    {
      "ar": "وَنُودُوٓا۟",
      "en": "And they will be addressed",
      "tr": "wanūdū"
    },
    {
      "ar": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "تِلْكُمُ",
      "en": "This",
      "tr": "til'kumu"
    },
    {
      "ar": "ٱلْجَنَّةُ",
      "en": "(is) Paradise",
      "tr": "l-janatu"
    },
    {
      "ar": "أُورِثْتُمُوهَا",
      "en": "you have been made to inherit it",
      "tr": "ūrith'tumūhā"
    },
    {
      "ar": "بِمَا",
      "en": "for what",
      "tr": "bimā"
    },
    {
      "ar": "كُنتُمْ",
      "en": "you used to",
      "tr": "kuntum"
    },
    {
      "ar": "تَعْمَلُونَ",
      "en": "do",
      "tr": "taʿmalūna"
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
  "7:117": [
    {
      "ar": "۞ وَأَوْحَيْنَآ",
      "en": "And We inspired",
      "tr": "wa-awḥaynā"
    },
    {
      "ar": "إِلَىٰ",
      "en": "to",
      "tr": "ilā"
    },
    {
      "ar": "مُوسَىٰٓ",
      "en": "Musa",
      "tr": "mūsā"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أَلْقِ",
      "en": "Throw",
      "tr": "alqi"
    },
    {
      "ar": "عَصَاكَ ۖ",
      "en": "your staff",
      "tr": "ʿaṣāka"
    },
    {
      "ar": "فَإِذَا",
      "en": "and suddenly",
      "tr": "fa-idhā"
    },
    {
      "ar": "هِىَ",
      "en": "it",
      "tr": "hiya"
    },
    {
      "ar": "تَلْقَفُ",
      "en": "swallow(ed)",
      "tr": "talqafu"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "يَأْفِكُونَ",
      "en": "they (were) falsifying",
      "tr": "yafikūna"
    }
  ],
  "7:118": [
    {
      "ar": "فَوَقَعَ",
      "en": "So was established",
      "tr": "fawaqaʿa"
    },
    {
      "ar": "ٱلْحَقُّ",
      "en": "the truth",
      "tr": "l-ḥaqu"
    },
    {
      "ar": "وَبَطَلَ",
      "en": "and became futile",
      "tr": "wabaṭala"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "كَانُوا۟",
      "en": "they used to",
      "tr": "kānū"
    },
    {
      "ar": "يَعْمَلُونَ",
      "en": "do",
      "tr": "yaʿmalūna"
    }
  ],
  "7:119": [
    {
      "ar": "فَغُلِبُوا۟",
      "en": "So they were defeated",
      "tr": "faghulibū"
    },
    {
      "ar": "هُنَالِكَ",
      "en": "there",
      "tr": "hunālika"
    },
    {
      "ar": "وَٱنقَلَبُوا۟",
      "en": "and returned",
      "tr": "wa-inqalabū"
    },
    {
      "ar": "صَـٰغِرِينَ",
      "en": "humiliated",
      "tr": "ṣāghirīna"
    }
  ],
  "7:120": [
    {
      "ar": "وَأُلْقِىَ",
      "en": "And fell down",
      "tr": "wa-ul'qiya"
    },
    {
      "ar": "ٱلسَّحَرَةُ",
      "en": "the magicians",
      "tr": "l-saḥaratu"
    },
    {
      "ar": "سَـٰجِدِينَ",
      "en": "prostrate",
      "tr": "sājidīna"
    }
  ],
  "7:121": [
    {
      "ar": "قَالُوٓا۟",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "ءَامَنَّا",
      "en": "We believe",
      "tr": "āmannā"
    },
    {
      "ar": "بِرَبِّ",
      "en": "in (the) Lord",
      "tr": "birabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "7:122": [
    {
      "ar": "رَبِّ",
      "en": "Lord",
      "tr": "rabbi"
    },
    {
      "ar": "مُوسَىٰ",
      "en": "(of) Musa",
      "tr": "mūsā"
    },
    {
      "ar": "وَهَـٰرُونَ",
      "en": "and Harun",
      "tr": "wahārūna"
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
  "10:57": [
    {
      "ar": "يَـٰٓأَيُّهَا",
      "en": "O mankind",
      "tr": "yāayyuhā"
    },
    {
      "ar": "ٱلنَّاسُ",
      "en": "O mankind",
      "tr": "l-nāsu"
    },
    {
      "ar": "قَدْ",
      "en": "Verily",
      "tr": "qad"
    },
    {
      "ar": "جَآءَتْكُم",
      "en": "has come to you",
      "tr": "jāatkum"
    },
    {
      "ar": "مَّوْعِظَةٌۭ",
      "en": "an instruction",
      "tr": "mawʿiẓatun"
    },
    {
      "ar": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّكُمْ",
      "en": "your Lord",
      "tr": "rabbikum"
    },
    {
      "ar": "وَشِفَآءٌۭ",
      "en": "and a healing",
      "tr": "washifāon"
    },
    {
      "ar": "لِّمَا",
      "en": "for what",
      "tr": "limā"
    },
    {
      "ar": "فِى",
      "en": "(is) in",
      "tr": "fī"
    },
    {
      "ar": "ٱلصُّدُورِ",
      "en": "your breasts",
      "tr": "l-ṣudūri"
    },
    {
      "ar": "وَهُدًۭى",
      "en": "and guidance",
      "tr": "wahudan"
    },
    {
      "ar": "وَرَحْمَةٌۭ",
      "en": "and mercy",
      "tr": "waraḥmatun"
    },
    {
      "ar": "لِّلْمُؤْمِنِينَ",
      "en": "for the believers",
      "tr": "lil'mu'minīna"
    }
  ],
  "10:81": [
    {
      "ar": "فَلَمَّآ",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "أَلْقَوْا۟",
      "en": "they (had) thrown",
      "tr": "alqaw"
    },
    {
      "ar": "قَالَ",
      "en": "Musa said",
      "tr": "qāla"
    },
    {
      "ar": "مُوسَىٰ",
      "en": "Musa said",
      "tr": "mūsā"
    },
    {
      "ar": "مَا",
      "en": "What",
      "tr": "mā"
    },
    {
      "ar": "جِئْتُم",
      "en": "you have brought",
      "tr": "ji'tum"
    },
    {
      "ar": "بِهِ",
      "en": "[it]",
      "tr": "bihi"
    },
    {
      "ar": "ٱلسِّحْرُ ۖ",
      "en": "(is) the magic",
      "tr": "l-siḥ'ru"
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
      "ar": "سَيُبْطِلُهُۥٓ ۖ",
      "en": "will nullify it",
      "tr": "sayub'ṭiluhu"
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
      "ar": "يُصْلِحُ",
      "en": "amend",
      "tr": "yuṣ'liḥu"
    },
    {
      "ar": "عَمَلَ",
      "en": "the work",
      "tr": "ʿamala"
    },
    {
      "ar": "ٱلْمُفْسِدِينَ",
      "en": "(of) the corrupters",
      "tr": "l-muf'sidīna"
    }
  ],
  "10:82": [
    {
      "ar": "وَيُحِقُّ",
      "en": "And Allah will establish",
      "tr": "wayuḥiqqu"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "And Allah will establish",
      "tr": "l-lahu"
    },
    {
      "ar": "ٱلْحَقَّ",
      "en": "the truth",
      "tr": "l-ḥaqa"
    },
    {
      "ar": "بِكَلِمَـٰتِهِۦ",
      "en": "by His words",
      "tr": "bikalimātihi"
    },
    {
      "ar": "وَلَوْ",
      "en": "even if",
      "tr": "walaw"
    },
    {
      "ar": "كَرِهَ",
      "en": "dislike it",
      "tr": "kariha"
    },
    {
      "ar": "ٱلْمُجْرِمُونَ",
      "en": "the criminals",
      "tr": "l-muj'rimūna"
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
  "11:52": [
    {
      "ar": "وَيَـٰقَوْمِ",
      "en": "And O my people",
      "tr": "wayāqawmi"
    },
    {
      "ar": "ٱسْتَغْفِرُوا۟",
      "en": "Ask forgiveness",
      "tr": "is'taghfirū"
    },
    {
      "ar": "رَبَّكُمْ",
      "en": "(of) your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تُوبُوٓا۟",
      "en": "turn in repentance",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَيْهِ",
      "en": "to Him",
      "tr": "ilayhi"
    },
    {
      "ar": "يُرْسِلِ",
      "en": "He will send",
      "tr": "yur'sili"
    },
    {
      "ar": "ٱلسَّمَآءَ",
      "en": "(from) the sky (rain)",
      "tr": "l-samāa"
    },
    {
      "ar": "عَلَيْكُم",
      "en": "upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "مِّدْرَارًۭا",
      "en": "(in) abundance",
      "tr": "mid'rāran"
    },
    {
      "ar": "وَيَزِدْكُمْ",
      "en": "and increase you",
      "tr": "wayazid'kum"
    },
    {
      "ar": "قُوَّةً",
      "en": "(in) strength",
      "tr": "quwwatan"
    },
    {
      "ar": "إِلَىٰ",
      "en": "(added) to",
      "tr": "ilā"
    },
    {
      "ar": "قُوَّتِكُمْ",
      "en": "your strength",
      "tr": "quwwatikum"
    },
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَتَوَلَّوْا۟",
      "en": "turn away",
      "tr": "tatawallaw"
    },
    {
      "ar": "مُجْرِمِينَ",
      "en": "(as) criminals",
      "tr": "muj'rimīna"
    }
  ],
  "11:56": [
    {
      "ar": "إِنِّى",
      "en": "Indeed, I",
      "tr": "innī"
    },
    {
      "ar": "تَوَكَّلْتُ",
      "en": "[I] put my trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "عَلَى",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "رَبِّى",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "وَرَبِّكُم ۚ",
      "en": "and your Lord",
      "tr": "warabbikum"
    },
    {
      "ar": "مَّا",
      "en": "(There is) not",
      "tr": "mā"
    },
    {
      "ar": "مِن",
      "en": "of a moving creature",
      "tr": "min"
    },
    {
      "ar": "دَآبَّةٍ",
      "en": "of a moving creature",
      "tr": "dābbatin"
    },
    {
      "ar": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ءَاخِذٌۢ",
      "en": "has grasp",
      "tr": "ākhidhun"
    },
    {
      "ar": "بِنَاصِيَتِهَآ ۚ",
      "en": "of its forelock",
      "tr": "bināṣiyatihā"
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
      "ar": "عَلَىٰ",
      "en": "(is) on",
      "tr": "ʿalā"
    },
    {
      "ar": "صِرَٰطٍۢ",
      "en": "a path",
      "tr": "ṣirāṭin"
    },
    {
      "ar": "مُّسْتَقِيمٍۢ",
      "en": "straight",
      "tr": "mus'taqīmin"
    }
  ],
  "11:61": [
    {
      "ar": "۞ وَإِلَىٰ",
      "en": "And to",
      "tr": "wa-ilā"
    },
    {
      "ar": "ثَمُودَ",
      "en": "Thamud",
      "tr": "thamūda"
    },
    {
      "ar": "أَخَاهُمْ",
      "en": "(We sent) their brother",
      "tr": "akhāhum"
    },
    {
      "ar": "صَـٰلِحًۭا ۚ",
      "en": "Salih",
      "tr": "ṣāliḥan"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "يَـٰقَوْمِ",
      "en": "O my people",
      "tr": "yāqawmi"
    },
    {
      "ar": "ٱعْبُدُوا۟",
      "en": "Worship",
      "tr": "uʿ'budū"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "مَا",
      "en": "not",
      "tr": "mā"
    },
    {
      "ar": "لَكُم",
      "en": "you have",
      "tr": "lakum"
    },
    {
      "ar": "مِّنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "إِلَـٰهٍ",
      "en": "god",
      "tr": "ilāhin"
    },
    {
      "ar": "غَيْرُهُۥ ۖ",
      "en": "other than Him",
      "tr": "ghayruhu"
    },
    {
      "ar": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "أَنشَأَكُم",
      "en": "produced you",
      "tr": "ansha-akum"
    },
    {
      "ar": "مِّنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَرْضِ",
      "en": "the earth",
      "tr": "l-arḍi"
    },
    {
      "ar": "وَٱسْتَعْمَرَكُمْ",
      "en": "and settled you",
      "tr": "wa-is'taʿmarakum"
    },
    {
      "ar": "فِيهَا",
      "en": "in it",
      "tr": "fīhā"
    },
    {
      "ar": "فَٱسْتَغْفِرُوهُ",
      "en": "So ask forgiveness of Him",
      "tr": "fa-is'taghfirūhu"
    },
    {
      "ar": "ثُمَّ",
      "en": "then",
      "tr": "thumma"
    },
    {
      "ar": "تُوبُوٓا۟",
      "en": "turn in repentance",
      "tr": "tūbū"
    },
    {
      "ar": "إِلَيْهِ ۚ",
      "en": "to Him",
      "tr": "ilayhi"
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
      "ar": "قَرِيبٌۭ",
      "en": "(is) near",
      "tr": "qarībun"
    },
    {
      "ar": "مُّجِيبٌۭ",
      "en": "All-Responsive",
      "tr": "mujībun"
    }
  ],
  "11:71": [
    {
      "ar": "وَٱمْرَأَتُهُۥ",
      "en": "And his wife",
      "tr": "wa-im'ra-atuhu"
    },
    {
      "ar": "قَآئِمَةٌۭ",
      "en": "(was) standing",
      "tr": "qāimatun"
    },
    {
      "ar": "فَضَحِكَتْ",
      "en": "and she laughed",
      "tr": "faḍaḥikat"
    },
    {
      "ar": "فَبَشَّرْنَـٰهَا",
      "en": "Then We gave her glad tidings",
      "tr": "fabasharnāhā"
    },
    {
      "ar": "بِإِسْحَـٰقَ",
      "en": "of Isaac",
      "tr": "bi-is'ḥāqa"
    },
    {
      "ar": "وَمِن",
      "en": "and after",
      "tr": "wamin"
    },
    {
      "ar": "وَرَآءِ",
      "en": "and after",
      "tr": "warāi"
    },
    {
      "ar": "إِسْحَـٰقَ",
      "en": "Isaac",
      "tr": "is'ḥāqa"
    },
    {
      "ar": "يَعْقُوبَ",
      "en": "(of) Yaqub",
      "tr": "yaʿqūba"
    }
  ],
  "11:72": [
    {
      "ar": "قَالَتْ",
      "en": "She said",
      "tr": "qālat"
    },
    {
      "ar": "يَـٰوَيْلَتَىٰٓ",
      "en": "Woe to me",
      "tr": "yāwaylatā"
    },
    {
      "ar": "ءَأَلِدُ",
      "en": "Shall I bear a child",
      "tr": "a-alidu"
    },
    {
      "ar": "وَأَنَا۠",
      "en": "while I am",
      "tr": "wa-anā"
    },
    {
      "ar": "عَجُوزٌۭ",
      "en": "an old woman",
      "tr": "ʿajūzun"
    },
    {
      "ar": "وَهَـٰذَا",
      "en": "and this",
      "tr": "wahādhā"
    },
    {
      "ar": "بَعْلِى",
      "en": "my husband",
      "tr": "baʿlī"
    },
    {
      "ar": "شَيْخًا ۖ",
      "en": "(is) an old man",
      "tr": "shaykhan"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "لَشَىْءٌ",
      "en": "(is) surely a thing",
      "tr": "lashayon"
    },
    {
      "ar": "عَجِيبٌۭ",
      "en": "amazing",
      "tr": "ʿajībun"
    }
  ],
  "11:73": [
    {
      "ar": "قَالُوٓا۟",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "أَتَعْجَبِينَ",
      "en": "Are you amazed",
      "tr": "ataʿjabīna"
    },
    {
      "ar": "مِنْ",
      "en": "at",
      "tr": "min"
    },
    {
      "ar": "أَمْرِ",
      "en": "(the) decree of Allah",
      "tr": "amri"
    },
    {
      "ar": "ٱللَّهِ ۖ",
      "en": "(the) decree of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "رَحْمَتُ",
      "en": "The Mercy of Allah",
      "tr": "raḥmatu"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "The Mercy of Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "وَبَرَكَـٰتُهُۥ",
      "en": "and His blessings",
      "tr": "wabarakātuhu"
    },
    {
      "ar": "عَلَيْكُمْ",
      "en": "(be) upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "أَهْلَ",
      "en": "people",
      "tr": "ahla"
    },
    {
      "ar": "ٱلْبَيْتِ ۚ",
      "en": "(of) the house",
      "tr": "l-bayti"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "حَمِيدٌۭ",
      "en": "(is) All-Praiseworthy",
      "tr": "ḥamīdun"
    },
    {
      "ar": "مَّجِيدٌۭ",
      "en": "All-Glorious",
      "tr": "majīdun"
    }
  ],
  "11:88": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "يَـٰقَوْمِ",
      "en": "O my people",
      "tr": "yāqawmi"
    },
    {
      "ar": "أَرَءَيْتُمْ",
      "en": "Do you see",
      "tr": "ara-aytum"
    },
    {
      "ar": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كُنتُ",
      "en": "I am",
      "tr": "kuntu"
    },
    {
      "ar": "عَلَىٰ",
      "en": "on",
      "tr": "ʿalā"
    },
    {
      "ar": "بَيِّنَةٍۢ",
      "en": "a clear evidence",
      "tr": "bayyinatin"
    },
    {
      "ar": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "رَّبِّى",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "وَرَزَقَنِى",
      "en": "and He has provided me",
      "tr": "warazaqanī"
    },
    {
      "ar": "مِنْهُ",
      "en": "from Himself",
      "tr": "min'hu"
    },
    {
      "ar": "رِزْقًا",
      "en": "a good provision",
      "tr": "riz'qan"
    },
    {
      "ar": "حَسَنًۭا ۚ",
      "en": "a good provision",
      "tr": "ḥasanan"
    },
    {
      "ar": "وَمَآ",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أُرِيدُ",
      "en": "I intend",
      "tr": "urīdu"
    },
    {
      "ar": "أَنْ",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "أُخَالِفَكُمْ",
      "en": "I differ from you",
      "tr": "ukhālifakum"
    },
    {
      "ar": "إِلَىٰ",
      "en": "in",
      "tr": "ilā"
    },
    {
      "ar": "مَآ",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "أَنْهَىٰكُمْ",
      "en": "I forbid you",
      "tr": "anhākum"
    },
    {
      "ar": "عَنْهُ ۚ",
      "en": "from it",
      "tr": "ʿanhu"
    },
    {
      "ar": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "أُرِيدُ",
      "en": "I intend",
      "tr": "urīdu"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "ٱلْإِصْلَـٰحَ",
      "en": "the reform",
      "tr": "l-iṣ'lāḥa"
    },
    {
      "ar": "مَا",
      "en": "as much as I am able",
      "tr": "mā"
    },
    {
      "ar": "ٱسْتَطَعْتُ ۚ",
      "en": "as much as I am able",
      "tr": "is'taṭaʿtu"
    },
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "تَوْفِيقِىٓ",
      "en": "(is) my success",
      "tr": "tawfīqī"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "بِٱللَّهِ ۚ",
      "en": "with Allah",
      "tr": "bil-lahi"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "Upon Him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "تَوَكَّلْتُ",
      "en": "I trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "وَإِلَيْهِ",
      "en": "and to Him",
      "tr": "wa-ilayhi"
    },
    {
      "ar": "أُنِيبُ",
      "en": "I turn",
      "tr": "unību"
    }
  ],
  "12:18": [
    {
      "ar": "وَجَآءُو",
      "en": "And they brought",
      "tr": "wajāū"
    },
    {
      "ar": "عَلَىٰ",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "قَمِيصِهِۦ",
      "en": "his shirt",
      "tr": "qamīṣihi"
    },
    {
      "ar": "بِدَمٍۢ",
      "en": "with false blood",
      "tr": "bidamin"
    },
    {
      "ar": "كَذِبٍۢ ۚ",
      "en": "with false blood",
      "tr": "kadhibin"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "سَوَّلَتْ",
      "en": "has enticed you",
      "tr": "sawwalat"
    },
    {
      "ar": "لَكُمْ",
      "en": "has enticed you",
      "tr": "lakum"
    },
    {
      "ar": "أَنفُسُكُمْ",
      "en": "your souls",
      "tr": "anfusukum"
    },
    {
      "ar": "أَمْرًۭا ۖ",
      "en": "(to) a matter",
      "tr": "amran"
    },
    {
      "ar": "فَصَبْرٌۭ",
      "en": "so patience",
      "tr": "faṣabrun"
    },
    {
      "ar": "جَمِيلٌۭ ۖ",
      "en": "(is) beautiful",
      "tr": "jamīlun"
    },
    {
      "ar": "وَٱللَّهُ",
      "en": "And Allah",
      "tr": "wal-lahu"
    },
    {
      "ar": "ٱلْمُسْتَعَانُ",
      "en": "(is) the One sought for help",
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
      "en": "you describe",
      "tr": "taṣifūna"
    }
  ],
  "12:67": [
    {
      "ar": "وَقَالَ",
      "en": "And he said",
      "tr": "waqāla"
    },
    {
      "ar": "يَـٰبَنِىَّ",
      "en": "O my sons",
      "tr": "yābaniyya"
    },
    {
      "ar": "لَا",
      "en": "(Do) not",
      "tr": "lā"
    },
    {
      "ar": "تَدْخُلُوا۟",
      "en": "enter",
      "tr": "tadkhulū"
    },
    {
      "ar": "مِنۢ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "بَابٍۢ",
      "en": "one gate",
      "tr": "bābin"
    },
    {
      "ar": "وَٰحِدٍۢ",
      "en": "one gate",
      "tr": "wāḥidin"
    },
    {
      "ar": "وَٱدْخُلُوا۟",
      "en": "but enter",
      "tr": "wa-ud'khulū"
    },
    {
      "ar": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "أَبْوَٰبٍۢ",
      "en": "gates",
      "tr": "abwābin"
    },
    {
      "ar": "مُّتَفَرِّقَةٍۢ ۖ",
      "en": "different",
      "tr": "mutafarriqatin"
    },
    {
      "ar": "وَمَآ",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أُغْنِى",
      "en": "I can avail",
      "tr": "ugh'nī"
    },
    {
      "ar": "عَنكُم",
      "en": "you",
      "tr": "ʿankum"
    },
    {
      "ar": "مِّنَ",
      "en": "against",
      "tr": "mina"
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
      "ar": "شَىْءٍ ۖ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "إِنِ",
      "en": "Not",
      "tr": "ini"
    },
    {
      "ar": "ٱلْحُكْمُ",
      "en": "(is) the decision",
      "tr": "l-ḥuk'mu"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "لِلَّهِ ۖ",
      "en": "with Allah",
      "tr": "lillahi"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "upon Him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "تَوَكَّلْتُ ۖ",
      "en": "I put my trust",
      "tr": "tawakkaltu"
    },
    {
      "ar": "وَعَلَيْهِ",
      "en": "and upon Him",
      "tr": "waʿalayhi"
    },
    {
      "ar": "فَلْيَتَوَكَّلِ",
      "en": "let put (their) trust",
      "tr": "falyatawakkali"
    },
    {
      "ar": "ٱلْمُتَوَكِّلُونَ",
      "en": "the ones who put trust",
      "tr": "l-mutawakilūna"
    }
  ],
  "12:83": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "بَلْ",
      "en": "Nay",
      "tr": "bal"
    },
    {
      "ar": "سَوَّلَتْ",
      "en": "have enticed",
      "tr": "sawwalat"
    },
    {
      "ar": "لَكُمْ",
      "en": "you",
      "tr": "lakum"
    },
    {
      "ar": "أَنفُسُكُمْ",
      "en": "your souls",
      "tr": "anfusukum"
    },
    {
      "ar": "أَمْرًۭا ۖ",
      "en": "something",
      "tr": "amran"
    },
    {
      "ar": "فَصَبْرٌۭ",
      "en": "so patience",
      "tr": "faṣabrun"
    },
    {
      "ar": "جَمِيلٌ ۖ",
      "en": "(is) beautiful",
      "tr": "jamīlun"
    },
    {
      "ar": "عَسَى",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "أَن",
      "en": "will bring them to me",
      "tr": "an"
    },
    {
      "ar": "يَأْتِيَنِى",
      "en": "will bring them to me",
      "tr": "yatiyanī"
    },
    {
      "ar": "بِهِمْ",
      "en": "will bring them to me",
      "tr": "bihim"
    },
    {
      "ar": "جَمِيعًا ۚ",
      "en": "all",
      "tr": "jamīʿan"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ٱلْعَلِيمُ",
      "en": "(is) the All-Knower",
      "tr": "l-ʿalīmu"
    },
    {
      "ar": "ٱلْحَكِيمُ",
      "en": "All-Wise",
      "tr": "l-ḥakīmu"
    }
  ],
  "12:86": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "إِنَّمَآ",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "أَشْكُوا۟",
      "en": "I complain",
      "tr": "ashkū"
    },
    {
      "ar": "بَثِّى",
      "en": "(of) my suffering",
      "tr": "bathī"
    },
    {
      "ar": "وَحُزْنِىٓ",
      "en": "and my grief",
      "tr": "waḥuz'nī"
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
      "ar": "وَأَعْلَمُ",
      "en": "and I know",
      "tr": "wa-aʿlamu"
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
      "ar": "تَعْلَمُونَ",
      "en": "you know",
      "tr": "taʿlamūna"
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
  "14:35": [
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
      "ar": "إِبْرَٰهِيمُ",
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
      "en": "Make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "ٱلْبَلَدَ",
      "en": "city",
      "tr": "l-balada"
    },
    {
      "ar": "ءَامِنًۭا",
      "en": "safe",
      "tr": "āminan"
    },
    {
      "ar": "وَٱجْنُبْنِى",
      "en": "and keep me away",
      "tr": "wa-uj'nub'nī"
    },
    {
      "ar": "وَبَنِىَّ",
      "en": "and my sons",
      "tr": "wabaniyya"
    },
    {
      "ar": "أَن",
      "en": "that",
      "tr": "an"
    },
    {
      "ar": "نَّعْبُدَ",
      "en": "we worship",
      "tr": "naʿbuda"
    },
    {
      "ar": "ٱلْأَصْنَامَ",
      "en": "the idols",
      "tr": "l-aṣnāma"
    }
  ],
  "14:36": [
    {
      "ar": "رَبِّ",
      "en": "My Lord",
      "tr": "rabbi"
    },
    {
      "ar": "إِنَّهُنَّ",
      "en": "Indeed, they",
      "tr": "innahunna"
    },
    {
      "ar": "أَضْلَلْنَ",
      "en": "have led astray",
      "tr": "aḍlalna"
    },
    {
      "ar": "كَثِيرًۭا",
      "en": "many",
      "tr": "kathīran"
    },
    {
      "ar": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلنَّاسِ ۖ",
      "en": "the mankind",
      "tr": "l-nāsi"
    },
    {
      "ar": "فَمَن",
      "en": "So whoever",
      "tr": "faman"
    },
    {
      "ar": "تَبِعَنِى",
      "en": "follows me",
      "tr": "tabiʿanī"
    },
    {
      "ar": "فَإِنَّهُۥ",
      "en": "then indeed, he",
      "tr": "fa-innahu"
    },
    {
      "ar": "مِنِّى ۖ",
      "en": "(is) of me",
      "tr": "minnī"
    },
    {
      "ar": "وَمَنْ",
      "en": "and whoever",
      "tr": "waman"
    },
    {
      "ar": "عَصَانِى",
      "en": "disobeys me",
      "tr": "ʿaṣānī"
    },
    {
      "ar": "فَإِنَّكَ",
      "en": "then indeed, You",
      "tr": "fa-innaka"
    },
    {
      "ar": "غَفُورٌۭ",
      "en": "(are) Oft-Forgiving",
      "tr": "ghafūrun"
    },
    {
      "ar": "رَّحِيمٌۭ",
      "en": "Most Merciful",
      "tr": "raḥīmun"
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
  "17:82": [
    {
      "ar": "وَنُنَزِّلُ",
      "en": "And We reveal",
      "tr": "wanunazzilu"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْقُرْءَانِ",
      "en": "the Quran",
      "tr": "l-qur'āni"
    },
    {
      "ar": "مَا",
      "en": "that",
      "tr": "mā"
    },
    {
      "ar": "هُوَ",
      "en": "it",
      "tr": "huwa"
    },
    {
      "ar": "شِفَآءٌۭ",
      "en": "(is) a healing",
      "tr": "shifāon"
    },
    {
      "ar": "وَرَحْمَةٌۭ",
      "en": "and a mercy",
      "tr": "waraḥmatun"
    },
    {
      "ar": "لِّلْمُؤْمِنِينَ ۙ",
      "en": "for the believers",
      "tr": "lil'mu'minīna"
    },
    {
      "ar": "وَلَا",
      "en": "but not",
      "tr": "walā"
    },
    {
      "ar": "يَزِيدُ",
      "en": "it increases",
      "tr": "yazīdu"
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
      "ar": "خَسَارًۭا",
      "en": "(in) loss",
      "tr": "khasāran"
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
  "18:24": [
    {
      "ar": "إِلَّآ",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "أَن",
      "en": "If",
      "tr": "an"
    },
    {
      "ar": "يَشَآءَ",
      "en": "Allah wills",
      "tr": "yashāa"
    },
    {
      "ar": "ٱللَّهُ ۚ",
      "en": "Allah wills",
      "tr": "l-lahu"
    },
    {
      "ar": "وَٱذْكُر",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "رَّبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "إِذَا",
      "en": "when",
      "tr": "idhā"
    },
    {
      "ar": "نَسِيتَ",
      "en": "you forget",
      "tr": "nasīta"
    },
    {
      "ar": "وَقُلْ",
      "en": "and say",
      "tr": "waqul"
    },
    {
      "ar": "عَسَىٰٓ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَهْدِيَنِ",
      "en": "will guide me",
      "tr": "yahdiyani"
    },
    {
      "ar": "رَبِّى",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لِأَقْرَبَ",
      "en": "to a nearer (way)",
      "tr": "li-aqraba"
    },
    {
      "ar": "مِنْ",
      "en": "than",
      "tr": "min"
    },
    {
      "ar": "هَـٰذَا",
      "en": "this",
      "tr": "hādhā"
    },
    {
      "ar": "رَشَدًۭا",
      "en": "right way",
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
  "19:7": [
    {
      "ar": "يَـٰزَكَرِيَّآ",
      "en": "O Zakariya",
      "tr": "yāzakariyyā"
    },
    {
      "ar": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "نُبَشِّرُكَ",
      "en": "[We] give you glad tidings",
      "tr": "nubashiruka"
    },
    {
      "ar": "بِغُلَـٰمٍ",
      "en": "of a boy",
      "tr": "bighulāmin"
    },
    {
      "ar": "ٱسْمُهُۥ",
      "en": "his name",
      "tr": "us'muhu"
    },
    {
      "ar": "يَحْيَىٰ",
      "en": "(will be) Yahya",
      "tr": "yaḥyā"
    },
    {
      "ar": "لَمْ",
      "en": "not",
      "tr": "lam"
    },
    {
      "ar": "نَجْعَل",
      "en": "We (have) assigned",
      "tr": "najʿal"
    },
    {
      "ar": "لَّهُۥ",
      "en": "[for] it",
      "tr": "lahu"
    },
    {
      "ar": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "سَمِيًّۭا",
      "en": "(this) name",
      "tr": "samiyyan"
    }
  ],
  "19:8": [
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
      "ar": "أَنَّىٰ",
      "en": "How",
      "tr": "annā"
    },
    {
      "ar": "يَكُونُ",
      "en": "can",
      "tr": "yakūnu"
    },
    {
      "ar": "لِى",
      "en": "I have",
      "tr": "lī"
    },
    {
      "ar": "غُلَـٰمٌۭ",
      "en": "a boy",
      "tr": "ghulāmun"
    },
    {
      "ar": "وَكَانَتِ",
      "en": "while is",
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
      "ar": "وَقَدْ",
      "en": "and indeed",
      "tr": "waqad"
    },
    {
      "ar": "بَلَغْتُ",
      "en": "I have reached",
      "tr": "balaghtu"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْكِبَرِ",
      "en": "the old age",
      "tr": "l-kibari"
    },
    {
      "ar": "عِتِيًّۭا",
      "en": "extreme",
      "tr": "ʿitiyyan"
    }
  ],
  "19:9": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "كَذَٰلِكَ",
      "en": "Thus",
      "tr": "kadhālika"
    },
    {
      "ar": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "رَبُّكَ",
      "en": "your Lord",
      "tr": "rabbuka"
    },
    {
      "ar": "هُوَ",
      "en": "'It",
      "tr": "huwa"
    },
    {
      "ar": "عَلَىَّ",
      "en": "(is) easy for Me",
      "tr": "ʿalayya"
    },
    {
      "ar": "هَيِّنٌۭ",
      "en": "(is) easy for Me",
      "tr": "hayyinun"
    },
    {
      "ar": "وَقَدْ",
      "en": "and certainly",
      "tr": "waqad"
    },
    {
      "ar": "خَلَقْتُكَ",
      "en": "I (have) created you",
      "tr": "khalaqtuka"
    },
    {
      "ar": "مِن",
      "en": "before",
      "tr": "min"
    },
    {
      "ar": "قَبْلُ",
      "en": "before",
      "tr": "qablu"
    },
    {
      "ar": "وَلَمْ",
      "en": "while not",
      "tr": "walam"
    },
    {
      "ar": "تَكُ",
      "en": "you were",
      "tr": "taku"
    },
    {
      "ar": "شَيْـًۭٔا",
      "en": "anything.'",
      "tr": "shayan"
    }
  ],
  "19:10": [
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
      "ar": "ٱجْعَل",
      "en": "Make",
      "tr": "ij'ʿal"
    },
    {
      "ar": "لِّىٓ",
      "en": "for me",
      "tr": "lī"
    },
    {
      "ar": "ءَايَةًۭ ۚ",
      "en": "a sign",
      "tr": "āyatan"
    },
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "ءَايَتُكَ",
      "en": "Your sign",
      "tr": "āyatuka"
    },
    {
      "ar": "أَلَّا",
      "en": "(is) that not",
      "tr": "allā"
    },
    {
      "ar": "تُكَلِّمَ",
      "en": "you will speak",
      "tr": "tukallima"
    },
    {
      "ar": "ٱلنَّاسَ",
      "en": "(to) the people",
      "tr": "l-nāsa"
    },
    {
      "ar": "ثَلَـٰثَ",
      "en": "(for) three",
      "tr": "thalātha"
    },
    {
      "ar": "لَيَالٍۢ",
      "en": "nights",
      "tr": "layālin"
    },
    {
      "ar": "سَوِيًّۭا",
      "en": "sound",
      "tr": "sawiyyan"
    }
  ],
  "19:11": [
    {
      "ar": "فَخَرَجَ",
      "en": "Then he came out",
      "tr": "fakharaja"
    },
    {
      "ar": "عَلَىٰ",
      "en": "to",
      "tr": "ʿalā"
    },
    {
      "ar": "قَوْمِهِۦ",
      "en": "his people",
      "tr": "qawmihi"
    },
    {
      "ar": "مِنَ",
      "en": "from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمِحْرَابِ",
      "en": "the prayer chamber",
      "tr": "l-miḥ'rābi"
    },
    {
      "ar": "فَأَوْحَىٰٓ",
      "en": "and he signaled",
      "tr": "fa-awḥā"
    },
    {
      "ar": "إِلَيْهِمْ",
      "en": "to them",
      "tr": "ilayhim"
    },
    {
      "ar": "أَن",
      "en": "to",
      "tr": "an"
    },
    {
      "ar": "سَبِّحُوا۟",
      "en": "glorify (Allah)",
      "tr": "sabbiḥū"
    },
    {
      "ar": "بُكْرَةًۭ",
      "en": "(in) the morning",
      "tr": "buk'ratan"
    },
    {
      "ar": "وَعَشِيًّۭا",
      "en": "and (in) the evening",
      "tr": "waʿashiyyan"
    }
  ],
  "19:12": [
    {
      "ar": "يَـٰيَحْيَىٰ",
      "en": "O Yahya",
      "tr": "yāyaḥyā"
    },
    {
      "ar": "خُذِ",
      "en": "Hold",
      "tr": "khudhi"
    },
    {
      "ar": "ٱلْكِتَـٰبَ",
      "en": "the Scripture",
      "tr": "l-kitāba"
    },
    {
      "ar": "بِقُوَّةٍۢ ۖ",
      "en": "with strength",
      "tr": "biquwwatin"
    },
    {
      "ar": "وَءَاتَيْنَـٰهُ",
      "en": "And We gave him",
      "tr": "waātaynāhu"
    },
    {
      "ar": "ٱلْحُكْمَ",
      "en": "[the] wisdom",
      "tr": "l-ḥuk'ma"
    },
    {
      "ar": "صَبِيًّۭا",
      "en": "(when he was) a child",
      "tr": "ṣabiyyan"
    }
  ],
  "19:13": [
    {
      "ar": "وَحَنَانًۭا",
      "en": "And affection",
      "tr": "waḥanānan"
    },
    {
      "ar": "مِّن",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "لَّدُنَّا",
      "en": "Us",
      "tr": "ladunnā"
    },
    {
      "ar": "وَزَكَوٰةًۭ ۖ",
      "en": "and purity",
      "tr": "wazakatan"
    },
    {
      "ar": "وَكَانَ",
      "en": "and he was",
      "tr": "wakāna"
    },
    {
      "ar": "تَقِيًّۭا",
      "en": "righteous",
      "tr": "taqiyyan"
    }
  ],
  "19:14": [
    {
      "ar": "وَبَرًّۢا",
      "en": "And dutiful",
      "tr": "wabarran"
    },
    {
      "ar": "بِوَٰلِدَيْهِ",
      "en": "to his parents",
      "tr": "biwālidayhi"
    },
    {
      "ar": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "يَكُن",
      "en": "he was",
      "tr": "yakun"
    },
    {
      "ar": "جَبَّارًا",
      "en": "a tyrant",
      "tr": "jabbāran"
    },
    {
      "ar": "عَصِيًّۭا",
      "en": "disobedient",
      "tr": "ʿaṣiyyan"
    }
  ],
  "19:15": [
    {
      "ar": "وَسَلَـٰمٌ",
      "en": "And peace be",
      "tr": "wasalāmun"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "upon him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "يَوْمَ",
      "en": "(the) day",
      "tr": "yawma"
    },
    {
      "ar": "وُلِدَ",
      "en": "he was born",
      "tr": "wulida"
    },
    {
      "ar": "وَيَوْمَ",
      "en": "and (the) day",
      "tr": "wayawma"
    },
    {
      "ar": "يَمُوتُ",
      "en": "he dies",
      "tr": "yamūtu"
    },
    {
      "ar": "وَيَوْمَ",
      "en": "and (the) day",
      "tr": "wayawma"
    },
    {
      "ar": "يُبْعَثُ",
      "en": "he will be raised",
      "tr": "yub'ʿathu"
    },
    {
      "ar": "حَيًّۭا",
      "en": "alive",
      "tr": "ḥayyan"
    }
  ],
  "19:56": [
    {
      "ar": "وَٱذْكُرْ",
      "en": "And mention",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "en": "the Book",
      "tr": "l-kitābi"
    },
    {
      "ar": "إِدْرِيسَ ۚ",
      "en": "Idris",
      "tr": "id'rīsa"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "en": "was",
      "tr": "kāna"
    },
    {
      "ar": "صِدِّيقًۭا",
      "en": "truthful",
      "tr": "ṣiddīqan"
    },
    {
      "ar": "نَّبِيًّۭا",
      "en": "a Prophet",
      "tr": "nabiyyan"
    }
  ],
  "19:57": [
    {
      "ar": "وَرَفَعْنَـٰهُ",
      "en": "And We raised him",
      "tr": "warafaʿnāhu"
    },
    {
      "ar": "مَكَانًا",
      "en": "(to) a position",
      "tr": "makānan"
    },
    {
      "ar": "عَلِيًّا",
      "en": "high",
      "tr": "ʿaliyyan"
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
  "20:69": [
    {
      "ar": "وَأَلْقِ",
      "en": "And throw",
      "tr": "wa-alqi"
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
      "ar": "يَمِينِكَ",
      "en": "your right hand",
      "tr": "yamīnika"
    },
    {
      "ar": "تَلْقَفْ",
      "en": "it will swallow up",
      "tr": "talqaf"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "صَنَعُوٓا۟ ۖ",
      "en": "they have made",
      "tr": "ṣanaʿū"
    },
    {
      "ar": "إِنَّمَا",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "صَنَعُوا۟",
      "en": "they (have) made",
      "tr": "ṣanaʿū"
    },
    {
      "ar": "كَيْدُ",
      "en": "a trick",
      "tr": "kaydu"
    },
    {
      "ar": "سَـٰحِرٍۢ ۖ",
      "en": "(of) a magician",
      "tr": "sāḥirin"
    },
    {
      "ar": "وَلَا",
      "en": "and not",
      "tr": "walā"
    },
    {
      "ar": "يُفْلِحُ",
      "en": "will be successful",
      "tr": "yuf'liḥu"
    },
    {
      "ar": "ٱلسَّاحِرُ",
      "en": "the magician",
      "tr": "l-sāḥiru"
    },
    {
      "ar": "حَيْثُ",
      "en": "wherever",
      "tr": "ḥaythu"
    },
    {
      "ar": "أَتَىٰ",
      "en": "he comes",
      "tr": "atā"
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
  "21:84": [
    {
      "ar": "فَٱسْتَجَبْنَا",
      "en": "So We responded",
      "tr": "fa-is'tajabnā"
    },
    {
      "ar": "لَهُۥ",
      "en": "to him",
      "tr": "lahu"
    },
    {
      "ar": "فَكَشَفْنَا",
      "en": "and We removed",
      "tr": "fakashafnā"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "بِهِۦ",
      "en": "(was) on him",
      "tr": "bihi"
    },
    {
      "ar": "مِن",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "ضُرٍّۢ ۖ",
      "en": "(the) adversity",
      "tr": "ḍurrin"
    },
    {
      "ar": "وَءَاتَيْنَـٰهُ",
      "en": "And We gave him",
      "tr": "waātaynāhu"
    },
    {
      "ar": "أَهْلَهُۥ",
      "en": "his family",
      "tr": "ahlahu"
    },
    {
      "ar": "وَمِثْلَهُم",
      "en": "and (the) like thereof",
      "tr": "wamith'lahum"
    },
    {
      "ar": "مَّعَهُمْ",
      "en": "with them",
      "tr": "maʿahum"
    },
    {
      "ar": "رَحْمَةًۭ",
      "en": "(as) Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "مِّنْ",
      "en": "from Ourselves",
      "tr": "min"
    },
    {
      "ar": "عِندِنَا",
      "en": "from Ourselves",
      "tr": "ʿindinā"
    },
    {
      "ar": "وَذِكْرَىٰ",
      "en": "and a reminder",
      "tr": "wadhik'rā"
    },
    {
      "ar": "لِلْعَـٰبِدِينَ",
      "en": "for the worshippers",
      "tr": "lil'ʿābidīna"
    }
  ],
  "21:85": [
    {
      "ar": "وَإِسْمَـٰعِيلَ",
      "en": "And Ishmael",
      "tr": "wa-is'māʿīla"
    },
    {
      "ar": "وَإِدْرِيسَ",
      "en": "and Idris",
      "tr": "wa-id'rīsa"
    },
    {
      "ar": "وَذَا",
      "en": "and Dhul-Kifl",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلْكِفْلِ ۖ",
      "en": "and Dhul-Kifl",
      "tr": "l-kif'li"
    },
    {
      "ar": "كُلٌّۭ",
      "en": "all",
      "tr": "kullun"
    },
    {
      "ar": "مِّنَ",
      "en": "(were) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰبِرِينَ",
      "en": "the patient ones",
      "tr": "l-ṣābirīna"
    }
  ],
  "21:86": [
    {
      "ar": "وَأَدْخَلْنَـٰهُمْ",
      "en": "And We admitted them",
      "tr": "wa-adkhalnāhum"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "رَحْمَتِنَآ ۖ",
      "en": "Our Mercy",
      "tr": "raḥmatinā"
    },
    {
      "ar": "إِنَّهُم",
      "en": "Indeed, they",
      "tr": "innahum"
    },
    {
      "ar": "مِّنَ",
      "en": "(were) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
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
  "26:142": [
    {
      "ar": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَ",
      "en": "said",
      "tr": "qāla"
    },
    {
      "ar": "لَهُمْ",
      "en": "to them",
      "tr": "lahum"
    },
    {
      "ar": "أَخُوهُمْ",
      "en": "their brother",
      "tr": "akhūhum"
    },
    {
      "ar": "صَـٰلِحٌ",
      "en": "Salih",
      "tr": "ṣāliḥun"
    },
    {
      "ar": "أَلَا",
      "en": "Will not",
      "tr": "alā"
    },
    {
      "ar": "تَتَّقُونَ",
      "en": "you fear (Allah)",
      "tr": "tattaqūna"
    }
  ],
  "26:143": [
    {
      "ar": "إِنِّى",
      "en": "Indeed, I am",
      "tr": "innī"
    },
    {
      "ar": "لَكُمْ",
      "en": "to you",
      "tr": "lakum"
    },
    {
      "ar": "رَسُولٌ",
      "en": "a Messenger",
      "tr": "rasūlun"
    },
    {
      "ar": "أَمِينٌۭ",
      "en": "trustworthy",
      "tr": "amīnun"
    }
  ],
  "26:144": [
    {
      "ar": "فَٱتَّقُوا۟",
      "en": "So fear",
      "tr": "fa-ittaqū"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "وَأَطِيعُونِ",
      "en": "and obey me",
      "tr": "wa-aṭīʿūni"
    }
  ],
  "26:145": [
    {
      "ar": "وَمَآ",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "أَسْـَٔلُكُمْ",
      "en": "I ask you",
      "tr": "asalukum"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "for it",
      "tr": "ʿalayhi"
    },
    {
      "ar": "مِنْ",
      "en": "any",
      "tr": "min"
    },
    {
      "ar": "أَجْرٍ ۖ",
      "en": "payment",
      "tr": "ajrin"
    },
    {
      "ar": "إِنْ",
      "en": "Not",
      "tr": "in"
    },
    {
      "ar": "أَجْرِىَ",
      "en": "(is) my payment",
      "tr": "ajriya"
    },
    {
      "ar": "إِلَّا",
      "en": "except",
      "tr": "illā"
    },
    {
      "ar": "عَلَىٰ",
      "en": "from",
      "tr": "ʿalā"
    },
    {
      "ar": "رَبِّ",
      "en": "(the) Lord",
      "tr": "rabbi"
    },
    {
      "ar": "ٱلْعَـٰلَمِينَ",
      "en": "(of) the worlds",
      "tr": "l-ʿālamīna"
    }
  ],
  "26:146": [
    {
      "ar": "أَتُتْرَكُونَ",
      "en": "Will you be left",
      "tr": "atut'rakūna"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "مَا",
      "en": "what",
      "tr": "mā"
    },
    {
      "ar": "هَـٰهُنَآ",
      "en": "(is) here",
      "tr": "hāhunā"
    },
    {
      "ar": "ءَامِنِينَ",
      "en": "secure",
      "tr": "āminīna"
    }
  ],
  "26:147": [
    {
      "ar": "فِى",
      "en": "In",
      "tr": "fī"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "en": "gardens",
      "tr": "jannātin"
    },
    {
      "ar": "وَعُيُونٍۢ",
      "en": "and springs",
      "tr": "waʿuyūnin"
    }
  ],
  "26:148": [
    {
      "ar": "وَزُرُوعٍۢ",
      "en": "And cornfields",
      "tr": "wazurūʿin"
    },
    {
      "ar": "وَنَخْلٍۢ",
      "en": "and date-palms",
      "tr": "wanakhlin"
    },
    {
      "ar": "طَلْعُهَا",
      "en": "its spadix",
      "tr": "ṭalʿuhā"
    },
    {
      "ar": "هَضِيمٌۭ",
      "en": "soft",
      "tr": "haḍīmun"
    }
  ],
  "26:149": [
    {
      "ar": "وَتَنْحِتُونَ",
      "en": "And you carve",
      "tr": "watanḥitūna"
    },
    {
      "ar": "مِنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْجِبَالِ",
      "en": "the mountains",
      "tr": "l-jibāli"
    },
    {
      "ar": "بُيُوتًۭا",
      "en": "houses",
      "tr": "buyūtan"
    },
    {
      "ar": "فَـٰرِهِينَ",
      "en": "skillfully",
      "tr": "fārihīna"
    }
  ],
  "26:150": [
    {
      "ar": "فَٱتَّقُوا۟",
      "en": "So fear",
      "tr": "fa-ittaqū"
    },
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "l-laha"
    },
    {
      "ar": "وَأَطِيعُونِ",
      "en": "and obey me",
      "tr": "wa-aṭīʿūni"
    }
  ],
  "26:151": [
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تُطِيعُوٓا۟",
      "en": "obey",
      "tr": "tuṭīʿū"
    },
    {
      "ar": "أَمْرَ",
      "en": "(the) command",
      "tr": "amra"
    },
    {
      "ar": "ٱلْمُسْرِفِينَ",
      "en": "(of) the transgressors",
      "tr": "l-mus'rifīna"
    }
  ],
  "26:152": [
    {
      "ar": "ٱلَّذِينَ",
      "en": "Those who",
      "tr": "alladhīna"
    },
    {
      "ar": "يُفْسِدُونَ",
      "en": "spread corruption",
      "tr": "yuf'sidūna"
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
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "يُصْلِحُونَ",
      "en": "reform",
      "tr": "yuṣ'liḥūna"
    }
  ],
  "26:153": [
    {
      "ar": "قَالُوٓا۟",
      "en": "They said",
      "tr": "qālū"
    },
    {
      "ar": "إِنَّمَآ",
      "en": "Only",
      "tr": "innamā"
    },
    {
      "ar": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "مِنَ",
      "en": "(are) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْمُسَحَّرِينَ",
      "en": "those bewitched",
      "tr": "l-musaḥarīna"
    }
  ],
  "26:154": [
    {
      "ar": "مَآ",
      "en": "Not",
      "tr": "mā"
    },
    {
      "ar": "أَنتَ",
      "en": "you",
      "tr": "anta"
    },
    {
      "ar": "إِلَّا",
      "en": "(are) except",
      "tr": "illā"
    },
    {
      "ar": "بَشَرٌۭ",
      "en": "a man",
      "tr": "basharun"
    },
    {
      "ar": "مِّثْلُنَا",
      "en": "like us",
      "tr": "mith'lunā"
    },
    {
      "ar": "فَأْتِ",
      "en": "so bring",
      "tr": "fati"
    },
    {
      "ar": "بِـَٔايَةٍ",
      "en": "a sign",
      "tr": "biāyatin"
    },
    {
      "ar": "إِن",
      "en": "if",
      "tr": "in"
    },
    {
      "ar": "كُنتَ",
      "en": "you",
      "tr": "kunta"
    },
    {
      "ar": "مِنَ",
      "en": "(are) of",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰدِقِينَ",
      "en": "the truthful",
      "tr": "l-ṣādiqīna"
    }
  ],
  "26:155": [
    {
      "ar": "قَالَ",
      "en": "He said",
      "tr": "qāla"
    },
    {
      "ar": "هَـٰذِهِۦ",
      "en": "This",
      "tr": "hādhihi"
    },
    {
      "ar": "نَاقَةٌۭ",
      "en": "(is) a she-camel",
      "tr": "nāqatun"
    },
    {
      "ar": "لَّهَا",
      "en": "For her",
      "tr": "lahā"
    },
    {
      "ar": "شِرْبٌۭ",
      "en": "(is a share of) drink",
      "tr": "shir'bun"
    },
    {
      "ar": "وَلَكُمْ",
      "en": "and for you",
      "tr": "walakum"
    },
    {
      "ar": "شِرْبُ",
      "en": "(is a share of) drink",
      "tr": "shir'bu"
    },
    {
      "ar": "يَوْمٍۢ",
      "en": "(on) a day",
      "tr": "yawmin"
    },
    {
      "ar": "مَّعْلُومٍۢ",
      "en": "known",
      "tr": "maʿlūmin"
    }
  ],
  "26:156": [
    {
      "ar": "وَلَا",
      "en": "And (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَمَسُّوهَا",
      "en": "touch her",
      "tr": "tamassūhā"
    },
    {
      "ar": "بِسُوٓءٍۢ",
      "en": "with harm",
      "tr": "bisūin"
    },
    {
      "ar": "فَيَأْخُذَكُمْ",
      "en": "lest seize you",
      "tr": "fayakhudhakum"
    },
    {
      "ar": "عَذَابُ",
      "en": "(the) punishment",
      "tr": "ʿadhābu"
    },
    {
      "ar": "يَوْمٍ",
      "en": "(of) a Day",
      "tr": "yawmin"
    },
    {
      "ar": "عَظِيمٍۢ",
      "en": "Great",
      "tr": "ʿaẓīmin"
    }
  ],
  "26:157": [
    {
      "ar": "فَعَقَرُوهَا",
      "en": "But they hamstrung her",
      "tr": "faʿaqarūhā"
    },
    {
      "ar": "فَأَصْبَحُوا۟",
      "en": "then they became",
      "tr": "fa-aṣbaḥū"
    },
    {
      "ar": "نَـٰدِمِينَ",
      "en": "regretful",
      "tr": "nādimīna"
    }
  ],
  "26:158": [
    {
      "ar": "فَأَخَذَهُمُ",
      "en": "So seized them",
      "tr": "fa-akhadhahumu"
    },
    {
      "ar": "ٱلْعَذَابُ ۗ",
      "en": "the punishment",
      "tr": "l-ʿadhābu"
    },
    {
      "ar": "إِنَّ",
      "en": "Indeed",
      "tr": "inna"
    },
    {
      "ar": "فِى",
      "en": "in",
      "tr": "fī"
    },
    {
      "ar": "ذَٰلِكَ",
      "en": "that",
      "tr": "dhālika"
    },
    {
      "ar": "لَـَٔايَةًۭ ۖ",
      "en": "surely is a sign",
      "tr": "laāyatan"
    },
    {
      "ar": "وَمَا",
      "en": "but not",
      "tr": "wamā"
    },
    {
      "ar": "كَانَ",
      "en": "are",
      "tr": "kāna"
    },
    {
      "ar": "أَكْثَرُهُم",
      "en": "most of them",
      "tr": "aktharuhum"
    },
    {
      "ar": "مُّؤْمِنِينَ",
      "en": "believers",
      "tr": "mu'minīna"
    }
  ],
  "26:159": [
    {
      "ar": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "رَبَّكَ",
      "en": "your Lord",
      "tr": "rabbaka"
    },
    {
      "ar": "لَهُوَ",
      "en": "surely He",
      "tr": "lahuwa"
    },
    {
      "ar": "ٱلْعَزِيزُ",
      "en": "(is) the All-Mighty",
      "tr": "l-ʿazīzu"
    },
    {
      "ar": "ٱلرَّحِيمُ",
      "en": "the Most Merciful",
      "tr": "l-raḥīmu"
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
  "27:15": [
    {
      "ar": "وَلَقَدْ",
      "en": "And verily",
      "tr": "walaqad"
    },
    {
      "ar": "ءَاتَيْنَا",
      "en": "We gave",
      "tr": "ātaynā"
    },
    {
      "ar": "دَاوُۥدَ",
      "en": "Dawood",
      "tr": "dāwūda"
    },
    {
      "ar": "وَسُلَيْمَـٰنَ",
      "en": "and Sulaiman",
      "tr": "wasulaymāna"
    },
    {
      "ar": "عِلْمًۭا ۖ",
      "en": "knowledge",
      "tr": "ʿil'man"
    },
    {
      "ar": "وَقَالَا",
      "en": "and they said",
      "tr": "waqālā"
    },
    {
      "ar": "ٱلْحَمْدُ",
      "en": "Praise be",
      "tr": "l-ḥamdu"
    },
    {
      "ar": "لِلَّهِ",
      "en": "to Allah",
      "tr": "lillahi"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "the One Who",
      "tr": "alladhī"
    },
    {
      "ar": "فَضَّلَنَا",
      "en": "has favored us",
      "tr": "faḍḍalanā"
    },
    {
      "ar": "عَلَىٰ",
      "en": "over",
      "tr": "ʿalā"
    },
    {
      "ar": "كَثِيرٍۢ",
      "en": "many",
      "tr": "kathīrin"
    },
    {
      "ar": "مِّنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِبَادِهِ",
      "en": "His servants",
      "tr": "ʿibādihi"
    },
    {
      "ar": "ٱلْمُؤْمِنِينَ",
      "en": "the believers",
      "tr": "l-mu'minīna"
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
  "27:40": [
    {
      "ar": "قَالَ",
      "en": "Said",
      "tr": "qāla"
    },
    {
      "ar": "ٱلَّذِى",
      "en": "one who",
      "tr": "alladhī"
    },
    {
      "ar": "عِندَهُۥ",
      "en": "with him",
      "tr": "ʿindahu"
    },
    {
      "ar": "عِلْمٌۭ",
      "en": "(was) knowledge",
      "tr": "ʿil'mun"
    },
    {
      "ar": "مِّنَ",
      "en": "of",
      "tr": "mina"
    },
    {
      "ar": "ٱلْكِتَـٰبِ",
      "en": "the Scripture",
      "tr": "l-kitābi"
    },
    {
      "ar": "أَنَا۠",
      "en": "I",
      "tr": "anā"
    },
    {
      "ar": "ءَاتِيكَ",
      "en": "will bring it to you",
      "tr": "ātīka"
    },
    {
      "ar": "بِهِۦ",
      "en": "will bring it to you",
      "tr": "bihi"
    },
    {
      "ar": "قَبْلَ",
      "en": "before",
      "tr": "qabla"
    },
    {
      "ar": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَرْتَدَّ",
      "en": "returns",
      "tr": "yartadda"
    },
    {
      "ar": "إِلَيْكَ",
      "en": "to you",
      "tr": "ilayka"
    },
    {
      "ar": "طَرْفُكَ ۚ",
      "en": "your glance",
      "tr": "ṭarfuka"
    },
    {
      "ar": "فَلَمَّا",
      "en": "Then when",
      "tr": "falammā"
    },
    {
      "ar": "رَءَاهُ",
      "en": "he saw it",
      "tr": "raāhu"
    },
    {
      "ar": "مُسْتَقِرًّا",
      "en": "placed",
      "tr": "mus'taqirran"
    },
    {
      "ar": "عِندَهُۥ",
      "en": "before him",
      "tr": "ʿindahu"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "هَـٰذَا",
      "en": "This",
      "tr": "hādhā"
    },
    {
      "ar": "مِن",
      "en": "(is) from",
      "tr": "min"
    },
    {
      "ar": "فَضْلِ",
      "en": "(the) Favor",
      "tr": "faḍli"
    },
    {
      "ar": "رَبِّى",
      "en": "(of) my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "لِيَبْلُوَنِىٓ",
      "en": "to test me",
      "tr": "liyabluwanī"
    },
    {
      "ar": "ءَأَشْكُرُ",
      "en": "whether I am grateful",
      "tr": "a-ashkuru"
    },
    {
      "ar": "أَمْ",
      "en": "or",
      "tr": "am"
    },
    {
      "ar": "أَكْفُرُ ۖ",
      "en": "I am ungrateful",
      "tr": "akfuru"
    },
    {
      "ar": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "شَكَرَ",
      "en": "(is) grateful",
      "tr": "shakara"
    },
    {
      "ar": "فَإِنَّمَا",
      "en": "then only",
      "tr": "fa-innamā"
    },
    {
      "ar": "يَشْكُرُ",
      "en": "he is grateful",
      "tr": "yashkuru"
    },
    {
      "ar": "لِنَفْسِهِۦ ۖ",
      "en": "for his own soul",
      "tr": "linafsihi"
    },
    {
      "ar": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "كَفَرَ",
      "en": "(is) ungrateful",
      "tr": "kafara"
    },
    {
      "ar": "فَإِنَّ",
      "en": "then indeed",
      "tr": "fa-inna"
    },
    {
      "ar": "رَبِّى",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "غَنِىٌّۭ",
      "en": "(is) Self-sufficient",
      "tr": "ghaniyyun"
    },
    {
      "ar": "كَرِيمٌۭ",
      "en": "Noble",
      "tr": "karīmun"
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
  "28:17": [
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
      "ar": "بِمَآ",
      "en": "Because",
      "tr": "bimā"
    },
    {
      "ar": "أَنْعَمْتَ",
      "en": "You have favored",
      "tr": "anʿamta"
    },
    {
      "ar": "عَلَىَّ",
      "en": "[on] me",
      "tr": "ʿalayya"
    },
    {
      "ar": "فَلَنْ",
      "en": "so not",
      "tr": "falan"
    },
    {
      "ar": "أَكُونَ",
      "en": "I will be",
      "tr": "akūna"
    },
    {
      "ar": "ظَهِيرًۭا",
      "en": "a supporter",
      "tr": "ẓahīran"
    },
    {
      "ar": "لِّلْمُجْرِمِينَ",
      "en": "(of) the criminals",
      "tr": "lil'muj'rimīna"
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
  "28:22": [
    {
      "ar": "وَلَمَّا",
      "en": "And when",
      "tr": "walammā"
    },
    {
      "ar": "تَوَجَّهَ",
      "en": "he turned his face",
      "tr": "tawajjaha"
    },
    {
      "ar": "تِلْقَآءَ",
      "en": "towards",
      "tr": "til'qāa"
    },
    {
      "ar": "مَدْيَنَ",
      "en": "Madyan",
      "tr": "madyana"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "عَسَىٰ",
      "en": "Perhaps",
      "tr": "ʿasā"
    },
    {
      "ar": "رَبِّىٓ",
      "en": "my Lord",
      "tr": "rabbī"
    },
    {
      "ar": "أَن",
      "en": "[that]",
      "tr": "an"
    },
    {
      "ar": "يَهْدِيَنِى",
      "en": "will guide me",
      "tr": "yahdiyanī"
    },
    {
      "ar": "سَوَآءَ",
      "en": "(to the) sound",
      "tr": "sawāa"
    },
    {
      "ar": "ٱلسَّبِيلِ",
      "en": "way",
      "tr": "l-sabīli"
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
  "37:112": [
    {
      "ar": "وَبَشَّرْنَـٰهُ",
      "en": "And We gave him glad tidings",
      "tr": "wabasharnāhu"
    },
    {
      "ar": "بِإِسْحَـٰقَ",
      "en": "of Isaac",
      "tr": "bi-is'ḥāqa"
    },
    {
      "ar": "نَبِيًّۭا",
      "en": "a Prophet",
      "tr": "nabiyyan"
    },
    {
      "ar": "مِّنَ",
      "en": "among",
      "tr": "mina"
    },
    {
      "ar": "ٱلصَّـٰلِحِينَ",
      "en": "the righteous",
      "tr": "l-ṣāliḥīna"
    }
  ],
  "37:113": [
    {
      "ar": "وَبَـٰرَكْنَا",
      "en": "And We blessed",
      "tr": "wabāraknā"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "وَعَلَىٰٓ",
      "en": "and [on]",
      "tr": "waʿalā"
    },
    {
      "ar": "إِسْحَـٰقَ ۚ",
      "en": "Isaac",
      "tr": "is'ḥāqa"
    },
    {
      "ar": "وَمِن",
      "en": "And of",
      "tr": "wamin"
    },
    {
      "ar": "ذُرِّيَّتِهِمَا",
      "en": "their offspring",
      "tr": "dhurriyyatihimā"
    },
    {
      "ar": "مُحْسِنٌۭ",
      "en": "(are) good-doers",
      "tr": "muḥ'sinun"
    },
    {
      "ar": "وَظَالِمٌۭ",
      "en": "and unjust",
      "tr": "waẓālimun"
    },
    {
      "ar": "لِّنَفْسِهِۦ",
      "en": "to himself",
      "tr": "linafsihi"
    },
    {
      "ar": "مُبِينٌۭ",
      "en": "clear",
      "tr": "mubīnun"
    }
  ],
  "37:123": [
    {
      "ar": "وَإِنَّ",
      "en": "And indeed",
      "tr": "wa-inna"
    },
    {
      "ar": "إِلْيَاسَ",
      "en": "Elijah",
      "tr": "il'yāsa"
    },
    {
      "ar": "لَمِنَ",
      "en": "(was) surely of",
      "tr": "lamina"
    },
    {
      "ar": "ٱلْمُرْسَلِينَ",
      "en": "the Messengers",
      "tr": "l-mur'salīna"
    }
  ],
  "37:124": [
    {
      "ar": "إِذْ",
      "en": "When",
      "tr": "idh"
    },
    {
      "ar": "قَالَ",
      "en": "he said",
      "tr": "qāla"
    },
    {
      "ar": "لِقَوْمِهِۦٓ",
      "en": "to his people",
      "tr": "liqawmihi"
    },
    {
      "ar": "أَلَا",
      "en": "Will not",
      "tr": "alā"
    },
    {
      "ar": "تَتَّقُونَ",
      "en": "you fear",
      "tr": "tattaqūna"
    }
  ],
  "37:125": [
    {
      "ar": "أَتَدْعُونَ",
      "en": "Do you call",
      "tr": "atadʿūna"
    },
    {
      "ar": "بَعْلًۭا",
      "en": "Baal",
      "tr": "baʿlan"
    },
    {
      "ar": "وَتَذَرُونَ",
      "en": "and you forsake",
      "tr": "watadharūna"
    },
    {
      "ar": "أَحْسَنَ",
      "en": "(the) Best",
      "tr": "aḥsana"
    },
    {
      "ar": "ٱلْخَـٰلِقِينَ",
      "en": "(of) Creators",
      "tr": "l-khāliqīna"
    }
  ],
  "37:126": [
    {
      "ar": "ٱللَّهَ",
      "en": "Allah",
      "tr": "al-laha"
    },
    {
      "ar": "رَبَّكُمْ",
      "en": "your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "وَرَبَّ",
      "en": "and (the) Lord",
      "tr": "warabba"
    },
    {
      "ar": "ءَابَآئِكُمُ",
      "en": "(of) your forefathers",
      "tr": "ābāikumu"
    },
    {
      "ar": "ٱلْأَوَّلِينَ",
      "en": "(of) your forefathers",
      "tr": "l-awalīna"
    }
  ],
  "37:127": [
    {
      "ar": "فَكَذَّبُوهُ",
      "en": "But they denied him",
      "tr": "fakadhabūhu"
    },
    {
      "ar": "فَإِنَّهُمْ",
      "en": "so indeed, they",
      "tr": "fa-innahum"
    },
    {
      "ar": "لَمُحْضَرُونَ",
      "en": "(will) surely be brought",
      "tr": "lamuḥ'ḍarūna"
    }
  ],
  "37:128": [
    {
      "ar": "إِلَّا",
      "en": "Except",
      "tr": "illā"
    },
    {
      "ar": "عِبَادَ",
      "en": "(the) slaves",
      "tr": "ʿibāda"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "(of) Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "ٱلْمُخْلَصِينَ",
      "en": "the chosen ones",
      "tr": "l-mukh'laṣīna"
    }
  ],
  "37:129": [
    {
      "ar": "وَتَرَكْنَا",
      "en": "And We left",
      "tr": "wataraknā"
    },
    {
      "ar": "عَلَيْهِ",
      "en": "for him",
      "tr": "ʿalayhi"
    },
    {
      "ar": "فِى",
      "en": "among",
      "tr": "fī"
    },
    {
      "ar": "ٱلْـَٔاخِرِينَ",
      "en": "the later generations",
      "tr": "l-ākhirīna"
    }
  ],
  "37:130": [
    {
      "ar": "سَلَـٰمٌ",
      "en": "Peace be",
      "tr": "salāmun"
    },
    {
      "ar": "عَلَىٰٓ",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "إِلْ يَاسِينَ",
      "en": "Elijah",
      "tr": "il yāsīna"
    }
  ],
  "37:131": [
    {
      "ar": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "كَذَٰلِكَ",
      "en": "thus",
      "tr": "kadhālika"
    },
    {
      "ar": "نَجْزِى",
      "en": "reward",
      "tr": "najzī"
    },
    {
      "ar": "ٱلْمُحْسِنِينَ",
      "en": "the good-doers",
      "tr": "l-muḥ'sinīna"
    }
  ],
  "37:132": [
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, he (was)",
      "tr": "innahu"
    },
    {
      "ar": "مِنْ",
      "en": "of",
      "tr": "min"
    },
    {
      "ar": "عِبَادِنَا",
      "en": "Our slaves",
      "tr": "ʿibādinā"
    },
    {
      "ar": "ٱلْمُؤْمِنِينَ",
      "en": "believing",
      "tr": "l-mu'minīna"
    }
  ],
  "38:41": [
    {
      "ar": "وَٱذْكُرْ",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "عَبْدَنَآ",
      "en": "Our slave",
      "tr": "ʿabdanā"
    },
    {
      "ar": "أَيُّوبَ",
      "en": "Ayyub",
      "tr": "ayyūba"
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
      "en": "his Lord",
      "tr": "rabbahu"
    },
    {
      "ar": "أَنِّى",
      "en": "That [I]",
      "tr": "annī"
    },
    {
      "ar": "مَسَّنِىَ",
      "en": "(has) touched me",
      "tr": "massaniya"
    },
    {
      "ar": "ٱلشَّيْطَـٰنُ",
      "en": "Shaitaan",
      "tr": "l-shayṭānu"
    },
    {
      "ar": "بِنُصْبٍۢ",
      "en": "with distress",
      "tr": "binuṣ'bin"
    },
    {
      "ar": "وَعَذَابٍ",
      "en": "and suffering",
      "tr": "waʿadhābin"
    }
  ],
  "38:42": [
    {
      "ar": "ٱرْكُضْ",
      "en": "Strike",
      "tr": "ur'kuḍ"
    },
    {
      "ar": "بِرِجْلِكَ ۖ",
      "en": "with your foot",
      "tr": "birij'lika"
    },
    {
      "ar": "هَـٰذَا",
      "en": "This",
      "tr": "hādhā"
    },
    {
      "ar": "مُغْتَسَلٌۢ",
      "en": "(is a spring of) water to bathe",
      "tr": "mugh'tasalun"
    },
    {
      "ar": "بَارِدٌۭ",
      "en": "cool",
      "tr": "bāridun"
    },
    {
      "ar": "وَشَرَابٌۭ",
      "en": "and a drink",
      "tr": "washarābun"
    }
  ],
  "38:43": [
    {
      "ar": "وَوَهَبْنَا",
      "en": "And We granted",
      "tr": "wawahabnā"
    },
    {
      "ar": "لَهُۥٓ",
      "en": "[to] him",
      "tr": "lahu"
    },
    {
      "ar": "أَهْلَهُۥ",
      "en": "his family",
      "tr": "ahlahu"
    },
    {
      "ar": "وَمِثْلَهُم",
      "en": "and a like of them",
      "tr": "wamith'lahum"
    },
    {
      "ar": "مَّعَهُمْ",
      "en": "with them",
      "tr": "maʿahum"
    },
    {
      "ar": "رَحْمَةًۭ",
      "en": "a Mercy",
      "tr": "raḥmatan"
    },
    {
      "ar": "مِّنَّا",
      "en": "from Us",
      "tr": "minnā"
    },
    {
      "ar": "وَذِكْرَىٰ",
      "en": "and a Reminder",
      "tr": "wadhik'rā"
    },
    {
      "ar": "لِأُو۟لِى",
      "en": "for those of understanding",
      "tr": "li-ulī"
    },
    {
      "ar": "ٱلْأَلْبَـٰبِ",
      "en": "for those of understanding",
      "tr": "l-albābi"
    }
  ],
  "38:44": [
    {
      "ar": "وَخُذْ",
      "en": "And take",
      "tr": "wakhudh"
    },
    {
      "ar": "بِيَدِكَ",
      "en": "in your hand",
      "tr": "biyadika"
    },
    {
      "ar": "ضِغْثًۭا",
      "en": "a bunch",
      "tr": "ḍigh'than"
    },
    {
      "ar": "فَٱضْرِب",
      "en": "and strike",
      "tr": "fa-iḍ'rib"
    },
    {
      "ar": "بِّهِۦ",
      "en": "with it",
      "tr": "bihi"
    },
    {
      "ar": "وَلَا",
      "en": "and (do) not",
      "tr": "walā"
    },
    {
      "ar": "تَحْنَثْ ۗ",
      "en": "break (your) oath",
      "tr": "taḥnath"
    },
    {
      "ar": "إِنَّا",
      "en": "Indeed, We",
      "tr": "innā"
    },
    {
      "ar": "وَجَدْنَـٰهُ",
      "en": "[We] found him",
      "tr": "wajadnāhu"
    },
    {
      "ar": "صَابِرًۭا ۚ",
      "en": "patient",
      "tr": "ṣābiran"
    },
    {
      "ar": "نِّعْمَ",
      "en": "an excellent",
      "tr": "niʿ'ma"
    },
    {
      "ar": "ٱلْعَبْدُ ۖ",
      "en": "slave",
      "tr": "l-ʿabdu"
    },
    {
      "ar": "إِنَّهُۥٓ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "أَوَّابٌۭ",
      "en": "repeatedly turned",
      "tr": "awwābun"
    }
  ],
  "38:48": [
    {
      "ar": "وَٱذْكُرْ",
      "en": "And remember",
      "tr": "wa-udh'kur"
    },
    {
      "ar": "إِسْمَـٰعِيلَ",
      "en": "Ishmael",
      "tr": "is'māʿīla"
    },
    {
      "ar": "وَٱلْيَسَعَ",
      "en": "and Elisha",
      "tr": "wal-yasaʿa"
    },
    {
      "ar": "وَذَا",
      "en": "and Dhul-kifl",
      "tr": "wadhā"
    },
    {
      "ar": "ٱلْكِفْلِ ۖ",
      "en": "and Dhul-kifl",
      "tr": "l-kif'li"
    },
    {
      "ar": "وَكُلٌّۭ",
      "en": "and all",
      "tr": "wakullun"
    },
    {
      "ar": "مِّنَ",
      "en": "(are) from",
      "tr": "mina"
    },
    {
      "ar": "ٱلْأَخْيَارِ",
      "en": "the best",
      "tr": "l-akhyāri"
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
  "65:3": [
    {
      "ar": "وَيَرْزُقْهُ",
      "en": "And He will provide for him",
      "tr": "wayarzuq'hu"
    },
    {
      "ar": "مِنْ",
      "en": "from",
      "tr": "min"
    },
    {
      "ar": "حَيْثُ",
      "en": "where",
      "tr": "ḥaythu"
    },
    {
      "ar": "لَا",
      "en": "not",
      "tr": "lā"
    },
    {
      "ar": "يَحْتَسِبُ ۚ",
      "en": "he thinks",
      "tr": "yaḥtasibu"
    },
    {
      "ar": "وَمَن",
      "en": "And whoever",
      "tr": "waman"
    },
    {
      "ar": "يَتَوَكَّلْ",
      "en": "puts his trust",
      "tr": "yatawakkal"
    },
    {
      "ar": "عَلَى",
      "en": "upon",
      "tr": "ʿalā"
    },
    {
      "ar": "ٱللَّهِ",
      "en": "Allah",
      "tr": "l-lahi"
    },
    {
      "ar": "فَهُوَ",
      "en": "then He",
      "tr": "fahuwa"
    },
    {
      "ar": "حَسْبُهُۥٓ ۚ",
      "en": "(is) sufficient for him",
      "tr": "ḥasbuhu"
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
      "ar": "بَـٰلِغُ",
      "en": "(will) accomplish",
      "tr": "bālighu"
    },
    {
      "ar": "أَمْرِهِۦ ۚ",
      "en": "His purpose",
      "tr": "amrihi"
    },
    {
      "ar": "قَدْ",
      "en": "Indeed",
      "tr": "qad"
    },
    {
      "ar": "جَعَلَ",
      "en": "has set",
      "tr": "jaʿala"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "لِكُلِّ",
      "en": "for every",
      "tr": "likulli"
    },
    {
      "ar": "شَىْءٍۢ",
      "en": "thing",
      "tr": "shayin"
    },
    {
      "ar": "قَدْرًۭا",
      "en": "a measure",
      "tr": "qadran"
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
  "68:51": [
    {
      "ar": "وَإِن",
      "en": "And indeed",
      "tr": "wa-in"
    },
    {
      "ar": "يَكَادُ",
      "en": "would almost",
      "tr": "yakādu"
    },
    {
      "ar": "ٱلَّذِينَ",
      "en": "those who",
      "tr": "alladhīna"
    },
    {
      "ar": "كَفَرُوا۟",
      "en": "disbelieve",
      "tr": "kafarū"
    },
    {
      "ar": "لَيُزْلِقُونَكَ",
      "en": "surely make you slip",
      "tr": "layuz'liqūnaka"
    },
    {
      "ar": "بِأَبْصَـٰرِهِمْ",
      "en": "with their look",
      "tr": "bi-abṣārihim"
    },
    {
      "ar": "لَمَّا",
      "en": "when",
      "tr": "lammā"
    },
    {
      "ar": "سَمِعُوا۟",
      "en": "they hear",
      "tr": "samiʿū"
    },
    {
      "ar": "ٱلذِّكْرَ",
      "en": "the Message",
      "tr": "l-dhik'ra"
    },
    {
      "ar": "وَيَقُولُونَ",
      "en": "and they say",
      "tr": "wayaqūlūna"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, he",
      "tr": "innahu"
    },
    {
      "ar": "لَمَجْنُونٌۭ",
      "en": "(is) surely mad",
      "tr": "lamajnūnun"
    }
  ],
  "68:52": [
    {
      "ar": "وَمَا",
      "en": "And not",
      "tr": "wamā"
    },
    {
      "ar": "هُوَ",
      "en": "it (is)",
      "tr": "huwa"
    },
    {
      "ar": "إِلَّا",
      "en": "but",
      "tr": "illā"
    },
    {
      "ar": "ذِكْرٌۭ",
      "en": "a Reminder",
      "tr": "dhik'run"
    },
    {
      "ar": "لِّلْعَـٰلَمِينَ",
      "en": "to the worlds",
      "tr": "lil'ʿālamīna"
    }
  ],
  "71:10": [
    {
      "ar": "فَقُلْتُ",
      "en": "Then I said",
      "tr": "faqul'tu"
    },
    {
      "ar": "ٱسْتَغْفِرُوا۟",
      "en": "Ask forgiveness",
      "tr": "is'taghfirū"
    },
    {
      "ar": "رَبَّكُمْ",
      "en": "(from) your Lord",
      "tr": "rabbakum"
    },
    {
      "ar": "إِنَّهُۥ",
      "en": "Indeed, He",
      "tr": "innahu"
    },
    {
      "ar": "كَانَ",
      "en": "is",
      "tr": "kāna"
    },
    {
      "ar": "غَفَّارًۭا",
      "en": "Oft-Forgiving",
      "tr": "ghaffāran"
    }
  ],
  "71:11": [
    {
      "ar": "يُرْسِلِ",
      "en": "He will send down",
      "tr": "yur'sili"
    },
    {
      "ar": "ٱلسَّمَآءَ",
      "en": "(rain from) the sky",
      "tr": "l-samāa"
    },
    {
      "ar": "عَلَيْكُم",
      "en": "upon you",
      "tr": "ʿalaykum"
    },
    {
      "ar": "مِّدْرَارًۭا",
      "en": "(in) abundance",
      "tr": "mid'rāran"
    }
  ],
  "71:12": [
    {
      "ar": "وَيُمْدِدْكُم",
      "en": "And provide you",
      "tr": "wayum'did'kum"
    },
    {
      "ar": "بِأَمْوَٰلٍۢ",
      "en": "with wealth",
      "tr": "bi-amwālin"
    },
    {
      "ar": "وَبَنِينَ",
      "en": "and children",
      "tr": "wabanīna"
    },
    {
      "ar": "وَيَجْعَل",
      "en": "and make",
      "tr": "wayajʿal"
    },
    {
      "ar": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "جَنَّـٰتٍۢ",
      "en": "gardens",
      "tr": "jannātin"
    },
    {
      "ar": "وَيَجْعَل",
      "en": "and make",
      "tr": "wayajʿal"
    },
    {
      "ar": "لَّكُمْ",
      "en": "for you",
      "tr": "lakum"
    },
    {
      "ar": "أَنْهَـٰرًۭا",
      "en": "rivers",
      "tr": "anhāran"
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
  "112:1": [
    {
      "ar": "قُلْ",
      "en": "Say",
      "tr": "qul"
    },
    {
      "ar": "هُوَ",
      "en": "He",
      "tr": "huwa"
    },
    {
      "ar": "ٱللَّهُ",
      "en": "(is) Allah",
      "tr": "l-lahu"
    },
    {
      "ar": "أَحَدٌ",
      "en": "the One",
      "tr": "aḥadun"
    }
  ],
  "112:2": [
    {
      "ar": "ٱللَّهُ",
      "en": "Allah",
      "tr": "al-lahu"
    },
    {
      "ar": "ٱلصَّمَدُ",
      "en": "the Eternal, the Absolute",
      "tr": "l-ṣamadu"
    }
  ],
  "112:3": [
    {
      "ar": "لَمْ",
      "en": "Not",
      "tr": "lam"
    },
    {
      "ar": "يَلِدْ",
      "en": "He begets",
      "tr": "yalid"
    },
    {
      "ar": "وَلَمْ",
      "en": "and not",
      "tr": "walam"
    },
    {
      "ar": "يُولَدْ",
      "en": "He is begotten",
      "tr": "yūlad"
    }
  ],
  "112:4": [
    {
      "ar": "وَلَمْ",
      "en": "And not",
      "tr": "walam"
    },
    {
      "ar": "يَكُن",
      "en": "is",
      "tr": "yakun"
    },
    {
      "ar": "لَّهُۥ",
      "en": "for Him",
      "tr": "lahu"
    },
    {
      "ar": "كُفُوًا",
      "en": "equivalent",
      "tr": "kufuwan"
    },
    {
      "ar": "أَحَدٌۢ",
      "en": "any [one]",
      "tr": "aḥadun"
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
