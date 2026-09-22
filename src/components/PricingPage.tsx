import { useState } from 'react';
import { motion } from 'motion/react';
import { DEFAULT_PRICING_DATA, PriceItem, BranchPricing } from '../data/pricing';
import { Language, translations } from '../data/translations';
import { Tag, Sparkles, CheckCircle2, ShieldAlert, Car, Droplets } from 'lucide-react';
import { AppCustomization } from '../data/customization';

interface PricingPageProps {
  lang: Language;
  customData?: AppCustomization;
}

export function PricingPage({ lang, customData }: PricingPageProps) {
  const [selectedBranch, setSelectedBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');
  const [selectedVehicle, setSelectedVehicle] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  const t = translations[lang];

  // Dynamic pricing merging cloud custom data or falling back to default
  const branchPricingMap: Record<string, BranchPricing> = customData?.pricing || DEFAULT_PRICING_DATA;
  const activePricing = branchPricingMap[selectedBranch] || DEFAULT_PRICING_DATA[selectedBranch];

  const vehicleCategories = [
    {
      id: 'all' as const,
      nameAr: 'جميع الأحجام',
      nameEn: 'All Sizes',
      icon: Droplets,
    },
    {
      id: 'small' as const,
      nameAr: 'صغير',
      nameEn: 'Small',
      subAr: 'يارس، اكسنت، صني',
      subEn: 'Yaris, Accent, Sunny',
      color: 'text-cyan-300',
    },
    {
      id: 'medium' as const,
      nameAr: 'وسط',
      nameEn: 'Medium',
      subAr: 'كامري، سوناتا، التيما',
      subEn: 'Camry, Sonata, Altima',
      color: 'text-blue-300',
    },
    {
      id: 'large' as const,
      nameAr: 'كبير',
      nameEn: 'Large',
      subAr: 'جيب، تاهو، لاندكروزر',
      subEn: 'SUV, Patrol, Land Cruiser',
      color: 'text-amber-300',
    },
  ];

  const mainServices = activePricing.items.filter((item) => !item.isExtra);
  const extraServices = activePricing.items.filter((item) => item.isExtra);

  return (
    <div className="space-y-4 pt-1 animate-fadeIn pb-6">
      {/* Title Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-[0_0_12px_rgba(0,210,255,0.2)]">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'قائمة الأسعار الرسمية' : 'Official Price List'}</span>
        </div>
        <h2 className="text-xl font-black text-white">
          {lang === 'ar' ? 'أسعار غسيل سيارات RM.STAR' : 'RM.STAR Wash Pricing'}
        </h2>
        <p className="text-xs text-slate-300">
          {activePricing.noteAr}
        </p>
      </div>

      {/* Branch Selector Switch */}
      <div className="p-1 rounded-2xl bg-[#070b16] border border-cyan-400/30 flex items-center justify-between gap-1 shadow-md">
        <button
          onClick={() => setSelectedBranch('al-rabwah')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            selectedBranch === 'al-rabwah'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>{lang === 'ar' ? 'فرع الربوة (طريق الستين)' : 'Al Rabwah Branch'}</span>
        </button>

        <button
          onClick={() => setSelectedBranch('al-qurayniyyah')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            selectedBranch === 'al-qurayniyyah'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(0,180,255,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{lang === 'ar' ? 'فرع القرينية (الخمرة)' : 'Al Qurayniyyah Branch'}</span>
        </button>
      </div>

      {/* Vehicle Category Filter Pills */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-slate-400 font-medium">
            {lang === 'ar' ? 'تصفية حسب نوع السيارة:' : 'Filter by vehicle size:'}
          </span>
          <span className="text-[10px] text-cyan-300 font-mono">
            {selectedBranch === 'al-rabwah' ? '📍 Rabwah' : '📍 Qurayniyyah'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {vehicleCategories.map((cat) => {
            const isSelected = selectedVehicle === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedVehicle(cat.id)}
                className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-blue-900/60 to-cyan-950/60 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                    : 'bg-[#070b16] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-black">{cat.nameAr}</span>
                {cat.subAr && (
                  <span className="text-[9px] text-slate-400 truncate max-w-full block mt-0.5">
                    {cat.subAr.split('،')[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Washing Services Pricing Table */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'باقات الغسيل الأساسية' : 'Main Washing Packages'}</span>
          </span>
          <span className="text-[10px] text-slate-400">
            {lang === 'ar' ? 'الأسعار بالريال السعودي (ر.س)' : 'Prices in SAR'}
          </span>
        </div>

        <div className="space-y-2">
          {mainServices.map((service) => {
            const isHighlight = service.id === 'in_out_undercarriage';

            return (
              <div
                key={service.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isHighlight
                    ? 'bg-gradient-to-r from-[#0b1730] via-[#0d2044] to-[#0b1730] border-cyan-400/50 shadow-[0_0_15px_rgba(0,180,255,0.2)]'
                    : 'bg-[#080d1c] border-blue-900/40 hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">
                      {service.nameAr}
                    </span>
                    {isHighlight && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-black">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {service.nameEn}
                  </span>
                </div>

                {/* Pricing by Vehicle Category */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
                  {/* Small */}
                  <div
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedVehicle === 'small' || selectedVehicle === 'all'
                        ? 'bg-black/40 border-cyan-500/30'
                        : 'opacity-40 border-transparent'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 block font-medium">صغير</span>
                    <span className="text-sm font-black text-cyan-300 font-mono">
                      {service.small} <span className="text-[10px] font-normal">ر.س</span>
                    </span>
                  </div>

                  {/* Medium */}
                  <div
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedVehicle === 'medium' || selectedVehicle === 'all'
                        ? 'bg-black/40 border-blue-500/30'
                        : 'opacity-40 border-transparent'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 block font-medium">وسط</span>
                    <span className="text-sm font-black text-blue-300 font-mono">
                      {service.medium} <span className="text-[10px] font-normal">ر.س</span>
                    </span>
                  </div>

                  {/* Large */}
                  <div
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedVehicle === 'large' || selectedVehicle === 'all'
                        ? 'bg-black/40 border-amber-500/30'
                        : 'opacity-40 border-transparent'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 block font-medium">كبير / جيب</span>
                    <span className="text-sm font-black text-amber-300 font-mono">
                      {service.large} <span className="text-[10px] font-normal">ر.س</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra Services & Add-ons */}
      {extraServices.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#070b16] border border-blue-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{lang === 'ar' ? 'الإضافات الاختيارية' : 'Optional Add-ons'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {extraServices.map((extra) => (
              <div
                key={extra.id}
                className="p-2.5 rounded-xl bg-black/40 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">{extra.nameAr}</div>
                  <div className="text-[10px] text-slate-400">{extra.nameEn}</div>
                </div>
                <div className="text-cyan-300 font-black font-mono bg-cyan-950/60 px-2 py-1 rounded-lg border border-cyan-400/20">
                  +{extra.small} ر.س
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transparency & Quality Notice */}
      <div className="p-3 rounded-xl bg-[#091122] border border-blue-900/40 text-[11px] text-slate-300 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'ar'
            ? 'جميع الأسعار معتمدة وموحدة داخل الفرع وتشمل ضريبة القيمة المضافة. نستخدم أفضل أنواع الشامبو ورغوة النانو الآمنة على الطلاء.'
            : 'All prices are VAT inclusive and strictly standardized. We use premium snow foam and car paint-safe shampoos.'}
        </p>
      </div>
    </div>
  );
}
