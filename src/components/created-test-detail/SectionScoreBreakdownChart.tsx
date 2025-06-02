
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { SectionStat } from '@/types/createdTestDetail';

interface SectionScoreBreakdownChartProps {
  data: SectionStat[];
}

const SectionScoreBreakdownChart: React.FC<SectionScoreBreakdownChartProps> = ({ data }) => {
  const chartData = data.map(section => {
    const total = Object.values(section.scoreDistribution).reduce((sum, count) => sum + count, 0);
    return {
      section: section.sectionName,
      excellent: Math.round((section.scoreDistribution['90-100'] / total) * 100),
      good: Math.round((section.scoreDistribution['75-89'] / total) * 100),
      average: Math.round((section.scoreDistribution['50-74'] / total) * 100),
      poor: Math.round((section.scoreDistribution['<50'] / total) * 100)
    };
  });

  const chartConfig = {
    excellent: {
      label: "≥ 90%",
      color: "#28A745",
    },
    good: {
      label: "75-89%",
      color: "#FFC107",
    },
    average: {
      label: "50-74%",
      color: "#FFB400",
    },
    poor: {
      label: "< 50%",
      color: "#DC3545",
    },
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Scores by Section</CardTitle>
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
                label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fill: '#E1E1E1' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="excellent" stackId="a" fill="#28A745" name="≥ 90%" />
              <Bar dataKey="good" stackId="a" fill="#FFC107" name="75-89%" />
              <Bar dataKey="average" stackId="a" fill="#FFB400" name="50-74%" />
              <Bar dataKey="poor" stackId="a" fill="#DC3545" name="< 50%" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SectionScoreBreakdownChart;
