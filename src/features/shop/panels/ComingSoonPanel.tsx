import type { ReactNode } from 'react';

import styles from './ComingSoonPanel.module.css';

type ComingSoonPanelProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

/**
 * Shared placeholder for Shop sections that aren't part of this
 * assignment (Top Brands, Nearby Stores). Kept deliberately minimal but
 * on-brand rather than a blank screen.
 */
export function ComingSoonPanel({
  icon,
  title,
  description,
}: ComingSoonPanelProps) {
  return (
    <div className="container">
      <div className={styles.panel}>
        <span className={styles.icon}>{icon}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <span className={styles.badge}>Coming soon</span>
      </div>
    </div>
  );
}
