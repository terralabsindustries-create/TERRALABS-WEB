import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      {/* Navigation Header */}
      <nav className="brand-nav">
        <div className="nav-content">
          <div className="brand-logo">
            <a href="/" className="logo-link">
              <span className="logo-icon">◈</span>
              <span className="logo-text">AURELIUS</span>
            </a>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/features" className="nav-link">Features</a>
            <a href="/performance" className="nav-link">Performance</a>
            <a href="/research" className="nav-link">Research</a>
            <a href="/pricing" className="nav-link">Pricing</a>
            <a href="/partners" className="nav-link">Partners</a>
            <a href="/contact" className="nav-link">Contact / Access</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">◈</span>
              <span className="logo-text">AURELIUS</span>
            </div>
            <p className="footer-tagline">Trade with discipline, not drama.</p>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <a href="/">Product</a>
            <a href="/features">Features</a>
            <a href="/performance">Performance</a>
            <a href="/onboarding">Get Started</a>
          </div>
          
          <div className="footer-section">
            <h4>Business</h4>
            <a href="/pricing">Pricing</a>
            <a href="/partners">Partners</a>
            <a href="/docs">Documentation</a>
            <a href="/security">Security</a>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/blog">Insights</a>
            <a href="/contact">Contact</a>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <a href="/legal/terms">Terms</a>
            <a href="/legal/privacy">Privacy</a>
            <a href="/legal/risk">Risk Disclosure</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Terralabs Industries.</p>
          <p className="footer-disclaimer">
            <strong>Compliance Disclaimer:</strong> We are a software provider. We never manage or hold client funds. 
            All money remains in your broker account (MetaTrader 5), accessible and withdrawable by you at any time.
            Trading involves substantial risk of loss. Past performance is not indicative of future results.
          </p>
        </div>
      </footer>
    </div>
  );
}