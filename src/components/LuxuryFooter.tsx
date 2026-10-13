import React, { useRef } from 'react';
import { ArrowUp, Share2, ExternalLink, Sparkles } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicSocialLinks } from '../data/branches';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryFooterProps {
  lang: Language;
  customData: AppCustomization;
  onTriggerSecretAdmin: () => void;
}

export function LuxuryFooter({ lang, customData, onTriggerSecretAdmin }: LuxuryFooterProps) {
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

  const getPlatformStyle = (iconName: string) => {
    switch (iconName) {
      case 'tiktok':
        return 'bg-gradient-to-r from-slate-900 to-[#0e1629] border-cyan-400/40 text-white hover:border-cyan-300 hover:text-cyan-200 shadow-lg shadow-cyan-950/40';
      case 'snapchat':
        return 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/50';
      case 'instagram':
        return 'bg-pink-950/40 border-pink-500/30 text-pink-300 hover:bg-pink-900/50';
      case 'twitter':
        return 'bg-slate-900 border-slate-700 text-white hover:border-slate-500';
      case 'youtube':
        return 'bg-red-950/40 border-red-500/30 text-red-300 hover:bg-red-900/50';
      default:
        return 'bg-blue-950/40 border-blue-500/30 text-cyan-300 hover:bg-blue-900/50';
    }
  };

  return (
    <footer className="w-full bg-[#03050a] border-t border-cyan-500/20 text-slate-400 text-xs relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* 1. Official Social Media Channel (No repetition, direct TikTok & socials) */}
        {socialLinks.length > 0 && (
          <div className="text-center pb-8 border-b border-slate-900">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-3">
              <Share2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تابعنا على منصات التواصل' : 'Follow Our Social Channels'}</span>
            </div>

            <h3 className="font-['Alexandria',sans-serif] text-xl sm:text-2xl font-black text-white mb-2">
              {lang === 'ar' ? 'ابقَ على تواصل مع RM.STAR' : 'Stay Connected With Us'}
            </h3>

            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
              {lang === 'ar'
                ? 'تابع أحدث عروضنا، مسابقاتنا الحصرية، وتجارب الغسيل اليومية لعملائنا في جدة.'
                : 'Explore daily washes, upcoming deals, and exclusive competitions.'}
            </p>

            {/* Social Links Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border font-['Alexandria',sans-serif] text-xs font-bold transition-all hover:scale-105 active:scale-95 ${getPlatformStyle(
                    link.iconName
                  )}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{link.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 2. Compact Brand Signature & Trust Badges */}
        <div className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right border-b border-slate-900/80">
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

          {/* Quick Badges */}
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

        {/* 3. Clean Copyright & Back To Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
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
