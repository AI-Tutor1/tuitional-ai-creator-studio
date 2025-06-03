
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface SourceContent {
  sourceType: 'text' | 'document' | 'topics';
  sourceText: string;
  uploadedFiles: Array<{ fileId: string; fileName: string; fileSize: number }>;
  topics: string[];
}

interface SourceSelectionTabsProps {
  sourceContent: SourceContent;
  onSourceContentChange: (content: SourceContent) => void;
}

const SourceSelectionTabs: React.FC<SourceSelectionTabsProps> = ({
  sourceContent,
  onSourceContentChange
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'document' | 'topics'>('text');
  const [topicInput, setTopicInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: 'text' | 'document' | 'topics') => {
    setActiveTab(tab);
    onSourceContentChange({
      ...sourceContent,
      sourceType: tab
    });
  };

  const handleTextChange = (text: string) => {
    onSourceContentChange({
      ...sourceContent,
      sourceText: text
    });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).map(file => ({
      fileId: `file-${Date.now()}-${Math.random()}`,
      fileName: file.name,
      fileSize: file.size
    }));

    onSourceContentChange({
      ...sourceContent,
      uploadedFiles: [...sourceContent.uploadedFiles, ...newFiles]
    });
  };

  const removeFile = (fileId: string) => {
    onSourceContentChange({
      ...sourceContent,
      uploadedFiles: sourceContent.uploadedFiles.filter(f => f.fileId !== fileId)
    });
  };

  const addTopic = (topic: string) => {
    if (topic.trim() && !sourceContent.topics.includes(topic.trim()) && sourceContent.topics.length < 20) {
      onSourceContentChange({
        ...sourceContent,
        topics: [...sourceContent.topics, topic.trim()]
      });
      setTopicInput('');
    }
  };

  const removeTopic = (index: number) => {
    onSourceContentChange({
      ...sourceContent,
      topics: sourceContent.topics.filter((_, i) => i !== index)
    });
  };

  const handleTopicKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic(topicInput);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mx-6">
      {/* Tab Headers */}
      <div className="flex space-x-8 mb-6">
        {[
          { key: 'text', label: 'Text Input' },
          { key: 'document', label: 'Upload Document' },
          { key: 'topics', label: 'Topic List' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key as any)}
            className={`px-4 py-2 text-base font-semibold rounded-t-lg border-b-2 ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-900'
            }`}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`${tab.key}-panel`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg p-6">
        {/* Text Input Panel */}
        {activeTab === 'text' && (
          <div id="text-panel" role="tabpanel">
            <Label htmlFor="notes-source-text" className="sr-only">
              Paste your content
            </Label>
            <Textarea
              id="notes-source-text"
              placeholder="Paste or type your text here..."
              rows={8}
              value={sourceContent.sourceText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full resize-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              maxLength={10000}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">
                {sourceContent.sourceText.length} / 10,000 characters
              </span>
            </div>
          </div>
        )}

        {/* Upload Document Panel */}
        {activeTab === 'document' && (
          <div id="document-panel" role="tabpanel">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Upload a document (PDF, DOCX, or TXT)
            </Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag files here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Supported: PDF, DOCX, TXT</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            
            {/* Uploaded Files List */}
            {sourceContent.uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {sourceContent.uploadedFiles.map(file => (
                  <div key={file.fileId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{file.fileName}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({Math.round(file.fileSize / 1024)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.fileId)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Topics Panel */}
        {activeTab === 'topics' && (
          <div id="topics-panel" role="tabpanel">
            <Label htmlFor="topics-input" className="text-sm font-medium text-gray-700 mb-2 block">
              Enter topics or key terms, separated by commas
            </Label>
            <Input
              id="topics-input"
              placeholder="e.g., Photosynthesis, Cell Structure, DNA Replication"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleTopicKeyPress}
              className="mb-4 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            
            {/* Topic Chips */}
            {sourceContent.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {sourceContent.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {topic}
                    <button
                      onClick={() => removeTopic(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      aria-label={`Remove topic ${topic}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              {sourceContent.topics.length} / 20 topics
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceSelectionTabs;
