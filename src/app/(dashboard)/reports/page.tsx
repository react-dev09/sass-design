'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, Trash2, ExternalLink } from 'lucide-react';

interface SavedAudit {
  id: string;
  url: string;
  timestamp: string;
  performance: { score: number };
  seo: { score: number };
  accessibility: { score: number };
  overall: number;
}

export default function ReportsPage() {
  const [audits, setAudits] = useState<SavedAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved: SavedAudit[] = [];
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key.startsWith('audit_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          saved.push(data);
        } catch (e) {
          console.error('Failed to parse audit:', key);
        }
      }
    });

    saved.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setAudits(saved);
    setLoading(false);
  }, []);

  const filteredAudits = audits.filter(audit =>
    audit.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteAudit = (id: string) => {
    localStorage.removeItem(`audit_${id}`);
    setAudits(audits.filter(a => a.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8 page-enter">
      <div>
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Audit Reports</h1>
        <p className="text-gray-600 mt-2">View and manage all your website audit history</p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search by URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading reports...</div>
      ) : filteredAudits.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-600 mb-6 text-lg">
            {audits.length === 0 ? 'No audits yet. Run your first audit!' : 'No matching audits found.'}
          </p>
          {audits.length === 0 && (
            <Link
              href="/audits/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Run First Audit
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAudits.map((audit, index) => (
            <Link
              key={audit.id || `${audit.url}-${index}`}
              href={`/audits/${audit.id}`}
              className="group rounded-lg border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 p-6 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {audit.url}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(audit.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(audit.overall || 0)}`}>
                      {Math.round(audit.overall || 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Overall</div>
                  </div>

                  <div className="w-px h-14 bg-gray-200" />

                  <div className="flex gap-6">
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getScoreColor(audit.performance?.score || 0)}`}>
                        {Math.round(audit.performance?.score || 0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Performance</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getScoreColor(audit.seo?.score || 0)}`}>
                        {Math.round(audit.seo?.score || 0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">SEO</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getScoreColor(audit.accessibility?.score || 0)}`}>
                        {Math.round(audit.accessibility?.score || 0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">A11y</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this audit?')) {
                        deleteAudit(audit.id);
                      }
                    }}
                    className="ml-2 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete audit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
