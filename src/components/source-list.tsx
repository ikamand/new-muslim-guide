import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

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
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.label}>
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
 * The same list, folded away until asked for.
 *
 * Deliberately not shown by default. Someone learning to pray is holding a
 * phone mid-motion and does not need a citation block between them and the
 * next instruction — but the person who wants to know whether the app is
 * making this up should never have to take its word for it. One quiet line
 * settles both.
 *
 * Renders nothing at all when there is nothing to show, so a screen can drop
 * it in unconditionally.
 */
export function SourceDisclosure({
  sources,
  /**
   * The caller's gap, for a layout where this ends a block. The component
   * carries no bottom margin of its own because three of the four screens
   * using it put it last on the screen, where a trailing margin is dead space.
   */
  style,
}: {
  sources: readonly Source[];
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  // Deduplicated by the line a reader would see: a step and the recitation
  // inside it often cite the same page, and printing it twice looks like an
  // error rather than like thoroughness.
  const distinct = [
    ...new Map(sources.map((source) => [formatSource(source), source])).values(),
  ];

  if (distinct.length === 0) return null;

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        style={({ pressed }) => [styles.toggle, { opacity: pressed ? 0.6 : 1 }]}
        accessibilityRole="button">
        <ThemedText type="small" themeColor="textSecondary">
          {t('note.sources')}
        </ThemedText>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={12}
          color={theme.textSecondary}
        />
      </Pressable>

      {open && (
        <View style={styles.block}>
          <SourceLines sources={distinct} showLabel={false} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    // Same reasoning as the note card: the row is small text, and the padding
    // is what makes the tap target reachable.
    paddingVertical: Spacing.two,
    paddingRight: Spacing.three,
  },
  block: {
    gap: Spacing.one,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    lineHeight: 16,
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
