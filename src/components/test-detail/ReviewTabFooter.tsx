
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, MessageCircleQuestion, ArrowUp } from 'lucide-react';
import { TestDetailData } from '@/types/testDetail';

interface ReviewTabFooterProps {
  testData: TestDetailData;
}

const ReviewTabFooter: React.FC<ReviewTabFooterProps> = ({ testData }) => {
  const [showRegradeForm, setShowRegradeForm] = useState(false);
  const [regradeReason, setRegradeReason] = useState('');

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for test:', testData.testId);
    // Implementation for PDF download would go here
  };

  const handleSubmitRegrade = () => {
    console.log('Submitting regrade request:', regradeReason);
    setShowRegradeForm(false);
    setRegradeReason('');
    // Implementation for regrade request would go here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Re-grade Form */}
      {showRegradeForm && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-[#2A2A2F] border border-gray-600 rounded-lg p-4 shadow-xl z-50">
          <h3 className="text-white font-semibold mb-3">Request Re-Grade</h3>
          <textarea
            value={regradeReason}
            onChange={(e) => setRegradeReason(e.target.value)}
            placeholder="Please explain your reason for requesting a re-grade..."
            className="w-full h-24 p-3 bg-[#1F1F23] border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
          />
          <div className="flex gap-3 mt-3">
            <Button
              onClick={handleSubmitRegrade}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Submit Request
            </Button>
            <Button
              onClick={() => setShowRegradeForm(false)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-[#2A2A2F]"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4">
        {/* Return to Top */}
        <Button
          onClick={scrollToTop}
          size="icon"
          className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white rounded-full w-12 h-12 shadow-lg"
          aria-label="Return to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleDownloadPDF}
            className="bg-[#38B6FF] hover:bg-[#2A9DE8] text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>

          {testData.canRequestRegrade && !testData.regradeRequested && (
            <Button
              onClick={() => setShowRegradeForm(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-black"
            >
              <MessageCircleQuestion className="mr-2 h-4 w-4" />
              Request Re-Grade
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewTabFooter;
