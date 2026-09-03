import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { Frame, QuietRow, Rosette } from '@/components/jadwal';
import { LessonEnd } from '@/components/lesson-end';
import { LessonScroll } from '@/components/lesson-scroll';
import { RecitationCard } from '@/components/recitation-card';
import { EvidenceLine, evidenceFor } from '@/components/source-list';
import {
  TeachingAside,
  TeachingBody,
  TeachingBullet,
  TeachingBulletText,
  TeachingFacts,
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
    rendered FIRST inside the drawn frame — even when the file places it
    midway, because the answer leads and the commentary keeps the file's
    order below (the "Three Readings" design, Iyad, 2 Sep). This is the
    second attempt at making the hero legible as the page's answer: the
    first broke the margins and read as inconsistency rather than hierarchy
    (see constants/teaching.ts).

    The frame carries the section's own question as its heading, like every
    other section. It briefly carried a label, "The answer", in the
    heading's place instead (2 Sep), and that hid the question the body was
    written to answer: the Friday page opened with "No." and nothing above
    it to say no to (Iyad, 3 Sep). Seventeen of the forty-two heroes read
    that way. The frame alone says which section is the answer.

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
            <Section section={hero} matn />
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
                <Section section={section} />
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
  matn = false,
}: {
  section: ReferenceSection;
  /**
   * Inside the frame the section prints its hero text in full; that is the
   * only thing `matn` changes. The heading renders as everywhere — see the
   * note on the frame above for the label that briefly replaced it.
   */
  matn?: boolean;
}) {
  const sources = section.sources ?? [];

  /*
    One grammar for every citation, Iyad's rule (3 Sep): the matn prints its
    hero text because the framed answer IS the page; every other citation —
    on every section, matn included — is a name in one quiet line, and the
    sheet behind it holds the texts. The folded cards and the "Where this
    comes from" toggle both died into it; a page's evidence footprint is now
    exactly one line per section.
  */
  const heroEntry = matn
    ? sources
        .map((source) => ({ source, text: evidenceFor(source) }))
        .find((entry): entry is { source: Source; text: EvidenceText } => entry.text !== undefined)
    : undefined;
  const lineSources = heroEntry
    ? sources.filter((source) => source !== heroEntry.source)
    : sources;

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
    lineSources.length > 0
      ? 'line'
      : notes.length > 0
        ? 'notes'
        : section.says
          ? 'says'
          : bullets.length > 0
            ? 'bullets'
            : heroEntry
              ? 'texts'
              : 'body';

  return (
    <View>
      <TeachingHeading>{section.heading}</TeachingHeading>
      <TeachingBody last={trailing === 'body'}>{section.body}</TeachingBody>

      {heroEntry && (
        <TeachingSource
          variant="hero"
          arabic={heroEntry.text.arabic}
          translation={heroEntry.text.translation}
          reference={formatSource(heroEntry.source)}
        />
      )}

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

      <EvidenceLine
        sources={lineSources}
        style={trailing === 'line' ? styles.endsSection : undefined}
      />
    </View>
  );
}

/** The block that ends a section, and so owes the gap to the next heading. */
type Trailing = 'body' | 'texts' | 'bullets' | 'says' | 'notes' | 'line';

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
