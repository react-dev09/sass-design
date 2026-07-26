import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DesignPulse AI — Website Audit & Optimization Platform',
    template: '%s | DesignPulse AI',
  },
  description:
    'Audit your website for Performance, SEO, Accessibility, UX, and Conversion Optimization with AI-powered insights. Get actionable reports in seconds.',
  keywords: [
    'website audit', 'SEO analysis', 'performance audit',
    'accessibility checker', 'AI website analysis', 'Core Web Vitals',
    'conversion optimization',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'DesignPulse AI — Website Audit & Optimization Platform',
    description: 'Audit your website with AI-powered insights.',
    siteName: 'DesignPulse AI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} light`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const errorMsg = String(args[0] || '');
                  if (errorMsg.includes('Clerk') ||
                      errorMsg.includes('failed_to_load_clerk_js') ||
                      errorMsg.includes('ClerkRuntimeError')) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                window.addEventListener('unhandledrejection', (event) => {
                  const reason = String(event.reason || '');
                  if (reason.includes('Clerk') || reason.includes('failed_to_load_clerk_js')) {
                    event.preventDefault();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
