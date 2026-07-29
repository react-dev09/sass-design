'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, XCircle, ChevronDown } from 'lucide-react';
import { getSeverityColor, cn } from '@/lib/utils';
import type { Issue } from '@/types/audit';
import { useState } from 'react';

const severityIcons = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
};

function IssueCard({ issue, index }: { issue: Issue; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = severityIcons[issue.severity];

  const scoreImpact = issue.severity === 'critical' ? '+8 pts' : issue.severity === 'warning' ? '+4 pts' : '+1 pt';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      style={{ backgroundColor: '#ebecf2' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left transition-colors"
        style={{ backgroundColor: '#ebecf2' }}
      >
        <div className={cn('flex-shrink-0 p-2 rounded-lg border mt-0.5 shadow-sm', getSeverityColor(issue.severity))}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-[11px] px-2.5 py-0.5 rounded-full border font-bold capitalize tracking-wide', getSeverityColor(issue.severity))}>
              {issue.severity}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded font-medium capitalize" style={{ backgroundColor: '#d5d6dc', color: '#000000' }}>
              {issue.category}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded border font-mono font-semibold ml-auto sm:ml-0" style={{ backgroundColor: '#d5d6dc', color: '#000000', borderColor: '#c0c1cc' }}>
              Impact: {scoreImpact}
            </span>
          </div>
          <p className="text-sm font-semibold" style={{ color: '#000000' }}>{issue.title}</p>
          <p className="text-xs mt-1 line-clamp-2" style={{ color: '#000000' }}>{issue.description}</p>
        </div>
        <ChevronDown className={cn(
          'flex-shrink-0 w-4 h-4 mt-1 transition-transform',
          expanded && 'rotate-180'
        )}
        style={{ color: '#000000' }} />
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 space-y-3 font-mono text-xs"
          style={{ backgroundColor: '#ebecf2', borderTopColor: '#d5d6dc' }}
        >
          {/* Affected Files */}
          {issue.affectedFiles && issue.affectedFiles.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#000000' }}>📄 Affected Files</p>
              <div className="space-y-2">
                {issue.affectedFiles.map((file, idx) => (
                  <div key={idx} className="rounded p-2 font-mono text-xs" style={{ backgroundColor: '#d5d6dc', border: '1px solid #c0c1cc', color: '#000000' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span><strong>{file.name}</strong> {file.size && `(${file.size})`}</span>
                      {file.line && <span style={{ color: '#ff8c42' }}>Line {file.line}</span>}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span style={{ color: '#d32f2f' }} className="truncate">❌ {file.issue}</span>
                      {file.fix && <span style={{ color: '#388e3c' }} className="truncate">✓ {file.fix}</span>}
                    </div>
                    {file.snippet && (
                      <div className="mt-2 bg-[#f4f5f8] p-2 rounded border border-[#c0c1cc] text-[#0052cc] overflow-x-auto whitespace-pre-wrap text-[10px] leading-relaxed">
                        {file.snippet}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEMrush Insight */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>💡 Why Fix This (SEMrush Audit Insight)</p>
            <p className="text-xs leading-relaxed p-3 rounded-lg" style={{ backgroundColor: '#d5d6dc', border: '1px solid #c0c1cc', color: '#000000' }}>{issue.impact}</p>
          </div>

          {/* Recommended Fix */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>✓ Recommended Fix Action</p>
            <div className="text-xs rounded-lg p-3 font-mono leading-relaxed" style={{ backgroundColor: '#d5d6dc', border: '1px solid #c0c1cc', color: '#000000' }}>
              {issue.recommendation}
            </div>
          </div>

          {/* Code Example */}
          {issue.codeExample && (
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">💻 Code Example</p>
              <pre className="bg-zinc-900 rounded p-2.5 border border-zinc-700 overflow-x-auto text-xs text-emerald-300 leading-relaxed">
                {issue.codeExample}
              </pre>
            </div>
          )}

          {/* Estimated Gain */}
          {issue.estimatedGain && (
            <div className="bg-yellow-900/20 rounded-lg p-2.5 border border-yellow-800/50">
              <p className="text-xs text-yellow-300 font-semibold">⚡ Estimated Gain</p>
              <p className="text-xs text-zinc-300 mt-1">{issue.estimatedGain}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function IssuesList({ issues }: { issues: Issue[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  const categories = Array.from(new Set(issues.map(i => i.category)));

  const filteredIssues = issues.filter(issue => {
    const matchesTab = activeTab === 'all' || issue.severity === activeTab;
    const matchesCat = categoryFilter === 'all' || issue.category === categoryFilter;
    return matchesTab && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* SEMrush Severity Filter Header */}
      <div className="flex flex-col gap-4 p-3 rounded-xl border-0" style={{ backgroundColor: '#ebecf2' }}>
        <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap',
              activeTab === 'all' ? 'text-white shadow-md' : 'hover:opacity-80'
            )}
            style={activeTab === 'all' ? { backgroundColor: '#9250e6', color: 'white' } : { color: '#000000', backgroundColor: '#d5d6dc' }}
          >
            All Issues ({issues.length})
          </button>
          <button
            onClick={() => setActiveTab('critical')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap',
              activeTab === 'critical' ? 'border' : 'border border-transparent hover:border-red-200'
            )}
            style={activeTab === 'critical' ? { backgroundColor: '#ffebee', color: '#c62828', borderColor: '#ef5350' } : { color: '#d32f2f', backgroundColor: '#fff' }}
          >
            <XCircle className="w-3.5 h-3.5" />
            Errors ({criticalCount})
          </button>
          <button
            onClick={() => setActiveTab('warning')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap',
              activeTab === 'warning' ? 'border' : 'border border-transparent hover:border-orange-200'
            )}
            style={activeTab === 'warning' ? { backgroundColor: '#fff3e0', color: '#e65100', borderColor: '#ffb74d' } : { color: '#ff9800', backgroundColor: '#fff' }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Warnings ({warningCount})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap',
              activeTab === 'info' ? 'border' : 'border border-transparent hover:border-blue-200'
            )}
            style={activeTab === 'info' ? { backgroundColor: '#e3f2fd', color: '#1565c0', borderColor: '#64b5f6' } : { color: '#1976d2', backgroundColor: '#fff' }}
          >
            <Info className="w-3.5 h-3.5" />
            Notices ({infoCount})
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#000000' }}>Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#9250e6] border shadow-sm cursor-pointer"
            style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#c0c1cc' }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-2.5">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue, i) => (
            <IssueCard key={issue.id} issue={issue} index={i} />
          ))
        ) : (
          <div className="text-center py-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <p className="text-sm font-medium text-zinc-400">No issues matching selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
