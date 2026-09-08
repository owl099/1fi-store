import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryClient';
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchProductsByIds,
  type ProductQuery,
} from '@/services/api/products';
import { fetchEmiQuote, type EmiQuoteParams } from '@/services/api/emi';

/**
 * React Query bindings for the Marketplace.
 *
 * Components consume these hooks and render off `data / isPending /
 * isError` — no data fetching or caching logic leaks into the UI.
 */

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: Infinity,
  });
}

export function useProducts(query: ProductQuery) {
  return useQuery({
    queryKey: queryKeys.products.list(query),
    queryFn: () => fetchProducts(query),
    placeholderData: (previous) => previous, // keep list visible while refiltering
  });
}

export function useProductsByIds(ids: readonly string[]) {
  return useQuery({
    queryKey: queryKeys.products.byIds(ids),
    queryFn: () => fetchProductsByIds([...ids]),
    enabled: ids.length > 0,
    placeholderData: (previous) => previous,
  });
}

export function useProduct(productId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(productId ?? ''),
    queryFn: () => fetchProductById(productId as string),
    enabled: Boolean(productId),
  });
}

export function useEmiQuote(params: EmiQuoteParams | null) {
  return useQuery({
    queryKey: params
      ? queryKeys.emi.plans(params.productId, params.variantId, params.principal)
      : ['emi', 'disabled'],
    queryFn: () => fetchEmiQuote(params as EmiQuoteParams),
    enabled: Boolean(params && params.principal > 0),
    staleTime: 5 * 60_000,
  });
}
