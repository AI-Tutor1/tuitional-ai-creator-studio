
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { QuestionStat } from '@/types/createdTestDetail';

interface DifficultyAccuracyChartProps {
  data: QuestionStat[];
}

const DifficultyAccuracyChart: React.FC<DifficultyAccuracyChartProps> = ({ data }) => {
  const chartData = data.map(stat => ({
    difficulty: stat.difficultyRating,
    accuracy: Math.round((stat.countCorrect / stat.timesAttempted) * 100),
    questionNumber: stat.questionNumber,
    color: Math.round((stat.countCorrect / stat.timesAttempted) * 100) >= 75 
      ? '#28A745' 
      : Math.round((stat.countCorrect / stat.timesAttempted) * 100) >= 50 
      ? '#FFC107' 
      : '#DC3545'
  }));

  const chartConfig = {
    accuracy: {
      label: "Accuracy %",
      color: "#3399FF",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Difficulty vs. Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis 
                type="number" 
                dataKey="difficulty" 
                domain={[1, 5]}
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Difficulty', position: 'insideBottom', offset: -5, fill: '#E1E1E1' }}
              />
              <YAxis 
                type="number" 
                dataKey="accuracy" 
                domain={[0, 100]}
                tick={{ fill: '#E1E1E1', fontSize: 12 }}
                label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft', fill: '#E1E1E1' }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [
                  `Q${props.payload.questionNumber}: ${value}% correct`,
                  `Difficulty ${props.payload.difficulty}`
                ]}
              />
              <Scatter data={chartData} fill="#3399FF" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DifficultyAccuracyChart;
