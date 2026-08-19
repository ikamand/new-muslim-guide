import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getReference, resolveNotes } from '@/content';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localiseReference } from '@/i18n/localise';
import { useTheme } from '@/hooks/use-theme';

/**
 * A reference topic, read top to bottom.
 *
 * No stepper and no progress bar. Someone here has a question, not a procedure
 * to follow, and making them tap through seven screens to find the one line
 * they came for would be the wrong shape entirely.
 */
export default function ReferenceScreen() {
  const theme = useTheme();
  const { locale } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const source = getReference(id);

  if (!source) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: '' }} />
        <ThemedText type="default" themeColor="textSecondary">
          That page has moved.
        </ThemedText>
      </View>
    );
  }

  const reference = localiseReference(source, locale);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: reference.title }} />

      <ThemedText type="default" themeColor="textSecondary">
        {reference.subtitle}
      </ThemedText>

      <View style={styles.list}>
        {reference.sections.map((section) => (
          <View
            key={section.id}
            style={[
              styles.card,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <ThemedText type="smallBold" style={styles.heading}>
              {section.heading}
            </ThemedText>
            <ThemedText type="default">{section.body}</ThemedText>
            {resolveNotes(section.note, section.notes).map((entry, position) => (
              <View
                key={`${entry.kind}-${position}`}
                style={[styles.note, { borderLeftColor: theme.accent }]}>
                <ThemedText type="small" themeColor="textSecondary">
                  {entry.text}
                </ThemedText>
              </View>
            ))}
          </View>
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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  heading: {
    fontSize: 17,
    lineHeight: 24,
  },
  note: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
    marginTop: Spacing.one,
  },
});
