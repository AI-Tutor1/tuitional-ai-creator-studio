
import { EvaluatedTest } from '@/types/evaluatedTest';

export const mockEvaluatedTests: EvaluatedTest[] = [
  {
    testId: 'eval-001',
    title: 'Photosynthesis and Plant Biology Mid-Term',
    course: 'Biology 101',
    subject: 'Biology',
    dateCompleted: '2024-01-28',
    durationMinutes: 85,
    scorePercentage: 92,
    gradeLetter: 'A',
    status: 'passed',
    correctCount: 23,
    incorrectCount: 2,
    skippedCount: 0,
    totalQuestions: 25,
    instructorCommentsAvailable: true,
    canRequestRegrade: false,
    instructorName: 'Dr. Sarah Johnson',
    generalFeedback: 'Excellent understanding of photosynthesis processes. Minor calculation error in light reaction efficiency.',
    questionResults: [
      {
        questionId: 'q1',
        questionNumber: 1,
        questionTextPreview: 'Which of the following best describes...',
        fullQuestionText: 'Which of the following best describes the process of photosynthesis in plants?',
        userAnswer: 'A',
        correctAnswer: 'A',
        answerChoices: [
          { id: 'A', text: 'The conversion of light energy into chemical energy using carbon dioxide and water', isCorrect: true },
          { id: 'B', text: 'The breakdown of glucose to release energy for cellular processes', isCorrect: false },
          { id: 'C', text: 'The transport of nutrients through the plant vascular system', isCorrect: false },
          { id: 'D', text: 'The absorption of minerals from soil through root systems', isCorrect: false }
        ],
        isCorrect: true,
        wasSkipped: false,
        instructorFeedback: 'Perfect answer! Shows clear understanding of photosynthesis.',
        points: 4,
        maxPoints: 4
      }
    ]
  },
  {
    testId: 'eval-002',
    title: 'Chemical Reactions and Stoichiometry',
    course: 'Chemistry 201',
    subject: 'Chemistry',
    dateCompleted: '2024-01-25',
    durationMinutes: 95,
    scorePercentage: 76,
    gradeLetter: 'B',
    status: 'passed',
    correctCount: 19,
    incorrectCount: 6,
    skippedCount: 0,
    totalQuestions: 25,
    instructorCommentsAvailable: true,
    canRequestRegrade: false,
    instructorName: 'Dr. Emma Wilson',
    questionResults: []
  },
  {
    testId: 'eval-003',
    title: 'Algebraic Equations and Functions',
    course: 'Mathematics 101',
    subject: 'Mathematics',
    dateCompleted: '2024-01-22',
    durationMinutes: 72,
    scorePercentage: 58,
    gradeLetter: 'D',
    status: 'needs_review',
    correctCount: 12,
    incorrectCount: 8,
    skippedCount: 1,
    totalQuestions: 21,
    instructorCommentsAvailable: true,
    canRequestRegrade: true,
    instructorName: 'Prof. Michael Chen',
    questionResults: []
  },
  {
    testId: 'eval-004',
    title: 'Physics: Newton\'s Laws and Motion',
    course: 'Physics 101',
    subject: 'Physics',
    dateCompleted: '2024-01-20',
    durationMinutes: 88,
    scorePercentage: 95,
    gradeLetter: 'A',
    status: 'passed',
    correctCount: 28,
    incorrectCount: 1,
    skippedCount: 1,
    totalQuestions: 30,
    instructorCommentsAvailable: false,
    canRequestRegrade: false,
    instructorName: 'Dr. James Parker',
    questionResults: []
  },
  {
    testId: 'eval-005',
    title: 'European History: Industrial Revolution',
    course: 'History 201',
    subject: 'History',
    dateCompleted: '2024-01-18',
    durationMinutes: 105,
    scorePercentage: 42,
    gradeLetter: 'F',
    status: 'failed',
    correctCount: 8,
    incorrectCount: 11,
    skippedCount: 1,
    totalQuestions: 20,
    instructorCommentsAvailable: true,
    canRequestRegrade: true,
    instructorName: 'Prof. Rebecca Martinez',
    questionResults: []
  }
];
