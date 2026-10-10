import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    
    // Quick ping to verify connectivity
    await client.db('admin').command({ ping: 1 });

    const tripsCount = await db.collection('trips').countDocuments();
    const bookingsCount = await db.collection('bookings').countDocuments();

    return NextResponse.json({
      status: 'connected',
      database: dbName,
      cluster: 'Cluster0 (MongoDB Atlas)',
      counts: {
        trips: tripsCount,
        bookings: bookingsCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'disconnected',
        error: message,
      },
      { status: 500 }
    );
  }
}
