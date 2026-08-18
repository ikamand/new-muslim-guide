import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DisplaySettingsProvider, useDisplaySettings } from '@/hooks/use-display-settings';
import { LocationProvider } from '@/hooks/use-location';

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { loaded } = useDisplaySettings();

  // Hold the splash until the stored settings are in. Otherwise the first
  // frame shows the defaults and then visibly corrects itself for anyone who
  // has turned a line off.
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

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
      <Stack.Screen name="qibla" options={{ title: 'Qibla', headerBackTitle: 'Back' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <DisplaySettingsProvider>
      <LocationProvider>
        <RootStack />
      </LocationProvider>
    </DisplaySettingsProvider>
  );
}
