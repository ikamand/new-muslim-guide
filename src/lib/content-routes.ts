import type { Href } from 'expo-router';

import type { CatalogEntry } from '@/content';
import type { HelpScreen, HelpTopicId } from '@/content/help';

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
    case 'hisn':
      return { pathname: '/dua-book/[id]', params: { id: entry.id } };
    case 'phrase':
      return '/phrases';
    case 'collection':
      return { pathname: '/collection/[id]', params: { id: entry.id } };
  }
}

/**
 * Where a help topic's screen entry opens.
 *
 * The topics in `src/content/help.ts` list screens by name rather than by
 * route, for the same reason the catalogue does: that file has to load in node
 * scripts, where a route means nothing.
 */
export function routeForHelpScreen(screen: HelpScreen): Href {
  switch (screen) {
    case 'duas':
      return '/duas';
    case 'phrases':
      return '/phrases';
    case 'practice':
      return '/practice';
  }
}

export function routeForHelpTopic(topic: HelpTopicId): Href {
  return { pathname: '/help/[topic]', params: { topic } };
}
