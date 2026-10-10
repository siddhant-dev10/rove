import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

// GET /api/bookings - Retrieve all confirmed bookings
export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);

    const bookings = await db
      .collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create and persist a new confirmed booking in MongoDB
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);

    const bookingData = await request.json();

    const reservation = {
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      bookingReference: `ROV-${Date.now().toString(36).toUpperCase()}`,
    };

    const result = await db.collection('bookings').insertOne(reservation);

    return NextResponse.json({
      success: true,
      message: 'Booking successfully confirmed and stored in MongoDB',
      bookingId: result.insertedId,
      bookingReference: reservation.bookingReference,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to record booking';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
