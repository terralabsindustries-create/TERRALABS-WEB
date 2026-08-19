import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
          <Shield size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Privacy Policy</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
          <p className="legal-jurisdiction">UAE Data Protection Regulation Compliant | GDPR-Aligned for International Users</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-notice info">
          <Eye size={24} />
          <div>
            <strong>YOUR PRIVACY MATTERS</strong>
            <p>This Privacy Policy explains how we collect, use, store, and protect your personal information. We are committed to transparency and your data protection rights.</p>
          </div>
        </div>

        <section className="legal-section">
          <h2>1. INTRODUCTION</h2>
          
          <h3>1.1 Controller Information</h3>
          <p><strong>Data Controller:</strong> TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p><strong>Registered Address:</strong> Dubai International Free Zone Authority (DIEZA), Dubai, United Arab Emirates</p>
          <p><strong>Contact:</strong> privacy@terralabs.ae</p>
          <p><strong>Data Protection Officer:</strong> dpo@terralabs.ae</p>

          <h3>1.2 Scope</h3>
          <p>This Privacy Policy applies to all users of our Software (Pythagoras Stardust™) and website visitors, regardless of location. We comply with:</p>
          <ul>
            <li>UAE Data Protection Regulations;</li>
            <li>Dubai International Free Zone Authority (DIEZA) data protection standards;</li>
            <li>General Data Protection Regulation (GDPR) for EU residents;</li>
            <li>Other applicable international data protection laws.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. INFORMATION WE COLLECT</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>When you register, subscribe, or use our services, we collect:</p>
          <ul>
            <li><strong>Identity Data:</strong> Full name, date of birth, nationality, government-issued ID (for KYC/AML compliance);</li>
            <li><strong>Contact Data:</strong> Email address, phone number, mailing address;</li>
            <li><strong>Financial Data:</strong> Payment card details (processed via third-party payment processors), billing address, transaction history;</li>
            <li><strong>Account Data:</strong> Username, password (encrypted), security questions, subscription plan details;</li>
            <li><strong>Trading Data:</strong> MT5 account numbers, broker information, trading capital amount, trading performance metrics.</li>
          </ul>

          <h3>2.2 Technical Data</h3>
          <ul>
            <li><strong>Device Information:</strong> IP address, device type, operating system, browser type;</li>
            <li><strong>Usage Data:</strong> Login times, features accessed, pages viewed, session duration;</li>
            <li><strong>Cookies and Tracking:</strong> See our Cookie Policy for details;</li>
            <li><strong>Software Logs:</strong> Error logs, performance data, API calls.</li>
          </ul>

          <h3>2.3 Communications</h3>
          <ul>
            <li>Email correspondence;</li>
            <li>Support tickets and chat logs;</li>
            <li>WhatsApp messages (for demo scheduling);</li>
            <li>Survey responses and feedback.</li>
          </ul>

          <h3>2.4 Third-Party Information</h3>
          <p>We may receive information from:</p>
          <ul>
            <li>Brokers (trading account verification);</li>
            <li>Payment processors (transaction confirmation);</li>
            <li>Identity verification services (KYC/AML compliance);</li>
            <li>Marketing platforms (campaign analytics).</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. HOW WE USE YOUR INFORMATION</h2>
          
          <h3>3.1 Legal Bases (GDPR)</h3>
          <p>We process your data based on:</p>
          <ul>
            <li><strong>Contract Performance:</strong> To provide the Software and services you subscribed to;</li>
            <li><strong>Legal Obligation:</strong> To comply with UAE laws, tax requirements, KYC/AML regulations;</li>
            <li><strong>Legitimate Interest:</strong> To improve our services, prevent fraud, ensure security;</li>
            <li><strong>Consent:</strong> For marketing communications (you may withdraw anytime).</li>
          </ul>

          <h3>3.2 Purposes of Processing</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Create and manage your account;</li>
            <li>Process subscription payments and billing;</li>
            <li>Provide access to Pythagoras Stardust™ trading engine;</li>
            <li>Connect your MT5 broker accounts;</li>
            <li>Monitor trading performance and generate reports;</li>
            <li>Provide customer support and respond to inquiries;</li>
            <li>Send service updates, security alerts, and administrative messages;</li>
            <li>Comply with KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements;</li>
            <li>Detect and prevent fraud, security breaches, and illegal activity;</li>
            <li>Improve Software functionality and user experience;</li>
            <li>Conduct research, analytics, and performance testing;</li>
            <li>Send marketing communications (with your consent);</li>
            <li>Enforce our Terms of Service and legal agreements;</li>
            <li>Comply with legal obligations and regulatory requests.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. DATA SHARING AND DISCLOSURE</h2>
          
          <h3>4.1 We Do Not Sell Your Data</h3>
          <p><strong>We do NOT sell, rent, or trade your personal information to third parties for their marketing purposes.</strong></p>

          <h3>4.2 Service Providers</h3>
          <p>We share data with trusted third-party service providers who assist us:</p>
          <ul>
            <li><strong>Payment Processors:</strong> To process subscription payments (Stripe, PayPal, etc.);</li>
            <li><strong>Cloud Hosting:</strong> To store data and host our infrastructure (AWS, Google Cloud, etc.);</li>
            <li><strong>Email Services:</strong> To send transactional and marketing emails;</li>
            <li><strong>Analytics Providers:</strong> To analyze usage and improve our services (Google Analytics, Mixpanel, etc.);</li>
            <li><strong>Customer Support Tools:</strong> To manage support tickets (Zendesk, Intercom, etc.);</li>
            <li><strong>Identity Verification:</strong> To comply with KYC/AML requirements.</li>
          </ul>
          <p>All service providers are contractually obligated to protect your data and use it only for specified purposes.</p>

          <h3>4.3 Brokers</h3>
          <p>We share minimal information (account numbers, API keys) with your chosen verified tier 1 brokers to enable MT5 integration. <strong>We do NOT have access to your broker funds or withdrawal capabilities.</strong></p>

          <h3>4.4 Legal Requirements</h3>
          <p>We may disclose your information if required by law or in good faith belief that disclosure is necessary to:</p>
          <ul>
            <li>Comply with legal obligations, court orders, or government requests;</li>
            <li>Enforce our Terms of Service;</li>
            <li>Protect our rights, property, or safety;</li>
            <li>Prevent fraud or illegal activity;</li>
            <li>Respond to UAE regulatory authorities or DIEZA requirements.</li>
          </ul>

          <h3>4.5 Business Transfers</h3>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change.</p>
        </section>

        <section className="legal-section">
          <h2>5. INTERNATIONAL DATA TRANSFERS</h2>
          
          <h3>5.1 Data Storage Locations</h3>
          <p>Your data may be stored and processed in the UAE and other countries where our service providers operate (including the EU, USA, and Singapore).</p>

          <h3>5.2 Safeguards</h3>
          <p>For transfers outside the UAE, we ensure adequate protection through:</p>
          <ul>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission;</li>
            <li>Adequacy decisions recognizing equivalent data protection;</li>
            <li>Data Processing Agreements with all service providers;</li>
            <li>Encryption and security measures during transit and at rest.</li>
          </ul>

          <h3>5.3 UAE to EU/EEA Transfers</h3>
          <p>For EU residents, we comply with GDPR requirements for international transfers and provide appropriate safeguards.</p>
        </section>

        <section className="legal-section">
          <h2>6. DATA RETENTION</h2>
          
          <h3>6.1 Retention Periods</h3>
          <ul>
            <li><strong>Active Accounts:</strong> Data retained for the duration of your subscription plus 7 years (UAE commercial records requirement);</li>
            <li><strong>Closed Accounts:</strong> Most data deleted within 90 days, except records required for legal/regulatory compliance;</li>
            <li><strong>Financial Records:</strong> Retained for 10 years (UAE tax and AML requirements);</li>
            <li><strong>Marketing Data:</strong> Retained until you withdraw consent or 3 years of inactivity;</li>
            <li><strong>Legal Claims:</strong> Data retained as necessary to defend against legal claims.</li>
          </ul>

          <h3>6.2 Secure Deletion</h3>
          <p>When data is no longer required, we securely delete or anonymize it using industry-standard methods.</p>
        </section>

        <section className="legal-section">
          <h2>7. DATA SECURITY</h2>
          
          <h3>7.1 Security Measures</h3>
          <p>We implement industry-leading security measures including:</p>
          <ul>
            <li><strong>Encryption:</strong> TLS/SSL encryption for data in transit; AES-256 encryption for data at rest;</li>
            <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication, principle of least privilege;</li>
            <li><strong>Infrastructure Security:</strong> Firewalls, intrusion detection, DDoS protection;</li>
            <li><strong>Regular Audits:</strong> Security audits, penetration testing, vulnerability assessments;</li>
            <li><strong>Employee Training:</strong> Mandatory data protection training for all staff;</li>
            <li><strong>Incident Response:</strong> 24/7 monitoring and incident response plan.</li>
          </ul>

          <h3>7.2 Your Responsibility</h3>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your password;</li>
            <li>Using strong, unique passwords;</li>
            <li>Enabling two-factor authentication;</li>
            <li>Notifying us immediately of any unauthorized access.</li>
          </ul>

          <h3>7.3 Data Breach Notification</h3>
          <p>In the unlikely event of a data breach affecting your personal information, we will notify you within 72 hours (GDPR requirement) and inform relevant authorities as required by UAE law.</p>
        </section>

        <section className="legal-section">
          <h2>8. YOUR RIGHTS</h2>
          
          <h3>8.1 Access and Portability</h3>
          <ul>
            <li><strong>Right to Access:</strong> Request a copy of your personal data;</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
          </ul>

          <h3>8.2 Correction and Deletion</h3>
          <ul>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data;</li>
            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data (subject to legal retention requirements).</li>
          </ul>

          <h3>8.3 Processing Restrictions</h3>
          <ul>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your data in certain circumstances;</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for marketing purposes.</li>
          </ul>

          <h3>8.4 Automated Decision-Making</h3>
          <p>Our Software uses automated trading algorithms. You have the right to request human review of automated decisions that significantly affect you.</p>

          <h3>8.5 Withdraw Consent</h3>
          <p>For processing based on consent (e.g., marketing), you may withdraw consent at any time without affecting the lawfulness of prior processing.</p>

          <h3>8.6 Complaints</h3>
          <p>You have the right to lodge a complaint with:</p>
          <ul>
            <li><strong>UAE:</strong> Dubai International Free Zone Authority (DIEZA) or relevant UAE data protection authority;</li>
            <li><strong>EU Residents:</strong> Your local data protection supervisory authority.</li>
          </ul>

          <h3>8.7 Exercising Your Rights</h3>
          <p>To exercise any of these rights, contact us at: <strong>privacy@terralabs.ae</strong></p>
          <p>We will respond within 30 days (GDPR requirement). We may require identity verification to process your request.</p>
        </section>

        <section className="legal-section">
          <h2>9. COOKIES AND TRACKING TECHNOLOGIES</h2>
          <p>We use cookies and similar technologies to enhance your experience. See our <strong>Cookie Policy</strong> for detailed information about:</p>
          <ul>
            <li>Types of cookies we use;</li>
            <li>How to control or disable cookies;</li>
            <li>Third-party cookies and analytics.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. CHILDREN'S PRIVACY</h2>
          <p>Our Software is NOT intended for individuals under 18 years of age. We do not knowingly collect data from children. If we discover we have collected information from a child, we will delete it immediately. If you believe a child has provided us with personal data, contact us at privacy@terralabs.ae.</p>
        </section>

        <section className="legal-section">
          <h2>11. MARKETING COMMUNICATIONS</h2>
          
          <h3>11.1 Consent</h3>
          <p>We will only send marketing communications if you have opted in or where permitted by law.</p>

          <h3>11.2 Unsubscribe</h3>
          <p>You can unsubscribe from marketing emails at any time by:</p>
          <ul>
            <li>Clicking "Unsubscribe" in any marketing email;</li>
            <li>Updating your preferences in your account settings;</li>
            <li>Contacting us at privacy@terralabs.ae.</li>
          </ul>
          <p>Note: You cannot unsubscribe from essential service communications (e.g., security alerts, billing notifications).</p>
        </section>

        <section className="legal-section">
          <h2>12. THIRD-PARTY LINKS</h2>
          <p>Our website may contain links to third-party websites (e.g., broker sites). We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies.</p>
        </section>

        <section className="legal-section">
          <h2>13. UPDATES TO THIS POLICY</h2>
          <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. Material changes will be communicated via:</p>
          <ul>
            <li>Email notification (30 days in advance for material changes);</li>
            <li>Prominent notice on our website;</li>
            <li>In-app notification.</li>
          </ul>
          <p>Continued use of the Software after changes constitutes acceptance. The "Last Updated" date at the top indicates the most recent revision.</p>
        </section>

        <section className="legal-section">
          <h2>14. CONTACT INFORMATION</h2>
          <div className="contact-box">
            <p><strong>Data Protection Inquiries:</strong></p>
            <p>Email: privacy@terralabs.ae</p>
            <p>Data Protection Officer: dpo@terralabs.ae</p>
            <p><strong>Mailing Address:</strong></p>
            <p>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
            <p>Dubai International Free Zone Authority (DIEZA)</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>15. SPECIFIC JURISDICTIONAL PROVISIONS</h2>
          
          <h3>15.1 UAE Residents</h3>
          <p>Your data is processed in accordance with UAE Federal Law No. 45 of 2021 on the Protection of Personal Data and DIEZA regulations.</p>

          <h3>15.2 EU/EEA Residents (GDPR)</h3>
          <p>You have additional rights under GDPR, including enhanced transparency, data portability, and the right to lodge complaints with supervisory authorities.</p>

          <h3>15.3 California Residents (CCPA)</h3>
          <p>California residents have rights under the California Consumer Privacy Act, including the right to know what personal information is collected and to opt out of sales (note: we do not sell personal information).</p>

          <h3>15.4 Other Jurisdictions</h3>
          <p>We respect data protection rights under applicable local laws. Contact us for jurisdiction-specific questions.</p>
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