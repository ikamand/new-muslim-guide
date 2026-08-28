import { LEARN_TOPICS } from './learn';
import { note, ref } from './model';
import { hadith, quran, scholarly } from './sources';
import type { Reference } from './types';

/**
 * Reference topics — the things people look up rather than work through.
 *
 * ⚠️ PARTIAL REVIEW — the English is model-written; the citations were opened
 * and matched.
 *
 * PERIODS is the most sensitive content in the app and the most consequential
 * to get wrong: it tells someone to stop praying. A woman who converts needs
 * it within about a month, and until now the app said nothing, leaving her to
 * ask a stranger a question most people are embarrassed to ask.
 *
 * The two claims that most needed evidence now have it, and it is the same
 * narration for both: Mu`adha asked `Aisha whether missed prayers are made up
 * and was told they are not, while the fasts are. Bukhari 321 and Muslim 335a
 * carry it, and Muslim files it under a chapter heading that states the
 * asymmetry outright.
 *
 * ⚠️ THE `differences` SECTION WAS WRONG-SHAPED AND IS NOW REBUILT. It named
 * three things — reciting the Qur'an, touching a muṣḥaf, sitting in a prayer
 * hall — said scholars differ on all three, and gave no positions and no
 * source. Only the first of the three is genuinely open. On the other two the
 * four schools agree: it is not permitted to touch a muṣḥaf, and not permitted
 * to remain in the prayer hall, with passing through allowed by the Shafi`i
 * and Hanbali schools. Calling those open questions was the more dangerous
 * error of the two directions, because it invited someone to act on a
 * disagreement that is not there. The section now separates them and the
 * `differs` note carries the actual positions on the one that is real, read
 * from the Dorar Encyclopedia of Fiqh rather than assembled.
 *
 * TWO SECTIONS THAT STATED A RULE WITH NOTHING BEHIND IT NOW CARRY ONE.
 * `irregular` has Sahih al-Bukhari 228 — Fatima bint Abi Hubaysh told not to
 * give up her prayers because the bleeding is "from a blood vessel and not the
 * menses" — which also supplies the detail the section was missing, that the
 * wudu is renewed for each prayer. `after-birth` has Sunan Abi Dawud 311.
 *
 * The tone is deliberate and unchanged: plain words, no euphemism, and
 * explicit that this is a concession rather than a punishment — that framing
 * matters more to a new Muslim than the rulings do.
 */
