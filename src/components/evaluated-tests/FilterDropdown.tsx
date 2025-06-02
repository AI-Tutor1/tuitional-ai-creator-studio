
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { FilterState } from '@/types/evaluatedTest';

interface FilterDropdownProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const courses = ['Biology 101', 'Chemistry 201', 'Mathematics 101', 'Physics 101', 'History 201'];
  const statuses = [
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'needs_review', label: 'Needs Review' }
  ];

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {
      dateRange: { start: undefined, end: undefined },
      courses: [],
      scoreRange: { min: 0, max: 100 },
      statuses: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleCourseChange = (course: string, checked: boolean) => {
    const newCourses = checked 
      ? [...localFilters.courses, course]
      : localFilters.courses.filter(c => c !== course);
    
    setLocalFilters({
      ...localFilters,
      courses: newCourses
    });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked 
      ? [...localFilters.statuses, status]
      : localFilters.statuses.filter(s => s !== status);
    
    setLocalFilters({
      ...localFilters,
      statuses: newStatuses
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-[#2A2A2A] border-gray-600 text-white">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-[#2A2A2A] border-gray-600 p-4" align="start">
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <Label className="text-white mb-2 block">Date Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Start date"
                value={localFilters.dateRange.start || ''}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  dateRange: { ...localFilters.dateRange, start: e.target.value }
                })}
                className="bg-[#1F1F23] border-gray-600 text-white"
              />
              <Input
                type="date"
                placeholder="End date"
                value={localFilters.dateRange.end || ''}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  dateRange: { ...localFilters.dateRange, end: e.target.value }
                })}
                className="bg-[#1F1F23] border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Course/Subject */}
          <div>
            <Label className="text-white mb-2 block">Course/Subject</Label>
            <div className="space-y-2">
              {courses.map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={course}
                    checked={localFilters.courses.includes(course)}
                    onCheckedChange={(checked) => handleCourseChange(course, checked as boolean)}
                  />
                  <Label htmlFor={course} className="text-gray-300 text-sm">
                    {course}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Score Range */}
          <div>
            <Label className="text-white mb-2 block">Score Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min %"
                min="0"
                max="100"
                value={localFilters.scoreRange.min}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  scoreRange: { ...localFilters.scoreRange, min: parseInt(e.target.value) || 0 }
                })}
                className="bg-[#1F1F23] border-gray-600 text-white"
              />
              <Input
                type="number"
                placeholder="Max %"
                min="0"
                max="100"
                value={localFilters.scoreRange.max}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  scoreRange: { ...localFilters.scoreRange, max: parseInt(e.target.value) || 100 }
                })}
                className="bg-[#1F1F23] border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="text-white mb-2 block">Status</Label>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.value}
                    checked={localFilters.statuses.includes(status.value)}
                    onCheckedChange={(checked) => handleStatusChange(status.value, checked as boolean)}
                  />
                  <Label htmlFor={status.value} className="text-gray-300 text-sm">
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1 border-gray-600 text-gray-300"
            >
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
