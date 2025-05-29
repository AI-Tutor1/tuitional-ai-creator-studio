
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Index from "./pages/Index";
import TestLibrary from "./pages/TestLibrary";
import QuestionBank from "./pages/QuestionBank";
import StudentTests from "./pages/StudentTests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipPrimitive.Provider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tests" element={<TestLibrary />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/student-tests" element={<StudentTests />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipPrimitive.Provider>
  </QueryClientProvider>
);

export default App;
