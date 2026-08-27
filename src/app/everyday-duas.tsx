import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { RecitationCard } from '@/components/recitation-card';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { DUAS, resolveNotes } from '@/content';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { MAX_PINNED, useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { localiseDua, measure } from '@/i18n/localise';

/**
 * The nine duʿas the app owns, and the only place pinning happens.
 *
 * These used to be the whole Duʿa tab, laid out as a day. They are off that
 * surface now — the tab leads with the sitting the prayer times say is open —
 * but they are not in a drawer: they are the only duʿas in the app with
 * checked citations, and they are the pool a reader pins from.
 *
 * ## Why pinning lives here and not on the tab
 *
 * Pinning is a decision, and decisions belong next to the thing being decided
 * about. Someone pins a duʿa having just read it, not from a list of titles.
 * The tab shows the result; this screen is where the result is chosen.
 *
 * ## Refusing the eleventh
 *
 * At the cap the control says so rather than silently dropping the oldest pin.
 * Dropping would remove something the reader chose, without telling them, from
 * a screen they are not looking at.
 */
export default function EverydayDuasScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { pinnedDuas, togglePinned } = useSettings();

  const [byId, coverage] = measure(
    () => new Map(DUAS.map((entry) => [entry.id, localiseDua(entry, locale)])),
  );

  const full = pinnedDuas.length >= MAX_PINNED;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('adhkar.everyday') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('duas.intro')}
      </ThemedText>

      {DUAS.map((entry) => {
        const dua = byId.get(entry.id) ?? entry;
        const pinned = pinnedDuas.includes(dua.id);
        const blocked = full && !pinned;

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

            <Pressable
              onPress={() => togglePinned(dua.id)}
              disabled={blocked}
              accessibilityRole="button"
              accessibilityState={{ selected: pinned, disabled: blocked }}
              style={({ pressed }) => [
                styles.pin,
                {
                  borderColor: pinned ? theme.accent : theme.border,
                  backgroundColor: pinned ? theme.accentMuted : 'transparent',
                  opacity: blocked ? 0.4 : pressed ? 0.7 : 1,
                },
              ]}>
              <ThemedText type="smallBold" themeColor={pinned ? 'accent' : 'textSecondary'}>
                {pinned ? t('adhkar.unpin') : t('adhkar.pin')}
              </ThemedText>
            </Pressable>
          </View>
        );
      })}

      {full ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {t('adhkar.pinFull')}
        </ThemedText>
      ) : null}

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
  pin: {
    alignSelf: 'flex-start',
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
