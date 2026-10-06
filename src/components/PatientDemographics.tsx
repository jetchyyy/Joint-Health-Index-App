import React from 'react';
import { PatientInfo } from '../types/assessment';

interface PatientDemographicsProps {
  patient: PatientInfo;
  onChange: (field: keyof PatientInfo, value: string) => void;
}

export const PatientDemographics: React.FC<PatientDemographicsProps> = ({
  patient,
  onChange
}) => {
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobVal = e.target.value;
    onChange('dob', dobVal);

    if (dobVal) {
      const birthDate = new Date(dobVal);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 0 && calculatedAge <= 130) {
        onChange('age', calculatedAge.toString());
      }
    }
  };

  return (
    <div className="shadcn-card">
      <div className="card-header">
        <div className="card-header-left">
          <span className="section-indicator">1</span>
          <div>
            <h2 className="card-title">Patient Demographics</h2>
            <p className="card-description">Impormasyon ng Pasyente</p>
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="form-grid">
          <div className="form-item full-width">
            <label className="form-label" htmlFor="patient-name">
              Patient's Name <span className="label-tl">(Pangalan ng Pasyente)</span>{' '}
              <span className="required-mark">*</span>
            </label>
            <input
              className="shadcn-input"
              type="text"
              id="patient-name"
              placeholder="e.g. Juan Dela Cruz"
              value={patient.patientName}
              onChange={(e) => onChange('patientName', e.target.value)}
              required
            />
          </div>

          <div className="form-item">
            <label className="form-label" htmlFor="fern-id">
              FERN ID No.
            </label>
            <input
              className="shadcn-input"
              type="text"
              id="fern-id"
              placeholder="e.g. FERN-2026-001"
              value={patient.fernId}
              onChange={(e) => onChange('fernId', e.target.value)}
            />
          </div>

          <div className="form-item">
            <label className="form-label" htmlFor="dob">
              Date of Birth <span className="label-tl">(Petsa ng Kapanganakan)</span>
            </label>
            <input
              className="shadcn-input"
              type="date"
              id="dob"
              value={patient.dob}
              onChange={handleDobChange}
            />
          </div>

          <div className="form-item">
            <label className="form-label" htmlFor="patient-age">
              Age <span className="label-tl">(Edad)</span>
            </label>
            <input
              className="shadcn-input"
              type="number"
              id="patient-age"
              min={1}
              max={130}
              placeholder="e.g. 58"
              value={patient.age}
              onChange={(e) => onChange('age', e.target.value)}
            />
          </div>

          <div className="form-item">
            <label className="form-label" htmlFor="mobile-number">
              Mobile Number
            </label>
            <input
              className="shadcn-input"
              type="tel"
              id="mobile-number"
              placeholder="e.g. 0917 123 4567"
              value={patient.mobileNumber}
              onChange={(e) => onChange('mobileNumber', e.target.value)}
            />
          </div>

          <div className="form-item">
            <label className="form-label" htmlFor="landline">
              Landline
            </label>
            <input
              className="shadcn-input"
              type="tel"
              id="landline"
              placeholder="e.g. (02) 8123 4567"
              value={patient.landline}
              onChange={(e) => onChange('landline', e.target.value)}
            />
          </div>

          <div className="form-item full-width">
            <label className="form-label" htmlFor="address">
              Address <span className="label-tl">(Tirahan)</span>
            </label>
            <input
              className="shadcn-input"
              type="text"
              id="address"
              placeholder="e.g. City / Province / Barangay"
              value={patient.address}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
