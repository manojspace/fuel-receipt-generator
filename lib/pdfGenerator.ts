/**
 * PDF Generation Module
 *
 * Handles client-side PDF generation using html2canvas and jsPDF.
 * Renders the receipt preview exactly as shown in the UI.
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type PDFGenerationOptions = {
  filename?: string;
  scale?: number;
  quality?: number;
};

const defaultOptions: PDFGenerationOptions = {
  filename: 'fuel-receipt.pdf',
  scale: 2,
  quality: 1,
};

/**
 * Generates a PDF from the receipt preview element
 * @param elementId - The ID of the HTML element containing the receipt
 * @param options - PDF generation options
 * @returns Promise that resolves when PDF is generated and downloaded
 */
export async function generatePDF(elementId: string, options: PDFGenerationOptions = {}): Promise<void> {
  const mergedOptions = { ...defaultOptions, ...options };

  const element = document.querySelector(`#${elementId}`);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Find the iframe and get its content
  const iframe = element.querySelector('iframe');
  if (!iframe?.contentDocument) {
    throw new Error('Receipt iframe not found or not accessible');
  }

  const receiptElement = iframe.contentDocument.querySelector('.receipt') as HTMLElement;
  if (!receiptElement) {
    throw new Error('Receipt element not found in iframe');
  }

  // Create a temporary container for rendering
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  document.body.append(tempContainer);

  // Clone the receipt content
  const clonedReceipt = receiptElement.cloneNode(true) as HTMLElement;

  // Copy computed styles
  const styles = iframe.contentDocument.querySelectorAll('style');
  styles.forEach((style) => {
    const clonedStyle = style.cloneNode(true);
    tempContainer.append(clonedStyle);
  });

  // Add link for fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@700;900&display=swap';
  tempContainer.append(fontLink);

  // Set background for the cloned receipt
  clonedReceipt.style.margin = '0';
  clonedReceipt.style.boxShadow = 'none';
  tempContainer.append(clonedReceipt);

  // Wait for fonts to load
  await document.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    // Generate canvas from the cloned receipt
    const canvas = await html2canvas(clonedReceipt, {
      scale: mergedOptions.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f0f0eb',
      logging: false,
    });

    // Calculate PDF dimensions (thermal receipt width: ~80mm)
    const imgWidth = 80;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [imgWidth, imgHeight + 10],
    });

    // Add the image to PDF
    const imgData = canvas.toDataURL('image/png', mergedOptions.quality);
    pdf.addImage(imgData, 'PNG', 0, 5, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(mergedOptions.filename);
  } finally {
    // Cleanup
    tempContainer.remove();
  }
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

  const iframe = element.querySelector('iframe');
  if (!iframe?.contentWindow) {
    throw new Error('Receipt iframe not found or not accessible');
  }

  // Focus the iframe and trigger print
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
}
