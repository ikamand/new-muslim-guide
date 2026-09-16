/**
 * Draws the widget picker's entries, from the data the widgets themselves draw.
 *
 * `npm run widget:preview` writes them; `npm run widget:check` runs this with
 * `--check` and fails if what is committed is not what this would write now.
 *
 * ## Why a generator, and not three hand-written layouts
 *
 * The picker runs before the app has ever stored a schedule, so a widget has
 * nothing true to show there. Hand-writing a preview means typing prayer names
 * and times into a layout: a second copy of five names that no check guards, in
 * a file nobody edits again, free to drift from the app the day a name changes.
 * Two of those names carry a modifier letter that mangles the moment it is
 * retyped, which is the whole reason `npm run narration:check` exists.
 *
 * So nothing here is typed. The names and times come from `computeDay` through
 * `buildWidgetPayload`, the arch and the marks from the same path data the
 * phones are handed, and the colours are the native resources that
 * `widget:check` already holds to `theme.ts`. The preview is the widget, drawn
 * from one source, and a check regenerates it rather than trusting it.
 *
 * ## The day it shows
 *
 * Mecca, the spring equinox, half past noon: a real place on a day whose
 * daylight splits evenly, so the marks sit across the arch the way they do for
 * most people most of the year, with Dhuhr open and lit. A fixed instant,
 * because a generated file has to be the same on both of Iyad's machines.
 * `TZ` and the locale are pinned for the same reason: `formatTime` asks the
 * runtime, and newer ICU writes a narrow no-break space before AM that older
 * ICU writes as an ordinary one.
 *
 * ## Vectors, not a picture
 *
 * `previewImage` has existed since Android 3 and `previewLayout` only since 12,
 * so a layout alone leaves the picker showing an app icon on anything older.
 * Both are written here, and the images are vector drawables built from the
 * same path data, so nothing is rasterised and nothing can drift from the
 * drawing it previews.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EN } from '../src/i18n/ui.ts';
import { inferProfile, PRAYER_IDS } from '../src/lib/prayer-times.ts';
import { circleToCubics, serializeOps } from '../src/lib/svg-path.ts';
import { buildWidgetPayload } from '../src/lib/widget-schedule.ts';

const self = fileURLToPath(import.meta.url);
const root = join(dirname(self), '..');
const RES = join(root, 'modules/prayer-widget/android/src/main/res');

/** Mecca, 21 March 2026, 12:30. Fixed so that what this writes is the same everywhere. */
const PLACE = { latitude: 21.4225, longitude: 39.8262 };
const TZ = 'Asia/Riyadh';
const LOCALE = 'en_US.UTF-8';
const WHEN = [2026, 2, 21, 12, 30];

/** The mark on the 24 grid is stroked at the Glyph's own width, as PrayerWidgetDrawing does. */
const MARK_GRID_STROKE = 1.5;

const generated = (what) =>
  `<!--\n  ${what}\n\n  Written by npm run widget:preview, from the same schedule the widgets draw.\n  Do not edit: npm run widget:check fails if this is not what the generator\n  would write now. See scripts/widget-preview.mjs for the day it shows.\n-->`;

/**
 * ICU decides what sits before AM, and it has changed its mind. A narrow
 * no-break space here would make this file differ between two machines that
 * are both right.
 */
const plainSpaces = (text) => text.replace(/[   ]/g, ' ');

const figure = (value) => String(Math.round(value * 100) / 100);

/* ── The drawings ──────────────────────────────────────────── */

function vector(size, body, viewport = size) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<vector xmlns:android="http://schemas.android.com/apk/res/android"',
    `  android:width="${size}dp"`,
    `  android:height="${size}dp"`,
    `  android:viewportWidth="${viewport}"`,
    `  android:viewportHeight="${viewport}">`,
    body,
    '</vector>',
    '',
  ].join('\n');
}

const stroked = (data, colour, width, { alpha = 1, indent = '  ' } = {}) =>
  [
    `${indent}<path`,
    `${indent}  android:pathData="${data}"`,
    `${indent}  android:strokeColor="@color/${colour}"`,
    `${indent}  android:strokeWidth="${figure(width)}"`,
    ...(alpha === 1 ? [] : [`${indent}  android:strokeAlpha="${figure(alpha)}"`]),
    `${indent}  android:strokeLineCap="round"`,
    `${indent}  android:strokeLineJoin="round"`,
    `${indent}  android:fillColor="#00000000" />`,
  ].join('\n');

const filled = (data, colour, indent = '  ') =>
  [`${indent}<path`, `${indent}  android:pathData="${data}"`, `${indent}  android:fillColor="@color/${colour}" />`].join('\n');

