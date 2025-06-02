
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

interface SectionPerformanceData {
  sectionName: string;
  userScorePct: number;
  classAvgScorePct: number;
}

interface SectionPerformanceChartProps {
  data: SectionPerformanceData[];
}

const SectionPerformanceChart: React.FC<SectionPerformanceChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    section: item.sectionName,
    userScore: item.userScorePct,
    classAvg: item.classAvgScorePct
  }));

  const chartConfig = {
    userScore: {
      label: "Your Score",
      color: "#00C851",
    },
    classAvg: {
      label: "Class Average",
      color: "#38B6FF",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Section Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="section" 
                tick={{ fill: '#E1E1E1', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="userScore" fill="#00C851" name="Your Score (%)" />
              <Bar dataKey="classAvg" fill="#38B6FF" name="Class Avg (%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SectionPerformanceChart;
