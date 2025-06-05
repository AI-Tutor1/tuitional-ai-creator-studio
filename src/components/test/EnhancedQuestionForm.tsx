import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Scan, 
  Calculator, 
  Type, 
  Plus, 
  Trash2, 
  Link,
  Image,
  FileText
} from 'lucide-react';
import { EnhancedQuestion, QuestionAttachment } from '@/types/question';
import MathTextEditor from './MathTextEditor';
import TeacherOCR from './TeacherOCR';
import CalculatorComponent from './Calculator';
import ImageUpload from './ImageUpload';
import FileAttachment from './FileAttachment';
import MatchingQuestionForm from './MatchingQuestionForm';

interface EnhancedQuestionFormProps {
  question: EnhancedQuestion;
  onUpdate: (field: keyof EnhancedQuestion, value: any) => void;
}

const EnhancedQuestionForm: React.FC<EnhancedQuestionFormProps> = ({ question, onUpdate }) => {
  const [showMathEditor, setShowMathEditor] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showFileAttachment, setShowFileAttachment] = useState(false);
  const [ocrTarget, setOcrTarget] = useState<{ field: string; optionIndex?: number; matchingIndex?: number; matchingSide?: 'left' | 'right' } | null>(null);

  const handleOCRText = (text: string, insertMode: 'replace' | 'append' = 'append') => {
    if (!ocrTarget) return;

    if (ocrTarget.field === 'question') {
      const newText = insertMode === 'replace' ? text : `${question.text || ''}\n${text}`;
      onUpdate('text', newText);
    } else if (ocrTarget.field === 'markingScheme') {
      const newText = insertMode === 'replace' ? text : `${question.markingScheme || ''}\n${text}`;
      onUpdate('markingScheme', newText);
    } else if (ocrTarget.field === 'option' && ocrTarget.optionIndex !== undefined && question.mcqOptions) {
      const newOptions = [...question.mcqOptions];
      const currentText = newOptions[ocrTarget.optionIndex].text || '';
      newOptions[ocrTarget.optionIndex] = {
        ...newOptions[ocrTarget.optionIndex],
        text: insertMode === 'replace' ? text : `${currentText}\n${text}`
      };
      onUpdate('mcqOptions', newOptions);
    } else if (ocrTarget.field === 'matching' && ocrTarget.matchingIndex !== undefined && question.matchingPairs) {
      const newPairs = [...question.matchingPairs];
      const field = ocrTarget.matchingSide === 'left' ? 'leftItem' : 'rightItem';
      const currentText = newPairs[ocrTarget.matchingIndex][field] || '';
      newPairs[ocrTarget.matchingIndex] = {
        ...newPairs[ocrTarget.matchingIndex],
        [field]: insertMode === 'replace' ? text : `${currentText}\n${text}`
      };
      onUpdate('matchingPairs', newPairs);
    }
  };

  const openOCR = (field: string, optionIndex?: number, matchingIndex?: number, matchingSide?: 'left' | 'right') => {
    setOcrTarget({ field, optionIndex, matchingIndex, matchingSide });
    setShowOCR(true);
  };

  const addMCQOption = () => {
    const currentOptions = question.mcqOptions || [];
    const newOption = {
      id: `option_${Date.now()}`,
      text: '',
      isCorrect: false
    };
    onUpdate('mcqOptions', [...currentOptions, newOption]);
  };

  const removeMCQOption = (optionId: string) => {
    if (!question.mcqOptions || question.mcqOptions.length <= 2) return;
    onUpdate('mcqOptions', question.mcqOptions.filter(opt => opt.id !== optionId));
  };

  const updateMCQOption = (optionId: string, field: string, value: any) => {
    if (!question.mcqOptions) return;
    
    const newOptions = question.mcqOptions.map(opt => {
      if (opt.id === optionId) {
        if (field === 'isCorrect' && value) {
          // Only one option can be correct
          return { ...opt, [field]: value };
        }
        return { ...opt, [field]: value };
      } else if (field === 'isCorrect' && value) {
        // Uncheck other options when this one is marked correct
        return { ...opt, isCorrect: false };
      }
      return opt;
    });
    onUpdate('mcqOptions', newOptions);
  };

  const handleAttachmentAdd = (attachment: QuestionAttachment) => {
    const currentAttachments = question.attachments || [];
    onUpdate('attachments', [...currentAttachments, attachment]);
    setShowFileAttachment(false);
  };

  const handleAttachmentRemove = (attachmentId: string) => {
    const currentAttachments = question.attachments || [];
    onUpdate('attachments', currentAttachments.filter(att => att.id !== attachmentId));
  };

  return (
    <div className="space-y-6">
      {/* Question Text Section */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Question Text</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openOCR('question')}
                className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
              >
                <Scan className="h-4 w-4 mr-1" />
                OCR
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMathEditor(!showMathEditor)}
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                <Type className="h-4 w-4 mr-1" />
                Math
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCalculator(!showCalculator)}
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Calc
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showMathEditor ? (
            <MathTextEditor
              value={question.text || ''}
              onChange={(value) => onUpdate('text', value)}
              placeholder="Enter your question here (supports LaTeX)..."
              onClose={() => setShowMathEditor(false)}
            />
          ) : (
            <Textarea
              value={question.text || ''}
              onChange={(e) => onUpdate('text', e.target.value)}
              className="bg-[#2A2A2A] border-gray-600 text-white"
              placeholder="Enter your question here..."
              rows={4}
            />
          )}
        </CardContent>
      </Card>

      {/* Question Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-gray-300 mb-2 block">Question Type</Label>
          <Select value={question.subType || 'mcq'} onValueChange={(value) => onUpdate('subType', value)}>
            <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-gray-600">
              <SelectItem value="mcq">Multiple Choice</SelectItem>
              <SelectItem value="short">Short Answer</SelectItem>
              <SelectItem value="long">Long Answer</SelectItem>
              <SelectItem value="numerical">Numerical</SelectItem>
              <SelectItem value="diagram">Diagram</SelectItem>
              <SelectItem value="matching">Matching</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300 mb-2 block">Marks</Label>
          <Input
            type="number"
            value={question.marks || 1}
            onChange={(e) => onUpdate('marks', parseInt(e.target.value) || 1)}
            className="bg-[#2A2A2A] border-gray-600 text-white"
            min={1}
            max={20}
          />
        </div>

        <div>
          <Label className="text-gray-300 mb-2 block">Estimated Time (seconds)</Label>
          <Input
            type="number"
            value={question.metadata?.estimatedTime || 60}
            onChange={(e) => {
              const metadata = { ...question.metadata, estimatedTime: parseInt(e.target.value) || 60 };
              onUpdate('metadata', metadata);
            }}
            className="bg-[#2A2A2A] border-gray-600 text-white"
            min={30}
            max={600}
          />
        </div>
      </div>

      {/* Question Image Upload */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Image className="mr-2 h-5 w-5" />
            Question Image (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onImageUpload={(imageData) => onUpdate('image', imageData)}
            currentImage={question.image}
            onRemoveImage={() => onUpdate('image', undefined)}
          />
        </CardContent>
      </Card>

      {/* MCQ Options */}
      {question.subType === 'mcq' && (
        <Card className="bg-[#1E1E1E] border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Answer Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(question.mcqOptions || []).map((option, optIndex) => (
                <div key={option.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={option.isCorrect}
                        onChange={() => updateMCQOption(option.id, 'isCorrect', true)}
                        className="text-[#38B6FF]"
                      />
                      <Badge variant="secondary" className="text-xs">
                        {String.fromCharCode(65 + optIndex)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Option {String.fromCharCode(65 + optIndex)}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openOCR('option', optIndex)}
                          className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white text-xs px-2 py-1"
                        >
                          <Scan className="h-3 w-3 mr-1" />
                          OCR
                        </Button>
                      </div>
                      <Textarea
                        value={option.text}
                        onChange={(e) => updateMCQOption(option.id, 'text', e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                        className="bg-[#2A2A2A] border-gray-600 text-white mb-2"
                        rows={2}
                      />
                    </div>
                    {question.mcqOptions && question.mcqOptions.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMCQOption(option.id)}
                        className="text-red-400 hover:text-red-300 mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Image Upload for MCQ Option */}
                  <div>
                    <Label className="text-white text-sm mb-2 block">Option Image (optional)</Label>
                    <ImageUpload
                      onImageUpload={(imageData) => updateMCQOption(option.id, 'image', imageData)}
                      currentImage={option.image}
                      onRemoveImage={() => updateMCQOption(option.id, 'image', undefined)}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addMCQOption}
                className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matching Pairs */}
      {question.subType === 'matching' && (
        <MatchingQuestionForm
          matchingPairs={question.matchingPairs || []}
          onUpdate={(pairs) => onUpdate('matchingPairs', pairs)}
          onOpenOCR={(field, pairIndex, side) => openOCR('matching', undefined, pairIndex, side)}
        />
      )}

      {/* Marking Scheme */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Marking Scheme & Answer Details
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openOCR('markingScheme')}
                className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
              >
                <Scan className="h-4 w-4 mr-1" />
                OCR
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFileAttachment(!showFileAttachment)}
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <Link className="h-4 w-4 mr-1" />
                Attach
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={question.markingScheme || ''}
            onChange={(e) => onUpdate('markingScheme', e.target.value)}
            className="bg-[#2A2A2A] border-gray-600 text-white"
            placeholder="Enter marking scheme, model answers, and grading criteria..."
            rows={6}
          />
          <div className="mt-3 text-sm text-gray-400">
            Include: Expected answers, partial credit allocation, common mistakes to avoid, and grading rubric.
          </div>
          
          {/* File Attachment Section */}
          {showFileAttachment && (
            <div className="mt-4">
              <Separator className="mb-4" />
              <h4 className="text-white font-medium mb-3">Attach Reference Files</h4>
              <FileAttachment
                attachments={question.attachments}
                onAttachmentAdd={handleAttachmentAdd}
                onAttachmentRemove={handleAttachmentRemove}
              />
            </div>
          )}
          
          {/* Show existing attachments if any */}
          {!showFileAttachment && question.attachments && question.attachments.length > 0 && (
            <div className="mt-4">
              <Separator className="mb-3" />
              <FileAttachment
                attachments={question.attachments}
                onAttachmentAdd={handleAttachmentAdd}
                onAttachmentRemove={handleAttachmentRemove}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Calculator */}
      {showCalculator && (
        <div className="fixed top-20 right-4 z-50">
          <CalculatorComponent onClose={() => setShowCalculator(false)} />
        </div>
      )}

      {/* OCR Modal */}
      {showOCR && ocrTarget && (
        <TeacherOCR
          onTextExtracted={handleOCRText}
          onClose={() => {
            setShowOCR(false);
            setOcrTarget(null);
          }}
          title={`Extract ${ocrTarget.field === 'question' ? 'Question' : ocrTarget.field === 'markingScheme' ? 'Marking Scheme' : ocrTarget.field === 'matching' ? 'Matching Item' : 'Option'} Text`}
          placeholder={`Upload an image containing the ${ocrTarget.field} text...`}
        />
      )}
    </div>
  );
};

export default EnhancedQuestionForm;
