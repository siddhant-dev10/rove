'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Pencil,
} from 'lucide-react';

export const BudgetIntelligence: React.FC = () => {
  const { trip, reoptimizeTrip, setIsBudgetEditorOpen } = useRove();
  const { budget } = trip;

  const percentageUsed = Math.min(100, Math.round((budget.plannedCost / (budget.totalBudget || 1)) * 100));

  const categories = [
    { name: `Hotel (${trip.nights} Nights)`, amount: budget.hotelCost, color: 'bg-[#A88B74]', pct: Math.round((budget.hotelCost / (budget.plannedCost || 1)) * 100) },
    { name: 'Flights / Inbound', amount: budget.transportCost, color: 'bg-[#5C7182]', pct: Math.round((budget.transportCost / (budget.plannedCost || 1)) * 100) },
    { name: 'Curated Dining', amount: budget.foodCost, color: 'bg-[#C27D56]', pct: Math.round((budget.foodCost / (budget.plannedCost || 1)) * 100) },
    { name: 'Activities & Passes', amount: budget.activitiesCost, color: 'bg-[#768763]', pct: Math.round((budget.activitiesCost / (budget.plannedCost || 1)) * 100) },
    { name: 'Local Transfers', amount: budget.localTransitCost, color: 'bg-[#8F8D88]', pct: Math.round((budget.localTransitCost / (budget.plannedCost || 1)) * 100) },
    { name: 'Emergency Buffer', amount: budget.bufferCost, color: 'bg-[#D6C7B2]', pct: Math.round((budget.bufferCost / (budget.plannedCost || 1)) * 100) },
  ];

  return (
    <section id="budget-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block">
                Transparent Financials
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-serif text-stone-600 italic">
                {trip.destination}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Where your ₹{budget.totalBudget.toLocaleString()} goes
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              Budget is a first-class citizen. Every line is shown clearly, with planning estimates and no hidden markup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-right">
              <span className="text-[10px] text-stone-500 block uppercase font-sans font-semibold">Your Cap</span>
              <span className="text-base font-serif font-medium text-stone-900">
                ₹{budget.totalBudget.toLocaleString()}
              </span>
            </div>
            <div className="rounded-2xl border border-stone-900 bg-stone-900 px-3.5 py-2 text-right text-white">
              <span className="text-[10px] text-stone-300 block uppercase font-sans font-semibold">Planned Total</span>
              <span className="text-base font-serif font-medium text-white">
                ₹{budget.plannedCost.toLocaleString()}
              </span>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 px-3.5 py-2 text-right">
              <span className="text-[10px] text-amber-800 block uppercase font-sans font-semibold">Reserved Buffer</span>
              <span className="text-base font-serif font-medium text-amber-900">
                ₹{budget.remaining.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setIsBudgetEditorOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-stone-300 bg-white hover:bg-stone-900 hover:text-white px-3.5 py-2 text-xs font-semibold text-stone-800 transition active:scale-98 shadow-sm group"
              title="Edit budget cap and allocations"
            >
              <Pencil className="h-3.5 w-3.5 text-stone-500 group-hover:text-white" />
              <span>Edit Money Plan</span>
            </button>
          </div>
        </div>

        {/* Segmented Budget Meter */}
        <div className="mt-8">
          <div className="flex justify-between items-center text-xs text-stone-600 mb-2.5 font-sans">
            <span>
              Allocation Progress:{' '}
              <strong className="text-stone-900 font-semibold">{percentageUsed}% Utilized</strong>
            </span>
            <span className="text-stone-700">
              ₹{budget.remaining.toLocaleString()} still available for spontaneous treats
            </span>
          </div>

          {/* Clean Segmented Bar */}
          <div className="h-3.5 w-full rounded-full bg-stone-100 flex overflow-hidden p-0.5 gap-0.5 border border-stone-200">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`${cat.color} h-full first:rounded-l-full last:rounded-r-full transition-all duration-500`}
                style={{ width: `${cat.pct}%` }}
                title={`${cat.name}: ₹${cat.amount.toLocaleString()} (${cat.pct}%)`}
              />
            ))}
          </div>

          {/* Legend Grid */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3 text-xs">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                  <span className="text-stone-600 text-[11px] font-medium truncate">{cat.name}</span>
                </div>
                <div className="text-sm font-semibold text-stone-900 font-sans">₹{cat.amount.toLocaleString()}</div>
                <div className="text-[10px] text-stone-500">{cat.pct}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Thoughtful Financial Trade-offs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Savings Card */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="h-4 w-4 text-stone-900" />
                  <span>Curated Cost Reduction</span>
                </span>
                <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-stone-800 font-medium">
                  Save ₹{budget.savingsOpportunity.amount}
                </span>
              </div>
              <h4 className="text-base font-serif font-medium text-stone-900">
                {budget.savingsOpportunity.title}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-sans">
                Swaps high-fuel motorized watercraft for an eco-guided morning kayak through the Vagator sea caves.
                Retains the 4.8★ ocean thrill while instantly trimming your total.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70">
              <button
                onClick={() => reoptimizeTrip(budget.savingsOpportunity.amount)}
                className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition active:scale-98"
              >
                <span>Apply & Save ₹{budget.savingsOpportunity.amount}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-amber-800" />
                  <span>Curated Journey Upgrade</span>
                </span>
                <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 font-medium">
                  +₹{budget.upgradeOpportunity.amount}
                </span>
              </div>
              <h4 className="text-base font-serif font-medium text-stone-900">
                {budget.upgradeOpportunity.title}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-sans">
                If your budget permits, elevate the group twilight catamaran to a private sailing yacht with
                an artisanal cheese board and sparkling wine.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70">
              <button
                onClick={() => alert('Upgrade applied to Day 3 sunset sail!')}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-100 transition active:scale-98"
              >
                <span>Upgrade for ₹{budget.upgradeOpportunity.amount}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Clear Trust Footnote */}
        <div className="mt-6 rounded-2xl bg-stone-100/70 p-4 flex items-start gap-3 text-xs text-stone-700">
          <ShieldCheck className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            <strong className="text-stone-900">Zero Fine Print: </strong>
            Every activity entry, hotel night, airport transfer, and meal allowance is included in the estimate.
            The remaining ₹{budget.remaining.toLocaleString()} is not committed and stays available to you.
          </div>
        </div>
      </div>
    </section>
  );
};
