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

  const isLadakh = trip.destination.toLowerCase().includes('ladakh');
  const isBali = trip.destination.toLowerCase().includes('bali') || trip.destination.toLowerCase().includes('indonesia');

  // Destination-tailored map points
  const goaPoints = [
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

  const ladakhPoints = [
    { name: 'IXL Leh Airport', x: 40, y: 70, type: 'airport', cost: '₹600 Oxygen Cab', time: '08:30 AM' },
    { name: 'Bodhi Green Cafe', x: 46, y: 64, type: 'food', cost: '₹450 Thukpa', time: '01:00 PM' },
    { name: 'The Grand Dragon (Hotel)', x: 45, y: 55, type: 'hotel', cost: '₹2,500/night', time: 'Base Stay' },
    { name: 'Shanti Stupa Sunset', x: 42, y: 50, type: 'sight', cost: 'Free', time: '05:30 PM' },
    { name: 'Thiksey Gompa Puja', x: 58, y: 72, type: 'gem', cost: '₹100 Pass', time: 'Day 2' },
    { name: 'Shey Palace Buddha', x: 54, y: 68, type: 'sight', cost: '₹50 Entry', time: 'Day 2' },
    { name: 'Khardung La (5,359m)', x: 45, y: 32, type: 'adventure', cost: '₹200 Permit', time: 'Day 3' },
    { name: 'Diskit Giant Buddha', x: 38, y: 22, type: 'sight', cost: '₹100 Entry', time: 'Day 3' },
    { name: 'Hunder White Dunes', x: 32, y: 24, type: 'adventure', cost: '₹800 Camel', time: 'Day 3' },
    { name: 'Pangong Tso Lake', x: 78, y: 38, type: 'nature', cost: '₹300 Permit', time: 'Day 4' },
  ];

  const baliPoints = [
    { name: 'DPS Denpasar Airport', x: 42, y: 82, type: 'airport', cost: '₹950 EV Cab', time: '12:30 PM' },
    { name: 'Campuhan Ridge Walk', x: 48, y: 41, type: 'gem', cost: 'Free', time: '04:30 PM' },
    { name: 'Komaneka Jungle Villa', x: 50, y: 44, type: 'hotel', cost: '₹3,700/night', time: 'Base Stay' },
    { name: 'Warung Enak Dinner', x: 51, y: 46, type: 'food', cost: '₹750 Feast', time: '07:00 PM' },
    { name: 'Tegallalang Terraces', x: 52, y: 34, type: 'sight', cost: '₹150 Entry', time: 'Day 2' },
    { name: 'Tirta Empul Sacred Springs', x: 56, y: 30, type: 'gem', cost: '₹250 Ritual', time: 'Day 2' },
    { name: 'Mount Batur Sunrise 4WD', x: 62, y: 20, type: 'adventure', cost: '₹2,200 Jeep', time: 'Day 3' },
    { name: 'Tibumana Waterfall', x: 55, y: 38, type: 'nature', cost: '₹100 Swim', time: 'Day 3' },
    { name: 'Uluwatu Cliff Fire Dance', x: 34, y: 92, type: 'culture', cost: '₹850 Dance', time: 'Day 4' },
    { name: 'Jimbaran Sunset Seafood', x: 40, y: 85, type: 'food', cost: '₹1,200 Grill', time: 'Day 4' },
  ];

  const routePoints = isLadakh ? ladakhPoints : isBali ? baliPoints : goaPoints;

  return (
    <section id="map-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 border-b border-stone-100 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block">
                Geographic Intelligence
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-serif text-stone-600 italic">
                {trip.destination}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              {isLadakh
                ? 'High-Altitude Pass Corridors & Monastic Valleys'
                : isBali
                ? 'Highland Sanctuaries & Coastal Cliff Corridors'
                : 'Route Pacing & Coastal Geography'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              {isLadakh
                ? 'Paced for gradual acclimatization across Leh (3,500m), Nubra Valley, and Pangong Tso.'
                : isBali
                ? 'Clustered in Ubud highlands before smooth transfer to Uluwatu cliffs to avoid island traffic.'
                : 'Clustered along natural coastal corridors to eliminate 32 km of cross-peninsula driving.'}
            </p>
          </div>

          {/* Right Action buttons & Day switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Day filter pills */}
            <div className="flex items-center rounded-full bg-stone-100 p-1 border border-stone-200 text-xs font-sans">
              <button
                onClick={() => setSelectedDay('all')}
                className={`rounded-full px-3 py-1 font-medium transition cursor-pointer ${
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
                  className={`rounded-full px-3 py-1 font-medium transition cursor-pointer ${
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
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:bg-stone-50 transition active:scale-98 cursor-pointer"
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

          {/* Destination Specific SVG Topography */}
          {isLadakh ? (
            /* Ladakh High Altitude Valley & Pangong Lake Map */
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Mountain ridge backdrop */}
              <polygon points="10,10 35,45 20,80 5,60" fill="#E6DFD5" opacity="0.6" />
              <polygon points="30,5 60,35 45,75 25,60" fill="#DDD5C7" opacity="0.6" />
              <polygon points="50,10 80,45 65,85 45,65" fill="#E3DDD1" opacity="0.6" />
              {/* Indus river line */}
              <path d="M 15,90 Q 40,75 60,65 Q 85,55 95,40" fill="none" stroke="#A7C7D8" strokeWidth="2" />
              {/* Pangong Cobalt Lake */}
              <path d="M 68,34 Q 78,36 90,32 Q 96,28 100,30" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 68,34 Q 78,36 90,32 Q 96,28 100,30" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
              {/* Route connecting pass */}
              <polyline
                points="40,70 46,64 45,55 42,50 58,72 54,68 45,32 38,22 32,24 78,38"
                fill="none"
                stroke="#292524"
                strokeWidth="1.3"
                strokeDasharray="2 2"
              />
            </svg>
          ) : isBali ? (
            /* Bali Island Contour & Volcanic Ridge Map */
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Island Landmass outline */}
              <path
                d="M 15,40 Q 25,20 50,15 Q 75,20 85,45 Q 80,75 55,80 Q 45,95 35,95 Q 30,85 40,75 Q 20,65 15,40 Z"
                fill="#EDE8DC"
                stroke="#CFC7B6"
                strokeWidth="1.2"
              />
              {/* Lake Batur caldera */}
              <circle cx="62" cy="22" r="4" fill="#A7C7D8" />
              {/* Surrounding Sea wash */}
              <rect width="100%" height="100%" fill="none" stroke="#B8CBD4" strokeWidth="0.5" />
              {/* Route line */}
              <polyline
                points="42,82 50,44 48,41 51,46 52,34 56,30 62,20 55,38 34,92 40,85"
                fill="none"
                stroke="#292524"
                strokeWidth="1.3"
                strokeDasharray="2 2"
              />
            </svg>
          ) : (
            /* Goa Coastline & River Inlets */
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,0 L 25,0 Q 28,30 35,50 Q 42,70 52,100 L 0,100 Z" fill="#E8EFF2" />
              <path d="M 25,0 Q 28,30 35,50 Q 42,70 52,100" fill="none" stroke="#B8CBD4" strokeWidth="1.2" />
              <path d="M 35,50 Q 48,51 65,49 Q 75,47 90,48" fill="none" stroke="#B8CBD4" strokeWidth="1.5" />
              <path d="M 45,72 Q 58,74 78,72 Q 88,71 100,73" fill="none" stroke="#B8CBD4" strokeWidth="1.2" />
              <polyline
                points="50,72 32,55 35,50 38,35 28,62 44,32 48,52 56,48"
                fill="none"
                stroke="#292524"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            </svg>
          )}

          {/* Geographical Water / Landmark labels */}
          <div className="absolute top-10 left-6 text-[10px] font-serif tracking-widest text-stone-500 uppercase">
            {isLadakh ? 'Zanskar Range (3,500m+)' : isBali ? 'Bali Sea' : 'Arabian Sea'}
          </div>
          <div className="absolute top-[48%] left-[55%] text-[9px] font-sans font-medium text-stone-500 tracking-wider uppercase">
            {isLadakh ? 'Pangong Tso Basin' : isBali ? 'Ayung River Valley' : 'Mandovi River Basin'}
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
                    location: isHotel ? trip.hotel.location : isAirport ? 'Airport Entry' : 'Curated Corridor',
                    cost: pt.cost.includes('Free') ? 0 : 500,
                    crowdLevel: isGem ? 25 : 50,
                    whySelected: isHotel
                      ? `${trip.hotel.name} — Verified benchmark anchor for this destination.`
                      : 'Geographically clustered stop minimizing road transit overhead.',
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
                  className="text-stone-400 hover:text-stone-900 text-xs p-1 cursor-pointer"
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

          {/* Destination Specific Telemetry Box */}
          <div className="absolute top-4 right-4 rounded-2xl border border-stone-200 bg-white/95 p-4 text-xs text-stone-600 shadow-sm hidden sm:block space-y-1 font-sans">
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Total Route:</span>
              <strong className="text-stone-900 font-semibold">
                {isLadakh ? '285 km circuit' : isBali ? '142 km island route' : '54.2 km'}
              </strong>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Optimization:</span>
              <strong className="text-stone-900 font-semibold">
                {isLadakh ? 'Acclimatized Pacing' : isBali ? '+2h 10m saved' : '+1h 45m saved'}
              </strong>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-stone-500">Transit Pass:</span>
              <strong className="text-stone-900 font-semibold">
                {isLadakh ? '4x4 Mountain Cruiser' : isBali ? 'Island Private Chauffeur' : 'Electric EV Pass'}
              </strong>
            </div>
          </div>
        </div>

        {/* Editorial Routing Note */}
        <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-xs text-stone-700 flex items-start gap-3 border border-stone-200/80">
          <Compass className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            <strong className="text-stone-900">Thoughtful Day-by-Day Flow: </strong>
            {isLadakh ? (
              <span>
                Acclimatization-first routing. Day 1 is dedicated to resting and hydration in Leh (3,500m).
                Days 2–4 progress over Khardung La (5,359m) to the Nubra dunes and cobalt Pangong Tso lake without elevation stress.
              </span>
            ) : isBali ? (
              <span>
                Split-hub geographic routing. Days 1–3 anchor in the cool Ubud jungle highlands,
                then transfer smoothly to Uluwatu ocean cliffs to eliminate cross-island traffic bottlenecks.
              </span>
            ) : (
              <span>
                Rather than bouncing back and forth across Goa, Day 1 & Day 2 are kept exclusively in North Goa
                (Candolim, Vagator, Assagao). Day 3 explores the peaceful central river corridor (Fontainhas & Divar Island),
                and Day 4 winds down before departure.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
