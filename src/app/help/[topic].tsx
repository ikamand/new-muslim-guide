import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useHelpTopic } from '@/hooks/use-help';
import { useTheme } from '@/hooks/use-theme';

/**
 * One question, answered with what the app already has.
 *
 * A list and nothing else. Someone arriving here tapped a word like "Food and
 * drink" because they had a question they could not name, and what they need is
 * to see the two or three places that answer it — not an introduction to the
 * subject written a third time.
 *
 * There is no empty state, because there is no way to reach one: a topic that
 * resolves to nothing is never offered, and an id that resolves to nothing at
 * all sends the reader to Learn rather than to a page apologising for itself.
 */
export default function HelpTopicScreen() {
  const theme = useTheme();
  const { topic: param } = useLocalSearchParams<{ topic: string }>();
  const topic = useHelpTopic(param ?? '');

  // Only reachable from a stale deep link. Learn is where the same material is
  // browsable, so it is a real answer rather than an error page.
  if (!topic) return <Redirect href="/(tabs)/learn" />;

  return (
    <>
      <Stack.Screen options={{ title: topic.label }} />
      <ScrollView contentContainerStyle={styles.content}>
        {topic.links.map((link) => (
          <PressableLink
            key={link.key}
            href={link.href}
            accessibilityLabel={`${link.title}. ${link.description}`}
            style={[
              styles.row,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="smallBold" style={styles.rowTitle}>
                {link.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {link.description}
              </ThemedText>
            </View>
            <Ionicons name="arrow-forward" size={18} color={theme.accent} />
          </PressableLink>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
});
