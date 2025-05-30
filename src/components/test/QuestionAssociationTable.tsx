
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Edit,
  Plus,
  X
} from 'lucide-react';
import { QuestionMetadata } from '@/types/question';

interface QuestionAssociation {
  id: string;
  questionNumber: number;
  questionText: string;
  metadata: QuestionMetadata;
  createdAt: string;
  updatedAt: string;
}

interface QuestionAssociationTableProps {
  associations: QuestionAssociation[];
  onEditAssociation: (association: QuestionAssociation) => void;
  onCreateAssociation: () => void;
  onExportData: () => void;
}

const QuestionAssociationTable: React.FC<QuestionAssociationTableProps> = ({
  associations,
  onEditAssociation,
  onCreateAssociation,
  onExportData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('questionNumber');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAssociations = associations.filter(association => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const metadata = association.metadata;
    
    return (
      association.questionText.toLowerCase().includes(searchLower) ||
      metadata.subject?.toLowerCase().includes(searchLower) ||
      metadata.topic?.some(t => t.toLowerCase().includes(searchLower)) ||
      metadata.curriculum?.some(c => c.toLowerCase().includes(searchLower)) ||
      metadata.board?.some(b => b.toLowerCase().includes(searchLower)) ||
      metadata.level?.some(l => l.toLowerCase().includes(searchLower))
    );
  });

  const sortedAssociations = [...filteredAssociations].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortField) {
      case 'questionNumber':
        aValue = a.questionNumber;
        bValue = b.questionNumber;
        break;
      case 'subject':
        aValue = a.metadata.subject || '';
        bValue = b.metadata.subject || '';
        break;
      case 'grade':
        aValue = a.metadata.grade?.join(', ') || '';
        bValue = b.metadata.grade?.join(', ') || '';
        break;
      case 'difficulty':
        aValue = a.metadata.difficulty || '';
        bValue = b.metadata.difficulty || '';
        break;
      case 'marks':
        aValue = a.metadata.marks || 0;
        bValue = b.metadata.marks || 0;
        break;
      default:
        aValue = a.questionNumber;
        bValue = b.questionNumber;
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const renderBadgeArray = (items: string[] | number[] | undefined, colorClass: string) => {
    if (!items || items.length === 0) return <span className="text-gray-500">-</span>;
    
    return (
      <div className="flex flex-wrap gap-1">
        {items.slice(0, 2).map((item, index) => (
          <Badge key={index} variant="secondary" className={`${colorClass} text-white text-xs`}>
            {item}
          </Badge>
        ))}
        {items.length > 2 && (
          <Badge variant="secondary" className="bg-gray-600 text-white text-xs">
            +{items.length - 2}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-[#2A2A2A] border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Question Associations</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              size="sm"
              onClick={onCreateAssociation}
              className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Association
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters and Search */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search questions, subjects, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1E1E1E] border-gray-600 text-white"
              />
            </div>
          </div>
          <Select value={sortField} onValueChange={setSortField}>
            <SelectTrigger className="w-48 bg-[#1E1E1E] border-gray-600 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-gray-600">
              <SelectItem value="questionNumber">Question Number</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="grade">Grade</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="marks">Marks</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>

        {/* Association Table */}
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-gray-300">Q#</TableHead>
                <TableHead className="text-gray-300">Question</TableHead>
                <TableHead className="text-gray-300">Subject</TableHead>
                <TableHead className="text-gray-300">Grade</TableHead>
                <TableHead className="text-gray-300">Level</TableHead>
                <TableHead className="text-gray-300">Board</TableHead>
                <TableHead className="text-gray-300">Difficulty</TableHead>
                <TableHead className="text-gray-300">Marks</TableHead>
                <TableHead className="text-gray-300">Topics</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssociations.map((association) => (
                <TableRow 
                  key={association.id} 
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="text-white font-medium">
                    {association.questionNumber}
                  </TableCell>
                  <TableCell className="text-gray-300 max-w-48">
                    <div className="truncate">
                      {association.questionText}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {association.metadata.subject || '-'}
                  </TableCell>
                  <TableCell>
                    {renderBadgeArray(association.metadata.grade, 'bg-green-600')}
                  </TableCell>
                  <TableCell>
                    {renderBadgeArray(association.metadata.level, 'bg-orange-600')}
                  </TableCell>
                  <TableCell>
                    {renderBadgeArray(association.metadata.board, 'bg-red-600')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        association.metadata.difficulty === 'Foundation' ? 'bg-green-600' :
                        association.metadata.difficulty === 'Higher' ? 'bg-red-600' :
                        association.metadata.difficulty === 'Extended' ? 'bg-purple-600' :
                        'bg-blue-600'
                      } text-white`}
                    >
                      {association.metadata.difficulty || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    {association.metadata.marks || '-'}
                  </TableCell>
                  <TableCell>
                    {renderBadgeArray(association.metadata.topic, 'bg-[#38B6FF]')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditAssociation(association)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedAssociations.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No associations found matching your search criteria.
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{associations.length}</div>
            <div className="text-sm text-gray-400">Total Questions</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {new Set(associations.map(a => a.metadata.subject)).size}
            </div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {associations.reduce((sum, a) => sum + (a.metadata.marks || 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Total Marks</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {Math.round(associations.reduce((sum, a) => sum + (a.metadata.marks || 0), 0) / associations.length) || 0}
            </div>
            <div className="text-sm text-gray-400">Avg. Marks</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAssociationTable;
