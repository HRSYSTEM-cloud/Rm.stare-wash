import { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING_DATA, PriceItem } from '../data/pricing';
import { Language, translations } from '../data/translations';
import { Tag, Sparkles, CheckCircle2, ShieldAlert, Car, Droplets } from 'lucide-react';

interface PricingPageProps {
  lang: Language;
}

export function PricingPage({ lang }: PricingPageProps) {
  const [selectedBranch, setSelectedBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');
  const [selectedVehicle, setSelectedVehicle] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  const t = translations[lang];
  const activePricing = PRICING_DATA[selectedBranch];

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
          {lang === 'ar' ? 'أسعار خدمات الغسيل والتنظيف' : 'Car Wash & Detailing Rates'}
        </h2>
        <p className="text-xs text-slate-300">
          {lang === 'ar' ? activePricing.noteAr : activePricing.noteEn}
        </p>
      </div>

      {/* Branch Selector Tabs (فرع الربوة vs فرع الخمرة / القرينية) */}
      <div className="p-1 rounded-2xl bg-[#091122] border border-blue-500/30 flex items-center justify-between gap-1 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
        <button
          onClick={() => setSelectedBranch('al-rabwah')}
          className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            selectedBranch === 'al-rabwah'
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📍 {lang === 'ar' ? 'فرع الربوة' : 'Al Rabwah Branch'}</span>
        </button>

        <button
          onClick={() => setSelectedBranch('al-qurayniyyah')}
          className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            selectedBranch === 'al-qurayniyyah'
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,180,255,0.5)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📍 {lang === 'ar' ? 'فرع الخمرة (القرينية)' : 'Al Khamrah Branch'}</span>
        </button>
      </div>

      {/* Vehicle Size Quick Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {vehicleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedVehicle(cat.id)}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap text-xs font-bold transition-all shrink-0 ${
              selectedVehicle === cat.id
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,210,255,0.3)]'
                : 'bg-[#080e1c] border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ar' ? cat.nameAr : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Main Washing Services List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 text-white">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'باقات الغسيل الأساسية' : 'Core Wash Packages'}</span>
          </span>
          <span className="text-[11px] text-cyan-300 font-normal">
            {lang === 'ar' ? 'الأسعار بالريال السعودي (ر.س)' : 'Prices in SAR'}
          </span>
        </div>

        {mainServices.map((service) => (
          <div
            key={service.id}
            className="p-3.5 rounded-2xl bg-[#091224] border border-blue-500/30 shadow-[0_0_15px_rgba(0,102,255,0.15)] relative overflow-hidden transition-all hover:border-cyan-400/50"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                <span>{lang === 'ar' ? service.nameAr : service.nameEn}</span>
              </h3>
            </div>

            {/* Price Grid (Small / Medium / Large) */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              {/* Small */}
              <div
                className={`p-2 rounded-xl border transition-all ${
                  selectedVehicle === 'small' || selectedVehicle === 'all'
                    ? 'bg-[#07172b] border-cyan-400/50'
                    : 'bg-[#060c18] border-white/5 opacity-50'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-bold">
                  {lang === 'ar' ? 'صغير Small' : 'Small'}
                </div>
                <div className="text-base font-black text-cyan-300 font-mono mt-0.5">
                  {service.small} <span className="text-[10px] font-sans">ر.س</span>
                </div>
              </div>

              {/* Medium */}
              <div
                className={`p-2 rounded-xl border transition-all ${
                  selectedVehicle === 'medium' || selectedVehicle === 'all'
                    ? 'bg-[#07172b] border-blue-400/60'
                    : 'bg-[#060c18] border-white/5 opacity-50'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-bold">
                  {lang === 'ar' ? 'وسط Medium' : 'Medium'}
                </div>
                <div className="text-base font-black text-blue-300 font-mono mt-0.5">
                  {service.medium} <span className="text-[10px] font-sans">ر.س</span>
                </div>
              </div>

              {/* Large */}
              <div
                className={`p-2 rounded-xl border transition-all ${
                  selectedVehicle === 'large' || selectedVehicle === 'all'
                    ? 'bg-[#07172b] border-amber-400/60'
                    : 'bg-[#060c18] border-white/5 opacity-50'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-bold">
                  {lang === 'ar' ? 'كبير Large' : 'Large'}
                </div>
                <div className="text-base font-black text-amber-300 font-mono mt-0.5">
                  {service.large} <span className="text-[10px] font-sans">ر.س</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons & Extras (الإضافات: دبل واكس، شامبو تحضيري، أكياس دعاسات) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'الخدمات والإضافات الخاصة' : 'Add-ons & Extras'}</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
            {lang === 'ar' ? 'سعر موحد لجميع الأحجام' : 'Fixed Rate'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {extraServices.map((extra) => (
            <div
              key={extra.id}
              className="p-3 rounded-xl bg-gradient-to-r from-[#091428] to-[#070e1c] border border-cyan-400/30 flex items-center justify-between shadow-[0_0_12px_rgba(0,150,255,0.15)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-xs">
                  +
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? extra.nameAr : extra.nameEn}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'صغير • وسط • كبير' : 'Small • Medium • Large'}
                  </div>
                </div>
              </div>

              <div className="text-sm font-black text-cyan-300 font-mono bg-[#060c18] px-3 py-1 rounded-lg border border-cyan-400/30">
                {extra.small} <span className="text-[10px] font-sans">ر.س</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Menu Image Preview Modal/Collapsible */}
      <div className="p-3.5 rounded-2xl bg-[#070d1a] border border-blue-500/20 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'الأسعار معتمدة رسمياً ومحدثة' : 'Official Verified Prices'}</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {lang === 'ar'
            ? 'جميع الأسعار مطابقة للقائمة المعتمدة في كلا الفرعين ومتاحة على مدار 24 ساعة بدون أي رسوم خفية.'
            : 'All prices match official in-branch rate cards and operate 24/7 with zero hidden fees.'}
        </p>
      </div>
    </div>
  );
}
