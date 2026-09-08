import type { EmiPlanTemplate } from '@/lib/emi';

/**
 * EMI plan templates offered on the 1Fi Marketplace.
 *
 * These are rate/tenure/fee definitions only — the actual instalment
 * numbers are computed per purchase from the selected variant's price
 * (see `lib/emi.ts` and `services/api/emi.ts`). A plan can be gated by a
 * minimum principal so short low-value carts don't see 24-month options.
 */
export type EmiPlanConfig = EmiPlanTemplate & {
  minPrincipal?: number;
};

export const EMI_PROVIDER = 'Loan against Mutual Funds · 1Fi';

export const emiPlanConfigs: EmiPlanConfig[] = [
  {
    id: 'nc-3',
    tenureMonths: 3,
    annualRatePercent: 0,
    processingFee: 0,
    provider: EMI_PROVIDER,
    tag: 'No Cost EMI',
  },
  {
    id: 'std-6',
    tenureMonths: 6,
    annualRatePercent: 10.5,
    processingFee: 199,
    provider: EMI_PROVIDER,
    recommended: true,
  },
  {
    id: 'std-9',
    tenureMonths: 9,
    annualRatePercent: 11.25,
    processingFee: 249,
    provider: EMI_PROVIDER,
    minPrincipal: 15000,
  },
  {
    id: 'std-12',
    tenureMonths: 12,
    annualRatePercent: 11.99,
    processingFee: 299,
    provider: EMI_PROVIDER,
    minPrincipal: 20000,
  },
  {
    id: 'std-18',
    tenureMonths: 18,
    annualRatePercent: 12.75,
    processingFee: 349,
    provider: EMI_PROVIDER,
    minPrincipal: 40000,
  },
  {
    id: 'std-24',
    tenureMonths: 24,
    annualRatePercent: 13.5,
    processingFee: 399,
    provider: EMI_PROVIDER,
    minPrincipal: 60000,
  },
];
