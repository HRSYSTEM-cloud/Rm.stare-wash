import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeaderLogo } from './components/HeaderLogo';
import { ActionButtons } from './components/ActionButtons';
import { BranchesSection } from './components/BranchesSection';
import { PricingPage } from './components/PricingPage';
import { ServicesPage } from './components/ServicesPage';
import { LinksPage } from './components/LinksPage';
import { GoogleReviewsPage } from './components/GoogleReviewsPage';
import { BottomNavigation, PageTab } from './components/BottomNavigation';
import { BrandFooter } from './components/BrandFooter';
import { CallModal } from './components/CallModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ShareModal } from './components/ShareModal';
import { OffersSection } from './components/OffersSection';
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

  // Dynamic Customization (Logo & Offers) synchronized with Firebase
  const [customData, setCustomData] = useState<AppCustomization>(getLocalStoredCustomization());

  useEffect(() => {
    // 1. Initial fetch from Firestore
    fetchCloudCustomization().then((data) => {
      if (data) setCustomData(data);
    });

    // 2. Realtime listener across all devices and visitors
    const unsubscribe = subscribeToCustomization((updatedData) => {
      setCustomData(updatedData);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const t = translations[lang];

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#05070c] text-white selection:bg-[#0066ff] selection:text-white relative overflow-x-hidden ${
        lang === 'ar' ? "font-['Cairo',sans-serif]" : "font-sans"
      } pb-24`}
    >
      {/* Animated Electric Blue Glowing Background & Water Bubbles */}
      <AnimatedBackground />

      {/* Main Container - Optimized for mobile viewports (100% Mobile First) */}
      <main className="relative z-10 w-full max-w-md mx-auto px-3 sm:px-4 py-2 flex flex-col justify-between min-h-screen">
        <div className="space-y-3">
          {/* Header & Logo with 5-Tap Secret Admin Trigger */}
          <HeaderLogo
            compact={currentTab !== 'home'}
            onGoToBranches={() => handleTabChange('branches')}
            lang={lang}
            onToggleLang={toggleLanguage}
            customLogoUrl={customData.logoUrl}
            onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
          />

          {/* PAGE 1: HOME (الرئيسية) */}
          {currentTab === 'home' && (
            <div className="space-y-3 animate-fadeIn">
              {/* Core Action Buttons */}
              <ActionButtons
                lang={lang}
                onGoToBranches={() => handleTabChange('branches')}
                onGoToPrices={() => handleTabChange('prices')}
                onGoToLinks={() => handleTabChange('links')}
                onGoToReviews={() => handleTabChange('reviews')}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                onOpenLinksModal={() => setIsLinksModalOpen(true)}
              />

              {/* Dynamic Offers Section (Managed via Hidden Admin Panel) */}
              <OffersSection offers={customData.offers} lang={lang} />

              {/* Quick Branch Teaser Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#091224] to-[#070d1a] border border-blue-500/25 flex items-center justify-between gap-3">
                <div className="text-start">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.teaserTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {t.teaserDesc}
                  </p>
                </div>
                <button
                  onClick={() => handleTabChange('branches')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-extrabold shadow-[0_0_12px_#00e5ff] transition-all shrink-0"
                >
                  {t.teaserBtn}
                </button>
              </div>
            </div>
          )}

          {/* PAGE 2: PRICING (قائمة الأسعار المعتمدة) */}
          {currentTab === 'prices' && (
            <div className="animate-fadeIn">
              <PricingPage lang={lang} />
            </div>
          )}

          {/* PAGE 3: BRANCHES (الفروع والخرائط) */}
          {currentTab === 'branches' && (
            <div className="animate-fadeIn">
              <BranchesSection lang={lang} />
            </div>
          )}

          {/* PAGE 4: SERVICES (الخدمات والتلميع) */}
          {currentTab === 'services' && (
            <div className="animate-fadeIn">
              <ServicesPage
                lang={lang}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
              />
            </div>
          )}

          {/* PAGE 5: GOOGLE REVIEWS (تقييمات قوقل) */}
          {currentTab === 'reviews' && (
            <div className="animate-fadeIn">
              <GoogleReviewsPage lang={lang} />
            </div>
          )}

          {/* PAGE 6: LINKS (الحسابات وروابط التواصل) */}
          {currentTab === 'links' && (
            <div className="animate-fadeIn">
              <LinksPage />
            </div>
          )}
        </div>

        {/* Footer */}
        <BrandFooter lang={lang} />
      </main>

      {/* Modern Bottom Navigation Bar */}
      <BottomNavigation
        currentTab={currentTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      {/* Secret Admin Dashboard Modal (Opens on 5 taps on Logo + password 0001000) */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
        currentData={customData}
        onSave={(newData) => setCustomData(newData)}
      />

      {/* Modals */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        lang={lang}
      />
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        lang={lang}
      />
      <ShareModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
