/**
 * When each piece of content belongs in someone's life.
 *
 * `Cadence` is defined in `model.ts` and documented there. This is where the
 * 201 values live.
 *
 * ## Why a table, and not a field on `ContentMeta`
 *
 * The plan called for `cadence` on `ContentMeta`, and it cannot go there and
 * still answer the question. `meta` is present on 52 of the catalogue's 201
 * entries. The other 149 are 132 occasions of Hisn al-Muslim — a GENERATED
 * file, `duas/hisn.ts`, that says "do not edit by hand" and is rewritten by
 * `npm run hisn` — and 17 short phrases and situational pages that carry no
 * `meta` at all. Putting the field on `ContentMeta` would have covered a
 * quarter of the catalogue and needed a second mechanism for the rest, which
 * is two places to look and two places to drift.
 *
 * This is also the arrangement the repo already reached twice for exactly this
 * problem. `duas/moments.ts` holds which part of the day an occasion belongs
 * to, and `duas/annotations.ts` holds whether a line is words a person says;
 * both are hand-written siblings of the generated book, for the same reason,
 * and both say so in their own headers.
 *
 * ## What this is a judgement about, and what it is not
 *
 * Placement. Nothing here says a text is authentic, that a duʿa should be
 * recited, or that a ruling is right. It says where the app should put a page
 * and for how long — the same class of decision as `moments.ts`, which marks
 * itself "REVIEW REQUIRED — placement, not doctrine, but still a judgement".
 * Treat this the same way.
 *
 * ⚠️ **All 201 were assigned in one pass on 28 August 2026 and none has been
 * reviewed.** They are the input to Phase 4's placement, so a wrong one puts
 * the wrong thing on Today rather than saying anything false. The calls worth
 * arguing with first, because they were the close ones:
 *
 * - **The prayer's own words are `until-fluent`, not `daily`.** You say the
 *   tashahhud every day for life, so `daily` looks right — but cadence is
 *   about the PAGE, and the page's job ends when you know the words. The
 *   morning adhkār is `daily` by contrast because it is 29 lines nobody holds
 *   from memory, so the list is needed forever.
 * - **Gatherings are `daily`.** Sitting with people and leaving them happens
 *   most days; `on-event` would hide it entirely.
 * - **Hajj's supplications are `on-event`, not `yearly`.** Hajj returns every
 *   year in the calendar and once in a lifetime in a life, and the person
 *   holding the phone is the second one. The Day of ʿArafah duʿa goes with
 *   them, because the wording Hisn prints there is the pilgrim's.
 * - **`periods` is `on-event` though it recurs monthly.** The test is whether
 *   it should sit on a shelf being browsed, and it should not.
 * - **The shahada is `keepsake` in both its forms**, the guide and the pillar.
 *   This is the call `docs/build-order.md` Phase 4 already made: it stays
 *   reachable forever, and "return to this a few times in your life" is not
 *   the same claim as "second-largest object on the tab".
 *
 * `npm run content:audit` fails if any catalogue entry has no cadence, and if
 * anything here points at content the catalogue does not have.
 */

import type { Cadence, ContentRef } from './model';

/**
 * Guides — the things you do.
 *
 * The five daily prayers and the washes are `until-fluent`: a 23-step
 * walkthrough is exactly right in week one and wrong in year three, and that
 * change of shape is the most valuable personalisation available to this app.
 * The two occasional prayers are `on-event` — nobody browses to istikhara,
 * they open it because there is a decision.
 */
const GUIDES: Readonly<Record<string, Cadence>> = {
  shahada: 'keepsake',
  wudu: 'until-fluent',
  ghusl: 'until-fluent',
  tayammum: 'on-event', // There is no water. Nobody arrives here by browsing.
  fajr: 'until-fluent',
  dhuhr: 'until-fluent',
  asr: 'until-fluent',
  maghrib: 'until-fluent',
  isha: 'until-fluent',
  tahajjud: 'until-fluent',
  qiyam: 'until-fluent',
  witr: 'until-fluent',
  istikhara: 'on-event', // You have a decision to make.
  tawba: 'on-event', // You have done something you regret.
};

