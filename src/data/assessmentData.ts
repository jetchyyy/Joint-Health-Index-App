import { SectionData } from '../types/assessment';

export const ASSESSMENT_SECTIONS: SectionData[] = [
  {
    key: 'A',
    titleEn: 'Part A: Frequency of Pain',
    titleTl: 'Dalas ng Pananakit',
    maxScore: 16,
    scaleOptions: [
      { value: 4, labelEn: 'Always', labelTl: 'Palagi' },
      { value: 3, labelEn: 'Almost always', labelTl: 'Halos palagi' },
      { value: 2, labelEn: 'Sometimes', labelTl: 'Minsan' },
      { value: 1, labelEn: 'Almost never', labelTl: 'Bihira' },
      { value: 0, labelEn: 'Never', labelTl: 'Hindi nararamdaman' }
    ],
    questions: [
      {
        id: 'a1',
        num: 1,
        textEn: 'When you are lying in bed at night, do you experience any joint pain in you hips or knees?',
        textTl: "(Nakaranas ka ba ng pananakit sa tuhod o balakang tuwing ika'y nakahiga sa gabi?)"
      },
      {
        id: 'a2',
        num: 2,
        textEn: 'Do you experience any joint pain in your hips or knees when walking up or down a flight of stairs?',
        textTl: '(Nakakaramdam ka ba ng pananakit sa tuhod o balakang tuwing umakyat o bumababa ng hagdan?)'
      },
      {
        id: 'a3',
        num: 3,
        textEn: 'When getting up from a sitting position without the help of your arms, do you experience any joint pain in your hips and knees?',
        textTl: '(Nakakaramdam ka ba ng pananakit sa tuhod at balakang tuwing tumatayo mula sa pagkakaumpo na walang tulong mula sa kamay / na di ginagamit ang kamay?)'
      },
      {
        id: 'a4',
        num: 4,
        textEn: 'Do you experience any joint pain in your hips or knees when you walk 300 feet?',
        textTl: '(Nakakaramdam ka ba ng pananakit sa tuhod o balakang tuwing naglalakad sa layong 300 talampakan?)'
      }
    ]
  },
  {
    key: 'B',
    titleEn: 'Part B: Severity of Pain',
    titleTl: 'Tindi ng Pananakit',
    maxScore: 16,
    scaleOptions: [
      { value: 4, labelEn: 'Agonizing pain', labelTl: 'Matinding pananakit' },
      { value: 3, labelEn: 'Severe pain', labelTl: 'Masakit na masakit' },
      { value: 2, labelEn: 'Moderate pain', labelTl: 'Masakit' },
      { value: 1, labelEn: 'Slight pain', labelTl: 'May bahagyang pananakit' },
      { value: 0, labelEn: 'No pain', labelTl: 'Walang pananakit' }
    ],
    questions: [
      {
        id: 'b1',
        num: 1,
        textEn: 'When you are lying in bed at night, do you experience any joint pain in your hips or knees?',
        textTl: "(Nakakaramdam ka ba ng pananakit sa tuhod o balakang tuwing ika'y nakahiga sa gabi?)"
      },
      {
        id: 'b2',
        num: 2,
        textEn: 'Do you experience any joint pain in your hips or knees when walking up or down a flight of stairs?',
        textTl: '(Nakakaramdam ka ba ng pananakit sa tuhod o balakang tuwing umaakyat o bumababa ng hagdan?)'
      },
      {
        id: 'b3',
        num: 3,
        textEn: 'When getting up from a sitting position without the help of your arms, do you experience any joint pain in your hips and knees?',
        textTl: '(Nakakaramdam ka ba ng pananakit ng tuhod at balakang tuwing tumatayo mula sa pagkakaupo?)'
      },
      {
        id: 'b4',
        num: 4,
        textEn: 'Do you experience any joint pain in your hips or knees when you walk 300 feet?',
        textTl: '(Nakakaramdam ka ba ng sakit sa tuhod at balakang tuwing naglalakad sa layong 300 talampakan?)'
      }
    ]
  },
  {
    key: 'C',
    titleEn: 'Part C: Duration of Stiffness',
    titleTl: 'Tagal ng Paninigas',
    maxScore: 4,
    scaleOptions: [
      { value: 4, labelEn: '30+ min', labelTl: '30 minuto pataas' },
      { value: 3, labelEn: '16 - 30 min', labelTl: '16 hanggang 30 min' },
      { value: 2, labelEn: '6 - 15 min', labelTl: '6 hanggang 15 min' },
      { value: 1, labelEn: '1 - 5 min', labelTl: '1 hanggang 5 min' },
      { value: 0, labelEn: 'No Stiffness', labelTl: 'Walang Pananamnhid' }
    ],
    questions: [
      {
        id: 'c1',
        num: 1,
        textEn: 'When you wake up in the morning, do you experience any joint stiffness in your hips or knees?',
        textTl: '(Nakakaramdam ka ba ng paninigas sa iyong tuhod o balakang tuwing gumigising sa umaga?)'
      }
    ]
  }
];

