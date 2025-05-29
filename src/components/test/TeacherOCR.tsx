
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileImage, X, Copy, Check, FileText, Plus } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { Badge } from '@/components/ui/badge';

interface TeacherOCRProps {
  onTextExtracted: (text: string, insertMode?: 'replace' | 'append') => void;
  onClose: () => void;
  title?: string;
  placeholder?: string;
}

const TeacherOCR: React.FC<TeacherOCRProps> = ({ 
  onTextExtracted, 
  onClose, 
  title = "OCR - Extract Text from Image",
  placeholder = "Upload an image to extract text for your question..."
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessing(true);
    setProgress(0);

    try {
      const worker = await createWorker('eng');
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const { data: { text } } = await worker.recognize(file);

      clearInterval(progressInterval);
      await worker.terminate();
      
      setExtractedText(text);
      setProgress(100);
    } catch (error) {
      console.error('OCR processing failed:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const useExtractedText = (mode: 'replace' | 'append' = 'replace') => {
    onTextExtracted(extractedText, mode);
    onClose();
  };

  const resetOCR = () => {
    setImagePreview(null);
    setExtractedText('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] bg-[#2A2A2A] border-gray-700 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">Extract text from handwritten or printed content</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-4">
            {/* Upload Area */}
            {!imagePreview && (
              <div
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-[#38B6FF] transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-300 mb-2">Drop an image here or click to upload</p>
                <p className="text-gray-500 text-sm">{placeholder}</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-600 text-white text-xs">Handwritten</Badge>
                  <Badge variant="secondary" className="bg-green-600 text-white text-xs">Printed Text</Badge>
                  <Badge variant="secondary" className="bg-purple-600 text-white text-xs">Mathematical</Badge>
                </div>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded for OCR"
                  className="w-full max-h-64 object-contain rounded-lg border border-gray-600"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                  onClick={resetOCR}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Processing image...</span>
                  <span className="text-[#38B6FF]">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Extracted Text */}
            {extractedText && !isProcessing && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Extracted Text:</label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyText}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetOCR}>
                      <FileText className="h-4 w-4" />
                      New Image
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="bg-[#1E1E1E] border-gray-600 text-white min-h-[120px]"
                  placeholder="Extracted text will appear here. You can edit it before using."
                />
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => useExtractedText('append')}
                    className="border-gray-600 text-gray-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Append Text
                  </Button>
                  <Button 
                    onClick={() => useExtractedText('replace')} 
                    className="bg-[#38B6FF] hover:bg-[#2A9DE8]"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Use Text
                  </Button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherOCR;
