
export interface QuestionChoice {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface NumericAnswer {
  value: number;
  tolerancePct: number;
  unitLabel?: string;
}

export interface CreatedTestQuestion {
  questionId: string;
  questionNumber: number;
  type: 'mcq' | 'short_answer' | 'numeric';
  text: string;
  choices?: QuestionChoice[];
  exactMatchRequired?: boolean;
  numericAnswer?: NumericAnswer;
  points: number;
  feedback?: string;
  required: boolean;
  section?: string;
}

export interface VersionHistory {
  version: string;
  modifiedBy: string;
  modifiedAt: string;
}

export interface ResponsesSummary {
  totalResponses: number;
  completedCount: number;
  inProgressCount: number;
}

export interface QuestionStat {
  questionNumber: number;
  timesAttempted: number;
  countCorrect: number;
  countIncorrect: number;
  averageTimeSec: number;
  difficultyRating: number;
}

export interface SectionStat {
  sectionName: string;
  scoreDistribution: {
    '90-100': number;
    '75-89': number;
    '50-74': number;
    '<50': number;
  };
}

export interface TimeBucket {
  range: string;
  questionCount: number;
}

export interface MostMissedQuestion {
  questionNumber: number;
  incorrectCount: number;
}

export interface CreatedTestAnalytics {
  averageScorePct: number;
  completionRatePct: number;
  averageTimeSeconds: number;
  questionStats: QuestionStat[];
  sectionStats: SectionStat[];
  timeBuckets: TimeBucket[];
  mostMissedQuestions: MostMissedQuestion[];
}

export interface StudentResponse {
  responseId: string;
  studentName: string;
  studentId: string;
  submissionDate: string;
  scorePercentage: number;
  status: 'completed' | 'in_progress' | 'not_started';
  answers: Record<string, string>;
}

export interface CreatedTestDetailData {
  testId: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  course: string;
  durationMinutes: number;
  numQuestions: number;
  visibility: 'public' | 'private';
  availableFrom: string;
  availableTo: string;
  passingScorePct: number;
  description?: string;
  versionHistory: VersionHistory[];
  questions: CreatedTestQuestion[];
  responsesSummary: ResponsesSummary;
  analytics: CreatedTestAnalytics;
  responses: StudentResponse[];
}
