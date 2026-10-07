'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Plane,
  Train,
  Hotel,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

export const NegotiationModal: React.FC = () => {
  const {
    isNegotiationOpen,
    setIsNegotiationOpen,
    tradeoffs,
    applyTradeoff,
  } = useRove();

  if (!isNegotiationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                Tailored Journey Proposals
              </h3>
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-700 border border-stone-200">
                Curated Concierge
              </span>
            </div>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Three balanced compromises between transit speed, hotel luxury, and total expenditure
            </p>
          </div>

          <button
            onClick={() => setIsNegotiationOpen(false)}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User Prompt Narrative Box */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 mb-6 font-sans">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
            Your Stated Trip Goal:
          </span>
          <p className="text-sm text-stone-800 italic">
            &quot;I have ₹15,000 total. 2 people. 3 nights. Goa. Adventure trip. Help me get the best experience without exceeding my budget.&quot;
          </p>
          <div className="mt-2.5 text-xs text-stone-500 flex items-center gap-1.5 border-t border-stone-100 pt-2">
            <ShieldCheck className="h-4 w-4 text-stone-900 shrink-0" />
            <span>Rove evaluated 48 flight slots, 114 boutique stays, and 26 excursion packages to construct these options.</span>
          </div>
        </div>

        {/* 3 Negotiated Trade-off Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-1 font-sans">
          {tradeoffs.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 bg-white ${
                plan.recommended
                  ? 'border-stone-900 shadow-md ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                      plan.recommended
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {plan.recommended ? '⭐ RECOMMENDED' : plan.vibe}
                  </span>

                  <span className="text-lg font-serif font-medium text-stone-900">
                    ₹{plan.totalCost.toLocaleString()}
                  </span>
                </div>

                <h4 className="text-base font-serif font-medium text-stone-900 tracking-tight mb-2">
                  {plan.title}
                </h4>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed font-sans">{plan.summary}</p>

                {/* Specs List */}
                <div className="space-y-2 border-t border-stone-100 pt-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Hotel className="h-3.5 w-3.5 text-stone-400" />
                      <span>Stay Tier:</span>
                    </span>
                    <strong className="text-stone-900 text-right">{plan.hotelTier}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 flex items-center gap-1">
                      {plan.transportMode.includes('Train') ? (
                        <Train className="h-3.5 w-3.5 text-stone-400" />
                      ) : (
                        <Plane className="h-3.5 w-3.5 text-stone-400" />
                      )}
                      <span>Transit:</span>
                    </span>
                    <strong className="text-stone-900 text-right">{plan.transportMode}</strong>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="mt-4 space-y-2 border-t border-stone-100 pt-3">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                    Key Advantages:
                  </span>
                  {plan.pros.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-stone-900 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}

                  <span className="text-[10px] font-sans uppercase tracking-wider text-stone-400 font-semibold block pt-2 mb-1">
                    Compromise:
                  </span>
                  {plan.cons.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-500">
                      <span className="text-stone-400 font-bold shrink-0">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3 border-t border-stone-100">
                <button
                  onClick={() => applyTradeoff(plan.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition active:scale-98 ${
                    plan.recommended
                      ? 'bg-stone-900 text-white hover:bg-stone-800'
                      : 'border border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>Select & Apply Proposal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
