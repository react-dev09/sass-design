import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') ?? '';
    const status = searchParams.get('status');
    const favorite = searchParams.get('favorite');
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ audits: [], total: 0 });
    }

    const where: Record<string, unknown> = { userId: user.id };

    if (search) {
      where.url = { contains: search, mode: 'insensitive' };
    }
    if (status) {
      where.status = status;
    }
    if (favorite === 'true') {
      where.isFavorite = true;
    }

    const [audits, total] = await Promise.all([
      prisma.audit.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.audit.count({ where }),
    ]);

    return NextResponse.json({ audits, total, page, limit });
  } catch (error) {
    console.error('List audits error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
