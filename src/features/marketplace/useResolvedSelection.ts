import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ApiError } from '@/services/api/client';
import type { EmiPlan, EmiQuote, Product, ProductVariant } from './types';
import { useEmiQuote, useProduct } from './queries';
import {
  pickDefaultPlan,
  pickDefaultVariant,
  readSelectionParams,
} from './selection';

type ResolvedSelection =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'error'; retry: () => void }
  | {
      status: 'ready';
      product: Product;
      variant: ProductVariant;
      plan: EmiPlan;
      quote: EmiQuote;
    };

/**
 * Rebuilds the full purchase selection (product + variant + EMI plan)
 * from the route param and `?variant=` / `?plan=` query string.
 *
 * Because the choice lives in the URL, the checkout and confirmation
 * screens work on a hard refresh or a shared link — they don't depend on
 * navigation state handed over from the product page.
 */
export function useResolvedSelection(
  productId: string | undefined,
): ResolvedSelection {
  const [params] = useSearchParams();
  const { variantId, planId } = readSelectionParams(params);

  const productQuery = useProduct(productId);
  const product = productQuery.data;

  const variant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find((v) => v.id === variantId) ??
      pickDefaultVariant(product)
    );
  }, [product, variantId]);

  const emiQuery = useEmiQuote(
    product && variant
      ? {
          productId: product.id,
          variantId: variant.id,
          principal: variant.price,
        }
      : null,
  );

  const plan = useMemo(() => {
    if (!emiQuery.data) return null;
    return (
      emiQuery.data.plans.find((p) => p.id === planId) ??
      pickDefaultPlan(emiQuery.data)
    );
  }, [emiQuery.data, planId]);

  if (productQuery.isError) {
    if (
      productQuery.error instanceof ApiError &&
      productQuery.error.status === 404
    ) {
      return { status: 'not-found' };
    }
    return { status: 'error', retry: () => void productQuery.refetch() };
  }

  if (emiQuery.isError) {
    return { status: 'error', retry: () => void emiQuery.refetch() };
  }

  if (
    productQuery.isPending ||
    !product ||
    !variant ||
    emiQuery.isPending ||
    !emiQuery.data
  ) {
    return { status: 'loading' };
  }

  if (!plan) {
    // Price too low for any plan — treat as an error the user can escape.
    return { status: 'error', retry: () => void emiQuery.refetch() };
  }

  return {
    status: 'ready',
    product,
    variant,
    plan,
    quote: emiQuery.data,
  };
}
