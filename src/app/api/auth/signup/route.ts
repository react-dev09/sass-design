import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const demoUsers = new Map<string, { id: string; email: string; clerkId: string; name: string }>();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Check if user exists
    let user = Array.from(demoUsers.values()).find(u => u.email === email);

    // Create user if doesn't exist
    if (!user) {
      const userId = crypto.randomUUID();
      user = {
        id: userId,
        email,
        clerkId: `demo_${Date.now()}`,
        name: email.split('@')[0],
      };
      demoUsers.set(userId, user);
    }

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
    });

    // Set session cookie
    response.cookies.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    response.cookies.set('user_email', email, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
