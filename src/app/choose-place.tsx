import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Rule } from '@/components/jadwal';
import { INPUT_TEXT, ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useTheme } from '@/hooks/use-theme';
import { countryName, placeLabel, searchPlaces, type Place } from '@/lib/places';

/**
 * Choose a city, for somebody who will not or cannot grant location.
 *
 * The list is on the phone (`lib/places.ts`) and the search runs here, so the
 * name typed goes nowhere. The screen says the city it is using, because the
 * list stops at towns of 50,000 and somebody outside all of them has picked
 * the nearest and should be able to see that.
 */
export default function ChoosePlaceScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const { place, choosePlace, status } = useLocation();
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchPlaces(query), [query]);

  const pick = (next: Place | null) => {
    choosePlace(next);
    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      <Stack.Screen options={{ title: t('place.title') }} />
      <ThemedText type="default" themeColor="textSecondary">
        {t('place.intro')}
      </ThemedText>

      {/* A fill: this is a thing to type into, not a container. */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('place.placeholder')}
        placeholderTextColor={theme.textSecondary}
        autoFocus
        autoCorrect={false}
        autoCapitalize="words"
        accessibilityLabel={t('place.placeholder')}
        style={[
          styles.input,
          {
            color: theme.text,
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}
      />

      {place && query.trim().length < 2 && (
        <View style={styles.current}>
          <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
            {t('place.current')}
          </ThemedText>
          <ThemedText type="default">{placeLabel(place)}</ThemedText>
          {/*
            Only offered when the phone can take over, otherwise "stop using
            this city" leaves the reader with no times at all and nothing to
            say why.
          */}
          {status === 'ready' && (
            <Pressable
              onPress={() => pick(null)}
              accessibilityRole="button"
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
              <ThemedText type="smallBold" themeColor="accent">
                {t('place.usePhone')}
              </ThemedText>
            </Pressable>
          )}
          <Rule />
        </View>
      )}

      {results.map((hit) => (
        <Pressable
          key={`${hit.name}·${hit.region}·${hit.country}`}
          onPress={() => pick(hit)}
          accessibilityRole="button"
          accessibilityLabel={placeLabel(hit)}
          style={({ pressed }) => [
            styles.row,
            { borderBottomColor: theme.goldSoft, backgroundColor: pressed ? theme.backgroundSelected : 'transparent' },
          ]}>
          <ThemedText type="default">{hit.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {[hit.region, countryName(hit.country)].filter(Boolean).join(', ')}
          </ThemedText>
        </Pressable>
      ))}

      {query.trim().length >= 2 && results.length === 0 && (
        <ThemedText type="small" themeColor="textSecondary">
          {t('place.none')}
        </ThemedText>
      )}
    </ScrollView>
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
  input: {
    ...INPUT_TEXT,
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
  },
  current: {
    gap: Spacing.two,
  },
  kicker: {
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  row: {
    paddingVertical: Spacing.two + Spacing.one,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.half,
  },
});
