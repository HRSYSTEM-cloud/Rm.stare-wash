import React, { useState } from 'react';
import { Star, ExternalLink, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { VERIFIED_GOOGLE_REVIEWS, GoogleReviewItem } from '../data/reviews';
import { getDynamicBranches } from '../data/branches';

interface LuxuryReviewsProps {
  lang: Language;
  customData: AppCustomization;
}

export function LuxuryReviews({ lang, customData }: LuxuryReviewsProps) {
  const [activeBranch, setActiveBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');
  const branches = getDynamicBranches(customData);
  const activeBranchData = branches.find((b) => b.id === activeBranch) || branches[0];

  const allReviews: GoogleReviewItem[] =
    customData.reviews && customData.reviews.length > 0 ? customData.reviews : VERIFIED_GOOGLE_REVIEWS;

  const branchReviews = allReviews.filter((r) => r.branchId === activeBranch);
  const displayReviews = branchReviews.length > 0 ? branchReviews : allReviews.slice(0, 6);

  return (
    <section id="reviews" className="py-10 sm:py-12 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-2.5">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{lang === 'ar' ? 'تقييمات خرائط Google الموثقة' : 'Verified Google Maps Reviews'}</span>
          </div>

          <h2 className="font-['Alexandria',sans-serif] text-2xl sm:text-3xl font-black text-white tracking-normal mb-2">
            {lang === 'ar' ? 'آراء وتجارب رواد RM.STAR' : 'Customer Reviews & Feedback'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            {lang === 'ar'
              ? 'تقييمات حقيقية وموثقة من عملائنا على صفحتنا الرسمية في Google Maps'
              : 'Verified reviews from real customers on our official Google Business page'}
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 max-w-sm mx-auto p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveBranch('al-rabwah')}
            className={`flex-1 py-2 px-3 rounded-lg font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer ${
              activeBranch === 'al-rabwah'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? '📍 فرع الربوة (الستين)' : 'Al Rabwah'}
          </button>

          <button
            onClick={() => setActiveBranch('al-qurayniyyah')}
            className={`flex-1 py-2 px-3 rounded-lg font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer ${
              activeBranch === 'al-qurayniyyah'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? '📍 فرع القرينية (الخمرة)' : 'Al Qurayniyyah'}
          </button>
        </div>

        {/* Google Hub Banner */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#0b1428] via-[#091020] to-[#060b16] border border-cyan-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
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
              <div className="font-['Alexandria',sans-serif] font-bold text-sm text-white flex items-center gap-1.5">
                <span>{activeBranchData.name}</span>
                <span className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </span>
                <span className="text-amber-300 font-bold text-xs">(5.0 / 5)</span>
              </div>
              <p className="text-[11px] text-cyan-300">
                {lang === 'ar' ? 'صفحة الأعمال الرسمية في خرائط Google' : 'Official Google Business Profile'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={activeBranchData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Alexandria',sans-serif] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{lang === 'ar' ? 'كافة التقييمات في Google' : 'View on Google'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={activeBranchData.googleReviewUrl || activeBranchData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 text-cyan-300 font-['Alexandria',sans-serif] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'اكتب تقييمك' : 'Write Review'}</span>
            </a>
          </div>
        </div>

        {/* Verified Google Reviews Grid - Always Rendered Directly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayReviews.slice(0, 6).map((rev) => {
            const author = rev.author || 'عميل مغسلة';
            const dateStr = lang === 'ar' ? rev.dateAr : rev.dateEn;
            const textContent = lang === 'ar' ? rev.textAr : rev.textEn;

            return (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      {rev.avatarUrl ? (
                        <img
                          src={rev.avatarUrl}
                          alt={author}
                          className="w-9 h-9 rounded-full object-cover border border-cyan-400/30"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                          {author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-['Alexandria',sans-serif] font-bold text-xs text-white">
                          {author}
                        </h4>
                        <div className="text-[10px] text-slate-400">{dateStr}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    "{textContent}"
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-medium">Google Maps</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ThumbsUp className="w-2.5 h-2.5" />
                    <span>{lang === 'ar' ? 'تقييم موثق' : 'Verified'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
