
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Download, Eye, Mail } from 'lucide-react';
import { CreatedTestDetailData, StudentResponse } from '@/types/createdTestDetail';

interface ResponsesTabProps {
  testData: CreatedTestDetailData;
}

const ResponsesTab: React.FC<ResponsesTabProps> = ({ testData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponses, setSelectedResponses] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadgeStyle = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-600 text-white';
      case 'in_progress': return 'bg-yellow-600 text-black';
      case 'not_started': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getScoreColor = (score: number): string => {
    return score >= testData.passingScorePct ? 'text-green-400' : 'text-red-400';
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResponses(new Set(testData.responses.map(r => r.responseId)));
    } else {
      setSelectedResponses(new Set());
    }
  };

  const handleSelectResponse = (responseId: string, checked: boolean) => {
    const newSelected = new Set(selectedResponses);
    if (checked) {
      newSelected.add(responseId);
    } else {
      newSelected.delete(responseId);
    }
    setSelectedResponses(newSelected);
  };

  const handleReviewResponse = (response: StudentResponse) => {
    console.log('Opening review modal for:', response.studentName);
  };

  const handleMessageStudent = (response: StudentResponse) => {
    console.log('Opening message modal for:', response.studentName);
  };

  const handleExportCSV = () => {
    console.log('Exporting responses to CSV');
  };

  const handleDownloadSelected = () => {
    console.log('Downloading selected PDFs');
  };

  const handleAssignGrade = () => {
    console.log('Opening grade assignment modal');
  };

  const filteredResponses = testData.responses.filter(response => {
    const matchesSearch = response.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         response.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || response.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (testData.responsesSummary.totalResponses === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-500">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No responses yet.</h3>
        <p className="text-gray-400 mb-6">
          {testData.status === 'draft' 
            ? 'Test is in draft—no responses can be collected until you publish.'
            : 'Share the test link or publish the test to start collecting responses.'
          }
        </p>
        {testData.status === 'draft' && (
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Publish Test
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Responses Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2A2A2F] border-gray-600 text-gray-300"
            />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#3B3B42] text-gray-300 border-gray-600 rounded-md px-3 py-2"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="not_started">Not Started</option>
        </select>

        <Button
          onClick={handleExportCSV}
          className="bg-[#3399FF] hover:bg-[#2A85E8] text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Responses Table */}
      <div className="bg-[#1F1F23] rounded-lg border border-gray-700 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-4 sticky top-0">
          <Checkbox
            checked={selectedResponses.size === filteredResponses.length && filteredResponses.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-semibold text-white">
            <div>Student Name</div>
            <div>Student ID</div>
            <div>Submission Date</div>
            <div>Score</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-700">
          {filteredResponses.map((response, index) => (
            <div
              key={response.responseId}
              className={`px-6 py-4 flex items-center gap-4 hover:bg-[#2A2A2F] ${
                index % 2 === 0 ? 'bg-[#1F1F23]' : 'bg-[#24242A]'
              }`}
            >
              <Checkbox
                checked={selectedResponses.has(response.responseId)}
                onCheckedChange={(checked) => handleSelectResponse(response.responseId, !!checked)}
              />
              <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                <div className="text-white font-medium">{response.studentName}</div>
                <div className="text-gray-400">{response.studentId}</div>
                <div className="text-gray-400">
                  {new Date(response.submissionDate).toLocaleDateString()}
                </div>
                <div className={`font-semibold ${getScoreColor(response.scorePercentage)}`}>
                  {response.scorePercentage}%
                </div>
                <div>
                  <Badge className={`${getStatusBadgeStyle(response.status)} text-xs font-bold uppercase`}>
                    {response.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleReviewResponse(response)}
                    variant="ghost"
                    size="sm"
                    className="text-[#3399FF] hover:text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleMessageStudent(response)}
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions Footer */}
      {selectedResponses.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2A2A2F] border-t border-gray-600 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-white">
              Selected {selectedResponses.size} response{selectedResponses.size !== 1 ? 's' : ''}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleDownloadSelected}
                className="bg-[#3399FF] hover:bg-[#2A85E8] text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Papers
              </Button>
              <Button
                onClick={handleAssignGrade}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Assign Grade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsesTab;
