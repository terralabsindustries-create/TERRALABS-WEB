import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    useCase: 'subscription',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">CONTACT / ACCESS</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Contact Us</span>
            <span className="title-line">or Access Platform</span>
          </h1>
          
          <p className="page-subtitle">Get in touch with our team or log in to access your trading platform and reports.</p>
        </div>
      </section>

      {/* Access Platform Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="access-platform">
            <h2 className="section-title">Access Platform</h2>
            <div className="access-options">
              <div className="access-card">
                <div className="access-icon">👤</div>
                <h3>Client Login</h3>
                <p>Access your subscription dashboard, profit-share reports, and payment history.</p>
                <div className="access-features">
                  <div className="feature-item">✓ Real-time performance tracking</div>
                  <div className="feature-item">✓ Subscription management</div>
                  <div className="feature-item">✓ Payment history & invoicing</div>
                  <div className="feature-item">✓ Risk parameter settings</div>
                </div>
                <a href="#" className="access-btn primary">
                  <span>Client Portal</span>
                  <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              
              <div className="access-card">
                <div className="access-icon">🏷️</div>
                <h3>Partner Portal</h3>
                <p>White-label partners can access admin dashboard and client management tools.</p>
                <div className="access-features">
                  <div className="feature-item">✓ Client onboarding management</div>
                  <div className="feature-item">✓ Revenue sharing reports</div>
                  <div className="feature-item">✓ Brand customization tools</div>
                  <div className="feature-item">✓ Multi-tenant administration</div>
                </div>
                <a href="#" className="access-btn secondary">
                  <span>Partner Portal</span>
                  <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="payment-gateway-note">
              <h4>Integrated Payment Gateway</h4>
              <p>Secure payments powered by Stripe and PayPal. All transactions are encrypted and PCI DSS compliant.</p>
              <div className="payment-logos">
                <span className="payment-logo">Stripe</span>
                <span className="payment-logo">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="content-section">
        <div className="section-content">
          <div className="contact-layout">
            <div className="contact-form-container">
              <h2>Send us a message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="useCase">Use Case *</label>
                  <select
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="subscription">Subscription</option>
                    <option value="profit-share">Profit-Share</option>
                    <option value="white-label">White-Label</option>
                    <option value="demo">Demo Request</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your trading requirements..."
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="form-submit">
                  <span>Send Message</span>
                  <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="contact-method">
                <h3>Instant Connect</h3>
                <p>Get immediate answers to your questions.</p>
                <div className="contact-buttons">
                  <a href="https://wa.me/1234567890" className="contact-btn whatsapp">
                    <span className="btn-icon">📱</span>
                    WhatsApp
                  </a>
                  <a href="https://calendly.com/aurelius-demo" className="contact-btn calendar">
                    <span className="btn-icon">📅</span>
                    Book Demo
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <h3>Support Hours</h3>
                <p>Dubai timezone (UTC+4)</p>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="contact-method">
                <h3>Response Time</h3>
                <div className="response-times">
                  <div className="response-item">
                    <span className="response-type">WhatsApp</span>
                    <span className="response-time">Within 1 hour</span>
                  </div>
                  <div className="response-item">
                    <span className="response-type">Email</span>
                    <span className="response-time">Within 4 hours</span>
                  </div>
                  <div className="response-item">
                    <span className="response-type">Demo Booking</span>
                    <span className="response-time">Same day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="content-section">
        <div className="section-content">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly can I get started?</h3>
              <p>Most clients are trading within 24-48 hours of signup, depending on broker integration and KYC completion.</p>
            </div>
            <div className="faq-item">
              <h3>Do you custody funds?</h3>
              <p>No, we never touch client funds. You maintain full control of your capital with your licensed broker.</p>
            </div>
            <div className="faq-item">
              <h3>What's the minimum account size?</h3>
              <p>We recommend $10,000 minimum for proper risk management, though smaller accounts can be accommodated.</p>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}