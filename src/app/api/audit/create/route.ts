import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const auditId = 'audit_' + Date.now();

    const mockAudit = {
      url,
      timestamp: new Date().toISOString(),
      performance: {
        score: 75 + Math.random() * 25,
        lcp: 2.1 + Math.random() * 0.5,
        cls: 0.05 + Math.random() * 0.1,
        fcp: 1.2 + Math.random() * 0.6,
        ttfb: 0.4 + Math.random() * 0.3,
        speedIndex: 3.5 + Math.random() * 2,
      },
      seo: {
        score: 80 + Math.random() * 20,
        issues: [
          'Missing meta description on homepage',
          'No structured data markup detected',
          'Mobile viewport properly configured',
          'SSL certificate valid',
          '4 internal links found',
        ],
      },
    };

    return NextResponse.json({ auditId, audit: mockAudit });
  } catch (error) {
    console.error('Audit creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
