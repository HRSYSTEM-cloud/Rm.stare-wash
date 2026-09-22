import { useState, useEffect } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';

interface BrandFooterProps {
  lang: Language;
  customData?: AppCustomization;
}

export function BrandFooter({ lang, customData }: BrandFooterProps) {
  const [jeddahTime, setJeddahTime] = useState('');
  const t = translations[lang];
  const branches = getDynamicBranches(customData);
  const rabwah = branches.find((b) => b.id === 'al-rabwah') || branches[0];
  const qurayniyyah = branches.find((b) => b.id === 'al-qurayniyyah') || branches[1];

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
          timeZone: 'Asia/Riyadh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setJeddahTime(formatter.format(now));
      } catch {
        setJeddahTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-md mx-auto px-4 pt-4 pb-6 text-center space-y-3 relative z-10 border-t border-blue-900/30 mt-6">
      {/* Brand Signature */}
      <div className="space-y-1">
        <div className="inline-flex items-center justify-center gap-1.5 text-xl font-black">
          <span className="text-base">🧼</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 tracking-wider">
            RM.STAR
          </span>
        </div>

        <div className="text-[10px] uppercase tracking-[0.25em] text-blue-300/80 font-bold">
          STAR CAR WASH
        </div>

        <p className="text-xs font-semibold text-cyan-200/90 pt-0.5">
          {t.footerSlogan}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5 text-[11px] font-semibold text-slate-300">
          <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-200">
            📍 {lang === 'ar' ? 'جدة' : 'Jeddah'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300">
            ⏰ {lang === 'ar' ? '24 ساعة' : '24 Hours'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-200">
            🚘 RM.STAR
          </span>
        </div>
      </div>

      {/* Live Jeddah Clock */}
      {jeddahTime && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080f20] border border-cyan-400/20 text-slate-400 text-[11px]">
          <Clock className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>{t.localTime}: </span>
          <span className="font-mono text-cyan-300 font-bold">{jeddahTime}</span>
        </div>
      )}

      {/* Branches Quick Directory with Dynamic Numbers */}
      <div className="text-[11px] text-slate-400 leading-relaxed border-t border-blue-900/20 pt-2.5">
        <p>
          <strong className="text-slate-200">{lang === 'ar' ? 'فرع الربوة:' : 'Al Rabwah:'}</strong> {lang === 'ar' ? 'طريق الملك فهد (الستين) مع شارع يحيى المعلمي' : 'King Fahd Rd. (60th) x Yahya Al-Moalimi'} &bull; {rabwah?.displayPhone}
        </p>
        <p className="mt-1">
          <strong className="text-slate-200">{lang === 'ar' ? 'فرع القرينية:' : 'Al Qurayniyyah:'}</strong> {lang === 'ar' ? 'شارع الشريف بركات ابن محمد' : 'Al Sharif Barakat Ibn Mohammad St.'} &bull; {qurayniyyah?.displayPhone}
        </p>
      </div>

      {/* Copyright & Scroll To Top */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>{t.rightsReserved} {new Date().getFullYear()} RM.STAR</span>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>{t.backToTop}</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
}
