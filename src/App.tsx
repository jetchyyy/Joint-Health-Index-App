import React, { useState, useEffect, useMemo } from "react";
import { PatientInfo, AssessmentAnswers, ConsentState, AssessmentRecord } from "./types/assessment";
import { ASSESSMENT_SECTIONS, calculateAssessmentScores, getLevelClassification } from "./data/assessmentData";
import { Header } from "./components/Header";
import { NetworkBanner } from "./components/NetworkBanner";
import { PatientDemographics } from "./components/PatientDemographics";
import { QuestionSection } from "./components/QuestionSection";
import { ScoreSummary } from "./components/ScoreSummary";
import { StickyMobileDock } from "./components/StickyMobileDock";
import { ResultModal } from "./components/ResultModal";
import { LegalModal } from "./components/LegalModal";
import { HistoryModal } from "./components/HistoryModal";
import { InstallModal } from "./components/InstallModal";
import { PrintSheet } from "./components/PrintSheet";
import { InfoCircledIcon } from "./components/icons/RadixIcons";

const STORAGE_KEY = "joint_health_records_v1";
const DRAFT_KEY = "joint_health_current_draft";
const INSTALL_DISMISSED_KEY = "joint_health_install_dismissed";

const initialPatient: PatientInfo = {
  patientName: "",
  fernId: "",
  dob: "",
  age: "",
  mobileNumber: "",
  landline: "",
  address: ""
};

const initialConsent: ConsentState = {
  termsAgreed: false,
  privacyAgreed: false
};

