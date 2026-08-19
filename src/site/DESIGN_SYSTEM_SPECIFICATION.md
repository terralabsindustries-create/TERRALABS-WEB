# Complete Design System Specification
## TERRALABS Website Clone Guide

This document provides complete clone-level details for replicating this website's design system, structure, and interactions for any industry (e.g., food company, SaaS product, etc.).

---

## 1. DESIGN PHILOSOPHY & BRAND IDENTITY

### Core Design Principles
- **Premium & Enterprise-Grade**: High-end aesthetic with sophisticated animations
- **Data-Driven Transparency**: Metrics, statistics, and performance data prominently displayed
- **Trust & Credibility**: Professional polish with regulatory badges and social proof
- **Modern Tech Feel**: Dark theme with vibrant accent colors, glassmorphism effects

### Visual Style
- **Theme**: Dark mode with deep blacks and subtle gradients
- **Accent Color**: Bright orange-red (`#FF5C39`, `#FF3D1A`) - This should be replaced with your brand color
- **Glass Effects**: Frosted glass (backdrop blur) throughout for depth
- **Animations**: Smooth, Cuban's Edge-style scroll effects and micro-interactions

---

## 2. COLOR SYSTEM

### Primary Brand Colors (Replace for Food Company)
```css
--primary: #FF5C39;           /* Main brand color - REPLACE THIS */
--primary-dark: #FF3D1A;      /* Darker variant - REPLACE THIS */
--primary-glow: rgba(255, 92, 57, 0.4);  /* Glow effects */
```

### Base Colors (Keep Consistent)
```css
--background: #000000;        /* Pure black background */
--surface: #0a0a0a;          /* Slightly lighter surface */
--text-primary: #ffffff;      /* White text */
--text-secondary: rgba(255, 255, 255, 0.7);  /* Muted text */
--text-muted: rgba(255, 255, 255, 0.5);      /* Even more muted */
```

### Glassmorphism Palette
```css
--glass-light: rgba(255, 255, 255, 0.05);
--glass-medium: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-backdrop: rgba(0, 0, 0, 0.4);
```

### Status Colors
```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

---

## 3. TYPOGRAPHY SYSTEM

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
**Note**: Inter is a free Google Font - maintain for any industry

### Type Scale (Don't use Tailwind classes - use these CSS custom properties)
```css
/* Headings */
h1 { font-size: 4rem; font-weight: 700; line-height: 1.1; }
h2 { font-size: 3rem; font-weight: 700; line-height: 1.2; }
h3 { font-size: 2rem; font-weight: 600; line-height: 1.3; }
h4 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
h5 { font-size: 1.25rem; font-weight: 600; line-height: 1.5; }

/* Body */
p { font-size: 1rem; line-height: 1.6; }
small { font-size: 0.875rem; line-height: 1.5; }
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## 4. LAYOUT STRUCTURE

### Navigation Bar (Fixed Header)
**Location**: `/App.tsx` line 256-330

**Specifications**:
- **Position**: Fixed top, full width
- **Height**: ~80px (auto adjusts to content)
- **Background**: `rgba(0, 0, 0, 0.75)` with `backdrop-filter: blur(40px)`
- **Border**: Bottom border `1px solid rgba(255, 255, 255, 0.08)`
- **Z-index**: 1000

**Structure**:
```
<nav>
  ├── Logo (left)
  ├── Navigation Links (center/right)
  │   ├── Home
  │   ├── Features
  │   ├── Performance
  │   ├── Pricing
  │   ├── Research
  │   ├── About
  │   └── Contact
  └── CTA Button (right) - "Engine Login" or "Get Started"
```

**Mobile**:
- Hamburger menu button appears at 768px breakpoint
- Full-screen overlay menu with slide-in animation

---

### Page Layout Pattern
Every page follows this structure:

```jsx
<section className="page-section">
  <div className="page-container">
    <div className="page-header">
      <h1>Page Title</h1>
      <p>Subtitle or description</p>
    </div>
    
    <div className="page-content">
      {/* Main content grid/cards */}
    </div>
  </div>
</section>
```

**CSS Specs**:
```css
.page-section {
  min-height: 100vh;
  padding: 120px 20px 80px;  /* Top accounts for fixed nav */
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}
```

