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

  const getSortLabel = (criterion: string) => {
    switch (criterion) {
      case 'importance_desc': return 'Importance (High → Low)';
      case 'importance_asc': return 'Importance (Low → High)';
      case 'alpha_asc': return 'Alphabetical (A → Z)';
      case 'alpha_desc': return 'Alphabetical (Z → A)';
      case 'by_tag': return 'By Tag (Group by category)';
      case 'starred_first': return 'Starred First';
      default: return 'Sort by...';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mx-6 p-4">
      {/* Results Header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Generated Notes</h2>
        
        <div className="flex-1" />

        {/* Search Within Notes */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-60 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            aria-label="Search within generated notes"
          />
        </div>

        {/* Sort By Dropdown */}
        <Select value={sortCriterion} onValueChange={setSortCriterion}>
          <SelectTrigger className="w-48 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
            <SelectValue>{getSortLabel(sortCriterion)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="importance_desc">Importance (High → Low)</SelectItem>
            <SelectItem value="importance_asc">Importance (Low → High)</SelectItem>
            <SelectItem value="alpha_asc">Alphabetical (A → Z)</SelectItem>
            <SelectItem value="alpha_desc">Alphabetical (Z → A)</SelectItem>
            <SelectItem value="by_tag">By Tag (Group by category)</SelectItem>
            <SelectItem value="starred_first">Starred First</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Tag Button */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowTagFilter(!showTagFilter)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            aria-label="Filter notes by tags"
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

        {/* Export Button */}
        <Button
          variant="outline"
          onClick={handleExport}
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
          aria-label="Export generated notes to PDF"
        >
          <Download className="h-4 w-4 mr-2" />
          Export as PDF
        </Button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {processedNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchQuery || filteredTags.length > 0 ? 'No matching notes found' : 'No notes generated yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || filteredTags.length > 0 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Use the form above to generate your first set of notes.'
              }
            </p>
          </div>
        ) : (
          processedNotes.map((note) => (
            <AINotesSectionCard
              key={note.sectionId}
              note={note}
              isExpanded={expandedSections.has(note.sectionId)}
              onToggleExpanded={() => toggleExpanded(note.sectionId)}
              onUpdateNote={(updates) => updateNote(note.sectionId, updates)}
              onDeleteNote={() => deleteNote(note.sectionId)}
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AINotesResults;
