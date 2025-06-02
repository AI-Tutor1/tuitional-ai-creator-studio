
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionAccuracyData {
  questionNumber: number;
  status: 'correct' | 'incorrect' | 'skipped';
}

interface QuestionAccuracyHeatmapProps {
  data: QuestionAccuracyData[];
}

const QuestionAccuracyHeatmap: React.FC<QuestionAccuracyHeatmapProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return 'bg-green-600';
      case 'incorrect': return 'bg-red-600';
      case 'skipped': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'correct': return 'Correct';
      case 'incorrect': return 'Incorrect';
      case 'skipped': return 'Skipped';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="bg-[#1F1F23] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Question Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Grid */}
          <div className="grid grid-cols-5 gap-2">
            {data.map((question) => (
              <div
                key={question.questionNumber}
                className={`
                  w-12 h-12 rounded flex items-center justify-center
                  ${getStatusColor(question.status)}
                  text-white font-bold text-sm
                  hover:scale-105 transition-transform cursor-pointer
                `}
                title={`Q${question.questionNumber}: ${getStatusLabel(question.status)}`}
              >
                Q{question.questionNumber}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-300">Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm text-gray-300">Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span className="text-sm text-gray-300">Skipped</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAccuracyHeatmap;
