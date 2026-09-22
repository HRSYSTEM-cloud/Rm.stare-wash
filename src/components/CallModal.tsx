import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Clock } from 'lucide-react';
import { BRANCHES } from '../data/branches';
import { Language, translations } from '../data/translations';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function CallModal({ isOpen, onClose, lang }: CallModalProps) {
  const t = translations[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#0a101f] border border-cyan-400/40 p-5 shadow-[0_0_40px_rgba(0,120,255,0.4)] text-start space-y-4 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950 text-cyan-300 border border-blue-500/30 text-xs font-bold mb-1">
                <Phone className="w-3 h-3" />
                <span>{lang === 'ar' ? 'اتصال فوري ومباشر' : 'Direct Call'}</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {t.modalCallTitle}
              </h3>
              <p className="text-xs text-slate-300">
                {t.modalCallSubtitle}
              </p>
            </div>

            {/* Branch Calling Cards */}
            <div className="space-y-3">
              {BRANCHES.map((branch) => {
                const isRabwah = branch.id === 'al-rabwah';
                const branchName = lang === 'ar'
                  ? branch.name
                  : isRabwah
                    ? 'Al Rabwah Branch'
                    : 'Al Qurayniyyah Branch';

                const branchDist = lang === 'ar'
                  ? branch.district
                  : isRabwah
                    ? 'Al Rabwah Dist.'
                    : 'Al Qurayniyyah Dist.';

                return (
                  <div
                    key={branch.id}
                    className="p-3 rounded-xl bg-[#0e162b] border border-blue-500/30 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${branch.badgeColor}`}>
                          {lang === 'ar' ? branch.badgeLabel : (isRabwah ? '🔴 Al Rabwah' : '🔵 Al Qurayniyyah')}
                        </span>
                        <span className="text-xs text-white font-bold">{branchName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>24/7</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                      <span className="text-xs font-mono text-cyan-300 font-bold" dir="ltr">
                        {branch.displayPhone}
                      </span>
                      <a
                        href={`tel:${branch.phone}`}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-[0_0_12px_rgba(0,140,255,0.4)] ${
                          isRabwah
                            ? 'bg-red-600 hover:bg-red-500'
                            : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{t.callBranch}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
