import { Logo } from './Logo';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Logo className={styles.brand} withWordmark />
        <p className={styles.note}>
          Marketplace purchases are funded by a loan against your mutual funds.
          Interest rates shown are indicative. This is a demo build.
        </p>
        <nav className={styles.links} aria-label="Footer">
          <span>Help</span>
          <span>Terms</span>
          <span>Privacy</span>
        </nav>
      </div>
    </footer>
  );
}
