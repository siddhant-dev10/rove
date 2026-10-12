import { NextResponse } from 'next/server';
import { allBookingCatalog } from '@/data/allTripsCatalog';
import { allBusesCatalog } from '@/data/busCatalog';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || 'goa';
    const destKey = destination.toLowerCase().split(',')[0].trim();

    const catalog = allBookingCatalog[destKey] || allBookingCatalog.goa;
    const buses = allBusesCatalog[destKey] || allBusesCatalog.goa;

    // Filter transports into flights and trains
    const flights = catalog.transports.filter((t) => t.mode === 'flight');
    const trains = catalog.transports.filter((t) => t.mode === 'train');
    const privateCars = catalog.transports.filter((t) => t.mode === 'car');
    const hotels = catalog.hotels;
    const dining = catalog.dining;

    return NextResponse.json({
      success: true,
      destination: destKey,
      counts: {
        flights: flights.length,
        trains: trains.length,
        buses: buses.length,
        hotels: hotels.length,
        dining: dining.length,
        total: flights.length + trains.length + buses.length + hotels.length + dining.length,
      },
      options: {
        flights,
        trains,
        buses,
        privateCars,
        hotels,
        dining,
        localMobility: catalog.localTransit,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch options';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
