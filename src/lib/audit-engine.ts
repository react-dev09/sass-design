import { prisma } from './prisma';
import { fetchPageSpeedData } from './pagespeed';
import { captureScreenshot, getFaviconUrl } from './screenshot';
import { generateAIInsights } from './openai';
import { normalizeUrl } from './utils';

export async function runAudit(auditId: string, url: string) {
  const normalizedUrl = normalizeUrl(url);

  try {
    // Mark as running
    await prisma.audit.update({
      where: { id: auditId },
      data: { status: 'RUNNING' },
    });

    // Step 1: Fetch page title
    let title: string | undefined;
    try {
      const res = await fetch(normalizedUrl, {
        headers: { 'User-Agent': 'DesignPulseBot/1.0' },
        signal: AbortSignal.timeout(10000),
      });
      const html = await res.text();
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      title = match?.[1]?.trim();
    } catch {
      title = undefined;
    }

    // Step 2: Parallel — screenshot + PageSpeed
    const [screenshotUrl, pageSpeedData] = await Promise.allSettled([
      captureScreenshot(normalizedUrl),
      fetchPageSpeedData(normalizedUrl),
    ]);

    const screenshot =
      screenshotUrl.status === 'fulfilled' ? screenshotUrl.value : null;
    const psData =
      pageSpeedData.status === 'fulfilled' ? pageSpeedData.value : null;

    // Step 3: Generate AI insights
    const { scores, report } = await generateAIInsights({
      url: normalizedUrl,
      title,
      pageSpeedData: psData ?? undefined,
    });

    // Step 4: Save to DB
    await prisma.audit.update({
      where: { id: auditId },
      data: {
        status: 'COMPLETED',
        title,
        favicon: getFaviconUrl(normalizedUrl),
        desktopScreenshot: screenshot,
        aiReport: JSON.parse(JSON.stringify(report)),
        pageSpeedData: psData ? JSON.parse(JSON.stringify(psData)) : null,
        overallScore: scores.overall,
        performanceScore: scores.performance,
        seoScore: scores.seo,
        accessibilityScore: scores.accessibility,
        uxScore: scores.ux,
        conversionScore: scores.conversion,
      },
    });

    return { success: true, scores, report };
  } catch (error) {
    console.error('Audit engine error:', error);
    await prisma.audit.update({
      where: { id: auditId },
      data: {
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    return { success: false, error };
  }
}
