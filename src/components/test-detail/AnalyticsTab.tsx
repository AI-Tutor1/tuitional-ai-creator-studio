
import React from 'react';
import { TestDetailData } from '@/types/testDetail';
import AnalyticsSummaryBanner from './AnalyticsSummaryBanner';
import TimePerQuestionChart from './TimePerQuestionChart';
import SectionPerformanceChart from './SectionPerformanceChart';
import QuestionAccuracyHeatmap from './QuestionAccuracyHeatmap';
import ClassComparisonChart from './ClassComparisonChart';

interface AnalyticsTabProps {
  testData: TestDetailData;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ testData }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <AnalyticsSummaryBanner
        scorePercentage={testData.scorePercentage}
        duration={formatDuration(testData.durationSeconds)}
        percentile={testData.analytics.userPercentile}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimePerQuestionChart data={testData.analytics.timePerQuestion} />
        <SectionPerformanceChart data={testData.analytics.sectionPerformance} />
        <QuestionAccuracyHeatmap data={testData.analytics.questionAccuracy} />
        <ClassComparisonChart data={testData.analytics.classScoreBuckets} userScore={testData.scorePercentage} />
      </div>
    </div>
  );
};

export default AnalyticsTab;