export const REDIRECT_URL = 'https://arthrologicph.com/';

export function calculateAssessmentScores(answers: Record<string, number | undefined>) {
  let scoreA = 0;
  for (let i = 1; i <= 4; i++) {
    const v = answers[`a${i}`];
    if (v !== undefined) scoreA += v;
  }

  let scoreB = 0;
  for (let i = 1; i <= 4; i++) {
    const v = answers[`b${i}`];
    if (v !== undefined) scoreB += v;
  }

  let scoreC = 0;
  const vC = answers['c1'];
  if (vC !== undefined) scoreC += vC;

  const totalScore = scoreA + scoreB + scoreC;
  return { scoreA, scoreB, scoreC, totalScore };
}

/**
 * Clinical Scoring Calibration:
 * - 35 - 22: Severe Pain & Prolonged Stiffness (Urgent Orthopedic Intervention Needed)
 * - 21 - 8: Moderate Pain & Limitation (Clinical Consultation Recommended)
 * - 7 - 0: Mild / No Pain (Optimal Joint Health & Function)
 */
export function getLevelClassification(total: number) {
  if (total >= 22) {
    return {
      level: 3 as const,
      title: 'High Severity (35 - 22)',
      status: 'Urgent Attention',
      badgeClass: 'badge-l3',
      requiresHelp: true,
      titleEn: 'Severe Pain & Joint Impairment — Urgent Orthopedic Attention Required',
      descEn: 'You scored in the highest pain and stiffness range (35–22). You need immediate clinical evaluation and orthopedic support. Please contact the specialists at ArthroLogic Knee & Orthopedic Institute promptly.',
      descTl: 'Nangangailangan kayo ng agarang pagsusuring medikal. Ang inyong kasu-kasuan ay nakararanas ng matinding pananakit o paninigas. Makipag-ugnayan agad sa ArthroLogic (arthrologicph.com).'
    };
  } else if (total >= 8) {
    return {
      level: 2 as const,
      title: 'Moderate Severity (21 - 8)',
      status: 'Needs Consultation',
      badgeClass: 'badge-l2',
      requiresHelp: true,
      titleEn: 'Moderate Joint Pain & Stiffness — Medical Consultation Recommended',
      descEn: 'Your score falls in the moderate pain and reduced mobility range (21–8). You need clinical help and early orthopedic evaluation to prevent further cartilage deterioration.',
      descTl: 'Kailangan ninyo ng tulong medikal. Ang inyong iskor ay nagpapakita ng regular na pananakit at paninigas. Mangyaring kumonsulta sa espesyalista sa ArthroLogic.'
    };
  } else {
    return {
      level: 1 as const,
      title: 'Low / No Pain (7 - 0)',
      status: 'Optimal Mobility',
      badgeClass: 'badge-l1',
      requiresHelp: false,
      titleEn: 'Optimal Joint Function & Mobility — Low to No Pain',
      descEn: 'Your score indicates healthy lower-body joint mobility with minimal to no pain or stiffness. Continue with regular low-impact exercise, physical activity, and joint health habits.',
      descTl: 'Ang inyong iskor ay nagpapakita ng magandang kalusugan ng kasu-kasuan at kaunti o walang pananakit. Ipagpatuloy ang regular na ehersisyo at pangangalaga sa katawan.'
    };
  }
}
