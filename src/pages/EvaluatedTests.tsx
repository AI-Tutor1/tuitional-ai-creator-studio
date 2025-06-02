
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  Download,
  Share,
  Eye,
  MessageCircleQuestion,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { mockEvaluatedTests } from '@/data/mockEvaluatedTests';
import { EvaluatedTest, FilterState, ViewMode } from '@/types/evaluatedTest';
import { 
  getGradeBadgeColor, 
  getStatusColor, 
  formatDuration, 
  formatDate, 
  filterTests 
} from '@/utils/evaluatedTestUtils';
import EvaluatedTestCard from '@/components/evaluated-tests/EvaluatedTestCard';
import EvaluatedTestTable from '@/components/evaluated-tests/EvaluatedTestTable';
import FilterDropdown from '@/components/evaluated-tests/FilterDropdown';
import TestReviewPanel from '@/components/evaluated-tests/TestReviewPanel';

const EvaluatedTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedTest, setSelectedTest] = useState<EvaluatedTest | null>(null);
  const [showReviewPanel, setShowReviewPanel] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: undefined, end: undefined },
    courses: [],
    scoreRange: { min: 0, max: 100 },
    statuses: []
  });

  const filteredTests = useMemo(() => {
    return filterTests(mockEvaluatedTests, searchTerm, filters);
  }, [searchTerm, filters]);

  const handleReviewTest = (test: EvaluatedTest) => {
    setSelectedTest(test);
    setShowReviewPanel(true);
  };

  const handleDownloadReport = (test: EvaluatedTest) => {
    console.log('Downloading report for:', test.title);
    // Implementation for PDF download would go here
  };

  const handleShareResults = (test: EvaluatedTest) => {
    console.log('Sharing results for:', test.title);
    // Implementation for sharing would go here
  };

  const handleRequestRegrade = (test: EvaluatedTest) => {
    console.log('Requesting regrade for:', test.title);
    // Implementation for regrade request would go here
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-400">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Evaluated Tests</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Evaluated Tests</h1>
          <p className="text-gray-400 text-lg">Review your graded tests and feedback</p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search evaluated tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Filter Dropdown */}
          <FilterDropdown filters={filters} onFiltersChange={setFilters} />

          {/* View Toggle */}
          <div className="flex bg-[#2A2A2A] rounded-lg p-1">
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
              className={viewMode === 'card' ? 'bg-[#38B6FF] text-white' : 'text-gray-400 hover:text-white'}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-[#38B6FF] text-white' : 'text-gray-400 hover:text-white'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {filteredTests.length === 0 ? (
          <Card className="bg-[#2A2A2A] border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <BookOpen className="mx-auto h-16 w-16 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No evaluated tests found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            </CardContent>
          </Card>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <EvaluatedTestCard
                key={test.testId}
                test={test}
                onReview={handleReviewTest}
                onDownload={handleDownloadReport}
                onShare={handleShareResults}
                onRequestRegrade={handleRequestRegrade}
              />
            ))}
          </div>
        ) : (
          <EvaluatedTestTable
            tests={filteredTests}
            onReview={handleReviewTest}
            onDownload={handleDownloadReport}
            onShare={handleShareResults}
            onRequestRegrade={handleRequestRegrade}
          />
        )}

        {/* Test Review Panel */}
        {showReviewPanel && selectedTest && (
          <TestReviewPanel
            test={selectedTest}
            onClose={() => setShowReviewPanel(false)}
            onDownload={handleDownloadReport}
            onRequestRegrade={handleRequestRegrade}
          />
        )}
      </div>
    </div>
  );
};

export default EvaluatedTests;
