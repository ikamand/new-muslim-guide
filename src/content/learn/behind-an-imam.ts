import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * Every prayer guide in this app teaches praying ALONE, which is right — that
 * is what somebody does for weeks. Nothing taught the other shape, and the
 * first time a convert prays in congregation they are being watched from
 * three sides and have no idea when to move.
 */
export const BEHIND_AN_IMAM: Reference = {
  id: 'behind-an-imam',
  surface: 'learn',
  title: 'Praying behind an imam',
  subtitle: 'What changes when you are not praying alone',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    tags: ['mosque'],
    relatedContent: [ref('reference', 'mosque'), ref('reference', 'jumuah')],
  },
  quickFacts: [
    { label: 'Your job', value: 'Follow. Never move before he does', emphasis: true },
    { label: 'Reciting', value: 'He recites. You listen' },
  ],
  sections: [
    {
      id: 'follow',
      heading: 'What am I actually meant to do?',
      promote: 'hero',
      body:
        'Follow him, and follow him slightly late. The Prophet ﷺ said the imam is appointed to be followed — so you bow when he has bowed, not with him and never before him. If you find yourself moving at the same moment, you are going too early.\n\nThat is most of it. The prayer is the same prayer you already know; what changes is that somebody else decides when.',
      sources: [hadith('bukhari', '722')],
    },
    {
      id: 'recitation',
      heading: 'Do I still recite?',
      body:
        'In the prayers said aloud — Fajr, Maghrib and ʿIsha — the imam recites and you listen. In the silent ones you recite quietly to yourself as usual. Either way you say the same things in bowing and prostration that you would alone.',
      notes: [
        note(
          'differs',
          'Whether you also read Al-Fatihah quietly behind the imam in an aloud prayer is a place the schools genuinely part company. Follow what the mosque you are in does, and nobody will think anything of it.',
        ),
      ],
    },
    {
      id: 'rows',
      heading: 'Where do I stand?',
      body:
        'In the row, shoulder to shoulder, filling the gaps. Rows are straightened deliberately before the prayer starts and somebody may touch your shoulder or foot to line you up — that is not a correction of you, it is what happens to everyone. If a row is full, start the next one behind it.',
      sources: [hadith('bukhari', '689')],
      notes: [
        note(
          'practical',
          'Do not stand alone behind a full row if there is space in it. Step in; people will make room.',
        ),
      ],
    },
    {
      id: 'lost',
      heading: 'What if I lose track?',
      body:
        'Keep following. You do not have to know which rakʿah it is — the imam does, and your job is to be in the same position he is. If everyone sits and you were about to stand, sit. Nobody is counting on your behalf and nobody is watching you the way it feels.',
      notes: [
        note(
          'practical',
          'If the imam makes a mistake, men say **subḥān Allāh** and women clap once. You will hear it happen; it is normal and it is not a scandal.',
        ),
      ],
    },
    {
      id: 'late',
      heading: 'What if I join late?',
      body:
        'Join wherever they are, in the row where there is space, and follow from there. When the imam gives salam, stand back up and pray the rakʿahs you missed on your own. That last part is what completes your prayer, and it is the part people forget.',
      sources: [hadith('bukhari', '636')],
    },
    {
      id: 'first-time',
      heading: 'Will anyone notice I am new?',
      body:
        'Less than you think. A room in prayer is looking forward, not sideways. Stand at the back, copy the person next to you, and accept that you will be half a second behind everything — which is, technically, exactly right.',
      sources: [
        general(
          'Ordinary orientation for a first congregation, claiming no textual authority. The etiquette above is what the narrations state; this is what a room feels like.',
        ),
      ],
    },
  ],
};
