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

export interface AppCustomization {
  logoUrl?: string; // custom uploaded or external image url
  heroTitleAr?: string;
  heroTitleEn?: string;
  heroSubtitleAr?: string;
  heroSubtitleEn?: string;
  offers: AppOffer[];
}

const STORAGE_KEY = 'rm_star_custom_data_v1';

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

export function getStoredCustomization(): AppCustomization {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load custom data', e);
  }
  return {
    logoUrl: '',
    offers: DEFAULT_OFFERS,
  };
}

export function saveStoredCustomization(data: AppCustomization): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save custom data', e);
  }
}
