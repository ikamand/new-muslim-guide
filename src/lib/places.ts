import data from '@/content/places.json';
import type { LatLon } from '@/lib/prayer-times';

/**
 * The offline city list behind "Choose a city".
 *
 * Searched on the phone, never sent anywhere — see `scripts/fetch-places.mjs`
 * for why a bundled list and not a geocoder. The list is 12,000-odd places
 * over 50,000 people; someone outside all of them picks the nearest and gets
 * times a minute or two out, which the screen says.
 */

export type Place = LatLon & {
  name: string;
  /** ISO 3166 country code, for the flag of a name and nothing else. */
  country: string;
  /** A US state, an English county — only where names collide. */
  region: string;
};

/** Who the list is from, for the Sources page. CC BY 4.0. */
export const PLACES_SOURCE = {
  name: 'GeoNames',
  where: 'geonames.org',
  licence: 'CC BY 4.0',
} as const;

type Row = [string, string, string, number, number, number, string?];
// A JSON module's inferred type is the widest thing in it, `(string | number)[][]`;
// the generator writes exactly `Row`, so the cast is through unknown on purpose.
const { countries, places } = data as unknown as { countries: Record<string, string>; places: Row[] };

export function countryName(code: string): string {
  return countries[code] ?? code;
}

/** Lower-case, accents dropped, so "sao paulo" finds São Paulo. */
function plain(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function toPlace(row: Row): Place {
  return { name: row[0], country: row[1], region: row[2], latitude: row[3], longitude: row[4] };
}

/** The short form for a row that also has to fit a control: "Leeds, England". */
export function placeShort(place: Pick<Place, 'name' | 'region'>): string {
  return [place.name, place.region].filter(Boolean).join(', ');
}

/** Where a place is named in full: "Leeds, England, United Kingdom". */
export function placeLabel(place: Pick<Place, 'name' | 'region' | 'country'>): string {
  return [place.name, place.region, countryName(place.country)].filter(Boolean).join(', ');
}

/**
 * Places whose name starts with what was typed, or has a word that does,
 * largest first. Rows are already sorted by population, so the first `limit`
 * hits are the biggest — a search for "san" gives San Antonio before San
 * Marino, which is the right guess for a first keystroke.
 */
export function searchPlaces(query: string, limit = 30): Place[] {
  const q = plain(query.trim());
  if (q.length < 2) return [];
  const hits: Place[] = [];
  for (const row of places) {
    const name = plain(row[0]);
    const ascii = row[6] ? plain(row[6]) : null;
    if (
      name.startsWith(q) ||
      ascii?.startsWith(q) ||
      name.split(/[\s-]/).some((word) => word.startsWith(q)) ||
      (ascii !== null && ascii.split(/[\s-]/).some((word) => word.startsWith(q)))
    ) {
      hits.push(toPlace(row));
      if (hits.length >= limit) break;
    }
  }
  return hits;
}
