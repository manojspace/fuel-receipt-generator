/**
 * Receipt Data Types and Mapping Logic
 *
 * This file contains all the field definitions and mapping logic
 * for dynamically updating the receipt preview from template.html
 */

export type ReceiptData = {
  // Station Information
  stationName: string;
  stationAddress: string;
  stationCity: string;
  attendantName: string;

  // Date & Time
  date: string;
  time: string;

  // Transaction IDs
  mid: string;
  tid: string;
  batchNo: string;
  invoiceNo: string;

  // Card Information
  cardNumber: string;
  cardType: string;
  expDate: string;
  txnType: string;
  apprCode: string;
  rrn: string;
  authCode: string;

  // Technical Fields
  tc: string;
  atc: string;
  tsi: string;
  tsiValue: string;
  tvr: string;
  aid: string;

  // Product Information
  product: string;
  txnId: string;
  unitPrice: string;
  quantity: string;
  pumpNo: string;
  nozzleNo: string;
  licensePlate: string;

  // Amounts
  totalSale: string;
  netAmount: string;

  // Footer
  appVersion: string;
  ioclAppVersion: string;
};

export const defaultReceiptData: ReceiptData = {
  // Station Information
  stationName: 'VIJAY BROTHERS',
  stationAddress: 'PETROL PUMP,COURT ROAD,GU',
  stationCity: 'GURGAON',
  attendantName: 'Dharamveer Yadav',

  // Date & Time
  date: '26-01-2026',
  time: '09:14:04',

  // Transaction IDs
  mid: '470000099003586',
  tid: '39198356',
  batchNo: '000089',
  invoiceNo: '005317',

  // Card Information
  cardNumber: '4311 04** **** 5951',
  cardType: 'VISA CARD',
  expDate: '**/**',
  txnType: 'CARD',
  apprCode: '007732',
  rrn: '602603838603',
  authCode: '674829FC799BC413',

  // Technical Fields
  tc: '',
  atc: '******',
  tsi: 'E800',
  tsiValue: '0000048000',
  tvr: 'A0000000031010',
  aid: 'XP95',

  // Product Information
  product: 'XP95',
  txnId: '3767322',
  unitPrice: '102.47',
  quantity: '30.73',
  pumpNo: '10',
  nozzleNo: '56',
  licensePlate: 'HR26-BW-8821',

  // Amounts
  totalSale: '3148.90',
  netAmount: '3148.90',

  // Footer
  appVersion: '1.08.29_20251212',
  ioclAppVersion: '1.0.88',
};

/**
 * Field configuration for form generation
 * Each field has a label, key, type, and optional placeholder
 */
export type FieldConfig = {
  key: keyof ReceiptData;
  label: string;
  type: 'text' | 'date' | 'time' | 'number';
  placeholder?: string;
  section: string;
};

