import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RecitationCard } from '@/components/recitation-card';
import { ContentNoteCard } from '@/components/content-note';
import { ThemedText } from '@/components/themed-text';
import { DUAS, resolveNotes } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localiseDua } from '@/i18n/localise';

/**
 * The day's supplications, in the order the day happens.
 *
 * Ordered by when you would say them rather than by importance or length, so
 * someone can read down the list and recognise their own morning.
 */
export default function DuasScreen() {
  const { locale, t } = useLocale();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('duas.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('duas.intro')}
      </ThemedText>

      <View style={styles.list}>
        {DUAS.map((entry) => localiseDua(entry, locale)).map((dua) => (
          <View key={dua.id} style={styles.item}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.when}>
              {dua.when}
            </ThemedText>
            <RecitationCard recitation={dua.says} />
            {resolveNotes(dua.note, dua.meta?.notes).map((entry, position) => (
              <ContentNoteCard key={`${entry.kind}-${position}`} entry={entry} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  list: {
    gap: Spacing.four,
  },
  item: {
    gap: Spacing.two,
  },
  when: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
