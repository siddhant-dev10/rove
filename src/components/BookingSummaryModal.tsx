'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import confetti from 'canvas-confetti';
import {
  Plane,
  Hotel,
  Ticket,
  Car,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Download,
} from 'lucide-react';

export const BookingSummaryModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, trip, earnCredits } = useRove();
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isBookingOpen) return null;

  const handleConfirm = () => {
    setIsConfirmed(true);
    earnCredits(300, 'Completed Entire Trip Booking Checkout');

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas not supported
    }
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setIsConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
              <Plane className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                {isConfirmed ? 'Journey Confirmed' : 'Clear One-Click Reservation'}
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                {isConfirmed
                  ? 'All services confirmed with airline and boutique hotel reservation desks'
                  : 'All transport, stays, excursions & local transfers bundled into a single checkout'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isConfirmed ? (
          /* Confirmation Screen */
          <div className="flex-1 overflow-y-auto space-y-6 text-center py-4 font-sans">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h4 className="text-2xl font-serif font-medium text-stone-900">
                Goa Coastal Odyssey Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1">
                Your reservations are locked across all suppliers. You earned <strong className="text-amber-800 font-semibold">+300 Rove Credits</strong> in your loyalty wallet.
              </p>
            </div>

            {/* Voucher References Grid */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-left space-y-3 text-xs shadow-sm">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Flight PNR (IndiGo):</span>
                <strong className="text-stone-900 font-mono text-sm">6E-GOA-782</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Hotel Voucher (Casa De Vagator):</span>
                <strong className="text-stone-900 font-mono text-sm">#ROV-HTL-9912</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Marine Excursion & Fort Pass:</span>
                <strong className="text-stone-900 font-mono text-sm">#ROV-ACT-442</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-500">Pre-paid EV Airport Cab Dispatch:</span>
                <strong className="text-stone-900 font-mono text-sm">#ROV-CAB-109</strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert('Downloaded offline PDF boarding pass & hotel confirmation voucher.')}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Vouchers (PDF)</span>
              </button>

              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition shadow-sm"
              >
                <span>Return to Itinerary</span>
              </button>
            </div>
          </div>
        ) : (
          /* Pre-checkout Review Screen */
          <div className="flex-1 overflow-y-auto space-y-5 pr-1 font-sans">
            {/* Items Breakdown */}
            <div className="rounded-2xl border border-stone-200 bg-white divide-y divide-stone-100 text-xs shadow-sm">
              {/* Transport */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-800">
                    <Plane className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-900 block text-sm">{trip.transport.provider} ({trip.transport.flightOrTrainNumber})</span>
                    <span className="text-[11px] text-stone-500">{trip.transport.departure} ➔ {trip.transport.arrival} · {trip.transport.departureTime}</span>
                  </div>
                </div>
                <span className="font-serif font-medium text-base text-stone-900">₹{trip.transport.cost.toLocaleString()}</span>
              </div>

              {/* Hotel */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-800">
                    <Hotel className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-900 block text-sm">{trip.hotel.name} (3 Nights)</span>
                    <span className="text-[11px] text-stone-500">{trip.hotel.location} · ★ {trip.hotel.rating}</span>
                  </div>
                </div>
                <span className="font-serif font-medium text-base text-stone-900">₹{trip.hotel.totalCost.toLocaleString()}</span>
              </div>

              {/* Activities */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-800">
                    <Ticket className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-900 block text-sm">Bundled Excursion Passes</span>
                    <span className="text-[11px] text-stone-500">Fort Aguada, Grand Island Snorkeling, Sunset Sail</span>
                  </div>
                </div>
                <span className="font-serif font-medium text-base text-stone-900">₹{trip.budget.activitiesCost.toLocaleString()}</span>
              </div>

              {/* Local Cab */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-800">
                    <Car className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-900 block text-sm">Pre-paid EV Airport Transfer & Local Pass</span>
                    <span className="text-[11px] text-stone-500">Zero surge guarantee · Dedicated chauffeur dispatch</span>
                  </div>
                </div>
                <span className="font-serif font-medium text-base text-stone-900">₹{trip.budget.localTransitCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Summary */}
            <div className="rounded-2xl border border-stone-200 bg-stone-100/70 p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 uppercase font-sans font-semibold block">Total Package</span>
                <span className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">₹{trip.budget.plannedCost.toLocaleString()}</span>
              </div>
              <div className="text-right text-xs">
                <span className="text-amber-800 font-semibold block">Strictly Within Budget (Buffer: ₹{trip.budget.remaining.toLocaleString()})</span>
                <span className="text-stone-500 text-[11px]">Includes all taxes and supplier fees</span>
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 text-xs text-stone-600 px-1">
              <ShieldCheck className="h-4 w-4 text-stone-900 shrink-0" />
              <span>Full price transparency · Zero surprise transaction markups.</span>
            </div>

            {/* Checkout Button */}
            <div className="pt-2">
              <button
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white hover:bg-stone-800 shadow-md transition active:scale-98"
              >
                <CreditCard className="h-4 w-4" />
                <span>Confirm & Reserve Entire Journey (₹{trip.budget.plannedCost.toLocaleString()})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
