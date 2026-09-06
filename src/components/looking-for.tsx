import Constants from 'expo-constants';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { INPUT_TEXT, ThemedText } from '@/components/themed-text';
import { CRISIS_RESOURCES, type CrisisResource } from '@/content/crisis';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { matchesCrisis } from '@/lib/crisis';
import { submitGap } from '@/lib/submit-gap';

/**
 * "Tell us what you were looking for" — the one line on the ask sheet's empty
 * card, and the only thing in this app that leaves the phone by choice.
 *
 * Five states, in order: an offer line; the field, prefilled with what was
 * searched, under the disclosure, over Send; sending; sent; and failed, which
 * keeps the reader's words on screen with Send restored. A change to the
 * search resets to the offer: the sheet keys this on the query, so a new
 * search is a fresh mount, not an effect. Nothing here is persisted —
 * unmounting discards all of it — and there is no retry: one attempt, eight
 * seconds, done.
 *
 * ## The crisis card
 *
 * If the text matches the phrase list in `content/crisis.ts` — a list, not a
 * model — the resources render ABOVE the Send row, and Send stays. Taking the
 * button away from someone who has just decided to reach out reads as "even
 * this app won't take my words". After a crisis-matched send the resources
 * show again instead of the thank-you, because "thanks" is the wrong word to
 * leave on that screen. Editing the text is the only way the card goes.
 *
 * Decided with Iyad, 5 Sep 2026; the plan is
 * docs/superpowers/plans/2026-09-05-tell-us-what-you-were-looking-for.md.
 */

type State = 'offer' | 'open' | 'sending' | 'sent' | 'failed';

/** 1,000 characters, the contract's cap. The field stops there rather than the server. */
const TEXT_LIMIT = 1000;

/** The app version the disclosure names. `expoConfig` is nullable on the SDK's own typing. */
const APP_VERSION = Constants.expoConfig?.version ?? 'unknown';

export function LookingFor({ query }: { query: string }) {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const [state, setState] = useState<State>('offer');
  const [text, setText] = useState(query);
  const [sentCrisis, setSentCrisis] = useState(false);

  const crisis = matchesCrisis(text);
  const trimmed = text.trim();

  const send = async () => {
    if (!trimmed || state === 'sending') return;
    setState('sending');
    const result = await submitGap({ text: trimmed, locale, appVersion: APP_VERSION });
    if (result === 'sent') setSentCrisis(crisis);
    setState(result);
  };

  if (state === 'offer') {
    return (
      <Pressable
        onPress={() => setState('open')}
        accessibilityRole="button"
        accessibilityLabel={t('ask.gap.offer')}
        style={({ pressed }) => [styles.offer, pressed && { opacity: 0.6 }]}>
        <ThemedText type="small" themeColor="accent">
          {t('ask.gap.offer')}
        </ThemedText>
      </Pressable>
    );
  }

  if (state === 'sent') {
    return sentCrisis ? (
      <CrisisCard />
    ) : (
      <ThemedText type="default" style={styles.sent}>
        {t('ask.gap.sent')}
      </ThemedText>
    );
  }

  const sending = state === 'sending';
  return (
    <View style={styles.block}>
      <TextInput
        value={text}
        onChangeText={setText}
        editable={!sending}
        multiline
        maxLength={TEXT_LIMIT}
        accessibilityLabel={t('ask.gap.offer')}
        style={[styles.field, INPUT_TEXT, { color: theme.text, borderColor: theme.border }]}
      />
      <ThemedText type="small" themeColor="textSecondary">
        {t('ask.gap.disclosure')}
      </ThemedText>
      {crisis && <CrisisCard />}
      {state === 'failed' && <ThemedText type="default">{t('ask.gap.failed')}</ThemedText>}
      <Pressable
        onPress={() => void send()}
        disabled={sending || trimmed.length === 0}
        accessibilityRole="button"
        accessibilityLabel={t('ask.gap.send')}
        style={({ pressed }) => [
          styles.send,
          { backgroundColor: theme.accent, opacity: pressed || sending || trimmed.length === 0 ? 0.6 : 1 },
        ]}>
        <ThemedText type="smallBold" themeColor="textOnAccent">
          {sending ? t('ask.gap.sending') : t('ask.gap.send')}
        </ThemedText>
      </Pressable>
    </View>
  );
}

/**
 * The resources, as a painted box. Not dismissible: it leaves when the words
 * that summoned it do. Every row with a number or a site opens it on tap.
 */
function CrisisCard() {
  const theme = useTheme();
  const { t } = useLocale();
  return (
    <View style={[styles.crisis, { backgroundColor: theme.backgroundSelected }]}>
      <ThemedText type="smallBold">{t('ask.gap.crisisTitle')}</ThemedText>
      <ThemedText type="small">{t('ask.gap.crisisBody')}</ThemedText>
      {CRISIS_RESOURCES.map((resource) => (
        <ResourceRow key={resource.id} resource={resource} />
      ))}
    </View>
  );
}

function ResourceRow({ resource }: { resource: CrisisResource }) {
  const href = resource.phone ? `tel:${resource.phone.replace(/\s+/g, '')}` : resource.url;
  const body = (
    <View style={styles.resourceText}>
      <ThemedText type="smallBold">
        {resource.name}
        <ThemedText type="small" themeColor="textSecondary">
          {` · ${resource.region}`}
        </ThemedText>
      </ThemedText>
      <ThemedText type="small">{resource.how}</ThemedText>
    </View>
  );
  if (!href) return <View style={styles.resource}>{body}</View>;
  return (
    <Pressable
      onPress={() => void Linking.openURL(href)}
      accessibilityRole="link"
      accessibilityLabel={`${resource.name}. ${resource.how}`}
      style={({ pressed }) => [styles.resource, pressed && { opacity: 0.7 }]}>
      {body}
      <ThemedText type="small" themeColor="accent">
        {resource.phone ?? hostOf(resource.url)}
      </ThemedText>
    </Pressable>
  );
}

/** The site's host, as the tappable word. */
const hostOf = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');

const styles = StyleSheet.create({
  /* A line, not a box: flush with the card's text, 44 tall for the thumb. */
  offer: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
  },
  block: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  field: {
    minHeight: 96,
    padding: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.small,
    textAlignVertical: 'top',
  },
  send: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  sent: {
    paddingVertical: Spacing.two,
  },
  crisis: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.small,
  },
  resource: {
    gap: Spacing.half,
    paddingTop: Spacing.one,
  },
  resourceText: {
    gap: Spacing.half,
  },
});
