import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Switch, View } from 'react-native';
import Svg from 'react-native-svg';

import { sessionMeta } from '@/components/adhkar-session-card';
import { DayMarkAt } from '@/components/illustrations';
import { Action } from '@/components/jadwal';
import { PressableLink } from '@/components/pressable-link';
import { TimelineGlyph } from '@/components/teaching/timeline';
import { ThemedText } from '@/components/themed-text';
import { resolveRef } from '@/content';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { Tonight } from '@/hooks/use-tonight';
import { localiseCatalogEntry } from '@/i18n/localise';
import { formatTime } from '@/lib/prayer-times';

/**
 * The card that follows the moon: one object for the night, under the thread.
 *
 * Three states, decided by `useTonight`:
 *
 * - **Before you sleep.** Shafʿ and Witr "if you might not wake before Fajr",
 *   the adhkār of sleep with their Start, and the wake-up switch. While the
 *   wake-up is on the witr row leaves and one line says where it went,
 *   because the Sunnah puts witr last for someone who will wake (Muslim 755).
 * - **A night in Ramadan.** Taraweeh, with witr prayed with the imam, the
 *   adhkār of sleep, and the suhoor wake-up — the same setting the fast line
 *   and the Reminders screen switch, so there is one alarm and one switch.
 * - **The last third of the night.** The night prayer, and "Not prayed witr
 *   tonight?" — safe whichever way the evening went.
 *
 * It never asks what anybody prayed. The Arabic title of the adhkār stays off
 * the row (Iyad, 13 Sep 2026): on a narrow phone it squeezed the text beside
 * it, and the adhkār screen opens on it one tap later.
 *
 * ⚠️ Every line of wording here is model-written and on the review pile.
 */
export function NightCard({ tonight }: { tonight: Tonight }) {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { flags, toggleFlag } = useReminders();
  const { state, thread, session } = tonight;

  const titleOf = (id: string) => {
    const found = resolveRef({ kind: 'reference', id });
    return found ? localiseCatalogEntry(found, locale).title : '';
  };
  const chevron = <Ionicons name="chevron-forward" size={14} color={theme.gold} />;
  const glyph = (kind: 'closing' | 'earlier' | 'pairs') => (
    <TimelineGlyph kind={kind} accent={theme.accent} gold={theme.gold} ground={theme.background} />
  );

  if (state === 'third') {
    return (
      <View style={[styles.card, { borderBottomColor: theme.goldSoft }]}>
        <View style={[styles.rail, { backgroundColor: theme.gold }]} />
        <ThemedText type="cardTitle">{t('night.card.third.title')}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('night.card.third.body')}
        </ThemedText>
        <Action
          href={{ pathname: '/reference/[id]', params: { id: 'qiyam-al-layl' } }}
          label={t('night.card.third.pray')}
        />
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'witr' } }}
          accessibilityLabel={`${t('night.card.third.ask')} ${t('night.card.third.witr')}`}
          style={styles.step}
          pressedStyle={{ opacity: 0.6 }}>
          <View style={styles.mark}>{glyph('earlier')}</View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.stepText}>
            {`${t('night.card.third.ask')} `}
            <ThemedText type="smallBold" themeColor="accent">
              {t('night.card.third.witr')}
            </ThemedText>
          </ThemedText>
        </PressableLink>
      </View>
    );
  }

  const ramadan = state === 'ramadan';
  const flag = ramadan ? 'suhoorWakeUp' : 'nightWakeUp';
  const waking = flags[flag];
  const wakeTitle = t(ramadan ? 'night.card.suhoor' : 'night.card.wake').replace(
    '{time}',
    formatTime(tonight.wakeAt),
  );
  const wakeHelp = ramadan
    ? t('night.card.suhoor.help').replace('{time}', formatTime(thread.fajr))
    : t('night.card.wake.help');

  return (
    <View style={[styles.card, { borderBottomColor: theme.goldSoft }]}>
      <View style={[styles.rail, { backgroundColor: theme.gold }]} />
      <ThemedText type="cardTitle">
        {t(ramadan ? 'night.card.ramadan.title' : 'night.card.before.title')}
      </ThemedText>

      {ramadan ? (
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'taraweeh' } }}
          accessibilityLabel={`${titleOf('taraweeh')}. ${t('night.card.taraweeh')}`}
          style={styles.step}
          pressedStyle={{ opacity: 0.6 }}>
          <View style={styles.mark}>{glyph('pairs')}</View>
          <View style={styles.stepText}>
            <ThemedText type="default">{titleOf('taraweeh')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('night.card.taraweeh')}
            </ThemedText>
          </View>
          {chevron}
        </PressableLink>
      ) : waking ? null : (
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'witr' } }}
          accessibilityLabel={`${titleOf('witr')}. ${t('night.card.witr')}`}
          style={styles.step}
          pressedStyle={{ opacity: 0.6 }}>
          <View style={styles.mark}>{glyph('closing')}</View>
          <View style={styles.stepText}>
            <ThemedText type="default">{titleOf('witr')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('night.card.witr')}
            </ThemedText>
          </View>
          {chevron}
        </PressableLink>
      )}

      {session ? (
        <>
          <View style={styles.step}>
            <View style={styles.mark}>
              <Svg width={22} height={22} viewBox="0 0 22 22">
                <DayMarkAt name="isha" cx={11} cy={11} size={16} color={theme.gold} />
              </Svg>
            </View>
            <View style={styles.stepText}>
              <ThemedText type="default">{t('night.card.adhkar')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {sessionMeta(session, t, { long: true })}
              </ThemedText>
            </View>
          </View>
          <Action
            href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
            label={t('night.card.adhkar.start')}
          />
        </>
      ) : null}

      <View style={[styles.wake, { borderTopColor: theme.goldSoft }]}>
        <View style={styles.stepText}>
          <ThemedText type="smallBold">{wakeTitle}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {wakeHelp}
          </ThemedText>
        </View>
        <Switch
          value={waking}
          onValueChange={() => void toggleFlag(flag)}
          accessibilityLabel={wakeTitle}
          trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
          thumbColor={theme.background}
        />
      </View>
      {waking && !ramadan ? (
        <ThemedText type="small" themeColor="gold">
          {t('night.card.witr.later')}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  /* The sleep adhkār card's own panel: a rule below, a gold rail in the margin. */
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
    paddingLeft: Spacing.three,
    gap: Spacing.two,
    overflow: 'hidden',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: Spacing.three,
    bottom: Spacing.three,
    width: 2,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.one,
  },
  mark: {
    width: 28,
    alignItems: 'center',
  },
  stepText: {
    flex: 1,
  },
  wake: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.two,
  },
});
