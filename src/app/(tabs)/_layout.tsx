import { Tabs } from 'expo-router/tabs';

import { LanternMark, MisbahaMark, OpenBookMark, RehlMark } from '@/components/illustrations';
import { PillTabBar } from '@/components/pill-tab-bar';
import { useLocale } from '@/hooks/use-locale';

/*
  The four doors wear the app's own marks — the "objects of practice" set
  Iyad picked on 31 Aug 2026 and had redrawn after a reference on 6 Sep: a
  lantern, an open book, a rehl, a misbaha. The drawings live in
  `illustrations.tsx` beside every other mark. The bar itself is
  `PillTabBar` since the same day — the reference's pill, gold on the door
  you are in; its header records why gold, of all colours, is allowed there.
*/

export default function TabsLayout() {
  const { t } = useLocale();

  return (
    <Tabs tabBar={(props) => <PillTabBar {...props} />} screenOptions={{ headerShown: false }}>
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
          tabBarIcon: ({ color, size, focused }) => <LanternMark color={color} size={size} active={focused} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tab.learn'),
          tabBarIcon: ({ color, size }) => <OpenBookMark color={color} size={size} />,
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
        its own rule: Today holds what has a deadline, and a dua for putting
        on clothes has none.

        The tab opens on the day rather than on an index, because a convert
        does not know a dua for putting on clothes EXISTS and will never
        scroll to it. An index is a tool for somebody who already knows the
        name of what they want.
      */}
      <Tabs.Screen
        name="duas"
        options={{
          title: t('tab.duas'),
          tabBarIcon: ({ color, size, focused }) => <MisbahaMark color={color} size={size} active={focused} />,
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