---

### Grid System

**Standard 3-Column Grid** (Features, Benefits, etc.):
```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

**4-Column Grid** (Stats, Metrics):
```css
.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

**Responsive Breakpoints**:
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

---

## 5. COMPONENT PATTERNS

### Glass Card Pattern
**Most common component** - Used for features, stats, pricing tiers, etc.

**CSS Template**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(255, 92, 57, 0.2);
}
```

**Usage**: Features, pricing cards, stat boxes, content cards

---

### Metric/Stat Display Pattern
**Examples**: Hero metrics, performance stats

```jsx
<div className="stat-card">
  <div className="stat-value">40-50%</div>
  <div className="stat-label">Annual Return</div>
</div>
```

**CSS**:
```css
.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

---

### Icon + Text Pattern
**Used in**: Features, benefits, contact info

```jsx
<div className="icon-text-item">
  <div className="icon-wrapper">
    <Icon size={24} />
  </div>
  <div className="text-content">
    <h3>Feature Title</h3>
    <p>Feature description text here</p>
  </div>
</div>
```

**CSS**:
```css
.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, 
    rgba(255, 92, 57, 0.2), 
    rgba(255, 92, 57, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 1rem;
}
```

---

### Button System

**Primary Button** (CTA):
```css
.btn-primary {
  background: linear-gradient(135deg, #FF5C39, #FF3D1A);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 92, 57, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:active::before {
  width: 300px;
  height: 300px;
}
```

