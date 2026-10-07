'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Lock,
  Unlock,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

export const LockReoptimizeBar: React.FC = () => {
  const {
    trip,
    isHotelLocked,
    toggleLockHotel,
    isTransportLocked,
    toggleLockTransport,
    reoptimizeTrip,
    resetTripToDefault,
    isAiThinking,
  } = useRove();

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 my-8">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Title & Explanation */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-900 border border-stone-200">
                <Lock className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-lg font-serif font-medium text-stone-900 tracking-tight">
                Lock & Re-Optimize
              </h3>
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 border border-stone-200">
                Signature Feature
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Found a stay you love? Pin it. When you request a budget reduction, Rove re-balances activities
              and local transit while guaranteeing your pinned choices remain completely untouched.
            </p>
          </div>

          {/* Center Constraints Lock Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Hotel Lock Toggle */}
            <button
              onClick={toggleLockHotel}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition active:scale-98 border ${
                isHotelLocked
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              title="Click to toggle hotel lock constraint"
            >
              {isHotelLocked ? (
                <>
                  <Lock className="h-3.5 w-3.5 text-stone-200" />
                  <span>Pinned: Casa De Vagator (₹4,500)</span>
                  <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">PROTECTED</span>
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5 text-stone-400" />
                  <span>Pin Hotel (Casa De Vagator)</span>
                </>
              )}
            </button>

            {/* Transport Lock Toggle */}
            <button
              onClick={toggleLockTransport}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition active:scale-98 border ${
                isTransportLocked
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {isTransportLocked ? (
                <>
                  <Lock className="h-3.5 w-3.5 text-stone-200" />
                  <span>Pinned: Flight (₹4,200)</span>
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5 text-stone-400" />
                  <span>Pin Flight</span>
                </>
              )}
            </button>
          </div>

          {/* Right Action: Make ₹2,000 Cheaper */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => reoptimizeTrip(2000)}
              disabled={isAiThinking}
              className={`flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 transition active:scale-98 ${
                isAiThinking ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <span>{isAiThinking ? 'Recalculating...' : 'Reduce Budget by ₹2,000'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={resetTripToDefault}
              className="rounded-full border border-stone-200 bg-stone-50 p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
              title="Reset to default Goa trip"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Real-time Constraint Guarantee Banner */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-stone-900 shrink-0" />
            <span>
              {isHotelLocked
                ? 'Hotel is 100% protected. Rove will source ₹2,000 savings via boat passes and shared transit.'
                : 'All elements flexible. Pin Casa De Vagator to test strict constraint preservation.'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-700 font-sans">
            <span>
              Planned:{' '}
              <strong className="text-stone-900 font-semibold">
                ₹{trip.budget.plannedCost.toLocaleString()}
              </strong>
            </span>
            <span>
              Remaining:{' '}
              <strong className="text-amber-800 font-semibold">
                ₹{trip.budget.remaining.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
