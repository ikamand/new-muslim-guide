import {
  NISAB_GRAMS,
  PRICES,
  ZAKAT_RATE,
  type NisabStandard,
  type PricePerGram,
} from '@/content/nisab';

/**
 * The zakat arithmetic, and nothing else.
 *
 * ## What this is allowed to decide
 *
 * Multiplication. Total × 2.5%, and whether that total clears a threshold.
 * Both come straight from the texts: **Abu Dawud 1572** — "pay a fortieth" —
 * and **Bukhari 1447**, no zakat below five awāq of silver.
 *
 * ## What this is NOT allowed to decide, and does not
 *
 * What counts as wealth. That is where the whole difficulty of zakat lives,
 * and it is fiqh rather than arithmetic: whether debts are deducted, whether
 * jewellery you wear is included, how a pension or a share or a crypto holding
 * is treated. Reasonable scholars answer those differently and some of them
 * are modern questions with no settled answer at all.
 *
 * So this function takes three numbers a person can be sure of — cash, grams
 * of gold, grams of silver — and gives back a working-out. Every screen using
 * it has to say what was left out. It never returns "you owe".
 *
 * ## Two thresholds, ten times apart
 *
 * Gold nisab is currently worth roughly ten times silver nisab, so which one
 * is used decides whether most people owe anything at all. The app shows both
 * and leads with silver, which IslamQA describes as the more conservative
 * choice and the better one for the poor — more givers, and more reaching
 * those entitled to it. That is a position, and the screen says it is one.
 *
 * ## The threshold is not a deduction
 *
 * Above nisab, zakat is due on the WHOLE amount, not on the part above the
 * line. This is the error most easily made and it changes the answer
 * substantially at balances near the threshold.
 */

export type Holdings = {
  /** Money in hand, in accounts, and saved. */
  cash: number;
  /** Grams of gold held. */
  goldGrams: number;
  /** Grams of silver held. */
  silverGrams: number;
};

export type Threshold = {
  metal: 'gold' | 'silver';
  grams: number;
  /** What that weight is worth in the chosen currency. */
  value: number;
  /** Whether the holdings reach it. */
  reached: boolean;
};

export type Working = {
  currency: string;
  standard: NisabStandard;
  /** Cash plus the market value of the metal held. */
  total: number;
  /** Both thresholds, silver first — see the header. */
  thresholds: readonly Threshold[];
  /**
   * 2.5% of the whole total, computed regardless of whether a threshold is
   * reached — because the screen shows the sum either way, and hiding it below
   * the line would make the number feel like a verdict rather than a working.
   */
  due: number;
};

const round = (value: number) => Math.round(value * 100) / 100;

export function priceFor(currency: string): PricePerGram | undefined {
  return PRICES[currency];
}

/**
 * The working-out. Never a ruling.
 *
 * Returns undefined for a currency the snapshot does not carry, which the
 * screen reports as "this app does not have a price in your money" rather than
 * converting through a rate it does not have.
 */
export function work(
  holdings: Holdings,
  currency: string,
  standard: NisabStandard = 'common',
): Working | undefined {
  const price = priceFor(currency);
  if (!price) return undefined;

  const grams = NISAB_GRAMS[standard];
  const total = round(
    holdings.cash + holdings.goldGrams * price.gold + holdings.silverGrams * price.silver,
  );

  /* Silver first, deliberately. See the header. */
  const thresholds: Threshold[] = (['silver', 'gold'] as const).map((metal) => {
    const value = round(grams[metal] * price[metal]);
    return { metal, grams: grams[metal], value, reached: total >= value };
  });

  return { currency, standard, total, thresholds, due: round(total * ZAKAT_RATE) };
}
