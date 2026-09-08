import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { BackLink } from '@/components/BackLink/BackLink';
import { Button } from '@/components/Button/Button';
import { Rating } from '@/components/Rating/Rating';
import { Section } from '@/components/Section/Section';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { StickyActionBar } from '@/components/StickyActionBar/StickyActionBar';
import { StateView, ErrorState } from '@/components/StateView/StateView';
import { ShieldIcon } from '@/components/icons';
import { ApiError } from '@/services/api/client';
import { discountPercent, formatINR } from '@/lib/money';
import { EmiPlanSection } from './components/EmiPlanSection';
import { ProductGallery } from './components/ProductGallery';
import { HighlightList, SpecList } from './components/ProductInfoLists';
import { RecentlyViewedRow } from './components/RecentlyViewedRow';
import { VariantSelector } from './components/VariantSelector';
import { WishlistButton } from './components/WishlistButton';
import type { Product } from './types';
import { useEmiQuote, useProduct } from './queries';
import { useRecentlyViewed } from './savedProducts';
import { usePlanSelection, useVariantSelection } from './selection';
import styles from './ProductDetailPage.module.css';

const MARKETPLACE_PATH = '/shop/marketplace';

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productQuery = useProduct(productId);

  if (productQuery.isPending) {
    return <ProductDetailSkeleton />;
  }

  if (productQuery.isError) {
    const notFound =
      productQuery.error instanceof ApiError && productQuery.error.status === 404;
    return (
      <div className={`container ${styles.page}`}>
        <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>
        <div className={styles.stateWrap}>
          {notFound ? (
            <StateView
              title="Product not found"
              message="This item may have been removed from the marketplace."
              action={{
                label: 'Back to Marketplace',
                onClick: () => navigate(MARKETPLACE_PATH),
              }}
            />
          ) : (
            <ErrorState onRetry={() => productQuery.refetch()} />
          )}
        </div>
      </div>
    );
  }

  const product = productQuery.data;
  return (
    <ProductDetailContent
      key={product.id}
      product={product}
      onContinue={() =>
        navigate({
          pathname: `/shop/marketplace/product/${product.id}/checkout`,
          search: location.search,
        })
      }
    />
  );
}

type ContentProps = {
  product: Product;
  onContinue: () => void;
};

function ProductDetailContent({ product, onContinue }: ContentProps) {
  const { record: recordRecentlyViewed } = useRecentlyViewed();
  useEffect(() => {
    recordRecentlyViewed(product.id);
  }, [product.id, recordRecentlyViewed]);

  const { selectedVariant, selectVariant } = useVariantSelection(product);

  const emiQuery = useEmiQuote({
    productId: product.id,
    variantId: selectedVariant.id,
    principal: selectedVariant.price,
  });
  const { selectedPlan, selectPlan } = usePlanSelection(emiQuery.data);

  const off = discountPercent(selectedVariant.mrp, selectedVariant.price);
  const galleryImages = selectedVariant.image
    ? [selectedVariant.image, ...product.images]
    : product.images;

  const canContinue = selectedVariant.inStock && Boolean(selectedPlan);

  return (
    <div className={`container ${styles.page}`}>
      <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>

      <div className={styles.layout}>
        <div className={styles.media}>
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            fallback={product.imageFallback}
          />
        </div>

        <div className={styles.buy}>
          <div className={styles.intro}>
            <p className={styles.brand}>{product.brand}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <div className={styles.introMeta}>
              <Rating value={product.rating} count={product.ratingCount} />
              {off > 0 && <span className={styles.save}>Save {off}%</span>}
              <span className={styles.saveAction}>
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  variant="inline"
                />
              </span>
            </div>
          </div>

          <Section title="Choose a variant">
            <VariantSelector
              variants={product.variants}
              selected={selectedVariant}
              onSelect={selectVariant}
            />
          </Section>

          <Section
            title="Choose an EMI plan"
            subtitle="Pay over time with a loan against your mutual funds. Your units stay invested."
          >
            <EmiPlanSection
              quote={emiQuery.data}
              isPending={emiQuery.isPending}
              isError={emiQuery.isError}
              onRetry={() => emiQuery.refetch()}
              selectedPlanId={selectedPlan?.id}
              onSelectPlan={selectPlan}
              disabled={!selectedVariant.inStock}
            />
            <p className={styles.disclaimer}>
              <ShieldIcon size={15} />
              Checking a plan won’t affect your credit score. Interest is
              indicative and confirmed at loan approval.
            </p>
          </Section>

          <StickyActionBar
            summary={
              selectedPlan ? (
                <span className={styles.ctaSummary}>
                  <strong>
                    {formatINR(selectedPlan.monthlyInstallment)}/mo
                  </strong>
                  <span className={styles.ctaSub}>
                    {selectedPlan.tenureMonths} months ·{' '}
                    {formatINR(selectedVariant.price)} total
                  </span>
                </span>
              ) : (
                <span className={styles.ctaSummary}>
                  <strong>{formatINR(selectedVariant.price)}</strong>
                  <span className={styles.ctaSub}>Select an EMI plan</span>
                </span>
              )
            }
          >
            <Button size="lg" onClick={onContinue} disabled={!canContinue}>
              {selectedVariant.inStock ? 'Continue' : 'Out of stock'}
            </Button>
          </StickyActionBar>

          <div className={styles.details}>
            <Section title="Highlights">
              <HighlightList items={product.highlights} />
            </Section>
            <Section title="About this item">
              <p className={styles.about}>{product.description}</p>
            </Section>
            <Section title="Specifications">
              <SpecList specs={product.specs} />
            </Section>
          </div>
        </div>
      </div>

      <div className={styles.recent}>
        <RecentlyViewedRow excludeId={product.id} />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className={`container ${styles.page}`}>
      <BackLink to={MARKETPLACE_PATH}>Back to Marketplace</BackLink>
      <div className={styles.layout}>
        <div className={styles.media}>
          <Skeleton height={420} radius={16} />
        </div>
        <div className={styles.buy}>
          <Skeleton height={14} width="25%" />
          <Skeleton height={28} width="70%" />
          <Skeleton height={14} width="55%" />
          <Skeleton height={44} width="100%" />
          <Skeleton height={140} />
          <Skeleton height={140} />
        </div>
      </div>
    </div>
  );
}
