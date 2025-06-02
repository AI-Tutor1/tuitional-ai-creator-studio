
export interface TestAnalytics {
  timePerQuestion: {
    questionNumber: number;
    userTimeSec: number;
    classAvgTimeSec: number;
  }[];
  sectionPerformance: {
    sectionName: string;
    userScorePct: number;
    classAvgScorePct: number;
  }[];
  questionAccuracy: {
    questionNumber: number;
    status: 'correct' | 'incorrect' | 'skipped';
  }[];
  classScoreBuckets: {
    bucketRange: string;
    studentCount: number;
  }[];
  userPercentile?: number;
}

export interface DetailedQuestionResult {
  questionId: string;
  questionNumber: number;
  questionText: string;
  type: 'multiple_choice' | 'short_answer' | 'numeric';
  choices?: {
    optionLabel: string;
    text: string;
  }[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  timeTakenSeconds: number;
  instructorFeedback?: string;
  rubricTags?: string[];
  points: number;
  maxPoints: number;
}

export interface TestDetailData {
  testId: string;
  title: string;
  course: string;
  dateCompleted: string;
  durationSeconds: number;
  scorePercentage: number;
  gradeLetter?: string;
  status: 'passed' | 'failed' | 'needs_review';
  questions: DetailedQuestionResult[];
  analytics: TestAnalytics;
  canRequestRegrade: boolean;
  regradeRequested?: boolean;
}
