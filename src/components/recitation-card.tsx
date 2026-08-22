import { type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { getAudio, practiceKeyFor, type Recitation } from '@/content';
import { surahForRecitation } from '@/content/quran/surahs';
import { ArabicFont, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The words you say, rendered the same way everywhere they appear.
 *
 * Arabic always shows. The two lines under it are the user's choice, and the
 * divider only earns its place when there is something below it to divide.
 */
export function RecitationCard({
  recitation,
  practice = true,
}: {
  recitation: Recitation;
  /** Off where the card IS the practice screen, which would link to itself. */
  practice?: boolean;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const { transliteration, translation } = useSettings();
  const practiceKey = practice ? practiceKeyFor(recitation) : undefined;
  /** How many pieces actually have a recording — the number worth showing. */
  const clipCount = recitation.verses
    ? recitation.verses.filter((verse) => getAudio(verse.audioId)).length
    : 0;

  /*
    Al-Fatiha goes to the surah, everything else to the practice screen.

    Someone on the recite step of a prayer, on a mat, wants the best screen the
    app has for those seven ayahs — and that is no longer the practice screen.
    The surah plays straight through without gaps, plays any single ayah,
    covers a line so you can test yourself on it, and remembers when you know
    it. The practice screen still owns every recitation that is not a surah:
    the takbir, the tashahhud, the salawat.
  */
  const practiceSurah = practiceKey ? surahForRecitation(practiceKey) : undefined;
  const practiceHref: Href =
    practiceSurah !== undefined
      ? { pathname: '/surah/[number]', params: { number: String(practiceSurah) } }
      : { pathname: '/practice', params: { focus: practiceKey ?? '' } };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      <ThemedText style={styles.arabic}>{recitation.arabic}</ThemedText>

      {transliteration && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
          {recitation.transliteration}
        </ThemedText>
      )}

      {translation && (
        <>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ThemedText type="small">{recitation.translation}</ThemedText>
        </>
      )}

      {recitation.times && (
        <ThemedText type="small" themeColor="accent">
          {recitation.times}
        </ThemedText>
      )}

      {/*
        Only where there is audio to practise with — `practiceKeyFor` returns
        nothing for a recitation with no recording, so this appears and
        disappears with the files rather than with a hand-kept list.
      */}
      {practiceKey && (
        <PressableLink
          href={practiceHref}
          accessibilityLabel={`${t('practice.thisOne')}${clipCount ? `. ${clipCount} ${t('count.clips')}` : ''}`}
          style={[styles.practice, { backgroundColor: theme.accentMuted }]}
          pressedStyle={{ opacity: 0.7 }}>
          <Ionicons name="play" size={16} color={theme.accent} />
          <ThemedText type="smallBold" themeColor="accent" style={styles.practiceLabel}>
            {t('practice.thisOne')}
          </ThemedText>
          {clipCount > 0 && (
            <ThemedText type="caption" themeColor="textSecondary">
              {clipCount} · {t('practice.slower')} · {t('practice.repeat')}
            </ThemedText>
          )}
        </PressableLink>
      )}

      {/*
        The ayahs as a strip, where the text is split into pieces you learn one
        at a time.

        A card showing all seven at once tells someone how much there is and
        nothing about how far they have got. Seven bars say both, and they are
        the unit `RecitationVerse` already exists to describe — the thing you
        would loop twenty times in a row.
      */}
      {recitation.verses && recitation.verses.length > 1 && (
        <View style={styles.parts}>
          <View style={styles.partBars}>
            {recitation.verses.map((verse) => (
              <View
                key={verse.audioId}
                style={[
                  styles.partBar,
                  { backgroundColor: getAudio(verse.audioId) ? theme.accent : theme.border },
                ]}
              />
            ))}
          </View>
          <ThemedText type="caption" themeColor="textSecondary">
            {recitation.verses.length} {t('count.parts')}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  /**
   * Amiri, larger and more open than the platform fallback this replaced.
   *
   * 26/48 was chosen for a face that is not this one. Amiri sets a smaller
   * apparent size at the same point size and stacks vowel marks above the
   * line, so it needs both: 30 to read at arm's length on a mat, and 58 so a
   * shadda on one line never touches a kasra on the next.
   */
  arabic: {
    fontFamily: ArabicFont,
    fontSize: 30,
    lineHeight: 58,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transliteration: {
    fontStyle: 'italic',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.one,
  },
  practice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
  practiceLabel: {
    flex: 1,
  },
  parts: {
    gap: Spacing.two,
  },
  partBars: {
    flexDirection: 'row',
    gap: 4,
  },
  partBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
});
