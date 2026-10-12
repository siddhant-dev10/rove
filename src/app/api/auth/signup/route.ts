import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hashPassword, createSessionToken, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/auth';
import { findUserByEmail, createUser } from '@/lib/userStore';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Please enter your name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    // Hash password using native Scrypt + salt
    const passwordHash = hashPassword(password);

    // Persist user record in MongoDB (with persistent local fallback)
    const newUser = await createUser({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    // Create signed HMAC-SHA256 session token
    const token = createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(true));

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      storageProvider: newUser.storageProvider,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
