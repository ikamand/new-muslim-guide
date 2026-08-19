import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { ThemedText } from '@/components/themed-text';
import { resolveNotes, type Pillar } from '@/content';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * One pillar as reference reading. Shared by the five pillars of Islam and the
 * six articles of faith so the two pages cannot drift apart visually — they
 * are the same kind of thing and a reader moving between them should not have
 * to re-learn the layout.
 */
export function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      <View style={styles.cardHead}>
        <View style={[styles.number, { backgroundColor: theme.accentMuted }]}>
          <ThemedText type="smallBold" themeColor="accent">
            {index + 1}
          </ThemedText>
        </View>
        <View style={styles.cardHeadText}>
          <ThemedText type="smallBold" style={styles.cardTitle}>
            {pillar.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {pillar.transliteration}
          </ThemedText>
        </View>
        <ThemedText style={styles.arabic}>{pillar.arabic}</ThemedText>
      </View>

      <ThemedText type="default">{pillar.summary}</ThemedText>

      <ThemedText type="small" themeColor="textSecondary">
        {pillar.detail}
      </ThemedText>

      {resolveNotes(pillar.note, pillar.meta?.notes).map((entry, position) => (
        <ContentNoteCard key={`${entry.kind}-${position}`} entry={entry} />
      ))}

      {pillar.guideId && (
        <Link href={{ pathname: '/guide/[id]', params: { id: pillar.guideId } }} asChild>
          <Pressable
            style={({ pressed }) => [
              styles.link,
              { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="smallBold" themeColor="accent">
              {t('pillars.taughtHere')}
            </ThemedText>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardHeadText: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabic: {
    fontSize: 22,
    lineHeight: 36,
    writingDirection: 'rtl',
  },
  link: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
