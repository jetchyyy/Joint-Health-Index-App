import React, { useState } from 'react';
import { ShieldIcon, Cross2Icon } from './icons/RadixIcons';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
  onAgreeBoth: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
  onAgreeBoth
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
      <div className="modal-dialog modal-dialog-lg">
        <div className="dialog-header">
          <div className="dialog-header-left">
            <div className="dialog-icon-box">
              <ShieldIcon size={16} />
            </div>
            <div>
              <h2 id="legal-modal-title" className="dialog-title">
                Terms &amp; Data Privacy Policy
              </h2>
              <p className="dialog-subtitle">Republic Act No. 10173 (Philippine Data Privacy Act)</p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose} aria-label="Close legal dialog">
            <Cross2Icon size={16} />
          </button>
        </div>

        <div className="dialog-body">
          <div className="tabs-container">
            <div className="tabs-list">
              <button
                type="button"
                className={`tab-trigger ${activeTab === 'terms' ? 'active' : ''}`}
                onClick={() => setActiveTab('terms')}
              >
                Terms &amp; Conditions
              </button>
              <button
                type="button"
                className={`tab-trigger ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                Data Privacy Policy (RA 10173)
              </button>
            </div>

            {/* Tab 1: Terms */}
            {activeTab === 'terms' && (
              <div className="tab-content">
                <h3>Terms of Use &amp; Clinical Disclaimer</h3>
                <h4>1. Assessment Nature &amp; Medical Disclaimer</h4>
                <p>
                  The <strong>Joint Health Index</strong> is a screening and educational assessment tool designed to assist patients in quantifying lower-body joint discomfort and mobility. <strong>This screening does not constitute a definitive medical diagnosis, prescription, or therapeutic treatment plan.</strong>
                </p>
                <p>
                  Always consult a licensed orthopedic surgeon, rheumatologist, or physician for formal diagnosis and personalized clinical management.
                </p>

                <h4>2. Level 2 &amp; Level 3 Triage Protocol</h4>
                <p>
                  Patients with scores categorized under <strong>Level 2</strong> (Needs Consultation) or <strong>Level 3</strong> (Urgent Attention) are strongly advised to seek professional orthopedic evaluation promptly through our clinical network at{' '}
                  <a href="https://arthrologicph.com/" target="_blank" rel="noopener noreferrer">
                    https://arthrologicph.com/
                  </a>.
                </p>

                <h4>3. Accuracy of Information &amp; Patient Declaration</h4>
                <p>
                  By checking the agreement box and submitting this assessment, you declare that all information provided is accurate to the best of your knowledge and that you voluntarily undertake this evaluation.
                </p>

                <h4>4. Governing Law &amp; Jurisdiction</h4>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the <strong>Republic of the Philippines</strong>.
                </p>
              </div>
            )}

            {/* Tab 2: Privacy */}
            {activeTab === 'privacy' && (
              <div className="tab-content">
                <h3>Philippine Data Privacy Act of 2012 (RA 10173) Compliance</h3>
                <p>
                  <strong>The Knee Arthritis and Orthopedic Institute</strong> and <strong>ArthroLogic, Inc.</strong> respect your fundamental right to privacy under the <em>Data Privacy Act of 2012 (Republic Act No. 10173)</em>, its Implementing Rules and Regulations (IRR), and issuances from the <strong>National Privacy Commission (NPC)</strong>.
                </p>

                <h4>1. Collection of Sensitive Personal Health Information</h4>
                <p>When you complete the Joint Health Index assessment, we collect the following personal and sensitive health data:</p>
                <ul>
                  <li><strong>Patient Demographics:</strong> Full Name, FERN ID, Date of Birth, Age, Mobile Number, Landline, and Residential Address.</li>
                  <li><strong>Health &amp; Mobility Data:</strong> Frequency of joint pain, severity of knee/hip pain, duration of morning stiffness, and calculated mobility score levels.</li>
                </ul>

                <h4>2. Purpose of Data Processing</h4>
                <p>Your health data is gathered and processed strictly for legitimate clinical purposes, including:</p>
                <ul>
                  <li>Evaluating lower-body joint mobility and pain severity index.</li>
                  <li>Providing immediate clinical triage recommendations (e.g. referral to orthopedic specialists at <a href="https://arthrologicph.com/" target="_blank" rel="noopener noreferrer">arthrologicph.com</a>).</li>
                  <li>Maintaining patient diagnostic records and offline clinic documentation.</li>
                </ul>

                <h4>3. Storage, Security &amp; Offline Privacy</h4>
                <p>
                  This application is engineered with an <strong>Offline-First architecture</strong>. Your data is stored locally on your device storage unless securely submitted for medical consultation. We implement industry-standard administrative, physical, and technical safeguards.
                </p>

                <h4>4. Your Rights as a Data Subject</h4>
                <p>
                  Under Section 16 of RA 10173, you are entitled to statutory rights including the Right to be Informed, Right to Access, Right to Rectification &amp; Erasure, and Right to Damages.
                </p>

                <h4>5. Data Protection Contact</h4>
                <p>
                  For inquiries regarding your data privacy rights, you may contact ArthroLogic Inc. via our official portal at{' '}
                  <a href="https://arthrologicph.com/" target="_blank" rel="noopener noreferrer">
                    https://arthrologicph.com/
                  </a>.
                </p>
              </div>
            )}
          </div>

          <div className="dialog-actions-row">
            <button type="button" className="btn btn-primary btn-block" onClick={onAgreeBoth}>
              <span>Agree to Both &amp; Continue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
