import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { RECITERS } from '@/content/quran/recitation';
import { deleteVoice, savedVoices, type SavedVoice } from '@/content/quran/offline';
import { useLocale } from '@/hooks/use-locale';
import { megabytes } from '@/lib/bytes';
import { useTheme } from '@/hooks/use-theme';
import { deleteReciteModels, reciteModelBytes } from '@/lib/recite-session';

/**
 * What the Qur'an tab has saved, and how to be rid of it.
 *
 * ## Why this is a sheet
 *
 * It lived on Settings as a group of eight rows and was the one section that
 * is a list of many things rather than one or two controls; Iyad's call,
 * 11 Sep 2026, was a door on Settings and this page behind it, presented as
 * a sheet (`presentation: 'modal'` in the root layout) because it is a task
 * rather than a place: you come to clear space and go back. A routed screen
 * rather than a hand-built modal, so it has a header, its own scrolling,
 * the Android back button and the swipe-down.
 *
 * ## Why this is not optional
 *
 * The audio saves itself the first time a surah plays, with no button and no
 * prompt — which is the right behaviour, and it is only honest if somebody can
 * see what accumulated and delete it. Saving quietly with no way to clear it
 * fills a phone invisibly, and that is a worse experience than the download
 * button the design refused.
 *
 * Sizes are shown in MB rather than a bar or a percentage. A bar needs a total
 * to be a fraction of, and there is no total here — the reader's own sense of
 * whether 40 MB matters on their phone is better than anything this screen
 * could invent.
 */
export default function SavedAudioScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  /*
    Read once, lazily, rather than in an effect. An effect that sets state on
    mount renders the screen twice and flashes an empty list first; a lazy
    initialiser runs before the first paint. The read is a directory listing,
    not a download.
  */
  const [voices, setVoices] = useState<SavedVoice[]>(savedVoices);
  const [reciteBytes, setReciteBytes] = useState<number>(reciteModelBytes);

  const remove = (folder: string) => {
    deleteVoice(folder);
    setVoices(savedVoices());
  };

  const removeReciteModels = () => {
    deleteReciteModels();
    setReciteBytes(reciteModelBytes());
  };

  const empty = voices.length === 0 && reciteBytes === 0;

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('settings.storage') }} />
      <ThemedText type="small" themeColor="textSecondary">
        {t('settings.storage.help')}
      </ThemedText>

      {empty ? (
        <ThemedText type="default" themeColor="textSecondary">
          {t('settings.storage.empty')}
        </ThemedText>
      ) : (
        <View style={[styles.group, { borderColor: theme.goldSoft }]}>
          {voices.map((voice, index) => (
            <View
              key={voice.folder}
              style={[
                styles.row,
                (index < voices.length - 1 || reciteBytes > 0) && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: theme.border,
                },
              ]}>
              <View style={styles.rowText}>
                <ThemedText type="default">{reciterNameFor(voice.folder)}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {`${voice.files} ${t('settings.storage.files')} · ${megabytes(voice.bytes)} MB`}
                </ThemedText>
              </View>
              <Pressable
                onPress={() => remove(voice.folder)}
                accessibilityRole="button"
                accessibilityLabel={`${t('settings.storage.delete')} — ${reciterNameFor(voice.folder)}`}
                hitSlop={8}>
                <ThemedText type="smallBold" themeColor="accent">
                  {t('settings.storage.delete')}
                </ThemedText>
              </Pressable>
            </View>
          ))}
          {reciteBytes > 0 && (
            <View style={styles.row}>
              <View style={styles.rowText}>
                <ThemedText type="default">{t('settings.storage.recite')}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {`${megabytes(reciteBytes)} MB`}
                </ThemedText>
              </View>
              <Pressable
                onPress={removeReciteModels}
                accessibilityRole="button"
                accessibilityLabel={`${t('settings.storage.delete')} — ${t('settings.storage.recite')}`}
                hitSlop={8}>
                <ThemedText type="smallBold" themeColor="accent">
                  {t('settings.storage.delete')}
                </ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

/** Folders are named for the host's path; readers are not. */
function reciterNameFor(folder: string): string {
  return RECITERS.find((reciter) => reciter.folder === folder)?.name ?? folder;
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
  group: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  /* The page's ruled row: eight points of air, no side inset. */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
});
