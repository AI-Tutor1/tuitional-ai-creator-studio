
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EnhancedQuestion } from '@/types/question';
import QuestionHeader from './QuestionHeader';
import EnhancedQuestionForm from './EnhancedQuestionForm';
import QuestionActions from './QuestionActions';

interface QuestionCardProps {
  question: EnhancedQuestion;
  previewMode: boolean;
  isSelected: boolean;
  onUpdate: (id: string, field: keyof EnhancedQuestion, value: any) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string | null) => void;
  onDuplicate?: (id: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  previewMode,
  isSelected,
  onUpdate,
  onRemove,
  onSelect,
  onDuplicate
}) => {
  const handlePreview = (id: string) => {
    onSelect(id);
  };

  return (
    <Card className={`bg-[#1E1E1E] border-gray-700 ${isSelected ? 'ring-2 ring-[#38B6FF]' : ''}`}>
      <CardHeader className="pb-4">
        <QuestionHeader
          question={question}
          onUpdate={(field, value) => onUpdate(question.id, field, value)}
          onRemove={() => onRemove(question.id)}
          onOpenAssociation={() => onSelect(question.id)}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {!previewMode ? (
          <EnhancedQuestionForm
            question={question}
            onUpdate={(field, value) => onUpdate(question.id, field, value)}
          />
        ) : (
          <div className="text-gray-300">
            <p className="mb-4">{question.text || 'Question text not set'}</p>
            {question.mcqOptions && question.mcqOptions.length > 0 && (
              <div className="space-y-2">
                {question.mcqOptions.map((option, index) => (
                  <div 
                    key={option.id} 
                    className={`p-2 rounded ${option.isCorrect ? 'bg-green-600/20 border border-green-500' : 'bg-gray-700'}`}
                  >
                    {String.fromCharCode(65 + index)}. {option.text}
                    {option.isCorrect && <span className="ml-2 text-green-400">✓ Correct</span>}
                  </div>
                ))}
              </div>
            )}
            {question.markingScheme && (
              <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Marking Scheme:</h4>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{question.markingScheme}</p>
              </div>
            )}
          </div>
        )}

        <QuestionActions
          question={question}
          onUpdate={(field, value) => onUpdate(question.id, field, value)}
          onDuplicate={onDuplicate}
          onPreview={handlePreview}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
