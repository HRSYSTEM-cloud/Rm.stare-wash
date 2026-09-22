import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Clock } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  customData?: AppCustomization;
}

export function CallModal({ isOpen, onClose, lang, customData }: CallModalProps) {
  const t = translations[lang];
  const dynamicBranches = getDynamicBranches(customData);

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
              {dynamicBranches.map((branch) => {
                const isRabwah = branch.id === 'al-rabwah';
                return (
                  <a
                    key={branch.id}
                    href={`tel:${branch.phone}`}
                    className={`block p-3.5 rounded-xl border transition-all ${
                      isRabwah
                        ? 'bg-[#150d18] border-red-500/40 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                        : 'bg-[#0d1627] border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                            isRabwah ? 'bg-red-600/80' : 'bg-blue-600/80'
                          }`}
                        >
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {lang === 'ar'
                              ? branch.name
                              : isRabwah
                                ? 'Al Rabwah Branch'
                                : 'Al Qurayniyyah Branch'}
                          </div>
                          <div className="text-xs font-mono text-cyan-300 tracking-wide font-bold">
                            {branch.displayPhone}
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-cyan-400 text-black shadow-[0_0_10px_#00e5ff]">
                        {lang === 'ar' ? 'اتصال 📞' : 'Call 📞'}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {branch.district}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {lang === 'ar' ? '24 ساعة' : '24/7'}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
