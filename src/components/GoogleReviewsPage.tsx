import { useState } from 'react';
import { Star, ExternalLink, Sparkles, MessageSquare, CheckCircle2, HeartHandshake } from 'lucide-react';
import { BRANCHES } from '../data/branches';
import { Language, translations } from '../data/translations';

interface GoogleReviewsPageProps {
  lang: Language;
}

export function GoogleReviewsPage({ lang }: GoogleReviewsPageProps) {
  const t = translations[lang];

  return (
    <div className="space-y-4 pt-1 animate-fadeIn">
      {/* Title Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-bold">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{t.reviewTitle}</span>
        </div>
        <h2 className="text-xl font-black text-white">
          {lang === 'ar' ? 'شاركنا رأيك على خرائط Google' : 'Review RM.STAR on Google'}
        </h2>
        <p className="text-xs text-slate-300">
          {t.reviewSubtitle}
        </p>
      </div>

      {/* Main Review Call-to-Action Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#09152a] via-[#070e1c] to-[#091428] border border-cyan-400/40 shadow-[0_0_20px_rgba(0,180,255,0.25)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white">{t.reviewCardTitle}</div>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-bold mt-0.5">
                <span>★★★★★</span>
                <span className="text-[11px] text-slate-300 font-normal">({t.starsCount})</span>
              </div>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-black">
            Google Maps
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
          {t.reviewCardDesc}
        </p>

        {/* Real Direct Branch Review Buttons */}
        <div className="mt-4 space-y-2.5">
          {/* Branch 1: Rabwah */}
          <a
            href={BRANCHES[0].googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#0a1224] hover:bg-[#0f1b34] border border-cyan-400/50 text-white transition-all group shadow-[0_0_12px_rgba(0,210,255,0.2)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 font-black text-sm">
                📍
              </div>
              <div className="text-start">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t.rateRabwah}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400">{t.rateRabwahDesc}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-cyan-300 text-xs font-bold shrink-0 bg-blue-950/70 px-2.5 py-1 rounded-lg border border-cyan-400/30 group-hover:border-cyan-300">
              <span>{lang === 'ar' ? 'أضف تقييمك' : 'Write Review'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Branch 2: Qurayniyyah */}
          <a
            href={BRANCHES[1].googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#0a1224] hover:bg-[#0f1b34] border border-cyan-400/50 text-white transition-all group shadow-[0_0_12px_rgba(0,210,255,0.2)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 font-black text-sm">
                📍
              </div>
              <div className="text-start">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t.rateQurayniyyah}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400">{t.rateQurayniyyahDesc}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-cyan-300 text-xs font-bold shrink-0 bg-blue-950/70 px-2.5 py-1 rounded-lg border border-cyan-400/30 group-hover:border-cyan-300">
              <span>{lang === 'ar' ? 'أضف تقييمك' : 'Write Review'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </div>

      {/* Customer Appreciation & Direct Google Maps Message */}
      <div className="p-4 rounded-xl bg-[#070d1a] border border-blue-500/25 space-y-2">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm">
          <HeartHandshake className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'ar' ? 'رأيك يصنع الفرق معنا' : 'Your Review Helps Us Grow'}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-300">
          {lang === 'ar'
            ? 'نسعى دائماً لتقديم أعلى معايير النظافة والتلميع. عند زيارتك لفرع الربوة أو القرينية، يسعدنا جداً تقييمك وتجربتك الحقيقية مباشرة عبر Google Maps.'
            : 'We always strive to deliver the highest standards of car washing and detailing. After your visit to Al Rabwah or Al Qurayniyyah, we greatly appreciate your real feedback directly on Google Maps.'}
        </p>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{lang === 'ar' ? 'كل تقييم يُقرأ باهتمام من قبل إدارة المغسلة' : 'Every review is read with care by our management'}</span>
        </div>
      </div>
    </div>
  );
}
