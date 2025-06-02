
import { CreatedTestDetailData } from '@/types/createdTestDetail';

export const mockCreatedTestDetail: CreatedTestDetailData = {
  testId: 'test-123',
  title: 'Chemistry: Chemical Reactions (Midterm)',
  status: 'published',
  createdAt: '2025-06-01T14:23:00Z',
  course: 'CHEM-301: Organic Chemistry',
  durationMinutes: 60,
  numQuestions: 15,
  visibility: 'public',
  availableFrom: '2025-06-10',
  availableTo: '2025-06-12',
  passingScorePct: 70,
  description: 'This test covers Chapters 4–6. No calculators allowed. Each question is worth 4 points.',
  versionHistory: [
    {
      version: 'v1.2',
      modifiedBy: 'Dr. A. Wahid',
      modifiedAt: '2025-06-05T14:23:00Z'
    },
    {
      version: 'v1.1',
      modifiedBy: 'Dr. A. Wahid',
      modifiedAt: '2025-06-03T10:15:00Z'
    }
  ],
  questions: [
    {
      questionId: 'q1',
      questionNumber: 1,
      type: 'mcq',
      text: 'What is the balanced chemical equation for combustion of methane?',
      choices: [
        { label: 'A', text: 'CH₄ + O₂ → CO₂ + H₂O', isCorrect: false },
        { label: 'B', text: 'CH₄ + 2O₂ → CO₂ + 2H₂O', isCorrect: true },
        { label: 'C', text: 'CH₄ + 3O₂ → CO₂ + 2H₂O', isCorrect: false },
        { label: 'D', text: '2CH₄ + O₂ → 2CO₂ + H₂O', isCorrect: false }
      ],
      points: 4,
      feedback: 'Remember to balance both carbon and hydrogen atoms.',
      required: true,
      section: 'Stoichiometry'
    },
    {
      questionId: 'q2',
      questionNumber: 2,
      type: 'short_answer',
      text: 'Explain the difference between an acid and a base according to Brønsted-Lowry theory.',
      exactMatchRequired: false,
      points: 6,
      feedback: 'Focus on proton donation and acceptance.',
      required: true,
      section: 'Acid-Base Chemistry'
    },
    {
      questionId: 'q3',
      questionNumber: 3,
      type: 'numeric',
      text: 'Calculate the molarity of a solution containing 5.85 g of NaCl in 250 mL of water.',
      numericAnswer: {
        value: 0.4,
        tolerancePct: 5,
        unitLabel: 'M'
      },
      points: 5,
      feedback: 'Use the formula M = moles/volume(L).',
      required: true,
      section: 'Solutions'
    }
  ],
  responsesSummary: {
    totalResponses: 42,
    completedCount: 35,
    inProgressCount: 7
  },
  analytics: {
    averageScorePct: 76,
    completionRatePct: 83,
    averageTimeSeconds: 2730,
    questionStats: [
      {
        questionNumber: 1,
        timesAttempted: 42,
        countCorrect: 32,
        countIncorrect: 10,
        averageTimeSec: 120,
        difficultyRating: 2
      },
      {
        questionNumber: 2,
        timesAttempted: 42,
        countCorrect: 18,
        countIncorrect: 24,
        averageTimeSec: 300,
        difficultyRating: 4
      },
      {
        questionNumber: 3,
        timesAttempted: 42,
        countCorrect: 25,
        countIncorrect: 17,
        averageTimeSec: 180,
        difficultyRating: 3
      }
    ],
    sectionStats: [
      {
        sectionName: 'Stoichiometry',
        scoreDistribution: {
          '90-100': 12,
          '75-89': 15,
          '50-74': 10,
          '<50': 5
        }
      },
      {
        sectionName: 'Acid-Base Chemistry',
        scoreDistribution: {
          '90-100': 8,
          '75-89': 12,
          '50-74': 15,
          '<50': 7
        }
      }
    ],
    timeBuckets: [
      { range: '0-30', questionCount: 5 },
      { range: '31-60', questionCount: 14 },
      { range: '61-90', questionCount: 18 },
      { range: '91-120', questionCount: 8 },
      { range: '120+', questionCount: 3 }
    ],
    mostMissedQuestions: [
      { questionNumber: 7, incorrectCount: 23 },
      { questionNumber: 12, incorrectCount: 18 },
      { questionNumber: 5, incorrectCount: 17 },
      { questionNumber: 19, incorrectCount: 15 },
      { questionNumber: 3, incorrectCount: 14 }
    ]
  },
  responses: [
    {
      responseId: 'resp1',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      submissionDate: '2025-06-11T10:30:00Z',
      scorePercentage: 85,
      status: 'completed',
      answers: { q1: 'B', q2: 'An acid donates protons...', q3: '0.4' }
    },
    {
      responseId: 'resp2',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      submissionDate: '2025-06-11T11:15:00Z',
      scorePercentage: 72,
      status: 'completed',
      answers: { q1: 'A', q2: 'Acids are sour...', q3: '0.38' }
    }
  ]
};
