'use client';

import Link from 'next/link';

export function FeatureShowcase() {
  return (
    <section className="relative w-full bg-[#030303] overflow-hidden py-16 lg:py-24 flex items-center ">
      {/* ── Background Image (Provided by User) ── */}
      <div className="absolute inset-0 bg-[#030303]" />

      <div
        className="absolute right-0 bottom-0 w-full md:w-[80%] h-full opacity-80 pointer-events-none"
        style={{
          backgroundImage: `url('/feature-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(0deg, rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(0deg, rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left Side: Copy & CTA */}
          <div className="max-w-xl">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Bigger scale.<br />
              Bigger advantage.
            </h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
              DesignPulse for Enterprise means brand visibility dominance. Win more customers across markets and domains. Everywhere they search.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white transition-colors border border-white/30 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Book a demo
            </Link>
          </div>

          {/* Right Side: Video Container */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(45,212,191,0.15)] bg-black/40 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-[16/9]">
              <video
                src="/video-right.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
