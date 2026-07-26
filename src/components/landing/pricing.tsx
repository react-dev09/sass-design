'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying it out.',
    features: [
      '5 audits per month',
      'All 5 audit categories',
      'AI executive summary',
      'Share reports',
      'Score breakdown',
    ],
    cta: 'Start for free',
    href: '/sign-up',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For professionals and freelancers.',
    features: [
      'Unlimited audits',
      'All Free features',
      'PDF export',
      'Advanced AI reports',
      'Priority roadmap',
      'API access',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    href: '/sign-up',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$99',
    period: 'per month',
    description: 'For teams and agencies.',
    features: [
      'Everything in Pro',
      '5 team seats',
      'White-label reports',
      'Client management',
      'Custom integrations',
      'SLA support',
    ],
    cta: 'Contact us',
    href: 'mailto:sales@designpulse.ai',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3"
        >
          Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: '#000000' }}
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Start free. Upgrade when you need more.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'relative rounded-2xl border p-8 flex flex-col transition-all duration-300 group',
              plan.popular
                ? 'border-violet-500/50 bg-gradient-to-br from-violet-600/15 to-violet-500/5 shadow-xl shadow-violet-500/20 sm:scale-105'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-lg'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-2 text-xs bg-gradient-to-r from-violet-600 to-violet-500 text-white px-4 py-1.5 rounded-full font-semibold shadow-lg shadow-violet-500/40">
                  <Zap className="w-3.5 h-3.5" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-bold text-xl" style={{ color: '#000000' }}>{plan.name}</h3>
              <p className="text-xs mt-2" style={{ color: '#000000' }}>{plan.description}</p>
              <div className="flex items-baseline gap-1 mt-5">
                <span className="text-5xl font-bold" style={{ color: '#000000' }}>{plan.price}</span>
                <span className="text-sm" style={{ color: '#000000' }}>/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3.5 flex-1 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm transition-colors" style={{ color: '#000000' }}>
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={cn(
                'w-full text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 relative group/btn',
                plan.popular
                  ? 'bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-500/40 hover:shadow-violet-500/60 hover:shadow-xl'
                  : 'bg-black text-white hover:bg-gray-800'
              )}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
