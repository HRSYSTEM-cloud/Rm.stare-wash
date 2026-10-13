import React from 'react';
import { Sparkles, MapPin, Clock, ShieldCheck, ArrowDown, Gift, Phone, MessageCircle } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryHeroProps {
  lang: Language;
  customData: AppCustomization;
  onScrollToPricing: () => void;
  onScrollToBranches: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenCallModal: () => void;
}

export function LuxuryHero({
  lang,
  customData,
  onScrollToPricing,
  onScrollToBranches,
  onOpenWhatsAppModal,
  onOpenCallModal,
}: LuxuryHeroProps) {
  const t = translations[lang];
  const activeLogo = customData.logoUrl || officialLogo;
  const loyalty = customData.loyaltyCard;

  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-700/0 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Brand Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{lang === 'ar' ? 'مغسلة سيارات معتمدة في جدة · 24/7' : 'Certified Car Wash in Jeddah · 24/7'}</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-['Alexandria',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-normal leading-[1.35] sm:leading-[1.45] mb-6">
          {customData.heroTitleAr && lang === 'ar' ? (
            customData.heroTitleAr
          ) : (
            <div className="flex flex-col items-center gap-2 sm:gap-3.5">
              <span className="block text-white tracking-wide">
                نظافة وبريق
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 pb-1 tracking-wide">
                يليق بسيارتك
              </span>
            </div>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-6">
          {customData.heroSubtitleAr && lang === 'ar'
            ? customData.heroSubtitleAr
            : lang === 'ar'
            ? 'غسيل احترافي متكامل بمياه محلاة نقية، شامبو لايف لاينز الأصلي، وكيميكال متخصص لتلميع الجنوط والبطانات على مدار 24 ساعة في فرعي الربوة والقرينية.'
            : 'Complete automotive care with 100% desalinated water, genuine Lifelines foam, and specialized wheel chemical detailing 24/7 in Al Rabwah & Al Qurayniyyah.'}
        </p>

        {/* 3 Core Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{lang === 'ar' ? 'فرع الربوة (الستين) + فرع القرينية' : 'Rabwah (60th) + Qurayniyyah'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{lang === 'ar' ? 'خدمة متواصلة 24 ساعة' : 'Open 24/7 Round the Clock'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{lang === 'ar' ? 'مياه محلاة + كيميكال إيطالي' : 'Pure Water + Detailing Chemicals'}</span>
          </div>
        </div>

        {/* Action Buttons (High Contrast & Clear Hierarchy) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
          <button
            onClick={onScrollToPricing}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white font-['Alexandria',sans-serif] font-bold text-sm shadow-[0_4px_25px_rgba(6,182,212,0.35)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>💰 {lang === 'ar' ? 'الخدمات والأسعار المعتمدة' : 'View Services & Pricing'}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onScrollToBranches}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-400/30 text-cyan-300 font-['Alexandria',sans-serif] font-bold text-sm hover:bg-cyan-950/40 hover:border-cyan-400/60 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مواقع الفروع على الخريطة' : 'Branches & Locations'}</span>
          </button>
        </div>

        {/* Quick Fast Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 border-t border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-900">
            <div className="text-lg sm:text-xl font-black text-cyan-400 font-['Alexandria',sans-serif]">24/7</div>
            <div className="text-[11px] text-slate-400">{lang === 'ar' ? 'خدمة متواصلة' : 'Non-stop Service'}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-900">
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-['Alexandria',sans-serif]">100%</div>
            <div className="text-[11px] text-slate-400">{lang === 'ar' ? 'مياه محلاة نقية' : 'Pure Water'}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-900">
            <div className="text-lg sm:text-xl font-black text-amber-400 font-['Alexandria',sans-serif]">4 + 1</div>
            <div className="text-[11px] text-slate-400">{lang === 'ar' ? 'غسلة مجانية' : 'Free Wash Card'}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-900">
            <div className="text-lg sm:text-xl font-black text-blue-400 font-['Alexandria',sans-serif]">2</div>
            <div className="text-[11px] text-slate-400">{lang === 'ar' ? 'فروع رئيسية بجدة' : 'Jeddah Branches'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
