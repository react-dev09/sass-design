import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all audits for this user
    const audits = await prisma.audit.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics
    const totalAudits = audits.length;
    const completedAudits = audits.filter(a => a.status === 'COMPLETED').length;
    const failedAudits = audits.filter(a => a.status === 'FAILED').length;

    // Calculate average scores
    const auditsWithScores = audits.filter(a => a.overallScore);
    const avgOverallScore =
      auditsWithScores.length > 0
        ? Math.round(
            auditsWithScores.reduce((sum, a) => sum + (a.overallScore || 0), 0) /
              auditsWithScores.length
          )
        : 0;

    const avgPerformanceScore =
      auditsWithScores.length > 0
        ? Math.round(
            auditsWithScores.reduce((sum, a) => sum + (a.performanceScore || 0), 0) /
              auditsWithScores.length
          )
        : 0;

    const avgSeoScore =
      auditsWithScores.length > 0
        ? Math.round(
            auditsWithScores.reduce((sum, a) => sum + (a.seoScore || 0), 0) /
              auditsWithScores.length
          )
        : 0;

    // Get unique domains
    const uniqueDomains = new Set(audits.map(a => a.domain)).size;

    // Get most common issues
    const issuesMap = new Map<string, number>();
    audits.forEach(audit => {
      if (audit.topIssues && Array.isArray(audit.topIssues)) {
        (audit.topIssues as Array<{ title: string }>).forEach(issue => {
          issuesMap.set(issue.title, (issuesMap.get(issue.title) || 0) + 1);
        });
      }
    });

    const mostCommonIssues = Array.from(issuesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    // Calculate monthly data for chart
    const monthlyData = getMonthlyData(audits);

    // Calculate score distribution
    const scoreDistribution = {
      excellent: auditsWithScores.filter(a => a.overallScore! >= 90).length,
      good: auditsWithScores.filter(a => a.overallScore! >= 70 && a.overallScore! < 90).length,
      needsWork: auditsWithScores.filter(a => a.overallScore! >= 50 && a.overallScore! < 70).length,
      poor: auditsWithScores.filter(a => a.overallScore! < 50).length,
    };

    return NextResponse.json({
      totalAudits,
      completedAudits,
      failedAudits,
      uniqueDomains,
      averageScores: {
        overall: avgOverallScore,
        performance: avgPerformanceScore,
        seo: avgSeoScore,
      },
      mostCommonIssues,
      monthlyData,
      scoreDistribution,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getMonthlyData(audits: any[]) {
  const monthlyMap = new Map<string, { completed: number; failed: number }>();

  // Get last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    monthlyMap.set(monthKey, { completed: 0, failed: 0 });
  }

  // Count audits by month
  audits.forEach(audit => {
    const auditDate = new Date(audit.createdAt);
    const monthKey = auditDate.toLocaleString('default', { month: 'short', year: '2-digit' });

    if (monthlyMap.has(monthKey)) {
      const data = monthlyMap.get(monthKey)!;
      if (audit.status === 'COMPLETED') {
        data.completed++;
      } else if (audit.status === 'FAILED') {
        data.failed++;
      }
    }
  });

  return Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    ...data,
  }));
}
