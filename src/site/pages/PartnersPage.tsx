export default function PartnersPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">BROKER INTEGRATIONS</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Launch Your Own</span>
            <span className="title-line">Branded Platform</span>
          </h1>
          
          <p className="page-subtitle">Launch your own branded platform in 2–4 weeks with complete white label solutions.</p>
        </div>
      </section>

      {/* Broker Integrations */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Supported Broker Integrations</h2>
          <div className="broker-logos">
            <div className="broker-logo-item">
              <div className="broker-logo">MB</div>
              <span>MultiBank</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">IG</div>
              <span>IG</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">PS</div>
              <span>Pepperstone</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">CFI</div>
              <span>CFI</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">EQ</div>
              <span>Equiti</span>
            </div>
          </div>
          <p className="broker-note">Full MetaTrader 5 integration with FIX/REST API connectivity</p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Why Partner With Us</h2>
          <div className="partner-benefits">
            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>Rebrandable UI</h3>
              <p>Host with us or on your infrastructure. Complete theme control and customization.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔗</div>
              <h3>Broker Integration</h3>
              <p>FIX/REST connectivity with MT5 bridging via partner brokers.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Complete Reporting</h3>
              <p>Audit trail, performance tracking, and multi-tenant administration.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛠️</div>
              <h3>Technical Support</h3>
              <p>SLA-backed infrastructure with dedicated support desk and monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">What You Get</h2>
          <div className="features-grid-2">
            <div className="feature-group">
              <h3>Brand Control</h3>
              <ul className="feature-list">
                <li>Brand kit + theme controls</li>
                <li>Custom domain setup</li>
                <li>Logo and color schemes</li>
                <li>White-label documentation</li>
              </ul>
            </div>
            <div className="feature-group">
              <h3>Admin Console</h3>
              <ul className="feature-list">
                <li>User management system</li>
                <li>Plan and pricing controls</li>
                <li>Fee structure configuration</li>
                <li>Analytics dashboard</li>
              </ul>
            </div>
            <div className="feature-group">
              <h3>Performance Modules</h3>
              <ul className="feature-list">
                <li>Real-time P/L tracking</li>
                <li>Risk monitoring tools</li>
                <li>Client retention analytics</li>
                <li>Revenue reporting</li>
              </ul>
            </div>
            <div className="feature-group">
              <h3>SLA & Support</h3>
              <ul className="feature-list">
                <li>99.5% uptime guarantee</li>
                <li>24/7 technical support</li>
                <li>Priority bug fixes</li>
                <li>Training programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Flow */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Integration Process</h2>
          <div className="integration-timeline">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Agreement</h3>
                <p>White-label partnership terms and technical requirements</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Configure Brand</h3>
                <p>Theme setup, branding assets, and domain configuration</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Connect Broker</h3>
                <p>FIX/REST integration and trading infrastructure setup</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Pilot Testing</h3>
                <p>Limited rollout with select clients and performance validation</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Go Live</h3>
                <p>Full launch with ongoing support and monitoring</p>
              </div>
            </div>
          </div>
          <div className="timeline-note">
            <p><strong>Typical Timeline:</strong> 2–4 weeks from signing to go-live*</p>
            <p className="disclaimer">*Timeline varies by complexity and broker integration requirements</p>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Partner Categories</h2>
          <div className="partner-types">
            <div className="partner-type-card">
              <div className="type-header">
                <h3>Introducing Brokers</h3>
                <div className="type-badge">IB Program</div>
              </div>
              <p>Revenue sharing model with full client onboarding support and branded platform access.</p>
              <div className="type-features">
                <div className="feature">Commission splits</div>
                <div className="feature">Marketing support</div>
                <div className="feature">Client management tools</div>
              </div>
            </div>
            <div className="partner-type-card">
              <div className="type-header">
                <h3>Licensed Brokers</h3>
                <div className="type-badge">Full WL</div>
              </div>
              <p>Complete white-label solution with regulatory compliance support and infrastructure hosting.</p>
              <div className="type-features">
                <div className="feature">Full rebrand</div>
                <div className="feature">Compliance tools</div>
                <div className="feature">Infrastructure hosting</div>
              </div>
            </div>
            <div className="partner-type-card">
              <div className="type-header">
                <h3>Fund Managers</h3>
                <div className="type-badge">Institutional</div>
              </div>
              <p>Enterprise-grade deployment with custom SLAs and dedicated infrastructure for fund operations.</p>
              <div className="type-features">
                <div className="feature">Custom SLAs</div>
                <div className="feature">Dedicated resources</div>
                <div className="feature">Fund reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="section-actions">
            <a href="/contact" className="cta-primary">
              <span>Request WL Deck</span>
              <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/contact" className="cta-secondary">
              <span>Book Integration Call</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}