
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast"
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle } from 'lucide-react';
import BackButton from '@/components/shared/BackButton';

const TestTaking = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [test, setTest] = useState<{
    id: number;
    title: string;
    duration: number;
    totalMarks: number;
    questions: {
      id: number;
      text: string;
      marks: number;
      options?: string[];
    }[];
  } | null>(null);

  useEffect(() => {
    // Mock test data
    const mockTest = {
      id: 1,
      title: 'Biology Chapter 5: Photosynthesis',
      duration: 60,
      totalMarks: 50,
      questions: [
        { 
          id: 1, 
          text: 'What is the primary function of chlorophyll in photosynthesis?', 
          marks: 2,
          options: ['Absorbing light energy', 'Storing glucose', 'Producing oxygen', 'Breaking down water'] 
        },
        { 
          id: 2, 
          text: 'Explain the role of stomata in photosynthesis and gas exchange.', 
          marks: 4
        },
        { 
          id: 3, 
          text: 'Which of the following is NOT a product of photosynthesis?', 
          marks: 2,
          options: ['Glucose', 'Oxygen', 'Carbon dioxide', 'Water'] 
        },
        {
          id: 4,
          text: 'Describe the light-dependent reactions of photosynthesis.',
          marks: 6
        }
      ],
    };

    setTimeout(() => {
      setTest(mockTest);
      setTimeRemaining(mockTest.duration * 60);
    }, 500);
  }, [testId]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && test) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitTest();
    }
  }, [timeRemaining, test]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (test?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    console.log('Submitting test with answers:', answers);
    toast({
      title: "Test Submitted",
      description: "Your test has been submitted successfully.",
    });
    navigate('/student-test-bank');
  };

  const getProgressPercentage = () => {
    if (!test) return 0;
    return ((currentQuestionIndex + 1) / test.questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading test...</div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton to="/student-test-bank" label="Exit Test" className="text-gray-600 hover:text-gray-800" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{test.title}</h1>
                <p className="text-sm text-gray-500">Total Marks: {test.totalMarks}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeRemaining < 300 ? 'text-red-600' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                {getAnsweredCount()} of {test.questions.length} answered
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Question {currentQuestionIndex + 1} of {test.questions.length}</span>
              <span>{Math.round(getProgressPercentage())}% Complete</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {test.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`
                        h-10 w-10 rounded-lg border-2 text-sm font-medium transition-colors
                        ${currentQuestionIndex === index 
                          ? 'border-[#007AFF] bg-[#007AFF] text-white' 
                          : answers[index] 
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded border-2 border-[#007AFF] bg-[#007AFF]"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded border-2 border-green-500 bg-green-50"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded border-2 border-gray-300 bg-white"></div>
                    <span>Not answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
                  <Badge variant="secondary" className="px-3 py-1">
                    {currentQuestion.marks} marks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-800 text-lg leading-relaxed">{currentQuestion.text}</p>
                </div>

                {/* Answer Section */}
                <div className="space-y-4">
                  {currentQuestion.options ? (
                    // Multiple Choice
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-gray-700">Select your answer:</Label>
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                          <Checkbox
                            id={`question-${currentQuestion.id}-option-${index}`}
                            checked={answers[currentQuestionIndex] === option}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAnswerChange(currentQuestionIndex, option);
                              } else {
                                handleAnswerChange(currentQuestionIndex, '');
                              }
                            }}
                            className="h-5 w-5"
                          />
                          <Label 
                            htmlFor={`question-${currentQuestion.id}-option-${index}`} 
                            className="flex-1 text-base cursor-pointer"
                          >
                            <span className="font-medium text-gray-600 mr-2">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Written Answer
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-gray-700">Your answer:</Label>
                      <textarea
                        placeholder="Type your answer here..."
                        value={answers[currentQuestionIndex] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                        className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent resize-vertical"
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex items-center space-x-3">
                    {currentQuestionIndex === test.questions.length - 1 ? (
                      <Button 
                        onClick={handleSubmitTest}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Submit Test</span>
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        className="bg-[#007AFF] hover:bg-[#0056CC] text-white flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
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
