import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/auth-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    // ── Validation ──────────────────────────────────────────────────────────
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // ── Duplicate check ─────────────────────────────────────────────────────
    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered. Please sign in instead.' },
        { status: 409 }
      );
    }

    // ── Create user ─────────────────────────────────────────────────────────
    const user = await createUser(email, password);

    const response = NextResponse.json(
      { success: true, userId: user.id, email: user.email },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
