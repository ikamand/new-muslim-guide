import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Shelf } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { TopicRow, type TopicSpec } from '@/components/topic-row';
import { CURRENCIES } from '@/content/nisab';
import {
  DAILY_PRAYERS,
  resolveRef,
  TOPIC_GROUPS,
} from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { routeFor } from '@/lib/content-routes';
import { localiseCatalogEntry } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';

/**
 * The library: every teaching page, grouped by the moment it answers.
 *
 * These five shelves WERE the Learn tab, and moved here when the tab became
 * the path (docs/learn-redesign-plan.md §4): one tab, one direction, and the
 * lookup surface one tap behind it. The groups are `TOPIC_GROUPS`, unchanged
 * — grouped by when the question arrives, not by subject, because a beginner
 * does not arrive wanting "Clothing"; they arrive having opened a fridge.
 *
 * Fixed order, deliberately. The Learn tab used to re-sort these shelves by
 * prayer confidence; a lookup surface has no "now", and a page that holds
 * still is a page you can come back to.
 */
export default function LibraryScreen() {
  const { locale, t } = useLocale();
  const { reading } = useObservations();

  return (
    <>
      <Stack.Screen options={{ title: t('library.title') }} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('library.intro')}
        </ThemedText>

        {TOPIC_GROUPS.map((group) => {
          /*
            The screens that live in a group without being catalogue content.
            They join the list before the count is taken, so the shelf's
            number and its last rosette can never disagree — the exact bug
            the Learn tab shipped when the header counted `topics` and the
            rows rendered `[...specials, ...topics]`.
          */
          const specials: TopicSpec[] = [];
          if (group.id === 'praying') {
            specials.push({
              key: 'screen:pray',
              href: '/pray',
              title: t('learn.everyPrayer.title'),
              subtitle: t('learn.everyPrayer.subtitle'),
              count: DAILY_PRAYERS.length,
              unit: 'count.prayers',
            });
          }
          if (group.id === 'year') {
            specials.push({
              key: 'screen:zakat',
              href: '/zakat',
              title: t('zakat.title'),
              subtitle: t('zakat.open'),
              count: CURRENCIES.length,
              unit: 'zakat.currencies',
            });
          }

          const topics: TopicSpec[] = group.topics
            .map(resolveRef)
            .filter((entry) => entry !== undefined)
            .map((entry) => localiseCatalogEntry(entry, locale))
            .map((topic) => ({
              key: `${topic.kind}:${topic.id}`,
              href: routeFor(topic),
              title: topic.title,
              subtitle: topic.shortDescription,
              count: topic.pieces,
              unit:
                topic.pieceUnit === 'minutes'
                  ? ('count.minutes.long' as UIKey)
                  : (`count.${topic.pieceUnit}` as UIKey),
              progress: reading[`${topic.kind}:${topic.id}`]?.furthest,
            }));

          const rows = [...specials, ...topics];

          return (
            <View key={group.id} style={styles.section}>
              <Shelf label={t(`learn.group.${group.id}` as UIKey)} count={rows.length} />
              <View>
                {rows.map(({ key, ...row }, i) => (
                  <TopicRow key={key} {...row} index={i + 1} />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
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
  section: {
    gap: Spacing.three,
  },
});
