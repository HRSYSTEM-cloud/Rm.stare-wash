import React, { useState, useEffect } from 'react';
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
  Phone,
  MessageCircle,
  MapPin,
  Share2,
  Globe,
  Save,
  Star,
  Coins,
} from 'lucide-react';
import {
  AppCustomization,
  AppOffer,
  DEFAULT_OFFERS,
  DEFAULT_CONTACTS,
  DEFAULT_SOCIALS,
  DEFAULT_ELFSIGHT_WIDGET_ID,
  SocialMediaAccounts,
  saveCloudCustomization,
} from '../data/customization';
import { BranchPricing, DEFAULT_PRICING_DATA, PriceItem } from '../data/pricing';
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

  // Tab State
  const [activeTab, setActiveTab] = useState<'prices' | 'reviews' | 'socials' | 'contacts' | 'offers' | 'logo'>('prices');

  // Form States
  const [logoUrl, setLogoUrl] = useState(currentData.logoUrl || '');
  const [offers, setOffers] = useState<AppOffer[]>(currentData.offers || DEFAULT_OFFERS);

  // Contacts Form
  const [rabwahPhone, setRabwahPhone] = useState(currentData.contacts?.rabwahPhone || DEFAULT_CONTACTS.rabwahPhone);
  const [rabwahWhatsapp, setRabwahWhatsapp] = useState(currentData.contacts?.rabwahWhatsapp || DEFAULT_CONTACTS.rabwahWhatsapp);
  const [rabwahMaps, setRabwahMaps] = useState(currentData.contacts?.rabwahMaps || DEFAULT_CONTACTS.rabwahMaps);
  const [rabwahReviewUrl, setRabwahReviewUrl] = useState(currentData.contacts?.rabwahReviewUrl || DEFAULT_CONTACTS.rabwahReviewUrl || DEFAULT_CONTACTS.rabwahMaps);

  const [qurayniyyahPhone, setQurayniyyahPhone] = useState(currentData.contacts?.qurayniyyahPhone || DEFAULT_CONTACTS.qurayniyyahPhone);
  const [qurayniyyahWhatsapp, setQurayniyyahWhatsapp] = useState(currentData.contacts?.qurayniyyahWhatsapp || DEFAULT_CONTACTS.qurayniyyahWhatsapp);
  const [qurayniyyahMaps, setQurayniyyahMaps] = useState(currentData.contacts?.qurayniyyahMaps || DEFAULT_CONTACTS.qurayniyyahMaps);
  const [qurayniyyahReviewUrl, setQurayniyyahReviewUrl] = useState(currentData.contacts?.qurayniyyahReviewUrl || DEFAULT_CONTACTS.qurayniyyahReviewUrl || DEFAULT_CONTACTS.qurayniyyahMaps);

  // Pricing Form State (Rabwah & Qurayniyyah)
  const [pricingState, setPricingState] = useState<Record<string, BranchPricing>>(
    currentData.pricing || DEFAULT_PRICING_DATA
  );
  const [selectedPricingBranch, setSelectedPricingBranch] = useState<'al-rabwah' | 'al-qurayniyyah'>('al-rabwah');

  // Full Social Media Accounts Form
  const [socials, setSocials] = useState<SocialMediaAccounts>({
    tiktokUrl: currentData.socials?.tiktokUrl ?? DEFAULT_SOCIALS.tiktokUrl,
    snapchatUrl: currentData.socials?.snapchatUrl ?? '',
    instagramUrl: currentData.socials?.instagramUrl ?? '',
    xTwitterUrl: currentData.socials?.xTwitterUrl ?? '',
    youtubeUrl: currentData.socials?.youtubeUrl ?? '',
    facebookUrl: currentData.socials?.facebookUrl ?? '',
    telegramUrl: currentData.socials?.telegramUrl ?? '',
    allLinksUrl: currentData.socials?.allLinksUrl ?? '',
  });

  const [elfsightWidgetId, setElfsightWidgetId] = useState<string>(
    currentData.elfsightWidgetId !== undefined ? currentData.elfsightWidgetId : DEFAULT_ELFSIGHT_WIDGET_ID
  );

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize modal state with currentData whenever modal opens or currentData updates
  useEffect(() => {
    if (isOpen) {
      setLogoUrl(currentData.logoUrl || '');
      setOffers(currentData.offers || DEFAULT_OFFERS);
      setRabwahPhone(currentData.contacts?.rabwahPhone || DEFAULT_CONTACTS.rabwahPhone);
      setRabwahWhatsapp(currentData.contacts?.rabwahWhatsapp || DEFAULT_CONTACTS.rabwahWhatsapp);
      setRabwahMaps(currentData.contacts?.rabwahMaps || DEFAULT_CONTACTS.rabwahMaps);
      setRabwahReviewUrl(currentData.contacts?.rabwahReviewUrl || DEFAULT_CONTACTS.rabwahReviewUrl || DEFAULT_CONTACTS.rabwahMaps);
      setQurayniyyahPhone(currentData.contacts?.qurayniyyahPhone || DEFAULT_CONTACTS.qurayniyyahPhone);
      setQurayniyyahWhatsapp(currentData.contacts?.qurayniyyahWhatsapp || DEFAULT_CONTACTS.qurayniyyahWhatsapp);
      setQurayniyyahMaps(currentData.contacts?.qurayniyyahMaps || DEFAULT_CONTACTS.qurayniyyahMaps);
      setQurayniyyahReviewUrl(currentData.contacts?.qurayniyyahReviewUrl || DEFAULT_CONTACTS.qurayniyyahReviewUrl || DEFAULT_CONTACTS.qurayniyyahMaps);
      setPricingState(currentData.pricing || DEFAULT_PRICING_DATA);
      setElfsightWidgetId(currentData.elfsightWidgetId !== undefined ? currentData.elfsightWidgetId : DEFAULT_ELFSIGHT_WIDGET_ID);
      setSocials({
        tiktokUrl: currentData.socials?.tiktokUrl ?? DEFAULT_SOCIALS.tiktokUrl,
        snapchatUrl: currentData.socials?.snapchatUrl ?? '',
        instagramUrl: currentData.socials?.instagramUrl ?? '',
        xTwitterUrl: currentData.socials?.xTwitterUrl ?? '',
        youtubeUrl: currentData.socials?.youtubeUrl ?? '',
        facebookUrl: currentData.socials?.facebookUrl ?? '',
        telegramUrl: currentData.socials?.telegramUrl ?? '',
        allLinksUrl: currentData.socials?.allLinksUrl ?? '',
      });
    }
  }, [isOpen, currentData]);

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

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'ar' ? 'حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت' : 'Image too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      // Optimize & scale down if needed so it saves reliably in Firestore & localStorage
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          setLogoUrl(compressed);
        } else {
          setLogoUrl(src);
        }
      };
      img.onerror = () => {
        setLogoUrl(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleSocialChange = (field: keyof SocialMediaAccounts, val: string) => {
    setSocials((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  // Price Modification Handlers
  const handlePriceItemChange = (
    branchId: string,
    itemId: string,
    field: 'small' | 'medium' | 'large',
    val: string
  ) => {
    const numericVal = val === '' ? 0 : Number(val);
    setPricingState((prev) => {
      const branch = prev[branchId] || DEFAULT_PRICING_DATA[branchId];
      const updatedItems = branch.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            [field]: isNaN(numericVal) ? item[field] : numericVal,
          };
        }
        return item;
      });
      return {
        ...prev,
        [branchId]: {
          ...branch,
          items: updatedItems,
        },
      };
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    const updated: AppCustomization = {
      ...currentData,
      logoUrl,
      offers,
      contacts: {
        rabwahPhone,
        rabwahWhatsapp,
        rabwahMaps,
        rabwahReviewUrl,
        qurayniyyahPhone,
        qurayniyyahWhatsapp,
        qurayniyyahMaps,
        qurayniyyahReviewUrl,
      },
      socials,
      pricing: pricingState,
      elfsightWidgetId: elfsightWidgetId.trim(),
    };
    try {
      await saveCloudCustomization(updated);
      onSave(updated);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 2500);
    } catch (e) {
      alert(lang === 'ar' ? 'حدث خطأ أثناء الحفظ في السحاب' : 'Failed to save to cloud');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من استعادة الإعدادات والأسعار الافتراضية كاملة؟' : 'Reset all data and pricing to default?')) {
      const resetData: AppCustomization = {
        logoUrl: '',
        offers: DEFAULT_OFFERS,
        contacts: DEFAULT_CONTACTS,
        socials: DEFAULT_SOCIALS,
        pricing: DEFAULT_PRICING_DATA,
      };
      setLogoUrl('');
      setOffers(DEFAULT_OFFERS);
      setRabwahPhone(DEFAULT_CONTACTS.rabwahPhone);
      setRabwahWhatsapp(DEFAULT_CONTACTS.rabwahWhatsapp);
      setRabwahMaps(DEFAULT_CONTACTS.rabwahMaps);
      setRabwahReviewUrl(DEFAULT_CONTACTS.rabwahReviewUrl);
      setQurayniyyahPhone(DEFAULT_CONTACTS.qurayniyyahPhone);
      setQurayniyyahWhatsapp(DEFAULT_CONTACTS.qurayniyyahWhatsapp);
      setQurayniyyahMaps(DEFAULT_CONTACTS.qurayniyyahMaps);
      setQurayniyyahReviewUrl(DEFAULT_CONTACTS.qurayniyyahReviewUrl);
      setSocials(DEFAULT_SOCIALS);
      setPricingState(DEFAULT_PRICING_DATA);

      await saveCloudCustomization(resetData);
      onSave(resetData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  // Offer handlers
  const handleToggleOffer = (index: number) => {
    const next = [...offers];
    next[index].active = !next[index].active;
    setOffers(next);
  };

  const handleAddOffer = () => {
    const newOffer: AppOffer = {
      id: `offer-${Date.now()}`,
      titleAr: 'عرض جديد مميز',
      titleEn: 'New Special Offer',
      descAr: 'تفاصيل العرض الترويجي والخصم هنا...',
      descEn: 'Offer details and discount here...',
      tagAr: 'جديد',
      tagEn: 'New',
      active: true,
    };
    setOffers([newOffer, ...offers]);
  };

  const handleDeleteOffer = (index: number) => {
    setOffers(offers.filter((_, i) => i !== index));
  };

  const handleOfferChange = (index: number, field: keyof AppOffer, val: any) => {
    const next = [...offers];
    next[index] = { ...next[index], [field]: val };
    setOffers(next);
  };

  const currentBranchPricing = pricingState[selectedPricingBranch] || DEFAULT_PRICING_DATA[selectedPricingBranch];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-xl bg-[#070b16] border border-cyan-400/40 rounded-2xl shadow-[0_0_50px_rgba(0,180,255,0.25)] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#0a1226] via-[#0f1d3d] to-[#0a1226] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400/60 flex items-center justify-center text-cyan-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'لوحة تحكم الإدارة السحابية' : 'Cloud Admin Control'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  RM.STAR
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'تعديل الأسعار، روابط التقييم، أرقام الفروع، الحسابات والشعار' : 'Manage pricing, reviews, branches, socials & logo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {!isAuthenticated ? (
            /* PIN / Password Screen */
            <form onSubmit={handleLogin} className="space-y-4 py-6 text-center max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">
                  {lang === 'ar' ? 'منطقة المشرف المصرح له' : 'Admin Authorization'}
                </h4>
                <p className="text-xs text-slate-400">
                  {lang === 'ar' ? 'أدخل الرمز السري للدخول إلى الإعدادات' : 'Enter security code to access control panel'}
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="•••••••"
                  className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 rounded-xl bg-black border border-cyan-500/40 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-1.5 font-bold">
                    {lang === 'ar' ? 'الرمز السري غير صحيح، حاول مرة أخرى' : 'Invalid passcode, please retry'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all"
              >
                {lang === 'ar' ? 'دخول لوحة التحكم' : 'Unlock Dashboard'}
              </button>
            </form>
          ) : (
            /* Authenticated Admin Management Tabs */
            <div className="space-y-4">
              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-[#040711] rounded-xl border border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setActiveTab('prices')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'prices'
                      ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === 'ar' ? 'الأسعار' : 'Pricing'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'reviews'
                      ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>{lang === 'ar' ? 'تقييم قوقل' : 'Reviews'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('socials')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'socials'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'السوشل' : 'Socials'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('contacts')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'contacts'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'الفروع' : 'Branches'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('offers')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'offers'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'العروض' : 'Offers'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logo')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    activeTab === 'logo'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'الشعار' : 'Logo'}</span>
                </button>
              </div>

              {/* 1. PRICING EDITING TAB (تعديل الأسعار لكل فرع ولكل حجم سيارة) */}
              {activeTab === 'prices' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-[#091526] border border-emerald-500/40 space-y-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <div className="flex items-center justify-between pb-1.5 border-b border-emerald-500/20">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                        <Coins className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'ar' ? 'تعديل أسعار الغسيل المعتمدة (بالريال السعودي)' : 'Manage Branch Washing Prices'}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'اختر الفرع ثم عدّل أسعار باقات الغسيل والإضافات لجميع أحجام السيارات (صغير، وسط، كبير). يتم التحديث فوراً في الموقع.'
                        : 'Select the branch and adjust prices for Small, Medium, and Large vehicles.'}
                    </p>

                    {/* Branch Switcher for Pricing */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/60 rounded-xl border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setSelectedPricingBranch('al-rabwah')}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          selectedPricingBranch === 'al-rabwah'
                            ? 'bg-red-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span>{lang === 'ar' ? 'فرع الربوة' : 'Al Rabwah'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPricingBranch('al-qurayniyyah')}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          selectedPricingBranch === 'al-qurayniyyah'
                            ? 'bg-blue-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>{lang === 'ar' ? 'فرع القرينية' : 'Al Qurayniyyah'}</span>
                      </button>
                    </div>

                    {/* Pricing Items Form */}
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {currentBranchPricing.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-black/50 border border-slate-700/80 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs flex items-center gap-1.5">
                              <span>{item.nameAr}</span>
                              {item.isExtra && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                                  إضافة
                                </span>
                              )}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.nameEn}
                            </span>
                          </div>

                          {/* 3 Columns for Small, Medium, Large */}
                          <div className="grid grid-cols-3 gap-2">
                            {/* Small */}
                            <div>
                              <label className="block text-[10px] text-cyan-300 font-medium mb-1">
                                صغير (ر.س)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={item.small}
                                onChange={(e) =>
                                  handlePriceItemChange(
                                    selectedPricingBranch,
                                    item.id,
                                    'small',
                                    e.target.value
                                  )
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#070b16] border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none text-center font-bold"
                              />
                            </div>

                            {/* Medium */}
                            <div>
                              <label className="block text-[10px] text-blue-300 font-medium mb-1">
                                وسط (ر.س)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={item.medium}
                                onChange={(e) =>
                                  handlePriceItemChange(
                                    selectedPricingBranch,
                                    item.id,
                                    'medium',
                                    e.target.value
                                  )
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#070b16] border border-blue-500/30 text-white font-mono text-xs focus:border-blue-400 focus:outline-none text-center font-bold"
                              />
                            </div>

                            {/* Large */}
                            <div>
                              <label className="block text-[10px] text-amber-300 font-medium mb-1">
                                كبير / جيب (ر.س)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={item.large}
                                onChange={(e) =>
                                  handlePriceItemChange(
                                    selectedPricingBranch,
                                    item.id,
                                    'large',
                                    e.target.value
                                  )
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#070b16] border border-amber-500/30 text-white font-mono text-xs focus:border-amber-400 focus:outline-none text-center font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. GOOGLE REVIEWS TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-3.5 animate-fadeIn">
                  {/* Real Google Reviews Feed via Elfsight */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1830] to-[#070f1f] border border-cyan-500/40 space-y-3 shadow-[0_0_20px_rgba(0,210,255,0.15)]">
                    <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>{lang === 'ar' ? 'ربط تعليقات Google الحقيقية (Elfsight Widget)' : 'Real Google Reviews (Elfsight Widget)'}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        elfsightWidgetId
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {elfsightWidgetId ? (lang === 'ar' ? 'مربوط' : 'Connected') : (lang === 'ar' ? 'غير مضاف بعد' : 'Not Set')}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'بعد إنشاء حسابك في Elfsight واختيار Google Reviews Widget لمغسلتك، انسخ كود الـ Widget أو الـ ID وضعه في الخانة بالأسفل ليتم جلب تعليقات الزبائن الحقيقية من قوقل ماب مباشرة إلى الموقع.'
                        : 'After setting up Google Reviews widget on Elfsight for your car wash, paste the Widget ID or code below to load live customer reviews.'}
                    </p>

                    <div>
                      <label className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                        <span>{lang === 'ar' ? 'معرّف أو كود ويدجت Elfsight (Widget ID)' : 'Elfsight Widget ID or Code'}</span>
                        <span className="text-[10px] text-cyan-300 font-mono">مثال: elfsight-app-xxxxxx</span>
                      </label>
                      <input
                        type="text"
                        value={elfsightWidgetId}
                        onChange={(e) => setElfsightWidgetId(e.target.value)}
                        placeholder="e.g. 5b7d8123-xxxx-xxxx-xxxx-xxxxxxxxxxxx أو elfsight-app-xxxx"
                        className="w-full px-3 py-2 rounded-lg bg-[#070b16] border border-cyan-500/50 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {elfsightWidgetId && (
                      <button
                        type="button"
                        onClick={() => setElfsightWidgetId('')}
                        className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'مسح معرّف Elfsight' : 'Clear Elfsight Widget'}</span>
                      </button>
                    )}
                  </div>

                  {/* Direct Google Review URLs */}
                  <div className="p-3.5 rounded-xl bg-[#09152b] border border-amber-500/40 space-y-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-xs pb-1 border-b border-amber-500/20">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{lang === 'ar' ? 'روابط كتابة التقييم المباشر على خرائط Google' : 'Direct Review Shortlinks'}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'هذه الروابط تنقل العميل مباشرة لفتح نافذة النجوم وكتابة التقييم على قوقل ماب لكل فرع:'
                        : 'These links send users directly into the Google Maps review popup for each branch:'}
                    </p>

                    <div className="space-y-3 pt-1">
                      {/* Rabwah Review URL */}
                      <div className="p-2.5 rounded-lg bg-black/60 border border-red-500/30">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-red-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-red-400" />
                          <span>{lang === 'ar' ? 'رابط تقييم فرع الربوة على Google Maps' : 'Rabwah Google Review Link'}</span>
                        </label>
                        <input
                          type="text"
                          value={rabwahReviewUrl}
                          onChange={(e) => setRabwahReviewUrl(e.target.value)}
                          placeholder="https://g.page/r/.../review أو https://maps.google.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {lang === 'ar' ? 'هذا الرابط يفتح عند ضغط الزائر على زر "اكتب تقييمك - فرع الربوة"' : 'Opens when user clicks Rabwah review button'}
                        </span>
                      </div>

                      {/* Qurayniyyah Review URL */}
                      <div className="p-2.5 rounded-lg bg-black/60 border border-blue-500/30">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-blue-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          <span>{lang === 'ar' ? 'رابط تقييم فرع القرينية (الخمرة) على Google Maps' : 'Al Qurayniyyah Google Review Link'}</span>
                        </label>
                        <input
                          type="text"
                          value={qurayniyyahReviewUrl}
                          onChange={(e) => setQurayniyyahReviewUrl(e.target.value)}
                          placeholder="https://g.page/r/.../review أو https://maps.google.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {lang === 'ar' ? 'هذا الرابط يفتح عند ضغط الزائر على زر "اكتب تقييمك - فرع القرينية"' : 'Opens when user clicks Qurayniyyah review button'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. SOCIAL MEDIA ACCOUNTS TAB */}
              {activeTab === 'socials' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-[#091122] border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/20">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                        <Share2 className="w-4 h-4 text-cyan-400" />
                        <span>{lang === 'ar' ? 'روابط تطبيقات السوشل ميديا (أضف الرابط ويظهر تلقائياً)' : 'Social Media Accounts'}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'ملاحظة: أي تطبيق تضع رابطه هنا سيظهر مباشرة في صفحة الروابط، وإذا تركته فارغاً سيختفي تلقائياً.'
                        : 'Any platform with a link added here will automatically appear on the links page.'}
                    </p>

                    <div className="space-y-3">
                      {/* TikTok */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-cyan-300 mb-1">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>TikTok (تيك توك الرسمي)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.tiktokUrl || ''}
                          onChange={(e) => handleSocialChange('tiktokUrl', e.target.value)}
                          placeholder="https://www.tiktok.com/@rm.star.carwash"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      {/* Snapchat */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-yellow-300 mb-1">
                          <span className="w-2 h-2 rounded-full bg-yellow-400" />
                          <span>Snapchat (سناب شات)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.snapchatUrl || ''}
                          onChange={(e) => handleSocialChange('snapchatUrl', e.target.value)}
                          placeholder="https://www.snapchat.com/add/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      {/* Instagram */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-pink-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-pink-400" />
                          <span>Instagram (انستغرام)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.instagramUrl || ''}
                          onChange={(e) => handleSocialChange('instagramUrl', e.target.value)}
                          placeholder="https://www.instagram.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-pink-400 focus:outline-none"
                        />
                      </div>

                      {/* X (Twitter) */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-slate-200 mb-1">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span>منصة إكس / تويتر — X (Twitter)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.xTwitterUrl || ''}
                          onChange={(e) => handleSocialChange('xTwitterUrl', e.target.value)}
                          placeholder="https://x.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      {/* YouTube */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-red-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-red-400" />
                          <span>YouTube (يوتيوب)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.youtubeUrl || ''}
                          onChange={(e) => handleSocialChange('youtubeUrl', e.target.value)}
                          placeholder="https://www.youtube.com/@..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-red-400 focus:outline-none"
                        />
                      </div>

                      {/* Facebook */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-blue-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Facebook (فيسبوك)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.facebookUrl || ''}
                          onChange={(e) => handleSocialChange('facebookUrl', e.target.value)}
                          placeholder="https://www.facebook.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      {/* Telegram */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-sky-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-sky-400" />
                          <span>Telegram (قناة التليجرام)</span>
                        </label>
                        <input
                          type="text"
                          value={socials.telegramUrl || ''}
                          onChange={(e) => handleSocialChange('telegramUrl', e.target.value)}
                          placeholder="https://t.me/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-sky-400 focus:outline-none"
                        />
                      </div>

                      {/* LinkTree or Master Link */}
                      <div className="p-2.5 rounded-lg bg-black/50 border border-slate-700/80">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 mb-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>LinkTree أو صفحة الروابط الخارجية</span>
                        </label>
                        <input
                          type="text"
                          value={socials.allLinksUrl || ''}
                          onChange={(e) => handleSocialChange('allLinksUrl', e.target.value)}
                          placeholder="https://linktr.ee/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-slate-700 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. CONTACTS & BRANCHES TAB */}
              {activeTab === 'contacts' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Branch 1: Rabwah */}
                  <div className="p-3.5 rounded-xl bg-[#091122] border border-red-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs pb-1 border-b border-red-500/20">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>{lang === 'ar' ? 'فرع الربوة (طريق الملك فهد / الستين)' : 'Al Rabwah Branch Settings'}</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رقم الاتصال المباشر (Phone)' : 'Call Phone Number'}
                        </label>
                        <input
                          type="text"
                          value={rabwahPhone}
                          onChange={(e) => setRabwahPhone(e.target.value)}
                          placeholder="0563364380"
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رقم الواتساب بالصيغة الدولية (WhatsApp)' : 'WhatsApp Number (with country code)'}
                        </label>
                        <input
                          type="text"
                          value={rabwahWhatsapp}
                          onChange={(e) => setRabwahWhatsapp(e.target.value)}
                          placeholder="966563364380"
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رابط خرائط جوجل وموقع الفرع (Google Maps)' : 'Google Maps Location URL'}
                        </label>
                        <input
                          type="text"
                          value={rabwahMaps}
                          onChange={(e) => setRabwahMaps(e.target.value)}
                          placeholder="https://maps.google.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Branch 2: Qurayniyyah */}
                  <div className="p-3.5 rounded-xl bg-[#091122] border border-blue-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs pb-1 border-b border-blue-500/20">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>{lang === 'ar' ? 'فرع القرينية (الخمرة)' : 'Al Qurayniyyah Branch Settings'}</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رقم الاتصال المباشر (Phone)' : 'Call Phone Number'}
                        </label>
                        <input
                          type="text"
                          value={qurayniyyahPhone}
                          onChange={(e) => setQurayniyyahPhone(e.target.value)}
                          placeholder="0548589875"
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رقم الواتساب بالصيغة الدولية (WhatsApp)' : 'WhatsApp Number (with country code)'}
                        </label>
                        <input
                          type="text"
                          value={qurayniyyahWhatsapp}
                          onChange={(e) => setQurayniyyahWhatsapp(e.target.value)}
                          placeholder="966548589875"
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-300 mb-1">
                          {lang === 'ar' ? 'رابط خرائط جوجل وموقع الفرع (Google Maps)' : 'Google Maps Location URL'}
                        </label>
                        <input
                          type="text"
                          value={qurayniyyahMaps}
                          onChange={(e) => setQurayniyyahMaps(e.target.value)}
                          placeholder="https://maps.google.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. OFFERS TAB */}
              {activeTab === 'offers' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">
                      {lang === 'ar' ? 'إدارة العروض الترويجية الحالية' : 'Manage Promotional Offers'}
                    </span>
                    <button
                      type="button"
                      onClick={handleAddOffer}
                      className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة عرض جديد' : 'Add Offer'}</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {offers.map((offer, idx) => (
                      <div
                        key={offer.id}
                        className={`p-3 rounded-xl border transition-all ${
                          offer.active
                            ? 'bg-[#09152b] border-cyan-400/40 shadow-sm'
                            : 'bg-black/40 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <button
                            type="button"
                            onClick={() => handleToggleOffer(idx)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              offer.active
                                ? 'bg-emerald-950 border border-emerald-400 text-emerald-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {offer.active
                              ? lang === 'ar' ? 'نشط ويظهر للزوار' : 'Active'
                              : lang === 'ar' ? 'معطل ومخفي' : 'Inactive'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOffer(idx)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-0.5">العنوان بالعربية</label>
                              <input
                                type="text"
                                value={offer.titleAr}
                                onChange={(e) => handleOfferChange(idx, 'titleAr', e.target.value)}
                                className="w-full px-2 py-1 rounded bg-black/60 border border-slate-700 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-0.5">شارة العرض (Tag)</label>
                              <input
                                type="text"
                                value={offer.tagAr}
                                onChange={(e) => handleOfferChange(idx, 'tagAr', e.target.value)}
                                className="w-full px-2 py-1 rounded bg-black/60 border border-slate-700 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">تفاصيل العرض</label>
                            <textarea
                              rows={2}
                              value={offer.descAr}
                              onChange={(e) => handleOfferChange(idx, 'descAr', e.target.value)}
                              className="w-full px-2 py-1 rounded bg-black/60 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. LOGO TAB */}
              {activeTab === 'logo' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-[#091122] border border-cyan-400/30 text-center space-y-3">
                    <span className="text-xs text-slate-300 font-bold block">
                      {lang === 'ar' ? 'معاينة الشعار المعتمد الحالي' : 'Current Active Logo Preview'}
                    </span>
                    <div className="w-36 h-36 mx-auto rounded-xl overflow-hidden bg-black border border-cyan-400/50 p-2 flex items-center justify-center shadow-lg">
                      <img
                        src={logoUrl || '/logo.jpg'}
                        alt="RM.STAR Logo Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/logo.jpg';
                        }}
                      />
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-2">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
                          <Upload className="w-4 h-4" />
                          <span>{lang === 'ar' ? 'رفع صورة شعار جديدة' : 'Upload New Logo File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageFileUpload}
                          />
                        </label>
                        {logoUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoUrl('')}
                            className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                            title={lang === 'ar' ? 'الرجوع للشعار الأصلي' : 'Revert to Original Logo'}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{lang === 'ar' ? 'استعادة الشعار الأصلي' : 'Original Logo'}</span>
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lang === 'ar' ? 'يدعم PNG و JPG (يُفضل خلفية سوداء أو شفافة) - ويتم حفظه دائماً سحابياً' : 'Supports PNG & JPG (Recommended dark/transparent) - Cloud synced'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Bar */}
              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="استعادة الافتراضي"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {savedSuccess && (
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 animate-fadeIn">
                      <Check className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تم الحفظ والمزامنة سحابياً بنجاح!' : 'Saved & Synced!'}</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl font-black text-black bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-500 hover:from-emerald-300 hover:to-blue-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? (lang === 'ar' ? 'جارِ الحفظ...' : 'Saving...') : (lang === 'ar' ? 'حفظ التعديلات سحابياً' : 'Save Changes')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
