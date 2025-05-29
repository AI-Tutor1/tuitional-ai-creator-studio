
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  Users,
  FileText,
  MoreVertical
} from 'lucide-react';
import CreateTestModal from '@/components/test/CreateTestModal';
import Navigation from '@/components/Navigation';

interface Test {
  id: string;
  title: string;
  code: string;
  subject: string;
  grade: string;
  questionCount: number;
  createdBy: string;
  createdDate: string;
  status: 'Draft' | 'Published';
  duration: number;
}

const TestLibrary = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    curriculum: '',
    status: '',
    creator: ''
  });

  const mockTests: Test[] = [
    {
      id: '1',
      title: 'Photosynthesis and Plant Biology',
      code: 'BIO-101-A',
      subject: 'Biology',
      grade: '10th',
      questionCount: 25,
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-15',
      status: 'Published',
      duration: 90
    },
    {
      id: '2',
      title: 'Algebraic Equations Fundamentals',
      code: 'MATH-201-B',
      subject: 'Mathematics',
      grade: '9th',
      questionCount: 18,
      createdBy: 'Prof. Michael Chen',
      createdDate: '2024-01-12',
      status: 'Draft',
      duration: 60
    },
    {
      id: '3',
      title: 'Chemical Reactions and Stoichiometry',
      code: 'CHEM-301-C',
      subject: 'Chemistry',
      grade: '11th',
      questionCount: 30,
      createdBy: 'Dr. Emma Wilson',
      createdDate: '2024-01-10',
      status: 'Published',
      duration: 120
    }
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Test Library</h1>
            <p className="text-gray-400">Manage and organize your test assessments</p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white px-6 py-3 text-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Test
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="bg-[#2A2A2A] border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="text-white mb-2 block">Search Tests</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by title or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#1E1E1E] border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-white mb-2 block">Subject</Label>
                <Select value={filters.subject} onValueChange={(value) => setFilters({...filters, subject: value})}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Grade</Label>
                <Select value={filters.grade} onValueChange={(value) => setFilters({...filters, grade: value})}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="All Grades" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger className="bg-[#1E1E1E] border-gray-600 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button variant="outline" className="w-full border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Table */}
        <Card className="bg-[#2A2A2A] border-gray-700">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Test Name</TableHead>
                  <TableHead className="text-gray-300">Code</TableHead>
                  <TableHead className="text-gray-300">Subject</TableHead>
                  <TableHead className="text-gray-300">Grade</TableHead>
                  <TableHead className="text-gray-300">Questions</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Created By</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTests.map((test) => (
                  <TableRow key={test.id} className="border-gray-700 hover:bg-[#1E1E1E]">
                    <TableCell className="text-white font-medium">{test.title}</TableCell>
                    <TableCell className="text-gray-300 font-mono">{test.code}</TableCell>
                    <TableCell className="text-gray-300">{test.subject}</TableCell>
                    <TableCell className="text-gray-300">{test.grade}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <FileText className="mr-1 h-4 w-4" />
                        {test.questionCount}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {test.duration}m
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{test.createdBy}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={test.status === 'Published' ? 'default' : 'secondary'}
                        className={test.status === 'Published' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}
                      >
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CreateTestModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default TestLibrary;
