import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Cookie, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface CookiePolicyProps {
  onBack: () => void;
}

export function CookiePolicy({ onBack }: CookiePolicyProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add swipe-back gesture for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      // Detect swipe from left edge (within first 50px)
      if (touchStartX.current < 50) {
        const swipeDistance = touchEndX.current - touchStartX.current;
        // If swiped right more than 100px, go back
        if (swipeDistance > 100) {
          onBack();
        }
      }
    };
    
    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onBack]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="legal-document-page">
      <div className="legal-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="legal-header-content">
          <Cookie size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Cookie Policy</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
        </div>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. WHAT ARE COOKIES?</h2>
          <p>Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.</p>
        </section>

        <section className="legal-section">
          <h2>2. TYPES OF COOKIES WE USE</h2>
          
          <h3>2.1 Essential Cookies (Strictly Necessary)</h3>
          <p>These cookies are required for the website to function properly. You cannot disable them.</p>
          <ul>
            <li><strong>Session Cookies:</strong> Keep you logged in during your visit;</li>
            <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access;</li>
            <li><strong>Load Balancing Cookies:</strong> Distribute traffic across our servers.</li>
          </ul>

          <h3>2.2 Functional Cookies</h3>
          <p>These cookies remember your preferences and choices:</p>
          <ul>
            <li>Language preferences;</li>
            <li>Dashboard layout settings;</li>
            <li>Trading engine preferences;</li>
            <li>Chart display settings.</li>
          </ul>

          <h3>2.3 Analytics Cookies</h3>
          <p>We use analytics cookies to understand how visitors use our website:</p>
          <ul>
            <li><strong>Google Analytics:</strong> Website traffic and user behavior;</li>
            <li><strong>Heatmaps:</strong> Understand page interaction patterns;</li>
            <li><strong>Session Recording:</strong> Analyze user experience (anonymized).</li>
          </ul>

          <h3>2.4 Marketing/Advertising Cookies</h3>
          <p>These cookies track your browsing to show relevant ads:</p>
          <ul>
            <li>Retargeting campaigns;</li>
            <li>Conversion tracking;</li>
            <li>Social media advertising (Facebook, LinkedIn, Twitter);</li>
            <li>Affiliate program tracking.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. THIRD-PARTY COOKIES</h2>
          <p>We use services from third parties who may set their own cookies:</p>
          <ul>
            <li><strong>Google Analytics:</strong> Website analytics (_ga, _gid, _gat);</li>
            <li><strong>Facebook Pixel:</strong> Advertising and remarketing;</li>
            <li><strong>LinkedIn Insight Tag:</strong> Professional audience targeting;</li>
            <li><strong>Stripe/PayPal:</strong> Payment processing;</li>
            <li><strong>Intercom/Zendesk:</strong> Customer support chat;</li>
            <li><strong>Cloudflare:</strong> Security and performance.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. HOW WE USE COOKIES</h2>
          <ul>
            <li>Authenticate your login and maintain sessions;</li>
            <li>Remember your preferences and settings;</li>
            <li>Analyze website performance and user behavior;</li>
            <li>Improve our services and user experience;</li>
            <li>Deliver personalized content and recommendations;</li>
            <li>Track conversions from marketing campaigns;</li>
            <li>Prevent fraud and enhance security;</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. COOKIE CONSENT</h2>
          
          <h3>5.1 UAE Compliance</h3>
          <p>Under UAE data protection regulations, we obtain your consent before setting non-essential cookies.</p>

          <h3>5.2 EU Compliance (GDPR)</h3>
          <p>For EU visitors, we comply with the ePrivacy Directive and GDPR:</p>
          <ul>
            <li>Cookie consent banner displayed on first visit;</li>
            <li>Granular consent options for different cookie categories;</li>
            <li>Ability to withdraw consent at any time;</li>
            <li>Non-essential cookies only set after explicit consent.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. MANAGING COOKIES</h2>
          
          <h3>6.1 Browser Settings</h3>
          <p>You can control cookies through your browser settings:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
            <li><strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and Site Permissions</li>
          </ul>

          <h3>6.2 Opt-Out Links</h3>
          <ul>
            <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
            <li><strong>Facebook:</strong> Ad Settings in your Facebook account</li>
            <li><strong>LinkedIn:</strong> Ad Preferences in LinkedIn settings</li>
          </ul>

          <h3>6.3 Impact of Disabling Cookies</h3>
          <p>Disabling cookies may affect website functionality:</p>
          <ul>
            <li>You may need to log in repeatedly;</li>
            <li>Preferences and settings won't be saved;</li>
            <li>Some features may not work properly;</li>
            <li>Personalized experience will be limited.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. COOKIE RETENTION PERIODS</h2>
          <ul>
            <li><strong>Session Cookies:</strong> Deleted when you close your browser;</li>
            <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years);</li>
            <li><strong>Analytics Cookies:</strong> Usually 2 years;</li>
            <li><strong>Marketing Cookies:</strong> Usually 90 days to 1 year.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. UPDATES TO THIS POLICY</h2>
          <p>We may update this Cookie Policy to reflect changes in technology or regulations. Updates will be posted on this page with a revised "Last Updated" date.</p>
        </section>

        <section className="legal-section">
          <h2>9. CONTACT US</h2>
          <div className="contact-box">
            <p>Questions about our use of cookies?</p>
            <p>Email: privacy@terralabs.ae</p>
            <p>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
        </section>

        <div className="legal-footer-signature">
          <p><strong>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</strong></p>
          <p>Effective Date: December 28, 2025</p>
        </div>
      </div>
      
      {showBackToTop && (
        <button className={`back-to-top-button ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}