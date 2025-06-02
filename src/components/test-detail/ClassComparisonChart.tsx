
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ClassScoreBucket {
  bucketRange: string;
  studentCount: number;
}

interface ClassComparisonChartProps {
  data: ClassScoreBucket[];
  userScore: number;
}

const ClassComparisonChart: React.FC<ClassComparisonChartProps> = ({ data, userScore }) => {
  const chartData = data.map(bucket => ({
    range: bucket.bucketRange,
    count: bucket.studentCount
  }));

  const chartConfig = {
    count: {
      label: "Students",
      color: "#38B6FF",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Class Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Number of Students', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#E1E1E1' } }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#38B6FF" name="Students" />
              <ReferenceLine 
                x={`${Math.floor(userScore/10)*10}-${Math.floor(userScore/10)*10+9}`} 
                stroke="#00C851" 
                strokeDasharray="5 5"
                label={{ value: "Your Score", position: "top", fill: "#00C851" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* User Score Indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-300">Your Score: {userScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassComparisonChart;
