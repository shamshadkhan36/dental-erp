export type ContentFormat = 'single' | 'carousel' | 'reel' | 'flyer';
export type ProductionFrequency = 'monthly' | 'weekly' | 'on_request';
export type PlatformType = 'instagram' | 'facebook';
export type PostStatus = 'planned' | 'draft' | 'pending_approval' | 'changes_requested' | 'approved' | 'scheduled' | 'published';

export type ContentPillar =
  | 'Educational'
  | 'Smile Makeover'
  | 'Myth vs Fact'
  | 'Doctor Spotlight'
  | 'Patient Review'
  | 'Special Offer';

export interface ICPProfile {
  id: string;
  name: string;
  targetDemographic: string;
  painPoints: string[];
  recommendedTreatments: string[];
  preferredTone: string;
}

export interface DentalTreatment {
  id: string;
  name: string;
  category: 'Cosmetic' | 'Restorative' | 'Preventive' | 'Orthodontics' | 'Surgical';
  usp: string;
  typicalDuration: string;
  pricingNote?: string;
}

export interface BrandProfile {
  clinicName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  website: string;
  brandVoice: string;
  keyPhrases: string[];
  prohibitedTerms: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string;
  gdriveRootFolder: string;
  icpProfiles: ICPProfile[];
  treatments: DentalTreatment[];
  ctaTemplates: string[];
  systemPrompt: string;
}

export interface CalendarItem {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  timeSlot: string;
  topic: string;
  pillar: ContentPillar;
  format: ContentFormat;
  platforms: PlatformType[];
  targetTreatmentId: string;
  targetIcpId: string;
  status: PostStatus;
  contentRecordId?: string;
}

export interface CarouselSlide {
  slideNumber: number;
  badge?: string;
  title: string;
  bodyText: string;
  visualCue: string;
}

export interface ReelScript {
  hookDuration: string;
  hookVisual: string;
  hookAudio: string;
  scenes: Array<{
    second: string;
    action: string;
    onScreenText: string;
    voiceover: string;
  }>;
  audioTrackSuggestion: string;
}

export interface QCResult {
  passed: boolean;
  score: number; // 0 - 100
  dimensionsValid: boolean;
  logoPresent: boolean;
  brandColorsUsed: boolean;
  ctaPresent: boolean;
  disclaimerCompliant: boolean;
  checks: Array<{
    rule: string;
    passed: boolean;
    message: string;
  }>;
}

export interface ContentRecord {
  id: string;
  calendarItemId?: string;
  title: string;
  format: ContentFormat;
  frequencyMode: ProductionFrequency;
  platforms: PlatformType[];
  treatmentId: string;
  treatmentName: string;
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
  carouselSlides?: CarouselSlide[];
  reelScript?: ReelScript;
  status: PostStatus;
  approvalNotes?: string;
  revisionHistory?: Array<{ date: string; note: string; author: string }>;
  qcResults?: QCResult;
  creativeAssetUrl?: string;
  gdriveAssetLink?: string;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  author: string;
}

export interface FlyerRecord {
  id: string;
  campaignTitle: string;
  headline: string;
  subheadline: string;
  offerBadge: string;
  bulletPoints: string[];
  termsAndConditions: string;
  validUntil: string;
  contactNumber: string;
  clinicAddress: string;
  templateStyle: 'modern_clinical' | 'premium_aesthetic' | 'family_friendly' | 'urgent_care';
  accentColor: string;
  status: 'draft' | 'pending_approval' | 'approved';
  downloadUrl?: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalPosts: number;
  totalScheduled: number;
  totalApproved: number;
  totalPending: number;
  avgEngagementRate: number;
  patientInquiries: number;
  estimatedRevenuePipeline: number;
  platformSplit: { instagram: number; facebook: number };
  topConvertingTreatments: Array<{ name: string; inquiries: number; reach: number }>;
  recentPublishedPosts: Array<{
    id: string;
    title: string;
    date: string;
    platform: PlatformType;
    likes: number;
    shares: number;
    comments: number;
    inquiries: number;
  }>;
  aiRecommendations: string[];
}
