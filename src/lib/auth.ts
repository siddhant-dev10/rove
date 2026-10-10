import crypto from 'crypto';

const AUTH_SECRET = process.env.AUTH_SECRET || 'rove_default_dev_secret_key_8492019482';
export const SESSION_COOKIE_NAME = 'rove_session';

/**
 * Hash a password using Node.js native Scrypt with a unique random 16-byte salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Constant-time password verification against stored Scrypt salt:hash
 */
export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, key] = combinedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  exp: number;
}

/**
 * Create a cryptographically signed HMAC-SHA256 session token
 */
export function createSessionToken(user: { userId: string; email: string; name: string }): string {
  const payload: SessionPayload = {
    userId: user.userId,
    email: user.email.toLowerCase().trim(),
    name: user.name.trim(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Verify and unpack a signed session token
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;

    const payload: SessionPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Standard cookie configuration for sessions
 */
export function getSessionCookieOptions(rememberMe: boolean = true) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 : undefined, // 7 days or browser session
  };
}
