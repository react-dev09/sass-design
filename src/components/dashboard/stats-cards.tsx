'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  Globe,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Total Audits',
    value: '24',
    change: '+3 this week',
    trend: 'up',
    icon: BarChart3,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    label: 'Sites Audited',
    value: '12',
    change: '+2 this month',
    trend: 'up',
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    label: 'Avg. Score',
    value: '74',
    change: '+8 from last month',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    label: 'Issues Found',
    value: '156',
    change: '-12 resolved',
    trend: 'down',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className={cn(
              'relative overflow-hidden rounded-xl border p-5 glass-card glass-card-hover',
              stat.border
            )}
          >
            {/* Ambient corner light */}
            <div className={cn("absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none", stat.bg)} />

            <div className="flex items-start justify-between mb-4">
              <div className={cn('p-2.5 rounded-xl border shadow-inner', stat.bg, stat.border)}>
                <Icon className={cn('w-4 h-4', stat.color)} />
              </div>
              <div className={cn(
                'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border',
                stat.trend === 'up'
                  ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                  : 'text-amber-400 border-amber-500/20 bg-amber-500/10'
              )}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>{stat.trend === 'up' ? '+14%' : '-7%'}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-extrabold text-zinc-100 tabular-nums tracking-tight">
                  {stat.value}
                </p>
              </div>
              <p className="text-xs text-zinc-400 font-medium">{stat.label}</p>
              <p className="text-[11px] text-zinc-500">{stat.change}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
