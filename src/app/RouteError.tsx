import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import { AlertIcon } from '@/components/icons';
import styles from './RouteError.module.css';

/**
 * Fallback for router-level errors and unmatched URLs. Keeps the user
 * inside the app with a clear way back.
 */
export function RouteError() {
  const navigate = useNavigate();
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const heading = is404 ? 'Page not found' : 'Something went wrong';
  const message = is404
    ? 'The page you’re looking for doesn’t exist or has moved.'
    : 'An unexpected error occurred. Please try again.';

  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>
        <AlertIcon size={28} />
      </span>
      <h1 className={styles.title}>{heading}</h1>
      <p className={styles.message}>{message}</p>
      <Button onClick={() => navigate('/shop/marketplace')}>
        Go to Marketplace
      </Button>
    </div>
  );
}
