import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { Glyph } from '@/components/illustrations';
import { RecitationCard } from '@/components/recitation-card';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { DAY_MOMENTS, DUAS, duasAt, resolveNotes, type DayMoment } from '@/content';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { localiseDua, measure } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';

/**
 * The day's supplications, laid out as a day.
 *
 * This was a flat list of nine, ordered by when you would say them — which was
 * the right instinct and the wrong shape, because a list is scanned by
 * somebody who already knows what they are looking for. That is not who this
 * screen is for.
 *
 * **A new Muslim does not know a duʿa for putting on clothes exists.** They
 * will never scroll to it. What they have instead is a moment — at the door,
 * about to eat, awake at two in the morning — so the screen runs from waking
 * to sleeping and puts each duʿa where it happens. Reading down it is meant to
 * feel like recognising your own day, and noticing how much of it has words
 * you were never told about.
 *
 * The spine down the left is the day passing. It is the same idea as `DayArc`
 * on the prayer times card, turned vertical because this scrolls.
 */

/** A mark per moment. Drawn from the set the app already has. */
const MOMENT_GLYPH: Record<DayMoment, Parameters<typeof Glyph>[0]['name']> = {
  waking: 'sunrise',
  washing: 'wudu',
  leaving: 'door',
  eating: 'food',
  travel: 'travel',
  night: 'night',
};

export default function DuasScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();

  // Measured over every duʿa rather than per moment: the reading has to cover
  // the whole screen for `TranslationGap` to be honest about it.
  const [byId, coverage] = measure(
    () => new Map(DUAS.map((entry) => [entry.id, localiseDua(entry, locale)])),
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('duas.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('duas.intro')}
      </ThemedText>

      {DAY_MOMENTS.map((moment) => {
        const duas = duasAt(moment);
        if (duas.length === 0) return null;

        return (
          <View key={moment} style={styles.moment}>
            {/*
              The spine, and the moment's mark sitting on it. The line runs the
              full height of the block so consecutive moments join up into one
              continuous day rather than reading as six separate sections.
            */}
            <View style={styles.rail}>
              <View style={[styles.railLine, { backgroundColor: theme.border }]} />
              <View style={[styles.railMark, { backgroundColor: theme.accentMuted }]}>
                <Glyph name={MOMENT_GLYPH[moment]} color={theme.accent} size={18} />
              </View>
            </View>

            <View style={styles.momentBody}>
              <ThemedText type="sectionTitle">
                {t(`duas.moment.${moment}` as UIKey)}
              </ThemedText>

              {duas.map((entry) => {
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
                    {/*
                      Where the grading becomes visible. The two after-meal
                      duʿas sit next to each other, one weak and one hasan, and
                      the flat list never said so.
                    */}
                    <SourceDisclosure
                      sources={[...(dua.says.sources ?? []), ...(dua.meta?.sources ?? [])]}
                    />
                  </View>
                );
              })}
            </View>
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
  moment: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  rail: {
    width: 34,
    alignItems: 'center',
  },
  railLine: {
    position: 'absolute',
    top: 0,
    bottom: -Spacing.four,
    width: StyleSheet.hairlineWidth,
  },
  railMark: {
    width: 34,
    height: 34,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentBody: {
    flex: 1,
    gap: Spacing.three,
    paddingBottom: Spacing.two,
  },
  item: {
    gap: Spacing.two,
  },
  when: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
