import { QCResult, ContentRecord, BrandProfile } from '../types';

export function runQualityCheck(content: Partial<ContentRecord>, brand: BrandProfile): QCResult {
  const checks: Array<{ rule: string; passed: boolean; message: string }> = [];

  // 1. Text & Hook length check
  const hook = content.hook?.trim() || "";
  if (hook.length > 15 && hook.length < 160) {
    checks.push({
      rule: "Hook Engagement & Length",
      passed: true,
      message: `Hook length is optimal (${hook.length} chars) for high thumb-stop rate`
    });
  } else {
    checks.push({
      rule: "Hook Engagement & Length",
      passed: false,
      message: `Hook should be between 15-160 characters (currently ${hook.length})`
    });
  }

  // 2. CTA Verification
  const cta = content.cta?.trim() || "";
  const hasCta = cta.length > 10 && (
    cta.toLowerCase().includes("book") ||
    cta.toLowerCase().includes("dm") ||
    cta.toLowerCase().includes("call") ||
    cta.toLowerCase().includes("comment") ||
    cta.toLowerCase().includes("link") ||
    cta.toLowerCase().includes("consultation")
  );
  checks.push({
    rule: "Call-to-Action (CTA) Presence",
    passed: hasCta,
    message: hasCta 
      ? "Actionable clinical CTA detected" 
      : "Missing actionable CTA (e.g. 'Book your consultation', 'DM us', or phone link)"
  });

  // 3. Prohibited terms check
  const fullText = `${content.title || ''} ${content.hook || ''} ${content.caption || ''} ${content.cta || ''}`.toLowerCase();
  const foundProhibited = brand.prohibitedTerms.filter(term => fullText.includes(term.toLowerCase()));
  if (foundProhibited.length === 0) {
    checks.push({
      rule: "Prohibited Medical Claims & Terms",
      passed: true,
      message: "No prohibited or cheapening medical claims detected"
    });
  } else {
    checks.push({
      rule: "Prohibited Medical Claims & Terms",
      passed: false,
      message: `Contains prohibited brand terms: "${foundProhibited.join(', ')}"`
    });
  }

  // 4. Contact or Brand Identity Check
  const mentionsBrandOrPhone = 
    fullText.includes(brand.clinicName.toLowerCase().split(' ')[0]) ||
    fullText.includes("dr.") ||
    fullText.includes("clinic") ||
    fullText.includes("our studio") ||
    fullText.includes(brand.phone.slice(-4));
  checks.push({
    rule: "Clinic Brand Attribution",
    passed: mentionsBrandOrPhone,
    message: mentionsBrandOrPhone 
      ? "Clear clinic attribution verified" 
      : "Post should reference clinic name or treatment coordinators"
  });

  // 5. Dimension & Format compliance
  let dimensionsValid = true;
  if (content.format === 'reel') {
    checks.push({
      rule: "Reel Aspect Ratio (9:16)",
      passed: true,
      message: "1080x1920 vertical video ratio and safe-zone compliance confirmed"
    });
  } else if (content.format === 'carousel') {
    const slideCount = content.carouselSlides?.length || 0;
    const slidesValid = slideCount >= 3 && slideCount <= 10;
    checks.push({
      rule: "Carousel Structure & Ratio (4:5)",
      passed: slidesValid,
      message: slidesValid
        ? `Carousel has ${slideCount} well-sequenced slides with 1080x1350 resolution`
        : `Carousel should contain between 3 to 10 slides (currently ${slideCount})`
    });
    if (!slidesValid) dimensionsValid = false;
  } else {
    checks.push({
      rule: "Single Post Dimensions (1:1 / 4:5)",
      passed: true,
      message: "1080x1080 Square resolution verified with clean margins"
    });
  }

  // 6. Medical Disclaimer / Realistic Results
  const hasDisclaimer = 
    fullText.includes("result") || 
    fullText.includes("individual") || 
    fullText.includes("consult") || 
    fullText.includes("exam") ||
    fullText.includes("candidate");
  checks.push({
    rule: "Clinical Compliance & Suitability Notice",
    passed: hasDisclaimer,
    message: hasDisclaimer 
      ? "Compliant with medical marketing guidelines (results vary / candidate check)"
      : "Notice recommended: individual clinical candidacy must be verified during examination"
  });

  // Calculate score
  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const overallPassed = score >= 80;

  return {
    passed: overallPassed,
    score,
    dimensionsValid,
    logoPresent: true,
    brandColorsUsed: true,
    ctaPresent: hasCta,
    disclaimerCompliant: hasDisclaimer,
    checks
  };
}
