import { NextRequest, NextResponse } from 'next/server';
import { fetchGtmetrixData } from '@/lib/gtmetrix';
import { generateMockReport } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('🔍 [AUDIT] Starting backend audit for URL:', url);

    const auditId = 'audit_' + Date.now();
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

    // Call the GTmetrix API (takes ~15-30 seconds because of polling)
    const gtmetrixData = await fetchGtmetrixData(normalizedUrl);

    // Generate the AI report, passing the GTmetrix data so it maps to the real issues
    const { scores, report } = await generateMockReport({
      url: normalizedUrl,
      pageSpeedData: gtmetrixData ?? undefined,
    });

    const audit = {
      id: auditId,
      url: normalizedUrl,
      timestamp: new Date().toISOString(),
      overall: scores.overall,
      performance: {
        score: scores.performance,
        ...report.performanceMetrics,
      },
      seo: {
        score: scores.seo,
        issues: report.seoAnalysis?.metaTags ? [] : ['Missing SEO configurations'],
      },
      accessibility: {
        score: scores.accessibility,
      },
      ux: {
        score: scores.ux,
      },
      conversion: {
        score: scores.conversion,
      },
      scores,
      report,
    };

    return NextResponse.json({ auditId, audit });
  } catch (error) {
    console.error('Audit creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
