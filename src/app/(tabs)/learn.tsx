import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { getPracticeClipCount, IMAN_PILLARS, PILLARS } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

const PRACTICE_CLIP_COUNT = getPracticeClipCount();

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

        <View style={styles.list}>
          {/*
            Belief sits above practice on purpose. Someone who has just said the
            shahada has already accepted all six of these; naming them is
            reassurance, where the five pillars are a list of things still to do.
          */}
          <LearnCard
            href="/practice"
            title={t('learn.practice.title')}
            subtitle={t('learn.practice.subtitle')}
            count={PRACTICE_CLIP_COUNT}
          />
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
