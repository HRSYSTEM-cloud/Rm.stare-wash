import { useEffect, useRef } from 'react';
import {
  Star,
  ExternalLink,
  MapPin,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { getDynamicBranches } from '../data/branches';
import { Language } from '../data/translations';
import { AppCustomization, DEFAULT_ELFSIGHT_WIDGET_ID } from '../data/customization';

interface GoogleReviewsPageProps {
  lang: Language;
  customData?: AppCustomization;
  onOpenAdmin?: () => void;
}

export function GoogleReviewsPage({ lang, customData, onOpenAdmin }: GoogleReviewsPageProps) {
  const branches = getDynamicBranches(customData);
  const rabwah = branches.find((b) => b.id === 'al-rabwah') || branches[0];
  const qurayniyyah = branches.find((b) => b.id === 'al-qurayniyyah') || branches[1];

  const rabwahReviewUrl = rabwah.googleReviewUrl || rabwah.googleMapsUrl;
  const qurayniyyahReviewUrl = qurayniyyah.googleReviewUrl || qurayniyyah.googleMapsUrl;

  const rawElfsight = (customData?.elfsightWidgetId !== undefined
    ? customData.elfsightWidgetId
    : DEFAULT_ELFSIGHT_WIDGET_ID
  ).trim();
  
  // Extract ID if user pastes full class like "elfsight-app-xxxx" or raw code
  let elfsightAppClass = '';
  if (rawElfsight) {
    if (rawElfsight.includes('elfsight-app-')) {
      const match = rawElfsight.match(/elfsight-app-[a-zA-Z0-9_-]+/);
      elfsightAppClass = match ? match[0] : rawElfsight;
    } else {
      elfsightAppClass = `elfsight-app-${rawElfsight}`;
    }
  }

  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Guarantee Elfsight widget renders immediately on mobile without scroll delay
  useEffect(() => {
    if (!widgetContainerRef.current || !elfsightAppClass) return;

    const container = widgetContainerRef.current;
    // Clear and insert fresh div without lazy flag so it mounts immediately on mobile
    container.innerHTML = '';
    const el = document.createElement('div');
    el.className = elfsightAppClass;
    container.appendChild(el);

    const triggerInit = () => {
      try {
        if ((window as any).ElfsightPlatform && typeof (window as any).ElfsightPlatform.init === 'function') {
          (window as any).ElfsightPlatform.init();
        }
      } catch (err) {
        // ignore
      }
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));
    };

    // Make sure platform script is loaded
    if (!document.getElementById('elfsight-platform-script')) {
      const script = document.createElement('script');
      script.id = 'elfsight-platform-script';
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.onload = () => {
        setTimeout(triggerInit, 100);
      };
      document.body.appendChild(script);
    } else {
      triggerInit();
    }

    // Active cleaner for Elfsight Free Watermark link & badge
    const cleanWatermark = () => {
      try {
        // Query all links pointing to elfsight.com or containing free-widget
        const targets = document.querySelectorAll(
          'a[href*="elfsight.com"], a[href*="free-widget"], a[href*="utm_campaign=free-widget"], [class*="eapps-link"]'
        );
        targets.forEach((node) => {
          const el = node as HTMLElement;
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('width', '0', 'important');
          el.style.setProperty('position', 'absolute', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
          if (el.parentNode) {
            try {
              el.parentNode.removeChild(el);
            } catch (err) {
              // ignore
            }
          }
        });

        // Also check inside Shadow DOM if present
        if (widgetContainerRef.current) {
          const allChildren = widgetContainerRef.current.querySelectorAll('*');
          allChildren.forEach((child) => {
            if (child.shadowRoot) {
              const shadowLinks = child.shadowRoot.querySelectorAll('a[href*="elfsight.com"], a[href*="free-widget"]');
              shadowLinks.forEach((sl) => {
                const el = sl as HTMLElement;
                el.style.setProperty('display', 'none', 'important');
                if (el.parentNode) {
                  try {
                    el.parentNode.removeChild(el);
                  } catch (e) {
                    // ignore
                  }
                }
              });
              if (!child.shadowRoot.querySelector('#hide-elfsight-style')) {
                const style = document.createElement('style');
                style.id = 'hide-elfsight-style';
                style.textContent = `
                  a[href*="elfsight.com"], a[href*="free-widget"], [class*="badge" i], [class*="eapps-link" i] {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    height: 0 !important;
                    width: 0 !important;
                  }
                `;
                child.shadowRoot.appendChild(style);
              }
            }
          });
        }
      } catch (e) {
        // ignore
      }
    };

    // Run cleaner immediately and on mutations
    cleanWatermark();
    const observer = new MutationObserver(() => {
      cleanWatermark();
    });

    if (widgetContainerRef.current) {
      observer.observe(widgetContainerRef.current, { childList: true, subtree: true });
    }
    observer.observe(document.body, { childList: true, subtree: true });

    const cleanInterval = setInterval(cleanWatermark, 400);

    const t1 = setTimeout(triggerInit, 250);
    const t2 = setTimeout(triggerInit, 800);
    const t3 = setTimeout(triggerInit, 2000);

    return () => {
      observer.disconnect();
      clearInterval(cleanInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [elfsightAppClass]);

  const reloadWidget = () => {
    if (!widgetContainerRef.current || !elfsightAppClass) return;
    const container = widgetContainerRef.current;
    container.innerHTML = '';
    const el = document.createElement('div');
    el.className = elfsightAppClass;
    container.appendChild(el);

    try {
      if ((window as any).ElfsightPlatform) {
        (window as any).ElfsightPlatform.init();
      }
    } catch (e) {
      // ignore
    }
    window.dispatchEvent(new Event('resize'));
  };

  return (
    <div className="space-y-3.5 pt-1 animate-fadeIn">
      {/* 1. Header with Google Maps Branding */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-cyan-300 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{lang === 'ar' ? 'تقييمات العملاء المعتمدة — Google Maps' : 'Verified Google Maps Reviews'}</span>
        </div>
        <h2 className="text-xl font-black text-white">
          {lang === 'ar' ? 'آراء عملاء مغسلة نجمة آر إم' : 'Customer Reviews'}
        </h2>
        <p className="text-xs text-slate-300">
          {lang === 'ar'
            ? 'مسحوبة وموثقة بشكل مباشر وحقيقي من خرائط Google'
            : 'Live customer reviews pulled directly from Google Maps'}
        </p>
      </div>

      {/* 2. Direct Mobile Action Buttons (Clear, Big, Touch-Friendly) */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={rabwahReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#121c32] to-[#0a1122] border border-red-500/50 hover:border-red-400 text-white shadow-md active:scale-95 transition-all text-center group"
        >
          <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 mb-1.5 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-white">
            {lang === 'ar' ? 'تقييم فرع الربوة' : 'Rate Al Rabwah'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
            <span>★★★★★</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </div>
        </a>

        <a
          href={qurayniyyahReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#121c32] to-[#0a1122] border border-blue-500/50 hover:border-blue-400 text-white shadow-md active:scale-95 transition-all text-center group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-1.5 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-white">
            {lang === 'ar' ? 'تقييم فرع القرينية' : 'Rate Al Qurayniyyah'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
            <span>★★★★★</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </div>
        </a>
      </div>

      {/* 3. Live Google Reviews Elfsight Feed (Fully Optimized for Mobile Viewport) */}
      <div className="rounded-2xl bg-[#09101f] border border-cyan-500/40 p-3 sm:p-4 shadow-[0_0_25px_rgba(0,180,255,0.15)] relative overflow-visible">
        {/* Top bar of widget */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'التعليقات الحية من Google' : 'Live Google Reviews'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>مباشر</span>
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                {lang === 'ar' ? 'تتحدث تلقائياً مع كل تقييم جديد' : 'Auto-synced with Google'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={reloadWidget}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-[11px] flex items-center gap-1"
            title="تحديث التعليقات"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">{lang === 'ar' ? 'تحديث' : 'Refresh'}</span>
          </button>
        </div>

        {/* The Live Elfsight Container - Unrestricted, full-width, clean for Mobile */}
        <div
          ref={widgetContainerRef}
          className="w-full min-h-[220px] flex items-center justify-center overflow-visible"
        >
          {/* Fallback loading indicator while Elfsight renders */}
          <div className="text-center py-8 space-y-2 text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>{lang === 'ar' ? 'جاري تحميل تقييمات Google...' : 'Loading Google reviews...'}</p>
          </div>
        </div>
      </div>

      {/* 4. Tips for Mobile Display Customization on Elfsight */}
      <div className="p-3.5 rounded-2xl bg-[#081224] border border-slate-800 text-start space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'كيف تجعلها واضحة وأكبر للجوال؟' : 'How to make it bigger on mobile?'}</span>
          </div>

          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[10px] px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1"
            >
              <Settings className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'لوحة التحكم' : 'Admin'}</span>
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'في موقع Elfsight يمكنك تخصيص مظهر الويدجت وتكبير الخط بنقرة واحدة:'
            : 'Inside your Elfsight dashboard you can easily enlarge fonts and cards:'}
        </p>

        <ul className="text-[10px] text-slate-300 space-y-1 list-disc list-inside">
          <li>
            <strong className="text-white">من تبويب Layout:</strong> اختر نوع العرض <span className="text-cyan-300 font-bold">Carousel (شريط متحرك)</span> أو <span className="text-cyan-300 font-bold">Grid (شبكة)</span> وهو الأوضح لشاشات الجوال.
          </li>
          <li>
            <strong className="text-white">من تبويب Style:</strong> يمكنك زيادة <span className="text-cyan-300 font-bold">Font Size (حجم الخط)</span> إلى Large أو Custom ليكون الكلام كبيراً وواضحاً على الهواتف.
          </li>
          <li>
            <strong className="text-white">Dark Theme:</strong> اختر الثيم الغامق (Dark) ليتطابق مع ألوان المغسلة الفخمة.
          </li>
        </ul>
        <p className="text-[10px] text-emerald-400 font-semibold pt-1">
          ✓ أي تعديل تقوم به داخل Elfsight يظهر في موقعك تلقائياً وبدون الحاجة لنسخ كود جديد!
        </p>
      </div>
    </div>
  );
}
