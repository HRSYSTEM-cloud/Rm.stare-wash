export interface BranchInfo {
  id: string;
  name: string;
  badgeColor: string;
  badgeLabel: string;
  district: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  embedMapQuery: string;
  isOpen24Hours: boolean;
  notes?: string;
}

export interface SocialLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconName: 'tiktok' | 'whatsapp' | 'phone' | 'instagram' | 'snapchat' | 'share' | 'globe';
  highlight?: boolean;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  desc: string;
  icon: string;
}
