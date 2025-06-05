
export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
}

export interface MatchingPair {
  id: string;
  leftItem: string;
  rightItem: string;
  leftImage?: string;
  rightImage?: string;
}

export interface QuestionAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // base64 encoded file data
  uploadedAt: string;
}

export interface QuestionSubpart {
  id: string;
  partNumber: string;
  text: string;
  marks: number;
  subType: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram' | 'matching';
  mcqOptions?: MCQOption[];
  matchingPairs?: MatchingPair[];
  markingScheme?: string;
}

export interface QuestionMetadata {
  topic?: string[];
  subject?: string;
  grade?: string[];
  curriculum?: string[];
  level?: string[];
  board?: string[];
  difficulty?: string;
  year?: number[];
  paperType?: string[];
  paperCode?: string[];
  attempt?: number[];
  syllabusCode?: string[];
  syllabusType?: string[];
  variant?: number[];
  marks?: number;
  estimatedTime?: number;
  tags?: string[];
  learningObjectives?: string[];
  difficultyIndex?: number;
  discriminationIndex?: number;
  bloomsLevel?: string;
}

export interface EnhancedQuestion {
  id: string;
  questionNumber: number;
  type: 'question' | 'passage';
  subType?: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram' | 'matching';
  text?: string;
  marks: number;
  includeAnswer: boolean;
  includeDiagram: boolean;
  image?: string;
  markingScheme?: string;
  attachments?: QuestionAttachment[];
  mcqOptions?: MCQOption[];
  matchingPairs?: MatchingPair[];
  subparts?: QuestionSubpart[];
  metadata?: QuestionMetadata;
  
  // Performance metrics
  totalAttempts?: number;
  averageScore?: number;
  averageTime?: number;
  skipRate?: number;
  hintUsage?: number;
  successRate?: number;
  viewCount?: number;
  completionRate?: number;
}
