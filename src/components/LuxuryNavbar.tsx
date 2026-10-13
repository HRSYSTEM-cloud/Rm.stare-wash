import { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Globe, Menu, X, Sparkles } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryNavbarProps {
  lang: Language;
  onToggleLang: () => void;
  customData: AppCustomization;
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
  onTriggerSecretAdmin: () => void;
}

export function LuxuryNavbar({
  lang,
  onToggleLang,
  customData,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onTriggerSecretAdmin,
}: LuxuryNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);

  const branches = getDynamicBranches(customData);
  const rabwah = branches[0];
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {lang === 'ar' ? 'الخدمات والأسعار' : 'Services & Pricing'}
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {lang === 'ar' ? 'المميزات والولاء' : 'Features & Loyalty'}
          </button>
          <button
            onClick={() => scrollToSection('branches')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {lang === 'ar' ? 'فروعنا بجدة' : 'Branches'}
          </button>
          {customData.showGalleryTab !== false && (
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              {lang === 'ar' ? 'معرض الصور' : 'Gallery'}
            </button>
          )}
          {customData.showReviewsTab !== false && (
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
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
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-bold hover:text-cyan-300 hover:border-cyan-500/40 transition-all active:scale-95"
            title={lang === 'ar' ? 'English' : 'عربي'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Call Button */}
          <button
            onClick={onOpenCallModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-200 text-xs font-bold hover:bg-blue-900/60 transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
          </button>

          {/* Primary WhatsApp CTA */}
          <button
            onClick={onOpenWhatsAppModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060913]/98 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-4 space-y-2 animate-fadeIn shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800/80">
            <button
              onClick={() => scrollToSection('hero')}
              className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              🏠 {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              💰 {lang === 'ar' ? 'الأسعار والخدمات' : 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              ✨ {lang === 'ar' ? 'المميزات وبطاقة الولاء' : 'Features'}
            </button>
            <button
              onClick={() => scrollToSection('branches')}
              className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              📍 {lang === 'ar' ? 'فروعنا بجدة' : 'Branches'}
            </button>
            {customData.showGalleryTab !== false && (
              <button
                onClick={() => scrollToSection('gallery')}
                className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                📸 {lang === 'ar' ? 'معرض الصور' : 'Gallery'}
              </button>
            )}
            {customData.showReviewsTab !== false && (
              <button
                onClick={() => scrollToSection('reviews')}
                className="py-2 px-3 rounded-lg bg-slate-900/60 text-right text-xs font-bold text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                ⭐ {lang === 'ar' ? 'آراء العملاء' : 'Reviews'}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English Language' : 'اللغة العربية'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-500/40 text-cyan-300 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'اتصال فوري' : 'Call Now'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
