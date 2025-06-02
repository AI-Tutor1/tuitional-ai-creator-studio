
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TimeBucket } from '@/types/createdTestDetail';

interface TimeDistributionChartProps {
  data: TimeBucket[];
}

const TimeDistributionChart: React.FC<TimeDistributionChartProps> = ({ data }) => {
  const chartData = data.map(bucket => ({
    timeRange: bucket.range + 's',
    questionCount: bucket.questionCount
  }));

  const chartConfig = {
    questionCount: {
      label: "Question Count",
      color: "#3399FF",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Time Spent per Question</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="timeRange" 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Time Buckets', position: 'insideBottom', offset: -5, fill: '#E1E1E1' }}
              />
              <YAxis 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Questions', angle: -90, position: 'insideLeft', fill: '#E1E1E1' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="questionCount" fill="#3399FF" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TimeDistributionChart;
