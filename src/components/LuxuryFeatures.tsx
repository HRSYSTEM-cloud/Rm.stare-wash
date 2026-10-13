import React from 'react';
import { Sparkles, Check, ExternalLink, QrCode, Wallet, ShieldCheck, Droplet, Wind } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization, DEFAULT_LOYALTY_CARD } from '../data/customization';

interface LuxuryFeaturesProps {
  lang: Language;
  customData: AppCustomization;
}

export function LuxuryFeatures({ lang, customData }: LuxuryFeaturesProps) {
  const loyalty = customData.loyaltyCard || DEFAULT_LOYALTY_CARD;
  const isLoyaltyEnabled = loyalty.enabled !== false;

  const targetUrl = loyalty.targetUrl || 'https://loyapro.com/c-r/ODM1MA==';
  const qrImageUrl =
    loyalty.customQrUrl?.trim() ||
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}&margin=10`;

  const total = loyalty.totalCount || 5;
  const completed = loyalty.completedCount || 4;

  const qualityPillars = [
    {
      icon: '🧼',
      titleAr: 'شامبو لايف لاينز (Lifelines) الأصلي',
      titleEn: 'Original Lifelines Snow Foam',
      descAr: 'رغوة نانو ثلجية كثيفة وعالية اللزوجة تفكك الأوساخ بلطف وتحافظ على طبقة النانو سيراميك ولمعان الوكالة.',
      descEn: 'High density nano foam safely dissolving dirt while preserving ceramic coating.',
      badgeAr: 'شامبو أصلي',
    },
    {
      icon: '✨',
      titleAr: 'كيميكال إيطالي متخصص لتلميع الجنوط',
      titleEn: 'Specialized Chemical Rim Detailing',
      descAr: 'تركيبة احترافية تذيب سواد وغبار الفرامل المستعصي وتلمع الجنوط والبطانات والكفرات بلون أسود عميق.',
      descEn: 'Brake dust dissolver and deep tire dressing restoring factory finish.',
      badgeAr: 'عناية تفصيلية',
    },
    {
      icon: '💧',
      titleAr: 'مياه محلاة نقية 100% خالية من الأملاح',
      titleEn: '100% Pure Desalinated Soft Water',
      descAr: 'مياه مفلترة تماماً من الأملاح لحماية الطلاء والزجاج من بقع التكلس الجيرية والبهتان مع حرارة الجو.',
      descEn: 'Filtered soft water preventing mineral spots and paint oxidation.',
      badgeAr: 'حماية الطلاء',
    },
    {
      icon: '🧤',
      titleAr: 'مناشف مايكروفايبر مخصصة لكل سيارة',
      titleEn: 'Dedicated Microfiber Towels',
      descAr: 'مناشف ناعمة ومغسولة مخصصة لكل سيارة لمنع الخدوش السطحية (Swirl marks) على طبقة اللكر.',
      descEn: 'Ultra-plush clean towels preventing swirl marks and micro-scratches.',
      badgeAr: 'بدون خدوش',
    },
    {
      icon: '💨',
      titleAr: 'تعقيم مجاري التكييف بالبخار الحار',
      titleEn: 'A/C High-Temp Steam Sanitization',
      descAr: 'تعقيم حراري مكثف لفتحات ومسارات التكييف للقضاء على البكتيريا والفطريات وإزالة الروائح غير المرغوبة.',
      descEn: 'Eliminating mold and bacteria from ventilation ducts for crisp fresh air.',
      badgeAr: 'تعقيم مجاني',
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-16 relative bg-gradient-to-b from-[#05070c] via-[#080d1a] to-[#05070c] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'المكافآت الحصرية ومعايير الجودة' : 'Rewards & Quality Standards'}</span>
          </div>

          <h2 className="font-['Alexandria',sans-serif] text-2xl sm:text-3xl font-black text-white tracking-normal mb-2">
            {lang === 'ar' ? 'برنامج المكافآت ومعايير RM.STAR' : 'Rewards Program & RM.STAR Standards'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'بطاقة ولاء رقمية تحفظ في محفظة جوالك تمنحك غسلة خامسة مجاناً، مع معايير غسيل معتمدة بأعلى دقة.'
              : 'Digital loyalty pass in your mobile wallet with every 5th wash free, along with certified detailing standards.'}
          </p>
        </div>

        {/* 1. VIP DIGITAL LOYALTY CARD WITH ACTIVE QR CODE */}
        {isLoyaltyEnabled && (
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 shadow-[0_8px_32px_rgba(6,182,212,0.25)]">
              <div className="relative rounded-[22px] bg-gradient-to-b from-[#0a1835] via-[#061126] to-[#030917] text-white p-5 sm:p-7 shadow-inner border border-cyan-400/30">
                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badges */}
                <div className="relative flex items-center justify-between pb-3 border-b border-cyan-500/20">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-blue-950/80 px-3 py-1 rounded-full border border-cyan-400/40 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                    <span>{lang === 'ar' ? (loyalty.titleAr || 'بطاقة الولاء والمكافآت') : (loyalty.titleEn || 'VIP Loyalty Pass')}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-200 text-xs font-bold shadow-xs">
                    <Wallet className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Apple & Google Wallet</span>
                  </div>
                </div>

                {/* Headline & Subheadline */}
                <div className="relative my-4 text-center">
                  <h3 className="font-['Alexandria',sans-serif] text-xl sm:text-2xl font-black tracking-tight leading-snug bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,210,255,0.3)]">
                    {lang === 'ar' ? (loyalty.headlineAr || '4 غسلات والخامسة مجانًا') : (loyalty.headlineEn || '4 Washes, 5th is FREE')}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-200/90 mt-1">
                    {lang === 'ar'
                      ? (loyalty.subheadlineAr || 'بطاقة ولاء رقمية خاصة لعملائنا الدائمين')
                      : (loyalty.subheadlineEn || 'Exclusive digital loyalty pass for our regular customers')}
                  </p>
                </div>

                {/* 5 Progress Stamps */}
                <div className="relative py-2 flex items-center justify-center gap-2 sm:gap-3 mb-4">
                  {[...Array(total)].map((_, idx) => {
                    const isFreeCircle = idx === total - 1;
                    const isCompleted = idx < completed;

                    if (isFreeCircle) {
                      return (
                        <div
                          key={idx}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-[#1a2d42] to-[#0a1829] flex flex-col items-center justify-center text-amber-300 font-['Alexandria',sans-serif] font-black text-[11px] sm:text-xs shadow-[0_0_16px_rgba(245,158,11,0.4)]"
                        >
                          <span className="text-sm">🎁</span>
                          <span className="leading-none text-[10px]">{lang === 'ar' ? 'مجانًا' : 'FREE'}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={idx}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-[0_0_12px_rgba(0,180,255,0.3)] ${
                          isCompleted
                            ? 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 text-white border border-cyan-300/40'
                            : 'bg-black/60 border-2 border-slate-700 text-slate-500'
                        }`}
                      >
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white drop-shadow-sm" />
                      </div>
                    );
                  })}
                </div>

                {/* QR CODE & WALLET LINK SECTION */}
                <div className="relative pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  {/* The Live QR Code */}
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-105 transition-all flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
                    title={lang === 'ar' ? 'انقر لفتح البطاقة الرقمية' : 'Click to open pass'}
                  >
                    <img
                      src={qrImageUrl}
                      alt="Loyalty Card QR Code"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg"
                    />
                    <div className="flex items-center gap-1 text-[10px] text-blue-950 font-black">
                      <QrCode className="w-3 h-3 text-cyan-600" />
                      <span>{lang === 'ar' ? 'امسح الباركود' : 'Scan QR'}</span>
                    </div>
                  </a>

                  {/* QR Description & Direct Action Button */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-right gap-2.5">
                    <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs">
                      {lang === 'ar'
                        ? (loyalty.noteAr || 'امسح الباركود بكاميرا جوالك أو اضغط على الزر أدناه لحفظ البطاقة مباشرة في محفظة Apple Wallet أو Google Wallet.')
                        : (loyalty.noteEn || 'Scan the QR code with your camera or tap below to save the pass to your Apple or Google Wallet.')}
                    </p>

                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-['Alexandria',sans-serif] font-black text-xs transition-all shadow-[0_0_16px_rgba(0,180,255,0.35)] flex items-center gap-2 active:scale-95"
                    >
                      <Wallet className="w-4 h-4 text-cyan-100" />
                      <span>
                        {lang === 'ar' ? 'إضافة إلى المحفظة مباشرة' : 'Add Pass to Wallet'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-100" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. QUALITY PILLARS GRID */}
        <div>
          <div className="text-center mb-6">
            <h3 className="font-['Alexandria',sans-serif] text-lg sm:text-xl font-bold text-white">
              {lang === 'ar' ? 'معايير الجودة والضمان في كل غسلة' : 'Certified Detailing & Quality Standards'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {qualityPillars.map((feat, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      {feat.icon}
                    </span>
                    {feat.badgeAr && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                        {feat.badgeAr}
                      </span>
                    )}
                  </div>

                  <h4 className="font-['Alexandria',sans-serif] font-bold text-sm sm:text-base text-white mb-1.5">
                    {lang === 'ar' ? feat.titleAr : feat.titleEn}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'ar' ? feat.descAr : feat.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
