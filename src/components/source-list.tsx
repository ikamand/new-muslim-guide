import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { formatSource, type Source } from '@/content';
import { HADITH_TEXT, QURAN_TEXT, type EvidenceText } from '@/content/evidence';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/** The verse a `QuranSource` addresses, keyed the way `evidence.ts` stores it. */
function quranText(source: Extract<Source, { kind: 'quran' }>): EvidenceText | undefined {
  const first = Array.isArray(source.ayah) ? source.ayah[0] : source.ayah;
  const last = Array.isArray(source.ayah) ? source.ayah[1] : source.ayah;
  return QURAN_TEXT[`${source.surah}:${first}${last !== first ? `-${last}` : ''}`];
}

/** The narration a `HadithSource` addresses, keyed the way `evidence.ts` stores it. */
function hadithText(source: Extract<Source, { kind: 'hadith' }>): EvidenceText | undefined {
  const key = source.reference
    ? `${source.collection}:${source.reference}`
    : source.hadeethEncId
      ? `${source.collection}:he${source.hadeethEncId}`
      : undefined;
  return key ? HADITH_TEXT[key] : undefined;
}

/** The text behind any citation the app can show one for. */
export function evidenceFor(source: Source): EvidenceText | undefined {
  if (source.kind === 'quran') return quranText(source);
  if (source.kind === 'hadith') return hadithText(source);
  return undefined;
}

/**
 * Where a claim comes from, as a reader sees it.
 *
 * The app has carried structured provenance on its content for a while and
 * showed almost none of it: a `ContentNote` rendered its sources, and a step,
 * a reference section and a duʿa — which is where most of the citations
 * actually live — rendered none. So the grading on a narration existed in the
 * data, was checked against the collection page, and then reached nobody.
 *
 * `formatSource` already prints the grading and who gave it, and it is the
 * same function the audit script prints. One formatter, one wording, three
 * places: this component, the note card, and the terminal.
 *
 * What it does NOT print any more is the publisher. That is Settings →
 * Sources; see `content/text-sources.ts` for why it moved.
 *
 * Citations render as text rather than links, for the reason `content-note.tsx`
 * gives: nothing in this app has ever sent anyone off-device, and making a
 * citation tappable would be the first thing that does.
 */
