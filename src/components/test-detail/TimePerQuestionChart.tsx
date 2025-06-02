
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

interface TimePerQuestionData {
  questionNumber: number;
  userTimeSec: number;
  classAvgTimeSec: number;
}

interface TimePerQuestionChartProps {
  data: TimePerQuestionData[];
}

const TimePerQuestionChart: React.FC<TimePerQuestionChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    question: `Q${item.questionNumber}`,
    userTime: item.userTimeSec,
    classAvg: item.classAvgTimeSec
  }));

  const chartConfig = {
    userTime: {
      label: "Your Time",
      color: "#38B6FF",
    },
    classAvg: {
      label: "Class Average",
      color: "#808080",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Time per Question</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <XAxis type="number" tick={{ fill: '#E1E1E1', fontSize: 12 }} />
              <YAxis 
                type="category" 
                dataKey="question" 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="userTime" fill="#38B6FF" name="Your Time (sec)" />
              <Bar dataKey="classAvg" fill="#808080" name="Class Avg (sec)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TimePerQuestionChart;
