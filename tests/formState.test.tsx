import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import FormPanel from '@/components/FormPanel';
import { defaultReceiptData, type ReceiptData } from '@/lib/receiptMapping';

describe('FormPanel', () => {
  const mockOnFieldChange = vi.fn();

  beforeEach(() => {
    mockOnFieldChange.mockClear();
  });

  it('should render all form sections', () => {
    render(<FormPanel receiptData={defaultReceiptData} onFieldChange={mockOnFieldChange} />);

    expect(screen.getByText('Station Information')).toBeInTheDocument();
    expect(screen.getByText('Date & Time')).toBeInTheDocument();
    expect(screen.getByText('Transaction IDs')).toBeInTheDocument();
    expect(screen.getByText('Card Information')).toBeInTheDocument();
    expect(screen.getByText('Product Information')).toBeInTheDocument();
    expect(screen.getByText('Amounts')).toBeInTheDocument();
  });

  it('should render input fields with correct values', () => {
    render(<FormPanel receiptData={defaultReceiptData} onFieldChange={mockOnFieldChange} />);

    const stationNameInput = screen.getByLabelText('Station Name');
    expect(stationNameInput).toHaveValue('VIJAY BROTHERS');

    const dateInput = screen.getByLabelText('Date');
    expect(dateInput).toHaveValue('26-01-2026');
  });

  it('should call onFieldChange when input value changes', () => {
    render(<FormPanel receiptData={defaultReceiptData} onFieldChange={mockOnFieldChange} />);

    const stationNameInput = screen.getByLabelText('Station Name');
    fireEvent.change(stationNameInput, { target: { value: 'NEW STATION' } });

    expect(mockOnFieldChange).toHaveBeenCalledWith('stationName', 'NEW STATION');
  });

  it('should update multiple fields independently', () => {
    render(<FormPanel receiptData={defaultReceiptData} onFieldChange={mockOnFieldChange} />);

    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '01-01-2026' } });
    expect(mockOnFieldChange).toHaveBeenCalledWith('date', '01-01-2026');

    const timeInput = screen.getByLabelText('Time');
    fireEvent.change(timeInput, { target: { value: '10:30:00' } });
    expect(mockOnFieldChange).toHaveBeenCalledWith('time', '10:30:00');
  });

  it('should render all amount fields', () => {
    render(<FormPanel receiptData={defaultReceiptData} onFieldChange={mockOnFieldChange} />);

    expect(screen.getByLabelText('Total Sale (₹)')).toBeInTheDocument();
    expect(screen.getByLabelText('Net Amount (₹)')).toBeInTheDocument();
    expect(screen.getByLabelText('Unit Price (₹)')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity (Ltr)')).toBeInTheDocument();
  });

  it('should handle empty values', () => {
    const emptyData: ReceiptData = {
      ...defaultReceiptData,
      stationName: '',
      attendantName: '',
    };

    render(<FormPanel receiptData={emptyData} onFieldChange={mockOnFieldChange} />);

    const stationNameInput = screen.getByLabelText('Station Name');
    expect(stationNameInput).toHaveValue('');
  });
});

describe('Form State Updates', () => {
  it('should handle state updates correctly', () => {
    let receiptData = { ...defaultReceiptData };
    const handleFieldChange = (field: keyof ReceiptData, value: string) => {
      receiptData = { ...receiptData, [field]: value };
    };

    handleFieldChange('stationName', 'UPDATED STATION');
    expect(receiptData.stationName).toBe('UPDATED STATION');

    handleFieldChange('totalSale', '5000.00');
    expect(receiptData.totalSale).toBe('5000.00');
    expect(receiptData.stationName).toBe('UPDATED STATION');
  });

  it('should preserve other fields when updating one field', () => {
    let receiptData = { ...defaultReceiptData };
    const handleFieldChange = (field: keyof ReceiptData, value: string) => {
      receiptData = { ...receiptData, [field]: value };
    };

    const originalDate = receiptData.date;
    handleFieldChange('stationName', 'NEW NAME');

    expect(receiptData.date).toBe(originalDate);
    expect(receiptData.stationName).toBe('NEW NAME');
  });
});
