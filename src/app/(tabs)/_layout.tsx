import { Tabs } from 'expo-router/tabs';

import { ArcadeMark, MisbahaMark, NicheMark, RehlMark } from '@/components/illustrations';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/*
  The four doors wear the app's own marks — the "objects of practice" set
  from the Four Doors sheet, Iyad's pick (31 Aug 2026): a niche, an arcade,
  a rehl, a misbaha. They replaced the last four stock Ionicons in the app;
  the drawings live in `illustrations.tsx` beside every other mark.
*/

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
          tabBarIcon: ({ color, size }) => <NicheMark color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tab.learn'),
          tabBarIcon: ({ color, size }) => <ArcadeMark color={color} size={size} />,
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
          tabBarIcon: ({ color, size }) => <RehlMark color={color} size={size} />,
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
          tabBarIcon: ({ color, size }) => <MisbahaMark color={color} size={size} />,
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
