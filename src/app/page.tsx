import { LandingNavbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero';
import { FeatureShowcase } from '@/components/landing/feature-showcase';
import { FeaturesSection } from '@/components/landing/features';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { PricingSection } from '@/components/landing/pricing';
import { TestimonialsSection } from '@/components/landing/testimonials';
import { FAQSection } from '@/components/landing/faq';
import { FooterSection } from '@/components/landing/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DesignPulse AI — Website Audit & Optimization Platform',
  description:
    'Instantly audit your website for Performance, SEO, Accessibility, UX, and Conversion Optimization. Get AI-powered insights and a prioritized improvement roadmap.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FeatureShowcase />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
