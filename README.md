# Fuel Receipt Generator

A modern, professional web application for generating printable fuel receipts. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Fuel Receipt Generator](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Live Preview**: Real-time receipt preview that updates instantly as you type
- **Exact Template Replication**: Receipt layout matches the original thermal receipt design exactly
- **PDF Export**: Client-side PDF generation - no server required
- **Print Support**: Native browser print functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (app UI) + Original CSS (receipt)
- **PDF Generation**: html2canvas + jsPDF (fully client-side)
- **Testing**: Vitest + React Testing Library
- **State Management**: React hooks (useState)

## Project Structure

```
fuel-receipt-generator/
├── app/
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout with metadata/SEO
│   └── page.tsx          # Main application page
├── components/
│   ├── FormPanel.tsx     # Form inputs for receipt fields
│   ├── ReceiptPreview.tsx # Live receipt preview (iframe-based)
│   └── Toolbar.tsx       # Print and PDF buttons
├── lib/
│   ├── receiptMapping.ts # Receipt data types and HTML generation
│   └── pdfGenerator.ts   # PDF generation utilities
├── public/
│   ├── icon.svg          # Favicon
│   ├── manifest.json     # PWA manifest
│   └── robots.txt        # SEO robots file
├── tests/
│   ├── setup.ts          # Vitest setup and mocks
│   ├── receiptMapping.test.ts
│   ├── formState.test.tsx
│   └── pdfGeneration.test.ts
├── template.html         # Original receipt template (source of truth)
├── tailwind.config.ts
├── vitest.config.ts
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository (if applicable)
cd fuel-receipt-generator

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Build & Export

```bash
# Build for production
npm run build

# Start production server
npm start
```

The static export will be generated in the `out/` directory.

## Usage

1. **Edit Receipt Details**: Use the form on the left to modify any field
2. **Live Preview**: See changes instantly in the receipt preview on the right
3. **Print**: Click "Print" to open browser print dialog
4. **Generate PDF**: Click "Generate PDF" to download a PDF file

## Receipt Fields

### Station Information

- Station Name, Address, City
- Attendant Name

### Transaction Details

- Date & Time
- MID, TID, Batch No, Invoice No

### Card Information

- Card Number, Card Type, Exp Date
- Transaction Type, Approval Code, RRN

### Product Information

- Product Type, Transaction ID
- Unit Price, Quantity
- Pump No, Nozzle No, License Plate

### Amounts

- Total Sale, Net Amount

## How Receipt Mapping Works

The receipt preview uses an **iframe-based approach** to maintain exact styling:

1. `lib/receiptMapping.ts` contains the `generateReceiptHTML()` function
2. This function takes `ReceiptData` and generates complete HTML with embedded styles
3. The HTML is written to an iframe in `ReceiptPreview.tsx`
4. This ensures the original `template.html` styling is preserved exactly

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Receipt design based on IndianOil thermal receipt format
- Built with [Next.js](https://nextjs.org/)
- PDF generation powered by [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://github.com/parallax/jsPDF)
