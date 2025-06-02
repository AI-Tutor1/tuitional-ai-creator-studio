
import React from 'react';
import { DetailedQuestionResult } from '@/types/testDetail';

interface QuestionNavigationPaneProps {
  questions: DetailedQuestionResult[];
  selectedQuestionId: string;
  onQuestionSelect: (questionId: string) => void;
  isCollapsed: boolean;
}

const QuestionNavigationPane: React.FC<QuestionNavigationPaneProps> = ({
  questions,
  selectedQuestionId,
  onQuestionSelect,
}) => {
  const getQuestionStatusColor = (question: DetailedQuestionResult): string => {
    if (question.userAnswer === '') return 'bg-gray-600'; // Skipped
    return question.isCorrect ? 'bg-green-600' : 'bg-red-600';
  };

  return (
    <div className="w-60 bg-[#2A2A2F] rounded-lg p-4 sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Questions</h3>
      
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question.questionId}
            onClick={() => onQuestionSelect(question.questionId)}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              selectedQuestionId === question.questionId
                ? 'bg-[#38B6FF] text-white'
                : 'bg-[#1F1F23] text-gray-300 hover:bg-[#3B3B42]'
            }`}
            aria-label={`Go to question ${question.questionNumber} (${question.isCorrect ? 'Correct' : question.userAnswer === '' ? 'Skipped' : 'Incorrect'})`}
          >
            <div
              className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${getQuestionStatusColor(question)}`}
            />
            <span className="font-medium">Q{question.questionNumber}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigationPane;
