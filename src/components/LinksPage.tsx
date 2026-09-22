import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Copy, Check, Share2, Sparkles, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRANCHES, SOCIAL_LINKS } from '../data/branches';

export function LinksPage() {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://rmstar.sa';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RM.STAR | STAR CAR WASH',
          text: 'مغسلة آر إم ستار للسيارات في جدة — خدمة 24 ساعة (فرع الربوة وفرع القرينية)',
          url: currentUrl,
        });
      } catch {
        // dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-4 pt-1 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-bold">
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>🔗 جميع حساباتنا وروابطنا</span>
        </div>
        <h2 className="text-xl font-black text-white">
          RM.STAR Official Links
        </h2>
        <p className="text-xs text-slate-300">
          تواصل معنا أو تابع جديدنا على منصات التواصل
        </p>
      </div>

      {/* Links List */}
      <div className="space-y-2.5">
        {/* TikTok Official */}
        <a
          href="https://www.tiktok.com/@rm.star.carwash"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#070c18] via-[#09152b] to-[#070c18] border border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,180,255,0.25)] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-cyan-400/50 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.86-4.47V8.62a8.27 8.27 0 0 0 4.74 1.48V6.69h-.82Z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>حساب TikTok الرسمي</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  @rm.star.carwash
                </span>
              </div>
              <p className="text-xs text-slate-300">
                شاهد أعمال التلميع والغسيل الاحترافي
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-[-2px] transition-transform" />
        </a>

        {/* WhatsApp Rabwah */}
        <a
          href="https://wa.me/966563364380?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D8%B1%D8%A8%D9%88%D8%A9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 rounded-xl bg-[#091222] hover:bg-[#0d1a33] border border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">واتساب فرع الربوة — جدة</div>
              <div className="text-xs text-emerald-300 font-mono">056 336 4380</div>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400">محادثة ↗</span>
        </a>

        {/* WhatsApp Qurayniyyah */}
        <a
          href="https://wa.me/966548589875?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D9%82%D8%B1%D9%8A%D9%86%D9%8A%D8%A9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 rounded-xl bg-[#091222] hover:bg-[#0d1a33] border border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">واتساب فرع القرينية — جدة</div>
              <div className="text-xs text-emerald-300 font-mono">054 858 9875</div>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400">محادثة ↗</span>
        </a>

        {/* Google Maps Rabwah */}
        <a
          href={BRANCHES[0].googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-[#080d19] hover:bg-[#0c1424] border border-blue-500/30 text-white transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-300 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-white">موقع فرع الربوة على خرائط Google</div>
              <div className="text-[11px] text-slate-300">تقاطع الستين مع يحيى المعلمي</div>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>

        {/* Google Maps Qurayniyyah */}
        <a
          href={BRANCHES[1].googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-[#080d19] hover:bg-[#0c1424] border border-blue-500/30 text-white transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-cyan-300 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-white">موقع فرع القرينية على خرائط Google</div>
              <div className="text-[11px] text-slate-300">شارع الشريف بركات ابن محمد</div>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>

      {/* Share / Copy Action Bar */}
      <div className="pt-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,180,255,0.4)] transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم نسخ الرابط!' : 'نسخ رابط بطاقة RM.STAR'}</span>
        </button>

        <button
          onClick={handleShare}
          className="px-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#0a1122] border border-cyan-400/40 text-cyan-300 font-bold text-xs hover:bg-[#0e1830] transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة</span>
        </button>
      </div>
    </div>
  );
}
