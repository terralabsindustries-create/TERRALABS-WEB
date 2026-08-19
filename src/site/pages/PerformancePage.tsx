export default function PerformancePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">LIVE METRICS</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Performance</span>
            <span className="title-line">With Guardrails</span>
          </h1>
          
          <p className="page-subtitle">Transparent metrics with full risk disclosure. All figures are illustrative.</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Key Metrics</h2>
          <div className="metrics-cards">
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">📈</div>
                <h3>Average Monthly Return</h3>
              </div>
              <div className="metric-main">
                <div className="metric-value large">4–7%</div>
                <div className="metric-label">Demo Performance</div>
              </div>
              <div className="metric-footer">
                <span className="metric-note">Range based on market conditions</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">📉</div>
                <h3>30-Day Max Drawdown</h3>
              </div>
              <div className="metric-main">
                <div className="metric-value large">&lt;5%</div>
                <div className="metric-label">Risk Cap</div>
              </div>
              <div className="metric-footer">
                <span className="metric-note">Strictly enforced daily limits</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">🎯</div>
                <h3>Hit Rate</h3>
              </div>
              <div className="metric-main">
                <div className="metric-value large">48–56%</div>
                <div className="metric-label">Win Percentage</div>
              </div>
              <div className="metric-footer">
                <span className="metric-note">Edge via risk-reward ratio</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">⚡</div>
                <h3>Execution Latency</h3>
              </div>
              <div className="metric-main">
                <div className="metric-value large">~200ms</div>
                <div className="metric-label">FIX Protocol</div>
              </div>
              <div className="metric-footer">
                <span className="metric-note">Average order routing time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equity Curve Placeholder */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Equity Curve</h2>
          <div className="chart-placeholder">
            <div className="chart-content">
              <div className="chart-header">
                <h3>Portfolio Growth (Illustrative)</h3>
                <div className="chart-legend">
                  <span className="legend-item">
                    <div className="legend-color equity"></div>
                    Equity Curve
                  </span>
                  <span className="legend-item">
                    <div className="legend-color benchmark"></div>
                    Benchmark
                  </span>
                </div>
              </div>
              <div className="chart-visual">
                <svg viewBox="0 0 400 200" className="chart-svg">
                  <defs>
                    <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#ffd700" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 20 180 Q 100 160 120 140 T 200 120 T 280 100 T 380 80" 
                        stroke="#ffd700" strokeWidth="3" fill="none"/>
                  <path d="M 20 180 Q 100 160 120 140 T 200 120 T 280 100 T 380 80 L 380 200 L 20 200 Z" 
                        fill="url(#equityGradient)"/>
                  <path d="M 20 180 L 380 160" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                </svg>
              </div>
              <div className="chart-note">
                Chart updates daily; all figures illustrative.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosures */}
      <section className="content-section disclosures-section">
        <div className="section-content">
          <h2 className="section-title">Risk Disclosures</h2>
          <div className="disclosure-grid">
            <div className="disclosure-item">
              <div className="disclosure-icon">⚠️</div>
              <h3>Past Performance</h3>
              <p>Past performance ≠ future results. Historical data is not indicative of future performance.</p>
            </div>
            <div className="disclosure-item">
              <div className="disclosure-icon">📊</div>
              <h3>Trading Risk</h3>
              <p>Trading involves risk of loss. Only trade with capital you can afford to lose.</p>
            </div>
            <div className="disclosure-item">
              <div className="disclosure-icon">🔧</div>
              <h3>Variable Results</h3>
              <p>Results vary by broker, spread, slippage, and user settings. No guarantee of profits.</p>
            </div>
          </div>
          
          <div className="section-actions">
            <a href="/contact" className="cta-primary">
              <span>See Live Demo</span>
              <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/legal/risk" className="cta-secondary">
              <span>Full Risk Disclosure</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}