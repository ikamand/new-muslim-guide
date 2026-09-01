import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Glyph, type GlyphName } from '@/components/illustrations';
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

/**
 * The sunnah as a sentence: "2 before", "2 + 2 before, 2 after", or the word
 * "none" — which is Asr's whole lesson, said instead of drawn as dashes.
 * `sunnahBeforeUnits` is why Dhuhr reads "2 + 2" and nobody prays four in
 * one go, the fact the old footnote buried.
 */
function sunnahPhrase(
  prayer: {
    sunnahBefore?: number;
    sunnahAfter?: number;
    sunnahBeforeUnits?: readonly number[];
  },
  t: (key: UIKey) => string,
): string {
  const parts: string[] = [];
  if (prayer.sunnahBefore) {
    parts.push(
      `${(prayer.sunnahBeforeUnits ?? [prayer.sunnahBefore]).join(' + ')} ${t('pray.before')}`,
    );
  }
  if (prayer.sunnahAfter) parts.push(`${prayer.sunnahAfter} ${t('pray.after')}`);
  return parts.length ? parts.join(', ') : t('pray.none');
}

/**
 * One glossary term: the word bold in ink, its meaning quiet. The string is
 * 'Term = meaning' in one piece so a translation cannot orphan the halves;
 * the split here is on our own ' = '.
 */
function LegendTerm({ text }: { text: string }) {
  const [term, meaning] = text.split(' = ');
  return (
    <ThemedText type="small" themeColor="textSecondary">
      <ThemedText type="smallBold">{term}</ThemedText>
      {` = ${meaning}`}
    </ThemedText>
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

      {/*
        The two words the whole screen turns on, keyed by colour: the dot
        beside "Obligatory" is the lapis the big count wears, the dot beside
        "Sunnah" is the gold its label wears. From Iyad's tiled mock — the
        legend that says what the colours mean instead of assuming.
      */}
      <View style={[styles.legend, { borderBottomColor: theme.gold }]}>
        {/* Each dot and its term wrap as ONE unit — a dot orphaned at a line
            end keys nothing. */}
        <View style={styles.legendItem}>
          <View style={[styles.keyDot, { backgroundColor: theme.accent }]} />
          <LegendTerm text={t('pray.legend.obligatory')} />
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.keyDot, { backgroundColor: theme.gold }]} />
          <LegendTerm text={t('pray.legend.sunnah')} />
        </View>
      </View>

      {/*
        The redesign of 1 Sep 2026, Iyad's brief: the obligatory count is the
        ONE big thing, the sunnah a quiet sentence, and "owed" is retired for
        "obligatory". The before/owed/after column grid confused the person it
        was for; what it taught survives better here — the five counts still
        line up down the right edge (2 · 4 · 4 · 3 · 4), and Asr finally says
        "none" in a word instead of two dashes. The day-mark in the margin is
        the time of day drawn, for the reader who does not yet feel the shape
        of the day. Zero-gap rows: a rule and the next box touch.
      */}
      <View>
        {DAILY_PRAYERS.map((prayer) => (
          <PressableLink
            key={prayer.id}
            href={{ pathname: '/guide/[id]', params: { id: prayer.id } }}
            accessibilityLabel={`${prayer.title}. ${prayer.when}. ${prayer.rakahs} ${t(
              'pray.fard',
            )} ${t('count.rakahs')}. ${t('pray.sunnah')}: ${sunnahPhrase(prayer, t)}. ${t(
              aloudKey(prayer),
            )}`}
            style={[styles.prayerRow, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowGlyph}>
              {/* The five fard ids are GlyphName members; the spec type is wider. */}
              <Glyph name={prayer.id as GlyphName} color={theme.gold} size={26} />
            </View>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{prayer.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {prayer.when}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.sunnahLine}>
                <ThemedText type="smallBold">{t('pray.sunnah')}</ThemedText>
                {` · ${sunnahPhrase(prayer, t)}`}
              </ThemedText>
              <ThemedText type="caption" themeColor="gold">
                {t(aloudKey(prayer))}
              </ThemedText>
            </View>
            <View style={styles.fard}>
              <ThemedText type="subtitle" themeColor="accent" style={styles.fardNumber}>
                {prayer.rakahs}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.fardCaption}>
                {`${t('pray.fard')} ${t('count.rakahs')}`}
              </ThemedText>
            </View>
          </PressableLink>
        ))}

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
        <View>
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
        <View>
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
      </View>

      {/* The exceptional cases, so the map admits they exist — pointer rows
          into pages that already cover them. */}
      <View style={styles.section}>
        <ThemedText type="sectionTitle">{t('pray.different')}</ThemedText>
        <View>
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
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: Spacing.four,
    rowGap: Spacing.one,
    paddingBottom: Spacing.two,
    borderBottomWidth: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  keyDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  /* Top-aligned, unlike the pointer rows: the mark and the count sit with
     the prayer's NAME, not floating in the middle of four lines. */
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowGlyph: {
    paddingTop: Spacing.half,
  },
  sunnahLine: {
    paddingTop: Spacing.one,
  },
  fard: {
    width: 76,
    alignItems: 'center',
  },
  fardNumber: {
    fontVariant: ['tabular-nums'],
  },
  fardCaption: {
    textAlign: 'center',
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
