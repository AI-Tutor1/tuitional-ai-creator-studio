
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

export interface EnhancedQuestion {
  id: string;
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
  metadata?: QuestionMetadata;
  questionBankId?: string;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
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
}
