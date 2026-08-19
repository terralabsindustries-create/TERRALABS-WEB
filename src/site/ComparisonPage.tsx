import React, { useState } from 'react';
import { AureliusSocialCard } from './components/AureliusSocialCard';
const originalImage = "/images/figma-placeholder.svg";
import { ArrowLeftRight, Check } from 'lucide-react';

/**
 * Comparison Page
 * Shows the original design side-by-side with our implementation
 */

export default function ComparisonPage() {
  const [showOriginal, setShowOriginal] = useState(true);
  const [showImplementation, setShowImplementation] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0612] via-[#1a1625] to-[#0a0612] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 700 }}>
            Design Comparison
          </h1>
          <p className="text-white/60 text-lg">
            Original design vs. React implementation
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-[#FF5C39]"
              />
              <span className="text-white">Show Original Design</span>
            </label>

            <div className="w-px h-6 bg-white/20" />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showImplementation}
                onChange={(e) => setShowImplementation(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-[#FF5C39]"
              />
              <span className="text-white">Show Implementation</span>
            </label>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Original Design */}
            {showOriginal && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-2xl" style={{ fontWeight: 600 }}>
                    Original Design
                  </h2>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    Reference
                  </span>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 aspect-square">
                  <img 
                    src={originalImage} 
                    alt="Original Aurelius-1 promotional design"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <h3 className="text-white" style={{ fontWeight: 600 }}>
                    Design Elements:
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>Dark background with orange gradient orbs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>Rounded border card with glassmorphism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>Orange gradient on "AURELIUS-1" heading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>Multi-line gradient tagline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>TerraLabs branding with logo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5C39] flex-shrink-0 mt-0.5" />
                      <span>Two-column layout (60/40 split)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Implementation */}
            {showImplementation && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-2xl" style={{ fontWeight: 600 }}>
                    React Implementation
                  </h2>
                  <span className="px-3 py-1 bg-[#FF5C39]/20 text-[#FF5C39] rounded-full text-sm">
                    Live Component
                  </span>
                </div>
                
                <div className="aspect-square">
                  <AureliusSocialCard aspectRatio="1:1" size="large" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <h3 className="text-white" style={{ fontWeight: 600 }}>
                    Implementation Features:
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Animated gradient orbs with pulse effect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Motion.js scroll animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Fully responsive (mobile to desktop)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Multiple aspect ratios (1:1, 16:9)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Customizable via React props</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Exportable for social media</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Side-by-side comparison toggle */}
          {showOriginal && showImplementation && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
                <ArrowLeftRight className="w-5 h-5 text-[#FF5C39]" />
                <span className="text-white">
                  Swipe or scroll to compare both designs
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl text-white text-center mb-8" style={{ fontWeight: 700 }}>
            Feature Comparison
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-white">Feature</th>
                  <th className="px-6 py-4 text-center text-white">Original Design</th>
                  <th className="px-6 py-4 text-center text-white">Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { feature: 'Dark Theme', original: true, implementation: true },
                  { feature: 'Orange-Red Gradients', original: true, implementation: true },
                  { feature: 'Glassmorphism Effects', original: true, implementation: true },
                  { feature: 'Typography Hierarchy', original: true, implementation: true },
                  { feature: 'TerraLabs Branding', original: true, implementation: true },
                  { feature: 'Responsive Design', original: false, implementation: true },
                  { feature: 'Animated Elements', original: false, implementation: true },
                  { feature: 'Multiple Variants', original: false, implementation: true },
                  { feature: 'Customizable Props', original: false, implementation: true },
                  { feature: 'Social Media Export', original: false, implementation: true },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white/80">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.original ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.implementation ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-12 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#showcase"
              className="px-8 py-4 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white hover:shadow-lg hover:shadow-[#FF5C39]/50 transition-all"
              style={{ fontWeight: 600 }}
            >
              View Interactive Showcase
            </a>
            
            <a
              href="#promo"
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
              style={{ fontWeight: 600 }}
            >
              View Full Promo Page
            </a>
          </div>

          <p className="text-white/60 text-sm">
            Both components are production-ready and fully customizable
          </p>
        </div>
      </div>
    </div>
  );
}
