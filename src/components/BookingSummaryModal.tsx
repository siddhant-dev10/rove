'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRove } from '@/context/RoveContext';
import { BookingPhoto } from '@/types/rove';
import confetti from 'canvas-confetti';
import {
  Plane,
  Train,
  Car,
  Hotel,
  Utensils,
  Ticket,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Download,
  Edit3,
  Eye,
  Sparkles,
  Check,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

type BookingCategoryTab = 'overview' | 'stays' | 'transit' | 'dining' | 'mobility';

export const BookingSummaryModal: React.FC = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    trip,
    bookingCatalog,
    selectedHotelOption,
    selectedTransportOption,
    selectedDiningOption,
    selectedTransitOption,
    selectHotelOption,
    selectTransportOption,
    selectDiningOption,
    selectLocalTransitOption,
    updateCustomPrice,
    earnCredits,
  } = useRove();

  const [activeTab, setActiveTab] = useState<BookingCategoryTab>('overview');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Photo Lightbox modal state
  const [previewPhoto, setPreviewPhoto] = useState<BookingPhoto | null>(null);

  // Price Edit modal state
  const [priceEditModal, setPriceEditModal] = useState<{
    category: 'hotel' | 'transport' | 'dining' | 'transit';
    title: string;
    currentPrice: number;
  } | null>(null);
  const [customPriceInput, setCustomPriceInput] = useState<string>('');

  const handleClose = useCallback(() => {
    setIsBookingOpen(false);
    setIsConfirmed(false);
    setPreviewPhoto(null);
    setPriceEditModal(null);
  }, [setIsBookingOpen]);

  useEffect(() => {
    if (!isBookingOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingOpen, handleClose]);

  if (!isBookingOpen) return null;

  const handleConfirm = () => {
    setIsConfirmed(true);
    earnCredits(300, `Completed Entire Trip Reservation for ${trip.destination}`);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas not supported
    }
  };

  const openPriceEdit = (category: 'hotel' | 'transport' | 'dining' | 'transit', title: string, price: number) => {
    setPriceEditModal({ category, title, currentPrice: price });
    setCustomPriceInput(price.toString());
  };

  const handleSaveCustomPrice = () => {
    if (!priceEditModal) return;
    const num = parseFloat(customPriceInput);
    if (!isNaN(num) && num >= 0) {
      updateCustomPrice(priceEditModal.category, num);
    }
    setPriceEditModal(null);
  };

  const isTrainSelected = trip.transport.mode === 'train';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-3 sm:p-5 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-4xl rounded-3xl border border-stone-200 bg-[#FAF9F5] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-200/90 px-6 py-4 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-amber-300 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-medium text-stone-900 tracking-tight">
                  {isConfirmed ? 'Journey Confirmed' : `Custom Booking Studio · ${trip.destination.split(',')[0]}`}
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  {trip.nights} Nights · {trip.travelers.adults} Travelers
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                {isConfirmed
                  ? 'All services locked with direct airline, rail and boutique hotel desks'
                  : 'Compare curated options, inspect photo cabins & suites, customize prices & reserve'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Category Tabs (if not confirmed yet) */}
        {!isConfirmed && (
          <div className="px-6 pt-3 pb-2 bg-stone-50/80 border-b border-stone-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Checkout Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('stays')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'stays'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Hotel className="h-3.5 w-3.5" />
              <span>Stays & Villas</span>
              <span className="text-[10px] opacity-75 font-mono">({bookingCatalog.hotels.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('transit')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'transit'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Plane className="h-3.5 w-3.5" />
              <Train className="h-3.5 w-3.5 -ml-0.5" />
              <span>Flights & Trains</span>
              <span className="text-[10px] opacity-75 font-mono">({bookingCatalog.transports.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'dining'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" />
              <span>Curated Dining</span>
              <span className="text-[10px] opacity-75 font-mono">({bookingCatalog.dining.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('mobility')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'mobility'
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Local Mobility</span>
              <span className="text-[10px] opacity-75 font-mono">({bookingCatalog.localTransit.length})</span>
            </button>
          </div>
        )}

        {/* Modal Main Body */}
        {isConfirmed ? (
          /* CONFIRMED SCREEN */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-center font-sans">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Reservation Confirmed & Guaranteed
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 pt-1">
                {trip.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                All bookings are locked across suppliers. You earned <strong className="text-amber-800 font-semibold">+300 Rove Loyalty Credits</strong> in your wallet.
              </p>
            </div>

            {/* Voucher References Grid */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-left divide-y divide-stone-100 text-xs shadow-sm max-w-xl mx-auto">
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  {isTrainSelected ? <Train className="h-4 w-4 text-stone-700" /> : <Plane className="h-4 w-4 text-stone-700" />}
                  <span className="text-stone-500 font-medium">
                    {isTrainSelected ? 'Train Ticket (Vande Bharat / IRCTC):' : 'Flight E-Ticket (Airline PNR):'}
                  </span>
                </div>
                <strong className="text-stone-900 font-mono text-sm bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  {isTrainSelected ? 'PNR-84920491' : '6E-PNR-90284'}
                </strong>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  <Hotel className="h-4 w-4 text-stone-700" />
                  <span className="text-stone-500 font-medium">Boutique Stay ({trip.hotel.name.slice(0, 24)}...):</span>
                </div>
                <strong className="text-stone-900 font-mono text-sm bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  #ROV-HTL-{trip.hotel.id.toUpperCase()}
                </strong>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-stone-700" />
                  <span className="text-stone-500 font-medium">Curated Dining Priority Pass:</span>
                </div>
                <strong className="text-stone-900 font-mono text-sm bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  #ROV-DINE-VIP-RESERVED
                </strong>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-stone-700" />
                  <span className="text-stone-500 font-medium">Zero-Surge EV Airport Transfer:</span>
                </div>
                <strong className="text-stone-900 font-mono text-sm bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                  #ROV-EV-DISPATCH-OK
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert(`Downloaded offline PDF boarding pass & hotel confirmation voucher for ${trip.destination}.`)}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition shadow-sm cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Vouchers (PDF)</span>
              </button>

              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition shadow-sm cursor-pointer"
              >
                <span>Return to Itinerary Map</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE BROWSING BODY */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Visual Highlights Grid */}
                <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm divide-y divide-stone-100">
                  
                  {/* Hotel Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-18 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={trip.hotel.image}
                          alt={trip.hotel.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => setPreviewPhoto({ url: trip.hotel.image, caption: trip.hotel.name, tag: 'Stay' })}
                          className="absolute inset-0 bg-stone-950/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition"
                          title="Preview full photo"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200">
                            Stays · {trip.hotel.nights} Nights
                          </span>
                          <span className="text-xs font-mono text-stone-500">★ {trip.hotel.rating}</span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-sm">{trip.hotel.name}</h5>
                        <p className="text-[11px] text-stone-500">{trip.hotel.location} · {trip.hotel.distanceToHighlights}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-serif font-medium text-stone-900 text-base">₹{trip.hotel.totalCost.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">₹{trip.hotel.pricePerNight.toLocaleString()}/night</span>
                      </div>
                      <button
                        onClick={() => openPriceEdit('hotel', trip.hotel.name, trip.hotel.totalCost)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                        title="Change price"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('stays')}
                        className="text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-0.5 underline-offset-4 hover:underline cursor-pointer"
                      >
                        Change <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Transport Row (Flight or Train) */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-18 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100 flex items-center justify-center">
                        {isTrainSelected ? (
                          <img
                            src="https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=600&q=80"
                            alt="Train"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                            alt="Flight"
                            className="h-full w-full object-cover"
                          />
                        )}
                        <button
                          onClick={() => setPreviewPhoto({
                            url: isTrainSelected
                              ? 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80'
                              : 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
                            caption: `${trip.transport.provider} Interior View`,
                            tag: trip.transport.mode.toUpperCase(),
                          })}
                          className="absolute inset-0 bg-stone-950/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition"
                          title="Preview full photo"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${
                            isTrainSelected
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-sky-50 text-sky-800 border-sky-200'
                          }`}>
                            {isTrainSelected ? '🚆 Scenic Rail' : '✈️ Air Travel'} · {trip.transport.duration}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">{trip.transport.flightOrTrainNumber}</span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-sm">{trip.transport.provider}</h5>
                        <p className="text-[11px] text-stone-500">
                          {trip.transport.departure} ({trip.transport.departureTime}) ➔ {trip.transport.arrival} ({trip.transport.arrivalTime})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-serif font-medium text-stone-900 text-base">₹{trip.transport.cost.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">CO2: {trip.transport.co2Kg} kg</span>
                      </div>
                      <button
                        onClick={() => openPriceEdit('transport', trip.transport.provider, trip.transport.cost)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                        title="Change price"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('transit')}
                        className="text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-0.5 underline-offset-4 hover:underline cursor-pointer"
                      >
                        Change <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Dining Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-18 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                        <img
                          src={selectedDiningOption.photos[0]?.url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'}
                          alt={selectedDiningOption.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => setPreviewPhoto(selectedDiningOption.photos[0])}
                          className="absolute inset-0 bg-stone-950/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition"
                          title="Preview full photo"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.2 rounded-full border border-rose-200">
                            Curated Dining · {selectedDiningOption.badge || 'Chef Selection'}
                          </span>
                          <span className="text-xs font-mono text-stone-500">★ {selectedDiningOption.rating}</span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-sm">{selectedDiningOption.name}</h5>
                        <p className="text-[11px] text-stone-500">{selectedDiningOption.cuisine} · {selectedDiningOption.specialty}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-serif font-medium text-stone-900 text-base">₹{trip.budget.foodCost.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">Total dining estimate</span>
                      </div>
                      <button
                        onClick={() => openPriceEdit('dining', selectedDiningOption.name, trip.budget.foodCost)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                        title="Change price"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('dining')}
                        className="text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-0.5 underline-offset-4 hover:underline cursor-pointer"
                      >
                        Change <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Local Mobility Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-18 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                        <img
                          src={selectedTransitOption.photos[0]?.url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'}
                          alt={selectedTransitOption.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => setPreviewPhoto(selectedTransitOption.photos[0])}
                          className="absolute inset-0 bg-stone-950/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition"
                          title="Preview full photo"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                            Local Mobility · Zero Surge
                          </span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-sm">{selectedTransitOption.name}</h5>
                        <p className="text-[11px] text-stone-500">{selectedTransitOption.provider} · Dedicated Dispatch</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-serif font-medium text-stone-900 text-base">₹{trip.budget.localTransitCost.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">Airport & local pass</span>
                      </div>
                      <button
                        onClick={() => openPriceEdit('transit', selectedTransitOption.name, trip.budget.localTransitCost)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                        title="Change price"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('mobility')}
                        className="text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-0.5 underline-offset-4 hover:underline cursor-pointer"
                      >
                        Change <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Bundled Excursions Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-14 w-18 rounded-xl items-center justify-center bg-stone-100 text-stone-800 border border-stone-200">
                        <Ticket className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.2 rounded-full border border-stone-200">
                            Verified Excursions
                          </span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-sm">All Bundled Itinerary Experiences</h5>
                        <p className="text-[11px] text-stone-500">Includes all guided admissions, gear rental and priority entry</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-serif font-medium text-stone-900 text-base">₹{trip.budget.activitiesCost.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">All days inclusive</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Pre-Booking Transparency Assurance */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-start gap-3 shadow-xs">
                    <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-medium">Zero Hidden Fees</strong>
                      <span className="text-stone-500 text-[11px]">All supplier taxes and booking surcharges are already factored into this quotation.</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-start gap-3 shadow-xs">
                    <Edit3 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-medium">Custom Price Flexibility</strong>
                      <span className="text-stone-500 text-[11px]">Have voucher coupons or corporate rates? Tap any pencil icon to adapt the price.</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-start gap-3 shadow-xs">
                    <Eye className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-medium">Visual Photo Integrity</strong>
                      <span className="text-stone-500 text-[11px]">Click on any photo to inspect cabins, coach seating, suites and gourmet dishes.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAYS & VILLAS TAB */}
            {activeTab === 'stays' && (
              <div className="space-y-6">
                
                {/* HERO TOP PICK */}
                <div className="rounded-3xl border-2 border-stone-900 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-amber-300">
                      <Sparkles className="h-3 w-3" />
                      <span>{selectedHotelOption.badge || 'AI Recommended Pick'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Check className="h-3.5 w-3.5" /> Currently Selected
                    </span>
                  </div>

                  {/* Photo Showcase (1 Big + 2 Side Thumbs) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 rounded-2xl overflow-hidden">
                    <div className="sm:col-span-2 relative h-56 sm:h-64 rounded-xl overflow-hidden group cursor-pointer"
                         onClick={() => setPreviewPhoto(selectedHotelOption.photos[0])}>
                      <img
                        src={selectedHotelOption.photos[0]?.url || selectedHotelOption.image}
                        alt={selectedHotelOption.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-medium flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" /> {selectedHotelOption.photos[0]?.caption || 'Main Property View'} (Click to expand)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
                      {selectedHotelOption.photos.slice(1, 3).map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewPhoto(photo)}
                          className="relative h-28 sm:h-30 rounded-xl overflow-hidden group cursor-pointer border border-stone-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition flex items-end p-2">
                            <span className="text-[10px] text-white font-medium truncate">{photo.tag || photo.caption}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-100 pt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-serif font-medium text-stone-900">{selectedHotelOption.name}</h4>
                        <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          ★ {selectedHotelOption.rating}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{selectedHotelOption.location} · {selectedHotelOption.roomType}</p>
                      <p className="text-xs text-stone-600 mt-2 font-serif italic max-w-lg">
                        &ldquo;{selectedHotelOption.whySelected}&rdquo;
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block font-mono">Total for {selectedHotelOption.nights} Nights</span>
                        <div className="text-2xl font-serif font-medium text-stone-900">₹{selectedHotelOption.totalCost.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => openPriceEdit('hotel', selectedHotelOption.name, selectedHotelOption.totalCost)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-stone-50 text-xs font-medium text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlights pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedHotelOption.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full">
                        <Check className="h-3 w-3 text-emerald-600" /> {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ALTERNATIVE STAYS LIST */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Compare & Swap With Alternatives ({bookingCatalog.hotels.length - 1} available)
                    </h5>
                    <span className="text-[11px] text-stone-400">1-click instant selection</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookingCatalog.hotels.map((hotel) => {
                      const isCurrent = trip.hotel.id === hotel.id;
                      if (isCurrent) return null; // Already shown in top hero

                      return (
                        <div
                          key={hotel.id}
                          className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-stone-400 transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-40 rounded-xl overflow-hidden mb-3 group">
                              <img
                                src={hotel.photos[0]?.url || hotel.image}
                                alt={hotel.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                                  {hotel.badge || 'Alternative'}
                                </span>
                              </div>
                              <button
                                onClick={() => setPreviewPhoto(hotel.photos[0])}
                                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-white backdrop-blur-xs hover:bg-stone-900 transition"
                                title="Zoom photo"
                              >
                                <ZoomIn className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h6 className="font-medium text-stone-900 text-sm">{hotel.name}</h6>
                                <p className="text-[11px] text-stone-500">{hotel.location} · {hotel.roomType}</p>
                              </div>
                              <span className="text-xs font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                                ★ {hotel.rating}
                              </span>
                            </div>

                            <ul className="mt-2.5 space-y-1 text-[11px] text-stone-600">
                              {hotel.highlights.slice(0, 2).map((h, idx) => (
                                <li key={idx} className="flex items-center gap-1.5 truncate">
                                  <span className="h-1 w-1 rounded-full bg-stone-400 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <div className="font-serif font-medium text-stone-900 text-base">₹{hotel.totalCost.toLocaleString()}</div>
                              <span className="text-[10px] text-stone-400">₹{hotel.pricePerNight.toLocaleString()}/nt</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openPriceEdit('hotel', hotel.name, hotel.totalCost)}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                                title="Change price"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => selectHotelOption(hotel)}
                                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition cursor-pointer shadow-xs"
                              >
                                <span>Select Stay</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* FLIGHTS & TRAINS TAB */}
            {activeTab === 'transit' && (
              <div className="space-y-6">
                
                {/* HERO TOP PICK */}
                <div className="rounded-3xl border-2 border-stone-900 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-amber-300">
                      {isTrainSelected ? <Train className="h-3.5 w-3.5" /> : <Plane className="h-3.5 w-3.5" />}
                      <span>{selectedTransportOption.badge || 'AI Recommended Travel'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Check className="h-3.5 w-3.5" /> Currently Selected
                    </span>
                  </div>

                  {/* Photo Showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 rounded-2xl overflow-hidden">
                    <div
                      className="sm:col-span-2 relative h-56 sm:h-64 rounded-xl overflow-hidden group cursor-pointer"
                      onClick={() => setPreviewPhoto(selectedTransportOption.photos[0])}
                    >
                      <img
                        src={selectedTransportOption.photos[0]?.url}
                        alt={selectedTransportOption.provider}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-medium flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" /> {selectedTransportOption.photos[0]?.caption || 'Passenger Seating Interior'} (Click to view)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
                      {selectedTransportOption.photos.slice(1, 3).map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewPhoto(photo)}
                          className="relative h-28 sm:h-30 rounded-xl overflow-hidden group cursor-pointer border border-stone-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition flex items-end p-2">
                            <span className="text-[10px] text-white font-medium truncate">{photo.tag || photo.caption}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Route & Timetable */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-100 pt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-serif font-medium text-stone-900">{selectedTransportOption.provider}</h4>
                        <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          {selectedTransportOption.flightOrTrainNumber}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {selectedTransportOption.departure} ({selectedTransportOption.departureTime}) ➔ {selectedTransportOption.arrival} ({selectedTransportOption.arrivalTime})
                      </p>
                      <p className="text-xs text-stone-600 mt-2 font-serif italic max-w-lg">
                        &ldquo;{selectedTransportOption.whySelected}&rdquo;
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block font-mono">Fare for 2 Guests</span>
                        <div className="text-2xl font-serif font-medium text-stone-900">₹{selectedTransportOption.cost.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => openPriceEdit('transport', selectedTransportOption.provider, selectedTransportOption.cost)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-stone-50 text-xs font-medium text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedTransportOption.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full">
                        <Check className="h-3 w-3 text-emerald-600" /> {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ALTERNATIVE JOURNEYS (FLIGHTS, TRAINS, SLEEPERS, CHAUFFEUR) */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Compare All Travel Modes ({bookingCatalog.transports.length - 1} alternatives)
                    </h5>
                    <span className="text-[11px] text-stone-400">Including scenic rail, sleepers & flights</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookingCatalog.transports.map((trans) => {
                      const isCurrent = trip.transport.id === trans.id;
                      if (isCurrent) return null;

                      const isTrain = trans.mode === 'train';

                      return (
                        <div
                          key={trans.id}
                          className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-stone-400 transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-40 rounded-xl overflow-hidden mb-3 group">
                              <img
                                src={trans.photos[0]?.url}
                                alt={trans.provider}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2 flex items-center gap-1">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-xs ${
                                  isTrain
                                    ? 'bg-emerald-950/80 text-emerald-300'
                                    : 'bg-stone-900/80 text-white'
                                }`}>
                                  {trans.badge || trans.mode.toUpperCase()}
                                </span>
                              </div>
                              <button
                                onClick={() => setPreviewPhoto(trans.photos[0])}
                                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-white backdrop-blur-xs hover:bg-stone-900 transition"
                                title="Zoom photo"
                              >
                                <ZoomIn className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h6 className="font-medium text-stone-900 text-sm flex items-center gap-1.5">
                                  {isTrain ? <Train className="h-3.5 w-3.5 text-emerald-700 shrink-0" /> : <Plane className="h-3.5 w-3.5 text-sky-700 shrink-0" />}
                                  <span>{trans.provider}</span>
                                </h6>
                                <p className="text-[11px] text-stone-500">
                                  {trans.departure} ➔ {trans.arrival} · {trans.duration}
                                </p>
                              </div>
                              <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                                {trans.flightOrTrainNumber}
                              </span>
                            </div>

                            <ul className="mt-2.5 space-y-1 text-[11px] text-stone-600">
                              {trans.highlights.slice(0, 2).map((h, idx) => (
                                <li key={idx} className="flex items-center gap-1.5 truncate">
                                  <span className="h-1 w-1 rounded-full bg-stone-400 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <div className="font-serif font-medium text-stone-900 text-base">₹{trans.cost.toLocaleString()}</div>
                              <span className="text-[10px] text-stone-400">CO2: {trans.co2Kg} kg</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openPriceEdit('transport', trans.provider, trans.cost)}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                                title="Change price"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => selectTransportOption(trans)}
                                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition cursor-pointer shadow-xs"
                              >
                                <span>Select Travel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* CURATED DINING TAB */}
            {activeTab === 'dining' && (
              <div className="space-y-6">
                
                {/* HERO TOP PICK */}
                <div className="rounded-3xl border-2 border-stone-900 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-amber-300">
                      <Utensils className="h-3 w-3" />
                      <span>{selectedDiningOption.badge || 'AI Recommended Dining'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Check className="h-3.5 w-3.5" /> Currently Selected
                    </span>
                  </div>

                  {/* Photo Showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 rounded-2xl overflow-hidden">
                    <div
                      className="sm:col-span-2 relative h-56 sm:h-64 rounded-xl overflow-hidden group cursor-pointer"
                      onClick={() => setPreviewPhoto(selectedDiningOption.photos[0])}
                    >
                      <img
                        src={selectedDiningOption.photos[0]?.url}
                        alt={selectedDiningOption.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-medium flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" /> {selectedDiningOption.photos[0]?.caption || 'Signature Presentation'} (Click to view)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
                      {selectedDiningOption.photos.slice(1, 3).map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewPhoto(photo)}
                          className="relative h-28 sm:h-30 rounded-xl overflow-hidden group cursor-pointer border border-stone-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition flex items-end p-2">
                            <span className="text-[10px] text-white font-medium truncate">{photo.tag || photo.caption}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-100 pt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-serif font-medium text-stone-900">{selectedDiningOption.name}</h4>
                        <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          ★ {selectedDiningOption.rating}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{selectedDiningOption.location} · {selectedDiningOption.cuisine}</p>
                      <p className="text-xs text-stone-600 mt-2 font-serif italic max-w-lg">
                        &ldquo;{selectedDiningOption.whySelected}&rdquo;
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block font-mono">Est. Tasting for Two</span>
                        <div className="text-2xl font-serif font-medium text-stone-900">₹{selectedDiningOption.costForTwo.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => openPriceEdit('dining', selectedDiningOption.name, selectedDiningOption.costForTwo)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-stone-50 text-xs font-medium text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedDiningOption.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full">
                        <Check className="h-3 w-3 text-emerald-600" /> {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ALTERNATIVE DINING LIST */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Explore Other Iconic Kitchens ({bookingCatalog.dining.length - 1} options)
                    </h5>
                    <span className="text-[11px] text-stone-400">Heritage shacks & fine dining</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookingCatalog.dining.map((dine) => {
                      const isCurrent = selectedDiningOption.id === dine.id;
                      if (isCurrent) return null;

                      return (
                        <div
                          key={dine.id}
                          className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-stone-400 transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-40 rounded-xl overflow-hidden mb-3 group">
                              <img
                                src={dine.photos[0]?.url}
                                alt={dine.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                                  {dine.badge || 'Curated'}
                                </span>
                              </div>
                              <button
                                onClick={() => setPreviewPhoto(dine.photos[0])}
                                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-white backdrop-blur-xs hover:bg-stone-900 transition"
                                title="Zoom photo"
                              >
                                <ZoomIn className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h6 className="font-medium text-stone-900 text-sm">{dine.name}</h6>
                                <p className="text-[11px] text-stone-500">{dine.location} · {dine.cuisine}</p>
                              </div>
                              <span className="text-xs font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                                ★ {dine.rating}
                              </span>
                            </div>

                            <p className="mt-2 text-[11px] text-stone-600 italic line-clamp-2">
                              Specialty: {dine.specialty}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <div className="font-serif font-medium text-stone-900 text-base">₹{dine.costForTwo.toLocaleString()}</div>
                              <span className="text-[10px] text-stone-400">Cost for two</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openPriceEdit('dining', dine.name, dine.costForTwo)}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                                title="Change price"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => selectDiningOption(dine)}
                                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition cursor-pointer shadow-xs"
                              >
                                <span>Select Dining</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* LOCAL MOBILITY TAB */}
            {activeTab === 'mobility' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Local Travel Options ({bookingCatalog.localTransit.length} available)
                    </h5>
                    <span className="text-[11px] text-stone-400">Zero surge dispatch</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookingCatalog.localTransit.map((transit) => {
                      const isCurrent = selectedTransitOption.id === transit.id;

                      return (
                        <div
                          key={transit.id}
                          className={`rounded-2xl border p-4 shadow-sm transition flex flex-col justify-between ${
                            isCurrent
                              ? 'border-2 border-stone-900 bg-white ring-2 ring-stone-900/5'
                              : 'border-stone-200 bg-white hover:border-stone-400'
                          }`}
                        >
                          <div>
                            <div className="relative h-44 rounded-xl overflow-hidden mb-3 group">
                              <img
                                src={transit.photos[0]?.url}
                                alt={transit.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                                  {transit.badge || 'Transit Pass'}
                                </span>
                              </div>
                              <button
                                onClick={() => setPreviewPhoto(transit.photos[0])}
                                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-stone-900/80 text-white backdrop-blur-xs hover:bg-stone-900 transition"
                                title="Zoom photo"
                              >
                                <ZoomIn className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h6 className="font-medium text-stone-900 text-sm flex items-center gap-1.5">
                                  <Car className="h-3.5 w-3.5 text-stone-800" />
                                  <span>{transit.name}</span>
                                </h6>
                                <p className="text-[11px] text-stone-500">{transit.provider}</p>
                              </div>
                              {isCurrent && (
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  Selected
                                </span>
                              )}
                            </div>

                            <ul className="mt-2.5 space-y-1 text-[11px] text-stone-600">
                              {transit.highlights.map((h, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <div className="font-serif font-medium text-stone-900 text-base">₹{transit.price.toLocaleString()}</div>
                              <span className="text-[10px] text-stone-400">Total pass cost</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openPriceEdit('transit', transit.name, transit.price)}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                                title="Change price"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              {!isCurrent ? (
                                <button
                                  onClick={() => selectLocalTransitOption(transit)}
                                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition cursor-pointer shadow-xs"
                                >
                                  <span>Select Pass</span>
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                                  <Check className="h-3 w-3" /> Active
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* STICKY BOTTOM CHECKOUT FOOTER (when not yet confirmed) */}
        {!isConfirmed && (
          <div className="border-t border-stone-200/90 bg-white/90 px-6 py-4 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 uppercase font-mono tracking-wider">Total Trip Package</span>
                <span className="text-xs px-2 py-0.2 rounded-full font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Buffer: ₹{trip.budget.remaining.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
                  ₹{trip.budget.plannedCost.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500">
                  strictly within ₹{trip.budget.totalBudget.toLocaleString()} limit
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {activeTab !== 'overview' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition cursor-pointer"
                >
                  Review Breakdown
                </button>
              )}
              <button
                onClick={handleConfirm}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800 shadow-md transition active:scale-98 cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
                <span>Confirm & One-Click Reserve</span>
              </button>
            </div>
          </div>
        )}

        {/* PHOTO LIGHTBOX MODAL */}
        {previewPhoto && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-stone-900 shadow-2xl border border-stone-800">
              <button
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <h6 className="font-medium text-sm text-stone-100">{previewPhoto.caption}</h6>
                  <p className="text-xs text-stone-400 mt-0.5">Verified supplier photo · High-definition preview</p>
                </div>
                {previewPhoto.tag && (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-800 text-amber-300 border border-stone-700">
                    {previewPhoto.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PRICE EDIT MODAL */}
        {priceEditModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative max-w-sm w-full rounded-3xl bg-[#FAF9F5] p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-stone-900" />
                  <h5 className="font-serif font-medium text-stone-900 text-base">Customize Price</h5>
                </div>
                <button
                  onClick={() => setPriceEditModal(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-900 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <span className="text-xs text-stone-500 block truncate">{priceEditModal.title}</span>
                <span className="text-[11px] text-stone-400">Current Rate: ₹{priceEditModal.currentPrice.toLocaleString()}</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Enter Custom Agreed Rate (₹):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif text-stone-500">₹</span>
                  <input
                    type="number"
                    value={customPriceInput}
                    onChange={(e) => setCustomPriceInput(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white pl-8 pr-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    placeholder="Enter price"
                    autoFocus
                  />
                </div>
              </div>

              {/* Quick Delta Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCustomPriceInput((prev) => Math.max(0, (parseFloat(prev) || 0) - 500).toString())}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                >
                  -₹500 Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPriceInput((prev) => Math.max(0, (parseFloat(prev) || 0) - 1000).toString())}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                >
                  -₹1,000 Deal
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPriceInput((prev) => ((parseFloat(prev) || 0) + 500).toString())}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                >
                  +₹500 Upgrade
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPriceEditModal(null)}
                  className="flex-1 rounded-full border border-stone-300 bg-white py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomPrice}
                  className="flex-1 rounded-full bg-stone-900 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition cursor-pointer shadow-sm"
                >
                  Save & Update
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
