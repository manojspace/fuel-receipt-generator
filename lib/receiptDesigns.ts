/**
 * Receipt Design Variants
 *
 * Provides 3 different receipt design styles that simulate
 * rough, phone-captured receipts converted to digital format.
 */

export type ReceiptDesign = {
  id: string;
  name: string;
  description: string;
  styles: string;
};

/**
 * Design 1: Classic Thermal - Original rough thermal paper look
 */
const classicThermalStyles = `
  :root {
    --paper: #f0f0eb;
    --ink: #2a2a2a;
  }

  body {
    background-color: #1a1a1a;
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .receipt {
    width: 280px;
    background-color: var(--paper);
    color: var(--ink);
    padding: 20px 15px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: -0.3px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
  }

  .receipt::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      165deg,
      rgba(0, 0, 0, 0) 24%,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(255, 255, 255, 0.3) 25.5%,
      rgba(0, 0, 0, 0) 27%,
      rgba(0, 0, 0, 0) 54%,
      rgba(0, 0, 0, 0.03) 55%,
      rgba(255, 255, 255, 0.2) 55.5%,
      rgba(0, 0, 0, 0) 57%,
      rgba(0, 0, 0, 0) 84%,
      rgba(0, 0, 0, 0.03) 85%,
      rgba(255, 255, 255, 0.2) 85.5%,
      rgba(0, 0, 0, 0) 87%
    );
    pointer-events: none;
    z-index: 5;
  }

  .tear-top,
  .tear-bottom {
    position: absolute;
    left: 0;
    right: 0;
    height: 8px;
    background-color: #1a1a1a;
    z-index: 10;
  }
  .tear-top {
    top: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 98% 30%, 96% 100%, 94% 30%, 92% 100%, 90% 30%, 88% 100%, 86% 30%, 84% 100%, 82% 30%, 80% 100%, 78% 30%, 76% 100%, 74% 30%, 72% 100%, 70% 30%, 68% 100%, 66% 30%, 64% 100%, 62% 30%, 60% 100%, 58% 30%, 56% 100%, 54% 30%, 52% 100%, 50% 30%, 48% 100%, 46% 30%, 44% 100%, 42% 30%, 40% 100%, 38% 30%, 36% 100%, 34% 30%, 32% 100%, 30% 30%, 28% 100%, 26% 30%, 24% 100%, 22% 30%, 20% 100%, 18% 30%, 16% 100%, 14% 30%, 12% 100%, 10% 30%, 8% 100%, 6% 30%, 4% 100%, 2% 30%, 0% 100%);
  }
  .tear-bottom {
    bottom: 0;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 98% 70%, 96% 0%, 94% 70%, 92% 0%, 90% 70%, 88% 0%, 86% 70%, 84% 0%, 82% 70%, 80% 0%, 78% 70%, 76% 0%, 74% 70%, 72% 0%, 70% 70%, 68% 0%, 66% 70%, 64% 0%, 62% 70%, 60% 0%, 58% 70%, 56% 0%, 54% 70%, 52% 0%, 50% 70%, 48% 0%, 46% 70%, 44% 0%, 42% 70%, 40% 0%, 38% 70%, 36% 0%, 34% 70%, 32% 0%, 30% 70%, 28% 0%, 26% 70%, 24% 0%, 22% 70%, 20% 0%, 18% 70%, 16% 0%, 14% 70%, 12% 0%, 10% 70%, 8% 0%, 6% 70%, 4% 0%, 2% 70%, 0% 0%);
  }
`;

/**
 * Design 2: Faded Receipt - Simulates old, sun-faded receipt
 */
const fadedReceiptStyles = `
  :root {
    --paper: #f5f0e6;
    --ink: #4a4a4a;
  }

  body {
    background-color: #2d2d2d;
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .receipt {
    width: 280px;
    background-color: var(--paper);
    color: var(--ink);
    padding: 20px 15px;
    position: relative;
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(0, 0, 0, 0.2) inset;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: -0.3px;
    transform: rotate(-0.5deg);
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
      linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.05) 100%);
  }

  .receipt::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0,0,0,0.03) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.03) 100%),
      linear-gradient(
        150deg,
        rgba(255, 245, 220, 0.3) 0%,
        transparent 30%,
        transparent 70%,
        rgba(200, 180, 150, 0.2) 100%
      );
    pointer-events: none;
    z-index: 5;
  }

  .receipt::after {
    content: '';
    position: absolute;
    top: 10%;
    left: -2px;
    right: -2px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
    transform: rotate(0.3deg);
    z-index: 6;
  }

  .tear-top,
  .tear-bottom {
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background-color: #2d2d2d;
    z-index: 10;
  }
  .tear-top {
    top: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 97% 40%, 94% 90%, 91% 35%, 88% 100%, 85% 25%, 82% 85%, 79% 40%, 76% 100%, 73% 30%, 70% 80%, 67% 45%, 64% 100%, 61% 35%, 58% 75%, 55% 50%, 52% 100%, 49% 40%, 46% 85%, 43% 30%, 40% 100%, 37% 45%, 34% 80%, 31% 35%, 28% 100%, 25% 50%, 22% 75%, 19% 40%, 16% 100%, 13% 35%, 10% 85%, 7% 45%, 4% 100%, 1% 50%, 0% 100%);
  }
  .tear-bottom {
    bottom: 0;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 97% 60%, 94% 10%, 91% 65%, 88% 0%, 85% 75%, 82% 15%, 79% 60%, 76% 0%, 73% 70%, 70% 20%, 67% 55%, 64% 0%, 61% 65%, 58% 25%, 55% 50%, 52% 0%, 49% 60%, 46% 15%, 43% 70%, 40% 0%, 37% 55%, 34% 20%, 31% 65%, 28% 0%, 25% 50%, 22% 25%, 19% 60%, 16% 0%, 13% 65%, 10% 15%, 7% 55%, 4% 0%, 1% 50%, 0% 0%);
  }
`;

