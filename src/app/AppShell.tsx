import { Outlet } from 'react-router-dom';

import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import styles from './AppShell.module.css';

/**
 * Top-level web app layout: a sticky site header, the routed page, and a
 * footer. Every screen renders through the <Outlet />.
 */
export function AppShell() {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
