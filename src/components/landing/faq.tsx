'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How long does an audit take?',
    a: 'Most audits complete in 20-40 seconds. We run page capture, PageSpeed analysis, and AI insight generation in parallel to keep it fast.',
  },
  {
    q: 'Does it work on any website?',
    a: 'Yes — any publicly accessible URL. This includes WordPress, Shopify, Next.js, static sites, SPAs, and more. Sites behind authentication require the URL to be publicly accessible.',
  },
  {
    q: 'What does the AI actually analyze?',
    a: 'We feed Google PageSpeed data, page title, URL structure, and real performance metrics to GPT-4o. It generates an executive summary, top issues ranked by impact, quick wins, and a prioritized improvement roadmap.',
  },
  {
    q: 'Do I need a credit card for the free plan?',
    a: 'No. Sign up with your email or Google account and get 5 free audits immediately — no payment info required.',
  },
  {
    q: 'Can I export reports as PDF?',
    a: 'Yes, PDF export is available on the Pro and Agency plans. Reports are formatted for client presentations with scores, charts, and AI insights.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your audit data is stored securely in your account and never shared. Reports are private by default — you choose what to share via a link.',
  },
  {
    q: 'Can I re-run an audit?',
    a: 'Absolutely. You can re-run any audit at any time to track improvements after you make changes to your site.',
  },
  {
    q: 'Do you offer an API?',
    a: 'API access is available on the Pro plan. You can trigger audits and fetch reports programmatically to integrate into your CI/CD pipeline.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 lg:py-24 relative w-full overflow-hidden" style={{
      backgroundImage: 'url(/static/images/pattern-testimonials-card.be52eae.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
      backgroundSize: '400px 300px'
    }}>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#000000' }}
          >
            Frequently asked questions
          </motion.h2>
        </div>

        <div className="space-y-3 w-full md:w-1/2 mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-gray-300 overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: '#ecf4f2' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-medium transition-all duration-300"
                style={{ color: '#000000' }}
              >
                <span className="flex-1">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-colors duration-300" style={{ color: '#666666' }} />
                </motion.div>
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5 text-sm leading-relaxed border-t border-gray-200 pt-4"
                  style={{ color: '#000000' }}
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
