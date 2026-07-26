'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Check, CreditCard, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['5 audits per month', 'Basic AI insights', 'Score breakdown', 'Share reports'],
    current: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['Unlimited audits', 'Advanced AI reports', 'PDF export', 'Priority support', 'API access'],
    current: false,
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '$99',
    period: '/month',
    features: ['Everything in Pro', 'Team access (5 seats)', 'White-label reports', 'Client management', 'Custom integrations'],
    current: false,
  },
];

function ProfileTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('user@example.com');

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
          <User className="w-7 h-7 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-200">Your Profile</p>
          <p className="text-xs text-zinc-500">Manage your account information</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <button
          onClick={() => toast.success('Profile updated!')}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
      <div className="border-t border-zinc-800/60 pt-4">
        <p className="text-xs text-zinc-600">
          Connect your Clerk account to enable SSO, social logins, and advanced profile management.
        </p>
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-1">Current Plan</p>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Free Plan</h3>
            <p className="text-sm text-zinc-500">5 audits used this month · 0 remaining</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-zinc-100">$0</p>
            <p className="text-xs text-zinc-500">/month</p>
          </div>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-xl border p-5 space-y-4',
              plan.popular
                ? 'border-violet-500/40 bg-violet-500/5'
                : 'border-zinc-800/60 bg-zinc-900/30',
              plan.current && 'opacity-60'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="text-xs bg-violet-600 text-white px-3 py-0.5 rounded-full font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <div>
              <h3 className="font-bold text-zinc-100">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-zinc-100">{plan.price}</span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => toast.info('Stripe checkout coming soon!')}
              disabled={plan.current}
              className={cn(
                'w-full py-2 rounded-lg text-sm font-medium transition-colors',
                plan.current
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-violet-600 hover:bg-violet-500 text-white'
                  : 'border border-zinc-700 hover:border-zinc-600 text-zinc-300'
              )}
            >
              {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    auditComplete: true,
    weeklyDigest: true,
    criticalIssues: true,
    marketing: false,
    tips: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preference updated');
  };

  const items = [
    { key: 'auditComplete', label: 'Audit Complete', desc: 'Get notified when an audit finishes' },
    { key: 'criticalIssues', label: 'Critical Issues', desc: 'Alerts when new critical issues are found' },
    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your audits every Monday' },
    { key: 'tips', label: 'Tips & Tricks', desc: 'Product tips and optimization guides' },
    { key: 'marketing', label: 'Marketing Emails', desc: 'News and promotions from DesignPulse' },
  ] as const;

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 divide-y divide-zinc-800/40">
      {items.map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-zinc-200">{item.label}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
          </div>
          <button
            onClick={() => toggle(item.key)}
            className={cn(
              'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
              settings[item.key] ? 'bg-violet-600' : 'bg-zinc-700'
            )}
          >
            <span
              className={cn(
                'inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform',
                settings[item.key] ? 'translate-x-4.5' : 'translate-x-0.5'
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-5">
      {/* Tab nav */}
      <div className="flex gap-1 border-b border-zinc-800/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all',
                isActive
                  ? 'text-violet-400 border-violet-500'
                  : 'text-zinc-500 border-transparent hover:text-zinc-300'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'billing' && <BillingTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </motion.div>
    </div>
  );
}
