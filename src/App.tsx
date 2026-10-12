import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeaderLogo } from './components/HeaderLogo';
import { ActionButtons } from './components/ActionButtons';
import { BranchesSection } from './components/BranchesSection';
import { PricingPage } from './components/PricingPage';
import { ServicesPage } from './components/ServicesPage';
import { GalleryPage } from './components/GalleryPage';
import { LinksPage } from './components/LinksPage';
import { GoogleReviewsPage } from './components/GoogleReviewsPage';
import { CompetitionsPage } from './components/CompetitionsPage';
import { BottomNavigation, PageTab } from './components/BottomNavigation';
import { BrandFooter } from './components/BrandFooter';
import { CallModal } from './components/CallModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ShareModal } from './components/ShareModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Language, translations } from './data/translations';
import {
  AppCustomization,
  getLocalStoredCustomization,
  fetchCloudCustomization,
  subscribeToCustomization,
} from './data/customization';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [lang, setLang] = useState<Language>('ar');
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Dynamic Customization synchronized with Firebase & LocalStorage
  const [customData, setCustomData] = useState<AppCustomization>(getLocalStoredCustomization());

  useEffect(() => {
    // 1. Initial fetch from Firestore
    fetchCloudCustomization().then((data) => {
      if (data) setCustomData(data);
    });

    // 2. Real-time subscription to Firestore
    const unsubscribe = subscribeToCustomization((cloudData) => {
      setCustomData(cloudData);
    });

    return () => unsubscribe();
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
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
      className={`min-h-screen bg-[#05070c] text-white selection:bg-[#0066ff] selection:text-white relative overflow-x-hidden ${
        lang === 'ar' ? "font-['Cairo',sans-serif]" : 'font-sans'
      } pb-[max(96px,calc(env(safe-area-inset-bottom)+76px))]`}
    >
      {/* Deep Solid Luxury Dark Background with Custom Wallpaper support */}
      <AnimatedBackground
        backgroundImageUrl={customData.backgroundImageUrl}
        overlayOpacity={customData.backgroundOverlayOpacity}
      />

      {/* Main Container - Optimized for mobile viewports (100% Mobile First) */}
      <main className="relative z-10 w-full max-w-md mx-auto px-3 sm:px-4 py-2 flex flex-col justify-between min-h-screen">
        <div className="space-y-3">
          {/* Header & Logo with 100% STEALTH 5-Tap Secret Admin Trigger */}
          <HeaderLogo
            compact={currentTab !== 'home'}
            onGoToBranches={() => handleTabChange('branches')}
            lang={lang}
            onToggleLang={toggleLanguage}
            customLogoUrl={customData.logoUrl}
            onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
          />

          {/* PAGE 1: HOME */}
          {currentTab === 'home' && (
            <div className="space-y-3 animate-fadeIn">
              <ActionButtons
                lang={lang}
                customData={customData}
                onGoToBranches={() => handleTabChange('branches')}
                onGoToPrices={() => handleTabChange('prices')}
                onGoToLinks={() => handleTabChange('links')}
                onGoToReviews={() => handleTabChange('reviews')}
                onGoToCompetitions={() => handleTabChange('competitions')}
                onGoToGallery={() => handleTabChange('gallery')}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                onOpenLinksModal={() => setIsLinksModalOpen(true)}
              />
            </div>
          )}

          {/* PAGE 2: PRICING */}
          {currentTab === 'prices' && (
            <div className="animate-fadeIn">
              <PricingPage lang={lang} customData={customData} />
            </div>
          )}

          {/* PAGE 3: BRANCHES */}
          {currentTab === 'branches' && (
            <div className="animate-fadeIn">
              <BranchesSection lang={lang} customData={customData} />
            </div>
          )}

          {/* PAGE 4: SERVICES */}
          {currentTab === 'services' && (
            <div className="animate-fadeIn">
              <ServicesPage
                lang={lang}
                customData={customData}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
              />
            </div>
          )}

          {/* PAGE 5: GALLERY (المعرض: صور وفيديوهات) */}
          {currentTab === 'gallery' && customData.showGalleryTab !== false && (
            <div className="animate-fadeIn">
              <GalleryPage lang={lang} items={customData.galleryItems} />
            </div>
          )}

          {/* PAGE 6: COMPETITIONS */}
          {currentTab === 'competitions' && customData.showCompetitionsTab !== false && (
            <div className="animate-fadeIn">
              <CompetitionsPage
                lang={lang}
                customData={customData}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                onGoToPrices={() => handleTabChange('prices')}
              />
            </div>
          )}

          {/* PAGE 7: GOOGLE REVIEWS */}
          {currentTab === 'reviews' && customData.showReviewsTab !== false && (
            <div className="animate-fadeIn">
              <GoogleReviewsPage
                lang={lang}
                customData={customData}
                onOpenAdmin={() => setIsAdminModalOpen(true)}
              />
            </div>
          )}

          {/* PAGE 8: LINKS */}
          {currentTab === 'links' && (
            <div className="animate-fadeIn">
              <LinksPage customData={customData} />
            </div>
          )}
        </div>

        {/* Footer with Dynamic Contact Numbers */}
        <BrandFooter lang={lang} customData={customData} />
      </main>

      {/* Modern Bottom Navigation Bar */}
      <BottomNavigation
        currentTab={currentTab}
        onTabChange={handleTabChange}
        lang={lang}
        showReviewsTab={customData.showReviewsTab !== false}
        showCompetitionsTab={customData.showCompetitionsTab !== false}
        showGalleryTab={customData.showGalleryTab !== false}
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

      <ShareModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        lang={lang}
      />

      {/* Admin Dashboard Modal */}
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
