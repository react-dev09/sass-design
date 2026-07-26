'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Share2, Star, RefreshCw, Trash2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    html2pdf: any;
  }
}

interface ReportActionsProps {
  auditId: string;
  url: string;
  isFavorite: boolean;
}

export function ReportActions({ auditId, url, isFavorite: initialFavorite }: ReportActionsProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRerunning, setIsRerunning] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/audits/${auditId}`;
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Report link copied to clipboard!');
  };

  const handleFavorite = async () => {
    const newVal = !isFavorite;
    setIsFavorite(newVal);
    try {
      await fetch(`/api/audit/${auditId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: newVal }),
      });
      toast.success(newVal ? 'Added to favorites' : 'Removed from favorites');
    } catch {
      setIsFavorite(!newVal);
      toast.error('Failed to update favorite');
    }
  };

  const handleRerun = async () => {
    setIsRerunning(true);
    try {
      const res = await fetch('/api/audit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const { auditId: newId } = await res.json();
      toast.success('Re-running audit…');
      router.push(`/audits/${newId}`);
    } catch {
      toast.error('Failed to re-run audit');
      setIsRerunning(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this audit report?')) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/audit/${auditId}`, { method: 'DELETE' });
      toast.success('Audit deleted');
      router.push('/reports');
    } catch {
      toast.error('Failed to delete audit');
      setIsDeleting(false);
    }
  };

  const handleExport = async () => {
    try {
      toast.loading('Generating PDF...');

      // Load html2pdf library
      if (!window.html2pdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => {
          script.onload = resolve;
        });
      }

      // Load audit data from localStorage
      const saved = localStorage.getItem(`audit_${auditId}`);
      if (!saved) {
        toast.error('Could not find audit data');
        return;
      }

      const auditData = JSON.parse(saved);

      // Create a simple, PDF-friendly HTML document
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <div style="border-bottom: 3px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="margin: 0 0 10px 0; color: #1f2937; font-size: 28px;">${url}</h1>
            <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
              Generated on ${new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Overall Scores</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              <div style="text-align: center; padding: 15px; background: white; border-radius: 6px;">
                <div style="font-size: 36px; font-weight: bold; color: #7c3aed;">${Math.round(auditData.overall || 0)}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">Overall Score</div>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 6px;">
                <div style="font-size: 36px; font-weight: bold; color: #3b82f6;">${Math.round(auditData.performance?.score || 0)}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">Performance</div>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 6px;">
                <div style="font-size: 36px; font-weight: bold; color: #10b981;">${Math.round(auditData.seo?.score || 0)}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">SEO</div>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 6px;">
                <div style="font-size: 36px; font-weight: bold; color: #f59e0b;">${Math.round(auditData.accessibility?.score || 0)}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">Accessibility</div>
              </div>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Quick Summary</h2>
            <div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px;">
              <p style="margin: 0; color: #374151; line-height: 1.6;">
                Your website has been audited across key performance indicators. The scores above reflect your site's overall health, performance optimization, search engine optimization, and accessibility compliance.
              </p>
            </div>
          </div>

          <div style="color: #9ca3af; font-size: 12px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px;">
            <p style="margin: 0;">DesignPulse AI - Website Audit & Optimization Platform</p>
            <p style="margin: 5px 0 0 0;">Generated by DesignPulse AI</p>
          </div>
        </div>
      `;

      // Create a container for the PDF content
      const element = document.createElement('div');
      element.innerHTML = html;

      // Configure PDF generation
      const opt = {
        margin: 15,
        filename: `audit-${url.replace(/https?:\/\//, '').replace(/\//g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      // Generate and download PDF
      window.html2pdf().set(opt).from(element).save();

      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleFavorite}
        className={cn(
          'p-2 rounded-lg border transition-all',
          isFavorite
            ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            : 'text-zinc-500 border-zinc-800 hover:text-amber-400 hover:border-amber-500/20'
        )}
        title="Favorite"
      >
        <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 px-3 py-2 rounded-lg transition-all"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      <button
        onClick={handleRerun}
        disabled={isRerunning}
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
      >
        <RefreshCw className={cn('w-3.5 h-3.5', isRerunning && 'animate-spin')} />
        Re-run
      </button>

      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 text-sm bg-violet-600 hover:bg-violet-500 text-white px-3 py-2 rounded-lg transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Export PDF
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/20 transition-all"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
