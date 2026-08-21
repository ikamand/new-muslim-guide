import { useKeepAwake } from 'expo-keep-awake';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PostureFigure, RakahProgress } from '@/components/illustrations';
import { RecitationCard } from '@/components/recitation-card';
import { ContentNoteCard } from '@/components/content-note';
import { SourceDisclosure } from '@/components/source-list';
import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { getGuide, resolveNotes, type Posture } from '@/content';
import { localiseGuide, measure } from '@/i18n/localise';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import type { UIKey } from '@/i18n/ui';
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const { locale, t } = useLocale();
  const { keepAwake } = useSettings();
  const source = getGuide(id);
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
        <ThemedText type="default">That guide doesn’t exist.</ThemedText>
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

        {/*
          The position, drawn. `POSTURE_KEY` names it for a screen reader; a
          sighted reader mid-movement gets the shape, which is what they can
          actually use one-handed without stopping to read.
        */}
        <View style={styles.head}>
          {step.posture && (
            <View style={[styles.postureTile, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <PostureFigure
                posture={step.posture}
                color={theme.accent}
                size={44}
              />
            </View>
          )}
          <View style={styles.headText}>
            {step.posture && (
              <ThemedText type="caption" themeColor="accent" style={styles.postureLabel}>
                {t(POSTURE_KEY[step.posture])}
              </ThemedText>
            )}
            <ThemedText type="subtitle">{step.title}</ThemedText>
          </View>
        </View>

        <ThemedText type="default" style={styles.instruction}>
          {step.instruction}
        </ThemedText>

        {step.says && <RecitationCard recitation={step.says} />}

        {resolveNotes(step.note, step.notes).map((entry, position) => (
          <ContentNoteCard key={`${entry.kind}-${position}`} entry={entry} />
        ))}

        {/*
          The step's own citations and the ones on the words it has you say,
          in one list. They are two fields because they answer two questions —
          where the instruction comes from, and where the wording does — but a
          reader on a prayer mat is asking one.
        */}
        <SourceDisclosure sources={[...(step.sources ?? []), ...(step.says?.sources ?? [])]} />

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
          onPress={() => (isLast ? router.back() : go(index + 1))}
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

const styles = StyleSheet.create({
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
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  postureTile: {
    width: 68,
    height: 68,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
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
