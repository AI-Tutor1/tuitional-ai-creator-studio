
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Copy, Edit, Trash2, Star } from 'lucide-react';

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

  const handleCopy = async () => {
    const text = `${note.sectionTitle}\n\n${note.content.join('\n')}`;
    await navigator.clipboard.writeText(text);
    // Show a temporary success message
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(note.content.join('\n'));
  };

  const handleSave = () => {
    const newContent = editContent.split('\n').filter(line => line.trim());
    onUpdateNote({ content: newContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(note.content.join('\n'));
  };

  const handleStar = () => {
    onUpdateNote({ starred: !note.starred });
  };

  const renderImportanceStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= note.importance ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
              className="mt-1 p-1 h-auto"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-blue-600" />
              )}
            </Button>

            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 
                className="text-lg font-semibold text-gray-900 mb-2"
                dangerouslySetInnerHTML={{ __html: highlightText(note.sectionTitle) }}
              />

              {/* Importance and Tags */}
              <div className="flex items-center flex-wrap gap-3">
                {renderImportanceStars()}
                
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {tag}
                    </Badge>
                  ))}
                  {note.customTags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStar}
              className={`p-2 ${note.starred ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              <Star className={`h-4 w-4 ${note.starred ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeleteNote}
              className="p-2 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 bg-gray-50">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
              <div className="flex space-x-3">
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ul className="space-y-2">
                {note.content.map((line, index) => (
                  <li 
                    key={index} 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(line) }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AINotesSectionCard;
