'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export function FooterSection() {
  return (
    /**
     * Footer outer wrapper — white background.
     * The colorful gradient image layer sits absolutely inside the CTA zone,
     * with a CSS mask that fades it from transparent at the very top (white shows
     * through from the page) to fully opaque toward the bottom.
     */
    <footer style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ── Zone 1: CTA strip with masked colorful bg image ── */}
      <div style={{ position: 'relative', padding: '100px 24px 10px', textAlign: 'center' }}>

        {/*
          Colorful bg layer — the diagonal pink/purple/coral image from the reference.
          mask fades it: bottom 65% = fully visible, top fades to transparent so white shows.
          Applied to THIS div only so text above is never masked.
        */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(ellipse 55% 70% at -5% 15%,  #ff79c6 0%, transparent 55%),
              radial-gradient(ellipse 35% 45% at 22% 38%,  rgba(255,255,255,0.9) 0%, transparent 48%),
              radial-gradient(ellipse 50% 60% at 65%  2%,  #7c3aed 0%, transparent 52%),
              radial-gradient(ellipse 45% 55% at 92% 30%,  #6d28d9 0%, transparent 55%),
              radial-gradient(ellipse 60% 55% at 42% 90%,  #f97316 0%, transparent 58%),
              radial-gradient(ellipse 30% 55% at 88% 75%,  #f97316 0%, transparent 52%),
              radial-gradient(ellipse 55% 50% at 55% 50%,  #ef4444 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 78% 55%,  #9333ea 0%, transparent 55%),
              linear-gradient(140deg, #f472b6 0%, #c084fc 25%, #fb923c 50%, #a855f7 75%, #f97316 100%)
            `,
            mask: 'linear-gradient(0deg, rgb(0, 0, 0) 15%, rgba(0, 0, 0, 0) 100%)',
            WebkitMask: 'linear-gradient(0deg, rgb(0, 0, 0) 15%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* Content sits above the masked bg — fully visible at all times */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#1a1a2e',
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Audit smarter.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #362a44, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ship faster.
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(30, 20, 60, 0.65)',
              marginBottom: '32px',
              fontWeight: 500,
            }}
          >
            Get AI-powered insights for your website in 30 seconds.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/sign-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0f0a1e',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '12px 26px',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
            >
              Get Started Free →
            </Link>

            <Link
              href="/sign-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(8px)',
                color: '#1a1a2e',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '12px 26px',
                borderRadius: '50px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.75)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.8)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.55)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </Link>
          </div>
          <div
            className="p-8 sm:p-10 lg:px-12 lg:py-12"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.85) 100%)`,
              borderRadius: '24px',
              position: 'relative', marginTop: '50px',
            }}
          >
            {/* Shimmer top line */}


            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12 text-left">
                {/* Column 1: Product */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>Product</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Explore DesignPulse', 'What you get for FREE', 'Why Go PRO', 'Test Server Locations', 'REST API'].map((item) => (
                      <li key={item}>
                        <Link href="#" style={{ color: 'rgba(196,181,253,0.7)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(196,181,253,0.7)')}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Pricing */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>Pricing</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Plans'].map((item) => (
                      <li key={item}>
                        <Link href="#" style={{ color: 'rgba(196,181,253,0.7)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(196,181,253,0.7)')}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>Resources</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['View Resources', 'Metrics & Audits', 'FAQ', 'Using DesignPulse'].map((item) => (
                      <li key={item}>
                        <Link href="#" style={{ color: 'rgba(196,181,253,0.7)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(196,181,253,0.7)')}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Blog */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>Blog</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Changelog', 'Case Studies', 'How to Guides', 'Optimization Explained'].map((item) => (
                      <li key={item}>
                        <Link href="#" style={{ color: 'rgba(196,181,253,0.7)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(196,181,253,0.7)')}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 5 & 6: Brand, About, Socials */}
                <div className="col-span-2 md:col-span-2 md:pl-8">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 18px rgba(124,58,237,0.55)',
                        flexShrink: 0,
                      }}
                    >
                      <Zap style={{ width: '16px', height: '16px', color: 'white' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'white', lineHeight: 1.2 }}>
                      DesignPulse AI
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(196,181,253,0.7)', lineHeight: 1.6, marginBottom: '16px' }}>
                    DesignPulse AI was created for website owners to easily test the performance of their webpages. <Link href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>Learn more about us</Link> or check out <Link href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>Careers</Link>.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: 500, marginBottom: '16px' }}>
                    Got Questions? <Link href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>Contact us</Link>.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {[
                      { label: '𝕏', href: 'https://twitter.com', bg: '#000' },
                      { label: 'f', href: 'https://facebook.com', bg: '#1877f2' },
                      { label: 'in', href: 'https://linkedin.com', bg: '#0a66c2' },
                    ].map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: s.bg,
                          color: 'white',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '24px' }} />

              {/* Bottom row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <p style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.55)' }}>
                  © {new Date().getFullYear()} DesignPulse AI. All rights reserved.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {[
                    { label: 'Privacy Policy', href: '#' },
                    { label: 'Terms of Service', href: '#' },
                    { label: 'Security', href: '#' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(148,163,184,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = 'rgba(196,181,253,0.9)')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.55)')
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone 2: Dark card — plum → near-black, rounded top corners ── */}

    </footer >
  );
}
