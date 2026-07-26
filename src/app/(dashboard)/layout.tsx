import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardTopNav } from '@/components/dashboard/top-nav';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopNav />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50 text-black" style={{ backgroundColor: '#f4f5f5' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
