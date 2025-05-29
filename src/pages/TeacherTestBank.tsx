
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  BarChart3,
  Copy,
  Share2,
  Calendar,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface TestData {
  id: string;
  title: string;
  code: string;
  subject: string;
  grade: string;
  questionCount: number;
  totalMarks: number;
  duration: number;
  createdBy: string;
  createdDate: string;
  status: 'Draft' | 'Published' | 'Archived';
  assignedStudents: number;
  completedAttempts: number;
  averageScore: number;
  dueDate?: string;
}

const TeacherTestBank = () => {
  const [activeTab, setActiveTab] = useState('all-tests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    status: '',
    dateRange: ''
  });

  const mockTests: TestData[] = [
    {
      id: '1',
      title: 'Photosynthesis and Plant Biology',
      code: 'BIO-101-A',
      subject: 'Biology',
      grade: '10th',
      questionCount: 25,
      totalMarks: 50,
      duration: 90,
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-15',
      status: 'Published',
      assignedStudents: 45,
      completedAttempts: 38,
      averageScore: 76.5,
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Algebraic Equations Fundamentals',
      code: 'MATH-201-B',
      subject: 'Mathematics',
      grade: '9th',
      questionCount: 18,
      totalMarks: 40,
      duration: 60,
      createdBy: 'Prof. Michael Chen',
      createdDate: '2024-01-12',
      status: 'Draft',
      assignedStudents: 0,
      completedAttempts: 0,
      averageScore: 0
    },
    {
      id: '3',
      title: 'Chemical Reactions and Stoichiometry',
      code: 'CHEM-301-C',
      subject: 'Chemistry',
      grade: '11th',
      questionCount: 30,
      totalMarks: 75,
      duration: 120,
      createdBy: 'Dr. Emma Wilson',
      createdDate: '2024-01-10',
      status: 'Published',
      assignedStudents: 32,
      completedAttempts: 32,
      averageScore: 82.1,
      dueDate: '2024-02-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-600';
      case 'Draft': return 'bg-yellow-600';
      case 'Archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const testStats = {
    totalTests: mockTests.length,
    publishedTests: mockTests.filter(t => t.status === 'Published').length,
    totalStudentsAssigned: mockTests.reduce((sum, test) => sum + test.assignedStudents, 0),
    averageCompletionRate: 84.2
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Teacher Test Bank</h1>
            <p className="text-gray-400">Manage your tests, assignments, and student performance</p>
          </div>
          <Button className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white px-6 py-3 text-lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Test
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Tests</p>
                  <p className="text-3xl font-bold text-white">{testStats.totalTests}</p>
                </div>
                <FileText className="h-8 w-8 text-[#38B6FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Published</p>
                  <p className="text-3xl font-bold text-white">{testStats.publishedTests}</p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Students Assigned</p>
                  <p className="text-3xl font-bold text-white">{testStats.totalStudentsAssigned}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completion Rate</p>
                  <p className="text-3xl font-bold text-white">{testStats.averageCompletionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="all-tests">All Tests</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="all-tests">
            {/* Filters and Search */}
            <Card className="bg-[#2A2A2A] border-gray-700 mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="lg:col-span-2">
                    <Label htmlFor="search" className="text-white mb-2 block">Search Tests</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        placeholder="Search by title or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-[#1E1E1E] border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Subject</Label>
                    <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                      <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2A2A2A] border-gray-600">
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Status</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                      <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2A2A2A] border-gray-600">
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Button variant="outline" className="w-full border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white">
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Table */}
            <Card className="bg-[#2A2A2A] border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Test Name</TableHead>
                      <TableHead className="text-gray-300">Subject</TableHead>
                      <TableHead className="text-gray-300">Questions</TableHead>
                      <TableHead className="text-gray-300">Assigned</TableHead>
                      <TableHead className="text-gray-300">Completed</TableHead>
                      <TableHead className="text-gray-300">Avg Score</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTests.map((test) => (
                      <TableRow key={test.id} className="border-gray-700 hover:bg-[#1E1E1E]">
                        <TableCell className="text-white">
                          <div>
                            <div className="font-medium">{test.title}</div>
                            <div className="text-sm text-gray-400">{test.code}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{test.subject}</TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <FileText className="mr-1 h-4 w-4" />
                            {test.questionCount}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {test.assignedStudents}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{test.completedAttempts}</TableCell>
                        <TableCell className="text-gray-300">
                          {test.averageScore > 0 ? `${test.averageScore}%` : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${getStatusColor(test.status)} text-white`}
                          >
                            {test.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
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
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#2A2A2A] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Test Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTests.filter(t => t.status === 'Published').map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{test.title}</div>
                          <div className="text-sm text-gray-400">{test.completedAttempts}/{test.assignedStudents} completed</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#38B6FF]">{test.averageScore}%</div>
                          <div className="text-sm text-gray-400">avg score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule New Test
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Target className="mr-2 h-4 w-4" />
                      Create Test Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <Card className="bg-[#2A2A2A] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Active Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTests.filter(t => t.status === 'Published' && t.dueDate).map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-white">{test.title}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Due: {new Date(test.dueDate!).toLocaleDateString()} • {test.assignedStudents} students
                        </div>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-400">
                            Progress: {test.completedAttempts}/{test.assignedStudents}
                          </span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-xs">
                            <div 
                              className="bg-[#38B6FF] h-2 rounded-full" 
                              style={{ width: `${(test.completedAttempts / test.assignedStudents) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          <Users className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherTestBank;