export const fieldConfigs: FieldConfig[] = [
  // Station Information
  { key: 'stationName', label: 'Station Name', type: 'text', placeholder: 'Enter station name', section: 'Station Information' },
  { key: 'stationAddress', label: 'Address Line', type: 'text', placeholder: 'Enter address', section: 'Station Information' },
  { key: 'stationCity', label: 'City', type: 'text', placeholder: 'Enter city', section: 'Station Information' },
  { key: 'attendantName', label: 'Attendant Name', type: 'text', placeholder: 'Enter attendant name', section: 'Station Information' },

  // Date & Time
  { key: 'date', label: 'Date', type: 'text', placeholder: 'DD-MM-YYYY', section: 'Date & Time' },
  { key: 'time', label: 'Time', type: 'text', placeholder: 'HH:MM:SS', section: 'Date & Time' },

  // Transaction IDs
  { key: 'mid', label: 'MID', type: 'text', placeholder: 'Merchant ID', section: 'Transaction IDs' },
  { key: 'tid', label: 'TID', type: 'text', placeholder: 'Terminal ID', section: 'Transaction IDs' },
  { key: 'batchNo', label: 'Batch No', type: 'text', placeholder: 'Batch number', section: 'Transaction IDs' },
  { key: 'invoiceNo', label: 'Invoice No', type: 'text', placeholder: 'Invoice number', section: 'Transaction IDs' },

  // Card Information
  { key: 'cardNumber', label: 'Card Number', type: 'text', placeholder: 'XXXX XX** **** XXXX', section: 'Card Information' },
  { key: 'cardType', label: 'Card Type', type: 'text', placeholder: 'VISA/MASTERCARD', section: 'Card Information' },
  { key: 'expDate', label: 'Exp Date', type: 'text', placeholder: '**/**', section: 'Card Information' },
  { key: 'txnType', label: 'Txn Type', type: 'text', placeholder: 'CARD/UPI', section: 'Card Information' },
  { key: 'apprCode', label: 'Approval Code', type: 'text', placeholder: 'Approval code', section: 'Card Information' },
  { key: 'rrn', label: 'RRN', type: 'text', placeholder: 'Reference number', section: 'Card Information' },
  { key: 'authCode', label: 'Auth Code', type: 'text', placeholder: 'Authorization code', section: 'Card Information' },

  // Technical Fields
  { key: 'tc', label: 'TC', type: 'text', placeholder: 'TC value', section: 'Technical Fields' },
  { key: 'atc', label: 'ATC', type: 'text', placeholder: 'ATC value', section: 'Technical Fields' },
  { key: 'tsi', label: 'TSI', type: 'text', placeholder: 'TSI code', section: 'Technical Fields' },
  { key: 'tsiValue', label: 'TSI Value', type: 'text', placeholder: 'TSI value', section: 'Technical Fields' },
  { key: 'tvr', label: 'TVR', type: 'text', placeholder: 'TVR value', section: 'Technical Fields' },
  { key: 'aid', label: 'AID', type: 'text', placeholder: 'Application ID', section: 'Technical Fields' },

  // Product Information
  { key: 'product', label: 'Product', type: 'text', placeholder: 'XP95/DIESEL', section: 'Product Information' },
  { key: 'txnId', label: 'Transaction ID', type: 'text', placeholder: 'Transaction ID', section: 'Product Information' },
  { key: 'unitPrice', label: 'Unit Price (₹)', type: 'text', placeholder: 'Price per litre', section: 'Product Information' },
  { key: 'quantity', label: 'Quantity (Ltr)', type: 'text', placeholder: 'Litres', section: 'Product Information' },
  { key: 'pumpNo', label: 'Pump No', type: 'text', placeholder: 'Pump number', section: 'Product Information' },
  { key: 'nozzleNo', label: 'Nozzle No', type: 'text', placeholder: 'Nozzle number', section: 'Product Information' },
  { key: 'licensePlate', label: 'License Plate', type: 'text', placeholder: 'Vehicle number', section: 'Product Information' },

  // Amounts
  { key: 'totalSale', label: 'Total Sale (₹)', type: 'text', placeholder: 'Total amount', section: 'Amounts' },
  { key: 'netAmount', label: 'Net Amount (₹)', type: 'text', placeholder: 'Net amount', section: 'Amounts' },

  // Footer
  { key: 'appVersion', label: 'App Version', type: 'text', placeholder: 'Version string', section: 'Footer' },
  { key: 'ioclAppVersion', label: 'IOCL App Version', type: 'text', placeholder: 'IOCL version', section: 'Footer' },
];

/**
 * Groups field configs by section for organized form rendering
 */
export function getFieldsBySection(): Record<string, FieldConfig[]> {
  return fieldConfigs.reduce(
    (acc, field) => {
      if (!acc[field.section]) {
        acc[field.section] = [];
      }
      acc[field.section].push(field);
      return acc;
    },
    {} as Record<string, FieldConfig[]>,
  );
}

/**
 * Generates the receipt HTML with dynamic values injected
 * This function takes the template HTML and replaces placeholder values with actual data
 */
