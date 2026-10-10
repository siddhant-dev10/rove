import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { hashPassword, createSessionToken, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/auth';

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
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existing = await usersCollection.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    // Hash password and store in MongoDB
    const passwordHash = hashPassword(password);
    const now = new Date().toISOString();
    const result = await usersCollection.insertOne({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });

    const userId = result.insertedId.toString();
    const token = createSessionToken({ userId, email: normalizedEmail, name: name.trim() });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(true));

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
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
