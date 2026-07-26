import { notFound } from 'next/navigation';
import { generateMockReport } from '@/lib/openai';
import type { Audit } from '@/types/audit';
import type { Metadata } from 'next';
import { AuditReportContent } from '@/components/report/audit-report-content';
import { getDomain } from '@/lib/utils';

// In production this would fetch from DB via the API
async function getAudit(id: string): Promise<Audit | null> {
  // For demo, generate a mock report based on the ID
  // In a real app, this would query a database with the audit data
  const mockUrl = 'https://example.com';
  const mock = generateMockReport({ url: mockUrl });

  return {
    id,
    url: mockUrl,
    title: 'Example Website',
    favicon: `https://www.google.com/s2/favicons?domain=example.com&sz=64`,
    status: 'COMPLETED',
    isFavorite: false,
    userId: 'demo',
    screenshotUrl: undefined,
    scores: mock.scores,
    report: mock.report,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) return { title: 'Report Not Found' };
  return {
    title: `Audit Report — ${getDomain(audit.url)}`,
    description: `AI-powered audit report for ${audit.url}`,
  };
}

export default async function AuditReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) notFound();

  return <AuditReportContent auditId={id} defaultAudit={audit} />;
}
