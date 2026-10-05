import { BrandProfile, CalendarItem, ContentRecord, FlyerRecord, AnalyticsSummary } from '../types';

export const defaultBrandProfile: BrandProfile = {
  clinicName: "Apex Smile Studio & Implant Center",
  tagline: "Precision Dentistry, Compassionate Smiles",
  phone: "+1 (555) 382-7645",
  whatsapp: "+1 (555) 382-7646",
  email: "care@apexsmilestudio.com",
  address: "742 Medical Arts Pavilion, Suite 400, New York, NY",
  website: "https://apexsmilestudio.com",
  brandVoice: "Empathetic, Authoritative, Reassuring, and Cosmetically Sophisticated",
  keyPhrases: [
    "Pain-free modern dentistry",
    "Tailored digital smile design",
    "Board-certified implant specialists",
    "Gentle touch technology"
  ],
  prohibitedTerms: [
    "Cheap braces",
    "Painless 100% guarantee",
    "Discount dentistry",
    "Drill and fill"
  ],
  primaryColor: "#137c70", // Calm dental teal
  secondaryColor: "#183b34", // Deep botanical green
  accentColor: "#68b49a", // Soft mint accent
  fontFamily: "Inter, Segoe UI Variable, Segoe UI, sans-serif",
  logoUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&auto=format&fit=crop&q=80",
  gdriveRootFolder: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026",
  icpProfiles: [
    {
      id: "icp-1",
      name: "Cosmetic Professionals (24-40 yrs)",
      targetDemographic: "Young working adults, public-facing careers, active on Instagram/LinkedIn",
      painPoints: ["Crooked teeth in photos", "Coffee/tea discoloration", "Fear of traditional metal braces"],
      recommendedTreatments: ["Invisalign Clear Aligners", "In-Office Laser Teeth Whitening", "Porcelain Veneers"],
      preferredTone: "Aesthetic, inspiring, confidence-boosting, sleek"
    },
    {
      id: "icp-2",
      name: "Full Smile Restorations (45-65+ yrs)",
      targetDemographic: "Adults suffering from missing teeth, worn dentition, chewing discomfort",
      painPoints: ["Difficulty eating favorite foods", "Loose dentures", "Premature facial aging"],
      recommendedTreatments: ["All-on-4 Dental Implants", "Zirconia Crowns", "Full Mouth Reconstruction"],
      preferredTone: "Clinical expertise, life-transforming, permanent solution, reassuring"
    },
    {
      id: "icp-3",
      name: "Family Preventive Care (Families & Kids)",
      targetDemographic: "Parents managing family healthcare schedules",
      painPoints: ["Children's dental anxiety", "Cavities from sugary snacks", "Juggling appointments"],
      recommendedTreatments: ["Pediatric Checkups & Fluoride", "Preventive Sealants", "Custom Nightguards"],
      preferredTone: "Warm, family-first, educational, stress-free"
    }
  ],
  treatments: [
    {
      id: "treat-invisalign",
      name: "Invisalign® Clear Aligners",
      category: "Orthodontics",
      usp: "Discreet 3D digital planning, zero metal brackets, eat whatever you like",
      typicalDuration: "6 to 12 months average",
      pricingNote: "Starting at $149/mo with zero down financing"
    },
    {
      id: "treat-implants",
      name: "Guided 3D Dental Implants",
      category: "Surgical",
      usp: "Permanent titanium roots with lifelike ceramic crowns; 98.7% success rate",
      typicalDuration: "Same-day provisional placement available",
      pricingNote: "Complimentary 3D CBCT scan included with consultation"
    },
    {
      id: "treat-whitening",
      name: "Philips Zoom Laser Whitening",
      category: "Cosmetic",
      usp: "Up to 8 shades whiter in a single 45-minute comfortable session",
      typicalDuration: "45 minutes",
      pricingNote: "$299 Special (Regular $450)"
    },
    {
      id: "treat-veneers",
      name: "Handcrafted Porcelain Veneers",
      category: "Cosmetic",
      usp: "Ultra-thin, stain-resistant porcelain designed to harmonize with your facial proportions",
      typicalDuration: "2 visits across 10 days"
    },
    {
      id: "treat-pediatric",
      name: "Gentle Pediatric Dental Cleanings",
      category: "Preventive",
      usp: "Comfort amenities, movie glasses, prize box, and kid-certified hygienists",
      typicalDuration: "30 minutes"
    }
  ],
  ctaTemplates: [
    "Tap the link in our bio to book your complimentary 3D digital smile scan!",
    "Comment 'SMILE' below and we'll DM you our exclusive $500 Invisalign voucher.",
    "Call (555) 382-7645 to speak directly with our Treatment Coordinator today.",
    "Ready to eat without worry again? DM us 'IMPLANTS' for our free consultation guide."
  ],
  systemPrompt: `You are the Lead Clinical Copywriter and Brand Strategist for Apex Smile Studio & Implant Center.
Your goal is to educate patients, demystify dental anxiety, and inspire bookings for premium dental procedures.
Strict Guidelines:
1. Always maintain an empathetic, authoritative, and medically accurate tone.
2. Use strong psychological hooks that address patient insecurities (hiding smile, pain, chewing difficulties).
3. Always include a clear Call To Action (CTA).
4. Never make unrealistic medical claims (avoid 'guaranteed zero pain forever'); emphasize modern numbing techniques, digital precision, and patient comfort.
5. Provide formatted hashtags targeting local dental and cosmetic audiences.`
};

