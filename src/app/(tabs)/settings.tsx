import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableLink } from '@/components/pressable-link';
import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { Recitations } from '@/content/recitations';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useReminders } from '@/hooks/use-reminders';
import { useSettings, type Audience } from '@/hooks/use-settings';
import { PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import { LEAD_CHOICES } from '@/lib/reminders';
import { deleteVoice, savedVoices, type SavedVoice } from '@/content/quran/offline';
import { deleteReciteModels, reciteModelBytes } from '@/lib/recite-session';
import { RECITERS } from '@/content/quran/recitation';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useLocation } from '@/hooks/use-location';
import { inferProfile, METHODS } from '@/lib/prayer-times';
import { Madhab } from 'adhan';
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
 * Which rulings the app shows.
 *
 * Changeable, and "Show everything" is a real option rather than a fallback —
 * someone who declined the question at first run should not be nagged, and
 * someone curious about the other set is entitled to read it.
 */
function AudienceGroup() {
  const theme = useTheme();
  const { t } = useLocale();
  const { audience, set } = useSettings();

  const options: { value: Audience; label: string }[] = [
    { value: 'man', label: t('settings.audience.man') },
    { value: 'woman', label: t('settings.audience.woman') },
    { value: null, label: t('settings.audience.both') },
  ];

  return (
    <View
      style={[styles.group, { borderColor: theme.goldSoft }]}>
      {options.map((option, index) => (
        <Pressable
          key={option.label}
          onPress={() => set('audience', option.value)}
          accessibilityRole="radio"
          accessibilityState={{ selected: audience === option.value }}
          style={[
            styles.row,
            index < options.length - 1 && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: theme.border,
            },
          ]}>
          <ThemedText type="default">{option.label}</ThemedText>
          {audience === option.value && (
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
 * Prayer reminders.
 *
 * Every prayer is off until someone turns it on, and the permission prompt
 * comes at that moment rather than on launch — a prompt before anyone has
 * asked for anything is how an app gets refused once and permanently.
 *
 * The lead time only appears once at least one prayer is on. It is a setting
 * about a thing that is not happening yet otherwise.
 */
function RemindersGroup() {
  const theme = useTheme();
  const { t } = useLocale();
  const { reminders, toggle, toggleFlag, flags, setLead, granted, anyOn } = useReminders();

  const leadLabel = (minutes: number) =>
    minutes === 0
      ? t('settings.reminders.atTime')
      : t('settings.reminders.minutesBefore').replace('{n}', String(minutes));

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.reminders')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.reminders.help')}
      </ThemedText>

      {granted === false && (
        <View style={[styles.notice, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('settings.reminders.denied')}
          </ThemedText>
        </View>
      )}

      <View
        style={[styles.group, { borderColor: theme.goldSoft }]}>
        {PRAYER_IDS.map((id, index) => (
          <View
            key={id}
            style={[
              styles.row,
              index < PRAYER_IDS.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              },
            ]}>
            <ThemedText type="default">{PRAYER_LABEL[id]}</ThemedText>
            <Switch
              value={reminders.prayers[id]}
              onValueChange={() => void toggle(id)}
              trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
              thumbColor={theme.background}
            />
          </View>
        ))}
      </View>

      {anyOn && (
        <>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.reminders.lead')}
          </ThemedText>
          <View
            style={[
              styles.group,
              { borderColor: theme.goldSoft },
            ]}>
            {LEAD_CHOICES.map((minutes, index) => (
              <Pressable
                key={minutes}
                onPress={() => setLead(minutes)}
                accessibilityRole="radio"
                accessibilityState={{ selected: reminders.leadMinutes === minutes }}
                style={[
                  styles.row,
                  index < LEAD_CHOICES.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: theme.border,
                  },
                ]}>
                <ThemedText type="default">{leadLabel(minutes)}</ThemedText>
                {reminders.leadMinutes === minutes && (
                  <ThemedText type="smallBold" themeColor="accent">
                    ✓
                  </ThemedText>
                )}
              </Pressable>
            ))}
          </View>
        </>
      )}

      {/*
        The windows — the suhoor wake-up (docs/ramadan-mode.md R3, dormant
        outside the month but always in this same place, so a changed mind
        can always find it) and the two notes from build-order.md. Offers at
        a moment opening; none of them can notice an absence.
      */}
      <View
        style={[styles.group, { borderColor: theme.goldSoft }]}>
        {(
          [
            ['suhoorWakeUp', 'settings.suhoor'],
            ['adhkarNote', 'settings.adhkarNote'],
            ['jumuahNote', 'settings.jumuahNote'],
          ] as const
        ).map(([flag, label], index) => (
          <View
            key={flag}
            style={[
              styles.row,
              index < 2 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              },
            ]}>
            <ThemedText type="default" style={styles.flagLabel}>
              {t(label)}
            </ThemedText>
            <Switch
              value={flags[flag]}
              onValueChange={() => void toggleFlag(flag)}
              trackColor={{ true: theme.accent }}
            />
          </View>
        ))}
      </View>
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
        {voices.map((voice) => (
          <View key={voice.folder} style={styles.storageRow}>
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
 * Where the times come from — the line that used to live on the Awqat card.
 *
 * Moved here (Iyad, 30 Aug) so the card can be glanceable; this is also where
 * changing the method, the madhab and the mosque match will land, so the
 * provenance sits at the head of the group that will one day edit it. Until
 * then it is information, not a control.
 */
function PrayerTimesGroup() {
  const theme = useTheme();
  const { t } = useLocale();
  const { awqatMethod, awqatHanafiAsr, set } = useSettings();
  const { coords } = useLocation();
  const { profile } = usePrayerTimes();
  if (!profile || !coords) return null;

  /*
    "Suggested" first and preselected, then every named convention. The
    suggestion names what it resolves to, so choosing it is never a mystery —
    and a reader who has no idea what these words mean can leave without
    touching anything and be right.
  */
  const suggested = inferProfile(coords);
  const methodRows: { id: string | null; label: string }[] = [
    {
      id: null,
      label: `${t('settings.method.suggested')} · ${suggested.label}`,
    },
    ...Object.values(METHODS).map((method) => ({ id: method.id, label: method.label })),
  ];

  /*
    Effective, not stored: with no override the row reflects what the method
    itself bundles (Karachi carries Hanafi), so the tick never lies about
    which ʿAsr the card is showing.
  */
  const hanafiNow =
    awqatHanafiAsr ?? profile.build().madhab === Madhab.Hanafi;

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('settings.times')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {profile.label} · {t('times.onThisPhone')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('times.followLocal')}
      </ThemedText>

      <ThemedText type="small" themeColor="textSecondary" style={styles.subheading}>
        {t('settings.method')}
      </ThemedText>
      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        {methodRows.map((row, index) => (
          <Pressable
            key={row.id ?? 'suggested'}
            onPress={() => set('awqatMethod', row.id)}
            accessibilityRole="radio"
            accessibilityState={{ selected: awqatMethod === row.id }}
            style={[
              styles.row,
              index < methodRows.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              },
            ]}>
            <ThemedText type="default">{row.label}</ThemedText>
            {awqatMethod === row.id && (
              <ThemedText type="smallBold" themeColor="accent">
                ✓
              </ThemedText>
            )}
          </Pressable>
        ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.subheading}>
        {t('settings.asr')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.asr.help')}
      </ThemedText>
      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        {(
          [
            { hanafi: false, label: t('settings.asr.standard') },
            { hanafi: true, label: t('settings.asr.hanafi') },
          ] as const
        ).map((row, index) => (
          <Pressable
            key={String(row.hanafi)}
            onPress={() => set('awqatHanafiAsr', row.hanafi)}
            accessibilityRole="radio"
            accessibilityState={{ selected: hanafiNow === row.hanafi }}
            style={[
              styles.row,
              index === 0 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              },
            ]}>
            <ThemedText type="default">{row.label}</ThemedText>
            {hanafiNow === row.hanafi && (
              <ThemedText type="smallBold" themeColor="accent">
                ✓
              </ThemedText>
            )}
          </Pressable>
        ))}
      </View>
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

        <PrayerTimesGroup />

        <RemindersGroup />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('settings.guidance')}
          </ThemedText>
          <AudienceGroup />
        </View>

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

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            Preview
          </ThemedText>
          <RecitationCard recitation={Recitations.takbir} />
        </View>

        <SourcesRow />

        <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
          {t('settings.footnote')}
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  storageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  flagLabel: { flex: 1, paddingRight: 8 },
  storageText: {
    flex: 1,
    gap: 2,
  },
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
  subheading: {
    marginTop: Spacing.three,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
