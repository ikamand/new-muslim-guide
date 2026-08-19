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

  // Hold the splash until the stored settings are in. Otherwise the first
  // frame shows the defaults and then visibly corrects itself for anyone who
  // has turned a line off.
  // The redirect happens under the splash, so the first frame anyone sees is
  // already the right screen rather than the app briefly showing through.
  useEffect(() => {
    if (!loaded) return;
    if (!onboarded) router.replace('/welcome');
    SplashScreen.hideAsync();
  }, [loaded, onboarded, router]);

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
