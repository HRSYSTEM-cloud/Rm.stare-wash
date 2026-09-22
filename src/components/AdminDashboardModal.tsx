import React, { useState } from 'react';
import {
  X,
  Lock,
  Upload,
  Image as ImageIcon,
  Tag,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Eye,
  AlertCircle
} from 'lucide-react';
import { AppCustomization, AppOffer, DEFAULT_OFFERS, saveStoredCustomization } from '../data/customization';
import { Language } from '../data/translations';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentData: AppCustomization;
  onSave: (newData: AppCustomization) => void;
}

const ADMIN_PASSWORD = '0001000';

export function AdminDashboardModal({
  isOpen,
  onClose,
  lang,
  currentData,
  onSave,
}: AdminDashboardModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Form State
  const [logoUrl, setLogoUrl] = useState(currentData.logoUrl || '');
  const [offers, setOffers] = useState<AppOffer[]>(currentData.offers || DEFAULT_OFFERS);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'logo' | 'offers'>('logo');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert(lang === 'ar' ? 'حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 3 ميجابايت' : 'Image too large. Please select an image under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setLogoUrl(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = () => {
    const updated: AppCustomization = {
      ...currentData,
      logoUrl,
      offers,
    };
    saveStoredCustomization(updated);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handleResetToDefault = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من استعادة الشعار والعروض الافتراضية؟' : 'Reset logo and offers to default?')) {
      const resetData: AppCustomization = {
        logoUrl: '',
        offers: DEFAULT_OFFERS,
      };
      setLogoUrl('');
      setOffers(DEFAULT_OFFERS);
      saveStoredCustomization(resetData);
      onSave(resetData);
    }
  };

  const handleAddOffer = () => {
    const newOffer: AppOffer = {
      id: `offer-${Date.now()}`,
      titleAr: 'عرض جديد لمغسلة RM.STAR',
      titleEn: 'New Special Offer',
      descAr: 'اكتب وصف العرض هنا مع الشروط أو نسبة الخصم.',
      descEn: 'Write offer details and conditions here.',
      tagAr: 'عرض خاص',
      tagEn: 'Promo',
      active: true,
      code: 'STAR',
    };
    setOffers([newOffer, ...offers]);
  };

  const handleUpdateOffer = (id: string, field: keyof AppOffer, val: any) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, [field]: val } : off))
    );
  };

  const handleDeleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((off) => off.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg max-h-[90vh] flex flex-col bg-[#0b1220] border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,180,255,0.3)] overflow-hidden"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-900/40 bg-gradient-to-r from-blue-950/80 to-[#070d18]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'لوحة التحكم السرية' : 'Secret Control Panel'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-mono">
                  RM.STAR
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'تعديل الشعار والعروض الترويجية بدون تعديل كود' : 'Manage logo and promo offers'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Password Authentication Gate */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                {lang === 'ar' ? 'أدخل كلمة المرور للمتابعة' : 'Enter Admin Password'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ar' ? 'لوحة تحكم خاصة بإدارة مغسلة RM.STAR' : 'Authorized access only'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 max-w-xs mx-auto">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="•••••••"
                className="w-full text-center tracking-[0.35em] text-lg font-mono py-2.5 px-4 rounded-xl bg-black/60 border border-blue-500/40 text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
                autoFocus
              />

              {passwordError && (
                <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'كلمة المرور غير صحيحة!' : 'Incorrect password!'}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all"
              >
                {lang === 'ar' ? 'دخول لوحة التحكم' : 'Login'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-black/50 border border-blue-900/40">
              <button
                onClick={() => setActiveTab('logo')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'logo'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تعديل الشعار' : 'Logo Image'}</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'offers'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إدارة العروض' : 'Offers & Promos'}</span>
                <span className="w-5 h-5 rounded-full bg-blue-900/90 text-cyan-300 text-[10px] flex items-center justify-center">
                  {offers.length}
                </span>
              </button>
            </div>

            {/* TAB 1: LOGO EDITOR */}
            {activeTab === 'logo' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{lang === 'ar' ? 'معاينة الشعار الحالي' : 'Current Logo Preview'}</span>
                    </span>

                    {logoUrl && (
                      <button
                        onClick={() => setLogoUrl('')}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        {lang === 'ar' ? 'الرجوع للأصلي' : 'Revert to Original'}
                      </button>
                    )}
                  </div>

                  <div className="w-36 h-36 mx-auto rounded-2xl bg-black border border-cyan-400/50 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,180,255,0.25)]">
                    <img
                      src={logoUrl || '/logo.jpg'}
                      alt="RM.STAR Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Upload File button */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-medium text-slate-300">
                      {lang === 'ar' ? 'رفع صورة شعار من جهازك مباشرة:' : 'Upload image file from your device:'}
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-950/70 border border-dashed border-cyan-400/60 hover:border-cyan-300 text-cyan-300 text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'اختر صورة من الجوال أو الكمبيوتر' : 'Choose image file'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or Image URL */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-[11px] text-slate-400">
                      {lang === 'ar' ? 'أو ضع رابط صورة مباشر (URL):' : 'Or enter direct image URL:'}
                    </label>
                    <input
                      type="url"
                      value={logoUrl.startsWith('data:') ? '' : logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://.../my-logo.png"
                      className="w-full py-2 px-3 rounded-xl bg-black/60 border border-blue-900/50 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OFFERS MANAGER */}
            {activeTab === 'offers' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">
                    {lang === 'ar' ? 'العروض الترويجية النشطة بالموقع:' : 'Active website promotions:'}
                  </span>
                  <button
                    onClick={handleAddOffer}
                    className="flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة عرض جديد' : 'Add Offer'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {offers.map((offer, idx) => (
                    <div
                      key={offer.id}
                      className="p-3.5 rounded-2xl bg-black/50 border border-blue-900/50 space-y-2.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-950 text-cyan-300 text-[10px] font-bold flex items-center justify-center border border-blue-500/30">
                            {idx + 1}
                          </span>
                          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={offer.active}
                              onChange={(e) =>
                                handleUpdateOffer(offer.id, 'active', e.target.checked)
                              }
                              className="rounded accent-cyan-400"
                            />
                            <span>{lang === 'ar' ? 'تفعيل العرض' : 'Active'}</span>
                          </label>
                        </div>

                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Title Arabic & English */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">العنوان (عربي):</label>
                          <input
                            type="text"
                            value={offer.titleAr}
                            onChange={(e) =>
                              handleUpdateOffer(offer.id, 'titleAr', e.target.value)
                            }
                            className="w-full py-1.5 px-2.5 rounded-lg bg-black/70 border border-blue-900/60 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Title (English):</label>
                          <input
                            type="text"
                            value={offer.titleEn}
                            onChange={(e) =>
                              handleUpdateOffer(offer.id, 'titleEn', e.target.value)
                            }
                            className="w-full py-1.5 px-2.5 rounded-lg bg-black/70 border border-blue-900/60 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Description Arabic */}
                      <div>
                        <label className="text-[10px] text-slate-400">الوصف والشروط (عربي):</label>
                        <textarea
                          rows={2}
                          value={offer.descAr}
                          onChange={(e) =>
                            handleUpdateOffer(offer.id, 'descAr', e.target.value)
                          }
                          className="w-full py-1.5 px-2.5 rounded-lg bg-black/70 border border-blue-900/60 text-xs text-slate-200"
                        />
                      </div>

                      {/* Tag and Code */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">شارة العرض (مثل: خصم 20%):</label>
                          <input
                            type="text"
                            value={offer.tagAr}
                            onChange={(e) =>
                              handleUpdateOffer(offer.id, 'tagAr', e.target.value)
                            }
                            className="w-full py-1 px-2.5 rounded-lg bg-black/70 border border-blue-900/60 text-xs text-cyan-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">كود الخصم (اختياري):</label>
                          <input
                            type="text"
                            value={offer.code || ''}
                            onChange={(e) =>
                              handleUpdateOffer(offer.id, 'code', e.target.value)
                            }
                            placeholder="RMSTAR"
                            className="w-full py-1 px-2.5 rounded-lg bg-black/70 border border-blue-900/60 text-xs text-cyan-300 uppercase font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="px-5 py-3 border-t border-blue-900/40 bg-gradient-to-r from-[#080d19] to-[#0a1122] flex items-center justify-between gap-2">
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset'}</span>
            </button>

            <div className="flex items-center gap-2">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تم الحفظ فوراً!' : 'Saved!'}</span>
                </span>
              )}

              <button
                onClick={handleSaveAll}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-black text-xs shadow-[0_0_18px_rgba(0,210,255,0.4)] transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
