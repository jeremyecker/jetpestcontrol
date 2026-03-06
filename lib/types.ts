export interface Town {
  name: string;
  slug: string;
  county?: string;
  countySlug?: string;
}

export interface CountyGroup {
  county: string;
  countySlug: string;
  towns: Town[];
}

export interface TownData {
  regions: {
    regionSlug: string;
    county: string;
    state: string;
    stateCode: string;
    towns: { name: string; slug: string }[];
  }[];
  totalTowns: number;
}

export interface Service {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  zip: string;
  pest_type: string;
  email?: string;
  description?: string;
  sms_consent: boolean;
  page_url: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  turnstile_token: string;
  honeypot?: string;
  form_started_at: number;
}

export interface LeadSubmission {
  site_id: string;
  name: string;
  phone: string;
  email: string | null;
  zip_code: string;
  pest_type: string;
  description: string | null;
  sms_consent: boolean;
  page_url: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
