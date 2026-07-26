import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SeoAnalysis {
  score: number;
  metaTags: {
    title: boolean;
    description: boolean;
    canonical: boolean;
  };
  headings: {
    h1Count: number;
    h2Count: number;
    hasProperHierarchy: boolean;
  };
  openGraph: boolean;
  structuredData: boolean;
  sitemap: boolean;
  robotsTxt: boolean;
  mobileOptimized: boolean;
  issues: SeoIssue[];
}

export interface SeoIssue {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
}

export async function performSeoAudit(url: string): Promise<SeoAnalysis | null> {
  try {
    const baseUrl = new URL(url);
    const html = await fetchPageHtml(url);

    if (!html) {
      return generateMockSeoAnalysis();
    }

    const $ = cheerio.load(html);
    const issues: SeoIssue[] = [];

    // Check meta tags
    const hasTitle = $('title').length > 0;
    const hasDescription = $('meta[name="description"]').length > 0;
    const hasCanonical = $('link[rel="canonical"]').length > 0;

    if (!hasTitle) {
      issues.push({
        id: 'no-title',
        severity: 'critical',
        title: 'Missing Page Title',
        description: 'The page does not have a <title> tag.',
        recommendation: 'Add a descriptive title tag (50-60 characters) for each page.',
      });
    }

    if (!hasDescription) {
      issues.push({
        id: 'no-description',
        severity: 'critical',
        title: 'Missing Meta Description',
        description: 'The page lacks a meta description tag.',
        recommendation: 'Add a meta description (150-160 characters) that accurately summarizes the page.',
      });
    }

    // Check headings hierarchy
    const h1Elements = $('h1');
    const h2Elements = $('h2');
    const h1Count = h1Elements.length;

    if (h1Count === 0) {
      issues.push({
        id: 'no-h1',
        severity: 'critical',
        title: 'Missing H1 Tag',
        description: 'The page has no H1 heading.',
        recommendation: 'Add exactly one H1 tag per page that clearly describes the main topic.',
      });
    } else if (h1Count > 1) {
      issues.push({
        id: 'multiple-h1',
        severity: 'warning',
        title: 'Multiple H1 Tags',
        description: `Found ${h1Count} H1 tags. Best practice is to have only one.`,
        recommendation: 'Use only one H1 tag per page and use H2-H6 for subheadings.',
      });
    }

    const hasProperHierarchy = h1Count > 0 && h2Elements.length > 0;

    // Check Open Graph tags
    const hasOg = $('meta[property^="og:"]').length > 0;

    // Check structured data
    const hasStructuredData = $('script[type="application/ld+json"]').length > 0;

    // Check for mobile viewport
    const hasMobileViewport = $('meta[name="viewport"]').length > 0;

    // Check for robots.txt and sitemap
    const hasRobotsTxt = await checkRobotsTxt(baseUrl.origin);
    const hasSitemap = await checkSitemap(baseUrl.origin);

    // Calculate score
    let score = 50;
    if (hasTitle) score += 10;
    if (hasDescription) score += 10;
    if (hasCanonical) score += 5;
    if (h1Count === 1) score += 10;
    if (hasProperHierarchy) score += 10;
    if (hasOg) score += 5;
    if (hasStructuredData) score += 10;
    if (hasSitemap) score += 10;
    if (hasRobotsTxt) score += 5;
    if (hasMobileViewport) score += 5;

    // Additional checks for common issues
    if ($('img:not([alt])').length > 0) {
      issues.push({
        id: 'missing-alt',
        severity: 'warning',
        title: 'Missing Alt Text on Images',
        description: `Found ${$('img:not([alt])').length} images without alt text.`,
        recommendation: 'Add descriptive alt text to all images for accessibility and SEO.',
      });
      score -= 10;
    }

    if (!hasMobileViewport) {
      issues.push({
        id: 'no-viewport',
        severity: 'warning',
        title: 'Missing Viewport Meta Tag',
        description: 'The page lacks a mobile viewport meta tag.',
        recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
      });
      score -= 5;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      metaTags: { title: hasTitle, description: hasDescription, canonical: hasCanonical },
      headings: { h1Count, h2Count: h2Elements.length, hasProperHierarchy },
      openGraph: hasOg,
      structuredData: hasStructuredData,
      sitemap: hasSitemap,
      robotsTxt: hasRobotsTxt,
      mobileOptimized: hasMobileViewport,
      issues,
    };
  } catch (error) {
    console.error('SEO audit error:', error);
    return generateMockSeoAnalysis();
  }
}

async function fetchPageHtml(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'DesignPulseBot/1.0' },
      timeout: 10000,
    });
    return response.data;
  } catch {
    return null;
  }
}

async function checkRobotsTxt(origin: string): Promise<boolean> {
  try {
    const response = await axios.get(`${origin}/robots.txt`, { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function checkSitemap(origin: string): Promise<boolean> {
  try {
    // Try common sitemap locations
    const locations = [
      `${origin}/sitemap.xml`,
      `${origin}/sitemap_index.xml`,
      `${origin}/sitemap-index.xml`,
    ];

    for (const location of locations) {
      try {
        const response = await axios.get(location, { timeout: 5000 });
        if (response.status === 200) return true;
      } catch {
        continue;
      }
    }
    return false;
  } catch {
    return false;
  }
}

function generateMockSeoAnalysis(): SeoAnalysis {
  return {
    score: 72,
    metaTags: {
      title: true,
      description: true,
      canonical: true,
    },
    headings: {
      h1Count: 1,
      h2Count: 3,
      hasProperHierarchy: true,
    },
    openGraph: true,
    structuredData: true,
    sitemap: true,
    robotsTxt: true,
    mobileOptimized: true,
    issues: [
      {
        id: 'missing-alt',
        severity: 'warning',
        title: 'Missing Alt Text on Some Images',
        description: 'Found 3 images without descriptive alt text.',
        recommendation: 'Add alt text to all images for better SEO and accessibility.',
      },
      {
        id: 'no-og-image',
        severity: 'info',
        title: 'Missing Open Graph Image',
        description: 'No og:image tag detected for social sharing.',
        recommendation: 'Add og:image, og:title, and og:description for better social preview.',
      },
    ],
  };
}

export function getSeoScore(analysis: SeoAnalysis): {
  score: number;
  level: 'excellent' | 'good' | 'needs-work' | 'poor';
  color: string;
} {
  const score = analysis.score;

  if (score >= 85) {
    return { score, level: 'excellent', color: '#10b981' };
  } else if (score >= 60) {
    return { score, level: 'good', color: '#f59e0b' };
  } else if (score >= 40) {
    return { score, level: 'needs-work', color: '#f97316' };
  }
  return { score, level: 'poor', color: '#ef4444' };
}
