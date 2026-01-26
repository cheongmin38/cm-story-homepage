
export type Language = 'KR' | 'EN';

export interface NavItem {
  id: string;
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
