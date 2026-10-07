'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import { ArrowRight } from 'lucide-react';

export const MultiPlanComparison: React.FC = () => {
  const { reoptimizeTrip, resetTripToDefault, applySimulation } = useRove();

  const plans = [
    {
      title: 'Saver Explorer Tier',
      cost: '₹11,800',
      badge: 'Maximum Value',
      stay: 'Private Boutique Hostel Room in Anjuna',
      transit: 'Sleeper Train & Shared Electric Shuttle',
      activities: 'Self-guided Fort Trails, Coastal Kayaking & Village Hikes',
      food: 'Authentic Village Shacks & Traditional Bakeries',
      action: () => reoptimizeTrip(2850),
      buttonText: 'Select Saver Plan (₹11,800)',
      recommended: false,
    },
    {
      title: 'Balanced Coastal Journey',
      cost: '₹14,650',
      badge: '⭐ The Rove Benchmark',
      stay: 'Casa De Vagator Heritage Haven (4.6★)',
      transit: 'IndiGo Flight (1h 20m) + Pre-paid EV Pass',
      activities: 'Grand Island Snorkeling, Speedboat & Fort Aguada',
      food: 'Kokum Bistro Thali & Gunpowder Assagao Courtyard',
      action: () => resetTripToDefault(),
      buttonText: 'Active Benchmark Plan',
      recommended: true,
    },
    {
      title: 'Comfort Heritage Luxury',
      cost: '₹18,900',
      badge: 'Bespoke Comfort',
      stay: '4-Star Beachfront Palms Resort & Pool Villa',
      transit: 'Flight + Dedicated Chauffeur Car',
      activities: 'Private Scuba Charter & Sunset Catamaran Sail',
      food: 'Fine Dining Beachfront Sundowners & Wine Pairings',
      action: () => applySimulation('budgetUp5k'),
      buttonText: 'Select Luxury Plan (₹18,900)',
      recommended: false,
    },
  ];

  return (
    <section id="compare-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-stone-100 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
              Tier Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Three Thoughtfully Tailored Tiers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              Side-by-side comparison across Saver, Balanced, and Comfort tiers for your dates in Goa.
            </p>
          </div>

          <span className="text-xs font-sans text-stone-500">
            All prices inclusive of taxes & fees
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 font-sans ${
                p.recommended
                  ? 'border-stone-900 bg-stone-50/50 shadow-md ring-1 ring-stone-900'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                      p.recommended
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {p.badge}
                  </span>
                  <span className="text-xl sm:text-2xl font-serif font-medium text-stone-900">
                    {p.cost}
                  </span>
                </div>

                <h4 className="text-lg font-serif font-medium text-stone-900 tracking-tight mb-4">
                  {p.title}
                </h4>

                <div className="space-y-3.5 text-xs text-stone-600 border-t border-stone-200/70 pt-4">
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Accommodation:
                    </span>
                    <strong className="text-stone-900 font-medium">{p.stay}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Transit:
                    </span>
                    <strong className="text-stone-900 font-medium">{p.transit}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Highlights:
                    </span>
                    <strong className="text-stone-900 font-medium">{p.activities}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Gastronomy:
                    </span>
                    <strong className="text-stone-900 font-medium">{p.food}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200/70">
                <button
                  onClick={p.action}
                  className={`w-full flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition active:scale-98 ${
                    p.recommended
                      ? 'bg-stone-900 text-white hover:bg-stone-800'
                      : 'border border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
