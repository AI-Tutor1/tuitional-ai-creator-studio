
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Edit,
  Trash2,
  Star,
  Tag,
  X,
  Check
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

interface NotesSectionCardProps {
  note: GeneratedNote;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdateNote: (note: GeneratedNote) => void;
  onDeleteNote: (sectionId: string) => void;
  searchQuery: string;
}

const NotesSectionCard: React.FC<NotesSectionCardProps> = ({
  note,
  isExpanded,
  onToggleExpand,
  onUpdateNote,
  onDeleteNote,
  searchQuery
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content.join('\n'));
  const [customTagInput, setCustomTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const handleCopy = async () => {
    const content = `${note.sectionTitle}\n\n${note.content.join('\n')}`;
    try {
      await navigator.clipboard.writeText(content);
      // In a real app, you'd show a toast notification
      console.log('Section copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSaveEdit = () => {
    const updatedContent = editedContent.split('\n').filter(line => line.trim());
    onUpdateNote({
      ...note,
      content: updatedContent
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(note.content.join('\n'));
    setIsEditing(false);
  };

  const handleStarToggle = () => {
    onUpdateNote({
      ...note,
      starred: !note.starred
    });
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim() && !(note.customTags || []).includes(customTagInput.trim())) {
      onUpdateNote({
        ...note,
        customTags: [...(note.customTags || []), customTagInput.trim()]
      });
      setCustomTagInput('');
      setShowTagInput(false);
    }
  };

  const handleRemoveCustomTag = (tagToRemove: string) => {
    onUpdateNote({
      ...note,
      customTags: (note.customTags || []).filter(tag => tag !== tagToRemove)
    });
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const renderStars = (importance: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < importance ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Section Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="p-1 text-blue-600 hover:text-blue-700"
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} section ${note.sectionTitle}`}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {/* Section Title */}
            <h3 
              className="text-lg font-semibold text-gray-900 flex-1"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(note.sectionTitle) 
              }}
            />

            {/* Importance Stars */}
            <div className="flex items-center space-x-1">
              {renderStars(note.importance)}
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2">
              {note.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
              {(note.customTags || []).map(tag => (
                <span
                  key={tag}
                  className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-semibold flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveCustomTag(tag)}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-blue-600"
              aria-label={`Copy content of section ${note.sectionTitle}`}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600"
              aria-label={`Edit section ${note.sectionTitle}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteNote(note.sectionId)}
              className="p-2 text-gray-400 hover:text-red-600"
              aria-label={`Delete section ${note.sectionTitle}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section Body (Expandable) */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={Math.max(4, editedContent.split('\n').length)}
                className="w-full resize-none font-mono text-sm"
              />
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSaveEdit}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Content */}
              <ul className="space-y-2 text-gray-900 leading-relaxed">
                {note.content.map((item, index) => (
                  <li 
                    key={index} 
                    className="list-disc list-inside"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(item) 
                    }}
                  />
                ))}
              </ul>

              {/* Section Footer */}
              <div className="flex items-center space-x-4 pt-2 border-t border-gray-200">
                {/* Star Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleStarToggle}
                  className={`flex items-center space-x-1 ${
                    note.starred 
                      ? 'text-yellow-600 hover:text-yellow-700' 
                      : 'text-gray-400 hover:text-yellow-600'
                  }`}
                  aria-label={`${note.starred ? 'Unstar' : 'Star'} section ${note.sectionTitle} for quick reference`}
                >
                  <Star className={`h-4 w-4 ${note.starred ? 'fill-current' : ''}`} />
                  <span className="text-xs">Star</span>
                </Button>

                {/* Custom Tag */}
                {showTagInput ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Enter custom tag"
                      value={customTagInput}
                      onChange={(e) => setCustomTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCustomTag();
                        } else if (e.key === 'Escape') {
                          setShowTagInput(false);
                          setCustomTagInput('');
                        }
                      }}
                      className="text-xs h-6 w-24"
                      autoFocus
                    />
                    <Button
                      onClick={handleAddCustomTag}
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-green-600 hover:text-green-700"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => {
                        setShowTagInput(false);
                        setCustomTagInput('');
                      }}
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTagInput(true)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-blue-600"
                    aria-label={`Add custom tag to section ${note.sectionTitle}`}
                  >
                    <Tag className="h-4 w-4" />
                    <span className="text-xs">Add Tag</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesSectionCard;