/**
 * References — the things you read.
 *
 * Mostly `once`: an explanation you read and then own. The five at the end are
 * the situational pages, and with `tayammum` above they are the six that
 * `docs/build-order.md` Phase 4 takes off the Learn shelf and gives to Ask.
 */
const REFERENCES: Readonly<Record<string, Cadence>> = {
  'what-is-islam': 'once',
  /* Phase 9. All five are read once and kept, not returned to on a cycle —
     except the minimum prayer, which somebody reaches for on a bad night. */
  'life-before': 'once',
  'your-name': 'once',
  'minimum-prayer': 'until-fluent',
  adhan: 'once',
  rulings: 'once',
  /* Weekly, and the calendar is the only trigger the app has for it. */
  jumuah: 'yearly',
  /* Both invisible until they happen — nobody browses to either. */
  janazah: 'on-event',
  'if-you-stopped': 'on-event',
  /* Phase 11's remaining six. Two are read once; four wait for the day. */
  'behind-an-imam': 'until-fluent',
  eid: 'yearly',
  'voluntary-fasting': 'yearly',
  'being-corrected': 'on-event',
  'marriage-shape': 'once',
  'a-partner-already': 'on-event',
  'who-is-allah': 'once',
  'who-is-muhammad': 'once',
  'what-is-the-quran': 'once',
  sunnah: 'once',
  'before-prayer': 'until-fluent',
  'al-fatihah': 'until-fluent', // The words, until they are held.
  'what-breaks-prayer': 'until-fluent',
  'halal-and-haram': 'once',
  food: 'once',
  clothing: 'once',
  family: 'once',
  work: 'once',
  manners: 'once',
  'dua-and-dhikr': 'once',
  repentance: 'once', // The idea, read once. The month someone slips is a page Phase 11 writes.
  'patience-and-gratitude': 'once',
  'islamic-calendar': 'once',
  ramadan: 'yearly',
  tahajjud: 'once', // The explanation. The guide of the same name is until-fluent.
  'qiyam-al-layl': 'once',
  witr: 'once',
  istikhara: 'on-event',
  'tawba-prayer': 'on-event',
  mosque: 'once', // Read before you go, so none of it is a surprise.
  'lost-count': 'on-event',
  missed: 'on-event',
  travelling: 'on-event',
  seated: 'on-event',
  periods: 'on-event',
};

/** The five pillars, and the six articles of faith. */
const PILLARS: Readonly<Record<string, Cadence>> = {
  shahada: 'keepsake',
  salah: 'once',
  zakat: 'yearly', // A yearly share, on a date you keep.
  sawm: 'yearly',
  hajj: 'once', // The explanation of a thing done once.
};

const ARTICLES: Readonly<Record<string, Cadence>> = {
  allah: 'once',
  angels: 'once',
  books: 'once',
  messengers: 'once',
  'last-day': 'once',
  qadar: 'once',
};

/**
 * Phrases — the words people say to you, and what you say back.
 *
 * `until-fluent` almost throughout, and this is the clearest case for that
 * value in the app: you need "Jazāka-llāhu khayran" in front of you until you
 * do not, and then never again. The exceptions are the two Eid greetings,
 * which return with the calendar, and the istirjāʿ, which you say on hearing
 * something has happened.
 */
const PHRASES: Readonly<Record<string, Cadence>> = {
  salam: 'until-fluent',
  jazak: 'until-fluent',
  baraka: 'until-fluent',
  alhamdulillah: 'until-fluent',
  inshaallah: 'until-fluent',
  mashaallah: 'until-fluent',
  subhanallah: 'until-fluent',
  astaghfirullah: 'until-fluent',
  'inna-lillah': 'on-event', // Said on hearing of a death or a loss.
  sallallahu: 'until-fluent',
  radiyallahu: 'until-fluent',
  akhi: 'until-fluent',
  'barakallahu-eid': 'yearly',
  taqabbal: 'yearly',
};

