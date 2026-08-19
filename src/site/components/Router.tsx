import { useState, useEffect } from 'react';
import Layout from './Layout';

// Page Components
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import PerformancePage from '../pages/PerformancePage';
import ResearchPage from '../pages/ResearchPage';
import PricingPage from '../pages/PricingPage';
import PartnersPage from '../pages/PartnersPage';
import OnboardingPage from '../pages/OnboardingPage';
import DocsPage from '../pages/DocsPage';
import SecurityPage from '../pages/SecurityPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';
import TermsPage from '../pages/legal/TermsPage';
import PrivacyPage from '../pages/legal/PrivacyPage';
import RiskPage from '../pages/legal/RiskPage';

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple client-side navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hostname === window.location.hostname) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== currentPath) {
          window.history.pushState({}, '', href);
          setCurrentPath(href);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [currentPath]);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/features':
        return <FeaturesPage />;
      case '/performance':
        return <PerformancePage />;
      case '/research':
        return <ResearchPage />;
      case '/pricing':
        return <PricingPage />;
      case '/partners':
        return <PartnersPage />;
      case '/onboarding':
        return <OnboardingPage />;
      case '/docs':
        return <DocsPage />;
      case '/security':
        return <SecurityPage />;
      case '/about':
        return <AboutPage />;
      case '/blog':
        return <BlogPage />;
      case '/contact':
        return <ContactPage />;
      case '/legal/terms':
        return <TermsPage />;
      case '/legal/privacy':
        return <PrivacyPage />;
      case '/legal/risk':
        return <RiskPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}