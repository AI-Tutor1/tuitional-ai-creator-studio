
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { TestDetailData } from '@/types/testDetail';
import { mockTestDetail } from '@/data/mockTestDetail';
import ReviewTab from '@/components/test-detail/ReviewTab';
import AnalyticsTab from '@/components/test-detail/AnalyticsTab';

const TestDetail = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [testData, setTestData] = useState<TestDetailData | null>(null);
  const [activeTab, setActiveTab] = useState('review');

  useEffect(() => {
    // In a real app, fetch data based on testId
    setTestData(mockTestDetail);
  }, [testId]);

  const getGradeBadgeColor = (scorePercentage: number): string => {
    if (scorePercentage >= 90) return 'bg-green-600 text-white';
    if (scorePercentage >= 75) return 'bg-yellow-600 text-black';
    return 'bg-red-600 text-white';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return '✓';
      case 'failed': return '!';
      case 'needs_review': return '⚠';
      default: return '?';
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  if (!testData) {
    return (
      <div className="min-h-screen bg-[#1E1E1E]">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/evaluated-tests')}
            className="p-2 text-gray-400 hover:text-[#38B6FF] hover:bg-[#2A2A2A] mb-4"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Evaluated Tests
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold text-white mb-2 line-clamp-2">
              {testData.title}
            </h1>
            <p className="text-gray-400 text-lg">{testData.course}</p>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center space-x-4">
            <span className="text-xl text-white">
              {getStatusIcon(testData.status)}
            </span>
            <div className="text-right">
              <div className="text-lg font-semibold text-white">
                Score: {testData.scorePercentage}%
              </div>
              <Badge className={`${getGradeBadgeColor(testData.scorePercentage)} font-bold`}>
                {testData.gradeLetter || 'N/A'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#2A2A2A] border-b border-gray-700 w-full justify-start h-12 rounded-none">
            <TabsTrigger 
              value="review" 
              className="data-[state=active]:bg-[#38B6FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Review
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#38B6FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="review" className="mt-6">
            <ReviewTab testData={testData} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab testData={testData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestDetail;
