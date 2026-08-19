import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PillarCard } from '@/components/pillar-card';
import { ThemedText } from '@/components/themed-text';
import { IMAN_PILLARS } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localisePillar } from '@/i18n/localise';

export default function ImanScreen() {
  const { locale, t } = useLocale();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('iman.title') }} />

      <ThemedText type="default" themeColor="textSecondary">{t('iman.intro')}</ThemedText>

      <View style={styles.list}>
        {IMAN_PILLARS.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={localisePillar(pillar, locale)} index={index} />
        ))}
      </View>
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
  list: {
    gap: Spacing.three,
  },
});
