
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowLeft,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingDown,
  BookOpen,
  Lightbulb,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const TeacherTestAnalytics = () => {
  const { testId } = useParams();

  const mockData = {
    testTitle: 'Photosynthesis and Plant Biology',
    subject: 'Biology',
    grade: '10th',
    totalStudents: 45,
    completedStudents: 43,
    averageScore: 76.5,
    totalMarks: 50,
    testDuration: 90,
    averageTime: 78,
    
    classDistribution: [
      { grade: 'A+', range: '90-100%', count: 8, color: '#10B981' },
      { grade: 'A', range: '85-89%', count: 12, color: '#38B6FF' },
      { grade: 'B+', range: '80-84%', count: 10, color: '#60A5FA' },
      { grade: 'B', range: '75-79%', count: 8, color: '#FBBF24' },
      { grade: 'C+', range: '70-74%', count: 3, color: '#F59E0B' },
      { grade: 'C', range: '65-69%', count: 2, color: '#EF4444' },
      { grade: 'Below C', range: '<65%', count: 0, color: '#DC2626' }
    ],
    
    questionDifficulty: [
      { questionNumber: 1, successRate: 95, avgTime: 45, topic: 'Chlorophyll Functions', difficulty: 'Easy' },
      { questionNumber: 2, successRate: 68, avgTime: 120, topic: 'Organelle Identification', difficulty: 'Medium' },
      { questionNumber: 3, successRate: 42, avgTime: 180, topic: 'Calvin Cycle', difficulty: 'Hard' },
      { questionNumber: 4, successRate: 88, avgTime: 90, topic: 'Light Reactions', difficulty: 'Medium' },
      { questionNumber: 5, successRate: 35, avgTime: 200, topic: 'Cellular Respiration vs Photosynthesis', difficulty: 'Hard' }
    ],
    
    commonErrors: [
      {
        topic: 'Calvin Cycle',
        errorType: 'Confused ATP and NADPH usage',
        frequency: 28,
        affectedStudents: ['John D.', 'Sarah M.', 'Alex R.', '+25 others'],
        impact: 'High',
        recommendation: 'Review energy molecule roles with visual diagrams'
      },
      {
        topic: 'Organelle Functions',
        errorType: 'Mixed up chloroplast and mitochondria locations',
        frequency: 18,
        affectedStudents: ['Emma L.', 'David K.', 'Lisa P.', '+15 others'],
        impact: 'Medium',
        recommendation: 'Use comparative organelle structure activity'
      },
      {
        topic: 'Chemical Equations',
        errorType: 'Incorrect balancing of photosynthesis equation',
        frequency: 12,
        affectedStudents: ['Mike T.', 'Anna S.', '+10 others'],
        impact: 'Medium',
        recommendation: 'Practice chemical equation balancing exercises'
      }
    ],
    
    teachingInsights: [
      {
        category: 'Conceptual Understanding',
        finding: 'Students struggle with energy transformation concepts',
        evidence: '65% scored below average on ATP/NADPH questions',
        action: 'Implement energy molecule visualization activities',
        priority: 'High'
      },
      {
        category: 'Time Management',
        finding: 'Students spending too much time on essay questions',
        evidence: 'Average 180s on complex questions vs 120s target',
        action: 'Practice timed essay writing techniques',
        priority: 'Medium'
      },
      {
        category: 'Application Skills',
        finding: 'Strong recall but weak application of concepts',
        evidence: '90% success on definition questions, 45% on application',
        action: 'Increase problem-solving practice scenarios',
        priority: 'High'
      }
    ],
    
    studentFlags: [
      { name: 'Alex Rodriguez', score: 28, percentage: 56, flag: 'Below average', concern: 'Struggling with core concepts' },
      { name: 'Emma Thompson', score: 31, percentage: 62, flag: 'Needs support', concern: 'Time management issues' },
      { name: 'Michael Chen', score: 49, percentage: 98, flag: 'Exceptional', concern: 'Consider advanced materials' }
    ]
  };

  const chartConfig = {
    successRate: {
      label: "Success Rate",
      color: "#10B981",
    },
    count: {
      label: "Students",
      color: "#38B6FF",
    },
    avgTime: {
      label: "Average Time",
      color: "#F59E0B",
    },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'Exceptional': return 'bg-green-600 text-white';
      case 'Above average': return 'bg-blue-600 text-white';
      case 'Below average': return 'bg-yellow-600 text-white';
      case 'Needs support': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Header */}
      <div className="bg-[#2A2A2A] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link to="/teacher-test-bank">
                <Button variant="ghost" className="text-gray-400 hover:text-white mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Test Bank
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Test Analytics Dashboard</h1>
                <p className="text-gray-400">{mockData.testTitle} • {mockData.subject}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-600 text-white">
                {mockData.completedStudents}/{mockData.totalStudents} completed
              </Badge>
              <Badge className="bg-green-600 text-white">
                {mockData.averageScore}% avg
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round((mockData.completedStudents / mockData.totalStudents) * 100)}%
                  </p>
                </div>
                <Users className="h-8 w-8 text-[#38B6FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Class Average</p>
                  <p className="text-2xl font-bold text-white">{mockData.averageScore}%</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Time</p>
                  <p className="text-2xl font-bold text-white">{mockData.averageTime}min</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Students Flagged</p>
                  <p className="text-2xl font-bold text-white">{mockData.studentFlags.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Grade Distribution */}
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={mockData.classDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                  >
                    {mockData.classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Question Difficulty Analysis */}
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                Question Success Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={mockData.questionDifficulty}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="questionNumber" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="successRate" fill="var(--color-successRate)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Common Errors Analysis */}
        <Card className="bg-[#2A2A2A] border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Common Error Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockData.commonErrors.map((error, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{error.topic}</h3>
                        <Badge className={error.impact === 'High' ? 'bg-red-600' : 'bg-yellow-600'}>
                          {error.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-2">{error.errorType}</p>
                      <p className="text-gray-400 text-sm">
                        Affected {error.frequency} students: {error.affectedStudents.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">{error.frequency}</div>
                      <div className="text-gray-400 text-sm">students</div>
                    </div>
                  </div>
                  <div className="bg-[#1E1E1E] p-4 rounded border-l-4 border-blue-500">
                    <div className="text-sm text-gray-400 mb-1">Recommended Action:</div>
                    <div className="text-blue-300">{error.recommendation}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Insights */}
        <Card className="bg-[#2A2A2A] border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Teaching Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockData.teachingInsights.map((insight, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{insight.category}</h3>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Finding:</div>
                      <div className="text-gray-300 text-sm">{insight.finding}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Evidence:</div>
                      <div className="text-gray-300 text-sm">{insight.evidence}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Recommended Action:</div>
                      <div className="text-blue-300 text-sm">{insight.action}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Flags */}
        <Card className="bg-[#2A2A2A] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Students Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.studentFlags.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-white font-medium">{student.name}</div>
                      <div className="text-gray-400 text-sm">{student.concern}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-white font-semibold">{student.percentage}%</div>
                      <div className="text-gray-400 text-sm">{student.score}/{mockData.totalMarks}</div>
                    </div>
                    <Badge className={getFlagColor(student.flag)}>
                      {student.flag}
                    </Badge>
                    <Link to={`/test-performance/${testId}/student/student-${index + 1}`}>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link to="/teacher-test-bank">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Test Bank
            </Button>
          </Link>
          <Button className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Generate Lesson Plan
          </Button>
          <Button variant="outline" className="border-green-600 text-green-300 hover:bg-green-700">
            <TrendingDown className="mr-2 h-4 w-4" />
            Export Analytics
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherTestAnalytics;
