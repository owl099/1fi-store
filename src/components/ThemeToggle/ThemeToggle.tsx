import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from '@/lib/theme';
import styles from './ThemeToggle.module.css';

/** Light / dark switch for the site header. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
