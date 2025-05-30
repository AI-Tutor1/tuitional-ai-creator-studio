import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  X,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  BookTemplate,
  Search
} from 'lucide-react';
import { QuestionMetadata } from '@/types/question';
import AssociationTemplates from './AssociationTemplates';

interface QuestionAssociationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: QuestionMetadata) => void;
  initialMetadata?: Partial<QuestionMetadata>;
}

const QuestionAssociationModal: React.FC<QuestionAssociationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMetadata = {}
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [metadata, setMetadata] = useState<Partial<QuestionMetadata>>({
    topic: [],
    subject: '',
    grade: [],
    curriculum: [],
    level: [],
    board: [],
    difficulty: 'Foundation',
    year: [],
    paperType: [],
    paperCode: [],
    attempt: [],
    syllabusCode: [],
    syllabusType: [],
    variant: [],
    marks: 1,
    estimatedTime: 2,
    tags: [],
    learningObjectives: [],
    ...initialMetadata
  });

  const steps = [
    { id: 1, title: 'Academic Info', icon: BookOpen },
    { id: 2, title: 'Examination', icon: GraduationCap },
    { id: 3, title: 'Assessment', icon: Award },
    { id: 4, title: 'Additional', icon: FileText }
  ];

  // Enhanced predefined options with search capability
  const subjects = [
    'Mathematics', 'Biology', 'Chemistry', 'Physics', 'English', 'History', 
    'Geography', 'Economics', 'Business Studies', 'Computer Science', 
    'Psychology', 'Sociology', 'Art & Design', 'Music', 'French', 'Spanish',
    'German', 'Italian', 'Chinese', 'Arabic', 'Environmental Science',
    'Philosophy', 'Drama', 'Physical Education', 'Design Technology'
  ];
  
  const grades = [
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 
    'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13',
    'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'
  ];
  
  const curriculums = [
    'CBSE', 'ICSE', 'IB', 'Cambridge', 'Edexcel', 'AQA', 'OCR', 'WJEC', 
    'CCEA', 'SQA', 'NCEA', 'VCE', 'HSC', 'NZQA', 'VCAA', 'NESA',
    'Pearson', 'CIE', 'International Baccalaureate', 'British Curriculum'
  ];
  
  const boards = [
    'Cambridge', 'Edexcel', 'AQA', 'OCR', 'WJEC', 'CCEA', 'CIE', 
    'Pearson', 'SQA', 'NZQA', 'VCAA', 'NESA', 'IB Organization',
    'CBSE Board', 'ICSE Board', 'Maharashtra Board', 'Kerala Board'
  ];
  
  const levels = [
    'IGCSE', 'GCSE', 'A-Level', 'AS-Level', 'O-Level', 'IB DP', 
    'IB MYP', 'Advanced Higher', 'Higher', 'National 5', 'National 4',
    'Standard Grade', 'Intermediate', 'Foundation', 'Advanced'
  ];
  
  const syllabusTypes = [
    'Extended', 'Core', 'Foundation', 'Higher', 'Standard Level', 
    'Higher Level', 'Ordinary Level', 'Advanced Level', 'Basic',
    'Accelerated', 'Remedial', 'Enriched'
  ];

  const attemptOptions = [
    'First Attempt', 'Second Attempt', 'Third Attempt', 'Fourth Attempt',
    'Resit', 'Mock Exam', 'Practice Paper', 'Trial Exam', 'Supplementary'
  ];

  const paperTypes = [
    'Theory', 'Practical', 'Coursework', 'Project', 'Oral', 'Written',
    'Multiple Choice', 'Structured', 'Essay', 'Problem Solving',
    'Investigation', 'Assessment', 'Controlled Assessment'
  ];

  // Filter options based on search term
  const filterOptions = (options: string[], term: string) => {
    if (!term) return options;
    return options.filter(option => 
      option.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    onSave(metadata as QuestionMetadata);
    onClose();
  };

  const addToArray = (field: keyof QuestionMetadata, value: string | number) => {
    const currentArray = metadata[field] as any[] || [];
    if (!currentArray.includes(value)) {
      setMetadata(prev => ({
        ...prev,
        [field]: [...currentArray, value]
      }));
    }
  };

  const removeFromArray = (field: keyof QuestionMetadata, value: string | number) => {
    const currentArray = metadata[field] as any[] || [];
    setMetadata(prev => ({
      ...prev,
      [field]: currentArray.filter(item => item !== value)
    }));
  };

  const applyTemplate = (template: any) => {
    setMetadata(prev => ({
      ...prev,
      ...template.metadata
    }));
    setShowTemplates(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Subject *</Label>
                <Select 
                  value={metadata.subject} 
                  onValueChange={(value) => setMetadata(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600 max-h-60">
                    <div className="sticky top-0 p-2 bg-[#2A2A2A]">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search subjects..."
                          className="pl-8 bg-[#1E1E1E] border-gray-600 text-white"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    {filterOptions(subjects, searchTerm).map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Topic</Label>
                <Input
                  placeholder="Add topic and press Enter"
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        addToArray('topic', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {metadata.topic?.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#38B6FF] text-white">
                      {topic}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('topic', topic)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Grade</Label>
                <Select onValueChange={(value) => addToArray('grade', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.grade?.map((grade, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-600 text-white">
                      {grade}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('grade', grade)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Curriculum</Label>
                <Select onValueChange={(value) => addToArray('curriculum', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add curriculum" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {curriculums.map(curriculum => (
                      <SelectItem key={curriculum} value={curriculum}>{curriculum}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.curriculum?.map((curriculum, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                      {curriculum}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('curriculum', curriculum)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Level</Label>
                <Select onValueChange={(value) => addToArray('level', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.level?.map((level, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-600 text-white">
                      {level}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('level', level)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Board</Label>
                <Select onValueChange={(value) => addToArray('board', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add board" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {boards.map(board => (
                      <SelectItem key={board} value={board}>{board}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.board?.map((board, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-600 text-white">
                      {board}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('board', board)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Difficulty Level</Label>
                <Select 
                  value={metadata.difficulty} 
                  onValueChange={(value) => setMetadata(prev => ({ ...prev, difficulty: value as any }))}
                >
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Higher">Higher</SelectItem>
                    <SelectItem value="Extended">Extended</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Year</Label>
                <Input
                  type="number"
                  placeholder="Add year and press Enter"
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = parseInt((e.target as HTMLInputElement).value);
                      if (value && value > 1990 && value <= 2030) {
                        addToArray('year', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {metadata.year?.map((year, index) => (
                    <Badge key={index} variant="secondary" className="bg-indigo-600 text-white">
                      {year}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('year', year)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Paper Type</Label>
                <Select onValueChange={(value) => addToArray('paperType', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add paper type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {paperTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.paperType?.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-teal-600 text-white">
                      {type}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('paperType', type)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Paper Code</Label>
                <Input
                  placeholder="Add paper code and press Enter"
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        addToArray('paperCode', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {metadata.paperCode?.map((code, index) => (
                    <Badge key={index} variant="secondary" className="bg-pink-600 text-white">
                      {code}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('paperCode', code)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Attempt</Label>
                <Select onValueChange={(value) => addToArray('attempt', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add attempt" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {attemptOptions.map(attempt => (
                      <SelectItem key={attempt} value={attempt}>{attempt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.attempt?.map((attempt, index) => (
                    <Badge key={index} variant="secondary" className="bg-emerald-600 text-white">
                      {attempt}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('attempt', attempt)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Syllabus Code</Label>
                <Input
                  placeholder="Add syllabus code and press Enter"
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        addToArray('syllabusCode', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {metadata.syllabusCode?.map((code, index) => (
                    <Badge key={index} variant="secondary" className="bg-violet-600 text-white">
                      {code}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('syllabusCode', code)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Syllabus Type</Label>
                <Select onValueChange={(value) => addToArray('syllabusType', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {syllabusTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.syllabusType?.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-cyan-600 text-white">
                      {type}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('syllabusType', type)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Variant</Label>
                <Select onValueChange={(value) => addToArray('variant', parseInt(value))}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Add variant" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="1">Variant 1</SelectItem>
                    <SelectItem value="2">Variant 2</SelectItem>
                    <SelectItem value="3">Variant 3</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1">
                  {metadata.variant?.map((variant, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-600 text-white">
                      V{variant}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('variant', variant)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Marks</Label>
                <Input
                  type="number"
                  value={metadata.marks || ''}
                  onChange={(e) => setMetadata(prev => ({ ...prev, marks: parseInt(e.target.value) || 1 }))}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Estimated Time (minutes)</Label>
                <Input
                  type="number"
                  value={metadata.estimatedTime || ''}
                  onChange={(e) => setMetadata(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 2 }))}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Tags</Label>
                <Input
                  placeholder="Add tag and press Enter"
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        addToArray('tags', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {metadata.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#38B6FF] text-white">
                      {tag}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeFromArray('tags', tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Learning Objectives</Label>
              <Textarea
                placeholder="Describe the learning objectives for this question..."
                className="bg-[#1E1E1E] border-gray-600 text-white min-h-[100px]"
                value={metadata.learningObjectives?.join('\n') || ''}
                onChange={(e) => {
                  const objectives = e.target.value.split('\n').filter(obj => obj.trim());
                  setMetadata(prev => ({ ...prev, learningObjectives: objectives }));
                }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2A2A2A] border-gray-700 max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center justify-between">
            Question Association
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <BookTemplate className="mr-2 h-4 w-4" />
              Templates
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showTemplates ? (
          <div className="max-h-[70vh] overflow-y-auto">
            <AssociationTemplates
              templates={[]}
              onApplyTemplate={applyTemplate}
              onSaveTemplate={() => {}}
              onDeleteTemplate={() => {}}
            />
          </div>
        ) : (
          <>
            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${currentStep >= step.id 
                      ? 'bg-[#38B6FF] border-[#38B6FF] text-white' 
                      : 'border-gray-600 text-gray-400'
                    }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-0.5 w-16 ${currentStep > step.id ? 'bg-[#38B6FF]' : 'bg-gray-600'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <div>
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex space-x-3">
                {currentStep < 4 ? (
                  <Button 
                    onClick={handleNext}
                    className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Association
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionAssociationModal;
