import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PinStar } from '@/components/pin-star';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { HISN } from '@/content/duas/hisn';
import { hisnAt } from '@/content/duas/moments';
import { DAY_MOMENTS, type DayMoment } from '@/content';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * Hisn al-Muslim, as an index.
 *
 * ## An index is the wrong shape, and it is still needed
 *
 * The Duʿa tab opens on a day rather than a list, because a convert does not
 * know a duʿa for putting on clothes exists and will never scroll to it. That
 * argument has not changed and this screen does not contradict it — it sits
 * one tap underneath the day, for the other question: *is there a duʿa for
 * ____?* Somebody arrives here already knowing what they are looking for,
 * which is exactly when an index is the right tool.
 *
 * ## What is deliberately not claimed
 *
 * The book's 132 occasions are shown in the book's own order, and nothing here
 * calls a line a duʿa. Some of what Hisn al-Muslim quotes is narration about
 * the virtue of dhikr rather than words to recite, and telling those apart is
 * a reviewer's judgement, not a screen's. See `content/duas/hisn.ts`.
 *
 * ⚠️ REVIEW REQUIRED — the Arabic and the English are IslamHouse's published
 * book carried verbatim, so nothing here is model-written. What still needs a
 * reviewer is whether the app should be reproducing all of it, and whether any
 * occasion is one a beginner would be misled by.
 */
export default function DuaBookScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { moment } = useLocalSearchParams<{ moment?: string }>();

  /*
    Arriving from a moment on the day screen shows that moment's occasions
    only. Arriving from the tab's own link shows the whole book. Same screen,
    because two screens listing the same rows differently is how a codebase
    grows a second list that drifts.
  */
  const filtered = isMoment(moment) ? hisnAt(moment) : undefined;
  const occasions = filtered ?? HISN;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('duaBook.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {filtered ? t('duaBook.filtered') : t('duaBook.intro')}
      </ThemedText>

      {filtered ? (
        <PressableLink href="/dua-book" style={styles.showAll} pressedStyle={{ opacity: 0.6 }}>
          <ThemedText type="smallBold" themeColor="accent">
            {t('duaBook.showAll')}
          </ThemedText>
        </PressableLink>
      ) : null}

      <View style={styles.list}>
        {occasions.map((occasion) => (
          <PressableLink
            key={occasion.id}
            href={{ pathname: '/dua-book/[id]', params: { id: String(occasion.id) } }}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.rowText}>
              <ThemedText type="cardTitle">{occasion.english || occasion.arabic}</ThemedText>
              <ThemedText type="arabicNote" style={[styles.arabic, { color: theme.textSecondary }]}>
                {occasion.arabic}
              </ThemedText>
            </View>
            <ThemedText type="caption" themeColor="textSecondary">
              {occasion.lines.length}
            </ThemedText>
            {/*
              The star sits on the row as well as on the occasion's own page,
              because someone scanning the index for the duʿa they use every
              day should not have to open it to keep it.
            */}
            <PinStar id={occasion.id} size={19} />
          </PressableLink>
        ))}
      </View>
    </ScrollView>
  );
}

/** A route param is a string; this is the only place that has to care. */
function isMoment(value: string | undefined): value is DayMoment {
  return value !== undefined && (DAY_MOMENTS as readonly string[]).includes(value);
}

const styles = StyleSheet.create({
  showAll: {
    alignSelf: 'flex-start',
  },
  content: {
    /* 16, not 24: see the gutter note in `dua-book/[id].tsx`. */
    padding: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    flex: 1,
    gap: Spacing.one,
  },
  arabic: {
    /* size and face: the `arabicNote` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
