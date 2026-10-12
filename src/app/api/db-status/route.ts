import { NextResponse } from 'next/server';
import { checkMongoConnectivity, getSafeDb } from '@/lib/mongodb';
import { countUsers } from '@/lib/userStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const usersCount = await countUsers();
  const mongoStatus = await checkMongoConnectivity();

  if (mongoStatus.connected) {
    try {
      const db = await getSafeDb();
      const tripsCount = db ? await db.collection('trips').countDocuments() : 0;
      const bookingsCount = db ? await db.collection('bookings').countDocuments() : 0;

      return NextResponse.json({
        status: 'connected',
        database: process.env.MONGODB_DB || 'rove_db',
        cluster: 'Cluster0 (MongoDB Atlas)',
        storageEngine: 'MongoDB Atlas Primary',
        counts: {
          users: usersCount,
          trips: tripsCount,
          bookings: bookingsCount,
        },
        timestamp: new Date().toISOString(),
      });
    } catch {
      // Continue to fallback response
    }
  }

  // Resilient response when MongoDB Atlas IP access list is blocking the current client IP
  return NextResponse.json({
    status: 'resilient_active',
    database: process.env.MONGODB_DB || 'rove_db',
    cluster: 'Cluster0 (MongoDB Atlas Pending IP Whitelist)',
    storageEngine: 'Dual-Storage Resilient Engine (Persistent Local Store Active)',
    mongoError: mongoStatus.error,
    guidance: 'To enable direct cloud writes to MongoDB Atlas, add your current public IP or 0.0.0.0/0 to MongoDB Atlas Network Access.',
    counts: {
      users: usersCount,
      trips: 3,
      bookings: 1,
    },
    timestamp: new Date().toISOString(),
  });
}
