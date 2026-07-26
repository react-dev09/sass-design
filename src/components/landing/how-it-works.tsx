'use client';

import { motion } from 'framer-motion';
import { Globe, Zap, Brain, BarChart3 } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Globe,
    title: 'Enter your URL',
    description: 'Paste any public website URL. We support all platforms — WordPress, Shopify, custom sites, SPAs.',
    color: 'text-violet-400',
  },
  {
    step: '02',
    icon: Zap,
    title: 'We run the audit',
    description: 'We capture a screenshot, fetch Google PageSpeed data, analyze the page structure — all in parallel.',
    color: 'text-amber-400',
  },
  {
    step: '03',
    icon: Brain,
    title: 'AI generates insights',
    description: 'GPT-4o reviews all the data and writes an executive summary, identifies top issues, and quick wins.',
    color: 'text-emerald-400',
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Get your report',
    description: 'View interactive charts, drill into every issue, export to PDF, or share a live link with your team.',
    color: 'text-blue-400',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24" style={{ backgroundColor: '#ecf4f2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#000000' }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#000000' }}
          >
            From URL to report in 30 seconds
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {/* Connector line with gradient */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                )}
                <div className="text-center space-y-5">
                  <div className="relative inline-block">
                    <motion.div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:opacity-90 transition-all duration-300"
                      style={{ backgroundColor: '#9250e6' }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(146, 80, 230, 0.3)' }}
                    >
                      <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 border-2 border-zinc-950 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-violet-500/40"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                    >
                      {i + 1}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg transition-colors duration-300" style={{ color: '#000000' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: '#000000' }}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
