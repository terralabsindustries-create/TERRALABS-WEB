import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Home, Cpu, Star, TrendingUp, FileText, DollarSign, Users, UserCheck, Mail, Map, Scale } from 'lucide-react';

// Navigation Bar Component - Fixed Fragment Issue
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationBarProps {
  terralabsLogo: string;
  activeSection: string;
  onNavigate: (section: string) => void;
  isMobile: boolean;
}

export function NavigationBar({ terralabsLogo, activeSection, onNavigate, isMobile }: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const navContainerRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'engines', label: 'Engines', icon: <Cpu size={16} /> },
    { id: 'features', label: 'Features', icon: <Star size={16} /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp size={16} /> },
    { id: 'research', label: 'Research', icon: <FileText size={16} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
    { id: 'partners', label: 'Partners', icon: <Users size={16} /> },
    { id: 'board', label: 'Board', icon: <UserCheck size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
    { id: 'roadmap', label: 'RoadMap', icon: <Map size={16} /> },
    { id: 'legal', label: 'Legal', icon: <Scale size={16} /> },
  ];

  useEffect(() => {
    const updateBlobPosition = () => {
      const activeButton = navLinksRef.current[activeSection];
      const container = navContainerRef.current;
      
      if (activeButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const left = buttonRect.left - containerRect.left;
        
        setBlobStyle({
          left,
          width: buttonRect.width,
          opacity: 1
        });
      } else {
        // If no active button found, hide the indicator
        setBlobStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Update immediately
    updateBlobPosition();
    
    // Update after a small delay to ensure layout is complete
    const timeoutId = setTimeout(updateBlobPosition, 100);
    
    // Update on window resize
    window.addEventListener('resize', updateBlobPosition);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateBlobPosition);
    };
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div>
      {/* Global Navigation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-button:not(.active):hover {
          color: rgba(255, 255, 255, 0.95) !important;
          background: rgba(255, 92, 57, 0.2) !important;
          transform: translateY(-1px) !important;
        }
        .nav-button.active:hover {
          background: rgba(255, 92, 57, 1) !important;
          transform: translateY(-1px) scale(1.02) !important;
          box-shadow: 0 6px 24px rgba(255, 92, 57, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.6) !important;
        }
      `}} />
      
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(80px) saturate(200%)',
        WebkitBackdropFilter: 'blur(80px) saturate(200%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.08) inset, 0 4px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90px',
          padding: '0.75rem 0',
          width: '100%',
          position: 'relative'
        }}>
          {/* Logo - Flush Left */}
          <div style={{ 
            position: 'absolute',
            left: isMobile ? '1rem' : '2rem',
            flexShrink: 0 
          }}>
            <button
              onClick={() => handleNavigate('home')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                outline: 'none'
              }}
            >
              <img
                src={terralabsLogo}
                alt="TERRALABS"
                style={{
                  height: isMobile ? '66px' : '84px',
                  width: 'auto',
                  filter: 'drop-shadow(0 0 10px rgba(255, 92, 57, 0.5))',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(8px)'
                }}
              />
            </button>
          </div>

          {/* Desktop Navigation - Flush Right */}
          {!isMobile && (
            <div 
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '8px',
                boxShadow: `
                  0 2px 4px rgba(255, 255, 255, 0.05) inset,
                  0 -2px 4px rgba(0, 0, 0, 0.05) inset,
                  0 8px 32px rgba(0, 0, 0, 0.2),
                  0 2px 8px rgba(0, 0, 0, 0.1),
                  0 1px 0 0 rgba(255, 255, 255, 0.1) inset,
                  0 -1px 0 0 rgba(0, 0, 0, 0.1) inset
                `,
                position: 'absolute',
                right: '2rem',
                overflow: 'hidden',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                minHeight: '54px'
              }}
            >
              {/* Hyper-realistic glass shine overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
                borderRadius: '18px 18px 0 0',
                pointerEvents: 'none',
                zIndex: 1
              }} />
              
              {/* Frosted edge highlight */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '18px',
                pointerEvents: 'none',
                zIndex: 2,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1) inset'
              }} />
              
              <div 
                ref={navContainerRef}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 3
                }}
              >
                {/* Traveling Orange Underline Indicator - REMOVED */}
                
                {navItems.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    ref={(el) => { navLinksRef.current[id] = el; }}
                    onClick={() => handleNavigate(id)}
                    className={`nav-button ${activeSection === id ? 'active' : ''}`}
                    style={{
                      color: activeSection === id ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)',
                      background: activeSection === id 
                        ? 'rgba(255, 92, 57, 0.85)'
                        : 'transparent',
                      backdropFilter: activeSection === id ? 'blur(10px)' : 'none',
                      WebkitBackdropFilter: activeSection === id ? 'blur(10px)' : 'none',
                      border: activeSection === id ? '1px solid rgba(255, 92, 57, 0.95)' : 'none',
                      fontSize: '13px',
                      fontWeight: activeSection === id ? '600' : '500',
                      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      cursor: 'pointer',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      outline: 'none',
                      transition: 'all 0.25s ease-out',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      zIndex: 3,
                      willChange: 'transform, background-color, box-shadow',
                      boxShadow: activeSection === id
                        ? '0 4px 16px rgba(255, 92, 57, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
                        : 'none'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <div style={{ position: 'absolute', right: '1rem' }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'rgba(255, 92, 57, 0.75)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 92, 57, 0.95)',
                  borderRadius: '10px',
                  padding: '0.6rem',
                  cursor: 'pointer',
                  color: '#ffffff',
                  boxShadow: '0 8px 32px rgba(255, 92, 57, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  outline: 'none'
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '90px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(5, 5, 10, 0.99) 100%)',
            backdropFilter: 'blur(60px) saturate(150%)',
            WebkitBackdropFilter: 'blur(60px) saturate(150%)',
            zIndex: 999,
            padding: '1rem 1rem 2rem',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
          onClick={closeMobileMenu}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%',
            padding: '0 0.25rem'
          }}>
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleNavigate(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: activeSection === id ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  background: activeSection === id 
                    ? 'linear-gradient(135deg, rgba(255, 92, 57, 0.75) 0%, rgba(255, 61, 26, 0.65) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: activeSection === id 
                    ? '1px solid rgba(255, 92, 57, 0.9)' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '14px',
                  fontWeight: activeSection === id ? '600' : '500',
                  fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  cursor: 'pointer',
                  padding: '0.7rem 1rem',
                  borderRadius: '10px',
                  outline: 'none',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: activeSection === id 
                    ? '0 4px 16px rgba(255, 92, 57, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                    : '0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                  gap: '0.65rem'
                }}
              >
                <div style={{ 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center',
                  color: activeSection === id ? '#ffffff' : 'rgba(255, 92, 57, 0.8)'
                }}>
                  {icon}
                </div>
                <span>{label}</span>
              </button>
            ))}
            
            {/* Removed Engine Access button */}
          </div>
        </div>
      )}
    </div>
  );
}