import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { EmiQuote, Product, ProductVariant } from './types';
import type { EmiPlan } from '@/lib/emi';

/**
 * Selection state (chosen variant + chosen EMI plan) is stored in the
 * URL query string rather than component state or context.
 *
 * Why: it survives refresh and the back button, it's shareable, and the
 * checkout screen can reconstruct the exact selection from the link
 * alone. React Query holds the server data; the URL holds the choice.
 */

const VARIANT_PARAM = 'variant';
const PLAN_PARAM = 'plan';

export function pickDefaultVariant(product: Product): ProductVariant {
  const inStock = product.variants.filter((v) => v.inStock);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return pool.reduce((min, v) => (v.price < min.price ? v : min));
}

export function pickDefaultPlan(quote: EmiQuote | undefined): EmiPlan | null {
  if (!quote || quote.plans.length === 0) return null;
  return quote.plans.find((p) => p.recommended) ?? quote.plans[0];
}

export function useVariantSelection(product: Product) {
  const [params, setParams] = useSearchParams();

  const selected = useMemo(() => {
    const fromUrl = product.variants.find(
      (v) => v.id === params.get(VARIANT_PARAM),
    );
    return fromUrl ?? pickDefaultVariant(product);
  }, [params, product]);

  const select = useCallback(
    (variantId: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(VARIANT_PARAM, variantId);
          // A plan is sized to a principal — drop it when the price changes.
          next.delete(PLAN_PARAM);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  return { selectedVariant: selected, selectVariant: select };
}

export function usePlanSelection(quote: EmiQuote | undefined) {
  const [params, setParams] = useSearchParams();

  const selected = useMemo(() => {
    if (!quote) return null;
    const fromUrl = quote.plans.find((p) => p.id === params.get(PLAN_PARAM));
    return fromUrl ?? pickDefaultPlan(quote);
  }, [params, quote]);

  const select = useCallback(
    (planId: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(PLAN_PARAM, planId);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  return { selectedPlan: selected, selectPlan: select };
}

/** Read a raw variant/plan id pair from a query string (checkout screen). */
export function readSelectionParams(params: URLSearchParams) {
  return {
    variantId: params.get(VARIANT_PARAM),
    planId: params.get(PLAN_PARAM),
  };
}
