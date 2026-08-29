import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { LessonEnd } from '@/components/lesson-end';
import { LessonScroll } from '@/components/lesson-scroll';
import { RecitationCard } from '@/components/recitation-card';
import { SourceDisclosure, evidenceFor } from '@/components/source-list';
import {
  TeachingAside,
  TeachingBody,
  TeachingBullet,
  TeachingBulletText,
  TeachingFacts,
  TeachingFoldedSource,
  TeachingHeading,
  TeachingSource,
} from '@/components/teaching';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { formatSource, getReference, resolveNotes, type ReferenceSection, type Source } from '@/content';
import type { EvidenceText } from '@/content/evidence';
import { MaxContentWidth } from '@/constants/theme';

import { Teaching } from '@/constants/teaching';
import { useLocale } from '@/hooks/use-locale';
import { localiseReference, measure } from '@/i18n/localise';
/**
 * A reference topic, read top to bottom.
 *
 * No stepper. Someone here has a question, not a procedure to follow, and
 * making them tap through seven screens to find the one line they came for
 * would be the wrong shape entirely. The thin bar at the top is scroll
 * progress, not steps — added 29 Aug at Iyad's ask, because a long article
 * gives no sense of how much is left — and reaching the end is what marks
 * the lesson read. Both live in `LessonScroll`.
 *
 * ## Why there are no cards any more
 *
 * Every section used to sit in a bordered box. On a 390px phone that put 96px
 * of the screen into padding — the card's 24 inside the page's 24, doubled —
 * leaving a 294px column, about 37 characters a line against an optimal 45 to
 * 75. Every paragraph was forced narrower than is comfortable to read, which
 * is why the pages felt cramped and scrolled forever.
 *
 * Dropping the boxes and the outer padding together gives 350px and ~44
 * characters. Sections are separated by space and by the accent colour on
 * their headings, which is cheaper than a border and reads faster.
 *
 * ## Where the look lives
 *
 * `constants/teaching.ts`, and only there. This screen composes components and
 * writes no numbers of its own — so changing how every teaching page in the
 * app looks is one file.
 */
export default function ReferenceScreen() {
  const { locale, t } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  /* Above the early return below: hooks cannot be called conditionally. */
  const source = getReference(id);

  if (!source) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: '' }} />
        <ThemedText type="default" themeColor="textSecondary">
          {t('reference.missing')}
        </ThemedText>
      </View>
    );
  }

  const [reference, coverage] = measure(() => localiseReference(source, locale));

  return (
    <LessonScroll lessonKey={`reference:${reference.id}`} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: reference.title }} />

      <ThemedText
        type={Teaching.subtitle.type}
        themeColor={Teaching.subtitle.color}
        style={styles.subtitle}>
        {reference.subtitle}
      </ThemedText>

      {reference.quickFacts && <TeachingFacts facts={reference.quickFacts} />}

      {/*
        Which section prints which citation, decided once for the whole page.

        A page states its evidence once. Ten citations were being printed twice
        on the same page — Al-Fatihah's own surah under two headings, Bukhari
        3293 under both "What is istikhara?" and "What do I say?" — because a
        section cannot see what its siblings already printed, and several
        sections legitimately cite the same verse.

        The FIRST section to cite something prints it. Later sections carrying
        the same citation show nothing, because the reader has already read it
        further up the same screen.
      */}
      {(() => {
        const claimed = new Set<string>();
        return reference.sections.map((section) => {
          const mine = (section.sources ?? []).filter((source) => {
            if (evidenceFor(source) === undefined) return false;
            const id = formatSource(source);
            if (claimed.has(id)) return false;
            claimed.add(id);
            return true;
          });
          return <Section key={section.id} section={section} printable={mine} />;
        });
      })()}

      <TranslationGap coverage={coverage} />

      <LessonEnd lessonKey={`reference:${reference.id}`} />
    </LessonScroll>
  );
}

/**
 * One section: a question, its answer, and — where the section earns it — the
 * narration itself rather than a reference to it.
 */
