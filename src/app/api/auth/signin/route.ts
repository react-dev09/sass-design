import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '@/lib/auth-store';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function setSessionCookies(
  response: NextResponse,
  userId: string,
  email: string
) {
  const isProduction = process.env.NODE_ENV === 'production';

  response.cookies.set('user_id', userId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  response.cookies.set('user_email', email, {
    httpOnly: false, // readable client-side for display
    secure: isProduction,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    // ── Basic validation ────────────────────────────────────────────────────
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    // ── Check if user exists ────────────────────────────────────────────────
    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Email not found. Please sign up first.' },
        { status: 404 }
      );
    }

    // ── Verify password ─────────────────────────────────────────────────────
    const isValid = await verifyPassword(user, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // ── Set session ─────────────────────────────────────────────────────────
    const response = NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    setSessionCookies(response, user.id, user.email);

    return response;
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
