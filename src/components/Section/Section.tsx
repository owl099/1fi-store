import type { ReactNode } from 'react';

import styles from './Section.module.css';

type SectionProps = {
  title: string;
  /** Optional trailing element in the header (e.g. a "see all" link). */
  action?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

/** Titled content block with consistent spacing between page sections. */
export function Section({ title, action, subtitle, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
