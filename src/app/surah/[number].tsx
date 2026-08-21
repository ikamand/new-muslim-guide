import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getSurah, JUZ30_SOURCE } from '@/content/quran/juz30';
import { ayahAudioUrl, RECITATION_CREDIT } from '@/content/quran/recitation';
import { ArabicFont, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useMemorised } from '@/hooks/use-memorised';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * One surah, to read and then to recite from memory.
 *
 * ## Hide the text
 *
 * The whole screen turns on one control. Reading an ayah over and over does
 * not commit it — covering it and finding out whether it is there does, and
 * that is the drill every hifz teacher runs and no reading app offers.
 *
 * So the Arabic can be hidden per ayah, not all at once: you cover the line
 * you are working on, recite it, and reveal it to check, while the ones you
 * have not reached stay visible. Covering the whole surah would be a test
 * rather than a practice.
 *
 * ## The translation is secondary here, and that is deliberate
 *
 * On a prayer step the meaning is the point. Here the sound and the shape are,
 * so the English is quiet and small and sits under. Someone memorising who
 * reads the English first will memorise the English.
 *
 * ## Audio, and the one promise it does not break
 *
 * Every ayah streams. This is the app's first network request, and it does not
 * touch the offline promise: salah, wudu, prayer times and every bundled
 * recitation still work with the radio off. That promise was about the worship
 * path, and this is a learning surface.
 *
 * The player lives on each row rather than one owned by the screen and moved
 * between them — swapping a source mid-playback is where audio bugs live, and
 * `practice.tsx` learned that already. Only one plays at a time: a row pauses
 * itself the moment another starts.
 *
 * Failure is quiet and local. No signal means the play button says so and the
 * text is still there to read, which is most of what this screen is for.
 */
/**
 * One ayah's play control.
 *
 * `loop` is the whole point of it. Hearing an ayah once teaches nothing;
 * hearing it twenty times without touching the phone is how it goes in, and it
 * is what a paper mushaf cannot do.
 */
function AyahAudio({
  surah,
  ayah,
  active,
  onActivate,
  loop,
}: {
  surah: number;
  ayah: number;
  active: boolean;
  onActivate: (ayah: number | null) => void;
  loop: boolean;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  // `downloadFirst` fetches before playing. For a ~140KB ayah that is a beat,
  // and it buys playback that does not stutter on a weak connection.
  const player = useAudioPlayer({ uri: ayahAudioUrl(surah, ayah) }, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    // Same as `practice.tsx`, for the same reason: `loop` is a settable
    // property in expo-audio, with no setLoop() and no creation-time option,
    // so assignment is the documented API. The lint rule reads it as mutating
    // a hook's return, but `player` is a handle to a native player rather than
    // React state, and pushing state out to an external system is what an
    // effect is for.
    // eslint-disable-next-line react-hooks/immutability
    player.loop = loop;
  }, [loop, player]);

  useEffect(() => {
    if (!active && status.playing) player.pause();
  }, [active, status.playing, player]);

  // Release the row when a non-looping ayah finishes, so the button goes back
  // to offering a play rather than sitting on a pause nothing is doing.
  useEffect(() => {
    if (active && status.didJustFinish && !loop) onActivate(null);
  }, [active, status.didJustFinish, loop, onActivate]);

  const failed = Boolean(status.error);

  return (
    <Pressable
      onPress={() => {
        if (failed) return;
        if (status.playing) {
          player.pause();
          onActivate(null);
          return;
        }
        onActivate(ayah);
        player.seekTo(0);
        player.play();
      }}
      accessibilityRole="button"
      accessibilityLabel={t(status.playing ? 'practice.pause' : 'practice.play')}
      hitSlop={8}
      style={({ pressed }) => [
        styles.play,
        {
          backgroundColor: status.playing ? theme.accent : theme.accentMuted,
          opacity: pressed || failed ? 0.5 : 1,
        },
      ]}>
      {status.isBuffering && !status.playing ? (
        <Ionicons name="ellipsis-horizontal" size={16} color={theme.accent} />
      ) : (
        <Ionicons
          name={failed ? 'cloud-offline-outline' : status.playing ? 'pause' : 'play'}
          size={16}
          color={status.playing ? theme.textOnAccent : theme.accent}
        />
      )}
    </Pressable>
  );
}

