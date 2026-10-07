'use client';

import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const CrowdIntelligence: React.FC = () => {
  const crowdHotspots = [
    {
      commercialSpot: 'Baga Beach Watersports Hub',
      crowdPct: 94,
      status: 'High Congestion',
      waitTime: '1h 15m line',
      aiAlternative: 'Vagator Red Cliffs & Ozran Cove',
      altCrowdPct: 41,
      savingTime: 'Saves 60 mins',
      reason: 'Baga runs at 94% density with noisy commercial boat shacks. Vagator red cliffs offer panoramic sunset vistas, peaceful sea kayaking, and open breathing room.',
    },
    {
      commercialSpot: 'Calangute Central Shacks',
      crowdPct: 88,
      status: 'Heavy Tour Buses',
      waitTime: '45m wait',
      aiAlternative: 'Ashwem White Sand Shoreline',
      altCrowdPct: 29,
      savingTime: 'Saves 40 mins',
      reason: 'Swaps crowded tourist corridors for a serene palm-fringed shoreline celebrated for olive ridley sea turtle nesting and tranquil evening walks.',
    },
    {
      commercialSpot: 'Dudhsagar Highway Jeep Queue',
      crowdPct: 91,
      status: 'Bottleneck Permit Line',
      waitTime: '2h permit queue',
      aiAlternative: 'Divar Island Ferry & Backwater Trail',
      altCrowdPct: 18,
      savingTime: 'Saves 95 mins',
      reason: 'Bypasses 4 hours of highway traffic and ticket lines. Divar Island provides effortless, peaceful river ferry access into untouched 18th-century Goan villages.',
    },
  ];

  const hiddenGems = [
    {
      title: 'Divar Island River Ferry',
      type: 'Quiet Islet & Backwater Meadows',
      rating: 4.9,
      crowd: '18% Capacity',
      cost: '₹150 Ferry Pass',
      why: 'Accessible only by flat-bottom river ferry across the Mandovi. Zero souvenir shacks; 18th-century baroque churches and quiet paddy dykes.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '31st January Confeitaria (Est. 1930)',
      type: 'Traditional Wood-Fired Bakery',
      rating: 4.8,
      crowd: '32% Capacity',
      cost: '₹250 Taste Pairing',
      why: 'Tucked inside a sleepy pastel alleyway of Fontainhas. Wood-fired ovens baking authentic seven-layer bebinca from pre-liberation family recipes.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Cazulo Vault in Cuelim',
      type: 'Botanical Cellar & Feni Vault',
      rating: 4.9,
      crowd: '22% Capacity',
      cost: '₹850 Tasting Session',
      why: 'The world’s only heritage cellar featuring century-old glass garrafões submerged in cold spring water under rainforest jungle canopy.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="crowd-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      {/* 1. Live Crowd Intelligence */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-stone-100 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
              Crowd Telemetry
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Skip the Crowds. Find the Authentic Coast.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              Instead of noisy commercial traps, Rove steers you toward serene alternatives with equal beauty and zero lines.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
            <ShieldCheck className="h-4 w-4 text-stone-900" />
            <span>Real-time pedestrian telemetry</span>
          </div>
        </div>

        {/* Hotspots vs Alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crowdHotspots.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 flex flex-col justify-between font-sans"
            >
              <div>
                {/* Overcrowded Spot */}
                <div className="rounded-xl border border-stone-200 bg-white p-3.5 mb-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-medium text-stone-700">
                      {item.commercialSpot}
                    </span>
                    <span className="font-semibold text-stone-900">{item.crowdPct}% full</span>
                  </div>
                  <div className="text-[11px] text-stone-500 flex justify-between">
                    <span>{item.status}</span>
                    <span className="text-stone-700 font-medium">{item.waitTime}</span>
                  </div>
                </div>

                {/* Transition Divider */}
                <div className="flex items-center justify-center my-1 text-stone-400">
                  <span className="text-[10px] uppercase font-sans tracking-wider bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200 text-stone-600 font-semibold">
                    Rove Alternative
                  </span>
                </div>

                {/* Recommended Calm Alternative */}
                <div className="rounded-xl border border-stone-900 bg-stone-900 p-3.5 mt-2 mb-3 text-white">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-medium text-stone-100 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-stone-300" />
                      {item.aiAlternative}
                    </span>
                    <span className="font-mono text-stone-300">{item.altCrowdPct}% crowd</span>
                  </div>
                  <div className="text-[11px] text-stone-300 font-sans">
                    ✨ {item.savingTime} in queue lines
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Handpicked Local Secrets (Hidden Gems) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-stone-100 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
              Curated Secrets
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Handpicked Local Secrets
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              100% vetted local favorites with authentic craftsmanship and zero commercial sponsorships.
            </p>
          </div>

          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-sans font-medium text-stone-700 border border-stone-200 hidden sm:inline">
            Zero Commercial Kickbacks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hiddenGems.map((gem, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden flex flex-col justify-between group hover:border-stone-400 transition"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={gem.image}
                    alt={gem.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-800 shadow-sm">
                    💎 Local Secret
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/90 px-2.5 py-0.5 text-[10px] font-mono text-white backdrop-blur-sm">
                    {gem.crowd}
                  </div>
                </div>

                <div className="p-5 font-sans">
                  <span className="text-[11px] font-sans font-medium text-stone-500 uppercase tracking-wider block mb-1">
                    {gem.type}
                  </span>
                  <h4 className="text-lg font-serif font-medium text-stone-900 tracking-tight mb-2">
                    {gem.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{gem.why}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-sans mt-2">
                <span className="font-semibold text-stone-900">{gem.cost}</span>
                <span className="text-stone-700 font-medium">★ {gem.rating} Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
