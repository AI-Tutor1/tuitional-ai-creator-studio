import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Flag,
  CheckCircle,
  Circle,
  AlertTriangle,
  BookOpen,
  Save,
  Send,
  FileImage,
  Calculator as CalculatorIcon,
  Edit,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import OCRUpload from '@/components/test/OCRUpload';
import MathTextEditor from '@/components/test/MathTextEditor';
import Calculator from '@/components/test/Calculator';
import ImageUpload from '@/components/test/ImageUpload';

interface Question {
  id: string;
  type: 'mcq' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
  answered: boolean;
  flagged: boolean;
  answer?: string;
}

const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes in seconds
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: { url: string; alt: string; caption?: string } }>({});
  
  // Tool states
  const [showOCR, setShowOCR] = useState(false);
  const [showMathEditor, setShowMathEditor] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const mockTest = {
    id: testId,
    title: 'Photosynthesis and Plant Biology',
    subject: 'Biology',
    duration: 90,
    totalMarks: 50,
    questions: [
      {
        id: '1',
        type: 'mcq' as const,
        question: 'What is the primary function of chlorophyll in photosynthesis?',
        options: [
          'Absorbing light energy',
          'Storing glucose',
          'Producing oxygen',
          'Breaking down water'
        ],
        marks: 2,
        answered: false,
        flagged: false
      },
      {
        id: '2',
        type: 'mcq' as const,
        question: 'Which organelle is responsible for photosynthesis in plant cells?',
        options: [
          'Nucleus',
          'Mitochondria',
          'Chloroplast',
          'Ribosome'
        ],
        marks: 2,
        answered: false,
        flagged: false
      },
      {
        id: '3',
        type: 'short-answer' as const,
        question: 'Explain the difference between photosynthesis and cellular respiration.',
        marks: 6,
        answered: false,
        flagged: false
      },
      {
        id: '4',
        type: 'essay' as const,
        question: 'Describe the light-dependent reactions of photosynthesis, including the role of chlorophyll, water, and ATP synthesis.',
        marks: 10,
        answered: false,
        flagged: false
      }
    ] as Question[]
  };

  const currentQuestion = mockTest.questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getQuestionStatus = (question: Question) => {
    const isAnswered = answers[question.id] && answers[question.id].trim() !== '';
    const isFlagged = flaggedQuestions.has(question.id);
    
    if (isAnswered) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'flagged': return <Flag className="h-4 w-4 text-yellow-500" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleSubmitTest = () => {
    toast({
      title: "Test Submitted",
      description: "Your test has been successfully submitted.",
    });
    navigate(`/test-results/${testId}`);
  };

  const handleOCRTextExtracted = (text: string) => {
    const currentAnswer = answers[currentQuestion.id] || '';
    const newAnswer = currentAnswer + (currentAnswer ? '\n\n' : '') + text;
    handleAnswerChange(currentQuestion.id, newAnswer);
    
    toast({
      title: "Text Extracted",
      description: "OCR text has been added to your answer.",
    });
  };

  const handleCalculatorResult = (result: string) => {
    const currentAnswer = answers[currentQuestion.id] || '';
    const newAnswer = currentAnswer + result;
    handleAnswerChange(currentQuestion.id, newAnswer);
    
    toast({
      title: "Result Inserted",
      description: "Calculator result has been added to your answer.",
    });
  };

  const handleImageUpload = (imageData: { url: string; alt: string; caption?: string }) => {
    setUploadedImages(prev => ({
      ...prev,
      [currentQuestion.id]: imageData
    }));
    
    toast({
      title: "Image Uploaded",
      description: "Your image has been attached to this question.",
    });
  };

  const handleRemoveImage = () => {
    setUploadedImages(prev => {
      const newImages = { ...prev };
      delete newImages[currentQuestion.id];
      return newImages;
    });
  };

  const answeredCount = mockTest.questions.filter(q => answers[q.id] && answers[q.id].trim() !== '').length;
  const progressPercentage = (answeredCount / mockTest.questions.length) * 100;

  // Show tools overlay
  if (showOCR) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center p-4">
        <OCRUpload 
          onTextExtracted={handleOCRTextExtracted}
          onClose={() => setShowOCR(false)}
        />
      </div>
    );
  }

  if (showCalculator) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center p-4">
        <Calculator 
          onClose={() => setShowCalculator(false)}
          onInsertResult={handleCalculatorResult}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Header */}
      <div className="bg-[#2A2A2A] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-xl font-bold text-white">{mockTest.title}</h1>
              <p className="text-sm text-gray-400">{mockTest.subject} • {mockTest.totalMarks} marks</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-gray-400">Progress</div>
                <div className="text-white font-medium">{answeredCount}/{mockTest.questions.length}</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400">Time Remaining</div>
                <div className={`text-lg font-mono font-bold ${timeRemaining < 600 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <Button
                onClick={handleSubmitTest}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Test
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#2A2A2A] border-gray-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {mockTest.questions.map((question, index) => {
                    const status = getQuestionStatus(question);
                    const isCurrentQuestion = index === currentQuestionIndex;
                    
                    return (
                      <Button
                        key={question.id}
                        variant={isCurrentQuestion ? "default" : "outline"}
                        size="sm"
                        className={`h-10 w-10 p-0 ${
                          isCurrentQuestion 
                            ? 'bg-[#38B6FF] text-white' 
                            : status === 'answered'
                            ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                            : status === 'flagged'
                            ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
                            : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-300">Answered</span>
                    </div>
                    <span className="text-white">{answeredCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-gray-300">Flagged</span>
                    </div>
                    <span className="text-white">{flaggedQuestions.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Circle className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">Unanswered</span>
                    </div>
                    <span className="text-white">
                      {mockTest.questions.length - answeredCount}
                    </span>
                  </div>
                </div>

                {/* Student Tools */}
                {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'essay') && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-white text-sm font-medium">Student Tools</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowOCR(true)}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                      >
                        <FileImage className="h-4 w-4 mr-1" />
                        OCR
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCalculator(true)}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                      >
                        <CalculatorIcon className="h-4 w-4 mr-1" />
                        Calc
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMathEditor(!showMathEditor)}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Math
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowImageUpload(!showImageUpload)}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="bg-[#2A2A2A] border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-[#38B6FF] text-[#38B6FF]">
                      Question {currentQuestionIndex + 1}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {currentQuestion.marks} marks
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300 capitalize">
                      {currentQuestion.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`border-gray-600 ${
                      flaggedQuestions.has(currentQuestion.id)
                        ? 'text-yellow-500 border-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Flag for Review
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-white text-lg leading-relaxed">
                  {currentQuestion.question}
                </div>

                {/* Answer Options */}
                {currentQuestion.type === 'mcq' && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:border-[#38B6FF] transition-colors">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="text-white cursor-pointer flex-1">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Text Answer Area with Enhanced Editor */}
                {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'essay') && (
                  <div className="space-y-4">
                    {/* Math Editor */}
                    {showMathEditor && (
                      <MathTextEditor
                        value={answers[currentQuestion.id] || ''}
                        onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                        placeholder={`Enter your ${currentQuestion.type === 'essay' ? 'detailed ' : ''}answer here...`}
                        onClose={() => setShowMathEditor(false)}
                      />
                    )}

                    {/* Image Upload */}
                    {showImageUpload && (
                      <div className="space-y-3">
                        <h4 className="text-white text-sm font-medium">Attach Image</h4>
                        <ImageUpload
                          onImageUpload={handleImageUpload}
                          currentImage={uploadedImages[currentQuestion.id]}
                          onRemoveImage={handleRemoveImage}
                        />
                      </div>
                    )}

                    {/* Standard Text Area */}
                    {!showMathEditor && (
                      <div>
                        <Textarea
                          placeholder={`Enter your ${currentQuestion.type === 'essay' ? 'detailed ' : ''}answer here...`}
                          value={answers[currentQuestion.id] || ''}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className={`bg-[#1E1E1E] border-gray-600 text-white min-h-[${currentQuestion.type === 'essay' ? '200' : '100'}px] resize-none`}
                        />
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                          <span>
                            {currentQuestion.type === 'essay' 
                              ? 'Provide a detailed explanation with examples'
                              : 'Keep your answer concise and to the point'
                            }
                          </span>
                          <span>
                            {answers[currentQuestion.id]?.length || 0} characters
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-600">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Progress
                    </Button>
                    
                    {currentQuestionIndex === mockTest.questions.length - 1 ? (
                      <Button
                        onClick={handleSubmitTest}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Submit Test
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestionIndex(Math.min(mockTest.questions.length - 1, currentQuestionIndex + 1))}
                        className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaking;
