import React from 'react';

// Import director image
const director1Image = "/images/figma-placeholder.svg";
const director2Image = "/images/figma-placeholder.svg";
const director3Image = "/images/figma-placeholder.svg";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Director {
  id: number;
  name: string;
  title: "Chief Executive Officer & Chief Technology Officer" | "Entrepreneur, Strategic Backer & Co-Founder";
  description: string;
  expertise: string[];
  imageUrl?: string;
  tagline?: string;
}

const directors: Director[] = [
  {
    id: 1,
    name: "Jyothish Vanaja Rajendran",
    title: "Chief Executive Officer & Chief Technology Officer",
    description: "Visionary technologist and serial entrepreneur pioneering AI-driven trading engines with mastery over execution science, system architecture, and enterprise infrastructure. Grounded in advanced computational systems and data science from early exposure to technology ecosystems, bridging business strategy with cutting-edge technical innovation. Since early 2000s, architecting multi-industry ventures across fintech, AI, blockchain (WEB 3.0), logistics, F&B, construction, and sustainable living infrastructure spanning India, UAE, Australia, and Southeast Asia. Steering TERRALABS' complete technology stack and strategic direction—orchestrating the cognitive intelligence behind Pythagoras Stardust™ in production while driving frontier research through Large Reasoning Models, neural algorithmic trading frameworks, and next-generation execution systems. Co-founder of Metawire (Blockchain Technology & Payment Gateways) and GastroLabs www.gastrolabs.xyz, with a civilization-scale vision focused on capital efficiency, AI-powered market intelligence, and sustainable, longevity-oriented living systems.",
    expertise: ["AI & Machine Learning", "Trading Algorithms", "System Architecture", "Strategic Leadership", "Financial Technology", "Multi-Industry Innovation"],
    imageUrl: director1Image,
    tagline: "The man orchestrating technology and strategy from vision to execution"
  },
  {
    id: 3,
    name: "Renjith Raj",
    title: "Entrepreneur, Strategic Backer & Co-Founder",
    description: "Strategic capital partner and institutional network architect driving TERRALABS' market positioning and credibility. Multi-disciplinary Entrepreneur operating Industrial printing warehouses, Chain of Fitness units, Printing Material Supply chain. Orchestrating high-value relationships with institutional investors, regulatory bodies, and strategic partners across UAE and international markets. Expert in capital structuring, public positioning, and building institutional trust at scale.",
    expertise: ["Capital Strategy", "Institutional Networks", "Public Relations", "Strategic Partnerships"],
    imageUrl: director3Image,
    tagline: "The man behind capital, credibility and Public Positioning"
  }
];

