
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Type, 
  Scan, 
  Image as ImageIcon, 
  Calculator as CalculatorIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import MathTextEditor from './MathTextEditor';
import TeacherOCR from './TeacherOCR';
import ImageUpload from './ImageUpload';
import CalculatorComponent from './Calculator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface EnhancedAnswerEditorProps {
  value: string;
  onChange: (value: string) => void;
  questionType: 'mcq' | 'written';
  options?: string[];
  placeholder?: string;
  questionId: string | number;
}

const EnhancedAnswerEditor: React.FC<EnhancedAnswerEditorProps> = ({
  value,
  onChange,
  questionType,
  options = [],
  placeholder = "Type your answer here...",
  questionId
}) => {
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [activeMode, setActiveMode] = useState<'text' | 'math' | 'image'>('text');
  const [showOCR, setShowOCR] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);

  const handleOCRText = (text: string, insertMode: 'replace' | 'append' = 'append') => {
    const newValue = insertMode === 'replace' ? text : `${value}\n${text}`;
    onChange(newValue);
  };

  const handleImageUpload = (imageData: string) => {
    setAttachedImages([...attachedImages, imageData]);
  };

  const removeImage = (index: number) => {
    setAttachedImages(attachedImages.filter((_, i) => i !== index));
  };

  const handleMCQSelection = (selectedOption: string) => {
    onChange(selectedOption);
  };

  return (
    <div className="space-y-4">
      {questionType === 'mcq' ? (
        // MCQ Interface
        <div className="space-y-3">
          <Label className="text-base font-medium text-gray-700">Select your answer:</Label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <Checkbox
                id={`question-${questionId}-option-${index}`}
                checked={value === option}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleMCQSelection(option);
                  } else {
                    onChange('');
                  }
                }}
                className="h-5 w-5"
              />
              <Label 
                htmlFor={`question-${questionId}-option-${index}`} 
                className="flex-1 text-base cursor-pointer"
              >
                <span className="font-medium text-gray-600 mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        // Written Answer Interface
        <Card className="border-gray-300">
          <CardContent className="p-4 space-y-4">
            {/* Advanced Tools Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {activeMode === 'text' ? 'Text Mode' : activeMode === 'math' ? 'Math Mode' : 'Image Mode'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {value.length} characters
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedTools(!showAdvancedTools)}
                className="flex items-center space-x-1"
              >
                <span className="text-xs">Advanced Tools</span>
                {showAdvancedTools ? 
                  <ChevronUp className="h-3 w-3" /> : 
                  <ChevronDown className="h-3 w-3" />
                }
              </Button>
            </div>

            {/* Advanced Tools Toolbar */}
            {showAdvancedTools && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                <Button
                  variant={activeMode === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMode('text')}
                  className="flex items-center space-x-1"
                >
                  <Type className="h-4 w-4" />
                  <span>Text</span>
                </Button>
                <Button
                  variant={activeMode === 'math' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMode('math')}
                  className="flex items-center space-x-1"
                >
                  <Type className="h-4 w-4" />
                  <span>Math</span>
                </Button>
                <Button
                  variant={activeMode === 'image' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMode('image')}
                  className="flex items-center space-x-1"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Image</span>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOCR(true)}
                  className="flex items-center space-x-1 border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
                >
                  <Scan className="h-4 w-4" />
                  <span>OCR</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="flex items-center space-x-1 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  <CalculatorIcon className="h-4 w-4" />
                  <span>Calculator</span>
                </Button>
              </div>
            )}

            {/* Answer Input Area */}
            <div className="min-h-[120px]">
              {activeMode === 'text' && (
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[120px] resize-vertical"
                  rows={4}
                />
              )}

              {activeMode === 'math' && (
                <MathTextEditor
                  value={value}
                  onChange={onChange}
                  placeholder="Enter mathematical expressions using LaTeX notation..."
                />
              )}

              {activeMode === 'image' && (
                <div className="space-y-3">
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImage={attachedImages[attachedImages.length - 1]}
                    onRemoveImage={() => removeImage(attachedImages.length - 1)}
                  />
                  <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Add description for your image answer..."
                    className="min-h-[60px]"
                    rows={2}
                  />
                </div>
              )}
            </div>

            {/* Attached Images Display */}
            {attachedImages.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Attached Images:</Label>
                <div className="grid grid-cols-2 gap-2">
                  {attachedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 p-0 text-xs"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Guidelines */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Use the Math mode for equations and formulas</p>
              <p>• Upload images for diagrams, graphs, or visual solutions</p>
              <p>• Use OCR to convert handwritten work to text</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Calculator */}
      {showCalculator && (
        <div className="fixed top-20 right-4 z-50">
          <CalculatorComponent onClose={() => setShowCalculator(false)} />
        </div>
      )}

      {/* OCR Modal */}
      {showOCR && (
        <TeacherOCR
          onTextExtracted={handleOCRText}
          onClose={() => setShowOCR(false)}
          title="Extract Text from Image"
          placeholder="Upload an image to extract text for your answer..."
        />
      )}
    </div>
  );
};

export default EnhancedAnswerEditor;
