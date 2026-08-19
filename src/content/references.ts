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
      note: 'Schools differ on whether these come before or after the taslim. Either is taught by scholars; do it the way whoever taught you does it.',
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

export const REFERENCES: Reference[] = [LOST_COUNT, MISSED, TRAVELLING, SEATED, PERIODS];

export function getReference(id: string): Reference | undefined {
  return REFERENCES.find((reference) => reference.id === id);
}
