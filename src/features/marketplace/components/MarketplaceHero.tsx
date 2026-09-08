import styles from './MarketplaceHero.module.css';

const FACTS: { term: string; value: string }[] = [
  { term: 'Tenure', value: '3–24 months' },
  { term: 'Interest', value: '0% to low-cost' },
  { term: 'Credit score', value: 'Not required' },
  { term: 'Prepayment', value: 'No charges' },
];

/**
 * Intro band for the Marketplace listing. Orients the shopper on how
 * paying with 1Fi works and surfaces the key terms up front, then gets
 * out of the way so the catalogue is the focus.
 */
export function MarketplaceHero() {
  return (
    <section className={styles.hero} aria-labelledby="marketplace-hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>1Fi Marketplace</p>
          <h2 id="marketplace-hero-title" className={styles.title}>
            Shop the latest tech and pay in EMIs from{' '}
            <span className={styles.accent}>your mutual funds</span>
          </h2>
          <p className={styles.lede}>
            Split any purchase into monthly instalments with a loan against your
            holdings. Nothing is redeemed — your units stay invested and keep
            compounding while you pay it off.
          </p>
        </div>

        <dl className={styles.facts}>
          {FACTS.map((fact) => (
            <div key={fact.term} className={styles.fact}>
              <dt>{fact.term}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
