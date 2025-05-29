
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowLeft,
  TrendingUp,
  Clock,
  Users,
  Target,
  Brain,
  BarChart3,
  PieChart,
  Eye,
  SkipForward,
  HelpCircle,
  Download,
  Filter,
  Calendar as CalendarIcon,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Settings
} from 'lucide-react';
import { EnhancedQuestion, AnalyticsFilters, QuestionAnalytics } from '@/types/question';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AdvancedQuestionAnalyticsProps {
  question: EnhancedQuestion;
  onBack: () => void;
}

const AdvancedQuestionAnalytics: React.FC<AdvancedQuestionAnalyticsProps> = ({ question, onBack }) => {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
      preset: 'last30days'
    },
    classGroups: [],
    topics: [],
    studentTags: [],
    scoreRange: [0, 100],
    timeRange: [0, 600],
    attemptStatus: [],
    hintUsage: null
  });

  // Mock analytics data
  const analytics: QuestionAnalytics = {
    questionId: question.id,
    totalAttempts: 247,
    averageScore: 73.2,
    successRate: 68.4,
    averageTimeSpent: 142,
    skipRate: 12.6,
    hintUsageRate: 34.8,
    scoreDistribution: [
      { score: 0, count: 8 }, { score: 10, count: 12 }, { score: 20, count: 15 },
      { score: 30, count: 18 }, { score: 40, count: 22 }, { score: 50, count: 28 },
      { score: 60, count: 35 }, { score: 70, count: 42 }, { score: 80, count: 38 },
      { score: 90, count: 29 }, { score: 100, count: 0 }
    ],
    timeDistribution: { min: 45, q1: 98, median: 142, q3: 187, max: 345 },
    attemptsOverTime: [
      { date: '2024-01-01', count: 15 }, { date: '2024-01-02', count: 18 },
      { date: '2024-01-03', count: 22 }, { date: '2024-01-04', count: 19 },
      { date: '2024-01-05', count: 25 }, { date: '2024-01-06', count: 23 },
      { date: '2024-01-07', count: 20 }
    ],
    optionFrequency: [
      { option: 'A', count: 68, isCorrect: true },
      { option: 'B', count: 89, isCorrect: false },
      { option: 'C', count: 45, isCorrect: false },
      { option: 'D', count: 45, isCorrect: false }
    ],
    demographicBreakdown: {
      gender: { male: 45.2, female: 52.1, other: 2.7 },
      region: { 'North': 72.5, 'South': 68.9, 'East': 76.2, 'West': 69.8 },
      tags: { 'At-risk': 58.3, 'High-achiever': 89.7, 'Average': 71.2 }
    },
    bloomsPerformance: [
      { level: 'Remember', averageScore: 82.5 },
      { level: 'Understand', averageScore: 74.2 },
      { level: 'Apply', averageScore: 68.9 },
      { level: 'Analyze', averageScore: 61.7 },
      { level: 'Evaluate', averageScore: 55.3 },
      { level: 'Create', averageScore: 48.9 }
    ],
    recommendations: [
      "Option B chosen incorrectly by 36% of students—consider revising distractor clarity.",
      "High skip rate (12.6%)—add scaffolding hints or prerequisite knowledge check.",
      "Performance varies significantly by region—review curriculum alignment.",
      "Strong discrimination index indicates good question quality."
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDatePreset = (preset: string) => {
    const now = new Date();
    let start: Date;
    
    switch (preset) {
      case 'last7days':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last30days':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'term':
        start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      default:
        return;
    }
    
    setDateRange({ from: start, to: now });
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end: now, preset: preset as any }
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-4">
            <span>Home</span>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>Question Bank</span>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-gray-900">Analytics</span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="outline" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Question Bank
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Question Analytics</h1>
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                  <span>Q{question.questionNumber.toString().padStart(3, '0')}</span>
                  <span>•</span>
                  <span>{question.metadata?.subject}</span>
                  <span>•</span>
                  <span>{question.metadata?.grade}</span>
                  <span>•</span>
                  <span>{question.subType?.toUpperCase()}</span>
                  <span>•</span>
                  <span>{question.metadata?.difficulty}</span>
                  <span>•</span>
                  <span>{question.metadata?.bloomsLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Date Range Picker */}
              <div className="flex items-center space-x-2">
                <Select value={filters.dateRange.preset} onValueChange={handleDatePreset}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="term">This term</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-72 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Filters Panel */}
          <div className={cn(
            "transition-all duration-300",
            filtersCollapsed ? "w-12" : "w-80"
          )}>
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={cn("text-lg", filtersCollapsed && "hidden")}>
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiltersCollapsed(!filtersCollapsed)}
                  >
                    {filtersCollapsed ? <ChevronRight className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              {!filtersCollapsed && (
                <CardContent className="space-y-6">
                  {/* Class/Group Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Class/Group</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="9a">9A - Advanced</SelectItem>
                        <SelectItem value="9b">9B - Standard</SelectItem>
                        <SelectItem value="10a">10A - Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Topic Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Topic</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topics" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photosynthesis">Photosynthesis</SelectItem>
                        <SelectItem value="respiration">Cellular Respiration</SelectItem>
                        <SelectItem value="genetics">Genetics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Student Tags */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Student Tags</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="at-risk" />
                        <Label htmlFor="at-risk" className="text-sm">At-risk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="high-achiever" />
                        <Label htmlFor="high-achiever" className="text-sm">High-achiever</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="average" />
                        <Label htmlFor="average" className="text-sm">Average</Label>
                      </div>
                    </div>
                  </div>

                  {/* Score Range */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Score Range (%)</Label>
                    <Slider
                      value={filters.scoreRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, scoreRange: value as [number, number] }))}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{filters.scoreRange[0]}%</span>
                      <span>{filters.scoreRange[1]}%</span>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Time Spent (seconds)</Label>
                    <Slider
                      value={filters.timeRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, timeRange: value as [number, number] }))}
                      max={600}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{filters.timeRange[0]}s</span>
                      <span>{filters.timeRange[1]}s</span>
                    </div>
                  </div>

                  {/* Apply/Reset Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Apply</Button>
                    <Button variant="outline" size="sm" className="flex-1">Reset</Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Main Analytics Area */}
          <div className="flex-1 space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-[#007AFF] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analytics.totalAttempts}</div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                  <div className="text-xs text-green-600 mt-1">↗ +12%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${getScoreColor(analytics.averageScore)}`}>
                    {analytics.averageScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                  <div className="text-xs text-green-600 mt-1">↗ +3.2%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${getScoreColor(analytics.successRate)}`}>
                    {analytics.successRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                  <div className="text-xs text-green-600 mt-1">↗ +1.8%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analytics.averageTimeSpent}s</div>
                  <div className="text-sm text-gray-600">Avg. Time</div>
                  <div className="text-xs text-red-600 mt-1">↘ +8s</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <SkipForward className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analytics.skipRate.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Skip Rate</div>
                  <div className="text-xs text-red-600 mt-1">↗ +2.1%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <HelpCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analytics.hintUsageRate.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Hint Usage</div>
                  <div className="text-xs text-green-600 mt-1">↘ -1.4%</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive histogram with mean/median markers</p>
                      <div className="text-sm mt-2">
                        Mean: {analytics.averageScore.toFixed(1)}% | Median: 75.0% | Mode: 70%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-2" />
                      <p>Box plot: Time-on-question analysis</p>
                      <div className="text-sm mt-2">
                        Min: {analytics.timeDistribution.min}s | 
                        Q1: {analytics.timeDistribution.q1}s | 
                        Median: {analytics.timeDistribution.median}s | 
                        Q3: {analytics.timeDistribution.q3}s | 
                        Max: {analytics.timeDistribution.max}s
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Psychometric Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Item Characteristic Curve</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <p>Probability correct vs. student ability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Option Frequency Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.optionFrequency && (
                    <div className="space-y-3">
                      {analytics.optionFrequency.map((option) => (
                        <div key={option.option} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Option {option.option}</span>
                            {option.isCorrect && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${option.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${(option.count / analytics.totalAttempts) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {((option.count / analytics.totalAttempts) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Attempts Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Daily attempt counts and engagement trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cognitive Level Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bloom's Taxonomy Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.bloomsPerformance.map((level) => (
                      <div key={level.level} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{level.level}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#007AFF] h-2 rounded-full" 
                              style={{ width: `${level.averageScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(level.averageScore)}`}>
                            {level.averageScore.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demographic Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">By Student Tags</h4>
                      <div className="space-y-2">
                        {Object.entries(analytics.demographicBreakdown.tags).map(([tag, score]) => (
                          <div key={tag} className="flex items-center justify-between">
                            <span className="text-sm">{tag}</span>
                            <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                              {score.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actionable Insights Panel */}
          <div className="w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Actionable Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.recommendations.map((rec, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{rec}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      Clone Question
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Metadata
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Assign Remediation
                    </Button>
                    <Button className="w-full bg-[#007AFF] hover:bg-[#0056CC]">
                      Schedule Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedQuestionAnalytics;
