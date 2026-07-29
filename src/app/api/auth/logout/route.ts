import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set('user_id', '', { maxAge: 0, path: '/' });
  response.cookies.set('user_email', '', { maxAge: 0, path: '/' });

  return response;
}
