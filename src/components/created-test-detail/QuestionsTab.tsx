
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, MoreHorizontal, Eye } from 'lucide-react';
import { CreatedTestDetailData } from '@/types/createdTestDetail';
import QuestionCard from './QuestionCard';

interface QuestionsTabProps {
  testData: CreatedTestDetailData;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ testData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());

  const handleAddQuestion = () => {
    console.log('Opening add question modal');
    // Implementation for add question modal
  };

  const handleBulkActions = () => {
    console.log('Opening bulk actions menu');
    // Implementation for bulk actions
  };

  const handlePreview = () => {
    console.log('Opening preview modal');
    // Implementation for preview modal
  };

  const handlePublishToggle = () => {
    console.log('Toggling publish status');
    // Implementation for publish/unpublish
  };

  const filteredQuestions = testData.questions.filter(question =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-32">
      {/* Questions Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handleAddQuestion}
          className="bg-[#00C851] hover:bg-[#00A83F] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2A2A2F] border-gray-600 text-gray-300"
            />
          </div>
        </div>

        <Button
          onClick={handleBulkActions}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-[#2A2A2F]"
          disabled={selectedQuestions.size === 0}
        >
          <MoreHorizontal className="mr-2 h-4 w-4" />
          Bulk Actions
        </Button>
      </div>

      {/* Question List */}
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.questionId}
              question={question}
              isSelected={selectedQuestions.has(question.questionId)}
              onSelect={(questionId, selected) => {
                const newSelected = new Set(selectedQuestions);
                if (selected) {
                  newSelected.add(questionId);
                } else {
                  newSelected.delete(questionId);
                }
                setSelectedQuestions(newSelected);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-500">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm-3 4a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No questions added yet.</h3>
          <p className="text-gray-400 mb-6">Click "Add Question" to start building your test.</p>
          <Button
            onClick={handleAddQuestion}
            className="bg-[#00C851] hover:bg-[#00A83F] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      )}

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {/* Preview Button */}
        <Button
          onClick={handlePreview}
          size="icon"
          className="w-14 h-14 rounded-full bg-[#3399FF] hover:bg-[#2A85E8] text-white shadow-lg"
        >
          <Eye className="h-6 w-6" />
        </Button>

        {/* Publish Button */}
        <Button
          onClick={handlePublishToggle}
          className={`${
            testData.status === 'published' 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white px-6 py-3 text-lg font-semibold`}
        >
          {testData.status === 'published' ? 'Unpublish Test' : 'Publish Test'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionsTab;
