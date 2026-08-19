import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Glyph, type GlyphName } from '@/components/illustrations';
import { PrayerTimesCard } from '@/components/prayer-times-card';
import { ThemedText } from '@/components/themed-text';
import { PRAYERS, PURIFICATION, REFERENCES, WUDU, type Guide, type Reference } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { localiseGuide, localiseReference } from '@/i18n/localise';
import { useTheme } from '@/hooks/use-theme';

/**
 * The one thing this screen exists for.
 *
 * Someone standing on a mat wants to start praying, not to browse. It lives
 * inside the times card, under the mihrab, so the prayer you are about to pray
 * and the button that starts it are the same object.
 */
function PrayAction({ prayer, wudu }: { prayer: Guide; wudu: Guide }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View style={styles.action}>
      <Link href={{ pathname: '/guide/[id]', params: { id: prayer.id } }} asChild>
        <Pressable
          style={({ pressed }) => [
            styles.primary,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="smallBold" themeColor="textOnAccent" style={styles.primaryLabel}>
            {t('home.prayNow')} {prayer.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textOnAccent" style={styles.primaryCount}>
            {prayer.steps.length} {t('count.steps')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={18} color={theme.textOnAccent} />
        </Pressable>
      </Link>

      {/*
        Wudu is a precondition, not a sibling. It used to sit in a section of
        three cards above the prayers, so a first-timer scanned ghusl and
        tayammum to find the one they needed before every single prayer.
      */}
      <Link href={{ pathname: '/guide/[id]', params: { id: wudu.id } }} asChild>
        <Pressable style={({ pressed }) => [styles.wuduLine, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('home.notInWudu')}
          </ThemedText>
          <ThemedText type="smallBold" themeColor="accent">
            {t('home.washFirst')} · {wudu.steps.length} {t('count.steps')}
          </ThemedText>
        </Pressable>
      </Link>
    </View>
  );
}

/** Ghusl and tayammum: needed rarely, so present but not in the way. */
function PurificationCard({ guide, glyph }: { guide: Guide; glyph: GlyphName }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <Link href={{ pathname: '/guide/[id]', params: { id: guide.id } }} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.purification,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <Glyph name={glyph} color={theme.accent} />
        <View style={styles.purificationText}>
          <ThemedText type="smallBold" style={styles.purificationTitle}>
            {guide.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.tiny}>
            {guide.id === 'tayammum' ? `${t('home.noWater')} · ` : ''}
            {guide.steps.length} {t('count.steps')}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
}

/**
 * The safety net, as chips.
 *
 * These were five full cards with subtitles, which put "what if I am
 * travelling" at the same visual weight as "pray Maghrib". You reach for one
 * of these when something has already gone wrong, so they need to be findable,
 * not prominent.
 */
function TopicChip({ reference }: { reference: Reference }) {
  const theme = useTheme();

  return (
    <Link href={{ pathname: '/reference/[id]', params: { id: reference.id } }} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.chip,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <ThemedText type="small">{reference.title}</ThemedText>
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const theme = useTheme();
  const { next } = usePrayerTimes();
  const { locale, t } = useLocale();
  const { audience } = useSettings();

  const nextPrayer = next ? PRAYERS.find((prayer) => prayer.id === next.id) : undefined;
  const wudu = localiseGuide(WUDU, locale);
  const otherWays = PURIFICATION.filter((guide) => guide.id !== WUDU.id);

  // A topic marked for one audience is hidden from the other. Someone who
  // declined the question sees everything — the honest fallback, since the app
  // would otherwise withhold something on a guess.
  const topics = REFERENCES.filter(
    (reference) =>
      reference.surface === 'pray' &&
      (!reference.audience || !audience || reference.audience === audience),
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <PrayerTimesCard
          action={
            nextPrayer ? (
              <PrayAction prayer={localiseGuide(nextPrayer, locale)} wudu={wudu} />
            ) : null
          }
        />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('home.ifWuduNotEnough')}
          </ThemedText>
          <View style={styles.pair}>
            {otherWays.map((guide) => (
              <PurificationCard
                key={guide.id}
                guide={localiseGuide(guide, locale)}
                glyph={guide.id === 'ghusl' ? 'ghusl' : 'tayammum'}
              />
            ))}
          </View>
        </View>

        {topics.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              {t('home.different')}
            </ThemedText>
            <View style={styles.chips}>
              {topics.map((topic) => (
                <TopicChip key={topic.id} reference={localiseReference(topic, locale)} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
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
    marginBottom: Spacing.one,
  },
  action: {
    gap: Spacing.two,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  primaryLabel: {
    fontSize: 17,
    lineHeight: 24,
  },
  primaryCount: {
    opacity: 0.72,
  },
  wuduLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  pair: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  purification: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  purificationText: {
    flex: 1,
    gap: 1,
  },
  purificationTitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  tiny: {
    fontSize: 12,
    lineHeight: 16,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
