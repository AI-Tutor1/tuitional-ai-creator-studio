import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Save, 
  FileText,
  Clock,
  Target,
  BookOpen,
  Scan
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TeacherOCR from './TeacherOCR';

interface Question {
  id: string;
  type: 'mcq' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  marks: number;
}

interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  version: number;
  originalTestId?: string;
}

interface TestEditModalProps {
  test: Test;
  onClose: () => void;
  onSave: (editedTest: Test) => void;
}

const TestEditModal: React.FC<TestEditModalProps> = ({ test, onClose, onSave }) => {
  const { toast } = useToast();
  const [editedTest, setEditedTest] = useState<Test>({
    ...test,
    version: test.version + 1,
    originalTestId: test.originalTestId || test.id,
    id: `${test.id}_v${test.version + 1}` // Create new version ID
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [ocrTarget, setOcrTarget] = useState<{
    questionId: string;
    field: 'question' | 'option';
    optionIndex?: number;
  } | null>(null);

  const updateTestField = (field: keyof Test, value: any) => {
    setEditedTest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateQuestion = (questionId: string, updatedQuestion: Partial<Question>) => {
    setEditedTest(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updatedQuestion } : q
      )
    }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type: 'mcq',
      question: 'New question',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      marks: 1
    };

    setEditedTest(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      totalMarks: prev.totalMarks + newQuestion.marks
    }));

    setEditingQuestionId(newQuestion.id);
  };

  const deleteQuestion = (questionId: string) => {
    const questionToDelete = editedTest.questions.find(q => q.id === questionId);
    if (!questionToDelete) return;

    setEditedTest(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
      totalMarks: prev.totalMarks - questionToDelete.marks
    }));

    toast({
      title: "Question Deleted",
      description: "The question has been removed from the test.",
    });
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = editedTest.questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return;

    const duplicatedQuestion: Question = {
      ...questionToDuplicate,
      id: `q_${Date.now()}`,
      question: `${questionToDuplicate.question} (Copy)`
    };

    setEditedTest(prev => ({
      ...prev,
      questions: [...prev.questions, duplicatedQuestion],
      totalMarks: prev.totalMarks + duplicatedQuestion.marks
    }));

    toast({
      title: "Question Duplicated",
      description: "A copy of the question has been added to the test.",
    });
  };

  const handleOCRText = (text: string, insertMode: 'replace' | 'append' = 'replace') => {
    if (!ocrTarget) return;

    const { questionId, field, optionIndex } = ocrTarget;
    const question = editedTest.questions.find(q => q.id === questionId);
    if (!question) return;

    if (field === 'question') {
      const newText = insertMode === 'append' ? `${question.question}\n${text}` : text;
      updateQuestion(questionId, { question: newText });
    } else if (field === 'option' && optionIndex !== undefined && question.options) {
      const newOptions = [...question.options];
      const currentText = newOptions[optionIndex] || '';
      newOptions[optionIndex] = insertMode === 'append' ? `${currentText}\n${text}` : text;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const openOCRModal = (questionId: string, field: 'question' | 'option', optionIndex?: number) => {
    setOcrTarget({ questionId, field, optionIndex });
    setOcrModalOpen(true);
  };

  const closeOCRModal = () => {
    setOcrModalOpen(false);
    setOcrTarget(null);
  };

  const handleSave = () => {
    if (!editedTest.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a test title.",
        variant: "destructive"
      });
      return;
    }

    if (editedTest.questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question to the test.",
        variant: "destructive"
      });
      return;
    }

    onSave(editedTest);
    toast({
      title: "Test Saved",
      description: `Test version ${editedTest.version} has been created successfully.`,
    });
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'short-answer': return <Edit className="h-4 w-4 text-green-500" />;
      case 'essay': return <BookOpen className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-[#2A2A2A] border-gray-700 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
          <div>
            <CardTitle className="text-white text-xl">Edit Test</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className="border-[#38B6FF] text-[#38B6FF]">
                Version {editedTest.version}
              </Badge>
              {editedTest.originalTestId && (
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Based on: {editedTest.originalTestId}
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Test Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Test Title</Label>
                <Input
                  value={editedTest.title}
                  onChange={(e) => updateTestField('title', e.target.value)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Subject</Label>
                <Input
                  value={editedTest.subject}
                  onChange={(e) => updateTestField('subject', e.target.value)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Duration (minutes)</Label>
                <Input
                  type="number"
                  value={editedTest.duration}
                  onChange={(e) => updateTestField('duration', parseInt(e.target.value) || 0)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Total Marks</Label>
                <Input
                  type="number"
                  value={editedTest.totalMarks}
                  onChange={(e) => updateTestField('totalMarks', parseInt(e.target.value) || 0)}
                  className="bg-[#1E1E1E] border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={editedTest.description}
                onChange={(e) => updateTestField('description', e.target.value)}
                className="bg-[#1E1E1E] border-gray-600 text-white"
                rows={3}
              />
            </div>

            <Separator className="bg-gray-600" />

            {/* Questions Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Questions ({editedTest.questions.length})</h3>
                <Button
                  onClick={addQuestion}
                  className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-3">
                {editedTest.questions.map((question, index) => (
                  <Card key={question.id} className="bg-[#1E1E1E] border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getQuestionTypeIcon(question.type)}
                          <span className="text-white font-medium">Question {index + 1}</span>
                          <Badge variant="outline" className="border-gray-500 text-gray-300 text-xs">
                            {question.marks} marks
                          </Badge>
                          <Badge variant="outline" className="border-gray-500 text-gray-300 text-xs capitalize">
                            {question.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingQuestionId(
                              editingQuestionId === question.id ? null : question.id
                            )}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateQuestion(question.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {editingQuestionId === question.id ? (
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label className="text-white text-sm">Question Text</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openOCRModal(question.id, 'question')}
                                className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white text-xs px-2 py-1"
                              >
                                <Scan className="h-3 w-3 mr-1" />
                                OCR
                              </Button>
                            </div>
                            <Textarea
                              value={question.question}
                              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                              className="bg-[#2A2A2A] border-gray-600 text-white"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="number"
                              value={question.marks}
                              onChange={(e) => updateQuestion(question.id, { marks: parseInt(e.target.value) || 1 })}
                              className="bg-[#2A2A2A] border-gray-600 text-white"
                              placeholder="Marks"
                            />
                            <select
                              value={question.type}
                              onChange={(e) => updateQuestion(question.id, { type: e.target.value as any })}
                              className="bg-[#2A2A2A] border border-gray-600 text-white rounded px-3 py-2"
                            >
                              <option value="mcq">Multiple Choice</option>
                              <option value="short-answer">Short Answer</option>
                              <option value="essay">Essay</option>
                            </select>
                          </div>
                          {question.type === 'mcq' && (
                            <div className="space-y-2">
                              <Label className="text-white text-sm">Options</Label>
                              {question.options?.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])];
                                      newOptions[optIndex] = e.target.value;
                                      updateQuestion(question.id, { options: newOptions });
                                    }}
                                    className="flex-1 bg-[#2A2A2A] border-gray-600 text-white"
                                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openOCRModal(question.id, 'option', optIndex)}
                                    className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white text-xs px-2 py-1"
                                  >
                                    <Scan className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-300 text-sm">
                          {question.question}
                          {question.type === 'mcq' && question.options && (
                            <div className="mt-2 ml-4">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="text-gray-400 text-xs">
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <div className="border-t border-gray-700 p-4 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Version {editedTest.version}
          </Button>
        </div>
      </Card>

      {/* OCR Modal */}
      {ocrModalOpen && ocrTarget && (
        <TeacherOCR
          onTextExtracted={handleOCRText}
          onClose={closeOCRModal}
          title={ocrTarget.field === 'question' ? "Extract Question Text" : "Extract Option Text"}
          placeholder={
            ocrTarget.field === 'question' 
              ? "Upload an image containing the question text..."
              : "Upload an image containing the answer option text..."
          }
        />
      )}
    </div>
  );
};

export default TestEditModal;
