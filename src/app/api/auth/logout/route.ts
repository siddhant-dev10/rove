import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
