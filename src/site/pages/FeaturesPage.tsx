export default function FeaturesPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">PLATFORM FEATURES</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Built For Discipline.</span>
            <span className="title-line">Tuned For Gold.</span>
          </h1>
          
          <p className="page-subtitle">No "black box." You see signals, sizing logic, and execution reasons—every time.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="content-section">
        <div className="section-content">
          <div className="features-grid">
            <div className="feature-module">
              <div className="feature-icon">🧮</div>
              <h3>Statistical Learning Core</h3>
              <p>Rolling windows, regime switching, Bayesian updates.</p>
              <ul className="feature-details">
                <li>Adaptive lookback periods</li>
                <li>Regime change detection</li>
                <li>Continuous model refinement</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">📈</div>
              <h3>Signal Stack</h3>
              <p>Trend, mean-reversion, breakout filters; ensemble scoring.</p>
              <ul className="feature-details">
                <li>Multi-timeframe analysis</li>
                <li>Weighted signal combination</li>
                <li>Confidence scoring</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">🛡️</div>
              <h3>Risk Matrix</h3>
              <p>ATR-based stops, volatility budget, circuit-breakers on news.</p>
              <ul className="feature-details">
                <li>Dynamic position sizing</li>
                <li>Volatility-adjusted stops</li>
                <li>News event filters</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">⚡</div>
              <h3>Execution Layer</h3>
              <p>FIX/REST, OCO brackets, slippage/latency monitor.</p>
              <ul className="feature-details">
                <li>Sub-second execution</li>
                <li>Smart order routing</li>
                <li>Slippage optimization</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">🎛️</div>
              <h3>Portfolio Controls</h3>
              <p>Max trades/day, cool-off timers, weekend lockout.</p>
              <ul className="feature-details">
                <li>Daily trade limits</li>
                <li>Recovery periods</li>
                <li>Schedule management</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">📊</div>
              <h3>Dashboard</h3>
              <p>Live P/L, exposure, win-rate, MFE/MAE, equity curve.</p>
              <ul className="feature-details">
                <li>Real-time metrics</li>
                <li>Performance analytics</li>
                <li>Risk monitoring</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">📋</div>
              <h3>Audit Trail</h3>
              <p>Immutable logs, CSV/JSON export, broker reconciliation.</p>
              <ul className="feature-details">
                <li>Complete trade history</li>
                <li>Regulatory compliance</li>
                <li>Export capabilities</li>
              </ul>
            </div>

            <div className="feature-module">
              <div className="feature-icon">🚨</div>
              <h3>Automation Guards</h3>
              <p>Failsafe halt, manual override, heartbeat monitor.</p>
              <ul className="feature-details">
                <li>Emergency stops</li>
                <li>System health checks</li>
                <li>Manual intervention</li>
              </ul>
            </div>
          </div>

          <div className="section-actions">
            <a href="/product" className="cta-primary">
              <span>Explore the Product</span>
              <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}