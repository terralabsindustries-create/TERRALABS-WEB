export default function DocsPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">DOCUMENTATION</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Documentation</span>
            <span className="title-line">& API Guide</span>
          </h1>
          
          <p className="page-subtitle">Complete user guide and API documentation for platform integration and white-label deployment.</p>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="content-section">
        <div className="section-content">
          <div className="docs-grid">
            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">🚀</div>
                <h3>Quick Start Guide</h3>
              </div>
              <p>Get up and running in minutes with our step-by-step onboarding guide.</p>
              <ul className="doc-topics">
                <li>Account setup and broker connection</li>
                <li>Risk parameter configuration</li>
                <li>Dashboard overview and navigation</li>
                <li>First trade execution</li>
              </ul>
              <a href="#quickstart" className="doc-link">View Guide →</a>
            </div>

            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">⚙️</div>
                <h3>Strategy Settings</h3>
              </div>
              <p>Configure signals, filters, and trading schedules to match your preferences.</p>
              <ul className="doc-topics">
                <li>Signal configuration and weighting</li>
                <li>Market filters and conditions</li>
                <li>Trading schedule management</li>
                <li>Performance optimization</li>
              </ul>
              <a href="#strategy" className="doc-link">View Guide →</a>
            </div>

            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">🛡️</div>
                <h3>Risk Parameters</h3>
              </div>
              <p>Comprehensive risk management settings and safety controls.</p>
              <ul className="doc-topics">
                <li>Maximum exposure limits</li>
                <li>Drawdown stops and circuit breakers</li>
                <li>News event lockout</li>
                <li>Emergency halt procedures</li>
              </ul>
              <a href="#risk" className="doc-link">View Guide →</a>
            </div>

            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">🔗</div>
                <h3>Webhooks & Exports</h3>
              </div>
              <p>Integration options for data export and real-time notifications.</p>
              <ul className="doc-topics">
                <li>CSV/JSON data exports</li>
                <li>Webhook configuration</li>
                <li>Real-time callbacks</li>
                <li>Third-party integrations</li>
              </ul>
              <a href="#webhooks" className="doc-link">View Guide →</a>
            </div>

            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">🏷️</div>
                <h3>White-Label Admin</h3>
              </div>
              <p>Complete administration guide for white-label partners.</p>
              <ul className="doc-topics">
                <li>User management and permissions</li>
                <li>Billing and subscription handling</li>
                <li>Theme and branding controls</li>
                <li>Multi-tenant administration</li>
              </ul>
              <a href="#whitelabel" className="doc-link">View Guide →</a>
            </div>

            <div className="doc-section">
              <div className="doc-header">
                <div className="doc-icon">📊</div>
                <h3>Status Page & SLAs</h3>
              </div>
              <p>Service level agreements and system status monitoring.</p>
              <ul className="doc-topics">
                <li>Uptime guarantees and SLAs</li>
                <li>System status monitoring</li>
                <li>Incident response procedures</li>
                <li>Performance benchmarks</li>
              </ul>
              <a href="#status" className="doc-link">View Guide →</a>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">API Reference</h2>
          <div className="api-section">
            <div className="api-overview">
              <h3>REST API Endpoints</h3>
              <p>Complete API documentation for programmatic access to platform features.</p>
            </div>
            
            <div className="api-examples">
              <div className="api-example">
                <h4>Authentication</h4>
                <div className="code-block">
                  <code>
                    POST /api/v1/auth<br/>
                    Content-Type: application/json<br/><br/>
                    {"{"}
                      "api_key": "your_api_key",<br/>
                      "secret": "your_secret"<br/>
                    {"}"}
                  </code>
                </div>
              </div>

              <div className="api-example">
                <h4>Get Account Status</h4>
                <div className="code-block">
                  <code>
                    GET /api/v1/account/status<br/>
                    Authorization: Bearer &lt;token&gt;<br/><br/>
                    Response:<br/>
                    {"{"}
                      "status": "active",<br/>
                      "balance": 10000.00,<br/>
                      "equity": 10250.00,<br/>
                      "margin_used": 500.00<br/>
                    {"}"}
                  </code>
                </div>
              </div>

              <div className="api-example">
                <h4>Trade History</h4>
                <div className="code-block">
                  <code>
                    GET /api/v1/trades?limit=50&offset=0<br/>
                    Authorization: Bearer &lt;token&gt;<br/><br/>
                    Response:<br/>
                    {"{"}
                      "trades": [...],<br/>
                      "total": 150,<br/>
                      "pagination": {"{"}<br/>
                        "limit": 50,<br/>
                        "offset": 0<br/>
                      {"}"}<br/>
                    {"}"}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="content-section">
        <div className="section-content">
          <div className="download-section">
            <h2 className="section-title">Download Documentation</h2>
            <div className="download-options">
              <div className="download-card">
                <div className="download-icon">📖</div>
                <h3>Complete User Guide</h3>
                <p>Comprehensive PDF guide covering all platform features and settings.</p>
                <a href="#" className="download-btn">Download PDF</a>
              </div>
              <div className="download-card">
                <div className="download-icon">⚡</div>
                <h3>API Documentation</h3>
                <p>Technical reference for developers and integration partners.</p>
                <a href="#" className="download-btn">Download PDF</a>
              </div>
              <div className="download-card">
                <div className="download-icon">🏷️</div>
                <h3>White-Label Guide</h3>
                <p>Complete setup and administration guide for white-label partners.</p>
                <a href="#" className="download-btn">Download PDF</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="docs-support">
            <h2>Need Additional Help?</h2>
            <p>Our technical team is available to assist with integration and setup questions.</p>
            <div className="section-actions">
              <a href="/contact" className="cta-primary">
                <span>Contact Support</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://wa.me/1234567890" className="cta-secondary">
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}