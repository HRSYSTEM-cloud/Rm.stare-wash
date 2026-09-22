import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Check } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches } from '../data/branches';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  customData?: AppCustomization;
}

export function WhatsAppModal({ isOpen, onClose, lang, customData }: WhatsAppModalProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('al-rabwah');
  const t = translations[lang];

  const dynamicBranches = getDynamicBranches(customData);

  const quickMessages = lang === 'ar'
    ? [
        'السلام عليكم، حاب استفسر عن خدمات الغسيل المتوفرة لديكم',
        'السلام عليكم، هل يوجد زحام حالياً في الفرع؟',
        'السلام عليكم، أرغب بمعرفة أسعار الغسيل الداخلي والخارجي والبستم',
        'السلام عليكم، هل الفرع مفتوح ومتاح لخدمتي الآن؟',
      ]
    : [
        'Hello, I would like to inquire about your washing services',
        'Hello, is the branch currently busy?',
        'Hello, could you share the pricing for interior, exterior & undercarriage wash?',
        'Hello, are you open and available right now?',
      ];

  const [selectedMessage, setSelectedMessage] = useState<string>(quickMessages[0]);
  const [customMessage, setCustomMessage] = useState<string>('');

  const activeBranch = dynamicBranches.find((b) => b.id === selectedBranchId) || dynamicBranches[0];

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
                <span>{lang === 'ar' ? 'محادثة فورية' : 'Live Chat'}</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {t.modalWhatsAppTitle}
              </h3>
              <p className="text-xs text-slate-300">
                {t.modalWhatsAppSubtitle}
              </p>
            </div>

            {/* Branch Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'ar' ? 'اختر الفرع للتواصل معه:' : 'Select Target Branch:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dynamicBranches.map((branch) => {
                  const isSelected = selectedBranchId === branch.id;
                  const isRabwah = branch.id === 'al-rabwah';
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`p-2.5 rounded-xl border text-start transition-all flex flex-col justify-between ${
                        isSelected
                          ? isRabwah
                            ? 'bg-red-950/70 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                            : 'bg-blue-950/70 border-blue-500 shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                          : 'bg-black/40 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">
                        {lang === 'ar'
                          ? branch.name
                          : isRabwah
                            ? 'Al Rabwah'
                            : 'Al Qurayniyyah'}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                        <span>{branch.displayPhone}</span>
                        {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Messages */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'ar' ? 'اختر رسالة جاهزة سريعة:' : 'Select Quick Message:'}
              </label>
              <div className="space-y-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedMessage(msg);
                      setCustomMessage('');
                    }}
                    className={`w-full p-2 rounded-lg text-start text-xs border transition-all ${
                      selectedMessage === msg && !customMessage
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                        : 'bg-black/30 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'ar' ? 'أو اكتب رسالتك الخاصة:' : 'Or Type Custom Message:'}
              </label>
              <textarea
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'ar' ? 'فتح المحادثة في واتساب' : 'Open in WhatsApp'}</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