**Secondary Button** (Outline):
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);
  padding: 1rem 2rem;
  border: 2px solid var(--primary);
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}
```

---

## 6. ANIMATION & INTERACTION PATTERNS

### Scroll-Triggered Animations
**Implementation**: Uses Intersection Observer API

**Pattern**:
```jsx
// In component
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}, []);
```

**CSS**:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Add to**: Section headers, cards, feature items, stats

---

### Stagger Animation (Cards)
```css
.card-grid .glass-card {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.card-grid .glass-card:nth-child(1) { animation-delay: 0.1s; }
.card-grid .glass-card:nth-child(2) { animation-delay: 0.2s; }
.card-grid .glass-card:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Hover Effects Catalog

**Card Lift**:
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

**Glow Effect**:
```css
.element::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s;
  background: radial-gradient(
    circle at center,
    rgba(255, 92, 57, 0.2),
    transparent
  );
}

.element:hover::after {
  opacity: 1;
}
```

**Scale Pulse**:
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.pulse-element:hover {
  animation: pulse 2s infinite;
}
```

---

## 7. PAGE-SPECIFIC PATTERNS

### Hero Section Pattern
**Height**: Full viewport (100vh)
**Layout**: Centered content with background effects

```jsx
<section className="hero-section">
  <div className="hero-background">
    {/* Animated orb/gradient background */}
  </div>
  
  <div className="hero-content">
    <h1 className="hero-title">
      Main Headline
    </h1>
    <p className="hero-subtitle">
      Supporting text or value proposition
    </p>
    
    <div className="hero-cta">
      <button className="btn-primary">Get Started</button>
      <button className="btn-secondary">Learn More</button>
    </div>
    
    <div className="hero-metrics">
      {/* 4 stat boxes in a row */}
    </div>
  </div>
</section>
```

**CSS**:
```css
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  text-align: center;
  z-index: 10;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff, var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

### Features Grid Pattern
**Grid**: 3 columns desktop, 1-2 mobile
**Card Style**: Glass cards with icons

```jsx
<section className="features-section">
  <div className="section-header">
    <h2>Features</h2>
    <p>Section subtitle</p>
  </div>
  
  <div className="features-grid">
    {features.map(feature => (
      <div className="feature-card glass-card">
        <div className="feature-icon">
          <Icon />
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </div>
</section>
```

---

### Pricing Section Pattern
**Layout**: 3 pricing tiers side by side
**Highlight**: Middle tier elevated/highlighted

```jsx
<div className="pricing-grid">
  <div className="pricing-card">
    <div className="pricing-header">
      <h3>Basic</h3>
      <div className="pricing-price">
        <span className="currency">$</span>
        <span className="amount">99</span>
        <span className="period">/month</span>
      </div>
    </div>
    
    <ul className="pricing-features">
      <li><CheckIcon /> Feature 1</li>
      <li><CheckIcon /> Feature 2</li>
    </ul>
    
    <button className="pricing-cta">Get Started</button>
  </div>
</div>
```

**CSS for highlighted tier**:
```css
.pricing-card.highlighted {
  transform: scale(1.05);
  border-color: var(--primary);
  box-shadow: 0 0 60px rgba(255, 92, 57, 0.3);
  z-index: 10;
}
```

---

### Stats/Metrics Dashboard Pattern
**Used in**: Performance page, About page

```jsx
<div className="stats-dashboard">
  <div className="stat-row">
    <div className="stat-large">
      <div className="stat-number">1,247</div>
      <div className="stat-label">Active Users</div>
      <div className="stat-change positive">+12.5%</div>
    </div>
  </div>
  
  <div className="stats-grid">
    {/* Multiple smaller stats */}
  </div>
</div>
```

**CSS**:
```css
.stat-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.stat-change.positive {
  color: var(--success);
}

.stat-change.positive::before {
  content: '↑ ';
}
```

---

### Footer Pattern
**Sections**: Company info, Navigation links, Contact, Social, Legal

```jsx
<footer className="footer">
  <div className="footer-main">
    <div className="footer-grid">
      {/* 4 columns */}
      <div className="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      {/* ... more columns */}
    </div>
  </div>
  
  <div className="footer-bottom">
    <p>&copy; 2025 Company Name. All rights reserved.</p>
    <div className="footer-badges">
      <div className="badge">
        <ShieldIcon />
        <span>Secure</span>
      </div>
    </div>
  </div>
</footer>
```

**CSS**:
```css
.footer {
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(10, 10, 10, 1) 50%);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
}

.footer a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.footer a:hover {
  color: var(--primary);
}
```

---

## 8. RESPONSIVE DESIGN PATTERNS

### Mobile Navigation
**Breakpoint**: 768px

**Changes**:
- Desktop nav links → Hamburger menu
- Full-screen overlay menu
- Larger touch targets (min 44px)

```css
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(40px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .mobile-menu.open {
    transform: translateX(0);
  }
}
```

---

### Responsive Typography
Use `clamp()` for fluid typography:

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

p {
  font-size: clamp(0.875rem, 2vw, 1rem);
}
```

---

### Grid Breakdowns
```css
/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Tablet: 2 columns */
@media (min-width: 640px) and (max-width: 1023px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 639px) {
  .grid-responsive {
    grid-template-columns: 1fr;
  }
}
```

---

### Mobile Spacing Adjustments
```css
.section {
  padding: 120px 20px 80px;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 16px 60px;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .grid {
    gap: 1rem;
  }
}
```

---

## 9. BACKGROUND EFFECTS

### Living Orb Background
**Component**: `/components/LivingOrbBackground.tsx`
**Used in**: Hero sections, feature sections

**Concept**: Animated gradient orbs that move around

**Simple CSS Alternative**:
```css
.orb-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.orb {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 92, 57, 0.3) 0%,
    rgba(255, 92, 57, 0) 70%
  );
  filter: blur(60px);
  animation: float 20s infinite ease-in-out;
}

.orb:nth-child(1) {
  top: -200px;
  left: -200px;
}

.orb:nth-child(2) {
  bottom: -200px;
  right: -200px;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(50px, -50px);
  }
  66% {
    transform: translate(-30px, 30px);
  }
}
```

---

### Gradient Mesh Background
```css
.gradient-mesh {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(at 27% 37%, rgba(255, 92, 57, 0.1) 0, transparent 50%),
    radial-gradient(at 97% 21%, rgba(255, 61, 26, 0.1) 0, transparent 50%),
    radial-gradient(at 52% 99%, rgba(255, 92, 57, 0.05) 0, transparent 50%);
}
```

---

## 10. TECHNICAL ARCHITECTURE

### File Structure Philosophy
```
/
├── App.tsx                 # Main router/entry point
├── pages/                  # All page components
│   ├── HomePage.tsx
│   ├── FeaturesPage.tsx
│   ├── PricingPage.tsx
│   └── ...
├── components/             # Reusable components
│   ├── Layout.tsx          # Wrapper layout
│   ├── TradingDashboard.tsx # Industry-specific component
│   └── ui/                 # Shadcn UI components
└── styles/
    └── globals.css         # All global styles
