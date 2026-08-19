import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, FileCheck, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface CompliancePolicyProps {
  onBack: () => void;
}

export function CompliancePolicy({ onBack }: CompliancePolicyProps) {
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
          <h1>Compliance & Regulatory Policy</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
          <p className="legal-jurisdiction">UAE DIEZA Compliance Framework</p>
        </div>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. REGULATORY FRAMEWORK</h2>
          
          <h3>1.1 Governing Authorities</h3>
          <p>TERRALABS operates under the jurisdiction of:</p>
          <ul>
            <li><strong>Dubai International Free Zone Authority (DIEZA)</strong> - Primary regulatory authority;</li>
            <li><strong>UAE Ministry of Economy</strong> - Commercial activities oversight;</li>
            <li><strong>UAE Central Bank</strong> - Anti-Money Laundering (AML) regulations;</li>
            <li><strong>UAE Data Protection Office</strong> - Personal data protection compliance.</li>
          </ul>

          <h3>1.2 Applicable Laws</h3>
          <ul>
            <li>UAE Federal Law No. 2 of 2015 (Commercial Companies Law);</li>
            <li>UAE Federal Decree-Law No. 20 of 2018 (Anti-Money Laundering and Combating Financing of Terrorism);</li>
            <li>UAE Federal Law No. 45 of 2021 (Protection of Personal Data);</li>
            <li>DIEZA Free Zone Regulations;</li>
            <li>UAE Cybercrime Law (Federal Law No. 5 of 2012);</li>
            <li>UAE Consumer Protection Law (Federal Law No. 15 of 2020).</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. KNOW YOUR CUSTOMER (KYC) POLICY</h2>
          
          <h3>2.1 Customer Identification Requirements</h3>
          <p>All customers must provide the following for identity verification:</p>
          <ul>
            <li><strong>Individual Customers:</strong>
              <ul>
                <li>Full legal name;</li>
                <li>Date of birth;</li>
                <li>Nationality and country of residence;</li>
                <li>Government-issued photo ID (passport, Emirates ID, national ID, driver's license);</li>
                <li>Proof of address (utility bill, bank statement, government document issued within 3 months);</li>
                <li>Contact information (email, phone number).</li>
              </ul>
            </li>
            <li><strong>Corporate Customers:</strong>
              <ul>
                <li>Company legal name and registration number;</li>
                <li>Certificate of incorporation;</li>
                <li>Memorandum and Articles of Association;</li>
                <li>Proof of registered address;</li>
                <li>Beneficial ownership declaration (identifying individuals owning &gt;25%);</li>
                <li>Identity documents for authorized signatories and beneficial owners;</li>
                <li>Board resolution authorizing software subscription.</li>
              </ul>
            </li>
          </ul>

          <h3>2.2 Verification Process</h3>
          <ul>
            <li>Identity verification is conducted using third-party KYC service providers;</li>
            <li>Documents are checked against global databases for authenticity;</li>
            <li>Facial recognition and liveness checks may be required;</li>
            <li>Verification typically completes within 24-48 hours;</li>
            <li>Access to the Software is restricted until KYC is approved.</li>
          </ul>

          <h3>2.3 Enhanced Due Diligence (EDD)</h3>
          <p>Enhanced scrutiny is applied for:</p>
          <ul>
            <li>Customers from high-risk jurisdictions (FATF blacklist/greylist countries);</li>
            <li>Politically Exposed Persons (PEPs) or their family members/associates;</li>
            <li>High-value subscriptions (above $50,000 annually);</li>
            <li>Customers with complex ownership structures;</li>
            <li>Unusual transaction patterns or activity.</li>
          </ul>

          <h3>2.4 Ongoing Monitoring</h3>
          <ul>
            <li>Customer information is reviewed annually;</li>
            <li>We may request updated documents or information at any time;</li>
            <li>Failure to provide requested information may result in account suspension.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. ANTI-MONEY LAUNDERING (AML) POLICY</h2>
          
          <h3>3.1 AML Commitment</h3>
          <p>TERRALABS has zero tolerance for money laundering and terrorist financing. We comply with UAE Federal Decree-Law No. 20 of 2018 and implement robust AML controls.</p>

          <h3>3.2 Prohibited Activities</h3>
          <p>Customers are strictly prohibited from:</p>
          <ul>
            <li>Using our Software to launder proceeds of crime;</li>
            <li>Financing terrorism or terrorist organizations;</li>
            <li>Conducting transactions on behalf of sanctioned individuals or entities;</li>
            <li>Structuring transactions to avoid reporting thresholds;</li>
            <li>Providing false information or forged documents;</li>
            <li>Using the Software for any illegal purpose.</li>
          </ul>

          <h3>3.3 Transaction Monitoring</h3>
          <ul>
            <li>All subscription payments are monitored for suspicious activity;</li>
            <li>Large or unusual transactions trigger automatic alerts;</li>
            <li>We screen customers against global sanctions lists (OFAC, UN, EU, UAE);</li>
            <li>Suspicious activity is reported to UAE Financial Intelligence Unit (FIU).</li>
          </ul>

          <h3>3.4 Suspicious Activity Reporting (SAR)</h3>
          <p>We will file Suspicious Activity Reports with UAE authorities if we detect:</p>
          <ul>
            <li>Transactions inconsistent with customer profile;</li>
            <li>Attempts to use fraudulent or stolen payment methods;</li>
            <li>Customer evasiveness or refusal to provide information;</li>
            <li>Patterns consistent with money laundering typologies;</li>
            <li>Links to sanctioned jurisdictions or individuals.</li>
          </ul>
          <p><strong>Note:</strong> We are legally prohibited from informing customers of SAR filings.</p>

          <h3>3.5 Record Retention</h3>
          <ul>
            <li>Customer identification records retained for 10 years after account closure;</li>
            <li>Transaction records retained for 10 years;</li>
            <li>AML investigation records retained indefinitely;</li>
            <li>Records are stored securely and made available to regulators upon request.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. COUNTER-TERRORISM FINANCING (CTF) POLICY</h2>
          
          <h3>4.1 Sanctions Screening</h3>
          <p>All customers are screened against:</p>
          <ul>
            <li>UAE Terrorism List;</li>
            <li>UN Security Council Consolidated List;</li>
            <li>OFAC Specially Designated Nationals (SDN) List;</li>
            <li>EU Financial Sanctions List;</li>
            <li>Other international sanctions databases.</li>
          </ul>

          <h3>4.2 Prohibited Jurisdictions</h3>
          <p>We do not provide services to customers in jurisdictions subject to comprehensive UAE or international sanctions, including but not limited to:</p>
          <ul>
            <li>Countries under UAE sanctions;</li>
            <li>Countries under UN comprehensive sanctions;</li>
            <li>FATF-identified high-risk jurisdictions with strategic AML/CFT deficiencies.</li>
          </ul>

          <h3>4.3 Asset Freezing</h3>
          <p>If a customer is identified on sanctions lists, we will:</p>
          <ul>
            <li>Immediately suspend account access;</li>
            <li>Freeze any outstanding payments;</li>
            <li>Report to UAE authorities;</li>
            <li>Cooperate fully with law enforcement.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. DATA PROTECTION COMPLIANCE</h2>
          
          <h3>5.1 UAE Data Protection Law</h3>
          <p>We comply with UAE Federal Law No. 45 of 2021 on Protection of Personal Data, which includes:</p>
          <ul>
            <li>Lawful basis for data processing;</li>
            <li>Data minimization principles;</li>
            <li>Purpose limitation;</li>
            <li>Data subject rights (access, rectification, erasure);</li>
            <li>Data breach notification (within 72 hours to authorities);</li>
            <li>International data transfer safeguards.</li>
          </ul>

          <h3>5.2 GDPR Alignment (for EU Customers)</h3>
          <p>For customers in the European Economic Area (EEA), we comply with GDPR requirements including:</p>
          <ul>
            <li>Legal bases for processing (contract, legal obligation, legitimate interest, consent);</li>
            <li>Enhanced transparency and privacy notices;</li>
            <li>Data Protection Impact Assessments (DPIAs) for high-risk processing;</li>
            <li>Appointment of EU representative (if required);</li>
            <li>Standard Contractual Clauses for data transfers outside EEA.</li>
          </ul>

          <h3>5.3 Data Security Measures</h3>
          <ul>
            <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256);</li>
            <li>Multi-factor authentication for customer accounts;</li>
            <li>Role-based access controls for internal systems;</li>
            <li>Regular security audits and penetration testing;</li>
            <li>Employee training on data protection;</li>
            <li>Incident response plan with 24/7 monitoring.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. CONSUMER PROTECTION</h2>
          
          <h3>6.1 Transparent Pricing</h3>
          <ul>
            <li>All subscription fees are clearly displayed on our website;</li>
            <li>No hidden fees or charges;</li>
            <li>Price changes communicated with 60 days' notice;</li>
            <li>All subscription terms disclosed before purchase.</li>
          </ul>

          <h3>6.2 Fair Advertising</h3>
          <ul>
            <li>Marketing materials are accurate and not misleading;</li>
            <li>Performance claims are substantiated with data;</li>
            <li>Risk warnings prominently displayed;</li>
            <li>Backtested vs. live performance clearly distinguished;</li>
            <li>No guarantees of profits or specific returns.</li>
          </ul>

          <h3>6.3 Customer Service</h3>
          <ul>
            <li>Multiple support channels (email, chat, WhatsApp);</li>
            <li>Response to inquiries within 24 hours;</li>
            <li>Complaint handling procedure with escalation path;</li>
            <li>Commitment to fair treatment and ethical conduct.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. INTELLECTUAL PROPERTY PROTECTION</h2>
          
          <h3>7.1 Trademarks</h3>
          <ul>
            <li>Pythagoras Stardust™ is a registered or pending trademark;</li>
            <li>TERRALABS branding and logos are protected intellectual property;</li>
            <li>Unauthorized use of our trademarks is prohibited.</li>
          </ul>

          <h3>7.2 Software Protection</h3>
          <ul>
            <li>Software code is proprietary and confidential;</li>
            <li>Reverse engineering, decompilation, or disassembly is prohibited;</li>
            <li>We employ technical measures to prevent unauthorized copying;</li>
            <li>Violations will result in immediate termination and legal action.</li>
          </ul>

          <h3>7.3 Copyright</h3>
          <ul>
            <li>All website content, documentation, and marketing materials are copyrighted;</li>
            <li>Reproduction without written permission is prohibited;</li>
            <li>DMCA takedown procedures in place for infringement claims.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. DISPUTE RESOLUTION</h2>
          
          <h3>8.1 Internal Complaint Handling</h3>
          <p>Customers with complaints should:</p>
          <ol>
            <li>Email complaints@terralabs.ae with details;</li>
            <li>Receive acknowledgment within 48 hours;</li>
            <li>Receive investigation update within 7 days;</li>
            <li>Receive final resolution within 30 days.</li>
          </ol>

          <h3>8.2 Escalation</h3>
          <p>If not satisfied with our resolution, customers may escalate to:</p>
          <ul>
            <li>DIEZA Commercial Disputes Unit;</li>
            <li>Dubai Consumer Protection Department;</li>
            <li>Dubai Courts or DIAC Arbitration.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. CYBERSECURITY COMPLIANCE</h2>
          
          <h3>9.1 UAE Cybercrime Law Compliance</h3>
          <p>We comply with UAE Federal Law No. 5 of 2012 on Combating Cybercrimes, including:</p>
          <ul>
            <li>Protection against unauthorized access;</li>
            <li>Prohibition of data breaches and hacking;</li>
            <li>Encryption of sensitive customer data;</li>
            <li>Reporting of cybercrimes to UAE authorities.</li>
          </ul>

          <h3>9.2 Incident Response</h3>
          <p>In the event of a cybersecurity incident:</p>
          <ul>
            <li>Immediate containment and investigation;</li>
            <li>Notification to affected customers within 72 hours;</li>
            <li>Reporting to UAE Cybersecurity Council and DIEZA;</li>
            <li>Cooperation with law enforcement;</li>
            <li>Post-incident review and security enhancements.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. TAX COMPLIANCE</h2>
          
          <h3>10.1 UAE VAT</h3>
          <ul>
            <li>TERRALABS is registered for UAE Value Added Tax (VAT);</li>
            <li>VAT Registration Number: [TRN Number];</li>
            <li>Standard VAT rate of 5% applies to subscription fees (if applicable);</li>
            <li>Tax invoices issued in compliance with UAE Federal Tax Authority requirements.</li>
          </ul>

          <h3>10.2 International Tax</h3>
          <ul>
            <li>We comply with OECD Common Reporting Standard (CRS) if applicable;</li>
            <li>Customers are responsible for their own tax obligations in their jurisdictions;</li>
            <li>We do not provide tax advice—customers should consult tax professionals.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. RECORD-KEEPING AND AUDIT</h2>
          
          <h3>11.1 Commercial Records</h3>
          <p>We maintain the following records for UAE regulatory requirements:</p>
          <ul>
            <li>Financial statements and accounting records (7 years);</li>
            <li>Customer contracts and agreements (10 years after termination);</li>
            <li>Tax records (10 years);</li>
            <li>KYC/AML documentation (10 years);</li>
            <li>Compliance reports and audits (indefinitely).</li>
          </ul>

          <h3>11.2 Regulatory Audits</h3>
          <ul>
            <li>We cooperate fully with DIEZA audits and inspections;</li>
            <li>Records are made available to regulators upon request;</li>
            <li>Internal compliance audits conducted annually;</li>
            <li>External audits by licensed UAE auditors.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>12. EMPLOYEE COMPLIANCE</h2>
          
          <h3>12.1 Training</h3>
          <ul>
            <li>All employees receive AML/CTF training upon hiring;</li>
            <li>Annual refresher training on compliance policies;</li>
            <li>Data protection and cybersecurity awareness training;</li>
            <li>Ethics and anti-corruption training.</li>
          </ul>

          <h3>12.2 Code of Conduct</h3>
          <p>Employees must:</p>
          <ul>
            <li>Act with integrity and professionalism;</li>
            <li>Protect customer confidentiality;</li>
            <li>Report suspicious activity or compliance concerns;</li>
            <li>Avoid conflicts of interest;</li>
            <li>Comply with all UAE laws and company policies.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>13. CONTINUOUS IMPROVEMENT</h2>
          <p>We are committed to maintaining the highest compliance standards through:</p>
          <ul>
            <li>Regular policy reviews and updates;</li>
            <li>Monitoring of regulatory developments;</li>
            <li>Investment in compliance technology;</li>
            <li>Engagement with industry best practices;</li>
            <li>Feedback from regulators and customers.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>14. CONTACT COMPLIANCE DEPARTMENT</h2>
          <div className="contact-box">
            <p><strong>Compliance Officer:</strong> compliance@terralabs.ae</p>
            <p><strong>AML Officer:</strong> aml@terralabs.ae</p>
            <p><strong>Data Protection Officer:</strong> dpo@terralabs.ae</p>
            <p><strong>Complaints:</strong> complaints@terralabs.ae</p>
            <p><strong>Address:</strong></p>
            <p>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
            <p>Dubai International Free Zone Authority (DIEZA)</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
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