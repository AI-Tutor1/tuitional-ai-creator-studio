import * as React from 'react';
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterField, setFilterField] = React.useState<string>('all');
  const [sortField, setSortField] = React.useState<string>('questionNumber');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const filteredAssociations = associations.filter(association => {
    if (!searchTerm) return true;
    const searchText = searchTerm.toLowerCase();

    if (filterField === 'all') {
      return (
        association.questionText.toLowerCase().includes(searchText) ||
        association.metadata.subject?.toLowerCase().includes(searchText) ||
        association.metadata.topic?.some(topic => topic.toLowerCase().includes(searchText)) ||
        association.metadata.grade?.some(grade => grade.toLowerCase().includes(searchText))
      );
    } else if (filterField === 'questionText') {
      return association.questionText.toLowerCase().includes(searchText);
    } else if (filterField === 'subject') {
      return association.metadata.subject?.toLowerCase().includes(searchText);
    } else if (filterField === 'topic') {
      return association.metadata.topic?.some(topic => topic.toLowerCase().includes(searchText));
    } else if (filterField === 'grade') {
      return association.metadata.grade?.some(grade => grade.toLowerCase().includes(searchText));
    }

    return false;
  });

  const sortedAssociations = [...filteredAssociations].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <Card className="bg-[#2A2A2A] border-gray-700">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <CardTitle className="text-white flex items-center">
          <Table className="mr-2 h-5 w-5" />
          Question Associations
        </CardTitle>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1E1E1E] border-gray-600 text-white placeholder-gray-400"
          />
          <Select value={filterField} onValueChange={setFilterField}>
            <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-gray-600 text-white">
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="questionText">Question Text</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="topic">Topic</SelectItem>
              <SelectItem value="grade">Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('questionNumber')} className="cursor-pointer">
                #
              </TableHead>
              <TableHead onClick={() => handleSort('questionText')} className="cursor-pointer">
                Question
              </TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead>Grades</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAssociations.map((association) => (
              <TableRow key={association.id}>
                <TableCell>{association.questionNumber}</TableCell>
                <TableCell>{association.questionText}</TableCell>
                <TableCell>{association.metadata.subject}</TableCell>
                <TableCell>{association.metadata.topic?.join(', ') || '-'}</TableCell>
                <TableCell>{association.metadata.grade?.join(', ') || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditAssociation(association)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <div className="flex items-center justify-between p-4 border-t border-gray-700">
        <Button
          onClick={onCreateAssociation}
          className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Association
        </Button>
        <Button
          onClick={onExportData}
          className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </Card>
  );
};

export default QuestionAssociationTable;
