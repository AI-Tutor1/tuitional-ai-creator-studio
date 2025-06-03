
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
import { Search, Download, Filter } from 'lucide-react';
import AINotesSectionCard from '@/components/ai-notes-generator/AINotesSectionCard';
import TagFilterPanel from '@/components/ai-notes-generator/TagFilterPanel';

interface GeneratedNote {
  sectionId: string;
  sectionTitle: string;
  content: string[];
  importance: number;
  tags: string[];
  starred?: boolean;
  customTags?: string[];
}

interface AINotesResultsProps {
  notes: GeneratedNote[];
  onNotesChange: (notes: GeneratedNote[]) => void;
}

const AINotesResults: React.FC<AINotesResultsProps> = ({ notes, onNotesChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriterion, setSortCriterion] = useState('importance_desc');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tagSet.add(tag));
      note.customTags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [notes]);

  // Filter and sort notes
  const processedNotes = useMemo(() => {
    let filtered = notes;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.sectionTitle.toLowerCase().includes(query) ||
        note.content.some(line => line.toLowerCase().includes(query))
      );
    }

    // Apply tag filter
    if (filteredTags.length > 0) {
      filtered = filtered.filter(note =>
        note.tags.some(tag => filteredTags.includes(tag)) ||
        note.customTags?.some(tag => filteredTags.includes(tag))
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortCriterion) {
      case 'importance_desc':
        sorted.sort((a, b) => b.importance - a.importance);
        break;
      case 'importance_asc':
        sorted.sort((a, b) => a.importance - b.importance);
        break;
      case 'alpha_asc':
        sorted.sort((a, b) => a.sectionTitle.localeCompare(b.sectionTitle));
        break;
      case 'alpha_desc':
        sorted.sort((a, b) => b.sectionTitle.localeCompare(a.sectionTitle));
        break;
      case 'by_tag':
        const tagOrder = ['Definition', 'Process', 'Equation', 'Example', 'Term', 'Location'];
        sorted.sort((a, b) => {
          const aTagIndex = Math.min(...a.tags.map(t => {
            const index = tagOrder.indexOf(t);
            return index >= 0 ? index : tagOrder.length;
          }));
          const bTagIndex = Math.min(...b.tags.map(t => {
            const index = tagOrder.indexOf(t);
            return index >= 0 ? index : tagOrder.length;
          }));
          if (aTagIndex !== bTagIndex) return aTagIndex - bTagIndex;
          return b.importance - a.importance;
        });
        break;
      case 'starred_first':
        sorted.sort((a, b) => {
          if (a.starred && !b.starred) return -1;
          if (!a.starred && b.starred) return 1;
          return b.importance - a.importance;
        });
        break;
    }

    return sorted;
  }, [notes, searchQuery, filteredTags, sortCriterion]);

  const updateNote = (noteId: string, updates: Partial<GeneratedNote>) => {
    const updatedNotes = notes.map(note =>
      note.sectionId === noteId ? { ...note, ...updates } : note
    );
    onNotesChange(updatedNotes);
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.sectionId !== noteId);
    onNotesChange(updatedNotes);
  };

  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleExport = async () => {
    // Simulate PDF export
    console.log('Exporting notes to PDF:', notes);
    // In real implementation, this would call the export API
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Results Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Sort By */}
            <Select value={sortCriterion} onValueChange={setSortCriterion}>
              <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="importance_desc">Importance (High → Low)</SelectItem>
                <SelectItem value="importance_asc">Importance (Low → High)</SelectItem>
                <SelectItem value="alpha_asc">Alphabetical (A → Z)</SelectItem>
                <SelectItem value="alpha_desc">Alphabetical (Z → A)</SelectItem>
                <SelectItem value="by_tag">By Tag</SelectItem>
                <SelectItem value="starred_first">Starred First</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter by Tag */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowTagFilter(!showTagFilter)}
                className="h-10 border-gray-200 hover:bg-gray-50 rounded-lg"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter by Tag
              </Button>
              
              {showTagFilter && (
                <TagFilterPanel
                  allTags={allTags}
                  selectedTags={filteredTags}
                  onTagsChange={setFilteredTags}
                  onClose={() => setShowTagFilter(false)}
                />
              )}
            </div>

            {/* Export */}
            <Button
              variant="outline"
              onClick={handleExport}
              className="h-10 border-gray-200 hover:bg-gray-50 rounded-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="p-6">
        {processedNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchQuery || filteredTags.length > 0 ? 'No matching notes found' : 'No notes generated yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || filteredTags.length > 0 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Use the form to generate your first set of notes.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {processedNotes.map((note) => (
              <AINotesSectionCard
                key={note.sectionId}
                note={note}
                isExpanded={expandedSections.has(note.sectionId)}
                onToggleExpanded={() => toggleExpanded(note.sectionId)}
                onUpdateNote={(updates) => updateNote(note.sectionId, updates)}
                onDeleteNote={() => deleteNote(note.sectionId)}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AINotesResults;
