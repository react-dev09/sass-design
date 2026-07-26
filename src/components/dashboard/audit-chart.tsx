'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

const scoreHistory = [
  { date: 'Jan', score: 58, audits: 3 },
  { date: 'Feb', score: 62, audits: 5 },
  { date: 'Mar', score: 65, audits: 4 },
  { date: 'Apr', score: 70, audits: 7 },
  { date: 'May', score: 68, audits: 6 },
  { date: 'Jun', score: 74, audits: 9 },
  { date: 'Jul', score: 79, audits: 11 },
];

const categoryData = [
  { category: 'Performance', score: 78 },
  { category: 'SEO', score: 82 },
  { category: 'Accessibility', score: 65 },
  { category: 'UX', score: 74 },
  { category: 'Conversion', score: 58 },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="text-gray-600 mb-1">{label}</p>
        <p className="font-semibold" style={{ color: '#9250e6' }}>Score: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function AuditChart() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Score history */}
      <div className="xl:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-black flex items-center gap-2">
              <span>Score History & Trends</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 border border-purple-200 font-mono" style={{ backgroundColor: 'rgba(146, 80, 230, 0.1)', color: '#9250e6', borderColor: 'rgba(146, 80, 230, 0.2)' }}>Mixpanel Analytics</span>
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">Average audit score progression over time</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 p-1 rounded-lg text-xs">
            <span className="px-2 py-0.5 rounded font-medium cursor-pointer text-white" style={{ backgroundColor: '#9250e6' }}>Overall</span>
            <span className="px-2 py-0.5 rounded text-gray-600 hover:text-gray-900 cursor-pointer">Speed</span>
            <span className="px-2 py-0.5 rounded text-gray-600 hover:text-gray-900 cursor-pointer">SEO</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={scoreHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9250e6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#9250e6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[40, 100]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#9250e6"
              strokeWidth={2.5}
              fill="url(#scoreGrad)"
              dot={{ fill: '#9250e6', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#9250e6', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category radar */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between">
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-black">Category Breakdown</h2>
          <p className="text-xs text-gray-600 mt-0.5">Performance distribution across metrics</p>
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={categoryData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 500 }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