/**
 * Design 3: Crumpled Receipt - Simulates receipt from pocket/wallet
 */
const crumpledReceiptStyles = `
  :root {
    --paper: #edeae2;
    --ink: #363636;
  }

  body {
    background-color: #252525;
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .receipt {
    width: 280px;
    background-color: var(--paper);
    color: var(--ink);
    padding: 20px 15px;
    position: relative;
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.4),
      2px 2px 8px rgba(0, 0, 0, 0.2),
      -1px -1px 6px rgba(255, 255, 255, 0.1) inset;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 1.1;
    letter-spacing: -0.3px;
    transform: rotate(0.8deg) perspective(500px) rotateY(-1deg);
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E");
  }

  .receipt::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(
        135deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.02) 20%,
        rgba(255, 255, 255, 0.15) 21%,
        rgba(0, 0, 0, 0) 23%,
        rgba(0, 0, 0, 0) 35%,
        rgba(0, 0, 0, 0.03) 36%,
        rgba(255, 255, 255, 0.1) 37%,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0) 55%,
        rgba(0, 0, 0, 0.02) 56%,
        rgba(255, 255, 255, 0.12) 57%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0) 75%,
        rgba(0, 0, 0, 0.03) 76%,
        rgba(255, 255, 255, 0.08) 77%,
        rgba(0, 0, 0, 0) 80%
      ),
      linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.02) 0%,
        transparent 40%,
        transparent 60%,
        rgba(0, 0, 0, 0.02) 100%
      );
    pointer-events: none;
    z-index: 5;
  }

  .receipt::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent 90%);
    z-index: 6;
  }

  .tear-top,
  .tear-bottom {
    position: absolute;
    left: 0;
    right: 0;
    height: 12px;
    background-color: #252525;
    z-index: 10;
  }
  .tear-top {
    top: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 96% 20%, 92% 80%, 88% 30%, 84% 90%, 80% 25%, 76% 70%, 72% 40%, 68% 100%, 64% 20%, 60% 75%, 56% 35%, 52% 95%, 48% 25%, 44% 80%, 40% 30%, 36% 85%, 32% 40%, 28% 100%, 24% 20%, 20% 70%, 16% 35%, 12% 90%, 8% 25%, 4% 80%, 0% 100%);
  }
  .tear-bottom {
    bottom: 0;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 96% 80%, 92% 20%, 88% 70%, 84% 10%, 80% 75%, 76% 30%, 72% 60%, 68% 0%, 64% 80%, 60% 25%, 56% 65%, 52% 5%, 48% 75%, 44% 20%, 40% 70%, 36% 15%, 32% 60%, 28% 0%, 24% 80%, 20% 30%, 16% 65%, 12% 10%, 8% 75%, 4% 20%, 0% 0%);
  }
`;

/**
 * Common styles shared across all designs
 */
const commonStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@700;900&display=swap');

  .header-logo {
    text-align: center;
    margin-bottom: 2px;
  }
  .iocl-symbol {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    display: block;
  }
  .brand-text {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 20px;
    text-align: center;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
  .bold {
    font-weight: bold;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 1px 0;
  }

  .station-header {
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.15;
    margin-bottom: 6px;
    text-transform: uppercase;
  }

  .divider-dotted {
    border-top: 1px dashed var(--ink);
    margin: 4px 0;
    opacity: 0.6;
  }

  .sale-banner {
    font-size: 15px;
    font-weight: bold;
    margin: 6px 0;
  }

  .net-amount-row {
    font-size: 14px;
    font-weight: bold;
    margin: 2px 0;
  }

  .fiserv-footer {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    font-size: 32px;
    letter-spacing: -3px;
    margin-top: 8px;
    opacity: 0.9;
  }

  @media print {
    body {
      background: white !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .receipt {
      box-shadow: none !important;
      width: 75mm !important;
      border: none !important;
      transform: none !important;
      margin: 0 !important;
      page-break-inside: avoid;
    }
    .tear-top,
    .tear-bottom,
    .receipt::before,
    .receipt::after {
      display: none !important;
    }
  }
`;

export const receiptDesigns: ReceiptDesign[] = [
  {
    id: 'classic-thermal',
    name: 'Classic Thermal',
    description: 'Original rough thermal paper receipt',
    styles: classicThermalStyles + commonStyles,
  },
  {
    id: 'faded-receipt',
    name: 'Faded Receipt',
    description: 'Sun-faded, aged receipt appearance',
    styles: fadedReceiptStyles + commonStyles,
  },
  {
    id: 'crumpled-receipt',
    name: 'Crumpled Receipt',
    description: 'Receipt from pocket or wallet',
    styles: crumpledReceiptStyles + commonStyles,
  },
];

export const defaultDesign = receiptDesigns[0];

export function getDesignById(id: string): ReceiptDesign {
  return receiptDesigns.find((d) => d.id === id) || defaultDesign;
}
