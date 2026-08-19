export default function OnboardingPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">CLIENT ONBOARDING</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Get Started</span>
            <span className="title-line">In Minutes</span>
          </h1>
          
          <p className="page-subtitle">Simple onboarding process with licensed broker integration and full KYC support.</p>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Onboarding Checklist</h2>
          <div className="onboarding-steps">
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">1</div>
                <h3>Choose Your Plan</h3>
                <div className="step-status">Required</div>
              </div>
              <p>Select between Subscription or Profit-Share model based on your preferences.</p>
              <div className="step-options">
                <div className="option">
                  <strong>Subscription:</strong> Fixed monthly fee with full control
                </div>
                <div className="option">
                  <strong>Profit-Share:</strong> Performance-based with aligned incentives
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">2</div>
                <h3>Broker Account</h3>
                <div className="step-status">Required</div>
              </div>
              <p>Open or link existing account with our licensed partner brokers.</p>
              <div className="broker-list">
                <div className="broker-item">
                  <span className="broker-name">Partner Broker A</span>
                  <span className="regulation">SCA Regulated</span>
                </div>
                <div className="broker-item">
                  <span className="broker-name">Partner Broker B</span>
                  <span className="regulation">DFSA Licensed</span>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">3</div>
                <h3>KYC Verification</h3>
                <div className="step-status">Required</div>
              </div>
              <p>Complete KYC with your chosen broker. We don't hold funds directly.</p>
              <div className="kyc-docs">
                <div className="doc-item">✓ Government-issued ID</div>
                <div className="doc-item">✓ Proof of address</div>
                <div className="doc-item">✓ Broker account verification</div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">4</div>
                <h3>API Connection</h3>
                <div className="step-status">Technical</div>
              </div>
              <p>Connect via read-only API or trading permissions as per your preference.</p>
              <div className="api-options">
                <div className="api-option">
                  <strong>Read-Only:</strong> Signal delivery only
                </div>
                <div className="api-option">
                  <strong>Trading:</strong> Full automated execution
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">5</div>
                <h3>Risk Preferences</h3>
                <div className="step-status">Configuration</div>
              </div>
              <p>Set your risk parameters and trading preferences.</p>
              <div className="risk-settings">
                <div className="setting-item">
                  <span>Max daily drawdown:</span>
                  <span>1-5%</span>
                </div>
                <div className="setting-item">
                  <span>Position size:</span>
                  <span>0.1-2.0 lots</span>
                </div>
                <div className="setting-item">
                  <span>Trading hours:</span>
                  <span>Customizable</span>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">6</div>
                <h3>Go Live</h3>
                <div className="step-status">Active</div>
              </div>
              <p>Monitor your dashboard and track performance in real-time.</p>
              <div className="live-features">
                <div className="feature-item">Real-time P/L tracking</div>
                <div className="feature-item">Signal notifications</div>
                <div className="feature-item">Risk monitoring</div>
                <div className="feature-item">Performance analytics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Required Documentation</h2>
          <div className="docs-grid">
            <div className="doc-category">
              <h3>Identity Verification</h3>
              <ul className="doc-list">
                <li>Government-issued photo ID (passport/driver's license)</li>
                <li>Proof of address (utility bill, bank statement)</li>
                <li>Selfie with ID for verification</li>
              </ul>
            </div>
            <div className="doc-category">
              <h3>Financial Information</h3>
              <ul className="doc-list">
                <li>Bank account details</li>
                <li>Trading experience questionnaire</li>
                <li>Risk tolerance assessment</li>
              </ul>
            </div>
            <div className="doc-category">
              <h3>Broker Integration</h3>
              <ul className="doc-list">
                <li>Broker account ID</li>
                <li>API credentials (if applicable)</li>
                <li>Account verification screenshot</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Onboarding Support</h2>
          <div className="support-options">
            <div className="support-card">
              <div className="support-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Instant help during business hours with our onboarding specialists.</p>
              <a href="#" className="support-link">Start Chat</a>
            </div>
            <div className="support-card">
              <div className="support-icon">📱</div>
              <h3>WhatsApp Support</h3>
              <p>Direct line to our team for quick questions and document submission.</p>
              <a href="https://wa.me/1234567890" className="support-link">Message Us</a>
            </div>
            <div className="support-card">
              <div className="support-icon">📞</div>
              <h3>Callback Service</h3>
              <p>Schedule a call with our team to walk through the process together.</p>
              <a href="/contact" className="support-link">Book Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="onboarding-cta">
            <h2>Ready to Start?</h2>
            <p>Join hundreds of traders using our Adaptive Intelligence Framework</p>
            <div className="section-actions">
              <a href="/pricing" className="cta-primary">
                <span>Start Now</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact" className="cta-secondary">
                <span>Need Help?</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}