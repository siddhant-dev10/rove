import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { findUserById, findUserByEmail } from '@/lib/userStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const payload = verifySessionToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Try finding by user ID or email
    let user = await findUserById(payload.userId);
    if (!user && payload.email) {
      user = await findUserByEmail(payload.email);
    }

    // If user record found, return full data
    if (user) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }

    // If user object not found in store but cryptographically signed token is valid,
    // honor session claims so user is not interrupted
    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Auth verification error';
    return NextResponse.json(
      { authenticated: false, user: null, error: message },
      { status: 500 }
    );
  }
}
