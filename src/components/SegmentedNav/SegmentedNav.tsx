import { NavLink } from 'react-router-dom';

import styles from './SegmentedNav.module.css';

export type SegmentedNavItem = {
  to: string;
  label: string;
  /** Match the route exactly (used for index-style tabs). */
  end?: boolean;
};

type SegmentedNavProps = {
  items: SegmentedNavItem[];
  ariaLabel: string;
};

/**
 * Horizontal, route-linked tab strip. Used for the Shop sub-sections
 * (Top Brands / Nearby Stores / 1Fi Marketplace); the active tab is
 * driven by the URL so sections are deep-linkable.
 */
export function SegmentedNav({ items, ariaLabel }: SegmentedNavProps) {
  return (
    <div className={styles.scroller}>
      <nav className={styles.nav} aria-label={ariaLabel}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.active}` : styles.tab
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
