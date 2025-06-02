
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatedTestDetailData } from '@/types/createdTestDetail';
import DifficultyAccuracyChart from './DifficultyAccuracyChart';
import MostMissedQuestionsChart from './MostMissedQuestionsChart';
import TimeDistributionChart from './TimeDistributionChart';
import SectionScoreBreakdownChart from './SectionScoreBreakdownChart';

interface AnalyticsTabProps {
  testData: CreatedTestDetailData;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ testData }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const analytics = testData.analytics;

  return (
    <div className="space-y-6">
      {/* Analytics Summary Banner */}
      <Card className="bg-[#2A2A2F] border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {analytics.averageScorePct}%
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Avg. Score (across {testData.responsesSummary.totalResponses} responses)
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#3399FF] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📋</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {analytics.completionRatePct}%
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Completion Rate ({testData.responsesSummary.completedCount}/{testData.responsesSummary.totalResponses})
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">⏱</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {formatTime(analytics.averageTimeSeconds)}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Average Time per Student
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DifficultyAccuracyChart data={analytics.questionStats} />
        <MostMissedQuestionsChart data={analytics.mostMissedQuestions} />
        <TimeDistributionChart data={analytics.timeBuckets} />
        <SectionScoreBreakdownChart data={analytics.sectionStats} />
      </div>
    </div>
  );
};

export default AnalyticsTab;
