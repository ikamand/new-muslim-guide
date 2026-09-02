import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import {
  alignClassroom,
  buildReference,
  type ClassroomWordState,
  type ReferenceWord,
} from '@/lib/recite-align';
import { canRecite, startFollowSession, type FollowSession } from '@/lib/recite-session';

/**
 * The classroom — Phase 6 of docs/recite-with-me.md, agreed 2 Sep 2026.
 *
 * Repeat after the reciter, one ayah at a time: he reads (mic closed), then
 * the selector leads the reader word by word (playback closed). Turn-taking
 * is the echo-cancellation — the mic and the reciter are never open
 * together, so the follower can only ever hear the reader.
 *
 * The register this mode is allowed, and no more, scoped by the pairs spike:
 * a word the reader moved past turns red (`conceded`), a wrong short-vowel
 * ending concedes a word (measured detectable 5/6), letter quality is never
 * judged (measured invisible 0/3 — the tap-a-word teacher owns it, later).
 * The score is confirmed ÷ total, shown at the ayah's end, and EVAPORATES —
 * reset on the next try, stored nowhere. Iyad, 2 Sep: "no persistance needed
 * just view and reset when next try is started."
 *
 * The reciter's audio is played by a component the screen mounts only during
 * his turn (`useAudioPlayer` cannot mount during static web render — the
 * lesson practice.tsx already carries); this hook only says WHOSE turn it is
 * and reacts when the screen reports his clip finished.
 */

export type ClassroomTurn = 'reciter' | 'you' | 'scored';

export type ClassroomState =
  | 'closed'
  | 'starting' // permission granted, model loading
  | 'running' // turn-taking is live; see `turn`
  | 'denied'
  | 'finished'; // last ayah passed the bar

/** The bar an ayah must clear for the loop to move on rather than replay. */
const ADVANCE_AT = 0.8;
/** How long the evaporating score stays readable before the loop moves. */
const SCORE_BEAT_MS = 2800;

export type ReciteClassroomController = {
  state: ClassroomState;
  turn: ClassroomTurn;
  /** 0-based index of the ayah the loop is on. */
  ayahIndex: number;
  /** 1-based, for display and for the screen's card highlight. */
  currentVerse: number;
  totalVerses: number;
  /** Word states within the CURRENT ayah, index → state. */
  wordStates: ReadonlyMap<number, ClassroomWordState>;
  /** The selector: the word to say now. Meaningful during 'you'. */
  selected: number;
  /** Words in the current ayah, so the bar can show progress. */
  wordCount: number;
  /** 0–100, present only while 'scored' shows it. */
  score: number | null;
  active: boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  /** The screen's reciter player reports his clip ended. */
  reciterFinished: () => void;
  again: () => void;
  next: () => void;
  /** The escape hatch: concede the selected word and move on. */
  skipWord: () => void;
  /** Bumps every time an ayah's reciter turn begins — the player's remount
      key, so "once more" genuinely replays the same clip. */
  attempt: number;
};

const RANK: Record<ClassroomWordState, number> = { pending: 0, conceded: 1, confirmed: 2 };

