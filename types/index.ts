export type ContentFormat = 'single' | 'carousel' | 'reel' | 'flyer' | 'story' | 'wallpaper';
export type ProductionFrequency = 'monthly' | 'weekly' | 'on_request';
export type PlatformType = 'instagram' | 'facebook' | 'youtube';
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
  age: string; // Patient Age range requested by client
  targetDemographic: string;
  painPoints: string[]; // Functional & aesthetic anxieties
  objections: string[]; // Patient hesitations (cost, fear, time)
  motivations: string[]; // Driving reasons to seek care
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

export interface DentalOffer {
  id: string;
  title: string;
  treatmentId: string;
  treatmentName: string;
  discountValue: string;
  promoCode: string;
  validUntil: string;
  terms: string;
  ctaText: string;
  status: 'active' | 'scheduled' | 'expired';
}

export interface BrandPersona {
  archetype: 'Clinical Authority' | 'Empathetic Healer' | 'Cosmetic Visionary' | 'Family Guardian';
  communicationStyle: string;
  targetEmotions: string[];
  formalityLevel: 'Professional Clinical' | 'Warm & Conversational' | 'Luxurious & High-End';
}

export interface CreditUsage {
  aiCopyCredits: { used: number; total: number };
  videoCredits: { used: number; total: number };
  graphicCredits: { used: number; total: number };
  storageGb: { used: number; total: number };
  planName: string;
  renewalDate: string;
}

export interface DentistVerification {
  fullName: string;
  stateCouncilName: string;
  registrationNumber: string;
  dciId?: string; // DCI / National Dental Register (NDR) ID
  registrationYear: string;
  status: 'verified' | 'pending' | 'unverified' | 're_verification_due';
  lastVerifiedAt?: string;
  nextReVerificationDate?: string;
  photoIdName?: string;
  photoIdVerified?: boolean;
  activeStatusConfirmed?: boolean;
  registrySource?: string;
  selfieMatchVerified?: boolean;
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
  brandPersona: BrandPersona;
  keyPhrases: string[];
  prohibitedTerms: string[];
  primaryColor: string; // #4f98db
  secondaryColor: string; // #333333
  accentColor: string; // #e97538 (CTA Highlight)
  fontFamily: string;
  logoUrl: string;
  gdriveRootFolder: string;
  icpProfiles: ICPProfile[];
  treatments: DentalTreatment[];
  offers: DentalOffer[];
  ctaTemplates: string[];
  systemPrompt: string;
  dentistVerification?: DentistVerification;
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
  videoSource?: 'drive' | 'ai_generated';
  captionOverlayStyle?: 'static_text' | 'text_and_captions';
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
  videoSource?: 'drive' | 'ai_generated';
  captionOverlayStyle?: 'static_text' | 'text_and_captions';
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

export interface OrganicPlatformMetrics {
  reach: number;
  impressions: number;
  engagementRate: number;
  followersGained: number;
  shares: number;
  savesOrLikes: number;
  videoViews?: number;
  organicInquiries: number;
}

export interface AnalyticsSummary {
  totalPosts: number;
  totalScheduled: number;
  totalApproved: number;
  totalPending: number;
  avgEngagementRate: number;
  patientInquiries: number;
  estimatedRevenuePipeline: number;
  // Platform specific organic metrics requested by client
  organicPlatforms: {
    instagram: OrganicPlatformMetrics;
    facebook: OrganicPlatformMetrics;
    youtube: OrganicPlatformMetrics;
  };
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  clinicName: string;
  role: string;
  isTrial: boolean;
  trialDaysRemaining: number;
  provider: 'gmail' | 'credentials' | 'apple' | 'sso';
  avatarInitials: string;
  registrationCode?: string;
  stateCouncil?: string;
  agreedToTerms?: boolean;
}
