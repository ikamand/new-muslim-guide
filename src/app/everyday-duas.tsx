import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { RecitationCard } from '@/components/recitation-card';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { DUAS, resolveNotes } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { localiseDua, measure } from '@/i18n/localise';

/**
 * The nine duʿas the app owns, and the only place pinning happens.
 *
 * These used to be the whole Duʿa tab, laid out as a day. The tab now leads
 * with whichever sitting of adhkār is open, and this screen is no longer
 * listed on it — every one of these occasions is also in Hisn al-Muslim, and
 * two lists of the same duʿas is how a codebase grows a second one that
 * drifts.
 *
 * ## Why it still exists rather than being deleted
 *
 * Three things live only here. The citations were checked one at a time
 * against Bukhari, Muslim and Abu Dawud rather than taken from a publisher.
 * The notes are written for a beginner — what to say when you forget the
 * bismillah halfway through a meal — and the book has nothing of the kind.
 * And these are the ONLY duʿas in the app with French and Spanish; the book's
 * text is IslamHouse's English and untranslated.
 *
 * So the journey and search route here (`content-routes.ts`), and
 * `duaOfTheDay` draws the tab's top card from this set. It is the app's
 * reviewed copy, not a second front door.
 *
 * ## Pinning is not done here any more
 *
 * It moved to a star on every occasion in the book, because a labelled button
 * on this one screen made pinning look like a property of these nine rather
 * than something you can do to anything.
 */
export default function EverydayDuasScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();

  const [byId, coverage] = measure(
    () => new Map(DUAS.map((entry) => [entry.id, localiseDua(entry, locale)])),
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('adhkar.everyday') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('duas.intro')}
      </ThemedText>

      {DUAS.map((entry) => {
        const dua = byId.get(entry.id) ?? entry;
        return (
          <View key={dua.id} style={styles.item}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.when}>
              {dua.when}
            </ThemedText>
            <RecitationCard recitation={dua.says} />
            {resolveNotes(dua.note, dua.meta?.notes).map((note, position) => (
              <ContentNoteCard key={`${note.kind}-${position}`} entry={note} />
            ))}
            <SourceDisclosure
              sources={[...(dua.says.sources ?? []), ...(dua.meta?.sources ?? [])]}
            />

          </View>
        );
      })}

      <TranslationGap coverage={coverage} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  item: { gap: Spacing.two },
  when: { textTransform: 'uppercase', letterSpacing: 1 },
});
