import { Sparkles, Shield, Car, Zap, CheckCircle2, PhoneCall, MessageCircle, Droplets } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ServicesPageProps {
  onOpenCallModal: () => void;
  onOpenWhatsAppModal: () => void;
  lang: Language;
}

export function ServicesPage({ onOpenCallModal, onOpenWhatsAppModal, lang }: ServicesPageProps) {
  const t = translations[lang];

  const detailedServices = [
    {
      id: 'wash',
      title: t.serviceWashTitle,
      desc: t.serviceWashDesc,
      icon: Car,
      tag: lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular',
      features: lang === 'ar'
        ? ['رغوة شامبو نانو أصلية', 'تنظيف الجنوط والإطارات', 'تجفيف ميكروفايبر ناعم']
        : ['Nano snow shampoo', 'Deep rim & tire gloss', 'Microfiber scratchless dry'],
    },
    {
      id: 'undercarriage',
      title: lang === 'ar' ? 'غسيل بستم وأسفل الهيكل' : 'Undercarriage & Chassis Wash',
      desc: lang === 'ar'
        ? 'تنظيف هيدروليكي قوي لأسفل السيارة يزيل الأتربة، الرواسب والأملاح المتراكمة لحماية الشاسيه.'
        : 'High-pressure underbody cleaning removing mud, grime, and road salt to protect the chassis.',
      icon: Droplets,
      tag: lang === 'ar' ? 'عناية كاملة' : 'Chassis Care',
      features: lang === 'ar'
        ? ['ضغط مياه عالي لإزالة الطين', 'حماية بطن السيارة من الصدأ', 'تنظيف الشاسيه والمقصات']
        : ['High pressure mud removal', 'Rust prevention wash', 'Chassis & suspension clean'],
    },
    {
      id: 'interior',
      title: t.serviceInteriorTitle,
      desc: t.serviceInteriorDesc,
      icon: Shield,
      tag: lang === 'ar' ? 'نظافة فائقة' : 'Deep Sanitizing',
      features: lang === 'ar'
        ? ['تنظيف المقاعد والأرضيات', 'ترطيب الجلد والبلاستيك', 'تعقيم هواء المقصورة']
        : ['Deep upholstery clean', 'Leather & vinyl conditioning', 'Cabin air sanitization'],
    },
    {
      id: 'express',
      title: t.serviceExpressTitle,
      desc: t.serviceExpressDesc,
      icon: Zap,
      tag: lang === 'ar' ? 'على مدار 24 ساعة' : '24/7 Available',
      features: lang === 'ar'
        ? ['مسارات خدمة سريعة', 'مفتوح 24 ساعة يومياً', 'طاقم محترف وسريع']
        : ['Express quick lanes', 'Open 24/7 day & night', 'Skilled fast-paced crew'],
    },
  ];

  return (
    <div className="space-y-4 pt-1 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.servicesTitle}</span>
        </div>
        <h2 className="text-xl font-black text-white">
          {lang === 'ar' ? 'خدمات غسيل وعناية متكاملة' : 'Pristine Car Wash & Care'}
        </h2>
        <p className="text-xs text-slate-300">
          {t.servicesSubtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        {detailedServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-4 rounded-2xl bg-[#091122] border border-blue-500/30 shadow-[0_0_20px_rgba(0,102,255,0.15)] relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.4)] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{service.title}</h3>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                      {service.tag}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {service.desc}
              </p>

              <div className="mt-3 pt-3 border-t border-blue-900/30 grid grid-cols-1 gap-1.5">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Booking Contact Bar */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#09152b] to-[#070e1c] border border-cyan-400/40 flex items-center justify-between gap-2">
        <div className="text-start">
          <div className="text-xs font-bold text-white">
            {lang === 'ar' ? 'جاهزون لخدمتك في أي وقت' : 'Ready to Serve You 24/7'}
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'ar' ? 'تفضل بزيارتنا أو تواصل فوراً' : 'Visit our branches or chat instantly'}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCallModal}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)] transition-all"
            title="Call"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenWhatsAppModal}
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
