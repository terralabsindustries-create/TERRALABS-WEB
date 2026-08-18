# TERRALABS INDUSTRIES - Developer Documentation

<div align="center">

![TERRALABS](https://img.shields.io/badge/TERRALABS-INDUSTRIES-FF5C39?style=for-the-badge)
![License](https://img.shields.io/badge/License-DIEZA%2075343-9CFF2E?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-00C853?style=for-the-badge)

**AI-Driven XAU/USD Trading Platform**  
Powered by Synthetic Neural Adaptive Intelligence Technology (SNAIT)

</div>

---

## 📚 Documentation Overview

This repository contains **three comprehensive documentation files** to help you understand the complete TERRALABS website:

### 1. 📖 [DEVELOPER_HANDOVER.md](./DEVELOPER_HANDOVER.md) ⭐ START HERE
**Complete Developer Handover Documentation**
- Full project overview
- Technology stack details
- Architecture explanation
- Navigation & routing
- Design system
- Backend integration
- Business logic
- Recent changes

👉 **Read this FIRST for comprehensive understanding**

---

### 2. ✅ [ESSENTIAL_FILES_CHECKLIST.md](./ESSENTIAL_FILES_CHECKLIST.md)
**Quick Reference & File Checklist**
- Must-read files list
- Complete file tree
- Quick start guide
- Critical reminders
- Support contacts

👉 **Use this as a quick reference checklist**

---

### 3. 📄 [README_FOR_DEVELOPERS.md](./README_FOR_DEVELOPERS.md)
**This File - Quick Overview**

👉 **Overview and navigation to other docs**

---

## 🚀 Quick Start

### For New Developers

**Step 1:** Read the complete documentation
```bash
1. Open DEVELOPER_HANDOVER.md
2. Read Table of Contents
3. Focus on sections relevant to your work
```

**Step 2:** Review the checklist
```bash
1. Open ESSENTIAL_FILES_CHECKLIST.md
2. Check the "GIVE THESE FILES FIRST" section
3. Open each file listed and review
```

**Step 3:** Explore the codebase
```bash
1. Start with /src/app/App.tsx (main application)
2. Review /src/app/components/NavigationBar.tsx (navigation)
3. Check /src/app/components/BoardOfDirectors.tsx (complex component example)
4. Review /src/styles/globals.css (design system)
```

---

## 📁 Key Files to Share with Developers

### Must-Have Documentation
```
✅ DEVELOPER_HANDOVER.md
✅ ESSENTIAL_FILES_CHECKLIST.md
✅ README_FOR_DEVELOPERS.md (this file)
```

### Core Application Files
```
✅ /src/app/App.tsx
✅ /src/app/components/NavigationBar.tsx
✅ /package.json
```

### Styling & Design
```
✅ /src/styles/index.css
✅ /src/styles/globals.css
✅ /src/styles/theme.css
✅ /src/styles/fonts.css
```

### Content Components
```
✅ /src/app/components/BoardOfDirectors.tsx
✅ /src/app/components/PricingSectionClean.tsx
✅ /src/app/pages/legal/ (entire folder)
✅ /src/app/pages/onboarding/ (entire folder)
```

### Backend
```
✅ /supabase/functions/server/index.tsx
✅ /supabase/functions/server/kv_store.tsx
✅ /utils/supabase/info.tsx
```

---

## 🎯 Project Overview

### What is TERRALABS?

TERRALABS INDUSTRIES is a comprehensive **XAU/USD (gold) trading platform** featuring:

- **AI Trading Engines:** Aurelius-1™ (production), Titanus-X™ (research)
- **Core Technology:** SNAIT (Synthetic Neural Adaptive Intelligence Technology)
- **Design:** Dark theme with animated orbs, orange-red color scheme
- **Business Model:** 12% APR capital-based subscription
- **Enterprise Features:** Legal docs, agreement automation, WhatsApp integration

### Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Tailwind CSS v4.0
- Vite build tool
- Motion animations
- Lucide icons

**Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- Edge Functions (Hono web server)
- Key-Value store for data persistence

**Deployment:**
- Figma Make platform
- NO traditional hosting (special environment)

---

## 🧭 Website Structure

### Single Page Application (SPA)
The website is a **single-page application** with 11 main sections:

1. **Home** - Hero landing
2. **Engines** - Aurelius-1™, Titanus-X™
3. **Features** - Platform capabilities
4. **Performance** - Trading metrics
5. **Research** - Research insights
6. **Pricing** - 12% APR model
7. **Partners** - Strategic partners
8. **Board** - Board of Directors
9. **Contact** - Contact form
10. **RoadMap** - Future plans
11. **Legal** - Legal documents

### Navigation
- **Type:** Fixed header with smooth scroll
- **Mobile:** Hamburger menu
- **Indicator:** Animated lime-green blob (`#9CFF2E`)

---

## 🎨 Design System

### Brand Colors
```
Primary Orange:  #FF5C39
Primary Red:     #FF3D1A
Accent Green:    #9CFF2E (for CTAs & selected states)
Dark Background: #0A0A0A
```

### Typography
```
Font: Space Grotesk (300, 400, 500, 600, 700)
```

### Key Design Elements
- Animated transparent orbs with blur effects
- Glassmorphism (backdrop-blur throughout)
- Orange corner accents on premium cards
- Gradient text (orange to red on headings)
- Orange glows on interactive elements

---

## 👥 Board of Directors

### Current Members (2)

**Jyothish Vanaja Rajendran**  
*Chief Executive Officer & Chief Technology Officer*  
📧 jyothishvr@outlook.com | 📱 +971 5 4343 4848  
Oversees complete technology stack, AI trading engines, and strategic direction

**Renjith Raj**  
*Entrepreneur, Strategic Backer & Co-Founder*  
📧 renjithrajrv@outlook.com | 📱 +971 5 474747 81  
Capital strategy and institutional network architect

---

## 💰 Business Model

### Pricing
- **12% APR** on customer capital
- Capital-based subscription tiers
- NO "3-month minimum commitment" ❌ (removed)

### Onboarding Flow
1. User fills onboarding or enterprise form
2. Data submitted to Supabase backend
3. PDF agreement auto-generated (A4, professional design)
4. Agreement sent to company WhatsApp
5. User receives confirmation

---

## 🔌 Backend Integration

### Supabase Configuration
```
Project ID: [project-id]
Anon Key: [anon-key]
Service Role Key: [service-role-key] (KEEP SECRET!)
```

### Server Routes
**Base URL:** `https://{projectId}.supabase.co/functions/v1/make-server-8c0fc0e7/`

All routes prefixed with `/make-server-8c0fc0e7`

### Database
**Table:** `kv_store_8c0fc0e7` (key-value store)

**Functions Available:**
```typescript
kv.get(key)              // Get single value
kv.set(key, value)       // Set single value
kv.del(key)              // Delete single value
kv.mget(keys)            // Get multiple values
kv.mset(items)           // Set multiple values
kv.mdel(keys)            // Delete multiple values
kv.getByPrefix(prefix)   // Get all with prefix
```

---

## ⚠️ Important Development Notes

### DO ✅
- Use `pnpm` for package management
- Import Motion from `motion/react` (NOT framer-motion)
- Use `.tsx` files only
- Follow orange-red color scheme
- Use Supabase for all backend operations

### DON'T ❌
- Don't create `tailwind.config.js` (Tailwind v4 uses CSS)
- Don't run `vite build` (will fail in this environment)
- Don't create or modify `index.html`
- Don't modify `/supabase/functions/server/kv_store.tsx` (protected)
- Don't leak `SUPABASE_SERVICE_ROLE_KEY` to frontend
- Don't add "3-month commitment" references

### Protected Files 🔒
```
/supabase/functions/server/kv_store.tsx (DO NOT EDIT)
/__figma__entrypoint__.ts (auto-generated)
```

---

## 📦 Package Management

### Installation
```bash
pnpm install
```

### Add Package
```bash
pnpm add <package-name>
```

### Key Dependencies
- `react-hook-form@7.55.0` - Form handling
- `motion` - Animations (import from `motion/react`)
- `sonner` - Toast notifications
- `recharts` - Data visualization
- `lucide-react` - Icons
- `@supabase/supabase-js` - Supabase client

---

## 🌐 Environment

**Current Version:** 1085  
**Language:** English only  
**Text Direction:** LTR (Left-to-Right) enforced  
**No Localhost Access:** Use Figma Make preview surface only

---

## 📞 Support & Contact

### Development Support
**CEO & CTO:** Jyothish Vanaja Rajendran  
📧 jyothishvr@outlook.com  
📱 +971 5 4343 4848

**Strategic Backer:** Renjith Raj  
📧 renjithrajrv@outlook.com  
📱 +971 5 474747 81

### Company Information
**Name:** TERRALABS INDUSTRIES  
**License:** DIEZA License No. 75343  
**Market:** XAU/USD (Gold) Trading  
**Technology:** SNAIT (Synthetic Neural Adaptive Intelligence Technology)

---

## 📊 Recent Changes (Version 1085)

✅ Removed all "3-month minimum commitment" references  
✅ Updated to SNAIT terminology across 6 files  
✅ Fixed RTL direction issues (English-only LTR)  
✅ Eliminated all React.Fragment errors  
✅ Removed Narayanan Mohanan from Board  
✅ Promoted Jyothish to CEO & CTO (dual role)  
✅ Enhanced Board profiles with technical content  
✅ Fixed CSS import ordering issues  

---

## 📖 Further Reading

For detailed information, please refer to:

1. **[DEVELOPER_HANDOVER.md](./DEVELOPER_HANDOVER.md)** - Complete technical documentation
2. **[ESSENTIAL_FILES_CHECKLIST.md](./ESSENTIAL_FILES_CHECKLIST.md)** - File reference & checklist

---

## 🎓 Learning Path for New Developers

### Day 1: Documentation & Overview
- [ ] Read DEVELOPER_HANDOVER.md
- [ ] Review ESSENTIAL_FILES_CHECKLIST.md
- [ ] Understand project structure

### Day 2: Core Application
- [ ] Review /src/app/App.tsx (main entry)
- [ ] Review /src/app/components/NavigationBar.tsx
- [ ] Understand routing and navigation flow

### Day 3: Design System
- [ ] Review /src/styles/globals.css
- [ ] Review /src/styles/theme.css
- [ ] Understand color scheme and design patterns

### Day 4: Content & Components
- [ ] Review /src/app/components/BoardOfDirectors.tsx
- [ ] Review /src/app/components/PricingSectionClean.tsx
- [ ] Review all legal pages

### Day 5: Backend Integration
- [ ] Review /supabase/functions/server/index.tsx
- [ ] Review /utils/supabase/info.tsx
- [ ] Understand API routes and database operations

---

<div align="center">

**TERRALABS INDUSTRIES**  
*Building the Future of AI-Driven Trading*

![TERRALABS](https://img.shields.io/badge/Powered%20by-SNAIT%20Technology-FF5C39?style=for-the-badge)

**License:** DIEZA No. 75343  
**Version:** 1085 (Production-Ready)  
**Last Updated:** May 14, 2026

</div>
