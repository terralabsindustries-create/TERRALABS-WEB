import { useEffect, useState, useRef } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Target, 
  Smartphone, 
  Shield, 
  BarChart3, 
  Bot, 
  Microscope, 
  Rocket, 
  Users, 
  Phone, 
  ExternalLink,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Globe,
  Lock
} from 'lucide-react';

// Self-contained scroll animation hooks
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, currentScrollY / Math.max(1, maxScroll)));
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return { scrollY, scrollProgress };
}

// Self-contained Neural Orb Network (without diagonal lines)
function NeuralOrbNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY, scrollProgress } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const throttledMouseMove = throttle(handleMouseMove, 16);
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    // Resize canvas with high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    // Create energy particles (no lines - just ambient particles)
    const createParticle = (x: number, y: number, type: 'gold' | 'blue' | 'white') => {
      const colors = {
        gold: 'rgba(200, 164, 75, 0.8)',
        blue: 'rgba(10, 132, 255, 0.8)',
        white: 'rgba(255, 255, 255, 0.9)'
      };

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        life: 120,
        maxLife: 120,
        size: 1 + Math.random() * 2,
        color: colors[type]
      });
    };

    // Enhanced animation with scroll effects (no diagonal lines)
    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      const scrollOffset = scrollY * 0.2;
      const mouseInfluence = {
        x: mousePosition.x * 20,
        y: mousePosition.y * 15
      };

      ctx.save();

      // Create ambient floating particles around orbs
      if (Math.random() < 0.3) {
        const centerX = canvas.clientWidth / 2;
        const centerY = canvas.clientHeight / 2;
        
        // Main orb particles
        if (Math.random() < 0.5) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 50 + Math.random() * 100;
          createParticle(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius,
            Math.random() < 0.7 ? 'gold' : 'blue'
          );
        }
        
        // Support orb particles
        if (Math.random() < 0.3) {
          createParticle(
            canvas.clientWidth * 0.2 + Math.random() * 100,
            canvas.clientHeight * 0.3 + Math.random() * 100,
            'gold'
          );
        }
        
        if (Math.random() < 0.3) {
          createParticle(
            canvas.clientWidth * 0.8 + Math.random() * 100,
            canvas.clientHeight * 0.7 + Math.random() * 100,
            'blue'
          );
        }
      }

      // Animate particles (no connection lines)
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      ctx.restore();
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY, scrollProgress, mousePosition]);

  // Calculate scroll-based orb positions
  const getOrbTransforms = () => {
    const baseTransform = 'translate(-50%, -50%)';
    const scrollRotation = scrollProgress * 360 * 0.3;
    const scrollFloat = Math.sin(scrollProgress * Math.PI * 2) * 15;
    const mouseInfluence = {
      x: mousePosition.x * 10,
      y: mousePosition.y * 8
    };

    return {
      main: `${baseTransform} translate(${mouseInfluence.x}px, ${scrollFloat + mouseInfluence.y}px) rotate(${scrollRotation}deg)`,
      left: `translate(${15 + mouseInfluence.x * 0.5}%, ${25 + scrollFloat * 0.3}%) scale(${1 + scrollProgress * 0.1})`,
      right: `translate(${12 - mouseInfluence.x * 0.3}%, ${20 - scrollFloat * 0.2}%) scale(${1 + scrollProgress * 0.1})`,
      micro1: `translate(${25 + mouseInfluence.x * 0.8}%, ${15 + scrollFloat * 0.6}%)`,
      micro2: `translate(${20 - mouseInfluence.x * 0.6}%, ${30 - scrollFloat * 0.4}%)`,
      micro3: `translate(${70 + mouseInfluence.x * 0.4}%, ${70 + scrollFloat * 0.8}%)`
    };
  };

  const transforms = getOrbTransforms();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Particle Canvas (no diagonal lines) */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6 + scrollProgress * 0.4
        }}
      />
      
      {/* Main Central Orb - Clean Design */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(300px, 25vw, 400px)',
          height: 'clamp(300px, 25vw, 400px)',
          transform: transforms.main,
          borderRadius: '50%',
          background: 'radial-gradient(120% 120% at 30% 30%, rgba(200, 164, 75, 0.8) 0%, rgba(200, 164, 75, 0.6) 20%, rgba(10, 132, 255, 0.4) 50%, rgba(10, 132, 255, 0.2) 80%, transparent 100%)',
          boxShadow: '0 0 60px rgba(200, 164, 75, 0.6), 0 0 120px rgba(10, 132, 255, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(3px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          filter: `brightness(${1 + scrollProgress * 0.5}) saturate(${1 + scrollProgress * 0.3})`,
          animation: 'orbPulse 4s ease-in-out infinite'
        }}
      >
        {/* Core reflection */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            animation: 'glassReflection 6s ease-in-out infinite'
          }}
        />
        
        {/* Neon spark */}
        <div 
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '20%',
            width: '25%',
            height: '25%',
            background: 'radial-gradient(circle, rgba(10, 132, 255, 0.8) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
            animation: 'neonSpark 4s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Support Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: 'clamp(150px, 15vw, 200px)',
          height: 'clamp(150px, 15vw, 200px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(200, 164, 75, 0.5) 0%, rgba(10, 132, 255, 0.3) 40%, rgba(10, 132, 255, 0.1) 70%, transparent 100%)',
          transform: transforms.left,
          opacity: 0.6 + scrollProgress * 0.4,
          filter: 'blur(2px)',
          animation: 'orbFloat1 8s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: 'clamp(180px, 18vw, 250px)',
          height: 'clamp(180px, 18vw, 250px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(200, 164, 75, 0.4) 0%, rgba(10, 132, 255, 0.3) 40%, rgba(10, 132, 255, 0.1) 70%, transparent 100%)',
          transform: transforms.right,
          opacity: 0.6 + scrollProgress * 0.4,
          filter: 'blur(2px)',
          animation: 'orbFloat2 10s ease-in-out infinite'
        }}
      />
      
      {/* Micro Ambient Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          right: '25%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.3) 0%, rgba(10, 132, 255, 0.1) 50%, transparent 100%)',
          transform: transforms.micro1,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat1 12s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.2) 0%, rgba(10, 132, 255, 0.1) 50%, transparent 100%)',
          transform: transforms.micro2,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat2 15s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          top: '70%',
          left: '70%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.25) 0%, rgba(10, 132, 255, 0.15) 50%, transparent 100%)',
          transform: transforms.micro3,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat3 18s ease-in-out infinite'
        }}
      />
    </div>
  );
}

// Animated card component
function AnimatedCard({ children, direction = 'up', delay = 0, className = '' }: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        case 'scale': return 'scale(0.95)';
        default: return 'translateY(40px)';
      }
    }
    return 'translateY(0) translateX(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}

// Utility throttle function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function SinglePageApp() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY, scrollProgress } = useScrollAnimation();

  // Apply dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    // Ensure full page coverage without margins
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'performance', 'research', 'pricing', 'partners', 'contact'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && newScrollY >= element.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);

    // Observe sections after DOM is ready
    const observeSections = () => {
      const sections = ['features', 'performance', 'research', 'pricing', 'partners', 'contact'];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    };

    const timeoutId = setTimeout(observeSections, 100);

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="single-page-app" style={{ margin: 0, padding: 0 }}>
      {/* Enhanced Scroll Progress Indicator */}
      <div 
        className="scroll-progress"
        style={{
          transform: `scaleX(${scrollProgress})`,
        }}
      />
      
      {/* Living Neural Orb Network Background */}
      <NeuralOrbNetwork />

      {/* Site Content Wrapper */}
      <div className="site-content" style={{ margin: 0, padding: 0 }}>
        {/* Fixed Navigation */}
        <nav className="brand-nav">
        <div className="nav-content">
          <div className="brand-logo">
            <button onClick={() => scrollToSection('home')} className="logo-link">
              <span className="logo-icon">◈</span>
              <div className="logo-stack">
                <span className="logo-text">AURELIUS</span>
              </div>
            </button>
          </div>
          <div className="nav-links">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'performance', label: 'Performance' },
              { id: 'research', label: 'Research' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'partners', label: 'Partners' },
              { id: 'contact', label: 'Contact / Access' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div 
          className="hero-parallax-bg"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: Math.max(0, 1 - scrollY / 1000)
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="hero-container">
            <div className="hero-main-content">
              {/* Hero Content */}
              <div className="hero-content-centered">
                <AnimatedCard direction="up" delay={300}>
                  <h1 className="hero-title">
                    <span className="title-line">Gold Doesn't Sleep.</span>
                    <span className="title-line">Neither Does Our Engine.</span>
                  </h1>
                </AnimatedCard>
                <AnimatedCard direction="up" delay={600}>
                  <div className="hero-subtitle">
                    <p className="mx-[80px] my-[0px] px-[20px]">
                      Driven by our Synthetic Neural Adaptive Intelligence Technology (SNAIT), re-invented with a Cognitive Trading Fabric and Adaptive Intelligence Core that reverse-engineers a century of XAU/USD market data. It works tirelessly in the background — sustainable, repeatable outcomes, all under your control.
                    </p>
                  </div>
                </AnimatedCard>
              </div>

              {/* Hero Metrics */}
              <AnimatedCard direction="scale" delay={900}>
                <div className="hero-metrics">
                  <AnimatedCard direction="up" delay={1000}>
                    <div className="metric-item">
                      <div className="metric-value">87.3%</div>
                      <div className="metric-label">Win Rate</div>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard direction="up" delay={1100}>
                    <div className="metric-item">
                      <div className="metric-value">2.1:1</div>
                      <div className="metric-label">Risk/Reward</div>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard direction="up" delay={1200}>
                    <div className="metric-item">
                      <div className="metric-value">14.7%</div>
                      <div className="metric-label">Max Drawdown</div>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard direction="up" delay={1300}>
                    <div className="metric-item">
                      <div className="metric-value">156%</div>
                      <div className="metric-label">Annual Return</div>
                    </div>
                  </AnimatedCard>
                </div>
              </AnimatedCard>

              {/* Hero Actions */}
              <AnimatedCard direction="up" delay={1400}>
                <div className="hero-actions">
                  <button onClick={() => scrollToSection('contact')} className="cta-primary">
                    Access Platform
                    <span className="button-arrow">→</span>
                  </button>
                  <button onClick={() => scrollToSection('performance')} className="cta-secondary">
                    View Performance
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Your Money. Your Control. Our Engine.</h2>
            <p className="section-subtitle">
              We provide institutional-grade trading technology as a service. You keep full control of your capital in your broker account.
            </p>
          </div>

          {/* Platform Diagram */}
          <div className="platform-diagram">
            <div className="diagram-flow">
              <div className="flow-step">
                <Brain className="step-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>AI Learning Engine</h4>
                <p>Adapts to market conditions</p>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <BarChart3 className="step-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>Statistical Analysis</h4>
                <p>Quantifies market patterns</p>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <Zap className="step-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>Signal Generation</h4>
                <p>Precise entry/exit signals</p>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <Target className="step-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>Risk Management</h4>
                <p>Systematic position sizing</p>
              </div>
            </div>
            <div className="diagram-note mt-8">
              <p><strong>Your Money, Your Control:</strong> We never touch your funds. All capital remains in your MT5 broker account.</p>
            </div>
          </div>

          {/* Usage Models */}
          <div className="usage-models">
            <h3 className="models-title">Two Ways to Access Our Trading Engine</h3>
            <p className="models-subtitle">Choose Subscription for fixed monthly pricing, or White Label to deploy under your own brand.</p>
            <div className="models-grid">
              <div className="model-card featured">
                <div className="model-badge">POPULAR</div>
                <Smartphone className="model-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>Engine Licensing</h4>
                <p>Fixed monthly subscription based on your trading capital. Keep 100% of profits with transparent pricing.</p>
                <div className="model-features">
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Fixed monthly fee</span>
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Keep 100% of profits</span>
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Full MT5 integration</span>
                </div>
              </div>
              
              <div className="model-card">
                <Globe className="model-icon" size={48} style={{ color: '#C8A44B' }} />
                <h4>White Label</h4>
                <p>Deploy our complete platform under your brand for your clients and partners.</p>
                <div className="model-features">
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Your branding</span>
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Custom deployment</span>
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Multi-client support</span>
                  <span><CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />Revenue sharing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency Block */}
          <div className="transparency-block">
            <div className="transparency-content">
              <h3 className="transparency-title">No Secrets. No Drama. Only Discipline.</h3>
              <p className="transparency-subtitle">We never touch your funds. All capital stays in your MT5 broker account. Withdraw anytime. Total auditability.</p>
              <div className="transparency-features">
                <div className="transparency-item">
                  <CheckCircle className="check-icon" size={20} style={{ color: '#C8A44B' }} />
                  <span>We are a software provider, not money managers</span>
                </div>
                <div className="transparency-item">
                  <CheckCircle className="check-icon" size={20} style={{ color: '#C8A44B' }} />
                  <span>Your funds remain in your broker account at all times</span>
                </div>
                <div className="transparency-item">
                  <CheckCircle className="check-icon" size={20} style={{ color: '#C8A44B' }} />
                  <span>You can withdraw your money anytime without restrictions</span>
                </div>
                <div className="transparency-item">
                  <CheckCircle className="check-icon" size={20} style={{ color: '#C8A44B' }} />
                  <span>We only provide technology and signals, never hold capital</span>
                </div>
                <div className="transparency-item">
                  <CheckCircle className="check-icon" size={20} style={{ color: '#C8A44B' }} />
                  <span>Full audit trail of all trading decisions and performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Built for Professionals. Powered by Intelligence.</h2>
            <p className="section-subtitle">
              Adaptive learning, statistical modeling, risk management, multi-platform access — all enterprise-grade, all engineered for consistency.
            </p>
          </div>

          <div className="features-grid">
            <AnimatedCard direction="up" delay={150} className="feature-card card-hover-lift">
              <Brain className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Adaptive Learning Engine</h3>
              <p>Our AI continuously learns from market patterns, adjusting strategies based on evolving conditions and statistical significance.</p>
            </AnimatedCard>

            <AnimatedCard direction="up" delay={300} className="feature-card card-hover-lift">
              <BarChart3 className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Quantitative Analysis</h3>
              <p>Advanced statistical models analyze price action, volatility patterns, and market microstructure for edge identification.</p>
            </AnimatedCard>

            <AnimatedCard direction="up" delay={450} className="feature-card card-hover-lift">
              <Zap className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Real-Time Signals</h3>
              <p>Instant notifications with precise entry points, stop levels, and profit targets based on quantitative analysis.</p>
            </AnimatedCard>

            <AnimatedCard direction="up" delay={600} className="feature-card card-hover-lift">
              <Target className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Risk Management</h3>
              <p>Systematic position sizing and risk controls ensure consistent performance while protecting capital.</p>
            </AnimatedCard>

            <AnimatedCard direction="up" delay={750} className="feature-card card-hover-lift">
              <Smartphone className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Multi-Platform Access</h3>
              <p>Web dashboard, mobile app, and API integration for seamless access across all your devices.</p>
            </AnimatedCard>

            <AnimatedCard direction="up" delay={900} className="feature-card card-hover-lift">
              <Shield className="feature-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption, secure APIs, and comprehensive audit trails for institutional compliance.</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="performance-snapshot-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Proof, Not Promises.</h2>
            <p className="section-subtitle">
              87.3% win rate, 2.1:1 risk/reward, 156% annual return, audited and tracked with full transparency.
            </p>
          </div>

          <div className="performance-stats">
            <div className="stat-item">
              <div className="stat-value">87.3%</div>
              <div className="stat-label">Win Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">156.2%</div>
              <div className="stat-label">Annual Return</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2.1:1</div>
              <div className="stat-label">Risk/Reward</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">14.7%</div>
              <div className="stat-label">Max Drawdown</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">1.89</div>
              <div className="stat-label">Sharpe Ratio</div>
            </div>
          </div>

          <div className="performance-chart-placeholder">
            <div className="chart-header">
              <h4>Equity Curve vs Benchmark</h4>
              <div className="chart-legend">
                <span className="legend-item equity">■ Aurelius Framework</span>
                <span className="legend-item benchmark">■ Buy & Hold Gold</span>
              </div>
            </div>
            <div className="chart-visual">
              <svg className="chart-svg" viewBox="0 0 400 120">
                {/* Equity curve */}
                <path
                  d="M 0 80 Q 50 75 100 60 T 200 40 T 300 25 T 400 20"
                  stroke="#C8A44B"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Benchmark */}
                <path
                  d="M 0 80 Q 50 78 100 75 T 200 70 T 300 65 T 400 60"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>

          <div className="section-actions mt-12">
            <button onClick={() => scrollToSection('contact')} className="cta-primary">
              Access Live Performance
            </button>
            <button onClick={() => scrollToSection('research')} className="cta-secondary">
              View Research
            </button>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="research-snapshot-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Innovation That Never Sleeps.</h2>
            <div className="research-overview">
              <p className="section-subtitle">
                We reverse-engineer markets with machine learning, statistical modeling, and market microstructure research to stay adaptive, always.
              </p>
            </div>
          </div>

          <div className="research-highlights">
            <div className="highlight-item">
              <div className="highlight-number">12+</div>
              <div className="highlight-label">Years Research</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">50+</div>
              <div className="highlight-label">Strategies Tested</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">1M+</div>
              <div className="highlight-label">Data Points</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">99.9%</div>
              <div className="highlight-label">Uptime</div>
            </div>
          </div>

          <div className="research-grid">
            <div className="research-card">
              <TrendingUp className="research-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Market Microstructure</h3>
              <p>Deep analysis of gold market structure, liquidity patterns, and institutional flow dynamics.</p>
              <div className="research-details">
                <div className="detail-item">• Order book analysis</div>
                <div className="detail-item">• Liquidity mapping</div>
                <div className="detail-item">• Flow correlation</div>
              </div>
            </div>

            <div className="research-card">
              <Bot className="research-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Machine Learning Models</h3>
              <p>Advanced ML algorithms for pattern recognition, regime detection, and predictive analytics.</p>
              <div className="research-details">
                <div className="detail-item">• Neural networks</div>
                <div className="detail-item">• Ensemble methods</div>
                <div className="detail-item">• Feature engineering</div>
              </div>
            </div>

            <div className="research-card">
              <Microscope className="research-icon" size={48} style={{ color: '#C8A44B' }} />
              <h3>Statistical Modeling</h3>
              <p>Rigorous statistical frameworks for strategy development and performance validation.</p>
              <div className="research-details">
                <div className="detail-item">• Bayesian inference</div>
                <div className="detail-item">• Time series analysis</div>
                <div className="detail-item">• Monte Carlo simulation</div>
              </div>
            </div>
          </div>

          <div className="research-cta mt-12">
            <button onClick={() => scrollToSection('contact')} className="cta-primary">
              Access Research Portal
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-teaser-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              Choose Engine Licensing for fixed monthly pricing, or White Label for custom enterprise deployment.
            </p>
          </div>

          <div className="pricing-mini-cards">
            <div className="mini-card featured">
              <h4>Engine Licensing</h4>
              <p>Fixed monthly subscription based on capital tier</p>
              <div className="price-range">$199-$7,999</div>
              <small style={{ fontSize: '0.85em', opacity: 0.7 }}>Cancel anytime</small>
            </div>

            <div className="mini-card">
              <h4>White Label</h4>
              <p>Complete platform deployment for institutions</p>
              <div className="price-range">Custom</div>
              <small style={{ fontSize: '0.85em', opacity: 0.7 }}>Contact for pricing</small>
            </div>
          </div>

          {/* Engine Licensing Details */}
          <div className="profit-share-panel mt-12">
            <h3>Engine Licensing Model</h3>
            <p>Fixed monthly subscription based on your trading capital. Keep 100% of all profits with transparent pricing.</p>
            
            <div className="profit-share-features">

              <div className="feature-item">
                <CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />
                <span>Keep 100% of all profits • No performance fees ever</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />
                <span>Fixed monthly fee based on capital tier ($199-$7,999)</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />
                <span>Full control • Funds stay in your MT5 broker account</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} style={{ color: '#C8A44B', marginRight: '8px' }} />
                <span>Withdraw anytime • Complete transparency</span>
              </div>
            </div>

            <div className="panel-note">
              <p><strong>Important:</strong> Your capital remains in your broker account at all times. We're a software provider, not money managers.</p>
            </div>
          </div>

          <div className="teaser-cta">
            <button onClick={() => scrollToSection('contact')} className="cta-primary">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="partners-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">We Stand With the Best.</h2>
            <p className="section-subtitle">
              Integrated with tier-1 regulated brokers (MultiBank, IG, Pepperstone, Equiti, CFI) for seamless execution and client protection.
            </p>
          </div>

          <div className="broker-logos">
            <div className="broker-logo-item">
              <div className="broker-logo">MB</div>
              <span>MultiBank</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">IG</div>
              <span>IG Group</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">PP</div>
              <span>Pepperstone</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">EQ</div>
              <span>Equiti</span>
            </div>
            <div className="broker-logo-item">
              <div className="broker-logo">CFI</div>
              <span>CFI</span>
            </div>
          </div>

          <div className="partner-cta">
            <button onClick={() => scrollToSection('contact')} className="cta-primary">
              View Integration Details
            </button>
          </div>
        </div>
      </section>

      {/* Contact/Access Section */}
      <section id="contact" className="final-cta-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-header">
            <h2 className="section-title">Ready to Begin?</h2>
            <p className="section-subtitle">
              Choose your access model and join institutional traders using our Adaptive Intelligence Framework.
            </p>
          </div>

          <div className="access-options">
            <div className="access-grid">
              <div className="access-card">
                <Rocket className="access-icon" size={48} style={{ color: '#C8A44B' }} />
                <h3>Get Started Today</h3>
                <p>Ready to harness the power of our Adaptive Intelligence Framework? Choose your preferred access model and start your journey with institutional-grade trading technology.</p>
                <div className="access-features">
                  <div className="feature-item">
                    <CheckCircle size={16} style={{ color: '#C8A44B' }} />
                    <span>Engine licensing with flexible subscription</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} style={{ color: '#C8A44B' }} />
                    <span>Fixed monthly pricing • Keep 100% of profits</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} style={{ color: '#C8A44B' }} />
                    <span>White label deployment for institutions</span>
                  </div>
                </div>
                <div className="access-buttons">
                  <a href="#" className="access-btn primary">
                    Begin Onboarding
                    <ExternalLink size={16} />
                  </a>
                  <a href="#" className="access-btn secondary">
                    Schedule Demo
                  </a>
                </div>
              </div>

              <div className="access-card">
                <Phone className="access-icon" size={48} style={{ color: '#C8A44B' }} />
                <h3>Contact Our Team</h3>
                <p>Speak directly with our specialists about your trading requirements, technical integration, or partnership opportunities.</p>
                <div className="contact-information">
                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="contact-header">
                        <MessageCircle size={20} style={{ color: '#25D366' }} />
                        <h4>WhatsApp</h4>
                      </div>
                      <a href="https://wa.me/971501234567" className="contact-btn whatsapp">
                        <MessageCircle size={16} />
                        +971 50 123 4567
                      </a>
                      <div className="hours-list">
                        <div className="hours-item">
                          <span>Dubai Business Hours</span>
                          <span className="response-time">Instant</span>
                        </div>
                        <div className="hours-item">
                          <span>After Hours</span>
                          <span className="response-time">2-4 hrs</span>
                        </div>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-header">
                        <Phone size={20} style={{ color: '#C8A44B' }} />
                        <h4>Phone</h4>
                      </div>
                      <a href="tel:+971501234567" className="contact-btn phone">
                        <Phone size={16} />
                        +971 50 123 4567
                      </a>
                      <div className="hours-list">
                        <div className="hours-item">
                          <span>Sun-Thu</span>
                          <span className="response-time">9AM-6PM GST</span>
                        </div>
                        <div className="hours-item">
                          <span>Emergency</span>
                          <span className="response-time">24/7</span>
                        </div>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-header">
                        <MapPin size={20} style={{ color: '#C8A44B' }} />
                        <h4>Dubai Office</h4>
                      </div>
                      <div className="office-address">
                        <p>
                          TERRALABS INDUSTRIES LLC<br/>
                          Dubai International Financial Centre<br/>
                          Level 3, Gate Village Building 1<br/>
                          Dubai, UAE
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-gateway-note mt-16">
            <h4>Secure Payment Processing</h4>
            <p>All subscriptions processed through enterprise-grade payment gateways with bank-level security.</p>
            <div className="payment-logos text-right text-[16px] mt-6">
              <span className="payment-logo">Stripe</span>
              <span className="payment-logo">PayPal</span>
              <span className="payment-logo">Bank Transfer</span>
              <span className="payment-logo">Crypto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-compliance">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="compliance-notice">
            <div className="footer-headline">
              <h4>Risk Disclosure & Regulatory Compliance</h4>
            </div>
            <p>
              Trading involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results. 
              AURELIUS by TERRALABS is a software provider and does not manage client funds. All capital remains in your broker account.
            </p>
          </div>

          <nav className="footer-nav">
            <a href="#">Adaptive Intelligence Framework</a>
            <a href="#">Institutional Risk Management</a>
            <a href="#">Quantitative Research Portal</a>
            <a href="#">Regulatory Compliance Center</a>
            <a href="#">Professional Trading Documentation</a>
            <a href="#">Enterprise Security Standards</a>
            <a href="#">Dubai Financial Centre Registration</a>
            <a href="#">Broker Integration Protocols</a>
          </nav>

          <div className="footer-bottom">
            <p>© 2024 AURELIUS. All rights reserved.</p>
            <p>Dubai International Financial Centre, UAE | Software License #FL-2024-001</p>
          </div>
        </div>
      </footer>
      
      </div> {/* End site-content wrapper */}
    </div>
  );
}