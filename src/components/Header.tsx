import React from "react";
import { PlusIcon, ClockIcon, DownloadIcon } from "./icons/RadixIcons";

interface HeaderProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenInstall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  historyCount,
  onOpenHistory,
  onOpenInstall
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-row">
          <div className="logo-box" aria-hidden="true">
            <PlusIcon size={20} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Joint Health Index</h1>
            <p className="brand-subtitle">The Knee Arthritis and Orthopedic Institute</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={onOpenHistory}
            title="View Saved Assessments"
          >
            <ClockIcon size={14} />
            <span className="btn-text">History</span>
            <span className="badge-count">{historyCount}</span>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onOpenInstall}
            title="Install this app now"
          >
            <DownloadIcon size={14} />
            <span className="btn-text">Install App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
