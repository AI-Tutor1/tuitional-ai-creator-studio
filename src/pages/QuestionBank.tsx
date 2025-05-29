
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Download,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  Target,
  Brain,
  FileText,
  BookOpen,
  Calculator,
  Image as ImageIcon,
  CheckSquare
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { EnhancedQuestion } from '@/types/question';
import QuestionAnalytics from '@/components/question-bank/QuestionAnalytics';

const QuestionBank = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<EnhancedQuestion | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    grade: '',
    difficulty: [0, 1],
    discrimination: [-1, 1],
    questionType: '',
    bloomsLevel: '',
    status: ''
  });

  // Mock data - replace with actual API calls
  const mockQuestions: EnhancedQuestion[] = [
    {
      id: '1',
      questionNumber: 1,
      type: 'question',
      subType: 'mcq',
      text: 'What is the process by which plants make their own food using sunlight?',
      marks: 2,
      includeAnswer: true,
      includeDiagram: false,
      mcqOptions: [
        { id: '1', text: 'Photosynthesis', isCorrect: true },
        { id: '2', text: 'Respiration', isCorrect: false },
        { id: '3', text: 'Transpiration', isCorrect: false },
        { id: '4', text: 'Osmosis', isCorrect: false }
      ],
      metadata: {
        topic: ['Plant Biology'],
        subject: 'Biology',
        grade: ['9th', '10th'],
        curriculum: ['IGCSE'],
        level: ['IGCSE'],
        board: ['Cambridge'],
        difficulty: 'Foundation',
        year: [2023],
        paperType: ['Theory'],
        paperCode: ['0610/11'],
        attempt: [1],
        syllabusCode: ['0610'],
        syllabusType: ['Core'],
        variant: [1],
        marks: 2,
        estimatedTime: 60,
        tags: ['plants', 'photosynthesis', 'biology'],
        learningObjectives: ['Understand plant nutrition'],
        difficultyIndex: 0.7,
        discriminationIndex: 0.45,
        bloomsLevel: 'Remember'
      },
      totalAttempts: 245,
      averageScore: 78,
      averageTime: 45,
      skipRate: 5,
      hintUsage: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      questionNumber: 2,
      type: 'question',
      subType: 'long',
      text: 'Explain the process of cellular respiration and its importance in living organisms.',
      marks: 8,
      includeAnswer: true,
      includeDiagram: false,
      subparts: [
        {
          id: 'a',
          partNumber: 'a',
          text: 'Define cellular respiration',
          marks: 2,
          subType: 'short'
        },
        {
          id: 'b',
          partNumber: 'b',
          text: 'Describe the three stages of cellular respiration',
          marks: 4,
          subType: 'long'
        },
        {
          id: 'c',
          partNumber: 'c',
          text: 'Explain why cellular respiration is important for living organisms',
          marks: 2,
          subType: 'short'
        }
      ],
      metadata: {
        topic: ['Cell Biology', 'Respiration'],
        subject: 'Biology',
        grade: ['11th', '12th'],
        curriculum: ['A-Level'],
        level: ['A-Level'],
        board: ['Cambridge'],
        difficulty: 'Higher',
        year: [2023],
        paperType: ['Theory'],
        paperCode: ['9700/12'],
        attempt: [1],
        syllabusCode: ['9700'],
        syllabusType: ['Extended'],
        variant: [2],
        marks: 8,
        estimatedTime: 480,
        tags: ['respiration', 'cells', 'energy', 'ATP'],
        learningObjectives: ['Understand cellular processes'],
        difficultyIndex: 0.4,
        discriminationIndex: 0.65,
        bloomsLevel: 'Understand'
      },
      totalAttempts: 156,
      averageScore: 62,
      averageTime: 420,
      skipRate: 12,
      hintUsage: 34,
      createdAt: '2024-01-10'
    }
  ];

  const getQuestionTypeIcon = (subType?: string) => {
    switch (subType) {
      case 'mcq': return <CheckSquare className="h-4 w-4" />;
      case 'short': return <FileText className="h-4 w-4" />;
      case 'long': return <BookOpen className="h-4 w-4" />;
      case 'numerical': return <Calculator className="h-4 w-4" />;
      case 'diagram': return <ImageIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Foundation': return 'bg-green-500';
      case 'Core': return 'bg-blue-500';
      case 'Extended': return 'bg-orange-500';
      case 'Higher': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedQuestion) {
    return <QuestionAnalytics question={selectedQuestion} onBack={() => setSelectedQuestion(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Bank</h1>
            <p className="text-gray-600">Comprehensive question analytics and management</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-[#007AFF] hover:bg-[#0056CC]">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="col-span-full">
                <Label className="text-gray-700 mb-2 block">Search Questions</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by question text or Q-ID..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-gray-700 mb-2 block">Subject</Label>
                <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Question Type</Label>
                <Select value={filters.questionType} onValueChange={(value) => setFilters({...filters, questionType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="short">Short Answer</SelectItem>
                    <SelectItem value="long">Long Answer</SelectItem>
                    <SelectItem value="numerical">Numerical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Bloom's Level</Label>
                <Select value={filters.bloomsLevel} onValueChange={(value) => setFilters({...filters, bloomsLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remember">Remember</SelectItem>
                    <SelectItem value="understand">Understand</SelectItem>
                    <SelectItem value="apply">Apply</SelectItem>
                    <SelectItem value="analyze">Analyze</SelectItem>
                    <SelectItem value="evaluate">Evaluate</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 mb-2 block">Difficulty Index (0-1)</Label>
                <Slider
                  value={filters.difficulty}
                  onValueChange={(value) => setFilters({...filters, difficulty: value})}
                  max={1}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{filters.difficulty[0]}</span>
                  <span>{filters.difficulty[1]}</span>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Discrimination Index (-1 to +1)</Label>
                <Slider
                  value={filters.discrimination}
                  onValueChange={(value) => setFilters({...filters, discrimination: value})}
                  min={-1}
                  max={1}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{filters.discrimination[0]}</span>
                  <span>{filters.discrimination[1]}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Questions ({mockQuestions.length})</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table View
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                >
                  Card View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Q-ID</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQuestions.map((question) => (
                  <TableRow key={question.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      Q{question.questionNumber.toString().padStart(3, '0')}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate">{question.text}</div>
                      {question.subparts && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {question.subparts.length} parts
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getQuestionTypeIcon(question.subType)}
                        <span className="capitalize">{question.subType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.metadata?.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getDifficultyColor(question.metadata?.difficulty)} text-white`}>
                        {question.metadata?.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>{question.averageScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{question.totalAttempts}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedQuestion(question)}
                        className="text-[#007AFF] border-[#007AFF] hover:bg-[#007AFF] hover:text-white"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionBank;
