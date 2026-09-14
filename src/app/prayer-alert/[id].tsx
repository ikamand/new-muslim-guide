import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppState, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import {
  adhanAlarmAvailable,
  lastAdhanOutcome,
  ringAdhanSoon,
  TEST_PREFIX,
  type AdhanOutcome,
} from '../../../modules/adhan-alarm';
import { ThemedText } from '@/components/themed-text';
import { ADHAN_VOICES, type AdhanVoice, type AdhanVoiceId } from '@/content/adhan-voices';
import { ADHAN_OPENING } from '@/content/audio';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { adhanChannels, adhanInput, useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { formatTime, PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import { ALERT_MODES, LEAD_CHOICES, type AlertMode, type PrayerAlert } from '@/lib/reminders';

/**
 * One prayer's alert: what its time does, set for that prayer alone.
 *
 * ## Why a page per prayer
 *
 * Iyad, 14 Sep 2026: a bell beside each prayer's time opens this. The choices
 * really do differ by prayer. Dhuhr and ʿAsr fall in working hours and Fajr
 * is when people sleep, so "play even on silent" is right for one and wrong
 * for the other. One page for all five was about twenty controls. What would
 * make five visits of setting them alike is "Use these for all prayers".
 *
 * ## What is on it
 *
 * The mode first, because everything under it depends on it. Then only what
 * that mode uses: the voice and the quiet-phone overrides for the adhan, the
 * lead time for a notification. The adhan has no lead time on purpose: it
 * says the time has come in, and ten minutes early that is false.
 *
 * The overrides differ by platform because the platforms do. Android plays
 * the whole recording from the app and can check the phone first; an iPhone
 * plays only the opening as the notification's sound, cannot play through the
 * silent switch at all, and can only be let through a Focus.
 *
 * ## Not seen on a phone
 *
 * ⚠️ The web preview shows neither platform's overrides, the test ring or the
 * preview buttons, which exist only on a device. Those parts of this page were
 * laid out without being looked at.
 */
export default function PrayerAlertScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const params = useLocalSearchParams<{ id: string }>();
  const { reminders, setAlert, applyToAll, granted } = useReminders();
  const [applied, setApplied] = useState(false);
  const [previewing, setPreviewing] = useState<AdhanVoiceId | null>(null);
  const [testAt, setTestAt] = useState<Date | null>(null);
  const [outcome, setOutcome] = useState<AdhanOutcome | null>(() => lastAdhanOutcome());

  // What happened to the last adhan changes while the app is away, so read it again on return.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setOutcome(lastAdhanOutcome());
    });
    return () => subscription.remove();
  }, []);

  const id = PRAYER_IDS.find((prayer) => prayer === params.id);
  if (!id) return null;

  const alert = reminders.alerts[id];
  const label = PRAYER_LABEL[id];

  const change = (patch: Partial<PrayerAlert>) => {
    setApplied(false);
    void setAlert(id, patch);
  };

  const ruled = (index: number, count: number) =>
    index < count - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border };

  const heading = (key: UIKey) => (
    <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
      {t(key)}
    </ThemedText>
  );

  const tick = (selected: boolean) =>
    selected ? (
      <ThemedText type="smallBold" themeColor="accent">
        ✓
      </ThemedText>
    ) : null;

  const modeLabel: Record<AlertMode, UIKey> = {
    adhan: 'alert.mode.adhan',
    sound: 'alert.mode.sound',
    silent: 'alert.mode.silent',
    off: 'alert.mode.off',
  };

  const leadLabel = (minutes: number) =>
    minutes === 0
      ? t('settings.reminders.atTime')
      : t('settings.reminders.minutesBefore').replace('{n}', String(minutes));

  /* Fajr lists its own recordings first, then the adhan of the other prayers; every other prayer only those. */
  const fajrVoices = ADHAN_VOICES.filter((voice) => voice.kind === 'fajr');
  const otherVoices = ADHAN_VOICES.filter((voice) => voice.kind === 'other');

  const voiceGroup = (voices: readonly AdhanVoice[]) => (
    <View style={[styles.group, { borderColor: theme.goldSoft }]}>
      {voices.map((voice, index) => {
        const selected = alert.voice === voice.id;
        return (
          <View key={voice.id} style={[styles.voiceRow, ruled(index, voices.length)]}>
            {/* Siblings, never nested: a play button inside the row's own button is a button inside a button. */}
            <Pressable
              onPress={() => change({ voice: voice.id as AdhanVoiceId })}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={({ pressed }) => [styles.voiceChoice, pressed && { opacity: 0.6 }]}>
              <ThemedText type="default" style={styles.voiceName}>
                {voice.name}
              </ThemedText>
              {tick(selected)}
            </Pressable>
            <Preview voiceId={voice.id as AdhanVoiceId} active={previewing === voice.id} onActive={setPreviewing} />
          </View>
        );
      })}
    </View>
  );

  const switchRow = (labelKey: UIKey, value: boolean, onChange: (next: boolean) => void, last = false) => (
    <View style={[styles.row, !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
      <ThemedText type="default" style={styles.flexLabel}>
        {t(labelKey)}
      </ThemedText>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
        thumbColor={theme.background}
      />
    </View>
  );

  const ringSoon = async () => {
    const at = new Date(Date.now() + 60_000);
    const ok = await ringAdhanSoon(adhanInput(`${TEST_PREFIX}${id}`, at, label, alert, t), adhanChannels(t));
    if (ok) setTestAt(at);
  };

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

      <View style={styles.section}>
        {heading('alert.when')}
        <View style={[styles.group, { borderColor: theme.goldSoft }]}>
          {ALERT_MODES.map((mode, index) => (
            <Pressable
              key={mode}
              onPress={() => change({ mode })}
              accessibilityRole="radio"
              accessibilityState={{ selected: alert.mode === mode }}
              style={({ pressed }) => [
                styles.row,
                ruled(index, ALERT_MODES.length),
                pressed && { backgroundColor: theme.backgroundSelected },
              ]}>
              <View style={styles.flexLabel}>
                <ThemedText type="default">{t(modeLabel[mode])}</ThemedText>
                {mode === 'adhan' && Platform.OS !== 'web' && (
                  <ThemedText type="small" themeColor="textSecondary">
                    {t(Platform.OS === 'ios' ? 'alert.mode.adhan.ios' : 'alert.mode.adhan.android')}
                  </ThemedText>
                )}
              </View>
              {tick(alert.mode === mode)}
            </Pressable>
          ))}
        </View>
      </View>

      {alert.mode === 'adhan' && (
        <View style={styles.section}>
          {heading('alert.voice')}
          {id === 'fajr' ? (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                {t('alert.voice.fajr')}
              </ThemedText>
              {voiceGroup(fajrVoices)}
              <ThemedText type="small" themeColor="textSecondary" style={styles.subgroup}>
                {t('alert.voice.other')}
              </ThemedText>
              {voiceGroup(otherVoices)}
            </>
          ) : (
            voiceGroup(otherVoices)
          )}
        </View>
      )}

      {alert.mode === 'adhan' && Platform.OS === 'android' && (
        <View style={styles.section}>
          {heading('alert.quiet')}
          <View style={[styles.group, { borderColor: theme.goldSoft }]}>
            {switchRow('alert.playOnSilent', alert.playOnSilent, (next) => change({ playOnSilent: next }))}
            {switchRow('alert.playInDnd', alert.playInDnd, (next) => change({ playInDnd: next }), true)}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {t('alert.quiet.help')}
          </ThemedText>

          {adhanAlarmAvailable && (
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
                  {t('alert.last')
                    .replace('{prayer}', outcome.title)
                    .replace('{time}', formatTime(new Date(outcome.at)))
                    .replace('{what}', t(outcomeKey(outcome)))}
                </ThemedText>
              )}
            </View>
          )}
        </View>
      )}

      {alert.mode === 'adhan' && Platform.OS === 'ios' && (
        <View style={styles.section}>
          <View style={[styles.group, { borderColor: theme.goldSoft }]}>
            {switchRow('alert.soundInFocus', alert.soundInFocus, (next) => change({ soundInFocus: next }), true)}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {t('alert.ios.help')}
          </ThemedText>
        </View>
      )}

      {(alert.mode === 'sound' || alert.mode === 'silent') && (
        <View style={styles.section}>
          {heading('settings.reminders.lead')}
          <View style={[styles.group, { borderColor: theme.goldSoft }]}>
            {LEAD_CHOICES.map((minutes, index) => (
              <Pressable
                key={minutes}
                onPress={() => change({ leadMinutes: minutes })}
                accessibilityRole="radio"
                accessibilityState={{ selected: alert.leadMinutes === minutes }}
                style={({ pressed }) => [
                  styles.row,
                  ruled(index, LEAD_CHOICES.length),
                  pressed && { backgroundColor: theme.backgroundSelected },
                ]}>
                <ThemedText type="default">{leadLabel(minutes)}</ThemedText>
                {tick(alert.leadMinutes === minutes)}
              </Pressable>
            ))}
          </View>
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
    </ScrollView>
  );
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

type PreviewProps = {
  voiceId: AdhanVoiceId;
  active: boolean;
  onActive: (id: AdhanVoiceId | null) => void;
};

/** Plays a voice's opening. One at a time: starting another stops this one and rewinds it. */
function PlayerPreview({ voiceId, active, onActive }: PreviewProps) {
  const theme = useTheme();
  const { t } = useLocale();
  const player = useAudioPlayer(ADHAN_OPENING[voiceId] ?? null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!active && status.playing) {
      player.pause();
      player.seekTo(0);
    }
  }, [active, status.playing, player]);

  useEffect(() => {
    if (active && status.didJustFinish) onActive(null);
  }, [active, status.didJustFinish, onActive]);

  const playing = active && status.playing;

  return (
    <Pressable
      onPress={() => {
        if (playing) {
          player.pause();
          onActive(null);
          return;
        }
        player.seekTo(0);
        player.play();
        onActive(voiceId);
      }}
      accessibilityRole="button"
      accessibilityLabel={t(playing ? 'alert.preview.stop' : 'alert.preview')}
      hitSlop={8}
      style={({ pressed }) => [styles.preview, { opacity: pressed ? 0.6 : 1 }]}>
      <Ionicons name={playing ? 'stop-circle-outline' : 'play-circle-outline'} size={28} color={theme.accent} />
    </Pressable>
  );
}

/**
 * No preview on web. `useAudioPlayer` throws during static web rendering and
 * the prerender swallows it, blanking the page (see `practice.tsx`).
 */
function NoPreview(_: PreviewProps) {
  return null;
}

const Preview = Platform.OS === 'web' ? NoPreview : PlayerPreview;

/* The ruled-table grammar of the Reminders page, so the room matches the door. */
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
  notice: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
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
  flexLabel: {
    flex: 1,
    gap: Spacing.half,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  voiceChoice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  voiceName: {
    flexShrink: 1,
  },
  preview: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subgroup: {
    paddingTop: Spacing.three,
  },
  test: {
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  applyAll: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
  },
});
