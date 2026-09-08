import type { ReactNode } from 'react';

import styles from './SelectableCard.module.css';

type SelectableCardProps = {
  selected: boolean;
  onSelect: () => void;
  /** Rendered as a radio group option when true (default). */
  name?: string;
  disabled?: boolean;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Card with radio semantics. Used anywhere the user picks one option
 * from a list (EMI plans today, could be delivery slots tomorrow).
 * The whole card is the hit target; the visual radio is decorative.
 */
export function SelectableCard({
  selected,
  onSelect,
  disabled = false,
  children,
  ariaLabel,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onSelect}
      className={[
        styles.card,
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.radio} aria-hidden="true" />
      <span className={styles.body}>{children}</span>
    </button>
  );
}
