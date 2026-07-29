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
  // Split into two rows for the marquee
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
    <div className="w-[85vw] sm:w-[400px] flex-shrink-0 group relative rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md p-7 flex flex-col gap-5 hover:bg-white/70 hover:shadow-lg transition-all duration-300">
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-6 text-5xl text-gray-300 font-serif">"</div>

      <div className="flex gap-1">
        {Array.from({ length: t.stars }).map((_, si) => (
          <Star key={si} className="w-4 h-4 text-amber-400" fill="currentColor" />
        ))}
      </div>
      <p className="text-sm leading-relaxed flex-1 transition-colors duration-300" style={{ color: '#000000' }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-200 transition-colors duration-300">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-violet-500 border border-violet-400/30 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-violet-500/30">
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold transition-colors duration-300" style={{ color: '#000000' }}>
            {t.author}
          </p>
          <p className="text-xs transition-colors duration-300" style={{ color: '#000000' }}>
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 overflow-hidden relative" style={{ backgroundColor: '#ecf4f2' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .group-hover\\:pause-marquee:hover .animate-marquee,
        .group-hover\\:pause-marquee:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}} />

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
      </div>

      {/* Marquee Container */}
      <div className="group group-hover:pause-marquee flex flex-col gap-8 w-full max-w-[100vw]">
        
        {/* Row 1 */}
        <div className="flex w-max gap-8 animate-marquee">
          {/* We duplicate the array 4 times to ensure it covers very wide screens and loops seamlessly */}
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>

        {/* Row 2 (Reversed) */}
        <div className="flex w-max gap-8 animate-marquee-reverse">
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>

      </div>
      
      {/* Edge gradient masks to fade out the edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#ecf4f2] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#ecf4f2] to-transparent pointer-events-none" />
    </section>
  );
}
