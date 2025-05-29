import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  BookOpen, 
  Clock, 
  Users, 
  BarChart3, 
  Settings,
  Edit,
  Copy,
  Trash2,
  Eye,
  Send,
  Filter,
  Calendar,
  Target,
  FileText,
  CheckSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TestEditModal from '@/components/test/TestEditModal';

interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number;
  totalMarks: number;
  totalQuestions: number;
  assignedStudents: number;
  completedSubmissions: number;
  averageScore: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  version: number;
  originalTestId?: string;
  questions: Array<{
    id: string;
    type: 'mcq' | 'short-answer' | 'essay';
    question: string;
    options?: string[];
    marks: number;
  }>;
}

const TeacherTestBank = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('my-tests');
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  // Mock test data with versions
  const [tests, setTests] = useState<Test[]>([
    {
      id: 'test_1',
      title: 'Photosynthesis and Plant Biology',
      subject: 'Biology',
      description: 'Comprehensive test covering photosynthesis processes, plant anatomy, and cellular respiration.',
      duration: 90,
      totalMarks: 50,
      totalQuestions: 15,
      assignedStudents: 28,
      completedSubmissions: 25,
      averageScore: 78.5,
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      version: 1,
      questions: [
        {
          id: '1',
          type: 'mcq',
          question: 'What is the primary function of chlorophyll in photosynthesis?',
          options: ['Absorbing light energy', 'Storing glucose', 'Producing oxygen', 'Breaking down water'],
          marks: 2
        },
        {
          id: '2',
          type: 'short-answer',
          question: 'Explain the difference between photosynthesis and cellular respiration.',
          marks: 6
        }
      ]
    },
    {
      id: 'test_1_v2',
      title: 'Photosynthesis and Plant Biology (Updated)',
      subject: 'Biology',
      description: 'Updated version with additional questions on cellular respiration and improved formatting.',
      duration: 90,
      totalMarks: 60,
      totalQuestions: 18,
      assignedStudents: 0,
      completedSubmissions: 0,
      averageScore: 0,
      status: 'draft',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      version: 2,
      originalTestId: 'test_1',
      questions: [
        {
          id: '1',
          type: 'mcq',
          question: 'What is the primary function of chlorophyll in photosynthesis?',
          options: ['Absorbing light energy', 'Storing glucose', 'Producing oxygen', 'Breaking down water'],
          marks: 2
        },
        {
          id: '2',
          type: 'short-answer',
          question: 'Explain the difference between photosynthesis and cellular respiration.',
          marks: 6
        },
        {
          id: '3',
          type: 'essay',
          question: 'Describe the complete process of photosynthesis including light and dark reactions.',
          marks: 10
        }
      ]
    }
  ]);

  const handleEditTest = (test: Test) => {
    setEditingTest(test);
  };

  const handleSaveEditedTest = (editedTest: Test) => {
    setTests(prev => [...prev, editedTest]);
    setEditingTest(null);
    
    toast({
      title: "Test Updated",
      description: `New version ${editedTest.version} of "${editedTest.title}" has been created.`,
    });
  };

  const handleDuplicateTest = (test: Test) => {
    const duplicatedTest: Test = {
      ...test,
      id: `${test.id}_copy_${Date.now()}`,
      title: `${test.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      assignedStudents: 0,
      completedSubmissions: 0,
      averageScore: 0,
      version: 1,
      originalTestId: undefined
    };

    setTests(prev => [...prev, duplicatedTest]);
    
    toast({
      title: "Test Duplicated",
      description: `"${duplicatedTest.title}" has been added to your drafts.`,
    });
  };

  const handleDeleteTest = (testId: string) => {
    setTests(prev => prev.filter(test => test.id !== testId));
    
    toast({
      title: "Test Deleted",
      description: "The test has been permanently removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return <CheckSquare className="h-4 w-4 text-blue-500" />;
      case 'short-answer': return <Edit className="h-4 w-4 text-green-500" />;
      case 'essay': return <BookOpen className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredTests = tests.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Test Bank</h1>
              <p className="text-gray-600">Create, manage, and analyze your tests</p>
            </div>
            <Button className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create New Test
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tests by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="my-tests">My Tests ({tests.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="my-tests" className="space-y-6">
              {/* Test Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <Card key={test.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{test.title}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(test.status)}>
                              {test.status}
                            </Badge>
                            {test.version > 1 && (
                              <Badge variant="outline">
                                v{test.version}
                              </Badge>
                            )}
                            {test.originalTestId && (
                              <Badge variant="outline" className="text-xs">
                                Based on: {test.originalTestId}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{test.subject}</span>
                        <span>Updated {test.updatedAt}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Test Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{test.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{test.totalMarks} marks</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{test.totalQuestions} questions</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{test.assignedStudents} students</span>
                        </div>
                      </div>

                      {/* Question Types */}
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500 font-medium">Question Types:</div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(test.questions.map(q => q.type))).map((type) => (
                            <div key={type} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                              {getQuestionTypeIcon(type)}
                              <span className="capitalize">{type.replace('-', ' ')}</span>
                              <span>({test.questions.filter(q => q.type === type).length})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Performance Stats */}
                      {test.status === 'published' && test.completedSubmissions > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Avg. Score:</span>
                            <span className="font-medium">{test.averageScore}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Submissions:</span>
                            <span>{test.completedSubmissions}/{test.assignedStudents}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditTest(test)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDuplicateTest(test)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {test.status === 'published' ? (
                          <Button variant="outline" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analytics
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
                            <Send className="mr-2 h-4 w-4" />
                            Publish
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Test Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Test Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Template library coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Test Modal */}
      {editingTest && (
        <TestEditModal
          test={editingTest}
          onClose={() => setEditingTest(null)}
          onSave={handleSaveEditedTest}
        />
      )}
    </div>
  );
};

export default TeacherTestBank;
