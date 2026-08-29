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
 * ⚠️ **This over-counts on purpose — the opposite trade from the tap.**
 * Somebody who flings to the bottom to see how long the page is gets the mark.
 * Iyad chose that over a bookkeeping button: the tick is undoable in the
 * journey's stage list, and `observations` still records opens and finishes
 * separately, so nothing downstream mistakes the mark for competence.
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
  const { loaded: observationsLoaded, finish } = useObservations();

  // Lazy state, not a ref: the compiler's lint forbids reading a ref in render.
  const [progress] = useState(() => new Animated.Value(0));
  const viewport = useRef(0);
  const content = useRef(0);
  const offset = useRef(0);
  /** State rather than a ref so the effect below re-runs when the end is reached. */
  const [reachedEnd, setReachedEnd] = useState(false);
  const marked = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const measure = useCallback(
    (fromScroll: boolean) => {
      if (viewport.current <= 0 || content.current <= 0) return;

      const scrollable = content.current - viewport.current;
      progress.setValue(
        scrollable <= 0 ? 1 : Math.min(1, Math.max(0, offset.current / scrollable)),
      );

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

  useEffect(() => {
    /*
      The ref, not `reachedEnd`, is what makes this once-per-mount. `finish`
      changes identity when `completedLessons` changes — which the
      `completeLesson` call below causes — so this effect re-runs right after
      it records, and without the guard it recorded every read twice, 3ms
      apart. Observed on 29 Aug, not reasoned about.
    */
    if (marked.current || !reachedEnd || !settingsLoaded || !observationsLoaded) return;
    marked.current = true;
    completeLesson(lessonKey);
    /* Records a date every read-through — competence is a question about
       dates, and a second reading is real evidence. See `lib/competence.ts`. */
    finish(lessonKey);
  }, [reachedEnd, settingsLoaded, observationsLoaded, lessonKey, completeLesson, finish]);

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
