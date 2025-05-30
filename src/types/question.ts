
export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
}

export interface QuestionSubpart {
  id: string;
  partNumber: string;
  text: string;
  marks: number;
  subType: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram';
  mcqOptions?: MCQOption[];
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
  subType?: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram';
  text?: string;
  marks: number;
  includeAnswer: boolean;
  includeDiagram: boolean;
  image?: string;
  markingScheme?: string;
  mcqOptions?: MCQOption[];
  subparts?: QuestionSubpart[];
  metadata?: QuestionMetadata;
  
  // Performance metrics
  totalAttempts?: number;
  averageScore?: number;
  averageTime?: number;
  skipRate?: number;
  hintUsage?: number;
  successRate?: number;
}
