import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { Frame, QuietRow, Rosette } from '@/components/jadwal';
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
import { formatSource, getReference, resolveNotes, resolveRef, type ReferenceSection, type Source } from '@/content';
import type { EvidenceText } from '@/content/evidence';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { routeFor } from '@/lib/content-routes';

import { Teaching } from '@/constants/teaching';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
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
  const theme = useTheme();
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

  /*
    The matn: the one section the content file marks `promote: 'hero'`,
    rendered FIRST inside the drawn frame with "The answer" over it — even
    when the file places it midway, because the answer leads and the
    commentary keeps the file's order below (the "Three Readings" design,
    Iyad, 2 Sep). This is the second attempt at making the hero legible as
    the page's answer: the first broke the margins and read as inconsistency
    rather than hierarchy (see constants/teaching.ts). This time the
    treatment carries its own label.

    A page that marks no hero gets no frame — the design never invents an
    answer. Its facts open the page bare and its questions thread directly,
    which is the shape those pages already are.
  */
  const heroIndex = reference.sections.findIndex((section) => section.promote === 'hero');
  const hero = heroIndex >= 0 ? reference.sections[heroIndex] : undefined;
  const rest =
    heroIndex >= 0
      ? reference.sections.filter((_, index) => index !== heroIndex)
      : reference.sections;

  const sectionDiffers = (section: ReferenceSection) =>
    resolveNotes(section.note, section.notes).some((entry) => entry.kind === 'differs');
  const pageDiffers = reference.sections.some(sectionDiffers);

  /*
    Which section prints which citation, decided once for the whole page —
    in RENDER order, so the matn claims its evidence first and a later
    section citing the same verse folds away, never the other way round.
  */
  const claimed = new Set<string>();
  const printableFor = (section: ReferenceSection) =>
    (section.sources ?? []).filter((entry) => {
      if (evidenceFor(entry) === undefined) return false;
      const key = formatSource(entry);
      if (claimed.has(key)) return false;
      claimed.add(key);
      return true;
    });

  return (
    <LessonScroll lessonKey={`reference:${reference.id}`} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: reference.title }} />

      <ThemedText
        type={Teaching.subtitle.type}
        themeColor={Teaching.subtitle.color}
        style={styles.subtitle}>
        {reference.subtitle}
      </ThemedText>

      {/*
        The two-inks legend, only where the page has red to explain: ink is
        settled, red is where Muslims genuinely differ. For a reader being
        told opposite things with equal confidence, seeing WHICH kind of
        thing they were told is the most protective line on the page.
      */}
      {pageDiffers && (
        <View style={[styles.legend, { borderBottomColor: theme.goldSoft }]}>
          <ThemedText type="caption" themeColor="textSecondary">
            {t('teach.legend.settled')}{' '}
            <ThemedText type="caption" themeColor="vermilion">
              {t('teach.legend.differs')}
            </ThemedText>
          </ThemedText>
        </View>
      )}

      {hero ? (
        <View style={styles.matnWrap}>
          <Frame>
            <ThemedText type="caption" themeColor="gold" style={styles.matnKicker}>
              {t('teach.answer')}
            </ThemedText>
            <Section section={hero} printable={printableFor(hero)} matn />
            {/* The vitals live inside the frame: answer, facts, and the
                one door, in a single box (the tahajjud stress test). */}
            {reference.quickFacts && (
              <TeachingFacts facts={reference.quickFacts} style={styles.matnFacts} />
            )}
          </Frame>
        </View>
      ) : (
        reference.quickFacts && <TeachingFacts facts={reference.quickFacts} />
      )}

      {/*
        The gloss: every other section on one thread, a rosette naming its
        place — the commentary around the matn, in the file's own order. A
        section holding a `differs` note announces itself in red before its
        heading; red marks disputed SECTIONS, never every sentence that
        mentions a school.
      */}
      {rest.length > 0 && (
        <View style={styles.glossList}>
          <View style={[styles.thread, { backgroundColor: theme.goldSoft }]} />
          {rest.map((section, index) => (
            <View key={section.id} style={styles.gloss}>
              <View style={[styles.glossDisc, { backgroundColor: theme.background }]}>
                <Rosette label={String(index + 1)} />
              </View>
              <View style={styles.glossBody}>
                {sectionDiffers(section) && (
                  <ThemedText type="caption" themeColor="vermilion" style={styles.differsKick}>
                    {t('teach.differs')}
                  </ThemedText>
                )}
                <Section section={section} printable={printableFor(section)} />
              </View>
            </View>
          ))}
        </View>
      )}

      <TranslationGap coverage={coverage} />

      {/*
        The doors: where this page's moment leads. `relatedContent` had been
        data read by nothing since it was written — the audit guarded its
        pointers while no screen rendered them. It exists for the pages whose
        subject has a next move the reader cannot know to look for: repentance
        and if-you-stopped each door to the prayer of repentance, because the
        moment of remorse is where that prayer is found, not a clock and not
        a shelf (docs/learn-redesign-plan.md, trigger-moment doors).
      */}
      {(source.meta?.relatedContent ?? [])
        .map(resolveRef)
        .filter((entry) => entry !== undefined)
        .map((entry) => (
          <QuietRow
            key={`${entry.kind}:${entry.id}`}
            href={routeFor(entry)}
            label={entry.title}
            accessibilityLabel={entry.title}
          />
        ))}

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
  matn = false,
}: {
  section: ReferenceSection;
  /** The citations THIS section prints — the page decides, not the section. */
  printable: readonly Source[];
  /**
   * Inside the frame the kicker "The answer" replaces the heading: the
   * question dissolves into the label, which is what the artifact showed
   * and Iyad approved. Everything else renders as everywhere.
   */
  matn?: boolean;
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
      {!matn && <TeachingHeading>{section.heading}</TeachingHeading>}
      <TeachingBody last={trailing === 'body'}>{section.body}</TeachingBody>

      {withText.map(({ source, text }, index) => {
        const isHero = index === 0 && section.promote === 'hero';
        const tooLong = text.arabic.length > LONG_NARRATION;
        /*
          Inside the matn frame only the hero text prints — the food page's
          answer cites THREE verses, and printing them all made the frame two
          screens tall, which is a wall wearing a frame. The others fold,
          named, one tap away.
        */
        const deepInSection = index >= (matn ? 1 : 2);

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
  /* The legend hangs from the subtitle's air; its rule closes the head. */
  legend: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: Spacing.two,
    marginBottom: Teaching.page.sectionGap,
  },
  matnWrap: {
    marginBottom: Teaching.page.sectionGap,
  },
  matnKicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.two,
  },
  /* Inside the frame the facts end the box; the frame owns the air below. */
  matnFacts: {
    marginBottom: 0,
  },
  glossList: {
    position: 'relative',
  },
  /* Behind the rosettes' paper discs, from the first to the last. */
  thread: {
    position: 'absolute',
    left: 12.5,
    top: 14,
    bottom: Teaching.page.sectionGap + 8,
    width: 1,
  },
  gloss: {
    flexDirection: 'row',
    gap: Spacing.three - 4,
  },
  glossDisc: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glossBody: {
    flex: 1,
    minWidth: 0,
  },
  differsKick: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.one,
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