export function generateReceiptHTML(data: ReceiptData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IndianOil Thermal Receipt</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@700;900&display=swap');
        
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
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            font-family: "Courier New", Courier, monospace;
            font-size: 12px;
            line-height: 1.1;
            letter-spacing: -0.3px;
            background-image: 
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
        }

        .receipt::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(
                165deg,
                rgba(0,0,0,0) 24%,
                rgba(0,0,0,0.04) 25%,
                rgba(255,255,255,0.3) 25.5%,
                rgba(0,0,0,0) 27%,
                rgba(0,0,0,0) 54%,
                rgba(0,0,0,0.03) 55%,
                rgba(255,255,255,0.2) 55.5%,
                rgba(0,0,0,0) 57%,
                rgba(0,0,0,0) 84%,
                rgba(0,0,0,0.03) 85%,
                rgba(255,255,255,0.2) 85.5%,
                rgba(0,0,0,0) 87%
            );
            pointer-events: none;
            z-index: 5;
        }

        .tear-top, .tear-bottom {
            position: absolute;
            left: 0;
            right: 0;
            height: 8px;
            background-color: #1a1a1a;
            z-index: 10;
        }
        .tear-top { top: 0; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 98% 30%, 96% 100%, 94% 30%, 92% 100%, 90% 30%, 88% 100%, 86% 30%, 84% 100%, 82% 30%, 80% 100%, 78% 30%, 76% 100%, 74% 30%, 72% 100%, 70% 30%, 68% 100%, 66% 30%, 64% 100%, 62% 30%, 60% 100%, 58% 30%, 56% 100%, 54% 30%, 52% 100%, 50% 30%, 48% 100%, 46% 30%, 44% 100%, 42% 30%, 40% 100%, 38% 30%, 36% 100%, 34% 30%, 32% 100%, 30% 30%, 28% 100%, 26% 30%, 24% 100%, 22% 30%, 20% 100%, 18% 30%, 16% 100%, 14% 30%, 12% 100%, 10% 30%, 8% 100%, 6% 30%, 4% 100%, 2% 30%, 0% 100%); }
        .tear-bottom { bottom: 0; clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 98% 70%, 96% 0%, 94% 70%, 92% 0%, 90% 70%, 88% 0%, 86% 70%, 84% 0%, 82% 70%, 80% 0%, 78% 70%, 76% 0%, 74% 70%, 72% 0%, 70% 70%, 68% 0%, 66% 70%, 64% 0%, 62% 70%, 60% 0%, 58% 70%, 56% 0%, 54% 70%, 52% 0%, 50% 70%, 48% 0%, 46% 70%, 44% 0%, 42% 70%, 40% 0%, 38% 70%, 36% 0%, 34% 70%, 32% 0%, 30% 70%, 28% 0%, 26% 70%, 24% 0%, 22% 70%, 20% 0%, 18% 70%, 16% 0%, 14% 70%, 12% 0%, 10% 70%, 8% 0%, 6% 70%, 4% 0%, 2% 70%, 0% 0%); }

        .header-logo { text-align: center; margin-bottom: 2px; }
        .iocl-symbol { width: 60px; height: 60px; margin: 0 auto; }
        .brand-text {
            font-family: 'Inter', sans-serif;
            font-weight: 800;
            font-size: 20px;
            text-align: center;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
        }

        .center { text-align: center; }
        .right { text-align: right; }
        .bold { font-weight: bold; }
        .row { display: flex; justify-content: space-between; margin: 1px 0; }
        
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
            body { background: white; padding: 0; }
            .receipt { box-shadow: none; width: 75mm; border: none; }
            .tear-top, .tear-bottom, .receipt::before { display: none; }
        }
    </style>