/**
 * One day mark, alone, on its own 24 grid: the row's cells and the quiet one.
 * `colour` is a resource name, because the picker has no schedule to take a
 * colour from and the native palette is already held to `theme.ts`.
 */
function markVector(path, colour) {
  return vector(24, stroked(path, colour, MARK_GRID_STROKE), 24);
}

/**
 * The niche's arch, with every mark where the day puts it.
 *
 * A group's scale multiplies the stroke it contains, so a mark drawn on the 24
 * grid inside a group scaled to `markSize` would be stroked `markSize / 24`
 * too heavily. Dividing here is what keeps `markStroke` the width the geometry
 * says, in the arch's own units.
 */
function archVector(payload, day, entry) {
  const { arch, marks } = payload;
  const [x0, y0, width, height] = arch.viewBox;
  const scale = arch.markSize / 24;
  const parts = [
    `  <group android:translateX="${figure(-x0)}" android:translateY="${figure(-y0)}">`,
    stroked(arch.inner, 'prayer_widget_gold_soft', arch.innerStroke, { indent: '    ' }),
    stroked(arch.outer, 'prayer_widget_gold', arch.stroke, { indent: '    ' }),
  ];

  for (const id of PRAYER_IDS) {
    const [x, y] = day.points[id];
    parts.push(filled(serializeOps(circleToCubics(x, y, arch.disc)), 'prayer_widget_ground', '    '));
    if (entry.lit === id) {
      parts.push(stroked(serializeOps(circleToCubics(x, y, arch.ring)), 'prayer_widget_gold', arch.ringStroke, { indent: '    ' }));
    }
    parts.push(
      `    <group android:translateX="${figure(x - arch.markSize / 2)}" android:translateY="${figure(y - arch.markSize / 2)}" android:scaleX="${figure(scale)}" android:scaleY="${figure(scale)}">`,
      stroked(marks[id], 'prayer_widget_gold', arch.markStroke / scale, {
        alpha: entry.passed.includes(id) ? 0.55 : 1,
        indent: '      ',
      }),
      '    </group>',
    );
  }

  parts.push('  </group>');
  if (width !== height) throw new Error(`the arch viewBox is ${width} by ${height}; this vector assumes a square one`);
  return vector(144, parts.join('\n'), width);
}

/** The day's five marks in a line: what the picker shows for the row below Android 12. */
function rowVector(payload, day, entry) {
  const step = 30;
  const parts = PRAYER_IDS.map((id, index) => {
    const colour = entry.lit === id ? 'prayer_widget_gold' : 'prayer_widget_text_secondary';
    return [
      `  <group android:translateX="${figure(index * step + 3)}" android:translateY="3">`,
      stroked(payload.marks[id], colour, MARK_GRID_STROKE, { indent: '    ' }),
      '  </group>',
    ].join('\n');
  });
  return vector(150, parts.join('\n'), step * PRAYER_IDS.length);
}

/* ── The layouts ───────────────────────────────────────────── */

const textView = (attrs, indent) =>
  [`${indent}<TextView`, ...attrs.map((line) => `${indent}  ${line}`), `${indent}  android:maxLines="1" />`].join('\n');

function nicheLayout(entry) {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated('What the picker shows for the niche: the arch, and the words the widget itself would be showing.')}
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@color/prayer_widget_ground"
  android:clipToOutline="true">

  <ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:importantForAccessibility="no"
    android:scaleType="fitCenter"
    android:src="@drawable/prayer_widget_preview_arch" />

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:paddingStart="22dp"
    android:paddingEnd="22dp">

    <FrameLayout
      android:layout_width="match_parent"
      android:layout_height="0dp"
      android:layout_weight="40" />

${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:letterSpacing="0.12"',
    'android:textAllCaps="true"',
    `android:text="${entry.caption}"`,
    'android:textColor="@color/prayer_widget_text_secondary"',
    'android:textSize="9sp"',
  ],
  '    ',
)}

${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:fontFamily="@font/literata_semibold"',
    `android:text="${entry.name}"`,
    'android:textColor="@color/prayer_widget_text"',
    'android:textSize="20sp"',
  ],
  '    ',
)}

${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:fontFeatureSettings="tnum"',
    `android:text="${entry.time}"`,
    'android:textColor="@color/prayer_widget_gold"',
    'android:textSize="12sp"',
    'android:textStyle="bold"',
  ],
  '    ',
)}

    <FrameLayout
      android:layout_width="match_parent"
      android:layout_height="0dp"
      android:layout_weight="24" />
  </LinearLayout>