export const defaultCalendarItems: CalendarItem[] = [
  {
    id: "cal-1",
    date: "2026-10-06",
    dayOfWeek: "Tuesday",
    timeSlot: "11:30 AM",
    topic: "3 Signs You Might Be Grinding Your Teeth at Night (Bruxism)",
    pillar: "Educational",
    format: "carousel",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-pediatric",
    targetIcpId: "icp-1",
    status: "approved",
    contentRecordId: "rec-1"
  },
  {
    id: "cal-2",
    date: "2026-10-08",
    dayOfWeek: "Thursday",
    timeSlot: "03:00 PM",
    topic: "Full Smile Transformation: 6 Months of Invisalign Before & After",
    pillar: "Smile Makeover",
    format: "single",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-invisalign",
    targetIcpId: "icp-1",
    status: "pending_approval",
    contentRecordId: "rec-2"
  },
  {
    id: "cal-3",
    date: "2026-10-10",
    dayOfWeek: "Saturday",
    timeSlot: "10:00 AM",
    topic: "Dental Myth: Are Dental Implants More Painful Than a Root Canal?",
    pillar: "Myth vs Fact",
    format: "reel",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-implants",
    targetIcpId: "icp-2",
    status: "approved",
    contentRecordId: "rec-3"
  },
  {
    id: "cal-4",
    date: "2026-10-13",
    dayOfWeek: "Tuesday",
    timeSlot: "01:00 PM",
    topic: "Meet Dr. Sarah Chen: Why Digital 3D Scans Replaced Goopy Molds",
    pillar: "Doctor Spotlight",
    format: "single",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-invisalign",
    targetIcpId: "icp-3",
    status: "draft"
  },
  {
    id: "cal-5",
    date: "2026-10-16",
    dayOfWeek: "Friday",
    timeSlot: "04:30 PM",
    topic: "Patient Story: 'I haven't bitten into an apple in 7 years until now'",
    pillar: "Patient Review",
    format: "carousel",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-implants",
    targetIcpId: "icp-2",
    status: "scheduled",
    contentRecordId: "rec-4"
  },
  {
    id: "cal-6",
    date: "2026-10-20",
    dayOfWeek: "Tuesday",
    timeSlot: "11:00 AM",
    topic: "Fall Laser Teeth Whitening Flash Offer ($299 In-Office)",
    pillar: "Special Offer",
    format: "single",
    platforms: ["instagram", "facebook"],
    targetTreatmentId: "treat-whitening",
    targetIcpId: "icp-1",
    status: "pending_approval",
    contentRecordId: "rec-5"
  }
];

