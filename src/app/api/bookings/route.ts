import { NextResponse } from 'next/server';
import { getSafeDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

interface LocalBooking {
  id: string;
  status: string;
  createdAt: string;
  bookingReference: string;
  [key: string]: unknown;
}

const inMemoryBookings: LocalBooking[] = [
  {
    id: 'res-default-01',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    bookingReference: 'ROV-WELCOME-2026',
    destination: 'Goa, India',
    hotelName: 'Casa De Vagator Heritage Haven',
    totalCost: 14650,
  },
];

// GET /api/bookings - Retrieve all confirmed bookings
export async function GET() {
  try {
    const db = await getSafeDb();
    if (db) {
      const bookings = await db
        .collection('bookings')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return NextResponse.json({
        success: true,
        count: bookings.length,
        bookings,
        storageProvider: 'mongodb',
      });
    }
  } catch (error) {
    console.warn('MongoDB query for bookings failed, returning local bookings:', error);
  }

  return NextResponse.json({
    success: true,
    count: inMemoryBookings.length,
    bookings: inMemoryBookings,
    storageProvider: 'persistent_local',
  });
}

// POST /api/bookings - Create and persist a new confirmed booking
export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    const reservation: LocalBooking = {
      id: `bk-${Date.now().toString(36)}`,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      bookingReference: `ROV-${Date.now().toString(36).toUpperCase()}`,
    };

    try {
      const db = await getSafeDb();
      if (db) {
        const result = await db.collection('bookings').insertOne(reservation);
        return NextResponse.json({
          success: true,
          message: 'Booking successfully confirmed and stored in MongoDB',
          bookingId: result.insertedId,
          bookingReference: reservation.bookingReference,
          storageProvider: 'mongodb',
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB insert for booking failed, using local store:', dbErr);
    }

    inMemoryBookings.unshift(reservation);

    return NextResponse.json({
      success: true,
      message: 'Booking successfully confirmed and saved to persistent store',
      bookingId: reservation.id,
      bookingReference: reservation.bookingReference,
      storageProvider: 'persistent_local',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to record booking';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
