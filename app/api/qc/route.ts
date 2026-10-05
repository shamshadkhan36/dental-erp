import { NextRequest, NextResponse } from 'next/server';
import { runQualityCheck } from '../../../lib/qc-engine';
import { defaultBrandProfile } from '../../../lib/default-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, brand = defaultBrandProfile } = body;

    if (!content) {
      return NextResponse.json({
        success: false,
        error: "Missing content payload to validate"
      }, { status: 400 });
    }

    const qc = runQualityCheck(content, brand);

    return NextResponse.json({
      success: true,
      data: qc
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to execute quality check"
    }, { status: 500 });
  }
}
