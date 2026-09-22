import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BranchInfo } from '../types';
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Clock,
  Copy,
  Check,
  Navigation,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Language, translations } from '../data/translations';

interface BranchCardProps {
  branch: BranchInfo;
  isHighlighted?: boolean;
  lang: Language;
}

export function BranchCard({ branch, isHighlighted, lang }: BranchCardProps) {
  const [copied, setCopied] = useState(false);
  const [showMapEmbed, setShowMapEmbed] = useState(false);
  const t = translations[lang];

  const handleCopyAddress = () => {
    const fullText = `${branch.name}\n${branch.streetAddress}، ${branch.postalCode}\nPhone: ${branch.displayPhone}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isRabwah = branch.id === 'al-rabwah';

  const branchTitle = lang === 'ar'
    ? branch.name
    : isRabwah
      ? 'Al Rabwah Branch — Jeddah'
      : 'Al Qurayniyyah Branch — Jeddah';

  const branchAddress = lang === 'ar'
    ? branch.streetAddress
    : isRabwah
      ? 'King Fahd Rd. (60th) x Yahya Al-Moalimi St., Al Rabwah'
      : 'Al Sharif Barakat Ibn Mohammad St., Al Qurayniyyah';

  const branchNotes = lang === 'ar'
    ? branch.notes
    : isRabwah
      ? 'Prime location, easy access, 24-hour express wash and polish.'
      : 'Modern quick-wash equipment, 24/7 continuous operation.';

  return (
    <motion.article
      id={`branch-card-${branch.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full rounded-2xl relative overflow-hidden transition-all duration-300 ${
        isHighlighted
          ? 'ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]'
          : 'shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Ambient Border Gradient */}
      <div
        className={`absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-b ${
          isRabwah
            ? 'from-red-500/60 via-blue-600/40 to-blue-950/40'
            : 'from-cyan-400/70 via-blue-600/50 to-blue-950/40'
        } pointer-events-none`}
      />

      <div className="relative bg-[#0a0f1d] rounded-2xl p-4 sm:p-5 border border-white/5 space-y-4">
        {/* Header with Badge & 24h status */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${branch.badgeColor}`}
            >
              {lang === 'ar' ? branch.badgeLabel : (isRabwah ? '🔴 Al Rabwah Branch' : '🔵 Al Qurayniyyah Branch')}
            </span>
            <span className="text-xs text-slate-400">
              {lang === 'ar' ? branch.district : (isRabwah ? 'Al Rabwah Dist.' : 'Al Qurayniyyah Dist.')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.open24HoursBadge}</span>
          </div>
        </div>

        {/* Branch Title & Notes */}
        <div>
          <h3 className="text-lg font-black text-white">{branchTitle}</h3>
          <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
            {branchNotes}
          </p>
        </div>

        {/* Address Card */}
        <div className="bg-[#0e162b] rounded-xl p-3 border border-blue-500/20 space-y-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-start">
              <div className="text-xs font-bold text-slate-200">
                {branchAddress}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'ar' ? 'جدة' : 'Jeddah'} &bull; {branch.postalCode}
              </div>
            </div>
          </div>

          {/* Quick Copy Address Button */}
          <button
            onClick={handleCopyAddress}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 text-blue-200 hover:text-white text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{t.copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyAddress}</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons: Google Maps (Primary) + Call + WhatsApp */}
        <div className="space-y-2 pt-1">
          {/* Main Google Maps Navigation Button */}
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full relative group overflow-hidden rounded-xl p-[1px] flex items-center justify-center focus:outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-xl opacity-90 group-hover:opacity-100 blur-[1px] transition-opacity" />
            <div className="relative w-full py-3 px-4 bg-gradient-to-r from-[#071328] via-[#0b1c38] to-[#071328] rounded-[11px] border border-cyan-400/50 flex items-center justify-center gap-2 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,180,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] transition-all">
              <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{t.openInGoogleMaps}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-300 opacity-80" />
            </div>
          </a>

          {/* Secondary Actions: Call & WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${branch.phone}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.callBranch} ({branch.displayPhone})</span>
            </a>

            <a
              href={`https://wa.me/${branch.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.whatsappBranch}</span>
            </a>
          </div>
        </div>

        {/* Collapsible Interactive Map Embed Preview */}
        <div className="pt-1">
          <button
            onClick={() => setShowMapEmbed(!showMapEmbed)}
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-[#070d1a] border border-blue-500/20 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'معاينة خريطة الفرع' : 'Preview Map'}</span>
            </span>
            {showMapEmbed ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <AnimatePresence>
            {showMapEmbed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2 rounded-xl border border-blue-500/30"
              >
                <div className="aspect-[16/9] w-full bg-[#050a14] relative">
                  <iframe
                    title={`Google Map - ${branch.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      branch.embedMapQuery
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 rounded-xl grayscale-[20%] contrast-[110%]"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
