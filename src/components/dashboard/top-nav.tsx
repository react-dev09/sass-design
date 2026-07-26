'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, User, LogOut, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/audits/new': 'New Audit',
  '/reports': 'Reports',
  '/analytics': 'Analytics',
  '/favorites': 'Favorites',
  '/settings': 'Settings',
};

export function DashboardTopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const title =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    'Dashboard';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoggingOut(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/reports?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        {/* Left: Logo and title */}
        <div className="flex items-center gap-8">
          <button className="lg:hidden text-black hover:text-black">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-black">DesignPulse</span>
          </Link>
        </div>

        {/* Center: Navigation links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/dashboard" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname.startsWith('/dashboard') ? 'text-blue-600 bg-blue-50' : 'text-black hover:text-black hover:bg-gray-50'}`}>
            Dashboard
          </Link>
          <Link href="/reports" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname.startsWith('/reports') ? 'text-blue-600 bg-blue-50' : 'text-black hover:text-black hover:bg-gray-50'}`}>
            Reports
          </Link>
          <Link href="/analytics" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname.startsWith('/analytics') ? 'text-blue-600 bg-blue-50' : 'text-black hover:text-black hover:bg-gray-50'}`}>
            Analytics
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-black hover:text-black hover:bg-gray-100 rounded-lg px-3 py-2 text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline text-gray-500">Search</span>
            <kbd className="hidden md:inline text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-300 ml-1">⌘K</kbd>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 text-black hover:text-red-600 hover:bg-red-50 rounded-lg px-3 py-2 text-sm transition-colors disabled:opacity-50"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <div className="lg:hidden">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search audits, reports, domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-base"
                />
                <kbd className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-300">ESC</kbd>
              </div>
              <div className="p-6 text-center text-gray-500 text-sm">
                Press Enter to search
              </div>
            </form>
          </div>
        </div>
      )}
      {searchOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSearchOpen(false)}
        />
      )}
    </>
  );
}
