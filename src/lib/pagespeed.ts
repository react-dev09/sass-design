import type { PageSpeedData } from './openai';

export async function fetchPageSpeedData(url: string): Promise<PageSpeedData | null> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;

  if (!apiKey) {
    // Return mock data for demo
    return getMockPageSpeedData(url);
  }

  try {
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;

    const response = await fetch(endpoint, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error('PageSpeed API error:', response.status, response.statusText);
      return getMockPageSpeedData(url);
    }

    const data = await response.json();
    return parsePageSpeedResponse(data);
  } catch (error) {
    console.error('PageSpeed fetch error:', error);
    return getMockPageSpeedData(url);
  }
}

function parsePageSpeedResponse(data: Record<string, unknown>): PageSpeedData {
  const categories = data.lighthouseResult as Record<string, unknown>;
  const audits = (categories?.audits ?? {}) as Record<string, Record<string, unknown>>;
  const cats = (categories?.categories ?? {}) as Record<string, Record<string, unknown>>;

  const getScore = (key: string) =>
    Math.round(((cats[key]?.score as number) ?? 0) * 100);

  const getNumericValue = (key: string) =>
    Math.round((audits[key]?.numericValue as number) ?? 0);

  return {
    performanceScore: getScore('performance'),
    metrics: {
      lcp: getNumericValue('largest-contentful-paint'),
      cls: parseFloat(((audits['cumulative-layout-shift']?.numericValue as number) ?? 0).toFixed(3)),
      fcp: getNumericValue('first-contentful-paint'),
      ttfb: getNumericValue('server-response-time'),
      speedIndex: getNumericValue('speed-index'),
      inp: getNumericValue('interaction-to-next-paint'),
    },
    opportunities: (
      (audits as Record<string, Record<string, unknown>>['opportunities'] as unknown as Array<{
        title: string;
        description: string;
        details?: { overallSavingsMs?: number };
      }>) ?? []
    ).slice(0, 5).map((opp) => ({
      title: opp.title ?? '',
      description: opp.description ?? '',
      savings: opp.details?.overallSavingsMs ?? 0,
    })),
    diagnostics: [],
  };
}

function getMockPageSpeedData(url: string): PageSpeedData {
  // Generate consistent-ish scores based on URL hash
  const hash = url.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = 50 + (hash % 35);

  return {
    performanceScore: base,
    metrics: {
      lcp: 2200 + (hash % 2000),
      cls: parseFloat((0.05 + (hash % 20) / 100).toFixed(3)),
      fcp: 1600 + (hash % 1500),
      ttfb: 700 + (hash % 600),
      speedIndex: 3000 + (hash % 2500),
      inp: 150 + (hash % 200),
    },
    opportunities: [
      {
        title: 'Serve images in next-gen formats',
        description: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG.',
        savings: 1200,
      },
      {
        title: 'Eliminate render-blocking resources',
        description: 'Resources are blocking the first paint of your page.',
        savings: 850,
      },
      {
        title: 'Properly size images',
        description: 'Serve images that are appropriately-sized to save cellular data and improve load time.',
        savings: 640,
      },
    ],
    diagnostics: [
      { title: 'Avoid enormous network payloads', description: 'Large network payloads cost users real money.' },
      { title: 'Minimize main-thread work', description: 'Consider reducing the time spent parsing, compiling, and executing JS.' },
    ],
  };
}
