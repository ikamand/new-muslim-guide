import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { getAudio, getPracticeCredits, getPracticeItems, type PracticeClip } from '@/content';
import { localiseRecitation } from '@/i18n/localise';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/** Slow enough to copy, fast enough to still sound like recitation. */
const SLOW_RATE = 0.75;

/**
 * One ayah with its own player.
 *
 * Each row owns a player rather than the screen owning one and swapping the
 * source, because swapping mid-playback is where audio bugs live. Seven small
 * clips cost less than getting that wrong. Only one plays at a time — a row
 * pauses itself the moment another becomes active.
 */
function PlayerClipRow({
  clip,
  isActive,
  onActivate,
  loop,
  slow,
}: {
  clip: PracticeClip;
  isActive: boolean;
  onActivate: (audioId: string | null) => void;
  loop: boolean;
  slow: boolean;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const source = getAudio(clip.audioId);
  const label = clip.part ? `${t('practice.ayah')} ${clip.part}` : null;
  const player = useAudioPlayer(source ?? null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    player.loop = loop;
  }, [player, loop]);

  useEffect(() => {
    player.setPlaybackRate(slow ? SLOW_RATE : 1);
  }, [player, slow]);

  // Another row took over, so this one stops and rewinds — coming back to a
  // half-played ayah should start it again, not resume from the middle.
  useEffect(() => {
    if (!isActive && status.playing) {
      player.pause();
      player.seekTo(0);
    }
  }, [isActive, status.playing, player]);

  // A non-looping clip that reached its end is finished, not paused.
  useEffect(() => {
    if (isActive && !loop && status.didJustFinish) onActivate(null);
  }, [isActive, loop, status.didJustFinish, onActivate]);

  if (!source) return null;

  const toggle = () => {
    if (status.playing) {
      player.pause();
      onActivate(null);
      return;
    }
    player.seekTo(0);
    player.play();
    onActivate(clip.audioId);
  };

  return (
    <View style={styles.verse}>
      <View style={styles.verseHead}>
        {label ? (
          <ThemedText type="small" themeColor="textSecondary" style={styles.ayahLabel}>
            {label}
          </ThemedText>
        ) : (
          <View />
        )}
        <Pressable
          onPress={toggle}
          accessibilityRole="button"
          accessibilityLabel={`${status.playing ? t('practice.pause') : t('practice.play')} ${label ?? ''}`.trim()}
          hitSlop={Spacing.two}
          style={({ pressed }) => [
            styles.playButton,
            {
              backgroundColor: status.playing ? theme.accent : theme.accentMuted,
              opacity: pressed ? 0.7 : 1,
            },
          ]}>
          <Ionicons
            name={status.playing ? 'pause' : 'play'}
            size={17}
            color={status.playing ? theme.textOnAccent : theme.accent}
          />
        </Pressable>
      </View>
      <RecitationCard recitation={clip.display} />
    </View>
  );
}

/**
 * The same row with no player attached.
 *
 * `useAudioPlayer` throws during static web rendering, and expo-router's
 * prerender swallows it — the whole screen came out blank with no error, which
 * silently cost us `expo export` as a check on this file. The app is phone-first
 * and web is the verification harness, so web gets the text without the audio
 * rather than nothing at all.
 */
function SilentClipRow({ clip }: { clip: PracticeClip }) {
  const { t } = useLocale();
  if (!getAudio(clip.audioId)) return null;

  return (
    <View style={styles.verse}>
      {clip.part && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.ayahLabel}>
          {t('practice.ayah')} {clip.part}
        </ThemedText>
      )}
      <RecitationCard recitation={clip.display} />
    </View>
  );
}

const ClipRow = Platform.OS === 'web' ? SilentClipRow : PlayerClipRow;

function Toggle({
  label,
  on,
  onPress,
}: {
  label: string;
  on: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      style={({ pressed }) => [
        styles.toggle,
        {
          backgroundColor: on ? theme.accentMuted : 'transparent',
          borderColor: on ? theme.accent : theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <ThemedText type="smallBold" themeColor={on ? 'accent' : 'textSecondary'}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export default function PracticeScreen() {
  const { locale, t } = useLocale();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loop, setLoop] = useState(false);
  const [slow, setSlow] = useState(false);

  const items = getPracticeItems();
  const credits = getPracticeCredits(items);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('practice.title') }} />

      <ThemedText type="default" themeColor="textSecondary">{t('practice.intro')}</ThemedText>

      <View style={styles.controls}>
        <Toggle label={t('practice.repeat')} on={loop} onPress={() => setLoop((v) => !v)} />
        <Toggle label={t('practice.slower')} on={slow} onPress={() => setSlow((v) => !v)} />
      </View>

      {items.map((item) => (
        <View key={item.key} style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {item.title}
          </ThemedText>
          <View style={styles.list}>
            {item.clips.map((clip) => (
              <ClipRow
                key={clip.audioId}
                clip={{ ...clip, display: localiseRecitation(clip.display, locale) }}
                isActive={activeId === clip.audioId}
                onActivate={setActiveId}
                loop={loop}
                slow={slow}
              />
            ))}
          </View>
        </View>
      ))}

      {credits.map((credit) => (
        <ThemedText key={credit} type="small" themeColor="textSecondary">
          {credit}
        </ThemedText>
      ))}
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
  controls: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  toggle: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  section: {
    gap: Spacing.three,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  list: {
    gap: Spacing.four,
  },
  verse: {
    gap: Spacing.two,
  },
  verseHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  ayahLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
