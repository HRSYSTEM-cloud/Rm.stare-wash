import { useState } from 'react';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';
import { AppOffer } from '../data/customization';
import { Language } from '../data/translations';

interface OffersSectionProps {
  offers: AppOffer[];
  lang: Language;
}

export function OffersSection({ offers, lang }: OffersSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.active);
  if (activeOffers.length === 0) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section className="space-y-2.5 pt-1">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-black text-white flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'العروض الحصرية الحالية' : 'Exclusive Offers'}</span>
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold">
          RM.STAR PROMO
        </span>
      </div>

      <div className="space-y-2">
        {activeOffers.map((offer) => {
          const title = lang === 'ar' ? offer.titleAr : offer.titleEn;
          const desc = lang === 'ar' ? offer.descAr : offer.descEn;
          const tag = lang === 'ar' ? offer.tagAr : offer.tagEn;

          return (
            <div
              key={offer.id}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#091224] to-[#070d18] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,180,255,0.12)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 text-start">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 text-[10px] font-black border border-cyan-400/30">
                      {tag}
                    </span>
                    <h4 className="text-xs font-black text-white">{title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {offer.code && (
                  <button
                    onClick={() => handleCopyCode(offer.code!)}
                    className="flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-xl bg-black/60 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 shrink-0 transition-colors"
                    title="Copy Code"
                  >
                    <div className="flex items-center gap-1 text-[10px] font-mono font-black uppercase">
                      {copiedCode === offer.code ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-cyan-400" />
                      )}
                      <span>{offer.code}</span>
                    </div>
                    <span className="text-[8px] text-slate-400">
                      {copiedCode === offer.code
                        ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!')
                        : (lang === 'ar' ? 'انسخ الكود' : 'Copy')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
