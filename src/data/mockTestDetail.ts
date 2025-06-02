
import { TestDetailData } from '@/types/testDetail';

export const mockTestDetail: TestDetailData = {
  testId: 'eval-001',
  title: 'Chemistry: Chemical Reactions - Evaluation',
  course: 'Chemistry 201',
  dateCompleted: '2024-01-28',
  durationSeconds: 2535, // 42m 15s
  scorePercentage: 88,
  gradeLetter: 'B+',
  status: 'passed',
  canRequestRegrade: false,
  questions: [
    {
      questionId: 'q1',
      questionNumber: 1,
      questionText: 'What is the balanced equation for the combustion of methane?',
      type: 'multiple_choice',
      choices: [
        { optionLabel: 'A', text: 'CH₄ + O₂ → CO₂ + H₂O' },
        { optionLabel: 'B', text: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
        { optionLabel: 'C', text: '2CH₄ + 3O₂ → 2CO₂ + 4H₂O' },
        { optionLabel: 'D', text: 'CH₄ + 3O₂ → CO₂ + 2H₂O' }
      ],
      correctAnswer: 'B',
      userAnswer: 'B',
      isCorrect: true,
      timeTakenSeconds: 120,
      instructorFeedback: 'Excellent! You correctly balanced the equation.',
      points: 5,
      maxPoints: 5
    },
    {
      questionId: 'q2',
      questionNumber: 2,
      questionText: 'Calculate the molar mass of calcium carbonate (CaCO₃).',
      type: 'numeric',
      correctAnswer: '100.09 g/mol',
      userAnswer: '100 g/mol',
      isCorrect: false,
      timeTakenSeconds: 180,
      instructorFeedback: 'Close! Remember to include decimal precision in your calculations.',
      rubricTags: ['Calculation Error', 'Partial Credit'],
      points: 3,
      maxPoints: 5
    },
    {
      questionId: 'q3',
      questionNumber: 3,
      questionText: 'Explain the difference between ionic and covalent bonds.',
      type: 'short_answer',
      correctAnswer: 'Ionic bonds form between metals and non-metals through electron transfer, while covalent bonds form between non-metals through electron sharing.',
      userAnswer: 'Ionic bonds involve electron transfer, covalent bonds involve sharing electrons.',
      isCorrect: true,
      timeTakenSeconds: 240,
      instructorFeedback: 'Good understanding! You could enhance your answer by mentioning the types of elements involved.',
      points: 4,
      maxPoints: 5
    },
    {
      questionId: 'q4',
      questionNumber: 4,
      questionText: 'Which type of reaction is represented by: A + BC → AC + B?',
      type: 'multiple_choice',
      choices: [
        { optionLabel: 'A', text: 'Synthesis' },
        { optionLabel: 'B', text: 'Decomposition' },
        { optionLabel: 'C', text: 'Single displacement' },
        { optionLabel: 'D', text: 'Double displacement' }
      ],
      correctAnswer: 'C',
      userAnswer: 'A',
      isCorrect: false,
      timeTakenSeconds: 90,
      instructorFeedback: 'Review reaction types. This pattern shows one element replacing another in a compound.',
      points: 0,
      maxPoints: 5
    },
    {
      questionId: 'q5',
      questionNumber: 5,
      questionText: 'What is the pH of a 0.01M HCl solution?',
      type: 'numeric',
      correctAnswer: '2',
      userAnswer: '',
      isCorrect: false,
      timeTakenSeconds: 0,
      points: 0,
      maxPoints: 5
    }
  ],
  analytics: {
    timePerQuestion: [
      { questionNumber: 1, userTimeSec: 120, classAvgTimeSec: 105 },
      { questionNumber: 2, userTimeSec: 180, classAvgTimeSec: 150 },
      { questionNumber: 3, userTimeSec: 240, classAvgTimeSec: 200 },
      { questionNumber: 4, userTimeSec: 90, classAvgTimeSec: 120 },
      { questionNumber: 5, userTimeSec: 0, classAvgTimeSec: 110 }
    ],
    sectionPerformance: [
      { sectionName: 'Stoichiometry', userScorePct: 75, classAvgScorePct: 68 },
      { sectionName: 'Balancing Equations', userScorePct: 92, classAvgScorePct: 78 },
      { sectionName: 'Reaction Types', userScorePct: 60, classAvgScorePct: 72 },
      { sectionName: 'Acid-Base', userScorePct: 80, classAvgScorePct: 65 }
    ],
    questionAccuracy: [
      { questionNumber: 1, status: 'correct' },
      { questionNumber: 2, status: 'incorrect' },
      { questionNumber: 3, status: 'correct' },
      { questionNumber: 4, status: 'incorrect' },
      { questionNumber: 5, status: 'skipped' }
    ],
    classScoreBuckets: [
      { bucketRange: '0-59', studentCount: 3 },
      { bucketRange: '60-69', studentCount: 8 },
      { bucketRange: '70-79', studentCount: 12 },
      { bucketRange: '80-89', studentCount: 15 },
      { bucketRange: '90-100', studentCount: 7 }
    ],
    userPercentile: 85
  }
};
