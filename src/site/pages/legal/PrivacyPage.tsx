export default function PrivacyPage() {
  return (
    <div className="page-container legal-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">LEGAL</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Privacy Policy</span>
          </h1>
          
          <p className="page-subtitle">Last updated: December 2024</p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="content-section">
        <div className="section-content legal-content">
          <div className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Account credentials and authentication data</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
            </ul>

            <h3>Trading Data</h3>
            <ul>
              <li>Trading account information and broker details</li>
              <li>Transaction history and performance metrics</li>
              <li>Risk preferences and account settings</li>
              <li>Platform usage and interaction data</li>
            </ul>

            <h3>Technical Information</h3>
            <ul>
              <li>IP address, device information, browser type</li>
              <li>Log files and usage analytics</li>
              <li>API access patterns and system interactions</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our trading services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and security alerts</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            
            <h3>With Licensed Brokers</h3>
            <p>
              We share necessary trading and account information with our licensed broker partners 
              to execute trades and maintain compliance with regulatory requirements.
            </p>

            <h3>Service Providers</h3>
            <p>
              We may share information with third-party service providers who perform services on our behalf, 
              such as payment processing, data analysis, email delivery, and technical support.
            </p>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose information if required to do so by law or in response to valid requests 
              by public authorities, including to meet national security or law enforcement requirements.
            </p>

            <h3>Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred 
              as part of that transaction.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Data Storage and Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
            <ul>
              <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.2+) and at rest (AES-256)</li>
              <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
              <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
              <li><strong>Data Centers:</strong> SOC 2 compliant facilities with physical security</li>
              <li><strong>Regular Audits:</strong> Third-party security assessments and penetration testing</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services 
              and comply with legal obligations. Specifically:
            </p>
            <ul>
              <li><strong>Account Information:</strong> Retained while your account is active plus 7 years</li>
              <li><strong>Trading Data:</strong> Retained for 7 years for regulatory compliance</li>
              <li><strong>Communication Records:</strong> Retained for 3 years</li>
              <li><strong>Technical Logs:</strong> Retained for 1 year unless required for security investigations</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
              <li><strong>Erasure:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@aurelius.com.</p>
          </div>

          <div className="legal-section">
            <h2>7. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Improve security and prevent fraud</li>
              <li>Provide personalized content and features</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling cookies 
              may affect the functionality of our service.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers, including:
            </p>
            <ul>
              <li>Adequacy decisions by relevant authorities</li>
              <li>Standard contractual clauses</li>
              <li>Binding corporate rules</li>
              <li>Certification schemes</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 18 years of age. We do not knowingly 
              collect personal information from children under 18. If you become aware that a child 
              has provided us with personal information, please contact us immediately.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              We will also notify you via email or platform notification for significant changes.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <p>Email: privacy@aurelius.com</p>
              <p>Data Protection Officer: dpo@aurelius.com</p>
              <p>Address: Terralabs Industries, Dubai, UAE</p>
            </div>
          </div>

          <div className="legal-footer">
            <p><strong>Effective Date:</strong> December 1, 2024</p>
            <p><strong>Version:</strong> 1.0</p>
          </div>
        </div>
      </section>
    </div>
  );
}