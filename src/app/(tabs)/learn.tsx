import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { getPracticeClipCount, IMAN_PILLARS, PILLARS, SHAHADA_GUIDE } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

function LearnCard({
  href,
  title,
  subtitle,
  count,
}: {
  href: Href;
  title: string;
  subtitle: string;
  count: number;
}) {
  const theme = useTheme();

  return (
    <Link href={href} asChild>
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
            {title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="accent">
          {count}
        </ThemedText>
      </Pressable>
    </Link>
  );
}

export default function LearnScreen() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('learn.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">{t('learn.intro')}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.startHere')}
          </ThemedText>
          <View style={styles.list}>
            {/*
              Becoming Muslim leads the tab. Some people open this app before
              they are Muslim at all, and it used to be reachable only as an
              entry inside a reference page about the five pillars.
            */}
            <LearnCard
              href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
              title={t('learn.shahada.title')}
              subtitle={t('learn.shahada.subtitle')}
              count={SHAHADA_STEP_COUNT}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.everyDay')}
          </ThemedText>
          <View style={styles.list}>
            <LearnCard
              href="/practice"
              title={t('learn.practice.title')}
              subtitle={t('learn.practice.subtitle')}
              count={PRACTICE_CLIP_COUNT}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.understanding')}
          </ThemedText>
          <View style={styles.list}>
            <LearnCard
              href="/iman"
              title={t('learn.iman.title')}
              subtitle={t('learn.iman.subtitle')}
              count={IMAN_PILLARS.length}
            />
            <LearnCard
              href="/pillars"
              title={t('learn.pillars.title')}
              subtitle={t('learn.pillars.subtitle')}
              count={PILLARS.length}
            />
          </View>
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
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  list: {
    gap: Spacing.three,
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
