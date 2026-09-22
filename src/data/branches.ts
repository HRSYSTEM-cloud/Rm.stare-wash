import { BranchInfo, ServiceHighlight, SocialLink } from '../types';

export const BRANCHES: BranchInfo[] = [
  {
    id: 'al-rabwah',
    name: 'فرع الربوة — جدة',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
    badgeLabel: '🔴 فرع الربوة',
    district: 'حي الربوة',
    city: 'جدة',
    postalCode: '23533',
    streetAddress: 'تقاطع طريق الملك فهد (الستين) مع شارع يحيى المعلمي، حي الربوة',
    phone: '0563364380',
    displayPhone: '056 336 4380',
    whatsappNumber: '966563364380',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=21.5791,39.1863+(مغسلة+آر+إم+ستار+فرع+الربوة+جدة)',
    embedMapQuery: 'Jeddah+Al+Rabwah+King+Fahd+Road+Yahya+Al+Moalimi',
    isOpen24Hours: true,
    notes: 'موقع حيوي وسهل الوصول، خدمة غسيل وتلميع على مدار 24 ساعة',
  },
  {
    id: 'al-qurayniyyah',
    name: 'فرع القرينية — جدة',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    badgeLabel: '🔵 فرع القرينية',
    district: 'حي القرينية',
    city: 'جدة',
    postalCode: '22535',
    streetAddress: 'شارع الشريف بركات ابن محمد، حي القرينية',
    phone: '0548589875',
    displayPhone: '054 858 9875',
    whatsappNumber: '966548589875',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=21.3655,39.2612+(مغسلة+آر+إم+ستار+فرع+القرينية+جدة)',
    embedMapQuery: 'Jeddah+Al+Qurayniyyah+Al+Sharif+Barakat+Ibn+Mohammad',
    isOpen24Hours: true,
    notes: 'أحدث معدات الغسيل السريع والتلميع الاحترافي، مفتوح على مدار 24 ساعة',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'tiktok',
    title: 'TikTok | تيك توك الرسمي',
    subtitle: '@rm.star.carwash',
    url: 'https://www.tiktok.com/@rm.star.carwash',
    iconName: 'tiktok',
    highlight: true,
  },
  {
    id: 'whatsapp-rabwah',
    title: 'واتساب فرع الربوة',
    subtitle: '056 336 4380 — محادثة فورية',
    url: 'https://wa.me/966563364380?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D8%BA%D8%B3%D9%84%D8%A9%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D8%B1%D8%A8%D9%88%D8%A9',
    iconName: 'whatsapp',
  },
  {
    id: 'whatsapp-qurayniyyah',
    title: 'واتساب فرع القرينية',
    subtitle: '054 858 9875 — محادثة فورية',
    url: 'https://wa.me/966548589875?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D8%BA%D8%B3%D9%84%D8%A9%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D9%82%D8%B1%D9%8A%D9%86%D9%8A%D8%A9',
    iconName: 'whatsapp',
  },
  {
    id: 'all-links',
    title: 'RM.STAR Official LinkTree',
    subtitle: 'جميع حساباتنا وروابطنا الرسمية',
    url: '#',
    iconName: 'globe',
  },
];

export const SERVICES_LIST: ServiceHighlight[] = [
  {
    id: 'wash',
    title: 'غسيل ساطع وتفصيلي',
    desc: 'تنظيف عميق بالرغوة الفعالة وتجفيف فائق العناية',
    icon: 'Sparkles',
  },
  {
    id: 'polish',
    title: 'تلميع واعتناء بالهيكل',
    desc: 'إزالة الخدوش السطحية وإعادة اللمعان الوكالة',
    icon: 'Shield',
  },
  {
    id: 'interior',
    title: 'تنظيف وتعقيم داخلي',
    desc: 'تنظيف المراتب والفرش بأحدث أجهزة البخار والتعطير',
    icon: 'Car',
  },
  {
    id: 'nano',
    title: 'حماية وعزل مائي',
    desc: 'طبقات حماية ضد الأتربة والبهتان وأشعة الشمس',
    icon: 'Zap',
  },
];
