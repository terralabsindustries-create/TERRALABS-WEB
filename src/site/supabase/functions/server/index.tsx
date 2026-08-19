import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8c0fc0e7/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize storage bucket on startup
async function initializeStorage() {
  const bucketName = 'make-8c0fc0e7-agreements';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Creating storage bucket: ${bucketName}`);
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (error) {
        console.error('Failed to create storage bucket:', error);
      } else {
        console.log('Storage bucket created successfully');
      }
    } else {
      console.log('Storage bucket already exists');
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Initialize storage on startup
initializeStorage();

// Submit customer agreement endpoint
app.post("/make-server-8c0fc0e7/submit-agreement", async (c) => {
  try {
    const body = await c.req.json();
    const {
      agreementId,
      fullName,
      email,
      date,
      ipAddress,
      signature,
      plan,
      capitalAmount,
      actualFee,
      subscriptionPeriod,
      pdfBase64,
      kyc,
      documents
    } = body;

    // Validate required fields
    if (!agreementId || !fullName || !email || !signature || !pdfBase64 || !kyc || !documents) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields (including KYC data and documents)' 
      }, 400);
    }

    console.log(`Processing agreement submission: ${agreementId} for ${fullName}`);

    // Store agreement data in KV store
    const agreementData = {
      agreementId,
      fullName,
      email,
      date,
      ipAddress,
      plan,
      capitalAmount,
      actualFee,
      subscriptionPeriod,
      signatureDataUrl: signature,
      kyc: kyc,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    await kv.set(`agreement:${agreementId}`, agreementData);
    console.log(`Agreement data stored in KV: agreement:${agreementId}`);

    // Upload PDF to storage
    const bucketName = 'make-8c0fc0e7-agreements';
    const fileName = `${agreementId}.pdf`;
    
    // Convert base64 to binary
    const pdfBuffer = Uint8Array.from(atob(pdfBase64.split(',')[1]), c => c.charCodeAt(0));
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Failed to upload PDF to storage:', uploadError);
      return c.json({ 
        success: false, 
        error: 'Failed to upload PDF',
        details: uploadError.message
      }, 500);
    }

    console.log(`PDF uploaded successfully: ${fileName}`);

    // Upload KYC documents
    const docUrls: any = {};
    
    try {
      // Upload ID document
      if (documents.idDocument) {
        const idFileName = `${agreementId}_${documents.idDocument.name}`;
        const idBuffer = Uint8Array.from(atob(documents.idDocument.data.split(',')[1]), c => c.charCodeAt(0));
        
        const { error: idUploadError } = await supabase.storage
          .from(bucketName)
          .upload(idFileName, idBuffer, {
            contentType: 'application/pdf',
            upsert: false
          });
        
        if (idUploadError) {
          console.error('Failed to upload ID document:', idUploadError);
        } else {
          console.log(`ID document uploaded: ${idFileName}`);
          const { data: idUrlData } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(idFileName, 604800);
          docUrls.idDocument = idUrlData?.signedUrl;
        }
      }
      
      // Upload proof of address
      if (documents.proofOfAddress) {
        const proofFileName = `${agreementId}_${documents.proofOfAddress.name}`;
        const proofBuffer = Uint8Array.from(atob(documents.proofOfAddress.data.split(',')[1]), c => c.charCodeAt(0));
        
        const { error: proofUploadError } = await supabase.storage
          .from(bucketName)
          .upload(proofFileName, proofBuffer, {
            contentType: 'application/pdf',
            upsert: false
          });
        
        if (proofUploadError) {
          console.error('Failed to upload proof of address:', proofUploadError);
        } else {
          console.log(`Proof of address uploaded: ${proofFileName}`);
          const { data: proofUrlData } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(proofFileName, 604800);
          docUrls.proofOfAddress = proofUrlData?.signedUrl;
        }
      }
    } catch (docError) {
      console.error('Error uploading KYC documents:', docError);
      // Continue even if document upload fails
    }

    // Generate signed URL for PDF (valid for 7 days)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 604800); // 7 days

    if (urlError) {
      console.error('Failed to generate signed URL:', urlError);
    }

    const pdfUrl = signedUrlData?.signedUrl || null;

    // Send email notification to company
    try {
      await sendAgreementNotification({
        agreementId,
        fullName,
        email,
        date,
        ipAddress,
        plan,
        capitalAmount,
        actualFee,
        subscriptionPeriod,
        pdfUrl,
        pdfBase64: pdfBase64.split(',')[1], // Pass base64 PDF data for attachment
        kyc,
        docUrls,
        documents: {
          idDocument: documents.idDocument?.data.split(',')[1],
          proofOfAddress: documents.proofOfAddress?.data.split(',')[1],
          idDocumentName: documents.idDocument?.name,
          proofOfAddressName: documents.proofOfAddress?.name
        }
      });
      console.log('Email notification sent to company');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return c.json({
      success: true,
      agreementId,
      message: 'Agreement submitted successfully',
      pdfUrl
    });

  } catch (error) {
    console.error('Error processing agreement submission:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Helper function to send email notification
async function sendAgreementNotification(data: any) {
  const {
    agreementId,
    fullName,
    email,
    date,
    ipAddress,
    plan,
    capitalAmount,
    actualFee,
    subscriptionPeriod,
    pdfUrl,
    pdfBase64,
    kyc,
    docUrls,
    documents
  } = data;

  // Compose email content
  const emailSubject = `🔔 New Customer Agreement + KYC - ${agreementId}`;
  
  let emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">TERRALABS INDUSTRIES</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">New Customer Agreement Signed with KYC Verification</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #FF5C39; margin-top: 0;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Agreement ID:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${agreementId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Full Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date Signed:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>IP Address:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${ipAddress}</td>
          </tr>
        </table>

        <h2 style="color: #FF5C39; margin-top: 24px;">KYC Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date of Birth:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.dateOfBirth || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Nationality:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.nationality || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Country of Residence:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.countryOfResidence || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.address || 'N/A'}, ${kyc?.city || ''}, ${kyc?.postalCode || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone Number:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.phoneNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Occupation:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.occupation || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Employer:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.employerName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Annual Income:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.annualIncome || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Source of Funds:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.sourceOfFunds || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tax ID:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.taxId || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Type:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.idType === 'passport' ? 'Passport' : 'Emirates ID'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Number:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.idNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Expiry:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${kyc?.idExpiryDate || 'N/A'}</td>
          </tr>
          <tr style="${kyc?.isPEP ? '' : 'display: none;'}">
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>PEP Status:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; color: #FF5C39;"><strong>YES - ${kyc?.pepDetails || ''}</strong></td>
          </tr>
        </table>

        <h2 style="color: #FF5C39; margin-top: 24px;">Subscription Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Trading Engine:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${plan?.engine || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Plan Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${plan?.name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pricing Model:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${plan?.pricingModel === 'software-license' || plan?.pricingModel === 'subscription' ? 'Software Licensing (Fixed Monthly Fee)' : 'Software Licensing'}</td>
          </tr>`;

  if (capitalAmount) {
    emailBody += `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>MT5 Capital:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${capitalAmount}</td>
          </tr>`;
  }

  if (actualFee && plan?.pricingModel === 'subscription') {
    emailBody += `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subscription Fee:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${actualFee.toFixed(2)} per ${subscriptionPeriod || 'quarter'}</td>
          </tr>`;
  }

  emailBody += `
        </table>

        <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #FF5C39;">
          <h3 style="color: #FF5C39; margin-top: 0;">📄 Signed Agreement PDF</h3>
          <p style="margin: 12px 0;">The customer has digitally signed the agreement. The signed PDF is attached to this email and can also be downloaded using the link below:</p>
          <a href="${pdfUrl || '#'}" style="display: inline-block; padding: 12px 24px; background: #FF5C39; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Agreement PDF</a>
          <p style="margin-top: 16px; font-size: 12px; color: #666;">Link expires in 7 days</p>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #1976D2;">Next Steps</h4>
          <ol style="margin: 8px 0; padding-left: 20px;">
            <li>Review and verify customer details</li>
            <li>Complete KYC/AML verification</li>
            <li>Process MT5 broker integration</li>
            <li>Activate trading engine access</li>
            <li>Send welcome email to customer</li>
          </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 4px 0;">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES - FZCO</p>
          <p style="margin: 4px 0;">Dubai International Free Zone Authority (DIEZA), Dubai, UAE</p>
          <p style="margin: 4px 0;">Automated notification from Customer Onboarding System</p>
        </div>
      </div>
    </div>
  `;

  // Send via Resend
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping email notification');
    console.warn('Agreement has been saved successfully. Email notification skipped.');
    return;
  }

  // Validate API key format (should start with 're_')
  if (!resendApiKey.startsWith('re_')) {
    console.warn('⚠️ RESEND_API_KEY appears to be invalid (should start with "re_")');
    console.warn('Agreement has been saved successfully. Email notification skipped.');
    return;
  }

  const emailPayload: any = {
    from: 'TERRALABS Onboarding <onboarding@resend.dev>',
    to: ['terralabsindustries@outlook.com'],
    subject: emailSubject,
    html: emailBody,
  };

  // Add PDF and KYC document attachments if available
  if (pdfBase64 || documents) {
    emailPayload.attachments = [];
    
    // Add agreement PDF
    if (pdfBase64) {
      emailPayload.attachments.push({
        filename: `${agreementId}_Agreement.pdf`,
        content: pdfBase64,
      });
    }
    
    // Add ID document
    if (documents?.idDocument) {
      emailPayload.attachments.push({
        filename: `${agreementId}_${documents.idDocumentName || 'ID_Document.pdf'}`,
        content: documents.idDocument,
      });
    }
    
    // Add proof of address
    if (documents?.proofOfAddress) {
      emailPayload.attachments.push({
        filename: `${agreementId}_${documents.proofOfAddressName || 'Proof_of_Address.pdf'}`,
        content: documents.proofOfAddress,
      });
    }
  }

  console.log('📧 Attempting to send email to:', emailPayload.to);
  console.log('📧 Email subject:', emailSubject);
  console.log('📧 Attachments:', emailPayload.attachments?.length || 0);

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error('❌ Email send failed with status:', emailResponse.status);
    console.error('❌ Error details:', errorText);
    console.warn('Agreement has been saved successfully. Email notification failed.');
    // Don't throw - just log and continue
    return;
  }

  const result = await emailResponse.json();
  console.log('✅ Email notification sent successfully!');
  console.log('✅ Email ID:', result.id);
  console.log('✅ Recipient:', emailPayload.to);
  return result;
}

