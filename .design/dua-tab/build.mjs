/**
 * Generates the Duʿa-tab mockup artboards from the app's REAL content and
 * tokens, so no Arabic and no colour is hand-typed into a design file.
 *
 * Run:  node --import ./scripts/ts-resolve.mjs .design/dua-tab/build.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

const { HISN } = await import('../../src/content/duas/hisn.ts');
const { ADHKAR_SESSIONS, stepsFor } = await import('../../src/content/duas/sessions.ts');

/*
  theme.ts imports `@/global.css`, which the TS loader cannot resolve outside
  Metro, so the tokens are lifted out of the source text instead of imported.
  Each lookup throws rather than defaulting: a mockup quietly drawn in the
  wrong green is worse than one that fails to build.
*/
const THEME_SRC = readFileSync(join(OUT, '../../src/constants/theme.ts'), 'utf8');

function tokenBlock(name) {
  const start = THEME_SRC.indexOf(`export const ${name} = {`);
  if (start === -1) throw new Error(`theme.ts no longer exports ${name}`);
  const end = THEME_SRC.indexOf('} as const;', start);
  if (end === -1) throw new Error(`could not find the end of ${name} in theme.ts`);
  return THEME_SRC.slice(start, end);
}

function scalars(name) {
  const out = {};
  for (const [, key, value] of tokenBlock(name).matchAll(/(\w+):\s*(\d+),/g)) out[key] = Number(value);
  if (Object.keys(out).length === 0) throw new Error(`no values parsed out of ${name}`);
  return out;
}

function palette(scheme) {
  const block = tokenBlock('Colors');
  const start = block.indexOf(`${scheme}: {`);
  if (start === -1) throw new Error(`Colors has no ${scheme} scheme`);
  const slice = block.slice(start, block.indexOf('},', start));
  const out = {};
  for (const [, key, value] of slice.matchAll(/(\w+):\s*'(#[0-9A-Fa-f]{6})'/g)) out[key] = value;
  for (const key of ['text', 'textSecondary', 'textOnAccent', 'background', 'backgroundElement', 'accent', 'border']) {
    if (!out[key]) throw new Error(`${scheme}.${key} missing from theme.ts`);
  }
  return out;
}

const Colors = { light: palette('light'), dark: palette('dark') };
const Spacing = scalars('Spacing');
const Radius = scalars('Radius');

/* ---------------------------------------------------------------- content */

const occasion = (id) => HISN.find((o) => o.id === id);
const session = (id) => ADHKAR_SESSIONS.find((s) => s.id === id);

/*
  Morning and evening share ONE heading in the book — أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ.
  Split mechanically rather than rewritten: the morning name is its first two
  words verbatim; the evening name is the same first word plus the third with
  its leading conjunction وَ removed. Nothing is composed.
*/
const HEADING = occasion(1269190).arabic;
const [w0, w1, w2] = HEADING.split(' ');
const WAW = 'وَ';
if (!w2.startsWith(WAW)) throw new Error('evening heading no longer starts with وَ: ' + w2);
const AR_MORNING = `${w0} ${w1}`;
const AR_EVENING = `${w0} ${w2.slice(WAW.length)}`;
const AR_SLEEP = occasion(1269267).arabic;
const AR_AFTER = occasion(1269149).arabic;
/* The book's own title. A name, not a quotation — nothing in hisn.ts carries it. */
const AR_HISN = 'حِصْنُ الْمُسْلِمِ';

const MEAL = occasion(1269507);

const count = (id) => stepsFor(session(id)).length;
const minutes = (id) => session(id).minutes;

/* ----------------------------------------------------------------- tokens */

const T = {
  light: Colors.light,
  dark: Colors.dark,
};

const S = Spacing;
const R = Radius;

/* iPhone 14/15 logical frame, real safe areas, no fake system chrome. */
const FRAME = { w: 390, h: 844, safeTop: 47, tabBar: 50, homeIndicator: 34 };
const CONTENT_BOTTOM = FRAME.h - FRAME.homeIndicator - FRAME.tabBar;

