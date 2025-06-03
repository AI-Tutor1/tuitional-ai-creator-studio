
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import TestLibrary from './pages/TestLibrary';
import QuestionBank from './pages/QuestionBank';
import EnhancedQuestionBank from './pages/EnhancedQuestionBank';
import StudentTests from './pages/StudentTests';
import TeacherTestBank from './pages/TeacherTestBank';
import StudentTestBank from './pages/StudentTestBank';
import TestTaking from './pages/TestTaking';
import TestResults from './pages/TestResults';
import PerformanceTrends from './pages/PerformanceTrends';
import StudentTestDashboard from './pages/StudentTestDashboard';
import TeacherTestAnalytics from './pages/TeacherTestAnalytics';
import EvaluatedTests from './pages/EvaluatedTests';
import TestDetail from './pages/TestDetail';
import CreatedTestDetail from './pages/CreatedTestDetail';
import NotesGenerator from './pages/NotesGenerator';
import AINotesGenerator from './pages/AINotesGenerator';
import TeachingPlannerDashboard from './pages/TeachingPlannerDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tests" element={<TestLibrary />} />
        <Route path="/teacher-test-bank" element={<TeacherTestBank />} />
        <Route path="/teacher-test-bank/:testId" element={<CreatedTestDetail />} />
        <Route path="/student-test-bank" element={<StudentTestBank />} />
        <Route path="/test-taking/:testId" element={<TestTaking />} />
        <Route path="/test-results/:testId" element={<TestResults />} />
        <Route path="/performance-trends/:studentId" element={<PerformanceTrends />} />
        <Route path="/test-performance/:testId/student/:studentId" element={<StudentTestDashboard />} />
        <Route path="/test-performance/:testId/teacher" element={<TeacherTestAnalytics />} />
        <Route path="/questions" element={<EnhancedQuestionBank />} />
        <Route path="/questions/legacy" element={<QuestionBank />} />
        <Route path="/student-tests" element={<StudentTests />} />
        <Route path="/evaluated-tests" element={<EvaluatedTests />} />
        <Route path="/evaluated-tests/:testId" element={<TestDetail />} />
        <Route path="/notes-generator" element={<NotesGenerator />} />
        <Route path="/ai-notes-generator" element={<AINotesGenerator />} />
        <Route path="/teaching-planner" element={<TeachingPlannerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
