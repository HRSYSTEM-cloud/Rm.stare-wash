import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, MapPin, ShieldCheck, Languages } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);
  const [tapHint, setTapHint] = useState<number | null>(null);

  const t = translations[lang];
  const activeLogo = customLogoUrl || officialLogo;

  const handleBranchesClick = () => {
    if (onGoToBranches) {
      onGoToBranches();
    } else if (onScrollToBranches) {
      onScrollToBranches();
    }
  };

  // 5-Click Secret Admin Trigger
  const handleLogoTap = () => {
    clickCountRef.current += 1;
    const count = clickCountRef.current;

    // Show mini discreet feedback after 2nd tap
    if (count >= 2 && count < 5) {
      setTapHint(5 - count);
    }

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (count >= 5) {
      clickCountRef.current = 0;
      setTapHint(null);
      if (onTriggerSecretAdmin) {
        onTriggerSecretAdmin();
      }
      return;
    }

    // Reset counter if user stops tapping within 2.5 seconds
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      setTapHint(null);
    }, 2500);
  };

  if (compact) {
    return (
      <header className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#080d19]/90 border border-blue-500/20 backdrop-blur-md relative z-10 mb-1">
        <div className="flex items-center gap-2.5">
          <div
            onClick={handleLogoTap}
            className="w-10 h-10 rounded-xl bg-black border border-cyan-400/50 p-0.5 overflow-hidden shadow-[0_0_10px_rgba(0,180,255,0.4)] shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <img
              src={activeLogo}
              alt="RM.STAR"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-start">
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>RM.STAR</span>
              <span className="text-[10px] text-cyan-400">STAR CAR WASH</span>
            </div>
            <p className="text-[10px] text-slate-300">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch Button */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-900/40 border border-cyan-400/40 text-cyan-300 hover:text-white text-[11px] font-bold transition-all"
            title="Switch Language"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-950/80 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.open247}</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex flex-col items-center text-center px-3 pt-4 pb-2 relative z-10">
      {/* Ambient Electric Blue Glow in Background */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Top Utility Bar: Language Switcher */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-slate-300 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>جدة &bull; Jeddah</span>
        </div>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-950 to-[#081226] border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-black shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all"
        >
          <Languages className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Centered Logo Container */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative group mb-4"
      >
        {/* Pulsing Outer Glow Ring */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-65 blur-lg group-hover:opacity-95 transition duration-700 animate-pulse" />
        
        {/* Exact Logo Frame displaying the user's image as is with 5-tap listener */}
        <div
          onClick={handleLogoTap}
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-black shadow-[0_0_35px_rgba(0,140,255,0.4)] cursor-pointer select-none active:scale-[0.98] transition-transform"
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

          {/* Discreet tap feedback indicator */}
          {tapHint !== null && (
            <div className="absolute inset-0 bg-cyan-950/40 backdrop-blur-[2px] flex items-center justify-center animate-fadeIn pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/80 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold shadow-lg">
                {lang === 'ar' ? `${tapHint} نقرات متبقية...` : `${tapHint} taps left...`}
              </span>
            </div>
          )}
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
            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">RM.STAR</span> Car Wash & Detailing</>
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
