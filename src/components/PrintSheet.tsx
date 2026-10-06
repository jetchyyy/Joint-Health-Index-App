import React from 'react';
import { AssessmentRecord, LevelInfo } from '../types/assessment';

interface PrintSheetProps {
  record: AssessmentRecord | null;
  levelInfo: LevelInfo | null;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({ record, levelInfo }) => {
  if (!record || !levelInfo) return null;

  const formattedDate = new Date(record.date).toLocaleString('en-US');
  const phoneText = [record.patient.mobileNumber, record.patient.landline].filter(Boolean).join(' / ') || 'N/A';

  return (
    <div id="print-sheet" className="print-only">
      <div className="print-header">
        <h2>Joint Health Index</h2>
        <h3>The Knee Arthritis and Orthopedic Institute</h3>
        <p>Official Clinical Mobility &amp; Pain Scoring Assessment Record</p>
      </div>

      <div className="print-patient-grid">
        <div>
          <strong>Patient's Name:</strong> {record.patient.patientName}
        </div>
        <div>
          <strong>FERN ID No.:</strong> {record.patient.fernId || 'N/A'}
        </div>
        <div>
          <strong>Address:</strong> {record.patient.address || 'N/A'}
        </div>
        <div>
          <strong>Date of Birth:</strong> {record.patient.dob || 'N/A'}
        </div>
        <div>
          <strong>Age:</strong> {record.patient.age || 'N/A'}
        </div>
        <div>
          <strong>Mobile / Landline:</strong> {phoneText}
        </div>
        <div>
          <strong>Assessment Date:</strong> {formattedDate}
        </div>
      </div>

      <table className="print-scores-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Description</th>
            <th>Score</th>
            <th>Max Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Part A</td>
            <td>Frequency of Pain (Dalas ng Pananakit)</td>
            <td>{record.scores.scoreA}</td>
            <td>16</td>
          </tr>
          <tr>
            <td>Part B</td>
            <td>Severity of Pain (Tindi ng Pananakit)</td>
            <td>{record.scores.scoreB}</td>
            <td>16</td>
          </tr>
          <tr>
            <td>Part C</td>
            <td>Duration of Stiffness (Tagal ng Paninigas)</td>
            <td>{record.scores.scoreC}</td>
            <td>4</td>
          </tr>
          <tr className="print-total-row">
            <td colSpan={2}>
              <strong>TOTAL SCORE (Kabuuan)</strong>
            </td>
            <td>
              <strong>{record.scores.totalScore}</strong>
            </td>
            <td>
              <strong>36</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="print-level-box">
        <div>
          <strong>Result Classification:</strong> {levelInfo.title} ({levelInfo.status}) - Score {record.scores.totalScore}/36
        </div>
        <div className="print-advisory">
          {levelInfo.titleEn} &mdash; {levelInfo.descEn}
        </div>
      </div>

      <div className="print-privacy-ack">
        <small>
          <strong>Consent &amp; Privacy Compliance (RA 10173):</strong> Patient agreed to Terms &amp; Conditions and explicitly consented to health data processing pursuant to the Philippine Data Privacy Act of 2012.
        </small>
      </div>

      <div className="print-footer-info">
        <p>ArthroLogic Inc. &bull; Knee Arthritis &amp; Orthopedic Institute &bull; Website: https://arthrologicph.com/</p>
      </div>
    </div>
  );
};
