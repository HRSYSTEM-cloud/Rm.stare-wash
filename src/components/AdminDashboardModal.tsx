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
  Trophy,
  Gift,
  Wallet,
  Camera,
  Wind,
  Video,
  Sliders,
  ExternalLink,
  QrCode,
  Layers,
  FlaskConical,
  Package,
} from 'lucide-react';
import {
  AppCustomization,
  AppOffer,
  AppCompetition,
  FreeServiceItem,
  LoyaltyCardConfig,
  GalleryMediaItem,
  DEFAULT_OFFERS,
  DEFAULT_CONTACTS,
  DEFAULT_SOCIALS,
  DEFAULT_ELFSIGHT_WIDGET_ID,
  DEFAULT_RABWAH_ELFSIGHT_ID,
  DEFAULT_QURAYNIYYAH_ELFSIGHT_ID,
  DEFAULT_WELCOME_TITLE_AR,
  DEFAULT_WELCOME_TITLE_EN,
  DEFAULT_WELCOME_TEXT_AR,
  DEFAULT_WELCOME_TEXT_EN,
  DEFAULT_LOYALTY_CARD,
  DEFAULT_FREE_SERVICES,
  DEFAULT_GALLERY_ITEMS,
  SocialMediaAccounts,
  saveCloudCustomization,
  sanitizeElfsightId,
  isValidElfsightId,
} from '../data/customization';
import { GoogleReviewItem, VERIFIED_GOOGLE_REVIEWS } from '../data/reviews';
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
  const [activeTab, setActiveTab] = useState<
    | 'prices'
    | 'loyalty'
    | 'freeServices'
    | 'gallery'
    | 'reviews'
    | 'competitions'
    | 'socials'
    | 'contacts'
    | 'offers'
    | 'logo'
  >('prices');

  // Form States
  const [logoUrl, setLogoUrl] = useState(currentData.logoUrl || '');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    currentData.backgroundImageUrl || ''
  );
  const [backgroundOverlayOpacity, setBackgroundOverlayOpacity] = useState<number>(
    currentData.backgroundOverlayOpacity !== undefined
      ? currentData.backgroundOverlayOpacity
      : 85
  );

  const [offers, setOffers] = useState<AppOffer[]>(currentData.offers || DEFAULT_OFFERS);
  const [competitions, setCompetitions] = useState<AppCompetition[]>(
    currentData.competitions || []
  );
  const [showCompetitionsTab, setShowCompetitionsTab] = useState<boolean>(
    currentData.showCompetitionsTab !== undefined ? currentData.showCompetitionsTab : true
  );

  // Loyalty Card State
  const [loyaltyCard, setLoyaltyCard] = useState<LoyaltyCardConfig>(
    currentData.loyaltyCard
      ? { ...DEFAULT_LOYALTY_CARD, ...currentData.loyaltyCard }
      : DEFAULT_LOYALTY_CARD
  );

  // Free Services State
  const [freeServices, setFreeServices] = useState<FreeServiceItem[]>(
    currentData.freeServices || DEFAULT_FREE_SERVICES
  );

  // Gallery State
  const [showGalleryTab, setShowGalleryTab] = useState<boolean>(
    currentData.showGalleryTab !== undefined ? currentData.showGalleryTab : true
  );
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(
    currentData.galleryItems || DEFAULT_GALLERY_ITEMS
  );

  // Contacts Form
  const [rabwahPhone, setRabwahPhone] = useState(
    currentData.contacts?.rabwahPhone || DEFAULT_CONTACTS.rabwahPhone
  );
  const [rabwahWhatsapp, setRabwahWhatsapp] = useState(
    currentData.contacts?.rabwahWhatsapp || DEFAULT_CONTACTS.rabwahWhatsapp
  );
  const [rabwahMaps, setRabwahMaps] = useState(
    currentData.contacts?.rabwahMaps || DEFAULT_CONTACTS.rabwahMaps
  );
  const [rabwahReviewUrl, setRabwahReviewUrl] = useState(
    currentData.contacts?.rabwahReviewUrl ||
      DEFAULT_CONTACTS.rabwahReviewUrl ||
      DEFAULT_CONTACTS.rabwahMaps
  );

  const [qurayniyyahPhone, setQurayniyyahPhone] = useState(
    currentData.contacts?.qurayniyyahPhone || DEFAULT_CONTACTS.qurayniyyahPhone
  );
  const [qurayniyyahWhatsapp, setQurayniyyahWhatsapp] = useState(
    currentData.contacts?.qurayniyyahWhatsapp || DEFAULT_CONTACTS.qurayniyyahWhatsapp
  );
  const [qurayniyyahMaps, setQurayniyyahMaps] = useState(
    currentData.contacts?.qurayniyyahMaps || DEFAULT_CONTACTS.qurayniyyahMaps
  );
  const [qurayniyyahReviewUrl, setQurayniyyahReviewUrl] = useState(
    currentData.contacts?.qurayniyyahReviewUrl ||
      DEFAULT_CONTACTS.qurayniyyahReviewUrl ||
      DEFAULT_CONTACTS.qurayniyyahMaps
  );

  // Pricing Form State
  const [pricingState, setPricingState] = useState<Record<string, BranchPricing>>(
    currentData.pricing || DEFAULT_PRICING_DATA
  );
  const [selectedPricingBranch, setSelectedPricingBranch] = useState<
    'al-rabwah' | 'al-qurayniyyah'
  >('al-rabwah');

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
    sanitizeElfsightId(currentData.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID)
  );
  const [elfsightRabwahWidgetId, setElfsightRabwahWidgetId] = useState<string>(
    sanitizeElfsightId(
      currentData.elfsightRabwahWidgetId || currentData.elfsightWidgetId,
      DEFAULT_RABWAH_ELFSIGHT_ID
    )
  );
  const [elfsightQurayniyyahWidgetId, setElfsightQurayniyyahWidgetId] = useState<string>(
    sanitizeElfsightId(currentData.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID)
  );

  const [showReviewsTab, setShowReviewsTab] = useState<boolean>(
    currentData.showReviewsTab !== undefined ? currentData.showReviewsTab : true
  );

  const [reviewsList, setReviewsList] = useState<GoogleReviewItem[]>(
    currentData.reviews && currentData.reviews.length > 0
      ? currentData.reviews
      : VERIFIED_GOOGLE_REVIEWS
  );

  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(
    currentData.showWelcomeMessage !== undefined ? currentData.showWelcomeMessage : true
  );
  const [welcomeTitleAr, setWelcomeTitleAr] = useState<string>(
    currentData.welcomeTitleAr || DEFAULT_WELCOME_TITLE_AR
  );
  const [welcomeTitleEn, setWelcomeTitleEn] = useState<string>(
    currentData.welcomeTitleEn || DEFAULT_WELCOME_TITLE_EN
  );
  const [welcomeTextAr, setWelcomeTextAr] = useState<string>(
    currentData.welcomeTextAr || DEFAULT_WELCOME_TEXT_AR
  );
  const [welcomeTextEn, setWelcomeTextEn] = useState<string>(
    currentData.welcomeTextEn || DEFAULT_WELCOME_TEXT_EN
  );

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize modal state with currentData
  useEffect(() => {
    if (isOpen) {
      setLogoUrl(currentData.logoUrl || '');
      setBackgroundImageUrl(currentData.backgroundImageUrl || '');
      setBackgroundOverlayOpacity(
        currentData.backgroundOverlayOpacity !== undefined
          ? currentData.backgroundOverlayOpacity
          : 85
      );
      setOffers(currentData.offers || DEFAULT_OFFERS);
      setRabwahPhone(currentData.contacts?.rabwahPhone || DEFAULT_CONTACTS.rabwahPhone);
      setRabwahWhatsapp(currentData.contacts?.rabwahWhatsapp || DEFAULT_CONTACTS.rabwahWhatsapp);
      setRabwahMaps(currentData.contacts?.rabwahMaps || DEFAULT_CONTACTS.rabwahMaps);
      setRabwahReviewUrl(
        currentData.contacts?.rabwahReviewUrl ||
          DEFAULT_CONTACTS.rabwahReviewUrl ||
          DEFAULT_CONTACTS.rabwahMaps
      );
      setQurayniyyahPhone(
        currentData.contacts?.qurayniyyahPhone || DEFAULT_CONTACTS.qurayniyyahPhone
      );
      setQurayniyyahWhatsapp(
        currentData.contacts?.qurayniyyahWhatsapp || DEFAULT_CONTACTS.qurayniyyahWhatsapp
      );
      setQurayniyyahMaps(
        currentData.contacts?.qurayniyyahMaps || DEFAULT_CONTACTS.qurayniyyahMaps
      );
      setQurayniyyahReviewUrl(
        currentData.contacts?.qurayniyyahReviewUrl ||
          DEFAULT_CONTACTS.qurayniyyahReviewUrl ||
          DEFAULT_CONTACTS.qurayniyyahMaps
      );
      setPricingState(currentData.pricing || DEFAULT_PRICING_DATA);
      setElfsightWidgetId(
        sanitizeElfsightId(currentData.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID)
      );
      setElfsightRabwahWidgetId(
        sanitizeElfsightId(
          currentData.elfsightRabwahWidgetId || currentData.elfsightWidgetId,
          DEFAULT_RABWAH_ELFSIGHT_ID
        )
      );
      setElfsightQurayniyyahWidgetId(
        sanitizeElfsightId(currentData.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID)
      );
      setShowReviewsTab(
        currentData.showReviewsTab !== undefined ? currentData.showReviewsTab : true
      );
      setReviewsList(
        currentData.reviews && currentData.reviews.length > 0
          ? currentData.reviews
          : VERIFIED_GOOGLE_REVIEWS
      );
      setShowWelcomeMessage(
        currentData.showWelcomeMessage !== undefined ? currentData.showWelcomeMessage : true
      );
      setWelcomeTitleAr(currentData.welcomeTitleAr || DEFAULT_WELCOME_TITLE_AR);
      setWelcomeTitleEn(currentData.welcomeTitleEn || DEFAULT_WELCOME_TITLE_EN);
      setWelcomeTextAr(currentData.welcomeTextAr || DEFAULT_WELCOME_TEXT_AR);
      setWelcomeTextEn(currentData.welcomeTextEn || DEFAULT_WELCOME_TEXT_EN);
      setCompetitions(currentData.competitions || []);
      setShowCompetitionsTab(
        currentData.showCompetitionsTab !== undefined ? currentData.showCompetitionsTab : true
      );
      setLoyaltyCard(
        currentData.loyaltyCard
          ? { ...DEFAULT_LOYALTY_CARD, ...currentData.loyaltyCard }
          : DEFAULT_LOYALTY_CARD
      );
      setFreeServices(currentData.freeServices || DEFAULT_FREE_SERVICES);
      setShowGalleryTab(
        currentData.showGalleryTab !== undefined ? currentData.showGalleryTab : true
      );
      setGalleryItems(currentData.galleryItems || DEFAULT_GALLERY_ITEMS);
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
      alert(
        lang === 'ar'
          ? 'حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت'
          : 'Image too large. Please select an image under 5MB.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;
      setLogoUrl(src);
    };
    reader.readAsDataURL(file);
  };

  const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        lang === 'ar'
          ? 'حجم الصورة كبير، يرجى اختيار ملف أقل من 5 ميجابايت'
          : 'Image too large. Under 5MB required.'
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (src) setBackgroundImageUrl(src);
    };
    reader.readAsDataURL(file);
  };

  // Pricing handlers
  const handlePriceChange = (
    branchId: 'al-rabwah' | 'al-qurayniyyah',
    itemId: string,
    field: 'small' | 'medium' | 'large',
    val: number
  ) => {
    setPricingState((prev) => {
      const branch = prev[branchId];
      if (!branch) return prev;
      const updatedItems = branch.items.map((it) => {
        if (it.id === itemId) {
          return { ...it, [field]: val };
        }
        return it;
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

  // Free Services handlers
  const handleAddFreeService = () => {
    const newItem: FreeServiceItem = {
      id: `free-${Date.now()}`,
      titleAr: 'خدمة مجانية جديدة',
      titleEn: 'New Free Service',
      descAr: 'وصف الخدمة أو المادة المستخدمة مجاناً مع الغسيل...',
      descEn: 'Service or product details provided for free...',
      iconName: 'sparkles',
      badgeAr: 'مجاناً',
      badgeEn: 'Free',
      active: true,
    };
    setFreeServices([...freeServices, newItem]);
  };

  const handleDeleteFreeService = (index: number) => {
    setFreeServices(freeServices.filter((_, i) => i !== index));
  };

  const handleFreeServiceChange = (
    index: number,
    field: keyof FreeServiceItem,
    val: any
  ) => {
    const next = [...freeServices];
    next[index] = { ...next[index], [field]: val };
    setFreeServices(next);
  };

  // Gallery handlers
  const handleAddGalleryItem = () => {
    const newItem: GalleryMediaItem = {
      id: `gal-${Date.now()}`,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80',
      titleAr: 'صورة جديدة للغسيل',
      titleEn: 'New Wash Showcase',
      descAr: 'تفاصيل الصورة أو الفيديو...',
      descEn: 'Showcase details...',
      category: 'wash',
    };
    setGalleryItems([newItem, ...galleryItems]);
  };

  const handleDeleteGalleryItem = (index: number) => {
    setGalleryItems(galleryItems.filter((_, i) => i !== index));
  };

  const handleGalleryItemChange = (
    index: number,
    field: keyof GalleryMediaItem,
    val: any
  ) => {
    const next = [...galleryItems];
    next[index] = { ...next[index], [field]: val };
    setGalleryItems(next);
  };

  const handleGalleryFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    // Check size (allow up to 25MB for video, 8MB for image)
    const maxSize = isVideo ? 25 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        lang === 'ar'
          ? `حجم الملف كبير، الحد الأقصى هو ${isVideo ? '25' : '8'} ميجابايت`
          : `File too large. Max size is ${isVideo ? '25MB' : '8MB'}`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      const next = [...galleryItems];
      next[index] = {
        ...next[index],
        url: src,
        type: isVideo ? 'video' : 'image',
      };
      setGalleryItems(next);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryThumbUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'ar' ? 'حجم الصورة المصغرة كبير (الحد 5 ميجابايت)' : 'Thumbnail too large (Max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      const next = [...galleryItems];
      next[index] = {
        ...next[index],
        thumbnailUrl: src,
      };
      setGalleryItems(next);
    };
    reader.readAsDataURL(file);
  };

  // Competitions handlers
  const handleAddCompetition = () => {
    const newComp: AppCompetition = {
      id: `comp-${Date.now()}`,
      titleAr: 'سحب غسيل سيارات مجاني 🏆',
      titleEn: 'Free Car Wash Draw 🏆',
      prizeAr: 'غسيل داخلي وخارجي كامل مع واكس نانو هدية',
      prizeEn: 'Full Wash with Nano Wax Protection',
      badgeAr: 'سحب الأسبوع',
      badgeEn: 'Weekly Draw',
      descAr: 'تابع حسابنا على تيك توك وسو لايك للمقطع للفوز بالسحب القادم!',
      descEn: 'Follow our TikTok account and like the video to enter the draw!',
      linkUrl: socials.tiktokUrl || 'https://www.tiktok.com/@rm.star.carwash',
      endDate: 'نهاية الأسبوع الحالي',
      termsAr: 'السحب لجميع عملاء مغسلة آر إم ستار في جدة',
      termsEn: 'Draw open to all RM.STAR customers in Jeddah',
      active: true,
    };
    setCompetitions([newComp, ...competitions]);
  };

  const handleDeleteCompetition = (index: number) => {
    setCompetitions(competitions.filter((_, i) => i !== index));
  };

  const handleCompetitionChange = (index: number, field: keyof AppCompetition, val: any) => {
    const next = [...competitions];
    next[index] = { ...next[index], [field]: val };
    setCompetitions(next);
  };

  // Reviews handlers
  const handleAddReview = () => {
    const newRev: GoogleReviewItem = {
      id: `rev-${Date.now()}`,
      branchId: 'al-qurayniyyah',
      author: 'عميل من خرائط Google',
      avatarColor: 'from-blue-600 to-cyan-500',
      rating: 5,
      dateAr: 'مؤخراً',
      dateEn: 'Recently',
      textAr: 'ما شاء الله تبارك الله، شغل احترافي وسريع وغسيل نظيف يستحق 5 نجوم.',
      textEn: 'Great service, quick and high quality wash.',
      car: '',
      verified: true,
    };
    setReviewsList([newRev, ...reviewsList]);
  };

  const handleDeleteReview = (id: string) => {
    setReviewsList(reviewsList.filter((r) => r.id !== id));
  };

  const handleUpdateReview = (id: string, field: keyof GoogleReviewItem, val: any) => {
    setReviewsList(reviewsList.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
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

  const handleSaveAll = async () => {
    setIsSaving(true);
    const finalRabwahReviewUrl =
      elfsightRabwahWidgetId.includes('google.com') || elfsightRabwahWidgetId.includes('writereview')
        ? elfsightRabwahWidgetId.trim()
        : (rabwahReviewUrl || '').trim();

    const finalQurayniyyahReviewUrl =
      elfsightQurayniyyahWidgetId.includes('google.com') || elfsightQurayniyyahWidgetId.includes('writereview')
        ? elfsightQurayniyyahWidgetId.trim()
        : (qurayniyyahReviewUrl || '').trim();

    const cleanRabwahWidgetId = sanitizeElfsightId(elfsightRabwahWidgetId, DEFAULT_RABWAH_ELFSIGHT_ID);
    const cleanQurayniyyahWidgetId = sanitizeElfsightId(elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID);

    const updated: AppCustomization = {
      ...currentData,
      logoUrl,
      backgroundImageUrl,
      backgroundOverlayOpacity,
      offers,
      contacts: {
        rabwahPhone,
        rabwahWhatsapp,
        rabwahMaps,
        rabwahReviewUrl: finalRabwahReviewUrl,
        qurayniyyahPhone,
        qurayniyyahWhatsapp,
        qurayniyyahMaps,
        qurayniyyahReviewUrl: finalQurayniyyahReviewUrl,
      },
      socials,
      pricing: pricingState,
      elfsightWidgetId: cleanRabwahWidgetId,
      elfsightRabwahWidgetId: cleanRabwahWidgetId,
      elfsightQurayniyyahWidgetId: cleanQurayniyyahWidgetId,
      showReviewsTab,
      showCompetitionsTab,
      competitions,
      reviews: reviewsList,
      showWelcomeMessage,
      welcomeTitleAr: welcomeTitleAr.trim() || DEFAULT_WELCOME_TITLE_AR,
      welcomeTitleEn: welcomeTitleEn.trim() || DEFAULT_WELCOME_TITLE_EN,
      welcomeTextAr: welcomeTextAr.trim() || DEFAULT_WELCOME_TEXT_AR,
      welcomeTextEn: welcomeTextEn.trim() || DEFAULT_WELCOME_TEXT_EN,
      loyaltyCard,
      freeServices,
      showGalleryTab,
      galleryItems,
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
    if (
      confirm(
        lang === 'ar'
          ? 'هل أنت متأكد من استعادة الإعدادات والأسعار الافتراضية كاملة؟'
          : 'Reset all data and pricing to default?'
      )
    ) {
      const resetData: AppCustomization = {
        logoUrl: '',
        backgroundImageUrl: '',
        backgroundOverlayOpacity: 85,
        offers: DEFAULT_OFFERS,
        competitions: [],
        showCompetitionsTab: true,
        contacts: DEFAULT_CONTACTS,
        socials: DEFAULT_SOCIALS,
        pricing: DEFAULT_PRICING_DATA,
        showReviewsTab: true,
        reviews: VERIFIED_GOOGLE_REVIEWS,
        loyaltyCard: DEFAULT_LOYALTY_CARD,
        freeServices: DEFAULT_FREE_SERVICES,
        showGalleryTab: true,
        galleryItems: DEFAULT_GALLERY_ITEMS,
      };
      await saveCloudCustomization(resetData);
      onSave(resetData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#070b16] rounded-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,180,255,0.25)] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-blue-900/40 bg-gradient-to-r from-[#0d162a] via-[#091122] to-[#060a16]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'لوحة تحكم الإدارة السحابية' : 'Cloud Admin Control'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 font-mono">
                  RM.STAR
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar'
                  ? 'بطاقة الولاء، الباركود، الخدمات المجانية، المعرض، الأسعار والخلفية'
                  : 'Manage loyalty pass, barcode, free perks, gallery, prices & wallpaper'}
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
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
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
              {/* Navigation Tabs Bar */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 p-1 bg-[#040711] rounded-xl border border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setActiveTab('prices')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'prices'
                      ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === 'ar' ? 'الأسعار' : 'Pricing'}</span>
                </button>

                {/* Loyalty Card Tab Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('loyalty')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'loyalty'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,180,255,0.6)] font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'بطاقة الولاء' : 'Loyalty'}</span>
                </button>

                {/* Free Services Tab Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('freeServices')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'freeServices'
                      ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(0,180,255,0.5)] font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'خدمات مجانية' : 'Free Perks'}</span>
                </button>

                {/* Gallery Tab Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'gallery'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)] font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'المعرض' : 'Gallery'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
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
                  onClick={() => setActiveTab('competitions')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'competitions'
                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'ar' ? 'المسابقات' : 'Contests'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('socials')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
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
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
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
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'offers'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'العروض' : 'Offers'}</span>
                </button>

                {/* Design, Wallpaper & Logo Tab Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('logo')}
                  className={`py-2 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'logo'
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{lang === 'ar' ? 'الخلفية والشعار' : 'Wallpaper & Logo'}</span>
                </button>
              </div>

              {/* 1. PRICING EDITING TAB */}
              {activeTab === 'prices' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">
                      {lang === 'ar' ? 'اختر الفرع لتعديل أسعاره:' : 'Select branch:'}
                    </span>
                    <div className="flex gap-1.5 p-1 bg-black/60 rounded-lg border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setSelectedPricingBranch('al-rabwah')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          selectedPricingBranch === 'al-rabwah'
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang === 'ar' ? 'فرع الربوة' : 'Al Rabwah'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPricingBranch('al-qurayniyyah')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          selectedPricingBranch === 'al-qurayniyyah'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang === 'ar' ? 'فرع القرينية (الخمرة)' : 'Al Qurayniyyah'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {pricingState[selectedPricingBranch]?.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">
                            {lang === 'ar' ? item.nameAr : item.nameEn}
                          </span>
                          {item.isExtra && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                              {lang === 'ar' ? 'إضافي' : 'Add-on'}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'صغير (ر.س)' : 'Small (SAR)'}
                            </label>
                            <input
                              type="number"
                              value={item.small}
                              onChange={(e) =>
                                handlePriceChange(
                                  selectedPricingBranch,
                                  item.id,
                                  'small',
                                  Number(e.target.value)
                                )
                              }
                              className="w-full px-2 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'وسط (ر.س)' : 'Medium (SAR)'}
                            </label>
                            <input
                              type="number"
                              value={item.medium}
                              onChange={(e) =>
                                handlePriceChange(
                                  selectedPricingBranch,
                                  item.id,
                                  'medium',
                                  Number(e.target.value)
                                )
                              }
                              className="w-full px-2 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'كبير (ر.س)' : 'Large (SAR)'}
                            </label>
                            <input
                              type="number"
                              value={item.large}
                              onChange={(e) =>
                                handlePriceChange(
                                  selectedPricingBranch,
                                  item.id,
                                  'large',
                                  Number(e.target.value)
                                )
                              }
                              className="w-full px-2 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. LOYALTY CARD TAB (بطاقة الولاء - 4 غسلات والخامسة مجانًا) */}
              {activeTab === 'loyalty' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Status Box */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 via-[#071328] to-black border border-cyan-400/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-sm">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">
                          {lang === 'ar' ? 'بطاقة الولاء الرقمية للمحفظة' : 'Digital Loyalty Pass'}
                        </h4>
                        <p className="text-[11px] text-cyan-200/80">
                          {lang === 'ar'
                            ? 'تنضاف في Apple Wallet ومحفظة الجوال عبر الباركود أو الرابط'
                            : 'Added to Apple / Google Wallet via QR or link'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setLoyaltyCard({ ...loyaltyCard, enabled: !loyaltyCard.enabled })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        loyaltyCard.enabled
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {loyaltyCard.enabled
                        ? lang === 'ar'
                          ? 'مفعلة بالصفحة'
                          : 'Active'
                        : lang === 'ar'
                        ? 'معطلة'
                        : 'Disabled'}
                    </button>
                  </div>

                  {/* Target URL & QR Link */}
                  <div className="p-3.5 rounded-xl bg-[#09152b] border border-cyan-400/30 space-y-3">
                    <div>
                      <label className="text-xs font-bold text-cyan-300 block mb-1">
                        {lang === 'ar'
                          ? 'رابط بطاقة المحفظة (LoyaPro أو Pass URL):'
                          : 'Wallet Pass Registration URL:'}
                      </label>
                      <input
                        type="text"
                        value={loyaltyCard.targetUrl}
                        onChange={(e) =>
                          setLoyaltyCard({ ...loyaltyCard, targetUrl: e.target.value })
                        }
                        placeholder="https://loyapro.com/c-r/ODM1MA=="
                        className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-500/40 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {lang === 'ar'
                          ? 'عندما يسجل العميل ينضاف له في المحفظة، ويتم توليد باركود QR تلقائياً لهذا الرابط'
                          : 'Customers scanning or tapping this link get their pass in their phone wallet'}
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        {lang === 'ar'
                          ? 'رابط صورة باركود مخصص (اختياري - اتركه فارغاً للتوليد التلقائي):'
                          : 'Custom QR Code Image URL (optional):'}
                      </label>
                      <input
                        type="text"
                        value={loyaltyCard.customQrUrl || ''}
                        onChange={(e) =>
                          setLoyaltyCard({ ...loyaltyCard, customQrUrl: e.target.value })
                        }
                        placeholder="https://.../qr.png"
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Texts and Counts */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          {lang === 'ar' ? 'العنوان الرئيسي للبطاقة:' : 'Headline (AR):'}
                        </label>
                        <input
                          type="text"
                          value={loyaltyCard.headlineAr}
                          onChange={(e) =>
                            setLoyaltyCard({ ...loyaltyCard, headlineAr: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-amber-300 font-bold text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          {lang === 'ar' ? 'العنوان الفرعي:' : 'Subtitle (AR):'}
                        </label>
                        <input
                          type="text"
                          value={loyaltyCard.subheadlineAr}
                          onChange={(e) =>
                            setLoyaltyCard({ ...loyaltyCard, subheadlineAr: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          {lang === 'ar' ? 'عدد الغسلات المؤهلة (الدوائر الصفراء):' : 'Washes:'}
                        </label>
                        <input
                          type="number"
                          value={loyaltyCard.completedCount}
                          onChange={(e) =>
                            setLoyaltyCard({
                              ...loyaltyCard,
                              completedCount: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          {lang === 'ar' ? 'إجمالي الدوائر (الخامسة مجاناً):' : 'Total:'}
                        </label>
                        <input
                          type="number"
                          value={loyaltyCard.totalCount}
                          onChange={(e) =>
                            setLoyaltyCard({
                              ...loyaltyCard,
                              totalCount: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        {lang === 'ar' ? 'نص الإرشاد أسفل الباركود:' : 'Note (AR):'}
                      </label>
                      <input
                        type="text"
                        value={loyaltyCard.noteAr || ''}
                        onChange={(e) =>
                          setLoyaltyCard({ ...loyaltyCard, noteAr: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Live Mini Preview */}
                  <div className="p-3 rounded-xl bg-[#061022] border border-cyan-400/40 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(0,180,255,0.15)]">
                    <div className="text-start">
                      <span className="text-[10px] text-cyan-300 font-bold block">
                        {lang === 'ar' ? 'معاينة رابط الباركود الفعال:' : 'Active Pass URL:'}
                      </span>
                      <a
                        href={loyaltyCard.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:underline flex items-center gap-1 font-mono break-all"
                      >
                        <span>{loyaltyCard.targetUrl}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                        loyaltyCard.targetUrl
                      )}&margin=5`}
                      alt="QR"
                      className="w-16 h-16 rounded-lg bg-white p-1 shrink-0"
                    />
                  </div>
                </div>
              )}

              {/* 3. FREE SERVICES TAB (الخدمات والمواد المجانية مع كل غسيل) */}
              {activeTab === 'freeServices' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === 'ar'
                          ? 'المزايا والمواد المجانية مع أي غسيل'
                          : 'Complimentary Services with Every Wash'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {lang === 'ar'
                          ? 'تعقيم البخار، تكييس الدعاسات والقير، فواحة، مناديل، وشامبو لايف لاينز + كيميكال'
                          : 'Steam, protective bagging, freshener, tissues & Lifelines shampoo'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFreeService}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة خدمة مجانية' : 'Add Free Perk'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {freeServices.map((service, index) => (
                      <div
                        key={service.id || index}
                        className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold text-[11px] flex items-center justify-center">
                              {index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleFreeServiceChange(index, 'active', !service.active)
                              }
                              className={`px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                                service.active
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  service.active ? 'bg-emerald-400' : 'bg-slate-500'
                                }`}
                              />
                              <span>{service.active ? (lang === 'ar' ? 'مفعلة' : 'Active') : (lang === 'ar' ? 'معطلة' : 'Disabled')}</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteFreeService(index)}
                            className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'اسم الخدمة (عربي):' : 'Title (AR):'}
                            </label>
                            <input
                              type="text"
                              value={service.titleAr}
                              onChange={(e) =>
                                handleFreeServiceChange(index, 'titleAr', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'وسام التميز (مثل: مجاناً):' : 'Badge (AR):'}
                            </label>
                            <input
                              type="text"
                              value={service.badgeAr || ''}
                              onChange={(e) =>
                                handleFreeServiceChange(index, 'badgeAr', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-emerald-300 text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            {lang === 'ar' ? 'تفاصيل الخدمة أو المادة (عربي):' : 'Description (AR):'}
                          </label>
                          <textarea
                            rows={2}
                            value={service.descAr}
                            onChange={(e) =>
                              handleFreeServiceChange(index, 'descAr', e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-slate-400">
                            {lang === 'ar' ? 'الأيقونة:' : 'Icon:'}
                          </label>
                          <select
                            value={service.iconName}
                            onChange={(e) =>
                              handleFreeServiceChange(index, 'iconName', e.target.value)
                            }
                            className="px-2 py-1 rounded bg-black border border-slate-700 text-cyan-300 text-xs"
                          >
                            <option value="steam">بخار (Steam)</option>
                            <option value="mats">دعاسات (Mats Wrap)</option>
                            <option value="gear">عصا القير (Gear Sleeves)</option>
                            <option value="freshener">فواحة (Freshener)</option>
                            <option value="tissues">مناديل (Tissues)</option>
                            <option value="chemical">كيميكال وشامبو (Chemical & Lifelines)</option>
                            <option value="sparkles">لمعان (Sparkles)</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. GALLERY TAB (المعرض: صور وفيديوهات) */}
              {activeTab === 'gallery' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === 'ar' ? 'إدارة معرض الصور والفيديوهات' : 'Photo & Video Gallery'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {lang === 'ar'
                          ? 'أضف صور وفيديوهات لأعمال المغسلة ورغوة الشامبو والتلميع'
                          : 'Showcase photos and videos of your car wash work'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowGalleryTab(!showGalleryTab)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          showGalleryTab
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {showGalleryTab
                          ? lang === 'ar'
                            ? 'التبويب ظاهر'
                            : 'Tab Visible'
                          : lang === 'ar'
                          ? 'التبويب مخفي'
                          : 'Tab Hidden'}
                      </button>

                      <button
                        type="button"
                        onClick={handleAddGalleryItem}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'إضافة وسائط' : 'Add Media'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {galleryItems.map((item, index) => (
                      <div
                        key={item.id || index}
                        className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">#{index + 1}</span>
                            <div className="flex rounded-lg overflow-hidden border border-slate-700">
                              <button
                                type="button"
                                onClick={() => handleGalleryItemChange(index, 'type', 'image')}
                                className={`px-2.5 py-1 text-xs font-bold ${
                                  item.type === 'image'
                                    ? 'bg-cyan-500 text-black'
                                    : 'bg-black text-slate-400'
                                }`}
                              >
                                {lang === 'ar' ? 'صورة' : 'Photo'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleGalleryItemChange(index, 'type', 'video')}
                                className={`px-2.5 py-1 text-xs font-bold ${
                                  item.type === 'video'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-black text-slate-400'
                                }`}
                              >
                                {lang === 'ar' ? 'فيديو' : 'Video'}
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryItem(index)}
                            className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar' ? 'عنوان الوسائط (عربي):' : 'Title (AR):'}
                            </label>
                            <input
                              type="text"
                              value={item.titleAr}
                              onChange={(e) =>
                                handleGalleryItemChange(index, 'titleAr', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block mb-0.5 font-bold">
                              {lang === 'ar'
                                ? 'رابط الوسائط (أو ارفع مباشرة من الجوال/الكمبيوتر):'
                                : 'Media URL or Direct File Upload:'}
                            </label>

                            <div className="flex items-center gap-1.5">
                              {/* Direct File Upload from Mobile Gallery / Camera / PC */}
                              <label className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-[11px] flex items-center gap-1 shadow-sm transition-all shrink-0">
                                <Upload className="w-3.5 h-3.5 text-black" />
                                <span>{lang === 'ar' ? 'رفع من الجوال / PC' : 'Upload File'}</span>
                                <input
                                  type="file"
                                  accept={item.type === 'video' ? 'video/*' : 'image/*'}
                                  className="hidden"
                                  onChange={(e) => handleGalleryFileUpload(index, e)}
                                />
                              </label>

                              <input
                                type="text"
                                value={item.url.startsWith('data:') ? (lang === 'ar' ? '✅ تم رفع الملف بنجاح من جهازك' : '✅ Uploaded from device') : item.url}
                                onChange={(e) =>
                                  handleGalleryItemChange(index, 'url', e.target.value)
                                }
                                placeholder="https://..."
                                className="flex-1 px-2.5 py-1.5 rounded bg-black border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Media Preview Box */}
                        {item.url && (
                          <div className="relative w-full h-24 rounded-lg overflow-hidden bg-black/90 border border-slate-800 flex items-center justify-center">
                            {item.type === 'video' ? (
                              item.url.startsWith('data:video') || item.url.endsWith('.mp4') ? (
                                <video
                                  src={item.url}
                                  className="w-full h-full object-contain"
                                  controls
                                />
                              ) : (
                                <div className="text-center p-2 text-slate-400 text-[10px]">
                                  <span>🎬 {lang === 'ar' ? 'معاينة الفيديو جاهزة للعرض' : 'Video ready'}</span>
                                </div>
                              )
                            ) : (
                              <img
                                src={item.url}
                                alt={item.titleAr}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        )}

                        {item.type === 'video' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block mb-0.5">
                              {lang === 'ar'
                                ? 'صورة الغلاف للمقطع (Thumbnail - ارفع أو ضع رابط):'
                                : 'Video Thumbnail (Upload or URL):'}
                            </label>
                            <div className="flex items-center gap-1.5">
                              <label className="cursor-pointer px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 shrink-0">
                                <Upload className="w-3 h-3 text-cyan-300" />
                                <span>{lang === 'ar' ? 'رفع غلاف' : 'Upload'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleGalleryThumbUpload(index, e)}
                                />
                              </label>
                              <input
                                type="text"
                                value={item.thumbnailUrl?.startsWith('data:') ? (lang === 'ar' ? '✅ تم رفع الغلاف' : '✅ Thumbnail uploaded') : (item.thumbnailUrl || '')}
                                onChange={(e) =>
                                  handleGalleryItemChange(index, 'thumbnailUrl', e.target.value)
                                }
                                placeholder="https://..."
                                className="flex-1 px-2 py-1 rounded bg-black border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">
                            {lang === 'ar' ? 'وصف مختصر (عربي):' : 'Description:'}
                          </label>
                          <input
                            type="text"
                            value={item.descAr || ''}
                            onChange={(e) =>
                              handleGalleryItemChange(index, 'descAr', e.target.value)
                            }
                            className="w-full px-2 py-1 rounded bg-black border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. REVIEWS TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950 via-[#0a162c] to-black border border-blue-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <div>
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {lang === 'ar' ? 'تقييمات خرائط Google' : 'Google Reviews Integration'}
                          </h4>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowReviewsTab(!showReviewsTab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          showReviewsTab
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {showReviewsTab
                          ? lang === 'ar'
                            ? 'القسم مفعّل'
                            : 'Enabled'
                          : lang === 'ar'
                          ? 'القسم معطل'
                          : 'Disabled'}
                      </button>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-white/10">
                      {/* Direct Google Review URLs (Places ID / Write Review) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-black/60 border border-blue-500/40">
                          <label className="text-xs font-bold text-cyan-300 mb-1 block">
                            {lang === 'ar'
                              ? 'رابط تقييم قوقل المباشر (فرع القرينية):'
                              : 'Al Qurayniyyah Direct Google Review URL:'}
                          </label>
                          <input
                            type="text"
                            value={qurayniyyahReviewUrl}
                            onChange={(e) => setQurayniyyahReviewUrl(e.target.value)}
                            placeholder="https://search.google.com/local/writereview?placeid=..."
                            className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-cyan-500/50 text-white font-mono text-xs"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            {lang === 'ar' ? 'الرابط المباشر الذي يفتح صفحة كتابة التقييم 5 نجوم للفرع' : 'Direct link opening 5-star write review page'}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/60 border border-rose-500/40">
                          <label className="text-xs font-bold text-rose-300 mb-1 block">
                            {lang === 'ar'
                              ? 'رابط تقييم قوقل المباشر (فرع الربوة):'
                              : 'Al Rabwah Direct Google Review URL:'}
                          </label>
                          <input
                            type="text"
                            value={rabwahReviewUrl}
                            onChange={(e) => setRabwahReviewUrl(e.target.value)}
                            placeholder="https://search.google.com/local/writereview?placeid=..."
                            className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-rose-500/50 text-white font-mono text-xs"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            {lang === 'ar' ? 'الرابط المباشر الذي يفتح صفحة كتابة التقييم 5 نجوم للفرع' : 'Direct link opening 5-star write review page'}
                          </p>
                        </div>
                      </div>

                      {/* Elfsight Widget IDs (UUIDs) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-500/40">
                          <label className="text-xs font-bold text-blue-300 mb-1 block">
                            {lang === 'ar'
                              ? 'كود ويدجت Elfsight التفاعلي (فرع القرينية):'
                              : 'Al Qurayniyyah Elfsight Widget ID:'}
                          </label>
                          <input
                            type="text"
                            value={elfsightQurayniyyahWidgetId}
                            onChange={(e) => {
                              const val = e.target.value.trim();
                              if (val.includes('google.com') || val.includes('writereview') || val.includes('placeid')) {
                                setQurayniyyahReviewUrl(val);
                                setElfsightQurayniyyahWidgetId(DEFAULT_QURAYNIYYAH_ELFSIGHT_ID);
                              } else {
                                setElfsightQurayniyyahWidgetId(val);
                              }
                            }}
                            placeholder="cb00da1a-f1b5-47e5-9c18-df41e993a59a"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-cyan-500/50 text-white font-mono text-xs"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            {lang === 'ar' ? 'معرّف الويدجت (UUID) وليس رابط قوقل' : 'Widget UUID ID, not a web link'}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/60 border border-red-500/40">
                          <label className="text-xs font-bold text-red-300 mb-1 block">
                            {lang === 'ar'
                              ? 'كود ويدجت Elfsight التفاعلي (فرع الربوة):'
                              : 'Al Rabwah Elfsight Widget ID:'}
                          </label>
                          <input
                            type="text"
                            value={elfsightRabwahWidgetId}
                            onChange={(e) => {
                              const val = e.target.value.trim();
                              if (val.includes('google.com') || val.includes('writereview') || val.includes('placeid')) {
                                setRabwahReviewUrl(val);
                                setElfsightRabwahWidgetId(DEFAULT_RABWAH_ELFSIGHT_ID);
                              } else {
                                setElfsightRabwahWidgetId(val);
                              }
                            }}
                            placeholder="6a74526d-7ee8-4500-9bc9-1b2a0569bb43"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#070b16] border border-red-500/50 text-white font-mono text-xs"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            {lang === 'ar' ? 'معرّف الويدجت (UUID) وليس رابط قوقل' : 'Widget UUID ID, not a web link'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. COMPETITIONS TAB */}
              {activeTab === 'competitions' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === 'ar' ? 'إدارة المسابقات والسحوبات' : 'Contests & Draws'}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddCompetition}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة مسابقة جديدة' : 'Add Contest'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {competitions.map((comp, idx) => (
                      <div
                        key={comp.id || idx}
                        className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300">
                            {comp.titleAr}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCompetition(idx)}
                            className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={comp.titleAr}
                          onChange={(e) => handleCompetitionChange(idx, 'titleAr', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. SOCIALS TAB */}
              {activeTab === 'socials' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-2.5">
                    <label className="text-xs font-bold text-cyan-300 block">
                      TikTok URL:
                    </label>
                    <input
                      type="text"
                      value={socials.tiktokUrl || ''}
                      onChange={(e) => setSocials({ ...socials, tiktokUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2.5">
                    <label className="text-xs font-bold text-amber-300 block">
                      Snapchat URL:
                    </label>
                    <input
                      type="text"
                      value={socials.snapchatUrl || ''}
                      onChange={(e) => setSocials({ ...socials, snapchatUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2.5">
                    <label className="text-xs font-bold text-rose-300 block">
                      Instagram URL:
                    </label>
                    <input
                      type="text"
                      value={socials.instagramUrl || ''}
                      onChange={(e) => setSocials({ ...socials, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* 8. BRANCHES CONTACTS TAB */}
              {activeTab === 'contacts' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Rabwah */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-red-500/40 space-y-2.5">
                    <h5 className="font-bold text-red-300 text-xs">
                      {lang === 'ar' ? 'بيانات فرع الربوة (الستين):' : 'Al Rabwah Branch:'}
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">الاتصال:</label>
                        <input
                          type="text"
                          value={rabwahPhone || ''}
                          onChange={(e) => setRabwahPhone(e.target.value)}
                          className="w-full px-2 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">الواتساب:</label>
                        <input
                          type="text"
                          value={rabwahWhatsapp || ''}
                          onChange={(e) => setRabwahWhatsapp(e.target.value)}
                          className="w-full px-2 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Qurayniyyah */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-500/40 space-y-2.5">
                    <h5 className="font-bold text-cyan-300 text-xs">
                      {lang === 'ar' ? 'بيانات فرع القرينية (الخمرة):' : 'Al Qurayniyyah Branch:'}
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">الاتصال:</label>
                        <input
                          type="text"
                          value={qurayniyyahPhone || ''}
                          onChange={(e) => setQurayniyyahPhone(e.target.value)}
                          className="w-full px-2 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">الواتساب:</label>
                        <input
                          type="text"
                          value={qurayniyyahWhatsapp || ''}
                          onChange={(e) => setQurayniyyahWhatsapp(e.target.value)}
                          className="w-full px-2 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. OFFERS TAB */}
              {activeTab === 'offers' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">
                      {lang === 'ar' ? 'العروض الترويجية' : 'Promotional Offers'}
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddOffer}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة عرض' : 'Add Offer'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {offers.map((offer, idx) => (
                      <div
                        key={offer.id || idx}
                        className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleToggleOffer(idx)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              offer.active ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {offer.active ? 'ظاهر' : 'مخفي'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOffer(idx)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={offer.titleAr}
                          onChange={(e) => {
                            const next = [...offers];
                            next[idx].titleAr = e.target.value;
                            setOffers(next);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs font-bold"
                        />
                        <textarea
                          rows={2}
                          value={offer.descAr}
                          onChange={(e) => {
                            const next = [...offers];
                            next[idx].descAr = e.target.value;
                            setOffers(next);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. WALLPAPER, LOGO & WELCOME TAB */}
              {activeTab === 'logo' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* A. CUSTOM BACKGROUND WALLPAPER SECTION (خلفية الشاشة) */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#0b1730] to-[#060e20] border border-cyan-400/50 space-y-3 shadow-[0_0_20px_rgba(0,180,255,0.2)]">
                    <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-xs sm:text-sm">
                            {lang === 'ar' ? 'صورة خلفية الشاشة (Wallpaper)' : 'Custom Wallpaper Background'}
                          </h5>
                          <span className="text-[10px] text-cyan-200/80">
                            {lang === 'ar'
                              ? 'أضف صورة فخمة تظهر كخلفية للتطبيق بالكامل'
                              : 'Set a custom background image for the whole app'}
                          </span>
                        </div>
                      </div>

                      {backgroundImageUrl && (
                        <button
                          type="button"
                          onClick={() => setBackgroundImageUrl('')}
                          className="px-2.5 py-1 rounded-lg bg-red-950/60 text-red-300 border border-red-500/40 text-[11px] font-bold hover:bg-red-900 transition-colors"
                        >
                          {lang === 'ar' ? 'إزالة الخلفية' : 'Clear Wallpaper'}
                        </button>
                      )}
                    </div>

                    {/* Preview box if wallpaper exists */}
                    {backgroundImageUrl && (
                      <div className="relative w-full h-28 rounded-xl overflow-hidden border border-cyan-500/40 shadow-inner">
                        <img
                          src={backgroundImageUrl}
                          alt="Wallpaper Preview"
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-black flex items-center justify-center"
                          style={{ opacity: backgroundOverlayOpacity / 100 }}
                        >
                          <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full border border-white/20">
                            {lang === 'ar'
                              ? `معاينة بنسبة تعتيم ${backgroundOverlayOpacity}%`
                              : `Preview with ${backgroundOverlayOpacity}% tint`}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Input for Wallpaper URL */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        {lang === 'ar'
                          ? 'رابط صورة الخلفية (أو ارفع ملف بالأسفل):'
                          : 'Wallpaper Image URL:'}
                      </label>
                      <input
                        type="text"
                        value={backgroundImageUrl}
                        onChange={(e) => setBackgroundImageUrl(e.target.value)}
                        placeholder="https://.../wallpaper.jpg"
                        className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* File Upload for Wallpaper */}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'رفع صورة من جهازك' : 'Upload Wallpaper File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBgFileUpload}
                        />
                      </label>

                      {/* Quick luxury car wash wallpaper presets */}
                      <span className="text-[10px] text-slate-400">
                        {lang === 'ar' ? 'أو اختر خلفية فخمة جاهزة:' : 'Presets:'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setBackgroundImageUrl(
                            'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1920&q=80'
                          )
                        }
                        className="px-2 py-1 rounded bg-black/50 border border-slate-700 text-[10px] text-cyan-300 hover:text-white"
                      >
                        {lang === 'ar' ? 'رغوة فاخرة' : 'Foam'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setBackgroundImageUrl(
                            'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1920&q=80'
                          )
                        }
                        className="px-2 py-1 rounded bg-black/50 border border-slate-700 text-[10px] text-cyan-300 hover:text-white"
                      >
                        {lang === 'ar' ? 'تلميع واستوديو' : 'Detailing'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setBackgroundImageUrl(
                            'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1920&q=80'
                          )
                        }
                        className="px-2 py-1 rounded bg-black/50 border border-slate-700 text-[10px] text-cyan-300 hover:text-white"
                      >
                        {lang === 'ar' ? 'لمعان رياضي' : 'Gloss'}
                      </button>
                    </div>

                    {/* Dark Tint Opacity Slider */}
                    {backgroundImageUrl && (
                      <div className="pt-2 border-t border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-bold flex items-center gap-1">
                            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{lang === 'ar' ? 'درجة تعتيم الخلفية (Tint):' : 'Overlay Tint Opacity:'}</span>
                          </span>
                          <span className="text-cyan-300 font-bold font-mono">
                            {backgroundOverlayOpacity}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="95"
                          step="5"
                          value={backgroundOverlayOpacity}
                          onChange={(e) => setBackgroundOverlayOpacity(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'ar'
                            ? 'يُنصح بنسبة 80% - 85% حتى تظهر تفاصيل الخلفية بجمال وتظل كافة النصوص والأزرار مقروءة وواضحة جداً'
                            : 'Recommended 80-85% for balanced aesthetics and readability'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* B. Welcome Banner Section */}
                  <div className="p-3.5 rounded-xl bg-[#09152b] border border-cyan-400/40 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-300" />
                        <h5 className="font-bold text-white text-xs sm:text-sm">
                          {lang === 'ar' ? 'الرسالة الترحيبية' : 'Welcome Message'}
                        </h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowWelcomeMessage(!showWelcomeMessage)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          showWelcomeMessage
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {showWelcomeMessage ? 'ظاهرة' : 'مخفية'}
                      </button>
                    </div>

                    {showWelcomeMessage && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={welcomeTitleAr}
                          onChange={(e) => setWelcomeTitleAr(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs font-bold"
                        />
                        <textarea
                          rows={2}
                          value={welcomeTextAr}
                          onChange={(e) => setWelcomeTextAr(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* C. Logo Customization */}
                  <div className="p-3.5 rounded-xl bg-[#091122] border border-cyan-400/30 text-center space-y-3">
                    <span className="text-xs text-slate-300 font-bold block">
                      {lang === 'ar' ? 'معاينة الشعار المعتمد الحالي' : 'Current Active Logo Preview'}
                    </span>
                    <div className="w-28 h-28 mx-auto rounded-xl overflow-hidden bg-black border border-cyan-400/50 p-2 flex items-center justify-center shadow-lg">
                      <img
                        src={logoUrl || '/logo.jpg'}
                        alt="RM.STAR Logo"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/logo.jpg';
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-sm transition-all">
                        <Upload className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'رفع صورة شعار جديدة' : 'Upload Logo'}</span>
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
                          className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'استعادة الأصلي' : 'Revert'}</span>
                        </button>
                      )}
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
                  <span className="hidden sm:inline">
                    {lang === 'ar' ? 'استعادة الافتراضي' : 'Reset'}
                  </span>
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
                    <span>
                      {isSaving
                        ? lang === 'ar'
                          ? 'جارِ الحفظ...'
                          : 'Saving...'
                        : lang === 'ar'
                        ? 'حفظ التعديلات سحابياً'
                        : 'Save Changes'}
                    </span>
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
