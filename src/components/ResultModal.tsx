import React, { useEffect, useState } from 'react';
import { AssessmentRecord, LevelInfo } from '../types/assessment';
import { REDIRECT_URL } from '../data/assessmentData';
import { AlertTriangleIcon, Cross2Icon, ExternalLinkIcon, DownloadIcon } from './icons/RadixIcons';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AssessmentRecord | null;
  levelInfo: LevelInfo | null;
  onNewAssessment: () => void;
  onPrint: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  record,
  levelInfo,
  onNewAssessment,
  onPrint
}) => {
  const [countdown, setCountdown] = useState<number>(8);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !levelInfo?.requiresHelp || isPaused) return;

    setCountdown(8);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = REDIRECT_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, levelInfo, isPaused]);

  if (!isOpen || !record || !levelInfo) return null;

  const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-dialog">
        {/* Dialog Header */}
        <div className={`dialog-header status-level-${levelInfo.level}`}>
          <div className="dialog-header-left">
            <div className="dialog-icon-box">
              <AlertTriangleIcon size={16} />
            </div>
            <div>
              <h2 id="modal-title" className="dialog-title">
                {levelInfo.requiresHelp ? 'Clinical Attention Required' : 'Assessment Completed'}
              </h2>
              <p className="dialog-subtitle">
                Scoring Level {levelInfo.level} — {levelInfo.status}
              </p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose} aria-label="Close modal">
            <Cross2Icon size={16} />
          </button>
        </div>

        {/* Dialog Body */}
        <div className="dialog-body">
          {/* Patient Summary */}
          <div className="patient-res-summary">
            <div>
              <span className="res-dim">Patient:</span> <strong>{record.patient.patientName || 'Anonymous'}</strong>
            </div>
            <div>
              <span className="res-dim">FERN ID:</span> <strong>{record.patient.fernId || 'N/A'}</strong>
            </div>
            <div>
              <span className="res-dim">Date:</span> <strong>{formattedDate}</strong>
            </div>
          </div>

          {/* Scores Breakdown Cards */}
          <div className="res-overview-grid">
            <div className="res-cell">
              <span className="res-cell-lbl">Part A (Pain Freq)</span>
              <span className="res-cell-num">{record.scores.scoreA}</span>
            </div>
            <div className="res-cell">
              <span className="res-cell-lbl">Part B (Severity)</span>
              <span className="res-cell-num">{record.scores.scoreB}</span>
            </div>
            <div className="res-cell">
              <span className="res-cell-lbl">Part C (Stiffness)</span>
              <span className="res-cell-num">{record.scores.scoreC}</span>
            </div>
            <div className="res-cell res-cell-total">
              <span className="res-cell-lbl">TOTAL SCORE</span>
              <span className="res-cell-num total-highlight">{record.scores.totalScore}</span>
              <span className={`pill-badge-tag ${levelInfo.badgeClass}`}>Level {levelInfo.level}</span>
            </div>
          </div>

          {/* Clinical Advisory Card */}
          <div className={`advisory-callout advisory-level-${levelInfo.level}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`pill-badge-tag ${levelInfo.badgeClass}`}>
                {levelInfo.title} ({levelInfo.status})
              </span>
            </div>
            <div className="advisory-head">{levelInfo.titleEn}</div>
            <div className="advisory-p-en">{levelInfo.descEn}</div>
            <div className="advisory-p-tl">
              <em>{levelInfo.descTl}</em>
            </div>
            <div className="clinic-box">
              <div>
                <strong>Clinic:</strong> The Knee Arthritis and Orthopedic Institute (ArthroLogic, Inc.)
              </div>
              <div>
                <strong>Official Portal:</strong>{' '}
                <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer">
                  {REDIRECT_URL}
                </a>
              </div>
              <div>
                <strong>Orthopedic Care:</strong> Joint assessment, non-surgical therapy &amp; Total Knee Replacement Philippines
              </div>
            </div>
          </div>

          {/* Auto Redirect Card for Level 2 and Level 3 */}
          {levelInfo.requiresHelp && (
            <div className="redirect-card">
              <div className="redirect-status-line">
                {!isPaused && <div className="spinner-indicator" />}
                <span>
                  {isPaused ? (
                    <>
                      Automatic redirect paused. You can review your report or visit{' '}
                      <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer">
                        arthrologicph.com
                      </a>{' '}
                      at any time.
                    </>
                  ) : (
                    <>
                      Redirecting to <strong>arthrologicph.com</strong> in <strong>{countdown}</strong> seconds...
                    </>
                  )}
                </span>
              </div>

              <div className="redirect-buttons-row">
                <a
                  href={REDIRECT_URL}
                  className="btn btn-primary btn-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit ArthroLogic Website Now</span>
                  <ExternalLinkIcon size={14} />
                </a>

                {!isPaused && (
                  <button
                    type="button"
                    className="btn btn-outline btn-block"
                    onClick={() => setIsPaused(true)}
                  >
                    <span>Stay on this Page &amp; Review Report</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Dialog Action Buttons */}
          <div className="dialog-actions-row">
            <button type="button" className="btn btn-outline" onClick={onPrint}>
              <DownloadIcon size={14} />
              <span>Print Official Medical Report</span>
            </button>
            <button type="button" className="btn btn-outline" onClick={onNewAssessment}>
              <span>New Patient Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
