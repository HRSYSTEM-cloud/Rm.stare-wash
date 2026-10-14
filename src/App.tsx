import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LuxuryNavbar } from './components/LuxuryNavbar';
import { LuxuryHero } from './components/LuxuryHero';
import { LuxuryPricing } from './components/LuxuryPricing';
import { LuxuryFeatures } from './components/LuxuryFeatures';
import { LuxuryBranches } from './components/LuxuryBranches';
import { LuxuryGallery } from './components/LuxuryGallery';
import { LuxuryReviews } from './components/LuxuryReviews';
import { LuxuryFooter } from './components/LuxuryFooter';
import { BottomNavigation } from './components/BottomNavigation';
import { CallModal } from './components/CallModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Language, translations } from './data/translations';
import {
  AppCustomization,
  getLocalStoredCustomization,
  fetchCloudCustomization,
  subscribeToCustomization,
} from './data/customization';

export type AppPage =
  | 'home'
  | 'pricing'
  | 'features'
  | 'branches'
  | 'gallery'
  | 'reviews';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Dynamic Customization synchronized with Firebase & LocalStorage
  const [customData, setCustomData] = useState<AppCustomization>(getLocalStoredCustomization());

  useEffect(() => {
    let hasReceivedRealtime = false;

    // Real-time listener for Firestore changes across all devices
    const unsubscribe = subscribeToCustomization((cloudData) => {
      hasReceivedRealtime = true;
      setCustomData(cloudData);
    });

    // Fallback single fetch only if real-time listener doesn't respond
    const timer = setTimeout(() => {
      if (!hasReceivedRealtime) {
        fetchCloudCustomization().then((data) => {
          if (data) setCustomData(data);
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const navigateToPage = (page: AppPage | string) => {
    let target: AppPage = 'home';
    if (page === 'hero' || page === 'home') target = 'home';
    else if (page === 'gallery-photos' || page === 'gallery-videos' || page === 'gallery') target = 'gallery';
    else target = page as AppPage;

    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document title with language
  useEffect(() => {
    const t = translations[lang];
    document.title = `${t.brandTitle} | ${t.brandSubtitle} — ${t.tagline}`;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#05070c] text-white selection:bg-[#0066ff] selection:text-white relative overflow-x-hidden flex flex-col justify-between ${
        lang === 'ar' ? "font-['Alexandria',sans-serif]" : 'font-sans'
      }`}
    >
      {/* Background Graphic & Wallpaper support */}
      <AnimatedBackground
        backgroundImageUrl={customData.backgroundImageUrl}
        overlayOpacity={customData.backgroundOverlayOpacity}
      />

      {/* Top Glassmorphism Luxury Navbar */}
      <LuxuryNavbar
        lang={lang}
        onToggleLang={toggleLanguage}
        customData={customData}
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Dedicated Page Content (Each Section is an Independent Page) */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-between pt-16 pb-28 sm:pb-32">
        <div className="flex-1">
          {/* Quick Back to Home Breadcrumb for subpages */}
          {currentPage !== 'home' && (
            <div className="max-w-6xl mx-auto px-4 pt-4 pb-1">
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>{lang === 'ar' ? '← العودة للرئيسية' : '← Back to Home'}</span>
              </button>
            </div>
          )}

          {/* 1. الصفحة الرئيسية (Home Page) */}
          {currentPage === 'home' && (
            <LuxuryHero
              lang={lang}
              customData={customData}
              onScrollToPricing={() => navigateToPage('pricing')}
              onScrollToBranches={() => navigateToPage('branches')}
              onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />
          )}

          {/* 2. صفحة الأسعار والخدمات (Pricing & Services Page) */}
          {currentPage === 'pricing' && (
            <LuxuryPricing
              lang={lang}
              customData={customData}
              onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
            />
          )}

          {/* 3. صفحة المميزات وبطاقة الولاء (Features & Loyalty Card Page) */}
          {currentPage === 'features' && (
            <LuxuryFeatures
              lang={lang}
              customData={customData}
            />
          )}

          {/* 4. صفحة الفروع ومواقعنا بجدة (Branches Page) */}
          {currentPage === 'branches' && (
            <LuxuryBranches
              lang={lang}
              customData={customData}
              onOpenCallModal={() => setIsCallModalOpen(true)}
              onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
            />
          )}

          {/* 5. صفحة المعرض (Gallery Page: الصور والفيديوهات مقسومة في نفس القسم) */}
          {currentPage === 'gallery' && (
            <LuxuryGallery
              lang={lang}
              items={customData.galleryItems}
              initialTab="all"
            />
          )}

          {/* 7. صفحة آراء العملاء (Reviews Page) */}
          {currentPage === 'reviews' && (
            <LuxuryReviews
              lang={lang}
              customData={customData}
            />
          )}
        </div>

        {/* Brand Footer */}
        <LuxuryFooter
          lang={lang}
          customData={customData}
          onNavigatePage={navigateToPage}
          onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
        />
      </main>

      {/* Tactile On-Screen Bottom Navigation Buttons (Fixed Bottom Dock) */}
      <BottomNavigation
        lang={lang}
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        showGalleryTab={customData.showGalleryTab}
        showReviewsTab={customData.showReviewsTab}
      />

      {/* Modals */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        lang={lang}
        customData={customData}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        lang={lang}
        customData={customData}
      />

      {/* Admin Dashboard Modal (Activated via 5-tap on logo) */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
        currentData={customData}
        onSave={(updated) => {
          setCustomData(updated);
        }}
      />
    </div>
  );
}
