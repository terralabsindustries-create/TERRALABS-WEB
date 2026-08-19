import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { CheckCircle, FileText, MessageCircle, Bot, ArrowRight } from 'lucide-react';

// Simplified Animated Card component
const AnimatedCard = React.memo(({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`animated-card ${className} ${isVisible ? 'visible' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease'
      }}
    >
      {children}
    </div>
  );
});

interface PricingSectionProps {
  onShowAgreement: (plan: any) => void;
  onShowEnterprise?: () => void;
}

interface EngineType {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface EngineSelectorProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
  engines: EngineType[];
  onScrollToCards?: () => void;
}

const EngineSelector = ({ selectedEngine, onEngineChange, engines, onScrollToCards }: EngineSelectorProps) => (
  <div className="engine-selector" style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    margin: '1.5rem auto',
    maxWidth: '800px',
    padding: '0 1rem',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none'
  }}>
    {engines.map(engine => (
      <button
        key={engine.id}
        className={`engine-btn ${selectedEngine === engine.id ? 'active' : ''}`}
        onClick={() => onEngineChange(engine.id)}
        style={{
          position: 'relative',
          flex: '1',
          maxWidth: '280px',
          padding: '1rem 1rem',
          borderRadius: '12px',
          border: selectedEngine === engine.id 
            ? '2px solid #9CFF2E' 
            : engine.status === 'coming-soon'
            ? '2px solid rgba(255, 92, 57, 0.2)'
            : '2px solid rgba(255, 92, 57, 0.3)',
          background: selectedEngine === engine.id
            ? 'linear-gradient(135deg, rgba(156, 255, 46, 0.15) 0%, rgba(156, 255, 46, 0.1) 100%)'
            : engine.status === 'coming-soon'
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          opacity: engine.status === 'coming-soon' ? 0.6 : 1,
          boxShadow: selectedEngine === engine.id
            ? '0 8px 32px rgba(156, 255, 46, 0.4)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Legacy Badge */}
        {engine.status === 'coming-soon' && (
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(120, 120, 120, 0.35)',
            color: 'rgba(255,255,255,0.65)',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '9px',
            fontWeight: 'bold',
            letterSpacing: '0.3px',
            textTransform: 'uppercase'
          }}>
            Legacy
          </span>
        )}

        {/* Engine Name */}
        <span className="engine-name" style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          fontWeight: '900',
          color: selectedEngine === engine.id ? '#9CFF2E' : '#ffffff',
          textAlign: 'center',
          lineHeight: '1.1',
          letterSpacing: '0.3px'
        }}>
          {engine.name}
        </span>

        {/* Engine Type */}
        <span className="engine-type" style={{
          fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
          fontWeight: '600',
          color: selectedEngine === engine.id 
            ? 'rgba(156, 255, 46, 0.8)' 
            : 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {engine.type}
        </span>
      </button>
    ))}
  </div>
);

export const PricingSection = React.memo(({ onShowAgreement, onShowEnterprise }: PricingSectionProps) => {
  const [selectedEngine, setSelectedEngine] = useState('pythagoras-stardust');
  const [selectedTier, setSelectedTier] = useState('gold');
  const pricingCardsRef = useRef<HTMLDivElement>(null);

  const engines = useMemo(() => [
    { id: 'pythagoras-stardust', name: 'Pythagoras Stardust™', type: 'XAU/USD Gold Trading', status: 'active' },
    { id: 'aurelius-1', name: 'Aurelius-1™', type: 'Gold Trading — Discontinued', status: 'coming-soon' }
  ], []);

  // Scroll to pricing cards function
  const scrollToPricingCards = useCallback(() => {
    if (pricingCardsRef.current) {
      const yOffset = -100; // Offset from top
      const element = pricingCardsRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Handle engine change with scroll
  const handleEngineChange = useCallback((engineId: string) => {
    setSelectedEngine(engineId);
    setTimeout(() => {
      scrollToPricingCards();
    }, 100);
  }, [scrollToPricingCards]);
  
  // Pricing tiers
  const pricingTiers = useMemo(() => [
    {
      id: 'starter',
      name: 'TIER 1',
      capital: '$10K - $24.9K',
      capitalMin: 10000,
      capitalMax: 24999,
      monthlyPrice: 199,
      percentOfCapital: '1.1%',
      color: '#FF3D1A',
      gradientFrom: '#FF5C39',
      gradientTo: '#FF2D0A',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'Email support',
        'Keep 100% of profits'
      ]
    },
    {
      id: 'bronze',
      name: 'TIER 2',
      capital: '$25K - $49.9K',
      capitalMin: 25000,
      capitalMax: 49999,
      monthlyPrice: 399,
      percentOfCapital: '1.1%',
      color: '#FF8C1A',
      gradientFrom: '#FFA500',
      gradientTo: '#FF7700',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'Priority email support',
        'Keep 100% of profits'
      ]
    },
    {
      id: 'silver',
      name: 'TIER 3',
      capital: '$50K - $99.9K',
      capitalMin: 50000,
      capitalMax: 99999,
      monthlyPrice: 799,
      percentOfCapital: '1.1%',
      color: '#FFD700',
      gradientFrom: '#FFEB3B',
      gradientTo: '#FFC107',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'Priority support',
        'Monthly strategy calls',
        'Keep 100% of profits'
      ]
    },
    {
      id: 'gold',
      name: 'TIER 4',
      capital: '$100K - $249.9K',
      capitalMin: 100000,
      capitalMax: 249999,
      monthlyPrice: 1799,
      popular: true,
      percentOfCapital: '1.0%',
      color: '#00D4FF',
      gradientFrom: '#1DE9B6',
      gradientTo: '#00BCD4',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'Priority support 24/7',
        'Weekly strategy calls',
        'Keep 100% of profits'
      ]
    },
    {
      id: 'platinum',
      name: 'TIER 5',
      capital: '$250K - $499.9K',
      capitalMin: 250000,
      capitalMax: 499999,
      monthlyPrice: 3799,
      percentOfCapital: '1.0%',
      color: '#5C7CFA',
      gradientFrom: '#7C4DFF',
      gradientTo: '#536DFE',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'VIP support 24/7',
        'Weekly strategy calls',
        'Dedicated success manager'
      ]
    },
    {
      id: 'diamond',
      name: 'TIER 6',
      capital: '$500K+',
      capitalMin: 500000,
      capitalMax: null,
      monthlyPrice: 7999,
      percentOfCapital: '1.0%',
      color: '#7E57C2',
      gradientFrom: '#9575CD',
      gradientTo: '#673AB7',
      features: [
        'Full Pythagoras Stardust™ access',
        'MT5 integration',
        'Dedicated account manager',
        'White-glove concierge service'
      ]
    }
  ], []);
  
  // WhatsApp inquiry generator
  const generateWhatsAppOrderURL = useCallback(() => {
    const engineName = selectedEngine === 'pythagoras-stardust' ? 'Pythagoras Stardust™' : 'Aurelius-1™ (Discontinued)';
    const engineType = 'XAU/USD Gold Trading';
    const tier = pricingTiers.find(t => t.id === selectedTier);
    
    let message = `*TERRALABS INDUSTRIES*\\n*INFORMATION TECHNOLOGY CONSULTANCIES – FZCO*\\n\\n`;
    message += `License Number: 75343\\n`;
    message += `Dubai Integrated Economic Zones Authority (DIEZA)\\n`;
    message += `Operating via IFZA / Dubai Silicon Oasis\\n\\n`;
    message += `75343 - 001, IFZA Business Park,\\n`;
    message += `Dubai Digital Park (DDP),\\n`;
    message += `Dubai Silicon Oasis, Dubai, UAE\\n\\n`;
    message += `═══════════════════════\\n`;
    message += `*SOFTWARE LICENSE INQUIRY*\\n`;
    message += `═══════════════════════\\n\\n`;
    message += `ENGINE: ${engineName}\\n`;
    message += `TYPE: ${engineType}\\n`;
    message += `TIER: ${tier?.name}\\n`;
    message += `═══════════════════════\\n\\n`;
    
    message += `*PRICING: SOFTWARE LICENSING*\\n\\n`;
    message += `Selected Tier: ${tier?.name}\\n`;
    message += `Capital Range: ${tier?.capital}\\n`;
    message += `Monthly Fee: $${tier?.monthlyPrice}/month\\n\\n`;
    message += `*BENEFITS*\\n`;
    message += `• Keep 100% of all profits\\n`;
    message += `• No performance fees ever\\n`;
    message += `• Full MT5 integration\\n`;
    message += `• Complete fund control\\n\\n`;
    
    message += `═══════════════════════\\n`;
    message += `*REQUIREMENTS*\\n`;
    message += `• Minimum Capital: $10,000\\n`;
    message += `• Trading Platform: MetaTrader 5\\n`;
    message += `• Broker: Your choice (we recommend trusted brokers)\\n\\n`;
    message += `═══════════════════════\\n\\n`;
    message += `*CLIENT INFORMATION*\\n`;
    message += `Please provide:\\n\\n`;
    message += `Full Name:\\n`;
    message += `Email:\\n`;
    message += `Phone:\\n`;
    message += `Trading Capital Amount:\\n\\n`;
    message += `══════════════════════\\n\\n`;
    message += `*ONBOARDING PROCESS*\\n`;
    message += `1. Sign digital software license\\n`;
    message += `2. Receive account credentials\\n`;
    message += `3. MT5 API integration setup\\n`;
    message += `4. Trading engine activation\\n`;
    message += `5. Begin trading with Pythagoras Stardust™`;
    
    return `https://wa.me/971543434848?text=${encodeURIComponent(message)}`;
  }, [selectedEngine, selectedTier, pricingTiers]);

  const currentTier = pricingTiers.find(t => t.id === selectedTier) || pricingTiers[3];

  return (
    <section id="pricing" className="pricing-section">
      {/* Vertical Cards CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1);
          }
        }
        
        @keyframes selectedPulse {
          0%, 100% {
            transform: scale(1.05) translateY(-8px);
            box-shadow: 0 20px 60px var(--glow-color-1), 0 0 100px var(--glow-color-2);
          }
          50% {
            transform: scale(1.06) translateY(-10px);
            box-shadow: 0 25px 80px var(--glow-color-1), 0 0 120px var(--glow-color-2);
          }
        }
        
        .vertical-card-container {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
          flex-wrap: nowrap;
          overflow: visible;
          padding: clamp(3rem, 5vw, 4rem) clamp(1.5rem, 3vw, 2.5rem) clamp(4rem, 6vw, 5rem);
          margin: 0 auto;
          max-width: 100%;
        }
        
        .vertical-pricing-card {
          flex: 0 0 auto;
          width: clamp(140px, 15vw, 180px);
          height: 750px;
          min-height: 750px;
          max-height: 750px;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .vertical-pricing-card.selected {
          animation: selectedPulse 3s ease-in-out infinite;
        }
        
        .vertical-pricing-card:hover:not(.selected) {
          animation: cardFloat 2s ease-in-out infinite;
        }
        
        @media (max-width: 1024px) {
          .vertical-card-container {
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: visible;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
            padding: 3rem 1.5rem 3.5rem;
            gap: 1rem;
          }
          
          .vertical-card-container::-webkit-scrollbar {
            height: 8px;
          }
          
          .vertical-card-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            margin: 0 1rem;
          }
          
          .vertical-card-container::-webkit-scrollbar-thumb {
            background: rgba(255, 92, 57, 0.4);
            border-radius: 10px;
          }
          
          .vertical-card-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 92, 57, 0.6);
          }
          
          .vertical-pricing-card {
            width: 160px;
            min-height: 600px;
            max-height: 600px;
            height: 600px;
          }
        }
        
        @media (max-width: 640px) {
          .vertical-card-container {
            padding: 2.5rem 1rem 3rem;
            gap: 0.875rem;
            overflow-y: visible;
          }
          
          .vertical-pricing-card {
            width: 145px;
            min-height: 550px;
            max-height: 550px;
            height: 550px;
            padding: 1.25rem 0.85rem !important;
          }
          
          /* Optimize card content for mobile */
          .vertical-pricing-card h3 {
            font-size: 1rem !important;
          }
          
          .vertical-pricing-card .price-amount {
            font-size: 1.5rem !important;
          }
          
          .vertical-pricing-card .feature-text {
            font-size: 0.7rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .vertical-card-container {
            padding: 2.25rem 0.75rem 2.5rem;
            gap: 0.75rem;
            overflow-y: visible;
          }
          
          .vertical-pricing-card {
            width: 135px;
            min-height: 520px;
            max-height: 520px;
            height: 520px;
            padding: 1.1rem 0.75rem !important;
          }
        }
      ` }} />
      
      <div className="section-container" style={{ marginTop: '-3rem' }}>
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div style={{
            width: 'clamp(50px, 10vw, 80px)',
            height: 'clamp(3px, 0.5vw, 4px)',
            background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
            margin: '0 auto clamp(1rem, 3vw, 2rem) auto',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(255, 92, 57, 0.5)'
          }} />
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 8vw, 8rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em',
            textAlign: 'center',
            margin: '0 auto 1.5rem auto',
            padding: '0 1rem',
            color: '#FFFFFF'
          }}>
            <span style={{ color: '#FFFFFF' }}>Choose Your Tier. Start </span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Trading</span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.</span>
          </h2>
          <p style={{ 
            marginTop: '2rem', 
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '2rem auto 0',
            padding: '0 1.5rem'
          }}>
            Fixed monthly subscription • Keep 100% of profits • Cancel anytime
          </p>
        </div>

        <EngineSelector 
          selectedEngine={selectedEngine}
          onEngineChange={handleEngineChange}
          engines={engines}
        />

        {/* SOFTWARE LICENSING MODEL HEADER */}
        <div className="pricing-intro" style={{ 
          textAlign: 'center', 
          margin: '2.5rem auto 1.5rem',
          maxWidth: '900px',
          padding: '0 1rem'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '800',
            color: '#FF5C39',
            marginBottom: '1.5rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            ENGINE LICENSING MODEL
          </h3>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            Select your Tier • Fixed monthly subscription based on your capital • Keep 100% of all profits
          </p>
        </div>

        {/* Tier Selector */}
        <div className="vertical-card-container" ref={pricingCardsRef}>
          {pricingTiers.map((tier) => {
            // Convert hex color to RGB for alpha usage
            const hexToRgb = (hex: string) => {
              const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
              } : { r: 255, g: 92, b: 57 };
            };
            const rgb = hexToRgb(tier.color);
            const isSelected = selectedTier === tier.id;
            
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative group h-full vertical-pricing-card ${isSelected ? 'selected' : ''}`}
                style={{
                  '--glow-color-1': isSelected ? 'rgba(156, 255, 46, 0.25)' : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
                  '--glow-color-2': isSelected ? 'rgba(156, 255, 46, 0.15)' : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
                  position: 'relative',
                  padding: '1.5rem 1rem',
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(156, 255, 46, 0.3) 0%, rgba(156, 255, 46, 0.22) 100%)' 
                    : `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.125) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.0875) 100%)`,
                  backdropFilter: 'blur(40px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                  border: isSelected 
                    ? '2px solid rgba(156, 255, 46, 0.65)' 
                    : `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.175)`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected
                    ? '0 10px 30px rgba(156, 255, 46, 0.28), 0 0 50px rgba(156, 255, 46, 0.2), inset 0 0 60px rgba(156, 255, 46, 0.15)'
                    : `0 4px 16px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05), 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.0375), inset 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.025)`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '600px',
                  minHeight: '600px',
                  maxHeight: '600px',
                  overflow: 'hidden',
                  transform: isSelected ? 'scale(1.05) translateY(-8px)' : 'scale(1)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                    e.currentTarget.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.225)`;
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.0625), 0 0 50px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05), inset 0 0 50px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.0375)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.175)`;
                    e.currentTarget.style.boxShadow = `0 4px 16px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05), 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.0375), inset 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.025)`;
                  }
                }}
              >
                {/* Inner Glow Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isSelected 
                      ? 'radial-gradient(circle at 50% 0%, rgba(156, 255, 46, 0.35) 0%, transparent 60%)'
                      : `radial-gradient(circle at 50% 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, transparent 60%)`,
                    borderRadius: '16px',
                    opacity: isSelected ? 0.9 : 0.2
                  }}
                />

                {/* Shimmer Effect on Hover */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: isSelected
                      ? 'linear-gradient(90deg, transparent, rgba(156, 255, 46, 0.3), transparent)'
                      : `linear-gradient(90deg, transparent, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), transparent)`,
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s infinite',
                    borderRadius: '16px'
                  }}
                />
                
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '100px',
                    fontSize: '0.55rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                    zIndex: 5
                  }}>
                    POPULAR
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '0.5rem', position: 'relative', zIndex: 10 }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '0.4rem',
                    color: '#ffffff',
                    letterSpacing: '0.3px',
                    textShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`
                  }}>{tier.name}</h3>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '500'
                  }}>{tier.capital}</p>
                </div>

                <div style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                  padding: '1rem 0.75rem',
                  background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
                  position: 'relative',
                  zIndex: 10
                }}>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '0.25rem',
                    letterSpacing: '-0.02em',
                    textShadow: `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`
                  }}>
                    ${tier.monthlyPrice.toLocaleString()}
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500' }}>
                    Per month
                  </div>
                </div>

                {/* Features */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  flex: '1',
                  position: 'relative',
                  zIndex: 10,
                  marginBottom: '5.5rem'
                }}>
                  <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem', color: '#ffffff' }}>
                    KEY FEATURES
                  </div>
                  {tier.features.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                      <div style={{ 
                        marginTop: '4px', 
                        width: '5px', 
                        height: '5px', 
                        borderRadius: '9999px', 
                        flexShrink: 0,
                        background: '#2A56F2'
                      }} />
                      <span style={{ fontSize: '0.85rem', lineHeight: 1.4, color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tier Number - Bottom Center */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  zIndex: 5
                }}>
                  <div style={{
                    fontSize: 'clamp(4rem, 8vw, 5.5rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    opacity: 0.15,
                    textShadow: `0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`
                  }}>
                    {String(['TIER 1', 'TIER 2', 'TIER 3', 'TIER 4', 'TIER 5', 'TIER 6'].indexOf(tier.name) + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Common Begin Onboarding Button Below Cards */}
        {selectedTier && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '-1rem',
            padding: '0 1rem'
          }}>
            <button
              onClick={() => onShowAgreement({
                name: `${currentTier.name} Tier`,
                price: `$${currentTier.monthlyPrice}/month`,
                capital: currentTier.capital,
                engine: selectedEngine === 'pythagoras-stardust' ? 'Pythagoras Stardust™' : 'Aurelius-1™ (Discontinued)',
                pricingModel: 'software-license',
                tier: currentTier.name,
                monthlyFee: currentTier.monthlyPrice
              })}
              style={{
                padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                background: 'rgba(156, 255, 46, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(156, 255, 46, 0.3)',
                borderRadius: '16px',
                color: '#9CFF2E',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 32px rgba(156, 255, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                letterSpacing: '0.3px',
                minWidth: '280px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(156, 255, 46, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(156, 255, 46, 0.5)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(156, 255, 46, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(156, 255, 46, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(156, 255, 46, 0.3)';
                e.currentTarget.style.color = '#9CFF2E';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(156, 255, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
            >
              <FileText size={18} />
              Begin Onboarding
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Contact via WhatsApp */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a 
            href={generateWhatsAppOrderURL()}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <MessageCircle size={18} />
            Inquire via WhatsApp
          </a>
        </div>

        {/* Enterprise Solutions - Integrated Card */}
        <div style={{ marginTop: '4rem', maxWidth: '1200px', margin: '4rem auto 0', padding: '0 1rem' }}>
          <AnimatedCard delay={300}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 200, 0, 0.05) 100%)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '2px solid rgba(255, 215, 0, 0.25)',
              borderRadius: '20px',
              padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              boxShadow: '0 16px 48px rgba(255, 215, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 80px rgba(255, 215, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Premium Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.4rem 0.85rem',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.15) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.5)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#FFD700',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)'
              }}>
                ENTERPRISE
              </div>

              {/* Main Header */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3 style={{ 
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', 
                  marginBottom: '0.35rem',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '800',
                  letterSpacing: '-0.01em'
                }}>
                  Enterprise & Institutional Solutions
                </h3>
                <p style={{ 
                  fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', 
                  color: 'rgba(255, 215, 0, 0.85)',
                  marginTop: '0.25rem',
                  fontWeight: '600'
                }}>
                  Custom Licensing • White-Label • Partner Programs
                </p>
                <div style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.65rem)',
                  fontWeight: '800',
                  marginTop: '0.5rem',
                  color: '#fff'
                }}>
                  Custom Quote Required
                </div>
              </div>

              {/* Intro Text */}
              <p style={{ 
                fontSize: 'clamp(0.88rem, 1.6vw, 0.95rem)', 
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.85)',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto 1.25rem'
              }}>
                TERRALABS works with select institutional customers to design tailored software licensing structures for enterprise deployment, white-label branding, partner distribution, and OEM-style arrangements. All custom solutions require separate agreements and eligibility criteria.
              </p>

              {/* Two Enterprise Tier Cards - Matching Subscription Style */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                flexWrap: 'wrap',
                marginBottom: '1.25rem'
              }}>
                {/* Tier 7: Custom Licensing */}
                <div
                  className="relative group h-full vertical-pricing-card"
                  style={{
                    '--glow-color-1': 'rgba(42, 86, 242, 0.25)',
                    '--glow-color-2': 'rgba(42, 86, 242, 0.15)',
                    position: 'relative',
                    padding: '1.75rem 1.25rem',
                    background: 'linear-gradient(135deg, rgba(42, 86, 242, 0.125) 0%, rgba(42, 86, 242, 0.0875) 100%)',
                    backdropFilter: 'blur(40px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                    border: '2px solid rgba(42, 86, 242, 0.3)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 16px rgba(42, 86, 242, 0.15), 0 0 40px rgba(42, 86, 242, 0.1), inset 0 0 40px rgba(42, 86, 242, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'clamp(320px, 45vw, 500px)',
                    height: '600px',
                    minHeight: '600px',
                    maxHeight: '600px',
                    overflow: 'hidden'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(42, 86, 242, 0.4)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(42, 86, 242, 0.2), 0 0 50px rgba(42, 86, 242, 0.15), inset 0 0 50px rgba(42, 86, 242, 0.075)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(42, 86, 242, 0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(42, 86, 242, 0.15), 0 0 40px rgba(42, 86, 242, 0.1), inset 0 0 40px rgba(42, 86, 242, 0.05)';
                  }}
                >
                  {/* Inner Glow Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(42, 86, 242, 0.1) 0%, transparent 60%)',
                      borderRadius: '16px',
                      opacity: 0.2
                    }}
                  />

                  {/* Shimmer Effect on Hover */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent, rgba(42, 86, 242, 0.1), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s infinite',
                      borderRadius: '16px'
                    }}
                  />
                  
                  <div style={{ textAlign: 'center', marginBottom: '0.75rem', marginTop: '0rem', position: 'relative', zIndex: 10 }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      marginBottom: '0.35rem',
                      color: '#ffffff',
                      letterSpacing: '0.3px',
                      textShadow: '0 0 20px rgba(42, 86, 242, 0.5)'
                    }}>CUSTOM</h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '600'
                    }}>Enterprise Licensing</p>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    marginBottom: '0.85rem',
                    padding: '0.85rem 0.75rem',
                    background: 'rgba(42, 86, 242, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '10px',
                    border: '1px solid rgba(42, 86, 242, 0.4)',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: '900',
                      color: '#ffffff',
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 30px rgba(42, 86, 242, 0.6)'
                    }}>
                      Custom
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '600' }}>
                      Request Quote
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    flex: '1',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', color: '#ffffff', fontWeight: '700' }}>
                      KEY FEATURES
                    </div>
                    {[
                      'Deployment planning',
                      'Infrastructure scaling',
                      'Priority support',
                      'On-Premises option',
                      'Volume pricing',
                      'Multi-engine packages'
                    ].map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ 
                          marginTop: '5px', 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '9999px', 
                          flexShrink: 0,
                          background: '#2A56F2'
                        }} />
                        <span style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tier Number - Bottom Center */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 5
                  }}>
                    <div style={{
                      fontSize: 'clamp(3.5rem, 7vw, 4.5rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                      opacity: 0.15,
                      textShadow: '0 0 40px rgba(42, 86, 242, 0.5)'
                    }}>
                      07
                    </div>
                  </div>
                </div>

                {/* Tier 8: White-Label & Partners */}
                <div
                  className="relative group h-full vertical-pricing-card"
                  style={{
                    '--glow-color-1': 'rgba(157, 254, 203, 0.25)',
                    '--glow-color-2': 'rgba(157, 254, 203, 0.15)',
                    position: 'relative',
                    padding: '1.75rem 1.25rem',
                    background: 'linear-gradient(135deg, rgba(157, 254, 203, 0.125) 0%, rgba(157, 254, 203, 0.0875) 100%)',
                    backdropFilter: 'blur(40px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                    border: '2px solid rgba(157, 254, 203, 0.3)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 16px rgba(157, 254, 203, 0.15), 0 0 40px rgba(157, 254, 203, 0.1), inset 0 0 40px rgba(157, 254, 203, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'clamp(320px, 45vw, 500px)',
                    height: '600px',
                    minHeight: '600px',
                    maxHeight: '600px',
                    overflow: 'hidden'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(157, 254, 203, 0.4)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(157, 254, 203, 0.2), 0 0 50px rgba(157, 254, 203, 0.15), inset 0 0 50px rgba(157, 254, 203, 0.075)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(157, 254, 203, 0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(157, 254, 203, 0.15), 0 0 40px rgba(157, 254, 203, 0.1), inset 0 0 40px rgba(157, 254, 203, 0.05)';
                  }}
                >
                  {/* Inner Glow Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(157, 254, 203, 0.1) 0%, transparent 60%)',
                      borderRadius: '16px',
                      opacity: 0.2
                    }}
                  />

                  {/* Shimmer Effect on Hover */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent, rgba(157, 254, 203, 0.1), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s infinite',
                      borderRadius: '16px'
                    }}
                  />
                  
                  <div style={{ textAlign: 'center', marginBottom: '0.75rem', marginTop: '0rem', position: 'relative', zIndex: 10 }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      marginBottom: '0.35rem',
                      color: '#ffffff',
                      letterSpacing: '0.3px',
                      textShadow: '0 0 20px rgba(157, 254, 203, 0.5)'
                    }}>WHITE-LABEL</h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '600'
                    }}>Partner Programs</p>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    marginBottom: '0.85rem',
                    padding: '0.85rem 0.75rem',
                    background: 'rgba(157, 254, 203, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '10px',
                    border: '1px solid rgba(157, 254, 203, 0.4)',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: '900',
                      color: '#ffffff',
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 30px rgba(157, 254, 203, 0.6)'
                    }}>
                      Custom
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '600' }}>
                      Request Quote
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    flex: '1',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', color: '#ffffff', fontWeight: '700' }}>
                      KEY FEATURES
                    </div>
                    {[
                      'Branded deployment',
                      'Custom domain',
                      'Access controls',
                      'OEM licensing',
                      'Broker partnerships',
                      'Revenue-sharing'
                    ].map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ 
                          marginTop: '5px', 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '9999px', 
                          flexShrink: 0,
                          background: '#9DFECB'
                        }} />
                        <span style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tier Number - Bottom Center */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 5
                  }}>
                    <div style={{
                      fontSize: 'clamp(3.5rem, 7vw, 4.5rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                      opacity: 0.15,
                      textShadow: '0 0 40px rgba(157, 254, 203, 0.5)'
                    }}>
                      08
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '0.85rem',
                justifyContent: 'center',
                marginTop: '0.5rem'
              }}>
                <button
                  onClick={() => onShowEnterprise && onShowEnterprise()}
                  style={{
                    padding: 'clamp(1rem, 2.2vw, 1.15rem) clamp(2rem, 4.5vw, 2.5rem)',
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.15) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                    borderRadius: '12px',
                    color: '#FFD700',
                    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(255, 215, 0, 0.25)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.35) 0%, rgba(255, 215, 0, 0.25) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.7)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(255, 215, 0, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.15) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)';
                    e.currentTarget.style.color = '#FFD700';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 215, 0, 0.25)';
                  }}
                >
                  <CheckCircle size={20} />
                  Request Enterprise Inquiry
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Compliance Disclaimer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem', 
          padding: '1.5rem', 
          background: 'rgba(255, 92, 57, 0.05)', 
          border: '1px solid rgba(255, 92, 57, 0.2)', 
          borderRadius: '12px',
          maxWidth: '1200px',
          margin: '3rem auto 0'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#FF5C39', fontWeight: '700' }}>
            Important Legal Notice
          </h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
            <strong>TERRALABS INDUSTRIES is an IT consultancy providing execution-only algorithmic trading software.</strong> We do NOT provide investment advice, asset management, or discretionary portfolio management services. All trading capital remains in your MetaTrader 5 brokerage account at all times. TERRALABS does NOT hold, custody, or have withdrawal rights over customer funds. Access is provided via broker API for execution purposes only. You retain final authority over your account and can revoke API access at any time. Autonomous execution does NOT constitute discretionary management because you pre-authorize execution parameters and retain unilateral right to disconnect. Trading involves substantial risk of loss. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
});