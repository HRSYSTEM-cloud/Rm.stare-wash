import React, { useRef } from 'react';
import {
  ArrowUp,
  Share2,
  ExternalLink,
  Sparkles,
  Home,
  Tag,
  Gift,
  MapPin,
  Camera,
  Film,
  Star,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicSocialLinks } from '../data/branches';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryFooterProps {
  lang: Language;
  customData: AppCustomization;
  onNavigatePage?: (page: string) => void;
  onTriggerSecretAdmin: () => void;
}

export function LuxuryFooter({ lang, customData, onNavigatePage, onTriggerSecretAdmin }: LuxuryFooterProps) {
  const t = translations[lang];
  const activeLogo = customData.logoUrl || officialLogo;
  const socialLinks = getDynamicSocialLinks(customData);

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<any>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Structured site sections directory for "كل صفحة في قسم تحت بشكل مرتب"
  const siteSections = [
    {
      id: 'hero',
      icon: Home,
      titleAr: 'الرئيسية والترحيب',
      titleEn: 'Home & Welcome',
      descAr: 'مقدمة عن RM.STAR، مياه محلاة وشامبو لايف لاينز',
      descEn: 'Introduction to RM.STAR & pure soft water technology',
      color: 'border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
    },
    {
      id: 'pricing',
      icon: Tag,
      titleAr: 'باقات وأسعار الغسيل',
      titleEn: 'Services & Pricing',
      descAr: 'داخلي وخارجي (25 ر.س)، وبستم (40 ر.س)، شامل الضريبة',
      descEn: 'In & Out (25 SAR), Undercarriage Lift (40 SAR)',
      color: 'border-blue-500/30 text-blue-400 hover:border-blue-400',
    },
    {
      id: 'features',
      icon: Gift,
      titleAr: 'بطاقة الولاء والمكافآت',
      titleEn: 'Loyalty Rewards',
      descAr: '4 غسلات والخامسة مجاناً مع بطاقة الولاء الرقمية',
      descEn: '4 Washes + 5th Free with QR digital pass',
      color: 'border-amber-500/30 text-amber-400 hover:border-amber-400',
    },
    {
      id: 'branches',
      icon: MapPin,
      titleAr: 'فروعنا ومواقعنا بجدة',
      titleEn: 'Jeddah Branches',
      descAr: 'فرع الربوة (شارع الستين) وفرع القرينية (الخمرة) 24/7',
      descEn: 'Al Rabwah (60th St) & Al Qurayniyyah 24/7',
      color: 'border-red-500/30 text-red-400 hover:border-red-400',
    },
    {
      id: 'gallery',
      icon: Camera,
      titleAr: 'معرض الصور والفيديوهات',
      titleEn: 'Photo & Video Gallery',
      descAr: 'لقطات حية وتجارب الغسيل في صالات ومسارات RM.STAR',
      descEn: 'Pristine photos and live car wash clips from RM.STAR',
      color: 'border-emerald-500/30 text-emerald-400 hover:border-emerald-400',
    },
    {
      id: 'reviews',
      icon: Star,
      titleAr: 'آراء وتقييمات العملاء',
      titleEn: 'Google Reviews',
      descAr: 'تقييمات واقعية وموثقة من رواد المغسلة في جدة',
      descEn: 'Real verified reviews from Jeddah customers',
      color: 'border-purple-500/30 text-purple-400 hover:border-purple-400',
    },
  ];

  return (
    <footer className="w-full bg-[#03050a] border-t border-cyan-500/20 text-slate-400 text-xs relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-10">

        {/* ======================================================== */}
        {/* دليل أقسام وصفحات الموقع بشكل مرتب (قسم تحت لكل صفحة)   */}
        {/* ======================================================== */}
        <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'دليل صفحات وأقسام الموقع' : 'Site Sections Directory'}</span>
            </div>
            <h3 className="font-['Alexandria',sans-serif] text-lg sm:text-xl font-black text-white">
              {lang === 'ar' ? 'تصفح كافة خدمات وأقسام RM.STAR' : 'Quick Access to Every Section'}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'ar'
                ? 'اضغط على أي قسم للانتقال إليه مباشرة بسلاسة تامة'
                : 'Click any section below to smoothly navigate'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {siteSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`p-3.5 rounded-2xl bg-slate-900/70 border text-right transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group flex flex-col justify-between ${sec.color}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Alexandria',sans-serif] font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                      {lang === 'ar' ? sec.titleAr : sec.titleEn}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                    {lang === 'ar' ? sec.descAr : sec.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* منصات التواصل والدعم الرسمي                              */}
        {/* ======================================================== */}
        {socialLinks.length > 0 && (
          <div className="text-center pt-2 pb-6 border-b border-slate-900">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
              <Share2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تابعنا على تيك توك ومواقع التواصل' : 'Follow Our Official Channels'}</span>
            </div>

            <h3 className="font-['Alexandria',sans-serif] text-xl font-black text-white mb-2">
              {lang === 'ar' ? 'ابقَ على تواصل مع RM.STAR' : 'Stay Connected With Us'}
            </h3>

            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
              {lang === 'ar'
                ? 'تابع فيديوهات وتجارب الغسيل اليومية، أحدث العروض والمسابقات على حساباتنا الرسمية.'
                : 'Follow our daily wash clips, promotions and competitions.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-[#0e1629] border border-cyan-400/40 text-white font-['Alexandria',sans-serif] text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-950/40 hover:border-cyan-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{link.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* هوية البراند والاعتمادات                                  */}
        {/* ======================================================== */}
        <div className="pt-2 pb-6 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right border-b border-slate-900/80">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div
              onClick={handleLogoTap}
              className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer select-none active:scale-95 transition-transform shrink-0"
              title={lang === 'ar' ? 'مغسلة RM.STAR (اضغط 5 مرات لفتح الإدارة)' : 'RM.STAR (Tap 5 times for Admin)'}
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

            <div>
              <div className="font-['Alexandria',sans-serif] font-black text-base sm:text-lg text-white">
                RM.STAR <span className="text-cyan-400 font-semibold text-xs">| STAR CAR WASH</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'ar'
                  ? 'مغسلة سيارات معتمدة في جدة — مياه محلاة وشامبو لايف لاينز وعناية فائقة 24 ساعة.'
                  : 'Certified premium car wash in Jeddah. Open 24/7 with pure soft water.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold shrink-0">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              📍 {lang === 'ar' ? 'جدة — فرع الربوة وفرع القرينية' : 'Jeddah — 2 Branches'}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400">
              ⏰ {lang === 'ar' ? 'خدمة 24 ساعة' : '24/7 Open'}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300">
              🧼 {lang === 'ar' ? 'مياه محلاة' : 'Soft Water'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* حقوق النشر والزر السريع للأعلى                           */}
        {/* ======================================================== */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RM.STAR CAR WASH. {t.rightsReserved}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
