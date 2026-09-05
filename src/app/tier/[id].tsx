import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { JadwalRow, Rosette } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useCurriculum } from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * One tier, as a screen — what this stretch of the path offers.
 *
 * This replaced the Learn tab's in-place accordion, and the reason rides
 * here: expanding a tier collapsed the one above it, so the page shifted
 * under the reader's finger and the row they tapped landed somewhere else —
 * the only control on the tab that mutated the page rather than navigating
 * (Iyad's device, 31 Aug). A screen cannot jump.
 *
 * Nothing here is a gate. Every unit opens today, whichever tier the reader
 * is "in" — this screen exists so the later tiers can be SEEN, which is how
 * somebody three weeks in finds out that janāzah is a thing one learns and
 * that the app still has years in it.
 */
export default function TierScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { t } = useLocale();
  const { tiers } = useCurriculum();

  const tier = tiers.find((entry) => entry.id === id);

  // A stale deep link shows the tab's intro rather than an error.
  if (!tier) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('learn.intro')}
        </ThemedText>
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t(`curriculum.tier.${tier.id}` as UIKey) }} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t(`curriculum.tier.${tier.id}.purpose` as UIKey)}
        </ThemedText>

        {/*
          One zero-gap group, not direct children of the gapped container:
          a container gap between ruled rows is air nothing paints, so every
          rule floated 16px above the next row's pressed box (held-press
          screenshots, 31 Aug). Rules and boxes touch; the rows own their
          air as padding.
        */}
        <View>
        {tier.units.map((unit, i) => {
          const finished = unit.total > 0 && unit.done === unit.total;
          /*
            Count first, then the unit's own purpose sentence — one line that
            says how deep it runs and what it is for, which is the difference
            between this screen and the tab's terser rows: this one exists to
            be browsed.
          */
          const meta = `${t('journey.progress')
            .replace('{done}', String(unit.done))
            .replace('{total}', String(unit.total))} · ${t(
            `curriculum.unit.${unit.id}.purpose` as UIKey,
          )}`;
          return (
            <JadwalRow
              key={unit.id}
              href={{ pathname: '/unit/[id]', params: { id: unit.id } }}
              accessibilityLabel={`${t(`curriculum.unit.${unit.id}` as UIKey)}. ${meta}`}
              marginal={<Rosette label={String(i + 1)} />}
              title={t(`curriculum.unit.${unit.id}` as UIKey)}
              meta={meta}
              progress={!finished && unit.done > 0 ? unit.done / unit.total : undefined}
              trailing={
                finished ? (
                  <Ionicons name="checkmark-circle" size={16} color={theme.malachite} />
                ) : (
                  <Ionicons name="chevron-forward" size={14} color={theme.gold} />
                )
              }
            />
          );
        })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
