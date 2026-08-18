import type { Pillar } from './types';

/**
 * The six articles of faith — what a Muslim believes, as reference reading.
 *
 * ⚠️ REVIEW REQUIRED — the Arabic names and transliterations below were
 * written by a model and have not been checked by a qualified person. The
 * vocalisation marks in particular need verifying against a printed source.
 *
 * This is the Sunni enumeration, taken from the hadith of Jibril, because it
 * is the one that matches the salah the rest of the app teaches. Shia Islam
 * organises its principles differently. Saying that here would hand a
 * first-timer a comparison table when what they need is one clear account.
 *
 * The English is deliberately plain and deliberately shallow. Each article
 * has centuries of theology behind it; this page gives someone the shape of
 * what they have accepted and stops well before the arguments.
 */
export const IMAN_PILLARS: Pillar[] = [
  {
    id: 'allah',
    title: 'Belief in Allah',
    arabic: 'الإِيمَانُ بِاللَّه',
    transliteration: 'Al-īmān bi-llāh',
    summary: 'That Allah is one, without partner, and that nothing else deserves worship.',
    detail:
      'The other five sit inside this one. It is not only accepting that God exists — it is accepting that He is one, that nothing shares His authority, and that worship is owed to Him alone. Everything you say in prayer is a restatement of it.',
    guideId: 'fajr',
  },
  {
    id: 'angels',
    title: 'Belief in the angels',
    arabic: 'الإِيمَانُ بِالمَلَائِكَة',
    transliteration: 'Al-īmān bi-l-malāʾikah',
    summary: 'That Allah created angels, who carry out what He commands.',
    detail:
      'Angels are created beings. They are not divine, not partners of Allah, and not prayed to. Jibril, who brought the revelation to the Prophet ﷺ, is the one you will hear named most often. You are not asked to picture them or explain them, only to accept that they are real.',
  },
  {
    id: 'books',
    title: 'Belief in the revealed books',
    arabic: 'الإِيمَانُ بِالكُتُب',
    transliteration: 'Al-īmān bi-l-kutub',
    summary: 'That Allah sent scripture to guide people, and that the Qur’an is the last of it.',
    detail:
      'The Qur’an names earlier revelations, among them the Tawrat given to Musa and the Injil given to ʿIsa. Believing in them means believing Allah sent them. It does not mean the texts other faiths read today are those revelations as they were sent.',
  },
  {
    id: 'messengers',
    title: 'Belief in the messengers',
    arabic: 'الإِيمَانُ بِالرُّسُل',
    transliteration: 'Al-īmān bi-r-rusul',
    summary: 'That Allah sent prophets to every people, and that Muhammad ﷺ is the last of them.',
    detail:
      'Many of them will already be familiar — Ibrahim, Musa, ʿIsa, and others shared with Judaism and Christianity. Islam honours them as men Allah sent, not as divine, and does not let you accept some and reject others. Muhammad ﷺ closes the line; no prophet comes after him.',
  },
  {
    id: 'last-day',
    title: 'Belief in the Last Day',
    arabic: 'الإِيمَانُ بِاليَوْمِ الآخِر',
    transliteration: 'Al-īmān bi-l-yawmi-l-ākhir',
    summary: 'That this life ends, everyone is raised, and each person answers for what they did.',
    detail:
      'Nothing you do is lost or goes unweighed, including what nobody else ever saw. When the Day comes is known only to Allah — working out dates for it is not part of believing in it, and people who claim to have done so are to be ignored.',
  },
  {
    id: 'qadar',
    title: 'Belief in divine decree',
    arabic: 'الإِيمَانُ بِالقَدَر',
    transliteration: 'Al-īmān bi-l-qadar',
    summary: 'That nothing happens outside Allah’s knowledge and will — the good and the hard alike.',
    detail:
      'This is the one people find hardest, and it is usually misread as meaning your choices do not matter. It does not. You still choose, and you are still answerable for what you choose. Held rightly it settles you rather than paralyses you: you act as well as you can, and you are not crushed by the part of the outcome that was never yours to control.',
    note: 'If this one sits badly with you at first, that is normal and it is not a sign your faith is faulty. It is the article scholars have written the most about, precisely because it is difficult.',
  },
];

export function getImanPillar(id: string): Pillar | undefined {
  return IMAN_PILLARS.find((pillar) => pillar.id === id);
}
