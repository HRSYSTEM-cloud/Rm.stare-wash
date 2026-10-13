import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BranchPricing, DEFAULT_PRICING_DATA } from './pricing';
import { GoogleReviewItem, VERIFIED_GOOGLE_REVIEWS } from './reviews';

export interface AppOffer {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  tagAr: string;
  tagEn: string;
  active: boolean;
  code?: string;
}

export interface SocialMediaAccounts {
  tiktokUrl?: string;
  snapchatUrl?: string;
  instagramUrl?: string;
  xTwitterUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  allLinksUrl?: string;
}

export interface BranchContactsConfig {
  rabwahPhone?: string;
  rabwahWhatsapp?: string;
  rabwahMaps?: string;
  rabwahReviewUrl?: string;
  qurayniyyahPhone?: string;
  qurayniyyahWhatsapp?: string;
  qurayniyyahMaps?: string;
  qurayniyyahReviewUrl?: string;
}

export interface AppCompetition {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  prizeAr: string;
  prizeEn: string;
  badgeAr?: string;
  badgeEn?: string;
  active: boolean;
  linkUrl?: string;
  endDate?: string;
  termsAr?: string;
  termsEn?: string;
}

export interface FreeServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  iconName: string;
  badgeAr?: string;
  badgeEn?: string;
  active: boolean;
}

export interface LoyaltyCardConfig {
  enabled: boolean;
  titleAr: string;
  titleEn: string;
  headlineAr: string; // '4 غسلات والخامسة مجانًا'
  headlineEn: string;
  subheadlineAr: string; // 'بطاقة ولاء خاصة لعملائنا الدائمين'
  subheadlineEn: string;
  targetUrl: string; // 'https://loyapro.com/c-r/ODM1MA=='
  customQrUrl?: string;
  noteAr?: string;
  noteEn?: string;
  completedCount: number; // 4
  totalCount: number; // 5
}

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
  category?: 'wash' | 'detailing' | 'steam' | 'facility' | 'all';
  date?: string;
}

export interface AppCustomization {
  logoUrl?: string;
  backgroundImageUrl?: string; // Custom wallpaper image from Admin
  backgroundOverlayOpacity?: number; // 0 to 100
  heroTitleAr?: string;
  heroTitleEn?: string;
  heroSubtitleAr?: string;
  heroSubtitleEn?: string;
  offers: AppOffer[];
  contacts?: BranchContactsConfig;
  socials?: SocialMediaAccounts;
  pricing?: Record<string, BranchPricing>;
  elfsightWidgetId?: string;
  elfsightRabwahWidgetId?: string;
  elfsightQurayniyyahWidgetId?: string;
  showReviewsTab?: boolean;
  showCompetitionsTab?: boolean;
  competitions?: AppCompetition[];
  reviews?: GoogleReviewItem[];
  showWelcomeMessage?: boolean;
  welcomeTitleAr?: string;
  welcomeTitleEn?: string;
  welcomeTextAr?: string;
  welcomeTextEn?: string;

  // New features requested by user
  loyaltyCard?: LoyaltyCardConfig;
  freeServices?: FreeServiceItem[];
  showGalleryTab?: boolean;
  galleryItems?: GalleryMediaItem[];
}

const STORAGE_KEY = 'rm_star_custom_data_v9';

export const DEFAULT_RABWAH_ELFSIGHT_ID = '6a74526d-7ee8-4500-9bc9-1b2a0569bb43';
export const DEFAULT_QURAYNIYYAH_ELFSIGHT_ID = 'cb00da1a-f1b5-47e5-9c18-df41e993a59a';
export const DEFAULT_ELFSIGHT_WIDGET_ID = DEFAULT_RABWAH_ELFSIGHT_ID;

