import { motion } from 'motion/react';
import { Sparkles, Check, ExternalLink, QrCode, Wallet } from 'lucide-react';
import { Language } from '../data/translations';
import { LoyaltyCardConfig, DEFAULT_LOYALTY_CARD } from '../data/customization';

interface LoyaltyCardProps {
  lang: Language;
  config?: LoyaltyCardConfig;
  compact?: boolean;
}

export function LoyaltyCard({ lang, config }: LoyaltyCardProps) {
  const data = config || DEFAULT_LOYALTY_CARD;

  if (data.enabled === false) return null;

  const targetUrl = data.targetUrl || 'https://loyapro.com/c-r/ODM1MA==';
  const qrImageUrl =
    data.customQrUrl?.trim() ||
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}&margin=10`;

  const total = data.totalCount || 5;
  const completed = data.completedCount || 4;

  const handleCardClick = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      {/* The Luxury RM.STAR Brand Identity Loyalty Card - Compact & Balanced */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 shadow-[0_4px_20px_rgba(0,140,255,0.25)] transition-all group"
      >
        <div className="relative rounded-[15px] bg-gradient-to-b from-[#0a1835] via-[#061126] to-[#030917] text-white p-3 sm:p-3.5 flex flex-col justify-between text-center select-none shadow-inner border border-cyan-400/30">
          {/* Subtle decorative glowing lights */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Row: Brand Badge + Apple & Google Wallet */}
          <div className="relative flex items-center justify-between pb-0.5">
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-cyan-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-cyan-400/50 shadow-xs">
              <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>{lang === 'ar' ? (data.titleAr || 'بطاقة الولاء') : (data.titleEn || 'Loyalty Pass')}</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-200 text-[9px] sm:text-[10px] font-bold shadow-xs">
              <Wallet className="w-2.5 h-2.5 text-cyan-300" />
              <span>Apple & Google Wallet</span>
            </div>
          </div>

          {/* Headline (4 غسلات والخامسة مجانًا) - Balanced & Crisp */}
          <div className="relative my-1.5 space-y-0.5">
            <h3 className="text-lg sm:text-xl font-[900] tracking-tight leading-snug bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,210,255,0.25)]">
              {lang === 'ar' ? (data.headlineAr || '4 غسلات والخامسة مجانًا') : (data.headlineEn || '4 Washes, 5th is FREE')}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-semibold text-cyan-200/80">
              {lang === 'ar'
                ? (data.subheadlineAr || 'بطاقة ولاء خاصة لعملائنا الدائمين')
                : (data.subheadlineEn || 'Exclusive loyalty pass for our regular customers')}
            </p>
          </div>

          {/* The 5 Circles in Brand Colors:
              4 circles in Electric Cyan / Royal Blue with checkmarks
              5th circle with Glowing Cyan Border & 'مجانًا'
          */}
          <div className="relative py-1.5 flex items-center justify-center gap-1.5 sm:gap-2.5">
            {[...Array(total)].map((_, idx) => {
              const isFreeCircle = idx === total - 1;
              const isCompleted = idx < completed;

              if (isFreeCircle) {
                return (
                  <div
                    key={idx}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-cyan-400 bg-gradient-to-b from-[#0a1c3d] to-[#040c1e] flex items-center justify-center text-cyan-300 font-[900] text-[10px] sm:text-xs shadow-[0_0_12px_rgba(0,210,255,0.35)] relative group-hover:scale-105 transition-transform"
                  >
                    <span className="leading-none">{lang === 'ar' ? 'مجانًا' : 'FREE'}</span>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,180,255,0.3)] relative group-hover:scale-105 transition-transform ${
                    isCompleted
                      ? 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 text-white border border-cyan-300/40'
                      : 'bg-black/60 border-2 border-slate-700 text-slate-500'
                  }`}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] text-white drop-shadow-sm" />
                </div>
              );
            })}
          </div>

          {/* QR Code and Direct Mobile Wallet Activation Section - Compact */}
          <div className="mt-1.5 pt-2 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5">
            {/* The Actual QR Code Display in clean contrast */}
            <div
              onClick={handleCardClick}
              className="cursor-pointer group/qr p-1.5 rounded-xl bg-white border border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)] hover:border-cyan-300 transition-all flex flex-col items-center gap-1 shrink-0"
            >
              <img
                src={qrImageUrl}
                alt="Loyalty Card Barcode"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
              />
              <div className="flex items-center gap-0.5 text-[8px] sm:text-[9px] text-blue-950 font-bold">
                <QrCode className="w-2.5 h-2.5 text-cyan-600" />
                <span>{lang === 'ar' ? 'امسح الباركود' : 'Scan'}</span>
                <ExternalLink className="w-2.5 h-2.5 text-cyan-600" />
              </div>
            </div>

            {/* Explanatory text & Direct Action Button */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-start gap-1.5 min-w-0">
              <p className="text-[10px] text-slate-300 font-medium leading-relaxed max-w-[210px]">
                {lang === 'ar'
                  ? (data.noteAr || 'امسح الباركود بكاميرا جوالك أو اضغط لإضافتها فوراً لمحفظة Apple / Google Wallet')
                  : (data.noteEn || 'Scan or tap to add to Apple/Google Wallet instantly')}
              </p>

              {/* Direct Action Link Button */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-[10px] sm:text-[11px] transition-all shadow-[0_0_12px_rgba(0,180,255,0.3)] flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
              >
                <Wallet className="w-3 h-3 text-cyan-200" />
                <span>
                  {lang === 'ar' ? 'إضافة إلى المحفظة مباشرة' : 'Add Card to Wallet'}
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-cyan-100" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
