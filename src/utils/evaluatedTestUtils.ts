
import { EvaluatedTest } from '@/types/evaluatedTest';

export const getGradeBadgeColor = (scorePercentage: number): string => {
  if (scorePercentage >= 90) return 'bg-green-600 text-white';
  if (scorePercentage >= 75) return 'bg-yellow-600 text-black';
  return 'bg-red-600 text-white';
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'passed': return '✓';
    case 'failed': return '!';
    case 'needs_review': return '⚠';
    default: return '?';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'passed': return 'text-green-500';
    case 'failed': return 'text-red-500';
    case 'needs_review': return 'text-yellow-500';
    default: return 'text-gray-500';
  }
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} minutes`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const filterTests = (
  tests: EvaluatedTest[],
  searchTerm: string,
  filters: any
): EvaluatedTest[] => {
  return tests.filter(test => {
    // Search filter
    if (searchTerm && !test.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const testDate = new Date(test.dateCompleted);
      if (filters.dateRange.start && testDate < new Date(filters.dateRange.start)) {
        return false;
      }
      if (filters.dateRange.end && testDate > new Date(filters.dateRange.end)) {
        return false;
      }
    }

    // Course filter
    if (filters.courses.length > 0 && !filters.courses.includes(test.course)) {
      return false;
    }

    // Score range filter
    if (test.scorePercentage < filters.scoreRange.min || test.scorePercentage > filters.scoreRange.max) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(test.status)) {
      return false;
    }

    return true;
  });
};
