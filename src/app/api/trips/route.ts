import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { initialGoaTrip, initialLadakhTrip, initialBaliTrip } from '@/data/mockData';

export const dynamic = 'force-dynamic';

// GET /api/trips - Retrieve all trips from MongoDB, or auto-seed defaults if empty
export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    const tripsCollection = db.collection('trips');

    let trips = await tripsCollection.find({}).toArray();

    // Auto-seed if database is currently empty
    if (trips.length === 0) {
      const initialSeed = [initialGoaTrip, initialLadakhTrip, initialBaliTrip];
      await tripsCollection.insertMany(initialSeed);
      trips = await tripsCollection.find({}).toArray();
    }

    return NextResponse.json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST /api/trips - Upsert (save/update) an active trip in MongoDB
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'rove_db';
    const db = client.db(dbName);
    const tripsCollection = db.collection('trips');

    const tripData = await request.json();

    if (!tripData || !tripData.id) {
      return NextResponse.json(
        { success: false, error: 'Invalid trip data: missing id' },
        { status: 400 }
      );
    }

    const result = await tripsCollection.updateOne(
      { id: tripData.id },
      { $set: { ...tripData, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: `Trip ${tripData.id} saved to MongoDB`,
      result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save trip';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
