# Aurelius-1 Promotional Components

## 🎉 What's Been Created

Based on your promotional graphic, I've created a comprehensive set of promotional components for the Aurelius-1 trading engine.

## 📦 Files Created

### Components
1. **`/components/AureliusPromoBanner.tsx`** - Full-width promotional banner
2. **`/components/AureliusSocialCard.tsx`** - Social media ready cards

### Pages
3. **`/PromoPage.tsx`** - Standalone promotional landing page
4. **`/ShowcasePage.tsx`** - Interactive showcase with controls

### Documentation
5. **`/PROMO_BANNER_USAGE.md`** - Complete usage guide
6. **`/INTEGRATION_EXAMPLE.tsx`** - 10 integration examples
7. **`/PROMOTIONAL_COMPONENTS_README.md`** - This file

### Styles
8. **Updated `/styles/globals.css`** - Added animations and utilities

## 🚀 Quick Start

### Option 1: View the Showcase (Recommended First Step)
```tsx
// Change your default export in App.tsx temporarily:
import ShowcasePage from './ShowcasePage';
export default ShowcasePage;
```

Then view your app to see all components with interactive controls!

### Option 2: View the Demo Page
```tsx
import PromoPage from './PromoPage';
export default PromoPage;
```

### Option 3: Integrate into Existing App
```tsx
import { AureliusPromoBanner } from './components/AureliusPromoBanner';

// Add anywhere in your existing App.tsx
<AureliusPromoBanner variant="full" showLogo={true} />
```

## 🎨 What Each Component Does

### AureliusPromoBanner
- **Purpose**: Full-width promotional section
- **Best For**: Landing pages, hero sections, announcements
- **Features**: 
  - Animated gradient orbs
  - Responsive two-column layout
  - TerraLabs branding
  - Motion animations

**Props:**
- `variant`: 'full' | 'compact' (default: 'full')
- `showLogo`: boolean (default: true)

### AureliusSocialCard
- **Purpose**: Square/wide cards for social media
- **Best For**: Instagram, Facebook, Twitter, LinkedIn posts
- **Features**:
  - Matches original design proportions
  - Exportable as images
  - Multiple aspect ratios
  - Scalable sizes

**Props:**
- `aspectRatio`: '1:1' | '16:9' (default: '1:1')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')

## 📱 Export for Social Media

1. Open `/ShowcasePage.tsx` in your browser
2. Select desired aspect ratio (1:1 for Instagram, 16:9 for Twitter)
3. Right-click on the card → "Save as image" or screenshot
4. Upload to your social media platform

**Recommended Sizes:**
- Instagram/Facebook: 1080x1080px (1:1)
- Twitter: 1200x675px (16:9)
- LinkedIn: 1200x627px (close to 16:9)

## 🎯 Design Features

### Colors Used
- Primary: `#FF5C39`
- Secondary: `#FF3D1A`
- Accent: `#FF8C39`, `#FFB039`
- Backgrounds: `#1a1625`, `#0a0612`

### Typography
- Font: Inter (your existing font)
- Weights: 300, 400, 600, 700
- Gradient text effects on key headings

### Animations
- `pulse-slow` - Gradient orb pulsing
- `motion/react` - Scroll-triggered animations
- Smooth transitions on all interactions

### Layout
- Fully responsive (mobile → desktop)
- Grid-based structure
- Glassmorphism effects
- Backdrop blur

## 💡 Integration Examples

See `/INTEGRATION_EXAMPLE.tsx` for 10 detailed examples including:
1. Add to home page
2. Dedicated promotional page
3. Modal/popup announcement
4. Marketing assets section
5. Navigation dropdown
6. Hero section replacement
7. Announcement banner
8. Side panel
9. Custom wrapper
10. Email template

## 🔧 Customization

### Change Text Content
Edit the component files directly:
- `/components/AureliusPromoBanner.tsx` (lines with text content)
- `/components/AureliusSocialCard.tsx` (lines with text content)

### Change Colors
The components use Tailwind classes:
- `from-[#FF5C39]` → Change to your color
- `to-[#FF3D1A]` → Change to your color
- `bg-[#1a1625]` → Change background

### Change Animations
Edit `/styles/globals.css`:
- Look for `@keyframes pulse-slow`
- Adjust duration, scale, opacity as needed

### Change Layout
Both components use Tailwind grid:
- `grid-cols-5` in AureliusSocialCard
- Responsive breakpoints: `md:`, `lg:`

## 📖 Documentation

For complete documentation, see:
- **Usage Guide**: `/PROMO_BANNER_USAGE.md`
- **Code Examples**: `/INTEGRATION_EXAMPLE.tsx`

## ✅ What's Working

- ✅ Components created and styled
- ✅ Animations implemented
- ✅ Responsive design
- ✅ Social media ready
- ✅ Interactive showcase
- ✅ Full documentation
- ✅ Multiple integration options

## 🎬 Next Steps

1. **View the showcase**: Import `ShowcasePage` to see everything
2. **Choose integration**: Pick from 10 examples in `INTEGRATION_EXAMPLE.tsx`
3. **Customize**: Adjust colors, text, or layout as needed
4. **Export assets**: Use showcase to create social media graphics
5. **Deploy**: Add to your live site

## 🆘 Troubleshooting

### Animations not working?
- Check that `/styles/globals.css` was updated
- Ensure `motion/react` is imported

### Layout issues?
- Verify Tailwind is processing all classes
- Check parent container width

### Colors look different?
- Confirm hex values match your brand
- Check gradient direction

## 📞 Support

All components follow your existing design system:
- Dark theme
- Inter font
- Orange-red color scheme (#FF5C39, #FF3D1A)
- Animated orb components
- Enterprise-level polish

---

**Ready to use!** Import `ShowcasePage` to see everything in action, or jump straight to integration with the examples provided.