/**
 * Hisn al-Muslim's 132 occasions, keyed by IslamHouse's own row id.
 *
 * Keyed by the publisher's id rather than by position, because position is not
 * numbering — the same trap `hisn.ts` and `annotations.ts` both record. The
 * titles in the comments are the book's own English, copied from `hisn.ts` so
 * a reviewer can scan this list without opening the book.
 *
 * `on-event` is the large majority, and that is the book being what it is: it
 * is a manual of occasions, and most occasions are not today.
 */
const HISN: Readonly<Record<number, Cadence>> = {
  /* ---- daily — 24 ---- */
  1268971: 'daily', // Adhkār for waking up from sleep
  1268990: 'daily', // Supplication for wearing a garment
  1269001: 'daily', // What one should say when taking off his garment
  1269004: 'daily', // Supplication for entering the bathroom
  1269007: 'daily', // Supplication for exiting the bathroom
  1269010: 'daily', // Dhikr before ablution
  1269013: 'daily', // Dhikr after completing the ablution
  1269020: 'daily', // Dhikr on leaving the house
  1269025: 'daily', // Dhikr upon entering the house
  1269028: 'daily', // Supplication for going to the mosque
  1269035: 'daily', // Supplication for entering the mosque
  1269043: 'daily', // Supplication for leaving the mosque
  1269047: 'daily', // Adhkār of the Adhān (call to prayer)
  1269149: 'daily', // Adhkār after making Taslīm and ending the prayer
  1269190: 'daily', // Morning and evening Adhkār
  1269267: 'daily', // Adhkār of sleep
  1269314: 'daily', // Supplication when turning over at night
  1269502: 'daily', // Supplication before eating
  1269507: 'daily', // Supplication upon completion of the meal
  1269531: 'daily', // Supplication of sneezing
  1269552: 'daily', // What is said in the gathering place
  1269555: 'daily', // Expiation of a gathering
  1269651: 'daily', // Spreading Salām (greeting of peace)
  1269726: 'daily', // Istighfār (seeking forgiveness) and repentance

  /* ---- until-fluent — 10 ---- */
  1269061: 'until-fluent', // Istiftāh (Opening) supplication
  1269075: 'until-fluent', // Supplication of Rukū‘ (bowing)
  1269086: 'until-fluent', // Supplication of rising from Rukū‘
  1269093: 'until-fluent', // Supplication of Sujūd (prostration)
  1269108: 'until-fluent', // Supplication between the two prostrations
  1269113: 'until-fluent', // Supplication of Sujūd at-Tilāwah (prostration of recitation)
  1269118: 'until-fluent', // Tashahhud (sitting position in prayer)
  1269126: 'until-fluent', // Supplication after the last Tashahhud before making Taslīm
  1269331: 'until-fluent', // Supplication of Qunūt in the Witr prayer
  1269338: 'until-fluent', // Dhikr after Taslīm from the Witr

  /* ---- yearly — 7 ---- */
  1269494: 'yearly', // Supplication for sighting the crescent
  1269497: 'yearly', // Supplication at the time of breaking the fast
  1269518: 'yearly', // Supplication when breaking the fast at someone's house
  1269521: 'yearly', // Supplication of the fasting person when food is present and he has not broken his fast
  1269525: 'yearly', // What the fasting person says if insulted by someone
  1269528: 'yearly', // Supplication upon seeing the first fruits of the season
  1269720: 'yearly', // What to say upon slaughtering or sacrificing

  /* ---- keepsake — 9 ---- */
  1268926: 'keepsake', // Introduction
  1268936: 'keepsake', // The Merit of Dhikr (remembrance of Allah)
  1269402: 'keepsake', // The Adhkār (Allah's remembrances) and recitation of the Qur’an.
  1269420: 'keepsake', // The virtue of visiting the sick
  1269564: 'keepsake', // Means by which Allah guards against Ad-Dajjāl (Antichrist)
  1269635: 'keepsake', // The virtue of invoking blessings upon the Prophet (ﷺ)
  1269745: 'keepsake', // The merit of Tasbīh (glorifying Allah), Tahmīd (praising Him), Tahlīl (proclaiming His oneness), and Takbīr (proclaiming His greatness)
  1269777: 'keepsake', // How did the Prophet (ﷺ) glorify Allah?
  1269781: 'keepsake', // Types of goodness and comprehensive etiquettes

  /* ---- on-event — 82 ---- */
  1268993: 'on-event', // Supplication for wearing a new garment
  1268996: 'on-event', // Supplication for someone wearing a new garment
  1269182: 'on-event', // Supplication of Istikhārah (guidance-seeking) prayer
  1269317: 'on-event', // Supplication for waking up frightened and those afflicted with loneliness
  1269320: 'on-event', // What to do when one sees a vision or a dream
  1269341: 'on-event', // Supplication for anxiety and grief
  1269346: 'on-event', // Supplication for Distress
  1269355: 'on-event', // Supplication for encountering the enemy and one in power
  1269362: 'on-event', // Supplication of one who fears the ruler's tyranny
  1269367: 'on-event', // Supplication against the enemy
  1269370: 'on-event', // What one says when fearing a people
  1269373: 'on-event', // Supplication for one afflicted with an obsession about faith
  1269383: 'on-event', // Supplication for settling debts
  1269388: 'on-event', // Supplication for obsessive whispering during prayer and recitation
  1269391: 'on-event', // Supplication of one who finds a matter difficult
  1269394: 'on-event', // What one should say and do if committed a sin
  1269397: 'on-event', // Supplication for the expulsion of the devil and his whispers
  1269407: 'on-event', // Congratulating for the newborn and response to it
  1269411: 'on-event', // Seeking Allah's refuge for children
  1269415: 'on-event', // Supplication for the patient during visitation
  1269424: 'on-event', // Supplication of the patient who has despaired of his life
  1269431: 'on-event', // Exhorting the dying person
  1269434: 'on-event', // Supplication of one afflicted by calamity
  1269437: 'on-event', // Supplication when closing the eyes of the deceased
  1269440: 'on-event', // Supplication for the deceased in praying over him
  1269449: 'on-event', // Supplication for the deceased child in prayer over him
  1269456: 'on-event', // Supplication of consolation
  1269461: 'on-event', // Supplication when placing the deceased in the grave
  1269464: 'on-event', // Supplication after the burial of the deceased
  1269467: 'on-event', // Supplication for visiting the graves
  1269470: 'on-event', // Supplication of the wind
  1269475: 'on-event', // Supplication for thunder
  1269478: 'on-event', // From the Supplications of Istisqā’ (rain-seeking)
  1269485: 'on-event', // Supplication when seeing the rain
  1269488: 'on-event', // Dhikr after rainfall
  1269491: 'on-event', // From the supplications of Istishā’ (seeking clear sky)
  1269512: 'on-event', // Supplication of the guest for the host
  1269534: 'on-event', // What should be said if the disbeliever sneezes and praises Allah
  1269537: 'on-event', // Supplication for one who got married
  1269540: 'on-event', // Supplication of the newlywed and the purchase of a mount or a vehicle
  1269543: 'on-event', // Supplication before approaching the wife
  1269546: 'on-event', // Supplication of anger
  1269549: 'on-event', // Supplication of seeing an afflicted person
  1269558: 'on-event', // Supplication for one who said: May Allah forgive you
  1269561: 'on-event', // Supplication for one who did you a favor
  1269568: 'on-event', // Supplication for the one who says: I love you for the sake of Allah
  1269571: 'on-event', // Supplication for one offering you his wealth
  1269574: 'on-event', // Supplication for the lender at the time of repayment
  1269577: 'on-event', // Supplication of fear of Shirk (polytheism)
  1269580: 'on-event', // Supplication for the one who said: May Allah bless you
  1269583: 'on-event', // Supplication of disliking Tiyarah (belief in bad omens)
  1269586: 'on-event', // The riding supplication
  1269592: 'on-event', // The travel supplication
  1269600: 'on-event', // Supplication for entering a village or town
  1269603: 'on-event', // Supplication for entering the market
  1269606: 'on-event', // Supplication when one's mount trips
  1269609: 'on-event', // The traveler's supplication for the resident
  1269612: 'on-event', // Supplication of the resident for the traveler
  1269617: 'on-event', // Takbīr (proclaiming Allah's greatness) and Tasbīh (glorifying Allah) while traveling
  1269620: 'on-event', // Traveler's supplication at dawn
  1269623: 'on-event', // The supplication when one alights at a place during travel or otherwise
  1269626: 'on-event', // Dhikr of returning from a journey
  1269629: 'on-event', // What one should say when something pleasant or unpleasant happens to him
  1269659: 'on-event', // How to return the greeting to a disbeliever if he greets you
  1269662: 'on-event', // Supplication upon hearing the crowing of rooster and braying of donkey
  1269665: 'on-event', // Supplication upon hearing the barking of dogs at night
  1269668: 'on-event', // Supplication for one you insulted
  1269672: 'on-event', // What a Muslim should say when praising another Muslim
  1269676: 'on-event', // What a Muslim should say when praised
  1269679: 'on-event', // How the Muhrim makes the Talbiyah during Hajj or ‘Umrah
  1269682: 'on-event', // Saying Takbīr when approaching the Black Stone
  1269685: 'on-event', // Supplication between the Yemeni Corner and the Black Stone
  1269688: 'on-event', // Supplication while standing on Safa and Marwah
  1269693: 'on-event', // Supplication on the Day of ‘Arafah
  1269697: 'on-event', // Dhikr at Al-Mash‘ar Al-Harām (in Muzdalifah)
  1269700: 'on-event', // Making Takbīr upon throwing the Jamrahs with every pebble
  1269703: 'on-event', // Supplication of amazement and delightful matter
  1269708: 'on-event', // What one should do when something pleasant occurs
  1269711: 'on-event', // What to do and say when one feels pain in his body
  1269714: 'on-event', // Supplication if one fears to affect something with an evil eye
  1269717: 'on-event', // Dhikr at times of panic
  1269723: 'on-event', // What to say to repel the plots of the rebellious devils
};

