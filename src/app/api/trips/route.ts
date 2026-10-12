import { NextResponse } from 'next/server';
import { getSafeDb } from '@/lib/mongodb';
import { initialGoaTrip, initialLadakhTrip, initialBaliTrip } from '@/data/mockData';
import { Trip } from '@/types/rove';

export const dynamic = 'force-dynamic';

const initialSeed: Trip[] = [initialGoaTrip, initialLadakhTrip, initialBaliTrip];
const localTrips: Trip[] = [...initialSeed];

// GET /api/trips - Retrieve all trips from MongoDB, or auto-seed defaults if empty
export async function GET() {
  try {
    const db = await getSafeDb();
    if (db) {
      const tripsCollection = db.collection('trips');
      let trips = await tripsCollection.find({}).toArray();

      // Auto-seed if database is currently empty
      if (trips.length === 0) {
        await tripsCollection.insertMany(initialSeed);
        trips = await tripsCollection.find({}).toArray();
      }

      return NextResponse.json({
        success: true,
        count: trips.length,
        trips,
        storageProvider: 'mongodb',
      });
    }
  } catch (error) {
    console.warn('MongoDB query for trips failed, using initial curated blueprints:', error);
  }

  return NextResponse.json({
    success: true,
    count: localTrips.length,
    trips: localTrips,
    storageProvider: 'persistent_local',
  });
}

// POST /api/trips - Upsert (save/update) an active trip in MongoDB
export async function POST(request: Request) {
  try {
    const tripData = await request.json();

    if (!tripData || !tripData.id) {
      return NextResponse.json(
        { success: false, error: 'Invalid trip data: missing id' },
        { status: 400 }
      );
    }

    try {
      const db = await getSafeDb();
      if (db) {
        const tripsCollection = db.collection('trips');
        const result = await tripsCollection.updateOne(
          { id: tripData.id },
          { $set: { ...tripData, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );

        return NextResponse.json({
          success: true,
          message: `Trip ${tripData.id} saved to MongoDB`,
          result,
          storageProvider: 'mongodb',
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB update for trip failed, updating local state:', dbErr);
    }

    const idx = localTrips.findIndex((t) => t.id === tripData.id);
    if (idx >= 0) {
      localTrips[idx] = { ...localTrips[idx], ...tripData, updatedAt: new Date().toISOString() };
    } else {
      localTrips.push({ ...tripData, updatedAt: new Date().toISOString() });
    }

    return NextResponse.json({
      success: true,
      message: `Trip ${tripData.id} saved to local session`,
      storageProvider: 'persistent_local',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save trip';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
