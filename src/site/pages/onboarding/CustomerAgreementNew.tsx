import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Download, AlertCircle, ArrowLeft, FileText, AlertTriangle, Pen, ChevronUp, Upload, X } from 'lucide-react';
import { generateAgreementPDF } from '../../utils/pdfGenerator';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import '../../../styles/legal.css';

interface CustomerAgreementProps {
  onBack: () => void;
  selectedPlan?: {
    name: string;
    price: string;
    capital: string;
    engine: string;
    tier?: string;
  };
}

// Pricing tier definitions
const PRICING_TIERS = [
  {
    tier: 'STARTER',
    capital: '$10,000 - $24,999',
    monthlyFee: 199,
    capitalMin: 10000,
    capitalMax: 24999,
    features: 'Full Aurelius-1™ access, MT5 integration, Email support, Keep 100% of profits'
  },
  {
    tier: 'BRONZE',
    capital: '$25,000 - $49,999',
    monthlyFee: 399,
    capitalMin: 25000,
    capitalMax: 49999,
    features: 'Full Aurelius-1™ access, MT5 integration, Priority email support, Keep 100% of profits'
  },
  {
    tier: 'SILVER',
    capital: '$50,000 - $99,999',
    monthlyFee: 799,
    capitalMin: 50000,
    capitalMax: 99999,
    features: 'Full Aurelius-1™ access, MT5 integration, Priority support, Monthly strategy calls, Keep 100% of profits'
  },
  {
    tier: 'GOLD',
    capital: '$100,000 - $249,999',
    monthlyFee: 1799,
    capitalMin: 100000,
    capitalMax: 249999,
    features: 'Full Aurelius-1™ access, MT5 integration, Priority support 24/7, Weekly strategy calls, Keep 100% of profits'
  },
  {
    tier: 'PLATINUM',
    capital: '$250,000 - $499,999',
    monthlyFee: 3799,
    capitalMin: 250000,
    capitalMax: 499999,
    features: 'Full Aurelius-1™ access, MT5 integration, VIP support 24/7, Weekly strategy calls, Dedicated success manager'
  },
  {
    tier: 'DIAMOND',
    capital: '$500,000+',
    monthlyFee: 7999,
    capitalMin: 500000,
    capitalMax: Infinity,
    features: 'Full Aurelius-1™ access, MT5 integration, Dedicated account manager, Daily strategy optimization, White-glove concierge service'
  }
];

