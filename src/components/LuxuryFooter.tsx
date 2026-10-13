import React, { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';
import officialLogo from '../assets/images/rm_star_exact_logo_1790089128681.jpg';

interface LuxuryFooterProps {
  lang: Language;
  customData: AppCustomization;
  onTriggerSecretAdmin: () => void;
}

export function LuxuryFooter({ lang, customData, onTriggerSecretAdmin }: LuxuryFooterProps) {
  const t = translations[lang];
  const branches = getDynamicBranches(customData);
  const rabwah = branches[0];
  const qurayniyyah = branches[1];
  const activeLogo = customData.logoUrl || officialLogo;

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

  return (
    <footer className="w-full bg-[#03050a] border-t border-cyan-500/15 pt-8 pb-6 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto px-4">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900 text-center md:text-right">
          {/* Brand Info */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div
              onClick={handleLogoTap}
              className="w-14 h-14 rounded-2xl overflow-hidden bg-black border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-pointer select-none active:scale-95 transition-transform shrink-0"
              title="RM.STAR"
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
              <div className="font-['Alexandria',sans-serif] font-black text-xl text-white tracking-wider">
                RM.STAR{' '}
                <span className="text-cyan-400 text-sm font-semibold">| STAR CAR WASH</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {lang === 'ar'
                  ? 'مغسلة سيارات معتمدة في جدة — عناية فائقة، شامبو لايف لاينز، ومياه محلاة على مدار 24 ساعة.'
                  : 'Certified premium car wash in Jeddah. Open 24/7 with pure soft water and Lifelines foam.'}
              </p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              📍 {lang === 'ar' ? 'جدة' : 'Jeddah'}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400">
              ⏰ {lang === 'ar' ? '24 ساعة' : '24/7 Service'}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300">
              🧼 {lang === 'ar' ? 'مياه محلاة' : 'Soft Water'}
            </span>
          </div>
        </div>

        {/* Branches Quick Directory */}
        <div className="py-6 border-b border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <strong className="text-white block font-['Alexandria',sans-serif] mb-1">
              {lang === 'ar' ? '📍 فرع الربوة (شارع الستين):' : '📍 Al Rabwah Branch:'}
            </strong>
            <p className="text-slate-400 mb-1">
              {lang === 'ar'
                ? 'تقاطع طريق الملك فهد (الستين) مع شارع يحيى المعلمي'
                : 'King Fahd Rd. (60th) x Yahya Al-Moalimi St.'}
            </p>
            <div className="text-cyan-300 font-mono font-bold">
              {rabwah?.displayPhone}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
            <strong className="text-white block font-['Alexandria',sans-serif] mb-1">
              {lang === 'ar' ? '📍 فرع القرينية (الخمرة):' : '📍 Al Qurayniyyah Branch:'}
            </strong>
            <p className="text-slate-400 mb-1">
              {lang === 'ar'
                ? 'شارع الشريف بركات ابن محمد، حي القرينية'
                : 'Al Sharif Barakat Ibn Mohammad St., Al Qurayniyyah'}
            </p>
            <div className="text-cyan-300 font-mono font-bold">
              {qurayniyyah?.displayPhone}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RM.STAR CAR WASH. {t.rightsReserved}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
