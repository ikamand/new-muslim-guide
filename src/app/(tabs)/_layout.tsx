import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/tabs';

import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.pray'),
          tabBarIcon: ({ color, size }) => <Ionicons name="moon-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tab.learn'),
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tab.settings'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
