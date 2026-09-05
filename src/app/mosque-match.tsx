import { Stack, useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Unwan } from '@/components/jadwal';
import { LocationAsk } from '@/components/location-ask';
import { INPUT_TEXT, ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useSettings } from '@/hooks/use-settings';
import { fitMosque } from '@/lib/mosque-fit';
import { computeDay, inferProfile, PRAYER_IDS, PRAYER_LABEL, type PrayerId } from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * Match your mosque — configuration as transcription.
 *
 * The user copies today's five adhan times off their mosque's board;
 * `fitMosque` searches every method × ʿAsr school for the combination that
 * reproduces them and turns the leftovers into per-prayer offsets. Nobody is
 * asked what a calculation method is, and the result is announced in plain
 * words before it is applied.
 *
 * The one trap the flow names on screen: boards print two columns, adhan and
 * iqamah, and the second runs 10–30 minutes late. `fitMosque` refuses a
 * column that is late across the board rather than "matching" it — the
 * no-match message points back at exactly this.
 */
export default function MosqueMatchScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const { coords } = useLocation();
  const { set } = useSettings();

  const [entries, setEntries] = useState<Record<PrayerId, string>>({
    fajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: '',
  });
  /*
    Return walks Fajr → ʿIshāʾ and the last field closes the keyboard — the
    first build left the result hidden under it, which read as "typing does
    nothing" on a phone. The rig that verified that build has no keyboard,
    which is exactly why it never showed.
  */
  const inputs = useRef<Partial<Record<PrayerId, TextInput | null>>>({});

  const complete = PRAYER_IDS.every((id) => entries[id].trim().length > 0);

  /*
    Refit on every keystroke once all five are in — the search is ~26 cheap
    computeDay calls, and a result that appears as you finish typing beats a
    button you have to find.
  */
  const result = useMemo(() => {
    if (!coords || !complete) return null;
    return fitMosque(coords, entries, inferProfile(coords), new Date());
  }, [coords, entries, complete]);

  /* Placeholders are today's computed times — a worked example, not lorem. */
  const placeholders = useMemo(() => {
    if (!coords) return null;
    const day = computeDay(coords, new Date(), inferProfile(coords));
    const map = {} as Record<PrayerId, string>;
    for (const prayer of day.prayers) {
      map[prayer.id] = new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
        .format(prayer.time)
        .replace(/\s?[AP]M/i, '');
    }
    return map;
  }, [coords]);

  if (!coords) {
    /* Was "Working out today's times…" for ever, with nothing to press. */
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('mosque.title') }} />
        <LocationAsk />
      </ScrollView>
    );
  }

  const offsetSummary = result
    ? PRAYER_IDS.filter((id) => result.fit.adjustments[id] !== 0)
        .map(
          (id) =>
            `${PRAYER_LABEL[id]} ${result.fit.adjustments[id] > 0 ? '+' : ''}${result.fit.adjustments[id]} min`,
        )
        .join(' · ')
    : '';

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: t('mosque.title') }} />

      <Unwan title={t('mosque.title')} subtitle={t('mosque.intro')} />

      {/*
        The two-column trap, named before the first input rather than after
        the wrong entry — the first time any app has told a convert what
        iqamah means at the moment it matters.
      */}
      <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
        {t('mosque.iqamah')}
      </ThemedText>

      <View style={styles.rows}>
        {PRAYER_IDS.map((id) => (
          <View key={id} style={[styles.inputRow, { borderBottomColor: theme.goldSoft }]}>
            <ThemedText type="default">{t(`awqat.col.${id}` as UIKey)}</ThemedText>
            <TextInput
              ref={(node) => {
                inputs.current[id] = node;
              }}
              value={entries[id]}
              onChangeText={(text) => setEntries((current) => ({ ...current, [id]: text }))}
              placeholder={placeholders?.[id] ?? ''}
              placeholderTextColor={theme.textSecondary}
              keyboardType="numbers-and-punctuation"
              returnKeyType={id === 'isha' ? 'done' : 'next'}
              onSubmitEditing={() => {
                const order = PRAYER_IDS;
                const following = order[order.indexOf(id) + 1];
                if (following) inputs.current[following]?.focus();
                else Keyboard.dismiss();
              }}
              accessibilityLabel={PRAYER_LABEL[id]}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.goldSoft, backgroundColor: theme.backgroundElement },
              ]}
            />
          </View>
        ))}
      </View>

      {complete && result && (
        <View style={styles.found}>
          <ThemedText type="caption" themeColor="malachite" style={styles.foundKicker}>
            {t('mosque.matched')}
          </ThemedText>
          <ThemedText type="cardTitle" style={styles.centred}>
            {result.profile.label}
            {result.fit.hanafiAsr ? ` · ${t('mosque.hanafi')}` : ''}
          </ThemedText>
          {offsetSummary ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
              {offsetSummary}
            </ThemedText>
          ) : null}
        </View>
      )}

      {/*
        The save control is ALWAYS on screen, and when it cannot save its
        caption says why. The first build only rendered it once a fit
        existed, so a failed parse and a missing feature looked identical —
        "there's no way to save the changes" was the exact bug report.
      */}
      <Pressable
        onPress={() => {
          if (!result) return;
          set('awqatMosque', result.fit);
          Keyboard.dismiss();
          if (router.canGoBack()) router.back();
          else router.replace('/awqat-settings');
        }}
        accessibilityRole="button"
        accessibilityState={{ disabled: !result }}
        disabled={!result}
        style={({ pressed }) => [
          styles.use,
          {
            backgroundColor: theme.action,
            borderColor: theme.actionRule,
            opacity: !result ? 0.4 : pressed ? 0.85 : 1,
          },
        ]}>
        <ThemedText type="smallBold" themeColor="onAction">
          {t('mosque.use')}
        </ThemedText>
      </Pressable>
      {!result && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
          {complete ? t('mosque.noMatch') : t('mosque.incomplete')}
        </ThemedText>
      )}

      {/*
        The season caveat, stated where the decision is made: a fit that is
        right today can drift if the method is wrong, and the honest offer is
        to come back with next month's board, not to pretend certainty.
      */}
      <ThemedText type="small" themeColor="textSecondary" style={styles.foot}>
        {t('mosque.drift')}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  note: {
    paddingTop: Spacing.three,
  },
  rows: {
    paddingTop: Spacing.two,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    minWidth: 96,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
    textAlign: 'center',
    ...INPUT_TEXT,
    fontVariant: ['tabular-nums'],
  },
  found: {
    paddingTop: Spacing.four,
    gap: Spacing.two,
  },
  foundKicker: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  centred: {
    textAlign: 'center',
  },
  use: {
    marginTop: Spacing.two,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.rule,
    borderWidth: StyleSheet.hairlineWidth,
  },
  foot: {
    paddingTop: Spacing.five,
  },
});
