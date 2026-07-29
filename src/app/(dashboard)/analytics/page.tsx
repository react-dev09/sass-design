import type { Metadata } from 'next';
import { AuditChart } from '@/components/dashboard/audit-chart';
import { TrendingUp, Activity, BarChart2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analytics',
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 page-enter max-w-5xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your audit history and score improvements over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Average Score</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">74<span className="text-xl text-gray-500 font-normal">/100</span></p>
          <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +5% from last month
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Total Audits</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">42</p>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Lifetime audits run
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Top Issue</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-lg font-bold text-gray-900 leading-tight">Image Dimensions</p>
          <p className="text-sm text-orange-600 mt-2 font-medium">
            Found on 85% of audits
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Trends</h2>
        <AuditChart />
      </div>
    </div>
  );
}
