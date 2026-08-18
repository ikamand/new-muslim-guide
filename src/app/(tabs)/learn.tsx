import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { PILLARS } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function LearnScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Learn</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            Background for what you are already doing. Read it when you have a quiet minute —
            none of it is needed before you pray.
          </ThemedText>
        </View>

        <Link href="/pillars" asChild>
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
                The Five Pillars of Islam
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                What Islam asks of you, and in what order it arrives
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="accent">
              {PILLARS.length}
            </ThemedText>
          </Pressable>
        </Link>
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
