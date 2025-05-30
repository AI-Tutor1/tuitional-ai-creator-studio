import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import BackButton from '@/components/shared/BackButton';

const StudentTestBank = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for available tests
  const availableTests = [
    {
      id: 1,
      title: 'Biology Chapter 5: Photosynthesis',
      description: 'Test your understanding of photosynthesis processes',
      subject: 'Biology',
      duration: 60,
      questions: 25,
      difficulty: 'Medium',
      status: 'available',
      dueDate: '2024-02-01',
      attempts: 0,
      maxAttempts: 2
    },
    {
      id: 2,
      title: 'Chemistry: Chemical Reactions',
      description: 'Assess your knowledge of balancing equations',
      subject: 'Chemistry',
      duration: 45,
      questions: 20,
      difficulty: 'Hard',
      status: 'completed',
      dueDate: '2024-01-25',
      attempts: 1,
      maxAttempts: 1
    },
    {
      id: 3,
      title: 'Physics: Newton\'s Laws',
      description: 'Test on forces, motion, and energy',
      subject: 'Physics',
      duration: 50,
      questions: 15,
      difficulty: 'Easy',
      status: 'available',
      dueDate: '2024-02-10',
      attempts: 1,
      maxAttempts: 2
    },
    {
      id: 4,
      title: 'Mathematics: Algebra Basics',
      description: 'Fundamentals of algebraic expressions and equations',
      subject: 'Mathematics',
      duration: 40,
      questions: 18,
      difficulty: 'Medium',
      status: 'pending',
      dueDate: '2024-01-28',
      attempts: 0,
      maxAttempts: 1
    }
  ];

  const filteredTests = availableTests.filter(test => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      test.title.toLowerCase().includes(searchTermLower) ||
      test.subject.toLowerCase().includes(searchTermLower) ||
      test.description.toLowerCase().includes(searchTermLower);

    if (selectedFilter === 'all') {
      return matchesSearch;
    } else if (selectedFilter === 'available') {
      return matchesSearch && test.status === 'available';
    } else if (selectedFilter === 'completed') {
      return matchesSearch && test.status === 'completed';
    } else if (selectedFilter === 'pending') {
      return matchesSearch && test.status === 'pending';
    }

    return false;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton to="/" label="Back to Dashboard" />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and take your assigned tests
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(test.status)}
                  <CardTitle>{test.title}</CardTitle>
                </div>
                <Badge variant="secondary">{test.difficulty}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{test.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-gray-400" />
                    {test.questions} Questions
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    {test.duration} Minutes
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  {test.status === 'available' && (
                    <Button className="bg-[#007AFF] hover:bg-[#0056CC]">
                      <Play className="mr-2 h-4 w-4" />
                      Start Test
                    </Button>
                  )}
                  {test.status === 'pending' && (
                    <Badge variant="outline">
                      Due: {test.dueDate}
                    </Badge>
                  )}
                  {test.status === 'completed' && (
                    <Badge variant="default">
                      Completed
                    </Badge>
                  )}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Star className="h-4 w-4" />
                    {test.attempts}/{test.maxAttempts} Attempts
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTestBank;