export function isValidElfsightId(id: string | undefined): boolean {
  if (!id) return false;
  const clean = id.replace(/^elfsight-app-/, '').trim();
  // Valid Elfsight widget IDs are UUIDs or alphanumeric identifiers between 16 and 40 characters
  // They NEVER contain protocol schemes (http/https), slashes, query params, dots, or spaces
  if (
    clean.includes('http://') ||
    clean.includes('https://') ||
    clean.includes('google.com') ||
    clean.includes('writereview') ||
    clean.includes('placeid') ||
    clean.includes('/') ||
    clean.includes('?') ||
    clean.includes('.') ||
    clean.includes(' ') ||
    clean.length < 10
  ) {
    return false;
  }
  return /^[0-9a-zA-Z_-]{10,50}$/.test(clean);
}

export function sanitizeElfsightId(id: string | undefined, defaultId: string = DEFAULT_RABWAH_ELFSIGHT_ID): string {
  if (!id) return defaultId;
  const clean = id.replace(/^elfsight-app-/, '').trim();
  if (isValidElfsightId(clean)) {
    return clean;
  }
  return defaultId;
}

export const DEFAULT_WELCOME_TITLE_AR = 'يا هلا ومرحباً بك في مغسلة نجمة آر إم 🌟';
export const DEFAULT_WELCOME_TITLE_EN = 'Welcome to RM Star Car Wash 🌟';
export const DEFAULT_WELCOME_TEXT_AR =
  'سيارتك تستاهل تلمع من جديد! فريقنا جاهز لخدمتك على مدار 24 ساعة في فرعي الربوة والقرينية. تواصل معنا مباشرة لأي استفسار أو لخدمتك فوراً.';
export const DEFAULT_WELCOME_TEXT_EN =
  'Your car deserves to shine! Our team is ready to serve you 24/7 at Al Rabwah & Al Qurayniyyah branches. Contact us directly for any inquiry or instant service.';

export const DEFAULT_LOYALTY_CARD: LoyaltyCardConfig = {
  enabled: true,
  titleAr: 'بطاقة الولاء',
  titleEn: 'Loyalty Pass',
  headlineAr: '4 غسلات والخامسة مجانًا',
  headlineEn: '4 Washes, 5th is FREE',
  subheadlineAr: 'بطاقة ولاء خاصة لعملائنا الدائمين',
  subheadlineEn: 'Exclusive digital pass for our regular customers',
  targetUrl: 'https://loyapro.com/c-r/ODM1MA==',
  customQrUrl: '',
  noteAr: 'امسح الباركود بكاميرا الجوال أو اضغط هنا للإضافة إلى المحفظة مباشرة',
  noteEn: 'Scan the barcode or tap to add directly to Apple / Google Wallet',
  completedCount: 4,
  totalCount: 5,
};

