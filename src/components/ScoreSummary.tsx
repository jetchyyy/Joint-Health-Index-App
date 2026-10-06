import React from 'react';
import { ScoreSummary as ScoreSummaryType, LevelInfo, ConsentState } from '../types/assessment';
import { CheckIcon, ShieldIcon } from './icons/RadixIcons';

interface ScoreSummaryProps {
  scores: ScoreSummaryType;
  levelInfo: LevelInfo;
  consent: ConsentState;
  onConsentChange: (field: keyof ConsentState, value: boolean) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  termsError: boolean;
  privacyError: boolean;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  scores,
  levelInfo,
  consent,
  onConsentChange,
  onOpenTerms,
  onOpenPrivacy,
  onSubmit,
  onReset,
  termsError,
  privacyError
}) => {
  return (
    <div className="shadcn-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Total Score Summary</h2>
          <p className="card-description">Kabuuang Iskor at Antas ng Pagkilos</p>
        </div>
      </div>

      <div className="card-content">
        {/* Score Tally Bar */}
        <div className="score-tally-bar">
          <div className="tally-col">
            <span className="tally-label">Part A</span>
            <span className="tally-val">{scores.scoreA}</span>
          </div>
          <div className="tally-sep">+</div>
          <div className="tally-col">
            <span className="tally-label">Part B</span>
            <span className="tally-val">{scores.scoreB}</span>
          </div>
          <div className="tally-sep">+</div>
          <div className="tally-col">
            <span className="tally-label">Part C</span>
            <span className="tally-val">{scores.scoreC}</span>
          </div>
          <div className="tally-sep">=</div>
          <div className="tally-col highlight-total">
            <span className="tally-label">TOTAL</span>
            <span className="tally-val">{scores.totalScore}</span>
          </div>
        </div>

        {/* Matrix Reference Box */}
        <div className="matrix-key-box">
          <div className="matrix-title-row">
            <strong>Score Key for Lower-Body Strength and Mobility</strong>
            <small>(Ikumpara ang kabuuang puntos sa mga tala upang malaman ang kalakasan ng pagkilos)</small>
          </div>
          <div className="matrix-levels-grid">
            <div
              className="matrix-level-card"
              style={{
                borderColor: levelInfo.level === 3 ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                backgroundColor: levelInfo.level === 3 ? '#EFF6FF' : 'hsl(var(--background))'
              }}
            >
              <span className="matrix-range">35 - 22</span>
              <span className="pill-badge-tag badge-l3">Level 3</span>
              <span className="matrix-note">Urgent Attention</span>
            </div>

            <div
              className="matrix-level-card"
              style={{
                borderColor: levelInfo.level === 2 ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                backgroundColor: levelInfo.level === 2 ? '#EFF6FF' : 'hsl(var(--background))'
              }}
            >
              <span className="matrix-range">21 - 8</span>
              <span className="pill-badge-tag badge-l2">Level 2</span>
              <span className="matrix-note">Needs Consultation</span>
            </div>

            <div
              className="matrix-level-card"
              style={{
                borderColor: levelInfo.level === 1 ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                backgroundColor: levelInfo.level === 1 ? '#EFF6FF' : 'hsl(var(--background))'
              }}
            >
              <span className="matrix-range">7 - 0</span>
              <span className="pill-badge-tag badge-l1">Level 1</span>
              <span className="matrix-note">Optimal Mobility</span>
            </div>
          </div>
        </div>

        {/* Separate Checkboxes Consent Card Box */}
        <div className="consent-card-box">
          {/* Checkbox 1: Terms & Conditions */}
          <div className={`consent-item-block ${termsError ? 'error-highlight' : ''}`} id="block-terms-consent">
            <div className="consent-row">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={consent.termsAgreed}
                onChange={(e) => onConsentChange('termsAgreed', e.target.checked)}
                required
              />
              <label htmlFor="terms-checkbox" className="consent-label">
                <span>
                  I have read, understood, and agree to the{' '}
                  <button type="button" className="legal-btn-link" onClick={onOpenTerms}>
                    Terms &amp; Conditions
                  </button>{' '}
                  and clinical screening guidelines of The Knee Arthritis and Orthopedic Institute.
                </span>
                <span className="consent-subtext">
                  <em>(Nabasa, naunawaan, at sumasang-ayon ako sa mga Takda at Kundisyon ng pagsusuri.)</em>
                </span>
              </label>
            </div>
          </div>

          <div className="consent-divider" />

          {/* Checkbox 2: Data Privacy Policy (RA 10173) */}
          <div className={`consent-item-block ${privacyError ? 'error-highlight' : ''}`} id="block-privacy-consent">
            <div className="consent-row">
              <input
                type="checkbox"
                id="privacy-checkbox"
                checked={consent.privacyAgreed}
                onChange={(e) => onConsentChange('privacyAgreed', e.target.checked)}
                required
              />
              <label htmlFor="privacy-checkbox" className="consent-label">
                <span>
                  I explicitly consent to the collection, recording, and clinical processing of my sensitive personal and health assessment information pursuant to the{' '}
                  <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> and the{' '}
                  <button type="button" className="legal-btn-link" onClick={onOpenPrivacy}>
                    Data Privacy Policy
                  </button>{' '}
                  of ArthroLogic Inc.
                </span>
                <span className="consent-subtext">
                  <em>(Nagbibigay ako ng pahintulot sa pagproseso ng aking medikal na datos alinsunod sa Data Privacy Act of 2012.)</em>
                </span>
              </label>
            </div>
          </div>

          {/* Compliance Footer Tag */}
          <div className="compliance-footer-tag">
            <ShieldIcon size={14} />
            <span>Republic Act No. 10173 &bull; National Privacy Commission (NPC) Compliant</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-submit-actions">
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onSubmit}>
            <CheckIcon size={16} />
            <span>Calculate &amp; Complete Assessment</span>
          </button>

          <button type="button" className="btn btn-outline btn-block" onClick={onReset}>
            <span>Reset Assessment Form</span>
          </button>
        </div>
      </div>
    </div>
  );
};
