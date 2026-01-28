
export type Language = 'KR' | 'EN';
export type Page = 'home' | 'company' | 'products' | 'solutions' | 'notice' | 'ipcert' | 'contact';

export interface NavItem {
  id: Page;
  label: {
    KR: string;
    EN: string;
  };
}

export interface ProductItem {
  id: string;
  title: { KR: string; EN: string };
  subtitle: { KR: string; EN: string };
  description: { KR: string; EN: string };
  features: { KR: string[]; EN: string[] };
  details: { KR: string; EN: string };
  status?: string;
}

export interface FAQItem {
  question: { KR: string; EN: string };
  answer: { KR: string; EN: string };
}

export interface BusinessModel {
  title: { KR: string; EN: string };
  desc: { KR: string; EN: string };
}

export interface NoticeItem {
  id: number;
  date: string;
  category: { KR: string; EN: string };
  title: { KR: string; EN: string };
  isNew?: boolean;
}
