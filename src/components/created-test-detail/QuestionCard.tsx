
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { GripVertical, ChevronDown, ChevronRight, Trash2, Save, X } from 'lucide-react';
import { CreatedTestQuestion } from '@/types/createdTestDetail';

interface QuestionCardProps {
  question: CreatedTestQuestion;
  isSelected: boolean;
  onSelect: (questionId: string, selected: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getTypeBadgeStyle = (type: string): string => {
    switch (type) {
      case 'mcq': return 'bg-[#3399FF] text-white';
      case 'short_answer': return 'bg-yellow-600 text-black';
      case 'numeric': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'mcq': return 'MCQ';
      case 'short_answer': return 'Short Answer';
      case 'numeric': return 'Numeric';
      default: return type;
    }
  };

  const handleSave = () => {
    console.log('Saving question changes');
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleDelete = () => {
    console.log('Deleting question');
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          {/* Left side - Drag handle and checkbox */}
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(question.questionId, !!checked)}
            />
            <GripVertical className="h-5 w-5 text-gray-500 cursor-grab" />
          </div>

          {/* Question content */}
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-semibold">Q{question.questionNumber}</span>
                <span className="text-gray-300">{question.text}</span>
                {question.required && (
                  <span className="text-red-400 text-xs">*</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className={`${getTypeBadgeStyle(question.type)} text-xs font-bold uppercase`}>
                {getTypeLabel(question.type)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="border-t border-gray-700 pt-6">
          <div className="space-y-6">
            {/* Full Question Text */}
            <div>
              <h4 className="font-semibold text-white mb-2">Question:</h4>
              {isEditing ? (
                <Textarea
                  defaultValue={question.text}
                  className="bg-[#2A2A2F] border-gray-600 text-white"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300">{question.text}</p>
              )}
            </div>

            {/* Answer Configuration */}
            {question.type === 'mcq' && question.choices && (
              <div>
                <h4 className="font-semibold text-white mb-3">Answer Choices:</h4>
                <div className="space-y-3">
                  {question.choices.map((choice, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        choice.isCorrect
                          ? 'border-green-500 bg-green-500 bg-opacity-10'
                          : 'border-gray-600 bg-[#2A2A2F]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            choice.isCorrect
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-400'
                          }`}
                        />
                        {isEditing ? (
                          <Input
                            defaultValue={choice.text}
                            className="bg-transparent border-none text-gray-300 p-0"
                          />
                        ) : (
                          <span className="text-gray-300">
                            {choice.label}. {choice.text}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {question.type === 'short_answer' && (
              <div>
                <h4 className="font-semibold text-white mb-2">Expected Answer:</h4>
                {isEditing ? (
                  <Textarea
                    placeholder="Enter expected answer..."
                    className="bg-[#2A2A2F] border-gray-600 text-white"
                    rows={3}
                  />
                ) : (
                  <div className="p-3 bg-[#2A2A2F] border border-gray-600 rounded-lg">
                    <p className="text-gray-300">Sample acceptable answer</p>
                  </div>
                )}
                <div className="mt-2">
                  <label className="flex items-center gap-2 text-gray-300">
                    <Checkbox defaultChecked={!question.exactMatchRequired} />
                    <span className="text-sm">Exact match required</span>
                  </label>
                </div>
              </div>
            )}

            {question.type === 'numeric' && question.numericAnswer && (
              <div>
                <h4 className="font-semibold text-white mb-2">Numeric Answer:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Correct Value</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        defaultValue={question.numericAnswer.value}
                        className="bg-[#2A2A2F] border-gray-600 text-white mt-1"
                      />
                    ) : (
                      <div className="p-2 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                        {question.numericAnswer.value}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Tolerance (%)</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        defaultValue={question.numericAnswer.tolerancePct}
                        className="bg-[#2A2A2F] border-gray-600 text-white mt-1"
                      />
                    ) : (
                      <div className="p-2 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                        {question.numericAnswer.tolerancePct}%
                      </div>
                    )}
                  </div>
                </div>
                {question.numericAnswer.unitLabel && (
                  <div className="mt-2">
                    <label className="text-sm text-gray-400">Unit</label>
                    <div className="p-2 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                      {question.numericAnswer.unitLabel}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Points & Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Points</label>
                {isEditing ? (
                  <Input
                    type="number"
                    defaultValue={question.points}
                    className="bg-[#2A2A2F] border-gray-600 text-white mt-1"
                    min="0"
                  />
                ) : (
                  <div className="p-2 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                    {question.points}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white">Section</label>
                <div className="p-2 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                  {question.section || 'No section'}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Feedback</label>
              {isEditing ? (
                <Textarea
                  defaultValue={question.feedback}
                  placeholder="Feedback for this question..."
                  className="bg-[#2A2A2F] border-gray-600 text-white mt-1"
                  rows={2}
                />
              ) : (
                <div className="p-3 bg-[#2A2A2F] border border-gray-600 rounded text-gray-300 mt-1">
                  {question.feedback || 'No feedback provided'}
                </div>
              )}
            </div>

            {/* Question Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              {isEditing ? (
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-[#3399FF] hover:bg-[#2A85E8] text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-gray-600 text-gray-300">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-[#2A2A2F]"
                >
                  Edit Question
                </Button>
              )}

              <Button
                onClick={handleDelete}
                variant="ghost"
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuestionCard;