export const defaultContentRecords: ContentRecord[] = [
  {
    id: "rec-1",
    calendarItemId: "cal-1",
    title: "3 Signs of Nighttime Teeth Grinding",
    format: "carousel",
    frequencyMode: "weekly",
    platforms: ["instagram", "facebook"],
    treatmentId: "treat-pediatric",
    treatmentName: "Preventive Nightguards & TMJ Care",
    hook: "Waking up with a dull headache or sore jaw? You might be grinding your teeth in your sleep without realizing it. 😬🦷",
    caption: `Waking up with morning jaw stiffness or inexplicable headaches? It's not just stress—it could be nocturnal bruxism (teeth grinding). 

Over time, nighttime clenching exerts up to 250 lbs of pressure per square inch on your enamel, causing micro-fractures, receding gums, and worn bite surfaces.

Swipe through for the 3 hallmark signs our dentists look for during routine exams, and how a custom digital nightguard can save your teeth! 👇`,
    cta: "Tap the link in our bio to book your comprehensive bite & TMJ evaluation with Dr. Chen!",
    hashtags: ["#DentalHealthTips", "#TeethGrinding", "#BruxismRelief", "#ApexSmileStudio", "#PreventiveDentistry", "#NYCDentist"],
    carouselSlides: [
      {
        slideNumber: 1,
        badge: "Oral Health Alert",
        title: "Waking Up With Tension Headaches?",
        bodyText: "It might not be your pillow. Over 30% of adults clench or grind their teeth while asleep.",
        visualCue: "Person touching tense jaw area with soft clinical overlay and clinic logo"
      },
      {
        slideNumber: 2,
        badge: "Sign #1",
        title: "Flattened or Chipped Enamel Edges",
        bodyText: "Look at your lower front teeth in the mirror. Are the biting edges completely flat or slightly translucent? That's enamel friction.",
        visualCue: "Macro dental photography comparing healthy vs. ground enamel"
      },
      {
        slideNumber: 3,
        badge: "Sign #2",
        title: "Sudden Sensitivity to Cold Water",
        bodyText: "When enamel thins from grinding, microscopic dentin tubules are exposed, making cold drinks sting.",
        visualCue: "Glass of ice water with tooth cross-section showing dentin exposure"
      },
      {
        slideNumber: 4,
        badge: "The Solution",
        title: "Custom 3D Digital Nightguards",
        bodyText: "Unlike bulky store-bought guards, our custom 3D-scanned appliance is slim, comfortable, and cushions your bite perfectly.",
        visualCue: "Close-up of crystal clear custom nightguard in sleek dental case"
      },
      {
        slideNumber: 5,
        badge: "Take Action",
        title: "Protect Your Enamel While You Sleep",
        bodyText: "Book your quick 10-minute digital bite scan today. No messy goop, just instant 3D precision.",
        visualCue: "Clinic contact details, doctor photo, and booking link sticker"
      }
    ],
    status: "approved",
    qcResults: {
      passed: true,
      score: 96,
      dimensionsValid: true,
      logoPresent: true,
      brandColorsUsed: true,
      ctaPresent: true,
      disclaimerCompliant: true,
      checks: [
        { rule: "Aspect Ratio", passed: true, message: "1080x1350 (4:5 Carousel Ratio) validated" },
        { rule: "Logo Placement", passed: true, message: "Apex Smile Studio watermark in upper right" },
        { rule: "CTA Compliance", passed: true, message: "Explicit booking link in bio referenced" },
        { rule: "Medical Accuracy", passed: true, message: "No false medical guarantees detected" }
      ]
    },
    creativeAssetUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80",
    gdriveAssetLink: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026/Carousels/Bruxism_Oct2026",
    createdAt: "2026-10-04T14:20:00Z",
    author: "AI Copywriter Agent v2.4"
  },
  {
    id: "rec-2",
    calendarItemId: "cal-2",
    title: "6-Month Invisalign Transformation",
    format: "single",
    frequencyMode: "weekly",
    platforms: ["instagram", "facebook"],
    treatmentId: "treat-invisalign",
    treatmentName: "Invisalign® Clear Aligners",
    hook: "She came to us hiding her smile during presentations. 6 months later, everything changed! ✨😁",
    caption: `Swipe to see Maya's 6-month Invisalign journey! 

Maya works in fintech and spent years feeling self-conscious about her crowded front teeth in Zoom meetings. She didn't want bulky metal braces as an adult professional.

With our 3D iTero digital planning:
✔️ Zero metal brackets or wires
✔️ Clear aligners that fit seamlessly into client lunches
✔️ Completed in just 24 weeks!

Your dream smile is closer than you think.`,
    cta: "Comment 'SCAN' below and we'll DM you a VIP link for a complimentary 3D Smile Simulation ($250 value)!",
    hashtags: ["#InvisalignBeforeAndAfter", "#AdultInvisalign", "#SmileTransformation", "#ApexSmileStudio", "#ClearAligners", "#ConfidenceBoost"],
    status: "pending_approval",
    qcResults: {
      passed: true,
      score: 92,
      dimensionsValid: true,
      logoPresent: true,
      brandColorsUsed: true,
      ctaPresent: true,
      disclaimerCompliant: true,
      checks: [
        { rule: "Patient Privacy & Consent", passed: true, message: "HIPAA consent confirmed on file" },
        { rule: "Resolution Check", passed: true, message: "1080x1080 Square High-Res detected" },
        { rule: "Disclaimer Check", passed: true, message: "Results vary per patient statement present" }
      ]
    },
    creativeAssetUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1080&auto=format&fit=crop&q=80",
    gdriveAssetLink: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026/BeforeAfter/Invisalign_Maya_Oct2026",
    createdAt: "2026-10-05T09:15:00Z",
    author: "AI Copywriter Agent v2.4"
  },
  {
    id: "rec-3",
    calendarItemId: "cal-3",
    title: "Dental Myth: Implants vs Root Canal Pain",
    format: "reel",
    frequencyMode: "monthly",
    platforms: ["instagram", "facebook"],
    treatmentId: "treat-implants",
    treatmentName: "Guided 3D Dental Implants",
    hook: "Think dental implants hurt worse than a root canal? You'll be shocked by what science actually says! 🛑🧠",
    caption: `The #1 question our implant surgeons hear: "Is getting an implant going to hurt?" 

The honest clinical answer? Most patients report dental implant placement has LESS post-operative soreness than a simple tooth extraction or deep root canal!

Why? Bone has very few nerve endings compared to the inflamed pulp of a diseased tooth. With our computer-guided surgical guides, the entire placement takes under 30 minutes with local anesthesia or light twilight sedation.

Watch Dr. Chen explain why modern implantology is a breeze! 👇`,
    cta: "Have questions about missing teeth? DM us 'IMPLANT' or call (555) 382-7645 for our patient guide.",
    hashtags: ["#DentalImplants", "#DentalMyths", "#PainlessDentistry", "#DrSarahChen", "#DentalSurgery", "#OralHealth"],
    reelScript: {
      hookDuration: "0:00 - 0:03",
      hookVisual: "Dr. Chen holding a realistic 3D clear dental bone model pointing at an implant fixture, eyebrow raised with 'Stop Believing This Myth' sticker.",
      hookAudio: "Trending high-energy upbeat synth track (lowered to 15% under voiceover)",
      scenes: [
        {
          second: "0:03 - 0:10",
          action: "Close-up cut to computer screen showing 3D digital implant planning software",
          onScreenText: "Myth: 'Implants hurt way more than extractions'",
          voiceover: "I hear this every single day: 'Doctor, won't placing an implant be painful?' Here's the truth most people don't know..."
        },
        {
          second: "0:10 - 0:22",
          action: "Dr. Chen smiling and explaining with hand gestures, friendly expression",
          onScreenText: "Fact: Bone has far fewer nerve endings than tooth pulp!",
          voiceover: "Your jawbone actually has virtually zero pain-sensing nerve fibers compared to an inflamed, infected tooth nerve. Most patients take nothing stronger than Tylenol the next morning."
        },
        {
          second: "0:22 - 0:30",
          action: "Cut to 3D surgical guide fitting onto dental model effortlessly",
          onScreenText: "Guided 3D Precision = Faster Healing",
          voiceover: "And because we use 3D guided surgery, placement is micro-invasive and finished in under 30 minutes."
        }
      ],
      audioTrackSuggestion: "Upbeat Lo-Fi Dental Tech Groove"
    },
    status: "approved",
    qcResults: {
      passed: true,
      score: 98,
      dimensionsValid: true,
      logoPresent: true,
      brandColorsUsed: true,
      ctaPresent: true,
      disclaimerCompliant: true,
      checks: [
        { rule: "Video Aspect Ratio", passed: true, message: "9:16 (1080x1920 Reel / Story format)" },
        { rule: "Audio Cue Sync", passed: true, message: "Timing markers within 30-second reel standard" },
        { rule: "Compliance Disclaimer", passed: true, message: "Clinical opinion notice formatted properly" }
      ]
    },
    creativeAssetUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1080&auto=format&fit=crop&q=80",
    gdriveAssetLink: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026/Reels/Implant_Myth_Oct2026",
    createdAt: "2026-10-04T18:00:00Z",
    author: "AI Copywriter Agent v2.4"
  },
  {
    id: "rec-4",
    calendarItemId: "cal-5",
    title: "Patient Story: Biting into an Apple Again",
    format: "carousel",
    frequencyMode: "monthly",
    platforms: ["instagram", "facebook"],
    treatmentId: "treat-implants",
    treatmentName: "All-on-4 Full Arch Implants",
    hook: "'For seven years, I had to cut my food into tiny pieces and hid my mouth when laughing.' Robert, age 58. ❤️",
    caption: `When Robert came to Apex Smile Studio, loose dentures were draining the joy out of family dinners and conversations. 

With our All-on-4 permanent implant solution, Robert walked out of our clinic with fixed, beautiful, permanent teeth that don't slip or click.

Swipe to see his journey from consultation to enjoying his favorite foods again! 👇`,
    cta: "Take the first step toward reclaiming your smile and confidence. Click the link in our bio for a private consultation.",
    hashtags: ["#PatientTransformation", "#AllOn4Implants", "#DentalImplantsNYC", "#ApexSmileStudio", "#NewSmileNewLife"],
    status: "scheduled",
    scheduledAt: "2026-10-16T16:30:00Z",
    qcResults: {
      passed: true,
      score: 95,
      dimensionsValid: true,
      logoPresent: true,
      brandColorsUsed: true,
      ctaPresent: true,
      disclaimerCompliant: true,
      checks: [
        { rule: "Resolution", passed: true, message: "High definition assets validated" },
        { rule: "Consent Form", passed: true, message: "Patient testimonial consent verified" }
      ]
    },
    creativeAssetUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1080&auto=format&fit=crop&q=80",
    gdriveAssetLink: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026/Testimonials/Robert_Oct2026",
    createdAt: "2026-10-03T11:00:00Z",
    author: "Marketing Operations Team"
  },
  {
    id: "rec-5",
    calendarItemId: "cal-6",
    title: "Fall Laser Teeth Whitening Flash Offer",
    format: "single",
    frequencyMode: "on_request",
    platforms: ["instagram", "facebook"],
    treatmentId: "treat-whitening",
    treatmentName: "Philips Zoom Laser Whitening",
    hook: "Coffee and red wine season is here—keep your smile radiant with our October Laser Whitening special! ☕🍷✨",
    caption: `Fall in love with your brightest smile! 🍂✨

For the month of October only, get our signature in-office Philips Zoom Laser Whitening treatment for just $299 (Regular $450). 

⚡ Up to 8 shades brighter in under 1 hour
⚡ Enamel-safe sensitivity relief gel included
⚡ Free take-home maintenance touch-up pen ($75 value)

Limited to 25 appointments this month!`,
    cta: "Direct Message us 'WHITEN' or call (555) 382-7645 to reserve your appointment before spots fill up!",
    hashtags: ["#TeethWhitening", "#PhilipsZoom", "#DentalSpecials", "#FallSmile", "#ApexSmileStudio", "#BrightSmile"],
    status: "pending_approval",
    qcResults: {
      passed: true,
      score: 88,
      dimensionsValid: true,
      logoPresent: true,
      brandColorsUsed: true,
      ctaPresent: true,
      disclaimerCompliant: true,
      checks: [
        { rule: "Promotional Terms", passed: true, message: "Clear pricing and expiration date present" },
        { rule: "Color Contrast", passed: true, message: "Legible text contrast ratio 4.8:1" }
      ]
    },
    creativeAssetUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1080&auto=format&fit=crop&q=80",
    gdriveAssetLink: "https://drive.google.com/drive/folders/1ApexDental_MarketingAssets_2026/Promotions/Fall_Whitening_2026",
    createdAt: "2026-10-05T10:00:00Z",
    author: "AI Copywriter Agent v2.4"
  }
];

