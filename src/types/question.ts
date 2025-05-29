
export interface QuestionMetadata {
  // Academic Information
  topic: string[];
  subject: string;
  grade: string[];
  curriculum: string[];
  
  // Examination Details
  level: ('IGCSE' | 'GCSE' | 'A-Level' | 'O-Level')[];
  board: string[];
  difficulty: 'Foundation' | 'Higher' | 'Extended' | 'Core';
  year: number[];
  paperType: string[];
  paperCode: string[];
  
  // Assessment Details
  attempt: number[];
  syllabusCode: string[];
  syllabusType: ('Extended' | 'Core' | 'Foundation' | 'Higher')[];
  variant: (1 | 2 | 3)[];
  
  // Additional Metadata
  marks: number;
  estimatedTime: number;
  tags: string[];
  learningObjectives: string[];
  difficultyIndex?: number; // 0-1 scale
  discriminationIndex?: number; // -1 to +1 scale
  bloomsLevel?: string;
}

export interface MCQOptionWithImage {
  id: string;
  text: string;
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
  isCorrect: boolean;
  explanation?: string;
}

export interface QuestionSubpart {
  id: string;
  partNumber: string; // e.g., 'a', 'b', 'i', 'ii'
  text: string;
  marks: number;
  subType?: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram' | 'equation';
  mcqOptions?: MCQOptionWithImage[];
  markingScheme?: string;
  studentAnswer?: string;
}

export interface EnhancedQuestion {
  id: string;
  questionNumber: number; // Sequential question number in test
  type: 'main-statement' | 'child-statement' | 'diagram' | 'question';
  subType?: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram' | 'equation';
  text: string;
  marks?: number;
  markingScheme?: string;
  markingSchemeImage?: string;
  includeAnswer: boolean;
  studentAnswer?: string;
  includeDiagram: boolean;
  diagram?: string;
  mcqOptions?: MCQOptionWithImage[];
  subparts?: QuestionSubpart[]; // For multi-part questions
  metadata?: QuestionMetadata;
  questionBankId?: string;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
  
  // Analytics data
  totalAttempts?: number;
  averageScore?: number;
  averageTime?: number;
  skipRate?: number;
  hintUsage?: number;
}

export interface QuestionBank {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: string;
  curriculum: string;
  questionCount: number;
  createdBy: string;
  createdAt: string;
  isPublic: boolean;
  topics: string[];
  tags: string[];
}

export interface TestTemplate {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  curriculum: string;
  topics: string[];
  suggestedQuestions: EnhancedQuestion[];
  totalMarks: number;
  estimatedDuration: number;
  createdAt: string;
  createdBy: string;
}
