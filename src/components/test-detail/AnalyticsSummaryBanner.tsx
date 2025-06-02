
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsSummaryBannerProps {
  scorePercentage: number;
  duration: string;
  percentile?: number;
}

const AnalyticsSummaryBanner: React.FC<AnalyticsSummaryBannerProps> = ({
  scorePercentage,
  duration,
  percentile
}) => {
  return (
    <Card className="bg-[#2A2A2F] border-gray-700">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {scorePercentage}%
            </div>
            <div className="text-sm text-gray-400">Overall Score</div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {duration}
            </div>
            <div className="text-sm text-gray-400">Time Taken</div>
          </div>
          
          {percentile && (
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                Top {100 - percentile}%
              </div>
              <div className="text-sm text-gray-400">Class Percentile</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSummaryBanner;
