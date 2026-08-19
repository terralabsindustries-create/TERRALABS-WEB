import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, Phone, ArrowLeft, CheckCircle, X, Shield, DollarSign } from 'lucide-react';
const terralabsLogo = "/images/TERRA_OPS_LOGO__2_-1.png";
import { CountryCodeSelector } from '../components/CountryCodeSelector';

const LivingOrbBackground = lazy(() => import('../components/LivingOrbBackground').then(module => ({ default: module.LivingOrbBackground })));

interface ClientLoginPageProps {
  onBack: () => void;
}

export const ClientLoginPage: React.FC<ClientLoginPageProps> = ({ onBack }) => {
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+971',
    phone: '',
    accountSize: '',
    engine: ''
  });

  // IMPORTANT: Replace this with your actual WhatsApp number (including country code)
  // Example: const WHATSAPP_NUMBER = '971501234567'; // UAE number
  const WHATSAPP_NUMBER = '971543434848'; // Company WhatsApp number

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format data for WhatsApp message
    const message = `NEW ACCESS REQUEST - TERRALABS

Name: ${formData.fullName}
Phone: ${formData.countryCode} ${formData.phone}
Account Size: ${formData.accountSize || 'Not specified'}
Engine: ${formData.engine}

Date: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success notification
    setShowNotification(true);

    // Open WhatsApp in new tab after short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        fullName: '',
        countryCode: '+971',
        phone: '',
        accountSize: '',
        engine: ''
      });
    }, 2000);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="client-login-page">
      {/* Enhanced Background Orbs - Same as Main Site */}
      <div className="optimized-background">
        <div className="main-orb" />
        <div className="accent-orb-1" />
        <div className="accent-orb-2" />
        
        {/* Ember Particles */}
        <div className="ember-particles">
          <div className="ember-1" />
          <div className="ember-2" />
          <div className="ember-3" />
          <div className="ember-4" />
          <div className="ember-5" />
          <div className="ember-6" />
        </div>
      </div>
      
      {/* Advanced Three.js Orbs (if device supports it) */}
      <Suspense fallback={null}>
        <LivingOrbBackground />
      </Suspense>

      {/* Beautiful Notification Modal */}
      {showNotification && (
        <div className="notification-overlay" onClick={closeNotification}>
          <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
            <button className="notification-close" onClick={closeNotification}>
              <X size={20} />
            </button>
            <div className="notification-icon">
              <CheckCircle size={48} />
            </div>
            <h3>Request Sent!</h3>
            <p>Opening WhatsApp now. Our team will respond within minutes.</p>
            <button className="notification-btn" onClick={closeNotification}>
              Perfect!
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button className="back-to-site" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back to Site</span>
      </button>

      {/* Main Content */}
      <div className="login-container" style={{
        padding: '2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Logo Section */}
        <div className="login-header" style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <img src={terralabsLogo} alt="TERRALABS" className="login-logo" style={{
            maxWidth: '200px',
            marginBottom: '1rem'
          }} />
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            marginBottom: '0.5rem'
          }}>Request Access</h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            opacity: 0.8
          }}>QUICK ACCESS TO OUR PROPRIETARY ENGINES</p>
        </div>

        {/* Form Container */}
        <div className="login-form-wrapper" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '1.5rem'
        }}>
          {/* Form */}
          <form className="login-form request-access-form" onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label htmlFor="fullName">
                <User size={18} />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '0' }}>
              <label htmlFor="phone">
                <Phone size={18} />
                <span>Phone Number</span>
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '0.75rem',
                width: '100%',
                alignItems: 'center'
              }}>
                <CountryCodeSelector
                  value={formData.countryCode}
                  onChange={(code) => setFormData({ ...formData, countryCode: code })}
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="50 123 4567"
                  style={{ flex: 1, minWidth: 0 }}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0' }}>
              <label htmlFor="accountSize">
                <DollarSign size={18} />
                <span>Account Size <span style={{ opacity: 0.6, fontWeight: 'normal' }}>(Optional)</span></span>
              </label>
              <select
                id="accountSize"
                name="accountSize"
                value={formData.accountSize}
                onChange={handleInputChange}
              >
                <option value="">Select your range</option>
                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                <option value="$500,000+">$500,000+</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '0' }}>
              <label htmlFor="engine">
                <Shield size={18} />
                <span>Trading Engine</span>
              </label>
              <select
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleInputChange}
                required
              >
                <option value="">Select preferred engine</option>
                <option value="Pythagoras Stardust™ (Gold Trading)">Pythagoras Stardust™ (Gold Trading)</option>
              </select>
            </div>

            <div className="form-notice" style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '1rem',
              background: 'rgba(255, 92, 57, 0.1)',
              border: '1px solid rgba(255, 92, 57, 0.3)',
              borderRadius: '8px',
              marginTop: '0.5rem'
            }}>
              <Shield size={20} />
              <div>
                <p className="notice-title">Instant WhatsApp Contact</p>
                <p className="notice-text">We'll respond within minutes during business hours.</p>
              </div>
            </div>

            <button type="submit" className="submit-btn" style={{
              marginTop: '0.5rem'
            }}>
              Send via WhatsApp
              <span>→</span>
            </button>
          </form>

          {/* Benefits Section */}
          <div className="registration-benefits" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: '800',
              marginBottom: '0.5rem'
            }}>Why Choose TERRALABS?</h3>
            <div className="benefits-list" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>100% equity safe in your MT5 account</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>No upfront costs - performance-based only</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>Complete transparency & real-time tracking</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} />
                <span>Instant support via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice" style={{
          textAlign: 'center',
          padding: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          opacity: 0.7
        }}>
          <Shield size={16} />
          <span>Secure & encrypted connection</span>
        </div>
      </div>
    </div>
  );
};