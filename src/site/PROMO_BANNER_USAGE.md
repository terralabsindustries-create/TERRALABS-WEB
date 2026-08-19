# Aurelius-1 Promotional Banner Usage Guide

## Overview
The `AureliusPromoBanner` component is a high-impact promotional section designed to showcase the Aurelius-1 trading engine with stunning visual effects matching the reference design.

## Component Location
- **Component**: `/components/AureliusPromoBanner.tsx`
- **Demo Page**: `/PromoPage.tsx`
- **Styles**: Added to `/styles/globals.css`

## Features
- ✨ Animated gradient orb backgrounds
- 🎨 Orange/red color scheme (#FF5C39, #FF3D1A)
- 📱 Fully responsive design
- 🎭 Motion animations on scroll
- 🎯 Multiple layout variants
- 🏢 TerraLabs branding integration

## Quick Start

### Option 1: Use as Standalone Page
```tsx
// Navigate to /PromoPage.tsx to see the full promotional page
import PromoPage from './PromoPage';

// Use it as a route in your app
<Route path="/promo" element={<PromoPage />} />
```

### Option 2: Integrate into Existing Page
```tsx
import { AureliusPromoBanner } from './components/AureliusPromoBanner';

function YourPage() {
  return (
    <div>
      {/* Add the banner anywhere in your layout */}
      <AureliusPromoBanner variant="full" showLogo={true} />
      
      {/* Rest of your content */}
    </div>
  );
}
```

### Option 3: Add to Main App.tsx
```tsx
// In your App.tsx, add it as a section
import { AureliusPromoBanner } from './components/AureliusPromoBanner';

// Add it within your page structure
<AureliusPromoBanner variant="full" showLogo={true} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'full' \| 'compact'` | `'full'` | Controls the banner layout variant |
| `showLogo` | `boolean` | `true` | Whether to display the TerraLabs logo |

## Styling Customization

### Colors
The component uses your existing color scheme:
- Primary: `#FF5C39`
- Secondary: `#FF3D1A`
- Accent: `#FF8C39`
- Background: `#1a1625`, `#0a0612`

### Animations
The following animations are used:
- `pulse-slow` - Slow pulsing effect for gradient orbs
- Motion.js animations for scroll reveals

### Responsive Breakpoints
- Mobile: < 768px
- Desktop: ≥ 768px
- Large: ≥ 1024px

## Customization Examples

### Compact Variant
```tsx
<AureliusPromoBanner variant="compact" showLogo={false} />
```

### Custom Styling
```tsx
<div className="my-custom-wrapper">
  <AureliusPromoBanner 
    variant="full" 
    showLogo={true}
  />
</div>
```

### Integration with Router
```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromoPage from './PromoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/promo" element={<PromoPage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}
```

## Design Elements

### Typography Hierarchy
1. **"Introducing"** - Small intro text
2. **"AURELIUS-1"** - Large gradient headline (text-5xl to text-7xl)
3. **"For FOREX XAU/USD only"** - Subtitle
4. **Main Tagline** - Large multi-line gradient text
5. **"FOR MetaTrader 5"** - Platform specification
6. **"TRADE WHILE YOU SLEEP"** - Call-to-action text

### Gradient Effects
- **Radial gradients** create glowing orb effects
- **Linear gradients** on text create orange-to-yellow transitions
- **Backdrop blur** adds depth to the card
- **Pulse animations** create living, breathing effects

## Performance Optimization
- Uses `React.memo` for component memoization
- Motion animations only trigger once on viewport entry
- GPU-accelerated transforms
- Optimized gradient rendering

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Screen reader friendly
- Keyboard navigation support
- High contrast text

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Common Use Cases

### 1. Landing Page Hero
```tsx
<main>
  <AureliusPromoBanner variant="full" showLogo={true} />
  {/* Rest of landing page */}
</main>
```

### 2. Product Announcement
```tsx
<section className="announcements">
  <AureliusPromoBanner variant="compact" showLogo={false} />
</section>
```

### 3. Social Media Graphics
The component is designed to match the social media graphic aesthetic and can be screenshot/exported for marketing materials.

## Tips & Best Practices

1. **Place above the fold** - Use as the first section for maximum impact
2. **Dark backgrounds** - Works best on dark backgrounds
3. **Spacing** - Add padding around the component for breathing room
4. **Loading states** - Use Suspense boundaries for optimal loading
5. **Mobile first** - Component is optimized for mobile viewing

## Troubleshooting

### Animations not working
- Ensure Motion.js is installed: `npm install motion`
- Check that CSS animations are added to globals.css

### Colors look different
- Verify Tailwind is processing the color values
- Check that the color variables match your theme

### Layout issues
- Ensure parent container doesn't restrict width
- Check responsive breakpoints in your layout

## Next Steps

1. ✅ Component created and styled
2. ✅ Demo page created
3. ✅ CSS animations added
4. 🔲 Integrate into main app (optional)
5. 🔲 Add to navigation/routing (optional)
6. 🔲 Customize text content (optional)

## Support

For questions or customization help, refer to:
- Motion.js docs: https://motion.dev
- Tailwind CSS docs: https://tailwindcss.com
- React docs: https://react.dev