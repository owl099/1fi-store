import { mockRequest, type MockRequestOptions } from './client';

/**
 * Order placement.
 *
 * In the real app this hands off to the lending flow (KYC, mandate,
 * loan agreement). Here it just mints a reference id so the UI can show
 * a confirmation screen and exercise mutation loading/error states.
 */
export type CreateOrderPayload = {
  productId: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  planId: string;
  tenureMonths: number;
  monthlyInstallment: number;
  principal: number;
  totalPayable: number;
};

export type Order = {
  orderId: string;
  status: 'confirmed';
  createdAt: string;
  firstEmiOn: string;
  payload: CreateOrderPayload;
};

function reference(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  return `1FM-${stamp}-${rand}`;
}

export async function createOrder(
  payload: CreateOrderPayload,
  options?: MockRequestOptions,
): Promise<Order> {
  return mockRequest<Order>(() => {
    const now = new Date();
    const firstEmi = new Date(now);
    firstEmi.setDate(firstEmi.getDate() + 30);

    return {
      orderId: reference(),
      status: 'confirmed',
      createdAt: now.toISOString(),
      firstEmiOn: firstEmi.toISOString(),
      payload,
    };
  }, options);
}