/**
 * Collections — the ordered sets, added from Phase 2 onward.
 *
 * Empty until the 99 names land in Phase 3. A collection with no row here
 * fails `content:audit` by name, which is how a new one is stopped from
 * shipping as a page nothing can place.
 */
const COLLECTIONS: Readonly<Record<string, Cadence>> = {
  /* One name a day is a fortnight's practice, and then it comes round again. */
  'quranic-names': 'daily',
  /*
    NOT `daily`, deliberately.

    `dailyEntry` alternates between the collections whose cadence is `daily`,
    so a second one would mean a name one day and a duʿa the next — and the 99
    names would take 198 days to come round instead of 99. One daily practice
    is a practice; two is a rota. These live on the Duʿa tab, which is where
    somebody goes looking for a duʿa.
  */
  'quranic-duas': 'once',
};

/** Every cadence in the app, keyed as `kind:id`. */
export const CADENCE: Readonly<Record<string, Cadence>> = {
  ...Object.fromEntries(Object.entries(GUIDES).map(([id, c]) => [`guide:${id}`, c])),
  ...Object.fromEntries(Object.entries(REFERENCES).map(([id, c]) => [`reference:${id}`, c])),
  ...Object.fromEntries(Object.entries(PILLARS).map(([id, c]) => [`pillar:${id}`, c])),
  ...Object.fromEntries(Object.entries(ARTICLES).map(([id, c]) => [`article:${id}`, c])),
  ...Object.fromEntries(Object.entries(PHRASES).map(([id, c]) => [`phrase:${id}`, c])),
  ...Object.fromEntries(Object.entries(HISN).map(([id, c]) => [`hisn:${id}`, c])),
  ...Object.fromEntries(Object.entries(COLLECTIONS).map(([id, c]) => [`collection:${id}`, c])),
};

/** The cadence of what a ref points at, or undefined if nobody has decided. */
export function cadenceFor(reference: ContentRef): Cadence | undefined {
  return CADENCE[`${reference.kind}:${reference.id}`];
}
