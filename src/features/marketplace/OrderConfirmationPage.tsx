import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import { CheckCircleIcon } from '@/components/icons';
import { formatINR } from '@/lib/money';
import { formatDate } from '@/lib/date';
import type { Order } from '@/services/api/orders';
import styles from './OrderConfirmationPage.module.css';

/**
 * Terminal screen of the Marketplace flow. The full order is passed via
 * navigation state; a bare `?ref=` (e.g. after a refresh) still renders a
 * minimal confirmation so the user isn't dropped on a dead page.
 */
export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const order = (location.state as { order?: Order } | null)?.order;
  const ref = order?.orderId ?? params.get('ref');

  if (!ref) {
    return <Navigate to="/shop/marketplace" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.check}>
          <CheckCircleIcon size={34} />
        </span>
        <h1 className={styles.title}>Order confirmed</h1>
        <p className={styles.subtitle}>
          Your EMI request is in. We’ll set up the loan against your mutual
          funds and notify you once it’s active.
        </p>
        <span className={styles.ref}>Reference {ref}</span>
      </div>

      {order && (
        <div className={styles.card}>
          <Line label="Item" value={order.payload.productName} />
          <Line label="Variant" value={order.payload.variantLabel} />
          <Line
            label="EMI"
            value={`${formatINR(order.payload.monthlyInstallment)}/mo × ${
              order.payload.tenureMonths
            }`}
          />
          <Line label="Total payable" value={formatINR(order.payload.totalPayable)} />
          <Line label="First EMI on" value={formatDate(order.firstEmiOn)} />
        </div>
      )}

      <div className={styles.actions}>
        <Button
          size="lg"
          fullWidth
          onClick={() => navigate('/shop/marketplace')}
        >
          Back to Marketplace
        </Button>
        <Button
          size="lg"
          variant="ghost"
          fullWidth
          onClick={() => navigate('/home')}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.line}>
      <span>{label}</span>
      <span className={styles.lineValue}>{value}</span>
    </div>
  );
}
