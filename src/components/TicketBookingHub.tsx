'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  BookingBusOption,
  AgentBookingResult,
  AgentPlanResponse,
} from '@/types/rove';
import { allBusesCatalog } from '@/data/busCatalog';
import confetti from 'canvas-confetti';
import {
  Plane,
  Train,
  Bus,
  Hotel,
  Utensils,
  Ticket,
  Sparkles,
  CheckCircle2,
  X,
  Search,
  MapPin,
  Download,
  Leaf,
  Zap,
  Loader2,
} from 'lucide-react';

type HubCategoryTab = 'buses' | 'flights' | 'trains' | 'hotels' | 'dining' | 'tickets';

interface BookingModalItem {
  id: string;
  title: string;
  cost: number;
}

export const TicketBookingHub: React.FC = () => {
  const {
    isTicketHubOpen,
    setIsTicketHubOpen,
    trip,
    activeTripId,
    switchTrip,
    availableTrips,
    bookingCatalog,
    bookedTickets,
    addBookedTickets,
    setTrip,
  } = useRove();

  const [activeTab, setActiveTab] = useState<HubCategoryTab>('buses');
  const [searchQuery, setSearchQuery] = useState('');
  const [passengerName, setPassengerName] = useState('Siddhant Sharma');
  const [passengerEmail, setPassengerEmail] = useState('siddhant@rove.ai');
  const [passengerPhone, setPassengerPhone] = useState('+91 98201 55432');

  // Single Item Booking Modal State
  const [singleBookingItem, setSingleBookingItem] = useState<{
    category: 'bus' | 'flight' | 'train' | 'hotel' | 'dining';
    item: BookingModalItem;
    selectedSlotOrSeat: string;
  } | null>(null);

  // Agent Booking Progress State
  const [isAgentBooking, setIsAgentBooking] = useState(false);
  const [agentResult, setAgentResult] = useState<AgentBookingResult | null>(null);

  // AI Plan Engine State
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [aiPlanning, setAiPlanning] = useState(false);
  const [aiPlanResult, setAiPlanResult] = useState<AgentPlanResponse | null>(null);
  const [planForm, setPlanForm] = useState({
    destination: trip.destination.split(',')[0],
    daysCount: 4,
    budget: 20000,
    preferredTransport: 'any' as 'any' | 'flight' | 'train' | 'bus',
    travelStyle: 'Adventure' as 'Adventure' | 'Luxury' | 'Cultural' | 'Relaxed' | 'Food',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('studio') === 'open' || window.location.hash === '#studio') {
        setIsTicketHubOpen(true);
        const tab = params.get('tab') as HubCategoryTab;
        if (tab && ['buses', 'flights', 'trains', 'hotels', 'dining', 'tickets'].includes(tab)) {
          setActiveTab(tab);
        }
        if (params.get('plan') === 'true') {
          setIsAiPlannerOpen(true);
        }
      }
    }
  }, [setIsTicketHubOpen]);

  const destKey = activeTripId.toLowerCase();
  const currentBuses: BookingBusOption[] = allBusesCatalog[destKey] || allBusesCatalog.goa;
  const currentFlights = useMemo(() => bookingCatalog.transports.filter((t) => t.mode === 'flight'), [bookingCatalog]);
  const currentTrains = useMemo(() => bookingCatalog.transports.filter((t) => t.mode === 'train'), [bookingCatalog]);
  const currentHotels = bookingCatalog.hotels;
  const currentDining = bookingCatalog.dining;

  if (!isTicketHubOpen) return null;

  // Trigger Autonomous Auto-Book for Entire Trip
  const handleAutoBookEntireTrip = async () => {
    setIsAgentBooking(true);
    setAgentResult(null);

    try {
      // Pick best transport (Volvo bus or flight)
      const selectedBus = currentBuses[0];
      const selectedHotel = currentHotels[0];
      const selectedDinner = currentDining[0];
      const selectedFlight = currentFlights[0];

      // Formulate items bundle
      const itemsToBook: {
        category: 'bus' | 'flight' | 'train' | 'hotel' | 'dining';
        itemId: string;
        title: string;
        cost: number;
        preferredSlotOrSeat?: string;
        notes?: string;
      }[] = [
        {
          category: 'bus',
          itemId: selectedBus.id,
          title: `${selectedBus.operator} (${selectedBus.busType})`,
          cost: selectedBus.fare,
          preferredSlotOrSeat: 'Berth 12A (Single Upper Sleeper)',
          notes: `Departure: ${selectedBus.departureTime} from ${selectedBus.departure}`,
        },
        {
          category: 'hotel' as const,
          itemId: selectedHotel.id,
          title: selectedHotel.name,
          cost: selectedHotel.totalCost,
          preferredSlotOrSeat: selectedHotel.roomType || 'Heritage Courtyard Suite',
          notes: `${selectedHotel.nights} Nights at ${selectedHotel.location}`,
        },
        {
          category: 'dining' as const,
          itemId: selectedDinner.id,
          title: selectedDinner.name,
          cost: selectedDinner.costForTwo,
          preferredSlotOrSeat: '08:30 PM (Waterfront Sunset Deck)',
          notes: `Specialty: ${selectedDinner.specialty}`,
        },
      ];

      // If flight is available, also register flight option
      if (selectedFlight) {
        itemsToBook.push({
          category: 'flight' as const,
          itemId: selectedFlight.id,
          title: `${selectedFlight.provider} (${selectedFlight.flightOrTrainNumber})`,
          cost: selectedFlight.cost,
          preferredSlotOrSeat: '14B & 14C (Window & Aisle)',
          notes: `${selectedFlight.departure} ➔ ${selectedFlight.arrival}`,
        });
      }

      const res = await fetch('/api/agent/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'book_entire_trip',
          destination: trip.destination,
          passenger: {
            name: passengerName,
            email: passengerEmail,
            phone: passengerPhone,
            count: trip.travelers.adults + trip.travelers.children,
          },
          items: itemsToBook,
        }),
      });

      const data: AgentBookingResult = await res.json();

      if (data.success) {
        setAgentResult(data);
        addBookedTickets(data.bookedTickets);
        setActiveTab('tickets');

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.55 },
          });
        } catch {
          // fallback
        }
      }
    } catch (err) {
      console.error('Agent booking failed:', err);
    } finally {
      setIsAgentBooking(false);
    }
  };

  // Single Item Booking Submission
  const handleConfirmSingleBooking = async () => {
    if (!singleBookingItem) return;
    setIsAgentBooking(true);

    try {
      const { category, item, selectedSlotOrSeat } = singleBookingItem;
      const res = await fetch('/api/agent/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'book_single',
          destination: trip.destination,
          passenger: {
            name: passengerName,
            email: passengerEmail,
            phone: passengerPhone,
            count: 2,
          },
          items: [
            {
              category,
              itemId: item.id,
              title: item.title,
              cost: item.cost,
              preferredSlotOrSeat: selectedSlotOrSeat,
              notes: `Direct reservation via Rove AI Agent for ${trip.destination}`,
            },
          ],
        }),
      });

      const data: AgentBookingResult = await res.json();
      if (data.success) {
        setAgentResult(data);
        addBookedTickets(data.bookedTickets);
        setSingleBookingItem(null);
        setActiveTab('tickets');

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error('Failed single booking:', err);
    } finally {
      setIsAgentBooking(false);
    }
  };

  // Run "Plan Everything via AI"
  const handleRunAiPlan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAiPlanning(true);
    setAiPlanResult(null);

    try {
      const res = await fetch('/api/agent/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: planForm.destination,
          daysCount: Number(planForm.daysCount),
          budget: Number(planForm.budget),
          travelers: trip.travelers,
          preferredTransport: planForm.preferredTransport,
          travelStyle: planForm.travelStyle,
        }),
      });

      const data: AgentPlanResponse = await res.json();
      if (data.success) {
        setAiPlanResult(data);
        setTrip(data.trip);
      }
    } catch (err) {
      console.error('AI Plan generation failed:', err);
    } finally {
      setAiPlanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 p-2 sm:p-4 md:p-6 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-6xl rounded-3xl border border-stone-200 bg-[#FAF9F5] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-stone-900 animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 px-5 sm:px-7 py-4 bg-white/90 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-amber-300 shadow-md">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 tracking-tight">
                  Ticket Booking Studio & AI Agent
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Agent Booking Ready
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Book Buses, Flights, Trains, Hotels, and Restaurant Dine-ins directly or let AI auto-book the entire itinerary.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Quick Destination Switcher */}
            <select
              value={activeTripId}
              onChange={(e) => switchTrip(e.target.value)}
              className="text-xs font-semibold bg-stone-100 border border-stone-300 text-stone-800 rounded-full px-3 py-1.5 hover:bg-stone-200 transition cursor-pointer"
            >
              {availableTrips.map((t) => (
                <option key={t.id} value={t.id}>
                  📍 {t.name}
                </option>
              ))}
            </select>

            {/* AI Travel Planner Trigger Button */}
            <button
              onClick={() => setIsAiPlannerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-700/10 hover:bg-amber-700/20 text-amber-900 border border-amber-300 px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 text-amber-700" />
              <span>Plan via AI</span>
            </button>

            {/* Master Auto-Book Button */}
            <button
              onClick={handleAutoBookEntireTrip}
              disabled={isAgentBooking}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 text-white px-4 py-1.5 text-xs font-semibold hover:bg-stone-800 transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isAgentBooking ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Agent Booking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>Auto-Book Entire Trip</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsTicketHubOpen(false)}
              className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition cursor-pointer"
              aria-label="Close booking studio"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION BAR */}
        <div className="px-5 sm:px-7 pt-3 pb-2 bg-stone-50/90 border-b border-stone-200 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('buses')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'buses'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Bus className="h-3.5 w-3.5 text-amber-400" />
              <span>Bus Tickets</span>
              <span className="text-[10px] font-mono opacity-80">({currentBuses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Plane className="h-3.5 w-3.5 text-sky-400" />
              <span>Flight Tickets</span>
              <span className="text-[10px] font-mono opacity-80">({currentFlights.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('trains')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'trains'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Train className="h-3.5 w-3.5 text-emerald-400" />
              <span>Train Tickets</span>
              <span className="text-[10px] font-mono opacity-80">({currentTrains.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'hotels'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Hotel className="h-3.5 w-3.5 text-rose-400" />
              <span>Hotel Bookings</span>
              <span className="text-[10px] font-mono opacity-80">({currentHotels.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'dining'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Utensils className="h-3.5 w-3.5 text-amber-500" />
              <span>Restaurant Dine-Ins</span>
              <span className="text-[10px] font-mono opacity-80">({currentDining.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'tickets'
                  ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>My Confirmed Tickets</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-950 font-mono">
                {bookedTickets.length}
              </span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] hidden md:block">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by operator, train, stay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full bg-white border border-stone-200 focus:outline-none focus:border-stone-400"
            />
          </div>
        </div>

        {/* MAIN SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">

          {/* AGENT SUCCESS NOTIFICATION */}
          {agentResult && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-semibold">{agentResult.message}</strong>
                  <span className="text-[11px] text-emerald-700">All tickets have been synchronized with the Ticket Studio and MongoDB.</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold bg-white px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto shrink-0">
                Master Ref: {agentResult.bookingReference}
              </span>
            </div>
          )}

          {/* 1. BUSES TAB */}
          {activeTab === 'buses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Bus className="h-4 w-4 text-amber-600" /> Luxury Intercity Sleeper Buses
                  </h3>
                  <p className="text-xs text-stone-500">
                    High-comfort Volvo 9600 Multi-Axle and Electric AC sleepers with real-time GPS tracking and pre-selected berths.
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">Showing {currentBuses.length} routes</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {bus.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-1.5">
                              ★ {bus.badge}
                            </span>
                          )}
                          <h4 className="text-base font-serif font-bold text-stone-900">{bus.operator}</h4>
                          <p className="text-xs text-stone-600 font-medium">{bus.busType}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-stone-900">₹{bus.fare.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-stone-400">per sleeper berth</span>
                        </div>
                      </div>

                      {/* Route timings */}
                      <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs">
                        <div>
                          <strong className="block text-stone-900 font-semibold">{bus.departureTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[140px] block">{bus.departure}</span>
                        </div>
                        <div className="text-center px-2">
                          <span className="text-[10px] font-mono text-stone-500 block">{bus.duration}</span>
                          <span className="text-stone-300">─────►</span>
                        </div>
                        <div className="text-right">
                          <strong className="block text-stone-900 font-semibold">{bus.arrivalTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[140px] block">{bus.arrival}</span>
                        </div>
                      </div>

                      {/* Seat & Amenities */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {bus.seatType} · {bus.availableSeats} Berths left
                        </span>
                        <span className="text-stone-500 text-[11px]">Rating: ★ {bus.rating} ({bus.reviewCount})</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {bus.amenities.slice(0, 4).map((amenity, idx) => (
                          <span key={idx} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-stone-500 italic max-w-[240px] truncate">
                        {bus.whySelected}
                      </span>
                      <button
                        onClick={() =>
                          setSingleBookingItem({
                            category: 'bus',
                            item: {
                              id: bus.id,
                              title: `${bus.operator} (${bus.busType})`,
                              cost: bus.fare,
                            },
                            selectedSlotOrSeat: 'Berth 14A (Single Upper Sleeper)',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        <Bus className="h-3.5 w-3.5 text-amber-300" />
                        <span>Book Bus Berth</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Plane className="h-4 w-4 text-sky-600" /> Scheduled Commercial Flights
                  </h3>
                  <p className="text-xs text-stone-500">
                    Non-stop flights with confirmed airline PNR, included 15kg baggage and priority boarding slots.
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">Showing {currentFlights.length} options</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:border-sky-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {flight.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 mb-1.5">
                              {flight.badge}
                            </span>
                          )}
                          <h4 className="text-base font-serif font-bold text-stone-900">{flight.provider}</h4>
                          <p className="text-xs text-stone-600 font-mono">{flight.flightOrTrainNumber} · {flight.classType}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-stone-900">₹{flight.cost.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-stone-400">Total flight fare</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs">
                        <div>
                          <strong className="block text-stone-900 font-semibold">{flight.departureTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[130px] block">{flight.departure}</span>
                        </div>
                        <div className="text-center px-2">
                          <span className="text-[10px] font-mono text-stone-500 block">{flight.duration}</span>
                          <span className="text-stone-300">─────✈─────►</span>
                        </div>
                        <div className="text-right">
                          <strong className="block text-stone-900 font-semibold">{flight.arrivalTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[130px] block">{flight.arrival}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-[11px] text-stone-600">
                          <Leaf className="h-3 w-3 text-emerald-600" /> {flight.co2Kg} kg CO₂ footprint
                        </span>
                        <span className="text-[11px] font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                          Non-Stop Direct
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-stone-500 italic max-w-[240px] truncate">
                        {flight.whySelected}
                      </span>
                      <button
                        onClick={() =>
                          setSingleBookingItem({
                            category: 'flight',
                            item: {
                              id: flight.id,
                              title: `${flight.provider} (${flight.flightOrTrainNumber})`,
                              cost: flight.cost,
                            },
                            selectedSlotOrSeat: '14B & 14C (Economy Direct)',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        <Plane className="h-3.5 w-3.5 text-sky-300" />
                        <span>Book Flight</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. TRAINS TAB */}
          {activeTab === 'trains' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Train className="h-4 w-4 text-emerald-600" /> Superfast Rail & Vande Bharat Express
                  </h3>
                  <p className="text-xs text-stone-500">
                    Semi-high speed scenic rail journeys with 180° swivel seats, hot gourmet breakfast, and 77% lower carbon footprint.
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">Showing {currentTrains.length} trains</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTrains.map((train) => (
                  <div
                    key={train.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {train.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
                              {train.badge}
                            </span>
                          )}
                          <h4 className="text-base font-serif font-bold text-stone-900">{train.provider}</h4>
                          <p className="text-xs text-stone-600 font-mono">{train.flightOrTrainNumber} · {train.classType}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-stone-900">₹{train.cost.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-stone-400">per ticket</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs">
                        <div>
                          <strong className="block text-stone-900 font-semibold">{train.departureTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[130px] block">{train.departure}</span>
                        </div>
                        <div className="text-center px-2">
                          <span className="text-[10px] font-mono text-stone-500 block">{train.duration}</span>
                          <span className="text-stone-300">─────🚆─────►</span>
                        </div>
                        <div className="text-right">
                          <strong className="block text-stone-900 font-semibold">{train.arrivalTime}</strong>
                          <span className="text-stone-500 text-[11px] truncate max-w-[130px] block">{train.arrival}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <Leaf className="h-3 w-3" /> 77% Less Emissions ({train.co2Kg} kg CO₂)
                        </span>
                        <span className="text-[11px] font-medium text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                          Meals Included
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-stone-500 italic max-w-[240px] truncate">
                        {train.whySelected}
                      </span>
                      <button
                        onClick={() =>
                          setSingleBookingItem({
                            category: 'train',
                            item: {
                              id: train.id,
                              title: `${train.provider} (${train.flightOrTrainNumber})`,
                              cost: train.cost,
                            },
                            selectedSlotOrSeat: 'Executive Chair Car (Coach EC / Seat 21)',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        <Train className="h-3.5 w-3.5 text-emerald-300" />
                        <span>Book Train Ticket</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. HOTELS TAB */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Hotel className="h-4 w-4 text-rose-600" /> Protected Boutique Stays & Heritage Villas
                  </h3>
                  <p className="text-xs text-stone-500">
                    Curated properties serving as your trip anchors; guaranteed rooms with zero surprise cancellations.
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">Showing {currentHotels.length} properties</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:border-rose-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 border border-stone-200">
                        <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                        <span className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          ★ {hotel.rating} Rating
                        </span>
                        {hotel.badge && (
                          <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            {hotel.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-serif font-bold text-stone-900">{hotel.name}</h4>
                          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-stone-400" /> {hotel.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-stone-900">₹{hotel.totalCost.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-stone-400">{hotel.nights} Nights Total</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                        {hotel.whySelected}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {hotel.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md">
                        {hotel.roomType || 'Boutique Heritage Suite'}
                      </span>
                      <button
                        onClick={() =>
                          setSingleBookingItem({
                            category: 'hotel',
                            item: {
                              id: hotel.id,
                              title: hotel.name,
                              cost: hotel.totalCost,
                            },
                            selectedSlotOrSeat: hotel.roomType || 'Heritage Courtyard Suite',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        <Hotel className="h-3.5 w-3.5 text-rose-300" />
                        <span>Reserve Stay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. DINING TAB */}
          {activeTab === 'dining' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-amber-600" /> Curated Restaurant Dine-Ins & Reserved Tables
                  </h3>
                  <p className="text-xs text-stone-500">
                    Reserve prime evening tables with VIP priority pass, sunset terrace views, and customized dietary arrangements.
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">Showing {currentDining.length} dining rooms</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDining.map((dine) => (
                  <div
                    key={dine.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {dine.photos?.[0] && (
                        <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 border border-stone-200">
                          <img src={dine.photos[0].url} alt={dine.name} className="h-full w-full object-cover" />
                          <span className="absolute top-2.5 left-2.5 bg-stone-900/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            ★ {dine.rating} ({dine.reviewCount} reviews)
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {dine.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                              {dine.badge}
                            </span>
                          )}
                          <h4 className="text-base font-serif font-bold text-stone-900">{dine.name}</h4>
                          <p className="text-xs text-stone-500">{dine.cuisine} · {dine.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-stone-900">₹{dine.costForTwo.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-stone-400">cost for two</span>
                        </div>
                      </div>

                      <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-stone-800">
                        <strong className="text-amber-950 font-semibold block text-[11px]">Chef Specialty:</strong>
                        <span>{dine.specialty}</span>
                      </div>

                      {/* Selectable Dinner Time Slots */}
                      <div className="mt-3">
                        <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                          Available Evening Slots
                        </label>
                        <div className="flex items-center gap-2">
                          {['07:30 PM', '08:30 PM', '09:45 PM'].map((slot, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200"
                            >
                              🕒 {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-stone-500 italic max-w-[220px] truncate">
                        {dine.whySelected}
                      </span>
                      <button
                        onClick={() =>
                          setSingleBookingItem({
                            category: 'dining',
                            item: {
                              id: dine.id,
                              title: dine.name,
                              cost: dine.costForTwo,
                            },
                            selectedSlotOrSeat: '08:30 PM (Sunset Waterfront Terrace Table)',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
                      >
                        <Utensils className="h-3.5 w-3.5 text-amber-300" />
                        <span>Reserve Table</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. CONFIRMED TICKETS TAB */}
          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-emerald-600" /> Verified Tickets & Boarding Passes ({bookedTickets.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Live tickets generated by Rove AI Agent. Synchronized with airline, rail, bus operators and hotel desks.
                  </p>
                </div>
              </div>

              {bookedTickets.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-800">No Tickets Booked Yet</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Select a Bus, Flight, Train, Hotel, or Dining slot to book, or click &quot;Auto-Book Entire Trip&quot; to have the AI Agent book everything.
                  </p>
                  <button
                    onClick={handleAutoBookEntireTrip}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition shadow-sm cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Run AI Agent Auto-Book</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookedTickets.map((tkt) => {
                    const isBus = tkt.category === 'bus';
                    const isFlight = tkt.category === 'flight';
                    const isTrain = tkt.category === 'train';
                    const isHotel = tkt.category === 'hotel';

                    return (
                      <div
                        key={tkt.id}
                        className="rounded-2xl border border-emerald-300/80 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ✓ {tkt.status}
                            </span>
                            <span className="text-xs font-mono font-bold bg-stone-100 px-2.5 py-0.5 rounded text-stone-800 border border-stone-200">
                              PNR / PASS: {tkt.referenceNumber}
                            </span>
                            <span className="text-[11px] text-stone-400 font-mono">
                              Booked {new Date(tkt.bookedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <h4 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                            {isBus && <Bus className="h-4 w-4 text-amber-600" />}
                            {isFlight && <Plane className="h-4 w-4 text-sky-600" />}
                            {isTrain && <Train className="h-4 w-4 text-emerald-600" />}
                            {isHotel && <Hotel className="h-4 w-4 text-rose-600" />}
                            {!isBus && !isFlight && !isTrain && !isHotel && <Utensils className="h-4 w-4 text-amber-600" />}
                            <span>{tkt.title}</span>
                          </h4>

                          <p className="text-xs text-stone-600 font-medium">
                            {tkt.subtitle}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-1">
                            <span>👤 Passenger/Guest: <strong className="text-stone-800">{tkt.passengerOrGuest.name}</strong></span>
                            <span>🎫 Allocation: <strong className="text-stone-800">{tkt.passengerOrGuest.seatsOrRooms}</strong></span>
                            <span>💰 Fare: <strong className="text-stone-900">₹{tkt.cost.toLocaleString('en-IN')}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                          <button
                            onClick={() => alert(`Downloaded verified voucher PDF for ${tkt.referenceNumber} (${tkt.title})`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* BOTTOM SUMMARY FOOTER */}
        <div className="border-t border-stone-200/90 px-6 py-3.5 bg-white/80 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-stone-600 flex-wrap">
            <span>Destination: <strong className="text-stone-900">{trip.destination}</strong></span>
            <span>Total Budget: <strong className="text-stone-900">₹{trip.budget.totalBudget.toLocaleString('en-IN')}</strong></span>
            <span>Confirmed Tickets: <strong className="text-emerald-700 font-bold">{bookedTickets.length}</strong></span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('tickets')}
              className="text-stone-700 hover:text-stone-950 font-semibold underline underline-offset-2 cursor-pointer"
            >
              View All {bookedTickets.length} Tickets
            </button>
            <button
              onClick={() => setIsTicketHubOpen(false)}
              className="rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </div>

      </div>

      {/* SINGLE ITEM BOOKING MODAL */}
      {singleBookingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Confirm Reservation via AI Agent
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                  {singleBookingItem.item.title}
                </h3>
              </div>
              <button
                onClick={() => setSingleBookingItem(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-500 font-semibold mb-1">Lead Passenger / Guest Name</label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Email</label>
                  <input
                    type="text"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-500 font-semibold mb-1">Berth / Room / Seat Selection</label>
                <input
                  type="text"
                  value={singleBookingItem.selectedSlotOrSeat}
                  onChange={(e) =>
                    setSingleBookingItem({ ...singleBookingItem, selectedSlotOrSeat: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-between text-xs font-semibold text-stone-900">
                <span>Total Amount:</span>
                <span className="font-serif text-base text-amber-950 font-bold">
                  ₹{singleBookingItem.item.cost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setSingleBookingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSingleBooking}
                disabled={isAgentBooking}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
              >
                {isAgentBooking ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLAN EVERYTHING VIA AI MODAL */}
      {isAiPlannerOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">Plan Everything via AI</h3>
                  <p className="text-xs text-stone-500">
                    AI synthesizes optimal transit, stays, dining and budget allocation from scratch.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAiPlannerOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRunAiPlan} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Destination</label>
                <input
                  type="text"
                  value={planForm.destination}
                  onChange={(e) => setPlanForm({ ...planForm, destination: e.target.value })}
                  placeholder="e.g. Goa, Manali, Jaipur, Kerala, Udaipur..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Number of Days</label>
                  <input
                    type="number"
                    min={2}
                    max={10}
                    value={planForm.daysCount}
                    onChange={(e) => setPlanForm({ ...planForm, daysCount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Total Budget (₹)</label>
                  <input
                    type="number"
                    step={1000}
                    value={planForm.budget}
                    onChange={(e) => setPlanForm({ ...planForm, budget: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Preferred Transport</label>
                  <select
                    value={planForm.preferredTransport}
                    onChange={(e) => setPlanForm({ ...planForm, preferredTransport: e.target.value as 'any' | 'flight' | 'train' | 'bus' })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  >
                    <option value="any">AI Smart Pick (Best Value)</option>
                    <option value="bus">🚌 Volvo AC Sleeper Bus</option>
                    <option value="train">🚆 Vande Bharat / Superfast Rail</option>
                    <option value="flight">✈️ Scheduled Commercial Flight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Travel Style</label>
                  <select
                    value={planForm.travelStyle}
                    onChange={(e) => setPlanForm({ ...planForm, travelStyle: e.target.value as 'Adventure' | 'Luxury' | 'Cultural' | 'Relaxed' | 'Food' })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-900"
                  >
                    <option value="Adventure">Adventure & Exploration</option>
                    <option value="Luxury">Luxury & Rest</option>
                    <option value="Cultural">Cultural & Heritage</option>
                    <option value="Relaxed">Calm & Unhurried</option>
                    <option value="Food">Culinary & Dining</option>
                  </select>
                </div>
              </div>

              {aiPlanResult && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                  <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Plan Generated & Synced to Dashboard
                  </span>
                  <p className="text-emerald-800 leading-relaxed">{aiPlanResult.aiReasoning}</p>
                  <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] font-medium text-emerald-900">
                    <span>Transport: {aiPlanResult.recommendedTickets.transportType.toUpperCase()}</span>
                    <span>Stay: {aiPlanResult.recommendedTickets.hotel.name.slice(0, 20)}...</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAiPlannerOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={aiPlanning}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                >
                  {aiPlanning ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Synthesizing Plan...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>Generate Itinerary & Tickets</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