export const defaultFlyers: FlyerRecord[] = [
  {
    id: "flyer-1",
    campaignTitle: "Community Dental Health & Smile Screening Camp",
    headline: "Complimentary Comprehensive Dental Checkup Camp",
    subheadline: "Because healthy smiles build healthy communities. Open to all ages this Saturday.",
    offerBadge: "100% FREE SCREENING",
    bulletPoints: [
      "Full digital mouth exam & oral cancer screening",
      "Complimentary high-resolution digital X-rays",
      "Personalized smile wellness consultation",
      "Free oral hygiene goody bag for children"
    ],
    termsAndConditions: "Prior registration required due to seating limits. Not combinable with insurance copays.",
    validUntil: "Saturday, Oct 24, 2026 • 9:00 AM - 4:00 PM",
    contactNumber: "(555) 382-7645",
    clinicAddress: "742 Medical Arts Pavilion, Suite 400, New York, NY",
    templateStyle: "family_friendly",
    accentColor: "#137c70",
    status: "approved",
    downloadUrl: "/flyers/sample-health-camp.pdf",
    createdAt: "2026-10-04T12:00:00Z"
  },
  {
    id: "flyer-2",
    campaignTitle: "New Patient Invisalign Special Package",
    headline: "Transform Your Smile With Clear, Discreet Aligners",
    subheadline: "$500 OFF Comprehensive Invisalign Treatment + Free Teeth Whitening",
    offerBadge: "$500 OFF + FREE WHITENING",
    bulletPoints: [
      "Zero metal wires or brackets",
      "State-of-the-art 3D iTero digital scan",
      "Flexible monthly payments from $149/month with 0% interest",
      "Includes complete post-treatment retainer set"
    ],
    termsAndConditions: "Offer valid for new patients starting treatment before Nov 15, 2026.",
    validUntil: "November 15, 2026",
    contactNumber: "(555) 382-7645",
    clinicAddress: "Apex Smile Studio, 742 Medical Arts Pavilion",
    templateStyle: "premium_aesthetic",
    accentColor: "#0d9488",
    status: "pending_approval",
    createdAt: "2026-10-05T08:30:00Z"
  }
];

