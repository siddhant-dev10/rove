import { NextResponse } from 'next/server';
import { fetchLiveDestinationWeather } from '@/lib/services/weatherService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination') || 'goa';

  try {
    const weather = await fetchLiveDestinationWeather(destination);
    return NextResponse.json({
      success: true,
      destination,
      weather,
      source: 'Open-Meteo API v1',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Weather fetch failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
