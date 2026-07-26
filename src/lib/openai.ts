import type { AIReport, AuditScores } from '@/types/audit';

let _openai: import('openai').default | null = null;

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!_openai) {
    const OpenAI = require('openai').default;
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export interface PageSpeedData {
  performanceScore: number;
  metrics: {
    lcp: number;
    cls: number;
    fcp: number;
    ttfb: number;
    speedIndex: number;
    inp: number;
  };
  opportunities: Array<{ title: string; description: string; savings: number }>;
  diagnostics: Array<{ title: string; description: string }>;
}

export interface AuditContext {
  url: string;
  title?: string;
  pageSpeedData?: PageSpeedData;
  htmlSample?: string;
}

export async function generateAIInsights(
  context: AuditContext
): Promise<{ scores: AuditScores; report: AIReport }> {
  // If no API key, return rich mock data for demo purposes
  if (!process.env.OPENAI_API_KEY) {
    return generateMockReport(context);
  }

  const client = getOpenAI();
  if (!client) return generateMockReport(context);

  const prompt = buildPrompt(context);

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are DesignPulse AI, an expert website auditor. Analyze the provided website data and return a comprehensive JSON audit report. Be specific, actionable, and professional. Always return valid JSON matching the exact schema provided.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 4000,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from OpenAI');

  const parsed = JSON.parse(content);
  return parsed;
}

function buildPrompt(context: AuditContext): string {
  const { url, title, pageSpeedData } = context;
  const perfScore = pageSpeedData?.performanceScore ?? 'unknown';
  const metrics = pageSpeedData?.metrics;

  return `
Analyze the following website and generate a comprehensive audit report as JSON.

Website URL: ${url}
Page Title: ${title ?? 'Unknown'}
Performance Score: ${perfScore}/100
${metrics ? `
Core Web Vitals:
- LCP: ${metrics.lcp}ms (target: <2500ms)
- CLS: ${metrics.cls} (target: <0.1)
- FCP: ${metrics.fcp}ms (target: <1800ms)
- TTFB: ${metrics.ttfb}ms (target: <800ms)
- INP: ${metrics.inp}ms (target: <200ms)
- Speed Index: ${metrics.speedIndex}ms
` : ''}

Return a JSON object with EXACTLY this structure:
{
  "scores": {
    "overall": <0-100>,
    "performance": <0-100>,
    "seo": <0-100>,
    "accessibility": <0-100>,
    "ux": <0-100>,
    "conversion": <0-100>
  },
  "report": {
    "executiveSummary": "<2-3 sentence professional summary>",
    "topIssues": [
      {
        "id": "issue-1",
        "category": "performance|seo|accessibility|ux|conversion",
        "severity": "critical|warning|info",
        "title": "<concise title>",
        "description": "<what the issue is>",
        "impact": "<business/user impact>",
        "recommendation": "<specific fix>"
      }
    ],
    "quickWins": [
      {
        "title": "<win title>",
        "description": "<what to do>",
        "effort": "low|medium|high",
        "impact": "low|medium|high"
      }
    ],
    "priorityRoadmap": [
      {
        "priority": 1,
        "title": "<action title>",
        "description": "<what to do>",
        "category": "<category>",
        "timeframe": "immediate|short-term|long-term"
      }
    ],
    "performanceMetrics": {
      "lcp": ${metrics?.lcp ?? 2800},
      "cls": ${metrics?.cls ?? 0.15},
      "fcp": ${metrics?.fcp ?? 1900},
      "inp": ${metrics?.inp ?? 220},
      "ttfb": ${metrics?.ttfb ?? 900},
      "speedIndex": ${metrics?.speedIndex ?? 3200}
    },
    "seoAnalysis": {
      "metaTags": { "title": true|false, "description": true|false, "canonical": true|false },
      "headings": { "h1Count": <number>, "hasProperHierarchy": true|false },
      "openGraph": true|false,
      "structuredData": true|false,
      "sitemap": true|false,
      "robotsTxt": true|false
    },
    "accessibilityAnalysis": {
      "contrastIssues": <number>,
      "missingAltText": <number>,
      "ariaIssues": <number>,
      "keyboardNavigation": true|false
    },
    "uxAnalysis": {
      "mobileResponsive": true|false,
      "loadingSpeed": "fast|moderate|slow",
      "navigationClarity": <0-100>,
      "typographyScore": <0-100>
    },
    "conversionAnalysis": {
      "ctaVisibility": <0-100>,
      "trustSignals": ["<signal1>", "<signal2>"],
      "formUsability": <0-100>,
      "userJourneyClarity": <0-100>
    }
  }
}

Generate 5-8 top issues, 3-5 quick wins, and 5-7 roadmap items. Be specific to this URL and realistic based on the performance data.
`;
}

export function generateMockReport(context: AuditContext): { scores: AuditScores; report: AIReport } {
  const basePerf = context.pageSpeedData?.performanceScore ?? 78;

  // Generate varied scores based on URL hash for uniqueness
  const urlHash = context.url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed1 = (urlHash * 73) % 100;
  const seed2 = (urlHash * 137) % 100;
  const seed3 = (urlHash * 251) % 100;
  const seed4 = (urlHash * 419) % 100;

  const seoScore = Math.max(45, Math.min(95, 65 + (seed1 - 50) / 2));
  const accessibilityScore = Math.max(40, Math.min(90, 70 + (seed2 - 50) / 2));
  const uxScore = Math.max(50, Math.min(92, 75 + (seed3 - 50) / 2));
  const conversionScore = Math.max(35, Math.min(85, 60 + (seed4 - 50) / 2));
  const overallScore = Math.round((basePerf + seoScore + accessibilityScore + uxScore + conversionScore) / 5);

  return {
    scores: {
      overall: overallScore,
      performance: Math.round(basePerf),
      seo: Math.round(seoScore),
      accessibility: Math.round(accessibilityScore),
      ux: Math.round(uxScore),
      conversion: Math.round(conversionScore),
    },
    report: {
      executiveSummary: `${context.url} shows moderate performance with key opportunities for improvement across performance, accessibility, and conversion optimization. Core Web Vitals fall below recommended thresholds, which may be impacting search rankings and user retention. Addressing the identified critical issues could yield a 20-35% improvement in overall audit score.`,
      topIssues: [
        {
          id: 'issue-1',
          category: 'performance',
          severity: 'critical',
          title: 'Render-Blocking Resources',
          description: 'Multiple CSS and JavaScript files are blocking the initial render of the page.',
          impact: 'Users experience a blank screen for 1.2s longer than necessary, increasing bounce rate.',
          recommendation: 'Use <link rel="preload"> for critical CSS and defer non-critical JS with async/defer attributes.',
          affectedFiles: [
            { name: 'index.html', line: 89, issue: '<script src="app.js"> in <head>', fix: 'Move to end of <body> or defer' },
            { name: 'index.html', line: 94, issue: '<script src="analytics.js"> blocking', fix: 'Add async attribute' },
          ],
          codeExample: `<!-- Before (Line 89) - Blocks rendering -->
<head>
  <script src="app.js"></script>
</head>

<!-- After - Deferred -->
<body>
  ...content...
  <script defer src="app.js"></script>
</body>`,
          estimatedGain: '~1.2s faster rendering',
        },
        {
          id: 'issue-2',
          category: 'performance',
          severity: 'critical',
          title: 'Unoptimized Images',
          description: 'Images are not served in modern formats (WebP/AVIF) and lack proper sizing attributes.',
          impact: 'Page weight is 2.3x larger than necessary, slowing LCP by an estimated 800ms.',
          recommendation: 'Convert images to WebP format, add width/height attributes, and implement lazy loading.',
          affectedFiles: [
            { name: 'hero-banner.jpg', size: '2.4MB', line: 45, issue: 'Not served in WebP', fix: 'Convert to WebP, add width/height' },
            { name: 'background.png', size: '1.8MB', line: 67, issue: 'Missing size attributes', fix: 'Add width="1920" height="1080"' },
            { name: 'product-01.jpg', size: '856KB', line: 142, issue: 'No srcset for responsive', fix: 'Add responsive image srcset' },
          ],
          codeExample: `<!-- Before (Line 45) -->
<img src="hero-banner.jpg" alt="Hero">

<!-- After (Fixed) -->
<img src="hero-banner.webp" alt="Hero"
     width="1920" height="1080" loading="lazy">`,
          estimatedGain: '800ms faster LCP',
        },
        {
          id: 'issue-3',
          category: 'seo',
          severity: 'warning',
          title: 'Missing Meta Description',
          description: 'The page lacks a meta description tag, which is used in search engine result snippets.',
          impact: 'Lower click-through rates from search results and reduced crawlability.',
          recommendation: 'Add a compelling meta description of 150-160 characters that includes target keywords.',
          affectedFiles: [
            { name: 'index.html', line: 12, issue: 'No <meta name="description">', fix: 'Add meta description' },
          ],
          codeExample: `<!-- Before (Line 12) -->
<head>
  <title>Premium Handbags</title>
  <!-- Missing description -->
</head>

<!-- After (Fixed) -->
<head>
  <title>Premium Leather Handbags | Eco-Friendly Design</title>
  <meta name="description" content="Premium leather handbags crafted from sustainable materials. Free shipping on orders over $50. Shop our curated collection of timeless styles.">
</head>`,
          estimatedGain: '+20 SEO score, better CTR',
        },
        {
          id: 'issue-4',
          category: 'accessibility',
          severity: 'critical',
          title: 'Insufficient Color Contrast',
          description: '8 elements have text-to-background contrast ratios below WCAG AA standards (4.5:1).',
          impact: 'Users with visual impairments cannot read content, creating legal compliance risks.',
          recommendation: 'Increase contrast ratios to at least 4.5:1 for normal text and 3:1 for large text.',
          affectedFiles: [
            { name: 'styles.css', line: 234, issue: 'text-gray-400 on light background', fix: 'Use text-gray-700 instead' },
            { name: 'header.html', line: 18, issue: '#666 text on #eee background', fix: 'Change to #333 or #222' },
          ],
          codeExample: `/* Before (Line 234) - Contrast ratio: 2.1:1 */
.text-gray-400 { color: #9ca3af; }

/* After (Fixed) - Contrast ratio: 7.2:1 */
.text-gray-700 { color: #374151; }

/* Or use Tailwind */
<p class="text-gray-700">Improved contrast</p>`,
          estimatedGain: 'WCAG AA compliance, +25 accessibility score',
        },
        {
          id: 'issue-5',
          category: 'accessibility',
          severity: 'warning',
          title: 'Missing Alt Text on Images',
          description: '12 images are missing descriptive alt text attributes.',
          impact: 'Screen reader users cannot understand image content; also impacts SEO image indexing.',
          recommendation: 'Add descriptive alt text to all meaningful images. Use alt="" for decorative images.',
          affectedFiles: [
            { name: 'product-gallery.html', line: 142, issue: '<img> missing alt', fix: 'Add descriptive alt text' },
            { name: 'team-photos.html', line: 87, issue: '<img> alt=""', fix: 'Fill with person name and role' },
            { name: 'index.html', line: 156, issue: '8 images without alt', fix: 'Add meaningful descriptions' },
          ],
          codeExample: `<!-- Wrong (Line 142) -->
<img src="product.jpg" alt="">

<!-- Correct -->
<img src="product.jpg" alt="Red leather handbag with gold hardware, adjustable strap">`,
          estimatedGain: '+25 accessibility score',
        },
        {
          id: 'issue-6',
          category: 'conversion',
          severity: 'warning',
          title: 'Weak CTA Placement',
          description: 'Primary call-to-action buttons are below the fold and lack visual prominence.',
          impact: 'Estimated 15-25% reduction in conversion rate due to poor CTA visibility.',
          recommendation: 'Place primary CTA above the fold, increase button size, and use high-contrast colors.',
          affectedFiles: [
            { name: 'index.html', line: 287, issue: 'CTA button at line 287 (below fold)', fix: 'Move to line 85 (above fold)' },
          ],
          codeExample: `<!-- Before -->
<!-- ~900px of content -->
<button class="bg-gray-500 px-4 py-2">Buy Now</button>

<!-- After -->
<!-- ~300px of content -->
<button class="bg-blue-600 px-8 py-4 text-lg font-bold">Buy Now</button>`,
          estimatedGain: '+15-25% conversion rate',
        },
        {
          id: 'issue-7',
          category: 'ux',
          severity: 'info',
          title: 'No Loading State Indicators',
          description: 'Interactive elements provide no visual feedback when actions are being processed.',
          impact: 'Users may click buttons multiple times or abandon interactions due to uncertainty.',
          recommendation: 'Add loading spinners, skeleton screens, and disabled states for all async interactions.',
          codeExample: `/* Before */
<button onclick="submitForm()">Submit</button>

/* After */
<button id="submitBtn" onclick="submitForm()"
        disabled-state="loading">
  <span id="loader" style="display:none">⏳</span>
  <span id="text">Submit</span>
</button>`,
          estimatedGain: 'Better UX, fewer duplicate submissions',
        },
      ],
      quickWins: [
        {
          title: 'Enable Browser Caching',
          description: 'Add Cache-Control headers to serve static assets from cache on repeat visits.',
          effort: 'low',
          impact: 'high',
        },
        {
          title: 'Add Open Graph Tags',
          description: 'Implement og:title, og:description, og:image for better social media sharing.',
          effort: 'low',
          impact: 'medium',
        },
        {
          title: 'Compress Text Assets',
          description: 'Enable gzip/brotli compression on your server for HTML, CSS, and JS files.',
          effort: 'low',
          impact: 'high',
        },
        {
          title: 'Fix Broken Links',
          description: 'Repair or remove the 3 broken internal links found during the audit.',
          effort: 'low',
          impact: 'medium',
        },
      ],
      priorityRoadmap: [
        {
          priority: 1,
          title: 'Fix Critical Accessibility Issues',
          description: 'Address color contrast failures and missing alt text to meet WCAG AA compliance.',
          category: 'accessibility',
          timeframe: 'immediate',
        },
        {
          priority: 2,
          title: 'Optimize Core Web Vitals',
          description: 'Implement image optimization, lazy loading, and defer render-blocking resources.',
          category: 'performance',
          timeframe: 'immediate',
        },
        {
          priority: 3,
          title: 'Strengthen SEO Foundation',
          description: 'Add missing meta tags, fix heading hierarchy, and submit sitemap to Google Search Console.',
          category: 'seo',
          timeframe: 'short-term',
        },
        {
          priority: 4,
          title: 'Redesign CTA Strategy',
          description: 'Reposition CTAs above the fold, add social proof nearby, and A/B test button copy.',
          category: 'conversion',
          timeframe: 'short-term',
        },
        {
          priority: 5,
          title: 'Implement Performance Monitoring',
          description: 'Set up Lighthouse CI, Core Web Vitals monitoring, and error tracking.',
          category: 'performance',
          timeframe: 'long-term',
        },
      ],
      performanceMetrics: {
        lcp: context.pageSpeedData?.metrics.lcp ?? 3200,
        cls: context.pageSpeedData?.metrics.cls ?? 0.18,
        fcp: context.pageSpeedData?.metrics.fcp ?? 2100,
        inp: context.pageSpeedData?.metrics.inp ?? 280,
        ttfb: context.pageSpeedData?.metrics.ttfb ?? 950,
        speedIndex: context.pageSpeedData?.metrics.speedIndex ?? 4100,
      },
      seoAnalysis: {
        metaTags: { title: true, description: false, canonical: true },
        headings: { h1Count: 1, hasProperHierarchy: false },
        openGraph: false,
        structuredData: false,
        sitemap: true,
        robotsTxt: true,
      },
      accessibilityAnalysis: {
        contrastIssues: 8,
        missingAltText: 12,
        ariaIssues: 5,
        keyboardNavigation: true,
      },
      uxAnalysis: {
        mobileResponsive: true,
        loadingSpeed: 'moderate',
        navigationClarity: 72,
        typographyScore: 68,
      },
      conversionAnalysis: {
        ctaVisibility: 52,
        trustSignals: ['SSL Certificate', 'Contact Info'],
        formUsability: 65,
        userJourneyClarity: 60,
      },
    },
  };
}
