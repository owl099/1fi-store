import styles from './Logo.module.css';

/**
 * 1Fi wordmark — a violet rounded-square badge holding the "1Fi" glyph,
 * optionally followed by the wordmark in ink.
 */
export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={className ? `${styles.logo} ${className}` : styles.logo}>
      <span className={styles.badge} aria-hidden="true">
        1Fi
      </span>
      {withWordmark && <span className={styles.word}>1Fi</span>}
      <span className={styles.srOnly}>1Fi</span>
    </span>
  );
}