export const DEFAULT_FREE_SERVICES: FreeServiceItem[] = [
  {
    id: 'free-steam',
    titleAr: 'تعقيم دورة المكيف بالبخار مجاناً',
    titleEn: 'Free A/C Steam Sanitization',
    descAr: 'بخار نانو عالي الحرارة لتعقيم فتحات ومجاري التكييف وإزالة الروائح الكريهة والبكتيريا تماماً.',
    descEn: 'High-temp steam sanitization killing bacteria and freshening A/C ducts.',
    iconName: 'steam',
    badgeAr: 'مجاناً مع كل غسيل',
    badgeEn: 'Free with any wash',
    active: true,
  },
  {
    id: 'free-floor-mats',
    titleAr: 'تكييس الدعاسات الأمامية مجاناً',
    titleEn: 'Free Front Floor Mats Bagging',
    descAr: 'تغليف بلاستيكي واقي وسميك لدعاسات السائق والراكب لحمايتها من الأتربة بعد الغسيل.',
    descEn: 'Protective plastic wraps for front floor mats to maintain clean floors.',
    iconName: 'mats',
    badgeAr: 'حماية إضافية',
    badgeEn: 'Extra Protection',
    active: true,
  },
  {
    id: 'free-gear-controls',
    titleAr: 'تكييس عصا القير والفليشر والمساحات مجاناً',
    titleEn: 'Free Controls & Gear Shifter Bagging',
    descAr: 'تكييس وقائي لعصا القير وأذرع الإشارات والمساحات للمحافظة على نظافة الأجزاء الحساسة.',
    descEn: 'Protective plastic sleeves for gear shift knob, indicators & wiper stalks.',
    iconName: 'gear',
    badgeAr: 'عناية فائقة',
    badgeEn: 'Special Care',
    active: true,
  },
  {
    id: 'free-air-freshener',
    titleAr: 'فواحة بشعار المغسلة مجاناً',
    titleEn: 'Free RM.STAR Air Freshener',
    descAr: 'معطر جو أنيق يحمل هوية وشعار المغسلة برائحة منعشة تدوم طويلاً داخل مقصورة السيارة.',
    descEn: 'Signature RM.STAR branded car air freshener with lasting fragrance.',
    iconName: 'freshener',
    badgeAr: 'هدية مجانية',
    badgeEn: 'Free Gift',
    active: true,
  },
  {
    id: 'free-tissues',
    titleAr: 'مناديل مجاناً',
    titleEn: 'Free Car Tissue Box',
    descAr: 'علبة مناديل ناعمة فاخرة توضع في سيارتك بعد انتهاء الغسيل.',
    descEn: 'Complimentary premium tissue box placed inside your vehicle.',
    iconName: 'tissues',
    badgeAr: 'هدية راقية',
    badgeEn: 'Complimentary',
    active: true,
  },
  {
    id: 'free-shampoo-chemical',
    titleAr: 'شامبو لايف لاينز + كيميكال الجنوط والكفرات والبطانات',
    titleEn: 'Lifelines Shampoo + Chemical Rim & Tire Detailing',
    descAr: 'نستخدم شامبو لايف لاينز (Lifelines) الأصلي عالي الرغوة واللمعان، مع كيميكال متخصص لإزالة سواد الفرامل وتلميع الجنوط، الكفرات وبطانات الرفارف.',
    descEn: 'Original Lifelines snow foam shampoo plus specialized chemical detailing for rims, tires & wheel wells with every wash.',
    iconName: 'chemical',
    badgeAr: 'المواد المعتمدة',
    badgeEn: 'Certified Products',
    active: true,
  },
];

export const DEFAULT_GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: 'gal-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'رغوة شامبو لايف لاينز الكثيفة',
    titleEn: 'Lifelines Snow Foam Wash',
    descAr: 'تغطية كاملة للسيارة برغوة نانو شامبو لايف لاينز لتفكيك الأوساخ وحماية الطلاء.',
    descEn: 'Full vehicle coverage with Lifelines snow foam protecting paintwork.',
    category: 'wash',
  },
  {
    id: 'gal-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'تنظيف وتلميع الجنوط والكفرات بالكيميكال',
    titleEn: 'Chemical Wheel & Rim Detailing',
    descAr: 'إزالة سواد وتكلسات الفرامل وتلميع عميق للجنوط والبطانات.',
    descEn: 'Deep brake dust removal and high gloss tire dressing.',
    category: 'detailing',
  },
  {
    id: 'gal-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'تعقيم مجاري التكييف بالبخار الحار',
    titleEn: 'A/C High-Temp Steam Sanitization',
    descAr: 'القضاء على البكتيريا والفطريات وتعقيم الهواء الداخلي للمركبة.',
    descEn: 'Eliminating bacteria and refreshing cabin air ducts.',
    category: 'steam',
  },
  {
    id: 'gal-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'تكييس الدعاسات والقير وعصا التحكم',
    titleEn: 'Interior Protective Bagging',
    descAr: 'حماية فائقة للدعاسات والمقود ومقابض التحكم بعد انتهاء الغسيل والتجفيف.',
    descEn: 'Thorough interior protection for mats, gear stick and handles.',
    category: 'detailing',
  },
  {
    id: 'gal-5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'لمعان ونظافة فائقة لسيارات عملائنا',
    titleEn: 'Pristine Shine & Gloss',
    descAr: 'نتائج غسيل استثنائية تعيد لسيارتك بريق الوكالة في فرعي الربوة والقرينية.',
    descEn: 'Mirror finish quality at Al Rabwah & Al Qurayniyyah branches.',
    category: 'wash',
  },
  {
    id: 'gal-6',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    titleAr: 'تجربة الغسيل الشامل في مغسلة آر إم ستار',
    titleEn: 'RM.STAR Premium Wash Experience',
    descAr: 'جولة سريعة توضح دقة وسرعة طاقم العمل واستخدام أجود الخامات الأصلية.',
    descEn: 'A showcase of our skilled crew in action with premium formulas.',
    category: 'facility',
  },
];

