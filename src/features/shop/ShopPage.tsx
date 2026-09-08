import { Outlet } from 'react-router-dom';

import { SegmentedNav } from '@/components/SegmentedNav/SegmentedNav';
import styles from './ShopPage.module.css';

const SHOP_TABS = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
];

/**
 * Shop section of the app. Hosts three sub-sections; only "1Fi
 * Marketplace" is built out for this assignment — the other two are
 * intentional placeholders. The active section is a nested route so each
 * is deep-linkable.
 */
export function ShopPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Shop</h1>
        <SegmentedNav items={SHOP_TABS} ariaLabel="Shop sections" />
      </div>
      <Outlet />
    </div>
  );
}
