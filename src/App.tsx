
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import TestLibrary from './pages/TestLibrary';
import QuestionBank from './pages/QuestionBank';
import EnhancedQuestionBank from './pages/EnhancedQuestionBank';
import StudentTests from './pages/StudentTests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tests" element={<TestLibrary />} />
        <Route path="/questions" element={<EnhancedQuestionBank />} />
        <Route path="/questions/legacy" element={<QuestionBank />} />
        <Route path="/student-tests" element={<StudentTests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
