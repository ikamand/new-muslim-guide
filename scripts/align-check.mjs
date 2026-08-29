/**
 * The recite-align module, held to what the Phase 0 spike measured.
 *
 * Every fixture below is REAL model output from the desktop spike of
 * 29 Aug 2026 (docs/recite-with-me.md): the Tarteel whisper-base-ar-quran
 * model transcribing bundled Husary clips, macOS TTS probes, and Iyad's own
 * recording, captured verbatim from `.cache/recite-spike/out/`. They are ASR
 * output, never rendered anywhere, and assert nothing about religious text —
 * the reference itself comes from `Recitations.fatiha`, the reviewed source.
 *
 * The numbers pin BEHAVIOUR, not aspiration: if a change to the aligner moves
 * one, the change altered how the follower treats real audio and the new
 * number must be re-justified here, the way content-verify treats a diff.
 *
 * Run: npm run align:check — exits non-zero on any regression.
 */

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { buildReference, align } = await import(join(root, 'src/lib/recite-align.ts'));
const { Recitations } = await import(join(root, 'src/content/recitations.ts'));

const reference = buildReference(Recitations.fatiha.verses);

/* ---------- fixtures: verbatim spike transcripts ---------- */

const HUSARY = [
  'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
  'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  'الرَّحْمَنِ الرَّحِيمِ',
  'مَالِكِ يَوْمِ الدِّينِ',
  'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
  'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
  'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
].join(' ');

/* macOS `say -v Maged` reading the Fatiha flat — no tajwid, boundary errors. */
const PLAIN_SPOKEN =
  'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ الْحَمْدُ لِلَهِ رَبِلْ عَلَمِينَ الرَّحْمَنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِي نُهْدِنَ صِرَاطَ الْمُسْتَقِيمَ الصِّرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرٌ الْمَغْضُوبِ عَلَيْهِمْ وَلَدَلِينَ';

/* An English sentence near the mic, transcribed as Arabic-shaped noise. */
const ENGLISH_NOISE = 'وَالْكَيْلَ مِتْ عَدَسَهُ جَنَبٌ';

/* Ten seconds of silence — one hallucinated word. */
const SILENCE = 'وَالْمُؤْمِنِينَ';

/* Iyad's recording, decoded in one 26 s pass: the decoder suppressed the
   basmala and ayah 3 (genuine repetitions), so this take begins mid-text —
   the case that forced acquire-anywhere. */
const REAL_WHOLE_FILE =
  'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ مَا لِكِ يَوْمِ الدِّينِ يَا كَانَ عْبُدُ وَإِيَّاكَ نَسْتَعِينَاهُ اهْدِنَ الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ';

/* The same recording decoded in ~6 s slices: repetitions restored, words at
   the crude cut points garbled — the case that forced widen-on-stall, the
   و/ال tolerance and the رحمان fold. */
const REAL_SLICED =
  'بِسْمِ اللَّهِ رَحْمَانِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَنِ الرَّحِيمِ مَا لِكِ يُوْمِتِّينَ كَانَ عَبُدُ وَإِيَّاكَ نَسْتَعِينَ إِهْدِي وَالصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَمْرُونَ مَا لَعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ';

/* ---------- expectations ---------- */

const CASES = [
  {
    name: 'Husary baseline — fluent recitation tracks completely',
    transcript: HUSARY,
    advanced: 29,
    complete: true,
    held: false,
  },
  {
    name: 'plain-spoken Arabic — follows with recovery',
    transcript: PLAIN_SPOKEN,
    advanced: 23,
    /* The final token (وَلَدَلِينَ) matches nothing, so the pointer rests two
       words short — followed to the last phrase, finished held, judged
       nothing. That is the spike's own measurement. */
    complete: false,
  },
  {
    name: 'English near the mic — advances nothing, goes held',
    transcript: ENGLISH_NOISE,
    advanced: 0,
    complete: false,
    held: true,
  },
  {
    name: 'silence hallucination — advances nothing',
    transcript: SILENCE,
    advanced: 0,
    complete: false,
  },
  {
    name: 'real take, whole-file decode — acquires mid-text, reaches the end',
    transcript: REAL_WHOLE_FILE,
    advanced: 17,
    complete: true,
  },
  {
    name: 'real take, sliced decode — recovers through every seam',
    transcript: REAL_SLICED,
    advanced: 22,
    complete: true,
  },
  {
    name: 'begins at al-hamdu — the opening is passed over, not demanded',
    transcript: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    advanced: 4,
    position: 8,
  },
  {
    name: 'the rahman spelling variant is one word, not a miss',
    transcript: 'بِسْمِ اللَّهِ رَحْمَانِ الرَّحِيمِ',
    advanced: 4,
    position: 4,
  },
  {
    name: 'acquires mid-text (a practised ayah), wa- boundary tolerated',
    transcript: 'اهْدِنَا وَالصِّرَاطَ الْمُسْتَقِيمَ',
    advanced: 3,
    position: 20,
  },
  {
    name: 'empty transcript is a quiet start, not a hold',
    transcript: '',
    advanced: 0,
    held: false,
  },
];

/* ---------- run ---------- */

let failures = 0;

for (const expected of CASES) {
  const got = align(reference, expected.transcript);
  const problems = [];
  if (got.advanced !== expected.advanced) {
    problems.push(`advanced ${got.advanced}, expected ${expected.advanced}`);
  }
  if ('complete' in expected && got.complete !== expected.complete) {
    problems.push(`complete ${got.complete}, expected ${expected.complete}`);
  }
  if ('held' in expected && got.held !== expected.held) {
    problems.push(`held ${got.held}, expected ${expected.held}`);
  }
  if ('position' in expected && got.position !== expected.position) {
    problems.push(`position ${got.position}, expected ${expected.position}`);
  }
  if (problems.length > 0) {
    failures += 1;
    console.log(`✗ ${expected.name}`);
    for (const problem of problems) console.log(`    ${problem}`);
  } else {
    console.log(`✓ ${expected.name}`);
  }
}

console.log(
  failures === 0
    ? `\nThe follower behaves as the spike measured — ${CASES.length} cases.`
    : `\n${failures} of ${CASES.length} cases moved.`,
);
process.exit(failures === 0 ? 0 : 1);