export const DEFAULT_OFFERS: AppOffer[] = [
  {
    id: 'offer-1',
    titleAr: 'عرض غسيل + واكس مجاني',
    titleEn: 'Wash + Free Spray Wax',
    descAr: 'احصل على طبقة واكس حماية مجاناً مع كل غسيل بستم أو داخلي وخارجي كامل.',
    descEn: 'Get free protective spray wax with every full in/out wash.',
    tagAr: 'عرض مميز',
    tagEn: 'Special Offer',
    active: true,
    code: 'RMSTAR2026',
  },
  {
    id: 'offer-2',
    titleAr: 'خصم أوقات الصباح (24 ساعة)',
    titleEn: 'Morning Wash Discount (24/7)',
    descAr: 'خدمة سريعة بدون انتظار من 5 صباحاً حتى 12 ظهراً في فرعي الربوة والقرينية.',
    descEn: 'Fast lane with no waiting from 5 AM to 12 PM in Rabwah & Khumrah.',
    tagAr: 'خدمة سريعة',
    tagEn: 'Fast Lane',
    active: true,
  },
];

export const DEFAULT_CONTACTS: BranchContactsConfig = {
  rabwahPhone: '0563364380',
  rabwahWhatsapp: '966563364380',
  rabwahMaps: 'https://www.google.com/maps/search/?api=1&query=21.5791,39.1863+(مغسلة+آر+إم+ستار+فرع+الربوة+جدة)',
  rabwahReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJFQt3sEDRwxUR9NukTd-8i-g',
  qurayniyyahPhone: '0548589875',
  qurayniyyahWhatsapp: '966548589875',
  qurayniyyahMaps: 'https://www.google.com/maps/search/?api=1&query=21.3655,39.2612+(مغسلة+آر+إم+ستار+فرع+القرينية+جدة)',
  qurayniyyahReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJRyxq0IK1wxURJXs0rVcCHss',
};

export const DEFAULT_SOCIALS: SocialMediaAccounts = {
  tiktokUrl: 'https://www.tiktok.com/@rm.star.carwash',
  snapchatUrl: '',
  instagramUrl: '',
  xTwitterUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
  telegramUrl: '',
  allLinksUrl: '',
};

