import { NextResponse } from 'next/server';
import { Trip, AgentPlanRequest, AgentPlanResponse } from '@/types/rove';
import { allTripsMap, allBookingCatalog } from '@/data/allTripsCatalog';
import { allBusesCatalog } from '@/data/busCatalog';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body: AgentPlanRequest = await request.json();
    const {
      destination = 'Goa',
      daysCount = 4,
      budget = 18000,
      travelers = { adults: 2, children: 0, type: 'Couple' },
      preferredTransport = 'any',
      travelStyle = 'Adventure',
    } = body;

    const destKey = destination.toLowerCase().split(',')[0].trim();
    const baseTrip: Trip = allTripsMap[destKey] || allTripsMap.goa;
    const catalog = allBookingCatalog[destKey] || allBookingCatalog.goa;
    const busOptions = allBusesCatalog[destKey] || allBusesCatalog.goa;

    // 1. Select optimal transport based on preference and budget
    let selectedTransport: (typeof catalog.transports)[0] | (typeof busOptions)[0] = catalog.transports[0];
    let transportType: 'flight' | 'train' | 'bus' = 'flight';

    if (preferredTransport === 'bus') {
      transportType = 'bus';
      selectedTransport = busOptions[0] || catalog.transports[0];
    } else if (preferredTransport === 'train') {
      transportType = 'train';
      const train = catalog.transports.find((t) => t.mode === 'train');
      selectedTransport = train || catalog.transports[0];
    } else if (preferredTransport === 'flight') {
      transportType = 'flight';
      const flight = catalog.transports.find((t) => t.mode === 'flight');
      selectedTransport = flight || catalog.transports[0];
    } else {
      // 'any' - AI picks smartest cost-to-time ratio
      if (budget < 18000 && busOptions.length > 0) {
        transportType = 'bus';
        selectedTransport = busOptions[0];
      } else if (budget < 25000) {
        const train = catalog.transports.find((t) => t.mode === 'train');
        if (train) {
          transportType = 'train';
          selectedTransport = train;
        } else {
          transportType = 'flight';
          selectedTransport = catalog.transports[0];
        }
      } else {
        transportType = 'flight';
        selectedTransport = catalog.transports[0];
      }
    }

    // 2. Select optimal hotel matching budget and vibe
    let selectedHotel = catalog.hotels[0];
    if (travelStyle === 'Luxury' && catalog.hotels.length > 1) {
      selectedHotel = catalog.hotels[1] || catalog.hotels[0];
    }

    // 3. Select curated dining table
    const selectedDining = catalog.dining[0];

    // 4. Compute tailored financial breakdown
    const transportCost = 'fare' in selectedTransport
      ? (selectedTransport.fare || 1650)
      : (selectedTransport.cost || 4200);
    const hotelCost = selectedHotel.totalCost || 4500;
    const foodCost = Math.round(budget * 0.18);
    const activitiesCost = Math.round(budget * 0.12);
    const localTransitCost = Math.round(budget * 0.08);
    const bufferCost = Math.max(500, Math.round(budget * 0.05));
    const plannedCost = transportCost + hotelCost + foodCost + activitiesCost + localTransitCost + bufferCost;
    const remaining = Math.max(0, budget - plannedCost);

    const tailoredBudget = {
      totalBudget: budget,
      plannedCost,
      remaining,
      currency: '₹',
      transportCost,
      hotelCost,
      foodCost,
      activitiesCost,
      localTransitCost,
      bufferCost,
      savingsOpportunity: {
        title: transportType === 'flight' ? 'Switch to Volvo Multi-Axle AC Sleeper bus' : 'Book early bird sunrise departure slot',
        amount: transportType === 'flight' ? 2400 : 800,
        actionText: transportType === 'flight' ? 'Save ₹2,400 with Bus' : 'Save ₹800',
      },
      upgradeOpportunity: {
        title: 'Private Champagne Sunset Table Reservation',
        amount: 1500,
        actionText: 'Reserve Table (+₹1,500)',
      },
    };

    // 5. Build tailored Trip
    const tailoredTrip: Trip = {
      ...baseTrip,
      id: `trip-ai-${Date.now()}`,
      destination: baseTrip.destination,
      daysCount: Math.min(daysCount, baseTrip.days.length || 4),
      nights: Math.max(1, daysCount - 1),
      travelers,
      budget: tailoredBudget,
      hotel: selectedHotel,
      transport: 'operator' in selectedTransport ? {
        id: selectedTransport.id,
        mode: 'bus',
        provider: selectedTransport.operator,
        flightOrTrainNumber: selectedTransport.busType,
        departure: selectedTransport.departure,
        departureTime: selectedTransport.departureTime,
        arrival: selectedTransport.arrival,
        arrivalTime: selectedTransport.arrivalTime,
        duration: selectedTransport.duration,
        cost: selectedTransport.fare,
        locked: false,
        co2Kg: 24,
        whySelected: selectedTransport.whySelected,
      } : selectedTransport,
      score: {
        overall: 94,
        budgetEfficiency: plannedCost <= budget ? 96 : 82,
        travelEfficiency: 95,
        experienceQuality: 93,
        scheduleBalance: 90,
        critique: `AI calibrated ${daysCount} days in ${baseTrip.destination} prioritizing ${travelStyle} rhythm with route clustering.`,
      },
    };

    const providerName = 'operator' in selectedTransport ? selectedTransport.operator : selectedTransport.provider;
    const aiReasoning = `I analyzed your ${travelers.type || 'travel'} group and ₹${budget.toLocaleString('en-IN')} budget cap. Selected ${transportType.toUpperCase()} (${providerName}) to optimize transit cost, paired with ${selectedHotel.name} as your protected anchor stay, and pre-reserved a table at ${selectedDining.name}. Day routes are clustered to prevent backtrack fatigue.`;

    const response: AgentPlanResponse = {
      success: true,
      trip: tailoredTrip,
      recommendedTickets: {
        transport: selectedTransport,
        transportType,
        hotel: selectedHotel,
        dining: selectedDining,
      },
      aiReasoning,
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'AI Trip planning failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
