/**
 * OSRM (Open Source Routing Machine) Distance & Duration Service
 * Uses official public routing server for real driving road network distances
 * Fallback: Haversine geodesic formula with road winding multiplier (1.3x)
 */

export interface RouteCalculationResult {
  distanceKm: number;
  durationMinutes: number;
  routeSummary: string;
  source: 'osrm_live' | 'geodesic_calculated';
}

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function calculateRouteDistance(
  origin: { lat: number; lng: number; label?: string },
  destination: { lat: number; lng: number; label?: string }
): Promise<RouteCalculationResult> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s strict timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
        const durationMinutes = Math.round(route.duration / 60);

        return {
          distanceKm,
          durationMinutes,
          routeSummary: `${distanceKm} km via regional roads (${durationMinutes} mins drive)`,
          source: 'osrm_live',
        };
      }
    }
  } catch (err) {
    // Expected in environments without external internet or when OSRM public demo server rate limits
    console.debug('[RouteService] OSRM demo server unavailable, using high-precision geodesic calculation:', err);
  }

  // Fallback: Haversine with 1.35x road curvature factor and average 35 km/h urban/scenic transit speed
  const straightLine = haversineDistanceKm(origin.lat, origin.lng, destination.lat, destination.lng);
  const roadKm = Math.round(straightLine * 1.35 * 10) / 10;
  const durationMin = Math.max(8, Math.round((roadKm / 35) * 60));

  return {
    distanceKm: roadKm,
    durationMinutes: durationMin,
    routeSummary: `${roadKm} km estimated road transit (~${durationMin} mins drive)`,
    source: 'geodesic_calculated',
  };
}
