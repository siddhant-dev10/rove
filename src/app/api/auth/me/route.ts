import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';

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

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    let query: Record<string, unknown> = { email: payload.email };
    try {
      query = { _id: new ObjectId(payload.userId) };
    } catch {
      // Fallback to email query if id format is unusual
    }

    const user = await usersCollection.findOne(query);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
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
