import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { PRAYERS, WUDU, type Guide } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function GuideCard({ guide }: { guide: Guide }) {
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
        <ThemedText type="small" themeColor="accent">
          {guide.steps.length} steps
        </ThemedText>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">How to pray</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            One step at a time, with the words written out. Nothing to set up, nothing to sign
            into — start wherever you are.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            Before you pray
          </ThemedText>
          <GuideCard guide={WUDU} />
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            The five prayers
          </ThemedText>
          {PRAYERS.map((prayer) => (
            <GuideCard key={prayer.id} guide={prayer} />
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
