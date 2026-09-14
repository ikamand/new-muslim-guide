import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppState, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import {
  adhanAlarmAvailable,
  adhanPreviewAvailable,
  lastAdhanOutcome,
  onAdhanPreviewEnd,
  ringAdhanSoon,
  startAdhanPreview,
  stopAdhanPreview,
  TEST_PREFIX,
  type AdhanOutcome,
} from '../../../modules/adhan-alarm';
import { Dropdown } from '@/components/dropdown';
import { Panel } from '@/components/panel';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { VolumeSlider } from '@/components/volume-slider';
import { getVoice, shortRawName } from '@/content/adhan-voices';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { adhanChannels, adhanInput, useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { formatTime, PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import { ALERT_MODES, PRE_REMINDER_CHOICES, type AlertMode, type PrayerAlert } from '@/lib/reminders';

/**
 * One prayer's alert, on one screen.
 *
 * ## Why it looks like this (Iyad, 14 Sep 2026)
 *
 * The first version was four radio rows, then a voice list, then the lead
 * times as five more rows: a page of scrolling to set two things. Iyad: "a
 * very simple 2 settings is taking a full page now where it can be a lot more
 * beautiful and clean." So it is Settings' own panel. What the time does is
 * one segmented line; the voice is one row that opens a sheet, the way the
 * Qur'an tab chooses a reciter; the Pre-Adhan reminder is a dropdown. Only
 * the rows the chosen alert uses are drawn.
 *
 * ## Why a page per prayer
 *
 * The choices differ by prayer. Dhuhr and ʿAsr fall in working hours and Fajr
 * is when people sleep, so "play even on silent" is right for one and wrong
 * for another. "Use these for all prayers" is the one tap that makes five
 * alike.
 *
 * ## The platforms
 *
 * Android plays the recording from the app, short or whole, at a volume of
 * its own, and can check the phone first. An iPhone plays only the opening as
 * the notification's sound, cannot play through the silent switch, and can
 * only be let through a Focus. The web preview draws Android's layout, the
 * fuller one, because the web build exists to look at phone screens.
 */

const LAYOUT: 'ios' | 'android' = Platform.OS === 'ios' ? 'ios' : 'android';

const STATE: Record<AlertMode, UIKey> = {
  adhan: 'alert.state.adhan',
  sound: 'alert.state.sound',
  silent: 'alert.state.silent',
  off: 'alert.state.off',
};

const BELL: Record<AlertMode, 'notifications' | 'notifications-outline' | 'notifications-off-outline'> = {
  adhan: 'notifications',
  sound: 'notifications-outline',
  silent: 'notifications-outline',
  off: 'notifications-off-outline',
};

export default function PrayerAlertScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { reminders, setAlert, applyToAll, granted } = useReminders();
  const { today } = usePrayerTimes();
  const [applied, setApplied] = useState(false);
  const [testAt, setTestAt] = useState<Date | null>(null);
  const [outcome, setOutcome] = useState<AdhanOutcome | null>(() => lastAdhanOutcome());
  const [previewSound, setPreviewSound] = useState<string | null>(null);

  // What happened to the last adhan changes while the app is away, so read it again on return.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setOutcome(lastAdhanOutcome());
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = onAdhanPreviewEnd((sound) => setPreviewSound((current) => (current === sound ? null : current)));
    return () => {
      unsubscribe();
      void stopAdhanPreview();
    };
  }, []);

  const id = PRAYER_IDS.find((prayer) => prayer === params.id);
  if (!id) return null;

  const alert = reminders.alerts[id];
  const label = PRAYER_LABEL[id];
  const voice = getVoice(alert.voice);
  const time = today?.prayers.find((prayer) => prayer.id === id)?.time;
  const adhan = alert.mode === 'adhan';

  const change = (patch: Partial<PrayerAlert>) => {
    setApplied(false);
    void setAlert(id, patch);
  };

  const openVoices = () => router.push({ pathname: '/adhan-voice/[id]', params: { id } });

  /* Adhan is chosen in its sheet, with a voice; the other three take effect on the tap. */
  const chooseMode = (mode: AlertMode) => (mode === 'adhan' ? openVoices() : change({ mode }));

  const ruled = { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border };

  const switchRow = (key: UIKey, value: boolean, onValueChange: (next: boolean) => void, first = false) => (
    <View style={[styles.row, !first && ruled]}>
      <ThemedText type="default" style={styles.grow}>
        {t(key)}
      </ThemedText>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
        thumbColor={theme.background}
      />
    </View>
  );

  /* The volume is heard on the short adhan: enough to judge a level without three minutes of it. */
  const volumeSound = shortRawName(alert.voice);
  const volumePlaying = previewSound === volumeSound;
  const toggleVolumePreview = async () => {
    if (volumePlaying) {
      await stopAdhanPreview();
      setPreviewSound(null);
      return;
    }
    if (await startAdhanPreview(volumeSound, alert.volume)) setPreviewSound(volumeSound);
  };

  const ringSoon = async () => {
    const at = new Date(Date.now() + 60_000);
    const ok = await ringAdhanSoon(adhanInput(`${TEST_PREFIX}${id}`, at, label, alert, t), adhanChannels(t));
    if (ok) setTestAt(at);
  };

  const reminderOptions = PRE_REMINDER_CHOICES.map((minutes) => ({
    value: minutes as number,
    label:
      minutes === 0
        ? t('alert.preReminder.off')
        : t('settings.reminders.minutesBefore').replace('{n}', String(minutes)),
    short: minutes === 0 ? t('alert.preReminder.off') : t('alert.preReminder.short').replace('{n}', String(minutes)),
  }));

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: label }} />

      {granted === false && (
        <View style={[styles.notice, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('settings.reminders.denied')}
          </ThemedText>
        </View>
      )}

      <Panel
        mark={<Ionicons name={BELL[alert.mode]} size={16} color={theme.gold} />}
        title={t('alert.panel.time')}
        state={time ? formatTime(time) : undefined}>
        <View style={styles.modes}>
          <Segmented
            options={ALERT_MODES.map((mode) => ({ value: mode, label: t(STATE[mode]) }))}
            value={alert.mode}
            onChange={chooseMode}
            accessibilityLabel={t('alert.panel.time')}
          />
        </View>

        {adhan && (
          <Pressable
            onPress={openVoices}
            accessibilityRole="button"
            accessibilityLabel={`${t('alert.voice')}: ${voice.name}`}
            style={({ pressed }) => [styles.row, ruled, pressed && { opacity: 0.6 }]}>
            <ThemedText type="default">{t('alert.voice')}</ThemedText>
            <View style={styles.value}>
              <ThemedText type="default" themeColor="textSecondary" numberOfLines={1} style={styles.shrink}>
                {LAYOUT === 'android'
                  ? `${voice.short} · ${t(alert.length === 'short' ? 'alert.length.short' : 'alert.length.full')}`
                  : voice.short}
              </ThemedText>
              <Ionicons name="chevron-forward" size={18} color={theme.accent} />
            </View>
          </Pressable>
        )}

        {adhan && LAYOUT === 'android' && (
          <View style={[styles.sliderRow, ruled]}>
            <VolumeSlider value={alert.volume} onChange={(volume) => change({ volume })} label={t('alert.volume')} />
            {adhanPreviewAvailable && (
              <Pressable
                onPress={() => void toggleVolumePreview()}
                accessibilityRole="button"
                accessibilityLabel={t(volumePlaying ? 'alert.preview.stop' : 'alert.preview')}
                hitSlop={8}
                style={({ pressed }) => [styles.play, { opacity: pressed ? 0.6 : 1 }]}>
                <Ionicons name={volumePlaying ? 'stop-circle-outline' : 'play-circle-outline'} size={28} color={theme.accent} />
              </Pressable>
            )}
          </View>
        )}

        {adhan && LAYOUT === 'ios' && switchRow('alert.soundInFocus', alert.soundInFocus, (next) => change({ soundInFocus: next }))}

        {alert.mode !== 'off' && (
          <View style={[styles.row, ruled]}>
            <ThemedText type="default" style={styles.grow}>
              {t('alert.preReminder')}
            </ThemedText>
            <Dropdown
              label={t('alert.preReminder')}
              options={reminderOptions}
              value={alert.preReminderMinutes}
              onChange={(minutes) => change({ preReminderMinutes: minutes })}
            />
          </View>
        )}
      </Panel>

      {adhan && LAYOUT === 'android' && (
        <View style={styles.block}>
          <Panel mark={<Ionicons name="moon-outline" size={16} color={theme.gold} />} title={t('alert.quiet')}>
            {switchRow('alert.playOnSilent', alert.playOnSilent, (next) => change({ playOnSilent: next }), true)}
            {switchRow('alert.playInDnd', alert.playInDnd, (next) => change({ playInDnd: next }))}
          </Panel>
          <ThemedText type="small" themeColor="textSecondary">
            {t('alert.quiet.help')}
          </ThemedText>
        </View>
      )}

      {adhan && LAYOUT === 'ios' && (
        <ThemedText type="small" themeColor="textSecondary">
          {t('alert.ios.help')}
        </ThemedText>
      )}

      <View style={styles.actions}>
        {adhan && adhanAlarmAvailable && (
          <View style={styles.test}>
            <Pressable
              onPress={() => void ringSoon()}
              accessibilityRole="button"
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
              <ThemedText type="smallBold" themeColor="accent">
                {t('alert.test')}
              </ThemedText>
            </Pressable>
            {testAt && (
              <ThemedText type="small" themeColor="textSecondary">
                {t('alert.test.set').replace('{time}', formatTime(testAt))}
              </ThemedText>
            )}
            {outcome && (
              <ThemedText type="small" themeColor="textSecondary">
                {outcomeText(outcome, t)}
              </ThemedText>
            )}
          </View>
        )}

        <Pressable
          onPress={() => {
            applyToAll(id);
            setApplied(true);
          }}
          disabled={applied}
          accessibilityRole="button"
          style={({ pressed }) => [styles.applyAll, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="smallBold" themeColor={applied ? 'textSecondary' : 'accent'}>
            {t(applied ? 'alert.applied' : 'alert.applyAll')}
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

/** The last adhan in a sentence, with how long it played when something stopped it. */
function outcomeText(outcome: AdhanOutcome, t: (key: UIKey) => string): string {
  const what = t(outcomeKey(outcome));
  const seconds = outcome.seconds ?? 0;
  const said =
    outcome.played && outcome.reason !== 'finished' && seconds > 0
      ? t('alert.last.after').replace('{what}', what).replace('{n}', String(seconds))
      : what;
  return t('alert.last')
    .replace('{prayer}', outcome.title)
    .replace('{time}', formatTime(new Date(outcome.at)))
    .replace('{what}', said);
}

/** The one word the native side recorded, as the words after the colon. */
function outcomeKey(outcome: AdhanOutcome): UIKey {
  switch (outcome.reason) {
    case 'finished':
      return 'adhan.outcome.finished';
    case 'stop':
      return 'adhan.outcome.stop';
    case 'volume':
      return 'adhan.outcome.volume';
    case 'headphones':
      return 'adhan.outcome.headphones';
    case 'call':
      return outcome.played ? 'adhan.outcome.callStopped' : 'adhan.outcome.callSkipped';
    case 'other-audio':
      return 'adhan.outcome.otherAudio';
    case 'silent':
      return 'adhan.outcome.silent';
    case 'dnd':
      return 'adhan.outcome.dnd';
    case 'late':
      return 'adhan.outcome.late';
    case 'refused':
      return 'adhan.outcome.refused';
    default:
      return 'adhan.outcome.other';
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  notice: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  modes: {
    paddingBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  value: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  shrink: {
    flexShrink: 1,
  },
  grow: {
    flex: 1,
  },
  play: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.three,
  },
  test: {
    gap: Spacing.one,
  },
  applyAll: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
  },
});
