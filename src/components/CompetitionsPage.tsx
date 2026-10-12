import { motion } from 'motion/react';
import { Trophy, Gift, Sparkles, ExternalLink, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';

interface CompetitionsPageProps {
  lang: Language;
  customData?: AppCustomization;
  onOpenWhatsAppModal?: () => void;
  onGoToPrices?: () => void;
}

export function CompetitionsPage({
  lang,
  customData,
  onOpenWhatsAppModal,
  onGoToPrices,
}: CompetitionsPageProps) {
  const t = translations[lang];
  const tiktokUrl = customData?.socials?.tiktokUrl || 'https://www.tiktok.com/@rm.star.carwash';

  const competitions = (customData?.competitions || []).filter((comp) => comp.active !== false);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-1 py-1" id="competitions-page">
      {/* Header Banner - Luxury RM.STAR Brand Colors */}
      <div className="relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 shadow-[0_0_20px_rgba(0,180,255,0.22)]">
        <div className="relative p-3.5 sm:p-4 rounded-[14px] bg-gradient-to-b from-[#0a1733] via-[#061024] to-[#030917] text-start border border-cyan-400/20">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/90 border border-cyan-400/40 text-[10px] font-bold text-cyan-300">
              <Trophy className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'سحوبات وجوائز حصرية' : 'Exclusive Draws & Prizes'}</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400 text-xs">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span className="text-[10px] font-bold text-slate-300">
                {lang === 'ar' ? 'فرعي الربوة والقرينية' : 'Rabwah & Khumrah'}
              </span>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white leading-snug">
            {lang === 'ar' ? 'مسابقات وجوائز RM.STAR 🏆' : 'RM.STAR Contests & Prizes 🏆'}
          </h2>
          <p className="text-xs text-cyan-200/80 leading-relaxed font-medium mt-1">
            {lang === 'ar'
              ? 'شارك في سحوباتنا الدورية واربح غسيل سيارات مجاني وجوائز قيمة لسيارتك!'
              : 'Participate in our regular draws to win free car washes & valuable prizes!'}
          </p>
        </div>
      </div>

      {/* Competitions List OR Empty State */}
      {competitions.length === 0 ? (
        /* Empty State: Sleek, luxury placeholder waiting for admin to add competitions */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-6 rounded-2xl bg-gradient-to-b from-[#0a1428] via-[#070e1c] to-[#040812] border border-cyan-500/25 text-center space-y-4 shadow-[0_0_20px_rgba(0,180,255,0.12)]"
        >
          {/* Glowing Trophy Graphic */}
          <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/25 via-cyan-400/15 to-transparent border border-cyan-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,210,255,0.2)]">
            <Trophy className="w-10 h-10 text-cyan-400 stroke-[1.8] animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
              <Gift className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'سحوبات قادمة قريباً' : 'Upcoming Draws Soon'}</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white">
              {lang === 'ar' ? 'لا توجد مسابقات نشطة حالياً' : 'No Active Contests Currently'}
            </h3>
            <p className="text-xs text-slate-300/80 leading-relaxed max-w-xs mx-auto">
              {lang === 'ar'
                ? 'ترقبوا قريباً سحوبات وجوائز كبرى لعملائنا في فرعي الربوة والقرينية. تابعوا حسابنا على تيك توك لتكونوا أول من يعلم ويشارك فور إطلاق المسابقة القادمة!'
                : 'Stay tuned for upcoming draws and prizes for our customers in Jeddah! Follow our TikTok account to be the first to participate.'}
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="space-y-2 pt-2">
            {/* Follow TikTok Button */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs transition-all shadow-[0_0_15px_rgba(0,210,255,0.35)] active:scale-95"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.86-4.47V8.62a8.27 8.27 0 0 0 4.74 1.48V6.69h-.82Z" />
              </svg>
              <span>{lang === 'ar' ? 'تابعنا على TikTok وكن أول الرابحين' : 'Follow on TikTok for Draws'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
            </a>

            {/* Inquire on WhatsApp */}
            {onOpenWhatsAppModal && (
              <button
                type="button"
                onClick={onOpenWhatsAppModal}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#061c16] border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-[#08261e] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'ar' ? 'استفسار عبر الواتساب' : 'Inquire via WhatsApp'}</span>
              </button>
            )}

            {/* Check Prices */}
            {onGoToPrices && (
              <button
                type="button"
                onClick={onGoToPrices}
                className="w-full text-center text-[11px] text-slate-400 hover:text-cyan-300 transition-colors pt-1"
              >
                {lang === 'ar' ? 'تصفّح قائمة أسعار وخدمات المغسلة ←' : 'Browse Services & Price List →'}
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        /* Render Active Competitions Added From Admin Panel */
        <div className="space-y-3">
          {competitions.map((comp) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#0a152d] to-[#050b18] border border-cyan-500/30 space-y-2.5 shadow-[0_0_15px_rgba(0,180,255,0.15)] text-start"
            >
              {/* Top row: badge + date */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-cyan-400/40 text-[10px] font-bold text-cyan-300">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {lang === 'ar' ? (comp.badgeAr || 'مسابقة نشطة') : (comp.badgeEn || 'Active Contest')}
                </span>
                {comp.endDate && (
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{comp.endDate}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-black text-white">
                {lang === 'ar' ? comp.titleAr : comp.titleEn}
              </h3>

              {/* Prize Box */}
              {(comp.prizeAr || comp.prizeEn) && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-950/50 border border-cyan-400/30 text-xs">
                  <Gift className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-cyan-300 font-bold block">
                      {lang === 'ar' ? 'الجائزة:' : 'Prize:'}
                    </span>
                    <span className="font-bold text-white">
                      {lang === 'ar' ? comp.prizeAr : comp.prizeEn}
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-slate-300/85 leading-relaxed font-medium">
                {lang === 'ar' ? comp.descAr : comp.descEn}
              </p>

              {/* Terms if present */}
              {(comp.termsAr || comp.termsEn) && (
                <div className="flex items-start gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{lang === 'ar' ? comp.termsAr : comp.termsEn}</span>
                </div>
              )}

              {/* Action / Participation Button */}
              {comp.linkUrl && (
                <a
                  href={comp.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-black text-xs hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_12px_rgba(0,180,255,0.3)] active:scale-95"
                >
                  <span>{lang === 'ar' ? 'شارك في المسابقة الآن' : 'Participate Now'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Transparency Guarantee Note */}
      <div className="p-3 rounded-xl bg-[#080d1a] border border-blue-900/30 text-[10px] sm:text-[11px] text-slate-400 flex items-start gap-2 text-start">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'ar'
            ? 'تخضع جميع سحوبات ومسابقات مغسلة آر إم ستار للمعايير الرسمية والشفافية التامة، ويتم إعلان الفائزين عبر منصاتنا الرسمية.'
            : 'All RM.STAR draws follow strict transparency standards. Winners are officially announced on our social platforms.'}
        </p>
      </div>
    </div>
  );
}
