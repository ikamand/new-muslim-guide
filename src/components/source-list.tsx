import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

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
 * Who published the words above.
 *
 * A licence obligation, not a nicety: HadeethEnc's terms ask for *"clearly
 * referring to the publisher and the source"*, and this app carried their text
 * for a while without naming them anywhere on screen.
 *
 * The two fields usually agree. Where they differ it is worth showing both —
 * one publisher supplied the Arabic and another the translation, which is the
 * whole point of the cascade. Where one already names the other, as
 * "Darussalam (via fawazahmed0/hadith-api)" does, printing both would say the
 * same name twice.
 */
function creditFor(text: EvidenceText): string {
  const { arabicFrom, translationFrom } = text;
  if (!translationFrom || translationFrom === arabicFrom) return arabicFrom;
  if (translationFrom.includes(arabicFrom)) return translationFrom;
  return `${arabicFrom} · ${translationFrom}`;
}

/** A published text, quoted. Never edited — see HadeethEnc's terms. */
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
  const footnote = [text.attribution, hideGrade ? undefined : text.grade].filter(Boolean);

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
      <ThemedText type="caption" themeColor="textSecondary">
        {creditFor(text)}
      </ThemedText>
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
export function SourceDisclosure({ sources }: { sources: readonly Source[] }) {
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
    <View style={styles.wrapper}>
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
