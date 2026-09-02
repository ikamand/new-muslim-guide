import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { align, buildReference, type ReferenceWord } from '@/lib/recite-align';
import {
  canRecite,
  downloadReciteModels,
  reciteModelsReady,
  startFollowSession,
  type FollowSession,
} from '@/lib/recite-session';

/**
 * The recite-follow session as a hook — the brain behind "Recite with me".
 *
 * Lifted out of the follow card on 30 Aug 2026, on Iyad's redesign: the
 * highlight lives INSIDE the surah screen's ayah cards now (the reader reads
 * the text they already read, and it lights under their voice), so the
 * screen needs the session state and the cards need the word states, while
 * the pinned control bar needs the buttons. One hook, three consumers.
 *
 * The display rules carried over unchanged, each earned by a phone test:
 * - `shownPosition` is a high-water mark — the highlight never retreats when
 *   streaming recognition revises a partial.
 * - `displayed` walks toward it a word at a time (hurrying when far behind),
 *   so a batch of hearing still paints as a teacher's moving finger.
 * - `heard` is the set of words actually heard; words the aligner passed
 *   over stay unlit — a mistake shows as a quiet absence, never a colour —
 *   and light late if the reader circles back and says them right.
 */

export type ReciteState =
  | 'closed'
  | 'download'
  | 'downloading'
  | 'ready'
  | 'starting'
  | 'listening'
  | 'denied';

export type ReciteFollowController = {
  available: boolean;
  reference: readonly ReferenceWord[];
  state: ReciteState;
  /** True while the pinned bar should show and cards should render words. */
  open: boolean;
  status: string;
  displayed: number;
  heard: ReadonlySet<number>;
  /** 1-based verse whose words the walk is currently painting. */
  currentVerse: number;
  totalVerses: number;
  complete: boolean;
  openControls: () => void;
  close: () => void;
  download: () => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

export function useReciteFollow(
  verses: readonly { arabic: string }[],
  strings: {
    downloading: (percent: number) => string;
    error: string;
  },
  onBeforeStart?: () => void,
): ReciteFollowController {
  const reference = useMemo(() => buildReference(verses), [verses]);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ReciteState>('closed');
  const [status, setStatus] = useState('');
  const [transcript, setTranscript] = useState('');
  const [shownPosition, setShownPosition] = useState(0);
  const [heard, setHeard] = useState<ReadonlySet<number>>(new Set());
  const [displayed, setDisplayed] = useState(0);
  const session = useRef<FollowSession | undefined>(undefined);

  const alignment = align(reference, transcript);

  useEffect(() => {
    if (displayed >= shownPosition) return undefined;
    /* The walk savours when close and hurries when behind — a fixed stroll
       read as lag the moment the reader got ayahs ahead. */
    const gap = shownPosition - displayed;
    const pace = gap > 8 ? 35 : gap > 3 ? 70 : 140;
    const walker = setInterval(
      () => setDisplayed((at) => (at < shownPosition ? at + 1 : at)),
      pace,
    );
    return () => clearInterval(walker);
  }, [displayed, shownPosition]);

  const stop = useCallback(async () => {
    const current = session.current;
    session.current = undefined;
    await current?.stop();
    setState(reciteModelsReady() ? 'ready' : 'download');
  }, []);

  useEffect(() => () => void session.current?.stop(), []);

  /* A locked screen or a phone call must not leave a wedged mic session
     behind — Android quietly stops delivering audio to backgrounded apps,
     which would look like eternal listening. Stopping is the honest state. */
  useEffect(() => {
    const sub = AppState.addEventListener('change', (appState) => {
      if (appState !== 'active' && session.current) void stop();
    });
    return () => sub.remove();
  }, [stop]);

  /* Complete means done, quietly — the session does not outlive the surah. */
  useEffect(() => {
    if (alignment.complete && session.current) void stop();
  }, [alignment.complete, stop]);

  const openControls = useCallback(() => {
    setOpen(true);
    setState(reciteModelsReady() ? 'ready' : 'download');
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setState('closed');
    void stop();
  }, [stop]);

  const download = useCallback(async () => {
    setState('downloading');
    try {
      const ok = await downloadReciteModels((percent) => setStatus(strings.downloading(percent)));
      setStatus('');
      setState(ok ? 'ready' : 'download');
    } catch (error) {
      console.warn('recite download', error);
      setStatus(__DEV__ ? String(error) : '');
      setState('download');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strings.downloading]);

  const start = useCallback(async () => {
    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      setState('denied');
      return;
    }
    onBeforeStart?.();
    setState('starting');
    setTranscript('');
    setShownPosition(0);
    setDisplayed(0);
    setHeard(new Set());
    try {
      session.current = await startFollowSession({
        onTranscript: (text) => {
          setTranscript(text);
          const live = align(reference, text);
          setShownPosition((prev) => Math.max(prev, live.position));
          setHeard((prev) => {
            const next = new Set(prev);
            const passed = new Set(live.passedOver);
            for (let index = 0; index < live.position; index += 1) {
              if (!passed.has(index)) next.add(index);
            }
            return next;
          });
        },
        onError: (message) => {
          /* The words stay still; the cause goes to the Metro terminal. */
          console.warn('recite session', message);
        },
        onBroken: () => {
          /* Three dead passes: stop saying "listening" — it isn't. */
          setStatus(strings.error);
          void stop();
        },
      });
      setState('listening');
    } catch (error) {
      console.warn('recite start', error);
      setStatus(__DEV__ ? `${strings.error} — ${String(error)}` : strings.error);
      await stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBeforeStart, reference, stop, strings.error]);

  /* The verse the walk is painting — anchored on the last painted word, so
     an ayah's final word gets its moment green before the card turns. */
  const anchor = Math.min(Math.max(displayed - 1, 0), Math.max(reference.length - 1, 0));
  const currentVerse =
    reference.length === 0 ? 1 : displayed === 0 ? reference[0].verse : reference[anchor].verse;
  const totalVerses = reference.length === 0 ? 0 : reference[reference.length - 1].verse;

  return {
    available: canRecite && reference.length > 0,
    reference,
    state,
    open,
    status,
    displayed,
    heard,
    currentVerse,
    totalVerses,
    complete: alignment.complete && displayed >= reference.length,
    openControls,
    close,
    download,
    start,
    stop,
  };
}
