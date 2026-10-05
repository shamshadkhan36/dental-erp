import { BrandProfile, ContentFormat, ContentRecord, DentalTreatment, ICPProfile, ProductionFrequency } from '../types';
import { runQualityCheck } from './qc-engine';

export function compileSystemPrompt(brand: BrandProfile): string {
  return `=== SYSTEM PROMPT FOR DENTAL SOCIAL MEDIA & CREATIVE AUTOMATION ===
Clinic Name: ${brand.clinicName}
Tagline: ${brand.tagline}
Brand Voice: ${brand.brandVoice}
Website: ${brand.website}
Phone: ${brand.phone} | WhatsApp: ${brand.whatsapp}
Address: ${brand.address}

CORE CLINICAL TREATMENTS:
${brand.treatments.map(t => `- ${t.name} (${t.category}): ${t.usp} | Duration: ${t.typicalDuration}`).join('\n')}

TARGET AUDIENCES (ICPs):
${brand.icpProfiles.map(icp => `- ${icp.name}: Tone: ${icp.preferredTone} | Pain Points: ${icp.painPoints.join(', ')}`).join('\n')}

KEY BRAND PHRASES TO INCLUDE:
${brand.keyPhrases.map(p => `• "${p}"`).join('\n')}

PROHIBITED TERMINOLOGY (NEVER USE):
${brand.prohibitedTerms.map(p => `❌ "${p}"`).join('\n')}

CALL TO ACTION TEMPLATES:
${brand.ctaTemplates.map(c => `👉 "${c}"`).join('\n')}

EXECUTION RULES:
1. Always craft attention-grabbing, pattern-interrupt hooks addressing patient pain, smile confidence, or dental myths.
2. For Carousels, format slide-by-slide with concise, high-value takeaways (1 headline + 2 sentences per slide).
3. For Reels, write 15-30 second timing markers, visual direction cues, and spoken doctor voiceovers.
4. Ensure compliance: Never guarantee 100% painless treatment; emphasize modern digital precision, local comfort, and customized assessments.
5. Finish every post with a selected CTA and 6-10 targeted dental and local hashtags.`;
}

interface GenerateParams {
  topic: string;
  format: ContentFormat;
  frequencyMode: ProductionFrequency;
  treatment: DentalTreatment;
  icp: ICPProfile;
  brand: BrandProfile;
  customInstructions?: string;
}