export const App: React.FC = () => {
  const [patient, setPatient] = useState<PatientInfo>(initialPatient);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [consent, setConsent] = useState<ConsentState>(initialConsent);

  const [termsError, setTermsError] = useState<boolean>(false);
  const [privacyError, setPrivacyError] = useState<boolean>(false);

  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [currentSubmittedRecord, setCurrentSubmittedRecord] = useState<AssessmentRecord | null>(null);

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<"terms" | "privacy">("terms");
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Initialize Service Worker, Network, PWA, and Stored Records
  useEffect(() => {
    // 1. Service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("[PWA] Service Worker error:", err);
        });
      });
    }

    // 2. Network listener
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // If user hasn't dismissed the install modal before, offer it
      const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      if (!dismissed && !isStandalone) {
        setIsInstallOpen(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Also check on non-Chrome browsers (iOS Safari, etc.) if not standalone & not dismissed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (!isStandalone && !dismissed) {
      const timer = setTimeout(() => {
        setIsInstallOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // 4. Load saved history
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setRecords(saved);
    } catch (e) {}

    // 5. Load draft
    try {
      const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (savedDraft) {
        if (savedDraft.patient) setPatient(savedDraft.patient);
        if (savedDraft.answers) setAnswers(savedDraft.answers);
        if (savedDraft.consent) setConsent(savedDraft.consent);
      }
    } catch (e) {}

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Auto-save draft on changes
  useEffect(() => {
    try {
      const draft = { patient, answers, consent };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {}
  }, [patient, answers, consent]);

  // Compute live scores and level classification
  const scores = useMemo(() => calculateAssessmentScores(answers), [answers]);
  const levelInfo = useMemo(() => getLevelClassification(scores.totalScore), [scores.totalScore]);

  // Handle Demographics change
  const handlePatientChange = (field: keyof PatientInfo, value: string) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Answer selection
  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Handle Consent change
  const handleConsentChange = (field: keyof ConsentState, value: boolean) => {
    setConsent((prev) => ({ ...prev, [field]: value }));
    if (field === "termsAgreed" && value) setTermsError(false);
    if (field === "privacyAgreed" && value) setPrivacyError(false);
  };

  // Close Install Modal and remember dismissal
  const handleCloseInstallModal = () => {
    setIsInstallOpen(false);
    localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
  };

  // Open Install Modal from Header
  const handleOpenInstallModal = () => {
    setIsInstallOpen(true);
  };

  // PWA Install Trigger
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("[PWA] User response to install:", outcome);
      setDeferredPrompt(null);
      setIsInstallOpen(false);
      localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
    }
  };

  // Open Legal Modal with specific tab
  const handleOpenTerms = () => {
    setLegalTab("terms");
    setIsLegalOpen(true);
  };

  const handleOpenPrivacy = () => {
    setLegalTab("privacy");
    setIsLegalOpen(true);
  };

  const handleAgreeBoth = () => {
    setConsent({ termsAgreed: true, privacyAgreed: true });
    setTermsError(false);
    setPrivacyError(false);
    setIsLegalOpen(false);
  };

  // Form Submission
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 1. Validate Terms
    if (!consent.termsAgreed) {
      setTermsError(true);
      const termsEl = document.getElementById("block-terms-consent");
      if (termsEl) termsEl.scrollIntoView({ behavior: "smooth", block: "center" });
      alert("Please accept the Terms & Conditions before submitting.");
      return;
    }

    // 2. Validate Privacy Policy (RA 10173)
    if (!consent.privacyAgreed) {
      setPrivacyError(true);
      const privEl = document.getElementById("block-privacy-consent");
      if (privEl) privEl.scrollIntoView({ behavior: "smooth", block: "center" });
      alert("Please accept the Philippine Data Privacy Act (RA 10173) consent before submitting.");
      return;
    }

    // 3. Validate Questions
    const allQuestionIds = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "c1"];
    const unanswered = allQuestionIds.filter((qid) => answers[qid] === undefined);

    if (unanswered.length > 0) {
      alert(`Please answer all questions before submitting. (${unanswered.length} question(s) remaining)`);
      const firstUnansweredEl = document.getElementById(`q-item-${unanswered[0]}`);
      if (firstUnansweredEl) {
        firstUnansweredEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const newRecord: AssessmentRecord = {
      id: `rec_${Date.now()}`,
      date: new Date().toISOString(),
      patient: {
        ...patient,
        patientName: patient.patientName.trim() || "Anonymous Patient"
      },
      answers,
      scores,
      level: levelInfo,
      consent: {
        termsAgreed: true,
        privacyAgreed: true,
        statute: "Republic Act No. 10173 (Philippine Data Privacy Act of 2012)",
        timestamp: new Date().toISOString()
      }
    };

    // Save record to storage (Offline-First)
    try {
      const updated = [newRecord, ...records];
      setRecords(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.error("Failed to save assessment to localStorage:", err);
    }

    setCurrentSubmittedRecord(newRecord);
    setIsResultOpen(true);
  };

  // Reset Assessment Form
  const handleResetForm = () => {
    if (confirm("Are you sure you want to reset all answers and patient details?")) {
      setPatient(initialPatient);
      setAnswers({});
      setConsent(initialConsent);
      setTermsError(false);
      setPrivacyError(false);
      localStorage.removeItem(DRAFT_KEY);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Start New Assessment from Result Modal
  const handleNewAssessmentFromModal = () => {
    setIsResultOpen(false);
    setPatient(initialPatient);
    setAnswers({});
    setConsent(initialConsent);
    setTermsError(false);
    setPrivacyError(false);
    localStorage.removeItem(DRAFT_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Export CSV
  const handleExportCsv = () => {
    if (records.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Patient Name",
      "FERN ID",
      "DOB",
      "Age",
      "Mobile",
      "Landline",
      "Address",
      "Terms Agreed",
      "Data Privacy Consent (RA 10173)",
      "Part A (Frequency)",
      "Part B (Severity)",
      "Part C (Stiffness)",
      "Total Score",
      "Level"
    ];

    const rows = records.map((r) => [
      r.id,
      r.date,
      `"${(r.patient.patientName || "").replace(/"/g, "\"\"")}"`,
      `"${(r.patient.fernId || "").replace(/"/g, "\"\"")}"`,
      r.patient.dob || "",
      r.patient.age || "",
      `"${(r.patient.mobileNumber || "").replace(/"/g, "\"\"")}"`,
      `"${(r.patient.landline || "").replace(/"/g, "\"\"")}"`,
      `"${(r.patient.address || "").replace(/"/g, "\"\"")}"`,
      '"Agreed"',
      `"Consent Recorded (${r.consent.timestamp})"`,
      r.scores.scoreA,
      r.scores.scoreB,
      r.scores.scoreC,
      r.scores.totalScore,
      `"${r.level.title} (${r.level.status})"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `joint_health_assessments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear History
  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all offline assessment records from this device?")) {
      localStorage.removeItem(STORAGE_KEY);
      setRecords([]);
    }
  };

  // Print Report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="app">
      {/* Offline Status Banner */}
      <NetworkBanner isOnline={isOnline} />

      {/* Top Header */}
      <Header
        historyCount={records.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenInstall={handleOpenInstallModal}
      />

      {/* Main Form Container */}
      <main className="main-container">
        {/* Shadcn Alert Callout */}
        <section className="alert-card">
          <InfoCircledIcon className="alert-icon" size={16} />
          <div className="alert-title">Assessment Instructions</div>
          <div className="alert-description">
            For each section, use the number scale to answer the questions, then add the numbers to find your total for that section.
            <em>(Para sa bahaging ito, pumili ng numero upang sagutin ang mga tanong. Pagsamahin ang mga numero upang malaman ang kabuuan sa bawat seksyon.)</em>
          </div>
        </section>

        {/* Assessment Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {/* 1. Patient Demographics */}
          <PatientDemographics patient={patient} onChange={handlePatientChange} />

          {/* 2. Part A: Frequency of Pain */}
          <QuestionSection
            section={ASSESSMENT_SECTIONS[0]}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            sectionScore={scores.scoreA}
          />

          {/* 3. Part B: Severity of Pain */}
          <QuestionSection
            section={ASSESSMENT_SECTIONS[1]}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            sectionScore={scores.scoreB}
          />

          {/* 4. Part C: Duration of Stiffness */}
          <QuestionSection
            section={ASSESSMENT_SECTIONS[2]}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            sectionScore={scores.scoreC}
          />

          {/* 5. Score Calculation, Matrix, and Separate Checkboxes */}
          <ScoreSummary
            scores={scores}
            levelInfo={levelInfo}
            consent={consent}
            onConsentChange={handleConsentChange}
            onOpenTerms={handleOpenTerms}
            onOpenPrivacy={handleOpenPrivacy}
            onSubmit={handleSubmit}
            onReset={handleResetForm}
            termsError={termsError}
            privacyError={privacyError}
          />
        </form>
      </main>

      {/* Sticky Mobile Dock */}
      <StickyMobileDock
        totalScore={scores.totalScore}
        levelInfo={levelInfo}
        onSubmit={() => handleSubmit()}
      />

      {/* Result Dialog with Auto-Redirect */}
      <ResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        record={currentSubmittedRecord}
        levelInfo={currentSubmittedRecord ? currentSubmittedRecord.level : levelInfo}
        onNewAssessment={handleNewAssessmentFromModal}
        onPrint={handlePrint}
      />

      {/* Terms & Philippine Data Privacy (RA 10173) Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        defaultTab={legalTab}
        onAgreeBoth={handleAgreeBoth}
      />

      {/* History Drawer Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={records}
        onClearHistory={handleClearHistory}
        onExportCsv={handleExportCsv}
      />

      {/* Install App Modal */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={handleCloseInstallModal}
        onInstall={handleInstallClick}
        isInstallable={Boolean(deferredPrompt)}
      />

      {/* Printable Sheet (Paper matching layout) */}
      <PrintSheet
        record={currentSubmittedRecord}
        levelInfo={currentSubmittedRecord ? currentSubmittedRecord.level : levelInfo}
      />
    </div>
  );
};
