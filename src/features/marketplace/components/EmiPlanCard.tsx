import { SelectableCard } from '@/components/SelectableCard/SelectableCard';
import { Badge } from '@/components/Badge/Badge';
import { formatINR } from '@/lib/money';
import type { EmiPlan } from '@/lib/emi';
import styles from './EmiPlanCard.module.css';

type EmiPlanCardProps = {
  plan: EmiPlan;
  selected: boolean;
  onSelect: () => void;
};

export function EmiPlanCard({ plan, selected, onSelect }: EmiPlanCardProps) {
  const noCost = plan.annualRatePercent <= 0;

  return (
    <SelectableCard
      selected={selected}
      onSelect={onSelect}
      ariaLabel={`${plan.tenureMonths} month plan, ${formatINR(
        plan.monthlyInstallment,
      )} per month`}
    >
      <div className={styles.header}>
        <span className={styles.tenure}>{plan.tenureMonths} months</span>
        <span className={styles.tags}>
          {plan.tag && (
            <Badge tone="success" size="sm">
              {plan.tag}
            </Badge>
          )}
          {plan.recommended && (
            <Badge tone="primary" size="sm">
              Recommended
            </Badge>
          )}
        </span>
      </div>

      <p className={styles.amount}>
        {formatINR(plan.monthlyInstallment)}
        <span className={styles.per}>/mo</span>
      </p>

      <dl className={styles.meta}>
        <div>
          <dt>Interest</dt>
          <dd>{noCost ? 'No cost' : `${plan.annualRatePercent}% p.a.`}</dd>
        </div>
        <div>
          <dt>Processing fee</dt>
          <dd>{plan.processingFee > 0 ? formatINR(plan.processingFee) : 'Nil'}</dd>
        </div>
        <div>
          <dt>Total payable</dt>
          <dd>{formatINR(plan.totalPayable)}</dd>
        </div>
      </dl>

      <p className={styles.provider}>{plan.provider}</p>
    </SelectableCard>
  );
}
