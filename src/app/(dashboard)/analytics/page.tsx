import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics',
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-xl font-bold text-zinc-100">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Track your audit history and score improvements over time.
        </p>
      </div>
      <div className="flex items-center justify-center h-64 rounded-xl border border-zinc-800/60 bg-zinc-900/30">
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-400">Analytics coming soon</p>
          <p className="text-xs text-zinc-600 mt-1">Run more audits to see trends</p>
        </div>
      </div>
    </div>
  );
}
