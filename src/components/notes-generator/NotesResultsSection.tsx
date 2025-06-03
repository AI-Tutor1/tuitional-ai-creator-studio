
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
import NotesSectionCard from './NotesSectionCard';

interface GeneratedNote {
  sectionId: string;
  sectionTitle: string;
  content: string[];
  importance: number;
  tags: string[];
  starred?: boolean;
  customTags?: string[];
}

interface NotesResultsSectionProps {
  notes: GeneratedNote[];
  onNotesChange: (notes: GeneratedNote[]) => void;
}

const NotesResultsSection: React.FC<NotesResultsSectionProps> = ({
  notes,
  onNotesChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('importance_desc');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const updateNote = (updatedNote: GeneratedNote) => {
    const updatedNotes = notes.map(note => 
      note.sectionId === updatedNote.sectionId ? updatedNote : note
    );
    onNotesChange(updatedNotes);
  };

  const deleteNote = (sectionId: string) => {
    const updatedNotes = notes.filter(note => note.sectionId !== sectionId);
    onNotesChange(updatedNotes);
  };

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = notes.filter(note =>
        note.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.some(content => 
          content.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        note.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (note.customTags || []).some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'importance_desc':
          return b.importance - a.importance;
        case 'importance_asc':
          return a.importance - b.importance;
        case 'alpha_asc':
          return a.sectionTitle.localeCompare(b.sectionTitle);
        case 'alpha_desc':
          return b.sectionTitle.localeCompare(a.sectionTitle);
        case 'by_tag':
          const tagOrder = ['Definition', 'Example', 'Equation', 'Term', 'Process'];
          const aTagScore = Math.min(...a.tags.map(tag => {
            const index = tagOrder.indexOf(tag);
            return index === -1 ? 999 : index;
          }));
          const bTagScore = Math.min(...b.tags.map(tag => {
            const index = tagOrder.indexOf(tag);
            return index === -1 ? 999 : index;
          }));
          return aTagScore - bTagScore;
        default:
          return 0;
      }
    });

    // Move starred items to top if any are starred
    const starred = sorted.filter(note => note.starred);
    const unstarred = sorted.filter(note => !note.starred);
    
    return starred.length > 0 ? [...starred, ...unstarred] : sorted;
  }, [notes, searchQuery, sortBy]);

  const handleExport = async () => {
    // Simulate PDF export
    console.log('Exporting notes as PDF...');
    // In a real implementation, this would call an API endpoint
  };

  if (filteredAndSortedNotes.length === 0 && searchQuery.trim()) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mx-6">
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No sections match your search.</h3>
          <p className="text-sm text-gray-500 mt-2">Try different keywords or clear the search.</p>
          <Button
            variant="ghost"
            onClick={() => setSearchQuery('')}
            className="mt-4 text-blue-600 hover:text-blue-700 hover:underline"
          >
            Clear Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mx-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Generated Notes</h2>
        
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-60 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              aria-label="Search within generated notes"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="importance_desc">Importance (High → Low)</SelectItem>
              <SelectItem value="importance_asc">Importance (Low → High)</SelectItem>
              <SelectItem value="alpha_asc">Alphabetical (A → Z)</SelectItem>
              <SelectItem value="alpha_desc">Alphabetical (Z → A)</SelectItem>
              <SelectItem value="by_tag">By Tag</SelectItem>
            </SelectContent>
          </Select>

          {/* Export */}
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            aria-label="Export generated notes as PDF"
          >
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredAndSortedNotes.map(note => (
          <NotesSectionCard
            key={note.sectionId}
            note={note}
            isExpanded={expandedSections.has(note.sectionId)}
            onToggleExpand={() => toggleSection(note.sectionId)}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesResultsSection;
