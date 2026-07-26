'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Map, Star } from 'lucide-react';
import type { AIReport } from '@/types/audit';
import { cn } from '@/lib/utils';

interface AIInsightsPanelProps {
  report: AIReport;
}

export function AIInsightsPanel({ report }: AIInsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border-0 p-5"
        style={{ backgroundColor: '#ebecf2' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-semibold" style={{ color: '#000000' }}>AI Executive Summary</h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>{report.executiveSummary}</p>
      </motion.div>

      {/* Quick Wins */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border-0 p-5"
        style={{ backgroundColor: '#ebecf2' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold" style={{ color: '#000000' }}>Quick Wins</h3>
          <span className="text-xs" style={{ color: '#000000' }}>— Do these first</span>
        </div>
        <div className="grid gap-3">
          {report.quickWins.map((win, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ backgroundColor: '#d5d6dc' }}
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mt-0.5">
                <Star className="w-3 h-3 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: '#000000' }}>{win.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#000000' }}>{win.description}</p>
                <div className="flex gap-2 mt-2">
                  <EffortBadge label="Effort" value={win.effort} />
                  <EffortBadge label="Impact" value={win.impact} positive />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Priority Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border-0 p-5"
        style={{ backgroundColor: '#ebecf2' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold" style={{ color: '#000000' }}>Priority Roadmap</h3>
        </div>
        <div className="space-y-3">
          {report.priorityRoadmap.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#d5d6dc', borderColor: '#c0c1cc', color: '#000000' }}>
                  {item.priority}
                </div>
                {i < report.priorityRoadmap.length - 1 && (
                  <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#d5d6dc' }} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium" style={{ color: '#000000' }}>{item.title}</p>
                  <TimeframeBadge timeframe={item.timeframe} />
                </div>
                <p className="text-xs" style={{ color: '#000000' }}>{item.description}</p>
                <span className="text-xs capitalize mt-1 inline-block" style={{ color: '#000000' }}>
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EffortBadge({ label, value, positive = false }: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  const colorMap: Record<string, string> = {
    low: positive ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-400 bg-emerald-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    high: positive ? 'text-violet-400 bg-violet-500/10' : 'text-red-400 bg-red-500/10',
  };
  return (
    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', colorMap[value] ?? 'text-zinc-400 bg-zinc-700/50')}>
      {label}: {value}
    </span>
  );
}

function TimeframeBadge({ timeframe }: { timeframe: string }) {
  const map: Record<string, string> = {
    'immediate': 'text-red-400 bg-red-500/10',
    'short-term': 'text-amber-400 bg-amber-500/10',
    'long-term': 'text-blue-400 bg-blue-500/10',
  };
  return (
    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', map[timeframe] ?? 'text-zinc-400 bg-zinc-700/50')}>
      {timeframe}
    </span>
  );
}
