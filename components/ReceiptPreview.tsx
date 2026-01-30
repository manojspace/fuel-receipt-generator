'use client';

import { useEffect, useRef } from 'react';

import { type ReceiptData, generateReceiptHTML } from '@/lib/receiptMapping';

type ReceiptPreviewProps = {
  receiptData: ReceiptData;
  designStyles?: string;
};

/**
 * ReceiptPreview Component
 *
 * Renders the receipt preview using an iframe to maintain exact styling
 * from the original template.html. The iframe content is dynamically
 * updated whenever receiptData or designStyles changes.
 *
 * IMPORTANT: This component preserves the exact layout and styling
 * from template.html by generating the full HTML with dynamic values
 * and loading it into an isolated iframe.
 */
export default function ReceiptPreview({ receiptData, designStyles }: ReceiptPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update iframe content whenever receipt data or design changes
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDocument) {
      return;
    }

    // Generate the complete receipt HTML with current data and design styles
    const receiptHTML = generateReceiptHTML(receiptData, designStyles);

    // Write the HTML to the iframe (document.write is intentional for iframe content injection)
    iframeDocument.open();
    // eslint-disable-next-line sonarjs/deprecation -- document.write is the standard way to inject content into iframes
    iframeDocument.write(receiptHTML);
    iframeDocument.close();
  }, [receiptData, designStyles]);

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
