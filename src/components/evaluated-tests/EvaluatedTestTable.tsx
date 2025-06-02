
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, 
  Download, 
  Share, 
  MessageCircleQuestion,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { EvaluatedTest } from '@/types/evaluatedTest';
import { getGradeBadgeColor, formatDate } from '@/utils/evaluatedTestUtils';

interface EvaluatedTestTableProps {
  tests: EvaluatedTest[];
  onReview: (test: EvaluatedTest) => void;
  onDownload: (test: EvaluatedTest) => void;
  onShare: (test: EvaluatedTest) => void;
  onRequestRegrade: (test: EvaluatedTest) => void;
}

const EvaluatedTestTable: React.FC<EvaluatedTestTableProps> = ({
  tests,
  onReview,
  onDownload,
  onShare,
  onRequestRegrade
}) => {
  const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTests(new Set(tests.map(test => test.testId)));
    } else {
      setSelectedTests(new Set());
    }
  };

  const handleSelectTest = (testId: string, checked: boolean) => {
    const newSelected = new Set(selectedTests);
    if (checked) {
      newSelected.add(testId);
    } else {
      newSelected.delete(testId);
    }
    setSelectedTests(newSelected);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'needs_review':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleBulkDownload = () => {
    console.log('Bulk downloading:', Array.from(selectedTests));
    // Implementation for bulk download would go here
  };

  return (
    <div className="bg-[#2A2A2A] rounded-lg border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-[#2A2A2A]">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTests.size === tests.length && tests.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="text-white">Test Title</TableHead>
            <TableHead className="text-white hidden md:table-cell">Course</TableHead>
            <TableHead className="text-white hidden lg:table-cell">Date Completed</TableHead>
            <TableHead className="text-white">Score</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test, index) => (
            <TableRow 
              key={test.testId} 
              className={`border-gray-700 hover:bg-[#24242A] ${
                index % 2 === 0 ? 'bg-[#1F1F23]' : 'bg-[#24242A]'
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedTests.has(test.testId)}
                  onCheckedChange={(checked) => handleSelectTest(test.testId, checked as boolean)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-white hover:underline cursor-pointer" title={test.title}>
                    {test.title.length > 50 ? `${test.title.substring(0, 50)}...` : test.title}
                  </div>
                  <div className="text-sm text-gray-400 md:hidden">{test.course}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-300 hidden md:table-cell">
                {test.course}
              </TableCell>
              <TableCell className="text-gray-300 hidden lg:table-cell">
                {formatDate(test.dateCompleted)}
              </TableCell>
              <TableCell>
                <Badge className={`${getGradeBadgeColor(test.scorePercentage)} font-bold`}>
                  {test.scorePercentage}%
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(test.status)}
                  <span className="text-sm text-gray-300 capitalize">
                    {test.status.replace('_', ' ')}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onReview(test)}
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    title="Review Test"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDownload(test)}
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    title="Download Report"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onShare(test)}
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    title="Share Results"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  
                  {test.canRequestRegrade && !test.regradeRequested && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRequestRegrade(test)}
                      className="h-8 w-8 text-yellow-400 hover:text-white"
                      title="Request Re-Grade"
                    >
                      <MessageCircleQuestion className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Bulk Actions Footer */}
      {selectedTests.size > 0 && (
        <div className="sticky bottom-0 bg-[#2A2A2A] border-t border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <span className="text-white">
              {selectedTests.size} test{selectedTests.size !== 1 ? 's' : ''} selected
            </span>
            <Button onClick={handleBulkDownload} className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white">
              <Download className="mr-2 h-4 w-4" />
              Download Selected Reports ({selectedTests.size})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluatedTestTable;
