import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';

import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The scroll view of a lesson: a progress bar that fills as you read, and the
 * mark that lands when you reach the end.
 *
 * ## Scroll marks the lesson — again, but not the way that failed
 *
 * This is the second reversal on this question, so the history rides here.
 * Reading was first inferred from scrolling to the EXACT bottom, and that was
 * unreliable everywhere but web: Android's last scroll event can stop a beat
 * short of where the finger did, and iOS sends its final event only after a
 * deceleration, so a careful drag never produced one. The tap that replaced it
 * (see `lesson-end.tsx`, commit 717d) was reliable but read as clutter — two
 * buttons at the end of every article saying almost the same thing — and Iyad
 * asked for the scroll back on 29 Aug.
 *
 * What makes it safe now is the slack. `END_SLACK` marks the lesson when the
 * bottom of the viewport is within 200px of the end of the content — roughly
 * the end-matter: the next-lesson button and the page's bottom padding. Any
 * scroll event inside that stretch lands the mark, and events fire every 16ms
 * throughout travel, so nothing depends on the one final event the platforms
 * fail to send. The failure mode that killed the exact-bottom version cannot
 * reach a 200px window.
 *
 * ## Reaching the end is not enough — the reader has to have been here
 *
 * The slack version over-counted on purpose, and the cost landed on 4 Sep:
 * a page short enough to fit the screen ticked itself THE MOMENT IT OPENED
 * (the layout path below, with nothing to scroll), and a fling to see how
 * long an article was ticked it too. Iyad browsed two whole chapters that
 * way, the ledger recorded them as read, and the Learn tab then parked his
 * pen three chapters on from where he actually was. Every count on that tab
 * is a view of this one mark, so once it lies nothing downstream can be
 * right.
 *
 * So the mark now needs two things: the end reached, as before, AND the page
 * open for `DWELL_MS`. Opening a page stops being finishing it; a fling and
 * a glance land nothing. The other direction is still recoverable without a
 * bookkeeping button: the next-lesson button in `lesson-end.tsx` marks on
 * tap, and the unit screen's circle marks by hand.
 *
 * ## The mark waits for storage
 *
 * Both providers start on defaults and load from disk a beat later. A tap
 * could never race that; a scroll — or a page short enough to fit the screen —
 * can. Marking through state before the load would write the defaults back
 * over the stored history, so the reach is recorded at once and the mark
 * itself waits for both `loaded` flags.
 *
 * A page that fits without scrolling emits no scroll events, so the same
 * check runs off layout — after a beat, because content can report short
 * mid-render and a lesson must not mark itself while still laying out.
 */
