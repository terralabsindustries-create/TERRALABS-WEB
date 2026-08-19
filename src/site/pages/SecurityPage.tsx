export default function SecurityPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">SECURITY & COMPLIANCE</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Secure</span>
            <span className="title-line">By Design</span>
          </h1>
          
          <p className="page-subtitle">Enterprise-grade security infrastructure with comprehensive compliance frameworks and transparent policies.</p>
        </div>
      </section>

      {/* Security Features */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Security Infrastructure</h2>
          <div className="security-grid">
            <div className="security-card">
              <div className="security-icon">🔒</div>
              <h3>Encryption Standards</h3>
              <p>TLS 1.2+ for data in transit, AES-256 for data at rest</p>
              <ul className="security-features">
                <li>End-to-end encryption</li>
                <li>Perfect forward secrecy</li>
                <li>Certificate pinning</li>
                <li>HSTS enforcement</li>
              </ul>
            </div>

            <div className="security-card">
              <div className="security-icon">🔑</div>
              <h3>Key Management</h3>
              <p>Hardware security modules with role-based access control</p>
              <ul className="security-features">
                <li>Key vault integration</li>
                <li>Automatic key rotation</li>
                <li>Multi-signature controls</li>
                <li>Least-privilege access</li>
              </ul>
            </div>

            <div className="security-card">
              <div className="security-icon">🛡️</div>
              <h3>Access Controls</h3>
              <p>IP allowlists, audit logs, and role-based permissions</p>
              <ul className="security-features">
                <li>Multi-factor authentication</li>
                <li>IP whitelisting</li>
                <li>Session management</li>
                <li>Privilege escalation controls</li>
              </ul>
            </div>

            <div className="security-card">
              <div className="security-icon">⚡</div>
              <h3>Infrastructure</h3>
              <p>Redundant systems with disaster recovery and monitoring</p>
              <ul className="security-features">
                <li>99.9% uptime SLA</li>
                <li>Disaster recovery plans</li>
                <li>Real-time monitoring</li>
                <li>Automated failover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Compliance Framework</h2>
          <div className="compliance-overview">
            <div className="compliance-item">
              <div className="compliance-header">
                <div className="compliance-icon">🏛️</div>
                <h3>Regulatory Integration</h3>
              </div>
              <p>We integrate with licensed brokers operating under SCA and DFSA regulations</p>
              <div className="compliance-details">
                <div className="detail-item">
                  <strong>SCA (UAE):</strong> Securities and Commodities Authority
                </div>
                <div className="detail-item">
                  <strong>DFSA (Dubai):</strong> Dubai Financial Services Authority
                </div>
              </div>
            </div>

            <div className="compliance-item">
              <div className="compliance-header">
                <div className="compliance-icon">💰</div>
                <h3>Fund Custody</h3>
              </div>
              <p>We do not custody client funds - ever</p>
              <div className="compliance-details">
                <div className="detail-item">
                  ✓ Funds remain with licensed brokers
                </div>
                <div className="detail-item">
                  ✓ Client maintains full control
                </div>
                <div className="detail-item">
                  ✓ No proprietary trading
                </div>
              </div>
            </div>

            <div className="compliance-item">
              <div className="compliance-header">
                <div className="compliance-icon">📋</div>
                <h3>Audit Trail</h3>
              </div>
              <p>Complete trade journaling with immutable logs</p>
              <div className="compliance-details">
                <div className="detail-item">
                  ✓ Full trade history
                </div>
                <div className="detail-item">
                  ✓ Execution timestamps
                </div>
                <div className="detail-item">
                  ✓ Export capabilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Data Protection</h2>
          <div className="data-protection">
            <div className="protection-category">
              <h3>Data Collection</h3>
              <ul className="protection-list">
                <li>Minimal data collection principle</li>
                <li>Explicit consent requirements</li>
                <li>Purpose limitation enforcement</li>
                <li>Data retention policies</li>
              </ul>
            </div>
            <div className="protection-category">
              <h3>Data Storage</h3>
              <ul className="protection-list">
                <li>Encrypted at rest (AES-256)</li>
                <li>Geographic data residency</li>
                <li>Secure backup procedures</li>
                <li>Access logging and monitoring</li>
              </ul>
            </div>
            <div className="protection-category">
              <h3>Data Processing</h3>
              <ul className="protection-list">
                <li>Processing lawfulness verification</li>
                <li>Automated decision-making controls</li>
                <li>Data subject rights compliance</li>
                <li>Third-party processor agreements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Security Standards</h2>
          <div className="certifications">
            <div className="cert-item">
              <div className="cert-badge">ISO 27001</div>
              <h3>Information Security Management</h3>
              <p>International standard for information security management systems</p>
            </div>
            <div className="cert-item">
              <div className="cert-badge">SOC 2</div>
              <h3>Service Organization Control</h3>
              <p>Security, availability, and confidentiality controls audit</p>
            </div>
            <div className="cert-item">
              <div className="cert-badge">PCI DSS</div>
              <h3>Payment Card Industry</h3>
              <p>Data security standards for payment processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Incident Response</h2>
          <div className="incident-response">
            <div className="response-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Detection</h3>
                <p>24/7 monitoring and automated threat detection systems</p>
              </div>
            </div>
            <div className="response-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Assessment</h3>
                <p>Rapid threat assessment and impact analysis</p>
              </div>
            </div>
            <div className="response-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Containment</h3>
                <p>Immediate containment and system isolation procedures</p>
              </div>
            </div>
            <div className="response-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Recovery</h3>
                <p>System restoration and business continuity activation</p>
              </div>
            </div>
            <div className="response-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Review</h3>
                <p>Post-incident analysis and security improvement implementation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="content-section">
        <div className="section-content">
          <div className="security-contact">
            <h2>Security Inquiries</h2>
            <p>For security-related questions or to report vulnerabilities, contact our security team directly.</p>
            <div className="section-actions">
              <a href="/legal/privacy" className="cta-primary">
                <span>Read Our Policy</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="mailto:security@aurelius.com" className="cta-secondary">
                <span>Contact Security Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}