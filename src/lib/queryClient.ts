import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client.
 *
 * Server state (products, EMI plans) is owned by React Query so every
 * screen gets caching, de-duped requests and consistent loading/error
 * semantics without bespoke reducers.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Centralised query keys. Keeping them in one place avoids typos and
 * makes targeted cache invalidation easy.
 */
export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (params: Record<string, unknown> = {}) =>
      ['products', 'list', params] as const,
    byIds: (ids: readonly string[]) => ['products', 'byIds', ids] as const,
    detail: (productId: string) => ['products', 'detail', productId] as const,
  },
  emi: {
    plans: (productId: string, variantId: string, principal: number) =>
      ['emi', 'plans', productId, variantId, principal] as const,
  },
} as const;
