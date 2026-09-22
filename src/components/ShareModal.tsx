import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, QrCode } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function ShareModal({ isOpen, onClose, lang }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RM.STAR Car Wash Jeddah',
          text: lang === 'ar' ? 'مغسلة سيارات متكاملة 24 ساعة في جدة (فرع الربوة وفرع القرينية)' : '24/7 Car Wash in Jeddah (Al Rabwah & Al Qurayniyyah)',
          url: window.location.href,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#0a101f] border border-cyan-400/40 p-5 shadow-[0_0_40px_rgba(0,180,255,0.4)] text-center space-y-4 z-10"
          >
            <button
              onClick={onClose}
              className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-300 mb-2">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">
                {t.shareApp}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {lang === 'ar' ? 'شارك موقع وأرقام مغسلة RM.STAR مع أصحابك' : 'Share RM.STAR Jeddah locations and contacts with friends'}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,180,255,0.4)]"
              >
                <Share2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'مشاركة عبر الجوال' : 'Share via Phone'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0e162b] hover:bg-[#131e3a] border border-blue-500/30 text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">{t.copiedLink}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'ar' ? 'نسخ الرابط' : 'Copy Link'}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
