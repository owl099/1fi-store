/**
 * EMI maths.
 *
 * 1Fi lets a user pay for a purchase over time using a loan against
 * their mutual-fund holdings. Given a principal and a plan template
 * (tenure + annual rate + fees) these helpers derive the numbers shown
 * on the EMI cards: the monthly instalment, total interest and total
 * payable. The mock EMI API composes plans from `emiPlanConfig` using
 * exactly these functions, so nothing is hard-coded per product.
 */

export type EmiPlanTemplate = {
  id: string;
  tenureMonths: number;
  /** Annual interest rate, percent. `0` for a no-cost EMI plan. */
  annualRatePercent: number;
  /** Flat processing fee in rupees. */
  processingFee: number;
  provider: string;
  /** Marketing label, e.g. "No Cost EMI". */
  tag?: string;
  recommended?: boolean;
};

export type EmiPlan = EmiPlanTemplate & {
  principal: number;
  monthlyInstallment: number;
  totalInterest: number;
  /** principal + interest + processing fee */
  totalPayable: number;
};

/**
 * Standard reducing-balance EMI:
 *   E = P·r·(1+r)^n / ((1+r)^n − 1)
 * where r is the monthly rate and n the tenure in months. Falls back to
 * a straight division when the rate is zero (no-cost EMI).
 */
export function monthlyInstallment(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): number {
  if (tenureMonths <= 0) return principal;
  if (annualRatePercent <= 0) return principal / tenureMonths;

  const r = annualRatePercent / 100 / 12;
  const compound = Math.pow(1 + r, tenureMonths);
  return (principal * r * compound) / (compound - 1);
}

/** Materialise a plan template against a concrete principal. */
export function buildEmiPlan(
  template: EmiPlanTemplate,
  principal: number,
): EmiPlan {
  const rawInstallment = monthlyInstallment(
    principal,
    template.annualRatePercent,
    template.tenureMonths,
  );
  const monthly = Math.round(rawInstallment);
  const totalOfInstallments = monthly * template.tenureMonths;
  const totalInterest = Math.max(0, totalOfInstallments - principal);

  return {
    ...template,
    principal,
    monthlyInstallment: monthly,
    totalInterest,
    totalPayable: principal + totalInterest + template.processingFee,
  };
}
