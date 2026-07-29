import { NextRequest, NextResponse } from 'next/server';

// Paths that require the user to be logged in
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/audits',
  '/reports',
  '/analytics',
  '/favorites',
  '/settings',
];

// Auth pages — logged-in users should be bounced away from these
const AUTH_PAGES = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow API routes, Next internals, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const userId = req.cookies.get('user_id')?.value;
  const isAuthenticated = Boolean(userId && userId.length > 0);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  // Unauthenticated user trying to reach a protected route → sign-up
  if (isProtected && !isAuthenticated) {
    const signUpUrl = new URL('/sign-up', req.url);
    return NextResponse.redirect(signUpUrl);
  }

  // Authenticated user trying to reach sign-in or sign-up → dashboard
  if (isAuthPage && isAuthenticated) {
    const redirectUrl = req.nextUrl.searchParams.get('redirect_url');
    if (redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     *  - _next/static
     *  - _next/image
     *  - image/font files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|css|js)$).*)',
  ],
};
