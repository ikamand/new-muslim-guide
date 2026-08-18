import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { Recitations } from '@/content/recitations';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useDisplaySettings, type DisplaySettings } from '@/hooks/use-display-settings';
import { useTheme } from '@/hooks/use-theme';

function SettingRow({
  label,
  description,
  settingKey,
  isLast,
}: {
  label: string;
  description: string;
  settingKey: keyof DisplaySettings;
  /** The divider separates rows; the last row has nothing to separate from. */
  isLast?: boolean;
}) {
  const theme = useTheme();
  const settings = useDisplaySettings();
  const value = settings[settingKey];

  return (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
      ]}>
      <View style={styles.rowText}>
        <ThemedText type="default">{label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={() => settings.toggle(settingKey)}
        trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
        thumbColor={theme.background}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Settings</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            What you see under the Arabic. Turn them off as you stop needing them.
          </ThemedText>
        </View>

        <View style={[styles.group, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <SettingRow
            label="Transliteration"
            description="The Arabic spelled out in English letters"
            settingKey="transliteration"
          />
          <SettingRow
            label="Translation"
            description="What the words mean in English"
            settingKey="translation"
            isLast
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            Preview
          </ThemedText>
          <RecitationCard recitation={Recitations.takbir} />
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
          The Arabic always stays — it is what you actually say. Everything on this device stays
          on this device.
        </ThemedText>
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
  group: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footnote: {
    textAlign: 'center',
  },
});
