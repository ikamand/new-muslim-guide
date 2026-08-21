import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { DAILY_PRAYERS, VOLUNTARY_PRAYERS, hadeethEnc } from '@/content';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * Which prayer, chosen once.
 *
 * The Learn tab used to show Fajr alone, which read as though the app taught
 * one prayer of two rakʿahs. The alternative it was avoiding — five
 * near-identical cards — is the wall this whole redesign exists to remove.
 *
 * So the branch happens here, once, before anyone starts. Not mid-prayer:
 * asking "are you praying Maghrib? then stop" arrives when somebody is on a
 * mat, one-handed, four minutes into concentrating, which is the worst moment
 * in the app to hand out a decision. And it is unnecessary — they knew which
 * prayer they were praying before they stood up.
 *
 * Today's prayer card does not come through here. It already knows the time,
 * so it opens the right prayer directly and this screen would be a tap in the
 * way.
 *
 * ## The column that is the real reason for the screen
 *
 * Seeing all five together is what teaches the rakʿah counts, and seeing the
 * sunnah beside them is what teaches that the rawatib exist at all. Every born
 * Muslim absorbs both without being taught; almost no convert is ever told.
 * Five separate cards could never say "Asr has none" — you would have to open
 * five pages and hold them in your head.
 */

/** The confirmed sunnah rakʿahs, and where the twelve come from. */
const RAWATIB_SOURCE = hadeethEnc('muslim', '65715', { grading: 'sahih', role: 'virtue' });

function Count({ n, label, muted }: { n?: number; label: string; muted?: boolean }) {
  return (
    <View style={styles.count}>
      <ThemedText
        type="cardTitle"
        themeColor={n ? (muted ? 'textSecondary' : 'accent') : 'border'}
        style={styles.countNumber}>
        {n ?? '—'}
      </ThemedText>
      <ThemedText type="caption" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

export default function PrayScreen() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('pray.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('pray.intro')}
      </ThemedText>

      <View style={styles.section}>
        {/*
          No column headings. Every count carries its own word underneath, so a
          legend says "before / owed / after" a sixth time and buys nothing —
          and at 46px "before" wrapped to "befor / e", which is how a table
          announces that it was laid out rather than looked at.
        */}
        {DAILY_PRAYERS.map((prayer) => (
          <PressableLink
            key={prayer.id}
            href={{ pathname: '/guide/[id]', params: { id: prayer.id } }}
            accessibilityLabel={`${prayer.title}. ${prayer.rakahs} ${t('count.rakahs')}. ${
              prayer.sunnahBefore ?? 0
            } ${t('pray.before')}, ${prayer.sunnahAfter ?? 0} ${t('pray.after')}`}
            style={[
              styles.row,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{prayer.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {prayer.when}
              </ThemedText>
            </View>
            <Count n={prayer.sunnahBefore} label={t('pray.before')} muted />
            <Count n={prayer.rakahs} label={t('pray.fard')} />
            <Count n={prayer.sunnahAfter} label={t('pray.after')} muted />
          </PressableLink>
        ))}

        {/*
          Asr is the row a beginner learns the most from, and only because the
          other four are beside it. Said in words as well, because a dash is a
          shape somebody might read as "not filled in yet".
        */}
        <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
          {t('pray.rawatib')}
        </ThemedText>
        <SourceDisclosure sources={[RAWATIB_SOURCE]} />
      </View>

      <View style={styles.section}>
        <ThemedText type="sectionTitle">{t('pray.chosen')}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('pray.chosen.help')}
        </ThemedText>

        {VOLUNTARY_PRAYERS.map((prayer) => (
          <PressableLink
            key={prayer.id}
            href={{ pathname: '/guide/[id]', params: { id: prayer.id } }}
            style={[
              styles.row,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{prayer.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {prayer.when}
              </ThemedText>
            </View>
            <Count n={prayer.rakahs} label={t('count.rakahs')} />
          </PressableLink>
        ))}

        {/*
          The how and the why are different pages on purpose. A guide walks the
          movements, which for all three are the movements they already know —
          what a reader actually needs is what the prayer is FOR, and that lives
          on the Learn tab.
        */}
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'istikhara' } }}
          style={[styles.aside, { borderLeftColor: theme.accent }]}
          pressedStyle={{ opacity: 0.6 }}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('pray.chosen.readMore')}
          </ThemedText>
        </PressableLink>
      </View>
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
  section: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 64,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  count: {
    width: 46,
    alignItems: 'center',
    gap: 1,
  },
  countNumber: {
    fontVariant: ['tabular-nums'],
  },
  footnote: {
    paddingTop: Spacing.two,
  },
  aside: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.two,
    marginTop: Spacing.two,
  },
});
