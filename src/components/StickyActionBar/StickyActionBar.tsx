import type { ReactNode } from 'react';

import styles from './StickyActionBar.module.css';

type StickyActionBarProps = {
  /** Optional summary shown to the left of the action (price, instalment). */
  summary?: ReactNode;
  children: ReactNode;
};

/**
 * Purchase panel for the product-detail flow: a summary (price /
 * instalment) plus the primary CTA.
 *
 * On wide screens it renders as an in-flow bordered card; on narrow
 * screens it collapses to a bar pinned to the bottom of the viewport
 * (with safe-area padding) so the CTA stays reachable. See the
 * stylesheet.
 */
export function StickyActionBar({ summary, children }: StickyActionBarProps) {
  return (
    <div className={styles.bar}>
      {summary && <div className={styles.summary}>{summary}</div>}
      <div className={styles.action}>{children}</div>
    </div>
  );
}
