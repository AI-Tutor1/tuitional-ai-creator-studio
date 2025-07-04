
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  HelpCircle
} from 'lucide-react';
import { EnhancedQuestion } from '@/types/question';

interface QuestionAnalyticsProps {
  question?: EnhancedQuestion;
  onBack?: () => void;
}

const QuestionAnalytics: React.FC<QuestionAnalyticsProps> = ({ question, onBack }) => {
  // Dummy data for the question if none provided
  const dummyQuestion: EnhancedQuestion = {
    id: 'q-001',
    questionNumber: 15,
    type: 'question',
    subType: 'mcq',
    text: 'Which of the following best describes the process of photosynthesis in plants?',
    marks: 4,
    includeAnswer: true,
    includeDiagram: false,
    mcqOptions: [
      { id: 'a', text: 'The conversion of light energy into chemical energy using carbon dioxide and water', isCorrect: true },
      { id: 'b', text: 'The breakdown of glucose to release energy for cellular processes', isCorrect: false },
      { id: 'c', text: 'The transport of nutrients through the plant vascular system', isCorrect: false },
      { id: 'd', text: 'The absorption of minerals from soil through root systems', isCorrect: false }
    ],
    metadata: {
      topic: ['Photosynthesis', 'Plant Biology'],
      subject: 'Biology',
      grade: ['10th', '11th'],
      curriculum: ['IGCSE', 'GCSE'],
      level: ['Extended'],
      board: ['Cambridge', 'Edexcel'],
      difficulty: 'Medium',
      year: [2023, 2024],
      paperType: ['Theory'],
      paperCode: ['0610/21'],
      attempt: [1],
      syllabusCode: ['0610'],
      syllabusType: ['Extended'],
      variant: [1, 2],
      estimatedTime: 120,
      tags: ['chloroplast', 'light reactions', 'calvin cycle'],
      learningObjectives: ['Understand photosynthesis process', 'Identify plant cellular processes'],
      difficultyIndex: 0.65,
      discriminationIndex: 0.42,
      bloomsLevel: 'Understanding'
    },
    totalAttempts: 2847,
    averageScore: 68,
    averageTime: 95,
    skipRate: 12,
    hintUsage: 23,
    successRate: 68,
    viewCount: 3200,
    completionRate: 88
  };

  // Use provided question or dummy data
  const currentQuestion = question || dummyQuestion;

  // Default onBack function if none provided
  const handleBack = onBack || (() => {
    console.log('Back button clicked - implement navigation logic');
    window.history.back();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Question Bank
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Question Analytics</h1>
            <p className="text-gray-600">Q{currentQuestion.questionNumber.toString().padStart(3, '0')} - {currentQuestion.metadata?.subject}</p>
          </div>
        </div>

        {/* Question Preview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Question {currentQuestion.questionNumber}</h3>
                <Badge className="bg-[#007AFF] text-white">
                  {currentQuestion.marks} marks
                </Badge>
              </div>
              <p className="text-gray-800 mb-4">{currentQuestion.text}</p>
              
              {currentQuestion.mcqOptions && (
                <div className="space-y-2">
                  {currentQuestion.mcqOptions.map((option, index) => (
                    <div 
                      key={option.id} 
                      className={`p-3 border rounded-lg ${option.isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option.text}
                      {option.isCorrect && <Badge className="ml-2 bg-green-500">Correct</Badge>}
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.subparts && (
                <div className="space-y-4 mt-4">
                  <h4 className="font-semibold">Subparts:</h4>
                  {currentQuestion.subparts.map((subpart) => (
                    <div key={subpart.id} className="border-l-4 border-[#007AFF] pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">({subpart.partNumber})</span>
                        <Badge variant="outline">{subpart.marks} marks</Badge>
                      </div>
                      <p className="text-gray-700">{subpart.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Metadata Tags */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{currentQuestion.metadata?.subject}</Badge>
                  <Badge variant="secondary">{currentQuestion.metadata?.difficulty}</Badge>
                  <Badge variant="secondary">{currentQuestion.metadata?.bloomsLevel}</Badge>
                  {currentQuestion.metadata?.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-[#007AFF] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentQuestion.totalAttempts}</div>
              <div className="text-sm text-gray-600">Total Attempts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentQuestion.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg. Score</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentQuestion.averageTime}s</div>
              <div className="text-sm text-gray-600">Avg. Time</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <SkipForward className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentQuestion.skipRate}%</div>
              <div className="text-sm text-gray-600">Skip Rate</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <HelpCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentQuestion.hintUsage}%</div>
              <div className="text-sm text-gray-600">Hint Usage</div>
            </CardContent>
          </Card>
        </div>

        {/* Psychometric Indices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Difficulty Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#007AFF] mb-2">
                {currentQuestion.metadata?.difficultyIndex?.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Target range: 0.4 - 0.8
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#007AFF] h-2 rounded-full" 
                  style={{ width: `${(currentQuestion.metadata?.difficultyIndex || 0) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Discrimination Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {currentQuestion.metadata?.discriminationIndex?.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Target range: 0.2 - 0.8
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${((currentQuestion.metadata?.discriminationIndex || 0) + 1) * 50}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {Math.round((currentQuestion.averageScore || 0) >= 60 ? (currentQuestion.averageScore || 0) : (currentQuestion.averageScore || 0) * 0.8)}%
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Students scoring ≥60%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${Math.round((currentQuestion.averageScore || 0) >= 60 ? (currentQuestion.averageScore || 0) : (currentQuestion.averageScore || 0) * 0.8)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Score distribution histogram would be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-2" />
                  <p>Time-on-question box plot would be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Actionable Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Attention Required</h4>
                <p className="text-yellow-700">
                  Difficulty index ({currentQuestion.metadata?.difficultyIndex}) is higher than optimal range. 
                  Consider reviewing question complexity or providing additional context.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Performing Well</h4>
                <p className="text-green-700">
                  Discrimination index ({currentQuestion.metadata?.discriminationIndex}) shows good differentiation between high and low performers.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Suggestions</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Consider adding visual aids to reduce average completion time</li>
                  <li>• Review MCQ distractors - Option B has unusually high selection rate</li>
                  <li>• Add prerequisite knowledge check for students with low scores</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Clone Question
              </Button>
              <Button variant="outline">
                Edit Metadata
              </Button>
              <Button className="bg-[#007AFF] hover:bg-[#0056CC]">
                Schedule Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionAnalytics;
