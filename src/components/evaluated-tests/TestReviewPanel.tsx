
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  X, 
  Download, 
  MessageCircleQuestion,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Circle
} from 'lucide-react';
import { EvaluatedTest, QuestionResult } from '@/types/evaluatedTest';

interface TestReviewPanelProps {
  test: EvaluatedTest;
  onClose: () => void;
  onDownload: (test: EvaluatedTest) => void;
  onRequestRegrade: (test: EvaluatedTest) => void;
}

const TestReviewPanel: React.FC<TestReviewPanelProps> = ({ 
  test, 
  onClose, 
  onDownload, 
  onRequestRegrade 
}) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getQuestionIcon = (question: QuestionResult) => {
    if (question.wasSkipped) {
      return <Circle className="h-5 w-5 text-gray-400" />;
    }
    if (question.isCorrect) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1F1F23] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{test.title}</h2>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>Score: {test.scorePercentage}% ({test.correctCount}/{test.totalQuestions})</span>
              <span>•</span>
              <span>{test.course}</span>
              <span>•</span>
              <span>{test.instructorName}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* General Feedback */}
          {test.generalFeedback && (
            <Card className="bg-[#2A2A2A] border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Instructor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{test.generalFeedback}</p>
              </CardContent>
            </Card>
          )}

          {/* Questions List */}
          <div className="space-y-3">
            {test.questionResults.length > 0 ? (
              test.questionResults.map((question) => (
                <Card key={question.questionId} className="bg-[#24242A] border-gray-700">
                  <CardHeader
                    className="cursor-pointer hover:bg-[#2A2A2F] transition-colors"
                    onClick={() => toggleQuestion(question.questionId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getQuestionIcon(question)}
                        <span className="text-white font-medium">
                          Q{question.questionNumber}: {question.questionTextPreview}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-gray-300">
                          {question.points}/{question.maxPoints} pts
                        </Badge>
                        {expandedQuestions.has(question.questionId) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedQuestions.has(question.questionId) && (
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Full Question Text */}
                        <div>
                          <h4 className="font-medium text-white mb-2">Question:</h4>
                          <p className="text-gray-300">{question.fullQuestionText}</p>
                        </div>

                        {/* Answer Choices */}
                        {question.answerChoices && (
                          <div>
                            <h4 className="font-medium text-white mb-2">Answer Choices:</h4>
                            <div className="space-y-2">
                              {question.answerChoices.map((choice) => (
                                <div
                                  key={choice.id}
                                  className={`p-3 rounded-lg border ${
                                    choice.id === question.userAnswer && choice.isCorrect
                                      ? 'bg-green-900 border-green-600'
                                      : choice.id === question.userAnswer && !choice.isCorrect
                                      ? 'bg-red-900 border-red-600'
                                      : choice.isCorrect
                                      ? 'bg-green-900 border-green-600'
                                      : 'bg-[#2A2A2F] border-gray-600'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-300">
                                      <strong>{choice.id}.</strong> {choice.text}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      {choice.id === question.userAnswer && (
                                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                                          Your Answer
                                        </Badge>
                                      )}
                                      {choice.isCorrect && (
                                        <Badge className="bg-green-600 text-white">
                                          Correct
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Instructor Feedback */}
                        {question.instructorFeedback && (
                          <div>
                            <h4 className="font-medium text-white mb-2">Instructor Feedback:</h4>
                            <div className="bg-[#2A2A2F] border border-gray-600 rounded-lg p-3">
                              <p className="text-gray-300 italic">{question.instructorFeedback}</p>
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {question.tags && question.tags.length > 0 && (
                          <div>
                            <h4 className="font-medium text-white mb-2">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                              {question.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <Card className="bg-[#2A2A2A] border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No detailed question breakdown available for this test.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Close
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onDownload(test)}
              className="border-gray-600 text-gray-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full Review (PDF)
            </Button>
            
            {test.canRequestRegrade && !test.regradeRequested && (
              <Button
                onClick={() => onRequestRegrade(test)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <MessageCircleQuestion className="mr-2 h-4 w-4" />
                Request Re-Grade
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReviewPanel;
