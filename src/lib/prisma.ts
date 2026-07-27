/* eslint-disable @typescript-eslint/no-explicit-any */

declare const require: any;
const { PrismaClient } = require('@prisma/client');

type PrismaClientType = InstanceType<typeof PrismaClient> | any;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

function createPrismaClient(): PrismaClientType {
  if (process.env.npm_lifecycle_event === 'build' || process.env.__NEXT_DATA__) {
    return {} as PrismaClientType;
  }

  const opts: any = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  };

  try {
    return new PrismaClient(opts);
  } catch (error) {
    console.warn('Prisma Client initialization failed:', error);
    return {} as PrismaClientType;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma && typeof prisma === 'object' && '$disconnect' in prisma) {
  globalForPrisma.prisma = prisma;
}
