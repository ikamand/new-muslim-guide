import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { Glyph } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { savedVoices } from '@/content/quran/offline';
import { Recitations } from '@/content/recitations';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { countReminders, describeLead } from '@/hooks/use-reminders';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { LOCALE_NAMES, LOCALES } from '@/i18n/locales';
import { megabytes } from '@/lib/bytes';
import { METHODS } from '@/lib/prayer-times';
import { reciteModelBytes } from '@/lib/recite-session';

/**
 * Settings, as a page of panels.
 *
 * ## Why panels (Iyad, 11 Sep 2026)
 *
 * The page had become a long flat list: uppercase captions floating over
 * ruled rows, an eight-row list of saved voices, a preview card three
 * sections from the switches it previews. Three directions were drawn
 * ("Settings, Three Ways"); this is B. Every section is one framed panel in
 * the app's own double rule, the fihrist's and the surah page's, with its
 * name set INTO the top rule beside its mark and its current state after it,
 * so each section is unmistakably one thing and the page can be read at a
 * scroll without opening anything. Nothing moved to a new page except the
 * one section that was a list of many things: Saved audio is a door here
 * and a sheet behind it (`saved-audio.tsx`).
 *
 * Rejected on the same canvas: a contents page (one tap more for every
 * switch) and tiles (the one form the app has nowhere else).
 */

/** One switch on a ruled row, with a line saying what it does. */
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

