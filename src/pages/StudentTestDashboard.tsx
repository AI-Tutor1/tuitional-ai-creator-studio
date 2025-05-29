
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Star,
  Brain
} from 'lucide-react';

const StudentTestDashboard = () => {
  const { testId, studentId } = useParams();

  const mockData = {
    testTitle: 'Photosynthesis and Plant Biology',
    subject: 'Biology',
    studentName: 'John Doe',
    score: 42,
    totalMarks: 50,
    percentage: 84,
    timeSpent: 85,
    totalTime: 90,
    classAverage: 76.5,
    rank: 3,
    totalStudents: 45,
    
    strengths: [
      { topic: 'Chlorophyll Functions', score: 95, questions: 3 },
      { topic: 'Light Reactions', score: 88, questions: 2 },
      { topic: 'Photosystem Components', score: 85, questions: 2 }
    ],
    
    weaknesses: [
      { topic: 'Calvin Cycle', score: 60, questions: 2, commonError: 'Confused ATP and NADPH usage' },
      { topic: 'Cellular Respiration vs Photosynthesis', score: 65, questions: 1, commonError: 'Mixed up organelle locations' }
    ],
    
    improvementRecommendations: [
      {
        area: 'Calvin Cycle Understanding',
        priority: 'High',
        suggestion: 'Review the role of ATP and NADPH in carbon fixation',
        resources: ['Chapter 8.3 in textbook', 'Khan Academy: Calvin Cycle'],
        estimatedTime: '30 minutes'
      },
      {
        area: 'Organelle Functions',
        priority: 'Medium',
        suggestion: 'Create a comparison chart of chloroplasts vs mitochondria',
        resources: ['Interactive cell diagram', 'Practice worksheet 4'],
        estimatedTime: '20 minutes'
      }
    ],
    
    questionAnalysis: [
      {
        id: '1',
        question: 'What is the primary function of chlorophyll?',
        yourAnswer: 'Absorbing light energy',
        correct: true,
        timeSpent: 45,
        difficulty: 'Easy',
        topic: 'Chlorophyll Functions',
        insight: 'Excellent understanding of basic photosynthesis concepts'
      },
      {
        id: '2',
        question: 'Describe the Calvin Cycle process',
        yourAnswer: 'Carbon dioxide is fixed using ATP to make glucose',
        correct: false,
        timeSpent: 180,
        difficulty: 'Hard',
        topic: 'Calvin Cycle',
        insight: 'Missed the role of NADPH and RuBisCO enzyme',
        improvement: 'Focus on the specific molecules and enzymes involved'
      }
    ],
    
    nextSteps: [
      'Practice Calvin Cycle questions (5-10 problems)',
      'Review organelle comparison chart',
      'Complete photosynthesis lab simulation',
      'Take practice quiz on cellular processes'
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      {/* Header */}
      <div className="bg-[#2A2A2A] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link to={`/test-results/${testId}`}>
                <Button variant="ghost" className="text-gray-400 hover:text-white mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Test Performance Dashboard</h1>
                <p className="text-gray-400">{mockData.testTitle} • {mockData.studentName}</p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
              {mockData.percentage}% Score
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Score Summary */}
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-500" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {mockData.score}/{mockData.totalMarks}
                  </div>
                  <div className="text-gray-400">Total Score</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Class Rank</div>
                    <div className="text-white font-semibold">#{mockData.rank}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Time Used</div>
                    <div className="text-white font-semibold">{mockData.timeSpent}min</div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-2">vs Class Average ({mockData.classAverage}%)</div>
                  <Progress value={((mockData.percentage - mockData.classAverage) / mockData.classAverage) * 100 + 100} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Star className="h-5 w-5 mr-2 text-green-500" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{strength.topic}</div>
                      <div className="text-gray-400 text-xs">{strength.questions} questions</div>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      {strength.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.weaknesses.map((weakness, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white text-sm font-medium">{weakness.topic}</div>
                      <Badge className="bg-red-600 text-white">
                        {weakness.score}%
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-xs">{weakness.commonError}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improvement Recommendations */}
        <Card className="bg-[#2A2A2A] border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Personalized Improvement Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockData.improvementRecommendations.map((rec, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{rec.area}</h3>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{rec.suggestion}</p>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs">Recommended Resources:</div>
                    {rec.resources.map((resource, idx) => (
                      <div key={idx} className="text-blue-400 text-xs">• {resource}</div>
                    ))}
                    <div className="text-gray-400 text-xs mt-2">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Estimated time: {rec.estimatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question-by-Question Analysis */}
        <Card className="bg-[#2A2A2A] border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              Question Analysis & Learning Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockData.questionAnalysis.map((question, index) => (
                <div key={question.id} className="border border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="border-[#38B6FF] text-[#38B6FF]">
                          Question {index + 1}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-purple-600 text-purple-300">
                          {question.topic}
                        </Badge>
                      </div>
                      <p className="text-white text-lg mb-2">{question.question}</p>
                      <p className="text-gray-300 text-sm">Your answer: {question.yourAnswer}</p>
                    </div>
                    {question.correct ? (
                      <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="bg-[#1E1E1E] p-4 rounded border-l-4 border-blue-500">
                    <div className="text-sm text-gray-400 mb-1">Learning Insight:</div>
                    <div className="text-white">{question.insight}</div>
                    {question.improvement && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-400 mb-1">How to Improve:</div>
                        <div className="text-blue-300">{question.improvement}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                    <span>Time spent: {question.timeSpent}s</span>
                    <span>Topic: {question.topic}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-[#2A2A2A] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockData.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[#1E1E1E] rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link to={`/test-results/${testId}`}>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Test Results
            </Button>
          </Link>
          <Link to={`/performance-trends/${studentId}`}>
            <Button className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Long-term Trends
            </Button>
          </Link>
          <Button variant="outline" className="border-green-600 text-green-300 hover:bg-green-700">
            <BookOpen className="mr-2 h-4 w-4" />
            Start Study Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentTestDashboard;
