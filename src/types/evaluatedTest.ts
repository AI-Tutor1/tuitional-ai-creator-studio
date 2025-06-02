
export interface QuestionResult {
  questionId: string;
  questionNumber: number;
  questionTextPreview: string;
  fullQuestionText: string;
  userAnswer: string;
  correctAnswer: string;
  answerChoices?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  isCorrect: boolean;
  wasSkipped: boolean;
  instructorFeedback?: string;
  points: number;
  maxPoints: number;
  tags?: string[];
}

export interface EvaluatedTest {
  testId: string;
  title: string;
  course: string;
  subject: string;
  dateCompleted: string;
  durationMinutes: number;
  scorePercentage: number;
  gradeLetter?: string;
  status: 'passed' | 'failed' | 'needs_review';
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  totalQuestions: number;
  instructorCommentsAvailable: boolean;
  canRequestRegrade: boolean;
  regradeRequested?: boolean;
  questionResults: QuestionResult[];
  instructorName?: string;
  generalFeedback?: string;
}

export interface FilterState {
  dateRange: {
    start?: string;
    end?: string;
  };
  courses: string[];
  scoreRange: {
    min: number;
    max: number;
  };
  statuses: string[];
}

export type ViewMode = 'card' | 'table';
