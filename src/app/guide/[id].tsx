import { useKeepAwake } from 'expo-keep-awake';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PostureFigure, RakahProgress } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { RecitationCard } from '@/components/recitation-card';
import { ContentNoteCard } from '@/components/content-note';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { getGuide, resolveNotes, type Posture } from '@/content';
import { getSurah, type Ayah } from '@/content/quran/surahs';
import { localiseGuide, measure } from '@/i18n/localise';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import type { UIKey } from '@/i18n/ui';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The name of a position, for a screen reader.
 *
 * It used to be what everyone saw — printed in a pill, in English, on every
 * step, in an app that translates everything else. It is now the accessible
 * name of `PostureFigure`, which is the job it was always better suited to:
 * sighted readers get the shape, and a reader who cannot see it gets the word.
 */
const POSTURE_KEY: Record<Posture, UIKey> = {
  standing: 'posture.standing',
  takbir: 'posture.takbir',
  bowing: 'posture.bowing',
  rising: 'posture.rising',
  prostrating: 'posture.prostrating',
  sitting: 'posture.sitting',
  tashahhud: 'posture.tashahhud',
  'taslim-right': 'posture.taslim-right',
  'taslim-left': 'posture.taslim-left',
  washing: 'posture.washing',
};

/**
 * Holds the screen on while it is mounted.
 *
 * A component rather than a call, because the hook cannot be conditional and
 * the setting can. Rendering or not rendering this is how the switch works.
 */
function ScreenAwake() {
  useKeepAwake();
  return null;
}

export default function GuideScreen() {
  const { id, step: wanted } = useLocalSearchParams<{ id: string; step?: string }>();
  const router = useRouter();
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const source = getGuide(id);
  /*
    Search hands over a step id, so a result opens AT its answer instead of at
    step one. By id rather than by number: a step's position shifts whenever
    one is inserted above it, and a stale link would then land somewhere
    plausible and wrong. An id that no longer exists falls back to the start.

    Lazy, so it seeds the first render only — paging on from here is ordinary
    state, and the parameter does not drag the reader back.
  */
  const [index, setIndex] = useState(() => {
    if (!wanted || !source) return 0;
    const at = source.steps.findIndex((candidate) => candidate.id === wanted);
    return at === -1 ? 0 : at;
  });

  const { locale, t } = useLocale();
  const { keepAwake, completedLessons, toggleLesson } = useSettings();
  const { finish: observed } = useObservations();
  // Measured, not just translated. A guide is read one step per screen, so the
  // reading is taken over the whole guide and narrowed to the step below —
  // localising per step instead would re-run `localiseRecitation` on every
  // render of every step.
  const [guide, coverage] = measure(() =>
    source ? localiseGuide(source, locale) : undefined,
  );

  if (!guide) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText type="default">{t('guide.missing')}</ThemedText>
      </View>
    );
  }

  const step = guide.steps[index];
  /** 0 for anything without rakʿahs — wudu, ghusl, the shahada. */
  const totalRakahs = guide.steps.reduce((most, s) => Math.max(most, s.rakah ?? 0), 0);
  const isFirst = index === 0;
  const isLast = index === guide.steps.length - 1;
  const progress = (index + 1) / guide.steps.length;

  const go = (next: number) => {
    setIndex(next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  /**
   * The end of a guide.
   *
   * Two things were wrong here, and the second is the one that mattered.
   *
   * `router.back()` alone did nothing at all when there was nothing to go back
   * to — opening a guide from a link, or as the first screen of a session —
   * so Finish left somebody stranded on the last step of the prayer with a
   * button that did not respond. `canGoBack` decides, and Today is the honest
   * fallback: it is where the app starts.
   *
   * And finishing a guide did not mark it finished. Somebody could pray all
   * twenty-three steps of Fajr, tap Finish, and the journey would still be
   * waiting for them to go and tick a box in `/journey` — so the carry-on card
   * offered the lesson they had just done. Completing the thing IS the
   * completion, and `toggleLesson` is guarded rather than toggled, because a
   * second run through a prayer should not un-finish it.
   */
  const finish = () => {
    const key = `guide:${guide.id}`;
    if (!completedLessons.includes(key)) toggleLesson(key);
    /*
      `completedLessons` says THAT it is done; this says WHEN, and keeps
      saying it on a second run through. Phase 7 needs the second one —
      "has prayed for a month" is a question about dates, and a set of keys
      cannot answer it.
    */
    observed(key);
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: guide.title }} />
      {keepAwake && <ScreenAwake />}

      {/*
        Only a guide with no rakʿahs keeps a bar. Wudu is ten steps in a row
        and "step 4 of 10" is the honest answer; a prayer is not, and answering
        the wrong question there is what the arches replace.
      */}
      {!totalRakahs && (
        <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: theme.accent }]}
          />
        </View>
      )}

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <View style={styles.meta}>
          {totalRakahs && step.rakah ? (
            <View
              style={styles.rakahRow}
              accessible
              accessibilityLabel={t('guide.rakahOf')
                .replace('{n}', String(step.rakah))
                .replace('{total}', String(totalRakahs))}>
              <RakahProgress
                current={step.rakah}
                total={totalRakahs}
                color={theme.accent}
                trackColor={theme.border}
              />
            </View>
          ) : (
            <View />
          )}
          <ThemedText type="small" themeColor="textSecondary">
            {t('guide.stepOf')
              .replace('{n}', String(index + 1))
              .replace('{total}', String(guide.steps.length))}
          </ThemedText>
        </View>

        <View style={styles.headText}>
          {step.posture && (
            <ThemedText type="caption" themeColor="accent" style={styles.postureLabel}>
              {t(POSTURE_KEY[step.posture])}
            </ThemedText>
          )}
          <ThemedText type="subtitle">{step.title}</ThemedText>
        </View>

        <ThemedText type="default" style={styles.instruction}>
          {step.instruction}
        </ThemedText>

        {/*
          The position, under the words that describe it.

          It used to be a 44px tile beside the title, which is a decoration
          rather than an instruction — too small to copy, and above the
          sentence it illustrates. Someone on a mat reads what to do and then
          looks at what it should look like, so the picture goes where the
          eye lands next.

          `POSTURE_KEY` still names it above, for a screen reader and for
          anyone who wants the word.
        */}
        {step.posture && (
          <View style={[styles.posture, { backgroundColor: theme.backgroundElement }]}>
            <PostureFigure posture={step.posture} color={theme.accent} height={300} />
          </View>
        )}

        {step.says && <RecitationCard recitation={step.says} />}

        {/*
          A surah the step has you recite, printed from the Qur'an tab's own
          data rather than copied into a Recitation. No transliteration line:
          juz30 carries none on purpose, and inventing one here would be a
          model writing Arabic-adjacent text, which this repo does not do.
        */}
        {step.saysSurah !== undefined && <SurahInStep number={step.saysSurah} />}

        {resolveNotes(step.note, step.notes).map((entry, position) => (
          <ContentNoteCard key={`${entry.kind}-${position}`} entry={entry} />
        ))}

        {/*
          The step's own citations and the ones on the words it has you say,
          in one list. They are two fields because they answer two questions —
          where the instruction comes from, and where the wording does — but a
          reader on a prayer mat is asking one.
        */}
        <SourceDisclosure
          sources={[...(step.sources ?? []), ...(step.says?.sources ?? [])]}
        />

        {/*
          Last, under the citations. Someone mid-wudu is reading the
          instruction, not a note about the app — this is for the moment they
          look up, not the moment they look down.
        */}
        <TranslationGap coverage={coverage} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Pressable
          disabled={isFirst}
          onPress={() => go(index - 1)}
          style={({ pressed }) => [
            styles.button,
            styles.backButton,
            styles.secondaryButton,
            {
              borderColor: theme.border,
              backgroundColor: pressed ? theme.backgroundSelected : 'transparent',
              opacity: isFirst ? 0.35 : 1,
            },
          ]}>
          <ThemedText type="cardTitle">{t('common.back')}</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => (isLast ? finish() : go(index + 1))}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="cardTitle" themeColor="textOnAccent">
            {isLast ? t('common.finish') : t('common.next')}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * The four ayat of a short surah, inside a prayer step.
 *
 * Deliberately quieter than the surah screen — this is somebody mid-prayer
 * checking words they half-know, not somebody memorising. Arabic at the size
 * the recitation cards use, translation under it, and a way through to the
 * full screen when they want to drill it.
 */
