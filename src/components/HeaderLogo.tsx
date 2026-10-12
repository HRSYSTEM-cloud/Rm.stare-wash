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
    <header className="w-full max-w-md mx-auto px-3 pt-2 pb-1 text-center relative z-10 flex flex-col items-center">
      {/* Top Utility Bar: Language Switcher */}
      <div className="w-full flex items-center justify-end mb-1">
        <button
          onClick={onToggleLang}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-cyan-300 text-[10px] font-bold hover:bg-blue-900/80 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,102,255,0.25)] active:scale-95"
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
        transition={{ duration: 0.35 }}
        className="relative mb-2.5 sm:mb-3 group"
      >
        <div
          onClick={handleLogoTap}
          className={`relative ${
            compact ? 'w-16 h-16' : 'w-40 h-40 sm:w-44 sm:h-44'
          } rounded-2xl overflow-hidden bg-black shadow-[0_0_30px_rgba(0,140,255,0.4)] cursor-pointer select-none active:scale-[0.98] transition-transform`}
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
        {!compact && (
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#070c18] border border-cyan-400/60 shadow-[0_0_15px_rgba(0,150,255,0.6)] flex items-center gap-1 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold text-cyan-300 tracking-wide">{t.open247}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Main Titles */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="space-y-0.5 max-w-md mx-auto"
      >
        {!compact && (
          <div className="inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[10px] font-semibold mb-0.5 shadow-sm">
            <span>🚘</span>
            <span className="tracking-widest font-mono text-cyan-300 font-bold">RM.STAR</span>
            <span className="text-blue-400/60">|</span>
            <span className="tracking-wide">STAR CAR WASH</span>
          </div>
        )}

        <h1 className={`${compact ? 'text-base font-bold' : 'text-lg sm:text-xl font-extrabold'} text-white tracking-tight leading-snug drop-shadow-sm`}>
          {lang === 'ar' ? (
            <>مغسلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 drop-shadow-[0_0_10px_rgba(0,102,255,0.4)]">آر إم ستار</span> للسيارات</>
          ) : (
            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 drop-shadow-[0_0_10px_rgba(0,102,255,0.4)]">RM.STAR</span> Star Car Wash</>
          )}
        </h1>

        {!compact && (
          <p className="text-[11px] sm:text-xs font-semibold text-cyan-200/90 flex items-center justify-center gap-1 pt-0.5">
            <Sparkles className="w-3 h-3 text-cyan-400 inline shrink-0 animate-pulse" />
            <span>{t.footerSlogan}</span>
          </p>
        )}
      </motion.div>

      {/* Quick Status Bar */}
      {!compact && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-1.5 max-w-sm"
        >
          <button
            onClick={handleBranchesClick}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[10px] font-medium hover:border-blue-400 hover:text-white transition-colors"
          >
            <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
            <span>{lang === 'ar' ? 'جدة (فرعان)' : 'Jeddah (2 Branches)'}</span>
          </button>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[10px] font-medium">
            <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>{lang === 'ar' ? 'خدمة متواصلة 24 ساعة' : '24/7 Non-stop'}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0d1322] border border-blue-500/30 text-slate-200 text-[10px] font-medium">
            <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
            <span>{lang === 'ar' ? 'دقة واهتمام بالتفاصيل' : 'Attention to Details'}</span>
          </div>
        </motion.div>
      )}
    </header>
  );
}
