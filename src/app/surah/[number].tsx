import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getSurah, JUZ30_SOURCE } from '@/content/quran/juz30';
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
 */
export default function SurahScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { translation } = useSettings();
  const { number } = useLocalSearchParams<{ number: string }>();
  const { isMemorised, toggle } = useMemorised();

  const surah = getSurah(Number(number));
  const [hidden, setHidden] = useState<readonly number[]>([]);

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

      <View style={styles.list}>
        {surah.ayahs.map((ayah) => {
          const isHidden = hidden.includes(ayah.number);

          return (
            <Pressable
              key={ayah.number}
              onPress={() => cover(ayah.number)}
              accessibilityRole="button"
              accessibilityLabel={
                isHidden
                  ? t('quran.reveal').replace('{n}', String(ayah.number))
                  : t('quran.hide').replace('{n}', String(ayah.number))
              }
              style={({ pressed }) => [
                styles.ayah,
                {
                  backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}>
              <View style={styles.ayahHead}>
                <ThemedText type="caption" themeColor="accent" style={styles.ayahNumber}>
                  {ayah.number}
                </ThemedText>
              </View>

              {isHidden ? (
                /*
                  A blank of roughly the right height rather than a collapsed
                  row. The line keeps its place on the screen, so covering an
                  ayah does not make everything below it jump — and the shape
                  of the gap is a reminder of how long the line is, which is
                  part of what you are learning.
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
  },
  ayahNumber: {
    fontVariant: ['tabular-nums'],
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
