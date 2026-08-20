import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { formatSource, type Source } from '@/content';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * Where a claim comes from, as a reader sees it.
 *
 * The app has carried structured provenance on its content for a while and
 * showed almost none of it: a `ContentNote` rendered its sources, and a step,
 * a reference section and a duʿa — which is where most of the citations
 * actually live — rendered none. So the grading on a narration existed in the
 * data, was checked against the collection page, and then reached nobody.
 *
 * `formatSource` already prints the grading and who gave it, and it is the
 * same function the audit script prints. One formatter, one wording, three
 * places: this component, the note card, and the terminal.
 *
 * Citations render as text rather than links, for the reason `content-note.tsx`
 * gives: nothing in this app has ever sent anyone off-device, and making a
 * citation tappable would be the first thing that does.
 */
export function SourceLines({
  sources,
  /**
   * Off where whatever opened this list already said the words. The
   * disclosure's own row reads "Where this comes from"; repeating it as a
   * heading underneath printed the same sentence twice, once in capitals.
   */
  showLabel = true,
}: {
  sources: readonly Source[];
  showLabel?: boolean;
}) {
  const { t } = useLocale();

  return (
    <View style={styles.block}>
      {showLabel && (
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.label}>
          {t('note.sources')}
        </ThemedText>
      )}
      {sources.map((source) => (
        <ThemedText
          key={formatSource(source)}
          type="small"
          themeColor="textSecondary"
          style={styles.source}>
          {formatSource(source)}
        </ThemedText>
      ))}
    </View>
  );
}

/**
 * The same list, folded away until asked for.
 *
 * Deliberately not shown by default. Someone learning to pray is holding a
 * phone mid-motion and does not need a citation block between them and the
 * next instruction — but the person who wants to know whether the app is
 * making this up should never have to take its word for it. One quiet line
 * settles both.
 *
 * Renders nothing at all when there is nothing to show, so a screen can drop
 * it in unconditionally.
 */
export function SourceDisclosure({ sources }: { sources: readonly Source[] }) {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  // Deduplicated by the line a reader would see: a step and the recitation
  // inside it often cite the same page, and printing it twice looks like an
  // error rather than like thoroughness.
  const distinct = [
    ...new Map(sources.map((source) => [formatSource(source), source])).values(),
  ];

  if (distinct.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        style={({ pressed }) => [styles.toggle, { opacity: pressed ? 0.6 : 1 }]}
        accessibilityRole="button">
        <ThemedText type="small" themeColor="textSecondary">
          {t('note.sources')}
        </ThemedText>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={12}
          color={theme.textSecondary}
        />
      </Pressable>

      {open && <SourceLines sources={distinct} showLabel={false} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    // Same reasoning as the note card: the row is small text, and the padding
    // is what makes the tap target reachable.
    paddingVertical: Spacing.two,
    paddingRight: Spacing.three,
  },
  block: {
    gap: Spacing.one,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  source: {
    fontVariant: ['tabular-nums'],
  },
});
