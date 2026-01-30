/**
 * PDF, Image, and Print Generation Module
 *
 * Handles client-side PDF/image generation using html2canvas and jsPDF.
 * Renders the receipt preview exactly as shown in the UI with full fidelity.
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type ExportOptions = {
  filename?: string;
  scale?: number;
  quality?: number;
};

const defaultOptions: ExportOptions = {
  filename: 'fuel-receipt',
  scale: 3,
  quality: 1,
};

/**
 * Captures the receipt as a canvas with exact visual fidelity
 */
async function captureReceiptCanvas(elementId: string, scale: number): Promise<HTMLCanvasElement> {
  const element = document.querySelector(`#${elementId}`);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  const iframe = element.querySelector('iframe') as HTMLIFrameElement;
  if (!iframe?.contentDocument?.body) {
    throw new Error('Receipt iframe not found or not accessible');
  }

  const iframeDocument = iframe.contentDocument;
  const receiptElement = iframeDocument.querySelector('.receipt') as HTMLElement;
  if (!receiptElement) {
    throw new Error('Receipt element not found in iframe');
  }

  // Get the body element which contains the full receipt with background
  const bodyElement = iframeDocument.body;

  // Wait for fonts to load
  await document.fonts.ready;
  if (iframeDocument.fonts) {
    await iframeDocument.fonts.ready;
  }
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Capture the entire body to get the exact visual representation
  return await html2canvas(bodyElement, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    width: bodyElement.scrollWidth,
    height: bodyElement.scrollHeight,
    onclone: (clonedDocument) => {
      // Ensure SVG elements are properly rendered
      const svgs = clonedDocument.querySelectorAll('svg');
      svgs.forEach((svg) => {
        svg.setAttribute('width', svg.getAttribute('width') || '60');
        svg.setAttribute('height', svg.getAttribute('height') || '60');
      });
    },
  });
}

/**
 * Generates a PDF from the receipt preview element
 * @param elementId - The ID of the HTML element containing the receipt
 * @param options - PDF generation options
 * @returns Promise that resolves when PDF is generated and downloaded
 */
export async function generatePDF(elementId: string, options: ExportOptions = {}): Promise<void> {
  const mergedOptions = { ...defaultOptions, ...options };

  const canvas = await captureReceiptCanvas(elementId, mergedOptions.scale || 3);

  // Calculate PDF dimensions to match the canvas aspect ratio exactly
  // Use a slightly larger format to ensure no clipping
  const pxToMm = 0.264_583;
  const imgWidthMm = (canvas.width / (mergedOptions.scale || 3)) * pxToMm;
  const imgHeightMm = (canvas.height / (mergedOptions.scale || 3)) * pxToMm;

  // Create PDF with exact dimensions (no extra padding)
  const pdf = new jsPDF({
    orientation: imgHeightMm > imgWidthMm ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [imgWidthMm, imgHeightMm],
  });

  // Add the image to PDF - fill the entire page
  const imgData = canvas.toDataURL('image/png', mergedOptions.quality);
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, imgHeightMm);

  // Download the PDF
  const filename = mergedOptions.filename?.endsWith('.pdf') ? mergedOptions.filename : `${mergedOptions.filename}.pdf`;
  pdf.save(filename);
}

/**
 * Downloads the receipt as a PNG image
 * @param elementId - The ID of the HTML element containing the receipt
 * @param options - Image generation options
 * @returns Promise that resolves when image is downloaded
 */
export async function downloadAsImage(elementId: string, options: ExportOptions = {}): Promise<void> {
  const mergedOptions = { ...defaultOptions, ...options };

  const canvas = await captureReceiptCanvas(elementId, mergedOptions.scale || 3);

  // Convert to blob and download
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error('Failed to create image blob'));
        }
      },
      'image/png',
      mergedOptions.quality,
    );
  });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = mergedOptions.filename?.endsWith('.png') ? mergedOptions.filename : `${mergedOptions.filename}.png`;
  link.download = filename;
  link.style.display = 'none';
  document.body.append(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Triggers browser print dialog for the receipt
 * @param elementId - The ID of the HTML element containing the receipt iframe
 */
export function printReceipt(elementId: string): void {
  const element = document.querySelector(`#${elementId}`);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  const iframe = element.querySelector('iframe') as HTMLIFrameElement;
  if (!iframe?.contentWindow) {
    throw new Error('Receipt iframe not found or not accessible');
  }

  // Create a print-friendly version in a new window for better control
  const printWindow = window.open('', '_blank', 'width=400,height=800');
  if (!printWindow) {
    // Fallback to iframe print if popup blocked
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    return;
  }

  // Get the iframe content
  const iframeDocument = iframe.contentDocument;
  if (!iframeDocument) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    return;
  }

  // Write the content to the new window
  // eslint-disable-next-line sonarjs/deprecation -- document.write is required for print window content injection
  printWindow.document.write(iframeDocument.documentElement.outerHTML);
  printWindow.document.close();

  // Wait for content to load then print
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  // Fallback close after timeout
  setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.print();
    }
  }, 500);
}
