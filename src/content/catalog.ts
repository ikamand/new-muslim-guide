/**
 * One list of everything the app teaches.
 *
 * Until now each content set was reachable only from the screen that rendered
 * it, and nothing could answer a question that crossed them — what should
 * someone read first, what relates to wudu, what has no source yet. That is
 * what `relatedContent` and `tags` need to be functional rather than
 * decorative: a pointer is only useful if something can resolve it.
 *
 * Built from the individual content modules rather than from `index.ts`,
 * because `index.ts` pulls in the audio map whose `require` calls only Metro
 * can resolve. Importing directly keeps this loadable by the node scripts in
 * `scripts/`, which is what lets `content:audit` run outside the app.
 *
 * Ids are unique only within a kind — 'shahada' is a guide and a pillar — so
 * everything here is keyed by both.
 */

import { DUAS } from './duas';
import { GUIDES } from './guides';
import { IMAN_PILLARS } from './iman';
import type { ContentKind, ContentMeta, ContentNote, ContentRef } from './model';
import { PHRASES } from './phrases';
import { PILLARS } from './pillars';
import { REFERENCES } from './references';
import type { Source } from './sources';

/**
 * A piece of content, flattened to what every kind has in common.
 *
 * Deliberately thin. This is an index for cross-cutting questions, not a
 * replacement for the real shapes — a screen still renders a `Guide`, because
 * a guide knows things a catalogue entry cannot.
 */
export type CatalogEntry = {
  kind: ContentKind;
  id: string;
  title: string;
  /** One line. `subtitle` on a guide or reference, `summary` on a pillar. */
  shortDescription: string;
  meta?: ContentMeta;
  /** Every source on the entry and on anything inside it, flattened. */
  sources: readonly Source[];
  /** Structured notes only. The plain `note` strings stay where they are. */
  notes: readonly ContentNote[];
};

const collect = <T>(items: readonly T[], get: (item: T) => readonly Source[] | undefined) =>
  items.flatMap((item) => [...(get(item) ?? [])]);

function buildCatalog(): readonly CatalogEntry[] {
  const entries: CatalogEntry[] = [];

  for (const guide of GUIDES) {
    entries.push({
      kind: 'guide',
      id: guide.id,
      title: guide.title,
      shortDescription: guide.subtitle,
      meta: guide.meta,
      sources: [
        ...(guide.meta?.sources ?? []),
        ...collect(guide.steps, (step) => step.sources),
        ...collect(guide.steps, (step) => step.says?.sources),
      ],
      notes: [
        ...(guide.meta?.notes ?? []),
        ...guide.steps.flatMap((step) => [...(step.notes ?? [])]),
      ],
    });
  }

  for (const reference of REFERENCES) {
    entries.push({
      kind: 'reference',
      id: reference.id,
      title: reference.title,
      shortDescription: reference.subtitle,
      meta: reference.meta,
      sources: [
        ...(reference.meta?.sources ?? []),
        ...collect(reference.sections, (section) => section.sources),
      ],
      notes: [
        ...(reference.meta?.notes ?? []),
        ...reference.sections.flatMap((section) => [...(section.notes ?? [])]),
      ],
    });
  }

  for (const [kind, list] of [
    ['pillar', PILLARS],
    ['article', IMAN_PILLARS],
  ] as const) {
    for (const pillar of list) {
      entries.push({
        kind,
        id: pillar.id,
        title: pillar.title,
        shortDescription: pillar.summary,
        meta: pillar.meta,
        sources: pillar.meta?.sources ?? [],
        notes: pillar.meta?.notes ?? [],
      });
    }
  }

  for (const dua of DUAS) {
    entries.push({
      kind: 'dua',
      id: dua.id,
      title: dua.when,
      shortDescription: dua.says.translation,
      meta: dua.meta,
      sources: [...(dua.meta?.sources ?? []), ...(dua.says.sources ?? [])],
      notes: dua.meta?.notes ?? [],
    });
  }

  for (const phrase of PHRASES) {
    entries.push({
      kind: 'phrase',
      id: phrase.id,
      title: phrase.said,
      shortDescription: phrase.meaning,
      meta: phrase.meta,
      sources: phrase.meta?.sources ?? [],
      notes: phrase.meta?.notes ?? [],
    });
  }

  return entries;
}

export const CATALOG: readonly CatalogEntry[] = buildCatalog();

const key = (kind: ContentKind, id: string) => `${kind}:${id}`;

const BY_KEY = new Map(CATALOG.map((entry) => [key(entry.kind, entry.id), entry]));

/** The entry a `ContentRef` points at, or undefined if it points at nothing. */
export function resolveRef(reference: ContentRef): CatalogEntry | undefined {
  return BY_KEY.get(key(reference.kind, reference.id));
}

/**
 * What an entry says it relates to, resolved and with dead pointers dropped.
 *
 * Silent on a broken pointer rather than throwing — a missing related item is
 * a gap in a list, not a reason to fail a screen someone opened mid-prayer.
 * `npm run content:audit` reports them instead, which is where a broken
 * pointer should surface.
 */
export function getRelated(entry: CatalogEntry): readonly CatalogEntry[] {
  return (entry.meta?.relatedContent ?? [])
    .map(resolveRef)
    .filter((found): found is CatalogEntry => found !== undefined);
}

/** Every `relatedContent` pointer in the app that resolves to nothing. */
export function danglingRefs(): readonly { from: CatalogEntry; to: ContentRef }[] {
  return CATALOG.flatMap((entry) =>
    (entry.meta?.relatedContent ?? [])
      .filter((reference) => !resolveRef(reference))
      .map((reference) => ({ from: entry, to: reference })),
  );
}

/**
 * What to learn next, soonest-needed first.
 *
 * Entries with no `meta` sort last rather than being hidden: the metadata
 * layer is being adopted gradually, and content without it is not less real.
 */
export function beginnerPath(): readonly CatalogEntry[] {
  return [...CATALOG].sort(
    (a, b) => (a.meta?.beginnerPriority ?? 5) - (b.meta?.beginnerPriority ?? 5),
  );
}
