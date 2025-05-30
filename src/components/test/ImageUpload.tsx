
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image, Upload, X, Eye } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
  currentImage?: string;
  onRemoveImage: () => void;
  maxSizeMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  onRemoveImage,
  maxSizeMB = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
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

  return (
    <div className="space-y-3">
      {currentImage ? (
        <div className="relative">
          <Card className="p-4 bg-[#2A2A2A] border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Image uploaded</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRemoveImage}
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            <img
              src={currentImage}
              alt="Uploaded"
              className="w-full max-h-32 object-contain rounded bg-gray-800"
            />
          </Card>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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
          <Image className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-400 mb-2">
            Drag and drop an image here, or click to select
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Upload className="h-4 w-4 mr-1" />
            Select Image
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Supports JPG, PNG, GIF (max {maxSizeMB}MB)
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Image Preview Modal */}
      {showPreview && currentImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={currentImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
