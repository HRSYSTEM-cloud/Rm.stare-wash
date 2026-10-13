import { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle,
  ExternalLink,
  MessageSquarePlus,
  MapPin,
  Sparkles,
  PlusCircle,
} from 'lucide-react';
import { Language } from '../data/translations';
import {
  AppCustomization,
  DEFAULT_RABWAH_ELFSIGHT_ID,
  DEFAULT_QURAYNIYYAH_ELFSIGHT_ID,
  sanitizeElfsightId,
  isValidElfsightId,
} from '../data/customization';
import { getDynamicBranches } from '../data/branches';

interface GoogleReviewsPageProps {
  lang: Language;
  customData?: AppCustomization;
  onOpenAdmin?: () => void;
}

export function GoogleReviewsPage({ lang, customData, onOpenAdmin }: GoogleReviewsPageProps) {
  // Default to 'al-rabwah' (الربوة)
  const [activeBranch, setActiveBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');
  const branches = getDynamicBranches(customData);
  const activeBranchData = branches.find((b) => b.id === activeBranch) || branches[0];

  const rabwahWidgetId = sanitizeElfsightId(
    customData?.elfsightRabwahWidgetId || customData?.elfsightWidgetId,
    DEFAULT_RABWAH_ELFSIGHT_ID
  );

  const qurayniyyahWidgetId = sanitizeElfsightId(
    customData?.elfsightQurayniyyahWidgetId,
    DEFAULT_QURAYNIYYAH_ELFSIGHT_ID
  );

  // Dynamically load Elfsight script on demand only when on the Reviews page
  useEffect(() => {
    const hasWidget = isValidElfsightId(rabwahWidgetId) || isValidElfsightId(qurayniyyahWidgetId);
    if (!hasWidget) return;

    if (!document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const w = window as unknown as { eapps?: { platform?: { initialize?: () => void } } };
    if (w.eapps?.platform?.initialize) {
      try {
        w.eapps.platform.initialize();
      } catch (err) {
        console.warn('Elfsight init:', err);
      }
    }
  }, [activeBranch, rabwahWidgetId, qurayniyyahWidgetId]);

  return (
    <div className="space-y-4 pt-1 animate-fadeIn pb-8 text-start">
      {/* 1. Header with Google Maps Branding */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-cyan-300 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{lang === 'ar' ? 'خرائط Google — تقييمات العملاء' : 'Google Maps Reviews'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {lang === 'ar' ? 'تقييمات عملاء مغسلة RM.STAR' : 'Customer Reviews'}
        </h2>
        <p className="text-xs text-slate-300">
          {lang === 'ar'
            ? 'تصفح تقييمات العملاء الحقيقية مباشرة على خرائط Google'
            : 'Explore real customer feedback directly on Google Maps'}
        </p>
      </div>

      {/* 2. Branch Selector Tabs (الربوة / القرينية) */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/60 rounded-xl border border-blue-950 shadow-md">
        <button
          type="button"
          onClick={() => setActiveBranch('al-rabwah')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeBranch === 'al-rabwah'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)] font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>{lang === 'ar' ? 'فرع الربوة (الستين)' : 'Al Rabwah'}</span>
          {activeBranch === 'al-rabwah' && <CheckCircle className="w-3 h-3 text-red-200" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveBranch('al-qurayniyyah')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeBranch === 'al-qurayniyyah'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.6)] font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{lang === 'ar' ? 'فرع القرينية (الخمرة)' : 'Al Qurayniyyah'}</span>
          {activeBranch === 'al-qurayniyyah' && <CheckCircle className="w-3 h-3 text-cyan-200" />}
        </button>
      </div>

      {/* 3. Direct Google Maps Real Hub Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-b from-[#0b1428] via-[#091020] to-[#060b16] border border-cyan-500/40 shadow-[0_0_25px_rgba(0,140,255,0.2)] space-y-3.5">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                {lang === 'ar'
                  ? `تقييمات (${activeBranch === 'al-rabwah' ? 'فرع الربوة' : 'فرع القرينية'})`
                  : activeBranchData.name}
              </h3>
              <p className="text-[11px] text-cyan-300 font-medium">
                {lang === 'ar' ? 'على تطبيق وموقع خرائط Google الرسمي' : 'Official Google Maps Business Profile'}
              </p>
            </div>
          </div>

          <div className="flex items-center text-amber-400 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2">
          <a
            href={activeBranchData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,180,255,0.4)] flex items-center justify-center gap-2 active:scale-95"
          >
            <MapPin className="w-4 h-4 text-cyan-200" />
            <span>
              {lang === 'ar'
                ? `فتح وقراءة كافة التقييمات في خرائط Google مباشرة`
                : 'Open & Read All Reviews in Google Maps'}
            </span>
            <ExternalLink className="w-4 h-4 text-cyan-100" />
          </a>

          <a
            href={activeBranchData.googleReviewUrl || activeBranchData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
            <span>
              {lang === 'ar'
                ? `اكتب تقييم 5 نجوم لـ (${activeBranch === 'al-rabwah' ? 'فرع الربوة' : 'فرع القرينية'})`
                : 'Write a Review on Google Maps'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Google Maps Preview Frame */}
        <div className="pt-2">
          <div className="text-[11px] font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'معاينة موقع ونشاط الفرع على خرائط قوقل:' : 'Google Maps Live Embed:'}</span>
          </div>
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-blue-500/30 bg-black/60 shadow-inner">
            <iframe
              title={`Google Map - ${activeBranchData.name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                activeBranchData.embedMapQuery
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 grayscale-[15%] contrast-[105%]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* 4. Live Elfsight Google Reviews Section */}
      <div className="rounded-2xl p-4 bg-gradient-to-b from-[#0a1224] to-[#060b16] border border-blue-900/50 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-black text-white">
              {lang === 'ar'
                ? `تقييمات وآراء العملاء (${activeBranch === 'al-rabwah' ? 'فرع الربوة' : 'فرع القرينية'})`
                : `Customer Reviews (${activeBranchData.name})`}
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-950 text-cyan-300 border border-blue-500/30">
            Google Reviews
          </span>
        </div>

        {/* Elfsight Widgets - Both in DOM for instant availability */}
        <div className="min-h-[220px] rounded-xl bg-black/30 p-2">
          {/* Rabwah Widget */}
          <div className={activeBranch === 'al-rabwah' ? 'block' : 'hidden'}>
            {isValidElfsightId(rabwahWidgetId) ? (
              <div className={`elfsight-app-${rabwahWidgetId}`} />
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                {lang === 'ar' ? 'جاري تحميل تقييمات فرع الربوة...' : 'Loading Rabwah reviews...'}
              </div>
            )}
          </div>

          {/* Qurayniyyah Widget */}
          <div className={activeBranch === 'al-qurayniyyah' ? 'block' : 'hidden'}>
            {isValidElfsightId(qurayniyyahWidgetId) ? (
              <div className={`elfsight-app-${qurayniyyahWidgetId}`} />
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                {lang === 'ar' ? 'جاري تحميل تقييمات فرع القرينية...' : 'Loading Qurayniyyah reviews...'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Guidance and Admin Link */}
      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-start space-y-1.5">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'ar' ? 'رابط تقييمات الفرع على خرائط قوقل:' : 'Branch Reviews Link:'}</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'يمكنك دائماً تحديث رابط الفرع أو كود التقييمات في أي وقت من خلال لوحة التحكم.'
            : 'You can update your Google Maps link or review widget code anytime from the admin panel.'}
        </p>
        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-[11px] text-cyan-300 hover:text-white font-bold underline pt-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'فتح لوحة التحكم لتعديل الإعدادات' : 'Open Admin Settings'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
