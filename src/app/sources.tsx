import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AUDIO_SOURCE_BY_ID, SOURCES, type AudioSource } from '@/content/audio-sources';
import { RECITERS } from '@/content/quran/recitation';
import { JUZ30_SOURCE } from '@/content/quran/surahs';
import { creditedTextSources } from '@/content/text-sources';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { Teaching } from '@/constants/teaching';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * Every publisher whose words or voice the app carries.
 *
 * ## Why this page exists
 *
 * Attribution used to ride under each narration, which put "HadeethEnc.com ·
 * Darussalam (via fawazahmed0/hadith-api)" on a teaching screen underneath a
 * hadith. That is build plumbing, and it reads to a beginner as though the app
 * were citing a website rather than Bukhari. It came off; the obligation it
 * discharged had to land somewhere, and this is somewhere better — a person
 * looking for it can find it, which was never true of a line inside a
 * collapsed drawer under the third duʿa on a page.
 *
 * ## Nothing here is typed by hand
 *
 * The text publishers are counted out of the texts themselves and the voices
 * out of `audio-sources.ts`, so a source entering or leaving the app changes
 * this page without anybody remembering to. What is hand-written is only the
 * part that cannot be derived: where each one publishes.
 *
 * ## No links, deliberately, for now
 *
 * Naming where a publisher lives satisfies the obligation. Making it tappable
 * would be the first thing in this app that sends somebody off the device and
 * into a browser, and that is Iyad's call to make rather than a detail of a
 * credits page. One line here when he wants it.
 */
export default function SourcesScreen() {
  const { t } = useLocale();
  const texts = creditedTextSources();

  /*
    The voices actually in the app, from the two places audio is wired up:
    the bundled clips and the Qur'an tab's picker.

    Reading `SOURCES` directly would have been simpler and was wrong. It also
    holds `commissioned` — the placeholder standing in for the twenty clips
    nobody has recorded yet — so the page credited a reciter called "To be
    commissioned" at "Recorded for this app". Deriving from what is wired
    instead means a voice appears here the day its audio does, and never
    before.

    Deduplicated by voice rather than by clip: several entries are the same
    reciter at a different recitation style, and a list naming Al-Husary three
    times reads as a bug.
  */
  const wired: AudioSource[] = [
    ...Object.values(AUDIO_SOURCE_BY_ID).map((key) => SOURCES[key]),
    ...RECITERS.map((reciter) => reciter.source),
  ];
  const voices = [
    ...new Map(wired.map((source) => [`${source.reciter}·${source.origin}`, source])).values(),
  ].sort((a, b) => a.reciter.localeCompare(b.reciter));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ThemedText type={Teaching.subtitle.type} themeColor={Teaching.subtitle.color}>
        {t('sources.intro')}
      </ThemedText>

      <Group title={t('sources.quran')}>
        <Credit first name={JUZ30_SOURCE.arabic} detail={t('sources.quran.arabic')} />
        <Credit name={JUZ30_SOURCE.translation} detail={t('sources.quran.translation')} />
      </Group>

      <Group title={t('sources.texts')}>
        {texts.map((credit, index) => (
          <Credit
            key={credit.name}
            first={index === 0}
            name={credit.name}
            where={credit.source?.where}
            detail={supplied(credit.arabic, credit.translation)}
          />
        ))}
      </Group>

      <Group title={t('sources.voices')}>
        {voices.map((voice, index) => (
          <Credit
            key={`${voice.reciter}·${voice.origin}`}
            first={index === 0}
            name={voice.reciter}
            where={voice.origin}
            detail={voice.detail}
          />
        ))}
      </Group>

      <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
        {t('sources.footnote')}
      </ThemedText>
    </ScrollView>
  );
}

/** "Arabic for 53 texts · English for 46" — counted, never asserted. */
function supplied(arabic: number, translation: number): string {
  return [
    arabic > 0 ? `Arabic for ${arabic}` : undefined,
    translation > 0 ? `English for ${translation}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={styles.group}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.groupTitle}>
        {title.toUpperCase()}
      </ThemedText>
      <View
        style={[styles.rows, { borderColor: theme.goldSoft }]}>
        {children}
      </View>
    </View>
  );
}

/** One publisher: who they are, what they gave, and where they publish it. */
function Credit({
  name,
  detail,
  where,
  first,
}: {
  name: string;
  detail?: string;
  /** Absent for a publisher in the data with no entry in the table — see
   * `text-sources.ts`. The name still prints; nothing quietly disappears. */
  where?: string;
  /** The group already draws a border; the first row's own would double it. */
  first?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.row, !first && { borderTopWidth: StyleSheet.hairlineWidth }, { borderTopColor: theme.border }]}>
      <ThemedText type="default">{name}</ThemedText>
      {detail ? (
        <ThemedText type="small" themeColor="textSecondary">
          {detail}
        </ThemedText>
      ) : null}
      {where ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {where}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Teaching.page.paddingH,
    paddingTop: Teaching.page.paddingV,
    paddingBottom: Teaching.page.paddingV * 2,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Teaching.page.sectionGap,
  },
  group: {
    gap: Spacing.two,
  },
  groupTitle: {
    letterSpacing: 1,
  },
  rows: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: Teaching.source.paddingH,
    paddingVertical: Spacing.three - 4,
    gap: 2,
  },
  footnote: {},
});
