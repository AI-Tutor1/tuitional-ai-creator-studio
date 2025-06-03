
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TagFilterPanelProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  onClose: () => void;
}

const TagFilterPanel: React.FC<TagFilterPanelProps> = ({
  allTags,
  selectedTags,
  onTagsChange,
  onClose
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 max-h-60 overflow-y-auto">
      <div className="space-y-2">
        {allTags.map((tag) => (
          <div key={tag} className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded">
            <Checkbox
              id={`tag-${tag}`}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => handleTagToggle(tag)}
            />
            <Label 
              htmlFor={`tag-${tag}`}
              className="text-sm text-gray-700 cursor-pointer flex-1"
            >
              {tag}
            </Label>
          </div>
        ))}
      </div>
      
      {allTags.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No tags available
        </p>
      )}
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-red-600 hover:text-red-700 text-xs"
        >
          Clear All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-700 text-xs"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default TagFilterPanel;
