import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrayerTimesCard } from '@/components/prayer-times-card';
import { ThemedText } from '@/components/themed-text';
import { PRAYERS, PURIFICATION, REFERENCES, type Guide, type Reference } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { localiseGuide, localiseReference } from '@/i18n/localise';
import { useTheme } from '@/hooks/use-theme';

function GuideCard({ guide, isNext }: { guide: Guide; isNext?: boolean }) {
  const theme = useTheme();

  return (
    <Link href={{ pathname: '/guide/[id]', params: { id: guide.id } }} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.cardText}>
          <ThemedText type="smallBold" style={styles.cardTitle}>
            {guide.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {guide.subtitle}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor={isNext ? 'accent' : 'textSecondary'}>
          {isNext ? 'Next' : `${guide.steps.length} steps`}
        </ThemedText>
      </Pressable>
    </Link>
  );
}

/** Same shape as a guide card, but it opens a page you read rather than steps. */
function ReferenceCard({ reference }: { reference: Reference }) {
  const theme = useTheme();

  return (
    <Link href={{ pathname: '/reference/[id]', params: { id: reference.id } }} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.cardText}>
          <ThemedText type="smallBold" style={styles.cardTitle}>
            {reference.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {reference.subtitle}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const theme = useTheme();
  const { next } = usePrayerTimes();
  const { locale, t } = useLocale();
  const { audience } = useSettings();

  // A topic marked for one audience is hidden from the other. Someone who
  // declined the question sees everything — the honest fallback, since the app
  // would otherwise withhold something on a guess.
  const topics = REFERENCES.filter(
    (reference) =>
      reference.surface === 'pray' &&
      (!reference.audience || !audience || reference.audience === audience),
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <PrayerTimesCard />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('home.beforeYouPray')}
          </ThemedText>
          {PURIFICATION.map((guide) => (
            <GuideCard key={guide.id} guide={localiseGuide(guide, locale)} />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('home.fivePrayers')}
          </ThemedText>
          {PRAYERS.map((prayer) => (
            <GuideCard
              key={prayer.id}
              guide={localiseGuide(prayer, locale)}
              isNext={prayer.id === next?.id}
            />
          ))}
        </View>

        {topics.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              {t('home.different')}
            </ThemedText>
            {topics.map((topic) => (
              <ReferenceCard key={topic.id} reference={localiseReference(topic, locale)} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.one,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
});
