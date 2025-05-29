import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Eye, 
  FileText, 
  Scan
} from 'lucide-react';
import { EnhancedQuestion } from '@/types/question';
import QuestionAssociationModal from './QuestionAssociationModal';
import ImageUpload from './ImageUpload';
import TeacherOCR from './TeacherOCR';
import QuestionHeader from './QuestionHeader';
import MCQOptionsEditor from './MCQOptionsEditor';
import QuestionSubparts from './QuestionSubparts';
import TestOverviewSidebar from './TestOverviewSidebar';

interface QuestionBuilderProps {
  questions: EnhancedQuestion[];
  onQuestionsChange: (questions: EnhancedQuestion[]) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ questions, onQuestionsChange }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [associationModalOpen, setAssociationModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [ocrTarget, setOcrTarget] = useState<{
    questionId: string;
    field: 'text' | 'option';
    optionId?: string;
  } | null>(null);

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

  const addMCQOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.mcqOptions) {
      const newOption = {
        id: Date.now().toString(),
        text: '',
        isCorrect: false
      };
      updateQuestion(questionId, 'mcqOptions', [...question.mcqOptions, newOption]);
    }
  };

  const updateMCQOption = (questionId: string, optionId: string, field: string, value: any) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.mcqOptions) {
      const updatedOptions = question.mcqOptions.map(opt => {
        if (opt.id === optionId) {
          if (field === 'isCorrect' && value === true) {
            question.mcqOptions?.forEach(o => o.isCorrect = false);
          }
          return { ...opt, [field]: value };
        }
        return opt;
      });
      updateQuestion(questionId, 'mcqOptions', updatedOptions);
    }
  };

  const removeMCQOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.mcqOptions) {
      const updatedOptions = question.mcqOptions.filter(opt => opt.id !== optionId);
      updateQuestion(questionId, 'mcqOptions', updatedOptions);
    }
  };

  const handleAssociationSave = (metadata: any) => {
    if (selectedQuestionId) {
      updateQuestion(selectedQuestionId, 'metadata', metadata);
    }
  };

  const openAssociationModal = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setAssociationModalOpen(true);
  };

  const handleOCRText = (text: string, insertMode: 'replace' | 'append' = 'replace') => {
    if (!ocrTarget) return;

    const { questionId, field, optionId } = ocrTarget;
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    if (field === 'text') {
      const newText = insertMode === 'append' ? `${question.text}\n${text}` : text;
      updateQuestion(questionId, 'text', newText);
    } else if (field === 'option' && optionId && question.mcqOptions) {
      const option = question.mcqOptions.find(opt => opt.id === optionId);
      if (option) {
        const newText = insertMode === 'append' ? `${option.text}\n${text}` : text;
        updateMCQOption(questionId, optionId, 'text', newText);
      }
    }
  };

  const openOCRModal = (questionId: string, field: 'text' | 'option', optionId?: string) => {
    setOcrTarget({ questionId, field, optionId });
    setOcrModalOpen(true);
  };

  const closeOCRModal = () => {
    setOcrModalOpen(false);
    setOcrTarget(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Question Builder */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Questions</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="border-gray-600 text-gray-300"
            >
              <Eye className="mr-2 h-4 w-4" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button 
              onClick={addQuestion}
              className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </div>

        {questions.length === 0 ? (
          <Card className="bg-[#1E1E1E] border-gray-700 border-dashed">
            <CardContent className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No questions yet</h3>
              <p className="text-gray-400 mb-4">Start building your test by adding questions</p>
              <Button 
                onClick={addQuestion}
                className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Question
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="bg-[#1E1E1E] border-gray-700">
                <CardHeader className="pb-4">
                  <QuestionHeader
                    question={question}
                    onUpdate={(field, value) => updateQuestion(question.id, field, value)}
                    onRemove={() => removeQuestion(question.id)}
                    onOpenAssociation={() => openAssociationModal(question.id)}
                  />
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Question Text */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-white">
                        {question.type === 'question' ? 'Question Text' : 'Text Content'}
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openOCRModal(question.id, 'text')}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                      >
                        <Scan className="h-4 w-4 mr-1" />
                        OCR
                      </Button>
                    </div>
                    <Textarea
                      value={question.text}
                      onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                      placeholder="Enter your question or statement here..."
                      className="bg-[#2A2A2A] border-gray-600 text-white min-h-[100px]"
                    />
                  </div>

                  {/* Diagram Upload for Diagram type */}
                  {question.type === 'diagram' && (
                    <div>
                      <Label className="text-white mb-2 block">Upload Diagram</Label>
                      <ImageUpload
                        onImageUpload={(imageData) => updateQuestion(question.id, 'diagram', imageData.url)}
                        currentImage={question.diagram ? { url: question.diagram, alt: 'Diagram' } : undefined}
                        onRemoveImage={() => updateQuestion(question.id, 'diagram', undefined)}
                      />
                    </div>
                  )}

                  {/* MCQ Options */}
                  <MCQOptionsEditor
                    question={question}
                    onUpdateOption={(optionId, field, value) => updateMCQOption(question.id, optionId, field, value)}
                    onAddOption={() => addMCQOption(question.id)}
                    onRemoveOption={(optionId) => removeMCQOption(question.id, optionId)}
                    onOpenOCR={(optionId) => openOCRModal(question.id, 'option', optionId)}
                  />

                  {/* Question Subparts */}
                  <QuestionSubparts
                    question={question}
                    onUpdateSubparts={(subparts) => updateQuestion(question.id, 'subparts', subparts)}
                  />

                  {/* Question-specific options */}
                  {question.type === 'question' && (
                    <>
                      {/* Marking Scheme */}
                      <div>
                        <Label className="text-white mb-2 block">Marking Scheme</Label>
                        <Textarea
                          value={question.markingScheme || ''}
                          onChange={(e) => updateQuestion(question.id, 'markingScheme', e.target.value)}
                          placeholder="Describe the marking criteria..."
                          className="bg-[#2A2A2A] border-gray-600 text-white"
                          rows={3}
                        />
                      </div>

                      {/* Include Answer Toggle */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-answer-${question.id}`}
                          checked={question.includeAnswer}
                          onCheckedChange={(checked) => updateQuestion(question.id, 'includeAnswer', checked)}
                        />
                        <Label htmlFor={`include-answer-${question.id}`} className="text-white">
                          Include student answer field
                        </Label>
                      </div>

                      {/* Student Answer */}
                      {question.includeAnswer && (
                        <div>
                          <Label className="text-white mb-2 block">Expected Student Answer</Label>
                          <Textarea
                            value={question.studentAnswer || ''}
                            onChange={(e) => updateQuestion(question.id, 'studentAnswer', e.target.value)}
                            placeholder="Expected answer for reference..."
                            className="bg-[#2A2A2A] border-gray-600 text-white"
                            rows={3}
                          />
                        </div>
                      )}

                      {/* Include Diagram */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`include-diagram-${question.id}`}
                          checked={question.includeDiagram}
                          onCheckedChange={(checked) => updateQuestion(question.id, 'includeDiagram', checked)}
                        />
                        <Label htmlFor={`include-diagram-${question.id}`} className="text-white">
                          Include diagram in question
                        </Label>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Live Preview Sidebar */}
      <div className="lg:col-span-1">
        <TestOverviewSidebar questions={questions} />
      </div>

      {/* Question Association Modal */}
      <QuestionAssociationModal
        isOpen={associationModalOpen}
        onClose={() => {
          setAssociationModalOpen(false);
          setSelectedQuestionId(null);
        }}
        onSave={handleAssociationSave}
        initialMetadata={selectedQuestionId ? questions.find(q => q.id === selectedQuestionId)?.metadata : undefined}
      />

      {/* OCR Modal */}
      {ocrModalOpen && ocrTarget && (
        <TeacherOCR
          onTextExtracted={handleOCRText}
          onClose={closeOCRModal}
          title={ocrTarget.field === 'text' ? "Extract Question Text" : "Extract Option Text"}
          placeholder={
            ocrTarget.field === 'text' 
              ? "Upload an image containing the question text..."
              : "Upload an image containing the answer option text..."
          }
        />
      )}
    </div>
  );
};

export default QuestionBuilder;
