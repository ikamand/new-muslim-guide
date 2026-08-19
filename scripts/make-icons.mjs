/**
 * Generates the app's icon set from one shape.
 *
 * Run: `npm run icons`
 *
 * The app shipped with Expo's template chevron as its icon, on Expo's blue.
 * Icons are native configuration, baked at build time, so replacing them after
 * a build costs another build — which is why they are generated rather than
 * hand-exported, and why this script exists in the repo at all.
 *
 * The shape is a mihrab: the niche in a mosque wall that marks the direction
 * of prayer. It is the plainest possible statement of what the app is for, it
 * is geometry rather than depiction, and it stays legible at 48 pixels.
 *
 * Colours come from `src/constants/theme.ts` and must be kept in step with it
 * by hand — a PNG cannot import a token.
 */
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const INK = '#1F6F5C'; // theme.light.accent
const CREAM = '#FBF9F4'; // theme.light.background

/** size, background (null = transparent), arch colour, arch share of the canvas */
const TARGETS = [
  ['assets/images/icon.png', 1024, INK, CREAM, 0.46],
  ['assets/images/android-icon-background.png', 1024, INK, null, 0],
  // Adaptive icons are masked and can be zoomed, so the shape sits inside the
  // safe area rather than filling the canvas.
  ['assets/images/android-icon-foreground.png', 1024, null, CREAM, 0.34],
  ['assets/images/android-icon-monochrome.png', 1024, null, '#FFFFFF', 0.34],
  // Android tints notification icons and keeps only the alpha channel.
  ['assets/images/notification-icon.png', 192, null, '#FFFFFF', 0.52],
  ['assets/images/splash-icon.png', 512, null, INK, 0.60],
  ['assets/images/favicon.png', 96, INK, CREAM, 0.46],
];

const py = `
import math, sys
from PIL import Image, ImageDraw

K = math.sqrt(3) / 2   # apex height of an equilateral arch, as a share of span

def arch(d, cx, apex_y, span, bottom_y, fill, n=280):
    """A pointed arch on two legs, positioned by its apex rather than its base.

    Equilateral: each arc has radius = span and is struck from the opposite
    springing point. Taking the apex as the anchor is what lets the inner and
    outer curves sit a constant distance apart, so the outline has even weight
    all the way round instead of thickening over the crown."""
    s = span
    ys = apex_y + s * K            # springing line
    pts = [(cx - s / 2, bottom_y), (cx - s / 2, ys)]
    for i in range(n + 1):         # left arc, centred on the right foot
        a = math.radians(180 - 60 * i / n)
        pts.append((cx + s / 2 + s * math.cos(a), ys - s * math.sin(a)))
    for i in range(n + 1):         # right arc, centred on the left foot
        a = math.radians(60 - 60 * i / n)
        pts.append((cx - s / 2 + s * math.cos(a), ys - s * math.sin(a)))
    pts.append((cx + s / 2, bottom_y))
    d.polygon(pts, fill=fill)

def build(path, size, bg, ink, share):
    ss = 4
    px = size * ss
    img = Image.new('RGBA', (px, px), bg or (0, 0, 0, 0))
    if ink and share:
        span = px * share
        mark_h = span * K + span * 0.72        # arch plus legs
        top = (px - mark_h) / 2                # centred, with equal air above and below
        base = top + mark_h
        band = span * 0.19

        mask = Image.new('L', (px, px), 0)
        d = ImageDraw.Draw(mask)
        arch(d, cx := px / 2, top, span, base, 255)
        # Inner curve dropped by exactly the band width and narrowed by twice
        # it, then run past the bottom edge so the niche stays open below.
        arch(d, cx, top + band, span - band * 2, px + px, 0)

        colour = Image.new('RGBA', (px, px), ink)
        img.paste(colour, (0, 0), mask)
    img.resize((size, size), Image.LANCZOS).save(path)

for line in sys.stdin.read().strip().split('\\n'):
    path, size, bg, ink, share = line.split('|')
    build(path, int(size), bg or None, ink or None, float(share))
    print('wrote', path.split('/')[-1])
`;

const stdin = TARGETS.map(([p, s, bg, ink, share]) =>
  [join(root, p), s, bg ?? '', ink ?? '', share].join('|'),
).join('\n');

console.log(execFileSync('python3', ['-c', py], { input: stdin, encoding: 'utf8' }));
