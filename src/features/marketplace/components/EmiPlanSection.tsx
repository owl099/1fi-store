import { Skeleton } from '@/components/Skeleton/Skeleton';
import { ErrorState } from '@/components/StateView/StateView';
import type { EmiQuote } from '../types';
import { EmiPlanCard } from './EmiPlanCard';
import styles from './EmiPlanSection.module.css';

type EmiPlanSectionProps = {
  quote: EmiQuote | undefined;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  selectedPlanId: string | undefined;
  onSelectPlan: (planId: string) => void;
  disabled?: boolean;
};

/**
 * "Choose an EMI plan" block on the product page. Plans are fetched for
 * the selected variant's price, so the list re-loads whenever the user
 * switches variant.
 */
export function EmiPlanSection({
  quote,
  isPending,
  isError,
  onRetry,
  selectedPlanId,
  onSelectPlan,
  disabled = false,
}: EmiPlanSectionProps) {
  if (isError) {
    return (
      <ErrorState
        message="Couldn’t load EMI plans for this item."
        onRetry={onRetry}
      />
    );
  }

  if (isPending || !quote) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={132} radius={16} />
        ))}
      </div>
    );
  }

  if (quote.plans.length === 0) {
    return (
      <p className={styles.empty}>
        EMI isn’t available for this item’s price right now.
      </p>
    );
  }

  return (
    <div
      className={styles.list}
      role="radiogroup"
      aria-label="EMI plans"
      aria-disabled={disabled || undefined}
    >
      {quote.plans.map((plan) => (
        <EmiPlanCard
          key={plan.id}
          plan={plan}
          selected={plan.id === selectedPlanId}
          onSelect={() => onSelectPlan(plan.id)}
        />
      ))}
    </div>
  );
}
