/**
 * ⚠️ SAFETY CONTENT — read by a person before it ships. Not yet read by Iyad.
 *
 * Two lists, and neither is religious content: a list of phrases and a list
 * of people who answer the phone.
 *
 * ## The phrases
 *
 * What the ask sheet matches, offline, on whole words, while somebody types
 * into "Tell us what you were looking for". A match shows the resources
 * above the Send button. It never blocks the send, and it never sends
 * anything on its own. The matcher is a list and a regular expression, not
 * a model, and that is the point: a list can be read, and a phrase it does
 * not hold leaves the reader exactly where they were. A false positive costs
 * a card the reader can ignore, so the list leans generous.
 *
 * Whole words only, so "die" never fires inside "diet". Lowercase, English.
 * Never grow this list with generated phrases nobody has read.
 *
 * The check script reads the example sentences below and asserts each one.
 *
 *   MATCH:    i want to kill myself
 *   MATCH:    I don't want to live anymore
 *   MATCH:    thinking about ending it all
 *   MATCH:    my husband hits me and I am scared
 *   NO MATCH: my diet during ramadan
 *   NO MATCH: what breaks wudu
 *   NO MATCH: i killed a spider during prayer
 *   NO MATCH: dead phone battery at fajr
 *
 * ## The resources
 *
 * Iyad's choice, 5 Sep 2026, in this order: emergency services first, 988
 * for the United States, Samaritans for the UK and Ireland, Find A Helpline
 * for everywhere else, and Naseeha as Muslim-informed support listed after
 * the crisis lines and never instead of them.
 *
 * Every entry was checked on the organisation's own site on the date in its
 * comment, and nothing here is typed from memory. A wrong number on this
 * page is the one content error in the app worse than a wrong ruling. When
 * a number or an hour changes, re-read the page named in the comment and
 * change the entry in the same commit.
 */

/** Matched on whole words, case-insensitively. See the header. */
export const CRISIS_PHRASES: readonly string[] = [
  /* Ending one's life. */
  'kill myself',
  'killing myself',
  'end my life',
  'ending my life',
  'take my own life',
  'suicide',
  'suicidal',
  'want to die',
  'wanted to die',
  'wish i was dead',
  'wish i were dead',
  'better off dead',
  "don't want to live",
  'dont want to live',
  'do not want to live',
  'no reason to live',
  'not worth living',
  "can't go on",
  'cant go on',
  'cannot go on',
  'end it all',
  'ending it all',
  'want to disappear',
  /* Harming oneself. */
  'hurt myself',
  'hurting myself',
  'harm myself',
  'harming myself',
  'self harm',
  'self-harm',
  'cut myself',
  'cutting myself',
  'overdose',
  /* Danger from someone else. */
  'going to kill me',
  'threatened to kill me',
  'hits me',
  'beats me',
  'afraid for my life',
  'not safe at home',
];

export type CrisisResource = {
  id: string;
  /** Who it is, as the reader sees it. */
  name: string;
  /** Where it works, in plain words. */
  region: string;
  /** One or two sentences: how to reach it, and when. */
  how: string;
  /** For tap-to-call. Exactly as the service prints it. */
  phone?: string;
  /** For tap-to-open. */
  url?: string;
};

/**
 * In the order they are shown. The first is not an organisation; it is the
 * instruction every helpline's own page gives before its number.
 */
export const CRISIS_RESOURCES: readonly CrisisResource[] = [
  {
    id: 'emergency',
    name: 'Emergency services',
    region: 'Wherever you are',
    /*
      Checked 5 Sep 2026. 999: nhs.uk, "Help for suicidal thoughts" — "call 999
      for an ambulance or go straight to A&E". 112: europa.eu, "Emergency
      number 112" — "free of charge from fixed and mobile phones everywhere in
      the EU". 911 in Canada: naseeha.org/helpline-textline — "please call
      911, or go to your nearest emergency department".

      ⚠️ 911 for the United States is NOT printed yet. Every official page
      tried on 5 Sep 2026 (911.gov, fcc.gov, usa.gov, nhtsa.gov) refused an
      automated request, and 988lifeline.org and samhsa.gov do not state it.
      Iyad confirms it when he reads this list, and adds "911 in the United
      States and Canada" to the sentence below in the same commit.
    */
    how: 'If you are in danger right now, or have already hurt yourself, call the emergency number where you are: 911 in Canada, 999 in the UK, 112 anywhere in the EU. Or go to the nearest emergency department.',
  },
  {
    id: '988',
    name: '988 Suicide & Crisis Lifeline',
    region: 'United States and its territories',
    /*
      Checked 5 Sep 2026 at 988lifeline.org and 988lifeline.org/about: call or
      text 988, chat at chat.988lifeline.org, "24 hours a day, 7 days a week,
      across the United States and its territories", "free and confidential".
      Spanish text and chat available.
    */
    how: 'Call or text 988, any hour. Free and confidential. You can also chat on their website.',
    phone: '988',
    url: 'https://988lifeline.org/',
  },
  {
    id: 'samaritans',
    name: 'Samaritans',
    region: 'UK and Ireland',
    /*
      Checked 5 Sep 2026 at samaritans.org/how-we-can-help/contact-samaritan
      and samaritans.org/ireland: 116 123, "free to call from both landlines
      and mobiles", "24 hours a day, 365 days a year", "We won't judge or tell
      you what to do". The email service is closing during 2026, so only the
      number is printed.
    */
    how: 'Call 116 123, free from any phone, any hour. They listen, and they will not judge you or tell you what to do.',
    phone: '116 123',
    url: 'https://www.samaritans.org/',
  },
  {
    id: 'find-a-helpline',
    name: 'Find A Helpline',
    region: 'Everywhere else',
    /*
      Checked 5 Sep 2026 at findahelpline.com: "Free, confidential support
      from a helpline or hotline near you. Online chat, text or phone",
      "verified helplines in 175+ countries", a public service by
      ThroughLine. The site has a quick-exit button.
    */
    how: 'Choose your country and it shows free, confidential helplines you can call, text or chat with. It covers more than 175 countries.',
    url: 'https://findahelpline.com/',
  },
  {
    id: 'naseeha',
    name: 'Naseeha',
    region: 'Canada. Muslim-informed support',
    /*
      Checked 5 Sep 2026 at naseeha.org and naseeha.org/helpline-textline:
      1-866-627-3342, phone and text, "24/7", "Muslim youth and adults alike",
      based in Mississauga, Ontario. Their own emergency line: "If you have
      already taken steps to end your life or seriously harm yourself, please
      call 911, or go to your nearest emergency department." The site does
      not say whether callers outside Canada can reach the number, so this
      entry does not claim it.
    */
    how: 'A free Muslim mental-health helpline, any hour, for young people and adults. Call or text 1-866-627-3342. It is support rather than an emergency service, and their own page says to call 911 if you have already hurt yourself.',
    phone: '1-866-627-3342',
    url: 'https://naseeha.org/helpline-textline/',
  },
];
