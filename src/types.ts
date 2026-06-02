export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  heroDesc: string;
  benefits: { title: string; desc: string }[];
  process: { step: number; title: string; desc: string }[];
  deliverables: string[];
  pricingCTA: string;
  subcategories: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  strategy: string[];
  execution: string[];
  resultsText: string;
  chartData: { label: string; current: number; previous: number }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Websites" | "Branding" | "Advertising" | "Social Media" | "Video Production";
  image: string;
  client: string;
  description: string;
  tag: string;
  results: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "SEO" | "Marketing" | "Social Media" | "AI Marketing" | "Advertising" | "Lead Generation";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  image: string;
}

export interface LeadFormInput {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budget: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
