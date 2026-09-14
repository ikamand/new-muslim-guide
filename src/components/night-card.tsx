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
import { routeFor } from '@/lib/content-routes';
import { formatTime } from '@/lib/prayer-times';

/**
 * The card that follows the moon: one object for the night, under the thread.
 *
 * Three states, decided by `tonightPlan` (`lib/night.ts`):
 *
 * - **Before you sleep.** Shafʿ and Witr "if you might not wake before Fajr",
 *   the adhkār of sleep with their Start, and the wake-up switch. While the
 *   wake-up is on the witr row leaves, and one line asks "Not prayed witr
 *   yet?" and leaves it for the end of the night, because the Sunnah puts witr
 *   last for someone who will wake (Muslim 755). Asked, not told: somebody who
 *   prayed witr and then turned the switch on must not be sent to pray it twice.
 * - **A night in Ramadan.** Taraweeh, two at a time then witr, from the
 *   Ramadan arc's own row; the adhkār of sleep; and the suhoor wake-up, the
 *   same setting the fast line and the Reminders screen switch.
 * - **The last third of the night.** The night prayer, "Not prayed witr
 *   tonight?", and the adhkār of sleep as a door for somebody still up.
 *
 * The switch is a daily alarm and says so ("Every night"), because an alarm
 * somebody took to be for tonight only would ring again tomorrow.
 *
 * The marks are the night-prayer page's own: two-then-one outlined for
 * praying witr before sleep, filled for shafʿ and witr at the end of the night.
 *
 * It never records what anybody prayed. The Arabic title of the adhkār stays
 * off the row (Iyad, 13 Sep 2026): on a narrow phone it squeezed the text
 * beside it, and the adhkār screen opens on it one tap later.
 *
 * ⚠️ Every line of wording here is model-written and on the review pile.
 */
export function NightCard({ tonight }: { tonight: Tonight }) {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { flags, toggleFlag, granted } = useReminders();
  const { state, session, witr, wakeFlag, ramadan } = tonight;

  const titleOf = (id: string) => {
    const found = resolveRef({ kind: 'reference', id });
    return found ? localiseCatalogEntry(found, locale).title : '';
  };
  const chevron = <Ionicons name="chevron-forward" size={14} color={theme.gold} />;
  const glyph = (kind: 'closing' | 'earlier' | 'pairs') => (
    <TimelineGlyph kind={kind} accent={theme.accent} gold={theme.gold} ground={theme.background} />
  );
  const adhkar = session ? (
    <>
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
    </>
  ) : null;

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
          <View style={styles.mark}>{glyph('closing')}</View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.stepText}>
            {`${t('night.card.third.ask')} `}
            <ThemedText type="smallBold" themeColor="accent">
              {t('night.card.third.witr')}
            </ThemedText>
          </ThemedText>
        </PressableLink>
        {/* Still up: the adhkār of sleep, as a door rather than a second button. */}
        {session ? (
          <PressableLink
            href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
            accessibilityLabel={t('night.card.adhkar')}
            style={styles.step}
            pressedStyle={{ opacity: 0.6 }}>
            {adhkar}
            {chevron}
          </PressableLink>
        ) : null}
      </View>
    );
  }

  const taraweeh = ramadan?.ref ? resolveRef(ramadan.ref) : undefined;
  const taraweehTitle = taraweeh ? localiseCatalogEntry(taraweeh, locale).title : '';
  const waking = flags[wakeFlag];
  const suhoor = wakeFlag === 'suhoorWakeUp';
  const wakeTitle = t(suhoor ? 'reminders.suhoor' : 'reminders.nightWake');
  const wakeHelp = t(suhoor ? 'night.card.suhoor.help' : 'night.card.wake.help').replace(
    '{time}',
    formatTime(tonight.wakeAt),
  );

  return (
    <View style={[styles.card, { borderBottomColor: theme.goldSoft }]}>
      <View style={[styles.rail, { backgroundColor: theme.gold }]} />
      <ThemedText type="cardTitle">{t(ramadan ? ramadan.reason : 'night.card.before.title')}</ThemedText>

      {taraweeh ? (
        <PressableLink
          href={routeFor(taraweeh)}
          accessibilityLabel={`${taraweehTitle}. ${t('night.card.taraweeh')}`}
          style={styles.step}
          pressedStyle={{ opacity: 0.6 }}>
          <View style={styles.mark}>{glyph('pairs')}</View>
          <View style={styles.stepText}>
            <ThemedText type="default">{taraweehTitle}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('night.card.taraweeh')}
            </ThemedText>
          </View>
          {chevron}
        </PressableLink>
      ) : null}

      {witr === 'next' ? (
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'witr' } }}
          accessibilityLabel={`${titleOf('witr')}. ${t('night.card.witr')}`}
          style={styles.step}
          pressedStyle={{ opacity: 0.6 }}>
          <View style={styles.mark}>{glyph('earlier')}</View>
          <View style={styles.stepText}>
            <ThemedText type="default">{titleOf('witr')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('night.card.witr')}
            </ThemedText>
          </View>
          {chevron}
        </PressableLink>
      ) : null}

      {session ? (
        <>
          <View style={styles.step}>{adhkar}</View>
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
          onValueChange={() => void toggleFlag(wakeFlag)}
          accessibilityLabel={wakeTitle}
          trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
          thumbColor={theme.background}
        />
      </View>
      {/* The switch cannot turn on without notifications; say so where it was tapped. */}
      {granted === false ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('settings.reminders.denied')}
        </ThemedText>
      ) : null}
      {witr === 'end' ? (
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
