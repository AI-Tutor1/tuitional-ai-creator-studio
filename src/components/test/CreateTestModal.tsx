import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Eye, 
  Settings,
  FileText,
  Target
} from 'lucide-react';
import QuestionBuilder from '@/components/test/QuestionBuilder';
import { EnhancedQuestion } from '@/types/question';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestData {
  title: string;
  code: string;
  subject: string;
  grade: string;
  curriculum: string;
  duration: number;
  allowRetry: boolean;
  testType: string;
  difficulty: string;
  tags: string[];
  description: string;
  questions: EnhancedQuestion[];
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [testData, setTestData] = useState<TestData>({
    title: '',
    code: '',
    subject: '',
    grade: '',
    curriculum: '',
    duration: 60,
    allowRetry: false,
    testType: '',
    difficulty: '',
    tags: [],
    description: '',
    questions: []
  });

  const steps = [
    { id: 1, title: 'Settings', icon: Settings },
    { id: 2, title: 'Details', icon: FileText },
    { id: 3, title: 'Build Questions', icon: Target }
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', testData);
    onClose();
  };

  const handlePublish = () => {
    console.log('Publishing test:', testData);
    onClose();
  };

  const updateTestData = (field: keyof TestData, value: any) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Test Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Photosynthesis Assessment"
                  value={testData.title}
                  onChange={(e) => updateTestData('title', e.target.value)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">Test Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., BIO-101-A"
                  value={testData.code}
                  onChange={(e) => updateTestData('code', e.target.value)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Subject *</Label>
                <Select value={testData.subject} onValueChange={(value) => updateTestData('subject', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Grade *</Label>
                <Select value={testData.grade} onValueChange={(value) => updateTestData('grade', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Curriculum</Label>
                <Select value={testData.curriculum} onValueChange={(value) => updateTestData('curriculum', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select curriculum" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="cbse">CBSE</SelectItem>
                    <SelectItem value="icse">ICSE</SelectItem>
                    <SelectItem value="ib">IB</SelectItem>
                    <SelectItem value="cambridge">Cambridge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  value={testData.duration}
                  onChange={(e) => updateTestData('duration', parseInt(e.target.value))}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Allow Re-attempts</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    checked={testData.allowRetry}
                    onCheckedChange={(checked) => updateTestData('allowRetry', checked)}
                  />
                  <span className="text-gray-300">
                    {testData.allowRetry ? 'Enabled' : 'Disabled'}
                  </span>
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
                <Label className="text-white">Test Type</Label>
                <Select value={testData.testType} onValueChange={(value) => updateTestData('testType', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="formative">Formative Assessment</SelectItem>
                    <SelectItem value="summative">Summative Assessment</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic Test</SelectItem>
                    <SelectItem value="practice">Practice Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Difficulty Level</Label>
                <Select value={testData.difficulty} onValueChange={(value) => updateTestData('difficulty', value)}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {testData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#38B6FF] text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add tags (comma separated)"
                className="bg-[#1E1E1E] border-gray-600 text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value && !testData.tags.includes(value)) {
                      updateTestData('tags', [...testData.tags, value]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the test..."
                value={testData.description}
                onChange={(e) => updateTestData('description', e.target.value)}
                className="bg-[#1E1E1E] border-gray-600 text-white min-h-[120px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <QuestionBuilder 
              questions={testData.questions}
              onQuestionsChange={(questions) => updateTestData('questions', questions)}
            />
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
          <DialogTitle className="text-white text-2xl">Create New Test</DialogTitle>
        </DialogHeader>

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

        {/* Progress Bar */}
        <Progress value={(currentStep / 3) * 100} className="mb-6" />

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
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            
            {currentStep < 3 ? (
              <Button 
                onClick={handleNext}
                className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Publish Test
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestModal;
