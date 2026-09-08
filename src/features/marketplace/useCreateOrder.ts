import { useMutation } from '@tanstack/react-query';

import { createOrder, type CreateOrderPayload } from '@/services/api/orders';

/** Mutation for placing a Marketplace EMI order. */
export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
  });
}
