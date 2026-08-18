import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PillarCard } from '@/components/pillar-card';
import { ThemedText } from '@/components/themed-text';
import { IMAN_PILLARS } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function ImanScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'The Six Articles of Faith' }} />

      <ThemedText type="default" themeColor="textSecondary">
        The five pillars are what you do. These six are what you believe while doing it. You
        already accepted them when you said the shahada — this page is only putting names to
        them, and nothing here is something you need to memorise.
      </ThemedText>

      <View style={styles.list}>
        {IMAN_PILLARS.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={pillar} index={index} />
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
