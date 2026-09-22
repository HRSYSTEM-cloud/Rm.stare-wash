import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface HeaderLogoProps {
  onScrollToBranches?: () => void;
  onGoToBranches?: () => void;
  compact?: boolean;
  lang: Language;
  onToggleLang: () => void;
  customLogoUrl?: string;
  onTriggerSecretAdmin?: () => void;
}

export function HeaderLogo({
  onScrollToBranches,
  onGoToBranches,
  compact = false,
  lang,
  onToggleLang,
  customLogoUrl,
  onTriggerSecretAdmin,
}: HeaderLogoProps) {
  const [, setImageLoaded] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);

  const t = translations[lang];
  const activeLogo = customLogoUrl || officialLogo;

  const handleBranchesClick = () => {
    if (onGoToBranches) {
      onGoToBranches();
    } else if (onScrollToBranches) {
      onScrollToBranches();
    }
  };

  // 100% Completely Stealth & Hidden Trigger: 5 rapid taps on logo with NO text/hint shown
  const handleLogoTap = () => {
    clickCountRef.current += 1;
    const count = clickCountRef.current;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (count >= 5) {
      clickCountRef.current = 0;
      if (onTriggerSecretAdmin) {
        onTriggerSecretAdmin();
      }
    } else {
      // Reset count if idle for more than 1.5 seconds
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }
  };

  return (
    <header className="w-full max-w-md mx-auto px-4 pt-4 pb-2 text-center relative z-10 flex flex-col items-center">
      {/* Top Utility Bar: Language Switcher */}
      <div className="w-full flex items-center justify-end mb-2">
        <button
          onClick={onToggleLang}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-cyan-300 text-xs font-bold hover:bg-blue-900/80 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,102,255,0.3)] active:scale-95"
          title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <span>🌐</span>
          <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>
      </div>

      {/* Main Brand Logo - Stealth click trigger with NO hints */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative mb-3 group"
      >
        <div
          onClick={handleLogoTap}
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-black shadow-[0_0_35px_rgba(0,140,255,0.4)] cursor-pointer select-none active:scale-[0.99] transition-transform"
          title={lang === 'ar' ? 'شعار مغسلة RM.STAR' : 'RM.STAR Logo'}
        >
          <img
            src={activeLogo}
            alt="RM.STAR STAR CAR WASH Logo"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== `${window.location.origin}/logo.jpg`) {
                target.src = '/logo.jpg';
              }
            }}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* 24/7 Verified Mini Badge */}
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#070c18] border border-cyan-400/60 shadow-[0_0_18px_rgba(0,150,255,0.7)] flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-cyan-300 tracking-wide">{t.open247}</span>
        </motion.div>
      </motion.div>

      {/* Main Titles */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-0.5 shadow-[0_0_10px_rgba(0,102,255,0.2)]">
          <span>🚘</span>
          <span className="tracking-widest font-mono text-cyan-300">RM.STAR</span>
          <span className="text-blue-400/60">|</span>
          <span className="tracking-wide">STAR CAR WASH</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
          {lang === 'ar' ? (
            <>مغسلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">آر إم ستار</span> للسيارات</>
          ) : (
            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">RM.STAR</span> Star Car Wash</>
          )}
        </h1>

        <p className="text-xs sm:text-sm font-medium text-cyan-200/90 flex items-center justify-center gap-1.5 pt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline shrink-0 animate-pulse" />
          <span>{t.footerSlogan}</span>
        </p>

        <p className="text-xs text-slate-300/80 leading-relaxed pt-0.5">
          {t.heroDesc}
        </p>
      </motion.div>

      {/* Quick Status Bar */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-3 flex flex-wrap items-center justify-center gap-1.5 max-w-sm"
      >
        <button
          onClick={handleBranchesClick}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[11px] hover:border-blue-400 hover:text-white transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{lang === 'ar' ? 'جدة (فرعان)' : 'Jeddah (2 Branches)'}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'خدمة متواصلة 24 ساعة' : '24/7 Non-stop Service'}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>{lang === 'ar' ? 'دقة واهتمام بالتفاصيل' : 'Mastering Every Detail'}</span>
        </div>
      </motion.div>
    </header>
  );
}
