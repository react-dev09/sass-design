export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';
import { fetchPerformanceMetrics } from '@/lib/performance-audit';

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

    // Fetch performance metrics
    const metrics = await fetchPerformanceMetrics(audit.url);

    if (!metrics) {
      return NextResponse.json({ error: 'Failed to fetch performance metrics' }, { status: 500 });
    }

    // Calculate score based on metrics
    let score = 100;

    // LCP score (target: 2500ms)
    if (metrics.lcp > 2500) score -= Math.min(30, (metrics.lcp - 2500) / 100);
    if (metrics.lcp > 4000) score -= 20;

    // CLS score (target: 0.1)
    if (metrics.cls > 0.1) score -= Math.min(15, (metrics.cls - 0.1) * 100);

    // FCP score (target: 1800ms)
    if (metrics.fcp > 1800) score -= Math.min(15, (metrics.fcp - 1800) / 200);

    // INP score (target: 200ms)
    if (metrics.inp > 200) score -= Math.min(15, (metrics.inp - 200) / 100);

    // TTFB score (target: 800ms)
    if (metrics.ttfb > 800) score -= Math.min(10, (metrics.ttfb - 800) / 100);

    const performanceScore = Math.max(0, Math.min(100, Math.round(score)));

    // Update audit with performance data
    await prisma.audit.update({
      where: { id: auditId },
      data: {
        performanceScore,
        performanceMetrics: metrics as any,
      },
    });

    return NextResponse.json({
      performanceScore,
      metrics,
    });
  } catch (error) {
    console.error('Performance audit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