export function getLocalStoredCustomization(): AppCustomization {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        logoUrl: parsed.logoUrl || '',
        backgroundImageUrl: parsed.backgroundImageUrl || '',
        backgroundOverlayOpacity: parsed.backgroundOverlayOpacity !== undefined ? parsed.backgroundOverlayOpacity : 85,
        offers: parsed.offers || DEFAULT_OFFERS,
        contacts: { ...DEFAULT_CONTACTS, ...(parsed.contacts || {}) },
        socials: { ...DEFAULT_SOCIALS, ...(parsed.socials || {}) },
        pricing: parsed.pricing || DEFAULT_PRICING_DATA,
        elfsightWidgetId: sanitizeElfsightId(parsed.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID),
        elfsightRabwahWidgetId: sanitizeElfsightId(parsed.elfsightRabwahWidgetId, DEFAULT_RABWAH_ELFSIGHT_ID),
        elfsightQurayniyyahWidgetId: sanitizeElfsightId(parsed.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID),
        showReviewsTab: parsed.showReviewsTab !== undefined ? parsed.showReviewsTab : true,
        showCompetitionsTab: parsed.showCompetitionsTab !== undefined ? parsed.showCompetitionsTab : true,
        competitions: parsed.competitions || [],
        reviews: parsed.reviews || VERIFIED_GOOGLE_REVIEWS,
        showWelcomeMessage: parsed.showWelcomeMessage !== undefined ? parsed.showWelcomeMessage : true,
        welcomeTitleAr: parsed.welcomeTitleAr !== undefined ? parsed.welcomeTitleAr : DEFAULT_WELCOME_TITLE_AR,
        welcomeTitleEn: parsed.welcomeTitleEn !== undefined ? parsed.welcomeTitleEn : DEFAULT_WELCOME_TITLE_EN,
        welcomeTextAr: parsed.welcomeTextAr !== undefined ? parsed.welcomeTextAr : DEFAULT_WELCOME_TEXT_AR,
        welcomeTextEn: parsed.welcomeTextEn !== undefined ? parsed.welcomeTextEn : DEFAULT_WELCOME_TEXT_EN,
        loyaltyCard: parsed.loyaltyCard ? { ...DEFAULT_LOYALTY_CARD, ...parsed.loyaltyCard } : DEFAULT_LOYALTY_CARD,
        freeServices: parsed.freeServices || DEFAULT_FREE_SERVICES,
        showGalleryTab: parsed.showGalleryTab !== undefined ? parsed.showGalleryTab : true,
        galleryItems: parsed.galleryItems || DEFAULT_GALLERY_ITEMS,
      };
    }
  } catch (e) {
    console.error('Failed to load local custom data', e);
  }
  return {
    logoUrl: '',
    backgroundImageUrl: '',
    backgroundOverlayOpacity: 85,
    offers: DEFAULT_OFFERS,
    contacts: DEFAULT_CONTACTS,
    socials: DEFAULT_SOCIALS,
    pricing: DEFAULT_PRICING_DATA,
    elfsightWidgetId: DEFAULT_ELFSIGHT_WIDGET_ID,
    elfsightRabwahWidgetId: DEFAULT_RABWAH_ELFSIGHT_ID,
    elfsightQurayniyyahWidgetId: DEFAULT_QURAYNIYYAH_ELFSIGHT_ID,
    showReviewsTab: true,
    showCompetitionsTab: true,
    competitions: [],
    reviews: VERIFIED_GOOGLE_REVIEWS,
    showWelcomeMessage: true,
    welcomeTitleAr: DEFAULT_WELCOME_TITLE_AR,
    welcomeTitleEn: DEFAULT_WELCOME_TITLE_EN,
    welcomeTextAr: DEFAULT_WELCOME_TEXT_AR,
    welcomeTextEn: DEFAULT_WELCOME_TEXT_EN,
    loyaltyCard: DEFAULT_LOYALTY_CARD,
    freeServices: DEFAULT_FREE_SERVICES,
    showGalleryTab: true,
    galleryItems: DEFAULT_GALLERY_ITEMS,
  };
}

