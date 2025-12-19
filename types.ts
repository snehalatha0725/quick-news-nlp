
export enum NewsCategory {
  GENERAL = 'General',
  POLITICS = 'Politics',
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  SPORTS = 'Sports',
  HEALTH = 'Health'
}

export type Language = {
  code: string;
  name: string;
};

export type Region = {
  code: string;
  name: string;
};

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
];

export const REGIONS: Region[] = [
  { code: 'in', name: 'India (National)' },
  { code: 'mumbai', name: 'Mumbai' },
  { code: 'delhi', name: 'Delhi' },
  { code: 'bengaluru', name: 'Bengaluru' },
  { code: 'hyderabad', name: 'Hyderabad' },
  { code: 'chennai', name: 'Chennai' },
  { code: 'kolkata', name: 'Kolkata' },
  { code: 'pune', name: 'Pune' },
  { code: 'ahmedabad', name: 'Ahmedabad' },
];

export interface NewsArticle {
  id: string;
  title: string;
  summary: string[];
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: NewsCategory;
  url: string;
  source: string;
  timestamp: string;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