```

### State Management Pattern
Uses React hooks - no external state library

```jsx
// Navigation state
const [activeSection, setActiveSection] = useState('home');
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Scroll tracking
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

### Routing Pattern
**Component**: Single Page Application with hash routing

```jsx
const handleNavigate = (section) => {
  setActiveSection(section);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Render
{activeSection === 'home' && <HomePage />}
{activeSection === 'features' && <FeaturesPage />}
{activeSection === 'pricing' && <PricingPage />}
```

For multi-page app, use React Router:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/features" element={<FeaturesPage />} />
  </Routes>
</BrowserRouter>
```

---

## 11. ADAPTATIONS FOR FOOD COMPANY

### Brand Color Changes
Replace all instances of:
- `#FF5C39` → Your food brand color (e.g., `#E74C3C` for red, `#27AE60` for green)
- `#FF3D1A` → Darker shade of your brand color

### Content Replacements

**Trading Terms** → **Food Industry Terms**:
- "Trading Engine" → "Product Line" / "Menu Category"
- "Annual Return" → "Customer Satisfaction" / "Quality Score"
- "Profit Factor" → "Rating" / "Review Score"
- "Sharpe Ratio" → "Freshness Score"
- "Performance Metrics" → "Product Stats" / "Nutrition Info"

**Icons** (lucide-react):
- `Brain` → `UtensilsCrossed` (chef/food)
- `TrendingUp` → `Leaf` (organic/fresh)
- `Zap` → `Flame` (spicy/hot)
- `Target` → `MapPin` (location)
- `Bot` → `ChefHat`

### Page Adaptations

**Homepage Hero**:
```jsx
<h1>Delicious Meals, Delivered Fresh</h1>
<p>Premium food delivery with quality you can taste</p>

<div className="hero-metrics">
  <div className="stat">
    <div className="stat-value">5,000+</div>
    <div className="stat-label">Happy Customers</div>
  </div>
  <div className="stat">
    <div className="stat-value">4.9★</div>
    <div className="stat-label">Average Rating</div>
  </div>
  <div className="stat">
    <div className="stat-value">30min</div>
    <div className="stat-label">Avg. Delivery</div>
  </div>
  <div className="stat">
    <div className="stat-value">100%</div>
    <div className="stat-label">Fresh Ingredients</div>
  </div>
</div>
```

**Features Section** → "Why Choose Us":
- Feature 1: Fresh Ingredients (Leaf icon)
- Feature 2: Fast Delivery (Zap icon)
- Feature 3: Expert Chefs (ChefHat icon)
- Feature 4: Quality Assured (Shield icon)

**Performance Page** → "Menu & Nutrition":
- Display menu items with nutrition facts
- Customer reviews and ratings
- Popular dishes statistics

**Pricing Page** → "Menu Pricing":
- Appetizers / Mains / Desserts
- Meal plans / Catering packages
- Subscription options

---

## 12. COMPONENT LIBRARY (Reusable)

### Glass Card Component
```jsx
const GlassCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <div 
    className="glass-card"
    style={{ '--delay': `${delay}s` }}
  >
    <div className="card-icon">
      <Icon size={32} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
```

### Stat Display Component
```jsx
const StatDisplay = ({ value, label, trend, trendValue }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    {trend && (
      <div className={`stat-trend ${trend}`}>
        {trend === 'up' ? '↑' : '↓'} {trendValue}
      </div>
    )}
  </div>
);
```

### Badge Component
```jsx
const Badge = ({ icon: Icon, text, variant = 'default' }) => (
  <div className={`badge badge-${variant}`}>
    {Icon && <Icon size={16} />}
    <span>{text}</span>
  </div>
);
```

### Section Header Component
```jsx
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`section-header ${centered ? 'center' : ''}`}>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>
);
```

---

## 13. PERFORMANCE OPTIMIZATIONS

### Image Optimization
- Use WebP format with fallbacks
- Lazy loading: `<img loading="lazy" />`
- Proper sizing: `srcset` for responsive images

### Code Splitting
```jsx
// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HomePage />
</Suspense>
```

