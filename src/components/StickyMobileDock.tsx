import React from 'react';
import { LevelInfo } from '../types/assessment';

interface StickyMobileDockProps {
  totalScore: number;
  levelInfo: LevelInfo;
  onSubmit: () => void;
}

export const StickyMobileDock: React.FC<StickyMobileDockProps> = ({
  totalScore,
  levelInfo,
  onSubmit
}) => {
  return (
    <div className="sticky-mobile-dock">
      <div className="dock-container">
        <div className="dock-score-info">
          <span className="dock-label">Score:</span>
          <span className="dock-score-val">
            <strong>{totalScore}</strong> / 36
          </span>
          <span className={`pill-badge-tag ${levelInfo.badgeClass}`}>{levelInfo.title}</span>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={onSubmit}>
          <span>Complete</span>
        </button>
      </div>
    </div>
  );
};
