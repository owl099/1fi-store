import { StarIcon } from '@/components/icons';
import { ComingSoonPanel } from './ComingSoonPanel';

export function TopBrandsPanel() {
  return (
    <ComingSoonPanel
      icon={<StarIcon size={28} />}
      title="Top Brands"
      description="Curated storefronts from partner brands will live here. Not part of this assignment."
    />
  );
}
