import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Favorites' };

export default function FavoritesPage() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-xl font-bold text-zinc-100">Favorites</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Your starred audit reports.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 flex items-center justify-center mb-4">
          <Star className="w-6 h-6 text-zinc-600" />
        </div>
        <p className="text-sm font-medium text-zinc-400 mb-1">No favorites yet</p>
        <p className="text-xs text-zinc-600 max-w-xs">
          Star any audit report to save it here for quick access.
        </p>
        <Link
          href="/audits/new"
          className="mt-6 flex items-center gap-2 text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Run an audit
        </Link>
      </div>
    </div>
  );
}
