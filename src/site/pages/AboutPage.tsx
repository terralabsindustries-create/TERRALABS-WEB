export default function AboutPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">ABOUT TERRALABS</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Builders,</span>
            <span className="title-line">Not Hype.</span>
          </h1>
          
          <p className="page-subtitle">Founded by Joe, Ranjith, and Narayanan to bring disciplined, quant-grade trading to everyday accounts.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="mission-statement">
            <h2 className="section-title">Our Mission</h2>
            <div className="mission-content">
              <p className="mission-text">
                Bring disciplined, quantitative-grade trading to everyday accounts. We believe that sophisticated trading strategies should not be exclusive to institutional investors and hedge funds.
              </p>
              <p className="mission-text">
                Our Adaptive Intelligence Framework democratizes access to professional-grade gold trading systems, making advanced algorithmic strategies accessible to individual traders and smaller institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Meet The Team</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">J</div>
              </div>
              <div className="founder-info">
                <h3>Joe</h3>
                <div className="founder-title">Co-Founder & CEO</div>
                <p className="founder-bio">
                  Former quantitative analyst with 12+ years experience in algorithmic trading systems and risk management at tier-1 investment banks.
                </p>
                <div className="founder-expertise">
                  <span className="expertise-tag">Quantitative Analysis</span>
                  <span className="expertise-tag">Risk Management</span>
                  <span className="expertise-tag">Strategy Development</span>
                </div>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">R</div>
              </div>
              <div className="founder-info">
                <h3>Ranjith</h3>
                <div className="founder-title">Co-Founder & CTO</div>
                <p className="founder-bio">
                  Technology leader with expertise in high-frequency trading infrastructure, real-time systems, and financial data processing at scale.
                </p>
                <div className="founder-expertise">
                  <span className="expertise-tag">System Architecture</span>
                  <span className="expertise-tag">HFT Infrastructure</span>
                  <span className="expertise-tag">Data Engineering</span>
                </div>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">N</div>
              </div>
              <div className="founder-info">
                <h3>Narayanan</h3>
                <div className="founder-title">Co-Founder & COO</div>
                <p className="founder-bio">
                  Operations and compliance expert with deep experience in regulatory frameworks, broker relations, and institutional client management.
                </p>
                <div className="founder-expertise">
                  <span className="expertise-tag">Operations</span>
                  <span className="expertise-tag">Compliance</span>
                  <span className="expertise-tag">Broker Relations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Our Journey</h2>
          <div className="company-timeline">
            <div className="timeline-item">
              <div className="timeline-date">2022</div>
              <div className="timeline-content">
                <h3>The Idea</h3>
                <p>Recognizing the gap between institutional and retail trading capabilities, the founding team conceptualized an adaptive intelligence framework specifically for gold markets.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h3>Prototype Development</h3>
                <p>Built and tested the core statistical learning engine, establishing the foundational algorithms for regime detection and signal generation.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h3>Broker Integrations</h3>
                <p>Established partnerships with licensed brokers and developed robust FIX/REST connectivity for institutional-grade execution.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h3>Public Launch</h3>
                <p>Launched public beta with select clients, achieving consistent performance metrics and validating the adaptive intelligence approach.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h3>Expansion</h3>
                <p>Scaling operations with white-label partnerships and expanding into institutional client segments while maintaining retail accessibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Transparency</h3>
              <p>Every signal, every trade, every decision is logged and accessible. No black boxes, no hidden algorithms. You see exactly why each trade was taken.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Reliability</h3>
              <p>99.5% uptime SLA with redundant infrastructure. When markets move, our systems respond consistently and reliably.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Respect for Risk</h3>
              <p>Risk management is not an afterthought—it's built into every aspect of our system. Every trade respects position limits and drawdown controls.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">📊</div>
              <h3>Data-Driven</h3>
              <p>Decisions based on statistical evidence, not hunches. Our algorithms continuously learn and adapt to changing market conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">By The Numbers</h2>
          <div className="company-stats">
            <div className="stat-item">
              <div className="stat-value">$2.4M+</div>
              <div className="stat-label">Client Capital Connected</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">150+</div>
              <div className="stat-label">Active Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.5%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">847ms</div>
              <div className="stat-label">Average Execution</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Market Monitoring</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">5</div>
              <div className="stat-label">Licensed Broker Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="about-contact">
            <h2>Connect With Our Team</h2>
            <p>Interested in partnerships, careers, or learning more about our technology? We'd love to hear from you.</p>
            <div className="section-actions">
              <a href="/contact" className="cta-primary">
                <span>Get In Touch</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/partners" className="cta-secondary">
                <span>Partnership Opportunities</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}