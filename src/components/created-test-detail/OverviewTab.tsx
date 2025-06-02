
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreatedTestDetailData } from '@/types/createdTestDetail';

interface OverviewTabProps {
  testData: CreatedTestDetailData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ testData }) => {
  const [isPublic, setIsPublic] = useState(testData.visibility === 'public');
  const [passingScore, setPassingScore] = useState(testData.passingScorePct);
  const [availableFrom, setAvailableFrom] = useState(testData.availableFrom);
  const [availableTo, setAvailableTo] = useState(testData.availableTo);

  const formatDuration = (minutes: number): string => {
    return `${minutes} Minutes`;
  };

  return (
    <div className="space-y-6">
      {/* Test Metadata Card */}
      <Card className="bg-[#1F1F23] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Test Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-semibold text-gray-400">Course</Label>
                <p className="text-white mt-1">{testData.course}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-400">Duration</Label>
                <p className="text-white mt-1">{formatDuration(testData.durationMinutes)}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-400">Questions</Label>
                <p className="text-white mt-1">{testData.numQuestions}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-semibold text-gray-400">Visibility</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <span className="text-sm text-gray-300">
                    {isPublic ? 'Public' : 'Private (Draft)'}
                  </span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-400">Available From / To</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="date"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="bg-[#2A2A2F] border-gray-600 text-gray-300"
                  />
                  <span className="text-gray-400">—</span>
                  <Input
                    type="date"
                    value={availableTo}
                    onChange={(e) => setAvailableTo(e.target.value)}
                    className="bg-[#2A2A2F] border-gray-600 text-gray-300"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-400">Passing Score</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="bg-[#2A2A2F] border-gray-600 text-white w-20"
                    min="0"
                    max="100"
                  />
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description & Instructions */}
      <Card className="bg-[#1F1F23] border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Description & Instructions</CardTitle>
          <Button variant="ghost" className="text-[#3399FF] text-sm">
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {testData.description ? (
            <p className="text-gray-300 leading-relaxed">{testData.description}</p>
          ) : (
            <p className="text-gray-500 italic">No instructions provided.</p>
          )}
        </CardContent>
      </Card>

      {/* Version History */}
      <Card className="bg-[#1F1F23] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Version History</CardTitle>
        </CardHeader>
        <CardContent>
          {testData.versionHistory.length > 0 ? (
            <div className="space-y-4 max-h-48 overflow-y-auto">
              {testData.versionHistory.map((version, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#2A2A2F] rounded-lg">
                  <div>
                    <div className="text-white font-medium">{version.version}</div>
                    <div className="text-sm text-gray-400">
                      by {version.modifiedBy} • {new Date(version.modifiedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Revert
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No previous versions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