/** A door on a ruled row: where a panel's controls live when they are elsewhere. */
function DoorRow({
  href,
  label,
  description,
}: {
  href: Parameters<typeof PressableLink>[0]['href'];
  label: string;
  description?: string;
}) {
  const theme = useTheme();
  return (
    <PressableLink
      href={href}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={styles.row}
      pressedStyle={{ opacity: 0.6 }}>
      <View style={styles.rowText}>
        <ThemedText type="default">{label}</ThemedText>
        {description ? (
          <ThemedText type="small" themeColor="textSecondary">
            {description}
          </ThemedText>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.gold} />
    </PressableLink>
  );
}

/**
 * A framed panel: the double rule, with the section's name set into the top
 * rule beside its mark, and its current state after the name. The legend
 * sits on a patch of page colour so the rule passes behind it.
 */
function Panel({
  mark,
  title,
  state,
  children,
}: {
  mark: ReactNode;
  title: string;
  state?: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={styles.panelWrap}>
      <View style={[styles.panel, { borderColor: theme.gold }]}>
        <View style={[styles.panelIn, { borderColor: theme.goldSoft }]}>{children}</View>
      </View>
      <View style={[styles.legend, { backgroundColor: theme.background }]}>
        {mark}
        <ThemedText type="caption" themeColor="gold" style={styles.legendTitle}>
          {title}
        </ThemedText>
        {state ? (
          <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
            · {state}
          </ThemedText>
        ) : null}
      </View>
    </View>
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
function LanguageRows() {
  const theme = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <>
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
    </>
  );
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { transliteration, translation, reminders, awqatMosque } = useSettings();
  const { profile } = usePrayerTimes();

  /* What is under the Arabic, in the legend. */
  const onLabels = [
    transliteration ? t('settings.transliteration') : null,
    translation ? t('settings.translation') : null,
  ].filter((label): label is string => label !== null);
  const arabicState =
    onLabels.length === 2
      ? t('settings.state.bothOn')
      : onLabels.length === 1
        ? t('settings.state.oneOn').replace('{which}', onLabels[0].toLowerCase())
        : t('settings.state.bothOff');

  /*
    The saved audio, summarised for its door: a directory listing, read on
    render like the sheet reads it. Absent entirely while nothing is saved —
    a door to an empty room is a promise the page cannot keep.
  */
  const voices = savedVoices();
  const modelBytes = reciteModelBytes();
  const totalBytes = voices.reduce((sum, voice) => sum + voice.bytes, 0) + modelBytes;
  const voicesLine =
    voices.length === 1
      ? t('settings.storage.voice')
      : t('settings.storage.voices').replace('{n}', String(voices.length));
  const storageLabel = modelBytes > 0 ? t('settings.storage.andModels').replace('{voices}', voicesLine) : voicesLine;

  const timesState = awqatMosque
    ? `${t('mosque.active')} · ${METHODS[awqatMosque.methodId]?.label ?? awqatMosque.methodId}`
    : profile?.label;

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

      <Panel
        mark={<Glyph name="phrases" size={18} color={theme.gold} />}
        title={t('settings.reading')}
        state={arabicState}>
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
        {/* The card the switches change, directly under them. */}
        <ThemedText type="caption" themeColor="textSecondary" style={styles.previewNote}>
          {t('settings.preview')}
        </ThemedText>
        <RecitationCard recitation={Recitations.takbir} />
      </Panel>

      {/*
        Hidden while there is one language, panel and all — a settings
        section offering a single choice is a row that reads as broken.
        Derived from `LOCALES`, so adding a language back restores the whole
        panel without anyone remembering it lives here.
      */}
      {LOCALES.length > 1 && (
        <Panel
          mark={<Ionicons name="language-outline" size={18} color={theme.gold} />}
          title={t('settings.language')}>
          <LanguageRows />
        </Panel>
      )}

      {(voices.length > 0 || modelBytes > 0) && (
        <Panel
          mark={<Glyph name="practice" size={18} color={theme.gold} />}
          title={t('settings.storage')}
          state={`${megabytes(totalBytes)} MB`}>
          <DoorRow
            href="/saved-audio"
            label={storageLabel}
            description={t('settings.storage.open.help')}
          />
        </Panel>
      )}

      <Panel
        mark={<Ionicons name="options-outline" size={18} color={theme.gold} />}
        title={t('settings.times')}
        state={timesState}>
        <DoorRow
          href="/awqat-settings"
          label={t('settings.times.open')}
          description={t('times.followLocal')}
        />
      </Panel>

      <Panel
        mark={<Ionicons name="notifications-outline" size={18} color={theme.gold} />}
        title={t('settings.reminders')}
        state={countReminders(reminders, t)}>
        <DoorRow
          href="/reminders"
          label={t('settings.reminders.open')}
          description={describeLead(reminders, t) ?? undefined}
        />
      </Panel>

      <Panel
        mark={<Ionicons name="phone-portrait-outline" size={18} color={theme.gold} />}
        title={t('settings.duringPrayer')}>
        <SettingRow
          label={t('settings.keepAwake')}
          description={t('settings.keepAwake.help')}
          settingKey="keepAwake"
          isLast
        />
      </Panel>

      {/*
        A way back into onboarding. The two questions decide what the Learn
        tab suggests first, and someone's answer to "where are you right now"
        is exactly the kind of thing that stops being true after a few months.
        Reopening prefills what they chose last time, and skipping out of a
        revisit changes nothing.
      */}
      <Panel
        mark={<Glyph name="door" size={18} color={theme.gold} />}
        title={t('settings.onboarding')}>
        <DoorRow
          href="/welcome"
          label={t('settings.onboarding.redo')}
          description={t('settings.onboarding.help')}
        />
      </Panel>

      {/*
        Sources: the credit that came off the narrations. Every publisher the
        app carries is named on one page a person can find, instead of a
        domain name printed under a hadith on a teaching screen — see
        `content/text-sources.ts`.
      */}
      <Panel
        mark={<Ionicons name="list-outline" size={18} color={theme.gold} />}
        title={t('settings.sources')}>
        <DoorRow href="/sources" label={t('settings.sources.help')} />
      </Panel>

      <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
        {t('settings.footnote')}
      </ThemedText>
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
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
  },
  /* The frame: the fihrist's double rule, with room above for the legend. */
  panelWrap: {
    position: 'relative',
  },
  panel: {
    borderWidth: 1,
    padding: Spacing.one,
  },
  panelIn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.one,
  },
  /* Set into the top rule: half the caption's height above it, half below. */
  legend: {
    position: 'absolute',
    top: -8,
    left: Spacing.three,
    maxWidth: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  legendTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
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
  previewNote: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  footnote: {
    textAlign: 'center',
  },
});
