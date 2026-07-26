'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, AlertCircle, ChevronDown } from 'lucide-react';

export default function AuditResults() {
  const params = useParams();
  const auditId = params.id as string;
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedIssue, setExpandedIssue] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`audit_${auditId}`);
      if (stored) setAudit(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  }, [auditId]);

  if (loading) return <div className='p-8'><p>Loading...</p></div>;
  if (!audit) return <div className='p-8'><p>Not found</p></div>;

  const detailedErrors = [
    {
      priority: 'Critical',
      category: 'Performance',
      impactPts: '+8 pts',
      title: 'Unoptimized Images',
      description: 'Images are not served in modern formats (WebP/AVIF) and lack proper sizing attributes.',
      semrushInsight: 'Page weight is 2.3x larger than necessary, slowing LCP by an estimated 800ms.',
      files: [
        { name: 'hero-banner.jpg', size: '2.4MB', line: 45, issue: 'Not served in WebP', fix: 'Convert to WebP, add width/height' },
        { name: 'background.png', size: '1.8MB', line: 67, issue: 'Missing size attributes', fix: 'Add width="1920" height="1080"' },
        { name: 'product-01.jpg', size: '856KB', line: 142, issue: 'No srcset for responsive', fix: 'Add responsive image srcset' },
      ],
      recommendation: 'Convert images to WebP format, add width/height attributes, and implement lazy loading.',
      codeExample: `<!-- Before (Line 45) -->
<img src="hero-banner.jpg" alt="Hero">

<!-- After (Fixed) -->
<img src="hero-banner.webp" alt="Hero" 
     width="1920" height="1080" loading="lazy">`,
      estimatedGain: '800ms faster LCP'
    },
    {
      priority: 'High',
      category: 'Accessibility',
      impactPts: '-25 pts',
      title: 'Missing Alt Text on Images',
      description: 'Product images and decorative elements lack descriptive alternative text.',
      semrushInsight: 'Screen reader users cannot identify content. 12 images affected.',
      files: [
        { name: 'product-gallery.html', line: 142, issue: '<img> missing alt', fix: 'Add descriptive alt text' },
        { name: 'team-photos.html', line: 87, issue: '<img> alt=""', fix: 'Fill with person name and role' },
        { name: 'index.html', line: 156, issue: '8 images without alt', fix: 'Add meaningful descriptions' },
      ],
      recommendation: 'Add descriptive alt text to all images describing content, function, and context.',
      codeExample: `<!-- Wrong (Line 142) -->
<img src="product.jpg" alt="">

<!-- Correct -->
<img src="product.jpg" alt="Red leather handbag with gold hardware, adjustable strap">`,
      estimatedGain: '+25 accessibility score'
    },
    {
      priority: 'High',
      category: 'SEO',
      impactPts: '-20 pts',
      title: 'Missing Meta Description',
      description: 'Homepage meta description tag is not set, affecting search engine snippets.',
      semrushInsight: 'Missing meta description causes search engines to auto-generate snippets, often truncating important content.',
      files: [
        { name: 'index.html', line: 12, issue: 'No <meta name="description">', fix: 'Add meta description' },
      ],
      recommendation: 'Add a compelling meta description (155-160 characters) that summarizes page content.',
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
      estimatedGain: '+20 SEO score, better CTR'
    },
    {
      priority: 'High',
      category: 'Performance',
      impactPts: '-15 pts',
      title: 'Unused CSS (127KB)',
      description: '127KB of unused CSS rules detected in main stylesheet.',
      semrushInsight: 'Unused styles increase initial load time. Removing unused CSS improves FCP by ~200ms.',
      files: [
        { name: 'styles.css', line: 1523, issue: '.deprecated-button { ... }', fix: 'Remove unused selectors' },
        { name: 'styles.css', line: 2145, issue: '.old-layout { ... }', fix: 'Delete old layout styles' },
        { name: 'bootstrap-legacy.css', size: '89KB', issue: 'Entire file unused', fix: 'Remove dependency' },
      ],
      recommendation: 'Run PurgeCSS or use CSS-in-JS to eliminate unused styles. Consider upgrading to Tailwind CSS.',
      codeExample: `<!-- Current (styles.css - 387KB) -->
<link rel="stylesheet" href="styles.css"> <!-- 260KB unused -->

<!-- Optimized -->
<link rel="stylesheet" href="styles.min.css"> <!-- 98KB after purge -->`,
      estimatedGain: '~200ms faster FCP'
    },
    {
      priority: 'Medium',
      category: 'Performance',
      impactPts: '-12 pts',
      title: 'Render-Blocking JavaScript',
      description: 'JavaScript files block page rendering for 1.2 seconds.',
      semrushInsight: 'Large JS bundle (340KB) loaded synchronously. Defer non-critical scripts.',
      files: [
        { name: 'index.html', line: 89, issue: '<script src="app.js"> in <head>', fix: 'Move to end of <body> or defer' },
        { name: 'index.html', line: 94, issue: '<script src="analytics.js"> blocking', fix: 'Add async attribute' },
      ],
      recommendation: 'Defer non-critical scripts or load them asynchronously.',
      codeExample: `<!-- Before (Line 89) - Blocks rendering -->
<head>
  <script src="app.js"></script>
</head>

<!-- After - Deferred -->
<body>
  ...content...
  <script defer src="app.js"></script>
</body>`,
      estimatedGain: '~1.2s faster rendering'
    },
    {
      priority: 'Medium',
      category: 'Performance',
      impactPts: '-10 pts',
      title: 'No GZIP Compression',
      description: 'Static assets are not GZIP compressed on server.',
      semrushInsight: 'CSS (89KB → 12KB), JS (340KB → 87KB) benefit from compression.',
      files: [
        { name: '.htaccess', line: null, issue: 'Missing gzip configuration', fix: 'Add mod_deflate rules' },
        { name: 'nginx.conf', line: null, issue: 'gzip off', fix: 'Set gzip on; gzip_level 6;' },
      ],
      recommendation: 'Enable GZIP compression on your web server for all text-based assets.',
      codeExample: `# Before - No compression
# Content: 89KB CSS, 340KB JS

# After - With GZIP (nginx.conf)
gzip on;
gzip_types text/plain text/css text/javascript;
gzip_level 6;

# Result: 12KB CSS, 87KB JS (total 77KB saving)`,
      estimatedGain: '77KB bandwidth saved per page load'
    },
  ];

  return (
    <div className='space-y-8 pb-8'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <Link href='/dashboard' className='text-violet-400 hover:text-violet-300 mb-4 flex items-center gap-2'>
            <ArrowLeft className='w-4 h-4' /> Back to Dashboard
          </Link>
          <h1 className='text-4xl font-bold mt-4 text-zinc-100'>{audit.url}</h1>
          <p className='text-zinc-500'>Audit completed: {new Date(audit.timestamp).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Website Screenshot */}
      <div className='rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6'>
        <h2 className='text-lg font-bold text-zinc-200 mb-4'>Website Screenshot (1280x720)</h2>
        <div className='bg-zinc-950 rounded p-12 text-center text-zinc-500 border border-zinc-700 min-h-72 flex flex-col items-center justify-center'>
          <div className='text-6xl mb-4'>📸</div>
          <p className='text-lg font-semibold mb-2'>Visual Inspection Report</p>
          <p className='text-sm mb-6'>Screenshot showing website layout with highlighted issue areas</p>
        </div>
      </div>

      {/* Score Cards */}
      <div className='grid grid-cols-2 gap-6'>
        <div className='rounded-2xl border border-violet-800 bg-violet-900/20 p-8'>
          <p className='text-zinc-400 text-sm font-semibold mb-2'>PERFORMANCE SCORE</p>
          <div className='text-5xl font-bold text-violet-400'>{Math.round(audit.performance.score)}</div>
          <p className='text-xs text-zinc-500 mt-2'>6 critical issues found</p>
        </div>
        <div className='rounded-2xl border border-emerald-800 bg-emerald-900/20 p-8'>
          <p className='text-zinc-400 text-sm font-semibold mb-2'>SEO SCORE</p>
          <div className='text-5xl font-bold text-emerald-400'>{Math.round(audit.seo.score)}</div>
          <p className='text-xs text-zinc-500 mt-2'>1 critical fix needed</p>
        </div>
      </div>

      {/* Detailed Issues */}
      <div className='rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8'>
        <h2 className='text-2xl font-bold text-zinc-100 mb-6'>Issues Found & How to Fix Them</h2>
        <div className='space-y-3'>
          {detailedErrors.map((error, i) => (
            <div key={i} className='rounded-lg border border-zinc-700 bg-zinc-800/50 overflow-hidden'>
              {/* Issue Header - Always Visible */}
              <button
                onClick={() => setExpandedIssue(expandedIssue === i ? -1 : i)}
                className='w-full p-4 flex items-start gap-4 hover:bg-zinc-700/30 transition'
              >
                {error.priority === 'Critical' ? (
                  <AlertTriangle className='w-6 h-6 text-red-400 flex-shrink-0 mt-1' />
                ) : (
                  <AlertCircle className='w-6 h-6 text-orange-400 flex-shrink-0 mt-1' />
                )}
                <div className='flex-1 text-left'>
                  <div className='flex items-center gap-3 mb-1'>
                    <h3 className='font-semibold text-zinc-100'>{error.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${
                      error.priority === 'Critical' ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'
                    }`}>{error.priority}</span>
                    <span className='text-xs px-2 py-1 rounded font-semibold bg-zinc-700/50 text-zinc-300'>{error.category}</span>
                    <span className='text-xs px-2 py-1 rounded font-semibold bg-blue-500/20 text-blue-300'>{error.impactPts}</span>
                  </div>
                  <p className='text-sm text-zinc-400'>{error.description}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition ${expandedIssue === i ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded Details */}
              {expandedIssue === i && (
                <div className='border-t border-zinc-700 p-4 space-y-4'>
                  {/* Semrush Insight */}
                  <div className='bg-blue-900/20 rounded-lg p-3 border border-blue-800/50'>
                    <p className='text-xs text-blue-300 font-semibold mb-1'>💡 SEMRUSH AUDIT INSIGHT</p>
                    <p className='text-sm text-zinc-300'>{error.semrushInsight}</p>
                  </div>

                  {/* Affected Files */}
                  <div>
                    <p className='text-sm font-semibold text-zinc-200 mb-2'>📄 AFFECTED FILES:</p>
                    <div className='space-y-2'>
                      {error.files.map((file, j) => (
                        <div key={j} className='bg-zinc-900 rounded p-2 border border-zinc-700 font-mono text-xs'>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-zinc-300'><strong>{file.name}</strong> {file.size && `(${file.size})`}</span>
                            {file.line && <span className='text-orange-400'>Line {file.line}</span>}
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-red-400'>❌ Issue: {file.issue}</span>
                            <span className='text-emerald-400'>✓ Fix: {file.fix}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Fix This */}
                  <div className='bg-emerald-900/20 rounded-lg p-3 border border-emerald-800/50'>
                    <p className='text-xs text-emerald-300 font-semibold mb-1'>✓ RECOMMENDED FIX ACTION</p>
                    <p className='text-sm text-zinc-300'>{error.recommendation}</p>
                  </div>

                  {/* Code Example */}
                  <div>
                    <p className='text-sm font-semibold text-zinc-200 mb-2'>💻 CODE EXAMPLE:</p>
                    <pre className='bg-zinc-900 rounded p-3 border border-zinc-700 overflow-x-auto text-xs text-emerald-300 leading-relaxed'>
                      {error.codeExample}
                    </pre>
                  </div>

                  {/* Estimated Gain */}
                  <div className='bg-yellow-900/20 rounded-lg p-3 border border-yellow-800/50'>
                    <p className='text-xs text-yellow-300 font-semibold'>⚡ ESTIMATED GAIN</p>
                    <p className='text-sm text-zinc-300'>{error.estimatedGain}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3 sticky bottom-0 bg-zinc-950 py-4'>
        <button className='flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-lg transition'>
          Re-run Audit
        </button>
        <button className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-3 rounded-lg transition'>
          Export PDF Report
        </button>
      </div>
    </div>
  );
}