import React, { useState } from "react";
import {
  DownloadIcon,
  Cross2Icon,
  CheckIcon,
  Share1Icon,
  DotsVerticalIcon,
  MobileIcon,
  ShieldIcon
} from "./icons/RadixIcons";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => void;
  isInstallable: boolean;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable
}) => {
  const [activeTab, setActiveTab] = useState<"auto" | "ios" | "android">("auto");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="install-modal-title">
      <div className="modal-dialog install-dialog">
        {/* Header */}
        <div className="dialog-header install-dialog-header">
          <div className="dialog-header-left">
            <div className="dialog-icon-box install-icon-box">
              <DownloadIcon size={18} />
            </div>
            <div>
              <h2 id="install-modal-title" className="dialog-title">
                Install This App Now
              </h2>
              <p className="dialog-subtitle">
                I-install bilang mobile app para sa mabilis at offline na paggamit
              </p>
            </div>
          </div>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onClose}
            aria-label="Close install modal"
          >
            <Cross2Icon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="dialog-body">
          {/* Key Advantages */}
          <div className="install-benefits-list">
            <div className="install-benefit-item">
              <div className="benefit-icon-badge">
                <CheckIcon size={14} />
              </div>
              <div className="benefit-text">
                <strong>100% Offline Access</strong>
                <p>Complete joint assessments anywhere, even without WiFi or mobile data in the clinic or field.</p>
              </div>
            </div>

            <div className="install-benefit-item">
              <div className="benefit-icon-badge">
                <MobileIcon size={14} />
              </div>
              <div className="benefit-text">
                <strong>Home Screen Instant Launch</strong>
                <p>Opens in full screen directly from your phone or desktop like a native medical app.</p>
              </div>
            </div>

            <div className="install-benefit-item">
              <div className="benefit-icon-badge">
                <ShieldIcon size={14} />
              </div>
              <div className="benefit-text">
                <strong>Fast & Secure Local Storage</strong>
                <p>Instant scoring calculations with local storage compliant with RA 10173 data privacy rules.</p>
              </div>
            </div>
          </div>

          {/* Direct Install CTA (if browser supports one-click prompt) */}
          {isInstallable && (
            <div className="install-direct-cta">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={onInstall}
              >
                <DownloadIcon size={18} />
                <span>Install App Now (I-install Ngayon)</span>
              </button>
            </div>
          )}

          {/* Platform Step-by-Step Instructions */}
          <div className="install-instructions-card">
            <div className="install-tabs-nav">
              <button
                type="button"
                className={`tab-item ${activeTab === "auto" || activeTab === "android" ? "active" : ""}`}
                onClick={() => setActiveTab("android")}
              >
                Android / Chrome
              </button>
              <button
                type="button"
                className={`tab-item ${activeTab === "ios" ? "active" : ""}`}
                onClick={() => setActiveTab("ios")}
              >
                iPhone / iPad (Safari)
              </button>
            </div>

            <div className="install-tab-content">
              {(activeTab === "auto" || activeTab === "android") && (
                <ol className="install-steps-ol">
                  <li>
                    <span>1. Tap the <strong>Install App Now</strong> button above or the browser menu (</span>
                    <DotsVerticalIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                    <span> three dots) at the top right.</span>
                  </li>
                  <li>
                    <span>2. Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</span>
                  </li>
                  <li>
                    <span>3. Confirm <strong>&quot;Install&quot;</strong> when prompted to add to your app drawer.</span>
                  </li>
                </ol>
              )}

              {activeTab === "ios" && (
                <ol className="install-steps-ol">
                  <li>
                    <span>1. In Safari, tap the <strong>Share</strong> button (</span>
                    <Share1Icon size={13} style={{ display: "inline", verticalAlign: "middle" }} />
                    <span> square with arrow up) in the bottom toolbar.</span>
                  </li>
                  <li>
                    <span>2. Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong>.</span>
                  </li>
                  <li>
                    <span>3. Tap <strong>&quot;Add&quot;</strong> in the top-right corner to complete.</span>
                  </li>
                </ol>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="install-modal-footer">
            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={onClose}
            >
              <span>Maybe Later (Isara / Magpatuloy sa Browser)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
