
import React, { useState } from 'react';
import { TestDetailData } from '@/types/testDetail';
import QuestionNavigationPane from './QuestionNavigationPane';
import QuestionDetailPanel from './QuestionDetailPanel';
import ReviewTabFooter from './ReviewTabFooter';

interface ReviewTabProps {
  testData: TestDetailData;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ testData }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(testData.questions[0]?.questionId || '');
  const [showNavPane, setShowNavPane] = useState(false);

  const scrollToQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close nav pane on mobile after selection
    setShowNavPane(false);
  };

  return (
    <div className="flex gap-6 relative">
      {/* Navigation Pane - Desktop */}
      <div className="hidden lg:block">
        <QuestionNavigationPane
          questions={testData.questions}
          selectedQuestionId={selectedQuestionId}
          onQuestionSelect={scrollToQuestion}
          isCollapsed={false}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setShowNavPane(!showNavPane)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#38B6FF] text-white p-3 rounded-full shadow-lg"
        aria-label="Toggle Questions Navigation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Drawer */}
      {showNavPane && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowNavPane(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#2A2A2F] shadow-xl">
            <div className="p-4">
              <button
                onClick={() => setShowNavPane(false)}
                className="float-right text-white hover:text-[#38B6FF]"
              >
                ✕
              </button>
            </div>
            <QuestionNavigationPane
              questions={testData.questions}
              selectedQuestionId={selectedQuestionId}
              onQuestionSelect={scrollToQuestion}
              isCollapsed={false}
            />
          </div>
        </div>
      )}

      {/* Question Content */}
      <div className="flex-1 space-y-4 pb-20">
        {testData.questions.map((question) => (
          <QuestionDetailPanel
            key={question.questionId}
            question={question}
            isSelected={question.questionId === selectedQuestionId}
          />
        ))}
      </div>

      {/* Footer Actions */}
      <ReviewTabFooter testData={testData} />
    </div>
  );
};

export default ReviewTab;
