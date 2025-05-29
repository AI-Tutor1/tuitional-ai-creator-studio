
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  Users,
  FileText,
  MoreVertical,
  CheckSquare,
  Calculator,
  Image as ImageIcon,
  BookOpen,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Download,
  RefreshCw,
  Star,
  Copy
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import AdvancedQuestionAnalytics from '@/components/question-bank/AdvancedQuestionAnalytics';
import { EnhancedQuestion } from '@/types/question';

const EnhancedQuestionBank = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [selectedQuestion, setSelectedQuestion] = useState<EnhancedQuestion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    curriculum: '',
    level: '',
    board: '',
    difficulty: '',
    year: '',
    paperType: '',
    questionType: '',
    bloomsLevel: '',
    status: '',
    creator: '',
    tags: [] as string[],
    difficultyRange: [0, 1] as [number, number],
    discriminationRange: [-1, 1] as [number, number],
    dateAdded: '',
    dateModified: ''
  });

  const mockQuestions: EnhancedQuestion[] = [
    {
      id: 'q1',
      questionNumber: 1,
      type: 'question',
      subType: 'mcq',
      text: 'What is the primary function of chlorophyll in photosynthesis?',
      marks: 2,
      includeAnswer: true,
      includeDiagram: false,
      totalAttempts: 247,
      averageScore: 73.2,
      averageTime: 142,
      skipRate: 12.6,
      hintUsage: 34.8,
      successRate: 68.4,
      mcqOptions: [
        { id: '1', text: 'Absorbing light energy', isCorrect: true },
        { id: '2', text: 'Storing glucose', isCorrect: false },
        { id: '3', text: 'Producing oxygen', isCorrect: false },
        { id: '4', text: 'Breaking down water', isCorrect: false }
      ],
      metadata: {
        topic: ['Photosynthesis', 'Plant Biology'],
        subject: 'Biology',
        grade: ['9th', '10th'],
        curriculum: ['IGCSE'],
        level: ['IGCSE'],
        board: ['Cambridge'],
        difficulty: 'Easy',
        year: [2023],
        paperType: ['Theory'],
        paperCode: ['0610/11'],
        attempt: [1],
        syllabusCode: ['0610'],
        syllabusType: ['Core'],
        variant: [1],
        marks: 2,
        estimatedTime: 60,
        tags: ['chlorophyll', 'photosynthesis', 'light'],
        learningObjectives: ['Understand photosynthesis process'],
        difficultyIndex: 0.73,
        discriminationIndex: 0.45,
        bloomsLevel: 'Remember'
      },
      createdAt: '2024-01-15',
      version: 1
    },
    {
      id: 'q2',
      questionNumber: 2,
      type: 'question',
      subType: 'short',
      text: 'Explain the role of stomata in photosynthesis and describe how environmental factors affect their opening and closing.',
      marks: 6,
      includeAnswer: true,
      includeDiagram: false,
      totalAttempts: 189,
      averageScore: 65.8,
      averageTime: 240,
      skipRate: 18.2,
      hintUsage: 42.1,
      successRate: 58.7,
      subparts: [
        {
          id: 'a',
          partNumber: 'a',
          text: 'Define stomata and describe their structure',
          marks: 2,
          subType: 'short'
        },
        {
          id: 'b',
          partNumber: 'b',
          text: 'Explain their role in gas exchange during photosynthesis',
          marks: 2,
          subType: 'short'
        },
        {
          id: 'c',
          partNumber: 'c',
          text: 'Describe how light intensity and CO2 concentration affect stomatal behavior',
          marks: 2,
          subType: 'short'
        }
      ],
      metadata: {
        topic: ['Photosynthesis', 'Plant Structure', 'Gas Exchange'],
        subject: 'Biology',
        grade: ['10th', '11th'],
        curriculum: ['IGCSE'],
        level: ['IGCSE'],
        board: ['Cambridge'],
        difficulty: 'Medium',
        year: [2023],
        paperType: ['Theory'],
        paperCode: ['0610/12'],
        attempt: [1],
        syllabusCode: ['0610'],
        syllabusType: ['Extended'],
        variant: [2],
        marks: 6,
        estimatedTime: 240,
        tags: ['stomata', 'gas exchange', 'environmental factors'],
        learningObjectives: ['Understand plant structures', 'Analyze environmental effects'],
        difficultyIndex: 0.66,
        discriminationIndex: 0.52,
        bloomsLevel: 'Understand'
      },
      createdAt: '2024-01-12',
      version: 1
    },
    {
      id: 'q3',
      questionNumber: 3,
      type: 'question',
      subType: 'numerical',
      text: 'A student investigates the rate of photosynthesis by counting oxygen bubbles produced by aquatic plants under different light intensities. Calculate the rate of photosynthesis given the data.',
      marks: 8,
      includeAnswer: true,
      includeDiagram: true,
      totalAttempts: 156,
      averageScore: 58.4,
      averageTime: 420,
      skipRate: 25.6,
      hintUsage: 61.5,
      successRate: 42.3,
      metadata: {
        topic: ['Photosynthesis', 'Experimental Design', 'Data Analysis'],
        subject: 'Biology',
        grade: ['11th', '12th'],
        curriculum: ['IGCSE', 'A-Level'],
        level: ['IGCSE', 'A-Level'],
        board: ['Cambridge', 'Edexcel'],
        difficulty: 'Hard',
        year: [2023, 2022],
        paperType: ['Theory', 'Practical'],
        paperCode: ['0610/31', '9700/31'],
        attempt: [1, 2],
        syllabusCode: ['0610', '9700'],
        syllabusType: ['Extended', 'Higher'],
        variant: [1, 3],
        marks: 8,
        estimatedTime: 420,
        tags: ['calculation', 'experimental', 'data analysis'],
        learningObjectives: ['Apply mathematical skills', 'Analyze experimental data'],
        difficultyIndex: 0.42,
        discriminationIndex: 0.38,
        bloomsLevel: 'Apply'
      },
      createdAt: '2024-01-10',
      version: 2
    }
  ];

  const getQuestionTypeIcon = (subType?: string) => {
    switch (subType) {
      case 'mcq': return <CheckSquare className="h-4 w-4 text-blue-500" />;
      case 'short': return <FileText className="h-4 w-4 text-green-500" />;
      case 'long': return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'numerical': return <Calculator className="h-4 w-4 text-orange-500" />;
      case 'diagram': return <ImageIcon className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === mockQuestions.length 
        ? [] 
        : mockQuestions.map(q => q.id)
    );
  };

  if (selectedQuestion) {
    return (
      <AdvancedQuestionAnalytics 
        question={selectedQuestion} 
        onBack={() => setSelectedQuestion(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Bank</h1>
            <p className="text-gray-600">Manage and analyze your question collection</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-[#007AFF] hover:bg-[#0056CC] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Question
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search questions by text, code, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {showFilters ? <ChevronDown className="ml-1 h-4 w-4" /> : <ChevronRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-4 border-t">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Subject</Label>
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
                    <Label className="text-sm font-medium mb-2 block">Grade</Label>
                    <Select value={filters.grade} onValueChange={(value) => setFilters({...filters, grade: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Grades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9th">9th Grade</SelectItem>
                        <SelectItem value="10th">10th Grade</SelectItem>
                        <SelectItem value="11th">11th Grade</SelectItem>
                        <SelectItem value="12th">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Curriculum</Label>
                    <Select value={filters.curriculum} onValueChange={(value) => setFilters({...filters, curriculum: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Curricula" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="igcse">IGCSE</SelectItem>
                        <SelectItem value="a-level">A-Level</SelectItem>
                        <SelectItem value="gcse">GCSE</SelectItem>
                        <SelectItem value="o-level">O-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Level</Label>
                    <Select value={filters.level} onValueChange={(value) => setFilters({...filters, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="igcse">IGCSE</SelectItem>
                        <SelectItem value="gcse">GCSE</SelectItem>
                        <SelectItem value="a-level">A-Level</SelectItem>
                        <SelectItem value="o-level">O-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Difficulty</Label>
                    <Select value={filters.difficulty} onValueChange={(value) => setFilters({...filters, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Question Type</Label>
                    <Select value={filters.questionType} onValueChange={(value) => setFilters({...filters, questionType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="long">Long Answer</SelectItem>
                        <SelectItem value="numerical">Numerical</SelectItem>
                        <SelectItem value="diagram">Diagram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium mb-2 block">
                      Difficulty Index: {filters.difficultyRange[0].toFixed(2)} - {filters.difficultyRange[1].toFixed(2)}
                    </Label>
                    <Slider
                      value={filters.difficultyRange}
                      onValueChange={(value) => setFilters({...filters, difficultyRange: value as [number, number]})}
                      max={1}
                      min={0}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium mb-2 block">
                      Discrimination Index: {filters.discriminationRange[0].toFixed(2)} - {filters.discriminationRange[1].toFixed(2)}
                    </Label>
                    <Slider
                      value={filters.discriminationRange}
                      onValueChange={(value) => setFilters({...filters, discriminationRange: value as [number, number]})}
                      max={1}
                      min={-1}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      Reset Filters
                    </Button>
                  </div>

                  <div className="flex items-end">
                    <Button className="w-full bg-[#007AFF] hover:bg-[#0056CC]">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* View Controls and Bulk Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'card' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('card')}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
            
            {selectedQuestions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedQuestions.length} selected
                </span>
                <Button variant="outline" size="sm">
                  <Copy className="mr-1 h-4 w-4" />
                  Clone
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {mockQuestions.length} of {mockQuestions.length} questions</span>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Questions Table/Cards */}
        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedQuestions.length === mockQuestions.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuestions.map((question) => (
                    <TableRow key={question.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedQuestions.includes(question.id)}
                          onCheckedChange={() => handleQuestionSelect(question.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-gray-900 truncate">
                            Q{question.questionNumber.toString().padStart(3, '0')}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {question.text}
                          </div>
                          {question.subparts && (
                            <div className="text-xs text-blue-600 mt-1">
                              {question.subparts.length} subparts
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getQuestionTypeIcon(question.subType)}
                          <span className="text-sm capitalize">{question.subType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{question.metadata?.subject}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{question.metadata?.grade?.join(', ')}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(question.metadata?.difficulty)}>
                          {question.metadata?.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className={`font-medium ${getPerformanceColor(question.averageScore || 0)}`}>
                            {question.averageScore?.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {question.skipRate?.toFixed(1)}% skip
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Users className="mr-1 h-3 w-3" />
                          {question.totalAttempts}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-3 w-3" />
                          {question.averageTime}s
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {question.createdAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedQuestion(question)}
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={selectedQuestions.includes(question.id)}
                        onCheckedChange={() => handleQuestionSelect(question.id)}
                      />
                      <div className="flex items-center space-x-2">
                        {getQuestionTypeIcon(question.subType)}
                        <span className="font-medium text-gray-900">
                          Q{question.questionNumber.toString().padStart(3, '0')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {question.text}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {question.metadata?.subject}
                      </Badge>
                      <Badge className={getDifficultyColor(question.metadata?.difficulty)}>
                        {question.metadata?.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.marks} marks
                      </Badge>
                    </div>

                    {question.subparts && (
                      <div className="text-xs text-blue-600">
                        {question.subparts.length} subparts
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div className="text-center">
                        <div className={`font-medium ${getPerformanceColor(question.averageScore || 0)}`}>
                          {question.averageScore?.toFixed(1)}%
                        </div>
                        <div>Avg. Score</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{question.totalAttempts}</div>
                        <div>Attempts</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{question.averageTime}s</div>
                        <div>Avg. Time</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        Created {question.createdAt}
                      </span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedQuestionBank;
