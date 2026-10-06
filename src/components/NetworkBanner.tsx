import React from 'react';
import { GlobeIcon } from './icons/RadixIcons';

interface NetworkBannerProps {
  isOnline: boolean;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="network-banner" role="status">
      <div className="network-content">
        <GlobeIcon size={14} />
        <span>Offline Mode Active &mdash; Records will be saved locally on this device</span>
      </div>
    </div>
  );
};
