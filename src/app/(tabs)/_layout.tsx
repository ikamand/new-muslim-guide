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
      {/*
        Named for the day rather than for one act on it. The tab still opens on
        the prayer times and the button that starts the next prayer — salah is
        still the spine — but the screen below them now answers "what should I
        do now" as well as "when", and calling that "Pray" would be a small lie
        about where the journey and the help row live.
      */}
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.today'),
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
      {/*
        Memorising is neither what Today asks nor what Learn asks. It has no
        deadline and it is not reading — it is a practice built over months, so
        it gets a tab rather than a card that would make it look like an
        article.
      */}
      <Tabs.Screen
        name="quran"
        options={{
          title: t('tab.quran'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmarks-outline" size={size} color={color} />
          ),
        }}
      />
      {/*
        Hisn al-Muslim is a book, not a topic, and a book gets a tab — the same
        judgement the Qur'an tab already carries. It also keeps Today obeying
        its own rule: Today holds what has a deadline, and a duʿa for putting
        on clothes has none.

        The tab opens on the day rather than on an index, because a convert
        does not know a duʿa for putting on clothes EXISTS and will never
        scroll to it. An index is a tool for somebody who already knows the
        name of what they want.
      */}
      <Tabs.Screen
        name="duas"
        options={{
          title: t('tab.duas'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sunny-outline" size={size} color={color} />
          ),
        }}
      />
      {/*
        No settings tab. It was the one tab that was neither worship nor
        content, and a tab advertises configuration as a primary activity —
        against the app's own rule that every setting is a decision handed to
        someone who didn't ask for one. Settings is the colophon at the end
        of Learn now: the page where the book talks about itself, on the
        book's last page.
      */}
    </Tabs>
  );
}
