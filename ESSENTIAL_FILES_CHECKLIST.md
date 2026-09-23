# TERRALABS - Essential Files Checklist for Developers

**Quick Reference Guide** - Give these files to understand the complete website

---

## 🎯 GIVE THESE FILES FIRST (Must Read)

### 1. Main Application & Configuration
```
✅ /src/app/App.tsx
✅ /package.json
✅ /DEVELOPER_HANDOVER.md (this documentation)
```

### 2. Navigation & Routing
```
✅ /src/app/components/NavigationBar.tsx
```

### 3. Styling System
```
✅ /src/styles/index.css
✅ /src/styles/globals.css
✅ /src/styles/theme.css
✅ /src/styles/fonts.css
```

---

## 📄 CONTENT PAGES (Read These to Understand Content)

### Main Content Components
```
✅ /src/site/components/BoardOfDirectors.tsx     # Board members (Jyothish CEO, Akbar CTO, Renjith Strategic Backer) — data in src/lib/site.ts
✅ /src/app/components/PricingSectionClean.tsx   # 12% APR capital-based pricing
✅ /src/app/components/RoadMap.tsx               # Company roadmap
✅ /src/app/components/TradingDashboard.tsx      # Trading interface
✅ /src/app/components/MarketTicker.tsx          # Live market data
```

### Legal Pages (All in `/src/app/pages/legal/`)
```
✅ TermsOfService.tsx
✅ PrivacyPolicy.tsx
✅ RiskDisclosure.tsx
✅ CompliancePolicy.tsx
✅ CookiePolicy.tsx
✅ RefundPolicy.tsx
```

### Onboarding & Forms
```
✅ /src/app/pages/onboarding/OnboardingForm.tsx         # Client registration
✅ /src/app/pages/onboarding/CustomerAgreementNew.tsx   # PDF agreement generation
✅ /src/app/pages/EnterprisePage.tsx                    # Enterprise inquiry form
```

---

## 🔌 BACKEND FILES (For API Integration)

```
✅ /supabase/functions/server/index.tsx          # Main server routes (Hono)
✅ /supabase/functions/server/kv_store.tsx       # Database utilities (PROTECTED - DO NOT EDIT)
✅ /utils/supabase/info.tsx                      # Supabase configuration
```

---

## 📁 COMPLETE FILE TREE (For Reference)

```
TERRALABS Project Root
│
├── DEVELOPER_HANDOVER.md              ⭐ START HERE - Complete documentation
├── ESSENTIAL_FILES_CHECKLIST.md       ⭐ THIS FILE - Quick reference
├── package.json                        ⭐ All dependencies
│
├── src/
│   ├── app/
│   │   ├── App.tsx                    ⭐ MAIN ENTRY POINT - All sections defined here
│   │   │
│   │   ├── components/
│   │   │   ├── NavigationBar.tsx      ⭐ Main navigation (11 sections)
│   │   │   ├── BoardOfDirectors.tsx   ⭐ Board members showcase
│   │   │   ├── PricingSectionClean.tsx ⭐ Pricing (12% APR)
│   │   │   ├── RoadMap.tsx            # Company roadmap
│   │   │   ├── TradingDashboard.tsx   # Trading interface
│   │   │   ├── MarketTicker.tsx       # Live market ticker
│   │   │   ├── LivingOrbBackground.tsx # Animated orb background
│   │   │   ├── Layout.tsx             # Page layout wrapper
│   │   │   ├── Router.tsx             # Routing logic
│   │   │   ├── SinglePageApp.tsx      # SPA logic
│   │   │   └── ui/                    # UI component library
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       └── ... (30+ components)
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx           # Landing page
│   │   │   ├── OnboardingPage.tsx     # Onboarding entry
│   │   │   ├── EnterprisePage.tsx     ⭐ Enterprise inquiry form
│   │   │   ├── ClientLoginPage.tsx    # Client login
│   │   │   ├── PricingPage.tsx        # Pricing details
│   │   │   ├── PerformancePage.tsx    # Performance metrics
│   │   │   ├── ResearchPage.tsx       # Research page
│   │   │   ├── PartnersPage.tsx       # Partners page
│   │   │   ├── ContactPage.tsx        # Contact form
│   │   │   ├── SecurityPage.tsx       # Security info
│   │   │   ├── FeaturesPage.tsx       # Features page
│   │   │   │
│   │   │   ├── onboarding/
│   │   │   │   ├── OnboardingForm.tsx        ⭐ Client registration form
│   │   │   │   └── CustomerAgreementNew.tsx  ⭐ PDF agreement generation
│   │   │   │
│   │   │   └── legal/                 ⭐ All legal documents
│   │   │       ├── TermsOfService.tsx
│   │   │       ├── PrivacyPolicy.tsx
│   │   │       ├── RiskDisclosure.tsx
│   │   │       ├── CompliancePolicy.tsx
│   │   │       ├── CookiePolicy.tsx
│   │   │       └── RefundPolicy.tsx
│   │   │
│   │   └── contexts/
│   │       └── LanguageContext.tsx    # Language context (English-only)
│   │
│   ├── styles/
│   │   ├── index.css                  ⭐ Main style entry
│   │   ├── globals.css                ⭐ Global styles & CSS variables
│   │   ├── theme.css                  ⭐ Theme configuration
│   │   ├── fonts.css                  ⭐ Font imports (Space Grotesk)
│   │   └── default_theme.css          # Default theme tokens
│   │
│   └── utils/
│       └── supabase/
│           └── info.tsx               ⭐ Supabase config (projectId, publicAnonKey)
│
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx              ⭐ Main server routes (Hono web framework)
│           └── kv_store.tsx           ⭐ Database utilities (PROTECTED FILE)
│
└── public/                            # Static assets (images, icons, etc.)
```