export function saveLocalStoredCustomization(data: AppCustomization): void {
  try {
    // Keep local cache lightweight for maximum initial load performance
    const lightweight = {
      ...data,
      galleryItems: (data.galleryItems || []).map((item) => ({
        ...item,
        // If an item accidentally had a massive base64 payload, don't bloat localStorage
        url: item.url?.startsWith('data:') && item.url.length > 250000 ? '' : item.url,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
  } catch (e) {
    console.warn('LocalStorage save skipped (quota protection):', e);
  }
}

// Firebase Cloud Persistence Sync
export async function fetchCloudCustomization(): Promise<AppCustomization> {
  try {
    const docRef = doc(db, 'settings', 'customization');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as AppCustomization;
      const rabwahReviewLink =
        data.contacts?.rabwahReviewUrl ||
        (data.elfsightRabwahWidgetId?.includes('google.com') ? data.elfsightRabwahWidgetId : DEFAULT_CONTACTS.rabwahReviewUrl);
      const qurayniyyahReviewLink =
        data.contacts?.qurayniyyahReviewUrl ||
        (data.elfsightQurayniyyahWidgetId?.includes('google.com') ? data.elfsightQurayniyyahWidgetId : DEFAULT_CONTACTS.qurayniyyahReviewUrl);

      const merged: AppCustomization = {
        logoUrl: data.logoUrl || '',
        backgroundImageUrl: data.backgroundImageUrl || '',
        backgroundOverlayOpacity: data.backgroundOverlayOpacity !== undefined ? data.backgroundOverlayOpacity : 85,
        offers: data.offers || DEFAULT_OFFERS,
        contacts: {
          ...DEFAULT_CONTACTS,
          ...(data.contacts || {}),
          rabwahReviewUrl: rabwahReviewLink,
          qurayniyyahReviewUrl: qurayniyyahReviewLink,
        },
        socials: { ...DEFAULT_SOCIALS, ...(data.socials || {}) },
        pricing: data.pricing || DEFAULT_PRICING_DATA,
        elfsightWidgetId: sanitizeElfsightId(data.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID),
        elfsightRabwahWidgetId: sanitizeElfsightId(data.elfsightRabwahWidgetId, DEFAULT_RABWAH_ELFSIGHT_ID),
        elfsightQurayniyyahWidgetId: sanitizeElfsightId(data.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID),
        showReviewsTab: data.showReviewsTab !== undefined ? data.showReviewsTab : true,
        showCompetitionsTab: data.showCompetitionsTab !== undefined ? data.showCompetitionsTab : true,
        competitions: data.competitions || [],
        reviews: data.reviews || VERIFIED_GOOGLE_REVIEWS,
        showWelcomeMessage: data.showWelcomeMessage !== undefined ? data.showWelcomeMessage : true,
        welcomeTitleAr: data.welcomeTitleAr !== undefined ? data.welcomeTitleAr : DEFAULT_WELCOME_TITLE_AR,
        welcomeTitleEn: data.welcomeTitleEn !== undefined ? data.welcomeTitleEn : DEFAULT_WELCOME_TITLE_EN,
        welcomeTextAr: data.welcomeTextAr !== undefined ? data.welcomeTextAr : DEFAULT_WELCOME_TEXT_AR,
        welcomeTextEn: data.welcomeTextEn !== undefined ? data.welcomeTextEn : DEFAULT_WELCOME_TEXT_EN,
        loyaltyCard: data.loyaltyCard ? { ...DEFAULT_LOYALTY_CARD, ...data.loyaltyCard } : DEFAULT_LOYALTY_CARD,
        freeServices: data.freeServices || DEFAULT_FREE_SERVICES,
        showGalleryTab: data.showGalleryTab !== undefined ? data.showGalleryTab : true,
        galleryItems: data.galleryItems || DEFAULT_GALLERY_ITEMS,
      };
      saveLocalStoredCustomization(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Could not fetch from Firebase Firestore, using cached/default:', err);
  }
  return getLocalStoredCustomization();
}

export async function saveCloudCustomization(data: AppCustomization): Promise<void> {
  const cleaned: AppCustomization = {
    ...data,
    elfsightWidgetId: sanitizeElfsightId(data.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID),
    elfsightRabwahWidgetId: sanitizeElfsightId(data.elfsightRabwahWidgetId, DEFAULT_RABWAH_ELFSIGHT_ID),
    elfsightQurayniyyahWidgetId: sanitizeElfsightId(data.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID),
  };
  saveLocalStoredCustomization(cleaned);
  try {
    const docRef = doc(db, 'settings', 'customization');
    await setDoc(docRef, {
      ...cleaned,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.error('Failed to save to Firebase Firestore:', err);
    throw err;
  }
}

// Real-time listener for Firestore changes across devices and visitors
export function subscribeToCustomization(callback: (data: AppCustomization) => void) {
  try {
    const docRef = doc(db, 'settings', 'customization');
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as AppCustomization;
          const rabwahReviewLink =
            data.contacts?.rabwahReviewUrl ||
            (data.elfsightRabwahWidgetId?.includes('google.com') ? data.elfsightRabwahWidgetId : DEFAULT_CONTACTS.rabwahReviewUrl);
          const qurayniyyahReviewLink =
            data.contacts?.qurayniyyahReviewUrl ||
            (data.elfsightQurayniyyahWidgetId?.includes('google.com') ? data.elfsightQurayniyyahWidgetId : DEFAULT_CONTACTS.qurayniyyahReviewUrl);

          const merged: AppCustomization = {
            logoUrl: data.logoUrl || '',
            backgroundImageUrl: data.backgroundImageUrl || '',
            backgroundOverlayOpacity: data.backgroundOverlayOpacity !== undefined ? data.backgroundOverlayOpacity : 85,
            offers: data.offers || DEFAULT_OFFERS,
            contacts: {
              ...DEFAULT_CONTACTS,
              ...(data.contacts || {}),
              rabwahReviewUrl: rabwahReviewLink,
              qurayniyyahReviewUrl: qurayniyyahReviewLink,
            },
            socials: { ...DEFAULT_SOCIALS, ...(data.socials || {}) },
            pricing: data.pricing || DEFAULT_PRICING_DATA,
            elfsightWidgetId: sanitizeElfsightId(data.elfsightWidgetId, DEFAULT_ELFSIGHT_WIDGET_ID),
            elfsightRabwahWidgetId: sanitizeElfsightId(data.elfsightRabwahWidgetId, DEFAULT_RABWAH_ELFSIGHT_ID),
            elfsightQurayniyyahWidgetId: sanitizeElfsightId(data.elfsightQurayniyyahWidgetId, DEFAULT_QURAYNIYYAH_ELFSIGHT_ID),
            showReviewsTab: data.showReviewsTab !== undefined ? data.showReviewsTab : true,
            showCompetitionsTab: data.showCompetitionsTab !== undefined ? data.showCompetitionsTab : true,
            competitions: data.competitions || [],
            reviews: data.reviews || VERIFIED_GOOGLE_REVIEWS,
            showWelcomeMessage: data.showWelcomeMessage !== undefined ? data.showWelcomeMessage : true,
            welcomeTitleAr: data.welcomeTitleAr !== undefined ? data.welcomeTitleAr : DEFAULT_WELCOME_TITLE_AR,
            welcomeTitleEn: data.welcomeTitleEn !== undefined ? data.welcomeTitleEn : DEFAULT_WELCOME_TITLE_EN,
            welcomeTextAr: data.welcomeTextAr !== undefined ? data.welcomeTextAr : DEFAULT_WELCOME_TEXT_AR,
            welcomeTextEn: data.welcomeTextEn !== undefined ? data.welcomeTextEn : DEFAULT_WELCOME_TEXT_EN,
            loyaltyCard: data.loyaltyCard ? { ...DEFAULT_LOYALTY_CARD, ...data.loyaltyCard } : DEFAULT_LOYALTY_CARD,
            freeServices: data.freeServices || DEFAULT_FREE_SERVICES,
            showGalleryTab: data.showGalleryTab !== undefined ? data.showGalleryTab : true,
            galleryItems: data.galleryItems || DEFAULT_GALLERY_ITEMS,
          };
          saveLocalStoredCustomization(merged);
          callback(merged);
        }
      },
      (err) => {
        console.warn('Realtime subscription fallback:', err);
      }
    );
  } catch (err) {
    console.warn('Could not attach Firestore onSnapshot:', err);
    return () => {};
  }
}
