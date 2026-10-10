'use client';

import React from 'react';
import { sampleDestinations } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';
import { useRove } from '@/context/RoveContext';

export const PopularDestinations: React.FC = () => {
  const { switchTrip } = useRove();

  return (
    <section id="explore-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 border-t border-stone-200/80">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-10">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
            Curated Blueprints
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            Where to Next?
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-sans">
            Handcrafted destination blueprints calibrated for boutique stays, seasonal weather, and quiet routes.
          </p>
        </div>

        <span className="text-xs font-sans text-stone-500">
          3 Interactive Hubs Active (Goa, Ladakh, Bali)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {sampleDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative rounded-3xl border border-stone-200 bg-white overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-all duration-300 shadow-sm"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-sans font-semibold text-stone-800 shadow-sm">
                  {dest.duration}
                </div>
                <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/90 px-3 py-1 text-[11px] font-serif text-white backdrop-blur-sm">
                  From {dest.averageCost}
                </div>
              </div>

              <div className="p-5 font-sans">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>{dest.country}</span>
                  <span className="text-[11px] font-medium text-stone-700">{dest.bestSeason}</span>
                </div>
                <h4 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                  {dest.name}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 mb-4 leading-relaxed">
                  {dest.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {dest.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  if (dest.id === 'ladakh') {
                    switchTrip('ladakh');
                  } else if (dest.id === 'bali') {
                    switchTrip('bali');
                  } else {
                    switchTrip('goa');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white py-2.5 text-xs font-semibold text-stone-800 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition active:scale-98 cursor-pointer"
              >
                <span>Explore Journey</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
