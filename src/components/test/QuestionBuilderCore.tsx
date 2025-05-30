
import React, { useState } from 'react';
import { EnhancedQuestion } from '@/types/question';
import QuestionToolbar from './QuestionToolbar';
import QuestionCard from './QuestionCard';
import TestOverviewSidebar from './TestOverviewSidebar';
import EmptyState from '../shared/EmptyState';

interface QuestionBuilderCoreProps {
  questions: EnhancedQuestion[];
  onQuestionsChange: (questions: EnhancedQuestion[]) => void;
}

const QuestionBuilderCore: React.FC<QuestionBuilderCoreProps> = ({ 
  questions, 
  onQuestionsChange 
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const addQuestion = () => {
    const questionCount = questions.filter(q => q.type === 'question').length;
    const newQuestion: EnhancedQuestion = {
      id: Date.now().toString(),
      questionNumber: questionCount + 1,
      type: 'question',
      subType: 'mcq',
      text: '',
      marks: 1,
      includeAnswer: false,
      includeDiagram: false,
      mcqOptions: [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
        { id: '4', text: '', isCorrect: false }
      ],
      createdAt: new Date().toISOString(),
      version: 1
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof EnhancedQuestion, value: any) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, [field]: value, updatedAt: new Date().toISOString() } : q
    );
    onQuestionsChange(updatedQuestions);
  };

  const removeQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <QuestionToolbar
          onAddQuestion={addQuestion}
          previewMode={previewMode}
          onTogglePreview={() => setPreviewMode(!previewMode)}
          questionCount={questions.length}
        />

        {questions.length === 0 ? (
          <EmptyState
            title="No questions yet"
            description="Start building your test by adding questions"
            actionLabel="Add First Question"
            onAction={addQuestion}
          />
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                previewMode={previewMode}
                isSelected={selectedQuestionId === question.id}
                onUpdate={updateQuestion}
                onRemove={removeQuestion}
                onSelect={setSelectedQuestionId}
              />
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <TestOverviewSidebar questions={questions} />
      </div>
    </div>
  );
};

export default QuestionBuilderCore;
