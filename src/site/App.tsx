import "../styles/globals.css";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import ShowcasePage from "./ShowcasePage";
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
  CheckCircle,
  Globe,
  Menu,
  X,
  ChevronUp,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  FileText,
  Handshake,
  Award,
  Map,
} from "lucide-react";
const terralabsLogo = "/images/TERRA_OPS_LOGO__2_-1.png";
const aureliusLogo = "/images/figma-placeholder.svg";
const stardustLogo = "/images/TERRA_OPS_LOGO__4_.png";
import { NavigationBar } from "./components/NavigationBar";

// Import components directly for better initial load performance
import { TradingDashboard } from "./components/TradingDashboard";
import { LiveProfitCounter } from "./components/MarketTicker";
import { ClientLoginPage } from "./pages/ClientLoginPage";
import { TermsOfService } from "./pages/legal/TermsOfService";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { RiskDisclosure } from "./pages/legal/RiskDisclosure";
import { CompliancePolicy } from "./pages/legal/CompliancePolicy";
import { CookiePolicy } from "./pages/legal/CookiePolicy";
import { RefundPolicy } from "./pages/legal/RefundPolicy";
import { CustomerAgreement } from "./pages/onboarding/CustomerAgreementNew";
import { OnboardingForm } from "./pages/onboarding/OnboardingForm";
import { EnterprisePage } from "./pages/EnterprisePage";
import { PricingSection } from "./components/PricingSectionClean";
import { BoardOfDirectors } from "./components/BoardOfDirectors";
import { RoadMap } from "./components/RoadMap";
const LivingOrbBackground = lazy(
  () => import("./components/LivingOrbBackground"),
);

// Simplified scroll hook for better performance
function useOptimizedScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const lastUpdate = useRef(0);
  const isManualScroll = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const now = Date.now();
      // Throttle to 15fps for smooth performance
      if (now - lastUpdate.current < 67) return;

      lastUpdate.current = now;
      setScrollY(window.scrollY);

      // Don't auto-detect if user just clicked a nav button
      if (isManualScroll.current) {
        return;
      }

      // Simple section detection with better accuracy
      const sections = [
        "home",
        "engines",
        "features",
        "performance",
        "research",
        "pricing",
        "partners",
        "board",
        "contact",
        "roadmap",
        "legal",
      ];
      const navOffset = window.innerWidth <= 768 ? 90 : 110;

      // Find the section that is most in view
      let closestSection = "home";
      let closestDistance = Infinity;

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = Math.abs(
            elementCenter - viewportCenter,
          );

          // Section is in view if its top is above navOffset and bottom is below
          if (
            rect.top <= navOffset &&
            rect.bottom > navOffset
          ) {
            closestSection = id;
            break;
          }

          // Otherwise, find the section whose center is closest to viewport center
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = id;
          }
        }
      }

      if (activeSection !== closestSection) {
        setActiveSection(closestSection);
      }
    };

    // Use passive scroll listener for better performance
    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    // Initial update
    updateScroll();

    return () =>
      window.removeEventListener("scroll", updateScroll);
  }, [activeSection]);

  const setActiveSectionManually = useCallback((section) => {
    isManualScroll.current = true;
    setActiveSection(section);
    // Reset manual scroll flag after scroll completes
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  }, []);

  return {
    scrollY,
    activeSection,
    setActiveSection: setActiveSectionManually,
  };
}

// Enhanced Background Component with seamless orb transitions
const BackgroundComponent = React.memo(() => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [debugInfo, setDebugInfo] = React.useState("");
  const [isTransitioning, setIsTransitioning] =
    React.useState(false);
  const [cssOrbsVisible, setCssOrbsVisible] =
    React.useState(true);

  React.useEffect(() => {
    // More generous capability check to ensure orbs are always visible
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isLowMemory =
      navigator.deviceMemory && navigator.deviceMemory <= 2; // More lenient

    // Performance scoring - much more generous
    let performanceScore = 100;

    if (prefersReduced) performanceScore -= 20; // Reduced penalty
    if (isLowMemory) performanceScore -= 15; // Reduced penalty

    // Hardware concurrency check - more lenient
    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 2) performanceScore -= 15; // Only penalize very weak devices

    // Set debug info
    setDebugInfo(
      `Performance: ${performanceScore}%, Cores: ${cores}, Memory: ${navigator.deviceMemory || "Unknown"}GB`,
    );

    // Show advanced background more often - very fast transition for seamless experience
    if (performanceScore > 30 && !prefersReduced) {
      // Start crossfade transition much sooner
      const advancedTimer = setTimeout(() => {
        setShowAdvanced(true);
        setIsTransitioning(true);

        // Hide CSS orbs after advanced orbs are loaded
        setTimeout(() => {
          setCssOrbsVisible(false);
          setIsTransitioning(false);
        }, 300);
      }, 100); // Much faster transition

      return () => {
        clearTimeout(advancedTimer);
      };
    }
  }, []);

  // Enhanced CSS orb background with seamless crossfade
  const enhancedCssOrbs = cssOrbsVisible ? (
    <div
      className={`optimized-background ${isTransitioning ? "fading-out" : ""}`}
      style={{
        transition: "opacity 0.3s ease",
        opacity: isTransitioning ? 0 : 1,
      }}
    >
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
  ) : null;

  return (
    <div>
      {/* Always render CSS orbs first for immediate visibility */}
      {enhancedCssOrbs}

      {/* Render advanced orbs on top when ready */}
      {showAdvanced && (
        <Suspense fallback={null}>
          <div
            style={{
              transition: "opacity 0.3s ease",
              opacity: isTransitioning ? 1 : 1,
            }}
          >
            <LivingOrbBackground />
          </div>
        </Suspense>
      )}
    </div>
  );
});

// Simplified Animated Card for better performance
const AnimatedCard = React.memo(
  ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            observer.disconnect(); // Disconnect after first intersection
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        className={`${className} ${isVisible ? "animate-visible" : "animate-hidden"}`}
      >
        {children}
      </div>
    );
  },
);

// Mobile Navigation Hook
function useMobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    isMobileMenuOpen,
    isMobile,
    toggleMobileMenu,
    closeMobileMenu,
  };
}

