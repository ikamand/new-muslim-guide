import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { INPUT_TEXT, ThemedText } from '@/components/themed-text';
import { CURRENCIES, PRICED_AT, PRICE_SOURCE } from '@/content/nisab';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { work } from '@/lib/zakat';

/**
 * The zakat working-out.
 *
 * ## It shows a sum, never a verdict
 *
 * `docs/build-order.md` is explicit that the app must not output a verdict on
 * whether somebody owes, because that has conditions and exemptions on it. So
 * this screen never says "you owe". It says what the total comes to, what 2.5%
 * of it is, where the two thresholds sit — and then, at length, what it did not
 * count.
 *
 * That last part is not a disclaimer. It is the most important thing on the
 * screen, because a person with a mortgage, a pension and a business is being
 * shown a number that is not their zakat, and they have to be told so where
 * they will read it.
 *
 * ## Nothing is stored
 *
 * The numbers a person types here are the most private in the app — what they
 * have. They live in component state for as long as the screen is open and are
 * written nowhere: not to settings, not to observations, not to a log. Closing
 * the screen forgets them, and that is the intended behaviour rather than a
 * missing feature.
 *
 * ## It works with the radio off
 *
 * The price ships in the bundle, from `npm run zakat:nisab`. No request is made
 * here and none should ever be added — a zakat screen that needs a signal is a
 * zakat screen that fails on a plane.
 */
export default function ZakatScreen() {
  const theme = useTheme();
  const { t } = useLocale();

  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');

  /* A blank field is zero, not an error. Most people hold no silver. */
  const num = (value: string) => {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const result = work(
    { cash: num(cash), goldGrams: num(gold), silverGrams: num(silver) },
    currency,
  );

  const money = (value: number) =>
    `${currency} ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  const field = (label: string, value: string, onChange: (next: string) => void) => (
    <View style={styles.field}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor={theme.textSecondary}
        accessibilityLabel={label}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement },
        ]}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: t('zakat.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('zakat.intro')}
      </ThemedText>

      {/* A row of currencies rather than a picker: ten is few enough to show. */}
      <View style={styles.currencies}>
        {CURRENCIES.map((code) => (
          <Pressable
            key={code}
            onPress={() => setCurrency(code)}
            accessibilityRole="radio"
            accessibilityState={{ checked: code === currency }}
            style={[
              styles.chip,
              {
                borderColor: code === currency ? theme.accent : theme.border,
                backgroundColor: code === currency ? theme.accentMuted : 'transparent',
              },
            ]}>
            <ThemedText type="smallBold" themeColor={code === currency ? 'accent' : 'textSecondary'}>
              {code}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {field(t('zakat.cash'), cash, setCash)}
      {field(t('zakat.gold'), gold, setGold)}
      {field(t('zakat.silver'), silver, setSilver)}

      {result ? (
        <>
          <View style={[styles.sum, { borderColor: theme.border }]}>
            <View style={styles.sumRow}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('zakat.total')}
              </ThemedText>
              <ThemedText type="cardTitle">{money(result.total)}</ThemedText>
            </View>
            <View style={styles.sumRow}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('zakat.rate')}
              </ThemedText>
              <ThemedText type="cardTitle" themeColor="accent">
                {money(result.due)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.block}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
              {t('zakat.thresholds')}
            </ThemedText>
            {result.thresholds.map((threshold) => (
              <ThemedText key={threshold.metal} type="small">
                {`${threshold.grams}g ${threshold.metal} · ${money(threshold.value)} — `}
                <ThemedText
                  type="smallBold"
                  themeColor={threshold.reached ? 'accent' : 'textSecondary'}>
                  {t(threshold.reached ? 'zakat.reached' : 'zakat.below')}
                </ThemedText>
              </ThemedText>
            ))}
            <ThemedText type="small" themeColor="textSecondary">
              {t('zakat.whole')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('zakat.silverFirst')}
            </ThemedText>
          </View>
        </>
      ) : (
        <ThemedText type="small" themeColor="textSecondary">
          {t('zakat.noCurrency')}
        </ThemedText>
      )}

      {/*
        The most important block on the screen, and it is not a disclaimer.
        Somebody with a mortgage and a pension is looking at a number that is
        not their zakat, and they have to be told where they will read it.
      */}
      <View style={[styles.block, styles.notCounted, { borderTopColor: theme.border }]}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {t('zakat.notCounted')}
        </ThemedText>
        <ThemedText type="small">{t('zakat.notCounted.body')}</ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText type="small" themeColor="textSecondary">
          {t('zakat.hawl')}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {t('zakat.priced')
            .replace('{date}', PRICED_AT.slice(0, 10))
            .replace('{source}', PRICE_SOURCE)}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {t('zakat.stale')}
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  currencies: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 36,
    justifyContent: 'center',
  },
  field: { gap: Spacing.one },
  input: {
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    ...INPUT_TEXT,
  },
  sum: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sumRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: Spacing.two },
  block: { gap: Spacing.two },
  notCounted: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: Spacing.three },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
});
