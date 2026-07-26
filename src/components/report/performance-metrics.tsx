'use client';

import { motion } from 'framer-motion';
import { formatMs, cn } from '@/lib/utils';
import type { PerformanceMetrics } from '@/types/audit';

const metricConfig: Record<string, {
  label: string;
  full: string;
  good: number;
  needs: number;
  unit: string;
  isDecimal: boolean;
}> = {
  lcp: {
    label: 'LCP',
    full: 'Largest Contentful Paint',
    good: 2500,
    needs: 4000,
    unit: 'ms',
    isDecimal: false,
  },
  fcp: {
    label: 'FCP',
    full: 'First Contentful Paint',
    good: 1800,
    needs: 3000,
    unit: 'ms',
    isDecimal: false,
  },
  cls: {
    label: 'CLS',
    full: 'Cumulative Layout Shift',
    good: 0.1,
    needs: 0.25,
    unit: '',
    isDecimal: true,
  },
  inp: {
    label: 'INP',
    full: 'Interaction to Next Paint',
    good: 200,
    needs: 500,
    unit: 'ms',
    isDecimal: false,
  },
  ttfb: {
    label: 'TTFB',
    full: 'Time to First Byte',
    good: 800,
    needs: 1800,
    unit: 'ms',
    isDecimal: false,
  },
  speedIndex: {
    label: 'SI',
    full: 'Speed Index',
    good: 3400,
    needs: 5800,
    unit: 'ms',
    isDecimal: false,
  },
};

function MetricCard({
  metricKey,
  value,
  index,
}: {
  metricKey: keyof typeof metricConfig;
  value: number;
  index: number;
}) {
  const config = metricConfig[metricKey];
  const isGood = value <= config.good;
  const isNeeds = !isGood && value <= config.needs;
  const isPoor = !isGood && !isNeeds;

  const color = isGood
    ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
    : isNeeds
    ? 'text-amber-400 border-amber-500/20 bg-amber-500/5'
    : 'text-red-400 border-red-500/20 bg-red-500/5';

  const label = isGood ? 'Good' : isNeeds ? 'Needs Work' : 'Poor';

  const displayValue = config.isDecimal
    ? value.toFixed(3)
    : formatMs(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className={cn('rounded-xl border p-4', color)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-bold tracking-wide">{config.label}</p>
          <p className="text-xs text-zinc-600 mt-0.5">{config.full}</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-current/10 font-medium opacity-80">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold tabular-nums">{displayValue}</p>
      <div className="mt-2 text-xs opacity-60">
        Target: ≤{config.isDecimal ? config.good : formatMs(config.good)}
      </div>
    </motion.div>
  );
}

export function PerformanceMetricsGrid({ metrics }: { metrics: PerformanceMetrics }) {
  const keys = Object.keys(metricConfig) as Array<keyof typeof metricConfig>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <span>Core Web Vitals & GTmetrix Speed Metrics</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">GTmetrix Engine</span>
          </h2>
          <p className="text-xs text-zinc-400">Key user experience & loading performance metrics</p>
        </div>

        {/* GTmetrix Summary Bar */}
        <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800/80 px-3 py-1.5 rounded-lg text-xs font-mono">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Fully Loaded</span>
            <span className="text-emerald-400 font-semibold">1.4s</span>
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Page Size</span>
            <span className="text-zinc-200 font-semibold">1.2 MB</span>
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Requests</span>
            <span className="text-zinc-200 font-semibold">42</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {keys.map((key, i) => (
          <MetricCard
            key={key}
            metricKey={key}
            value={metrics[key as keyof PerformanceMetrics]}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
