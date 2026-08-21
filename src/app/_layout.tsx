import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SettingsProvider, useSettings } from '@/hooks/use-settings';
import { LocaleProvider } from '@/hooks/use-locale';
import { LocationProvider } from '@/hooks/use-location';

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
  const [fontsLoaded, fontsError] = useFonts({
    Amiri: require('@/assets/fonts/Amiri-Regular.ttf'),
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
      <Stack.Screen name="journey/index" options={{ title: '', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="journey/[stage]" options={{ title: '', headerBackTitle: 'Back' }} />
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
      <Stack.Screen name="duas" options={{ title: 'Everyday duʿas', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="practice" options={{ title: 'Practice', headerBackTitle: 'Learn' }} />
      <Stack.Screen name="qibla" options={{ title: 'Qibla', headerBackTitle: 'Back' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LocaleProvider>
      <SettingsProvider>
        <LocationProvider>
          <RootStack />
        </LocationProvider>
      </SettingsProvider>
    </LocaleProvider>
  );
}
