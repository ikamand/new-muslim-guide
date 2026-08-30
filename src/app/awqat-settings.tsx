import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Madhab } from 'adhan';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { inferProfile, METHODS } from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';

/**
 * The Prayer times settings — a page of their own.
 *
 * They lived as a group on the Settings tab first, and the method list made
 * that tab the longest screen in the app (Iyad's catch, 31 Aug). A page also
 * gives what is still coming — iqamah display, a re-match nudge — somewhere
 * to land that is not the main tab.
 *
 * Order matters: Match your mosque first, because transcribing the board is
 * the answer for most people who ever open this page and it needs none of
 * the vocabulary below it. The method picker is a disclosure, collapsed to
 * the current choice — thirteen radio rows are reference material, not a
 * decision most visits make.
 */
export default function AwqatSettingsScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { awqatMethod, awqatHanafiAsr, awqatMosque, set, setMany } = useSettings();
  const { coords } = useLocation();
  const { profile } = usePrayerTimes();
  const [methodOpen, setMethodOpen] = useState(false);

  if (!profile || !coords) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('settings.times') }} />
        <ThemedText type="small" themeColor="textSecondary">
          {t('times.working')}
        </ThemedText>
      </ScrollView>
    );
  }

  const suggested = inferProfile(coords);
  const methodRows: { id: string | null; label: string }[] = [
    { id: null, label: `${t('settings.method.suggested')} · ${suggested.label}` },
    ...Object.values(METHODS).map((method) => ({ id: method.id, label: method.label })),
  ];
  const currentMethodLabel =
    awqatMethod === null
      ? `${t('settings.method.suggested')} · ${suggested.label}`
      : (METHODS[awqatMethod]?.label ?? awqatMethod);

  /*
    Effective, not stored: with no override the tick reflects what the method
    itself bundles (Karachi carries Hanafi), so it never lies about which
    ʿAsr the card is showing.
  */
  const hanafiNow = awqatHanafiAsr ?? profile.build().madhab === Madhab.Hanafi;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('settings.times') }} />

      <ThemedText type="small" themeColor="textSecondary">
        {profile.label} · {t('times.onThisPhone')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('times.followLocal')}
      </ThemedText>

      {/*
        The headline, and the answer for most people who open this page:
        transcribe the board, skip the vocabulary below entirely.
      */}
      <PressableLink
        href="/mosque-match"
        accessibilityLabel={t('mosque.title')}
        style={[styles.group, styles.row, { borderColor: theme.goldSoft }]}
        pressedStyle={{ opacity: 0.6 }}>
        <ThemedText type="default">{t('mosque.title')}</ThemedText>
        <ThemedText type="smallBold" themeColor="gold">
          ›
        </ThemedText>
      </PressableLink>

      {awqatMosque && (
        <View style={styles.matchedState}>
          <ThemedText type="small" themeColor="malachite">
            {t('mosque.active')} · {METHODS[awqatMosque.methodId]?.label ?? awqatMosque.methodId}
          </ThemedText>
          <Pressable
            onPress={() => set('awqatMosque', null)}
            accessibilityRole="button"
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <ThemedText type="smallBold" themeColor="accent">
              {t('mosque.clear')}
            </ThemedText>
          </Pressable>
        </View>
      )}

      <ThemedText type="small" themeColor="textSecondary" style={styles.subheading}>
        {t('settings.method')}
      </ThemedText>
      {/*
        A disclosure, not a permanent list. Collapsed it names the current
        choice; open it is the radio list; choosing collapses it again. The
        thirteen conventions are reference material — most visits to this
        page are not here to change one.
      */}
      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        <Pressable
          onPress={() => setMethodOpen((was) => !was)}
          accessibilityRole="button"
          accessibilityState={{ expanded: methodOpen }}
          style={styles.row}>
          <ThemedText type="default" numberOfLines={1} style={styles.disclosureLabel}>
            {currentMethodLabel}
          </ThemedText>
          <Ionicons
            name={methodOpen ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={theme.gold}
          />
        </Pressable>

        {methodOpen &&
          methodRows.map((row) => (
            <Pressable
              key={row.id ?? 'suggested'}
              onPress={() => {
                /*
                  Manual picks clear the mosque match rather than silently
                  stacking under it — the match outranks the picker, and a
                  tick that changed nothing would be a lie.
                */
                setMany({ awqatMethod: row.id, awqatMosque: null });
                setMethodOpen(false);
              }}
              accessibilityRole="radio"
              accessibilityState={{ selected: awqatMethod === row.id }}
              style={[
                styles.row,
                styles.optionRow,
                { borderTopColor: theme.border },
              ]}>
              <ThemedText type="default">{row.label}</ThemedText>
              {awqatMethod === row.id && (
                <ThemedText type="smallBold" themeColor="accent">
                  ✓
                </ThemedText>
              )}
            </Pressable>
          ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.subheading}>
        {t('settings.asr')}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.asr.help')}
      </ThemedText>
      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        {(
          [
            { hanafi: false, label: t('settings.asr.standard') },
            { hanafi: true, label: t('settings.asr.hanafi') },
          ] as const
        ).map((row, index) => (
          <Pressable
            key={String(row.hanafi)}
            onPress={() => setMany({ awqatHanafiAsr: row.hanafi, awqatMosque: null })}
            accessibilityRole="radio"
            accessibilityState={{ selected: hanafiNow === row.hanafi }}
            style={[
              styles.row,
              index === 1 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border },
            ]}>
            <ThemedText type="default">{row.label}</ThemedText>
            {hanafiNow === row.hanafi && (
              <ThemedText type="smallBold" themeColor="accent">
                ✓
              </ThemedText>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  group: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.two,
    borderRadius: Radius.rule,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 48,
    paddingVertical: Spacing.two,
  },
  optionRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  disclosureLabel: {
    flexShrink: 1,
  },
  matchedState: {
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  subheading: {
    marginTop: Spacing.four,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
