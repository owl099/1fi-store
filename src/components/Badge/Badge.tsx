import type { ReactNode } from 'react';

import styles from './Badge.module.css';

type BadgeProps = {
  children: ReactNode;
  tone?: 'primary' | 'success' | 'neutral' | 'warning';
  size?: 'sm' | 'md';
};

/** Small non-interactive label — discounts, "No Cost EMI", stock status. */
export function Badge({ children, tone = 'neutral', size = 'md' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${styles[size]}`}>
      {children}
    </span>
  );
}
