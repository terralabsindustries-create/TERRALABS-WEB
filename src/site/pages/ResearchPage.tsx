import HeroOrb from "../components/HeroOrb";

export default function ResearchPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">RESEARCH & DEVELOPMENT</span>
          </div>
          
          <div className="hero-title-orb-container">
            <div className="hero-content">
              <h1 className="page-title">
                <span className="title-line">Continuous Research.</span>
                <span className="title-line">Continuous Refinement.</span>
              </h1>
              <div className="hero-subtitle">
                <p>Our Adaptive Intelligence Framework evolves through rigorous research, backtesting 100 years of market data and continuous live refinement.</p>
              </div>
            </div>
            <HeroOrb />
          </div>
        </div>
      </section>

      {/* Research Methodology */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Research Methodology</h2>
          <div className="research-grid">
            <div className="research-card">
              <div className="research-icon">📊</div>
              <h3>Historical Data Analysis</h3>
              <p>Reverse-engineering 100 years of market data to identify persistent patterns and regime changes in gold markets.</p>
              <div className="research-details">
                <div className="detail-item">• Tick-level data analysis since 1971</div>
                <div className="detail-item">• Cross-session volatility patterns</div>
                <div className="detail-item">• Macro event correlation studies</div>
                <div className="detail-item">• Regime switching detection</div>
              </div>
            </div>

            <div className="research-card">
              <div className="research-icon">🧠</div>
              <h3>Adaptive Cognitive Neural Engines</h3>
              <p>Advanced neural networks testing thousands of permutations and probabilities to optimize signal generation.</p>
              <div className="research-details">
                <div className="detail-item">• Multi-timeframe pattern recognition</div>
                <div className="detail-item">• Ensemble learning methods</div>
                <div className="detail-item">• Bayesian probability updates</div>
                <div className="detail-item">• Self-correcting algorithms</div>
              </div>
            </div>

            <div className="research-card">
              <div className="research-icon">🔄</div>
              <h3>Continuous Framework Refinement</h3>
              <p>The framework continuously refines itself based on back data analysis and live market inputs for optimal performance.</p>
              <div className="research-details">
                <div className="detail-item">• Real-time model adaptation</div>
                <div className="detail-item">• Performance feedback loops</div>
                <div className="detail-item">• Market condition clustering</div>
                <div className="detail-item">• Predictive accuracy optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Timeline */}
      <section className="content-section timeline-section">
        <div className="section-content">
          <h2 className="section-title">Research Evolution</h2>
          <div className="research-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">2020</div>
              <div className="timeline-content">
                <h3>Foundation Research</h3>
                <p>Initial analysis of gold market microstructure and development of core statistical models for regime detection.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2021</div>
              <div className="timeline-content">
                <h3>Pattern Recognition Development</h3>
                <p>Implementation of advanced machine learning algorithms for multi-timeframe pattern recognition and signal generation.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2022</div>
              <div className="timeline-content">
                <h3>Adaptive Intelligence Framework</h3>
                <p>Launch of the first iteration of our self-refining framework with real-time market adaptation capabilities.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2023</div>
              <div className="timeline-content">
                <h3>Live Market Integration</h3>
                <p>Deployment of live trading systems with continuous learning from market feedback and performance optimization.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2024</div>
              <div className="timeline-content">
                <h3>Neural Engine Enhancement</h3>
                <p>Integration of advanced neural networks for probability assessment and multi-dimensional market analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Insights */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Key Research Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-number">87%</div>
              <div className="insight-label">Pattern Persistence</div>
              <p>Key gold trading patterns show 87% consistency across different market regimes over the past 50 years.</p>
            </div>
            <div className="insight-card">
              <div className="insight-number">12.3x</div>
              <div className="insight-label">Volatility Clustering</div>
              <p>Volatility clusters in gold markets show 12.3x higher predictive accuracy when properly identified.</p>
            </div>
            <div className="insight-card">
              <div className="insight-number">94%</div>
              <div className="insight-label">Regime Detection</div>
              <p>Our algorithms achieve 94% accuracy in detecting market regime changes within 3-5 trading sessions.</p>
            </div>
            <div className="insight-card">
              <div className="insight-number">2.8s</div>
              <div className="insight-label">Signal Generation</div>
              <p>Average time from market data ingestion to actionable signal generation across all timeframes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Publications */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Research Publications & Whitepapers</h2>
          <div className="publications-grid">
            <div className="publication-card">
              <div className="publication-date">2024</div>
              <h3>Adaptive Intelligence in Gold Market Microstructure</h3>
              <p>Comprehensive analysis of how machine learning can identify and exploit microstructural inefficiencies in XAU/USD markets.</p>
              <a href="#" className="publication-link">Read Whitepaper →</a>
            </div>
            <div className="publication-card">
              <div className="publication-date">2023</div>
              <h3>Regime Switching Models for Precious Metal Trading</h3>
              <p>Statistical framework for detecting and trading around major regime changes in gold market behavior patterns.</p>
              <a href="#" className="publication-link">Read Whitepaper →</a>
            </div>
            <div className="publication-card">
              <div className="publication-date">2023</div>
              <h3>Neural Networks in High-Frequency Gold Trading</h3>
              <p>Implementation and performance analysis of deep learning models for ultra-low latency gold signal generation.</p>
              <a href="#" className="publication-link">Read Whitepaper →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="research-cta">
            <h2>Interested in Our Research?</h2>
            <p>Get access to our latest research insights, whitepapers, and methodology documentation.</p>
            <div className="section-actions">
              <a href="/blog" className="cta-primary">
                <span>Read Our Research</span>
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact" className="cta-secondary">
                <span>Contact Research Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}