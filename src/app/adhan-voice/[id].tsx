import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import {
  adhanPreviewAvailable,
  onAdhanPreviewEnd,
  startAdhanPreview,
  stopAdhanPreview,
} from '../../../modules/adhan-alarm';
import DERIVED from '@/assets/adhan/derived.json';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { ADHAN_VOICES, rawName, shortRawName, type AdhanVoice, type AdhanVoiceId } from '@/content/adhan-voices';
import { ADHAN_OPENING } from '@/content/audio';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import { PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import type { AdhanLength } from '@/lib/reminders';

/**
 * Choosing a prayer's adhan: a sheet over its page.
 *
 * Iyad, 14 Sep 2026: tapping Adhan should open a place to choose one, not
 * grow a list under the choice. The Qur'an tab already chooses a reciter this
 * way, so this is the same gesture: a sheet, and a tap on a voice chooses it
 * and closes it. Swiping it away changes nothing.
 *
 * Android has the adhan both ways, Short and Full, as two sections behind one
 * switch rather than two lists, because for Fajr two lists would be sixteen
 * rows. An iPhone has the opening only. Every row says how long its recording
 * is, since Abdul Basit's whole Fajr adhan is nearly five minutes and the
 * short ones run four to fifteen seconds, and every row can be played first.
 */

const LAYOUT: 'ios' | 'android' = Platform.OS === 'ios' ? 'ios' : 'android';

/** Written by `npm run adhan:audio`, so the lengths shown are the files' own. */
const LENGTHS = DERIVED as Record<string, { openingSeconds: number; fullSeconds: number }>;

const FAJR_VOICES = ADHAN_VOICES.filter((voice) => voice.kind === 'fajr');
const OTHER_VOICES = ADHAN_VOICES.filter((voice) => voice.kind === 'other');

const clock = (seconds: number) => {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

export default function AdhanVoiceScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { reminders, setAlert } = useReminders();
  const id = PRAYER_IDS.find((prayer) => prayer === params.id);
  const alert = id ? reminders.alerts[id] : null;
  const [length, setLength] = useState<AdhanLength>(LAYOUT === 'ios' ? 'short' : (alert?.length ?? 'full'));
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAdhanPreviewEnd((sound) => setPlaying((current) => (current === sound ? null : current)));
    return () => {
      unsubscribe();
      void stopAdhanPreview();
    };
  }, []);

  if (!id || !alert) return null;

  const choose = async (voice: AdhanVoiceId) => {
    await stopAdhanPreview();
    const saved = await setAlert(id, { mode: 'adhan', voice, length });
    if (saved && router.canGoBack()) router.back();
  };

  const pickLength = (next: AdhanLength) => {
    setLength(next);
    setPlaying(null);
    void stopAdhanPreview();
  };

  const list = (voices: readonly AdhanVoice[]) => (
    <View style={[styles.list, { borderColor: theme.goldSoft }]}>
      {voices.map((voice, index) => {
        const voiceId = voice.id as AdhanVoiceId;
        const selected =
          alert.mode === 'adhan' && alert.voice === voiceId && (LAYOUT === 'ios' || alert.length === length);
        const known = LENGTHS[voiceId];
        const seconds = known ? (length === 'short' ? known.openingSeconds : known.fullSeconds) : null;
        const sound = previewSoundFor(voiceId, length);
        return (
          <View
            key={voiceId}
            style={[styles.row, index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border }]}>
            <Pressable
              onPress={() => void choose(voiceId)}
              accessibilityRole="radio"
              accessibilityState={{ selected, checked: selected }}
              accessibilityLabel={voice.name}
              style={({ pressed }) => [styles.choice, pressed && { opacity: 0.6 }]}>
              <View style={styles.choiceText}>
                <ThemedText type="default">{voice.name}</ThemedText>
                {seconds !== null ? (
                  <ThemedText type="small" themeColor="textSecondary" style={styles.tabular}>
                    {clock(seconds)}
                  </ThemedText>
                ) : null}
              </View>
              {selected ? <Ionicons name="checkmark" size={20} color={theme.accent} /> : null}
            </Pressable>
            {sound ? (
              <PreviewButton
                voiceId={voiceId}
                sound={sound}
                volume={alert.volume}
                playing={playing === sound}
                onPlaying={setPlaying}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('alert.sheet.title').replace('{prayer}', PRAYER_LABEL[id]) }} />

      {LAYOUT === 'android' ? (
        <View style={styles.lengths}>
          <Segmented
            options={[
              { value: 'short', label: t('alert.length.short') },
              { value: 'full', label: t('alert.length.full') },
            ]}
            value={length}
            onChange={pickLength}
          />
          <ThemedText type="small" themeColor="textSecondary">
            {t(length === 'short' ? 'alert.length.short.help' : 'alert.length.full.help')}
          </ThemedText>
        </View>
      ) : (
        <ThemedText type="small" themeColor="textSecondary">
          {t('alert.sheet.ios')}
        </ThemedText>
      )}

      {id === 'fajr' ? (
        <>
          <View style={styles.group}>
            <View style={styles.groupHead}>
              <ThemedText type="smallBold">{t('alert.voice.fajrGroup')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('alert.voice.fajr')}
              </ThemedText>
            </View>
            {list(FAJR_VOICES)}
          </View>
          <View style={styles.group}>
            <ThemedText type="smallBold">{t('alert.voice.other')}</ThemedText>
            {list(OTHER_VOICES)}
          </View>
        </>
      ) : (
        list(OTHER_VOICES)
      )}
    </ScrollView>
  );
}

/**
 * What a row's play button plays, or null for none. Android plays the file
 * the alarm will play, through the native module. An iPhone, or an Android
 * build from before that module could preview, plays the opening through the
 * app, and has nothing to play for Full. The web preview plays nothing.
 */
function previewSoundFor(voiceId: AdhanVoiceId, length: AdhanLength): string | null {
  if (Platform.OS === 'android' && adhanPreviewAvailable) {
    return length === 'short' ? shortRawName(voiceId) : rawName(voiceId);
  }
  if (Platform.OS !== 'web' && length === 'short') return `opening:${voiceId}`;
  return null;
}

type PreviewProps = {
  voiceId: AdhanVoiceId;
  sound: string;
  volume: number;
  playing: boolean;
  onPlaying: (sound: string | null) => void;
};

function PreviewButton(props: PreviewProps) {
  return props.sound.startsWith('opening:') ? <OpeningPreview {...props} /> : <NativePreview {...props} />;
}

function NativePreview({ sound, volume, playing, onPlaying }: PreviewProps) {
  const toggle = async () => {
    if (playing) {
      await stopAdhanPreview();
      onPlaying(null);
      return;
    }
    if (await startAdhanPreview(sound, volume)) onPlaying(sound);
  };
  return <PlayButton playing={playing} onPress={() => void toggle()} />;
}

/** The opening through the app's own player, where the native preview is not there to use. */
function OpeningPreview({ voiceId, sound, playing, onPlaying }: PreviewProps) {
  const player = useAudioPlayer(ADHAN_OPENING[voiceId] ?? null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!playing && status.playing) {
      player.pause();
      player.seekTo(0);
    }
  }, [playing, status.playing, player]);

  useEffect(() => {
    if (playing && status.didJustFinish) onPlaying(null);
  }, [playing, status.didJustFinish, onPlaying]);

  return (
    <PlayButton
      playing={playing && status.playing}
      onPress={() => {
        if (playing) {
          player.pause();
          onPlaying(null);
          return;
        }
        player.seekTo(0);
        player.play();
        onPlaying(sound);
      }}
    />
  );
}

function PlayButton({ playing, onPress }: { playing: boolean; onPress: () => void }) {
  const theme = useTheme();
  const { t } = useLocale();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(playing ? 'alert.preview.stop' : 'alert.preview')}
      hitSlop={8}
      style={({ pressed }) => [styles.preview, { opacity: pressed ? 0.6 : 1 }]}>
      <Ionicons name={playing ? 'stop-circle-outline' : 'play-circle-outline'} size={30} color={theme.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  lengths: {
    gap: Spacing.two,
  },
  group: {
    gap: Spacing.two,
  },
  groupHead: {
    gap: Spacing.half,
  },
  list: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  choice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  choiceText: {
    flexShrink: 1,
    gap: Spacing.half,
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
  preview: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
