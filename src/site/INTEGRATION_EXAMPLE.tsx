/**
 * INTEGRATION EXAMPLES
 * 
 * This file shows various ways to integrate the Aurelius-1 Promotional Banner
 * into your existing trading application.
 */

import React from 'react';
import { AureliusPromoBanner } from './components/AureliusPromoBanner';
import { AureliusSocialCard } from './components/AureliusSocialCard';

// ============================================================================
// EXAMPLE 1: Add to existing App.tsx as a new section
// ============================================================================

export function Example1_AddToHomePage() {
  return (
    <div className="app">
      {/* Existing sections... */}
      
      {/* Add the promotional banner */}
      <AureliusPromoBanner variant="full" showLogo={true} />
      
      {/* Rest of your content... */}
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Create a dedicated promotional page
// ============================================================================

export function Example2_DedicatedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0612] via-[#1a1625] to-[#0a0612]">
      {/* Navigation */}
      <nav className="p-4 border-b border-white/10">
        <a href="/" className="text-white hover:text-[#FF5C39]">← Back to Home</a>
      </nav>

      {/* Promotional Content */}
      <AureliusPromoBanner variant="full" showLogo={true} />

      {/* Additional promotional content */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-white text-3xl mb-8">Why Choose Aurelius-1?</h2>
        {/* Add your content here */}
      </section>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Add as a modal/popup announcement
// ============================================================================

export function Example3_ModalAnnouncement() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white"
      >
        View Aurelius-1 Details
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-[#FF5C39] bg-black/50 rounded-full p-2"
            >
              ✕
            </button>
            <AureliusPromoBanner variant="full" showLogo={true} />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Use social card for marketing materials section
// ============================================================================

export function Example4_MarketingAssets() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-white text-3xl mb-8">Marketing Assets</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instagram/Facebook Card */}
        <div>
          <h3 className="text-white text-xl mb-4">Instagram / Facebook</h3>
          <AureliusSocialCard aspectRatio="1:1" size="medium" />
          <p className="text-white/60 text-sm mt-2">Right-click to save as image</p>
        </div>

        {/* Twitter/LinkedIn Card */}
        <div>
          <h3 className="text-white text-xl mb-4">Twitter / LinkedIn</h3>
          <AureliusSocialCard aspectRatio="16:9" size="medium" />
          <p className="text-white/60 text-sm mt-2">Right-click to save as image</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Add to navigation dropdown
// ============================================================================

export function Example5_NavigationIntegration() {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <nav className="bg-[#1a1625]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-8">
          <a href="/" className="text-white">Home</a>
          <a href="/features" className="text-white">Features</a>
          
          {/* Promotional dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="text-white hover:text-[#FF5C39] flex items-center gap-2">
              Aurelius-1
              <span className="text-xs">▼</span>
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-[#1a1625] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-4">
                  <AureliusSocialCard aspectRatio="16:9" size="small" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// EXAMPLE 6: Inline hero section replacement
// ============================================================================

export function Example6_HeroReplacement() {
  return (
    <main>
      {/* Replace existing hero with promotional banner */}
      <AureliusPromoBanner variant="full" showLogo={true} />

      {/* Continue with rest of page */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-white text-3xl mb-8">Features</h2>
        {/* Your existing features section */}
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 7: Scrolling announcement banner (compact version)
// ============================================================================

export function Example7_AnnouncementBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <p className="text-white">
            <span style={{ fontWeight: 700 }}>NEW:</span> Introducing Aurelius-1 - 
            Synthetic Intelligence meets Adaptive Neural Trading
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="/promo" 
              className="text-white underline hover:text-white/80"
            >
              Learn More
            </a>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-white/80"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Side panel integration
// ============================================================================

export function Example8_SidePanel() {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white px-4 py-8 rounded-l-xl shadow-lg hover:shadow-[#FF5C39]/50 transition-all z-40"
        style={{ fontWeight: 700, writingMode: 'vertical-rl' }}
      >
        AURELIUS-1
      </button>

      {/* Side panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-[#1a1625] border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-50 overflow-auto ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsPanelOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-[#FF5C39] text-2xl"
        >
          ✕
        </button>
        
        <div className="p-8">
          <AureliusSocialCard aspectRatio="1:1" size="large" />
          
          {/* Additional content */}
          <div className="mt-8 space-y-4">
            <h3 className="text-white text-2xl" style={{ fontWeight: 700 }}>
              Get Started Today
            </h3>
            <p className="text-white/70">
              Experience the future of automated gold trading with Aurelius-1.
            </p>
            <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white hover:shadow-lg transition-all">
              Begin Onboarding
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 9: Integrate into existing section with custom wrapper
// ============================================================================

export function Example9_CustomWrapper() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Custom background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF5C39]/5 to-transparent" />
      
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FF5C39]/20 rounded-full text-[#FF5C39] text-sm mb-4">
            New Product Launch
          </span>
          <h2 className="text-white text-4xl mb-4" style={{ fontWeight: 700 }}>
            Meet Our Latest Innovation
          </h2>
        </div>
      </div>

      {/* Promotional banner */}
      <AureliusPromoBanner variant="full" showLogo={true} />

      {/* Call to action */}
      <div className="container mx-auto px-4 mt-12 text-center relative z-10">
        <button className="px-8 py-4 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white hover:shadow-lg transition-all">
          Request Demo
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 10: Email template preview (screenshot for email campaigns)
// ============================================================================

export function Example10_EmailTemplate() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      <div className="text-center mb-6">
        <h1 className="text-gray-900 text-2xl mb-2">Introducing Aurelius-1</h1>
        <p className="text-gray-600">The Future of Gold Trading is Here</p>
      </div>

      {/* Use social card for email (screenshot this) */}
      <AureliusSocialCard aspectRatio="16:9" size="medium" />

      <div className="text-center mt-6">
        <a 
          href="https://www.terralabsindustries.com"
          className="inline-block px-8 py-3 bg-[#FF5C39] text-white rounded-full"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// QUICK SETUP GUIDE
// ============================================================================

/*

QUICK SETUP - 3 STEPS:

1. Import the component you want:
   import { AureliusPromoBanner } from './components/AureliusPromoBanner';
   // OR
   import { AureliusSocialCard } from './components/AureliusSocialCard';

2. Add it to your JSX:
   <AureliusPromoBanner variant="full" showLogo={true} />
   // OR
   <AureliusSocialCard aspectRatio="1:1" size="medium" />

3. Customize with props:
   - AureliusPromoBanner props:
     * variant: 'full' | 'compact'
     * showLogo: boolean

   - AureliusSocialCard props:
     * aspectRatio: '1:1' | '16:9'
     * size: 'small' | 'medium' | 'large'

That's it! You're ready to go.

*/
