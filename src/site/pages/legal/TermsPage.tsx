export default function TermsPage() {
  return (
    <div className="page-container legal-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">LEGAL</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Terms of Service</span>
          </h1>
          
          <p className="page-subtitle">Last updated: December 2024</p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="content-section">
        <div className="section-content legal-content">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Aurelius platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our adaptive intelligence trading framework and related services.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              Aurelius provides an adaptive intelligence framework for XAU/USD trading that includes:
            </p>
            <ul>
              <li>Signal generation and trade recommendations</li>
              <li>Risk management tools and controls</li>
              <li>Trade execution via licensed broker partners</li>
              <li>Performance analytics and reporting</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not provide investment advice. Our service provides algorithmic trading signals based on statistical analysis.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Only trade with capital you can afford to lose</li>
              <li>Understand that trading involves substantial risk of loss</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Acceptable Use</h2>
            <p>You may not:</p>
            <ul>
              <li>Reverse engineer or attempt to access our proprietary algorithms</li>
              <li>Share your account access with unauthorized parties</li>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Attempt to gain unauthorized access to other accounts</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Financial Disclaimers</h2>
            <div className="disclaimer-box">
              <h3>Trading Risk Acknowledgment</h3>
              <p>
                <strong>Trading involves substantial risk of loss.</strong> Past performance is not indicative of future results. 
                You should carefully consider whether trading is suitable for you in light of your circumstances, 
                knowledge, and financial resources.
              </p>
            </div>
            <p>
              We are not a licensed investment advisor. Our service provides algorithmic trading signals 
              based on technical and statistical analysis. All trading decisions remain your responsibility.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Fund Custody</h2>
            <p>
              <strong>We do not custody client funds.</strong> All funds remain with your chosen licensed broker. 
              We never have access to, control over, or custody of client capital. You maintain full control 
              of your trading account at all times.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Service Availability</h2>
            <p>
              While we strive for 99.5% uptime, we cannot guarantee uninterrupted service. We are not liable 
              for losses due to service interruptions, technical failures, or market conditions that prevent 
              trade execution.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Aurelius and its affiliates shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Aurelius and its affiliates from and against 
              any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of 
              the service or violation of these terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of significant 
              changes via email or platform notification. Continued use of the service after modifications 
              constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Termination</h2>
            <p>
              Either party may terminate this agreement at any time. Upon termination, your access to the 
              service will cease, but these terms will remain in effect for any outstanding obligations.
            </p>
          </div>

          <div className="legal-section">
            <h2>12. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. 
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts 
              of Dubai, UAE.
            </p>
          </div>

          <div className="legal-section">
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: legal@aurelius.com</p>
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