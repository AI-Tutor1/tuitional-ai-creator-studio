
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  File, 
  Upload, 
  X, 
  Download, 
  FileText,
  Image,
  FileSpreadsheet,
  FileArchive
} from 'lucide-react';
import { QuestionAttachment } from '@/types/question';

interface FileAttachmentProps {
  attachments?: QuestionAttachment[];
  onAttachmentAdd: (attachment: QuestionAttachment) => void;
  onAttachmentRemove: (attachmentId: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

const FileAttachment: React.FC<FileAttachmentProps> = ({
  attachments = [],
  onAttachmentAdd,
  onAttachmentRemove,
  maxSizeMB = 10,
  allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.gif', '.xlsx', '.zip']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
    if (type.includes('zip') || type.includes('archive')) return FileArchive;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const attachment: QuestionAttachment = {
        id: `attachment_${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        data: result,
        uploadedAt: new Date().toISOString()
      };
      onAttachmentAdd(attachment);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const downloadAttachment = (attachment: QuestionAttachment) => {
    const link = document.createElement('a');
    link.href = attachment.data;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging
            ? 'border-[#38B6FF] bg-blue-50/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400 mb-2">
          Drag and drop files here, or click to select
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <File className="h-4 w-4 mr-1" />
          Select Files
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Supports: {allowedTypes.join(', ')} (max {maxSizeMB}MB)
        </p>
      </div>

      {/* Attached Files List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Attached Files</h4>
          {attachments.map((attachment) => {
            const IconComponent = getFileIcon(attachment.type);
            return (
              <Card key={attachment.id} className="bg-[#2A2A2A] border-gray-600">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">{attachment.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {formatFileSize(attachment.size)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(attachment.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadAttachment(attachment)}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAttachmentRemove(attachment.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileAttachment;
