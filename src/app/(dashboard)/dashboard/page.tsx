'use client';

import Link from 'next/link';
import { Plus, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RecentAudits } from '@/components/dashboard/recent-audits';
import { AuditChart } from '@/components/dashboard/audit-chart';

export default function DashboardPage() {
  // Demo data (replace with Prisma calls once database is set up)
  const totalAudits = 0;
  const completedAudits = 0;
  const failedAudits = 0;
  const averageScore = 0;
  const monthlyAudits = 0;
  const recentAudits: any[] = [];

  const user = {
    id: 'demo-user-1',
    plan: 'FREE',
  };

  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="space-y-8 page-enter" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{greeting} 👋</h1>
          <p className="text-base text-gray-600 mt-2">
            You have completed <span className="font-semibold text-gray-900">{completedAudits}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalAudits}</span> audits
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/audits/new"
            className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#9250e6' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7e3fc0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#9250e6')}
          >
            <Plus className="w-5 h-5" />
            New Audit
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">Total Audits</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">{totalAudits}</p>
            </div>
            <Zap className="w-10 h-10 text-blue-200" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">Avg Score</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">{averageScore}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">This Month</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">{monthlyAudits}</p>
            </div>
            <Zap className="w-10 h-10 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <AuditChart userId={user.id} />

      {/* Recent Audits */}
      <RecentAudits audits={recentAudits} />

      {/* Quick actions */}
      {totalAudits === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/audits/new"
            className="group rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 p-6 transition-all shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Run your first audit</h3>
            <p className="text-sm text-gray-600 mb-4">Enter any URL to get an instant AI-powered report.</p>
            <div className="flex items-center gap-2 text-sm text-blue-600 group-hover:gap-3 transition-all font-medium">
              Get started <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/audits/new"
            className="group rounded-lg border border-gray-200 bg-white hover:bg-gray-50 p-6 transition-all shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze any website</h3>
            <p className="text-sm text-gray-600 mb-4">Get performance, SEO, and accessibility insights instantly.</p>
            <div className="flex items-center gap-2 text-sm text-blue-600 group-hover:gap-3 transition-all font-medium">
              Start now <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}

      {/* Premium banner */}
      {user.plan === 'FREE' && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready for unlimited audits?</h3>
              <p className="text-sm text-gray-700">
                Upgrade to Pro for unlimited audits, PDF exports, and advanced features.
              </p>
            </div>
            <Link
              href="/settings/billing"
              className="ml-4 whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Upgrade →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