</head>
<body>

    <div class="receipt">
        <div class="tear-top"></div>
        
        <div class="header-logo">
            <svg class="iocl-symbol" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="44" fill="none" stroke="black" stroke-width="4"/>
                <line x1="6" y1="40" x2="94" y2="40" stroke="black" stroke-width="3"/>
                <line x1="6" y1="60" x2="94" y2="60" stroke="black" stroke-width="3"/>
                <text x="50" y="53" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">इंडियनऑयल</text>
            </svg>
        </div>
        <div class="brand-text">IndianOil</div>

        <div class="station-header center">
            ${escapeHtml(data.stationName)}<br>
            ${escapeHtml(data.stationAddress)}<br>
            ${escapeHtml(data.stationCity)}
        </div>

        <div style="font-size: 11px; margin-bottom: 3px;">Attendant Name - ${escapeHtml(data.attendantName)}</div>

        <div class="row">
            <span>DATE: ${escapeHtml(data.date)}</span>
            <span class="right">TIME: ${escapeHtml(data.time)}</span>
        </div>
        <div class="row">
            <span>MID: ${escapeHtml(data.mid)}</span>
            <span class="right">TID: ${escapeHtml(data.tid)}</span>
        </div>
        <div class="row">
            <span>BATCH No: ${escapeHtml(data.batchNo)}</span>
            <span class="right">INVOICE No: ${escapeHtml(data.invoiceNo)}</span>
        </div>

        <div class="center sale-banner">Sale</div>

        <div class="row">
            <span class="bold">CARD ${escapeHtml(data.cardNumber)} CHIP</span>
        </div>
        <div class="row">
            <span>${escapeHtml(data.cardType)}</span>
            <span class="right">EXP DATE:${escapeHtml(data.expDate)}</span>
        </div>
        <div class="row">
            <span>Txn Type: ${escapeHtml(data.txnType)}</span>
        </div>
        <div class="row">
            <span>APPR CODE: ${escapeHtml(data.apprCode)}</span>
            <span class="right">RRN: ${escapeHtml(data.rrn)}</span>
        </div>
        <div style="font-size: 10px; margin-bottom: 1px;">${escapeHtml(data.authCode)}</div>

        <div class="row">
            <span>TC: ${escapeHtml(data.tc)}</span>
            <span class="right">ATC: ${escapeHtml(data.atc)}</span>
        </div>
        <div class="row">
            <span>TSI: ${escapeHtml(data.tsi)}</span>
            <span class="right">${escapeHtml(data.tsiValue)}</span>
        </div>
        <div class="row">
            <span>TVR</span>
            <span class="right">${escapeHtml(data.tvr)}</span>
        </div>
        <div class="row">
            <span>AID</span>
            <span class="right">${escapeHtml(data.aid)}</span>
        </div>

        <div class="row" style="margin-top: 4px;">
            <span>Product :</span>
            <span class="right">${escapeHtml(data.product)}</span>
        </div>
        <div class="row">
            <span>Txn Id :</span>
            <span class="right">${escapeHtml(data.txnId)}</span>
        </div>
        <div class="row">
            <span>Unit Price : ₹ ${escapeHtml(data.unitPrice)}</span>
            <span class="right">Quantity : ${escapeHtml(data.quantity)} Ltr</span>
        </div>
        <div class="row">
            <span>Pump No : ${escapeHtml(data.pumpNo)}</span>
            <span class="right">Nozzle No : ${escapeHtml(data.nozzleNo)}</span>
        </div>
        <div class="row">
            <span>License Plate :</span>
            <span class="right">${escapeHtml(data.licensePlate)}</span>
        </div>

        <div class="row" style="margin-top: 4px;">
            <span class="bold">Total Sale</span>
            <span class="right bold" style="font-size: 14px;">₹ ${escapeHtml(data.totalSale)}</span>
        </div>

        <div class="divider-dotted"></div>
        <div class="row net-amount-row">
            <span>Net Amount</span>
            <span>₹ ${escapeHtml(data.netAmount)}</span>
        </div>
        <div class="divider-dotted"></div>

        <div class="center bold" style="margin-top: 6px; font-size: 12px; line-height: 1.1;">
            PIN VERIFIED OK<br>
            SIGNATURE NOT REQUIRED
        </div>

        <div class="divider-dotted" style="margin-top: 12px;"></div>
        <div class="center" style="font-size: 9.5px; margin-top: 2px;">
            I AGREE TO PAY AS PER CARD ISSUER AGREEEMENT
        </div>

        <div class="center" style="font-size: 10px; margin-top: 6px;">
            Offline transactions are not eligible for the<br>
            XTRAREWARDS Point accrual
        </div>

        <div class="center bold" style="font-size: 15px; margin-top: 10px; letter-spacing: 0.5px;">
            CUSTOMER COPY
        </div>

        <div class="center" style="font-size: 11px; margin-top: 12px;">
            ${escapeHtml(data.appVersion)}<br>
            IOCL App Version: ${escapeHtml(data.ioclAppVersion)}
        </div>

        <div class="center fiserv-footer">
            fiserv.
        </div>

        <div class="tear-bottom"></div>
    </div>

</body>
</html>`;
}

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validates receipt data fields
 */
export function validateReceiptData(data: Partial<ReceiptData>): string[] {
  const errors: string[] = [];

  if (data.date && !/^\d{2}-\d{2}-\d{4}$/.test(data.date)) {
    errors.push('Date must be in DD-MM-YYYY format');
  }

  if (data.time && !/^\d{2}:\d{2}:\d{2}$/.test(data.time)) {
    errors.push('Time must be in HH:MM:SS format');
  }

  if (data.unitPrice && isNaN(parseFloat(data.unitPrice))) {
    errors.push('Unit price must be a valid number');
  }

  if (data.quantity && isNaN(parseFloat(data.quantity))) {
    errors.push('Quantity must be a valid number');
  }

  if (data.totalSale && isNaN(parseFloat(data.totalSale))) {
    errors.push('Total sale must be a valid number');
  }

  if (data.netAmount && isNaN(parseFloat(data.netAmount))) {
    errors.push('Net amount must be a valid number');
  }

  return errors;
}

/**
 * Calculates total sale based on unit price and quantity
 */
export function calculateTotalSale(unitPrice: string, quantity: string): string {
  const price = parseFloat(unitPrice);
  const qty = parseFloat(quantity);

  if (isNaN(price) || isNaN(qty)) {
    return '';
  }

  return (price * qty).toFixed(2);
}
