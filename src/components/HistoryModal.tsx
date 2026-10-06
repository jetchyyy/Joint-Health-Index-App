import React from 'react';
import { AssessmentRecord } from '../types/assessment';
import { ClockIcon, Cross2Icon, DownloadIcon } from './icons/RadixIcons';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: AssessmentRecord[];
  onClearHistory: () => void;
  onExportCsv: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearHistory,
  onExportCsv
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="history-title">
      <div className="modal-dialog modal-dialog-lg">
        <div className="dialog-header">
          <div className="dialog-header-left">
            <div className="dialog-icon-box">
              <ClockIcon size={16} />
            </div>
            <div>
              <h2 id="history-title" className="dialog-title">
                Assessment History
              </h2>
              <p className="dialog-subtitle">Saved Records Stored on This Device</p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose} aria-label="Close history">
            <Cross2Icon size={16} />
          </button>
        </div>

        <div className="dialog-body">
          <div className="history-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button type="button" className="btn btn-sm btn-outline" onClick={onExportCsv} disabled={records.length === 0}>
              <DownloadIcon size={14} />
              <span>Export CSV</span>
            </button>
            <button type="button" className="btn btn-sm btn-outline text-danger" onClick={onClearHistory} disabled={records.length === 0}>
              <span>Clear Records</span>
            </button>
          </div>

          <div className="history-sheet-list">
            {records.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '28px 16px', color: 'hsl(var(--muted-foreground))', fontSize: '0.8125rem' }}>
                <p>No assessment records saved yet.</p>
                <p>
                  <small>Completed offline assessments will automatically appear here.</small>
                </p>
              </div>
            ) : (
              records.map((rec) => {
                const dateStr = new Date(rec.date).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={rec.id} className="history-card">
                    <div className="history-card-left">
                      <div className="history-name">{rec.patient.patientName || 'Anonymous'}</div>
                      <div className="history-meta-text">
                        FERN ID: {rec.patient.fernId || 'N/A'} &bull; {dateStr}
                      </div>
                      <div className="history-score-detail">
                        Score: Part A: {rec.scores.scoreA} | Part B: {rec.scores.scoreB} | Part C: {rec.scores.scoreC} &bull; Total:{' '}
                        <strong>{rec.scores.totalScore} / 36</strong>
                      </div>
                    </div>
                    <div>
                      <span className={`pill-badge-tag ${rec.level.badgeClass}`}>
                        {rec.level.title || `Level ${rec.level.level}`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
