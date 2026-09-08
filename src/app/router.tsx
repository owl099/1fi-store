import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppShell } from '@/app/AppShell';
import { RouteError } from '@/app/RouteError';
import { PlaceholderScreen } from '@/app/PlaceholderScreen';
import { ShopPage } from '@/features/shop/ShopPage';
import { TopBrandsPanel } from '@/features/shop/panels/TopBrandsPanel';
import { NearbyStoresPanel } from '@/features/shop/panels/NearbyStoresPanel';
import { MarketplacePage } from '@/features/marketplace/MarketplacePage';
import { ProductDetailPage } from '@/features/marketplace/ProductDetailPage';
import { CheckoutPage } from '@/features/marketplace/CheckoutPage';
import { OrderConfirmationPage } from '@/features/marketplace/OrderConfirmationPage';

/**
 * Application routes.
 *
 * Everything renders inside `AppShell` (sticky site header + footer). The
 * Shop tab hosts three sub-sections as nested routes; the Marketplace
 * flow (detail → checkout → confirmation) is a set of standalone pages
 * under `/shop/marketplace/product/:id`.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/shop" replace /> },
      { path: 'home', element: <PlaceholderScreen title="Home" /> },
      { path: 'investments', element: <PlaceholderScreen title="Investments" /> },
      { path: 'account', element: <PlaceholderScreen title="Account" /> },
      {
        path: 'shop',
        element: <ShopPage />,
        children: [
          { index: true, element: <Navigate to="/shop/marketplace" replace /> },
          { path: 'top-brands', element: <TopBrandsPanel /> },
          { path: 'nearby-stores', element: <NearbyStoresPanel /> },
          { path: 'marketplace', element: <MarketplacePage /> },
        ],
      },
      {
        path: 'shop/marketplace/product/:productId',
        children: [
          { index: true, element: <ProductDetailPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'confirmation', element: <OrderConfirmationPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <RouteError />,
  },
]);
