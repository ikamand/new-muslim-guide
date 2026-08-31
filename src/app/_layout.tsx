import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useReminderSync } from '@/hooks/use-reminders';
import { SettingsProvider, useSettings } from '@/hooks/use-settings';
import { LocaleProvider } from '@/hooks/use-locale';
import { MemorisedProvider } from '@/hooks/use-memorised';
import { LocationProvider } from '@/hooks/use-location';
import { ObservationsProvider } from '@/hooks/use-observations';

SplashScreen.preventAutoHideAsync();

// Without this a reminder that fires while the app is open is swallowed —
// which is exactly when someone is most likely to be looking at the prayer
// times and least likely to forgive a missed alert.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function RootStack() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { loaded, onboarded } = useSettings();
  const router = useRouter();

  /*
    The one owner of the notification schedule. Mounted here, not on the
    Settings screen, so the twelve-day rolling window tops up on every
    launch — not only in sessions where Settings happened to be opened.
  */
  useReminderSync();

  /*
    Amiri, for the Arabic.

    Until now the app loaded no font at all, so every Arabic string rendered in
    whatever the platform fell back to — SF Arabic on iOS, Noto Naskh on
    Android. Two different faces, for the one part of this app that IS the
    content rather than a rendering of it.

    Amiri is modelled on the Bulaq naskh, the tradition Arabic religious text
    is actually set in, and it stacks the harakat properly — which matters
    because this app sets everything fully vocalised, and a shadda over a fatha
    over a lam is exactly where a UI face gives up.

    Regular only: nothing in the app sets Arabic bold, so the second weight
    would be 300KB of nothing. `useFonts` rather than the config plugin, so
    this ships over the air — expo-font has been a dependency since the first
    commit, so the native module is already in every build.

    A failure is not fatal. `fontsError` still lets the app through: the Arabic
    falls back to the platform face, which is exactly where it is today.
  */
  /*
    Literata, for the Latin headings — see `HeadingFont` in `constants/theme`.
    The subpath import matters: it bundles the one 250KB weight, where the
    package root would drag every weight and italic into the app.
  */
  const [fontsLoaded, fontsError] = useFonts({
    Amiri: require('@/assets/fonts/Amiri-Regular.ttf'),
    Literata_600SemiBold: require('@expo-google-fonts/literata/600SemiBold/Literata_600SemiBold.ttf'),
  });

  // Hold the splash until the stored settings are in. Otherwise the first
  // frame shows the defaults and then visibly corrects itself for anyone who
  // has turned a line off.
  // The redirect happens under the splash, so the first frame anyone sees is
  // already the right screen rather than the app briefly showing through.
  // The font is waited on for the same reason — Arabic reflowing from one face
  // to another on the first frame is more jarring than a slightly longer hold.
  useEffect(() => {
    if (!loaded || !(fontsLoaded || fontsError)) return;
    if (!onboarded) router.replace('/welcome');
    SplashScreen.hideAsync();
  }, [loaded, onboarded, router, fontsLoaded, fontsError]);

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerTitleStyle: { fontSize: 17, fontWeight: '600' },
        contentStyle: { backgroundColor: theme.background },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false, gestureEnabled: false }} />
      {/*
        The step player sits outside the tabs on purpose. Someone mid-prayer is
        holding the phone in one hand — a tab bar there is wasted space and a
        mis-tap away from losing their place.
      */}
      <Stack.Screen name="guide/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
      {/*
        Titles for these are set inside the screens, from the UI dictionary, so
        the journey reads in the user's language. The older routes below still
        carry English titles here — a pre-existing gap, not one this adds to.
      */}
      <Stack.Screen name="tier/[id]" options={{ title: '', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="unit/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
      <Stack.Screen name="library" options={{ title: '', headerBackTitle: 'Learn' }} />
      {/* Titled from the topic itself, in the reader's language. */}
      <Stack.Screen name="help/[topic]" options={{ title: '', headerBackTitle: 'Back' }} />
      <Stack.Screen
        name="pillars"
        options={{ title: 'The Five Pillars', headerBackTitle: 'Learn' }}
      />
      <Stack.Screen
        name="iman"
        options={{ title: 'The Six Articles of Faith', headerBackTitle: 'Learn' }}
      />
      <Stack.Screen
        name="phrases"
        options={{ title: 'What people say to you', headerBackTitle: 'Learn' }}
      />
      <Stack.Screen name="dua-book/index" options={{ title: 'Every occasion', headerBackTitle: 'Duʿa' }} />
      <Stack.Screen name="dua-book/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
      <Stack.Screen name="practice" options={{ title: 'Practice', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="pray" options={{ title: '', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="surah/[number]" options={{ title: '', headerBackTitle: 'Qur’an' }} />
      {/*
        A modal, not a push. Choosing a voice is a detour from the surah you
        are in the middle of, and it comes back to exactly that surah on the
        ayah it was already playing — a card sliding over says that, and a
        fourth screen pushed onto the stack says the opposite.
      */}
      <Stack.Screen name="reciter" options={{ presentation: 'modal', title: '' }} />
      {/*
        A modal for the same reason the reciter is one: asking a question is a
        detour from whatever screen you were on, and it returns you there. It
        carries no header — the field itself is the header, and it takes focus
        the moment the sheet opens so the keyboard is already up.
      */}
      <Stack.Screen name="ask" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="qibla" options={{ title: 'Qibla', headerBackTitle: 'Back' }} />
      <Stack.Screen name="sources" options={{ title: 'Sources', headerBackTitle: 'Settings' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LocaleProvider>
      <SettingsProvider>
        {/*
          Inside settings and outside location: it records what somebody does,
          which is never a reason to ask for a location fix.
        */}
        <ObservationsProvider>
        <LocationProvider>
          <MemorisedProvider>
            <RootStack />
          </MemorisedProvider>
        </LocationProvider>
        </ObservationsProvider>
      </SettingsProvider>
    </LocaleProvider>
  );
}
