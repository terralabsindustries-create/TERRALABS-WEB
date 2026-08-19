import React, { useState, useEffect } from 'react';
import { AureliusPromoBanner } from './components/AureliusPromoBanner';
import { AureliusSocialCard } from './components/AureliusSocialCard';
import { Download } from 'lucide-react';

/**
 * Showcase Page - Demonstrates both promotional components
 * This page shows the full banner and social card variants
 */

export default function ShowcasePage() {
  const [selectedCard, setSelectedCard] = useState<'1:1' | '16:9'>('1:1');
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0612] via-[#1a1625] to-[#0a0612]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1625]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-xl md:text-2xl" style={{ fontWeight: 700 }}>
              Aurelius-1 Promotional Assets
            </h1>
            <div className="flex gap-4">
              <a
                href="#banner"
                className="text-white/70 hover:text-[#FF5C39] transition-colors text-sm"
              >
                Banner
              </a>
              <a
                href="#social"
                className="text-white/70 hover:text-[#FF5C39] transition-colors text-sm"
              >
                Social Cards
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section id="banner" className="py-12">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl text-white" style={{ fontWeight: 700 }}>
              Full Width Promotional Banner
            </h2>
            <p className="text-white/60 text-lg">
              Perfect for landing pages, hero sections, and product announcements
            </p>
          </div>
        </div>
        
        <AureliusPromoBanner variant="full" showLogo={true} />
        
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-white text-lg mb-4" style={{ fontWeight: 600 }}>
              Usage:
            </h3>
            <pre className="text-white/70 text-sm overflow-x-auto bg-black/30 p-4 rounded-lg">
{`import { AureliusPromoBanner } from './components/AureliusPromoBanner';

<AureliusPromoBanner variant="full" showLogo={true} />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Social Card Section */}
      <section id="social" className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl text-white" style={{ fontWeight: 700 }}>
              Social Media Cards
            </h2>
            <p className="text-white/60 text-lg">
              Optimized for Instagram, Facebook, Twitter, and LinkedIn
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-4xl mx-auto mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aspect Ratio Selector */}
              <div>
                <label className="text-white/80 text-sm mb-3 block">
                  Aspect Ratio
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCard('1:1')}
                    className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                      selectedCard === '1:1'
                        ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    1:1 Square
                    <span className="block text-xs opacity-70 mt-1">
                      Instagram / Facebook
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedCard('16:9')}
                    className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                      selectedCard === '16:9'
                        ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    16:9 Wide
                    <span className="block text-xs opacity-70 mt-1">
                      Twitter / LinkedIn
                    </span>
                  </button>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-white/80 text-sm mb-3 block">
                  Size
                </label>
                <div className="flex gap-3">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 px-4 py-3 rounded-lg transition-all capitalize ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <div className="max-w-4xl mx-auto mb-8">
            <AureliusSocialCard 
              aspectRatio={selectedCard} 
              size={selectedSize}
            />
          </div>

          {/* Download Instructions */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FF5C39]/10 to-[#FF3D1A]/10 border border-[#FF5C39]/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF5C39] to-[#FF3D1A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-lg mb-2" style={{ fontWeight: 600 }}>
                    How to Export for Social Media
                  </h3>
                  <ol className="text-white/70 space-y-2 text-sm">
                    <li>1. Right-click on the card above</li>
                    <li>2. Select "Save as image" or take a screenshot</li>
                    <li>3. Use browser dev tools to adjust dimensions if needed</li>
                    <li>4. Recommended sizes:</li>
                    <ul className="ml-6 mt-2 space-y-1 text-white/60">
                      <li>• Instagram/Facebook: 1080x1080px (1:1)</li>
                      <li>• Twitter: 1200x675px (16:9)</li>
                      <li>• LinkedIn: 1200x627px (close to 16:9)</li>
                    </ul>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="max-w-4xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-white text-lg mb-4" style={{ fontWeight: 600 }}>
              Usage:
            </h3>
            <pre className="text-white/70 text-sm overflow-x-auto bg-black/30 p-4 rounded-lg">
{`import { AureliusSocialCard } from './components/AureliusSocialCard';

// Square for Instagram/Facebook
<AureliusSocialCard aspectRatio="1:1" size="medium" />

// Wide for Twitter/LinkedIn
<AureliusSocialCard aspectRatio="16:9" size="medium" />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-white text-center mb-12" style={{ fontWeight: 700 }}>
              Component Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Fully Responsive',
                  description: 'Optimized for all screen sizes from mobile to desktop',
                  icon: '📱'
                },
                {
                  title: 'Animated Effects',
                  description: 'Smooth motion animations and gradient transitions',
                  icon: '✨'
                },
                {
                  title: 'Brand Consistent',
                  description: 'Matches your orange-red color scheme perfectly',
                  icon: '🎨'
                },
                {
                  title: 'Easy Integration',
                  description: 'Drop into any React component with simple props',
                  icon: '🔧'
                },
                {
                  title: 'High Performance',
                  description: 'GPU-accelerated with optimized rendering',
                  icon: '⚡'
                },
                {
                  title: 'Social Ready',
                  description: 'Export directly to all major social platforms',
                  icon: '🚀'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#FF5C39]/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-white text-xl mb-2" style={{ fontWeight: 600 }}>
                    {feature.title}
                  </h3>
                  <p className="text-white/60">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            Created for TerraLabs Industries • Aurelius-1 Trading Engine
          </p>
        </div>
      </footer>
    </div>
  );
}
