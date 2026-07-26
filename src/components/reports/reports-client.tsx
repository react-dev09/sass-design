'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ExternalLink, RefreshCw, Trash2, Plus } from 'lucide-react';
import { formatRelativeTime, getDomain, getScoreColor, getScoreBg, cn } from '@/lib/utils';
import type { Audit } from '@/types/audit';

const MOCK_REPORTS: Audit[] = [
  {
    id: '1', url: 'https://stripe.com', title: 'Stripe', status: 'COMPLETED',
    favicon: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=64',
    isFavorite: true, userId: 'u1',
    scores: { overall: 92, performance: 95, seo: 94, accessibility: 88, ux: 92, conversion: 91 },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2', url: 'https://vercel.com', title: 'Vercel', status: 'COMPLETED',
    favicon: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=64',
    isFavorite: false, userId: 'u1',
    scores: { overall: 88, performance: 91, seo: 89, accessibility: 84, ux: 90, conversion: 86 },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3', url: 'https://linear.app', title: 'Linear', status: 'COMPLETED',
    favicon: 'https://www.google.com/s2/favicons?domain=linear.app&sz=64',
    isFavorite: false, userId: 'u1',
    scores: { overall: 79, performance: 82, seo: 78, accessibility: 71, ux: 84, conversion: 76 },
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4', url: 'https://notion.so', title: 'Notion', status: 'COMPLETED',
    favicon: 'https://www.google.com/s2/favicons?domain=notion.so&sz=64',
    isFavorite: false, userId: 'u1',
    scores: { overall: 63, performance: 58, seo: 72, accessibility: 55, ux: 68, conversion: 62 },
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '5', url: 'https://figma.com', title: 'Figma', status: 'COMPLETED',
    favicon: 'https://www.google.com/s2/favicons?domain=figma.com&sz=64',
    isFavorite: true, userId: 'u1',
    scores: { overall: 85, performance: 88, seo: 84, accessibility: 79, ux: 89, conversion: 82 },
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
  },
];

export function ReportsClient() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [sort, setSort] = useState<'date' | 'score'>('date');

  const filtered = MOCK_REPORTS.filter(a => {
    const matchSearch = getDomain(a.url).includes(search.toLowerCase()) || a.url.includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'favorites' && a.isFavorite);
    return matchSearch && matchFilter;
  }).sort((a, b) => {
    if (sort === 'score') return (b.scores?.overall ?? 0) - (a.scores?.overall ?? 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by domain or URL…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 text-sm text-zinc-200 placeholder-zinc-600 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter(f => f === 'all' ? 'favorites' : 'all')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all',
              filter === 'favorites'
                ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                : 'text-zinc-400 border-zinc-800 hover:border-zinc-700'
            )}
          >
            <Star className="w-3.5 h-3.5" fill={filter === 'favorites' ? 'currentColor' : 'none'} />
            Favorites
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'date' | 'score')}
            className="px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 focus:outline-none cursor-pointer"
          >
            <option value="date">Sort: Date</option>
            <option value="score">Sort: Score</option>
          </select>
          <Link
            href="/audits/new"
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New
          </Link>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-zinc-600">
        {filtered.length} report{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Report cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-800/60 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-zinc-600" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No reports found</p>
          <p className="text-xs text-zinc-600 mt-1">Try adjusting your search or filters</p>
          <Link
            href="/audits/new"
            className="mt-4 text-sm text-violet-400 hover:text-violet-300 border border-violet-500/30 px-4 py-2 rounded-lg"
          >
            Run your first audit
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((audit, i) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/60 transition-all group"
            >
              {/* Favicon */}
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/50 overflow-hidden flex items-center justify-center">
                {audit.favicon ? (
                  <img src={audit.favicon} alt="" className="w-5 h-5" />
                ) : (
                  <div className="w-3 h-3 bg-zinc-600 rounded-sm" />
                )}
              </div>

              {/* URL */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/audits/${audit.id}`} className="text-sm font-medium text-zinc-200 hover:text-violet-300 transition-colors truncate">
                    {getDomain(audit.url)}
                  </Link>
                  {audit.isFavorite && (
                    <Star className="w-3 h-3 text-amber-400 flex-shrink-0" fill="currentColor" />
                  )}
                </div>
                <p className="text-xs text-zinc-600 truncate">{audit.url}</p>
              </div>

              {/* Score columns */}
              <div className="hidden md:flex items-center gap-6">
                {(['performance', 'seo', 'accessibility', 'ux', 'conversion'] as const).map(cat => (
                  <div key={cat} className="text-center w-12">
                    <p className={cn('text-sm font-bold tabular-nums', getScoreColor(audit.scores![cat]))}>
                      {audit.scores![cat]}
                    </p>
                    <p className="text-xs text-zinc-700 capitalize">{cat.slice(0, 3)}</p>
                  </div>
                ))}
              </div>

              {/* Overall */}
              {audit.scores && (
                <div className={cn('hidden sm:flex items-center justify-center w-12 h-12 rounded-xl border text-lg font-bold tabular-nums', getScoreBg(audit.scores.overall), getScoreColor(audit.scores.overall))}>
                  {audit.scores.overall}
                </div>
              )}

              {/* Date */}
              <span className="hidden lg:block text-xs text-zinc-600 w-16 text-right">
                {formatRelativeTime(audit.createdAt)}
              </span>

              {/* Actions */}
              <div className="hidden group-hover:flex items-center gap-1">
                <a href={audit.url} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button className="p-1.5 rounded text-zinc-500 hover:text-violet-400 transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded text-zinc-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