</FrameLayout>
`;
}

function rowCell(cell, lit) {
  const glyph = `@drawable/prayer_widget_preview_mark_${cell.id}`;
  const words = lit ? 'prayer_widget_gold' : 'prayer_widget_text_secondary';
  const time = lit ? 'prayer_widget_gold' : 'prayer_widget_text';
  return `    <LinearLayout
      android:layout_width="0dp"
      android:layout_height="wrap_content"
      android:layout_weight="1"${lit ? '\n      android:background="@drawable/prayer_widget_cell_lit"' : ''}
      android:gravity="center_horizontal"
      android:orientation="vertical"
      android:paddingTop="6dp"
      android:paddingBottom="6dp">
      <ImageView
        android:layout_width="16dp"
        android:layout_height="16dp"
        android:importantForAccessibility="no"
        android:src="${glyph}" />
${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:layout_marginTop="3dp"',
    `android:text="${cell.name}"`,
    `android:textColor="@color/${words}"`,
    'android:textSize="11sp"',
  ],
  '      ',
)}
${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:fontFeatureSettings="tnum"',
    `android:text="${cell.time}"`,
    `android:textColor="@color/${time}"`,
    'android:textSize="11sp"',
  ],
  '      ',
)}
    </LinearLayout>`;
}

function rowLayout(entry, day) {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated("What the picker shows for the row: a real day's five prayers, one of them open.")}
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@color/prayer_widget_ground"
  android:clipToOutline="true"
  android:gravity="center_vertical"
  android:orientation="vertical"
  android:paddingStart="12dp"
  android:paddingTop="12dp"
  android:paddingEnd="12dp"
  android:paddingBottom="8dp">

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:paddingStart="6dp"
    android:paddingEnd="6dp"
    android:paddingBottom="8dp">
${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:layout_marginEnd="8dp"',
    'android:letterSpacing="0.12"',
    'android:textAllCaps="true"',
    `android:text="${entry.caption}"`,
    'android:textColor="@color/prayer_widget_text_secondary"',
    'android:textSize="9sp"',
  ],
  '    ',
)}
${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:layout_marginEnd="8dp"',
    'android:fontFamily="@font/literata_semibold"',
    `android:text="${entry.name}"`,
    'android:textColor="@color/prayer_widget_text"',
    'android:textSize="17sp"',
  ],
  '    ',
)}
${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:fontFeatureSettings="tnum"',
    `android:text="${entry.time}"`,
    'android:textColor="@color/prayer_widget_gold"',
    'android:textSize="12sp"',
    'android:textStyle="bold"',
  ],
  '    ',
)}
  </LinearLayout>

  <FrameLayout
    android:layout_width="match_parent"
    android:layout_height="1dp"
    android:background="@color/prayer_widget_gold_soft" />

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:paddingTop="6dp">
${day.cells.map((cell) => rowCell(cell, entry.lit === cell.id)).join('\n\n')}
  </LinearLayout>
</LinearLayout>
`;
}

function quietLayout(entry) {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated('What the picker shows for the quiet one: a mark and a time, and no name, which is the whole point of it.')}
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@color/prayer_widget_ground"
  android:clipToOutline="true"
  android:gravity="center"
  android:orientation="horizontal"
  android:paddingStart="14dp"
  android:paddingEnd="14dp">

  <ImageView
    android:layout_width="22dp"
    android:layout_height="22dp"
    android:layout_marginEnd="10dp"
    android:importantForAccessibility="no"
    android:src="@drawable/prayer_widget_preview_quiet" />

${textView(
  [
    'android:layout_width="wrap_content"',
    'android:layout_height="wrap_content"',
    'android:fontFeatureSettings="tnum"',
    `android:text="${entry.time}"`,
    'android:textColor="@color/prayer_widget_text"',
    'android:textSize="15sp"',
  ],
  '  ',
)}
</LinearLayout>
`;
}

/** The lit cell's ground, rounded, for the preview and for phones before Android 12. */
function litCellDrawable() {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated('The lit cell behind a prayer that is open now.')}
<shape xmlns:android="http://schemas.android.com/apk/res/android"
  android:shape="rectangle">
  <solid android:color="@color/prayer_widget_selected" />
  <corners android:radius="10dp" />
</shape>
`;
}

/** Friday's dot beside Dhuhr, round for the same reason the corners are. */
function fridayDotDrawable() {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated('The dot that says a Dhuhr is Jumuah. A condition stated, never a relabelling.')}
<shape xmlns:android="http://schemas.android.com/apk/res/android"
  android:shape="oval">
  <solid android:color="@color/prayer_widget_accent" />
