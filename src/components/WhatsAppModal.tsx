import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Check } from 'lucide-react';
import { BRANCHES } from '../data/branches';
import { Language, translations } from '../data/translations';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function WhatsAppModal({ isOpen, onClose, lang }: WhatsAppModalProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('al-rabwah');
  const t = translations[lang];

  const quickMessages = lang === 'ar'
    ? [
        'السلام عليكم، حاب استفسر عن خدمات الغسيل والتلميع المتوفرة لديكم',
        'السلام عليكم، هل يوجد زحام حالياً في الفرع؟',
        'السلام عليكم، أرغب بمعرفة أسعار الغسيل الساطع والتلميع',
        'السلام عليكم، أود حجز موعد تلميع احترافي لسيارتي',
      ]
    : [
        'Hello, I would like to inquire about your washing & detailing services',
        'Hello, is the branch currently busy?',
        'Hello, could you share the pricing for snow wash and polishing?',
        'Hello, I would like to book a professional detailing appointment',
      ];

  const [selectedMessage, setSelectedMessage] = useState<string>(quickMessages[0]);
  const [customMessage, setCustomMessage] = useState<string>('');

  const activeBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  const handleSendWhatsApp = () => {
    const textToSend = customMessage.trim() || selectedMessage;
    const url = `https://wa.me/${activeBranch.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    onClose();
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
            className="relative w-full max-w-sm rounded-2xl bg-[#0a101f] border border-emerald-500/40 p-5 shadow-[0_0_40px_rgba(16,185,129,0.3)] text-start space-y-4 z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-1">
                <MessageCircle className="w-3 h-3" />
                <span>{t.modalWhatsAppTitle}</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'اختر الفرع للتواصل السريع' : 'Choose Branch to Chat'}
              </h3>
              <p className="text-xs text-slate-300">
                {t.modalWhatsAppSubtitle}
              </p>
            </div>

            {/* Branch Selector Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {BRANCHES.map((b) => {
                const isSelected = selectedBranchId === b.id;
                const isRabwah = b.id === 'al-rabwah';
                const label = lang === 'ar' ? b.badgeLabel : (isRabwah ? '🔴 Al Rabwah' : '🔵 Al Qurayniyyah');
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      isSelected
                        ? isRabwah
                          ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                          : 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]'
                        : 'bg-[#0e162b] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                      {lang === 'ar' ? b.district : (isRabwah ? 'Al Rabwah Dist.' : 'Al Qurayniyyah Dist.')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Messages */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'ar' ? 'رسائل سريعة جاهزة:' : 'Quick Messages:'}
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMessage(msg);
                      setCustomMessage('');
                    }}
                    className={`w-full text-start p-2 rounded-lg text-xs leading-relaxed transition-all border ${
                      selectedMessage === msg && !customMessage
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                        : 'bg-[#0e162b] border-white/5 text-slate-300 hover:bg-[#121c36]'
                    }`}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">
                {t.customMessagePlaceholder}
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'اكتب رسالتك الخاصة هنا...' : 'Type your custom inquiry here...'}
                rows={2}
                className="w-full bg-[#080d1a] border border-blue-500/30 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendWhatsAppBtn}</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
