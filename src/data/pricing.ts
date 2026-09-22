export interface PriceItem {
  id: string;
  nameAr: string;
  nameEn: string;
  small: number;
  medium: number;
  large: number;
  isExtra?: boolean;
}

export interface BranchPricing {
  branchId: string;
  branchNameAr: string;
  branchNameEn: string;
  noteAr: string;
  noteEn: string;
  items: PriceItem[];
}

export const PRICING_DATA: Record<string, BranchPricing> = {
  'al-rabwah': {
    branchId: 'al-rabwah',
    branchNameAr: 'فرع الربوة',
    branchNameEn: 'Al Rabwah Branch',
    noteAr: 'الأسعار شاملة ضريبة القيمة المضافة',
    noteEn: 'All prices are VAT inclusive',
    items: [
      {
        id: 'in_out',
        nameAr: 'داخلي وخارجي',
        nameEn: 'Interior & Exterior',
        small: 30,
        medium: 35,
        large: 40,
      },
      {
        id: 'in_out_undercarriage',
        nameAr: 'داخلي وخارجي وبستم',
        nameEn: 'Int., Ext. & Undercarriage',
        small: 45,
        medium: 50,
        large: 55,
      },
      {
        id: 'ext_only',
        nameAr: 'غسيل خارجي فقط',
        nameEn: 'Exterior Only',
        small: 15,
        medium: 20,
        large: 20,
      },
      {
        id: 'int_only',
        nameAr: 'غسيل داخلي فقط',
        nameEn: 'Interior Only',
        small: 15,
        medium: 20,
        large: 20,
      },
      {
        id: 'undercarriage_only',
        nameAr: 'غسيل بستم فقط',
        nameEn: 'Undercarriage (Bistem) Only',
        small: 25,
        medium: 25,
        large: 30,
      },
      {
        id: 'double_wax',
        nameAr: 'دبل شامبو واكس',
        nameEn: 'Double Wax Shampoo',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
      {
        id: 'prep_shampoo',
        nameAr: 'شامبو تحضيري',
        nameEn: 'Prep Foam Shampoo',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
      {
        id: 'floor_bags',
        nameAr: 'أكياس دعاسات إضافية',
        nameEn: 'Extra Floor Mat Bags',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
    ],
  },
  'al-qurayniyyah': {
    branchId: 'al-qurayniyyah',
    branchNameAr: 'فرع الخمرة (القرينية)',
    branchNameEn: 'Al Khamrah (Al Qurayniyyah) Branch',
    noteAr: 'الأسعار شاملة ضريبة القيمة المضافة',
    noteEn: 'All prices are VAT inclusive',
    items: [
      {
        id: 'in_out',
        nameAr: 'داخلي وخارجي',
        nameEn: 'Interior & Exterior',
        small: 25,
        medium: 30,
        large: 35,
      },
      {
        id: 'in_out_undercarriage',
        nameAr: 'داخلي وخارجي وبستم',
        nameEn: 'Int., Ext. & Undercarriage',
        small: 40,
        medium: 45,
        large: 50,
      },
      {
        id: 'ext_only',
        nameAr: 'غسيل خارجي فقط',
        nameEn: 'Exterior Only',
        small: 15,
        medium: 20,
        large: 20,
      },
      {
        id: 'int_only',
        nameAr: 'غسيل داخلي فقط',
        nameEn: 'Interior Only',
        small: 15,
        medium: 20,
        large: 20,
      },
      {
        id: 'undercarriage_only',
        nameAr: 'غسيل بستم فقط',
        nameEn: 'Undercarriage (Bistem) Only',
        small: 25,
        medium: 25,
        large: 30,
      },
      {
        id: 'double_wax',
        nameAr: 'دبل شامبو واكس',
        nameEn: 'Double Wax Shampoo',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
      {
        id: 'prep_shampoo',
        nameAr: 'شامبو تحضيري',
        nameEn: 'Prep Foam Shampoo',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
      {
        id: 'floor_bags',
        nameAr: 'أكياس دعاسات إضافية',
        nameEn: 'Extra Floor Mat Bags',
        small: 5,
        medium: 5,
        large: 5,
        isExtra: true,
      },
    ],
  },
};
