import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { BackLink } from '@/components/BackLink/BackLink';
import { Button } from '@/components/Button/Button';
import { ProductImage } from '@/components/ProductImage/ProductImage';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { StateView, ErrorState } from '@/components/StateView/StateView';
import { AlertIcon, CheckCircleIcon } from '@/components/icons';
import { formatINR } from '@/lib/money';
import { addDays, formatDate } from '@/lib/date';
import { useResolvedSelection } from './useResolvedSelection';
import { useCreateOrder } from './useCreateOrder';
import styles from './CheckoutPage.module.css';

const MARKETPLACE_PATH = '/shop/marketplace';

export function CheckoutPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selection = useResolvedSelection(productId);
  const createOrder = useCreateOrder();
  const [agreed, setAgreed] = useState(false);

  const productPath = `/shop/marketplace/product/${productId}`;
  const backToProduct = () =>
    navigate(
      { pathname: productPath, search: location.search },
      { replace: true },
    );

  if (selection.status === 'loading') {
    return <CheckoutSkeleton />;
  }

  if (selection.status === 'not-found') {
    return (
      <div className={`container ${styles.page}`}>
        <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>
        <div className={styles.stateWrap}>
          <StateView
            title="Product unavailable"
            message="We couldn’t find this item. It may have been removed."
            action={{
              label: 'Back to Marketplace',
              onClick: () => navigate(MARKETPLACE_PATH),
            }}
          />
        </div>
      </div>
    );
  }

  if (selection.status === 'error') {
    return (
      <div className={`container ${styles.page}`}>
        <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>
        <div className={styles.stateWrap}>
          <ErrorState onRetry={selection.retry} />
        </div>
      </div>
    );
  }

  const { product, variant, plan } = selection;

  const handleConfirm = () => {
    createOrder.mutate(
      {
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantLabel: variant.label,
        planId: plan.id,
        tenureMonths: plan.tenureMonths,
        monthlyInstallment: plan.monthlyInstallment,
        principal: variant.price,
        totalPayable: plan.totalPayable,
      },
      {
        onSuccess: (order) => {
          navigate(
            {
              pathname: `${productPath}/confirmation`,
              search: `?ref=${order.orderId}`,
            },
            { replace: true, state: { order } },
          );
        },
      },
    );
  };

  return (
    <div className={`container ${styles.page}`}>
      <BackLink to={productPath}>Back to product</BackLink>
      <h1 className={styles.title}>Review your order</h1>

      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Item</h2>
              <button className={styles.change} onClick={backToProduct}>
                Change
              </button>
            </div>
            <div className={styles.item}>
              <div className={styles.thumb}>
                <ProductImage
                  src={product.images[0]}
                  fallbackSrc={product.imageFallback}
                  alt={product.name}
                  ratio={1}
                />
              </div>
              <div className={styles.itemBody}>
                <p className={styles.itemName}>{product.name}</p>
                <p className={styles.itemVariant}>{variant.label}</p>
                <p className={styles.itemPrice}>{formatINR(variant.price)}</p>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>EMI plan</h2>
              <button className={styles.change} onClick={backToProduct}>
                Change
              </button>
            </div>
            <div className={styles.planRow}>
              <span className={styles.planMonthly}>
                {formatINR(plan.monthlyInstallment)}
                <span className={styles.per}>/mo</span>
              </span>
              <span className={styles.planTenure}>
                {plan.tenureMonths} months
              </span>
            </div>
            <p className={styles.planProvider}>
              {plan.provider}
              {plan.annualRatePercent > 0
                ? ` · ${plan.annualRatePercent}% p.a.`
                : ' · No cost EMI'}
            </p>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Repayment schedule</h2>
            <dl className={styles.summary}>
              <Row
                label="Monthly EMI"
                value={`${formatINR(plan.monthlyInstallment)} × ${plan.tenureMonths}`}
              />
              <Row
                label="First EMI on"
                value={formatDate(addDays(new Date(), 30))}
              />
              <Row label="Auto-debit" value="From your linked bank account" />
            </dl>
          </section>
        </div>

        <aside className={styles.aside}>
          <div className={styles.orderCard}>
            <h2 className={styles.cardTitle}>Order summary</h2>
            <dl className={styles.summary}>
              <Row label="Item price" value={formatINR(variant.price)} />
              <Row
                label="Processing fee"
                value={
                  plan.processingFee > 0
                    ? formatINR(plan.processingFee)
                    : 'Nil'
                }
              />
              <Row
                label={`Interest (${
                  plan.annualRatePercent > 0
                    ? `${plan.annualRatePercent}% p.a.`
                    : 'no cost'
                })`}
                value={
                  plan.totalInterest > 0 ? formatINR(plan.totalInterest) : 'Nil'
                }
              />
              <Row
                label="Total payable"
                value={formatINR(plan.totalPayable)}
                emphasis
              />
            </dl>

            <p className={styles.hint}>
              Financed against your mutual funds:{' '}
              <strong>{formatINR(variant.price)}</strong>. Your units are
              pledged, not sold.
            </p>

            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I authorise 1Fi to create a loan against my mutual funds for
                this purchase and set up the EMI auto-debit mandate.
              </span>
            </label>

            {createOrder.isError && (
              <div className={styles.errorBanner} role="alert">
                <AlertIcon size={18} />
                <span>Couldn’t place the order. Please try again.</span>
              </div>
            )}

            <Button
              size="lg"
              fullWidth
              onClick={handleConfirm}
              loading={createOrder.isPending}
              disabled={!agreed}
              leadingIcon={<CheckCircleIcon size={18} />}
            >
              Confirm &amp; proceed
            </Button>
            <p className={styles.finePrint}>
              You’ll pay {formatINR(plan.monthlyInstallment)}/mo for{' '}
              {plan.tenureMonths} months.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={emphasis ? `${styles.row} ${styles.rowEmphasis}` : styles.row}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className={`container ${styles.page}`}>
      <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>
      <h1 className={styles.title}>Review your order</h1>
      <div className={styles.layout}>
        <div className={styles.main}>
          <Skeleton height={120} radius={16} />
          <Skeleton height={110} radius={16} />
          <Skeleton height={150} radius={16} />
        </div>
        <aside className={styles.aside}>
          <Skeleton height={340} radius={16} />
        </aside>
      </div>
    </div>
  );
}
