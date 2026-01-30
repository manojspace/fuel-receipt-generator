'use client';

import { useState } from 'react';

import { generatePDF, printReceipt } from '@/lib/pdfGenerator';
import { type ReceiptData } from '@/lib/receiptMapping';

type ToolbarProps = {
  receiptData: ReceiptData;
};

/**
 * Toolbar Component
 * Contains Print and Generate PDF buttons positioned at the top right.
 * Handles PDF generation and print functionality.
 */
export default function Toolbar({ receiptData: _receiptData }: ToolbarProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = () => {
    setError(null);
    try {
      printReceipt('receipt-preview-container');
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'Failed to print');
    }
  };

  const handleGeneratePDF = async () => {
    setError(null);
    setIsGeneratingPDF(true);

    try {
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `fuel-receipt-${timestamp}.pdf`;

      await generatePDF('receipt-preview-container', { filename });
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Error Toast */}
      {error && (
        <div className="absolute top-20 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg animate-fade-in">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                   text-slate-700 bg-white border border-slate-200 rounded-lg
                   hover:bg-slate-50 hover:border-slate-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20
                   transition-all duration-200"
        aria-label="Print receipt">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span className="hidden sm:inline">Print</span>
      </button>

      {/* Generate PDF Button */}
      <button
        onClick={handleGeneratePDF}
        disabled={isGeneratingPDF}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                   text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg
                   hover:from-blue-700 hover:to-blue-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg shadow-blue-600/20
                   transition-all duration-200"
        aria-label="Generate PDF">
        {isGeneratingPDF ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="hidden sm:inline">Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="hidden sm:inline">Generate PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
