export interface PatientInfo {
  patientName: string;
  fernId: string;
  dob: string;
  age: string;
  mobileNumber: string;
  landline: string;
  address: string;
}

export type AssessmentAnswers = Record<string, number | undefined>;

export interface ScaleOption {
  value: number;
  labelEn: string;
  labelTl: string;
}

export interface QuestionItem {
  id: string;
  num: number;
  textEn: string;
  textTl: string;
}

export interface SectionData {
  key: 'A' | 'B' | 'C';
  titleEn: string;
  titleTl: string;
  scaleOptions: ScaleOption[];
  questions: QuestionItem[];
  maxScore: number;
}

export interface ScoreSummary {
  scoreA: number;
  scoreB: number;
  scoreC: number;
  totalScore: number;
}

export interface LevelInfo {
  level: 1 | 2 | 3;
  title: string;
  status: string;
  badgeClass: string;
  requiresHelp: boolean;
  titleEn: string;
  descEn: string;
  descTl: string;
}

export interface ConsentState {
  termsAgreed: boolean;
  privacyAgreed: boolean;
}

export interface AssessmentRecord {
  id: string;
  date: string;
  patient: PatientInfo;
  answers: AssessmentAnswers;
  scores: ScoreSummary;
  level: LevelInfo;
  consent: {
    termsAgreed: boolean;
    privacyAgreed: boolean;
    statute: string;
    timestamp: string;
  };
}
