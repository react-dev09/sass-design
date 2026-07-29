'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Plus,
  FileText,
  Settings,
  Zap,
  BarChart3,
  Star,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

function getCookieValue(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : '';
}

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/audits/new', label: 'New Audit', icon: Plus, accent: true },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/favorites', label: 'Favorites', icon: Star },
];

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setUserEmail(getCookieValue('user_email'));
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-gray-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 border border-blue-200">
          <Zap className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-semibold text-sm text-black tracking-tight">
          DesignPulse
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-150 group',
                  item.accent
                    ? 'text-white hover:opacity-90'
                    : isActive
                    ? 'bg-[#f4ebff] text-[#9250e6] border-l-2 border-[#9250e6]'
                    : 'text-black hover:bg-gray-100 hover:text-black'
                )}
                style={item.accent ? { backgroundColor: '#9250e6', borderColor: '#9250e6' } : {}}
              >
                {isActive && !item.accent && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-[#f4ebff]"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon className={cn('w-4 h-4 relative z-10', item.accent && 'text-white')} />
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-gray-200 pt-3">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#f4ebff] text-[#9250e6]'
                    : 'text-black hover:bg-gray-100 hover:text-black'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-black truncate" title={userEmail}>
              {userEmail ? userEmail.split('@')[0] : 'Account'}
            </span>
            {userEmail && (
              <span className="text-xs text-gray-400 truncate" title={userEmail}>
                {userEmail}
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
