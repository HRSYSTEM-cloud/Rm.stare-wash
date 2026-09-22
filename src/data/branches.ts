import { BranchInfo, ServiceHighlight, SocialLink } from '../types';
import { AppCustomization, DEFAULT_CONTACTS, DEFAULT_SOCIALS } from './customization';

export const BASE_BRANCHES: BranchInfo[] = [
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
    googleReviewUrl: 'https://www.google.com/maps/search/?api=1&query=21.5791,39.1863+(مغسلة+آر+إم+ستار+فرع+الربوة+جدة)',
    embedMapQuery: 'Jeddah+Al+Rabwah+King+Fahd+Road+Yahya+Al+Moalimi',
    isOpen24Hours: true,
    notes: 'موقع حيوي وسهل الوصول، خدمة غسيل سيارات متكاملة على مدار 24 ساعة',
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
    googleReviewUrl: 'https://www.google.com/maps/search/?api=1&query=21.3655,39.2612+(مغسلة+آر+إم+ستار+فرع+القرينية+جدة)',
    embedMapQuery: 'Jeddah+Al+Qurayniyyah+Al+Sharif+Barakat+Ibn+Mohammad',
    isOpen24Hours: true,
    notes: 'أحدث معدات الغسيل السريع وغسيل البستم، مفتوح على مدار 24 ساعة',
  },
];

