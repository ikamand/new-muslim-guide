import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppState, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import {
  adhanAlarmAvailable,
  adhanPreviewAvailable,
  lastAdhanOutcome,
  onAdhanPreviewEnd,
  ringAdhanSoon,
  setAdhanPreviewVolume,
  startAdhanPreview,
  stopAdhanPreview,
  TEST_PREFIX,
  type AdhanOutcome,
} from '../../../modules/adhan-alarm';
import DERIVED from '@/assets/adhan/derived.json';
import { Dropdown } from '@/components/dropdown';
import { Glyph } from '@/components/illustrations';
import { Panel } from '@/components/panel';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { VolumeSlider } from '@/components/volume-slider';
import { getVoice, rawName, shortRawName } from '@/content/adhan-voices';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { adhanChannels, adhanInput } from '@/lib/alert-schedule';
import { formatTime, PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import { ALERT_MODES, PRE_REMINDER_CHOICES, type AlertMode, type PrayerAlert } from '@/lib/reminders';

/**
 * One prayer's alert, on one screen that says what will happen.
 *
 * ## Direction A (Iyad, 14 Sep 2026)
 *
 * Chosen from the audit canvas
 * (claude.ai/artifact/SJDDSXwK53LgR6kxEYFyeY). The first version showed
 * controls and left the outcome to be added up; this one opens with the
 * prayer and one sentence saying what the phone will do at its time, then a
 * single panel: Adhan, Tone, Silent and Off; the voice; the volume; the
 * Pre-Adhan reminder; and one row to the quiet-phone switches, which are set
 * once and so live on a screen of their own. What went: the second panel,
 * its paragraph, the prayer's time in a legend, and "Sound", which the adhan
 * is too.
 *
 * ## Adhan takes effect on the tap
 *
 * In the first version Adhan opened the voice sheet and waited, so switching
 * to Tone and back left the prayer on Tone with nothing ticked, which read as
 * a reset. Now it brings back the voice the prayer kept. Only a prayer that
 * has never had a voice chosen opens the sheet, because an adhan needs one.
 *
 * ## The platforms
 *
 * Android plays the recording, short or full, at a volume of its own. An
 * iPhone plays the opening as the notification's sound, and has no volume or
 * Full. The web preview draws Android's layout, because the web build exists
 * to look at phone screens.
 */

const LAYOUT: 'ios' | 'android' = Platform.OS === 'ios' ? 'ios' : 'android';

/** Written by `npm run adhan:audio`, so the lengths shown are the files' own. */
const LENGTHS = DERIVED as Record<string, { openingSeconds: number; fullSeconds: number }>;

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

const clock = (seconds: number) => {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
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
  // The level under the finger, so the percentage moves with the bar before it is saved.
  const [liveVolume, setLiveVolume] = useState<number | null>(null);

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
  const short = LAYOUT === 'ios' || alert.length === 'short';
  const known = LENGTHS[alert.voice];
  const seconds = known ? (short ? known.openingSeconds : known.fullSeconds) : null;

  const change = (patch: Partial<PrayerAlert>) => {
    setApplied(false);
    void setAlert(id, patch);
  };

  const openVoices = () => router.push({ pathname: '/adhan-voice/[id]', params: { id } });
  const openQuiet = () => router.push({ pathname: '/quiet-phone/[id]', params: { id } });

  /* Adhan takes effect like its three neighbours; only a prayer with no voice chosen yet opens the sheet. */
  const chooseMode = (mode: AlertMode) => {
    if (mode === 'adhan' && alert.mode !== 'adhan' && !alert.voiceChosen) {
      openVoices();
      return;
    }
    change({ mode });
  };

  const ruled = { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border };

  /* The sentence under the prayer's name: what the phone does at its time, and the reminder before. */
  const saysKey: UIKey | null =
    alert.mode === 'off'
      ? null
      : adhan
        ? short
          ? 'alert.says.short'
          : 'alert.says.full'
        : alert.mode === 'sound'
          ? 'alert.says.tone'
          : 'alert.says.silent';
  const reminderAt =
    time && alert.mode !== 'off' && alert.preReminderMinutes > 0
      ? formatTime(new Date(time.getTime() - alert.preReminderMinutes * 60_000))
      : null;

  /* The volume is heard on the adhan this prayer will play, short or full; the bar moves it while it plays. */
  const volumeSound = short ? shortRawName(alert.voice) : rawName(alert.voice);
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
      <Stack.Screen options={{ title: '' }} />

      {granted === false && (
        <View style={[styles.notice, { borderLeftColor: theme.accent }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('settings.reminders.denied')}
          </ThemedText>
        </View>
      )}

      <View style={styles.head}>
        <View style={[styles.disc, { borderColor: theme.gold }]}>
          <Glyph name={id} size={22} color={theme.gold} />
        </View>
        <ThemedText type="subtitle">{label}</ThemedText>
      </View>

      {time ? (
        <ThemedText type="lead">
          {saysKey ? (
            <Timed template={t(saysKey)} time={formatTime(time)} />
          ) : (
            t('alert.says.off').replace('{prayer}', label)
          )}
          {reminderAt ? (
            <>
              {' '}
              <Timed template={t('alert.says.pre')} time={reminderAt} />
            </>
          ) : null}
        </ThemedText>
      ) : null}

      <Panel mark={<Ionicons name={BELL[alert.mode]} size={16} color={theme.gold} />} title={t('alert.panel.time')}>
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
              <View style={styles.valueText}>
                <ThemedText type="default" numberOfLines={1}>
                  {voice.short}
                </ThemedText>
                {seconds !== null ? (
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.tabular}>
                    {LAYOUT === 'android'
                      ? `${t(short ? 'alert.length.short' : 'alert.length.full')}, ${clock(seconds)}`
                      : clock(seconds)}
                  </ThemedText>
                ) : null}
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.accent} />
            </View>
          </Pressable>
        )}

        {adhan && LAYOUT === 'android' && (
          <View style={[styles.volume, ruled]}>
            <View style={styles.volumeHead}>
              <ThemedText type="default">{t('alert.volume.label')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.tabular}>
                {Math.round((liveVolume ?? alert.volume) * 100)}%
              </ThemedText>
            </View>
            <View style={styles.sliderRow}>
              <VolumeSlider
                value={alert.volume}
                onChange={(volume) => {
                  setLiveVolume(null);
                  change({ volume });
                }}
                onLive={(volume) => {
                  setLiveVolume(volume === alert.volume ? null : volume);
                  if (volumePlaying) void setAdhanPreviewVolume(volume);
                }}
                label={t('alert.volume')}
              />
              {adhanPreviewAvailable && (
                <Pressable
                  onPress={() => void toggleVolumePreview()}
                  accessibilityRole="button"
                  accessibilityLabel={t(volumePlaying ? 'alert.preview.stop' : 'alert.preview')}
                  hitSlop={8}
                  style={({ pressed }) => [styles.play, { opacity: pressed ? 0.6 : 1 }]}>
                  <Ionicons
                    name={volumePlaying ? 'stop-circle-outline' : 'play-circle-outline'}
                    size={28}
                    color={theme.accent}
                  />
                </Pressable>
              )}
            </View>
          </View>
        )}

        {alert.mode !== 'off' && (
          <View style={[styles.row, ruled]}>
            <ThemedText type="default" style={styles.grow}>
              {t(adhan ? 'alert.preReminder' : 'alert.preReminder.other')}
            </ThemedText>
            <Dropdown
              label={t(adhan ? 'alert.preReminder' : 'alert.preReminder.other')}
              options={reminderOptions}
              value={alert.preReminderMinutes}
              onChange={(minutes) => change({ preReminderMinutes: minutes })}
            />
          </View>
        )}

        {adhan && (
          <Pressable
            onPress={openQuiet}
            accessibilityRole="button"
            accessibilityLabel={`${t('alert.quiet')}: ${quietSummary(alert, t)}`}
            style={({ pressed }) => [styles.row, ruled, pressed && { opacity: 0.6 }]}>
            <View style={styles.labelColumn}>
              <ThemedText type="default">{t('alert.quiet')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {quietSummary(alert, t)}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.accent} />
          </Pressable>
        )}
      </Panel>

      <View style={styles.actions}>
        {adhan && adhanAlarmAvailable && (
          <View style={styles.test}>
            <Pressable
              onPress={() => void ringSoon()}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                { borderColor: theme.border },
                pressed && { backgroundColor: theme.backgroundSelected },
              ]}>
              <Ionicons name="timer-outline" size={20} color={theme.accent} />
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
          {!applied && (
            <ThemedText type="caption" themeColor="textSecondary">
              {t('alert.applyAll.note')}
            </ThemedText>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

/** A sentence with its time set in gold, the way the app sets a prayer's time. */
function Timed({ template, time }: { template: string; time: string }) {
  const [before, after = ''] = template.split('{time}');
  return (
    <>
      {before}
      <ThemedText type="lead" themeColor="gold">
        {time}
      </ThemedText>
      {after}
    </>
  );
}

/** The quiet-phone switches in a few words, for the row that opens them. */
function quietSummary(alert: PrayerAlert, t: (key: UIKey) => string): string {
  if (LAYOUT === 'ios') return t(alert.soundInFocus ? 'alert.quiet.focus' : 'alert.quiet.stays');
  if (alert.playOnSilent && alert.playInDnd) return t('alert.quiet.both');
  if (alert.playOnSilent) return t('alert.quiet.onSilent');
  if (alert.playInDnd) return t('alert.quiet.inDnd');
  return t('alert.quiet.stays');
}

/** The last adhan in a sentence, with how long it played when something stopped it. */
function outcomeText(outcome: AdhanOutcome, t: (key: UIKey) => string): string {
  const what = t(outcomeKey(outcome));
  const played = outcome.seconds ?? 0;
  const said =
    outcome.played && outcome.reason !== 'finished' && played > 0
      ? t('alert.last.after').replace('{what}', what).replace('{n}', String(played))
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
    case 'volume-changed':
      return 'adhan.outcome.volumeChanged';
    case 'pause':
      return 'adhan.outcome.pause';
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
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  notice: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  disc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
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
  value: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  valueText: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  labelColumn: {
    flexShrink: 1,
    gap: Spacing.half,
  },
  volume: {
    paddingTop: Spacing.three,
  },
  volumeHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  play: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: {
    flex: 1,
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
  actions: {
    gap: Spacing.four,
  },
  test: {
    gap: Spacing.two,
  },
  button: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderWidth: 1,
    borderRadius: Radius.rule,
  },
  applyAll: {
    alignSelf: 'flex-start',
    gap: Spacing.half,
    paddingVertical: Spacing.one,
  },
});
