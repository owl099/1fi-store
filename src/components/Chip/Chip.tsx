import type { ButtonHTMLAttributes } from 'react';

import styles from './Chip.module.css';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

/** Compact selectable pill — used for category filters. */
export function Chip({ selected = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={[styles.chip, selected ? styles.selected : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
