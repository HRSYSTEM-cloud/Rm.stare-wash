import React, { useState } from 'react';
import { Sparkles, MessageCircle, ShieldCheck, Check, ChevronRight } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { DEFAULT_PRICING_DATA, PriceItem } from '../data/pricing';
import { getDynamicBranches } from '../data/branches';

interface LuxuryPricingProps {
  lang: Language;
  customData: AppCustomization;
  onOpenWhatsAppModal: () => void;
}

type CarSize = 'small' | 'medium' | 'large';

export function LuxuryPricing({
  lang,
  customData,
  onOpenWhatsAppModal,
}: LuxuryPricingProps) {
  const [selectedBranch, setSelectedBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');
  const [selectedSize, setSelectedSize] = useState<CarSize>('small');

  const branches = getDynamicBranches(customData);
  const activeBranchInfo = branches.find((b) => b.id === selectedBranch) || branches[0];

  const pricingSource = customData.pricing || DEFAULT_PRICING_DATA;
  const branchPricing = pricingSource[selectedBranch] || DEFAULT_PRICING_DATA[selectedBranch];
  const items: PriceItem[] = branchPricing?.items || [];

  const mainServices = items.filter((item) => !item.isExtra);
  const extraServices = items.filter((item) => item.isExtra);

  // Short, crisp descriptions (like Art Touch)
  const getShortDesc = (id: string) => {
    switch (id) {
      case 'in_out':
        return lang === 'ar'
          ? 'تنظيف متكامل للمقصورة والهيكل الخارجي، تلميع الكفرات والديكور وتعطير فاخر.'
          : 'Complete interior and exterior cleaning with rim and tire dressing.';
      case 'in_out_undercarriage':
        return lang === 'ar'
          ? 'غسيل شامل للمقصورة والبودي بالإضافة لمسار البستم السفلي بمضخات الضغط العالي.'
          : 'Full interior, exterior and hydraulic undercarriage deep cleaning.';
      case 'ext_only':
        return lang === 'ar'
          ? 'رغوة نانو ثلجية نشطة وغسيل يدوي وتجفيف دقيق بمناشف مايكروفايبر خاصة.'
          : 'Active snow foam wash with scratch-free microfiber hand drying.';
      case 'int_only':
        return lang === 'ar'
          ? 'كنس عميق، مسح الطبلون، تعقيم فتحات التكييف بالبخار وتكييس المقود والقير.'
          : 'Deep cabin vacuum, dashboard wipe, steam vent sanitization and bagging.';
      case 'undercarriage_only':
        return lang === 'ar'
          ? 'تنظيف متخصص لأسفل السيارة والمسارات السفلية لإزالة الطين والأملاح.'
          : 'Dedicated high pressure undercarriage blast removing grime and salts.';
      default:
        return lang === 'ar'
          ? 'عناية متقنة بأعلى معايير مغسلة آر إم ستار بمواد أصلية معتمدة.'
          : 'Premium care meeting RM.STAR standards with certified products.';
    }
  };

  const handleServiceClick = (serviceName: string, price: number) => {
    const sizeName =
      selectedSize === 'small'
        ? lang === 'ar' ? 'سيارة صغيرة' : 'Small'
        : selectedSize === 'medium'
        ? lang === 'ar' ? 'سيارة متوسطة' : 'Medium'
        : lang === 'ar' ? 'سيارة كبيرة' : 'Large';

    const branchName =
      selectedBranch === 'al-rabwah'
        ? lang === 'ar' ? 'فرع الربوة' : 'Al Rabwah'
        : lang === 'ar' ? 'فرع القرينية' : 'Al Qurayniyyah';

    const message = encodeURIComponent(
      `السلام عليكم ورحمة الله، أود الاستفسار والحجز لخدمة (${serviceName}) - (${sizeName}) بسعر ${price} ر.س في (${branchName}).`
    );

    const whatsappNum = activeBranchInfo.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
  };

  return (
    <section id="pricing" className="py-14 sm:py-16 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الخدمات والأسعار المعتمدة' : 'Services & Rates'}</span>
          </div>

          <h2 className="font-['Cairo',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-normal mb-2">
            {lang === 'ar' ? 'باقات الغسيل والعناية' : 'Wash & Detailing Packages'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            {lang === 'ar'
              ? 'الأسعار معتمدة وشاملة ضريبة القيمة المضافة 15% مع استخدام شامبو لايف لاينز الأصلي'
              : 'Certified rates inclusive of 15% VAT with authentic Lifelines foam'}
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-4 max-w-sm mx-auto p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setSelectedBranch('al-rabwah')}
            className={`flex-1 py-2 px-3 rounded-lg font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer ${
              selectedBranch === 'al-rabwah'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'فرع الربوة (الستين)' : 'Al Rabwah (60th)'}
          </button>

          <button
            onClick={() => setSelectedBranch('al-qurayniyyah')}
            className={`flex-1 py-2 px-3 rounded-lg font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer ${
              selectedBranch === 'al-qurayniyyah'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'فرع القرينية (الخمرة)' : 'Al Qurayniyyah'}
          </button>
        </div>

        {/* Vehicle Size Switcher Pills (Clean & Sleek like Art Touch) */}
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-8">
          <button
            onClick={() => setSelectedSize('small')}
            className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedSize === 'small'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="font-['Alexandria',sans-serif] text-xs sm:text-sm font-bold">
              🚗 {lang === 'ar' ? 'صغيرة' : 'Small'}
            </div>
          </button>

          <button
            onClick={() => setSelectedSize('medium')}
            className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedSize === 'medium'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="font-['Alexandria',sans-serif] text-xs sm:text-sm font-bold">
              🚙 {lang === 'ar' ? 'متوسطة' : 'Medium'}
            </div>
          </button>

          <button
            onClick={() => setSelectedSize('large')}
            className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedSize === 'large'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="font-['Alexandria',sans-serif] text-xs sm:text-sm font-bold">
              🛻 {lang === 'ar' ? 'كبيرة / جيب' : 'Large / SUV'}
            </div>
          </button>
        </div>

        {/* Clean Luxury Services List (Minimalist & High-End) */}
        <div className="space-y-2.5 mb-6">
          {mainServices.map((service) => {
            const price = service[selectedSize] || 0;
            const isFeatured = service.id === 'in_out';

            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(lang === 'ar' ? service.nameAr : service.nameEn, price)}
                className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                  isFeatured
                    ? 'bg-gradient-to-r from-[#0a152d] to-[#070e1e] border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_20px_rgba(6,182,212,0.12)]'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
                title={lang === 'ar' ? 'انقر للاستفسار عبر واتساب' : 'Click to inquire via WhatsApp'}
              >
                {/* Right: Service Name & Short Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-['Alexandria',sans-serif] font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                      {lang === 'ar' ? service.nameAr : service.nameEn}
                    </h3>
                    {isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-['Alexandria',sans-serif] font-bold text-[10px]">
                        ⭐ {lang === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed truncate sm:whitespace-normal">
                    {getShortDesc(service.id)}
                  </p>
                </div>

                {/* Left: Price & Quick WhatsApp Arrow */}
                <div className="shrink-0 flex items-center gap-3">
                  <div className="text-left md:text-right">
                    <span className="font-['Alexandria',sans-serif] text-xl sm:text-2xl font-black text-cyan-300">
                      {price}
                    </span>
                    <span className="text-xs font-bold text-slate-400 mr-1">
                      {lang === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-800/80 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Addons in Clean Strip */}
        {extraServices.length > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span className="text-amber-400">✨</span>
                <span>{lang === 'ar' ? 'خدمات إضافية:' : 'Add-ons:'}</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {extraServices.map((addon) => {
                  const addPrice = addon[selectedSize] || 5;
                  return (
                    <span
                      key={addon.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                    >
                      {lang === 'ar' ? addon.nameAr : addon.nameEn}{' '}
                      <strong className="text-amber-400 font-bold">+{addPrice} ر.س</strong>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Global Single WhatsApp CTA Button */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenWhatsAppModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 text-white font-['Alexandria',sans-serif] font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>
              {lang === 'ar'
                ? 'استفسار أو حجز مباشر عبر واتساب الفرع'
                : 'Direct WhatsApp Booking'}
            </span>
          </button>

          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lang === 'ar'
                ? 'الأسعار شاملة ضريبة القيمة المضافة 15% ومطابقة للفاتورة النظامية'
                : 'All prices are inclusive of 15% VAT and certified'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
