import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { DAILY_PRAYERS, RAWATIB_SOURCES, resolveRef, VOLUNTARY_PRAYERS } from '@/content';
import { ref, type ContentRef } from '@/content/model';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { localiseCatalogEntry } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

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

/**
 * The map's other bands: the prayers that arrive with the week, the year and
 * a death, and the pages for when praying is different. Extraction only —
 * each row's title and sentence are the page's own — so a row is exactly as
 * reviewed as the page it opens. A ref that does not resolve renders nothing.
 */
const WEEK_AND_YEAR: readonly ContentRef[] = [
  ref('reference', 'jumuah'),
  ref('reference', 'eid'),
  ref('reference', 'janazah'),
];

const DIFFERENT: readonly ContentRef[] = [
  ref('reference', 'seated'),
  ref('reference', 'missed'),
  ref('reference', 'travelling'),
];

/**
 * Aloud or silent, as one phrase per row. Derived from the same field the
 * generated guides recite from, so this column can never disagree with the
 * prayer it describes.
 */
function aloudKey(prayer: { rakahs: number; aloudRakahs: number }): UIKey {
  if (prayer.aloudRakahs === 0) return 'pray.silent';
  if (prayer.aloudRakahs >= prayer.rakahs) return 'pray.aloud';
  return 'pray.aloudTwo';
}

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
  const { locale, t } = useLocale();

  /* The rows of the two pointer bands — the pages' own words, localised. */
  const band = (refs: readonly ContentRef[]) =>
    refs
      .map(resolveRef)
      .filter((entry) => entry !== undefined)
      .map((entry) => localiseCatalogEntry(entry, locale));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* "Every prayer" — the map's name since the /pray widening; the same
          name its reference-shelf row carries. */}
      <Stack.Screen options={{ title: t('learn.everyPrayer.title') }} />

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
            accessibilityLabel={`${prayer.title}. ${prayer.rakahs} ${t('count.rakahs')}, ${t(
              aloudKey(prayer),
            )}. ${prayer.sunnahBefore ?? 0} ${t('pray.before')}, ${prayer.sunnahAfter ?? 0} ${t('pray.after')}`}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{prayer.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {`${prayer.when} · ${t(aloudKey(prayer))}`}
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
        <SourceDisclosure sources={RAWATIB_SOURCES} />
      </View>

      {/*
        The prayers that arrive with the calendar and with a death. Before
        this band existed they lived only as reading on the Learn side, and
        the map claimed "every prayer" while missing the weekly one.
      */}
      <View style={styles.section}>
        <ThemedText type="sectionTitle">{t('pray.week')}</ThemedText>
        {band(WEEK_AND_YEAR).map((entry) => (
          <PressableLink
            key={entry.id}
            href={routeFor(entry)}
            accessibilityLabel={`${entry.title}. ${entry.shortDescription}`}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{entry.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {entry.shortDescription}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </PressableLink>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText type="sectionTitle">{t('pray.chosen')}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('pray.chosen.help')}
        </ThemedText>

        {/*
          These open the WHY, not the movements. For all of them the movements
          are the ones already prayed five times a day; what a reader does not
          have is why they would stand up. The generated guide is one tap
          further in, behind a button on the page this opens.

          The row is named for the prayer rather than for the page — somebody
          who heard "tahajjud" is looking for tahajjud, and cannot find it
          under "Praying at night".
        */}
        {VOLUNTARY_PRAYERS.map((prayer) => (
          <PressableLink
            key={prayer.id}
            href={{
              pathname: '/reference/[id]',
              params: { id: prayer.referenceId ?? prayer.id },
            }}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{prayer.listTitle ?? prayer.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {prayer.when}
              </ThemedText>
            </View>
            {/*
              A count promised a prayer script, and this row no longer opens
              one. The rakʿah count is said once in the section's help line
              instead of three times down the column.
            */}
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </PressableLink>
        ))}

      </View>

      {/* The exceptional cases, so the map admits they exist — pointer rows
          into pages that already cover them. */}
      <View style={styles.section}>
        <ThemedText type="sectionTitle">{t('pray.different')}</ThemedText>
        {band(DIFFERENT).map((entry) => (
          <PressableLink
            key={entry.id}
            href={routeFor(entry)}
            accessibilityLabel={`${entry.title}. ${entry.shortDescription}`}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{entry.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {entry.shortDescription}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </PressableLink>
        ))}
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
  /* A ruled entry, like every list in the app since the jadwal grammar. */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 64,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
