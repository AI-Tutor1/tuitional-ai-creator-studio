
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, RotateCcw } from 'lucide-react';

interface CalculatorProps {
  onClose?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const inputSquareRoot = () => {
    const value = Math.sqrt(parseFloat(display));
    setDisplay(String(value));
  };

  const inputSquare = () => {
    const value = Math.pow(parseFloat(display), 2);
    setDisplay(String(value));
  };

  const buttonClass = "h-12 text-lg font-medium transition-colors";
  const numberButtonClass = `${buttonClass} bg-[#2A2A2A] hover:bg-gray-600 text-white border-gray-600`;
  const operatorButtonClass = `${buttonClass} bg-[#38B6FF] hover:bg-[#2A9DE8] text-white border-[#38B6FF]`;
  const functionButtonClass = `${buttonClass} bg-gray-600 hover:bg-gray-500 text-white border-gray-500`;

  return (
    <Card className="w-80 bg-[#1E1E1E] border-gray-700 shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">Calculator</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display */}
        <div className="bg-[#2A2A2A] border border-gray-600 rounded p-4">
          <div className="text-right text-2xl text-white font-mono break-all">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="outline" className={functionButtonClass} onClick={clear}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={inputPercent}>
            %
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={inputSquareRoot}>
            √
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={() => inputOperation('÷')}>
            ÷
          </Button>

          {/* Row 2 */}
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('7')}>
            7
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('8')}>
            8
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('9')}>
            9
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={() => inputOperation('×')}>
            ×
          </Button>

          {/* Row 3 */}
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('4')}>
            4
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('5')}>
            5
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('6')}>
            6
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={() => inputOperation('-')}>
            -
          </Button>

          {/* Row 4 */}
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('1')}>
            1
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('2')}>
            2
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={() => inputNumber('3')}>
            3
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={() => inputOperation('+')}>
            +
          </Button>

          {/* Row 5 */}
          <Button variant="outline" className={`${numberButtonClass} col-span-2`} onClick={() => inputNumber('0')}>
            0
          </Button>
          <Button variant="outline" className={numberButtonClass} onClick={inputDecimal}>
            .
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={performCalculation}>
            =
          </Button>

          {/* Row 6 - Scientific functions */}
          <Button variant="outline" className={functionButtonClass} onClick={inputSquare}>
            x²
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={() => {
            const value = 1 / parseFloat(display);
            setDisplay(String(value));
          }}>
            1/x
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={() => {
            const value = Math.sin(parseFloat(display) * Math.PI / 180);
            setDisplay(String(value));
          }}>
            sin
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={() => {
            const value = Math.cos(parseFloat(display) * Math.PI / 180);
            setDisplay(String(value));
          }}>
            cos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
