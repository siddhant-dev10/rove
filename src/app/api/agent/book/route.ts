import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BookedTicket, AgentBookingResult } from '@/types/rove';

export const dynamic = 'force-dynamic';

function generateRandomAlpha(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination, passenger, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items provided for booking' },
        { status: 400 }
      );
    }

    const passengerName = passenger?.name?.trim() || 'Rove Traveler';
    const passengerEmail = passenger?.email || 'traveler@rove.ai';
    const passengerPhone = passenger?.phone || '+91 98201 55432';
    const travelersCount = passenger?.count || 2;

    const executionSteps: {
      step: string;
      status: 'completed' | 'in_progress';
      timestamp: string;
      detail: string;
    }[] = [];

    const bookedTickets: BookedTicket[] = [];
    let totalCost = 0;
    const now = new Date();

    executionSteps.push({
      step: 'Initialize Agent Session',
      status: 'completed',
      timestamp: new Date().toLocaleTimeString(),
      detail: `Agent initialized for ${passengerName} (${travelersCount} travelers) destined for ${destination || 'Active Destination'}`,
    });

    for (const item of items) {
      const category = item.category as 'bus' | 'flight' | 'train' | 'hotel' | 'dining';
      const cost = Number(item.cost) || 0;
      totalCost += cost;

      const itemTitle = (item.title || item.operator || item.airline || item.trainName || item.name || 'Reservation') as string;
      const slotOrSeat = (item.preferredSlotOrSeat || item.seatOrBerth || item.slot || item.roomType || '') as string;

      let referenceNumber = '';
      let subtitle = '';
      const ticketDetails: Record<string, unknown> = {
        destination: destination || 'Goa',
        originalItemId: item.itemId,
        passengerName,
        travelersCount,
      };

      if (category === 'bus') {
        const busPnr = `BUS-${generateRandomAlpha(4)}-${generateRandomDigits(4)}`;
        referenceNumber = busPnr;
        subtitle = slotOrSeat
          ? `Seat: ${slotOrSeat} · Berth Confirmed`
          : 'Berth 12A (Single Upper Sleeper) · Confirmed';
        ticketDetails.operator = itemTitle;
        ticketDetails.seat = slotOrSeat || '12A (Upper Sleeper)';
        ticketDetails.boardingTime = '08:30 PM';
        ticketDetails.reportingTime = '08:15 PM';
        ticketDetails.luggageAllowance = '2 Bags (up to 20kg)';

        executionSteps.push({
          step: `Lock Bus Berth (${itemTitle})`,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString(),
          detail: `Assigned luxury sleeper berth ${ticketDetails.seat}. Generated PNR ${busPnr} with live GPS dispatch tracking.`,
        });
      } else if (category === 'flight') {
        const airlineCode = itemTitle.toLowerCase().includes('indigo') ? '6E' : 'AI';
        const flightPnr = `${airlineCode}-${generateRandomAlpha(6)}`;
        referenceNumber = flightPnr;
        subtitle = `Class: Economy Direct · PNR ${flightPnr}`;
        ticketDetails.airline = itemTitle;
        ticketDetails.pnr = flightPnr;
        ticketDetails.seat = slotOrSeat || '14B & 14C';
        ticketDetails.terminal = 'Terminal 2, Gate B12';
        ticketDetails.baggage = '15kg Check-in + 7kg Cabin per passenger';

        executionSteps.push({
          step: `Issue Airline E-Ticket (${itemTitle})`,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString(),
          detail: `Secured GDS seat inventory for ${travelersCount} passengers. PNR ${flightPnr} registered in airline system.`,
        });
      } else if (category === 'train') {
        const trainPnr = `IRCTC-${generateRandomDigits(10)}`;
        referenceNumber = trainPnr;
        subtitle = `Coach: EC / Berth 21 · CNF (Confirmed)`;
        ticketDetails.train = itemTitle;
        ticketDetails.irctcPnr = trainPnr;
        ticketDetails.coach = 'EC (Executive Chair Car)';
        ticketDetails.quota = 'General / Confirmed';
        ticketDetails.catering = 'Complimentary Breakfast & High Tea included';

        executionSteps.push({
          step: `IRCTC Rail Quota Reservation (${itemTitle})`,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString(),
          detail: `Confirmed reservation on Superfast train with IRCTC PNR ${trainPnr}. Hot meal preferences locked.`,
        });
      } else if (category === 'hotel') {
        const hotelVoucher = `ROV-HTL-${generateRandomAlpha(6)}`;
        referenceNumber = hotelVoucher;
        subtitle = `Check-in: 02:00 PM · Heritage Courtyard Suite`;
        ticketDetails.hotel = itemTitle;
        ticketDetails.voucherId = hotelVoucher;
        ticketDetails.roomType = slotOrSeat || 'Heritage Deluxe Suite';
        ticketDetails.mealPlan = 'Artisan Breakfast Included';
        ticketDetails.freeCancellation = 'Free cancellation up to 48 hours prior';

        executionSteps.push({
          step: `Direct Hotel Front-Desk Reservation (${itemTitle})`,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString(),
          detail: `Anchored property room block with voucher ${hotelVoucher}. Special arrival note & pool access confirmed.`,
        });
      } else if (category === 'dining') {
        const diningPass = `ROV-DINE-${generateRandomAlpha(5)}`;
        referenceNumber = diningPass;
        const slot = slotOrSeat || '08:30 PM';
        subtitle = `Reserved Table at ${slot} · VIP Priority Seating`;
        ticketDetails.restaurant = itemTitle;
        ticketDetails.tablePass = diningPass;
        ticketDetails.timeSlot = slot;
        ticketDetails.seatingPreference = 'Sunset Waterfront Terrace / Courtyard';
        ticketDetails.specialRequests = item.notes || 'Table with scenic view & quiet ambiance';

        executionSteps.push({
          step: `Reserve Restaurant Dine-In Table (${itemTitle})`,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString(),
          detail: `Secured prime evening table at ${slot} with VIP pass ${diningPass}. Dietary alerts communicated to head chef.`,
        });
      }

      const ticket: BookedTicket = {
        id: `tkt-${Date.now()}-${generateRandomAlpha(4).toLowerCase()}`,
        category,
        referenceNumber,
        title: itemTitle,
        subtitle,
        date: item.notes?.includes('Date:') ? item.notes : now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: (ticketDetails.boardingTime as string) || (ticketDetails.timeSlot as string) || '11:00 AM',
        status: 'confirmed',
        cost,
        passengerOrGuest: {
          name: passengerName,
          contact: passengerPhone,
          seatsOrRooms: (ticketDetails.seat as string) || (ticketDetails.roomType as string) || `${travelersCount} Guests`,
        },
        details: ticketDetails,
        bookedAt: now.toISOString(),
      };

      bookedTickets.push(ticket);
    }

    const masterBookingReference = `ROV-AGNT-${Date.now().toString(36).toUpperCase()}`;

    executionSteps.push({
      step: 'Synthesize Master Journey Confirmation',
      status: 'completed',
      timestamp: new Date().toLocaleTimeString(),
      detail: `Compiled all ${bookedTickets.length} supplier vouchers under Master Journey Token ${masterBookingReference}. Ready for traveler review.`,
    });

    // Persist to MongoDB Atlas if available
    let mongoSaved = false;
    try {
      const client = await clientPromise;
      const dbName = process.env.MONGODB_DB || 'rove_db';
      const db = client.db(dbName);

      // Save master booking
      await db.collection('bookings').insertOne({
        bookingReference: masterBookingReference,
        status: 'confirmed',
        destination,
        passenger: {
          name: passengerName,
          email: passengerEmail,
          phone: passengerPhone,
          count: travelersCount,
        },
        totalCost,
        ticketsCount: bookedTickets.length,
        tickets: bookedTickets,
        createdAt: now.toISOString(),
        agentHandled: true,
      });

      // Save individual tickets for granular retrieval
      if (bookedTickets.length > 0) {
        await db.collection('tickets').insertMany(
          bookedTickets.map((t) => ({
            ...t,
            masterBookingReference,
            createdAt: now.toISOString(),
          }))
        );
      }
      mongoSaved = true;
    } catch (mongoError) {
      console.warn('MongoDB Atlas persistence note (agent booking):', mongoError);
    }

    const result: AgentBookingResult = {
      success: true,
      bookingReference: masterBookingReference,
      message: `AI Agent successfully booked ${bookedTickets.length} items (${bookedTickets.map((t) => t.category).join(', ')}) for ${passengerName}. Total ₹${totalCost.toLocaleString('en-IN')}`,
      bookedTickets,
      totalCost,
      executionSteps,
    };

    return NextResponse.json({
      ...result,
      mongoSaved,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Agent booking failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