/* ------------------------------------------------------------------ icons */

/* Ionicons *-outline, redrawn as strokes on a 24 grid. */
const ICONS = {
  moon: '<path d="M20.6 15.6A8.8 8.8 0 0 1 8.4 3.4 9.3 9.3 0 1 0 20.6 15.6Z"/>',
  book:
    '<path d="M12 6.7C10 5 7.6 4.2 4.7 4.4a1 1 0 0 0-.9 1v11.7a1 1 0 0 0 1 1c2.8-.2 5.2.6 7.2 2.2 2-1.6 4.4-2.4 7.2-2.2a1 1 0 0 0 1-1V5.4a1 1 0 0 0-.9-1c-2.9-.2-5.3.6-7.3 2.3Z"/><path d="M12 6.7v13.6"/>',
  bookmarks:
    '<path d="M17.4 20.8 12 17.4l-5.4 3.4V7.2a1.8 1.8 0 0 1 1.8-1.8h7.2a1.8 1.8 0 0 1 1.8 1.8Z"/><path d="M9.4 3.2h7.2a1.8 1.8 0 0 1 1.8 1.8v11.4"/>',
  sunny:
    '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5M18.6 18.6l-1.5-1.5M6.9 6.9 5.4 5.4"/>',
  settings:
    '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 14.2a1.6 1.6 0 0 0 .3 1.8l.1.1a1.9 1.9 0 1 1-2.7 2.7l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5v.3a1.9 1.9 0 1 1-3.8 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a1.9 1.9 0 1 1-2.7-2.7l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1h-.3a1.9 1.9 0 1 1 0-3.8h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a1.9 1.9 0 1 1 2.7-2.7l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5v-.3a1.9 1.9 0 1 1 3.8 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a1.9 1.9 0 1 1 2.7 2.7l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.3a1.9 1.9 0 1 1 0 3.8h-.2a1.6 1.6 0 0 0-1.5 1Z"/>',
};

const TABS = [
  { icon: 'moon', label: 'Today' },
  { icon: 'book', label: 'Learn' },
  { icon: 'bookmarks', label: 'Qur’an' },
  { icon: 'sunny', label: 'Duʿa', active: true },
  { icon: 'settings', label: 'Settings' },
];

function tabBar(c) {
  const items = TABS.map((tab) => {
    const colour = tab.active ? c.accent : c.textSecondary;
    return `      <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; flex-grow: 1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colour}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[tab.icon]}</svg>
        <span style="font-size: 11px; line-height: 14px; font-weight: 500; color: ${colour}">${tab.label}</span>
      </div>`;
  }).join('\n');

  return `    <div style="position: absolute; left: 0; right: 0; top: ${CONTENT_BOTTOM}px; height: ${FRAME.tabBar}px; display: flex; align-items: center; padding: 6px 0 0; background: ${c.background}; border-top: 1px solid ${c.border}">
${items}
    </div>`;
}

/* --------------------------------------------------------------- fragments */

/** As shipped: a bare word, tight to the safe area, with no header block. */
function titleOnly(c) {
  return `    <h1 class="subtitle" style="flex-shrink: 0; margin: 0; color: ${c.text}">Duʿa</h1>`;
}

/**
 * Proposed: the header idiom Learn and Qur'an already share —
 * `{ gap: Spacing.two, paddingTop: Spacing.four }` and a line saying what the
 * tab is for. This is the one tab most likely to open on a word its reader
 * does not have.
 */
function header(c, intro) {
  return `    <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: ${S.two}px; padding-top: ${S.four}px">
      <h1 class="subtitle" style="margin: 0; color: ${c.text}">Duʿa</h1>
      <p class="default" style="margin: 0; color: ${c.textSecondary}; text-wrap: pretty">${intro}</p>
    </div>`;
}

