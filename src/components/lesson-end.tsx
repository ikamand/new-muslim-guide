import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
/*
  The curriculum, not the journey: this button's "next" and the Learn tab's
  "next" must come from the same order, or finishing a page offers a lesson
  the tab disagrees with.
*/
import { useCurriculum } from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * The end of a lesson: where to go next, and nothing else.
 *
 * ## Where the marking went
 *
 * This component used to do two jobs — mark the lesson read and offer the
 * next one — and carried three controls to do them: "Done — next", a quiet
 * "Mark as read", and a "Read" chip once marked. Iyad read that as clutter,
 * and he was right: reaching this block IS the evidence of reading, so asking
 * for a tap on top of it was bookkeeping. Marking now belongs to the scroll —
 * see `lesson-scroll.tsx`, which records the reversal and why the slack makes
 * scroll inference safe where the exact-bottom version was not. By the time
 * this button is on screen, the mark has already landed. Un-marking lives in
 * the journey's stage list, which is a claim about a lesson you are looking
 * AT rather than one you are inside.
 *
 * The press marks too, as a fallback — not belt-and-braces reflex, but the
 * one hole the scroll leaves: Android's last scroll event can report a
 * position short of where the finger stopped, the same truncation that
 * killed the exact-bottom version. If that event lands outside the slack,
 * the reader still sees this button and still taps it, and the tap must not
 * depend on an event that never came. Guarded by `completedLessons`, so when
 * the scroll HAS marked — the normal case — the press records nothing and a
 * single reading cannot count as two.
 *
 * ## Replace, not push
 *
 * Reading is a chain: this button leads to the next lesson, whose button
 * leads to the next. Pushing built the whole chain onto the stack, so Back
 * from the fifth lesson walked somebody through four they had just read.
 * `replace` swaps this lesson for the next one, so Back always returns to
 * wherever the reading started — the journey, Learn, a search result.
 *
 * A page with no next lesson — the 24 reference articles that are not
 * journey steps, and the last unfinished one — renders nothing: the mark has
 * landed, and an empty block would be furniture.
 */
export function LessonEnd({ lessonKey }: { lessonKey: string }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLocale();
  const { after } = useCurriculum();
  const { completedLessons, completeLesson } = useSettings();
  const { finish } = useObservations();

  const next = after(lessonKey);
  if (!next) return null;

  const nextLabel = next.labelKey ? t(next.labelKey as UIKey) : next.entry.title;

  const go = () => {
    if (!completedLessons.includes(lessonKey)) {
      completeLesson(lessonKey);
      finish(lessonKey);
    }
    router.replace(routeFor(next.entry));
  };

  return (
    <View style={styles.block}>
      <Pressable
        onPress={go}
        accessibilityRole="button"
        accessibilityLabel={`${t('lesson.next')}: ${nextLabel}`}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
        ]}>
        <View style={styles.label}>
          <ThemedText type="caption" themeColor="textOnAccent" style={styles.kicker}>
            {t('lesson.next')}
          </ThemedText>
          <ThemedText type="cardTitle" themeColor="textOnAccent">
            {nextLabel}
          </ThemedText>
        </View>
        <Ionicons name="arrow-forward" size={20} color={theme.textOnAccent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: Spacing.five,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 56,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  label: {
    flex: 1,
    gap: Spacing.half,
  },
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
