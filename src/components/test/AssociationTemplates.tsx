
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BookTemplate, 
  Plus, 
  Save, 
  Trash2,
  Copy,
  Star
} from 'lucide-react';
import { QuestionMetadata } from '@/types/question';

interface AssociationTemplate {
  id: string;
  name: string;
  description: string;
  metadata: Partial<QuestionMetadata>;
  isDefault: boolean;
  usageCount: number;
  createdAt: string;
}

interface AssociationTemplatesProps {
  templates: AssociationTemplate[];
  onApplyTemplate: (template: AssociationTemplate) => void;
  onSaveTemplate: (template: Omit<AssociationTemplate, 'id' | 'usageCount' | 'createdAt'>) => void;
  onDeleteTemplate: (templateId: string) => void;
}

const AssociationTemplates: React.FC<AssociationTemplatesProps> = ({
  templates,
  onApplyTemplate,
  onSaveTemplate,
  onDeleteTemplate
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<AssociationTemplate>>({
    name: '',
    description: '',
    metadata: {},
    isDefault: false
  });

  const defaultTemplates: AssociationTemplate[] = [
    {
      id: 'template_igcse_math',
      name: 'IGCSE Mathematics',
      description: 'Standard IGCSE Mathematics question template',
      metadata: {
        subject: 'Mathematics',
        level: ['IGCSE'],
        board: ['Cambridge', 'Edexcel'],
        curriculum: ['Cambridge', 'Edexcel'],
        difficulty: 'Foundation',
        grade: ['Grade 10', 'Grade 11']
      },
      isDefault: true,
      usageCount: 145,
      createdAt: '2024-01-15'
    },
    {
      id: 'template_gcse_science',
      name: 'GCSE Combined Science',
      description: 'GCSE Combined Science template for Biology, Chemistry, Physics',
      metadata: {
        subject: 'Biology',
        level: ['GCSE'],
        board: ['AQA', 'OCR', 'Edexcel'],
        curriculum: ['AQA', 'OCR', 'Edexcel'],
        difficulty: 'Foundation',
        grade: ['Year 10', 'Year 11']
      },
      isDefault: true,
      usageCount: 98,
      createdAt: '2024-01-10'
    },
    {
      id: 'template_ib_dp',
      name: 'IB Diploma Programme',
      description: 'International Baccalaureate Diploma Programme template',
      metadata: {
        level: ['IB DP'],
        curriculum: ['IB'],
        grade: ['Year 12', 'Year 13'],
        difficulty: 'Higher'
      },
      isDefault: true,
      usageCount: 67,
      createdAt: '2024-01-08'
    }
  ];

  const allTemplates = [...defaultTemplates, ...templates];

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description) return;
    
    onSaveTemplate({
      name: newTemplate.name,
      description: newTemplate.description,
      metadata: newTemplate.metadata || {},
      isDefault: false
    });
    
    setNewTemplate({
      name: '',
      description: '',
      metadata: {},
      isDefault: false
    });
    setIsCreateModalOpen(false);
  };

  const renderMetadataBadges = (metadata: Partial<QuestionMetadata>) => {
    const badges = [];
    
    if (metadata.subject) {
      badges.push(
        <Badge key="subject" variant="secondary" className="bg-blue-600 text-white">
          {metadata.subject}
        </Badge>
      );
    }
    
    if (metadata.level && metadata.level.length > 0) {
      badges.push(
        <Badge key="level" variant="secondary" className="bg-orange-600 text-white">
          {metadata.level.join(', ')}
        </Badge>
      );
    }
    
    if (metadata.board && metadata.board.length > 0) {
      badges.push(
        <Badge key="board" variant="secondary" className="bg-red-600 text-white">
          {metadata.board.join(', ')}
        </Badge>
      );
    }
    
    if (metadata.difficulty) {
      badges.push(
        <Badge key="difficulty" variant="secondary" className="bg-purple-600 text-white">
          {metadata.difficulty}
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#2A2A2A] border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <BookTemplate className="mr-2 h-5 w-5" />
              Association Templates
            </CardTitle>
            <Button
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[#1E1E1E] rounded-lg p-4 border border-gray-700 hover:border-[#38B6FF] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-white">{template.name}</h3>
                    {template.isDefault && (
                      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    )}
                  </div>
                  {!template.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTemplate(template.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {renderMetadataBadges(template.metadata)}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Used {template.usageCount} times</span>
                  <span>{template.createdAt}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onApplyTemplate(template)}
                    className="flex-1 bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Template Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-[#2A2A2A] border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create Association Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Template Name</Label>
              <Input
                value={newTemplate.name || ''}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., IGCSE Physics 2024"
                className="bg-[#1E1E1E] border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Description</Label>
              <Input
                value={newTemplate.description || ''}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this template"
                className="bg-[#1E1E1E] border-gray-600 text-white"
              />
            </div>
            
            <div className="text-sm text-gray-400">
              Note: You can set the association details after creating the template.
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTemplate}
                disabled={!newTemplate.name || !newTemplate.description}
                className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssociationTemplates;
