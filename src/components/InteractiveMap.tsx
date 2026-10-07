'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  MapPin,
  Play,
  X,
  Compass,
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { trip, setIsReplayModalOpen } = useRove();
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [activePin, setActivePin] = useState<{
    title: string;
    category: string;
    location: string;
    cost: number;
    crowdLevel: number;
    whySelected: string;
    coords: { x: number; y: number };
  } | null>(null);

  // Map route nodes
  const routePoints = [
    { name: 'Dabolim Airport', x: 50, y: 72, type: 'airport', cost: '₹850 EV Cab', time: '09:30 AM' },
    { name: 'Fort Aguada Ramparts', x: 32, y: 55, type: 'sight', cost: '₹150 Entry', time: '11:30 AM' },
    { name: 'Kokum Bistro Lunch', x: 35, y: 50, type: 'food', cost: '₹650', time: '02:00 PM' },
    { name: 'Casa De Vagator (Hotel)', x: 38, y: 35, type: 'hotel', cost: '₹1,500/night', time: 'Base Stay' },
    { name: 'Vagator Cliffs Sunset', x: 38, y: 34, type: 'nature', cost: 'Free', time: '05:30 PM' },
    { name: 'Grand Island Boat Reef', x: 28, y: 62, type: 'adventure', cost: '₹1,600 Pass', time: 'Day 2' },
    { name: 'Gunpowder Kitchen', x: 44, y: 32, type: 'food', cost: '₹900', time: 'Day 2' },
    { name: 'Fontainhas Latin Walk', x: 48, y: 52, type: 'gem', cost: '₹200', time: 'Day 3' },
    { name: 'Divar Island Ferry', x: 56, y: 48, type: 'gem', cost: '₹150', time: 'Day 3' },
  ];

  return (
    <section id="map-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 border-b border-stone-100 pb-6 mb-6">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
              Geographic Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Route Pacing & Coastal Geography
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              Clustered along natural coastal corridors to eliminate 32 km of cross-peninsula driving.
            </p>
          </div>

          {/* Right Action buttons & Day switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Day filter pills */}
            <div className="flex items-center rounded-full bg-stone-100 p-1 border border-stone-200 text-xs font-sans">
              <button
                onClick={() => setSelectedDay('all')}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  selectedDay === 'all'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Days
              </button>
              {trip.days.map((d) => (
                <button
                  key={d.dayNumber}
                  onClick={() => setSelectedDay(d.dayNumber)}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    selectedDay === d.dayNumber
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Day {d.dayNumber}
                </button>
              ))}
            </div>

            {/* Launch Trip Replay */}
            <button
              onClick={() => setIsReplayModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:bg-stone-50 transition active:scale-98"
            >
              <Play className="h-3 w-3 fill-stone-800" />
              <span>Animated Route Replay</span>
            </button>
          </div>
        </div>

        {/* Map Canvas: Warm sand / parchment tone */}
        <div className="relative h-[460px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-[#F5F2EB]">
          {/* Subtle grid */}
          <svg className="absolute inset-0 h-full w-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="clean-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(214, 211, 209, 0.4)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#clean-grid)" />
          </svg>

          {/* Goa Coastline & River Inlets */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Sea wash */}
            <path
              d="M 0,0 L 25,0 Q 28,30 35,50 Q 42,70 52,100 L 0,100 Z"
              fill="#E8EFF2"
            />
            {/* Arabian Sea coast outline */}
            <path
              d="M 25,0 Q 28,30 35,50 Q 42,70 52,100"
              fill="none"
              stroke="#B8CBD4"
              strokeWidth="1.2"
            />
            {/* Mandovi River channel */}
            <path
              d="M 35,50 Q 48,51 65,49 Q 75,47 90,48"
              fill="none"
              stroke="#B8CBD4"
              strokeWidth="1.5"
            />
            {/* Zuari River channel */}
            <path
              d="M 45,72 Q 58,74 78,72 Q 88,71 100,73"
              fill="none"
              stroke="#B8CBD4"
              strokeWidth="1.2"
            />

            {/* Clean Route Polyline in Dark Stone */}
            <polyline
              points="50,72 32,55 35,50 38,35 28,62 44,32 48,52 56,48"
              fill="none"
              stroke="#292524"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          </svg>

          {/* Geographical Water labels */}
          <div className="absolute top-10 left-6 text-[10px] font-serif tracking-widest text-stone-500 uppercase">
            Arabian Sea
          </div>
          <div className="absolute top-[48%] left-[55%] text-[9px] font-sans font-medium text-stone-500 tracking-wider uppercase">
            Mandovi River Basin
          </div>

          {/* Interactive Marker Pins */}
          {routePoints.map((pt, idx) => {
            const isHotel = pt.type === 'hotel';
            const isAirport = pt.type === 'airport';
            const isGem = pt.type === 'gem';

            return (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                onClick={() =>
                  setActivePin({
                    title: pt.name,
                    category: pt.type,
                    location: isHotel ? 'Vagator Center' : isAirport ? 'Dabolim' : 'Coastal Corridor',
                    cost: pt.cost === 'Free' ? 0 : 500,
                    crowdLevel: isGem ? 25 : 55,
                    whySelected: isHotel
                      ? 'Casa De Vagator Heritage Haven — 12 min walk from sunset cliffs, quiet courtyard.'
                      : 'Clustered along day corridor to prevent sitting in traffic.',
                    coords: { x: pt.x, y: pt.y },
                  })
                }
              >
                {/* Marker Badge */}
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:scale-115 text-xs font-semibold ${
                    isHotel
                      ? 'bg-amber-900 border-amber-950 text-white'
                      : isAirport
                      ? 'bg-stone-900 border-stone-950 text-white'
                      : isGem
                      ? 'bg-stone-800 border-stone-900 text-white'
                      : 'bg-white border-stone-800 text-stone-900'
                  }`}
                >
                  {isHotel ? '🏨' : isAirport ? '✈️' : idx + 1}
                </div>

                {/* Minimalist Pin Name */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-medium text-stone-800 border border-stone-300 shadow-sm pointer-events-none group-hover:border-stone-800 transition">
                  {pt.name}
                </div>
              </div>
            );
          })}

          {/* Active Pin Info Popover */}
          {activePin && (
            <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-84 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-sm font-serif font-medium text-stone-900 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-stone-900" />
                  {activePin.title}
                </span>
                <button
                  onClick={() => setActivePin(null)}
                  className="text-stone-400 hover:text-stone-900 text-xs p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-stone-600 mb-3 leading-relaxed font-sans">{activePin.whySelected}</p>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span>Crowd density: <strong className="text-stone-900">{activePin.crowdLevel}% (Calm)</strong></span>
                <span className="text-stone-800 font-medium">Route Optimized</span>
              </div>
            </div>
          )}

          {/* Clean Overlay Telemetry Box */}
          <div className="absolute top-4 right-4 rounded-2xl border border-stone-200 bg-white/95 p-4 text-xs text-stone-600 shadow-sm hidden sm:block space-y-1 font-sans">
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Total Route:</span>
              <strong className="text-stone-900 font-semibold">54.2 km</strong>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Travel Time Saved:</span>
              <strong className="text-stone-900 font-semibold">+1h 45m saved</strong>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Transit:</span>
              <strong className="text-stone-900 font-semibold">Electric EV Pass</strong>
            </div>
          </div>
        </div>

        {/* Editorial Routing Note */}
        <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-xs text-stone-700 flex items-start gap-3 border border-stone-200/80">
          <Compass className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            <strong className="text-stone-900">Thoughtful Day-by-Day Flow: </strong>
            Rather than bouncing back and forth across Goa, Day 1 & Day 2 are kept exclusively in North Goa
            (Candolim, Vagator, Assagao). Day 3 explores the peaceful central river corridor (Fontainhas & Divar Island),
            and Day 4 winds down before departure.
          </div>
        </div>
      </div>
    </section>
  );
};
