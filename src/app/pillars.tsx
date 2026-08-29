import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { LessonEnd } from '@/components/lesson-end';
import { PillarCard } from '@/components/pillar-card';
import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { PILLARS, SHAHADA } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localisePillar, localiseRecitation } from '@/i18n/localise';

export default function PillarsScreen() {
  const { locale, t } = useLocale();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('pillars.title') }} />

      <ThemedText type="default" themeColor="textSecondary">{t('pillars.intro')}</ThemedText>

      <View style={styles.section}>
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
          {t('pillars.testimony')}
        </ThemedText>
        <RecitationCard recitation={localiseRecitation(SHAHADA, locale)} />
      </View>

      <View style={styles.list}>
        {PILLARS.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={localisePillar(pillar, locale)} index={index} />
        ))}
      </View>

      {/*
        The journey's "The Five Pillars" step points at `pillar:salah`, because
        a step has to point at a record and this page is where that record is
        read. It is the key the stage list ticks, so it is the key this marks —
        anything else would tick nothing.
      */}
      <LessonEnd lessonKey="pillar:salah" />
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
});
