
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Upload, ChevronRight, ChevronDown } from 'lucide-react';

interface FormData {
  llmPrompt: string;
  additionalGuidance: string;
  sourceType: 'none' | 'text' | 'document';
  sourceText: string;
  uploadedFiles: Array<{ fileId: string; fileName: string; fileSize: number }>;
  advancedSettings: {
    model: 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
    temperature: number;
    maxTokens: number;
    topP: number;
  };
}

interface PromptGuidanceFormProps {
  formData: FormData;
  onFormDataChange: (updates: Partial<FormData>) => void;
  onGenerate: () => void;
  canGenerate: boolean;
  isGenerating: boolean;
}

const PromptGuidanceForm: React.FC<PromptGuidanceFormProps> = ({
  formData,
  onFormDataChange,
  onGenerate,
  canGenerate,
  isGenerating
}) => {
  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  const handleLLMPromptChange = (value: string) => {
    if (value.length <= 2000) {
      onFormDataChange({ llmPrompt: value });
    }
  };

  const handleGuidanceChange = (value: string) => {
    if (value.length <= 1000) {
      onFormDataChange({ additionalGuidance: value });
    }
  };

  const handleSourceTextChange = (value: string) => {
    if (value.length <= 10000) {
      onFormDataChange({ sourceText: value });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileData = {
        fileId: `file-${Date.now()}`,
        fileName: file.name,
        fileSize: file.size
      };
      onFormDataChange({ 
        uploadedFiles: [...formData.uploadedFiles, fileData] 
      });
    }
  };

  const removeFile = (fileId: string) => {
    onFormDataChange({
      uploadedFiles: formData.uploadedFiles.filter(f => f.fileId !== fileId)
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mx-6">
      <div className="space-y-6">
        {/* LLM Prompt */}
        <div>
          <Label htmlFor="llm-prompt" className="text-sm font-semibold text-gray-700">
            LLM Prompt
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            Describe what you want the LLM to generate. Be as specific as possible.
          </p>
          <Textarea
            id="llm-prompt"
            value={formData.llmPrompt}
            onChange={(e) => handleLLMPromptChange(e.target.value)}
            placeholder="E.g.: 'Generate concise, bullet-point study notes on the topic of Cellular Respiration. Include definitions, key equations, and a brief example for each sub-process.'"
            rows={6}
            className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            aria-label="Enter your LLM prompt"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.llmPrompt.length} / 2,000 characters
          </div>
        </div>

        {/* Additional Guidance */}
        <div>
          <Label htmlFor="llm-guidance" className="text-sm font-semibold text-gray-700">
            Additional Guidance (Optional)
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            Provide any extra instructions that refine formatting, tone, or structure.
          </p>
          <Textarea
            id="llm-guidance"
            value={formData.additionalGuidance}
            onChange={(e) => handleGuidanceChange(e.target.value)}
            placeholder="E.g.: 'Format each section as a Biologist's overview with italicized definitions.'"
            rows={4}
            className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            aria-label="Optional extra guidance for the LLM"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.additionalGuidance.length} / 1,000 characters
          </div>
        </div>

        {/* Source Content */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">Source Content (Optional)</Label>
          <RadioGroup
            value={formData.sourceType}
            onValueChange={(value: 'none' | 'text' | 'document') => 
              onFormDataChange({ sourceType: value })
            }
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="text-sm text-gray-700">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text" className="text-sm text-gray-700">Paste Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="document" id="document" />
              <Label htmlFor="document" className="text-sm text-gray-700">Upload Document</Label>
            </div>
          </RadioGroup>

          {formData.sourceType === 'text' && (
            <div className="mt-4">
              <Label htmlFor="source-text" className="text-sm font-semibold text-gray-700">
                Enter Source Text
              </Label>
              <Textarea
                id="source-text"
                value={formData.sourceText}
                onChange={(e) => handleSourceTextChange(e.target.value)}
                placeholder="Paste or type additional source material here..."
                rows={6}
                className="mt-2 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                aria-label="Paste your source text"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.sourceText.length} / 10,000 characters
              </div>
            </div>
          )}

          {formData.sourceType === 'document' && (
            <div className="mt-4">
              <Label className="text-sm font-semibold text-gray-700">
                Upload a Document
              </Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:border-blue-600 hover:bg-white transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag & drop a PDF, DOCX, or TXT file here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">Max size: 10MB</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  id="file-upload"
                  aria-label="Upload a document to provide additional context"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="mt-2" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
              </div>
              
              {formData.uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.uploadedFiles.map((file) => (
                    <div key={file.fileId} className="flex items-center justify-between bg-white border rounded p-2">
                      <span className="text-sm text-gray-700">{file.fileName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.fileId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Advanced LLM Settings */}
        <Collapsible open={advancedExpanded} onOpenChange={setAdvancedExpanded}>
          <CollapsibleTrigger className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-gray-900">
            {advancedExpanded ? (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-blue-600" />
            )}
            <span>Advanced LLM Settings</span>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3 space-y-4 pl-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Model Selection */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase">Model</Label>
                <Select
                  value={formData.advancedSettings.model}
                  onValueChange={(value: 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo') =>
                    onFormDataChange({
                      advancedSettings: { ...formData.advancedSettings, model: value }
                    })
                  }
                >
                  <SelectTrigger className="h-9 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Max Tokens */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase">Max Tokens</Label>
                <Input
                  type="number"
                  min={100}
                  max={8000}
                  step={100}
                  value={formData.advancedSettings.maxTokens}
                  onChange={(e) =>
                    onFormDataChange({
                      advancedSettings: { 
                        ...formData.advancedSettings, 
                        maxTokens: parseInt(e.target.value) || 1500 
                      }
                    })
                  }
                  className="h-9 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  aria-label="Set maximum tokens for LLM generation"
                />
              </div>

              {/* Temperature */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase">
                  Temperature: {formData.advancedSettings.temperature.toFixed(2)}
                </Label>
                <Slider
                  value={[formData.advancedSettings.temperature]}
                  onValueChange={([value]) =>
                    onFormDataChange({
                      advancedSettings: { ...formData.advancedSettings, temperature: value }
                    })
                  }
                  min={0}
                  max={1}
                  step={0.05}
                  className="mt-2"
                  aria-label="Set temperature for LLM generation"
                />
              </div>

              {/* Top-P */}
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase">
                  Top-P: {formData.advancedSettings.topP.toFixed(2)}
                </Label>
                <Slider
                  value={[formData.advancedSettings.topP]}
                  onValueChange={([value]) =>
                    onFormDataChange({
                      advancedSettings: { ...formData.advancedSettings, topP: value }
                    })
                  }
                  min={0}
                  max={1}
                  step={0.05}
                  className="mt-2"
                  aria-label="Set top-p (nucleus sampling) for LLM generation"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold h-12 min-w-[180px]"
            aria-label="Submit prompt and guidance to generate notes"
          >
            Generate Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptGuidanceForm;
