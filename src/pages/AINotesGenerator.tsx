
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  HelpCircle, 
  Upload, 
  Search, 
  Download, 
  ChevronRight, 
  ChevronDown,
  Copy,
  Edit,
  Trash2,
  Star,
  Tag,
  Filter
} from 'lucide-react';
import PromptGuidanceForm from '@/components/ai-notes-generator/PromptGuidanceForm';
import AINotesResults from '@/components/ai-notes-generator/AINotesResults';
import LoadingOverlay from '@/components/notes-generator/LoadingOverlay';

interface GeneratedNote {
  sectionId: string;
  sectionTitle: string;
  content: string[];
  importance: number;
  tags: string[];
  starred?: boolean;
  customTags?: string[];
}

interface FormData {
  subject: string;
  level: 'Core' | 'Extended' | 'Higher';
  gradeRange: string;
  topic: string;
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

const AINotesGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    level: 'Core',
    gradeRange: '',
    topic: '',
    llmPrompt: '',
    additionalGuidance: '',
    sourceType: 'none',
    sourceText: '',
    uploadedFiles: [],
    advancedSettings: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1500,
      topP: 0.9
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<GeneratedNote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = () => {
    return formData.subject.trim().length > 0 && formData.topic.trim().length > 0;
  };

  const handleGenerate = async () => {
    if (!canGenerate()) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated notes based on subject and topic
      const mockNotes: GeneratedNote[] = [
        {
          sectionId: 'ai-note-1',
          sectionTitle: `${formData.topic} - Overview`,
          content: [
            `${formData.topic} is a fundamental concept in ${formData.subject}.`,
            `This topic is essential for ${formData.level} level ${formData.gradeRange} students.`,
            'Understanding this concept requires careful attention to key principles.',
            'Applications of this knowledge span multiple areas of study.'
          ],
          importance: 5,
          tags: ['Definition', 'Overview'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'ai-note-2',
          sectionTitle: `Key Concepts in ${formData.topic}`,
          content: [
            'Primary concepts form the foundation of understanding.',
            'Secondary principles build upon basic knowledge.',
            'Advanced applications demonstrate practical usage.',
            'Critical thinking skills are developed through practice.'
          ],
          importance: 4,
          tags: ['Concept', 'Application'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'ai-note-3',
          sectionTitle: `${formData.topic} - Examples and Practice`,
          content: [
            'Real-world examples illustrate theoretical concepts.',
            'Practice problems reinforce learning objectives.',
            'Step-by-step solutions demonstrate methodology.',
            'Common mistakes and how to avoid them.'
          ],
          importance: 4,
          tags: ['Example', 'Practice'],
          starred: false,
          customTags: []
        }
      ];

      setGeneratedNotes(mockNotes);
    } catch (err) {
      setError('Unable to generate notes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateNotes = (updatedNotes: GeneratedNote[]) => {
    setGeneratedNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              Notes Generator
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Create comprehensive educational notes for IGCSE subjects and topics
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Generate Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Generate Educational Notes
              </h2>
              <p className="text-gray-600 mb-8">
                Fill in the details below to generate book-style educational notes for IGCSE students.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="space-y-6">
                {/* Subject */}
                <div>
                  <Label htmlFor="subject" className="text-base font-medium text-gray-900 mb-3 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => updateFormData({ subject: e.target.value })}
                    placeholder="e.g. Mathematics, Physics, Biology"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>

                {/* Level */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">
                    Level
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value: 'Core' | 'Extended' | 'Higher') =>
                      updateFormData({ level: value })
                    }
                  >
                    <SelectTrigger className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Extended">Extended</SelectItem>
                      <SelectItem value="Higher">Higher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grade Range */}
                <div>
                  <Label htmlFor="gradeRange" className="text-base font-medium text-gray-900 mb-3 block">
                    Grade Range
                  </Label>
                  <Input
                    id="gradeRange"
                    value={formData.gradeRange}
                    onChange={(e) => updateFormData({ gradeRange: e.target.value })}
                    placeholder="e.g. 9-1, A*-G"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>

                {/* Topic */}
                <div>
                  <Label htmlFor="topic" className="text-base font-medium text-gray-900 mb-3 block">
                    Topic
                  </Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => updateFormData({ topic: e.target.value })}
                    placeholder="e.g. Quadratic Equations, Light, Photosynthesis"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate() || isGenerating}
                  className="w-full h-14 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200"
                >
                  Generate Notes
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Preview */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Notes Preview
              </h2>
            </div>

            {generatedNotes.length > 0 ? (
              <AINotesResults
                notes={generatedNotes}
                onNotesChange={updateNotes}
              />
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Your notes will appear here
                </h3>
                <p className="text-gray-500">
                  Fill out the form and click "Generate Notes" to get started.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
            <div className="flex items-center justify-between">
              <div className="text-red-700 text-sm">{error}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Retry
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isGenerating && <LoadingOverlay />}
    </div>
  );
};

export default AINotesGenerator;
