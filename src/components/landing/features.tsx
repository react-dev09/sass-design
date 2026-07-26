'use client';

import { motion } from 'framer-motion';
import { Zap, Globe, Eye, Brain, BarChart3, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Core Web Vitals',
    description: 'Get real LCP, CLS, FCP, INP, and TTFB scores powered by Google PageSpeed Insights API.',
  },
  {
    icon: Globe,
    title: 'SEO Analysis',
    description: 'Audit meta tags, headings, Open Graph, structured data, sitemap, and robots.txt in seconds.',
  },
  {
    icon: Eye,
    title: 'Accessibility Audit',
    description: 'Detect contrast failures, missing alt text, ARIA issues, and keyboard navigation gaps.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'GPT-4o analyzes your site and generates an executive summary, top issues, and quick wins.',
  },
  {
    icon: BarChart3,
    title: 'Conversion Optimization',
    description: 'Evaluate CTA placement, trust signals, form usability, and user journey clarity.',
  },
  {
    icon: Shield,
    title: 'Priority Roadmap',
    description: 'Get a sorted action plan — from immediate critical fixes to long-term strategic improvements.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3"
        >
          Features
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Everything you need to optimize any website
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-xl mx-auto"
        >
          One tool that combines performance monitoring, SEO auditing, accessibility
          checking, and AI-powered recommendations.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{
                backgroundColor: '#dceeeb',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none"><defs><pattern id="p" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="20" y2="20" stroke="%23a8e6da" stroke-width="1" opacity="0.3"/></pattern></defs><rect width="200" height="200" fill="url(%23p)"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                backgroundSize: '150px 150px',
              }}
            >
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#9250e6' }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
