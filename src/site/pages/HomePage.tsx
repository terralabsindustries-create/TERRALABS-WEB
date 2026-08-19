import React, { useEffect, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { unsplash_tool } from '../tools/unsplash';
import HeroOrb from '../components/HeroOrb';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="hero-main-content">
            
            {/* Hero Badge */}
            <div className="hero-badge">
              <span className="badge-text">XAU/USD SPECIALIST</span>
            </div>
            
            {/* Title & Orb Container */}
            <div className="hero-title-orb-container max-w-[1400px]">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="title-line">Gold Doesn't Sleep.</span>
                  <span className="title-line">Neither Does Our Engine.</span>
                </h1>
                <div className="hero-subtitle">
                  <p className="text-[24px]">Driven by our Synthetic Neural Adaptive Intelligence Technology (SNAIT), re-invented with a Cognitive Trading Fabric and Adaptive Intelligence Core that reverse-engineers a century of XAU/USD market data. It works tirelessly in the background — creating sustainable, repeatable trading outcomes, with your funds always secure in your MetaTrader account, all under your control.</p>
                </div>
              </div>
              <HeroOrb />
            </div>
            
            {/* CTAs */}
            <div className="hero-actions">
              <a href="/pricing" className="cta-primary rent-buy-btn">
                <span>RENT / BUY NOW</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#what-we-do" className="cta-secondary see-how-btn">
                <span>SEE HOW IT WORKS</span>
              </a>
              <a href="/performance" className="cta-secondary watch-demo-btn">
                <span>WATCH DEMO ▶</span>
              </a>
            </div>
            
            {/* Transparency Block */}
            <div className="transparency-block">
              <div className="transparency-content">
                <h2 className="transparency-title">You Stay in Control — Always.</h2>
                <div className="transparency-features">
                  <div className="transparency-item">
                    <span className="check-icon">✔</span>
                    <span>Funds stay in your broker account</span>
                  </div>
                  <div className="transparency-item">
                    <span className="check-icon">✔</span>
                    <span>Withdraw anytime directly from broker</span>
                  </div>
                  <div className="transparency-item">
                    <span className="check-icon">✔</span>
                    <span>Connects only via broker API</span>
                  </div>
                  <div className="transparency-item">
                    <span className="check-icon">✔</span>
                    <span>Trade manually anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="what-we-do-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="section-header">
            <h2 className="section-title">Your Gateway to Smarter Gold Trading</h2>
            <p className="section-subtitle">We are not money managers. We build software that connects via broker APIs to your MetaTrader 5 account. You stay in control — always.</p>
          </div>

          {/* Platform Diagram */}
          <div className="platform-diagram">
            <div className="diagram-flow">
              <div className="flow-step">
                <div className="step-icon">👤</div>
                <h4>You</h4>
                <p>Full Control</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-icon">🏦</div>
                <h4>Your Broker</h4>
                <p>MT5 Account</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-icon">⚡</div>
                <h4>Our Engine</h4>
                <p>API Connection</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-icon">📊</div>
                <h4>Dashboard</h4>
                <p>Live Execution</p>
              </div>
            </div>
            <div className="diagram-note">
              <p>Your funds never leave your broker account. We provide the intelligence, you maintain complete custody.</p>
            </div>
          </div>

          {/* Usage Models */}
          <div className="usage-models">
            <h3 className="models-title">Two Ways to Access Our Engine</h3>
            <div className="models-grid">
              <div className="model-card subscription">
                <div className="model-badge">POPULAR</div>
                <div className="model-icon">💳</div>
                <h4>Software Licensing</h4>
                <p>Fixed monthly fee • Keep 100% of profits</p>
                <div className="model-features">
                  <span>✓ No performance fees</span>
                  <span>✓ Transparent pricing</span>
                </div>
              </div>
              <div className="model-card">
                <div className="model-icon">🏢</div>
                <h4>White Label</h4>
                <p>For brokers, IBs, and fintech firms</p>
                <div className="model-features">
                  <span>✓ Custom branding</span>
                  <span>✓ API integration</span>
                  <span>✓ Revenue sharing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <h2 className="section-title">Adaptive Intelligence Framework</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Adaptive Intelligence</h3>
              <p>Neural networks that evolve with market conditions, learning from every trade execution.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Risk Controls</h3>
              <p>Advanced drawdown guards, news filters, and volatility controls protect your capital.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Execution Layer</h3>
              <p>Sub-200ms latency execution with smart order routing and slippage optimization.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Live Dashboard</h3>
              <p>Real-time P&L, risk metrics, trade logs, and performance analytics at your fingertips.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Scalability</h3>
              <p>Multi-broker API support with white-label ready infrastructure for enterprise deployment.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Continuous Learning</h3>
              <p>Backtesting against 100+ years of market data with adaptive strategy refinement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="pricing-teaser-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <h2 className="section-title">Transparent Tier-Based Pricing</h2>
          <div className="pricing-mini-cards">
            <div className="mini-card">
              <h4>STARTER</h4>
              <p>$10K-$25K capital range</p>
              <div className="price-range">$199/mo</div>
            </div>
            <div className="mini-card popular">
              <div className="popular-badge">POPULAR</div>
              <h4>GOLD</h4>
              <p>$100K-$250K capital range</p>
              <div className="price-range">$1,799/mo</div>
            </div>
            <div className="mini-card">
              <h4>DIAMOND</h4>
              <p>$500K+ capital range</p>
              <div className="price-range">$7,999/mo</div>
            </div>
          </div>
          <div className="teaser-cta">
            <a href="/pricing" className="cta-primary">View All 6 Tiers</a>
          </div>
        </div>
      </section>

      {/* Performance Snapshot */}
      <section className="performance-snapshot-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <h2 className="section-title">Proven. Transparent. Measurable.</h2>
          <div className="performance-stats">
            <div className="stat-item">
              <div className="stat-value">4-7%</div>
              <div className="stat-label">Avg Monthly Return</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;5%</div>
              <div className="stat-label">Max Drawdown</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">71%</div>
              <div className="stat-label">Win Ratio</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;200ms</div>
              <div className="stat-label">Execution Speed</div>
            </div>
          </div>
          <div className="performance-chart-placeholder">
            <div className="chart-header">
              <h4>Live Performance (Last 12 Months)</h4>
              <div className="chart-legend">
                <span className="legend-item equity">● Our Engine</span>
                <span className="legend-item benchmark">● XAU/USD Benchmark</span>
              </div>
            </div>
            <div className="chart-visual">
              <svg className="chart-svg" viewBox="0 0 400 120">
                <defs>
                  <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C8A44B" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#C8A44B" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,100 Q50,80 100,75 T200,60 T300,45 L400,40 L400,120 L0,120 Z" fill="url(#equityGradient)"/>
                <path d="M0,100 Q50,80 100,75 T200,60 T300,45 L400,40" stroke="#C8A44B" strokeWidth="2" fill="none"/>
                <path d="M0,105 Q50,102 100,98 T200,95 T300,92 L400,90" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
          <div className="snapshot-cta">
            <a href="/performance" className="cta-secondary">View Full Performance</a>
          </div>
        </div>
      </section>

      {/* Research Snapshot */}
      <section className="research-snapshot-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <h2 className="section-title">Innovation That Never Sleeps</h2>
          <div className="research-overview">
            <p>We reverse-engineer 100 years of XAU/USD data with cognitive neural frameworks to refine sustainable strategies. Our research team continuously develops new models, stress-tests existing algorithms, and publishes transparent performance data.</p>
          </div>
          <div className="research-highlights">
            <div className="highlight-item">
              <div className="highlight-number">100+</div>
              <div className="highlight-label">Years of Data Analyzed</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">15</div>
              <div className="highlight-label">Neural Network Layers</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">24/7</div>
              <div className="highlight-label">Market Monitoring</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">99.8%</div>
              <div className="highlight-label">System Uptime</div>
            </div>
          </div>
          <div className="research-cta">
            <a href="/research" className="cta-secondary">Explore Research</a>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="partners-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <h2 className="section-title">Approved Tier-1 Broker Partners</h2>
          <p className="broker-note" style={{ textAlign: 'center', fontSize: '16px', maxWidth: '900px', margin: '0 auto 40px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
            <strong style={{ color: '#FF5C39' }}>Mandatory Broker Requirement:</strong> For your protection and platform integrity, our trading engine ONLY integrates with accounts from our approved tier-1 regulated brokers. This protects you from broker manipulation, execution issues, and withdrawal problems. We will recommend the best broker for your jurisdiction and capital size.
          </p>
          <div className="broker-logos">
            <div className="broker-logo-item">
              <div className="broker-logo">MB</div>
              <span>MultiBank</span>
              <small style={{ fontSize: '0.75em', opacity: 0.6, display: 'block' }}>ASIC, CySEC, CBUAE</small>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">IG</div>
              <span>IG Markets</span>
              <small style={{ fontSize: '0.75em', opacity: 0.6, display: 'block' }}>FCA, ASIC, FINMA</small>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">PS</div>
              <span>Pepperstone</span>
              <small style={{ fontSize: '0.75em', opacity: 0.6, display: 'block' }}>FCA, ASIC, DFSA</small>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">EQ</div>
              <span>Equiti</span>
              <small style={{ fontSize: '0.75em', opacity: 0.6, display: 'block' }}>FCA, DFSA, SCA</small>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">CFI</div>
              <span>CFI Financial</span>
              <small style={{ fontSize: '0.75em', opacity: 0.6, display: 'block' }}>ASIC</small>
            </div>
          </div>
          <p className="broker-note">
            All approved brokers are tier-1 regulated with segregated client accounts and deposit protection. Your account, your control—we assist with setup and recommend the best option for your needs.
          </p>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="final-cta-section">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="final-cta-content">
            <h2 className="final-cta-title">Trade Smarter. Stay in Control.</h2>
            <p className="final-cta-subtitle">Your gold trades. Your broker. Your withdrawals. Our engine, working for you.</p>
            <div className="final-cta-actions">
              <a href="/pricing" className="cta-primary">
                <span>RENT / BUY NOW</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#what-we-do" className="cta-secondary">
                <span>SEE HOW IT WORKS</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Compliance */}
      <section className="footer-compliance">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="compliance-notice">
            <p>We are a software provider, not money managers. Your funds remain in your broker account (MT5), fully accessible and withdrawable at all times.</p>
          </div>
          <div className="footer-links">
            <div className="footer-nav">
              <a href="/pricing">Pricing</a>
              <a href="/performance">Performance</a>
              <a href="/research">Research</a>
              <a href="/security">Security & Compliance</a>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
              <a href="/contact">Contact</a>
              <a href="/legal/terms">Legal</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}