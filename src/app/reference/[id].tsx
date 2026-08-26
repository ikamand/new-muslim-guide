import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ContentNoteCard } from '@/components/content-note';
import { RecitationCard } from '@/components/recitation-card';
import { SourceDisclosure, evidenceFor } from '@/components/source-list';
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
import { formatSource, getReference, resolveNotes, type ReferenceSection } from '@/content';
import { MaxContentWidth } from '@/constants/theme';
import { Teaching } from '@/constants/teaching';
import { useLocale } from '@/hooks/use-locale';
import { localiseReference, measure } from '@/i18n/localise';

/**
 * A reference topic, read top to bottom.
 *
 * No stepper and no progress bar. Someone here has a question, not a procedure
 * to follow, and making them tap through seven screens to find the one line
 * they came for would be the wrong shape entirely.
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
  const { locale } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const source = getReference(id);

  if (!source) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: '' }} />
        <ThemedText type="default" themeColor="textSecondary">
          That page has moved.
        </ThemedText>
      </View>
    );
  }

  const [reference, coverage] = measure(() => localiseReference(source, locale));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: reference.title }} />

      <ThemedText
        type={Teaching.subtitle.type}
        themeColor={Teaching.subtitle.color}
        style={styles.subtitle}>
        {reference.subtitle}
      </ThemedText>

      {reference.quickFacts && <TeachingFacts facts={reference.quickFacts} />}

      {reference.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}

      <TranslationGap coverage={coverage} />
    </ScrollView>
  );
}

/**
 * One section: a question, its answer, and — where the section earns it — the
 * narration itself rather than a reference to it.
 */
function Section({ section }: { section: ReferenceSection }) {
  const sources = section.sources ?? [];

  /*
    A promoted citation is printed on the page, so it leaves the drawer. The
    drawer's job is the reference line for everything the page did not print;
    saying the same narration twice on one screen would be worse than the
    burial this fixes.
  */
  const promoted = section.promote ? sources.find((entry) => evidenceFor(entry)) : undefined;
  const promotedText = promoted ? evidenceFor(promoted) : undefined;
  const remaining = promoted ? sources.filter((entry) => entry !== promoted) : sources;

  const notes = resolveNotes(section.note, section.notes);
  const bullets = section.bullets ?? [];
  const bodyIsLast = bullets.length === 0 && !promotedText && !section.says && notes.length === 0;

  return (
    <View>
      <TeachingHeading>{section.heading}</TeachingHeading>
      <TeachingBody last={bodyIsLast}>{section.body}</TeachingBody>

      {promotedText && promoted ? (
        <TeachingSource
          variant={section.promote ?? 'supporting'}
          arabic={promotedText.arabic}
          translation={promotedText.translation}
          reference={formatSource(promoted)}
        />
      ) : null}

      {bullets.map((text, index) => (
        <TeachingBullet key={text} last={index === bullets.length - 1 && notes.length === 0}>
          <TeachingBulletText text={text} />
        </TeachingBullet>
      ))}

      {section.says && <RecitationCard recitation={section.says} />}

      {notes.map((entry, position) =>
        entry.kind === 'practical' ? (
          <TeachingAside key={`${entry.kind}-${position}`}>{entry.text}</TeachingAside>
        ) : (
          <ContentNoteCard key={`${entry.kind}-${position}`} entry={entry} />
        ),
      )}

      <SourceDisclosure sources={remaining} />
    </View>
  );
}

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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Teaching.page.paddingV,
  },
});
