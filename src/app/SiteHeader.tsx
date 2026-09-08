import { NavLink } from 'react-router-dom';

import { UserIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Logo } from './Logo';
import styles from './SiteHeader.module.css';

const NAV = [
  { to: '/home', label: 'Home' },
  { to: '/investments', label: 'Investments' },
  { to: '/shop', label: 'Shop' },
];

/**
 * Floating rounded navigation bar: 1Fi logo, primary nav, then the
 * theme toggle and the account entry point pinned to the right.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <NavLink to="/shop" className={styles.brand} aria-label="1Fi home">
          <Logo />
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? `${styles.account} ${styles.accountActive}` : styles.account
            }
          >
            <UserIcon size={17} />
            <span className={styles.accountLabel}>Account</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
