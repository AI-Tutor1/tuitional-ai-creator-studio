
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MostMissedQuestion } from '@/types/createdTestDetail';

interface MostMissedQuestionsChartProps {
  data: MostMissedQuestion[];
}

const MostMissedQuestionsChart: React.FC<MostMissedQuestionsChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    question: `Q${item.questionNumber}`,
    incorrectCount: item.incorrectCount
  }));

  const chartConfig = {
    incorrectCount: {
      label: "Incorrect Responses",
      color: "#DC3545",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Most Missed Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <XAxis 
                type="number" 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Incorrect Responses', position: 'insideBottom', offset: -5, fill: '#E1E1E1' }}
              />
              <YAxis 
                type="category" 
                dataKey="question" 
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="incorrectCount" fill="#DC3545" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MostMissedQuestionsChart;
