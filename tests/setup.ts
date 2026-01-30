import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock document.fonts for PDF generation
Object.defineProperty(document, 'fonts', {
  value: {
    ready: Promise.resolve(),
  },
});

// Mock html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({
    toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
    width: 280,
    height: 600,
  }),
}));

// Mock jsPDF
vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    addImage: vi.fn(),
    save: vi.fn(),
  })),
}));