export function generateDentalContent(params: GenerateParams): ContentRecord {
  const { topic, format, frequencyMode, treatment, icp, brand, customInstructions } = params;
  const id = `gen-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  
  let hook = "";
  let caption = "";
  let cta = brand.ctaTemplates[Math.floor(Math.random() * brand.ctaTemplates.length)];
  let carouselSlides = undefined;
  let reelScript = undefined;

  const hashtags = [
    `#${brand.clinicName.replace(/[^a-zA-Z0-9]/g, '')}`,
    `#${treatment.name.replace(/[^a-zA-Z0-9]/g, '')}`,
    "#HealthySmiles",
    "#ModernDentistry",
    "#SmileDesign",
    "#DentalCareTips",
    "#DentalAesthetics",
    "#PainlessDentistry"
  ];

  if (treatment.category === 'Orthodontics') {
    hashtags.push("#ClearAligners", "#StraightTeeth", "#AdultBraces");
  } else if (treatment.category === 'Surgical') {
    hashtags.push("#DentalImplants", "#SmileReconstruction", "#OralSurgery");
  } else if (treatment.category === 'Cosmetic') {
    hashtags.push("#TeethWhitening", "#PorcelainVeneers", "#SmileMakeover");
  }

  // Generate format-specific content
  if (format === 'carousel') {
    hook = `Thinking about ${treatment.name}? Here are 5 things nobody tells you before starting! 🦷✨`;
    caption = `Considering ${treatment.name}? You're not alone! More and more patients in our community are choosing modern, digital solutions to restore their oral health and confidence.

In this quick guide, our clinical team breaks down the timeline, everyday routine, and exact results you can expect with ${treatment.usp}.

Swipe through for the full breakdown, and save this post for your upcoming consultation! 👇`;

    carouselSlides = [
      {
        slideNumber: 1,
        badge: "Patient Guide",
        title: `The Truth About ${treatment.name}`,
        bodyText: `Everything you need to know before sitting in the dentist's chair.`,
        visualCue: "High-contrast aesthetic clinic backdrop with bold title overlay and clinic logo"
      },
      {
        slideNumber: 2,
        badge: "Step 1: 3D Scan",
        title: "No More Messy Impressions",
        bodyText: "We take a 60-second high-precision 3D digital scan of your mouth with zero gagging or uncomfortable putty.",
        visualCue: "Digital wand scanning patient teeth showing instant 3D color model on screen"
      },
      {
        slideNumber: 3,
        badge: "Step 2: Comfort",
        title: "Engineered for Everyday Life",
        bodyText: `${treatment.usp}. You stay comfortable throughout every stage of treatment.`,
        visualCue: "Close-up macro photography of modern dental technology"
      },
      {
        slideNumber: 4,
        badge: "Step 3: Timeline",
        title: `Typical Timeline: ${treatment.typicalDuration}`,
        bodyText: "Most patients notice visible cosmetic and functional enhancements within the first few weeks.",
        visualCue: "Timeline graphic showing progress markers and milestone smiles"
      },
      {
        slideNumber: 5,
        badge: "Next Step",
        title: "Ready to Explore Your Options?",
        bodyText: `Consultations include a complete digital simulation with Dr. Sarah Chen. ${brand.phone}`,
        visualCue: "Clinic address, direct booking QR code, and doctor signature"
      }
    ];
  } else if (format === 'reel') {
    hook = `Still living with missing or uncomfortable teeth? Watch this before you decide on dentures! 🛑`;
    caption = `The biggest myth about ${treatment.name}? That it takes months of pain and complicated surgery. 

With our digital guided protocols, our team at ${brand.clinicName} plans every millimeter before you even sit in the chair. Most patients are back to work the next day!

Watch Dr. Sarah Chen walk you through the real procedure in 30 seconds. 👇`;

    reelScript = {
      hookDuration: "0:00 - 0:03",
      hookVisual: "Doctor holding modern treatment model looking directly into camera with shocked/curious expression, on-screen text: 'The Denture Myth You Still Believe'.",
      hookAudio: "Punchy sound-effect followed by upbeat modern clinical background music",
      scenes: [
        {
          second: "0:03 - 0:11",
          action: "Doctor gestures toward high-definition 3D dental scan on monitor",
          onScreenText: `Modern ${treatment.name} = Digital Precision`,
          voiceover: `If you've been delaying ${treatment.name} because you're worried about discomfort, you're looking at outdated dentistry. Here is how we do it today.`
        },
        {
          second: "0:11 - 0:21",
          action: "Cut to B-roll of comfortable patient chair with warm blanket and movie glasses",
          onScreenText: "Gentle Touch & Same-Day Relief",
          voiceover: `With 3D computer guidance, treatment is micro-invasive and finishes in half the time. Most patients tell us they felt virtually nothing!`
        },
        {
          second: "0:21 - 0:30",
          action: "Doctor smiling warmly in front of clinic reception desk",
          onScreenText: `Book your 3D Scan at ${brand.clinicName}`,
          voiceover: `Don't spend another year hiding your smile. Send us a message or tap the link in bio to see your digital smile preview today!`
        }
      ],
      audioTrackSuggestion: "Upbeat Modern Tech Beats (Low Volume)"
    };
  } else {
    // Single post
    hook = `What a difference ${treatment.typicalDuration} can make for your smile and self-confidence! ✨😁`;
    caption = `When our patient first walked into ${brand.clinicName}, they were constantly holding back their laugh in photos. 

After completing our customized ${treatment.name} program:
✨ ${treatment.usp}
✨ Completed comfortably in ${treatment.typicalDuration}
✨ A natural, glowing smile that radiates confidence in every room!

${customInstructions ? `Special Note: ${customInstructions}\n\n` : ''}Your smile is the first thing people notice—invest in feeling proud of it every single day.`;
  }

  // Pre-assign sample clinical creative image
  const sampleImages = [
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1080&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1080&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1080&auto=format&fit=crop&q=80"
  ];
  const creativeAssetUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];

  const partialRecord: Partial<ContentRecord> = {
    id,
    title: topic,
    format,
    frequencyMode,
    platforms: ['instagram', 'facebook'],
    treatmentId: treatment.id,
    treatmentName: treatment.name,
    hook,
    caption,
    cta,
    hashtags,
    carouselSlides,
    reelScript,
    status: 'pending_approval',
    creativeAssetUrl,
    gdriveAssetLink: `${brand.gdriveRootFolder}/${format.toUpperCase()}/${id}`,
    createdAt: new Date().toISOString(),
    author: "AI Copywriter Agent v2.4"
  };

  const qc = runQualityCheck(partialRecord, brand);

  return {
    ...partialRecord,
    qcResults: qc
  } as ContentRecord;
}
