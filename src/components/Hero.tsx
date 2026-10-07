'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  ArrowRight,
  ShieldCheck,
  Play,
  Compass,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    setIsDemoTourOpen,
    setIsReplayModalOpen,
  } = useRove();

  const [destination, setDestination] = useState('Goa, India');
  const [nights, setNights] = useState('12 – 15 Dec (3 Nights)');
  const [travelers, setTravelers] = useState('2 Guests (Couple)');
  const [budget, setBudget] = useState('15,000');
  const [tripStyle, setTripStyle] = useState('Ocean & Hidden Gems');

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Subtle, calm editorial category tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-800" />
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
            The Travel Operating System
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-xs text-stone-500 font-serif italic">
            Curated like a boutique agent, powered by AI
          </span>
        </div>

        {/* Magazine-Style Typography */}
        <div className="max-w-4xl">
          <h1 className="text-4xl font-serif tracking-tight text-stone-900 sm:text-6xl lg:text-7xl leading-[1.1]">
            Your entire journey.{' '}
            <span className="italic font-normal text-stone-700">
              Thoughtfully planned.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-sans">
            Rove is not an automated itinerary generator. It is an intuitive travel operating system that
            respects strict budgets, handpicks boutique stays, sidesteps crowds, and adapts in seconds
            whenever your plans change.
          </p>
        </div>

        {/* Airbnb-Inspired Search & Constraint Dock */}
        <div className="mt-10 rounded-2xl sm:rounded-full border border-stone-300 bg-white p-2.5 sm:p-3 shadow-md shadow-stone-900/5 max-w-5xl">
          <div className="grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 sm:grid-cols-5 items-center">
            {/* Destination */}
            <div className="px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Where
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-stone-900 focus:outline-none placeholder-stone-400"
              />
              <span className="text-[11px] text-stone-400 block truncate">North & Central Coast</span>
            </div>

            {/* When */}
            <div className="px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                When
              </label>
              <input
                type="text"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-stone-900 focus:outline-none placeholder-stone-400"
              />
              <span className="text-[11px] text-stone-400 block truncate">4 Days Total</span>
            </div>

            {/* Who */}
            <div className="px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Who
              </label>
              <input
                type="text"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-stone-900 focus:outline-none placeholder-stone-400"
              />
              <span className="text-[11px] text-stone-400 block truncate">Couple mode</span>
            </div>

            {/* Strict Budget */}
            <div className="px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Total Budget
              </label>
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-medium text-stone-900">₹</span>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-stone-900 focus:outline-none placeholder-stone-400"
                />
              </div>
              <span className="text-[11px] text-stone-400 block truncate">Planned: ₹14,650</span>
            </div>

            {/* Style & Search CTA */}
            <div className="px-4 py-2 sm:py-1 flex items-center justify-between gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  Vibe
                </label>
                <input
                  type="text"
                  value={tripStyle}
                  onChange={(e) => setTripStyle(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-stone-900 focus:outline-none"
                />
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('itinerary-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white shadow-sm hover:bg-stone-800 transition active:scale-95"
                title="View Complete Plan"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Real Photography Spread */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Destination Hero Photo */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-md aspect-[16/10] group">
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80"
              alt="Goa Coastline"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Gentle Warm Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

            {/* Editorial Caption Card */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
              <div>
                <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium tracking-wide uppercase text-stone-100 border border-white/20">
                  Featured Journey
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif mt-2 tracking-tight">
                  Goa Coastal Odyssey & Heritage Stays
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-lg font-sans">
                  3 nights at Casa De Vagator boutique haven, Grand Island marine reef, and pastel alleys in Fontainhas.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDemoTourOpen(true)}
                  className="rounded-full bg-white text-stone-900 px-4 py-2 text-xs font-semibold hover:bg-stone-100 transition shadow-sm flex items-center gap-1.5"
                >
                  <Play className="h-3 w-3 fill-stone-900" />
                  <span>Demonstration Flow</span>
                </button>
                <button
                  onClick={() => setIsReplayModalOpen(true)}
                  className="rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20 px-4 py-2 text-xs font-medium hover:bg-stone-900 transition"
                >
                  Storybook Replay
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hotel Preview & Trust Notes */}
          <div className="lg:col-span-4 space-y-4">
            {/* Curated Stay Preview */}
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="relative h-44 rounded-2xl overflow-hidden mb-3.5">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="Casa De Vagator Heritage Haven"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-stone-800 shadow-sm">
                  📌 Pinned Stay
                </div>
                <div className="absolute bottom-3 right-3 rounded-full bg-stone-900/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono text-white">
                  ₹1,500 / night
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>Vagator, North Goa</span>
                <span className="font-semibold text-amber-800">★ 4.6 (Verified Guests)</span>
              </div>
              <h4 className="text-base font-serif font-medium text-stone-900">
                Casa De Vagator Heritage Haven
              </h4>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                A restored Portuguese villa tucked into quiet palm groves, 12 minutes on foot from sunset cliffs.
              </p>
            </div>

            {/* Trust Points */}
            <div className="rounded-3xl border border-stone-200/80 bg-stone-100/60 p-5 text-xs text-stone-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Strict Budget Respect</strong>
                  <span>Every recommendation is priced with 2026 ground rates. Zero surprise markups.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200/70">
                <Compass className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Route Optimization</strong>
                  <span>Nearby places are grouped together to reduce wasted driving by up to 40%.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
