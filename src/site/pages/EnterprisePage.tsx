import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Building2, Globe, Server, Shield, AlertTriangle, Download } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { generateSubmissionPDF, convertImageToDataURL } from '../utils/pdfGenerator';
const terralabsLogo = "/images/TERRA_OPS_LOGO__2_-1.png";
import '../../styles/legal.css';

interface EnterprisePageProps {
  onBack: () => void;
}

export function EnterprisePage({ onBack }: EnterprisePageProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [capitalRange, setCapitalRange] = useState('');
  const [deploymentType, setDeploymentType] = useState('cloud');
  const [whiteLabelInterest, setWhiteLabelInterest] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // Check if coming from white-label focus
  const [focusWhiteLabel, setFocusWhiteLabel] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('focus') === 'white-label') {
      setFocusWhiteLabel(true);
      setWhiteLabelInterest(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !companyName) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8c0fc0e7/submit-enterprise-request`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName,
            companyName,
            email,
            phone,
            country,
            capitalRange,
            deploymentType,
            whiteLabelInterest,
            notes,
            timestamp: new Date().toISOString()
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit enterprise request');
      }

      const result = await response.json();
      const generatedRequestId = result.requestId || `ENT-${Date.now()}`;
      setRequestId(generatedRequestId);

      // Generate PDF
      try {
        const logoDataUrl = await convertImageToDataURL(terralabsLogo);
        const pdfData = {
          requestId: generatedRequestId,
          fullName,
          companyName,
          email,
          phone,
          country,
          capitalRange,
          deploymentType,
          whiteLabelInterest,
          notes
        };

        const blob = await generateSubmissionPDF({
          type: 'enterprise',
          data: pdfData,
          logoDataUrl
        });

        setPdfBlob(blob);
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        // Continue even if PDF fails
      }

      setSubmitted(true);

      // Auto-redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(
          `🏢 ENTERPRISE INQUIRY SUBMISSION\n\n` +
          `Request ID: ${generatedRequestId}\n` +
          `Company: ${companyName}\n` +
          `Contact: ${fullName}\n` +
          `Email: ${email}\n\n` +
          `I've submitted an enterprise inquiry and would like to discuss custom licensing options for our organization.`
        );
        window.open(`https://wa.me/971543434848?text=${whatsappMessage}`, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your request. Please try again or contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TERRALABS-Enterprise-Request-${requestId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="legal-document-page">
        <div className="success-container">
          <CheckCircle size={80} style={{ color: '#10B981', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Request Submitted Successfully!</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px', maxWidth: '600px' }}>
            Thank you, {fullName}! Our enterprise team will review your request and contact you within 2 business days at {email}.
          </p>
          
          {pdfBlob && (
            <div style={{
              background: 'rgba(156, 255, 46, 0.1)',
              border: '2px solid rgba(156, 255, 46, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              maxWidth: '600px'
            }}>
              <h3 style={{ marginBottom: '12px', color: '#9CFF2E', fontSize: '18px' }}>
                📄 Your Submission Document
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
                Professional PDF generated with Request ID: <strong>{requestId}</strong>
              </p>
              <button
                onClick={downloadPDF}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, rgba(156, 255, 46, 0.25) 0%, rgba(156, 255, 46, 0.15) 100%)',
                  border: '1px solid rgba(156, 255, 46, 0.5)',
                  borderRadius: '8px',
                  color: '#9CFF2E',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto'
                }}
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          )}
          
          <div style={{
            background: 'rgba(255, 215, 0, 0.1)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '600px'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#FFD700' }}>Next Steps:</h3>
            <ol style={{ textAlign: 'left', fontSize: '16px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Enterprise team reviews your requirements</li>
              <li>Custom licensing proposal prepared</li>
              <li>Schedule discovery call</li>
              <li>Tailored deployment plan</li>
              <li>Agreement finalization</li>
            </ol>
          </div>

          <div style={{
            background: 'rgba(37, 211, 102, 0.1)',
            border: '2px solid rgba(37, 211, 102, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            maxWidth: '600px'
          }}>
            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
              🚀 <strong>Redirecting to WhatsApp...</strong><br/>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                You'll be connected with our team in a moment
              </span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Return Home
            </button>
            <a
              href={`https://wa.me/971543434848?text=${encodeURIComponent(
                `🏢 ENTERPRISE INQUIRY\n\nRequest ID: ${requestId}\nCompany: ${companyName}\nContact: ${fullName}\n\nI'd like to discuss custom licensing options.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #25D366',
                color: '#25D366',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Open WhatsApp Manually
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-document-page">
      <div className="legal-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="legal-header-content">
          <Building2 size={48} style={{ color: '#FFD700', display: 'block', margin: '0 auto' }} />
          <h1>Enterprise & Custom Licensing</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Institutional & Custom Deployment Solutions</p>
        </div>
      </div>

      <div className="legal-content">
        {/* White-Label Focus Banner */}
        {focusWhiteLabel && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(156, 255, 46, 0.15) 0%, rgba(156, 255, 46, 0.1) 100%)',
            border: '2px solid rgba(156, 255, 46, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#9CFF2E', fontWeight: 'bold' }}>
              ✓ White-Label Interest Detected
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', margin: '0' }}>
              Your white-label interest has been pre-selected below. Complete the form to receive a custom proposal.
            </p>
          </div>
        )}

        <section className="legal-section">
          <h2>Overview</h2>
          <p>
            TERRALABS works with select customers to design tailored software licensing structures aligned with infrastructure usage, deployment scale, and long-term collaboration. Custom licensing options are evaluated individually and require separate agreements.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Whether you're seeking <strong>enterprise-grade deployment</strong>, <strong>white-label branded solutions</strong>, <strong>On-Premises infrastructure</strong>, or <strong>partner distribution arrangements</strong>, our team will work with you to create a licensing model that fits your operational requirements.
          </p>
        </section>

        <section className="legal-section">
          <h2>Enterprise Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            {[
              { icon: Server, title: 'Dedicated Deployment', desc: 'Custom infrastructure planning and dedicated resource allocation for your organization.' },
              { icon: Globe, title: 'White-Label Branding', desc: 'Fully branded platform deployment with your company identity and controls.' },
              { icon: Shield, title: 'On-Premises / Private Cloud', desc: 'Deploy on your own infrastructure or private cloud environment with full control.' },
              { icon: Building2, title: 'Partner Distribution', desc: 'OEM-style licensing for brokers, institutions, and distribution partners.' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 215, 0, 0.05)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <feature.icon size={32} style={{ color: '#FFD700', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#FFD700' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="legal-section" style={{ background: 'rgba(255, 215, 0, 0.05)', border: '2px solid rgba(255, 215, 0, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h2 style={{ marginTop: 0, color: '#FFD700' }}>Request a Custom Licensing Proposal</h2>
          <p style={{ marginBottom: '24px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Complete the form below and our enterprise team will contact you with a tailored proposal.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="ACME Corporation"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Country / Jurisdiction
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United Arab Emirates"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                  Estimated Capital Range
                </label>
                <select
                  value={capitalRange}
                  onChange={(e) => setCapitalRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Select Range</option>
                  <option value="<$500K">Under $500K</option>
                  <option value="$500K-$1M">$500K - $1M</option>
                  <option value="$1M-$5M">$1M - $5M</option>
                  <option value="$5M-$10M">$5M - $10M</option>
                  <option value="$10M+">$10M+</option>
                  <option value="Not Disclosed">Prefer not to disclose</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                Desired Deployment Type
              </label>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {['Cloud', 'Private Cloud', 'On-Premises'].map((type) => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="deploymentType"
                      value={type.toLowerCase().replace(' ', '-')}
                      checked={deploymentType === type.toLowerCase().replace(' ', '-')}
                      onChange={(e) => setDeploymentType(e.target.value)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="legal-checkbox" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={whiteLabelInterest}
                  onChange={(e) => setWhiteLabelInterest(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  <strong>Interested in White-Label / Branded Deployment</strong>
                </span>
              </label>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FFD700' }}>
                Additional Notes / Requirements
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about your specific requirements, use case, or any questions..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '16px 32px',
                background: isSubmitting ? 'rgba(255, 215, 0, 0.3)' : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#000',
                fontSize: '18px',
                fontWeight: '700',
                border: 'none',
                borderRadius: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 215, 0, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 215, 0, 0.3)';
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enterprise Request'}
            </button>
          </form>
        </section>

        {/* Disclaimer */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: 'rgba(255, 92, 57, 0.05)',
          border: '1px solid rgba(255, 92, 57, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <AlertTriangle size={20} style={{ color: '#FF5C39', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: '1.6' }}>
            <strong>TERRALABS provides software tools only.</strong> No financial advice. No guarantees. Custom licensing proposals are evaluated on a case-by-case basis and require separate agreements. Trading involves substantial risk of loss.
          </p>
        </div>
      </div>
    </div>
  );
}