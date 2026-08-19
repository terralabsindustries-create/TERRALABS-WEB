import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, DollarSign, AlertCircle, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface RefundPolicyProps {
  onBack: () => void;
}

export function RefundPolicy({ onBack }: RefundPolicyProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add swipe-back gesture for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      // Detect swipe from left edge (within first 50px)
      if (touchStartX.current < 50) {
        const swipeDistance = touchEndX.current - touchStartX.current;
        // If swiped right more than 100px, go back
        if (swipeDistance > 100) {
          onBack();
        }
      }
    };
    
    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onBack]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="legal-document-page">
      <div className="legal-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="legal-header-content">
          <DollarSign size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Refund & Cancellation Policy</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-notice warning">
          <AlertCircle size={24} />
          <div>
            <strong>IMPORTANT NOTICE</strong>
            <p>All subscriptions are billed monthly. Refunds are generally not available except as outlined below.</p>
          </div>
        </div>

        <section className="legal-section">
          <h2>1. SUBSCRIPTION TERMS</h2>
          
          <h3>1.1 Immediate Billing</h3>
          <p><strong>ALL SUBSCRIPTIONS BEGIN BILLING IMMEDIATELY:</strong></p>
          <ul>
            <li>Billing starts upon agreement acceptance and account activation;</li>
            <li>Monthly subscription fee charged on first day of service;</li>
            <li>No refunds once service begins;</li>
            <li>Payment required before service activation.</li>
          </ul>

          <h3>1.2 Cancellation Policy</h3>
          <p>You may cancel your subscription at any time:</p>
          <ul>
            <li>30 days written notice required;</li>
            <li>Service continues until end of current billing period;</li>
            <li>No refunds for unused time in current billing period;</li>
            <li>Email support@terralabsindustries.com to cancel.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. REFUND POLICY</h2>
          
          <h3>2.1 No Refund Policy</h3>
          <p><strong>ALL SUBSCRIPTION FEES ARE NON-REFUNDABLE once service begins.</strong></p>
          <ul>
            <li>Monthly subscriptions begin immediately upon account activation;</li>
            <li>No refunds, credits, or prorated amounts once billing period starts;</li>
            <li>This policy applies regardless of usage, trading performance, or personal circumstances;</li>
            <li>Cancellation with 30 days notice prevents future billing but does not refund current period.</li>
          </ul>

          <h3>2.2 Why Non-Refundable?</h3>
          <p>Our refund policy exists because:</p>
          <ul>
            <li>Immediate access to proprietary trading algorithms and infrastructure;</li>
            <li>Significant resources invested in ongoing support and maintenance;</li>
            <li>Server infrastructure and computational resources allocated to your account;</li>
            <li>Monthly licensing fees reflect ongoing operational costs;</li>
            <li>Service delivery begins immediately upon activation.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. EXCEPTIONS - WHEN REFUNDS MAY BE GRANTED</h2>
          
          <h3>3.1 Technical Failure</h3>
          <p>Refunds may be granted if:</p>
          <ul>
            <li>The Software is completely unavailable for 7+ consecutive days due to our technical failure;</li>
            <li>Critical functionality is broken and not resolved within 14 days of reporting;</li>
            <li>We fail to provide the core services promised.</li>
          </ul>
          <p><strong>Process:</strong> Contact support@terralabs.ae with documentation of the issue. We will investigate and respond within 7 business days.</p>

          <h3>3.2 Unauthorized Charges</h3>
          <p>If you are charged without authorization (e.g., billing error, unauthorized account access):</p>
          <ul>
            <li>Report immediately to billing@terralabs.ae;</li>
            <li>Provide evidence of unauthorized charge;</li>
            <li>We will investigate and issue refunds for verified unauthorized charges within 14 days.</li>
          </ul>

          <h3>3.3 Non-Delivery of Service</h3>
          <p>If you paid for a subscription but never received access:</p>
          <ul>
            <li>Contact support@terralabs.ae immediately;</li>
            <li>We will provide access within 48 hours or issue a full refund.</li>
          </ul>

          <h3>3.4 Legal Requirements</h3>
          <p>Refunds mandated by UAE consumer protection laws or court orders will be honored.</p>
        </section>

        <section className="legal-section">
          <h2>4. NO REFUNDS FOR TRADING LOSSES</h2>
          <p><strong>WE DO NOT REFUND SUBSCRIPTION FEES DUE TO TRADING LOSSES OR POOR PERFORMANCE.</strong></p>
          <ul>
            <li>Trading involves substantial risk of loss;</li>
            <li>We do not guarantee profits or specific performance outcomes;</li>
            <li>Past performance (backtests or live results) does not guarantee future results;</li>
            <li>Market conditions, broker execution, and user settings affect performance;</li>
            <li>You accept all trading risks when subscribing (see Risk Disclosure Agreement);</li>
            <li>Subscription fees are for software access, not trading outcomes.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. CANCELLATION POLICY</h2>
          
          <h3>5.1 Cancellation Anytime</h3>
          <p>You may cancel your subscription at any time:</p>
          <ul>
            <li>Provide 30 days' written notice to support@terralabs.ae;</li>
            <li>Cancellation takes effect at the end of the current billing cycle;</li>
            <li>No refunds for the current billing period (already paid in advance);</li>
            <li>Access continues until the end of the paid period;</li>
            <li>No further charges will be made after cancellation.</li>
          </ul>

          <h3>5.2 How to Cancel</h3>
          <ol>
            <li>Email cancellation request to: support@terralabs.ae;</li>
            <li>Include: Full name, email address, subscription ID, reason for cancellation;</li>
            <li>Receive confirmation email within 48 hours;</li>
            <li>Access continues until end of current paid period;</li>
            <li>Download any reports or data you wish to retain before access ends.</li>
          </ol>
        </section>

        <section className="legal-section">
          <h2>6. SUBSCRIPTION PAUSES</h2>
          
          <h3>6.1 No Pause Option</h3>
          <p>Subscriptions cannot be paused or put on hold:</p>
          <ul>
            <li>Billing continues regardless of usage;</li>
            <li>You remain responsible for payments even if you don't actively trade;</li>
            <li>Subscription continues until cancellation with proper notice.</li>
          </ul>

          <h3>6.2 Extended Absence</h3>
          <p>If you need to be absent for an extended period:</p>
          <ul>
            <li>You may disable automated trading to prevent active trades;</li>
            <li>Subscription fees continue to accrue;</li>
            <li>Consider cancelling if you don't plan to return.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. DOWNGRADE OR PLAN CHANGES</h2>
          
          <h3>7.1 Upgrading Plans</h3>
          <ul>
            <li>You may upgrade to a higher-tier plan at any time;</li>
            <li>Prorated credit applied for unused portion of current plan;</li>
            <li>New plan pricing takes effect immediately.</li>
          </ul>

          <h3>7.2 Downgrading Plans</h3>
          <ul>
            <li>Downgrades take effect at the end of the current billing cycle;</li>
            <li>No refunds for price difference in current cycle;</li>
            <li>New lower price applies to next billing cycle.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. REFUND PROCESSING</h2>
          
          <h3>8.1 Timeline</h3>
          <p>If a refund is approved:</p>
          <ul>
            <li>Refund processed within 14 business days of approval;</li>
            <li>Refund issued to original payment method;</li>
            <li>Bank processing may take additional 5-10 business days;</li>
            <li>You will receive email confirmation when refund is processed.</li>
          </ul>

          <h3>8.2 Partial Refunds</h3>
          <p>In rare cases, partial refunds may be granted:</p>
          <ul>
            <li>Prorated refunds for significant service disruptions;</li>
            <li>Credit towards future subscriptions (at our discretion);</li>
            <li>Goodwill gestures for exceptional circumstances.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. CHARGEBACK POLICY</h2>
          
          <h3>9.1 Chargebacks</h3>
          <p><strong>IMPORTANT:</strong> Initiating a chargeback instead of contacting us directly may result in:</p>
          <ul>
            <li>Immediate account termination;</li>
            <li>Permanent ban from using TERRALABS services;</li>
            <li>Legal action to recover fees and damages;</li>
            <li>Reporting to fraud prevention databases.</li>
          </ul>

          <h3>9.2 Dispute Resolution</h3>
          <p>Before initiating a chargeback:</p>
          <ol>
            <li>Contact support@terralabs.ae to resolve the issue;</li>
            <li>Provide details of your concern;</li>
            <li>Allow us 7 business days to investigate and respond;</li>
            <li>Most issues can be resolved through communication.</li>
          </ol>

          <h3>9.3 Fraudulent Chargebacks</h3>
          <p>If you initiate a chargeback after receiving services:</p>
          <ul>
            <li>We will contest the chargeback with evidence of service delivery;</li>
            <li>You may be liable for chargeback fees and legal costs;</li>
            <li>Your account will be permanently terminated.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. TERMINATION BY TERRALABS</h2>
          
          <h3>10.1 No Refund Upon Termination</h3>
          <p>If we terminate your account for breach of Terms of Service:</p>
          <ul>
            <li>No refunds will be issued;</li>
            <li>You forfeit all remaining subscription time;</li>
            <li>Access terminates immediately;</li>
            <li>You remain liable for any outstanding fees.</li>
          </ul>

          <h3>10.2 Service Discontinuation</h3>
          <p>If TERRALABS discontinues the Software:</p>
          <ul>
            <li>60 days' advance notice will be provided;</li>
            <li>Prorated refunds for unused portion of subscription;</li>
            <li>Opportunity to export data before shutdown.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. TAXES AND FEES</h2>
          <ul>
            <li>Refunds are issued for the amount paid, excluding any taxes;</li>
            <li>Payment processing fees are non-refundable;</li>
            <li>Currency conversion fees are non-refundable;</li>
            <li>You are responsible for any tax implications of refunds in your jurisdiction.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>12. SUBSCRIPTION FLEXIBILITY</h2>
          <p><strong>All subscriptions operate on a monthly billing cycle with flexible cancellation.</strong></p>
          <ul>
            <li>Billing begins immediately upon account activation;</li>
            <li>Monthly subscription fee charged at start of each billing period;</li>
            <li>Cancel anytime with 30 days written notice;</li>
            <li>No refunds for current billing period;</li>
            <li>Service continues until end of paid period after cancellation;</li>
            <li>Subscription renews automatically unless cancelled.</li>
          </ul>
          <p><strong>Flexible Cancellation:</strong> We believe in providing flexible subscription options. You can cancel at any time by providing 30 days written notice, though we recommend giving the software sufficient time to demonstrate performance across various market conditions.</p>
        </section>

        <section className="legal-section">
          <h2>13. UAE CONSUMER PROTECTION RIGHTS</h2>
          <p>Under UAE Federal Law No. 15 of 2020 (Consumer Protection Law), you have certain rights:</p>
          <ul>
            <li>Right to clear information about products and services;</li>
            <li>Right to safe and quality services;</li>
            <li>Right to fair contract terms;</li>
            <li>Right to lodge complaints with consumer protection authorities.</li>
          </ul>
          <p>This Refund Policy complies with UAE consumer protection standards while protecting our legitimate business interests.</p>
        </section>

        <section className="legal-section">
          <h2>14. CONTACT FOR REFUND REQUESTS</h2>
          <div className="contact-box">
            <p><strong>Billing & Refund Inquiries:</strong></p>
            <p>Email: billing@terralabs.ae</p>
            <p>Support: support@terralabs.ae</p>
            <p><strong>Mailing Address:</strong></p>
            <p>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
            <p>Dubai International Free Zone Authority (DIEZA)</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>15. CHANGES TO THIS POLICY</h2>
          <p>We reserve the right to modify this Refund & Cancellation Policy at any time. Changes will:</p>
          <ul>
            <li>Be posted on this page with updated "Last Updated" date;</li>
            <li>Not affect existing subscriptions (apply only to new subscriptions);</li>
            <li>Be communicated via email for material changes.</li>
          </ul>
        </section>

        <div className="legal-footer-signature">
          <p><strong>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</strong></p>
          <p>Effective Date: December 28, 2025</p>
        </div>
      </div>
      {showBackToTop && (
        <button className={`back-to-top-button ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}