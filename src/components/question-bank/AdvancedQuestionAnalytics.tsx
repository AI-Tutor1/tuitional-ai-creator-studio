import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Download,
  TrendingUp,
  Users,
  Clock,
  Target,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Star,
  Lightbulb
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface AdvancedQuestionAnalyticsProps {
  questionId: string;
  onBack: () => void;
}

const AdvancedQuestionAnalytics: React.FC<AdvancedQuestionAnalyticsProps> = ({ questionId, onBack }) => {
  const [dateRange, setDateRange] = useState('last30days');
  const [selectedFilters, setSelectedFilters] = useState({
    classGroups: [] as string[],
    topics: [] as string[],
    studentTags: [] as string[]
  });

  // Mock analytics data
  const questionData = {
    id: questionId,
    title: 'What is the primary function of chlorophyll in photosynthesis?',
    subject: 'Biology',
    grade: '10th',
    type: 'MCQ',
    difficulty: 'Easy',
    bloomsLevel: 'Remember',
    marks: 2,
    estimatedTime: 60,
    curriculum: 'IGCSE',
    board: 'Cambridge',
    paperCode: '0610/11'
  };

  const kpiData = {
    totalAttempts: 247,
    averageScore: 73.2,
    successRate: 68.4,
    averageTime: 142,
    skipRate: 12.6,
    hintUsage: 34.8
  };

  const performanceDistribution = [
    { score: '0-20', count: 12, percentage: 4.9 },
    { score: '21-40', count: 18, percentage: 7.3 },
    { score: '41-60', count: 35, percentage: 14.2 },
    { score: '61-80', count: 89, percentage: 36.0 },
    { score: '81-100', count: 93, percentage: 37.7 }
  ];

  const timeDistribution = {
    min: 45,
    q1: 95,
    median: 142,
    q3: 180,
    max: 300
  };

  const attemptsOverTime = [
    { date: '2024-01-01', attempts: 12 },
    { date: '2024-01-02', attempts: 15 },
    { date: '2024-01-03', attempts: 18 },
    { date: '2024-01-04', attempts: 22 },
    { date: '2024-01-05', attempts: 19 },
    { date: '2024-01-06', attempts: 25 },
    { date: '2024-01-07', attempts: 28 }
  ];

  const optionFrequency = [
    { option: 'A', text: 'Absorbing light energy', count: 169, percentage: 68.4, isCorrect: true },
    { option: 'B', text: 'Storing glucose', count: 45, percentage: 18.2, isCorrect: false },
    { option: 'C', text: 'Producing oxygen', count: 23, percentage: 9.3, isCorrect: false },
    { option: 'D', text: 'Breaking down water', count: 10, percentage: 4.1, isCorrect: false }
  ];

  const demographicData = {
    gender: { male: 52.3, female: 47.7, other: 0 },
    region: {
      'North America': 35.2,
      'Europe': 28.7,
      'Asia': 24.3,
      'Other': 11.8
    },
    tags: {
      'High Achiever': 78.5,
      'Average': 65.2,
      'At Risk': 45.8
    }
  };

  const bloomsPerformance = [
    { level: 'Remember', averageScore: 73.2 },
    { level: 'Understand', averageScore: 68.9 },
    { level: 'Apply', averageScore: 62.1 },
    { level: 'Analyze', averageScore: 58.7 }
  ];

  const recommendations = [
    'Option B (Storing glucose) is chosen incorrectly by 18.2% of students. Consider revising the distractor to make it less appealing.',
    'Students with "At Risk" tag show significantly lower performance (45.8%). Consider adding scaffolding hints.',
    'Question shows good discrimination (0.45) but could benefit from slightly higher difficulty for advanced students.',
    'Time spent varies widely (45-300s). Consider providing time management guidance.'
  ];

  const pieColors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <nav className="text-sm text-gray-500 mb-1">
                  Home / Question Bank / Analytics
                </nav>
                <h1 className="text-2xl font-bold text-gray-900">{questionData.title}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{questionData.subject}</Badge>
                  <Badge variant="outline">{questionData.grade}</Badge>
                  <Badge variant="outline">{questionData.type}</Badge>
                  <Badge className="bg-green-100 text-green-800">{questionData.difficulty}</Badge>
                  <Badge variant="outline">{questionData.bloomsLevel}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Last 30 days
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="p-4">
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Last 7 days
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Last 30 days
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        This term
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Custom range
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Filters Panel */}
          <div className="w-80 bg-white rounded-lg shadow-sm border h-fit">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Class Groups</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="10a">Class 10A</SelectItem>
                      <SelectItem value="10b">Class 10B</SelectItem>
                      <SelectItem value="10c">Class 10C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Student Tags</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="high">High Achievers</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Score Range</label>
                  <div className="text-sm text-gray-500">0% - 100%</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time Range</label>
                  <div className="text-sm text-gray-500">30s - 300s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Analytics Area */}
          <div className="flex-1">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Total Attempts</p>
                      <p className="text-2xl font-bold text-gray-900">{kpiData.totalAttempts}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Average Score</p>
                      <p className="text-2xl font-bold text-green-600">{kpiData.averageScore}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Success Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{kpiData.successRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Time</p>
                      <p className="text-2xl font-bold text-purple-600">{kpiData.averageTime}s</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Skip Rate</p>
                      <p className="text-2xl font-bold text-orange-600">{kpiData.skipRate}%</p>
                    </div>
                    <XCircle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Hint Usage</p>
                      <p className="text-2xl font-bold text-indigo-600">{kpiData.hintUsage}%</p>
                    </div>
                    <Lightbulb className="h-8 w-8 text-indigo-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Analytics Tabs */}
            <Tabs defaultValue="performance" className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="psychometric">Psychometric</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-6">
                {/* Performance Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Score Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={performanceDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="score" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#007AFF" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Time Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{timeDistribution.median}s</div>
                          <div className="text-sm text-gray-500">Median Time</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="font-semibold">{timeDistribution.min}s</div>
                            <div className="text-xs text-gray-500">Min</div>
                          </div>
                          <div>
                            <div className="font-semibold">{timeDistribution.q1}s</div>
                            <div className="text-xs text-gray-500">Q1</div>
                          </div>
                          <div>
                            <div className="font-semibold">{timeDistribution.q3}s</div>
                            <div className="text-xs text-gray-500">Q3</div>
                          </div>
                          <div>
                            <div className="font-semibold">{timeDistribution.max}s</div>
                            <div className="text-xs text-gray-500">Max</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attempts Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={attemptsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="attempts" stroke="#007AFF" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="psychometric" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Option Frequency Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {optionFrequency.map((option) => (
                        <div key={option.option} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                              option.isCorrect ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              {option.option}
                            </div>
                            <div>
                              <div className="font-medium">{option.text}</div>
                              <div className="text-sm text-gray-500">
                                {option.count} students ({option.percentage}%)
                              </div>
                            </div>
                          </div>
                          {option.isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Gender</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Male</span>
                          <span className="font-semibold">{demographicData.gender.male}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Female</span>
                          <span className="font-semibold">{demographicData.gender.female}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Region</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(demographicData.region).map(([region, score]) => (
                          <div key={region} className="flex justify-between">
                            <span>{region}</span>
                            <span className="font-semibold">{score}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Student Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(demographicData.tags).map(([tag, score]) => (
                          <div key={tag} className="flex justify-between">
                            <span>{tag}</span>
                            <span className="font-semibold">{score}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-blue-500" />
                      AI-Generated Insights & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Star className="mr-2 h-4 w-4" />
                          Clone Question
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Target className="mr-2 h-4 w-4" />
                          Edit Metadata
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Activity className="mr-2 h-4 w-4" />
                          Assign Remediation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quality Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Difficulty Index</span>
                          <span className="font-semibold">0.73</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discrimination</span>
                          <span className="font-semibold">0.45</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reliability</span>
                          <span className="font-semibold text-green-600">High</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedQuestionAnalytics;
