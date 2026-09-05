/**
 * The offline city list behind "Choose a city".
 *
 * Run: `npm run places:fetch` (needs a network connection, once)
 * Writes `src/content/places.json`.
 *
 * ## Why a bundled list and not a geocoder
 *
 * `expo-location` can turn a typed place name into coordinates, and it does
 * it by sending the name to Apple or Google over the network. The person
 * typing a city instead of granting location is usually doing that for
 * privacy, and prayer times are the worship path, which has to work with the
 * radio off. So the list ships in the bundle, the search runs on the phone,
 * and "used on this device and never sent anywhere" stays true. Iyad's
 * decision, 5 Sep 2026.
 *
 * ## What is taken
 *
 * GeoNames `cities15000` — every place with a population over 15,000 — cut
 * to those over `MIN_POPULATION`, because a smaller cut costs coverage in
 * small towns and a larger one costs bundle. Somebody 30km from the nearest
 * listed city gets times a minute or two out, and the screen names the city
 * so they can see what they chose. Coordinates are rounded to two decimals
 * (about a kilometre), which is far finer than the list's own spacing.
 *
 * Each row is `[name, countryCode, region, latitude, longitude, population]`,
 * with a seventh entry — GeoNames' ASCII name — only where it is not simply the
 * name with its accents dropped, so "Munich" finds München and "Cologne" Köln.
 * Region is the first-level division — a US state, an English county — and
 * is kept only where the country has enough listed cities for names to
 * collide, because "Springfield" needs it and "Reykjavík" does not.
 *
 * ## Licence
 *
 * GeoNames data is CC BY 4.0. The credit is on the Sources page, from
 * `PLACES_SOURCE` in `src/lib/places.ts`, beside every other publisher.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const CACHE = resolve('.cache/geonames');
const BASE = 'https://download.geonames.org/export/dump/';
const MIN_POPULATION = 50_000;
/** Countries where a region is needed to tell same-named cities apart. */
const REGION_COUNTRIES = new Set(['US', 'CA', 'AU', 'BR', 'IN', 'CN', 'RU', 'MX', 'GB', 'DE']);

mkdirSync(CACHE, { recursive: true });
for (const file of ['cities15000.zip', 'countryInfo.txt', 'admin1CodesASCII.txt']) {
  try {
    readFileSync(resolve(CACHE, file));
  } catch {
    execSync(`curl -sSLo "${resolve(CACHE, file)}" "${BASE}${file}"`, { stdio: 'inherit' });
  }
}
execSync(`unzip -oq "${resolve(CACHE, 'cities15000.zip')}" -d "${CACHE}"`);

const countries = {};
for (const line of readFileSync(resolve(CACHE, 'countryInfo.txt'), 'utf8').split('\n')) {
  if (!line || line.startsWith('#')) continue;
  const cols = line.split('\t');
  countries[cols[0]] = cols[4];
}

const regions = {};
for (const line of readFileSync(resolve(CACHE, 'admin1CodesASCII.txt'), 'utf8').split('\n')) {
  if (!line) continue;
  const [code, name] = line.split('\t');
  regions[code] = name;
}

const rows = [];
for (const line of readFileSync(resolve(CACHE, 'cities15000.txt'), 'utf8').split('\n')) {
  if (!line) continue;
  const c = line.split('\t');
  const population = Number(c[14]);
  if (population < MIN_POPULATION) continue;
  const country = c[8];
  const region = REGION_COUNTRIES.has(country) ? regions[`${country}.${c[10]}`] ?? '' : '';
  const row = [c[1], country, region, Number(Number(c[4]).toFixed(2)), Number(Number(c[5]).toFixed(2)), population];
  const plain = c[1].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (c[2] && c[2].toLowerCase() !== plain) row.push(c[2]);
  rows.push(row);
}
rows.sort((a, b) => b[5] - a[5]);

const out = { countries, places: rows };
const json = JSON.stringify(out);
writeFileSync(resolve('src/content/places.json'), json);
console.log(`${rows.length} places over ${MIN_POPULATION}, ${Object.keys(countries).length} countries, ${(json.length / 1024).toFixed(0)} KB`);
