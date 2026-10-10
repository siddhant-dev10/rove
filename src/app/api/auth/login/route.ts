import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/auth';

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
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Retrieve user by email
    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, error: 'We could not match that email and password. Please check your details.' },
        { status: 401 }
      );
    }

    // Verify password hash
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'We could not match that email and password. Please check your details.' },
        { status: 401 }
      );
    }

    const userId = user._id.toString();
    const token = createSessionToken({ userId, email: user.email, name: user.name });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(rememberMe));

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name.split(' ')[0]}`,
      user: {
        id: userId,
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
