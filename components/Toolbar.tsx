'use client';

import { useState } from 'react';

import { trackError, trackImageDownload, trackPDFGeneration, trackPrint } from '@/lib/logger';
import { downloadAsImage, generatePDF, printReceipt } from '@/lib/pdfGenerator';

/**
 * Toolbar Component
 * Contains Print, Generate PDF, and Download Image buttons.
 * Handles PDF/image generation and print functionality.
 */
export default function Toolbar() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = () => {
    setError(null);
    try {
      printReceipt('receipt-preview-container');
      trackPrint();
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to print';
      setError(message);
      trackError(message, { action: 'print' });
    }
  };

  const handleGeneratePDF = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `fuel-receipt-${timestamp}`;
      await generatePDF('receipt-preview-container', { filename });
      trackPDFGeneration(true, { filename });
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to generate PDF';
      setError(message);
      trackPDFGeneration(false, { error: message });
      trackError(message, { action: 'pdf_generation' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `fuel-receipt-${timestamp}`;
      await downloadAsImage('receipt-preview-container', { filename });
      trackImageDownload(true, { filename });
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to download image';
      setError(message);
      trackImageDownload(false, { error: message });
      trackError(message, { action: 'image_download' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {error && (
        <div
          role="alert"
          className="absolute top-20 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg animate-fade-in">
          {error}
          <button type="button" onClick={() => setError(null)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        aria-label="Print receipt">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        type="button"
        onClick={handleDownloadImage}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Download as image">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="hidden sm:inline">Image</span>
      </button>

      <button
        type="button"
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 transition-all duration-200"
        aria-label="Generate PDF">
        {isGenerating ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="hidden sm:inline">PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
