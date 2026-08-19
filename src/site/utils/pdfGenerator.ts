import jsPDF from 'jspdf';

interface PDFGeneratorOptions {
  type: 'onboarding' | 'enterprise';
  data: any;
  logoDataUrl?: string;
}

export async function generateSubmissionPDF(options: PDFGeneratorOptions): Promise<Blob> {
  const { type, data, logoDataUrl } = options;
  
  // Create PDF with A4 dimensions (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Medium margins (20mm)
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  let currentY = marginTop;

  // Add logo if provided
  if (logoDataUrl) {
    try {
      pdf.addImage(logoDataUrl, 'PNG', marginLeft, currentY, 40, 12);
      currentY += 20;
    } catch (error) {
      console.error('Error adding logo to PDF:', error);
      // Continue without logo
    }
  } else {
    // Fallback: Text-based branding
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 92, 57); // #FF5C39
    pdf.text('TERRALABS INDUSTRIES', marginLeft, currentY);
    currentY += 8;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Algorithmic Trading Solutions', marginLeft, currentY);
    currentY += 15;
  }

  // License information
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(120, 120, 120);
  pdf.text('Licensed & Registered with DIEZA | License No. 75343', marginLeft, currentY);
  currentY += 3;
  
  // Horizontal line
  pdf.setDrawColor(255, 92, 57);
  pdf.setLineWidth(0.5);
  pdf.line(marginLeft, currentY, pageWidth - marginRight, currentY);
  currentY += 10;

  // Document title
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  const title = type === 'onboarding' 
    ? 'CLIENT ONBOARDING SUBMISSION'
    : 'ENTERPRISE INQUIRY REQUEST';
  pdf.text(title, marginLeft, currentY);
  currentY += 10;

  // Document ID and timestamp
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
  pdf.text(`Document ID: ${data.requestId || 'N/A'}`, marginLeft, currentY);
  currentY += 5;
  pdf.text(`Submission Date: ${timestamp}`, marginLeft, currentY);
  currentY += 12;

  // Section: Client Information
  currentY = addSection(pdf, 'CLIENT INFORMATION', currentY, marginLeft, contentWidth);
  
  if (type === 'onboarding') {
    currentY = addField(pdf, 'Full Name', data.fullName || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Email Address', data.email || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Phone Number', data.phone || 'Not provided', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Country', data.country || 'Not specified', currentY, marginLeft, contentWidth);
    currentY += 8;
    
    // Section: Subscription Details
    currentY = addSection(pdf, 'SUBSCRIPTION DETAILS', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Selected Tier', data.tier || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Trading Engine', data.engine || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Trading Capital', data.capital || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Monthly Fee', `$${data.monthlyFee || 'N/A'}`, currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Trial Period', data.trialPeriod || '3 months FREE', currentY, marginLeft, contentWidth);
    currentY += 8;
    
    // Section: Onboarding Process
    currentY = addSection(pdf, 'ONBOARDING PROCESS', currentY, marginLeft, contentWidth);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    
    const onboardingSteps = [
      '1. Begin 3-month FREE trial period (no payment required)',
      '2. Review and sign digital software license agreement',
      '3. Receive account credentials and platform access',
      '4. Complete KYC verification process',
      '5. MT5 broker account setup and API integration',
      '6. Trading engine activation and monitoring begins',
      '7. After trial: First monthly payment due',
      '8. Continuous 24/7 algorithmic trading support'
    ];
    
    onboardingSteps.forEach(step => {
      if (currentY > 270) {
        pdf.addPage();
        currentY = marginTop;
      }
      pdf.text(step, marginLeft + 2, currentY);
      currentY += 6;
    });
    
  } else {
    // Enterprise inquiry fields
    currentY = addField(pdf, 'Contact Name', data.fullName || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Company Name', data.companyName || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Email Address', data.email || 'N/A', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Phone Number', data.phone || 'Not provided', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Country', data.country || 'Not specified', currentY, marginLeft, contentWidth);
    currentY += 8;
    
    // Section: Enterprise Requirements
    currentY = addSection(pdf, 'ENTERPRISE REQUIREMENTS', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Capital Range', data.capitalRange || 'Not disclosed', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'Deployment Type', data.deploymentType || 'Cloud', currentY, marginLeft, contentWidth);
    currentY = addField(pdf, 'White-Label Interest', data.whiteLabelInterest ? 'YES' : 'No', currentY, marginLeft, contentWidth);
    
    if (data.notes && data.notes !== 'None') {
      currentY += 5;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Additional Notes:', marginLeft, currentY);
      currentY += 5;
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const notesLines = pdf.splitTextToSize(data.notes, contentWidth - 4);
      notesLines.forEach((line: string) => {
        if (currentY > 270) {
          pdf.addPage();
          currentY = marginTop;
        }
        pdf.text(line, marginLeft + 2, currentY);
        currentY += 5;
      });
    }
  }

  // Check if we need a new page for footer
  if (currentY > 250) {
    pdf.addPage();
    currentY = marginTop;
  } else {
    currentY += 15;
  }

  // Footer section
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.3);
  pdf.line(marginLeft, currentY, pageWidth - marginRight, currentY);
  currentY += 6;

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 92, 57);
  pdf.text('NEXT STEPS', marginLeft, currentY);
  currentY += 5;

  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  if (type === 'onboarding') {
    pdf.text('• Our team will contact you within 24 hours to begin your onboarding', marginLeft, currentY);
    currentY += 5;
    pdf.text('• You will receive a welcome email with platform access instructions', marginLeft, currentY);
    currentY += 5;
    pdf.text('• Your 3-month FREE trial begins immediately upon account activation', marginLeft, currentY);
  } else {
    pdf.text('• Our enterprise team will review your request within 2 business days', marginLeft, currentY);
    currentY += 5;
    pdf.text('• A dedicated account manager will be assigned to your inquiry', marginLeft, currentY);
    currentY += 5;
    pdf.text('• Custom pricing and deployment options will be discussed', marginLeft, currentY);
  }

  currentY += 10;

  // Company contact information
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(120, 120, 120);
  pdf.text('TERRALABS INDUSTRIES | Licensed under DIEZA No. 75343', marginLeft, currentY);
  currentY += 4;
  pdf.text('For inquiries: Contact us via WhatsApp or email', marginLeft, currentY);

  // Page numbers
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - marginRight - 20,
      297 - 10,
      { align: 'right' }
    );
  }

  return pdf.output('blob');
}

