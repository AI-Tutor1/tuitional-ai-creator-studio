
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Download, 
  Share, 
  MessageCircleQuestion,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { EvaluatedTest } from '@/types/evaluatedTest';
import { getGradeBadgeColor, getStatusColor, formatDuration, formatDate } from '@/utils/evaluatedTestUtils';

interface EvaluatedTestCardProps {
  test: EvaluatedTest;
  onReview: (test: EvaluatedTest) => void;
  onDownload: (test: EvaluatedTest) => void;
  onShare: (test: EvaluatedTest) => void;
  onRequestRegrade: (test: EvaluatedTest) => void;
}

const EvaluatedTestCard: React.FC<EvaluatedTestCardProps> = ({
  test,
  onReview,
  onDownload,
  onShare,
  onRequestRegrade
}) => {
  const getStatusIcon = () => {
    switch (test.status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'needs_review':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-[#2A2A2A] border-gray-700 hover:border-[#38B6FF] transition-colors">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {test.title}
            </h3>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {getStatusIcon()}
            <Badge className={`${getGradeBadgeColor(test.scorePercentage)} font-bold`}>
              {test.scorePercentage}%
              {test.gradeLetter && ` (${test.gradeLetter})`}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-400">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{test.course}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(test.dateCompleted)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{formatDuration(test.durationMinutes)}</span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="text-sm text-gray-300">
          <span className="text-green-400">✓ {test.correctCount}</span>
          <span className="mx-2">•</span>
          <span className="text-red-400">✗ {test.incorrectCount}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-400">⊘ {test.skippedCount}</span>
        </div>

        {/* Instructor Comments Flag */}
        {test.instructorCommentsAvailable && (
          <div className="text-sm text-yellow-400">
            ⚠ Instructor Comments Available
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            onClick={() => onReview(test)}
            className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white flex-1 sm:flex-none"
          >
            <Eye className="mr-2 h-4 w-4" />
            Review
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onDownload(test)}
            className="border-gray-600 text-gray-300 hover:bg-[#2A2A2A] flex-1 sm:flex-none"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onShare(test)}
              className="text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
              title="Share Results"
            >
              <Share className="h-4 w-4" />
            </Button>

            {test.canRequestRegrade && !test.regradeRequested && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRequestRegrade(test)}
                className="text-yellow-400 hover:text-white hover:bg-[#2A2A2A]"
                title="Request Re-Grade"
              >
                <MessageCircleQuestion className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluatedTestCard;
