# 🎯 HOW TO VIEW THE PROMOTIONAL COMPONENTS

## ✅ I've Added a Button to Your App!

### Look for this button on your homepage:

```
🎨 View Promotional Assets
```

It's an orange button located right below your main "Access the Engine" and "View Performance" buttons in the hero section.

---

## 🚀 Quick Steps

1. **Load your app** (refresh if it's already open)
2. **Look at the hero section** (top of the page)
3. **Click the orange button** that says "🎨 View Promotional Assets"
4. **You'll see the ShowcasePage** with all the promotional components!
5. **Click "← Back to Main App"** (top-left) to return to your trading app

---

## 🎨 What You'll See

When you click the button, you'll see:

### Interactive Showcase Page
- **Controls** to switch between:
  - Square cards (1:1) for Instagram/Facebook
  - Wide cards (16:9) for Twitter/LinkedIn
  - Size options (small/medium/large)

- **Live Preview** of the Aurelius-1 promotional banner matching your design

- **Export Instructions** for social media

- **Features Grid** showing what's included

- **Code Examples** for integration

---

## 📍 Button Location

The button is in your **Hero Section**, right here:

```
┌─────────────────────────────────┐
│   ADAPTIVE INTELLIGENCE         │
│   FRAMEWORK                     │
│                                 │
│   [Access the Engine]           │  ← Your existing buttons
│   [View Performance]            │
│                                 │
│   🎨 View Promotional Assets    │  ← NEW BUTTON (orange)
└─────────────────────────────────┘
```

---

## 🎯 What To Try

Once you click the button:

1. **Try the controls** - Switch between 1:1 and 16:9 aspect ratios
2. **Change the size** - Small, medium, or large
3. **Scroll down** - See the feature list and usage instructions
4. **Right-click the card** - Save as image for social media
5. **Click "Back to Main App"** - Return to your trading app anytime

---

## 🔄 Alternative Ways to View

If you don't see the button, here are other ways:

### Option 1: Direct Import (Temporary)
In `/App.tsx`, change the very last line to:
```tsx
export { default } from './ShowcasePage';
```
Then change it back when you're done viewing.

### Option 2: Use AppRouter
In `/App.tsx`, change the very last line to:
```tsx
export { default } from './AppRouter';
```
This adds a floating navigation menu in the top-right corner.

### Option 3: URL Hash (with AppRouter)
```tsx
export { SimpleAppRouter as default } from './AppRouter';
```
Then navigate to:
- `yoursite.com#showcase` - Interactive showcase
- `yoursite.com#promo` - Full promo page
- `yoursite.com#comparison` - Original vs implementation

---

## ❓ Troubleshooting

### "I don't see the button"
- Refresh your browser (Ctrl/Cmd + R)
- Clear cache (Ctrl/Cmd + Shift + R)
- Check if your app loaded successfully
- Scroll to the very top (hero section)

### "Button doesn't work"
- Check browser console for errors
- Make sure ShowcasePage.tsx exists
- Verify all files were created successfully

### "I see a blank page"
- Check that motion/react is installed
- Verify globals.css was updated
- Look for console errors

---

## 📱 What The Components Look Like

### AureliusPromoBanner (Full Width)
```
┌────────────────────────────────────────────────┐
│  [Orange gradient background]                  │
│  ┌─────────────────┐  ┌────────────┐          │
│  │  Introducing    │  │  Visit Web │          │
│  │  AURELIUS-1     │  │  terralabs │          │
│  │  Synthetic      │  │  [Logo]    │          │
│  │  Intelligence   │  └────────────┘          │
│  │  meets Adaptive │                           │
│  │  Neural Trading │                           │
│  └─────────────────┘                           │
└────────────────────────────────────────────────┘
```

### AureliusSocialCard (Square/Wide)
```
┌──────────────────────────────┐
│  [Card with gradient orbs]   │
│  Introducing                 │
│  AURELIUS-1                  │
│  Synthetic Intelligence      │
│  meets Adaptive Neural       │
│  Trading.                    │
│  FOR MetaTrader 5            │
└──────────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Loaded the app
- [ ] Found the orange button in hero section
- [ ] Clicked "View Promotional Assets"
- [ ] Saw the ShowcasePage load
- [ ] Tried changing aspect ratios
- [ ] Explored the component features
- [ ] Clicked "Back to Main App" to return

---

## 🎉 You're All Set!

The promotional components are ready to use. After viewing them, you can:

1. Export cards for social media
2. Integrate components into your pages
3. Customize colors and text
4. Use in marketing campaigns

**Need help?** Check these files:
- `/PROMOTIONAL_COMPONENTS_README.md` - Main guide
- `/INTEGRATION_EXAMPLE.tsx` - 10 integration methods
- `/AURELIUS_PROMO_INDEX.md` - Complete navigation

---

**The button is live in your app RIGHT NOW!** Just refresh and click it! 🚀