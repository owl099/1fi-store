/**
 * Money helpers.
 *
 * All monetary values in the app are plain rupees (₹). Keeping a single
 * formatter here guarantees every screen renders currency the same way —
 * Indian digit grouping, no decimals unless explicitly requested.
 */

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrWithPaise = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatINR(amount: number, opts?: { paise?: boolean }): string {
  return (opts?.paise ? inrWithPaise : inr).format(amount);
}

/** Percentage saving of `price` against `mrp`, rounded to a whole number. */
export function discountPercent(mrp: number, price: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
