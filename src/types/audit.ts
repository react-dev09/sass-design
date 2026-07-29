// src/types/audit.ts
export type AuditStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
export type Plan = 'FREE' | 'PRO' | 'AGENCY';

export interface AuditScores {
  overall: number;
  performance: number;
  seo: number;
  accessibility: number;
  ux: number;
  conversion: number;
}

export interface PerformanceMetrics {
  lcp: number;   // ms
  cls: number;   // score
  fcp: number;   // ms
  inp: number;   // ms
  ttfb: number;  // ms
  speedIndex: number; // ms
}

export interface AffectedFile {
  name: string;
  size?: string;
  line?: number;
  issue: string;
  fix?: string;
  snippet?: string;
}

export interface Issue {
  id: string;
  category: 'performance' | 'seo' | 'accessibility' | 'ux' | 'conversion';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  affectedFiles?: AffectedFile[];
  codeExample?: string;
  estimatedGain?: string;
}

export interface QuickWin {
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface RoadmapItem {
  priority: number;
  title: string;
  description: string;
  category: string;
  timeframe: 'immediate' | 'short-term' | 'long-term';
}

export interface AIReport {
  executiveSummary: string;
  topIssues: Issue[];
  quickWins: QuickWin[];
  priorityRoadmap: RoadmapItem[];
  performanceMetrics: PerformanceMetrics;
  seoAnalysis: {
    metaTags: { title: boolean; description: boolean; canonical: boolean };
    headings: { h1Count: number; hasProperHierarchy: boolean };
    openGraph: boolean;
    structuredData: boolean;
    sitemap: boolean;
    robotsTxt: boolean;
  };
  accessibilityAnalysis: {
    contrastIssues: number;
    missingAltText: number;
    ariaIssues: number;
    keyboardNavigation: boolean;
  };
  uxAnalysis: {
    mobileResponsive: boolean;
    loadingSpeed: 'fast' | 'moderate' | 'slow';
    navigationClarity: number;
    typographyScore: number;
  };
  conversionAnalysis: {
    ctaVisibility: number;
    trustSignals: string[];
    formUsability: number;
    userJourneyClarity: number;
  };
}

export interface Audit {
  id: string;
  url: string;
  favicon?: string;
  title?: string;
  status: AuditStatus;
  screenshotUrl?: string;
  scores?: AuditScores;
  report?: AIReport;
  pageSpeedData?: Record<string, unknown>;
  error?: string;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