function Section({
  section,
  printable,
}: {
  section: ReferenceSection;
  /** The citations THIS section prints — the page decides, not the section. */
  printable: readonly Source[];
}) {
  const sources = section.sources ?? [];

  /*
    Every citation that HAS a text goes on the page. The drawer keeps only the
    ones that have none — scholarly opinions and plain reasoning.

    The app carried 125 verses and narrations and printed 48 of them. The other
    77 sat inside a collapsed "Where this comes from" beneath prose that
    paraphrased them, which is how eighteen Sahih Muslim citations rendered
    entirely unrelated narrations for months without anyone seeing.

    Weight is decided here rather than in the content, because it depends on
    the length of a text nobody typed and on how many a section ended up with:

      hero    the page's answer, breaking the margins. One per page, and the
              only one the content file chooses.
      quote   the default. Printed in full, under the paragraph it supports.
      folded  a very long narration, or the third in one section. Named on the
              page and opened with a tap, so Ramadan's twelve texts do not
              become a wall of Arabic nobody reads.
  */
  const withText = printable
    .map((source) => ({ source, text: evidenceFor(source) }))
    .filter((entry): entry is { source: Source; text: EvidenceText } => entry.text !== undefined);
  const withoutText = sources.filter((source) => evidenceFor(source) === undefined);

  const notes = resolveNotes(section.note, section.notes);
  const bullets = section.bullets ?? [];

  /*
    Which block ends the section, and so carries the gap to the next heading.

    Every block used to decide that for itself from a partial view. The body
    checked four of the six things that can follow it and the bullets checked
    one, so neither knew the disclosure existed. A section whose only trailing
    block was "Where this comes from" therefore gave the FULL 30px gap to the
    body above it and rendered the disclosure below that gap, leaving 8px of
    toggle padding between it and the next heading: 30 from the section it
    belongs to, 8 from the section it does not. It read as a label on the
    heading underneath.

    Computed once here, in render order, and read by every block.
  */
  const trailing: Trailing =
    withoutText.length > 0
      ? 'sources'
      : notes.length > 0
        ? 'notes'
        : section.says
          ? 'says'
          : bullets.length > 0
            ? 'bullets'
            : withText.length > 0
              ? 'texts'
              : 'body';

  return (
    <View>
      <TeachingHeading>{section.heading}</TeachingHeading>
      <TeachingBody last={trailing === 'body'}>{section.body}</TeachingBody>

      {withText.map(({ source, text }, index) => {
        const isHero = index === 0 && section.promote === 'hero';
        const tooLong = text.arabic.length > LONG_NARRATION;
        const deepInSection = index >= 2;

        if (!isHero && (tooLong || deepInSection)) {
          return (
            <TeachingFoldedSource
              key={formatSource(source)}
              arabic={text.arabic}
              translation={text.translation}
              reference={formatSource(source)}
              label={source.kind === 'quran' ? 'Read the verse' : 'Read the narration'}
            />
          );
        }

        return (
          <TeachingSource
            key={formatSource(source)}
            variant={isHero ? 'hero' : 'quote'}
            arabic={text.arabic}
            translation={text.translation}
            reference={formatSource(source)}
          />
        );
      })}

      {bullets.map((text, index) => (
        <TeachingBullet key={text} last={index === bullets.length - 1 && trailing === 'bullets'}>
          <TeachingBulletText text={text} />
        </TeachingBullet>
      ))}

      {section.says && (
        <View style={trailing === 'says' && styles.endsSection}>
          <RecitationCard recitation={section.says} />
        </View>
      )}

      {notes.map((entry, position) =>
        entry.kind === 'practical' ? (
          // Owns its own gap, so wrapping it as below would double to 60.
          <TeachingAside
            key={`${entry.kind}-${position}`}
            last={position === notes.length - 1 && trailing === 'notes'}>
            {entry.text}
          </TeachingAside>
        ) : (
          <View
            key={`${entry.kind}-${position}`}
            style={
              position === notes.length - 1 && trailing === 'notes' && styles.endsSection
            }>
            <ContentNoteCard entry={entry} />
          </View>
        ),
      )}

      {/*
        What is left: citations the app can show no text for. A scholarly
        opinion is a reference to a book, not a quotation, and printing an
        empty block for one would be worse than the line that names it.
      */}
      <SourceDisclosure
        sources={withoutText}
        style={trailing === 'sources' ? styles.endsSection : undefined}
      />
    </View>
  );
}

/** The block that ends a section, and so owes the gap to the next heading. */
type Trailing = 'body' | 'texts' | 'bullets' | 'says' | 'notes' | 'sources';

/**
 * Past this, an inset block stops being an answer and becomes a
 * wall. Al-Fatihah's seven verses run 596 characters; one narration in the app
 * runs 2,615.
 */
const LONG_NARRATION = 700;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Teaching.page.paddingH,
    paddingTop: Teaching.page.paddingV,
    paddingBottom: Teaching.page.paddingV * 2,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  subtitle: {
    marginBottom: Teaching.page.sectionGap,
  },
  /** For the blocks that carry no bottom margin of their own. */
  endsSection: {
    marginBottom: Teaching.page.sectionGap,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Teaching.page.paddingV,
  },
});
