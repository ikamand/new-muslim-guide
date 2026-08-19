import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { formatSource, hasMore, type ContentNote } from '@/content';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * A note, with its depth folded away.
 *
 * The beginner sees one plain sentence — the same one they saw before this
 * existed. Everything underneath it, the schools that differ and the
 * narrations behind them, opens only if they ask.
 *
 * That order is the whole point. Someone three weeks into Islam who is told
 * that four schools disagree about how to wipe their arms has not been
 * informed, they have been stalled. But flattening the difference is its own
 * kind of lie, and they will meet someone who does it the other way. So the
 * app holds both and lets the reader choose the depth.
 *
 * Citations render as text rather than links. Nothing in this app has ever
 * sent anyone off-device, and making a citation tappable would be the first
 * thing that does — a decision worth taking deliberately rather than as a
 * side effect. The URLs are stored on every source and ready for it.
 */
export function ContentNoteCard({ entry }: { entry: ContentNote }) {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  const expandable = hasMore(entry);

  return (
    <View style={[styles.note, { borderLeftColor: theme.accent }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {entry.text}
      </ThemedText>

      {expandable && (
        <Pressable
          onPress={() => setOpen((current) => !current)}
          style={({ pressed }) => [styles.toggle, { opacity: pressed ? 0.6 : 1 }]}
          accessibilityRole="button">
          <ThemedText type="smallBold" themeColor="accent">
            {open ? t('note.less') : t('note.more')}
          </ThemedText>
          <Ionicons
            name={open ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={theme.accent}
          />
        </Pressable>
      )}

      {open && (
        <View style={styles.detail}>
          {entry.additionalExplanation && (
            <ThemedText type="small" themeColor="textSecondary">
              {entry.additionalExplanation}
            </ThemedText>
          )}

          {entry.positions && entry.positions.length > 0 && (
            <View style={styles.block}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.label}>
                {t('note.positions')}
              </ThemedText>
              {entry.positions.map((position) => (
                <View key={position.school} style={styles.position}>
                  <View
                    style={[styles.school, { backgroundColor: theme.accentMuted }]}>
                    <ThemedText type="smallBold" themeColor="accent" style={styles.schoolText}>
                      {position.school}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.positionText}>
                    {position.position}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          {entry.sources && entry.sources.length > 0 && (
            <View style={styles.block}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.label}>
                {t('note.sources')}
              </ThemedText>
              {entry.sources.map((source) => (
                <ThemedText
                  key={formatSource(source)}
                  type="small"
                  themeColor="textSecondary"
                  style={styles.source}>
                  {formatSource(source)}
                </ThemedText>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
    gap: Spacing.one,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    // The row is 20px of text, so the padding is what makes the target 44.
    paddingVertical: Spacing.three,
    paddingRight: Spacing.three,
    marginTop: -Spacing.two,
  },
  detail: {
    gap: Spacing.three,
    paddingBottom: Spacing.two,
  },
  block: {
    gap: Spacing.two,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  position: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  school: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: Radius.small,
  },
  schoolText: {
    fontSize: 12,
    lineHeight: 18,
  },
  positionText: {
    flex: 1,
  },
  source: {
    fontVariant: ['tabular-nums'],
  },
});
