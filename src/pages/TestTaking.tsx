import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast"
import BackButton from '@/components/shared/BackButton';

const TestTaking = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [test, setTest] = useState<{
    id: number;
    title: string;
    questions: {
      id: number;
      text: string;
      options?: string[];
    }[];
  } | null>(null);

  useEffect(() => {
    // Mock test data
    const mockTest = {
      id: 1,
      title: 'Sample Test',
      questions: [
        { id: 1, text: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Rome'] },
        { id: 2, text: 'What is 2 + 2?' },
        { id: 3, text: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars', 'Venus'] },
      ],
    };

    // Simulate fetching test data
    setTimeout(() => {
      setTest(mockTest);
    }, 500);
  }, [testId]);

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
    // Process and submit answers
    console.log('Answers:', answers);
    toast({
      title: "Test Submitted",
      description: "Your test has been submitted successfully.",
    })
    navigate('/student-test-bank'); // Redirect to test results page
  };

  if (!test) {
    return <div>Loading test...</div>;
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <BackButton to="/student-test-bank" label="Back to Tests" />
        
        {/* Test Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{test.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Question {currentQuestionIndex + 1} of {test.questions.length}</p>
          </CardContent>
        </div>

        {/* Question Display */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{currentQuestion.text}</p>
            {currentQuestion.options ? (
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
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
                    />
                    <Label htmlFor={`question-${currentQuestion.id}-option-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            ) : (
              <Input
                type="text"
                placeholder="Your answer"
                value={answers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
              />
            )}
          </CardContent>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex === test.questions.length - 1 ? (
              <Button onClick={handleSubmitTest}>Submit Test</Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaking;
