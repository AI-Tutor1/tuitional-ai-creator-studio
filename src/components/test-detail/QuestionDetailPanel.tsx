
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DetailedQuestionResult } from '@/types/testDetail';

interface QuestionDetailPanelProps {
  question: DetailedQuestionResult;
  isSelected: boolean;
}

const QuestionDetailPanel: React.FC<QuestionDetailPanelProps> = ({ question, isSelected }) => {
  const formatTime = (seconds: number): string => {
    if (seconds === 0) return 'Not answered';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getAnswerStatus = () => {
    if (question.userAnswer === '') return { icon: '●', color: 'text-gray-500', status: 'Skipped' };
    return question.isCorrect 
      ? { icon: '✓', color: 'text-green-500', status: 'Correct' }
      : { icon: '✗', color: 'text-red-500', status: 'Incorrect' };
  };

  const answerStatus = getAnswerStatus();

  return (
    <Card 
      id={`question-${question.questionId}`}
      className={`bg-[#1F1F23] border-gray-700 transition-all ${
        isSelected ? 'ring-2 ring-[#38B6FF] shadow-lg' : 'hover:border-[#38B6FF]'
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              Q{question.questionNumber}. {question.questionText}
            </h3>
            <div className="text-sm text-gray-400">
              Time Taken: {formatTime(question.timeTakenSeconds)}
            </div>
          </div>
          <div className="flex items-center ml-4">
            <span className={`text-2xl ${answerStatus.color} mr-2`}>
              {answerStatus.icon}
            </span>
            <span className={`text-sm font-medium ${answerStatus.color}`}>
              {answerStatus.status}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Answer Choices for Multiple Choice */}
        {question.type === 'multiple_choice' && question.choices && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Answer Choices:</h4>
            {question.choices.map((choice) => {
              const isUserAnswer = choice.optionLabel === question.userAnswer;
              const isCorrectAnswer = choice.optionLabel === question.correctAnswer;
              const isIncorrectUserAnswer = isUserAnswer && !question.isCorrect;
              
              return (
                <div
                  key={choice.optionLabel}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isCorrectAnswer
                      ? 'border-green-500 bg-green-500 bg-opacity-10'
                      : isIncorrectUserAnswer
                      ? 'border-red-500 bg-red-500 bg-opacity-10'
                      : 'border-gray-600 bg-[#2A2A2F]'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        isUserAnswer
                          ? isCorrectAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : isCorrectAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-400'
                      }`}
                    />
                    <span className={`${
                      isCorrectAnswer ? 'text-green-400' : 
                      isIncorrectUserAnswer ? 'text-red-400' : 'text-gray-300'
                    }`}>
                      {choice.optionLabel}. {choice.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Short Answer or Numeric Response */}
        {(question.type === 'short_answer' || question.type === 'numeric') && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Your Answer:</h4>
              <div className={`p-3 rounded-lg border ${
                question.userAnswer === '' 
                  ? 'border-gray-600 bg-[#2A2A2F] text-gray-500'
                  : question.isCorrect
                  ? 'border-green-500 bg-green-500 bg-opacity-10 text-green-400'
                  : 'border-red-500 bg-red-500 bg-opacity-10 text-red-400'
              }`}>
                {question.userAnswer || 'No answer provided'}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Expected Answer:</h4>
              <div className="p-3 rounded-lg border border-gray-600 bg-[#2A2A2F] text-gray-300">
                {question.correctAnswer}
              </div>
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className="flex items-center justify-between p-3 bg-[#2A2A2F] rounded-lg">
          <span className="text-gray-300">Points:</span>
          <span className="text-white font-medium">
            {question.points} / {question.maxPoints}
          </span>
        </div>

        {/* Instructor Feedback */}
        {question.instructorFeedback && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Instructor Feedback:</h4>
            <div className="p-3 bg-[#2A2A2F] border border-gray-600 rounded-lg">
              <p className="text-gray-300 text-sm">{question.instructorFeedback}</p>
            </div>
          </div>
        )}

        {/* Rubric Tags */}
        {question.rubricTags && question.rubricTags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {question.rubricTags.map((tag, index) => (
                <Badge key={index} className="bg-yellow-600 text-black text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionDetailPanel;
