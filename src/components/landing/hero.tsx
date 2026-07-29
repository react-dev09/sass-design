'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Sparkles, Shield, Zap } from 'lucide-react';
import { isValidUrl, normalizeUrl } from '@/lib/utils';

const badges = ['Performance', 'SEO', 'Accessibility', 'UX', 'Conversion'];

export function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeUrl(url.trim());
    if (!url.trim() || !isValidUrl(normalized)) {
      setError('Please enter a valid URL');
      return;
    }
    router.push(`/sign-in?redirect_url=${encodeURIComponent(`/audits/new?url=${encodeURIComponent(normalized)}`)}`);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{
        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="388" height="400" fill="none"><g clip-path="url(%23a)"><mask id="c" width="1440" height="400" x="-2" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="url(%23b)" d="M-2 0h1440v400H-2z"/></mask><g mask="url(%23c)"><path fill="%23c190ff" d="M384.418 398.992h5.796l-.144-19.949-2.609-359.093L387.316 0l-.145 19.95-2.608 359.093zM375.774 398.992h5.796l-.145-19.949-2.608-359.093L378.672 0l-.145 19.95-2.608 359.093zM367.133 398.992h5.796l-.145-19.949L370.031 0l-.145 19.95-2.608 359.093zM358.469 398.992h5.796l-.145-19.949-2.608-359.093L361.367 0l-.145 19.95-2.608 359.093zM349.832 398.992h5.797l-.145-19.949-2.609-359.093L352.73 0l-.144 19.95-2.609 359.093zM341.176 398.992h5.796l-.145-19.949-2.608-359.093L344.074 0l-.145 19.95-2.608 359.093zM332.536 398.992h5.796l-.145-19.949-2.609-359.093L335.434 0l-.145 19.95-2.609 359.093zM323.875 398.992h5.796l-.144-19.949-2.609-359.093L326.773 0l-.144 19.95-2.609 359.093zM315.235 398.992h5.796l-.145-19.949-2.608-359.093L318.133 0l-.145 19.95-2.608 359.093zM306.582 398.992h5.797l-.145-19.949-2.609-359.093L309.48 0l-.144 19.95-2.609 359.093zM297.926 398.992h5.796l-.145-19.949-2.608-359.093L300.824 0l-.145 19.95-2.608 359.093zM289.286 398.992h5.796l-.145-19.949-2.609-359.093L292.184 0l-.145 19.95-2.609 359.093zM280.618 398.992h5.796l-.145-19.949-2.608-359.093L283.516 0l-.145 19.95-2.609 359.093zM271.977 398.992h5.796l-.145-19.949L275.02 19.95 274.875 0l-.145 19.95-2.608 359.093zM263.317 398.992h5.796l-.145-19.949L266.36 19.95 266.215 0l-.145 19.95-2.608 359.093zM254.68 398.992h5.796l-.145-19.949-2.608-359.093L257.578 0l-.145 19.95-2.608 359.093zM246.024 398.992h5.796l-.145-19.949-2.608-359.093L248.922 0l-.145 19.95-2.608 359.093zM237.368 398.992h5.796l-.145-19.949-2.608-359.093L240.266 0l-.145 19.95-2.609 359.093zM228.727 398.992h5.796l-.145-19.949L231.77 19.95 231.625 0l-.145 19.95-2.608 359.093zM220.071 398.992h5.796l-.145-19.949-2.608-359.093L222.969 0l-.145 19.95-2.608 359.093zM211.426 398.992h5.796l-.145-19.949-2.608-359.093L214.324 0l-.145 19.95-2.608 359.093zM202.762 398.992h5.796l-.145-19.949-2.608-359.093L205.66 0l-.145 19.95-2.608 359.093zM194.125 398.992h5.796l-.144-19.949-2.609-359.093L197.023 0l-.144 19.95-2.609 359.093zM185.465 398.992h5.796l-.145-19.949L188.363 0l-.145 19.95-2.608 359.093zM176.829 398.992h5.796l-.145-19.949-2.609-359.093L179.727 0l-.145 19.95-2.609 359.093zM168.172 398.992h5.796l-.145-19.949-2.608-359.093L171.07 0l-.145 19.95-2.608 359.093zM159.516 398.992h5.796l-.145-19.949-2.608-359.093L162.414 0l-.145 19.95-2.608 359.093zM150.875 398.992h5.796l-.144-19.949-2.609-359.093L153.773 0l-.144 19.95-2.609 359.093zM142.219 398.992h5.796l-.145-19.949-2.608-359.093L145.117 0l-.145 19.95-2.608 359.093zM133.579 398.992h5.796l-.145-19.949-2.609-359.093L136.477 0l-.145 19.95-2.609 359.093zM124.914 398.992h5.797l-.145-19.949-2.609-359.093L127.812 0l-.144 19.95-2.609 359.093zM116.274 398.992h5.796l-.145-19.949-2.608-359.093L119.172 0l-.145 19.95-2.608 359.093zM107.618 398.992h5.796l-.145-19.949-2.608-359.093L110.516 0l-.145 19.95-2.609 359.093zM98.954 398.992h5.796l-.145-19.949-2.609-359.093L101.852 0l-.145 19.95-2.609 359.093zM90.313 398.992h5.796l-.145-19.949L93.356 19.95 93.21 0zM81.664 398.992h5.797l-.145-19.949L84.707 19.95 84.563 0l-.145 19.95-2.609 359.093zM73.02 398.992h5.796l-.145-19.949L76.063 19.95 75.918 0zM64.364 398.992h5.796l-.145-19.949L67.407 19.95 67.262 0l-2.753 379.043zM55.72 398.992h5.795l-.145-19.949L58.762 19.95 58.617 0l-.145 19.95-2.608 359.093zM47.055 398.992h5.796l-.145-19.949L50.098 19.95 49.953 0zM38.418 398.992h5.797l-.145-19.949L41.46 19.95 41.316 0l-2.753 379.043zM29.758 398.992h5.796l-.145-19.949L32.801 19.95 32.656 0l-.145 19.95-2.608 359.093zM21.102 398.992h5.796l-.145-19.949L24.145 19.95 24 0l-.145 19.95-2.608 359.093zM12.461 398.992h5.796l-.145-19.949L15.505 19.95 15.36 0l-.145 19.95-2.608 359.093zM3.805 398.992h5.796l-.145-19.949L6.848 19.95 6.703 0zM-4.836 398.992H.961l-.145-19.949L-1.793 19.95-1.938 0l-.144 19.95-2.609 359.093z"/><path fill="%2318f0bf" d="M380.094 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM371.454 399h5.796l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717-2.609 156.922zM362.789 399h5.797l-.145-8.718-2.609-156.922-.145-8.717-.144 8.717-2.609 156.922zM354.153 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM345.5 399h5.796l-.144-8.718-2.609-156.922-.145-8.717-.144 8.717-2.609 156.922zM336.856 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM328.196 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM319.539 399h5.797l-.145-8.718-2.609-156.922-.145-8.717-.144 8.717-2.609 156.922zM310.899 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM302.243 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.609 156.922zM293.606 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM284.942 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM276.297 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717zM267.641 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM259.008 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM250.344 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM241.688 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM233.047 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717zM224.395 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM215.75 399h5.796l-.144-8.718-2.609-156.922-.145-8.717-.144 8.717-2.609 156.922zM207.086 399h5.796l-.144-8.718-2.609-156.922-.145-8.717-.145 8.717zM198.442 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM189.786 399h5.796l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717-2.609 156.922zM181.133 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM172.485 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM163.836 399h5.796l-.144-8.718-2.609-156.922-.145-8.717-.145 8.717zM155.196 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM146.555 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM137.899 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM129.258 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM120.594 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM111.954 399h5.796l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717-2.609 156.922zM103.293 399h5.796l-.144-8.718-2.609-156.922-.145-8.717-.145 8.717zM94.653 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM85.993 399h5.796l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717q-1.305 78.462-2.608 156.922zM77.344 399h5.796l-.145-8.718-2.753-165.639-.145 8.717-2.608 156.922zM68.704 399H74.5l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717-2.609 156.922zM60.04 399h5.796l-.145-8.718-2.754-165.639-.144 8.717-2.609 156.922zM51.407 399h5.796l-.145-8.718L54.45 233.36l-.145-8.717-.145 8.717q-1.306 78.462-2.608 156.922zM42.739 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM34.098 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM25.442 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717-2.608 156.922zM16.786 399h5.796l-.145-8.718-2.609-156.922-.144-8.717-.145 8.717-2.609 156.922zM8.145 399h5.796l-.145-8.718-2.608-156.922-.145-8.717-.145 8.717L8.29 390.282zM-.515 399H5.28l-.145-8.718L2.528 233.36l-.145-8.717-.145 8.717L-.37 390.282z"/></g></g><defs><linearGradient id="b" x1="718" x2="718" y1="0" y2="400" gradientUnits="userSpaceOnUse"><stop/><stop offset="1" stop-opacity="0"/></linearGradient><clipPath id="a"><path fill="%23fff" d="M0 0h388v400H0z"/></clipPath></defs></svg>') repeat-x -2px bottom,
        linear-gradient(180deg, #c8f0e6 0%, #e8e1ff 75%, #ffffff)`,
      }}
    >

      <div className="relative max-w-4xl mx-auto px-6 py-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-xs font-medium text-blue-700"
        >
          <Sparkles className="w-3 h-3" />
          Powered by GPT-4o · Get results in 30 seconds
          <ArrowRight className="w-3 h-3" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-gray-900"
        >
          Audit your website with{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">AI precision</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Enter any URL. Get an AI-powered audit covering Performance, SEO, Accessibility,
          UX, and Conversion — with a prioritized roadmap to fix every issue.
        </motion.p>

        {/* URL Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleAudit}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6"
        >
          <div className="relative flex-1 group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <input
              type="text"
              value={url}
              onChange={e => { setUrl(e.target.value); setError(''); }}
              placeholder="https://yourwebsite.com"
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-lg"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 group whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: '#9250e6',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7e3fc0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#9250e6')}
          >
            Run Free Audit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.form>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 mb-4">
            {error}
          </motion.p>
        )}

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-xs text-gray-700 border border-gray-300 px-3 py-1 rounded-full bg-gray-50 font-medium"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            Results in 30 seconds
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            5 free audits included
          </div>
        </motion.div>

        {/* Mock Report Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 relative"
        >
          <div className="rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Mock browser bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600 font-mono">
                designpulse.ai/audits/rpt_abc123
              </div>
            </div>

            {/* Mock report content */}
            <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { label: 'Overall', score: 84, color: '#f59e0b' },
                { label: 'Performance', score: 91, color: '#10b981' },
                { label: 'SEO', score: 88, color: '#10b981' },
                { label: 'Accessibility', score: 73, color: '#f59e0b' },
                { label: 'UX', score: 82, color: '#10b981' },
                { label: 'Conversion', score: 65, color: '#f97316' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <div className="relative w-16 h-16">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke={item.color} strokeWidth="3"
                        strokeDasharray={`${item.score * 0.88} 88`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-blue-600/10 blur-xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
