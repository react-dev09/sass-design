'use client';

import { useEffect, useState } from 'react';
import { ScoreRing, CategoryScores } from '@/components/report/score-ring';
import { IssuesList } from '@/components/report/issues-list';
import { AIInsightsPanel } from '@/components/report/ai-insights';
import { SiteScreenshot } from '@/components/report/site-screenshot';
import { formatDate, getDomain } from '@/lib/utils';
import { ReportActions } from '@/components/report/report-actions';
import { PerformanceMetricsGrid } from '@/components/report/performance-metrics';
import { generateMockReport } from '@/lib/openai';
import type { Audit } from '@/types/audit';
import { ExternalLink, Smartphone, Monitor } from 'lucide-react';

interface AuditReportContentProps {
  auditId: string;
  defaultAudit: Audit;
}

type DeviceType = 'desktop' | 'mobile';

export function AuditReportContent({ auditId, defaultAudit }: AuditReportContentProps) {
  const [audit, setAudit] = useState<Audit>(defaultAudit);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    // Try to load audit data from localStorage
    try {
      const saved = localStorage.getItem(`audit_${auditId}`);
      if (saved) {
        const data = JSON.parse(saved);
        const domain = new URL(data.url).hostname;

        // If the data already contains scores and report (from our real API), use them!
        // Otherwise, fallback to generating a mock report (for backwards compatibility).
        let scores = data.scores;
        let report = data.report;

        if (!scores || !report) {
          const mock = generateMockReport({ url: data.url });
          scores = mock.scores;
          report = mock.report;
        }

        const updatedAudit: Audit = {
          id: auditId,
          url: data.url,
          title: data.url,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
          status: 'COMPLETED',
          isFavorite: false,
          userId: 'demo',
          screenshotUrl: data.screenshotUrl || undefined,
          scores: scores,
          report: report,
          createdAt: data.timestamp || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setAudit(updatedAudit);
      }
    } catch (error) {
      console.log('Failed to load audit from localStorage');
    }
    setIsLoaded(true);
  }, [auditId]);

  const { scores, report } = audit;

  // Check if this is a real audit (has screenshotUrl) or default example.com
  const isRealAudit = audit.screenshotUrl || (audit.url !== 'https://example.com');

  // Default scores to 0 if not a real audit
  const defaultScores = (isRealAudit && scores) ? scores : {
    overall: 0,
    performance: 0,
    seo: 0,
    accessibility: 0,
    ux: 0,
    conversion: 0,
  };

  // Generate mobile-specific scores (slightly lower than desktop)
  const mobileScores = deviceType === 'mobile' ? {
    ...defaultScores,
    overall: Math.max((defaultScores?.overall ?? 0) - 5, 0),
    performance: Math.max((defaultScores?.performance ?? 0) - 8, 0),
  } : defaultScores;

  return (
    <div className="space-y-8 page-enter" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          {audit.favicon && (
            <img src={audit.favicon} alt="" className="w-10 h-10 rounded flex-shrink-0 mt-1" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <a
                href={audit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors flex items-center gap-2"
              >
                {getDomain(audit.url)}
                <ExternalLink className="w-5 h-5 text-gray-400 hover:text-purple-600" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">{audit.url}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{formatDate(audit.createdAt)}</p>
          </div>
        </div>
        <ReportActions auditId={auditId} url={audit.url} isFavorite={audit.isFavorite} />
      </div>

      {/* Device Type Selector */}
      <div className="flex gap-3 border-b border-gray-200 pb-6">
        <button
          onClick={() => setDeviceType('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            deviceType === 'desktop'
              ? 'text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          style={deviceType === 'desktop' ? { backgroundColor: '#9250e6' } : {}}
        >
          <Monitor className="w-4 h-4" />
          Desktop
        </button>
        <button
          onClick={() => setDeviceType('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            deviceType === 'mobile'
              ? 'text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          style={deviceType === 'mobile' ? { backgroundColor: '#9250e6' } : {}}
        >
          <Smartphone className="w-4 h-4" />
          Mobile
        </button>
      </div>

      {/* Overall Score + Categories */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {mobileScores && (
            <>
              <div className="flex-shrink-0">
                <ScoreRing score={mobileScores.overall} label={`${deviceType === 'mobile' ? 'Mobile' : 'Desktop'} Score`} size="lg" />
              </div>
              <div className="flex-1 w-full">
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-4">
                  Category Scores
                </p>
                <CategoryScores scores={mobileScores} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Website Preview */}
      <SiteScreenshot
        screenshotUrl={audit.screenshotUrl ?? null}
        siteUrl={audit.url}
        title={audit.title}
        deviceType={deviceType}
      />

      {/* Performance Metrics */}
      {report?.performanceMetrics && (
        <PerformanceMetricsGrid metrics={report.performanceMetrics} />
      )}

      {/* Two-column layout: Issues + AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {report?.topIssues && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Issues Found ({report.topIssues.length})
            </h2>
            <IssuesList issues={report.topIssues} />
          </div>
        )}

        {report && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4">AI Recommendations</h2>
            <AIInsightsPanel report={report} />
          </div>
        )}
      </div>
    </div>
  );
}