function addSection(
  pdf: jsPDF,
  title: string,
  y: number,
  marginLeft: number,
  contentWidth: number
): number {
  // Section header with background
  pdf.setFillColor(255, 92, 57);
  pdf.rect(marginLeft, y - 4, contentWidth, 7, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text(title, marginLeft + 2, y);
  
  return y + 8;
}

function addField(
  pdf: jsPDF,
  label: string,
  value: string,
  y: number,
  marginLeft: number,
  contentWidth: number
): number {
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${label}:`, marginLeft, y);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  
  // Handle long text wrapping
  const valueLines = pdf.splitTextToSize(value, contentWidth - 50);
  valueLines.forEach((line: string, index: number) => {
    pdf.text(line, marginLeft + 50, y + (index * 5));
  });
  
  return y + (valueLines.length * 5) + 3;
}

// Helper function to convert image URL to data URL for PDF
export async function convertImageToDataURL(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}

// Generate customer agreement PDF (for full legal agreement documents)
interface AgreementPDFOptions {
  fullName: string;
  email: string;
  date: string;
  signature: string;
  ipAddress: string;
  planName: string;
  planPrice: string;
  planEngine: string;
  capitalAmount: string;
  tier: string;
}

export async function generateAgreementPDF(options: AgreementPDFOptions): Promise<Blob> {
  const {
    fullName,
    email,
    date,
    signature,
    ipAddress,
    planName,
    planPrice,
    planEngine,
    capitalAmount,
    tier
  } = options;

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Medium margins (20mm)
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  let currentY = marginTop;

  // Header - Company branding
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 92, 57);
  pdf.text('TERRALABS INDUSTRIES', marginLeft, currentY);
  currentY += 7;
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text('INFORMATION TECHNOLOGY CONSULTANCIES - FZCO', marginLeft, currentY);
  currentY += 4;
  pdf.text('Licensed under DIEZA | License No. 75343', marginLeft, currentY);
  currentY += 10;

  // Horizontal line
  pdf.setDrawColor(255, 92, 57);
  pdf.setLineWidth(0.5);
  pdf.line(marginLeft, currentY, pageWidth - marginRight, currentY);
  currentY += 12;

  // Document title
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('SOFTWARE LICENSE AGREEMENT', marginLeft, currentY);
  currentY += 10;

  // Agreement details
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Agreement Date: ${date}`, marginLeft, currentY);
  currentY += 5;
  pdf.text(`Client IP Address: ${ipAddress}`, marginLeft, currentY);
  currentY += 12;

  // Client Information Section
  currentY = addSection(pdf, 'CLIENT INFORMATION', currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Full Legal Name', fullName, currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Email Address', email, currentY, marginLeft, contentWidth);
  currentY += 8;

  // Subscription Details Section
  currentY = addSection(pdf, 'SUBSCRIPTION DETAILS', currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Selected Tier', tier, currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Trading Engine', planEngine, currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Trading Capital', capitalAmount, currentY, marginLeft, contentWidth);
  currentY = addField(pdf, 'Subscription Fee', planPrice, currentY, marginLeft, contentWidth);
  currentY += 10;

  // Agreement Terms (Condensed version)
  currentY = addSection(pdf, 'KEY TERMS & CONDITIONS', currentY, marginLeft, contentWidth);
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  
  const terms = [
    '1. SOFTWARE LICENSE: TERRALABS grants Client a non-exclusive license to use the algorithmic trading software.',
    '2. FREE TRIAL: Client receives 3 months of free access. No payment required during trial period.',
    '3. SUBSCRIPTION: After trial, Client may continue with the selected subscription tier.',
    '4. NO PROFIT SHARING: Client keeps 100% of trading profits. TERRALABS receives only the monthly license fee.',
    '5. NO GUARANTEES: Software is provided "as-is". No guaranteed returns or performance claims.',
    '6. RISK DISCLOSURE: Trading involves substantial risk of loss. Client acknowledges all risks.',
    '7. EXECUTION-ONLY: TERRALABS provides software tools only. No financial advice is offered.',
    '8. MINIMUM COMMITMENT: 3-month minimum subscription period after free trial ends.',
    '9. TERMINATION: Either party may terminate with 30 days written notice after minimum period.',
    '10. DATA PRIVACY: Client data handled per TERRALABS Privacy Policy and GDPR compliance.'
  ];

  terms.forEach((term) => {
    if (currentY > 270) {
      pdf.addPage();
      currentY = marginTop;
    }
    const lines = pdf.splitTextToSize(term, contentWidth - 4);
    lines.forEach((line: string) => {
      pdf.text(line, marginLeft + 2, currentY);
      currentY += 4.5;
    });
    currentY += 1;
  });

  currentY += 5;

  // Digital Signature Section
  if (currentY > 240) {
    pdf.addPage();
    currentY = marginTop;
  }

  currentY = addSection(pdf, 'DIGITAL SIGNATURE', currentY, marginLeft, contentWidth);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 60, 60);
  pdf.text('By signing below, Client agrees to all terms and conditions:', marginLeft, currentY);
  currentY += 10;

  // Add signature image
  if (signature) {
    try {
      pdf.addImage(signature, 'PNG', marginLeft, currentY, 60, 20);
      currentY += 25;
    } catch (error) {
      console.error('Error adding signature to PDF:', error);
      currentY += 10;
    }
  }

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Signed by: ${fullName}`, marginLeft, currentY);
  currentY += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Date: ${date}`, marginLeft, currentY);
  currentY += 5;
  pdf.text(`IP Address: ${ipAddress}`, marginLeft, currentY);
  currentY += 15;

  // Footer disclaimer
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(120, 120, 120);
  const disclaimer = 'This is a legally binding agreement. TERRALABS provides software tools only. No financial advice. No guaranteed returns. Trading involves substantial risk of loss.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, contentWidth);
  disclaimerLines.forEach((line: string) => {
    if (currentY > 280) {
      pdf.addPage();
      currentY = marginTop;
    }
    pdf.text(line, marginLeft, currentY);
    currentY += 3.5;
  });

  // Page numbers
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - marginRight - 20,
      297 - 10,
      { align: 'right' }
    );
  }

  return pdf.output('blob');
}