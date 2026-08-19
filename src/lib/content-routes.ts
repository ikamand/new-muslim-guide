import type { Href } from 'expo-router';

import type { CatalogEntry } from '@/content';

/**
 * Where a catalogue entry opens.
 *
 * The catalogue is deliberately about content rather than navigation — it has
 * to load in node scripts, where routes mean nothing. This is the one place
 * that knows both, so a screen showing a mixed list of recommendations does not
 * have to carry a switch of its own.
 *
 * Pillars and articles have no page each; they are lists you scroll. Sending
 * someone to the list is honest — it is where the thing actually is.
 */
export function routeFor(entry: CatalogEntry): Href {
  switch (entry.kind) {
    case 'guide':
      return { pathname: '/guide/[id]', params: { id: entry.id } };
    case 'reference':
      return { pathname: '/reference/[id]', params: { id: entry.id } };
    case 'pillar':
      return '/pillars';
    case 'article':
      return '/iman';
    case 'dua':
      return '/duas';
    case 'phrase':
      return '/phrases';
  }
}
