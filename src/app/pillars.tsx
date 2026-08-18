import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { PILLARS, SHAHADA, type Pillar } from '@/content';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      <View style={styles.cardHead}>
        <View style={[styles.number, { backgroundColor: theme.accentMuted }]}>
          <ThemedText type="smallBold" themeColor="accent">
            {index + 1}
          </ThemedText>
        </View>
        <View style={styles.cardHeadText}>
          <ThemedText type="smallBold" style={styles.cardTitle}>
            {pillar.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {pillar.transliteration}
          </ThemedText>
        </View>
        <ThemedText style={styles.arabic}>{pillar.arabic}</ThemedText>
      </View>

      <ThemedText type="default">{pillar.summary}</ThemedText>

      <ThemedText type="small" themeColor="textSecondary">
        {pillar.detail}
      </ThemedText>

      {pillar.guideId && (
        <Link href={{ pathname: '/guide/[id]', params: { id: pillar.guideId } }} asChild>
          <Pressable
            style={({ pressed }) => [
              styles.link,
              { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="smallBold" themeColor="accent">
              The app teaches this →
            </ThemedText>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

export default function PillarsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'The Five Pillars' }} />

      <ThemedText type="default" themeColor="textSecondary">
        The five things Islam is built on. Only the first two ask anything of you today — the
        rest arrive in their own time, and two of them may never apply to you at all.
      </ThemedText>

      <View style={styles.section}>
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
          The testimony
        </ThemedText>
        <RecitationCard recitation={SHAHADA} />
      </View>

      <View style={styles.list}>
        {PILLARS.map((pillar, index) => (
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
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardHeadText: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabic: {
    fontSize: 22,
    lineHeight: 36,
    writingDirection: 'rtl',
  },
  link: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
