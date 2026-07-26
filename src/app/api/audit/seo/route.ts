import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { performSeoAudit } from '@/lib/seo-audit';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json({ error: 'Audit ID is required' }, { status: 400 });
    }

    // Get the audit
    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
      include: { user: true },
    });

    if (!audit || audit.user.clerkId !== userId) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    // Perform SEO audit
    const analysis = await performSeoAudit(audit.url);

    if (!analysis) {
      return NextResponse.json({ error: 'Failed to perform SEO audit' }, { status: 500 });
    }

    // Update audit with SEO data
    await prisma.audit.update({
      where: { id: auditId },
      data: {
        seoScore: analysis.score,
        seoAnalysis: analysis,
      },
    });

    return NextResponse.json({
      seoScore: analysis.score,
      analysis,
    });
  } catch (error) {
    console.error('SEO audit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
