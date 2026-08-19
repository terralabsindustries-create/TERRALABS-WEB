import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, AlertTriangle, Scale, FileText, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
          <Scale size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Terms of Service</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
          <p className="legal-jurisdiction">Governed by UAE Law - Dubai International Financial Zone Authority (DIEZA)</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-notice critical">
          <AlertTriangle size={24} />
          <div>
            <strong>IMPORTANT LEGAL NOTICE</strong>
            <p>These Terms of Service constitute a legally binding agreement. By accessing or using our software, you accept these terms in full. If you disagree with any part, you must not use our services.</p>
          </div>
        </div>

        <section className="legal-section">
          <h2>1. DEFINITIONS AND INTERPRETATION</h2>
          
          <h3>1.1 Definitions</h3>
          <p>In these Terms of Service, unless the context otherwise requires:</p>
          <ul>
            <li><strong>"Company," "We," "Us," "Our"</strong> means TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO, a company incorporated under the laws of the United Arab Emirates, Dubai International Free Zone Authority (DIEZA), with License Number [License Number].</li>
            <li><strong>"Customer," "You," "Your"</strong> means the individual or legal entity that has subscribed to use our Software.</li>
            <li><strong>"Software"</strong> means the Pythagoras Stardust™ trading engine and associated platforms, tools, and services provided by the Company.</li>
            <li><strong>"Trading Engine"</strong> means the algorithmic trading software including but not limited to Pythagoras Stardust™ (XAU/USD gold trading).</li>
            <li><strong>"Subscription"</strong> means the paid access to our Software under the selected pricing plan.</li>
            <li><strong>"Broker"</strong> means third-party financial institutions through which trading is executed (e.g., Exness, IC Markets, Pepperstone, FP Markets).</li>
            <li><strong>"MT5"</strong> means MetaTrader 5 trading platform operated by third-party brokers.</li>
            <li><strong>"UAE"</strong> means the United Arab Emirates.</li>

          </ul>

          <h3>1.2 Interpretation</h3>
          <p>Headings are for convenience only and do not affect interpretation. Words in the singular include the plural and vice versa. References to persons include individuals, corporations, and other legal entities.</p>
        </section>

        <section className="legal-section">
          <h2>2. AGREEMENT TO TERMS</h2>
          
          <h3>2.1 Acceptance</h3>
          <p>By creating an account, subscribing to any plan, downloading, installing, or using the Software, you acknowledge that:</p>
          <ul>
            <li>You have read, understood, and agree to be bound by these Terms of Service;</li>
            <li>You have read and agree to our Privacy Policy, Risk Disclosure Agreement, and all other legal documents;</li>
            <li>You are at least 18 years of age or the age of majority in your jurisdiction;</li>
            <li>You have the legal capacity to enter into a binding contract;</li>
            <li>You are not prohibited from receiving services under UAE laws or the laws of your jurisdiction.</li>
          </ul>

          <h3>2.2 Modifications</h3>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective upon posting on our website. Continued use of the Software after changes constitutes acceptance of modified terms. Material changes will be communicated via email with 30 days' notice.</p>
        </section>

        <section className="legal-section">
          <h2>3. SOFTWARE LICENSE AND RESTRICTIONS</h2>
          
          <h3>3.1 License Grant</h3>
          <p>Subject to your compliance with these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Software solely for your personal or internal business trading purposes.</p>

          <h3>3.2 License Restrictions</h3>
          <p>You shall NOT:</p>
          <ul>
            <li>Copy, modify, distribute, sell, or lease any part of the Software;</li>
            <li>Reverse engineer, decompile, or attempt to extract source code;</li>
            <li>Remove, alter, or obscure any proprietary notices;</li>
            <li>Use the Software for any illegal or unauthorized purpose;</li>
            <li>Share your login credentials or allow unauthorized access;</li>
            <li>Use the Software on behalf of third parties without written permission;</li>
            <li>Create derivative works or competing products based on our Software;</li>
            <li>Circumvent or disable any security features or usage limitations;</li>
            <li>Use the Software in any manner that could damage, disable, or impair our systems;</li>
            <li>Resell, sublicense, or redistribute the Software without explicit written authorization.</li>
          </ul>

          <h3>3.3 Intellectual Property</h3>
          <p>All rights, title, and interest in the Software, including all intellectual property rights, remain exclusively with TERRALABS. The Pythagoras Stardust™ trademark, logos, and branding are our exclusive property.</p>
        </section>

        <section className="legal-section">
          <h2>4. SUBSCRIPTION AND PAYMENT TERMS</h2>
          
          <h3>4.1 Subscription Plans</h3>
          <p>We offer multiple subscription tiers based on trading capital requirements. Each plan has specific features, capital thresholds, and pricing as outlined on our website.</p>

          <h3>4.2 Monthly Billing</h3>
          <p><strong>ALL SUBSCRIPTIONS ARE BILLED MONTHLY.</strong></p>
          <ul>
            <li>Subscriptions are billed monthly in advance;</li>
            <li>Cancellation allowed anytime with 30 days written notice;</li>
            <li>No refunds for current billing period once service begins;</li>
            <li>This policy applies to all pricing tiers without exception.</li>
          </ul>

          <h3>4.3 Payment Terms</h3>
          <ul>
            <li>All fees are due in advance of the subscription period;</li>
            <li>Payments are processed in USD unless otherwise specified;</li>
            <li>You authorize us to charge your payment method on file;</li>
            <li>Failure to pay may result in immediate suspension or termination of service;</li>
            <li>All fees are non-refundable except as expressly stated in our Refund Policy.</li>
          </ul>

          <h3>4.4 Price Changes</h3>
          <p>We reserve the right to modify pricing with 60 days' written notice. Price changes do not affect your current subscription period but will apply upon renewal.</p>

          <h3>4.5 Taxes</h3>
          <p>All fees are exclusive of applicable taxes, duties, or levies (including but not limited to VAT). You are responsible for all taxes associated with your subscription.</p>
        </section>

        <section className="legal-section">
          <h2>5. THIRD-PARTY BROKER INTEGRATION</h2>
          
          <h3>5.1 Broker Independence</h3>
          <p><strong>CRITICAL NOTICE:</strong> TERRALABS does NOT hold, custody, or control your funds. All trading capital is held directly with your chosen third-party broker (Exness, IC Markets, Pepperstone, FP Markets, etc.).</p>

          <h3>5.2 Broker Relationship</h3>
          <ul>
            <li>You maintain a separate, independent account with your broker;</li>
            <li>You are solely responsible for broker selection, account creation, and compliance with broker terms;</li>
            <li>We have no control over broker operations, policies, withdrawals, or fund security;</li>
            <li>Broker commissions, spreads, and fees are separate from our subscription fees;</li>
            <li>We are not liable for broker insolvency, service disruption, or fund loss.</li>
          </ul>

          <h3>5.3 MT5 Platform</h3>
          <p>Our Software operates via MetaTrader 5 (MT5), a third-party platform. We are not affiliated with MetaQuotes Software Corp. Issues with MT5 should be directed to your broker or MetaQuotes.</p>
        </section>

        <section className="legal-section">
          <h2>6. DISCLAIMERS AND LIMITATIONS</h2>
          
          <h3>6.1 Not Financial Advice</h3>
          <p><strong>THE SOFTWARE IS A TRADING TOOL ONLY. WE DO NOT PROVIDE INVESTMENT ADVICE, FINANCIAL PLANNING, OR RECOMMENDATIONS.</strong></p>
          <ul>
            <li>All trading decisions are made by you or the automated software you configure;</li>
            <li>We are not registered investment advisors, brokers, or financial planners;</li>
            <li>You should consult with independent financial advisors before trading;</li>
            <li>Past performance does not guarantee future results.</li>
          </ul>

          <h3>6.2 Trading Risks</h3>
          <p>TRADING INVOLVES SUBSTANTIAL RISK OF LOSS. You may lose your entire investment. See our Risk Disclosure Agreement for complete details.</p>

          <h3>6.3 Performance Disclaimer</h3>
          <ul>
            <li>Backtest results are simulated and do not represent actual trading;</li>
            <li>Live trading results may differ significantly from backtests;</li>
            <li>Market conditions, slippage, and execution can impact performance;</li>
            <li>We do not guarantee profits or specific performance outcomes.</li>
          </ul>

          <h3>6.4 Software "AS IS"</h3>
          <p>THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
          <ul>
            <li>Merchantability;</li>
            <li>Fitness for a particular purpose;</li>
            <li>Non-infringement;</li>
            <li>Uninterrupted or error-free operation;</li>
            <li>Accuracy, reliability, or availability.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. LIMITATION OF LIABILITY</h2>
          
          <h3>7.1 Maximum Liability</h3>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY UAE LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SOFTWARE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 3 MONTHS PRECEDING THE CLAIM.</p>

          <h3>7.2 Excluded Damages</h3>
          <p>WE SHALL NOT BE LIABLE FOR:</p>
          <ul>
            <li>Trading losses or investment losses of any kind;</li>
            <li>Lost profits, revenue, or business opportunities;</li>
            <li>Indirect, incidental, consequential, or punitive damages;</li>
            <li>Data loss or corruption;</li>
            <li>Third-party actions (including broker failures);</li>
            <li>Force majeure events beyond our control.</li>
          </ul>

          <h3>7.3 Indemnification</h3>
          <p>You agree to indemnify and hold harmless TERRALABS, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:</p>
          <ul>
            <li>Your use or misuse of the Software;</li>
            <li>Your violation of these Terms;</li>
            <li>Your violation of any laws or third-party rights;</li>
            <li>Your trading activities and losses.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. TERMINATION</h2>
          
          <h3>8.1 Termination by You</h3>
          <p>You may cancel your subscription at any time by providing 30 days' written notice. No refunds will be issued for the current billing period.</p>

          <h3>8.2 Termination by Us</h3>
          <p>We may suspend or terminate your access immediately if:</p>
          <ul>
            <li>You breach these Terms;</li>
            <li>You engage in fraudulent or illegal activity;</li>
            <li>Your payment fails or is disputed;</li>
            <li>We discontinue the Software (with 60 days' notice);</li>
            <li>Required by law or regulatory authorities.</li>
          </ul>

          <h3>8.3 Effect of Termination</h3>
          <p>Upon termination:</p>
          <ul>
            <li>Your license to use the Software terminates immediately;</li>
            <li>You must cease all use and delete all copies;</li>
            <li>No refunds are provided except as required by law;</li>
            <li>Sections surviving termination: Intellectual Property, Disclaimers, Limitation of Liability, Governing Law.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. DATA PROTECTION AND PRIVACY</h2>
          <p>Your use of the Software is subject to our Privacy Policy. By using the Software, you consent to our collection, use, and processing of your data as described in the Privacy Policy and in compliance with UAE data protection regulations.</p>
        </section>

        <section className="legal-section">
          <h2>10. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
          
          <h3>10.1 Governing Law</h3>
          <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates and the regulations of the Dubai International Free Zone Authority (DIEZA), without regard to conflict of law principles.</p>

          <h3>10.2 Jurisdiction</h3>
          <p>For customers located in the UAE or those transacting within UAE jurisdiction:</p>
          <ul>
            <li>The courts of Dubai, UAE shall have exclusive jurisdiction;</li>
            <li>DIEZA courts shall have primary jurisdiction for commercial disputes.</li>
          </ul>

          <h3>10.3 International Customers</h3>
          <p>For customers outside the UAE:</p>
          <ul>
            <li>You agree to UAE jurisdiction for disputes arising from this agreement;</li>
            <li>You waive any objection to venue or jurisdiction in UAE courts;</li>
            <li>Judgments from UAE courts are enforceable in your jurisdiction to the extent permitted by law.</li>
          </ul>

          <h3>10.4 Arbitration</h3>
          <p>Prior to litigation, parties agree to attempt resolution through the Dubai International Arbitration Centre (DIAC) under UAE arbitration rules. Arbitration shall be conducted in English in Dubai, UAE.</p>

          <h3>10.5 Class Action Waiver</h3>
          <p>YOU AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY. YOU WAIVE ANY RIGHT TO PARTICIPATE IN CLASS-ACTION LAWSUITS OR CLASS-WIDE ARBITRATION.</p>
        </section>

        <section className="legal-section">
          <h2>11. COMPLIANCE AND REGULATORY</h2>
          
          <h3>11.1 UAE Compliance</h3>
          <p>Our operations comply with UAE regulations including:</p>
          <ul>
            <li>Dubai International Free Zone Authority (DIEZA) regulations;</li>
            <li>UAE Commercial Companies Law (Federal Law No. 2 of 2015);</li>
            <li>UAE Data Protection Regulations;</li>
            <li>UAE Anti-Money Laundering and Counter-Terrorism Financing laws.</li>
          </ul>

          <h3>11.2 Customer Compliance</h3>
          <p>You represent and warrant that:</p>
          <ul>
            <li>Your use of the Software complies with all applicable laws;</li>
            <li>You are not subject to economic sanctions or trade restrictions;</li>
            <li>You will not use the Software for money laundering or terrorist financing;</li>
            <li>You will comply with tax reporting requirements in your jurisdiction.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>12. GENERAL PROVISIONS</h2>
          
          <h3>12.1 Entire Agreement</h3>
          <p>These Terms, together with our Privacy Policy, Risk Disclosure, and other referenced policies, constitute the entire agreement between you and TERRALABS.</p>

          <h3>12.2 Severability</h3>
          <p>If any provision is found unenforceable, the remaining provisions remain in full effect.</p>

          <h3>12.3 Waiver</h3>
          <p>Our failure to enforce any right or provision does not constitute a waiver of that right.</p>

          <h3>12.4 Assignment</h3>
          <p>You may not assign or transfer these Terms without our written consent. We may assign our rights without restriction.</p>

          <h3>12.5 Force Majeure</h3>
          <p>We are not liable for delays or failures due to circumstances beyond our reasonable control (including but not limited to natural disasters, war, terrorism, government actions, internet failures, or market disruptions).</p>

          <h3>12.6 Language</h3>
          <p>These Terms are executed in English. Any translations are for convenience only. In case of conflict, the English version prevails.</p>

          <h3>12.7 Notices</h3>
          <p>All legal notices must be sent to:</p>
          <div className="contact-box">
            <p><strong>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</strong></p>
            <p>Dubai International Free Zone Authority (DIEZA)</p>
            <p>Dubai, United Arab Emirates</p>
            <p>Email: legal@terralabs.ae</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>13. ACKNOWLEDGMENT</h2>
          <p>BY USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE, YOU MUST NOT ACCESS OR USE THE SOFTWARE.</p>
        </section>

        <div className="legal-footer-signature">
          <p><strong>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</strong></p>
          <p>Effective Date: December 28, 2025</p>
          <p>Document Version: 1.0</p>
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