'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatRelativeTime, getDomain, getScoreColor, getScoreLabel, cn } from '@/lib/utils';
import { ExternalLink, RefreshCw, Trash2, Star } from 'lucide-react';
import type { Audit } from '@/types/audit';

const mockAudits: Audit[] = [
  {
    id: '1',
    url: 'https://stripe.com',
    title: 'Stripe – Financial Infrastructure for the Internet',
    favicon: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=64',
    status: 'COMPLETED',
    isFavorite: true,
    userId: 'u1',
    scores: { overall: 92, performance: 95, seo: 94, accessibility: 88, ux: 92, conversion: 91 },
    createdAt: '2024-07-24T14:00:00Z',
    updatedAt: '2024-07-24T14:00:00Z',
  },
  {
    id: '2',
    url: 'https://vercel.com',
    title: 'Vercel – The Frontend Cloud',
    favicon: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=64',
    status: 'COMPLETED',
    isFavorite: false,
    userId: 'u1',
    scores: { overall: 88, performance: 91, seo: 89, accessibility: 84, ux: 90, conversion: 86 },
    createdAt: '2024-07-23T10:00:00Z',
    updatedAt: '2024-07-23T10:00:00Z',
  },
  {
    id: '3',
    url: 'https://linear.app',
    title: 'Linear – The new standard for modern software',
    favicon: 'https://www.google.com/s2/favicons?domain=linear.app&sz=64',
    status: 'COMPLETED',
    isFavorite: false,
    userId: 'u1',
    scores: { overall: 79, performance: 82, seo: 78, accessibility: 71, ux: 84, conversion: 76 },
    createdAt: '2024-07-22T08:00:00Z',
    updatedAt: '2024-07-22T08:00:00Z',
  },
  {
    id: '4',
    url: 'https://example-ecommerce.com',
    title: 'Example eCommerce Store',
    status: 'RUNNING',
    isFavorite: false,
    userId: 'u1',
    createdAt: '2024-07-24T13:00:00Z',
    updatedAt: '2024-07-24T13:00:00Z',
  },
];

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className={cn('text-sm font-bold tabular-nums', getScoreColor(score))}>
      {score}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    COMPLETED: { label: 'Completed', class: 'bg-green-100 text-green-700 border-green-200' },
    RUNNING: { label: 'Running…', class: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse' },
    PENDING: { label: 'Pending', class: 'bg-gray-100 text-gray-600 border-gray-200' },
    FAILED: { label: 'Failed', class: 'bg-red-100 text-red-700 border-red-200' },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', s.class)}>
      {s.label}
    </span>
  );
}

export function RecentAudits({ audits = mockAudits }: { audits?: Audit[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-900">Recent Audits</h2>
        <Link href="/reports" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View all →
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {audits.map((audit, i) => (
          <motion.div
            key={audit.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
          >
            {/* Favicon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
              {audit.favicon ? (
                <img src={audit.favicon} alt="" className="w-5 h-5" />
              ) : (
                <div className="w-3 h-3 bg-gray-300 rounded-sm" />
              )}
            </div>

            {/* URL + title */}
            <div className="flex-1 min-w-0">
              <Link href={`/audits/${audit.id}`} className="block">
                <p className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
                  {getDomain(audit.url)}
                </p>
                <p className="text-xs text-gray-500 truncate">{audit.url}</p>
              </Link>
            </div>

            {/* Status */}
            <StatusBadge status={audit.status} />

            {/* Score */}
            {audit.scores && (
              <div className="hidden sm:flex items-center gap-1 min-w-[40px] justify-end">
                <ScoreBadge score={audit.scores.overall} />
                <span className="text-xs text-gray-500">/100</span>
              </div>
            )}

            {/* Time */}
            <span className="hidden md:block text-xs text-gray-500 min-w-[60px] text-right">
              {formatRelativeTime(audit.createdAt)}
            </span>

            {/* Actions */}
            <div className="hidden group-hover:flex items-center gap-1">
              <button className="p-1.5 rounded text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                <Star className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                href={audit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
