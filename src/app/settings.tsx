import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { Recitations } from '@/content/recitations';

import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useSettings } from '@/hooks/use-settings';
import { deleteVoice, savedVoices, type SavedVoice } from '@/content/quran/offline';
import { deleteReciteModels, reciteModelBytes } from '@/lib/recite-session';
import { RECITERS } from '@/content/quran/recitation';
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
  settingKey: 'transliteration' | 'translation' | 'keepAwake';
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
 * The one row in Settings that opens a page rather than flipping a switch.
 *
 * It is here because the credit it leads to came off the narrations. Every
 * publisher the app carries is named on one page a person can find, instead of
 * a domain name printed under a hadith on a teaching screen — see
 * `content/text-sources.ts`.
 */
function SourcesRow() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href="/sources"
      style={[
        styles.group,
        styles.row,
        { borderColor: theme.goldSoft },
      ]}
      pressedStyle={{ opacity: 0.6 }}>
      <View style={styles.rowText}>
        <ThemedText type="default">{t('settings.sources')}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('settings.sources.help')}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.accent} />
    </PressableLink>
  );
}

/**
 * Language, named in each language.
 *
 * A list rather than a picker: the handful of options fit on screen, and a
 * modal to choose between a few things is a step nobody needs.
 *
 * Rendered only when there is more than one language — see the call site.
 */
function LanguageGroup() {
  const theme = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <View
      style={[styles.group, { borderColor: theme.goldSoft }]}>
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

/**
 * A way back into onboarding.
 *
 * The two questions decide what the Learn tab suggests first, and someone's
 * answer to "where are you right now" is exactly the kind of thing that stops
 * being true after a few months. Reopening prefills what they chose last time,
 * and skipping out of a revisit changes nothing.
 */
function OnboardingGroup() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLocale();

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.onboarding')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.onboarding.help')}
      </ThemedText>
      <Pressable
        onPress={() => router.push('/welcome')}
        accessibilityRole="button"
        accessibilityLabel={t('settings.onboarding.redo')}
        style={({ pressed }) => [
          styles.redo,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <ThemedText type="smallBold" themeColor="accent">
          {t('settings.onboarding.redo')}
        </ThemedText>
      </Pressable>
    </View>
  );
}

/**
 * What the Qur'an tab has saved, and how to be rid of it.
 *
 * ## Why this is not optional
 *
 * The audio saves itself the first time a surah plays, with no button and no
 * prompt — which is the right behaviour, and it is only honest if somebody can
 * see what accumulated and delete it. Saving quietly with no way to clear it
 * fills a phone invisibly, and that is a worse experience than the download
 * button the design refused.
 *
 * Sizes are shown in MB rather than a bar or a percentage. A bar needs a total
 * to be a fraction of, and there is no total here — the reader's own sense of
 * whether 40 MB matters on their phone is better than anything this screen
 * could invent.
 */
