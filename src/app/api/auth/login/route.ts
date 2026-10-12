import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/auth';
import { findUserByEmail } from '@/lib/userStore';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe = true } = body;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide both email and password.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Retrieve user via userStore (queries MongoDB Atlas, falls back to persistent store)
    const user = await findUserByEmail(normalizedEmail);
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, error: 'We could not match that email and password. Please check your details.' },
        { status: 401 }
      );
    }

    // Verify password hash with constant-time equality
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'We could not match that email and password. Please check your details.' },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(rememberMe));

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name.split(' ')[0]}`,
      storageProvider: user.storageProvider,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
