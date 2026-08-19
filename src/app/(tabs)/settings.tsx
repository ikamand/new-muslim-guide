import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { Recitations } from '@/content/recitations';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useSettings, type Settings } from '@/hooks/use-settings';
import { useLocale } from '@/hooks/use-locale';
import { LOCALE_NAMES, LOCALES } from '@/i18n/locales';
import { useTheme } from '@/hooks/use-theme';

function SettingRow({
  label,
  description,
  settingKey,
  isLast,
}: {
  label: string;
  description: string;
  settingKey: keyof Settings;
  /** The divider separates rows; the last row has nothing to separate from. */
  isLast?: boolean;
}) {
  const theme = useTheme();
  const settings = useSettings();
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

/**
 * Language, named in each language.
 *
 * A list rather than a picker: four options fit on screen, and a modal to
 * choose between four things is a step nobody needs.
 */
function LanguageGroup() {
  const theme = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <View
      style={[styles.group, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      {LOCALES.map((option, index) => (
        <Pressable
          key={option}
          onPress={() => setLocale(option)}
          accessibilityRole="radio"
          accessibilityState={{ selected: locale === option }}
          style={[
            styles.row,
            index < LOCALES.length - 1 && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: theme.border,
            },
          ]}>
          <ThemedText type="default">{LOCALE_NAMES[option]}</ThemedText>
          {locale === option && (
            <ThemedText type="smallBold" themeColor="accent">
              ✓
            </ThemedText>
          )}
        </Pressable>
      ))}
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('settings.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">{t('settings.intro')}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.language')}
          </ThemedText>
          <LanguageGroup />
        </View>

        <View style={[styles.group, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <SettingRow
            label={t('settings.transliteration')}
            description={t('settings.transliteration.help')}
            settingKey="transliteration"
          />
          <SettingRow
            label={t('settings.translation')}
            description={t('settings.translation.help')}
            settingKey="translation"
            isLast
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.duringPrayer')}
          </ThemedText>
          <View
            style={[
              styles.group,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <SettingRow
              label={t('settings.keepAwake')}
              description={t('settings.keepAwake.help')}
              settingKey="keepAwake"
              isLast
            />
          </View>
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
