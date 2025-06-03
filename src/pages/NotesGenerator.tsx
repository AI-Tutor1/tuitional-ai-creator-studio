
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  X
} from 'lucide-react';
import SourceSelectionTabs from '@/components/notes-generator/SourceSelectionTabs';
import GenerationSettingsPanel from '@/components/notes-generator/GenerationSettingsPanel';
import NotesResultsSection from '@/components/notes-generator/NotesResultsSection';
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

interface SourceContent {
  sourceType: 'text' | 'document' | 'topics';
  sourceText: string;
  uploadedFiles: Array<{ fileId: string; fileName: string; fileSize: number }>;
  topics: string[];
}

interface GenerationSettings {
  detailLevel: 'brief' | 'medium' | 'detailed';
  format: 'bulleted' | 'numbered';
  includeExamples: boolean;
  tone: 'educational' | 'concise' | 'conversational' | 'formal';
}

const NotesGenerator: React.FC = () => {
  const [sourceContent, setSourceContent] = useState<SourceContent>({
    sourceType: 'text',
    sourceText: '',
    uploadedFiles: [],
    topics: []
  });

  const [settings, setSettings] = useState<GenerationSettings>({
    detailLevel: 'medium',
    format: 'bulleted',
    includeExamples: false,
    tone: 'educational'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<GeneratedNote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const canGenerate = () => {
    switch (sourceContent.sourceType) {
      case 'text':
        return sourceContent.sourceText.trim().length > 0;
      case 'document':
        return sourceContent.uploadedFiles.length > 0;
      case 'topics':
        return sourceContent.topics.length > 0;
      default:
        return false;
    }
  };

  const handleGenerate = async () => {
    if (!canGenerate()) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated notes
      const mockNotes: GeneratedNote[] = [
        {
          sectionId: 'note-1',
          sectionTitle: 'Photosynthesis Overview',
          content: [
            'Photosynthesis is the process by which green plants convert light energy into chemical energy.',
            'Occurs in chloroplasts, primarily in the thylakoid membranes.',
            'Essential for life on Earth as it produces oxygen and glucose.'
          ],
          importance: 5,
          tags: ['Definition', 'Term'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'note-2',
          sectionTitle: 'Light-Dependent Reactions',
          content: [
            'Takes place in thylakoid membranes of chloroplasts.',
            'Generates ATP and NADPH through electron transport.',
            'Water molecules are split, releasing oxygen as a byproduct.'
          ],
          importance: 4,
          tags: ['Process', 'Equation'],
          starred: false,
          customTags: []
        },
        {
          sectionId: 'note-3',
          sectionTitle: 'Calvin Cycle',
          content: [
            'Light-independent reactions that occur in the stroma.',
            'Uses ATP and NADPH to fix carbon dioxide into glucose.',
            'Consists of three phases: carbon fixation, reduction, and regeneration.'
          ],
          importance: 4,
          tags: ['Process', 'Example'],
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

  const updateNotes = (updatedNotes: GeneratedNote[]) => {
    setGeneratedNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notes Generator</h1>
            <p className="text-sm text-gray-500 mt-1">Automatically generate structured notes from your content.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHelp(true)}
            className="text-blue-600 hover:text-blue-700"
            aria-label="Open help for Notes Generator"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-4 space-y-4">
        {/* Source Selection & Settings */}
        <SourceSelectionTabs
          sourceContent={sourceContent}
          onSourceContentChange={setSourceContent}
        />

        <GenerationSettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
        />

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate() || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-base font-semibold"
            aria-label="Generate notes based on provided content and settings"
          >
            Generate Notes
          </Button>
        </div>

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
          <NotesResultsSection
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

export default NotesGenerator;
