import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { RECITERS } from '@/content/quran/recitation';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { localiseReciter, measure } from '@/i18n/localise';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * Whose voice reads the Qur'an to you.
 *
 * ## Why every reciter gets a sentence
 *
 * A list of eight Arabic names is not a choice for the person this app is for.
 * They said the shahada three weeks ago; they have not heard of Al-Minshawi,
 * and picking between him and Al-Ghamdi on the strength of the names is
 * guessing. Every app that offers reciters offers them as a directory, because
 * every app that offers reciters was built for someone who already has a
 * favourite.
 *
 * So each one says what the recording is *for* — slow enough to copy, the one
 * you have already heard in a car, the one that is easiest to sit with for a
 * long stretch. That is the axis a beginner can actually judge on, and it turns
 * a wall of names into eight things a person might want.
 *
 * ## Why the teaching recording is first and default
 *
 * This tab exists to get a surah into someone's memory. Al-Husary's muʿallim
 * recording was made for exactly that — deliberately slow, phrase by phrase,
 * to be repeated after. Any of the others is a better listen and a worse
 * teacher, and the default should be the one that does the job the screen is
 * for.
 *
 * ## What this costs
 *
 * ⚠️ Eight voices is eight rights-holders. everyayah.com publishes no terms of
 * use anywhere, so none of these carries a licence the app can point at — see
 * the header of `src/content/quran/recitation.ts`. Abdul Basit and Alafasy are
 * commercially published recordings and are the two most likely to draw an
 * objection. This has to be settled before a public release; dropping a voice
 * is one line in `RECITERS` and no user data moves with it.
 */
export default function ReciterScreen() {
  const theme = useTheme();
  const { t, locale } = useLocale();
  const router = useRouter();
  const { reciter, set } = useSettings();

  const [reciters, coverage] = measure(() => RECITERS.map((r) => localiseReciter(r, locale)));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('reciter.title') }} />

      <View style={styles.header}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('reciter.intro')}
        </ThemedText>
        <TranslationGap coverage={coverage} />
      </View>

      <View style={styles.list}>
        {reciters.map((option) => {
          const chosen = option.id === reciter;

          return (
            <Pressable
              key={option.id}
              onPress={() => {
                set('reciter', option.id);
                // Straight back to the surah, which resumes in the new voice on
                // the ayah it was already on. Making someone tap a second time
                // to leave would be a step between them and hearing the change.
                // The Qur'an tab is the fallback rather than Today: this screen
                // is only ever reached from reading, so that is where "back"
                // means something when there is no history to pop.
                if (router.canGoBack()) router.back();
                else router.replace('/(tabs)/quran');
              }}
              accessibilityRole="radio"
              accessibilityState={{ checked: chosen }}
              accessibilityLabel={`${option.name}. ${option.blurb}`}
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: chosen ? theme.accentMuted : theme.backgroundElement,
                  borderColor: chosen ? theme.accent : theme.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}>
              <View style={styles.rowText}>
                <ThemedText type="cardTitle" themeColor={chosen ? 'accent' : 'text'}>
                  {option.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {option.blurb}
                </ThemedText>
              </View>
              {/*
                A tick for the chosen one and an empty column for the rest,
                rather than an outlined circle on every row. Eight open circles
                read as eight things to do; one tick reads as an answer.
              */}
              <View style={styles.check}>
                {chosen && <Ionicons name="checkmark" size={20} color={theme.accent} />}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/*
        One credit for the whole list, because this screen is where a reader
        sees every reciter at once and the obligation is to name where the
        recordings come from. The surah screen credits whoever is playing.
      */}
      <ThemedText type="caption" themeColor="textSecondary">
        {t('reciter.credit')}
      </ThemedText>
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
  header: {
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  check: {
    width: 24,
    alignItems: 'center',
  },
});
