
import { useState, useCallback } from 'react';
import { EnhancedQuestion } from '@/types/question';

export const useQuestionBuilder = (initialQuestions: EnhancedQuestion[] = []) => {
  const [questions, setQuestions] = useState<EnhancedQuestion[]>(initialQuestions);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addQuestion = useCallback(() => {
    const newQuestion: EnhancedQuestion = {
      id: `question_${Date.now()}`,
      questionNumber: questions.length + 1,
      type: 'question',
      subType: 'mcq',
      text: '',
      marks: 1,
      includeAnswer: true,
      includeDiagram: false,
      markingScheme: '',
      mcqOptions: [
        { id: 'option_1', text: '', isCorrect: false },
        { id: 'option_2', text: '', isCorrect: false },
        { id: 'option_3', text: '', isCorrect: false },
        { id: 'option_4', text: '', isCorrect: false }
      ],
      metadata: {
        estimatedTime: 60,
        difficulty: 'Medium'
      }
    };

    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  }, [questions.length]);

  const updateQuestion = useCallback((id: string, field: keyof EnhancedQuestion, value: any) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === id) {
          const updatedQuestion = { ...q, [field]: value };
          
          // Handle subType changes
          if (field === 'subType') {
            if (value === 'mcq' && !updatedQuestion.mcqOptions) {
              updatedQuestion.mcqOptions = [
                { id: 'option_1', text: '', isCorrect: false },
                { id: 'option_2', text: '', isCorrect: false },
                { id: 'option_3', text: '', isCorrect: false },
                { id: 'option_4', text: '', isCorrect: false }
              ];
            } else if (value === 'matching' && !updatedQuestion.matchingPairs) {
              updatedQuestion.matchingPairs = [
                { id: 'pair_1', leftItem: '', rightItem: '' },
                { id: 'pair_2', leftItem: '', rightItem: '' }
              ];
            } else if (value !== 'mcq') {
              updatedQuestion.mcqOptions = undefined;
            } else if (value !== 'matching') {
              updatedQuestion.matchingPairs = undefined;
            }
          }
          
          return updatedQuestion;
        }
        return q;
      })
    );
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    if (selectedQuestionId === id) {
      setSelectedQuestionId(null);
    }
  }, [selectedQuestionId]);

  const duplicateQuestion = useCallback((id: string) => {
    const questionToDuplicate = questions.find(q => q.id === id);
    if (!questionToDuplicate) return;

    const duplicatedQuestion: EnhancedQuestion = {
      ...questionToDuplicate,
      id: `question_${Date.now()}`,
      questionNumber: questions.length + 1,
      text: `${questionToDuplicate.text} (Copy)`,
      mcqOptions: questionToDuplicate.mcqOptions?.map(opt => ({
        ...opt,
        id: `option_${Date.now()}_${Math.random()}`
      })),
      matchingPairs: questionToDuplicate.matchingPairs?.map(pair => ({
        ...pair,
        id: `pair_${Date.now()}_${Math.random()}`
      }))
    };

    setQuestions(prev => [...prev, duplicatedQuestion]);
  }, [questions]);

  const togglePreviewMode = useCallback(() => {
    setPreviewMode(prev => !prev);
  }, []);

  return {
    questions,
    selectedQuestionId,
    previewMode,
    setSelectedQuestionId,
    addQuestion,
    updateQuestion,
    removeQuestion,
    duplicateQuestion,
    togglePreviewMode
  };
};
