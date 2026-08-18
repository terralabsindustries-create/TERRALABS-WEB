# TERRALABS INDUSTRIES - Developer Handover Documentation

**Company:** TERRALABS INDUSTRIES  
**License:** DIEZA License No. 75343  
**Last Updated:** May 14, 2026  
**Website Type:** AI-Driven XAU/USD Trading Platform

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Navigation & Routes](#navigation--routes)
5. [Key Pages & Components](#key-pages--components)
6. [Design System](#design-system)
7. [Backend Integration](#backend-integration)
8. [Essential Files Reference](#essential-files-reference)
9. [Development Commands](#development-commands)

---

## 🎯 PROJECT OVERVIEW

TERRALABS INDUSTRIES is a comprehensive trading application website for XAU/USD (gold) market trading featuring:

- **Trading Engines:** Aurelius-1™ (production) and Titanus-X™ (research)
- **Core Technology:** Synthetic Neural Adaptive Intelligence Technology (SNAIT)
- **Design Theme:** Dark theme with animated orb components
- **Primary Colors:** 
  - Orange-Red: `#FF5C39` and `#FF3D1A`
  - Accent Green: `#9CFF2E` (for selected states & CTAs)
- **Subscription Model:** Capital-based pricing achieving 12% APR
- **Enterprise Features:** Legal document storage, automatic agreement submission, WhatsApp integration

---

## 🛠 TECHNOLOGY STACK

### Frontend
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS v4.0
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Icons:** Lucide React
- **UI Components:** Custom component library + shadcn/ui components

### Backend
- **Database:** Supabase (PostgreSQL)
- **Edge Functions:** Supabase Edge Functions (Hono web server)
- **Storage:** Supabase Storage (for documents/PDFs)
- **Authentication:** Supabase Auth

### Key Libraries
- `react-hook-form` (v7.55.0) - Form handling
- `motion` - Animations (import from `motion/react`)
- `sonner` - Toast notifications
- `recharts` - Data visualization

---

## 📁 PROJECT STRUCTURE

```
/workspaces/default/code/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main application entry point
│   │   ├── components/
│   │   │   ├── NavigationBar.tsx            # Main navigation component
│   │   │   ├── BoardOfDirectors.tsx         # Board members showcase
│   │   │   ├── PricingSectionClean.tsx      # Pricing display
│   │   │   ├── RoadMap.tsx                  # Company roadmap
│   │   │   ├── TradingDashboard.tsx         # Trading interface
│   │   │   ├── MarketTicker.tsx             # Live market data
│   │   │   ├── LivingOrbBackground.tsx      # Animated background
│   │   │   └── ui/                          # UI component library
│   │   ├── pages/
│   │   │   ├── HomePage.tsx                 # Landing page
│   │   │   ├── OnboardingPage.tsx           # Client onboarding
│   │   │   ├── EnterprisePage.tsx           # Enterprise inquiries
│   │   │   ├── ClientLoginPage.tsx          # Client authentication
│   │   │   ├── PricingPage.tsx              # Pricing details
│   │   │   ├── PerformancePage.tsx          # Performance metrics
│   │   │   ├── ResearchPage.tsx             # Research insights
│   │   │   ├── PartnersPage.tsx             # Partner information
│   │   │   ├── ContactPage.tsx              # Contact form
│   │   │   ├── onboarding/
│   │   │   │   ├── OnboardingForm.tsx       # Registration form
│   │   │   │   └── CustomerAgreementNew.tsx # Agreement PDF generation
│   │   │   └── legal/
│   │   │       ├── TermsOfService.tsx       # Terms of service
│   │   │       ├── PrivacyPolicy.tsx        # Privacy policy
│   │   │       ├── RiskDisclosure.tsx       # Risk disclosure
│   │   │       ├── CompliancePolicy.tsx     # Compliance guidelines
│   │   │       ├── CookiePolicy.tsx         # Cookie policy
│   │   │       └── RefundPolicy.tsx         # Refund policy
│   │   └── contexts/
│   │       └── LanguageContext.tsx          # Language management (English-only)
│   ├── styles/
│   │   ├── index.css                        # Main style entry
│   │   ├── globals.css                      # Global styles & CSS variables
│   │   ├── theme.css                        # Theme configuration
│   │   ├── fonts.css                        # Font imports (Space Grotesk)
│   │   └── default_theme.css                # Default theme tokens
│   └── utils/
│       └── supabase/
│           └── info.tsx                     # Supabase configuration
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx                    # Main server routes (Hono)
│           └── kv_store.tsx                 # Key-value database utilities
├── package.json                             # Dependencies & scripts
└── public/                                  # Static assets
```

---

## 🧭 NAVIGATION & ROUTES

### Main Navigation Sections

The website is a **single-page application** with smooth scroll navigation:

| Section ID | Label | Description | Icon |
|-----------|-------|-------------|------|
| `home` | Home | Hero landing section | Home |
| `engines` | Engines | Trading engine showcase (Aurelius-1™, Titanus-X™) | Cpu |
| `features` | Features | Platform features & capabilities | Star |
| `performance` | Performance | Trading performance metrics | TrendingUp |
| `research` | Research | Research insights & methodologies | FileText |
| `pricing` | Pricing | Subscription pricing (12% APR capital-based) | DollarSign |
| `partners` | Partners | Strategic partners & integrations | Users |
| `board` | Board | Board of Directors profiles | UserCheck |
| `contact` | Contact | Contact form with WhatsApp integration | Mail |
| `roadmap` | RoadMap | Company roadmap & future plans | Map |
| `legal` | Legal | Legal documents & policies | Scale |

### Navigation Implementation
- **File:** `/src/app/components/NavigationBar.tsx`
- **Type:** Fixed header with smooth scroll
- **Mobile:** Hamburger menu with full-screen overlay
- **Active State:** Animated indicator blob with lime-green accent (`#9CFF2E`)

---

## 📄 KEY PAGES & COMPONENTS

### 1. **Home Section** (`#home`)
**Purpose:** Hero landing with animated orbs and value propositions  
**Key Features:**
- Animated orb background
- Main CTA: "Begin Onboarding" → OnboardingForm
- Secondary CTA: "Enterprise Inquiry" → EnterprisePage
- Live market ticker

### 2. **Trading Engines** (`#engines`)
**Components:** Aurelius-1™ and Titanus-X™ showcases  
**Technology:** SNAIT (Synthetic Neural Adaptive Intelligence Technology)

### 3. **Board of Directors** (`#board`)
**File:** `/src/app/components/BoardOfDirectors.tsx`  
**Current Members:**

#### Jyothish Vanaja Rajendran
- **Title:** Chief Executive Officer & Chief Technology Officer
- **Email:** jyothishvr@outlook.com
- **Phone:** +971 5 4343 4848
- **Role:** Oversees complete technology stack, AI trading engines, and strategic direction

#### Renjith Raj
- **Title:** Entrepreneur, Strategic Backer & Co-Founder
- **Email:** renjithrajrv@outlook.com
- **Phone:** +971 5 474747 81
- **Role:** Capital strategy and institutional network architect

### 4. **Pricing Section** (`#pricing`)
**File:** `/src/app/components/PricingSectionClean.tsx`  
**Model:** Capital-based subscription achieving 12% APR on customer capital  
**Note:** All "3-month minimum commitment" references have been removed

### 5. **Legal Pages** (`#legal`)
All legal pages are in `/src/app/pages/legal/`:
- Terms of Service
- Privacy Policy
- Risk Disclosure
- Compliance Policy
- Cookie Policy
- Refund Policy

**Note:** English-only, LTR direction enforced

### 6. **Onboarding Flow**
**Entry Points:**
1. "Begin Onboarding" button → `/src/app/pages/onboarding/OnboardingForm.tsx`
2. "Enterprise Inquiry" button → `/src/app/pages/EnterprisePage.tsx`

**Both flows:**
- Collect user information via forms
- Submit to Supabase backend
- Generate PDF agreement (A4 format, medium margins)
- Send to WhatsApp for company reception

**Agreement Generation:**  
File: `/src/app/pages/onboarding/CustomerAgreementNew.tsx`  
Format: Professional PDF with TERRALABS logo and branding

---

## 🎨 DESIGN SYSTEM

### Color Palette

```css
/* Primary Brand Colors */
--primary-orange: #FF5C39;
--primary-red: #FF3D1A;
--accent-green: #9CFF2E;  /* For selected states & CTAs */

/* Background */
--background-dark: #0A0A0A;
--background-card: rgba(10, 10, 10, 0.4);

/* Text Colors */
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: #717182;

/* Borders & Accents */
--border-orange: rgba(255, 92, 57, 0.3);
--glow-orange: rgba(255, 92, 57, 0.5);
```

### Typography
**Font Family:** Space Grotesk (300, 400, 500, 600, 700)  
**Import Location:** `/src/styles/fonts.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=block');
```

### Key Design Elements
1. **Animated Orbs:** Transparent gradient orbs with blur effects
2. **Corner Accents:** Orange corner brackets on cards
3. **Gradient Text:** Orange-to-red gradients on headings
4. **Backdrop Blur:** Glassmorphism effects throughout
5. **Box Shadows:** Orange glows on interactive elements

### Tailwind Configuration
**Version:** Tailwind CSS v4.0  
**Config File:** `/src/styles/theme.css` (CSS-based configuration, NO `tailwind.config.js`)

---

## 🔌 BACKEND INTEGRATION

### Supabase Configuration
**File:** `/utils/supabase/info.tsx`

```typescript
export const projectId = "[project-id]";
export const publicAnonKey = "[anon-key]";
```

### Server Architecture
**File:** `/supabase/functions/server/index.tsx`  
**Framework:** Hono (Deno-based web framework)  
**Base URL:** `https://${projectId}.supabase.co/functions/v1/make-server-8c0fc0e7/`

**Server Routes:** All routes must be prefixed with `/make-server-8c0fc0e7`

Example:
```
POST /make-server-8c0fc0e7/onboarding
POST /make-server-8c0fc0e7/enterprise-inquiry
GET  /make-server-8c0fc0e7/health
```

### Database: Key-Value Store
**File:** `/supabase/functions/server/kv_store.tsx`  
**Table:** `kv_store_8c0fc0e7`

**Available Functions:**
```typescript
kv.get(key: string)           // Get single value
kv.set(key: string, value)    // Set single value
kv.del(key: string)           // Delete single value
kv.mget(keys: string[])       // Get multiple values
kv.mset(items: object)        // Set multiple values
kv.mdel(keys: string[])       // Delete multiple values
kv.getByPrefix(prefix: string) // Get all keys with prefix
```

### Authentication
**Provider:** Supabase Auth  
**Methods:**
- Email/Password sign up and login
- Social login (Google, Facebook, GitHub) - requires additional setup
- Session management

### Storage (Supabase Storage)
**Buckets:** Prefixed with `make-8c0fc0e7`  
**Purpose:** Store PDF agreements and legal documents  
**Access:** Private buckets with signed URLs

### Environment Variables (Already Configured)
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL
GOOGLE_GEMINI_API_KEY
RESEND_API_KEY
```

---

## 📚 ESSENTIAL FILES REFERENCE

### Critical Files for Understanding the Platform

#### 1. Core Application
```
/src/app/App.tsx                           # Main entry, routing, all sections
/src/app/components/NavigationBar.tsx      # Navigation logic
/package.json                              # All dependencies
```

#### 2. Styling & Theme
```
/src/styles/index.css                      # Main style entry
/src/styles/globals.css                    # Global styles & variables
/src/styles/theme.css                      # Theme tokens
/src/styles/fonts.css                      # Font imports
```

#### 3. Key Components
```
/src/app/components/BoardOfDirectors.tsx   # Board members (2 directors)
/src/app/components/PricingSectionClean.tsx # Pricing (12% APR model)
/src/app/components/RoadMap.tsx            # Company roadmap
/src/app/components/TradingDashboard.tsx   # Trading interface
/src/app/components/MarketTicker.tsx       # Live market data
/src/app/components/LivingOrbBackground.tsx # Animated background
```

#### 4. Forms & Onboarding
```
/src/app/pages/onboarding/OnboardingForm.tsx        # Client registration
/src/app/pages/onboarding/CustomerAgreementNew.tsx  # PDF generation
/src/app/pages/EnterprisePage.tsx                   # Enterprise inquiry
```

#### 5. Legal Pages (All in `/src/app/pages/legal/`)
```
TermsOfService.tsx
PrivacyPolicy.tsx
RiskDisclosure.tsx
CompliancePolicy.tsx
CookiePolicy.tsx
RefundPolicy.tsx
```

#### 6. Backend
```
/supabase/functions/server/index.tsx       # Main server routes
/supabase/functions/server/kv_store.tsx    # Database utilities
/utils/supabase/info.tsx                   # Supabase config
```

---

## 🚀 DEVELOPMENT COMMANDS

### Package Management
```bash
# Install dependencies
pnpm install

# Add new package
pnpm add <package-name>

# Add dev dependency
pnpm add -D <package-name>
```

### Development Server
```bash
# The Vite dev server is already running
# DO NOT run manually: pnpm dev or vite

# Access via preview surface (NOT localhost)
```

### Important Notes
- **NO `vite build`** - Build command will fail in this environment
- **NO `index.html`** - Auto-generated at runtime via `__figma__entrypoint__.ts`
- **NO localhost access** - Use Figma Make preview surface only

### Code Quality
```bash
# Format code (if configured)
pnpm format

# Lint (if configured)
pnpm lint
```

---

## 🔑 KEY BUSINESS LOGIC

### 1. Pricing Model
- **12% APR** on customer capital
- NO "3-month minimum commitment" (removed completely)
- Capital-based subscription tiers

### 2. Onboarding Process
1. User fills form (personal info, capital amount, preferences)
2. Backend validates and stores data
3. PDF agreement generated (A4, medium margins, TERRALABS branding)
4. Agreement sent to WhatsApp for company reception
5. User receives confirmation

### 3. Enterprise Inquiry
- Similar flow to onboarding
- Focused on institutional clients
- Custom terms and high capital thresholds

### 4. Legal Compliance
- All legal documents accessible via `#legal` section
- DIEZA License No. 75343 referenced throughout
- Risk disclosures prominently displayed

---

## 🌐 LANGUAGE & INTERNATIONALIZATION

**Current State:** English-only (Version 1085)  
**Direction:** Left-to-Right (LTR) enforced  
**Context:** `/src/app/contexts/LanguageContext.tsx` exists but unused

**CSS Direction Override:**
```css
html {
  direction: ltr !important;
}

* {
  direction: ltr;
}
```

---

## ⚠️ IMPORTANT NOTES FOR DEVELOPERS

### Do's ✅
1. Use `pnpm` for package management
2. Import Motion from `motion/react` (NOT framer-motion)
3. Use Supabase for all backend operations
4. Follow the orange-red color scheme (`#FF5C39`, `#FF3D1A`)
5. Use lime-green (`#9CFF2E`) for selected states
6. Import fonts only in `/src/styles/fonts.css`
7. Create components in `/src/app/components/`
8. Use `.tsx` files only (NO `.jsx`, `.html`, `.js`)

### Don'ts ❌
1. Don't create `tailwind.config.js` (using Tailwind v4 CSS config)
2. Don't run `vite build` (will fail)
3. Don't create or modify `index.html`
4. Don't use localhost URLs (use preview surface)
5. Don't modify `/supabase/functions/server/kv_store.tsx` (protected)
6. Don't add "3-month minimum commitment" references
7. Don't create migration files or DDL statements
8. Don't leak `SUPABASE_SERVICE_ROLE_KEY` to frontend

### Protected Files 🔒
- `/supabase/functions/server/kv_store.tsx`
- `/__figma__entrypoint__.ts` (auto-generated)

---

## 📞 CONTACT INFORMATION

### Board of Directors

**Jyothish Vanaja Rajendran** (CEO & CTO)  
📧 jyothishvr@outlook.com  
📱 +971 5 4343 4848

**Renjith Raj** (Strategic Backer & Co-Founder)  
📧 renjithrajrv@outlook.com  
📱 +971 5 474747 81

### Company Details
**Name:** TERRALABS INDUSTRIES  
**License:** DIEZA License No. 75343  
**Markets:** XAU/USD (Gold) Trading  
**Technology:** Synthetic Neural Adaptive Intelligence Technology (SNAIT)

---

## 🗺️ SITE MAP

```
TERRALABS Website
│
├── Home (#home)
│   ├── Hero Section
│   ├── Value Propositions
│   └── CTAs (Onboarding, Enterprise)
│
├── Trading Engines (#engines)
│   ├── Aurelius-1™ (Production)
│   └── Titanus-X™ (Research)
│
├── Features (#features)
│   └── Platform Capabilities
│
├── Performance (#performance)
│   └── Trading Metrics & Results
│
├── Research (#research)
│   └── Methodologies & Insights
│
├── Pricing (#pricing)
│   └── 12% APR Capital-Based Model
│
├── Partners (#partners)
│   └── Strategic Partnerships
│
├── Board of Directors (#board)
│   ├── Jyothish Vanaja Rajendran (CEO & CTO)
│   └── Renjith Raj (Strategic Backer)
│
├── Contact (#contact)
│   └── Contact Form + WhatsApp
│
├── RoadMap (#roadmap)
│   └── Future Plans
│
└── Legal (#legal)
    ├── Terms of Service
    ├── Privacy Policy
    ├── Risk Disclosure
    ├── Compliance Policy
    ├── Cookie Policy
    └── Refund Policy

Dedicated Pages:
├── Client Login
├── Onboarding Form
└── Enterprise Inquiry
```

---

## 📝 RECENT CHANGES (Version 1085)

1. ✅ Removed all "3-month minimum commitment" references
2. ✅ Updated to SNAIT terminology across 6 files
3. ✅ Fixed RTL direction issues (English-only LTR)
4. ✅ Eliminated all React.Fragment errors
5. ✅ Removed Narayanan Mohanan from Board of Directors
6. ✅ Promoted Jyothish to CEO & CTO with combined roles
7. ✅ Updated Board with comprehensive technical content
8. ✅ Fixed CSS import ordering issues (`@import` before other rules)

---

## 🎓 LEARNING RESOURCES

### Understanding the Codebase
1. Start with `/src/app/App.tsx` - understand the main flow
2. Review `/src/app/components/NavigationBar.tsx` - navigation logic
3. Check `/src/app/components/BoardOfDirectors.tsx` - complex component example
4. Study `/src/styles/globals.css` - design system implementation
5. Examine `/supabase/functions/server/index.tsx` - backend routes

### Key Concepts
- **Single Page Application:** All sections on one page with smooth scroll
- **Glassmorphism Design:** Backdrop blur and transparent overlays
- **Capital-Based Pricing:** 12% APR subscription model
- **PDF Generation:** Server-side agreement creation
- **WhatsApp Integration:** Form submissions route to WhatsApp

---

**Document Version:** 1.0  
**Last Updated:** May 14, 2026  
**Maintained By:** TERRALABS Development Team