function SurahInStep({ number }: { number: number }) {
  const theme = useTheme();
  const { t } = useLocale();
  const surah = getSurah(number);
  if (!surah) return null;

  return (
    <View
      style={[
        styles.surahCard,
        { backgroundColor: theme.accentMuted, borderColor: theme.accent },
      ]}>
      <ThemedText type="caption" themeColor="textSecondary">
        {surah.name} · {surah.meaning}
      </ThemedText>
      {surah.ayahs.map((ayah: Ayah) => (
        <View key={ayah.number} style={styles.surahAyah}>
          <ThemedText type="arabicVerse" style={styles.surahArabic}>{ayah.arabic}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {ayah.translation}
          </ThemedText>
        </View>
      ))}
      <PressableLink
        href={{ pathname: '/surah/[number]', params: { number: String(number) } }}
        style={styles.surahLink}
        pressedStyle={{ opacity: 0.6 }}>
        <ThemedText type="smallBold" themeColor="accent">
          {t('step.openSurah')}
        </ThemedText>
      </PressableLink>
    </View>
  );
}

const styles = StyleSheet.create({
  surahCard: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  surahAyah: {
    gap: Spacing.one,
  },
  surahArabic: {
    /* size and face: the `arabicVerse` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  surahLink: {
    paddingTop: Spacing.two,
  },
  screen: {
    flex: 1,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 3,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  rakahRow: {
    justifyContent: 'center',
  },
  /**
   * The frame the illustration sits in.
   *
   * Height-led rather than width-led, because the postures are not all the
   * same shape: a person standing is portrait and a person prostrating is
   * landscape. Constraining the height and letting width follow keeps every
   * step's picture the same visual weight, which a fixed-width frame would
   * not — a portrait image at full width would be 500pt tall and push the
   * citations off the screen.
   */
  posture: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  headText: {
    flex: 1,
    gap: Spacing.one,
  },
  postureLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  instruction: {
    lineHeight: 26,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    paddingBottom: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderRadius: Radius.medium,
  },
  /**
   * Back is narrower than Next on purpose.
   *
   * They were equal halves, which gave the same weight to the thing you do
   * once by mistake and the thing you do thirty times a prayer. Next takes the
   * side a right thumb reaches without moving the hand.
   */
  backButton: {
    flex: 0,
    paddingHorizontal: Spacing.four,
  },
  secondaryButton: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