</shape>
`;
}

/** The widget's own ground, rounded, for phones too old to be told a radius. */
function backgroundDrawable() {
  return `<?xml version="1.0" encoding="utf-8"?>
${generated('The widget\'s ground. Android 12 and later are handed a radius instead; this is what rounds the corners before that.')}
<shape xmlns:android="http://schemas.android.com/apk/res/android"
  android:shape="rectangle">
  <solid android:color="@color/prayer_widget_ground" />
  <corners android:radius="22dp" />
</shape>
`;
}

/* ── What gets written ─────────────────────────────────────── */

export function previewFiles() {
  const t = (key) => EN[key];
  const [y, m, d, h, min] = WHEN;
  const now = new Date(y, m, d, h, min);
  /* The palette never reaches this file: every drawing below names a colour resource instead. */
  const unused = Object.fromEntries(
    ['ground', 'text', 'textSecondary', 'gold', 'goldSoft', 'selected', 'accent'].map((key) => [key, '#000000']),
  );
  const payload = buildWidgetPayload({
    coords: PLACE,
    profile: inferProfile(PLACE),
    now,
    fluent: false,
    t,
    colors: { light: unused, dark: unused },
    days: 2,
  });

  const entry = payload.entries[0];
  const day = payload.days[entry.day];
  if (!entry || !day) throw new Error('the sample day produced no entry to draw');
  if (day.cells.length !== PRAYER_IDS.length) {
    throw new Error(`the sample day has ${day.cells.length} prayers; the previews are drawn for ${PRAYER_IDS.length}`);
  }

  const words = {
    caption: plainSpaces(entry.caption),
    name: plainSpaces(entry.name),
    time: plainSpaces(entry.time),
    prayer: entry.prayer,
    lit: entry.lit,
  };
  const cells = day.cells.map((cell) => ({ ...cell, name: plainSpaces(cell.name), time: plainSpaces(cell.time) }));

  const files = {
    'drawable/prayer_widget_preview_arch.xml': archVector(payload, day, entry),
    'drawable/prayer_widget_preview_row.xml': rowVector(payload, day, entry),
    /* The quiet widget's picker image under a name that does not change with the day this shows. */
    'drawable/prayer_widget_preview_quiet.xml': markVector(payload.marks[entry.prayer], 'prayer_widget_gold'),
    'drawable/prayer_widget_cell_lit.xml': litCellDrawable(),
    'drawable/prayer_widget_friday_dot.xml': fridayDotDrawable(),
    'drawable/prayer_widget_background.xml': backgroundDrawable(),
    'layout/prayer_widget_niche_preview.xml': nicheLayout(words),
    'layout/prayer_widget_row_preview.xml': rowLayout(words, { ...day, cells }),
    'layout/prayer_widget_quiet_preview.xml': quietLayout(words),
  };
  for (const id of PRAYER_IDS) {
    const colour = entry.lit === id ? 'prayer_widget_gold' : 'prayer_widget_text_secondary';
    files[`drawable/prayer_widget_preview_mark_${id}.xml`] = markVector(payload.marks[id], colour);
  }
  return files;
}

/* Only when run: the pinned clock has to be in place before anything is built. */
if (process.argv[1] === self) {
  const check = process.argv.includes('--check');
  if (process.env.WIDGET_PREVIEW_PINNED !== '1') {
    const result = spawnSync(process.execPath, [...process.execArgv, self, ...process.argv.slice(2)], {
      env: { ...process.env, TZ, LANG: LOCALE, LC_ALL: LOCALE, WIDGET_PREVIEW_PINNED: '1' },
      stdio: 'inherit',
    });
    process.exit(result.status ?? 1);
  }

  const files = previewFiles();
  let stale = 0;
  for (const [path, contents] of Object.entries(files)) {
    const full = join(RES, path);
    if (check) {
      let current = null;
      try {
        current = readFileSync(full, 'utf8');
      } catch {
        current = null;
      }
      if (current !== contents) {
        console.error(`  ✗ ${path} is not what npm run widget:preview would write`);
        stale += 1;
      }
    } else {
      // res/drawable does not exist until something is drawn into it.
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, contents);
    }
  }

  if (check) {
    if (stale > 0) {
      console.error(`✗ the picker's previews: ${stale} file(s) stale. Run npm run widget:preview`);
      process.exit(1);
    }
    console.log("✓ the picker's previews are what the schedule would draw");
  } else {
    console.log(`✓ the picker's previews: ${Object.keys(files).length} files from Mecca, 21 March 2026`);
  }
}
