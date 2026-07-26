'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel, getScoreGradient, cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

function getGtmetrixGrade(score: number): { grade: string; color: string; bg: string; border: string } {
  if (score >= 90) return { grade: 'A', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' };
  if (score >= 80) return { grade: 'B', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  if (score >= 70) return { grade: 'C', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' };
  if (score >= 50) return { grade: 'D', color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30' };
  return { grade: 'F', color: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/30' };
}

export function ScoreRing({ score, label, size = 'md', showGrade = false }: ScoreRingProps & { showGrade?: boolean }) {
  const sizes = {
    sm: { outer: 80, inner: 55, text: 'text-lg', sub: 'text-[10px]' },
    md: { outer: 110, inner: 80, text: 'text-2xl', sub: 'text-xs' },
    lg: { outer: 160, inner: 120, text: 'text-4xl', sub: 'text-sm' },
  };
  const s = sizes[size];
  const gradeInfo = getGtmetrixGrade(score);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: s.outer, height: s.outer }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={[{ value: score, fill: getScoreGradient(score) }]}
            startAngle={225}
            endAngle={-45}
          >
            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: '#e5e5e5' }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={cn('font-bold tabular-nums', s.text, getScoreColor(score))}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <p className={cn('font-semibold text-gray-900', s.sub === 'text-xs' ? 'text-xs' : 'text-sm')}>{label}</p>
          {showGrade && (
            <span className={cn('px-2 py-0.5 rounded font-black text-xs border font-mono', gradeInfo.color, gradeInfo.bg, gradeInfo.border)}>
              Grade {gradeInfo.grade}
            </span>
          )}
        </div>
        <p className={cn('text-gray-600 font-medium', s.sub)}>{getScoreLabel(score)}</p>
      </div>
    </div>
  );
}

interface CategoryScoresProps {
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    ux: number;
    conversion: number;
  };
}

export function CategoryScores({ scores }: CategoryScoresProps) {
  const categories = [
    { key: 'performance', label: 'Performance', score: scores.performance },
    { key: 'seo', label: 'SEO', score: scores.seo },
    { key: 'accessibility', label: 'Accessibility', score: scores.accessibility },
    { key: 'ux', label: 'UX', score: scores.ux },
    { key: 'conversion', label: 'Conversion', score: scores.conversion },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
        >
          <ScoreRing score={cat.score} label={cat.label} size="sm" />
        </motion.div>
      ))}
    </div>
  );
}
