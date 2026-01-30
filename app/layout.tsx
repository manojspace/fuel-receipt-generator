import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fuel Receipt Generator | Create Professional Fuel Receipts',
  description:
    'Generate professional, printable fuel receipts instantly. Create IndianOil thermal receipts with customizable fields for station details, transaction information, and payment data. Free online tool with PDF export.',
  keywords: [
    'fuel receipt generator',
    'petrol receipt',
    'IndianOil receipt',
    'thermal receipt',
    'gas station receipt',
    'fuel bill generator',
    'printable receipt',
  ],
  authors: [{ name: 'Fuel Receipt Generator' }],
  creator: 'Fuel Receipt Generator',
  publisher: 'Fuel Receipt Generator',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fuel-receipt-generator.app',
    siteName: 'Fuel Receipt Generator',
    title: 'Fuel Receipt Generator | Create Professional Fuel Receipts',
    description:
      'Generate professional, printable fuel receipts instantly. Create thermal receipts with customizable fields. Free online tool with PDF export.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fuel Receipt Generator Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Receipt Generator | Create Professional Fuel Receipts',
    description: 'Generate professional, printable fuel receipts instantly. Free online tool with PDF export.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