### CSS Optimization
- Use CSS variables for theming (already implemented)
- Minimize animations on low-end devices:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 14. ACCESSIBILITY STANDARDS

### Keyboard Navigation
- All interactive elements have `:focus` states
- Tab order is logical
- Skip to main content link

```css
a:focus, button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Color Contrast
- Ensure minimum 4.5:1 ratio for text
- Test with browser DevTools

### ARIA Labels
```jsx
<button aria-label="Open navigation menu">
  <MenuIcon />
</button>

<nav aria-label="Main navigation">
  {/* nav links */}
</nav>
```

---

## 15. QUICK START CHECKLIST FOR DESIGNER

### Phase 1: Setup
- [ ] Choose brand color (replace #FF5C39)
- [ ] Install Inter font
- [ ] Set up dark theme base (#000 background)
- [ ] Create globals.css with color variables

### Phase 2: Core Components
- [ ] Build navigation bar (fixed, glass effect)
- [ ] Create glass card component
- [ ] Create button system (primary + secondary)
- [ ] Set up grid system (3-column, 4-column)

### Phase 3: Pages
- [ ] Hero section with metrics
- [ ] Features grid (3 columns)
- [ ] Pricing tiers (3 cards)
- [ ] Footer with columns

### Phase 4: Interactions
- [ ] Add hover effects to cards
- [ ] Implement scroll animations
- [ ] Add mobile menu
- [ ] Test responsive breakpoints

### Phase 5: Polish
- [ ] Add background orbs/gradients
- [ ] Fine-tune animations
- [ ] Test accessibility
- [ ] Optimize performance

---

## 16. RECOMMENDED TOOLS & LIBRARIES

### Essential
- **React** (v18+): Component framework
- **Tailwind CSS** or **CSS Variables**: Styling (this site uses CSS variables)
- **Lucide React**: Icon library
- **Inter Font**: Typography

### Optional
- **Framer Motion**: Advanced animations
- **React Router**: Multi-page routing
- **React Hook Form**: Form handling
- **Recharts**: Charts/graphs (for stats pages)

---

## 17. MAINTENANCE & SCALABILITY

### Adding New Pages
1. Create file in `/pages/NewPage.tsx`
2. Follow page structure pattern
3. Add to navigation array
4. Update router

### Adding New Sections
1. Create section component or inline in page
2. Use `.page-section` wrapper
3. Add scroll animation classes
4. Ensure responsive grid

### Updating Brand Colors
1. Change CSS variables in `globals.css`
2. Update gradient definitions
3. Test contrast ratios
4. Update glow/shadow effects

---

## 18. SUPPORT RESOURCES

### Design Inspiration
- **Cuban's Edge**: Scroll effects and interactions
- **Apple.com**: Glass effects and polish
- **Stripe.com**: Clean layouts and animations

### Code References
- **Shadcn UI**: Pre-built React components (included in `/components/ui/`)
- **Tailwind CSS Docs**: Utility-first CSS patterns
- **MDN Web Docs**: CSS properties and browser APIs

### Testing
- **Chrome DevTools**: Responsive design mode
- **Lighthouse**: Performance and accessibility audits
- **WAVE**: Accessibility checker

---

## SUMMARY

This website uses a **premium dark theme** with **glassmorphism design**, **smooth animations**, and **data-driven content**. The core patterns include:

1. **Glass cards** with hover effects
2. **Grid-based layouts** (3-4 columns)
3. **Scroll-triggered animations**
4. **Fixed navigation** with blur
5. **Metric/stat displays** prominently featured
6. **Gradient backgrounds** with animated orbs

To adapt for a food company:
- Replace orange-red brand colors with food brand colors
- Swap trading terminology with food industry terms
- Update icons to food-related (utensils, chef hats, etc.)
- Modify metrics to show customer satisfaction, ratings, delivery stats
- Keep the same design patterns, animations, and structure

**Key Files to Study**:
- `/styles/globals.css` - Complete design system
- `/App.tsx` - Navigation and layout structure
- `/pages/HomePage.tsx` - Hero section pattern
- `/pages/FeaturesPage.tsx` - Features grid pattern
- `/pages/PricingPage.tsx` - Pricing cards pattern

This specification provides everything needed to clone this website's design for any industry while maintaining its premium, modern aesthetic.
