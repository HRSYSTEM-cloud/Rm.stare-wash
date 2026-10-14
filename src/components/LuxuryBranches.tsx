import React from 'react';
import { MapPin, Phone, MessageCircle, Star, Navigation, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';

interface LuxuryBranchesProps {
  lang: Language;
  customData: AppCustomization;
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
}

export function LuxuryBranches({
  lang,
  customData,
  onOpenCallModal,
  onOpenWhatsAppModal,
}: LuxuryBranchesProps) {
  const branches = getDynamicBranches(customData);

  return (
    <section id="branches" className="py-16 sm:py-20 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'مواقعنا في مدينة جدة' : 'Locations in Jeddah'}</span>
          </div>

          <h2 className="font-['Cairo',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-normal mb-2">
            {lang === 'ar' ? 'فروعنا في خدمتك 24 ساعة' : 'Our Branches Open 24/7'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'موقعان استراتيجيان في شمال وجنوب جدة، مجهزان بأحدث مضخات ومسارات الغسيل السريع وغسيل البستم.'
              : 'Two strategic locations across Jeddah equipped with high-pressure ramps and fast wash lanes.'}
          </p>
        </div>

        {/* 2 Elevated Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map((branch) => {
            const isRabwah = branch.id === 'al-rabwah';

            return (
              <div
                key={branch.id}
                className="rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#091024] via-[#080d1c] to-[#050814] border border-cyan-500/25 shadow-xl hover:border-cyan-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Branch Badge & 24/7 Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-['Alexandria',sans-serif] font-bold text-xs">
                      {isRabwah
                        ? lang === 'ar' ? '📍 فرع الربوة (شارع الستين)' : 'Al Rabwah Branch'
                        : lang === 'ar' ? '📍 فرع القرينية (الخمرة)' : 'Al Qurayniyyah Branch'}
                    </span>

                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{lang === 'ar' ? 'مفتوح 24 ساعة' : '24/7 Open'}</span>
                    </span>
                  </div>

                  {/* Branch Name */}
                  <h3 className="font-['Alexandria',sans-serif] text-xl sm:text-2xl font-black text-white mb-2">
                    {lang === 'ar' ? branch.name : branch.name}
                  </h3>

                  {/* Detailed Address */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{branch.streetAddress}</span>
                  </p>

                  {/* Phone & Direct Contact */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 mb-6 flex items-center justify-between shadow-inner">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-medium">
                        {lang === 'ar' ? 'رقم الهاتف المباشر للفرع' : 'Direct Branch Phone'}
                      </div>
                      <div dir="ltr" className="text-sm sm:text-base font-black text-cyan-300 font-mono tracking-widest mt-0.5 text-left">
                        {branch.displayPhone}
                      </div>
                    </div>

                    <a
                      href={`tel:${branch.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 border border-blue-400/30 text-cyan-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                    </a>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  {/* Google Maps Route Button */}
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white font-['Alexandria',sans-serif] font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'فتح الاتجاهات في Google Maps' : 'Open in Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  {/* WhatsApp & Review Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
                        lang === 'ar'
                          ? `السلام عليكم، أستفسر عن خدمات ${branch.name}.`
                          : `Hello, inquiring about services at ${branch.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-900/60 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'واتساب الفرع' : 'WhatsApp'}</span>
                    </a>

                    <a
                      href={branch.googleReviewUrl || branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-900 border border-amber-400/30 text-amber-300 font-bold text-xs hover:bg-amber-950/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{lang === 'ar' ? 'تقييم الفرع' : 'Review'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
