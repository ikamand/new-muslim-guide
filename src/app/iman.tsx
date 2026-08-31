import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { LessonEnd } from '@/components/lesson-end';
import { LessonScroll } from '@/components/lesson-scroll';
import { PillarCard } from '@/components/pillar-card';
import { ThemedText } from '@/components/themed-text';
import { IMAN_PILLARS } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localisePillar } from '@/i18n/localise';

/*
  `article:allah` is the Six Articles step's key — the curriculum points a
  whole-list step at its first record, exactly as /pillars does with
  `pillar:salah`. Reading this screen to the end is what marks the step; it
  was one of the four steps only a checkbox could complete.
*/
export default function ImanScreen() {
  const { locale, t } = useLocale();

  return (
    <LessonScroll lessonKey="article:allah" contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('iman.title') }} />

      <ThemedText type="default" themeColor="textSecondary">{t('iman.intro')}</ThemedText>

      <View style={styles.list}>
        {IMAN_PILLARS.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={localisePillar(pillar, locale)} index={index} />
        ))}
      </View>

      <LessonEnd lessonKey="article:allah" />
    </LessonScroll>
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
    gap: Spacing.three,
  },
});
