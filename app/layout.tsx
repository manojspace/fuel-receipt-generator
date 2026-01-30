import type { Metadata, Viewport } from 'next';

import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fuel-receipt-generator.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fuel Receipt Generator | Create Professional Fuel Receipts Online',
    template: '%s | Fuel Receipt Generator',
  },
  description:
    'Free online fuel receipt generator. Create professional, printable IndianOil thermal receipts with customizable station details, transaction info, and payment data. Export to PDF or image instantly.',
  keywords: [
    'fuel receipt generator',
    'petrol receipt maker',
    'IndianOil receipt',
    'thermal receipt generator',
    'gas station receipt',
    'fuel bill generator',
    'printable fuel receipt',
    'petrol pump receipt',
    'online receipt maker',
    'free receipt generator',
    'PDF receipt download',
    'Indian fuel receipt',
  ],
  authors: [{ name: 'Fuel Receipt Generator', url: siteUrl }],
  creator: 'Fuel Receipt Generator',
  publisher: 'Fuel Receipt Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Fuel Receipt Generator',
    title: 'Fuel Receipt Generator | Create Professional Fuel Receipts Online',
    description:
      'Free online tool to generate professional fuel receipts. Create IndianOil thermal receipts with PDF export. No registration required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fuel Receipt Generator - Create Professional Fuel Receipts',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Receipt Generator | Create Professional Fuel Receipts',
    description: 'Free online fuel receipt generator. Create and download professional thermal receipts instantly.',
    images: ['/og-image.png'],
    creator: '@fuelreceiptgen',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  category: 'utilities',
  classification: 'Business Tools',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fuel Receipt Generator',
  description: 'Free online tool to generate professional fuel receipts with PDF export',
  url: siteUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Generate fuel receipts online',
    'Customizable receipt fields',
    'PDF export',
    'Image download',
    'Print support',
    'Multiple receipt styles',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line react/no-danger -- Required for JSON-LD structured data injection */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
