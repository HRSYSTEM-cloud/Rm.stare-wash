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

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
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

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToBranches = () => {
    const el = document.getElementById('branches');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Single Page Content Flow */}
      <main className="relative z-10 w-full">
        {/* 1. Hero Section */}
        <LuxuryHero
          lang={lang}
          customData={customData}
          onScrollToPricing={scrollToPricing}
          onScrollToBranches={scrollToBranches}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
          onOpenCallModal={() => setIsCallModalOpen(true)}
        />

        {/* 2. Interactive Services & Pricing */}
        <LuxuryPricing
          lang={lang}
          customData={customData}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 3. Features & Loyalty Card Tracker */}
        <LuxuryFeatures
          lang={lang}
          customData={customData}
        />

        {/* 4. Branches & Google Maps Locations */}
        <LuxuryBranches
          lang={lang}
          customData={customData}
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 5. Real Gallery (Images & Videos) */}
        {customData.showGalleryTab !== false && (
          <LuxuryGallery
            lang={lang}
            items={customData.galleryItems}
          />
        )}

        {/* 6. Google Reviews & Testimonials */}
        {customData.showReviewsTab !== false && (
          <LuxuryReviews
            lang={lang}
            customData={customData}
          />
        )}

        {/* 7. Official Luxury Footer (Integrated Social Channels, Brand Info, Branches & Copyright) */}
        <LuxuryFooter
          lang={lang}
          customData={customData}
          onTriggerSecretAdmin={() => setIsAdminModalOpen(true)}
        />
      </main>

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
