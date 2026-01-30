'use client';

import { type ReceiptData, getFieldsBySection, type FieldConfig } from '@/lib/receiptMapping';

type FormPanelProps = {
  receiptData: ReceiptData;
  onFieldChange: (field: keyof ReceiptData, value: string) => void;
};

/**
 * FormPanel Component
 * Renders all form inputs organized by section.
 * Each input is connected to the receipt data state for live preview updates.
 */
export default function FormPanel({ receiptData, onFieldChange }: FormPanelProps) {
  const fieldsBySection = getFieldsBySection();
  const sectionOrder = [
    'Station Information',
    'Date & Time',
    'Transaction IDs',
    'Card Information',
    'Technical Fields',
    'Product Information',
    'Amounts',
    'Footer',
  ];

  return (
    <div className="space-y-6">
      {sectionOrder.map((sectionName) => {
        const fields = fieldsBySection[sectionName];
        if (!fields) {
          return null;
        }

        return (
          <FormSection key={sectionName} title={sectionName} fields={fields} receiptData={receiptData} onFieldChange={onFieldChange} />
        );
      })}
    </div>
  );
}

type FormSectionProps = {
  title: string;
  fields: FieldConfig[];
  receiptData: ReceiptData;
  onFieldChange: (field: keyof ReceiptData, value: string) => void;
};

/**
 * FormSection Component
 * Renders a collapsible section of form fields
 */
function FormSection({ title, fields, receiptData, onFieldChange }: FormSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((field) => (
          <FormField key={field.key} field={field} value={receiptData[field.key]} onChange={(value) => onFieldChange(field.key, value)} />
        ))}
      </div>
    </div>
  );
}

type FormFieldProps = {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
};

/**
 * FormField Component
 * Renders individual form input with label
 */
function FormField({ field, value, onChange }: FormFieldProps) {
  const inputId = `field-${field.key}`;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-xs font-medium text-slate-600">
        {field.label}
      </label>
      <input
        id={inputId}
        type={field.type === 'number' ? 'text' : field.type}
        inputMode={field.type === 'number' ? 'decimal' : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg
                   placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                   transition-all duration-200"
        aria-label={field.label}
      />
    </div>
  );
}
