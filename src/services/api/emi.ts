import { buildEmiPlan, type EmiPlan } from '@/lib/emi';
import { emiPlanConfigs } from '@/services/mock/emiConfig';
import type { EmiQuote } from '@/features/marketplace/types';
import { mockRequest, type MockRequestOptions } from './client';

/**
 * Return the EMI plan templates that apply to a given principal, sorted
 * by tenure. Plans can set `minPrincipal` to stay hidden on small carts.
 */
function applicableConfigs(principal: number) {
  return emiPlanConfigs
    .filter((c) => principal >= (c.minPrincipal ?? 0))
    .sort((a, b) => a.tenureMonths - b.tenureMonths);
}

/** Cheapest monthly instalment available for a principal (for listings). */
export function lowestEmiPerMonth(principal: number): number {
  const plans = applicableConfigs(principal).map((c) =>
    buildEmiPlan(c, principal),
  );
  if (plans.length === 0) return 0;
  return Math.min(...plans.map((p) => p.monthlyInstallment));
}

export type EmiQuoteParams = {
  productId: string;
  variantId: string;
  principal: number;
};

/**
 * "GET /emi/quote" — compute the full set of EMI plans for a specific
 * purchase. The instalment maths lives in `lib/emi.ts`; this endpoint
 * only decides which templates apply and marks the recommended one.
 */
export async function fetchEmiQuote(
  { productId, variantId, principal }: EmiQuoteParams,
  options?: MockRequestOptions,
): Promise<EmiQuote> {
  return mockRequest<EmiQuote>(() => {
    const plans: EmiPlan[] = applicableConfigs(principal).map((config) =>
      buildEmiPlan(config, principal),
    );

    // Guarantee exactly one recommended plan even if config drifts.
    if (plans.length > 0 && !plans.some((p) => p.recommended)) {
      const mid = plans[Math.floor(plans.length / 2)];
      mid.recommended = true;
    }

    return {
      productId,
      variantId,
      principal,
      currency: 'INR',
      plans,
    };
  }, options);
}
