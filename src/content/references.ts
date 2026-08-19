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

export const REFERENCES: Reference[] = [PERIODS];

export function getReference(id: string): Reference | undefined {
  return REFERENCES.find((reference) => reference.id === id);
}
