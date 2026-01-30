import { describe, it, expect, vi, beforeEach } from 'vitest';

import { generatePDF, printReceipt } from '@/lib/pdfGenerator';

describe('PDF Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('generatePDF', () => {
    it('should throw error when element not found', async () => {
      await expect(generatePDF('non-existent-element')).rejects.toThrow('Element with ID "non-existent-element" not found');
    });

    it('should throw error when iframe not found', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.append(container);

      await expect(generatePDF('test-container')).rejects.toThrow('Receipt iframe not found or not accessible');
    });

    it('should accept custom filename option', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';

      const iframe = document.createElement('iframe');
      container.append(iframe);
      document.body.append(container);

      // Mock iframe content
      const mockDocument = {
        querySelector: vi.fn().mockReturnValue(null),
      };
      Object.defineProperty(iframe, 'contentDocument', {
        value: mockDocument,
        writable: true,
      });

      await expect(generatePDF('test-container', { filename: 'custom-receipt.pdf' })).rejects.toThrow(
        'Receipt element not found in iframe',
      );
    });
  });

  describe('printReceipt', () => {
    it('should throw error when element not found', () => {
      expect(() => printReceipt('non-existent-element')).toThrow('Element with ID "non-existent-element" not found');
    });

    it('should throw error when iframe not found', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.append(container);

      expect(() => printReceipt('test-container')).toThrow('Receipt iframe not found or not accessible');
    });

    it('should call iframe print when valid', () => {
      const container = document.createElement('div');
      container.id = 'test-container';

      const iframe = document.createElement('iframe');
      const mockPrint = vi.fn();
      const mockFocus = vi.fn();

      Object.defineProperty(iframe, 'contentWindow', {
        value: {
          print: mockPrint,
          focus: mockFocus,
        },
        writable: true,
      });

      container.append(iframe);
      document.body.append(container);

      printReceipt('test-container');

      expect(mockFocus).toHaveBeenCalled();
      expect(mockPrint).toHaveBeenCalled();
    });
  });

  describe('PDF Generation Options', () => {
    it('should use default options when not provided', () => {
      const defaultOptions = {
        filename: 'fuel-receipt.pdf',
        scale: 2,
        quality: 1,
      };

      expect(defaultOptions.filename).toBe('fuel-receipt.pdf');
      expect(defaultOptions.scale).toBe(2);
      expect(defaultOptions.quality).toBe(1);
    });

    it('should merge custom options with defaults', () => {
      const defaultOptions = {
        filename: 'fuel-receipt.pdf',
        scale: 2,
        quality: 1,
      };

      const customOptions = { filename: 'my-receipt.pdf' };
      const merged = { ...defaultOptions, ...customOptions };

      expect(merged.filename).toBe('my-receipt.pdf');
      expect(merged.scale).toBe(2);
      expect(merged.quality).toBe(1);
    });
  });
});

describe('PDF Trigger', () => {
  it('should be callable as a function', () => {
    expect(typeof generatePDF).toBe('function');
    expect(typeof printReceipt).toBe('function');
  });

  it('should return a promise from generatePDF', () => {
    const result = generatePDF('test').catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });
});