---

## 🎨 DESIGN SYSTEM QUICK REFERENCE

### Colors
```css
Orange-Red Primary:  #FF5C39, #FF3D1A
Lime-Green Accent:   #9CFF2E (for selected states & CTAs)
Dark Background:     #0A0A0A
```

### Font
```
Family: Space Grotesk
Weights: 300, 400, 500, 600, 700
```

### Key Design Elements
- Animated transparent orbs with blur
- Glassmorphism (backdrop-blur effects)
- Orange corner accents on cards
- Gradient text (orange to red)
- Orange glows on interactive elements

---

## 📊 SITE SECTIONS (Navigation Order)

1. **Home** - Hero landing, CTAs
2. **Engines** - Aurelius-1™, Titanus-X™ (SNAIT technology)
3. **Features** - Platform capabilities
4. **Performance** - Trading metrics
5. **Research** - Research insights
6. **Pricing** - 12% APR capital-based pricing
7. **Partners** - Strategic partners
8. **Board** - Board of Directors (2 members)
9. **Contact** - Contact form + WhatsApp
10. **RoadMap** - Future plans
11. **Legal** - Legal documents

---

## 🔑 KEY BUSINESS INFORMATION

### Company Details
- **Name:** TERRALABS INDUSTRIES
- **License:** DIEZA License No. 75343
- **Market:** XAU/USD (Gold) Trading
- **Technology:** SNAIT (Synthetic Neural Adaptive Intelligence Technology)

### Trading Engines
1. **Aurelius-1™** - Production trading engine
2. **Titanus-X™** - Research & frontier development

### Pricing Model
- **12% APR** on customer capital
- Capital-based subscription tiers
- ❌ NO "3-month minimum commitment" (removed)

### Board of Directors

**Jyothish Vanaja Rajendran**
- Title: Chief Executive Officer (CEO)
- Email: jyothishvr@outlook.com
- Phone: +971 5 4343 4848
- Role: Strategic direction & vision

**Akbar Haleel**
- Title: Chief Technology Officer (CTO)
- Role: Engineering, system architecture & technology stack

**Renjith Raj**
- Title: Strategic Backer & Co-Founder
- Email: renjithrajrv@outlook.com
- Phone: +971 5 474747 81
- Role: Capital strategy & institutional networks

---

## 🚀 QUICK START FOR NEW DEVELOPERS

### Step 1: Read Documentation
```bash
1. Read DEVELOPER_HANDOVER.md (comprehensive guide)
2. Read this file (ESSENTIAL_FILES_CHECKLIST.md)
```

### Step 2: Understand Structure
```bash
1. Open /src/app/App.tsx (main application)
2. Open /src/app/components/NavigationBar.tsx (navigation)
3. Review /src/styles/globals.css (design system)
```

### Step 3: Explore Content
```bash
1. Check /src/app/components/BoardOfDirectors.tsx (board members)
2. Check /src/app/components/PricingSectionClean.tsx (pricing)
3. Check /src/app/pages/legal/ folder (all legal docs)
```

### Step 4: Backend Understanding
```bash
1. Read /supabase/functions/server/index.tsx (server routes)
2. Read /utils/supabase/info.tsx (config)
3. DO NOT edit /supabase/functions/server/kv_store.tsx (protected)
```

---

## ⚠️ CRITICAL REMINDERS

### DO ✅
- Use `pnpm` for package management
- Import Motion from `motion/react`
- Use Supabase for all backend operations
- Follow orange-red color scheme
- Create `.tsx` files only

### DON'T ❌
- Don't create `tailwind.config.js` (Tailwind v4 uses CSS config)
- Don't run `vite build` (will fail)
- Don't create `index.html`
- Don't modify `kv_store.tsx` (protected)
- Don't add "3-month commitment" references
- Don't leak `SUPABASE_SERVICE_ROLE_KEY` to frontend

---

## 📦 DEPENDENCIES (from package.json)

### Core
- React 18+
- TypeScript
- Vite (build tool)
- Tailwind CSS v4.0

### Key Libraries
- `react-hook-form` (v7.55.0) - Forms
- `motion` - Animations (import from `motion/react`)
- `sonner` - Toasts
- `recharts` - Charts
- `lucide-react` - Icons
- `@supabase/supabase-js` - Supabase client

---

## 🌐 ENVIRONMENT

**Current Version:** 1085 (English-only, LTR)  
**Language:** English only  
**Direction:** Left-to-Right (LTR) enforced  
**No Localhost:** Use Figma Make preview surface

---

## 📞 SUPPORT CONTACTS

**CEO:** Jyothish Vanaja Rajendran  
📧 jyothishvr@outlook.com  
📱 +971 5 4343 4848

**CTO:** Akbar Haleel

**Strategic Backer:** Renjith Raj  
📧 renjithrajrv@outlook.com  
📱 +971 5 474747 81

---

**Last Updated:** May 14, 2026  
**Version:** 1.0  
**Status:** Production-Ready ✅
