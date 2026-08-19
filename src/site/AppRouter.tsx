import React, { useState } from 'react';
import App from './App';
import ShowcasePage from './ShowcasePage';
import PromoPage from './PromoPage';
import ComparisonPage from './ComparisonPage';

/**
 * AppRouter - Simple router to switch between main app and promotional pages
 * 
 * This makes it easy to view the promotional components without modifying App.tsx
 * 
 * Usage: Change your entry point to import this instead of App:
 * // In your index/main file:
 * import AppRouter from './AppRouter';
 * export default AppRouter;
 */

type PageType = 'main' | 'showcase' | 'promo' | 'comparison';

export default function AppRouter() {
  // Get initial page from URL hash, default to 'main'
  const getInitialPage = (): PageType => {
    const hash = window.location.hash.slice(1);
    if (hash === 'showcase' || hash === 'promo' || hash === 'comparison') return hash;
    return 'main';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage());

  // Update URL hash when page changes
  const changePage = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === 'main' ? '' : page;
  };

  // Floating navigation menu
  const FloatingNav = () => (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      <div className="bg-[#1a1625]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-2xl">
        <div className="text-white/60 text-xs mb-2 px-2">Page Switcher</div>
        
        <button
          onClick={() => changePage('main')}
          className={`w-full px-4 py-2 rounded-lg text-sm transition-all ${
            currentPage === 'main'
              ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
              : 'text-white/70 hover:bg-white/10'
          }`}
          style={{ fontWeight: 600 }}
        >
          Main App
        </button>
        
        <button
          onClick={() => changePage('showcase')}
          className={`w-full px-4 py-2 rounded-lg text-sm transition-all mt-1 ${
            currentPage === 'showcase'
              ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
              : 'text-white/70 hover:bg-white/10'
          }`}
          style={{ fontWeight: 600 }}
        >
          Showcase
        </button>
        
        <button
          onClick={() => changePage('promo')}
          className={`w-full px-4 py-2 rounded-lg text-sm transition-all mt-1 ${
            currentPage === 'promo'
              ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
              : 'text-white/70 hover:bg-white/10'
          }`}
          style={{ fontWeight: 600 }}
        >
          Promo Page
        </button>
        
        <button
          onClick={() => changePage('comparison')}
          className={`w-full px-4 py-2 rounded-lg text-sm transition-all mt-1 ${
            currentPage === 'comparison'
              ? 'bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] text-white'
              : 'text-white/70 hover:bg-white/10'
          }`}
          style={{ fontWeight: 600 }}
        >
          Comparison Page
        </button>
      </div>

      {/* Info badge */}
      {currentPage !== 'main' && (
        <div className="bg-[#FF5C39]/20 border border-[#FF5C39]/30 rounded-lg p-3 text-xs text-white/80 max-w-[200px]">
          <div style={{ fontWeight: 600 }} className="mb-1">Demo Mode</div>
          <div className="text-white/60">
            Switch to "Main App" to return to your trading application
          </div>
        </div>
      )}
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'showcase':
        return <ShowcasePage />;
      case 'promo':
        return <PromoPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'main':
      default:
        return <App />;
    }
  };

  return (
    <div>
      {/* Floating navigation - only show if not in main app */}
      <FloatingNav />
      
      {/* Current page */}
      {renderPage()}
    </div>
  );
}

// Alternative: Simple hash-based routing (no state management)
export function SimpleAppRouter() {
  const [currentHash, setCurrentHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#showcase') {
    return <ShowcasePage />;
  } else if (currentHash === '#promo') {
    return <PromoPage />;
  } else if (currentHash === '#comparison') {
    return <ComparisonPage />;
  } else {
    return <App />;
  }
}

/**
 * USAGE INSTRUCTIONS:
 * 
 * Option 1 - Use AppRouter (Recommended):
 * ========================================
 * 1. Change your default export to use AppRouter:
 *    export { default } from './AppRouter';
 * 
 * 2. Or in your main/index file:
 *    import AppRouter from './AppRouter';
 *    <AppRouter />
 * 
 * 3. Use the floating navigation menu to switch between pages
 * 
 * 
 * Option 2 - Use URL Hash Navigation:
 * ====================================
 * 1. Export SimpleAppRouter instead
 * 2. Navigate using URL:
 *    - yoursite.com → Main app
 *    - yoursite.com#showcase → Showcase page
 *    - yoursite.com#promo → Promo page
 *    - yoursite.com#comparison → Comparison page
 * 
 * 
 * Option 3 - Manual Integration:
 * ===============================
 * Don't use this file at all! 
 * See /INTEGRATION_EXAMPLE.tsx for direct integration methods
 */