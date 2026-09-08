import type { ReactNode } from 'react';

import { Button } from '@/components/Button/Button';
import { AlertIcon, InfoIcon, PackageIcon } from '@/components/icons';
import styles from './StateView.module.css';

type StateViewProps = {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: { label: string; onClick: () => void };
  tone?: 'neutral' | 'danger';
};

/** Centred icon + copy + optional CTA. Base for empty and error screens. */
export function StateView({
  icon,
  title,
  message,
  action,
  tone = 'neutral',
}: StateViewProps) {
  return (
    <div className={styles.wrap} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className={`${styles.icon} ${styles[tone]}`}>
        {icon ?? <InfoIcon size={26} />}
      </span>
      <p className={styles.title}>{title}</p>
      {message && <p className={styles.message}>{message}</p>}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  message = 'Something went wrong while loading this. Please try again.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <StateView
      tone="danger"
      icon={<AlertIcon size={26} />}
      title="Couldn’t load"
      message={message}
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  );
}

export function EmptyState({
  title = 'Nothing here yet',
  message,
  icon = <PackageIcon size={26} />,
}: {
  title?: string;
  message?: string;
  icon?: ReactNode;
}) {
  return <StateView icon={icon} title={title} message={message} />;
}
