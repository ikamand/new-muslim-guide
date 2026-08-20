import { LEARN_TOPICS } from './learn';
import { note, ref } from './model';
import type { Reference } from './types';

/**
 * Reference topics — the things people look up rather than work through.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked.
 *
 * PERIODS is the most sensitive content in the app and the most consequential
 * to get wrong: it tells someone to stop praying. A woman who converts needs
 * it within about a month, and until now the app said nothing, leaving her to
 * ask a stranger a question most people are embarrassed to ask.
 *
 * Two things a reviewer should weigh. The rules on reciting Qur'an and
 * entering a mosque during a period genuinely differ between schools, and are
 * given here as a difference rather than a ruling. And the tone is deliberate:
 * plain words, no euphemism, and explicit that this is a concession rather
 * than a punishment — that framing matters more to a new Muslim than the
 * rulings do.
 */
export const PERIODS: Reference = {
  id: 'periods',
  surface: 'pray',
  title: 'Periods and prayer',
  subtitle: 'What changes, and what does not',
  audience: 'woman',
  sections: [
    {
      id: 'prayer',
      heading: 'You do not pray',
      body:
        'From the moment bleeding starts until it stops, you do not pray. This is not permission to skip — you are not supposed to pray, and praying anyway is not better.',
      note: 'You do not make these prayers up afterwards. They are not a debt. This surprises most people, so it is worth saying twice: they are simply not owed.',
    },
    {
      id: 'fasting',
      heading: 'You do not fast, but you make it up',
      body:
        'You do not fast during a period. Fasts missed in Ramadan for this reason are made up later, before the next Ramadan, at your own pace.',
      note: 'Prayer and fasting work differently here. Prayers are not made up; fasts are.',
    },
    {
      id: 'ending',
      heading: 'When it ends',
      body:
        'Once the bleeding has stopped, take a ghusl — the full wash — and you go straight back to praying with the next prayer due.',
    },
    {
      id: 'still-yours',
      heading: 'What does not change',
      body:
        'Everything else stays open to you. You can make duʿa in your own words, say dhikr, listen to the Qur’an, go on learning, and sit with people who are praying.',
      note: 'You are not unclean and you are not excluded. The rest from prayer is a concession you have been given, not a punishment or a mark against you.',
    },
    {
      id: 'differences',
      heading: 'Where you will hear different answers',
      body:
        'Whether you may recite the Qur’an from memory or a screen, touch a printed muṣḥaf, or sit inside the prayer hall of a mosque — scholars differ on all three, and you will meet people who are certain of opposite answers.',
      note: 'None of them is being difficult with you. If it matters to your week, ask someone knowledgeable which position your local mosque follows.',
    },
    {
      id: 'irregular',
      heading: 'Bleeding that is not a period',
      body:
        'Bleeding outside your normal pattern, or lasting far beyond it, is treated differently — it does not stop you praying, and you continue as normal with wudu.',
      note: 'Telling the two apart is genuinely a question for someone knowledgeable, not for an app. Do not guess, and do not stop praying on a guess.',
    },
    {
      id: 'after-birth',
      heading: 'After giving birth',
      body:
        'Bleeding after childbirth follows the same rules as a period: you do not pray, you do not make those prayers up, and you take a ghusl when it ends.',
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
  sections: [
    {
      id: 'rule',
      heading: 'Take the smaller number',
      body:
        'If you cannot remember whether you are on the second or third rakʿah, assume the smaller one — the number you are certain of — and carry on from there.',
      note: 'Do not start the prayer again. Restarting is the common instinct and it is not the answer.',
    },
    {
      id: 'sujud',
      heading: 'Then two extra prostrations',
      body:
        'Finish the prayer as normal. Before or after the final taslim, make two prostrations just as you do in the prayer itself, saying the takbir as you go down and as you come up, then give the taslim.',
      notes: [
        note(
          'differs',
          'Schools differ on whether these come before or after the taslim. Either is taught by scholars; do it the way whoever taught you does it.',
        ),
      ],
    },
    {
      id: 'also',
      heading: 'The same fix covers more than doubt',
      body:
        'Those two prostrations also cover forgetting the first sitting, adding a movement by mistake, or saying something in the wrong place.',
    },
    {
      id: 'settle',
      heading: 'Do not chase it',
      body:
        'Everyone loses count, including people who have prayed all their lives. If the doubt keeps coming back in the same prayer, ignore it and finish — chasing certainty is itself a distraction from the prayer.',
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
  sections: [
    {
      id: 'pray-it',
      heading: 'Pray it when you remember',
      body:
        'Sleeping through a prayer or forgetting it is not a sin. You pray it as soon as you wake or remember, and that prayer counts as the one you missed.',
    },
    {
      id: 'order',
      heading: 'In order, if there are several',
      body:
        'Missed more than one? Pray them in the order they were due, then the prayer you are currently in time for.',
    },
    {
      id: 'guilt',
      heading: 'Do not let it stop you',
      body:
        'The thing that ends people’s prayer is not the prayer they missed — it is deciding they are now the sort of person who misses prayers. Pray the next one. That is the whole recovery.',
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
  sections: [
    {
      id: 'shorten',
      heading: 'Four becomes two',
      body:
        'On a journey, the four-rakʿah prayers — Dhuhr, ʿAsr and ʿIshaʾ — are prayed as two. Fajr stays two and Maghrib stays three.',
      note: 'This is a gift, not a compromise. It is the practice of the Prophet ﷺ on journeys, not a lowering of the bar.',
    },
    {
      id: 'combine',
      heading: 'Two prayers together',
      body:
        'You may also pray Dhuhr and ʿAsr together, and Maghrib and ʿIshaʾ together, at the time of either one of the pair.',
    },
    {
      id: 'howfar',
      heading: 'How far counts as a journey',
      body:
        'Far enough that you would ordinarily call it travelling — scholars put the line at roughly eighty kilometres, and differ on it and on how long you may keep shortening once you arrive.',
      note: 'A daily commute is not a journey, however long it feels. If you are unsure, ask someone locally rather than deciding alone.',
    },
  ],
};

/** Written to remove the idea that a seated prayer is a lesser prayer. */
export const SEATED: Reference = {
  id: 'seated',
  surface: 'pray',
  title: 'Praying when you cannot stand',
  subtitle: 'Illness, injury, pain, or no room to stand',
  sections: [
    {
      id: 'sit',
      heading: 'Pray sitting',
      body:
        'If standing is beyond you, or would cause real pain or harm, pray sitting down — on a chair or on the floor, whichever you can manage.',
    },
    {
      id: 'gesture',
      heading: 'Bow and prostrate with a gesture',
      body:
        'Lean forward a little for the bowing, and further forward for the prostration, so that the prostration is clearly lower than the bow. Say everything exactly as you would standing.',
    },
    {
      id: 'lying',
      heading: 'If you cannot sit either',
      body:
        'Pray lying on your right side facing the qibla, or on your back, and make the movements with your head or your eyes. Prayer is never dropped for illness while you are conscious.',
    },
    {
      id: 'counts',
      heading: 'It is a full prayer',
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
    relatedContent: [ref('guide', 'wudu'), ref('pillar', 'salah')],
  },
  surface: 'learn',
  title: 'Your first time at a mosque',
  subtitle: 'What actually happens, so none of it is a surprise',
  sections: [
    {
      id: 'when',
      heading: 'Pick a quiet prayer, not Friday',
      body:
        'Friday midday is the busiest hour of the week. For a first visit, go for a normal prayer — Dhuhr in the early afternoon, or ʿIshaʾ at night. Fewer people, more room to watch what everyone else does.',
      note: 'Friday prayer is obligatory for men, so you will need to go eventually. It is easier once the building is already familiar.',
    },
    {
      id: 'before',
      heading: 'Before you leave',
      body:
        'Do your wudu at home if you can — it is one less thing to work out when you arrive. Wear clean clothes that cover you from the navel to the knees at minimum; loose trousers and a long top are entirely normal. Women cover the hair, arms and legs.',
    },
    {
      id: 'arriving',
      heading: 'Walking in',
      body:
        'There will be a shoe rack by the door. Take your shoes off there and carry them in if the rack is full. Step in with your right foot. There are usually separate entrances or areas for men and women — look for the signs, or ask; nobody minds being asked.',
    },
    {
      id: 'inside',
      heading: 'Once you are inside',
      body:
        'Pray two short rakʿah before you sit down — it is what everyone does on entering. Then sit anywhere on the carpet. There is no reserved seating and no collection.',
      note: 'If a prayer is already in progress, join the line where you are and follow along from wherever the imam has got to.',
    },
    {
      id: 'prayer',
      heading: 'The prayer itself',
      body:
        'People stand shoulder to shoulder in straight lines, filling from the front. Stand in a line, follow the imam, and do what the row does. You do not say anything aloud and nobody is watching you.',
    },
    {
      id: 'after',
      heading: 'Afterwards',
      body:
        'People turn and greet whoever is beside them. Say salam back. Someone will very likely ask if you are new — this is the moment the whole trip is actually for, and it is worth staying ten minutes for it.',
    },
    {
      id: 'nobody-minds',
      heading: 'Things nobody minds',
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
