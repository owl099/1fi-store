const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** "8 Oct 2026" */
export function formatDate(value: Date | string): string {
  return dateFormatter.format(typeof value === 'string' ? new Date(value) : value);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
