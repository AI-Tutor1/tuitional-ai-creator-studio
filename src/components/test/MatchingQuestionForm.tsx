
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Scan,
  Image,
  Shuffle
} from 'lucide-react';
import { MatchingPair } from '@/types/question';
import ImageUpload from './ImageUpload';

interface MatchingQuestionFormProps {
  matchingPairs: MatchingPair[];
  onUpdate: (pairs: MatchingPair[]) => void;
  onOpenOCR?: (field: string, pairIndex: number, side: 'left' | 'right') => void;
}

const MatchingQuestionForm: React.FC<MatchingQuestionFormProps> = ({ 
  matchingPairs, 
  onUpdate,
  onOpenOCR 
}) => {
  const addMatchingPair = () => {
    const newPair: MatchingPair = {
      id: `pair_${Date.now()}`,
      leftItem: '',
      rightItem: ''
    };
    onUpdate([...matchingPairs, newPair]);
  };

  const removeMatchingPair = (pairId: string) => {
    if (matchingPairs.length <= 2) return; // Minimum 2 pairs
    onUpdate(matchingPairs.filter(pair => pair.id !== pairId));
  };

  const updateMatchingPair = (pairId: string, field: keyof MatchingPair, value: any) => {
    onUpdate(matchingPairs.map(pair => 
      pair.id === pairId ? { ...pair, [field]: value } : pair
    ));
  };

  const shufflePairs = () => {
    const shuffledLeft = [...matchingPairs.map(p => ({ leftItem: p.leftItem, leftImage: p.leftImage }))];
    const shuffledRight = [...matchingPairs.map(p => ({ rightItem: p.rightItem, rightImage: p.rightImage }))];
    
    // Fisher-Yates shuffle for right items
    for (let i = shuffledRight.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
    }

    const newPairs = matchingPairs.map((pair, index) => ({
      ...pair,
      leftItem: shuffledLeft[index].leftItem,
      leftImage: shuffledLeft[index].leftImage,
      rightItem: shuffledRight[index].rightItem,
      rightImage: shuffledRight[index].rightImage
    }));

    onUpdate(newPairs);
  };

  return (
    <Card className="bg-[#1E1E1E] border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">Matching Pairs</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shufflePairs}
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
            >
              <Shuffle className="h-4 w-4 mr-1" />
              Shuffle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={addMatchingPair}
              className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Pair
            </Button>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Create pairs of items that students need to match. Minimum 2 pairs required.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchingPairs.map((pair, index) => (
            <div key={pair.id} className="border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  Pair {index + 1}
                </Badge>
                {matchingPairs.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMatchingPair(pair.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Item */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-white text-sm">Left Item</Label>
                    {onOpenOCR && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenOCR('matching', index, 'left')}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white text-xs px-2 py-1"
                      >
                        <Scan className="h-3 w-3 mr-1" />
                        OCR
                      </Button>
                    )}
                  </div>
                  <Input
                    value={pair.leftItem}
                    onChange={(e) => updateMatchingPair(pair.id, 'leftItem', e.target.value)}
                    placeholder="Enter left item text"
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                  />
                  
                  {/* Left Image Upload */}
                  <div>
                    <Label className="text-white text-sm mb-2 block flex items-center">
                      <Image className="mr-1 h-3 w-3" />
                      Left Image (optional)
                    </Label>
                    <ImageUpload
                      onImageUpload={(imageData) => updateMatchingPair(pair.id, 'leftImage', imageData)}
                      currentImage={pair.leftImage}
                      onRemoveImage={() => updateMatchingPair(pair.id, 'leftImage', undefined)}
                    />
                  </div>
                </div>

                {/* Right Item */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-white text-sm">Right Item</Label>
                    {onOpenOCR && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenOCR('matching', index, 'right')}
                        className="border-[#38B6FF] text-[#38B6FF] hover:bg-[#38B6FF] hover:text-white text-xs px-2 py-1"
                      >
                        <Scan className="h-3 w-3 mr-1" />
                        OCR
                      </Button>
                    )}
                  </div>
                  <Input
                    value={pair.rightItem}
                    onChange={(e) => updateMatchingPair(pair.id, 'rightItem', e.target.value)}
                    placeholder="Enter right item text"
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                  />
                  
                  {/* Right Image Upload */}
                  <div>
                    <Label className="text-white text-sm mb-2 block flex items-center">
                      <Image className="mr-1 h-3 w-3" />
                      Right Image (optional)
                    </Label>
                    <ImageUpload
                      onImageUpload={(imageData) => updateMatchingPair(pair.id, 'rightImage', imageData)}
                      currentImage={pair.rightImage}
                      onRemoveImage={() => updateMatchingPair(pair.id, 'rightImage', undefined)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Marking Guidelines:</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Each correct match typically awards 1 mark</li>
              <li>Consider partial credit for partially correct answers</li>
              <li>Total marks = number of pairs × marks per pair</li>
              <li>Ensure clear instructions for students on matching format</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingQuestionForm;
