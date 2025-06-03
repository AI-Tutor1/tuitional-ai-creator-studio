
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Edit, 
  Trash2, 
  Star, 
  Tag 
} from 'lucide-react';

interface GeneratedNote {
  sectionId: string;
  sectionTitle: string;
  content: string[];
  importance: number;
  tags: string[];
  starred?: boolean;
  customTags?: string[];
}

interface AINotesSectionCardProps {
  note: GeneratedNote;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdateNote: (updates: Partial<GeneratedNote>) => void;
  onDeleteNote: () => void;
  searchQuery: string;
}

const AINotesSectionCard: React.FC<AINotesSectionCardProps> = ({
  note,
  isExpanded,
  onToggleExpanded,
  onUpdateNote,
  onDeleteNote,
  searchQuery
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content.join('\n'));
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `${note.sectionTitle}\n\n${note.content.join('\n')}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      // In a real app, you'd show a toast notification here
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const handleSaveEdit = () => {
    const newContent = editContent.split('\n').filter(line => line.trim() !== '');
    onUpdateNote({ content: newContent });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(note.content.join('\n'));
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !note.customTags?.includes(newTag.trim())) {
      const updatedCustomTags = [...(note.customTags || []), newTag.trim()];
      onUpdateNote({ customTags: updatedCustomTags });
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleToggleStar = () => {
    onUpdateNote({ starred: !note.starred });
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDeleteNote();
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  const renderStars = (importance: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${index < importance ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-3">
        {/* Collapse/Expand Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpanded}
          className="p-1 h-6 w-6"
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} section ${note.sectionTitle}`}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-blue-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-blue-600" />
          )}
        </Button>

        {/* Section Title */}
        <h3 className="text-base font-semibold text-gray-900 flex-1">
          {highlightText(note.sectionTitle, searchQuery)}
        </h3>

        {/* Importance Stars */}
        <div className="flex items-center space-x-1" aria-label={`Section importance: ${note.importance} out of 5`} role="img">
          {renderStars(note.importance)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.customTags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-semibold bg-purple-50 text-purple-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="p-1 h-6 w-6 text-gray-500 hover:text-blue-600"
            aria-label={`Copy content of section ${note.sectionTitle}`}
          >
            <Copy className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 h-6 w-6 text-gray-500 hover:text-blue-600"
            aria-label={`Edit section ${note.sectionTitle}`}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className={`p-1 h-6 w-6 ${showDeleteConfirm ? 'text-red-700' : 'text-red-500'} hover:text-red-700`}
            aria-label={`Delete section ${note.sectionTitle}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Section Body */}
      {isExpanded && (
        <div className="bg-gray-50 border-t border-gray-200 mt-3 p-3 rounded-b-lg">
          {isEditing ? (
            <div>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
                className="w-full bg-white border border-blue-600 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Edit your content here..."
              />
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
                  aria-label={`Save changes to section ${note.sectionTitle}`}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancelEdit}
                  className="text-gray-700 hover:underline px-3 py-1 text-sm"
                  aria-label={`Cancel editing section ${note.sectionTitle}`}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                {note.content.map((line, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1.5 text-xs">•</span>
                    <span>{highlightText(line, searchQuery)}</span>
                  </li>
                ))}
              </ul>

              {/* Section Footer */}
              <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-200">
                {/* Star Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleStar}
                  className={`flex items-center space-x-1 ${note.starred ? 'text-yellow-600' : 'text-gray-500'} hover:text-yellow-600`}
                  aria-label={`Star section ${note.sectionTitle} for later review`}
                >
                  <Star className={`h-4 w-4 ${note.starred ? 'fill-current' : ''}`} />
                  <span className="text-xs">Star</span>
                </Button>

                {/* Add Custom Tag */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTagInput(!showTagInput)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                    aria-label={`Add custom tag to section ${note.sectionTitle}`}
                  >
                    <Tag className="h-4 w-4" />
                    <span className="text-xs">Tag</span>
                  </Button>

                  {showTagInput && (
                    <div className="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Type tag and press Enter..."
                          className="w-40 text-xs"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                          aria-label={`Type a custom tag for section ${note.sectionTitle}`}
                        />
                        <Button
                          size="sm"
                          onClick={handleAddTag}
                          className="px-2 py-1 text-xs"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          Click delete again to confirm removal of this section.
        </div>
      )}
    </div>
  );
};

export default AINotesSectionCard;