/** The card shell both heroes share: rail, border, radius, padding. */
function heroShell(c, inner) {
  return `    <div style="flex-shrink: 0; position: relative; overflow: hidden; border-radius: ${R.medium}px; border: 1px solid ${c.border}; background: ${c.backgroundElement}; padding: ${S.four}px; display: flex; flex-direction: column; gap: ${S.two}px">
      <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${c.accent}"></div>
${inner}
    </div>`;
}

function startButton(c) {
  return `      <div style="margin-top: ${S.two}px; min-height: 44px; border-radius: ${R.small}px; background: ${c.accent}; display: flex; align-items: center; justify-content: center">
        <span class="smallBold" style="color: ${c.textOnAccent}">Start</span>
      </div>`;
}

/** As shipped: an uppercase kicker naming the boundary that has already passed. */
function heroCurrent(c) {
  return heroShell(
    c,
    `      <span class="caption" style="color: ${c.textSecondary}; text-transform: uppercase; letter-spacing: 1px">Asr was 4:52 PM</span>
      <span class="cardTitle" style="color: ${c.text}">Evening adhkār</span>
      <span class="small" style="color: ${c.textSecondary}">${count('evening')}&nbsp; ·&nbsp; about ${minutes('evening')} minutes</span>
${startButton(c)}`,
  );
}

/** Proposed: the deadline in the app's own voice, and the sitting's Arabic name. */
function heroProposed(c) {
  return heroShell(
    c,
    `      <span class="small" style="color: ${c.textSecondary}">ends at Isha, 9:02 PM</span>
      <span class="cardTitle" style="color: ${c.text}">Evening adhkār</span>
      <span class="arabic arabicName" style="color: ${c.text}; text-align: right; direction: rtl">${AR_EVENING}</span>
      <span class="small" style="color: ${c.textSecondary}">${count('evening')} to say&nbsp; ·&nbsp; about ${minutes('evening')} minutes</span>
${startButton(c)}`,
  );
}

/** One duʿa chosen for the hours that belong to no sitting. Unchanged component. */
function duaCard(c) {
  return `    <div style="flex-shrink: 0; border-radius: ${R.medium}px; border: 1px solid ${c.border}; background: ${c.backgroundElement}; padding: ${S.four}px; display: flex; flex-direction: column; gap: ${S.two}px">
      <span class="caption" style="color: ${c.textSecondary}; text-transform: uppercase; letter-spacing: 1px">For about now</span>
      <span class="cardTitle" style="color: ${c.text}; text-wrap: pretty">${MEAL.english}</span>
      <p class="arabic arabicLead" style="margin: 0; color: ${c.text}; text-align: right; direction: rtl">${MEAL.lines[0].arabic}</p>
      <p class="small" style="margin: 0; color: ${c.textSecondary}; text-wrap: pretty">${MEAL.lines[0].english}</p>
    </div>`;
}

/** As shipped: a word, and a numeral whose unit is never stated. */
function rowCurrent(c, { label, n, muted }) {
  return `      <div style="display: flex; align-items: center; justify-content: space-between; gap: ${S.three}px; min-height: 48px; padding: ${S.two}px 0; border-bottom: 1px solid ${c.border}">
        <span class="default" style="color: ${muted ? c.textSecondary : c.text}">${label}</span>
        <span class="caption" style="color: ${c.textSecondary}">${n}</span>
      </div>`;
}

/** Proposed: the unit said out loud, and the sitting's name in its own script. */
function rowProposed(c, { label, meta, arabic, muted }) {
  return `      <div style="display: flex; flex-direction: column; gap: ${S.one}px; padding: ${S.two}px 0; border-bottom: 1px solid ${c.border}">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${S.three}px">
          <span class="default" style="color: ${muted ? c.textSecondary : c.text}">${label}</span>
          <span class="caption" style="color: ${c.textSecondary}; white-space: nowrap">${meta}</span>
        </div>
        <span class="arabic arabicName" style="color: ${muted ? c.textSecondary : c.text}; text-align: right; direction: rtl">${arabic}</span>
      </div>`;
}