// Helper to format 05XXXXXXXX to 05X XXX XXXX
function formatDisplayPhone(phone: string): string {
  const clean = phone.replace(/\s+/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return clean;
}

// Generate dynamic branches merging custom saved cloud admin values
export function getDynamicBranches(customData?: AppCustomization): BranchInfo[] {
  const contacts = customData?.contacts || DEFAULT_CONTACTS;

  return BASE_BRANCHES.map((b) => {
    if (b.id === 'al-rabwah') {
      const p = contacts.rabwahPhone || b.phone;
      const w = contacts.rabwahWhatsapp || b.whatsappNumber;
      const m = contacts.rabwahMaps || b.googleMapsUrl;
      const r = contacts.rabwahReviewUrl || m;
      return {
        ...b,
        phone: p,
        displayPhone: formatDisplayPhone(p),
        whatsappNumber: w,
        googleMapsUrl: m,
        googleReviewUrl: r,
      };
    }
    if (b.id === 'al-qurayniyyah') {
      const p = contacts.qurayniyyahPhone || b.phone;
      const w = contacts.qurayniyyahWhatsapp || b.whatsappNumber;
      const m = contacts.qurayniyyahMaps || b.googleMapsUrl;
      const r = contacts.qurayniyyahReviewUrl || m;
      return {
        ...b,
        phone: p,
        displayPhone: formatDisplayPhone(p),
        whatsappNumber: w,
        googleMapsUrl: m,
        googleReviewUrl: r,
      };
    }
    return b;
  });
}

export const BRANCHES: BranchInfo[] = BASE_BRANCHES;

// Helper to build list of active social media links according to what the user configured in admin
export function getDynamicSocialLinks(customData?: AppCustomization): SocialLink[] {
  const socials = customData?.socials || DEFAULT_SOCIALS;
  const contacts = customData?.contacts || DEFAULT_CONTACTS;

  const links: SocialLink[] = [];

  // 1. TikTok
  if (socials.tiktokUrl && socials.tiktokUrl.trim() !== '') {
    links.push({
      id: 'tiktok',
      title: 'TikTok | تيك توك الرسمي',
      subtitle: '@rm.star.carwash',
      url: socials.tiktokUrl,
      iconName: 'tiktok',
      highlight: true,
    });
  }

  // 2. Snapchat
  if (socials.snapchatUrl && socials.snapchatUrl.trim() !== '') {
    links.push({
      id: 'snapchat',
      title: 'Snapchat | سناب شات',
      subtitle: 'يوميات وعروض المغسلة الحصرية',
      url: socials.snapchatUrl,
      iconName: 'snapchat',
      highlight: true,
    });
  }

  // 3. Instagram
  if (socials.instagramUrl && socials.instagramUrl.trim() !== '') {
    links.push({
      id: 'instagram',
      title: 'Instagram | انستغرام',
      subtitle: 'أحدث صور وفيديوهات الغسيل',
      url: socials.instagramUrl,
      iconName: 'instagram',
    });
  }

  // 4. X (Twitter)
  if (socials.xTwitterUrl && socials.xTwitterUrl.trim() !== '') {
    links.push({
      id: 'twitter',
      title: 'منصة إكس | X (Twitter)',
      subtitle: 'أخبار وتحديثات RM.STAR',
      url: socials.xTwitterUrl,
      iconName: 'twitter',
    });
  }

  // 5. YouTube
  if (socials.youtubeUrl && socials.youtubeUrl.trim() !== '') {
    links.push({
      id: 'youtube',
      title: 'YouTube | يوتيوب',
      subtitle: 'شروحات وفيديوهات نتائج الغسيل',
      url: socials.youtubeUrl,
      iconName: 'youtube',
    });
  }

  // 6. Facebook
  if (socials.facebookUrl && socials.facebookUrl.trim() !== '') {
    links.push({
      id: 'facebook',
      title: 'Facebook | فيسبوك',
      subtitle: 'صفحتنا الرسمية على فيسبوك',
      url: socials.facebookUrl,
      iconName: 'facebook',
    });
  }

  // 7. Telegram
  if (socials.telegramUrl && socials.telegramUrl.trim() !== '') {
    links.push({
      id: 'telegram',
      title: 'Telegram | قناة التليجرام',
      subtitle: 'تنبيهات العروض الحصرية أولاً بأول',
      url: socials.telegramUrl,
      iconName: 'telegram',
    });
  }

  // 8. WhatsApp Rabwah
  const rabwahWhatsapp = contacts.rabwahWhatsapp || DEFAULT_CONTACTS.rabwahWhatsapp;
  links.push({
    id: 'whatsapp-rabwah',
    title: 'واتساب فرع الربوة',
    subtitle: `${formatDisplayPhone(contacts.rabwahPhone || '0563364380')} — محادثة فورية`,
    url: `https://wa.me/${rabwahWhatsapp}?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D8%BA%D8%B3%D9%84%D8%A9%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D8%B1%D8%A8%D9%88%D8%A9`,
    iconName: 'whatsapp',
  });

  // 9. WhatsApp Qurayniyyah
  const qurayniyyahWhatsapp = contacts.qurayniyyahWhatsapp || DEFAULT_CONTACTS.qurayniyyahWhatsapp;
  links.push({
    id: 'whatsapp-qurayniyyah',
    title: 'واتساب فرع القرينية',
    subtitle: `${formatDisplayPhone(contacts.qurayniyyahPhone || '0548589875')} — محادثة فورية`,
    url: `https://wa.me/${qurayniyyahWhatsapp}?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D8%BA%D8%B3%D9%84%D8%A9%20RM.STAR%20%D9%81%D8%B1%D8%B9%20%D8%A7%D9%84%D9%82%D8%B1%D9%8A%D9%86%D9%8A%D8%A9`,
    iconName: 'whatsapp',
  });

  // 10. LinkTree / External Master URL
  if (socials.allLinksUrl && socials.allLinksUrl.trim() !== '' && socials.allLinksUrl !== '#') {
    links.push({
      id: 'all-links',
      title: 'RM.STAR LinkTree | صفحة الروابط الشاملة',
      subtitle: 'جميع الحسابات وروابط الفروع في مكان واحد',
      url: socials.allLinksUrl,
      iconName: 'globe',
    });
  }

  return links;
}

export const SOCIAL_LINKS: SocialLink[] = getDynamicSocialLinks();

export const SERVICES_HIGHLIGHTS: ServiceHighlight[] = [
  {
    id: 'wash',
    title: 'غسيل واش احترافي',
    desc: 'رغوة ثلجية، شامبو نانو، حماية وتلميع الكفرات والجنوط',
    icon: 'Sparkles',
  },
  {
    id: 'undercarriage',
    title: 'غسيل بستم وأسفل الهيكل',
    desc: 'تنظيف هيدروليكي قوي بضغط مرتفع لحماية الشاسيه من الرواسب',
    icon: 'Droplets',
  },
  {
    id: 'interior',
    title: 'تنظيف وتعقيم المقصورة',
    desc: 'تنظيف الأرضيات والفرش والطبلون مع تعقيم كامل',
    icon: 'Shield',
  },
  {
    id: 'express',
    title: 'خدمة سريعة 24 ساعة',
    desc: 'بدون انتظار مع طاقم محترف وجاهز على مدار الساعة',
    icon: 'Clock',
  },
];
