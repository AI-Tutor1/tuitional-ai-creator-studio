
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  Subscript, 
  Superscript, 
  Undo, 
  Calculator,
  X,
  Plus,
  Minus,
  FileText
} from 'lucide-react';

interface MathTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClose?: () => void;
}

const MathTextEditor: React.FC<MathTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Type your answer here...",
  onClose
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const insertSymbol = (symbol: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + symbol + value.substring(end);
    
    onChange(newValue);
    addToHistory(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
      textarea.focus();
    }, 0);
  };

  const addToHistory = (newValue: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      onChange(history[historyIndex - 1]);
    }
  };

  const formatText = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'subscript':
        formattedText = `_{${selectedText}}`;
        break;
      case 'superscript':
        formattedText = `^{${selectedText}}`;
        break;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);
    addToHistory(newValue);
  };

  const mathSymbols = [
    { symbol: '×', label: 'Multiply' },
    { symbol: '÷', label: 'Divide' },
    { symbol: '±', label: 'Plus-minus' },
    { symbol: '≤', label: 'Less than or equal' },
    { symbol: '≥', label: 'Greater than or equal' },
    { symbol: '≠', label: 'Not equal' },
    { symbol: '∞', label: 'Infinity' },
    { symbol: '√', label: 'Square root' },
    { symbol: '∑', label: 'Sum' },
    { symbol: 'π', label: 'Pi' },
    { symbol: 'α', label: 'Alpha' },
    { symbol: 'β', label: 'Beta' },
    { symbol: 'θ', label: 'Theta' },
    { symbol: '°', label: 'Degree' },
    { symbol: '²', label: 'Squared' },
    { symbol: '³', label: 'Cubed' },
  ];

  const fractions = [
    '½', '⅓', '¼', '¾', '⅕', '⅙', '⅛'
  ];

  return (
    <Card className="w-full bg-[#2A2A2A] border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-lg">Math Text Editor</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => formatText('bold')}
            className="border-gray-600 text-gray-300"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => formatText('italic')}
            className="border-gray-600 text-gray-300"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => formatText('subscript')}
            className="border-gray-600 text-gray-300"
          >
            <Subscript className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => formatText('superscript')}
            className="border-gray-600 text-gray-300"
          >
            <Superscript className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
            className="border-gray-600 text-gray-300"
          >
            <Undo className="h-4 w-4" />
          </Button>
        </div>

        {/* Math Symbols */}
        <div className="space-y-3">
          <h4 className="text-white text-sm font-medium">Mathematical Symbols</h4>
          <div className="grid grid-cols-8 gap-1">
            {mathSymbols.map((item) => (
              <Button
                key={item.symbol}
                variant="outline"
                size="sm"
                onClick={() => insertSymbol(item.symbol)}
                className="border-gray-600 text-gray-300 h-8 w-8 p-0"
                title={item.label}
              >
                {item.symbol}
              </Button>
            ))}
          </div>
        </div>

        {/* Common Fractions */}
        <div className="space-y-3">
          <h4 className="text-white text-sm font-medium">Common Fractions</h4>
          <div className="flex flex-wrap gap-1">
            {fractions.map((fraction) => (
              <Button
                key={fraction}
                variant="outline"
                size="sm"
                onClick={() => insertSymbol(fraction)}
                className="border-gray-600 text-gray-300 h-8 px-2"
              >
                {fraction}
              </Button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            addToHistory(e.target.value);
          }}
          placeholder={placeholder}
          className="bg-[#1E1E1E] border-gray-600 text-white min-h-[150px] font-mono"
        />

        {/* Character Count */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>Use LaTeX notation for complex expressions: \\frac{a}{b}, \\sqrt{x}, x^2</span>
          <span>{value.length} characters</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MathTextEditor;
