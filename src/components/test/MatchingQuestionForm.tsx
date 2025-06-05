
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Scan,
  Image,
  Shuffle,
  GripVertical,
  Info,
  Eye,
  EyeOff
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
  const [perPairMarks, setPerPairMarks] = useState(1);
  const [allowPartialCredit, setAllowPartialCredit] = useState(false);
  const [randomizeAnswers, setRandomizeAnswers] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(120);
  const [showPreview, setShowPreview] = useState(false);
  const [markingSchemeExplanation, setMarkingSchemeExplanation] = useState('');

  const addMatchingPair = () => {
    if (matchingPairs.length >= 20) {
      alert('Maximum of 20 pairs allowed.');
      return;
    }
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

  const totalMarks = matchingPairs.length * perPairMarks;

  const validatePair = (pair: MatchingPair) => {
    return pair.leftItem.trim() !== '' && pair.rightItem.trim() !== '';
  };

  const allPairsValid = matchingPairs.every(validatePair);

  return (
    <div className="space-y-6">
      {/* Matching Pairs Table */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Matching Pairs</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-teal-500 text-white">
                Total: {totalMarks} marks
              </Badge>
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
                disabled={matchingPairs.length >= 20}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Pair
              </Button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Define up to 20 prompt–answer pairs. Each left item must match one right item in the final test.
          </p>
          {matchingPairs.length >= 20 && (
            <p className="text-red-400 text-sm">Maximum of 20 pairs allowed.</p>
          )}
        </CardHeader>
        <CardContent>
          {/* Table Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#2C2C2E] rounded-lg px-3 py-2 text-center">
              <span className="text-white text-sm font-semibold uppercase">Prompt</span>
            </div>
            <div className="bg-[#2C2C2E] rounded-lg px-3 py-2 text-center">
              <span className="text-white text-sm font-semibold uppercase">Answer</span>
            </div>
          </div>

          {/* Pairs List */}
          <div className="space-y-4">
            {matchingPairs.map((pair, index) => (
              <div key={pair.id} className="border border-gray-600 rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
                    <Badge variant="secondary" className="text-xs">
                      Pair {index + 1}
                    </Badge>
                  </div>
                  {matchingPairs.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMatchingPair(pair.id)}
                      className="text-red-400 hover:text-red-300"
                      aria-label={`Remove pair ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Item (Prompt) */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-white text-sm">Prompt</Label>
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
                      placeholder="Enter prompt (e.g., Term or concept)"
                      className={`bg-[#1C1C1E] border-[#2C2C2E] text-white ${
                        !validatePair(pair) && pair.leftItem.trim() === '' ? 'border-red-500' : ''
                      }`}
                      aria-label={`Prompt for pair ${index + 1}`}
                    />
                    
                    {/* Left Image Upload */}
                    <div>
                      <Label className="text-white text-sm mb-2 block flex items-center">
                        <Image className="mr-1 h-3 w-3" />
                        Prompt Image (optional)
                      </Label>
                      <ImageUpload
                        onImageUpload={(imageData) => updateMatchingPair(pair.id, 'leftImage', imageData)}
                        currentImage={pair.leftImage}
                        onRemoveImage={() => updateMatchingPair(pair.id, 'leftImage', undefined)}
                      />
                    </div>
                  </div>

                  {/* Right Item (Answer) */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-white text-sm">Answer</Label>
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
                      placeholder="Enter matching answer (e.g., Definition or item)"
                      className={`bg-[#1C1C1E] border-[#2C2C2E] text-white ${
                        !validatePair(pair) && pair.rightItem.trim() === '' ? 'border-red-500' : ''
                      }`}
                      aria-label={`Answer for pair ${index + 1}`}
                    />
                    
                    {/* Right Image Upload */}
                    <div>
                      <Label className="text-white text-sm mb-2 block flex items-center">
                        <Image className="mr-1 h-3 w-3" />
                        Answer Image (optional)
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
        </CardContent>
      </Card>

      {/* Marks & Settings */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Marks & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white mb-2 block">Marks Per Pair</Label>
              <Input
                type="number"
                value={perPairMarks}
                onChange={(e) => setPerPairMarks(parseInt(e.target.value) || 1)}
                className="bg-[#1C1C1E] border-[#2C2C2E] text-white"
                min={1}
                max={10}
                placeholder="1"
              />
              {perPairMarks > 10 && (
                <p className="text-yellow-400 text-xs mt-1">Consider lowering per-pair marks for balanced weight.</p>
              )}
            </div>

            <div>
              <Label className="text-white mb-2 block">Estimated Time (seconds)</Label>
              <Input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(parseInt(e.target.value) || 120)}
                className="bg-[#1C1C1E] border-[#2C2C2E] text-white"
                min={30}
                max={600}
                placeholder="120"
              />
            </div>

            <div className="flex items-center justify-center">
              <Badge variant="secondary" className="bg-teal-500 text-white text-lg px-4 py-2">
                Total: {totalMarks} marks
              </Badge>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label className="text-white">Shuffle Answer Column</Label>
                <Switch
                  checked={randomizeAnswers}
                  onCheckedChange={setRandomizeAnswers}
                  aria-checked={randomizeAnswers}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label className="text-white">Allow Partial Credit</Label>
                <div className="flex items-center space-x-1">
                  <Switch
                    checked={allowPartialCredit}
                    onCheckedChange={setAllowPartialCredit}
                    aria-checked={allowPartialCredit}
                  />
                  <div className="group relative">
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Partial Credit will award marks for each correctly matched pair
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!allowPartialCredit && (
              <p className="text-gray-400 text-sm">All or nothing scoring applied.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Marking Scheme Explanation */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Marking Scheme Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={markingSchemeExplanation}
            onChange={(e) => setMarkingSchemeExplanation(e.target.value)}
            className="bg-[#1C1C1E] border-[#2C2C2E] text-white"
            placeholder="Each correct match = 1 mark. Maximum marks total based on number of pairs..."
            rows={4}
          />
          <div className="mt-2 text-sm text-gray-400">
            Explain how correct answers are scored, partial credit allocation, and grading criteria.
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="bg-[#1E1E1E] border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Question Preview</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="border-gray-600 text-gray-300"
            >
              {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
          </div>
        </CardHeader>
        {showPreview && (
          <CardContent>
            <div className="bg-[#2A2A2A] rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-medium mb-4">Student View:</h4>
              <p className="text-gray-300 mb-4">Match each item on the left with its correct answer on the right.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-medium mb-2">Prompts:</h5>
                  <div className="space-y-2">
                    {matchingPairs.map((pair, index) => (
                      <div key={pair.id} className="bg-[#1C1C1E] border border-gray-600 rounded px-3 py-2">
                        <span className="text-gray-300">{index + 1}. {pair.leftItem || `Prompt ${index + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-2">Answers {randomizeAnswers ? '(Shuffled)' : '(Ordered)'}:</h5>
                  <div className="space-y-2">
                    {(randomizeAnswers ? [...matchingPairs].sort(() => Math.random() - 0.5) : matchingPairs).map((pair, index) => (
                      <div key={pair.id} className="bg-[#1C1C1E] border border-gray-600 rounded px-3 py-2 cursor-move">
                        <span className="text-gray-300">{String.fromCharCode(65 + index)}. {pair.rightItem || `Answer ${index + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Validation Message */}
      {!allPairsValid && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            Please fill in all prompt and answer fields before saving the question.
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchingQuestionForm;
