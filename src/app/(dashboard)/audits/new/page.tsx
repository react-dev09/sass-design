'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewAuditPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!url.trim()) {
        throw new Error('Please enter a valid URL');
      }

      const auditUrl = url.startsWith('http') ? url : `https://${url}`;

      // Capture website screenshot
      let screenshotUrl = null;
      try {
        console.log('🔍 [AUDIT] Calling screenshot API for URL:', auditUrl);
        const screenshotRes = await fetch('/api/screenshot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: auditUrl }),
        });
        console.log('📸 [AUDIT] Screenshot API response status:', screenshotRes.status);

        if (screenshotRes.ok) {
          const screenshotData = await screenshotRes.json();
          screenshotUrl = screenshotData.screenshotUrl;
          console.log('✅ [AUDIT] Screenshot URL generated:', screenshotUrl);
        } else {
          console.log('❌ [AUDIT] Screenshot API failed with status:', screenshotRes.status);
        }
      } catch (e) {
        console.log('❌ [AUDIT] Screenshot capture exception:', e);
      }

      // Call the API to fetch real audit data (which queries PageSpeed Insights)
      console.log('🔍 [AUDIT] Calling /api/audit/create for URL:', auditUrl);
      const auditRes = await fetch('/api/audit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: auditUrl }),
      });

      if (!auditRes.ok) {
        throw new Error('Failed to run audit. Please try again.');
      }

      const { auditId: mockAuditId, audit: realAuditData } = await auditRes.json();
      console.log('✅ [AUDIT] Audit API successful:', mockAuditId);

      // Save real audit data to localStorage
      localStorage.setItem(`audit_${mockAuditId}`, JSON.stringify({
        ...realAuditData,
        screenshotUrl: screenshotUrl || realAuditData.screenshotUrl,
      }));

      router.push(`/audits/${mockAuditId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">New Audit</span>
        </div>
        <h1 className="text-3xl font-bold text-black">Run a Website Audit</h1>
        <p className="text-gray-600 mt-2">
          Enter any website URL to get a comprehensive AI-powered audit covering performance, SEO, and more.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-3">Website URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="example.com or https://example.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50"
              />
              <p className="text-xs text-gray-600 mt-2">
                We'll analyze performance, SEO, accessibility, UX, and conversion optimization.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#9250e6' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7e3fc0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#9250e6')}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Running Audit...
                </>
              ) : (
                <>
                  Run Audit
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Pro tip:</strong> Audits analyze Core Web Vitals, SEO structure, accessibility compliance, UX patterns, and conversion optimization. Results are available instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
