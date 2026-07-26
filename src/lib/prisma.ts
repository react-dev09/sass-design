import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPrismaClient(): any {
  // Skip Prisma initialization during build time
  if (process.env.npm_lifecycle_event === 'build' || process.env.__NEXT_DATA__) {
    return {} as PrismaClient;
  }

  const opts: Record<string, unknown> = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  };

  try {
    return new PrismaClient(opts as ConstructorParameters<typeof PrismaClient>[0]);
  } catch (error) {
    console.warn('Prisma Client initialization failed:', error);
    return {} as PrismaClient;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma && typeof prisma === 'object' && '$disconnect' in prisma) {
  globalForPrisma.prisma = prisma as PrismaClient;
}
