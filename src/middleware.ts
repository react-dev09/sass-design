import { NextRequest, NextResponse } from 'next/server';

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasValidClerkKey = CLERK_KEY && CLERK_KEY.startsWith('pk_') && CLERK_KEY.length > 20;

// Only run Clerk middleware if valid keys are configured
let clerkMiddlewareHandler: ((req: NextRequest) => Promise<NextResponse | undefined>) | null = null;

if (hasValidClerkKey) {
  // Lazy import to avoid crash when key is missing
  const { clerkMiddleware, createRouteMatcher } = require('@clerk/nextjs/server');

  const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook(.*)',
  ]);

  clerkMiddlewareHandler = clerkMiddleware(async (auth: () => Promise<{ userId: string | null }>, req: NextRequest) => {
    if (!isPublicRoute(req)) {
      const { userId } = await auth();
      if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
  });
}

export async function middleware(req: NextRequest) {
  if (clerkMiddlewareHandler) {
    const result = await clerkMiddlewareHandler(req);
    if (result) return result;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
