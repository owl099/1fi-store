import { Link } from 'react-router-dom';

import { ChevronLeftIcon } from '@/components/icons';
import styles from './BackLink.module.css';

type BackLinkProps = {
  to: string;
  children: React.ReactNode;
};

/** Text back-navigation used at the top of standalone flow pages. */
export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className={styles.link}>
      <ChevronLeftIcon size={16} />
      <span>{children}</span>
    </Link>
  );
}
