
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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  X,
  Brain,
  BookOpen,
  Settings,
  FileText,
  Download,
  Eye,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';

interface FormData {
  topicName: string;
  subject: string;
  grades: number[];
  curriculum: string[];
  level: string;
  syllabusCode: string;
  aiPrompt: string;
  additionalTags: string[];
  learningStyle: string;
  difficultyLevel: string;
  attachedImages: File[];
  resourceLinks: string[];
}

interface GeneratedNote {
  id: string;
  content: string;
  metadata: FormData;
  createdAt: Date;
  analytics: {
    viewCount: number;
    averageRating: number;
    timeSpent: number;
    understandingScore: number;
    improvementTracking: number;
  };
}

const AINotesGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topicName: '',
    subject: '',
    grades: [],
    curriculum: [],
    level: '',
    syllabusCode: '',
    aiPrompt: '',
    additionalTags: [],
    learningStyle: '',
    difficultyLevel: '',
    attachedImages: [],
    resourceLinks: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<GeneratedNote | null>(null);
  const [newTag, setNewTag] = useState('');
  const [newLink, setNewLink] = useState('');

  const subjects = [
    'Physics', 'Mathematics', 'Biology', 'Chemistry', 'Computer Science', 
    'Literature', 'History', 'Geography', 'Economics', 'Art'
  ];

  const curriculumOptions = [
    'Cambridge IGCSE', 'Edexcel', 'AP Program', 'IB Diploma', 
    'Canadian Curriculum', 'SAT', 'A-Levels', 'GCSE'
  ];

  const levels = ['Foundation', 'Core', 'Extended', 'Higher Level', 'Standard Level'];
  const learningStyles = ['Visual', 'Auditory', 'Kinesthetic', 'Mixed'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const handleGradeToggle = (grade: number) => {
    setFormData(prev => ({
      ...prev,
      grades: prev.grades.includes(grade) 
        ? prev.grades.filter(g => g !== grade)
        : [...prev.grades, grade]
    }));
  };

  const handleCurriculumToggle = (curriculum: string) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.includes(curriculum)
        ? prev.curriculum.filter(c => c !== curriculum)
        : [...prev.curriculum, curriculum]
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.additionalTags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        additionalTags: [...prev.additionalTags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      additionalTags: prev.additionalTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addResourceLink = () => {
    if (newLink.trim() && !formData.resourceLinks.includes(newLink.trim())) {
      setFormData(prev => ({
        ...prev,
        resourceLinks: [...prev.resourceLinks, newLink.trim()]
      }));
      setNewLink('');
    }
  };

  const removeResourceLink = (linkToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      resourceLinks: prev.resourceLinks.filter(link => link !== linkToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachedImages: [...prev.attachedImages, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachedImages: prev.attachedImages.filter((_, i) => i !== index)
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated note
    const mockNote: GeneratedNote = {
      id: `note-${Date.now()}`,
      content: `# ${formData.topicName}

## Overview
${formData.aiPrompt}

## Key Concepts
- Understanding the fundamental principles
- Practical applications and examples
- Common misconceptions and clarifications

## Learning Objectives
By the end of this note, students will be able to:
1. Explain the core concepts
2. Apply knowledge to solve problems
3. Analyze real-world scenarios

## Examples and Practice
Practice problems and detailed solutions would appear here.

## Summary
Key takeaways and review points.`,
      metadata: formData,
      createdAt: new Date(),
      analytics: {
        viewCount: 0,
        averageRating: 0,
        timeSpent: 0,
        understandingScore: 0,
        improvementTracking: 0
      }
    };

    setGeneratedNote(mockNote);
    setIsGenerating(false);
  };

  const canGenerate = formData.topicName.trim() && formData.subject && formData.aiPrompt.trim();

  if (generatedNote) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-blue-600" />
                  Generated Note: {generatedNote.metadata.topicName}
                </h1>
                <p className="text-gray-600 mt-2">
                  Subject: {generatedNote.metadata.subject} • Level: {generatedNote.metadata.level}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setGeneratedNote(null)}>
                  Edit
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Note Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {generatedNote.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Note Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Views</span>
                    </div>
                    <span className="font-semibold">{generatedNote.analytics.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Rating</span>
                    </div>
                    <span className="font-semibold">{generatedNote.analytics.averageRating.toFixed(1)}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Avg. Time</span>
                    </div>
                    <span className="font-semibold">{generatedNote.analytics.timeSpent}m</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Grades</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generatedNote.metadata.grades.map(grade => (
                        <Badge key={grade} variant="outline">{grade}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Curriculum</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generatedNote.metadata.curriculum.map(curr => (
                        <Badge key={curr} variant="outline">{curr}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generatedNote.metadata.additionalTags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600" />
            Create AI-Powered Note
          </h1>
          <p className="text-gray-600 mt-2">
            Generate structured, curriculum-aligned notes using AI
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="topicName">Topic Name *</Label>
                  <Input
                    id="topicName"
                    value={formData.topicName}
                    onChange={(e) => setFormData(prev => ({ ...prev, topicName: e.target.value }))}
                    placeholder="e.g., Laws of Motion, Cell Biology, Shakespeare's Tragedies"
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be the title of the generated note. Be descriptive.</p>
                </div>

                <div>
                  <Label>Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Grade Selection</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[9, 10, 11, 12, 13].map(grade => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => handleGradeToggle(grade)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          formData.grades.includes(grade)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        Grade {grade}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Curriculum</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {curriculumOptions.map(curriculum => (
                      <button
                        key={curriculum}
                        type="button"
                        onClick={() => handleCurriculumToggle(curriculum)}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          formData.curriculum.includes(curriculum)
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {curriculum}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="syllabusCode">Syllabus Code / Learning Outcome</Label>
                    <Input
                      id="syllabusCode"
                      value={formData.syllabusCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, syllabusCode: e.target.value }))}
                      placeholder="e.g., 0580/22, BIO-LO3, PHYS-9702/32"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: AI Guidance & Prompt Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI Guidance & Prompt Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="aiPrompt">AI Prompt Instructions *</Label>
                  <Textarea
                    id="aiPrompt"
                    value={formData.aiPrompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, aiPrompt: e.target.value }))}
                    placeholder="e.g., Explain Newton's 3 Laws of Motion with examples and diagrams"
                    rows={4}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">This text will be processed by AI to generate the note. Use clear learning objectives, examples, or desired tone.</p>
                </div>

                <div>
                  <Label>Additional Tags</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" onClick={addTag} variant="outline">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.additionalTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Learning Style</Label>
                    <Select value={formData.learningStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        {learningStyles.map(style => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Difficulty Level</Label>
                    <Select value={formData.difficultyLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, difficultyLevel: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Uploads and Visual Aids */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Uploads and Visual Aids
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Attach Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2 hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Attach diagrams or reference images you want included in the notes</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </Label>
                  </div>
                  {formData.attachedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {formData.attachedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 truncate">{file.name}</p>
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Embed Resource Links</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="Add YouTube, Quizlet, or Khan Academy link..."
                    />
                    <Button type="button" onClick={addResourceLink} variant="outline">Add</Button>
                  </div>
                  <div className="space-y-2 mt-3">
                    {formData.resourceLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                        <span className="text-sm text-blue-600 flex-1 truncate">{link}</span>
                        <X className="h-4 w-4 cursor-pointer text-gray-400 hover:text-red-500" onClick={() => removeResourceLink(link)} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? 'Generating...' : 'Generate Note using AI'}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Be specific in your AI prompt for better results</li>
                  <li>• Include learning objectives and examples</li>
                  <li>• Add relevant tags for better organization</li>
                  <li>• Upload diagrams to enhance understanding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Generating your note...</h3>
            <p className="text-gray-600">AI is creating your structured note. This may take a moment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AINotesGenerator;
