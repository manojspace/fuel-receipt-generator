'use client';

import { useState } from 'react';

import FormPanel from '@/components/FormPanel';
import ReceiptPreview from '@/components/ReceiptPreview';
import Toolbar from '@/components/Toolbar';
import { type ReceiptData, defaultReceiptData } from '@/lib/receiptMapping';

export default function Home() {
  const [receiptData, setReceiptData] = useState<ReceiptData>(defaultReceiptData);

  const handleFieldChange = (field: keyof ReceiptData, value: string) => {
    setReceiptData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetForm = () => {
    setReceiptData(defaultReceiptData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Fuel Receipt Generator</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Create professional thermal receipts</p>
              </div>
            </div>
            <Toolbar receiptData={receiptData} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Panel - Left Side */}
          <aside className="w-full lg:w-[420px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">Receipt Details</h2>
                  <button
                    onClick={handleResetForm}
                    className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
                <FormPanel receiptData={receiptData} onFieldChange={handleFieldChange} />
              </div>
            </div>
          </aside>

          {/* Receipt Preview - Right Side */}
          <section className="flex-1 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-slate-900">Live Preview</h2>
                <p className="text-xs text-slate-500 mt-0.5">Changes update instantly</p>
              </div>
              <div className="p-6 bg-slate-800 min-h-[600px] flex items-start justify-center">
                <ReceiptPreview receiptData={receiptData} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Fuel Receipt Generator. For demonstration purposes only.</p>
      </footer>
    </main>
  );
}