export function LessonScroll({ lessonKey, children, ...scroll }: LessonScrollProps) {
  const theme = useTheme();
  const { loaded: settingsLoaded, completeLesson } = useSettings();
  const { loaded: observationsLoaded, finish, leftReading } = useObservations();

  // Lazy state, not a ref: the compiler's lint forbids reading a ref in render.
  const [progress] = useState(() => new Animated.Value(0));
  const viewport = useRef(0);
  const content = useRef(0);
  const offset = useRef(0);
  /** State rather than a ref so the effect below re-runs when the end is reached. */
  const [reachedEnd, setReachedEnd] = useState(false);
  /** True once the page has been open for `DWELL_MS` — the other half of the mark. */
  const [dwelt, setDwelt] = useState(false);
  const marked = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /** The deepest the reader has been, as the bar's own fraction. */
  const furthest = useRef(0);
  /*
    The unmount recorder reads through a ref so the cleanup below can be a
    true once-per-mount effect — depending on `leftReading` would make its
    cleanup fire on any identity change and record a departure mid-read.
  */
  const onLeave = useRef({ leftReading, lessonKey, loaded: observationsLoaded });
  onLeave.current = { leftReading, lessonKey, loaded: observationsLoaded };

  const measure = useCallback(
    (fromScroll: boolean) => {
      if (viewport.current <= 0 || content.current <= 0) return;

      const scrollable = content.current - viewport.current;
      const fraction =
        scrollable <= 0 ? 1 : Math.min(1, Math.max(0, offset.current / scrollable));
      progress.setValue(fraction);
      furthest.current = Math.max(furthest.current, fraction);

      const atEnd = offset.current + viewport.current >= content.current - END_SLACK;
      if (!atEnd) return;

      if (fromScroll) {
        setReachedEnd(true);
        return;
      }
      // Layout settles in stages; only a size that survives the beat counts.
      clearTimeout(settle.current);
      settle.current = setTimeout(() => {
        if (offset.current + viewport.current >= content.current - END_SLACK) {
          setReachedEnd(true);
        }
      }, SETTLE_MS);
    },
    [progress],
  );

  useEffect(() => () => clearTimeout(settle.current), []);

  /* The dwell clock starts at mount and runs once; leaving early clears it. */
  useEffect(() => {
    const timer = setTimeout(() => setDwelt(true), DWELL_MS);
    return () => clearTimeout(timer);
  }, []);

  /*
    Leaving partway is worth remembering — it is the whole "You were reading"
    signal on Today and Learn. Recorded once, on unmount, never per scroll
    event; below 5% is a glance, not a reading. The mark guard keeps a
    finished read from also logging itself as unfinished, and the loaded
    guard keeps a too-early departure from writing over stored history —
    the same race the mark effect below waits out.
  */
  useEffect(
    () => () => {
      const leave = onLeave.current;
      if (!marked.current && leave.loaded && furthest.current > 0.05) {
        leave.leftReading(leave.lessonKey, furthest.current);
      }
    },
    [],
  );

  useEffect(() => {
    /*
      The ref, not `reachedEnd`, is what makes this once-per-mount. `finish`
      changes identity when `completedLessons` changes — which the
      `completeLesson` call below causes — so this effect re-runs right after
      it records, and without the guard it recorded every read twice, 3ms
      apart. Observed on 29 Aug, not reasoned about.
    */
    if (marked.current || !reachedEnd || !dwelt || !settingsLoaded || !observationsLoaded) {
      return;
    }
    marked.current = true;
    completeLesson(lessonKey);
    /* Records a date every read-through — competence is a question about
       dates, and a second reading is real evidence. See `lib/competence.ts`. */
    finish(lessonKey);
  }, [reachedEnd, dwelt, settingsLoaded, observationsLoaded, lessonKey, completeLesson, finish]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    offset.current = contentOffset.y;
    content.current = contentSize.height;
    viewport.current = layoutMeasurement.height;
    measure(true);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    viewport.current = event.nativeEvent.layout.height;
    measure(false);
  };

  const onContentSizeChange = (_width: number, height: number) => {
    content.current = height;
    measure(false);
  };

  return (
    <View style={styles.frame}>
      <ScrollView
        {...scroll}
        onScroll={onScroll}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={16}>
        {children}
      </ScrollView>
      <Animated.View
        importantForAccessibility="no"
        style={[styles.bar, { backgroundColor: theme.accent, transform: [{ scaleX: progress }] }]}
      />
    </View>
  );
}

type LessonScrollProps = ScrollViewProps & {
  /** What reaching the end marks — the same key `LessonEnd` navigates from. */
  lessonKey: string;
};

/**
 * How far above the true bottom still counts as the end: the next-lesson
 * button plus the page's bottom padding — about 136px on a reference page —
 * with room to spare for the truncated final scroll events described above.
 * Reaching here means the last line of the prose is on screen.
 */
const END_SLACK = 200;

/** Long enough for a second layout pass, short enough to beat any reader. */
const SETTLE_MS = 500;

/**
 * How long a page must have been open before reaching its end can mark it.
 * The shortest lesson in the curriculum is two minutes; twenty seconds is
 * well under a real reading of it and well over a fling, an open-and-back,
 * or a page that fitted the screen and never scrolled.
 */
const DWELL_MS = 20_000;

const styles = StyleSheet.create({
  frame: {
    flex: 1,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    transformOrigin: 'left',
    // In style, not as a prop — react-native-web deprecates the prop form.
    pointerEvents: 'none',
  },
});
