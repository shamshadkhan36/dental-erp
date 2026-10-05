import { NextRequest, NextResponse } from 'next/server';
import { generateDentalContent } from '../../../lib/ai-prompts';
import { defaultBrandProfile } from '../../../lib/default-data';
import { ContentFormat, ProductionFrequency } from '../../../types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topic = "Comprehensive Dental Wellness Guide",
      format = "single",
      frequencyMode = "weekly",
      treatmentId,
      icpId,
      customInstructions
    } = body;

    const treatment = defaultBrandProfile.treatments.find(t => t.id === treatmentId) || defaultBrandProfile.treatments[0];
    const icp = defaultBrandProfile.icpProfiles.find(i => i.id === icpId) || defaultBrandProfile.icpProfiles[0];

    const result = generateDentalContent({
      topic,
      format: format as ContentFormat,
      frequencyMode: frequencyMode as ProductionFrequency,
      treatment,
      icp,
      brand: defaultBrandProfile,
      customInstructions
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate content"
    }, { status: 500 });
  }
}
