import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrayerTimesCard } from '@/components/prayer-times-card';
import { ThemedText } from '@/components/themed-text';
import { PRAYERS, WUDU, type Guide } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useLocale } from '@/hooks/use-locale';
import { localiseGuide } from '@/i18n/localise';
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

export default function HomeScreen() {
  const theme = useTheme();
  const { next } = usePrayerTimes();
  const { locale, t } = useLocale();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <PrayerTimesCard />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('home.beforeYouPray')}
          </ThemedText>
          <GuideCard guide={localiseGuide(WUDU, locale)} />
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