// Get agreement by ID endpoint
app.get("/make-server-8c0fc0e7/agreement/:id", async (c) => {
  try {
    const agreementId = c.req.param('id');
    const agreementData = await kv.get(`agreement:${agreementId}`);
    
    if (!agreementData) {
      return c.json({ 
        success: false, 
        error: 'Agreement not found' 
      }, 404);
    }

    return c.json({
      success: true,
      agreement: agreementData
    });
  } catch (error) {
    console.error('Error fetching agreement:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

// List all agreements endpoint
app.get("/make-server-8c0fc0e7/agreements", async (c) => {
  try {
    const agreements = await kv.getByPrefix('agreement:');
    
    return c.json({
      success: true,
      count: agreements.length,
      agreements
    });
  } catch (error) {
    console.error('Error fetching agreements:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

// Enterprise request submission endpoint
app.post("/make-server-8c0fc0e7/submit-enterprise-request", async (c) => {
  try {
    const body = await c.req.json();
    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      capitalRange,
      deploymentType,
      whiteLabelInterest,
      notes,
      timestamp
    } = body;

    // Validate required fields
    if (!fullName || !companyName || !email) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, 400);
    }

    const requestId = `ENT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Processing enterprise request: ${requestId} from ${companyName}`);

    // Store in KV
    const enterpriseData = {
      requestId,
      fullName,
      companyName,
      email,
      phone: phone || 'Not provided',
      country: country || 'Not specified',
      capitalRange: capitalRange || 'Not disclosed',
      deploymentType,
      whiteLabelInterest,
      notes: notes || 'None',
      timestamp,
      status: 'pending'
    };

    await kv.set(`enterprise_request:${requestId}`, enterpriseData);
    console.log('Enterprise request stored in KV');

    // Send email notification to company
    try {
      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
      if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
      }

      const emailSubject = `🏢 New Enterprise Request - ${companyName}`;
      
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">TERRALABS INDUSTRIES</h1>
            <p style="color: rgba(0,0,0,0.8); margin: 8px 0 0 0;">New Enterprise & Custom Licensing Request</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #FFD700; margin-top: 0;">Request Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Request ID:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Contact Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Company:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Country:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${country || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Capital Range:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${capitalRange || 'Not disclosed'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Deployment Type:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${deploymentType}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>White-Label Interest:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${whiteLabelInterest ? '<strong style="color: #9CFF2E;">YES</strong>' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Submitted:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(timestamp).toLocaleString()}</td>
              </tr>
            </table>

            ${notes ? `
            <h3 style="color: #FFD700; margin-top: 24px;">Additional Notes:</h3>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #FFD700;">
              <p style="margin: 0; white-space: pre-wrap;">${notes}</p>
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%); border-radius: 8px; border: 2px solid rgba(255, 215, 0, 0.3);">
              <h3 style="color: #FFD700; margin-top: 0;">Action Required:</h3>
              <p style="margin: 0; color: #333;">Enterprise team should review this request and contact ${fullName} at ${email} within 2 business days.</p>
            </div>
          </div>
        </div>
      `;

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'TERRALABS Enterprise <noreply@terralabsindustries.com>',
          to: ['terralabsindustries@outlook.com'],
          subject: emailSubject,
          html: emailBody
        })
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Email API error: ${errorText}`);
      }

      console.log('Enterprise request email notification sent');
    } catch (emailError) {
      console.error('Failed to send enterprise email notification:', emailError);
      // Don't fail the request if email fails
    }

    return c.json({
      success: true,
      requestId,
      message: 'Enterprise request submitted successfully'
    });

  } catch (error) {
    console.error('Error processing enterprise request:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Onboarding request submission endpoint
app.post("/make-server-8c0fc0e7/submit-onboarding-request", async (c) => {
  try {
    const body = await c.req.json();
    const {
      fullName,
      email,
      phone,
      country,
      tier,
      engine,
      capital,
      monthlyFee,
      timestamp
    } = body;

    // Validate required fields
    if (!fullName || !email) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, 400);
    }

    const requestId = `ONB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Processing onboarding request: ${requestId} for ${fullName}`);

    // Store in KV
    const onboardingData = {
      requestId,
      fullName,
      email,
      phone: phone || 'Not provided',
      country: country || 'Not specified',
      tier: tier || 'Not specified',
      engine: engine || 'Aurelius-1™',
      capital: capital || 'Not specified',
      monthlyFee: monthlyFee || 0,
      timestamp,
      status: 'pending'
    };

    await kv.set(`onboarding_request:${requestId}`, onboardingData);
    console.log('Onboarding request stored in KV');

    // Send email notification to company
    try {
      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
      if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
      }

      const emailSubject = `📋 New Client Onboarding - ${fullName}`;
      
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">TERRALABS INDUSTRIES</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">New Client Onboarding Request</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #FF5C39; margin-top: 0;">Client Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Request ID:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Full Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Country:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${country || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Selected Tier:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${tier}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Trading Engine:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${engine}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Trading Capital:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${capital}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Monthly Fee:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${monthlyFee}/month</td>
              </tr>

            </table>
            
            <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <strong style="color: #856404;">Action Required:</strong>
              <p style="color: #856404; margin: 8px 0 0 0;">Contact client within 24 hours to begin onboarding process and activate subscription.</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>TERRALABS INDUSTRIES | Licensed under DIEZA No. 75343</p>
          </div>
        </div>
      `;

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'TERRALABS <noreply@terralabs.com>',
          to: ['info@terralabs.com'],
          subject: emailSubject,
          html: emailBody
        })
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error('Email notification failed:', errorText);
      } else {
        console.log('Email notification sent successfully');
      }

    } catch (emailError) {
      console.error('Email sending error (non-critical):', emailError);
      // Continue even if email fails
    }

    return c.json({
      success: true,
      requestId,
      message: 'Onboarding request submitted successfully'
    });

  } catch (error) {
    console.error('Error processing onboarding request:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

Deno.serve(app.fetch);