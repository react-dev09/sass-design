import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero';
import { FeaturesSection } from '@/components/landing/features';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { PricingSection } from '@/components/landing/pricing';
import { TestimonialsSection } from '@/components/landing/testimonials';
import { FAQSection } from '@/components/landing/faq';
import { FooterSection } from '@/components/landing/footer';

export const metadata: Metadata = {
  title: 'DesignPulse AI — Website Audit & Optimization Platform',
  description:
    'Instantly audit your website for Performance, SEO, Accessibility, UX, and Conversion Optimization. Get AI-powered insights and a prioritized improvement roadmap.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
