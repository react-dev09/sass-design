/**
 * Shared in-memory user store for authentication.
 * Persists for the lifetime of the server process.
 * Uses bcryptjs for password hashing.
 */
import bcrypt from 'bcryptjs';

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
}

// Global singleton store — survives hot-reloads in dev via globalThis
const globalForAuth = globalThis as unknown as {
  authUsers: Map<string, AuthUser> | undefined;
};

export const authUsers: Map<string, AuthUser> =
  globalForAuth.authUsers ?? new Map<string, AuthUser>();

if (!globalForAuth.authUsers) {
  globalForAuth.authUsers = authUsers;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getUserByEmail(email: string): AuthUser | undefined {
  const normalized = email.toLowerCase().trim();
  return Array.from(authUsers.values()).find(
    (u) => u.email === normalized
  );
}

export function getUserById(id: string): AuthUser | undefined {
  return authUsers.get(id);
}

export async function createUser(
  email: string,
  password: string
): Promise<AuthUser> {
  const normalized = email.toLowerCase().trim();
  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);

  const user: AuthUser = {
    id,
    email: normalized,
    passwordHash,
    name: normalized.split('@')[0],
    createdAt: new Date(),
  };

  authUsers.set(id, user);
  return user;
}

export async function verifyPassword(
  user: AuthUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}