// Define keyframes animation CSS
const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export function BoardOfDirectors() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: fadeInUpKeyframes }} />
      <div className="relative" style={{ padding: '2rem 0 2rem 0', minHeight: 'auto' }}>
        {/* Transparent Orbs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div 
            className="absolute" 
            style={{
              top: '10%',
              left: '10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 92, 57, 0.15) 0%, rgba(255, 92, 57, 0.05) 40%, transparent 70%)',
              filter: 'blur(60px)',
              borderRadius: '50%',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute" 
            style={{
              bottom: '20%',
              right: '15%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255, 61, 26, 0.12) 0%, rgba(255, 61, 26, 0.04) 40%, transparent 70%)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute" 
            style={{
              top: '50%',
              right: '5%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 92, 57, 0.1) 0%, rgba(255, 92, 57, 0.03) 40%, transparent 70%)',
              filter: 'blur(70px)',
              borderRadius: '50%',
              animation: 'float 18s ease-in-out infinite'
            }}
          />
        </div>

        {/* Header Section - Matching Hero Style */}
        <div className="max-w-7xl mx-auto mb-8 md:mb-16 text-center px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          {/* Decorative Orange Line */}
          <div style={{
            width: 'clamp(50px, 10vw, 80px)',
            height: 'clamp(3px, 0.5vw, 4px)',
            background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
            margin: '0 auto clamp(1rem, 3vw, 2rem) auto',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(255, 92, 57, 0.5)'
          }} />
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 8rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em',
            textAlign: 'center',
            margin: '0 auto 1.5rem auto',
            padding: '0 1rem',
            color: '#FFFFFF'
          }}>
            <span style={{ color: '#FFFFFF' }}>Board of </span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Directors</span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.</span>
          </h1>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            padding: '0 1rem',
            lineHeight: '1.7'
          }}>
            Long-term institutional vision to design and deploy intelligent infrastructure that underpins the evolution of enterprises, markets, and human-scale systems worldwide.
          </p>
        </div>

        {/* Directors Showcase */}
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          {directors.map((director, index) => (
            <div
              key={director.id}
              className="group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Premium Card - Reference Design Style */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#FF5C39]/30 hover:border-[#FF5C39]/50 transition-all duration-500 backdrop-blur-2xl" style={{
                background: 'rgba(10, 10, 10, 0.4)'
              }}>
                {/* Orange Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF5C39]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF5C39]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF5C39]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF5C39]" />

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Panel - Shows FIRST on mobile, second on desktop */}
                  <div className="relative h-[350px] sm:h-[400px] md:h-auto overflow-hidden order-first md:order-last">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={director.imageUrl}
                        alt={director.name}
                        className={`w-full h-full object-cover ${director.id === 3 ? 'scale-[1.2] object-[85%_10%]' : 'object-[center_0%] translate-y-[-1cm] md:scale-[1.2] md:translate-y-[1cm] md:object-center'}`}
                      />
                      {/* Dramatic Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                      
                      {/* Orange Accent Glow */}
                      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#FF5C39]/20 blur-[100px] rounded-full" />
                    </div>

                    {/* Floating Name Tag */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 backdrop-blur-2xl border border-[#FF5C39]/20 rounded-xl md:rounded-2xl p-4 md:p-6 max-w-[calc(100%-2rem)] md:max-w-xs" style={{
                      background: 'rgba(0, 0, 0, 0.15)'
                    }}>
                      <h3 className="text-lg md:text-2xl text-white mb-2">{director.name}</h3>
                      <div className="w-10 md:w-12 h-1 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] mb-2 md:mb-3" />
                      <p className="text-[#FF5C39] text-xs md:text-sm uppercase tracking-wider mb-2">{director.title}</p>
                      {director.id === 1 && (
                        <p className="text-[#FF5C39] text-xs md:text-sm tracking-wide mb-2">
                          CEO & CTO • AI Pioneer • Systems Architect • Serial Entrepreneur
                        </p>
                      )}
                      {director.tagline && (
                        <p className="text-gray-400 text-xs md:text-sm italic">"{director.tagline}"</p>
                      )}
                    </div>
                  </div>

                  {/* Content Panel - Shows SECOND on mobile, first on desktop */}
                  <div className="relative p-5 md:p-8 flex flex-col justify-between z-10 backdrop-blur-xl order-last md:order-first" style={{
                    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.3) 0%, rgba(15, 15, 15, 0.2) 50%, rgba(10, 10, 10, 0.1) 100%)'
                  }}>
                    {/* Top Label */}
                    <div>

                      {/* Main Headline */}
                      <div className="mb-4 md:mb-5">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 leading-tight">
                          <span className="text-white">{director.id === 3 ? "Capital" : "Technology & Leadership"}</span>
                          <br />
                          <span className="text-white">That </span>
                          <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] bg-clip-text text-transparent">Drives</span>
                          <br />
                          <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] bg-clip-text text-transparent">Results.</span>
                        </h2>
                        <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A]" style={{
                          clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)"
                        }} />
                      </div>

                      {/* Expertise Box */}
                      <div className="relative mb-4 md:mb-5">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF5C39] to-[#FF3D1A] rounded-tl-xl rounded-bl-xl md:rounded-tl-2xl md:rounded-bl-2xl" />
                        <div className="backdrop-blur-xl border border-[#FF5C39]/20 rounded-xl md:rounded-2xl p-3 md:p-4" style={{
                          background: 'rgba(0, 0, 0, 0.1)'
                        }}>
                          <div className="space-y-2">
                            <div className="px-4 md:px-6 py-3 md:py-4 bg-[#FF5C39]/15 border-2 border-[#FF5C39]/40 rounded-lg backdrop-blur-sm shadow-lg shadow-[#FF5C39]/20">
                              <p style={{
                                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.2,
                                color: '#FFFFFF'
                              }}>{director.title}</p>
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-gray-400 mt-3 md:mt-4 leading-relaxed">
                            {director.id === 3 ? (
                              "Strategic capital partner and institutional network architect driving TERRALABS' market positioning and credibility. Multi-disciplinary Entrepreneur operating Industrial printing warehouses, Chain of Fitness units, Printing Material Supply chain. Orchestrating high-value relationships with institutional investors, regulatory bodies, and strategic partners across UAE and international markets. Expert in capital structuring, public positioning, and building institutional trust at scale."
                            ) : (
                              director.description.split('www.gastrolabs.xyz').map((part, i, arr) => (
                                <span key={i}>
                                  {part}
                                  {i < arr.length - 1 && (
                                    <a
                                      href="https://www.gastrolabs.xyz"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#FF5C39] hover:text-[#FF3D1A] transition-colors underline"
                                    >
                                      www.gastrolabs.xyz
                                    </a>
                                  )}
                                </span>
                              ))
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-4 md:mt-5">
                      <h3 className="text-lg md:text-xl lg:text-2xl leading-tight mb-3 md:mb-4">
                        {director.id === 3 ? (
                          <span style={{ display: 'contents' }}>
                            <span className="text-white">Governing </span>
                            <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] bg-clip-text text-transparent">
                              capital
                            </span>
                            <br />
                            <span className="text-white">from discipline </span>
                            <span className="text-white">to durability.</span>
                            <svg className="inline-block w-6 h-6 md:w-8 md:h-8 ml-2 text-[#FF5C39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        ) : (
                          <span style={{ display: 'contents' }}>
                            <span className="text-white">Orchestrating </span>
                            <span className="bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] bg-clip-text text-transparent">
                              technology & vision
                            </span>
                            <br />
                            <span className="text-white">from systems </span>
                            <span className="text-white">to execution.</span>
                            <svg className="inline-block w-6 h-6 md:w-8 md:h-8 ml-2 text-[#FF5C39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        )}
                      </h3>
                      
                      {/* Contact Info */}
                      <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-4 text-xs md:text-sm">
                        <a href={`mailto:${director.id === 3 ? 'renjithrajrv@outlook.com' : 'jyothishvr@outlook.com'}`} className="flex items-center gap-2 text-[#FF5C39] hover:text-[#FF3D1A] transition-colors break-all">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span className="break-all">{director.id === 3 ? 'renjithrajrv@outlook.com' : 'jyothishvr@outlook.com'}</span>
                        </a>
                        <span className="text-gray-600 hidden md:inline">•</span>
                        <a
                          href={`tel:${director.id === 3 ? '+971547474781' : '+97154343484'}`}
                          className="flex items-center gap-2 text-[#FF5C39] hover:text-[#FF3D1A] transition-colors"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                          {director.id === 3 ? '+971 5 474747 81' : '+971 5 4343 4848'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Glow Border */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C39]/10 via-transparent to-[#FF3D1A]/10 blur-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}