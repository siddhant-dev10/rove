import { NextResponse } from 'next/server';
import { calculateRouteDistance } from '@/lib/services/routeService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination } = body;

    if (!origin || !destination || origin.lat == null || destination.lat == null) {
      return NextResponse.json(
        { success: false, error: 'origin and destination with lat/lng are required' },
        { status: 400 }
      );
    }

    const routeInfo = await calculateRouteDistance(origin, destination);
    return NextResponse.json({
      success: true,
      route: routeInfo,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Route calculation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
