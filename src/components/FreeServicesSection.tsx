import { motion } from 'motion/react';
import { Gift } from 'lucide-react';
import { Language } from '../data/translations';
import { FreeServiceItem, DEFAULT_FREE_SERVICES } from '../data/customization';

interface FreeServicesSectionProps {
  lang: Language;
  items?: FreeServiceItem[];
}

export function FreeServicesSection({ lang, items }: FreeServicesSectionProps) {
  const serviceList = (items && items.length > 0 ? items : DEFAULT_FREE_SERVICES).filter(
    (item) => item.active !== false
  );

  return (
    <div className="rounded-xl p-2.5 sm:p-3 bg-gradient-to-b from-[#081329] via-[#050e1f] to-[#030814] border border-cyan-500/35 shadow-[0_0_18px_rgba(0,140,255,0.14)] text-start space-y-2">
      {/* Compact Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/20">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
            <Gift className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-[13px] font-black text-white flex items-center gap-1.5 leading-tight">
              <span>{lang === 'ar' ? 'خدمات ومواد مجانية مع أي غسيل' : 'Free Inclusions With Every Wash'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 font-bold">
                {lang === 'ar' ? 'مجاناً' : 'Free'}
              </span>
            </h4>
          </div>
        </div>
        <span className="text-[9px] text-cyan-300/70 font-medium">
          {lang === 'ar' ? 'مع كل غسيل' : 'All Washes'}
        </span>
      </div>

      {/* Compact Numbered Grid (1, 2, 3, 4, 5, 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {serviceList.map((service, index) => {
          const number = index + 1;
          const isChemical =
            service.iconName === 'chemical' ||
            service.iconName === 'shampoo' ||
            service.titleAr.includes('شامبو');

          return (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`px-2 py-1.5 rounded-lg border flex items-start gap-2 transition-all ${
                isChemical
                  ? 'bg-gradient-to-r from-[#0d1d3d] via-[#09152e] to-[#050d1d] border-cyan-400/50 sm:col-span-2 shadow-xs'
                  : 'bg-black/40 border-blue-900/40 hover:border-cyan-500/40'
              }`}
            >
              {/* Number Badge instead of Icon (1, 2, 3...) */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 border border-cyan-300/60 text-white font-[900] text-[10px] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(0,210,255,0.4)] mt-0.5">
                {number}
              </div>

              {/* Title & Concise Description */}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                  {lang === 'ar' ? service.titleAr : service.titleEn}
                </div>
                {service.descAr && (
                  <p className="text-[9.5px] sm:text-[10px] text-slate-300/85 leading-snug mt-0.5 font-normal line-clamp-2">
                    {lang === 'ar' ? service.descAr : service.descEn}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
