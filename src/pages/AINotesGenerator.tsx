
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
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
  Filter,
  Funnel
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
  const [showHelp, setShowHelp] = useState(false);

  const canGenerate = () => {
    return formData.llmPrompt.trim().length > 0;
  };

  const handleGenerate = async () => {
    if (!canGenerate()) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Mock generated notes based on LLM prompt
      const mockNotes: GeneratedNote[] = [
        {
          sectionId: 'ai-note-1',
          sectionTitle: 'Cellular Respiration Overview',
          content: [
            'Cellular respiration is the metabolic process by which cells harvest energy from food molecules.',
            'Occurs in three main stages: glycolysis, citric acid cycle, and electron transport chain.',
            'Primary purpose is to generate ATP (adenosine triphosphate) for cellular energy needs.',
            'Overall equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'
          ],
          importance: 5,
          tags: ['Definition', 'Process', 'Equation'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'ai-note-2',
          sectionTitle: 'Glycolysis',
          content: [
            'First stage of cellular respiration occurring in the cytoplasm.',
            'Glucose (6-carbon) is broken down into two pyruvate molecules (3-carbon each).',
            'Net gain of 2 ATP and 2 NADH molecules per glucose.',
            'Does not require oxygen (anaerobic process).',
            'Key enzymes: hexokinase, phosphofructokinase, pyruvate kinase.'
          ],
          importance: 4,
          tags: ['Process', 'Location', 'Example'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'ai-note-3',
          sectionTitle: 'Citric Acid Cycle (Krebs Cycle)',
          content: [
            'Second stage occurring in the mitochondrial matrix.',
            'Pyruvate is converted to acetyl-CoA before entering the cycle.',
            'One turn of the cycle produces: 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂.',
            'Cycle turns twice per glucose molecule (since glucose produces 2 pyruvate).',
            'Key regulatory enzyme: citrate synthase.'
          ],
          importance: 4,
          tags: ['Process', 'Location', 'Term'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'ai-note-4',
          sectionTitle: 'Electron Transport Chain',
          content: [
            'Final stage located in the inner mitochondrial membrane.',
            'NADH and FADH₂ donate electrons to protein complexes.',
            'Creates proton gradient across inner membrane (chemiosmosis).',
            'ATP synthase uses gradient to produce approximately 32 ATP molecules.',
            'Oxygen serves as final electron acceptor, forming water.'
          ],
          importance: 5,
          tags: ['Process', 'Location', 'Equation'],
          starred: false,
          customTags: []
        }
      ];

      setGeneratedNotes(mockNotes);
    } catch (err) {
      setError('Unable to generate notes with the provided prompt. Please try again.');
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
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">AI-Driven Notes Generator</h1>
            <p className="text-sm text-gray-500 mt-1">Craft a custom prompt and guidance to generate structured notes.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHelp(true)}
            className="text-blue-600 hover:text-blue-700"
            aria-label="Open help on using the AI-Driven Notes Generator"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-4 space-y-4">
        {/* LLM Prompt & Guidance Form */}
        <PromptGuidanceForm
          formData={formData}
          onFormDataChange={updateFormData}
          onGenerate={handleGenerate}
          canGenerate={canGenerate()}
          isGenerating={isGenerating}
        />

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mx-6" role="alert">
            <div className="flex items-center">
              <div className="text-red-600 text-sm">{error}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                className="ml-auto text-blue-600 hover:text-blue-700 underline"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Generated Notes */}
        {generatedNotes.length > 0 && (
          <AINotesResults
            notes={generatedNotes}
            onNotesChange={updateNotes}
          />
        )}
      </main>

      {/* Loading Overlay */}
      {isGenerating && <LoadingOverlay />}
    </div>
  );
};

export default AINotesGenerator;