export default function SurahScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { translation } = useSettings();
  const { number } = useLocalSearchParams<{ number: string }>();
  const { isMemorised, toggle } = useMemorised();

  const surah = getSurah(Number(number));
  const [hidden, setHidden] = useState<readonly number[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [loop, setLoop] = useState(false);

  if (!surah) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: '' }} />
        <ThemedText type="default" themeColor="textSecondary">
          {t('quran.missing')}
        </ThemedText>
      </View>
    );
  }

  const known = isMemorised(surah.number);
  const cover = (ayah: number) =>
    setHidden((current) =>
      current.includes(ayah) ? current.filter((n) => n !== ayah) : [...current, ayah],
    );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: surah.name }} />

      <View style={styles.header}>
        <ThemedText style={styles.titleArabic}>{surah.nameArabic}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('quran.surahNumber').replace('{n}', String(surah.number))} · {surah.meaning} ·{' '}
          {surah.ayahs.length} {t('count.ayahs')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('quran.tapToHide')}
        </ThemedText>
      </View>

      {/*
        Repeat is a screen-wide setting rather than per row, because it is a
        mode you are in — you turn it on, then work through the surah one ayah
        at a time without reaching for it again.
      */}
      <Pressable
        onPress={() => setLoop((was) => !was)}
        accessibilityRole="switch"
        accessibilityState={{ checked: loop }}
        style={[
          styles.loop,
          {
            backgroundColor: loop ? theme.accentMuted : 'transparent',
            borderColor: loop ? theme.accent : theme.border,
          },
        ]}>
        <Ionicons name="repeat" size={16} color={loop ? theme.accent : theme.textSecondary} />
        <ThemedText type="smallBold" themeColor={loop ? 'accent' : 'textSecondary'}>
          {t('practice.repeat')}
        </ThemedText>
      </Pressable>

      <View style={styles.list}>
        {surah.ayahs.map((ayah) => {
          const isHidden = hidden.includes(ayah.number);

          return (
            /*
              A View, not a Pressable.

              The play control is a button and the cover toggle is a button,
              and the first draft nested one inside the other — which is
              invalid on web and wrong everywhere: tapping play would also
              cover the ayah you were about to listen to. So the card holds
              two separate targets, and the text is the one that covers.
            */
            <View
              key={ayah.number}
              style={[
                styles.ayah,
                { backgroundColor: theme.backgroundElement, borderColor: theme.border },
              ]}>
              <View style={styles.ayahHead}>
                <ThemedText type="caption" themeColor="accent" style={styles.ayahNumber}>
                  {ayah.number}
                </ThemedText>
                <AyahAudio
                  surah={surah.number}
                  ayah={ayah.number}
                  active={playing === ayah.number}
                  onActivate={setPlaying}
                  loop={loop}
                />
              </View>

              <Pressable
                onPress={() => cover(ayah.number)}
                accessibilityRole="button"
                accessibilityLabel={
                  isHidden
                    ? t('quran.reveal').replace('{n}', String(ayah.number))
                    : t('quran.hide').replace('{n}', String(ayah.number))
                }
                style={({ pressed }) => [styles.ayahText, { opacity: pressed ? 0.6 : 1 }]}>
                {isHidden ? (
                  /*
                    A blank of roughly the right height rather than a collapsed
                    row. The line keeps its place, so covering an ayah does not
                    make everything below it jump — and the shape of the gap is
                    a reminder of how long the line is, which is part of what
                    you are learning.
                  */
                  <View style={[styles.covered, { borderColor: theme.border }]}>
                    <ThemedText type="small" themeColor="textSecondary">
                      {t('quran.covered')}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText style={styles.arabic}>{ayah.arabic}</ThemedText>
                )}

                {translation && !isHidden && (
                  <ThemedText type="small" themeColor="textSecondary">
                    {ayah.translation}
                  </ThemedText>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>

      {/*
        Marking it known is the reader's call, not the app's. Nothing measures
        whether they are right, because the only person who can know is them
        and being told "not yet" by a phone is the wrong relationship.
      */}
      <Pressable
        onPress={() => toggle(surah.number)}
        accessibilityRole="switch"
        accessibilityState={{ checked: known }}
        style={({ pressed }) => [
          styles.mark,
          {
            backgroundColor: known ? theme.accentMuted : 'transparent',
            borderColor: known ? theme.accent : theme.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <ThemedText type="cardTitle" themeColor={known ? 'accent' : 'text'}>
          {known ? t('quran.knowIt') : t('quran.markKnown')}
        </ThemedText>
      </Pressable>

      <ThemedText type="caption" themeColor="textSecondary">
        {JUZ30_SOURCE.arabic} · {JUZ30_SOURCE.translation}
      </ThemedText>
      {/* A licence obligation: the credit goes where the audio plays. */}
      <ThemedText type="caption" themeColor="textSecondary">
        {RECITATION_CREDIT}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  titleArabic: {
    fontFamily: ArabicFont,
    fontSize: 34,
    lineHeight: 52,
  },
  list: {
    gap: Spacing.two,
  },
  ayah: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  ayahHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  play: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loop: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.two,
    minHeight: 40,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  ayahNumber: {
    fontVariant: ['tabular-nums'],
  },
  ayahText: {
    gap: Spacing.two,
  },
  arabic: {
    fontFamily: ArabicFont,
    fontSize: 30,
    lineHeight: 58,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  covered: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
  },
  mark: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.medium,
    borderWidth: 1,
    marginTop: Spacing.two,
  },
});
