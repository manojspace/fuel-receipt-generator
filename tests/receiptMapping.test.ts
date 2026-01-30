import { describe, it, expect } from 'vitest';

import {
  defaultReceiptData,
  escapeHtml,
  validateReceiptData,
  calculateTotalSale,
  getFieldsBySection,
  generateReceiptHTML,
  type ReceiptData,
} from '@/lib/receiptMapping';

describe('Receipt Mapping', () => {
  describe('defaultReceiptData', () => {
    it('should have all required fields', () => {
      expect(defaultReceiptData.stationName).toBe('VIJAY BROTHERS');
      expect(defaultReceiptData.date).toBe('26-01-2026');
      expect(defaultReceiptData.unitPrice).toBe('102.47');
      expect(defaultReceiptData.quantity).toBe('30.73');
      expect(defaultReceiptData.totalSale).toBe('3148.90');
    });

    it('should have non-empty station information', () => {
      expect(defaultReceiptData.stationName.length).toBeGreaterThan(0);
      expect(defaultReceiptData.stationAddress.length).toBeGreaterThan(0);
      expect(defaultReceiptData.stationCity.length).toBeGreaterThan(0);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(escapeHtml('"test"')).toBe('&quot;test&quot;');
      expect(escapeHtml("it's")).toBe('it&#039;s');
      expect(escapeHtml('a & b')).toBe('a &amp; b');
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle string without special characters', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('validateReceiptData', () => {
    it('should return empty array for valid data', () => {
      const errors = validateReceiptData({
        date: '26-01-2026',
        time: '09:14:04',
        unitPrice: '102.47',
        quantity: '30.73',
      });
      expect(errors).toHaveLength(0);
    });

    it('should validate date format', () => {
      const errors = validateReceiptData({ date: '2026-01-26' });
      expect(errors).toContain('Date must be in DD-MM-YYYY format');
    });

    it('should validate time format', () => {
      const errors = validateReceiptData({ time: '9:14' });
      expect(errors).toContain('Time must be in HH:MM:SS format');
    });

    it('should validate numeric fields', () => {
      const errors = validateReceiptData({
        unitPrice: 'abc',
        quantity: 'xyz',
        totalSale: 'invalid',
        netAmount: 'nan',
      });
      expect(errors).toContain('Unit price must be a valid number');
      expect(errors).toContain('Quantity must be a valid number');
      expect(errors).toContain('Total sale must be a valid number');
      expect(errors).toContain('Net amount must be a valid number');
    });
  });

  describe('calculateTotalSale', () => {
    it('should calculate correct total', () => {
      expect(calculateTotalSale('100', '10')).toBe('1000.00');
      expect(calculateTotalSale('102.47', '30.73')).toBe('3148.90');
    });

    it('should handle decimal precision', () => {
      expect(calculateTotalSale('99.99', '1.5')).toBe('149.98');
    });

    it('should return empty string for invalid inputs', () => {
      expect(calculateTotalSale('abc', '10')).toBe('');
      expect(calculateTotalSale('100', 'xyz')).toBe('');
      expect(calculateTotalSale('', '')).toBe('');
    });
  });

  describe('getFieldsBySection', () => {
    it('should group fields by section', () => {
      const sections = getFieldsBySection();

      expect(sections['Station Information']).toBeDefined();
      expect(sections['Date & Time']).toBeDefined();
      expect(sections['Product Information']).toBeDefined();
      expect(sections['Amounts']).toBeDefined();
    });

    it('should have correct fields in each section', () => {
      const sections = getFieldsBySection();

      const stationFields = sections['Station Information'].map((f) => f.key);
      expect(stationFields).toContain('stationName');
      expect(stationFields).toContain('attendantName');

      const amountFields = sections['Amounts'].map((f) => f.key);
      expect(amountFields).toContain('totalSale');
      expect(amountFields).toContain('netAmount');
    });
  });

  describe('generateReceiptHTML', () => {
    it('should generate valid HTML', () => {
      const html = generateReceiptHTML(defaultReceiptData);

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('</html>');
      expect(html).toContain('<div class="receipt">');
    });

    it('should include dynamic values', () => {
      const html = generateReceiptHTML(defaultReceiptData);

      expect(html).toContain('VIJAY BROTHERS');
      expect(html).toContain('26-01-2026');
      expect(html).toContain('₹ 3148.90');
    });

    it('should escape HTML in dynamic values', () => {
      const testData: ReceiptData = {
        ...defaultReceiptData,
        stationName: '<script>alert("xss")</script>',
      };
      const html = generateReceiptHTML(testData);

      expect(html).not.toContain('<script>alert("xss")</script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('should preserve exact receipt structure', () => {
      const html = generateReceiptHTML(defaultReceiptData);

      expect(html).toContain('tear-top');
      expect(html).toContain('tear-bottom');
      expect(html).toContain('fiserv-footer');
      expect(html).toContain('PIN VERIFIED OK');
      expect(html).toContain('CUSTOMER COPY');
    });
  });
});
