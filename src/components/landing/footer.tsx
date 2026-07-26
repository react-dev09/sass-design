import Link from 'next/link';
import { Zap } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="font-bold text-sm text-zinc-100">DesignPulse AI</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              AI-powered website auditing for developers, designers, and agencies.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Product</p>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Company</p>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact', 'Partners'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">Legal</p>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800/40">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} DesignPulse AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link href="https://twitter.com" className="text-zinc-700 hover:text-zinc-400 transition-colors text-xs font-medium">
              𝕏
            </Link>
            <Link href="https://github.com" className="text-zinc-700 hover:text-zinc-400 transition-colors text-xs font-medium">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