const SESSION_ROWS = {
  morning: { label: 'Morning adhkār', arabic: AR_MORNING, n: count('morning'), min: minutes('morning') },
  evening: { label: 'Evening adhkār', arabic: AR_EVENING, n: count('evening'), min: minutes('evening') },
  sleep: { label: 'Before sleep', arabic: AR_SLEEP, n: count('sleep'), min: minutes('sleep') },
  'after-prayer': { label: 'After the prayer', arabic: AR_AFTER, n: count('after-prayer'), min: minutes('after-prayer') },
};

const HISN_ROW = { label: 'Hisn al-Muslim', arabic: AR_HISN, n: HISN.length, muted: true };

function rows(c, ids, kind) {
  const body = ids
    .map((id) => {
      if (id === 'hisn') {
        return kind === 'current'
          ? rowCurrent(c, { label: HISN_ROW.label, n: HISN_ROW.n, muted: true })
          : rowProposed(c, {
              label: HISN_ROW.label,
              meta: `${HISN_ROW.n} occasions`,
              arabic: HISN_ROW.arabic,
              muted: true,
            });
      }
      const r = SESSION_ROWS[id];
      return kind === 'current'
        ? rowCurrent(c, { label: r.label, n: r.n })
        : rowProposed(c, { label: r.label, meta: `${r.n} to say · ${r.min} min`, arabic: r.arabic });
    })
    .join('\n');

  return `    <div style="flex-shrink: 0; border-top: 1px solid ${c.border}">
${body}
    </div>`;
}

/* ------------------------------------------------------------------ shell */

const INTRO = 'Short sets of words said at fixed points in the day — and a duʿa for almost anything else.';