// Navigation Component
const Navigation = React.memo(
  ({ activeSection, onNavigate, onLoginClick }) => {
    const {
      isMobileMenuOpen,
      isMobile,
      toggleMobileMenu,
      closeMobileMenu,
    } = useMobileNav();
    const [blobStyle, setBlobStyle] = useState({
      left: 0,
      width: 0,
      opacity: 0,
    });
    const navLinksRef = useRef<{
      [key: string]: HTMLButtonElement | null;
    }>({});
    const navContainerRef = useRef<HTMLDivElement | null>(null);

    const navItems = useMemo(
      () => [
        { id: "home", label: "Home" },
        { id: "engines", label: "Engines" },
        { id: "features", label: "Features" },
        { id: "performance", label: "Performance" },
        { id: "research", label: "Research" },
        { id: "pricing", label: "Pricing" },
        { id: "partners", label: "Partners" },
        { id: "board", label: "Board" },
        { id: "roadmap", label: "RoadMap" },
        { id: "contact", label: "Contact" },
        { id: "legal", label: "Legal" },
      ],
      [],
    );

    // Update blob position when active section changes
    useEffect(() => {
      const updateBlobPosition = () => {
        if (isMobile) {
          setBlobStyle({ left: 0, width: 0, opacity: 0 });
          return;
        }

        const activeButton = navLinksRef.current[activeSection];
        const navContainer = navContainerRef.current;

        if (activeButton && navContainer) {
          const containerRect =
            navContainer.getBoundingClientRect();
          const buttonRect =
            activeButton.getBoundingClientRect();

          const relativeLeft =
            buttonRect.left - containerRect.left;

          setBlobStyle({
            left: relativeLeft,
            width: buttonRect.width,
            opacity: 1,
          });
        }
      };

      updateBlobPosition();

      // Recalculate on window resize
      window.addEventListener("resize", updateBlobPosition);
      return () =>
        window.removeEventListener(
          "resize",
          updateBlobPosition,
        );
    }, [activeSection, isMobile]);

    const handleNavigate = useCallback(
      (sectionId) => {
        // Immediately update blob position on click - don't wait for scroll
        const updateBlob = () => {
          if (!isMobile) {
            const targetButton = navLinksRef.current[sectionId];
            const navContainer = navContainerRef.current;

            if (targetButton && navContainer) {
              const containerRect =
                navContainer.getBoundingClientRect();
              const buttonRect =
                targetButton.getBoundingClientRect();
              const relativeLeft =
                buttonRect.left - containerRect.left;

              setBlobStyle({
                left: relativeLeft,
                width: buttonRect.width,
                opacity: 1,
              });
            }
          }
        };

        // Update blob immediately
        updateBlob();

        // Special handling for Contact - scroll to contact section with offset
        if (sectionId === "contact") {
          const contactSection = document.getElementById(
            "contact-section",
          );
          if (contactSection) {
            const headerOffset = 130; // Matched to other hero section spacing
            const elementPosition =
              contactSection.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition +
              window.pageYOffset -
              headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
          closeMobileMenu();
        } else {
          onNavigate(sectionId);
          closeMobileMenu();
        }
      },
      [onNavigate, closeMobileMenu, isMobile],
    );

    return (
      <div>
        <nav className="fixed-nav">
          <div className="nav-container">
            <div className="nav-logo">
              <button
                onClick={() => handleNavigate("home")}
                className="logo-btn"
                onMouseDown={(e) => e.preventDefault()}
                tabIndex={-1}
              >
                <div className="logo-glow-wrapper">
                  <img
                    src={terralabsLogo}
                    alt="TERRALABS"
                    className="logo-img"
                  />
                  <div className="logo-glow-effect"></div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div
              className="nav-links desktop-nav"
              ref={navContainerRef}
            >
              {/* Liquid Blob Indicator */}
              <div
                className="nav-liquid-blob"
                style={{
                  left: `${blobStyle.left}px`,
                  width: `${blobStyle.width}px`,
                  opacity: blobStyle.opacity,
                }}
              />

              {navItems.map(({ id, label }, index) => (
                <button
                  key={id}
                  ref={(el) => {
                    navLinksRef.current[id] = el;
                  }}
                  onClick={() => handleNavigate(id)}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                  style={
                    {
                      "--nav-delay": `${index * 0.1}s`,
                      ...(activeSection === id
                        ? {
                            background:
                              "rgba(255, 92, 57, 0.6)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border:
                              "1px solid rgba(255, 92, 57, 0.8)",
                            boxShadow:
                              "0 8px 32px 0 rgba(255, 92, 57, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                          }
                        : {}),
                      transition: "all 0.3s ease",
                      whiteSpace: "nowrap",
                      padding: "10px 20px",
                      fontSize: "13px",
                    } as React.CSSProperties
                  }
                  tabIndex={-1}
                >
                  <span className="nav-link-text">{label}</span>
                  <div className="nav-link-ripple"></div>
                  <div className="nav-link-glow"></div>
                </button>
              ))}

              {/* Board of Directors Button */}
              <button
                onClick={() => {
                  const boardSection = document.getElementById(
                    "board-of-directors",
                  );
                  if (boardSection) {
                    const headerOffset = 130;
                    const elementPosition =
                      boardSection.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition +
                      window.pageYOffset -
                      headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                  closeMobileMenu();
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="nav-link"
                style={
                  {
                    "--nav-delay": `${navItems.length * 0.1}s`,
                    background: "rgba(190, 242, 100, 0.5)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border:
                      "1px solid rgba(190, 242, 100, 0.7)",
                    boxShadow:
                      "0 8px 32px 0 rgba(190, 242, 100, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    padding: "10px 20px",
                    fontSize: "13px",
                  } as React.CSSProperties
                }
                tabIndex={-1}
              >
                <Users
                  size={16}
                  style={{
                    marginRight: "6px",
                    display: "inline-block",
                  }}
                />
                <span className="nav-link-text">Board</span>
                <div className="nav-link-ripple"></div>
                <div className="nav-link-glow"></div>
              </button>

              {/* Customer Login Button */}
              <button
                onClick={onLoginClick}
                onMouseDown={(e) => e.preventDefault()}
                className="nav-link login-btn"
                style={
                  {
                    "--nav-delay": `${navItems.length * 0.1}s`,
                    background: "rgba(200, 255, 50, 0.6)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(200, 255, 50, 0.8)",
                    boxShadow:
                      "0 8px 32px 0 rgba(200, 255, 50, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    padding: "10px 20px",
                    fontSize: "13px",
                  } as React.CSSProperties
                }
                tabIndex={-1}
              >
                <span className="nav-link-text">
                  ACCESS ENGINE & ONBOARD
                </span>
                <div className="nav-link-ripple"></div>
                <div className="nav-link-glow"></div>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="Toggle navigation menu"
              tabIndex={-1}
            >
              <div className="menu-icon-wrapper">
                <div
                  className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}
                >
                  {isMobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
                </div>
                <div className="menu-toggle-ripple"></div>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isMobile && (
          <div
            className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <div
              className={`mobile-nav-menu ${isMobileMenuOpen ? "active" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-nav-header">
                <img
                  src={terralabsLogo}
                  alt="TERRALABS"
                  className="mobile-nav-logo"
                />
                <button
                  className="mobile-nav-close"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mobile-nav-items">
                {navItems.map(({ id, label }) => {
                  // Map icons to each section
                  const iconMap: Record<string, JSX.Element> = {
                    home: <Target size={18} />,
                    engines: <Rocket size={18} />,
                    features: <Zap size={18} />,
                    performance: <TrendingUp size={18} />,
                    research: <Microscope size={18} />,
                    pricing: <BarChart3 size={18} />,
                    partners: <Users size={18} />,
                    contact: <MessageCircle size={18} />,
                  };

                  return (
                    <button
                      key={id}
                      onClick={() => handleNavigate(id)}
                      className={`mobile-nav-link ${activeSection === id ? "active" : ""}`}
                    >
                      <span className="mobile-nav-icon">
                        {iconMap[id]}
                      </span>
                      <span className="mobile-nav-text">
                        {label}
                      </span>
                      {activeSection === id && (
                        <span className="mobile-nav-indicator" />
                      )}
                    </button>
                  );
                })}

                {/* Board of Directors Button - Mobile */}
                <button
                  onClick={() => {
                    const boardSection =
                      document.getElementById(
                        "board-of-directors",
                      );
                    if (boardSection) {
                      const headerOffset = 130;
                      const elementPosition =
                        boardSection.getBoundingClientRect()
                          .top;
                      const offsetPosition =
                        elementPosition +
                        window.pageYOffset -
                        headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                    closeMobileMenu();
                  }}
                  className="mobile-nav-link"
                >
                  <span className="mobile-nav-icon">
                    <Users size={18} />
                  </span>
                  <span className="mobile-nav-text">
                    Board of Directors
                  </span>
                </button>

                {/* Customer Login Button - Mobile */}
                <button
                  onClick={() => {
                    onLoginClick();
                    closeMobileMenu();
                  }}
                  className="mobile-nav-link login-link"
                  style={
                    {
                      background: "rgba(190, 242, 100, 0.2)",
                      backdropFilter:
                        "blur(24px) saturate(180%)",
                      WebkitBackdropFilter:
                        "blur(24px) saturate(180%)",
                      border:
                        "1px solid rgba(190, 242, 100, 0.4)",
                      boxShadow:
                        "0 8px 32px 0 rgba(190, 242, 100, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      margin: "0.75rem auto 0",
                      width: "100%",
                      padding: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      position: "relative",
                      overflow: "hidden",
                      fontSize: "15px",
                      color: "#bef264",
                    } as React.CSSProperties
                  }
                >
                  <Rocket size={18} />
                  <span>ACCESS ENGINE & ONBOARD</span>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                      transform: "translateX(-100%)",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

// Optimized Hero Section Component
const HeroSection = React.memo(
  ({ onLoginClick, onShowPromo }) => {
    const metrics = useMemo(
      () => [
        { value: "80%-120%", label: "Annual Return" },
        { value: "1.42x", label: "Profit Factor" },
        { value: "1.72", label: "Recovery Factor" },
        { value: "1.85", label: "Sharpe Ratio" },
      ],
      [],
    );

    return (
      <section id="home" className="hero-section">
        <div
          className="hero-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(0.75rem, 1.5vh, 1.25rem)",
            maxWidth: "1200px",
            margin: "-4rem auto 0 auto",
            padding: "0 2rem",
          }}
        >
          {/* The visible wordmark is an image, so the page carries its textual H1
              here. .sr-only is the same utility the shadcn components already use:
              it clips the element out of view while leaving it in the DOM and in the
              accessibility tree. No display:none, visibility:hidden or opacity:0,
              and the text matches the visible brand, so it is not cloaking. */}
          <h1 className="sr-only">TerraLabs Industries</h1>

          <div className="hero-badge-container animate-fast">
            <div
              style={{
                marginTop: "3rem",
                textAlign: "center",
              }}
            >
              <span
                className="text-base md:text-2xl uppercase tracking-[0.2em]"
                style={{
                  background:
                    "linear-gradient(to right, #FF5C39, #FF3D1A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                }}
              >
                Introducing
              </span>
            </div>
          </div>

          <div
            className="hero-title-container animate-fast"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Decorative Orange Line */}
            <div
              style={{
                width: "clamp(50px, 10vw, 80px)",
                height: "clamp(3px, 0.5vw, 4px)",
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
                borderRadius: "2px",
                boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
              }}
            />

            <img
              src={stardustLogo}
              alt="Pythagoras Stardust — AI gold trading engine by TerraLabs Industries"
              style={{
                width: "clamp(260px, 60vw, 690px)",
                height: "auto",
                display: "block",
                margin: "0 auto 1.5rem auto",
                mixBlendMode: "screen",
                filter:
                  "drop-shadow(0 0 24px rgba(255, 92, 57, 0.35))",
              }}
            />
          </div>

          <div
            className="hero-subtitle-container animate-fast"
            style={{ animationDelay: "0.4s" }}
          >
            <p
              className="hero-subtitle"
              style={{
                marginBottom: "clamp(0.5rem, 1vh, 0.75rem)",
                maxWidth: "100%",
              }}
            >
              Pythagoras Stardust™ is an advanced Gold Trading
              Engine built on a non-Linear Machine Learning
              pipeline that predicts price action bar-by-bar.
              Driven by PyTorch LSTMs, gradient-boosted trees,
              and Adaptive Volatility Matrixes, it delivers
              strict Mathematical Expectancy with zero Human
              Bias.
            </p>
            <div
              className="hero-taglines"
              style={{
                margin: "0 0 clamp(0.5rem, 1vh, 0.75rem) 0",
              }}
            >
              <span className="tagline-highlight">
                Fully Automatic.
              </span>
              <span className="tagline-highlight">
                Funds Stay in Your own Account.
              </span>
            </div>
          </div>

          <div
            className="hero-metrics-container animate-fast"
            style={{ animationDelay: "0.6s" }}
          >
            <div
              className="hero-metrics"
              style={{
                padding: "clamp(1rem, 2vh, 1.5rem)",
                margin: "clamp(0.5rem, 1vh, 1rem) 0",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1rem, 2vh, 1.5rem)",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "clamp(1rem, 2vw, 2rem)",
                  width: "100%",
                }}
              >
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="metric-item"
                  >
                    <div className="metric-value">
                      {metric.value}
                    </div>
                    <div className="metric-label">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "clamp(0.5rem, 1vh, 0.75rem)",
                  borderTop: "1px solid rgba(255, 92, 57, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    padding: "0.35rem 0.9rem",
                    background: "rgba(255, 92, 57, 0.15)",
                    border: "1px solid rgba(255, 92, 57, 0.4)",
                    borderRadius: "6px",
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
                      color: "#FF5C39",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Back Tested Results
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="hero-actions-container animate-fast"
            style={{ animationDelay: "0.8s" }}
          >
            <div
              className="hero-actions"
              style={{ marginTop: "clamp(0.5rem, 1vh, 1rem)" }}
            >
              <button
                className="btn-primary"
                onClick={onLoginClick}
              >
                Access Engine & Onboard
                <span>→</span>
              </button>
              <button
                className="btn-tertiary"
                onClick={() => {
                  document
                    .getElementById("performance")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Performance
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

// Engines Section Component
const EnginesSection = React.memo(({ onLoginClick }) => {
  const engines = useMemo(
    () => [
      {
        id: "pythagoras-stardust",
        name: "Pythagoras Stardust™",
        type: "XAU/USD ML Trading Engine",
        description:
          "Pythagoras Stardust™ is an advanced XAU/USD machine-learning trading engine built on a non-linear quantitative signal pipeline that evaluates market structure bar-by-bar. The system uses PyTorch-trained predictive models exported through ONNX for MT5 execution, combining model-confidence scoring, normalized multi-factor market features, volatility-aware regime filtering, out-of-distribution protection, ATR-based dynamic exits, and strict risk-governance logic. Its objective is to identify statistically favorable trading conditions, target positive mathematical expectancy, and reduce discretionary human decision-making through fully rule-based execution.",
        cta: "Access Pythagoras Stardust™ Platform",
        ctaAction: "platform",
        status: "active",
        orbColors: {
          primary: "rgba(255, 92, 57, 0.3)",
          secondary: "rgba(10, 132, 255, 0.15)",
        },
        gradient:
          "linear-gradient(135deg, rgba(255, 92, 57, 0.1) 0%, rgba(10, 132, 255, 0.05) 100%)",
        borderColor: "rgba(255, 92, 57, 0.3)",
      },
      {
        id: "aurelius-1",
        name: "Aurelius-1™",
        type: "Gold Trading Engine — Discontinued",
        description:
          "Aurelius-1™ was our first-generation Synthetic Neural Adaptive Intelligence Technology (SNAIT) for XAU/USD trading on MetaTrader 5. It has been retired and succeeded by Pythagoras Stardust™, our next-generation ML trading engine with significantly enhanced architecture and performance.",
        cta: "Discontinued",
        ctaAction: "waitlist",
        status: "coming-soon",
        orbColors: {
          primary: "rgba(120, 120, 120, 0.3)",
          secondary: "rgba(80, 80, 80, 0.15)",
        },
        gradient:
          "linear-gradient(135deg, rgba(120, 120, 120, 0.08) 0%, rgba(80, 80, 80, 0.04) 100%)",
        borderColor: "rgba(120, 120, 120, 0.25)",
      },
    ],
    [],
  );

  return (
    <section id="engines" className="engines-section">
      <div
        className="section-container"
        style={{ marginTop: "-4rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>
              Neural Engines by{" "}
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Terralabs Industries
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </h2>
          <p>
            Advanced AI-driven trading engines designed for
            different markets and strategies. Each engine is
            built with our core principles of transparency,
            control, and continuous adaptation.
          </p>
        </div>

        <div className="engines-grid">
          {engines.map((engine, index) => (
            <AnimatedCard
              key={engine.id}
              delay={index * 200}
              className="engine-card"
            >
              <div
                className="engine-card-inner"
                style={{
                  background: engine.gradient,
                  borderColor: engine.borderColor,
                }}
              >
                {/* Coming Soon Badge */}
                {engine.status === "coming-soon" && (
                  <div className="coming-soon-badge">
                    <span>
                      Legacy — Previous Generation of Stardust
                    </span>
                  </div>
                )}

                {/* Engine Header */}
                <div className="engine-header">
                  <div className="engine-icon">
                    <Bot size={32} />
                  </div>
                  <div className="engine-title">
                    <h3>{engine.name}</h3>
                    <p className="engine-type">{engine.type}</p>
                  </div>
                </div>

                {/* Engine Description */}
                <div className="engine-description">
                  <p>{engine.description}</p>
                </div>

                {/* Engine CTA */}
                <div className="engine-cta">
                  {engine.status !== "coming-soon" && (
                    <button
                      className="engine-btn primary"
                      onClick={() => onLoginClick()}
                    >
                      Access Engine & Onboard
                      <span className="btn-arrow">→</span>
                    </button>
                  )}
                </div>

                {/* Engine Glow Effect */}
                <div
                  className="engine-glow"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${engine.orbColors.primary.replace("0.3", "0.1")} 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
});

// Engine Selector Component
const EngineSelector = React.memo(
  ({ selectedEngine, onEngineChange, engines }) => {
    return (
      <div className="engine-selector">
        {engines.map((engine) => (
          <button
            key={engine.id}
            onClick={() => onEngineChange(engine.id)}
            className={`engine-tab ${selectedEngine === engine.id ? "active" : ""}`}
          >
            <div className="tab-content">
              <span className="tab-name">{engine.name}</span>
              <span className="tab-type">{engine.type}</span>
              {engine.status === "coming-soon" && (
                <span className="tab-badge">Legacy</span>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  },
);

// Features Section Component
const FeaturesSection = React.memo(() => {
  const [selectedEngine, setSelectedEngine] = useState(
    "pythagoras-stardust",
  );

  const engines = useMemo(
    () => [
      {
        id: "pythagoras-stardust",
        name: "Pythagoras Stardust™",
        type: "XAU/USD ML Trading",
        status: "active",
      },
      {
        id: "aurelius-1",
        name: "Aurelius-1™",
        type: "Gold Trading — Discontinued",
        status: "coming-soon",
      },
    ],
    [],
  );

  const engineFeatures = useMemo(
    () => ({
      "pythagoras-stardust": [
        {
          icon: Brain,
          title: "PyTorch ML Models",
          desc: "PyTorch-trained predictive models exported through ONNX for MT5 execution, delivering institutional-grade inference directly at the broker level.",
        },
        {
          icon: BarChart3,
          title: "Non-Linear Signal Pipeline",
          desc: "A quantitative signal pipeline that evaluates XAU/USD market structure bar-by-bar using normalized multi-factor market features.",
        },
        {
          icon: Zap,
          title: "Model-Confidence Scoring",
          desc: "Every trade is gated by a real-time confidence score — the engine only executes when statistical edge clears a strict threshold.",
        },
        {
          icon: Target,
          title: "ATR-Based Dynamic Exits",
          desc: "Volatility-aware ATR dynamic stop and target logic adapts exits to live market conditions, protecting capital across all regimes.",
        },
        {
          icon: Smartphone,
          title: "OOD Protection",
          desc: "Out-of-distribution detection identifies when market conditions fall outside training distribution, halting execution to prevent model misfire.",
        },
        {
          icon: Shield,
          title: "Strict Risk Governance",
          desc: "Rule-based risk-governance logic enforces hard position limits and drawdown controls with zero discretionary override.",
        },
      ],
      "aurelius-1": [
        {
          icon: Brain,
          title: "Discontinued Engine",
          desc: "Aurelius-1™ has been retired. It served as the foundational SNAIT framework and has been fully succeeded by Pythagoras Stardust™.",
        },
        {
          icon: BarChart3,
          title: "Legacy Architecture",
          desc: "Built on a Random Forest–based Decision Framework (RFDF), now superseded by PyTorch/ONNX ML architecture in Pythagoras Stardust™.",
        },
        {
          icon: Zap,
          title: "No Longer Supported",
          desc: "Active development, signal generation, and client onboarding for Aurelius-1™ have been discontinued effective immediately.",
        },
        {
          icon: Target,
          title: "Successor Available",
          desc: "All Aurelius-1™ capabilities and more are available in Pythagoras Stardust™ with significantly enhanced performance.",
        },
        {
          icon: Smartphone,
          title: "MT5 Compatible",
          desc: "Aurelius-1™ ran on MetaTrader 5. Pythagoras Stardust™ retains full MT5 compatibility with improved execution logic.",
        },
        {
          icon: Shield,
          title: "Migrate to Stardust™",
          desc: "Existing clients are encouraged to migrate to Pythagoras Stardust™. Contact us for a seamless transition.",
        },
      ],
    }),
    [],
  );

  const currentFeatures =
    engineFeatures[selectedEngine] ||
    engineFeatures["pythagoras-stardust"];
  const currentEngine = engines.find(
    (e) => e.id === selectedEngine,
  );

  const sectionContent = useMemo(
    () => ({
      "pythagoras-stardust": {
        title: "Gold Doesn't Sleep. Neither Does Our Engine.",
        description:
          "Pythagoras Stardust™ uses PyTorch-trained ML models and a non-linear quantitative signal pipeline to evaluate XAU/USD market structure bar-by-bar — with confidence scoring, regime filtering, and fully rule-based execution.",
      },
      "aurelius-1": {
        title: "Aurelius-1™ — Discontinued.",
        description:
          "Aurelius-1™ has been retired and fully succeeded by Pythagoras Stardust™. Contact us to migrate your subscription.",
      },
    }),
    [],
  );

  return (
    <section id="features" className="features-section">
      <div
        className="section-container"
        style={{ marginTop: "-3rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              color: "#FFFFFF",
            }}
          >
            {selectedEngine === "pythagoras-stardust" ? (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Gold Doesn't Sleep. Neither Does Our{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Engine
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            ) : (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Aurelius-1™ —{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Discontinued
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            )}
          </h2>
          <p>
            Driven by our Synthetic Neural Adaptive Intelligence
            Technology (SNAIT), re-invented with a Cognitive
            Trading Fabric and Adaptive Intelligence Core that
            reverse-engineers decades of XAU/USD market data.
          </p>
        </div>

        <EngineSelector
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
          engines={engines}
        />

        <div className="features-grid">
          {currentFeatures.map((feature, index) => (
            <AnimatedCard
              key={`${selectedEngine}-${feature.title}`}
              delay={index * 150}
              className="feature-card"
            >
              <feature.icon
                className="feature-icon"
                size={36}
              />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
});

// Performance Section Component
const PerformanceSection = React.memo(() => {
  const [selectedEngine, setSelectedEngine] = useState(
    "pythagoras-stardust",
  );

  const engines = useMemo(
    () => [
      {
        id: "pythagoras-stardust",
        name: "Pythagoras Stardust™",
        type: "XAU/USD ML Trading",
        status: "active",
      },
      {
        id: "aurelius-1",
        name: "Aurelius-1™",
        type: "Gold Trading — Discontinued",
        status: "coming-soon",
      },
    ],
    [],
  );

  const engineStats = useMemo(
    () => ({
      "pythagoras-stardust": [
        { value: "100%", label: "Equity Safe" },
        { value: "57%", label: "Annual Return" },
        { value: "0.78:1", label: "Risk/Reward" },
        { value: "22%", label: "Max Drawdown" },
        { value: "1.42", label: "Profit Factor" },
      ],
      "aurelius-1": [
        { value: "N/A", label: "Equity Safe" },
        { value: "N/A", label: "Annual Return" },
        { value: "N/A", label: "Risk/Reward" },
        { value: "N/A", label: "Max Drawdown" },
        { value: "N/A", label: "Profit Factor" },
      ],
    }),
    [],
  );

  const sectionContent = useMemo(
    () => ({
      "pythagoras-stardust": {
        title: "Proof, Not Promises.",
        description:
          "100% equity safe in your MT5 account, 1.42x profit factor, 72.1% annual return, tracked with full transparency.",
        chartTitle: "Equity Curve vs Benchmark",
        chartLegend: {
          main: "■ Pythagoras Stardust™ Framework",
          benchmark: "■ Buy & Hold Gold",
        },
        profitTarget: 15420,
      },
      "aurelius-1": {
        title: "Aurelius-1™ — Discontinued.",
        description:
          "Aurelius-1™ has been retired. Performance data is no longer updated. See Pythagoras Stardust™ for current results.",
        chartTitle: "Engine Discontinued",
        chartLegend: {
          main: "■ Aurelius-1™ (Retired)",
          benchmark: "■ Buy & Hold Gold",
        },
        profitTarget: 0,
      },
    }),
    [],
  );

  const currentStats =
    engineStats[selectedEngine] ||
    engineStats["pythagoras-stardust"];
  const currentContent =
    sectionContent[selectedEngine] ||
    sectionContent["pythagoras-stardust"];

  return (
    <section id="performance" className="performance-section">
      <div
        className="section-container"
        style={{ marginTop: "-3rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              color: "#FFFFFF",
            }}
          >
            {selectedEngine === "aurelius-1" ? (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Proof, Not{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Promises
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            ) : (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Performance That{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Delivers
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            )}
          </h2>
          <p>{currentContent.description}</p>
        </div>

        <EngineSelector
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
          engines={engines}
        />

        <div className="chart-container">
          <div className="chart-header">
            <h4>{currentContent.chartTitle}</h4>
            <div className="chart-legend">
              <span className="legend-equity">
                {currentContent.chartLegend.main}
              </span>
              <span className="legend-benchmark">
                {currentContent.chartLegend.benchmark}
              </span>
            </div>
          </div>
          <div className="chart-visual">
            <svg
              viewBox="0 0 400 120"
              className="performance-chart"
            >
              {/* Grid Lines */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="12"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 12"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <linearGradient
                  id="performanceGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "#FF5C39",
                      stopOpacity: 0.3,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: "#FF5C39",
                      stopOpacity: 0.05,
                    }}
                  />
                </linearGradient>
                <linearGradient
                  id="benchmarkGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "rgba(255,255,255,0.2)",
                      stopOpacity: 0.2,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: "rgba(255,255,255,0.1)",
                      stopOpacity: 0.05,
                    }}
                  />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur
                    stdDeviation="2"
                    result="coloredBlur"
                  />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Grid */}
              <rect
                width="400"
                height="120"
                fill="url(#grid)"
                opacity="0.3"
              />

              {/* Y-Axis Labels */}
              <g className="y-axis-labels">
                <text
                  x="5"
                  y="15"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  +200%
                </text>
                <text
                  x="5"
                  y="35"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  +150%
                </text>
                <text
                  x="5"
                  y="55"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  +100%
                </text>
                <text
                  x="5"
                  y="75"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  +50%
                </text>
                <text
                  x="5"
                  y="95"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  0%
                </text>
                <text
                  x="5"
                  y="115"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  -25%
                </text>
              </g>

              {/* X-Axis Labels */}
              <g className="x-axis-labels">
                <text
                  x="40"
                  y="135"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  Q1
                </text>
                <text
                  x="120"
                  y="135"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  Q2
                </text>
                <text
                  x="200"
                  y="135"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  Q3
                </text>
                <text
                  x="280"
                  y="135"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  Q4
                </text>
                <text
                  x="360"
                  y="135"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                  fontWeight="500"
                >
                  YTD
                </text>
              </g>

              {/* Benchmark Area Fill */}
              <path
                d={
                  selectedEngine === "aurelius-1"
                    ? "M 0 80 Q 50 78 100 75 T 200 70 T 300 65 T 400 60 L 400 95 L 0 95 Z"
                    : "M 0 80 Q 50 77 100 74 T 200 68 T 300 62 T 400 58 L 400 95 L 0 95 Z"
                }
                fill="url(#benchmarkGradient)"
              />

              {/* Performance Area Fill */}
              <path
                d={
                  selectedEngine === "aurelius-1"
                    ? "M 0 80 Q 50 75 100 60 T 200 40 T 300 25 T 400 20 L 400 95 L 0 95 Z"
                    : "M 0 80 Q 50 70 100 55 T 200 30 T 300 15 T 400 10 L 400 95 L 0 95 Z"
                }
                fill="url(#performanceGradient)"
              />

              {/* Benchmark Line */}
              <path
                d={
                  selectedEngine === "aurelius-1"
                    ? "M 0 80 Q 50 78 100 75 T 200 70 T 300 65 T 400 60"
                    : "M 0 80 Q 50 77 100 74 T 200 68 T 300 62 T 400 58"
                }
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="8,4"
                filter="url(#glow)"
              />

              {/* Main Performance Line */}
              <path
                d={
                  selectedEngine === "aurelius-1"
                    ? "M 0 80 Q 50 75 100 60 T 200 40 T 300 25 T 400 20"
                    : "M 0 80 Q 50 70 100 55 T 200 30 T 300 15 T 400 10"
                }
                stroke="#FF5C39"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points for Main Line */}
              {selectedEngine === "aurelius-1" ? (
                <g>
                  <circle
                    cx="0"
                    cy="80"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="60"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="200"
                    cy="40"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="300"
                    cy="25"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="400"
                    cy="20"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              ) : (
                <g>
                  <circle
                    cx="0"
                    cy="80"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="55"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="200"
                    cy="30"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="300"
                    cy="15"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="400"
                    cy="10"
                    r="4"
                    fill="#FF5C39"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Data Points for Benchmark Line */}
              {selectedEngine === "aurelius-1" ? (
                <g>
                  <circle
                    cx="0"
                    cy="80"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="100"
                    cy="75"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="200"
                    cy="70"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="300"
                    cy="65"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="400"
                    cy="60"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                </g>
              ) : (
                <g>
                  <circle
                    cx="0"
                    cy="80"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="100"
                    cy="74"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="200"
                    cy="68"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="300"
                    cy="62"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="400"
                    cy="58"
                    r="3"
                    fill="rgba(255,255,255,0.7)"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Performance Values at Key Points */}
              <g className="performance-values">
                {selectedEngine === "aurelius-1" ? (
                  <g>
                    <text
                      x="105"
                      y="55"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +64%
                    </text>
                    <text
                      x="205"
                      y="35"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +128%
                    </text>
                    <text
                      x="305"
                      y="20"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +186%
                    </text>
                    <text
                      x="400"
                      y="15"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="end"
                    >
                      +198%
                    </text>
                  </g>
                ) : (
                  <g>
                    <text
                      x="105"
                      y="50"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +72%
                    </text>
                    <text
                      x="205"
                      y="25"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +156%
                    </text>
                    <text
                      x="305"
                      y="10"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      +224%
                    </text>
                    <text
                      x="400"
                      y="5"
                      fill="#FF5C39"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="end"
                    >
                      +268%
                    </text>
                  </g>
                )}
              </g>

              {/* Benchmark Values */}
              <g className="benchmark-values">
                {selectedEngine === "aurelius-1" ? (
                  <g>
                    <text
                      x="105"
                      y="70"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +18%
                    </text>
                    <text
                      x="205"
                      y="65"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +28%
                    </text>
                    <text
                      x="305"
                      y="60"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +35%
                    </text>
                    <text
                      x="400"
                      y="55"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="end"
                    >
                      +42%
                    </text>
                  </g>
                ) : (
                  <g>
                    <text
                      x="105"
                      y="69"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +22%
                    </text>
                    <text
                      x="205"
                      y="63"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +32%
                    </text>
                    <text
                      x="305"
                      y="57"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      +38%
                    </text>
                    <text
                      x="400"
                      y="53"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="end"
                    >
                      +45%
                    </text>
                  </g>
                )}
              </g>
            </svg>
          </div>
        </div>

        {selectedEngine === "aurelius-1" && (
          <div>
            {/* Live Profit Counter - Direct load for better performance */}
            <AnimatedCard
              delay={200}
              className="performance-profit-counter"
            >
              <LiveProfitCounter
                targetProfit={currentContent.profitTarget}
                duration={3000}
              />
            </AnimatedCard>

            {/* Live Trading Dashboard - Direct load */}
            <AnimatedCard
              delay={300}
              className="performance-dashboard-container"
            >
              <TradingDashboard />
            </AnimatedCard>
          </div>
        )}

        {selectedEngine === "aurelius-1" && (
          <AnimatedCard
            delay={500}
            className="coming-soon-performance"
          >
            <div className="coming-soon-content">
              <Bot size={48} className="coming-soon-icon" />
              <h3>Engine Discontinued</h3>
              <p>
                Aurelius-1™ has been retired. It has been fully
                succeeded by Pythagoras Stardust™, our
                current-generation gold trading engine.
              </p>
            </div>
          </AnimatedCard>
        )}
      </div>
    </section>
  );
});

// Research Section Component
const ResearchSection = React.memo(() => {
  const [selectedEngine, setSelectedEngine] = useState(
    "pythagoras-stardust",
  );

  const engines = useMemo(
    () => [
      {
        id: "pythagoras-stardust",
        name: "Pythagoras Stardust™",
        type: "XAU/USD ML Trading",
        status: "active",
      },
      {
        id: "aurelius-1",
        name: "Aurelius-1™",
        type: "Gold Trading — Discontinued",
        status: "coming-soon",
      },
    ],
    [],
  );

  const engineHighlights = useMemo(
    () => ({
      "pythagoras-stardust": [
        { number: "18+", label: "Years of R&D" },
        { number: "50+", label: "Proprietary Alpha Models" },
        { number: "2B+", label: "Training Data Points" },
        { number: "99.9%", label: "Uptime" },
      ],
      "aurelius-1": [
        { number: "—", label: "Discontinued" },
        { number: "—", label: "No Longer Active" },
        { number: "—", label: "Succeeded by Stardust™" },
        { number: "—", label: "Retired" },
      ],
    }),
    [],
  );

  const engineResearch = useMemo(
    () => ({
      "pythagoras-stardust": [
        {
          icon: TrendingUp,
          title: "Non-Linear Quantitative Signal Pipeline",
          desc: "A multi-layer signal pipeline that evaluates XAU/USD market structure bar-by-bar using normalized multi-factor features for statistically edge-positive entries.",
          details: [
            "Bar-by-bar market structure analysis",
            "Multi-factor feature normalization",
            "Quantitative edge scoring",
          ],
        },
        {
          icon: Bot,
          title: "PyTorch / ONNX ML Architecture",
          desc: "PyTorch-trained predictive models exported through ONNX for direct MT5 execution — combining model-confidence scoring with out-of-distribution protection.",
          details: [
            "PyTorch deep learning models",
            "ONNX cross-platform export",
            "OOD regime detection",
          ],
        },
        {
          icon: Microscope,
          title: "Volatility-Aware Regime Filtering",
          desc: "ATR-based dynamic exits and volatility-aware regime filters adapt the engine to live market conditions, preventing execution during unfavorable regimes.",
          details: [
            "ATR dynamic stop/target logic",
            "Volatility regime classification",
            "Strict risk-governance rules",
          ],
        },
      ],
      "aurelius-1": [
        {
          icon: TrendingUp,
          title: "Legacy Engine — Retired",
          desc: "Aurelius-1™ research and development has been discontinued. All R&D resources have been redirected to Pythagoras Stardust™.",
          details: [
            "Engine retired",
            "No further updates",
            "Succeeded by Pythagoras Stardust™",
          ],
        },
        {
          icon: Bot,
          title: "RFDF Architecture — Superseded",
          desc: "The Random Forest–based Decision Framework (RFDF) of Aurelius-1™ has been superseded by the PyTorch/ONNX ML architecture of Pythagoras Stardust™.",
          details: [
            "Random Forest legacy system",
            "Replaced by PyTorch models",
            "No longer maintained",
          ],
        },
        {
          icon: Microscope,
          title: "Migrate to Pythagoras Stardust™",
          desc: "Existing Aurelius-1™ clients are encouraged to transition to Pythagoras Stardust™ for continued access to our XAU/USD ML trading capabilities.",
          details: [
            "Seamless migration available",
            "Contact us to transition",
            "Full MT5 compatibility retained",
          ],
        },
      ],
    }),
    [],
  );

  const sectionContent = useMemo(
    () => ({
      "pythagoras-stardust": {
        title: "Innovation That Never Sleeps.",
        description:
          "Pythagoras Stardust™ is built on PyTorch-trained ML models and a non-linear quantitative signal pipeline — combining confidence scoring, regime filtering, OOD protection, and ATR-based dynamic exits for fully rule-based XAU/USD execution.",
      },
      "aurelius-1": {
        title: "Aurelius-1™ — Discontinued.",
        description:
          "Aurelius-1™ has been retired. All research and development has transitioned to Pythagoras Stardust™.",
      },
    }),
    [],
  );

  const currentHighlights =
    engineHighlights[selectedEngine] ||
    engineHighlights["pythagoras-stardust"];
  const currentResearch =
    engineResearch[selectedEngine] ||
    engineResearch["pythagoras-stardust"];
  const currentContent =
    sectionContent[selectedEngine] ||
    sectionContent["pythagoras-stardust"];

  return (
    <section id="research" className="research-section">
      <div
        className="section-container"
        style={{ marginTop: "-3rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              color: "#FFFFFF",
            }}
          >
            {selectedEngine === "aurelius-1" ? (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Innovation That Never{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Sleeps
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            ) : (
              <span style={{ display: "contents" }}>
                <span style={{ color: "#FFFFFF" }}>
                  Research at the{" "}
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Frontier
                </span>
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #FF5C39, #FF3D1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .
                </span>
              </span>
            )}
          </h2>
          <p>{currentContent.description}</p>
        </div>

        <EngineSelector
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
          engines={engines}
        />

        <div className="research-highlights">
          {currentHighlights.map((highlight, index) => (
            <AnimatedCard
              key={`${selectedEngine}-${highlight.label}`}
              delay={index * 100}
              className="highlight-item"
            >
              <div className="highlight-number">
                {highlight.number}
              </div>
              <div className="highlight-label">
                {highlight.label}
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="research-grid">
          {currentResearch.map((item, index) => (
            <AnimatedCard
              key={`${selectedEngine}-${item.title}`}
              delay={index * 150}
              className="research-card"
            >
              <item.icon className="research-icon" size={36} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="research-details">
                {item.details.map((detail) => (
                  <div key={detail} className="detail-item">
                    • {detail}
                  </div>
                ))}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
});

// OLD PRICING SECTION DELETED - Now using /components/PricingSectionClean.tsx exclusively

/* COMPLETELY DISABLED - DO NOT USE
// Pricing Section Component
const OLDPricingSection = React.memo(({ onShowAgreement }: { onShowAgreement: (plan: any) => void }) => {
  const [selectedEngine, setSelectedEngine] = useState('aurelius-1');
  const [pricingModel, setPricingModel] = useState('subscription');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('quarterly');
  
  // WhatsApp order form generator
  const generateWhatsAppOrderURL = useCallback(() => {
    const engineName = selectedEngine === 'aurelius-1' ? 'Aurelius-1™' : 'Titanus-X™';
    const engineType = selectedEngine === 'aurelius-1' ? 'XAU/USD Gold Trading' : 'Options Trading';
    
    let message = `*TERRALABS INDUSTRIES*\n*INFORMATION TECHNOLOGY CONSULTANCIES ��� FZCO*\n\n`;
    message += `License Number: 75343\n`;
    message += `Dubai Integrated Economic Zones Authority (DIEZA)\n`;
    message += `Operating via IFZA / Dubai Silicon Oasis\n\n`;
    message += `75343 - 001, IFZA Business Park,\n`;
    message += `Dubai Digital Park (DDP),\n`;
    message += `Dubai Silicon Oasis, Dubai, UAE\n\n`;
    message += `═══════════════════════\n`;
    message += `*ORDER FORM*\n`;
    message += `═══════════════════════\n\n`;
    message += `ENGINE: ${engineName}\n`;
    message += `TYPE: ${engineType}\n`;
    message += `═══════════════════════\n\n`;
    
    if (pricingModel === 'subscription') {
      const periodLabel = subscriptionPeriod === 'quarterly' ? 'Quarterly' : 
                         subscriptionPeriod === 'halfyearly' ? 'Half-Yearly' : 'Annual';
      const rate = subscriptionPeriod === 'quarterly' ? '4.25%' : 
                   subscriptionPeriod === 'halfyearly' ? '8%' : '15%';
      const period = subscriptionPeriod === 'quarterly' ? 'quarter' : 
                     subscriptionPeriod === 'halfyearly' ? '6 months' : 'year';
      const annualCost = subscriptionPeriod === 'quarterly' ? '17%' : 
                        subscriptionPeriod === 'halfyearly' ? '16%' : '15%';
      
      message += `*PRICING MODEL: SUBSCRIPTION*\n\n`;
      message += `Billing Period: ${periodLabel}\n`;
      message += `Rate: ${rate} of capital per ${period}\n`;
      message += `Annual Cost: ${annualCost} of capital\n\n`;
      message += `*BENEFITS*\n`;
      message += `• Keep 100% of all profits\n`;
      message += `• No performance fees\n`;
      message += `• Full MT5 integration\n`;
      message += `• Complete fund control\n\n`;
    } else {
      message += `*PRICING MODEL: PERFORMANCE FEE*\n\n`;
      message += `Profit Split: 70% Client / 30% Performance Fee\n`;
      message += `Fee Calculation: 30% of profits only\n`;
      message += `Upfront Cost: $0\n\n`;
      message += `*BENEFITS*\n`;
      message += `• No upfront payment required\n`;
      message += `• Pay only when profitable\n`;
      message += `• Keep 70% of all profits\n`;
      message += `• Complete fund control\n\n`;
    }
    
    message += `═══════════════════════\n`;
    message += `*REQUIREMENTS*\n`;
    message += `• Minimum Capital: $10,000\n`;
    message += `• Trading Platform: MetaTrader 5\n`;
    message += `• Broker: We recommend trusted brokers for your safety\n\n`;
    message += `═══════════════════════\n\n`;
    message += `*CLIENT INFORMATION*\n`;
    message += `Please provide:\n\n`;
    message += `Full Name:\n`;
    message += `Email:\n`;
    message += `Phone:\n`;
    message += `Trading Capital Amount:\n\n`;
    message += `═══════════════════════\n\n`;
    message += `*ONBOARDING PROCESS*\n`;
    message += `1. We send payment details\n`;
    message += `2. Client completes payment and shares confirmation\n`;
    message += `3. We send official receipt\n`;
    message += `4. Manual onboarding begins\n`;
    message += `5. MT5 API integration setup\n`;
    message += `6. Trading engine activation`;
    
    return `https://wa.me/971543434848?text=${encodeURIComponent(message)}`;
  }, [selectedEngine, pricingModel, subscriptionPeriod]);
  
  const engines = useMemo(() => [
    { id: 'aurelius-1', name: 'Aurelius-1™', type: 'Gold Trading', status: 'active' },
    { id: 'titanus-x', name: 'Titanus-X™', type: 'Options Trading', status: 'coming-soon' }
  ], []);

  const subscriptionFeatures = useMemo(() => ({
    'aurelius-1': [
      'Full access to Aurelius-1™ trading engine',
      'Direct MetaTrader 5 integration',
      'Complete trade transparent dashboard of your own MT5',
      'You keep 100% control of your broker account',
      'Your funds never leave your account',
      'Withdraw your money anytime',
      'Complete transparency of all trades',
      'Email and chat support',
      'Monthly performance reports',
      'No performance fees - keep 100% of profits'
    ],
    'titanus-x': [
      'Full access to Titanus-X™ options engine',
      'NIFTY/BANKNIFTY options signals',
      'Indian trading platform integration',
      'You keep 100% control of your broker account',
      'Your funds never leave your account',
      'Withdraw your money anytime',
      'Complete transparency of all trades',
      'Priority email and chat support',
      'Weekly options performance reports',
      'No performance fees - keep 100% of profits'
    ]
  }), []);

  const performanceFeatures = useMemo(() => ({
    'aurelius-1': [
      'Zero upfront costs - pay only on profits',
      '70% of profits go to you',
      '30% performance fee only when profitable',
      'You keep 100% control of your broker account',
      'Your funds never leave your account',
      'Withdraw your money anytime',
      'Complete transparency of all trades',
      'Automated fee allocation via broker PAMM/IB system'
    ],
    'titanus-x': [
      'Zero upfront costs - pay only on profits',
      '70% of profits go to you',
      '30% performance fee only when profitable',
      'Your options positions remain in your account',
      'Full control over your trading capital',
      'Transparent options strategy execution',
      'Real-time position and P&L tracking',
      'Performance-based alignment with your success'
    ]
  }), []);

  const sectionContent = useMemo(() => ({
    'aurelius-1': {
      title: 'Choose the Plan That Fits You.',
      description: 'Flexible pricing models designed for traders at every level. Pay monthly or share in performance—you decide.',
      subscriptionTitle: 'CAPITAL-BASED SUBSCRIPTION',
      subscriptionDesc: 'Transparent pricing based on your investment amount. Choose your billing period and keep 100% of your trading profits.',
      performanceTitle: 'PERFORMANCE FEE',
      performanceDesc: 'No upfront costs. Pay 30% of profits only. You keep 70%.',
      whiteLabelTitle: 'White Label Solutions',
      whiteLabelDesc: 'Complete Aurelius-1™ platform deployment for institutions and brokers. Custom implementation available.'
    },
    'titanus-x': {
      title: 'Options Trading Plans.',
      description: 'Choose between fixed subscription or performance-based pricing for professional options trading.',
      subscriptionTitle: 'CAPITAL-BASED SUBSCRIPTION',
      subscriptionDesc: 'Transparent pricing based on your investment amount. Choose your billing period and keep all your trading profits.',
      performanceTitle: 'PERFORMANCE FEE',
      performanceDesc: 'No monthly fees. Pay 30% of profits only.',
      whiteLabelTitle: 'Options White Label',
      whiteLabelDesc: 'Complete Titanus-X™ options platform for brokers and institutions. Customizable for Indian derivative markets.'
    }
  }), []);

  const currentContent = sectionContent[selectedEngine] || sectionContent['aurelius-1'];
  const currentSubscriptionFeatures = subscriptionFeatures[selectedEngine] || subscriptionFeatures['aurelius-1'];
  const currentPerformanceFeatures = performanceFeatures[selectedEngine] || performanceFeatures['aurelius-1'];

  return (
    <section id="pricing" className="pricing-section">
      <div className="section-container">
        <div className="section-header">
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 8rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em',
            textAlign: 'center',
            margin: '0 auto 1.5rem auto',
            padding: '0 1rem',
            color: '#FFFFFF'
          }}>
            {selectedEngine === 'aurelius-1' ? (
              <span style={{ display: 'contents' }}>
                <span style={{ color: '#FFFFFF' }}>Choose the Plan That </span>
                <span style={{
                  background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Fits You</span>
                <span style={{ color: '#FFFFFF' }}>.</span>
              </span>
            ) : (
              <span style={{ display: 'contents' }}>
                <span style={{ color: '#FFFFFF' }}>Options Trading </span>
                <span style={{
                  background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Plans</span>
                <span style={{ color: '#FFFFFF' }}>.</span>
              </span>
            )}
          </h2>
          <p>{currentContent.description}</p>
        </div>

        <EngineSelector 
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
          engines={engines}
        />

        <div className="pricing-model-selector">
          <button 
            className={`pricing-model-btn ${pricingModel === 'subscription' ? 'active' : ''}`}
            onClick={() => setPricingModel('subscription')}
          >
            <span className="model-label">Subscription</span>
            <span className="model-sublabel">Capital-Based Pricing</span>
          </button>
          <button 
            className={`pricing-model-btn ${pricingModel === 'performance' ? 'active' : ''}`}
            onClick={() => setPricingModel('performance')}
          >
            <span className="model-label">Performance Fee</span>
            <span className="model-sublabel">Pay on Profits Only</span>
          </button>
        </div>

        {pricingModel === 'subscription' ? (
          <div>
            <div className="pricing-intro">
              <h3>{currentContent.subscriptionTitle}</h3>
              <p>{currentContent.subscriptionDesc}</p>
            </div>

            <div className="subscription-period-selector">
              <button 
                className={`period-btn ${subscriptionPeriod === 'quarterly' ? 'active' : ''}`}
                onClick={() => setSubscriptionPeriod('quarterly')}
              >
                <span className="period-label">Quarterly</span>
                <span className="rate-badge">4.25% / quarter</span>
                <span className="annual-rate">17% annually</span>
              </button>
              <button 
                className={`period-btn ${subscriptionPeriod === 'halfyearly' ? 'active' : ''}`}
                onClick={() => setSubscriptionPeriod('halfyearly')}
              >
                <span className="period-label">Half-Yearly</span>
                <span className="rate-badge">8% / 6 months</span>
                <span className="annual-rate">16% annually</span>
              </button>
              <button 
                className={`period-btn ${subscriptionPeriod === 'annual' ? 'active' : ''}`}
                onClick={() => setSubscriptionPeriod('annual')}
              >
                <span className="period-label">Annual</span>
                <span className="rate-badge">15% / year</span>
                <span className="annual-rate best-value">⭐ Best Value</span>
              </button>
            </div>

            <div className="pricing-card-container">
              <AnimatedCard className="pricing-card subscription-card">
                <div className="pricing-card-header">
                  {subscriptionPeriod === 'annual' && (
                    <div className="best-value-badge">
                      BEST VALUE - Lowest Annual Cost
                    </div>
                  )}
                  <div className="pricing-amount">
                    <span className="price">{subscriptionPeriod === 'quarterly' ? '4.25%' : subscriptionPeriod === 'halfyearly' ? '8%' : '15%'}</span>
                    <span className="period">of capital / {subscriptionPeriod === 'quarterly' ? 'quarter' : subscriptionPeriod === 'halfyearly' ? 'half-year' : 'year'}</span>
                  </div>
                  <div className="annual-equivalent-display">
                    <span className="equivalent-label">Annual Cost</span>
                    <span className="equivalent-value">{subscriptionPeriod === 'quarterly' ? '17%' : subscriptionPeriod === 'halfyearly' ? '16%' : '15%'} of your capital</span>
                  </div>
                  <div className="pricing-note">
                    Minimum capital: $10,000
                  </div>
                </div>
                
                <div className="pricing-features">
                  {currentSubscriptionFeatures.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onShowAgreement({
                    name: `${subscriptionPeriod.charAt(0).toUpperCase() + subscriptionPeriod.slice(1)} Subscription`,
                    price: subscriptionPeriod === 'quarterly' ? '4.25% of capital per quarter' : subscriptionPeriod === 'halfyearly' ? '8% of capital per 6 months' : '15% of capital per year',
                    capital: '$10,000 minimum',
                    engine: selectedEngine === 'aurelius-1' ? 'Aurelius-1™' : 'Titanus-X™',
                    pricingModel: 'subscription',
                    period: subscriptionPeriod === 'quarterly' ? 'Quarterly (Every 3 Months)' : subscriptionPeriod === 'halfyearly' ? 'Half-Yearly (Every 6 Months)' : 'Annual (Every 12 Months)'
                  })}
                  className="btn-primary pricing-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FileText size={18} />
                  Get Started
                </button>
              </AnimatedCard>
            </div>
          </div>
        ) : (
          <div>
            <div className="pricing-intro">
              <h3>{currentContent.performanceTitle}</h3>
              <p>{currentContent.performanceDesc}</p>
            </div>

            <div className="pricing-card-container">
              <AnimatedCard className="pricing-card performance-card">
                <div className="pricing-card-header">
                  <div className="performance-split">
                    <div className="split-item client-split">
                      <div className="split-percentage">70%</div>
                      <div className="split-label">You Keep</div>
                    </div>
                    <span className="split-divider">|</span>
                    <div className="split-item company-split">
                      <div className="split-percentage">30%</div>
                      <div className="split-label">Performance Fee</div>
                    </div>
                  </div>
                  <div className="performance-note">
                    30% performance fee paid quarterly • Only on profitable trades
                  </div>
                </div>
                
                <div className="pricing-features">
                  {currentPerformanceFeatures.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onShowAgreement({
                    name: 'Performance Fee Model',
                    price: '30% of quarterly profits only',
                    capital: '$10,000 minimum',
                    engine: selectedEngine === 'aurelius-1' ? 'Aurelius-1™' : 'Titanus-X™',
                    pricingModel: 'performance',
                    period: 'Quarterly'
                  })}
                  className="btn-primary pricing-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FileText size={18} />
                  Get Started
                </button>
              </AnimatedCard>
            </div>
          </div>
        )}

        {selectedEngine === 'aurelius-1' && (
          <div className="white-label-section">
            <div className="white-label-card">
              <h4>{currentContent.whiteLabelTitle}</h4>
              <p>{currentContent.whiteLabelDesc}</p>
              <a 
                href="https://wa.me/971543434848?text=Hi%2C%20I'm%20interested%20in%20White%20Label%20solutions%20for%20Pythagoras%20Stardust%E2%84%A2%20and%20would%20like%20to%20discuss%20partnership%20opportunities." 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <MessageCircle size={18} />
                Contact for White Label
              </a>
            </div>
          </div>
        )}

        {selectedEngine === 'titanus-x' && (
          <div className="white-label-section">
            <div className="white-label-card">
              <h4>{currentContent.whiteLabelTitle}</h4>
              <p>{currentContent.whiteLabelDesc}</p>
              <div className="coming-soon-notice">
                <Bot size={24} />
                <span>Contact us for White Label availability</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
END OF OLD PRICING SECTION - DISABLED */

// Partners Section Component
const PartnersSection = React.memo(() => {
  const brokers = useMemo(
    () => [
      { logo: "IG", name: "IG Group" },
      { logo: "PP", name: "Pepperstone" },
      { logo: "EQ", name: "Equiti" },
      { logo: "ADSS", name: "ADSS" },
    ],
    [],
  );

  return (
    <section id="partners" className="partners-section">
      <div
        className="section-container"
        style={{ marginTop: "-3rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>
              We Stand With the{" "}
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Best
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </h2>
          <p>
            Your capital security is our priority. We only
            recommend brokers who meet the highest global
            regulatory standards authorized by the SCA (UAE),
            FCA (UK), ASIC (Australia), and CySEC (EU). Each
            partner maintains tier-1 compliance frameworks
            ensuring segregated client accounts, deposit
            protection schemes, and strict institutional
            oversight across multiple continents, giving you
            complete transparency and peace of mind regardless
            of where you trade.
          </p>
        </div>

        <div
          className="broker-logos"
          style={{
            gap: "1.25rem",
            margin: "2rem 0",
            padding: "2rem 1.5rem",
          }}
        >
          {brokers.map((broker) => (
            <AnimatedCard
              key={broker.name}
              className="broker-item"
            >
              <div className="broker-logo">{broker.logo}</div>
              <span>{broker.name}</span>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
});

// Contact Section Component
const ContactSection = React.memo(() => {
  return (
    <section id="contact" className="contact-section">
      <div
        className="section-container"
        id="contact-section"
        style={{ marginTop: "-4rem" }}
      >
        <div className="section-header">
          {/* Decorative Orange Line */}
          <div
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "clamp(3px, 0.5vw, 4px)",
              background:
                "linear-gradient(to right, #FF5C39, #FF3D1A)",
              margin: "0 auto clamp(1rem, 3vw, 2rem) auto",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255, 92, 57, 0.5)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textAlign: "center",
              margin: "0 auto 1.5rem auto",
              padding: "0 1rem",
              paddingTop: "0",
              marginTop: "0",
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>
              Questions? Let's{" "}
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Talk
            </span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #FF5C39, #FF3D1A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </h2>
          <p>
            Have questions about Pythagoras Stardust™? Want to
            schedule a demo? We're here to help you understand
            how our trading engines can work for you.
          </p>
        </div>

        <div
          className="contact-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
            gap: "2rem",
          }}
        >
          {/* Schedule a Demo Card */}
          <AnimatedCard className="contact-card">
            <MessageCircle className="contact-icon" size={48} />
            <h3>Schedule a Demo Call</h3>
            <p>
              Get a personalized walkthrough of Pythagoras
              Stardust™, ask questions, and see how our engine
              can fit your trading strategy.
            </p>

            <div className="contact-buttons">
              <button
                className="btn-secondary large"
                onClick={() => {
                  const message =
                    `*TERRALABS INDUSTRIES*\n*INFORMATION TECHNOLOGY CONSULTANCIES – FZCO*\n\n` +
                    `License Number: 75343\n` +
                    `Dubai Integrated Economic Zones Authority (DIEZA)\n` +
                    `Operating via IFZA / Dubai Silicon Oasis\n\n` +
                    `75343 - 001, IFZA Business Park,\n` +
                    `Dubai Digital Park (DDP),\n` +
                    `Dubai Silicon Oasis, Dubai, UAE\n\n` +
                    `═══════════════════════\n` +
                    `*DEMO CALL REQUEST*\n` +
                    `═══════════════════════\n\n` +
                    `I would like to schedule a demo call to learn more about your trading engines.\n\n` +
                    `*CLIENT INFORMATION*\n` +
                    `Please provide:\n\n` +
                    `Full Name:\n` +
                    `Email:\n` +
                    `Phone:\n` +
                    `Preferred Date/Time:\n` +
                    `Areas of Interest: [Pythagoras Stardust™ / Enterprise / Other]\n\n` +
                    `═══════════════════════\n\n` +
                    `*ADDITIONAL QUESTIONS*\n` +
                    `Current trading experience:\n` +
                    `Trading capital range:\n` +
                    `Specific questions:`;
                  window.open(
                    `https://wa.me/971543434848?text=${encodeURIComponent(message)}`,
                    "_blank",
                  );
                }}
              >
                Schedule Demo Call
              </button>
            </div>

            <div className="contact-features">
              <div className="feature-highlight">
                <CheckCircle size={16} />
                <span>Performance-based model</span>
              </div>
              <div className="feature-highlight">
                <CheckCircle size={16} />
                <span>Full custody control</span>
              </div>
              <div className="feature-highlight">
                <CheckCircle size={16} />
                <span>Complete transparency</span>
              </div>
            </div>
          </AnimatedCard>

          {/* Contact Information Card */}
          <AnimatedCard className="contact-card">
            <Mail className="contact-icon" size={48} />
            <h3>Contact Information</h3>
            <p>
              Reach out to us directly through any of these
              channels. We're here to answer your questions.
            </p>

            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                className="contact-item"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <MapPin
                  size={20}
                  style={{
                    color: "#FF5C39",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      TERRALABS INDUSTRIES
                    </strong>
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                      }}
                    >
                      INFORMATION TECHNOLOGY CONSULTANCIES –
                      FZCO
                    </strong>
                    <span
                      style={{
                        display: "block",
                        opacity: 0.8,
                        marginBottom: "0.25rem",
                      }}
                    >
                      License Number: 75343
                    </span>
                    <span
                      style={{
                        display: "block",
                        opacity: 0.8,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Dubai Integrated Economic Zones Authority
                      (DIEZA)
                    </span>
                    <span
                      style={{ display: "block", opacity: 0.8 }}
                    >
                      75343 - 001, IFZA Business Park, Dubai
                      Digital Park, Dubai Silicon Oasis, Dubai,
                      UAE
                    </span>
                  </p>
                </div>
              </div>

              <div
                className="contact-item"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Phone
                  size={20}
                  style={{ color: "#FF5C39", flexShrink: 0 }}
                />
                <a
                  href="tel:+971543434848"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  +971 5 4343 4848
                </a>
              </div>

              <div
                className="contact-item"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <MessageCircle
                  size={20}
                  style={{ color: "#FF5C39", flexShrink: 0 }}
                />
                <a
                  href="https://wa.me/971543434848"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  WhatsApp
                </a>
              </div>

              <div
                className="contact-item"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Mail
                  size={20}
                  style={{ color: "#FF5C39", flexShrink: 0 }}
                />
                <a
                  href="mailto:terralabsindustries@outlook.com"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                    wordBreak: "break-all",
                    lineHeight: "1.4",
                  }}
                >
                  terralabsindustries@outlook.com
                </a>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
});

// Floating Mobile Navigation Component
const FloatingMobileNav = React.memo(
  ({ activeSection, onNavigate, scrollY }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
      setShowScrollTop(scrollY > 500);
    }, [scrollY]);

    const scrollToTop = useCallback(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const navItems = useMemo(
      () => [
        { id: "home", icon: Rocket, label: "Home" },
        { id: "engines", icon: Brain, label: "Engines" },
        { id: "features", icon: Zap, label: "Features" },
        {
          id: "performance",
          icon: TrendingUp,
          label: "Performance",
        },
        { id: "research", icon: Microscope, label: "Research" },
        { id: "pricing", icon: Target, label: "Pricing" },
        { id: "partners", icon: Handshake, label: "Partners" },
        { id: "board", icon: Award, label: "Board" },
        { id: "roadmap", icon: Map, label: "RoadMap" },
        {
          id: "contact",
          icon: MessageCircle,
          label: "Onboard",
        },
      ],
      [],
    );

    return <div className="floating-mobile-nav"></div>;
  },
);

// Main App Component
export default function App() {
  const { scrollY, activeSection, setActiveSection } =
    useOptimizedScroll();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showPromoShowcase, setShowPromoShowcase] =
    useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState<
    string | null
  >(null);
  const [
    selectedPlanForAgreement,
    setSelectedPlanForAgreement,
  ] = useState<any>(null);
  const [savedScrollPosition, setSavedScrollPosition] =
    useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Force LTR direction for English-only version
  useEffect(() => {
    // Clear any stored language preference
    localStorage.removeItem("terralabs-language");
    // Force LTR direction
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }, []);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    setShowScrollTop(scrollY > 500);
  }, [scrollY]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  // Apply dark theme
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    return () => {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    };
  }, []);

  // Show unified onboarding handler
  // Show login page handler
  const handleShowLogin = useCallback(() => {
    setSavedScrollPosition(window.pageYOffset);
    setShowLoginPage(true);
    window.scrollTo(0, 0);
  }, []);

  // Hide login page handler
  const handleHideLogin = useCallback(() => {
    setShowLoginPage(false);
    // Restore scroll position after a brief delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, savedScrollPosition);
    }, 0);
  }, [savedScrollPosition]);

  // Show legal page handler
  const handleShowLegalPage = useCallback(
    (pageName: string) => {
      setSavedScrollPosition(window.pageYOffset);
      setCurrentLegalPage(pageName);
      window.scrollTo(0, 0);
    },
    [],
  );

  // Hide legal page handler
  const handleHideLegalPage = useCallback(() => {
    setCurrentLegalPage(null);
    setSelectedPlanForAgreement(null);
    // Restore scroll position after a brief delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, savedScrollPosition);
    }, 0);
  }, [savedScrollPosition]);

  // Show customer agreement with plan details
  const handleShowAgreement = useCallback((plan: any) => {
    setSavedScrollPosition(window.pageYOffset);
    setSelectedPlanForAgreement(plan);
    setCurrentLegalPage("agreement");
    window.scrollTo(0, 0);
  }, []);

  // Show onboarding form
  const handleShowOnboarding = useCallback((plan: any) => {
    setSavedScrollPosition(window.pageYOffset);
    setSelectedPlanForAgreement(plan);
    setCurrentLegalPage("onboarding");
    window.scrollTo(0, 0);
  }, []);

  // Show enterprise page
  const handleShowEnterprise = useCallback(() => {
    setSavedScrollPosition(window.pageYOffset);
    setCurrentLegalPage("enterprise");
    window.scrollTo(0, 0);
  }, []);

  // IMPORTANT: All hooks must be called before any conditional returns
  const scrollToSection = useCallback(
    (sectionId) => {
      // Immediately update active section to prevent stuck state
      setActiveSection(sectionId);

      const element = document.getElementById(sectionId);
      if (element) {
        // Dynamic navigation height based on screen size
        const isMobile = window.innerWidth <= 768;
        const navHeight = isMobile ? 90 : 110; // Adjusted offset for better visibility
        const elementPosition =
          element.getBoundingClientRect().top +
          window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        console.warn(
          `Section with id "${sectionId}" not found`,
        );
      }
    },
    [setActiveSection],
  );

  const scrollProgress = useMemo(() => {
    // Runs during render, so it also runs on the server where there is no DOM.
    // scrollY starts at 0, so returning 0 here matches the first client render exactly.
    if (typeof document === "undefined") return 0;
    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;
    return Math.min(
      1,
      Math.max(0, scrollY / Math.max(1, maxScroll)),
    );
  }, [scrollY]);

  // If promo showcase is active, show it instead (after all hooks are called)
  if (showPromoShowcase) {
    return (
      <div>
        <button
          onClick={() => {
            setShowPromoShowcase(false);
            // Restore scroll position after a brief delay to ensure DOM is ready
            setTimeout(() => {
              window.scrollTo(0, savedScrollPosition);
            }, 0);
          }}
          className="fixed top-4 left-4 z-[9999] px-6 py-3 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white hover:shadow-lg transition-all"
          style={{ fontWeight: 600 }}
        >
          ← Back to Main App
        </button>
        <ShowcasePage />
      </div>
    );
  }

  // Render login page if active (after all hooks are called)
  if (showLoginPage) {
    return <ClientLoginPage onBack={handleHideLogin} />;
  }

  // Render legal pages if active
  if (currentLegalPage === "terms") {
    return <TermsOfService onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "privacy") {
    return <PrivacyPolicy onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "risk") {
    return <RiskDisclosure onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "compliance") {
    return <CompliancePolicy onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "cookies") {
    return <CookiePolicy onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "refund") {
    return <RefundPolicy onBack={handleHideLegalPage} />;
  }
  if (currentLegalPage === "agreement") {
    return (
      <CustomerAgreement
        onBack={handleHideLegalPage}
        selectedPlan={selectedPlanForAgreement}
      />
    );
  }
  if (currentLegalPage === "onboarding") {
    return (
      <OnboardingForm
        onBack={handleHideLegalPage}
        selectedPlan={selectedPlanForAgreement}
      />
    );
  }
  if (currentLegalPage === "enterprise") {
    return <EnterprisePage onBack={handleHideLegalPage} />;
  }

  return (
    <div className="app">
      {/* Scroll Progress */}
      <div
        className="scroll-progress"
        style={{
          transform: `scaleX(${scrollProgress})`,
          height: "4px",
        }}
      />

      {/* Living Orb Background */}
      <BackgroundComponent />

      {/* Navigation */}
      <NavigationBar
        terralabsLogo={terralabsLogo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isMobile={isMobile}
      />

      {/* Floating Mobile Navigation */}
      <FloatingMobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        scrollY={scrollY}
      />

      {/* Main Content */}
      <main className="main-content">
        <HeroSection
          onLoginClick={() => scrollToSection("pricing")}
          onShowPromo={() => {
            setSavedScrollPosition(window.pageYOffset);
            setShowPromoShowcase(true);
          }}
        />
        <EnginesSection
          onLoginClick={() => scrollToSection("pricing")}
        />
        <FeaturesSection />
        <PerformanceSection />
        <ResearchSection />
        <PricingSection
          onShowAgreement={handleShowOnboarding}
          onShowEnterprise={handleShowEnterprise}
        />
        <PartnersSection />
        <section
          id="board"
          style={{ padding: "0", background: "transparent" }}
        >
          <BoardOfDirectors />
        </section>
        <ContactSection />
        <section
          id="roadmap"
          style={{ padding: "0", background: "transparent" }}
        >
          <RoadMap />
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* Footer Main */}
          <div className="footer-main">
            {/* Legal Department Section */}
            <div id="legal" className="footer-legal-department">
              <div className="legal-department-header">
                <FileText
                  size={28}
                  style={{ color: "#FF5C39" }}
                />
                <h3>Compliance & Legal</h3>
              </div>
              <p className="legal-department-description">
                Access our complete legal documentation and
                policies. All documents are available for review
                before onboarding.
              </p>
              <div className="legal-links-grid">
                {/* Primary Legal Documents - Top Row */}
                <button
                  onClick={() => handleShowLegalPage("terms")}
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Terms of Service
                    </span>
                    <span className="legal-link-description">
                      License agreement & user terms
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleShowLegalPage("privacy")}
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Privacy Policy
                    </span>
                    <span className="legal-link-description">
                      Data protection & user privacy
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleShowLegalPage("risk")}
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Risk Disclosure
                    </span>
                    <span className="legal-link-description">
                      Trading risks & disclaimers
                    </span>
                  </div>
                </button>

                {/* Supporting Policies - Bottom Row */}
                <button
                  onClick={() =>
                    handleShowLegalPage("compliance")
                  }
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Compliance Policy
                    </span>
                    <span className="legal-link-description">
                      Regulatory compliance framework
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleShowLegalPage("refund")}
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Refund Policy
                    </span>
                    <span className="legal-link-description">
                      Cancellation & refund procedures
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleShowLegalPage("cookies")}
                  className="legal-link-card"
                >
                  <FileText size={20} />
                  <div className="legal-link-content">
                    <span className="legal-link-title">
                      Cookie Policy
                    </span>
                    <span className="legal-link-description">
                      Cookie usage & preferences
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Company Brand & Description - Now Below Legal */}
            <div className="footer-brand-section">
              <div className="footer-logo">
                <img
                  src={terralabsLogo}
                  alt="TERRALABS"
                  className="footer-logo-img"
                />
                <h3 className="footer-company-name">
                  TERRALABS INDUSTRIES
                </h3>
              </div>

              <div className="footer-company-description">
                <p>
                  Terralabs Industries is a global R&D based
                  innovation house shaping the next era of
                  intelligence(Synthetic Intelligence). At the
                  intersection of AI, Fintech, Robotics and
                  Quantum Computing, we design adaptive systems
                  that transcend boundaries — from trading
                  floors to autonomous machines, from Earth's
                  infrastructure to interstellar exploration.
                </p>
                <p className="footer-tagline">
                  <strong>
                    Terralabs — Intelligence for Earth and
                    Beyond.
                  </strong>
                </p>
              </div>

              {/* Social Media Links */}
              <div className="footer-social">
                <div className="social-links">
                  <a
                    href="https://twitter.com/terralabs"
                    className="social-link"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/company/terralabs"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://instagram.com/terralabs"
                    className="social-link"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://youtube.com/@terralabs"
                    className="social-link"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>
                  <a
                    href="https://facebook.com/terralabs"
                    className="social-link"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="mailto:terralabsindustries@outlook.com"
                    className="social-link"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-bottom-left">
                <p>
                  &copy; 2025 TERRALABS INDUSTRIES INFORMATION
                  TECHNOLOGY CONSULTANCIES – FZCO. All rights
                  reserved.
                </p>
                <p
                  className="license-info"
                  style={{
                    fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
                    color: "#bef264",
                    fontWeight: "600",
                    marginTop: "0.5rem",
                    letterSpacing: "0.3px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Shield
                    size={16}
                    style={{ color: "#bef264" }}
                  />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #bef264 0%, #84cc16 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "700",
                    }}
                  >
                    License No. 75343
                  </span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    |
                  </span>
                  <span>
                    DIEZA (Dubai Integrated Economic Zones
                    Authority)
                  </span>
                </p>
              </div>

              <div className="footer-bottom-right">
                <div className="footer-badges">
                  <div className="regulation-badge">
                    <Shield size={16} />
                    <span>Regulated Entity</span>
                  </div>
                  <div className="security-badge">
                    <Globe size={16} />
                    <span>Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons - Stacked */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 1000,
        }}
      >
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255, 92, 57, 0.15) 0%, rgba(255, 61, 26, 0.1) 100%)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255, 92, 57, 0.3)",
              boxShadow: `
                0 8px 32px rgba(255, 92, 57, 0.2),
                0 2px 8px rgba(0, 0, 0, 0.15),
                inset 0 1px 1px rgba(255, 255, 255, 0.2),
                inset 0 -1px 1px rgba(0, 0, 0, 0.1)
              `,
              transition:
                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#FF5C39",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255, 92, 57, 0.35) 0%, rgba(255, 61, 26, 0.25) 100%)";
              e.currentTarget.style.borderColor =
                "rgba(255, 92, 57, 0.5)";
              e.currentTarget.style.transform =
                "translateY(-2px) scale(1.05)";
              e.currentTarget.style.boxShadow = `
                0 12px 40px rgba(255, 92, 57, 0.4),
                0 4px 12px rgba(0, 0, 0, 0.2),
                inset 0 1px 1px rgba(255, 255, 255, 0.3),
                inset 0 -1px 1px rgba(0, 0, 0, 0.1)
              `;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255, 92, 57, 0.15) 0%, rgba(255, 61, 26, 0.1) 100%)";
              e.currentTarget.style.borderColor =
                "rgba(255, 92, 57, 0.3)";
              e.currentTarget.style.transform =
                "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `
                0 8px 32px rgba(255, 92, 57, 0.2),
                0 2px 8px rgba(0, 0, 0, 0.15),
                inset 0 1px 1px rgba(255, 255, 255, 0.2),
                inset 0 -1px 1px rgba(0, 0, 0, 0.1)
              `;
              e.currentTarget.style.color = "#FF5C39";
            }}
          >
            <ChevronUp size={20} />
          </button>
        )}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/971543434848"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-button"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}