export function CustomerAgreement({ onBack, selectedPlan }: CustomerAgreementProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToRisk, setAgreedToRisk] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [signature, setSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Plan selection states
  const [capitalAmount, setCapitalAmount] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');

  // Pre-fill capital amount from selectedPlan if available
  useEffect(() => {
    if (selectedPlan && selectedPlan.tier && !capitalAmount) {
      // Find the tier from PRICING_TIERS
      const tier = PRICING_TIERS.find(t => t.tier === selectedPlan.tier);
      if (tier) {
        // Set a mid-range capital amount for the selected tier
        const midRangeCapital = tier.capitalMin + Math.floor((tier.capitalMax === Infinity ? 500000 : tier.capitalMax - tier.capitalMin) / 2);
        setCapitalAmount(formatCurrency(midRangeCapital.toString()));
      }
    }
  }, [selectedPlan]);

  // Calculate tier based on capital amount
  const calculateTierFromCapital = (capital: number) => {
    const tier = PRICING_TIERS.find(t => capital >= t.capitalMin && capital <= t.capitalMax);
    return tier;
  };

  const isValidAmount = capitalAmount && parseFloat(capitalAmount.replace(/,/g, '')) >= 10000;
  const capitalValue = parseFloat(capitalAmount.replace(/,/g, '')) || 0;
  const currentTier = calculateTierFromCapital(capitalValue);

  // Format currency with commas
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setCapitalAmount(formatted);
  };

  // Get current plan details
  const getCurrentPlan = () => {
    if (selectedPlan) return selectedPlan;

    if (!currentTier) {
      return {
        name: 'Not Selected',
        price: 'Enter capital amount',
        capital: 'Minimum $10,000',
        engine: 'Aurelius-1™',
        tier: ''
      };
    }

    return {
      name: `${currentTier.tier} Tier`,
      price: `$${currentTier.monthlyFee}/month`,
      capital: currentTier.capital,
      engine: 'Pythagoras Stardust™ Gold Trading Engine',
      tier: currentTier.tier
    };
  };

  const currentPlan = getCurrentPlan();

  // Set date on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('Unable to determine'));

    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#FF5C39';
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        setCtx(context);
      }
    }
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return;
    setIsDrawing(true);

    const rect = canvasRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
    if (canvasRef.current) {
      setSignature(canvasRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignature('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms || !agreedToRisk || !agreedToPrivacy) {
      alert('Please agree to all required policies before submitting.');
      return;
    }

    if (!signature) {
      alert('Please provide your digital signature.');
      return;
    }

    if (!isValidAmount || !currentTier) {
      alert('Please enter a valid capital amount (minimum $10,000).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate PDF
      const pdfBlob = await generateAgreementPDF({
        fullName,
        email,
        date,
        signature,
        ipAddress,
        planName: currentPlan.name,
        planPrice: currentPlan.price,
        planEngine: currentPlan.engine,
        capitalAmount: `$${capitalAmount}`,
        tier: currentTier.tier
      });

      // Upload PDF to Supabase Storage
      const fileName = `agreement_${fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      
      const formData = new FormData();
      formData.append('file', pdfBlob, fileName);
      formData.append('fullName', fullName);
      formData.append('email', email);

      const uploadResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8c0fc0e7/upload-agreement`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload agreement');
      }

      // Send email notification via Resend
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8c0fc0e7/send-agreement-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: 'terralabsindustries@outlook.com',
            customerEmail: email,
            customerName: fullName,
            planName: currentPlan.name,
            capitalAmount: `$${capitalAmount}`,
            tier: currentTier.tier,
            fileName
          })
        }
      );

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the agreement. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="legal-document-page">
        <div className="success-container">
          <CheckCircle size={80} style={{ color: '#10B981', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Agreement Submitted Successfully!</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px', maxWidth: '600px' }}>
            Thank you, {fullName}! Your Software License Agreement has been received and processed. 
            A confirmation email has been sent to {email}.
          </p>
          
          <div style={{
            background: 'rgba(255, 92, 57, 0.1)',
            border: '2px solid rgba(255, 92, 57, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '600px'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#FF5C39' }}>Your Subscription is Ready!</h3>
            <div style={{ textAlign: 'left', fontSize: '16px', lineHeight: '1.8' }}>
              <p>✓ <strong>Tier:</strong> {currentTier?.tier}</p>
              <p>✓ <strong>Capital:</strong> ${capitalAmount}</p>
              <p>✓ <strong>Monthly Fee:</strong> ${currentTier?.monthlyFee}/month</p>
              <p>✓ <strong>Engine Access:</strong> Aurelius-1™ Gold Trading</p>
            </div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '600px',
            textAlign: 'left'
          }}>
            <h4 style={{ marginBottom: '12px', color: '#3B82F6' }}>Next Steps:</h4>
            <ol style={{ fontSize: '15px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Check your email for login credentials</li>
              <li>Connect your MetaTrader 5 broker account</li>
              <li>Configure your risk parameters</li>
              <li>Activate the trading algorithm</li>
              <li>Monitor performance via your dashboard</li>
            </ol>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a
              href="/client-login"
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #FF5C39',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Return Home
            </button>
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
          <FileText size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Software License Agreement</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Algorithmic Trading Software Licensing Agreement</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-notice info">
          <AlertTriangle size={24} />
          <div>
            <strong>IMPORTANT: This is a Software Licensing Agreement</strong>
            <p>You are licensing access to proprietary algorithmic trading software. TERRALABS is an IT consultancy providing technology tools—NOT investment advice or asset management services. All trading decisions are made by the algorithm based on your configured parameters.</p>
          </div>
        </div>

        {/* Subscription Details Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#10B981' }}>
            🎯 Engine Licensing Subscription
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
            Fixed monthly subscription with flexible cancellation. Keep 100% of all profits.
          </p>
        </div>

        {/* Pre-selected Tier Banner - Only shown when coming from pricing page */}
        {selectedPlan && selectedPlan.tier && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 92, 57, 0.2) 0%, rgba(255, 92, 57, 0.1) 100%)',
            border: '2px solid rgba(255, 92, 57, 0.4)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#FF5C39', fontWeight: 'bold' }}>
              ✓ {selectedPlan.tier} Tier Pre-Selected
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', margin: '0' }}>
              Your tier selection from the pricing page has been automatically applied. The capital amount has been pre-filled. You can adjust it if needed.
            </p>
          </div>
        )}

        {/* Capital Tier Selection */}
        {!selectedPlan && (
          <section className="legal-section" style={{ background: 'rgba(255, 92, 57, 0.05)', border: '2px solid rgba(255, 92, 57, 0.2)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Select Your Software License Tier</h2>
            <p style={{ marginBottom: '24px', color: 'rgba(255, 255, 255, 0.7)' }}>Choose your tier based on your trading capital. All tiers include Pythagoras Stardust™ Gold Trading Engine.</p>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#FF5C39' }}>
                MT5 Account Capital *
                <span style={{ marginLeft: '8px', fontSize: '0.7em', padding: '2px 8px', background: '#EF4444', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>REQUIRED</span>
              </label>
              <p style={{ fontSize: '0.85em', opacity: 0.7, marginBottom: '12px', lineHeight: 1.6 }}>
                Enter the trading capital in your MetaTrader 5 broker account. This determines your software license tier.
                <strong style={{ display: 'block', marginTop: '8px', color: '#FF5C39' }}>Your funds remain in YOUR MT5 broker account at all times.</strong>
              </p>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2em', color: '#FF5C39', fontWeight: 'bold' }}>$</div>
                <input
                  type="text"
                  value={capitalAmount}
                  onChange={handleCapitalChange}
                  placeholder="10,000"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 36px',
                    fontSize: '1.1em',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: capitalAmount && !isValidAmount ? '2px solid #EF4444' : capitalAmount && isValidAmount ? '2px solid #10B981' : '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>
              
              {capitalAmount && !isValidAmount && (
                <p style={{ fontSize: '0.85em', color: '#EF4444', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} />
                  Minimum capital requirement is $10,000
                </p>
              )}

              {capitalAmount && isValidAmount && currentTier && (
                <div style={{ marginTop: '16px', padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#10B981', marginBottom: '12px' }}>
                    ✓ {currentTier.tier} Tier Selected
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.85em', opacity: 0.7 }}>Capital Range:</div>
                      <div style={{ fontWeight: 'bold' }}>{currentTier.capital}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85em', opacity: 0.7 }}>Monthly Fee:</div>
                      <div style={{ fontWeight: 'bold', color: '#FF5C39' }}>${currentTier.monthlyFee}/month</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginBottom: '8px' }}>Includes:</div>
                    <div style={{ fontSize: '0.85em', lineHeight: '1.6' }}>{currentTier.features}</div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#10B981' }}>
                      💎 ${currentTier.monthlyFee}/month subscription
                    </div>
                    <div style={{ fontSize: '0.8em', opacity: '0.8', marginTop: '4px' }}>
                      Cancel anytime with 30 days notice
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tier Reference Table */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '12px', color: '#FF5C39' }}>All Available Tiers:</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255, 92, 57, 0.3)' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Tier</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Capital Range</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Monthly Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICING_TIERS.map((tier) => (
                      <tr key={tier.tier} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <td style={{ padding: '8px', fontWeight: 'bold', color: currentTier?.tier === tier.tier ? '#10B981' : 'inherit' }}>{tier.tier}</td>
                        <td style={{ padding: '8px' }}>{tier.capital}</td>
                        <td style={{ padding: '8px', textAlign: 'right', color: '#FF5C39' }}>${tier.monthlyFee}/mo*</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </section>
        )}

        {/* Plan Summary */}
        {currentPlan && currentTier && (
          <section className="legal-section plan-summary">
            <h2>Selected Software License</h2>
            <div className="plan-details-box">
              <div className="plan-detail-row">
                <span>License Tier:</span>
                <strong>{currentPlan.tier} TIER</strong>
              </div>
              <div className="plan-detail-row">
                <span>Trading Engine:</span>
                <strong>{currentPlan.engine}</strong>
              </div>
              <div className="plan-detail-row">
                <span>Capital Range:</span>
                <strong>{currentPlan.capital}</strong>
              </div>
              <div className="plan-detail-row">
                <span>Your Capital:</span>
                <strong style={{ color: '#10B981' }}>${capitalAmount}</strong>
              </div>
              <div className="plan-detail-row">
                <span>Monthly Subscription:</span>
                <strong style={{ color: '#FF5C39', fontSize: '1.2em' }}>${currentTier.monthlyFee}/month</strong>
              </div>

            </div>
          </section>
        )}

        {/* Agreement Sections */}
        <section className="legal-section">
          <h2>1. PARTIES TO THIS AGREEMENT</h2>
          <p><strong>Service Provider:</strong> TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO, a company duly incorporated under the laws of the United Arab Emirates, registered with Dubai International Free Zone Authority (DIEZA), License Number 75343.</p>
          <p><strong>Customer:</strong> The individual or legal entity identified below in the signature section.</p>
        </section>

        <section className="legal-section">
          <h2>2. NATURE OF SERVICES</h2>
          <p><strong>TERRALABS IS AN IT CONSULTANCY PROVIDING SOFTWARE TOOLS ONLY.</strong></p>
          <p>Customer acknowledges and agrees that:</p>
          <ul>
            <li>TERRALABS provides <strong>algorithmic trading software</strong> for licensing—NOT investment advice, asset management, or financial services;</li>
            <li>This is a <strong>Software-as-a-Service (SaaS)</strong> licensing agreement for technology access;</li>
            <li>TERRALABS does NOT provide financial advice, investment recommendations, or portfolio management;</li>
            <li>All trading decisions are executed by software algorithms based on pre-defined, pre-authorized parameters;</li>
            <li>Customer retains ultimate control and responsibility for all trading activities;</li>
            <li>TERRALABS never holds, custodies, controls, or has withdrawal rights over customer funds;</li>
            <li><strong>CRITICAL:</strong> Customer's funds remain in Customer's own MetaTrader 5 brokerage account at all times;</li>
            <li>TERRALABS accesses Customer's MT5 account solely via broker API for execution purposes only;</li>
            <li>Customer can revoke API access, pause execution, or terminate service at any time via broker dashboard or written notice.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. AUTONOMOUS EXECUTION AND API AUTHORIZATION</h2>
          
          <h3>3.1 Explicit Authorization for Autonomous Execution</h3>
          <p><strong>CUSTOMER HEREBY ACKNOWLEDGES AND EXPLICITLY AUTHORIZES:</strong></p>
          <ul>
            <li>The Software operates <strong>fully autonomously</strong> using algorithmic logic predetermined by TERRALABS;</li>
            <li>Trades will execute <strong>automatically</strong> without real-time manual intervention or Customer approval for individual trades;</li>
            <li>Customer <strong>voluntarily grants permission</strong> for the algorithm to execute trades via MetaTrader 5 API integration;</li>
            <li>Customer understands that execution occurs based on <strong>pre-defined, pre-authorized parameters</strong> configured during setup;</li>
            <li>Customer <strong>cannot dynamically intervene</strong> in individual trades once the algorithm is active;</li>
            <li>This authorization is <strong>given in advance</strong> and applies to all trades executed by the Software during active subscription period.</li>
          </ul>

          <h3>3.2 Customer's Right to Revoke, Pause, or Disconnect</h3>
          <p><strong>CUSTOMER RETAINS UNILATERAL RIGHT TO:</strong></p>
          <ul>
            <li><strong>Revoke API access</strong> at any time via MetaTrader 5 broker dashboard settings;</li>
            <li><strong>Pause algorithmic execution</strong> by disabling the Software connection in broker platform;</li>
            <li><strong>Terminate the software license</strong> with 30 days written notice to TERRALABS;</li>
            <li><strong>Manually override</strong> by disabling API access and trading manually at broker;</li>
            <li><strong>Withdraw funds</strong> directly from broker at any time—TERRALABS has zero control over withdrawals.</li>
          </ul>
          <p><strong>IMPORTANT:</strong> Customer's ability to revoke access at any time confirms that Customer retains final authority over the account. TERRALABS cannot prevent Customer from disconnecting, withdrawing funds, or terminating service.</p>

          <h3>3.3 API Access Scope and Limitations</h3>
          <p><strong>CUSTOMER UNDERSTANDS:</strong></p>
          <ul>
            <li>TERRALABS accesses Customer's MT5 account <strong>solely via broker-provided API</strong> for execution purposes;</li>
            <li>API permissions granted to TERRALABS are <strong>execution-only</strong>—we CANNOT withdraw, transfer, or move funds;</li>
            <li>TERRALABS has <strong>zero withdrawal rights</strong> and cannot access Customer's capital outside of trade execution;</li>
            <li>Customer maintains <strong>direct relationship</strong> with their broker—TERRALABS is not an intermediary;</li>
            <li>All deposits and withdrawals occur directly between Customer and broker—TERRALABS is never involved;</li>
            <li>Customer can view all trades, positions, and account activity in real-time via broker's MT5 platform.</li>
          </ul>

          <h3>3.4 No Discretionary Portfolio Management</h3>
          <p><strong>CRITICAL LEGAL DISTINCTION:</strong></p>
          <ul>
            <li><strong>Autonomous execution does NOT constitute discretionary portfolio management</strong> because:</li>
            <li>TERRALABS does NOT hold, custody, or control Customer's funds;</li>
            <li>TERRALABS has <strong>zero withdrawal rights</strong> and cannot move capital;</li>
            <li>Customer retains <strong>final authority</strong> over the account and can disconnect at any time;</li>
            <li>Execution occurs within <strong>pre-defined, pre-authorized parameters</strong> explicitly consented to by Customer;</li>
            <li>Customer <strong>voluntarily enables</strong> the system and can revoke access unilaterally;</li>
            <li>This is an <strong>execution-only algorithmic software service</strong>, not a discretionary investment management relationship;</li>
            <li>TERRALABS is providing <strong>IT services and software tools</strong>, not acting as an asset manager or financial advisor.</li>
          </ul>
          <p><strong>Regulatory Classification:</strong> This model is classified as execution-only algorithmic software licensing (IT service), NOT as asset management or discretionary investment advice, because the provider does not control customer funds, has no withdrawal rights, and customer retains final authority with ability to revoke access at any time.</p>
        </section>

        <section className="legal-section">
          <h2>4. SOFTWARE LICENSE GRANT</h2>
          <p>Subject to the terms of this Agreement, TERRALABS grants Customer a non-exclusive, non-transferable, revocable license to access and use:</p>
          <ul>
            <li>Pythagoras Stardust™ Gold Trading Engine algorithmic software;</li>
            <li>Real-time trading signal generation;</li>
            <li>Performance analytics and reporting dashboard;</li>
            <li>MT5 broker integration API;</li>
            <li>Technical support and software updates;</li>
            <li>Cloud infrastructure for algorithm execution.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. PRICING AND PAYMENT TERMS</h2>
          
          <h3>5.1 Subscription Pricing</h3>
          <p><strong>CUSTOMER AGREES TO:</strong></p>
          <ul>
            <li><strong>Monthly subscription fee</strong> for the {currentTier?.tier || ''} tier;</li>
            <li>Fixed monthly pricing with transparent billing;</li>
            <li>Full access to all tier features and support levels;</li>
            <li>Billing begins upon account activation and service commencement.</li>
          </ul>

          <h3>5.2 Payment Terms</h3>
          <p><strong>CAPITAL-BASED SOFTWARE LICENSING MODEL:</strong></p>
          <ul>
            <li><strong>Monthly License Fee:</strong> ${currentTier?.monthlyFee || 'As specified in selected tier'}/month</li>
            <li><strong>Billing Cycle:</strong> Monthly recurring subscription</li>
            <li><strong>Payment Due:</strong> First day of each billing month</li>
            <li><strong>Profit Retention:</strong> Customer keeps 100% of all trading profits—no performance fees ever</li>
            <li><strong>Fixed Fee Structure:</strong> License fee remains constant regardless of trading performance</li>
            <li>Fees are calculated based on computational resources, infrastructure scaling, and support levels required for each capital tier</li>
            <li>All fees exclusive of applicable taxes (VAT may apply)</li>
            <li>Payment methods: Credit/debit card, bank transfer, wire transfer, or approved payment processors</li>
            <li>Late payment may result in service suspension after 7-day grace period</li>
          </ul>

          <h3>5.3 Subscription & Cancellation</h3>
          <p><strong>CUSTOMER ACKNOWLEDGES:</strong></p>
          <ul>
            <li>Subscription is billed monthly;</li>
            <li>Customer may cancel at any time with 30 days written notice;</li>
            <li>No refunds for current billing period;</li>
            <li>Service continues until end of paid period after cancellation;</li>
            <li>Automatic renewal unless cancelled with proper notice.</li>
          </ul>

          <h3>5.4 Tier Changes</h3>
          <p>Customer may upgrade or downgrade tiers based on capital allocation:</p>
          <ul>
            <li>Tier changes take effect at the start of next billing cycle;</li>
            <li>Upgrades provide immediate access to higher tier features;</li>
            <li>Downgrades remove access to premium features at next billing cycle;</li>
            <li>Customer must notify TERRALABS of capital changes affecting tier eligibility.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. CUSTOMER OBLIGATIONS</h2>
          <p>Customer agrees to:</p>
          <ul>
            <li>Provide accurate and complete information during registration;</li>
            <li>Maintain confidentiality of login credentials and API keys;</li>
            <li>Comply with all applicable laws and regulations;</li>
            <li>Use the Software only for lawful purposes;</li>
            <li>Not share, resell, reverse engineer, or redistribute the Software;</li>
            <li>Maintain adequate risk management when trading;</li>
            <li>Monitor trading activity and account performance regularly;</li>
            <li>Promptly report any technical issues or unauthorized access;</li>
            <li>Pay all fees when due;</li>
            <li>Maintain minimum capital allocation for selected tier.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. BROKER REQUIREMENTS AND FUND CUSTODY</h2>
          
          <h3>7.1 Mandatory Approved Broker Requirement</h3>
          <p><strong>CUSTOMER ACKNOWLEDGES AND AGREES:</strong></p>
          <ul>
            <li><strong>MANDATORY REQUIREMENT:</strong> Customer MUST use ONLY brokers approved and recommended by TERRALABS from our Tier-1 Approved Broker List;</li>
            <li><strong>NO EXCEPTIONS:</strong> The Software will ONLY integrate with accounts at TERRALABS-approved brokers;</li>
            <li><strong>Risk Protection:</strong> This requirement protects both parties from broker-side manipulation, poor execution quality, withdrawal issues, and regulatory non-compliance;</li>
            <li><strong>Platform Integrity:</strong> Our algorithms are optimized and tested exclusively with approved tier-1 regulated brokers;</li>
            <li>Customer may NOT onboard accounts from unapproved brokers—service activation will be denied;</li>
            <li>TERRALABS reserves sole discretion to approve, recommend, or remove brokers from the approved list;</li>
            <li>Current approved brokers are subject to change based on regulatory compliance and performance standards.</li>
          </ul>

          <h3>7.2 Approved Broker Criteria and Selection</h3>
          <p><strong>TERRALABS APPROVED BROKER STANDARDS:</strong></p>
          <ul>
            <li><strong>Tier-1 Regulatory Oversight:</strong> All approved brokers must hold valid licenses from top-tier financial regulators including FCA (UK), ASIC (Australia), CySEC (Cyprus), DFSA (Dubai), CBUAE (UAE), FINMA (Switzerland), or equivalent authorities;</li>
            <li><strong>Financial Stability:</strong> Minimum 5 years of continuous operation with publicly disclosed financial statements and strong capitalization;</li>
            <li><strong>Client Fund Protection:</strong> Mandatory segregated client accounts and participation in investor compensation schemes where available;</li>
            <li><strong>MetaTrader 5 Infrastructure:</strong> Robust MT5 API support with proven uptime, execution quality, and technical reliability;</li>
            <li><strong>Regulatory Compliance History:</strong> Clean regulatory record with no major violations, sanctions, or enforcement actions;</li>
            <li><strong>Withdrawal Reliability:</strong> Demonstrated track record of honoring client withdrawal requests promptly and without disputes.</li>
          </ul>
          <p><strong>Current Approved Broker List:</strong> TERRALABS maintains a curated list of brokers meeting these standards. The current approved broker list will be provided to Customer during onboarding and is subject to periodic review and updates. Customer will be notified of any changes to approved broker availability.</p>

          <h3>7.3 Why We Require Approved Brokers</h3>
          <p><strong>FOR YOUR PROTECTION:</strong></p>
          <ul>
            <li><strong>Regulatory Compliance:</strong> All approved brokers maintain tier-1 regulatory licenses from FCA, ASIC, CySEC, DFSA, or equivalent authorities;</li>
            <li><strong>Segregated Accounts:</strong> Client funds held in segregated trust accounts, separate from broker operating capital;</li>
            <li><strong>Deposit Protection:</strong> Most approved brokers offer investor compensation schemes (up to £85,000 FCA, A$250,000 ASIC);</li>
            <li><strong>No Manipulation:</strong> Tier-1 brokers are subject to strict oversight preventing price manipulation, stop-loss hunting, and requotes;</li>
            <li><strong>Reliable Execution:</strong> Our algorithms require consistent execution speeds, spreads, and liquidity—only available at tier-1 brokers;</li>
            <li><strong>Withdrawal Security:</strong> Approved brokers have proven track records of honoring withdrawal requests without delays or disputes;</li>
            <li><strong>Platform Stability:</strong> MT5 API integration tested and verified only with approved broker infrastructure.</li>
          </ul>

          <h3>7.4 Broker Account Setup Assistance</h3>
          <p><strong>TERRALABS WILL:</strong></p>
          <ul>
            <li>Recommend the most suitable approved broker based on Customer's jurisdiction, capital size, and trading needs;</li>
            <li>Provide guidance on account opening process and documentation requirements;</li>
            <li>Assist with MT5 platform setup and API key generation (if needed);</li>
            <li>Verify broker account eligibility before activating Software service;</li>
            <li>Provide introductory broker (IB) links for preferred pricing where available (optional—not mandatory).</li>
          </ul>

          <h3>7.5 Fund Custody—Critical Understanding</h3>
          <p><strong>CUSTOMER ACKNOWLEDGES:</strong></p>
          <ul>
            <li><strong>TERRALABS NEVER HOLDS YOUR FUNDS:</strong> All trading capital remains in Customer's own MetaTrader 5 brokerage account at approved broker at all times;</li>
            <li>TERRALABS accesses Customer's MT5 account solely via broker API for trade execution—we NEVER have withdrawal rights;</li>
            <li>Customer maintains direct, independent relationship with their chosen approved broker;</li>
            <li>Customer can withdraw funds directly from broker anytime—TERRALABS has zero control over withdrawals;</li>
            <li>Customer can disable API access and trade manually anytime—full account control remains with Customer;</li>
            <li>TERRALABS is NOT responsible for broker actions, policies, solvency, or failures (though we only approve financially stable tier-1 brokers);</li>
            <li>Broker selection from approved list, account setup, and deposit/withdrawal are Customer's sole responsibility.</li>
          </ul>

          <h3>7.6 Unapproved Broker Policy</h3>
          <p><strong>IF CUSTOMER ATTEMPTS TO USE UNAPPROVED BROKER:</strong></p>
          <ul>
            <li>Service activation will be denied—no exceptions;</li>
            <li>Subscription cannot begin until Customer opens account at approved broker;</li>
            <li>No refunds for any fees paid if Customer insists on unapproved broker;</li>
            <li>TERRALABS reserves right to immediately suspend service if unapproved broker detected;</li>
            <li>This policy protects both parties from execution issues, regulatory risks, and potential fraud.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. INCORPORATED POLICIES</h2>
          <p>This Agreement incorporates by reference the following policies, all of which Customer agrees to be bound by:</p>
          
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ margin: 0, fontSize: '0.9em', color: '#EF4444', fontWeight: 'bold' }}>⚠️ ALL 3 POLICY AGREEMENTS ARE MANDATORY</p>
          </div>
          
          <div className="checkbox-group">
            <label className="legal-checkbox">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <span>
                <strong>Terms of Service</strong> - I have read and agree to the complete Terms of Service, including software license restrictions, intellectual property rights, payment terms, termination conditions, disclaimers, and limitations of liability.
              </span>
            </label>

            <label className="legal-checkbox">
              <input
                type="checkbox"
                checked={agreedToRisk}
                onChange={(e) => setAgreedToRisk(e.target.checked)}
                required
              />
              <span>
                <strong>Risk Disclosure Agreement</strong> - I acknowledge that trading involves substantial risk of loss. I understand that I may lose my entire investment. I have read the complete Risk Disclosure Agreement and accept all trading risks, including leverage risk, market risk, algorithmic trading risks, and broker-related risks.
              </span>
            </label>

            <label className="legal-checkbox">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                required
              />
              <span>
                <strong>Privacy Policy</strong> - I have read and consent to the Privacy Policy, including the collection, use, storage, and international transfer of my personal data as described therein. I understand my data protection rights.
              </span>
            </label>
          </div>
        </section>

        <section className="legal-section">
          <h2>9. CUSTOMER REPRESENTATIONS</h2>
          <p>Customer represents and warrants that:</p>
          <ul>
            <li>Customer is at least 18 years of age with legal capacity to enter binding contracts;</li>
            <li>All information provided is accurate, complete, and truthful;</li>
            <li>Customer is not subject to economic sanctions or trade restrictions;</li>
            <li>Customer understands this is SOFTWARE LICENSING, not investment advice or asset management;</li>
            <li>Customer understands trading risks and can afford potential losses;</li>
            <li>Customer is NOT relying on TERRALABS for financial advice;</li>
            <li>Customer acknowledges past performance does not guarantee future results;</li>
            <li>Customer has consulted independent financial advisors or waived this right;</li>
            <li>Customer will trade responsibly with appropriate risk management.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. DISCLAIMERS AND LIMITATIONS</h2>
          
          <h3>10.1 No Financial Advice or Asset Management</h3>
          <p><strong>TERRALABS DOES NOT PROVIDE FINANCIAL ADVICE OR ASSET MANAGEMENT SERVICES.</strong></p>
          <ul>
            <li>The Software is a <strong>technology tool</strong> for algorithmic trade execution only;</li>
            <li>Customer makes all investment decisions independently or through the algorithm's automated logic based on pre-authorized parameters;</li>
            <li><strong>CRITICAL:</strong> Autonomous execution does NOT constitute discretionary portfolio management because TERRALABS does not control customer funds, has zero withdrawal rights, and customer retains final authority with ability to revoke access at any time;</li>
            <li>TERRALABS is providing <strong>execution-only IT services</strong>, not investment management, financial planning, or advisory services;</li>
            <li>Customer is solely responsible for configuring risk parameters, capital allocation, and trading decisions.</li>
          </ul>

          <h3>10.2 No Guarantees</h3>
          <p>TERRALABS makes no guarantees regarding:</p>
          <ul>
            <li>Trading profitability or performance;</li>
            <li>Algorithm accuracy or success rate;</li>
            <li>Prevention of losses;</li>
            <li>Specific financial outcomes;</li>
            <li>Compatibility with all brokers;</li>
            <li>Uninterrupted service (though we target 99.5% uptime).</li>
          </ul>

          <h3>10.3 Limitation of Liability</h3>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
          <ul>
            <li>TERRALABS is liable only for direct damages up to amount of fees paid in prior 3 months;</li>
            <li>NO LIABILITY for indirect, consequential, or trading losses;</li>
            <li>NO LIABILITY for broker failures, market events, or force majeure;</li>
            <li>Software provided "AS IS" without warranties of merchantability or fitness for particular purpose.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. TERMINATION</h2>
          <p><strong>Customer may terminate:</strong></p>
          <ul>
            <li>At any time with 30 days' written notice;</li>
            <li>Subscription ends at conclusion of current billing period.</li>
          </ul>
          <p><strong>TERRALABS may terminate for:</strong></p>
          <ul>
            <li>Non-payment after 7-day grace period;</li>
            <li>Violation of terms of service;</li>
            <li>Fraudulent activity or misuse;</li>
            <li>Illegal use of software.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>12. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
          <ul>
            <li><strong>Governing Law:</strong> This Agreement shall be governed by the laws of the United Arab Emirates and the Dubai International Free Zone Authority (DIEZA);</li>
            <li><strong>Jurisdiction:</strong> Disputes shall be resolved in DIFC Courts or through binding arbitration;</li>
            <li><strong>Language:</strong> English is the official language of this Agreement;</li>
            <li><strong>Severability:</strong> If any provision is found unenforceable, remaining provisions remain in full effect.</li>
          </ul>
        </section>

        {/* Customer Information Form */}
        <section className="legal-section" style={{ background: 'rgba(255, 92, 57, 0.05)', border: '2px solid rgba(255, 92, 57, 0.2)', borderRadius: '12px' }}>
          <h2>Customer Information & Digital Signature</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FF5C39' }}>
                Full Legal Name *
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
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FF5C39' }}>
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FF5C39' }}>
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FF5C39' }}>
                Digital Signature *
              </label>
              <p style={{ fontSize: '0.9em', opacity: 0.7, marginBottom: '12px' }}>
                Draw your signature in the box below using your mouse or touch screen.
              </p>
              <div style={{ position: 'relative' }}>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{
                    width: '100%',
                    height: '200px',
                    border: '2px solid rgba(255, 92, 57, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    cursor: 'crosshair',
                    touchAction: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={clearSignature}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px 16px',
                    background: 'rgba(239, 68, 68, 0.8)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#FF5C39' }}>
                IP Address (Auto-detected)
              </label>
              <input
                type="text"
                value={ipAddress}
                readOnly
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{
              padding: '20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <p style={{ margin: 0, fontSize: '0.95em', lineHeight: '1.6' }}>
                <strong style={{ color: '#EF4444' }}>LEGAL ACKNOWLEDGMENT:</strong> By signing this agreement, I confirm that:
              </p>
              <ul style={{ marginTop: '12px', marginBottom: 0, fontSize: '0.9em', lineHeight: '1.8' }}>
                <li>I have read and understood this entire Software License Agreement</li>
                <li>I agree to all incorporated policies (Terms, Risk Disclosure, Privacy)</li>
                <li>I understand TERRALABS provides software tools only—NOT financial advice</li>
                <li>I acknowledge trading risks and potential for complete loss of capital</li>
                <li>My funds remain in my MT5 broker account—TERRALABS never holds my money</li>
                <li>I understand the monthly subscription model and cancellation policy</li>
                <li>This constitutes a legally binding digital contract</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={!agreedToTerms || !agreedToRisk || !agreedToPrivacy || !signature || !fullName || !email || !isValidAmount || isSubmitting}
              style={{
                width: '100%',
                padding: '16px',
                background: (!agreedToTerms || !agreedToRisk || !agreedToPrivacy || !signature || !fullName || !email || !isValidAmount) 
                  ? 'rgba(255, 92, 57, 0.3)' 
                  : 'linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: (!agreedToTerms || !agreedToRisk || !agreedToPrivacy || !signature || !fullName || !email || !isValidAmount) ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              {isSubmitting ? 'Submitting Agreement...' : 'Submit Agreement & Begin Subscription'}
            </button>
          </form>
        </section>

        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          fontSize: '0.85em',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <strong style={{ color: '#3B82F6' }}>Questions or Need Assistance?</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            Contact us at terralabsindustries@outlook.com or visit our support center. Our team is here to help you get started with your algorithmic trading journey.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            background: 'rgba(255, 92, 57, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 92, 57, 0.3)',
            borderRadius: '50%',
            color: '#FF5C39',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 92, 57, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 92, 57, 0.5)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 92, 57, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 92, 57, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}