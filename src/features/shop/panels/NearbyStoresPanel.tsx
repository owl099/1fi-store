import { MapPinIcon } from '@/components/icons';
import { ComingSoonPanel } from './ComingSoonPanel';

export function NearbyStoresPanel() {
  return (
    <ComingSoonPanel
      icon={<MapPinIcon size={28} />}
      title="Nearby Stores"
      description="Discover partner stores around you and pay in-store with 1Fi. Not part of this assignment."
    />
  );
}
