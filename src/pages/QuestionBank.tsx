
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import QuestionBuilder from '@/components/QuestionBuilder';
import QuestionAssociationTable from '@/components/test/QuestionAssociationTable';
import QuestionAssociationModal from '@/components/test/QuestionAssociationModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Table, Building } from 'lucide-react';
import BackButton from '@/components/shared/BackButton';

const QuestionBank = () => {
  const [isAssociationModalOpen, setIsAssociationModalOpen] = useState(false);
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');

  // Mock data for demonstration
  const mockAssociations = [
    {
      id: '1',
      questionNumber: 1,
      questionText: 'Calculate the area of a circle with radius 5cm',
      metadata: {
        subject: 'Mathematics',
        topic: ['Geometry', 'Area'],
        grade: ['Grade 10', 'Grade 11'],
        curriculum: ['Cambridge', 'Edexcel'],
        level: ['IGCSE'],
        board: ['Cambridge'],
        difficulty: 'Foundation',
        year: [2024],
        paperType: ['Theory'],
        paperCode: ['0580/21'],
        marks: 3,
        estimatedTime: 5,
        tags: ['circle', 'area', 'calculation']
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      questionNumber: 2,
      questionText: 'Explain the process of photosynthesis in plants',
      metadata: {
        subject: 'Biology',
        topic: ['Photosynthesis', 'Plant Biology'],
        grade: ['Grade 9', 'Grade 10'],
        curriculum: ['AQA', 'OCR'],
        level: ['GCSE'],
        board: ['AQA'],
        difficulty: 'Higher',
        year: [2023, 2024],
        paperType: ['Theory'],
        paperCode: ['8461/1H'],
        marks: 6,
        estimatedTime: 8,
        tags: ['biology', 'plants', 'photosynthesis']
      },
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    }
  ];

  const handleEditAssociation = (association) => {
    setSelectedAssociation(association);
    setIsAssociationModalOpen(true);
  };

  const handleCreateAssociation = () => {
    setSelectedAssociation(null);
    setIsAssociationModalOpen(true);
  };

  const handleSaveAssociation = (metadata) => {
    console.log('Saving association:', metadata);
    setIsAssociationModalOpen(false);
    setSelectedAssociation(null);
  };

  const handleExportData = () => {
    console.log('Exporting association data...');
    // Implementation for data export
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton to="/questions" label="Back to Question Bank" />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Question Bank Management
          </h1>
          <p className="text-xl text-gray-600">
            Create questions and manage their associations with comprehensive metadata
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger 
              value="builder" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Building className="h-4 w-4" />
              <span>Question Builder</span>
            </TabsTrigger>
            <TabsTrigger 
              value="associations" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Table className="h-4 w-4" />
              <span>Association Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-6">
            <QuestionBuilder />
          </TabsContent>

          <TabsContent value="associations" className="mt-6">
            <QuestionAssociationTable
              associations={mockAssociations}
              onEditAssociation={handleEditAssociation}
              onCreateAssociation={handleCreateAssociation}
              onExportData={handleExportData}
            />
          </TabsContent>
        </Tabs>

        {/* Association Modal */}
        <QuestionAssociationModal
          isOpen={isAssociationModalOpen}
          onClose={() => {
            setIsAssociationModalOpen(false);
            setSelectedAssociation(null);
          }}
          onSave={handleSaveAssociation}
          initialMetadata={selectedAssociation?.metadata || {}}
        />
      </div>
    </div>
  );
};

export default QuestionBank;