export const defaultAnalytics: AnalyticsSummary = {
  totalPosts: 48,
  totalScheduled: 14,
  totalApproved: 32,
  totalPending: 6,
  avgEngagementRate: 4.8,
  patientInquiries: 142,
  estimatedRevenuePipeline: 86500,
  platformSplit: { instagram: 68, facebook: 32 },
  topConvertingTreatments: [
    { name: "Invisalign Clear Aligners", inquiries: 58, reach: 24500 },
    { name: "Guided Dental Implants", inquiries: 44, reach: 18200 },
    { name: "Philips Zoom Laser Whitening", inquiries: 26, reach: 14100 },
    { name: "Porcelain Veneers", inquiries: 14, reach: 9800 }
  ],
  recentPublishedPosts: [
    {
      id: "pub-1",
      title: "Why Bleeding Gums Shouldn't Be Ignored",
      date: "Oct 2, 2026",
      platform: "instagram",
      likes: 312,
      shares: 45,
      comments: 28,
      inquiries: 12
    },
    {
      id: "pub-2",
      title: "All-on-4 Same Day Implants Case Study",
      date: "Sep 28, 2026",
      platform: "facebook",
      likes: 185,
      shares: 34,
      comments: 19,
      inquiries: 18
    },
    {
      id: "pub-3",
      title: "Invisalign vs Braces: Real Cost & Time Breakdown",
      date: "Sep 25, 2026",
      platform: "instagram",
      likes: 540,
      shares: 88,
      comments: 64,
      inquiries: 31
    }
  ],
  aiRecommendations: [
    "Invisalign before-and-after carousels show a 2.4x higher conversion rate than static single images. Schedule 2 additional carousels this month.",
    "Patient Q&A Reels regarding dental implant discomfort drove 18 direct WhatsApp consultations last week. Recommend weekly Doctor Q&A clips.",
    "Post timing between 11:30 AM and 1:30 PM on Tuesdays and Thursdays generated 42% of total clinical booking inquiries."
  ]
};
