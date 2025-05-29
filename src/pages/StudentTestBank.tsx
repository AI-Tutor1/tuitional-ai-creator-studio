
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Play, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Star,
  BarChart3
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

interface StudentTestData {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  questionCount: number;
  totalMarks: number;
  instructor: string;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  timeSpent?: number;
  attemptsUsed?: number;
  maxAttempts?: number;
  difficulty: string;
  topics: string[];
}

const StudentTestBank = () => {
  const [activeTab, setActiveTab] = useState('assigned');

  const mockTests: StudentTestData[] = [
    {
      id: '1',
      title: 'Photosynthesis and Plant Biology',
      subject: 'Biology',
      grade: '10th',
      duration: 90,
      questionCount: 25,
      totalMarks: 50,
      instructor: 'Dr. Sarah Johnson',
      dueDate: '2024-02-15',
      status: 'not-started',
      maxAttempts: 2,
      attemptsUsed: 0,
      difficulty: 'Medium',
      topics: ['Photosynthesis', 'Plant Structure', 'Cellular Respiration']
    },
    {
      id: '2',
      title: 'Algebraic Equations Fundamentals',
      subject: 'Mathematics',
      grade: '9th',
      duration: 60,
      questionCount: 18,
      totalMarks: 40,
      instructor: 'Prof. Michael Chen',
      dueDate: '2024-02-12',
      status: 'in-progress',
      timeSpent: 35,
      maxAttempts: 1,
      attemptsUsed: 1,
      difficulty: 'Easy',
      topics: ['Linear Equations', 'Quadratic Equations', 'Systems of Equations']
    },
    {
      id: '3',
      title: 'Chemical Reactions and Stoichiometry',
      subject: 'Chemistry',
      grade: '11th',
      duration: 120,
      questionCount: 30,
      totalMarks: 75,
      instructor: 'Dr. Emma Wilson',
      dueDate: '2024-02-10',
      status: 'completed',
      score: 68,
      timeSpent: 105,
      maxAttempts: 1,
      attemptsUsed: 1,
      difficulty: 'Hard',
      topics: ['Chemical Reactions', 'Stoichiometry', 'Balancing Equations']
    }
  ];

  const completedTests = mockTests.filter(test => test.status === 'completed');
  const averageScore = completedTests.length > 0 
    ? Math.round(completedTests.reduce((sum, test) => sum + (test.score || 0), 0) / completedTests.length)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Test Bank</h1>
          <p className="text-gray-400">Track your test progress and performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Tests</p>
                  <p className="text-3xl font-bold text-white">{mockTests.length}</p>
                </div>
                <FileText className="h-8 w-8 text-[#38B6FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-white">{completedTests.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Average Score</p>
                  <p className="text-3xl font-bold text-white">{averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-3xl font-bold text-white">
                    {mockTests.filter(t => t.status !== 'completed').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="assigned">Assigned Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockTests.filter(test => test.status !== 'completed').map((test) => (
                <Card key={test.id} className="bg-[#2A2A2A] border-gray-700 hover:border-[#38B6FF] transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                          {test.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>{test.subject}</span>
                          <span>•</span>
                          <span>{test.grade}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${getStatusColor(test.status)} text-white flex items-center space-x-1`}
                          >
                            {getStatusIcon(test.status)}
                            <span className="capitalize">
                              {test.status.replace('-', ' ')}
                            </span>
                          </Badge>
                          <Badge className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Test Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock className="mr-2 h-4 w-4" />
                        {test.duration} mins
                      </div>
                      <div className="flex items-center text-gray-400">
                        <FileText className="mr-2 h-4 w-4" />
                        {test.questionCount} questions
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="mr-2 h-4 w-4" />
                        {test.instructor}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="mr-2 h-4 w-4" />
                        Due: {new Date(test.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Topics */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Topics:</p>
                      <div className="flex flex-wrap gap-1">
                        {test.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {topic}
                          </Badge>
                        ))}
                        {test.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            +{test.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Progress for in-progress tests */}
                    {test.status === 'in-progress' && test.timeSpent && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            {test.timeSpent}/{test.duration} mins
                          </span>
                        </div>
                        <Progress value={(test.timeSpent / test.duration) * 100} />
                      </div>
                    )}

                    {/* Attempts */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Attempts</span>
                      <span className="text-white">
                        {test.attemptsUsed}/{test.maxAttempts}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {test.status === 'not-started' && (
                        <Link to={`/test-taking/${test.id}`}>
                          <Button className="w-full bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
                            <Play className="mr-2 h-4 w-4" />
                            Start Test
                          </Button>
                        </Link>
                      )}
                      {test.status === 'in-progress' && (
                        <Link to={`/test-taking/${test.id}`}>
                          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Continue Test
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedTests.map((test) => (
                <Card key={test.id} className="bg-[#2A2A2A] border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                          {test.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{test.subject}</span>
                          <span>•</span>
                          <span>{test.grade}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Score Display */}
                    <div className="text-center p-4 bg-[#1E1E1E] rounded-lg">
                      <div className="text-3xl font-bold text-[#38B6FF] mb-1">
                        {test.score}/{test.totalMarks}
                      </div>
                      <div className="text-lg text-gray-400">
                        {Math.round((test.score! / test.totalMarks) * 100)}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Completed in {test.timeSpent} mins
                      </div>
                    </div>

                    {/* Test Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <FileText className="mr-2 h-4 w-4" />
                        {test.questionCount} questions
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="mr-2 h-4 w-4" />
                        {test.instructor}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to={`/test-results/${test.id}`}>
                        <Button variant="outline" className="w-full border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Detailed Results
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#2A2A2A] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Overall Average</span>
                      <span className="text-2xl font-bold text-[#38B6FF]">{averageScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tests Completed</span>
                      <span className="text-lg text-white">{completedTests.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Best Score</span>
                      <span className="text-lg text-green-400">
                        {completedTests.length > 0 
                          ? `${Math.max(...completedTests.map(t => Math.round((t.score! / t.totalMarks) * 100)))}%`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Biology', 'Mathematics', 'Chemistry'].map((subject) => {
                      const subjectTests = completedTests.filter(t => t.subject === subject);
                      const subjectAverage = subjectTests.length > 0
                        ? Math.round(subjectTests.reduce((sum, test) => sum + (test.score! / test.totalMarks * 100), 0) / subjectTests.length)
                        : 0;
                      
                      return (
                        <div key={subject} className="flex justify-between items-center">
                          <span className="text-gray-400">{subject}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white">{subjectAverage}%</span>
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-[#38B6FF] h-2 rounded-full" 
                                style={{ width: `${subjectAverage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentTestBank;