export function SourceLines({
  sources,
  /**
   * Off where whatever opened this list already said the words. The
   * disclosure's own row reads "Where this comes from"; repeating it as a
   * heading underneath printed the same sentence twice, once in capitals.
   */
  showLabel = true,
}: {
  sources: readonly Source[];
  showLabel?: boolean;
}) {
  const { t } = useLocale();

  return (
    <View style={styles.block}>
      {showLabel && (
        <ThemedText type="caption" themeColor="textSecondary" style={styles.label}>
          {t('note.sources')}
        </ThemedText>
      )}
      {sources.map((source) => {
        const text = evidenceFor(source);

        return (
          <View key={formatSource(source)} style={styles.entry}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.source}>
              {formatSource(source)}
            </ThemedText>
            {/*
              The verse or the narration itself, where the app has it. A
              citation this app never links out of — deliberately, see above —
              is otherwise a dead end: a beginner can neither read "Sahih
              al-Bukhari 159" nor follow it, so it was provenance for a
              reviewer and nothing at all for the reader.
            */}
            {text && (
              <EvidenceBlock
                text={text}
                hideGrade={source.kind === 'hadith' && Boolean(source.grading)}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

/**
 * The one thing `attribution` says that the citation line above does not.
 *
 * Most of its values duplicate the reference — "Narrated by Al-Bukhāri" under
 * a line already reading "Sahih al-Bukhari 6018". One does not: *agreed upon*,
 * muttafaq ʿalayh, meaning both Bukhari and Muslim narrated it, which is the
 * highest tier of authentication there is and something a citation to either
 * one alone cannot carry. Twenty-five texts say it, in two different wordings,
 * and they are printed in one.
 */
function agreedUpon(text: EvidenceText): boolean {
  const attribution = text.attribution ?? '';
  return /^agreed upon$/i.test(attribution) || /bukhari\s*&\s*muslim/i.test(attribution);
}

/**
 * A published text, quoted. Never edited — see HadeethEnc's terms.
 *
 * It used to close with the publisher: "HadeethEnc.com · Darussalam (via
 * fawazahmed0/hadith-api)". That is build plumbing, and on a teaching screen
 * it read as though the app were citing a website as its authority for a
 * hadith. The obligation it discharged now lives on one page that names every
 * publisher at once — see `content/text-sources.ts` and `app/sources.tsx`.
 *
 * The grading stays. It is substance, not provenance, and it is not always
 * redundant: 73 of the 116 narrations carry a grading from the publisher where
 * only 46 citations record one of their own, so dropping this line would lose
 * the grading on every text in the gap between those two numbers.
 */
function EvidenceBlock({
  text,
  /**
   * Off where the citation line above already prints a grading. `formatSource`
   * renders "Sunan Abi Dawud 101 (sahih — Al-Albani)", so repeating "Sahih
   * (Al-Albani)" underneath it read like the app could not keep track of what
   * it had already said.
   */
  hideGrade = false,
}: {
  text: EvidenceText;
  hideGrade?: boolean;
}) {
  const theme = useTheme();
  const { translation: showTranslation } = useSettings();
  const footnote = [
    agreedUpon(text) ? 'Agreed upon' : undefined,
    hideGrade ? undefined : text.grade,
  ].filter(Boolean);

  return (
    <View style={[styles.evidence, { borderLeftColor: theme.border }]}>
      <ThemedText type="arabicQuote" style={styles.evidenceArabic}>{text.arabic}</ThemedText>
      {showTranslation && text.translation && (
        <ThemedText type="small" themeColor="textSecondary">
          {text.translation}
        </ThemedText>
      )}
      {footnote.length > 0 && (
        <ThemedText type="caption" themeColor="textSecondary">
          {footnote.join(' · ')}
        </ThemedText>
      )}
    </View>
  );
}

/**
 * One quiet line of names, and the sheet behind it.
 *
 * The single grammar for every citation on a learning screen, decided by
 * Iyad on 3 Sep after the two-fold confusion: the collection and number
 * stay visible on the page — the lesson of the drawer that hid eighteen
 * wrong narrations — and the texts wait behind ONE tap, in a sheet.
 *
 * A sheet and not an inline unfold, because the page must never move under
 * the reader's finger (the tier-accordion lesson), and because a modal is
 * this app's grammar for a detour that returns you — the reciter and Ask
 * both say so. Inside, `SourceLines` renders every citation exactly as the
 * note cards always have: the name, the text where the app holds one, the
 * grading. Publishers stay on Settings → Sources.
 *
 * Renders nothing at all when there is nothing to show, so a screen can
 * drop it in unconditionally.
 */
export function EvidenceLine({
  sources,
  style,
}: {
  sources: readonly Source[];
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  // Deduplicated by the line a reader would see: a step and the recitation
  // inside it often cite the same page.
  const distinct = [
    ...new Map(sources.map((source) => [formatSource(source), source])).values(),
  ];

  if (distinct.length === 0) return null;

  /*
    Short names for the line: the grading parenthetical belongs in the
    sheet, a scholarly work's full title would wrap the line to four, and a
    `general` source has no name at all — it is reasoning, and it shows
    inside the sheet only.
  */
  const names = distinct
    .map((source) => {
      if (source.kind === 'general') return undefined;
      if (source.kind === 'scholarly') return source.author ?? source.work;
      return formatSource(source).replace(/\s*\(.*\)$/, '');
    })
    .filter((name): name is string => Boolean(name));
  const label = names.length > 0 ? names.join(' · ') : t('note.sources');

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${t('note.sources')}. ${label}`}
        style={({ pressed }) => [styles.line, { opacity: pressed ? 0.6 : 1 }, style]}>
        <View style={[styles.lineDash, { backgroundColor: theme.accent }]} />
        <ThemedText type="caption" themeColor="accent" style={styles.lineNames} numberOfLines={2}>
          {label.toUpperCase()}
        </ThemedText>
        <Ionicons name="chevron-forward" size={12} color={theme.accent} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}>
        <View style={styles.sheetRoot}>
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: theme.scrim }]}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel={t('windows.close')}
          />
          <View
            style={[
              styles.sheet,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <View style={[styles.grabber, { backgroundColor: theme.border }]} />
            <ThemedText type="caption" themeColor="gold" style={styles.sheetTitle}>
              {t('note.sources')}
            </ThemedText>
            <ScrollView contentContainerStyle={styles.sheetScroll}>
              <SourceLines sources={distinct} showLabel={false} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    /* Small text; the padding is what makes the tap target reachable. */
    paddingVertical: Spacing.two,
    paddingRight: Spacing.three,
  },
  lineDash: {
    width: 16,
    height: 1,
    opacity: 0.7,
  },
  lineNames: {
    flexShrink: 1,
    letterSpacing: 0.4,
  },
  sheetRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.medium,
    borderTopRightRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    maxHeight: '80%',
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.two,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  sheetTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingVertical: Spacing.two,
  },
  sheetScroll: {
    paddingBottom: Spacing.four,
  },
  block: {
    gap: Spacing.one,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  source: {
    fontVariant: ['tabular-nums'],
  },
  entry: {
    gap: Spacing.one,
  },
  /** Quoted text, set apart from the citation that names it. */
  evidence: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    borderRadius: Radius.small,
  },
  evidenceArabic: {
    /* size and face: the `arabicQuote` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
