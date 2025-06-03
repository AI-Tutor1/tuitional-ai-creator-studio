
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GenerationSettings {
  detailLevel: 'brief' | 'medium' | 'detailed';
  format: 'bulleted' | 'numbered';
  includeExamples: boolean;
  tone: 'educational' | 'concise' | 'conversational' | 'formal';
}

interface GenerationSettingsPanelProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
}

const GenerationSettingsPanel: React.FC<GenerationSettingsPanelProps> = ({
  settings,
  onSettingsChange
}) => {
  const updateSetting = <K extends keyof GenerationSettings>(
    key: K,
    value: GenerationSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mx-6">
      <div className="flex flex-wrap gap-6">
        {/* Detail Level */}
        <div className="flex-1 min-w-[160px]">
          <Label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
            Detail Level
          </Label>
          <Select
            value={settings.detailLevel}
            onValueChange={(value: 'brief' | 'medium' | 'detailed') => 
              updateSetting('detailLevel', value)
            }
          >
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brief">Brief</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Format */}
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
            Format
          </Label>
          <RadioGroup
            value={settings.format}
            onValueChange={(value: 'bulleted' | 'numbered') => 
              updateSetting('format', value)
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bulleted" id="bulleted" />
              <Label htmlFor="bulleted" className="text-sm text-gray-700">
                Bulleted List
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="numbered" id="numbered" />
              <Label htmlFor="numbered" className="text-sm text-gray-700">
                Numbered Outline
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Include Examples */}
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
            Options
          </Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-examples"
              checked={settings.includeExamples}
              onCheckedChange={(checked) => 
                updateSetting('includeExamples', checked as boolean)
              }
            />
            <Label htmlFor="include-examples" className="text-sm text-gray-700">
              Include examples & explanations
            </Label>
          </div>
        </div>

        {/* Tone */}
        <div className="flex-1 min-w-[160px]">
          <Label className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
            Tone
          </Label>
          <Select
            value={settings.tone}
            onValueChange={(value: 'educational' | 'concise' | 'conversational' | 'formal') => 
              updateSetting('tone', value)
            }
          >
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GenerationSettingsPanel;
