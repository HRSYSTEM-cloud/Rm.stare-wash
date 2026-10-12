import { motion } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  ExternalLink,
  Share2,
  Star,
  MapPin,
  Sparkles,
  CreditCard,
  Banknote,
  Camera,
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import {
  AppCustomization,
  DEFAULT_SOCIALS,
  DEFAULT_WELCOME_TITLE_AR,
  DEFAULT_WELCOME_TITLE_EN,
  DEFAULT_WELCOME_TEXT_AR,
  DEFAULT_WELCOME_TEXT_EN,
} from '../data/customization';
import { getDynamicBranches, getDynamicSocialLinks } from '../data/branches';
import { LoyaltyCard } from './LoyaltyCard';
import { FreeServicesSection } from './FreeServicesSection';

interface ActionButtonsProps {
  onScrollToBranches?: () => void;
  onGoToBranches?: () => void;
  onGoToPrices?: () => void;
  onGoToLinks?: () => void;
  onGoToReviews?: () => void;
  onGoToCompetitions?: () => void;
  onGoToGallery?: () => void;
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenLinksModal: () => void;
  lang: Language;
  customData?: AppCustomization;
}

export function ActionButtons({
  onGoToLinks,
  onGoToReviews,
  onGoToCompetitions,
  onGoToGallery,
  onOpenCallModal,
  onOpenWhatsAppModal,
  onOpenLinksModal,
  lang,
  customData,
}: ActionButtonsProps) {
  const t = translations[lang];

  const branches = getDynamicBranches(customData);
  const qurayniyyahBranch = branches.find((b) => b.id === 'al-qurayniyyah');
  const rabwahBranch = branches.find((b) => b.id === 'al-rabwah');

  const qurayniyyahReviewUrl =
    customData?.contacts?.qurayniyyahReviewUrl ||
    qurayniyyahBranch?.googleReviewUrl ||
    qurayniyyahBranch?.googleMapsUrl ||
    'https://www.google.com/maps';

  const rabwahReviewUrl =
    customData?.contacts?.rabwahReviewUrl ||
    rabwahBranch?.googleReviewUrl ||
    rabwahBranch?.googleMapsUrl ||
    'https://www.google.com/maps';

  const tiktokUrl = customData?.socials?.tiktokUrl || DEFAULT_SOCIALS.tiktokUrl;
  const allSocialLinks = getDynamicSocialLinks(customData).filter(
    (l) => l.iconName !== 'phone' && l.iconName !== 'whatsapp' && l.iconName !== 'tiktok'
  );

  const handleLinksClick = () => {
    if (onGoToLinks) {
      onGoToLinks();
    } else {
      onOpenLinksModal();
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-1 py-1 space-y-3.5 relative z-10" id="action-buttons">
      {/* 0. Welcome Greeting Banner */}
      {customData?.showWelcomeMessage !== false && (
        <motion.div
          id="welcome-greeting-banner"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-xl p-[1px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(0,180,255,0.18)]"
        >
          <div className="relative p-2.5 sm:p-3 rounded-[11px] bg-gradient-to-b from-[#0d1c38] via-[#091326] to-[#050c18] text-start space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[9px] sm:text-[10px] font-bold text-emerald-300 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'ar' ? 'متاحون لخدمتك 24/7' : 'Available Now 24/7'}</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 text-[10px] font-bold">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-slate-300">{lang === 'ar' ? 'فرعي الربوة والقرينية' : 'Rabwah & Khumrah'}</span>
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-black text-white leading-snug tracking-wide">
              {lang === 'ar'
                ? (customData?.welcomeTitleAr || DEFAULT_WELCOME_TITLE_AR)
                : (customData?.welcomeTitleEn || DEFAULT_WELCOME_TITLE_EN)}
            </h3>

            <p className="text-[11px] text-slate-200/85 leading-relaxed font-medium">
              {lang === 'ar'
                ? (customData?.welcomeTextAr || DEFAULT_WELCOME_TEXT_AR)
                : (customData?.welcomeTextEn || DEFAULT_WELCOME_TEXT_EN)}
            </p>
          </div>
        </motion.div>
      )}

      {/* 1. Direct Contact: Call & WhatsApp */}
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          id="btn-call-modal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCallModal}
          className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 bg-gradient-to-b from-[#0a1428] via-[#081020] to-[#050b16] rounded-[11px] border border-cyan-400/40 shadow-sm text-start">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-[13px] font-black text-white leading-tight truncate">
                {t.btnCall}
              </div>
              <div className="text-[9px] text-cyan-200/80 font-medium truncate mt-0.5">
                {lang === 'ar' ? 'اتصال مباشر' : 'Direct Call'}
              </div>
            </div>
          </div>
        </motion.button>

        <motion.button
          id="btn-whatsapp-modal"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenWhatsAppModal}
          className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 bg-gradient-to-b from-[#061c16] via-[#041410] to-[#020a08] rounded-[11px] border border-emerald-400/40 shadow-sm text-start">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-black shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-[13px] font-black text-white leading-tight truncate">
                {t.btnWhatsApp}
              </div>
              <div className="text-[9px] text-emerald-300/80 font-medium truncate mt-0.5">
                {lang === 'ar' ? 'محادثة فورية' : 'Instant Chat'}
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* 2. THE OFFICIAL LOYALTY CARD (4 غسلات والخامسة مجانًا + QR للمحفظة) */}
      <LoyaltyCard lang={lang} config={customData?.loyaltyCard} />

      {/* 3. Rate Us on Google Maps by Branch - Unified Royal Blue & Electric Cyan Identity */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#0c1936]/90 via-[#071126]/90 to-[#030917]/90 border border-cyan-400/30 shadow-[0_0_15px_rgba(0,180,255,0.12)] space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Star className="w-3 h-3 fill-white stroke-white" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold text-white">
                {lang === 'ar' ? 'قيمنا على خرائط قوقل' : 'Rate on Google Maps'}
              </span>
              <span className="text-cyan-300 text-[9.5px] tracking-tight font-bold">★★★★★</span>
            </div>
          </div>
          <span className="text-[9px] text-cyan-200/70 font-medium">
            {lang === 'ar' ? 'رأيكم يشرفنا' : '5-Star Reviews'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {/* Qurayniyyah Branch Review */}
          <motion.a
            id="btn-rate-qurayniyyah"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={qurayniyyahReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none transition-all block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/70 to-blue-500/70 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-2 py-1.5 sm:px-2.5 sm:py-2 bg-gradient-to-b from-[#08152b] to-[#040c1a] rounded-[7px] border border-cyan-400/30 text-start flex items-center justify-between gap-1">
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-cyan-200 truncate">
                  <MapPin className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{lang === 'ar' ? 'القرينية (الخمرة)' : 'Al Qurayniyyah'}</span>
                </div>
                <div className="text-[9px] text-cyan-300/80 font-medium flex items-center gap-0.5 mt-0.5">
                  <span>{lang === 'ar' ? 'تقييم الفرع' : 'Rate branch'}</span>
                  <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                </div>
              </div>
              <span className="text-cyan-300 text-[9px] shrink-0 font-extrabold bg-cyan-950/80 px-1 py-0.5 rounded border border-cyan-500/30">★ 5.0</span>
            </div>
          </motion.a>

          {/* Rabwah Branch Review */}
          <motion.a
            id="btn-rate-rabwah"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={rabwahReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none transition-all block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-cyan-400/70 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-2 py-1.5 sm:px-2.5 sm:py-2 bg-gradient-to-b from-[#08152b] to-[#040c1a] rounded-[7px] border border-blue-400/30 text-start flex items-center justify-between gap-1">
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-blue-100 truncate">
                  <MapPin className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{lang === 'ar' ? 'الربوة (الستين)' : 'Al Rabwah'}</span>
                </div>
                <div className="text-[9px] text-cyan-300/80 font-medium flex items-center gap-0.5 mt-0.5">
                  <span>{lang === 'ar' ? 'تقييم الفرع' : 'Rate branch'}</span>
                  <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                </div>
              </div>
              <span className="text-cyan-300 text-[9px] shrink-0 font-extrabold bg-blue-950/80 px-1 py-0.5 rounded border border-blue-400/30">★ 5.0</span>
            </div>
          </motion.a>
        </div>

        {customData?.showReviewsTab !== false && onGoToReviews && (
          <button
            type="button"
            onClick={onGoToReviews}
            className="w-full text-center text-[10px] font-bold text-cyan-300/90 hover:text-cyan-200 flex items-center justify-center gap-1 transition-colors py-0.5"
          >
            <span>💬</span>
            <span>{lang === 'ar' ? 'تصفّح تقييمات العملاء الحية بالموقع' : 'View live customer reviews'}</span>
            <span>{lang === 'ar' ? '←' : '→'}</span>
          </button>
        )}
      </div>

      {/* 4. FREE SERVICES WITH EVERY WASH (الميزات والمواد المجانية المشمولة مع كل غسيل) */}
      <FreeServicesSection lang={lang} items={customData?.freeServices} />

      {/* 5. SHORTCUT TO GALLERY (المعرض) */}
      {customData?.showGalleryTab !== false && onGoToGallery && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoToGallery}
          className="w-full relative group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative px-3 py-2.5 bg-gradient-to-b from-[#0a152d] via-[#071022] to-[#040916] rounded-[11px] border border-cyan-400/40 text-start flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-black text-white leading-tight">
                  {lang === 'ar' ? 'معرض صور وفيديوهات الغسيل 📸' : 'Photo & Video Gallery 📸'}
                </div>
                <div className="text-[10px] text-cyan-200/80 font-medium mt-0.5">
                  {lang === 'ar'
                    ? 'شاهد نتائج الغسيل ورغوة الشامبو والتعقيم بالبخار'
                    : 'Watch our wash foam, steam sanitizing & shining cars'}
                </div>
              </div>
            </div>
            <span className="text-xs text-cyan-300 font-bold">{lang === 'ar' ? '←' : '→'}</span>
          </div>
        </motion.button>
      )}

      {/* 6. Accepted Payment Methods Strip */}
      <div className="px-3 py-2 rounded-xl bg-[#070d1a]/80 border border-blue-900/30 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">{lang === 'ar' ? 'طرق الدفع المتاحة:' : 'Payment:'}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 font-medium text-[10px] sm:text-[11px]">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{lang === 'ar' ? 'مدى وشبكة' : 'Mada & Cards'}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Apple Pay</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Banknote className="w-3 h-3 text-cyan-400" />
            <span>{lang === 'ar' ? 'كاش' : 'Cash'}</span>
          </span>
        </div>
      </div>

      {/* 7. Official TikTok Account Featured Banner */}
      <div className="space-y-2 pt-0.5">
        <motion.a
          id="btn-tiktok"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full relative group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-between px-3 py-2.5 bg-gradient-to-b from-[#09152b] to-[#040c1a] rounded-[11px] border border-cyan-400/40 transition-all text-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white border border-cyan-400/50 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[13px] font-black text-white leading-tight">
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

        {/* Quick Grid of other active social links if present */}
        {allSocialLinks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allSocialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-[#091224] border border-blue-500/30 hover:border-cyan-400/60 text-white text-xs font-bold transition-all group"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-950 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{link.title}</span>
              </a>
            ))}
          </div>
        )}

        {/* All Accounts and Links Button */}
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
      </div>
    </section>
  );
}
