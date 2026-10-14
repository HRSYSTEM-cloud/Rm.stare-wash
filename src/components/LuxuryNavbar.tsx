import { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Globe } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization } from '../data/customization';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryNavbarProps {
  lang: Language;
  onToggleLang: () => void;
  customData: AppCustomization;
  currentPage?: string;
  onNavigatePage?: (page: string) => void;
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
  onTriggerSecretAdmin: () => void;
}

export function LuxuryNavbar({
  lang,
  onToggleLang,
  customData,
  currentPage = 'home',
  onNavigatePage,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onTriggerSecretAdmin,
}: LuxuryNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);

  const activeLogo = customData.logoUrl || officialLogo;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoTap = () => {
    clickCountRef.current += 1;
    const count = clickCountRef.current;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (count >= 5) {
      clickCountRef.current = 0;
      onTriggerSecretAdmin();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }
  };

  const scrollToSection = (id: string) => {
    const targetPage = id === 'hero' ? 'home' : id;
    if (onNavigatePage) {
      onNavigatePage(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070c]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(0,0,0,0.7)] py-2.5'
          : 'bg-[#05070c]/90 backdrop-blur-md border-b border-cyan-500/10 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div
            onClick={handleLogoTap}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black/80 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer select-none active:scale-95 transition-transform shrink-0"
            title="RM.STAR Car Wash"
          >
            <img
              src={activeLogo}
              alt="RM.STAR Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== `${window.location.origin}/logo.jpg`) {
                  target.src = '/logo.jpg';
                }
              }}
            />
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5">
              <span className="font-['Alexandria',sans-serif] font-black text-base sm:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                RM.STAR
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold hidden sm:inline-block">
                جدة
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-normal">
              {lang === 'ar' ? 'مغسلة آر إم ستار للسيارات' : 'STAR CAR WASH JEDDAH'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => scrollToSection('hero')}
            className={`transition-all py-1 cursor-pointer ${
              currentPage === 'home' || currentPage === 'hero'
                ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'hover:text-cyan-400'
            }`}
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className={`transition-all py-1 cursor-pointer ${
              currentPage === 'pricing'
                ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'hover:text-cyan-400'
            }`}
          >
            {lang === 'ar' ? 'الخدمات والأسعار' : 'Services & Pricing'}
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className={`transition-all py-1 cursor-pointer ${
              currentPage === 'features'
                ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'hover:text-cyan-400'
            }`}
          >
            {lang === 'ar' ? 'المميزات والولاء' : 'Features & Loyalty'}
          </button>
          <button
            onClick={() => scrollToSection('branches')}
            className={`transition-all py-1 cursor-pointer ${
              currentPage === 'branches'
                ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'hover:text-cyan-400'
            }`}
          >
            {lang === 'ar' ? 'فروعنا بجدة' : 'Branches'}
          </button>
          {customData.showGalleryTab !== false && (
            <button
              onClick={() => scrollToSection('gallery')}
              className={`transition-all py-1 cursor-pointer ${
                currentPage === 'gallery'
                  ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                  : 'hover:text-cyan-400'
              }`}
            >
              {lang === 'ar' ? 'المعرض' : 'Gallery'}
            </button>
          )}
          {customData.showReviewsTab !== false && (
            <button
              onClick={() => scrollToSection('reviews')}
              className={`transition-all py-1 cursor-pointer ${
                currentPage === 'reviews'
                  ? 'text-cyan-300 font-bold border-b-2 border-cyan-400'
                  : 'hover:text-cyan-400'
              }`}
            >
              {lang === 'ar' ? 'آراء العملاء' : 'Reviews'}
            </button>
          )}
        </nav>

        {/* Actions Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-bold hover:text-cyan-300 hover:border-cyan-500/40 transition-all active:scale-95 cursor-pointer"
            title={lang === 'ar' ? 'English' : 'عربي'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Call Button */}
          <button
            onClick={onOpenCallModal}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-200 text-xs font-bold hover:bg-blue-900/60 transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline sm:inline">{lang === 'ar' ? 'اتصال' : 'Call'}</span>
          </button>

          {/* Primary WhatsApp CTA */}
          <button
            onClick={onOpenWhatsAppModal}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