export function useReciteClassroom(
  verses: readonly { arabic: string }[],
  onBeforeStart?: () => void,
): ReciteClassroomController {
  /* One reference per ayah: the classroom leads through a single ayah at a
     time, so acquisition never needs to roam the surah. */
  const references = useMemo<readonly ReferenceWord[][]>(
    () => verses.map((verse) => buildReference([verse])),
    [verses],
  );

  const [state, setState] = useState<ClassroomState>('closed');
  const [turn, setTurn] = useState<ClassroomTurn>('reciter');
  const [ayahIndex, setAyahIndex] = useState(0);
  const [wordStates, setWordStates] = useState<ReadonlyMap<number, ClassroomWordState>>(new Map());
  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(0);

  const session = useRef<FollowSession | undefined>(undefined);
  /* Mirrors for the transcript callback, which outlives any render. The
     merged map's source of truth is a ref, not the state: merging inside a
     setState updater would put side effects where React may run them twice. */
  const turnRef = useRef<ClassroomTurn>('reciter');
  const ayahRef = useRef(0);
  const skipsRef = useRef<Set<number>>(new Set());
  const statesRef = useRef<Map<number, ClassroomWordState>>(new Map());
  const scoreTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const reference = references[ayahIndex] ?? [];
  const wordCount = reference.length;

  const clearScoreTimer = () => {
    if (scoreTimer.current !== undefined) clearTimeout(scoreTimer.current);
    scoreTimer.current = undefined;
  };

  const resetTurn = useCallback(() => {
    skipsRef.current = new Set();
    statesRef.current = new Map();
    setWordStates(new Map());
    setSelected(0);
    setScore(null);
  }, []);

  /** First word not yet confirmed or conceded — where the selector rests. */
  const firstUnresolved = (merged: Map<number, ClassroomWordState>, total: number) => {
    let index = 0;
    while (index < total) {
      const kept = merged.get(index);
      if (kept === undefined || kept === 'pending') break;
      index += 1;
    }
    return index;
  };

  const teardown = useCallback(async () => {
    clearScoreTimer();
    const current = session.current;
    session.current = undefined;
    await current?.stop();
  }, []);

  useEffect(() => () => void teardown(), [teardown]);

  const stop = useCallback(async () => {
    await teardown();
    resetTurn();
    setAyahIndex(0);
    ayahRef.current = 0;
    setState('closed');
  }, [teardown, resetTurn]);

  /* Backgrounding mid-lesson (a call, a locked screen) stops the classroom
     cleanly rather than leaving a wedged mic behind a frozen turn. */
  useEffect(() => {
    const sub = AppState.addEventListener('change', (appState) => {
      if (appState !== 'active' && session.current) void stop();
    });
    return () => sub.remove();
  }, [stop]);

  /** Move the loop to an ayah's reciter turn (a fresh attempt). */
  const beginAyah = useCallback(
    (index: number) => {
      clearScoreTimer();
      void session.current?.pause();
      resetTurn();
      setAyahIndex(index);
      ayahRef.current = index;
      setAttempt((count) => count + 1);
      turnRef.current = 'reciter';
      setTurn('reciter');
    },
    [resetTurn],
  );

  const finishTurn = useCallback(
    (finalStates: ReadonlyMap<number, ClassroomWordState>) => {
      void session.current?.pause();
      const total = references[ayahRef.current]?.length ?? 0;
      let confirmed = 0;
      finalStates.forEach((wordState) => {
        if (wordState === 'confirmed') confirmed += 1;
      });
      const percent = total === 0 ? 0 : Math.round((confirmed / total) * 100);
      setScore(percent);
      turnRef.current = 'scored';
      setTurn('scored');
      /* The beat the score is readable for, then the loop decides: below the
         bar the reciter says it again, at the bar the next ayah — or done. */
      clearScoreTimer();
      scoreTimer.current = setTimeout(() => {
        const index = ayahRef.current;
        if (percent < ADVANCE_AT * 100) {
          beginAyah(index);
        } else if (index + 1 < references.length) {
          beginAyah(index + 1);
        } else {
          void teardown();
          setState('finished');
        }
      }, SCORE_BEAT_MS);
    },
    [references, beginAyah, teardown],
  );

  /* One transcript event: re-run the strict pass over this turn's window and
     merge monotonic — a word never falls back to pending when the rolling
     window forgets it, and green outranks red so an early misread that a
     later pass hears right is quietly upgraded. */
  const onTranscript = useCallback(
    (windowText: string) => {
      if (turnRef.current !== 'you') return;
      const ayahReference = references[ayahRef.current];
      if (!ayahReference || ayahReference.length === 0) return;
      const live = alignClassroom(ayahReference, windowText, skipsRef.current);
      const merged = new Map(statesRef.current);
      live.states.forEach((wordState, index) => {
        const kept = merged.get(index) ?? 'pending';
        if (RANK[wordState] > RANK[kept]) merged.set(index, wordState);
      });
      statesRef.current = merged;
      setWordStates(merged);
      const resolvedTo = firstUnresolved(merged, ayahReference.length);
      setSelected(resolvedTo);
      if (resolvedTo >= ayahReference.length) finishTurn(merged);
    },
    [references, finishTurn],
  );

  const start = useCallback(async () => {
    if (!canRecite || references.length === 0) return;
    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      setState('denied');
      return;
    }
    onBeforeStart?.();
    setState('starting');
    resetTurn();
    setAyahIndex(0);
    ayahRef.current = 0;
    try {
      /* Model loaded now, mic closed — the reciter speaks first. */
      session.current = await startFollowSession(
        {
          onTranscript,
          onError: (message) => console.warn('recite classroom', message),
          /* Three dead passes: close the classroom honestly rather than
             hold a selector on a word nothing is listening for. */
          onBroken: () => void stop(),
        },
        { startPaused: true },
      );
      turnRef.current = 'reciter';
      setTurn('reciter');
      setState('running');
    } catch (error) {
      console.warn('recite classroom start', error);
      await stop();
    }
  }, [references.length, onBeforeStart, onTranscript, resetTurn, stop]);

  const reciterFinished = useCallback(() => {
    if (turnRef.current !== 'reciter' || !session.current) return;
    void session.current.resume().then(() => {
      turnRef.current = 'you';
      setTurn('you');
    });
  }, []);

  const again = useCallback(() => beginAyah(ayahRef.current), [beginAyah]);

  const next = useCallback(() => {
    clearScoreTimer();
    const index = ayahRef.current;
    if (index + 1 < references.length) {
      beginAyah(index + 1);
    } else {
      void teardown();
      setState('finished');
    }
  }, [references.length, beginAyah, teardown]);

  const skipWord = useCallback(() => {
    if (turnRef.current !== 'you') return;
    const ayahReference = references[ayahRef.current];
    if (!ayahReference) return;
    const index = firstUnresolved(statesRef.current, ayahReference.length);
    if (index >= ayahReference.length) return;
    skipsRef.current.add(index);
    const merged = new Map(statesRef.current);
    merged.set(index, 'conceded');
    statesRef.current = merged;
    setWordStates(merged);
    const resolvedTo = firstUnresolved(merged, ayahReference.length);
    setSelected(resolvedTo);
    if (resolvedTo >= ayahReference.length) finishTurn(merged);
  }, [references, finishTurn]);

  return {
    state,
    turn,
    ayahIndex,
    currentVerse: ayahIndex + 1,
    totalVerses: references.length,
    wordStates,
    selected,
    wordCount,
    score,
    active: state === 'starting' || state === 'running',
    start,
    stop,
    reciterFinished,
    again,
    next,
    skipWord,
    attempt,
  };
}