function StorageGroup() {
  const theme = useTheme();
  const { t } = useLocale();
  /*
    Read once, lazily, rather than in an effect. An effect that sets state on
    mount renders the screen twice and flashes an empty list first; a lazy
    initialiser runs before the first paint. The read is a directory listing,
    not a download.
  */
  const [voices, setVoices] = useState<SavedVoice[]>(savedVoices);
  const [reciteBytes, setReciteBytes] = useState<number>(reciteModelBytes);

  if (voices.length === 0 && reciteBytes === 0) return null;

  const remove = (folder: string) => {
    deleteVoice(folder);
    setVoices(savedVoices());
  };

  const removeReciteModels = () => {
    deleteReciteModels();
    setReciteBytes(reciteModelBytes());
  };

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.storage')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.storage.help')}
      </ThemedText>

      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        {voices.map((voice, index) => (
          <View
            key={voice.folder}
            style={[
              styles.storageRow,
              (index < voices.length - 1 || reciteBytes > 0) && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              },
            ]}>
            <View style={styles.storageText}>
              <ThemedText type="default">{reciterNameFor(voice.folder)}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {`${voice.files} ${t('settings.storage.files')} · ${megabytes(voice.bytes)} MB`}
              </ThemedText>
            </View>
            <Pressable
              onPress={() => remove(voice.folder)}
              accessibilityRole="button"
              accessibilityLabel={`${t('settings.storage.delete')} — ${reciterNameFor(voice.folder)}`}
              hitSlop={8}>
              <ThemedText type="smallBold" themeColor="accent">
                {t('settings.storage.delete')}
              </ThemedText>
            </Pressable>
          </View>
        ))}
        {reciteBytes > 0 && (
          <View style={styles.storageRow}>
            <View style={styles.storageText}>
              <ThemedText type="default">{t('settings.storage.recite')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {`${megabytes(reciteBytes)} MB`}
              </ThemedText>
            </View>
            <Pressable
              onPress={removeReciteModels}
              accessibilityRole="button"
              accessibilityLabel={`${t('settings.storage.delete')} — ${t('settings.storage.recite')}`}
              hitSlop={8}>
              <ThemedText type="smallBold" themeColor="accent">
                {t('settings.storage.delete')}
              </ThemedText>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

/** Folders are named for the host's path; readers are not. */
function reciterNameFor(folder: string): string {
  return RECITERS.find((reciter) => reciter.folder === folder)?.name ?? folder;
}

const megabytes = (bytes: number) => (bytes / 1_000_000).toFixed(1);

/**
 * One row: the Prayer times settings live on their own page now.
 *
 * They started as a group here and the method list made this tab the longest
 * screen in the app — Iyad's catch. The row keeps the same heading key the
 * page's title uses, so the door and the room agree on the name.
 */
function PrayerTimesGroup() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.times')}
      </ThemedText>
      <PressableLink
        href="/awqat-settings"
        accessibilityLabel={t('settings.times')}
        style={[styles.group, styles.row, { borderColor: theme.goldSoft }]}
        pressedStyle={{ opacity: 0.6 }}>
        <ThemedText type="default">{t('settings.times.open')}</ThemedText>
        <ThemedText type="smallBold" themeColor="gold">
          ›
        </ThemedText>
      </PressableLink>
    </View>
  );
}

/**
 * The reminders, as a door.
 *
 * The five switches, the lead time and the three notes (Friday, Ramadan,
 * adhkar) lived here as a group and made this screen long again; Iyad's
 * call, 11 Sep 2026: they move to `/reminders`, reached from here and from
 * the day page's Reminders door. Same shape as the prayer-times door above.
 */
function RemindersGroup() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.reminders')}
      </ThemedText>
      <PressableLink
        href="/reminders"
        accessibilityLabel={t('settings.reminders')}
        style={[styles.group, styles.row, { borderColor: theme.goldSoft }]}
        pressedStyle={{ opacity: 0.6 }}>
        <ThemedText type="default">{t('settings.reminders.open')}</ThemedText>
        <ThemedText type="smallBold" themeColor="gold">
          ›
        </ThemedText>
      </PressableLink>
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}>
      {/* The native header carries no title — the page names itself below. */}
      <Stack.Screen options={{ title: '' }} />
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('settings.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">{t('settings.intro')}</ThemedText>
        </View>

        <OnboardingGroup />

        <StorageGroup />

        {/*
          Hidden while there is one language, heading and all — a settings
          section offering a single choice is a row that reads as broken.
          Derived from `LOCALES`, so adding a language back restores the whole
          section without anyone remembering it lives here.
        */}
        {LOCALES.length > 1 && (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              {t('settings.language')}
            </ThemedText>
            <LanguageGroup />
          </View>
        )}

        {/*
          The two switches and, directly under them, the card they change
          (Iyad, 11 Sep 2026): the preview used to sit three sections lower
          under a heading typed in English, so flipping a switch changed
          nothing you could see without scrolling.
        */}
        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.reading')}
          </ThemedText>
          <View style={[styles.group, { borderColor: theme.goldSoft }]}>
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
          <ThemedText type="small" themeColor="textSecondary" style={styles.previewNote}>
            {t('settings.preview')}
          </ThemedText>
          <RecitationCard recitation={Recitations.takbir} />
        </View>

        <PrayerTimesGroup />

        <RemindersGroup />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.duringPrayer')}
          </ThemedText>
          <View
            style={[
              styles.group,
              { borderColor: theme.goldSoft },
            ]}>
            <SettingRow
              label={t('settings.keepAwake')}
              description={t('settings.keepAwake.help')}
              settingKey="keepAwake"
              isLast
            />
          </View>
        </View>

        <SourcesRow />

        <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
          {t('settings.footnote')}
        </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /*
    The same ruled row as the rest of the page (Iyad, 11 Sep 2026): it was
    a padded box, sixteen points on every side, so eight voices ran a screen
    longer than they needed to and sat inset from every other row.
  */
  storageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  previewNote: {
    paddingTop: Spacing.two,
  },
  storageText: {
    flex: 1,
    gap: 2,
  },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
  },
  notice: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  /*
    A ruled table, not a box. Each group keeps both rules because it is a
    self-contained table with space around it, like the source block inside a
    teaching page. The horizontal padding went with the fill.
  */
  group: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  redo: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.one,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footnote: {
    textAlign: 'center',
  },
});
