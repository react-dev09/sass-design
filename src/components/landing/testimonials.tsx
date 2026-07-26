'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "DesignPulse found 12 critical accessibility issues we had no idea about. Fixed them in a week and our bounce rate dropped 18%.",
    author: "Sarah Chen",
    role: "Product Lead @ Veritas",
    avatar: "SC",
    stars: 5,
  },
  {
    quote: "The AI executive summary is incredible. I paste the report link in our Slack and the whole team instantly understands what to prioritize.",
    author: "James O'Brien",
    role: "CTO @ Launchpad Studios",
    avatar: "JO",
    stars: 5,
  },
  {
    quote: "We ran audits on 40 client sites in a day. The white-label PDF exports are client-ready with zero editing needed.",
    author: "Priya Mehta",
    role: "Founder @ PixelAgency",
    avatar: "PM",
    stars: 5,
  },
  {
    quote: "I replaced three separate tools (PageSpeed, wave.webaim.org, and a custom SEO checker) with just DesignPulse.",
    author: "Tom Wyatt",
    role: "Senior Developer @ Hoist",
    avatar: "TW",
    stars: 5,
  },
  {
    quote: "The conversion optimization section surfaced insights I'd never thought to check. Our CTA redesign led to a 31% lift.",
    author: "Aiko Nakamura",
    role: "Growth @ Bloom Commerce",
    avatar: "AN",
    stars: 5,
  },
  {
    quote: "Setup took 2 minutes. First audit ran in 30 seconds. Best ROI tool in my stack, no contest.",
    author: "Marcus Rivera",
    role: "Freelance UX Consultant",
    avatar: "MR",
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: '#ecf4f2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#000000' }}
          >
            Trusted by developers and agencies
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-7 flex flex-col gap-5 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-6 text-5xl text-gray-300 font-serif">"</div>

              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 transition-colors duration-300" style={{ color: '#000000' }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200 transition-colors duration-300">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 border border-violet-400/30 flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  {t.avatar}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold transition-colors duration-300" style={{ color: '#000000' }}>{t.author}</p>
                  <p className="text-xs transition-colors duration-300" style={{ color: '#000000' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
