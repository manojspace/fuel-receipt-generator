'use client';

import { useEffect, useRef } from 'react';

import { type ReceiptData, generateReceiptHTML } from '@/lib/receiptMapping';

type ReceiptPreviewProps = {
  receiptData: ReceiptData;
};

/**
 * ReceiptPreview Component
 *
 * Renders the receipt preview using an iframe to maintain exact styling
 * from the original template.html. The iframe content is dynamically
 * updated whenever receiptData changes.
 *
 * IMPORTANT: This component preserves the exact layout and styling
 * from template.html by generating the full HTML with dynamic values
 * and loading it into an isolated iframe.
 */
export default function ReceiptPreview({ receiptData }: ReceiptPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe content whenever receipt data changes
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDocument) {
      return;
    }

    // Generate the complete receipt HTML with current data
    const receiptHTML = generateReceiptHTML(receiptData);

    // Write the HTML to the iframe (document.write is intentional for iframe content injection)
    iframeDocument.open();
    // eslint-disable-next-line sonarjs/deprecation -- document.write is the standard way to inject content into iframes
    iframeDocument.write(receiptHTML);
    iframeDocument.close();
  }, [receiptData]);

  return (
    <div id="receipt-preview-container" className="relative" role="img" aria-label="Receipt Preview">
      {/* 
        Iframe renders the receipt with complete style isolation.
        This ensures the receipt styling from template.html is preserved
        exactly without any interference from the application's Tailwind CSS.
      */}
      <iframe
        ref={iframeRef}
        title="Receipt Preview"
        className="border-0 bg-transparent"
        style={{
          width: '320px',
          height: '750px',
          overflow: 'hidden',
        }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
