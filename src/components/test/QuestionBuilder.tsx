
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Image, 
  Eye, 
  FileText, 
  Calculator,
  CheckSquare,
  Move,
  Upload
} from 'lucide-react';

interface Question {
  id: string;
  type: 'main-statement' | 'child-statement' | 'diagram' | 'question';
  subType?: 'mcq' | 'short' | 'long' | 'numerical' | 'diagram' | 'equation';
  text: string;
  marks?: number;
  markingScheme?: string;
  markingSchemeImage?: string;
  includeAnswer: boolean;
  studentAnswer?: string;
  includeDiagram: boolean;
  diagram?: string;
  mcqOptions?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

interface QuestionBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ questions, onQuestionsChange }) => {
  const [previewMode, setPreviewMode] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
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
      ]
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
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
          // If setting isCorrect to true, set all others to false
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

  const getTotalMarks = () => {
    return questions
      .filter(q => q.type === 'question')
      .reduce((total, q) => total + (q.marks || 0), 0);
  };

  const getQuestionCount = () => {
    return questions.filter(q => q.type === 'question').length;
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
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4 flex-1">
                      <div className="flex-1">
                        <Label className="text-white mb-2 block">Statement Type</Label>
                        <Select 
                          value={question.type} 
                          onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                        >
                          <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2A2A2A] border-gray-600">
                            <SelectItem value="main-statement">Main Statement</SelectItem>
                            <SelectItem value="child-statement">Child Statement</SelectItem>
                            <SelectItem value="diagram">Diagram</SelectItem>
                            <SelectItem value="question">Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {question.type === 'question' && (
                        <div className="flex-1">
                          <Label className="text-white mb-2 block">Question Type</Label>
                          <Select 
                            value={question.subType || ''} 
                            onValueChange={(value) => updateQuestion(question.id, 'subType', value)}
                          >
                            <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2A2A2A] border-gray-600">
                              <SelectItem value="mcq">Multiple Choice</SelectItem>
                              <SelectItem value="short">Short Answer</SelectItem>
                              <SelectItem value="long">Long Answer</SelectItem>
                              <SelectItem value="numerical">Numerical</SelectItem>
                              <SelectItem value="diagram">Diagram</SelectItem>
                              <SelectItem value="equation">Equation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {question.type === 'question' && (
                        <div className="w-24">
                          <Label className="text-white mb-2 block">Marks</Label>
                          <Input
                            type="number"
                            value={question.marks || ''}
                            onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value) || 0)}
                            className="bg-[#2A2A2A] border-gray-600 text-white"
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Question Text */}
                  <div>
                    <Label className="text-white mb-2 block">
                      {question.type === 'question' ? 'Question Text' : 'Text Content'}
                    </Label>
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
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-xs">PNG, JPG, SVG up to 5MB</p>
                      </div>
                    </div>
                  )}

                  {/* MCQ Options */}
                  {question.type === 'question' && question.subType === 'mcq' && (
                    <div>
                      <Label className="text-white mb-2 block">Answer Options</Label>
                      <div className="space-y-3">
                        {question.mcqOptions?.map((option, optIndex) => (
                          <div key={option.id} className="flex items-start space-x-3">
                            <div className="flex items-center space-x-2 mt-2">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={option.isCorrect}
                                onChange={() => updateMCQOption(question.id, option.id, 'isCorrect', true)}
                                className="text-[#38B6FF]"
                              />
                              <Badge variant="secondary" className="text-xs">
                                {String.fromCharCode(65 + optIndex)}
                              </Badge>
                            </div>
                            <Textarea
                              value={option.text}
                              onChange={(e) => updateMCQOption(question.id, option.id, 'text', e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              className="flex-1 bg-[#2A2A2A] border-gray-600 text-white"
                              rows={2}
                            />
                            {question.mcqOptions && question.mcqOptions.length > 2 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMCQOption(question.id, option.id)}
                                className="text-red-400 hover:text-red-300 mt-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addMCQOption(question.id)}
                          className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  )}

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
        <Card className="bg-[#1E1E1E] border-gray-700 sticky top-4">
          <CardHeader>
            <CardTitle className="text-white text-lg">Test Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#38B6FF]">{getQuestionCount()}</div>
                <div className="text-xs text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#38B6FF]">{getTotalMarks()}</div>
                <div className="text-xs text-gray-400">Total Marks</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-[#38B6FF]">
                {Math.ceil(getTotalMarks() * 1.5)} min
              </div>
              <div className="text-xs text-gray-400">Estimated Time</div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-white font-medium mb-2">Quick Navigation</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#2A2A2A] cursor-pointer"
                  >
                    <span className="text-sm text-gray-300">
                      Q{index + 1}: {question.type}
                    </span>
                    {question.marks && (
                      <Badge variant="secondary" className="text-xs">
                        {question.marks}m
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionBuilder;