function screen({ theme, body, bottomPad }) {
  const c = T[theme];
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri&display=swap">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, "SF Pro Text", system-ui, "Segoe UI", sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    a { color: ${c.accent}; }
    a:hover { color: ${c.text}; }
    /* The twelve rungs of src/components/themed-text.tsx, unchanged. */
    .caption { font-size: 12px; line-height: 16px; font-weight: 600; }
    .small { font-size: 14px; line-height: 20px; font-weight: 500; }
    .smallBold { font-size: 14px; line-height: 20px; font-weight: 700; }
    .default { font-size: 16px; line-height: 26px; font-weight: 500; }
    .cardTitle { font-size: 20px; line-height: 26px; font-weight: 600; }
    .subtitle { font-size: 30px; line-height: 38px; font-weight: 600; }
    .arabic { font-family: Amiri, "Scheherazade New", "Geeza Pro", "Times New Roman", serif; }
    .arabicName { font-size: 22px; line-height: 32px; }
    .arabicLead { font-size: 26px; line-height: 52px; }
  </style>
</helmet>
<div style="position: relative; width: ${FRAME.w}px; height: ${FRAME.h}px; overflow: hidden; background: ${c.background}">
  <div style="position: absolute; left: 0; right: 0; top: ${FRAME.safeTop}px; bottom: ${FRAME.h - CONTENT_BOTTOM}px; overflow: hidden; display: flex; flex-shrink: 0; flex-direction: column; gap: ${S.four}px; padding: ${S.four}px ${S.four}px ${bottomPad}px">
${body}
  </div>
${tabBar(c)}
</div>
</x-dc>
</body>
</html>
`;
}

/* --------------------------------------------------------------- artboards */

const files = {
  /* As shipped, read off src/app/(tabs)/duas.tsx. */
  'Current.dc.html': screen({
    theme: 'light',
    bottomPad: S.six,
    body: [
      titleOnly(T.light),
      heroCurrent(T.light),
      rows(T.light, ['morning', 'sleep', 'after-prayer', 'hisn'], 'current'),
    ].join('\n'),
  }),

  'Main.dc.html': screen({
    theme: 'light',
    bottomPad: S.four,
    body: [
      header(T.light, INTRO),
      heroProposed(T.light),
      rows(T.light, ['morning', 'sleep', 'after-prayer', 'hisn'], 'proposed'),
    ].join('\n'),
  }),

  'Dark.dc.html': screen({
    theme: 'dark',
    bottomPad: S.four,
    body: [
      header(T.dark, INTRO),
      heroProposed(T.dark),
      rows(T.dark, ['morning', 'sleep', 'after-prayer', 'hisn'], 'proposed'),
    ].join('\n'),
  }),

  /* The seven-to-thirteen hours a day that belong to no sitting. */
  'Quiet.dc.html': screen({
    theme: 'light',
    bottomPad: S.four,
    body: [
      header(T.light, INTRO),
      duaCard(T.light),
      rows(T.light, ['morning', 'evening', 'sleep', 'after-prayer', 'hisn'], 'proposed'),
    ].join('\n'),
  }),
};

for (const [name, source] of Object.entries(files)) {
  writeFileSync(join(OUT, name), source, 'utf8');
}

const canvas = {
  artboards: [
    { file: 'Current.dc.html', x: 0, y: 0, w: FRAME.w, h: FRAME.h, title: 'As shipped' },
    { file: 'Main.dc.html', x: 470, y: 0, w: FRAME.w, h: FRAME.h, title: 'Proposed' },
    { file: 'Dark.dc.html', x: 940, y: 0, w: FRAME.w, h: FRAME.h, title: 'Proposed · dark' },
    { file: 'Quiet.dc.html', x: 470, y: 964, w: FRAME.w, h: FRAME.h, title: 'Proposed · no sitting open' },
  ],
  annotations: [
    {
      id: 'note-current',
      x: 0,
      y: -150,
      w: 390,
      text: 'As shipped.\nFour words, four numerals, no Arabic — and 154px of empty screen below the last row on a 390x844 iPhone. More on a taller one.',
    },
    {
      id: 'note-main',
      x: 470,
      y: -150,
      w: 390,
      text: 'Proposed.\nNo new component and nothing scrolls. Every row carries the sitting’s own name in Amiri, the numeral finally says what it counts, and the card states the deadline instead of a boundary that has already passed.\n\nBuilt and shipped as drawn, with two corrections the running screen forced: the evening window closes at ʿIshāʾ, not Maghrib — it is the union of the mainstream positions, so ʿIshāʾ is the honest end — and the hero’s Arabic sits on its own line, because الأَذْكَارُ بَعْدَ السَّلاَمِ مِنَ الصَّلاَةِ collided with the title when set beside it.',
    },
    {
      id: 'note-dark',
      x: 940,
      y: -150,
      w: 390,
      text: 'Same screen on the dark tokens. A lot of this app is used before Fajr.',
    },
    {
      id: 'note-quiet',
      x: 0,
      y: 964,
      w: 390,
      text: 'Roughly half the waking day belongs to no sitting. The duʿa card leads, all five become rows, and the screen scrolls — the cut at the bottom is the real fold.',
    },
    {
      id: 'note-arabic',
      x: 1410,
      y: 0,
      w: 340,
      text: 'One thing needs your eye.\n\nHisn prints ONE heading for both sittings — أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ. The two names here are that heading split mechanically, not rewritten: the morning is its first two words verbatim, the evening is the same first word plus the third with its leading وَ removed. Nothing was composed, but the vowelling wants checking.\n\nحِصْنُ الْمُسْلِمِ is the book’s title and is the one string on the canvas that is not in src/content — nothing in hisn.ts carries it.',
    },
  ],
  launch: { view: 'canvas' },
};

writeFileSync(join(OUT, 'canvas.json'), JSON.stringify(canvas, null, 2), 'utf8');

console.log('wrote', Object.keys(files).join(', '), 'and canvas.json');
console.log('content area:', FRAME.safeTop, '→', CONTENT_BOTTOM, `(${CONTENT_BOTTOM - FRAME.safeTop}px)`);
