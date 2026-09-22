import { motion } from 'motion/react';
import { MapPin, PhoneCall, MessageCircle, ExternalLink, Share2, Sparkles, Star, Tag } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization, DEFAULT_SOCIALS } from '../data/customization';

interface ActionButtonsProps {
  onScrollToBranches?: () => void;
  onGoToBranches?: () => void;
  onGoToPrices?: () => void;
  onGoToLinks?: () => void;
  onGoToReviews?: () => void;
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenLinksModal: () => void;
  lang: Language;
  customData?: AppCustomization;
}

export function ActionButtons({
  onScrollToBranches,
  onGoToBranches,
  onGoToPrices,
  onGoToLinks,
  onGoToReviews,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onOpenLinksModal,
  lang,
  customData,
}: ActionButtonsProps) {
  const t = translations[lang];

  const tiktokUrl = customData?.socials?.tiktokUrl || DEFAULT_SOCIALS.tiktokUrl;

  const handleBranchesClick = () => {
    if (onGoToBranches) {
      onGoToBranches();
    } else if (onScrollToBranches) {
      onScrollToBranches();
    }
  };

  const handleLinksClick = () => {
    if (onGoToLinks) {
      onGoToLinks();
    } else {
      onOpenLinksModal();
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-1 py-1 space-y-3 relative z-10" id="action-buttons">
      {/* 1. Large Prices Button (زر قائمة الأسعار المعتمدة الجديد) */}
      <motion.button
        id="btn-pricing-hero"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGoToPrices}
        className="w-full relative group overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#07090e] transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 rounded-2xl opacity-90 group-hover:opacity-100 blur-[2px] transition duration-300" />
        <div className="relative flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-r from-[#07172f] via-[#092247] to-[#07172f] rounded-[14px] border border-cyan-300/50 shadow-[0_0_30px_rgba(0,210,255,0.45)] group-hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,240,255,0.8)] shrink-0 group-hover:scale-105 transition-transform font-black">
              <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white tracking-wide">
                  {lang === 'ar' ? 'قائمة الأسعار المعتمدة' : 'Official Price List'}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-400 text-black shadow-[0_0_10px_#00e5ff] animate-pulse">
                  {lang === 'ar' ? 'معتمدة' : 'Official'}
                </span>
              </div>
              <p className="text-xs text-cyan-200/90 font-medium mt-0.5">
                {lang === 'ar' ? 'أسعار غسيل الربوة والقرينية لجميع الأحجام' : 'Rabwah & Khumrah wash rates'}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-all shrink-0">
            <span className="text-base font-bold">{lang === 'ar' ? '←' : '→'}</span>
          </div>
        </div>
      </motion.button>

      {/* 2. Branches Locator Button */}
      <motion.button
        id="btn-branches-locator"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBranchesClick}
        className="w-full relative group overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#07090e] transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-2xl opacity-80 group-hover:opacity-100 blur-[2px] transition duration-300" />
        <div className="relative flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#081224] via-[#0d1f3d] to-[#081224] rounded-[14px] border border-blue-400/40 shadow-[0_0_25px_rgba(0,102,255,0.4)] group-hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,102,255,0.6)] shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-white tracking-wide">
                  {t.btnBranches}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-cyan-300 border border-cyan-400/40">
                  {lang === 'ar' ? 'فرعين بجدة' : '2 Branches'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {t.btnBranchesDesc}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:bg-cyan-400 group-hover:text-black transition-all shrink-0">
            <span className="text-sm font-bold">{lang === 'ar' ? '←' : '→'}</span>
          </div>
        </div>
      </motion.button>

      {/* 3. Direct Contact Row: Call & WhatsApp */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Direct Call Button */}
        <motion.button
          id="btn-call-modal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCallModal}
          className="relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-75 group-hover:opacity-100 blur-[1px] transition-opacity" />
          <div className="relative flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#0a1224] to-[#070b16] rounded-[10px] border border-blue-400/40 shadow-[0_0_15px_rgba(0,102,255,0.3)] text-center h-full">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 mb-1.5 shadow-[0_0_10px_rgba(0,102,255,0.4)]">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white">
              {t.btnCall}
            </span>
            <span className="text-[10px] text-cyan-300/80 font-medium">
              {t.btnCallDesc}
            </span>
          </div>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.button
          id="btn-whatsapp-modal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenWhatsAppModal}
          className="relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl opacity-75 group-hover:opacity-100 blur-[1px] transition-opacity" />
          <div className="relative flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#061814] to-[#030d0a] rounded-[10px] border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-center h-full">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-1.5 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white">
              {t.btnWhatsApp}
            </span>
            <span className="text-[10px] text-emerald-300/80 font-medium">
              {t.btnWhatsAppDesc}
            </span>
          </div>
        </motion.button>
      </div>

      {/* 4. Google Reviews Callout Banner */}
      <motion.button
        id="btn-google-reviews"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGoToReviews}
        className="w-full relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-xl opacity-75 group-hover:opacity-100 blur-[1px] transition-opacity" />
        <div className="relative flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-[#17130a] via-[#1c1608] to-[#120f07] rounded-[10px] border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div className="text-start">
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <span>{t.reviewCardTitle}</span>
                <span className="text-amber-300 text-[11px]">★★★★★</span>
              </div>
              <p className="text-[10px] text-amber-200/80">
                {lang === 'ar' ? 'اضغط لتقييم الفرع على خرائط Google' : 'Tap to rate on Google Maps'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
            {lang === 'ar' ? 'تقييم ↗' : 'Rate ↗'}
          </span>
        </div>
      </motion.button>

      {/* 5. Official TikTok Account Button (Dynamic URL from Admin) */}
      <motion.a
        id="btn-tiktok"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-cyan-500 to-[#4facfe] rounded-xl opacity-75 group-hover:opacity-100 blur-[1px] transition-opacity" />
        <div className="relative flex items-center justify-between px-3.5 py-3 bg-[#070b16] rounded-[10px] border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.2)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.45)] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black border border-cyan-400/50 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,242,254,0.4)]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.86-4.47V8.62a8.27 8.27 0 0 0 4.74 1.48V6.69h-.82Z" />
              </svg>
            </div>
            <div className="text-start">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t.btnTikTok}
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">
                  @rm.star.carwash
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                {t.btnTikTokDesc}
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-[-2px] transition-transform" />
        </div>
      </motion.a>

      {/* 6. All Accounts & Links Button */}
      <motion.button
        id="btn-all-accounts"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLinksClick}
        className="w-full relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-xl opacity-60 group-hover:opacity-100 blur-[1px] transition-opacity" />
        <div className="relative flex items-center justify-between px-3.5 py-2.5 bg-[#080e1e] rounded-[10px] border border-blue-500/30 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-cyan-300 shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="text-start">
              <div className="text-xs font-bold text-white">
                {t.btnAllLinks}
              </div>
              <p className="text-[10px] text-slate-400">
                {t.btnAllLinksDesc}
              </p>
            </div>
          </div>
          <span className="text-xs text-blue-300 group-hover:translate-x-[-2px] transition-transform">
            {lang === 'ar' ? '←' : '→'}
          </span>
        </div>
      </motion.button>
    </section>
  );
}
