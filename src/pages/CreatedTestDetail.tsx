
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { CreatedTestDetailData } from '@/types/createdTestDetail';
import { mockCreatedTestDetail } from '@/data/mockCreatedTestDetail';
import OverviewTab from '@/components/created-test-detail/OverviewTab';
import QuestionsTab from '@/components/created-test-detail/QuestionsTab';
import ResponsesTab from '@/components/created-test-detail/ResponsesTab';
import AnalyticsTab from '@/components/created-test-detail/AnalyticsTab';

const CreatedTestDetail = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [testData, setTestData] = useState<CreatedTestDetailData | null>(null);
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    // In a real app, fetch data based on testId
    setTestData(mockCreatedTestDetail);
  }, [testId]);

  const getStatusBadgeStyle = (status: string): string => {
    switch (status) {
      case 'draft': return 'bg-gray-600 text-white';
      case 'published': return 'bg-green-600 text-white';
      case 'archived': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const handlePreview = () => {
    console.log('Opening preview modal');
    // Implementation for preview modal
  };

  const handleDuplicate = () => {
    console.log('Duplicating test');
    // Implementation for test duplication
  };

  const handleDelete = () => {
    console.log('Deleting test');
    // Implementation for test deletion
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/teacher-test-bank')}
            className="p-2 text-gray-400 hover:text-[#3399FF] hover:bg-[#2A2A2A] mb-6"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="text-sm">Back to Created Tests</span>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 min-w-0 mb-4 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">
                {testData.title}
              </h1>
              <Badge className={`${getStatusBadgeStyle(testData.status)} text-xs font-bold uppercase`}>
                {testData.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              ID: {testData.testId} • Created: {formatDate(testData.createdAt)}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Button
              onClick={handlePreview}
              className="bg-[#3399FF] hover:bg-[#2A85E8] text-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={handleDuplicate}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-[#2A2A2F]"
            >
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#1F1F23] border-b border-gray-700 w-full justify-start h-12 rounded-none">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#3399FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="questions" 
              className="data-[state=active]:bg-[#3399FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Questions
            </TabsTrigger>
            <TabsTrigger 
              value="responses" 
              className="data-[state=active]:bg-[#3399FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Responses
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#3399FF] data-[state=active]:text-white text-gray-400 font-semibold uppercase px-6"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab testData={testData} />
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <QuestionsTab testData={testData} />
          </TabsContent>

          <TabsContent value="responses" className="mt-6">
            <ResponsesTab testData={testData} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab testData={testData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatedTestDetail;
