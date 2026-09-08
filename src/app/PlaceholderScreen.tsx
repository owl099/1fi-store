import { useNavigate } from 'react-router-dom';

import { StateView } from '@/components/StateView/StateView';
import { PackageIcon } from '@/components/icons';
import styles from './PlaceholderScreen.module.css';

/**
 * Stand-in for the app's other destinations (Home, Investments,
 * Account). Out of scope for this assignment — only Shop is built out.
 */
export function PlaceholderScreen({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className={`container ${styles.wrap}`}>
      <StateView
        icon={<PackageIcon size={26} />}
        title={`${title} lives here`}
        message="This section isn’t part of the Marketplace assignment. Head to Shop to see the built-out experience."
        action={{ label: 'Go to Shop', onClick: () => navigate('/shop') }}
      />
    </div>
  );
}