export const PERIODS: Reference = {
  id: 'periods',
  surface: 'pray',
  title: 'Periods and prayer',
  subtitle: 'What changes, and what does not',
  audience: 'woman',
  quickFacts: [
    { label: 'Prayer', value: 'You do not pray, and you do not make those prayers up' },
    { label: 'Fasting', value: 'You do not fast, and you do make those up' },
    { label: 'When it ends', value: 'Take a ghusl, then pray from the next prayer due' },
  ],
  sections: [
    {
      id: 'prayer',
      heading: 'Do I still pray?',
      promote: 'hero',
      body:
        'From the moment bleeding starts until it stops, you do not pray. This is not permission to skip. You are not supposed to pray, and praying anyway is not better.',
      note: 'You do not make these prayers up afterwards. They are not a debt. This surprises most people, so it is worth saying twice: they are simply not owed.',
      sources: [
        hadith('bukhari', '321', {
          book: 6,
          bookName: 'Menstrual Periods',
          inBookReference: 'Book 6, Hadith 26',
        }),
        hadith('muslim', '335a', {
          book: 3,
          bookName: 'The Book of Menstruation',
          inBookReference: 'Book 3, Hadith 83',
        }),
      ],
    },
    {
      id: 'fasting',
      heading: 'What about fasting?',
      body:
        'You do not fast during a period. Fasts missed in Ramadan for this reason are made up later, before the next Ramadan, at your own pace.',
      note: 'Prayer and fasting work differently here. Prayers are not made up; fasts are.',
      // The same narration as the section above. It is the one that draws the
      // distinction, so it is cited at both ends of it rather than once.
      sources: [
      ],
    },
    {
      id: 'ending',
      heading: 'When do I start praying again?',
      body:
        'Once the bleeding has stopped, take a ghusl, the full wash, and you go straight back to praying with the next prayer due.',
      sources: [quran(2, 222, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'still-yours',
      heading: 'What can I still do?',
      body:
        'Everything else stays open to you. You can make duʿa in your own words, say dhikr, listen to the Qur’an, go on learning, and sit with people who are praying.',
      note: 'You are not unclean and you are not excluded. The rest from prayer is a concession you have been given, not a punishment or a mark against you.',
    },
    {
      id: 'differences',
      heading: 'Why do people tell me different things?',
      body:
        'One question here is genuinely open and two are not, and it saves a lot of confusion to know which is which. Reciting the Qur’an during a period is the open one: scholars divide on it, and you will meet people certain of opposite answers. Holding a printed muṣḥaf is not open in the same way, because all four schools say not to. Nor is sitting in the prayer hall of a mosque, which all four treat as somewhere not to stay through a period, though several allow walking through.',
      note: 'None of this touches what the last section said. Listening, duʿa, dhikr and learning are open on every account, and nobody who tells you one of these is being difficult with you.',
      notes: [
        note(
          'differs',
          'On reciting the Qur’an there is no settled answer, and both sides are held by people who know exactly what they are doing.',
          {
            sources: [
              scholarly({
                work: 'Encyclopedia of Fiqh, Rulings of Menstruation',
                author: 'Dorar al-Saniyyah',
                url: 'https://dorar.net/en/feqhia/58',
              }),
            ],
            positions: [
              {
                school: 'Maliki',
                position:
                  'Permit reciting during a period, which is also al-Shafi`i’s earlier position and one narration from Ahmad.',
              },
              {
                school: 'the majority',
                position:
                  'The settled positions of the Hanafi, Shafi`i and Hanbali schools hold back from reciting until the period ends.',
              },
              {
                school: 'contemporary scholarship',
                position:
                  'Ibn Taymiyyah, Ibn al-Qayyim and Ibn `Uthaymin took the permitting view, and it is the verdict of the Permanent Committee.',
              },
            ],
            additionalExplanation:
              'This section used to say scholars differ on all three of these and give no positions, which put a question all four schools agree on next to one they genuinely split over. On the muṣḥaf the agreement is about touching it; scholars treat a barrier between hand and page differently, so if you need to carry one or turn its pages, that is the thing to ask about. On the mosque the agreement is about remaining there. The Shafi`i and Hanbali schools permit passing through, and several contemporary scholars go further. If any of it affects your week, ask someone knowledgeable which position your local mosque follows.',
          },
        ),
      ],
    },
    {
      id: 'irregular',
      heading: 'What if the bleeding is not a period?',
      body:
        'Bleeding outside your normal pattern, or lasting far beyond it, is treated differently, and it does not stop you praying. A woman asked the Prophet ﷺ exactly this and was told not to give up her prayers, because that bleeding comes from a blood vessel rather than being a period. You wash, do wudu, and pray; the wudu is done afresh for each prayer.',
      note: 'Telling the two apart is genuinely a question for someone knowledgeable, not for an app. Do not guess, and do not stop praying on a guess.',
      // The section stated the rule with nothing behind it. This is the
      // narration the rule comes from, and it carries the wudu detail the
      // section was missing as well.
      sources: [
        hadith('bukhari', '228', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 94',
        }),
      ],
    },
    {
      id: 'after-birth',
      heading: 'What about after giving birth?',
      body:
        'Bleeding after childbirth follows the same rules as a period: you do not pray, you do not make those prayers up, and you take a ghusl when it ends.',
      // Umm Salama: women refrained from prayer for forty days after
      // childbirth. The ghusl that ends it is drawn by the books from the
      // parallel with menstruation rather than from a text naming it — noted
      // in `docs/scholarly-review.md` §1.2 and true here too.
      sources: [
        hadith('abu-dawud', '311', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 311',
          grading: 'hasan',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
  ],
};


/**
 * Losing count is the single most common thing that goes wrong for a beginner,
 * and not knowing the fix turns an ordinary slip into a restarted prayer or a
 * quiet panic.
 *
 * Deliberately covers only the beginner's case. There is a great deal more
 * fiqh here — which omissions invalidate a prayer outright, what counts as a
 * pillar rather than an obligation — and half-teaching it would be worse than
 * sending someone to ask.
 */
export const LOST_COUNT: Reference = {
  id: 'lost-count',
  surface: 'pray',
  title: 'Losing count in prayer',
  subtitle: 'What to do when you are not sure where you are',
  quickFacts: [
    { label: 'The fix', value: 'Take the smaller number, then two extra prostrations' },
    { label: 'Does it count?', value: 'Yes, the prayer is valid', emphasis: true },
  ],
  sections: [
    {
      id: 'rule',
      heading: 'I have lost count. What now?',
      promote: 'hero',
      body:
        'If you cannot remember whether you are on the second or third rakʿah, assume the smaller one, the number you are certain of, and carry on from there.',
      note: 'Do not start the prayer again. Restarting is the common instinct and it is not the answer.',
      // "Cast aside the doubt and build on what he is sure of" — the rule this
      // section states, in the Prophet's ﷺ own wording.
      sources: [
        hadith('muslim', '571a', {
          book: 5,
          bookName: 'The Book of Mosques and Places of Prayer',
          inBookReference: 'Book 5, Hadith 110',
        }),
      ],
    },
    {
      id: 'sujud',
      heading: 'What are the two extra prostrations?',
      body:
        'Finish the prayer as normal. Before or after the final taslim, make two prostrations just as you do in the prayer itself, saying the takbir as you go down and as you come up, then give the taslim.',
      notes: [
        note(
          'differs',
          'Schools differ on whether these come before or after the taslim. Either is taught by scholars; do it the way whoever taught you does it.',
          {
            /**
             * Not a difference between a strong report and a weak one: both
             * orders are in Bukhari. Ibn Buhaina's narration has the two
             * prostrations before the taslim, Dhul-Yadain's has them after,
             * and Muslim 571a puts the doubt case before. That is why the
             * schools land in different places and why the app teaches neither
             * as the correction of the other.
             */
            sources: [
              hadith('bukhari', '1224', {
                book: 22,
                bookName: 'Forgetfulness in Prayer',
                inBookReference: 'Book 22, Hadith 1',
              }),
              hadith('bukhari', '1229', {
                book: 22,
                bookName: 'Forgetfulness in Prayer',
                inBookReference: 'Book 22, Hadith 7',
              }),
            ],
          },
        ),
      ],
    },
    {
      id: 'also',
      heading: 'What else does that fix cover?',
      body:
        'Those two prostrations also cover forgetting the first sitting, adding a movement by mistake, or saying something in the wrong place.',
    },
    {
      id: 'settle',
      heading: 'It keeps happening. Is that bad?',
      body:
        'Everyone loses count, including people who have prayed all their lives. If the doubt keeps coming back in the same prayer, ignore it and finish. Chasing certainty is itself a distraction from the prayer.',
    },
  ],
};

/**
 * The point of this topic is to stop guilt turning one missed prayer into a
 * stopped habit, which is the failure mode that actually loses people.
 */
export const MISSED: Reference = {
  id: 'missed',
  surface: 'pray',
  title: 'Missing a prayer',
  subtitle: 'Sleeping through it, forgetting, or running out of time',
  quickFacts: [
    { label: 'Is it a sin?', value: 'Not if you slept or forgot', emphasis: true },
    { label: 'What to do', value: 'Pray it as soon as you remember' },
  ],
  sections: [
    {
      id: 'pray-it',
      heading: 'I missed a prayer. Is that a sin?',
      promote: 'hero',
      body:
        'Sleeping through a prayer or forgetting it is not a sin. You pray it as soon as you wake or remember, and that prayer counts as the one you missed.',
      // "There is no expiation except to pray the same" — which is exactly the
      // reassurance this section is for: the fix is the prayer, not a penalty.
      sources: [
        hadith('bukhari', '597', {
          book: 9,
          bookName: 'Times of the Prayers',
          inBookReference: 'Book 9, Hadith 72',
        }),
      ],
    },
    {
      id: 'order',
      heading: 'What if I missed several?',
      body:
        'Missed more than one? Pray them in the order they were due, then the prayer you are currently in time for.',
    },
    {
      id: 'guilt',
      heading: 'What if it keeps happening?',
      body:
        'The thing that ends people’s prayer is not the prayer they missed. It is deciding they are now the sort of person who misses prayers. Pray the next one. That is the whole recovery.',
      note: 'Deliberately leaving a prayer is a serious matter and different from oversleeping. The action is still the same: pray it, and pray the next one.',
    },
  ],
};

/** Travel and illness concessions are under-used because people do not know they exist. */
export const TRAVELLING: Reference = {
  id: 'travelling',
  surface: 'pray',
  title: 'Praying while travelling',
  subtitle: 'Shortening and combining on a journey',
  quickFacts: [
    { label: 'How many', value: 'Dhuhr, ʿAsr and ʿIshaʾ become two. Fajr and Maghrib stay' },
    { label: 'Together?', value: 'Dhuhr with ʿAsr, Maghrib with ʿIshaʾ, at either time' },
    { label: 'Do I have to?', value: 'Shortening is the sunnah on a journey', emphasis: true },
  ],
  sections: [
    {
      id: 'shorten',
      heading: 'How much do I pray when travelling?',
      promote: 'hero',
      body:
        'On a journey, the four-rakʿah prayers, Dhuhr, ʿAsr and ʿIshaʾ, are prayed as two. Fajr stays two and Maghrib stays three.',
      note: 'This is a gift, not a compromise. It is the practice of the Prophet ﷺ on journeys, not a lowering of the bar.',
      sources: [
        quran(4, 101, { surahName: 'An-Nisa' }),
        hadith('bukhari', '1090', {
          book: 18,
          bookName: 'Shortening the Prayers (At-Taqseer)',
          inBookReference: 'Book 18, Hadith 11',
        }),
      ],
    },
    {
      id: 'combine',
      heading: 'Can I pray two together?',
      body:
        'You may also pray Dhuhr and ʿAsr together, and Maghrib and ʿIshaʾ together, at the time of either one of the pair.',
      sources: [
        hadith('muslim', '703a', {
          book: 6,
          bookName: 'The Book of Prayer - Travellers',
          inBookReference: 'Book 6, Hadith 52',
        }),
      ],
    },
    {
      id: 'howfar',
      heading: 'How far counts as travelling?',
      body:
        'Far enough that you would ordinarily call it travelling. There is no distance in the Qur’an or in any narration, so scholars have had to draw the line themselves, and they draw it in different places. The most common answer works out at somewhere around eighty to ninety kilometres. What everyone agrees on is when it starts: not when you decide to go, but once you have actually left the place you live.',
      note: 'A daily commute is not a journey, however long it feels. If you are unsure, ask someone locally rather than deciding alone.',
      // The "once you have left" sentence is the one thing here that is agreed
      // and it now carries the narration Bukhari files under exactly that
      // chapter heading. The distance still carries no hadith, because none
      // gives one — that is the point of the note.
      sources: [
        hadith('bukhari', '1089', {
          book: 18,
          bookName: 'Shortening the Prayers (At-Taqseer)',
          inBookReference: 'Book 18, Hadith 10',
        }),
      ],
      notes: [
        note(
          'differs',
          'No verse and no narration gives a distance. The figure most scholars use is a conversion of a classical measure, and a second position holds there is no fixed distance at all: if it is a journey, you may shorten.',
          {
            sources: [
              scholarly({
                work: 'Encyclopedia of Fiqh, How Travellers Pray',
                author: 'Dorar al-Saniyyah',
                url: 'https://dorar.net/en/feqhia/116',
              }),
              // The Hanafi figures read from a Hanafi source rather than from
              // a summary of one, which is the rule for a school attribution.
              scholarly({
                work: 'When Is a Person Considered a Traveler Who Can Shorten Their Prayers?',
                author: 'SeekersGuidance',
                school: 'Hanafi',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/when-is-a-person-considered-a-traveler-who-can-shorten-their-prayers/',
              }),
            ],
            positions: [
              {
                school: 'the majority',
                position:
                  'The Maliki, Shafi`i and Hanbali schools put it at four burud, which converts to roughly eighty-eight kilometres.',
              },
              {
                school: 'Hanafi',
                position:
                  'Reckon it from a journey of about three days at the pace people travelled then, which the school gives as forty-eight miles, or roughly seventy-seven kilometres.',
              },
              {
                school: 'contemporary scholarship',
                position:
                  'Ibn Taymiyyah, Ibn al-Qayyim and Ibn `Uthaymin held there is no fixed distance: anything ordinarily called travelling counts.',
              },
            ],
            additionalExplanation:
              'The app used to say "roughly eighty kilometres" without saying where the number came from, which made a scholarly conversion look like a reported figure. A barid is a classical measure of distance, and four of them is two days of loaded-camel travel; converted into modern units it lands near eighty-eight kilometres, and different conversions give slightly different numbers, which is most of why you will hear eighty from one person and ninety from another. How long you may keep shortening once you arrive is a second difference again. The Maliki and Shafi`i schools stop at four days, the Hanafi school at fifteen, and some hold there is no limit while you have not settled.',
          },
        ),
      ],
    },
  ],
};

/** Written to remove the idea that a seated prayer is a lesser prayer. */
export const SEATED: Reference = {
  id: 'seated',
  surface: 'pray',
  title: 'Praying when you cannot stand',
  subtitle: 'Illness, injury, pain, or no room to stand',
  quickFacts: [
    { label: 'Cannot stand?', value: 'Pray sitting, on a chair or the floor' },
    { label: 'Does it count?', value: 'Fully. It is not worth less', emphasis: true },
  ],
  sections: [
    {
      id: 'sit',
      heading: 'What if I cannot stand?',
      promote: 'hero',
      body:
        'If standing is beyond you, or would cause real pain or harm, pray sitting down, on a chair or on the floor, whichever you can manage.',
      // `Imran ibn Husain asked because of an illness of his own, and got the
      // whole ladder in one sentence: standing, then sitting, then lying.
      sources: [
        hadith('bukhari', '1117', {
          book: 18,
          bookName: 'Shortening the Prayers (At-Taqseer)',
          inBookReference: 'Book 18, Hadith 37',
        }),
      ],
    },
    {
      id: 'gesture',
      heading: 'How do I bow and prostrate?',
      body:
        'Lean forward a little for the bowing, and further forward for the prostration, so that the prostration is clearly lower than the bow. Say everything exactly as you would standing.',
    },
    {
      id: 'lying',
      heading: 'What if I cannot sit either?',
      body:
        'Pray lying on your right side facing the qibla, or on your back, and make the movements with your head or your eyes. Prayer is never dropped for illness while you are conscious.',
      sources: [
      ],
    },
    {
      id: 'counts',
      heading: 'Does it count the same?',
      body:
        'A prayer prayed sitting because you could not stand is not worth less than one prayed standing. It is the prayer you were asked for.',
    },
  ],
};


/**
 * The first visit to a mosque.
 *
 * The research behind the app's roadmap is blunt: isolation, not ignorance, is
 * what pushes converts away — most have never been inside another Muslim's
 * home. An offline app cannot hand anyone a community. What it can do is
 * remove the specific fear of doing something embarrassing in public, which is
 * what keeps people out of the one building where that community is.
 *
 * So this is written to lower the stakes rather than to teach etiquette. The
 * last section matters more than the rest of it.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked. Customs vary between
 * mosques and between countries far more here than anywhere else in the app,
 * so a reviewer should read this as "is any of it wrong enough to embarrass
 * someone" rather than as a ruling.
 *
 * Three sentences in it are not custom, and those now carry sources: that
 * Friday prayer is a duty for men, that you pray two rakʿah on entering, and
 * that you step in with the right foot. Everything else here is description
 * of a building and of what people in it do, which is `general` knowledge and
 * needs no isnad.
 */
export const MOSQUE: Reference = {
  id: 'mosque',
  /**
   * The metadata layer, on one reference as a worked example. Everything here
   * is an editorial judgement about the app rather than a claim about the
   * religion — how long a read is, how soon someone needs it — so it needed no
   * scholarly review, only Iyad's eye on whether the estimates ring true.
   */
  meta: {
    category: 'community',
    difficulty: 'foundational',
    estimatedMinutes: 6,
    beginnerPriority: 2,
    tags: ['mosque', 'first-day', 'etiquette'],
    relatedContent: [ref('guide', 'wudu'), ref('pillar', 'salah'), ref('reference', 'clothing')],
  },
  surface: 'learn',
  title: 'Your first time at a mosque',
  subtitle: 'What actually happens, so none of it is a surprise',
  quickFacts: [
    { label: 'When', value: 'A quiet prayer, not Friday midday' },
    { label: 'Bring', value: 'Nothing. Socks if you would rather' },
    { label: 'Get it wrong?', value: 'Nobody minds. Everyone was new once', emphasis: true },
  ],
  sections: [
    {
      id: 'when',
      heading: 'When should I go the first time?',
      body:
        'Friday midday is the busiest hour of the week. For a first visit, go for a normal prayer: Dhuhr in the early afternoon, or ʿIshaʾ at night. Fewer people, more room to watch what everyone else does.',
      note: 'Friday prayer is obligatory for men, so you will need to go eventually. It is easier once the building is already familiar.',
      // The narration names the four it is not a duty for — a woman among
      // them — which is where the note's "for men" comes from.
      sources: [
        hadith('abu-dawud', '1067', {
          book: 2,
          bookName: 'Prayer (Kitab Al-Salat)',
          inBookReference: 'Book 2, Hadith 678',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
    {
      id: 'before',
      heading: 'What should I do before I go?',
      // "Women cover the hair, arms and legs" used to sit here as a flat rule
      // with nothing behind it, next to a lesson that treats the same subject
      // with its verses and its `differs` note. One subject, one place.
      body:
        'Do your wudu at home if you can. It is one less thing to work out when you arrive. Wear clean clothes that cover you from the navel to the knees at minimum; loose trousers and a long top are entirely normal. What a woman covers is no different here from anywhere else in front of men outside the family, and the clothing guide sets it out with the verses behind it.',
    },
    {
      id: 'arriving',
      heading: 'What do I do when I walk in?',
      body:
        'There will be a shoe rack by the door. Take your shoes off there and carry them in if the rack is full. Step in with your right foot. There are usually separate entrances or areas for men and women. Look for the signs, or ask; nobody minds being asked.',
      // The right foot is the general pattern `Aisha describes, not a rule of
      // its own. The shoe rack is a shoe rack.
      sources: [
        hadith('bukhari', '168', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 34',
        }),
      ],
    },
    {
      id: 'inside',
      heading: 'Where do I sit?',
      body:
        'Pray two short rakʿah before you sit down. It is what everyone does on entering. Then sit anywhere on the carpet. There is no reserved seating and no collection.',
      note: 'If a prayer is already in progress, join the line where you are and follow the imam from wherever he has got to. When he finishes and gives salām, stand back up and pray the rakʿahs you missed on your own — that is what completes your prayer.',
      sources: [
        hadith('bukhari', '444', {
          book: 8,
          bookName: 'Prayers (Salat)',
          inBookReference: 'Book 8, Hadith 93',
        }),
      ],
    },
    {
      id: 'prayer',
      heading: 'What happens in the prayer?',
      body:
        'People stand shoulder to shoulder in straight lines, filling from the front. Stand in a line, follow the imam, and do what the row does. You do not say anything aloud and nobody is watching you.',
    },
    {
      id: 'after',
      heading: 'What happens afterwards?',
      body:
        'People turn and greet whoever is beside them. Say salam back. Someone will very likely ask if you are new. This is the moment the whole trip is actually for, and it is worth staying ten minutes for it.',
    },
    {
      id: 'nobody-minds',
      heading: 'What if I get something wrong?',
      body:
        'Being a beat behind in the movements. Not knowing where to stand. Your phone going off. Asking a stranger what to do. Leaving straight after. Getting the words wrong under your breath.',
      note: 'Everyone in that room was new once, including the imam. Nobody is grading you, and the ones who notice you are new are almost always pleased about it.',
    },
  ],
};

/**
 * Every reference topic in the app.
 *
 * The ones defined in this file are what someone looks up mid-prayer or when
 * something has gone wrong. `LEARN_TOPICS` are the beginner explanations read
 * in a quiet minute — same shape, different moment, so they live in
 * `./learn/` and join the list here.
 *
 * The beginner topics come first: someone scrolling this list for the first
 * time should meet "What is Islam?" before "Losing count in prayer".
 */
export const REFERENCES: Reference[] = [
  ...LEARN_TOPICS,
  MOSQUE,
  LOST_COUNT,
  MISSED,
  TRAVELLING,
  SEATED,
  PERIODS,
];

export function getReference(id: string): Reference | undefined {
  return REFERENCES.find((reference) => reference.id === id);
}
